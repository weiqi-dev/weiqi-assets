# 弈友圈关系算子（workflow-operator）

`workflow-operator` 扩展点的**工作流算子插件**。装进宿主、人工启用后，`OperatorRegistry`
把 `exposes[]` 里的 `normalize` 按名注册为算子 **`circle.normalize`**（`<slug>.<method>`，
slug 来自资源 id `workflow-operator.circle`）。「弈友圈」技能 `circle.foxwq` 用两步静态 DAG
引用它：

```
foxwq_fetch_batch（宿主内置算子，取数）  →  circle.normalize（本插件，纯计算，yield:true）
        └─ bindings: games ← games / rootUid ← rootUid ──────────┘
```

**两阶段分工**：第一阶段由宿主内置算子 `foxwq_fetch_batch` 抓取野狐公开棋谱列表并投影成紧凑行；
第二阶段由本插件把对局行算成一份「可复算的计数与图结构」，`returnToLLM:true` 把汇总回灌到
本轮观察，由模型据此做关系分析。插件源码不进主线程 JS 环境、不进模型上下文，调用时零网络、
零时钟、零随机数、零宿主能力。

## 接口

唯一入口 `call({ method, args })`，`method` 只认 `normalize`（输入形状照抄
`plugins/workflow-operator/calendar/index.js`：`input.method` / `input.args[0]`）。

### `normalize` — 对阵关系的纯计算投影

入参 `{ games: [...], rootUid: "..." }`：

- `games` = 宿主内置算子 `foxwq_fetch_batch` 的 `value.games[]`（紧凑对局行；字段名见契约 §A：
  `chessid, blackuid, blacknick, blackdan, whiteuid, whitenick, whitedan, starttime, winner, reason, point`）。
- `rootUid` = 同算子的 `value.rootUid`（主账号 uid，字符串）。

出参 `{ stats, nodes, components, edges, commonOpponents }`，**字段顺序即重要度顺序（摘要在前、
明细在后）**，便于回灌被单条上限裁剪时保住关键信息：

| 段 | 字段 | 含义 |
|---|---|---|
| `stats` | `rootUid` | 原样回显主账号 uid |
| | `totalGames` | 按 `chessid` 去重后的局数 |
| | `nodeCount` | 参与过对局的不同 uid 数（`nodes.length`） |
| | `edgeCount` | 按对合并后的边数（`edges.length`） |
| | `expandedCount` | 图中除 `rootUid` 外的不同 uid 数（`nodes` 里 uid≠rootUid 的条数） |
| `nodes[]` | `uid, name, dan, degree, gameCount` | `degree`=该 uid 在 `edges` 里出现过的不同对手数（=关联边数）；`gameCount`=该 uid 参与的去重局数；`dan` 保留野狐原始数值（不调 `formatDan`，沙箱无 hostApi） |
| `components[]` | `size, members:[uid]` | 以 `edges` 建无向图的连通分量；`members` 按 uid 升序，分量按 `size` 降序 |
| `edges[]` | `a, aName, b, bName, games, aWins, bWins, lastTime` | 一条边 = 一对 (a,b) 的所有对局合并；`a`/`b` 按 uid 字典序定序去重 |
| `commonOpponents[]` | `uid, name, shared, gamesWithRoot` | `shared`=该节点与 `rootUid` 的邻居集合交集大小；`gamesWithRoot`=该节点与 `rootUid` 直接对局数（无则 0） |

## 统计口径（确定性、可逐字段复算）

- **预处理**：`uid` 一律字符串化后参与相等比较（与 `foxwq_fetch_batch` 的 `String(...)` 口径一致）；
  按 `chessid` 去重；结构不合法的行跳过，不编造、不改写入参；`chessid` 缺失时用稳定行号键，
  避免把多条无 id 的行误并。清洗后按 `(starttime, chessid)` 升序稳定排序，使「最近一局取名字/段位」
  与输入数组顺序无关。
- **边**：两端 uid 按字典序定序，`a` 恒为较小者；同一对的所有局合并。自对局（两端 uid 相同）
  不建边 —— 它不是两个账号之间的交战。
- **胜场**：`winner` 为 `1`=黑胜、`2`=白胜、`0`=和棋；对照 a/b 实际执黑执白统计，
  **和棋与未知值都不计入任一方胜场**。`winner` 为数字或数字字符串都认。
- **`lastTime`**：该对局里 `starttime` 最大值，字符串比较即可（格式 `YYYY-MM-DD HH:MM:SS`）。
- **`aName` / `bName`**：取该方在这对局里按 `(starttime, chessid)` 最后一局的显示名；
  那一局为空名时回退到该方在这对局里出现过的最后一个非空显示名。`nodes[].name/dan` 同口径。
- **`degree`** = 该 uid 在 `edges` 里出现过的不同对手数（`edges` 已按对去重，故等于关联边数）；
  **`gameCount`** = 该 uid 参与的去重局数。
- **`components`** = 以 `edges` 建邻接表的无向图连通分量；节点集取 `nodes[]` 全部 uid
  （只出现在自对局里的账号是孤立点，自成 `size=1` 分量，不丢节点）。uid 按升序逐个起 BFS，
  邻居也按 uid 升序扩展，保证遍历顺序确定。
- **`commonOpponents[i].shared`** = 节点 i 与 `rootUid` 的邻居集合交集大小；
  **`gamesWithRoot`** = 该节点与 `rootUid` 直接对局数（无则 0）。只列除 `rootUid` 自身外的节点。
- **稳定排序**：`nodes` 按 `gameCount` 降序、uid 升序；`components` 按 `size` 降序、`members[0]` 升序；
  `edges` 按 `games` 降序、再按 `a`/`b` 字典序；`commonOpponents` 按 `shared` 降序、uid 升序。
  所有并列情形都有确定性兜底，同样输入（含打乱顺序）输出逐字段一致。

## 数值纪律：只出事实，不做判定

本工件**不含任何圈层规则或阈值判定**，不写「达到几局算熟人」「共邻几个算一圈」「度数大于某值
算枢纽」之类的结论。规模参数（`pages` / `opponentCount` / `maxHops`）只约束上游一次取数的请求量，
由 `circle.foxwq` 配方的 `inputs` 给出、出处写在技能 README；本插件不接触它们。
哪些账号形成弈友圈、谁是高连通枢纽、谁游离在外、谁与谁共享对手，一律由 LLM 依据上述计数与
图结构归纳，并逐条给出基于数据的理由。输出体量只受宿主既有单条消息上限裁剪，插件不设压缩阈值。

## 数据来源

| 出现处 | 来源 | 性质 |
|---|---|---|
| 对局行全部字段 | 野狐公开接口 `QueryUserInfoPanel` / `YHWQFetchChessList`（经 `https://api.weiqi.lol/?url=…` 透明代理），由宿主 `foxwq_fetch_batch` 取回并投影 | 公开数据，非本工件内置 |
| `winner` 1/2/0 口径 | 契约 §A 照抄 weiqi-bot `services/game/providers/foxwq/FoxwqChessProvider.ts` 的单局字段语义 | 接口事实 |
| 字典序 / 计数 / BFS | ECMAScript 标准字符串比较与数组操作，无任何第三方实现代码 | 标准 / 自写 |

## 诚实兜底

- 插件未安装 / 未启用 → `run_workflow` 运行前校验报「未注册算子 `circle.normalize`」，
  配方 prompt 要求模型如实说明并提示到「🧩 插件」面板安装启用「弈友圈关系算子」，不推算、不补写。
- 上游取数失败 / `games` 为空 / 结构不合法 → 本插件如实给出对应空结构（如 `totalGames:0`）或抛错，
  由配方 prompt 要求模型如实说明，绝不编造账号或对局。
- `rootUid` 不在 `games` 里时 `commonOpponents` 里 `shared` 以空邻居集计，不虚构共同对手。

## 契约来源

| 约束 | 来源 |
|---|---|
| 扩展点 `workflow-operator`、spec v1、入口 `call`、hostApi 为空 | `weiqi-bot/domain/plugin/types.ts` 的 `WORKFLOW_OPERATOR_SPEC` |
| `call({method,args})` 输入只作为 JSON 数据进入沙箱 | `weiqi-bot/infrastructure/plugin-vm/QuickJsExecutor.ts` 的 `__PLUGIN_INPUT__` |
| 方法名只认 `exposes[]` 白名单、按 `<slug>.<method>` 注册 | `weiqi-bot/application/plugin/OperatorRegistry.ts` |
| 安装前静态预检 + 沙箱试跑 + `smoke[].expect` 逐字段比对 | `weiqi-bot/services/plugin-catalog/PluginCatalogService.ts` / `application/plugin/OperatorContract.ts` |
| 禁用全局 / 高风险语法清单 | `scripts/validate.mjs` 的 `BROWSER_GLOBALS` / `HIGH_RISK`（与宿主 `PluginValidator.ts` 同源） |

`smoke[]` 两条由本地脚本从本插件真实 `call` 输出程序化导出（不是手写 guess）：一条「两局各一
对手、含和棋」验证 a/b 定序、和棋不计胜场、去重与单分量；一条「三局含重复 chessid + 二跳对手
之间一局」验证按对合并、连通分量、共同对手与名字口径。宿主按 `method` 组装 `call({method,args})`
并逐字段比对 `expect`；本地已加「重复跑 + 打乱输入顺序」确定性自检。

## 安装形状

与 `calendar` 算子逐字相同：宿主取 `plugin.json` → 按 `code` 取源码 → 静态预检 +
沙箱试跑（跑 `smoke` 样例并比对 `expect`）→ 写进工件存储，**默认停用**。用户在「🧩 插件」
面板启用后，`circle.normalize` 注册进宿主算子表，供「弈友圈」技能 `circle.foxwq` 按名引用。

## 许可证

本工件代码与文档随 `weiqi-assets` 以 MIT 发布；全部接口与统计算法为本项目自写，
未引入任何第三方实现代码。

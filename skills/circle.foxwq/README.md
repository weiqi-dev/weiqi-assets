# 弈友圈（circle.foxwq）

- **ID**：`circle.foxwq`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想分析某个野狐账号的弈友圈、看它最近都跟谁下棋、或找出野狐上经常互相交战的账号群体时用本配方。
它是一个**三阶段技能**：静态 DAG 两步取数与投影，之后由宿主按 `llmProjection` 投影为关系摘要后缓存、
LLM 分页读这份摘要，再由 LLM 做关系分析。
静态 DAG 只有两步：

1. `foxwq_fetch_batch`（宿主内置算子，取数）：按昵称查野狐 uid → 抓主账号棋谱 → 自动扩展到
   「对手的交战对手」→ 按 `chessid` 去重合并成紧凑对局行，出参 `{games, rootUid, rootName,
   expandedUids, fetchedUids}`。
2. `circle.normalize`（`workflow-operator` 插件算子，纯计算）：把 `games` / `rootUid` 投影成
   `{stats, nodes, components, edges, commonOpponents}` —— 全部是可复算的计数与图结构。
   `yield:true` + 配方顶层 `returnToLLM:true` 的 `run_workflow` 成功观察只给**结果句柄 `resultId`**，
   数据本体存进宿主进程内结果缓存，不直接回灌。
3. **宿主按 `llmProjection` 投影为关系摘要后缓存、LLM 分页读这份摘要**（宿主内置
   `workflow_result_read`，无需安装）：宿主在写入结果缓存前，按配方 `llmProjection.keep` 做声明式投影 +
   无损紧凑行，缓存里只放关系摘要（`stats` / `nodes` / `components` / `commonOpponents` 四段，
   不含 `edges` 逐边明细）。LLM 先用 `mode:"info"` 看总量，再从 `mode:"slice", offset:0` 起，
   按每次返回的「请把 offset 设为 X 继续读」递增 offset，直到出现「已到正文末尾」，把这份摘要读全；
   摘要片数很少。读全前不下结论、不只据第一片归纳、不复述每片 JSON。
   读全之后由 **LLM 做关系分析**：归纳圈层、枢纽、游离账号与共同对手，并逐条给出基于数据的理由。

**分工铁律**：插件只出计数与图结构，**绝不写「达到几局算熟人」「共邻几个算一圈」之类阈值判定**；
「哪些账号形成弈友圈」由 LLM 依据 `gameCount` / `degree` / `games` / `shared` / `components` 等
数据归纳并给出理由。本技能不走 `display_json_list` 旁路，也不需要「结果见上方列表」那类展示引导语。

### `llmProjection.keep` 出处与能力边界

- **出处**：用户 2026-11-25 18:09 浏览器实测「返回给 LLM 的内容实在太多了」；实测 `circle.normalize`
  输出的 `edges` 逐边明细占全量约 68%，且不承载圈层 / 枢纽 / 游离 / 共同对手结论所需信息
  （结论全在 `nodes.degree` / `gameCount`、`commonOpponents.shared`、`components` 等可复算计数里）。
  这是明说的业务约束，不是扫验证集挑的经验值、也不是「前 N 条」类阈值。
- **保留 / 排除**：`keep: ["stats", "nodes", "components", "commonOpponents"]` 四段全保留，
  逐边明细 `edges` 排除。`circle.normalize` 仍产出全量五段，插件输出契约一字不改。
- **无损紧凑行 `columns/rows`**：宿主把保留段里的对象数组重编码成 `{ columns, rows }`（列名从对象键推导、
  不硬编码技能字段名），保留段内信息不丢、全量账号都在，不截断、不取前 N 条。
- **能力边界**：LLM 视图按配方声明**不含 `edges` 逐边明细**，这是声明式投影、不是数据被截断；
  不要误判为漏读、不要据此补写或声称读到全量。缺省无 `llmProjection` 时 = B2 全量行为（零回归）。

## 引用的宿主原语与算子

- `primitives: []`：这是 workflow 配方，步骤由宿主 DAG runner 按 `workflow.steps[]` 执行，
  不挂任何散文原语工具。
- `foxwq_fetch_batch`：宿主内置算子（weiqi-bot 实现），复用 `executeWebFetch` 的 `storeOnly` 链路。
- `circle.normalize`：需先安装并启用「弈友圈关系算子」插件（见下）。
- `workflow_result_read`：宿主内置只读工具，按 `resultId` 分段读宿主按 `llmProjection` 投影后写入
  结果缓存的关系摘要（`yield` 汇总的投影视图，不含 `edges` 逐边明细）；只读、不占决策轮，
  无需安装插件，也不在配方 `primitives` 里声明。

## 路由词

- 分析某野狐账号的弈友圈
- 看看这个野狐号最近都跟谁下棋
- 找出野狐上经常互相交战的账号群体

## 参数与默认值出处（不伪装成拟合值）

| name | type | default | 出处 |
|---|---|---|---|
| `nickname` | string | 无（required:true） | 用户诉求「某个野狐账号」；昵称必填，没给就先问清，不假定账号 |
| `pages` | integer | `1` | 用户 2026-11-25 15:00 确认「默认 100 局够了」；野狐一页 100 局，故取 1 页 |
| `opponentCount` | integer | `8` | 方案里明说的「一次取数的业务约束」（控制请求量与回灌上下文体积），**非拟合值**；只决定二跳对手上限，不参与任何圈层判定 |
| `maxHops` | integer，enum `[1,2]` | `2` | 用户原话「同时也可以看看对手的交战对手」= 两跳；`1` 只抓主账号，`2` = 主账号 + 对手各抓 |

四个参数都可被自然语言改写；整值占位符按 `inputs[].type` 注入原始 integer / string，不加引号转字符串。
规模参数只作「一次取数的业务约束」，不构成判定阈值 —— 这正是「数值纪律」要求的口径。

## 数据来源

- 野狐公开接口：`QueryUserInfoPanel`（昵称 → uid）与 `YHWQFetchChessList`（棋谱列表，
  顶层 `lastcode` 翻页），端点与字段照抄 weiqi-bot
  `services/game/providers/foxwq/{FoxwqUserProvider,FoxwqChessProvider}.ts`。
- 透明代理 `https://api.weiqi.lol/?url=…`（已实测可取上述两个接口，200 / 无需鉴权）；
  由宿主 `foxwq_fetch_batch` 复用 `executeWebFetch` 的 `storeOnly` 链路取回。
- 单局用到的字段：`chessid, blackuid, blacknick, blackdan, whiteuid, whitenick, whitedan,
  starttime, winner, reason, point`；`uid` 一律字符串化，与 `circle.normalize` 的相等比较口径一致。

## 诚实兜底

- 查不到昵称 / 全部取数失败 → `foxwq_fetch_batch` 返回 `ok:false`，配方 prompt 要求模型如实说明、
  不编造账号或对局；单个 uid 失败只跳过该 uid 并继续。
- 未安装 / 未启用「弈友圈关系算子」插件 → `run_workflow` 运行前校验报「未注册算子
  `circle.normalize`」，如实说明并提示到「🧩 插件」面板安装启用，不推算、不补写。
- `returnToLLM:true` 配方能分页读全：`workflow_result_read` 读全前不下结论、不只据第一片归纳；
  摘要已声明排除 `edges` 逐边明细（声明式投影、不是截断），不要误判为漏读、不要据此补写；
  分页读取失败或结果缓存缺失时如实说明，不补写、不外推未读到的内容。
- 判定只看节点成败，不靠复述报错文案。

## 配方正文

完整执行说明（`prompt` / `inputs` / `workflow` / `returnToLLM`）只写在同目录 `skill.json`，
本文件不复制正文，避免两份真相漂移。`returnToLLM` 字段出处见 `schema/workflow.schema.json`
与 weiqi-bot `application/skill/SkillRecipe.ts`；索引 `skills/registry.json` 不带此字段，
不纳入索引↔配方重叠字段比对。

## Workflow DAG

本配方用 `workflow.steps[]` 声明静态 DAG（2 步）：
`foxwq_fetch_batch` → `circle.normalize`（`bindings.path` 取 `games` / `rootUid`）。
算子契约见 [扩展点契约](../../docs/extension-points.md)，插件口径见
[弈友圈关系算子 README](../../plugins/workflow-operator/circle/README.md)。
DAG 之后由 LLM 用 `workflow_result_read` 按 `resultId` 读全 `yield` 汇总，再做关系分析。

## 安装形状

- **宿主侧**：需要 weiqi-bot 已注册内置算子 `foxwq_fetch_batch`（契约 §A）。
- **插件侧**：需到「🧩 插件」面板安装并启用 **弈友圈关系算子**（`workflow-operator.circle`），
  启用后 `circle.normalize` 才注册进宿主算子表供本配方按名引用；默认停用。
- 技能本身按 `skills/registry.json` 瘦索引 + `skills/circle.foxwq/skill.json` 完整配方两段式发布。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` /
  `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

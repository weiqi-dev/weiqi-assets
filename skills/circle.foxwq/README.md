# 弈友圈（circle.foxwq）

- **ID**：`circle.foxwq`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想分析某个野狐账号的弈友圈、看它最近都跟谁下棋、或找出野狐上经常互相交战的账号群体时用本配方。
它是一个**两阶段技能**，静态 DAG 只有两步：

1. `foxwq_fetch_batch`（宿主内置算子，取数）：按昵称查野狐 uid → 抓主账号棋谱 → 自动扩展到
   「对手的交战对手」→ 按 `chessid` 去重合并成紧凑对局行，出参 `{games, rootUid, rootName,
   expandedUids, fetchedUids}`。
2. `circle.normalize`（`workflow-operator` 插件算子，纯计算）：把 `games` / `rootUid` 投影成
   `{stats, nodes, components, edges, commonOpponents}` —— 全部是可复算的计数与图结构。
   `yield:true` + 配方顶层 `returnToLLM:true` 会把这份汇总回灌到本轮观察，由 **LLM 做关系分析**：
   归纳圈层、枢纽、游离账号与共同对手，并逐条给出基于数据的理由。

**分工铁律**：插件只出计数与图结构，**绝不写「达到几局算熟人」「共邻几个算一圈」之类阈值判定**；
「哪些账号形成弈友圈」由 LLM 依据 `gameCount` / `degree` / `games` / `shared` / `components` 等
数据归纳并给出理由。本技能不走 `display_json_list` 旁路，也不需要「结果见上方列表」那类展示引导语。

## 引用的宿主原语与算子

- `primitives: []`：这是 workflow 配方，步骤由宿主 DAG runner 按 `workflow.steps[]` 执行，
  不挂任何散文原语工具。
- `foxwq_fetch_batch`：宿主内置算子（weiqi-bot 实现），复用 `executeWebFetch` 的 `storeOnly` 链路。
- `circle.normalize`：需先安装并启用「弈友圈关系算子」插件（见下）。

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
- 回灌数据可能被宿主单条消息上限截断 → 只据可见部分分析，不补写、不外推被裁掉的内容。
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

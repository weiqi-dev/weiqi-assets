# 弈友圈（circle.foxwq）

- **ID**：`circle.foxwq`
- **版本**：v2
- **分类**：围棋

## 目标

按野狐昵称查询账号，抓取主账号最近若干页棋谱，再根据主账号对局频率选出前 N 个对手并抓取这些对手的棋谱，最后计算账号关系图与共同对手摘要。

这份配方不再调用任何野狐专用宿主算子。采集从通用宿主原语 `fetch_batch` 开始；URL 构造、分页状态、集合整理、字段转换和围棋关系分析全部由 Workflow 节点组合完成。

## Workflow 结构

1. `url.build` 构造昵称查询 URL。
2. `collection.singleton` 把 URL 对象包装成请求数组，`fetch_batch` 执行通用 GET。
3. 宿主 `json_extract` 提取账号字段，`transform.castFields` 将 uid 统一为字符串。
4. `forEach` 对主账号执行分页子流程；子流程中的 `repeat` 按游标循环：
   - `url.build` 构造棋谱列表 URL；
   - `collection.singleton` 生成单请求数组；
   - `fetch_batch` 抓取当前页；
   - `json_extract` 提取 `lastcode` / `chesslist`；
   - `pagination.cursor` 产出下一轮状态、当前页数据与成功标记。
5. `circle.pickOpponents` 根据主账号对局频率降序、uid 升序选取对手；`maxHops=1` 时不展开对手。
6. 第二个 `forEach + repeat` 对每个对手执行相同分页流程。
7. `json_extract` / `collection.asArray` / `collection.join` / `collection.uniqueBy` 合并并按 `chessid` 去重。
8. `circle.normalize` 计算关系图，`circle.summary` 去掉 edges 逐边明细，仅保留 LLM 分析所需摘要。
9. `collection.statusSummary` 汇总所有分页请求的成功与失败数量。

循环不是由 LLM 手工协调：`forEach` 和有界 `repeat` 均由宿主 Workflow runner 调度；循环体里的每一步仍是独立算子调用。

## 算子与宿主能力边界

| 能力 | 所属层 | 说明 |
|---|---|---|
| `fetch_batch` | 宿主通用原语 | 仅按 URL 列表执行公开 GET，不认识野狐或围棋 |
| `json_extract` | 宿主通用算子 | JSON 路径提取、筛选与投影 |
| `url` | 沙箱算子插件 | 查询参数构造与解析 |
| `collection` | 沙箱算子插件 | 数组包装、连接、展平、去重、分组、排序、状态汇总 |
| `pagination` | 沙箱算子插件 | 把响应转换为统一游标状态与停止标记 |
| `transform` | 沙箱算子插件 | 通用字段类型转换 |
| `circle` | 沙箱领域插件 | 围棋对手筛选、关系图计算与摘要投影 |
| `html` | 沙箱通用插件 | HTML 选择器提取；本配方的接口返回 JSON，因此不需要安装它 |

所有算子插件都在受限沙箱中运行，没有网络、DOM、时钟或存储权限。插件依赖由 Workflow 中的算子命名空间自动推导；安装技能时只安装缺少的插件，已安装/已启用的依赖不会重复安装。

## 参数

| 参数 | 默认值 | 说明 |
|---|---:|---|
| `nickname` | 必填 | 野狐昵称 |
| `pages` | 1 | 每个账号最多抓取的页数；野狐一页约 100 局 |
| `opponentCount` | 8 | 从主账号对局中选取的高频对手数量 |
| `maxHops` | 2 | 1=只抓主账号；2=主账号加选中的对手 |

`pages` 是每个账号的有界循环上限；如果接口提前返回空游标，循环会提前停止。宿主对每个循环控制块有统一的最大迭代保护。

## 分页与失败语义

- 每页使用响应顶层的 `lastcode` 作为下一页游标。
- 游标缺失或为空时停止该账号的分页。
- 单页失败由 `pagination.cursor` 输出 `ok:false` 与空数据，其他账号仍继续处理。
- `fetch-status` 报告本次实际请求页数、失败页数和请求是否全部成功。这里的 `complete` 表示本次发出的请求均成功，不表示抓取了账号的全部历史棋谱。
- 昵称查询失败或关键 Workflow 节点失败会终止本次流程；不编造 uid、棋谱或关系。

## 结果与 LLM 分析

`circle.normalize` 产出 stats / nodes / components / edges / commonOpponents；`circle.summary` 只保留 stats / nodes / components / commonOpponents。配方通过 `llmProjection.keep` 仅把 `summary` 和 `fetch-status` 写入 LLM 结果视图，避免把逐边明细塞进上下文。

`run_workflow` 成功后，模型必须使用宿主只读工具 `workflow_result_read`，按返回的 `resultId` 读完整个投影视图，再进行关系分析。若 `fetch-status.failed > 0`，必须明确说明数据不完整；不能把部分数据描述成完整圈层。

## 数据来源

- 昵称查询：`https://newframe.foxwq.com/cgi/QueryUserInfoPanel`
- 棋谱列表：`https://h5.foxwq.com/yehuDiamond/chessbook_local/YHWQFetchChessList`
- 棋谱分页游标：响应顶层 `lastcode`
- 单局字段由 `circle.normalize` 按 chessid、双方 uid、昵称、段位、时间与胜负结果读取。

## 安装

技能安装器会从 Workflow 中的 `url.*`、`collection.*`、`pagination.*`、`transform.*`、`circle.*` 自动推导插件依赖，按资源 ID 去重安装并启用。宿主只需具备通用 `fetch_batch`、`json_extract` 与支持 `forEach/repeat` 的 Workflow runner。

完整配方见同目录 `skill.json`；资源目录索引见 `skills/registry.json`。

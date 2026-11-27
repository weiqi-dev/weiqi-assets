# 围棋关系算子（workflow-operator.circle）

本插件只负责围棋领域的确定性计算，运行于受限沙箱。它不负责网络采集、分页、HTML/JSON 解析或站点字段搬运；输入由 Workflow 上游的通用宿主原语与通用算子插件准备。

## 方法

- `circle.pickOpponents`：从 rootUid 的对局中统计直接对手，按出现局数降序、uid 升序排序，取前 `opponentCount` 个；`maxHops=1` 时返回空数组。
- `circle.normalize`：清洗标准化对局行，生成 `stats`、`nodes`、`components`、`edges`、`commonOpponents`。
- `circle.summary`：从完整关系图结果中提取 `stats`、`nodes`、`components`、`commonOpponents`，排除逐边 `edges` 明细，供 LLM 分析。

## 输入数据

`games` 是标准化对局行数组，每行使用以下字段：

`chessid, blackuid, blacknick, blackdan, whiteuid, whitenick, whitedan, starttime, winner, reason, point`

uid 在关系计算中统一转为字符串。对局按 chessid 去重，双方账号按 uid 稳定排序，所有统计均可从输出结构复算。

## 输出口径

- `stats`：主账号 uid、去重对局数、节点数、边数、扩展账号数。
- `nodes`：每个账号的 uid、显示名、段位、不同对手数 degree、参与局数 gameCount。
- `components`：连通分量及成员 uid。
- `edges`：账号对之间的对局数、胜场与最近对局时间。
- `commonOpponents`：主账号与其他账号之间可复算的共同对手统计。

插件只提供计数和图结构，不自行设定“熟人”“圈层”“枢纽”等经验阈值；这些解释由上层分析根据数据给出理由。

## 安全边界

- 纯计算：不联网、不访问 DOM、时钟、存储或其它宿主 API。
- 只处理上游传入的 JSON 数据。
- 每个方法均声明 inputSchema / outputSchema / kind / idempotent，并由安装试跑与宿主运行时校验。
- 许可证：MIT。

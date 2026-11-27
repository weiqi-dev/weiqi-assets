# 游标分页算子

把分页响应转换为 Workflow 循环可消费的统一结构；本插件只做纯计算，不请求网络。

`pagination.cursor` 入参：

- `response`：上游返回的 JSON 对象
- `cursorPath`：下一页游标字段路径
- `itemsPath`：当前页数组字段路径
- `statusPath` / `successValue`：可选，校验响应状态

出参为 `{ state: { cursor }, done, items, ok }`。状态字段不匹配、响应无效或 itemsPath 不是数组时返回 `ok:false`、空 items 并结束本轮，不抛错；上游 Workflow 可汇总失败页数。当游标缺失、为 null 或空字符串时，`done=true`；否则 Workflow 可把 `state` 传给下一轮。循环次数由 Workflow 的有界 `repeat` 控制，网络请求仍由宿主通用 `fetch_batch` 完成。

`pagination.batchCursor` 接收一批已附带 `dstuid` 的分页结果，合并当前页数据与成功标记，并生成下一轮 `pending: [{uid,cursor}]`。它适合与 Workflow 的 `forEach + fetch_batch + repeat` 组合，能在每一轮把多个账号的请求合并为一次批量抓取。\n\n许可证：MIT。

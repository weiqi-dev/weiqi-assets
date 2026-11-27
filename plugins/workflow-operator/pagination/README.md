# 游标分页算子

把分页响应转换为 Workflow 循环可消费的统一结构；本插件只做纯计算，不请求网络。

`pagination.cursor` 入参：

- `response`：上游返回的 JSON 对象
- `cursorPath`：下一页游标字段路径
- `itemsPath`：当前页数组字段路径
- `statusPath` / `successValue`：可选，校验响应状态

出参为 `{ state: { cursor }, done, items }`。当游标缺失、为 null 或空字符串时，`done=true`；否则 Workflow 可把 `state` 传给下一轮。循环次数由 Workflow 的有界 `repeat` 控制，网络请求仍由宿主通用 `fetch_batch` 完成。

许可证：MIT。

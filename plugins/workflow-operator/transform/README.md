# 字段转换算子

通用 JSON 字段转换插件，负责把上游数据映射为后续算子需要的稳定类型。

`transform.castFields` 接收 `value` 对象和 `fields` 类型映射，支持将顶层字段转换为 `string`、`number` 或 `boolean`；未声明字段原样保留。数值转换失败会明确报错。

只处理 JSON 数据，不联网、不访问 DOM 或宿主状态。

许可证：MIT。

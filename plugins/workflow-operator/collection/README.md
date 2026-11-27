# 集合处理算子

提供可复用的纯计算数组处理能力，供不同业务 Workflow 组合使用。

| 方法 | 用途 |
|---|---|
| `collection.asArray` | 确保值为数组（标量包装、null 变空数组） |\n| `collection.singletonIfNotEmpty` | 非空数组包装，空数组保持为空（可选批次扇出） |\n| `collection.singleton` | 把任意值包装成单元素数组 |\n| `collection.concat` | 按顺序连接多个数组 |\n| `collection.join` | 连接两个数组 |\n| `collection.statusSummary` | 汇总批量 boolean 状态 |\n| `collection.flatten` | 递归展平数组 |
| `collection.uniqueBy` | 按字段路径去重，保留首次出现项 |
| `collection.groupBy` | 按字段路径分组 |
| `collection.pluck` | 提取字段值 |
| `collection.sortBy` | 按字段排序 |
| `collection.take` | 取开头或末尾若干项 |

字段路径支持点分隔与数组数字下标，例如 `user.uid`、`items[0].id`；`$ ` 表示根值。所有方法只处理输入 JSON，不使用宿主能力。

许可证：MIT。

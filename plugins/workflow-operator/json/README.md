# JSON 与集合算子

统一的 workflow-operator.json 沙箱插件。方法按 json.<method> 注册，全部是纯 JSON 输入输出，不访问宿主资源。

| 方法 | 用途 |
|---|---|
| parse / stringify | JSON 字符串与 JSON 值互转 |
| get / set | 按安全路径读取或设置字段 |
| select | 数组条件筛选与字段投影（where 支持相等、ne、in、notIn） |
| pluck | 从数组记录提取指定路径 |
| concat / append | 数组合并与追加 |
| unique | 按完整值或指定路径稳定去重 |
| groupCount | 分组计数并按数量排序 |
| isEmpty / assert / toString | 空值判断、数据断言与标量字符串化 |
| flatten | 递归展开嵌套数组 |
| sortBy / take | 按字段排序与截取（take 最多 100 项） |

路径支持点号、数字下标与引号键名；拒绝原型相关保留属性。数组合并、去重等操作保持输入顺序，不修改传入对象。

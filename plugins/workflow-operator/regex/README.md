# 正则算子

统一的 workflow-operator.regex 沙箱插件。提供三个纯计算方法：

- **match**：单次匹配，返回 `{ matched, value, index, groups }`；未命中时 `value=null`、`index=-1`、`groups=[]`。
- **extract**：全局提取，返回数组。默认每项是匹配字符串；指定 `group` 后提取对应捕获组。启用 `unique` 按提取值去重，`limit` 限制最终结果数。
- **extract withIndex**：当 `withIndex:true` 时，每项改为 `{ value, index }`，其中 `index` 是匹配在原始文本中的起始位置，采用 JavaScript 字符串的 UTF-16 code-unit 偏移（与 `RegExp.exec().index` 一致）。
- **replace**：按 ECMAScript RegExp 与 `String.replace` 语义替换；默认全局替换。

`extract` 默认启用全局标志 `g`；未提供 `g` 时自动补上。零宽命中时会显式推进游标，避免循环停滞。匹配零宽结果仍会保留其真实起始索引。`match` 不接受 `g/y` 标志，避免状态相关结果；所有方法均不支持 sticky 标志 `y`。

## Extract 返回值示例

默认：

```json
["12", "34"]
```

启用 `withIndex:true`：

```json
[
  { "value": "12", "index": 1 },
  { "value": "34", "index": 5 }
]
```

注意：`withIndex` 会改变数组元素形状，但不会改变顶层数组结构；消费结果的 Workflow 应按是否启用该选项读取字符串或对象字段。

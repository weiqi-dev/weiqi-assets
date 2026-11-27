# 正则算子

统一的 workflow-operator.regex 沙箱插件。提供三个纯计算方法：

- match：单次匹配，返回是否命中、命中内容、索引与捕获组。
- extract：全局提取，可选择捕获组、去重、索引和最大结果数。
- replace：按 ECMAScript RegExp 与 String.replace 语义替换。

extract 默认全局提取；零宽命中时会显式推进游标，避免循环停滞。match 不接受 g/y 标志，避免状态相关结果。
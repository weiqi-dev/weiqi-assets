# 正则提取

- **ID**：`workflow-operator.regex_extract`
- **工件版本**：v4（本地工件自带，只作展示；资源侧 `specVersion` 取宿主 PLUGIN_SPECS）
- **扩展点**：workflow-operator

## 做什么

开发一个名为「正则提取」的插件，实现对文本进行正则表达式提取的功能：支持全局/单次匹配、捕获组、去重、返回索引，并提供 test 与 replace 辅助方法。

## 契约

- 入口 / 资源限额以宿主 `PLUGIN_SPECS` 为准，不在资源侧复制数值；
- `exposes[]` / `smoke[]` 与源码都由宿主导出，完整声明见同目录 `plugin.json`；
- 算子注册名形如 `<slug>.<exposes[].name>`，由宿主 OperatorRegistry 按名精确查表。

## 配方正文

完整源码只写在同目录 `index.js`，本文件不复制代码；改代码请由宿主重新导出，避免两份真相漂移。

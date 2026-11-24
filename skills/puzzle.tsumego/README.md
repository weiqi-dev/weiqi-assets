# 做题练习

- **ID**：`puzzle.tsumego`
- **版本**：v4（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想做题（可带题型与难度，如「做8K手筋题」）时，抽取条件并调用工具，由宿主生成带参数的做题页链接。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想做死活题 / 手筋题 / 官子题等围棋习题时
- 用户说做一道死活题时
- 用户说做8K手筋题这类带题型难度的出题时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

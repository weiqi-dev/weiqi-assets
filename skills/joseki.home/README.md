# 定式

- **ID**：`joseki.home`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想进行定式探索、定式挑战或定式发现时，按功能导航到定式首页或对应的探索 / 发现 / 挑战页面。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想做定式探索时
- 用户想做定式挑战 / 定式题时
- 用户想做定式发现 / 从棋谱里发现定式规律时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

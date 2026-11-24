# 棋手查询

- **ID**：`player.lookup`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想查询围棋棋手资料时，提取棋手真实姓名并导航到棋手查询页面，自动执行查询。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想查某位围棋棋手资料时
- 用户说查询柯洁或看看申真谞的资料时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

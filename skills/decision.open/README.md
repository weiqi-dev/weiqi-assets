# 实战选点

- **ID**：`decision.open`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想做实战选点 / 决策训练 / 形势判断、生成选点题或做恶手题时，导航到实战选点页面。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想做实战选点 / 决策训练时
- 用户想练练形势判断时
- 用户想生成选点题 / 恶手题 / 决策题时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

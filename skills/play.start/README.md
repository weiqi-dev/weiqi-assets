# 围棋对弈

- **ID**：`play.start`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想开始围棋对弈、下棋或观看 AI 对局时，识别对弈模式并导航到对应页面。支持真人对弈、人机对弈和 AI 自对弈；未明确模式时进入对弈选择首页。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想开始围棋对弈或下棋时
- 用户想开始真人对弈 / 人机 / AI 自对弈时
- 用户想观看 AI 对局时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

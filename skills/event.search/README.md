# 赛事查询

- **ID**：`event.search`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想查云比赛 / 围棋赛事、实时排行时，按地区 / 时间 / 关键词抽取条件并导航到赛事查询页自动执行查询。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想查围棋赛事 / 云比赛时
- 用户想查比赛日程时
- 用户想看实时排行时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

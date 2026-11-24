# 查天气

- **ID**：`weather.wttr`
- **版本**：v4（取自 `skill.json` 的 `version` 字段）
- **分类**：生活

## 做什么

按需求选择 wttr.in 请求参数：默认查当天用精简 JSON 一次拿全，要更多天/逐时才取全量并分页；支持自选城市，参数可查 :help。

## 引用的宿主原语

- `web_fetch`
- `web_cache_read`
- `kv_read`
- `kv_write`

## 路由词

- 用户想查某地天气 / 预报时
- 用户想管理自选城市时
- 用户想设默认城市时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

# 查股价

- **ID**：`stock.quote`
- **版本**：v4（取自 `skill.json` 的 `version` 字段）
- **分类**：财经

## 做什么

查单只 / 多只股票的实时价格，并支持用户自选股池：报价后点「添加到自选」由 LLM 存进本地 prefs 偏好，之后说「查询自选股票当前股价」即一次取回全部代码按列表播报

## 引用的宿主原语

- `web_fetch`
- `web_cache_read`
- `kv_read`
- `kv_write`

## 路由词

- 用户想查某只 / 几只股票最新价格时
- 用户想查自选股池行情时
- 用户想把股票加入自选时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

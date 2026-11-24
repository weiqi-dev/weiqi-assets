# 网页搜索（Tavily）

- **ID**：`tavily.search`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：搜索

## 做什么

用户想联网搜索某个话题、查网页资料或找最新信息时，用 Tavily 的 POST 搜索接口按关键词取回结果，读全后由模型解析并总结归纳；API Key 由宿主弹框录入并只发往 api.tavily.com，模型永远读不到明文。

## 引用的宿主原语

- `http_fetch_auth`
- `secret_prompt`
- `web_cache_read`

## 路由词

- 用户想联网搜索某个话题时
- 用户想查网页资料 / 找某个说法的出处时
- 用户想找最新信息时
- 用户要的是没有对应专门技能覆盖的一般性网页检索时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 凭据规格

本配方在 `skill.json` 的 `secrets[]` 声明凭据规格，由宿主 `http_fetch_auth` 按 `secretKey` 查表处理；此处不复述。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

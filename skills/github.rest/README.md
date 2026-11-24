# GitHub REST API

- **ID**：`github.rest`
- **版本**：v2（取自 `skill.json` 的 `version` 字段）
- **分类**：开发

## 做什么

用通用 http_fetch_auth 原语直连 GitHub REST API 查仓库 / Issue / PR；Token 规格由本配方 secrets 声明（仅 api.github.com、Authorization: Bearer），宿主强制，模型永远读不到明文。首次或 401 时模型只贴配置链接，用户弹框录入即自动保存。

## 引用的宿主原语

- `http_fetch_auth`
- `secret_prompt`
- `web_cache_read`

## 路由词

- 用户想查 GitHub 仓库 / Issue / PR 时
- 用户想查最后一个提交时
- 用户想查用户信息时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 凭据规格

本配方在 `skill.json` 的 `secrets[]` 声明凭据规格，由宿主 `http_fetch_auth` 按 `secretKey` 查表处理；此处不复述。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

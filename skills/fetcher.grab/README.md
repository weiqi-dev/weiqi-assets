# 抓取棋谱

- **ID**：`fetcher.grab`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

从分享链接抓谱，或按棋谱类别（直播 / 做题 / 带 AI 分析标注）直达「最新棋谱」里对应来源的列表。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想抓取 / 下载棋谱时
- 用户想从分享链接抓谱时
- 用户想找直播 / 做题 / AI 棋谱时
- 用户想看最新棋谱时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

# 复盘分析

- **ID**：`review.open`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想 AI 复盘棋局、分析棋谱 / 胜率 / 恶手时，导航到复盘分析页面（页面内导入 SGF 或查看复盘历史）。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想 AI 复盘棋局时
- 用户想分析棋谱 / 看胜率曲线 / 找恶手时
- 用户想评估局面时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

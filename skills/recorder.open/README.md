# 记谱

- **ID**：`recorder.open`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：围棋

## 做什么

用户想记录棋谱、摆子出题、拍照还原棋局时，导航到记谱页面（含摆子模式、拍照摆子、拍照识别还原等场景）。

## 引用的宿主原语

- `navigate_to`

## 路由词

- 用户想记一局棋或记录棋谱时
- 用户想摆子出题 / 摆个局面 / 摆定式时
- 用户说拍照摆子时
- 用户说拍照还原棋局或把照片里的棋盘还原成电子棋谱时
- 用户想导入棋谱照片时

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

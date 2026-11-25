# 百度热搜

- **ID**：`baidu.hotsearch`
- **版本**：v4（取自 `skill.json` 的 `version` 字段）

## 做什么

获取百度实时热搜榜页面，用正则提取插件抽出热搜关键词并以列表展示

## 配方正文

完整执行说明（`prompt` / `secrets` / `workflow` / `inputs`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段；
- 递增 `version`：宿主据此提示「有更新」。

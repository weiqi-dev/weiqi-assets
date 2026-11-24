# 发布扩展到 weiqi-assets

- **ID**：`admin.publish`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：开发
- **面向**：weiqi-assets 仓库管理者

## 做什么

把**本地自建技能 / workflow 算子插件**通过宿主原子接口发布到 weiqi-assets：
**直接提交到默认分支固定路径**（不建分支、不发 PR），GitHub Pages 随即公开，别人即可在技能面板在线安装。
这是一份意图明确的**独立管理者技能**，纯声明 JSON，按 `routeHint` 命中；不命中就走原本地开发 / 使用流程，零污染。
本技能不改动 `user.` 前缀边界、在线安装只读等既有口径；宿主只给原子接口，不做 Service / 编排 / 新面板 / 发布前确认 UI。

## `github_token` 权限

沿用现有 `github_token` key（与旧凭据体系同一个 key，不新增独立 token）。规格在 `skill.json` 的 `secrets[]`
（`allowedHosts: ["api.github.com"]`、`Authorization: Bearer `、GET / 401 失效），由宿主按 `secretKey` 查表强制，
模型永远读不到明文。首次 / 401 只把 `secret-prompt:github_token` 链接原样贴给用户、结束本轮，等用户弹框配置后的下一条消息。

- **classic PAT**：勾选 `repo` 权限；
- **fine-grained PAT**：对目标仓库授予 **Contents: read & write**。

统一口径：查数据需读权限；发布需目标仓库 Contents 写权限。

## 两个宿主原语各做什么

| 原语 | 作用 |
|---|---|
| `asset_export({kind, id})` | 导出本地资源，返回句柄与变更集摘要（改了哪些文件、落到哪个固定路径）。**这一步即发布前预览**，模型只转述摘要、不复述文件正文。 |
| `github_publish_file({handle, message?})` | **提交**：把句柄对应的变更直接提交到默认分支固定路径，不建分支 / PR，Pages 立即公开。`message` 可选。 |

`secret_prompt` 用于换 / 改凭据，返回同一条 `secret-prompt:github_token` 弹框配置链接。

## 发布前必须预览、等确认（SKILL_FOOTER）

发布是写外部仓库、改动业务库 / 外部状态的写操作，必须遵守 `SKILL_FOOTER`：
先预览（`asset_export` 的摘要）、结束本轮、等用户下一条消息明确确认后再提交（`github_publish_file`）。
预览与提交不能挤在同一轮；「预览」不等于已获确认。

## 依赖算子一起发

带 `workflow` 的技能必须**连同依赖的 `workflow-operator` 算子插件一起发布**：
各导出一次、在预览里一并列出，确认后一并提交。只发配方不发算子，别人装了也跑不起来。
依赖以 `asset_export` 返回的摘要为准，不凭记忆补写。

## 不兼容已删除的旧通用查数配方

早先那份用通用 `http_fetch_auth` 查 GitHub REST 数据的通用配方已彻底删除（连目录带索引引用全删），
不做兼容桥、不写别名、不保留重定向；`github_token` key 转由本技能沿用。
旧的查询仓库 / Issue / PR 专门配方不再提供。

## 配方正文

完整执行说明（`prompt` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

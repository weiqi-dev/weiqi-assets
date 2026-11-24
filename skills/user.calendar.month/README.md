# 月历

- **ID**：`user.calendar.month`
- **版本**：v1（取自 `skill.json` 的 `version` 字段）
- **分类**：生活

## 做什么

用户要看某年某月的日历时用本配方：填好 year/month 让 run_workflow 一次取回节假日 JSON、由 calendar.buildMonth 算完整月历并走宿主旁路渲染，模型不碰历法数据、不写表格；改年月按 inputs 重跑，算子未启用或数据取不到如实说明、不编造。

## 引用的宿主原语

无（这条是 workflow 配方，步骤由宿主 DAG runner 按 `workflow.steps[]` 执行）。

## 路由词

- 用户想看某年某月的月历 / 日历 / 月份时
- 只问今天几号 / 单独问某个节气或节日日期不走这条

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## Workflow DAG

本配方用 `workflow.steps[]` 声明 DAG，算子契约见 [扩展点契约](../../docs/extension-points.md)。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

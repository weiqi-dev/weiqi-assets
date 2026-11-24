# 同花顺财经新闻

- **ID**：`stock.news.10jqka`
- **版本**：v4（取自 `skill.json` 的 `version` 字段）
- **分类**：财经

## 做什么

用户想看最新财经新闻 / 股市快讯时用本配方：填好 inputs 让 run_workflow 一次取回同花顺推送 JSON 并渲染成标题列表，模型不读新闻正文；改条件（翻页 / 分类 / 展示字段）按 inputs 重跑，取不到如实说明、不编造。inputs 缺省值（page=1 首页、pagesize=20 默认一次展示量、tag 空、format=list、fields 默认只显示标题、note 沿用旧配方免责原文）均有旧配方明文出处，不是拟合常数。

## 引用的宿主原语

无（这条是 workflow 配方，步骤由宿主 DAG runner 按 `workflow.steps[]` 执行）。

## 路由词

- 用户想看最新财经新闻 / 股市快讯时
- 查股价 / 聊股票话题不走这条

## 配方正文

完整执行说明（`prompt` / `workflow` / `inputs` / `secrets`）只写在同目录 `skill.json`，本文件不复制正文，避免两份真相漂移。

## Workflow DAG

本配方用 `workflow.steps[]` 声明 DAG，算子契约见 [扩展点契约](../../docs/extension-points.md)。

## 修订

- 改配方正文只动 `skill.json`；
- 同步更新 `skills/registry.json` 里同 `id` 索引条目的重叠字段（`id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category`）；
- 递增 `version`：宿主据此提示「有更新」，口径见 [贡献指南](../../docs/contributing.md)。

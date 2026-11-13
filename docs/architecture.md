# 架构与分工

## 定位

weiqi-assets 是 **weiqi-bot 的开放扩展资源仓库**，不是一个应用，也不是 npm 包。

它解决一件事：让插件与 LLM 工具能独立于 weiqi-bot 的发版节奏被发布、被发现、被下载。
宿主不需要为了加一个排名口径或一条工具声明而重新构建整个 Web 资源包。

三条边界：

1. **只发布静态文件**：JSON 清单 + JS 源码 + Markdown。无服务端、无构建、无依赖。
2. **不替宿主做决策**：下载什么、何时下载、是否启用、失败如何回落，全部由 weiqi-bot 决定。
3. **不持有数据**：不含棋谱库、不含用户信息、不含需要鉴权的接口地址。

## 宿主现状（2026-11-13 摸底）

| 能力 | weiqi-bot 里的位置 | 与资源库的关系 |
|---|---|---|
| 插件工件模型 | `domain/plugin/types.ts`（`PluginArtifact` / `PluginSpec`） | `plugins/` 的 manifest 对齐它 |
| 插件校验 | `domain/plugin/PluginValidator.ts` | `scripts/validate.mjs` 复用同一套禁用规则 |
| 插件执行 | `infrastructure/plugin-vm/QuickJsExecutor.ts`（QuickJS + wasm） | 插件源码必须能在零能力沙箱里跑 |
| 扩展点接入 | `application/plugin/RankingPluginAdapter.ts`、`PluginSystem.applyRanking()` | 目前只有 `ranking.tiebreak` |
| 工具声明 | `application/model/IModelGateway.ts`（`ModelToolDefinition`） | `tools/` 的 `definition` 对齐它 |
| 工具注册 | `application/chat/WebToolLoop.ts`（`TOOLS[]` / `EXECUTORS`） | 目前全部宿主内置 |
| 资源下载 | `web-resources.zip` 预下载 + `remoteBase` 按需回源；`scripts/build-assets.mjs` 控制排除项 | 扩展资源天然属于「按需」，不进预加载包 |
| SGF 分享/下载 | `services/share/ShareService.ts`（编码） + `js/share.js` / `share/`（解码着陆页） | **legacy 冻结路径**，见下 |

### 与按需下载机制的关系

weiqi-bot 的 Web 资源分两类：`web-resources.zip` 在客户端启动时预下载，其余文件
（模型、定式库分块、题库、QuickJS wasm 等）留在远端，缓存未命中时按相对路径回源
`remoteBase`，首次用到才下载。

扩展资源属于第二类。宿主应通过 `registry.json` 拉取清单，而不是把 `plugins/` / `tools/`
整个塞进预加载 zip —— 那等于把「按需」变回「全量预下载」。这也意味着：

- 宿主侧需要一个「资源清单客户端」（取 `registry.json` → 过滤 → 取条目 → 安装）。
- 该客户端尚未实现时，本仓库的资源仍可被人工/脚本取用；`registry.json` 的 URL 是稳定入口。
- 失败必须回落：清单取不到、条目解析失败、插件试跑不通过，都不能让页面白屏。

## 为什么 share 资源不参与改造

`js/share.js` 生成的二维码内容指向 `https://weiqi-dev.github.io/weiqi-assets/share/?d=<encoded>`。
这个 URL 会被打印、截图、转发到微信，一旦路径变更，所有历史二维码都失效 —— 而它们
无法被召回。因此：

- 路径 `js/share.js`、`share/index.html` **冻结**；
- 不纳入 `registry.json`，不作为「扩展资源」；
- 只接受 bug 修复，不新增功能；若将来要出新版本，应另开路径并保留旧版兼容。

weiqi-bot 侧的对应 URL 已收敛到单一常量（见 `clients/web/shared/constants/assets.ts`），
以后要换域名或换路径只改一处。

## 版本策略

- `registry.json` 的 `schemaVersion` 是**清单格式**版本，宿主解析前先看它；不认识就停止并回落。
- 每个插件条目带 `specVersion`，对应宿主 `PluginSpec.version`；宿主 spec 升级时，旧工件按
  自己申报的版本解释，不静默改变行为。
- 工具条目带 `version`，同一 `name` 可并存多个版本目录（`tools/<name>/v<N>/`）。
- 资源 ID 一旦发布即稳定，不复用、不改名；废弃用新条目 + `summary` 说明，不删文件。

## 安全边界

- 插件代码只在宿主 QuickJS 沙箱里执行，默认零 hostApi；资源库不提供任何提权途径。
- 工具条目的 `implementation.status` 明确区分「声明镜像」与「可下载实现」；
  当前没有 `downloadable`。将来若开放，必须先在宿主 `WebToolLoop` 里定义外部执行器的
  隔离与注册规则，**不要把任意远程 JS 直接放进主线程**。
- 所有 `path` / `code` / `readme` 都是仓库内相对路径，校验脚本阻止 `..` 逃逸与绝对路径。

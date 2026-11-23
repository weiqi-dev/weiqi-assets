# 架构与分工

## 定位

weiqi-assets 是 **weiqi-bot 的开放扩展资源仓库**，不是一个应用，也不是 npm 包。

它解决一件事：让插件、LLM 工具与技能配方能独立于 weiqi-bot 的发版节奏被发布、被发现、被下载。
宿主不需要为了加一个排名口径、一条工具声明或一条技能配方而重新构建整个 Web 资源包。
此外它还托管 SGF 二维码分享所需的静态页面与库。

三条边界：

1. **只发布静态文件**：JSON 清单 + JS 源码 + Markdown。无服务端、无构建、无依赖。
2. **不替宿主做决策**：下载什么、何时下载、是否启用、失败如何回落，全部由 weiqi-bot 决定。
3. **不持有数据**：不含棋谱库、不含用户信息、不含需要鉴权的接口地址。

## 宿主现状（2026-11-15）

| 能力 | weiqi-bot 里的位置 | 与资源库的关系 |
|---|---|---|
| 插件工件模型 | `domain/plugin/types.ts`（`PluginArtifact` / `PluginSpec`） | `plugins/` 的 manifest 对齐它 |
| 插件校验 | `domain/plugin/PluginValidator.ts`、`domain/ranking/RankingTable.ts` | `scripts/validate.mjs` 复用同一套禁用规则 + 扩展点白名单 |
| 插件执行 | `infrastructure/plugin-vm/QuickJsRuntime.ts`（QuickJS + wasm Worker） | 插件源码必须能在零能力沙箱里跑 |
| 扩展点接入 | `application/plugin/RankingPluginAdapter.ts`（ranking）、`OperatorRegistry.ts`（workflow-operator） | 注册表 `PLUGIN_SPECS` 两个扩展点：`ranking` 走赛事页排名管线；`workflow-operator` 是工作流算子插件，`exposes[]` 每个方法按名注册进宿主 `OperatorRegistry`，供阶段二 workflow runner 按名调用（不挂模型 `tools[]`） |
| 在线插件平台 | `services/plugin-catalog/*`（取清单/装/更新）、助手页「插件」弹框的「在线插件」标签页 | 取 `registry.json`，按 `pointId` 查 spec 分别试跑，只装 `type: plugin`，默认停用、人工启用 |
| 工具声明 | `application/model/IModelGateway.ts`（`ModelToolDefinition`） | `tools/` 的 `definition` 对齐它 |
| 工具注册 | `application/chat/WebToolLoop.ts`（`TOOLS[]` / `EXECUTORS`） | 目前全部宿主内置 |
| 技能配方模型 | `application/skill/SkillRecipe.ts`（`parseSkillRecipe`）、`SkillTypes.ts`（`SkillRecipe`） | `skills/registry.json` 的纯声明配方对齐它 |
| 在线技能平台 | `services/skill-catalog/*`（`SkillCatalogService` / `SkillCatalogSources`）、助手页「🧠 技能」面板 | 取独立的 `skills/registry.json`，只供浏览 / 安装；装进本地库才生效 |
| 技能生效 | `application/skill/SkillSelector.ts` / `SkillSystemPrompt.ts` + `UserSkillStore` | `loadSkills()` 只取本地库 enabled 条目，在线源不自动叠加 |
| 资源下载 | `web-resources.zip` 预下载 + `remoteBase` 按需回源；`scripts/build-assets.mjs` 控制排除项 | 扩展资源天然属于「按需」，不进预加载包 |
| SGF 分享/下载 | `services/share/ShareService.ts`（编码） + `share/`（解码着陆页与库） | 站点能力，URL 契约见 `share/README.md` |

### 与按需下载机制的关系

weiqi-bot 的 Web 资源分两类：`web-resources.zip` 在客户端启动时预下载，其余文件
（模型、定式库分块、题库、QuickJS wasm 等）留在远端，缓存未命中时按相对路径回源
`remoteBase`，首次用到才下载。

扩展资源属于第二类。宿主通过 `registry.json` 拉取插件 / 工具清单，而不是把 `plugins/` / `tools/`
整个塞进预加载 zip —— 那等于把「按需」变回「全量预下载」。
技能配方是**另一条链路**：宿主直接取 `skills/registry.json`（站点根 + 固定路径，由 `SkillCatalogSources` 的代码常量给出），
不经过顶层 `registry.json`、不按 `path` 拼条目；清单本身就是配方数组。
它不在本仓库的 `schema/` / `scripts/validate.mjs` 校验范围内（结构契约在宿主 `SkillRecipe.ts`）。

宿主侧 `services/plugin-catalog/*` 已实现「资源清单客户端」（取 `registry.json` → 过滤 → 取条目 → 安装），
默认源是 `services/share/WeiqiAssetsUrls.ts` 的 `WEIQI_ASSETS_REGISTRY_URL`，用户可另加自定义源
（默认源只读、由 git 发布，自定义源由用户自行承担信任）。安装写入 `PluginArtifactStore`（IndexedDB），
并带 `catalogRef` 记录来源，用来比对更新。失败必须回落：清单取不到、条目解析失败、插件试跑不通过，
都不能让页面白屏。

## `share/` 在架构里的位置

`share/` 是**站点能力**，不是扩展资源，因此不进 `registry.json`：

- 宿主直接拼 URL 引用它（`WEIQI_SHARE_DECODE_URL` + `?d=<encoded>`），不需要清单解析；
- 二维码链路的两端分别在 weiqi-bot（编码生成链接）与本仓库（解码下载 SGF），
  两处 `decodeUrl` 必须一致，由 `scripts/validate.mjs` 校验；
- 库 `share/share.js` 是纯库，加载无副作用，解码只由 `share/index.html` 显式触发；
- 本次整改把库从 `js/share.js` 收进 `share/`，删除了 `js/` 目录。
  旧二维码兼容性按需求明确不予考虑，路径可随版本演进，但换路径须两仓同步。

## 版本策略

- `registry.json` 的 `schemaVersion` 是**清单格式**版本，宿主解析前先看它；不认识就停止并回落。
- 每个插件条目带 `specVersion`，对应宿主 `PluginSpec.version`；宿主 spec 升级时，旧工件按
  自己申报的版本解释，不静默改变行为。
- 工具条目带 `version`，同一 `name` 可并存多个版本目录（`tools/<name>/v<N>/`）。
- 技能配方带 `version`（正整数）；宿主「有更新」判据是远端与本地同 `id` 的 `version` 不等，
  更新按同 id 覆盖并保留用户已设的启停状态，不做版本号大小比较。
- 资源 ID 一旦发布即稳定，不复用、不改名；废弃用新条目 + `summary` 说明，不删文件。
  技能配方 id 用语义化命名（如 `weather.wttr` / `stock.quote`），不要占用宿主自建技能保留的 `user.` 前缀。
- `share/` 的 URL 契约变更按「两仓同步 + 校验通过」处理，不设不可变约束。

## 安全边界

- 插件代码只在宿主 QuickJS 沙箱里执行，默认零 hostApi；资源库不提供任何提权途径。
- `workflow-operator` 工件把确定性计算能力带给宿主算子表，但不改变这条边界：源码不进主线程、不进模型上下文，
  `method` 只认 `exposes[]` 白名单，`args` 只作为 JSON 数据进入沙箱；算子调用方给的文本永远不参与代码拼接。
  阶段一只提供按名查/按名执行的注册地基，不做配方解析、不做 DAG runner。
- 工具条目的 `implementation.status` 明确区分「声明镜像」与「可下载实现」；
  当前没有 `downloadable`。将来若开放，必须先在宿主 `WebToolLoop` 里定义外部执行器的
  隔离与注册规则，**不要把任意远程 JS 直接放进主线程**。
- 技能配方是纯声明 JSON：只引用宿主已注册的原语名，不含任何可执行代码、也不执行远程 JS；
  引用宿主没有的原语的配方只展示、不可安装。
- 所有 `path` / `code` / `readme` 都是仓库内相对路径，校验脚本阻止 `..` 逃逸与绝对路径。
- `share/share.js` 从 CDN 按需加载 `qrcodejs` 仅用于生成二维码；不引入其他远程依赖，
  解码下载链路完全本地。

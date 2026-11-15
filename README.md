# weiqi-assets

**weiqi-bot 的开放扩展资源库**：发布可下载的插件工件与 LLM 工具声明，供 weiqi-bot 按需发现、下载、安装；同时托管 SGF 二维码分享的站点能力。

站点：<https://weiqi-dev.github.io/weiqi-assets/>

> 本仓库是**纯静态资源**，不含构建产物、不含运行时依赖，也不内置任何棋谱/个人数据。
> 宿主（weiqi-bot）决定下载什么、何时下载、是否启用；资源库只负责「能被找到、能被校验、能被取走」。

## 两类扩展资源

| 类型 | 目录 | 对齐的宿主契约 | 当前状态 |
|---|---|---|---|
| 插件工件 | `plugins/` | `weiqi-bot/domain/plugin/types.ts` 的 `PluginArtifact` / `PluginSpec`（QuickJS 沙箱执行） | 可用 1 个：`ranking` 的「总分排序」 |
| LLM 工具声明 | `tools/` | `weiqi-bot/application/model/IModelGateway.ts` 的 `ModelToolDefinition` | 镜像 1 个：`web_fetch` |

插件是**可执行代码**（在宿主 QuickJS 沙箱里跑，零宿主能力）；工具目前是**声明镜像**（执行器由宿主内置，见各条目 `README.md`）。
两者都通过顶层 `registry.json` 索引，`schema/` 给出 JSON Schema 契约，`scripts/validate.mjs` 做一致性校验。

宿主的在线插件平台**只安装 `type: plugin`**；`type: tool` 只在列表里展示，不提供安装按钮。
默认源 `https://weiqi-dev.github.io/weiqi-assets/registry.json` 只读、由本仓库 git 发布；
宿主可另加自定义源，但默认源不可被覆盖。

## 目录结构

```
weiqi-assets/
├── registry.json              # 顶层扩展资源清单（下载入口，先取这个文件）
├── schema/
│   ├── registry.schema.json   # 清单契约
│   ├── plugin.schema.json     # 插件元数据契约
│   └── tool.schema.json       # 工具声明契约
├── plugins/                   # 插件工件，按扩展点分目录
│   └── ranking/
│       └── total-score/       # 总分排序（可用工件）
│           ├── plugin.json    # 元数据（含 code 相对路径）
│           ├── index.js       # 完整源码（永远全量，不是 diff）
│           └── README.md      # 契约来源与安装形状
├── tools/                     # LLM 工具声明，按工具名/版本分目录
│   └── web-fetch/v1/
│       ├── tool.json
│       └── README.md
├── share/                     # SGF 二维码分享与下载（站点能力，见 share/README.md）
│   ├── index.html             # 扫码着陆页
│   ├── share.js               # 编解码 + 二维码库（纯库，无副作用）
│   └── README.md              # URL 契约、数据格式、触发方式
├── scripts/validate.mjs       # 清单/条目/代码/URL 契约一致性校验（零依赖）
├── docs/
│   ├── architecture.md        # 定位、下载链路、与 weiqi-bot 的分工
│   ├── extension-points.md    # 扩展点契约与宿主对照表
│   └── contributing.md        # 新增插件 / 工具的完整步骤
├── index.html                 # 站点导航页
└── package.json
```

### 关于 `share/`

`registry.json` **只登记 plugin / tool**，`share/` 不进去。理由：registry 是「宿主按需下载的扩展资源」，
而 share 是宿主直接拼 URL 引用的页面与脚本，塞进去只会让宿主多一层没必要的解析。

历史上库放在 `js/share.js`；本次整改把它收进 `share/`，`js/` 目录随之删除。
旧二维码的兼容性按需求明确不予考虑，因此 `decodeUrl` 仍用 `…/share/?d=` 是**当前选择**而非兼容包袱：
以后换域名或换路径，两边同步改一处即可。详见 [share/README.md](share/README.md)。

## 下载链路（宿主侧）

```
1. GET  /registry.json                     ← 唯一入口，schemaVersion 决定后续解析
2. 按 type / pointId / id 过滤资源（只装 plugin）
3. GET  <entry.path>                       ← 相对 registry.baseUrl 或本站点根
4. 插件：GET  <manifest.code> 取源码 → 构造 PluginArtifact 写入工件存储
   工具：仅展示 definition，不注册执行器
5. 校验（宿主侧）：PluginValidator + QuickJS 沙箱试跑 + validateRankingOutput；任何失败回落到内置实现
6. enabled 由用户决定；下载 ≠ 安装 ≠ 启用
7. 工件记录 catalogRef（来源源 URL + 资源 id）；远端 code 与本地 code 不同时按钮变「更新」，
   走本地 revise(trigger:'manual') 保留 history，不新建副本
```

`registry.json` 里每个 `path` 都是**仓库内相对路径**，`code` / `readme` 同理，
宿主拼接时以 `registry.baseUrl` 为基准；不要硬编码单条资源的绝对 URL。
路径用 `new URL(rel, base)` 解析并断言同源，阻止 `..` 越界与绝对外链。

## 校验

```bash
npm run validate      # 或 node scripts/validate.mjs
```

零依赖（Node 原生）。检查：JSON 合法、必填字段、路径不越界、registry 与条目 ID 一致、
插件代码入口存在且不含宿主禁用的全局/动态求值/无界循环，以及
`share/share.js` 的 `decodeUrl` / `libUrl` 与站点 URL 契约一致。

禁用规则与 `weiqi-bot/domain/plugin/PluginValidator.ts` **同源**——注意该校验器对全串做正则，
**注释里出现禁用词也会被拦下**，示例插件因此刻意不写出那些词。

## 数值与契约的来源

本仓库不自定义配额、超时、阈值。所有契约数值都来自宿主并有明确出处：

| 出现处 | 来源 |
|---|---|
| `pointId` / `specVersion` / `entry` / hostApi / 资源配额 | `weiqi-bot/domain/plugin/types.ts`（`RANKING_SPEC`、`DEFAULT_PLUGIN_LIMITS`） |
| 工具声明形状 | `weiqi-bot/application/model/IModelGateway.ts`（`ModelToolDefinition`） |
| 插件禁用规则 | `weiqi-bot/domain/plugin/PluginValidator.ts` |
| 输出契约（columns / rows / cells） | `weiqi-bot/domain/ranking/RankingTable.ts`（`validateRankingOutput`） |
| 在线平台默认源 URL | `weiqi-bot/services/share/WeiqiAssetsUrls.ts`（`WEIQI_ASSETS_REGISTRY_URL`） |
| 分享编解码格式 | `share/share.js` 与 `weiqi-bot/domain/share/`（`GameEncoder`） |
| 分享 `decodeUrl` | `weiqi-bot/services/share/WeiqiAssetsUrls.ts`（`WEIQI_SHARE_DECODE_URL`） |

资源侧只声明「遵守哪个 spec 版本」，宿主升级时以宿主为准，避免两份数值各自漂移。

## 相关文档

- [架构与分工](docs/architecture.md)
- [扩展点契约](docs/extension-points.md)
- [贡献指南](docs/contributing.md)
- [SGF 分享能力](share/README.md)

## License

MIT — 见 [LICENSE](LICENSE)。各资源条目可在自身 manifest 里单独声明 `license`。

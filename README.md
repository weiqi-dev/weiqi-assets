# weiqi-assets

**weiqi-bot 的开放扩展资源库**：发布可下载的插件工件与 LLM 工具声明，供 weiqi-bot 按需发现、下载、安装。

站点：<https://weiqi-dev.github.io/weiqi-assets/>

> 本仓库是**纯静态资源**，不含构建产物、不含运行时依赖，也不内置任何棋谱/个人数据。
> 宿主（weiqi-bot）决定下载什么、何时下载、是否启用；资源库只负责「能被找到、能被校验、能被取走」。

## 两类资源

| 类型 | 目录 | 对齐的宿主契约 | 当前状态 |
|---|---|---|---|
| 插件工件 | `plugins/` | `weiqi-bot/domain/plugin/types.ts` 的 `PluginArtifact` / `PluginSpec`（QuickJS 沙箱执行） | 示例 1 个：`ranking.tiebreak` |
| LLM 工具声明 | `tools/` | `weiqi-bot/application/model/IModelGateway.ts` 的 `ModelToolDefinition` | 镜像 1 个：`web_fetch` |

插件是**可执行代码**（在宿主 QuickJS 沙箱里跑，零宿主能力）；工具目前是**声明镜像**（执行器由宿主内置，见各条目 `README.md`）。
两者都通过顶层 `registry.json` 索引，`schema/` 给出 JSON Schema 契约，`scripts/validate.mjs` 做一致性校验。

## 目录结构

```
weiqi-assets/
├── registry.json              # 顶层资源清单（下载入口，先取这个文件）
├── schema/
│   ├── registry.schema.json   # 清单契约
│   ├── plugin.schema.json     # 插件元数据契约
│   └── tool.schema.json       # 工具声明契约
├── plugins/                   # 插件工件，按扩展点分目录
│   └── ranking.tiebreak/
│       └── example-direct-win/
│           ├── plugin.json    # 元数据（含 code 相对路径）
│           ├── index.js       # 完整源码（永远全量，不是 diff）
│           └── README.md      # 契约来源与安装形状
├── tools/                     # LLM 工具声明，按工具名/版本分目录
│   └── web-fetch/v1/
│       ├── tool.json
│       └── README.md
├── scripts/validate.mjs       # 清单/条目/代码一致性校验（零依赖）
├── docs/
│   ├── architecture.md        # 定位、下载链路、与 weiqi-bot 的分工
│   ├── extension-points.md    # 扩展点契约与宿主对照表
│   └── contributing.md        # 新增插件 / 工具的完整步骤
├── js/share.js                # 【legacy 冻结】SGF 二维码分享库
├── share/index.html           # 【legacy 冻结】扫码下载 SGF 着陆页
└── index.html                 # 站点导航页
```

### 为什么 `js/` 和 `share/` 不动

`js/share.js` 与 `share/` 是 weiqi-bot **SGF 二维码分享与下载**功能依赖的固定 URL：

```
https://weiqi-dev.github.io/weiqi-assets/js/share.js
https://weiqi-dev.github.io/weiqi-assets/share/?d=<encoded>
```

二维码一旦生成（打印、截图、转发），URL 就固化了；改路径会让所有历史二维码失效。
因此这两个目录**路径冻结、只修 bug 不加功能**，不属于扩展资源体系，也不进 `registry.json`。

## 下载链路（宿主侧）

```
1. GET  /registry.json                     ← 唯一入口，schemaVersion 决定后续解析
2. 按 type / pointId / id 过滤资源
3. GET  <entry.path>                       ← 相对 registry.baseUrl 或本站点根
4. 插件：GET  <manifest.code> 取源码 → 构造 PluginArtifact 写入工件存储
   工具：取 definition → 对齐宿主 ModelToolDefinition 后决定是否注册
5. 校验（宿主侧）：PluginValidator + QuickJS 沙箱试跑；任何失败回落到内置实现
6. enabled 由用户决定；下载 ≠ 安装 ≠ 启用
```

`registry.json` 里每个 `path` 都是**仓库内相对路径**，`code` / `readme` 同理，
宿主拼接时以 `registry.baseUrl` 为基准；不要硬编码单条资源的绝对 URL。

## 校验

```bash
npm run validate      # 或 node scripts/validate.mjs
```

零依赖（Node 原生）。检查：JSON 合法、必填字段、路径不越界、registry 与条目 ID 一致、
插件代码入口存在且不含宿主禁用的全局/动态求值/无界循环。
禁用规则与 `weiqi-bot/domain/plugin/PluginValidator.ts` **同源**——注意该校验器对全串做正则，
**注释里出现禁用词也会被拦下**，示例插件因此刻意不写出那些词。

## 数值与契约的来源

本仓库不自定义配额、超时、阈值。所有契约数值都来自宿主并有明确出处：

| 出现处 | 来源 |
|---|---|
| `pointId` / `specVersion` / `entry` / hostApi / 资源配额 | `weiqi-bot/domain/plugin/types.ts`（`RANKING_SPEC`、`DEFAULT_PLUGIN_LIMITS`） |
| 工具声明形状 | `weiqi-bot/application/model/IModelGateway.ts`（`ModelToolDefinition`） |
| 插件禁用规则 | `weiqi-bot/domain/plugin/PluginValidator.ts` |
| 输出契约（rank / id） | `weiqi-bot/application/plugin/RankingPluginAdapter.ts` |
| 分享编解码格式（legacy） | `js/share.js` 与 `weiqi-bot/domain/share/`（`GameEncoder`） |

资源侧只声明「遵守哪个 spec 版本」，宿主升级时以宿主为准，避免两份数值各自漂移。

## 相关文档

- [架构与分工](docs/architecture.md)
- [扩展点契约](docs/extension-points.md)
- [贡献指南](docs/contributing.md)

## License

MIT — 见 [LICENSE](LICENSE)。各资源条目可在自身 manifest 里单独声明 `license`。

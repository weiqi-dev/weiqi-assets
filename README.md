# weiqi-assets

**weiqi-bot 的开放扩展资源库**：发布可下载的插件工件、LLM 工具声明与技能配方，供 weiqi-bot 按需发现、下载、安装；同时托管 SGF 二维码分享的站点能力。

站点：<https://weiqi-dev.github.io/weiqi-assets/>

> 本仓库是**纯静态资源**，不含构建产物、不含运行时依赖，也不内置任何棋谱/个人数据。
> 宿主（weiqi-bot）决定下载什么、何时下载、是否启用；资源库只负责「能被找到、能被校验、能被取走」。

## 三类扩展资源

| 类型 | 目录 | 清单入口（唯一事实源） | 对齐的宿主契约 |
|---|---|---|---|
| 插件工件 | `plugins/` | 顶层 `registry.json` 的 `resources[]` | `weiqi-bot/domain/plugin/types.ts` 的 `PluginArtifact` / `PluginSpec`（QuickJS 沙箱执行） |
| LLM 工具声明 | `tools/` | 同上（与插件共用一份清单） | `weiqi-bot/application/model/IModelGateway.ts` 的 `ModelToolDefinition` |
| 技能配方 | `skills/` | **`skills/registry.json` 的 `skills[]`（独立清单）** | `weiqi-bot/application/skill/SkillRecipe.ts` / `SkillTypes.ts` 的 `SkillRecipe` |

清单是唯一事实源：**条目数量与明细一律以两份清单为准**，站点 `index.html` 运行时 `fetch` 清单后渲染列表，
本 README 不再逐条列举、也不写死数量。新增 / 修订资源只改对应清单（加 skill 改 `skills/registry.json`，
加插件 / 工具改 `registry.json` + 建条目目录），**不用同步改 README 或 index.html**。

插件是**可执行代码**（在宿主 QuickJS 沙箱里跑，零宿主能力）；工具目前是**声明镜像**（执行器由宿主内置，见各条目 `README.md`）；
技能配方是**纯声明 JSON**，只引用宿主已注册的原语名，永远不含可执行代码。
插件与工具通过顶层 `registry.json` 索引，`schema/` 给出 JSON Schema 契约，`scripts/validate.mjs` 做一致性校验。
**技能配方不进顶层 `registry.json`**：它是另一份清单，结构契约在 weiqi-bot 的 `SkillRecipe.ts`，
本仓库没有对应 schema，`scripts/validate.mjs` 也不校验它（只校验顶层 registry / 条目 / 代码 / share URL 契约）。
`index.html` 的两个列表同样直接读取这两份清单渲染，页面里不存任何条目副本。

### 技能怎么被激活

配方**不写触发词**。宿主在每轮对话前把已启用技能的 `id | name | summary` 组成一份目录，交给模型做一次轻量路由，由模型按用户意图决定本轮启用哪些技能；目录外 id 一律丢弃，路由失败则本轮不启用技能、正常对话继续。

因此写配方时，`name` 与 `summary` 要说清「什么场景、做什么」，这是路由唯一依据；`prompt` 是技能启用后才追加给对话模型的指令，不参与路由。

### 开发「需要凭据」的技能怎么写

以 `github.rest` 为例。这类技能**不需要写任何代码**，只要在配方里做两件事：

1. `primitives` 引用宿主通用原语 `http_fetch_auth`（带凭据直连）、`secret_prompt`（换/改凭据）、`web_cache_read`（长正文分页读）。
2. 加一段 `secrets` 纯声明规格：每项给 `key`（凭据名）、`label`（弹框标签）、`allowedHosts`（允许发往的纯域名数组）、`header`（宿主怎么拼请求头：`name` + `prefix`），可选 `setupUrl` / `hint` / `reauthStatuses`（哪些状态码算失效，默认 `[401]`）。

运行时模型调用 `http_fetch_auth` **只能给 `url` 和 `secretKey` 两个参数**；允许访问哪些域名、请求头怎么拼，全部由宿主按这份 `secrets` 声明强制决定，模型传不进来、也永远接触不到凭据明文。首次使用或凭据失效时，原语回一条 `secret-prompt:<key>` 链接，模型只负责把链接原样贴给用户；用户点开弹框录入即自动保存到本地（`secrets` 域，opaque），宿主回灌一条用户消息触发下一轮，下次不再弹框。说「修改 / 换」也由 `secret_prompt` 触发同一个弹框。

**扩展**：接入另一家认证 API 只需再写一条配方、换一份 `secrets` 声明（不同的 key / allowedHosts / header），宿主内核、`http_fetch_auth` 工具签名、弹框都不用改。

### 开发「使用偏好」类技能怎么写（本地数据层第二期）

以 `stock.quote` v3 的自选股池为例。它与「凭据」场景是**刻意做成的镜像**，别混用：

| | 凭据（第一期） | 使用偏好（第二期） |
|---|---|---|
| 域 | `secrets`（opaque / host 写） | `prefs`（readable / model 写） |
| 谁写 | 宿主弹框 `kv.put`，明文永不过模型 | **LLM 自己调 `kv_read` / `kv_write`** |
| 链接的作用 | 弹框录入 → 自动保存 → 回灌重试 | 只回灌一条用户消息 → LLM 按配方读写并回执 |
| 宿主是否碰数据 | 碰（录入 / 直连拼 header） | **一行存储都不写** |

做法：配方 `primitives` 直接引用宿主恒定挂载的 `kv_read` / `kv_write`（**不需要新增原语、不改宿主内核 / 工具签名 / 装配**），在 `prompt` 里写清固定域名与键（此处为 `prefs` / `stock.watchlist`，值是去重后的股票代码数组）。报价后附一条 `[添加到自选](stock-watch-add:<代码>)` markdown 链接；宿主 `ChatPage.bindPrefLinks()` 用 document 事件委托接管点击，只回灌形如「把 <代码> 加入我的自选…」的**正常用户消息**，由 LLM 在新一轮完成读 → 去重 → 写 → 回执。用户说「查询自选股票当前股价」时，LLM 读回数组、一次 `web_fetch` 拼全部代码、按列表播报。

链接里只带一个经形状校验的股票代码（`PrefLink.ts`），不携带待写入的值 / URL / JSON；脏 href 静默忽略。宿主不托管写入，是为了模型上下文里始终有这份偏好，不会出现「宿主偷偷写了、模型下一轮却不知道」的劈叉。

**扩展**：再加一类用户偏好（默认分类、常用参数…）只需在配方里换一个键名与值形状，宿主一行不改 —— 这正是本地数据层「加场景不改内核」的扩展点。

**与 llm-tool 划清界限**：配方是否需要本地 JS 能力库，由可选的 `requiredCapabilities` 声明决定——**缺省该字段就是明确的「无依赖」**（写空数组会被 `parseSkillRecipe` 判为配方写错）。`github.rest` 不写它，宿主因此不会把 `llm_tool_call`、农历能力库清单或 QuickJS 沙箱挂进这一轮；只有像 `user.dn2lz9` 那样显式声明 `["monthCalendar"]` 的配方命中时才按需挂载。装过某个能力库 ≠ 每轮都要把它塞给模型。

宿主的在线插件平台**只安装 `type: plugin`**；`type: tool` 只在列表里展示，不提供安装按钮。
插件默认源 `https://weiqi-dev.github.io/weiqi-assets/registry.json` 只读、由本仓库 git 发布，宿主可另加自定义源但默认源不可覆盖。
技能源是**单源模型**，默认源 `…/skills/registry.json` 是宿主代码常量（`SkillCatalogSources.DEFAULT_SKILL_REGISTRY_URL`），
用户可在「🧠 技能」面板改成任意 https 源或一键恢复（自定义源内容未经审核，信任自担）——这点与插件不同。

技能是**安装制**：在线配方不会自动生效，必须经面板「安装」写进本地技能库；只有本地库里启用的条目才会被 LLM 调用。
引用宿主注册表里没有的原语的配方只展示、不可安装。安装即启用（纯声明零代码，不设插件那道「默认停用」闸门）。

## 目录结构

```
weiqi-assets/
├── registry.json              # 顶层扩展资源清单（插件 / 工具，先取这个文件）
├── schema/
│   ├── registry.schema.json   # 清单契约
│   ├── plugin.schema.json     # 插件元数据契约
│   └── tool.schema.json       # 工具声明契约
├── plugins/                   # 插件工件，按扩展点分目录
│   ├── ranking/
│   │   ├── total-score/       # 总分排序（可用工件）
│       │   ├── plugin.json    # 元数据（含 code 相对路径）
│       │   ├── index.js       # 完整源码（永远全量，不是 diff）
│       │   └── README.md      # 契约来源与安装形状
│   │   ├── direct-win/        # 直胜口径（原详情页内置规则外置）
│   │   │   ├── plugin.json
│   │   │   ├── index.js
│   │   │   └── README.md
│   │   └── simple/            # 简易口径（原详情页内置规则外置）
│   │       ├── plugin.json
│   │       ├── index.js
│   │       └── README.md
│   └── llm-tool/              # 模型能力插件（chat / skill-dev 角色可调用）
│       └── lunar/             # 公历转农历（单日 + 日期范围）
│           ├── plugin.json    # 含 exposes[] / smoke[]
│           ├── index.js       # 经典脚本 + call({method,args}) 入口
│           └── README.md      # 数据源、核验锚点、契约来源
├── tools/                     # LLM 工具声明，按工具名/版本分目录
│   └── web-fetch/v1/
│       ├── tool.json
│       └── README.md
├── skills/                    # 技能配方，单文件清单
│   └── registry.json          # 纯声明配方：只引用宿主原语，不含代码
├── share/                     # SGF 二维码分享与下载（站点能力，见 share/README.md）
│   ├── index.html             # 扫码着陆页
│   ├── share.js               # 编解码 + 二维码库（纯库，无副作用）
│   └── README.md              # URL 契约、数据格式、能力说明
├── scripts/validate.mjs       # 清单/条目/代码/URL 契约一致性校验（零依赖）
├── docs/
│   ├── architecture.md        # 定位、下载链路、与 weiqi-bot 的分工
│   ├── extension-points.md    # 扩展点契约与宿主对照表
│   └── contributing.md        # 新增插件 / 工具的完整步骤
├── index.html                 # 站点导航页
└── package.json
```

### 关于 `share/`

顶层 `registry.json` **只登记 plugin / tool**（技能配方走独立的 `skills/registry.json`，见上文「三类扩展资源」），`share/` 也不进去。
理由：顶层 registry 是「宿主按需下载的扩展资源」，
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
5. 校验（宿主侧）：PluginValidator + QuickJS 沙箱试跑（按 pointId 分派：ranking 验排名契约、llm-tool 比对 smoke.expect）；任何失败不落库
6. enabled 由用户决定；下载 ≠ 安装 ≠ 启用
7. 工件记录 catalogRef（来源源 URL + 资源 id）；远端 code 与本地 code 不同时按钮变「更新」，
   走本地 revise(trigger:'manual') 保留 history，不新建副本
```

`registry.json` 里每个 `path` 都是**仓库内相对路径**，`code` / `readme` 同理，
宿主拼接时以 `registry.baseUrl` 为基准；不要硬编码单条资源的绝对 URL。
路径用 `new URL(rel, base)` 解析并断言同源，阻止 `..` 越界与绝对外链。

### 技能配方的独立链路（宿主侧）

```
1. GET  /skills/registry.json           ← 独立入口，与顶层 registry 无关
2. 逐条解析 SkillRecipe（schemaVersion / id / version / name / summary / primitives / prompt）
3. 用户点「安装」→ 校验配方合法 + 引用的原语在宿主注册表里存在
4. 写进本地技能库（LocalStorageAdapter('weiqi-bot')），安装即启用
5. 对话时 loadSkills() 只取本地库 enabled 条目；在线源可达与否对对话无影响
6. 同 id 的 version 不等 → 「有更新」；更新按同 id 覆盖、保留启停状态
7. 缺原语 → 只展示不可安装；失败转成中文结果，绝不抛到对话 / 面板
```

配方只组合宿主已有能力，新增 / 修订一条配方改 `skills/registry.json` 即可，无需重建 Web 资源包。
「下载」不等于「生效」：装进本地库、且启用，才会被 LLM 调用。

## 校验

```bash
npm run validate      # 或 node scripts/validate.mjs
```

零依赖（Node 原生）。检查：JSON 合法、必填字段、路径不越界、registry 与条目 ID 一致、
插件代码入口存在且不含宿主禁用的全局/动态求值/无界循环、
`llm-tool` 的 `exposes[]` / `smoke[]` 契约齐全，以及
`share/share.js` 的 `decodeUrl` / `libUrl` 与站点 URL 契约一致。
**不校验 `skills/registry.json`**：技能清单的结构契约在宿主 `SkillRecipe.ts`，由宿主安装时逐条解析。
站点的技能列表也是运行时读取该清单渲染，因此清单本身写错会在页面上直接表现为「列表无法加载」，不会静默显示旧数据。

禁用规则与 `weiqi-bot/domain/plugin/PluginValidator.ts` **同源**——注意该校验器对全串做正则，
**注释里出现禁用词也会被拦下**，示例插件因此刻意不写出那些词。

## 数值与契约的来源

本仓库不自定义配额、超时、阈值。所有契约数值都来自宿主并有明确出处：

| 出现处 | 来源 |
|---|---|
| `pointId` / `specVersion` / `entry` / hostApi / 资源配额 | `weiqi-bot/domain/plugin/types.ts`（`PLUGIN_SPECS`：`RANKING_SPEC` / `LLM_TOOL_SPEC`、`DEFAULT_PLUGIN_LIMITS`） |
| 工具声明形状 | `weiqi-bot/application/model/IModelGateway.ts`（`ModelToolDefinition`） |
| 插件禁用规则 | `weiqi-bot/domain/plugin/PluginValidator.ts` |
| 输出契约（columns / rows / cells） | `weiqi-bot/domain/ranking/RankingTable.ts`（`validateRankingOutput`） |
| 在线平台默认源 URL | `weiqi-bot/services/share/WeiqiAssetsUrls.ts`（`WEIQI_ASSETS_REGISTRY_URL`） |
| 技能配方结构 / 解析 | `weiqi-bot/application/skill/SkillRecipe.ts`（`parseSkillRecipe`）、`SkillTypes.ts`（`SkillRecipe`） |
| 技能源默认 URL / 改源 | `weiqi-bot/services/skill-catalog/SkillCatalogSources.ts`（`DEFAULT_SKILL_REGISTRY_URL` / `setCurrent` / `reset`） |
| 技能安装 / 生效口径 | `weiqi-bot/services/skill-catalog/SkillCatalogService.ts`（`loadSkills` / `browse` / `install`） |
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

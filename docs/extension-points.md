# 扩展点契约

「扩展点」是宿主预留的可替换行为。资源库里的插件必须声明自己接的是哪个扩展点、
哪个 spec 版本；宿主按此决定要不要接受这个工件。

## 注册表

| pointId | specVersion | 入口 | 输入 | 输出契约 | 宿主接入点 |
|---|---|---|---|---|---|
| `ranking` | 1 | `rank` | `{ matches: MatchData[] }`（原始对阵表的只读 JSON 拷贝） | `{ columns: { key, label }[], rows: { id, name, rank, cells }[] }` | `application/plugin/RankingPluginAdapter.ts` → `domain/ranking/RankingPipeline.ts` |
| `workflow-operator` | 1 | `call` | `{ method: string, args: [参数对象] }`（method 只能取 manifest `exposes[]` 白名单） | 任意可 JSON 序列化的值（形状由各插件的 `exposes[].description` 声明） | 宿主 `OperatorRegistry`（阶段二 workflow runner 按名调用） |

来源：

- `weiqi-bot/domain/plugin/types.ts` 的 `PLUGIN_SPECS` 注册表（`RANKING_SPEC` / `WORKFLOW_OPERATOR_SPEC`：pointId / version / entry / hostApi / limits）；
- `weiqi-bot/domain/ranking/types.ts` 的 `RankingInput` / `RankingOutput`（输入与输出结构）；
- `weiqi-bot/domain/ranking/RankingTable.ts` 的 `validateRankingOutput`（列名汉字、`cells` 只能是数值/数值数组、`rows` 覆盖全部选手且 `id`/`name` 与对阵一致）。

**当前注册两个扩展点：`ranking` 与 `workflow-operator`，两者 `specVersion` 都是 1。**
`registry.json` 的 `pointId` 与 `plugin.json` 的 `pointId` 都受 `scripts/validate.mjs` 的
`KNOWN_POINT_IDS` 白名单约束，防止出现「资源先发、宿主不认」的漂移
（历史上曾误写 `ranking.tiebreak`）。

新增扩展点须先在 weiqi-bot 里落地 spec 与适配层，再来本仓库登记，并同步：
`schema/plugin.schema.json` 的 `pointId.enum`、`scripts/validate.mjs` 的 `KNOWN_POINT_IDS`、
本文档、`docs/architecture.md`。不要先发资源再等宿主支持。

## `PluginSpec` 与资源侧 manifest 的对照

| PluginSpec 字段 | 资源侧 manifest | 说明 |
|---|---|---|
| `pointId` | `pointId` | 必填，必须在宿主注册表里 |
| `version` | `specVersion` | 必填，宿主据此解释旧工件 |
| `entry` | `entry` | 必填，合法 JS 标识符；宿主以 `JSON.stringify(<entry>(JSON.parse(__PLUGIN_INPUT__)))` 调用（ranking=`rank`，workflow-operator=`call`） |
| `hostApi` | 不声明 | 由宿主 spec 决定，资源侧不得要求注入能力 |
| `limits` | 不声明 | 配额来自宿主 `DEFAULT_PLUGIN_LIMITS`，资源侧不复制数值 |
| `PluginArtifact.code` | `code` 指向的源码文件 | 永远全量源码，不是 diff |
| `PluginArtifact.intent` | `intent` | 需求原话，便于后续修订 |
| `origin` | `origin` | `manual`（人工提交）/ `llm`（模型生成） |

资源侧 manifest 是**元数据包**，不是 `PluginArtifact` 本身：它没有 `enabled` / `version`（工件修订号）/
`createdAt` / `history` / `catalogRef`，这些是宿主安装时生成的状态，不属于可发布资源。
`catalogRef` 由宿主写入工件，记录来源 registry URL 与资源 id，用来识别「同一个插件」是否有更新。

### 配额为什么不写进资源

`DEFAULT_PLUGIN_LIMITS` 的每一项（超时、内存、栈、代码体积、输出体积、日志条数）都由
宿主运行时决定，且会随宿主版本变化。资源库复制一份数值只会制造两份各自漂移的真相。
校验脚本因此只检查「代码不超过宿主规则、入口存在」，不检查具体字节上限。

## 插件代码硬性规则

与 `weiqi-bot/domain/plugin/PluginValidator.ts` 同源：

- 不得引用浏览器/宿主全局：`fetch`、`window`、`document`、`localStorage`、`indexedDB`、
  `XMLHttpRequest`、`importScripts`、`require`、`postMessage`、`self`、`navigator`、`WebSocket`；
- 不得动态求值、动态模块加载、无界循环；
- 代码必须能被 `ctx.evalCode` 编译，入口必须是全局可解析的标识符；
- 入口返回值必须可 JSON 序列化（无循环引用 / 函数 / BigInt），且能被 `validateRankingOutput` 接受。

⚠️ `PluginValidator` 是**对整串源码做正则**，注释与字符串里出现上述禁用词同样会被拦截。
`scripts/validate.mjs` 复刻了这一点，示例插件的注释因此刻意规避了这些词。

## 宿主内置数据算子

`json.*` 与 `regex.*` 是 weiqi-bot 的宿主内置 Workflow 算子，不属于插件扩展点，不出现在顶层 `registry.json`，也不需要安装或启用。它们只处理上游传入的原生值：

- JSON：`parse`、`stringify`、`get`、`set`、`select`、`pluck`、`concat`、`unique`、`append`、`groupCount`、`sortBy`、`take`、`isEmpty`、`assert`、`flatten`、`toString`。
- regex：`match`、`extract`、`replace`。由于原生 RegExp 在宿主线程同步执行，宿主对输入长度、模式长度、匹配数量设上限，并拒绝常见灾难性回溯模式。

这些通用算子不访问网络、缓存、存储、时钟或 DOM。技能引用 `json.*` / `regex.*` 时不会产生插件安装依赖。

## `workflow-operator` 扩展点（领域工作流算子插件）

`workflow-operator` 是**领域工作流算子插件**：它不挂模型 `tools[]`，
不进 `ModelRequest.tools`，也不向 system 提示词注入任何算子清单。工件 `exposes[]` 的**每个方法必须声明 `inputSchema`、`outputSchema`、`kind`、`idempotent`，并按名注册成一条宿主算子**
（宿主通用算子使用 `json.<action>` / `regex.<action>`；其它宿主原语使用既有名称；插件算子用 `<slug>.<exposes[].name>`，如 `circle.normalize`），
由宿主 `OperatorRegistry` 统一持有；**阶段二的 workflow/DAG runner** 在节点里写
`"call": "<算子名>"` 按名查表并按名执行（value→value）。Workflow runner 按名执行普通算子节点，并提供通用有界 `forEach`、`repeat` 与 `ifElse` 控制块；循环体仍只调用独立算子，不承载业务逻辑。

`workflow-operator` 与 `ranking` 共用同一套工件、存储、在线安装与 QuickJS 沙箱，差别只在**契约**：

| 维度 | ranking | workflow-operator |
|---|---|---|
| 入口 | `rank({matches})` | `call({method,args})` |
| 输入 | 原始对阵表 | 方法名 + 一个 JSON 参数对象 |
| 输出 | 严格 `{ columns, rows }`，由 `validateRankingOutput` 校验 | 按 `outputSchema` 校验的 JSON 值 |
| 生效位置 | 赛事详情页排名管线 | 宿主 `OperatorRegistry`（阶段二 workflow runner 按名调用） |
| 方法白名单 | 无（只有一个入口） | `plugin.json` 的 `exposes[]`，宿主只放行这里声明的 `method` |
| 安装前试跑 | `SAMPLE_RANKING_INPUT` + 排名契约 | `smoke[]` 样例（可带 method）逐字段比对 `expect` |

关键安全边界（与 skill 配方「宿主内置执行器」同构）：

- 插件源码只在复用的 QuickJS Worker 里 `evalCode`，**不进主线程 JS 环境、不进模型上下文**；
  workflow runner 只按算子名提交 `{method, args}`，模型看不到、也不需要算子清单。
- `method` 必须命中 `exposes[]`；`args` 只作为 JSON 数据写入 `__PLUGIN_INPUT__`，
  绝不参与代码拼接（胶水由宿主固定生成）。
- 插件必须是经典脚本或 `module.exports` 形态；QuickJS 不支持 ESM `export`。
- 不提供、也不自检 `new Date()` 依赖的非确定性字段（如 `isToday`、节气、生肖），
  因为沙箱里的时间来自宿主真实时钟，逐次运行结果会变。
- 工件默认停用，**人工启用闸门**后才注册进 `OperatorRegistry`；缓存命中即零网络下载；每次调用创建独立 Worker、QuickJS Runtime 与 Context，调用结束或异常后立即销毁 Worker。

### 两条落地路径：在线安装与插件开发角色自建

`workflow-operator` 工件有两种来源，落到**同一张工件表、同一个 IndexedDB、同一套版本历史与启用闸门**，
并且**两条路径都只进宿主算子表，都不挂模型 `tools[]`**：

| 来源 | 触发方式 | origin | 契约从哪来 |
|---|---|---|---|
| 在线安装（人工） | 插件面板「在线插件」从 `registry.json` 安装 | `manual`（带 `catalogRef`） | 随 `plugin.json` 一起下载的 `exposes[] / smoke[]` |
| 插件开发角色自建 | 插件开发角色用 `plugin_write` 给 `pointId:"workflow-operator"` + `exposes[]` + `smoke[]` | `llm` | 当次提交的参数，随源码一起落进工件 |

两条路径都先经 QuickJS 沙箱逐条跑 `smoke[]` 并与 `expect` 逐字段比对（能跑但算错同样拒），
通过后默认 `enabled:false`，**必须人工在「本地插件」页启用**才注册进 `OperatorRegistry`。
角色自建不绕过这道闸门；启用后由 workflow 节点按算子名引用，跨会话复用。

带 `workflow` 的技能配方（数据源在各自 `skills/<id>/skill.json`，`skills/registry.json` 只是瘦索引、不再含配方）
与这张算子表对接：`inputs` 填空、`steps` 声明普通算子节点与有界循环控制块、宿主 `run_workflow` 触发，
节点 `"call"` 按算子名查表；形状契约在 `schema/workflow.schema.json`，引用/唯一性等语义由
`scripts/validate.mjs` 的 `validateWorkflowSkill()` 校验，`call` 是否命中已启用算子由宿主运行时决定。
无 `workflow` 的配方沿用现有散文执行路径。配方形状不在此处校验白名单，避免与宿主算子表漂移。

`plugin_write` 省略 `pointId` 时仍是原来的 ranking 排名插件（行为逐字不变），只有给了
`"workflow-operator"` 才走算子插件分支。修订算子插件时契约随源码版本同步；回滚也按工件 `pointId`
分派试跑，不会拿排名样例去跑 `call`。

## 工具声明契约

`tools/<name>/v<N>/tool.json` 的 `definition` 直接对齐
`weiqi-bot/application/model/IModelGateway.ts` 的 `ModelToolDefinition`：

```ts
interface ModelToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;  // JSON Schema
}
```

宿主把它放进 `ModelRequest.tools`，模型返回 `tool_calls`，宿主执行后以 `role:'tool'`
回填观察（`application/chat/WebToolLoop.ts`）。

`implementation.status` 三种取值：

| 值 | 含义 | 宿主动作 |
|---|---|---|
| `host-builtin` | 执行器已在宿主内，这里只发布声明 | 核对/发现，不注册新执行器 |
| `downloadable` | 本仓库同时提供可执行实现 | 需宿主先实现外部执行器隔离与注册 |
| `reference` | 仅文档参考 | 不做任何注册 |

当前所有条目都是 `host-builtin`。这不是能力缺失，而是刻意的安全边界：
声明可以被自由发布，执行器的注入权限仍牢牢留在宿主手里。

**在线插件平台第一版只安装 `type: plugin` 的条目**；`type: tool` 的声明镜像只在列表里展示、
不提供安装按钮（避免把任意远程 JS 放进主线程）。

## 新增扩展点的顺序

1. weiqi-bot：`domain/plugin/types.ts` 加 spec 常量 → 写适配层 → 接入页面/用例 → 补测试；
2. 本仓库：`docs/extension-points.md` 登记 → `schema/` 的 `pointId.enum` 与
   `scripts/validate.mjs` 的 `KNOWN_POINT_IDS` 同步 → 加示例条目；
3. 两边都 commit 后再发布资源，避免「资源先到、宿主不认」。

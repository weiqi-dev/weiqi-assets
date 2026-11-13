# 扩展点契约

「扩展点」是宿主预留的可替换行为。资源库里的插件必须声明自己接的是哪个扩展点、
哪个 spec 版本；宿主按此决定要不要接受这个工件。

## 注册表

| pointId | specVersion | 入口 | 输入 | 输出契约 | 宿主接入点 |
|---|---|---|---|---|---|
| `ranking.tiebreak` | 1 | `rank` | `PlayerRanking[]`（只读 JSON 拷贝） | 与输入等长的数组，每行至少 `{ id: number, rank: number }` | `application/plugin/RankingPluginAdapter.ts` |

来源：`weiqi-bot/domain/plugin/types.ts` 的 `RANKING_SPEC` 与 `RankingPluginAdapter.ts`。
新增扩展点须先在 weiqi-bot 里落地 spec 与适配层，再来本仓库登记 —— 不要先发资源再等宿主支持。

## `PluginSpec` 与资源侧 manifest 的对照

| PluginSpec 字段 | 资源侧 manifest | 说明 |
|---|---|---|
| `pointId` | `pointId` | 必填，必须与宿主注册的一致 |
| `version` | `specVersion` | 必填，宿主据此解释旧工件 |
| `entry` | `entry` | 必填，合法 JS 标识符；宿主以 `JSON.stringify(entry(JSON.parse(__PLUGIN_INPUT__)))` 调用 |
| `hostApi` | 不声明 | 由宿主 spec 决定，资源侧不得要求注入能力 |
| `limits` | 不声明 | 配额来自宿主 `DEFAULT_PLUGIN_LIMITS`，资源侧不复制数值 |
| `PluginArtifact.code` | `code` 指向的源码文件 | 永远全量源码，不是 diff |
| `PluginArtifact.intent` | `intent` | 用户最初的自然语言需求，便于后续修订 |
| `origin` | `origin` | `manual`（人工提交）/ `llm`（模型生成） |

资源侧 manifest 是**元数据包**，不是 `PluginArtifact` 本身：它没有 `enabled` / `version`（工件修订号）/
`createdAt` / `history`，这些是宿主安装时生成的状态，不属于可发布资源。

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
- 入口返回值必须可 JSON 序列化（无循环引用 / 函数 / BigInt）。

⚠️ `PluginValidator` 是**对整串源码做正则**，注释与字符串里出现上述禁用词同样会被拦截。
`scripts/validate.mjs` 复刻了这一点，示例插件的注释因此刻意规避了这些词。

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

## 新增扩展点的顺序

1. weiqi-bot：`domain/plugin/types.ts` 加 spec 常量 → 写适配层 → 接入页面/用例 → 补测试；
2. 本仓库：`docs/extension-points.md` 登记 → `schema/` 若需新字段则更新 → 加示例条目；
3. 两边都 commit 后再发布资源，避免「资源先到、宿主不认」。

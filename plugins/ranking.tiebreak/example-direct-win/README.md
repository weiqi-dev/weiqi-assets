# 示例插件：胜局优先的排名

`ranking.tiebreak` 扩展点的最小可用工件，用来演示「从 weiqi-assets 下载一个插件并装进 weiqi-bot」的完整形状。

## 契约来源

| 约束 | 来源 |
|---|---|
| 扩展点 `ranking.tiebreak`、spec 版本 1、入口 `rank`、hostApi 为空、资源配额 | `weiqi-bot/domain/plugin/types.ts` 的 `RANKING_SPEC` 与 `DEFAULT_PLUGIN_LIMITS` |
| 输入为 `PlayerRanking[]`、输出每行须有数值 `rank` 与 `id` | `weiqi-bot/application/plugin/RankingPluginAdapter.ts` |
| 禁止浏览器/宿主全局、禁止动态求值、动态模块加载与无界循环（规则全文见 PluginValidator.ts） | `weiqi-bot/domain/plugin/PluginValidator.ts` |
| 代码在 QuickJS 沙箱里以 `JSON.stringify(rank(JSON.parse(__PLUGIN_INPUT__)))` 调用 | `weiqi-bot/infrastructure/plugin-vm/QuickJsExecutor.ts` |

资源侧**不复制**配额数值：宿主升级 spec 时以宿主为准，本仓库只声明自己遵守哪个 spec 版本。

## 排序口径

胜局数降序 → 积分降序 → 原 id 升序。这是示例的业务选择，不是宿主默认行为；宿主默认排序
（`RankingMode.default`）不受影响，只有用户在排名页显式选中该插件时才生效。

## 安装形状

宿主取 `plugin.json`，按 `code` 指向的路径取源码，构造 `PluginArtifact` 写入工件存储：

```js
{
  id: manifest.id,
  name: manifest.name,
  pointId: manifest.pointId,
  version: 1,
  enabled: false,
  origin: "manual",
  intent: manifest.intent,
  code: sourceText,
  spec: hostRANKING_SPEC,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  history: []
}
```

`enabled` 由用户决定；下载 ≠ 自动启用。

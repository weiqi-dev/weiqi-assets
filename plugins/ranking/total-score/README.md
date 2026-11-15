# 总分排序插件

`ranking` 扩展点的一个可用工件，演示「从 weiqi-assets 下载一个插件并装进 weiqi-bot」的完整形状。
它不是示意代码：装进宿主后可在赛事详情页的排名插件菜单里选用。

## 契约来源

| 约束 | 来源 |
|---|---|
| 扩展点 `ranking`、spec 版本 1、入口 `rank`、hostApi 为空、资源配额 | `weiqi-bot/domain/plugin/types.ts` 的 `RANKING_SPEC` 与 `DEFAULT_PLUGIN_LIMITS` |
| 输入 `rank({ matches })` 为原始对阵表；输出 `{ columns, rows }` | `weiqi-bot/domain/ranking/types.ts` 的 `RankingInput` / `RankingOutput` |
| 列名只允许汉字；`cells` 只能是有限数值或数值数组；`rows` 必须覆盖全部选手且 `id`/`name` 与对阵一致 | `weiqi-bot/domain/ranking/RankingTable.ts` 的 `validateRankingOutput` |
| 插件输出与内置输出共用同一条管线校验 | `weiqi-bot/domain/ranking/RankingPipeline.ts` 的 `computeRanking` |
| 禁止浏览器/宿主全局、禁止动态求值、动态模块加载与无界循环 | `weiqi-bot/domain/plugin/PluginValidator.ts` |
| 代码在 QuickJS 沙箱里以 `JSON.stringify(rank(JSON.parse(__PLUGIN_INPUT__)))` 方式调用 | `weiqi-bot/infrastructure/plugin-vm/QuickJsExecutor.ts` |

资源侧**不复制**配额数值：宿主升级 spec 时以宿主为准，本仓库只声明自己遵守哪个 spec 版本。

## 排序口径（可争议、可改的业务选择）

1. **积分**：胜 2 分、和 1 分、负 0 分（来自每局 `p1Score` / `p2Score` 的大小关系，未完赛不计）。
2. **对手分**：所有交手过的对手的积分之和。
3. **总得分** = 积分 + 对手分 × 2 / 全场最高积分 − 已进行轮次数；保留一位小数。
   - 分母用「全场最高积分」而非固定常数，使这一项与积分同量纲；
   - 减轮次数用于抵消多轮累积的系统性偏移，使不同轮次阶段的量纲一致。
   - 这些系数是本规则作者**明说的业务选择**，不是从验证集扫出来的经验阈值，也不是宿主默认口径。
4. **同分比较顺序**：总得分 → 积分 → 直胜（两人对弈过且分出胜负）→ 对手分顺减
   （从第一轮起逐轮减去该轮对手积分，出现差异即停）→ 对手分。
5. 展示列：`总得分` / `积分` / `直胜` / `对手分顺减`。`直胜`、`对手分顺减` 用数值数组
   承载（空数组表示无该比较结果），由宿主 `formatRankingCell` 渲染。

宿主默认排序（`RankingMode.default`）不受影响，只有用户在排名页显式选中该插件时才生效。

## 安装形状

宿主取 `plugin.json`，按 `code` 指向的路径取源码，构造 `PluginArtifact` 写入工件存储：

```js
{
  id: <宿主生成的工件 id>,
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
  history: [ { version: 1, code: sourceText, trigger: 'create', outcome: 'accepted' } ]
}
```

`enabled` 由用户决定；下载 ≠ 自动启用。宿主可通过工件上的 `catalogRef`（来源 registry URL + 资源 id）
识别「同一个插件」，远端源码与本地源码不同时把安装按钮显示为「更新」，走本地 `revise` 保留历史。

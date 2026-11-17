# 直胜插件

`ranking` 扩展点的一个可用工件。它复现赛事详情页原先内置的「直胜」排名口径：
内置实现现在只保留「标准」，这条口径改由本插件提供，装进宿主后在详情页 ⚙️ 菜单里选用。

## 契约来源

| 约束 | 来源 |
|---|---|
| 扩展点 `ranking`、spec 版本 1、入口 `rank`、hostApi 为空、资源配额 | `weiqi-bot/domain/plugin/types.ts` 的 `RANKING_SPEC` 与 `DEFAULT_PLUGIN_LIMITS` |
| 输入 `rank({ matches })` 为原始对阵表；输出 `{ columns, rows }` | `weiqi-bot/domain/ranking/types.ts` 的 `RankingInput` / `RankingOutput` |
| 每局得分语义（胜 2 / 负 0 / 和 1） | `weiqi-bot/domain/ranking/types.ts` 的 `MatchData.p1Score` / `p2Score` 字段注释 |
| 列名只允许汉字；`cells` 只能是有限数值或数值数组；`rows` 必须覆盖全部选手且 `id`/`name` 与对阵一致 | `weiqi-bot/domain/ranking/RankingTable.ts` 的 `validateRankingOutput` |
| 插件输出与内置输出共用同一条管线校验 | `weiqi-bot/domain/ranking/RankingPipeline.ts` 的 `computeRanking` |
| 禁止浏览器/宿主全局、禁止动态求值、动态模块加载与无界循环 | `weiqi-bot/domain/plugin/PluginValidator.ts` |

资源侧**不复制**配额数值：宿主升级 spec 时以宿主为准，本仓库只声明自己遵守哪个 spec 版本。

## 排序口径（明说的业务规则，非拟合阈值）

1. **积分**：直接累加每局 `p1Score` / `p2Score`（未完赛 0:0 自然计 0），不引入系数。
2. **对手分**：所有交手过的对手的积分之和。
3. **直胜**：两人交手且分出胜负时，胜者靠前；和棋或未交手则不据此判定。
4. **逆减**：同分组内从第一轮起逐轮减去该轮对手积分后的剩余值序列，逐项比较，高者靠前。
5. **展示列**：`积分` / `对手分` / `直胜` / `累进分` / `逆减`。
   - `直胜` 列用数值 1 / 0 / -1 表示胜 / 无可比直胜 / 负（沿用原内置口径的编码）。
   - `累进分` 为逐轮累计积分之和，仅展示，不参与本口径的同分比较。
   - `逆减` 用数值数组 `[轮次序号, 该轮逆减值]` 承载，由宿主 `formatRankingCell` 渲染成 `3-12` 形态。

**所有数值都来自对阵表本身或上述明说的规则**，没有从验证集扫出来的经验阈值、没有量纲不明的
logit 门控。`-1/0/1` 是胜负状态的编码（业务枚举），不是阈值。

与内置「标准」口径的差异只有一处：同分组的第 3 级比较用**直胜**代替累进分，
其余（积分、对手分、逆减算法、展示形态）完全一致。

## 安装形状

宿主取 `plugin.json`，按 `code` 指向的路径取源码，构造 `PluginArtifact` 写入工件存储；
`enabled` 由用户决定，下载 ≠ 自动启用。宿主通过工件上的 `catalogRef`（来源 registry URL + 资源 id）
识别「同一个插件」，远端源码与本地源码不同时把安装按钮显示为「更新」，走本地 `revise` 保留历史。

在赛事详情页 ⚙️ 菜单选「管理插件 →」可跳到对话页的插件管理面板完成下载/启用。

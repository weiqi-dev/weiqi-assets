# 公历转农历 · 节气 · 传统节日（workflow-operator）

`workflow-operator` 扩展点的**工作流算子插件**。装进宿主、人工启用后，宿主 `OperatorRegistry`
把 `lunar.*` 的 `exposes[]` 方法按名注册为算子（`lunar.toLunar` / `lunar.solarTerms` /
`lunar.festivals` / `lunar.monthCalendar`），**阶段二 workflow 节点**用 `"call"` 按名调用，
把公历日期换算成农历、查 24 节气与传统节日；**调用时零网络**
（源码与事实表都在本地工件里），每次调用仍在一次性 QuickJS Worker 里执行，
插件源码不进主线程 JS 环境、不进模型上下文。阶段一只提供按名执行的注册地基，不解析配方。

## 接口

唯一入口 `call({ method, args })`，`method` 只认白名单里的四个方法：

### `toLunar` — 公历转农历

| 输入 | 形状 | 说明 |
|---|---|---|
| 单日 | `{ "date": "2026-11-17" }` | 严格 `YYYY-MM-DD` |
| 数字单日 | `{ "year": 2026, "month": 11, "day": 17 }` | 等价形式 |
| 范围 | `{ "from": "2026-11-17", "to": "2026-11-19" }` | 含首尾，逐日返回 |

返回 `{ from, to, count, days[] }`，单日即 `count=1` 的数组——形状稳定。
`days[]` 每项：

```json
{
  "solar": "2027-02-06",
  "lunar": { "year": 2027, "month": 1, "day": 1, "isLeap": false },
  "lunarText": "正月初一",
  "solarTerm": null,
  "festival": "春节"
}
```

- `lunarText` 用「正月/冬月/腊月」+「初九/廿三」这类中文写法，闰月带「闰」前缀。
- `solarTerm` 是当日节气中文名，非节气日为 `null`；节气事实表只覆盖 1901–2100，
  1900 年（农历换算仍支持）返回 `null`，不会让整次换算失败。
- `festival` 是当日传统节日名，非节日为 `null`。判定规则见下节。

### `solarTerms` — 查 24 节气

`{ "year": 2027 }` 或 `{ "from": 2025, "to": 2027 }`（数字年份，含首尾）。
返回 `{ years: [{ year, terms: [{ name, solar }] }], count }`，每年恰好 24 个节气，
按年内时间顺序排列。**1901–2100 之外的年份明确报错**，不外推、不猜测。

### `festivals` — 查传统节日

`{ "date": "2027-02-06" }` 或 `{ "from": "2027-02-01", "to": "2027-02-28" }`。
返回 `{ from, to, count, days[] }`，**只含命中节日的日期**；每项
`{ solar, lunar, festival }`。适合月历配方直接取「本月有哪些节日」。

**范围长度不设人为上限**：循环次数由起止日期的天数差推导，超长范围由宿主既有
`DEFAULT_PLUGIN_LIMITS.maxOutputBytes` 自然截断。资源侧不复制配额数值，也不引入
「最多查多少天」这类无出处的经验常数。

不存在的日期（如 `2026-02-30`）、反向范围、早于 `1900-01-31` 的日期一律抛错，
错误由宿主作为算子执行失败返回给 workflow runner，不编造结果。

### `monthCalendar` — 一次取回一张公历月表的紧凑视图

输入 `{ "year": 2027, "month": 2 }`（`month` 取 1–12，必须是整数）。
返回 `{ year, month, daysInMonth, firstWeekday, monthSpan[], days[] }`：

```json
{
  "year": 2027, "month": 2, "daysInMonth": 28, "firstWeekday": 1,
  "monthSpan": [
    { "lunarYear": 2026, "lunarMonth": 12, "isLeap": false, "from": "2027-02-01", "to": "2027-02-05" },
    { "lunarYear": 2027, "lunarMonth": 1,  "isLeap": false, "from": "2027-02-06", "to": "2027-02-28" }
  ],
  "days": [
    { "solar": "2027-02-04", "day": "廿八", "term": "立春" },
    { "solar": "2027-02-05", "day": "廿九", "festival": "除夕" },
    { "solar": "2027-02-06", "day": "初一", "festival": "春节" }
  ]
}
```

**为什么是这些字段**（每个都对应月历配方的一个明确用途，没有一个是「压出来的」）：

| 字段 | 配方里的用途 |
|---|---|
| `days[].solar` | 单元格里的公历日 |
| `days[].day` | 单元格里的纯农历日名；直接由 `dayText(l.day)` 生成，本来就不带月份字眼，闰月只加「闰」前缀 |
| `days[].term` | 单元格里的节气名；仅当日有节气时出现 |
| `days[].festival` | 单元格里的传统节日名；仅当日有节日时出现 |
| `monthSpan[]` | 表格外说明「本月跨哪些农历月、有无闰月、跨不跨农历年」 |
| `firstWeekday` | 月首在周一..周日的排布（1=周一 .. 7=周日） |
| `daysInMonth` | 该月天数；由 `new Date(Date.UTC(y, m, 0)).getUTCDate()` 推导，自带闰年规则，**不写月份天数常量表** |

刻意不输出的东西：`lunar{year,month,day,isLeap}` 结构化字段、`lunarText`、
全年 `solarTerms` 列表、`festivals` 的稀疏结果 —— 这些是早先让模型自行判定
时需要的中间量，现在判定全部在算子内完成，workflow 节点只拿紧凑的 `value`。省略 `null`
的 `term`/`festival` 不是为了凑一个经验阈值，而是「无节气 / 无节日」本就该用缺省字段表达；
本库不设阈值、不做压缩或增量编码。

实测全月输出 1263–1381 字符（2027-02 / 2026-02 / 2025-01 / 2026-10 / 2023-09 /
2027-01 / 2024-02 / 2000-02），一次调用即可把整月紧凑视图作为算子的 `value` 返回，
不必像旧配方那样按日历周分片 4 次。

`monthSpan` 给的是**数字农历年**（如 2026 / 2027），不提供天干地支：朔闰事实表里
没有干支字段，不硬编一套。「丙午年腊月」这类写法不是本库的输出，配方应改用
数字年表述，保证表格外说明里每个数字都有工具出处。

## 数据来源（这条最要紧）

农历与节气都不是能从第一性原理在合理代码量内推导的：大小月由朔望月定、
闰月由中气定、节气由太阳视黄经定，全是**天文历法事实**。所以本工件含两张
事实表，来源链路如实写在这里，不藏任何数字：

| 出现处 | 来源 | 性质 |
|---|---|---|
| `LUNAR_TABLE` 的 201 行 | 1900–2100 每年「闰哪个月 / 12 个农历月各 29 或 30 天 / 闰月是否 30 天」的公开朔闰事实数值，按可读结构逐行重排 | 天文历法事实，非推导、非拟合 |
| `SOLAR_TERM_TABLE` 的 200 行 | 香港天文台《公历农历对照表》逐年文本档 `T{year}e.txt`（1901–2100）的 `Solar terms` 列，每年 24 个节气对应的公历日期 | 天文历法事实，非推导、非拟合 |
| 基准 `1900-01-31` = 农历 1900 年正月初一 | 同一份历法事实的起算点 | 历法事实 |
| 86400000 ms/日、`Date.UTC` 纯换算 | 公历日长定义 / ECMAScript 标准 API | 定义 / 标准 |
| 春节、闰月、节气校验锚点 | 香港天文台 <https://www.hko.gov.hk/en/gts/time/conversion.htm>（1901–2100 逐年可查，文本档入口 `conversion1_text.htm`） | 独立权威核验 |

节气事实表的抓取与核验方式（可复现、可争议）：

1. 逐年取 `https://www.hko.gov.hk/en/gts/time/calendar/text/files/T{year}e.txt`，
   共 1901–2100 计 200 份。
2. 只认以下 24 个英文标签词，按行内公历日期归集（不用「行尾有没有星期」这种
   会被注释行骗到的判据 —— 例如 1950 年文件末尾有夏令时说明行）：
   `Moderate Cold / Severe Cold / Spring Commences / Spring Showers / Insects Waken /
   Vernal Equinox / Bright & Clear / Corn Rain / Summer Commences / Corn Forms /
   Corn on Ear / Summer Solstice / Moderate Heat / Great Heat / Autumn Commences /
   End of Heat / White Dew / Autumnal Equinox / Cold Dew / Frost / Winter Commences /
   Light Snow / Heavy Snow / Winter Solstice`。
3. 每年必须恰好 24 条、且按日期排序后的顺序与「小寒…冬至」一致，否则判解析失败。
   实测 **200/200 年通过、零异常**。
4. 按可读结构 `[公历年, 'MMDD,MMDD,…(24 个)']` 逐行重排进源码；每个日期都能对照
   天文台逐年表逐项核验、能改。**不压缩、不做差值编码**——宿主已为此把
   `maxCodeBytes` 放宽到 64KB（见下文「契约来源」）。

这也解释了为什么不能用「常识窗口 / 中点公式」替代：抽查 1901、1950 年夏至是
`6/22`，2000 年以后多为 `6/21`；立春在 `2/3`↔`2/4` 之间逐年跳。任何固定窗口
都会在某些年份错，且事先无法判定哪些年。事实表把这件事变成纯查表。

### 传统节日：明说的业务约定，不是天文事实

节日日期是**民俗约定**，不是可推导的自然常量。为避免把人为选择藏进数字里，
这里把本项目采纳的规则逐条明说，可争议、可改：

| 节日 | 规则 | 农历结构化判据 |
|---|---|---|
| 春节 | 正月初一 | `month=1, day=1, !isLeap` |
| 元宵 | 正月十五 | `month=1, day=15, !isLeap` |
| 端午 | 五月初五 | `month=5, day=5, !isLeap` |
| 七夕 | 七月初七 | `month=7, day=7, !isLeap` |
| 中元 | 七月十五 | `month=7, day=15, !isLeap` |
| 中秋 | 八月十五 | `month=8, day=15, !isLeap` |
| 重阳 | 九月初九 | `month=9, day=9, !isLeap` |
| 腊八 | 腊月初八 | `month=12, day=8, !isLeap` |
| 除夕 | **该腊月的最后一天**（廿九或三十） | `month=12, day=该月实际天数, !isLeap` |

两条约定单独说明，都是明说的、不是扫出来的：

- **闰月不算节日**：只认非闰月的固定月日。例如 2025 闰六月初一不产生任何节日。
- **除夕取腊月实际末日**：腊月可能是 29 天也可能是 30 天，由 `LUNAR_TABLE`
  的月大小决定，不写死「三十」。实测 2027 年腊月只有 29 天 → 除夕是
  `2027-02-05` 腊月廿九；2020 年腊月 30 天 → 除夕是 `2020-01-24` 腊月三十。
  这两点都能用 HKO 逐年表的农历日列直接核验。

清单与「农历月日 → 节日名」的对应关系沿用月历配方里用户既定的口径；本工件
只负责把它变成**基于结构化字段**的确定性判定，不再依赖 `lunarText` 字符串
（字符串里的「正月/腊月」等月份字眼曾让配方需要额外剥离，是已知易错点）。

### 独立核验锚点（安装自检 `plugin.json.smoke` 用的就是这几个）

| 公历 | 结果 | 核验点 |
|---|---|---|
| `1900-01-31` | 正月初一 | 基准日 |
| `2026-02-17` | 正月初一 / 春节 | 春节（天文台 2026 对照表可查） |
| `2026-11-17` | 十月初九 | 单日 |
| `2025-07-25` | 闰六月初一 / 无节日 | 闰月不产生节日 |
| `2023-03-22` | 闰二月初一 | 2023 闰二月 |
| `2027-02-05` | 腊月廿九 / 除夕 | 腊月无三十 |
| `2027-02-06` | 正月初一 / 春节 | 节日判定 |
| `2027-06-21` | 夏至 | 节气逐年差异 |
| `1901-06-22` | 夏至 | 与 2000 年后不同，证明非固定窗口 |
| `1987` 年 | 闰六月、全年 384 天 | 历史闰月 |

这些字段都是确定性的：不提供 `isToday`、生肖等依赖运行时时钟的结果，
安装自检也不会拿非确定性字段做断言。

## 契约来源

| 约束 | 来源 |
|---|---|
| 扩展点 `workflow-operator`、spec v1、入口 `call`、hostApi 为空、资源配额 | `weiqi-bot/domain/plugin/types.ts` 的 `WORKFLOW_OPERATOR_SPEC` / `DEFAULT_PLUGIN_LIMITS` |
| `maxCodeBytes` 由 32KB 放宽到 64KB | 同文件 `DEFAULT_PLUGIN_LIMITS.maxCodeBytes`（2026-11-17）。本工件可读源码实测约 45.5KB，旧值会卡在安装预检。运行时防失控靠 `memoryBytes` / `maxStackBytes` / `timeoutMs` / `maxOutputBytes`，`maxCodeBytes` 只是安装期静态预检 |
| `call({method,args})` 的输入只作为 JSON 数据进入沙箱 | `weiqi-bot/infrastructure/plugin-vm/QuickJsExecutor.ts` 的 `__PLUGIN_INPUT__` |
| 方法名只认 `exposes[]` 白名单 | `weiqi-bot/application/plugin/OperatorRegistry.ts` |
| 安装前静态预检 + 沙箱试跑 + `smoke[].expect` 严格比对 | `weiqi-bot/services/plugin-catalog/PluginCatalogService.ts` / `application/plugin/OperatorContract.ts` |

`smoke[]` 每条都带 `method`，宿主按该字段组装 `call({method,args})` 并逐字段
比对 `expect`。本工件 11 条覆盖四个方法、闰月、腊月廿九除夕、节气逐年差异、
1900 年表外回退，以及 `monthCalendar` 的整月视图 / 月首周日 / 闰年 29 天。
`monthCalendar` 三条的 `expect` 由生成脚本从本库真实输出程序化导出，不手写。

资源侧**不复制**配额数值：宿主升级 spec 时以宿主为准，本仓库只声明遵守哪个版本。

## 安装形状

与 `ranking` 插件逐字相同：宿主取 `plugin.json` → 按 `code` 取源码 → 静态预检 +
沙箱试跑（跑 `smoke` 里的样例并比对 `expect`）→ 写进工件存储，**默认停用**。
用户在「插件」面板启用后，`lunar.*` 方法注册进宿主算子表，供阶段二 workflow 按名引用。
`catalogRef`（来源 registry URL + 资源 id）用于识别「同一个插件」，远端源码变化
时按钮变「更新」、走 `revise` 保留版本历史。

## 许可证

本工件代码与数据表随 `weiqi-assets` 以 MIT 发布。朔闰与节气日期是客观历法事实，
不属可版权表达；可读结构的重排、节日判定逻辑与全部接口代码为本项目自写。
未引入任何 GPL/第三方实现代码。香港天文台逐年对照表作为事实数据被引用，
出处已在上方标明。

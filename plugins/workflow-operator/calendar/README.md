# 月历算子（workflow-operator）

`workflow-operator` 扩展点的**工作流算子插件**。装进宿主、人工启用后，`OperatorRegistry`
把 `exposes[]` 里的 `buildMonth` 按名注册为算子 **`calendar.buildMonth`**（`<slug>.<method>`，
slug 来自资源 id `workflow-operator.calendar`）。带 `workflow` 的「月历」配方用 `"call"` 节点
按名引用它，和 `web_fetch` / `display` 一起组成一条**纯 workflow** DAG：

```
web_fetch(storeOnly)  →  calendar.buildMonth  →  display(table, weeks)
        └─ $ 绑定整份节假日 JSON ────────────┬──→  display(list, legend)
```

整张月历由 DAG 自己算完并走宿主 `displayMarkdown` 旁路交付。**模型只填 `year` / `month`、
只收「完成 + 句柄」**，不接收历法数据、不写 Markdown、不生成表格 —— 这是与已下架的
`user.dn2lz9` 半 workflow（`yield:true` 回灌模型、由模型排版）的根本区别。插件源码不进
主线程 JS 环境、不进模型上下文，调用时零网络、零宿主能力。

## 接口

唯一入口 `call({ method, args })`，`method` 只认 `buildMonth`：

### `buildMonth` — 生成整月可渲染数据

输入 `{ "year": 2027, "month": 2, "holidays": {…} }`，返回 `{ weeks, legend }`：

- `weeks[]`：每项 `{mon,tue,wed,thu,fri,sat,sun}` 七个纯文本单元格；月首按真实星期补空格，
  尾周补空格到 7 列；每个有日期的单元格是「公历日 + 空格 + 一个内容」。
- `legend[]`：每项 `{text}` 一行表格外说明（本月农历月段、节气、传统节日、法定放假日、
  调休上班日、数据来源）。

两段分别交给两个 `display` 节点：`format=table` 配 `fields=[mon..sun]` 渲染周表，
`format=list` 配 `fields=[text]` 渲染说明。宿主 `WorkflowTool` 把多段 `displayMarkdown`
按节点顺序用空行拼成一条旁路消息，模型不复述、归纳或补写。

### 单元格标记约定（逐条写明出处）

| 元素 | 规则 | 出处 |
|---|---|---|
| 法定放假日 | 公历日写成带圈数字 `①…㉛`，不加粗 | 已下架月历配方 v12 明文列出的标识；且带圈数字不是 markdown 语法字符，能穿过宿主 `DisplayPrimitive.cell()` 的转义 |
| 补班 / 其余日子 | 都是普通数字；**不写「班」字、不新造标记** | v12 靠「其余日子加粗」区分，但宿主 `cell()` 把 `*` 转成 `&#42;`，加粗在旁路里不可表达；调休上班日改由 `legend` 逐日列出，信息不丢 |
| 单元格内容 | 传统节日 > 节气 > 农历日名，只取一个 | v12 明文口径；节日判定用结构化农历字段，不靠字符串剥离 |
| 农历日名 | 只有「初一 / 廿五」这类纯日名，闰月加「闰」前缀 | 旧 `monthCalendar` 的 `dayText()` 天然不带月份字眼 |

### 法定假合并口径（明说，非拟合）

- `holidays.Years` 按年份映射假期数组；每条 `StartDate..EndDate` 连休区间内**每一天**＝法定放假日，
  `CompDays` 每一天＝调休上班日；两者同日时补班优先。
- 遍历所有年份键、按「日期是否落在本月」筛选，不假定假期一定归在同年键下（春节调休常跨月/跨年）。
- `Years` 缺失或结构不合法、年月越界、日期解析失败一律**抛错**，由 `WorkflowRunner` 结构化失败回灌；
  不编造法定假、不输出半张表。

## 数据来源（数值/常数必须有清楚出处）

| 出现处 | 来源 | 性质 |
|---|---|---|
| `LUNAR_TABLE` 201 行 | 1900–2100 每年「闰哪个月 / 12 个农历月各 29 或 30 天 / 闰月是否 30 天」公开朔闰事实数值，按可读结构逐行重排 | 天文历法事实，非推导、非拟合 |
| `SOLAR_TERM_TABLE` 200 行 | 香港天文台《公历农历对照表》逐年文本档 `T{year}e.txt`（1901–2100）的 `Solar terms` 列 | 天文历法事实，非推导、非拟合 |
| 基准 `1900-01-31` = 农历 1900 年正月初一 | 同一份历法事实起算点 | 历法事实 |
| `86400000` ms/日、`Date.UTC` | 公历日长定义 / ECMAScript 标准 API | 定义 / 标准 |
| 传统节日九条 | 本项目明说的民俗约定：春节=正月初一、元宵=正月十五、端午=五月初五、七夕=七月初七、中元=七月十五、中秋=八月十五、重阳=九月初九、腊八=腊月初八、除夕=该腊月实际末日；**闰月不算节日** | 业务约定，可争议可改 |
| 法定假 | workflow 上游 `web_fetch(storeOnly)` 注入的公开节假日 JSON（`StartDate` / `EndDate` / `CompDays`） | 公开数据，非本工件内置 |
| `CIRCLED_DAY` 31 个带圈数字 | 历史月历配方 v12 明文列出的 ①..㉛ | 展示约定 |
| `firstWeekday` 1..7 / `daysInMonth` | `Date.UTC(y, m, 0).getUTCDate()` / `getUTCDay()` 推导，自带闰年规则 | 标准 API 推导 |

节气事实表的抓取与核验方式沿用旧 lunar 插件 README：逐年取
`https://www.hko.gov.hk/en/gts/time/calendar/text/files/T{year}e.txt`（1901–2100 共 200 份），
只认 24 个英文标签词、每年必须恰好 24 条且顺序与「小寒…冬至」一致，实测 200/200 年通过。
独立核验锚点：香港天文台 <https://www.hko.gov.hk/en/gts/time/conversion.htm>。
本工件**不设阈值、不做压缩或差值编码、不引第三方实现代码**。

## 诚实兜底

- 插件未安装 / 未启用 → `run_workflow` 运行前校验报「未注册算子 `calendar.buildMonth`」，
  配方 prompt 要求模型如实说明并提示到「🧩 插件」面板安装启用「月历算子」，不推算、不补写。
- 节假日 JSON 取不到 / 不是合法 JSON / `Years` 缺失 → `buildMonth` 抛错，DAG 结构化失败，
  同样如实说明，绝不输出半张表。
- 历法事实表范围外（早于 1900-01-31 或晚于 2100 农历年末）→ `solarToLunar` 抛错，不外推。

## 契约来源

| 约束 | 来源 |
|---|---|
| 扩展点 `workflow-operator`、spec v1、入口 `call`、hostApi 为空、资源配额 | `weiqi-bot/domain/plugin/types.ts` 的 `WORKFLOW_OPERATOR_SPEC` / `DEFAULT_PLUGIN_LIMITS` |
| `maxCodeBytes` 64KB（2026-11-17 放宽） | 同文件；本工件可读事实表源码约 53KB，旧 32KB 会卡安装预检；数值历史出处保留 |
| `call({method,args})` 输入只作为 JSON 数据进入沙箱 | `weiqi-bot/infrastructure/plugin-vm/QuickJsExecutor.ts` 的 `__PLUGIN_INPUT__` |
| 方法名只认 `exposes[]` 白名单 | `weiqi-bot/application/plugin/OperatorRegistry.ts` |
| 安装前静态预检 + 沙箱试跑 + `smoke[].expect` 严格比对 | `weiqi-bot/services/plugin-catalog/PluginCatalogService.ts` / `application/plugin/OperatorContract.ts` |

`smoke[]` 两条由生成脚本从本库真实输出程序化导出（不是手写 guess）：
一条「无法定假月份」验证周网格与「无」口径，一条「春节连休 + 调休」验证带圈数字、
跨月补班筛选与节日/节气。宿主按 `method` 组装 `call({method,args})` 并逐字段比对 `expect`。

## 安装形状

与 `ranking` 插件逐字相同：宿主取 `plugin.json` → 按 `code` 取源码 → 静态预检 +
沙箱试跑（跑 `smoke` 样例并比对 `expect`）→ 写进工件存储，**默认停用**。用户在「🧩 插件」
面板启用后，`calendar.buildMonth` 注册进宿主算子表，供「月历」workflow 配方按名引用。

## 许可证

本工件代码与数据表随 `weiqi-assets` 以 MIT 发布。朔闰与节气日期是客观历法事实，
不属可版权表达；可读结构的重排、节日判定、月历排版与全部接口代码为本项目自写，
未引入任何 GPL / 第三方实现代码。

# 贡献指南

## 原则

- **一个资源一个目录**，目录名即稳定 ID 的一部分，发布后不改名、不复用。
- **manifest 是入口**：任何扩展资源都必须能从 `registry.json` 找到。
  `share/` 是站点能力，不进 registry，它的入口是 `share/README.md` 里的 URL 契约。
- **数值有出处**：不引入经验阈值；契约数值一律引用 weiqi-bot 的具名常量，并在 README 里写明来源文件。
- **代码要能跑**：插件源码必须能在宿主 QuickJS 沙箱里通过校验与试跑，不能只是示意。
- **改 share 要两仓同步**：路径、URL、编解码格式任一变更，都要同时改本仓库与 weiqi-bot，
  并跑 `npm run validate` + weiqi-bot 相关单测。
- **分层事实源**：顶层 `registry.json` 是插件 / 工具的索引；技能是 `skills/registry.json` 瘦索引 +
  每技能一个 `skills/<id>/skill.json` 完整配方为真相（索引只做目录）。
  `index.html` 的两个列表运行时 `fetch` 顶层清单与技能瘦索引渲染，README 也不逐条列举、不写死数量。
  新增 / 修订技能按「建目录 + 写 `skill.json` + 写 `README.md` + 追加索引条目」四步走；
  插件 / 工具改 `registry.json` + 建条目目录。不要同步去改 `index.html` 或 README 里的条目列表 ——
  那类手工副本正是过去数字漂移的来源。

## 新增插件

1. 先确认这项能力不是宿主已有的通用 Workflow 算子。JSON / regex 数据处理应直接调用宿主 `json.*` / `regex.*`，不要重新发布插件；只有领域专用计算才考虑 `workflow-operator` 插件。
2. 确认宿主已有对应扩展点 spec（见 [extension-points.md](extension-points.md)）。没有就先在 weiqi-bot 里做，别先发资源。
3. 建目录：`plugins/<pointId>/<slug>/`（`<pointId>` 取 `ranking` 或 `workflow-operator`，见 [extension-points.md](extension-points.md)）。
4. 写 `plugin.json`（以 `workflow-operator` 工作流算子插件为例）：

   ```json
   {
     "$schema": "../../../schema/plugin.schema.json",
     "id": "workflow-operator.my-operator",
     "name": "我的工作流算子",
     "type": "plugin",
     "pointId": "workflow-operator",
     "specVersion": 1,
     "entry": "call",
     "code": "plugins/workflow-operator/my-operator/index.js",
     "origin": "manual",
     "intent": "用户最初的需求原话",
     "readme": "plugins/workflow-operator/my-operator/README.md",
     "license": "MIT",
     "tags": ["workflow-operator"],
     "exposes": [
       { "name": "compute", "description": "算子方法说明", "params": { "type": "object", "properties": {}, "additionalProperties": false } }
     ],
     "smoke": [
       { "method": "compute", "args": [{}], "expect": {} }
     ]
   }
   ```

   `id` 用小写字母/数字开头，只允许 `[a-z0-9._-]`。`$schema` / `code` / `readme`
   都是**仓库根相对路径**（三层目录就写 `../../../`）。`pointId` 必须在宿主注册表里，
   `scripts/validate.mjs` 的 `KNOWN_POINT_IDS` 白名单会拦截自造值。
   `exposes[]` 每个方法会按 `<slug>.<name>` 注册成一条宿主算子，供阶段二 workflow 按名调用。

5. 写 `index.js`：全局函数 `call({ method, args })`，`method` 只认 `exposes[]` 白名单，
   返回任意可 JSON 序列化值。不得引用宿主/浏览器全局，不得动态求值，不得无界循环；
   注释里也别写那些禁用词（`PluginValidator` 对整串做正则）。
   （ranking 插件则写 `rank({matches})` 返回 `{columns,rows}`，见 `plugins/ranking/total-score/index.js`）。
6. 写 `README.md`：说明契约来源（宿主哪个文件）、算子方法的**明确选择**、安装形状（登记进宿主 `OperatorRegistry`）。
   如果用了任何阈值或常数，必须说清是物理推导、具名准则还是明说的业务约束。
7. 在 `registry.json` 的 `resources` 追加条目，`type: "plugin"`，带 `pointId` 与 `specVersion`，
   `category` 填 `算子`，`path` 指向 `plugin.json`。
8. 跑 `npm run validate`；再在 weiqi-bot 里用 `PluginValidator` + QuickJS 试跑一次
   （workflow-operator 用 `smoke[]` 比对 `expect`；ranking 输出要能过 `validateRankingOutput`）。

`workflow-operator` 是工作流算子插件：入口固定 `call({method,args})`，`method` 只认 `exposes[]` 里的名字，
manifest 还要给 `exposes[]`（算子方法名 + 说明 + 参数 JSON Schema）与 `smoke[]`（算子自检样例 + 期望值）。
插件必须是经典脚本或 `module.exports` 形态，不得用 ESM `export`；不要依赖 `new Date()`
这类非确定性结果做自检断言。算子插件契约见 `docs/extension-points.md` 的 `workflow-operator` 专节。
算子插件不挂模型 `tools[]`，只进宿主算子表。

以上是「把算子随资源发布、人工安装」的路径。也可以由插件开发角色自建算子插件：
该角色用 `plugin_write` 带 `pointId:"workflow-operator"` + `exposes[]` + `smoke[]` 即可，宿主用同一套
沙箱逐条自检、落进同一张工件表，默认停用、人工启用后注册进 `OperatorRegistry` 供阶段二 workflow
按名引用，跨会话复用。两条路径都不挂模型 `tools[]`。详见 `docs/extension-points.md`
的 `workflow-operator` 专节。

## 新增工具声明

1. 建目录：`tools/<tool-name>/v<N>/`（同一工具多版本并存，不覆盖）。
2. `tool.json` 的 `definition` 逐字段对齐宿主 `ModelToolDefinition`：

   ```json
   {
     "$schema": "../../../schema/tool.schema.json",
     "id": "web-fetch.v1",
     "name": "web_fetch",
     "type": "tool",
     "version": 1,
     "definition": {
       "name": "web_fetch",
       "description": "...",
       "parameters": { "type": "object", "properties": {}, "required": [], "additionalProperties": false }
     },
     "implementation": {
       "status": "host-builtin",
       "source": "weiqi-bot/application/chat/WebFetchTool.ts",
       "note": "说明执行器在哪、为什么本仓库不提供实现"
     },
     "readme": "tools/web-fetch/v1/README.md",
     "tags": ["web"]
   }
   ```

3. `README.md` 写明契约来源、执行器位置、以及 `implementation.status` 的含义。
4. 在 `registry.json` 追加条目，`type: "tool"`。
5. 跑 `npm run validate`。

⚠️ 除非 weiqi-bot 已经实现「外部执行器隔离与注册」，否则**不要**把 status 写成
`downloadable`，也不要在本仓库放会被主线程直接执行的代码。

## 新增技能配方

技能是**纯声明 JSON**（不含代码），采用两段式清单：`skills/registry.json` 是瘦索引（目录），
`skills/<id>/skill.json` 才是完整配方（真相）。按下面顺序改：

1. **建目录**：`skills/<id>/`（目录名即配方 `id`，发布后不改名、不复用）。
2. **写完整配方** `skills/<id>/skill.json`（`schemaVersion: 1`，字段从宿主 `SkillRecipe` 契约来）：

   ```json
   {
     "schemaVersion": 1,
     "id": "play.start",
     "version": 1,
     "name": "围棋对弈",
     "summary": "一句话说清什么场景、做什么",
     "routeHint": ["用户想…时", "用户说…时"],
     "category": "围棋",
     "primitives": ["navigate_to"],
     "prompt": "命中后追加给对话模型的自然语言指令……"
   }
   ```

   带 `workflow` 的配方再加 `inputs` / `workflow.steps[]`（形状见 `schema/workflow.schema.json`）；普通 JSON / regex 操作直接使用宿主 `json.*` / `regex.*`，不会形成插件安装依赖；
   这类配方的 `primitives` 置空数组 `[]`（索引层看不到 workflow，**允许空数组**）。
   可选 `returnToLLM`（默认 false，仅带 `workflow` 的配方有意义）：显式 `true` 时正常模式也把
   `yield` 汇总 values 回灌给模型做分析；字段出处见 `schema/workflow.schema.json` 与 weiqi-bot
   `application/skill/SkillRecipe.ts`，索引不带此字段、不纳入索引↔配方重叠字段比对。
   `returnToLLM:true` 配方的 `run_workflow` 只回结果句柄，模型须用宿主内置 `workflow_result_read`
   按 `resultId` 分段读全 `yield` 汇总后再做关系分析；该工具只读、不占决策轮，
   无需在配方 `primitives` 里声明、无需安装插件。
   可选 `llmProjection`（形状 `{ keep: 非空字符串数组 }`，仅 `returnToLLM:true` 且带 `workflow`
   的配方有意义）：声明哪些 `yield` 顶层段进 LLM 视图；宿主在写入结果缓存前按 `keep` 做声明式投影 +
   无损紧凑行（`columns/rows`）后再写入结果缓存，缺省 = 全量 B2 行为（零回归）。字段出处见
   `schema/workflow.schema.json` 与 weiqi-bot `SkillRecipe.llmProjection`（2026-11-25 B3 契约 A1）；
   具体出处与能力边界写进技能 README，索引不带此字段、不纳入索引↔配方重叠字段比对。
3. **写** `skills/<id>/README.md`：说明契约来源（宿主哪个文件）、路由场景与安装形状。
4. **往 `skills/registry.json` 的 `skills[]` 追加索引条目**（该文件 `schemaVersion: 2`）：

   ```json
   {
     "id": "play.start",
     "version": 1,
     "name": "围棋对弈",
     "summary": "一句话说清什么场景、做什么",
     "routeHint": ["用户想…时", "用户说…时"],
     "primitives": ["navigate_to"],
     "category": "围棋",
     "path": "play.start/skill.json"
   }
   ```

   `id` / `version` / `name` / `summary` / `routeHint` / `primitives` / `category` 这些重叠字段
   **从 `skill.json` 原样抄过来**（数组逐项一致、两边都不写算一致）；`path` 固定为 `<id>/skill.json`。
   **索引与 `skill.json` 重叠字段不一致会被 `npm run validate` 的 `validateSkillRegistry()` 拦下**
   （`version` 决定宿主「有更新」判定，索引不能骗人）。
5. 跑 `npm run validate`（本节只列出步骤，执行由维护者完成）。

要点：

1. `id` 小写字母 / 数字开头，只允许 `[a-z0-9._-]`，全清单唯一；`version` 为正整数，
   修订同一条配方时索引与 `skill.json` 两边一起递增它（宿主据此提示「有更新」）。
2. `name` / `summary` 说清场景与职责 —— 宿主每轮用 `id | name` 加配方
   **可选声明的路由词短语数组 `routeHint`** 组成目录交给模型做路由：
   没配 `routeHint` 的配方目录只给 `id | name`，此时靠名称路由；配了就把数组里的短语
   用顿号拼成一行接在后面，供模型按用户说法命中。每项须是单行非空短语、由配方从
   自身场景句提炼，宿主不内置词表；`prompt` 是命中后才追加的指令，不参与路由。
   可选 `category` 是面板筛选用的中文标签，取值只能是
   排名 / 算子 / 围棋 / 财经 / 搜索 / 生活 / 开发 / 未分类 之一（见 README 的分类说明），
   且索引与 `skill.json` 两处都写时取值必须一致。
   不写也能用：宿主按 `id` 第一段命名空间兜底推导，推不出来显示「未分类」。
3. `primitives` 只能引用宿主已注册的原语名（如 `navigate_to` / `web_fetch` /
   `http_fetch_auth` / `secret_prompt` / `web_cache_read`），引用不存在的原语 →
   只展示、不可安装；**允许空数组**（带 `workflow` 的配方就是 `[]`）。
   可选 `secrets` 按对应宿主契约填写，缺省即「不涉凭据」。`secrets` 的形状见
   weiqi-bot `application/skill/SecretSpec.ts`：除 `key` / `label` /
   `allowedHosts` / `header` 外，POST 接口可声明 `method: "POST"` /
   `bodyStatic` / `bodyQueryParams`；POST 专属字段出现在 GET 配方、或缺 method
   的 POST 配方都会在解析阶段被拒。
4. 结构契约在 weiqi-bot 的 `application/skill/SkillRecipe.ts`（`parseSkillRecipe`），
   带 workflow 的形状见本仓库 `schema/workflow.schema.json`；`scripts/validate.mjs` 的
   `validateSkillRegistry()` 校验索引形状 / path 存在 / 索引↔配方重叠字段一致 / category 白名单 /
   workflow 静态形状。站点技能列表只读取瘦索引渲染，数量与目录字段自动跟随，
   **不需要改 `index.html` 或重建 Web 资源包**；但完整配方本身必须写进 `skills/<id>/skill.json`。

## 修改 SGF 分享能力

见 [share/README.md](../share/README.md)。要点：

- `share/share.js` 是纯库，**不要加回任何基于路径的自动初始化**（会导致重复下载）；
- `decodeUrl` / `libUrl` 改了，要同步 weiqi-bot 的 `WEIQI_SHARE_DECODE_URL` 与测试断言；
- 编解码字节格式改了，要两端同时改并补测试；
- 换路径不需要考虑旧二维码兼容，但仍需两仓同步 + 校验通过。

## 校验

```bash
node scripts/validate.mjs      # 或 npm run validate
```

检查项：JSON 合法、必填字段、ID 命名与唯一性、路径在仓库内且不逃逸、
registry 与条目 ID/版本一致、工具 `definition` 形状、插件代码入口存在且不含禁用规则、
`share/` 的 URL 契约一致。校验失败时 commit 不该通过评审。

## 提交与发布

- 本地 `git commit` 即可；**不要主动 push**（由维护者决定发布时机）。
- 发布即 GitHub Pages 上线，`registry.json` 立刻对所有宿主可见 —— 所以合并前务必确认
  条目自洽、示例能跑、文档里的宿主路径与文件名真实存在。
- 废弃资源：保留文件，在 `summary` 里说明，不删、不复用 ID。

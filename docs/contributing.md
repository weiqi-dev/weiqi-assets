# 贡献指南

## 原则

- **一个资源一个目录**，目录名即稳定 ID 的一部分，发布后不改名、不复用。
- **manifest 是入口**：任何扩展资源都必须能从 `registry.json` 找到。
  `share/` 是站点能力，不进 registry，它的入口是 `share/README.md` 里的 URL 契约。
- **数值有出处**：不引入经验阈值；契约数值一律引用 weiqi-bot 的具名常量，并在 README 里写明来源文件。
- **代码要能跑**：插件源码必须能在宿主 QuickJS 沙箱里通过校验与试跑，不能只是示意。
- **改 share 要两仓同步**：路径、URL、编解码格式任一变更，都要同时改本仓库与 weiqi-bot，
  并跑 `npm run validate` + weiqi-bot 相关单测。

## 新增插件

1. 确认宿主已有对应扩展点 spec（见 [extension-points.md](extension-points.md)）。
   没有就先在 weiqi-bot 里做，别先发资源。
2. 建目录：`plugins/<pointId>/<slug>/`。
3. 写 `plugin.json`：

   ```json
   {
     "$schema": "../../../schema/plugin.schema.json",
     "id": "ranking.my-plugin",
     "name": "我的排名口径",
     "type": "plugin",
     "pointId": "ranking.tiebreak",
     "specVersion": 1,
     "entry": "rank",
     "code": "plugins/ranking.tiebreak/my-plugin/index.js",
     "origin": "manual",
     "intent": "用户最初的需求原话",
     "readme": "plugins/ranking.tiebreak/my-plugin/README.md",
     "license": "MIT",
     "tags": ["ranking"]
   }
   ```

   `id` 用小写字母/数字开头，只允许 `[a-z0-9._-]`。`$schema` / `code` / `readme`
   都是**仓库根相对路径**（三层目录就写 `../../../`）。

4. 写 `index.js`：全局函数 `rank(players)`，返回与输入等长、每行带 `id` 与数值 `rank` 的数组。
   不得引用宿主/浏览器全局，不得动态求值，不得无界循环；注释里也别写那些禁用词
   （`PluginValidator` 对整串做正则）。
5. 写 `README.md`：说明契约来源（宿主哪个文件）、排序/业务口径的**明确选择**、安装形状。
   如果用了任何阈值或常数，必须说清是物理推导、具名准则还是明说的业务约束。
6. 在 `registry.json` 的 `resources` 追加条目，`type: "plugin"`，带 `pointId` 与 `specVersion`，
   `path` 指向 `plugin.json`。
7. 跑 `npm run validate`；再在 weiqi-bot 里用 `PluginValidator` + QuickJS 试跑一次。

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

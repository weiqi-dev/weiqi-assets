# web_fetch 工具声明（镜像）

这是 weiqi-bot 内置 `web_fetch` 工具声明的**可下载镜像**，用来确立 weiqi-assets 里
「工具」这类资源的形状，不是第二份实现。

## 契约来源

`definition` 逐字段对齐 `weiqi-bot/application/model/IModelGateway.ts` 的
`ModelToolDefinition`，可原样放进 `ModelRequest.tools`。宿主内的权威声明在
`weiqi-bot/application/chat/WebFetchTool.ts`（`WEB_FETCH_TOOL`），执行器
`executeWebFetch` 负责 URL 校验（只放行 http/https、拒绝环回/私网字面地址）与
`api.weiqi.lol` 透明代理链路；注册位置是 `application/chat/WebToolLoop.ts` 的
`TOOLS[]` / `EXECUTORS`。

## implementation.status 语义

| 值 | 含义 |
|---|---|
| `host-builtin` | 执行器已在宿主内，这里只发布声明供发现与核对 |
| `downloadable` | 本仓库同时提供可执行实现，宿主下载后注册 |
| `reference` | 仅供文档参考，不保证可注册 |

当前所有工具条目都是 `host-builtin`。若将来要发布真正可下载的工具实现，
需先在 weiqi-bot 的 `WebToolLoop` 里增加「从资源清单注册外部执行器」的能力，
并明确沙箱/权限边界——**不要**把任意远程 JS 直接塞进主线程。

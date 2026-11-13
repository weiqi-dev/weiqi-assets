# share/ — SGF 二维码分享与下载

weiqi-bot 的「生成分享二维码 → 扫码下载 SGF」功能所用的站点能力。
一个库 + 一个着陆页，纯静态，无构建、无依赖。

## 文件

| 文件 | 作用 |
|---|---|
| `share.js` | `WeiqiShare`：紧凑二进制编解码、SGF 转换、二维码生成、下载 |
| `index.html` | 扫二维码后的着陆页，显式调用一次 `WeiqiShare.handleDecodePage()` |
| `README.md` | 本文件：URL 契约、数据格式、改动须知 |

## URL 契约

| 常量 | 值 | 谁在用 |
|---|---|---|
| `decodeUrl` | `https://weiqi-dev.github.io/weiqi-assets/share/` | `WeiqiShare.getShareUrl()` 生成二维码内容；weiqi-bot `WEIQI_SHARE_DECODE_URL` 生成分享链接 |
| `libUrl` | `https://weiqi-dev.github.io/weiqi-assets/share/share.js` | 第三方按此地址引入库 |
| 二维码内容 | `<decodeUrl>?d=<URL-safe Base64>` | 扫码后由 `index.html` 解析 `d` 参数 |

两处 `decodeUrl` 必须一致：本文件的 `WeiqiShare.config.decodeUrl`，以及
`weiqi-bot/services/share/WeiqiAssetsUrls.ts` 的 `WEIQI_SHARE_DECODE_URL`。
`scripts/validate.mjs` 会校验这个一致性。

> 路径不再视为不可变更的兼容约束（用户 2026-11-13 明确无需考虑旧二维码兼容）。
> 但仍应「改一处、两仓同步」：换路径时同时改本文件、落页 script 引用、
> weiqi-bot 常量与相关测试断言，并跑一遍 validate。

## 数据格式

紧凑二进制，每手 2 字节，URL-safe Base64（`+`→`-`、`/`→`_`、去 `=`）：

- 文件头 4 字节：Magic `0x57`、Version `0x01`、BoardSize、Handicap
- 每手：第 1 字节 = 颜色 1bit（`W`=1 / `B`=0）+ X 坐标 7bit；第 2 字节 = Y 坐标 8bit
- 编码端对应 `weiqi-bot/domain/share/GameEncoder.ts`；解码端是本文件 `decode()`
- `toSGF()` 输出 `(;GM[1]FF[4]SZ[n]CA[UTF-8]AP[WeiqiRecorder]KM[0]...)`

数值来源：字节布局来自编码/解码两端共同的约定，不是经验阈值；改动须两端同时改并补测试。

## 解码触发方式（重要）

`share.js` 是**纯库，加载无副作用**。解码下载只由 `index.html` 里这一句显式触发：

```html
<script src="./share.js"></script>
<script>WeiqiShare.handleDecodePage();</script>
```

历史版本曾在库尾部用「`currentScript.src` 是否包含 `/share/`」做启发式自动初始化。
把库移进 `share/` 后这段会被触发，与落页的显式调用叠加导致**下载两次 SGF**；
第三方按 `libUrl` 引入时也会误弹「无效的棋谱链接」。故已移除。
**不要再加回任何基于路径的自动初始化。**

## 二维码链路

```
weiqi-bot ShareService.generateShareUrl()
  → baseUrl + '?d=' + GameEncoder 输出
  → 二维码（客户端本地生成）
  → 用户扫码 → GET /share/?d=...
  → index.html 调 handleDecodePage()
  → decode() → toSGF() → download() 落盘 .sgf
```

`cdnUrl` 仅用于按需加载 `qrcodejs`（生成二维码时），与解码链路无关。

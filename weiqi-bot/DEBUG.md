# 调试说明

## 当前状态

从日志发现：
- ✅ JavaScript 注入成功
- ✅ 回调代码已执行
- ❌ 但没有捕获到 WebSocket 数据

## 需要重新编译 APK

修改了 MainActivity.kt，添加了更详细的调试日志：
- 检查 `window.onSnifferResult` 是否存在
- 如果不存在，输出错误日志

## 编译命令

在编译机器上执行：

```bash
cd ~/weiqi-bot/clients/app/android
./gradlew assembleDebug
```

然后安装新的 APK 并测试。

## 预期日志

应该看到：
```
[MainActivity] Checking window.onSnifferResult existence: function
[MainActivity] Calling window.onSnifferResult
```

或者：
```
[MainActivity] Checking window.onSnifferResult existence: undefined
[MainActivity] ERROR: window.onSnifferResult is UNDEFINED
```

## 关键问题

如果看到 `undefined`，说明回调函数不存在，问题在于：
1. 页面加载时机问题
2. 或者 WebView 环境问题

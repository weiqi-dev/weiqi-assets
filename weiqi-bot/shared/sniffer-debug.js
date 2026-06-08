/**
 * 自动注册 Sniffer 回调（调试版本）
 * 在页面加载时自动注册，不需要等待手动调用
 */

// 立即执行，确保在任何 sniffer 操作之前注册
(function() {
    console.log('[AutoSniffer] 开始自动注册回调...');
    
    // 创建消息队列
    const messageQueue = [];
    let statusCallback = null;
    
    // 注册全局回调
    window.onSnifferData = function(json) {
        console.log('[AutoSniffer] ✅ onSnifferData 被调用:', json.substring(0, 100));
        try {
            const data = JSON.parse(json);
            messageQueue.push(data);
            
            // 检查是否有游戏数据
            if (data.type === 'ws_receive' && data.data) {
                try {
                    const wsData = JSON.parse(data.data);
                    if (wsData.cmd === '6' || wsData.cmd === '2') {
                        console.log('[AutoSniffer] 🎮 找到游戏数据! cmd=' + wsData.cmd);
                        // 显示在页面上
                        showDebugLog('🎮 找到游戏数据! cmd=' + wsData.cmd, 'success');
                    }
                } catch (e) {}
            }
        } catch (e) {
            console.error('[AutoSniffer] 解析数据失败:', e);
        }
    };
    
    window.onSnifferResult = function(json) {
        console.log('[AutoSniffer] ✅ onSnifferResult 被调用:', json);
        try {
            const result = JSON.parse(json);
            const action = result.action || '';
            const data = result.data || '';
            
            if (action === 'started') {
                console.log('[AutoSniffer] 🟢 抓包已启动:', data);
                showDebugLog('🟢 抓包已启动: ' + data, 'info');
            } else if (action === 'stopped') {
                console.log('[AutoSniffer] 🛑 抓包已停止:', data);
                showDebugLog('🛑 抓包已停止: ' + data, 'info');
                if (statusCallback) {
                    statusCallback({
                        success: true,
                        sessionId: data,
                        messages: messageQueue.slice()
                    });
                }
            } else if (action === 'error') {
                console.error('[AutoSniffer] ❌ 抓包错误:', data);
                showDebugLog('❌ 抓包错误: ' + data, 'error');
                if (statusCallback) {
                    statusCallback({
                        success: false,
                        error: data,
                        messages: messageQueue.slice()
                    });
                }
            }
        } catch (e) {
            console.error('[AutoSniffer] 解析结果失败:', e);
        }
    };
    
    console.log('[AutoSniffer] ✅ 回调函数已注册');
    console.log('[AutoSniffer] window.onSnifferData 存在:', !!window.onSnifferData);
    console.log('[AutoSniffer] window.onSnifferResult 存在:', !!window.onSnifferResult);
    
    // 显示调试日志的函数
    function showDebugLog(message, type) {
        const logDiv = document.getElementById('sniffer-debug-log');
        if (logDiv) {
            const entry = document.createElement('div');
            entry.style.padding = '5px';
            entry.style.margin = '5px 0';
            entry.style.borderRadius = '3px';
            
            if (type === 'success') {
                entry.style.background = '#0a0';
                entry.style.color = '#fff';
            } else if (type === 'error') {
                entry.style.background = '#a00';
                entry.style.color = '#fff';
            } else {
                entry.style.background = '#00a';
                entry.style.color = '#fff';
            }
            
            entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            logDiv.appendChild(entry);
            logDiv.scrollTop = logDiv.scrollHeight;
        }
    }
    
    // 导出调试接口
    window.SnifferDebug = {
        getMessages: () => messageQueue.slice(),
        clearMessages: () => messageQueue.length = 0,
        setStatusCallback: (cb) => { statusCallback = cb; },
        showDebugLog
    };
    
    // 在页面上显示调试日志容器
    window.addEventListener('DOMContentLoaded', () => {
        const container = document.createElement('div');
        container.id = 'sniffer-debug-container';
        container.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            width: 300px;
            max-height: 200px;
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #0f0;
            border-radius: 5px;
            z-index: 99999;
            font-family: monospace;
            font-size: 12px;
        `;
        
        const header = document.createElement('div');
        header.style.cssText = `
            padding: 5px;
            background: #0f0;
            color: #000;
            font-weight: bold;
        `;
        header.textContent = '🔍 Sniffer 调试';
        
        const logDiv = document.createElement('div');
        logDiv.id = 'sniffer-debug-log';
        logDiv.style.cssText = `
            max-height: 150px;
            overflow-y: auto;
            padding: 5px;
        `;
        
        const statusDiv = document.createElement('div');
        statusDiv.id = 'sniffer-debug-status';
        statusDiv.style.cssText = `
            padding: 5px;
            background: #000;
            color: #0f0;
            font-size: 10px;
        `;
        statusDiv.textContent = `回调状态: onSnifferData=${!!window.onSnifferData}, onSnifferResult=${!!window.onSnifferResult}`;
        
        container.appendChild(header);
        container.appendChild(statusDiv);
        container.appendChild(logDiv);
        document.body.appendChild(container);
        
        showDebugLog('调试工具已加载', 'info');
    });
})();

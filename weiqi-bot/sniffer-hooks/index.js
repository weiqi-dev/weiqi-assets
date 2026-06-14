/**
 * Sniffer Hooks - 主入口
 * 
 * 功能：
 * 1. 动态加载其他 hook 模块
 * 2. 内置 WebSocket hook（降级方案）
 * 3. 统一的事件上报机制
 * 
 * 设计原则：
 * - 最小化：只包含核心功能
 * - 可扩展：通过动态加载支持更多功能
 * - 向后兼容：内置降级方案
 */

(function() {
    'use strict';

    // 防止重复注入
    if (window.__sniffer_hooks_loaded__) return;
    window.__sniffer_hooks_loaded__ = true;

    const TAG = 'sniffer-hooks';
    const HOOK_BASE_URL = 'http://localhost:8088/sniffer-hooks';

    // ========== 事件上报 ==========

    /**
     * 发送事件到 content script
     * @param {string} type - 事件类型 (ws_open, ws_receive, http_response 等)
     * @param {string} url - 相关 URL
     * @param {any} data - 事件数据
     */
    function postEvent(type, url, data) {
        try {
            window.postMessage({
                __wsSnifferTag: 'ws-sniffer@weiqi.app',
                payload: { t: type, u: url, d: data, ts: Date.now() }
            }, '*');
        } catch (e) {
            console.error(`[${TAG}] Failed to post event:`, e);
        }
    }

    // ========== WebSocket Hook ==========

    /**
     * 注入 WebSocket hook 到页面主世界
     */
    function injectWebSocketHook() {
        if (window.__ws_sniffer_page__) return;
        window.__ws_sniffer_page__ = true;

        const OriginalWebSocket = window.WebSocket;
        if (!OriginalWebSocket) {
            console.warn(`[${TAG}] WebSocket not available`);
            return;
        }

        /**
         * WebSocket 代理类
         */
        function HookedWebSocket(url, protocols) {
            const ws = protocols ? new OriginalWebSocket(url, protocols) : new OriginalWebSocket(url);

            // 连接打开事件
            postEvent('ws_open', url, null);

            // hook send 方法
            try {
                const originalSend = ws.send.bind(ws);
                ws.send = function(data) {
                    const payload = typeof data === 'string' ? data : '[bin]';
                    postEvent('ws_send', url, payload);
                    return originalSend(data);
                };
            } catch (e) {
                console.error(`[${TAG}] Failed to hook WebSocket.send:`, e);
            }

            // 监听消息事件
            ws.addEventListener('message', function(event) {
                const payload = typeof event.data === 'string' ? event.data : '[bin]';
                postEvent('ws_receive', url, payload);
            });

            // 监听关闭事件
            ws.addEventListener('close', function(event) {
                postEvent('ws_close', url, { code: event.code, reason: event.reason || '' });
            });

            // 监听错误事件
            ws.addEventListener('error', function() {
                postEvent('ws_error', url, null);
            });

            return ws;
        }

        // 保持原型链
        HookedWebSocket.prototype = OriginalWebSocket.prototype;

        // 复制静态常量
        ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function(key) {
            try {
                Object.defineProperty(HookedWebSocket, key, {
                    value: OriginalWebSocket[key],
                    writable: false,
                    configurable: true,
                    enumerable: true
                });
            } catch (e) {
                // 忽略错误
            }
        });

        // 替换全局 WebSocket
        try {
            window.WebSocket = HookedWebSocket;
            console.log(`[${TAG}] WebSocket hook installed`);
        } catch (e) {
            console.error(`[${TAG}] Failed to replace WebSocket:`, e);
        }
    }

    // ========== 动态加载模块 ==========

    /**
     * 动态加载外部脚本
     * @param {string} url - 脚本 URL
     * @returns {Promise<void>}
     */
    function loadScript(url) {
        return new Promise(function(resolve, reject) {
            const script = document.createElement('script');
            script.src = url;
            script.onload = function() {
                console.log(`[${TAG}] Loaded: ${url}`);
                script.remove();
                resolve();
            };
            script.onerror = function() {
                console.error(`[${TAG}] Failed to load: ${url}`);
                script.remove();
                reject(new Error(`Failed to load ${url}`));
            };
            (document.documentElement || document.head || document.body).appendChild(script);
        });
    }

    /**
     * 加载 HTTP hook 模块
     */
    async function loadHttpHook() {
        console.log(`[${TAG}] Loading HTTP hook from: ${HOOK_BASE_URL}/http-hook.js`);
        try {
            await loadScript(`${HOOK_BASE_URL}/http-hook.js`);
            console.log(`[${TAG}] HTTP hook loaded successfully`);
        } catch (e) {
            console.warn(`[${TAG}] HTTP hook not loaded, using WebSocket only:`, e);
        }
    }

    // ========== 初始化 ==========

    /**
     * 主初始化函数
     */
    async function init() {
        // 1. 注入内置的 WebSocket hook（保证基础功能可用）
        injectWebSocketHook();

        // 2. 尝试加载 HTTP hook（可选功能）
        await loadHttpHook();

        console.log(`[${TAG}] Initialization complete`);
    }

    // 立即执行
    init().catch(function(e) {
        console.error(`[${TAG}] Initialization failed:`, e);
    });

})();

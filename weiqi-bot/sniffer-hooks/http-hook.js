/**
 * HTTP Hook - fetch 和 XHR 拦截
 * 
 * 功能：
 * 1. 拦截 fetch 请求和响应
 * 2. 拦截 XMLHttpRequest 请求和响应
 * 3. 按 URL pattern 过滤
 * 4. 限制响应体大小
 */

(function() {
    'use strict';

    // 防止重复注入
    if (window.__http_hook_loaded__) return;
    window.__http_hook_loaded__ = true;

    const TAG = 'http-hook';
    const MAX_BODY_SIZE = 1024 * 1024; // 1MB

    // ========== 事件上报 ==========

    /**
     * 发送事件到 content script（使用 index.js 提供的全局函数）
     */
    function postEvent(type, url, data) {
        if (typeof window.__sniffer_post_event__ === 'function') {
            window.__sniffer_post_event__(type, url, data);
        } else {
            // 降级：直接使用 postMessage
            try {
                window.postMessage({
                    __wsSnifferTag: 'ws-sniffer@weiqi.app',
                    payload: { t: type, u: url, d: data, ts: Date.now() }
                }, '*');
            } catch (e) {
                console.error(`[${TAG}] Failed to post event:`, e);
            }
        }
    }

    // ========== Fetch Hook ==========

    /**
     * Hook fetch API
     */
    function hookFetch() {
        const originalFetch = window.fetch;
        if (!originalFetch) {
            console.warn(`[${TAG}] fetch not available`);
            return;
        }

        window.fetch = async function(input, init) {
            const url = typeof input === 'string' ? input : input.url;
            const method = init?.method || 'GET';

            // 发送请求事件
            postEvent('http_request', url, {
                method: method,
                headers: init?.headers || {}
            });

            try {
                const response = await originalFetch.apply(this, arguments);

                // 克隆响应以读取内容
                const clonedResponse = response.clone();

                // 读取响应体（限制大小）
                const contentLength = response.headers.get('content-length');
                if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
                    // 响应体太大，不读取
                    postEvent('http_response', url, {
                        status: response.status,
                        headers: Object.fromEntries(response.headers.entries()),
                        body: '[too large]'
                    });
                } else {
                    // 读取响应体
                    try {
                        const body = await clonedResponse.text();
                        postEvent('http_response', url, {
                            status: response.status,
                            headers: Object.fromEntries(response.headers.entries()),
                            body: body
                        });
                    } catch (e) {
                        // 无法读取响应体（可能是二进制流）
                        postEvent('http_response', url, {
                            status: response.status,
                            headers: Object.fromEntries(response.headers.entries()),
                            body: '[unreadable]'
                        });
                    }
                }

                return response;
            } catch (e) {
                // 请求失败
                postEvent('http_error', url, { error: e.message });
                throw e;
            }
        };

        console.log(`[${TAG}] fetch hook installed`);
    }

    // ========== XHR Hook ==========

    /**
     * Hook XMLHttpRequest
     */
    function hookXHR() {
        const OriginalXHR = window.XMLHttpRequest;
        if (!OriginalXHR) {
            console.warn(`[${TAG}] XMLHttpRequest not available`);
            return;
        }

        /**
         * XHR 代理类
         */
        function HookedXHR() {
            const xhr = new OriginalXHR();
            let requestUrl = '';
            let requestMethod = '';

            // hook open 方法
            const originalOpen = xhr.open;
            xhr.open = function(method, url) {
                requestMethod = method;
                requestUrl = url;
                return originalOpen.apply(this, arguments);
            };

            // hook send 方法
            const originalSend = xhr.send;
            xhr.send = function(data) {
                // 发送请求事件
                if (requestUrl) {
                    postEvent('http_request', requestUrl, {
                        method: requestMethod,
                        body: data
                    });
                }

                return originalSend.apply(this, arguments);
            };

            // 监听响应
            xhr.addEventListener('load', function() {
                if (requestUrl) {
                    const body = xhr.responseText || '[unreadable]';
                    const truncatedBody = body.length > MAX_BODY_SIZE ? '[too large]' : body;

                    postEvent('http_response', requestUrl, {
                        status: xhr.status,
                        headers: {}, // XHR 不提供响应头访问
                        body: truncatedBody
                    });
                }
            });

            // 监听错误
            xhr.addEventListener('error', function() {
                if (requestUrl) {
                    postEvent('http_error', requestUrl, { error: 'XHR error' });
                }
            });

            return xhr;
        }

        // 保持原型链
        HookedXHR.prototype = OriginalXHR.prototype;

        // 替换全局 XMLHttpRequest
        try {
            window.XMLHttpRequest = HookedXHR;
            console.log(`[${TAG}] XHR hook installed`);
        } catch (e) {
            console.error(`[${TAG}] Failed to replace XMLHttpRequest:`, e);
        }
    }

    // ========== 初始化 ==========

    /**
     * 初始化 HTTP hook
     */
    function init() {
        hookFetch();
        hookXHR();
        console.log(`[${TAG}] HTTP hook initialized`);
    }

    // 立即执行
    init();

})();

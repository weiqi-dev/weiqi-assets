/**
 * Android 状态栏适配（edge-to-edge 模式下内容避开状态栏）
 *
 * 由 Android 原生侧通过 JS 注入 onStatusBarHeightChange 和 onKeyboardHeightChange 调用。
 * 自动检测页面中的 header 元素并调整 padding-top / top。
 *
 * 页面只需引入此脚本即可，无需额外代码。
 */
(function() {
  // 状态栏高度（CSS px），由原生注入
  var statusBarHeight = 0;

  // 检测页面中的 header 元素类型
  var wechatHeader = document.querySelector('.wechat-header');
  var glassHeader = document.querySelector('.glass-header');
  var pageHeader = document.querySelector('.page-header');
  var chatContainer = document.querySelector('.chat-container');
  var inputContainer = document.querySelector('.input-container');

  var HEADER_HEIGHT = 44;     // assistant 页面 wechat-header 原始高度
  var INPUT_BAR_HEIGHT = 50;  // assistant 页面 chat-container 的 bottom 值
  var GLASS_PADDING_TOP = 24; // glass-header 原始 padding-top
  var PAGE_PADDING_TOP = 12;  // page-header 原始 padding-top

  function applyStatusBarHeight() {
    if (statusBarHeight <= 0) return;

    // assistant 页面：fixed 定位的 header 和 chat-container
    if (wechatHeader) {
      wechatHeader.style.paddingTop = statusBarHeight + 'px';
      wechatHeader.style.height = (HEADER_HEIGHT + statusBarHeight) + 'px';
    }
    if (chatContainer && wechatHeader) {
      chatContainer.style.top = (HEADER_HEIGHT + statusBarHeight) + 'px';
    }

    // home / play 页面：流式布局的 glass-header
    if (glassHeader && !wechatHeader) {
      glassHeader.style.paddingTop = (GLASS_PADDING_TOP + statusBarHeight) + 'px';
    }

    // replay / review 页面：sticky 定位的 page-header
    if (pageHeader) {
      pageHeader.style.paddingTop = (PAGE_PADDING_TOP + statusBarHeight) + 'px';
    }
  }

  function resetStatusBarHeight() {
    if (wechatHeader) {
      wechatHeader.style.paddingTop = '';
      wechatHeader.style.height = '';
    }
    if (chatContainer && wechatHeader) {
      chatContainer.style.top = HEADER_HEIGHT + 'px';
    }
    if (glassHeader && !wechatHeader) {
      glassHeader.style.paddingTop = '';
    }
    if (pageHeader) {
      pageHeader.style.paddingTop = '';
    }
  }

  // ===== 状态栏高度回调 =====
  window.onStatusBarHeightChange = function(height) {
    if (height !== statusBarHeight) {
      statusBarHeight = height;
      if (height > 0) {
        applyStatusBarHeight();
      } else {
        resetStatusBarHeight();
      }
    }
  };

  // ===== 键盘高度回调 =====
  window.onKeyboardHeightChange = function(keyboardHeight) {
    if (!inputContainer || !chatContainer) return;

    if (keyboardHeight > 0) {
      inputContainer.style.bottom = keyboardHeight + 'px';
      chatContainer.style.bottom = (INPUT_BAR_HEIGHT + keyboardHeight) + 'px';
    } else {
      inputContainer.style.bottom = '0';
      chatContainer.style.bottom = INPUT_BAR_HEIGHT + 'px';
    }

    // 延迟滚动到底部，等布局稳定
    setTimeout(function() {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
  };

  // ===== 浏览器环境降级：用 visualViewport 检测键盘 =====
  if (window.visualViewport && !window.__weiqi_native) {
    window.visualViewport.addEventListener('resize', function() {
      var vv = window.visualViewport;
      var kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      window.onKeyboardHeightChange(kb);
    });
  }
})();

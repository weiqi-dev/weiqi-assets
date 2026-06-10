import"../modulepreload-polyfill-BVSDYCMZ.js";/* empty css               */import{c as e}from"../FavoriteService-C9LkU7xv.js";import{t}from"../Bootstrap-DoB1Ytpd.js";function n(e){return new Date(e).toLocaleTimeString(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1})}function r(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(2)} KB`:e<1024*1024*1024?`${(e/(1024*1024)).toFixed(2)} MB`:`${(e/(1024*1024*1024)).toFixed(2)} GB`}function i(e){switch(e){case`ERROR`:return`#f44`;case`WARN`:return`#f80`;case`INFO`:return`#08f`;case`DEBUG`:return`#888`;default:return`#fff`}}function a(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}var o=class{render(e,t){return`
      <div class="glass-card" style="padding: 12px;">
        <div style="margin-bottom: 12px;">
          <strong>日志统计：</strong>
          总计 ${t.total} 条 |
          <span style="color: #f44;">ERROR ${t.error}</span> |
          <span style="color: #f80;">WARN ${t.warn}</span> |
          <span style="color: #08f;">INFO ${t.info}</span> |
          <span style="color: #888;">DEBUG ${t.debug}</span>
        </div>
        <div style="margin-bottom: 12px;">
          <button class="glass-btn" id="clear-logs">清空日志</button>
        </div>
        <div class="log-list" style="max-height: 400px; overflow-y: auto;">
          ${this.renderLogList(e)}
        </div>
      </div>
    `}renderLogList(e){return e.length===0?`<div style="color: #888; text-align: center; padding: 20px;">暂无日志</div>`:e.map(e=>`
      <div class="log-entry ${e.level.toLowerCase()}" style="padding: 8px; margin-bottom: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 12px;">
        <div style="display: flex; gap: 8px; margin-bottom: 4px;">
          <span style="color: #aaa;">${n(e.timestamp)}</span>
          <span style="color: ${i(e.level)}; font-weight: bold;">${e.level}</span>
          <span style="color: #08f;">[${e.tag}]</span>
        </div>
        <div style="word-break: break-all;">${a(e.message)}</div>
      </div>
    `).join(``)}},s=class{render(e){return`
      <div class="glass-card" style="padding: 12px;">
        <h3 style="margin-bottom: 12px;">存储统计</h3>
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px;">
            <strong>缓存：</strong>${e.cache.formatted}
          </div>
          <div style="margin-bottom: 8px;">
            <strong>内部存储：</strong>${e.internal.formatted}
          </div>
          <div style="margin-bottom: 8px;">
            <strong>总计：</strong>${e.total.formatted}
          </div>
        </div>
        <button class="glass-btn" id="clear-cache">清空缓存</button>
      </div>
    `}},c=class{render(e){return`
      <div class="glass-card" style="padding: 12px;">
        <h3 style="margin-bottom: 12px;">内存信息</h3>
        <div style="margin-bottom: 8px;">
          <strong>最大内存：</strong>${r(e.max)}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>总内存：</strong>${r(e.total)}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>已用：</strong>${r(e.used)}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>空闲：</strong>${r(e.free)}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>使用率：</strong>${e.usagePercent}%
        </div>
        <div style="background: rgba(255,255,255,0.1); border-radius: 4px; height: 20px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #4CAF50, #FFC107, #F44336); height: 100%; width: ${e.usagePercent}%;"></div>
        </div>
      </div>
    `}},l=class{render(e){return`
      <div class="glass-card" style="padding: 12px;">
        <h3 style="margin-bottom: 12px;">WebSocket 抓包</h3>
        
        <!-- 启动抓包 -->
        <div style="margin-bottom: 16px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;">
          <div style="margin-bottom: 8px; font-weight: bold;">启动新抓包</div>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <select id="sniffer-target-type" class="glass-input" style="flex: 1; padding: 8px;">
              <option value="game">对局</option>
              <option value="room">房间</option>
              <option value="player">玩家</option>
            </select>
            <input type="text" id="sniffer-target-id" class="glass-input" placeholder="目标ID" style="flex: 2; padding: 8px;">
          </div>
          <button class="glass-btn" id="start-sniffer" style="width: 100%;">🚀 启动抓包</button>
        </div>
        
        <!-- 运行中的会话 -->
        <div style="margin-bottom: 8px; font-weight: bold;">运行中的会话</div>
        ${this.renderSessionList(e)}
      </div>
    `}renderSessionList(e){return e.length===0?`<div style="color: #888; padding: 12px; text-align: center;">暂无运行中的会话</div>`:e.map(e=>`
      <div style="padding: 12px; margin-bottom: 8px; background: rgba(255,255,255,0.1); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-family: monospace; color: #4CAF50;">${e}</div>
            <div style="color: #888; font-size: 12px;">运行中</div>
          </div>
          <button class="glass-btn" data-sniffer-id="${e}" style="background: rgba(244,67,54,0.3);">⏹ 停止</button>
        </div>
      </div>
    `).join(``)}},u=class{constructor(){e(this,`logRenderer`,new o),e(this,`storageRenderer`,new s),e(this,`perfRenderer`,new c),e(this,`snifferRenderer`,new l)}renderShell(){let e=document.getElementById(`page-root`);e&&(e.innerHTML=`
      <div class="debug-tabs glass-card" style="padding: 12px; margin-bottom: 16px;">
        <button class="debug-tab glass-btn active" data-tab="logs">📋 日志</button>
        <button class="debug-tab glass-btn" data-tab="storage">💾 存储</button>
        <button class="debug-tab glass-btn" data-tab="performance">⚡ 性能</button>
        <button class="debug-tab glass-btn" data-tab="sniffer">🔍 抓包</button>
      </div>
      <div id="debug-content"></div>
    `)}renderAppInfo(e){let t=document.querySelector(`.glass-subtitle`);t&&(t.textContent=`${e.version} | ${e.model} | ${e.os}`)}renderLogs(e,t){let n=document.getElementById(`debug-content`);n&&(n.innerHTML=this.logRenderer.render(e,t))}renderStorage(e){let t=document.getElementById(`debug-content`);t&&(t.innerHTML=this.storageRenderer.render(e))}renderPerformance(e){let t=document.getElementById(`debug-content`);t&&(t.innerHTML=this.perfRenderer.render(e))}renderSniffer(e){let t=document.getElementById(`debug-content`);t&&(t.innerHTML=this.snifferRenderer.render(e))}},d=class{constructor(t){e(this,`config`,void 0),e(this,`renderer`,void 0),e(this,`currentTab`,`logs`),this.config=t,this.renderer=new u}async initialize(){var e=this;await e.loadAppInfo(),e.bindEvents()}render(){this.renderer.renderShell(),this.switchTab(`logs`)}async loadAppInfo(){var e=this;let t=await e.config.debugService.getAppInfo();e.renderer.renderAppInfo(t)}bindEvents(){document.querySelectorAll(`.debug-tab`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.tab;this.switchTab(t)})})}async switchTab(e){var t=this,n;switch(t.currentTab=e,document.querySelectorAll(`.debug-tab`).forEach(e=>e.classList.remove(`active`)),(n=document.querySelector(`[data-tab="${e}"]`))==null||n.classList.add(`active`),e){case`logs`:await t.loadLogs();break;case`storage`:await t.loadStorage();break;case`performance`:await t.loadPerformance();break;case`sniffer`:await t.loadSniffer();break}}async loadLogs(){var e=this,t;let n=await e.config.debugService.getLogs({limit:100}),r=await e.config.debugService.getLogStats();e.renderer.renderLogs(n,r),(t=document.getElementById(`clear-logs`))==null||t.addEventListener(`click`,async()=>{await e.config.debugService.clearLogs(),await e.loadLogs()})}async loadStorage(){var e=this,t;let n=await e.config.debugService.getStorageStats();e.renderer.renderStorage(n),(t=document.getElementById(`clear-cache`))==null||t.addEventListener(`click`,async()=>{await e.config.debugService.clearCache(),await e.loadStorage()})}async loadPerformance(){var e=this;let t=await e.config.debugService.getMemoryInfo();e.renderer.renderPerformance(t)}async loadSniffer(){var e=this,t;let n=await e.config.debugService.getRunningSnifferSessions();e.renderer.renderSniffer(n),(t=document.getElementById(`start-sniffer`))==null||t.addEventListener(`click`,async()=>{var t,n;let r=(t=document.getElementById(`sniffer-target-type`))==null?void 0:t.value,i=(n=document.getElementById(`sniffer-target-id`))==null?void 0:n.value;if(!i){alert(`请输入目标ID`);return}let a=await e.config.debugService.startSniffer(r,i);a.success?(e.config.logger.info(`抓包已启动: ${a.id}`),await e.loadSniffer()):alert(`启动失败: ${a.error}`)}),document.querySelectorAll(`[data-sniffer-id]`).forEach(t=>{t.addEventListener(`click`,async t=>{let n=t.currentTarget.dataset.snifferId;if(n){let t=await e.config.debugService.stopSniffer(n);t.success?(e.config.logger.info(`抓包已停止: ${n}, 消息数: ${t.messagesCount}`),await e.loadSniffer()):alert(`停止失败: ${t.error}`)}})})}},f=class{getLogs(){return DebugBridge.getLogs()}clearLogs(){DebugBridge.clearLogs()}getFilesDir(){return DebugBridge.getFilesDir()}getCacheDir(){return DebugBridge.getCacheDir()}getFileSize(e){return DebugBridge.getFileSize(e)}listFiles(e){return DebugBridge.listFiles(e)}deleteFile(e){return DebugBridge.deleteFile(e)}getMaxMemory(){return DebugBridge.getMaxMemory()}getTotalMemory(){return DebugBridge.getTotalMemory()}getFreeMemory(){return DebugBridge.getFreeMemory()}getCurrentTime(){return DebugBridge.getCurrentTime()}getRunningSnifferSessions(){return DebugBridge.getRunningSnifferSessions()}startSniffer(e,t){return DebugBridge.startSniffer(e,t)}stopSniffer(e){return DebugBridge.stopSniffer(e)}getSnifferStatus(e){return DebugBridge.getSnifferStatus(e)}getAppVersion(){return DebugBridge.getAppVersion()}getDeviceModel(){return DebugBridge.getDeviceModel()}getAndroidVersion(){return DebugBridge.getAndroidVersion()}},p=class{constructor(){e(this,`logs`,[])}getLogs(){return JSON.stringify(this.logs)}clearLogs(){this.logs=[]}getFilesDir(){return`localStorage`}getCacheDir(){return`sessionStorage`}getFileSize(e){return JSON.stringify(localStorage).length}listFiles(e){let t=Object.keys(localStorage);return JSON.stringify(t.map(e=>{var t;return{name:e,path:e,isDirectory:!1,size:((t=localStorage.getItem(e))==null?void 0:t.length)||0,lastModified:Date.now()}}))}deleteFile(e){return e===`localStorage`?(localStorage.clear(),!0):(localStorage.removeItem(e),!0)}getMaxMemory(){var e;return((e=performance.memory)==null?void 0:e.jsHeapSizeLimit)||512*1024*1024}getTotalMemory(){var e;return((e=performance.memory)==null?void 0:e.totalJSHeapSize)||50*1024*1024}getFreeMemory(){let e=performance.memory;return e?e.totalJSHeapSize-e.usedJSHeapSize:40*1024*1024}getCurrentTime(){return Date.now()}getRunningSnifferSessions(){return`[]`}startSniffer(e,t){return JSON.stringify({success:!1,error:`Web platform does not support sniffer`})}stopSniffer(e){return JSON.stringify({success:!1,error:`Web platform does not support sniffer`})}getSnifferStatus(e){return JSON.stringify({error:`Web platform does not support sniffer`})}getAppVersion(){return`web`}getDeviceModel(){return navigator.userAgent}getAndroidVersion(){return`web`}};function m(){return window.DebugBridge===void 0?new p:new f}var h=class{constructor(){e(this,`adapter`,void 0),this.adapter=m()}async getLogs(e){let t=this.adapter.getLogs(),n=JSON.parse(t).map(e=>{let[t,n,r,...i]=e.split(`|`);return{timestamp:parseInt(t),level:n,tag:r||``,message:i.join(`|`)}});return e!=null&&e.level&&(n=n.filter(t=>t.level===e.level)),e!=null&&e.tag&&(n=n.filter(t=>t.tag.includes(e.tag))),e!=null&&e.limit&&(n=n.slice(-e.limit)),n}async clearLogs(){this.adapter.clearLogs()}async getLogStats(){let e=await this.getLogs();return{total:e.length,error:e.filter(e=>e.level===`ERROR`).length,warn:e.filter(e=>e.level===`WARN`).length,info:e.filter(e=>e.level===`INFO`).length,debug:e.filter(e=>e.level===`DEBUG`).length}}async getStorageStats(){var e=this;let t=e.adapter.getCacheDir(),n=e.adapter.getFilesDir(),r=e.adapter.getFileSize(t),i=e.adapter.getFileSize(n);return{cache:{size:r,formatted:e.formatSize(r)},internal:{size:i,formatted:e.formatSize(i)},total:{size:r+i,formatted:e.formatSize(r+i)}}}async listFiles(e){let t=this.adapter.listFiles(e);return JSON.parse(t)}async deleteFile(e){return this.adapter.deleteFile(e)}async clearCache(){var e=this;let t=e.adapter.getCacheDir();return e.adapter.deleteFile(t)}async getMemoryInfo(){var e=this;let t=e.adapter.getMaxMemory(),n=e.adapter.getTotalMemory(),r=e.adapter.getFreeMemory(),i=n-r;return{max:t,total:n,free:r,used:i,usagePercent:Math.round(i/t*100)}}async getAppInfo(){var e=this;let t=window.DebugBridge===void 0?`web`:`android`;return{version:e.adapter.getAppVersion(),model:e.adapter.getDeviceModel(),os:e.adapter.getAndroidVersion(),platform:t}}async getRunningSnifferSessions(){let e=this.adapter.getRunningSnifferSessions();return JSON.parse(e)}async startSniffer(e,t){let n=this.adapter.startSniffer(e,t);return JSON.parse(n)}async stopSniffer(e){let t=this.adapter.stopSniffer(e);return JSON.parse(t)}async getSnifferStatus(e){let t=this.adapter.getSnifferStatus(e);return JSON.parse(t)}formatSize(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(2)} KB`:e<1024*1024*1024?`${(e/(1024*1024)).toFixed(2)} MB`:`${(e/(1024*1024*1024)).toFixed(2)} GB`}};async function g(){let e=await t.init({containerId:`page-root`}),n=new d({debugService:new h,logger:e.logger});await n.initialize(),n.render(),e.logger.info(`DebugPage 已启动`)}g().catch(console.error);
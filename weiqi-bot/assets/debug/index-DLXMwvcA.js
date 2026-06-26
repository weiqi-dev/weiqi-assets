import"../modulepreload-polyfill-BVSDYCMZ.js";/* empty css               */import{r as e,t}from"../Bootstrap-DN4fuqQs.js";import{o as n}from"../FavoriteService-D-_Lo8Jb.js";import{t as r}from"../Dialog-CoWYHROc.js";/* empty css            */var i=class{getLogs(){return prompt(`debug:getLogs`,``)||`[]`}clearLogs(){prompt(`debug:clearLogs`,``)}getFilesDir(){return prompt(`debug:getFilesDir`,``)||``}getCacheDir(){return prompt(`debug:getCacheDir`,``)||``}getFileSize(e){let t=prompt(`debug:getFileSize`,e);return t?parseInt(t):0}listFiles(e){return prompt(`debug:listFiles`,e)||`[]`}deleteFile(e){return prompt(`debug:deleteFile`,e)===`true`}getMaxMemory(){let e=prompt(`debug:getMaxMemory`,``);return e?parseInt(e):0}getTotalMemory(){let e=prompt(`debug:getTotalMemory`,``);return e?parseInt(e):0}getFreeMemory(){let e=prompt(`debug:getFreeMemory`,``);return e?parseInt(e):0}getCurrentTime(){let e=prompt(`debug:getCurrentTime`,``);return e?parseInt(e):0}getRunningSnifferSessions(){return prompt(`debug:getRunningSnifferSessions`,``)||`[]`}getAppVersion(){return prompt(`debug:getAppVersion`,``)||`unknown`}getDeviceModel(){return prompt(`debug:getDeviceModel`,``)||`unknown`}getAndroidVersion(){return prompt(`debug:getAndroidVersion`,``)||`unknown`}};function a(){return navigator.userAgent.includes(`WeiqiApp`)?new i:new e}var o=class{constructor(){n(this,`adapter`,void 0),this.adapter=a()}async getLogs(e){let t=await this.adapter.getLogs()||`[]`,n=JSON.parse(t).map(e=>{let[t,n,r,...i]=e.split(`|`);return{timestamp:parseInt(t==null?`0`:t),level:n==null?`INFO`:n,tag:r==null?``:r,message:i.join(`|`)}});return e!=null&&e.level&&(n=n.filter(t=>t.level===e.level)),e!=null&&e.tag&&(n=n.filter(t=>{var n;return t.tag.includes((n=e.tag)==null?``:n)})),e!=null&&e.limit&&(n=n.slice(-e.limit)),n}async clearLogs(){this.adapter.clearLogs()}async getLogStats(){let e=await this.getLogs();return{total:e.length,error:e.filter(e=>e.level===`ERROR`).length,warn:e.filter(e=>e.level===`WARN`).length,info:e.filter(e=>e.level===`INFO`).length,debug:e.filter(e=>e.level===`DEBUG`).length}}async getStorageStats(){var e=this;let t=e.adapter.getCacheDir()||``,n=e.adapter.getFilesDir()||``,r=e.adapter.getFileSize(t),i=e.adapter.getFileSize(n);return{cache:{size:r,formatted:e.formatSize(r)},internal:{size:i,formatted:e.formatSize(i)},total:{size:r+i,formatted:e.formatSize(r+i)}}}async listFiles(e){let t=this.adapter.listFiles(e);return JSON.parse(t)}async deleteFile(e){return this.adapter.deleteFile(e)}async clearCache(){var e=this;let t=e.adapter.getCacheDir();return e.adapter.deleteFile(t)}async getMemoryInfo(){var e=this;let t=e.adapter.getMaxMemory(),n=e.adapter.getTotalMemory(),r=e.adapter.getFreeMemory(),i=n-r;return{max:t,total:n,free:r,used:i,usagePercent:Math.round(i/t*100)}}async getAppInfo(){var e=this;let t=window.DebugBridge===void 0?`web`:`android`;return{version:e.adapter.getAppVersion(),model:e.adapter.getDeviceModel(),os:e.adapter.getAndroidVersion(),platform:t}}async getRunningSnifferSessions(){let e=this.adapter.getRunningSnifferSessions();return JSON.parse(e)}formatSize(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(2)} KB`:e<1024*1024*1024?`${(e/(1024*1024)).toFixed(2)} MB`:`${(e/(1024*1024*1024)).toFixed(2)} GB`}};async function s(){await t.init({containerId:`page-root`}),await c(new o),console.info(`日志页面已启动`)}async function c(e,t){var n,i,a;let o=document.getElementById(`page-root`);if(!o)return;let s=await e.getLogs({limit:200}),f=await e.getLogStats(),p=l(s,t);o.innerHTML=`
    <div class="log-panel">
      <div class="log-header">
        <div class="log-header-left">
          <span class="log-count">共 ${f.total} 条${t?`（显示 ${p.length} 条）`:``}</span>
        </div>
        <div class="log-header-controls">
          <button class="icon-btn" id="filter-btn" title="筛选">🔍</button>
          <button class="icon-btn" id="refresh-btn" title="刷新">🔄</button>
          <button class="icon-btn" id="clear-btn" title="清空">🗑️</button>
        </div>
      </div>
      <div class="log-list" id="log-list">
        ${d(p)}
      </div>
    </div>
  `;let m=document.getElementById(`log-list`);m&&(m.scrollTop=m.scrollHeight),(n=document.getElementById(`filter-btn`))==null||n.addEventListener(`click`,async()=>{await u(e,t)}),(i=document.getElementById(`refresh-btn`))==null||i.addEventListener(`click`,async()=>{await c(e,t)}),(a=document.getElementById(`clear-btn`))==null||a.addEventListener(`click`,async()=>{await r.confirm(`确定要清空所有日志吗？`)&&(await e.clearLogs(),await c(e,t))})}function l(e,t){if(!t)return e;let n=e;if(t.levels&&t.levels.length>0&&(n=n.filter(e=>t.levels.includes(e.level))),t.keyword&&t.keyword.trim()){let e=t.keyword.trim().toLowerCase();n=n.filter(t=>t.tag.toLowerCase().includes(e)||t.message.toLowerCase().includes(e))}return n}async function u(e,t){let n=document.createElement(`div`);n.className=`dialog-overlay`;let r=document.createElement(`div`);r.className=`dialog filter-dialog`,r.setAttribute(`role`,`dialog`),r.setAttribute(`aria-modal`,`true`);let i=[`ERROR`,`WARN`,`INFO`,`DEBUG`],a=(t==null?void 0:t.levels)||[];r.innerHTML=`
    <div class="dialog-title">筛选日志</div>
    <div class="dialog-content">
      <div class="filter-section">
        <label class="filter-label">日志级别：</label>
        <div class="filter-levels">
          ${i.map(e=>`
            <label class="filter-checkbox">
              <input type="checkbox" value="${e}" ${a.includes(e)?`checked`:``}>
              <span class="filter-checkbox-label">${e}</span>
            </label>
          `).join(``)}
        </div>
      </div>
      <div class="filter-section">
        <label class="filter-label">关键字：</label>
        <input type="text" class="filter-input" id="filter-keyword" 
               placeholder="输入标签或消息关键字" 
               value="${(t==null?void 0:t.keyword)||``}">
      </div>
    </div>
    <div class="dialog-btn-group">
      <button class="dialog-btn secondary" id="filter-reset">重置</button>
      <button class="dialog-btn secondary" id="filter-cancel">取消</button>
      <button class="dialog-btn primary" id="filter-ok">确定</button>
    </div>
  `,n.appendChild(r),document.body.appendChild(n),n.offsetWidth,n.classList.add(`show`);let o=r.querySelector(`#filter-keyword`),s=r.querySelectorAll(`input[type="checkbox"]`),l=r.querySelector(`#filter-ok`),u=r.querySelector(`#filter-cancel`),d=r.querySelector(`#filter-reset`),f=()=>{n.classList.remove(`show`),n.parentNode&&n.parentNode.removeChild(n)},p=()=>{let e=[];s.forEach(t=>{t.checked&&e.push(t.value)});let t=o.value.trim();return{levels:e.length>0?e:void 0,keyword:t||void 0}};l.addEventListener(`click`,async()=>{f(),await c(e,p())}),u.addEventListener(`click`,()=>{f()}),d.addEventListener(`click`,()=>{s.forEach(e=>e.checked=!1),o.value=``}),n.addEventListener(`click`,e=>{e.target===n&&f()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.preventDefault(),f())}),o.focus()}function d(e){return e.length===0?`<div class="log-empty">暂无日志</div>`:e.map(e=>`
    <div class="log-entry ${e.level.toLowerCase()}">
      <span class="log-time">${f(e.timestamp)}</span>
      <span class="log-level ${e.level.toLowerCase()}">[${e.level}]</span>
      <span class="log-tag">[${e.tag}]</span>
      <span class="log-message">${p(e.message)}</span>
    </div>
  `).join(``)}function f(e){return new Date(e).toLocaleTimeString(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1})}function p(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}s().catch(console.error);
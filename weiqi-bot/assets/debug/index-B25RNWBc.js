import"../modulepreload-polyfill-eJgYjmQ8.js";/* empty css               */import{t as e}from"../Bootstrap-BcQY7aaR.js";import{t}from"../Dialog-Dn-0dzuF.js";import{t as n}from"../WebFileExporter-BzM1F-Cv.js";/* empty css            */import{t as r}from"../DebugService-3NWuKw_7.js";async function i(){await e.init({containerId:`page-root`}),await a(new r),console.info(`日志页面已启动`)}async function a(e,n){var r,i,l,u;let f=document.getElementById(`page-root`);if(!f)return;let p=await e.getLogs({limit:200}),m=await e.getLogStats(),h=o(p,n);f.innerHTML=`
    <div class="log-panel">
      <div class="log-header">
        <div class="log-header-left">
          <span class="log-count">共 ${m.total} 条${n?`（显示 ${h.length} 条）`:``}</span>
        </div>
        <div class="log-header-controls">
          <button class="icon-btn" id="export-btn" title="导出">📤</button>
          <button class="icon-btn" id="filter-btn" title="筛选">🔍</button>
          <button class="icon-btn" id="refresh-btn" title="刷新">🔄</button>
          <button class="icon-btn" id="clear-btn" title="清空">🗑️</button>
        </div>
      </div>
      <div class="log-list" id="log-list">
        ${c(h)}
      </div>
    </div>
  `;let g=document.getElementById(`log-list`);g&&(g.scrollTop=g.scrollHeight),(r=document.getElementById(`export-btn`))==null||r.addEventListener(`click`,async()=>{await d(e,p)}),(i=document.getElementById(`filter-btn`))==null||i.addEventListener(`click`,async()=>{await s(e,n)}),(l=document.getElementById(`refresh-btn`))==null||l.addEventListener(`click`,async()=>{await a(e,n)}),(u=document.getElementById(`clear-btn`))==null||u.addEventListener(`click`,async()=>{await t.confirm(`确定要清空所有日志吗？`)&&(await e.clearLogs(),await a(e,n))})}function o(e,t){if(!t)return e;let n=e;if(t.levels&&t.levels.length>0&&(n=n.filter(e=>t.levels.includes(e.level))),t.keyword&&t.keyword.trim()){let e=t.keyword.trim().toLowerCase();n=n.filter(t=>t.tag.toLowerCase().includes(e)||t.message.toLowerCase().includes(e))}return n}async function s(e,t){let n=document.createElement(`div`);n.className=`dialog-overlay`;let r=document.createElement(`div`);r.className=`dialog filter-dialog`,r.setAttribute(`role`,`dialog`),r.setAttribute(`aria-modal`,`true`);let i=[`ERROR`,`WARN`,`INFO`,`DEBUG`],o=(t==null?void 0:t.levels)||[];r.innerHTML=`
    <div class="dialog-title">筛选日志</div>
    <div class="dialog-content">
      <div class="filter-section">
        <label class="filter-label">日志级别：</label>
        <div class="filter-levels">
          ${i.map(e=>`
            <label class="filter-checkbox">
              <input type="checkbox" value="${e}" ${o.includes(e)?`checked`:``}>
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
  `,n.appendChild(r),document.body.appendChild(n),n.offsetWidth,n.classList.add(`show`);let s=r.querySelector(`#filter-keyword`),c=r.querySelectorAll(`input[type="checkbox"]`),l=r.querySelector(`#filter-ok`),u=r.querySelector(`#filter-cancel`),d=r.querySelector(`#filter-reset`),f=()=>{n.classList.remove(`show`),n.parentNode&&n.parentNode.removeChild(n)},p=()=>{let e=[];c.forEach(t=>{t.checked&&e.push(t.value)});let t=s.value.trim();return{levels:e.length>0?e:void 0,keyword:t||void 0}};l.addEventListener(`click`,async()=>{f(),await a(e,p())}),u.addEventListener(`click`,()=>{f()}),d.addEventListener(`click`,()=>{c.forEach(e=>e.checked=!1),s.value=``}),n.addEventListener(`click`,e=>{e.target===n&&f()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.preventDefault(),f())}),s.focus()}function c(e){return e.length===0?`<div class="log-empty">暂无日志</div>`:e.map(e=>`
    <div class="log-entry ${e.level.toLowerCase()}">
      <span class="log-time">${l(e.timestamp)}</span>
      <span class="log-level ${e.level.toLowerCase()}">[${e.level}]</span>
      <span class="log-tag">[${e.tag}]</span>
      <span class="log-message">${u(e.message)}</span>
    </div>
  `).join(``)}function l(e){return new Date(e).toLocaleTimeString(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1})}function u(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}async function d(e,r){try{let r=await e.getLogs({limit:1e4});if(r.length===0){await t.alert(`暂无日志可导出`);return}let i={exportTime:new Date().toISOString(),totalLogs:r.length,logs:r.map(e=>({timestamp:e.timestamp,time:new Date(e.timestamp).toISOString(),level:e.level,tag:e.tag,message:e.message}))},a=new n,o=`debug_logs_${f()}.json`,s=await a.exportJSON(i,o);s.success?await t.alert(`📤 导出文件已生成\n\n文件：${o}\n日志数量：${r.length} 条\n\n请在浏览器下载列表或文件管理器中查看`):await t.alert(`导出失败：${s.error||`未知错误`}`)}catch(e){console.error(`[exportLogs] 导出失败:`,e),await t.alert(`导出失败：${e instanceof Error?e.message:`未知错误`}`)}}function f(){return new Date().toISOString().split(`T`)[0]}i().catch(console.error);
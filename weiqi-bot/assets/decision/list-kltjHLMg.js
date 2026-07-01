import"../modulepreload-polyfill-eJgYjmQ8.js";/* empty css               */import{t as e}from"../Bootstrap-EN9Lm0lR.js";function t(e,t){let n=t.gameGroups;if(Array.isArray(n)&&n.length>0)return n;let r=new Map;return e.forEach((e,t)=>{let n=e.metadata||{},i=n.gameId||`${n.playerBlack||`黑棋`}-${n.playerWhite||`白棋`}`,a=r.get(i);a||(a={gameId:i,archiveId:n.archiveId,black:n.playerBlack,white:n.playerWhite,blackRank:n.blackRank,whiteRank:n.whiteRank,gameName:n.gameName,event:n.event,result:n.result,date:n.date,gameLevel:n.gameLevel,problemsCount:0,phaseStats:{layout:0,middle:0,endgame:0},problemIndexes:[]},r.set(i,a)),a.problemsCount++,a.problemIndexes.push(t);let o=e.phase;o in a.phaseStats&&a.phaseStats[o]++}),Array.from(r.values())}function n(e){return String(e==null?``:e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function r(e){return n(e)}function i(e){return e===`foxwq`?`野狐`:e}function a(e){return{pro:`职业`,high:`高段`,normal:`普通`}[e]||`普通`}function o(e){return e?e.replace(/^B\+R$/i,`黑中盘胜`).replace(/^W\+R$/i,`白中盘胜`).replace(/^B\+([\d.]+)$/i,`黑胜$1目`).replace(/^W\+([\d.]+)$/i,`白胜$1目`):``}function s(e){let t=document.getElementById(`problem-list`),r=document.getElementById(`subtitle`);r&&(r.textContent=`加载失败`),t&&(t.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <div>${n(e)}</div>
      </div>
    `)}function c(e,n,r){let a=document.getElementById(`problem-list`);if(!a)return;if(e.length===0){a.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <div>暂无题目</div>
      </div>
    `;return}let o=t(e,r),s=i(String(r.source||`foxwq`)),c=o.reduce((e,t)=>e+t.problemsCount,0);a.innerHTML=`
    <div class="source-group">
      <div class="source-header">
        <span>🏷️ ${s} (${o.length}份, ${c}题)</span>
        <div class="source-header-controls">
          <button class="icon-btn" id="clear-visited-btn" title="清除已读标记">👁️</button>
        </div>
      </div>
      <div class="quiz-list">
        ${o.map((e,t)=>l(e,n,t)).join(``)}
      </div>
    </div>
  `,a.querySelectorAll(`.quiz-card-wrapper`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e,r=parseInt(t.dataset.problemIndex||`0`,10),i=parseInt(t.dataset.groupIndex||`-1`,10),a=t.dataset.visitedKey;a&&localStorage.setItem(a,`1`);let o=i>=0?`&groupIndex=${i}`:``;window.location.href=`quiz.html?favoriteId=${encodeURIComponent(n)}&problemIndex=${r}${o}`})}),a.querySelectorAll(`.game-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.archiveId;n&&(window.location.href=`../replay/index.html?archiveId=${encodeURIComponent(n)}`)})});let u=document.getElementById(`clear-visited-btn`);u==null||u.addEventListener(`click`,()=>{let e=[];for(let t=0;t<localStorage.length;t++){let n=localStorage.key(t);n&&n.startsWith(`decision-visited:`)&&e.push(n)}e.forEach(e=>localStorage.removeItem(e)),a.querySelectorAll(`.quiz-card.visited`).forEach(e=>{e.classList.remove(`visited`)})})}function l(e,t,i){var s;let c=(s=e.problemIndexes[0])==null?0:s,l=e.black||`黑棋`,d=e.white||`白棋`,f=e.event||e.gameName||`${l} vs ${d}`,p=o(e.result||``),m=a(e.gameLevel||`normal`),h=u(e.phaseStats),g=`decision-visited:${t}:${e.gameId}`,_=localStorage.getItem(g)===`1`?` visited`:``;return`
    <div class="quiz-card-wrapper" data-problem-index="${c}" data-group-index="${i}" data-visited-key="${r(g)}">
      <div class="quiz-card${_}">
        <div class="quiz-header">
          <span class="players">
            <span class="stone-icon stone-black"></span>${n(l)}${e.blackRank?`<span class="rank">${n(e.blackRank)}</span>`:``}
            <span class="vs">vs</span>
            <span class="stone-icon stone-white"></span>${n(d)}${e.whiteRank?`<span class="rank">${n(e.whiteRank)}</span>`:``}
          </span>
        </div>
        <div class="event">${n(f)}</div>
        <div class="stats">
          <span class="count">${e.problemsCount}题</span>
          ${h}
          <span class="level" data-level="${m}">${m}</span>
        </div>
        <div class="quiz-footer">
          <span class="result">${n(p||`结果未知`)}</span>
          ${e.archiveId?`<span class="game-btn" data-archive-id="${r(e.archiveId)}">📖 棋谱</span>`:``}
        </div>
      </div>
    </div>
  `}function u(e){let t=[];return e.layout&&t.push(`<span class="phase">布局${e.layout}</span>`),e.middle&&t.push(`<span class="phase">中盘${e.middle}</span>`),e.endgame&&t.push(`<span class="phase">官子${e.endgame}</span>`),t.join(``)}async function d(){let t=(await e.init({containerId:`page-root`})).favoriteService,n=new URLSearchParams(window.location.search).get(`favoriteId`);if(!n){s(`缺少题目ID`);return}try{let e=await(t==null?void 0:t.getById(n));if(!e||!e.data){s(`题目不存在`);return}e.data.label,c(e.data.problems||[],n,e.data)}catch(e){console.error(`加载题目列表失败`,e instanceof Error?e:Error(String(e))),s(`加载失败`)}}d().catch(console.error);
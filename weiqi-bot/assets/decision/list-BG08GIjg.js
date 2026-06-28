import"../modulepreload-polyfill-eJgYjmQ8.js";/* empty css               */import{t as e}from"../Bootstrap-Af5DaOzM.js";import{t}from"../Dialog-DOx-cR2H.js";function n(e,t){let n=t.gameGroups;if(Array.isArray(n)&&n.length>0)return n;let r=new Map;return e.forEach((e,t)=>{let n=e.metadata||{},i=n.gameId||`${n.playerBlack||`黑棋`}-${n.playerWhite||`白棋`}`,a=r.get(i);a||(a={gameId:i,archiveId:n.archiveId,black:n.playerBlack,white:n.playerWhite,blackRank:n.blackRank,whiteRank:n.whiteRank,gameName:n.gameName,event:n.event,result:n.result,date:n.date,gameLevel:n.gameLevel,problemsCount:0,phaseStats:{layout:0,middle:0,endgame:0},problemIndexes:[]},r.set(i,a)),a.problemsCount++,a.problemIndexes.push(t);let o=e.phase;o in a.phaseStats&&a.phaseStats[o]++}),Array.from(r.values())}function r(e){return String(e==null?``:e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function i(e){return r(e)}function a(e){return e===`foxwq`?`野狐`:e}function o(e){return{pro:`职业`,high:`高段`,normal:`普通`}[e]||`普通`}function s(e){return e?e.replace(/^B\+R$/i,`黑中盘胜`).replace(/^W\+R$/i,`白中盘胜`).replace(/^B\+([\d.]+)$/i,`黑胜$1目`).replace(/^W\+([\d.]+)$/i,`白胜$1目`):``}function c(e){let t=document.getElementById(`problem-list`),n=document.getElementById(`subtitle`);n&&(n.textContent=`加载失败`),t&&(t.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <div>${r(e)}</div>
      </div>
    `)}function l(e,r,i){let o=document.getElementById(`problem-list`);if(!o)return;if(e.length===0){o.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <div>暂无题目</div>
      </div>
    `;return}let s=n(e,i),c=a(String(i.source||`foxwq`)),l=s.reduce((e,t)=>e+t.problemsCount,0);o.innerHTML=`
    <div class="source-group">
      <div class="source-header">
        <span>🏷️ ${c} (${s.length}份, ${l}题)</span>
        <div class="source-header-controls">
          <button class="icon-btn" id="clear-visited-btn" title="清除已读标记">👁️</button>
        </div>
      </div>
      <div class="quiz-list">
        ${s.map((e,t)=>u(e,r,t)).join(``)}
      </div>
    </div>
  `,o.querySelectorAll(`.quiz-card-wrapper`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e,n=parseInt(t.dataset.problemIndex||`0`,10),i=parseInt(t.dataset.groupIndex||`-1`,10),a=t.dataset.visitedKey;a&&localStorage.setItem(a,`1`);let o=i>=0?`&groupIndex=${i}`:``;window.location.href=`quiz.html?favoriteId=${encodeURIComponent(r)}&problemIndex=${n}${o}`})}),o.querySelectorAll(`.game-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.archiveId;n&&(window.location.href=`../replay/index.html?archiveId=${encodeURIComponent(n)}`)})});let d=document.getElementById(`clear-visited-btn`);if(d){let e=!1,n=async n=>{if(n.stopPropagation(),n.preventDefault(),e||(e=!0,setTimeout(()=>{e=!1},300),!await t.confirm(`确定要清除所有已读标记吗？`)))return;let r=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&t.startsWith(`decision-visited:`)&&r.push(t)}r.forEach(e=>localStorage.removeItem(e)),o.querySelectorAll(`.quiz-card.visited`).forEach(e=>{e.classList.remove(`visited`)})};d.addEventListener(`click`,n),d.addEventListener(`touchend`,n)}}function u(e,t,n){var a;let c=(a=e.problemIndexes[0])==null?0:a,l=e.black||`黑棋`,u=e.white||`白棋`,f=e.event||e.gameName||`${l} vs ${u}`,p=s(e.result||``),m=o(e.gameLevel||`normal`),h=d(e.phaseStats),g=`decision-visited:${t}:${e.gameId}`,_=localStorage.getItem(g)===`1`?` visited`:``;return`
    <div class="quiz-card-wrapper" data-problem-index="${c}" data-group-index="${n}" data-visited-key="${i(g)}">
      <div class="quiz-card${_}">
        <div class="quiz-header">
          <span class="players">
            <span class="stone-icon stone-black"></span>${r(l)}${e.blackRank?`<span class="rank">${r(e.blackRank)}</span>`:``}
            <span class="vs">vs</span>
            <span class="stone-icon stone-white"></span>${r(u)}${e.whiteRank?`<span class="rank">${r(e.whiteRank)}</span>`:``}
          </span>
        </div>
        <div class="event">${r(f)}</div>
        <div class="stats">
          <span class="count">${e.problemsCount}题</span>
          ${h}
          <span class="level" data-level="${m}">${m}</span>
        </div>
        <div class="quiz-footer">
          <span class="result">${r(p||`结果未知`)}</span>
          ${e.archiveId?`<span class="game-btn" data-archive-id="${i(e.archiveId)}">📖 棋谱</span>`:``}
        </div>
      </div>
    </div>
  `}function d(e){let t=[];return e.layout&&t.push(`<span class="phase">布局${e.layout}</span>`),e.middle&&t.push(`<span class="phase">中盘${e.middle}</span>`),e.endgame&&t.push(`<span class="phase">官子${e.endgame}</span>`),t.join(``)}async function f(){let t=(await e.init({containerId:`page-root`})).favoriteService,n=new URLSearchParams(window.location.search).get(`favoriteId`);if(!n){c(`缺少题目ID`);return}try{let e=await(t==null?void 0:t.getById(n));if(!e||!e.data){c(`题目不存在`);return}e.data.label,l(e.data.problems||[],n,e.data)}catch(e){console.error(`加载题目列表失败`,e instanceof Error?e:Error(String(e))),c(`加载失败`)}}f().catch(console.error);
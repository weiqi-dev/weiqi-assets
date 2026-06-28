const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./JosekiThumbnail-DbyXLPNA.js","./FavoriteService-Eyx8DXNW.js","./ai-BaI9_t5W.js","./Bootstrap-BYik4_Tu.js","./CaptureRule-CJL9mqSh.js","./IPlayer-Boh-mx0L.js"])))=>i.map(i=>d[i]);
import{a as e,o as t}from"./FavoriteService-Eyx8DXNW.js";import{t as n}from"./GameResult-CIpaxaCo.js";import{t as r}from"./adapters-C3SRJRCL.js";import{r as i}from"./JosekiThumbnail-DbyXLPNA.js";var a=class{get title(){return this._title}constructor(e){t(this,`_title`,`棋谱列表`),t(this,`readMarkService`,void 0),t(this,`category`,void 0),t(this,`providers`,void 0),t(this,`gameService`,void 0),t(this,`gameHistoryStorage`,void 0),t(this,`card`,void 0),t(this,`toast`,void 0),t(this,`games`,[]),t(this,`readMarkIds`,[]),t(this,`currentUserId`,void 0),t(this,`onNavigate`,void 0),t(this,`onClearReadMarks`,void 0),t(this,`customItemClick`,void 0),t(this,`initialized`,!1),this.readMarkService=e.readMarkService,this.category=e.category,this.providers=e.providers,this.gameService=e.gameService,this.gameHistoryStorage=e.gameHistoryStorage,this.onNavigate=e.onNavigate,this.onClearReadMarks=e.onClearReadMarks,this.customItemClick=e.onItemClick,this.card=r.createCard(),this.toast=r.createToast()}async initialize(){var e=this;e.initialized||(e.initialized=!0)}handleParams(e){if(e.gamesJson)try{this.games=JSON.parse(e.gamesJson)}catch(e){console.warn(`解析棋谱数据失败`),this.games=[]}e.title&&(this._title=e.title),e.userId&&(this.currentUserId=e.userId),this.loadReadMarks(),this.render()}async loadGames(e,t,n){var r=this;r.currentUserId=n;let i=r.providers.get(e);if(!i){console.error(`未找到 category="${e}" 的棋谱列表提供者`),r.toast.error(`未找到数据提供者`),r.games=[],r.render();return}try{let e=await i.getGameArchiveIds(t),n=[];for(let t of e)if(r.gameHistoryStorage){let e=await r.gameHistoryStorage.findById(t);if(e&&e.metadata){let r=e.metadata.result||void 0,i=e.metadata.blackName||e.metadata.black||``,a=e.metadata.whiteName||e.metadata.white||``;n.push({id:t,archiveId:t,black:i,white:a,date:e.metadata.date||``,...r?{result:r}:{}})}}else{let e=t.split(`-`).slice(1).join(`-`)||t;n.push({id:e,archiveId:t,black:`-`,white:`-`,date:`-`})}r.games=n,r.loadReadMarks(),r.render()}catch(e){console.error(`加载棋谱数据失败`,e),r.toast.error(`加载失败`),r.games=[],r.render()}}setData(e){this.games=e,this.loadReadMarks(),this.render()}async loadReadMarks(){var e=this;e.readMarkIds=await e.readMarkService.getReadMarks(e.category)}async clearReadMarks(){var e=this,t;await e.readMarkService.clearReadMarks(e.category),e.readMarkIds=[],(t=e.onClearReadMarks)==null||t.call(e),e.render()}async onItemClick(e){var t=this;let n=t.games.find(t=>t.id===e);n&&(await t.readMarkService.markRead(t.category,e),t.readMarkIds.push(e),!(t.customItemClick&&t.customItemClick(n)!==!1)&&n.archiveId&&t.onNavigate&&t.onNavigate(`replay`,{archiveId:n.archiveId}))}render(){let e=document.getElementById(`page-root`);if(!e)return;let t=`📋 共 ${this.games.length} 局，已读 ${this.games.filter(e=>this.readMarkIds.includes(e.id)).length} 局`,r=`<div class="source-header-controls">
      <button class="icon-btn" id="clearReadBtn" title="清除已读标记">👁️</button>
    </div>`;if(this.games.length===0){e.innerHTML=`
        <div class="source-group">
          <div class="source-header">
            <span>${t}</span>
            ${r}
          </div>
          <div style="padding:20px;">
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <div>暂无棋谱</div>
            </div>
          </div>
        </div>
      `,this.bindClearBtn();return}e.innerHTML=`
      <div class="source-group">
        <div class="source-header">
          <span>${t}</span>
          ${r}
        </div>
        <div class="game-list">
          ${this.games.map((e,t)=>{let r=this.readMarkIds.includes(e.id),i=e.black===this.currentUserId,a=e.white===this.currentUserId,o=n(e.result),s=``;return o.includes(`黑`)?s=i?`result-win`:`result-lose`:o.includes(`白`)&&(s=a?`result-win`:`result-lose`),`
        <div class="game-card-wrapper ${r?`viewed`:``}" data-index="${t}" data-id="${e.id}">
          <div class="game-card">
            <div class="game-header">
              <div class="game-players">
                <span class="${i?`player-self`:``}">
                  <span class="stone-icon stone-black"></span>${e.black||`黑棋`}
                </span>
                <span class="player-vs">vs</span>
                <span class="${a?`player-self`:``}">
                  <span class="stone-icon stone-white"></span>${e.white||`白棋`}
                </span>
              </div>
              ${e.result?`<span class="game-result ${s}">${o}</span>`:``}
            </div>
            <div class="game-footer">
              <span>${e.date||`-`}</span>
              <span class="game-btn">📖 棋谱</span>
            </div>
          </div>
        </div>
      `}).join(``)}
        </div>
      </div>
    `,e.querySelectorAll(`.game-card-wrapper`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id;t&&this.onItemClick(t)})}),this.bindClearBtn()}bindClearBtn(){let e=document.getElementById(`clearReadBtn`);e&&(e.onclick=()=>this.clearReadMarks())}destroy(){this.card.destroy(),this.toast.destroy(),this.games=[],this.readMarkIds=[],this.initialized=!1}},o=class{constructor(){t(this,`currentFilter`,`all`)}getPatternTags(e){let t=[];return e.prefixLen>=8&&e.frequency>=5&&t.push(`hot`),e.prefixLen>=8&&e.prefixLen>=e.totalMoves&&t.push(`hit`),e.prefixLen>=12&&t.push(`complex`),t}setFilter(e){this.currentFilter=e}getFilter(){return this.currentFilter}filterPatterns(e){return e.filter(e=>this.currentFilter===`all`?!0:this.getPatternTags(e).includes(this.currentFilter))}getCounts(e){return{all:e.length,hot:e.filter(e=>this.getPatternTags(e).includes(`hot`)).length,hit:e.filter(e=>this.getPatternTags(e).includes(`hit`)).length,complex:e.filter(e=>this.getPatternTags(e).includes(`complex`)).length}}},s=class{constructor(e){t(this,`readMarkService`,void 0),t(this,`readMarkIds`,[]),t(this,`currentCategory`,void 0),this.readMarkService=e}setCategory(e){this.currentCategory=e}async loadReadMarks(){var e=this;e.currentCategory&&(e.readMarkIds=await e.readMarkService.getReadMarks(e.currentCategory))}async markRead(e){var t=this;t.currentCategory&&(await t.readMarkService.markRead(t.currentCategory,e),t.readMarkIds.includes(e)||t.readMarkIds.push(e))}async clearReadMarks(){var e=this;e.currentCategory&&(await e.readMarkService.clearReadMarks(e.currentCategory),e.readMarkIds=[])}isRead(e){return this.readMarkIds.includes(e)}getReadMarkIds(){return this.readMarkIds}reset(){this.readMarkIds=[],this.currentCategory=void 0}},c=class{showWinrateDetail(e){if(!(e!=null&&e.delta))return;let t=e.delta,n=`<div class="winrate-detail-row"><span class="winrate-detail-label">胜率变化</span><span class="winrate-detail-value">`+(t>0?`+`:``)+(t*100).toFixed(2)+`%</span></div>`;if(e.stddev!==void 0){let t=e.stddev,r=`较稳定`;r=t<.02?`很稳定`:t<.04?`较稳定`:t<.06?`一般`:`不稳定`,n+=`<div class="winrate-detail-row"><span class="winrate-detail-label">标准差</span><span class="winrate-detail-value">`+t.toFixed(4)+` (`+r+`)</span></div>`}if(e.samples!==void 0){let t=e.samples,r=e.positive||0,i=e.negative||0,a=e.neutral||0,o=t>0?Math.round(r/t*100):0,s=t>0?Math.round(i/t*100):0,c=t>0?Math.round(a/t*100):0;n+=`<div class="winrate-detail-row"><span class="winrate-detail-label">样本数</span><span class="winrate-detail-value">`+t+`</span></div>`,n+=`<div class="winrate-bar"><div class="winrate-bar-positive" style="width:`+o+`%"></div><div class="winrate-bar-neutral" style="width:`+c+`%"></div><div class="winrate-bar-negative" style="width:`+s+`%"></div></div>`,n+=`<div class="winrate-bar-labels"><span>黑有利 `+r+` (`+o+`%)</span><span>中性 `+a+`</span><span>白有利 `+i+` (`+s+`%)</span></div>`}n+=`<div class="winrate-hint">💡 delta > 0: 先手有利</div>`;let r=document.getElementById(`winrate-content`);r&&(r.innerHTML=n);let i=document.getElementById(`winrate-backdrop`),a=document.getElementById(`winrate-sheet`);i&&i.classList.add(`active`),a&&a.classList.add(`active`)}formatWinrate(e){return e===void 0?{display:`-`,className:`neutral`}:{display:(e>0?`+`:``)+(e*100).toFixed(1)+`%`,className:e>.01?`positive`:e<-.01?`negative`:`neutral`}}},l=class{constructor(e){t(this,`config`,void 0),this.config=e}renderFilterTabs(e,t){let n=document.getElementById(`filter-tabs`);if(!n)return;let r=this.config.filterManager.getCounts(e);n.innerHTML=[{id:`all`,label:`全部`,count:r.all},{id:`hot`,label:`🔥热门`,count:r.hot},{id:`hit`,label:`🎯命中`,count:r.hit},{id:`complex`,label:`🧩复杂`,count:r.complex}].map(e=>`
      <button class="filter-tab ${t===e.id?`active`:``}" data-filter="${e.id}">
        ${e.label} <span class="count">${e.count}</span>
      </button>
    `).join(``),n.querySelectorAll(`.filter-tab`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.filter;n&&(this.config.filterManager.setFilter(n),this.render(e))})})}render(e){let t=this.config.filterManager.filterPatterns(e);this.renderFilterTabs(e,this.config.filterManager.getFilter());let n=document.getElementById(`page-root`);if(n){if(t.length===0){n.innerHTML=`
        <div class="empty-state">
          <p>${this.config.filterManager.getFilter()===`all`?`未发现定式规律`:`无符合条件的定式`}</p>
        </div>
      `;return}n.innerHTML=`<div class="joseki-list">${t.map((e,t)=>this.renderCard(e,t)).join(``)}</div>`,this.renderThumbnails(t),this.bindCardEvents(t)}}renderCard(e,t){var n,r;let i=this.config.readMarkManager.isRead(e.id),a=this.config.filterManager.getPatternTags(e).map(e=>e===`hot`?`<span class="tag tag-hot">🔥 热门</span>`:e===`hit`?`<span class="tag tag-hit">🎯 命中</span>`:e===`complex`?`<span class="tag tag-complex">🧩 复杂</span>`:``).join(``),o=e.gameInfo?`${e.gameInfo.black} vs ${e.gameInfo.white}`:``,s;s=e.probability>=.01?(e.probability*100).toFixed(1)+`%`:e.probability>=.001?(e.probability*100).toFixed(2)+`%`:(e.probability*100).toFixed(3)+`%`;let c=this.config.winrateHelper.formatWinrate((n=e.winrateStats)==null?void 0:n.delta);return`
      <div class="joseki-card ${i?`viewed`:``}" data-index="${t}" data-id="${e.id}">
        <div class="joseki-header">
          <span>${o}</span>
          <div class="joseki-tags-row">${a}</div>
        </div>
        <div class="joseki-body">
          <div class="metrics-row">
            <canvas class="joseki-thumbnail" width="160" height="160" data-pattern-id="${e.id}"></canvas>
            <div class="metrics-info">
              <div class="metric-col">
                <span class="metric-value">${e.prefixLen}/${e.totalMoves}</span>
                <span class="metric-label">匹配/总手数</span>
              </div>
              <div class="metric-col">
                <span class="metric-value">${e.frequency}</span>
                <span class="metric-label">库出现次数</span>
              </div>
              <div class="metric-col">
                <span class="metric-value">${s}</span>
                <span class="metric-label">库出现概率</span>
              </div>
              <div class="metric-col">
                <span class="metric-value winrate-value ${c.className}" data-pattern-id="${e.id}">
                  ${c.display}
                </span>
                <span class="metric-label">胜率变化</span>
              </div>
            </div>
          </div>
        </div>
        <div class="joseki-footer">
          <div class="joseki-tags">
            <span class="joseki-action explore-btn" data-pattern-id="${e.id}">🔍 探索</span>
            ${(r=e.gameInfo)!=null&&r.archiveId?`<span class="joseki-action fullgame-btn" data-pattern-id="${e.id}">📝 对局</span>`:``}
          </div>
        </div>
      </div>
    `}renderThumbnails(e){document.querySelectorAll(`canvas.joseki-thumbnail`).forEach(t=>{let n=t.dataset.patternId;if(!n)return;let r=e.find(e=>e.id===n);if(!r)return;let a=this.parseMoves(r.prefix,r.prefixLen);a.length>0&&i(t,a,160)})}parseMoves(e,t){let n=[];return e.trim().split(/\s+/).slice(0,t).forEach((e,t)=>{if(!e||e.length!==2)return;let r=e.charCodeAt(0)-97,i=e.charCodeAt(1)-97;r>=0&&r<19&&i>=0&&i<19&&n.push({x:r,y:i,color:t%2==0?`black`:`white`})}),n}bindCardEvents(e){var t=this;document.querySelectorAll(`.explore-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.patternId;n&&this.config.onExplore(n)})}),document.querySelectorAll(`.fullgame-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.patternId;n&&this.config.onViewFullGame(n)})}),document.querySelectorAll(`.winrate-value`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=e.dataset.patternId;r&&t.config.onWinrateDetail(r)})}),document.querySelectorAll(`.joseki-card`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=e.dataset.id;n&&t.config.onCardClick(n)})})}},u=class{get title(){return this._title}constructor(e){t(this,`_title`,`定式规律`),t(this,`providers`,void 0),t(this,`gameService`,void 0),t(this,`tabs`,void 0),t(this,`toast`,void 0),t(this,`patterns`,[]),t(this,`onNavigate`,void 0),t(this,`onClearReadMarks`,void 0),t(this,`initialized`,!1),t(this,`filterManager`,void 0),t(this,`readMarkManager`,void 0),t(this,`winrateHelper`,void 0),t(this,`renderer`,void 0),this.providers=e.providers,this.gameService=e.gameService,this.onNavigate=e.onNavigate,this.onClearReadMarks=e.onClearReadMarks,this.tabs=r.createTabs(),this.toast=r.createToast(),this.filterManager=new o,this.readMarkManager=new s(e.readMarkService),this.winrateHelper=new c,e.category&&this.readMarkManager.setCategory(e.category),this.renderer=new l({filterManager:this.filterManager,readMarkManager:this.readMarkManager,winrateHelper:this.winrateHelper,onExplore:e=>this.explorePattern(e),onViewGame:e=>this.viewGame(e),onViewFullGame:e=>this.viewFullGame(e),onWinrateDetail:e=>this.showWinrateDetail(e),onCardClick:e=>this.onItemClick(e)})}async initialize(){var t=this;if(t.initialized)return;let{preloadThumbnailImages:n}=await e(async()=>{let{preloadThumbnailImages:e}=await import(`./JosekiThumbnail-DbyXLPNA.js`).then(e=>e.t);return{preloadThumbnailImages:e}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);await n();let r=t.filterManager.getCounts(t.patterns);t.tabs.setConfig({items:[{id:`all`,label:`全部 ${r.all}`},{id:`hot`,label:`🔥热门 ${r.hot}`},{id:`hit`,label:`🎯命中 ${r.hit}`},{id:`complex`,label:`🧩复杂 ${r.complex}`}],activeId:`all`}),t.tabs.onChange(e=>t.setFilter(e));let i=document.getElementById(`clear-read-btn`);i&&i.addEventListener(`click`,()=>t.clearReadMarks()),t.initialized=!0}async handleParams(e){var t=this;let n=e.category,r=e.key;if(t.readMarkManager.setCategory(n),n&&r){let e=t.providers.get(n);if(e)try{let n=await e.getJosekiPatterns(r);t.patterns=n.patterns,n.title&&(t._title=n.title)}catch(e){console.error(`从提供者加载定式数据失败`,e),t.patterns=[]}else console.warn(`未找到 category=${n} 的数据提供者`),t.patterns=[]}else console.warn(`缺少 category 或 key 参数`),t.patterns=[];e.title&&(t._title=e.title),await t.readMarkManager.loadReadMarks(),await t.initialize(),t.render()}setData(e){this.patterns=e,this.readMarkManager.loadReadMarks(),this.render()}async clearReadMarks(){var e=this,t;await e.readMarkManager.clearReadMarks(),e.toast.success(`已读标记已清除`),(t=e.onClearReadMarks)==null||t.call(e),e.render()}setFilter(e){this.filterManager.setFilter(e),this.tabs.setActiveId(e),this.render()}async onItemClick(e){var t=this;await t.readMarkManager.markRead(e);let n=t.patterns.find(t=>t.id===e);n!=null&&n.sgf||n!=null&&n.extractedMoves?t.viewGame(e):t.explorePattern(e)}async showWinrateDetail(e){var t=this;let n=t.patterns.find(t=>t.id===e);if(!(n!=null&&n.winrateStats)){t.toast.info(`无胜率数据`);return}t.winrateHelper.showWinrateDetail(n.winrateStats)}explorePattern(e){let t=this.patterns.find(t=>t.id===e);if(!t||!this.onNavigate)return;let n=t.prefix.split(/\s+/).slice(0,t.prefixLen).join(`-`);this.onNavigate(`joseki/explore`,{moves:n})}viewGame(e){let t=this.patterns.find(t=>t.id===e),n=(t==null?void 0:t.sgf)||(t==null?void 0:t.extractedMoves);if(!n||!t){this.toast.warning(`无棋谱数据`);return}this.onNavigate&&this.onNavigate(`replay`,{sgf:n,move:t.prefixLen.toString()})}async viewFullGame(e){var t=this,n;let r=t.patterns.find(t=>t.id===e);if(!(!(r==null||(n=r.gameInfo)==null)&&n.archiveId)){t.toast.warning(`无棋谱归档ID`);return}t.onNavigate&&t.onNavigate(`replay`,{archiveId:r.gameInfo.archiveId})}render(){this.renderer.render(this.patterns)}destroy(){this.tabs.destroy(),this.toast.destroy(),this.patterns=[],this.readMarkManager.reset(),this.initialized=!1}},d=class{constructor(e){t(this,`favoriteService`,void 0),t(this,`category`,`joseki_discover`),this.favoriteService=e}async getJosekiPatterns(e){var t=this;let n=await t.favoriteService.getFavorite(t.category,e);if(!n||!n.data)return{patterns:[]};let r=n.data;return{patterns:(r.patterns||[]).map((e,t)=>({id:e.id||`pattern-${t}`,prefix:e.prefix,prefixLen:e.prefixLen,totalMoves:e.totalMoves,frequency:e.frequency,probability:e.probability,winrateStats:e.winrateStats||(e.winrateDelta?{delta:e.winrateDelta}:void 0),extractedMoves:e.extractedMoves,gameInfo:e.gameInfo})),title:r.label}}};export{u as n,a as r,d as t};
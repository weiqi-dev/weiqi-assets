import{o as e}from"../ai-Caf03t8N.js";import"../modulepreload-polyfill-BVSDYCMZ.js";/* empty css               */import{a as t,c as n}from"../FavoriteService-C9LkU7xv.js";import{s as r,t as i,v as a}from"../Bootstrap-DoB1Ytpd.js";import{t as o}from"../Dialog-DEBX3k9q.js";import{i as s,n as c,r as l}from"../storage-CH0wWtio.js";import{t as u}from"../GameService-DASLELKj.js";import"../game-Bg_RjH7k.js";import{r as d}from"../SGFParser-DMi4MvBq.js";import{t as f}from"../JosekiDiscoverService-BWReuWl5.js";import{t as p}from"../ActivityLogService-DSt1d4my.js";import{t as m}from"../JosekiLoader-DiqD5iLx.js";var h=class{constructor(e,t,r,i){n(this,`gameService`,void 0),n(this,`josekiDiscoverService`,void 0),n(this,`activityLogService`,void 0),n(this,`favoriteService`,void 0),this.gameService=e,this.josekiDiscoverService=t,this.activityLogService=r,this.favoriteService=i}async analyze(e,t){var n=this,r,i;let a=t==null?void 0:t.onProgress,o=(r=t==null?void 0:t.maxGames)==null?10:r;a==null||a(0,`开始分析`,e),a==null||a(10,`获取棋谱列表`);let s=await n.gameService.listPlayerGames(e,o);if(s.length===0)return a==null||a(100,`无棋谱数据`),{foxwqId:e,userInfo:{uid:e,nickname:e},games:[],joseki:{count:0,patterns:[]},analyzedAt:Date.now()};a==null||a(15,`获取到 ${s.length} 盘棋谱`);let c=await n.gameService.fetchByChessIds(s,{onProgress:(e,t,n)=>{let r=15+Math.round(e/t*55);a==null||a(r,`下载棋谱`,`${e}/${t}: ${n}`)}});console.log(`[OpponentAnalyzer] fetchResults:`,c.map(e=>({chessid:e.metadata.gameId,archiveId:e.archiveId,success:e.success,hasSgf:!!e.sgfContent}))),a==null||a(75,`提取 SGF 内容`);let l=c.filter(e=>e.success&&e.sgfContent).map(e=>e.sgfContent),u={count:0,patterns:[]};if(l.length>0){a==null||a(80,`分析定式`,`${l.length} 盘棋谱`);let e=await n.josekiDiscoverService.discoverGames(l,{onProgress:(e,t,n)=>{let r=80+Math.round(e*.15);a==null||a(r,t,n)}});u.count=e.total,u.patterns=e.patterns,u.patterns.forEach(e=>{var t;if(((t=e.gameInfo)==null?void 0:t.sgfIndex)!==void 0){let t=e.gameInfo.sgfIndex,n=c.filter(e=>e.success)[t];n&&(e.gameInfo={...e.gameInfo,archiveId:n.archiveId})}})}else return a==null||a(100,`无有效棋谱`),{foxwqId:e,userInfo:{uid:e,nickname:e},games:[],joseki:{count:0,patterns:[]},analyzedAt:Date.now()};let f={foxwqId:e,userInfo:{uid:e,nickname:e},games:c.filter(e=>e.success).map(e=>{var t;let n=e.metadata.blackName,r=e.metadata.whiteName,i=e.metadata.date,a=(t=e.metadata.result)==null?``:t;if(e.sgfContent&&(!n||!r))try{let t=d(e.sgfContent);t.gameInfo&&(n=n||t.gameInfo.black||``,r=r||t.gameInfo.white||``,i=i||t.gameInfo.date||``,t.gameInfo.result&&(a=a||t.gameInfo.result))}catch(e){}let o={chessid:e.metadata.gameId,archiveId:e.archiveId,black:n,white:r,date:i,result:a};return e.sgfContent&&(o.sgf=e.sgfContent),o}),joseki:u,analyzedAt:Date.now()};await((i=n.activityLogService)==null?void 0:i.record(`joseki_discover`,`分析对手：${e}`,{foxwqId:e,gamesCount:f.games.length,patternsFound:f.joseki.count,games:f.games.map(e=>({chessid:e.chessid,archiveId:e.archiveId,black:e.black,white:e.white,date:e.date,result:e.result})),joseki:f.joseki},[e,`对手分析`]));let p=n.calculateStatistics(f.games,e),m=f.games.length>0&&n.favoriteService?await n.favoriteService.addFavorite(`opponent`,e,{foxwqId:e,games:f.games.map(e=>({chessid:e.chessid,archiveId:e.archiveId,black:e.black,white:e.white,date:e.date,result:e.result})),joseki:f.joseki,statistics:p,analyzedAt:f.analyzedAt}):void 0;return a==null||a(100,`分析完成`,`发现 ${u.count} 个定式`),{...f,...m?{bookmarkId:m}:{}}}calculateStatistics(e,t){let n=new Set,r={};e.forEach(e=>{let i=e.black.includes(t)?e.white:e.black;i&&i!==t&&(n.add(i),r[i]=(r[i]||0)+1)});let i=`-`,a=0;for(let[e,t]of Object.entries(r))t>a&&(a=t,i=e);let o=null,s=null;e.forEach(e=>{e.date&&((!o||o>e.date)&&(o=e.date),(!s||s<e.date)&&(s=e.date))});let c=0,l=0;return e.forEach(e=>{e.result&&(e.result.includes(`黑胜`)&&e.black.includes(t)||e.result.includes(`白胜`)&&e.white.includes(t)?c++:l++)}),{totalGames:e.length,uniqueOpponents:n.size,topOpponent:i,topOpponentCount:a,firstDate:o||`-`,lastDate:s||`-`,winCount:c,loseCount:l,winRate:e.length>0?Math.round(c/e.length*100):0}}async getFavorites(){var e=this;return e.favoriteService?(await e.favoriteService.getFavorites({category:`opponent`})).map(e=>{var t,n,r,i,a,o,s,c;if((t=e.data)!=null&&t.result&&!((n=e.data)!=null&&n.games)){var l,u;let t=e.data.result;return{id:e.id,foxwqId:(l=(u=e.data)==null?void 0:u.foxwqId)==null?e.key:l,games:t.games,joseki:t.joseki,statistics:void 0,analyzedAt:t.analyzedAt,updatedAt:e.createdAt}}return{id:e.id,foxwqId:(r=(i=e.data)==null?void 0:i.foxwqId)==null?e.key:r,games:(a=e.data)==null?void 0:a.games,joseki:(o=e.data)==null?void 0:o.joseki,statistics:(s=e.data)==null?void 0:s.statistics,analyzedAt:(c=e.data)==null?void 0:c.analyzedAt,updatedAt:e.createdAt}}):[]}async clearFavorites(){var e=this,t;await((t=e.favoriteService)==null?void 0:t.clear(`opponent`))}async queryHistory(e){var t=this,n;return t.activityLogService?(await t.activityLogService.query({type:`joseki_discover`,keyword:e==null?void 0:e.foxwqId,limit:(n=e==null?void 0:e.limit)==null?20:n,offset:e==null?void 0:e.offset})).map(e=>{var t,n,r,i,a;return{id:e.id,foxwqId:(t=e.data.foxwqId)==null?``:t,gamesCount:(n=e.data.gamesCount)==null?0:n,patternsFound:(r=e.data.patternsFound)==null?0:r,games:(i=e.data.games)==null?[]:i,joseki:(a=e.data.joseki)==null?{count:0,patterns:[]}:a,analyzedAt:e.createdAt}}):[]}async getHistoryDetail(e){var t=this,n;if(!t.activityLogService)return null;let r=await t.activityLogService.getById(e);if(!r)return null;let i=r.data;if((n=i.games)!=null&&n.length){for(let e of i.games)if(e.archiveId&&!e.sgf){var a;e.sgf=(a=await t.gameService.getByArchiveId(e.archiveId))==null?void 0:a}}return i}};async function g(e){let t=new f(new m(e.network,{async upload(){},async download(){throw Error(`Not cached`)},async delete(){},async exists(){return!1},async getMetadata(){throw Error(`Not implemented`)},async readChunk(){throw Error(`Not implemented`)},async listFiles(){return[]},async createDirectory(){},async deleteDirectory(){},async initialize(){}},e.config)),[n,r,i]=await Promise.all([c(),s(e),l()]),o=new a(r,i);return await o.initialize(),{analyzer:new h(new u(e.network,{archiveCache:n,historyStorage:o,configProvider:e.config}),t,new p(await e.createCache(`weiqi-activity`,`entries`)),e.favoriteService)}}function _(e,t){let n=null,r=null,i=new Set,a={};e.forEach(e=>{e.date&&((!n||n>e.date)&&(n=e.date),(!r||r<e.date)&&(r=e.date));let o=e.black.includes(t)?e.white:e.black;o&&o!==t&&(i.add(o),a[o]=(a[o]||0)+1)});let o=`-`,s=0;for(let[e,t]of Object.entries(a))t>s&&(s=t,o=e);return{opponentsCount:i.size,topOpponent:o,firstDate:n,lastDate:r}}function v(e){var t;let n=0,r=0,i=0,a=0;return(t=e.joseki)!=null&&t.patterns&&(n=e.joseki.count||e.joseki.patterns.length,e.joseki.patterns.forEach(e=>{var t,n,o;let s=(t=e.prefixLen)==null?e.prefix.split(/\s+/).length:t,c=(n=e.frequency)==null?0:n,l=(o=e.totalMoves)==null?0:o;s>=8&&c>=5&&r++,s>=8&&s>=l&&i++,s>=12&&a++})),{total:n,hot:r,hit:i,complex:a}}function y(e,t){let n=e.games||[],r=n.length,i=_(n,e.foxwqId),a=v(e);t.innerHTML=`
    <div class="stats-card" onclick="window.viewGames()">
      <h3>📋 棋谱统计 ${e.bookmarkId?`★ 已收藏`:``}</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">${r}</div>
          <div class="stat-label">总对局数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${i.opponentsCount}</div>
          <div class="stat-label">对弈对手</div>
        </div>
        <div class="stat-item stat-item-full">
          <div class="stat-value">${i.topOpponent}</div>
          <div class="stat-label">活跃对手</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" style="font-size:1em">${i.firstDate||`-`}</div>
          <div class="stat-label">最早对局</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" style="font-size:1em">${i.lastDate||`-`}</div>
          <div class="stat-label">最新对局</div>
        </div>
      </div>
    </div>

    <div class="stats-card" onclick="window.viewJoseki()">
      <h3>📚 定式发现</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">${a.total}</div>
          <div class="stat-label">匹配定式数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${a.hot}</div>
          <div class="stat-label">🔥 热门</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${a.hit}</div>
          <div class="stat-label">🎯 命中</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${a.complex}</div>
          <div class="stat-label">🧩 复杂</div>
        </div>
      </div>
    </div>
  `,t.classList.add(`show`)}function b(e,t){e.innerHTML=`
    <div class="card">
      <div style="text-align: center; padding: 20px;">
        <div class="spinner"></div>
        <p>正在分析 "${t}" 的棋谱...</p>
        <p style="font-size: 0.85em; color: #888; margin-top: 8px;">
          请耐心等待，分析需要一定时间...
        </p>
      </div>
    </div>
  `,e.style.display=`block`}function x(e,t,n,r){let i=``;if(r){let e=r.match(/^(\d+\/\d+):/);i=e?e[1]:r.length>20?`处理中...`:r}e.innerHTML=`
    <div class="card">
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 24px; margin-bottom: 10px;">${t}%</div>
        <div style="font-size: 16px; color: #666;">${n}</div>
        ${i?`<div style="font-size: 14px; color: #999; margin-top: 5px;">${i}</div>`:``}
      </div>
    </div>
  `}function S(e,t){e.innerHTML=`
    <div class="card">
      <div style="background: #ffebee; color: #c62828; padding: 12px; border-radius: 8px; text-align: center;">
        <strong>分析失败</strong>
        <p>${t}</p>
      </div>
    </div>
  `,e.classList.add(`show`)}var C=e({analyzeOpponent:()=>D,getCurrentResult:()=>T,setCurrentResult:()=>E}),w=null;function T(){return w}function E(e){w=e}async function D(e,t,n,r,i,a){if(!e){await o.alert(`请输入野狐昵称`);return}r.disabled=!0,r.textContent=`分析中...`,i.classList.remove(`show`),b(i,e);try{let r=await n.analyze(e,{maxGames:t,onProgress:(e,t,n)=>{x(i,e,t,n)}});w=r,y(r,i),a.info(`对手分析完成`,{foxwqId:e,gamesCount:r.games.length})}catch(e){S(i,e.message),a.error(`对手分析失败`,e)}finally{r.disabled=!1,r.textContent=`开始分析`}}function O(e){let t=new Date(e),n=new Date().getTime()-t.getTime(),r=Math.floor(n/1e3),i=Math.floor(r/60),a=Math.floor(i/60),o=Math.floor(a/24);return r<60?`刚刚`:i<60?`${i}分钟前`:a<24?`${a}小时前`:o<7?`${o}天前`:t.toLocaleDateString(`zh-CN`)}var k=[];async function A(e,t,n){try{k=await e.getFavorites(),j(t)}catch(e){n.error(`加载收藏失败`,e),k=[],j(t)}}function j(e){if(k.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">⭐</div>
        <p>暂无收藏</p>
        <p style="font-size: 0.85em; margin-top: 8px;">分析对手后会显示在这里</p>
      </div>
    `;return}e.innerHTML=k.map(e=>{var t,n,r,i;let a=(t=(n=e.games)==null?void 0:n.length)==null?0:t,o=(r=(i=e.joseki)==null?void 0:i.count)==null?0:r,s=O(e.updatedAt);return`
      <div class="history-item" onclick="window.viewFavorite('${e.foxwqId}')">
        <div class="history-header">
          <span class="history-id">👤 ${e.foxwqId}</span>
          <span class="history-time">${s}</span>
        </div>
        <div class="history-stats">
          <span class="history-stat">📋 ${a}局</span>
          <span class="history-stat">🎯 ${o}定式</span>
        </div>
      </div>
    `}).join(``)}async function M(e,t){await o.confirm(`确定要清除所有收藏吗？`)&&(await e.clearFavorites(),k=[],j(t))}function N(e){return k.find(t=>t.foxwqId===e)}function P(e){return{foxwqId:e.foxwqId,userInfo:{uid:e.foxwqId,nickname:e.foxwqId},games:e.games||[],joseki:e.joseki||{count:0,patterns:[]},analyzedAt:e.analyzedAt||Date.now()}}var F,I;function L(e,t){F=e,I=t}function R(){var e;let t=T();if(!(!(t==null||(e=t.games)==null)&&e.length)){o.alert(`无棋谱数据`);return}let n=new URLSearchParams({category:`opponent`,key:t.foxwqId,userId:t.foxwqId});window.location.href=`../replay/list.html?${n.toString()}`}function z(){var e;let t=T();if(!(!(t==null||(e=t.joseki)==null||(e=e.patterns)==null)&&e.length)){o.alert(`无定式数据`);return}let n=new URLSearchParams({category:`opponent`,key:t.foxwqId});window.location.href=`../joseki/list.html?${n.toString()}`}function B(e){let n=N(e);if(!n||!n.games){o.alert(`收藏数据不存在`);return}let r=P(n);t(async()=>{let{setCurrentResult:e}=await Promise.resolve().then(()=>C);return{setCurrentResult:e}},void 0,import.meta.url).then(({setCurrentResult:e})=>{e(r)}),I(`query`),F.value=e;let i=document.getElementById(`statsSection`);i&&y(r,i)}function V(){window.viewGames=R,window.viewJoseki=z,window.viewFavorite=B}var H,U,W,G,K,q,J,Y;async function X(){let e=await i.init({containerId:`statsSection`,moduleConfigs:{joseki:{dataUrl:`../shared/assets/data/joseki`,trieMetaFile:`trie-meta.json`,enableDynamicLoad:!1}}});Y=e.logger,J=(await g(e)).analyzer,H=document.getElementById(`foxwqIdInput`),W=document.getElementById(`queryBtn`),G=document.getElementById(`statsSection`),K=document.getElementById(`favoritesList`),q=document.getElementById(`clearBtn`),r.mountAll(),U=r.get(`#limitSelect`),Z(),L(H,Q),V();let t=new URLSearchParams(window.location.search),n=t.get(`auto`),a=t.get(`foxwqId`)||t.get(`player`);if(a&&(H.value=a,n===`true`)){t.delete(`auto`);let e=t.toString()?`${window.location.pathname}?${t.toString()}`:window.location.pathname;window.history.replaceState({},``,e),$()}e.logger.info(`OpponentPage 已启动`)}function Z(){document.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&Q(t)})}),W.addEventListener(`click`,()=>$()),H.addEventListener(`keypress`,e=>{e.key===`Enter`&&$()}),q.addEventListener(`click`,()=>te())}function Q(e){var t,n;document.querySelectorAll(`.tab`).forEach(e=>{e.classList.remove(`active`)}),(t=document.querySelector(`.tab[data-tab="${e}"]`))==null||t.classList.add(`active`),document.querySelectorAll(`.tab-content`).forEach(e=>{e.classList.remove(`active`)}),(n=document.getElementById(`${e}Panel`))==null||n.classList.add(`active`),e===`favorites`&&ee()}async function $(){await D(H.value.trim(),parseInt(U.getValue()),J,W,G,Y)}async function ee(){await A(J,K,Y)}async function te(){await M(J,K)}X().catch(console.error);
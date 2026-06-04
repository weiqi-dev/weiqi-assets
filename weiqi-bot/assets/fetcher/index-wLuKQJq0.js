import{l as e}from"../FavoriteService-Vp2l_PCI.js";import"../modulepreload-polyfill-eJgYjmQ8.js";/* empty css               */import{d as t,n,t as r}from"../Bootstrap-DFrnJCVa.js";import{t as i}from"../game-BZCagLXN.js";import{t as a}from"../GameResult-BMILmLn5.js";import{n as o,r as s}from"../SGFParser-B7SpJ087.js";import{n as c,t as l}from"../WebFileExporter-C-ONJSK2.js";var u=class{constructor(){e(this,`qrInstances`,new WeakMap)}async generate(e,t,n){var r=this,i,a,o,s;let c=await r.loadQRCodeLib();if(!c)throw Error(`QRCode library not available`);r.clear(e);let l=new c(e,{width:(i=n==null?void 0:n.width)==null?200:i,height:(a=n==null?void 0:n.height)==null?200:a,colorDark:(o=n==null?void 0:n.colorDark)==null?`#000000`:o,colorLight:(s=n==null?void 0:n.colorLight)==null?`#ffffff`:s});l.makeCode(t),r.qrInstances.set(e,l)}clear(e){e.innerHTML=``,this.qrInstances.delete(e)}isAvailable(){return typeof window<`u`}async loadQRCodeLib(){return typeof window>`u`?null:window.QRCode?window.QRCode:new Promise(e=>{let t=document.createElement(`script`);t.src=`https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js`,t.onload=()=>e(window.QRCode||null),t.onerror=()=>e(null),document.head.appendChild(t)})}},d=class{constructor(t){var n;e(this,`modalId`,`qr-dialog-${Date.now()}`),e(this,`containerId`,`qr-container-${Date.now()}`),e(this,`config`,void 0),e(this,`qrGenerator`,void 0),this.config=t==null?{title:`扫码分享`,hint:`截图或长按二维码识别`}:t,this.qrGenerator=(n=t==null?void 0:t.qrGenerator)==null?new u:n}async show(e){var t=this;t.createDialog();let n=document.getElementById(t.containerId);if(n)try{await t.qrGenerator.generate(n,e,{width:200,height:200,colorDark:`#333`,colorLight:`#fff`})}catch(e){n.innerHTML=`<div style="color:#c53030; font-size:13px;">二维码生成失败</div>`}let r=document.getElementById(t.modalId);r&&(r.style.display=`flex`)}hide(){let e=document.getElementById(this.modalId);e&&(e.style.display=`none`,e.remove())}destroy(){this.hide()}createDialog(){let e=document.getElementById(this.modalId);e&&e.remove();let t=document.createElement(`div`);t.id=this.modalId,t.innerHTML=this.renderHTML(),document.body.appendChild(t),t.addEventListener(`click`,e=>{e.target===t&&this.hide()}),t.addEventListener(`click`,e=>{e.target.closest(`[data-action="close-qr"]`)&&this.hide()})}renderHTML(){return`
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
      ">
        <div style="
          background: white;
          padding: 24px;
          border-radius: 16px;
          text-align: center;
          max-width: 300px;
          width: 90%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        ">
          <div style="
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
            font-weight: 600;
          ">${this.config.title}</div>
          <div id="${this.containerId}" style="
            display: flex;
            justify-content: center;
            align-items: center;
          "></div>
          <div style="
            font-size: 13px;
            color: #666;
            margin-top: 16px;
            line-height: 1.6;
          ">${this.config.hint}</div>
          <div data-action="close-qr" style="
            margin-top: 20px;
            padding: 12px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 24px;
            font-size: 14px;
            cursor: pointer;
            display: inline-block;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">关闭</div>
        </div>
      </div>
    `}},f=class{constructor(t,r,i){e(this,`cb`,void 0),e(this,`factory`,void 0),e(this,`formatter`,void 0),e(this,`tabs`,void 0),e(this,`queryPanel`,void 0),e(this,`bookmarkPanel`,void 0),e(this,`input`,void 0),e(this,`fetchBtn`,void 0),e(this,`bookmarkCard`,void 0),e(this,`resultCard`,void 0),e(this,`toast`,void 0),e(this,`overlay`,void 0),e(this,`qrDialog`,void 0),e(this,`hasResult`,!1),e(this,`_currentResult`,void 0),this.cb=t,this.factory=r,this.formatter=i,this.tabs=r.createTabs(),this.queryPanel=r.createPanel(),this.bookmarkPanel=r.createPanel();let a=this.queryPanel.asContainer();this.input=r.createInput(a),this.fetchBtn=r.createButton(a);let o=this.bookmarkPanel.asContainer();this.bookmarkCard=r.createCard(o),this.resultCard=r.createCard(a),this.toast=r.createToast(),this.overlay=new n,this.qrDialog=new d({title:`扫码下载棋谱`,hint:`截图或长按二维码识别后即可下载SGF文件`})}initialize(){this.tabs.setConfig({items:[{id:`query`,label:`🔍 抓取`},{id:`bookmarks`,label:`⭐ 收藏`}],activeId:`query`}),this.tabs.onChange(e=>{this.queryPanel.setVisible(e===`query`),this.bookmarkPanel.setVisible(e===`bookmarks`),this.resultCard.setVisible(e===`query`&&this.hasResult)}),this.queryPanel.setTitle(`📋 分享链接`),this.input.setConfig({type:`textarea`,placeholder:`支持：野狐、弈城、OGS、101围棋、弈客、元萝卜、腾讯围棋等平台...`,clearable:!0}),this.input.onEnter(e=>{e.trim()&&this.cb.onFetch(e.trim())}),this.fetchBtn.setText(`🔍 抓取棋谱`),this.fetchBtn.onClick(()=>{let e=this.input.getValue().trim();e&&this.cb.onFetch(e)}),this.bookmarkPanel.setTitle(`⭐ 我的收藏`),this.bookmarkPanel.addAction&&this.bookmarkPanel.addAction(`🗑️ 清空`,`clearBookmarks`),this.bookmarkPanel.onAction(e=>{e===`clearBookmarks`&&this.cb.onClearBookmarks()}),this.bookmarkPanel.setVisible(!1),this.resultCard.setVisible(!1),this.overlay.hide()}bindActions(){this.bookmarkCard.onAction((e,t)=>{e===`viewBookmark`&&t!=null&&t.id&&this.cb.onViewBookmark(t.id)}),this.resultCard.onAction(e=>{e===`download`?this.cb.onDownload():e===`view`?this.cb.onViewSGF():e===`share`&&this.cb.onGenerateShareUrl()})}switchToQueryTab(){this.tabs.setActiveId(`query`),this.queryPanel.setVisible(!0),this.bookmarkPanel.setVisible(!1),this.resultCard.setVisible(this.hasResult)}setInputValue(e){this.input.setValue(e)}showClipboardHint(){let e=this.queryPanel.asContainer(),t=e.querySelector(`.clipboard-hint`);t&&t.remove();let n=document.createElement(`div`);n.className=`clipboard-hint`,n.style.cssText=`font-size:12px;color:#38a169;margin-top:8px;display:flex;align-items:center;gap:4px;`,n.innerHTML=`<span>✓</span><span>已自动填入剪贴板内容</span>`;let r=this.input.getContainer();r!=null&&r.nextSibling?e.insertBefore(n,r.nextSibling):e.appendChild(n)}showLoading(e,t){e?(this.fetchBtn.setLoading(!0),this.input.setDisabled(!0),this.resultCard.setTitle(`⏳ 抓取中`),this.resultCard.setContent(this.formatter.formatLoading(t)),this.resultCard.setVisible(!0),this.resultCard.render()):(this.fetchBtn.setLoading(!1),this.fetchBtn.setText(`🔍 抓取棋谱`),this.input.setDisabled(!1))}showError(e,t){return this.resultCard.setTitle(`❌ 抓取失败`),this.resultCard.setContent(this.formatter.formatError(e,t)),this.resultCard.setVisible(!0),this.resultCard.render(),this.formatter.formatError(e,t)}showResult(e){this.hasResult=!0,this._currentResult=e,this.resultCard.setTitle(`📄 棋谱信息`),this.resultCard.setContent(this.formatter.formatResultInfo(e)),this.resultCard.setVisible(!0),this.resultCard.render()}getCurrentResult(){return this._currentResult}setCurrentResult(e){this._currentResult=e}renderBookmarks(e){if(e.length===0)this.bookmarkCard.setContent(this.formatter.formatEmptyState());else{let t=e.slice(0,20).map(e=>this.formatter.formatBookmarkItem(e));this.bookmarkCard.setContent(t.join(`
`))}this.bookmarkCard.render()}async showQRCodeDialog(e){var t=this;e.success&&e.shareUrl&&await t.qrDialog.show(e.shareUrl)}render(){this.tabs.render(),this.queryPanel.render(),this.bookmarkPanel.render(),this.resultCard.render()}destroy(){this.tabs.destroy(),this.queryPanel.destroy(),this.bookmarkPanel.destroy(),this.resultCard.destroy(),this.toast.destroy(),this.overlay.destroy(),this.qrDialog.destroy(),this.hasResult=!1,this._currentResult=void 0}},p=class{constructor(t){var n;e(this,`locale`,void 0),this.locale=(n=t==null?void 0:t.locale)==null?`zh-CN`:n}formatLoading(e){return`
      <div style="text-align:center; padding:40px 20px;">
        <div style="
          width:40px; height:40px; border:3px solid #e0e0e0; border-top-color:#667eea;
          border-radius:50%; margin:0 auto 12px;
          animation: fetcher-spin 1s linear infinite;
        "></div>
        <p style="color:#888;">${e||`正在抓取棋谱，请稍候...`}</p>
      </div>
      <style>
        @keyframes fetcher-spin { to { transform: rotate(360deg); } }
      </style>
    `}formatError(e,t){return`
      <div style="background:#fff5f5; border:1px solid #feb2b2; border-radius:8px; padding:16px;">
        <div style="color:#c53030; font-weight:600; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
          <span>⚠️</span>
          <span>${e}</span>
        </div>
        <div style="color:#742a2a; font-size:14px;">${t}</div>
      </div>
    `}formatResultInfo(e){let t=e.metadata.black||`未知`,n=e.metadata.white||`未知`;e.metadata.date;let r=e.metadata.movesCount||0,i=a(e.metadata.result);return`
      <span style="display:inline-block; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:white; padding:2px 10px; border-radius:12px; font-size:12px; font-weight:500; margin-bottom:12px;">${this.formatSource(e.source)}</span>
      <div style="background:#f8f9fa; border-radius:8px; padding:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0;">
          <span style="font-weight:600; color:#333;">⚫ ${t}</span>
          <span style="color:#999;">vs</span>
          <span style="font-weight:600; color:#333;">⚪ ${n}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:8px 0 4px 0; border-top:1px solid #e0e0e0; font-size:0.9em; color:#666;">
          <span>${i}</span>
          <span>${r}手</span>
        </div>
      </div>
      <div style="display:flex; gap:8px; margin-top:16px;">
        <div data-action="download" style="flex:1; background:linear-gradient(135deg,#48bb78 0%,#38a169 100%); color:white; padding:12px; border-radius:8px; text-align:center; cursor:pointer; font-size:15px;">📥 下载</div>
        <div data-action="view" style="flex:1; background:#f0f0f0; color:#333; padding:12px; border-radius:8px; text-align:center; cursor:pointer; font-size:15px;">👁️ 查看</div>
        <div data-action="share" style="flex:1; background:#f0f0f0; color:#333; padding:12px; border-radius:8px; text-align:center; cursor:pointer; font-size:15px;">📱 分享</div>
      </div>
    `}formatEmptyState(){return`
      <div style="text-align:center; padding:40px 20px; color:#888;">
        <div style="font-size:3em; margin-bottom:12px; opacity:0.5;">📭</div>
        <div>暂无收藏记录</div>
        <div style="font-size:0.85em; margin-top:4px;">粘贴分享链接开始抓取棋谱</div>
      </div>
    `}formatBookmarkItem(e){let t=e.black||`未知`,n=e.white||`未知`,r=a(e.result),i=this.formatSource(e.source),o=e.date||`未知时间`,s=e.movesCount||0;return`
      <div data-action="viewBookmark" data-id="${e.id}" style="padding:10px 0; border-top:1px solid #eee; cursor:pointer;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="display:inline-block; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:white; padding:2px 8px; border-radius:10px; font-size:11px; font-weight:500;">${i}</span>
          <span style="font-size:0.8em; color:#888;">${o}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:600; color:#333;">⚫ ${t}</span>
          <span style="color:#999;">vs</span>
          <span style="font-weight:600; color:#333;">⚪ ${n}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:0.85em; color:#666;">
          <span>${r&&r!==`-`?r:``}</span>
          <span>${s>0?s+`手`:``}</span>
        </div>
      </div>
    `}formatSource(e){return{foxwq:`野狐`,eweiqi:`弈城`,ogs:`OGS`,"101weiqi":`101围棋`,yikeweiqi:`弈客`,yuanluobo:`元萝卜`,txwq:`腾讯围棋`,unknown:`未知`}[e]||e}formatRelativeTime(e){let t=Date.now()-e,n=Math.floor(t/1e3),r=Math.floor(n/60),i=Math.floor(r/60),a=Math.floor(i/24);return a>7?this.formatDate(e):a>0?`${a}天前`:i>0?`${i}小时前`:r>0?`${r}分钟前`:`刚刚`}formatDate(e){return new Date(e).toLocaleDateString(this.locale,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`})}generateGameName(e){return`${e.metadata.black||`未知`}_vs_${e.metadata.white||`未知`}`}},m=[/foxwq\.com/i,/online-go\.com/i,/101weiqi\.com/i,/yikeweiqi\.com/i,/yuanluobo\.com/i,/19x19\.com/i,/izis\.cn/i,/eweiqi\.com/i,/txwq\.qq\.com/i,/h5\.txwq\.qq\.com/i,/xinboduiyi\.com/i,/dzqzd\.com/i];async function h(){let e=new t;return e.isAvailable()?_(await e.readText()):null}function g(e){var t;if(!e)return null;let n=e.trim();if(/^https?:\/\//i.test(n))return n;let r=e.match(/(https?:\/\/[^\s"'<>]+)/i);return(t=r==null?void 0:r[1])==null?null:t}function _(e){let t=g(e);return t&&v(t)?t:null}function v(e){return m.some(t=>t.test(e))}var y=class{constructor(t){e(this,`title`,`棋谱下载`),e(this,`fetcherApp`,void 0),e(this,`logger`,void 0),e(this,`toast`,void 0),e(this,`renderer`,void 0),e(this,`formatter`,void 0),e(this,`_onNavigate`,void 0),e(this,`initialized`,!1),e(this,`bookmarks`,[]),e(this,`currentResult`,void 0),this.fetcherApp=t.fetcherApp,this.logger=t.logger,t.onNavigate!==void 0&&(this._onNavigate=t.onNavigate),this.toast=t.adapterFactory.createToast(),this.formatter=new p;let n={onFetch:e=>this.fetchByUrl(e),onViewBookmark:e=>this.viewBookmark(e),onClearBookmarks:()=>this.clearBookmarks(),onDownload:()=>this.downloadSGF(),onViewSGF:()=>this.viewSGF(),onGenerateShareUrl:()=>this.generateShareUrl()};this.renderer=new f(n,t.adapterFactory,this.formatter)}async initialize(){var e=this;e.initialized||(e.renderer.initialize(),e.renderer.bindActions(),await e.loadBookmarks(),await e.checkClipboardForUrl(),e.initialized=!0,e.logger.info(`FetcherPage initialized`))}handleParams(e){e.url&&(this.renderer.setInputValue(e.url),this.fetchByUrl(e.url))}render(){this.renderer.render()}destroy(){this.renderer.destroy(),this.toast.destroy(),this.bookmarks=[],this.currentResult=void 0,this.initialized=!1,this.logger.info(`FetcherPage destroyed`)}async checkClipboardForUrl(){var e=this;let t=await h();t&&(e.renderer.setInputValue(t),e.renderer.showClipboardHint(),e.logger.info(`剪贴板 URL 已自动填充`,{url:t}))}async loadBookmarks(){var e=this;try{e.bookmarks=await e.fetcherApp.getBookmarks(),e.renderer.renderBookmarks(e.bookmarks)}catch(t){e.logger.error(`加载收藏失败`,t),e.bookmarks=[]}}async clearBookmarks(){var e=this;try{await e.fetcherApp.clearBookmarks(),e.bookmarks=[],e.renderer.renderBookmarks(e.bookmarks)}catch(t){e.logger.error(`清除收藏失败`,t)}}async viewBookmark(e){var t=this;let n=t.bookmarks.find(t=>t.id===e);if(!n)return;t.renderer.switchToQueryTab(),t.renderer.setInputValue(n.url);let r={success:!0,archiveId:n.archiveId,source:n.source,url:n.url,metadata:{black:n.black,white:n.white,date:n.date,movesCount:n.movesCount},fromCache:!0};n.result!==void 0&&(r.metadata.result=n.result),t.currentResult=r,t.renderer.showResult(r),t.renderer.setCurrentResult(r)}async fetchByUrl(e){var t=this;t.renderer.showLoading(!0,`正在抓取棋谱...`),t.currentResult=void 0;try{let n=await t.fetcherApp.fetch(e);t.renderer.showLoading(!1),n.success?(t.currentResult=n,t.renderer.showResult(n),t.renderer.setCurrentResult(n),await t.loadBookmarks(),t.logger.info(`棋谱下载成功`,{url:e,archiveId:n.archiveId})):(t.renderer.showError(t.getErrorTitle(n.error),n.error||`未知错误`),t.logger.warn(`棋谱下载失败`,{url:e,error:n.error}))}catch(n){t.renderer.showLoading(!1),t.renderer.showError(`网络错误`,n instanceof Error?n.message:`未知错误`),t.logger.error(`棋谱下载异常`,n,{url:e})}}async downloadSGF(){var e=this,t;if((t=e.currentResult)!=null&&t.archiveId)try{let t=e.formatter.generateGameName(e.currentResult);await e.fetcherApp.downloadSGF(e.currentResult.archiveId,t)}catch(t){e.logger.error(`下载SGF失败`,t)}}async viewSGF(){var e=this,t;!((t=e.currentResult)!=null&&t.archiveId)||!e._onNavigate||e._onNavigate(`replay`,{archiveId:e.currentResult.archiveId})}async generateShareUrl(){var e=this,t;if((t=e.currentResult)!=null&&t.archiveId)try{let t=await e.fetcherApp.generateShareUrl(e.currentResult.archiveId);t.success?await e.renderer.showQRCodeDialog(t):e.logger.warn(t.error||`分享链接生成失败`)}catch(t){e.logger.error(`生成分享链接失败`,t)}}getErrorTitle(e){let t={INPUT_EMPTY:`输入为空`,INPUT_ERROR:`输入错误`,UNSUPPORTED_URL:`不支持的链接`,TIMEOUT_ERROR:`请求超时`,FETCH_ERROR:`下载失败`,AUTH_ERROR:`认证失败`,SERVER_ERROR:`服务器错误`,NETWORK_ERROR:`网络错误`};if(!e)return`下载失败`;for(let[n,r]of Object.entries(t))if(e.includes(n))return r;return`下载失败`}},b=class{constructor(t,n,r,i){e(this,`gameService`,void 0),e(this,`exportService`,void 0),e(this,`favoriteService`,void 0),e(this,`shareService`,void 0),e(this,`CATEGORY`,`fetcher`),this.gameService=t,this.exportService=n,this.favoriteService=r,this.shareService=i}async fetch(e){var t=this;let n=await t.gameService.fetch(e),r=t.transformResult(n);return r.success&&t.favoriteService&&(r.bookmarkId=await t.favoriteService.addFavorite(t.CATEGORY,e,t.extractBookmarkData(r),`${r.metadata.black} vs ${r.metadata.white}`)),r}async getBookmarks(){var e=this;return e.favoriteService?(await e.favoriteService.getFavorites({category:e.CATEGORY})).map(e.toBookmark):[]}async clearBookmarks(){var e=this,t;await((t=e.favoriteService)==null?void 0:t.clear(e.CATEGORY))}async removeBookmark(e){var t=this,n;await((n=t.favoriteService)==null?void 0:n.removeFavorite(e))}async isBookmarked(e){var t=this,n,r;return(n=(r=t.favoriteService)==null?void 0:r.isFavorited(t.CATEGORY,e))==null?!1:n}async getArchiveContent(e){return this.gameService.getByArchiveId(e)}async downloadSGF(e,t){var n=this;let r=await n.gameService.getByArchiveId(e);return r?n.exportService.exportSGF(r,t):{success:!1,error:`棋谱内容未找到`}}async generateShareUrl(e){var t=this;if(!t.shareService)return{success:!1,error:`分享服务未配置`};let n=await t.gameService.getByArchiveId(e);if(!n)return{success:!1,error:`棋谱内容未找到`};let r=s(n);if(r.moves.length===0)return{success:!1,error:`棋谱解析失败或无手数`};let i=r.moves.map(e=>{let t=o(e.coord);return{color:e.color,x:t.x,y:t.y}}),a=t.shareService.generateShareUrl(i,r.gameInfo.boardSize,r.gameInfo.handicap);return a?{success:!0,shareUrl:a}:{success:!1,error:`分享链接生成失败`}}transformResult(e){var t,n,r,i,a,o,s,c,l;let u={success:e.success,archiveId:e.archiveId,source:e.source,url:e.url,metadata:{black:(t=(n=e.metadata)==null?void 0:n.blackName)==null?``:t,white:(r=(i=e.metadata)==null?void 0:i.whiteName)==null?``:r,date:(a=(o=e.metadata)==null?void 0:o.date)==null?``:a,movesCount:(s=(c=e.metadata)==null?void 0:c.movesCount)==null?0:s},fromCache:e.fromCache};return e.archiveId!==void 0&&(u.archiveId=e.archiveId),e.error!==void 0&&(u.error=e.error),((l=e.metadata)==null?void 0:l.result)!==void 0&&(u.metadata.result=e.metadata.result),u}extractBookmarkData(e){return{archiveId:e.archiveId,source:e.source,black:e.metadata.black,white:e.metadata.white,result:e.metadata.result,date:e.metadata.date,movesCount:e.metadata.movesCount}}toBookmark(e){var t,n,r,i,a,o,s,c,l,u,d,f,p;let m={id:e.id,url:e.key,archiveId:(t=(n=e.data)==null?void 0:n.archiveId)==null?``:t,source:(r=(i=e.data)==null?void 0:i.source)==null?`unknown`:r,black:(a=(o=e.data)==null?void 0:o.black)==null?``:a,white:(s=(c=e.data)==null?void 0:c.white)==null?``:s,date:(l=(u=e.data)==null?void 0:u.date)==null?``:l,movesCount:(d=(f=e.data)==null?void 0:f.movesCount)==null?0:d,updatedAt:e.createdAt},h=(p=e.data)==null?void 0:p.result;return h!==void 0&&(m.result=h),m}},x=class{static encode(e,t=19,n=0){if(e.length===0)return null;let r=new Uint8Array([this.MAGIC,this.VERSION,t,n]),i=new Uint8Array(e.length*2);for(let t=0;t<e.length;t++){let n=e[t],r=+(n.color===`W`);i[t*2]=r<<7|n.x&127,i[t*2+1]=n.y&255}let a=new Uint8Array(r.length+i.length);return a.set(r),a.set(i,r.length),this.base64UrlSafeEncode(a)}static decode(e){try{let t=this.base64UrlSafeDecode(e),n=t[0];t[1];let r=t[2],i=t[3];if(n!==this.MAGIC)throw Error(`Invalid data format`);let a=[];for(let e=4;e<t.length&&!(e+1>=t.length);e+=2){let n=t[e],r=t[e+1],i=n&128?`W`:`B`,o=n&127,s=r;a.push({color:i,x:o,y:s})}return{boardSize:r==null?19:r,handicap:i==null?0:i,moves:a}}catch(e){return null}}static toSGF(e){let t=`abcdefghijklmnopqrs`,n=`(;GM[1]FF[4]SZ[${e.boardSize}]CA[UTF-8]AP[WeiqiRecorder]KM[0]`;for(let a of e.moves){var r,i;let e=((r=t[a.x])==null?`a`:r)+((i=t[a.y])==null?`a`:i);n+=`;${a.color}[${e}]`}return n+=`)`,n}static base64UrlSafeEncode(e){return btoa(String.fromCharCode(...Array.from(e))).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=/g,``)}static base64UrlSafeDecode(e){let t=e.replace(/-/g,`+`).replace(/_/g,`/`),n=t+`=`.repeat((4-t.length%4)%4);return Uint8Array.from(atob(n),e=>e.charCodeAt(0))}};e(x,`MAGIC`,87),e(x,`VERSION`,1);var S=class{constructor(t){e(this,`baseUrl`,void 0),this.baseUrl=t==null?`https://weiqi-dev.github.io/weiqi-assets/share/`:t}generateShareUrl(e,t,n){let r=x.encode(e,t,n);return r?this.baseUrl+`?d=`+r:null}decodeShareUrl(e){try{let t=new URL(e).searchParams.get(`d`);return t?this.decodeParam(t):null}catch(e){return null}}decodeParam(e){return x.decode(e)}toSGF(e){return x.toSGF(e)}};async function C(){let e=await r.init({containerId:`page-root`,moduleConfigs:{game:{enableCache:!0,maxHistorySize:100}}}),t=new c(new l),{gameService:n}=await i(e),a=new S(`https://weiqi-dev.github.io/weiqi-assets/share/`),o=new y({fetcherApp:new b(n,t,e.favoriteService,a),logger:e.logger,adapterFactory:e.adapterFactory,onNavigate:(e,t)=>{if(e===`replay`){let e=new URLSearchParams(t);window.location.href=`../replay/index.html?${e.toString()}`}}});await o.initialize();let s=new URLSearchParams(window.location.search),u=s.get(`auto`),d={};if(s.forEach((e,t)=>{t!==`auto`&&(d[t]=e)}),u===`true`&&Object.keys(d).length>0){let e=Object.keys(d).length>0?`${window.location.pathname}?${new URLSearchParams(d).toString()}`:window.location.pathname;window.history.replaceState({},``,e),o.handleParams(d)}else Object.keys(d).length>0&&o.handleParams(d);o.render(),e.logger.info(`FetcherPage 已启动`)}C().catch(console.error);
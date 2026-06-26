import"../modulepreload-polyfill-BVSDYCMZ.js";/* empty css               */import{t as e}from"../Bootstrap-DN4fuqQs.js";import{o as t}from"../FavoriteService-D-_Lo8Jb.js";var n=class{constructor(e,n,r){t(this,`cb`,void 0),t(this,`factory`,void 0),t(this,`formatter`,void 0),t(this,`menuCard`,void 0),t(this,`hasRendered`,!1),this.cb=e,this.factory=n,this.formatter=r,this.menuCard=n.createCard()}initialize(){this.menuCard.setConfig({elevation:`none`,padding:`none`})}bindActions(){this.menuCard.onAction(e=>{if(e.startsWith(`navigate:`)){let t=e.split(`:`)[1];t&&this.cb.onNavigate(t)}})}render(){this.hasRendered||(this.menuCard.setContent(this.formatter.formatWelcome()),this.hasRendered=!0),this.menuCard.render()}renderMenu(e){let t=e.slice(0,4),n=e.slice(4);this.menuCard.setContent(this.formatter.formatHomePage(t,n)),this.menuCard.render(),this.hasRendered=!0}renderHomePage(e,t){this.menuCard.setContent(this.formatter.formatHomePage(e,t)),this.menuCard.render(),this.hasRendered=!0}destroy(){this.menuCard.destroy(),this.hasRendered=!1}},r=class{constructor(e){t(this,`title`,`首页`),t(this,`onNavigate`,void 0),t(this,`renderer`,void 0),t(this,`initialized`,!1),t(this,`quickEntryItems`,[{id:`joseki`,label:`围棋定式`,icon:`📚`,description:`探索AI定式，提升棋力`},{id:`play`,label:`围棋对弈`,icon:`🎮`,description:`人机对战、真人对战`},{id:`review`,label:`AI 复盘`,icon:`🔍`,description:`AI分析棋谱，恶手检测`},{id:`recorder`,label:`记谱工具`,icon:`📝`,description:`记录对局，保存棋谱`},{id:`fetcher`,label:`棋谱抓取`,icon:`📥`,description:`粘贴链接下载棋谱`}]),t(this,`gridItems`,[{id:`assistant`,label:`AI 助手`,icon:`🤖`,description:`自然语言对话`},{id:`player`,label:`棋手`,icon:`👤`,description:`棋手等级分信息`},{id:`opponent`,label:`对手`,icon:`📊`,description:`对手分析`},{id:`event`,label:`赛事`,icon:`🏆`,description:`赛事查询`},{id:`decision`,label:`选点`,icon:`🎯`,description:`实战选点题`}]),t(this,`menuItems`,[...this.quickEntryItems,...this.gridItems]),this.onNavigate=e.onNavigate,this.renderer=new n({onNavigate:e=>this.handleNavigate(e)},e.adapterFactory,e.formatter)}async initialize(){var e=this;e.initialized||(e.renderer.initialize(),e.renderer.bindActions(),e.renderer.renderMenu(e.menuItems),e.initialized=!0,console.info(`[HomePage] initialized`))}handleParams(e){}handleNavigate(e){console.info(`[HomePage] navigating to: ${e}`),this.onNavigate&&this.onNavigate(e)}render(){this.renderer.render()}destroy(){this.renderer.destroy(),this.initialized=!1}},i=class{constructor(){t(this,`gridIconClasses`,{assistant:`assistant`,player:`player`,opponent:`opponent`,event:`event`,decision:`decision`})}formatWelcome(){return``}formatMenuItem(e){return this.formatQuickEntryCard(e)}formatMenuList(e){return this.formatHomePage(e.slice(0,4),e.slice(4))}formatQuickEntryCard(e){return`
      <div class="quick-entry-card" data-action="navigate:${e.id}">
        <div class="quick-card-icon">${e.icon}</div>
        <div class="quick-card-content">
          <div class="quick-card-title">${e.label}</div>
          <div class="quick-card-desc">${e.description}</div>
        </div>
        <div class="quick-card-arrow">›</div>
      </div>
    `}formatQuickEntrySection(e){return`
      <div class="section-label">快捷入口</div>
      ${e.map(e=>this.formatQuickEntryCard(e)).join(``)}
    `}formatFunctionGrid(e){return`
      <div class="section-label">更多功能</div>
      <div class="function-grid">
        ${e.map(e=>{let t=this.gridIconClasses[e.id]||``;return`
        <div class="grid-item" data-action="navigate:${e.id}">
          <div class="grid-icon ${t}">${e.icon}</div>
          <div class="grid-label">${e.label}</div>
        </div>
      `}).join(``)}
      </div>
    `}formatHomePage(e,t){return`
      <div class="home-page-content">
        ${this.formatQuickEntrySection(e)}
        ${this.formatFunctionGrid(t)}
      </div>
    `}};async function a(){let t=await e.init({containerId:`page-root`,moduleConfigs:{}}),n=new i,a=new r({logger:t.logger,adapterFactory:t.adapterFactory,formatter:n,onNavigate:e=>{e===`assistant`?window.location.href=`../assistant/index.html`:e===`player`?window.location.href=`../player/index.html`:e===`opponent`?window.location.href=`../opponent/index.html`:e===`event`?window.location.href=`../event/index.html`:e===`joseki`?window.location.href=`../joseki/index.html`:e===`decision`?window.location.href=`../decision/index.html`:e===`play`?window.location.href=`../play/index.html`:e===`recorder`?window.location.href=`../recorder/index.html`:e===`fetcher`?window.location.href=`../fetcher/index.html`:e===`review`&&(window.location.href=`../review/index.html`)}});await a.initialize(),a.render(),console.info(`HomePage 已启动`)}a().catch(console.error);
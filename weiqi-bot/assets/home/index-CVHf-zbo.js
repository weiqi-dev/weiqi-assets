import{i as e,n as t,t as n}from"../tokens-BHe27y45.js";var r=class{constructor(t,n,r){e(this,`cb`,void 0),e(this,`factory`,void 0),e(this,`formatter`,void 0),e(this,`menuCard`,void 0),e(this,`hasRendered`,!1),this.cb=t,this.factory=n,this.formatter=r,this.menuCard=n.createCard()}initialize(){this.menuCard.setConfig({elevation:`none`,padding:`none`})}bindActions(){this.menuCard.onAction(e=>{if(e.startsWith(`navigate:`)){let t=e.split(`:`)[1];t&&this.cb.onNavigate(t)}})}render(){this.hasRendered||(this.menuCard.setContent(this.formatter.formatWelcome()),this.hasRendered=!0),this.menuCard.render()}renderMenu(e){this.menuCard.setContent(this.formatter.formatMenuList(e)),this.menuCard.render(),this.hasRendered=!0}destroy(){this.menuCard.destroy(),this.hasRendered=!1}},i=class{constructor(t){e(this,`title`,`首页`),e(this,`logger`,void 0),e(this,`onNavigate`,void 0),e(this,`renderer`,void 0),e(this,`initialized`,!1),e(this,`menuItems`,[{id:`player`,label:`棋手查询`,icon:`👤`,description:`查询棋手等级分信息`},{id:`event`,label:`赛事查询`,icon:`🏆`,description:`查看围棋赛事信息`}]),this.logger=t.logger,this.onNavigate=t.onNavigate,this.renderer=new r({onNavigate:e=>this.handleNavigate(e)},t.adapterFactory,t.formatter)}async initialize(){var e=this;e.initialized||(e.renderer.initialize(),e.renderer.bindActions(),e.renderer.renderMenu(e.menuItems),e.initialized=!0,e.logger.info(`[HomePage] initialized`))}handleParams(e){}handleNavigate(e){this.logger.info(`[HomePage] navigating to: ${e}`),this.onNavigate&&this.onNavigate(e)}render(){this.renderer.render()}destroy(){this.renderer.destroy(),this.initialized=!1}},{colors:a,spacing:o,radius:s,fontSize:c,shadows:l}=n,u=class{formatWelcome(){return``}formatMenuItem(e){return`
      <div
        data-action="navigate:${e.id}"
        style="
          width: 45%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: ${o.lg}px;
          background: ${a.bgCard};
          border-radius: ${s.xl}px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
          margin-bottom: ${o.md}px;
        "
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.35)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.25)';"
      >
        <span style="font-size: 48px; margin-bottom: ${o.md}px;">${e.icon}</span>
        <span style="font-size: ${c.lg}px; font-weight: 600; color: ${a.text}; margin-bottom: ${o.xs}px;">${e.label}</span>
        <span style="font-size: ${c.xs}px; color: ${a.textHint}; text-align: center;">${e.description}</span>
      </div>
    `}formatMenuList(e){let t=e.map(e=>this.formatMenuItem(e)).join(`
`);return`
      <div style="
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: ${o.md}px;
      ">
        ${t}
      </div>
    `}};async function d(){let e=await t.init({containerId:`page-root`,moduleConfigs:{}}),n=new u,r=new i({logger:e.logger,adapterFactory:e.adapterFactory,formatter:n,onNavigate:e=>{e===`player`?window.location.href=`../player/index.html`:e===`event`&&(window.location.href=`../event/index.html`)}});await r.initialize(),r.render(),e.logger.info(`HomePage 已启动`)}d().catch(console.error);
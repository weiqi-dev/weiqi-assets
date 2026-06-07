function e(){let e=document.createElement(`div`);e.className=`dialog-overlay`;let t=document.createElement(`div`);return t.className=`dialog`,t.setAttribute(`role`,`dialog`),t.setAttribute(`aria-modal`,`true`),e.appendChild(t),{overlay:e,dialog:t}}function t(e){document.body.appendChild(e),e.offsetWidth,e.classList.add(`show`)}function n(e,t){e.classList.remove(`show`),e.parentNode&&e.parentNode.removeChild(e),t==null||t()}var r={alert(r,i={}){return new Promise(a=>{var o,s;let{overlay:c,dialog:l}=e(),u=(o=i.title)==null?`提示`:o,d=(s=i.okText)==null?`知道了`:s;l.innerHTML=`
        <div class="dialog-title"></div>
        <div class="dialog-message"></div>
        <div class="dialog-btn-group">
          <button class="dialog-btn primary" data-act="ok"></button>
        </div>
      `,l.querySelector(`.dialog-title`).textContent=u,l.querySelector(`.dialog-message`).textContent=r,l.querySelector(`[data-act="ok"]`).textContent=d;let f=e=>{(e.key===`Escape`||e.key===`Enter`)&&(e.preventDefault(),p())},p=()=>{document.removeEventListener(`keydown`,f),n(c),a()};l.querySelector(`[data-act="ok"]`).addEventListener(`click`,p),document.addEventListener(`keydown`,f),t(c),l.querySelector(`[data-act="ok"]`).focus()})},confirm(r,i={}){return new Promise(a=>{var o,s,c;let{overlay:l,dialog:u}=e(),d=(o=i.title)==null?`确认`:o,f=(s=i.confirmText)==null?`确定`:s,p=(c=i.cancelText)==null?`取消`:c;u.innerHTML=`
        <div class="dialog-title"></div>
        <div class="dialog-message"></div>
        <div class="dialog-btn-group">
          <button class="dialog-btn secondary" data-act="cancel"></button>
          <button class="dialog-btn primary" data-act="ok"></button>
        </div>
      `,u.querySelector(`.dialog-title`).textContent=d,u.querySelector(`.dialog-message`).textContent=r,u.querySelector(`[data-act="ok"]`).textContent=f,u.querySelector(`[data-act="cancel"]`).textContent=p;let m=e=>{document.removeEventListener(`keydown`,h),n(l),a(e)},h=e=>{e.key===`Escape`?(e.preventDefault(),m(!1)):e.key===`Enter`&&(e.preventDefault(),m(!0))};u.querySelector(`[data-act="ok"]`).addEventListener(`click`,()=>m(!0)),u.querySelector(`[data-act="cancel"]`).addEventListener(`click`,()=>m(!1)),l.addEventListener(`click`,e=>{e.target===l&&m(!1)}),document.addEventListener(`keydown`,h),t(l),u.querySelector(`[data-act="ok"]`).focus()})}};export{r as t};
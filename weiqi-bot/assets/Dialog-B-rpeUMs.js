function e(){let e=document.createElement(`div`);e.className=`dialog-overlay`;let t=document.createElement(`div`);return t.className=`dialog`,t.setAttribute(`role`,`dialog`),t.setAttribute(`aria-modal`,`true`),e.appendChild(t),{overlay:e,dialog:t}}function t(e){document.body.appendChild(e),e.offsetWidth,e.classList.add(`show`)}function n(e,t){e.classList.remove(`show`),e.parentNode&&e.parentNode.removeChild(e),t==null||t()}var r={alert(r,i={}){return new Promise(a=>{var o,s;let{overlay:c,dialog:l}=e(),u=(o=i.title)==null?`提示`:o,d=(s=i.okText)==null?`知道了`:s;l.innerHTML=`
        <div class="dialog-title"></div>
        <div class="dialog-message"></div>
        <div class="dialog-btn-group">
          <button class="dialog-btn primary" data-act="ok"></button>
        </div>
      `,l.querySelector(`.dialog-title`).textContent=u,l.querySelector(`.dialog-message`).textContent=r;let f=l.querySelector(`[data-act="ok"]`);f.textContent=d;let p=e=>{(e.key===`Escape`||e.key===`Enter`)&&(e.preventDefault(),m())},m=()=>{f.removeEventListener(`click`,m),document.removeEventListener(`keydown`,p),n(c),a()};f.addEventListener(`click`,m),document.addEventListener(`keydown`,p),t(c),f.focus()})},confirm(r,i={}){return new Promise(a=>{var o,s,c;let{overlay:l,dialog:u}=e(),d=(o=i.title)==null?`确认`:o,f=(s=i.confirmText)==null?`确定`:s,p=(c=i.cancelText)==null?`取消`:c;u.innerHTML=`
        <div class="dialog-title"></div>
        <div class="dialog-message"></div>
        <div class="dialog-btn-group">
          <button class="dialog-btn secondary" data-act="cancel"></button>
          <button class="dialog-btn primary" data-act="ok"></button>
        </div>
      `,u.querySelector(`.dialog-title`).textContent=d,u.querySelector(`.dialog-message`).textContent=r;let m=u.querySelector(`[data-act="ok"]`),h=u.querySelector(`[data-act="cancel"]`);m.textContent=f,h.textContent=p;let g=e=>{m.removeEventListener(`click`,_),h.removeEventListener(`click`,v),l.removeEventListener(`click`,y),document.removeEventListener(`keydown`,b),n(l),a(e)},_=()=>g(!0),v=()=>g(!1),y=e=>{e.target===l&&g(!1)},b=e=>{e.key===`Escape`?(e.preventDefault(),g(!1)):e.key===`Enter`&&(e.preventDefault(),g(!0))};m.addEventListener(`click`,_),h.addEventListener(`click`,v),l.addEventListener(`click`,y),document.addEventListener(`keydown`,b),t(l),m.focus()})}};export{r as t};
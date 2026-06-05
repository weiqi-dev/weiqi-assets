import{c as e}from"./FavoriteService-CqGqGpov.js";var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,t)=>{let r={};for(var i in e)n(r,i,{get:e[i],enumerable:!0});return t||n(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},u=(e,r,i)=>(i=e==null?{}:t(a(e)),l(r||!e||!e.__esModule?n(i,`default`,{value:e,enumerable:!0}):i,e)),d=c({MODULE_DIRS:()=>f,getWebRoot:()=>p,toAbsoluteUrl:()=>m}),f=[`play`,`review`,`joseki`,`event`,`player`,`assistant`,`home`,`fetcher`,`recorder`,`replay`,`opponent`,`decision`];function p(){let e=window.location.pathname.split(`/`).filter(e=>e!==``);for(let t=e.length-1;t>=0;t--)if(f.includes(e[t])){let n=e.slice(0,t);return n.length===0?`/`:`/`+n.join(`/`)+`/`}return`/`}function m(e){return e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`/`)?e:p()+e}var h={easy:50,medium:100,hard:200},g=class{constructor(t=`medium`){e(this,`difficulty`,void 0),this.difficulty=t}getDifficulty(){return this.difficulty}setDifficulty(e){this.difficulty=e}getVisits(){return h[this.difficulty]}static getOptions(){return[`easy`,`medium`,`hard`]}static getVisitsMap(){return{...h}}},_=class{constructor(t,n=`medium`){e(this,`engine`,void 0),e(this,`difficultyManager`,void 0),e(this,`thinking`,!1),e(this,`canceled`,!1),e(this,`modelId`,null),e(this,`modelUrl`,null),e(this,`initialized`,!1),this.engine=t==null?null:t,this.difficultyManager=new g(n)}async init(e,t,n){var r=this;if(r.modelId=e,r.modelUrl=t==null?`/models/${e}.bin.gz`:t,!r.engine)throw console.error(`[AIController] AI engine not provided`),Error(`AI engine not provided. Please inject via constructor.`);try{await r.engine.init({modelUrl:r.modelUrl,onProgress:n}),r.initialized=!0}catch(e){throw console.error(`[AIController] engine.init() failed:`,e),e}}async genmove(e,t,n,r,i,a){var o=this;o.thinking=!0,o.canceled=!1;try{var s;let c=a?new g(a).getVisits():o.difficultyManager.getVisits(),l=await o.callAnalyze(e,t,n,r,i,c);if(o.canceled||!l.moves.length)return null;let u=(s=l.moves.find(e=>e.order===1))==null?l.moves[0]:s;return{x:u.x,y:u.y}}finally{o.thinking=!1}}async analyze(e,t,n,r,i,a,o,s){var c=this;let l=a==null?c.difficultyManager.getVisits():a,u=await c.callAnalyze(e,t,n,r,i,l,o,s);return{winRate:u.rootWinRate,scoreLead:u.rootScoreLead,topMoves:u.moves.map(e=>({x:e.x,y:e.y,winRate:e.winRate,scoreLead:e.scoreLead,visits:e.visits,pv:e.pv}))}}async countTerritory(e,t,n){return(await this.callAnalyze(e,null,`black`,t,n,100)).rootScoreLead}cancel(){this.canceled=!0}isThinking(){return this.thinking}setDifficulty(e){this.difficultyManager.setDifficulty(e)}getDifficulty(){return this.difficultyManager.getDifficulty()}isInitialized(){return this.initialized}destroy(){this.engine=null,this.initialized=!1,this.modelId=null,this.modelUrl=null,this.thinking=!1,this.canceled=!1}getModelId(){return this.modelId}async callAnalyze(e,t,n,r,i,a,o,s){var c=this,l;c.ensureInitialized();let u={modelUrl:(l=c.modelUrl)==null?`/models/${c.modelId}.bin.gz`:l,board:e,currentPlayer:n,moveHistory:r.map(e=>({x:e.x,y:e.y,player:e.player})),komi:i,visits:a,maxTimeMs:o==null?3e4:o};return t&&(u.previousBoard=t),s!==void 0&&(u.analysisPvLen=s),c.engine.analyze(u)}ensureInitialized(){if(!this.initialized||!this.engine)throw Error(`AIController not initialized. Call init() first.`)}},v=1e-7,y=1e-4,b=class{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}},x=class{refCount(e){return S(`refCount`)}incRef(e){return S(`incRef`)}timerAvailable(){return!0}time(e){return S(`time`)}read(e){return S(`read`)}readSync(e){return S(`readSync`)}readToGPU(e,t){return S(`readToGPU`)}numDataIds(){return S(`numDataIds`)}disposeData(e,t){return S(`disposeData`)}write(e,t,n){return S(`write`)}move(e,t,n,r,i){return S(`move`)}createTensorFromGPUData(e,t,n){return S(`createTensorFromGPUData`)}memory(){return S(`memory`)}floatPrecision(){return S(`floatPrecision`)}epsilon(){return this.floatPrecision()===32?v:y}dispose(){return S(`dispose`)}};function S(e){throw Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}function C(e){let t=e.length,n=0;for(;t>0;)n=Math.random()*t|0,t--,E(e,t,n)}function w(e,t,n){return Math.max(e,Math.min(t,n))}function T(e){return e%2==0?e:e+1}function E(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function D(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n];return t}function O(e,t){if(!e)throw Error(typeof t==`string`?t:t())}function ee(e,t,n=``){O(A(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function te(e){O(e!=null,()=>`The input to the tensor constructor must be a non-null value.`)}function k(e){if(e.length===0)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function A(e,t){if(e===t)return!0;if(e==null||t==null||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function ne(e){return e%1==0}function re(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function ie(e,t){return t<=e.length?e:e+` `.repeat(t-e.length)}function ae(e,t=e=>0,n,r){return new Promise((i,a)=>{let o=0,s=()=>{if(e()){i();return}o++;let c=t(o);if(n!=null&&o>=n){a();return}r==null?setTimeout(s,c):r(s,c)};s()})}function oe(e,t){let n=1,r=-1;for(let t=0;t<e.length;++t)if(e[t]>=0)n*=e[t];else if(e[t]===-1){if(r!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${t}`);r=t}else if(e[t]<0)throw Error(`Shapes can not be < 0. Found ${e[t]} at dim ${t}`);if(r===-1){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(n===0)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);let i=e.slice();return i[r]=t/n,i}function j(e,t){let n=t.length;return e=e==null?t.map((e,t)=>t):[].concat(e),O(e.every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),O(e.every(e=>ne(e)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?n+e:e)}function se(e,t){let n=[],r=[],i=t!=null&&Array.isArray(t)&&t.length===0,a=t==null||i?null:j(t,e).sort(),o=0;for(let t=0;t<e.length;++t){if(a!=null){if(a[o]===t&&e[t]!==1)throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(a[o]==null||a[o]>t)&&e[t]===1&&(n.push(e[t]),r.push(t)),a[o]<=t&&o++}e[t]!==1&&(n.push(e[t]),r.push(t))}return{newShape:n,keptDims:r}}function ce(e,t){return le(e,t)}function le(e,t){let n=null;if(e==null||e===`float32`)n=new Float32Array(t);else if(e===`int32`)n=new Int32Array(t);else if(e===`bool`)n=new Uint8Array(t);else if(e===`string`)n=Array(t);else throw Error(`Unknown data type ${e}`);return n}function ue(e,t){for(let n=0;n<e.length;n++){let r=e[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${t} being uploaded contains ${r}.`)}}function de(e){return e===`bool`||e===`complex64`||e===`float32`||e===`int32`||e===`string`}function fe(e,t){return!(t===`complex64`||t===`float32`&&e!==`complex64`||t===`int32`&&e!==`float32`&&e!==`complex64`||t===`bool`&&e===`bool`)}function pe(e){if(e===`float32`||e===`int32`)return 4;if(e===`complex64`)return 8;if(e===`bool`)return 1;throw Error(`Unknown dtype ${e}`)}function me(e){if(e==null)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function he(e){return typeof e==`string`||e instanceof String}function ge(e){return typeof e==`boolean`}function _e(e){return typeof e==`number`}function ve(e){return Array.isArray(e)?ve(e[0]):e instanceof Float32Array?`float32`:e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray?`int32`:_e(e)?`float32`:he(e)?`string`:ge(e)?`bool`:`float32`}function ye(e){return!!(e&&e.constructor&&e.call&&e.apply)}function be(e,t){for(let n=t;n<e;++n)if(e%n===0)return n;return e}function M(e){let t=e.length;if(t<2)return[];let n=Array(t-1);n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}function xe(e,t,n,r=!1){let i=[];if(t.length===1){let a=t[0]*(r?2:1);for(let t=0;t<a;t++)i[t]=n[e+t]}else{let a=t[0],o=t.slice(1),s=o.reduce((e,t)=>e*t)*(r?2:1);for(let t=0;t<a;t++)i[t]=xe(e+t*s,o,n,r)}return i}function Se(e,t,n=!1){if(e.length===0)return t[0];let r=e.reduce((e,t)=>e*t)*(n?2:1);if(r===0)return[];if(r!==t.length)throw Error(`[${e}] does not match the input size ${t.length}${n?` for a complex tensor`:``}.`);return xe(0,e,t,n)}function Ce(e,t){if(Array.isArray(e))return e;if(t===`float32`)return e instanceof Float32Array?e:new Float32Array(e);if(t===`int32`)return e instanceof Int32Array?e:new Int32Array(e);if(t===`bool`||t===`string`)return Uint8Array.from(new Int32Array(e));throw Error(`Unknown dtype ${t}`)}function we(e,t){let n=Te(e,t);for(let e=0;e<n.length;e++)n[e]=1;return n}function Te(e,t){if(t==null||t===`float32`||t===`complex64`)return new Float32Array(e);if(t===`int32`)return new Int32Array(e);if(t===`bool`)return new Uint8Array(e);throw Error(`Unknown data type ${t}`)}function Ee(e,t){let n=e.reduce((e,t)=>e*t,1);if(t==null||t===`float32`)return Se(e,new Float32Array(n));if(t===`int32`)return Se(e,new Int32Array(n));if(t===`bool`)return Se(e,new Uint8Array(n));throw Error(`Unknown data type ${t}`)}function De(e){e.forEach(t=>{O(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function Oe(e,t,n){if(t===0)return 0;if(t===1)return e[0];let r=e[e.length-1];for(let t=0;t<e.length-1;++t)r+=n[t]*e[t];return r}function ke(e,t,n){if(t===0)return[];if(t===1)return[e];let r=Array(t);for(let t=0;t<r.length-1;++t)r[t]=Math.floor(e/n[t]),e-=r[t]*n[t];return r[r.length-1]=e,r}function Ae(e){return e&&e.then&&typeof e.then==`function`}var je=`tfjsflags`,Me=class{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=Ne,this.populateURLFlags()}setPlatform(e,t){this.platform!=null&&(N().getBool(`IS_TEST`)||N().getBool(`PROD`)||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`)),this.platformName=e,this.platform=t}registerFlag(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},this.urlFlags[e]!=null){let t=this.urlFlags[e];N().getBool(`IS_TEST`)||N().getBool(`PROD`)||console.warn(`Setting feature override from URL ${e}: ${t}.`),this.set(e,t)}}async getAsync(e){var t=this;return e in t.flags||(t.flags[e]=await t.evaluateFlag(e)),t.flags[e]}get(e){if(e in this.flags)return this.flags[e];let t=this.evaluateFlag(e);if(Ae(t))throw Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(this.flagRegistry[e]==null)throw Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(this.flagRegistry[e]==null)throw Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(this.global===void 0||this.global.location===void 0||this.global.location.search===void 0)return;let e=this.getQueryParams(this.global.location.search);je in e&&e[je].split(`,`).forEach(e=>{let[t,n]=e.split(`:`);this.urlFlags[t]=Fe(t,n)})}};function Ne(e){let t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...n)=>(Pe(t,n[0],n[1]),n.join(`=`))),t}function Pe(e,t,n){e[decodeURIComponent(t)]=decodeURIComponent(n||``)}function Fe(e,t){let n=t.toLowerCase();return n===`true`||n===`false`?n===`true`:`${+n}`===n?+n:t}function N(){return Ie}var Ie=null;function Le(e){Ie=e}var Re;function ze(){if(Re==null){let e;if(typeof window<`u`)e=window;else if(typeof global<`u`)e=global;else if(typeof process<`u`)e=process;else if(typeof self<`u`)e=self;else throw Error(`Could not find a global object`);Re=e}return Re}function Be(){let e=ze();return e._tfGlobals==null&&(e._tfGlobals=new Map),e._tfGlobals}function Ve(e,t){let n=Be();if(n.has(e))return n.get(e);{let r=t();return n.set(e,r),n.get(e)}}var He=`Acos`,Ue=`Acosh`,We=`AddN`,Ge=`ArgMax`,Ke=`ArgMin`,qe=`Asin`,Je=`Asinh`,Ye=`Atan`,Xe=`Atanh`,Ze=`Atan2`,Qe=`AvgPool`,$e=`AvgPoolGrad`,et=`AvgPool3D`,tt=`AvgPool3DGrad`,nt=`BatchMatMul`,rt=`BatchToSpaceND`,it=`Bincount`,at=`BitwiseAnd`,ot=`BroadcastTo`,st=`BroadcastArgs`,ct=`Cast`,lt=`Ceil`,ut=`ClipByValue`,dt=`Complex`,ft=`ComplexAbs`,pt=`Concat`,mt=`Conv2D`,ht=`Conv2DBackpropFilter`,gt=`Conv2DBackpropInput`,_t=`Conv3D`,vt=`Conv3DBackpropFilterV2`,yt=`Conv3DBackpropInputV2`,bt=`Cosh`,xt=`Cumprod`,St=`Cumsum`,Ct=`CropAndResize`,wt=`DenseBincount`,Tt=`DepthToSpace`,Et=`DepthwiseConv2dNative`,Dt=`DepthwiseConv2dNativeBackpropFilter`,Ot=`DepthwiseConv2dNativeBackpropInput`,kt=`Diag`,At=`Dilation2D`,jt=`Dilation2DBackpropInput`,Mt=`Dilation2DBackpropFilter`,Nt=`Draw`,Pt=`RealDiv`,Ft=`Einsum`,It=`EluGrad`,Lt=`Equal`,Rt=`ExpandDims`,zt=`Expm1`,Bt=`Fill`,Vt=`FlipLeftRight`,Ht=`Floor`,Ut=`FloorDiv`,Wt=`FusedBatchNorm`,Gt=`GatherV2`,Kt=`GatherNd`,qt=`Greater`,Jt=`GreaterEqual`,Yt=`Identity`,Xt=`IFFT`,Zt=`Imag`,Qt=`IsFinite`,$t=`IsInf`,en=`IsNan`,tn=`LeakyRelu`,nn=`Less`,rn=`LessEqual`,an=`LinSpace`,on=`Log1p`,sn=`LogicalAnd`,cn=`LogicalNot`,ln=`LogicalOr`,un=`LogSoftmax`,dn=`LRNGrad`,fn=`Maximum`,pn=`MaxPool`,mn=`MaxPoolGrad`,hn=`MaxPool3D`,gn=`MaxPool3DGrad`,_n=`MaxPoolWithArgmax`,vn=`Mean`,yn=`Minimum`,bn=`MirrorPad`,xn=`Multinomial`,Sn=`Multiply`,Cn=`NotEqual`,wn=`NonMaxSuppressionV3`,Tn=`NonMaxSuppressionV4`,En=`NonMaxSuppressionV5`,Dn=`OnesLike`,On=`OneHot`,kn=`Pack`,An=`PadV2`,jn=`Prelu`,Mn=`Prod`,Nn=`RaggedGather`,Pn=`RaggedRange`,Fn=`RaggedTensorToTensor`,In=`Range`,Ln=`Real`,Rn=`Reciprocal`,zn=`Relu`,Bn=`Reshape`,Vn=`ResizeNearestNeighbor`,Hn=`ResizeNearestNeighborGrad`,Un=`ResizeBilinear`,Wn=`ResizeBilinearGrad`,Gn=`Relu6`,Kn=`Reverse`,qn=`Round`,Jn=`Rsqrt`,Yn=`ScatterNd`,Xn=`TensorScatterUpdate`,Zn=`SearchSorted`,Qn=`Select`,$n=`Selu`,er=`Slice`,tr=`Sinh`,nr=`Sign`,rr=`Sigmoid`,ir=`Softplus`,ar=`Sqrt`,or=`SpaceToBatchND`,sr=`SplitV`,cr=`Softmax`,lr=`SparseFillEmptyRows`,ur=`SparseReshape`,dr=`SparseSegmentMean`,fr=`SparseSegmentSum`,pr=`SparseToDense`,mr=`SquaredDifference`,hr=`Square`,gr=`StaticRegexReplace`,_r=`StridedSlice`,vr=`StringNGrams`,yr=`StringSplit`,br=`StringToHashBucketFast`,xr=`Tanh`,Sr=`Tile`,Cr=`TopK`,wr=`Transform`,Tr=`Transpose`,Er=`Unique`,Dr=`Unpack`,Or=`UnsortedSegmentSum`,kr=`ZerosLike`,Ar=`Step`,jr=`FromPixels`,Mr=`RotateWithOffset`,Nr=`_FusedMatMul`,Pr=`FusedConv2D`,Fr=`FusedDepthwiseConv2D`;function Ir(...e){N().getBool(`IS_TEST`)||N().getBool(`PROD`)||console.warn(...e)}function Lr(...e){N().getBool(`IS_TEST`)||N().getBool(`PROD`)||console.log(...e)}var Rr=Ve(`kernelRegistry`,()=>new Map),zr=Ve(`gradRegistry`,()=>new Map);function Br(e,t){let n=Gr(e,t);return Rr.get(n)}function Vr(e){return zr.get(e)}function Hr(e){let t=Rr.entries(),n=[];for(;;){let{done:r,value:i}=t.next();if(r)break;let[a,o]=i,[s]=a.split(`_`);s===e&&n.push(o)}return n}function Ur(e){let{kernelName:t,backendName:n}=e,r=Gr(t,n);Rr.has(r)&&Ir(`The kernel '${t}' for backend '${n}' is already registered`),Rr.set(r,e)}function Wr(e){let{kernelName:t}=e;zr.has(t)&&N().getBool(`DEBUG`)&&Ir(`Overriding the gradient for '${t}'`),zr.set(t,e)}function Gr(e,t){return`${t}_${e}`}function Kr(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}var qr=u(s(((e,t)=>{t.exports=r;var n=null;try{n=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(e){}function r(e,t,n){this.low=e|0,this.high=t|0,this.unsigned=!!n}r.prototype.__isLong__,Object.defineProperty(r.prototype,`__isLong__`,{value:!0});function i(e){return(e&&e.__isLong__)===!0}r.isLong=i;var a={},o={};function s(e,t){var n,r,i;return t?(e>>>=0,(i=0<=e&&e<256)&&(r=o[e],r)?r:(n=l(e,(e|0)<0?-1:0,!0),i&&(o[e]=n),n)):(e|=0,(i=-128<=e&&e<128)&&(r=a[e],r)?r:(n=l(e,e<0?-1:0,!1),i&&(a[e]=n),n))}r.fromInt=s;function c(e,t){if(isNaN(e))return t?b:y;if(t){if(e<0)return b;if(e>=g)return T}else{if(e<=-_)return E;if(e+1>=_)return w}return e<0?c(-e,t).neg():l(e%h|0,e/h|0,t)}r.fromNumber=c;function l(e,t,n){return new r(e,t,n)}r.fromBits=l;var u=Math.pow;function d(e,t,n){if(e.length===0)throw Error(`empty string`);if(e===`NaN`||e===`Infinity`||e===`+Infinity`||e===`-Infinity`)return y;if(typeof t==`number`?(n=t,t=!1):t=!!t,n=n||10,n<2||36<n)throw RangeError(`radix`);var r;if((r=e.indexOf(`-`))>0)throw Error(`interior hyphen`);if(r===0)return d(e.substring(1),t,n).neg();for(var i=c(u(n,8)),a=y,o=0;o<e.length;o+=8){var s=Math.min(8,e.length-o),l=parseInt(e.substring(o,o+s),n);if(s<8){var f=c(u(n,s));a=a.mul(f).add(c(l))}else a=a.mul(i),a=a.add(c(l))}return a.unsigned=t,a}r.fromString=d;function f(e,t){return typeof e==`number`?c(e,t):typeof e==`string`?d(e,t):l(e.low,e.high,typeof t==`boolean`?t:e.unsigned)}r.fromValue=f;var p=65536,m=1<<24,h=p*p,g=h*h,_=g/2,v=s(m),y=s(0);r.ZERO=y;var b=s(0,!0);r.UZERO=b;var x=s(1);r.ONE=x;var S=s(1,!0);r.UONE=S;var C=s(-1);r.NEG_ONE=C;var w=l(-1,2147483647,!1);r.MAX_VALUE=w;var T=l(-1,-1,!0);r.MAX_UNSIGNED_VALUE=T;var E=l(0,-2147483648,!1);r.MIN_VALUE=E;var D=r.prototype;D.toInt=function(){return this.unsigned?this.low>>>0:this.low},D.toNumber=function(){return this.unsigned?(this.high>>>0)*h+(this.low>>>0):this.high*h+(this.low>>>0)},D.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError(`radix`);if(this.isZero())return`0`;if(this.isNegative())if(this.eq(E)){var t=c(e),n=this.div(t),r=n.mul(t).sub(this);return n.toString(e)+r.toInt().toString(e)}else return`-`+this.neg().toString(e);for(var i=c(u(e,6),this.unsigned),a=this,o=``;;){var s=a.div(i),l=(a.sub(s.mul(i)).toInt()>>>0).toString(e);if(a=s,a.isZero())return l+o;for(;l.length<6;)l=`0`+l;o=``+l+o}},D.getHighBits=function(){return this.high},D.getHighBitsUnsigned=function(){return this.high>>>0},D.getLowBits=function(){return this.low},D.getLowBitsUnsigned=function(){return this.low>>>0},D.getNumBitsAbs=function(){if(this.isNegative())return this.eq(E)?64:this.neg().getNumBitsAbs();for(var e=this.high==0?this.low:this.high,t=31;t>0&&!(e&1<<t);t--);return this.high==0?t+1:t+33},D.isZero=function(){return this.high===0&&this.low===0},D.eqz=D.isZero,D.isNegative=function(){return!this.unsigned&&this.high<0},D.isPositive=function(){return this.unsigned||this.high>=0},D.isOdd=function(){return(this.low&1)==1},D.isEven=function(){return(this.low&1)==0},D.equals=function(e){return i(e)||(e=f(e)),this.unsigned!==e.unsigned&&this.high>>>31==1&&e.high>>>31==1?!1:this.high===e.high&&this.low===e.low},D.eq=D.equals,D.notEquals=function(e){return!this.eq(e)},D.neq=D.notEquals,D.ne=D.notEquals,D.lessThan=function(e){return this.comp(e)<0},D.lt=D.lessThan,D.lessThanOrEqual=function(e){return this.comp(e)<=0},D.lte=D.lessThanOrEqual,D.le=D.lessThanOrEqual,D.greaterThan=function(e){return this.comp(e)>0},D.gt=D.greaterThan,D.greaterThanOrEqual=function(e){return this.comp(e)>=0},D.gte=D.greaterThanOrEqual,D.ge=D.greaterThanOrEqual,D.compare=function(e){if(i(e)||(e=f(e)),this.eq(e))return 0;var t=this.isNegative(),n=e.isNegative();return t&&!n?-1:!t&&n?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},D.comp=D.compare,D.negate=function(){return!this.unsigned&&this.eq(E)?E:this.not().add(x)},D.neg=D.negate,D.add=function(e){i(e)||(e=f(e));var t=this.high>>>16,n=this.high&65535,r=this.low>>>16,a=this.low&65535,o=e.high>>>16,s=e.high&65535,c=e.low>>>16,u=e.low&65535,d=0,p=0,m=0,h=0;return h+=a+u,m+=h>>>16,h&=65535,m+=r+c,p+=m>>>16,m&=65535,p+=n+s,d+=p>>>16,p&=65535,d+=t+o,d&=65535,l(m<<16|h,d<<16|p,this.unsigned)},D.subtract=function(e){return i(e)||(e=f(e)),this.add(e.neg())},D.sub=D.subtract,D.multiply=function(e){if(this.isZero())return y;if(i(e)||(e=f(e)),n)return l(n.mul(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned);if(e.isZero())return y;if(this.eq(E))return e.isOdd()?E:y;if(e.eq(E))return this.isOdd()?E:y;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(v)&&e.lt(v))return c(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,r=this.high&65535,a=this.low>>>16,o=this.low&65535,s=e.high>>>16,u=e.high&65535,d=e.low>>>16,p=e.low&65535,m=0,h=0,g=0,_=0;return _+=o*p,g+=_>>>16,_&=65535,g+=a*p,h+=g>>>16,g&=65535,g+=o*d,h+=g>>>16,g&=65535,h+=r*p,m+=h>>>16,h&=65535,h+=a*d,m+=h>>>16,h&=65535,h+=o*u,m+=h>>>16,h&=65535,m+=t*p+r*d+a*u+o*s,m&=65535,l(g<<16|_,m<<16|h,this.unsigned)},D.mul=D.multiply,D.divide=function(e){if(i(e)||(e=f(e)),e.isZero())throw Error(`division by zero`);if(n)return!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1?this:l((this.unsigned?n.div_u:n.div_s)(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned);if(this.isZero())return this.unsigned?b:y;var t,r,a;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return b;if(e.gt(this.shru(1)))return S;a=b}else{if(this.eq(E))return e.eq(x)||e.eq(C)?E:e.eq(E)?x:(t=this.shr(1).div(e).shl(1),t.eq(y)?e.isNegative()?x:C:(r=this.sub(e.mul(t)),a=t.add(r.div(e)),a));if(e.eq(E))return this.unsigned?b:y;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();a=y}for(r=this;r.gte(e);){t=Math.max(1,Math.floor(r.toNumber()/e.toNumber()));for(var o=Math.ceil(Math.log(t)/Math.LN2),s=o<=48?1:u(2,o-48),d=c(t),p=d.mul(e);p.isNegative()||p.gt(r);)t-=s,d=c(t,this.unsigned),p=d.mul(e);d.isZero()&&(d=x),a=a.add(d),r=r.sub(p)}return a},D.div=D.divide,D.modulo=function(e){return i(e)||(e=f(e)),n?l((this.unsigned?n.rem_u:n.rem_s)(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},D.mod=D.modulo,D.rem=D.modulo,D.not=function(){return l(~this.low,~this.high,this.unsigned)},D.and=function(e){return i(e)||(e=f(e)),l(this.low&e.low,this.high&e.high,this.unsigned)},D.or=function(e){return i(e)||(e=f(e)),l(this.low|e.low,this.high|e.high,this.unsigned)},D.xor=function(e){return i(e)||(e=f(e)),l(this.low^e.low,this.high^e.high,this.unsigned)},D.shiftLeft=function(e){return i(e)&&(e=e.toInt()),(e&=63)==0?this:e<32?l(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):l(0,this.low<<e-32,this.unsigned)},D.shl=D.shiftLeft,D.shiftRight=function(e){return i(e)&&(e=e.toInt()),(e&=63)==0?this:e<32?l(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):l(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},D.shr=D.shiftRight,D.shiftRightUnsigned=function(e){if(i(e)&&(e=e.toInt()),e&=63,e===0)return this;var t=this.high;if(e<32){var n=this.low;return l(n>>>e|t<<32-e,t>>>e,this.unsigned)}else if(e===32)return l(t,0,this.unsigned);else return l(t>>>e-32,0,this.unsigned)},D.shru=D.shiftRightUnsigned,D.shr_u=D.shiftRightUnsigned,D.toSigned=function(){return this.unsigned?l(this.low,this.high,!1):this},D.toUnsigned=function(){return this.unsigned?this:l(this.low,this.high,!0)},D.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},D.toBytesLE=function(){var e=this.high,t=this.low;return[t&255,t>>>8&255,t>>>16&255,t>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]},D.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,t>>>24,t>>>16&255,t>>>8&255,t&255]},r.fromBytes=function(e,t,n){return n?r.fromBytesLE(e,t):r.fromBytesBE(e,t)},r.fromBytesLE=function(e,t){return new r(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},r.fromBytesBE=function(e,t){return new r(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)}}))()),Jr=qr.default||qr;function Yr(e){return Jr.fromString(e,!0,16)}var Xr=Yr(`c3a5c85c97cb3127`),Zr=Yr(`b492b66fbe98f273`),Qr=Yr(`9ae16a3b2f90404f`);function $r(e){return e.xor(e.shru(47))}function ei(e,t,n){let r=e.slice(t,t+n);return Jr.fromBytes(Array.from(r),!0,!0)}function ti(e,t){return ei(e,t,8)}function ni(e,t){return ei(e,t,4)}function ri(e,t){return t===0?e:e.shru(t).or(e.shl(64-t))}function ii(e,t,n=Yr(`9ddfea08eb382d69`)){let r=e.xor(t).mul(n);r=r.xor(r.shru(47));let i=t.xor(r).mul(n);return i=i.xor(i.shru(47)),i=i.mul(n),i}function ai(e,t,n,r,i,a){i=i.add(e),a=ri(a.add(i).add(r),21);let o=i;return i=i.add(t),i=i.add(n),a=a.add(ri(i,44)),[i.add(r),a.add(o)]}function oi(e,t,n,r){return ai(ti(e,t),ti(e,t+8),ti(e,t+16),ti(e,t+24),n,r)}function si(e,t=e.length){if(t>=8){let n=Qr.add(t*2),r=ti(e,0).add(Qr),i=ti(e,t-8);return ii(ri(i,37).mul(n).add(r),ri(r,25).add(i).mul(n),n)}if(t>=4){let n=Qr.add(t*2);return ii(ni(e,0).shl(3).add(t),ni(e,t-4),n)}if(t>0){let n=e[0],r=e[t>>1],i=e[t-1],a=n+(r<<8),o=t+(i<<2);return $r(Qr.mul(a).xor(Xr.mul(o))).mul(Qr)}return Qr}function ci(e,t=e.length){let n=Qr.add(t*2),r=ti(e,0).mul(Zr),i=ti(e,8),a=ti(e,t-8).mul(n),o=ti(e,t-16).mul(Qr);return ii(ri(r.add(i),43).add(ri(a,30)).add(o),r.add(ri(i.add(Qr),18)).add(a),n)}function li(e,t=e.length){let n=Qr.add(t*2),r=ti(e,0).mul(Qr),i=ti(e,8),a=ti(e,t-8).mul(n),o=ti(e,t-16).mul(Qr),s=ri(r.add(i),43).add(ri(a,30)).add(o),c=ii(s,r.add(ri(i.add(Qr),18)).add(a),n),l=ti(e,16).mul(n),u=ti(e,24),d=s.add(ti(e,t-32)).mul(n),f=c.add(ti(e,t-24)).mul(n);return ii(ri(l.add(u),43).add(ri(d,30)).add(f),l.add(ri(u.add(r),18)).add(d),n)}function ui(e,t=e.length){let n=Jr.fromNumber(81,!0);if(t<=32)return t<=16?si(e,t):ci(e,t);if(t<=64)return li(e,t);let r=n,i=n.mul(Zr).add(113),a=$r(i.mul(Qr).add(113)).mul(Qr),o=[Jr.UZERO,Jr.UZERO],s=[Jr.UZERO,Jr.UZERO];r=r.mul(Qr).add(ti(e,0));let c=0,l=(t-1>>6)*64,u=l+(t-1&63)-63;do r=ri(r.add(i).add(o[0]).add(ti(e,c+8)),37).mul(Zr),i=ri(i.add(o[1]).add(ti(e,c+48)),42).mul(Zr),r=r.xor(s[1]),i=i.add(o[0]).add(ti(e,c+40)),a=ri(a.add(s[0]),33).mul(Zr),o=oi(e,c,o[1].mul(Zr),r.add(s[0])),s=oi(e,c+32,a.add(s[1]),i.add(ti(e,c+16))),[a,r]=[r,a],c+=64;while(c!==l);let d=Zr.add(a.and(255).shl(1));return c=u,s[0]=s[0].add(t-1&63),o[0]=o[0].add(s[0]),s[0]=s[0].add(o[0]),r=ri(r.add(i).add(o[0]).add(ti(e,c+8)),37).mul(d),i=ri(i.add(o[1]).add(ti(e,c+48)),42).mul(d),r=r.xor(s[1].mul(9)),i=i.add(o[0].mul(9).add(ti(e,c+40))),a=ri(a.add(s[0]),33).mul(d),o=oi(e,c,o[1].mul(d),r.add(s[0])),s=oi(e,c+32,a.add(s[1]),i.add(ti(e,c+16))),[a,r]=[r,a],ii(ii(o[0],s[0],d).add($r(i).mul(Xr)).add(a),ii(o[1],s[1],d).add(r),d)}function di(e,t){return t===`string`?hi(e):pi([e],t)}function fi(e,t){return e instanceof Float32Array&&t===`float32`||e instanceof Int32Array&&t===`int32`||e instanceof Uint8Array&&t===`bool`}function pi(e,t){if(t===`string`)throw Error(`Cannot convert a string[] to a TypedArray`);if(Array.isArray(e)&&(e=vi(e)),N().getBool(`DEBUG`)&&ue(e,t),fi(e,t))return e;if(t==null||t===`float32`||t===`complex64`)return new Float32Array(e);if(t===`int32`)return new Int32Array(e);if(t===`bool`){let t=new Uint8Array(e.length);for(let n=0;n<t.length;++n)Math.round(e[n])!==0&&(t[n]=1);return t}else throw Error(`Unknown data type ${t}`)}function mi(){return N().platform.now()}function hi(e,t=`utf-8`){return t=t||`utf-8`,N().platform.encode(e,t)}function gi(e,t=`utf-8`){return t=t||`utf-8`,N().platform.decode(e,t)}function _i(e){return N().platform.isTypedArray==null?Kr(e):N().platform.isTypedArray(e)}function vi(e,t=[],n=!1){if(t==null&&(t=[]),typeof e==`boolean`||typeof e==`number`||typeof e==`string`||Ae(e)||e==null||_i(e)&&n)t.push(e);else if(Array.isArray(e)||_i(e))for(let r=0;r<e.length;++r)vi(e[r],t,n);else{let r=-1;for(let t of Object.keys(e))/^([1-9]+[0-9]*|0)$/.test(t)&&(r=Math.max(r,Number(t)));for(let i=0;i<=r;i++)vi(e[i],t,n)}return t}var yi=class{constructor(e,t){this.backendTimer=e,this.logger=t,t==null&&(this.logger=new xi)}profileKernel(e,t,n){let r,i=()=>{r=n()},a,o=mi();if(this.backendTimer.timerAvailable())a=this.backendTimer.time(i);else{i();for(let e of r)e.dataSync();a=Promise.resolve({kernelMs:mi()-o})}if(N().getBool(`CHECK_COMPUTATION_FOR_ERRORS`))for(let t=0;t<r.length;t++){let n=r[t];n.data().then(t=>{bi(t,n.dtype,e)})}return{kernelName:e,outputs:r,inputs:t,timeMs:a.then(e=>e.kernelMs),extraInfo:a.then(e=>e.getExtraProfileInfo==null?``:e.getExtraProfileInfo())}}logKernelProfile(e){let{kernelName:t,outputs:n,timeMs:r,inputs:i,extraInfo:a}=e;n.forEach(e=>{Promise.all([e.data(),r,a]).then(n=>{this.logger.logKernelProfile(t,e,n[0],n[1],i,n[2])})})}};function bi(e,t,n){if(t!==`float32`)return!1;for(let t=0;t<e.length;t++){let r=e[t];if(isNaN(r)||!isFinite(r))return console.warn(`Found ${r} in the result of '${n}'`),!0}return!1}var xi=class{logKernelProfile(e,t,n,r,i,a){let o=typeof r==`number`?ie(`${r}ms`,9):r.error,s=ie(e,25),c=t.rank,l=t.size,u=ie(t.shape.toString(),14),d=``;for(let e in i){let n=i[e];if(n!=null){let r=n.shape||t.shape,i=r.length;d+=`${e}: ${i}D ${i>0?r:``} `}}console.log(`%c${s}\t%c${o}\t%c${c}D ${u}\t%c${l}\t%c${d}\t%c${a}`,`font-weight:bold`,`color:red`,`color:blue`,`color: orange`,`color: green`,`color: steelblue`)}};function Si(e,t,n){let r={},i={};for(let e=0;e<t.length;e++)r[t[e].id]=!0;for(let n=0;n<e.length;n++){let a=e[n],o=a.inputs;for(let e in o){let n=o[e],s=!1;for(let e=0;e<t.length;e++)if(r[n.id]){a.outputs.forEach(e=>r[e.id]=!0),s=!0,i[a.id]=!0;break}if(s)break}}let a={};a[n.id]=!0;let o={};for(let t=e.length-1;t>=0;t--){let n=e[t],r=n.inputs;for(let e=0;e<n.outputs.length;e++)if(a[n.outputs[e].id]){for(let e in r)a[r[e].id]=!0,o[n.id]=!0;break}}let s=[];for(let t=0;t<e.length;t++){let n=e[t];if(i[n.id]&&o[n.id]){let e={};for(let t in n.inputs){let i=n.inputs[t];r[i.id]&&(e[t]=i)}let t=Object.assign({},n);t.inputs=e,t.outputs=n.outputs,s.push(t)}}return s}function Ci(e,t,n,r){for(let i=t.length-1;i>=0;i--){let a=t[i],o=[];if(a.outputs.forEach(t=>{let n=e[t.id];n==null?o.push(null):o.push(n)}),a.gradient==null)throw Error(`Cannot compute gradient: gradient function not found for ${a.kernelName}.`);let s=a.gradient(o);for(let t in a.inputs){if(!(t in s))throw Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(s)}.`);let i=n(()=>s[t]());if(i.dtype!==`float32`)throw Error(`Error in gradient for op ${a.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${i.dtype}'`);let o=a.inputs[t];if(!A(i.shape,o.shape))throw Error(`Error in gradient for op ${a.kernelName}. The gradient of input '${t}' has shape '${i.shape}', which does not match the shape of the input '${o.shape}'`);if(e[o.id]==null)e[o.id]=i;else{let t=e[o.id];e[o.id]=r(t,i),t.dispose()}}}}var wi=20,Ti=3,Ei=7;function Di(e,t,n,r){let i=M(t),a=Oi(e,t,n,i),o=t.length,s=ji(e,t,n,i,a),c=[`Tensor`];return r&&(c.push(`  dtype: ${n}`),c.push(`  rank: ${o}`),c.push(`  shape: [${t}]`),c.push(`  values:`)),c.push(s.map(e=>`    `+e).join(`
`)),c.join(`
`)}function Oi(e,t,n,r){let i=k(t),a=r[r.length-1],o=Array(a).fill(0),s=t.length,c=n===`complex64`?Mi(e):e;if(s>1)for(let e=0;e<i/a;e++){let t=e*a;for(let e=0;e<a;e++)o[e]=Math.max(o[e],ki(c[t+e],0,n).length)}return o}function ki(e,t,n){let r;return r=Array.isArray(e)?`${parseFloat(e[0].toFixed(Ei))} + ${parseFloat(e[1].toFixed(Ei))}j`:he(e)?`'${e}'`:n===`bool`?Ai(e):parseFloat(e.toFixed(Ei)).toString(),ie(r,t)}function Ai(e){return e===0?`false`:`true`}function ji(e,t,n,r,i,a=!0){let o=n===`complex64`?2:1,s=t[0],c=t.length;if(c===0)return n===`complex64`?[ki(Mi(e)[0],0,n)]:n===`bool`?[Ai(e[0])]:[e[0].toString()];if(c===1){if(s>wi){let t=Ti*o,r=Array.from(e.slice(0,t)),a=Array.from(e.slice((s-Ti)*o,s*o));return n===`complex64`&&(r=Mi(r),a=Mi(a)),[`[`+r.map((e,t)=>ki(e,i[t],n)).join(`, `)+`, ..., `+a.map((e,t)=>ki(e,i[s-Ti+t],n)).join(`, `)+`]`]}return[`[`+(n===`complex64`?Mi(e):Array.from(e)).map((e,t)=>ki(e,i[t],n)).join(`, `)+`]`]}let l=t.slice(1),u=r.slice(1),d=r[0]*o,f=[];if(s>wi){for(let t=0;t<Ti;t++){let r=t*d,a=r+d;f.push(...ji(e.slice(r,a),l,n,u,i,!1))}f.push(`...`);for(let t=s-Ti;t<s;t++){let r=t*d,a=r+d;f.push(...ji(e.slice(r,a),l,n,u,i,t===s-1))}}else for(let t=0;t<s;t++){let r=t*d,a=r+d;f.push(...ji(e.slice(r,a),l,n,u,i,t===s-1))}let p=c===2?`,`:``;f[0]=`[`+(s>0?f[0]+p:``);for(let e=1;e<f.length-1;e++)f[e]=` `+f[e]+p;let m=`,
`;for(let e=2;e<c;e++)m+=`
`;return f[f.length-1]=` `+f[f.length-1]+`]`+(a?``:m),f}function Mi(e){let t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}var Ni=class{constructor(e,t,n){if(this.dtype=t,this.shape=e.slice(),this.size=k(e),n!=null){let e=n.length;O(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if(t===`complex64`)throw Error(`complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).`);this.values=n||le(t,this.size),this.strides=M(e)}set(e,...t){t.length===0&&(t=[0]),O(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);let n=this.locToIndex(t);this.values[n]=e}get(...e){e.length===0&&(e=[0]);let t=0;for(let n of e){if(n<0||n>=this.shape[t]){let t=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw Error(t)}t++}let n=e[e.length-1];for(let t=0;t<e.length-1;++t)n+=this.strides[t]*e[t];return this.values[n]}locToIndex(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];let t=e[e.length-1];for(let n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t}indexToLoc(e){if(this.rank===0)return[];if(this.rank===1)return[e];let t=Array(this.shape.length);for(let n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return Pi().makeTensor(this.values,this.shape,this.dtype)}},Pi=null,Fi=null;function Ii(e){Pi=e}function Li(e){Fi=e}var Ri=class{constructor(e,t,n,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||`float32`,this.size=k(e),this.strides=M(e),this.dataId=n,this.id=r,this.rankType=this.rank<5?this.rank.toString():`higher`}get rank(){return this.shape.length}async buffer(){var e=this;let t=await e.data();return Fi.buffer(e.shape,e.dtype,t)}bufferSync(){return Fi.buffer(this.shape,this.dtype,this.dataSync())}async array(){var e=this;let t=await e.data();return Se(e.shape,t,e.dtype===`complex64`)}arraySync(){return Se(this.shape,this.dataSync(),this.dtype===`complex64`)}async data(){var e=this;e.throwIfDisposed();let t=Pi().read(e.dataId);if(e.dtype===`string`){let e=await t;try{return e.map(e=>gi(e))}catch(e){throw Error(`Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().`)}}return t}dataToGPU(e){return this.throwIfDisposed(),Pi().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();let e=Pi().readSync(this.dataId);if(this.dtype===`string`)try{return e.map(e=>gi(e))}catch(e){throw Error(`Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().`)}return e}async bytes(){var e=this;e.throwIfDisposed();let t=await Pi().read(e.dataId);return e.dtype===`string`?t:new Uint8Array(t.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),Pi().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw Error(`Tensor is disposed.`)}print(e=!1){return Fi.print(this,e)}clone(){return this.throwIfDisposed(),Fi.clone(this)}toString(e=!1){return Di(this.dataSync(),this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),Fi.cast(this,e)}variable(e=!0,t,n){return this.throwIfDisposed(),Pi().makeVariable(this,e,t,n)}};Object.defineProperty(Ri,Symbol.hasInstance,{value:e=>!!e&&e.data!=null&&e.dataSync!=null&&e.throwIfDisposed!=null});function P(){return Ve(`Tensor`,()=>Ri)}P();var zi=class extends Ri{constructor(e,t,n,r){super(e.shape,e.dtype,e.dataId,r),this.trainable=t,this.name=n}assign(e){if(e.dtype!==this.dtype)throw Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!A(e.shape,this.shape))throw Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);Pi().disposeTensor(this),this.dataId=e.dataId,Pi().incRef(this,null)}dispose(){Pi().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty(zi,Symbol.hasInstance,{value:e=>e instanceof Ri&&e.assign!=null&&e.assign instanceof Function});var Bi;(function(e){e.R0=`R0`,e.R1=`R1`,e.R2=`R2`,e.R3=`R3`,e.R4=`R4`,e.R5=`R5`,e.R6=`R6`})(Bi||(Bi={}));var Vi;(function(e){e.float32=`float32`,e.int32=`int32`,e.bool=`int32`,e.complex64=`complex64`})(Vi||(Vi={}));var Hi;(function(e){e.float32=`float32`,e.int32=`int32`,e.bool=`bool`,e.complex64=`complex64`})(Hi||(Hi={}));var Ui;(function(e){e.float32=`float32`,e.int32=`float32`,e.bool=`float32`,e.complex64=`complex64`})(Ui||(Ui={}));var Wi;(function(e){e.float32=`complex64`,e.int32=`complex64`,e.bool=`complex64`,e.complex64=`complex64`})(Wi||(Wi={}));var Gi={float32:Ui,int32:Vi,bool:Hi,complex64:Wi};function Ki(e,t){if(e===`string`||t===`string`){if(e===`string`&&t===`string`)return`string`;throw Error(`Can not upcast ${e} with ${t}`)}return Gi[e][t]}function qi(e){return Ki(e,`int32`)}function Ji(e){return typeof e==`object`&&!!e&&`texture`in e&&e.texture instanceof WebGLTexture}function Yi(e){return typeof GPUBuffer<`u`&&typeof e==`object`&&!!e&&`buffer`in e&&e.buffer instanceof GPUBuffer}function Xi(e,t){if(e.dtype===t.dtype)return[e,t];let n=Ki(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function Zi(e,t){return t.some(t=>t.id===e.id)}function Qi(e){let t=[];return $i(e,t,new Set),t}function $i(e,t,n){if(e==null)return;if(e instanceof Ri){t.push(e);return}if(!ea(e))return;let r=e;for(let e in r){let i=r[e];n.has(i)||(n.add(i),$i(i,t,n))}}function ea(e){return Array.isArray(e)||typeof e==`object`}function ta(e){return e.kernelName!=null}var na=class{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(let e in this.registeredVariables)this.registeredVariables[e].dispose()}},ra=class e{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new na}async ready(){var e=this;if(e.pendingBackendInit!=null)return e.pendingBackendInit.then(()=>{});if(e.backendInstance!=null)return;let t=e.getSortedBackends();for(let n=0;n<t.length;n++){let r=t[n];if(await e.initializeBackend(r).success){await e.setBackend(r);return}}throw Error(`Could not initialize any backends, all backend initializations failed.`)}get backend(){if(this.pendingBackendInit!=null)throw Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){let{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry))if(e in this.registryFactory){let{asyncInit:t}=this.initializeBackend(e);if(t)return null}else return null;return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,n=1){return e in this.registryFactory?(Ir(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:n},!0)}async setBackend(e){var t=this;if(t.registryFactory[e]==null)throw Error(`Backend name '${e}' not found in registry`);if(t.backendName=e,t.registry[e]==null){t.backendInstance=null;let{success:n,asyncInit:r}=t.initializeBackend(e);if(!(r?await n:n))return!1}return t.backendInstance=t.registry[e],t.setupRegisteredKernels(),t.profiler=new yi(t.backendInstance),!0}setupRegisteredKernels(){Hr(this.backendName).forEach(e=>{e.setupFunc!=null&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Hr(e).forEach(t=>{t.disposeFunc!=null&&t.disposeFunc(this.registry[e])})}initializeBackend(e){let t=this.registryFactory[e];if(t==null)throw Error(`Cannot initialize backend ${e}, no registration found.`);try{let n=t.factory();if(n&&!(n instanceof x)&&typeof n.then==`function`){let t=++this.pendingBackendInitId,r=n.then(n=>t<this.pendingBackendInitId?!1:(this.registry[e]=n,this.pendingBackendInit=null,!0)).catch(n=>t<this.pendingBackendInitId?!1:(this.pendingBackendInit=null,Ir(`Initialization of backend ${e} failed`),Ir(n.stack||n.message),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}else return this.registry[e]=n,{success:!0,asyncInit:!1}}catch(t){return Ir(`Initialization of backend ${e} failed`),Ir(t.stack||t.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw Error(`${e} backend not found in registry`);this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw Error(`No backend found in registry.`);return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let n=e[t],{success:r,asyncInit:i}=this.initializeBackend(n);if(i||r)return{name:n,asyncInit:i}}throw Error(`Could not initialize any backends, all backend initializations failed.`)}moveData(e,t){let n=this.state.tensorInfo.get(t),r=n.backend,i=this.readSync(t),a=r.refCount(t);r.disposeData(t,!0),n.backend=e,e.move(t,i,n.shape,n.dtype,a),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let n=null;if(t==null){if(typeof e!=`function`)throw Error(`Please provide a function to tidy()`);t=e}else{if(typeof e!=`string`&&!(e instanceof String))throw Error(`When calling with two arguments, the first argument to tidy() must be a string`);if(typeof t!=`function`)throw Error(`When calling with two arguments, the 2nd argument to tidy() must be a function`);n=e}let r;return this.scopedRun(()=>this.startScope(n),()=>this.endScope(r),()=>(r=t(),r instanceof Promise&&console.error(`Cannot return a Promise inside of tidy.`),r))}scopedRun(e,t,n){e();try{let e=n();return t(),e}catch(e){throw t(),e}}nextTensorId(){return e.nextTensorId++}nextVariableId(){return e.nextVariableId++}clone(e){let t=F.runKernel(Yt,{x:e}),n={x:e};return this.addTapeNode(this.state.activeScope.name,n,[t],e=>({x:()=>{let t={x:e};return F.runKernel(ct,t,{dtype:`float32`})}}),[],{}),t}runKernel(e,t,n){if(this.backendName==null&&this.backend,Br(e,this.backendName)==null)throw Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:n})}shouldCheckForMemLeaks(){return this.ENV.getBool(`IS_TEST`)}checkKernelForMemLeak(e,t,n){let r=this.backend.numDataIds(),i=0;n.forEach(e=>{i+=e.dtype===`complex64`?3:1});let a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],o=r-t-i-a;if(o>0)throw Error(`Backend '${this.backendName}' has an internal memory leak (${o} data ids) after running '${e}'`)}runKernelFunc(e){let t,n=[],r=this.isTapeOn(),i=this.state.numBytes,a=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let o;this.backendName==null&&this.backend;let s,c=ta(e)?e.kernelName:this.state.activeScope==null?``:this.state.activeScope.name;if(ta(e)){let{kernelName:t,inputs:i,attrs:a}=e;this.backendName==null&&this.backend;let c=Br(t,this.backendName);O(c!=null,()=>`Cannot find registered kernel '${t}' for backend '${this.backendName}'`),o=()=>{let e=this.backend.numDataIds();s=c.kernelFunc({inputs:i,attrs:a,backend:this.backend});let o=Array.isArray(s)?s:[s];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(t,e,o);let l=o.map(e=>e.rank==null?this.makeTensorFromTensorInfo(e):e);if(r){let e=this.getTensorsForGradient(t,i,l);n=this.saveTensorsForBackwardMode(e)}return l}}else{let{forwardFunc:t}=e,i=e=>{r&&(n=e.map(e=>this.keep(this.clone(e))))};o=()=>{let e=this.backend.numDataIds();s=this.tidy(()=>t(this.backend,i));let n=Array.isArray(s)?s:[s];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,e,n),n}}let{inputs:l,attrs:u}=e,d=ta(e)?null:e.backwardsFunc,f;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool(`DEBUG`)&&!this.state.profiling?t=o():(f=this.profiler.profileKernel(c,l,()=>o()),this.ENV.getBool(`DEBUG`)&&this.profiler.logKernelProfile(f),t=f.outputs)}),r&&this.addTapeNode(c,l,t,d,n,u),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-i,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-a,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(l).map(e=>l[e]==null?null:l[e].shape),outputShapes:t.map(e=>e.shape),kernelTimeMs:f.timeMs,extraInfo:f.extraInfo}),Array.isArray(s)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(e=>this.keep(this.clone(e)))}getTensorsForGradient(e,t,n){let r=Vr(e);if(r!=null){let e=r.inputsToSave||[],i=r.outputsToSave||[],a;r.saveAllInputs?(O(Array.isArray(t),()=>`saveAllInputs is true, expected inputs to be an array.`),a=Object.keys(t).map(e=>t[e])):a=e.map(e=>t[e]);let o=n.filter((e,t)=>i[t]);return a.concat(o)}return[]}makeTensor(e,t,n,r){if(e==null)throw Error(`Values passed to engine.makeTensor() are null`);n=n||`float32`,r=r||this.backend;let i=e;n===`string`&&he(e[0])&&(i=e.map(e=>hi(e)));let a=r.write(i,t,n),o=new Ri(t,n,a,this.nextTensorId());if(this.trackTensor(o,r),n===`string`){let e=this.state.tensorInfo.get(a),t=me(i);this.state.numBytes+=t-e.bytes,e.bytes=t}return o}makeTensorFromDataId(e,t,n,r){n=n||`float32`;let i={dataId:e,shape:t,dtype:n};return this.makeTensorFromTensorInfo(i,r)}makeTensorFromTensorInfo(e,t){let{dataId:n,shape:r,dtype:i}=e,a=new Ri(r,i,n,this.nextTensorId());return this.trackTensor(a,t),a}makeVariable(e,t=!0,n,r){n=n||this.nextVariableId().toString(),r!=null&&r!==e.dtype&&(e=e.cast(r));let i=new zi(e,t,n,this.nextTensorId());if(this.state.registeredVariables[i.name]!=null)throw Error(`Variable with name ${i.name} was already registered`);return this.state.registeredVariables[i.name]=i,this.incRef(i,this.backend),i}trackTensor(e,t){this.state.numTensors++,e.dtype===`string`&&this.state.numStringTensors++;let n=0;e.dtype!==`complex64`&&e.dtype!==`string`&&(n=e.size*pe(e.dtype)),this.state.numBytes+=n,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:n})),e instanceof zi||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;let t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,e.dtype===`string`&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),e.dtype!==`complex64`&&e.dtype!==`string`){let t=e.size*pe(e.dtype);this.state.numBytes-=t}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(let e in this.state.registeredVariables){let t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]}memory(){let e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons==null&&(e.reasons=[]),e.reasons.push(`Memory usage by string tensors is approximate (2 bytes per character)`)),e}async profile(e){var t=this;t.state.profiling=!0;let n=t.state.numBytes,r=t.state.numTensors;t.state.activeProfile.kernels=[],t.state.activeProfile.result=await e(),t.state.profiling=!1,t.state.activeProfile.peakBytes=Math.max(...t.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),t.state.activeProfile.newBytes=t.state.numBytes-n,t.state.activeProfile.newTensors=t.state.numTensors-r;for(let e of t.state.activeProfile.kernels)e.kernelTimeMs=await e.kernelTimeMs,e.extraInfo=await e.extraInfo;return t.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(e,t,n,r,i,a){let o={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:i},s=Vr(e);s!=null&&(r=s.gradFunc),r!=null&&(o.gradient=e=>(e=e.map((e,t)=>{if(e==null){let e=n[t],r=Te(e.size,e.dtype);return this.makeTensor(r,e.shape,e.dtype)}return e}),r(e.length>1?e:e[0],i,a))),this.state.activeTape.push(o)}keep(e){return e.kept=!0,e}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){let t={track:[],name:`unnamed scope`,id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){let t=Qi(e),n=new Set(t.map(e=>e.id));for(let e=0;e<this.state.activeScope.track.length;e++){let t=this.state.activeScope.track[e];!t.kept&&!n.has(t.id)&&t.dispose()}let r=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{!e.kept&&e.scopeId===r.id&&this.track(e)})}gradients(e,t,n,r=!1){if(O(t.length>0,()=>`gradients() received an empty list of xs.`),n!=null&&n.dtype!==`float32`)throw Error(`dy must have 'float32' dtype, but has '${n.dtype}'`);let i=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy(`forward`,e));O(i instanceof Ri,()=>`The result y returned by f() must be a tensor.`);let a=Si(this.state.activeTape,t,i);if(!r&&a.length===0&&t.length>0)throw Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.`);return this.tidy(`backward`,()=>{let e={};e[i.id]=n==null?ia(i.shape):n,Ci(e,a,e=>this.tidy(e),oa);let r=t.map(t=>e[t.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(e=>{for(let t of e.saved)t.dispose()}),this.state.activeTape=null),{value:i,grads:r}})}customGrad(e){return O(ye(e),()=>`The f passed in customGrad(f) must be a function.`),(...t)=>{O(t.every(e=>e instanceof Ri),()=>`The args passed in customGrad(f)(x1, x2,...) must all be tensors`);let n,r={};return t.forEach((e,t)=>{r[t]=e}),this.runKernelFunc({forwardFunc:(r,i)=>(n=e(...t,i),O(n.value instanceof Ri,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),O(ye(n.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),n.value),backwardsFunc:(e,r)=>{let i=n.gradFunc(e,r),a=Array.isArray(i)?i:[i];O(a.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),O(a.every(e=>e instanceof Ri),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let o={};return a.forEach((e,t)=>{o[t]=()=>e}),o},inputs:r})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)}async time(e){var t=this;let n=mi(),r=await t.backend.time(e);return r.wallMs=mi()-n,r}track(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new na;for(let e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};ra.nextTensorId=0,ra.nextVariableId=0;function ia(e){let t=we(k(e),`float32`);return F.makeTensor(t,e,`float32`)}function aa(){let e=ze();return e._tfengine==null&&(e._tfengine=new ra(new Me(e))),Le(e._tfengine.ENV),Ii(()=>e._tfengine),e._tfengine}var F=aa();function oa(e,t){let n={a:e,b:t};return F.runKernel(`Add`,n)}function sa(){return typeof navigator<`u`&&navigator!=null}var ca;function la(e){if(ca!==void 0)return ca;if(e||sa()){if(e||(e=navigator),e.product===`ReactNative`)return!0;let t=e.userAgent||e.vendor||(typeof window<`u`?window.opera:``);if(!t){let t=e;return t.userAgentData&&t.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function ua(){return typeof window<`u`&&window.document!=null||typeof WorkerGlobalScope<`u`}var da=N();da.registerFlag(`DEBUG`,()=>!1,e=>{e&&console.warn(`Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.`)}),da.registerFlag(`IS_BROWSER`,()=>ua()),da.registerFlag(`IS_NODE`,()=>typeof process<`u`&&process.versions!==void 0&&process.versions.node!==void 0),da.registerFlag(`IS_CHROME`,()=>typeof navigator<`u`&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),da.registerFlag(`IS_SAFARI`,()=>typeof navigator<`u`&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),da.registerFlag(`PROD`,()=>!1),da.registerFlag(`TENSORLIKE_CHECK_SHAPE_CONSISTENCY`,()=>da.getBool(`DEBUG`)),da.registerFlag(`DEPRECATION_WARNINGS_ENABLED`,()=>!0),da.registerFlag(`IS_TEST`,()=>!1),da.registerFlag(`CHECK_COMPUTATION_FOR_ERRORS`,()=>da.getBool(`DEBUG`)),da.registerFlag(`WRAP_TO_IMAGEBITMAP`,()=>!1),da.registerFlag(`CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU`,()=>!1),da.registerFlag(`USE_SETTIMEOUTCUSTOM`,()=>!1);function fa(e,t){let n=e;if(_i(e))return t===`string`?[]:[e.length];if(Ji(e)){let t=e.channels||`RGBA`;return[e.height,e.width*t.length]}else if(Yi(e))return[e.buffer.size/(t==null?4:pe(t))];if(!Array.isArray(e))return[];let r=[];for(;Array.isArray(n)||_i(n)&&t!==`string`;)r.push(n.length),n=n[0];return Array.isArray(e)&&N().getBool(`TENSORLIKE_CHECK_SHAPE_CONSISTENCY`)&&pa(e,r,[]),r}function pa(e,t,n){if(n=n||[],!Array.isArray(e)&&!_i(e)){O(t.length===0,()=>`Element arr[${n.join(`][`)}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}O(t.length>0,()=>`Element arr[${n.join(`][`)}] should be a primitive, but is an array of ${e.length} elements`),O(e.length===t[0],()=>`Element arr[${n.join(`][`)}] should have ${t[0]} elements, but has ${e.length} elements`);let r=t.slice(1);for(let t=0;t<e.length;++t)pa(e[t],r,n.concat(t))}function ma(e,t,n,r){if(e!==`string_or_numeric`){if(e==null)throw Error(`Expected dtype cannot be null.`);if(e!==`numeric`&&e!==t||e===`numeric`&&t===`string`)throw Error(`Argument '${n}' passed to '${r}' must be ${e} tensor, but got ${t} tensor`)}}function I(e,t,n,r=`numeric`){if(e instanceof P())return ma(r,e.dtype,t,n),e;let i=ve(e);if(i!==`string`&&[`bool`,`int32`,`float32`].indexOf(r)>=0&&(i=r),ma(r,i,t,n),e==null||!_i(e)&&!Array.isArray(e)&&typeof e!=`number`&&typeof e!=`boolean`&&typeof e!=`string`){let r=e==null?`null`:e.constructor.name;throw Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${r}'`)}let a=fa(e,i);!_i(e)&&!Array.isArray(e)&&(e=[e]);let o=i===`string`?vi(e,[],!0):pi(e,i);return F.makeTensor(o,a,i)}function ha(e,t,n,r=`numeric`){if(!Array.isArray(e))throw Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,i)=>I(e,`${t}[${i}]`,n,r))}var ga=`__op`;function L(e){let t=Object.keys(e);if(t.length!==1)throw Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let n=t[0],r=e[n];n.endsWith(`_`)&&(n=n.substring(0,n.length-1)),n+=ga;let i=(...e)=>{F.startScope(n);try{let t=r(...e);return Ae(t)&&console.error(`Cannot return a Promise inside of tidy.`),F.endScope(t),t}catch(e){throw F.endScope(null),e}};return Object.defineProperty(i,`name`,{value:n,configurable:!0}),i}function _a(e,t){let n=I(e,`real`,`complex`),r=I(t,`imag`,`complex`);ee(n.shape,r.shape,`real and imag shapes, ${n.shape} and ${r.shape}, must match in call to tf.complex().`);let i={real:n,imag:r};return F.runKernel(dt,i)}var va=L({complex_:_a});function ya(e,t,n,r){if(r==null)r=ve(e);else if(r===`complex64`)throw Error(`Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).`);if(Yi(e)||Ji(e)){if(r!==`float32`&&r!==`int32`)throw Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${r}.`);return F.backend.createTensorFromGPUData(e,t||n,r)}if(!_i(e)&&!Array.isArray(e)&&typeof e!=`number`&&typeof e!=`boolean`&&typeof e!=`string`)throw Error(`values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray`);if(t!=null){De(t);let e=k(t),r=k(n);O(e===r,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${r}`);for(let e=0;e<n.length;++e){let r=n[e],i=e===n.length-1?r!==k(t.slice(e)):!0;O(n[e]===t[e]||!i,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return!_i(e)&&!Array.isArray(e)&&(e=[e]),t=t||n,e=r===`string`?vi(e,[],!0):pi(e,r),F.makeTensor(e,t,r)}function ba(e,t,n){return ya(e,t,fa(e,n),n)}var xa=class e{static join(t){return new e(t).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,e==null||(e instanceof Array||(e=[e]),e=e.map(e=>_i(e)?e.buffer:e),e.length===0))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let n=0;n<e.length;n++){let r=e[n];n!==e.length-1&&r.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let i=t+r.byteLength;this.shards.push({buffer:r,start:t,end:i}),t=i}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(this.shards.length===0||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),t=Math.min(this.byteLength,t),t<=e))return new ArrayBuffer(0);let n=this.findShardForByte(e);if(n===-1)throw Error(`Could not find start shard for byte ${e}`);let r=t-e,i=new ArrayBuffer(r),a=new Uint8Array(i),o=0;for(let r=n;r<this.shards.length;r++){let n=this.shards[r],i=e+o-n.start,s=o,c=Math.min(t,n.end)-n.start,l=new Uint8Array(n.buffer,i,c-i);if(a.set(l,s),o+=l.length,t<n.end)break}return i}findShardForByte(e){if(this.shards.length===0||e<0||e>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function t(t){return e<t.start?-1:+(e>=t.end)}if(t(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;let n=Sa(this.shards,t);return n===-1?-1:(this.previousShardIndex=n,this.previousShardIndex)}};function Sa(e,t){let n=0,r=e.length;for(;n<=r;){let i=Math.floor((r-n)/2)+n,a=t(e[i]);if(a===0)return i;a<0?r=i:n=i+1}return-1}function Ca(){return F}function wa(){return F.memory()}function R(e,t){return F.tidy(e,t)}function Ta(e){Qi(e).forEach(e=>e.dispose())}function Ea(e){return F.keep(e)}function Da(e){return F.setBackend(e)}function Oa(){return F.ready()}function ka(e,t,n=1){return F.registerBackend(e,t,n)}function Aa(){return F.backend}var ja=4;async function Ma(e,t){let n=[],r=[],i=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);for(let a=0;a<i.length;++a){let o=i[a],s=Array.isArray(e)?e[a].tensor:e[o];if(s.dtype!==`float32`&&s.dtype!==`int32`&&s.dtype!==`bool`&&s.dtype!==`string`&&s.dtype!==`complex64`)throw Error(`Unsupported dtype in weight '${o}': ${s.dtype}`);let c={name:o,shape:s.shape,dtype:s.dtype};if(s.dtype===`string`){let e=new Promise(async e=>{let t=await s.bytes(),n=t.reduce((e,t)=>e+t.length,0)+ja*t.length,r=new Uint8Array(n),i=0;for(let e=0;e<t.length;e++){let n=t[e],a=new Uint8Array(new Uint32Array([n.length]).buffer);r.set(a,i),i+=ja,r.set(n,i),i+=n.length}e(r)});r.push(e)}else r.push(s.data());t!=null&&(c.group=t),n.push(c)}return{data:Na(await Promise.all(r)),specs:n}}function Na(e){if(e===null)throw Error(`Invalid input value: ${JSON.stringify(e)}`);let t=0,n=[];e.forEach(e=>{if(t+=e.byteLength,n.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw Error(`Unsupported TypedArray subtype: ${e.constructor.name}`)});let r=new Uint8Array(t),i=0;return n.forEach(e=>{r.set(new Uint8Array(e.buffer),i),i+=e.byteLength}),r.buffer}var Pa=typeof Buffer<`u`&&(typeof Blob>`u`||typeof atob>`u`||typeof btoa>`u`);function Fa(e){return Pa?Buffer.byteLength(e,`utf8`):new Blob([e]).size}function Ia(e){if(Pa)return Buffer.from(e).toString(`base64`);let t=new Uint8Array(e),n=``;for(let e=0,r=t.length;e<r;e++)n+=String.fromCharCode(t[e]);return btoa(n)}function La(e){if(Pa){let t=Buffer.from(e,`base64`);return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;++e)n.set([t.charCodeAt(e)],e);return n.buffer}function Ra(e){return xa.join(e)}function za(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`Expected JSON model topology, received ArrayBuffer.`);return{dateSaved:new Date,modelTopologyType:`JSON`,modelTopologyBytes:e.modelTopology==null?0:Fa(JSON.stringify(e.modelTopology)),weightSpecsBytes:e.weightSpecs==null?0:Fa(JSON.stringify(e.weightSpecs)),weightDataBytes:e.weightData==null?0:new xa(e.weightData).byteLength}}var Ba=class e{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return e.instance==null&&(e.instance=new e),e.instance}static registerSaveRouter(t){e.getInstance().saveRouters.push(t)}static registerLoadRouter(t){e.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return e.getHandlers(t,`save`)}static getLoadHandlers(t,n){return e.getHandlers(t,`load`,n)}static getHandlers(t,n,r){let i=[];return(n===`load`?e.getInstance().loadRouters:e.getInstance().saveRouters).forEach(e=>{let n=e(t,r);n!==null&&i.push(n)}),i}},Va=e=>Ba.getSaveHandlers(e),Ha=`tensorflowjs`,Ua=1,Wa=`models_store`,Ga=`model_info_store`;function Ka(){if(!N().getBool(`IS_BROWSER`))throw Error(`Failed to obtain IndexedDB factory because the current environmentis not a web browser.`);let e=typeof window>`u`?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(t==null)throw Error(`The current browser does not appear to support IndexedDB.`);return t}function qa(e){let t=e.result;t.createObjectStore(Wa,{keyPath:`modelPath`}),t.createObjectStore(Ga,{keyPath:`modelPath`})}var Ja=class{constructor(e){if(this.indexedDB=Ka(),e==null||!e)throw Error(`For IndexedDB, modelPath must not be null, undefined or empty.`);this.modelPath=e}async save(e){var t=this;if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserLocalStorage.save() does not support saving model topology in binary formats yet.`);return t.databaseAction(t.modelPath,e)}async load(){var e=this;return e.databaseAction(e.modelPath)}databaseAction(e,t){return new Promise((e,n)=>{let r=this.indexedDB.open(Ha,Ua);r.onupgradeneeded=()=>qa(r),r.onsuccess=()=>{let i=r.result;if(t==null){let t=i.transaction(Wa,`readonly`),r=t.objectStore(Wa).get(this.modelPath);r.onsuccess=()=>{if(r.result==null)return i.close(),n(Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(r.result.modelArtifacts)},r.onerror=e=>(i.close(),n(r.error)),t.oncomplete=()=>i.close()}else{t.weightData=xa.join(t.weightData);let r=za(t),a=i.transaction(Ga,`readwrite`),o=a.objectStore(Ga),s;try{s=o.put({modelPath:this.modelPath,modelArtifactsInfo:r})}catch(e){return n(e)}let c;s.onsuccess=()=>{c=i.transaction(Wa,`readwrite`);let s=c.objectStore(Wa),l;try{l=s.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:r})}catch(e){return n(e)}l.onsuccess=()=>e({modelArtifactsInfo:r}),l.onerror=e=>{o=a.objectStore(Ga);let t=o.delete(this.modelPath);t.onsuccess=()=>(i.close(),n(l.error)),t.onerror=e=>(i.close(),n(l.error))}},s.onerror=e=>(i.close(),n(s.error)),a.oncomplete=()=>{c==null?i.close():c.oncomplete=()=>i.close()}}},r.onerror=e=>n(r.error)})}};Ja.URL_SCHEME=`indexeddb://`;var Ya=e=>N().getBool(`IS_BROWSER`)&&!Array.isArray(e)&&e.startsWith(Ja.URL_SCHEME)?Xa(e.slice(Ja.URL_SCHEME.length)):null;Ba.registerSaveRouter(Ya),Ba.registerLoadRouter(Ya);function Xa(e){return new Ja(e)}function Za(e){return e.startsWith(Ja.URL_SCHEME)?e.slice(Ja.URL_SCHEME.length):e}var Qa=class{constructor(){this.indexedDB=Ka()}async listModels(){var e=this;return new Promise((t,n)=>{let r=e.indexedDB.open(Ha,Ua);r.onupgradeneeded=()=>qa(r),r.onsuccess=()=>{let e=r.result,i=e.transaction(Ga,`readonly`),a=i.objectStore(Ga).getAll();a.onsuccess=()=>{let e={};for(let t of a.result)e[t.modelPath]=t.modelArtifactsInfo;t(e)},a.onerror=t=>(e.close(),n(a.error)),i.oncomplete=()=>e.close()},r.onerror=e=>n(r.error)})}async removeModel(e){var t=this;return e=Za(e),new Promise((n,r)=>{let i=t.indexedDB.open(Ha,Ua);i.onupgradeneeded=()=>qa(i),i.onsuccess=()=>{let t=i.result,a=t.transaction(Ga,`readwrite`),o=a.objectStore(Ga),s=o.get(e),c;s.onsuccess=()=>{if(s.result==null)return t.close(),r(Error(`Cannot find model with path '${e}' in IndexedDB.`));{let i=o.delete(e),a=()=>{c=t.transaction(Wa,`readwrite`);let i=c.objectStore(Wa).delete(e);i.onsuccess=()=>n(s.result.modelArtifactsInfo),i.onerror=e=>r(s.error)};i.onsuccess=a,i.onerror=e=>(a(),t.close(),r(s.error))}},s.onerror=e=>(t.close(),r(s.error)),a.oncomplete=()=>{c==null?t.close():c.oncomplete=()=>t.close()}},i.onerror=e=>r(i.error)})}},$a=`/`,eo=`tensorflowjs_models`,to=`info`,no=`model_topology`,ro=`weight_specs`,io=`weight_data`,ao=`model_metadata`;function oo(e){return{info:[eo,e,to].join($a),topology:[eo,e,no].join($a),weightSpecs:[eo,e,ro].join($a),weightData:[eo,e,io].join($a),modelMetadata:[eo,e,ao].join($a)}}function so(e){for(let t of Object.values(e))window.localStorage.removeItem(t)}function co(e){let t=e.split($a);if(t.length<3)throw Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join($a)}function lo(e){return e.startsWith(uo.URL_SCHEME)?e.slice(uo.URL_SCHEME.length):e}var uo=class{constructor(e){if(!N().getBool(`IS_BROWSER`)||typeof window>`u`||window.localStorage===void 0)throw Error(`The current environment does not support local storage.`);if(this.LS=window.localStorage,e==null||!e)throw Error(`For local storage, modelPath must not be null, undefined or empty.`);this.modelPath=e,this.keys=oo(this.modelPath)}async save(e){var t=this;if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserLocalStorage.save() does not support saving model topology in binary formats yet.`);{let n=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),i=za(e),a=xa.join(e.weightData);try{t.LS.setItem(t.keys.info,JSON.stringify(i)),t.LS.setItem(t.keys.topology,n),t.LS.setItem(t.keys.weightSpecs,r),t.LS.setItem(t.keys.weightData,Ia(a));let o={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:e.signature==null?void 0:e.signature,userDefinedMetadata:e.userDefinedMetadata==null?void 0:e.userDefinedMetadata,modelInitializer:e.modelInitializer==null?void 0:e.modelInitializer,initializerSignature:e.initializerSignature==null?void 0:e.initializerSignature,trainingConfig:e.trainingConfig==null?void 0:e.trainingConfig};return t.LS.setItem(t.keys.modelMetadata,JSON.stringify(o)),{modelArtifactsInfo:i}}catch(e){throw so(t.keys),Error(`Failed to save model '${t.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${i.modelTopologyBytes}, weightSpecsBytes=${i.weightSpecsBytes}, weightDataBytes=${i.weightDataBytes}.`)}}}async load(){var e=this;let t=JSON.parse(e.LS.getItem(e.keys.info));if(t==null)throw Error(`In local storage, there is no model with name '${e.modelPath}'`);if(t.modelTopologyType!==`JSON`)throw Error(`BrowserLocalStorage does not support loading non-JSON model topology yet.`);let n={},r=JSON.parse(e.LS.getItem(e.keys.topology));if(r==null)throw Error(`In local storage, the topology of model '${e.modelPath}' is missing.`);n.modelTopology=r;let i=JSON.parse(e.LS.getItem(e.keys.weightSpecs));if(i==null)throw Error(`In local storage, the weight specs of model '${e.modelPath}' are missing.`);n.weightSpecs=i;let a=e.LS.getItem(e.keys.modelMetadata);if(a!=null){let e=JSON.parse(a);n.format=e.format,n.generatedBy=e.generatedBy,n.convertedBy=e.convertedBy,e.signature!=null&&(n.signature=e.signature),e.userDefinedMetadata!=null&&(n.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(n.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(n.initializerSignature=e.initializerSignature),e.trainingConfig!=null&&(n.trainingConfig=e.trainingConfig)}let o=e.LS.getItem(e.keys.weightData);if(o==null)throw Error(`In local storage, the binary weight values of model '${e.modelPath}' are missing.`);return n.weightData=La(o),n}};uo.URL_SCHEME=`localstorage://`;var fo=e=>N().getBool(`IS_BROWSER`)&&!Array.isArray(e)&&e.startsWith(uo.URL_SCHEME)?po(e.slice(uo.URL_SCHEME.length)):null;Ba.registerSaveRouter(fo),Ba.registerLoadRouter(fo);function po(e){return new uo(e)}var mo=class{constructor(){O(N().getBool(`IS_BROWSER`),()=>`Current environment is not a web browser`),O(typeof window>`u`||window.localStorage!==void 0,()=>`Current browser does not appear to support localStorage`),this.LS=window.localStorage}async listModels(){var e=this;let t={},n=eo+$a,r=$a+to;for(let i=0;i<e.LS.length;++i){let a=e.LS.key(i);if(a.startsWith(n)&&a.endsWith(r)){let n=co(a);t[n]=JSON.parse(e.LS.getItem(a))}}return t}async removeModel(e){var t=this;e=lo(e);let n=oo(e);if(t.LS.getItem(n.info)==null)throw Error(`Cannot find model at path '${e}'`);let r=JSON.parse(t.LS.getItem(n.info));return so(n),r}},ho=`://`,go=class e{constructor(){this.managers={}}static getInstance(){return e.instance==null&&(e.instance=new e),e.instance}static registerManager(t,n){O(t!=null,()=>`scheme must not be undefined or null.`),t.endsWith(ho)&&(t=t.slice(0,t.indexOf(ho))),O(t.length>0,()=>`scheme must not be an empty string.`);let r=e.getInstance();O(r.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),r.managers[t]=n}static getManager(t){let n=e.getInstance().managers[t];if(n==null)throw Error(`Cannot find model manager for scheme '${t}'`);return n}static getSchemes(){return Object.keys(e.getInstance().managers)}},_o=class{constructor(){this.messageName=`setTimeoutCustom`,this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if(t!==`utf-8`&&t!==`utf8`)throw Error(`Browser's encoder only supports utf-8, but got ${t}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){if(typeof window>`u`||!N().getBool(`USE_SETTIMEOUTCUSTOM`)){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},`*`)},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener(`message`,e=>{if(e.source===window&&e.data.name===this.messageName){e.stopPropagation();let t=this.functionRefs[e.data.index];t(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return Kr(e)}};if(N().get(`IS_BROWSER`)){N().setPlatform(`browser`,new _o);try{go.registerManager(uo.URL_SCHEME,new mo)}catch(e){}try{go.registerManager(Ja.URL_SCHEME,new Qa)}catch(e){}}var vo=s(((e,t)=>{t.exports={}})),yo={importFetch:()=>vo()},bo,xo=class{constructor(){this.util=vo(),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return N().global.fetch==null?(bo==null&&(bo=yo.importFetch()),bo(e,t)):N().global.fetch(e,t)}now(){let e=process.hrtime();return e[0]*1e3+e[1]/1e6}encode(e,t){if(t!==`utf-8`&&t!==`utf8`)throw Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return e.length===0?``:new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}};N().get(`IS_NODE`)&&!N().get(`IS_BROWSER`)&&N().setPlatform(`node`,new xo);function So(e,t=`float32`,n){return t=t||`float32`,De(e),new Ni(e,t,n)}function Co(e,t){let n=I(e,`x`,`cast`);if(!de(t))throw Error(`Failed to cast to unknown dtype ${t}`);if(t===`string`&&n.dtype!==`string`||t!==`string`&&n.dtype===`string`)throw Error(`Only strings can be casted to strings`);let r={x:n},i={dtype:t};return F.runKernel(ct,r,i)}var z=L({cast_:Co});function wo(e){let t={x:I(e,`x`,`clone`,`string_or_numeric`)};return F.runKernel(Yt,t)}var To=L({clone_:wo});function Eo(e,t=!1){console.log(e.toString(t))}aa(),Li({buffer:So,cast:z,clone:To,print:Eo});function Do(e,t){let n=I(e,`a`,`add`),r=I(t,`b`,`add`);[n,r]=Xi(n,r);let i={a:n,b:r};return F.runKernel(`Add`,i)}var B=L({add_:Do});function Oo(e,t){let n=I(e,`a`,`floorDiv`),r=I(t,`b`,`floorDiv`);[n,r]=Xi(n,r);let i={a:n,b:r};return F.runKernel(Ut,i)}var ko=L({floorDiv_:Oo});function Ao(e,t){let n=I(e,`a`,`div`),r=I(t,`b`,`div`);if([n,r]=Xi(n,r),n.dtype===`int32`&&r.dtype===`int32`)return ko(n,r);let i={a:n,b:r};return F.runKernel(Pt,i,{})}var V=L({div_:Ao});function jo(e,t){let n=I(e,`a`,`mul`),r=I(t,`b`,`mul`);[n,r]=Xi(n,r);let i={a:n,b:r};return F.runKernel(Sn,i)}var H=L({mul_:jo});function Mo(e){let t=I(e,`x`,`abs`);if(t.dtype===`complex64`){let e={x:t};return F.runKernel(ft,e)}else{let e={x:t};return F.runKernel(`Abs`,e)}}var No=L({abs_:Mo});function Po(e){let t={x:I(e,`x`,`acos`)};return F.runKernel(He,t)}var Fo=L({acos_:Po});function Io(e){let t={x:I(e,`x`,`acosh`)};return F.runKernel(Ue,t)}var Lo=L({acosh_:Io});function Ro(e,t=null,n=!1){let r={x:I(e,`x`,`all`,`bool`)},i={axis:t,keepDims:n};return F.runKernel(`All`,r,i)}var zo=L({all_:Ro});function Bo(e,t=null,n=!1){let r={x:I(e,`x`,`any`,`bool`)},i={axis:t,keepDims:n};return F.runKernel(`Any`,r,i)}var Vo=L({any_:Bo});function Ho(e,t=0){let n={x:I(e,`x`,`argMax`)},r={axis:t};return F.runKernel(Ge,n,r)}var Uo=L({argMax_:Ho});function Wo(e,t=0){let n={x:I(e,`x`,`argMin`)},r={axis:t};return F.runKernel(Ke,n,r)}var Go=L({argMin_:Wo});function Ko(e){let t={x:I(e,`x`,`asin`)};return F.runKernel(qe,t)}var qo=L({asin_:Ko});function Jo(e){let t={x:I(e,`x`,`asinh`)};return F.runKernel(Je,t)}var Yo=L({asinh_:Jo});function Xo(e){let t={x:I(e,`x`,`atan`)};return F.runKernel(Ye,t)}var Zo=L({atan_:Xo});function Qo(e,t){let n=I(e,`a`,`atan2`),r=I(t,`b`,`atan2`);[n,r]=Xi(n,r);let i={a:n,b:r};return F.runKernel(Ze,i)}var $o=L({atan2_:Qo});function es(e){let t={x:I(e,`x`,`atanh`)};return F.runKernel(Xe,t)}var ts=L({atanh_:es});function ns(e,t,n,r,i=`NHWC`,a){let o=e[3];return as(e,[...t,o],n,a,r,null,null,ys(i))}function rs(e,t,n,r,i,a,o=`channelsLast`){let[s,c]=us(t),l;if(o===`channelsLast`)l=[s,c,e[3],e[3]];else if(o===`channelsFirst`)l=[s,c,e[1],e[1]];else throw Error(`Unknown dataFormat ${o}`);return as(e,l,n,r,i,a,!1,o)}function is(e,t,n,r,i,a,o=`NDHWC`){let[s,c,l]=ds(t),u,d;if(o===`NDHWC`)d=`channelsLast`,u=[s,c,l,e[4],e[4]];else if(o===`NCDHW`)d=`channelsFirst`,u=[s,c,l,e[1],e[1]];else throw Error(`Unknown dataFormat ${o}`);return os(e,u,n,r,i,!1,d,a)}function as(e,t,n,r,i,a,o=!1,s=`channelsLast`){let[c,l,u,d]=[-1,-1,-1,-1];if(s===`channelsLast`)[c,l,u,d]=e;else if(s===`channelsFirst`)[c,d,l,u]=e;else throw Error(`Unknown dataFormat ${s}`);let[f,p,,m]=t,[h,g]=us(n),[_,v]=us(r),y=fs(f,_),b=fs(p,v),{padInfo:x,outHeight:S,outWidth:C}=ps(i,l,u,h,g,y,b,a,s),w=o?m*d:m,T;return s===`channelsFirst`?T=[c,w,S,C]:s===`channelsLast`&&(T=[c,S,C,w]),{batchSize:c,dataFormat:s,inHeight:l,inWidth:u,inChannels:d,outHeight:S,outWidth:C,outChannels:w,padInfo:x,strideHeight:h,strideWidth:g,filterHeight:f,filterWidth:p,effectiveFilterHeight:y,effectiveFilterWidth:b,dilationHeight:_,dilationWidth:v,inShape:e,outShape:T,filterShape:t}}function os(e,t,n,r,i,a=!1,o=`channelsLast`,s){let[c,l,u,d,f]=[-1,-1,-1,-1,-1];if(o===`channelsLast`)[c,l,u,d,f]=e;else if(o===`channelsFirst`)[c,f,l,u,d]=e;else throw Error(`Unknown dataFormat ${o}`);let[p,m,h,,g]=t,[_,v,y]=ds(n),[b,x,S]=ds(r),C=fs(p,b),w=fs(m,x),T=fs(h,S),{padInfo:E,outDepth:D,outHeight:O,outWidth:ee}=ms(i,l,u,d,_,v,y,C,w,T,s),te=a?g*f:g,k;return o===`channelsFirst`?k=[c,te,D,O,ee]:o===`channelsLast`&&(k=[c,D,O,ee,te]),{batchSize:c,dataFormat:o,inDepth:l,inHeight:u,inWidth:d,inChannels:f,outDepth:D,outHeight:O,outWidth:ee,outChannels:te,padInfo:E,strideDepth:_,strideHeight:v,strideWidth:y,filterDepth:p,filterHeight:m,filterWidth:h,effectiveFilterDepth:C,effectiveFilterHeight:w,effectiveFilterWidth:T,dilationDepth:b,dilationHeight:x,dilationWidth:S,inShape:e,outShape:k,filterShape:t}}function ss(e,t,n,r,i){r==null&&(r=ls(e,t,n));let a=e[0],o=e[1];return[hs((a-t+2*r)/n+1,i),hs((o-t+2*r)/n+1,i)]}function cs(e,t,n,r,i,a){i==null&&(i=ls(e,t[0],r[0]));let o=[0,0,0,n];for(let n=0;n<3;n++)e[n]+2*i>=t[n]&&(o[n]=hs((e[n]-t[n]+2*i)/r[n]+1,a));return o}function ls(e,t,n,r=1){let i=fs(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)}function us(e){return typeof e==`number`?[e,e,e]:e.length===2?[e[0],e[1],1]:e}function ds(e){return typeof e==`number`?[e,e,e]:e}function fs(e,t){return t<=1?e:e+(e-1)*(t-1)}function ps(e,t,n,r,i,a,o,s,c){let l,u,d;if(typeof e==`number`){l={top:e,bottom:e,left:e,right:e,type:e===0?`VALID`:`NUMBER`};let i=ss([t,n],a,r,e,s);u=i[0],d=i[1]}else if(e===`same`){u=Math.ceil(t/r),d=Math.ceil(n/i);let e=Math.max(0,(u-1)*r+a-t),s=Math.max(0,(d-1)*i+o-n),c=Math.floor(e/2),f=e-c,p=Math.floor(s/2);l={top:c,bottom:f,left:p,right:s-p,type:`SAME`}}else if(e===`valid`)l={top:0,bottom:0,left:0,right:0,type:`VALID`},u=Math.ceil((t-a+1)/r),d=Math.ceil((n-o+1)/i);else if(typeof e==`object`){let f=c===`channelsLast`?e[1][0]:e[2][0],p=c===`channelsLast`?e[1][1]:e[2][1],m=c===`channelsLast`?e[2][0]:e[3][0],h=c===`channelsLast`?e[2][1]:e[3][1];l={top:f,bottom:p,left:m,right:h,type:f===0&&p===0&&m===0&&h===0?`VALID`:`EXPLICIT`},u=hs((t-a+f+p)/r+1,s),d=hs((n-o+m+h)/i+1,s)}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:l,outHeight:u,outWidth:d}}function ms(e,t,n,r,i,a,o,s,c,l,u){let d,f,p,m;if(e===`valid`&&(e=0),typeof e==`number`){d={top:e,bottom:e,left:e,right:e,front:e,back:e,type:e===0?`VALID`:`NUMBER`};let h=cs([t,n,r,1],[s,c,l],1,[i,a,o],e,u);f=h[0],p=h[1],m=h[2]}else if(e===`same`){f=Math.ceil(t/i),p=Math.ceil(n/a),m=Math.ceil(r/o);let e=(f-1)*i+s-t,u=(p-1)*a+c-n,h=(m-1)*o+l-r,g=Math.floor(e/2),_=e-g,v=Math.floor(u/2),y=u-v,b=Math.floor(h/2);d={top:v,bottom:y,left:b,right:h-b,front:g,back:_,type:`SAME`}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:f,outHeight:p,outWidth:m}}function hs(e,t){if(!t)return Math.trunc(e);switch(t){case`round`:return Math.round(e);case`ceil`:return Math.ceil(e);case`floor`:return Math.floor(e);default:throw Error(`Unknown roundingMode ${t}`)}}function gs(e){let[t,n,r]=us(e);return t===1&&n===1&&r===1}function _s(e,t){return gs(e)||gs(t)}function vs(e){return us(e).every(e=>e>0)}function ys(e){if(e===`NHWC`)return`channelsLast`;if(e===`NCHW`)return`channelsFirst`;throw Error(`Unknown dataFormat ${e}`)}function bs(e,t,n){if(n!=null){if(typeof t==`string`)throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);if(typeof t==`number`)O(ne(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);else if(typeof t==`object`)t.forEach(t=>{t.forEach(t=>{O(ne(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`)})});else throw Error(`Error in ${e}: Unknown padding parameter: ${t}`)}}function xs(e,t){let n={x:I(e,`x`,`reshape`,`string_or_numeric`)},r={shape:t};return F.runKernel(Bn,n,r)}var U=L({reshape_:xs});function Ss(e,t,n,r,i){let a=I(e,`x`,`avgPool`,`float32`);O(_s(n,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`);let o=a,s=!1;a.rank===3&&(s=!0,o=U(a,[1,a.shape[0],a.shape[1],a.shape[2]])),O(o.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${o.rank}.`),bs(`avgPool`,r,i);let c={x:o},l={filterSize:t,strides:n,pad:r,dimRoundingMode:i},u=F.runKernel(Qe,c,l);return u=z(u,a.dtype),s?U(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var Cs=L({avgPool_:Ss});function ws(e,t,n,r,i,a=`NDHWC`){let o=I(e,`x`,`avgPool3d`,`float32`),s=o,c=!1;o.rank===4&&(c=!0,s=U(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),O(s.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${s.rank}.`),O(a===`NDHWC`,()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),O(typeof n==`number`&&n>0||Array.isArray(n)&&n[0]>0&&n[1]>0&&n[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${n}'`),bs(`avgPool3d`,r,i);let l={x:s},u={filterSize:t,strides:n,pad:r,dimRoundingMode:i,dataFormat:a},d=F.runKernel(et,l,u);return d=z(d,s.dtype),c?U(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}var Ts=L({avgPool3d_:ws});function Es(e,t=0){O(e.length>=1,()=>`Pass at least one tensor to concat`);let n=ha(e,`tensors`,`concat`,`string_or_numeric`);if(n[0].dtype===`complex64`&&n.forEach(e=>{if(e.dtype!==`complex64`)throw Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${e.dtype}. `)}),n.length===1)return To(n[0]);let r=n,i={axis:t};return F.runKernel(pt,r,i)}var Ds=L({concat_:Es});function Os(e,t,n=!1,r=!1){let i=I(e,`a`,`matMul`),a=I(t,`b`,`matMul`);[i,a]=Xi(i,a);let o={a:i,b:a},s={transposeA:n,transposeB:r};return F.runKernel(nt,o,s)}var ks=L({matMul_:Os});function As(e){let t={x:I(e,`x`,`sigmoid`,`float32`)};return F.runKernel(rr,t)}var js=L({sigmoid_:As});function Ms(e,t,n){let r=I(e,`x`,`slice`,`string_or_numeric`);if(r.rank===0)throw Error(`Slicing scalar is not possible`);let i={x:r},a={begin:t,size:n};return F.runKernel(er,i,a)}var Ns=L({slice_:Ms});function Ps(e){let t={x:I(e,`x`,`tanh`,`float32`)};return F.runKernel(xr,t)}var Fs=L({tanh_:Ps});function Is(e,t,n){let r=I(e,`x`,`batchToSpaceND`),i=t.reduce((e,t)=>e*t);O(r.rank>=1+t.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${t.length}`),O(n.length===t.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${t.length}`),O(r.shape[0]%i===0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(` * `)} === ${i}`);let a={x:r},o={blockShape:t,crops:n};return F.runKernel(rt,a,o)}var Ls=L({batchToSpaceND_:Is});function Rs(e){let t;return t=e.rank===0||e.rank===1?U(e,[1,1,1,e.size]):e.rank===2?U(e,[1,1,e.shape[0],e.shape[1]]):e.rank===3?U(e,[1,e.shape[0],e.shape[1],e.shape[2]]):e,t}function zs(e,t,n,r,i,a){a==null&&(a=.001);let o=I(e,`x`,`batchNorm`),s=I(t,`mean`,`batchNorm`),c=I(n,`variance`,`batchNorm`),l;i!=null&&(l=I(i,`scale`,`batchNorm`));let u;r!=null&&(u=I(r,`offset`,`batchNorm`)),O(s.rank===c.rank,()=>`Batch normalization gradient requires mean and variance to have equal ranks.`),O(u==null||s.rank===u.rank,()=>`Batch normalization gradient requires mean and offset to have equal ranks.`),O(l==null||s.rank===l.rank,()=>`Batch normalization gradient requires mean and scale to have equal ranks.`);let d={x:Rs(o),scale:l,offset:u,mean:s,variance:c},f={varianceEpsilon:a};return U(F.runKernel(Wt,d,f),o.shape)}var Bs=L({batchNorm_:zs});function Vs(e,t,n,r,i,a){let o=I(e,`x`,`batchNorm`),s=I(t,`mean`,`batchNorm`),c=I(n,`variance`,`batchNorm`),l;i!=null&&(l=I(i,`scale`,`batchNorm`));let u;return r!=null&&(u=I(r,`offset`,`batchNorm`)),O(o.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${o.rank}.`),O(s.rank===2||s.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${s.rank}.`),O(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${c.rank}.`),l!=null&&O(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${l.rank}.`),u!=null&&O(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),Bs(o,s,c,u,l,a)}var Hs=L({batchNorm2d_:Vs});function Us(e,t,n,r,i,a){let o=I(e,`x`,`batchNorm`),s=I(t,`mean`,`batchNorm`),c=I(n,`variance`,`batchNorm`),l;i!=null&&(l=I(i,`scale`,`batchNorm`));let u;return r!=null&&(u=I(r,`offset`,`batchNorm`)),O(o.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${o.rank}.`),O(s.rank===3||s.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${s.rank}.`),O(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${c.rank}.`),l!=null&&O(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${l.rank}.`),u!=null&&O(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),Bs(o,s,c,u,l,a)}var Ws=L({batchNorm3d_:Us});function Gs(e,t,n,r,i,a){let o=I(e,`x`,`batchNorm`),s=I(t,`mean`,`batchNorm`),c=I(n,`variance`,`batchNorm`),l;i!=null&&(l=I(i,`scale`,`batchNorm`));let u;return r!=null&&(u=I(r,`offset`,`batchNorm`)),O(o.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${o.rank}.`),O(s.rank===4||s.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${s.rank}.`),O(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${c.rank}.`),l!=null&&O(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${l.rank}.`),u!=null&&O(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),Bs(o,s,c,u,l,a)}var Ks=L({batchNorm4d_:Gs});function qs(e,t,n){let r=I(e,`x`,`bincount`),i=I(t,`weights`,`bincount`);O(r.dtype===`int32`,()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),O(n>=0,()=>`size must be non-negative, but got ${n}.`),O(i.size===r.size||i.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${i.shape}.`);let a={x:r,weights:i},o={size:n};return F.runKernel(it,a,o)}var Js=L({bincount_:qs});function Ys(e,t){let n=I(e,`broadcastTo`,`x`),r=n.shape;if(De(t),t.length<n.rank)throw Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){let e=n.shape.slice();for(;e.length<t.length;)e.unshift(1);n=U(n,e)}let i=n.shape,a=Array.from(t);for(let e=t.length-1;e>=0;e--)if(i[e]===t[e])a[e]=1;else if(n.shape[e]!==1)throw Error(`broadcastTo(): [${r}] cannot be broadcast to [${t}].`);if(a.map((e,t)=>e>1?t:-1).filter(e=>e>=0).length===0)return To(n);let o={x:n},s={reps:a};return F.runKernel(Sr,o,s)}var Xs=L({broadcastTo_:Ys});function Zs(e){let t={x:I(e,`x`,`ceil`,`float32`)};return F.runKernel(lt,t)}var Qs=L({ceil_:Zs});function $s(e,t,n){De(e),n=n||ve(t);let r={shape:e,value:t,dtype:n};return F.runKernel(Bt,{},r)}function ec(e,t,n){let r=I(e,`x`,`clipByValue`);if(O(t<=n,()=>`Error in clip: min (${t}) must be less than or equal to max (${n}).`),t===n)return $s(r.shape,t,r.dtype);let i={x:r},a={clipValueMin:t,clipValueMax:n};return F.runKernel(ut,i,a)}var tc=L({clipByValue_:ec});function nc(e){return Ds(e,0)}var rc=L({concat1d_:nc});function ic(e,t){return Ds(e,t)}var ac=L({concat2d_:ic});function oc(e,t){return Ds(e,t)}var sc=L({concat3d_:oc});function cc(e,t){return Ds(e,t)}var lc=L({concat4d_:cc});function uc(e,t,n,r,i=`NHWC`,a=[1,1],o){let s=I(e,`x`,`conv2d`,`float32`),c=I(t,`filter`,`conv2d`,`float32`),l=s,u=!1;s.rank===3&&(u=!0,l=U(s,[1,s.shape[0],s.shape[1],s.shape[2]])),O(l.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),O(c.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${c.rank}.`),bs(`conv2d`,r,o);let d=i===`NHWC`?l.shape[3]:l.shape[1];O(d===c.shape[2],()=>`Error in conv2d: depth of input (${d}) must match input depth for filter ${c.shape[2]}.`),O(_s(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),O(vs(a),()=>`Error in conv2D: Dilated rates should be larger than 0.`),O(vs(n),()=>`Error in conv2D: Strides should be larger than 0.`);let f={x:l,filter:c},p={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o},m=F.runKernel(mt,f,p);return u?U(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var dc=L({conv2d_:uc});function fc(e,t,n,r,i=`NWC`,a=1,o){let s=I(e,`x`,`conv1d`),c=I(t,`filter`,`conv1d`),l=s,u=!1;s.rank===2&&(u=!0,l=U(s,[1,s.shape[0],s.shape[1]])),O(l.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${l.rank}.`),O(c.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${c.rank}.`),bs(`conv1d`,r,o),O(l.shape[2]===c.shape[1],()=>`Error in conv1d: depth of input (${l.shape[2]}) must match input depth for filter ${c.shape[1]}.`),O(_s(n,a),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${a}'`),O(vs(a),()=>`Error in conv1D: Dilated rates should be larger than 0.`),O(vs(n),()=>`Error in conv1D: Stride should be larger than 0.`),O(i===`NWC`,()=>`Error in conv1d: got dataFormat of ${i} but only NWC is currently supported.`);let d=U(c,[1,c.shape[0],c.shape[1],c.shape[2]]),f=dc(U(l,[l.shape[0],1,l.shape[1],l.shape[2]]),d,[1,n],r,`NHWC`,[1,a],o);return u?U(f,[f.shape[2],f.shape[3]]):U(f,[f.shape[0],f.shape[2],f.shape[3]])}var pc=L({conv1d_:fc});function mc(e,t,n,r,i,a=`NHWC`,o){O(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let s=e,c=t,l=!1;t.rank===3&&(l=!0,c=U(t,[1,t.shape[0],t.shape[1],t.shape[2]]),s=[1,e[0],e[1],e[2]]),O(s.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${s.length}.`),O(c.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${c.rank}`),O(n.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${n.rank}`);let u=a===`NHWC`?s[3]:s[1],d=a===`NHWC`?c.shape[3]:c.shape[1];O(u===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${n.shape[2]}.`),O(d===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${d}) must match output depth for filter ${n.shape[3]}.`),bs(`conv2dDerInput`,i,o);let f={dy:c,filter:n},p={strides:r,pad:i,dataFormat:a,dimRoundingMode:o,inputShape:s},m=F.runKernel(gt,f,p);return l?U(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var hc=L({conv2DBackpropInput_:mc});function gc(e,t,n,r,i,a){return hc(n,I(e,`x`,`conv2dTranspose`),I(t,`filter`,`conv2dTranspose`),r,i,`NHWC`,a)}var _c=L({conv2dTranspose_:gc});function vc(e,t,n,r,i=`NDHWC`,a=[1,1,1]){let o=I(e,`x`,`conv3d`),s=I(t,`filter`,`conv3d`),c=o,l=!1;o.rank===4&&(l=!0,c=U(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),O(c.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${c.rank}.`),O(s.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${s.rank}.`),O(c.shape[4]===s.shape[3],()=>`Error in conv3d: depth of input (${c.shape[4]}) must match input depth for filter ${s.shape[3]}.`),O(_s(n,a),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),O(i===`NDHWC`,()=>`Error in conv3d: got dataFormat of ${i} but only NDHWC is currently supported.`),O(vs(a),()=>`Error in conv3D: Dilated rates should be larger than 0.`),O(vs(n),()=>`Error in conv3D: Strides should be larger than 0.`);let u={x:c,filter:s},d={strides:n,pad:r,dataFormat:i,dilations:a},f=F.runKernel(_t,u,d);return l?U(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}var yc=L({conv3d_:vc});function bc(e,t,n,r,i){O(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let a=e,o=t,s=!1;t.rank===4&&(s=!0,o=U(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),a=[1,e[0],e[1],e[2],e[3]]);let c=a[4],l=o.shape[4];O(a.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${a.length}.`),O(o.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${o.rank}`),O(n.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${n.rank}`),O(c===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${c}) must match input depth for filter ${n.shape[3]}.`),O(l===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${n.shape[4]}.`);let u={dy:o,filter:n},d={pad:i,strides:r,inputShape:a},f=F.runKernel(yt,u,d);return s?U(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}var xc=L({conv3DBackpropInput_:bc});function Sc(e,t,n,r,i){return xc(n,I(e,`x`,`conv3dTranspose`),I(t,`filter`,`conv3dTranspose`),r,i)}var Cc=L({conv3dTranspose_:Sc});function wc(e){let t={x:I(e,`x`,`cos`,`float32`)};return F.runKernel(`Cos`,t)}var Tc=L({cos_:wc});function Ec(e){let t={x:I(e,`x`,`cosh`,`float32`)};return F.runKernel(bt,t)}var Dc=L({cosh_:Ec});function Oc(e,t=0,n=!1,r=!1){let i={x:I(e,`x`,`cumprod`)},a={axis:t,exclusive:n,reverse:r};return F.runKernel(xt,i,a)}var kc=L({cumprod_:Oc});function Ac(e,t=0,n=!1,r=!1){let i={x:I(e,`x`,`cumsum`)},a={axis:t,exclusive:n,reverse:r};return F.runKernel(St,i,a)}var jc=L({cumsum_:Ac});function Mc(e,t,n,r=!1){let i=I(e,`x`,`denseBincount`),a=I(t,`weights`,`denseBincount`);O(i.dtype===`int32`,()=>`Error in denseBincount: input dtype must be int32, but got ${i.dtype}`),O(i.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${i.rank}.`),O(n>=0,()=>`size must be non-negative, but got ${n}.`),O(a.size===i.size||a.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${i.shape}, weights shape: ${a.shape}.`);let o={x:i,weights:a},s={size:n,binaryOutput:r};return F.runKernel(wt,o,s)}var Nc=L({denseBincount_:Mc});function Pc(e,t,n=`NHWC`){let r=I(e,`x`,`depthToSpace`,`float32`),i=n===`NHWC`?r.shape[1]:r.shape[2],a=n===`NHWC`?r.shape[2]:r.shape[3],o=n===`NHWC`?r.shape[3]:r.shape[1];O(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),O(i*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${i} and ${t}  for depthToSpace with input shape
    ${r.shape}`),O(a*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${a} and ${t} for depthToSpace with input shape
        ${r.shape}`),O(o%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${o} for depthToSpace with input shape ${r.shape}`);let s={x:r},c={blockSize:t,dataFormat:n};return F.runKernel(Tt,s,c)}var Fc=L({depthToSpace_:Pc});function Ic(e,t,n,r,i=`NHWC`,a=[1,1],o){let s=I(e,`x`,`depthwiseConv2d`,`float32`),c=I(t,`filter`,`depthwiseConv2d`,`float32`),l=s,u=!1;s.rank===3&&(u=!0,l=U(s,[1,s.shape[0],s.shape[1],s.shape[2]])),O(l.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),O(c.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${c.rank}.`);let d=i===`NHWC`?l.shape[3]:l.shape[1];O(d===c.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${d}) must match the inChannels dimension in filter ${c.shape[2]}.`),bs(`depthwiseConv2d`,r,o);let f={x:l,filter:c},p={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o},m=F.runKernel(Et,f,p);return u?U(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var Lc=L({depthwiseConv2d_:Ic});function Rc(e,t,n,r,i=[1,1],a=`NHWC`){let o=I(e,`x`,`dilation2d`),s=I(t,`filter`,`dilation2d`);O(o.rank===3||o.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${o.rank}.`),O(s.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${s.rank}.`),O(a===`NHWC`,()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${a}`);let c=o,l=!1;o.rank===3&&(c=U(o,[1,o.shape[0],o.shape[1],o.shape[2]]),l=!0),O(c.shape[3]===s.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${c.shape[3]} vs ${s.shape[2]}`);let u={x:c,filter:s},d={strides:n,pad:r,dilations:i},f=F.runKernel(At,u,d);return l?U(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var zc=L({dilation2d_:Rc});function Bc(e,t){let n=e.length,r=[];for(let i=0;i<n;i++){let a=n-1-i,o=e[a]||1;(t[t.length-1-i]||1)>1&&o===1&&r.unshift(a)}return r}function Vc(e,t){let n=[];for(let r=0;r<t.length;r++){let i=e[e.length-r-1],a=t.length-r-1,o=t[a];(i==null||i===1&&o>1)&&n.unshift(a)}return n}function W(e,t){let n=Math.max(e.length,t.length),r=Array(n);for(let i=0;i<n;i++){let a=e[e.length-i-1];a==null&&(a=1);let o=t[t.length-i-1];if(o==null&&(o=1),a===1)r[n-i-1]=o;else if(o===1)r[n-i-1]=a;else if(a!==o){let n=`Operands could not be broadcast together with shapes ${e} and ${t}.`;throw Error(n)}else r[n-i-1]=a}return r}function Hc(e,t){let n=I(e,`a`,`equal`,`string_or_numeric`),r=I(t,`b`,`equal`,`string_or_numeric`);[n,r]=Xi(n,r),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(Lt,i)}var Uc=L({equal_:Hc});function Wc(e,t,n){let r=I(t,`a`,`where`),i=I(n,`b`,`where`),a=I(e,`condition`,`where`,`bool`),o=W(W(a.shape,r.shape),i.shape),s={condition:Xs(a,o),t:Xs(r,o),e:Xs(i,o)};return F.runKernel(Qn,s)}var Gc=L({where_:Wc});function Kc(e){let t={x:I(e,`x`,`zerosLike`)};return F.runKernel(kr,t)}var qc=L({zerosLike_:Kc});function Jc(e,t){let n=I(e,`a`,`div`),r=I(t,`b`,`div`);[n,r]=Xi(n,r);let i=V(n,r),a=qc(i);return Gc(Uc(r,a),a,i)}var Yc=L({divNoNan_:Jc});function Xc(e,t){let n=I(e,`t1`,`dot`),r=I(t,`t2`,`dot`);O((n.rank===1||n.rank===2)&&(r.rank===1||r.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${n.rank} and ${r.rank}.`);let i=n.rank===1?n.size:n.shape[1],a=r.rank===1?r.size:r.shape[0];if(O(i===a,()=>`Error in dot: inner dimensions of inputs must match, but got ${i} and ${a}.`),n.rank===1&&r.rank===1)return U(ks(U(n,[1,-1]),U(r,[-1,1])),[]);if(n.rank===1&&r.rank===2){let e=ks(U(n,[1,-1]),U(r,[r.shape[0],r.shape[1]]));return U(e,[e.size])}else if(n.rank===2&&r.rank===1){let e=ks(n,U(r,[-1,1]));return U(e,[e.size])}else return ks(n,U(r,[r.shape[0],r.shape[1]]))}var Zc=L({dot_:Xc});function Qc(e,...t){let n=t.map((e,t)=>I(e,`tensors${t}`,`einsum`)),r={equation:e};return F.runKernel(Ft,n,r)}var $c=L({einsum_:Qc});function el(e){let t={x:I(e,`x`,`elu`,`float32`)};return F.runKernel(`Elu`,t)}var tl=L({elu_:el});function nl(e){let t=I(e,`x`,`erf`);O(t.dtype===`int32`||t.dtype===`float32`,()=>"Input dtype must be `int32` or `float32`."),t.dtype===`int32`&&(t=z(t,`float32`));let n={x:t};return F.runKernel(`Erf`,n)}var rl=L({erf_:nl});function il(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function al(e,t,n){let r=e.length+t.length,i=[],a=0,o=0;for(let s=0;s<r;s++)n.indexOf(s)===-1?i.push(e[a++]):i.push(t[o++]);return i}function ol(e,t){let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);return[n,t.map(t=>e[t])]}function sl(e,t){return al(e,t.map(e=>1),t)}function cl(e,t,n){O(il(t,n),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${n} input.`)}function ll(e,t){if(il(e,t))return null;let n=[];for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);return e.forEach(e=>n.push(e)),n}function ul(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function dl(e,t){let n=[];for(let r=t-e;r<t;++r)n.push(r);return n}function fl(e,t=null,n=!1){let r={x:I(e,`x`,`max`)},i={reductionIndices:t,keepDims:n};return F.runKernel(`Max`,r,i)}var pl=L({max_:fl});function ml(e,t=null,n=!1){let r={x:I(e,`x`,`min`)},i={axis:t,keepDims:n};return F.runKernel(`Min`,r,i)}var hl=L({min_:ml});function gl(e,t){let n=I(e,`base`,`pow`),r=I(t,`exp`,`pow`);[n,r]=Xi(n,r);let i={a:n,b:r};return F.runKernel(`Pow`,i)}var _l=L({pow_:gl});function vl(e,t){if((_i(e)&&t!==`string`||Array.isArray(e))&&t!==`complex64`)throw Error(`Error creating a new Scalar: value must be a primitive (number|boolean|string)`);if(t===`string`&&_i(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return ya(e,[],[],t)}function yl(e){let t={x:I(e,`x`,`sqrt`,`float32`)};return F.runKernel(ar,t)}var bl=L({sqrt_:yl});function xl(e){let t=I(e,`x`,`square`);return F.runKernel(`Square`,{x:t},{})}var Sl=L({square_:xl});function Cl(e,t=null,n=!1){let r=I(e,`x`,`sum`);r.dtype===`bool`&&(r=z(r,`int32`));let i={x:r},a={axis:t,keepDims:n};return F.runKernel(`Sum`,i,a)}var G=L({sum_:Cl});function wl(e,t=`euclidean`,n=null,r=!1){e=I(e,`x`,`norm`);let i=Tl(e,t,n),a=i.shape;if(r){let t=j(n,e.shape);a=sl(i.shape,t)}return U(i,a)}function Tl(e,t,n=null){if(e.rank===0)return No(e);if(e.rank!==1&&n===null)return Tl(U(e,[-1]),t,n);if(e.rank===1||typeof n==`number`||Array.isArray(n)&&n.length===1){if(t===1)return G(No(e),n);if(t===1/0)return pl(No(e),n);if(t===-1/0)return hl(No(e),n);if(t===`euclidean`||t===2)return bl(G(_l(No(e),vl(2,`int32`)),n));throw Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(n)&&n.length===2){if(t===1)return pl(G(No(e),n[0]),n[1]-1);if(t===1/0)return pl(G(No(e),n[1]),n[0]);if(t===-1/0)return hl(G(No(e),n[1]),n[0]);if(t===`fro`||t===`euclidean`)return bl(G(Sl(e),n));throw Error(`Error in norm: invalid ord value: ${t}`)}throw Error(`Error in norm: invalid axis: ${n}`)}var El=L({norm_:wl});function Dl(e,t=null,n=!1){return El(e,`euclidean`,t,n)}var Ol=L({euclideanNorm_:Dl});function kl(e){let t={x:I(e,`x`,`exp`)};return F.runKernel(`Exp`,t)}var Al=L({exp_:kl});function jl(e,t=0){let n=I(e,`x`,`expandDims`,`string_or_numeric`);O(t<=n.rank,()=>`Axis must be <= rank of the tensor`);let r={input:n},i={dim:t};return F.runKernel(Rt,r,i)}var Ml=L({expandDims_:jl});function Nl(e){let t={x:I(e,`x`,`expm1`)};return F.runKernel(zt,t)}var Pl=L({expm1_:Nl});function Fl(e,t){let n=I(e,`x`,`tile`,`string_or_numeric`);O(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`);let r={x:n},i={reps:t};return F.runKernel(Sr,r,i)}var Il=L({tile_:Fl});function Ll(e,t,n,r=`float32`){t==null&&(t=e);let i=So([e,t],r),a=e<=t?e:t;for(let e=0;e<a;++e)i.set(1,e,e);let o=U(i.toTensor(),[e,t]);if(n==null)return o;if(n.length===1)return Il(Ml(o,0),[n[0],1,1]);if(n.length===2)return Il(Ml(Ml(o,0),0),[n[0],n[1],1,1]);if(n.length===3)return Il(Ml(Ml(Ml(o,0),0),0),[n[0],n[1],n[2],1,1]);throw Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}var Rl=L({eye_:Ll});function zl(e){let t={x:I(e,`x`,`floor`,`float32`)};return F.runKernel(Ht,t)}var Bl=L({floor_:zl});function Vl(e,t,n=0,r=0){let i={x:I(e,`x`,`gather`),indices:I(t,`indices`,`gather`,`int32`)},a={axis:n,batchDims:r};return F.runKernel(Gt,i,a)}var Hl=L({gather_:Vl});function Ul(e,t){let n=I(e,`a`,`greater`,`string_or_numeric`),r=I(t,`b`,`greater`,`string_or_numeric`);[n,r]=Xi(n,r),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(qt,i)}var Wl=L({greater_:Ul});function Gl(e,t){let n=I(e,`a`,`greaterEqual`,`string_or_numeric`),r=I(t,`b`,`greaterEqual`,`string_or_numeric`);[n,r]=Xi(n,r),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(Jt,i)}var Kl=L({greaterEqual_:Gl});function ql(e){let t={input:I(e,`input`,`imag`)};return F.runKernel(Zt,t)}var Jl=L({imag_:ql});function Yl(e){let t={x:I(e,`x`,`isFinite`)};return F.runKernel(Qt,t)}var Xl=L({isFinite_:Yl});function Zl(e){let t={x:I(e,`x`,`isInf`)};return F.runKernel($t,t)}var Ql=L({isInf_:Zl});function $l(e){let t={x:I(e,`x`,`isNaN`)};return F.runKernel(en,t)}var eu=L({isNaN_:$l});function tu(e,t=.2){let n={x:I(e,`x`,`leakyRelu`)},r={alpha:t};return F.runKernel(tn,n,r)}var nu=L({leakyRelu_:tu});function ru(e,t){let n=I(e,`a`,`less`,`string_or_numeric`),r=I(t,`b`,`less`,`string_or_numeric`);[n,r]=Xi(n,r),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(nn,i)}var iu=L({less_:ru});function au(e,t){let n=I(e,`a`,`lessEqual`,`string_or_numeric`),r=I(t,`b`,`lessEqual`,`string_or_numeric`);[n,r]=Xi(n,r),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(rn,i)}var ou=L({lessEqual_:au});function su(e,t=5,n=1,r=1,i=.5){let a=I(e,`x`,`localResponseNormalization`);O(a.rank===4||a.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${a.rank}.`),O(ne(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let o=a,s=!1;a.rank===3&&(s=!0,o=U(a,[1,a.shape[0],a.shape[1],a.shape[2]]));let c={x:o},l={depthRadius:t,bias:n,alpha:r,beta:i},u=F.runKernel(`LRN`,c,l);return s?U(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var cu=L({localResponseNormalization_:su});function lu(e){let t={x:I(e,`x`,`log`,`float32`)};return F.runKernel(`Log`,t)}var uu=L({log_:lu});function du(e){let t={x:I(e,`x`,`log1p`)};return F.runKernel(on,t)}var fu=L({log1p_:du});function pu(e,t){O(ye(e),()=>`The f passed in variableGrads(f) must be a function`),O(t==null||Array.isArray(t)&&t.every(e=>e instanceof zi),()=>`The varList passed in variableGrads(f, varList) must be an array of variables`);let n=t!=null;if(!n){t=[];for(let e in F.registeredVariables)t.push(F.registeredVariables[e])}let r=n?t.filter(e=>!e.trainable):null,i=t.length;t=t.filter(e=>e.trainable),O(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${i} variables is trainable.`);let{value:a,grads:o}=F.gradients(e,t,null,!0);O(o.some(e=>e!=null),()=>`Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize().`),O(a.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${a.rank} tensor`);let s={};return t.forEach((e,t)=>{o[t]!=null&&(s[e.name]=o[t])}),r!=null&&r.forEach(e=>s[e.name]=null),{value:a,grads:s}}function mu(e){return F.customGrad(e)}function hu(e){let t={x:I(e,`x`,`neg`)};return F.runKernel(`Neg`,t)}var gu=L({neg_:hu});function _u(e){let t={x:I(e,`x`,`softplus`)};return F.runKernel(ir,t)}var vu=L({softplus_:_u});function yu(e){let t=I(e,`x`,`logSigmoid`);return mu(e=>({value:gu(vu(gu(e))),gradFunc:t=>H(t,js(gu(e)))}))(t)}var bu=L({logSigmoid_:yu});function xu(e,t){let n=I(e,`a`,`sub`),r=I(t,`b`,`sub`);[n,r]=Xi(n,r);let i={a:n,b:r};return F.runKernel(`Sub`,i)}var K=L({sub_:xu});function Su(e,t=-1){let n=I(e,`logits`,`logSoftmax`);if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${t}`);return mu((e,n)=>{let r=K(e,pl(e,t,!0)),i=K(z(r,`float32`),uu(G(Al(r),t,!0)));return n([i]),{value:i,gradFunc:(e,n)=>{let[r]=n,i=Al(r);return K(e,H(G(e,t,!0),i))}}})(n)}var Cu=L({logSoftmax_:Su});function wu(e,t=null,n=!1){let r=I(e,`x`,`logSumExp`),i=j(t,r.shape),a=pl(r,i,!0),o=uu(G(Al(K(r,a)),i)),s=B(U(a,o.shape),o);return n?U(s,sl(s.shape,i)):s}var Tu=L({logSumExp_:wu});function Eu(e,t){let n=I(e,`a`,`logicalAnd`,`bool`),r=I(t,`b`,`logicalAnd`,`bool`);W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(sn,i)}var Du=L({logicalAnd_:Eu});function Ou(e){let t={x:I(e,`x`,`logicalNot`,`bool`)};return F.runKernel(cn,t)}var ku=L({logicalNot_:Ou});function Au(e,t){let n=I(e,`a`,`logicalOr`,`bool`),r=I(t,`b`,`logicalOr`,`bool`);W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(ln,i)}var ju=L({logicalOr_:Au});function Mu(e,t){let n=I(e,`a`,`logicalXor`,`bool`),r=I(t,`b`,`logicalXor`,`bool`);return W(n.shape,r.shape),Du(ju(e,t),ku(Du(e,t)))}var Nu=L({logicalXor_:Mu});function Pu(e,t,n,r,i){let a=I(e,`x`,`maxPool`),o=a,s=!1;a.rank===3&&(s=!0,o=U(a,[1,a.shape[0],a.shape[1],a.shape[2]])),O(o.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${o.rank}.`),O(_s(n,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`),bs(`maxPool`,r,i);let c={x:o},l={filterSize:t,strides:n,pad:r,dimRoundingMode:i},u=F.runKernel(pn,c,l);return s?U(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var Fu=L({maxPool_:Pu});function Iu(e,t=[1,1,1],n,r,i,a=`NDHWC`){let o=I(e,`x`,`maxPool3d`),s=o,c=!1;o.rank===4&&(c=!0,s=U(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),O(s.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${s.rank}.`),O(a===`NDHWC`,()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),bs(`maxPool3d`,r,i);let l={x:s},u={filterSize:t,strides:n,pad:r,dimRoundingMode:i,dataFormat:a},d=F.runKernel(hn,l,u);return c?U(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}var Lu=L({maxPool3d_:Iu});function Ru(e,t){let n=I(e,`a`,`maximum`),r=I(t,`b`,`maximum`);[n,r]=Xi(n,r),n.dtype===`bool`&&(n=z(n,`int32`),r=z(r,`int32`)),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(fn,i)}var zu=L({maximum_:Ru});function Bu(e,t=null,n=!1){let r={x:I(e,`x`,`mean`)},i={axis:t,keepDims:n};return F.runKernel(vn,r,i)}var Vu=L({mean_:Bu});function Hu(e,t=`float32`){if(De(e),t===`complex64`)return va(Hu(e,`float32`),Hu(e,`float32`));let n=Te(k(e),t);return F.makeTensor(n,e,t)}function Uu(e,t=`float32`){if(De(e),t===`complex64`)return va(Uu(e,`float32`),Hu(e,`float32`));let n=we(k(e),t);return F.makeTensor(n,e,t)}function Wu(e,t){let n=I(e,`a`,`minimum`),r=I(t,`b`,`minimum`);[n,r]=Xi(n,r),n.dtype===`bool`&&(n=z(n,`int32`),r=z(r,`int32`)),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(yn,i)}var Gu=L({minimum_:Wu});function Ku(e,t,n){O(n===`reflect`||n===`symmetric`,()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${n}.`);let r=I(e,`x`,`mirrorPad`);if(r.rank===0)throw Error(`mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad`);O(t.length===r.rank,()=>`Padding doesn't match input. Must be ${r.rank}. Got ${t.length}.`);let i=+(n===`reflect`);for(let e=0;e<r.rank;e++)O(t[e].length===2,()=>`Invalid number of paddings. Must be length of 2 each.`),O(t[e][0]>=0&&t[e][0]<=r.shape[e]-i&&t[e][1]>=0&&t[e][1]<=r.shape[e]-i,()=>`Padding in dimension ${e} cannot be greater than or equal to ${r.shape[e]-i} or less than 0 for input of shape ${r.shape}`);let a={paddings:t,mode:n},o={x:r};return F.runKernel(bn,o,a)}var qu=L({mirrorPad_:Ku});function Ju(e,t){let n=I(e,`a`,`mod`),r=I(t,`b`,`mod`);[n,r]=Xi(n,r);let i={a:n,b:r};return F.runKernel(`Mod`,i)}var Yu=L({mod_:Ju});function Xu(e,t=null,n=!1){e=I(e,`x`,`moments`);let r=j(t,e.shape),i=Vu(e,r,n),a=i.shape;return n||(a=sl(i.shape,r)),{mean:i,variance:Vu(Sl(K(z(e,`float32`),U(i,a))),r,n)}}var Zu=L({moments_:Xu});function Qu(e,t){let n=I(e,`a`,`notEqual`,`string_or_numeric`),r=I(t,`b`,`notEqual`,`string_or_numeric`);[n,r]=Xi(n,r),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(Cn,i)}var $u=L({notEqual_:Qu});function ed(e,t,n=1,r=0,i=`int32`){if(t<2)throw Error(`Error in oneHot: depth must be >=2, but it is ${t}`);let a={indices:I(e,`indices`,`oneHot`,`int32`)},o={dtype:i,depth:t,onValue:n,offValue:r};return F.runKernel(On,a,o)}var td=L({oneHot_:ed});function nd(e){let t={x:I(e,`x`,`onesLike`)};return F.runKernel(Dn,t)}var rd=L({onesLike_:nd});function id(e,t,n=0){let r=I(e,`x`,`pad`);if(r.rank===0)throw Error(`pad(scalar) is not defined. Pass non-scalar to pad`);let i={paddings:t,constantValue:n},a={x:r};return F.runKernel(An,a,i)}var ad=L({pad_:id});function od(e,t,n){let r=I(e,`x`,`spaceToBatchND`);O(r.rank>=1+t.length,()=>`input rank ${r.rank} should be > than [blockShape] ${t.length}`),O(n.length===t.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${t.length}`),O(r.shape.reduce((e,r,i)=>i>0&&i<=t.length?e&&(r+n[i-1][0]+n[i-1][1])%t[i-1]===0:e,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${t.toString()}`);let i={x:r},a={blockShape:t,paddings:n};return F.runKernel(or,i,a)}var sd=L({spaceToBatchND_:od});function cd(e,t,n,r,i,a,o){i==null&&(i=[1,1]),a==null&&(a=1),r===0&&(r=`valid`);let s=I(e,`x`,`maxPool`),c=s,l=!1;s.rank===3&&(l=!0,c=U(s,[1,s.shape[0],s.shape[1],s.shape[2]])),O(_s(a,i),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${a} and dilations '${i}'`);let u=rs(c.shape,t,a,i,r),d=[u.dilationHeight,u.dilationWidth],f;f=r===`same`?ud([u.filterHeight,u.filterWidth],d):[[0,0],[0,0]];let p=d[0]===1&&d[1]===1,[m,h]=ld([u.inHeight,u.inWidth],d,f),g=p?r:`valid`,_=p?c:sd(c,d,m),v=(n===`avg`?()=>Cs(_,t,a,g,o):()=>Fu(_,t,a,g,o))(),y=p?v:Ls(v,d,h);return l?U(y,[y.shape[1],y.shape[2],y.shape[3]]):y}function ld(e,t,n){let r=n.map(e=>e[0]),i=n.map(e=>e[1]),a=e.concat(r,i),o=t.map((e,t)=>(e-a[t]%e)%e),s=i.map((e,t)=>e+o[t]);return[t.map((e,t)=>[r[t],s[t]]),t.map((e,t)=>[0,o[t]])]}function ud(e,t){let n=e.map((e,n)=>e+(e-1)*(t[n]-1)).map(e=>e-1),r=n.map(e=>Math.floor(e/2)),i=n.map((e,t)=>e-r[t]);return n.map((e,t)=>[r[t],i[t]])}var dd=L({pool_:cd});function fd(e,t){let n={x:I(e,`x`,`prelu`),alpha:I(t,`alpha`,`prelu`)};return F.runKernel(jn,n)}var pd=L({prelu_:fd});function md(e,t=null,n=!1){let r=I(e,`x`,`prod`);r.dtype===`bool`&&(r=z(r,`int32`));let i={x:r},a={axis:t,keepDims:n};return F.runKernel(Mn,i,a)}var hd=L({prod_:md}),gd=s(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=o();t.next=function(){var e=2091639*t.s0+t.c*23283064365386963e-26;return t.s0=t.s1,t.s1=t.s2,t.s2=e-(t.c=e|0)},t.c=1,t.s0=n(` `),t.s1=n(` `),t.s2=n(` `),t.s0-=n(e),t.s0<0&&(t.s0+=1),t.s1-=n(e),t.s1<0&&(t.s1+=1),t.s2-=n(e),t.s2<0&&(t.s2+=1),n=null}function i(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function a(e,t){var n=new r(e),a=t&&t.state,o=n.next;return o.int32=function(){return n.next()*4294967296|0},o.double=function(){return o()+(o()*2097152|0)*11102230246251565e-32},o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}function o(){var e=4022871197;return function(t){t=String(t);for(var n=0;n<t.length;n++){e+=t.charCodeAt(n);var r=.02519603282416938*e;e=r>>>0,r-=e,r*=e,e=r>>>0,r-=e,e+=r*4294967296}return(e>>>0)*23283064365386963e-26}}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.alea=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),_d=s(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=``;t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(e|0)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=n.charCodeAt(r)|0,t.next()}function i(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xor128=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),vd=s(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=``;t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(e|0)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=n.charCodeAt(r)|0,r==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function i(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xorwow=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),yd=s(((e,t)=>{(function(e,t,n){function r(e){var t=this;t.next=function(){var e=t.x,n=t.i,r=e[n],i;return r^=r>>>7,i=r^r<<24,r=e[n+1&7],i^=r^r>>>10,r=e[n+3&7],i^=r^r>>>3,r=e[n+4&7],i^=r^r<<7,r=e[n+7&7],r^=r<<13,i^=r^r<<9,e[n]=i,t.i=n+1&7,i};function n(e,t){var n,r=[];if(t===(t|0))r[0]=t;else for(t=``+t,n=0;n<t.length;++n)r[n&7]=r[n&7]<<15^t.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&r[n]===0;++n);for(n==8?r[7]=-1:r[n],e.x=r,e.i=0,n=256;n>0;--n)e.next()}n(t,e)}function i(e,t){return t.x=e.x.slice(),t.i=e.i,t}function a(e,t){e==null&&(e=+new Date);var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(a.x&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xorshift7=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),bd=s(((e,t)=>{(function(e,t,n){function r(e){var t=this;t.next=function(){var e=t.w,n=t.X,r=t.i,i,a;return t.w=e=e+1640531527|0,a=n[r+34&127],i=n[r=r+1&127],a^=a<<13,i^=i<<17,a^=a>>>15,i^=i>>>12,a=n[r]=a^i,t.i=r,a+(e^e>>>16)|0};function n(e,t){var n,r,i,a,o,s=[],c=128;for(t===(t|0)?(r=t,t=null):(t+=`\0`,r=0,c=Math.max(c,t.length)),i=0,a=-32;a<c;++a)t&&(r^=t.charCodeAt((a+32)%t.length)),a===0&&(o=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,a>=0&&(o=o+1640531527|0,n=s[a&127]^=r+o,i=n==0?i+1:0);for(i>=128&&(s[(t&&t.length||0)&127]=-1),i=127,a=512;a>0;--a)r=s[i+34&127],n=s[i=i+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,s[i]=r^n;e.w=o,e.X=s,e.i=i}n(t,e)}function i(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function a(e,t){e==null&&(e=+new Date);var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(a.X&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xor4096=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),xd=s(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=``;t.next=function(){var e=t.b,n=t.c,r=t.d,i=t.a;return e=e<<25^e>>>7^n,n=n-r|0,r=r<<24^r>>>8^i,i=i-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-r|0,t.d=r<<16^n>>>16^i,t.a=i-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=e|0):n+=e;for(var r=0;r<n.length+20;r++)t.b^=n.charCodeAt(r)|0,t.next()}function i(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.tychei=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),Sd=s(((e,t)=>{(function(e,n,r){var i=256,a=6,o=52,s=`random`,c=r.pow(i,a),l=r.pow(2,o),u=l*2,d=i-1,f;function p(e,t,o){var d=[];t=t==1?{entropy:!0}:t||{};var f=_(g(t.entropy?[e,y(n)]:e==null?v():e,3),d),p=new m(d),b=function(){for(var e=p.g(a),t=c,n=0;e<l;)e=(e+n)*i,t*=i,n=p.g(1);for(;e>=u;)e/=2,t/=2,n>>>=1;return(e+n)/t};return b.int32=function(){return p.g(4)|0},b.quick=function(){return p.g(4)/4294967296},b.double=b,_(y(p.S),n),(t.pass||o||function(e,t,n,i){return i&&(i.S&&h(i,p),e.state=function(){return h(p,{})}),n?(r[s]=e,t):e})(b,f,`global`in t?t.global:this==r,t.state)}function m(e){var t,n=e.length,r=this,a=0,o=r.i=r.j=0,s=r.S=[];for(n||(e=[n++]);a<i;)s[a]=a++;for(a=0;a<i;a++)s[a]=s[o=d&o+e[a%n]+(t=s[a])],s[o]=t;(r.g=function(e){for(var t,n=0,a=r.i,o=r.j,s=r.S;e--;)t=s[a=d&a+1],n=n*i+s[d&(s[a]=s[o=d&o+t])+(s[o]=t)];return r.i=a,r.j=o,n})(i)}function h(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function g(e,t){var n=[],r=typeof e,i;if(t&&r==`object`)for(i in e)try{n.push(g(e[i],t-1))}catch(e){}return n.length?n:r==`string`?e:e+`\0`}function _(e,t){for(var n=e+``,r,i=0;i<n.length;)t[d&i]=d&(r^=t[d&i]*19)+n.charCodeAt(i++);return y(t)}function v(){try{var t;return f&&(t=f.randomBytes)?t=t(i):(t=new Uint8Array(i),(e.crypto||e.msCrypto).getRandomValues(t)),y(t)}catch(t){var r=e.navigator,a=r&&r.plugins;return[+new Date,e,a,e.screen,y(n)]}}function y(e){return String.fromCharCode.apply(0,e)}if(_(r.random(),n),typeof t==`object`&&t.exports){t.exports=p;try{f=vo()}catch(e){}}else typeof define==`function`&&define.amd?define(function(){return p}):r[`seed`+s]=p})(typeof self<`u`?self:e,[],Math)})),Cd=u(s(((e,t)=>{var n=gd(),r=_d(),i=vd(),a=yd(),o=bd(),s=xd(),c=Sd();c.alea=n,c.xor128=r,c.xorwow=i,c.xorshift7=a,c.xor4096=o,c.tychei=s,t.exports=c}))()),wd=class{constructor(e,t,n,r,i){this.mean=e,this.stdDev=t,this.dtype=n,this.nextVal=NaN,this.truncated=r,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);let a=i||Math.random();this.random=Cd.alea(a.toString())}nextValue(){if(!isNaN(this.nextVal)){let e=this.nextVal;return this.nextVal=NaN,e}let e,t,n=!1;for(;!n;){let r,i,a;do r=2*this.random()-1,i=2*this.random()-1,a=r*r+i*i;while(a>=1||a===0);let o=Math.sqrt(-2*Math.log(a)/a);e=this.mean+this.stdDev*r*o,t=this.mean+this.stdDev*i*o,(!this.truncated||this.isValidTruncated(e))&&(n=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)}convertValue(e){return this.dtype==null||this.dtype===`float32`?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}},Td=class{constructor(e=0,t=1,n,r){if(this.canReturnFloat=()=>this.dtype==null||this.dtype===`float32`,this.min=e,this.range=t-e,this.dtype=n,r==null&&(r=Math.random()),typeof r==`number`&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=Cd.alea(r)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}};function Ed(e,t=0,n=1,r,i){if(De(e),r!=null&&r===`bool`)throw Error(`Unsupported data type ${r}`);let a=new wd(t,n,r,!1,i),o=So(e,r);for(let e=0;e<o.values.length;e++)o.values[e]=a.nextValue();return o.toTensor()}var Dd=L({randomNormal_:Ed});function Od(e,t=0,n=1,r=`float32`,i){De(e);let a=So(e,r),o=new Td(t,n,null,i);for(let e=0;e<a.values.length;e++)a.values[e]=o.nextValue();return a.toTensor()}var kd=L({randomUniform_:Od});function Ad(e,t,n=1,r=`float32`){if(n===0)throw Error(`Cannot have a step of zero`);let i={start:e,stop:t,step:n,dtype:r};return F.runKernel(In,{},i)}function jd(e){let t={input:I(e,`input`,`real`)};return F.runKernel(Ln,t)}var Md=L({real_:jd});function Nd(e){let t={x:I(e,`x`,`reciprocal`)};return F.runKernel(Rn,t)}var Pd=L({reciprocal_:Nd});function Fd(e){let t={x:I(e,`x`,`relu`)};return F.runKernel(zn,t)}var Id=L({relu_:Fd});function Ld(e){let t={x:I(e,`x`,`relu6`)};return F.runKernel(Gn,t)}var Rd=L({relu6_:Ld});function zd(e,t){let n={x:I(e,`x`,`reverse`)},r={dims:t};return F.runKernel(Kn,n,r)}var Bd=L({reverse_:zd});function Vd(e){let t={x:I(e,`x`,`round`)};return F.runKernel(qn,t)}var Hd=L({round_:Vd});function Ud(e){let t={x:I(e,`x`,`rsqrt`,`float32`)};return F.runKernel(Jn,t)}var Wd=L({rsqrt_:Ud});function Gd(e){let t={x:I(e,`x`,`selu`)};return F.runKernel($n,t)}var Kd=L({selu_:Gd});function qd(e,t,n,r,i,a=[1,1],o=`NHWC`){let s=I(e,`x`,`separableConv2d`),c=I(t,`depthwiseFilter`,`separableConv2d`),l=I(n,`pointwiseFilter`,`separableConv2d`),u=s,d=!1;if(s.rank===3&&(d=!0,u=U(s,[1,s.shape[0],s.shape[1],s.shape[2]])),o===`NCHW`)throw Error(`separableConv2d currently does not support dataFormat NCHW; only NHWC is supported`);O(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),O(c.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${c.rank}.`),O(l.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${c.rank}.`),O(l.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${l.shape[0]}.`),O(l.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${l.shape[1]}.`);let f=c.shape[2],p=c.shape[3];O(l.shape[2]===f*p,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${f*p}, but got ${l.shape[2]}.`);let m=dc(Lc(u,c,r,i,o,a),l,1,`valid`,o);return d?U(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var Jd=L({separableConv2d_:qd});function Yd(e){let t={x:I(e,`x`,`sign`)};return F.runKernel(nr,t)}var Xd=L({sign_:Yd});function Zd(e){let t={x:I(e,`x`,`sin`,`float32`)};return F.runKernel(`Sin`,t)}var Qd=L({sin_:Zd});function $d(e){let t={x:I(e,`x`,`sinh`)};return F.runKernel(tr,t)}var ef=L({sinh_:$d});function tf(e,t,n){let r=I(e,`x`,`slice1d`);return O(r.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${r.rank} tensor`),Ns(r,[t],[n])}var nf=L({slice1d_:tf});function rf(e,t,n){let r=I(e,`x`,`slice2d`);return O(r.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${r.rank} tensor`),Ns(r,t,n)}var af=L({slice2d_:rf});function of(e,t,n){let r=I(e,`x`,`slice3d`);return O(r.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${r.rank} tensor`),Ns(r,t,n)}var sf=L({slice3d_:of});function cf(e,t,n){let r=I(e,`x`,`slice4d`);return O(r.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${r.rank} tensor`),Ns(r,t,n)}var lf=L({slice4d_:cf});function uf(e,t=-1){let n=I(e,`logits`,`softmax`,`float32`);if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${t}`);let r={logits:n},i={dim:t};return F.runKernel(cr,r,i)}var df=L({softmax_:uf});function ff(e){O(e.dtype===`complex64`,()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`);let t={input:e};return F.runKernel(`FFT`,t)}var pf=L({fft_:ff});function mf(e){O(e.dtype===`complex64`,()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`);let t={input:e};return F.runKernel(Xt,t)}var hf=L({ifft_:mf});function gf(e){let t=e.shape[e.shape.length-1],n=e.size/t,r;if(t<=2)r=hf(U(e,[n,t]));else{let i=[n,2*(t-1)],a=U(Md(e),[n,t]),o=U(Jl(e),[n,t]),s=Bd(Ns(a,[0,1],[n,t-2]),1),c=H(Bd(Ns(o,[0,1],[n,t-2]),1),vl(-1));r=hf(U(va(Ds([a,s],1),Ds([o,c],1)),[i[0],i[1]]))}if(r=Md(r),e.rank===3&&e.shape[0]!==0){let t=r,n=e.shape[0];r=U(r,[n,r.shape[0]/n,r.shape[1]]),t.dispose()}return r}var _f=L({irfft_:gf});function vf(e,t,n=0){let r={x:I(e,`x`,`split`)},i={numOrSizeSplits:t,axis:n};return F.runKernel(sr,r,i)}var yf=L({split_:vf});function bf(e,t){O(e.dtype===`float32`,()=>`The dtype for rfft() must be real value but got ${e.dtype}`);let n=e.shape[e.shape.length-1],r=e.size/n,i;if(t!=null&&t<n){let r=e.shape.map(e=>0),a=e.shape.map(e=>e);a[e.shape.length-1]=t,i=Ns(e,r,a),n=t}else if(t!=null&&t>n){let r=e.shape.map(e=>e);r[e.shape.length-1]=t-n,i=Ds([e,Hu(r)],e.shape.length-1),n=t}else i=e;let a=qc(i),o=pf(U(va(i,a),[r,n])),s=Math.floor(n/2)+1,c=Md(o),l=Jl(o),u=yf(c,[s,n-s],c.shape.length-1),d=yf(l,[s,n-s],l.shape.length-1),f=i.shape.slice();return f[i.shape.length-1]=s,U(va(u[0],d[0]),f)}var xf=L({rfft_:bf});function Sf(e,t){let n=I(e,`a`,`squaredDifference`),r=I(t,`b`,`squaredDifference`);[n,r]=Xi(n,r),W(n.shape,r.shape);let i={a:n,b:r};return F.runKernel(mr,i,{})}var Cf=L({squaredDifference_:Sf});function wf(e,t){let n=I(e,`x`,`squeeze`,`string_or_numeric`);return U(n,se(n.shape,t).newShape)}var Tf=L({squeeze_:wf});function Ef(e,t=0){let n=ha(e,`tensors`,`stack`,`string_or_numeric`);O(n.length>=1,()=>`Pass at least one tensor to tf.stack`),n.length>0&&O(t<=n[0].rank,()=>`Axis must be <= rank of the tensor`);let r=n,i={axis:t};return F.runKernel(kn,r,i)}var Df=L({stack_:Ef});function Of(e,t=0){let n={x:I(e,`x`,`step`)},r={alpha:t};return F.runKernel(Ar,n,r)}var kf=L({step_:Of});function Af(e,t,n,r,i=0,a=0,o=0,s=0,c=0){let l={x:I(e,`x`,`stridedSlice`,`string_or_numeric`)},u={begin:t,end:n,strides:r,beginMask:i,endMask:a,ellipsisMask:o,newAxisMask:s,shrinkAxisMask:c};return F.runKernel(_r,l,u)}var jf=L({stridedSlice_:Af});function Mf(e){let t={x:I(e,`x`,`tan`,`float32`)};return F.runKernel(`Tan`,t)}var Nf=L({tan_:Mf});function Pf(e,t){te(e);let n=fa(e,t);if(n.length!==1)throw Error(`tensor1d() requires values to be a flat/TypedArray`);return ya(e,null,n,t)}function Ff(e,t,n){if(te(e),t!=null&&t.length!==2)throw Error(`tensor2d() requires shape to have two numbers`);let r=fa(e,n);if(r.length!==2&&r.length!==1)throw Error(`tensor2d() requires values to be number[][] or flat/TypedArray`);if(r.length===1&&t==null)throw Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return ya(e,t,r,n)}function If(e,t,n){let r=t.rank>1?t.shape[t.rank-1]:1,i=t.rank>1?t.rank-1:1,a=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${n.shape}, indices.shape: ${t.shape}, shape: ${e}, sliceDim: ${r}, and batchDim: ${i}.`;if(n.rank<i)throw Error(a+` update.rank < ${i}. `);if(e.length<r+(n.rank-i))throw Error(a+` Output shape length < ${r+(n.rank-i)}`);if(n.rank!==i+e.length-r)throw Error(a+` update.rank != ${i+e.length-r}`);for(let e=0;e<i;++e)if(n.shape[e]!==t.shape[e])throw Error(a+` updates.shape[${e}] (${n.shape[e]}) != indices.shape[${e}] (${t.shape[e]}).`);for(let t=0;t<n.rank-i;++t)if(n.shape[t+i]!==e[t+r])throw Error(a+` updates.shape[${t+i}] (${n.shape[t+i]}) != shape[${t+i}] (${e[t+i]})`)}function Lf(e,t,n){if(t.rank<1)throw Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if(t.dtype!==`int32`)throw Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(n.length<1)throw Error(`Output rank must be greater or equal to 1, but got shape: ${n}`);if(n.length===0){if(t.size===0)throw Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(e.size===0)throw Error(`Updates specified for empty output. updates shape: ${e.shape}`)}If(n,t,e)}function Rf(e,t,n){let r=t.shape.length,i=r>1?t.shape[r-1]:1,a=n.length,o=1;for(let e=i;e<a;++e)o*=n[e];let s=i<1?1:i,c=k(t.shape)/s,l=[...M(n.slice(0,i)),1],u=k(n);return{sliceRank:i,numUpdates:c,sliceSize:o,strides:l,outputSize:u}}function zf(e,t=1,n=!0){let r=I(e,`x`,`topk`);if(r.rank===0)throw Error(`topk() expects the input to be of rank 1 or higher`);let i=r.shape[r.shape.length-1];if(t<0)throw Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>i)throw Error(`'k' passed to topk() must be <= the last dimension (${i}) but got ${t}`);let a={x:r},o={k:t,sorted:n},[s,c]=F.runKernel(Cr,a,o);return{values:s,indices:c}}var Bf=L({topk_:zf});function Vf(e,t=0,n=1,r,i){if(De(e),r!=null&&r===`bool`)throw Error(`Unsupported data type $ { dtype }`);let a=new wd(t,n,r,!0,i),o=So(e,r);for(let e=0;e<o.values.length;e++)o.values[e]=a.nextValue();return o.toTensor()}var Hf=L({truncatedNormal_:Vf});function Uf(e,t=0){let n=I(e,`x`,`unique`,`string_or_numeric`);O(n.rank>0,()=>`The input tensor must be at least 1D`);let r={x:n},i={axis:t},[a,o]=F.runKernel(Er,r,i);return{values:a,indices:o}}var Wf=L({unique_:Uf});function Gf(e,t,n){let r=I(e,`x`,`unsortedSegmentSum`),i=I(t,`segmentIds`,`unsortedSegmentSum`,`int32`);O(ne(n),()=>`numSegments must be of dtype int`);let a={x:r,segmentIds:i},o={numSegments:n};return F.runKernel(Or,a,o)}var Kf=L({unsortedSegmentSum_:Gf});function qf(e,t=0){let n=I(e,`x`,`unstack`,`string_or_numeric`);O(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`);let r={value:n},i={axis:t};return F.runKernel(Dr,r,i)}var Jf=L({unstack_:qf});function Yf(e,t=!0,n,r){return F.makeVariable(e,t,n,r)}function Xf(e,t){let n=[];for(let e=0;e<t.length;e++)t[e]&&n.push(e);let r=So(e,`int32`),i=So([n.length,e.length],`int32`);for(let t=0;t<n.length;t++){let a=r.indexToLoc(n[t]),o=t*e.length;i.values.set(a,o)}return i.toTensor()}function Zf(e,t,n){let r=I(e,`x`,`transpose`);if(t==null&&(t=r.shape.map((e,t)=>t).reverse()),O(r.rank===t.length,()=>`Error in transpose: rank of input ${r.rank} must match length of perm ${t}.`),t.forEach(e=>{O(e>=0&&e<r.rank,()=>`All entries in 'perm' must be between 0 and ${r.rank-1} but got ${t}`)}),r.rank<=1)return r.clone();let i={x:r},a={perm:t};return r.dtype===`complex64`?R(()=>{let e=Md(r),t=Jl(r);return e=F.runKernel(Tr,{x:e},a),t=F.runKernel(Tr,{x:t},a),n&&(t=gu(t)),va(e,t)}):F.runKernel(Tr,i,a)}var Qf=L({transpose_:Zf});function $f(e,t){if(t==null)return e.shape.slice();if(A(e.shape,t))return t;if(e.shape.length===t.length){let n=[];for(let r=0;r<e.shape.length;r++)t[r]==null&&e.shape[r]!=null?n.push(e.shape[r]):n.push(t[r]);return n}return t}function ep(e,t,n,r){let i=I(e,`x`,`dropout`);if(O(i.dtype===`float32`,()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${i.dtype} tensor instead.`),O(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),t===0)return e instanceof Ri?i.clone():i;let a=$f(i,n),o=1-t;return H(i,V(Bl(B(kd(a,0,1,`float32`,r),o)),o))}var tp=L({dropout_:ep});function np(e,t,n,r,i,a=`NHWC`,o){let s=e;e.rank===3&&(s=U(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let c=t;c.rank===3&&(c=U(t,[1,t.shape[0],t.shape[1],t.shape[2]])),O(s.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${s.shape}.`),O(c.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${c.shape}.`),O(n.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${n}.`);let l=a===`NHWC`?s.shape[3]:s.shape[1],u=a===`NHWC`?c.shape[3]:c.shape[1];O(l===n[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${n[2]}.`),O(u===n[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${n[3]}).`),bs(`conv2dDerFilter`,i,o);let d={x:s,dy:c},f={strides:r,pad:i,dataFormat:a,dimRoundingMode:o,filterShape:n};return F.runKernel(ht,d,f)}var rp=L({conv2DBackpropFilter_:np});function ip(e,t,n){if(n==null||n===`linear`)return e;if(n===`relu`)return H(e,kf(t));throw Error(`Cannot compute gradient for fused activation ${n}.`)}function ap(e,t){let n=t,r=Vc(e.shape,t.shape);return r.length>0&&(n=G(n,r)),U(n,e.shape)}function op(e,t,n,r){if(t===`linear`)return e;if(t===`relu`)return Id(e);if(t===`elu`)return tl(e);if(t===`relu6`)return Rd(e);if(t===`prelu`)return pd(e,n);if(t===`leakyrelu`)return nu(e,r);if(t===`sigmoid`)return js(e);throw Error(`Unknown fused activation ${t}.`)}var sp=(e,t)=>!(e>0)||t===`linear`;function cp({x:e,filter:t,strides:n,pad:r,dataFormat:i=`NHWC`,dilations:a=[1,1],dimRoundingMode:o,bias:s,activation:c=`linear`,preluActivationWeights:l,leakyreluAlpha:u}){if(c=c||`linear`,sp(F.state.gradientDepth,c)===!1){O(i===`NHWC`,()=>`Error in fused conv2d: got dataFormat of ${i} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let d=dc(e,t,n,r,i,a,o);return s!=null&&(d=B(d,s)),op(d,c,l,u)}let d=I(e,`x`,`conv2d`,`float32`),f=I(t,`filter`,`conv2d`,`float32`),p=d,m=!1;d.rank===3&&(m=!0,p=U(d,[1,d.shape[0],d.shape[1],d.shape[2]])),O(p.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${p.rank}.`),O(f.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${f.rank}.`),bs(`fused conv2d`,r,o);let h=i===`NHWC`?p.shape[3]:p.shape[1];O(f.shape[2]===h,()=>`Error in conv2d: depth of input (${h}) must match input depth for filter ${f.shape[2]}.`),O(_s(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`);let g=as(p.shape,f.shape,n,a,r,o),_;s!=null&&(_=I(s,`bias`,`fused conv2d`),[_]=Xi(_,d),i===`NHWC`?W(g.outShape,_.shape):(O(_.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${_.shape.length}.`),O(_.shape.length===0||_.shape[0]===g.outChannels||_.shape[0]===1,()=>`Error in fused conv2d: bias shape (${_.shape}) is not compatible with the number of output channels (${g.outChannels})`)));let v;if(l!=null){let e=l.shape;if(O(e.length<=1||e.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${e.length}.`),e.length===1)O(e[0]===1||e[0]===g.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the number of output channels (${g.outChannels}).`);else if(e.length===3)try{W(e,g.outShape)}catch(t){let n=`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the output shape of the conv2d (${g.outShape}).`;throw Error(n)}v=I(l,`prelu weights`,`fused conv2d`)}let y=(e,t)=>{O(i===`NHWC`,()=>`Error in gradient of fused conv2D: got dataFormat of ${i} but only NHWC is currently supported.`);let[o,s,l,u]=t,d=ip(e,l,c);O(gs(a),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`);let f=[hc(s.shape,d,o,n,r),rp(s,d,o.shape,n,r)];if(u!=null){let e=ap(u,d);f.push(e)}return f},b={x:p,filter:f,bias:_,preluActivationWeights:v},x={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o,activation:c,leakyreluAlpha:u};return s==null?mu((e,t,n)=>{let r=F.runKernel(Pr,b,x);return n([t,e,r]),m&&(r=U(r,[r.shape[1],r.shape[2],r.shape[3]])),{value:r,gradFunc:y}})(p,f):mu((e,t,n,r)=>{let i=F.runKernel(Pr,b,x);return r([t,e,i,n]),m&&(i=U(i,[i.shape[1],i.shape[2],i.shape[3]])),{value:i,gradFunc:y}})(p,f,_)}var lp=L({fusedConv2d_:cp});function up(e,t,n,r,i,a=[1,1],o){let s=e;e.rank===3&&(s=U(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let c=t;c.rank===3&&(c=U(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let l={x:s,dy:c},u={strides:r,pad:i,dimRoundingMode:o,dilations:a,filterShape:n};return F.runKernel(Dt,l,u)}var dp=L({depthwiseConv2dNativeBackpropFilter_:up});function fp(e,t,n,r,i,a=[1,1],o){let s=t,c=!1;t.rank===3&&(c=!0,s=U(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let l={dy:s,filter:n},u={strides:r,pad:i,dimRoundingMode:o,dilations:a,inputShape:e},d=F.runKernel(Ot,l,u);return c?U(d,[d.shape[1],d.shape[2],d.shape[3]]):d}var pp=L({depthwiseConv2dNativeBackpropInput_:fp});function mp({a:e,b:t,transposeA:n=!1,transposeB:r=!1,bias:i,activation:a=`linear`,preluActivationWeights:o,leakyreluAlpha:s=.2}){if(sp(F.state.gradientDepth,a)===!1){let c=ks(e,t,n,r);return i!=null&&(c=B(c,i)),op(c,a,o,s)}let c=I(e,`a`,`fused matMul`),l=I(t,`b`,`fused matMul`);[c,l]=Xi(c,l);let u=n?c.shape[c.rank-2]:c.shape[c.rank-1],d=r?l.shape[l.rank-1]:l.shape[l.rank-2],f=n?c.shape[c.rank-1]:c.shape[c.rank-2],p=r?l.shape[l.rank-2]:l.shape[l.rank-1],m=c.shape.slice(0,-2),h=l.shape.slice(0,-2),g=k(m),_=k(h);O(u===d,()=>`Error in fused matMul: inner shapes (${u}) and (${d}) of Tensors with shapes ${c.shape} and ${l.shape} and transposeA=${n} and transposeB=${r} must match.`);let v=W(c.shape.slice(0,-2),l.shape.slice(0,-2)).concat([f,p]),y=n?U(c,[g,u,f]):U(c,[g,f,u]),b=r?U(l,[_,p,d]):U(l,[_,d,p]),x;i!=null&&(x=I(i,`bias`,`fused matMul`),[x]=Xi(x,c),W(v,x.shape));let S;o!=null&&(S=I(o,`prelu weights`,`fused matMul`));let C=(e,t)=>{let[o,s,c,l]=t,u=ip(U(e,c.shape),c,a),d,f;if(!n&&!r?(d=ks(u,s,!1,!0),f=ks(o,u,!0,!1)):!n&&r?(d=ks(u,s,!1,!1),f=ks(u,o,!0,!1)):n&&!r?(d=ks(s,u,!1,!0),f=ks(o,u,!1,!1)):(d=ks(s,u,!0,!0),f=ks(u,o,!0,!0)),i!=null){let e=ap(l,u);return[d,f,e]}else return[d,f]},w={a:y,b,bias:x,preluActivationWeights:S},T={transposeA:n,transposeB:r,activation:a,leakyreluAlpha:s};return i==null?mu((e,t,n)=>{let r=F.runKernel(Nr,w,T);return n([e,t,r]),{value:U(r,v),gradFunc:C}})(y,b):mu((e,t,n,r)=>{let i=F.runKernel(Nr,w,T);return r([e,t,i,n]),{value:U(i,v),gradFunc:C}})(y,b,x)}var hp=L({fusedMatMul_:mp});function gp(e,t,n,r,i=`bilinear`,a=0){let o=I(e,`image`,`cropAndResize`),s=I(t,`boxes`,`cropAndResize`,`float32`),c=I(n,`boxInd`,`cropAndResize`,`int32`),l=s.shape[0];O(o.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${o.rank}.`),O(s.rank===2&&s.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${s.shape}.`),O(c.rank===1&&c.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${s.shape}.`),O(r.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),O(r[0]>=1&&r[1]>=1,()=>`cropSize must be atleast [1,1], but was ${r}`),O(i===`bilinear`||i===`nearest`,()=>`method must be bilinear or nearest, but was ${i}`);let u={image:o,boxes:s,boxInd:c},d={method:i,extrapolationValue:a,cropSize:r};return F.runKernel(Ct,u,d)}var _p=L({cropAndResize_:gp});function vp(e){let t=I(e,`image`,`flipLeftRight`,`float32`);O(t.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);let n={image:t};return F.runKernel(Vt,n,{})}var yp=L({flipLeftRight_:vp});function bp(e){let t=I(e,`image`,`grayscaleToRGB`),n=t.rank-1,r=t.shape[n];O(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),O(r===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${r}.`);let i=Array(t.rank);return i.fill(1,0,n),i[n]=3,Il(t,i)}var xp=L({grayscaleToRGB_:bp});function Sp(e){let t=I(e,`image`,`RGBToGrayscale`),n=t.rank-1,r=t.shape[n];O(t.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${t.rank}.`),O(r===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${r}.`);let i=t.dtype,a=z(t,`float32`),o=Pf([.2989,.587,.114]),s;switch(t.rank){case 2:s=$c(`ij,j->i`,a,o);break;case 3:s=$c(`ijk,k->ij`,a,o);break;case 4:s=$c(`ijkl,l->ijk`,a,o);break;case 5:s=$c(`ijklm,m->ijkl`,a,o);break;case 6:s=$c(`ijklmn,n->ijklm`,a,o);break;default:throw Error(`Not a valid tensor rank.`)}return s=Ml(s,-1),z(s,i)}var Cp=L({rgbToGrayscale_:Sp});function wp(e,t,n=0,r=.5){let i=I(e,`image`,`rotateWithOffset`,`float32`);O(i.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${i.rank}.`);let a={image:i},o={radians:t,fillValue:n,center:r};return F.runKernel(Mr,a,o)}var Tp=L({rotateWithOffset_:wp});function Ep(e,t,n,r,i,a){r==null&&(r=.5),i==null&&(i=-1/0),a==null&&(a=0);let o=e.shape[0];return n=Math.min(n,o),O(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),O(e.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),O(e.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${e.shape[1]}`),O(t.rank===1,()=>`scores must be a 1D tensor`),O(t.shape[0]===o,()=>`scores has incompatible shape with boxes. Expected ${o}, but was ${t.shape[0]}`),O(0<=a&&a<=1,()=>`softNmsSigma must be in [0, 1], but was '${a}'`),{maxOutputSize:n,iouThreshold:r,scoreThreshold:i,softNmsSigma:a}}function Dp(e,t,n,r=.5,i=-1/0){let a=I(e,`boxes`,`nonMaxSuppression`,`float32`),o=I(t,`scores`,`nonMaxSuppression`,`float32`),s=Ep(a,o,n,r,i);n=s.maxOutputSize,r=s.iouThreshold,i=s.scoreThreshold;let c={maxOutputSize:n,iouThreshold:r,scoreThreshold:i};return F.runKernel(wn,{boxes:a,scores:o},c)}var Op=L({nonMaxSuppression_:Dp});function kp(e,t,n){let r=Ap(e,t,n),i=r<0?-(r+1):r;e.splice(i,0,t)}function Ap(e,t,n){return Mp(e,t,n||jp)}function jp(e,t){return e>t?1:e<t?-1:0}function Mp(e,t,n){let r=0,i=e.length,a=0,o=!1;for(;r<i;){a=r+(i-r>>>1);let s=n(t,e[a]);s>0?r=a+1:(i=a,o=!s)}return o?r:-r-1}function Np(e,t,n,r,i){return Ip(e,t,n,r,i,0)}function Pp(e,t,n,r,i,a){return Ip(e,t,n,r,i,0,!1,a,!0)}function Fp(e,t,n,r,i,a){return Ip(e,t,n,r,i,a,!0)}function Ip(e,t,n,r,i,a,o=!1,s=!1,c=!1){let l=[];for(let e=0;e<t.length;e++)t[e]>i&&l.push({score:t[e],boxIndex:e,suppressBeginIndex:0});l.sort(zp);let u=a>0?-.5/a:0,d=[],f=[];for(;d.length<n&&l.length>0;){let t=l.pop(),{score:n,boxIndex:a,suppressBeginIndex:o}=t;if(n<i)break;let s=!1;for(let n=d.length-1;n>=o;--n){let o=Lp(e,a,d[n]);if(o>=r){s=!0;break}if(t.score*=Rp(r,u,o),t.score<=i)break}t.suppressBeginIndex=d.length,s||(t.score===n?(d.push(a),f.push(t.score)):t.score>i&&kp(l,t,zp))}let p=d.length,m=n-p;s&&m>0&&(d.push(...Array(m).fill(0)),f.push(...Array(m).fill(0)));let h={selectedIndices:d};return o&&(h.selectedScores=f),c&&(h.validOutputs=p),h}function Lp(e,t,n){let r=e.subarray(t*4,t*4+4),i=e.subarray(n*4,n*4+4),a=Math.min(r[0],r[2]),o=Math.min(r[1],r[3]),s=Math.max(r[0],r[2]),c=Math.max(r[1],r[3]),l=Math.min(i[0],i[2]),u=Math.min(i[1],i[3]),d=Math.max(i[0],i[2]),f=Math.max(i[1],i[3]),p=(s-a)*(c-o),m=(d-l)*(f-u);if(p<=0||m<=0)return 0;let h=Math.max(a,l),g=Math.max(o,u),_=Math.min(s,d),v=Math.min(c,f),y=Math.max(_-h,0)*Math.max(v-g,0);return y/(p+m-y)}function Rp(e,t,n){let r=Math.exp(t*n*n);return n<=e?r:0}function zp(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}async function Bp(e,t,n,r=.5,i=-1/0){let a=I(e,`boxes`,`nonMaxSuppressionAsync`),o=I(t,`scores`,`nonMaxSuppressionAsync`),s=Ep(a,o,n,r,i);n=s.maxOutputSize,r=s.iouThreshold,i=s.scoreThreshold;let c=await Promise.all([a.data(),o.data()]),l=c[0],u=c[1],{selectedIndices:d}=Np(l,u,n,r,i);return a!==e&&a.dispose(),o!==t&&o.dispose(),Pf(d,`int32`)}var Vp=Bp;function Hp(e,t,n,r=.5,i=-1/0,a=0){let o=I(e,`boxes`,`nonMaxSuppression`),s=I(t,`scores`,`nonMaxSuppression`),c=Ep(o,s,n,r,i,a);n=c.maxOutputSize,r=c.iouThreshold,i=c.scoreThreshold,a=c.softNmsSigma;let l={boxes:o,scores:s},u={maxOutputSize:n,iouThreshold:r,scoreThreshold:i,softNmsSigma:a},d=F.runKernel(En,l,u);return{selectedIndices:d[0],selectedScores:d[1]}}var Up=L({nonMaxSuppressionWithScore_:Hp});async function Wp(e,t,n,r=.5,i=-1/0,a=0){let o=I(e,`boxes`,`nonMaxSuppressionAsync`),s=I(t,`scores`,`nonMaxSuppressionAsync`),c=Ep(o,s,n,r,i,a);n=c.maxOutputSize,r=c.iouThreshold,i=c.scoreThreshold,a=c.softNmsSigma;let l=await Promise.all([o.data(),s.data()]),u=l[0],d=l[1],{selectedIndices:f,selectedScores:p}=Fp(u,d,n,r,i,a);return o!==e&&o.dispose(),s!==t&&s.dispose(),{selectedIndices:Pf(f,`int32`),selectedScores:Pf(p)}}var Gp=Wp;function Kp(e,t,n,r=.5,i=-1/0,a=!1){let o=I(e,`boxes`,`nonMaxSuppression`),s=I(t,`scores`,`nonMaxSuppression`),c=Ep(o,s,n,r,i,null),l=c.maxOutputSize,u=c.iouThreshold,d=c.scoreThreshold,f={boxes:o,scores:s},p={maxOutputSize:l,iouThreshold:u,scoreThreshold:d,padToMaxOutputSize:a},m=F.runKernel(Tn,f,p);return{selectedIndices:m[0],validOutputs:m[1]}}var qp=L({nonMaxSuppressionPadded_:Kp});async function Jp(e,t,n,r=.5,i=-1/0,a=!1){let o=I(e,`boxes`,`nonMaxSuppressionAsync`),s=I(t,`scores`,`nonMaxSuppressionAsync`),c=Ep(o,s,n,r,i,null),l=c.maxOutputSize,u=c.iouThreshold,d=c.scoreThreshold,[f,p]=await Promise.all([o.data(),s.data()]),{selectedIndices:m,validOutputs:h}=Pp(f,p,l,u,d,a);return o!==e&&o.dispose(),s!==t&&s.dispose(),{selectedIndices:Pf(m,`int32`),validOutputs:vl(h,`int32`)}}var Yp=Jp;function Xp(e,t,n=!1,r=!1){let i=I(e,`images`,`resizeBilinear`);O(i.rank===3||i.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${i.rank}.`),O(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),O(r===!1||n===!1,()=>`Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.`);let a=i,o=!1;i.rank===3&&(o=!0,a=U(i,[1,i.shape[0],i.shape[1],i.shape[2]]));let[]=t,s={images:a},c={alignCorners:n,halfPixelCenters:r,size:t},l=F.runKernel(Un,s,c);return o?U(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var Zp=L({resizeBilinear_:Xp});function Qp(e,t,n=!1,r=!1){let i=I(e,`images`,`resizeNearestNeighbor`);O(i.rank===3||i.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${i.rank}.`),O(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),O(i.dtype===`float32`||i.dtype===`int32`,()=>"`images` must have `int32` or `float32` as dtype"),O(r===!1||n===!1,()=>`Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.`);let a=i,o=!1;i.rank===3&&(o=!0,a=U(i,[1,i.shape[0],i.shape[1],i.shape[2]]));let[]=t,s={images:a},c={alignCorners:n,halfPixelCenters:r,size:t},l=F.runKernel(Vn,s,c);return o?U(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var $p=L({resizeNearestNeighbor_:Qp});function em(e,t=`binary`,n=!1,r=.5){let i=I(e,`image`,`threshold`),a=i.shape[0]*i.shape[1],o=H(Pf([r]),255),s,c,l,u;if(O(i.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${i.rank}.`),O(i.shape[2]===3||i.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${i.shape[2]}.`),O(i.dtype===`int32`||i.dtype===`float32`,()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${i.dtype}.`),O(t===`otsu`||t===`binary`,()=>`Method must be binary or otsu, but was ${t}`),i.shape[2]===3){[s,c,l]=yf(i,[1,1,1],-1);let e=H(s,.2989),t=H(c,.587),n=H(l,.114);u=B(B(e,t),n)}else u=e;return t===`otsu`&&(o=tm(Js(z(Hd(u),`int32`),ba([]),256),a)),z(H(n?ou(u,o):Wl(u,o),255),`int32`)}function tm(e,t){let n=Pf([-1]),r=Pf([0]),i=Pf([0]),a,o,s,c,l,u;for(let d=0;d<e.size-1;d++){a=Ns(e,0,d+1),o=Ns(e,d+1),l=V(G(a),t),u=V(G(o),t),s=V(G(H(a,Ad(0,a.size))),G(a));let f=$s(o.shape,a.size),p=B(Ad(0,o.size),f);c=V(G(H(o,p)),G(o));let m=K(s,c),h=K(s,c);i=H(H(H(l,u),m),h);let g=Wl(i,r);r=Gc(g,i,r),n=Gc(g,Pf([d]),n)}return n}var nm=L({threshold_:em});function rm(e,t,n=`nearest`,r=`constant`,i=0,a){let o=I(e,`image`,`transform`,`float32`),s=I(t,`transforms`,`transform`,`float32`);O(o.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${o.rank}.`),O(s.rank===2&&(s.shape[0]===o.shape[0]||s.shape[0]===1)&&s.shape[1]===8,()=>`Error in transform: Input transform should be batch x 8 or 1 x 8`),O(a==null||a.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${a}.`);let c={image:o,transforms:s},l={interpolation:n,fillMode:r,fillValue:i,outputShape:a};return F.runKernel(wr,c,l)}var im=L({transform_:rm});function am(e,t,n){let r=I(e,`a`,`bandPart`);O(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);let i=r.shape,[a,o]=r.shape.slice(-2),s,c;typeof t==`number`?(O(t%1==0,()=>`bandPart(): numLower must be an integer, got ${t}.`),O(t<=a,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${a}).`),s=I(t<0?a:t,`numLower`,`bandPart`)):(O(t.dtype===`int32`,()=>`bandPart(): numLower's dtype must be an int32.`),s=Gc(iu(t,0),a,Gu(t,a))),typeof n==`number`?(O(n%1==0,()=>`bandPart(): numUpper must be an integer, got ${n}.`),O(n<=o,()=>`bandPart(): numUpper (${n}) must not be greater than the number of columns (${o}).`),c=I(n<0?o:n,`numUpper`,`bandPart`)):(O(n.dtype===`int32`,()=>`bandPart(): numUpper's dtype must be an int32.`),c=Gc(iu(n,0),o,Gu(n,o)));let l=K(U(Ad(0,a,1,`int32`),[-1,1]),Ad(0,o,1,`int32`)),u=Du(ou(l,s),Kl(l,gu(c))),d=Hu([a,o],r.dtype);return U(Df(Jf(U(r,[-1,a,o])).map(e=>Gc(u,e,d))),i)}var om=L({bandPart_:am});function sm(e){let t;if(Array.isArray(e)){t=!1,O(e!=null&&e.length>0,()=>`Gram-Schmidt process: input must not be null, undefined, or empty`);let n=e[0].shape[0];for(let t=1;t<e.length;++t)O(e[t].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[t].shape[0]} vs. ${n})`)}else t=!0,e=yf(e,e.shape[0],0).map(e=>Tf(e,[0]));O(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);let n=[],r=e;for(let t=0;t<e.length;++t)n.push(F.tidy(()=>{let e=r[t];if(t>0)for(let r=0;r<t;++r){let t=H(G(H(n[r],e)),n[r]);e=K(e,t)}return V(e,El(e,`euclidean`))}));return t?Df(n,0):n}var cm=L({gramSchmidt_:sm});function lm(e,t=!1){if(O(e.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${e.rank}`),e.rank===2)return um(e,t);{let n=Jf(U(e,[e.shape.slice(0,e.shape.length-2).reduce((e,t)=>e*t),e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),r=[],i=[];return n.forEach(e=>{let[n,a]=um(e,t);r.push(n),i.push(a)}),[U(Df(r,0),e.shape),U(Df(i,0),e.shape)]}}function um(e,t=!1){return F.tidy(()=>{O(e.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);let n=e.shape[0],r=e.shape[1],i=Rl(n),a=To(e),o=Ff([[1]],[1,1]),s=To(o),c=n>=r?r:n;for(let e=0;e<c;++e){let t=a,c=s,l=i;[s,a,i]=F.tidy(()=>{let t=Ns(a,[e,e],[n-e,1]),c=El(t),l=Ns(a,[e,e],[1,1]),u=Gc(Wl(l,0),Ff([[-1]]),Ff([[1]])),d=K(l,H(u,c)),f=V(t,d);s=f.shape[0]===1?To(o):Ds([o,Ns(f,[1,0],[f.shape[0]-1,f.shape[1]])],0);let p=gu(V(ks(u,d),c)),m=Ns(a,[e,0],[n-e,r]),h=H(p,s),g=Qf(s);if(e===0)a=K(m,ks(h,ks(g,m)));else{let t=K(m,ks(h,ks(g,m)));a=Ds([Ns(a,[0,0],[e,r]),t],0)}let _=Qf(h),v=Ns(i,[0,e],[n,i.shape[1]-e]);if(e===0)i=K(v,ks(ks(v,s),_));else{let t=K(v,ks(ks(v,s),_));i=Ds([Ns(i,[0,0],[n,e]),t],1)}return[s,a,i]}),Ta([t,c,l])}return!t&&n>r&&(i=Ns(i,[0,0],[n,r]),a=Ns(a,[0,0],[r,r])),[i,a]})}var dm=L({qr_:lm}),fm={flipLeftRight:yp,grayscaleToRGB:xp,resizeNearestNeighbor:$p,resizeBilinear:Zp,rgbToGrayscale:Cp,rotateWithOffset:Tp,cropAndResize:_p,nonMaxSuppression:Op,nonMaxSuppressionAsync:Vp,nonMaxSuppressionWithScore:Up,nonMaxSuppressionWithScoreAsync:Gp,nonMaxSuppressionPadded:qp,nonMaxSuppressionPaddedAsync:Yp,threshold:nm,transform:im},pm={bandPart:om,gramSchmidt:cm,qr:dm},mm=new Map,hm=new Map,gm=class{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}},_m=class e{constructor(){this.classNameMap={}}static getMap(){return e.instance==null&&(e.instance=new e),e.instance}static register(t){e.getMap().classNameMap[t.className]=[t,t.fromConfig]}};function q(e,t,n){O(e.className!=null,()=>`Class being registered does not have the static className property defined.`),O(typeof e.className==`string`,()=>`className is required to be a string, but got type `+typeof e.className),O(e.className.length>0,()=>`Class being registered has an empty-string as its className, which is disallowed.`),t===void 0&&(t=`Custom`),n===void 0&&(n=e.className);let r=n,i=t+`>`+r;return _m.register(e),mm.set(i,e),hm.set(e,i),e}var vm=class extends gm{minimize(e,t=!1,n){let{value:r,grads:i}=this.computeGradients(e,n);if(n!=null){let e=n.map(e=>({name:e.name,tensor:i[e.name]}));this.applyGradients(e)}else this.applyGradients(i);return Ta(i),t?r:(r.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return pu(e,t)}dispose(){this.iterations_!=null&&Ta(this.iterations_)}async saveIterations(){var e=this;return e.iterations_==null&&(e.iterations_=0),{name:`iter`,tensor:vl(e.iterations_,`int32`)}}async getWeights(){throw Error(`getWeights() is not implemented for this optimizer yet.`)}async setWeights(e){var t=this;throw Error(`setWeights() is not implemented for this optimizer class ${t.getClassName()}`)}async extractIterations(e){var t=this;return t.iterations_=(await e[0].tensor.data())[0],e.slice(1)}};Object.defineProperty(vm,Symbol.hasInstance,{value:e=>e.minimize!=null&&e.computeGradients!=null&&e.applyGradients!=null});var ym=class extends vm{static get className(){return`Adadelta`}constructor(e,t,n=null){super(),this.learningRate=e,this.rho=t,this.epsilon=n,this.accumulatedGrads=[],this.accumulatedUpdates=[],n==null&&(this.epsilon=F.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=F.registeredVariables[t];this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${t}/accum_grad`,variable:R(()=>qc(r).variable(!1))}),this.accumulatedUpdates[n]==null&&(this.accumulatedUpdates[n]={originalName:`${t}/accum_var`,variable:R(()=>qc(r).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedGrads[n].variable,o=this.accumulatedUpdates[n].variable;R(()=>{let e=B(H(a,this.rho),H(Sl(i),1-this.rho)),t=H(V(bl(B(o,this.epsilon)),bl(B(a,this.epsilon))),i),n=B(H(o,this.rho),H(Sl(t),1-this.rho));a.assign(e),o.assign(n);let s=B(H(t,-this.learningRate),r);r.assign(s)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(Ta(this.accumulatedGrads.map(e=>e.variable)),Ta(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){var e=this;let t=[...e.accumulatedGrads,...e.accumulatedUpdates];return[await e.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){var t=this;e=await t.extractIterations(e);let n=e.length/2;t.accumulatedGrads=e.slice(0,n).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),t.accumulatedUpdates=e.slice(n,n*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}},bm=class extends vm{static get className(){return`Adagrad`}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=F.registeredVariables[t];this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${t}/accumulator`,variable:R(()=>$s(r.shape,this.initialAccumulatorValue).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedGrads[n].variable;R(()=>{let e=B(a,Sl(i));a.assign(e);let t=B(H(V(i,bl(B(e,F.backend.epsilon()))),-this.learningRate),r);r.assign(t)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&Ta(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){var e=this;return[await e.saveIterations()].concat(e.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){var t=this;e=await t.extractIterations(e),t.accumulatedGrads=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}},xm=class extends vm{static get className(){return`Adam`}constructor(e,t,n,r=null){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=r,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],R(()=>{this.accBeta1=vl(t).variable(),this.accBeta2=vl(n).variable()}),r==null&&(this.epsilon=F.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);R(()=>{let n=K(1,this.accBeta1),r=K(1,this.accBeta2);t.forEach((t,i)=>{let a=F.registeredVariables[t];this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${t}/m`,variable:R(()=>qc(a).variable(!1))}),this.accumulatedSecondMoment[i]==null&&(this.accumulatedSecondMoment[i]={originalName:`${t}/v`,variable:R(()=>qc(a).variable(!1))});let o=Array.isArray(e)?e[i].tensor:e[t];if(o==null)return;let s=this.accumulatedFirstMoment[i].variable,c=this.accumulatedSecondMoment[i].variable,l=B(H(s,this.beta1),H(o,1-this.beta1)),u=B(H(c,this.beta2),H(Sl(o),1-this.beta2)),d=V(l,n),f=V(u,r);s.assign(l),c.assign(u);let p=B(H(V(d,B(bl(f),this.epsilon)),-this.learningRate),a);a.assign(p)}),this.accBeta1.assign(H(this.accBeta1,this.beta1)),this.accBeta2.assign(H(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&Ta(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedSecondMoment!=null&&Ta(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){var e=this;let t=[...e.accumulatedFirstMoment,...e.accumulatedSecondMoment];return[await e.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){var t=this;e=await t.extractIterations(e),R(()=>{t.accBeta1.assign(_l(t.beta1,t.iterations_+1)),t.accBeta2.assign(_l(t.beta2,t.iterations_+1))});let n=e.length/2;t.accumulatedFirstMoment=e.slice(0,n).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),t.accumulatedSecondMoment=e.slice(n,n*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}},Sm=class extends vm{static get className(){return`Adamax`}constructor(e,t,n,r=null,i=0){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=r,this.decay=i,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],R(()=>{this.iteration=vl(0).variable(),this.accBeta1=vl(t).variable()}),r==null&&(this.epsilon=F.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);R(()=>{let n=K(1,this.accBeta1),r=V(-this.learningRate,B(H(this.iteration,this.decay),1));t.forEach((t,i)=>{let a=F.registeredVariables[t];this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${t}/m`,variable:qc(a).variable(!1)}),this.accumulatedWeightedInfNorm[i]==null&&(this.accumulatedWeightedInfNorm[i]={originalName:`${t}/v`,variable:qc(a).variable(!1)});let o=Array.isArray(e)?e[i].tensor:e[t];if(o==null)return;let s=this.accumulatedFirstMoment[i].variable,c=this.accumulatedWeightedInfNorm[i].variable,l=B(H(s,this.beta1),H(o,1-this.beta1)),u=zu(H(c,this.beta2),No(o));s.assign(l),c.assign(u);let d=B(H(V(r,n),V(l,B(u,this.epsilon))),a);a.assign(d)}),this.iteration.assign(B(this.iteration,1)),this.accBeta1.assign(H(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&Ta(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedWeightedInfNorm!=null&&Ta(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw Error(`getWeights() is not implemented for Adamax yet.`)}async setWeights(e){throw Error(`setWeights() is not implemented for Adamax yet.`)}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}},Cm=class extends vm{static get className(){return`SGD`}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=Array.isArray(e)?e[n].tensor:e[t];if(r==null)return;let i=F.registeredVariables[t];R(()=>{let e=B(H(this.c,r),i);i.assign(e)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=Ea(vl(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(e=await this.extractIterations(e),e.length!==0)throw Error(`SGD optimizer does not have settable weights.`)}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}},wm=class extends Cm{static get className(){return`Momentum`}constructor(e,t,n=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=n,this.accumulations=[],this.m=vl(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=F.registeredVariables[t];this.accumulations[n]==null&&(this.accumulations[n]={originalName:`${t}/momentum`,variable:R(()=>qc(r).variable(!1))});let i=this.accumulations[n].variable,a=Array.isArray(e)?e[n].tensor:e[t];a!=null&&R(()=>{let e,t=B(H(this.m,i),a);e=this.useNesterov?B(H(this.c,B(a,H(t,this.m))),r):B(H(this.c,t),r),i.assign(t),r.assign(e)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&Ta(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){var e=this;return[await e.saveIterations()].concat(e.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){var t=this;e=await t.extractIterations(e),t.accumulations=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}},Tm=class extends vm{static get className(){return`RMSProp`}constructor(e,t=.9,n=0,r=null,i=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=n,this.epsilon=r,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=i,r==null&&(this.epsilon=F.backend.epsilon()),e==null)throw Error(`learningRate for RMSPropOptimizer must be defined.`)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=F.registeredVariables[t];this.accumulatedMeanSquares[n]==null&&(this.accumulatedMeanSquares[n]={originalName:`${t}/rms`,variable:R(()=>qc(r).variable(!1))}),this.accumulatedMoments[n]==null&&(this.accumulatedMoments[n]={originalName:`${t}/momentum`,variable:R(()=>qc(r).variable(!1))}),this.accumulatedMeanGrads[n]==null&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${t}/mg`,variable:R(()=>qc(r).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedMeanSquares[n].variable,o=this.accumulatedMoments[n].variable;R(()=>{let e=B(H(a,this.decay),H(Sl(i),1-this.decay));if(this.centered){let t=this.accumulatedMeanGrads[n].variable,s=B(H(t,this.decay),H(i,1-this.decay)),c=V(H(i,this.learningRate),bl(K(e,B(Sl(s),this.epsilon)))),l=B(H(o,this.momentum),c);a.assign(e),t.assign(s),o.assign(l);let u=K(r,l);r.assign(u)}else{let e=B(H(a,this.decay),H(Sl(i),1-this.decay)),t=B(H(o,this.momentum),V(H(i,this.learningRate),bl(B(e,this.epsilon))));a.assign(e),o.assign(t);let n=K(r,t);r.assign(n)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&Ta(this.accumulatedMeanSquares.map(e=>e.variable)),this.accumulatedMeanGrads!=null&&this.centered&&Ta(this.accumulatedMeanGrads.map(e=>e.variable)),this.accumulatedMoments!=null&&Ta(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){var e=this;let t=[...e.accumulatedMeanSquares,...e.accumulatedMoments];return e.centered&&t.push(...e.accumulatedMeanGrads),[await e.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){var t=this;e=await t.extractIterations(e);let n=t.centered?e.length/3:e.length/2;t.accumulatedMeanSquares=e.slice(0,n).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),t.accumulatedMoments=e.slice(n,n*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),t.centered&&(t.accumulatedMeanGrads=e.slice(n*2,n*3).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}},Em=[ym,bm,xm,Sm,wm,Tm,Cm];function Dm(){for(let e of Em)q(e)}function Om(e,t){let n=e.shape.length,r=t.shape.length;if(n<1)throw Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(r<1)throw Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if(t.dtype!==`int32`)throw Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[r-1]>n)throw Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[r-1]} vs. ${n}`);if(k(e.shape)===0)throw Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);let i=t.shape,a=i[i.length-1],o=1;for(let e=0;e<i.length-1;++e)o*=i[e];let s=e.shape,c=i.slice();c.pop();let l=1;for(let e=a;e<n;++e)l*=s[e],c.push(s[e]);let u=[...M(e.shape).map(e=>e/l),1].slice(0,a);return[c,o,l,u]}var km=c({assertParamsValid:()=>Mm,computeFlatOffset:()=>Gm,computeOutShape:()=>Pm,getNormalizedAxes:()=>Rm,isSliceContinous:()=>Wm,maskToAxes:()=>Nm,parseSliceParams:()=>Km,sliceInfo:()=>qm,startForAxis:()=>Hm,startIndicesWithElidedDims:()=>zm,stopForAxis:()=>Um,stopIndicesWithElidedDims:()=>Bm,stridesForAxis:()=>Vm,stridesWithElidedDims:()=>Fm}),Am=-2,jm=-1;function Mm(e,t,n){let r=e.shape.length;O(r===t.length,()=>`Error in slice${r}D: Length of begin ${t} must match the rank of the array (${r}).`),O(r===n.length,()=>`Error in slice${r}D: Length of size ${n} must match the rank of the array (${r}).`);for(let i=0;i<r;++i)O(t[i]+n[i]<=e.shape[i],()=>`Error in slice${r}D: begin[${i}] + size[${i}] (${t[i]+n[i]}) would overflow input.shape[${i}] (${e.shape[i]})`)}function Nm(e){let t=[],n=0;for(;e>0;)e&1&&t.push(n),e/=2,n++;return t}function Pm(e,t,n){let r=[];for(let i=0;i<e.length;i++)r[i]=Math.ceil((t[i]-e[i])/n[i]);return r}function Fm(e,t,n,r){let i=[...e];for(let e=i.length;e<r.length;e++)i.push(1);for(let e=0;e<n;e++)e===0?i[t]=1:(i.splice(t,0,1),i.pop());return i}function Im(e,t,n){return n<=e?n:n-(t-1)}function Lm(e,t){let n=[];for(let r=0;r<e;r++)n.push(t+r);return n}function Rm(e,t,n,r,i,a,o,s,c){let l=e.length,u=Array(l),d=Array(l),f=Array(l);if(t.length&&n>0){let c=t[0],l=n+1;u=zm(o,c,l,r,e),d=Bm(s,c,l,i,e),f=Fm(a,c,l,e)}else for(let t=0;t<l;t++)u[t]=Hm(o,r,a,e,t,c),d[t]=Um(s,i,a,e,t,c),f[t]=Vm(a,t,c);return{begin:u,end:d,strides:f}}function zm(e,t,n,r,i){let a=[...i],o=Lm(n,t);for(let i=0;i<a.length;i++)if(o.indexOf(i)>-1)a[i]=0;else{let o=Im(t,n,i),s=r[o];e&1<<o&&(s=0),a[i]=s}return a}function Bm(e,t,n,r,i){let a=[...i],o=Lm(n,t);for(let i=0;i<a.length;i++)if(o.indexOf(i)>-1)a[i]=2**53-1;else{let o=Im(t,n,i),s=r[o];e&1<<o&&(s=2**53-1),a[i]=s}for(let e=0;e<a.length;e++){let t=i[e];a[e]<0&&(a[e]+=t),a[e]=w(0,a[e],i[e])}return a}function Vm(e,t,n){let r=e[t];return(n&1<<t||r==null)&&(r=1),r}function Hm(e,t,n,r,i,a){let o=t[i],s=n[i]||1;(e&1<<i||a&1<<i||o==null)&&(o=s>0?-(2**53-1):2**53-1);let c=r[i];return o<0&&(o+=c),o=w(0,o,c-1),o}function Um(e,t,n,r,i,a){let o=t[i],s=n[i]||1;(e&1<<i||a&1<<i||o==null)&&(o=s>0?2**53-1:-(2**53-1));let c=r[i];return o<0&&(o+=c),o=s>0?w(0,o,c):w(-1,o,c-1),o}function Wm(e,t,n){let r=n.length;for(let e=0;e<n.length;e++)if(n[e]>1){r=e;break}for(let i=r+1;i<n.length;i++)if(t[i]>0||n[i]!==e[i])return!1;return!0}function Gm(e,t){let n=e.length>0?e[e.length-1]:1;for(let r=0;r<e.length-1;r++)n+=e[r]*t[r];return n}function Km(e,t,n){let r,i=e.shape.length;r=typeof t==`number`?[t,...Array(i-1).fill(0)]:t.length<i?t.concat(Array(i-t.length).fill(0)):t.slice(),r.forEach(e=>{O(e!==-1,()=>`slice() does not support negative begin indexing.`)});let a;return a=n==null?Array(i).fill(-1):typeof n==`number`?[n,...Array(i-1).fill(-1)]:n.length<i?n.concat(Array(i-n.length).fill(-1)):n,a=a.map((t,n)=>t>=0?t:(O(t===-1,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${n}.`),e.shape[n]-r[n])),[r,a]}function qm(e,t,n,r,i,a,o,s,c){let l;if(r==null?(l=Array(t.length),l.fill(1)):l=r,o!=null&&o&o-1)throw Error(`Multiple ellipses in slice is not allowed.`);let u=!1,d={dims:l.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:n.slice(),strides:l.slice(),beginMask:i,endMask:a,ellipsisMask:o,newAxisMask:s,shrinkAxisMask:c};for(let e=0;e<d.dims;e++)u&&1<<e&s&&d.numAddAxisAfterEllipsis++,1<<e&o&&(u=!0);u||(d.ellipsisMask|=1<<d.dims,d.dims++);let f={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};Jm(d,f);let p=!0,m=!0,h=!0,g=[],_=[];for(let t=0;t<e.length;++t){if(f.strides[t]===0)throw Error(`strides[${t}] must be non-zero`);let n=!!(f.shrinkAxisMask&1<<t),r=e[t];if(r===-1){g.push(n?1:-1);continue}let i=[f.beginMask&1<<t,f.endMask&1<<t],a=[f.strides[t]>0?0:-1,f.strides[t]>0?r:r-1];if(n&&f.strides[t]<=0)throw Error(`only stride 1 allowed on non-range indexing.`);h=h&&f.strides[t]===1;let o=!!(f.beginMask&1<<t&&f.endMask&1<<t);if(f.beginValid&&f.endValid){if(n){let e=f.begin[t]<0?r+f.begin[t]:f.begin[t];if(f.begin[t]=e,f.end[t]=f.begin[t]+1,e<0||e>=r)throw Error(`slice index ${f.begin[t]} of dimension ${t} out of bounds.`)}else f.begin[t]=Ym(f.begin[t],0,f.strides[t],r,i,a),f.end[t]=Ym(f.end[t],1,f.strides[t],r,i,a);let e=f.strides[t]===1&&f.begin[t]===0&&f.end[t]===r;p=p&&e,m=m&&(t===0&&f.strides[t]===1||e)}else p=p&&f.strides[t]===1&&o,m=m&&(t===0&&f.strides[t]===1||o);let s,c=!1;if(f.beginValid&&f.endValid?(s=f.end[t]-f.begin[t],c=!0):n?(s=1,c=!0):o&&r>=0&&(s=f.strides[t]<0?-r:r,c=!0),c){let e;e=s===0||s<0!=f.strides[t]<0?0:Math.trunc(s/f.strides[t])+(s%f.strides[t]===0?0:1),g.push(e)}else g.push(-1)}for(let e=0;e<f.finalShapeGatherIndices.length;++e){let t=f.finalShapeGatherIndices[e];t>=0?_.push(g[t]):t===Am&&_.push(1)}return{finalShapeSparse:_.filter((e,t)=>f.finalShapeGatherIndices[t]!==Am),finalShape:_,isIdentity:p,sliceDim0:m,isSimpleSlice:h,begin:f.begin,end:f.end,strides:f.strides}}function Jm(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let n=0;t.beginValid=e.begin!=null,t.endValid=e.end!=null,t.begin=Array(t.dims),t.end=Array(t.dims),t.strides=Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=Array(t.dims);for(let r=0;r<e.dims;r++)if(1<<r&e.ellipsisMask){let i=Math.min(t.dims-(e.dims-r)+1+e.numAddAxisAfterEllipsis,t.dims);for(;n<i;n++)t.begin[n]=0,t.end[n]=0,t.strides[n]=1,t.beginMask|=1<<n,t.endMask|=1<<n,t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[n]=r}else if(1<<r&e.newAxisMask)t.finalShapeGatherIndices.push(Am),t.finalShapeGatherIndicesSparse.push(-1);else{if(n===t.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${t.dims} dims, ${t.begin.length}.`);e.begin!=null&&(t.begin[n]=e.begin[r]),e.end!=null&&(t.end[n]=e.end[r]),t.strides[n]=e.strides[r],e.beginMask&1<<r&&(t.beginMask|=1<<n),e.endMask&1<<r&&(t.endMask|=1<<n),e.shrinkAxisMask&1<<r?(t.finalShapeGatherIndices.push(jm),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<n):(t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(r)),t.inputShapeGatherIndicesSparse[n]=r,n++}}function Ym(e,t,n,r,i,a){if(i[t])return n>0?a[t]:a[t+1&1];{let t=e<0?r+e:e;return t<a[0]?a[0]:t>a[1]?a[1]:t}}var Xm=class{static sgd(e){return new Cm(e)}static momentum(e,t,n=!1){return new wm(e,t,n)}static rmsprop(e,t=.9,n=0,r=null,i=!1){return new Tm(e,t,n,r,i)}static adam(e=.001,t=.9,n=.999,r=null){return new xm(e,t,n,r)}static adadelta(e=.001,t=.95,n=null){return new ym(e,t,n)}static adamax(e=.002,t=.9,n=.999,r=null,i=0){return new Sm(e,t,n,r,i)}static adagrad(e,t=.1){return new bm(e,t)}},Zm=typeof requestAnimationFrame<`u`?requestAnimationFrame:typeof setImmediate<`u`?setImmediate:e=>e();function Qm(){return new Promise(e=>Zm(()=>e()))}function $m(e,t){let n=e[0].length;e.forEach((e,t)=>{O(e.length===n,()=>`Error in concat${n}D: rank of tensors[${t}] must be the same as the rank of the rest (${n})`)}),O(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);let r=e[0];e.forEach((e,i)=>{for(let a=0;a<n;a++)O(a===t||e[a]===r[a],()=>`Error in concat${n}D: Shape of tensors[${i}] (${e}) does not match the shape of the rest (${r}) along the non-concatenated axis ${i}.`)})}function eh(e,t){let n=e[0].slice();for(let r=1;r<e.length;r++)n[t]+=e[r][t];return n}var th;(function(e){e[e.FIRST_DIM_SIZE=0]=`FIRST_DIM_SIZE`,e[e.VALUE_ROWIDS=1]=`VALUE_ROWIDS`,e[e.ROW_LENGTHS=2]=`ROW_LENGTHS`,e[e.ROW_SPLITS=3]=`ROW_SPLITS`,e[e.ROW_LIMITS=4]=`ROW_LIMITS`,e[e.ROW_STARTS=5]=`ROW_STARTS`})(th||(th={}));function nh(e,t,n){let r=[];if(n==null&&t==null)return r;if(t==null)for(;r.length<e+n.length;)r.push(-1);else r=t.slice();if(n==null)return r;if(e+n.length!==r.length)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+n.length}, but shape.rank = ${r.length}`);for(let i=1;i<n.length;++i){let a=n[i],o=r[r.length-n.length+i],s=r[o];if(a>=0)if(s>=0){if(s!==a)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${i+e}] = ${a} but shape[${i+e}] = ${s}`)}else r[o]=a}return r}function rh(e){let t={FIRST_DIM_SIZE:th.FIRST_DIM_SIZE,VALUE_ROWIDS:th.VALUE_ROWIDS,ROW_LENGTHS:th.ROW_LENGTHS,ROW_SPLITS:th.ROW_SPLITS,ROW_LIMITS:th.ROW_LIMITS,ROW_STARTS:th.ROW_STARTS},n=[];for(let r of e)if(r in t)n.push(t[r]);else break;return n}function ih(e){return e.length===0?0:e[0]===th.FIRST_DIM_SIZE?e.length-1:e.length}function ah(e,t){if(e==null||t==null)return;let n=e.length,r=t.length;if(n>=r)throw Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${r})`);for(let i=0;i<Math.min(n,r-1);++i){let n=e[i],r=t[i+1];if(n>=0&&r>=0&&n!==1&&n!==r)throw Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${i-e.length}] = ${n} but ragged tensor input.flatValues.shape[${i-e.length}] = ${r}`)}}function oh(e){return e<=30?e:be(e,Math.floor(Math.sqrt(e)))}function sh(e,t,n){return[n*(typeof e==`number`?e:e[0]),t*(typeof e==`number`?e:e[1])]}function ch(e,t,n,r=!0){let i=[];if(r)i=i.concat(t.slice(0)),i.push(e[0]/n),i=i.concat(e.slice(1));else{i=i.concat(e[0]);let n=t.length;for(let r=0;r<n;++r)i=i.concat([e[r+1]/t[r],t[r]]);i=i.concat(e.slice(n+1))}return i}function lh(e,t,n=!0){let r=[];if(n){r.push(t);for(let n=t+1;n<e;++n)n<=2*t?(r.push(n),r.push(n-(t+1))):r.push(n)}else{let n=[],i=[];for(let r=1;r<e;++r)r>=t*2+1||r%2==1?i.push(r):n.push(r);r.push(...n),r.push(0),r.push(...i)}return r}function uh(e,t,n,r=!0){let i=[];r?i.push(e[0]/n):i.push(e[0]*n);for(let n=1;n<e.length;++n)n<=t.length?r?i.push(t[n-1]*e[n]):i.push(e[n]/t[n-1]):i.push(e[n]);return i}function dh(e,t){let n=[0];for(let r=0;r<t;++r)n.push(e[r][0]);return n}function fh(e,t,n){let r=e.slice(0,1);for(let i=0;i<n;++i)r.push(e[i+1]-t[i][0]-t[i][1]);return r}var ph=1.7580993408473768,mh=1.0507009873554805,hh=.3275911,gh=.254829592,_h=-.284496736,vh=1.421413741,yh=-1.453152027,bh=1.061405429;function xh(e,t){if(e.length!==t.length)throw Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);let n=new Float32Array(e.length*2);for(let r=0;r<n.length;r+=2)n[r]=e[r/2],n[r+1]=t[r/2];return n}function Sh(e){let t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let r=0;r<e.length;r+=2)t[r/2]=e[r],n[r/2]=e[r+1];return{real:t,imag:n}}function Ch(e){let t=Math.ceil(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=0;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function wh(e){let t=Math.floor(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=2;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function Th(e,t){return{real:e[t*2],imag:e[t*2+1]}}function Eh(e,t,n,r){e[r*2]=t,e[r*2+1]=n}function Dh(e,t){let n=new Float32Array(e/2),r=new Float32Array(e/2);for(let i=0;i<Math.ceil(e/2);i++){let a=(t?2:-2)*Math.PI*(i/e);n[i]=Math.cos(a),r[i]=Math.sin(a)}return{real:n,imag:r}}function Oh(e,t,n){let r=(n?2:-2)*Math.PI*(e/t);return{real:Math.cos(r),imag:Math.sin(r)}}var kh=`->`,Ah=/->/g,jh=`,`,Mh=`...`;function Nh(e,t){e=e.replace(/\s/g,``);let n=(e.length-e.replace(Ah,``).length)/2;if(n<1)throw Error(`Equations without an arrow are not supported.`);if(n>1)throw Error(`Equation must contain exactly one arrow ("${kh}").`);let[r,i]=e.split(kh);O(r.indexOf(Mh)===-1,()=>`The ellipsis notation ("${Mh}") is not supported yet.`);let a=r.split(jh),o=a.length;if(t!==o)throw Error(`Expected ${o} input tensors, received ${t}`);if(o>2)throw Error(`Support for more than 2 input tensors is not implemented yet.`);let s=[];for(let e=0;e<i.length;++e){let t=i[e];if(!a.some(e=>e.indexOf(t)!==-1))throw Error(`Output subscripts contain the label ${t} not present in the input subscripts.`);s.indexOf(t)===-1&&s.push(t)}for(let e=0;e<r.length;++e){let t=r[e];s.indexOf(t)===-1&&t!==jh&&s.push(t)}let c=Array(a.length);for(let e=0;e<o;++e){if(new Set(a[e].split(``)).size!==a[e].length)throw Error(`Found duplicate axes in input component ${a[e]}. Support for duplicate axes in input is not implemented yet.`);c[e]=[];for(let t=0;t<a[e].length;++t)c[e].push(s.indexOf(a[e][t]))}let l=s.length,u=i.length,d=[];for(let e=u;e<l;++e)d.push(e);return{allDims:s,summedDims:d,idDims:c}}function Ph(e,t){let n=Array(e);n.fill(-1);for(let e=0;e<t.length;++e)n[t[e]]=e;let r=[];for(let t=0;t<e;++t)n[t]===-1&&r.push(t);return n=n.filter(e=>e!==-1),{permutationIndices:n,expandDims:r}}function Fh(e,t,n){let r=Array(e);for(let e=0;e<n.length;++e){let i=n[e].shape;for(let n=0;n<t[e].length;++n)r[t[e][n]]===void 0?r[t[e][n]]=i[n]:O(r[t[e][n]]===i[n],()=>`Expected dimension ${r[t[e][n]]} at axis ${n} of input shaped ${JSON.stringify(i)}, but got dimension ${i[n]}`)}}function Ih(e,t){let n=e,r=[],i=0;e.length===0&&n.push(-1),i=e.length+1;for(let e=0;e<i;++e)r.push([]);let a=[];for(let e=0;e<n.length;++e){let i=n[e],o=Rh(t,i);for(let t of o)a.indexOf(t)===-1&&(r[e].push(t),a.push(t))}return{path:n,steps:r}}function Lh(e){return e.every((e,t)=>e===t)}function Rh(e,t){let n=[];for(let r=0;r<e.length;++r)(e[r].length===0||e[r].indexOf(t)!==-1||t===-1)&&n.push(r);return n}function zh(e,t,n=0){let r=[];if(typeof t==`number`)O(e.shape[n]%t===0,()=>`Number of splits must evenly divide the axis.`),r=Array(t).fill(e.shape[n]/t);else{O(t.reduce((e,t)=>(t===-1&&(e+=1),e),0)<=1,()=>`There should be only one negative value in split array.`);let i=t.indexOf(-1);if(i!==-1){let r=t.reduce((e,t)=>t>0?e+t:e);t[i]=e.shape[n]-r}O(e.shape[n]===t.reduce((e,t)=>e+t),()=>`The sum of sizes must match the size of the axis dimension.`),r=t}return r}function Bh(e){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${e}`}function Vh(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function Hh(e,t,n){return`indices(${e}, 0) is invalid: ${t} >= ${n}`}function Uh(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function Wh(e,t){return`size ${e} must be non-negative, not ${t}`}function Gh(){return`reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero`}function Kh(e,t){return`Input to reshape is a SparseTensor with ${k(e)}
  dense values, but the requested shape requires a multiple of ${k(t)}. inputShape=${e} outputShape= ${t}`}function qh(e,t){return`Input to reshape is a tensor with ${k(e)} dense values, but the requested shape has ${k(t)}. inputShape=${e} outputShape=${t}`}function Jh(){return`segment ids must be >= 0`}function Yh(){return`segment ids are not increasing`}function Xh(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function Zh(e,t,n){return`Bad: indices[${e}] == ${t} out of range [0, ${n})`}var Qh=c({collectGatherOpShapeInfo:()=>tg,computeOutShape:()=>eg,segOpComputeOptimalWindowSize:()=>$h});function $h(e,t){let n=!1,r;for(e<=30?(r=e,n=!0):r=be(e,Math.floor(Math.sqrt(e)));!n;)r>t||r===e?n=!0:r=be(e,r+1);return r}function eg(e,t,n){let r=[],i=e.length;for(let a=0;a<i;a++)a===t?r.push(n):r.push(e[a]);return r}function tg(e,t,n,r){let i=t.shape.length,a=e.shape.length;if(r!==0&&(r<-i||r>i))throw Error(`Expect batchDims in the range of [-${i}, ${i}], but got ${r}`);if(r<0&&(r+=i),r>a)throw Error(`batchDims (${r}) must be less than rank(x) (
    ${a}).`);if(n<r)throw Error(`batchDims (${r}) must be less than or equal to axis (${n}).`);for(let n=0;n<r;++n)if(e.shape[n]!==t.shape[n])throw Error(`x.shape[${n}]: ${e.shape[n]} should be equal to indices.shape[${n}]: ${t.shape[n]}.`);let o=e.shape[n],s=[],c=1,l=1,u=1;for(let t=0;t<r;++t)s.push(e.shape[t]),c*=e.shape[t];for(let t=r;t<n;t++)s.push(e.shape[t]),l*=e.shape[t];for(let e=r;e<i;e++)s.push(t.shape[e]);for(let t=n+1;t<a;t++)s.push(e.shape[t]),u*=e.shape[t];return{batchSize:c,sliceSize:u,outerSize:l,dimSize:o,outputShape:s}}var ng=c({ERF_A1:()=>gh,ERF_A2:()=>_h,ERF_A3:()=>vh,ERF_A4:()=>yh,ERF_A5:()=>bh,ERF_P:()=>hh,PARALLELIZE_THRESHOLD:()=>30,RowPartitionType:()=>th,SELU_SCALE:()=>mh,SELU_SCALEALPHA:()=>ph,applyActivation:()=>op,assertAndGetBroadcastShape:()=>W,assertAxesAreInnerMostDims:()=>cl,assertParamsConsistent:()=>$m,assignToTypedArray:()=>Eh,axesAreInnerMostDims:()=>il,calculateShapes:()=>Rf,checkEinsumDimSizes:()=>Fh,checkPadOnDimRoundingMode:()=>bs,combineLocations:()=>al,combineRaggedTensorToTensorShapes:()=>nh,complexWithEvenIndex:()=>Ch,complexWithOddIndex:()=>wh,computeConv2DInfo:()=>as,computeConv3DInfo:()=>os,computeDefaultPad:()=>ls,computeDilation2DInfo:()=>ns,computeOptimalWindowSize:()=>oh,computeOutAndReduceShapes:()=>ol,computeOutShape:()=>eh,computePool2DInfo:()=>rs,computePool3DInfo:()=>is,convertConv2DDataFormat:()=>ys,decodeEinsumEquation:()=>Nh,eitherStridesOrDilationsAreOne:()=>_s,expandShapeToKeepDim:()=>sl,exponent:()=>Oh,exponents:()=>Dh,fromStringArrayToUint8:()=>ig,fromUint8ToStringArray:()=>rg,getAxesPermutation:()=>ll,getBroadcastDims:()=>Bc,getComplexWithIndex:()=>Th,getEinsumComputePath:()=>Ih,getEinsumPermutation:()=>Ph,getFusedBiasGradient:()=>ap,getFusedDyActivation:()=>ip,getImageCenter:()=>sh,getInnerMostAxes:()=>dl,getPermuted:()=>lh,getRaggedRank:()=>ih,getReductionAxes:()=>Vc,getReshaped:()=>ch,getReshapedPermuted:()=>uh,getRowPartitionTypesHelper:()=>rh,getSliceBeginCoords:()=>dh,getSliceSize:()=>fh,getSparseFillEmptyRowsIndicesDenseShapeMismatch:()=>Bh,getSparseFillEmptyRowsNegativeIndexErrorMessage:()=>Vh,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:()=>Hh,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:()=>Gh,getSparseReshapeInputOutputMismatchErrorMessage:()=>qh,getSparseReshapeInputOutputMultipleErrorMessage:()=>Kh,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:()=>Uh,getSparseReshapeNegativeOutputDimErrorMessage:()=>Wh,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:()=>Zh,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:()=>Jh,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:()=>Yh,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:()=>Xh,getUndoAxesPermutation:()=>ul,isIdentityPermutation:()=>Lh,log:()=>Lr,mergeRealAndImagArrays:()=>xh,prepareAndValidate:()=>Om,prepareSplitSize:()=>zh,segment_util:()=>Qh,shouldFuse:()=>sp,slice_util:()=>km,splitRealAndImagArrays:()=>Sh,stridesOrDilationsArePositive:()=>vs,tupleValuesAreOne:()=>gs,upcastType:()=>Ki,validateDefaultValueShape:()=>ah,validateInput:()=>Lf,validateUpdateShape:()=>If,warn:()=>Ir});function rg(e){try{return e.map(e=>gi(e))}catch(e){throw Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function ig(e){return e.map(e=>hi(e))}Dm();var ag={kernelName:`Abs`,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(e,kf(z(n,`float32`),-1))}}},og={kernelName:He,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>{let t=Sl(z(n,`float32`));return gu(V(e,bl(K(vl(1),t))))}}}},sg={kernelName:Ue,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,bl(K(Sl(z(n,`float32`)),1)))}}},cg={kernelName:`Add`,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t,i=W(n.shape,r.shape);return{a:()=>{let t=e,r=Vc(n.shape,i);return r.length>0&&(t=G(t,r)),U(t,n.shape)},b:()=>{let t=e,n=Vc(r.shape,i);return n.length>0&&(t=G(t,n)),U(t,r.shape)}}}},lg={kernelName:We,saveAllInputs:!0,gradFunc:(e,t)=>{let n={};return t.forEach((t,r)=>{n[r]=()=>e.clone()}),n}},ug={kernelName:Ge,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>qc(n)}}},dg={kernelName:Ke,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>qc(n)}}},fg={kernelName:qe,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,bl(K(vl(1),Sl(z(n,`float32`)))))}}},pg={kernelName:Je,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,bl(B(vl(1),Sl(z(n,`float32`)))))}}},mg={kernelName:Ze,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t,i=W(n.shape,r.shape);return{a:()=>{let t=H(e,V(r,B(Sl(n),Sl(r)))),a=Vc(n.shape,i);return a.length>0&&(t=G(t,a)),U(t,n.shape)},b:()=>{let t=gu(H(e,V(n,B(Sl(n),Sl(r))))),a=Vc(r.shape,i);return a.length>0&&(t=G(t,a)),U(t,r.shape)}}}},hg={kernelName:Ye,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,B(Sl(z(n,`float32`)),1))}}},gg={kernelName:Xe,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,K(vl(1),Sl(z(n,`float32`))))}}};function _g(e,t,n,r,i,a){let o=I(e,`dy`,`avgPool3dGrad`),s=I(t,`input`,`avgPool3dGrad`),c=o,l=s,u=!1;s.rank===4&&(u=!0,c=U(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]]),l=U(s,[1,s.shape[0],s.shape[1],s.shape[2],s.shape[3]])),O(c.rank===5,()=>`Error in avgPool3dGrad: dy must be rank 5 but got rank ${c.rank}.`),O(l.rank===5,()=>`Error in avgPool3dGrad: input must be rank 5 but got rank ${l.rank}.`),bs(`avgPool3dGrad`,i,a);let d={dy:c,input:l},f={filterSize:n,strides:r,pad:i,dimRoundingMode:a},p=F.runKernel(tt,d,f);return u?U(p,[p.shape[1],p.shape[2],p.shape[3],p.shape[4]]):p}var vg=L({avgPool3dGrad_:_g}),yg={kernelName:et,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{filterSize:i,strides:a,pad:o,dimRoundingMode:s}=n;return{x:()=>vg(e,r,i,a,o,s)}}};function bg(e,t,n,r,i){let a=I(e,`dy`,`avgPoolGrad`),o=I(t,`input`,`avgPoolGrad`);O(o.rank===a.rank,()=>`Rank of input (${o.rank}) does not match rank of dy (${a.rank})`);let s=o,c=a,l=!1;o.rank===3&&(l=!0,s=U(o,[1,o.shape[0],o.shape[1],o.shape[2]]),c=U(a,[1,a.shape[0],a.shape[1],a.shape[2]])),O(c.rank===4,()=>`Error in avgPoolGrad: dy must be rank 4 but got rank ${c.rank}.`),O(s.rank===4,()=>`Error in avgPoolGrad: input must be rank 4 but got rank ${s.rank}.`);let u={dy:c,input:s},d={filterSize:n,strides:r,pad:i},f=F.runKernel($e,u,d);return l?U(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var xg=L({avgPoolGrad_:bg}),Sg={kernelName:Qe,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{filterSize:i,strides:a,pad:o}=n;return{x:()=>xg(e,r,i,a,o)}}},Cg={kernelName:nt,inputsToSave:[`a`,`b`],gradFunc:(e,t,n)=>{let[r,i]=t,{transposeA:a,transposeB:o}=n;return!a&&!o?{a:()=>ks(e,i,!1,!0),b:()=>ks(r,e,!0,!1)}:!a&&o?{a:()=>ks(e,i,!1,!1),b:()=>ks(e,r,!0,!1)}:a&&!o?{a:()=>ks(i,e,!1,!0),b:()=>ks(r,e,!1,!1)}:{a:()=>ks(i,e,!0,!0),b:()=>ks(e,r,!0,!0)}}},wg={kernelName:rt,gradFunc:(e,t,n)=>{let{blockShape:r,crops:i}=n;return{x:()=>sd(e,r,i)}}},Tg={kernelName:ot,gradFunc:(e,t,n)=>{let r=n,i=r.inputShape,a=r.shape,o=Array.from(a);for(let e=i.length-1;e>=0;e--)if(i[e]===a[e])o[e]=1;else if(i[e]!==1)throw Error(`broadcastTo(): [${i}] cannot be broadcast to [${a}].`);let s=[];for(let e=0;e<o.length;e++)o[e]>1&&s.push(e);return{x:()=>G(e,s,!0)}}},Eg={kernelName:ct,gradFunc:e=>({x:()=>e.clone()})},Dg={kernelName:lt,gradFunc:e=>({x:()=>qc(e)})},Og={kernelName:ut,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{clipValueMin:i,clipValueMax:a}=n;return{x:()=>Gc(Du(Kl(r,i),ou(r,a)),e,qc(e))}}},kg={kernelName:ft,inputsToSave:[`x`],gradFunc:ag.gradFunc},Ag={kernelName:pt,saveAllInputs:!0,gradFunc:(e,t,n)=>{let r=t.map(e=>e.shape),{axis:i}=n,a=j(i,t[0].shape)[0];return yf(e,r.map(e=>e[a]),a).map(e=>()=>e)}},jg={kernelName:mt,inputsToSave:[`x`,`filter`],gradFunc:(e,t,n)=>{let[r,i]=t,{dilations:a,strides:o,pad:s,dataFormat:c}=n;return O(gs(a),()=>`Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`),{x:()=>hc(r.shape,e,i,o,s,c),filter:()=>rp(r,e,i.shape,o,s,c)}}},Mg={kernelName:gt,inputsToSave:[`dy`,`filter`],gradFunc:(e,t,n)=>{let[r,i]=t,{strides:a,pad:o,dataFormat:s,dimRoundingMode:c}=n;return{dy:()=>dc(e,i,a,o,s,1,c),filter:()=>rp(e,r,i.shape,a,o,s,c)}}};function Ng(e,t,n,r,i){let a=e;e.rank===4&&(a=U(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]]));let o=t;o.rank===4&&(o=U(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]])),O(a.rank===5,()=>`Error in conv3dDerFilter: input must be rank 5, but got shape ${a.shape}.`),O(o.rank===5,()=>`Error in conv3dDerFilter: dy must be rank 5, but got shape ${o.shape}.`),O(n.length===5,()=>`Error in conv3dDerFilter: filterShape must be length 5, but got ${n}.`),O(a.shape[4]===n[3],()=>`Error in conv3dDerFilter: depth of input ${a.shape[4]}) must match input depth in filter (${n[3]}.`),O(o.shape[4]===n[4],()=>`Error in conv3dDerFilter: depth of dy (${o.shape[4]}) must match output depth for filter (${n[4]}).`);let s={x:a,dy:o},c={strides:r,pad:i,filterShape:n};return F.runKernel(vt,s,c)}var Pg=L({conv3DBackpropFilter_:Ng}),Fg={kernelName:_t,inputsToSave:[`x`,`filter`],gradFunc:(e,t,n)=>{let{dilations:r,strides:i,pad:a}=n;O(gs(r),()=>`Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${r}'`);let[o,s]=t;return{x:()=>xc(o.shape,e,s,i,a),filter:()=>Pg(o,e,s.shape,i,a)}}},Ig={kernelName:`Cos`,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(gu(Qd(z(n,`float32`))),e)}}},Lg={kernelName:bt,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(ef(z(n,`float32`)),e)}}},Rg={kernelName:St,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{axis:i,exclusive:a,reverse:o}=n;return{x:()=>{let t=ll([i],r.rank),n=jc(e,i,a,!o);return t!=null&&(n=Qf(n,t)),n}}}},zg={kernelName:Et,inputsToSave:[`x`,`filter`],gradFunc:(e,t,n)=>{let{dilations:r,strides:i,pad:a,dimRoundingMode:o}=n,s=r==null?[1,1]:r;O(gs(s),()=>`Error in gradient of depthwiseConv2dNative: dilation rates greater than 1 are not yet supported. Got dilations '${s}'`);let[c,l]=t;return O(c.rank===4,()=>`Error in gradient of depthwiseConv2dNative: input must be rank 4, but got rank ${c.rank}.`),O(l.rank===4,()=>`Error in gradient of depthwiseConv2dNative: filter must be rank 4, but got rank ${l.rank}.`),O(c.shape[3]===l.shape[2],()=>`Error in gradient of depthwiseConv2d: number of input channels (${c.shape[3]}) must match the inChannels dimension in filter ${l.shape[2]}.`),O(_s(i,s),()=>`Error in gradient of depthwiseConv2d: Either strides or dilations must be  1. Got strides ${i} and dilations '${s}'.`),bs(`depthwiseConv2d`,a,o),{x:()=>pp(c.shape,e,l,i,a,s,o),filter:()=>dp(c,e,l.shape,i,a,s,o)}}},Bg={kernelName:At,inputsToSave:[`x`,`filter`],gradFunc:(e,t,n)=>{let[r,i]=t,a={x:r,filter:i,dy:e},o={x:r,filter:i,dy:e};return{x:()=>F.runKernel(jt,a,n),filter:()=>F.runKernel(Mt,o,n)}}},Vg={kernelName:`Elu`,outputsToSave:[!0],gradFunc:(e,t)=>{let[n]=t,r={dy:e,y:n};return{x:()=>F.runKernel(It,r)}}},Hg={kernelName:`Erf`,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t,r=H(Al(gu(Sl(n))),2/Math.sqrt(Math.PI));return{x:()=>H(e,r)}}},Ug={kernelName:`Exp`,outputsToSave:[!0],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(e,n)}}},Wg={kernelName:Rt,inputsToSave:[`input`],gradFunc:(e,t)=>{let[n]=t;return{input:()=>U(e,n.shape)}}},Gg={kernelName:zt,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(e,Al(n))}}},Kg={kernelName:Ht,gradFunc:e=>({x:()=>qc(e)})},qg={kernelName:Ut,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t,i=W(n.shape,r.shape);return{a:()=>{let t=V(e,z(r,`float32`)),a=Vc(n.shape,i);return a.length>0?U(G(t,a),n.shape):t},b:()=>{let t=H(e,z(n,`float32`)),a=Vc(r.shape,i);a.length>0&&(t=U(G(t,a),r.shape));let o=Sl(r);return gu(V(t,z(o,`float32`)))}}}},Jg={kernelName:Wt,inputsToSave:[`x`,`mean`,`variance`,`scale`],gradFunc:(e,t,n)=>{let{varianceEpsilon:r}=n,[i,a,o,s]=t,c=s==null?vl(1):s,l=Vc(a.shape,i.shape),u=[];if(a.rank===1){for(let e=0;e<i.shape.length-1;++e)u.push(i.shape[e]);u.push(1)}let d=K(i,a),f=H(e,c),p=Wd(B(o,vl(r))),m=H(H(H(p,p),p),vl(-.5));return{x:()=>a.rank===1?U(H(H(e,Il(U(p,[1,1,1,a.shape[0]]),u)),c),i.shape):U(H(H(e,p),c),i.shape),mean:()=>{let e=H(H(p,vl(-1)),f);return a.rank===1&&(e=G(e,l)),U(e,a.shape)},variance:()=>{let e=H(H(m,d),f);return a.rank===1&&(e=G(e,l)),U(e,a.shape)},scale:()=>{let t=H(e,H(d,p));return a.rank===1&&(t=G(t,l)),U(t,a.shape)},offset:()=>{let t=e;return a.rank===1&&(t=G(t,l)),U(t,a.shape)}}}},Yg={kernelName:Gt,inputsToSave:[`x`,`indices`],gradFunc:(e,t,n)=>{let[r,i]=t,{axis:a,batchDims:o}=n,s=j(a,r.shape)[0],c=(e,t,n)=>()=>{let r=e.shape,i=t.size,o=r.slice(0,s),c=o.length,l=r.slice(a,r.length).slice(1),u=l.length,d=Xg(0,c),f=Xg(c+1,c+1+u),p=U(n,Zg([o,[i],l])),m=U(t,[i]),h=Zg([[c],d,f]),g=Kf(Qf(p,h),m,e.shape[s]),_=ul(h);return g=Qf(g,_),g};if(o===1){let t=r.shape[0],n=r.split(t,0);return{x:()=>Df(n.map((t,n)=>c(t,i.slice(n,1),e.slice(n,1))())).reshape(r.shape),indices:()=>i}}else return{x:c(r,i,e),indices:()=>i}}};function Xg(e,t){let n=[];for(let r=e;r<t;++r)n.push(r);return n}function Zg(e){let t=[];for(let n=0;n<e.length;++n)for(let r=0;r<e[n].length;++r)t.push(e[n][r]);return t}var Qg={kernelName:Jt,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t;return{a:()=>qc(n),b:()=>qc(r)}}},$g={kernelName:Yt,gradFunc:e=>({x:()=>z(e,`float32`)})},e_={kernelName:Qt,gradFunc:e=>({x:()=>qc(e)})},t_={kernelName:$t,gradFunc:e=>({x:()=>qc(e)})},n_={kernelName:en,gradFunc:e=>({x:()=>qc(e)})},r_={kernelName:tn,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{alpha:i}=n,a=Wl(r,0);return{x:()=>Gc(a,e,H(e,i))}}},i_={kernelName:on,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,B(n,1))}}},a_={kernelName:`Log`,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,z(n,`float32`))}}},o_={kernelName:un,inputsToSave:[],outputsToSave:[!0],gradFunc:(e,t,n)=>{let[r]=t,{axis:i}=n;return{logits:()=>{let t=Al(r);return K(e,H(G(e,i,!0),t))}}}};function s_(e,t,n,r=5,i=1,a=1,o=.5){let s={x:e,y:t,dy:n},c={depthRadius:r,bias:i,alpha:a,beta:o};return F.runKernel(dn,s,c)}var c_=L({localResponseNormalizationBackprop_:s_}),l_={kernelName:`LRN`,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{let[r,i]=t,{depthRadius:a,bias:o,alpha:s,beta:c}=n;return{x:()=>c_(r,i,e,a,o,s,c)}}};function u_(e,t,n,r){return t.rank<n.rank&&(t=U(t,sl(t.shape,r))),e.rank<n.rank&&(e=U(e,sl(e.shape,r))),{x:()=>H(e,z(Uc(n,t),e.dtype))}}var d_={kernelName:`Max`,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{let{reductionIndices:r}=n,i=t[0],a=t[1],o=u_(e,a,i,j(r,i.shape));return{x:()=>o.x()}}},f_={kernelName:fn,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t;return{a:()=>H(e,z(Kl(n,r),`float32`)),b:()=>H(e,z(iu(n,r),`float32`))}}};function p_(e,t,n,r,i,a,o){let s=I(e,`dy`,`maxPool3dGrad`),c=I(t,`input`,`maxPool3dGrad`),l=I(n,`output`,`maxPool3dGrad`),u=s,d=c,f=l,p=!1;c.rank===4&&(p=!0,u=U(s,[1,s.shape[0],s.shape[1],s.shape[2],s.shape[3]]),d=U(c,[1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]]),f=U(l,[1,l.shape[0],l.shape[1],l.shape[2],l.shape[3]])),O(u.rank===5,()=>`Error in maxPool3dGrad: dy must be rank 5 but got rank ${u.rank}.`),O(d.rank===5,()=>`Error in maxPool3dGrad: input must be rank 5 but got rank ${d.rank}.`),O(f.rank===5,()=>`Error in maxPool3dGrad: output must be rank 5 but got rank ${f.rank}.`),bs(`maxPool3dGrad`,a,o);let m={dy:u,input:d,output:f},h={filterSize:r,strides:i,pad:a,dimRoundingMode:o},g=F.runKernel(gn,m,h);return p?U(g,[g.shape[1],g.shape[2],g.shape[3],g.shape[4]]):g}var m_=L({maxPool3dGrad_:p_}),h_={kernelName:hn,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{let[r,i]=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=n;return{x:()=>m_(e,r,i,a,o,s,c)}}};function g_(e,t,n,r,i,a,o){let s=I(e,`dy`,`maxPoolGrad`),c=I(t,`input`,`maxPoolGrad`),l=I(n,`output`,`maxPoolGrad`);O(c.rank===s.rank,()=>`Rank of input (${c.rank}) does not match rank of dy (${s.rank})`),O(s.rank===4,()=>`Error in maxPoolGrad: dy must be rank 4 but got rank ${s.rank}.`),O(c.rank===4,()=>`Error in maxPoolGrad: input must be rank 4 but got rank ${c.rank}.`),bs(`maxPoolGrad`,a,o);let u={dy:s,input:c,output:l},d={filterSize:r,strides:i,pad:a,dimRoundingMode:o};return F.runKernel(mn,u,d)}var __=L({maxPoolGrad_:g_}),v_={kernelName:pn,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{let[r,i]=t,{filterSize:a,strides:o,pad:s}=n;return{x:()=>__(e,r,i,a,o,s)}}},y_={kernelName:vn,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{axis:i}=n,a=j(i,r.shape),o=ol(r.shape,a)[1],s=k(o);return{x:()=>{let t=r.shape.slice();return a.forEach(e=>{t[e]=1}),V(H(U(e,t),Uu(r.shape,`float32`)),s)}}}},b_={kernelName:`Min`,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{let{axis:r}=n,[i,a]=t,o=u_(e,a,i,j(r,i.shape));return{x:()=>o.x()}}},x_={kernelName:yn,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t;return{a:()=>H(e,z(ou(n,r),`float32`)),b:()=>H(e,z(Wl(n,r),`float32`))}}},S_={kernelName:bn,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let r=t[0],{paddings:i}=n,a=i.map(e=>e[0]);return{x:()=>Ns(e,a,r.shape)}}},C_={kernelName:`Mod`,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t,i=W(n.shape,r.shape);return{a:()=>{let t=Vc(n.shape,i);return t.length>0?U(G(e,t),n.shape):e},b:()=>{let t=H(e,gu(Bl(V(n,r)))),a=Vc(r.shape,i);return a.length>0?U(G(t,a),r.shape):t}}}},w_={kernelName:Sn,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t,i=W(n.shape,r.shape);return{a:()=>{let t=H(e,z(r,`float32`)),a=Vc(n.shape,i);return a.length>0?U(G(t,a),n.shape):t},b:()=>{let t=H(e,z(n,`float32`)),a=Vc(r.shape,i);return a.length>0?U(G(t,a),r.shape):t}}}},T_={kernelName:`Neg`,gradFunc:e=>({x:()=>gu(e)})},E_={kernelName:On,inputsToSave:[`indices`],gradFunc:(e,t)=>{let n=t[0];return{indices:()=>Hu(n.shape,`float32`)}}},D_={kernelName:Dn,gradFunc:e=>({x:()=>qc(e)})},O_={kernelName:kn,saveAllInputs:!0,gradFunc:(e,t,n)=>{let{axis:r}=n;return Jf(e,r).map(e=>()=>e)}},k_={kernelName:An,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let r=t[0],{paddings:i}=n,a=i.map(e=>e[0]);return{x:()=>Ns(e,a,r.shape)}}},A_={kernelName:`Pow`,inputsToSave:[`a`,`b`],outputsToSave:[!0],gradFunc:(e,t)=>{let[n,r,i]=t,a=n,o=r,s=W(a.shape,o.shape);return{a:()=>{let t=z(o,`float32`),n=H(e,H(t,_l(a,K(t,vl(1))))),r=Vc(a.shape,s);return r.length>0&&(n=G(n,r)),U(n,a.shape)},b:()=>{let t=H(e,H(i,Gc(Wl(a,0),uu(a),qc(a)))),n=Vc(o.shape,s);return n.length>0&&(t=G(t,n)),U(t,o.shape)}}}},j_={kernelName:jn,inputsToSave:[`x`,`alpha`],gradFunc:(e,t)=>{let[n,r]=t,i=Wl(n,0);return{x:()=>Gc(i,e,H(e,r)),alpha:()=>{let t=Gc(i,qc(e),H(e,n)),a=Vc(r.shape,e.shape);return a.length>0&&(t=G(t,a)),U(t,r.shape)}}}};function M_(e,t,n){let r=e.shape.slice();return r[n]=1,H(U(t,r),H(kc(e,n,!0,!1),kc(e,n,!0,!0)))}function N_(e,t,n){let r=e.shape.length,i=r-n.length,a=ll(n,r),o=e;a!=null&&(o=Qf(e,a));let s=o.shape.slice(),c=s.splice(r-n.length,n.length).reduce((e,t)=>e*t,1);s.push(c);let l=M_(o.reshape(s),t,i);if(l=l.reshape(o.shape),a!=null){let e=ul(a);l=Qf(l,e)}return l}var P_={kernelName:Mn,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{axis:i}=n,a=[];return a=i==null?r.shape.map((e,t)=>t):typeof i==`number`?[i]:i,{x:()=>N_(r,e,a)}}},F_={kernelName:Pt,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t,i=W(n.shape,r.shape);return{a:()=>{let t=V(e,z(r,`float32`)),a=Vc(n.shape,i);return a.length>0?U(G(t,a),n.shape):t},b:()=>{let t=H(e,z(n,`float32`)),a=Vc(r.shape,i);a.length>0&&(t=U(G(t,a),r.shape));let o=Sl(r);return gu(V(t,z(o,`float32`)))}}}},I_={kernelName:Rn,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,gu(Sl(n)))}}},L_={kernelName:Gn,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t,r=H(ou(n,6),kf(n));return{x:()=>H(e,z(r,`float32`))}}},R_={kernelName:zn,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(e,z(kf(n),`float32`))}}},z_={kernelName:Bn,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>U(e,n.shape)}}},B_={kernelName:Un,inputsToSave:[`images`],gradFunc:(e,t,n)=>{let[r]=t,i={dy:e,images:r};return{images:()=>F.runKernel(Wn,i,n)}}},V_={kernelName:Vn,inputsToSave:[`images`],gradFunc:(e,t,n)=>{let[r]=t,i={dy:e,images:r};return{images:()=>F.runKernel(Hn,i,n)}}},H_={kernelName:Kn,gradFunc:(e,t,n)=>{let{dims:r}=n,i=j(r,e.shape);return{x:()=>Bd(e,i)}}},U_={kernelName:qn,gradFunc:e=>({x:()=>qc(e)})},W_={kernelName:Jn,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>gu(V(e,H(_l(n,1.5),2)))}}},G_={kernelName:Qn,inputsToSave:[`condition`],gradFunc:(e,t)=>{let[n]=t;return{condition:()=>z(qc(n),`float32`),t:()=>H(e,z(n,e.dtype)),e:()=>H(e,z(ku(n),e.dtype))}}},K_={kernelName:$n,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>{let t=Wl(n,vl(0)),r=vl(ph);return Gc(t,H(e,vl(mh)),H(H(e,r),Al(z(n,`float32`))))}}}},q_={kernelName:rr,outputsToSave:[!0],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(e,H(n,K(vl(1),n)))}}},J_={kernelName:nr,gradFunc:e=>({x:()=>qc(e)})},Y_={kernelName:`Sin`,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(Tc(z(n,`float32`)),e)}}},X_={kernelName:tr,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(Dc(z(n,`float32`)),e)}}},Z_={kernelName:er,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{begin:i,size:a}=n,o=r.shape,[s,c]=Km(r,i,a),l=[];for(let t=0;t<e.rank;t++)l.push([s[t],o[t]-s[t]-c[t]]);return{x:()=>ad(e,l)}}},Q_={kernelName:cr,outputsToSave:[!0],gradFunc:(e,t,n)=>{let[r]=t,{dim:i}=n,a=H(e,r);return{logits:()=>K(a,H(G(a,[i],!0),r))}}},$_={kernelName:ir,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(e,js(n))}}},ev={kernelName:or,gradFunc:(e,t,n)=>{let{blockShape:r,paddings:i}=n;return{x:()=>Ls(e,r,i)}}},tv={kernelName:sr,gradFunc:(e,t,n)=>{let{axis:r}=n;return{x:()=>Ds(e,r)}}},nv={kernelName:ar,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,H(bl(z(n,`float32`)),2))}}},rv={kernelName:hr,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(e,H(z(n,`float32`),2))}}},iv={kernelName:mr,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t,i=vl(2);return{a:()=>H(e,H(i,K(n,r))),b:()=>H(e,H(i,K(r,n)))}}},av={kernelName:Ar,gradFunc:e=>({x:()=>qc(e)})},ov={kernelName:`Sub`,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t,i=W(n.shape,r.shape);return{a:()=>{let t=e,r=Vc(n.shape,i);return r.length>0&&(t=G(t,r)),U(t,n.shape)},b:()=>{let t=e,n=Vc(r.shape,i);return n.length>0&&(t=G(t,n)),U(gu(t),r.shape)}}}},sv={kernelName:`Sum`,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,i=r.shape.slice(),{axis:a}=n;j(a,r.shape).forEach(e=>{i[e]=1});let o=H(U(e,i),Uu(r.shape,`float32`));return{x:()=>o}}},cv={kernelName:`Tan`,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>V(e,Sl(Tc(n)))}}},lv={kernelName:xr,outputsToSave:[!0],gradFunc:(e,t)=>{let[n]=t;return{x:()=>H(K(vl(1),Sl(n)),e)}}},uv={kernelName:Sr,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{reps:i}=n;return{x:()=>{let t=qc(r);if(r.rank===1)for(let n=0;n<i[0];++n)t=B(t,Ns(e,[n*r.shape[0]],[r.shape[0]]));else if(r.rank===2)for(let n=0;n<i[0];++n)for(let a=0;a<i[1];++a)t=B(t,Ns(e,[n*r.shape[0],a*r.shape[1]],[r.shape[0],r.shape[1]]));else if(r.rank===3)for(let n=0;n<i[0];++n)for(let a=0;a<i[1];++a)for(let o=0;o<i[2];++o)t=B(t,Ns(e,[n*r.shape[0],a*r.shape[1],o*r.shape[2]],[r.shape[0],r.shape[1],r.shape[2]]));else if(r.rank===4)for(let n=0;n<i[0];++n)for(let a=0;a<i[1];++a)for(let o=0;o<i[2];++o)for(let s=0;s<i[3];++s)t=B(t,Ns(e,[n*r.shape[0],a*r.shape[1],o*r.shape[2],s*r.shape[3]],[r.shape[0],r.shape[1],r.shape[2],r.shape[3]]));else throw Error(`Gradient for tile operation is not implemented for rank-${r.rank} tensors yet.`);return t}}}},dv={kernelName:Tr,gradFunc:(e,t,n)=>{let{perm:r}=n,i=ul(r);return{x:()=>Qf(e,i)}}},fv={kernelName:Dr,gradFunc:(e,t,n)=>{let{axis:r}=n;return{value:()=>Df(e,r)}}},pv={kernelName:Or,inputsToSave:[`segmentIds`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>mv(e,n)}}};function mv(e,t){let n=Hl(e,zu(t,qc(t))),r=Kl(t,vl(0,`int32`)),i=n.rank-r.rank;for(let e=0;e<i;++e)r=Ml(r,e+1);r=Du(r,Uu(n.shape,`bool`));let a=qc(n);return Gc(r,n,a)}var hv=[ag,og,sg,cg,lg,ug,dg,fg,pg,mg,hg,gg,yg,Sg,Cg,wg,Tg,Eg,Dg,Og,kg,Ag,Mg,jg,Fg,Ig,Lg,Rg,zg,Bg,F_,Vg,Hg,Ug,Wg,Gg,qg,Kg,Jg,Yg,Qg,$g,e_,t_,n_,r_,i_,a_,o_,l_,d_,d_,f_,h_,v_,y_,b_,x_,S_,C_,w_,T_,E_,D_,O_,k_,k_,A_,j_,P_,I_,L_,R_,z_,B_,V_,H_,U_,W_,G_,K_,q_,J_,Y_,X_,Z_,Q_,$_,ev,ev,tv,tv,nv,iv,rv,av,ov,sv,cv,lv,uv,dv,fv,pv,{kernelName:kr,gradFunc:e=>({x:()=>qc(e)})}];for(let e of hv)Wr(e);P().prototype.abs=function(){return this.throwIfDisposed(),No(this)},P().prototype.acos=function(){return this.throwIfDisposed(),Fo(this)},P().prototype.acosh=function(){return this.throwIfDisposed(),Lo(this)},P().prototype.add=function(e){return this.throwIfDisposed(),B(this,e)},P().prototype.all=function(e,t){return this.throwIfDisposed(),zo(this,e,t)},P().prototype.any=function(e,t){return this.throwIfDisposed(),Vo(this,e,t)},P().prototype.argMax=function(e){return this.throwIfDisposed(),Uo(this,e)},P().prototype.argMin=function(e){return this.throwIfDisposed(),Go(this,e)},P().prototype.asScalar=function(){return this.throwIfDisposed(),O(this.size===1,()=>`The array must have only 1 element.`),U(this,[])},P().prototype.asType=function(e){return this.throwIfDisposed(),z(this,e)},P().prototype.as1D=function(){return this.throwIfDisposed(),U(this,[this.size])},P().prototype.as2D=function(e,t){return this.throwIfDisposed(),U(this,[e,t])},P().prototype.as3D=function(e,t,n){return this.throwIfDisposed(),U(this,[e,t,n])},P().prototype.as4D=function(e,t,n,r){return this.throwIfDisposed(),U(this,[e,t,n,r])},P().prototype.as5D=function(e,t,n,r,i){return this.throwIfDisposed(),U(this,[e,t,n,r,i])},P().prototype.asin=function(){return this.throwIfDisposed(),qo(this)},P().prototype.asinh=function(){return this.throwIfDisposed(),Yo(this)},P().prototype.atan=function(){return this.throwIfDisposed(),Zo(this)},P().prototype.atan2=function(e){return this.throwIfDisposed(),$o(this,e)},P().prototype.atanh=function(){return this.throwIfDisposed(),ts(this)},P().prototype.avgPool=function(e,t,n,r){return this.throwIfDisposed(),Cs(this,e,t,n,r)},P().prototype.batchToSpaceND=function(e,t){return this.throwIfDisposed(),Ls(this,e,t)},P().prototype.batchNorm=function(e,t,n,r,i){return this.throwIfDisposed(),Bs(this,e,t,n,r,i)},P().prototype.broadcastTo=function(e){return this.throwIfDisposed(),Xs(this,e)},P().prototype.cast=function(e){return this.throwIfDisposed(),z(this,e)},P().prototype.ceil=function(){return this.throwIfDisposed(),Qs(this)},P().prototype.clipByValue=function(e,t){return this.throwIfDisposed(),tc(this,e,t)},P().prototype.concat=function(e,t){return this.throwIfDisposed(),e instanceof Ri&&(e=[e]),Ds([this,...e],t)},P().prototype.conv1d=function(e,t,n,r,i,a){return this.throwIfDisposed(),pc(this,e,t,n,r,i,a)},P().prototype.conv2dTranspose=function(e,t,n,r,i){return this.throwIfDisposed(),_c(this,e,t,n,r,i)},P().prototype.conv2d=function(e,t,n,r,i,a){return this.throwIfDisposed(),dc(this,e,t,n,r,i,a)},P().prototype.cos=function(){return this.throwIfDisposed(),Tc(this)},P().prototype.cosh=function(){return this.throwIfDisposed(),Dc(this)},P().prototype.cumprod=function(e,t,n){return this.throwIfDisposed(),kc(this,e,t,n)},P().prototype.cumsum=function(e,t,n){return this.throwIfDisposed(),jc(this,e,t,n)},P().prototype.depthToSpace=function(e,t){return this.throwIfDisposed(),Fc(this,e,t)},P().prototype.depthwiseConv2d=function(e,t,n,r,i,a){return this.throwIfDisposed(),Lc(this,e,t,n,r,i,a)},P().prototype.dilation2d=function(e,t,n,r,i){return this.throwIfDisposed(),zc(this,e,t,n,r,i)},P().prototype.divNoNan=function(e){return this.throwIfDisposed(),Yc(this,e)},P().prototype.div=function(e){return this.throwIfDisposed(),V(this,e)},P().prototype.dot=function(e){return this.throwIfDisposed(),Zc(this,e)},P().prototype.elu=function(){return this.throwIfDisposed(),tl(this)},P().prototype.equal=function(e){return this.throwIfDisposed(),Uc(this,e)},P().prototype.erf=function(){return this.throwIfDisposed(),rl(this)},P().prototype.euclideanNorm=function(e,t){return this.throwIfDisposed(),Ol(this,e,t)},P().prototype.exp=function(){return this.throwIfDisposed(),Al(this)},P().prototype.expandDims=function(e){return this.throwIfDisposed(),Ml(this,e)},P().prototype.expm1=function(){return this.throwIfDisposed(),Pl(this)},P().prototype.fft=function(){return this.throwIfDisposed(),pf(this)},P().prototype.flatten=function(){return this.throwIfDisposed(),U(this,[this.size])},P().prototype.floor=function(){return this.throwIfDisposed(),Bl(this)},P().prototype.floorDiv=function(e){return this.throwIfDisposed(),ko(this,e)},P().prototype.gather=function(e,t,n){return this.throwIfDisposed(),Hl(this,e,t,n)},P().prototype.greaterEqual=function(e){return this.throwIfDisposed(),Kl(this,e)},P().prototype.greater=function(e){return this.throwIfDisposed(),Wl(this,e)},P().prototype.ifft=function(){return this.throwIfDisposed(),hf(this)},P().prototype.irfft=function(){return this.throwIfDisposed(),_f(this)},P().prototype.isFinite=function(){return this.throwIfDisposed(),Xl(this)},P().prototype.isInf=function(){return this.throwIfDisposed(),Ql(this)},P().prototype.isNaN=function(){return this.throwIfDisposed(),eu(this)},P().prototype.leakyRelu=function(e){return this.throwIfDisposed(),nu(this,e)},P().prototype.lessEqual=function(e){return this.throwIfDisposed(),ou(this,e)},P().prototype.less=function(e){return this.throwIfDisposed(),iu(this,e)},P().prototype.localResponseNormalization=function(e,t,n,r){return this.throwIfDisposed(),cu(this,e,t,n,r)},P().prototype.logSigmoid=function(){return this.throwIfDisposed(),bu(this)},P().prototype.logSoftmax=function(e){return this.throwIfDisposed(),Cu(this,e)},P().prototype.logSumExp=function(e,t){return this.throwIfDisposed(),Tu(this,e,t)},P().prototype.log=function(){return this.throwIfDisposed(),uu(this)},P().prototype.log1p=function(){return this.throwIfDisposed(),fu(this)},P().prototype.logicalAnd=function(e){return this.throwIfDisposed(),Du(this,e)},P().prototype.logicalNot=function(){return this.throwIfDisposed(),ku(this)},P().prototype.logicalOr=function(e){return this.throwIfDisposed(),ju(this,e)},P().prototype.logicalXor=function(e){return this.throwIfDisposed(),Nu(this,e)},P().prototype.matMul=function(e,t,n){return this.throwIfDisposed(),ks(this,e,t,n)},P().prototype.maxPool=function(e,t,n,r){return this.throwIfDisposed(),Fu(this,e,t,n,r)},P().prototype.max=function(e,t){return this.throwIfDisposed(),pl(this,e,t)},P().prototype.maximum=function(e){return this.throwIfDisposed(),zu(this,e)},P().prototype.mean=function(e,t){return this.throwIfDisposed(),Vu(this,e,t)},P().prototype.min=function(e,t){return this.throwIfDisposed(),hl(this,e,t)},P().prototype.minimum=function(e){return this.throwIfDisposed(),Gu(this,e)},P().prototype.mirrorPad=function(e,t){return this.throwIfDisposed(),qu(this,e,t)},P().prototype.mod=function(e){return this.throwIfDisposed(),Yu(this,e)},P().prototype.mul=function(e){return this.throwIfDisposed(),H(this,e)},P().prototype.neg=function(){return this.throwIfDisposed(),gu(this)},P().prototype.norm=function(e,t,n){return this.throwIfDisposed(),El(this,e,t,n)},P().prototype.notEqual=function(e){return this.throwIfDisposed(),$u(this,e)},P().prototype.oneHot=function(e,t=1,n=0){return this.throwIfDisposed(),td(this,e,t,n)},P().prototype.onesLike=function(){return this.throwIfDisposed(),rd(this)},P().prototype.pad=function(e,t){return this.throwIfDisposed(),ad(this,e,t)},P().prototype.pool=function(e,t,n,r,i,a){return this.throwIfDisposed(),dd(this,e,t,n,r,i,a)},P().prototype.pow=function(e){return this.throwIfDisposed(),_l(this,e)},P().prototype.prelu=function(e){return this.throwIfDisposed(),pd(this,e)},P().prototype.prod=function(e,t){return this.throwIfDisposed(),hd(this,e,t)},P().prototype.reciprocal=function(){return this.throwIfDisposed(),Pd(this)},P().prototype.relu=function(){return this.throwIfDisposed(),Id(this)},P().prototype.relu6=function(){return this.throwIfDisposed(),Rd(this)},P().prototype.reshapeAs=function(e){return this.throwIfDisposed(),U(this,e.shape)},P().prototype.reshape=function(e){return this.throwIfDisposed(),U(this,e)},P().prototype.resizeBilinear=function(e,t,n){return this.throwIfDisposed(),Zp(this,e,t,n)},P().prototype.resizeNearestNeighbor=function(e,t,n){return this.throwIfDisposed(),$p(this,e,t,n)},P().prototype.reverse=function(e){return this.throwIfDisposed(),Bd(this,e)},P().prototype.rfft=function(){return this.throwIfDisposed(),xf(this)},P().prototype.round=function(){return this.throwIfDisposed(),Hd(this)},P().prototype.rsqrt=function(){return this.throwIfDisposed(),Wd(this)},P().prototype.selu=function(){return this.throwIfDisposed(),Kd(this)},P().prototype.separableConv2d=function(e,t,n,r,i,a){return this.throwIfDisposed(),Jd(this,e,t,n,r,i,a)},P().prototype.sigmoid=function(){return this.throwIfDisposed(),js(this)},P().prototype.sign=function(){return this.throwIfDisposed(),Xd(this)},P().prototype.sin=function(){return this.throwIfDisposed(),Qd(this)},P().prototype.sinh=function(){return this.throwIfDisposed(),ef(this)},P().prototype.slice=function(e,t){return this.throwIfDisposed(),Ns(this,e,t)},P().prototype.softmax=function(e){return this.throwIfDisposed(),df(this,e)},P().prototype.softplus=function(){return this.throwIfDisposed(),vu(this)},P().prototype.spaceToBatchND=function(e,t){return this.throwIfDisposed(),sd(this,e,t)},P().prototype.split=function(e,t){return this.throwIfDisposed(),yf(this,e,t)},P().prototype.sqrt=function(){return this.throwIfDisposed(),bl(this)},P().prototype.square=function(){return this.throwIfDisposed(),Sl(this)},P().prototype.squaredDifference=function(e){return this.throwIfDisposed(),Cf(this,e)},P().prototype.squeeze=function(e){return this.throwIfDisposed(),Tf(this,e)},P().prototype.stack=function(e,t){return this.throwIfDisposed(),Df(e instanceof Ri?[this,e]:[this,...e],t)},P().prototype.step=function(e){return this.throwIfDisposed(),kf(this,e)},P().prototype.stridedSlice=function(e,t,n,r,i,a,o,s){return this.throwIfDisposed(),jf(this,e,t,n,r,i,a,o,s)},P().prototype.sub=function(e){return this.throwIfDisposed(),K(this,e)},P().prototype.sum=function(e,t){return this.throwIfDisposed(),G(this,e,t)},P().prototype.tan=function(){return this.throwIfDisposed(),Nf(this)},P().prototype.tanh=function(){return this.throwIfDisposed(),Fs(this)},P().prototype.tile=function(e){return this.throwIfDisposed(),Il(this,e)},P().prototype.toBool=function(){return this.throwIfDisposed(),z(this,`bool`)},P().prototype.toFloat=function(){return this.throwIfDisposed(),z(this,`float32`)},P().prototype.toInt=function(){return this.throwIfDisposed(),z(this,`int32`)},P().prototype.topk=function(e,t){return this.throwIfDisposed(),Bf(this,e,t)},P().prototype.transpose=function(e){return this.throwIfDisposed(),Qf(this,e)},P().prototype.unique=function(e){return this.throwIfDisposed(),Wf(this,e)},P().prototype.unsortedSegmentSum=function(e,t){return this.throwIfDisposed(),Kf(this,e,t)},P().prototype.unstack=function(e){return this.throwIfDisposed(),Jf(this,e)},P().prototype.where=function(e,t){return this.throwIfDisposed(),Gc(e,this,t)},P().prototype.zerosLike=function(){return this.throwIfDisposed(),qc(this)};var gv=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},_v=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},J=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},vv=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},yv=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},bv=class{constructor(e){this.maxEntries=e||100,this.cache=new Map}get(e){let t;return this.cache.has(e)&&(t=this.cache.get(e),this.cache.delete(e),this.cache.set(e,t)),t}put(e,t){if(this.cache.has(e))this.cache.delete(e);else if(this.cache.size>=this.maxEntries){let e=this.cache.keys().next().value;this.cache.delete(e)}this.cache.set(e,t)}getMaxEntries(){return this.maxEntries}setMaxEntries(e){if(e<0)throw Error(`The maxEntries of LRU caches must be at least 0, but got ${e}.`);if(this.maxEntries>e)for(let t=0;t<this.maxEntries-e;t++){let e=this.cache.keys().next().value;this.cache.delete(e)}this.maxEntries=e}};function xv(e,t){if(Array.isArray(e)){let n=[];for(let r=0;r<t;r++)n=n.concat(e);return n}else{let n=Array(t);return n.fill(e),n}}function Sv(e,t){if(!e)throw new yv(t)}function Cv(e,t){let n=0;for(let r of e)r===t&&n++;return n}function wv(e){return e.length===1?e[0]:e}function Tv(e){return Array.isArray(e)?e:[e]}function Ev(e){let t=e.replace(/(.)([A-Z][a-z0-9]+)/g,`$1_$2`).replace(/([a-z])([A-Z])/g,`$1_$2`).toLowerCase();return t[0]===`_`?`private`+t:t}function Dv(e){return e.length<=1||e.indexOf(`_`)===-1?e:e.replace(/[_]+(\w|$)/g,(e,t)=>t.toUpperCase())}var Ov={};function kv(e){if(e==null)return null;let t={};return t.className=e.getClassName(),t.config=e.getConfig(),t}function Av(e){if(!(typeof e!=`object`||!e))if(Array.isArray(e))e.forEach(e=>Av(e));else{let t=Object.keys(e);for(let n of t){let t=e[n];typeof t==`object`&&t&&(!Array.isArray(t)&&t.type===`ndarray`&&typeof t.value==`number`?e[n]=t.value:Av(t))}}}function jv(e,t={},n={},r=`object`,i=!1){if(typeof e==`string`){let i=e,a;if(i in n)a=n[i];else if(i in Ov)a=Ov[i];else if(a=t[i],a==null)throw new J(`Unknown ${r}: ${e}. This may be due to one of the following reasons:\n1. The ${r} is defined in Python, in which case it needs to be ported to TensorFlow.js or your JavaScript code.\n2. The custom ${r} is defined in JavaScript, but is not registered properly with tf.serialization.registerClass().`);return a}else{let a=e;if(a.className==null||a.config==null)throw new J(`${r}: Improper config format: ${JSON.stringify(a)}.\n'className' and 'config' must set.`);let o=a.className,s,c;if(o in n?[s,c]=n[o]:o in Ov?[s,c]=Ov.className:o in t&&([s,c]=t[o]),s==null)throw new J(`Unknown ${r}: ${o}. This may be due to one of the following reasons:\n1. The ${r} is defined in Python, in which case it needs to be ported to TensorFlow.js or your JavaScript code.\n2. The custom ${r} is defined in JavaScript, but is not registered properly with tf.serialization.registerClass().`);if(c!=null){let e={};for(let t of Object.keys(Ov))e[t]=Ov[t];for(let t of Object.keys(n))e[t]=n[t];let t=a.config;t.customObjects=e;let r=Object.assign({},Ov);for(let e of Object.keys(n))Ov[e]=n[e];Av(a.config);let o=c(s,a.config,n,i);return Ov=Object.assign({},r),o}else{let e=Object.assign({},Ov);for(let e of Object.keys(n))Ov[e]=n[e];let t=new s(a.config);return Ov=Object.assign({},e),t}}}function Mv(e,t){return e<t?-1:+(e>t)}function Nv(e,t){return-1*Mv(e,t)}function Pv(e){if(e==null)return e;let t=[];for(let n of e)t.indexOf(n)===-1&&t.push(n);return t}function Fv(e){if(e==null)throw new J(`Invalid value in obj: ${JSON.stringify(e)}`);for(let t in e)if(e.hasOwnProperty(t))return!1;return!0}function Iv(e,t,n){if(n!=null&&e.indexOf(n)<0)throw new J(`${n} is not a valid ${t}.  Valid values are ${e} or null/undefined.`)}function Lv(e,t,n=0,r=1/0){return Sv(n>=0),Sv(r>=n),Array.isArray(e)&&e.length>=n&&e.length<=r&&e.every(e=>typeof e===t)}function Rv(e,t){Array.isArray(e)?(O(e.length>0,()=>`${t} is unexpectedly an empty array.`),e.forEach((e,n)=>Rv(e,`element ${n+1} of ${t}`))):O(Number.isInteger(e)&&e>0,()=>`Expected ${t} to be a positive integer, but got ${zv(e)}.`)}function zv(e){return e===null?`null`:Array.isArray(e)?`[`+e.map(e=>zv(e)).join(`,`)+`]`:typeof e==`string`?`"${e}"`:`${e}`}function Bv(e,t,n){let r=n==null?mi():n(),i;return(...a)=>{let o=n==null?mi():n();return o-r<t?i:(r=o,i=e(...a),i)}}function Vv(e){return e===`relu`?`relu`:e===`linear`?`linear`:e===`elu`?`elu`:null}var Hv=0;function Uv(){return Hv++}var Wv={};function Gv(e=``){return e in Wv||(Wv[e]=0),Wv[e]+=1,e+Wv[e].toString()}var Kv=[`channelsFirst`,`channelsLast`],qv=[`nearest`,`bilinear`],Jv=[`valid`,`same`,`causal`],Yv=[`max`,`avg`],Xv=[`sum`,`mul`,`concat`,`ave`],Zv=new Map;function Qv(e){Iv(Kv,`DataFormat`,e)}function $v(e){Iv(qv,`InterpolationFormat`,e)}function ey(e){Iv(Jv,`PaddingMode`,e)}function ty(e){Iv(Yv,`PoolMode`,e)}var ny=[],ry=`/`;function iy(e,t){ny.push(e);try{let e=t();return ny.pop(),e}catch(e){throw ny.pop(),e}}function ay(){return ny.length===0?``:ny.join(ry)+ry}function oy(e){if(!ly(e))throw Error(`Not a valid tensor name: '`+e+`'`);return ay()+e}function sy(e){if(!ly(e))throw Error(`Not a valid tensor name: '`+e+`'`);Zv.has(e)||Zv.set(e,0);let t=Zv.get(e);if(Zv.set(e,Zv.get(e)+1),t>0){let n=`${e}_${t}`;return Zv.set(n,1),n}else return e}var cy=new RegExp(/^[A-Za-z0-9][-A-Za-z0-9\._\/]*$/);function ly(e){return!!e.match(cy)}function uy(e){return e===parseInt(e.toString(),10)}function dy(e,t,n){t==null&&(t=0),n==null&&(n=e.length);let r=1;for(let i=t;i<n;++i)r*=e[i];return r}function fy(e){if(e.length===0)return NaN;let t=1/0;for(let n=0;n<e.length;n++){let r=e[n];r<t&&(t=r)}return t}function py(e){if(e.length===0)return NaN;let t=-1/0;for(let n=0;n<e.length;n++){let r=e[n];r>t&&(t=r)}return t}function my(e,t){if(t<e)throw new J(`end (${t}) < begin (${e}) is forbidden.`);let n=[];for(let r=e;r<t;++r)n.push(r);return n}var hy;function gy(){return hy==null&&(hy=Aa().epsilon()),hy}function _y(){return`channelsLast`}function vy(e,t){return z(e,t)}function yy(e,t=-1){let n=e.shape.slice();return t<0&&(t=n.length+t+1),n.splice(t,0,1),U(e,n)}function by(e,t){return R(()=>{if(e.shape.length!==2)throw new J(`repeat() expects a rank-2 tensor, but received a rank-${e.shape.length} tensor.`);return Oy(yy(e,1),[1,t,1])})}function xy(e){return U(e,[dy(e.shape)])}function Sy(e){if(e.rank<=1)throw new J(`batchFlatten requires a minimum rank of 2. Got rank: ${e.rank}.`);return U(e,[e.shape[0],dy(e.shape,1)])}function Cy(e,t,n){return R(()=>{switch(e.rank){case 1:return nf(e,t,n);case 2:return af(e,[t,0],[n,e.shape[1]]);case 3:return sf(e,[t,0,0],[n,e.shape[1],e.shape[2]]);case 4:return lf(e,[t,0,0,0],[n,e.shape[1],e.shape[2],e.shape[3]]);case 5:return Ns(e,[t,0,0,0,0],[n,e.shape[1],e.shape[2],e.shape[3],e.shape[4]]);case 6:return Ns(e,[t,0,0,0,0,0],[n,e.shape[1],e.shape[2],e.shape[3],e.shape[4],e.shape[5]]);default:throw new J(`sliceAlongFirstAxis() received an unsupported tensor rank: ${e.rank}`)}})}function wy(e,t,n){return R(()=>{switch(e.rank){case 1:return nf(e,t,n);case 2:return af(e,[0,t],[e.shape[0],n]);case 3:return sf(e,[0,0,t],[e.shape[0],e.shape[1],n]);case 4:return lf(e,[0,0,0,t],[e.shape[0],e.shape[1],e.shape[2],n]);default:throw new J(`sliceAlongLastAxis() received an unsupported tensor rank: ${e.rank}`)}})}function Ty(e,t,n,r){return R(()=>{switch(e.rank){case 1:return nf(e,t,n);case 2:switch(r){case 1:return Cy(e,t,n);case 2:return wy(e,t,n);default:throw new J(`The axis is not within the rank of the tensor ${r}`)}case 3:switch(r){case 1:return Cy(e,t,n);case 2:return sf(e,[0,t,0],[e.shape[0],n,e.shape[2]]);case 3:return wy(e,t,n);default:throw new J(`The axis is not within the rank of the tensor ${r}`)}case 4:switch(r){case 1:return Cy(e,t,n);case 2:return lf(e,[0,t,0,0],[e.shape[0],n,e.shape[2],e.shape[3]]);case 3:return lf(e,[0,0,t,0],[e.shape[0],e.shape[1],n,e.shape[3]]);case 4:return wy(e,t,n);default:throw new J(`The axis is not within the rank of the tensor ${r}`)}default:throw new J(`sliceAlongLastAxis() received an unsupported tensor rank: ${e.rank}`)}})}function Ey(e,t=-1){let n;return t<0&&(n=e[0].rank,t=n===0?0:n),t===e[0].rank&&(t=-1),Ds(e,t)}function Dy(e,t){switch(e.rank){case 1:return rc([e,t]);case 2:return ac([e,t],0);case 3:return sc([e,t],0);case 4:return lc([e,t],0);default:throw new J(`concatAlongFirstAxis() received an unsupported tensor rank: ${e.rank}`)}}function Oy(e,t){if(Array.isArray(t)||(t=[t]),e.rank!==t.length)throw new J(`The length of input n (${t.length}) does not match the number of dimensions in input x (${e.rank})`);return Il(e,t)}function ky(e,t=0,n=1,r,i){return Dd(e,t,n,r,i)}function Ay(e,t,n,r){if(e.rank<2||t.rank<2)throw new vv(`dot requires both inputs to be rank >= 2 but got x shape = ${e.shape} and y shape = ${t.shape}`);if(t.rank>=3&&e.shape.slice(-1)[0]!==t.shape.slice(-2)[0])throw new vv(`If rank y >= 3, then the second last dim of y must equal the last dim of x but got x shape = ${e.shape} and  y shape = ${t.shape}`);if(e.rank===2&&t.rank===2)return hp({a:e,b:t,transposeA:!1,transposeB:!1,bias:r?Ny(e.rank,r,_y()):null,activation:n});{let i=e.shape.slice(),a=i.pop();e=U(e,[-1,a]);let o=t.shape.slice(),s=o.pop(),c=o.pop(),l=[...o,s],u=Array.from({length:t.rank},(e,n)=>n===0?t.rank-2:n<=t.rank-2?n-1:n);t=U(Qf(t,u),[c,-1]);let d=[...i,...l];return U(hp({a:e,b:t,transposeA:!1,transposeB:!1,bias:r?Ny(e.rank,r,_y()):null,activation:n}),d)}}function jy(e,t,n){return R(()=>(t=Array.isArray(t)?Pf(t,`int32`):z(t,`int32`),Hl(e,t,n)))}function My(e){return H(e,e)}function Ny(e,t,n){let r=t.shape;if(t.rank!==1&&t.rank!==e)throw new J(`Unexpected bias dimensions: ${t.rank}; expected it to be 1 or ${e}`);if(e===5){if(n===`channelsFirst`)return r.length===1?U(t,[1,r[0],1,1,1]):U(t,[1,r[3],r[0],r[1],r[2]]);if(n===`channelsLast`)return r.length===1?U(t,[1,1,1,1,r[0]]):U(t,[1].concat(r))}else if(e===4){if(n===`channelsFirst`)return r.length===1?U(t,[1,r[0],1,1]):U(t,[1,r[2],r[0],r[1]]);if(n===`channelsLast`)return r.length===1?U(t,[1,1,1,r[0]]):U(t,[1].concat(r))}else if(e===3){if(n===`channelsFirst`)return r.length===1?U(t,[1,r[0],1]):U(t,[1,r[1],r[0]]);if(n===`channelsLast`)return r.length===1?U(t,[1,1,r[0]]):U(t,[1].concat(r))}else if(e<3)return t;throw new J(`Unsupported input rank by biasAdd: ${t.rank}`)}function Py(e,t,n){return R(()=>(n==null&&(n=_y()),Qv(n),B(e,Ny(e.rank,t,n))))}function Fy(e,t=1){if(t!==1)throw new vv(`Support for alpha values other than 1 (${t}) is not implemented yet.`);return tl(e)}function Iy(e){return R(()=>V(e,B(No(e),1)))}function Ly(e,t,n,r){return R(()=>tp(e,t,n,r))}function Ry(e){return R(()=>tc(B(.5,H(.2,e)),0,1))}function zy(e,t,n=!1){return n?e():t()}var By=[`fanIn`,`fanOut`,`fanAvg`],Vy=[`normal`,`uniform`,`truncatedNormal`];function Hy(e){Iv(By,`FanMode`,e)}function Uy(e){Iv(Vy,`Distribution`,e)}var Wy=class extends gm{fromConfigUsesCustomObjects(){return!1}getConfig(){return{}}},Gy=class extends Wy{apply(e,t){return Hu(e,t)}};Gy.className=`Zeros`,q(Gy);var Ky=class extends Wy{apply(e,t){return Uu(e,t)}};Ky.className=`Ones`,q(Ky);var qy=class extends Wy{constructor(e){if(super(),typeof e!=`object`)throw new J(`Expected argument of type ConstantConfig but got ${e}`);if(e.value===void 0)throw new J(`config must have value set but got ${e}`);this.value=e.value}apply(e,t){return R(()=>H(vl(this.value),Uu(e,t)))}getConfig(){return{value:this.value}}};qy.className=`Constant`,q(qy);var Jy=class extends Wy{constructor(e){super(),this.DEFAULT_MINVAL=-.05,this.DEFAULT_MAXVAL=.05,this.minval=e.minval||this.DEFAULT_MINVAL,this.maxval=e.maxval||this.DEFAULT_MAXVAL,this.seed=e.seed}apply(e,t){return kd(e,this.minval,this.maxval,t,this.seed)}getConfig(){return{minval:this.minval,maxval:this.maxval,seed:this.seed}}};Jy.className=`RandomUniform`,q(Jy);var Yy=class extends Wy{constructor(e){super(),this.DEFAULT_MEAN=0,this.DEFAULT_STDDEV=.05,this.mean=e.mean||this.DEFAULT_MEAN,this.stddev=e.stddev||this.DEFAULT_STDDEV,this.seed=e.seed}apply(e,t){if(t=t||`float32`,t!==`float32`&&t!==`int32`)throw new vv(`randomNormal does not support dType ${t}.`);return ky(e,this.mean,this.stddev,t,this.seed)}getConfig(){return{mean:this.mean,stddev:this.stddev,seed:this.seed}}};Yy.className=`RandomNormal`,q(Yy);var Xy=class extends Wy{constructor(e){super(),this.DEFAULT_MEAN=0,this.DEFAULT_STDDEV=.05,this.mean=e.mean||this.DEFAULT_MEAN,this.stddev=e.stddev||this.DEFAULT_STDDEV,this.seed=e.seed}apply(e,t){if(t=t||`float32`,t!==`float32`&&t!==`int32`)throw new vv(`truncatedNormal does not support dType ${t}.`);return Hf(e,this.mean,this.stddev,t,this.seed)}getConfig(){return{mean:this.mean,stddev:this.stddev,seed:this.seed}}};Xy.className=`TruncatedNormal`,q(Xy);var Zy=class extends Wy{constructor(e){super(),this.gain=e.gain==null?1:e.gain}apply(e,t){return R(()=>{if(e.length!==2||e[0]!==e[1])throw new J(`Identity matrix initializer can only be used for 2D square matrices.`);return H(this.gain,Rl(e[0]))})}getConfig(){return{gain:this.gain}}};Zy.className=`Identity`,q(Zy);function Qy(e,t=`channelsLast`){let n,r;if(Qv(t),e.length===2)n=e[0],r=e[1];else if([3,4,5].indexOf(e.length)!==-1){if(t===`channelsFirst`){let t=dy(e,2);n=e[1]*t,r=e[0]*t}else if(t===`channelsLast`){let t=dy(e,0,e.length-2);n=e[e.length-2]*t,r=e[e.length-1]*t}}else{let t=dy(e);n=Math.sqrt(t),r=Math.sqrt(t)}return[n,r]}var $y=class extends Wy{constructor(e){if(super(),e.scale<0)throw new J(`scale must be a positive float. Got: ${e.scale}`);this.scale=e.scale==null?1:e.scale,this.mode=e.mode==null?`fanIn`:e.mode,Hy(this.mode),this.distribution=e.distribution==null?`normal`:e.distribution,Uy(this.distribution),this.seed=e.seed}apply(e,t){let n=Qy(e),r=n[0],i=n[1],a=this.scale;if(this.mode===`fanIn`?a/=Math.max(1,r):this.mode===`fanOut`?a/=Math.max(1,i):a/=Math.max(1,(r+i)/2),this.distribution===`normal`){let n=Math.sqrt(a);if(t=t||`float32`,t!==`float32`&&t!==`int32`)throw new vv(`${this.getClassName()} does not support dType ${t}.`);return Hf(e,0,n,t,this.seed)}else{let n=Math.sqrt(3*a);return kd(e,-n,n,t,this.seed)}}getConfig(){return{scale:this.scale,mode:this.mode,distribution:this.distribution,seed:this.seed}}};$y.className=`VarianceScaling`,q($y);var eb=class extends $y{constructor(e){super({scale:1,mode:`fanAvg`,distribution:`uniform`,seed:e==null?null:e.seed})}getClassName(){return $y.className}};eb.className=`GlorotUniform`,q(eb);var tb=class extends $y{constructor(e){super({scale:1,mode:`fanAvg`,distribution:`normal`,seed:e==null?null:e.seed})}getClassName(){return $y.className}};tb.className=`GlorotNormal`,q(tb);var nb=class extends $y{constructor(e){super({scale:2,mode:`fanIn`,distribution:`normal`,seed:e==null?null:e.seed})}getClassName(){return $y.className}};nb.className=`HeNormal`,q(nb);var rb=class extends $y{constructor(e){super({scale:2,mode:`fanIn`,distribution:`uniform`,seed:e==null?null:e.seed})}getClassName(){return $y.className}};rb.className=`HeUniform`,q(rb);var ib=class extends $y{constructor(e){super({scale:1,mode:`fanIn`,distribution:`normal`,seed:e==null?null:e.seed})}getClassName(){return $y.className}};ib.className=`LeCunNormal`,q(ib);var ab=class extends $y{constructor(e){super({scale:1,mode:`fanIn`,distribution:`uniform`,seed:e==null?null:e.seed})}getClassName(){return $y.className}};ab.className=`LeCunUniform`,q(ab);var ob=class extends Wy{constructor(e){super(),this.DEFAULT_GAIN=1,this.ELEMENTS_WARN_SLOW=2e3,this.gain=e.gain==null?this.DEFAULT_GAIN:e.gain,this.seed=e.seed}apply(e,t){return R(()=>{if(e.length<2)throw new vv(`Shape must be at least 2D.`);if(t!==`int32`&&t!==`float32`&&t!==void 0)throw TypeError(`Unsupported data type ${t}.`);t=t;let n=k(e.slice(0,-1)),r=e[e.length-1],i=n*r;i>this.ELEMENTS_WARN_SLOW&&console.warn(`Orthogonal initializer is being called on a matrix with more than ${this.ELEMENTS_WARN_SLOW} (${i}) elements: Slowness may result.`);let a=ky([Math.max(r,n),Math.min(r,n)],0,1,t,this.seed),o=pm.qr(a,!1),s=o[0],c=o[1].flatten().stridedSlice([0],[Math.min(r,n)*Math.min(r,n)],[Math.min(r,n)+1]);return s=H(s,c.sign()),n<r&&(s=s.transpose()),H(vl(this.gain),s.reshape(e))})}getConfig(){return{gain:this.gain,seed:this.seed}}};ob.className=`Orthogonal`,q(ob);var sb={constant:`Constant`,glorotNormal:`GlorotNormal`,glorotUniform:`GlorotUniform`,heNormal:`HeNormal`,heUniform:`HeUniform`,identity:`Identity`,leCunNormal:`LeCunNormal`,leCunUniform:`LeCunUniform`,ones:`Ones`,orthogonal:`Orthogonal`,randomNormal:`RandomNormal`,randomUniform:`RandomUniform`,truncatedNormal:`TruncatedNormal`,varianceScaling:`VarianceScaling`,zeros:`Zeros`};function cb(e,t={}){return jv(e,_m.getMap().classNameMap,t,`initializer`)}function lb(e){return kv(e)}function ub(e){if(typeof e==`string`){let t=e in sb?sb[e]:e;if(t===`GlorotNormal`)return new tb;if(t===`GlorotUniform`)return new eb;if(t===`HeNormal`)return new nb;if(t===`HeUniform`)return new rb;if(t===`LeCunNormal`)return new ib;if(t===`LeCunUniform`)return new ab;{let e={};return e.className=t,e.config={},cb(e)}}else if(e instanceof Wy)return e;else return cb(e)}function db(e){return Array.isArray(e)&&Array.isArray(e[0])}function fb(e){return e.length===0?[]:Array.isArray(e[0])?e:[e]}function Y(e){let t;if(Array.isArray(e)){if(e.length!==1)throw new J(`Expected Tensor length to be 1; got ${e.length}`);t=e[0]}else t=e;return t}function pb(e){if(Array.isArray(e)&&Array.isArray(e[0])){if(e.length===1)return e=e,e[0];throw new J(`Expected exactly 1 Shape; got ${e.length}`)}else return e}function mb(e){let t=0;for(let n of e)n.shape.length===0?t+=1:t+=n.shape.reduce((e,t)=>e*t);return t}var hb=`Variable`,gb=class{constructor(e,t=`float32`,n=hb,r=!0,i=null){this.dtype=t==null?`float32`:t,this.shape=e.shape,this.id=Uv(),n=n==null?hb:n,this.originalName=oy(n),this.name=sy(this.originalName),this.trainable_=r,this.constraint=i,this.val=Yf(e,this.trainable_,this.name,this.dtype)}read(){return this.assertNotDisposed(),this.val}write(e){return this.assertNotDisposed(),_b(this.val,e),this.val.id!==e.id&&(this.val.assign(e),this.constraint!=null&&this.val.assign(this.constraint.apply(this.val))),this}dispose(){this.assertNotDisposed(),this.val.dispose()}assertNotDisposed(){if(this.val.isDisposed)throw Error(`LayersVariable ${this.name} is already disposed.`)}get trainable(){return this.trainable_}set trainable(e){this.trainable_=e,this.val.trainable=e}};function _b(e,t){if(e.shape.toString()!==t.shape.toString())throw Error(`Shape mismatch: `+JSON.stringify(e.shape)+` vs. `+JSON.stringify(t.shape))}function vb(e){return e.map(e=>e.read())}function yb(e){e.forEach(e=>{e[0].write(e[1])})}var bb=class{constructor(e){this.dtype=e.dtype,this.shape=e.shape,e.shape==null?this.ndim=e.ndim:this.ndim=e.shape.length,this.maxNDim=e.maxNDim,this.minNDim=e.minNDim,this.axes=e.axes||{}}},xb=class{constructor(e,t,n,r,i,a,o){this.dtype=e,this.shape=t,this.sourceLayer=n,this.inputs=r,this.callArgs=i,this.outputTensorIndex=o,this.id=Uv(),a!=null&&(this.originalName=oy(a),this.name=sy(this.originalName)),this.rank=t.length}},Sb=0,Cb=class{constructor(e,t){this.callArgs=t,this.id=Sb++,this.outboundLayer=e.outboundLayer,this.inboundLayers=e.inboundLayers,this.nodeIndices=e.nodeIndices,this.tensorIndices=e.tensorIndices,this.inputTensors=e.inputTensors,this.outputTensors=e.outputTensors,this.inputMasks=e.inputMasks,this.outputMasks=e.outputMasks,this.inputShapes=e.inputShapes,this.outputShapes=e.outputShapes;for(let t of e.inboundLayers)t!=null&&t.outboundNodes.push(this);e.outboundLayer.inboundNodes.push(this)}getConfig(){let e=[];for(let t of this.inboundLayers)t==null?e.push(null):e.push(t.name);return{outboundLayer:this.outboundLayer?this.outboundLayer.name:null,inboundLayers:e,nodeIndices:this.nodeIndices,tensorIndices:this.tensorIndices}}},wb=0,Tb=class extends gm{constructor(e={}){super(),this._callHook=null,this._addedWeightNames=[],this._stateful=!1,this.id=wb++,this.activityRegularizer=null,this.inputSpec=null,this.supportsMasking=!1,this._trainableWeights=[],this._nonTrainableWeights=[],this._losses=[],this._updates=[],this._built=!1,this.inboundNodes=[],this.outboundNodes=[];let t=e.name;if(!t){let e=this.getClassName();t=Ev(e)+`_`+Gv(e)}if(this.name=t,this.trainable_=e.trainable==null?!0:e.trainable,e.inputShape!=null||e.batchInputShape!=null){let t;if(e.batchInputShape!=null)t=e.batchInputShape;else if(e.inputShape!=null){let n=null;e.batchSize!=null&&(n=e.batchSize),t=[n].concat(e.inputShape)}this.batchInputShape=t;let n=e.dtype;n==null&&(n=e.inputDType),n==null&&(n=`float32`),this.dtype=n}e.weights==null?this.initialWeights=null:this.initialWeights=e.weights,this._refCount=null,this.fastWeightInitDuringBuild=!1}static nodeKey(e,t){return e.name+`_ib-`+t.toString()}getNodeAtIndex(e,t){if(this.inboundNodes.length===0)throw new _v(`The layer has never been called and thus has no defined ${t}.`);if(this.inboundNodes.length<=e)throw new J(`Asked to get ${t} at node ${e}, but the layer has only ${this.inboundNodes.length} inbound nodes.`);return this.inboundNodes[e]}getInputAt(e){return wv(this.getNodeAtIndex(e,`input`).inputTensors)}getOutputAt(e){return wv(this.getNodeAtIndex(e,`output`).outputTensors)}get input(){if(this.inboundNodes.length>1)throw new gv(`Layer ${this.name} has multiple inbound nodes, hence the notion of "layer input" is ill-defined. Use \`getInputAt(nodeIndex)\` instead.`);if(this.inboundNodes.length===0)throw new gv(`Layer ${this.name} is not connected, no input to return.`);return wv(this.getNodeAtIndex(0,`input`).inputTensors)}get output(){if(this.inboundNodes.length===0)throw new gv(`Layer ${this.name} has no inbound nodes.`);if(this.inboundNodes.length>1)throw new gv(`Layer ${this.name} has multiple inbound nodes, hence the notion of "layer output" is ill-defined. Use \`getOutputAt(nodeIndex)\` instead.`);return wv(this.getNodeAtIndex(0,`output`).outputTensors)}get losses(){return this._losses}calculateLosses(){return this.losses.map(e=>e())}get updates(){return this._updates}get built(){return this._built}set built(e){this._built=e}get trainable(){return this.trainable_}set trainable(e){this._trainableWeights.forEach(t=>t.trainable=e),this.trainable_=e}get trainableWeights(){return this.trainable_?this._trainableWeights.filter(e=>e.trainable):[]}set trainableWeights(e){this._trainableWeights=e}get nonTrainableWeights(){return this.trainable?this._trainableWeights.filter(e=>!e.trainable).concat(this._nonTrainableWeights):this._trainableWeights.concat(this._nonTrainableWeights)}set nonTrainableWeights(e){this._nonTrainableWeights=e}get weights(){return this.trainableWeights.concat(this.nonTrainableWeights)}get stateful(){return this._stateful}resetStates(){if(!this.stateful)throw Error(`Cannot call the resetStates() method of a non-stateful Layer object.`)}assertInputCompatibility(e){let t=Tv(e);if(this.inputSpec==null||this.inputSpec.length===0)return;let n=Tv(this.inputSpec);if(t.length!==n.length)throw new J(`Layer ${this.name} expects ${n.length} inputs, but it received ${t.length} input tensors. Input received: ${e}`);for(let e=0;e<t.length;e++){let r=t[e],i=n[e];if(i==null)continue;let a=r.rank;if(i.ndim!=null&&a!==i.ndim)throw new J(`Input ${e} is incompatible with layer ${this.name}: expected ndim=${i.ndim}, found ndim=${a}`);if(i.maxNDim!=null&&a>i.maxNDim)throw new J(`Input ${e} is incompatible with layer ${this.name}: expected max_ndim=${i.maxNDim}, found ndim=${a}`);if(i.minNDim!=null&&a<i.minNDim)throw new J(`Input ${e} is incompatible with layer ${this.name}: expected min_ndim=${i.minNDim}, found ndim=${a}.`);if(i.dtype!=null&&r.dtype!==i.dtype)throw new J(`Input ${e} is incompatible with layer ${this.name} : expected dtype=${i.dtype}, found dtype=${r.dtype}.`);if(i.axes){let t=r.shape;for(let n in i.axes){let r=Number(n),a=i.axes[n],o=r>=0?t[r]:t[t.length+r];if(a!=null&&[a,null].indexOf(o)===-1)throw new J(`Input ${e} is incompatible with layer ${this.name}: expected axis ${r} of input shape to have value ${a} but got shape ${t}.`)}}if(i.shape!=null)for(let t=0;t<i.shape.length;++t){let n=i.shape[t],a=r.shape[t];if(n!=null&&a!=null&&n!==a)throw new J(`Input ${e} is incompatible with layer ${this.name}: expected shape=${i.shape}, found shape=${r.shape}.`)}}}call(e,t){return e}invokeCallHook(e,t){this._callHook!=null&&this._callHook(e,t)}setCallHook(e){this._callHook=e}clearCallHook(){this._callHook=null}apply(e,t){t=t||{},this.assertNotDisposed();let n=Tv(e),r=kb(e),i=Ab(e);if(r===i)throw new J(`Arguments to apply() must be all SymbolicTensors or all Tensors`);return iy(this.name,()=>{if(!this.built){this.assertInputCompatibility(e);let t=[];for(let n of Tv(e))t.push(n.shape);this.build(wv(t)),this.built=!0,this.initialWeights&&this.setWeights(this.initialWeights),this._refCount===null&&i&&(this._refCount=1)}if(this.assertInputCompatibility(e),i){let r=this.call(e,t);this.supportsMasking&&this.setMaskMetadata(e,r);let i=Tv(r),a=[];for(let e of i)n.indexOf(e)!==-1&&(e=e.clone()),a.push(e);if(r=wv(a),this.activityRegularizer!=null)throw new vv(`Layer invocation in the presence of activity regularizer(s) is not supported yet.`);return r}else{let n=Eb(e),r=this.computeOutputShape(n),i,a=Db(e);if(this.warnOnIncompatibleInputShape(Array.isArray(e)?n[0]:n),i=r!=null&&r.length>0&&Array.isArray(r[0])?r.map((n,r)=>new xb(a,n,this,Tv(e),t,this.name,r)):new xb(a,r,this,Tv(e),t,this.name),this.addInboundNode(e,i,null,null,n,r,t),this._refCount++,this.activityRegularizer!=null)throw new vv(`Layer invocation in the presence of activity regularizer(s) is not supported yet.`);return i}})}warnOnIncompatibleInputShape(e){if(this.batchInputShape!=null)if(e.length!==this.batchInputShape.length)console.warn(`The rank of the input tensor provided (shape: ${JSON.stringify(e)}) does not match that of the batchInputShape (${JSON.stringify(this.batchInputShape)}) of the layer ${this.name}`);else{let t=!1;this.batchInputShape.forEach((n,r)=>{n!=null&&e[r]!=null&&e[r]!==n&&(t=!0)}),t&&console.warn(`The shape of the input tensor (${JSON.stringify(e)}) does not match the expectation of layer ${this.name}: ${JSON.stringify(this.batchInputShape)}`)}}get outputShape(){if(this.inboundNodes==null||this.inboundNodes.length===0)throw new gv(`The layer ${this.name} has never been called and thus has no defined output shape.`);let e=[];for(let t of this.inboundNodes){let n=JSON.stringify(t.outputShapes);e.indexOf(n)===-1&&e.push(n)}if(e.length===1){let e=this.inboundNodes[0].outputShapes;return Array.isArray(e)&&Array.isArray(e[0])&&e.length===1?e[0]:e}else throw new gv(`The layer ${this.name} has multiple inbound nodes with different output shapes. Hence the notion of "output shape" is ill-defined for the layer.`)}countParams(){if(!this.built)throw new _v(`You tried to call countParams() on ${this.name}, but the layer is not built yet. Build it first by calling build(batchInputShape).`);return mb(this.weights)}build(e){this.built=!0}getWeights(e=!1){return vb(e?this.trainableWeights:this.weights)}setWeights(e){R(()=>{let t=this.weights;if(t.length!==e.length)throw new J(`You called setWeights(weights) on layer "${this.name}" with a weight list of length ${e.length}, but the layer was expecting ${t.length} weights. Provided weights: ${e}...`);if(t.length===0)return;let n=[],r=vb(t);for(let i=0;i<r.length;++i){let a=r[i],o=t[i],s=e[i];if(!A(a.shape,s.shape))throw new J(`Layer weight shape ${a.shape} not compatible with provided weight shape ${s.shape}`);n.push([o,s])}yb(n)})}addWeight(e,t,n,r,i,a,o,s){if(this._addedWeightNames.indexOf(e)!==-1)throw new J(`Duplicate weight name ${e} for layer ${this.name}`);this._addedWeightNames.push(e),n==null&&(n=`float32`),this.fastWeightInitDuringBuild&&(r=s==null?ub(`zeros`):s());let c=r.apply(t,n),l=new gb(c,n,e,a,o);return c.dispose(),i!=null&&this.addLoss(()=>i.apply(l.read())),a==null&&(a=!0),a?this._trainableWeights.push(l):this._nonTrainableWeights.push(l),l}setFastWeightInitDuringBuild(e){this.fastWeightInitDuringBuild=e}addLoss(e){e==null||Array.isArray(e)&&e.length===0||(e=Tv(e),this._losses!==void 0&&this._losses!==null&&this.losses.push(...e))}computeOutputShape(e){return e}computeMask(e,t){if(!this.supportsMasking){if(t!=null)if(Array.isArray(t))t.forEach(e=>{if(e!=null)throw TypeError(`Layer ${this.name} does not support masking, but was passed an inputMask.`)});else throw TypeError(`Layer ${this.name} does not support masking, but was passed an inputMask.`);return null}return t}setMaskMetadata(e,t,n){if(!this.supportsMasking)return;let r=this.computeMask(e,n),i=Tv(t),a=Tv(r);if(i.length!==a.length)throw Error(`${this.name} outputs ${i.length} tensors but ${i.length} masks for those tensors`);for(let e=0;e<i.length;e++)i[e].kerasMask=a[e]}addInboundNode(e,t,n,r,i,a,o=null){let s=Tv(e);t=Tv(t),n=Tv(n),r=Tv(r),i=fb(i),a=fb(a);let c=[],l=[],u=[];for(let e of s)c.push(e.sourceLayer),l.push(e.nodeIndex),u.push(e.tensorIndex);new Cb({outboundLayer:this,inboundLayers:c,nodeIndices:l,tensorIndices:u,inputTensors:s,outputTensors:t,inputMasks:n,outputMasks:r,inputShapes:i,outputShapes:a},o);for(let e=0;e<t.length;e++)t[e].sourceLayer=this,t[e].nodeIndex=this.inboundNodes.length-1,t[e].tensorIndex=e}getConfig(){let e={name:this.name,trainable:this.trainable};return this.batchInputShape!=null&&(e.batchInputShape=this.batchInputShape),this.dtype!=null&&(e.dtype=this.dtype),e}disposeWeights(){return this.weights.forEach(e=>e.dispose()),this.weights.length}assertNotDisposed(){if(this._refCount===0)throw Error(`Layer '${this.name}' is already disposed.`)}dispose(){if(!this.built)throw Error(`Cannot dispose Layer ${this.name} because it has not been built yet.`);if(this._refCount===null)throw Error(`Cannot dispose Layer ${this.name} because it has not been used yet.`);this.assertNotDisposed();let e=0;return--this._refCount===0&&(e=this.disposeWeights()),{refCountAfterDispose:this._refCount,numDisposedVariables:e}}};function Eb(e){e=Tv(e);let t=[];for(let n of e)t.push(n.shape);return wv(t)}function Db(e){return`float32`}function Ob(e,t,n){if((t==null||n!=null&&n>0)&&(t=e.sourceLayer,n=e.nodeIndex),t.inboundNodes.length===0)return[e];{let e=t.inboundNodes[n];if(e.inboundLayers.length===0)return e.inputTensors;{let t=[];for(let n=0;n<e.inboundLayers.length;n++){let r=e.inputTensors[n],i=e.inboundLayers[n],a=e.nodeIndices[n],o=Ob(r,i,a);for(let e of o)t.indexOf(e)===-1&&t.push(e)}return t}}}function kb(e){let t=!0;for(let n of Tv(e))if(!(n instanceof xb)){t=!1;break}return t}function Ab(e){let t=!0;for(let n of Tv(e))if(n instanceof xb){t=!1;break}return t}var jb=class extends Tb{constructor(e){if(super({dtype:e.dtype,name:e.name==null?Gv(`input`).toString():e.name}),e.batchSize==null&&(e.batchSize=null),e.sparse==null&&(e.sparse=!1),this.trainable=!1,this.built=!0,this.sparse=e.sparse,e.inputShape!=null&&e.batchInputShape!=null)throw new J(`Only provide the inputShape OR batchInputShape argument to inputLayer, not both at the same time.`);let t=e.batchInputShape;if(t==null){if(e.inputShape==null)throw new J("An InputLayer should be passed either a `batchInputShape` or an `inputShape`.");t=[e.batchSize].concat(e.inputShape)}else if(e.batchSize!=null)throw new J(`Cannot specify batchSize if batchInputShape is specified when creating an InputLayer.`);let n=e.dtype||`float32`;this.batchInputShape=t,this.dtype=n,this.inputSpec=[{shape:t}];let r=new xb(this.dtype,this.batchInputShape,this,[],{},this.name);r.nodeIndex=0,r.tensorIndex=0,new Cb({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:[r],outputTensors:[r],inputMasks:[null],outputMasks:[null],inputShapes:[t],outputShapes:[t]})}apply(e,t){throw new J(`Cannot pass any input to an InputLayer's apply() method. InputLayer name: ${this.name}`)}dispose(){return{refCountAfterDispose:this._refCount,numDisposedVariables:0}}getConfig(){return{batchInputShape:this.batchInputShape,dtype:this.dtype,sparse:this.sparse,name:this.name}}};jb.className=`InputLayer`,q(jb);function Mb(e){if(e.batchShape==null&&e.shape==null)throw Error("Please provide to Input either a `shape` or a `batchShape` argument. Note that `shape` does not include the batch dimension.");if(e.batchShape!=null&&e.shape!=null)throw new J("Please provide either a `shape` or `batchShape` argument to Input, but not both.");let t=e.batchShape;e.shape!=null&&t==null&&(t=[null].concat(e.shape));let n=e.dtype;return n==null&&(n=`float32`),new jb({batchInputShape:t,name:e.name,dtype:n,sparse:e.sparse}).inboundNodes[0].outputTensors[0]}function Nb(e,t){if(e.dtype==null||e.dtype===t.dtype)return t;try{return z(t,e.dtype)}catch(n){throw new J(`The dtype of the feed (${t.dtype}) can not be cast to the dtype of the key '${e.name}' (${e.dtype}).`)}}var Pb=class e{constructor(t){if(this.id2Value={},this.id2Mask={},this.name2Id={},t instanceof e)for(let e in t.id2Value)this.id2Value[e]=t.id2Value[e],e in t.id2Mask&&(this.id2Mask[e]=t.id2Mask[e]);else{if(t==null)return;for(let e of t)this.add(e.key,e.value)}}add(e,t,n){if(this.id2Value[e.id]==null)this.id2Value[e.id]=Nb(e,t),this.name2Id[e.name]=e.id,n!=null&&(this.id2Mask[e.id]=n);else throw new J(`Duplicate key: name=${e.name}, id=${e.id}`);return this}addFeed(e){this.add(e.key,e.value)}hasKey(e){return this.id2Value[e.id]!=null}names(){return Object.keys(this.name2Id)}getValue(e){if(e instanceof xb){if(this.id2Value[e.id]==null)throw new J(`Nonexistent key: ${e.name}`);return this.id2Value[e.id]}else{let t=this.name2Id[e];if(t==null)throw new J(`Feed dict has no SymbolicTensor name: ${e}`);return this.id2Value[t]}}getMask(e){if(e instanceof xb){if(this.id2Value[e.id]==null)throw new J(`Nonexistent key: ${e.name}`);return this.id2Mask[e.id]}else{let t=this.name2Id[e];if(t==null)throw new J(`Feed dict has no SymbolicTensor name: ${e}`);return this.id2Mask[t]}}disposeMasks(){this.id2Mask!=null&&Ta(this.id2Mask)}},Fb=new bv,Ib=new bv;function Lb(e){Fb!=null&&Fb.setMaxEntries(e),Ib!=null&&Ib.setMaxEntries(e)}function Rb(e,t,n,r){let i=n==null?!1:n.training,a=Array.isArray(e),o=a?e:[e],s=o.map(e=>e.name),c=[],l=t.names();for(let e of s)l.indexOf(e)===-1?c.push(null):c.push(t.getValue(e));r!=null&&(r.maxNumTensors=-1/0,r.minNumTensors=1/0);let u=s.join(`,`)+`|`+t.names().sort().join(`,`),d=Fb.get(u),f;if(d==null){let e=zb(o,t);d=e.sorted,f=e.recipientCounts,Fb.put(u,d),Ib.put(u,f)}f={},i||Object.assign(f,Ib.get(u));let p=new Pb(t);for(let e=0;e<d.length;++e){if(r!=null){let e=wa().numTensors;e>r.maxNumTensors&&(r.maxNumTensors=e),e<r.minNumTensors&&(r.minNumTensors=e)}let a=d[e],o=a.sourceLayer;if(o instanceof jb)continue;let l=[],u=[],m=[],h=!1;for(let e of a.inputs){let n=p.getValue(e),r=p.getMask(e);l.push(n),u.push(r),r!=null&&(h=!0),i||(f[e.name]--,f[e.name]===0&&!t.hasKey(e)&&s.indexOf(e.name)===-1&&!n.isDisposed&&e.sourceLayer.stateful!==!0&&m.push(n))}h&&(n=n||{},n.mask=u[0]);let g=Tv(o.apply(l,n)),_=null;o.supportsMasking&&(_=o.computeMask(l,u));let v=Hb(a),y=Array.isArray(v)?v:[v];for(let e=0;e<y.length;++e){p.hasKey(y[e])||p.add(y[e],g[e],Array.isArray(_)?_[0]:_);let t=s.indexOf(y[e].name);t!==-1&&(c[t]=g[e])}i||Ta(m)}return p.disposeMasks(),a?c:c[0]}function zb(e,t){O(e!=null&&e.length>0,()=>`Expected at least one fetch, got none`);let n=[],r={};if(e.length===1){let i=Vb(e[0],t);n=i.sorted,r=i.recipientMap}else{let i=new Set;for(let a of e){let{sorted:e,recipientMap:o}=Vb(a,t);for(let t of e)i.has(t.name)||(n.push(t),i.add(t.name));for(let e in o)r[e]==null&&(r[e]=new Set),o[e].forEach(t=>r[e].add(t))}}return{sorted:n,recipientCounts:Bb(r)}}function Bb(e){let t={};for(let n in e)t[n]=e[n].size;return t}function Vb(e,t){let n=new Set,r=[],i={};for(let e of t.names())n.add(e);let a=[],o=[];for(a.push(e);a.length>0;){let e=a[a.length-1];if(n.has(e.name)){a.pop();continue}let t=o[o.length-1]===a.length-1;if(e.inputs.length===0||t)a.pop(),r.push(e),n.add(e.name),t&&o.pop();else{o.push(a.length-1);for(let t of e.inputs)i[t.name]==null&&(i[t.name]=new Set),i[t.name].add(e.name),!n.has(t.name)&&a.push(t)}}return{sorted:r,recipientMap:i}}function Hb(e){let t;if(e.sourceLayer.inboundNodes.length===1)t=e.sourceLayer.output;else{let n=null;for(let t=0;t<e.sourceLayer.inboundNodes.length;++t)for(let r of e.sourceLayer.inboundNodes[t].outputTensors)if(r.id===e.id){n=t;break}t=e.sourceLayer.getOutputAt(n)}return t}N().registerFlag(`TOPOLOGICAL_SORT_CACHE_MAX_ENTRIES`,()=>100,Lb);function Ub(e,t){return R(()=>bl(G(H(e,e),t,!0)))}var Wb=class extends gm{getConfig(){return{}}},Gb=class extends Wb{constructor(e){super(),this.defaultMaxValue=2,this.defaultAxis=0,this.maxValue=e.maxValue==null?this.defaultMaxValue:e.maxValue,this.axis=e.axis==null?this.defaultAxis:e.axis}apply(e){return R(()=>{let t=Ub(e,this.axis);return H(e,V(tc(t,0,this.maxValue),B(gy(),t)))})}getConfig(){return{maxValue:this.maxValue,axis:this.axis}}};Gb.className=`MaxNorm`,q(Gb);var Kb=class extends Wb{constructor(e){super(),this.defaultAxis=0,this.axis=e.axis==null?this.defaultAxis:e.axis}apply(e){return R(()=>V(e,B(gy(),Ub(e,this.axis))))}getConfig(){return{axis:this.axis}}};Kb.className=`UnitNorm`,q(Kb);var qb=class extends Wb{apply(e){return Id(e)}};qb.className=`NonNeg`,q(qb);var Jb=class extends Wb{constructor(e){super(),this.defaultMinValue=0,this.defaultMaxValue=1,this.defaultRate=1,this.defaultAxis=0,this.minValue=e.minValue==null?this.defaultMinValue:e.minValue,this.maxValue=e.maxValue==null?this.defaultMaxValue:e.maxValue,this.rate=e.rate==null?this.defaultRate:e.rate,this.axis=e.axis==null?this.defaultAxis:e.axis}apply(e){return R(()=>{let t=Ub(e,this.axis);return H(e,V(B(H(this.rate,tc(t,this.minValue,this.maxValue)),H(1-this.rate,t)),B(gy(),t)))})}getConfig(){return{minValue:this.minValue,maxValue:this.maxValue,rate:this.rate,axis:this.axis}}};Jb.className=`MinMaxNorm`,q(Jb);var Yb={maxNorm:`MaxNorm`,minMaxNorm:`MinMaxNorm`,nonNeg:`NonNeg`,unitNorm:`UnitNorm`};function Xb(e){return kv(e)}function Zb(e,t={}){return jv(e,_m.getMap().classNameMap,t,`constraint`)}function Qb(e){return e==null?null:typeof e==`string`?Zb({className:e in Yb?Yb[e]:e,config:{}}):e instanceof Wb?e:Zb(e)}async function $b(e){if(e==null)return;let t=[],n=[],r=[];for(let i in e){let a=e[i];if(typeof a!=`number`){let e=a;t.push(e.data()),n.push(i),r.push(e)}}if(t.length>0){let i=await Promise.all(t);for(let t=0;t<i.length;++t)e[n[t]]=i[t][0];Ta(r)}}function ex(e){if(e!=null)for(let t in e){let n=e[t];typeof n!=`number`&&n.dispose()}}var tx;(function(e){e[e.SILENT=0]=`SILENT`,e[e.VERBOSE=1]=`VERBOSE`})(tx||(tx={}));var nx=class{constructor(){this.validationData=null}setParams(e){this.params=e}async onEpochBegin(e,t){}async onEpochEnd(e,t){}async onBatchBegin(e,t){}async onBatchEnd(e,t){}async onTrainBegin(e){}async onTrainEnd(e){}setModel(e){}},rx=class{constructor(e,t=10){e==null&&(e=[]),this.callbacks=e,this.queueLength=t}append(e){this.callbacks.push(e)}setParams(e){for(let t of this.callbacks)t.setParams(e)}setModel(e){for(let t of this.callbacks)t.setModel(e)}async onEpochBegin(e,t){var n=this;t==null&&(t={});for(let r of n.callbacks)await r.onEpochBegin(e,t)}async onEpochEnd(e,t){var n=this;t==null&&(t={});for(let r of n.callbacks)await r.onEpochEnd(e,t)}async onBatchBegin(e,t){var n=this;t==null&&(t={});for(let r of n.callbacks)await r.onBatchBegin(e,t)}async onBatchEnd(e,t){var n=this;t==null&&(t={});for(let r of n.callbacks)await r.onBatchEnd(e,t)}async onTrainBegin(e){var t=this;e==null&&(e={});for(let n of t.callbacks)await n.onTrainBegin(e)}async onTrainEnd(e){var t=this;e==null&&(e={});for(let n of t.callbacks)await n.onTrainEnd(e)}},ix=class extends nx{constructor(){super()}async onEpochBegin(e){var t=this;t.seen=0,t.totals={}}async onBatchEnd(e,t){var n=this;t==null&&(t={});let r=t.size==null?0:t.size;n.seen+=r;for(let e in t){let i=t[e];if(typeof i==`number`)n.totals.hasOwnProperty(e)||(n.totals[e]=0),n.totals[e]=n.totals[e]+i*r;else{let t;e in n.totals?t=n.totals[e]:n.totals[e]=0;let a=R(()=>B(n.totals[e],H(i,r)));n.totals[e]=a,t!=null&&t.dispose()}}}async onEpochEnd(e,t){var n=this;if(t!=null)for(let e of n.params.metrics)n.totals[e]!=null&&(typeof n.totals[e]==`number`?t[e]=n.totals[e]/n.seen:R(()=>{t[e]=H(V(1,n.seen),n.totals[e]),n.totals[e].dispose(),Ea(t[e])}))}},ax=class extends nx{async onTrainBegin(e){var t=this;t.epoch=[],t.history={}}async onEpochEnd(e,t){var n=this;t==null&&(t={}),n.epoch.push(e);for(let e in t)n.history[e]==null&&(n.history[e]=[]),n.history[e].push(t[e])}async syncData(){var e=this;let t=[],n=[],r=[];for(let i in e.history){let a=e.history[i];for(let e=0;e<a.length;++e)if(typeof a[e]!=`number`){let o=a[e];t.push(o.data()),n.push(i),r.push(e)}}let i=await Promise.all(t);for(let t=0;t<i.length;++t)e.history[n[t]][r[t]].dispose(),e.history[n[t]][r[t]]=i[t][0]}},ox=class extends nx{constructor(e,t){if(super(),this.currentEpoch=0,this.nowFunc=e.nowFunc,this.nextFrameFunc=e.nextFrameFunc||Qm,this.yieldEvery=t||`auto`,this.yieldEvery===`auto`&&(this.yieldEvery=125),this.yieldEvery===`never`&&e.onYield!=null)throw Error("yieldEvery is `never` but you provided an `onYield` callback. Either change `yieldEvery` or remove the callback");_e(this.yieldEvery)&&(this.maybeWait=Bv(this.maybeWait.bind(this),this.yieldEvery,this.nowFunc)),this.trainBegin=e.onTrainBegin,this.trainEnd=e.onTrainEnd,this.epochBegin=e.onEpochBegin,this.epochEnd=e.onEpochEnd,this.batchBegin=e.onBatchBegin,this.batchEnd=e.onBatchEnd,this.yield=e.onYield}async maybeWait(e,t,n){var r=this;let i=[];r.yield!=null&&(await $b(n),i.push(r.yield(e,t,n))),i.push(r.nextFrameFunc()),await Promise.all(i)}async onEpochBegin(e,t){var n=this;n.currentEpoch=e,n.epochBegin!=null&&(await $b(t),await n.epochBegin(e,t))}async onEpochEnd(e,t){var n=this;let r=[];n.epochEnd!=null&&(await $b(t),r.push(n.epochEnd(e,t))),n.yieldEvery===`epoch`&&r.push(n.nextFrameFunc()),await Promise.all(r)}async onBatchBegin(e,t){var n=this;n.batchBegin!=null&&(await $b(t),await n.batchBegin(e,t))}async onBatchEnd(e,t){var n=this;let r=[];n.batchEnd!=null&&(await $b(t),r.push(n.batchEnd(e,t))),n.yieldEvery===`batch`?r.push(n.nextFrameFunc()):_e(n.yieldEvery)&&r.push(n.maybeWait(n.currentEpoch,e,t)),await Promise.all(r)}async onTrainBegin(e){var t=this;t.trainBegin!=null&&(await $b(e),await t.trainBegin(e))}async onTrainEnd(e){var t=this;t.trainEnd!=null&&(await $b(e),await t.trainEnd(e))}};function sx(e,t){return e==null&&(e={}),e instanceof nx?[e]:Array.isArray(e)&&e[0]instanceof nx?e:Tv(e).map(e=>new ox(e,t))}var cx=class e{constructor(){}static registerCallbackConstructor(t,n){O(t>=0&&Number.isInteger(t),()=>`Verbosity level is expected to be an integer >= 0, but got ${t}`),e.checkForDuplicate(n),e.constructors[t]==null&&(e.constructors[t]=[]),e.constructors[t].push(n)}static checkForDuplicate(t){for(let n in e.constructors)e.constructors[+n].forEach(e=>{if(e===t)throw new J(`Duplicate callback constructor.`)})}static clear(){e.constructors={}}static createCallbacks(t){let n=[];for(let r in e.constructors){let i=+r;t>=i&&n.push(...e.constructors[i])}return n.map(e=>new e)}};cx.constructors={};function lx(e,t,n,r,i,a,o,s,c){let l=new ax,u=[new ix,...cx.createCallbacks(t)];e!=null&&u.push(...e),u.push(l);let d=new rx(u);return d.setParams({epochs:n,initialEpoch:r,samples:i,steps:a,batchSize:o,verbose:t,doValidation:s,metrics:c}),{callbackList:d,history:l}}function ux(e,t={},n=!1){return jv(e,_m.getMap().classNameMap,t,`layer`,n)}function dx(e,t){return R(()=>{e.dtype!==`float32`&&(e=z(e,`float32`));let n=G(My(e),t,!0),r=bl(zu(n,$s(n.shape,gy())));return V(e,r)})}function fx(e,t){return R(()=>Vu(My(K(t,e)),-1))}function px(e,t){return R(()=>Vu(No(K(t,e)),-1))}function mx(e,t){return R(()=>H(100,Vu(No(V(K(e,t),tc(No(e),gy(),Number.MAX_VALUE))),-1)))}function hx(e,t){return R(()=>Vu(My(K(uu(B(1,tc(t,gy(),Number.MAX_VALUE))),uu(B(1,tc(e,gy(),Number.MAX_VALUE))))),-1))}function gx(e,t){return R(()=>Vu(My(zu(0,K(1,H(e,t)))),-1))}function _x(e,t){return R(()=>Vu(zu(0,K(1,H(e,t))),-1))}function vx(e,t){return R(()=>{let n=G(H(e,t),-1);return zu(0,B(1,K(pl(H(K(1,e),t),-1),n)))})}function yx(e,t){return R(()=>{let n=Math.log(2),r=K(t,e);return Vu(K(B(r,vu(H(-2,r))),n),-1)})}function bx(e,t,n=!1){return R(()=>{if(n)t=df(t);else{let e=G(t,t.shape.length-1,!0);t=V(t,e)}return t=tc(t,gy(),1-gy()),gu(G(H(z(e,`float32`),uu(t)),t.shape.length-1))})}function xx(e,t,n=!1){return R(()=>{let r=z(Bl(xy(e)),`int32`);t=tc(t,gy(),1-gy());let i=t.shape;return bx(U(td(r,i[i.length-1]),i),t,n)})}function Sx(e,t){if(!A(e.shape,t.shape))throw new J(`logits and labels must have the same shape, but got shapes ${JSON.stringify(e.shape)} and ${JSON.stringify(t.shape)}`);return R(()=>{let n=Id(t),r=gu(No(t));return B(K(n,H(t,e)),fu(Al(r)))})}function Cx(e,t){return R(()=>{let n;return n=tc(t,gy(),1-gy()),n=uu(V(n,K(1,n))),Vu(Sx(e,n),-1)})}function wx(e,t){return R(()=>G(H(e,uu(V(tc(e,gy(),1),tc(t,gy(),1)))),-1))}function Tx(e,t){return R(()=>Vu(K(t,H(e,uu(B(gy(),t)))),-1))}function Ex(e,t){return R(()=>gu(G(H(dx(e,-1),dx(t,-1)),-1)))}var Dx={meanSquaredError:fx,meanAbsoluteError:px,meanAbsolutePercentageError:mx,meanSquaredLogarithmicError:hx,squaredHinge:gx,hinge:_x,categoricalHinge:vx,logcosh:yx,categoricalCrossentropy:bx,sparseCategoricalCrossentropy:xx,binaryCrossentropy:Cx,kullbackLeiblerDivergence:wx,poisson:Tx,cosineProximity:Ex};function Ox(e){if(typeof e==`string`){if(e in Dx)return Dx[e];let t=`Unknown loss ${e}`;throw e.toLowerCase().includes(`softmaxcrossentropy`)&&(t=`Unknown loss ${e}. Use "categoricalCrossentropy" as the string name for tf.losses.softmaxCrossEntropy`),new J(t)}else return e}function kx(e,t){return R(()=>Vu(Uc(e,vy(Wl(t,H(.5,rd(t))),e.dtype)),-1))}function Ax(e,t){return R(()=>vy(Uc(Uo(e,-1),Uo(t,-1)),`float32`))}function jx(e,t){return R(()=>z(G(Du(Uc(e,1),Uc(t,1))),`float32`))}function Mx(e,t){return R(()=>z(G(Du(Uc(e,0),Uc(t,1))),`float32`))}function Nx(e,t){return R(()=>{let n=jx(e,t),r=B(n,Mx(e,t));return z(Gc(Wl(r,0),V(n,r),0),`float32`)})}function Px(e,t){return Cx(e,t)}function Fx(e,t){return e.rank===t.rank&&(e=Tf(e,[e.rank-1])),t=Uo(t,-1),t.dtype!==e.dtype&&(t=z(t,e.dtype)),z(Uc(e,t),`float32`)}var Ix=fx,Lx=fx,Rx=px,zx=px,Bx=mx,Vx=mx,Hx=bx,Ux=Ex,Wx=xx,Gx={binaryAccuracy:kx,categoricalAccuracy:Ax,precision:Nx,categoricalCrossentropy:Hx,sparseCategoricalCrossentropy:Wx,mse:Ix,MSE:Lx,mae:Rx,MAE:zx,mape:Bx,MAPE:Vx,cosine:Ux};function Kx(e){if(typeof e==`string`&&e in Gx)return Gx[e];if(typeof e!=`string`&&e!=null)return e;throw new J(`Unknown metric ${e}`)}function qx(e){if(Sv(e!==null,`Unknown LossOrMetricFn ${e}`),typeof e==`string`)return e;{let t;for(let n of Object.keys(Dx))if(Dx[n]===e){t=n;break}if(t!==void 0)return t;for(let n of Object.keys(Gx))if(Gx[n]===e){t=n;break}return t===void 0?e.name:t}}function Jx(e){let t={Adagrad:()=>Xm.adagrad(.01),Adadelta:()=>Xm.adadelta(1,.95,gy()),Adam:()=>Xm.adam(.001,.9,.999,gy()),Adamax:()=>Xm.adamax(.002,.9,.999,gy(),0),RMSProp:()=>Xm.rmsprop(.001,.9,0,gy()),SGD:()=>Xm.sgd(.01)};if(t.adagrad=t.Adagrad,t.adadelta=t.Adadelta,t.adam=t.Adam,t.adamax=t.Adamax,t.rmsprop=t.RMSProp,t.sgd=t.SGD,e in t)return t[e]();throw new J(`Unknown Optimizer ${e}`)}var Yx=1*1024*1024;function Xx(e,t,n=!1){if(typeof e!=`object`||!e||Object.getPrototypeOf(e)!==Object.prototype||!Zx(e))throw Error(`User-defined metadata is expected to be a JSON object, but is not.`);if(n){let n=JSON.stringify(e);n.length>1048576&&console.warn(`User-defined metadata of model "${t}" is too large in size (length=${n.length} when serialized). It is not recommended to store such large objects in user-defined metadata. Please make sure its serialized length is <= ${Yx}.`)}}function Zx(e){if(e===null)return!0;if(typeof e==`object`)if(Object.getPrototypeOf(e)===Object.prototype){let t=Object.keys(e);for(let n of t)if(typeof n!=`string`||!Zx(e[n]))return!1;return!0}else if(Array.isArray(e)){for(let t of e)if(!Zx(t))return!1;return!0}else return!1;else{let t=typeof e;return t===`string`||t===`number`||t===`boolean`}}function Qx(e,t,n,r=console.log){let i=eS(e),a=[`Layer (type)`,`Input Shape`,`Output shape`,`Param #`];i?(t=t||90,n=n||[.32,.61,.89,1]):(t=t||115,n=n||[.24,.48,.7,.8,1]),n[n.length-1]<=1&&(n=n.map(e=>Math.floor(t*e)));let o;if(!i){a.push(`Receives inputs`),o=[];for(let t in e.nodesByDepth)o.push(...e.nodesByDepth[t])}r(`_`.repeat(t)),tS(a,n,r),r(`=`.repeat(t));let s=e.layers;for(let e=0;e<s.length;++e)i?nS(s[e],n,r):rS(s[e],n,o,r),r((e===s.length-1?`=`:`_`).repeat(t));e.checkTrainableWeightsConsistency();let c=$x(e),l=mb(e.nonTrainableWeights);r(`Total params: ${c+l}`),r(`Trainable params: ${c}`),r(`Non-trainable params: ${l}`),r(`_`.repeat(t))}function $x(e){let t;return t=e.collectedTrainableWeights==null?mb(e.trainableWeights):mb(e.collectedTrainableWeights),t}function eS(e){let t=!0,n=[],r=[];for(let t in e.nodesByDepth)n.push(e.nodesByDepth[t]);for(let e of n){if(e.length>1||e.length===1&&e[0].inboundLayers.length>1){t=!1;break}r.push(...e)}if(t)for(let n of e.layers){let e=!1;for(let i of n.inboundNodes)if(r.indexOf(i)!==-1)if(e){t=!1;break}else e=!0;if(!t)break}return t}function tS(e,t,n=console.log){let r=``;for(let n=0;n<e.length;++n)n>0&&(r=r.slice(0,r.length-1)+` `),r+=e[n],r=r.slice(0,t[n]),r+=` `.repeat(t[n]-r.length);n(r)}function nS(e,t,n){let r,i;try{i=e.inboundNodes.map(e=>JSON.stringify(e.inputShapes)).join(`,`)}catch(e){i=`multiple`}try{r=JSON.stringify(e.outputShape)}catch(e){r=`multiple`}tS([`${e.name} (${e.getClassName()})`,i,r,e.countParams().toString()],t,n)}function rS(e,t,n,r){let i,a;try{a=e.inboundNodes.map(e=>JSON.stringify(e.inputShapes)).join(`,`)}catch(e){a=`multiple`}try{i=JSON.stringify(e.outputShape)}catch(e){i=`multiple`}let o=[];for(let t of e.inboundNodes)if(!(n!=null&&n.length>0&&n.indexOf(t)===-1))for(let e=0;e<t.inboundLayers.length;++e){let n=t.inboundLayers[e].name,r=t.nodeIndices[e],i=t.tensorIndices[e];o.push(`${n}[${r}][${i}]`)}let s=e.name,c=e.getClassName(),l=o.length===0?``:o[0];tS([`${s} (${c})`,a,i,e.countParams().toString(),l],t,r);for(let e=1;e<o.length;++e)tS([``,``,``,``,o[e]],t,r)}function iS(e,t,n){return(e===`inboundNodes`||e===`outputLayers`||e===`inputLayers`)&&t===0&&typeof n==`string`}function aS(e,t){if(e===null)return null;if(typeof e==`string`)return Dv(e);if(typeof e==`number`||typeof e==`boolean`)return e;if(e instanceof Array){let n=[],r=e.length;for(let i=0;i<r;++i){let r=e[i];iS(t,i,r)?n.push(r):n.push(aS(r,t))}return n}else{let t={};for(let n of Object.keys(e)){let r=e[n];if(n===`name`&&typeof r==`string`)t[n]=r;else{let e=Dv(n);t[e]=aS(r,e)}}return t}}function oS(e,t){if(e==null)return null;if(typeof e==`string`)return Ev(e);if(typeof e==`number`||typeof e==`boolean`)return e;if(e instanceof Array){let n=[],r=e.length;for(let i=0;i<r;++i){let r=e[i];iS(t,i,r)?n.push(r):n.push(oS(r,t))}return n}else{let t={};for(let n of Object.keys(e)){let r=e[n],i=Ev(n);(n===`name`||n===`className`)&&typeof r==`string`?t[i]=r:t[i]=oS(r,n)}return t}}var sS=`4.22.0`,cS=e=>{let t=Object.keys(e);if(t.length===0)return!1;let n=t[0].split(`/`);return!isNaN(parseInt(n[n.length-1],10))},lS=class e extends Tb{constructor(t){if(super({}),this.containerNodes=new Set,this.name=t.name,this.name==null){let e=this.getClassName().toLowerCase();this.name=Gv(e)}if(this.supportsMasking=!1,this.trainable_=!0,Array.isArray(t.inputs)?this.inputs=t.inputs.slice():this.inputs=[t.inputs],Array.isArray(t.outputs)?this.outputs=t.outputs.slice():this.outputs=[t.outputs],Pv(this.inputs).length!==this.inputs.length)throw new J(`The list of inputs passed to the model is redundant. All inputs should only appear once. Found: ${this.inputs.map(e=>e.name)}`);Pv(this.outputs).length!==this.outputs.length&&console.warn(`The list of outputs passed to the model is redundant. All outputs should only appear once. Found: ${this.outputs.map(e=>e.name)}`),this.inputLayers=[],this.inputLayersNodeIndices=[],this.inputLayersTensorIndices=[],this.outputLayers=[],this.outputLayersNodeIndices=[],this.outputLayersTensorIndices=[],this.layers=[],this.internalContainerRefs=[];for(let e of this.outputs){let t=e.sourceLayer,n=e.nodeIndex,r=e.tensorIndex;this.outputLayers.push(t),this.outputLayersNodeIndices.push(n),this.outputLayersTensorIndices.push(r)}for(let e of this.inputs){let t=e.sourceLayer,n=e.nodeIndex,r=e.tensorIndex;Sv(n===0,`input layer has >1 nodes`),Sv(r===0,`input layer has >1 tensors`),this.inputLayers.push(t),this.inputLayersNodeIndices.push(n),this.inputLayersTensorIndices.push(r)}this.inputNames=[],this.outputNames=[],this.feedInputShapes=[],this.feedInputNames=[],this.feedOutputNames=[];for(let e=0;e<this.inputLayers.length;e++){let n=this.inputLayers[e];if(!(n instanceof jb))throw TypeError(`Input layers to a LayersModel must be InputLayer objects. Received inputs: ${t.inputs}. Input ${e} (0-based) originates from layer type ${n.getClassName()}.`);this.inputNames.push(n.name),this.feedInputShapes.push(n.batchInputShape),this.feedInputNames.push(n.name)}for(let e of this.outputLayers)this.outputNames.push(e.name);this.internalInputShapes=this.inputs.map(e=>e.shape),this.internalOutputShapes=this.outputs.map(e=>e.shape);let n={},r={},i={},a={},o={},s=[],c=(t,n,r,i,a,l)=>{(i==null||a==null||l==null)&&(i=t.sourceLayer,a=t.nodeIndex,l=t.tensorIndex);let u=i.inboundNodes[a];if(r.indexOf(u)!==-1)throw new _v(`The tensor ${t.name} at layer "${i.name}" is part of a cycle.`);if(n.indexOf(u)!==-1)return;this.containerNodes.add(e.nodeKey(i,a)),i.id in o||(o[i.id]=Object.keys(o).length),r.indexOf(u)===-1&&r.push(u);let d=u.inboundLayers.length;for(let e=0;e<d;e++){let t=u.inputTensors[e],i=u.inboundLayers[e],a=u.nodeIndices[e],o=u.tensorIndices[e];c(t,n,r,i,a,o)}for(n.push(u);r.indexOf(u)>=0;)r.splice(r.indexOf(u),1);s.push(u)},l=[],u=[];for(let e of this.outputs)c(e,l,u);let d=s.slice().reverse();for(let e of d){r[e.id]=e,e.id in n||(n[e.id]=0);let t=n[e.id],o=i[e.outboundLayer.id]==null?0:i[e.outboundLayer.id];t=Math.max(t,o),i[e.outboundLayer.id]=t,a[e.outboundLayer.id]=e.outboundLayer,n[e.id]=t;for(let i=0;i<e.inboundLayers.length;i++){let a=e.inboundLayers[i],o=e.nodeIndices[i],s=a.inboundNodes[o],c=n[s.id]==null?0:n[s.id];n[s.id]=Math.max(t+1,c),r[s.id]=s}}let f={};for(let e in n){let t=n[e];t in f||(f[t]=[]),f[t].push(r[e])}let p={};for(let e in i){let t=i[e];t in p||(p[t]=[]),p[t].push(a[e])}let m=Object.keys(p).map(e=>parseInt(e,10)).sort(Nv);this.layers=[];for(let t of m){let n=p[t];n.sort((e,t)=>{let n=o[e.id],r=o[t.id];return n<r?-1:+(n>r)});for(let t of n)t instanceof e&&this.internalContainerRefs.push(t),this.layers.push(t)}this.layersByDepth=p,m=Object.keys(f).map(e=>parseInt(e,10)).sort(Nv);let h=this.inputs.slice(),g=[];for(let e of m)for(let t of f[e]){let e=t.outboundLayer;if(e!=null){for(let n of t.inputTensors)if(h.indexOf(n)===-1)throw new _v(`Graph disconnected: cannot obtain value for tensor ${n} at layer "${e.name}". The following previous layers were accessed without issue: ${g}`);for(let e of t.outputTensors)h.push(e);g.push(e.name)}}this.nodesByDepth=f;let _=this.layers.map(e=>e.name);for(let e of _){let t=_.filter(t=>t===e).length;if(t!==1)throw new _v(`The name "${e}" is used ${t} times in the model. All layer names should be unique. Layer names: `+JSON.stringify(_))}this.outboundNodes=[],this.inboundNodes=[],new Cb({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:this.inputs,outputTensors:this.outputs,inputMasks:this.inputs.map(e=>null),outputMasks:this.outputs.map(e=>null),inputShapes:this.inputs.map(e=>e.shape),outputShapes:this.outputs.map(e=>e.shape)}),this.built=!0,this._refCount=1}assertNotDisposed(){if(this._refCount===0)throw Error(`Container '${this.name}' is already disposed.`)}dispose(){this.assertNotDisposed();let e={refCountAfterDispose:null,numDisposedVariables:0};if(--this._refCount===0){for(let t of this.layers)e.numDisposedVariables+=t.dispose().numDisposedVariables;for(let t of this.internalContainerRefs)e.numDisposedVariables+=t.dispose().numDisposedVariables}return e.refCountAfterDispose=this._refCount,e}get trainable(){return this.trainable_}set trainable(e){this.layers.forEach(t=>{t._trainableWeights.forEach(t=>t.trainable=e)}),this.trainable_=e}get trainableWeights(){if(this._trainableWeights.length>0)throw new J(`Container instance unexpectedly contains _trainableWeights.The trainable weights of a Container are a union of the trainable weights of its consituent Layers. Its own _trainableWeights must remain an empty Array.`);if(!this.trainable)return[];let e=[];for(let t of this.layers)e=e.concat(t.trainableWeights);return e}get nonTrainableWeights(){let e=[];for(let t of this.layers)e.push(...t.nonTrainableWeights);if(!this.trainable){let t=[];for(let e of this.layers)t.push(...e.trainableWeights);return t.concat(e)}return e}get weights(){return this.trainableWeights.concat(this.nonTrainableWeights)}loadWeights(e,t=!0){let n={},r=0,i=cS(e);i&&this.parseWeights(e);for(let e of this.layers)for(let[t,a]of e.weights.entries()){let e=i?`${a.name.split(`/`).slice(0,-1).join(`/`)+`/`}${t}`:a.originalName;if(n[e]!=null)throw new J(`Duplicate weight name: ${e}`);n[e]=a,r++}let a=[];for(let r in e){let i=r;if(n[r]==null){let e=r.split(`/`);i=e.slice(0,-2).concat([e[e.length-1]]).join(`/`)}if(n[i]!=null)a.push([n[i],e[r]]);else if(t)throw new J(`Provided weight data has no target variable: ${r}`);delete n[i]}if(t){let e=[];for(let t in n)e.push(t);if(e.length>0)throw new J(`${e.length} of ${r} weights are not set: ${e}`)}yb(a)}parseWeights(e){for(let t in Object.keys(e)){let n=t.split(`/`),r=[`vars`,`layer_checkpoint_dependencies`],i=n.map(e=>e.startsWith(`_`)?e.slice(1):e).filter(e=>!r.includes(e)).join(`/`);i!==t&&(e[i]=e[t],delete e[t])}}updatedConfig(){let e=this.getConfig(),t={};return t.className=this.getClassName(),t.config=e,t.kerasVersion=`tfjs-layers ${sS}`,t.backend=`TensorFlow.js`,t}toJSON(e,t=!0){let n=oS(this.updatedConfig());return t?JSON.stringify(n):n}call(e,t){return R(()=>{e=Tv(e);let n=new Pb;for(let t=0;t<this.inputs.length;++t)n.add(this.inputs[t],e[t]);return Rb(this.outputs,n,t)})}computeMask(e,t){return R(()=>{e=Tv(e);let n;return n=t==null?xv(null,e.length):Tv(t),this.runInternalGraph(e,n)[1]})}computeOutputShape(e){let t=fb(e);if(t.length!==this.inputLayers.length)throw new J(`Invalid inputShape argument ${e}: model has ${this.inputLayers.length} tensor inputs.`);let n={};for(let e=0;e<t.length;e++){let r=this.inputLayers[e],i=t[e],a=r.name+`_0_0`;n[a]=i}let r=Object.keys(this.nodesByDepth).map(e=>parseInt(e,10)).sort(Nv);if(r.length>1)for(let e of r){let t=this.nodesByDepth[e];for(let e of t){let t=e.outboundLayer;if(this.inputLayers.map(e=>e.id).indexOf(t.id)!==-1)continue;let r=[];for(let t=0;t<e.inboundLayers.length;t++){let i=e.inboundLayers[t],a=e.nodeIndices[t],o=e.tensorIndices[t],s=n[`${i.name}_${a}_${o}`];r.push(s)}let i=fb(t.computeOutputShape(wv(r))),a=t.inboundNodes.indexOf(e);for(let e=0;e<i.length;e++){let r=`${t.name}_${a}_${e}`;n[r]=i[e]}}}let i=[],a=[];for(let e=0;e<this.outputLayers.length;e++){let t=this.outputLayers[e],n=this.outputLayersNodeIndices[e],r=this.outputLayersTensorIndices[e],i=`${t.name}_${n}_${r}`;a.push(i)}for(let e=0;e<a.length;e++){let t=a[e];Sv(t in n),i.push(n[t])}return wv(i)}runInternalGraph(e,t){t==null&&(t=xv(null,e.length));let n={};for(let r=0;r<this.inputs.length;++r){let i=this.inputs[r],a=e[r],o=t[r];n[i.id]=[a,o]}let r=Object.keys(this.nodesByDepth).map(e=>parseInt(e,10)).sort(Nv);for(let e of r){let t=this.nodesByDepth[e];for(let e of t){let t=e.outboundLayer,r=e.inputTensors,i=e.outputTensors,a=[];for(let e of r)e.id in n&&a.push(n[e.id]);if(a.length===r.length){let r={},o,s,c,l;if(e.callArgs!=null&&(r=e.callArgs),a.length===1){let[e,n]=a[0];r.mask==null&&(r.mask=n),c=Tv(t.call(e,r)),l=Tv(t.computeMask(e,n)),o=[e],s=[n]}else o=a.map(e=>e[0]),s=a.map(e=>e[1]),r.mask==null&&(r.mask=s),c=Tv(t.call(o,r)),l=Tv(t.computeMask(o,s));if(t.activityRegularizer)throw new vv(`LayersModel invocation with concrete Tensor value(s) in the presence of activity regularizer(s) is not supported yet.`);for(let e=0;e<i.length;++e){let t=i[e],r=c[e],a=l[e];n[t.id]=[r,a]}}}}let i=[],a=[],o=[];for(let e of this.outputs){Sv(e.id in n,`Could not compute output ${e.name} : ${e.id}`);let[t,r]=n[e.id];o.push(t.shape),i.push(t),a.push(r)}return[i,a,o]}buildNodeConversionMap(t){let n={},r;for(let t of this.layers){r=+(t instanceof e);for(let i=0;i<t.inboundNodes.length;i++){let a=e.nodeKey(t,i);this.containerNodes.has(a)&&(n[a]=r,r+=1)}}return n}getLayer(e,t){if(t!=null)return this.findLayer(t);if(e==null)throw new J(`Provide either a layer name or layer index`);if(typeof e==`number`)return this.findLayer(e);for(let t of this.layers)if(t.name===e)return t;throw new J(`No such layer: ${e}`)}findLayer(e){if(this.layers.length<=e)throw new J(`Was asked to retrieve layer at index ${e}, but model only has ${this.layers.length} layer(s).`);return this.layers[e]}calculateLosses(){return R(()=>{let t=[];for(let n of this.layers)for(let r=0;r<n.inboundNodes.length;++r){let i=e.nodeKey(n,r);this.containerNodes.has(i)&&t.push(...n.calculateLosses())}return t})}getConfig(){let t={name:this.name},n=this.buildNodeConversionMap(this.layers),r=[];for(let t of this.layers){let i=t.getClassName(),a=t.getConfig(),o=[];for(let r=0;r<t.inboundNodes.length;r++){let i=t.inboundNodes[r],a=e.nodeKey(t,r),s={};if(this.containerNodes.has(a)){if(i.callArgs)try{JSON.stringify(i.callArgs),s=i.callArgs}catch(e){console.warn(`Layer ${t.name} was passed non-serializable keyword arguments: ${i.callArgs}. They will not be included in the serialized model (and thus will be missing at deserialization time).`),s={}}if(i.inboundLayers.length>0){let t=[];for(let r=0;r<i.inboundLayers.length;r++){let a=i.inboundLayers[r],o=i.nodeIndices[r],c=i.tensorIndices[r],l=n[e.nodeKey(a,o)];l==null&&(l=0),t.push([a.name,l,c,s])}o.push(t)}}}let s={};s.name=t.name,s.className=i,s.config=a,s.inboundNodes=o,r.push(s)}t.layers=r;let i=[];for(let t=0;t<this.inputLayers.length;t++){let r=this.inputLayers[t],a=this.inputLayersNodeIndices[t],o=e.nodeKey(r,a);if(!this.containerNodes.has(o))continue;let s=n[o];s==null&&(s=0);let c=this.inputLayersTensorIndices[t];i.push([r.name,s,c])}t.inputLayers=i;let a=[];for(let t=0;t<this.outputLayers.length;t++){let r=this.outputLayers[t],i=this.outputLayersNodeIndices[t],o=e.nodeKey(r,i);if(!this.containerNodes.has(o))continue;let s=n[o];s==null&&(s=0);let c=this.outputLayersTensorIndices[t];a.push([r.name,s,c])}return t.outputLayers=a,t}static fromConfig(e,t,n={},r=!1){let i={},a={};function o(e,t){e.name in a?a[e.name].push(t):a[e.name]=[t]}function s(e,t){let n=[],r;for(let a of t){let s=a[0],c=a[1],l=a[2];if(r=a[3]==null?{}:a[3],!(s in i)){o(e,t);return}let u=i[s];if(u.inboundNodes.length<=c){o(e,t);return}let d=u.inboundNodes[c];n.push(d.outputTensors[l])}n.length>0&&e.apply(wv(n),r)}function c(e){let n=e.name,a=ux(e,t.customObjects==null?{}:t.customObjects);a.setFastWeightInitDuringBuild(r),i[n]=a,e.inboundNodes.forEach(e=>{if(!(e instanceof Array))throw new J(`Corrupted configuration, expected array for nodeData: ${e}`);o(a,e)})}let l=t.name,u=t.layers;for(let e of u)c(e);for(;!Fv(a);)for(let e of u){let t=i[e.name];if(t.name in a){let e=a[t.name];delete a[t.name];for(let n of e)s(t,n)}}let d=[],f=[],p=t.inputLayers;for(let e of p){let t=e[0],n=e[1],r=e[2];Sv(t in i);let a=i[t].inboundNodes[n].outputTensors;d.push(a[r])}let m=t.outputLayers;for(let e of m){let t=e[0],n=e[1],r=e[2];Sv(t in i);let a=i[t].inboundNodes[n].outputTensors;f.push(a[r])}return new e({inputs:d,outputs:f,name:l})}get stateful(){if(this._stateful)throw new J(`Container instance unexpectedly has _stateful = true. The statefulness of a Container is determined by the Layers it contains. Its _stateful property must remain the default false.`);for(let e of this.layers)if(e.stateful)return!0;return!1}resetStates(){R(()=>{this.layers.forEach(e=>{e.stateful&&e.resetStates()})})}};function uS(e,t,n){let r=t.length;if(e==null||Array.isArray(e)&&e.length===0)return t.map(e=>null);if(r===1)return Array.isArray(e)&&e.length===1?e:typeof e==`object`&&t[0]in e?[e[t[0]]]:[e];if(Array.isArray(e)){if(e.length!==r)throw Error(`Provided ${n} is an array of ${e.length} element(s), but the model has ${r} outputs. Make sure a set of weights is provided for each model output.`);return e}else if(typeof e==`object`&&Object.keys(e).length>0&&typeof e[Object.keys(e)[0]]==`object`){let n=[];return t.forEach(t=>{t in e?n.push(e[t]):n.push(null)}),n}else throw Error(`The model has multiple (${r}) outputs, so ${n} must be either an array with ${r} elements or an object with ${t} keys. Provided ${n} not understood: ${JSON.stringify(e)}`)}function dS(e,t){return uS(e,t,`classWeight`)}async function fS(e,t,n,r){if(t!=null||r!=null)throw Error(`Support sampleWeight is not implemented yet`);if(n!=null){let t=R(()=>{if(e.shape.length===1)return To(e);if(e.shape.length===2){if(e.shape[1]>1)return Uo(e,1);if(e.shape[1]===1)return U(e,[e.shape[0]]);throw Error(`Encountered unexpected last-dimension size (${e.shape[1]}) during handling of class weights. The size is expected to be >= 1.`)}else throw Error(`Unexpected rank of target (y) tensor (${e.rank}) during handling of class weights. The rank is expected to be 1 or 2.`)}),r=Array.from(await t.data());Ta(t);let i=[];return r.forEach(e=>{if(n[e]==null)throw Error(`classWeight must contain all classes in the training data. The class ${e} exists in the data but not in classWeight`);i.push(n[e])}),Pf(i,`float32`)}else return null}function pS(e,t){return H(e,t)}var mS=32;function hS(e,t){let n,r,i=t;n=i.xs,r=i.ys,O(n!=null&&r!=null,()=>`A Dataset iterator for fitDataset() is expected to generate objects of the form \`{xs: xVal, ys: yVal}\`, where the two values may be \`tf.Tensor\`, an array of Tensors, or a map of string to Tensor.  The provided Dataset instead generates ${t}`);let a=gS(`input`,e.inputNames,n),o=gS(`output`,e.outputNames,r),s=a[0].shape[0];O(a.length===e.inputs.length,()=>`LayersModel has ${e.inputs.length} inputs, but the dataset provides ${a.length} inputs.  (Expected input keys: ${JSON.stringify(e.inputNames)})`),O(o.length===e.outputs.length,()=>`LayersModel has ${e.outputs.length} outputs, but the dataset provides ${o.length} outputs.  (Expected output keys: ${JSON.stringify(e.outputNames)})`);for(let t=0;t<a.length;t++)O(a[t].shape[0]===s,()=>`Batch size mismatch: input ${e.inputNames[t]} has ${a[t].shape[0]}; expected  ${s} based on input ${e.inputNames[0]}.`);for(let t=0;t<o.length;t++)O(o[t].shape[0]===s,()=>`Batch size mismatch: output ${e.outputNames[t]} has ${o[t].shape[0]}; expected  ${s} based on input ${e.inputNames[0]}.`);return{xs:a,ys:o}}function gS(e,t,n){if(n instanceof Ri)return[n];if(Array.isArray(n))return O(n.length===t.length,()=>`Received an array of ${n.length} Tensors, but expected ${t.length} to match the ${e} keys ${t}.`),n;{let r=[];for(let i of t){if(n[i]==null)throw new J(`The feature data generated by the dataset lacks the required ${e} key '${i}'.`);r.push(n[i])}return r}}function _S(e){if(e.length===3)throw new vv(`Validation with sample weights is not implemented yet.`);return{xs:e[0],ys:e[1]}}async function vS(e,t,n){let r=n.batchesPerEpoch!=null;if(O(e.optimizer!=null,()=>`You must compile a model before training/testing. Use LayersModel.compile(modelCompileConfig).`),O(n!=null,()=>`For fitDataset(), the 2nd argument (config) is required, but it is not provided in this call.`),O(n.epochs!=null&&n.epochs>0&&Number.isInteger(n.epochs),()=>`For fitDataset(), config.epochs is expected to be a positive integer, but got ${n.epochs}`),O(!r||n.batchesPerEpoch>0&&Number.isInteger(n.batchesPerEpoch),()=>`For fitDataset(), config.batchesPerEpoch is expected to be a positive integer if specified, but got ${n.batchesPerEpoch}`),O(n.validationSplit==null,()=>"`validationSplit` is not supported by `fitDataset()`. Use validationData instead."),e.isTraining)throw Error(`Cannot start training because another fit() call is ongoing.`);e.isTraining=!0;try{let i=n.validationData!=null,a,o;if(i)if(bS(n.validationData))O(n.validationBatches==null||n.validationBatches>0&&Number.isInteger(n.validationBatches),()=>`For fitDataset() with dataset-based validation, config.validationBatches is expected not to be provided, or to be a positive integer, but got ${n.validationBatches}`);else{let e=_S(n.validationData);a=e.xs,o=e.ys}let s=e.makeTrainFunction(),c=e.getDedupedMetricsNames(),l;l=i?c.slice().concat(c.map(e=>`val_`+e)):c.slice();let{callbackList:u,history:d}=lx(sx(n.callbacks,n.yieldEvery),n.verbose==null?1:n.verbose,n.epochs,null,null,yS(t,n),null,i,l);u.setModel(e),e.history=d,await u.onTrainBegin(),e.stopTraining_=!1;let f=n.initialEpoch==null?0:n.initialEpoch,p=await t.iterator();for(;f<n.epochs;){let l={};await u.onEpochBegin(f);let d=0,m=0;for(r||(p=await t.iterator());!r||d<n.batchesPerEpoch;){let t=await p.next();if(r&&t.done){console.warn(`You provided \`batchesPerEpoch\` as ${n.batchesPerEpoch}, but your dataset iterator ran out of data after ${d} batches; interrupting training. Make sure that your dataset can generate at least \`batchesPerEpoch * epochs\` batches (in this case, ${n.batchesPerEpoch*n.epochs} batches). You may need to use the repeat() function when building your dataset.`);break}if(t.value!=null){let{xs:r,ys:i}=hS(e,t.value),a={};a.batch=m,a.size=r[0].shape[0],await u.onBatchBegin(m,a);let o=[];if(n.classWeight!=null){let t=dS(n.classWeight,e.outputNames);for(let e=0;e<t.length;++e)o.push(await fS(i[e],null,t[e]))}let l=r.concat(i).concat(o),f=s(l);Ta(l);for(let e=0;e<c.length;++e){let t=c[e],n=f[e];a[t]=n,Ea(n)}await u.onBatchEnd(m,a),ex(a),m++,d++}if(r?d>=n.batchesPerEpoch:t.done){if(i){let t;t=bS(n.validationData)?Tv(await e.evaluateDataset(n.validationData,{batches:n.validationBatches})):Tv(e.evaluate(a,o,{batchSize:n.validationBatchSize==null?mS:n.validationBatchSize,verbose:0}));for(let n=0;n<e.metricsNames.length;++n)l[`val_${e.metricsNames[n]}`]=t[n]}break}if(e.stopTraining_)break}if(await u.onEpochEnd(f,l),f++,e.stopTraining_)break}return await u.onTrainEnd(),await e.history.syncData(),e.history}finally{e.isTraining=!1}}function yS(e,t){let n=null;return t.batchesPerEpoch==null?Number.isFinite(e.size)&&(n=e.size):n=t.batchesPerEpoch,n}function bS(e){return typeof e.iterator==`function`}function xS(e){return typeof e.next==`function`}async function SS(e,t,n){n=n||{};let r=n.batches!=null,i=e.testFunction,a=[];if(n.verbose>0)throw new vv(`Verbose mode is not implemented yet.`);O(!r||n.batches>0&&Number.isInteger(n.batches),()=>`Test loop expects \`batches\` to be a positive integer, but received ${JSON.stringify(n.batches)}`);let o=xS(t)?t:await t.iterator(),s=0,c=0;for(;!r||c<n.batches;){let t=await o.next();if(a=R(()=>{if(t.value){let{xs:n,ys:r}=hS(e,t.value),o=n.concat(r),l=R(()=>i(o));if(Ta(o),c===0)for(let e=0;e<l.length;++e)a.push(vl(0));let u=o[0].shape[0];for(let e=0;e<l.length;++e){let t=l[e],n=a[e];a[e]=R(()=>B(a[e],H(u,t))),c>0&&Ta(n)}Ta(l),s+=u,++c}return a}),t.done){r&&console.warn(`Your dataset iterator ran out of data during evaluateDataset(). Interrupting evalution. Make sure that your dataset can generate at least \`batches\` batches (in this case, ${n.batches} batches). You may need to use the repeat() function when building your dataset.`);break}}for(let e=0;e<a.length;++e){let t=a[e];a[e]=V(a[e],s),Ta(t)}return wv(a)}function CS(e){O(e>0&&Number.isInteger(e),()=>`batchSize is required to be a positive integer, but got ${e}`)}function wS(e,t,n){return e==null?[null]:Array.isArray(e)?e.map(e=>Cy(e,t,n-t)):Cy(e,t,n-t)}function TS(e,t){return R(()=>e==null?null:Array.isArray(e)?e.map(e=>TS(e,t)):jy(e,t.dtype===`int32`?t:z(t,`int32`)))}function ES(e,t){let n=[],r=0,i=null;for(;r<e;)i=r+t,i>=e&&(i=e),n.push([r,i]),r=i;return n}function DS(e){let t=[];e instanceof Ri&&(e=[e]);for(let n=0;n<e.length;++n){let r=e[n];if(r.rank===1)t.push(yy(r,1));else if(r.rank===0)throw Error(`Expected tensor to be at least 1D, but received a 0D tensor (scalar).`);else t.push(r)}return t}function OS(e,t){if(e==null)return;let n=[];if(t instanceof Ri)n.push(t.id);else if(Array.isArray(t))t.forEach(e=>n.push(e.id));else if(t!=null)for(let e in t){let r=t[e];n.push(r.id)}let r=[];if(e instanceof Ri)n.indexOf(e.id)===-1&&r.push(e);else if(Array.isArray(e))e.forEach(e=>{n.indexOf(e.id)===-1&&r.push(e)});else if(e!=null)for(let t in e){let i=e[t];n.indexOf(i.id)===-1&&r.push(i)}r.forEach(e=>{e.isDisposed||e.dispose()})}function kS(e){return e instanceof Ri}function AS(e){return Array.isArray(e)}function jS(e){return!kS(e)&&!AS(e)}function MS(e,t,n,r=!0,i=``){if(t==null||t.length===0){if(e!=null){let t=!1;if(AS(e)&&e.length>0)t=!0;else if(jS(e)){for(let n in e)if(e.hasOwnProperty(n)){t=!0;break}}else t=!0;if(t)throw new J(`Error when checking model ${i} expected no data, but got ${e}`)}return[]}if(e==null)return t.map(e=>null);let a;if(jS(e)){e=e,a=[];for(let n of t){if(e[n]==null)throw new J(`No data provided for "${n}". Need data for each key in: ${t}`);a.push(e[n])}}else if(AS(e)){if(e=e,e.length!==t.length)throw new J(`Error when checking model ${i}: the Array of Tensors that you are passing to your model is not the size the model expected. Expected to see ${t.length} Tensor(s), but instead got the following list of Tensor(s): ${e}`);a=e}else{if(e=e,t.length>1)throw new J(`The model ${i} expects ${t.length} Tensor(s), but only received one Tensor. Found: Tensor with shape ${e.shape}`);a=[e]}if(a=DS(a),n!=null)for(let e=0;e<t.length;++e){if(n[e]==null)continue;let o=a[e];if(o.shape.length!==n[e].length)throw new J(`Error when checking ${i}: expected ${t[e]} to have ${n[e].length} dimension(s). but got array with shape ${o.shape}`);for(let t=0;t<n[e].length;++t){if(t===0&&!r)continue;let a=o.shape[t],s=n[e][t];if(s!=null&&s>=0&&a!==s)throw new J(`${i} expected a batch of elements where each example has shape [${n[e].slice(1,n[e].length)}] (i.e.,tensor shape [*,${n[e].slice(1,n[e].length)}]) but the ${i} received an input with ${o.shape[0]} examples, each with shape [${o.shape.slice(1,o.shape.length)}] (tensor shape [${o.shape}])`)}}return a}function NS(e,t,n){let r=Pv(e.map(e=>e.shape[0]));r.sort();let i=Pv(t.map(e=>e.shape[0]));if(i.sort(),r.length>1)throw new J(`All input Tensors (x) should have the same number of samples. Got array shapes: ${JSON.stringify(e.map(e=>e.shape))}`);if(i.length>1)throw new J(`All target Tensors (y) should have the same number of samples. Got array shapes: ${JSON.stringify(t.map(e=>e.shape))}`);if(r.length>0&&i.length>0&&!A(r,i))throw new J(`Input Tensors should have the same number of samples as target Tensors. Found ${r[0]} input sample(s) and ${i[0]} target sample(s).`)}function PS(e,t,n){let r=[fx,Cx,bx];for(let i=0;i<e.length;++i){let a=e[i],o=t[i],s=n[i];if(o!=null){if(o===bx&&a.shape[a.shape.length-1]===1)throw new J(`You are passing a target array of shape ${a.shape} while using a loss 'categorical_crossentropy'. 'categorical_crossentropy'expects targets to be binary matrices (1s and 0s) of shape [samples, classes].`);if(r.indexOf(o)!==-1){let e=a.shape.slice(1),t=s.slice(1);for(let n=0;n<e.length;++n){let r=e[n],i=t[n];if(i!=null&&r!==i)throw new J(`A target Tensor with shape ${a.shape} was passed for an output of shape ${s}, while using a loss function that expects targets to have the same shape as the output.`)}}}}}function FS(e,t,n,r=!0,i=``){let a;if(Array.isArray(e)){if(e.length!==t.length)throw new J(`Error when checking model ${i}: the Array of Tensors that you are passing to your model is not the size the the model expected. Expected to see ${t.length} Tensor(s), but instead got ${e.length} Tensors(s).`);a=e}else{if(t.length>1)throw new J(`The model expects ${t.length} ${i} Tensors, but only received one Tensor. Found: array with shape ${JSON.stringify(e.shape)}.`);a=[e]}if(n!=null)for(let e=0;e<t.length;++e){if(n[e]==null)continue;let o=a[e];if(o.shape.length!==n[e].length)throw new J(`Error when checking ${i}: expected ${t[e]} to have ${n[e].length} dimension(s), but got array with shape ${JSON.stringify(o.shape)}`);for(let a=0;a<n[e].length;++a){if(a===0&&!r)continue;let s=o.shape[a],c=n[e][a];if(c!=null&&c!==s)throw new J(`Error when checking ${i}: expected ${t[e]} to have shape ${JSON.stringify(n[e])} but got array with shape ${JSON.stringify(o.shape)}.`)}}}function IS(e,t){if(e==null||Array.isArray(e)&&e.length===0)return t.map(e=>[]);let n;if(typeof e==`string`||typeof e==`function`)n=[e];else if(Array.isArray(e)||typeof e==`object`)n=e;else throw TypeError(`Type of metrics argument not understood. Expected an string,function, Array, or Object, found: ${e}`);if(Array.isArray(n))return t.map(e=>n);{let e=[];for(let r of t){let t=n.hasOwnProperty(r)?n[r]:[];Array.isArray(t)||(t=[t]),e.push(t)}return e}}var LS=`layers-model`,RS=class extends lS{constructor(e){super(e),this.isTraining=!1}summary(e,t,n=console.log){if(!this.built)throw new J(`This model has never been called, thus its weights have not been created yet. So no summary can be displayed. Build the model first (e.g., by calling it on some test data).`);Qx(this,e,t,n)}compile(e){if(e.loss==null&&(e.loss=[]),this.loss=e.loss,typeof e.optimizer==`string`)this.optimizer_=Jx(e.optimizer),this.isOptimizerOwned=!0;else{if(!(e.optimizer instanceof vm))throw new J(`User-defined optimizer must be an instance of tf.Optimizer.`);this.optimizer_=e.optimizer,this.isOptimizerOwned=!1}let t=[];if(!Array.isArray(e.loss)&&typeof e.loss!=`string`&&typeof e.loss!=`function`){e.loss=e.loss;for(let t in e.loss)if(this.outputNames.indexOf(t)===-1)throw new J(`Unknown entry in loss dictionary: "${t}". Only expected the following keys: ${this.outputNames}`);for(let n of this.outputNames)e.loss[n]==null&&console.warn(`Output "${n}" is missing from loss dictionary. We assume this was done on purpose, and we will not be expecting data to be passed to ${n} during training`),t.push(Ox(e.loss[n]))}else if(Array.isArray(e.loss)){if(e.loss.length!==this.outputs.length)throw new J(`When passing an Array as loss, it should have one entry per model output. The model has ${this.outputs.length} output(s), but you passed loss=${e.loss}.`);t=e.loss.map(e=>Ox(e))}else{let n=Ox(e.loss);this.outputs.forEach(e=>{t.push(n)})}this.lossFunctions=t,this.feedOutputNames=[],this.feedOutputShapes=[],this.feedLossFns=[];for(let e=0;e<this.outputs.length;++e){let t=this.internalOutputShapes[e],n=this.outputNames[e];this.feedOutputNames.push(n),this.feedOutputShapes.push(t),this.feedLossFns.push(this.lossFunctions[e])}let n=[];this.metrics=e.metrics,this.metricsNames=[`loss`],this.metricsTensors=[],iy(`loss`,()=>{for(let e=0;e<this.outputs.length;++e){if(n.indexOf(e)!==-1)continue;let t=this.lossFunctions[e];this.outputs.length>1&&(this.metricsTensors.push([t,e]),this.metricsNames.push(this.outputNames[e]+`_loss`))}});let r=IS(e.metrics,this.outputNames),i=(e,t,n)=>{this.outputNames.length>1&&(t=this.outputNames[e]+`_`+t),this.metricsNames.push(t),this.metricsTensors.push([n,e])};iy(`metric`,()=>{for(let e=0;e<this.outputs.length;++e)n.indexOf(e)===-1&&(t=>{let n,r,a;for(let o of t){if(typeof o==`string`&&[`accuracy`,`acc`,`crossentropy`,`ce`].indexOf(o)!==-1){let t=this.internalOutputShapes[e];t[t.length-1]===1||this.lossFunctions[e]===Cx?[`accuracy`,`acc`].indexOf(o)===-1?[`crossentropy`,`ce`].indexOf(o)!==-1&&(r=Px):r=kx:this.lossFunctions[e]===xx?[`accuracy`,`acc`].indexOf(o)===-1?[`crossentropy`,`ce`].indexOf(o)!==-1&&(r=Wx):r=Fx:[`accuracy`,`acc`].indexOf(o)===-1?[`crossentropy`,`ce`].indexOf(o)!==-1&&(r=Hx):r=Ax;let i;[`accuracy`,`acc`].indexOf(o)===-1?[`crossentropy`,`ce`].indexOf(o)!==-1&&(i=`ce`):i=`acc`,a=r,n=``+i}else a=Kx(o),n=``+qx(o);let t;iy(n,()=>{t=a}),i(e,n,t)}})(r[e])}),this.collectedTrainableWeights=this.trainableWeights}checkTrainableWeightsConsistency(){this.collectedTrainableWeights!=null&&this.trainableWeights.length!==this.collectedTrainableWeights.length&&console.warn("Discrepancy between trainableweights and collected trainable weights. Did you set `model.trainable` without calling `model.compile()` afterwards?")}evaluate(e,t,n={}){let r=n.batchSize==null?32:n.batchSize;CS(r);let i=this.standardizeUserDataXY(e,t,!0,r);try{let e=i[0].concat(i[1]);this.makeTestFunction();let t=this.testFunction;return wv(this.testLoop(t,e,r,n.verbose,n.steps))}finally{OS(i[0],e),OS(i[1],t)}}async evaluateDataset(e,t){var n=this;return n.makeTestFunction(),SS(n,e,t)}checkNumSamples(e,t,n,r=`steps`){let i;if(n!=null){if(i=null,t!=null)throw new J(`If ${r} is set, batchSize must be null or undefined.Got batchSize = ${t}`)}else if(e!=null)i=Array.isArray(e)?e[0].shape[0]:e.shape[0];else throw new J(`Either the input data should have a defined shape, or ${r} shoud be specified.`);return i}execute(e,t){if(Array.isArray(t)&&t.length===0)throw new J("`outputs` is an empty Array, which is not allowed.");let n=Array.isArray(t),r=n?t:[t],i=this.retrieveSymbolicTensors(r),a=new Pb;if(e instanceof Ri&&(e=[e]),Array.isArray(e)){if(e.length!==this.inputs.length)throw new J(`The number of inputs provided (${e.length}) does not match the number of inputs of this model (${this.inputs.length}).`);for(let t=0;t<this.inputs.length;++t)a.add(this.inputs[t],e[t])}else for(let t of this.inputs){let n=e[t.name];if(n==null)throw new J(`No value is provided for the model's input ${t.name}`);a.add(t,n)}let o=Rb(i,a);return n?o:o[0]}retrieveSymbolicTensors(e){let t=xv(null,e.length),n=e.length;for(let r of this.layers){let i=Array.isArray(r.output)?r.output:[r.output],a=i.map(e=>e.name);for(let r=0;r<e.length;++r){let o=a.indexOf(e[r]);if(o!==-1&&(t[r]=i[o],n--),n===0)break}if(n===0)break}if(n>0){let n=[];throw t.forEach((t,r)=>{t==null&&n.push(e[r])}),new J(`Cannot find SymbolicTensors for output name(s): ${JSON.stringify(n)}`)}return t}predictLoop(e,t=32,n=!1){return R(()=>{let r=this.checkNumSamples(e);if(n)throw new vv(`Verbose predictLoop() is not implemented yet.`);let i=ES(r,t),a=this.outputs.map(e=>[]);for(let t=0;t<i.length;++t)R(()=>{let n=i[t][0],r=i[t][1],a=wS(e,n,r),o=[];if(Array.isArray(a))for(let e=0;e<a.length;++e)o.push({key:this.inputs[e],value:a[e]});else o.push({key:this.inputs[0],value:a});let s=new Pb(o);return Rb(this.outputs,s)}).forEach((e,t)=>a[t].push(e));return wv(a.map(e=>Ds(e,0)))})}predict(e,t={}){let n=DS(e);FS(n,this.inputNames,this.feedInputShapes,!1);try{let e=t.batchSize==null?32:t.batchSize;return CS(e),this.predictLoop(n,e)}finally{OS(n,e)}}predictOnBatch(e){FS(e,this.inputNames,this.feedInputShapes,!0);let t=(Array.isArray(e)?e[0]:e).shape[0];return this.predictLoop(e,t)}standardizeUserDataXY(e,t,n=!0,r){if(this.optimizer_==null)throw new _v(`You must compile a model before training/testing. Use LayersModel.compile(modelCompileArgs).`);let i=[];for(let e=0;e<this.feedOutputShapes.length;++e){let t=this.feedOutputShapes[e];this.feedLossFns[e]===xx?i.push(t.slice(0,t.length-1).concat([1])):i.push(t)}if(e=MS(e,this.feedInputNames,this.feedInputShapes,!1,`input`),t=MS(t,this.feedOutputNames,i,!1,`target`),NS(e,t,null),PS(t,this.feedLossFns,this.feedOutputShapes),this.stateful&&r!=null&&r>0&&e[0].shape[0]%r!==0)throw new J(`In a stateful network, you should only pass inputs with a number of samples that is divisible by the batch size ${r}. Found: ${e[0].shape[0]} sample(s).`);return[e,t]}async standardizeUserData(e,t,n,r,i=!0,a){var o=this;let[s,c]=o.standardizeUserDataXY(e,t,i,a);if(n!=null)throw Error(`sample weight is not supported yet.`);let l=null;if(r!=null){let e=dS(r,o.outputNames);l=[];for(let t=0;t<e.length;++t)l.push(await fS(c[t],null,e[t]))}return[s,c,l]}testLoop(e,t,n,r=0,i){return R(()=>{let a=this.checkNumSamples(t,n,i,`steps`),o=[];if(r>0)throw new vv(`Verbose mode is not implemented yet.`);if(i!=null)throw new vv(`steps mode in testLoop() is not implemented yet`);{let r=ES(a,n),i=Pf(my(0,a));for(let n=0;n<r.length;++n){let a=r[n][0],s=r[n][1],c=e(TS(t,Cy(i,a,s-a)));if(n===0)for(let e=0;e<c.length;++e)o.push(vl(0));for(let e=0;e<c.length;++e){let t=c[e];o[e]=B(o[e],H(s-a,t))}}for(let e=0;e<o.length;++e)o[e]=V(o[e],a)}return o})}getDedupedMetricsNames(){let e=this.metricsNames,t=[];for(let n=0;n<e.length;++n){let r=e[n],i=r;if(Cv(e,r)>1){let t=Cv(e.slice(0,n),r);i+=`_${t}`}t.push(i)}return t}makeTrainFunction(){return e=>{let t=[],n=e.slice(0,this.inputs.length),r=e.slice(this.inputs.length,this.inputs.length+this.outputs.length),i=e.slice(this.inputs.length+this.outputs.length,this.inputs.length+this.outputs.length*2),a=[],o=()=>{let e=[];for(let t=0;t<this.inputs.length;++t)e.push({key:this.inputs[t],value:n[t]});let o=new Pb(e),s=Rb(this.outputs,o,{training:!0}),c;for(let e=0;e<this.lossFunctions.length;++e){let n=this.lossFunctions[e],a=n(r[e],s[e]);i[e]!=null&&(a=pS(a,i[e]));let o=Vu(a);t.push(o),c=e===0?a:B(c,a)}for(let e=0;e<this.metricsTensors.length;++e){let n;if(this.outputs.length>1&&e<this.outputs.length)n=t[e];else{let t=this.metricsTensors[e][0],i=this.metricsTensors[e][1];n=Vu(t(r[i],s[i]))}Ea(n),a.push(n)}return c=Vu(c),this.calculateLosses().forEach(e=>{c=B(c,e)}),c},s=this.collectedTrainableWeights.map(e=>e.read());return[this.optimizer_.minimize(o,!0,s)].concat(a)}}makeTestFunction(){this.testFunction=e=>R(()=>{let t=[],n,r=e.slice(0,this.inputs.length),i=e.slice(this.inputs.length,this.inputs.length+this.outputs.length),a=[];for(let e=0;e<this.inputs.length;++e)a.push({key:this.inputs[e],value:r[e]});let o=new Pb(a),s=Rb(this.outputs,o);for(let e=0;e<this.lossFunctions.length;++e){let r=this.lossFunctions[e],a=Vu(r(i[e],s[e]));n=e===0?a:B(n,a),t.push(n)}for(let e=0;e<this.metricsTensors.length;++e){let n=this.metricsTensors[e][0],r=this.metricsTensors[e][1],a=Vu(n(i[r],s[r]));t.push(a)}return t})}async fit(e,t,n={}){var r=this;if(r.isTraining)throw Error(`Cannot start training because another fit() call is ongoing.`);r.isTraining=!0;let i,a,o,s,c,l,u,d,f;try{let p=n.batchSize==null?32:n.batchSize;CS(p);let m=await r.standardizeUserData(e,t,n.sampleWeight,n.classWeight,!1,p);i=m[0],a=m[1],f=m[2];let h=!1,g;if(n.validationData!=null&&n.validationData.length>0){if(h=!0,n.validationData.length===2)c=n.validationData[0],l=n.validationData[1];else if(n.validationData.length===3)throw new vv(`validationData including sample weights is not supported yet.`);else throw new J(`When passing validation data, it must contain 2 (valX, valY) or 3 (valX, valY, valSampleWeight) items; ${n.validationData} is invalid.`);let e=await r.standardizeUserData(c,l,null,null,!0,p);u=e[0],d=e[1],g=u.concat(d)}else if(n.validationSplit!=null&&n.validationSplit>0&&n.validationSplit<1){h=!0;let e=Math.floor(i[0].shape[0]*(1-n.validationSplit)),t=i[0].shape[0];u=wS(i,e,t),o=i,i=wS(i,0,e),d=wS(a,e,t),s=a,a=wS(a,0,e),g=u.concat(d)}else n.validationSteps!=null&&(h=!0);let _=i.concat(a).concat(f);r.checkTrainableWeightsConsistency();let v=r.makeTrainFunction(),y=r.getDedupedMetricsNames(),b,x;h?(r.makeTestFunction(),b=r.testFunction,x=y.slice().concat(y.map(e=>`val_`+e))):(b=null,g=[],x=y.slice());let S=sx(n.callbacks,n.yieldEvery);return await r.fitLoop(v,_,y,p,n.epochs,n.verbose,S,b,g,n.shuffle,x,n.initialEpoch,null,null)}finally{r.isTraining=!1,OS(i,e),OS(a,t),OS(o,e),OS(s,t),OS(u,c),OS(d,l),f!=null&&Ta(f)}}async fitLoop(e,t,n,r,i,a,o,s,c,l,u,d,f,p){var m=this;r==null&&(r=32),i==null&&(i=1),l==null&&(l=!0),d==null&&(d=0);let h=!1;if(s!=null&&c!=null&&(h=!0),p!=null&&(h=!0,f==null))throw new J("Can only use `validationSteps` when doing step-wise training, i.e., `stepsPerEpoch` must be set.");let g=m.checkNumSamples(t,r,f,`steps_per_epoch`),_;g!=null&&(_=my(0,g)),a==null&&(a=1);let{callbackList:v,history:y}=lx(o,a,i,d,g,f,r,h,u);v.setModel(m),m.history=y,await v.onTrainBegin(),m.stopTraining_=!1;for(let a=d;a<i;++a){await v.onEpochBegin(a);let i={};if(f!=null)throw new vv(`stepsPerEpoch mode is not implemented yet.`);{if(l===`batch`)throw new vv(`batch shuffling is not implemneted yet`);l&&C(_);let a=Pf(_),o=ES(g,r);for(let l=0;l<o.length;++l){let u={};if(await v.onBatchBegin(l,u),R(()=>{let d=o[l][0],f=o[l][1],p=Cy(a,d,f-d);u.batch=l,u.size=f-d;let g=e(TS(t,p));for(let e=0;e<n.length;++e){let t=n[e],r=g[e];u[t]=r,Ea(r)}if(l===o.length-1&&h){let e=m.testLoop(s,c,r);for(let t=0;t<n.length;++t){let r=n[t],a=e[t];Ea(a),i[`val_`+r]=a}}}),await v.onBatchEnd(l,u),ex(u),m.stopTraining_)break}a.dispose()}if(await v.onEpochEnd(a,i),m.stopTraining_)break}return await v.onTrainEnd(),await m.history.syncData(),m.history}async fitDataset(e,t){return vS(this,e,t)}async trainOnBatch(e,t){var n=this;let r=await n.standardizeUserData(e,t),i=r[0],a=r[1],o=n.makeTrainFunction()(i.concat(a)),s=[];for(let e of o){let t=await e.data();s.push(t[0])}return Ta(o),OS(r[0],e),OS(r[1],t),wv(s)}getNamedWeights(e){let t=[],n=e!=null&&e.trainableOnly,r=n?this.trainableWeights:this.weights,i=this.getWeights(n);for(let e=0;e<r.length;++e)n&&!r[e].trainable||t.push({name:r[e].originalName,tensor:i[e]});return t}set stopTraining(e){this.stopTraining_=e}get stopTraining(){return this.stopTraining_}get optimizer(){return this.optimizer_}set optimizer(e){this.optimizer_!==e&&(this.optimizer_=e,this.isOptimizerOwned=!1)}dispose(){let e=super.dispose();if(e.refCountAfterDispose===0&&this.optimizer!=null&&this.isOptimizerOwned){let t=wa().numTensors;this.optimizer_.dispose(),e.numDisposedVariables+=t-wa().numTensors}return e}getLossIdentifiers(){let e;if(typeof this.loss==`string`)e=Ev(this.loss);else if(Array.isArray(this.loss)){for(let e of this.loss)if(typeof e!=`string`)throw Error(`Serialization of non-string loss is not supported.`);e=this.loss.map(e=>Ev(e))}else{let t=Object.keys(this.loss);e={};let n=this.loss;for(let r of t)if(typeof n[r]==`string`)e[r]=Ev(n[r]);else throw Error(`Serialization of non-string loss is not supported.`)}return e}getMetricIdentifiers(){if(typeof this.metrics==`string`||typeof this.metrics==`function`)return[Ev(qx(this.metrics))];if(Array.isArray(this.metrics))return this.metrics.map(e=>Ev(qx(e)));{let e={};for(let t in this.metrics)e[t]=Ev(qx(this.metrics[t]));return e}}getTrainingConfig(){return{loss:this.getLossIdentifiers(),metrics:this.getMetricIdentifiers(),optimizer_config:{class_name:this.optimizer.getClassName(),config:this.optimizer.getConfig()}}}loadTrainingConfig(e){if(e.weighted_metrics!=null)throw Error(`Loading weight_metrics is not supported yet.`);if(e.loss_weights!=null)throw Error(`Loading loss_weights is not supported yet.`);if(e.sample_weight_mode!=null)throw Error(`Loading sample_weight_mode is not supported yet.`);let t=ux(aS(e.optimizer_config)),n;if(typeof e.loss==`string`)n=Dv(e.loss);else if(Array.isArray(e.loss))n=e.loss.map(e=>Dv(e));else if(e.loss!=null){n={};for(let t in e.loss)n[t]=Dv(e.loss[t])}let r;if(Array.isArray(e.metrics))r=e.metrics.map(e=>Dv(e));else if(e.metrics!=null){r={};for(let t in e.metrics)r[t]=Dv(e.metrics[t])}this.compile({loss:n,metrics:r,optimizer:t})}async save(e,t){var n=this;if(typeof e==`string`){let t=Va(e);if(t.length===0)throw new J(`Cannot find any save handlers for URL '${e}'`);if(t.length>1)throw new J(`Found more than one (${t.length}) save handlers for URL '${e}'`);e=t[0]}if(e.save==null)throw new J("LayersModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");let r=await Ma(n.getNamedWeights(t)),i={modelTopology:n.toJSON(null,!1),format:LS,generatedBy:`TensorFlow.js tfjs-layers v${sS}`,convertedBy:null};if(t!=null&&t.includeOptimizer&&n.optimizer!=null){i.trainingConfig=n.getTrainingConfig();let{data:e,specs:t}=await Ma(await n.optimizer.getWeights(),`optimizer`);r.specs.push(...t),r.data=Ra([r.data,e])}return n.userDefinedMetadata!=null&&(Xx(n.userDefinedMetadata,n.name,!0),i.userDefinedMetadata=n.userDefinedMetadata),i.weightData=r.data,i.weightSpecs=r.specs,e.save(i)}setUserDefinedMetadata(e){Xx(e,this.name),this.userDefinedMetadata=e}getUserDefinedMetadata(){return this.userDefinedMetadata}};RS.className=`Model`,q(RS);var zS=class extends RS{};zS.className=`Functional`,q(zS);var BS=class e extends RS{constructor(e){if(super({inputs:[],outputs:[]}),e=e||{},this.trainable=!0,this.built=!1,this.name=e.name==null?Gv(`sequential_`):e.name,e.layers!=null)for(let t of e.layers)this.add(t)}checkShape(e){if(e.inboundNodes[0].outputTensors[0].shape.some(e=>e<0))throw new J(`Negative dimension size caused by adding layer ${e.name} with input shape [${e.inboundNodes[0].inputTensors[0].shape}]`)}add(t){let n=t instanceof e||t instanceof RS,r;if(n){if(r=t,r.outputs.length!==1)throw new J(`All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.`);if(r.inputs.length!==1)throw new J(`All layers in a Sequential model should have a single input tensor. For multi-input layers, use the functional API.`)}if(this.outputs.length===0){if(t.inboundNodes.length===0){if(t.batchInputShape==null)throw new J("The first layer in a Sequential model must get an `inputShape` or `batchInputShape` argument.");let e=Mb({batchShape:t.batchInputShape,dtype:t.dtype,name:t.name+`_input`});t.apply(e)}if(n)this.outputs=r.outputs,this.inputs=r.inputs;else{if(t.inboundNodes.length!==1)throw new J(`A layer added to a Sequential model must not already be connected somewhere else. LayersModel received layer ${t.name} which has ${t.inboundNodes.length} pre-existing inbound connections.`);if(t.inboundNodes[0].outputTensors.length!==1)throw new J(`All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.`);this.checkShape(t),this.outputs=[t.inboundNodes[0].outputTensors[0]],this.inputs=Ob(this.outputs[0])}this.inboundNodes=[],new Cb({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:this.inputs,outputTensors:this.outputs,inputMasks:xv(null,this.inputs.length),outputMasks:[null],inputShapes:this.inputs.map(e=>e.shape),outputShapes:this.outputs[0].shape})}else{let e=t.apply(this.outputs[0]);if(Array.isArray(e))throw TypeError(`All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.`);this.checkShape(t),this.outputs=[e],this.inboundNodes[0].outputTensors=this.outputs,this.inboundNodes[0].outputShapes=[this.outputs[0].shape]}this.layers.push(t),this.built=!1}pop(){if(this.layers.length===0)throw TypeError(`There are no layers in the model.`);if(this.layers.pop(),this.layers.length===0)this.outputs=[],this.inboundNodes=[],this.outboundNodes=[];else{let e=this.layers.length-1;this.layers[e].outboundNodes=[],this.outputs=[this.layers[e].output],this.inboundNodes[0].outputTensors=this.outputs,this.inboundNodes[0].outputShapes=[this.outputs[0].shape]}}call(e,t){return this.model==null&&this.build(),this.model.call(e,t)}build(e){if(pb(e),this.inputs.length===0||this.outputs.length===0)throw TypeError(`Sequential model cannot be built: model is empty. Add some layers first.`);this.model=new RS({inputs:this.inputs,outputs:this.outputs[0],name:this.name+`_model`}),this.model.trainable=this.trainable,this.supportsMasking=this.model.supportsMasking,this.inputLayers=this.model.inputLayers,this.inputLayersNodeIndices=this.model.inputLayersNodeIndices,this.inputLayersTensorIndices=this.model.inputLayersTensorIndices,this.outputLayers=this.model.outputLayers,this.outputLayersNodeIndices=this.model.outputLayersNodeIndices,this.outputLayersTensorIndices=this.model.outputLayersTensorIndices,this.nodesByDepth=this.model.nodesByDepth,this.containerNodes=this.model.containerNodes,this.outputNames=this.model.outputNames,this.inputNames=this.model.inputNames,this.built=!0}countParams(){return this.built||this.build(),super.countParams()}summary(e,t,n=console.log){this.built||this.build(),super.summary(e,t,n)}setWeights(e){this.model==null&&this.build(),this.model.setWeights(e)}evaluate(e,t,n={}){if(!this.built)throw new _v(`The model needs to be compiled before being used.`);return this.model.evaluate(e,t,n)}async evaluateDataset(e,t){var n=this;if(!n.built)throw new _v(`The model needs to be compiled before being used.`);return n.model.evaluateDataset(e,t)}predict(e,t={}){return this.model==null&&this.build(),this.model.predict(e,t)}predictOnBatch(e){return this.model==null&&this.build(),this.model.predictOnBatch(e)}compile(e){this.build(),this.model.compile(e),this.optimizer_=this.model.optimizer,this.isOptimizerOwned=this.model.isOptimizerOwned,this.loss=this.model.loss,this.metrics=this.model.metrics,this.metricsTensors=this.model.metricsTensors,this.metricsNames=this.model.metricsNames}get optimizer(){return this.model==null?void 0:this.model.optimizer}set optimizer(e){this.model.optimizer=e}async fit(e,t,n={}){var r=this;if(!r.built)throw new _v(`The model needs to be compiled before being used.`);return r.model.fit(e,t,n)}async fitDataset(e,t){var n=this;if(!n.built)throw new _v(`The model needs to be compiled before being used.`);return n.model.fitDataset(e,t)}async trainOnBatch(e,t){return this.model.trainOnBatch(e,t)}static fromConfig(t,n,r={},i=!1){let a,o={};if(n instanceof Array){if(n[0].className==null||n[0].className===`Merge`)throw new J(`Legacy serialization format not supported yet.`);a=n}else O(n.layers!=null,()=>`When the config data for a Sequential model is not an Array, it must be an Object that contains the 'layers' field.`),a=n.layers,delete n.layers,o=n;let s=new t(o);if(!(s instanceof e))throw new vv(`Sequential.fromConfig called on non-Sequential input: ${s}`);for(let e of a){let t=ux(e,void 0,i);i&&t.setFastWeightInitDuringBuild(!0),s.add(t)}return s}set stopTraining(e){if(this.model==null)throw new J(`Cannot set the stopTraining property of a sequential model before it is compiled.`);this.model.stopTraining=e}get stopTraining(){if(this.model==null)throw new J(`Cannot get the stopTraining property of a sequential model before it is compiled.`);return this.model.stopTraining}getConfig(){let e=[];for(let t of this.layers){let n={};n.className=t.getClassName(),n.config=t.getConfig(),e.push(n)}return{name:this.name,layers:e}}};BS.className=`Sequential`,q(BS);var VS=class extends gm{getConfig(){return{}}},HS=class extends VS{apply(e,t=1){return Fy(e,t)}};HS.className=`elu`,q(HS);var US=class extends VS{apply(e){return Kd(e)}};US.className=`selu`,q(US);var WS=class extends VS{apply(e){return Id(e)}};WS.className=`relu`,q(WS);var GS=class extends VS{apply(e){return R(()=>Gu(6,Id(e)))}};GS.className=`relu6`,q(GS);var KS=class extends VS{apply(e){return e}};KS.className=`linear`,q(KS);var qS=class extends VS{apply(e){return js(e)}};qS.className=`sigmoid`,q(qS);var JS=class extends VS{apply(e){return Ry(e)}};JS.className=`hardSigmoid`,q(JS);var YS=class extends VS{apply(e){return vu(e)}};YS.className=`softplus`,q(YS);var XS=class extends VS{apply(e){return Iy(e)}};XS.className=`softsign`,q(XS);var ZS=class extends VS{apply(e){return Fs(e)}};ZS.className=`tanh`,q(ZS);var QS=class extends VS{apply(e,t=-1){return df(e,t)}};QS.className=`softmax`,q(QS);var $S=class extends VS{apply(e,t=-1){return Cu(e,t)}};$S.className=`logSoftmax`,q($S);var eC=class extends VS{apply(e){return R(()=>R(()=>H(e,H(.5,B(1,rl(V(e,Math.sqrt(2))))))))}};eC.className=`gelu`,q(eC);var tC=class extends VS{apply(e){return R(()=>H(.5,H(e,B(1,Fs(H(bl(V(2,Math.PI)),B(e,H(.044715,_l(e,3)))))))))}};tC.className=`gelu_new`,q(tC);var nC=class extends VS{apply(e){return R(()=>H(e,Fs(vu(e))))}};nC.className=`mish`,q(nC);var rC=class extends VS{apply(e,t=1){return R(()=>H(js(H(e,t)),e))}};rC.className=`swish`,q(rC);function iC(e){return e.getClassName()}function aC(e,t={}){return jv(e,_m.getMap().classNameMap,t,`activation`)}function oC(e){if(e==null){let e={};return e.className=`linear`,e.config={},aC(e)}if(typeof e==`string`){let t={};return t.className=e,t.config={},aC(t)}else if(e instanceof VS)return e;else return aC(e)}function sC(e){if(e!=null&&typeof e!=`object`)throw Error(`Argument to L1L2 regularizer's constructor is expected to be an object, but received: ${e}`)}var cC=class extends gm{},lC=class extends cC{constructor(e){super(),sC(e),this.l1=e==null||e.l1==null?.01:e.l1,this.l2=e==null||e.l2==null?.01:e.l2,this.hasL1=this.l1!==0,this.hasL2=this.l2!==0}apply(e){return R(()=>{let t=Hu([1]);return this.hasL1&&(t=B(t,G(H(this.l1,No(e))))),this.hasL2&&(t=B(t,G(H(this.l2,My(e))))),U(t,[])})}getConfig(){return{l1:this.l1,l2:this.l2}}static fromConfig(e,t){return new e({l1:t.l1,l2:t.l2})}};lC.className=`L1L2`,q(lC);var uC={l1l2:`L1L2`};function dC(e){return kv(e)}function fC(e,t={}){return jv(e,_m.getMap().classNameMap,t,`regularizer`)}function pC(e){return e==null?null:typeof e==`string`?fC({className:e in uC?uC[e]:e,config:{}}):e instanceof cC?e:fC(e)}var mC=class extends Tb{constructor(e){super(e==null?{}:e),this.supportsMasking=!0,e!=null&&(this.maxValue=e.maxValue)}call(e,t){e=Y(e);let n=Id(e);return this.maxValue!=null&&(n=tc(n,0,this.maxValue)),n}computeOutputShape(e){return e}getConfig(){let e={maxValue:this.maxValue},t=super.getConfig();return Object.assign(e,t),e}};mC.className=`ReLU`,q(mC);var hC=class extends Tb{constructor(e){super(e==null?{}:e),this.DEFAULT_ALPHA=.3,e==null&&(e={}),this.alpha=e.alpha==null?this.DEFAULT_ALPHA:e.alpha}call(e,t){return nu(Y(e),this.alpha)}computeOutputShape(e){return e}getConfig(){let e={alpha:this.alpha},t=super.getConfig();return Object.assign(e,t),e}};hC.className=`LeakyReLU`,q(hC);var gC=class extends Tb{constructor(e){if(super(e==null?{}:e),this.DEFAULT_ALPHA_INITIALIZER=`zeros`,e==null&&(e={}),this.supportsMasking=!0,this.alphaInitializer=ub(e.alphaInitializer||this.DEFAULT_ALPHA_INITIALIZER),this.alphaRegularizer=pC(e.alphaRegularizer),this.alphaConstraint=Qb(e.alphaConstraint),e.sharedAxes==null)this.sharedAxes=null;else if(Array.isArray(e.sharedAxes))this.sharedAxes=e.sharedAxes;else if(typeof e.sharedAxes==`number`)this.sharedAxes=[e.sharedAxes];else throw new J(`Expected sharedAxes to be a number or an array of numbers, but got ${e.sharedAxes}`)}build(e){e=pb(e);let t=e.slice(1);if(this.sharedAxes!=null)for(let e of this.sharedAxes)t[e-1]=1;this.alpha=this.addWeight(`alpha`,t,`float32`,this.alphaInitializer,this.alphaRegularizer,!0,this.alphaConstraint);let n={};if(this.sharedAxes!=null)for(let t=1;t<e.length;++t)n[t]=e[t];this.inputSpec=[new bb({ndim:e.length,axes:n})],this.built=!0}call(e,t){return e=Y(e),pd(e,this.alpha.read())}getConfig(){let e={alphaInitializer:lb(this.alphaInitializer),alphaRegularizer:dC(this.alphaRegularizer),alphaConstraint:Xb(this.alphaConstraint),sharedAxes:this.sharedAxes},t=super.getConfig();return Object.assign(e,t),e}};gC.className=`PReLU`,q(gC);var _C=class extends Tb{constructor(e){if(super(e==null?{}:e),this.DEFAULT_ALPHA=1,e==null&&(e={}),e.alpha!=null&&e.alpha!==this.DEFAULT_ALPHA)throw new vv(`Non-default alpha value (${e.alpha}) is not supported by the ELU layer yet.`);this.alpha=e.alpha==null?this.DEFAULT_ALPHA:e.alpha}call(e,t){return tl(Y(e))}computeOutputShape(e){return e}getConfig(){let e={alpha:this.alpha},t=super.getConfig();return Object.assign(e,t),e}};_C.className=`ELU`,q(_C);var vC=class extends Tb{constructor(e){super(e==null?{}:e),this.DEFAULT_THETA=1,e==null&&(e={}),this.theta=e.theta==null?this.DEFAULT_THETA:e.theta}call(e,t){let n=Y(e);return H(n,z(Wl(n,this.theta),`float32`))}computeOutputShape(e){return e}getConfig(){let e={theta:this.theta},t=super.getConfig();return Object.assign(e,t),e}};vC.className=`ThresholdedReLU`,q(vC);var yC=class extends Tb{constructor(e){super(e==null?{}:e),this.DEFAULT_AXIS=1,e==null&&(e={}),this.softmax=new QS().apply,this.axis=e.axis==null?this.DEFAULT_AXIS:e.axis}call(e,t){return R(()=>{let n=Y(e),r=t.mask;if(r!=null){let e=H(K(Uu(n.shape),z(r,n.dtype)),vl(-1e9));n=B(n,e)}return this.axis instanceof Array?this.axis.length>1?Al(K(n,Tu(n,this.axis,!0))):this.softmax(n,this.axis[0]):this.softmax(n,this.axis)})}computeOutputShape(e){return e}getConfig(){let e={axis:this.axis},t=super.getConfig();return Object.assign(e,t),e}};yC.className=`Softmax`,q(yC);function bC(e,t,n){if(typeof e==`number`)return xv(e,t);if(e.length!==t)throw new J(`The ${n} argument must be an integer or tuple of ${t} integers. Received: ${e.length} elements.`);for(let r=0;r<t;++r){let i=e[r];if(!uy(i))throw new J(`The ${n} argument must be an integer or tuple of ${t} integers. Received: ${JSON.stringify(e)} including a non-integer number ${i}`)}return e}function xC(e,t,n,r,i=1){if(e==null)return e;let a=t+(t-1)*(i-1),o;return o=n===`same`?e:e-a+1,Math.floor((o+r-1)/r)}function SC(e,t,n,r){if(e==null)return null;if(r===`valid`)e=e*t+py([n-t,0]);else if(r===`same`)e*=t;else throw new J(`Unsupport padding mode: ${r}.`);return e}function CC(e,t){return R(()=>(Qv(t),t===`channelsFirst`?Qf(e,[0,2,3,1]):e))}function wC(e,t){return R(()=>(Qv(t),t===`channelsFirst`?Qf(e,[0,2,3,4,1]):e))}function TC(e,t,n,r=1,i=`valid`,a,o=1){return R(()=>{if(a==null&&(a=_y()),Qv(a),e.shape.length!==3)throw new J(`The input of a conv1dWithBias operation should be 3, but is ${e.shape.length} instead.`);if(t.shape.length!==3)throw new J(`The kernel for a conv1dWithBias operation should be 3, but is ${t.shape.length} instead`);if(n!=null&&n.shape.length!==1)throw new J(`The bias for a conv1dWithBias operation should be 1, but is ${n.shape.length} instead`);if(a===`channelsFirst`&&(e=Qf(e,[0,2,1])),i===`causal`)throw new vv(`The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.`);let s=pc(e,t,r,i===`same`?`same`:`valid`,`NWC`,o);return n!=null&&(s=Py(s,n)),s})}function EC(e,t,n,r=[1,1],i=`valid`,a,o,s=null){return R(()=>{if(a==null&&(a=_y()),Qv(a),e.rank!==3&&e.rank!==4)throw new J(`conv2dWithBiasActivation expects input to be of rank 3 or 4, but received ${e.rank}.`);if(t.rank!==3&&t.rank!==4)throw new J(`conv2dWithBiasActivation expects kernel to be of rank 3 or 4, but received ${e.rank}.`);let c=CC(e,a);if(i===`causal`)throw new vv(`The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.`);return c=lp({x:c,filter:t,strides:r,pad:i===`same`?`same`:`valid`,dilations:o,dataFormat:`NHWC`,bias:n,activation:s}),a===`channelsFirst`&&(c=Qf(c,[0,3,1,2])),c})}function DC(e,t,n,r=[1,1,1],i=`valid`,a,o){return R(()=>{if(a==null&&(a=_y()),Qv(a),e.rank!==4&&e.rank!==5)throw new J(`conv3dWithBias expects input to be of rank 4 or 5, but received ${e.rank}.`);if(t.rank!==4&&t.rank!==5)throw new J(`conv3dWithBias expects kernel to be of rank 4 or 5, but received ${e.rank}.`);let s=wC(e,a);if(i===`causal`)throw new vv(`The support for CAUSAL padding mode in conv3dWithBias is not implemented yet.`);return s=yc(s,t,r,i===`same`?`same`:`valid`,`NDHWC`,o),n!=null&&(s=Py(s,n)),a===`channelsFirst`&&(s=Qf(s,[0,4,1,2,3])),s})}var OC=class e extends Tb{constructor(t,n){if(super(n),this.bias=null,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,e.verifyArgs(n),this.rank=t,Rv(this.rank,`rank`),this.rank!==1&&this.rank!==2&&this.rank!==3)throw new vv(`Convolution layer for rank other than 1, 2, or 3 (${this.rank}) is not implemented yet.`);if(this.kernelSize=bC(n.kernelSize,t,`kernelSize`),this.strides=bC(n.strides==null?1:n.strides,t,`strides`),this.padding=n.padding==null?`valid`:n.padding,ey(this.padding),this.dataFormat=n.dataFormat==null?`channelsLast`:n.dataFormat,Qv(this.dataFormat),this.activation=oC(n.activation),this.useBias=n.useBias==null?!0:n.useBias,this.biasInitializer=ub(n.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.biasConstraint=Qb(n.biasConstraint),this.biasRegularizer=pC(n.biasRegularizer),this.activityRegularizer=pC(n.activityRegularizer),this.dilationRate=bC(n.dilationRate==null?1:n.dilationRate,t,`dilationRate`),this.rank===1&&Array.isArray(this.dilationRate)&&this.dilationRate.length!==1)throw new J(`dilationRate must be a number or an array of a single number for 1D convolution, but received ${JSON.stringify(this.dilationRate)}`);if(this.rank===2){if(typeof this.dilationRate==`number`)this.dilationRate=[this.dilationRate,this.dilationRate];else if(this.dilationRate.length!==2)throw new J(`dilationRate must be a number or array of two numbers for 2D convolution, but received ${JSON.stringify(this.dilationRate)}`)}else if(this.rank===3){if(typeof this.dilationRate==`number`)this.dilationRate=[this.dilationRate,this.dilationRate,this.dilationRate];else if(this.dilationRate.length!==3)throw new J(`dilationRate must be a number or array of three numbers for 3D convolution, but received ${JSON.stringify(this.dilationRate)}`)}}static verifyArgs(e){if(Sv(`kernelSize`in e,`required key 'kernelSize' not in config`),typeof e.kernelSize!=`number`&&!Lv(e.kernelSize,`number`,1,3))throw new J(`BaseConv expects config.kernelSize to be number or number[] with length 1, 2, or 3, but received ${JSON.stringify(e.kernelSize)}.`)}getConfig(){let e={kernelSize:this.kernelSize,strides:this.strides,padding:this.padding,dataFormat:this.dataFormat,dilationRate:this.dilationRate,activation:iC(this.activation),useBias:this.useBias,biasInitializer:lb(this.biasInitializer),biasRegularizer:dC(this.biasRegularizer),activityRegularizer:dC(this.activityRegularizer),biasConstraint:Xb(this.biasConstraint)},t=super.getConfig();return Object.assign(e,t),e}},kC=class e extends OC{constructor(t,n){super(t,n),this.kernel=null,e.verifyArgs(n),this.filters=n.filters,Rv(this.filters,`filters`),this.kernelInitializer=ub(n.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.kernelConstraint=Qb(n.kernelConstraint),this.kernelRegularizer=pC(n.kernelRegularizer)}build(e){e=pb(e);let t=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[t]==null)throw new J(`The channel dimension of the input should be defined. Found ${e[t]}`);let n=e[t],r=this.kernelSize.concat([n,this.filters]);this.kernel=this.addWeight(`kernel`,r,null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight(`bias`,[this.filters],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[{ndim:this.rank+2,axes:{[t]:n}}],this.built=!0}call(e,t){return R(()=>{e=Y(e);let t,n=this.bias==null?null:this.bias.read(),r=Vv(this.activation.getClassName());if(r!=null&&this.rank===2)t=EC(e,this.kernel.read(),n,this.strides,this.padding,this.dataFormat,this.dilationRate,r);else{if(this.rank===1)t=TC(e,this.kernel.read(),n,this.strides[0],this.padding,this.dataFormat,this.dilationRate[0]);else if(this.rank===2)t=EC(e,this.kernel.read(),n,this.strides,this.padding,this.dataFormat,this.dilationRate);else if(this.rank===3)t=DC(e,this.kernel.read(),n,this.strides,this.padding,this.dataFormat,this.dilationRate);else throw new vv(`convolutions greater than 3D are not implemented yet.`);this.activation!=null&&(t=this.activation.apply(t))}return t})}computeOutputShape(e){e=pb(e);let t=[],n=this.dataFormat===`channelsLast`?e.slice(1,e.length-1):e.slice(2);for(let e=0;e<n.length;++e){let r=xC(n[e],this.kernelSize[e],this.padding,this.strides[e],typeof this.dilationRate==`number`?this.dilationRate:this.dilationRate[e]);t.push(r)}let r=[e[0]];return this.dataFormat===`channelsLast`?(r=r.concat(t),r.push(this.filters)):(r.push(this.filters),r=r.concat(t)),r}getConfig(){let e={filters:this.filters,kernelInitializer:lb(this.kernelInitializer),kernelRegularizer:dC(this.kernelRegularizer),kernelConstraint:Xb(this.kernelConstraint)},t=super.getConfig();return Object.assign(e,t),e}static verifyArgs(e){if(!(`filters`in e)||typeof e.filters!=`number`||e.filters<1)throw new J(`Convolution layer expected config.filters to be a 'number' > 0 but got ${JSON.stringify(e.filters)}`)}},AC=class e extends kC{constructor(t){super(2,t),e.verifyArgs(t)}getConfig(){let e=super.getConfig();return delete e.rank,e}static verifyArgs(e){if(typeof e.kernelSize!=`number`&&!Lv(e.kernelSize,`number`,1,2))throw new J(`Conv2D expects config.kernelSize to be number or number[] with length 1 or 2, but received ${JSON.stringify(e.kernelSize)}.`)}};AC.className=`Conv2D`,q(AC);var jC=class e extends kC{constructor(t){super(3,t),e.verifyArgs(t)}getConfig(){let e=super.getConfig();return delete e.rank,e}static verifyArgs(e){if(typeof e.kernelSize!=`number`&&!(Array.isArray(e.kernelSize)&&(e.kernelSize.length===1||e.kernelSize.length===3)))throw new J(`Conv3D expects config.kernelSize to be number or [number, number, number], but received ${JSON.stringify(e.kernelSize)}.`)}};jC.className=`Conv3D`,q(jC);var MC=class extends AC{constructor(e){if(super(e),this.inputSpec=[new bb({ndim:4})],this.padding!==`same`&&this.padding!==`valid`)throw new J(`Conv2DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode ${this.padding}`)}build(e){if(e=pb(e),e.length!==4)throw new J(`Input should have rank 4; Received input shape: `+JSON.stringify(e));let t=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[t]==null)throw new J("The channel dimension of the inputs should be defined. Found `None`.");let n=e[t],r=this.kernelSize.concat([this.filters,n]);this.kernel=this.addWeight(`kernel`,r,`float32`,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight(`bias`,[this.filters],`float32`,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[new bb({ndim:4,axes:{[t]:n}})],this.built=!0}call(e,t){return R(()=>{let t=Y(e);if(t.shape.length!==4)throw new J(`Conv2DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-${t.shape.length}`);let n=t.shape,r=n[0],i,a;this.dataFormat===`channelsFirst`?(i=2,a=3):(i=1,a=2);let o=n[i],s=n[a],c=this.kernelSize[0],l=this.kernelSize[1],u=this.strides[0],d=this.strides[1],f=[r,SC(o,u,c,this.padding),SC(s,d,l,this.padding),this.filters];this.dataFormat!==`channelsLast`&&(t=Qf(t,[0,2,3,1]));let p=_c(t,this.kernel.read(),f,this.strides,this.padding);return this.dataFormat!==`channelsLast`&&(p=Qf(p,[0,3,1,2])),this.bias!=null&&(p=Py(p,this.bias.read(),this.dataFormat)),this.activation!=null&&(p=this.activation.apply(p)),p})}computeOutputShape(e){e=pb(e);let t=e.slice(),n,r,i;this.dataFormat===`channelsFirst`?(n=1,r=2,i=3):(n=3,r=1,i=2);let a=this.kernelSize[0],o=this.kernelSize[1],s=this.strides[0],c=this.strides[1];return t[n]=this.filters,t[r]=SC(t[r],s,a,this.padding),t[i]=SC(t[i],c,o,this.padding),t}getConfig(){let e=super.getConfig();return delete e.dilationRate,e}};MC.className=`Conv2DTranspose`,q(MC);var NC=class extends jC{constructor(e){if(super(e),this.inputSpec=[new bb({ndim:5})],this.padding!==`same`&&this.padding!==`valid`)throw new J(`Conv3DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode ${this.padding}`)}build(e){if(e=pb(e),e.length!==5)throw new J(`Input should have rank 5; Received input shape: `+JSON.stringify(e));let t=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[t]==null)throw new J("The channel dimension of the inputs should be defined. Found `None`.");let n=e[t],r=this.kernelSize.concat([this.filters,n]);this.kernel=this.addWeight(`kernel`,r,`float32`,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight(`bias`,[this.filters],`float32`,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[new bb({ndim:5,axes:{[t]:n}})],this.built=!0}call(e,t){return R(()=>{let t=Y(e);if(t.shape.length!==5)throw new J(`Conv3DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-${t.shape.length}`);let n=t.shape,r=n[0],i,a,o;this.dataFormat===`channelsFirst`?(o=2,i=3,a=4):(o=1,i=2,a=3);let s=n[o],c=n[i],l=n[a],u=this.kernelSize[0],d=this.kernelSize[1],f=this.kernelSize[2],p=this.strides[0],m=this.strides[1],h=this.strides[2],g=[r,SC(s,p,u,this.padding),SC(c,m,d,this.padding),SC(l,h,f,this.padding),this.filters];this.dataFormat!==`channelsLast`&&(t=Qf(t,[0,2,3,4,1]));let _=Cc(t,this.kernel.read(),g,this.strides,this.padding);return this.dataFormat!==`channelsLast`&&(_=Qf(_,[0,4,1,2,3])),this.bias!==null&&(_=Py(_,this.bias.read(),this.dataFormat)),this.activation!==null&&(_=this.activation.apply(_)),_})}computeOutputShape(e){e=pb(e);let t=e.slice(),n,r,i,a;this.dataFormat===`channelsFirst`?(n=1,r=2,i=3,a=4):(n=4,r=1,i=2,a=3);let o=this.kernelSize[0],s=this.kernelSize[1],c=this.kernelSize[2],l=this.strides[0],u=this.strides[1],d=this.strides[2];return t[n]=this.filters,t[r]=SC(t[r],l,o,this.padding),t[i]=SC(t[i],u,s,this.padding),t[a]=SC(t[a],d,c,this.padding),t}getConfig(){let e=super.getConfig();return delete e.dilationRate,e}};NC.className=`Conv3DTranspose`,q(NC);var PC=class extends kC{constructor(e,t){if(super(e,t),this.DEFAULT_DEPTHWISE_INITIALIZER=`glorotUniform`,this.DEFAULT_POINTWISE_INITIALIZER=`glorotUniform`,this.depthwiseKernel=null,this.pointwiseKernel=null,t.filters==null)throw new J("The `filters` configuration field is required by SeparableConv, but is unspecified.");if(t.kernelInitializer!=null||t.kernelRegularizer!=null||t.kernelConstraint!=null)throw new J(`Fields kernelInitializer, kernelRegularizer and kernelConstraint are invalid for SeparableConv2D. Use depthwiseInitializer, depthwiseRegularizer, depthwiseConstraint, pointwiseInitializer, pointwiseRegularizer and pointwiseConstraint instead.`);if(t.padding!=null&&t.padding!==`same`&&t.padding!==`valid`)throw new J(`SeparableConv${this.rank}D supports only padding modes: 'same' and 'valid', but received ${JSON.stringify(t.padding)}`);this.depthMultiplier=t.depthMultiplier==null?1:t.depthMultiplier,this.depthwiseInitializer=ub(t.depthwiseInitializer||this.DEFAULT_DEPTHWISE_INITIALIZER),this.depthwiseRegularizer=pC(t.depthwiseRegularizer),this.depthwiseConstraint=Qb(t.depthwiseConstraint),this.pointwiseInitializer=ub(t.depthwiseInitializer||this.DEFAULT_POINTWISE_INITIALIZER),this.pointwiseRegularizer=pC(t.pointwiseRegularizer),this.pointwiseConstraint=Qb(t.pointwiseConstraint)}build(e){if(e=pb(e),e.length<this.rank+2)throw new J(`Inputs to SeparableConv${this.rank}D should have rank ${this.rank+2}, but received input shape: ${JSON.stringify(e)}`);let t=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[t]==null||e[t]<0)throw new J(`The channel dimension of the inputs should be defined, but found ${JSON.stringify(e[t])}`);let n=e[t],r=this.kernelSize.concat([n,this.depthMultiplier]),i=[];for(let e=0;e<this.rank;++e)i.push(1);i.push(n*this.depthMultiplier,this.filters),this.depthwiseKernel=this.addWeight(`depthwise_kernel`,r,`float32`,this.depthwiseInitializer,this.depthwiseRegularizer,!0,this.depthwiseConstraint),this.pointwiseKernel=this.addWeight(`pointwise_kernel`,i,`float32`,this.pointwiseInitializer,this.pointwiseRegularizer,!0,this.pointwiseConstraint),this.useBias?this.bias=this.addWeight(`bias`,[this.filters],`float32`,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.inputSpec=[new bb({ndim:this.rank+2,axes:{[t]:n}})],this.built=!0}call(e,t){return R(()=>{e=Y(e);let t;if(this.rank===1)throw new vv(`1D separable convolution is not implemented yet.`);return this.rank===2&&(this.dataFormat===`channelsFirst`&&(e=Qf(e,[0,2,3,1])),t=Jd(e,this.depthwiseKernel.read(),this.pointwiseKernel.read(),this.strides,this.padding,this.dilationRate,`NHWC`)),this.useBias&&(t=Py(t,this.bias.read(),this.dataFormat)),this.activation!=null&&(t=this.activation.apply(t)),this.dataFormat===`channelsFirst`&&(t=Qf(t,[0,3,1,2])),t})}getConfig(){let e=super.getConfig();return delete e.rank,delete e.kernelInitializer,delete e.kernelRegularizer,delete e.kernelConstraint,e.depthwiseInitializer=lb(this.depthwiseInitializer),e.pointwiseInitializer=lb(this.pointwiseInitializer),e.depthwiseRegularizer=dC(this.depthwiseRegularizer),e.pointwiseRegularizer=dC(this.pointwiseRegularizer),e.depthwiseConstraint=Xb(this.depthwiseConstraint),e.pointwiseConstraint=Xb(this.pointwiseConstraint),e}};PC.className=`SeparableConv`;var FC=class extends PC{constructor(e){super(2,e)}};FC.className=`SeparableConv2D`,q(FC);var IC=class e extends kC{constructor(t){super(1,t),e.verifyArgs(t),this.inputSpec=[{ndim:3}]}getConfig(){let e=super.getConfig();return delete e.rank,delete e.dataFormat,e}static verifyArgs(e){if(typeof e.kernelSize!=`number`&&!Lv(e.kernelSize,`number`,1,1))throw new J(`Conv1D expects config.kernelSize to be number or number[] with length 1, but received ${JSON.stringify(e.kernelSize)}.`)}};IC.className=`Conv1D`,q(IC);var LC=class extends Tb{constructor(e){super(e),typeof e.cropping==`number`?this.cropping=[[e.cropping,e.cropping],[e.cropping,e.cropping]]:typeof e.cropping[0]==`number`?this.cropping=[[e.cropping[0],e.cropping[0]],[e.cropping[1],e.cropping[1]]]:this.cropping=e.cropping,this.dataFormat=e.dataFormat===void 0?`channelsLast`:e.dataFormat,this.inputSpec=[{ndim:4}]}computeOutputShape(e){return this.dataFormat===`channelsFirst`?[e[0],e[1],e[2]-this.cropping[0][0]-this.cropping[0][1],e[3]-this.cropping[1][0]-this.cropping[1][1]]:[e[0],e[1]-this.cropping[0][0]-this.cropping[0][1],e[2]-this.cropping[1][0]-this.cropping[1][1],e[3]]}call(e,t){return R(()=>(e=Y(e),this.dataFormat===`channelsLast`?Ty(Ty(e,this.cropping[0][0],e.shape[1]-this.cropping[0][0]-this.cropping[0][1],2),this.cropping[1][0],e.shape[2]-this.cropping[1][1]-this.cropping[1][0],3):Ty(Ty(e,this.cropping[0][0],e.shape[2]-this.cropping[0][0]-this.cropping[0][1],3),this.cropping[1][0],e.shape[3]-this.cropping[1][1]-this.cropping[1][0],4)))}getConfig(){let e={cropping:this.cropping,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}};LC.className=`Cropping2D`,q(LC);var RC=class extends Tb{constructor(e){super(e),this.DEFAULT_SIZE=[2,2],this.inputSpec=[{ndim:4}],this.size=e.size==null?this.DEFAULT_SIZE:e.size,this.dataFormat=e.dataFormat==null?`channelsLast`:e.dataFormat,Qv(this.dataFormat),this.interpolation=e.interpolation==null?`nearest`:e.interpolation,$v(this.interpolation)}computeOutputShape(e){if(this.dataFormat===`channelsFirst`){let t=e[2]==null?null:this.size[0]*e[2],n=e[3]==null?null:this.size[1]*e[3];return[e[0],e[1],t,n]}else{let t=e[1]==null?null:this.size[0]*e[1],n=e[2]==null?null:this.size[1]*e[2];return[e[0],t,n,e[3]]}}call(e,t){return R(()=>{let t=Y(e),n=t.shape;if(this.dataFormat===`channelsFirst`){t=Qf(t,[0,2,3,1]);let e=this.size[0]*n[2],r=this.size[1]*n[3];return Qf(this.interpolation===`nearest`?fm.resizeNearestNeighbor(t,[e,r]):fm.resizeBilinear(t,[e,r]),[0,3,1,2])}else{let e=this.size[0]*n[1],r=this.size[1]*n[2];return this.interpolation===`nearest`?fm.resizeNearestNeighbor(t,[e,r]):fm.resizeBilinear(t,[e,r])}})}getConfig(){let e={size:this.size,dataFormat:this.dataFormat,interpolation:this.interpolation},t=super.getConfig();return Object.assign(e,t),e}};RC.className=`UpSampling2D`,q(RC);function zC(e,t,n=[1,1],r=`valid`,i,a){return R(()=>{i==null&&(i=_y()),Qv(i);let o=CC(e,i);if(e.rank!==4)throw new J(`Input for depthwiseConv2d is required to be 4-D, but is instead ${e.rank}-D`);if(t.rank!==4)throw new J(`depthwiseKernel is required to be 4-D, but is instead ${t.rank}-D`);return o=Lc(o,t,n,r===`same`?`same`:`valid`,`NHWC`,a),i===`channelsFirst`&&(o=Qf(o,[0,3,1,2])),o})}var BC=class extends OC{constructor(e){super(2,e),this.depthwiseKernel=null,this.depthMultiplier=e.depthMultiplier==null?1:e.depthMultiplier,this.depthwiseInitializer=ub(e.depthwiseInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.depthwiseConstraint=Qb(e.depthwiseConstraint),this.depthwiseRegularizer=pC(e.depthwiseRegularizer)}build(e){if(e=pb(e),e.length<4)throw new J(`Inputs to DepthwiseConv2D should have rank 4. Received input shape: ${JSON.stringify(e)}.`);let t=this.dataFormat===`channelsFirst`?1:3;if(e[t]==null||e[t]<0)throw new J(`The channel dimension of the inputs to DepthwiseConv2D should be defined, but is not (${e[t]}).`);let n=e[t],r=[this.kernelSize[0],this.kernelSize[1],n,this.depthMultiplier];this.depthwiseKernel=this.addWeight(`depthwise_kernel`,r,null,this.depthwiseInitializer,this.depthwiseRegularizer,!0,this.depthwiseConstraint),this.useBias?this.bias=this.addWeight(`bias`,[n*this.depthMultiplier],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(e,t){return R(()=>{e=Y(e);let t=zC(e,this.depthwiseKernel.read(),this.strides,this.padding,this.dataFormat,null);return this.useBias&&(t=Py(t,this.bias.read(),this.dataFormat)),this.activation!=null&&(t=this.activation.apply(t)),t})}computeOutputShape(e){e=pb(e);let t=this.dataFormat===`channelsFirst`?e[2]:e[1],n=this.dataFormat===`channelsFirst`?e[3]:e[2],r=this.dataFormat===`channelsFirst`?e[1]*this.depthMultiplier:e[3]*this.depthMultiplier,i=xC(t,this.kernelSize[0],this.padding,this.strides[0]),a=xC(n,this.kernelSize[1],this.padding,this.strides[1]);return this.dataFormat===`channelsFirst`?[e[0],r,i,a]:[e[0],i,a,r]}getConfig(){let e=super.getConfig();return e.depthMultiplier=this.depthMultiplier,e.depthwiseInitializer=lb(this.depthwiseInitializer),e.depthwiseRegularizer=dC(this.depthwiseRegularizer),e.depthwiseConstraint=Xb(this.depthwiseRegularizer),e}};BC.className=`DepthwiseConv2D`,q(BC);function VC(e,t,n,r){if(Array.isArray(e)){if(t!=null||n!=null)throw new J(`When inputs is an array, neither initialState or constants should be provided`);r!=null&&(n=e.slice(e.length-r,e.length),e=e.slice(0,e.length-r)),e.length>1&&(t=e.slice(1,e.length)),e=e[0]}function i(e){return e==null||Array.isArray(e)?e:[e]}return t=i(t),n=i(n),{inputs:e,initialState:t,constants:n}}function HC(e,t,n,r=!1,i,a,o=!1,s=!1){return R(()=>{let c=t.shape.length;if(c<3)throw new J(`Input should be at least 3D, but is ${c}D.`);let l=[1,0].concat(my(2,c));if(t=Qf(t,l),a!=null)throw new vv(`The rnn() functoin of the deeplearn.js backend does not support constants yet.`);o&&console.warn(`Backend rnn(): the unroll = true option is not applicable to the imperative deeplearn.js backend.`),i!=null&&(i=z(z(i,`bool`),`float32`),i.rank===c-1&&(i=Ml(i,-1)),i=Qf(i,l)),r&&(t=Bd(t,0),i!=null&&(i=Bd(i,0)));let u=[],d,f=n,p=t.shape[0],m=Jf(t),h;i!=null&&(h=Jf(i));for(let t=0;t<p;++t){let n=m[t],r=R(()=>e(n,f));if(i==null)d=r[0],f=r[1];else{let e=R(()=>{let e=h[t],n=K(rd(e),e);return{output:B(H(r[0],e),H(f[0],n)),newStates:f.map((t,i)=>B(H(r[1][i],e),H(t,n)))}});d=e.output,f=e.newStates}s&&u.push(d)}let g;return s&&(g=Df(u,1)),[d,g,f]})}var UC=class e extends Tb{constructor(e){super(e);let t;if(e.cell==null)throw new J(`cell property is missing for the constructor of RNN.`);if(t=Array.isArray(e.cell)?new ZC({cells:e.cell}):e.cell,t.stateSize==null)throw new J("The RNN cell should have an attribute `stateSize` (tuple of integers, one integer per RNN state).");this.cell=t,this.returnSequences=e.returnSequences==null?!1:e.returnSequences,this.returnState=e.returnState==null?!1:e.returnState,this.goBackwards=e.goBackwards==null?!1:e.goBackwards,this._stateful=e.stateful==null?!1:e.stateful,this.unroll=e.unroll==null?!1:e.unroll,this.supportsMasking=!0,this.inputSpec=[new bb({ndim:3})],this.stateSpec=null,this.states_=null,this.numConstants=null,this.keptStates=[]}getStates(){return this.states_==null?my(0,Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1).map(e=>null):this.states_}setStates(e){this.states_=e}computeOutputShape(e){db(e)&&(e=e[0]),e=e;let t=this.cell.stateSize;Array.isArray(t)||(t=[t]);let n=t[0],r;if(r=this.returnSequences?[e[0],e[1],n]:[e[0],n],this.returnState){let n=[];for(let r of t)n.push([e[0],r]);return[r].concat(n)}else return r}computeMask(e,t){return R(()=>{Array.isArray(t)&&(t=t[0]);let e=this.returnSequences?t:null;if(this.returnState){let t=this.states.map(e=>null);return[e].concat(t)}else return e})}get states(){if(this.states_==null){let e=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1,t=[];for(let n=0;n<e;++n)t.push(null);return t}else return this.states_}set states(e){this.states_=e}build(e){if(this.numConstants!=null)throw new vv(`Constants support is not implemented in RNN yet.`);db(e)&&(e=e[0]),e=e;let t=this.stateful?e[0]:null,n=e.slice(2);this.inputSpec[0]=new bb({shape:[t,null,...n]});let r=[e[0]].concat(e.slice(2));this.cell.build(r);let i;if(i=Array.isArray(this.cell.stateSize)?this.cell.stateSize:[this.cell.stateSize],this.stateSpec!=null){if(!A(this.stateSpec.map(e=>e.shape[e.shape.length-1]),i))throw new J(`An initialState was passed that is not compatible with cell.stateSize. Received stateSpec=${this.stateSpec}; However cell.stateSize is ${this.cell.stateSize}`)}else this.stateSpec=i.map(e=>new bb({shape:[null,e]}));this.stateful&&this.resetStates()}resetStates(e,t=!1){R(()=>{if(!this.stateful)throw new gv(`Cannot call resetStates() on an RNN Layer that is not stateful.`);let n=this.inputSpec[0].shape[0];if(n==null)throw new J("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(this.states_==null)Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(e=>Hu([n,e])):this.states_=[Hu([n,this.cell.stateSize])];else if(e==null)Ta(this.states_),this.keptStates!=null&&(Ta(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(e=>Hu([n,e])):this.states_[0]=Hu([n,this.cell.stateSize]);else{if(Array.isArray(e)||(e=[e]),e.length!==this.states_.length)throw new J(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${e.length} state value(s). Input received: ${e}`);t===!0?this.keptStates.push(this.states_.slice()):Ta(this.states_);for(let t=0;t<this.states_.length;++t){let r=e[t],i=[n,Array.isArray(this.cell.stateSize)?this.cell.stateSize[t]:this.cell.stateSize];if(!A(r.shape,i))throw new J(`State ${t} is incompatible with layer ${this.name}: expected shape=${i}, received shape=${r.shape}`);this.states_[t]=r}}this.states_=this.states_.map(e=>Ea(e.clone()))})}apply(e,t){let n=t==null?null:t.initialState,r=t==null?null:t.constants;t==null&&(t={});let i=VC(e,n,r,this.numConstants);e=i.inputs,n=i.initialState,r=i.constants;let a=[],o=[];if(n!=null){t.initialState=n,a=a.concat(n),this.stateSpec=[];for(let e of n)this.stateSpec.push(new bb({shape:e.shape}));o=o.concat(this.stateSpec)}if(r!=null&&(t.constants=r,a=a.concat(r),this.numConstants=r.length),a[0]instanceof xb){let n=[e].concat(a),r=this.inputSpec.concat(o),i=this.inputSpec;this.inputSpec=r;let s=super.apply(n,t);return this.inputSpec=i,s}else return super.apply(e,t)}call(e,t){return R(()=>{let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;e=Y(e),i==null&&(i=this.stateful?this.states_:this.getInitialState(e));let a=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;if(i.length!==a)throw new J(`RNN Layer has ${a} state(s) but was passed ${i.length} initial state(s).`);this.unroll&&console.warn(`Ignoring unroll = true for RNN layer, due to imperative backend.`);let o={training:r},s=HC((e,t)=>{let n=this.cell.call([e].concat(t),o);return[n[0],n.slice(1)]},e,i,this.goBackwards,n,null,this.unroll,this.returnSequences),c=s[0],l=s[1],u=s[2];this.stateful&&this.resetStates(u,r);let d=this.returnSequences?l:c;return this.returnState?[d].concat(u):d})}getInitialState(e){return R(()=>{let t=Hu(e.shape);return t=G(t,[1,2]),t=yy(t),Array.isArray(this.cell.stateSize)?this.cell.stateSize.map(e=>e>1?Oy(t,[1,e]):t):this.cell.stateSize>1?[Oy(t,[1,this.cell.stateSize])]:[t]})}get trainableWeights(){return this.trainable?this.cell.trainableWeights:[]}get nonTrainableWeights(){return this.trainable?this.cell.nonTrainableWeights:this.cell.weights}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.cell!=null&&this.cell.setFastWeightInitDuringBuild(e)}getConfig(){let t=super.getConfig(),n={returnSequences:this.returnSequences,returnState:this.returnState,goBackwards:this.goBackwards,stateful:this.stateful,unroll:this.unroll};this.numConstants!=null&&(n.numConstants=this.numConstants);let r=this.cell.getConfig();return this.getClassName()===e.className&&(n.cell={className:this.cell.getClassName(),config:r}),Object.assign(Object.assign(Object.assign({},r),t),n)}static fromConfig(e,t,n={}){let r=t.cell,i=ux(r,n);return new e(Object.assign(t,{cell:i}))}};UC.className=`RNN`,q(UC);var WC=class extends Tb{},GC=class extends WC{constructor(e){super(e),this.DEFAULT_ACTIVATION=`tanh`,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_RECURRENT_INITIALIZER=`orthogonal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,this.units=e.units,Rv(this.units,`units`),this.activation=oC(e.activation==null?this.DEFAULT_ACTIVATION:e.activation),this.useBias=e.useBias==null?!0:e.useBias,this.kernelInitializer=ub(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=ub(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=ub(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=pC(e.kernelRegularizer),this.recurrentRegularizer=pC(e.recurrentRegularizer),this.biasRegularizer=pC(e.biasRegularizer),this.kernelConstraint=Qb(e.kernelConstraint),this.recurrentConstraint=Qb(e.recurrentConstraint),this.biasConstraint=Qb(e.biasConstraint),this.dropout=fy([1,py([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=fy([1,py([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){e=pb(e),this.kernel=this.addWeight(`kernel`,[e[e.length-1],this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight(`recurrent_kernel`,[this.units,this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight(`bias`,[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(e,t){return R(()=>{if(e=e,e.length!==2)throw new J(`SimpleRNNCell expects 2 input Tensors, got ${e.length}.`);let n=e[1];e=e[0];let r=t.training==null?!1:t.training;0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=QC({ones:()=>rd(e),rate:this.dropout,training:r,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=QC({ones:()=>rd(n),rate:this.recurrentDropout,training:r,dropoutFunc:this.dropoutFunc}));let i,a=this.dropoutMask,o=this.recurrentDropoutMask;i=Ay(a==null?e:H(e,a),this.kernel.read()),this.bias!=null&&(i=Py(i,this.bias.read())),o!=null&&(n=H(n,o));let s=B(i,Ay(n,this.recurrentKernel.read()));return this.activation!=null&&(s=this.activation.apply(s)),[s,s]})}getConfig(){let e=super.getConfig(),t={units:this.units,activation:iC(this.activation),useBias:this.useBias,kernelInitializer:lb(this.kernelInitializer),recurrentInitializer:lb(this.recurrentInitializer),biasInitializer:lb(this.biasInitializer),kernelRegularizer:dC(this.kernelRegularizer),recurrentRegularizer:dC(this.recurrentRegularizer),biasRegularizer:dC(this.biasRegularizer),activityRegularizer:dC(this.activityRegularizer),kernelConstraint:Xb(this.kernelConstraint),recurrentConstraint:Xb(this.recurrentConstraint),biasConstraint:Xb(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout};return Object.assign(Object.assign({},e),t)}};GC.className=`SimpleRNNCell`,q(GC);var KC=class extends UC{constructor(e){e.cell=new GC(e),super(e)}call(e,t){return R(()=>{this.cell.dropoutMask!=null&&(Ta(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(Ta(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;return super.call(e,{mask:n,training:r,initialState:i})})}static fromConfig(e,t){return new e(t)}};KC.className=`SimpleRNN`,q(KC);var qC=class extends WC{constructor(e){if(super(e),this.DEFAULT_ACTIVATION=`tanh`,this.DEFAULT_RECURRENT_ACTIVATION=`hardSigmoid`,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_RECURRENT_INITIALIZER=`orthogonal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,e.resetAfter)throw new J(`GRUCell does not support reset_after parameter set to true.`);this.units=e.units,Rv(this.units,`units`),this.activation=oC(e.activation===void 0?this.DEFAULT_ACTIVATION:e.activation),this.recurrentActivation=oC(e.recurrentActivation===void 0?this.DEFAULT_RECURRENT_ACTIVATION:e.recurrentActivation),this.useBias=e.useBias==null?!0:e.useBias,this.kernelInitializer=ub(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=ub(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=ub(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=pC(e.kernelRegularizer),this.recurrentRegularizer=pC(e.recurrentRegularizer),this.biasRegularizer=pC(e.biasRegularizer),this.kernelConstraint=Qb(e.kernelConstraint),this.recurrentConstraint=Qb(e.recurrentConstraint),this.biasConstraint=Qb(e.biasConstraint),this.dropout=fy([1,py([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=fy([1,py([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.implementation=e.implementation,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){e=pb(e);let t=e[e.length-1];this.kernel=this.addWeight(`kernel`,[t,this.units*3],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight(`recurrent_kernel`,[this.units,this.units*3],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight(`bias`,[this.units*3],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(e,t){return R(()=>{if(e=e,e.length!==2)throw new J(`GRUCell expects 2 input Tensors (inputs, h, c), got ${e.length}.`);let n=t.training==null?!1:t.training,r=e[1];e=e[0],0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=QC({ones:()=>rd(e),rate:this.dropout,training:n,count:3,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=QC({ones:()=>rd(r),rate:this.recurrentDropout,training:n,count:3,dropoutFunc:this.dropoutFunc}));let i=this.dropoutMask,a=this.recurrentDropoutMask,o,s,c;0<this.dropout&&this.dropout<1&&(e=H(e,i[0]));let l=Ay(e,this.kernel.read());this.useBias&&(l=Py(l,this.bias.read())),0<this.recurrentDropout&&this.recurrentDropout<1&&(r=H(r,a[0]));let u=this.recurrentKernel.read(),[d,f]=yf(u,[2*this.units,this.units],u.rank-1),p=Ay(r,d),[m,h,g]=yf(l,3,l.rank-1),[_,v]=yf(p,2,p.rank-1);o=this.recurrentActivation.apply(B(m,_)),s=this.recurrentActivation.apply(B(h,v));let y=Ay(H(s,r),f);c=this.activation.apply(B(g,y));let b=B(H(o,r),H(B(1,gu(o)),c));return[b,b]})}getConfig(){let e=super.getConfig(),t={units:this.units,activation:iC(this.activation),recurrentActivation:iC(this.recurrentActivation),useBias:this.useBias,kernelInitializer:lb(this.kernelInitializer),recurrentInitializer:lb(this.recurrentInitializer),biasInitializer:lb(this.biasInitializer),kernelRegularizer:dC(this.kernelRegularizer),recurrentRegularizer:dC(this.recurrentRegularizer),biasRegularizer:dC(this.biasRegularizer),activityRegularizer:dC(this.activityRegularizer),kernelConstraint:Xb(this.kernelConstraint),recurrentConstraint:Xb(this.recurrentConstraint),biasConstraint:Xb(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation,resetAfter:!1};return Object.assign(Object.assign({},e),t)}};qC.className=`GRUCell`,q(qC);var JC=class extends UC{constructor(e){e.implementation===0&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),e.cell=new qC(e),super(e)}call(e,t){return R(()=>{this.cell.dropoutMask!=null&&(Ta(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(Ta(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;return super.call(e,{mask:n,training:r,initialState:i})})}static fromConfig(e,t){return t.implmentation===0&&(t.implementation=1),new e(t)}};JC.className=`GRU`,q(JC);var YC=class extends WC{constructor(e){super(e),this.DEFAULT_ACTIVATION=`tanh`,this.DEFAULT_RECURRENT_ACTIVATION=`hardSigmoid`,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_RECURRENT_INITIALIZER=`orthogonal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,this.units=e.units,Rv(this.units,`units`),this.activation=oC(e.activation===void 0?this.DEFAULT_ACTIVATION:e.activation),this.recurrentActivation=oC(e.recurrentActivation===void 0?this.DEFAULT_RECURRENT_ACTIVATION:e.recurrentActivation),this.useBias=e.useBias==null?!0:e.useBias,this.kernelInitializer=ub(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=ub(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=ub(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.unitForgetBias=e.unitForgetBias,this.kernelRegularizer=pC(e.kernelRegularizer),this.recurrentRegularizer=pC(e.recurrentRegularizer),this.biasRegularizer=pC(e.biasRegularizer),this.kernelConstraint=Qb(e.kernelConstraint),this.recurrentConstraint=Qb(e.recurrentConstraint),this.biasConstraint=Qb(e.biasConstraint),this.dropout=fy([1,py([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=fy([1,py([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.implementation=e.implementation,this.stateSize=[this.units,this.units],this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){var t;e=pb(e);let n=e[e.length-1];this.kernel=this.addWeight(`kernel`,[n,this.units*4],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight(`recurrent_kernel`,[this.units,this.units*4],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint);let r;if(this.useBias){if(this.unitForgetBias){let e=this.biasInitializer,n=this.units;r=new(t=class extends Wy{apply(t,r){let i=e.apply([n]),a=new Ky().apply([n]),o=e.apply([n*2]);return Dy(Dy(i,a),o)}},t.className=`CustomInit`,t)}else r=this.biasInitializer;this.bias=this.addWeight(`bias`,[this.units*4],null,r,this.biasRegularizer,!0,this.biasConstraint)}else this.bias=null;this.built=!0}call(e,t){return R(()=>{let n=t.training==null?!1:t.training;if(e=e,e.length!==3)throw new J(`LSTMCell expects 3 input Tensors (inputs, h, c), got ${e.length}.`);let r=e[1],i=e[2];e=e[0],0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=QC({ones:()=>rd(e),rate:this.dropout,training:n,count:4,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=QC({ones:()=>rd(r),rate:this.recurrentDropout,training:n,count:4,dropoutFunc:this.dropoutFunc}));let a=this.dropoutMask,o=this.recurrentDropoutMask,s,c,l,u;0<this.dropout&&this.dropout<1&&(e=H(e,a[0]));let d=Ay(e,this.kernel.read());0<this.recurrentDropout&&this.recurrentDropout<1&&(r=H(r,o[0])),d=B(d,Ay(r,this.recurrentKernel.read())),this.useBias&&(d=Py(d,this.bias.read()));let[f,p,m,h]=yf(d,4,d.rank-1);s=this.recurrentActivation.apply(f),c=this.recurrentActivation.apply(p),l=B(H(c,i),H(s,this.activation.apply(m))),u=this.recurrentActivation.apply(h);let g=H(u,this.activation.apply(l));return[g,g,l]})}getConfig(){let e=super.getConfig(),t={units:this.units,activation:iC(this.activation),recurrentActivation:iC(this.recurrentActivation),useBias:this.useBias,kernelInitializer:lb(this.kernelInitializer),recurrentInitializer:lb(this.recurrentInitializer),biasInitializer:lb(this.biasInitializer),unitForgetBias:this.unitForgetBias,kernelRegularizer:dC(this.kernelRegularizer),recurrentRegularizer:dC(this.recurrentRegularizer),biasRegularizer:dC(this.biasRegularizer),activityRegularizer:dC(this.activityRegularizer),kernelConstraint:Xb(this.kernelConstraint),recurrentConstraint:Xb(this.recurrentConstraint),biasConstraint:Xb(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation};return Object.assign(Object.assign({},e),t)}};YC.className=`LSTMCell`,q(YC);var XC=class extends UC{constructor(e){e.implementation===0&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),e.cell=new YC(e),super(e)}call(e,t){return R(()=>{this.cell.dropoutMask!=null&&(Ta(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(Ta(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;return super.call(e,{mask:n,training:r,initialState:i})})}static fromConfig(e,t){return t.implmentation===0&&(t.implementation=1),new e(t)}};XC.className=`LSTM`,q(XC);var ZC=class extends WC{constructor(e){super(e),this.cells=e.cells}get stateSize(){let e=[];for(let t of this.cells.slice().reverse())Array.isArray(t.stateSize)?e.push(...t.stateSize):e.push(t.stateSize);return e}call(e,t){return R(()=>{e=e;let n=e.slice(1),r=[];for(let e of this.cells.slice().reverse())Array.isArray(e.stateSize)?r.push(n.splice(0,e.stateSize.length)):r.push(n.splice(0,1));r.reverse();let i=[],a;for(let o=0;o<this.cells.length;++o){let s=this.cells[o];n=r[o],a=o===0?[e[0]].concat(n):[a[0]].concat(n),a=s.call(a,t),i.push(a.slice(1))}n=[];for(let e of i.slice().reverse())n.push(...e);return[a[0]].concat(n)})}build(e){db(e)&&(e=e[0]),e=e;let t;this.cells.forEach((n,r)=>{iy(`RNNCell_${r}`,()=>{n.build(e),t=Array.isArray(n.stateSize)?n.stateSize[0]:n.stateSize,e=[e[0],t]})}),this.built=!0}getConfig(){let e=super.getConfig(),t={cells:this.cells.map(e=>({className:e.getClassName(),config:e.getConfig()}))};return Object.assign(Object.assign({},e),t)}static fromConfig(e,t,n={}){let r=[];for(let e of t.cells)r.push(ux(e,n));return new e({cells:r})}get trainableWeights(){if(!this.trainable)return[];let e=[];for(let t of this.cells)e.push(...t.trainableWeights);return e}get nonTrainableWeights(){let e=[];for(let t of this.cells)e.push(...t.nonTrainableWeights);if(!this.trainable){let t=[];for(let e of this.cells)t.push(...e.trainableWeights);return t.concat(e)}return e}getWeights(){let e=[];for(let t of this.cells)e.push(...t.weights);return vb(e)}setWeights(e){let t=[];for(let n of this.cells){let r=n.weights.length,i=e.splice(r);for(let e=0;e<n.weights.length;++e)t.push([n.weights[e],i[e]])}yb(t)}};ZC.className=`StackedRNNCells`,q(ZC);function QC(e){let{ones:t,rate:n,training:r=!1,count:i=1,dropoutFunc:a}=e,o=()=>a==null?Ly(t(),n):a(t(),n),s=()=>zy(o,t,r);return!i||i<=1?Ea(s().clone()):Array(i).fill(void 0).map(s).map(e=>Ea(e.clone()))}var $C=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n},ew=class extends UC{constructor(e){if(e.unroll)throw new vv(`Unrolling is not possible with convolutional RNNs.`);if(Array.isArray(e.cell))throw new vv(`It is not possible at the moment to stack convolutional cells.`);super(e),this.inputSpec=[new bb({ndim:5})]}call(e,t){return R(()=>{if(this.cell.dropoutMask!=null&&(Ta(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(Ta(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null),t&&t.constants)throw new J(`ConvRNN2D cell does not support constants`);let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;return super.call(e,{mask:n,training:r,initialState:i})})}computeOutputShape(e){let t=this.computeSingleOutputShape(e);return this.returnSequences||(t=[t[0],...t.slice(2)]),this.returnState&&(t=[t,...[,,].fill([e[0],...t.slice(-3)])]),t}getInitialState(e){return R(()=>{let{stateSize:t}=this.cell,n=e.shape,r=this.computeSingleOutputShape(n),i=Hu([r[0],...r.slice(2)]);return Array.isArray(t)?Array(t.length).fill(i):[i]})}resetStates(e,t=!1){R(()=>{if(!this.stateful)throw new gv(`Cannot call resetStates() on an RNN Layer that is not stateful.`);let n=this.inputSpec[0].shape,r=this.computeSingleOutputShape(n),i=[r[0],...r.slice(2)];if(n[0]==null)throw new J("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(this.getStates()==null)Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(()=>Hu(i)):this.states_=[Hu(i)];else if(e==null)Ta(this.states_),this.keptStates!=null&&(Ta(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(()=>Hu(i)):this.states_[0]=Hu(i);else{if(Array.isArray(e)||(e=[e]),e.length!==this.states_.length)throw new J(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${e.length} state value(s). Input received: ${e}`);t?this.keptStates.push(this.states_.slice()):Ta(this.states_);for(let t=0;t<this.states_.length;++t){let n=e[t],r=i;if(!A(n.shape,r))throw new J(`State ${t} is incompatible with layer ${this.name}: expected shape=${r}, received shape=${n.shape}`);this.states_[t]=n}}this.states_=this.states_.map(e=>Ea(e.clone()))})}computeSingleOutputShape(e){let{dataFormat:t,filters:n,kernelSize:r,padding:i,strides:a,dilationRate:o}=this.cell,s=t===`channelsFirst`,c=e[s?3:2],l=e[s?4:3],u=xC(c,r[0],i,a[0],o[0]),d=xC(l,r[1],i,a[1],o[1]);return[...e.slice(0,2),...s?[n,u,d]:[u,d,n]]}};ew.className=`ConvRNN2D`;var tw=class extends YC{constructor(e){let{filters:t,kernelSize:n,strides:r,padding:i,dataFormat:a,dilationRate:o}=e;super(Object.assign(Object.assign({},e),{units:t})),this.filters=t,Rv(this.filters,`filters`),this.kernelSize=bC(n,2,`kernelSize`),this.kernelSize.forEach(e=>Rv(e,`kernelSize`)),this.strides=bC(r||1,2,`strides`),this.strides.forEach(e=>Rv(e,`strides`)),this.padding=i||`valid`,ey(this.padding),this.dataFormat=a||`channelsLast`,Qv(this.dataFormat),this.dilationRate=bC(o||1,2,`dilationRate`),this.dilationRate.forEach(e=>Rv(e,`dilationRate`))}build(e){var t;e=pb(e);let n=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[n]==null)throw new J(`The channel dimension of the input should be defined. Found ${e[n]}`);let r=e[n],i=this.kernelSize.concat([r,this.filters*4]);this.kernel=this.addWeight(`kernel`,i,null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint);let a=this.kernelSize.concat([this.filters,this.filters*4]);if(this.recurrentKernel=this.addWeight(`recurrent_kernel`,a,null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias){let e;if(this.unitForgetBias){let n=this.biasInitializer,r=this.filters;e=new(t=class extends Wy{apply(e,t){return Ey([n.apply([r]),Uu([r]),n.apply([r*2])])}},t.className=`CustomInit`,t)}else e=this.biasInitializer;this.bias=this.addWeight(`bias`,[this.filters*4],null,e,this.biasRegularizer,!0,this.biasConstraint)}this.built=!0}call(e,t){return R(()=>{if(e.length!==3)throw new J(`ConvLSTM2DCell expects 3 input Tensors (inputs, h, c), got ${e.length}.`);let n=t.training||!1,r=e[0],i=e[1],a=e[2];0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=QC({ones:()=>rd(r),rate:this.dropout,training:n,count:4,dropoutFunc:this.dropoutFunc}));let o=this.dropoutMask,s=(e,t,n)=>!t||!t[n]?e:H(t[n],e),c=s(r,o,0),l=s(r,o,1),u=s(r,o,2),d=s(r,o,3);0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=QC({ones:()=>rd(i),rate:this.recurrentDropout,training:n,count:4,dropoutFunc:this.dropoutFunc}));let f=this.recurrentDropoutMask,p=s(i,f,0),m=s(i,f,1),h=s(i,f,2),g=s(i,f,3),[_,v,y,b]=yf(this.kernel.read(),4,3),[x,S,C,w]=this.useBias?yf(this.bias.read(),4):[null,null,null,null];c=this.inputConv(c,_,x,this.padding),l=this.inputConv(l,v,S,this.padding),u=this.inputConv(u,y,C,this.padding),d=this.inputConv(d,b,w,this.padding);let[T,E,D,O]=yf(this.recurrentKernel.read(),4,3);p=this.recurrentConv(p,T),m=this.recurrentConv(m,E),h=this.recurrentConv(h,D),g=this.recurrentConv(g,O);let ee=this.recurrentActivation.apply(B(c,p)),te=B(H(this.recurrentActivation.apply(B(l,m)),a),H(ee,this.activation.apply(B(u,h)))),k=H(this.recurrentActivation.apply(B(d,g)),this.activation.apply(te));return[k,k,te]})}getConfig(){let e=super.getConfig(),{units:t}=e,n=$C(e,[`units`]),r={filters:this.filters,kernelSize:this.kernelSize,padding:this.padding,dataFormat:this.dataFormat,dilationRate:this.dilationRate,strides:this.strides};return Object.assign(Object.assign({},n),r)}inputConv(e,t,n,r){let i=dc(e,t,this.strides,r||`valid`,this.dataFormat===`channelsFirst`?`NCHW`:`NHWC`,this.dilationRate);return n?Py(i,n,this.dataFormat):i}recurrentConv(e,t){return dc(e,t,1,`same`,this.dataFormat===`channelsFirst`?`NCHW`:`NHWC`)}};tw.className=`ConvLSTM2DCell`,q(tw);var nw=class extends ew{constructor(e){let t=new tw(e);super(Object.assign(Object.assign({},e),{cell:t}))}static fromConfig(e,t){return new e(t)}};nw.className=`ConvLSTM2D`,q(nw);var rw=class extends Tb{constructor(e){super(e),this.rate=Math.max(Math.min(e.rate,1),0),this.noiseShape=e.noiseShape,this.seed=e.seed,this.supportsMasking=!0}getNoiseShape(e){if(this.noiseShape==null)return this.noiseShape;let t=e.shape,n=[];for(let e=0;e<this.noiseShape.length;++e)n.push(this.noiseShape[e]==null?t[e]:this.noiseShape[e]);return n}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e);if(0<this.rate&&this.rate<1){let e=t.training==null?!1:t.training,r=this.getNoiseShape(n);return zy(()=>Ly(n,this.rate,r,this.seed),()=>n,e)}return e})}getConfig(){let e={rate:this.rate,noiseShape:this.noiseShape,seed:this.seed},t=super.getConfig();return Object.assign(e,t),e}dispose(){return super.dispose()}};rw.className=`Dropout`,q(rw);var iw=class extends rw{constructor(e){super(e),this.inputSpec=[{ndim:3}]}getNoiseShape(e){let t=e.shape;return[t[0],1,t[2]]}};iw.className=`SpatialDropout1D`,q(iw);var aw=class extends Tb{constructor(e){if(super(e),this.activation=null,this.useBias=!0,this.kernel=null,this.bias=null,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,e.batchInputShape==null&&e.inputShape==null&&e.inputDim!=null){let t=null;e.batchSize!=null&&(t=e.batchSize),this.batchInputShape=[t,e.inputDim]}this.units=e.units,Rv(this.units,`units`),this.activation=oC(e.activation),e.useBias!=null&&(this.useBias=e.useBias),this.kernelInitializer=ub(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.biasInitializer=ub(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelConstraint=Qb(e.kernelConstraint),this.biasConstraint=Qb(e.biasConstraint),this.kernelRegularizer=pC(e.kernelRegularizer),this.biasRegularizer=pC(e.biasRegularizer),this.activityRegularizer=pC(e.activityRegularizer),this.supportsMasking=!0,this.inputSpec=[{minNDim:2}]}build(e){e=pb(e);let t=e[e.length-1];this.kernel==null&&(this.kernel=this.addWeight(`kernel`,[t,this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight(`bias`,[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint))),this.inputSpec=[{minNDim:2,axes:{[-1]:t}}],this.built=!0}computeOutputShape(e){e=pb(e);let t=e.slice();return t[t.length-1]=this.units,t}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e),r=Vv(this.activation.getClassName()),i;return r==null?(i=Ay(n,this.kernel.read()),this.bias!=null&&(i=Py(i,this.bias.read())),this.activation!=null&&(i=this.activation.apply(i))):i=Ay(n,this.kernel.read(),r,this.bias?this.bias.read():null),i})}getConfig(){let e={units:this.units,activation:iC(this.activation),useBias:this.useBias,kernelInitializer:lb(this.kernelInitializer),biasInitializer:lb(this.biasInitializer),kernelRegularizer:dC(this.kernelRegularizer),biasRegularizer:dC(this.biasRegularizer),activityRegularizer:dC(this.activityRegularizer),kernelConstraint:Xb(this.kernelConstraint),biasConstraint:Xb(this.biasConstraint)},t=super.getConfig();return Object.assign(e,t),e}};aw.className=`Dense`,q(aw);var ow=class extends Tb{constructor(e){e=e||{},super(e),this.inputSpec=[{minNDim:3}],this.dataFormat=e.dataFormat}computeOutputShape(e){e=pb(e);for(let t of e.slice(1))if(t==null)throw new J(`The shape of the input to "Flatten" is not fully defined (got ${e.slice(1)}). Make sure to pass a complete "input_shape" or "batch_input_shape" argument to the first layer in your model.`);return[e[0],dy(e,1)]}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e);if(this.dataFormat===`channelsFirst`&&n.rank>1){let e=[0];for(let t=2;t<n.rank;++t)e.push(t);e.push(1),n=Qf(n,e)}return Sy(n)})}getConfig(){let e={};this.dataFormat!=null&&(e.dataFormat=this.dataFormat);let t=super.getConfig();return Object.assign(e,t),e}};ow.className=`Flatten`,q(ow);var sw=class extends Tb{constructor(e){super(e),this.supportsMasking=!0,this.activation=oC(e.activation)}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e);return this.activation.apply(n)})}getConfig(){let e={activation:iC(this.activation)},t=super.getConfig();return Object.assign(e,t),e}};sw.className=`Activation`,q(sw);var cw=class extends Tb{constructor(e){super(e),this.n=e.n,this.inputSpec=[{ndim:2}]}computeOutputShape(e){return[e[0],this.n,e[1]]}call(e,t){return R(()=>(e=Y(e),by(e,this.n)))}getConfig(){let e={n:this.n},t=super.getConfig();return Object.assign(e,t),e}};cw.className=`RepeatVector`,q(cw);var lw=class extends Tb{constructor(e){super(e),this.targetShape=e.targetShape;for(let e=0;e<this.targetShape.length;++e)this.isUnknown(this.targetShape[e])&&(this.targetShape[e]=null)}isUnknown(e){return e<0||e==null}fixUnknownDimension(e,t){let n=`Total size of new array must be unchanged.`,r=t.slice(),i=1,a=null;for(let e=0;e<r.length;++e){let t=r[e];if(this.isUnknown(t))if(a===null)a=e;else throw new J(`Can only specifiy one unknown dimension.`);else i*=t}let o=dy(e);if(a!==null){if(i===0||o%i!==0)throw new J(n);r[a]=o/i}else if(o!==i)throw new J(n);return r}computeOutputShape(e){let t=!1;for(let n=0;n<e.length;++n)if(this.isUnknown(e[n])){t=!0;break}return t?e.slice(0,1).concat(this.targetShape):e.slice(0,1).concat(this.fixUnknownDimension(e.slice(1),this.targetShape))}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e),r=n.shape;return U(n,r.slice(0,1).concat(this.fixUnknownDimension(r.slice(1),this.targetShape)))})}getConfig(){let e={targetShape:this.targetShape},t=super.getConfig();return Object.assign(e,t),e}};lw.className=`Reshape`,q(lw);var uw=class extends Tb{constructor(e){if(super(e),e.dims==null)throw Error("Required configuration field `dims` is missing during Permute constructor call.");if(!Array.isArray(e.dims))throw Error(`Permute constructor requires \`dims\` to be an Array, but received ${e.dims} instead.`);let t=my(1,e.dims.length+1);if(!A(e.dims.slice().sort(),t))throw Error("Invalid permutation `dims`: "+JSON.stringify(e.dims)+" `dims` must contain consecutive integers starting from 1.");this.dims=e.dims,this.dimsIncludingBatch=[0].concat(this.dims),this.inputSpec=[new bb({ndim:this.dims.length+1})]}computeOutputShape(e){e=pb(e);let t=e.slice();return this.dims.forEach((n,r)=>{t[r+1]=e[n]}),t}call(e,t){return Qf(Y(e),this.dimsIncludingBatch)}getConfig(){let e={dims:this.dims},t=super.getConfig();return Object.assign(e,t),e}};uw.className=`Permute`,q(uw);var dw=class extends Tb{constructor(e){super(e==null?{}:e),this.supportsMasking=!0,e==null?this.maskValue=0:this.maskValue=e.maskValue==null?0:e.maskValue}computeOutputShape(e){return e}getConfig(){let e=super.getConfig(),t={maskValue:this.maskValue};return Object.assign(t,e),t}computeMask(e,t){return Vo($u(Y(e),this.maskValue),-1)}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e);return H(n,z(Vo($u(n,this.maskValue),-1,!0),n.dtype))})}};dw.className=`Masking`,q(dw);var fw=class extends Tb{constructor(e){if(super(e),this.embeddings=null,this.DEFAULT_EMBEDDINGS_INITIALIZER=`randomUniform`,e.batchInputShape==null&&e.inputShape==null){let t=null;e.batchSize!=null&&(t=e.batchSize),e.inputLength==null?this.batchInputShape=[t,null]:this.batchInputShape=[t].concat(Tv(e.inputLength))}this.inputDim=e.inputDim,Rv(this.inputDim,`inputDim`),this.outputDim=e.outputDim,Rv(this.outputDim,`outputDim`),this.embeddingsInitializer=ub(e.embeddingsInitializer||this.DEFAULT_EMBEDDINGS_INITIALIZER),this.embeddingsRegularizer=pC(e.embeddingsRegularizer),this.activityRegularizer=pC(e.activityRegularizer),this.embeddingsConstraint=Qb(e.embeddingsConstraint),this.maskZero=e.maskZero,this.supportsMasking=e.maskZero,this.inputLength=e.inputLength}build(e){this.embeddings=this.addWeight(`embeddings`,[this.inputDim,this.outputDim],this.dtype,this.embeddingsInitializer,this.embeddingsRegularizer,!0,this.embeddingsConstraint),this.built=!0}warnOnIncompatibleInputShape(e){}computeMask(e,t){return R(()=>this.maskZero?(e=Y(e),$u(e,qc(e))):null)}computeOutputShape(e){if(e=pb(e),this.inputLength==null)return[...e,this.outputDim];let t=Tv(this.inputLength);if(t.length!==e.length-1)throw new J(`"inputLength" is ${this.inputLength}, but received input shape has shape ${e}`);{let n=0;for(let r=0;r<t.length;++r){let i=t[r],a=e[r+1];if(i!=null&&a!=null&&i!==a)throw new J(`"inputLength" is ${this.inputLength}, but received input shape has shape ${e}`);i==null&&(t[n]=a),n++}}return[e[0],...t,this.outputDim]}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e);return n.dtype!==`int32`&&(n=vy(n,`int32`)),U(jy(this.embeddings.read(),U(n,[n.size])),pb(this.computeOutputShape(n.shape)))})}getConfig(){let e={inputDim:this.inputDim,outputDim:this.outputDim,embeddingsInitializer:lb(this.embeddingsInitializer),embeddingsRegularizer:dC(this.embeddingsRegularizer),activityRegularizer:dC(this.activityRegularizer),embeddingsConstraint:Xb(this.embeddingsConstraint),maskZero:this.maskZero,inputLength:this.inputLength},t=super.getConfig();return Object.assign(e,t),e}};fw.className=`Embedding`,q(fw);var pw=class extends Tb{constructor(e){super(e||{}),this.supportsMasking=!0}mergeFunction(e){throw new vv}computeElementwiseOpOutputShape(e,t){if(e==null||t==null)return null;if(e.length<t.length)return this.computeElementwiseOpOutputShape(t,e);if(t.length===0)return e;let n=e.slice(0,e.length-t.length);for(let r=0;r<t.length;++r){let i=e[e.length-t.length+r],a=t[r];if(i==null||a==null||i<0||a<0)n.push(null);else if(i===1)n.push(a);else if(a===1)n.push(i);else{if(i!==a)throw new J(`Operands could not be broadcast together with shapes `+JSON.stringify(e)+` `+JSON.stringify(t));n.push(i)}}return n}build(e){if(Array.isArray(e)&&!Array.isArray(e[0])&&(e=[pb(e)]),e=e,e.length<2)throw new J(`A merge layer should be called on an Array of at least 2 inputs. Got ${e.length} input(s).`);let t=[];for(let n of e)n!=null&&n[0]!==null&&t.push(n[0]);if(t=Pv(t),t.length>1)throw new J(`Can not merge tensors with different batch sizes. Got tensors with shapes: ${JSON.stringify(e)}.`);let n=e[0]==null?null:e[0].slice(1);for(let t=1;t<e.length;++t){let r=e[t]==null?null:e[t].slice(1);n=this.computeElementwiseOpOutputShape(n,r)}let r=e.map(e=>e.length);e.indexOf(null)===-1&&Pv(r).length===1?this.reshapeRequired=!1:this.reshapeRequired=!0}call(e,t){return R(()=>{if(e=e,this.reshapeRequired){let t=[],n=e.map(e=>e.rank);if(n.indexOf(null)===-1){let r=py(n);for(let n of e){let e=n.rank;for(let t=0;t<r-e;++t)n=yy(n,1);t.push(n)}return this.mergeFunction(t)}else{let n=!1;for(let r of e){let e=r.rank;if(e==null){let e=r.shape,i=e[0],a=e.slice(1).concat([i]),o=U(r,[i].concat(dy(e.slice(1))));o=Qf(o,[1,0]),o=U(o,a),t.push(o),n=!0}else if(e>1){let i=my(1,e).concat([0]);t.push(Qf(r,i)),n=!0}else t.push(r)}let r=this.mergeFunction(t),i=r.rank;if(n){if(i==null){let e=r.shape,t=e[e.length-1],n=[t].concat(e.slice(0,e.length-1));r=U(Qf(U(r,[-1,t]),[1,0]),n)}else if(i>1){let e=[i-1].concat(my(0,i-1));r=Qf(r,e)}}return r}}else return this.mergeFunction(e)})}computeOutputShape(e){e=e;let t;t=e[0]==null?null:e[0].slice(1);for(let n=1;n<e.length;++n){let r=e[n]==null?null:e[n].slice(1);t=this.computeElementwiseOpOutputShape(t,r)}let n=[];for(let t of e)t!=null&&t[0]!==null&&n.push(t[0]);return n=Pv(n),t=n.length===1?n.concat(t):[null].concat(t),t}computeMask(e,t){return R(()=>{if(t==null)return null;if(!Array.isArray(t))throw new J("`mask` should be an Array");if(!Array.isArray(e))throw new J("`inputs` should be an Array");if(t.length!==e.length)throw new J(`The Array 'inputs' and 'mask' are expected to have the same length, but have different lengths (${e.length} vs ${t.length})`);if(t.every(e=>e==null))return null;t=t.map(e=>e==null?e:Ml(e,0));let n=t[0];for(let e=1;e<t.length-1;++e)n=Du(n,t[e]);return n})}},mw=class extends pw{constructor(e){super(e)}mergeFunction(e){return R(()=>{let t=e[0].clone();for(let n=1;n<e.length;++n)t=B(t,e[n]);return t})}};mw.className=`Add`,q(mw);var hw=class extends pw{constructor(e){super(e)}mergeFunction(e){return R(()=>{let t=e[0].clone();for(let n=1;n<e.length;++n)t=H(t,e[n]);return t})}};hw.className=`Multiply`,q(hw);var gw=class extends pw{constructor(e){super(e)}mergeFunction(e){return R(()=>{let t=e[0].clone();for(let n=1;n<e.length;++n)t=B(t,e[n]);return H(1/e.length,t)})}};gw.className=`Average`,q(gw);var _w=class extends pw{constructor(e){super(e)}mergeFunction(e){return R(()=>{let t=e[0];for(let n=1;n<e.length;++n)t=zu(t,e[n]);return t})}};_w.className=`Maximum`,q(_w);var vw=class extends pw{constructor(e){super(e)}mergeFunction(e){return R(()=>{let t=e[0];for(let n=1;n<e.length;++n)t=Gu(t,e[n]);return t})}};vw.className=`Minimum`,q(vw);var yw=class extends pw{constructor(e){super(e),this.DEFAULT_AXIS=-1,e==null&&(e={}),this.axis=e.axis==null?this.DEFAULT_AXIS:e.axis,this.supportsMasking=!0,this.reshapeRequired=!1}build(e){if(!(Array.isArray(e)&&Array.isArray(e[0]))||e.length===1)throw new J("A `Concatenate` layer should be called on a list of at least 2 inputs");e=e;let t=!0;for(let n of e)if(n!=null){t=!1;break}if(t)return;let n=[];for(let t=0;t<e.length;++t){let r=e[t].slice();r.splice(this.axis,1);let i=!1;for(let e of n)if(A(e,r)){i=!0;break}i||n.push(r)}if(n.length>1)throw new J("A `Concatenate` layer requires inputs with matching shapes except for the concat axis. Got input shapes: "+JSON.stringify(e))}mergeFunction(e){return R(()=>Ey(e,this.axis))}computeOutputShape(e){if(!(Array.isArray(e)&&Array.isArray(e[0])))throw new J("A `Concatenate` layer should be called on a list of inputs.");let t=e,n=t[0].slice(),r=this.axis<0?n.length+this.axis:this.axis;for(let e of t.slice(1)){if(n[r]==null||e[r]==null){n[r]=null;break}n[r]+=e[r]}return n}computeMask(e,t){if(t==null)return null;if(!Array.isArray(t))throw new J("`mask` should be an array for Concatenate");if(!Array.isArray(e))throw new J("`inputs` should be an array for Concatenate");if(t.length!==e.length)throw new J(`Mismatch in the length of mask (${t.length}) and the legnth of inputs (${e.length})`);return R(()=>{let n=!0;if(t.forEach(e=>{if(e!=null){n=!1;return}}),n)return null;let r=[];for(let n=0;n<e.length;++n)t[n]==null?r.push(z(rd(e[n]),`bool`)):t[n].rank<e[n].rank?r.push(Ml(t[n],-1)):r.push(t[n]);return zo(Ds(r,this.axis),-1,!1)})}getConfig(){let e={axis:this.axis},t=super.getConfig();return Object.assign(e,t),e}};yw.className=`Concatenate`,q(yw);function bw(e,t){for(;e<0;)e+=t;return e}function xw(e,t,n){if(e.shape.length>3||t.shape.length>3)throw new vv(`batchDot is not implemented for tensors of 4D or higher rank yet`);if(O(e.shape.length>=2,()=>`batchDot requires the rank of x to be >= 2, but got ${e.shape.length}`),O(e.shape.length>=2,()=>`batchDot requires the rank of y to be >= 2, but got ${t.shape.length}`),typeof n==`number`&&(n=[n,n]),e.dtype===`complex64`||t.dtype===`complex64`)throw new vv(`batchDot is not implemented for complex64-type Tensors yet.`);let r=e.shape.length,i=t.shape.length;n==null&&(n=[r-1,i-2]);let a=n;return R(()=>{let n;if(r>i){n=r-i;let e=[];for(let t=0;t<n;++t)e.push(1);t=U(t,t.shape.concat(e))}else if(i>r){n=i-r;let t=[];for(let e=0;e<n;++e)t.push(1);e=U(e,e.shape.concat(t))}else n=0;let o;if(e.shape.length===2&&t.shape.length===2)o=a[0]===a[1]?G(H(e,t),a[0]):G(H(Qf(e,[1,0]),t),a[1]);else{let n=a[0]!==e.shape.length-1,r=a[1]===t.shape.length-1;o=ks(e,t,n,r)}if(n>0){let e;e=r>i?r+i-3:r-1;let t=[];for(let r=e;r<e+n;++r)t.push(r);o=Tf(o,t)}return o.shape.length===1&&(o=Ml(o,1)),o})}var Sw=class extends pw{constructor(e){super(e),this.axes=e.axes,this.normalize=e.normalize==null?!1:e.normalize,this.supportsMasking=!0,this.reshapeRequired=!1}build(e){O(Array.isArray(e)&&e.length===2&&Array.isArray(e[0])&&Array.isArray(e[1]),()=>"A `Dot` layer should be called on a list of exactly 2 inputs.");let t=e[0],n=e[1];if(t.length>3||n.length>3)throw new vv(`Dot layer does not support tensors of 4D or higher rank yet.`);let r=this.interpretAxes(t,n);if(t[r[0]]!==n[r[1]])throw new J(`Dimension incompatibility: ${t[r[0]]} !== ${n[r[1]]}`)}mergeFunction(e){if(e.length!==2)throw new J(`A \`Dot\` layer must be called on exactly 2 inputs, but received ${e.length} input(s).`);let t=e[0],n=e[1],r;return r=Array.isArray(this.axes)?this.axes.map((t,n)=>bw(t,e[n].shape.length)):[bw(this.axes,t.shape.length),bw(this.axes,n.shape.length)],this.normalize&&(t=dx(t,r[0]),n=dx(n,r[1])),xw(t,n,r)}interpretAxes(e,t){let n;return n=Array.isArray(this.axes)?this.axes:[bw(this.axes,e.length),bw(this.axes,t.length)],n}computeOutputShape(e){O(Array.isArray(e)&&e.length===2&&Array.isArray(e[0])&&Array.isArray(e[1]),()=>"A `Dot` layer should be called on a list of exactly 2 inputs.");let t=e[0].slice(),n=e[1].slice();if(t.length>3||n.length>3)throw new vv(`Dot layer does not support tensors of 4D or higher rank yet.`);let r=this.interpretAxes(t,n);t.splice(r[0],1),n.splice(r[1],1),n.splice(0,1);let i=t.concat(n);return i.length===1&&i.push(1),i}computeMask(e,t){return null}getConfig(){let e={axes:this.axes,normalize:this.normalize},t=super.getConfig();return Object.assign(e,t),e}};Sw.className=`Dot`,q(Sw);var Cw=class extends Tb{constructor(e){super(e),this.supportsMasking=!0,this.stddev=e.stddev}computeOutputShape(e){return e}getConfig(){let e=super.getConfig(),t={stddev:this.stddev};return Object.assign(t,e),t}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e);return zy(()=>B(ky(n.shape,0,this.stddev),n),()=>n,t.training||!1)})}};Cw.className=`GaussianNoise`,q(Cw);var ww=class extends Tb{constructor(e){super(e),this.supportsMasking=!0,this.rate=e.rate}computeOutputShape(e){return e}getConfig(){let e=super.getConfig(),t={rate:this.rate};return Object.assign(t,e),t}call(e,t){return R(()=>{this.invokeCallHook(e,t);let n=Y(e);return this.rate>0&&this.rate<1?zy(()=>{let e=Math.sqrt(this.rate/(1-this.rate));return H(n,ky(n.shape,1,e))},()=>n,t.training||!1):n})}};ww.className=`GaussianDropout`,q(ww);var Tw=class extends Tb{constructor(e){super(e),this.supportsMasking=!0,this.rate=e.rate,this.noiseShape=e.noiseShape}_getNoiseShape(e){return this.noiseShape||Y(e).shape}computeOutputShape(e){return e}getConfig(){let e=super.getConfig(),t={rate:this.rate};return Object.assign(t,e),t}call(e,t){return R(()=>{if(this.rate<1&&this.rate>0){let n=this._getNoiseShape(e);return zy(()=>{let t=Y(e),r=-1.6732632423543772*1.0507009873554805,i=Kl(kd(n),this.rate);i=vy(i,`float32`);let a=((1-this.rate)*(1+this.rate*r**2))**-.5,o=-a*r*this.rate;return B(H(B(H(t,i),H(B(i,-1),r)),a),o)},()=>Y(e),t.training||!1)}return e})}};Tw.className=`AlphaDropout`,q(Tw);function Ew(e,t,n,r,i,a=.001){let o;if(e.rank===2)o=Hs(e,t,n,r,i,a);else if(e.rank===3)o=Ws(e,t,n,r,i,a);else if(e.rank===4)o=Ks(e,t,n,r,i,a);else throw new vv(`batchNormalization is not implemented for array of rank ${e.rank} yet`);return o}function Dw(e,t,n,r,i=.001){return R(()=>{let a=Zu(e,r),o=a.mean,s=a.variance;return[Ew(e,o,s,n,t,i),o,s]})}function Ow(e,t,n,r,i=.001){return R(()=>{let a=Zu(e,r),o=a.mean,s=a.variance,c=[];for(let t of my(0,e.rank))r.indexOf(t)===-1?c.push(e.shape[t]):c.push(1);let l=U(o,c),u=U(s,c),d=t==null?null:U(t,c);return[Ew(e,l,u,n==null?null:U(n,c),d,i),o,s]})}function kw(e,t,n,r,i=.001){return A(r.slice().sort(),my(0,e.rank-1))?Dw(e,t,n,r,i):Ow(e,t,n,r,i)}var Aw=class extends Tb{constructor(e){e==null&&(e={}),super(e),this.supportsMasking=!0,this.axis=e.axis==null?-1:e.axis,this.momentum=e.momentum==null?.99:e.momentum,this.epsilon=e.epsilon==null?.001:e.epsilon,this.center=e.center==null?!0:e.center,this.scale=e.scale==null?!0:e.scale,this.betaInitializer=ub(e.betaInitializer||`zeros`),this.gammaInitializer=ub(e.gammaInitializer||`ones`),this.movingMeanInitializer=ub(e.movingMeanInitializer||`zeros`),this.movingVarianceInitializer=ub(e.movingVarianceInitializer||`ones`),this.betaConstraint=Qb(e.betaConstraint),this.gammaConstraint=Qb(e.gammaConstraint),this.betaRegularizer=pC(e.betaRegularizer),this.gammaRegularizer=pC(e.gammaRegularizer)}build(e){e=pb(e);let t=this.axis>=0?this.axis:this.axis+e.length,n=e[t];if(n==null)throw new J(`Axis ${t} of input tensor should have a defined dimension but the layer received an input with shape ${JSON.stringify(e)}.`);this.inputSpec=[new bb({ndim:e.length,axes:{[t]:n}})];let r=[n];this.scale&&(this.gamma=this.addWeight(`gamma`,r,null,this.gammaInitializer,this.gammaRegularizer,!0,this.gammaConstraint)),this.center&&(this.beta=this.addWeight(`beta`,r,null,this.betaInitializer,this.betaRegularizer,!0,this.betaConstraint)),this.movingMean=this.addWeight(`moving_mean`,r,null,this.movingMeanInitializer,null,!1),this.movingVariance=this.addWeight(`moving_variance`,r,null,this.movingVarianceInitializer,null,!1),this.built=!0}call(e,t){return R(()=>{let n=t.training==null?!1:t.training,r=Y(e),i=r.shape,a=i.length,o=my(0,a),s=this.axis>=0?this.axis:this.axis+a;o.splice(s,1);let c=xv(1,a);c[s]=i[s];let l=o.slice();l.sort();let u=!A(l,my(0,a).slice(0,a-1)),d=()=>u?Ew(r,U(this.movingMean.read(),c),U(this.movingVariance.read(),c),this.center?U(this.beta.read(),c):null,this.scale?U(this.gamma.read(),c):null,this.epsilon):Ew(r,this.movingMean.read(),this.movingVariance.read(),this.beta==null?null:this.beta.read(),this.gamma==null?null:this.gamma.read(),this.epsilon);if(!n)return d();let[f,p,m]=kw(r,this.gamma.read(),this.beta.read(),o,this.epsilon),h=(e,t,n)=>{R(()=>{let r=1-n,i=e.read(),a=H(K(i,t),r);e.write(K(i,a))})};return h(this.movingMean,p,this.momentum),h(this.movingVariance,m,this.momentum),f})}getConfig(){let e={axis:this.axis,momentum:this.momentum,epsilon:this.epsilon,center:this.center,scale:this.scale,betaInitializer:lb(this.betaInitializer),gammaInitializer:lb(this.gammaInitializer),movingMeanInitializer:lb(this.movingMeanInitializer),movingVarianceInitializer:lb(this.movingVarianceInitializer),betaRegularizer:dC(this.betaRegularizer),gammaRegularizer:dC(this.gammaRegularizer),betaConstraint:Xb(this.betaConstraint),gammaConstraint:Xb(this.gammaConstraint)},t=super.getConfig();return Object.assign(e,t),e}};Aw.className=`BatchNormalization`,q(Aw);var jw=class extends Tb{constructor(e){if(e==null&&(e={}),super(e),this.axis=e.axis==null?-1:e.axis,typeof this.axis==`number`){if(!Number.isInteger(this.axis))throw Error(`Expected axis to be an integer, but received ${this.axis}`)}else if(Array.isArray(this.axis)){for(let e of this.axis)if(!Number.isInteger(e))throw Error(`Expected axis to be an array of integers, but received ${JSON.stringify(this.axis)}`)}else throw Error(`Expected axis to be an integer or an array of integers, but received ${JSON.stringify(this.axis)}`);this.epsilon=e.epsilon==null?.001:e.epsilon,this.center=e.center==null?!0:e.center,this.scale=e.scale==null?!0:e.scale,this.betaInitializer=ub(e.betaInitializer||`zeros`),this.gammaInitializer=ub(e.gammaInitializer||`ones`),this.betaRegularizer=pC(e.betaRegularizer),this.gammaRegularizer=pC(e.gammaRegularizer),this.supportsMasking=!0}build(e){e=pb(e);let t=e.length;typeof this.axis==`number`&&(this.axis=[this.axis]);for(let e=0;e<this.axis.length;++e)this.axis[e]<0&&(this.axis[e]+=t);for(let e of this.axis)if(e<0||e>=t)throw Error(`Invalid axis: ${e}`);if(this.axis.length!==Pv(this.axis).length)throw Error(`Found duplicate axes in: ${this.axis}`);let n=this.axis.map(t=>e[t]);this.scale?this.gamma=this.addWeight(`gamma`,n,`float32`,this.gammaInitializer,this.gammaRegularizer,!0):this.gamma=null,this.center?this.beta=this.addWeight(`beta`,n,`float32`,this.betaInitializer,this.betaRegularizer,!0):this.beta=null,this.built=!0}call(e,t){let n=Y(e),r=n.shape,i=r.length;return R(()=>{let{mean:e,variance:t}=Zu(n,this.axis,!0),a=xv(1,i);for(let e of this.axis)a[e]=r[e];let o=e=>e!=null&&e.shape.length!==i?U(e,a):e,s=this.scale?o(this.gamma.read()):null,c=this.center?o(this.beta.read()):null,l=[],u=[];for(let e=0;e<i;++e)this.axis.indexOf(e)===-1?(l.push(1),u.push(r[e])):(l.push(r[e]),u.push(1));return e=Il(e,l),t=Il(t,l),s!=null&&(s=Il(s,u)),c!=null&&(c=Il(c,u)),Ew(n,e,t,c,s,this.epsilon)})}getConfig(){let e={axis:this.axis,epsilon:this.epsilon,center:this.center,scale:this.scale,betaInitializer:lb(this.betaInitializer),gammaInitializer:lb(this.gammaInitializer),betaRegularizer:dC(this.betaRegularizer),gammaRegularizer:dC(this.gammaRegularizer)},t=super.getConfig();return Object.assign(e,t),e}};jw.className=`LayerNormalization`,q(jw);function Mw(e,t,n){return R(()=>{if(e.rank!==4)throw new J(`temporalPadding expects input tensor to be 4-D, but received a ${e.rank}-D tensor.`);if(t==null&&(t=[[1,1],[1,1]]),t.length!==2||t[0].length!==2||t[1].length!==2)throw new J("spatial2dPadding expects `padding` to be an Array of two Arrays, each of which is an Array of two integers.");if(n==null&&(n=_y()),n!==`channelsLast`&&n!==`channelsFirst`)throw new J(`Unknown data format: ${n}. Supported data formats are 'channelsLast' and 'channelsFirst.`);let r;return r=n===`channelsFirst`?[[0,0],[0,0],t[0],t[1]]:[[0,0],t[0],t[1],[0,0]],ad(e,r)})}var Nw=class extends Tb{constructor(e){if(e==null&&(e={}),super(e),this.dataFormat=e.dataFormat==null?_y():e.dataFormat,e.padding==null)this.padding=[[1,1],[1,1]];else if(typeof e.padding==`number`)this.padding=[[e.padding,e.padding],[e.padding,e.padding]];else{if(e.padding=e.padding,e.padding.length!==2)throw new J(`ZeroPadding2D expects padding to be a length-2 array, but received a length-${e.padding.length} array.`);let t,n;if(typeof e.padding[0]==`number`)t=[e.padding[0],e.padding[0]],n=[e.padding[1],e.padding[1]];else{if(e.padding=e.padding,e.padding[0].length!==2)throw new J(`ZeroPadding2D expects height padding to be a length-2 array, but received a length-${e.padding[0].length} array.`);if(t=e.padding[0],e.padding[1].length!==2)throw new J(`ZeroPadding2D expects width padding to be a length-2 array, but received a length-${e.padding[1].length} array.`);n=e.padding[1]}this.padding=[t,n]}this.inputSpec=[new bb({ndim:4})]}computeOutputShape(e){e=pb(e);let t,n;return this.dataFormat===`channelsFirst`?(t=e[2]!=null&&e[2]>=0?e[2]+this.padding[0][0]+this.padding[0][1]:null,n=e[3]!=null&&e[3]>=0?e[3]+this.padding[1][0]+this.padding[1][1]:null,[e[0],e[1],t,n]):(t=e[1]!=null&&e[1]>=0?e[1]+this.padding[0][0]+this.padding[0][1]:null,n=e[2]!=null&&e[2]>=0?e[2]+this.padding[1][0]+this.padding[1][1]:null,[e[0],t,n,e[3]])}call(e,t){return R(()=>Mw(Y(e),this.padding,this.dataFormat))}getConfig(){let e={padding:this.padding,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}};Nw.className=`ZeroPadding2D`,q(Nw);function Pw(e,t,n,r,i,a){return R(()=>{Qv(i),ty(a),ey(r),n==null&&(n=[1,1]),r==null&&(r=`valid`),i==null&&(i=_y()),a==null&&(a=`max`),e=CC(e,i);let o,s=r===`same`?`same`:`valid`;return o=a===`max`?Fu(e,t,n,s):Cs(e,t,n,s),i===`channelsFirst`&&(o=Qf(o,[0,3,1,2])),o})}function Fw(e,t,n,r,i,a){return R(()=>{Qv(i),ty(a),ey(r),n==null&&(n=[1,1,1]),r==null&&(r=`valid`),i==null&&(i=_y()),a==null&&(a=`max`),e=wC(e,i);let o,s=r===`same`?`same`:`valid`;return o=a===`max`?Lu(e,t,n,s):Ts(e,t,n,s),i===`channelsFirst`&&(o=Qf(o,[0,4,1,2,3])),o})}var Iw=class extends Tb{constructor(e){if(e.poolSize==null&&(e.poolSize=2),super(e),typeof e.poolSize==`number`)this.poolSize=[e.poolSize];else if(Array.isArray(e.poolSize)&&e.poolSize.length===1&&typeof e.poolSize[0]==`number`)this.poolSize=e.poolSize;else throw new J(`poolSize for 1D convolutional layer must be a number or an Array of a single number, but received ${JSON.stringify(e.poolSize)}`);if(Rv(this.poolSize,`poolSize`),e.strides==null)this.strides=this.poolSize;else if(typeof e.strides==`number`)this.strides=[e.strides];else if(Array.isArray(e.strides)&&e.strides.length===1&&typeof e.strides[0]==`number`)this.strides=e.strides;else throw new J(`strides for 1D convolutional layer must be a number or an Array of a single number, but received ${JSON.stringify(e.strides)}`);Rv(this.strides,`strides`),this.padding=e.padding==null?`valid`:e.padding,ey(this.padding),this.inputSpec=[new bb({ndim:3})]}computeOutputShape(e){e=pb(e);let t=xC(e[1],this.poolSize[0],this.padding,this.strides[0]);return[e[0],t,e[2]]}call(e,t){return R(()=>(this.invokeCallHook(e,t),e=yy(Y(e),2),Tf(this.poolingFunction(Y(e),[this.poolSize[0],1],[this.strides[0],1],this.padding,`channelsLast`),[2])))}getConfig(){let e={poolSize:this.poolSize,padding:this.padding,strides:this.strides},t=super.getConfig();return Object.assign(e,t),e}},Lw=class extends Iw{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return Qv(i),ey(r),Pw(e,t,n,r,i,`max`)}};Lw.className=`MaxPooling1D`,q(Lw);var Rw=class extends Iw{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return Qv(i),ey(r),Pw(e,t,n,r,i,`avg`)}};Rw.className=`AveragePooling1D`,q(Rw);var zw=class extends Tb{constructor(e){if(e.poolSize==null&&(e.poolSize=[2,2]),super(e),this.poolSize=Array.isArray(e.poolSize)?e.poolSize:[e.poolSize,e.poolSize],e.strides==null)this.strides=this.poolSize;else if(Array.isArray(e.strides)){if(e.strides.length!==2)throw new J(`If the strides property of a 2D pooling layer is an Array, it is expected to have a length of 2, but received length ${e.strides.length}.`);this.strides=e.strides}else this.strides=[e.strides,e.strides];Rv(this.poolSize,`poolSize`),Rv(this.strides,`strides`),this.padding=e.padding==null?`valid`:e.padding,this.dataFormat=e.dataFormat==null?`channelsLast`:e.dataFormat,Qv(this.dataFormat),ey(this.padding),this.inputSpec=[new bb({ndim:4})]}computeOutputShape(e){e=pb(e);let t=this.dataFormat===`channelsFirst`?e[2]:e[1],n=this.dataFormat===`channelsFirst`?e[3]:e[2];return t=xC(t,this.poolSize[0],this.padding,this.strides[0]),n=xC(n,this.poolSize[1],this.padding,this.strides[1]),this.dataFormat===`channelsFirst`?[e[0],e[1],t,n]:[e[0],t,n,e[3]]}call(e,t){return R(()=>(this.invokeCallHook(e,t),this.poolingFunction(Y(e),this.poolSize,this.strides,this.padding,this.dataFormat)))}getConfig(){let e={poolSize:this.poolSize,padding:this.padding,strides:this.strides,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}},Bw=class extends zw{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return Qv(i),ey(r),Pw(e,t,n,r,i,`max`)}};Bw.className=`MaxPooling2D`,q(Bw);var Vw=class extends zw{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return Qv(i),ey(r),Pw(e,t,n,r,i,`avg`)}};Vw.className=`AveragePooling2D`,q(Vw);var Hw=class extends Tb{constructor(e){if(e.poolSize==null&&(e.poolSize=[2,2,2]),super(e),this.poolSize=Array.isArray(e.poolSize)?e.poolSize:[e.poolSize,e.poolSize,e.poolSize],e.strides==null)this.strides=this.poolSize;else if(Array.isArray(e.strides)){if(e.strides.length!==3)throw new J(`If the strides property of a 3D pooling layer is an Array, it is expected to have a length of 3, but received length ${e.strides.length}.`);this.strides=e.strides}else this.strides=[e.strides,e.strides,e.strides];Rv(this.poolSize,`poolSize`),Rv(this.strides,`strides`),this.padding=e.padding==null?`valid`:e.padding,this.dataFormat=e.dataFormat==null?`channelsLast`:e.dataFormat,Qv(this.dataFormat),ey(this.padding),this.inputSpec=[new bb({ndim:5})]}computeOutputShape(e){e=pb(e);let t=this.dataFormat===`channelsFirst`?e[2]:e[1],n=this.dataFormat===`channelsFirst`?e[3]:e[2],r=this.dataFormat===`channelsFirst`?e[4]:e[3];return t=xC(t,this.poolSize[0],this.padding,this.strides[0]),n=xC(n,this.poolSize[1],this.padding,this.strides[1]),r=xC(r,this.poolSize[2],this.padding,this.strides[2]),this.dataFormat===`channelsFirst`?[e[0],e[1],t,n,r]:[e[0],t,n,r,e[4]]}call(e,t){return R(()=>(this.invokeCallHook(e,t),this.poolingFunction(Y(e),this.poolSize,this.strides,this.padding,this.dataFormat)))}getConfig(){let e={poolSize:this.poolSize,padding:this.padding,strides:this.strides,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}},Uw=class extends Hw{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return Qv(i),ey(r),Fw(e,t,n,r,i,`max`)}};Uw.className=`MaxPooling3D`,q(Uw);var Ww=class extends Hw{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return Qv(i),ey(r),Fw(e,t,n,r,i,`avg`)}};Ww.className=`AveragePooling3D`,q(Ww);var Gw=class extends Tb{constructor(e){super(e),this.inputSpec=[new bb({ndim:3})]}computeOutputShape(e){return[e[0],e[2]]}call(e,t){throw new vv}},Kw=class extends Gw{constructor(e){super(e||{})}call(e,t){return R(()=>Vu(Y(e),1))}};Kw.className=`GlobalAveragePooling1D`,q(Kw);var qw=class extends Gw{constructor(e){super(e||{})}call(e,t){return R(()=>pl(Y(e),1))}};qw.className=`GlobalMaxPooling1D`,q(qw);var Jw=class extends Tb{constructor(e){super(e),this.dataFormat=e.dataFormat==null?`channelsLast`:e.dataFormat,Qv(this.dataFormat),this.inputSpec=[new bb({ndim:4})]}computeOutputShape(e){return e=e,this.dataFormat===`channelsLast`?[e[0],e[3]]:[e[0],e[1]]}call(e,t){throw new vv}getConfig(){let e={dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}},Yw=class extends Jw{call(e,t){return R(()=>{let t=Y(e);return this.dataFormat===`channelsLast`?Vu(t,[1,2]):Vu(t,[2,3])})}};Yw.className=`GlobalAveragePooling2D`,q(Yw);var Xw=class extends Jw{call(e,t){return R(()=>{let t=Y(e);return this.dataFormat===`channelsLast`?pl(t,[1,2]):pl(t,[2,3])})}};Xw.className=`GlobalMaxPooling2D`,q(Xw);var Zw=class extends Tb{constructor(e){super(e),this.layer=e.layer}build(e){this.built=!0}get trainable(){return this.layer==null?!1:this.layer.trainable}set trainable(e){this.layer!=null&&(this.layer.trainable=e)}get trainableWeights(){return this.layer.trainableWeights}get nonTrainableWeights(){return this.layer.nonTrainableWeights}get updates(){return this.layer._updates}get losses(){return this.layer.losses}getWeights(){return this.layer.getWeights()}setWeights(e){this.layer.setWeights(e)}getConfig(){let e={layer:{className:this.layer.getClassName(),config:this.layer.getConfig()}},t=super.getConfig();return Object.assign(e,t),e}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.layer!=null&&this.layer.setFastWeightInitDuringBuild(e)}static fromConfig(e,t,n={}){let r=t.layer,i=ux(r,n);delete t.layer;let a={layer:i};return Object.assign(a,t),new e(a)}},Qw=class extends Zw{constructor(e){super(e),this.supportsMasking=!0}build(e){if(e=pb(e),e.length<3)throw new J(`TimeDistributed layer expects an input shape >= 3D, but received input shape ${JSON.stringify(e)}`);this.inputSpec=[{shape:e}];let t=[e[0]].concat(e.slice(2));this.layer.built||(this.layer.build(t),this.layer.built=!0),super.build(e)}computeOutputShape(e){e=pb(e);let t=[e[0]].concat(e.slice(2)),n=this.layer.computeOutputShape(t),r=e[1];return[n[0],r].concat(n.slice(1))}call(e,t){return R(()=>(e=Y(e),HC((e,n)=>[Y(this.layer.call(e,t)),[]],e,[],!1,null,null,!1,!0)[1]))}};Qw.className=`TimeDistributed`,q(Qw);function $w(e){Iv(Xv,`BidirectionalMergeMode`,e)}var eT=`concat`,tT=class extends Zw{constructor(e){super(e);let t=e.layer.getConfig(),n={};n.className=e.layer.getClassName(),n.config=t,this.forwardLayer=ux(n),t.goBackwards=t.goBackwards!==!0;let r={};if(r.className=e.layer.getClassName(),r.config=t,this.backwardLayer=ux(r),this.forwardLayer.name=`forward_`+this.forwardLayer.name,this.backwardLayer.name=`backward_`+this.backwardLayer.name,this.mergeMode=e.mergeMode===void 0?eT:e.mergeMode,$w(this.mergeMode),e.weights)throw new vv(`weights support is not implemented for Bidirectional layer yet.`);this._stateful=e.layer.stateful,this.returnSequences=e.layer.returnSequences,this.returnState=e.layer.returnState,this.supportsMasking=!0,this._trainable=!0,this.inputSpec=e.layer.inputSpec,this.numConstants=null}get trainable(){return this._trainable}set trainable(e){this._trainable=e,this.forwardLayer!=null&&(this.forwardLayer.trainable=e),this.backwardLayer!=null&&(this.backwardLayer.trainable=e)}getWeights(){return this.forwardLayer.getWeights().concat(this.backwardLayer.getWeights())}setWeights(e){let t=e.length,n=Math.floor(t/2);this.forwardLayer.setWeights(e.slice(0,n)),this.backwardLayer.setWeights(e.slice(n))}computeOutputShape(e){let t=this.forwardLayer.computeOutputShape(e);Array.isArray(t)&&Array.isArray(t[0])||(t=[t]),t=t;let n,r,i;return this.returnState&&(i=t.slice(1)),n=t[0],n=n,this.mergeMode===`concat`?(n[n.length-1]*=2,r=[n]):r=this.mergeMode==null?[n,n.slice()]:[n],this.returnState?this.mergeMode==null?r.concat(i).concat(i.slice()):[n].concat(i,i.slice()):wv(r)}apply(e,t){let n=t==null?null:t.initialState,r=t==null?null:t.constants;t==null&&(t={});let i=VC(e,n,r,this.numConstants);if(e=i.inputs,n=i.initialState,r=i.constants,Array.isArray(e)&&(n=e.slice(1),e=e[0]),(n==null||n.length===0)&&r==null)return super.apply(e,t);let a=[],o=[];if(n!=null){let e=n.length;if(e%2>0)throw new J("When passing `initialState` to a Bidrectional RNN, the state should be an Array containing the states of the underlying RNNs.");t.initialState=n,a.push(...n);let r=n.map(e=>new bb({shape:e.shape}));this.forwardLayer.stateSpec=r.slice(0,e/2),this.backwardLayer.stateSpec=r.slice(e/2),o.push(...r)}if(r!=null)throw new vv(`Support for constants in Bidirectional layers is not implemented yet.`);let s=a[0]instanceof xb;for(let e of a)if(e instanceof xb!==s)throw new J(`The initial state of a Bidirectional layer cannot be specified as a mix of symbolic and non-symbolic tensors`);if(s){let n=[e].concat(a),r=this.inputSpec.concat(o),i=this.inputSpec;this.inputSpec=r;let s=super.apply(n,t);return this.inputSpec=i,s}else return super.apply(e,t)}call(e,t){return R(()=>{let n=t.initialState,r,i;if(n==null)r=this.forwardLayer.call(e,t),i=this.backwardLayer.call(e,t);else{let a=n.slice(0,n.length/2),o=n.slice(n.length/2);r=this.forwardLayer.call(e,Object.assign(t,{initialState:a})),i=this.backwardLayer.call(e,Object.assign(t,{initialState:o}))}let a;this.returnState&&(Array.isArray(r)&&(a=r.slice(1).concat(i.slice(1))),r=r[0],i=i[0]),this.returnSequences&&(i=Bd(i,1));let o;return this.mergeMode===`concat`?o=Ey([r,i]):this.mergeMode===`sum`?o=B(r,i):this.mergeMode===`ave`?o=H(.5,B(r,i)):this.mergeMode===`mul`?o=H(r,i):this.mergeMode==null&&(o=[r,i]),this.returnState?this.mergeMode==null?o.concat(a):[o].concat(a):o})}resetStates(e){this.forwardLayer.resetStates(),this.backwardLayer.resetStates()}build(e){iy(this.forwardLayer.name,()=>{this.forwardLayer.build(e)}),iy(this.backwardLayer.name,()=>{this.backwardLayer.build(e)}),this.built=!0}computeMask(e,t){Array.isArray(t)&&(t=t[0]);let n;if(n=this.returnSequences?this.mergeMode==null?[t,t]:t:this.mergeMode==null?[null,null]:null,this.returnState){let e=this.forwardLayer.states.map(e=>null);return Array.isArray(n)?n.concat(e).concat(e):[n].concat(e,e)}else return n}get trainableWeights(){return this.forwardLayer.trainableWeights.concat(this.backwardLayer.trainableWeights)}get nonTrainableWeights(){return this.forwardLayer.nonTrainableWeights.concat(this.backwardLayer.nonTrainableWeights)}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.forwardLayer!=null&&this.forwardLayer.setFastWeightInitDuringBuild(e),this.backwardLayer!=null&&this.backwardLayer.setFastWeightInitDuringBuild(e)}getConfig(){let e={mergeMode:this.mergeMode},t=super.getConfig();return Object.assign(e,t),e}static fromConfig(e,t){let n=ux(t.layer);if(delete t.layer,t.numConstants!=null)throw new vv(`Deserialization of a Bidirectional layer with numConstants present is not supported yet.`);let r=t;return r.layer=n,new e(r)}};tT.className=`Bidirectional`,q(tT);var nT=class extends Tb{constructor(e){super(e),this.scale=e.scale,e.offset?this.offset=e.offset:this.offset=0}getConfig(){let e={scale:this.scale,offset:this.offset},t=super.getConfig();return Object.assign(e,t),e}call(e,t){return R(()=>(e=Y(e),e.dtype!==`float32`&&(e=vy(e,`float32`)),B(H(e,this.scale),this.offset)))}};nT.className=`Rescaling`,q(nT);var{resizeBilinear:rT,cropAndResize:iT}=fm,aT=class extends Tb{constructor(e){super(e),this.height=e.height,this.width=e.width}centerCrop(e,t,n,r,i,a,o,s){return R(()=>{let c,l=!1,u=[t/a,n/o,(r+t)/a,(i+n)/o],d=[];e.rank===3?(l=!0,c=Df([e])):c=e;for(let e=0;e<c.shape[0];e++)d.push(u);let f=ba(d,[d.length,4]),p=Ad(0,d.length,1,`int32`),m=iT(c,f,p,[r,i],`nearest`);return vy(l?Y(Jf(m)):m,s)})}upsize(e,t,n,r){return R(()=>vy(rT(e,[t,n]),r))}call(e,t){return R(()=>{let t=Y(e),n=t.dtype,r=t.shape,i=r[r.length-3],a=r[r.length-2],o=0;i!==this.height&&(o=Math.floor((i-this.height)/2));let s=0;return a!==this.width&&(s=Math.floor((a-this.width)/2),s===0&&(s=1)),o>=0&&s>=0?this.centerCrop(t,o,s,this.height,this.width,i,a,n):this.upsize(e,this.height,this.width,n)})}getConfig(){let e={height:this.height,width:this.width},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){e=pb(e);let t=e.length-3,n=e.length-2;return e[t]=this.height,e[n]=this.width,e}};aT.className=`CenterCrop`,q(aT);function oT(e,t,n,r){let i=Y(e);if(i.dtype!==`int32`&&(i=vy(i,`int32`)),t===`int`)return i;let a=i.shape;if(i.rank===0&&(i=Ml(i,-1)),t===`oneHot`&&i.shape[i.shape.length-1]!==1&&(i=Ml(i,-1)),i.rank>2)throw new J(`When outputMode is not int, maximum output rank is 2 Received outputMode ${t} and input shape ${a} which would result in output rank ${i.rank}.`);let o=[`multiHot`,`oneHot`].includes(t),s=i,c;if(c=r!==void 0&&t===`count`?Nc(s,r,n,o):Nc(s,[],n,o),t!==`tfIdf`)return c;if(r)return H(c,r);throw new J(`When outputMode is 'tfIdf', weights must be provided.`)}var sT=class extends Tb{constructor(e){super(e),this.numTokens=e.numTokens,e.outputMode?this.outputMode=e.outputMode:this.outputMode=`multiHot`}getConfig(){let e={numTokens:this.numTokens,outputMode:this.outputMode},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){return e=pb(e),e==null?[this.numTokens]:this.outputMode===`oneHot`&&e[e.length-1]!==1?(e.push(this.numTokens),e):(e[e.length-1]=this.numTokens,e)}call(e,t){return R(()=>{e=Y(e),e.dtype!==`int32`&&(e=vy(e,`int32`));let n;if(t.countWeights!==void 0){if(this.outputMode!==`count`)throw new J(`countWeights is not used when outputMode !== count.
              Received countWeights=${t.countWeights}`);n=Y(t.countWeights)}let r=pl(e),i=hl(e),a=Wl(this.numTokens,r).bufferSync().get(0),o=Kl(i,0).bufferSync().get(0);if(!(a&&o))throw new J(`Input values must be between 0 < values <= numTokens with numTokens=${this.numTokens}`);return oT(e,this.outputMode,this.numTokens,n)})}};sT.className=`CategoryEncoding`,q(sT);var cT=new Set([`bilinear`,`nearest`]),lT=class extends Tb{constructor(e){if(super(e),this.height=e.height,this.width=e.width,e.interpolation)if(cT.has(e.interpolation))this.interpolation=e.interpolation;else throw new J(`Invalid interpolation parameter: ${e.interpolation} is not implemented`);else this.interpolation=`bilinear`;this.cropToAspectRatio=!!e.cropToAspectRatio}computeOutputShape(e){e=pb(e);let t=e[2];return[this.height,this.width,t]}getConfig(){let e={height:this.height,width:this.width,interpolation:this.interpolation,cropToAspectRatio:this.cropToAspectRatio},t=super.getConfig();return Object.assign(e,t),e}call(e,t){return R(()=>{let t=[this.height,this.width];if(this.interpolation===`bilinear`)return fm.resizeBilinear(e,t,!this.cropToAspectRatio);if(this.interpolation===`nearest`)return fm.resizeNearestNeighbor(e,t,!this.cropToAspectRatio);throw Error(`Interpolation is ${this.interpolation} but only ${[...cT]} are supported`)})}};lT.className=`Resizing`,q(lT);var uT=class{constructor(e){this.seed=e}next(){if(this.seed!==void 0)return this.seed++}};uT.className=`RandomSeed`;var dT=class extends Tb{constructor(e){super(e),this.randomGenerator=new uT(e.seed)}getConfig(){let e={seed:this.randomGenerator.seed},t=super.getConfig();return Object.assign(e,t),e}};dT.className=`BaseRandomLayer`;var fT=new Set([`bilinear`,`nearest`]),pT=class extends dT{constructor(e){super(e);let{factor:t,interpolation:n=`bilinear`}=e;if(this.factor=t,Array.isArray(this.factor)&&this.factor.length===2)this.widthLower=this.factor[0],this.widthUpper=this.factor[1];else if(!Array.isArray(this.factor)&&this.factor>0)this.widthLower=-this.factor,this.widthUpper=this.factor;else throw new J(`Invalid factor: ${this.factor}. Must be positive number or tuple of 2 numbers`);if(this.widthLower<-1||this.widthUpper<-1)throw new J(`factor must have values larger than -1. Got: ${this.factor}`);if(this.widthUpper<this.widthLower)throw new J(`factor cannot have upper bound less than lower bound.
        Got upper bound: ${this.widthUpper}.
        Got lower bound: ${this.widthLower}
      `);if(n)if(fT.has(n))this.interpolation=n;else throw new J(`Invalid interpolation parameter: ${n} is not implemented`)}getConfig(){let e={factor:this.factor,interpolation:this.interpolation},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){e=pb(e);let t=e[2];return[this.imgHeight,-1,t]}call(e,t){return R(()=>{let t=Y(e);this.imgHeight=t.shape[t.shape.length-3];let n=t.shape[t.shape.length-2];this.widthFactor=kd([1],1+this.widthLower,1+this.widthUpper,`float32`,this.randomGenerator.next());let r=this.widthFactor.dataSync()[0]*n;r=Math.round(r);let i=[this.imgHeight,r];switch(this.interpolation){case`bilinear`:return fm.resizeBilinear(e,i);case`nearest`:return fm.resizeNearestNeighbor(e,i);default:throw Error(`Interpolation is ${this.interpolation}
          but only ${[...fT]} are supported`)}})}};pT.className=`RandomWidth`,q(pT),N().registerFlag(`KEEP_INTERMEDIATE_TENSORS`,()=>!1,e=>{e&&console.warn(`Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.`)});var mT;(function(e){e[e.DT_INVALID=0]=`DT_INVALID`,e[e.DT_FLOAT=1]=`DT_FLOAT`,e[e.DT_DOUBLE=2]=`DT_DOUBLE`,e[e.DT_INT32=3]=`DT_INT32`,e[e.DT_UINT8=4]=`DT_UINT8`,e[e.DT_INT16=5]=`DT_INT16`,e[e.DT_INT8=6]=`DT_INT8`,e[e.DT_STRING=7]=`DT_STRING`,e[e.DT_COMPLEX64=8]=`DT_COMPLEX64`,e[e.DT_INT64=9]=`DT_INT64`,e[e.DT_BOOL=10]=`DT_BOOL`,e[e.DT_QINT8=11]=`DT_QINT8`,e[e.DT_QUINT8=12]=`DT_QUINT8`,e[e.DT_QINT32=13]=`DT_QINT32`,e[e.DT_BFLOAT16=14]=`DT_BFLOAT16`,e[e.DT_QINT16=15]=`DT_QINT16`,e[e.DT_QUINT16=16]=`DT_QUINT16`,e[e.DT_UINT16=17]=`DT_UINT16`,e[e.DT_COMPLEX128=18]=`DT_COMPLEX128`,e[e.DT_HALF=19]=`DT_HALF`,e[e.DT_RESOURCE=20]=`DT_RESOURCE`,e[e.DT_VARIANT=21]=`DT_VARIANT`,e[e.DT_UINT32=22]=`DT_UINT32`,e[e.DT_UINT64=23]=`DT_UINT64`,e[e.DT_FLOAT_REF=101]=`DT_FLOAT_REF`,e[e.DT_DOUBLE_REF=102]=`DT_DOUBLE_REF`,e[e.DT_INT32_REF=103]=`DT_INT32_REF`,e[e.DT_UINT8_REF=104]=`DT_UINT8_REF`,e[e.DT_INT16_REF=105]=`DT_INT16_REF`,e[e.DT_INT8_REF=106]=`DT_INT8_REF`,e[e.DT_STRING_REF=107]=`DT_STRING_REF`,e[e.DT_COMPLEX64_REF=108]=`DT_COMPLEX64_REF`,e[e.DT_INT64_REF=109]=`DT_INT64_REF`,e[e.DT_BOOL_REF=110]=`DT_BOOL_REF`,e[e.DT_QINT8_REF=111]=`DT_QINT8_REF`,e[e.DT_QUINT8_REF=112]=`DT_QUINT8_REF`,e[e.DT_QINT32_REF=113]=`DT_QINT32_REF`,e[e.DT_BFLOAT16_REF=114]=`DT_BFLOAT16_REF`,e[e.DT_QINT16_REF=115]=`DT_QINT16_REF`,e[e.DT_QUINT16_REF=116]=`DT_QUINT16_REF`,e[e.DT_UINT16_REF=117]=`DT_UINT16_REF`,e[e.DT_COMPLEX128_REF=118]=`DT_COMPLEX128_REF`,e[e.DT_HALF_REF=119]=`DT_HALF_REF`,e[e.DT_RESOURCE_REF=120]=`DT_RESOURCE_REF`,e[e.DT_VARIANT_REF=121]=`DT_VARIANT_REF`,e[e.DT_UINT32_REF=122]=`DT_UINT32_REF`,e[e.DT_UINT64_REF=123]=`DT_UINT64_REF`})(mT||(mT={}));var hT;(function(e){(function(e){e[e.LEGACY=0]=`LEGACY`,e[e.V1=1]=`V1`,e[e.V2=2]=`V2`})(e.CheckpointFormatVersion||(e.CheckpointFormatVersion={}))})(hT||(hT={}));function gT(e,t){return _T(e,t)}function _T(e,t,n=new Map,r=new Set){if(e==null)return null;if(typeof Blob==`function`&&e instanceof Blob)return e.slice();if(r.has(e))throw Error(`Circular references are not supported.`);if(n.has(e))return n.get(e);let i=t(e);if(i.recurse&&i.value!==null)throw Error(`A deep map function may not return both a value and recurse=true.`);if(!i.recurse)return n.set(e,i.value),i.value;if(xT(e)){let i=Array.isArray(e)?[]:{};r.add(e);for(let a in e){let o=e[a];i[a]=_T(o,t,n,r)}return r.delete(e),e.__proto__&&(i.__proto__=e.__proto__),i}else throw Error(`Can't recurse into non-iterable type: ${e}`)}function vT(e,t=bT){return yT(e,t)}function yT(e,t,n=new Set){let r=e[0];if(n.has(r))throw Error(`Circular references are not supported.`);let i=t(e);if(i.recurse&&i.value!==null)throw Error(`A deep zip function may not return both a value and recurse=true.`);if(!i.recurse)return i.value;if(xT(r)){let i=Array.isArray(r)?[]:{};n.add(r);for(let a in r)i[a]=yT(e.map(e=>e[a]),t,n);return n.delete(r),i}else throw Error(`Can't recurse into non-iterable type: ${r}`)}function bT(e){return e===null?null:xT(e[0])?{value:null,recurse:!0}:{value:e,recurse:!1}}function xT(e){let t=!1;if(N().get(`IS_BROWSER`))t=e instanceof TextDecoder;else{let{StringDecoder:n}=vo();t=e instanceof n}return e!=null&&!ArrayBuffer.isView(e)&&(Array.isArray(e)||typeof e==`object`&&!(e instanceof Ri)&&!(e instanceof Promise)&&!t)}function ST(e){return e==null||CT(e)||Array.isArray(e)||typeof e==`object`&&e instanceof Ri||_i(e)}function CT(e){return e===null||typeof e!=`object`&&typeof e!=`function`}function wT(e){return gT(e,TT)}function TT(e){return e instanceof Ri?{value:e.clone(),recurse:!1}:xT(e)?{value:null,recurse:!0}:{value:e,recurse:!1}}var ET=class{constructor(e){if(this.capacity=e,this.begin=0,this.end=0,e==null)throw RangeError(`Can't create a ring buffer of unknown capacity.`);if(e<1)throw RangeError(`Can't create ring buffer of capacity < 1.`);this.data=Array(e),this.doubledCapacity=2*e}wrap(e){for(;e<0;)e+=this.doubledCapacity;return e%this.doubledCapacity}get(e){if(e<0)throw RangeError(`Can't get item at a negative index.`);return this.data[e%this.capacity]}set(e,t){if(e<0)throw RangeError(`Can't set item at a negative index.`);this.data[e%this.capacity]=t}length(){let e=this.end-this.begin;return e<0&&(e=this.doubledCapacity+e),e}isFull(){return this.length()===this.capacity}isEmpty(){return this.length()===0}push(e){if(this.isFull())throw RangeError(`Ring buffer is full.`);this.set(this.end,e),this.end=this.wrap(this.end+1)}pushAll(e){for(let t of e)this.push(t)}pop(){if(this.isEmpty())throw RangeError(`Ring buffer is empty.`);this.end=this.wrap(this.end-1);let e=this.get(this.end);return this.set(this.end,void 0),e}unshift(e){if(this.isFull())throw RangeError(`Ring buffer is full.`);this.begin=this.wrap(this.begin-1),this.set(this.begin,e)}shift(){if(this.isEmpty())throw RangeError(`Ring buffer is empty.`);let e=this.get(this.begin);return this.set(this.begin,void 0),this.begin=this.wrap(this.begin+1),e}shuffleExcise(e){if(this.isEmpty())throw RangeError(`Ring buffer is empty.`);let t=this.wrap(this.begin+e),n=this.get(t);return this.set(t,this.pop()),n}},DT=class e extends ET{constructor(){super(e.INITIAL_CAPACITY)}isFull(){return!1}push(e){super.isFull()&&this.expand(),super.push(e)}unshift(e){super.isFull()&&this.expand(),super.unshift(e)}expand(){let e=this.capacity*2,t=Array(e),n=this.length();for(let e=0;e<n;e++)t[e]=this.get(this.wrap(this.begin+e));this.data=t,this.capacity=e,this.doubledCapacity=2*this.capacity,this.begin=0,this.end=n}};DT.INITIAL_CAPACITY=32;function OT(e){return new MT(e)}function kT(e){return new NT(e)}function AT(e,t){return new WT(e,t)}var jT=class{async toArray(){var e=this;let t=[],n=await e.next();for(;!n.done;)t.push(n.value),n=await e.next();return t}async toArrayForTest(){let e=this.prefetch(100),t=[],n=await e.next();for(;!n.done;)t.push(n.value),n=await e.next();return t}async resolveFully(){var e=this;let t=await e.next();for(;!t.done;)t=await e.next()}async resolveWhile(e){var t=this;let n=await t.next(),r=e(n.value);for(;!n.done&&r;)n=await t.next(),r=e(n.value)}handleErrors(e){return new BT(this,e)}filter(e){return new RT(this,e)}map(e){return new zT(this,e)}mapAsync(e){return new VT(this,e)}serialMapAsync(e){return new VT(this,e).serial()}flatmap(e){return new UT(this,e)}async forEachAsync(e){return this.map(e).resolveFully()}async serialForEach(e){return this.serialMapAsync(e).resolveWhile(e=>e===!0)}rowMajorBatch(e,t=!0){return new LT(this,e,t)}columnMajorBatch(e,t=!0,n=bT){return this.rowMajorBatch(e,t).map(e=>vT(e,n))}concatenate(e,t){return new WT(OT([this,e]),t)}take(e){return e<0||e==null?this:new IT(this,e)}skip(e){return e<0||e==null?this:new FT(this,e)}prefetch(e){return new KT(this,e)}shuffle(e,t){return new qT(this,e,t)}serial(){return new PT(this)}},MT=class extends jT{constructor(e){super(),this.items=e,this.trav=0}summary(){return`Array of ${this.items.length} items`}async next(){var e=this;if(e.trav>=e.items.length)return{value:null,done:!0};let t=e.items[e.trav];return e.trav++,{value:wT(t),done:!1}}},NT=class extends jT{constructor(e){super(),this.nextFn=e}summary(){return`Function call`}async next(){var e=this;try{return e.nextFn()}catch(e){throw e.message=`Error thrown while iterating through a dataset: ${e.message}`,e}}},PT=class extends jT{constructor(e){super(),this.upstream=e,this.lastRead=Promise.resolve({value:null,done:!1})}summary(){return`${this.upstream.summary()} -> Serial`}async next(){var e=this;return e.lastRead=e.lastRead.then(()=>e.serialNext()),e.lastRead}async serialNext(){return this.upstream.next()}},FT=class extends jT{constructor(e,t){super(),this.upstream=e,this.maxCount=t,this.count=0,this.lastRead=Promise.resolve({value:null,done:!1})}summary(){return`${this.upstream.summary()} -> Skip`}async next(){var e=this;return e.lastRead=e.lastRead.then(()=>e.serialNext()),e.lastRead}async serialNext(){for(var e=this;e.count++<e.maxCount;){let t=await e.upstream.next();if(t.done)return t;Ta(t.value)}return e.upstream.next()}},IT=class extends jT{constructor(e,t){super(),this.upstream=e,this.maxCount=t,this.count=0}summary(){return`${this.upstream.summary()} -> Take`}async next(){var e=this;return e.count++>=e.maxCount?{value:null,done:!0}:e.upstream.next()}},LT=class extends jT{constructor(e,t,n=!0){super(),this.upstream=e,this.batchSize=t,this.enableSmallLastBatch=n,this.lastRead=Promise.resolve({value:null,done:!1})}summary(){return`${this.upstream.summary()} -> RowMajorBatch`}async next(){var e=this;return e.lastRead=e.lastRead.then(()=>e.serialNext()),e.lastRead}async serialNext(){var e=this;let t=[];for(;t.length<e.batchSize;){let n=await e.upstream.next();if(n.done)return e.enableSmallLastBatch&&t.length>0?{value:t,done:!1}:{value:null,done:!0};t.push(n.value)}return{value:t,done:!1}}},RT=class extends jT{constructor(e,t){super(),this.upstream=e,this.predicate=t,this.lastRead=Promise.resolve({value:null,done:!1})}summary(){return`${this.upstream.summary()} -> Filter`}async next(){var e=this;return e.lastRead=e.lastRead.then(()=>e.serialNext()),e.lastRead}async serialNext(){for(var e=this;;){let t=await e.upstream.next();if(t.done||e.predicate(t.value))return t;Ta(t.value)}}},zT=class extends jT{constructor(e,t){super(),this.upstream=e,this.transform=t}summary(){return`${this.upstream.summary()} -> Map`}async next(){var e=this;let t=await e.upstream.next();if(t.done)return{value:null,done:!0};let n=Qi(t.value),r=e.transform(t.value),i=Qi(r);for(let e of n)Zi(e,i)||e.dispose();return{value:r,done:!1}}},BT=class extends jT{constructor(e,t){super(),this.upstream=e,this.handler=t,this.count=0,this.lastRead=Promise.resolve({value:null,done:!1})}summary(){return`${this.upstream.summary()} -> handleErrors`}async next(){var e=this;return e.lastRead=e.lastRead.then(()=>e.serialNext()),e.lastRead}async serialNext(){for(var e=this;;)try{return await e.upstream.next()}catch(t){if(!e.handler(t))return{value:null,done:!0}}}},VT=class extends jT{constructor(e,t){super(),this.upstream=e,this.transform=t}summary(){return`${this.upstream.summary()} -> AsyncMap`}async next(){var e=this;let t=await e.upstream.next();if(t.done)return{value:null,done:!0};let n=Qi(t.value),r=await e.transform(t.value),i=Qi(r);for(let e of n)Zi(e,i)||e.dispose();return{value:r,done:!1}}},HT=class extends jT{constructor(){super(),this.outputQueue=new DT,this.lastRead=Promise.resolve({value:null,done:!1})}async next(){var e=this;return e.lastRead=e.lastRead.then(()=>e.serialNext()),e.lastRead}async serialNext(){for(var e=this;e.outputQueue.length()===0;)if(!await e.pump())return{value:null,done:!0};return{value:e.outputQueue.shift(),done:!1}}},UT=class extends HT{constructor(e,t){super(),this.upstream=e,this.transform=t}summary(){return`${this.upstream.summary()} -> Flatmap`}async pump(){var e=this;let t=await e.upstream.next();if(t.done)return!1;let n=Qi(t.value),r=e.transform(t.value),i=Qi(r);e.outputQueue.pushAll(r);for(let e of n)Zi(e,i)||e.dispose();return!0}},WT=class extends jT{constructor(e,t){super(),this.baseErrorHandler=t,this.lastRead=null,this.iterator=null,this.moreIterators=e}summary(){return`TODO: fill in upstream of chained summaries -> Chained`}async next(){var e=this;return e.lastRead=e.readFromChain(e.lastRead),e.lastRead}async readFromChain(e){var t=this;if(await e,t.iterator==null){let e=await t.moreIterators.next();if(e.done)return{value:null,done:!0};t.iterator=e.value,t.baseErrorHandler!=null&&(t.iterator=t.iterator.handleErrors(t.baseErrorHandler))}let n=await t.iterator.next();return n.done?(t.iterator=null,t.readFromChain(e)):n}},GT;(function(e){e[e.FAIL=0]=`FAIL`,e[e.SHORTEST=1]=`SHORTEST`,e[e.LONGEST=2]=`LONGEST`})(GT||(GT={}));var KT=class extends jT{constructor(e,t){super(),this.upstream=e,this.bufferSize=t,this.buffer=new ET(t)}summary(){return`${this.upstream.summary()} -> Prefetch`}refill(){for(;!this.buffer.isFull();){let e=this.upstream.next();this.buffer.push(e)}}next(){return this.refill(),this.buffer.shift()}},qT=class extends KT{constructor(e,t,n){super(e,t),this.upstream=e,this.windowSize=t,this.upstreamExhausted=!1,this.random=Cd.alea(n||mi().toString()),this.lastRead=Promise.resolve({value:null,done:!1})}async next(){var e=this;return e.lastRead=e.lastRead.then(()=>e.serialNext()),e.lastRead}randomInt(e){return Math.floor(this.random()*e)}chooseIndex(){return this.randomInt(this.buffer.length())}async serialNext(){var e=this;for(e.upstreamExhausted||e.refill();!e.buffer.isEmpty();){let t=e.chooseIndex(),n=await e.buffer.shuffleExcise(t);if(n.done)e.upstreamExhausted=!0;else return e.refill(),n}return{value:null,done:!0}}},JT=class{constructor(){this.size=null}batch(e,t=!0){let n=this;O(e>0,()=>`batchSize needs to be positive, but it is
      ${e}`);let r;return r=this.size===1/0||this.size==null?this.size:t?Math.ceil(this.size/e):Math.floor(this.size/e),YT(async()=>(await n.iterator()).columnMajorBatch(e,t,XT),r)}concatenate(e){let t=this,n;return n=this.size===1/0||e.size===1/0?1/0:this.size!=null&&e.size!=null?this.size+e.size:null,YT(async()=>(await t.iterator()).concatenate(await e.iterator()),n)}filter(e){let t=this,n;return n=this.size===1/0?1/0:null,YT(async()=>(await t.iterator()).filter(t=>R(()=>e(t))),n)}async forEachAsync(e){return(await this.iterator()).forEachAsync(e)}map(e){let t=this;return YT(async()=>(await t.iterator()).map(t=>R(()=>e(t))),this.size)}mapAsync(e){let t=this;return YT(async()=>(await t.iterator()).mapAsync(e),this.size)}prefetch(e){if(e==null)throw RangeError("`Dataset.prefetch()` requires bufferSize to be specified.");let t=this;return YT(async()=>(await t.iterator()).prefetch(e),this.size)}repeat(e){let t=this,n;return n=this.size!=null&&e>0?this.size*e:e===0?0:this.size!=null&&(e===void 0||e<0)?1/0:null,YT(async()=>AT(kT(async()=>({value:await t.iterator(),done:!1})).take(e)),n)}skip(e){let t=this,n;return n=this.size!=null&&e>=0&&this.size>=e?this.size-e:this.size!=null&&(this.size<e||e===void 0||e<0)?0:null,YT(async()=>(await t.iterator()).skip(e),n)}shuffle(e,t,n=!0){if(e==null||e<0)throw this.size==null?RangeError("`Dataset.shuffle()` requires bufferSize to be specified."):RangeError(`\`Dataset.shuffle()\` requires bufferSize to be specified.  If your data fits in main memory (for regular JS objects), and/or GPU memory (for \`tf.Tensor\`s), consider setting bufferSize to the dataset size (${this.size} elements)`);let r=this,i=Cd.alea(t||mi().toString());return YT(async()=>{let t=i.int32();return n&&(t+=i.int32()),(await r.iterator()).shuffle(e,t.toString())},this.size)}take(e){let t=this,n;return n=this.size!=null&&this.size>e?e:this.size!=null&&this.size<=e?this.size:null,YT(async()=>(await t.iterator()).take(e),n)}async toArray(){var e=this;if(e.size===1/0)throw Error(`Can not convert infinite data stream to array.`);return(await e.iterator()).toArray()}async toArrayForTest(){var e=this;if(e.size===1/0)throw Error(`Can not convert infinite data stream to array.`);return(await e.iterator()).toArrayForTest()}};JT.MAX_BUFFER_SIZE=1e4;function YT(e,t=null){return new class extends JT{constructor(){super(...arguments),this.size=t}async iterator(){return e()}}}function XT(e){if(e===null)return null;let t=e[0];return ST(t)?{value:ZT(e),recurse:!1}:{value:null,recurse:!0}}function ZT(e){if(e.length===0)throw Error(`Can't make a batch of zero elements.`);return e[0]instanceof Ri?Df(e):ba(e)}function X(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{e!=null&&O(e.dtype!==`complex64`,()=>`${t} does not support complex64 tensors in the CPU backend.`)})}var QT=Xf,$T=class e extends x{nextDataId(){return e.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new b(this,Ca())}write(e,t,n){this.firstUse&&(this.firstUse=!1,N().get(`IS_NODE`)&&Ir(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));let r={id:this.nextDataId()};return this.data.set(r,{values:e,dtype:n,refCount:1}),r}makeTensorInfo(e,t,n){let r;if(t===`string`&&n!=null&&n.length>0&&he(n[0])){let i=n.map(e=>hi(e));r=this.write(i,e,t)}else r=this.write(n,e,t);return{dataId:r,shape:e,dtype:t}}refCount(e){return this.data.has(e)?this.data.get(e).refCount:0}incRef(e){let t=this.data.get(e);t.refCount++}decRef(e){if(this.data.has(e)){let t=this.data.get(e);t.refCount--}}move(e,t,n,r,i){this.data.set(e,{values:t,dtype:r,refCount:i})}numDataIds(){return this.data.numDataIds()}async read(e){return this.readSync(e)}readSync(e){let{dtype:t,complexTensorInfos:n}=this.data.get(e);return t===`complex64`?xh(this.readSync(n.real.dataId),this.readSync(n.imag.dataId)):Ce(this.data.get(e).values,t)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype===`string`)try{let n=t.map(e=>gi(e));return So(e.shape,e.dtype,n)}catch(e){throw Error(`Failed to decode encoded string bytes into utf-8`)}return So(e.shape,e.dtype,t)}makeOutput(e,t,n){return Ca().makeTensorFromTensorInfo(this.makeTensorInfo(t,n,e),this)}disposeData(e,t=!1){if(this.data.has(e)){if(this.data.get(e).refCount--,!t&&this.data.get(e).refCount>0)return!1;let{complexTensorInfos:n}=this.data.get(e);n!=null&&(this.disposeData(n.real.dataId,!0),this.disposeData(n.imag.dataId,!0)),this.data.delete(e)}return!0}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}async time(e){let t=mi();return e(),{kernelMs:mi()-t}}memory(){return{unreliable:!0,reasons:[`The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less.`]}}where(e){X([e],`where`);let t=this.readSync(e.dataId);return QT(e.shape,t)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};$T.nextDataId=0;function eE(e){let t=new Float32Array(e.length);for(let n=0;n<e.length;++n)t[n]=Math.abs(e[n]);return t}var tE={kernelName:`Abs`,backendName:`cpu`,kernelFunc:e=>{let{x:t}=e.inputs,n=e.backend;X(t,`abs`);let r=new Float32Array(k(t.shape)),i=n.data.get(t.dataId).values;return r=eE(i),n.makeOutput(r,t.shape,t.dtype)}};function nE(e){return(t,n,r,i,a)=>{let o=W(t,n),s=o.length,c=M(o),l=ce(a,k(o)),u=t.length,d=n.length,f=M(t),p=M(n),m=Bc(t,o),h=Bc(n,o);if(m.length+h.length===0)for(let t=0;t<l.length;++t)l[t]=e(r[t%r.length],i[t%i.length]);else for(let t=0;t<l.length;++t){let n=ke(t,s,c),a=n.slice(-u);m.forEach(e=>a[e]=0);let o=Oe(a,u,f),g=n.slice(-d);h.forEach(e=>g[e]=0);let _=Oe(g,d,p);l[t]=e(r[o],i[_])}return[l,o]}}function rE(e){let{inputs:t,backend:n}=e,{real:r,imag:i}=t,a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,s=n.makeTensorInfo(r.shape,`complex64`),c=n.data.get(s.dataId);return c.complexTensorInfos={real:n.makeTensorInfo(r.shape,`float32`,a),imag:n.makeTensorInfo(i.shape,`float32`,o)},s}var iE={kernelName:dt,backendName:`cpu`,kernelFunc:rE};function aE(e,t,n=`float32`){if(n===`complex64`)return rE({inputs:{real:aE(e,t,`float32`),imag:aE(e,t,`float32`)},backend:e});let r=Te(k(t),n);return e.makeTensorInfo(t,n,r)}function oE(e){let{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}var sE={kernelName:Yt,backendName:`cpu`,kernelFunc:oE};function cE(e){let{inputs:t,backend:n}=e,{input:r}=t,i=n.data.get(r.dataId).complexTensorInfos.real,a=n.data.get(i.dataId).values;return n.makeTensorInfo(i.shape,i.dtype,a)}var lE={kernelName:Ln,backendName:`cpu`,kernelFunc:cE};function uE(e,t,n,r){if(r===`int32`)return[t,`int32`,Int32Array.from(e)];if(r===`bool`){let r=pi([0],n),[i,a]=nE((e,t)=>e===t?0:1)(t,[],e,r,`bool`);return[a,`bool`,i]}throw Error(`Error in Cast: failed to cast ${n} to ${r}`)}function dE(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dtype:a}=r;if(a===`complex64`){if(i.dtype===`complex64`)return oE({inputs:{x:i},backend:n});let e=aE(n,i.shape,i.dtype),t=dE({inputs:{x:i},backend:n,attrs:{dtype:`float32`}}),r=rE({inputs:{real:t,imag:e},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),r}if(i.dtype===`complex64`){let e=cE({inputs:{input:i},backend:n}),t=dE({inputs:{x:e},backend:n,attrs:{dtype:a}});return n.disposeIntermediateTensorInfo(e),t}if(!fe(i.dtype,a)){let e=oE({inputs:{x:i},backend:n});return{dataId:e.dataId,shape:e.shape,dtype:a}}let o=n.data.get(i.dataId).values,[s,c,l]=uE(o,i.shape,i.dtype,a);return n.makeTensorInfo(s,c,l)}var fE={kernelName:ct,backendName:`cpu`,kernelFunc:dE};function pE(e,t,n,r){return n==null?({inputs:n,backend:i})=>{let{a,b:o}=n,s=i;X([a,o],e);let c=s.data.get(a.dataId).values,l=s.data.get(o.dataId).values,u=a.dtype===`string`?rg(c):c,d=a.dtype===`string`?rg(l):l,f=r||a.dtype,[p,m]=t(a.shape,o.shape,u,d,f);return s.makeTensorInfo(m,f,p)}:({inputs:e,backend:i})=>{let{a,b:o}=e,s=i;if(a.dtype===`complex64`||o.dtype===`complex64`){let e=dE({inputs:{x:a},backend:s,attrs:{dtype:`complex64`}}),t=s.data.get(e.dataId),r=t.complexTensorInfos.real,i=t.complexTensorInfos.imag,c=s.data.get(r.dataId).values,l=s.data.get(i.dataId).values,u=dE({inputs:{x:o},backend:s,attrs:{dtype:`complex64`}}),d=s.data.get(u.dataId),f=d.complexTensorInfos.real,p=d.complexTensorInfos.imag,m=s.data.get(f.dataId).values,h=s.data.get(p.dataId).values,[g,_,v]=n(a.shape,o.shape,c,l,m,h),y=s.makeTensorInfo(v,`float32`,g),b=s.makeTensorInfo(v,`float32`,_),x=rE({inputs:{real:y,imag:b},backend:s});return s.disposeIntermediateTensorInfo(e),s.disposeIntermediateTensorInfo(u),s.disposeIntermediateTensorInfo(y),s.disposeIntermediateTensorInfo(b),x}else{let e=s.data.get(a.dataId).values,n=s.data.get(o.dataId).values,i=r||a.dtype,[c,l]=t(a.shape,o.shape,e,n,i);return s.makeTensorInfo(l,i,c)}}}function mE(e){return(t,n,r,i,a,o)=>{let s=W(t,n),c=k(s),l=s.length,u=M(s),d=ce(`float32`,c),f=ce(`float32`,c),p=Bc(t,s),m=Bc(n,s),h=xh(r,i),g=xh(a,o),_=t.length,v=M(t),y=n.length,b=M(n);if(p.length+m.length===0)for(let t=0;t<d.length;t++){let n=t%h.length,r=t%g.length,i=e(h[n*2],h[n*2+1],g[r*2],g[r*2+1]);d[t]=i.real,f[t]=i.imag}else for(let t=0;t<d.length;t++){let n=ke(t,l,u),r=n.slice(-_);p.forEach(e=>r[e]=0);let i=Oe(r,_,v),a=n.slice(-y);m.forEach(e=>a[e]=0);let o=Oe(a,y,b),s=e(h[i*2],h[i*2+1],g[o*2],g[o*2+1]);d[t]=s.real,f[t]=s.imag}return[d,f,s]}}var hE=nE(((e,t)=>e+t)),gE=pE(`Add`,hE,mE(((e,t,n,r)=>({real:e+n,imag:t+r})))),_E={kernelName:`Add`,backendName:`cpu`,kernelFunc:gE};function vE(e,t,n,r,i){let a=k(r),o=Te(i,n);for(let n=0;n<e.length;n++){let r=e[n];if(r<0)throw Error(`Input x must be non-negative!`);r>=i||(a>0?o[r]+=t[n]:o[r]+=1)}return o}function yE(e,t,n,r=!1){let i=e.shape[0],a=e.shape[1],o=So([i,n],t.dtype);for(let s=0;s<i;s++)for(let i=0;i<a;i++){let a=e.get(s,i);if(a<0)throw Error(`Input x must be non-negative!`);a>=n||(r?o.set(1,s,a):t.size>0?o.set(o.get(s,a)+t.get(s,i),s,a):o.set(o.get(s,a)+1,s,a))}return o}var bE=nE(((e,t)=>e&t)),xE={kernelName:at,backendName:`cpu`,kernelFunc:pE(at,bE)};function SE(e){return(t,n,r)=>{let i=le(n,t.length);for(let n=0;n<t.length;++n)i[n]=e(t[n],r);return i}}function CE(e,t,n){return wE(e,SE(t),n)}function wE(e,t,n){return({inputs:r,attrs:i,backend:a})=>{let{x:o}=r;X(o,e);let s=a,c=s.data.get(o.dataId).values,l;if(o.dtype===`string`){if(!Array.isArray(c))throw Error(`String tensor's value was not an instance of Array`);l=rg(c)}else l=c;let u=n||o.dtype,d=t(l,u,i);return s.makeTensorInfo(o.shape,u,d)}}var TE=SE(e=>Math.ceil(e)),EE={kernelName:lt,backendName:`cpu`,kernelFunc:wE(lt,TE)};function DE(e,t,n,r){let i=le(n,k(t));if(r&&n!==`string`){let t=0;e.forEach(e=>{let n=k(e.shape);i.set(e.vals,t),t+=n})}else{let r=0;e.forEach(e=>{let a=n===`string`?rg(e.vals):e.vals,o=0;for(let n=0;n<e.shape[0];++n){let s=n*t[1]+r;for(let t=0;t<e.shape[1];++t)i[s+t]=a[o++]}r+=e.shape[1]})}return i}var OE=nE((e,t)=>+(e===t)),kE=pE(Lt,OE,null,`bool`),AE={kernelName:Lt,backendName:`cpu`,kernelFunc:kE},jE=SE(e=>Math.exp(e)),ME=wE(`Exp`,jE,`float32`),NE={kernelName:`Exp`,backendName:`cpu`,kernelFunc:ME},PE=SE(e=>Math.expm1(e)),FE={kernelName:zt,backendName:`cpu`,kernelFunc:wE(zt,PE)},IE=SE(e=>Math.floor(e)),LE={kernelName:Ht,backendName:`cpu`,kernelFunc:wE(Ht,IE)},RE=nE((e,t)=>Math.floor(e/t)),zE={kernelName:Ut,backendName:`cpu`,kernelFunc:pE(Ut,RE,null,`int32`)};function BE(e,t,n,r,i,a,o,s,c){let l=So([r,a],n);for(let n=0;n<r;n++){let r=[],u=0;for(let t=0;t<i;t++){let a=e[n*i+t];u+=a*o[t],r.push(a)}if(u<0||u>=c/a)throw Error(`Invalid indices: ${r} does not index into ${s}`);for(let e=0;e<a;e++)l.values[n*a+e]=t.get(...t.indexToLoc(u*a+e))}return l}function VE(e,t,n){let r=So(n,e.dtype);for(let n=0;n<r.size;++n){let i=r.indexToLoc(n).slice(),a=i[0],o=i[2],s=t.locToIndex([a,o]);i[2]=t.values[s];let c=e.locToIndex(i);0<=c&&c<e.values.length&&(r.values[n]=e.values[c])}return r}var HE=nE((e,t)=>+(e>t)),UE={kernelName:qt,backendName:`cpu`,kernelFunc:pE(qt,HE,null,`bool`)},WE=nE((e,t)=>+(e>=t)),GE={kernelName:Jt,backendName:`cpu`,kernelFunc:pE(Jt,WE,null,`bool`)},KE=nE((e,t)=>+(e<t)),qE={kernelName:nn,backendName:`cpu`,kernelFunc:pE(nn,KE,null,`bool`)},JE=nE((e,t)=>+(e<=t)),YE={kernelName:rn,backendName:`cpu`,kernelFunc:pE(rn,JE,null,`bool`)};function XE(e,t,n){let r=(t-e)/(n-1),i=Te(n,`float32`);i[0]=e;for(let e=1;e<i.length;e++)i[e]=i[e-1]+r;return i}var ZE=SE(e=>Math.log(e)),QE={kernelName:`Log`,backendName:`cpu`,kernelFunc:wE(`Log`,ZE)};function $E(e,t,n,r){let i=ce(r,k(n));for(let n=0;n<i.length;++n){let r=n*t,a=e[r];for(let n=0;n<t;++n){let t=e[r+n];(Number.isNaN(t)||t>a)&&(a=t)}i[n]=a}return i}var eD=nE(((e,t)=>Math.max(e,t))),tD={kernelName:fn,backendName:`cpu`,kernelFunc:pE(fn,eD)},nD=nE(((e,t)=>Math.min(e,t))),rD={kernelName:yn,backendName:`cpu`,kernelFunc:pE(yn,nD)},iD=nE(((e,t)=>e*t)),aD=pE(Sn,iD,mE(((e,t,n,r)=>({real:e*n-t*r,imag:e*r+t*n})))),oD={kernelName:Sn,backendName:`cpu`,kernelFunc:aD};function sD(e,t,n){return iD([],t,di(-1,n),e,n)}function cD(e){let{inputs:t,backend:n}=e,{x:r}=t;X(r,`neg`);let i=n.data.get(r.dataId).values,[a,o]=sD(i,r.shape,r.dtype);return n.makeTensorInfo(o,r.dtype,a)}var lD={kernelName:`Neg`,backendName:`cpu`,kernelFunc:cD},uD=nE(((e,t)=>e===t?0:1)),dD={kernelName:Cn,backendName:`cpu`,kernelFunc:pE(Cn,uD,null,`bool`)};function fD(e,t,n,r,i){let a=t.length,o=k(t),s=M(t),c=M(i),l=ce(n,k(i));for(let t=0;t<o;++t){let n=ke(t,a,s),i=Array(n.length);for(let e=0;e<i.length;e++)i[e]=n[r[e]];let o=Oe(i,a,c);l[o]=e[t]}return l}function pD(e){let{inputs:t,attrs:n,backend:r}=e,{x:i}=t,{perm:a}=n;X(i,`transpose`);let o=i.shape.length,s=Array(o);for(let e=0;e<s.length;e++)s[e]=i.shape[a[e]];let c=r.data.get(i.dataId).values,l=fD(c,i.shape,i.dtype,a,s);return{dataId:r.write(l,s,i.dtype),shape:s,dtype:i.dtype}}var mD={kernelName:Tr,backendName:`cpu`,kernelFunc:pD};function hD(e,t,n,r){let[i,a]=ol(e,r),o=Ki(t,`int32`),s=Te(k(i),o),c=k(a);for(let e=0;e<s.length;++e){let t=e*c,r=1;for(let e=0;e<c;++e)r*=n[t+e];s[e]=r}return{outVals:s,outShape:i,outDtype:o}}function gD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;X(i,`prod`);let s=i.shape.length,c=j(a,i.shape),l=ll(c,s),u=c,d=i,f=[];l!=null&&(d=pD({inputs:{x:i},backend:n,attrs:{perm:l}}),f.push(d),u=dl(u.length,s));let p=n.data.get(d.dataId).values,{outVals:m,outShape:h,outDtype:g}=hD(d.shape,d.dtype,p,u),_=h;return o&&(_=sl(h,c)),f.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(_,g,m)}var _D={kernelName:Mn,backendName:`cpu`,kernelFunc:gD};function vD(e,t,n){e.forEach((e,r)=>{if(e<0||e>=n){let i=ke(r,t.length,M(t)).join(`,`);throw Error(`indices[${i}] = ${e} is not in [0, ${n})`)}})}function yD(e,t){for(let n=0;n<e.length;++n){let r=e[n],i=n===e.length-1?t:e[n+1].length;if(r.length===0)throw Error(`Ragged splits may not be empty`);if(r[0]<0)throw Error(`Ragged splits must be non-negative`);if(r[r.length-1]>i)throw Error(`Ragged splits must not point past values`);for(let e=1;e<r.length;++e)if(r[e-1]>r[e])throw Error(`Ragged splits must be sorted in ascending order`)}}function bD(e,t,n,r){let i=[],a=0,o=t.length-1+n.length,s=Array(o).fill(null).map(()=>[0]);yD(n,r);let c=1;for(let e=0;e<t.length-1;++e){c*=t[e];let n=t[e+1];for(let t=1;t<c+1;++t)s[e].push(t*n)}for(let r=0;r<e.length;++r){let o=e[r],c=e[r]+1;for(let e=0;e<n.length;++e){let r=n[e],i=e+t.length-1;if(i>=0){let e=s[i],t=e[e.length-1]-r[o];for(let e=o;e<c;++e)s[i].push(r[e+1]+t)}o=r[o],c=r[c]}c!==o&&(i.push([o,c]),a+=c-o)}return{outSplits:s,valueSlices:i,numValues:a}}function xD(e){let t=[];for(let n=0;n<e.length;++n){let r=e[n].length,i=le(`int32`,r);t.push(i),e[n].forEach((e,t)=>i[t]=e)}return t}function SD(e,t){let n=e.slice(0,t);for(;n.length<t;)n.push(1);for(let r=t;r<e.length;r++)n[t-1]*=e[r];return n}function CD(e,t,n,r,i,a){let o=SD(t,2)[1],s=SD(a,2)[1],c=0;for(let t of n)for(let n=t[0];n<t[1];++n){for(let t=0;t<r;++t)i[c*s+t]=e[n*o+t];++c}}function wD(e,t,n,r,i){let a=t.slice();a[0]=i;let o=le(n,k(a)),s=e.length;return CD(e,t,r,s===0?0:s/t[0],o,a),[o,a]}function TD(e,t,n,r,i,a,o,s){if(e.length===0)throw Error(`paramsNestedSplits must be non empty`);if(t[0].length===0)throw Error(`Split tensors must not be scalars`);if(vD(a,o,t[0][0]-1),r.length===0)throw Error(`params.rank must be nonzero`);let c=r[0],{outSplits:l,valueSlices:u,numValues:d}=bD(a,o,e,c),f=xD(l),p=wD(n,r,i,u,d);return[f,p[0],p[1]]}var ED=2147483647;function DD(e,t,n,r,i,a,o){if(t.length>1)throw Error(`starts must be a scalar or vector`);if(i.length>1)throw Error(`limits must be a scalar or vector`);if(o.length>1)throw Error(`deltas must be a scalar or vector`);let s=t.length===0,c=i.length===0,l=o.length===0,u=[];s||u.push(t[0]),c||u.push(i[0]),l||u.push(o[0]);for(let e=1;e<u.length;++e)if(u[e]!==u[e-1])throw Error(`starts, limits, and deltas must have the same shape`);let d=u.length===0?1:u[0],f=le(`int32`,d+1);f[0]=0;for(let t=0;t<d;++t){let n=s?e[0]:e[t],i=c?r[0]:r[t],o=l?a[0]:a[t];if(o===0)throw Error(`Requires delta != 0`);let u;if(o>0&&i<n||o<0&&i>n)u=0;else if(u=Math.ceil(Math.abs((i-n)/o)),u>ED)throw Error(`Requires ((limit - start) / delta) <= ${ED}`);f[t+1]=f[t]+u}let p=f[d],m=le(n,p),h=0;for(let t=0;t<d;++t){let n=f[t+1]-f[t],r=s?e[0]:e[t],i=l?a[0]:a[t];for(let e=0;e<n;++e)m[h++]=r,r+=i}return[f,m]}var OD=th,kD=class e{constructor(e,t,n,r,i,a,o,s,c,l){this.shape=e,this.shapeShape=t,this.values=n,this.valuesShape=r,this.valuesDType=i,this.defaultValue=a,this.defaultValueShape=o,this.rowPartitionValues=s,this.rowPartitionValuesShapes=c,this.rowPartitionTypes=rh(l),this.raggedRank=ih(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===OD.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===OD.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(t){let n=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case OD.VALUE_ROWIDS:return e.getMaxWidthValueRowID(n);case OD.ROW_SPLITS:return e.getMaxWidthRowSplit(n);default:throw Error(`Cannot handle partition type ${OD[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(t===0||t===1)return 0;let n=0;for(let r=0;r<t-1;++r){let t=e[r+1]-e[r];t>n&&(n=t)}return n}static getMaxWidthValueRowID(e){let t=e.length;if(t===0)return 0;let n=0,r=e[0],i=0;for(let a=1;a<t;++a){let t=e[a];t!==r&&(r=t,i=Math.max(a-n,i),n=a)}return Math.max(t-n,i)}tensorShapeFromTensor(e,t,n=!0){if(t.length===0){if(e[0]===-1)return[];throw Error(`The only valid scalar shape tensor is the fully unknown shape specified as -1.`)}return jD(e,n)}calculateOutputSize(e){let t=this.valuesShape,n=this.defaultValueShape;ah(n,t);let r=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=nh(this.raggedRank,r,t);i[0]<0&&(i[0]=e);for(let e=1;e<=this.raggedRank;++e)i[e]<0&&(i[e]=this.getMaxWidth(e));return i}calculateFirstParentOutputIndex(e,t,n){let r=Math.min(e,n),i=[],a=0;for(let e=0;e<r;++e,a+=t)i.push(a);for(let t=r;t<e;++t)i.push(-1);return O(i.length===e,()=>`Final length of result must be equal to firstDimension.`),i}calculateOutputIndexRowSplit(e,t,n,r){let i=e.length,a=[];for(let o=0;o<i-1;++o){let i=e[o+1]-e[o],s=Math.min(r,i),c=t[o];c===-1&&(s=0);for(let e=0;e<s;++e)a.push(c),c+=n;for(let e=0;e<i-s;++e)a.push(-1)}if(i>0&&a.length!==e[i-1])throw Error(`Invalid row split size.`);return a}calculateOutputIndexValueRowID(e,t,n,r){let i=e.length,a=[];if(i===0)return[];let o=0,s=e[0];if(s>=t.length)throw Error(`Got currentValueRowId=${s}, which is not less than ${t.length}`);let c=t[s];a.push(c);for(let l=1;l<i;++l){let i=e[l];if(i===s)c>=0&&(++o,o<r?c+=n:c=-1);else{if(o=0,s=i,i>=t.length)throw Error(`Got nextValueRowId=${i} which is not less than ${t.length}`);c=t[i]}a.push(c)}if(a.length!==e.length)throw Error(`Invalid row ids.`);return a}calculateOutputIndex(e,t,n,r){let i=this.getRowPartitionTensor(e),a=this.getRowPartitionTypeByDimension(e);switch(a){case OD.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(i,t,n,r);case OD.ROW_SPLITS:if(i.length-1>t.length)throw Error(`Row partition size is greater than output size: ${i.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(i,t,n,r);default:throw Error(`Unsupported partition type: ${OD[a]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw Error(`No row_partition_types given.`);let t=this.rowPartitionTypes[0];switch(t){case OD.FIRST_DIM_SIZE:return e[0];case OD.VALUE_ROWIDS:throw Error(`Cannot handle VALUE_ROWIDS in first dimension.`);case OD.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw Error(`Cannot handle type ${OD[t]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw Error(`Invalid first partition input. Tensor requires at least one element.`);let e=this.getFirstDimensionSize(),t=this.calculateOutputSize(e),n=Array(this.raggedRank+1);n[n.length-1]=1;for(let e=n.length-2;e>=0;--e)n[e]=n[e+1]*t[e+1];let r=jD(t,!1),i=le(this.valuesDType,k(r));if(n[0]*t[0]>0){let a=this.calculateFirstParentOutputIndex(e,n[0],t[0]);for(let e=1;e<=this.raggedRank;++e)a=this.calculateOutputIndex(e-1,a,n[e],t[e]);this.setOutput(this.raggedRank,a,i,r)}return[r,i]}setOutput(e,t,n,r){if(n.length===0)return;let i=this.values,a=n,o=r.slice();o=o.slice(e+1);let s=k(o),c=t.length,l=this.defaultValue;if(l.length!==s&&l.length!==1){let e=this.defaultValueShape;R(()=>{l=Xs(U(l,e),o).dataSync()})}let u=0,d=0,f=0;for(let e=0;e<=c;++e){let r=e<c?t[e]:-1;if(r===f){++f;continue}if(d<f){let e=i.subarray(u*s);AD(a.subarray(d*s),e,(f-d)*s)}if(e>=c){let e=n.length;r=Math.floor(e/s)}if(r>f)if(this.defaultValue.length===1)a.subarray(f*s,r*s).fill(this.defaultValue[0]),f=r;else for(;r>f;)AD(a.slice(f*s),l,s),++f;r<0?(u=e+1,d=f):(u=e,d=f,f=d+1)}}};function AD(e,t,n){for(let r=0;r<n;r++)e[r]=t[r]}function jD(e,t){let n=[];for(let r of e){if(r<0){if(!t)throw Error(`Dimension ${r} must be >= 0`);if(r<-1)throw Error(`Dimension ${r} must be >= -1`);r=-1}n.push(r)}return n}function MD(e,t,n,r,i,a,o,s,c,l){return new kD(e,t,n,r,i,a,o,s,c,l).compute()}function ND(e,t,n,r){if(e===t||e<t&&n<0||t<e&&n>1)return Te(0,r);let i=Te(Math.abs(Math.ceil((t-e)/n)),r);t<e&&n===1&&(n=-1),i[0]=e;for(let e=1;e<i.length;e++)i[e]=i[e-1]+n;return i}var PD=SE(e=>1/Math.sqrt(e)),FD={kernelName:Jn,backendName:`cpu`,kernelFunc:wE(Jn,PD)};function ID(e,t,n,r,i,a,o,s,c,l){let u=[r/i,i],d=e.values,f=t.values;if(r===0)return So(n,t.dtype);let p=c instanceof Ni?c:So(u,t.dtype);typeof c==`string`||typeof c==`number`?p.values.fill(c):typeof c==`boolean`&&p.values.fill(+c);for(let e=0;e<a;e++){let a=[],c=0;for(let t=0;t<o;t++){let n=d[e*o+t];a.push(n),c+=n*s[t]}if(c<0||c>=r/i)throw Error(`Invalid indices: ${a} does not index into ${n}`);for(let n=0;n<i;n++)l?p.values[c*i+n]+=f[e*i+n]:p.values[c*i+n]=t.rank===0?f[0]:f[e*i+n]}return p}var LD=SE(e=>1/(1+Math.exp(-e))),RD=CE(rr,e=>1/(1+Math.exp(-e))),zD={kernelName:rr,backendName:`cpu`,kernelFunc:RD};function BD(e,t,n,r,i){let a=Wm(r,t,n),o=k(n),s=M(r);if(a){let n=Gm(t,s);return i===`string`?e.slice(n,n+o):e.subarray(n,n+o)}let c=So(r,i,i===`string`?rg(e):e),l=So(n,i);for(let e=0;e<l.size;++e){let n=l.indexToLoc(e),r=n.map((e,n)=>e+t[n]);l.set(c.get(...r),...n)}return i===`string`?ig(l.values):l.values}function VD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,size:o}=r;X(i,`slice`);let[s,c]=Km(i,a,o);Mm(i,s,c);let l=n.data.get(i.dataId).values,u=BD(l,s,c,i.shape,i.dtype);return n.makeTensorInfo(c,i.dtype,u)}var HD={kernelName:er,backendName:`cpu`,kernelFunc:VD};function UD(e,t,n,r,i,a,o){let s=t[0],c=a[0],l=Array(c),u=Array(s),d=t[1];if(c===0){if(s!==0)throw Error(Bh(s));let e=le(n,0),t=le(i,0);return[e,[0,d],t,l,u]}let f=!0,p=0,m=Array(c).fill(0);for(let t=0;t<s;++t){let n=e[t*d];if(n<0)throw Error(Vh(t,n));if(n>=c)throw Error(Hh(t,n,c));++m[n],f=f&&n>=p,p=n}let h=!0;for(let e=0;e<c;++e){let t=m[e]===0;l[e]=t,h=h&&!t,m[e]=Math.max(m[e],1),e>0&&(m[e]+=m[e-1])}if(h&&f){let t=e,n=r;for(let e=0;e<s;++e)u[e]=e;return[t,[s,d],n,l,u]}else{let t=m[c-1],a=le(n,t*d),f=le(i,t),p=Array(c).fill(0);for(let t=0;t<s;++t){let n=e[t*d],i=p[n],o=(n===0?0:m[n-1])+i;p[n]++;for(let n=0;n<d;++n)a[o*d+n]=e[t*d+n];f[o]=r[t],u[t]=o}for(let e=0;e<c;++e)if(p[e]===0){let t=e===0?0:m[e-1];a[t*d+0]=e;for(let e=1;e<d;++e)a[t*d+e]=0;f[t]=o}return[a,[t,d],f,l,u]}}function WD(e,t,n,r,i){let a=k(r),o=t[0],s=i.length,c=[],l=1,u=-1;for(let e=0;e<s;++e){let t=i[e];if(t===-1){if(u!==-1)throw Error(Uh(u,e));u=e,c.push(1)}else{if(t<0)throw Error(Wh(e,t));l*=t,c.push(t)}}if(u!==-1){if(l<=0)throw Error(Gh());let e=Math.trunc(a/l);if(l*e!==a)throw Error(Kh(r,c));c[u]=e}if(k(c)!==a)throw Error(qh(r,c));let d=r.length,f=[];if(d>0){f[d-1]=1;for(let e=d-2;e>=0;--e)f[e]=f[e+1]*r[e+1]}let p=[];if(s>0){p[s-1]=1;for(let e=s-2;e>=0;--e)p[e]=p[e+1]*c[e+1]}let m=le(n,o*s);for(let t=0;t<o;++t){let n=0;for(let r=0;r<d;++r)n+=e[t*d+r]*f[r];for(let e=0;e<s;++e)m[t*s+e]=Math.trunc(n/p[e]),n%=p[e]}return[m,[o,s],c]}function GD(e,t,n,r,i,a=!1,o=0){let s=r.length,c=[t[0],e.length/t[0]],l=c[1],u=s>0?i[s-1]+1:0;if(u<0)throw Error(Jh());let d=t.slice();d[0]=u;let f=le(n,d.reduce((e,t)=>e*t,1));if(s===0)return u>0&&f.fill(o),[f,d];if(u<=0)throw Error(Jh());let p=0,m=1,h=0,g=i[p];for(;;){let t=0;if(m<s){if(t=i[m],g===t){++m;continue}if(g>=t)throw Error(Yh())}if(g<0||g>=u)throw Error(Xh(g,u));g>h&&f.fill(o,h*l,g*l);for(let t=p;t<m;++t){let n=r[t];if(n<0||n>=c[0])throw Error(Zh(t,r[t],c[0]));for(let t=0;t<l;t++)f[g*l+t]+=e[n*l+t]}if(a)for(let e=0;e<l;e++)f[g*l+e]/=m-p;if(p=m,++m,h=g+1,g=t,m>s)break}return h<u&&f.fill(o,h*l,u*l),[f,d]}var KD=SE(e=>Math.sqrt(e)),qD={kernelName:ar,backendName:`cpu`,kernelFunc:CE(ar,e=>Math.sqrt(e))},JD=nE(((e,t)=>{let n=e-t;return n*n})),YD={kernelName:mr,backendName:`cpu`,kernelFunc:pE(mr,JD)},XD=SE((e,t)=>{let{pattern:n,replaceGlobal:r,rewrite:i}=t;return e.replace(new RegExp(n,r?`g`:``),i)}),ZD={kernelName:gr,backendName:`cpu`,kernelFunc:wE(gr,XD)};function QD(e,t,n,r){let i=So(e,t.dtype);for(let e=0;e<i.size;e++){let a=i.indexToLoc(e),o=Array(a.length);for(let e=0;e<o.length;e++)o[e]=a[e]*n[e]+r[e];i.set(t.get(...o),...a)}return i}var $D=class{constructor(e,t,n,r,i,a){this.separator=hi(e),this.nGramWidths=t,this.leftPad=hi(n),this.rightPad=hi(r),this.padWidth=i,this.preserveShort=a}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){let n=this.getPadWidth(t);return Math.max(0,e+2*n-t+1)}createNGrams(e,t,n,r,i,a){for(let o=0;o<i;++o){let s=this.getPadWidth(a),c=Math.max(0,s-o),l=Math.max(0,s-(i-(o+1))),u=a-(c+l),d=t+(c>0?0:o-s),f=0;f+=c*this.leftPad.length;for(let t=0;t<u;++t)f+=e[d+t].length;f+=l*this.rightPad.length;let p=c+l+u-1;f+=p*this.separator.length,n[r+o]=new Uint8Array(f);let m=n[r+o],h=0,g=e=>e.forEach(e=>m[h++]=e);for(let e=0;e<c;++e)g(this.leftPad),g(this.separator);for(let t=0;t<u-1;++t)g(e[d+t]),g(this.separator);if(u>0){g(e[d+u-1]);for(let e=0;e<l;++e)g(this.separator),g(this.rightPad)}else{for(let e=0;e<l-1;++e)g(this.rightPad),g(this.separator);g(this.rightPad)}}}compute(e,t){let n=e.length,r=t.length;if(r>0){let e=t[0];if(e!==0)throw Error(`First split value must be 0, got ${e}`);for(let i=1;i<r;++i){let r=t[i]>=e;if(r=r&&t[i]<=n,!r)throw Error(`Invalid split value ${t[i]}, must be in [${e}, ${n}]`);e=t[i]}if(e!==n)throw Error(`Last split value must be data size. Expected ${n}, got ${e}`)}let i=r-1,a=le(`int32`,r);if(n===0||r===0){let e=Array(n);for(let e=0;e<=i;++e)a[e]=0;return[e,a]}a[0]=0;for(let e=1;e<=i;++e){let n=t[e]-t[e-1],r=0;this.nGramWidths.forEach(e=>{r+=this.getNumNGrams(n,e)}),this.preserveShort&&n>0&&r===0&&(r=1),a[e]=a[e-1]+r}let o=Array(a[i]);for(let n=0;n<i;++n){let r=t[n],i=a[n];if(this.nGramWidths.forEach(a=>{let s=t[n+1]-t[n],c=this.getNumNGrams(s,a);this.createNGrams(e,r,o,i,c,a),i+=c}),this.preserveShort&&i===a[n]){let a=t[n+1]-t[n];if(a===0)continue;let s=a+2*this.padWidth;this.createNGrams(e,r,o,i,1,s)}}return[o,a]}};function eO(e,t,n,r,i,a,o,s){return new $D(n,r,i,a,o,s).compute(e,t)}function tO(e,t,n,r){if(!e.length)return;if(t.length===0){for(let t=0;t<e.length;++t)r.push(e.subarray(t,t+1));return}if(t.length===1){let i=t[0],a=e.indexOf(i);for(;a!==-1;){let t=e.subarray(0,a);(!n||t.length!==0)&&r.push(t),e=e.subarray(a+1),a=e.indexOf(i)}(!n||e.length!==0)&&r.push(e);return}let i=0;for(let a=0;a<e.length+1;a++)if(a===e.length||t.indexOf(e[a])!==-1){let t=e.subarray(i,a);(!n||t.length!==0)&&r.push(t),i=a+1}}function nO(e,t,n){let r=e.length,i=[],a=0,o=0,s=Array(r);for(let c=0;c<r;++c){let r=i.length;tO(e[c],t,n,i);let l=i.length-r;s[c]=l,a+=l,o=Math.max(o,l)}let c=le(`int32`,a*2),l=Array(a),u=[r,o],d=0;for(let e=0;e<r;++e)for(let t=0;t<s[e];++t)c[d*2]=e,c[d*2+1]=t,l[d]=i[d],++d;return[c,l,u]}function rO(e,t){let n=le(`int32`,e.length);for(let r=0;r<e.length;++r)n[r]=ui(e[r]).modulo(t).getLowBitsUnsigned();return n}var iO=nE(((e,t)=>e-t)),aO=pE(`Sub`,iO,mE(((e,t,n,r)=>({real:e-n,imag:t-r})))),oO={kernelName:`Sub`,backendName:`cpu`,kernelFunc:aO};function sO(e,t){let n=Array(e.rank);for(let r=0;r<n.length;r++)n[r]=e.shape[r]*t[r];let r=So(n,e.dtype);for(let t=0;t<r.values.length;++t){let n=r.indexToLoc(t),i=Array(e.rank);for(let t=0;t<i.length;t++)i[t]=n[t]%e.shape[t];let a=e.locToIndex(i);r.values[t]=e.values[a]}return r}var cO=(e,t)=>{let n=t.value-e.value;return n===0?e.index-t.index:n};function lO(e,t,n=0,r=e.length-1){for(;r>n;){if(r-n>600){let i=r-n+1,a=t-n+1,o=Math.log(i),s=.5*Math.exp(2*o/3),c=.5*Math.sqrt(o*s*(i-s)/i)*Math.sign(a-i/2);lO(e,t,Math.max(n,Math.floor(t-a*s/i+c)),Math.min(r,Math.floor(t+(i-a)*s/i+c)))}let i=e[t],a=n,o=r;for(E(e,n,t),cO(e[r],i)>0&&E(e,n,r);a<o;){for(E(e,a,o),a++,o--;cO(e[a],i)<0;)a+=1;for(;cO(e[o],i)>0;)--o}cO(e[n],i)===0?E(e,n,o):(o+=1,E(e,o,r)),o<=t&&(n=o+1),t<=o&&(r=o-1)}}function uO(e,t,n,r,i){let a=t[t.length-1],[o,s]=[e.length/a,a],c=ce(n,o*r),l=ce(`int32`,o*r);for(let t=0;t<o;t++){let n=t*s,a=e.subarray(n,n+s),o=Array(a.length);a.forEach((e,t)=>o[t]={value:e,index:t}),r<o.length&&(lO(o,r),o=o.slice(0,r)),i&&o.sort(cO);let u=t*r,d=c.subarray(u,u+r),f=l.subarray(u,u+r);for(let e=0;e<r;e++)d[e]=o[e].value,f[e]=o[e].index}let u=t.slice();return u[u.length-1]=r,[So(u,n,c),So(u,`int32`,l)]}function dO(e,t,n,r){let i=j(t,n)[0],a=[1,n[0],1];for(let e=0;e<i;e++)a[0]*=n[e];a[1]=n[i];for(let e=i+1;e<n.length;e++)a[2]*=n[e];let o=new Map,s=new Int32Array(n[i]),c=new Ni(a,r,e),l=[],u=a[0]===1&&a[2]===1;for(let t=0;t<n[i];t++){let n;if(u)n=e[t].toString();else{let e=[];for(let n=0;n<a[0];n++)for(let r=0;r<a[2];r++)e.push(c.get(n,t,r));n=e.join(`,`)}let r=o.get(n);if(r!=null)s[t]=r;else{let e=o.size;o.set(n,e),s[t]=e,l.push(t)}}let d=a.slice();d[1]=o.size;let f=new Ni(d,r);l.forEach((e,t)=>{for(let n=0;n<a[0];n++)for(let r=0;r<a[2];r++)f.set(c.get(n,e,r),n,t,r)});let p=n.slice();return p[i]=d[1],{outputValues:f.values,outputShape:p,indices:s}}var fO=c({addImpl:()=>hE,bincountImpl:()=>vE,bincountReduceImpl:()=>yE,bitwiseAndImpl:()=>bE,castImpl:()=>uE,ceilImpl:()=>TE,concatImpl:()=>DE,equalImpl:()=>OE,expImpl:()=>jE,expm1Impl:()=>PE,floorDivImpl:()=>RE,floorImpl:()=>IE,gatherNdImpl:()=>BE,gatherV2Impl:()=>VE,greaterEqualImpl:()=>WE,greaterImpl:()=>HE,lessEqualImpl:()=>JE,lessImpl:()=>KE,linSpaceImpl:()=>XE,logImpl:()=>ZE,maxImpl:()=>$E,maximumImpl:()=>eD,minimumImpl:()=>nD,multiplyImpl:()=>iD,negImpl:()=>sD,notEqualImpl:()=>uD,prodImpl:()=>hD,raggedGatherImpl:()=>TD,raggedRangeImpl:()=>DD,raggedTensorToTensorImpl:()=>MD,rangeImpl:()=>ND,rsqrtImpl:()=>PD,scatterImpl:()=>ID,sigmoidImpl:()=>LD,simpleAbsImpl:()=>eE,sliceImpl:()=>BD,sparseFillEmptyRowsImpl:()=>UD,sparseReshapeImpl:()=>WD,sparseSegmentReductionImpl:()=>GD,sqrtImpl:()=>KD,squaredDifferenceImpl:()=>JD,staticRegexReplaceImpl:()=>XD,stridedSliceImpl:()=>QD,stringNGramsImpl:()=>eO,stringSplitImpl:()=>nO,stringToHashBucketFastImpl:()=>rO,subImpl:()=>iO,tileImpl:()=>sO,topKImpl:()=>uO,transposeImpl:()=>fD,uniqueImpl:()=>dO});ka(`cpu`,()=>new $T,1);var pO=CE(`Elu`,e=>e>=0?e:Math.exp(e)-1),mO={kernelName:`Elu`,backendName:`cpu`,kernelFunc:pO};function hO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{alpha:a}=r;X([i],`leakyRelu`);let o=k(i.shape),s=n.data.get(i.dataId).values,c=ce(`float32`,o);for(let e=0;e<s.length;e++)c[e]=s[e]<0?a*s[e]:s[e];return n.makeTensorInfo(i.shape,`float32`,c)}var gO={kernelName:tn,backendName:`cpu`,kernelFunc:hO},_O=nE((e,t)=>e<0?t*e:e);function vO(e){let{inputs:t,backend:n}=e,{x:r,alpha:i}=t;X([r,i],`prelu`);let a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,[s,c]=_O(r.shape,i.shape,a,o,`float32`);return n.makeTensorInfo(c,`float32`,s)}var yO={kernelName:jn,backendName:`cpu`,kernelFunc:vO},bO=CE(zn,e=>Math.max(0,e)),xO={kernelName:zn,backendName:`cpu`,kernelFunc:bO},SO=CE(Gn,e=>Math.min(Math.max(0,e),6)),CO={kernelName:Gn,backendName:`cpu`,kernelFunc:SO};function wO(e,t,n,r,i){if(n===`linear`)return oE({inputs:{x:t},backend:e});if(n===`relu`)return bO({inputs:{x:t},backend:e});if(n===`elu`)return pO({inputs:{x:t},backend:e});if(n===`relu6`)return SO({inputs:{x:t},backend:e});if(n===`prelu`)return vO({inputs:{x:t,alpha:r},backend:e});if(n===`leakyrelu`)return hO({inputs:{x:t},backend:e,attrs:{alpha:i}});if(n===`sigmoid`)return RD({inputs:{x:t},backend:e});throw Error(`Activation ${n} has not been implemented for the CPU backend.`)}function TO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{shape:a}=r,o=k(i.shape),s=oe(a,o),c=k(s);O(o===c,()=>`The new shape (${s}) has ${c} elements and the old shape (${i.shape}) has ${o} elements. The new shape and old shape must have the same number of elements.`),n.incRef(i.dataId);let l=n.data.get(i.dataId);if(l.complexTensorInfos!=null){let e=l.complexTensorInfos.real,t=l.complexTensorInfos.imag;e.shape=s,t.shape=s}return{dataId:i.dataId,shape:s,dtype:i.dtype}}var EO={kernelName:Bn,backendName:`cpu`,kernelFunc:TO};function DO(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a}=t,{transposeA:o,transposeB:s}=r;X([i,a],`matMul`);let c=i.shape.length,l=a.shape.length,u=o?i.shape[c-2]:i.shape[c-1],d=s?a.shape[l-1]:a.shape[l-2],f=o?i.shape[c-1]:i.shape[c-2],p=s?a.shape[l-2]:a.shape[l-1],m=i.shape.slice(0,-2),h=a.shape.slice(0,-2),g=k(m),_=k(h),v=W(i.shape.slice(0,-2),a.shape.slice(0,-2)).concat([f,p]);O(u===d,()=>`Error in matMul: inner shapes (${u}) and (${d}) of Tensors with shapes ${i.shape} and ${a.shape} and transposeA=${o} and transposeB=${s} must match.`);let y=o?[g,u,f]:[g,f,u],b=s?[_,p,d]:[_,d,p],x=TO({inputs:{x:i},backend:n,attrs:{shape:y}}),S=TO({inputs:{x:a},backend:n,attrs:{shape:b}}),C=o?x.shape[1]:x.shape[2],w=o?x.shape[2]:x.shape[1],T=s?S.shape[1]:S.shape[2],E=Math.max(g,_),D=n.data.get(x.dataId).values,ee=n.data.get(S.dataId).values,te=M(x.shape),A=M(S.shape),[ne,re,ie]=o?[te[0],1,te[1]]:[te[0],te[1],1],[ae,oe,j]=s?[1,A[1],A[0]]:[A[1],1,A[0]],se=w*T,ce=So([E,w,T],x.dtype),le=ce.values,ue=n.blockSize;for(let e=0;e<E;e++){let t=e%g,n=e%_;for(let r=0;r<w;r+=ue){let i=Math.min(r+ue,w);for(let a=0;a<T;a+=ue){let o=Math.min(a+ue,T);for(let s=0;s<C;s+=ue){let c=Math.min(s+ue,C);for(let l=r;l<i;l++)for(let r=a;r<o;r++){let i=0;for(let e=s;e<c;e++){let a=D[t*ne+l*re+e*ie],o=ee[e*ae+r*oe+n*j];i+=a*o}le[e*se+(l*T+r)]+=i}}}}}return n.disposeIntermediateTensorInfo(x),n.disposeIntermediateTensorInfo(S),n.makeTensorInfo(v,ce.dtype,ce.values)}var OO={kernelName:nt,backendName:`cpu`,kernelFunc:DO};function kO(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a,bias:o,preluActivationWeights:s}=t,{transposeA:c,transposeB:l,activation:u,leakyreluAlpha:d}=r,f,p,m,h=[];f=DO({inputs:{a:i,b:a},attrs:{transposeA:c,transposeB:l},backend:n}),o&&(p=gE({inputs:{a:f,b:o},backend:n}),h.push(f),f=p),u&&(m=wO(n,f,u,s,d),h.push(f),f=m);for(let e of h)n.disposeIntermediateTensorInfo(e);return f}var AO={kernelName:Nr,backendName:`cpu`,kernelFunc:kO},jO={kernelName:He,backendName:`cpu`,kernelFunc:CE(He,e=>Math.acos(e))},MO={kernelName:Ue,backendName:`cpu`,kernelFunc:CE(Ue,e=>Math.acosh(e))};function NO(e){let{inputs:t,backend:n}=e,r=t;X(t,`addN`);let i=r.map(e=>n.data.get(e.dataId).values),a=So(r[0].shape,r[0].dtype),o=a.values;for(let e=0;e<r.length;e++){let t=i[e];for(let e=0;e<o.length;e++)o[e]+=t[e]}return n.makeTensorInfo(a.shape,a.dtype,a.values)}var PO={kernelName:We,backendName:`cpu`,kernelFunc:NO};function FO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;X(i,`all`);let s=j(a,i.shape),c=s,l=ll(c,i.shape.length),u=i;l!=null&&(u=pD({inputs:{x:i},backend:n,attrs:{perm:l}}),c=dl(c.length,i.shape.length)),cl(`all`,c,u.shape.length);let[d,f]=ol(u.shape,c),p=k(f),m=Te(k(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];n=n&&r}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=sl(d,s),t=TO({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}var IO={kernelName:`All`,backendName:`cpu`,kernelFunc:FO};function LO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;X(i,`any`);let s=j(a,i.shape),c=s,l=ll(c,i.shape.length),u=i;l!=null&&(u=pD({inputs:{x:i},backend:n,attrs:{perm:l}}),c=dl(c.length,i.shape.length)),cl(`any`,c,u.shape.length);let[d,f]=ol(u.shape,c),p=k(f),m=Te(k(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];n=n||r}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=sl(d,s),t=TO({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}var RO={kernelName:`Any`,backendName:`cpu`,kernelFunc:LO};function zO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r;X(i,`argMax`);let o=j(a,i.shape),s=ll(o,i.shape.length),c=i,l=[];s!=null&&(c=pD({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=dl(o.length,c.shape.length)),o=[o[0]],cl(`argMax`,o,c.shape.length);let[u,d]=ol(c.shape,o),f=Te(k(u),`int32`),p=k(d),m=n.data.get(c.dataId).values;for(let e=0;e<f.length;++e){let t=e*p,n=m[t],r=0;for(let e=0;e<p;++e){let i=m[t+e];i>n&&(n=i,r=e)}f[e]=r}return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(u,`int32`,f)}var BO={kernelName:Ge,backendName:`cpu`,kernelFunc:zO};function VO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r;X(i,`argMin`);let o=j(a,i.shape),s=ll(o,i.shape.length),c=i,l=[];s!=null&&(c=pD({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=dl(o.length,c.shape.length)),o=[o[0]],cl(`argMin`,o,c.shape.length);let[u,d]=ol(c.shape,o),f=Te(k(u),`int32`),p=k(d),m=n.data.get(c.dataId).values;for(let e=0;e<f.length;++e){let t=e*p,n=m[t],r=0;for(let e=0;e<p;++e){let i=m[t+e];i<n&&(n=i,r=e)}f[e]=r}return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(u,`int32`,f)}var HO={kernelName:Ke,backendName:`cpu`,kernelFunc:VO},UO={kernelName:qe,backendName:`cpu`,kernelFunc:CE(qe,e=>Math.asin(e))},WO={kernelName:Je,backendName:`cpu`,kernelFunc:CE(Je,e=>Math.asinh(e))},GO={kernelName:Ye,backendName:`cpu`,kernelFunc:CE(Ye,e=>Math.atan(e))},KO={kernelName:Ze,backendName:`cpu`,kernelFunc:pE(Ze,nE((e,t)=>Math.atan2(e,t)))},qO={kernelName:Xe,backendName:`cpu`,kernelFunc:CE(Xe,e=>Math.atanh(e))};function JO(e,t,n,r,i,a){let o=i.strideHeight,s=i.strideWidth,c=i.dilationHeight,l=i.dilationWidth,u=i.effectiveFilterHeight,d=i.effectiveFilterWidth,f=i.padInfo.top,p=i.padInfo.left,m=a===`max`?-1/0:1/0,h=So(i.outShape,n),g=h.values,_=i.outShape[1]*i.outShape[2]*i.outShape[3],v=i.outShape[2]*i.outShape[3],y=i.outShape[3];for(let t=0;t<i.batchSize;++t){let n=t*_,h=t*r[0];for(let t=0;t<i.inChannels;++t)for(let _=0;_<i.outHeight;++_){let b=_*o-f,x=Math.max(0,b),S=Math.min(i.inHeight,u+b),C=n+_*v;for(let n=0;n<i.outWidth;++n){let o=n*s-p,u=Math.max(0,o),f=Math.min(i.inWidth,d+o),_=m,v=0,b=0;for(let n=x;n<S;n+=c){let i=h+n*r[1];for(let n=u;n<f;n+=l){let o=e[i+n*r[2]+t];a===`max`&&o>_?_=o:a===`avg`&&(v+=o,b++)}if(isNaN(_))break}let w=C+n*y+t;g[w]=a===`avg`?v/b:_}}}return h}function YO(e,t,n,r,i=!1,a=!1){let o=So(r.outShape,`int32`),s=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,u=r.dilationWidth,d=r.effectiveFilterHeight,f=r.effectiveFilterWidth,p=r.padInfo.top,m=r.padInfo.left,h=So(t,n,e);for(let e=0;e<r.batchSize;++e)for(let t=0;t<r.inChannels;++t)for(let n=0;n<r.outHeight;++n){let g=n*s-p,_=g;for(;_<0;)_+=l;let v=Math.min(r.inHeight,d+g);for(let s=0;s<r.outWidth;++s){let d=s*c-m,p=d;for(;p<0;)p+=u;let y=Math.min(r.inWidth,f+d),b=-1/0,x=-1;for(let n=_;n<v;n+=l){let o=n-g;for(let s=p;s<y;s+=u){let c=s-d,l=h.get(e,n,s,t);l>b&&(b=l,x=i?a?((e*r.inHeight+n)*r.inWidth+s)*r.inChannels+t:(n*r.inWidth+s)*r.inChannels+t:o*f+c)}}o.set(x,e,n,s,t)}}return o}function XO(e,t,n,r,i,a){let o=i.strideDepth,s=i.strideHeight,c=i.strideWidth,l=i.dilationDepth,u=i.dilationHeight,d=i.dilationWidth,f=i.effectiveFilterDepth,p=i.effectiveFilterHeight,m=i.effectiveFilterWidth,h=i.padInfo.front,g=i.padInfo.top,_=i.padInfo.left,v=a===`max`?-1/0:1/0,y=So(i.outShape,n),b=y.values,x=i.outShape[1]*i.outShape[2]*i.outShape[3]*i.outShape[4],S=i.outShape[2]*i.outShape[3]*i.outShape[4],C=i.outShape[3]*i.outShape[4],w=i.outShape[4];for(let t=0;t<i.batchSize;++t){let n=t*x,y=t*r[0];for(let t=0;t<i.inChannels;++t)for(let x=0;x<i.outDepth;++x){let T=x*o-h,E=T;for(;E<0;)E+=l;let D=Math.min(i.inDepth,f+T),O=n+x*S;for(let n=0;n<i.outHeight;++n){let o=n*s-g,f=o;for(;f<0;)f+=u;let h=Math.min(i.inHeight,p+o),x=O+n*C;for(let n=0;n<i.outWidth;++n){let o=n*c-_,s=o;for(;s<0;)s+=d;let p=Math.min(i.inWidth,m+o),g=x+n*w,S=v,C=0,T=0;for(let n=E;n<D;n+=l){let i=y+n*r[1];for(let n=f;n<h;n+=u){let o=i+n*r[2];for(let n=s;n<p;n+=d){let i=e[o+n*r[3]+t];if(a===`max`&&i>S?S=i:a===`avg`&&(C+=i,T++),isNaN(S))break}if(isNaN(S))break}if(isNaN(S))break}let O=g+t;b[O]=a===`avg`?C/Math.max(T,1):S}}}}return y}function ZO(e,t){let n=So(t.outShape,`int32`),r=t.strideDepth,i=t.strideHeight,a=t.strideWidth,o=t.dilationDepth,s=t.dilationHeight,c=t.dilationWidth,l=t.effectiveFilterDepth,u=t.effectiveFilterHeight,d=t.effectiveFilterWidth,f=t.padInfo.front,p=t.padInfo.top,m=t.padInfo.left;for(let h=0;h<t.batchSize;++h)for(let g=0;g<t.inChannels;++g)for(let _=0;_<t.outDepth;++_){let v=_*r-f,y=v;for(;y<0;)y+=o;let b=Math.min(t.inDepth,l+v);for(let r=0;r<t.outHeight;++r){let l=r*i-p,f=l;for(;f<0;)f+=s;let x=Math.min(t.inHeight,u+l);for(let i=0;i<t.outWidth;++i){let p=i*a-m,S=p;for(;S<0;)S+=c;let C=Math.min(t.inWidth,d+p),w=-1/0,T=-1;for(let t=y;t<b;t+=o){let n=t-v;for(let r=f;r<x;r+=s){let i=r-l;for(let a=S;a<C;a+=c){let o=a-p,s=e.get(h,t,r,a,g);s>=w&&(w=s,T=n*u*d+i*u+o)}}}n.set(T,h,_,r,i,g)}}}return n}function QO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;X(i,`avgPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;O(_s(o,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=rs(i.shape,a,o,1,s,c),u;if(l.filterWidth===1&&l.filterHeight===1&&A(l.inShape,l.outShape))u=oE({inputs:{x:i},backend:n});else{let e=n.data.get(i.dataId).values,t=M(i.shape),r=JO(e,i.shape,i.dtype,t,l,`avg`);u=n.makeTensorInfo(l.outShape,i.dtype,r.values)}return u}var $O={kernelName:Qe,backendName:`cpu`,kernelFunc:QO};function ek(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r;X(i,`avgPool3d`);let u=is(i.shape,a,o,1,s,c,l),d=n.data.get(i.dataId).values,f=XO(d,i.shape,i.dtype,M(i.shape),u,`avg`);return n.makeTensorInfo(f.shape,`float32`,f.values)}var tk={kernelName:et,backendName:`cpu`,kernelFunc:ek};function nk(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r;X([i,a],`avgPool3DGrad`);let u=is(a.shape,o,s,1,c,l),d=u.strideDepth,f=u.strideHeight,p=u.strideWidth,m=u.filterDepth,h=u.filterHeight,g=u.filterWidth,_=u.dilationDepth,v=u.dilationHeight,y=u.dilationWidth,b=u.effectiveFilterDepth,x=u.effectiveFilterHeight,S=u.effectiveFilterWidth,C=b-1-u.padInfo.front,w=S-1-u.padInfo.left,T=x-1-u.padInfo.top,E=So(a.shape,`float32`),D=1/(m*h*g),O=n.bufferSync(i);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inDepth;++n)for(let r=0;r<u.inHeight;++r)for(let i=0;i<u.inWidth;++i){let a=n-C,o=r-T,s=i-w,c=0;for(let n=0;n<b;n+=_){let r=(a+n)/d;if(!(r<0||r>=u.outDepth||Math.floor(r)!==r))for(let n=0;n<x;n+=v){let i=(o+n)/f;if(!(i<0||i>=u.outHeight||Math.floor(i)!==i))for(let n=0;n<S;n+=y){let a=(s+n)/p;if(a<0||a>=u.outWidth||Math.floor(a)!==a)continue;let o=O.get(e,r,i,a,t);c+=o}}}E.set(c*D,e,n,r,i,t)}return n.makeTensorInfo(E.shape,E.dtype,E.values)}var rk={kernelName:tt,backendName:`cpu`,kernelFunc:nk};function ik(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a;X([i,a],`avgPoolGrad`);let{filterSize:s,strides:c,pad:l}=r,u=rs(o.shape,s,c,1,l),d=u.strideHeight,f=u.strideWidth,p=u.filterHeight,m=u.filterWidth,h=u.dilationHeight,g=u.dilationWidth,_=u.effectiveFilterHeight,v=u.effectiveFilterWidth,y=v-1-u.padInfo.left,b=_-1-u.padInfo.top,x=So(o.shape,`float32`),S=1/(p*m),C=n.data.get(i.dataId).values,w=So(i.shape,`float32`,C);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inHeight;++n)for(let r=0;r<u.inWidth;++r){let i=n-b,a=r-y,o=0;for(let n=0;n<_;n+=h){let r=(i+n)/d;if(!(r<0||r>=u.outHeight||Math.floor(r)!==r))for(let n=0;n<v;n+=g){let i=(a+n)/f;if(i<0||i>=u.outWidth||Math.floor(i)!==i)continue;let s=w.get(e,r,i,t);o+=s}}x.set(o*S,e,n,r,t)}return n.makeTensorInfo(x.shape,x.dtype,x.values)}var ak={kernelName:$e,backendName:`cpu`,kernelFunc:ik};function ok(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,scale:a,offset:o,mean:s,variance:c}=t;O(s.shape.length===c.shape.length,()=>`Batch normalization gradient requires mean and variance to have equal ranks.`),O(o==null||s.shape.length===o.shape.length,()=>`Batch normalization gradient requires mean and offset to have equal ranks.`),O(a==null||s.shape.length===a.shape.length,()=>`Batch normalization gradient requires mean and scale to have equal ranks.`),X([i,s,c,a,o],`batchNorm`);let{varianceEpsilon:l}=r;l==null&&(l=.001);let u=n.data.get(i.dataId).values,d=n.data.get(s.dataId).values,f=n.data.get(c.dataId).values,p=a?n.data.get(a.dataId).values:new Float32Array([1]),m=o?n.data.get(o.dataId).values:new Float32Array([0]),h=new Float32Array(u.length),g=m.length,_=p.length,v=f.length,y=d.length,b=0,x=0,S=0,C=0;for(let e=0;e<u.length;++e)h[e]=m[b++]+(u[e]-d[x++])*p[S++]/Math.sqrt(f[C++]+l),b>=g&&(b=0),x>=y&&(x=0),S>=_&&(S=0),C>=v&&(C=0);return n.makeTensorInfo(i.shape,i.dtype,h)}var sk={kernelName:Wt,backendName:`cpu`,kernelFunc:ok};function ck(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,crops:o}=r;X([i],`batchToSpaceND`);let s=a.reduce((e,t)=>e*t),c=ch(i.shape,a,s),l=lh(c.length,a.length),u=uh(i.shape,a,s),d=dh(o,a.length),f=fh(u,o,a.length),p=TO({inputs:{x:i},backend:n,attrs:{shape:c}}),m=pD({inputs:{x:p},backend:n,attrs:{perm:l}}),h=TO({inputs:{x:m},backend:n,attrs:{shape:u}}),g=VD({inputs:{x:h},backend:n,attrs:{begin:d,size:f}});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),g}var lk={kernelName:rt,backendName:`cpu`,kernelFunc:ck};function uk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o}=r,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,l=vE(s,c,a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,l)}var dk={kernelName:it,backendName:`cpu`,kernelFunc:uk};function fk(e){let{inputs:t,backend:n}=e,{s0:r,s1:i}=t,a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,s=W(Array.from(a),Array.from(o));return n.makeTensorInfo([s.length],`int32`,Int32Array.from(s))}var pk={kernelName:st,backendName:`cpu`,kernelFunc:fk},mk={kernelName:ut,backendName:`cpu`,kernelFunc:CE(ut,(e,t)=>{let n=t;return e>n.clipValueMax?n.clipValueMax:e<n.clipValueMin?n.clipValueMin:e})},hk={kernelName:ft,backendName:`cpu`,kernelFunc:e=>{let{x:t}=e.inputs,n=e.backend,r=new Float32Array(k(t.shape)),i=n.data.get(t.dataId),a=i.complexTensorInfos.real,o=i.complexTensorInfos.imag,s=n.data.get(a.dataId).values,c=n.data.get(o.dataId).values;for(let e=0;e<s.length;e++){let t=s[e],n=c[e];r[e]=Math.hypot(t,n)}return n.makeOutput(r,t.shape,`float32`)}};function gk(e){let{inputs:t,backend:n}=e,{input:r}=t,i=n.data.get(r.dataId).complexTensorInfos.imag,a=n.data.get(i.dataId).values;return n.makeTensorInfo(i.shape,i.dtype,a)}var _k={kernelName:Zt,backendName:`cpu`,kernelFunc:gk};function vk(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r,a=j(i,t[0].shape)[0];$m(t.map(e=>e.shape),a);let o=eh(t.map(e=>e.shape),a);if(k(o)===0)return n.makeTensorInfo(o,t[0].dtype,[]);let s=t.filter(e=>k(e.shape)>0);if(s.length===1)return oE({inputs:{x:s[0]},backend:n});if(s[0].dtype===`complex64`){let e=s.map(e=>cE({inputs:{input:e},backend:n})),t=s.map(e=>gk({inputs:{input:e},backend:n})),r=vk({inputs:e,backend:n,attrs:{axis:a}}),i=vk({inputs:t,backend:n,attrs:{axis:a}}),o=rE({inputs:{real:r,imag:i},backend:n});return e.forEach(e=>n.disposeIntermediateTensorInfo(e)),t.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(i),o}let c=s.map(e=>{let t=[-1,k(e.shape.slice(a))];return TO({inputs:{x:e},backend:n,attrs:{shape:t}})}),l=c.map(e=>({vals:n.data.get(e.dataId).values,shape:e.shape}));o=eh(c.map(e=>e.shape),1);let u=c[0].shape[0]===1,d=DE(l,o,t[0].dtype,u),f=eh(s.map(e=>e.shape),a),p=n.makeTensorInfo(f,t[0].dtype,d);return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}var yk={kernelName:pt,backendName:`cpu`,kernelFunc:vk};function bk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dataFormat:c,dilations:l,dimRoundingMode:u}=r;X([i,a],`conv2d`);let d=ys(c),f=as(i.shape,a.shape,o,l,s,u,!1,d),p=f.filterHeight,m=f.filterWidth,h=f.dilationHeight,g=f.dilationWidth,_=f.padInfo.left,v=f.padInfo.top,y=f.dataFormat===`channelsLast`,b=new Ni(f.outShape,i.dtype),x=M(i.shape),S=M(a.shape),C=x[0],w=y?x[1]:x[2],T=y?x[2]:1,E=y?1:x[1],D=b.strides[0],O=y?b.strides[1]:b.strides[2],ee=y?b.strides[2]:1,te=y?1:b.strides[1],k=n.data.get(i.dataId).values,A=n.data.get(a.dataId).values,ne=b.values;for(let e=0;e<f.batchSize;++e){let t=e*C,n=e*D;for(let e=0;e<f.outHeight;++e){let r=n+e*O,i=e*f.strideHeight-v;for(let e=0;e<p;++e){let n=i+e*h;if(n<0||n>=f.inHeight)continue;let a=e*S[0],o=t+n*w;for(let e=0;e<f.outWidth;++e){let t=r+e*ee,n=e*f.strideWidth-_;for(let e=0;e<m;++e){let r=n+e*g;if(r<0||r>=f.inWidth)continue;let i=a+e*S[1],s=o+r*T,c=i;for(let e=0;e<f.inChannels;++e){let n=k[s+e*E];for(let e=0;e<f.outChannels;++e)ne[t+e*te]+=n*A[c+e];c+=f.outChannels}}}}}}return n.makeTensorInfo(b.shape,b.dtype,ne)}var xk={kernelName:mt,backendName:`cpu`,kernelFunc:bk};function Sk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,dataFormat:c,dimRoundingMode:l,filterShape:u}=r;X([i,a],`conv2dBackpropFilter`);let d=ys(c),f=as(i.shape,u,o,1,s,l,!1,d),{strideHeight:p,strideWidth:m,filterHeight:h,filterWidth:g}=f,_=f.dataFormat===`channelsLast`,v=new Ni(f.filterShape,`float32`),y=f.padInfo.left,b=f.padInfo.top,x=n.data.get(i.dataId).values,S=n.data.get(a.dataId).values,C=new Ni(i.shape,i.dtype,x),w=new Ni(a.shape,a.dtype,S);for(let e=0;e<h;++e){let t=Math.max(0,Math.ceil((b-e)/p)),n=Math.min(f.outHeight,(f.inHeight+b-e)/p);for(let r=0;r<g;++r){let i=Math.max(0,Math.ceil((y-r)/m)),a=Math.min(f.outWidth,(f.inWidth+y-r)/m);for(let o=0;o<f.inChannels;++o)for(let s=0;s<f.outChannels;++s){let c=0;for(let l=0;l<f.batchSize;++l)for(let u=t;u<n;++u){let t=e+u*p-b;for(let e=i;e<a;++e){let n=r+e*m-y;_?c+=C.get(l,t,n,o)*w.get(l,u,e,s):c+=C.get(l,o,t,n)*w.get(l,s,u,e)}}v.set(c,e,r,o,s)}}}return n.makeTensorInfo(v.shape,v.dtype,v.values)}var Ck={kernelName:ht,backendName:`cpu`,kernelFunc:Sk};function wk(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{inputShape:o,strides:s,pad:c,dataFormat:l,dimRoundingMode:u}=r;X([i,a],`conv2dBackpropInput`);let d=M(a.shape),f=M(i.shape),p=ys(l),m=as(o,a.shape,s,1,c,u,!1,p),h=new Ni(m.inShape,`float32`),g=h.values,_=n.data.get(i.dataId).values,v=n.data.get(a.dataId).values,[y,b,x]=d,{batchSize:S,filterHeight:C,filterWidth:w,inChannels:T,inHeight:E,inWidth:D,outChannels:O,outHeight:ee,outWidth:te,strideHeight:k,strideWidth:A}=m;p=m.dataFormat;let ne=C-1-m.padInfo.top,re=w-1-m.padInfo.left,ie=p===`channelsLast`,ae=h.strides[0],oe=ie?h.strides[1]:h.strides[2],j=ie?h.strides[2]:1,se=ie?1:h.strides[1],ce=f[0],le=ie?f[1]:f[2],ue=ie?f[2]:1,de=ie?1:f[1];for(let e=0;e<S;++e)for(let t=0;t<T;++t)for(let n=0;n<E;++n){let r=n-ne,i=Math.max(0,Math.ceil(r/k)),a=Math.min(ee,(C+r)/k);for(let o=0;o<D;++o){let s=o-re,c=Math.max(0,Math.ceil(s/A)),l=Math.min(te,(w+s)/A),u=0;for(let n=i;n<a;++n){let i=n*k-r;for(let r=c;r<l;++r){let a=r*A-s,o=ce*e+le*n+ue*r,c=y*(C-1-i)+b*(w-1-a)+x*t;for(let e=0;e<O;++e){let t=_[o+de*e],n=v[c+e];u+=t*n}}}let d=ae*e+oe*n+j*o+se*t;g[d]=u}}return n.makeTensorInfo(h.shape,h.dtype,h.values)}var Tk={kernelName:gt,backendName:`cpu`,kernelFunc:wk};function Ek(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r;X([i,a],`conv3d`);let l=os(i.shape,a.shape,o,c,s),{filterDepth:u,filterHeight:d,filterWidth:f,dilationDepth:p,dilationHeight:m,dilationWidth:h,padInfo:g}=l,_=g.front,v=g.left,y=g.top,b=new Ni(l.outShape,i.dtype),x=n.data.get(i.dataId).values,S=n.data.get(a.dataId).values,C=b.values,w=M(i.shape),T=M(a.shape);for(let e=0;e<l.batchSize;++e){let t=e*w[0],n=e*b.strides[0];for(let e=0;e<l.outDepth;++e){let r=n+e*b.strides[1],i=e*l.strideDepth-_;for(let e=0;e<u;++e){let n=i+e*p;if(n<0||n>=l.inDepth)continue;let a=e*T[0],o=t+n*w[1];for(let e=0;e<l.outHeight;++e){let t=r+e*b.strides[2],n=e*l.strideHeight-y;for(let e=0;e<d;++e){let r=n+e*m;if(r<0||r>=l.inHeight)continue;let i=a+e*T[1],s=o+r*w[2];for(let e=0;e<l.outWidth;++e){let n=t+e*l.outChannels,r=e*l.strideWidth-v;for(let e=0;e<f;++e){let t=r+e*h;if(t<0||t>=l.inWidth)continue;let a=i+e*T[2],o=s+t*l.inChannels,c=a;for(let e=0;e<l.inChannels;++e){let t=x[o+e];for(let e=0;e<l.outChannels;++e)C[n+e]+=t*S[c+e];c+=l.outChannels}}}}}}}}return n.makeTensorInfo(b.shape,b.dtype,b.values)}var Dk={kernelName:_t,backendName:`cpu`,kernelFunc:Ek};function Ok(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,filterShape:c}=r;X([i,a],`conv3dBackpropFilterV2`);let l=M(i.shape),u=M(a.shape),d=os(i.shape,c,o,1,s),f=d.strideDepth,p=d.strideHeight,m=d.strideWidth,h=d.filterDepth,g=d.filterHeight,_=d.filterWidth,v=new Ni(d.filterShape,`float32`),y=v.values,[b,x,S,C]=v.strides,w=n.data.get(a.dataId).values,[T,E,D,O]=u,ee=n.data.get(i.dataId).values,[te,k,A,ne]=l,re=d.padInfo.front,ie=d.padInfo.left,ae=d.padInfo.top;for(let e=0;e<h;++e){let t=Math.max(0,Math.ceil((re-e)/f)),n=Math.min(d.outDepth,(d.inDepth+re-e)/f),r=e*b;for(let i=0;i<g;++i){let a=Math.max(0,Math.ceil((ae-i)/p)),o=Math.min(d.outHeight,(d.inHeight+ae-i)/p),s=i*x+r;for(let r=0;r<_;++r){let c=Math.max(0,Math.ceil((ie-r)/m)),l=Math.min(d.outWidth,(d.inWidth+ie-r)/m),u=r*S+s;for(let s=0;s<d.inChannels;++s){let h=s*C+u;for(let u=0;u<d.outChannels;++u){let g=0;for(let h=0;h<d.batchSize;++h){let d=h*te,_=h*T;for(let h=t;h<n;++h){let t=(e+h*f-re)*k+d,n=h*E+_;for(let e=a;e<o;++e){let a=(i+e*p-ae)*A+t,o=e*D+n;for(let e=c;e<l;++e){let t=(r+e*m-ie)*ne+a,n=e*O+o;g+=ee[t+s]*w[n+u]}}}}y[h+u]=g}}}}}return n.makeTensorInfo(v.shape,v.dtype,v.values)}var kk={kernelName:vt,backendName:`cpu`,kernelFunc:Ok};function Ak(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{pad:o,strides:s,inputShape:c}=r;X([i],`conv3dBackpropInputV2`);let l=M(i.shape),u=M(a.shape),d=os(c,a.shape,s,1,o),f=new Ni(d.inShape,`float32`),p=f.values,[m,h,g,_]=f.strides,v=n.data.get(i.dataId).values,[y,b,x,S]=l,C=n.data.get(a.dataId).values,[w,T,E,D]=u,{batchSize:O,filterDepth:ee,filterHeight:te,filterWidth:k,inChannels:A,inDepth:ne,inHeight:re,inWidth:ie,outChannels:ae,outDepth:oe,outHeight:j,outWidth:se,strideDepth:ce,strideHeight:le,strideWidth:ue}=d,de=ee-1-d.padInfo.front,fe=te-1-d.padInfo.top,pe=k-1-d.padInfo.left;for(let e=0;e<O;++e)for(let t=0;t<A;++t)for(let n=0;n<ne;++n){let r=n-de,i=Math.max(0,Math.ceil(r/ce)),a=Math.min(oe,(ee+r)/ce);for(let o=0;o<re;++o){let s=o-fe,c=Math.max(0,Math.ceil(s/le)),l=Math.min(j,(te+s)/le);for(let u=0;u<ie;++u){let d=u-pe,f=Math.max(0,Math.ceil(d/ue)),O=Math.min(se,(k+d)/ue),A=0;for(let n=i;n<a;++n){let i=n*ce-r;for(let r=c;r<l;++r){let a=r*le-s;for(let o=f;o<O;++o){let s=o*ue-d,c=y*e+b*n+x*r+S*o,l=w*(ee-1-i)+T*(te-1-a)+E*(k-1-s)+D*t;for(let e=0;e<ae;++e){let t=v[c+e],n=C[l+e];A+=t*n}}}}p[m*e+h*n+g*o+_*u+t]=A}}}return n.makeTensorInfo(f.shape,f.dtype,f.values)}var jk={kernelName:yt,backendName:`cpu`,kernelFunc:Ak},Mk={kernelName:`Cos`,backendName:`cpu`,kernelFunc:CE(`Cos`,e=>Math.cos(e))},Nk={kernelName:bt,backendName:`cpu`,kernelFunc:CE(bt,e=>Math.cosh(e))};function Pk(e){let{inputs:t,backend:n,attrs:r}=e,{image:i,boxes:a,boxInd:o}=t,{cropSize:s,method:c,extrapolationValue:l}=r,[u,d,f,p]=i.shape,m=a.shape[0],[h,g]=s,_=So([m,h,g,p],`float32`),v=n.data.get(a.dataId).values,y=n.data.get(o.dataId).values,b=n.data.get(i.dataId).values,x=M(i.shape),S=M(_.shape);for(let e=0;e<m;e++){let t=e*4,n=v[t],r=v[t+1],i=v[t+2],a=v[t+3],o=y[e];if(o>=u)continue;let s=h>1?(i-n)*(d-1)/(h-1):0,m=g>1?(a-r)*(f-1)/(g-1):0;for(let t=0;t<h;t++){let u=h>1?n*(d-1)+t*s:.5*(n+i)*(d-1);if(u<0||u>d-1){for(let n=0;n<g;n++)for(let r=0;r<p;r++){let i=r+n*S[2]+t*S[1]+e*S[0];_.values[i]=l}continue}if(c===`bilinear`){let n=Math.floor(u),i=Math.ceil(u),s=u-n;for(let c=0;c<g;c++){let u=g>1?r*(f-1)+c*m:.5*(r+a)*(f-1);if(u<0||u>f-1){for(let n=0;n<p;n++){let r=n+c*S[2]+t*S[1]+e*S[0];_.values[r]=l}continue}let d=Math.floor(u),h=Math.ceil(u),v=u-d;for(let r=0;r<p;r++){let a=r+d*x[2]+n*x[1]+o*x[0],l=b[a];a=r+h*x[2]+n*x[1]+o*x[0];let u=b[a];a=r+d*x[2]+i*x[1]+o*x[0];let f=b[a];a=r+h*x[2]+i*x[1]+o*x[0];let p=b[a],m=l+(u-l)*v,g=f+(p-f)*v;a=r+c*S[2]+t*S[1]+e*S[0],_.values[a]=m+(g-m)*s}}}else for(let n=0;n<g;++n){let i=g>1?r*(f-1)+n*m:.5*(r+a)*(f-1);if(i<0||i>f-1){for(let r=0;r<p;r++){let i=r+n*S[2]+t*S[1]+e*S[0];_.values[i]=l}continue}let s=Math.round(i),c=Math.round(u);for(let r=0;r<p;r++){let i=r+s*x[2]+c*x[1]+o*x[0],a=r+n*S[2]+t*S[1]+e*S[0];_.values[a]=b[i]}}}}return n.makeTensorInfo(_.shape,_.dtype,_.values)}var Fk={kernelName:Ct,backendName:`cpu`,kernelFunc:Pk};function Ik(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;X(i,`cumprod`);let c=ll([a],i.shape.length),l=i;c!=null&&(l=pD({inputs:{x:i},backend:n,attrs:{perm:c}}));let u=dl(1,i.shape.length)[0];if(u!==l.shape.length-1)throw Error(`backend.cumprod in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let d=Ki(l.dtype,`int32`),f=we(k(l.shape),d),p=n.data.get(l.dataId).values,m=l.shape[l.shape.length-1],h=s?(e,t)=>e+m-t-1:(e,t)=>e+t;for(let e=0;e<p.length;e+=m)for(let t=0;t<m;t++){let n=h(e,t);if(t===0)f[n]=o?1:p[n];else{let r=h(e,t-1);f[n]=o?p[r]*f[r]:p[n]*f[r]}}let g=n.makeTensorInfo(l.shape,d,f);if(c!=null){let e=ul(c),t=pD({inputs:{x:g},backend:n,attrs:{perm:e}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(l),t}return g}var Lk={kernelName:xt,backendName:`cpu`,kernelFunc:Ik};function Rk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;X(i,`cumsum`);let c=ll([a],i.shape.length),l=i;c!=null&&(l=pD({inputs:{x:i},backend:n,attrs:{perm:c}}));let u=dl(1,i.shape.length)[0];if(u!==l.shape.length-1)throw Error(`backend.cumsum in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let d=Ki(l.dtype,`int32`),f=Te(k(l.shape),d),p=n.data.get(l.dataId).values,m=l.shape[l.shape.length-1],h=s?(e,t)=>e+m-t-1:(e,t)=>e+t;for(let e=0;e<p.length;e+=m)for(let t=0;t<m;t++){let n=h(e,t);if(t===0)f[n]=o?0:p[n];else{let r=h(e,t-1);f[n]=o?p[r]+f[r]:p[n]+f[r]}}let g=n.makeTensorInfo(l.shape,d,f);if(c!=null){let e=ul(c),t=pD({inputs:{x:g},backend:n,attrs:{perm:e}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(l),t}return g}var zk={kernelName:St,backendName:`cpu`,kernelFunc:Rk};function Bk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o,binaryOutput:s}=r;if(i.shape.length===1){let e=n.data.get(i.dataId).values,t=n.data.get(a.dataId).values,r=vE(e,t,a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,r)}else if(i.shape.length===2){let e=yE(n.bufferSync(i),n.bufferSync(a),o,s);return n.makeTensorInfo(e.shape,a.dtype,e.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${i.shape.length}.`)}var Vk={kernelName:wt,backendName:`cpu`,kernelFunc:Bk};function Hk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockSize:a,dataFormat:o}=r;O(o===`NHWC`,()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${o}`);let s=i.shape[0],c=i.shape[1],l=i.shape[2],u=i.shape[3],d=c*a,f=l*a,p=u/(a*a),m=n.data.get(i.dataId).values,h=new Float32Array(s*d*f*p),g=0;for(let e=0;e<s;++e)for(let t=0;t<d;++t){let n=Math.floor(t/a),r=t%a;for(let t=0;t<f;++t){let i=Math.floor(t/a),o=t%a,s=(r*a+o)*p;for(let t=0;t<p;++t){let r=t+s+u*(i+l*(n+c*e));h[g++]=m[r]}}}return n.makeTensorInfo([s,d,f,p],i.dtype,h)}var Uk={kernelName:Tt,backendName:`cpu`,kernelFunc:Hk};function Wk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c,dimRoundingMode:l}=r;X([i,a],`depthwiseConv2DNative`);let u=M(i.shape),d=M(a.shape),f=c;f==null&&(f=[1,1]),O(_s(o,f),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${o} and dilations '${f}'`);let p=as(i.shape,a.shape,o,f,s,l,!0),{filterHeight:m,filterWidth:h,dilationHeight:g,dilationWidth:_,padInfo:v}=p,y=v.left,b=v.top,x=p.outChannels/p.inChannels,S=new Ni(p.outShape,i.dtype),C=n.data.get(i.dataId).values,w=n.data.get(a.dataId).values,T=S.values;for(let e=0;e<p.batchSize;++e){let t=e*u[0],n=e*S.strides[0];for(let e=0;e<p.outHeight;++e){let r=n+e*S.strides[1],i=e*p.strideHeight-b;for(let e=0;e<m;++e){let n=i+e*g;if(n<0||n>=p.inHeight)continue;let a=e*d[0],o=t+n*u[1];for(let e=0;e<p.outWidth;++e){let t=r+e*S.strides[2],n=e*p.strideWidth-y;for(let e=0;e<h;++e){let r=n+e*_;if(r<0||r>=p.inWidth)continue;let i=a+e*d[1],s=o+r*p.inChannels,c=t,l=i;for(let e=0;e<p.inChannels;++e){let t=C[s+e];for(let e=0;e<x;++e)T[c+e]+=t*w[l+e];c+=x,l+=x}}}}}}return n.makeTensorInfo(S.shape,S.dtype,S.values)}var Gk={kernelName:Et,backendName:`cpu`,kernelFunc:Wk};function Kk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,filterShape:u}=r;X([i,a],`depthwiseConv2dNativeBackpropFilter`);let d=as(i.shape,u,o,s,c,l,!0),{strideHeight:f,strideWidth:p,filterHeight:m,filterWidth:h}=d,g=new Ni(d.filterShape,`float32`),_=d.padInfo.left,v=d.padInfo.top,y=d.outChannels/d.inChannels,b=n.data.get(i.dataId).values,x=new Ni(i.shape,i.dtype,b),S=n.data.get(a.dataId).values,C=new Ni(a.shape,a.dtype,S);for(let e=0;e<m;++e){let t=Math.max(0,Math.ceil((v-e)/f)),n=Math.min(d.outHeight,(d.inHeight+v-e)/f);for(let r=0;r<h;++r){let i=Math.max(0,Math.ceil((_-r)/p)),a=Math.min(d.outWidth,(d.inWidth+_-r)/p);for(let o=0;o<d.outChannels;++o){let s=Math.trunc(o/y),c=o%y,l=0;for(let c=0;c<d.batchSize;++c)for(let u=t;u<n;++u){let t=e+u*f-v;for(let e=i;e<a;++e){let n=r+e*p-_;l+=x.get(c,t,n,s)*C.get(c,u,e,o)}}g.set(l,e,r,s,c)}}}return n.makeTensorInfo(g.shape,g.dtype,g.values)}var qk={kernelName:Dt,backendName:`cpu`,kernelFunc:Kk};function Jk(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,inputShape:u}=r;X([i,a],`depthwiseConv2DNativeBackpropInput`);let d=M(i.shape),f=M(a.shape),p=as(u,a.shape,o,s,c,l,!0),m=new Ni(p.inShape,`float32`),h=m.values,[g,_,v]=m.strides,y=n.data.get(i.dataId).values,[b,x,S]=d,C=n.data.get(a.dataId).values,[w,T,E]=f,{batchSize:D,filterHeight:O,filterWidth:ee,inChannels:te,inHeight:k,inWidth:A,outChannels:ne,outHeight:re,outWidth:ie,strideHeight:ae,strideWidth:oe}=p,j=O-1-p.padInfo.top,se=ee-1-p.padInfo.left,ce=ne/te;for(let e=0;e<D;++e)for(let t=0;t<te;++t)for(let n=0;n<k;++n){let r=n-j,i=Math.max(0,Math.ceil(r/ae)),a=Math.min(re,(O+r)/ae);for(let o=0;o<A;++o){let s=o-se,c=Math.max(0,Math.ceil(s/oe)),l=Math.min(ie,(ee+s)/oe),u=0;for(let n=i;n<a;++n){let i=n*ae-r;for(let r=c;r<l;++r){let a=r*oe-s,o=b*e+x*n+S*r,c=w*(O-1-i)+T*(ee-1-a)+E*t;for(let e=0;e<ce;++e){let n=y[o+(t*ce+e)],r=C[c+e];u+=n*r}}}h[g*e+_*n+v*o+t]=u}}return n.makeTensorInfo(m.shape,m.dtype,m.values)}var Yk={kernelName:Ot,backendName:`cpu`,kernelFunc:Jk};function Xk(e){let{inputs:t,backend:n}=e,{x:r}=t,i=k(r.shape),a=n.data.get(r.dataId).values,o=So([i,i],r.dtype),s=o.values;for(let e=0;e<a.length;e++)s[e*i+e]=a[e];let c=[...r.shape,...r.shape];return n.makeTensorInfo(c,o.dtype,o.values)}var Zk={kernelName:kt,backendName:`cpu`,kernelFunc:Xk},Qk={kernelName:At,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r,filter:i}=e,{strides:a,pad:o,dilations:s}=n,c=t,l=c.data.get(r.dataId).values,u=r.shape.length,d=c.data.get(i.dataId).values,f=i.shape.length,{batchSize:p,inHeight:m,inWidth:h,inChannels:g,outHeight:_,outWidth:v,padInfo:y,strideHeight:b,strideWidth:x,filterHeight:S,filterWidth:C,dilationHeight:w,dilationWidth:T,outShape:E}=ns(r.shape,i.shape,a,o,`NHWC`,s),D=k(E),O=E.length,ee=le(r.dtype,D);for(let e=0;e<p;++e)for(let t=0;t<_;++t){let n=t*b-y.top;for(let a=0;a<v;++a){let o=a*x-y.left;for(let s=0;s<g;++s){let c=-(2**53-1);for(let t=0;t<S;++t){let a=n+t*w;if(a>=0&&a<m)for(let n=0;n<C;++n){let p=o+n*T;if(p>=0&&p<h){let o=Oe([e,a,p,s],u,M(r.shape)),m=Oe([t,n,s],f,M(i.shape)),h=l[o]+d[m];h>c&&(c=h)}}}let p=Oe([e,t,a,s],O,M(E));ee[p]=c}}}return{dataId:c.write(pi(ee,r.dtype),E,r.dtype),shape:E,dtype:r.dtype}}},$k={kernelName:Mt,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r,filter:i,dy:a}=e,{strides:o,pad:s,dilations:c}=n,l=t,u=Se(r.shape,l.data.get(r.dataId).values),d=Se(i.shape,l.data.get(i.dataId).values),{batchSize:f,inHeight:p,inWidth:m,inChannels:h,outHeight:g,outWidth:_,padInfo:v,strideHeight:y,strideWidth:b,filterHeight:x,filterWidth:S,dilationHeight:C,dilationWidth:w,outShape:T}=ns(r.shape,i.shape,o,s,`NHWC`,c);O(a.rank===T.length,()=>`Error in ${Mt}, dy must have the same rank as output ${T.length}, but got ${a.rank}`);let E=Se(T,l.data.get(a.dataId).values),D=Ee(i.shape,i.dtype);for(let e=0;e<f;++e)for(let t=0;t<g;++t){let n=t*y-v.top;for(let r=0;r<_;++r){let i=r*b-v.left;for(let a=0;a<h;++a){let o=-(2**53-1),s=0,c=0;for(let t=0;t<x;++t){let r=n+t*C;if(r>=0&&r<p)for(let n=0;n<S;++n){let l=i+n*w;if(l>=0&&l<m){let i=u[e][r][l][a]+d[t][n][a];i>o&&(o=i,s=t,c=n)}}}D[s][c][a]+=E[e][t][r][a]}}}return{dataId:l.write(pi(D,r.dtype),i.shape,i.dtype),shape:i.shape,dtype:i.dtype}}},eA={kernelName:jt,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r,filter:i,dy:a}=e,{strides:o,pad:s,dilations:c}=n,l=t,u=Se(r.shape,l.data.get(r.dataId).values),d=Se(i.shape,l.data.get(i.dataId).values),{batchSize:f,inHeight:p,inWidth:m,inChannels:h,outHeight:g,outWidth:_,padInfo:v,strideHeight:y,strideWidth:b,filterHeight:x,filterWidth:S,dilationHeight:C,dilationWidth:w,outShape:T}=ns(r.shape,i.shape,o,s,`NHWC`,c);O(a.rank===T.length,()=>`Error in ${jt}, dy must have the same rank as output ${T.length}, but got ${a.rank}`);let E=Se(T,l.data.get(a.dataId).values),D=Ee(r.shape,r.dtype);for(let e=0;e<f;++e)for(let t=0;t<g;++t){let n=t*y-v.top;for(let r=0;r<_;++r){let i=r*b-v.left;for(let a=0;a<h;++a){let o=-(2**53-1),s=n<0?0:n,c=i<0?0:i;for(let t=0;t<x;++t){let r=n+t*C;if(r>=0&&r<p)for(let n=0;n<S;++n){let l=i+n*w;if(l>=0&&l<m){let i=u[e][r][l][a]+d[t][n][a];i>o&&(o=i,s=r,c=l)}}}D[e][s][c][a]+=E[e][t][r][a]}}}return{dataId:l.write(pi(D,r.dtype),r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};function tA(e){let{inputs:t,backend:n,attrs:r}=e,{image:i}=t,{canvas:a,options:o}=r,{contextOptions:s,imageOptions:c}=o||{},l=(c==null?void 0:c.alpha)||1,u=(s==null?void 0:s.contextType)||`2d`;if(u!==`2d`)throw Error(`Context type ${s.contextType} is not supported by the CPU backend.`);let d=a.getContext(u,(s==null?void 0:s.contextAttributes)||{});if(d==null)throw Error(`Could not get the context with ${u} type.`);let[f,p]=i.shape.slice(0,2),m=i.shape.length===2?1:i.shape[2],h=n.data.get(i.dataId).values,g=i.dtype===`float32`?255:1,_=new Uint8ClampedArray(p*f*4);for(let e=0;e<f*p;++e){let t=[0,0,0,255*l];for(let n=0;n<m;n++){let r=h[e*m+n];if(i.dtype===`float32`){if(r<0||r>1)throw Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${r}.`)}else if(i.dtype===`int32`&&(r<0||r>255))throw Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${r}.`);m===1?(t[0]=r*g,t[1]=r*g,t[2]=r*g):t[n]=r*g}let n=e*4;_[n+0]=Math.round(t[0]),_[n+1]=Math.round(t[1]),_[n+2]=Math.round(t[2]),_[n+3]=Math.round(t[3])}a.width=p,a.height=f;let v=new ImageData(_,p,f);return d.putImageData(v,0,0),i}var nA={kernelName:Nt,backendName:`cpu`,kernelFunc:tA};function rA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;X(i,`sum`);let s;s=i.dtype===`bool`?dE({inputs:{x:i},backend:n,attrs:{dtype:`int32`}}):oE({inputs:{x:i},backend:n});let c=s.shape.length,l=j(a,s.shape),u=ll(l,c),d=l,f=s;u!=null&&(f=pD({inputs:{x:s},backend:n,attrs:{perm:u}}),d=dl(d.length,c)),cl(`sum`,d,f.shape.length);let[p,m]=ol(f.shape,d),h=aE(n,p,Ki(f.dtype,`int32`)),g=k(m),_=n.data.get(h.dataId).values,v=n.data.get(f.dataId).values;for(let e=0;e<_.length;++e){let t=e*g,n=0;for(let e=0;e<g;++e)n+=v[t+e];_[e]=n}if(o){let e=sl(h.shape,l),t=h;h=TO({inputs:{x:h},backend:n,attrs:{shape:e}}),n.disposeIntermediateTensorInfo(t)}return n.disposeIntermediateTensorInfo(s),u!=null&&n.disposeIntermediateTensorInfo(f),h}var iA={kernelName:`Sum`,backendName:`cpu`,kernelFunc:rA};function aA(e){let{inputs:t,backend:n,attrs:r}=e,{equation:i}=r,a=t,{allDims:o,summedDims:s,idDims:c}=Nh(i,a.length);Fh(o.length,c,a);let{path:l,steps:u}=Ih(s,c),d=u.length,f=null,p=o.length,m=[];for(let e=0;e<d;++e){for(let t of u[e]){let{permutationIndices:e,expandDims:r}=Ph(p,c[t]),i;Lh(e)?i=a[t]:(i=pD({inputs:{x:a[t]},backend:n,attrs:{perm:e}}),m.push(i));let o=i.shape.slice();for(let e=0;e<r.length;++e)o.splice(r[e],0,1);A(i.shape,o)||(i=TO({inputs:{x:i},backend:n,attrs:{shape:o}}),m.push(i)),f===null?f=i:(f=aD({inputs:{a:i,b:f},backend:n}),m.push(f))}e<d-1&&(l[e]>=0&&(f=rA({inputs:{x:f},backend:n,attrs:{axis:l[e]-(o.length-p),keepDims:!1}}),m.push(f)),p--)}for(let e of m)e!==f&&n.disposeIntermediateTensorInfo(e);return f}var oA={kernelName:Ft,backendName:`cpu`,kernelFunc:aA};function sA(e){let{inputs:t,backend:n}=e,{dy:r,y:i}=t;X([r,i],`eluGrad`);let a=new Float32Array(k(i.shape)),o=n.data.get(i.dataId).values,s=n.data.get(r.dataId).values;for(let e=0;e<o.length;++e){let t=o[e];t>=0?a[e]=s[e]:a[e]=s[e]*(t+1)}return n.makeTensorInfo(i.shape,`float32`,a)}var cA={kernelName:It,backendName:`cpu`,kernelFunc:sA},lA=hh,uA=gh,dA=_h,fA=vh,pA=yh,mA=bh,hA={kernelName:`Erf`,backendName:`cpu`,kernelFunc:CE(`Erf`,e=>{let t=Math.sign(e),n=Math.abs(e),r=1/(1+lA*n);return t*(1-((((mA*r+pA)*r+fA)*r+dA)*r+uA)*r*Math.exp(-n*n))})};function gA(e){let{inputs:t,backend:n,attrs:r}=e,{input:i}=t,{dim:a}=r,o=i.shape.length,s=i.shape.slice(),c=a;return a<0&&(O(-(o+1)<=a,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),c=o+a+1),s.splice(c,0,1),TO({inputs:{x:i},backend:n,attrs:{shape:s}})}var _A={kernelName:Rt,backendName:`cpu`,kernelFunc:gA},vA=pE(Pt,nE((e,t)=>e/t)),yA={kernelName:Pt,backendName:`cpu`,kernelFunc:vA};function bA(e,t,n){let r=e.shape,i=r[0],a=r[1],o=n.data.get(e.dataId),s=o.complexTensorInfos.real,c=o.complexTensorInfos.imag,l=[i,a],u=k(l),d=ce(`float32`,u),f=ce(`float32`,u);for(let e=0;e<i;e++){let r=VD({inputs:{x:s},backend:n,attrs:{begin:[e,0],size:[1,a]}}),i=VD({inputs:{x:c},backend:n,attrs:{begin:[e,0],size:[1,a]}}),o=rE({inputs:{real:r,imag:i},backend:n}),{real:l,imag:u}=xA(o,t,n),p=xh(l,u);for(let t=0;t<a;t++){let n=Th(p,t);d[e*a+t]=n.real,f[e*a+t]=n.imag}n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(o)}let p=n.makeTensorInfo(l,`float32`,d),m=n.makeTensorInfo(l,`float32`,f),h=rE({inputs:{real:p,imag:m},backend:n});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),h}function xA(e,t,n){let r=k(e.shape),i=n.data.get(e.dataId),a=n.data.get(i.complexTensorInfos.real.dataId).values,o=n.data.get(i.complexTensorInfos.imag.dataId).values;if(SA(r)){let i=CA(a,o,r,t,n),s=[e.shape[0],e.shape[1]];if(t){let e=n.makeTensorInfo(s,`float32`,i.real),t=n.makeTensorInfo(s,`float32`,i.imag),a=n.makeTensorInfo([],`float32`,di(r,`float32`)),o=oE({inputs:{x:a},backend:n}),c=yA.kernelFunc({inputs:{a:e,b:a},backend:n}),l=yA.kernelFunc({inputs:{a:t,b:o},backend:n}),u=n.data.get(c.dataId).values,d=n.data.get(l.dataId).values;return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(l),{real:u,imag:d}}return i}else return Sh(wA(xh(a,o),r,t))}function SA(e){return(e&e-1)==0}function CA(e,t,n,r,i){if(n===1)return{real:e,imag:t};let a=xh(e,t),o=n/2,s=Ch(a),c=s.real,l=s.imag,u=[c.length],d=i.makeTensorInfo(u,`float32`,c),f=i.makeTensorInfo(u,`float32`,l),p=rE({inputs:{real:d,imag:f},backend:i}),m=wh(a),h=m.real,g=m.imag,_=[h.length],v=i.makeTensorInfo(_,`float32`,h),y=i.makeTensorInfo(_,`float32`,g),b=rE({inputs:{real:v,imag:y},backend:i}),x=CA(c,l,o,r,i),S=x.real,C=x.imag,w=[S.length],T=i.makeTensorInfo(w,`float32`,S),E=i.makeTensorInfo(w,`float32`,C),D=rE({inputs:{real:T,imag:E},backend:i}),O=CA(h,g,o,r,i),ee=O.real,te=O.imag,k=[ee.length],A=i.makeTensorInfo(k,`float32`,ee),ne=i.makeTensorInfo(k,`float32`,te),re=rE({inputs:{real:A,imag:ne},backend:i}),ie=Dh(n,r),ae=[ie.real.length],oe=i.makeTensorInfo(ae,`float32`,ie.real),j=i.makeTensorInfo(ae,`float32`,ie.imag),se=rE({inputs:{real:oe,imag:j},backend:i}),ce=aD({inputs:{a:se,b:re},backend:i}),le=gE({inputs:{a:D,b:ce},backend:i}),ue=aO({inputs:{a:D,b:ce},backend:i}),de=cE({inputs:{input:le},backend:i}),fe=cE({inputs:{input:ue},backend:i}),pe=gk({inputs:{input:le},backend:i}),me=gk({inputs:{input:ue},backend:i}),he=vk({inputs:[de,fe],backend:i,attrs:{axis:0}}),ge=vk({inputs:[pe,me],backend:i,attrs:{axis:0}}),_e=i.data.get(he.dataId).values,ve=i.data.get(ge.dataId).values;return i.disposeIntermediateTensorInfo(d),i.disposeIntermediateTensorInfo(f),i.disposeIntermediateTensorInfo(p),i.disposeIntermediateTensorInfo(v),i.disposeIntermediateTensorInfo(y),i.disposeIntermediateTensorInfo(b),i.disposeIntermediateTensorInfo(T),i.disposeIntermediateTensorInfo(E),i.disposeIntermediateTensorInfo(D),i.disposeIntermediateTensorInfo(A),i.disposeIntermediateTensorInfo(ne),i.disposeIntermediateTensorInfo(re),i.disposeIntermediateTensorInfo(oe),i.disposeIntermediateTensorInfo(j),i.disposeIntermediateTensorInfo(se),i.disposeIntermediateTensorInfo(ce),i.disposeIntermediateTensorInfo(le),i.disposeIntermediateTensorInfo(ue),i.disposeIntermediateTensorInfo(de),i.disposeIntermediateTensorInfo(pe),i.disposeIntermediateTensorInfo(fe),i.disposeIntermediateTensorInfo(me),i.disposeIntermediateTensorInfo(he),i.disposeIntermediateTensorInfo(ge),{real:_e,imag:ve}}function wA(e,t,n){let r=new Float32Array(t*2);for(let i=0;i<t;i++){let a=0,o=0;for(let r=0;r<t;r++){let s=Oh(i*r,t,n),c=Th(e,r);a+=c.real*s.real-c.imag*s.imag,o+=c.real*s.imag+c.imag*s.real}n&&(a/=t,o/=t),Eh(r,a,o,i)}return r}function TA(e){let{inputs:t,backend:n}=e,{input:r}=t,i=k(r.shape),a=r.shape[r.shape.length-1],o=i/a,s=TO({inputs:{x:r},backend:n,attrs:{shape:[o,a]}}),c=bA(s,!1,n),l=TO({inputs:{x:c},backend:n,attrs:{shape:r.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(c),l}var EA={kernelName:`FFT`,backendName:`cpu`,kernelFunc:TA};function DA(e){let{backend:t,attrs:n}=e,{shape:r,value:i,dtype:a}=n,o=a||ve(i),s=le(o,k(r));return kA(s,i,o),t.makeTensorInfo(r,o,s)}var OA={kernelName:Bt,backendName:`cpu`,kernelFunc:DA};function kA(e,t,n){e.fill(t)}var AA={kernelName:Vt,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{image:r}=e,i=n,a=ce(r.dtype,k(r.shape)),[o,s,c,l]=r.shape,u=i.data.get(r.dataId).values;for(let e=0;e<o;e++){let t=e*c*s*l;for(let e=0;e<s;e++){let n=c*l*e;for(let e=0;e<c;e++){let r=e*l;for(let i=0;i<l;i++){let o=Math.round(c-e-1),s=t+n+r+i,d=u[s];if(o>=0&&o<c){let e=o*l;d=u[t+n+e+i]}a[s]=d}}}}return{dataId:i.write(a,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};function jA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=r,h=bk({inputs:{x:i,filter:a},backend:n,attrs:{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f}});if(o){let e=h;if(u===`NCHW`&&o.shape.length===1&&o.shape[0]!==1){let e=TO({inputs:{x:o},backend:n,attrs:{shape:[o.shape[0],1,1]}});h=gE({inputs:{a:h,b:e},backend:n}),n.disposeIntermediateTensorInfo(e)}else h=gE({inputs:{a:h,b:o},backend:n});n.disposeIntermediateTensorInfo(e)}if(p){let e=h;if(u===`NCHW`&&p===`prelu`&&s.shape.length===1&&s.shape[0]!==1){let e=TO({inputs:{x:s},backend:n,attrs:{shape:[s.shape[0],1,1]}});h=wO(n,h,p,e,m),n.disposeIntermediateTensorInfo(e)}else h=wO(n,h,p,s,m);n.disposeIntermediateTensorInfo(e)}return h}var MA={kernelName:Pr,backendName:`cpu`,kernelFunc:jA};function NA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=r,h=Wk({inputs:{x:i,filter:a},backend:n,attrs:{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f}});if(o){let e=h;h=gE({inputs:{a:h,b:o},backend:n}),n.disposeIntermediateTensorInfo(e)}if(p){let e=h;h=wO(n,h,p,s,m),n.disposeIntermediateTensorInfo(e)}return h}var PA={kernelName:Fr,backendName:`cpu`,kernelFunc:NA};function FA(e){let{inputs:t,backend:n}=e,{params:r,indices:i}=t,a=k(r.shape),o=i.shape,s=o[o.length-1],[c,l,u,d]=Om(r,i);if(l===0)return n.makeTensorInfo(c,r.dtype,[]);let f=n.data.get(i.dataId).values,p=BE(f,n.bufferSync(r),r.dtype,l,s,u,d,r.shape,a);return n.makeTensorInfo(c,r.dtype,p.values)}var IA={kernelName:Kt,backendName:`cpu`,kernelFunc:FA};function LA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,indices:a}=t,{axis:o,batchDims:s}=r;X([i,a],`gatherV2`);let c=j(o,i.shape)[0],l=n.data.get(a.dataId).values,u=i.shape[c];for(let e=0;e<l.length;++e){let t=l[e];O(t<=u-1&&t>=0,()=>`GatherV2: the index value ${t} is not in [0, ${u-1}]`)}let d=s;s==null&&(d=0);let f=k(a.shape),p=tg(i,a,c,d),m=TO({inputs:{x:i},backend:n,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),h=TO({inputs:{x:a},backend:n,attrs:{shape:[p.batchSize,f/p.batchSize]}}),g=[p.batchSize,p.outerSize,f/p.batchSize,p.sliceSize],_=n.bufferSync(h),v=VE(n.bufferSync(m),_,g);return n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),n.makeTensorInfo(p.outputShape,v.dtype,v.values)}var RA={kernelName:Gt,backendName:`cpu`,kernelFunc:LA};function zA(e){let{inputs:t,backend:n}=e,{input:r}=t,i=k(r.shape),a=r.shape[r.shape.length-1],o=i/a,s=TO({inputs:{x:r},backend:n,attrs:{shape:[o,a]}}),c=bA(s,!0,n),l=TO({inputs:{x:c},backend:n,attrs:{shape:r.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(c),l}var BA={kernelName:Xt,backendName:`cpu`,kernelFunc:zA},VA={kernelName:Qt,backendName:`cpu`,kernelFunc:CE(Qt,e=>+!!Number.isFinite(e),`bool`)},HA={kernelName:$t,backendName:`cpu`,kernelFunc:CE($t,e=>+(Math.abs(e)===1/0),`bool`)},UA={kernelName:en,backendName:`cpu`,kernelFunc:CE(en,e=>+!!Number.isNaN(e),`bool`)};function WA(e){let{backend:t,attrs:n}=e,{start:r,stop:i,num:a}=n,o=XE(r,i,a);return t.makeTensorInfo([o.length],`float32`,o)}var GA={kernelName:an,backendName:`cpu`,kernelFunc:WA},KA={kernelName:on,backendName:`cpu`,kernelFunc:CE(on,e=>Math.log1p(e))},qA={kernelName:sn,backendName:`cpu`,kernelFunc:pE(sn,nE((e,t)=>e&&t),null,`bool`)},JA={kernelName:cn,backendName:`cpu`,kernelFunc:CE(cn,e=>+!e,`bool`)},YA={kernelName:ln,backendName:`cpu`,kernelFunc:pE(ln,nE((e,t)=>e||t),null,`bool`)};function XA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{depthRadius:a,bias:o,alpha:s,beta:c}=r;X(i,`LRN`);let l=i.shape[3],u=l-1,d=n.data.get(i.dataId).values,f=k(i.shape),p=new Float32Array(f);function m(e){let t=e%l,n=e-t+Math.max(0,t-a),r=e-t+Math.min(t+a,u),i=0;for(;n<=r;n++){let e=d[n];i+=e*e}return i}for(let e=0;e<f;e++){let t=m(e);p[e]=d[e]*(o+s*t)**+-c}return n.makeTensorInfo(i.shape,i.dtype,p)}var ZA={kernelName:`LRN`,backendName:`cpu`,kernelFunc:XA};function QA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,y:a,dy:o}=t,{depthRadius:s,bias:c,alpha:l,beta:u}=r;X(o,`LRNGrad`);let d=k(o.shape),f=o.shape[3],p=n.data.get(o.dataId).values,m=n.data.get(i.dataId).values,h=n.data.get(a.dataId).values,g=new Float32Array(d),_=d;for(let e=0;e<_;e++){let t=e%f,n=e-t+Math.max(0,t-s),r=e-t+Math.min(f,t+s+1),i=0;for(let e=n;e<r;e++)i+=m[e]**2;i=l*i+c;for(let t=n;t<r;t++){let n=-2*l*u*m[t]*h[e]/i;e===t&&(n+=i**+-u),n*=p[e],g[t]+=n}}return n.makeTensorInfo(o.shape,i.dtype,g)}var $A={kernelName:dn,backendName:`cpu`,kernelFunc:QA};function ej(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reductionIndices:a,keepDims:o}=r,s=n,c=i.shape,l=c.length,u=j(a,c),d=u,f=ll(d,l),p=s.data.get(i.dataId).values;if(f!=null){let e=Array(l);for(let t=0;t<e.length;t++)e[t]=c[f[t]];p=fD(p,c,i.dtype,f,e),d=dl(d.length,l),c=e}X(i,`max`),cl(`max`,d,l);let[m,h]=ol(c,d),g=k(h),_=$E(p,g,m,i.dtype),v=s.write(_,m,i.dtype),y=m;return o&&(y=sl(m,u)),{dataId:v,shape:y,dtype:i.dtype}}var tj={kernelName:`Max`,backendName:`cpu`,kernelFunc:ej};function nj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;X(i,`maxPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;O(_s(o,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=rs(i.shape,a,o,1,s,c),u;if(l.filterWidth===1&&l.filterHeight===1&&A(l.inShape,l.outShape))u=oE({inputs:{x:i},backend:n});else{let e=n.data.get(i.dataId).values,t=M(i.shape),r=JO(e,i.shape,i.dtype,t,l,`max`);u=n.makeTensorInfo(l.outShape,i.dtype,r.values)}return u}var rj={kernelName:pn,backendName:`cpu`,kernelFunc:nj};function ij(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r;X(i,`maxPool3d`);let u=is(i.shape,a,o,1,s,c,l),d=n.data.get(i.dataId).values,f=XO(d,i.shape,i.dtype,M(i.shape),u,`max`);return n.makeTensorInfo(f.shape,`float32`,f.values)}var aj={kernelName:hn,backendName:`cpu`,kernelFunc:ij};function oj(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r;X([i,a],`maxPool3DGrad`);let u=is(a.shape,o,s,1,c,l),d=ZO(n.bufferSync(a),u),f=u.strideDepth,p=u.strideHeight,m=u.strideWidth,h=u.dilationDepth,g=u.dilationHeight,_=u.dilationWidth,v=u.effectiveFilterDepth,y=u.effectiveFilterHeight,b=u.effectiveFilterWidth,x=v-1-u.padInfo.front,S=b-1-u.padInfo.left,C=y-1-u.padInfo.top,w=So(a.shape,`float32`),T=n.bufferSync(i);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inDepth;++n)for(let r=0;r<u.inHeight;++r)for(let i=0;i<u.inWidth;++i){let a=n-x,o=r-C,s=i-S,c=0;for(let n=0;n<v;n+=h){let r=(a+n)/f;if(!(r<0||r>=u.outDepth||Math.floor(r)!==r))for(let i=0;i<y;i+=g){let a=(o+i)/p;if(!(a<0||a>=u.outHeight||Math.floor(a)!==a))for(let o=0;o<b;o+=_){let l=(s+o)/m;if(l<0||l>=u.outWidth||Math.floor(l)!==l)continue;let f=+(v*y*b-1-d.get(e,r,a,l,t)===n*y*b+i*b+o);if(f===0)continue;let p=T.get(e,r,a,l,t);c+=p*f}}}w.set(c,e,n,r,i,t)}return n.makeTensorInfo(w.shape,w.dtype,w.values)}var sj={kernelName:gn,backendName:`cpu`,kernelFunc:oj};function cj(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a,output:o}=t,s=a;X([a,o],`maxPoolGrad`);let{filterSize:c,strides:l,pad:u,dimRoundingMode:d}=r,f=rs(s.shape,c,l,1,u,d),p=n.data.get(s.dataId).values,m=So(f.outShape,s.dtype,YO(p,s.shape,s.dtype,f).values),h=f.strideHeight,g=f.strideWidth,_=f.dilationHeight,v=f.dilationWidth,y=f.effectiveFilterHeight,b=f.effectiveFilterWidth,x=b-1-f.padInfo.left,S=y-1-f.padInfo.top,C=So(s.shape,`float32`),w=n.data.get(i.dataId).values,T=So(i.shape,`float32`,w);for(let e=0;e<f.batchSize;++e)for(let t=0;t<f.inChannels;++t)for(let n=0;n<f.inHeight;++n)for(let r=0;r<f.inWidth;++r){let i=n-S,a=r-x,o=0;for(let n=0;n<y;n+=_){let r=(i+n)/h;if(!(r<0||r>=f.outHeight||Math.floor(r)!==r))for(let i=0;i<b;i+=v){let s=(a+i)/g;if(s<0||s>=f.outWidth||Math.floor(s)!==s)continue;let c=+(y*b-1-m.get(e,r,s,t)===n*b+i);if(c===0)continue;let l=T.get(e,r,s,t);o+=l*c}}C.set(o,e,n,r,t)}return n.makeTensorInfo(C.shape,C.dtype,C.values)}var lj={kernelName:mn,backendName:`cpu`,kernelFunc:cj};function uj(e,t,n,r,i){let a=JO(e,t,n,M(t),i,`max`),o=YO(e,t,n,i,!0,r);return[a.values,o.values]}var dj={kernelName:_n,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{x:r}=e,{filterSize:i,strides:a,pad:o,includeBatchInIndex:s}=t,c=n;X(r,`MaxPoolWithArgmax`);let l=c.data.get(r.dataId).values,u=rs(r.shape,i,a,[1,1],o),[d,f]=uj(l,r.shape,r.dtype,s,u),p=c.write(d,u.outShape,r.dtype),m=c.write(f,u.outShape,r.dtype);return[{dataId:p,shape:u.outShape,dtype:r.dtype},{dataId:m,shape:u.outShape,dtype:`int32`}]}};function fj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=j(a,i.shape),c=ol(i.shape,s)[1],l=k(c),u=[],d=n.makeTensorInfo([],`float32`,new Float32Array([l]));u.push(d);let f=dE({inputs:{x:i},backend:n,attrs:{dtype:`float32`}});u.push(f);let p=vA({inputs:{a:f,b:d},backend:n});u.push(p);let m=rA({inputs:{x:p},backend:n,attrs:{axis:a,keepDims:o}});return u.forEach(e=>n.disposeIntermediateTensorInfo(e)),m}var pj={kernelName:vn,backendName:`cpu`,kernelFunc:fj};function mj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;X(i,`min`);let s=j(a,i.shape),c=s,l=ll(c,i.shape.length),u=i;l!=null&&(u=pD({inputs:{x:i},backend:n,attrs:{perm:l}}),c=dl(c.length,i.shape.length)),cl(`min`,c,u.shape.length);let[d,f]=ol(u.shape,c),p=k(f),m=Te(k(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];(Number.isNaN(r)||r<n)&&(n=r)}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=sl(d,s),t=TO({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}var hj={kernelName:`Min`,backendName:`cpu`,kernelFunc:mj};function gj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{paddings:a,mode:o}=r;X(i,`mirrorPad`);let s=a.map((e,t)=>e[0]+i.shape[t]+e[1]),c=a.map(e=>e[0]),l=a.map((e,t)=>e[0]+i.shape[t]),u=o===`reflect`?0:1,d=n.data.get(i.dataId).values,f=i.shape.length,p=M(i.shape),m=k(s),h=s.length,g=M(s),_=ce(i.dtype,m);for(let e=0;e<m;e++){let t=ke(e,h,g);for(let e=0;e<h;e++)t[e]<c[e]?t[e]=c[e]*2-t[e]-u:t[e]>=l[e]&&(t[e]=(l[e]-1)*2-t[e]+u);t=t.map((e,t)=>e-c[t]),_[e]=d[Oe(t,f,p)]}return{dataId:n.write(_,s,i.dtype),shape:s,dtype:i.dtype}}var _j={kernelName:bn,backendName:`cpu`,kernelFunc:gj},vj={kernelName:`Mod`,backendName:`cpu`,kernelFunc:pE(`Mod`,nE(((e,t)=>{let n=e%t;return e<0&&t<0||e>=0&&t>=0?n:(n+t)%t})))};function yj(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{dim:a}=r,o=i.shape.length,s=a;if(s===-1&&(s=o-1),s!==o-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${o} and dim was ${s}`);let c=j([s],i.shape),l=ej({inputs:{x:i},backend:n,attrs:{reductionIndices:c,keepDims:!1}}),u=sl(l.shape,c),d=TO({inputs:{x:l},backend:n,attrs:{shape:u}}),f=aO({inputs:{a:i,b:d},backend:n}),p=ME({inputs:{x:f},backend:n}),m=rA({inputs:{x:p},backend:n,attrs:{axis:c,keepDims:!1}}),h=TO({inputs:{x:m},backend:n,attrs:{shape:u}}),g=vA({inputs:{a:p,b:h},backend:n});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),g}var bj={kernelName:cr,backendName:`cpu`,kernelFunc:yj};function xj(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{numSamples:a,seed:o,normalized:s}=r;X(i,`multinomial`);let c=s?i:yj({inputs:{logits:i},backend:n,attrs:{dim:-1}}),l=c.shape[0],u=c.shape[1],d=n.data.get(c.dataId).values,f=[l,a],p=Te(k(f),`int32`);for(let e=0;e<l;++e){let t=e*u,n=new Float32Array(u-1);n[0]=d[t];for(let e=1;e<n.length;++e)n[e]=n[e-1]+d[t+e];let r=Cd.alea(o.toString()),i=e*a;for(let e=0;e<a;++e){let t=r();p[i+e]=n.length;for(let r=0;r<n.length;r++)if(t<n[r]){p[i+e]=r;break}}}return s||n.disposeIntermediateTensorInfo(c),n.makeTensorInfo(f,`int32`,p)}var Sj={kernelName:xn,backendName:`cpu`,kernelFunc:xj},Cj=Np;function wj(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c}=r;X(i,`NonMaxSuppression`);let l=n.data.get(i.dataId).values,u=n.data.get(a.dataId).values,{selectedIndices:d}=Cj(l,u,o,s,c);return n.makeTensorInfo([d.length],`int32`,new Int32Array(d))}var Tj={kernelName:wn,backendName:`cpu`,kernelFunc:wj},Ej=Pp;function Dj(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,padToMaxOutputSize:l}=r;X(i,`NonMaxSuppressionPadded`);let u=n.data.get(i.dataId).values,d=n.data.get(a.dataId).values,{selectedIndices:f,validOutputs:p}=Ej(u,d,o,s,c,l);return[n.makeTensorInfo([f.length],`int32`,new Int32Array(f)),n.makeTensorInfo([],`int32`,new Int32Array([p]))]}var Oj={kernelName:Tn,backendName:`cpu`,kernelFunc:Dj},kj=Fp;function Aj(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,softNmsSigma:l}=r;X(i,`NonMaxSuppressionWithScore`);let u=n.data.get(i.dataId).values,d=n.data.get(a.dataId).values,{selectedIndices:f,selectedScores:p}=kj(u,d,o,s,c,l);return[n.makeTensorInfo([f.length],`int32`,new Int32Array(f)),n.makeTensorInfo([p.length],`float32`,new Float32Array(p))]}var jj={kernelName:En,backendName:`cpu`,kernelFunc:Aj};function Mj(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i}=t,{dtype:a,depth:o,onValue:s,offValue:c}=r;X(i,`oneHot`);let l=k(i.shape),u=new Float32Array(l*o);u.fill(c);let d=n.data.get(i.dataId).values;for(let e=0;e<l;++e)d[e]>=0&&d[e]<o&&(u[e*o+d[e]]=s);return n.makeTensorInfo([...i.shape,o],a,u)}var Nj={kernelName:On,backendName:`cpu`,kernelFunc:Mj};function Pj(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`string`)throw Error(`zerosLike is not supported for string tensors`);if(r.dtype===`complex64`){let e=cE({inputs:{input:r},backend:n}),t=Pj({inputs:{x:e},backend:n}),i=gk({inputs:{input:r},backend:n}),a=Pj({inputs:{x:i},backend:n}),o=rE({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}else return DA({backend:n,attrs:{shape:r.shape,value:0,dtype:r.dtype}})}var Fj={kernelName:kr,backendName:`cpu`,kernelFunc:Pj};function Ij(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`string`)throw Error(`onesLike is not supported for string tensors`);if(r.dtype===`complex64`){let e=cE({inputs:{input:r},backend:n}),t=Ij({inputs:{x:e},backend:n}),i=gk({inputs:{input:r},backend:n}),a=Pj({inputs:{x:i},backend:n}),o=rE({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}else return DA({backend:n,attrs:{shape:r.shape,value:1,dtype:r.dtype}})}var Lj={kernelName:Dn,backendName:`cpu`,kernelFunc:Ij};function Rj(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r;if(t.length===1)return gA({inputs:{input:t[0]},backend:n,attrs:{dim:i}});let a=t[0].shape,o=t[0].dtype;t.forEach(e=>{ee(a,e.shape,`All tensors passed to stack must have matching shapes`),O(o===e.dtype,()=>`All tensors passed to stack must have matching dtypes`)});let s=[],c=vk({inputs:t.map(e=>{let t=gA({inputs:{input:e},backend:n,attrs:{dim:i}});return s.push(t),t}),backend:n,attrs:{axis:i}});return s.forEach(e=>n.disposeIntermediateTensorInfo(e)),c}var zj={kernelName:kn,backendName:`cpu`,kernelFunc:Rj};function Bj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{paddings:a,constantValue:o}=r;X(i,`pad`);let s=a.map((e,t)=>e[0]+i.shape[t]+e[1]),c=a.map(e=>e[0]),l=n.data.get(i.dataId).values,u=k(i.shape),d=i.shape.length,f=M(i.shape),p=k(s),m=s.length,h=M(s),g=ce(i.dtype,p);o!==0&&g.fill(o);for(let e=0;e<u;e++){let t=Oe(ke(e,d,f).map((e,t)=>e+c[t]),m,h);g[t]=l[e]}return{dataId:n.write(g,s,i.dtype),shape:s,dtype:i.dtype}}var Vj={kernelName:An,backendName:`cpu`,kernelFunc:Bj},Hj={kernelName:`Pow`,backendName:`cpu`,kernelFunc:pE(`Pow`,nE((e,t)=>e**+t))};function Uj(e){let{inputs:t,backend:n,attrs:r}=e,{paramsNestedSplits:i,paramsDenseValues:a,indices:o}=t,{outputRaggedRank:s}=r,c=i.map(e=>n.data.get(e.dataId).values),l=i.map(e=>e.shape),u=n.data.get(a.dataId).values,d=n.data.get(o.dataId).values,[f,p,m]=TD(c,l,u,a.shape,a.dtype,d,o.shape,s),h=f.map(e=>n.makeTensorInfo([e.length],`int32`,e)),g=n.makeTensorInfo(m,a.dtype,p);return h.concat([g])}var Wj={kernelName:Nn,backendName:`cpu`,kernelFunc:Uj};function Gj(e){let{inputs:t,backend:n}=e,{starts:r,limits:i,deltas:a}=t,o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=DD(o,r.shape,r.dtype,s,i.shape,c,a.shape);return[n.makeTensorInfo([l.length],`int32`,l),n.makeTensorInfo([u.length],r.dtype,u)]}var Kj={kernelName:Pn,backendName:`cpu`,kernelFunc:Gj};function qj(e){let{inputs:t,backend:n,attrs:r}=e,{shape:i,values:a,defaultValue:o,rowPartitionTensors:s}=t,{rowPartitionTypes:c}=r,l=n.data.get(i.dataId).values,u=n.data.get(a.dataId).values,d=n.data.get(o.dataId).values,f=s.map(e=>n.data.get(e.dataId).values),p=s.map(e=>e.shape),[m,h]=MD(l,i.shape,u,a.shape,a.dtype,d,o.shape,f,p,c);return n.makeTensorInfo(m,a.dtype,h)}var Jj={kernelName:Fn,backendName:`cpu`,kernelFunc:qj};function Yj(e){let{backend:t,attrs:n}=e,{start:r,stop:i,dtype:a,step:o}=n,s=ND(r,i,o,a);return t.makeTensorInfo([s.length],a,s)}var Xj={kernelName:In,backendName:`cpu`,kernelFunc:Yj},Zj={kernelName:Rn,backendName:`cpu`,kernelFunc:CE(Rn,e=>1/e)};function Qj(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r;X(i,`resizeBilinear`);let c=M(i.shape),[l,u]=s,[d,f,p,m]=i.shape,h=n.data.get(i.dataId).values,g=new Float32Array(k([d,l,u,m])),_=[a&&l>1?f-1:f,a&&u>1?p-1:p],v=[a&&l>1?l-1:l,a&&u>1?u-1:u],y=0,b=_[0]/v[0],x=_[1]/v[1];for(let e=0;e<d;e++)for(let t=0;t<l;t++){let n;n=o?b*(t+.5)-.5:b*t;let r=Math.max(0,Math.floor(n)),i=n-r,a=Math.min(f-1,Math.ceil(n)),s=e*c[0]+r*c[1],l=e*c[0]+a*c[1];for(let e=0;e<u;e++){let t;t=o?x*(e+.5)-.5:x*e;let n=Math.max(0,Math.floor(t)),r=t-n,a=Math.min(p-1,Math.ceil(t)),u=s+n*c[2],d=l+n*c[2],f=s+a*c[2],_=l+a*c[2];for(let e=0;e<m;e++){let t=h[u+e],n=h[d+e],a=h[f+e],o=h[_+e],s=t+(a-t)*r,c=s+(n+(o-n)*r-s)*i;g[y++]=c}}}return n.makeTensorInfo([d,l,u,m],`float32`,g)}var $j={kernelName:Un,backendName:`cpu`,kernelFunc:Qj};function eM(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r;X([a,i],`resizeBilinearGrad`);let s=M(i.shape),[c,l,u,d]=i.shape,[,f,p]=a.shape,m=new Float32Array(c*l*u*d),h=[o&&f>1?l-1:l,o&&p>1?u-1:u],g=[o&&f>1?f-1:f,o&&p>1?p-1:p],_=h[0]/g[0],v=h[1]/g[1],y=n.data.get(a.dataId).values,b=0;for(let e=0;e<c;e++){let t=e*s[0];for(let e=0;e<f;e++){let n=e*_,r=Math.floor(n),i=Math.min(Math.ceil(n),l-1),a=t+r*s[1],o=t+i*s[1],c=n-r,f=1-c;for(let e=0;e<p;e++){let t=e*v,n=Math.floor(t),r=Math.min(Math.ceil(t),u-1),i=t-n,l=1-i,p=a+n*s[2],h=a+r*s[2],g=o+n*s[2],_=o+r*s[2],x=f*l,S=f*i,C=c*l,w=c*i;for(let e=0;e<d;e++){let t=y[b++];m[p+e]+=t*x,m[h+e]+=t*S,m[g+e]+=t*C,m[_+e]+=t*w}}}}return n.makeTensorInfo([c,u,l,d],`float32`,m)}var tM={kernelName:Wn,backendName:`cpu`,kernelFunc:eM};function nM(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r;X(i,`resizeNearestNeighbor`);let c=M(i.shape),[l,u]=s,[d,f,p,m]=i.shape,h=n.data.get(i.dataId).values,g=new Float32Array(d*l*u*m),_=[a&&l>1?f-1:f,a&&u>1?p-1:p],v=[a&&l>1?l-1:l,a&&u>1?u-1:u],y=_[0]/v[0],b=_[1]/v[1],x=0;for(let e=0;e<d;e++){let t=e*c[0];for(let e=0;e<l;e++){let n=o?y*(e+.5):y*e,r=Math.min(f-1,a?Math.round(n):Math.floor(n));o&&(r=Math.max(0,r));let i=t+r*c[1];for(let e=0;e<u;e++){let t=o?b*(e+.5):b*e,n=Math.min(p-1,a?Math.round(t):Math.floor(t));o&&(n=Math.max(0,n));let r=i+n*c[2];for(let e=0;e<m;e++){let t=h[r+e];g[x++]=t}}}}return n.makeTensorInfo([d,l,u,m],i.dtype,g)}var rM={kernelName:Vn,backendName:`cpu`,kernelFunc:nM};function iM(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r;X([a,i],`resizeNearestNeighborGrad`);let s=M(i.shape),c=M(a.shape),[l,u,d,f]=i.shape,[,p,m]=a.shape,h=new Float32Array(l*u*d*f),g=n.data.get(a.dataId).values,_=[o&&p>1?u-1:u,o&&m>1?d-1:d],v=[o&&p>1?p-1:p,o&&m>1?m-1:m],y=_[0]/v[0],b=_[1]/v[1],x=1/y,S=1/b,C=Math.ceil(x)*2+2,w=Math.ceil(S)*2+2;for(let e=0;e<l;e++){let t=e*s[0];for(let e=0;e<u;e++){let n=t+e*s[1],r=Math.floor(e*x),i=Math.floor(r-C/2);for(let r=0;r<d;r++){let a=n+r*s[2],l=Math.floor(r*S),_=Math.floor(l-w/2);for(let n=0;n<f;n++){let s=0;for(let a=0;a<C;a++){let l=a+i;if(l<0||l>=p)continue;let f=t+l*c[1],h=l*y,v=Math.min(u-1,o?Math.round(h):Math.floor(h));if(e===v)for(let e=0;e<w;e++){let t=e+_;if(t<0||t>=m)continue;let i=f+t*c[2],a=t*b,l=Math.min(d-1,o?Math.round(a):Math.floor(a));r===l&&(s+=g[i+n])}}h[a+n]=s}}}}return n.makeTensorInfo(i.shape,i.dtype,h)}var aM={kernelName:Hn,backendName:`cpu`,kernelFunc:iM};function oM(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dims:a}=r;X(i,`reverse`);let o=i.shape.length,s=j(a,i.shape);if(o===0)return oE({inputs:{x:i},backend:n});let c=new Ni(i.shape,i.dtype),l=n.bufferSync(i);for(let e=0;e<c.size;e++){let t=c.indexToLoc(e),n=t.slice();s.forEach(e=>n[e]=i.shape[e]-1-n[e]),c.set(l.get(...n),...t)}return n.makeTensorInfo(c.shape,c.dtype,c.values)}var sM={kernelName:Kn,backendName:`cpu`,kernelFunc:oM},cM={kernelName:Mr,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{image:r}=e,{radians:i,fillValue:a,center:o}=t,s=n,c=ce(r.dtype,k(r.shape)),[l,u,d,f]=r.shape,[p,m]=sh(o,u,d),h=Math.sin(i),g=Math.cos(i),_=s.data.get(r.dataId).values;for(let e=0;e<l;e++){let t=e*d*u*f;for(let e=0;e<u;e++){let n=d*f*e;for(let r=0;r<d;r++){let i=r*f;for(let o=0;o<f;o++){let s=[l,e,r,o],v=s[2],y=s[1],b=(v-p)*g-(y-m)*h,x=(v-p)*h+(y-m)*g;b=Math.round(b+p),x=Math.round(x+m);let S=a;if(typeof a!=`number`&&(S=o===3?255:a[o]),b>=0&&b<d&&x>=0&&x<u){let e=d*f*x,n=b*f;S=_[t+e+n+o]}let C=t+n+i+o;c[C]=S}}}}return{dataId:s.write(c,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}},lM={kernelName:qn,backendName:`cpu`,kernelFunc:CE(qn,e=>{let t=Math.floor(e);return e-t<.5?Math.floor(e):e-t>.5?Math.ceil(e):t%2==0?t:t+1})};function uM(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i,updates:a}=t,{shape:o}=r,{sliceRank:s,numUpdates:c,sliceSize:l,strides:u,outputSize:d}=Rf(a,i,o),f=ID(n.bufferSync(i),n.bufferSync(a),o,d,l,c,s,u,0,!0);return n.makeTensorInfo(o,f.dtype,f.values)}var dM={kernelName:Yn,backendName:`cpu`,kernelFunc:uM};function fM(e,t){let n=0,r=e.length,i=0;for(;n<r;)i=Math.floor((n+r)/2),e[i]<t?n=i+1:r=i;return r}function pM(e,t){let n=0,r=e.length,i=0;for(;n<r;)i=Math.floor((n+r)/2),e[i]<=t?n=i+1:r=i;return r}function mM(e,t,n,r,i,a){let o=le(`int32`,n*i);for(let s=0;s<n;++s){let n=e.slice(s*r,(s+1)*r),c=s*i;for(let e=0;e<i;++e)o[c+e]=a===`left`?fM(n,t[e+c]):pM(n,t[e+c])}return o}function hM(e){let{inputs:t,backend:n,attrs:r}=e,{sortedSequence:i,values:a}=t,{side:o}=r,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,l=mM(s,c,i.shape[0],i.shape[1],a.shape[1],o);return n.makeTensorInfo(a.shape,`int32`,l)}var gM={kernelName:Zn,backendName:`cpu`,kernelFunc:hM};function _M(e){let{inputs:t,backend:n}=e,{condition:r,t:i,e:a}=t;X([r,i,a],`select`);let o=r.shape.length,s=n.data.get(r.dataId).values,c=n.data.get(i.dataId).values,l=n.data.get(a.dataId).values,u=Ki(i.dtype,a.dtype),d=Te(k(i.shape),u),f=0,p=o===0||o>1||i.shape.length===1?1:k(i.shape.slice(1));for(let e=0;e<s.length;e++)for(let t=0;t<p;t++)s[e]===1?d[f++]=c[e]:d[f++]=l[e];return n.makeTensorInfo(i.shape,u,d)}var vM={kernelName:Qn,backendName:`cpu`,kernelFunc:_M},yM=ph,bM=mh,xM={kernelName:$n,backendName:`cpu`,kernelFunc:CE($n,e=>e>=0?bM*e:yM*(Math.exp(e)-1))},SM={kernelName:nr,backendName:`cpu`,kernelFunc:CE(nr,e=>e<0?-1:+(e>0))},CM={kernelName:`Sin`,backendName:`cpu`,kernelFunc:CE(`Sin`,e=>Math.sin(e))},wM={kernelName:tr,backendName:`cpu`,kernelFunc:CE(tr,e=>Math.sinh(e))},TM=Math.log(1.1920928955078125e-7)+2,EM={kernelName:ir,backendName:`cpu`,kernelFunc:CE(ir,e=>{let t=e>-TM,n=e<TM,r=Math.exp(e),i;return i=n?r:t?e:Math.log(1+r),i})};function DM(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,paddings:o}=r;X([i],`spaceToBatchND`);let s=k(a),c=[[0,0]];c.push(...o);for(let e=1+a.length;e<i.shape.length;++e)c.push([0,0]);let l=Vj.kernelFunc({inputs:{x:i},backend:n,attrs:{paddings:c,constantValue:0}}),u=ch(l.shape,a,s,!1),d=lh(u.length,a.length,!1),f=uh(l.shape,a,s,!1),p=TO({inputs:{x:l},backend:n,attrs:{shape:u}}),m=pD({inputs:{x:p},backend:n,attrs:{perm:d}}),h=TO({inputs:{x:m},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),h}var OM={kernelName:or,backendName:`cpu`,kernelFunc:DM};function kM(e){let{inputs:t,backend:n}=e,{indices:r,values:i,denseShape:a,defaultValue:o}=t;if(a.shape.length!==1)throw Error(`Dense shape must be a vector, saw:
        ${a.shape}`);if(r.shape.length!==2)throw Error(`Indices must be a matrix, saw:
        ${r.shape}`);if(i.shape.length!==1)throw Error(`Values must be a vector, saw:
        ${i.shape}`);if(o.shape.length!==0)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let s=n.data.get(r.dataId).values,c=n.data.get(i.dataId).values,l=n.data.get(a.dataId).values,u=n.data.get(o.dataId).values[0],[d,f,p,m,h]=UD(s,r.shape,r.dtype,c,i.dtype,l,u);return[n.makeTensorInfo(f,r.dtype,d),n.makeTensorInfo([f[0]],i.dtype,p),n.makeTensorInfo([m.length],`bool`,new Uint8Array(m.map(e=>Number(e)))),n.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}var AM={kernelName:lr,backendName:`cpu`,kernelFunc:kM};function jM(e){let{inputs:t,backend:n}=e,{inputIndices:r,inputShape:i,newShape:a}=t;if(r.shape.length!==2)throw Error(`Input indices should be a matrix but received shape
        ${r.shape}`);if(i.shape.length!==1)throw Error(`Input shape should be a vector but received shape
        ${i.shape}`);if(a.shape.length!==1)throw Error(`Target shape should be a vector but received shape ${a.shape}`);let o=Array.from(n.data.get(i.dataId).values),s=n.data.get(r.dataId).values,c=Array.from(n.data.get(a.dataId).values),[l,u,d]=WD(s,r.shape,r.dtype,o,c);return[n.makeTensorInfo(u,r.dtype,l),n.makeTensorInfo([d.length],a.dtype,new Int32Array(d))]}var MM={kernelName:ur,backendName:`cpu`,kernelFunc:jM};function NM(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
          ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
          ${a.shape}`);if(i.shape[0]!==a.shape[0])throw Error(`segmentIds and indices should have same size.`);let o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=GD(o,r.shape,r.dtype,s,c,!0);return n.makeTensorInfo(u,r.dtype,l)}var PM={kernelName:dr,backendName:`cpu`,kernelFunc:NM};function FM(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
         ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
         ${a.shape}`);if(i.shape[0]!==a.shape[0])throw Error(`segmentIds and indices should have same size.`);let o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=GD(o,r.shape,r.dtype,s,c);return n.makeTensorInfo(u,r.dtype,l)}var IM={kernelName:fr,backendName:`cpu`,kernelFunc:FM};function LM(e){let{inputs:t,backend:n,attrs:r}=e,{sparseIndices:i,sparseValues:a,defaultValue:o}=t,{outputShape:s}=r,{sliceRank:c,numUpdates:l,sliceSize:u,strides:d,outputSize:f}=Rf(a,i,s),p=n.bufferSync(i),m;switch(a.dtype){case`bool`:m=ID(p,n.bufferSync(a),s,f,u,l,c,d,!!n.data.get(o.dataId).values[0],!1);break;case`float32`:{let e=n.bufferSync(a),t=n.data.get(o.dataId).values[0];m=ID(p,e,s,f,u,l,c,d,t,!1);break}case`int32`:{let e=n.bufferSync(a),t=n.data.get(o.dataId).values[0];m=ID(p,e,s,f,u,l,c,d,t,!1);break}case`string`:m=ID(p,n.bufferSync(a),s,f,u,l,c,d,gi(n.data.get(o.dataId).values[0]),!1);break;default:throw Error(`Unsupported type ${a.dtype}`)}return n.makeTensorInfo(s,m.dtype,m.values)}var RM={kernelName:pr,backendName:`cpu`,kernelFunc:LM};function zM(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{numOrSizeSplits:a,axis:o}=r,s=j(o,i.shape)[0],c=zh(i,a,s),l=Array(i.shape.length).fill(0),u=i.shape.slice();return c.map(e=>{let t=[...u];t[s]=e;let r=VD({inputs:{x:i},backend:n,attrs:{begin:l,size:t}});return l[s]+=e,r})}var BM={kernelName:sr,backendName:`cpu`,kernelFunc:zM},VM={kernelName:hr,backendName:`cpu`,kernelFunc:({inputs:e,backend:t})=>{let{x:n}=e,r=t;X(n,`square`);let i=r.data.get(n.dataId).values,a=new Float32Array(i.length);for(let e=0;e<i.length;++e){let t=i[e];a[e]=t*t}return{dataId:r.write(a,n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}},HM={kernelName:Ar,backendName:`cpu`,kernelFunc:CE(Ar,(e,t)=>isNaN(e)?NaN:e>0?1:t.alpha)};function UM(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,end:o,strides:s,beginMask:c,endMask:l,ellipsisMask:u,newAxisMask:d,shrinkAxisMask:f}=r;X(i,`stridedSlice`);let{finalShapeSparse:p,finalShape:m,isIdentity:h,sliceDim0:g,isSimpleSlice:_,begin:v,end:y,strides:b}=qm(i.shape,a,o,s,c,l,u,d,f),x;if(h)x=TO({inputs:{x:i},backend:n,attrs:{shape:m}});else if(g||_){O(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=Pm(v,y,b),t=VD({inputs:{x:i},backend:n,attrs:{begin:v,size:e}});x=TO({inputs:{x:t},backend:n,attrs:{shape:m}}),n.disposeIntermediateTensorInfo(t)}else{let e=QD(p,n.bufferSync(i),b,v);x=n.makeTensorInfo(m,e.dtype,e.values)}return x}var WM={kernelName:_r,backendName:`cpu`,kernelFunc:UM};function GM(e){let{inputs:t,backend:n,attrs:r}=e,{separator:i,nGramWidths:a,leftPad:o,rightPad:s,padWidth:c,preserveShortSequences:l}=r,{data:u,dataSplits:d}=t,f=n.data.get(u.dataId).values,p=n.data.get(d.dataId).values,[m,h]=eO(f,p,i,a,o,s,c,l);return[n.makeTensorInfo([m.length],`string`,m),n.makeTensorInfo(d.shape,`int32`,h)]}var KM={kernelName:vr,backendName:`cpu`,kernelFunc:GM};function qM(e){let{inputs:t,backend:n,attrs:r}=e,{skipEmpty:i}=r,{input:a,delimiter:o}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(a.shape.length!==1)throw Error(`Input must be a vector, got shape: ${a.shape}`);if(o.shape.length!==0)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let s=n.data.get(a.dataId).values,c=n.data.get(o.dataId).values[0],[l,u,d]=nO(s,c,i),f=u.length;return[n.makeTensorInfo([f,2],`int32`,l),n.makeTensorInfo([f],`string`,u),n.makeTensorInfo([2],`int32`,new Int32Array(d))]}var JM={kernelName:yr,backendName:`cpu`,kernelFunc:qM};function YM(e){let{inputs:t,backend:n,attrs:r}=e,{numBuckets:i}=r,{input:a}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(i<=0)throw Error(`Number of buckets must be at least 1`);let o=n.data.get(a.dataId).values,s=rO(o,i);return n.makeTensorInfo(a.shape,`int32`,s)}var XM={kernelName:br,backendName:`cpu`,kernelFunc:YM},ZM={kernelName:`Tan`,backendName:`cpu`,kernelFunc:CE(`Tan`,e=>Math.tan(e))},QM={kernelName:xr,backendName:`cpu`,kernelFunc:CE(xr,e=>Math.tanh(e))};function $M(e){let{inputs:t,backend:n}=e,{tensor:r,indices:i,updates:a}=t,{sliceRank:o,numUpdates:s,sliceSize:c,strides:l,outputSize:u}=Rf(a,i,r.shape),d=n.bufferSync(i),f=n.bufferSync(a),p=n.bufferSync(r),m=ID(d,f,r.shape,u,c,s,o,l,p,!1);return n.makeTensorInfo(r.shape,m.dtype,m.values)}var eN={kernelName:Xn,backendName:`cpu`,kernelFunc:$M};function tN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reps:a}=r;X(i,`tile`);let o=sO(n.bufferSync(i),a);return n.makeTensorInfo(o.shape,o.dtype,o.values)}var nN={kernelName:Sr,backendName:`cpu`,kernelFunc:tN};function rN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{k:a,sorted:o}=r;X(i,`topk`);let s=n.data.get(i.dataId).values,[c,l]=uO(s,i.shape,i.dtype,a,o);return[n.makeTensorInfo(c.shape,c.dtype,c.values),n.makeTensorInfo(l.shape,l.dtype,l.values)]}var iN={kernelName:Cr,backendName:`cpu`,kernelFunc:rN};function aN(e){let{inputs:t,attrs:n,backend:r}=e,{image:i,transforms:a}=t,{interpolation:o,fillMode:s,fillValue:c,outputShape:l}=n,[u,d,f,p]=i.shape,[m,h]=l==null?[d,f]:l,g=[u,m,h,p],_=M(i.shape),v=_[0],y=_[1],b=_[2],x=M(g),S=x[0],C=x[1],w=x[2],T=ce(i.dtype,k(g));T.fill(c);let E=r.data.get(i.dataId).values,D=r.data.get(a.dataId).values;for(let e=0;e<u;++e){let t=a.shape[0]===1?D:D.subarray(e*8,e*8+8);for(let n=0;n<m;++n)for(let r=0;r<h;++r)for(let i=0;i<p;++i){let a,l=t[6]*r+t[7]*n+1;if(l===0)continue;let u=(t[0]*r+t[1]*n+t[2])/l,p=(t[3]*r+t[4]*n+t[5])/l,m=sN(u,f,s),h=sN(p,d,s);switch(o){case`nearest`:a=pN(E,d,f,v,y,b,e,h,m,i,c);break;case`bilinear`:a=mN(E,d,f,v,y,b,e,h,m,i,c);break;default:throw Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${o}`)}let g=e*S+n*C+r*w+i;T[g]=a}return r.makeTensorInfo(g,i.dtype,T)}return{dataId:r.write(T,g,i.dtype),shape:i.shape,dtype:i.dtype}}var oN={kernelName:wr,backendName:`cpu`,kernelFunc:aN};function sN(e,t,n){switch(n){case`reflect`:return cN(e,t);case`wrap`:return lN(e,t);case`nearest`:return dN(e,t);default:return uN(e,t)}}function cN(e,t){let n=e;if(n<0)if(t<=1)n=0;else{let e=2*t;n<e&&(n=e*Math.trunc(-n/e)+n),n=n<-t?n+e:-n-1}else if(n>t-1)if(t<=1)n=0;else{let e=2*t;n-=e*Math.trunc(n/e),n>=t&&(n=e-n-1)}return w(0,n,t-1)}function lN(e,t){let n=e;if(n<0)if(t<=1)n=0;else{let e=t-1;n+=t*(Math.trunc(-n/e)+1)}else if(n>t-1)if(t<=1)n=0;else{let e=t-1;n-=t*Math.trunc(n/e)}return w(0,n,t-1)}function uN(e,t){return e}function dN(e,t){return w(0,e,t-1)}function fN(e,t,n,r,i,a,o,s,c,l,u){let d=o*r+s*i+c*a+l;return 0<=s&&s<t&&0<=c&&c<n?e[d]:u}function pN(e,t,n,r,i,a,o,s,c,l,u){return fN(e,t,n,r,i,a,o,Math.round(s),Math.round(c),l,u)}function mN(e,t,n,r,i,a,o,s,c,l,u){let d=Math.floor(s),f=Math.floor(c),p=d+1,m=f+1,h=(m-c)*fN(e,t,n,r,i,a,o,d,f,l,u)+(c-f)*fN(e,t,n,r,i,a,o,d,m,l,u),g=(m-c)*fN(e,t,n,r,i,a,o,p,f,l,u)+(c-f)*fN(e,t,n,r,i,a,o,p,m,l,u);return(p-s)*h+(s-d)*g}function hN(e){let{inputs:t,attrs:n,backend:r}=e,{axis:i}=n,{x:a}=t;X(a,`unique`);let o=r.data.get(a.dataId).values,{outputValues:s,outputShape:c,indices:l}=dO(o,i,a.shape,a.dtype);return[r.makeTensorInfo(c,a.dtype,s),r.makeTensorInfo([l.length],`int32`,l)]}var gN={kernelName:Er,backendName:`cpu`,kernelFunc:hN};function _N(e){let{inputs:t,backend:n,attrs:r}=e,{value:i}=t,{axis:a}=r;a<0&&(a+=i.shape.length);let o=i.shape.length,s=i.shape[a],c=Array(o-1),l=0;for(let e=0;e<o;e++)e!==a&&(c[l++]=i.shape[e]);let u=Array(o).fill(0),d=i.shape.slice();d[a]=1;let f=Array(s);for(let e=0;e<f.length;e++){u[a]=e;let t=VD({inputs:{x:i},backend:n,attrs:{begin:u,size:d}});f[e]=TO({inputs:{x:t},backend:n,attrs:{shape:c}}),n.disposeIntermediateTensorInfo(t)}return f}var vN={kernelName:Dr,backendName:`cpu`,kernelFunc:_N};function yN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,segmentIds:a}=t,{numSegments:o}=r;X(i,`unsortedSegmentSum`);let s=i.shape.length,c=a.shape.length,l=[],u=[],d=s-c,f=a;for(let e=0;e<d;++e){let t=gA({inputs:{input:f},backend:n,attrs:{dim:e+1}});f=t,u.push(t)}for(let e=0;e<o;++e){let t=di(e,`int32`),r=n.makeTensorInfo([],`int32`,t),a=kE({inputs:{a:r,b:f},backend:n}),o=dE({inputs:{x:a},backend:n,attrs:{dtype:`float32`}}),s=aD({inputs:{a:o,b:i},backend:n}),c=rA({inputs:{x:s},backend:n,attrs:{axis:0,keepDims:!1}});l.push(c),u.push(r),u.push(a),u.push(o),u.push(s),u.push(c)}let p=Rj({inputs:l,backend:n,attrs:{axis:0}});return u.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}var bN=[AO,tE,jO,MO,_E,PO,IO,RO,BO,HO,UO,WO,GO,KO,qO,$O,tk,rk,ak,OO,sk,lk,dk,xE,pk,fE,EE,mk,iE,hk,yk,xk,Ck,Tk,Dk,kk,jk,Mk,Nk,Fk,Lk,zk,Vk,Uk,Gk,qk,Yk,Zk,Qk,$k,eA,nA,oA,mO,cA,AE,hA,NE,_A,FE,EA,OA,AA,LE,zE,MA,PA,IA,RA,UE,GE,sE,BA,_k,VA,HA,UA,gO,qE,YE,GA,QE,KA,qA,JA,YA,ZA,$A,tj,tD,rj,aj,sj,lj,dj,pj,hj,rD,_j,vj,Sj,oD,lD,Tj,Oj,jj,dD,Nj,Lj,zj,Vj,Hj,yO,_D,Wj,Kj,Jj,Xj,lE,yA,Zj,xO,CO,EO,$j,tM,rM,aM,sM,cM,lM,FD,dM,gM,vM,xM,zD,SM,CM,wM,HD,bj,EM,OM,AM,MM,PM,IM,RM,BM,qD,VM,YD,ZD,HM,WM,KM,JM,XM,oO,iA,ZM,QM,eN,nN,iN,oN,mD,gN,vN,{kernelName:Or,backendName:`cpu`,kernelFunc:yN},Fj];for(let e of bN)Ur(e);var xN={},SN={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function CN(e,t){xN[e]=t}function wN(e,t){if(!(e in xN)||t!=null){let n=EN(e,t);if(n!==null)xN[e]=n;else return console.log(`Could not get context for WebGL version`,e),null}let n=xN[e];return n==null||n.isContextLost()?(delete xN[e],wN(e)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),xN[e])}function TN(e){if(!N().getBool(`IS_SAFARI`)&&typeof OffscreenCanvas<`u`&&e===2)return new OffscreenCanvas(300,150);if(typeof document<`u`)return document.createElement(`canvas`);throw Error(`Cannot create a canvas in this context`)}function EN(e,t){if(e!==1&&e!==2)throw Error(`Cannot get WebGL rendering context, WebGL is disabled.`);let n=t==null?TN(e):t;return n.addEventListener(`webglcontextlost`,t=>{t.preventDefault(),delete xN[e]},!1),N().getBool(`SOFTWARE_WEBGL_ENABLED`)&&(SN.failIfMajorPerformanceCaveat=!1),e===1?n.getContext(`webgl`,SN)||n.getContext(`experimental-webgl`,SN):n.getContext(`webgl2`,SN)}var DN;(function(e){e[e.DENSE=0]=`DENSE`,e[e.SHARED_BATCH=1]=`SHARED_BATCH`})(DN||(DN={}));var ON;(function(e){e[e.RENDER=0]=`RENDER`,e[e.UPLOAD=1]=`UPLOAD`,e[e.PIXELS=2]=`PIXELS`,e[e.DOWNLOAD=3]=`DOWNLOAD`})(ON||(ON={}));var kN;(function(e){e[e.UNPACKED_FLOAT16=0]=`UNPACKED_FLOAT16`,e[e.UNPACKED_FLOAT32=1]=`UNPACKED_FLOAT32`,e[e.PACKED_4X1_UNSIGNED_BYTE=2]=`PACKED_4X1_UNSIGNED_BYTE`,e[e.PACKED_2X2_FLOAT32=3]=`PACKED_2X2_FLOAT32`,e[e.PACKED_2X2_FLOAT16=4]=`PACKED_2X2_FLOAT16`})(kN||(kN={}));function AN(e,t){return[t,e]}function jN(e,t){return e*t}function MN(e){let t=k(e);return re(Math.ceil(t/4))}function NN(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function PN(e,t){let[n,r]=NN(e,t);return n*r*4}function FN(e,t){let n=e,r,i,a,o,s,c,l,u,d,f;return N().getNumber(`WEBGL_VERSION`)===2?(r=n.R32F,i=n.R16F,a=n.RGBA16F,o=n.RGBA32F,s=n.RED,l=4,u=1,d=n.HALF_FLOAT,f=n.FLOAT,c=n.RGBA8):(r=e.RGBA,i=e.RGBA,a=e.RGBA,o=n.RGBA,s=e.RGBA,l=4,u=4,d=t==null?null:t.HALF_FLOAT_OES,f=e.FLOAT,c=e.RGBA),{internalFormatFloat:r,internalFormatHalfFloat:i,internalFormatPackedHalfFloat:a,internalFormatPackedFloat:o,textureFormatFloat:s,downloadTextureFormat:c,downloadUnpackNumChannels:l,defaultNumChannels:u,textureTypeHalfFloat:d,textureTypeFloat:f}}function Z(e,t){let n=t();return N().getBool(`DEBUG`)&&IN(e),n}function IN(e){let t=e.getError();if(t!==e.NO_ERROR)throw Error(`WebGL Error: `+BN(e,t))}var LN=5.96e-8,RN=65504;function zN(e){return!!(N().getBool(`WEBGL_RENDER_FLOAT32_ENABLED`)||e===0||LN<Math.abs(e)&&Math.abs(e)<RN)}function BN(e,t){switch(t){case e.NO_ERROR:return`NO_ERROR`;case e.INVALID_ENUM:return`INVALID_ENUM`;case e.INVALID_VALUE:return`INVALID_VALUE`;case e.INVALID_OPERATION:return`INVALID_OPERATION`;case e.INVALID_FRAMEBUFFER_OPERATION:return`INVALID_FRAMEBUFFER_OPERATION`;case e.OUT_OF_MEMORY:return`OUT_OF_MEMORY`;case e.CONTEXT_LOST_WEBGL:return`CONTEXT_LOST_WEBGL`;default:return`Unknown error code ${t}`}}function VN(e,t){return lP(e,()=>e.getExtension(t),`Extension "`+t+`" not supported on this browser.`)}function HN(e,t){let n=lP(e,()=>e.createShader(e.VERTEX_SHADER),`Unable to create vertex WebGLShader.`);if(Z(e,()=>e.shaderSource(n,t)),Z(e,()=>e.compileShader(n)),e.getShaderParameter(n,e.COMPILE_STATUS)===!1)throw console.log(e.getShaderInfoLog(n)),Error(`Failed to compile vertex shader.`);return n}function UN(e,t){let n=lP(e,()=>e.createShader(e.FRAGMENT_SHADER),`Unable to create fragment WebGLShader.`);if(Z(e,()=>e.shaderSource(n,t)),Z(e,()=>e.compileShader(n)),N().get(`ENGINE_COMPILE_ONLY`))return n;if(e.getShaderParameter(n,e.COMPILE_STATUS)===!1)throw GN(t,e.getShaderInfoLog(n)),Error(`Failed to compile fragment shader.`);return n}var WN=/ERROR: [0-9]+:([0-9]+):/g;function GN(e,t){let n=WN.exec(t);if(n==null){console.log(`Couldn't parse line number in error: ${t}`),console.log(e);return}let r=+n[1],i=e.split(`
`),a=i.length.toString().length+2,o=i.map((e,t)=>ie((t+1).toString(),a)+e),s=0;for(let e=0;e<o.length;e++)s=Math.max(o[e].length,s);let c=o.slice(0,r-1),l=o.slice(r-1,r),u=o.slice(r);console.log(c.join(`
`)),console.log(t.split(`
`)[0]),console.log(`%c ${ie(l[0],s)}`,`border:1px solid red; background-color:#e3d2d2; color:#a61717`),console.log(u.join(`
`))}function KN(e){return lP(e,()=>e.createProgram(),`Unable to create WebGLProgram.`)}function qN(e,t){if(Z(e,()=>e.linkProgram(t)),!N().get(`ENGINE_COMPILE_ONLY`)&&e.getProgramParameter(t,e.LINK_STATUS)===!1)throw console.log(e.getProgramInfoLog(t)),Error(`Failed to link vertex and fragment shaders.`)}function JN(e,t){if(Z(e,()=>e.validateProgram(t)),e.getProgramParameter(t,e.VALIDATE_STATUS)===!1)throw console.log(e.getProgramInfoLog(t)),Error(`Shader program validation failed.`)}function YN(e,t){let n=lP(e,()=>e.createBuffer(),`Unable to create WebGLBuffer`);return Z(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),Z(e,()=>e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)),n}function XN(e,t){let n=lP(e,()=>e.createBuffer(),`Unable to create WebGLBuffer`);return Z(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n)),Z(e,()=>e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW)),n}function ZN(e){return lP(e,()=>e.createTexture(),`Unable to create WebGLTexture.`)}function QN(e,t){let n=N().getNumber(`WEBGL_MAX_TEXTURE_SIZE`);if(e<=0||t<=0){let n=`[${e}x${t}]`;throw Error(`Requested texture size `+n+` is invalid.`)}if(e>n||t>n){let r=`[${e}x${t}]`,i=`[${n}x${n}]`;throw Error(`Requested texture size `+r+` greater than WebGL maximum on this browser / GPU `+i+`.`)}}function $N(e){return lP(e,()=>e.createFramebuffer(),`Unable to create WebGLFramebuffer.`)}function eP(e,t,n,r,i,a,o){let s=e.getAttribLocation(t,n);return s===-1?!1:(Z(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),Z(e,()=>e.vertexAttribPointer(s,i,e.FLOAT,!1,a,o)),Z(e,()=>e.enableVertexAttribArray(s)),!0)}function tP(e,t,n){uP(e,n),Z(e,()=>e.activeTexture(e.TEXTURE0+n)),Z(e,()=>e.bindTexture(e.TEXTURE_2D,t))}function nP(e,t,n){return lP(e,()=>e.getUniformLocation(t,n),`uniform "`+n+`" not present in program.`)}function rP(e,t,n){return e.getUniformLocation(t,n)}function iP(e,t,n,r){Z(e,()=>tP(e,t,r)),Z(e,()=>e.uniform1i(n,r))}function aP(e,t,n){Z(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,n)),Z(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0))}function oP(e,t){Z(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,t)),Z(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0))}function sP(e){let t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw Error(`Error binding framebuffer: `+cP(e,t))}function cP(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return`FRAMEBUFFER_INCOMPLETE_ATTACHMENT`;case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return`FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT`;case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return`FRAMEBUFFER_INCOMPLETE_DIMENSIONS`;case e.FRAMEBUFFER_UNSUPPORTED:return`FRAMEBUFFER_UNSUPPORTED`;default:return`unknown error ${t}`}}function lP(e,t,n){let r=Z(e,()=>t());if(r==null)throw Error(n);return r}function uP(e,t){let n=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=t+e.TEXTURE0;if(r<e.TEXTURE0||r>n){let e=`[gl.TEXTURE0, gl.TEXTURE${n}]`;throw Error(`textureUnit must be in ${e}.`)}}function dP(e,t=2){return k(e.slice(0,e.length-t))}function fP(e){if(e.length===0)throw Error(`Cannot get rows and columns of an empty shape array.`);return[e.length>1?e[e.length-2]:1,e[e.length-1]]}function pP(e){let t=[1,1,1];return e.length===0||e.length===1&&e[0]===1||(t=[dP(e),...fP(e)]),t}function mP(e,t=!1){let n=N().getNumber(`WEBGL_MAX_TEXTURE_SIZE`),r=N().getNumber(`WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE`);r===1/0&&N().getBool(`WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE`)&&(r=n/2),t&&(n*=2,r*=2,e=e.map((t,n)=>n>=e.length-2?T(e[n]):e[n]),e.length===1&&(e=[2,e[0]])),e.length!==2&&(e=se(e).newShape);let i=k(e),a=null;e.length<=1&&i<=n?a=[1,i]:e.length===2&&e[0]<=n&&e[1]<=n?a=e:e.length===3&&e[0]*e[1]<=n&&e[2]<=n?a=[e[0]*e[1],e[2]]:e.length===3&&e[0]<=n&&e[1]*e[2]<=n?a=[e[0],e[1]*e[2]]:e.length===4&&e[0]*e[1]*e[2]<=n&&e[3]<=n?a=[e[0]*e[1]*e[2],e[3]]:e.length===4&&e[0]<=n&&e[1]*e[2]*e[3]<=n&&(a=[e[0],e[1]*e[2]*e[3]]);let o=a!=null&&Math.max(...a)>r&&Math.min(...a)<=(t?2:1)&&Math.min(...a)>0;if(a==null||o)if(t){let t=dP(e),n=2,r=2;e.length&&([n,r]=fP(e)),i=n/2*t*(r/2),a=re(i).map(e=>e*2)}else a=re(i);return a}function hP(e){return e%2==0}function gP(e,t){if(e=e.slice(-2),t=t.slice(-2),A(e,t)||!e.length||!t.length||e[0]===0||e[1]===0||t[0]===0||t[1]===0)return!0;if(e.length!==t.length){let n=e[e.length-1],r=t[t.length-1];if(n===r||hP(n)&&hP(r)&&(e[0]===1||t[0]===1))return!0}return e[1]===t[1]&&hP(e[0])&&hP(t[0])}var _P,vP;function yP(e){if(_P==null){let t=wN(e);_P=t.getParameter(t.MAX_TEXTURE_SIZE)}return _P}function bP(e){if(vP==null){let t=wN(e);vP=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,vP)}function xP(e){if(e===0)return 0;let t,n=wN(e);return t=SP(n,`EXT_disjoint_timer_query_webgl2`)&&e===2?2:+!!SP(n,`EXT_disjoint_timer_query`),t}function SP(e,t){return e.getExtension(t)!=null}function CP(e){try{if(wN(e)!=null)return!0}catch(e){return console.log(`Error when getting WebGL context: `,e),!1}return!1}function wP(e){if(e===0)return!1;let t=wN(e);if(e===1){if(!SP(t,`OES_texture_float`))return!1}else if(!SP(t,`EXT_color_buffer_float`))return!1;return EP(t)}function TP(e){if(e===0)return!1;let t=wN(e);if(e===1){if(!SP(t,`OES_texture_float`)||!SP(t,`WEBGL_color_buffer_float`))return!1}else{if(SP(t,`EXT_color_buffer_float`))return EP(t);let e=`EXT_color_buffer_half_float`;return SP(t,e)?DP(t,t.getExtension(e)):!1}return EP(t)}function EP(e){let t=FN(e),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(r),i}function DP(e,t){let n=FN(e,t),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,n.internalFormatHalfFloat,1,1,0,n.textureFormatFloat,n.textureTypeHalfFloat,null);let i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let a=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(i),a}function OP(e){return e===2?wN(e).fenceSync!=null:!1}function kP(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{e!=null&&O(e.dtype!==`complex64`,()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}var Q=N();Q.registerFlag(`HAS_WEBGL`,()=>Q.getNumber(`WEBGL_VERSION`)>0),Q.registerFlag(`WEBGL_VERSION`,()=>CP(2)?2:+!!CP(1)),Q.registerFlag(`WEBGL_CHECK_NUMERICAL_PROBLEMS`,()=>!1),Q.registerFlag(`WEBGL_BUFFER_SUPPORTED`,()=>Q.get(`WEBGL_VERSION`)===2),Q.registerFlag(`WEBGL_CPU_FORWARD`,()=>!0),Q.registerFlag(`WEBGL_FORCE_F16_TEXTURES`,()=>!1),Q.registerFlag(`WEBGL_PACK`,()=>Q.getBool(`HAS_WEBGL`)),Q.registerFlag(`WEBGL_PACK_NORMALIZATION`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_PACK_CLIP`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_PACK_DEPTHWISECONV`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_PACK_BINARY_OPERATIONS`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_PACK_UNARY_OPERATIONS`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_PACK_ARRAY_OPERATIONS`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_PACK_IMAGE_OPERATIONS`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_PACK_REDUCE`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_LAZILY_UNPACK`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_CONV_IM2COL`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_PACK_CONV2DTRANSPOSE`,()=>Q.getBool(`WEBGL_PACK`)),Q.registerFlag(`WEBGL_MAX_TEXTURE_SIZE`,()=>yP(Q.getNumber(`WEBGL_VERSION`))),Q.registerFlag(`WEBGL_MAX_TEXTURES_IN_SHADER`,()=>bP(Q.getNumber(`WEBGL_VERSION`))),Q.registerFlag(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`,()=>{let e=Q.getNumber(`WEBGL_VERSION`);return e===0?0:xP(e)}),Q.registerFlag(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`,()=>Q.getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)>0&&!la()),Q.registerFlag(`WEBGL_RENDER_FLOAT32_CAPABLE`,()=>wP(Q.getNumber(`WEBGL_VERSION`))),Q.registerFlag(`WEBGL_RENDER_FLOAT32_ENABLED`,()=>Q.getBool(`WEBGL_FORCE_F16_TEXTURES`)?!1:Q.getBool(`WEBGL_RENDER_FLOAT32_CAPABLE`)),Q.registerFlag(`WEBGL_DOWNLOAD_FLOAT_ENABLED`,()=>TP(Q.getNumber(`WEBGL_VERSION`))),Q.registerFlag(`WEBGL_FENCE_API_ENABLED`,()=>OP(Q.getNumber(`WEBGL_VERSION`))),Q.registerFlag(`WEBGL_SIZE_UPLOAD_UNIFORM`,()=>Q.getBool(`WEBGL_RENDER_FLOAT32_ENABLED`)?4:0),Q.registerFlag(`WEBGL_DELETE_TEXTURE_THRESHOLD`,()=>-1,e=>{if(typeof e!=`number`)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${e}.`);if(e<0&&e!==-1)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${e}.`)}),Q.registerFlag(`WEBGL_FLUSH_THRESHOLD`,()=>la()?1:-1,e=>{if(typeof e!=`number`)throw Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${e}.`);if(e<0&&e!==-1)throw Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${e}.`)}),Q.registerFlag(`CPU_HANDOFF_SIZE_THRESHOLD`,()=>128),Q.registerFlag(`WEBGL_USE_SHAPES_UNIFORMS`,()=>!1),Q.registerFlag(`TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD`,()=>1e5),Q.registerFlag(`TOPK_K_CPU_HANDOFF_THRESHOLD`,()=>128),Q.registerFlag(`WEBGL_EXP_CONV`,()=>!1),Q.registerFlag(`SOFTWARE_WEBGL_ENABLED`,()=>Q.getBool(`IS_TEST`)),Q.registerFlag(`WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE`,()=>1/0),Q.registerFlag(`WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE`,()=>!1),Q.registerFlag(`WEBGL2_ISNAN_CUSTOM`,()=>!1),Q.registerFlag(`ENGINE_COMPILE_ONLY`,()=>!1);function AP(){let e,t,n,r,i,a,o,s,c,l;return N().getNumber(`WEBGL_VERSION`)===2?(e=`#version 300 es`,t=`in`,n=`out`,r=`in`,i=`texture`,a=`outputColor`,o=`out vec4 outputColor;`,s=N().getBool(`WEBGL2_ISNAN_CUSTOM`)?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:``,c=``,l=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(e=``,t=`attribute`,n=`varying`,r=`varying`,i=`texture2D`,a=`gl_FragColor`,o=``,s=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,c=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,l=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:e,attribute:t,varyingVs:n,varyingFs:r,texture2D:i,output:a,defineOutput:o,defineSpecialNaN:s,defineSpecialInf:c,defineRound:l}}function jP(e,t,n=`index`){let r=M(t);return r.map((t,i)=>`${`int ${e[i]} = ${n} / ${t}`}; ${i===r.length-1?`int ${e[i+1]} = ${n} - ${e[i]} * ${t}`:`index -= ${e[i]} * ${t}`};`).join(``)}function MP(e,t,n=`index`){let r=M(t);return r.map((t,i)=>`${`int ${e[i]} = ${n} / outShapeStrides[${i}]`}; ${i===r.length-1?`int ${e[i+1]} = ${n} - ${e[i]} * outShapeStrides[${i}]`:`index -= ${e[i]} * outShapeStrides[${i}]`};`).join(``)}function NP(e,t){let n=e.length,r=e.map(e=>`${t}[${e}]`),i=Array(n-1);i[n-2]=r[n-1];for(let e=n-3;e>=0;--e)i[e]=`(${i[e+1]} * ${r[e+1]})`;return i}function PP(e,t,n=`index`){let r=NP(e.map((e,t)=>t),t);return r.map((t,i)=>`${`int ${e[i]} = ${n} / ${r[i]}`}; ${i===r.length-1?`int ${e[i+1]} = ${n} - ${e[i]} * ${r[i]}`:`index -= ${e[i]} * ${r[i]}`};`).join(``)}function FP(e){let t=M(e).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function IP(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}var LP=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`,{getBroadcastDims:RP}=ng;function zP(e,t,n){let r=[];if(e.forEach(e=>{let t=k(e.shapeInfo.logicalShape);if(e.shapeInfo.isUniform?r.push(`uniform float ${e.name}${t>1?`[${t}]`:``};`):(r.push(`uniform sampler2D ${e.name};`),r.push(`uniform int offset${e.name};`)),n.enableShapeUniforms){let{uniformShape:t}=DF(n.packedInputs,e.shapeInfo.logicalShape,e.shapeInfo.texShape);switch(t.length){case 1:r.push(`uniform int ${e.name}Shape;`);break;case 2:r.push(`uniform ivec2 ${e.name}Shape;`);break;case 3:r.push(`uniform ivec3 ${e.name}Shape;`);break;case 4:r.push(`uniform ivec4 ${e.name}Shape;`);break;default:break}r.push(`uniform ivec2 ${e.name}TexShape;`)}}),n.enableShapeUniforms){switch(t.logicalShape.length){case 1:r.push(`uniform int outShape;`);break;case 2:r.push(`uniform ivec2 outShape;`),r.push(`uniform int outShapeStrides;`);break;case 3:r.push(`uniform ivec3 outShape;`),r.push(`uniform ivec2 outShapeStrides;`);break;case 4:r.push(`uniform ivec4 outShape;`),r.push(`uniform ivec3 outShapeStrides;`);break;default:break}r.push(`uniform ivec2 outTexShape;`)}n.customUniforms&&n.customUniforms.forEach(e=>{r.push(`uniform ${e.type} ${e.name}${e.arrayIndex?`[${e.arrayIndex}]`:``};`)});let i=r.join(`
`),a=e.map(e=>HP(e,t,n.packedInputs,n.enableShapeUniforms)).join(`
`),o=t.texShape,s=AP(),c=GP(s),l,u,d=JP(s);return t.isPacked?(l=UP(t.logicalShape,o,n.enableShapeUniforms),u=qP(s)):(l=WP(t.logicalShape,o,n.enableShapeUniforms),u=KP(s)),n.packedInputs&&(d+=QP),[d,c,u,i,l,a,n.userCode].join(`
`)}function BP(e,t=!1){let n=e.shapeInfo.logicalShape;switch(n.length){case 0:return fF(e,t);case 1:return mF(e,t);case 2:return gF(e,t);case 3:return vF(e,t);case 4:return bF(e,t);case 5:return xF(e);case 6:return SF(e);default:throw Error(`${n.length}-D input sampling is not yet supported`)}}function VP(e,t){switch(e.shapeInfo.logicalShape.length){case 0:return dF(e);case 1:return pF(e,t);case 2:return hF(e,t);case 3:return _F(e,t);default:return yF(e,t)}}function HP(e,t,n=!1,r){let i=``;n?i+=VP(e,r):i+=BP(e,r);let a=e.shapeInfo.logicalShape,o=t.logicalShape;return a.length<=o.length&&(n?i+=wF(e,t):i+=TF(e,t)),i}function UP(e,t,n){switch(e.length){case 0:return $P();case 1:return eF(e,t,n);case 2:return cF(e,t,n);case 3:return nF(e,t,n);default:return iF(e,t,n)}}function WP(e,t,n){switch(e.length){case 0:return $P();case 1:return tF(e,t,n);case 2:return lF(e,t,n);case 3:return rF(e,t,n);case 4:return aF(e,t,n);case 5:return oF(e,t);case 6:return sF(e,t);default:throw Error(`${e.length}-D output sampling is not yet supported`)}}function GP(e){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${e.texture2D}(textureSampler, uv).r;
    }
  `}function KP(e){return`
    void setOutput(float val) {
      ${e.output} = vec4(val, 0, 0, 0);
    }
  `}function qP(e){return`
    void setOutput(vec4 val) {
      ${e.output} = val;
    }
  `}function JP(e){return`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFs} vec2 resultUV;
    ${e.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${e.defineSpecialNaN}
    ${e.defineSpecialInf}
    ${e.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${YP}
    ${XP}
    ${ZP}
  `}var YP=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,XP=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,ZP=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,QP=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function $P(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function eF(e,t,n){let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];return r[0]===1?n?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${r[1]}.0);
      }
    `:r[1]===1?n?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${r[0]}.0);
      }
    `:n?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      return 2 * (resTexRC.x * ${r[1]} + resTexRC.y);
    }
  `}function tF(e,t,n){return t[0]===1?n?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${t[1]}.0);
      }
    `:t[1]===1?n?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${t[0]}.0);
      }
    `:n?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      return resTexRC.x * ${t[1]} + resTexRC.y;
    }
  `}function nF(e,t,n){if(n)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(e[2]/2),a=i*Math.ceil(e[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      int b = index / ${a};
      index -= b * ${a};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec3(b, r, c);
    }
  `}function rF(e,t,n){if(n)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${MP([`r`,`c`,`d`],e)}
    return ivec3(r, c, d);
  }
`;let r=jP([`r`,`c`,`d`],e);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${r}
      return ivec3(r, c, d);
    }
  `}function iF(e,t,n){if(n)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(e[e.length-1]/2),a=i*Math.ceil(e[e.length-2]/2),o=a,s=``,c=`b, r, c`;for(let t=2;t<e.length-1;t++)o*=e[e.length-t-1],s=`
      int b${t} = index / ${o};
      index -= b${t} * ${o};
    `+s,c=`b${t}, `+c;return`
    ivec${e.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      ${s}

      int b = index / ${a};
      index -= b * ${a};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec${e.length}(${c});
    }
  `}function aF(e,t,n){if(n)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${MP([`r`,`c`,`d`,`d2`],e)}
      return ivec4(r, c, d, d2);
    }
  `;let r=jP([`r`,`c`,`d`,`d2`],e);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${r}
      return ivec4(r, c, d, d2);
    }
  `}function oF(e,t){let n=jP([`r`,`c`,`d`,`d2`,`d3`],e);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},
                             ${t[1]}));

      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${n}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function sF(e,t){let n=jP([`r`,`c`,`d`,`d2`,`d3`,`d4`],e);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${n}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function cF(e,t,n){let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(A(e,t))return n?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${r[0]}, ${r[1]}));
      }
    `;let i=Math.ceil(e[1]/2);return n?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));

      int index = resTexRC.x * ${r[1]} + resTexRC.y;
      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec2(r, c);
    }
  `}function lF(e,t,n){return A(e,t)?n?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));
      }
    `:e[1]===1?n?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:e[0]===1?n?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:n?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      int r = index / ${e[1]};
      int c = index - r * ${e[1]};
      return ivec2(r, c);
    }
  `}function uF(e){return`offset${e}`}function dF(e){let t=e.name;return`
    vec4 ${`get`+t.charAt(0).toUpperCase()+t.slice(1)}() {
      return ${AP().texture2D}(${t}, halfCR);
    }
  `}function fF(e,t){let n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`float ${r}() {return ${n};}`;let[i,a]=e.shapeInfo.texShape;if(i===1&&a===1)return`
      float ${r}() {
        return sampleTexture(${n}, halfCR);
      }
    `;let o=uF(n);if(t)return`
    float ${r}() {
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], ${o});
      return sampleTexture(${n}, uv);
    }
  `;let[s,c]=e.shapeInfo.texShape;return`
    float ${r}() {
      vec2 uv = uvFromFlat(${s}, ${c}, ${o});
      return sampleTexture(${n}, uv);
    }
  `}function pF(e,t){let n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1),i=e.shapeInfo.texShape,a=AP();if(t)return`
    vec4 ${r}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${a.texture2D}(${n}, uv);
    }
  `;let o=[Math.ceil(i[0]/2),Math.ceil(i[1]/2)];return`
    vec4 ${r}(int index) {
      vec2 uv = packedUVfrom1D(
        ${o[0]}, ${o[1]}, index);
      return ${a.texture2D}(${n}, uv);
    }
  `}function mF(e,t){let n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`
      float ${r}(int index) {
        ${CF(e)}
      }
    `;let i=e.shapeInfo.texShape,a=i[0],o=i[1];if(o===1&&a===1)return`
      float ${r}(int index) {
        return sampleTexture(${n}, halfCR);
      }
    `;let s=uF(n);return o===1?t?`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${s}) + 0.5) / float(${n}TexShape[0]));
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${s}) + 0.5) / ${a}.0);
        return sampleTexture(${n}, uv);
      }
    `:a===1?t?`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${s}) + 0.5) / float(${n}TexShape[1]), 0.5);
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${s}) + 0.5) / ${o}.0, 0.5);
        return sampleTexture(${n}, uv);
      }
    `:t?`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], index + ${s});
      return sampleTexture(${n}, uv);
    }
  `:`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${a}, ${o}, index + ${s});
      return sampleTexture(${n}, uv);
    }
  `}function hF(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape,o=a[0],s=a[1],c=AP();if(a!=null&&A(n,a))return t?`
      vec4 ${i}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);

        return ${c.texture2D}(${r}, uv);
      }
    `:`
      vec4 ${i}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}.0, ${o}.0);

        return ${c.texture2D}(${r}, uv);
      }
    `;if(t)return`
    vec4 ${i}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${c.texture2D}(${r}, uv);
    }
  `;let l=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)];return`
    vec4 ${i}(int row, int col) {
      vec2 uv = packedUVfrom2D(${Math.ceil(n[1]/2)}, ${l[0]}, ${l[1]}, row, col);
      return ${c.texture2D}(${r}, uv);
    }
  `}function gF(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape;if(a!=null&&A(n,a)){if(t)return`
      float ${i}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `;let e=a[0];return`
    float ${i}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${a[1]}.0, ${e}.0);
      return sampleTexture(${r}, uv);
    }
  `}let{newShape:o,keptDims:s}=se(n),c=o;if(c.length<n.length)return`
      ${BP(OF(e,c),t)}
      float ${i}(int row, int col) {
        return ${i}(${kF([`row`,`col`],s)});
      }
    `;if(e.shapeInfo.isUniform)return`
      float ${i}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${n[1]}, 1)));
        ${CF(e)}
      }
    `;let l=a[0],u=a[1],d=uF(r);return u===1?t?`
      float ${i}(int row, int col) {
        float index = dot(vec3(row, col, ${d}), vec3(${r}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${r}TexShape[0]));
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${i}(int row, int col) {
      float index = dot(vec3(row, col, ${d}), vec3(${n[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
      return sampleTexture(${r}, uv);
    }
  `:l===1?t?`
      float ${i}(int row, int col) {
        float index = dot(vec3(row, col, ${d}), vec3(${r}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${r}TexShape[1]), 0.5);
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${i}(int row, int col) {
      float index = dot(vec3(row, col, ${d}), vec3(${n[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${u}.0, 0.5);
      return sampleTexture(${r}, uv);
    }
  `:t?`
      float ${i}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${r}Shape[1] + col + ${d};
        vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index);
        return sampleTexture(${r}, uv);
      }
    `:`
  float ${i}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${n[1]} + col + ${d};
    vec2 uv = uvFromFlat(${l}, ${u}, index);
    return sampleTexture(${r}, uv);
  }
`}function _F(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape,o=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)];if(n[0]===1)return`
        ${VP(OF(e,n.slice(1)),t)}
        vec4 ${i}(int b, int row, int col) {
          return ${i}(${kF([`b`,`row`,`col`],[1,2])});
        }
      `;let s=AP();if(t)return`
    vec4 ${i}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${s.texture2D}(${r}, uv);
    }
  `;let c=o[0],l=o[1],u=Math.ceil(n[2]/2);return`
    vec4 ${i}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${l}, ${u*Math.ceil(n[1]/2)}, ${u}, b, row, col);
      return ${s.texture2D}(${r}, uv);
    }
  `}function vF(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=n[1]*n[2],o=n[2],{newShape:s,keptDims:c}=se(n),l=s;if(l.length<n.length)return`
        ${BP(OF(e,l),t)}
        float ${i}(int row, int col, int depth) {
          return ${i}(${kF([`row`,`col`,`depth`],c)});
        }
      `;if(e.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${a}, ${o}, 1)));
        ${CF(e)}
      }
    `;let u=e.shapeInfo.texShape,d=u[0],f=u[1],p=e.shapeInfo.flatOffset;if(f===a&&p==null)return t?`
      float ${i}(int row, int col, int depth) {
        int stride1 = ${r}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
        float ${i}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${o}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${f}.0, ${d}.0);
          return sampleTexture(${r}, uv);
        }
      `;if(f===o&&p==null)return t?`
      float ${i}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${r}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${i}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${n[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${f}.0, ${d}.0);
      return sampleTexture(${r}, uv);
    }
  `;let m=uF(r);return t?`
    float ${i}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${r}Shape[1] * ${r}Shape[2];
      int stride1 = ${r}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${m};
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index);
      return sampleTexture(${r}, uv);
    }
    `:`
      float ${i}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${a} + col * ${o} + depth + ${m};
        vec2 uv = uvFromFlat(${d}, ${f}, index);
        return sampleTexture(${r}, uv);
      }
  `}function yF(e,t){let n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1),i=AP();if(t)return`
    vec4 ${r}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${n}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${n}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${n}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${i.texture2D}(${n}, uv);
    }
  `;let a=e.shapeInfo.logicalShape,o=a.length,s=e.shapeInfo.texShape,c=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],l=c[0],u=c[1],d=Math.ceil(a[o-1]/2),f=d*Math.ceil(a[o-2]/2),p=`int b, int row, int col`,m=`b * ${f} + (row / 2) * ${d} + (col / 2)`;for(let e=2;e<o-1;e++)p=`int b${e}, `+p,f*=a[o-e-1],m=`b${e} * ${f} + `+m;return`
    vec4 ${r}(${p}) {
      int index = ${m};
      int texR = index / ${u};
      int texC = index - texR * ${u};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${u}, ${l});
      return ${i.texture2D}(${n}, uv);
    }
  `}function bF(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=n[3],o=n[2]*a,s=n[1]*o,{newShape:c,keptDims:l}=se(n);if(c.length<n.length)return`
      ${BP(OF(e,c),t)}
      float ${i}(int row, int col, int depth, int depth2) {
        return ${i}(${kF([`row`,`col`,`depth`,`depth2`],l)});
      }
    `;if(e.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${s}, ${o}, ${a}, 1)));
        ${CF(e)}
      }
    `;let u=e.shapeInfo.flatOffset,d=e.shapeInfo.texShape,f=d[0],p=d[1],m=`int stride2 = ${r}Shape[3];`,h=`int stride1 = ${r}Shape[2] * stride2;`,g=`int stride0 = ${r}Shape[1] * stride1;`;if(p===s&&u==null)return t?`
      float ${i}(int row, int col, int depth, int depth2) {
        ${m}
        ${h}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${i}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${o}, ${a}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${p}.0, ${f}.0);
        return sampleTexture(${r}, uv);
      }
    `;if(p===a&&u==null)return t?`
      float ${i}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${r}Shape[1] * ${r}Shape[2], ${r}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${i}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${n[1]*n[2]}, ${n[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${f}.0);
        return sampleTexture(${r}, uv);
      }
    `;let _=uF(r);return t?`
    float ${i}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${m}
      ${h}
      ${g}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index + ${_});
      return sampleTexture(${r}, uv);
    }
  `:`
    float ${i}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${s} + col * ${o} +
          depth * ${a} + depth2;
      vec2 uv = uvFromFlat(${f}, ${p}, index + ${_});
      return sampleTexture(${r}, uv);
    }
  `}function xF(e){let t=e.shapeInfo.logicalShape,n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1),i=t[4],a=t[3]*i,o=t[2]*a,s=t[1]*o,{newShape:c,keptDims:l}=se(t);if(c.length<t.length)return`
      ${BP(OF(e,c))}
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        return ${r}(${kF([`row`,`col`,`depth`,`depth2`,`depth3`],l)});
      }
    `;if(e.shapeInfo.isUniform)return`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${s}, ${o}, ${a}, ${i})) +
          depth3;
        ${CF(e)}
      }
    `;let u=e.shapeInfo.flatOffset,d=e.shapeInfo.texShape,f=d[0],p=d[1];return p===s&&u==null?`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${o}, ${a}, ${i}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${p}.0, ${f}.0);
        return sampleTexture(${n}, uv);
      }
    `:p===i&&u==null?`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]},
               ${t[2]*t[3]}, ${t[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${f}.0);
        return sampleTexture(${n}, uv);
      }
    `:`
    float ${r}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${s} + col * ${o} + depth * ${a} +
          depth2 * ${i} + depth3 + ${uF(n)};
      vec2 uv = uvFromFlat(${f}, ${p}, index);
      return sampleTexture(${n}, uv);
    }
  `}function SF(e){let t=e.shapeInfo.logicalShape,n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1),{newShape:i,keptDims:a}=se(t);if(i.length<t.length)return`
      ${BP(OF(e,i))}
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${r}(${kF([`row`,`col`,`depth`,`depth2`,`depth3`,`depth4`],a)});
      }
    `;let o=t[5],s=t[4]*o,c=t[3]*s,l=t[2]*c,u=t[1]*l;if(e.shapeInfo.isUniform)return`
      float ${r}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${l}, ${c}, ${s})) +
          dot(
            vec2(depth3, depth4),
            vec2(${o}, 1)));
        ${CF(e)}
      }
    `;let d=e.shapeInfo.flatOffset,f=e.shapeInfo.texShape,p=f[0],m=f[1];return m===u&&d==null?`
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${l}, ${c}, ${s}, ${o})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${m}.0, ${p}.0);
        return sampleTexture(${n}, uv);
      }
    `:m===o&&d==null?`
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]*t[4]},
               ${t[2]*t[3]*t[4]},
               ${t[3]*t[4]},
               ${t[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${m}.0, ${p}.0);
        return sampleTexture(${n}, uv);
      }
    `:`
    float ${r}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${l} + depth * ${c} +
          depth2 * ${s} + depth3 * ${o} + depth4 + ${uF(n)};
      vec2 uv = uvFromFlat(${p}, ${m}, index);
      return sampleTexture(${n}, uv);
    }
  `}function CF(e){let t=e.name,n=k(e.shapeInfo.logicalShape);return n<2?`return ${t};`:`
    for (int i = 0; i < ${n}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function wF(e,t){let n=e.name,r=n.charAt(0).toUpperCase()+n.slice(1),i=`get`+r+`AtOutCoords`,a=e.shapeInfo.logicalShape.length,o=t.logicalShape.length,s=RP(e.shapeInfo.logicalShape,t.logicalShape),c=EF(o),l=o-a,u,d=[`x`,`y`,`z`,`w`,`u`,`v`];u=a===0?``:o<2&&s.length>=1?`coords = 0;`:s.map(e=>`coords.${d[e+l]} = 0;`).join(`
`);let f=``;f=o<2&&a>0?`coords`:e.shapeInfo.logicalShape.map((e,t)=>`coords.${d[t+l]}`).join(`, `);let p=`return outputValue;`,m=k(e.shapeInfo.logicalShape)===1,h=k(t.logicalShape)===1;if(a===1&&!m&&!h)p=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(m&&!h)p=o===1?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(s.length){let e=a-2,t=a-1;s.indexOf(e)>-1&&s.indexOf(t)>-1?p=`return vec4(outputValue.x);`:s.indexOf(e)>-1?p=`return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);`:s.indexOf(t)>-1&&(p=`return vec4(outputValue.xx, outputValue.zz);`)}return`
    vec4 ${i}() {
      ${c} coords = getOutputCoords();
      ${u}
      vec4 outputValue = get${r}(${f});
      ${p}
    }
  `}function TF(e,t){let n=e.name,r=n.charAt(0).toUpperCase()+n.slice(1),i=`get`+r+`AtOutCoords`,a=t.texShape,o=e.shapeInfo.texShape,s=e.shapeInfo.logicalShape.length,c=t.logicalShape.length;if(!e.shapeInfo.isUniform&&s===c&&e.shapeInfo.flatOffset==null&&A(o,a))return`
      float ${i}() {
        return sampleTexture(${n}, resultUV);
      }
    `;let l=EF(c),u=RP(e.shapeInfo.logicalShape,t.logicalShape),d=c-s,f,p=[`x`,`y`,`z`,`w`,`u`,`v`];f=s===0?``:c<2&&u.length>=1?`coords = 0;`:u.map(e=>`coords.${p[e+d]} = 0;`).join(`
`);let m=``;return m=c<2&&s>0?`coords`:e.shapeInfo.logicalShape.map((e,t)=>`coords.${p[t+d]}`).join(`, `),`
    float ${i}() {
      ${l} coords = getOutputCoords();
      ${f}
      return get${r}(${m});
    }
  `}function EF(e){if(e<=1)return`int`;if(e===2)return`ivec2`;if(e===3)return`ivec3`;if(e===4)return`ivec4`;if(e===5)return`ivec5`;if(e===6)return`ivec6`;throw Error(`GPU for rank ${e} is not yet supported`)}function DF(e,t,n){let{newShape:r,keptDims:i}=se(t),a=t.length,o=e&&a===3&&t[0]===1,s=o?t.slice(1):r,c=!e&&a>1&&!A(t,n)&&r.length<a||o;return{useSqueezeShape:c,uniformShape:c?s:t,keptDims:i}}function OF(e,t){let n=JSON.parse(JSON.stringify(e));return n.shapeInfo.logicalShape=t,n}function kF(e,t){return t.map(t=>e[t]).join(`, `)}function AF(e,t,n,r){let i=n.map((e,n)=>{let r={logicalShape:e.shape,texShape:e.isUniform?null:e.texData.texShape,isUniform:e.isUniform,isPacked:e.isUniform?!1:e.texData.isPacked,flatOffset:null};return e.texData!=null&&e.texData.slice!=null&&e.texData.slice.flatOffset>0&&(r.flatOffset=e.texData.slice.flatOffset),{name:t.variableNames[n],shapeInfo:r}}),a=i.map(e=>e.shapeInfo),o={logicalShape:r.shape,texShape:r.texData.texShape,isUniform:!1,isPacked:r.texData.isPacked,flatOffset:null},s=zP(i,o,t),c=UN(e.gl,s),l=e.createProgram(c);return N().get(`ENGINE_COMPILE_ONLY`)?{program:t,fragmentShader:c,source:s,webGLProgram:l,inShapeInfos:a,outShapeInfo:o,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(e.buildVao(l),Object.assign({program:t,fragmentShader:c,source:s,webGLProgram:l,inShapeInfos:a,outShapeInfo:o},jF(e,t,l)))}function jF(e,t,n){let r=[],i=[],a,o,s,c=null,l=null;l=e.getUniformLocation(n,`NAN`,!1),N().getNumber(`WEBGL_VERSION`)===1&&(c=e.getUniformLocation(n,`INFINITY`,!1));for(let i of t.variableNames){let a={name:i,uniform:e.getUniformLocation(n,i,!1),offset:e.getUniformLocation(n,`offset${i}`,!1)};t.enableShapeUniforms&&(a.shape=e.getUniformLocation(n,`${i}Shape`,!1),a.texShape=e.getUniformLocation(n,`${i}TexShape`,!1)),r.push(a)}if(t.enableShapeUniforms&&(a=e.getUniformLocation(n,`outShape`,!1),s=e.getUniformLocation(n,`outShapeStrides`,!1),o=e.getUniformLocation(n,`outTexShape`,!1)),t.customUniforms)for(let r of t.customUniforms)i.push(e.getUniformLocation(n,r.name,!1));return{variablesLocations:r,customUniformLocations:i,infLoc:c,nanLoc:l,outShapeLocation:a,outShapeStridesLocation:s,outTexShapeLocation:o}}function MF(e,t){if(e.length!==t.length)throw Error(`Binary was compiled with ${e.length} inputs, but was executed with ${t.length} inputs`);e.forEach((e,n)=>{let r=e.logicalShape,i=t[n],a=i.shape;if(!A(r,a))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${r} and ${a} must match`);if(e.isUniform&&i.isUniform)return;let o=e.texShape,s=i.isUniform?null:i.texData.texShape;if(!A(o,s))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${o} and ${s} must match`)})}function NF(e,t,n,r,i){t.program.enableShapeUniforms||(MF(t.inShapeInfos,n),MF([t.outShapeInfo],[r]));let a=r.texData.texture,o=r.texData.texShape;r.texData.isPacked?e.setOutputPackedMatrixTexture(a.texture,o[0],o[1]):e.setOutputMatrixTexture(a.texture,o[0],o[1]),e.setProgram(t.webGLProgram),e.bindVertexArray(t.webGLProgram.vao),N().getNumber(`WEBGL_VERSION`)===1&&t.infLoc!==null&&e.gl.uniform1f(t.infLoc,1/0),t.nanLoc!==null&&e.gl.uniform1f(t.nanLoc,NaN);for(let r=0;r<n.length;++r){let i=n[r],{uniform:a,offset:o,shape:s,texShape:c}=t.variablesLocations[r];if(s){let{uniformShape:n}=DF(t.program.packedInputs,i.shape,i.texData.texShape);switch(n.length){case 1:e.gl.uniform1iv(s,new Int32Array(n));break;case 2:e.gl.uniform2iv(s,new Int32Array(n));break;case 3:e.gl.uniform3iv(s,new Int32Array(n));break;case 4:e.gl.uniform4iv(s,new Int32Array(n));break;default:break}}if(c&&e.gl.uniform2i(c,i.texData.texShape[0],i.texData.texShape[1]),a!=null){if(i.isUniform){if(k(i.shape)<2)e.gl.uniform1f(a,i.uniformValues[0]);else{let t=i.uniformValues;t instanceof Float32Array||(t=new Float32Array(t)),e.gl.uniform1fv(a,t)}continue}i.texData.slice!=null&&o!=null&&e.gl.uniform1i(o,i.texData.slice.flatOffset),e.setInputMatrixTexture(i.texData.texture.texture,a,r)}}let s=t.outShapeLocation;if(s)switch(r.shape.length){case 1:e.gl.uniform1iv(s,new Int32Array(r.shape));break;case 2:e.gl.uniform2iv(s,new Int32Array(r.shape));break;case 3:e.gl.uniform3iv(s,new Int32Array(r.shape));break;case 4:e.gl.uniform4iv(s,new Int32Array(r.shape));break;default:break}if(t.outShapeStridesLocation){let n=M(r.shape);switch(r.shape.length){case 2:e.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(n));break;case 3:e.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(n));break;case 4:e.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(n));break;default:break}}if(t.outTexShapeLocation&&e.gl.uniform2i(t.outTexShapeLocation,r.texData.texShape[0],r.texData.texShape[1]),t.program.customUniforms&&i)for(let n=0;n<t.program.customUniforms.length;++n){let r=t.program.customUniforms[n],a=t.customUniformLocations[n],o=i[n];if(r.type===`float`)e.gl.uniform1fv(a,o);else if(r.type===`vec2`)e.gl.uniform2fv(a,o);else if(r.type===`vec3`)e.gl.uniform3fv(a,o);else if(r.type===`vec4`)e.gl.uniform4fv(a,o);else if(r.type===`int`)e.gl.uniform1iv(a,o);else if(r.type===`ivec2`)e.gl.uniform2iv(a,o);else if(r.type===`ivec3`)e.gl.uniform3iv(a,o);else if(r.type===`ivec4`)e.gl.uniform4iv(a,o);else throw Error(`uniform type ${r.type} is not supported yet.`)}e.executeProgram()}function PF(e,t,n){let r=``;t.concat(n).forEach(t=>{let i=t.texData!=null&&t.texData.slice!=null&&t.texData.slice.flatOffset>0;if(e.enableShapeUniforms&&!t.isUniform){let a=t.texData.texShape,{useSqueezeShape:o,uniformShape:s,keptDims:c}=DF(e.packedInputs,t.shape,a),l=``,u=``,d=``;if(s.length===1&&e.packedInputs){let e=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)];l=`${e[0]>1}_${e[1]>1}`}else if(s.length===2&&!e.packedInputs)u=`${s[0]>1}_${s[1]>1}`;else if(s.length>2&&!e.packedInputs){let e=M(s);d=`${e[0]===a[1]}_${e[e.length-1]===a[1]}`}let f=t.shape.length,p=s.length===2&&A(t.shape,a),m=k(t.shape)===1,h=Bc(t.shape,n.shape),g=!e.packedInputs&&f===n.shape.length&&A(a,n.texData.texShape),_=e.packedInputs||s.length>2?``:`${a[0]>1}_${a[1]>1}`;r+=`${f}_${g}_${o?c:``}_${s.length}_${m}_${h}_${p}_${l}_${u}_${d}_${_}_${i}`}else{let e=t.isUniform?`uniform`:t.texData.texShape;r+=`${t.shape}_${e}_${i}`}});let i=e.userCode,a=e.constructor.name;return a+=`_`+r+`_`+i+`${N().getNumber(`WEBGL_VERSION`)}`,a}function FF(e){return N().getBool(`WEBGL_USE_SHAPES_UNIFORMS`)&&e<=4}var IF=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=DN.DENSE,this.customUniforms=[{name:`texShape`,type:`ivec2`}];let t=AP();this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?MP([`r`,`c`,`d`],e):jP([`r`,`c`,`d`],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${t.output} = result;
      }
    `}},LF=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=DN.DENSE,this.customUniforms=[{name:`texShape`,type:`ivec2`}];let t=AP();this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?MP([`r`,`c`,`d`],e):jP([`r`,`c`,`d`],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${t.output} = result;
      }
    `}},RF=class{constructor(e){this.variableNames=[`A`],this.outTexUsage=ON.DOWNLOAD;let t=AP();this.outputShape=e,this.userCode=`
      ${LP}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}},zF=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=ON.DOWNLOAD;let t=AP();this.outputShape=e,this.userCode=`
      ${LP}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}},BF={R:0,G:1,B:2,A:3},VF=class{constructor(e,t=!1,n=`RGBA`){this.variableNames=[`A`],this.customUniforms=[{name:`texShape`,type:`ivec2`}];let r=AP();this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length);let i=`result`;t&&(i=`floor(result * 255. + 0.5)`);let a=``;for(let e=0;e<n.length;e++){let t=n[e];a+=`
          if(offset == ${e}) {
            result = values[${BF[t]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?IP():FP(e)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${n.length});

        flatIndex = idiv(flatIndex, ${n.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${r.texture2D}(A, uv);
          ${a}
        }
        ${r.output} = vec4(${i}, 0., 0., 0.);
      }
    `}},HF=class{constructor(e,t=!1){this.variableNames=[`A`],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:`texShape`,type:`ivec2`}];let n=AP();this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length);let r=``,i=`result`;t&&(i=`floor(result * 255. + 0.5)`);for(let t=0;t<=1;t++)for(let i=0;i<=1;i++){let a=t*2+i;r+=`
          localCoords = coords;
          if(localCoords[2] + ${i} < ${this.enableShapeUniforms?`outShape[2]`:`${e[2]}`}) {
          localCoords[2] += ${i};
          if (localCoords[1] + ${t} < ${this.enableShapeUniforms?`outShape[1]`:`${e[1]}`}) {
            localCoords[1] += ${t};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${n.texture2D}(A, uv);

            if (offset == 0) {
              result[${a}] = values[0];
            } else if (offset == 1) {
              result[${a}] = values[1];
            } else if (offset == 2) {
              result[${a}] = values[2];
            } else {
              result[${a}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?IP():FP(e)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${r}

          ${n.output} = ${i};
        }
    `}};function UF(e){let t=AP();return HN(e,`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`)}function WF(e){return YN(e,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function GF(e){return XN(e,new Uint16Array([0,1,2,2,1,3]))}function KF(e,t,n,r,i,a){QN(t,n);let o=ZN(e),s=e.TEXTURE_2D;return Z(e,()=>e.bindTexture(s,o)),Z(e,()=>e.texParameteri(s,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)),Z(e,()=>e.texParameteri(s,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),Z(e,()=>e.texParameteri(s,e.TEXTURE_MIN_FILTER,e.NEAREST)),Z(e,()=>e.texParameteri(s,e.TEXTURE_MAG_FILTER,e.NEAREST)),N().getNumber(`WEBGL_VERSION`)===1?Z(e,()=>e.texImage2D(s,0,r,t,n,0,i,a,null)):Z(e,()=>e.texStorage2D(s,1,r,t,n)),Z(e,()=>e.bindTexture(e.TEXTURE_2D,null)),{texture:o,texShape:[n,t]}}function qF(e){return e.internalFormatFloat}function JF(e,t,n,r){let[i,a]=AN(t,n);return KF(e,i,a,qF(r),r.textureFormatFloat,e.FLOAT)}function YF(e){return e.internalFormatHalfFloat}function XF(e,t,n,r){let[i,a]=AN(t,n);return KF(e,i,a,YF(r),r.textureFormatFloat,r.textureTypeHalfFloat)}function ZF(e){return e.downloadTextureFormat}function QF(e,t,n,r){let[i,a]=AN(t,n);return KF(e,i,a,ZF(r),e.RGBA,e.UNSIGNED_BYTE)}function $F(e){return e.internalFormatPackedFloat}function eI(e,t,n,r){let[i,a]=NN(t,n);return KF(e,i,a,$F(r),e.RGBA,e.FLOAT)}function tI(e){return e.internalFormatPackedHalfFloat}function nI(e,t,n,r){let[i,a]=NN(t,n);return KF(e,i,a,tI(r),e.RGBA,r.textureTypeHalfFloat)}function rI(e,t,n){return Z(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),eP(e,t,`clipSpacePos`,n,3,20,0)&&eP(e,t,`uv`,n,2,20,12)}function iI(e,t,n,r,i,a){Z(e,()=>e.bindTexture(e.TEXTURE_2D,t));let o,s,c;i instanceof Uint8Array?(o=new Uint8Array(n*r*4),s=e.UNSIGNED_BYTE,c=e.RGBA):(o=new Float32Array(n*r*4),s=e.FLOAT,c=a.internalFormatPackedFloat),o.set(i),N().getNumber(`WEBGL_VERSION`)===2?Z(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,n,r,e.RGBA,s,o)):Z(e,()=>e.texImage2D(e.TEXTURE_2D,0,c,n,r,0,e.RGBA,s,o)),Z(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function aI(e,t,n){Z(e,()=>e.bindTexture(e.TEXTURE_2D,t)),n.data instanceof Uint8Array?N().getNumber(`WEBGL_VERSION`)===2?Z(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,e.RGBA,e.UNSIGNED_BYTE,n.data)):Z(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data)):N().getNumber(`WEBGL_VERSION`)===2?Z(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,e.RGBA,e.UNSIGNED_BYTE,n)):Z(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n)),Z(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function oI(e,t,n,r){let i=e.createBuffer();Z(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,i));let a=16*t*n;return Z(e,()=>e.bufferData(e.PIXEL_PACK_BUFFER,a,e.STREAM_READ)),Z(e,()=>e.readPixels(0,0,n,t,e.RGBA,e.FLOAT,0)),Z(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,null)),i}function sI(e,t,n){let r=e,i=new Float32Array(n);return r.bindBuffer(r.PIXEL_PACK_BUFFER,t),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,i),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),i}function cI(e,t,n,r){let[i,a]=AN(t,n),o=new Uint8Array(jN(t*n,4));return Z(e,()=>e.readPixels(0,0,i,a,r.downloadTextureFormat,e.UNSIGNED_BYTE,o)),new Float32Array(o.buffer)}function lI(e,t,n,r,i,a,o,s){let c=e,l=new Float32Array(PN(a,o));return c.bindBuffer(c.PIXEL_PACK_BUFFER,t),c.getBufferSubData(c.PIXEL_PACK_BUFFER,0,l),c.bindBuffer(c.PIXEL_PACK_BUFFER,null),l}function uI(e,t,n){let r=new Float32Array(t*n*4);return Z(e,()=>e.readPixels(0,0,n,t,e.RGBA,e.FLOAT,r)),r}var dI=class{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let t=N().getNumber(`WEBGL_VERSION`);if(e==null?this.gl=wN(t):(this.gl=e,CN(t,e)),e=this.gl,N().getNumber(`WEBGL_VERSION`)===2){let t=e;this.createVertexArray=()=>Z(t,()=>t.createVertexArray()),this.bindVertexArray=e=>Z(t,()=>t.bindVertexArray(e)),this.deleteVertexArray=e=>Z(t,()=>t.deleteVertexArray(e)),this.getVertexArray=()=>Z(t,()=>t.getParameter(t.VERTEX_ARRAY_BINDING))}else if(e!=null){let t=e.getExtension(`OES_vertex_array_object`);if(t==null)throw Error(`All WebGL1 implementations are expected to offer OES_vertex_array_object.`);this.createVertexArray=()=>Z(e,()=>t.createVertexArrayOES()),this.bindVertexArray=n=>Z(e,()=>t.bindVertexArrayOES(n)),this.deleteVertexArray=n=>Z(e,()=>t.deleteVertexArrayOES(n)),this.getVertexArray=()=>Z(e,()=>e.getParameter(t.VERTEX_ARRAY_BINDING_OES))}let n=`WEBGL_color_buffer_float`,r=`EXT_color_buffer_half_float`;if(this.parallelCompilationExtension=this.gl.getExtension(`KHR_parallel_shader_compile`),N().getNumber(`WEBGL_VERSION`)===1){let e=`OES_texture_half_float`;if(this.textureFloatExtension=VN(this.gl,`OES_texture_float`),SP(this.gl,e))this.textureHalfFloatExtension=VN(this.gl,e);else if(N().get(`WEBGL_FORCE_F16_TEXTURES`))throw Error(`GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.`);if(this.colorBufferFloatExtension=this.gl.getExtension(n),SP(this.gl,r))this.colorBufferHalfFloatExtension=VN(this.gl,r);else if(N().get(`WEBGL_FORCE_F16_TEXTURES`))throw Error(`GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.`)}else if(n=`EXT_color_buffer_float`,SP(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else if(SP(this.gl,r))this.colorBufferHalfFloatExtension=this.gl.getExtension(r);else throw Error(`GL context does not support color renderable floats`);this.vertexBuffer=WF(this.gl),this.indexBuffer=GF(this.gl),this.framebuffer=$N(this.gl),this.textureConfig=FN(this.gl,this.textureHalfFloatExtension)}get debug(){return N().getBool(`DEBUG`)}dispose(){if(this.disposed)return;this.program!=null&&console.warn(`Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing.`),this.outputTexture!=null&&console.warn(`Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.`);let e=this.gl;Z(e,()=>e.finish()),Z(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),Z(e,()=>e.deleteFramebuffer(this.framebuffer)),Z(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),Z(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),Z(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),JF(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),XF(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),QF(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),aI(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,n,r){this.throwIfDisposed(),iI(this.gl,e,t,n,r,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),nI(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),eI(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(oP(this.gl,this.framebuffer),this.outputTexture=null),Z(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,n){return this.downloadMatrixDriver(e,()=>cI(this.gl,t,n,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,n,r,i,a){return lI(this.gl,e,t,n,r,i,a,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return sI(this.gl,e,t)}createBufferFromTexture(e,t,n){this.bindTextureToFrameBuffer(e);let r=oI(this.gl,t,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),r}createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,n;if(N().getBool(`WEBGL_FENCE_API_ENABLED`)){let r=e,i=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),n=()=>{let e=r.clientWaitSync(i,0,0);return e===r.ALREADY_SIGNALED||e===r.CONDITION_SATISFIED},t=i}else N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)>0?(t=this.beginQuery(),this.endQuery(),n=()=>this.isQueryAvailable(t,N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`))):n=()=>!0;return{query:t,isFencePassed:n}}downloadMatrixFromPackedTexture(e,t,n){return this.downloadMatrixDriver(e,()=>uI(this.gl,t,n))}createProgram(e){this.throwIfDisposed();let t=this.gl;this.vertexShader==null&&(this.vertexShader=UF(t));let n=KN(t);Z(t,()=>t.attachShader(n,this.vertexShader)),Z(t,()=>t.attachShader(n,e)),qN(t,n);let r=Object.assign(n,{vao:this.createVertexArray()});return this.debug&&JN(t,r),r}buildVao(e){this.setProgram(e),this.bindVertexArray(e.vao);let t=this.gl;Z(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),rI(t,e,this.vertexBuffer)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),e!=null&&(Z(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,this.program!=null&&this.debug&&JN(this.gl,this.program),Z(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,n=!0){return this.throwIfDisposed(),n?nP(this.gl,e,t):rP(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),Z(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,n){this.throwIfDisposed(),this.throwIfNoProgram(),iP(this.gl,e,t,n)}setOutputMatrixTexture(e,t,n){this.setOutputMatrixTextureDriver(e,n,t)}setOutputPackedMatrixTexture(e,t,n){this.throwIfDisposed();let[r,i]=NN(t,n);this.setOutputMatrixTextureDriver(e,r,i)}setOutputMatrixWriteRegion(e,t,n,r){this.setOutputMatrixWriteRegionDriver(n,e,r,t)}setOutputPackedMatrixWriteRegion(e,t,n,r){throw Error(`setOutputPackedMatrixWriteRegion not implemented.`)}debugValidate(){this.program!=null&&JN(this.gl,this.program),sP(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let e=this.gl;if(this.debug){let e=this.getVertexArray();console.assert(e===this.program.vao,`VAO changed between setProgram and executeProgram!`),this.debugValidate()}Z(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),Z(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=VN(this.gl,N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)===2?`EXT_disjoint_timer_query_webgl2`:`EXT_disjoint_timer_query`)),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)===2){let e=this.gl,t=this.getQueryTimerExtensionWebGL2(),n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}let e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)===2){let e=this.gl,t=this.getQueryTimerExtensionWebGL2();e.endQuery(t.TIME_ELAPSED_EXT);return}let e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){var t=this;return await ae(()=>t.disposed||t.isQueryAvailable(e,N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`))),t.getQueryTime(e,N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`))}getQueryTime(e,t){if(t===0)return null;if(t===2){let t=this.gl;return t.getQueryParameter(e,t.QUERY_RESULT)/1e6}else{let t=this.getQueryTimerExtensionWebGL1();return t.getQueryObjectEXT(e,t.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(t===0)return!0;if(t===2){let t=this.gl,n=this.getQueryTimerExtensionWebGL2(),r=t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(n.GPU_DISJOINT_EXT)),r&&!this.disjoint}else{let t=this.getQueryTimerExtensionWebGL1(),n=t.getQueryObjectEXT(e,t.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(t.GPU_DISJOINT_EXT)),n&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=fI(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){if(this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1)return;let n;`setTimeoutCustom`in N().platform&&(n=N().platform.setTimeoutCustom.bind(N().platform)),ae(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,n)}bindTextureToFrameBuffer(e){this.throwIfDisposed(),aP(this.gl,e,this.framebuffer),this.debug&&sP(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture==null?oP(this.gl,this.framebuffer):(aP(this.gl,this.outputTexture,this.framebuffer),this.debug&&sP(this.gl))}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);let n=t();return this.unbindTextureToFrameBuffer(),n}setOutputMatrixTextureDriver(e,t,n){this.throwIfDisposed();let r=this.gl;aP(r,e,this.framebuffer),this.debug&&sP(r),this.outputTexture=e,Z(r,()=>r.viewport(0,0,t,n)),Z(r,()=>r.scissor(0,0,t,n))}setOutputMatrixWriteRegionDriver(e,t,n,r){this.throwIfDisposed(),Z(this.gl,()=>this.gl.scissor(e,t,n,r))}throwIfDisposed(){if(this.disposed)throw Error(`Attempted to use disposed GPGPUContext.`)}throwIfNoProgram(){if(this.program==null)throw Error(`No GPU program is currently set.`)}};function fI(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var{addImpl:pI,bincountImpl:mI,bincountReduceImpl:hI,bitwiseAndImpl:gI,castImpl:_I,ceilImpl:vI,concatImpl:yI,equalImpl:bI,expImpl:xI,expm1Impl:SI,floorImpl:CI,gatherNdImpl:wI,gatherV2Impl:TI,greaterImpl:EI,greaterEqualImpl:DI,lessImpl:OI,lessEqualImpl:kI,linSpaceImpl:AI,logImpl:jI,maxImpl:MI,maximumImpl:NI,minimumImpl:PI,multiplyImpl:FI,negImpl:II,notEqualImpl:LI,prodImpl:RI,raggedGatherImpl:zI,raggedRangeImpl:BI,raggedTensorToTensorImpl:VI,rangeImpl:HI,rsqrtImpl:UI,scatterImpl:WI,sigmoidImpl:GI,simpleAbsImpl:KI,sliceImpl:qI,sparseFillEmptyRowsImpl:JI,sparseReshapeImpl:YI,sparseSegmentReductionImpl:XI,sqrtImpl:ZI,staticRegexReplaceImpl:QI,stridedSliceImpl:$I,stringNGramsImpl:eL,stringSplitImpl:tL,stringToHashBucketFastImpl:nL,subImpl:rL,tileImpl:iL,topKImpl:aL,transposeImpl:oL,uniqueImpl:sL}=fO;function cL(e,t){return[`x`,`y`,`z`,`w`,`u`,`v`].slice(0,t).map(t=>`${e}.${t}`)}function lL(e,t){return t===1?[e]:cL(e,t)}function uL(e,t){if(e===1)return`rc`;let n=``;for(let r=0;r<e;r++)n+=t[r],r<e-1&&(n+=`,`);return n}var dL=class{constructor(e){if(this.variableNames=[`A`],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=FF(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=lL(`rc`,this.rank),t=EF(this.rank),n=this.getOutOfBoundsCondition(e),r=this.getSetup(e),i=this.getOutput(e);this.userCode=`
        void main() {
          ${t} rc = getOutputCoords();

          if(${n}) {
            setOutput(vec4(0));
          } else {
            ${r}

            setOutput(vec4(${i}));
          }
        }
      `}}getSourceCoordsArr(e){let t=[];for(let n=0;n<=1;n++)for(let r=0;r<=1;r++){let i=`${n===0?`r`:`rp1`}, ${r===0?`c`:`cp1`}`;for(let t=2;t<this.rank;t++)i=`${e[e.length-1-t]},`+i;t.push(i)}return t}getOutOfBoundsCondition(e){if(this.rank===1)return`rc > ${this.enableShapeUniforms?`outShape`:this.outputShape[0]}`;let t=``;for(let n=this.rank-2;n<this.rank;n++)t+=`${e[n]} >= ${this.enableShapeUniforms?`outShape[${n}]`:this.outputShape[n]}`,n<this.rank-1&&(t+=`||`);return t}getSetup(e){if(this.rank===1)return``;let t=e.slice(-2),n=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],r=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${n};
      bool rEdge = rp1 >= ${r};
    `}getOutput(e){let t=this.getSourceCoordsArr(e);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?`outShape`:this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}},fL=class{constructor(e,t){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`inputShape`,type:`ivec3`}],this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length);let n=``;for(let e=0;e<4;e++){let t=`thisRC = rc;`;e%2==1&&(t+=`thisRC.z += 1;`),e>1&&(t+=`thisRC.y += 1;`),n+=`
        ${t}
        ${e>0?`if(thisRC.y < rows && thisRC.z < cols){`:``}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${e>0?`}`:``}
      `}this.userCode=`
      ${pL(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?IP():FP(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?`outShape[1]`:e[1]};
        int cols = ${this.enableShapeUniforms?`outShape[2]`:e[2]};

        ${n}

        setOutput(result);
      }
    `}};function pL(e,t){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t?PP([`r`,`c`,`d`],`inputShape`):jP([`r`,`c`,`d`],e)}
      return ivec3(r, c, d);
    }
  `}var mL=class{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,n){let r=yL(t,n),i=bL(e,r,n);i in this.freeTextures||(this.freeTextures[i]=[]),i in this.usedTextures||(this.usedTextures[i]=[]);let a=gL(e,r,this.gpgpu.gl,this.gpgpu.textureConfig,n);if(this.freeTextures[i].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=a,this.log();let e=this.freeTextures[i].pop();return this.usedTextures[i].push(e),e}let o;return r===kN.PACKED_2X2_FLOAT32?o=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):r===kN.PACKED_2X2_FLOAT16?o=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):r===kN.UNPACKED_FLOAT32?o=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):r===kN.UNPACKED_FLOAT16?o=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):r===kN.PACKED_4X1_UNSIGNED_BYTE&&(o=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[i].push(o),this.numUsedTextures++,this._numBytesAllocated+=a,this.log(),o}releaseTexture(e,t,n,r){if(this.freeTextures==null)return;let i=yL(n,r),a=bL(t,i,r);a in this.freeTextures||(this.freeTextures[a]=[]);let o=gL(t,i,this.gpgpu.gl,this.gpgpu.textureConfig,r),s=N().getNumber(`WEBGL_DELETE_TEXTURE_THRESHOLD`);s!==-1&&this._numBytesAllocated>s?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=o):(this.freeTextures[a].push(e),this.numFreeTextures++,this._numBytesFree+=o),this.numUsedTextures--;let c=this.usedTextures[a],l=c&&c.indexOf(e);if(l==null||l<0)throw Error(`Cannot release a texture that was never provided by this texture manager`);c[l]=c[c.length-1],c.pop(),this.log()}log(){if(!this.logEnabled)return;let e=this.numFreeTextures+this.numUsedTextures;console.log(`Free/Used`,`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);let t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(let e in this.freeTextures)this.freeTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let e in this.usedTextures)this.usedTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function hL(e,t){let n=e;if(t===n.R32F)return 4;if(t===n.R16F)return 2;if(t===n.RGBA32F||t===e.RGBA)return 16;if(t===n.RGBA16F)return 8;if(t===n.RGBA8)return 4;throw Error(`Unknown internal format ${t}`)}function gL(e,t,n,r,i){let a=_L(t,r),o;if(i){let[t,n]=NN(e[0],e[1]);o=t*n}else{let[t,n]=AN(e[0],e[1]);o=t*n}let s=hL(n,a);return o*s}function _L(e,t){switch(e){case kN.PACKED_2X2_FLOAT32:return $F(t);case kN.PACKED_2X2_FLOAT16:return tI(t);case kN.UNPACKED_FLOAT32:return qF(t);case kN.UNPACKED_FLOAT16:return YF(t);case kN.PACKED_4X1_UNSIGNED_BYTE:return ZF(t);default:throw Error(`Unknown physical texture type ${e}`)}}function vL(e){return N().getBool(`WEBGL_RENDER_FLOAT32_ENABLED`)?e?kN.PACKED_2X2_FLOAT32:kN.UNPACKED_FLOAT32:e?kN.PACKED_2X2_FLOAT16:kN.UNPACKED_FLOAT16}function yL(e,t){if(e===ON.UPLOAD)return kN.PACKED_2X2_FLOAT32;if(e===ON.RENDER||e==null)return vL(t);if(e===ON.DOWNLOAD||e===ON.PIXELS)return kN.PACKED_4X1_UNSIGNED_BYTE;throw Error(`Unknown logical texture type ${e}`)}function bL(e,t,n){return`${e[0]}_${e[1]}_${t}_${n}`}var xL=class{constructor(e,t){this.variableNames=[`A`],this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}},SL=`if (isnan(x)) return x;`,CL=`return x;`,wL=`return abs(x);`,TL=`return (x >= 0.0) ? x : (exp(x) - 1.0);`,EL=SL+`
  return (x < 0.0) ? 0.0 : x;
`,DL=SL+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,OL=`return x;`,kL=`return 1.0 / (1.0 + exp(-1.0 * x));`,AL=`return x;`,jL=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,ML=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,NL=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,PL=`return 1.0 / (1.0 + exp(-1.0 * x));`,FL=class{constructor(e,t){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}},IL=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length);let t=e.length,n=lL(`rc`,t),r=EF(t),i=uL(t,n),a=n.slice(-2),o=t<=1?`rc`:`vec2(${a.join(`,`)})`;this.userCode=`
      void main() {
        ${r} rc = getOutputCoords();
        vec4 packedInput = getA(${i});

        setOutput(getChannel(packedInput, ${o}));
      }
    `}},LL=Xf,RL=1e-7,zL=1e-4,BL={};function VL(e){return e in BL||(BL[e]={}),BL[e]}var HL=N().getNumber(`CPU_HANDOFF_SIZE_THRESHOLD`),UL=600;function WL(){return N().global.screen==null?1024:N().global.screen.height*N().global.screen.width*window.devicePixelRatio*UL/1024/1024}var GL=class e extends x{nextDataId(){return e.nextDataId++}constructor(e){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!N().getBool(`HAS_WEBGL`))throw Error(`WebGL is not supported on this device`);let t;e==null?(t=new dI(wN(N().getNumber(`WEBGL_VERSION`))),this.binaryCache=VL(N().getNumber(`WEBGL_VERSION`)),this.gpgpuCreatedLocally=!0):(t=e instanceof dI?e:new dI(wN(N().getNumber(`WEBGL_VERSION`),e)),this.binaryCache={},this.gpgpuCreatedLocally=!1),this.gpgpu=t,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new mL(this.gpgpu),this.numMBBeforeWarning=WL(),this.texData=new b(this,Ca())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(e,t,n,r,i,a){let o=this.makeTensorInfo(t,n),s=this.texData.get(o.dataId);s.isPacked=!1,s.texture={texture:e,texShape:[r,i]},s.texShape=[r,i];let c=new VF(pP(t),!1,a),l=this.runWebGLProgram(c,[o],n,[[r,i]]);return l.shape=t,s.texture=null,this.disposeIntermediateTensorInfo(o),l.dataId}write(e,t,n){if((N().getBool(`WEBGL_CHECK_NUMERICAL_PROBLEMS`)||N().getBool(`DEBUG`))&&this.checkNumericalProblems(e),n===`complex64`&&e!=null)throw Error(`Cannot write to a complex64 dtype. Please use tf.complex(real, imag).`);let r={id:this.nextDataId()};return this.texData.set(r,{shape:t,dtype:n,values:e,usage:ON.UPLOAD,refCount:1}),r}refCount(e){return this.texData.has(e)?this.texData.get(e).refCount:0}incRef(e){let t=this.texData.get(e);t.refCount++}decRef(e){if(this.texData.has(e)){let t=this.texData.get(e);t.refCount--}}move(e,t,n,r,i){if(N().getBool(`DEBUG`)&&this.checkNumericalProblems(t),r===`complex64`)throw Error(`Cannot write to a complex64 dtype. Please use tf.complex(real, imag).`);this.texData.set(e,{shape:n,dtype:r,values:t,usage:ON.UPLOAD,refCount:i})}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}readSync(e){let{values:t,dtype:n,complexTensorInfos:r,slice:i,shape:a,isPacked:o}=this.texData.get(e);if(i!=null){let t;t=o?new FL(a,OL):new xL(a,OL);let r=this.runWebGLProgram(t,[{dataId:e,shape:a,dtype:n}],n),i=this.readSync(r.dataId);return this.disposeIntermediateTensorInfo(r),i}if(t!=null)return this.convertAndCacheOnCPU(e);if(n===`string`)return t;let s=this.activeTimers!=null,c;s&&(c=mi());let l;return l=n===`complex64`?xh(this.readSync(r.real.dataId),this.readSync(r.imag.dataId)):this.getValuesFromTexture(e),s&&(this.downloadWaitMs+=mi()-c),this.convertAndCacheOnCPU(e,l)}async read(e){var t=this;if(t.pendingRead.has(e)){let n=t.pendingRead.get(e);return new Promise(e=>n.push(e))}let{values:n,shape:r,slice:i,dtype:a,complexTensorInfos:o,isPacked:s}=t.texData.get(e);if(i!=null){let n;n=s?new FL(r,OL):new xL(r,OL);let i=t.runWebGLProgram(n,[{dataId:e,shape:r,dtype:a}],a),o=t.read(i.dataId);return t.disposeIntermediateTensorInfo(i),o}if(n!=null)return t.convertAndCacheOnCPU(e);if(N().getBool(`DEBUG`)&&!N().getBool(`WEBGL_DOWNLOAD_FLOAT_ENABLED`)&&N().getNumber(`WEBGL_VERSION`)===2)throw Error(`tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.`);let c=null,l;if(a!==`complex64`&&N().get(`WEBGL_BUFFER_SUPPORTED`)){l=t.decode(e);let n=t.texData.get(l.dataId);c=t.gpgpu.createBufferFromTexture(n.texture.texture,...MN(r))}t.pendingRead.set(e,[]),a!==`complex64`&&await t.gpgpu.createAndWaitForFence();let u;if(a===`complex64`){let e=await Promise.all([t.read(o.real.dataId),t.read(o.imag.dataId)]),n=e[0],r=e[1];u=xh(n,r)}else if(c==null)u=t.getValuesFromTexture(e);else{let e=k(r);u=t.gpgpu.downloadFloat32MatrixFromBuffer(c,e)}if(l!=null&&t.disposeIntermediateTensorInfo(l),c!=null){let e=t.gpgpu.gl;Z(e,()=>e.deleteBuffer(c))}let d=t.convertAndCacheOnCPU(e,u),f=t.pendingRead.get(e);return t.pendingRead.delete(e),f.forEach(e=>e(d)),t.pendingDisposal.has(e)&&(t.pendingDisposal.delete(e),t.disposeData(e)&&Ca().removeDataId(e,t),t.pendingDeletes--),d}readToGPU(e,t={}){let{values:n,shape:r,slice:i,dtype:a,isPacked:o,texture:s}=this.texData.get(e);if(a===`complex64`)throw Error(`Does not support reading texture for complex64 dtype.`);if(i!=null){let n;n=o?new FL(r,OL):new xL(r,OL);let i=this.runWebGLProgram(n,[{dataId:e,shape:r,dtype:a}],a),s=this.readToGPU(i,t);return this.disposeIntermediateTensorInfo(i),s}if(s==null)throw Error(n==null?`There is no data on GPU or CPU.`:`Data is not on GPU but on CPU.`);let c=this.decode(e,t.customTexShape),l=Ca().makeTensorFromTensorInfo(c),u=this.texData.get(c.dataId);return Object.assign({tensorRef:l},u.texture)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype===`string`)try{let n=t.map(e=>gi(e));return So(e.shape,e.dtype,n)}catch(e){throw Error(`Failed to decode encoded string bytes into utf-8`)}return So(e.shape,e.dtype,t)}checkNumericalProblems(e){if(e!=null)for(let t=0;t<e.length;t++){let n=e[t];if(!zN(n))throw N().getBool(`WEBGL_RENDER_FLOAT32_CAPABLE`)?Error(`The value ${n} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${n} cannot be represented on this device.`)}}getValuesFromTexture(e){let{shape:t,dtype:n,isPacked:r}=this.texData.get(e),i=k(t);if(N().getBool(`WEBGL_DOWNLOAD_FLOAT_ENABLED`)){let n=this.decode(e),r=this.texData.get(n.dataId),a=this.gpgpu.downloadMatrixFromPackedTexture(r.texture.texture,...MN(t)).subarray(0,i);return this.disposeIntermediateTensorInfo(n),a}let a=N().getBool(`WEBGL_PACK`)&&r===!0,o=a?pP(t):t,s=a?new zF(o):new RF(o),c=this.runWebGLProgram(s,[{shape:o,dtype:n,dataId:e}],`float32`),l=this.texData.get(c.dataId),u=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(l.texture.texture,l.texShape[0],l.texShape[1]).subarray(0,i);return this.disposeIntermediateTensorInfo(c),u}timerAvailable(){return N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0}time(e){var t=this;let n=this.activeTimers,r=[],i=!1;this.programTimersStack==null?(this.programTimersStack=r,i=!0):this.activeTimers.push(r),this.activeTimers=r,e();let a=vi(this.activeTimers.map(e=>e.query)).filter(e=>e!=null),o=vi(this.activeTimers.map(e=>e.name)).filter(e=>e!=null);this.activeTimers=n,i&&(this.programTimersStack=null);let s={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if(N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0){let e=await Promise.all(a);s.kernelMs=D(e),s.getExtraProfileInfo=()=>e.map((e,t)=>({name:o[t],ms:e})).map(e=>`${e.name}: ${e.ms}`).join(`, `)}else s.kernelMs={error:`WebGL query timers are not supported in this environment.`};return t.uploadWaitMs=0,t.downloadWaitMs=0,s})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0?this.gpgpu.beginQuery():{startMs:mi(),endMs:null}}endTimer(e){return N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0?(this.gpgpu.endQuery(),e):(e.endMs=mi(),e)}async getQueryTime(e){var t=this;if(N().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0)return t.gpgpu.waitForQueryAndGetTime(e);let n=e;return n.endMs-n.startMs}disposeData(e,t=!1){if(this.pendingDisposal.has(e))return!1;if(!this.texData.has(e))return!0;if(t?this.texData.get(e).refCount=0:this.texData.get(e).refCount--,!t&&this.texData.get(e).refCount>0)return!1;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),this.pendingDeletes++,!1;this.releaseGPUData(e);let{complexTensorInfos:n}=this.texData.get(e);return n!=null&&(this.disposeData(n.real.dataId,t),this.disposeData(n.imag.dataId,t)),this.texData.delete(e),!0}releaseGPUData(e){let{texture:t,dtype:n,texShape:r,usage:i,isPacked:a,slice:o}=this.texData.get(e),s=o&&o.origDataId||e,c=this.dataRefCount.get(s);c>1?this.dataRefCount.set(s,c-1):(this.dataRefCount.delete(s),t!=null&&(this.numBytesInGPU-=this.computeBytes(r,n),this.textureManager.releaseTexture(t,r,i,a)));let l=this.texData.get(e);l.texture=null,l.texShape=null,l.isPacked=!1,l.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture.texture}getDataInfo(e){return this.texData.get(e)}shouldExecuteOnCPU(e,t=HL){return N().getBool(`WEBGL_CPU_FORWARD`)&&e.every(e=>this.texData.get(e.dataId).texture==null&&k(e.shape)<t)}getGPGPUContext(){return this.gpgpu}where(e){Ir(`tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead`);let t=e.dataSync();return LL(e.shape,t)}packedUnaryOp(e,t,n){let r=new FL(e.shape,t),i=this.compileAndRun(r,[e],n);return Ca().makeTensorFromTensorInfo(i)}abs(e){if(this.shouldExecuteOnCPU([e])&&e.dtype!==`complex64`){let t=KI(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,t)}if(N().getBool(`WEBGL_PACK_UNARY_OPERATIONS`))return this.packedUnaryOp(e,wL,e.dtype);let t=new xL(e.shape,wL),n=this.compileAndRun(t,[e]);return Ca().makeTensorFromTensorInfo(n)}makeTensorInfo(e,t,n){let r;if(t===`string`&&n!=null&&n.length>0&&he(n[0])){let i=n.map(e=>hi(e));r=this.write(i,e,t)}else r=this.write(n,e,t);return this.texData.get(r).usage=null,{dataId:r,shape:e,dtype:t}}makeOutput(e,t,n){return Ca().makeTensorFromTensorInfo(this.makeTensorInfo(e,t,n),this)}unpackTensor(e){let t=new IL(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){let t=new dL(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){let n=[dP(e.shape),...fP(e.shape)],r={dtype:e.dtype,shape:n,dataId:e.dataId},i=new fL([dP(t),...fP(t)],n),a=[n],o=this.runWebGLProgram(i,[r],e.dtype,a,!0);return{dataId:o.dataId,shape:t,dtype:o.dtype}}decode(e,t){let{isPacked:n,shape:r,dtype:i}=this.texData.get(e);t!=null&&O(k(r)<=t[0]*t[1]*4,()=>`customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.`);let a=pP(r),o;o=n?new LF(a):new IF(a);let s=[t==null?MN(a):t];return{dtype:i,shape:r,dataId:this.runWebGLProgram(o,[{shape:a,dtype:i,dataId:e}],i,s,!0,t).dataId}}runWebGLProgram(e,t,n,r,i=!1,a){let o=this.makeTensorInfo(e.outputShape,n),s=this.texData.get(o.dataId);if(e.packedOutput&&(s.isPacked=!0),e.outPackingScheme===DN.DENSE&&(s.texShape=(a==null?MN(e.outputShape):a).map(e=>e*2)),e.outTexUsage!=null&&(s.usage=e.outTexUsage),k(o.shape)===0)return s.values=ce(o.dtype,0),o;let c=[],l=t.map(t=>{if(t.dtype===`complex64`)throw Error(`GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.`);let n=this.texData.get(t.dataId);if(n.texture==null){if(!e.packedInputs&&k(t.shape)<=N().getNumber(`WEBGL_SIZE_UPLOAD_UNIFORM`))return{shape:t.shape,texData:null,isUniform:!0,uniformValues:n.values};e.packedInputs&&(n.isPacked=!0,n.shape=t.shape)}if(this.uploadToGPU(t.dataId),!!n.isPacked!=!!e.packedInputs)t=n.isPacked?this.unpackTensor(t):this.packTensor(t),c.push(t),n=this.texData.get(t.dataId);else if(n.isPacked&&!gP(n.shape,t.shape)){let e=t,r=t.shape;t.shape=n.shape,t=this.packedReshape(t,r),c.push(t),n=this.texData.get(t.dataId),e.shape=r}return{shape:t.shape,texData:n,isUniform:!1}});this.uploadToGPU(o.dataId);let u={shape:o.shape,texData:s,isUniform:!1},d=PF(e,l,u),f=this.getAndSaveBinary(d,()=>AF(this.gpgpu,e,l,u)),p=this.activeTimers!=null,m;p&&(m=this.startTimer()),N().get(`ENGINE_COMPILE_ONLY`)||NF(this.gpgpu,f,l,u,r),c.forEach(e=>this.disposeIntermediateTensorInfo(e)),p&&(m=this.endTimer(m),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(m)}));let h=N().getNumber(`WEBGL_FLUSH_THRESHOLD`);if(h>0){let e=mi();e-this.lastGlFlushTime>h&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=e)}if(!N().getBool(`WEBGL_LAZILY_UNPACK`)&&s.isPacked&&i===!1){let e=this.unpackTensor(o);return this.disposeIntermediateTensorInfo(o),e}return o}compileAndRun(e,t,n,r,i=!1){return n=n||t[0].dtype,this.runWebGLProgram(e,t,n,r,i)}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){this.disposed||(N().getBool(`IS_TEST`)||Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<`u`&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return this.floatPrecisionValue==null&&(this.floatPrecisionValue=R(()=>{if(!N().get(`WEBGL_RENDER_FLOAT32_ENABLED`)){let e=N().getBool(`DEBUG`);N().set(`DEBUG`,!1);let t=this.abs(vl(1e-8)).dataSync()[0];if(N().set(`DEBUG`,e),t>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?RL:zL}uploadToGPU(e){let t=this.texData.get(e),{shape:n,dtype:r,values:i,texture:a,usage:o,isPacked:s}=t;if(a!=null)return;let c=this.activeTimers!=null,l;c&&(l=mi());let u=t.texShape;if(u==null&&(u=mP(n,s),t.texShape=u),i!=null){let e=pP(n),a,o=u[1],d=u[0],f=i instanceof Uint8Array||i instanceof Uint8ClampedArray;(s||!f)&&([o,d]=NN(u[0],u[1])),a=s?new HF(e,f):new VF(e,f);let p=f?[d,o]:u,m=this.makeTensorInfo(p,r),h=this.texData.get(m.dataId);f?h.usage=ON.PIXELS:h.usage=ON.UPLOAD,h.texShape=p,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(m.dataId),o,d,i);let g=[[d,o]],_=this.runWebGLProgram(a,[m],r,g,!0),v=this.texData.get(_.dataId);t.texShape=v.texShape,t.isPacked=v.isPacked,t.usage=v.usage,N().get(`ENGINE_COMPILE_ONLY`)?this.disposeData(_.dataId):(t.texture=v.texture,t.values=null,this.texData.delete(_.dataId)),this.disposeIntermediateTensorInfo(m),c&&(this.uploadWaitMs+=mi()-l)}else t.texture=this.acquireTexture(u,o,r,s)}convertAndCacheOnCPU(e,t){let n=this.texData.get(e),{dtype:r}=n;return t!=null&&(n.values=KL(t,r)),n.values}acquireTexture(e,t,n,r){if(this.numBytesInGPU+=this.computeBytes(e,n),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){let e=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${e} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,r)}computeBytes(e,t){return e[0]*e[1]*pe(t)}checkCompileCompletion(){for(let[,e]of Object.entries(this.binaryCache))this.checkCompletion_(e)}async checkCompileCompletionAsync(){var e=this;let t=[];if(e.gpgpu.parallelCompilationExtension){for(let[,n]of Object.entries(e.binaryCache))t.push(e.checkCompletionAsync_(n));return Promise.all(t)}else{for(let[,n]of Object.entries(e.binaryCache)){let r=new Promise(t=>{try{e.checkCompletion_(n),t(!0)}catch(e){throw e}});t.push(r)}return Promise.all(t)}}async checkCompletionAsync_(e){var t=this;return t.gpgpu.gl.getProgramParameter(e.webGLProgram,t.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?t.checkCompletion_(e):(await Qm(),t.checkCompletionAsync_(e))}checkCompletion_(e){if(this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(e.webGLProgram)),this.gpgpu.gl.getShaderParameter(e.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(GN(e.source,this.gpgpu.gl.getShaderInfoLog(e.fragmentShader)),Error(`Failed to compile fragment shader.`)):Error(`Failed to link vertex and fragment shaders.`);return!0}getUniformLocations(){for(let e of Object.values(this.binaryCache)){this.gpgpu.buildVao(e.webGLProgram);let{variablesLocations:t,customUniformLocations:n,infLoc:r,nanLoc:i,outShapeLocation:a,outShapeStridesLocation:o,outTexShapeLocation:s}=jF(this.gpgpu,e.program,e.webGLProgram);e.variablesLocations=t,e.customUniformLocations=n,e.infLoc=r,e.nanLoc=i,e.outShapeLocation=a,e.outShapeStridesLocation=o,e.outTexShapeLocation=s}}createTensorFromGPUData(e,t,n){e.channels=e.channels||`RGBA`;let{texture:r,height:i,width:a,channels:o}=e,s=Ca().backend;if(!s.gpgpu.gl.isTexture(r))throw Error(`The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.`);let c=s.writeTexture(r,t,n,i,a,o);return Ca().makeTensorFromDataId(c,t,n,s)}};GL.nextDataId=0;function KL(e,t){if(t===`float32`||t===`complex64`)return e;if(t===`int32`||t===`bool`){let n=t===`int32`?new Int32Array(e.length):new Uint8Array(e.length);for(let t=0;t<n.length;++t)n[t]=Math.round(e[t]);return n}else throw Error(`Unknown dtype ${t}`)}ua()&&ka(`webgl`,()=>new GL,2);var qL=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`,JL=class{constructor(e,t,n){this.variableNames=[`A`,`B`],this.outputShape=W(t,n),this.enableShapeUniforms=FF(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}},YL=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`,XL=class{constructor(e,t,n,r=!1){this.variableNames=[`A`,`B`],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=W(t,n);let i=this.outputShape.length;this.enableShapeUniforms=FF(i);let a=``;if(r)if(i===0||k(this.outputShape)===1)a=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(a=`
          ${EF(i)} coords = getOutputCoords();
        `,i===1)this.enableShapeUniforms?a+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:a+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let e=lL(`coords`,i);this.enableShapeUniforms?a+=`
            bool nextRowOutOfBounds =
              (${e[i-2]} + 1) >= outShape[${i} - 2];
            bool nextColOutOfBounds =
              (${e[i-1]} + 1) >= outShape[${i} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:a+=`
            bool nextRowOutOfBounds =
              (${e[i-2]} + 1) >= ${this.outputShape[i-2]};
            bool nextColOutOfBounds =
              (${e[i-1]} + 1) >= ${this.outputShape[i-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${e}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${a}

        setOutput(result);
      }
    `}};function ZL(e){let{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}var QL={kernelName:Yt,backendName:`webgl`,kernelFunc:ZL};function $L(e){let{inputs:t,backend:n}=e,{real:r,imag:i}=t,a=n.makeTensorInfo(r.shape,`complex64`),o=n.texData.get(a.dataId);return o.complexTensorInfos={real:ZL({inputs:{x:r},backend:n}),imag:ZL({inputs:{x:i},backend:n})},a}var eR={kernelName:dt,backendName:`webgl`,kernelFunc:$L},tR=`return (a < 0.) ? b * a : a;`,nR=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function rR(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{alpha:a}=r,o=n.makeTensorInfo([],`float32`,di(a,`float32`)),s=N().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)?new XL(nR,i.shape,o.shape):new JL(tR,i.shape,o.shape),c=n.runWebGLProgram(s,[i,o],`float32`);return n.disposeIntermediateTensorInfo(o),c}var iR={kernelName:tn,backendName:`webgl`,kernelFunc:rR},aR=`return (a < 0.) ? b * a : a;`,oR=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function sR(e){let{inputs:t,backend:n}=e,{x:r,alpha:i}=t,a=N().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)?new XL(oR,r.shape,i.shape):new JL(aR,r.shape,i.shape);return n.runWebGLProgram(a,[r,i],`float32`)}var cR={kernelName:jn,backendName:`webgl`,kernelFunc:sR},lR=`if (isnan(x)) return x;`;function uR({opSnippet:e,packedOpSnippet:t,cpuKernelImpl:n,dtype:r}){return({inputs:i,backend:a})=>{let{x:o}=i,s=a,c=r||o.dtype;if(s.shouldExecuteOnCPU([o])&&n!=null){let e=n(s.texData.get(o.dataId).values,c);return s.makeTensorInfo(o.shape,c,e)}let l=N().getBool(`WEBGL_PACK_UNARY_OPERATIONS`)&&t!=null,u;return u=l?new FL(o.shape,t):new xL(o.shape,e),s.runWebGLProgram(u,[o],c)}}function dR({opSnippet:e,packedOpSnippet:t,checkOutOfBounds:n=!1,supportsComplex:r=!1,cpuKernelImpl:i,dtype:a}){return({inputs:o,backend:s})=>{let{a:c,b:l}=o,u=s;if(r&&c.dtype===`complex64`){let t=u.texData.get(c.dataId),n=u.texData.get(l.dataId),[r,i]=[[t.complexTensorInfos.real,n.complexTensorInfos.real],[t.complexTensorInfos.imag,n.complexTensorInfos.imag]].map(t=>{let[n,r]=t,i={dataId:n.dataId,dtype:n.dtype,shape:c.shape},a={dataId:r.dataId,dtype:r.dtype,shape:l.shape},o=new JL(e,c.shape,l.shape);return u.runWebGLProgram(o,[i,a],Ki(n.dtype,r.dtype))}),a=$L({inputs:{real:r,imag:i},backend:u});return u.disposeIntermediateTensorInfo(r),u.disposeIntermediateTensorInfo(i),a}let d=a||Ki(c.dtype,l.dtype);if((c.dtype===`string`||l.dtype===`string`||u.shouldExecuteOnCPU([c,l]))&&i!=null){let e=u.texData.get(c.dataId).values,t=u.texData.get(l.dataId).values,n=c.dtype===`string`?rg(e):e,r=c.dtype===`string`?rg(t):t,[a,o]=i(c.shape,l.shape,n,r,d),s=u.makeTensorInfo(o,d),f=u.texData.get(s.dataId);return f.values=a,s}let f=N().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)&&t!=null,p;return p=f?new XL(t,c.shape,l.shape,n):new JL(e,c.shape,l.shape),u.runWebGLProgram(p,[c,l],d)}}function fR(e,t=!1){if(e===`linear`)return t?AL:CL;if(e===`relu`)return t?ML:EL;if(e===`elu`)return t?jL:TL;if(e===`relu6`)return t?NL:DL;if(e===`prelu`)return t?oR:aR;if(e===`leakyrelu`)return t?nR:tR;if(e===`sigmoid`)return t?PL:kL;throw Error(`Activation ${e} has not been implemented for the WebGL backend.`)}var pR=class{constructor(e,t,n,r=!1,i=!1,a=!1,o=null,s=!1,c=!1){this.variableNames=[`matrixA`,`matrixB`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n,this.enableShapeUniforms=FF(this.outputShape.length);let l=r?e[1]:e[2],u=Math.ceil(l/2),d=r?`i * 2, rc.y`:`rc.y, i * 2`,f=i?`rc.z, i * 2`:`i * 2, rc.z`,p=r?[`a.xxyy`,`a.zzww`]:[`a.xxzz`,`a.yyww`],m=i?[`b.xzxz`,`b.ywyw`]:[`b.xyxy`,`b.zwzw`],h=``,g=``;o&&(h=s?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:c?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:`vec4 activation(vec4 x) {
          ${o}
        }`,g=`result = activation(result);`);let _=a?`result += getBiasAtOutCoords();`:``;a&&this.variableNames.push(`bias`),s&&this.variableNames.push(`preluActivationWeights`),c&&this.variableNames.push(`leakyreluAlpha`);let v=`rc.x`,y=`rc.x`;e[0]<t[0]?v=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(y=`imod(rc.x, ${t[0]})`),this.userCode=`
      ${h}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${u}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${v};
        int batchB = ${y};
        for (int i = 0; i < ${u}; i++) {
          vec4 a = getMatrixA(batchA, ${d});
          vec4 b = getMatrixB(batchB, ${f});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${p[0]} * ${m[0]});
          result += (${p[1]} * ${m[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${_}

        ${g}

        setOutput(result);
      }
    `}},mR={REAL:`return areal * breal - aimag * bimag;`,IMAG:`return areal * bimag + aimag * breal;`},hR=class{constructor(e,t,n){this.variableNames=[`AReal`,`AImag`,`BReal`,`BImag`],this.outputShape=W(t,n),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${e}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}},gR=`return a * b;`;function _R(e){let{inputs:t,backend:n}=e,{a:r,b:i}=t,a=Ki(r.dtype,i.dtype);if(r.dtype===`complex64`){let e=n.texData.get(r.dataId),t=n.texData.get(i.dataId),a=new hR(mR.REAL,r.shape,i.shape),o=new hR(mR.IMAG,r.shape,i.shape),s=[{dataId:e.complexTensorInfos.real.dataId,dtype:e.complexTensorInfos.real.dtype,shape:r.shape},{dataId:e.complexTensorInfos.imag.dataId,dtype:e.complexTensorInfos.imag.dtype,shape:r.shape},{dataId:t.complexTensorInfos.real.dataId,dtype:t.complexTensorInfos.real.dtype,shape:i.shape},{dataId:t.complexTensorInfos.imag.dataId,dtype:t.complexTensorInfos.imag.dtype,shape:i.shape}],c=n.runWebGLProgram(a,s,`float32`),l=n.runWebGLProgram(o,s,`float32`),u=$L({inputs:{real:c,imag:l},backend:n});return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(l),u}if(n.shouldExecuteOnCPU([r,i])){let e=n.texData.get(r.dataId),t=n.texData.get(i.dataId),[o,s]=FI(r.shape,i.shape,e.values,t.values,a),c=n.makeTensorInfo(s,a),l=n.texData.get(c.dataId);return l.values=o,c}let o;return o=N().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)?new XL(gR,r.shape,i.shape):new JL(gR,r.shape,i.shape),n.runWebGLProgram(o,[r,i],a)}var vR={kernelName:Sn,backendName:`webgl`,kernelFunc:_R};function yR(e,t,n){let r=[dP(e.shape),...fP(e.shape)],i={dtype:e.dtype,shape:r,dataId:e.dataId},a=new fL([dP(t),...fP(t)],r),o=[r],s=n.runWebGLProgram(a,[i],e.dtype,o,!0);return{dataId:s.dataId,shape:t,dtype:s.dtype}}function $(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{shape:a}=r,o=n,s=k(i.shape),c=oe(a,s),l=k(c);O(s===l,()=>`The new shape (${c}) has ${l} elements and the old shape (${i.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`);let u=o.texData.get(i.dataId);return u.isPacked&&!gP(i.shape,c)&&!(u.texture!==null&&gP(u.shape,c))?yR(i,c,o):(o.incRef(i.dataId),{dataId:i.dataId,shape:c,dtype:i.dtype})}var bR={kernelName:Bn,backendName:`webgl`,kernelFunc:$},xR=class{constructor(e,t){this.variableNames=[`x`];let{windowSize:n,batchSize:r,inSize:i,outSize:a}=e;this.outputShape=[r,a];let o=Math.floor(n/4)*4,s=n%4,c=`sumValue += dot(values, ones);`;if(t!=null){let e=1/t;c=`sumValue += dot(values * ${ne(e)?e.toPrecision(2):e}, ones);`}let l=``;i%n>0&&(l=`
        if (inIdx < 0 || inIdx >= ${i}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${l}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        float sumValue = 0.0;

        for (int i = 0; i < ${o}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${c}
        }

        int inIdx = inOffset + ${o};
        if (${s===1}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${c}
        } else if (${s===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${c}
        } else if (${s===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${c}
        }
        setOutput(sumValue);
      }
    `}},SR=class{constructor(e,t){this.variableNames=[`x`];let{windowSize:n,batchSize:r,inSize:i,outSize:a}=e;this.outputShape=[r,a];let o=`0.0`,s=``;t===`prod`?o=`1.0`:t===`min`?(o=`1.0 / 1e-20`,s=`min`):t===`max`&&(o=`-1.0 / 1e-20`,s=`max`);let c=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t===`sum`?c=`sumValue`:t===`prod`?c=`prodValue`:t===`all`?c=`allValue`:t===`any`&&(c=`anyValue`);let l=Math.floor(n/4)*4,u=n%4,d=`
      if (${t===`sum`}) {
        sumValue += dot(values, ones);
      } else if (${t===`prod`}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${s}(values, minMaxValue);
        if (${t===`min`} || ${t===`max`}) {
          minMaxValue = ${s}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,f=`vec4`;t===`all`?(o=`1.0`,d=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,f=`bvec4`):t===`any`&&(o=`0.0`,d=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,f=`bvec4`);let p=``;i%n>0&&(p=`
        if (inIdx < 0 || inIdx >= ${i}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${o};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${p}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        vec4 minMaxValue = vec4(${o});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${l}; i += 4) {
          int inIdx = inOffset + i;
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${d}
        }

        int inIdx = inOffset + ${l};
        if (${u===1}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${u===2}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${u===3}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${d}
        }
        setOutput(${c});
      }
    `}};function CR(e){let t=[];for(;t.length===0||t[t.length-1].outSize!==1;){let n=t.length?t[t.length-1].outSize:e[1],r=oh(n);t.push({inSize:n,windowSize:r,outSize:Math.ceil(n/r)})}return t}function wR(e,t,n,r){let i=CR(e.shape),a=e;for(let o=0;o<i.length;o++){let{inSize:s,windowSize:c,outSize:l}=i[o],u,d;u=n===`mean`?o===0?new xR({windowSize:c,inSize:s,batchSize:e.shape[0],outSize:l},s):new xR({windowSize:c,inSize:s,batchSize:e.shape[0],outSize:l}):new SR({windowSize:c,inSize:s,batchSize:e.shape[0],outSize:l},n),d=a,a=r.runWebGLProgram(u,[a],t),d.dataId!==e.dataId&&r.disposeIntermediateTensorInfo(d)}return a}var TR=class{constructor(e,t){this.variableNames=[`A`];let n=Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];this.outputShape=n,this.rank=n.length;let r=EF(this.rank),i=ER(t);this.userCode=`
    void main() {
      ${r} resRC = getOutputCoords();
      setOutput(getA(${i}));
    }
    `}};function ER(e){let t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let n=[`resRC.x`,`resRC.y`,`resRC.z`,`resRC.w`,`resRC.u`,`resRC.v`],r=Array(t);for(let t=0;t<e.length;t++)r[e[t]]=n[t];return r.join()}var DR=class{constructor(e,t){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0;let n=Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];if(this.outputShape=n,this.rank=n.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let r=EF(this.rank),i=cL(`rc`,this.rank),a=Array(this.rank);for(let e=0;e<t.length;e++)a[t[e]]=i[e];let o=`vec2(${a.slice(-2).join()})`,s=`++${i[this.rank-1]} < ${n[this.rank-1]}`,c=`getChannel(getA(${a.join()}), ${o})`;this.userCode=`
    void main() {
      ${r} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${c};
      if(${s}) {
        result[1] = ${c};
      }
      --${i[this.rank-1]};
      if(++${i[this.rank-2]} < ${n[this.rank-2]}) {
        result[2] = ${c};
        if(${s}) {
          result[3] = ${c};
        }
      }
      setOutput(result);
    }
    `}};function OR(e,t,n){let r=N().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new DR(e.shape,t):new TR(e.shape,t);return n.runWebGLProgram(r,[e],e.dtype)}function kR(e,t,n,r){let i=t,a=e.shape.length,o=j(i,e.shape),s=o,c=ll(s,a),l=c!=null,u=e;l&&(u=OR(e,c,r),s=dl(s.length,a)),cl(`sum`,s,a);let[d,f]=ol(u.shape,s),p=d;n&&(p=sl(d,o));let m=k(f),h=k(e.shape)/m,g=$({inputs:{x:u},attrs:{shape:[h,m]},backend:r}),_=wR(g,qi(e.dtype),`sum`,r),v=$({inputs:{x:_},attrs:{shape:p},backend:r});return r.disposeIntermediateTensorInfo(g),r.disposeIntermediateTensorInfo(_),l&&r.disposeIntermediateTensorInfo(u),v}function AR(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;return kR(i,a,o,n)}var jR={kernelName:`Sum`,backendName:`webgl`,kernelFunc:AR};function MR(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{perm:a}=r,o=n,s=i.shape.length,c=Array(s);for(let e=0;e<c.length;e++)c[e]=i.shape[a[e]];let l;if(o.shouldExecuteOnCPU([i])){let e=o.texData.get(i.dataId).values,t=oL(e,i.shape,i.dtype,a,c);l=o.makeTensorInfo(c,i.dtype);let n=o.texData.get(l.dataId);n.values=t}else l=OR(i,a,o);return l}var NR={kernelName:Tr,backendName:`webgl`,kernelFunc:MR};function PR({a:e,b:t,transposeA:n,transposeB:r,backend:i,bias:a=null,preluActivationWeights:o=null,leakyreluAlpha:s=0,activation:c=null}){let l=e.shape.length,u=t.shape.length,d=n?e.shape[l-2]:e.shape[l-1],f=r?t.shape[u-1]:t.shape[u-2],p=n?e.shape[l-1]:e.shape[l-2],m=r?t.shape[u-2]:t.shape[u-1],h=e.shape.slice(0,-2),g=t.shape.slice(0,-2),_=k(h),v=k(g),y=W(e.shape.slice(0,-2),t.shape.slice(0,-2)).concat([p,m]);O(d===f,()=>`Error in matMul: inner shapes (${d}) and (${f}) of Tensors with shapes ${e.shape} and ${t.shape} and transposeA=${n} and transposeB=${r} must match.`);let b=n?[_,d,p]:[_,p,d],x=r?[v,m,f]:[v,f,m],S=$({inputs:{x:e},backend:i,attrs:{shape:b}}),C=$({inputs:{x:t},backend:i,attrs:{shape:x}}),w=[S,C],T=Math.max(_,v),E=n?S.shape[1]:S.shape[2],D=a!=null,ee=o!=null,te=c===`leakyrelu`,A=c==null?null:fR(c,!0),ne=D||ee||te||A!=null,re;if((p===1||m===1)&&E>1e3&&ne===!1){let e=S,t=C;n&&(e=MR({inputs:{x:S},backend:i,attrs:{perm:[0,2,1]}}),w.push(e)),r&&(t=MR({inputs:{x:C},backend:i,attrs:{perm:[0,2,1]}}),w.push(t));let a=m!==1,o=m===1,s=e;a&&(s=$({inputs:{x:e},backend:i,attrs:{shape:[T,E,1]}}),w.push(s));let c=m===1?2:1,l=t;o&&(l=$({inputs:{x:t},backend:i,attrs:{shape:[T,1,E]}}),w.push(l));let u=_R({inputs:{a:s,b:l},backend:i});re=AR({inputs:{x:u},backend:i,attrs:{axis:c,keepDims:!0}}),w.push(u)}else{let c=Ki(e.dtype,t.dtype),l=new pR(b,x,[T,p,m],n,r,D,A,ee,te),u=[S,C];if(a!=null&&u.push(a),ee&&u.push(o),te){let e=i.makeTensorInfo([],`float32`,di(s,`float32`));u.push(e),w.push(e)}re=i.runWebGLProgram(l,u,c)}let ie=$({inputs:{x:re},backend:i,attrs:{shape:y}});w.push(re);for(let e of w)i.disposeIntermediateTensorInfo(e);return ie}function FR(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a,bias:o,preluActivationWeights:s}=t,{transposeA:c,transposeB:l,activation:u,leakyreluAlpha:d}=r;return PR({a:i,b:a,transposeA:c,transposeB:l,backend:n,bias:o,preluActivationWeights:s,leakyreluAlpha:d,activation:u})}var IR={kernelName:Nr,backendName:`webgl`,kernelFunc:FR},LR=`return abs(x);`;function RR(e){let{inputs:t,backend:n}=e,{x:r}=t;if(n.shouldExecuteOnCPU([r])&&r.dtype!==`complex64`){let e=KI(n.texData.get(r.dataId).values);return n.makeTensorInfo(r.shape,r.dtype,e)}let i;return i=N().getBool(`WEBGL_PACK_UNARY_OPERATIONS`)?new FL(r.shape,LR):new xL(r.shape,LR),n.runWebGLProgram(i,[r],r.dtype)}var zR={kernelName:`Abs`,backendName:`webgl`,kernelFunc:RR},BR={kernelName:He,backendName:`webgl`,kernelFunc:uR({opSnippet:SL+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`})},VR={kernelName:Ue,backendName:`webgl`,kernelFunc:uR({opSnippet:SL+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`})},HR=`return a + b;`,UR={kernelName:`Add`,backendName:`webgl`,kernelFunc:dR({opSnippet:HR,packedOpSnippet:HR,supportsComplex:!0,cpuKernelImpl:pI})},WR=class{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let n=[];this.variableNames.forEach(e=>{n.push(`float v${e} = get${e}AtOutCoords();`)});let r=this.variableNames.map(e=>`v${e}`).join(` + `);this.userCode=`
      void main() {
        ${n.join(`
        `)}

        float result = ${r};
        setOutput(result);
      }
    `}},GR=class{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let n=[];this.variableNames.forEach(e=>{n.push(`vec4 v${e} = get${e}AtOutCoords();`)});let r=this.variableNames.map(e=>`v${e}`).join(` + `);this.userCode=`
      void main() {
        ${n.join(`
        `)}

        vec4 result = ${r};
        setOutput(result);
      }
    `}};function KR(e){let{inputs:t,backend:n}=e,r=t;if(r.length===1)return ZL({inputs:{x:r[0]},backend:n});if(r.length>N().getNumber(`WEBGL_MAX_TEXTURES_IN_SHADER`)){let e=Math.floor(r.length/2);return KR({inputs:[KR({inputs:r.slice(0,e),backend:n}),KR({inputs:r.slice(e),backend:n})],backend:n})}let i=r.map(e=>e.dtype).reduce((e,t)=>Ki(e,t)),a=r.map(e=>e.shape),o=N().getBool(`WEBGL_PACK`)?new GR(r[0].shape,a):new WR(r[0].shape,a);return n.runWebGLProgram(o,r,i)}var qR={kernelName:We,backendName:`webgl`,kernelFunc:KR};function JR(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=i.shape.length,c=j(a,i.shape),l=c,u=ll(l,s),d=i;u!=null&&(d=MR({inputs:{x:i},backend:n,attrs:{perm:u}}),l=dl(l.length,s)),cl(`all`,l,s);let[f,p]=ol(d.shape,l),m=k(p),h=$({inputs:{x:d},backend:n,attrs:{shape:[-1,m]}}),g=wR(h,h.dtype,`all`,n),_;if(o){let e=sl(f,c);_=$({inputs:{x:g},backend:n,attrs:{shape:e}})}else _=$({inputs:{x:g},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(g),u!=null&&n.disposeIntermediateTensorInfo(d),_}var YR={kernelName:`All`,backendName:`webgl`,kernelFunc:JR};function XR(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=i.shape.length,c=j(a,i.shape),l=c,u=ll(l,s),d=i;u!=null&&(d=MR({inputs:{x:i},backend:n,attrs:{perm:u}}),l=dl(l.length,s)),cl(`any`,l,s);let[f,p]=ol(d.shape,l),m=k(p),h=$({inputs:{x:d},backend:n,attrs:{shape:[-1,m]}}),g=wR(h,h.dtype,`any`,n),_;if(o){let e=sl(f,c);_=$({inputs:{x:g},backend:n,attrs:{shape:e}})}else _=$({inputs:{x:g},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(g),u!=null&&n.disposeIntermediateTensorInfo(d),_}var ZR={kernelName:`Any`,backendName:`webgl`,kernelFunc:XR},QR=class{constructor(e,t,n){this.variableNames=[`A`];let{windowSize:r,batchSize:i,outSize:a}=e;n||this.variableNames.push(`bestIndicesA`),this.outputShape=[i,a];let o=t===`max`?`>`:`<`,s=n?`inOffset + i;`:`round(getBestIndicesA(batch, inOffset + i));`;this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${r}; i++) {
          int inIdx = ${s};
          float candidate = getA(batch, inIdx);
          if (candidate ${o} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}},$R=class{constructor(e,t,n,r){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,O(e.length>2,()=>`Packed arg${n.charAt(0).toUpperCase()+n.slice(1)} supports only inputs with rank above 2.`);let i=e[e.length-1],a=Math.ceil(i/t);this.outputShape=e.slice(0,-1),a>1&&this.outputShape.push(a),r||this.variableNames.push(`bestIndicesA`);let o=this.outputShape,s=o.length,c=EF(s),l=lL(`coords`,s),u,d;if(a===1){d=s+1;let e=EF(d);u=`
        ${e} sourceLocR = ${e}(${l.join()}, 0);
        ++${l[s-1]};
        ${e} sourceLocG = ${e}(${l.join()}, 0);
        ++${l[s-2]};
        ${e} sourceLocA = ${e}(${l.join()}, 0);
        --${l[s-1]};
        ${e} sourceLocB = ${e}(${l.join()}, 0);
        --${l[s-2]};`}else d=s,u=`
        ${c} sourceLocR = coords;
        ++${l[s-1]};
        ${c} sourceLocG = coords;
        ++${l[s-2]};
        ${c} sourceLocA = coords;
        --${l[s-1]};
        ${c} sourceLocB = coords;
        --${l[s-2]};`;let f=[`x`,`y`,`z`,`w`,`u`,`v`].slice(0,d),p=`.`+f[d-1],m=f.map(e=>`int `+e),h=lL(`sourceLocR`,d-1).concat(`inIdx.r`),g=lL(`sourceLocG`,d-1).concat(`inIdx.g`),_=lL(`sourceLocB`,d-1).concat(`inIdx.b`),v=lL(`sourceLocA`,d-1).concat(`inIdx.a`),y=n===`max`?`greaterThan`:`lessThan`,b=r?``:`
          inIdx = round(vec4(getBestIndicesAChannel(${h.join()}),
                             getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${_.join()}),
                             getBestIndicesAChannel(${v.join()})));`,x=`vec4(
            getAChannel(${h.join()}),
            hasNextCol ? getAChannel(${g.join()}) : 0.,
            hasNextRow ? getAChannel(${_.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${v.join()}) : 0.)`,S=r?``:`
      float getBestIndicesAChannel(${m.join()}) {
        return getChannel(getBestIndicesA(${f.join()}),
                                          vec2(${f.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${m.join()}) {
        return getChannel(getA(${f.join()}),
                               vec2(${f.slice(-2).join()}));
      }
      ${S}
      void main() {
        ${c} coords = getOutputCoords();
        bool hasNextCol = ${l[s-1]} < ${o[s-1]-1};
        bool hasNextRow = ${l[s-2]} < ${o[s-2]-1};
        ${u}
        ivec4 srcIdx = ivec4(sourceLocR${p}, sourceLocG${p},
          sourceLocB${p}, sourceLocA${p}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${x};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${b}
          vec4 candidate = ${x};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${y}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}};function ez(e,t,n,r=null){let i=t.shape[0],a=t.shape[1];r!=null&&(i=r.shape[0],a=r.shape[1]);let o=oh(a),s=new QR({windowSize:o,inSize:a,batchSize:i,outSize:Math.ceil(a/o)},n,r==null),c=[t];r!=null&&c.push(r);let l=e.runWebGLProgram(s,c,`int32`);if(l.shape[1]===1)return l;let u=ez(e,t,n,l);return e.disposeIntermediateTensorInfo(l),u}function tz(e,t,n,r=null){let i=r==null?t.shape:r.shape,a=i[i.length-1],o=new $R(i,oh(a),n,r==null),s=r==null?[t]:[t,r],c=e.runWebGLProgram(o,s,`int32`);if(c.shape.length===t.shape.length){let r=tz(e,t,n,c);return e.disposeIntermediateTensorInfo(c),r}return c}function nz(e,t,n,r){let i=[n];if(cl(`arg`+r.charAt(0).toUpperCase()+r.slice(1),i,t.shape.length),!N().getBool(`WEBGL_PACK_REDUCE`)||t.shape.length<=2){let n=[],a=e.texData.get(t.dataId),o=a!==null&&a.isPacked,s=t;o&&(s=e.unpackTensor(t),n.push(s));let[c,l]=ol(s.shape,i),u=k(l),d=$({inputs:{x:s},backend:e,attrs:{shape:[-1,u]}});n.push(d);let f=ez(e,d,r);n.push(f);let p=$({inputs:{x:f},backend:e,attrs:{shape:c}});return n.forEach(t=>e.disposeIntermediateTensorInfo(t)),p}return tz(e,t,r)}function rz(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r,o=j(a,i.shape),s=ll(o,i.shape.length),c=i,l=[];s!=null&&(c=MR({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=dl(o.length,c.shape.length)),cl(`argMax`,[o[0]],c.shape.length);let u=nz(n,c,o[0],`max`);return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),u}var iz={kernelName:Ge,backendName:`webgl`,kernelFunc:rz};function az(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r,o=j(a,i.shape),s=ll(o,i.shape.length),c=i,l=[];s!=null&&(c=MR({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=dl(o.length,c.shape.length)),cl(`argMin`,[o[0]],c.shape.length);let u=nz(n,c,o[0],`min`);return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),u}var oz={kernelName:Ke,backendName:`webgl`,kernelFunc:az},sz={kernelName:qe,backendName:`webgl`,kernelFunc:uR({opSnippet:SL+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`})},cz={kernelName:Je,backendName:`webgl`,kernelFunc:uR({opSnippet:SL+`return log(x + sqrt(x * x + 1.0));`})},lz={kernelName:Ye,backendName:`webgl`,kernelFunc:uR({opSnippet:SL+`
  return atan(x);
`})},uz={kernelName:Ze,backendName:`webgl`,kernelFunc:dR({opSnippet:qL+`
  return atan(a, b);
`,packedOpSnippet:`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+YL+`
  return result;
`})},dz={kernelName:Xe,backendName:`webgl`,kernelFunc:uR({opSnippet:SL+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`})},fz=class{constructor(e,t,n,r=!1,i=!1){if(this.variableNames=[`x`],t===`avg`&&n)throw Error(`Cannot compute positions for average pool.`);let a=e.filterWidth,o=e.strideHeight,s=e.strideWidth,c=e.dilationHeight,l=e.dilationWidth,u=e.effectiveFilterHeight,d=e.effectiveFilterWidth,f=e.padInfo.top,p=e.padInfo.left;this.outputShape=e.outShape;let m=t===`avg`,h=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,g=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`,_=`0.0`;if(m||(_=`-1.0 / 1e-20`),n){this.userCode=`
        const ivec2 strides = ivec2(${o}, ${s});
        const ivec2 pads = ivec2(${f}, ${p});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${u};
              wR += ${c}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d};
                wC += ${l}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${r?i?h:g:`wR * ${d} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t===`avg`&&(v=`avgValue / max(count, 1.0)`);let y=Math.floor(a/4)*4,b=a%4,x=`
      if (${m}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${o}, ${s});
      const ivec2 pads = ivec2(${f}, ${p});
      const float initializationValue = ${_};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${_});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${u};
            wR += ${c}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${y}; wC += 4) {
            int xC = xCCorner + wC * ${l};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              getValue(batch, xR, xC + 2 * ${l}, d),
              getValue(batch, xR, xC + 3 * ${l}, d)
            );

            ${x}
          }

          int xC = xCCorner + ${y};
          if (${b===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${x}
          } else if (${b===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              initializationValue,
              initializationValue
            );

            ${x}
          } else if (${b===3}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              getValue(batch, xR, xC + 2 * ${l}, d),
              initializationValue
            );

            ${x}
          }
        }
        setOutput(${v});
      }
    `}},pz=class{constructor(e,t,n,r=!1,i=!1){if(this.variableNames=[`x`],t===`avg`&&n)throw Error(`Cannot compute positions for average pool.`);let a=e.filterWidth,o=e.strideDepth,s=e.strideHeight,c=e.strideWidth,l=e.dilationDepth,u=e.dilationHeight,d=e.dilationWidth,f=e.effectiveFilterDepth,p=e.effectiveFilterHeight,m=e.effectiveFilterWidth,h=e.padInfo.front,g=e.padInfo.top,_=e.padInfo.left;this.outputShape=e.outShape;let v=t===`avg`,y=`0.0`;if(v||(y=`-1.0 / 1e-20`),n){this.userCode=`
        const ivec3 strides =
            ivec3(${o}, ${s}, ${c});
        const ivec3 pads = ivec3(${h}, ${g}, ${_});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${f};
              wD += ${l}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${e.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${p};
                wR += ${u}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${m};
                  wC += ${d}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${r?i?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${p} * ${m} +
                      wR * ${m} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let b=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t===`avg`&&(b=`avgValue / max(count, 1.0)`);let x=Math.floor(a/4)*4,S=a%4,C=`
      if (${v}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${o}, ${s}, ${c});
      const ivec3 pads = ivec3(${h}, ${g}, ${_});
      const float initializationValue = ${y};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${y});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${f};
            wD += ${l}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${p};
            wR += ${u}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${x}; wC += 4) {
              int xC = xCCorner + wC * ${d};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                getValue(batch, xD, xR, xC + 3 * ${d}, ch)
              );

              ${C}
            }

            int xC = xCCorner + ${x};
            if (${S===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${C}
            } else if (${S===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                initializationValue,
                initializationValue
              );

              ${C}
            } else if (${S===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                initializationValue
              );

              ${C}
            }
          }
        }
        setOutput(${b});
      }
    `}};function mz(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;kP(i,`avgPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;O(_s(o,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=rs(i.shape,a,o,1,s,c);if(l.filterWidth===1&&l.filterHeight===1&&A(l.inShape,l.outShape))return ZL({inputs:{x:i},backend:n});let u=new fz(l,`avg`,!1);return n.runWebGLProgram(u,[i],`float32`)}var hz={kernelName:Qe,backendName:`webgl`,kernelFunc:mz};function gz(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r,u=new pz(is(i.shape,a,o,[1,1,1],s,c,l),`avg`,!1);return n.runWebGLProgram(u,[i],`float32`)}var _z={kernelName:et,backendName:`webgl`,kernelFunc:gz},vz=class{constructor(e){this.variableNames=[`dy`],this.outputShape=e.inShape;let t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,i=e.strideWidth,a=e.dilationHeight,o=e.dilationWidth,s=e.effectiveFilterHeight,c=e.effectiveFilterWidth,l=s-1-e.padInfo.top,u=c-1-e.padInfo.left,d=1/(t*n);this.userCode=`
      const ivec2 pads = ivec2(${l}, ${u});
      const float avgMultiplier = float(${d});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${s};
            wR += ${a}) {
          float dyR = float(dyRCorner + wR) / ${r}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${c};
            wC+= ${o}) {
            float dyC = float(dyCCorner + wC) / ${i}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}},yz=class{constructor(e){this.variableNames=[`dy`],this.outputShape=e.inShape;let t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,i=e.strideDepth,a=e.strideHeight,o=e.strideWidth,s=e.dilationDepth,c=e.dilationHeight,l=e.dilationWidth,u=e.effectiveFilterDepth,d=e.effectiveFilterHeight,f=e.effectiveFilterWidth,p=u-1-e.padInfo.front,m=d-1-e.padInfo.top,h=f-1-e.padInfo.left,g=1/(t*n*r);this.userCode=`
      const ivec3 pads = ivec3(${p}, ${m}, ${h});
      const float avgMultiplier = float(${g});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${u};
            wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${i}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${d};
              wR += ${c}) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${f};
                wC += ${l}) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function bz(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a,{filterSize:s,strides:c,pad:l,dimRoundingMode:u}=r,d=new yz(is(o.shape,s,c,[1,1,1],l,u));return n.runWebGLProgram(d,[i],o.dtype)}var xz={kernelName:tt,backendName:`webgl`,kernelFunc:bz};function Sz(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a;kP([i,a],`avgPoolGrad`);let{filterSize:s,strides:c,pad:l}=r,u=new vz(rs(o.shape,s,c,1,l));return n.runWebGLProgram(u,[i],o.dtype)}var Cz={kernelName:$e,backendName:`webgl`,kernelFunc:Sz};function wz(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a}=t,{transposeA:o,transposeB:s}=r;return PR({a:i,b:a,transposeA:o,transposeB:s,backend:n})}var Tz={kernelName:nt,backendName:`webgl`,kernelFunc:wz},Ez=class{constructor(e,t,n,r,i,a){this.outputShape=[],this.variableNames=[`x`,`mean`,`variance`],W(e,t),W(e,n);let o=`0.0`;r!=null&&(W(e,r),this.variableNames.push(`offset`),o=`getOffsetAtOutCoords()`);let s=`1.0`;i!=null&&(W(e,i),this.variableNames.push(`scale`),s=`getScaleAtOutCoords()`),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${o};
        float scale = ${s};
        float inv = scale * inversesqrt(variance + float(${a}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}},Dz=class{constructor(e,t,n,r,i,a){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=[`x`,`mean`,`variance`],W(e,t),W(e,n);let o=`vec4(0.0)`;r!=null&&(W(e,r),this.variableNames.push(`offset`),o=`getOffsetAtOutCoords()`);let s=`vec4(1.0)`;i!=null&&(W(e,i),this.variableNames.push(`scale`),s=`getScaleAtOutCoords()`),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${o};
        vec4 scale = ${s};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${a}));

        setOutput((x - mean) * inv + offset);
      }
    `}},Oz={kernelName:Wt,backendName:`webgl`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r,mean:i,variance:a,offset:o,scale:s}=e;O(i.shape.length===a.shape.length,()=>`Batch normalization gradient requires mean and variance to have equal ranks.`),O(o==null||i.shape.length===o.shape.length,()=>`Batch normalization gradient requires mean and offset to have equal ranks.`),O(s==null||i.shape.length===s.shape.length,()=>`Batch normalization gradient requires mean and scale to have equal ranks.`);let{varianceEpsilon:c}=n;c==null&&(c=.001);let l=[r,i,a],u=null;o!=null&&(u=o.shape,l.push(o));let d=null;s!=null&&(d=s.shape,l.push(s));let f=N().getBool(`WEBGL_PACK_NORMALIZATION`)?new Dz(r.shape,i.shape,a.shape,u,d,c):new Ez(r.shape,i.shape,a.shape,u,d,c);return t.runWebGLProgram(f,l,l[0].dtype)}},kz=class{constructor(e){this.variableNames=[`source`],this.outputShape=e,this.rank=e.length;let t=EF(this.rank);this.customUniforms=[{name:`start`,arrayIndex:this.rank,type:`int`}];let n=jz(this.rank),r;r=`
        ${t} sourceLoc;
        ${t} coords = getOutputCoords();
        ${e.map((e,t)=>`sourceLoc.${Az[t]} = start[${t}] + coords.${Az[t]};`).join(`
`)}
      `,this.userCode=`
      void main() {
        ${r}
        setOutput(getSource(${n}));
      }
    `}},Az=[`x`,`y`,`z`,`w`,`u`,`v`];function jz(e){if(e===1)return`sourceLoc`;if(e<=6)return Az.slice(0,e).map(e=>`sourceLoc.`+e).join(`,`);throw Error(`Slicing for rank ${e} is not yet supported`)}var Mz=class{constructor(e){this.variableNames=[`source`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:`start`,arrayIndex:this.rank,type:`int`}];let t=EF(this.rank),n=lL(`coords`,this.rank),r=lL(`sourceLoc`,this.rank),i=this.rank===1?`sourceLoc`:`vec2(${r.slice(-2).join()})`,a=`getChannel(getSource(${r.join()}), ${i})`,o=`
      result.x = ${a};
      if (++${n[this.rank-1]} < ${e[this.rank-1]}) {
        ++${r[this.rank-1]};
        result.y = ${a};
        --${r[this.rank-1]};
      }
    `,s=this.rank===1?``:`
      --${n[this.rank-1]};
      if (++${n[this.rank-2]} < ${e[this.rank-2]}) {
        ++${r[this.rank-2]};
        result.z = ${a};
        if (++${n[this.rank-1]} < ${e[this.rank-1]}) {
          ++${r[this.rank-1]};
          result.w = ${a};
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((e,t)=>`start[${t}]`).join()});`:e.map((e,t)=>`${r[t]} = ${n[t]} + start[${t}];`).join(`
`);this.userCode=`
      void main() {
        ${t} coords = getOutputCoords();
        ${t} sourceLoc;
        ${c}
        vec4 result = vec4(0.);
        ${o}
        ${s}
        setOutput(result);
      }
    `}};function Nz(e,t,n,r){let i=r.texData.get(e.dataId),a=r.makeTensorInfo(n,e.dtype),o=r.texData.get(a.dataId);Object.assign(o,i),o.refCount=1,o.shape=n,o.dtype=e.dtype;let s=Gm(t,M(e.shape));i.slice&&(s+=i.slice.flatOffset),o.slice={flatOffset:s,origDataId:i.slice&&i.slice.origDataId||e.dataId};let c=r.dataRefCount.get(o.slice.origDataId)||1;return r.dataRefCount.set(o.slice.origDataId,c+1),a}function Pz(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,size:o}=r,[s,c]=Km(i,a,o);if(Mm(i,s,c),k(c)===0)return n.makeTensorInfo(c,i.dtype,[]);if(n.shouldExecuteOnCPU([i])||i.dtype===`string`){let e=qI(n.texData.get(i.dataId).values,s,c,i.shape,i.dtype);return n.makeTensorInfo(c,i.dtype,e)}let{isPacked:l}=n.texData.get(i.dataId),u=Wm(i.shape,s,c);if(l||!u){let e=N().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new Mz(c):new kz(c),t=[s];return n.runWebGLProgram(e,[i],i.dtype,t)}return n.uploadToGPU(i.dataId),Nz(i,s,c,n)}var Fz={kernelName:er,backendName:`webgl`,kernelFunc:Pz},Iz={kernelName:rt,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,crops:o}=r;O(i.shape.length<=4,()=>`batchToSpaceND for rank > 4 with a WebGL backend not implemented yet`);let s=a.reduce((e,t)=>e*t),c=ch(i.shape,a,s),l=lh(c.length,a.length),u=uh(i.shape,a,s),d=dh(o,a.length),f=fh(u,o,a.length),p=[],m=$({inputs:{x:i},backend:n,attrs:{shape:c}}),h=MR({inputs:{x:m},backend:n,attrs:{perm:l}}),g=$({inputs:{x:h},backend:n,attrs:{shape:u}}),_=Pz({inputs:{x:g},backend:n,attrs:{begin:d,size:f}});return p.push(m),p.push(h),p.push(g),p.forEach(e=>n.disposeIntermediateTensorInfo(e)),_}};function Lz(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o}=r,s=mI(n.readSync(i.dataId),n.readSync(a.dataId),a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,s)}var Rz={kernelName:it,backendName:`webgl`,kernelFunc:Lz},zz=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,Bz=`
  return float(int(a.r) & int(b.r));
`;function Vz(e){let{inputs:t,backend:n}=e,{a:r,b:i}=t,a=N().getBool(`WEBGL_PACK_BINARY_OPERATIONS`),o=N().getNumber(`WEBGL_VERSION`);if(n.shouldExecuteOnCPU([r,i])||o===1){let e=n.texData.get(r.dataId).values,t=n.texData.get(i.dataId).values,[a,o]=gI(r.shape,i.shape,e,t,r.dtype),s=n.makeTensorInfo(o,r.dtype),c=n.texData.get(s.dataId);return c.values=a,s}let s;return s=a?new XL(zz,r.shape,i.shape,!1):new JL(Bz,r.shape,i.shape),n.runWebGLProgram(s,[r,i],r.dtype)}var Hz={kernelName:at,backendName:`webgl`,kernelFunc:Vz};function Uz(e){let{inputs:t,backend:n}=e,{s0:r,s1:i}=t,a=n.readSync(r.dataId),o=n.readSync(i.dataId),s=W(Array.from(a),Array.from(o));return n.makeTensorInfo([s.length],`int32`,Int32Array.from(s))}var Wz={kernelName:st,backendName:`webgl`,kernelFunc:Uz},Gz=dR({opSnippet:`return float(a != b);`,cpuKernelImpl:LI,dtype:`bool`}),Kz={kernelName:Cn,backendName:`webgl`,kernelFunc:Gz};function qz(e){let{inputs:t,backend:n}=e,{input:r}=t;return ZL({inputs:{x:n.texData.get(r.dataId).complexTensorInfos.real},backend:n})}var Jz={kernelName:Ln,backendName:`webgl`,kernelFunc:qz},Yz=`return float(int(x));`;function Xz(e,t){let n=new xL(e.shape,Yz),r=t.runWebGLProgram(n,[e],`int32`);return{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}function Zz(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dtype:a}=r;if(a===`complex64`){if(i.dtype===`complex64`)return ZL({inputs:{x:i},backend:n});let e=Hu(i.shape),t=Zz({inputs:{x:i},backend:n,attrs:{dtype:`float32`}}),r=$L({inputs:{real:t,imag:e},backend:n});return e.dispose(),n.disposeIntermediateTensorInfo(t),r}if(i.dtype===`complex64`){let e=qz({inputs:{input:i},backend:n}),t=Zz({inputs:{x:e},backend:n,attrs:{dtype:a}});return n.disposeIntermediateTensorInfo(e),t}if(!fe(i.dtype,a)){let e=ZL({inputs:{x:i},backend:n});return{dataId:e.dataId,shape:e.shape,dtype:a}}if(n.shouldExecuteOnCPU([i])){let e=n.texData.get(i.dataId).values,[t,r,o]=_I(e,i.shape,i.dtype,a);return n.makeTensorInfo(t,r,o)}if(a===`int32`)return Xz(i,n);if(a===`bool`){let e=n.makeTensorInfo([],`bool`,ce(`bool`,1)),t=Gz({inputs:{a:i,b:e},backend:n});return n.disposeIntermediateTensorInfo(e),t}throw Error(`Error in Cast: failed to cast ${i.dtype} to ${a}`)}var Qz={kernelName:ct,backendName:`webgl`,kernelFunc:Zz},$z=`return ceil(x);`,eB={kernelName:lt,backendName:`webgl`,kernelFunc:uR({opSnippet:$z,packedOpSnippet:$z,cpuKernelImpl:vI})},tB=class{constructor(e){this.variableNames=[`A`],this.customUniforms=[{name:`minVal`,type:`float`},{name:`maxVal`,type:`float`}],this.outputShape=e,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}},nB=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`minVal`,type:`float`},{name:`maxVal`,type:`float`}],this.outputShape=e,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}};function rB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{clipValueMin:a,clipValueMax:o}=r,s;s=N().getBool(`WEBGL_PACK_CLIP`)?new nB(i.shape):new tB(i.shape);let c=[[a],[o]];return n.runWebGLProgram(s,[i],i.dtype,c)}var iB={kernelName:ut,backendName:`webgl`,kernelFunc:rB},aB=class{constructor(e){this.variableNames=[`real`,`imag`],this.outputShape=e,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}};function oB(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}function sB(e){let{inputs:t,backend:n}=e,{x:r}=t,i=n.texData.get(r.dataId),a=new aB(r.shape),o=[oB(r,i.complexTensorInfos.real),oB(r,i.complexTensorInfos.imag)];return n.runWebGLProgram(a,o,o[0].dtype)}var cB={kernelName:ft,backendName:`webgl`,kernelFunc:sB},lB=class{constructor(e){this.outputShape=[],this.outputShape=eh(e,1),this.variableNames=e.map((e,t)=>`T${t}`);let t=Array(e.length-1);t[0]=e[0][1];for(let n=1;n<t.length;n++)t[n]=t[n-1]+e[n][1];let n=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let e=1;e<t.length;e++){let r=t[e-1];n.push(`else if (yC < ${t[e]}) setOutput(getT${e}(yR, yC-${r}));`)}let r=t.length,i=t[t.length-1];n.push(`else setOutput(getT${r}(yR, yC-${i}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${n.join(`
        `)}
      }
    `}},uB=class{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=eh(e,t);let n=this.outputShape,r=n.length,i=EF(r),a=lL(`coords`,r),o=[`x`,`y`,`z`,`w`,`u`,`v`].slice(0,r);this.variableNames=e.map((e,t)=>`T${t}`);let s=Array(e.length-1);s[0]=e[0][t];for(let n=1;n<s.length;n++)s[n]=s[n-1]+e[n][t];let c=o[t],l=o.slice(-2),u=o.join(),d=`if (${c} < ${s[0]}) {
        return getChannel(
            getT0(${u}), vec2(${l.join()}));
        }`;for(let e=1;e<s.length;e++){let t=s[e-1];d+=`
        if (${c} < ${s[e]}  && ${c} >= ${s[e-1]}) {
          return getChannel(
            getT${e}(${dB(o,c,t)}),
            vec2(${dB(l,c,t)}));
        }`}let f=s.length,p=s[s.length-1];d+=`
        return getChannel(
          getT${f}(${dB(o,c,p)}),
          vec2(${dB(l,c,p)}));`,this.userCode=`
      float getValue(${o.map(e=>`int `+e)}) {
        ${d}
      }

      void main() {
        ${i} coords = getOutputCoords();
        vec4 result = vec4(getValue(${a}), 0., 0., 0.);

        ${a[r-1]} = ${a[r-1]} + 1;
        if (${a[r-1]} < ${n[r-1]}) {
          result.g = getValue(${a});
        }

        ${a[r-2]} = ${a[r-2]} + 1;
        if (${a[r-2]} < ${n[r-2]}) {
          result.a = getValue(${a});
        }

        ${a[r-1]} = ${a[r-1]} - 1;
        if (${a[r-2]} < ${n[r-2]} &&
            ${a[r-1]} < ${n[r-1]}) {
          result.b = getValue(${a});
        }
        setOutput(result);
      }
    `}};function dB(e,t,n){let r=e.indexOf(t);return e.map((e,t)=>t===r?`${e} - ${n}`:e).join()}function fB(e){let{inputs:t,backend:n}=e,{input:r}=t;return ZL({inputs:{x:n.texData.get(r.dataId).complexTensorInfos.imag},backend:n})}var pB={kernelName:Zt,backendName:`webgl`,kernelFunc:fB};function mB(e,t,n){let r=e[0].dtype;if(r===`complex64`){let r=e.map(e=>qz({inputs:{input:e},backend:n})),i=e.map(e=>fB({inputs:{input:e},backend:n})),a=mB(r,t,n),o=mB(i,t,n),s=$L({inputs:{real:a,imag:o},backend:n});return r.forEach(e=>n.disposeIntermediateTensorInfo(e)),i.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(o),s}let i=n.shouldExecuteOnCPU(e);if(r===`string`&&(i=!0),i){let i=e.map(e=>{let r=[-1,k(e.shape.slice(t))];return $({inputs:{x:e},backend:n,attrs:{shape:r}})}),a=yI(i.map(e=>({vals:n.readSync(e.dataId),shape:e.shape})),eh(i.map(e=>e.shape),1),r,i[0].shape[0]===1),o=eh(e.map(e=>e.shape),t),s=n.makeTensorInfo(o,r,a);return i.forEach(e=>n.disposeIntermediateTensorInfo(e)),s}let a=e.filter(e=>k(e.shape)>0),o=N().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)&&a[0].shape.length>1;if(a.length===1){let t=o?new xL(e[0].shape,OL):new FL(e[0].shape,OL);return n.runWebGLProgram(t,e,r)}let s=N().getNumber(`WEBGL_MAX_TEXTURES_IN_SHADER`);if(a.length>s){let e=[];for(let r=0;r<a.length;r+=s){let i=a.slice(r,r+s);e.push(mB(i,t,n))}let r=mB(e,t,n);for(let t of e)n.disposeIntermediateTensorInfo(t);return r}if(o){let e=new uB(a.map(e=>e.shape),t);return n.runWebGLProgram(e,a,r)}let{tensors2D:c,outShape:l}=hB(a,t,n),u=new lB(c.map(e=>e.shape)),d=n.runWebGLProgram(u,c,r);c.forEach(e=>n.disposeIntermediateTensorInfo(e));let f=$({inputs:{x:d},attrs:{shape:l},backend:n});return n.disposeIntermediateTensorInfo(d),f}function hB(e,t,n){let r=eh(e.map(e=>e.shape),t);return{tensors2D:e.map(e=>$({inputs:{x:e},attrs:{shape:[-1,k(e.shape.slice(t))]},backend:n})),outShape:r}}function gB(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r,a=j(i,t[0].shape)[0];$m(t.map(e=>e.shape),a);let o=eh(t.map(e=>e.shape),a);if(k(o)===0)return n.makeTensorInfo(o,t[0].dtype,[]);let s=t.filter(e=>k(e.shape)>0);return s.length===1?ZL({inputs:{x:s[0]},backend:n}):mB(s,a,n)}var _B={kernelName:pt,backendName:`webgl`,kernelFunc:gB},vB=class{constructor(e,t=!1,n=null,r=!1,i=!1){this.variableNames=[`x`,`W`],this.outputShape=e.outShape;let a=e.padInfo.top,o=e.padInfo.left,s=e.strideHeight,c=e.strideWidth,l=e.dilationHeight,u=e.dilationWidth,d=e.filterHeight,f=e.filterWidth,p=Math.floor(e.inChannels/4)*4,m=e.inChannels%4,h=e.dataFormat===`channelsLast`,g=h?1:2,_=h?2:3,v=h?3:1,y=``,b=``;n&&(y=r?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${n}
        }`:i?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${n}
        }`:`
          float activation(float x) {
            ${n}
          }
        `,b=`result = activation(result);`);let x=t?`result += getBiasAtOutCoords();`:``;t&&this.variableNames.push(`bias`),r&&this.variableNames.push(`preluActivationWeights`),i&&this.variableNames.push(`leakyreluAlpha`),this.userCode=`
      ${y}

      const ivec2 strides = ivec2(${s}, ${c});
      const ivec2 pads = ivec2(${a}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${v}];

        ivec2 xRCCorner =
            ivec2(coords[${g}], coords[${_}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${d}; wR++) {
          int xR = xRCorner + wR * ${l};

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${f}; wC++) {
            int xC = xCCorner + wC * ${u};

            if (xC < 0 || xC >= ${e.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${p}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${h}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${m===1}) {

              if (${h}) {
                dotProd +=
                    getX(batch, xR, xC, ${p}) *
                    getW(wR, wC, ${p}, d2);
              } else {
                dotProd +=
                    getX(batch, ${p}, xR, xC) *
                    getW(wR, wC, ${p}, d2);
              }

            } else if (${m===2}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${p}, d2),
                getW(wR, wC, ${p} + 1, d2)
              );

              if (${h}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${p}),
                  getX(batch, xR, xC, ${p} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${p}, xR, xC),
                  getX(batch, ${p} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${m===3}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${p}, d2),
                getW(wR, wC, ${p} + 1, d2),
                getW(wR, wC, ${p} + 2, d2)
              );

              if (${h}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${p}),
                  getX(batch, xR, xC, ${p} + 1),
                  getX(batch, xR, xC, ${p} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${p}, xR, xC),
                  getX(batch, ${p} + 1, xR, xC),
                  getX(batch, ${p} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${x}
        ${b}
        setOutput(result);
      }
    `}},yB=class{constructor(e){this.variableNames=[`x`,`W`],this.outputShape=e.outShape;let t=e.padInfo.front,n=e.padInfo.top,r=e.padInfo.left,i=e.strideDepth,a=e.strideHeight,o=e.strideWidth,s=e.dilationDepth,c=e.dilationHeight,l=e.dilationWidth,u=e.filterDepth,d=e.filterHeight,f=e.filterWidth,p=Math.floor(e.inChannels/4)*4,m=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${i}, ${a}, ${o});
      const ivec3 pads = ivec3(${t}, ${n}, ${r});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${u}; wF++) {
          int xF = xFCorner + wF * ${s};

          if (xF < 0 || xF >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${d}; wR++) {
            int xR = xRCorner + wR * ${c};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${f}; wC++) {
              int xC = xCCorner + wC * ${l};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${p}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${m===1}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${p}) *
                  getW(wF, wR, wC, ${p}, d2);
              } else if (${m===2}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${p}),
                  getX(batch, xF, xR, xC, ${p} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${p}, d2),
                  getW(wF, wR, wC, ${p} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${m===3}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${p}),
                  getX(batch, xF, xR, xC, ${p} + 1),
                  getX(batch, xF, xR, xC, ${p} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${p}, d2),
                  getW(wF, wR, wC, ${p} + 1, d2),
                  getW(wF, wR, wC, ${p} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}},bB=class{constructor(e,t=!1,n=null,r=!1,i=!1){this.variableNames=[`x`,`W`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`pads`,type:`ivec2`},{name:`strides`,type:`ivec2`},{name:`dilations`,type:`ivec2`},{name:`inDims`,type:`ivec2`}],this.outputShape=e.outShape,this.enableShapeUniforms=FF(this.outputShape.length);let a=e.padInfo.left,o=e.strideWidth,s=e.dilationWidth,c=e.filterHeight,l=e.filterWidth,u=l,d=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<l;e++)d+=`
           vec4 xTexelC${e*2};
           int xTexelC${e*2}Ready;
           vec4 xTexelC${e*2+1};
           int xTexelC${e*2+1}Ready;
           vec4 xC${e};`;d+=`
     for (int r = 0; r < ${c}; r++) {
      for (int d1 = 0; d1 < ${e.inChannels}; d1 += 2) {
       `;for(let e=0;e<l;e++)d+=`
           xTexelC${e*2} = vec4(0.0);
           xTexelC${e*2}Ready = 0;
           xTexelC${e*2+1} = vec4(0.0);
           xTexelC${e*2+1}Ready = 0;
           xC${e} = vec4(0.0);`;d+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let t=0;t<(u+1)/2;t++){let n=t*2;if(d+=`
           xC = xCCorner + ${n*s};
           `,o===1){if(n<l&&(a%2==1?(d+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n}Ready == 0) {
                   xTexelC${n} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${n}.zw = vec2(0.0);
                   }
                   xTexelC${n}Ready = 1;
                 }
               `,s===1&&n>0?d+=`
                 xC${n} = vec4(xTexelC${n-2}.zw, xTexelC${n}.xy);
                 `:d+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${n} = vec4(previous.zw, xTexelC${n}.xy);
                   } else {
                     xC${n} = vec4(0.0, 0.0, xTexelC${n}.xy);
                   }
                   `):d+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${n}Ready == 0) {
                   xTexelC${n} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${n}.zw = vec2(0.0);
                   }
                   xTexelC${n}Ready = 1;
                 }

                 xC${n} = xTexelC${n};
                 `,n+1<l)){let e=a%2==0?T(s):s;s%2==0&&a%2==1||s%2!=0&&a%2!=1?(d+=`
                   xCOffset = xC + imod(pads[1], 2) + ${e};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n+1}Ready == 0) {
                     xTexelC${n+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${n+1}.zw = vec2(0.0);
                     }
                     xTexelC${n+1}Ready = 1;
                   }
                   `,s>1?d+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${n+1} = vec4(previous.zw, xTexelC${n+1}.xy);
                     } else {
                      xC${n+1} = vec4(0.0, 0.0, xTexelC${n+1}.xy);
                     }
                     `:d+=`
                     xC${n+1} = vec4(xTexelC${n}.zw, xTexelC${n+1}.xy);
                     `):e===1?d+=`
                     xC${n+1} = xTexelC${n};
                     `:d+=`
                     xCOffset = xC + ${e};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n+1}Ready == 0) {
                       xTexelC${n+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${n+1}.zw = vec2(0.0);
                       }
                       xTexelC${n+1}Ready = 1;
                     }

                     xC${n+1} = xTexelC${n+1};
                     `}}else n<l&&(a%2==1?(d+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n}Ready == 0) {
                   xTexelC${n} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${n}.zw = vec2(0.0);
                   }
                   xTexelC${n}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${n+1}Ready == 0) {
                   xTexelC${n+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${n+1}.zw = vec2(0.0);
                   }
                   xTexelC${n+1}Ready = 1;
                 }

                 xC${n} = vec4(xTexelC${n}.zw, xTexelC${n+1}.zw);
               `,n+1<l&&(d+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${n+1} = vec4(xTexelC${n+1}.xy, final.xy);
                 `)):(d+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${n}Ready == 0) {
                   xTexelC${n} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${n}.zw = vec2(0.0);
                   }
                   xTexelC${n}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n+1}Ready == 0) {
                   xTexelC${n+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${n+1}.zw = vec2(0.);
                   }
                   xTexelC${n+1}Ready = 1;
                 }

                 xC${n} = vec4(
                   xTexelC${n}.xy, xTexelC${n+1}.xy);
               `,n+1<l&&(d+=`
                   xC${n+1} = vec4(xTexelC${n}.zw, xTexelC${n+1}.zw);
                 `)));n<l&&(d+=`
             wTexel = getW(r, ${n}, d1, d2);
             dotProd += xC${n}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${e.inChannels}) {
               dotProd += xC${n}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,n+1<l&&(d+=`
               wTexel = getW(r, ${n+1}, d1, d2);
               dotProd += xC${n+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${e.inChannels}) {
                 dotProd += xC${n+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}d+=`
     }
   `,d+=`
     }
   `,d+=`
     }
   `;let f=``,p=``;n&&(f=r?`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${n}
         }`:i?`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${n}
         }`:`vec4 activation(vec4 x) {
           ${n}
         }`,p=`result = activation(result);`);let m=t?`result += getBiasAtOutCoords();`:``;t&&this.variableNames.push(`bias`),r&&this.variableNames.push(`preluActivationWeights`),i&&this.variableNames.push(`leakyreluAlpha`),this.userCode=`
       ${f}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${d}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${m}
         ${p}
         setOutput(result);
       }
     `}},xB=class{constructor(e,t){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`inputShape`,type:`ivec4`},{name:`pad`,type:`ivec2`},{name:`stride`,type:`ivec2`},{name:`dilation`,type:`ivec2`},{name:`inChannels`,type:`int`},{name:`itemsPerBlockRow`,type:`int`},{name:`outWidth`,type:`int`}],this.outputShape=e,this.enableShapeUniforms=FF(this.outputShape.length);let{dataFormat:n}=t,r=AP(),i=n===`channelsLast`,a=i?1:2,o=i?2:3,s=this.enableShapeUniforms?`if(blockIndex < outShape[2] && pos < outShape[1]) {`:`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`,c=``;for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)c+=`
          blockIndex = rc.z + ${t};
          pos = rc.y + ${e};

          ${s}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${a}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${o}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${i}) {
                  innerDims = vec2(d1, ch);
                  result[${e*2+t}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${e*2+t}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${c}

        ${r.output} = result;
      }
    `}};function SB(e,t){let n=e.length;return n>=3?t?[...e.slice(0,-3),e[n-3]*e[n-2],e[n-1]]:[...e.slice(0,-3),e[n-3],e[n-2]*e[n-1]]:!t&&n===1&&e[0]>1?[e[0],1]:null}function CB({x:e,filter:t,convInfo:n,backend:r,bias:i=null,preluActivationWeights:a=null,leakyreluAlpha:o=0,activation:s=null}){let c=e.shape,l=r.texData.get(e.dataId),u=n.inChannels,d=c[0]*c[1]*c[2],f=n.outChannels,p=n.dataFormat===`channelsLast`,m,h=[];if(a!=null){let e=SB(a.shape,p);e!=null&&(a=$({inputs:{x:a},backend:r,attrs:{shape:e}}),h.push(a))}if(i!=null){let e=SB(i.shape,p);e!=null&&(i=$({inputs:{x:i},backend:r,attrs:{shape:e}}),h.push(i))}if(!((d===1||f===1)&&u>1e3)&&l.isPacked&&p&&l.texture!=null&&c[2]%2!=0&&A(l.shape.slice(-3),c.slice(-3))){let u=c[0]*c[1]*(c[2]+1),d={dataId:e.dataId,shape:[1,u,n.inChannels],dtype:e.dtype},f=l.shape;l.shape=l.shape.slice(),l.shape[l.shape.length-2]++,O(gP(l.shape,d.shape),()=>`packed reshape ${l.shape} to ${d.shape} isn't free`);let p=$({inputs:{x:t},backend:r,attrs:{shape:[1,n.inChannels,n.outChannels]}});h.push(p);let g=PR({a:d,b:p,backend:r,transposeA:!1,transposeB:!1,bias:i,activation:s,preluActivationWeights:a,leakyreluAlpha:o}),_=r.texData.get(g.dataId);O(_.isPacked,()=>`batchMatMul result is expected to be packed`),l.shape=f,_.shape=n.outShape,m=ZL({inputs:{x:g},backend:r}),m.shape=n.outShape,h.push(g)}else{let c=n.outHeight*n.outWidth,l=$({inputs:{x:e},backend:r,attrs:{shape:p?[n.batchSize,c,n.inChannels]:[n.batchSize,n.inChannels,c]}}),u=$({inputs:{x:t},backend:r,attrs:{shape:[1,n.inChannels,n.outChannels]}}),d=PR({a:p?l:u,b:p?u:l,transposeA:!p,transposeB:!1,backend:r,bias:i,activation:s,preluActivationWeights:a,leakyreluAlpha:o});m=$({inputs:{x:d},backend:r,attrs:{shape:n.outShape}}),h.push(l),h.push(u),h.push(d)}for(let e of h)r.disposeIntermediateTensorInfo(e);return m}function wB({x:e,filter:t,convInfo:n,backend:r,bias:i=null,preluActivationWeights:a=null,leakyreluAlpha:o=0,activation:s=null}){let{filterWidth:c,filterHeight:l,inChannels:u,outWidth:d,outHeight:f,dataFormat:p}=n,m=p===`channelsLast`,h=c*l*u,g=f*d,_=[n.batchSize,h,g],v=[];if(a!=null){let e=SB(a.shape,m);e!=null&&(a=$({inputs:{x:a},backend:r,attrs:{shape:e}}),v.push(a))}if(i!=null){let e=SB(i.shape,m);e!=null&&(i=$({inputs:{x:i},backend:r,attrs:{shape:e}}),v.push(i))}let y=$({inputs:{x:t},backend:r,attrs:{shape:[1,h,k(t.shape)/h]}});v.push(y);let b=new xB(_,n),x=[e.shape,[n.padInfo.top,n.padInfo.left],[n.strideHeight,n.strideWidth],[n.dilationHeight,n.dilationWidth],[n.inChannels],[n.filterWidth*n.inChannels],[n.outWidth]],S=r.runWebGLProgram(b,[e],`float32`,x),C=$({inputs:{x:S},backend:r,attrs:{shape:_}});v.push(S),v.push(C);let w=i!=null,T=a!=null,E=s===`leakyrelu`,D=s?fR(s,!0):null,O=new pR(m?C.shape:y.shape,m?y.shape:C.shape,m?[n.batchSize,g,n.outChannels]:[n.batchSize,n.outChannels,g],!0,!1,w,D,T,E),ee=m?[C,y]:[y,C];if(i&&ee.push(i),T&&ee.push(a),E){let e=r.makeTensorInfo([],`float32`,di(o,`float32`));ee.push(e),v.push(e)}let te=r.runWebGLProgram(O,ee,`float32`),A=$({inputs:{x:te},backend:r,attrs:{shape:n.outShape}});v.push(te);for(let e of v)r.disposeIntermediateTensorInfo(e);return A}function TB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dataFormat:c,dilations:l,dimRoundingMode:u}=r,d=ys(c),f=as(i.shape,a.shape,o,l,s,u,!1,d),p;if(f.filterHeight===1&&f.filterWidth===1&&f.dilationHeight===1&&f.dilationWidth===1&&f.strideHeight===1&&f.strideWidth===1&&(f.padInfo.type===`SAME`||f.padInfo.type===`VALID`))p=CB({x:i,filter:a,convInfo:f,backend:n});else if(f.strideWidth<=2&&d===`channelsLast`&&N().getBool(`WEBGL_EXP_CONV`)){let e=new bB(f),t=[[f.padInfo.top,f.padInfo.left],[f.strideHeight,f.strideWidth],[f.dilationHeight,f.dilationWidth],[f.inHeight,f.inWidth]];p=n.runWebGLProgram(e,[i,a],`float32`,t)}else if(N().getBool(`WEBGL_CONV_IM2COL`))p=wB({x:i,filter:a,convInfo:f,backend:n});else{let e=new vB(f);p=n.runWebGLProgram(e,[i,a],`float32`)}let m=$({inputs:{x:p},backend:n,attrs:{shape:f.outShape}});return n.disposeIntermediateTensorInfo(p),m}var EB={kernelName:mt,backendName:`webgl`,kernelFunc:TB},DB=class{constructor(e){this.variableNames=[`x`,`dy`],this.outputShape=e.filterShape;let t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,i=e.padInfo.left,a=e.dataFormat===`channelsLast`;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${r};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${n} - ${i};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              ${a?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}},OB=class{constructor(e){this.variableNames=[`dy`,`W`],this.outputShape=e.inShape;let t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,i=e.strideWidth,a=e.dataFormat===`channelsLast`,o=t-1-e.padInfo.top,s=n-1-e.padInfo.left,c=a?1:2,l=a?2:3,u=a?3:1;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${u}];

        ivec2 dyCorner = ivec2(coords[${c}], coords[${l}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${r}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${n}; wC++) {
            float dyC = float(dyCCorner + wC) / ${i}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${n} - 1 - wC;

            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {

              if (${a}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}},kB=class{constructor(e){this.variableNames=[`x`,`dy`],this.outputShape=e.filterShape;let t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,i=e.padInfo.front,a=e.padInfo.top,o=e.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yF = 0; yF < ${e.outDepth}; yF++) {
            int xF = wF + yF * ${t} - ${i};

            if (xF < 0 || xF >= ${e.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${e.outHeight}; yR++) {
              int xR = wR + yR * ${n} - ${a};

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${e.outWidth}; yC++) {
                int xC = wC + yC * ${r} - ${o};

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}},AB=class{constructor(e){this.variableNames=[`dy`,`W`],this.outputShape=e.inShape;let t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,i=e.strideDepth,a=e.strideHeight,o=e.strideWidth,s=t-1-e.padInfo.front,c=n-1-e.padInfo.top,l=r-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${s}, ${c}, ${l});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${t}; wF++) {
          float dyF = float(dyFCorner + wF) / ${i}.0;

          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${t} - 1 - wF;

          for (int wR = 0; wR < ${n}; wR++) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${n} - 1 - wR;

            for (int wC = 0; wC < ${r}; wC++) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${r} - 1 - wC;

              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function jB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,dataFormat:c,dimRoundingMode:l,filterShape:u}=r,d=ys(c),f=new DB(as(i.shape,u,o,1,s,l,!1,d));return n.runWebGLProgram(f,[i,a],`float32`)}var MB={kernelName:ht,backendName:`webgl`,kernelFunc:jB},NB=class{constructor(e){this.variableNames=[`dy`,`W`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`strides`,type:`vec2`}],this.outputShape=e.inShape,this.enableShapeUniforms=FF(this.outputShape.length);let t=e.filterHeight,n=e.filterWidth,r=t-1-e.padInfo.top,i=n-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${r}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${n}; wC++) {
            int wCPerm = ${n} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${e.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${e.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}};function PB(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{inputShape:o,strides:s,pad:c,dataFormat:l,dimRoundingMode:u}=r,d=ys(l),f=as(o,a.shape,s,1,c,u,!1,d);if(N().getBool(`WEBGL_PACK_CONV2DTRANSPOSE`)&&d===`channelsLast`){let e=[[f.strideHeight,f.strideWidth]],t=new NB(f);return n.runWebGLProgram(t,[i,a],`float32`,e)}else{let e=new OB(f);return n.runWebGLProgram(e,[i,a],`float32`)}}var FB={kernelName:gt,backendName:`webgl`,kernelFunc:PB};function IB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r,l=new yB(os(i.shape,a.shape,o,c,s));return n.runWebGLProgram(l,[i,a],`float32`)}var LB={kernelName:_t,backendName:`webgl`,kernelFunc:IB};function RB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,filterShape:c}=r,l=new kB(os(i.shape,c,o,1,s));return n.runWebGLProgram(l,[i,a],`float32`)}var zB={kernelName:vt,backendName:`webgl`,kernelFunc:RB};function BB(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{pad:o,strides:s,inputShape:c}=r,l=new AB(os(c,a.shape,s,1,o));return n.runWebGLProgram(l,[i,a],`float32`)}var VB={kernelName:yt,backendName:`webgl`,kernelFunc:BB},HB={kernelName:`Cos`,backendName:`webgl`,kernelFunc:uR({opSnippet:lR+`
  return cos(x);
`,packedOpSnippet:`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${YL}
  return result;
`})},UB={kernelName:bt,backendName:`webgl`,kernelFunc:uR({opSnippet:`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`})},WB=class{constructor(e,t,n,r,i){this.variableNames=[`Image`,`Boxes`,`BoxInd`],this.outputShape=[];let[a,o,s,c]=e,[l]=t,[u,d]=n;this.outputShape=[l,u,d,c];let f=+(r===`bilinear`),[p,m]=[`${o-1}.0`,`${s-1}.0`],[h,g,_]=u>1?[`${(o-1)/(u-1)}`,`(y2-y1) * height_ratio`,`y1*${p} + float(y)*(height_scale)`]:[`0.0`,`0.0`,`0.5 * (y1+y2) * ${p}`],[v,y,b]=d>1?[`${(s-1)/(d-1)}`,`(x2-x1) * width_ratio`,`x1*${m} + float(x)*(width_scale)`]:[`0.0`,`0.0`,`0.5 * (x1+x2) * ${m}`];this.userCode=`
      const float height_ratio = float(${h});
      const float width_ratio = float(${v});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${a}) {
          return;
        }

        float height_scale = ${g};
        float width_scale = ${y};

        float in_y = ${_};
        if( in_y < 0.0 || in_y > ${p} ) {
          setOutput(float(${i}));
          return;
        }
        float in_x = ${b};
        if( in_x < 0.0 || in_x > ${m} ) {
          setOutput(float(${i}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${f} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}},GB={kernelName:Ct,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{image:i,boxes:a,boxInd:o}=t,{cropSize:s,method:c,extrapolationValue:l}=r,u=new WB(i.shape,a.shape,s,c,l);return n.runWebGLProgram(u,[i,a,o],`float32`)}},KB;(function(e){e.Prod=`*`,e.Sum=`+`})(KB||(KB={}));var qB=class{constructor(e,t,n,r){this.op=e,this.outputShape=t,this.variableNames=[`x`],this.customUniforms=[{name:`index`,type:`float`}];let i=this.outputShape.length,a=this.op===KB.Prod?`1.0`:`0.0`,o=n?a:`getX(${JB(i,`coords`,this.op)})`,s=this.outputShape[this.outputShape.length-1],c=``,l=``;n?(c=r?`end != ${s-1}`:`end != 0`,l=r?`end + 1`:`end - 1`):(c=r?`end + pow2 < ${s}`:`end >= pow2`,l=r?`end + pow2`:`end - pow2`),this.userCode=`
      void main() {
        ${EF(i)} coords = getOutputCoords();
        int end = ${YB(i,`coords`,this.op)};
        float val = ${o};
        int pow2 = int(pow(2.0, index));
        if (${c}) {
          int idx = ${l};
          ${YB(i,`coords`,this.op)} = idx;
          val ${this.op}= getX(${JB(i,`coords`,this.op)});
        }
        setOutput(val);
      }
    `}};function JB(e,t,n){if(e===1)return`${t}`;if(e===2)return`${t}.x, ${t}.y`;if(e===3)return`${t}.x, ${t}.y, ${t}.z`;if(e===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${n} for rank ${e} is not yet supported`)}function YB(e,t,n){if(e===1)return`${t}`;if(e===2)return`${t}.y`;if(e===3)return`${t}.z`;if(e===4)return`${t}.w`;throw Error(`Cumulative ${n} for rank ${e} is not yet supported`)}function XB(e,t,n,r,i,a){let o=t.shape.length,s=ll([r],o),c=t;s!=null&&(c=MR({inputs:{x:t},backend:n,attrs:{perm:s}}));let l=dl(1,o)[0];if(l!==o-1)throw Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${r}`);let u=c.shape[l],d=ZL({inputs:{x:c},backend:n});for(let t=0;t<=Math.ceil(Math.log2(u))-1;t++){let r=new qB(e,c.shape,!1,a),i=[[t]],o=d;d=n.runWebGLProgram(r,[d],d.dtype,i),n.disposeIntermediateTensorInfo(o)}if(i){let t=new qB(e,c.shape,i,a),r=d;d=n.runWebGLProgram(t,[d],d.dtype),n.disposeIntermediateTensorInfo(r)}if(s!=null){let e=ul(s),t=MR({inputs:{x:d},backend:n,attrs:{perm:e}});return n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(c),t}return d}function ZB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;return XB(KB.Prod,i,n,a,o,s)}var QB={kernelName:xt,backendName:`webgl`,kernelFunc:ZB};function $B(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;return XB(KB.Sum,i,n,a,o,s)}var eV={kernelName:St,backendName:`webgl`,kernelFunc:$B};function tV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o,binaryOutput:s}=r;if(i.shape.length===1){let e=mI(n.readSync(i.dataId),n.readSync(a.dataId),a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,e)}else if(i.shape.length===2){let e=hI(n.bufferSync(i),n.bufferSync(a),o,s);return n.makeTensorInfo(e.shape,a.dtype,e.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${i.shape.length}.`)}var nV={kernelName:wt,backendName:`webgl`,kernelFunc:tV},rV=class{constructor(e,t,n){this.variableNames=[`x`],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=n,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${t};
      int offset_h = imod(h, ${t});
      int in_w = w / ${t};
      int offset_w = imod(w, ${t});
      int offset_d = (offset_h * ${t} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return this.dataFormat===`NHWC`?`coords[1]`:`coords[2]`}getWidthCoordString(){return this.dataFormat===`NHWC`?`coords[2]`:`coords[3]`}getDepthCoordString(){return this.dataFormat===`NHWC`?`coords[3]`:`coords[1]`}getOutputDepthSize(){return this.dataFormat===`NHWC`?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat===`NHWC`?`getX(b, in_h, in_w, in_d)`:`getX(b, in_d, in_h, in_w)`}};function iV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockSize:a,dataFormat:o}=r,s=i.shape[0],c=o===`NHWC`?i.shape[1]:i.shape[2],l=o===`NHWC`?i.shape[2]:i.shape[3],u=o===`NHWC`?i.shape[3]:i.shape[1],d=c*a,f=l*a,p=u/(a*a),m=new rV(o===`NHWC`?[s,d,f,p]:[s,p,d,f],a,o);return n.runWebGLProgram(m,[i],i.dtype)}var aV={kernelName:Tt,backendName:`webgl`,kernelFunc:iV},oV=class{constructor(e,t=!1,n=null,r=!1,i=!1){this.variableNames=[`x`,`W`],this.customUniforms=[{name:`pads`,type:`ivec2`},{name:`strides`,type:`ivec2`},{name:`dilations`,type:`ivec2`},{name:`inDims`,type:`ivec2`}],this.outputShape=e.outShape,this.enableShapeUniforms=FF(this.outputShape.length);let a=e.filterHeight,o=e.filterWidth,s=e.outChannels/e.inChannels,c=``,l=``;n&&(c=r?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${n}
        }`:i?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${n}
        }`:`
          float activation(float x) {
            ${n}
          }
        `,l=`result = activation(result);`);let u=t?`result += getBiasAtOutCoords();`:``;t&&this.variableNames.push(`bias`),r&&this.variableNames.push(`preluActivationWeights`),i&&this.variableNames.push(`leakyreluAlpha`),this.userCode=`
      ${c}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${s};
        int q = d2 - d1 * ${s};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${a}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${o}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${u}
        ${l}
        setOutput(result);
      }
    `}},sV=class{constructor(e,t=!1,n=null,r=!1,i=!1){this.variableNames=[`x`,`W`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`pads`,type:`ivec2`},{name:`strides`,type:`ivec2`},{name:`dilations`,type:`ivec2`},{name:`inDims`,type:`ivec2`}],this.outputShape=e.outShape,this.enableShapeUniforms=FF(this.outputShape.length);let a=e.outChannels/e.inChannels,o=e.padInfo.left,s=e.strideWidth,c=e.dilationWidth,l=e.filterHeight,u=e.filterWidth,d=u,f=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<u;e++)f+=`
          vec4 xTexelC${e*2};
          int xTexelC${e*2}Ready;
          vec4 xTexelC${e*2+1};
          int xTexelC${e*2+1}Ready;
          vec4 xC${e};`;f+=`
    for (int r = 0; r < ${l}; r++) {
      `;for(let e=0;e<u;e++)f+=`
          xTexelC${e*2} = vec4(0.0);
          xTexelC${e*2}Ready = 0;
          xTexelC${e*2+1} = vec4(0.0);
          xTexelC${e*2+1}Ready = 0;
          xC${e} = vec4(0.0);`;f+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let e=0;e<(d+1)/2;e++){let t=e*2;if(f+=`
          xC = xCCorner + ${t*c};
          `,s===1){if(t<u&&(o%2==1?(f+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }
              `,c===1&&t>0?f+=`
                xC${t} = vec4(xTexelC${t-2}.zw, xTexelC${t}.xy);
                `:f+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${t} = vec4(previous.zw, xTexelC${t}.xy);
                  } else {
                    xC${t} = vec4(0.0, 0.0, xTexelC${t}.xy);
                  }
                  `):f+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xC${t} = xTexelC${t};
                `,t+1<u)){let e=o%2==0?T(c):c;c%2==0&&o%2==1||c%2!=0&&o%2!=1?(f+=`
                  xCOffset = xC + imod(pads[1], 2) + ${e};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                    xTexelC${t+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${t+1}.zw = vec2(0.0);
                    }
                    xTexelC${t+1}Ready = 1;
                  }
                  `,c>1?f+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${t+1} = vec4(previous.zw, xTexelC${t+1}.xy);
                    } else {
                     xC${t+1} = vec4(0.0, 0.0, xTexelC${t+1}.xy);
                    }
                    `:f+=`
                    xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.xy);
                    `):e===1?f+=`
                    xC${t+1} = xTexelC${t};
                    `:f+=`
                    xCOffset = xC + ${e};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                      xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${t+1}.zw = vec2(0.0);
                      }
                      xTexelC${t+1}Ready = 1;
                    }

                    xC${t+1} = xTexelC${t+1};
                    `}}else t<u&&(o%2==1?(f+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.0);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
              `,t+1<u&&(f+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${t+1} = vec4(xTexelC${t+1}.xy, final.xy);
                `)):(f+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(
                  xTexelC${t}.xy, xTexelC${t+1}.xy);
              `,t+1<u&&(f+=`
                  xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
                `)));t<u&&(f+=`
            wTexel = getW(r, ${t}, d1, q);
            dotProd += xC${t} * vec4(wTexel.xz, wTexel.xz);
          `,t+1<u&&(f+=`
              wTexel = getW(r, ${t+1}, d1, q);
              dotProd += xC${t+1} * vec4(wTexel.xz, wTexel.xz);
            `))}f+=`
    }
  `,f+=`
      }
    `;let p=``,m=``;n&&(p=r?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${n}
        }`:i?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${n}
        }`:`vec4 activation(vec4 x) {
          ${n}
        }`,m=`result = activation(result);`);let h=t?`result += getBiasAtOutCoords();`:``;t&&this.variableNames.push(`bias`),r&&this.variableNames.push(`preluActivationWeights`),i&&this.variableNames.push(`leakyreluAlpha`),this.userCode=`
      ${p}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${a};
        int q = d2 - d1 * ${a};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${f}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${h}
        ${m}
        setOutput(result);
      }
    `}};function cV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c,dimRoundingMode:l}=r,u=c;u==null&&(u=[1,1]),O(_s(o,u),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${o} and dilations '${u}'`);let d=as(i.shape,a.shape,o,u,s,l,!0),f;f=N().getBool(`WEBGL_PACK_DEPTHWISECONV`)&&d.strideWidth<=2&&d.outChannels/d.inChannels===1?new sV(d):new oV(d);let p=[[d.padInfo.top,d.padInfo.left],[d.strideHeight,d.strideWidth],[d.dilationHeight,d.dilationWidth],[d.inHeight,d.inWidth]];return n.runWebGLProgram(f,[i,a],`float32`,p)}var lV={kernelName:Et,backendName:`webgl`,kernelFunc:cV},uV=class{constructor(e){this.variableNames=[`x`,`dy`],this.outputShape=e.filterShape;let t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,i=e.padInfo.left,a=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${a} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${r};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${n} - ${i};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}},dV=class{constructor(e){this.variableNames=[`dy`,`W`],this.outputShape=e.inShape;let t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,i=e.strideWidth,a=t-1-e.padInfo.top,o=n-1-e.padInfo.left,s=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${r}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${n}; wC++) {
            float dyC = float(dyCCorner + wC) / ${i}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${n} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${s}; dm++) {
              int d2 = d1 * ${s} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function fV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,filterShape:u}=r,d=new uV(as(i.shape,u,o,s,c,l,!0));return n.runWebGLProgram(d,[i,a],`float32`)}var pV={kernelName:Dt,backendName:`webgl`,kernelFunc:fV};function mV(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,inputShape:u}=r,d=new dV(as(u,a.shape,o,s,c,l,!0));return n.runWebGLProgram(d,[i,a],`float32`)}var hV={kernelName:Ot,backendName:`webgl`,kernelFunc:mV},gV=class{constructor(e){this.variableNames=[`X`],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}};function _V(e){let{inputs:t,backend:n}=e,{x:r}=t,i=[...r.shape,...r.shape],a=k(r.shape),o=$({inputs:{x:r},backend:n,attrs:{shape:[a]}}),s=new gV(a),c=n.runWebGLProgram(s,[o],o.dtype),l=$({inputs:{x:c},backend:n,attrs:{shape:i}});return n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(c),l}var vV={kernelName:kt,backendName:`webgl`,kernelFunc:_V},yV=class{constructor(e){this.variableNames=[`x`,`W`],this.outputShape=e.outShape;let{inHeight:t,inWidth:n,padInfo:r,strideHeight:i,strideWidth:a,filterHeight:o,filterWidth:s,dilationHeight:c,dilationWidth:l}=e,{top:u,left:d}=r;this.userCode=`
      const ivec2 strides = ivec2(${i}, ${a});
      const ivec2 pads = ivec2(${u}, ${d});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${o}; h++) {
          int hIn = hBeg + h * ${c};

          if (hIn >= 0 && hIn < ${t}) {
            for (int w = 0; w < ${s}; w++) {
              int wIn = wBeg + w * ${l};

              if (wIn >= 0 && wIn < ${n}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}};function bV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r,l=ns(i.shape,a.shape,o,s,`NHWC`,c),u,d=new yV(l);u=n.runWebGLProgram(d,[i,a],`float32`);let f=$({inputs:{x:u},backend:n,attrs:{shape:l.outShape}});return n.disposeIntermediateTensorInfo(u),f}var xV={kernelName:At,backendName:`webgl`,kernelFunc:bV};function SV(e){let{inputs:t,backend:n,attrs:r}=e,{equation:i}=r,a=t,{allDims:o,summedDims:s,idDims:c}=Nh(i,a.length);Fh(o.length,c,a);let{path:l,steps:u}=Ih(s,c),d=u.length,f=null,p=o.length,m=[];for(let e=0;e<d;++e){for(let t of u[e]){let{permutationIndices:e,expandDims:r}=Ph(p,c[t]),i;Lh(e)?i=a[t]:(i=MR({inputs:{x:a[t]},backend:n,attrs:{perm:e}}),m.push(i));let o=i.shape.slice();for(let e=0;e<r.length;++e)o.splice(r[e],0,1);A(i.shape,o)||(i=$({inputs:{x:i},backend:n,attrs:{shape:o}}),m.push(i)),f===null?f=i:(f=_R({inputs:{a:i,b:f},backend:n}),m.push(f))}e<d-1&&(l[e]>=0&&(f=AR({inputs:{x:f},backend:n,attrs:{axis:l[e]-(o.length-p),keepDims:!1}}),m.push(f)),p--)}for(let e of m)e!==f&&n.disposeIntermediateTensorInfo(e);return f}var CV={kernelName:Ft,backendName:`webgl`,kernelFunc:SV},wV={kernelName:`Elu`,backendName:`webgl`,kernelFunc:uR({opSnippet:`return (x >= 0.0) ? x : (exp(x) - 1.0);`,packedOpSnippet:`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`})},TV=`return (b >= 0.0) ? a : a * (b + 1.0);`,EV=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,DV={kernelName:It,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n}=e,{dy:r,y:i}=t,a=N().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)?new XL(EV,r.shape,i.shape):new JL(TV,r.shape,i.shape);return n.runWebGLProgram(a,[r,i],r.dtype)}},OV={kernelName:Lt,backendName:`webgl`,kernelFunc:dR({opSnippet:`return float(a == b);`,packedOpSnippet:`
  return vec4(equal(a, b));
`,dtype:`bool`,cpuKernelImpl:bI})},kV={kernelName:`Erf`,backendName:`webgl`,kernelFunc:uR({opSnippet:`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${hh};
  float a1 = ${gh};
  float a2 = ${_h};
  float a3 = ${vh};
  float a4 = ${yh};
  float a5 = ${bh};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`})},AV=uR({opSnippet:lR+`
  return exp(x);
`,packedOpSnippet:`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:xI,dtype:`float32`}),jV={kernelName:`Exp`,backendName:`webgl`,kernelFunc:AV};function MV(e){let{inputs:t,attrs:n,backend:r}=e,{dim:i}=n,{input:a}=t,o=a.shape.length,s=a.shape.slice(),c=i;return i<0&&(O(-(o+1)<=i,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),c=o+i+1),s.splice(c,0,1),$({inputs:{x:a},backend:r,attrs:{shape:s}})}var NV={kernelName:Rt,backendName:`webgl`,kernelFunc:MV},PV=`return exp(x) - 1.0;`,FV={kernelName:zt,backendName:`webgl`,kernelFunc:uR({opSnippet:PV,packedOpSnippet:PV,cpuKernelImpl:SI})},IV=class{constructor(e,t,n){this.variableNames=[`real`,`imag`];let r=t[1];this.outputShape=t;let i=n?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,a=n?`${r}.0`:`1.0`,o;if(e===`real`)o=`return real * expR - imag * expI;`;else if(e===`imag`)o=`return real * expI + imag * expR;`;else throw Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
      const float exponentMultiplier = ${i};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${o}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${r});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${r}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${a};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}};function LV(e,t,n){let r=n.texData.get(e.dataId),i=k(e.shape),a=e.shape[e.shape.length-1],o=i/a,s=$({inputs:{x:e},backend:n,attrs:{shape:[o,a]}}),c=s.shape,l=new IV(`real`,c,t),u=new IV(`imag`,c,t),d=[{dataId:r.complexTensorInfos.real.dataId,dtype:r.complexTensorInfos.real.dtype,shape:c},{dataId:r.complexTensorInfos.imag.dataId,dtype:r.complexTensorInfos.imag.dtype,shape:c}],f=n.runWebGLProgram(l,d,`float32`),p=n.runWebGLProgram(u,d,`float32`),m=$L({inputs:{real:f,imag:p},backend:n});n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p);let h=$({inputs:{x:m},backend:n,attrs:{shape:e.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(m),h}function RV(e){let{inputs:t,backend:n}=e,{input:r}=t;return LV(r,!1,n)}var zV={kernelName:`FFT`,backendName:`webgl`,kernelFunc:RV},BV=class{constructor(e,t){this.outputShape=[],this.customUniforms=[{name:`value`,type:`float`}],this.variableNames=[`x`],this.outputShape=e,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}};function VV(e){let{backend:t,attrs:n}=e,{shape:r,value:i}=n,{dtype:a}=n;if(a=a||ve(i),a===`string`){let e=le(a,k(r));return e.fill(i),t.makeTensorInfo(r,a,e)}else{let e=new BV(r,i),n=[[i]];return t.runWebGLProgram(e,[],a,n)}}var HV={kernelName:Bt,backendName:`webgl`,kernelFunc:VV},UV=class{constructor(e){this.variableNames=[`Image`],this.outputShape=[];let t=e[2];this.outputShape=e,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${t} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${t}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}},WV={kernelName:Vt,backendName:`webgl`,kernelFunc:({inputs:e,backend:t})=>{let{image:n}=e,r=t,i=new UV(n.shape);return r.runWebGLProgram(i,[n],n.dtype)}},GV=`return floor(x);`,KV={kernelName:Ht,backendName:`webgl`,kernelFunc:uR({opSnippet:GV,packedOpSnippet:GV,cpuKernelImpl:CI})},qV={kernelName:Ut,backendName:`webgl`,kernelFunc:dR({opSnippet:`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,packedOpSnippet:`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,dtype:`int32`})},JV=class{constructor(e){this.variableNames=[`A`];let t=AP(),[n,r]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}.0, ${n}.0);

        vec4 values = ${t.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}},YV=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!1,this.packedOutput=!0;let t=AP(),[n,r]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${r}.0, ${n}.0);
            vec4 values = ${t.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${t.output} = result;
      }
    `}},XV={kernelName:jr,backendName:`webgl`,kernelFunc:$V},ZV,QV=N().getBool(`CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU`);function $V(e){let{inputs:t,backend:n,attrs:r}=e,{pixels:i}=t,{numChannels:a}=r,o=typeof HTMLVideoElement<`u`&&i instanceof HTMLVideoElement,s=typeof HTMLImageElement<`u`&&i instanceof HTMLImageElement,[c,l]=o?[i.videoWidth,i.videoHeight]:[i.width,i.height],u=[l,c],d=[l,c,a];if(s||o){let e=N().getBool(`CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU`);(ZV==null||e!==QV)&&(QV=e,ZV=document.createElement(`canvas`).getContext(`2d`,{willReadFrequently:QV})),ZV.canvas.width=c,ZV.canvas.height=l,ZV.drawImage(i,0,0,c,l),i=ZV.canvas}let f=n.makeTensorInfo(u,`int32`);n.texData.get(f.dataId).usage=ON.PIXELS,n.gpgpu.uploadPixelDataToTexture(n.getTexture(f.dataId),i);let p=N().getBool(`WEBGL_PACK`)?new YV(d):new JV(d),m=n.runWebGLProgram(p,[f],`int32`);return n.disposeData(f.dataId),m}function eH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=r,h=ys(u),g=as(i.shape,a.shape,c,d,l,f,!1,h),_,v=[],y=o!=null,b=s!=null,x=p===`leakyrelu`,S=()=>{let e=[i,a],t=(e,t)=>{if(t===`NCHW`&&e.shape.length===1&&e.shape[0]!==1){let t=$({inputs:{x:e},backend:n,attrs:{shape:[e.shape[0],1,1]}});return v.push(t),t}return e};if(y&&e.push(t(o,u)),b&&e.push(t(s,u)),x){let t=n.makeTensorInfo([],`float32`,di(m,`float32`));e.push(t),v.push(t)}return e};if(g.filterHeight===1&&g.filterWidth===1&&g.dilationHeight===1&&g.dilationWidth===1&&g.strideHeight===1&&g.strideWidth===1&&(g.padInfo.type===`SAME`||g.padInfo.type===`VALID`))_=CB({x:i,filter:a,convInfo:g,backend:n,bias:o,activation:p,preluActivationWeights:s,leakyreluAlpha:m});else if(g.strideWidth<=2&&h===`channelsLast`&&N().getBool(`WEBGL_EXP_CONV`)){let e=new bB(g,y,p?fR(p,!0):null,b,x),t=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],r=S();_=n.runWebGLProgram(e,r,`float32`,t)}else if(N().getBool(`WEBGL_CONV_IM2COL`))_=wB({x:i,filter:a,convInfo:g,backend:n,bias:o,activation:p,preluActivationWeights:s,leakyreluAlpha:m});else{let e=new vB(g,y,p?fR(p,!1):null,b,x),t=S();_=n.runWebGLProgram(e,t,`float32`)}let C=$({inputs:{x:_},backend:n,attrs:{shape:g.outShape}});return v.push(_),v.forEach(e=>n.disposeIntermediateTensorInfo(e)),C}var tH={kernelName:Pr,backendName:`webgl`,kernelFunc:eH};function nH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dilations:u,dimRoundingMode:d,activation:f,leakyreluAlpha:p}=r,m=[],h=u;h==null&&(h=[1,1]),O(_s(c,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${c} and dilations '${h}'`);let g=as(i.shape,a.shape,c,h,l,d,!0),_=N().getBool(`WEBGL_PACK_DEPTHWISECONV`)&&g.strideWidth<=2&&g.outChannels/g.inChannels===1,v=f?fR(f,_):null,y=[i,a],b=o!=null,x=s!=null,S=f===`leakyrelu`;if(b&&y.push(o),x&&y.push(s),S){let e=n.makeTensorInfo([],`float32`,di(p,`float32`));y.push(e),m.push(e)}let C;C=_?new sV(g,b,v,x,S):new oV(g,b,v,x,S);let w=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],T=n.runWebGLProgram(C,y,`float32`,w);return m.forEach(e=>n.disposeIntermediateTensorInfo(e)),T}var rH={kernelName:Fr,backendName:`webgl`,kernelFunc:nH},iH=class{constructor(e,t,n,r){this.sliceDim=e,this.strides=t,this.paramsShape=r,this.variableNames=[`x`,`indices`],this.outputShape=n;let i=EF(n.length),a=`
    int index;`;for(let e=0;e<this.sliceDim;e++)a+=`
          index = round(getIndices(coords[0], ${e}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[e]};
          flattenIndex += index * ${this.strides[e]};`;this.userCode=`
         void main() {
          ${i} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${a}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}};function aH(e){let{inputs:t,backend:n}=e,{params:r,indices:i}=t,a=i.shape,o=a[a.length-1],s=k(r.shape),[c,l,u,d]=Om(r,i),f=$({inputs:{x:i},backend:n,attrs:{shape:[l,o]}}),p=$({inputs:{x:r},backend:n,attrs:{shape:[k(r.shape)/u,u]}});if(n.shouldExecuteOnCPU([r,i])||r.dtype===`string`){let e=wI(n.readSync(i.dataId),n.bufferSync(r),r.dtype,l,o,u,d,r.shape,s);return n.makeTensorInfo(c,r.dtype,e.values)}let m=new iH(o,d,[l,u],r.shape),h=n.runWebGLProgram(m,[p,f],p.dtype),g=$({inputs:{x:h},backend:n,attrs:{shape:c}});return n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(h),g}var oH={kernelName:Kt,backendName:`webgl`,kernelFunc:aH},sH=class{constructor(e,t){this.variableNames=[`A`,`indices`],this.outputShape=t,this.rank=t.length;let n=EF(this.rank),r=cH(e,2);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${r}));
      }
    `}};function cH(e,t){let n=[`resRC.x`,`resRC.y`,`resRC.z`,`resRC.w`],r=[];for(let t=0;t<e.length;t++)t===2?r.push(`index`):r.push(`${n[t]}`);return r.join()}function lH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,indices:a}=t,{axis:o,batchDims:s}=r,c=j(o,i.shape)[0];if(N().get(`DEBUG`)){let e=n.readSync(a.dataId),t=i.shape[c];for(let n=0;n<e.length;++n){let r=e[n];O(r<=t-1&&r>=0,()=>`GatherV2: the index value ${r} is not in [0, ${t-1}]`)}}let l=tg(i,a,c,s),u=k(a.shape),d=[],f=$({inputs:{x:i},backend:n,attrs:{shape:[l.batchSize,l.outerSize,l.dimSize,l.sliceSize]}}),p=$({inputs:{x:a},backend:n,attrs:{shape:[l.batchSize,u/l.batchSize]}});d.push(f),d.push(p);let m=[l.batchSize,l.outerSize,u/l.batchSize,l.sliceSize];if(n.shouldExecuteOnCPU([i,a])||i.dtype===`string`){let e=n.bufferSync(p),t=TI(n.bufferSync(f),e,m);return d.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(l.outputShape,t.dtype,t.values)}let h=new sH(f.shape,m),g=n.runWebGLProgram(h,[f,p],f.dtype);d.push(g);let _=$({inputs:{x:g},backend:n,attrs:{shape:l.outputShape}});return d.forEach(e=>n.disposeIntermediateTensorInfo(e)),_}var uH={kernelName:Gt,backendName:`webgl`,kernelFunc:lH},dH={kernelName:qt,backendName:`webgl`,kernelFunc:dR({opSnippet:`return float(a > b);`,packedOpSnippet:`
  return vec4(greaterThan(a, b));
`,cpuKernelImpl:EI,dtype:`bool`})},fH={kernelName:Jt,backendName:`webgl`,kernelFunc:dR({opSnippet:`return float(a >= b);`,packedOpSnippet:`
  return vec4(greaterThanEqual(a, b));
`,dtype:`bool`,cpuKernelImpl:DI})};function pH(e){let{inputs:t,backend:n}=e,{input:r}=t;return LV(r,!0,n)}var mH={kernelName:Xt,backendName:`webgl`,kernelFunc:pH},hH={kernelName:Qt,backendName:`webgl`,kernelFunc:uR({opSnippet:`return float(!isnan(x) && !isinf(x));`,dtype:`bool`})},gH={kernelName:$t,backendName:`webgl`,kernelFunc:uR({opSnippet:`return float(isinf(x));`,dtype:`bool`})},_H={kernelName:en,backendName:`webgl`,kernelFunc:uR({opSnippet:`return float(isnan(x));`,dtype:`bool`})},vH={kernelName:nn,backendName:`webgl`,kernelFunc:dR({opSnippet:`return float(a < b);`,packedOpSnippet:`
  return vec4(lessThan(a, b));
`,cpuKernelImpl:OI,dtype:`bool`})},yH={kernelName:rn,backendName:`webgl`,kernelFunc:dR({opSnippet:`return float(a <= b);`,packedOpSnippet:`
  return vec4(lessThanEqual(a, b));
`,cpuKernelImpl:kI,dtype:`bool`})};function bH(e){let{backend:t,attrs:n}=e,{start:r,stop:i,num:a}=n,o=AI(r,i,a);return t.makeTensorInfo([o.length],`float32`,o)}var xH={kernelName:an,backendName:`webgl`,kernelFunc:bH},SH={kernelName:`Log`,backendName:`webgl`,kernelFunc:uR({opSnippet:lR+`
  return x < 0.0 ? 0./0. : log(x);
`,packedOpSnippet:`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,cpuKernelImpl:jI})},CH={kernelName:on,backendName:`webgl`,kernelFunc:uR({opSnippet:lR+`
  return log(1.0 + x);
`})},wH={kernelName:sn,backendName:`webgl`,kernelFunc:dR({opSnippet:`return float(a >= 1.0 && b >= 1.0);`,packedOpSnippet:`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,dtype:`bool`})},TH={kernelName:cn,backendName:`webgl`,kernelFunc:uR({opSnippet:`return float(!(x >= 1.0));`})},EH={kernelName:ln,backendName:`webgl`,kernelFunc:dR({opSnippet:`return float(a >= 1.0 || b >= 1.0);`,packedOpSnippet:`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,dtype:`bool`})},DH=class{constructor(e,t,n,r,i){this.variableNames=[`x`],this.outputShape=[];let a=t,o=e[3]-1;this.outputShape=e;let s,c=`float(${n}) + float(${r}) * sum`;s=i===.5?`inversesqrt(${c})`:i===1?`1.0/(${c})`:`exp(log(${c}) * float(-${i}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${a}; j <= ${a}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${o}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${s};
        setOutput(val);
      }
    `}},OH=class{constructor(e,t,n,r,i){this.variableNames=[`x`],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let a=t,o=e[3]-1;this.outputShape=e;let s,c=`float(${n}) + float(${r}) * sum`;s=i===.5?`inversesqrt(${c})`:i===1?`1.0/(${c})`:`exp(log(${c}) * float(-${i}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${a};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${a}; j <= ${a}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${o}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${s};
        setOutput(result);
      }
    `}},kH={kernelName:`LRN`,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{depthRadius:a,bias:o,alpha:s,beta:c}=r,l=N().getBool(`WEBGL_PACK_NORMALIZATION`)?new OH(i.shape,a,o,s,c):new DH(i.shape,a,o,s,c);return n.runWebGLProgram(l,[i],i.dtype)}},AH=class{constructor(e,t,n,r,i){this.variableNames=[`inputImage`,`outputImage`,`dy`],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=n,this.alpha=r,this.beta=i,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${t})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${t} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${r}) * norm + float(${n});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${r})
                * float(${i})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${i});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}},jH={kernelName:dn,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i,y:a,dy:o}=t,{depthRadius:s,bias:c,alpha:l,beta:u}=r,d=new AH(i.shape,s,c,l,u);return n.runWebGLProgram(d,[i,a,o],i.dtype)}};function MH(e,t,n,r){let i=k(t),a=k(e.shape)/i,o=$({inputs:{x:e},attrs:{shape:[a,i]},backend:r}),s=wR(o,e.dtype,`max`,r),c=$({inputs:{x:s},attrs:{shape:n},backend:r});return r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(s),c}function NH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reductionIndices:a,keepDims:o}=r,s=i.shape.length,c=j(a,i.shape),l=c,u=ll(l,s),d=u!=null,f=n.shouldExecuteOnCPU([i]),p=i;if(d){if(f){let e=n.texData.get(p.dataId).values,t=Array(s);for(let e=0;e<t.length;e++)t[e]=i.shape[u[e]];let r=oL(e,i.shape,i.dtype,u,t);p=n.makeTensorInfo(t,i.dtype);let a=n.texData.get(p.dataId);a.values=r}else p=OR(i,u,n);l=dl(l.length,s)}cl(`max`,l,s);let[m,h]=ol(p.shape,l),g=m;o&&(g=sl(m,c));let _;if(f){let e=n.texData.get(p.dataId).values,t=MI(e,k(h),g,i.dtype);_=n.makeTensorInfo(g,i.dtype);let r=n.texData.get(_.dataId);r.values=t}else _=MH(p,h,g,n);return d&&n.disposeIntermediateTensorInfo(p),_}var PH={kernelName:`Max`,backendName:`webgl`,kernelFunc:NH},FH={kernelName:fn,backendName:`webgl`,kernelFunc:dR({opSnippet:qL+`
  return max(a, b);
`,packedOpSnippet:`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+YL+`
  return result;
`,cpuKernelImpl:NI})};function IH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;kP(i,`maxPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;O(_s(o,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=rs(i.shape,a,o,1,s,c);if(l.filterWidth===1&&l.filterHeight===1&&A(l.inShape,l.outShape))return ZL({inputs:{x:i},backend:n});let u=new fz(l,`max`,!1);return n.runWebGLProgram(u,[i],i.dtype)}var LH={kernelName:pn,backendName:`webgl`,kernelFunc:IH};function RH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dataFormat:c,dimRoundingMode:l}=r,u=new pz(is(i.shape,a,o,[1,1,1],s,l,c),`max`,!1);return n.runWebGLProgram(u,[i],i.dtype)}var zH={kernelName:hn,backendName:`webgl`,kernelFunc:RH},BH=class{constructor(e){this.variableNames=[`dy`,`maxPos`],this.outputShape=e.inShape;let t=e.strideHeight,n=e.strideWidth,r=e.dilationHeight,i=e.effectiveFilterHeight,a=e.effectiveFilterWidth,o=i-1-e.padInfo.top,s=a-1-e.padInfo.left,c=i*a-1;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${i};
          wR += ${r}) {
          float dyR = float(dyRCorner + wR) / ${t}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${a}; wC++) {
            float dyC = float(dyCCorner + wC) / ${n}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${c} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${a} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}},VH=class{constructor(e){this.variableNames=[`dy`,`maxPos`],this.outputShape=e.inShape;let t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,i=e.dilationDepth,a=e.dilationHeight,o=e.dilationWidth,s=e.effectiveFilterDepth,c=e.effectiveFilterHeight,l=e.effectiveFilterWidth,u=s-1-e.padInfo.front,d=c-1-e.padInfo.top,f=l-1-e.padInfo.left,p=s*c*l-1;this.userCode=`
      const ivec3 pads = ivec3(${u}, ${d}, ${f});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${s};
           wD += ${i}) {
          float dyD = float(dyDCorner + wD) / ${t}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${c};
              wR += ${a}) {
            float dyR = float(dyRCorner + wR) / ${n}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${l};
                wC += ${o}) {
              float dyC = float(dyCCorner + wC) / ${r}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${p} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${c} * ${l} +
                  wR * ${l} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function HH(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a,{filterSize:s,strides:c,pad:l,dimRoundingMode:u}=r,d=is(o.shape,s,c,[1,1,1],l,u),f=new pz(d,`max`,!0),p=n.runWebGLProgram(f,[o],o.dtype),m=new VH(d),h=n.runWebGLProgram(m,[i,p],o.dtype);return n.disposeIntermediateTensorInfo(p),h}var UH={kernelName:gn,backendName:`webgl`,kernelFunc:HH};function WH(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a,output:o}=t,s=a;kP([a,o],`maxPoolGrad`);let{filterSize:c,strides:l,pad:u,dimRoundingMode:d}=r,f=rs(s.shape,c,l,1,u,d),p=new fz(f,`max`,!0),m=n.runWebGLProgram(p,[s],s.dtype),h=new BH(f),g=n.runWebGLProgram(h,[i,m],s.dtype);return n.disposeIntermediateTensorInfo(m),g}var GH={kernelName:mn,backendName:`webgl`,kernelFunc:WH};function KH(e,t,n,r){let i=new fz(n,`max`,!1),a=r.runWebGLProgram(i,[e],`float32`);return i=new fz(n,`max`,!0,!0,t),[a,r.runWebGLProgram(i,[e],`float32`)]}var qH={kernelName:_n,backendName:`webgl`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{x:r}=e,{filterSize:i,strides:a,pad:o,includeBatchInIndex:s}=t,c=n;O(r.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${r.shape.length}.`);let l=[1,1];O(_s(a,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let[u,d]=KH(r,s,rs(r.shape,i,a,l,o),c);return[u,d]}};function JH(e,t,n,r){let i=k(t),a=k(e.shape)/i,o=$({inputs:{x:e},attrs:{shape:[a,i]},backend:r}),s=wR(o,`float32`,`mean`,r),c=$({inputs:{x:s},attrs:{shape:n},backend:r});return r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(s),c}var YH={kernelName:vn,backendName:`webgl`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{x:r}=e,{keepDims:i,axis:a}=t,o=n,s=r.shape.length,c=j(a,r.shape),l=c,u=ll(l,s),d=u!=null,f=o.shouldExecuteOnCPU([r]),p=[],m=r;if(d){if(f){let e=o.texData.get(m.dataId).values,t=Array(s);for(let e=0;e<t.length;e++)t[e]=r.shape[u[e]];let n=oL(e,r.shape,r.dtype,u,t);m=o.makeTensorInfo(t,r.dtype);let i=o.texData.get(m.dataId);i.values=n}else m=OR(r,u,o);p.push(m),l=dl(l.length,s)}cl(`sum`,l,s);let[h,g]=ol(m.shape,l),_=h;i&&(_=sl(h,c));let v=JH(m,g,_,o);for(let e of p)o.disposeIntermediateTensorInfo(e);return v}};function XH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=i.shape.length,c=j(a,i.shape),l=c,u=ll(l,s),d=i;u!=null&&(d=MR({inputs:{x:i},backend:n,attrs:{perm:u}}),l=dl(l.length,i.shape.length)),cl(`min`,l,s);let[f,p]=ol(d.shape,l),m=k(p),h=$({inputs:{x:d},backend:n,attrs:{shape:[-1,m]}}),g=wR(h,h.dtype,`min`,n),_;if(o){let e=sl(f,c);_=$({inputs:{x:g},backend:n,attrs:{shape:e}})}else _=$({inputs:{x:g},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(g),u!=null&&n.disposeIntermediateTensorInfo(d),_}var ZH={kernelName:`Min`,backendName:`webgl`,kernelFunc:XH},QH={kernelName:yn,backendName:`webgl`,kernelFunc:dR({opSnippet:qL+`
  return min(a, b);
`,packedOpSnippet:`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+YL+`
  return result;
`,cpuKernelImpl:PI})},$H=class{constructor(e,t,n){this.variableNames=[`x`],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);let r=e.length,i=EF(r),a=t.map(e=>e[0]).join(`,`),o=t.map((t,n)=>t[0]+e[n]).join(`,`),s=[`coords[0]`,`coords[1]`,`coords[2]`,`coords[3]`].slice(0,r),c=n===`reflect`?0:1;if(r===1){this.userCode=`
        int start = ${a};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${c};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${c};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${i} start = ${i}(${a});
      ${i} end = ${i}(${o});

      void main() {
        ${i} outC = getOutputCoords();
        for (int i = 0; i < ${r}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${c};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${c};
          }
        }
        ${i} coords = outC - start;
        setOutput(getX(${s}));
      }
    `}},eU=class{constructor(e,t,n){this.variableNames=[`x`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);let r=e.length,i=EF(r),a=t.map(e=>e[0]).join(`,`),o=t.map((t,n)=>t[0]+e[n]).join(`,`),s=lL(`rc`,r),c=lL(`source`,r),l=`${s[r-1]} < ${this.outputShape[r-1]}`,u=r===1?`source`:`vec2(${c.slice(-2).join()})`,d=n===`reflect`?0:1,f=``;if(r===1){let e=`
        ${i} source = rc;
        if (source < start) {
          source = start * 2 - source - ${d};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${d};
        }
        source -= start;
      `;f=`
        ${i} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${c.join()}), ${u});
        ${s[r-1]} += 1;
        if(${l}) {
          ${e}
          result[1] = getChannel(getX(${c.join()}), ${u});
        }
      `}else{let e=`
        ${i} source = rc;
        ${i} lt = ${i}(lessThan(source, start));
        ${i} gte = ${i}(greaterThanEqual(source, end));
        ${i} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${d}) +
                gte * ((end - 1) * 2 - source + ${d});
        source -= start;
      `;f=`
        ${i} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${c.join()}), ${u});
        ${s[r-1]} += 1;
        if(${l}) {
          ${e}
          result[1] = getChannel(getX(${c.join()}), ${u});
        }
        rc = outputLoc;
        ${s[r-2]} += 1;
        if(${s[r-2]} < ${this.outputShape[r-2]}) {
          ${e}
          result[2] = getChannel(getX(${c.join()}), ${u});
          ${s[r-1]} += 1;
          if(${l}) {
            ${e}
            result[3] = getChannel(getX(${c.join()}), ${u});
          }
        }
      `}this.userCode=`
      const ${i} start = ${i}(${a});
      const ${i} end = ${i}(${o});

      void main() {
        ${i} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${f}
        setOutput(result);
      }
    `}},tU={kernelName:bn,backendName:`webgl`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r}=e,{paddings:i,mode:a}=n,o=N().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new eU(r.shape,i,a):new $H(r.shape,i,a);return t.runWebGLProgram(o,[r],r.dtype)}},nU={kernelName:`Mod`,backendName:`webgl`,kernelFunc:dR({opSnippet:`if (b == 0.0) return NAN;
  return mod(a, b);`,packedOpSnippet:`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+YL+`
  return result;
`})},rU=class{constructor(e,t,n){this.variableNames=[`probs`],this.customUniforms=[{name:`seed`,type:`float`}],this.outputShape=[e,n],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${t-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${t-1}));
      }
    `}},iU=dR({opSnippet:`
if (a == b) {
  return 1.0;
};
return a / b;`,packedOpSnippet:`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,checkOutOfBounds:!0}),aU={kernelName:Pt,backendName:`webgl`,kernelFunc:iU},oU=`return a - b;`,sU=dR({opSnippet:oU,packedOpSnippet:oU,supportsComplex:!0,cpuKernelImpl:rL}),cU={kernelName:`Sub`,backendName:`webgl`,kernelFunc:sU};function lU(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{dim:a}=r,o=j([a],i.shape),s=NH({inputs:{x:i},backend:n,attrs:{reductionIndices:o,keepDims:!1}}),c=sl(s.shape,o),l=$({inputs:{x:s},backend:n,attrs:{shape:c}}),u=sU({inputs:{a:i,b:l},backend:n}),d=AV({inputs:{x:u},backend:n}),f=AR({inputs:{x:d},backend:n,attrs:{axis:o,keepDims:!1}}),p=$({inputs:{x:f},backend:n,attrs:{shape:c}}),m=iU({inputs:{a:d,b:p},backend:n});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p),m}var uU={kernelName:cr,backendName:`webgl`,kernelFunc:lU};function dU(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{numSamples:a,seed:o,normalized:s}=r,c=s?i:lU({inputs:{logits:i},backend:n,attrs:{dim:i.shape.length-1}}),l=c.shape[0],u=c.shape[1],d=new rU(l,u,a),f=[[o]],p=n.runWebGLProgram(d,[c],`int32`,f);return s||n.disposeIntermediateTensorInfo(c),p}var fU={kernelName:xn,backendName:`webgl`,kernelFunc:dU},pU=SL+`
  return -x;
`,mU=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function hU(e){let{inputs:t,backend:n}=e,{x:r}=t;if(n.shouldExecuteOnCPU([r])){let[e,t]=II(n.texData.get(r.dataId).values,r.shape,r.dtype);return n.makeTensorInfo(t,r.dtype,e)}let i;return i=N().getBool(`WEBGL_PACK_UNARY_OPERATIONS`)?new FL(r.shape,mU):new xL(r.shape,pU),n.runWebGLProgram(i,[r],r.dtype)}var gU={kernelName:`Neg`,backendName:`webgl`,kernelFunc:hU},_U=Np;function vU(e){Ir(`tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead`);let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c}=r,{selectedIndices:l}=_U(n.readSync(i.dataId),n.readSync(a.dataId),o,s,c);return n.makeTensorInfo([l.length],`int32`,new Int32Array(l))}var yU={kernelName:wn,backendName:`webgl`,kernelFunc:vU},bU=Pp;function xU(e){Ir(`tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead`);let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,padToMaxOutputSize:l}=r,{selectedIndices:u,validOutputs:d}=bU(n.readSync(i.dataId),n.readSync(a.dataId),o,s,c,l);return[n.makeTensorInfo([u.length],`int32`,new Int32Array(u)),n.makeTensorInfo([],`int32`,new Int32Array([d]))]}var SU={kernelName:Tn,backendName:`webgl`,kernelFunc:xU},CU=Fp;function wU(e){Ir(`tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead`);let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,softNmsSigma:l}=r,{selectedIndices:u,selectedScores:d}=CU(n.readSync(i.dataId),n.readSync(a.dataId),o,s,c,l);return[n.makeTensorInfo([u.length],`int32`,new Int32Array(u)),n.makeTensorInfo([d.length],`float32`,new Float32Array(d))]}var TU={kernelName:En,backendName:`webgl`,kernelFunc:wU},EU=class{constructor(e,t,n,r){this.variableNames=[`indices`],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${r}), float(${n}),
                      float(index == coords.y)));
      }
    `}},DU={kernelName:On,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{indices:i}=t,{dtype:a,depth:o,onValue:s,offValue:c}=r,l=k(i.shape),u=new EU(l,o,s,c),d=$({inputs:{x:i},backend:n,attrs:{shape:[l]}}),f=n.runWebGLProgram(u,[d],a);n.disposeIntermediateTensorInfo(d);let p=[...i.shape,o],m=$({inputs:{x:f},backend:n,attrs:{shape:p}});return n.disposeIntermediateTensorInfo(f),m}};function OU(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`complex64`){let e=qz({inputs:{input:r},backend:n}),t=OU({inputs:{x:e},backend:n}),i=fB({inputs:{input:r},backend:n}),a=OU({inputs:{x:i},backend:n}),o=$L({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}else return VV({attrs:{shape:r.shape,dtype:r.dtype,value:r.dtype===`string`?``:0},backend:n})}var kU={kernelName:kr,backendName:`webgl`,kernelFunc:OU};function AU(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`string`)throw Error(`onesLike is not supported under string dtype`);if(r.dtype===`complex64`){let e=qz({inputs:{input:r},backend:n}),t=AU({inputs:{x:e},backend:n}),i=fB({inputs:{input:r},backend:n}),a=OU({inputs:{x:i},backend:n}),o=$L({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}else return VV({attrs:{shape:r.shape,dtype:r.dtype,value:1},backend:n})}var jU={kernelName:Dn,backendName:`webgl`,kernelFunc:AU};function MU(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r;if(t.length===1)return MV({inputs:{input:t[0]},backend:n,attrs:{dim:i}});let a=t[0].shape,o=t[0].dtype;t.forEach(e=>{ee(a,e.shape,`All tensors passed to stack must have matching shapes`),O(o===e.dtype,()=>`All tensors passed to stack must have matching dtypes`)});let s=[],c=gB({inputs:t.map(e=>{let t=MV({inputs:{input:e},backend:n,attrs:{dim:i}});return s.push(t),t}),backend:n,attrs:{axis:i}});return s.forEach(e=>n.disposeIntermediateTensorInfo(e)),c}var NU={kernelName:kn,backendName:`webgl`,kernelFunc:MU},PU=class{constructor(e,t,n){this.variableNames=[`x`],this.customUniforms=[{name:`value`,type:`float`}],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);let r=e.length,i=EF(r),a=t.map(e=>e[0]).join(`,`),o=t.map((t,n)=>t[0]+e[n]).join(`,`),s=[`coords[0]`,`coords[1]`,`coords[2]`,`coords[3]`].slice(0,r);if(r===1){this.userCode=`
        int start = ${a};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${i} start = ${i}(${a});
      ${i} end = ${i}(${o});

      void main() {
        ${i} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${i} coords = outC - start;
          setOutput(getX(${s}));
        }
      }
    `}},FU=class{constructor(e,t,n){this.variableNames=[`x`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`value`,type:`float`}],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);let r=e.length,i=EF(r),a=t.map(e=>e[0]).join(`,`),o=t.map((t,n)=>t[0]+e[n]).join(`,`),s=lL(`rc`,r),c=lL(`source`,r),l=`${s[r-1]} < ${this.outputShape[r-1]}`,u=r===1?`source`:`vec2(${c.slice(-2).join()})`,d=[`${i} rc = outputLoc;`,`${s[r-1]} += 1;
       if(${l}) {
      `,r===1?``:`}
       rc = outputLoc;
       ${s[r-2]} += 1;
       if(${s[r-2]} < ${this.outputShape[r-2]}) {`,r===1?``:`  ${s[r-1]} += 1;
         if(${l}) {`],f=r===1?`rc < start || rc >= end`:`any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))`,p=``;for(let e=0,t=r===1?2:4;e<t;e++)p+=`
        ${d[e]}
        if (${f}) {
          result[${e}] = float(value);
        } else {
          ${i} source = rc - start;
          result[${e}] = getChannel(getX(${c.join()}), ${u});
        }
      `;p+=r===1?`} `:`}}`,this.userCode=`
      const ${i} start = ${i}(${a});
      const ${i} end = ${i}(${o});

      void main() {
        ${i} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${p}
        setOutput(result);
      }
    `}},IU=e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{paddings:a,constantValue:o}=r;if(k(i.shape)===0)return VV({backend:n,attrs:{shape:a.map((e,t)=>e[0]+i.shape[t]+e[1]),value:o,dtype:i.dtype}});let s=N().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new FU(i.shape,a,o):new PU(i.shape,a,o),c=[[o]];return n.runWebGLProgram(s,[i],i.dtype,c)},LU={kernelName:An,backendName:`webgl`,kernelFunc:IU},RU={kernelName:`Pow`,backendName:`webgl`,kernelFunc:dR({opSnippet:`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,packedOpSnippet:`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+YL+`
  return result;
`})};function zU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=i.shape.length,c=[],l=j(a,i.shape),u=l,d=ll(u,s),f=i;d!=null&&(f=MR({inputs:{x:i},backend:n,attrs:{perm:d}}),u=dl(u.length,s),c.push(f)),cl(`prod`,u,s);let p;if(n.shouldExecuteOnCPU([f])){let e=n.texData.get(f.dataId).values,{outVals:t,outShape:r,outDtype:i}=RI(f.shape,f.dtype,e,u);p=n.makeTensorInfo(r,i,t)}else{let[e,t]=ol(f.shape,u),r=k(t),a=$({inputs:{x:f},backend:n,attrs:{shape:[-1,r]}}),o=wR(a,qi(i.dtype),`prod`,n);p=$({inputs:{x:o},backend:n,attrs:{shape:e}}),c.push(a),c.push(o)}if(o){c.push(p);let e=sl(p.shape,l);p=$({inputs:{x:p},backend:n,attrs:{shape:e}})}return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}var BU={kernelName:Mn,backendName:`webgl`,kernelFunc:zU};function VU(e){let{inputs:t,backend:n,attrs:r}=e,{paramsNestedSplits:i,paramsDenseValues:a,indices:o}=t,{outputRaggedRank:s}=r,c=i.map(e=>n.readSync(e.dataId)),l=i.map(e=>e.shape),u=n.readSync(a.dataId),d=n.readSync(o.dataId),[f,p,m]=zI(c,l,u,a.shape,a.dtype,d,o.shape,s),h=f.map(e=>n.makeTensorInfo([e.length],`int32`,e)),g=n.makeTensorInfo(m,a.dtype,p);return h.concat([g])}var HU={kernelName:Nn,backendName:`webgl`,kernelFunc:VU};function UU(e){let{inputs:t,backend:n}=e,{starts:r,limits:i,deltas:a}=t,o=n.readSync(r.dataId),s=n.readSync(i.dataId),c=n.readSync(a.dataId),[l,u]=BI(o,r.shape,r.dtype,s,i.shape,c,a.shape);return[n.makeTensorInfo([l.length],`int32`,l),n.makeTensorInfo([u.length],r.dtype,u)]}var WU={kernelName:Pn,backendName:`webgl`,kernelFunc:UU};function GU(e){let{inputs:t,backend:n,attrs:r}=e,{shape:i,values:a,defaultValue:o,rowPartitionTensors:s}=t,{rowPartitionTypes:c}=r,l=n.readSync(i.dataId),u=n.readSync(a.dataId),d=n.readSync(o.dataId),f=s.map(e=>n.readSync(e.dataId)),p=s.map(e=>e.shape),[m,h]=VI(l,i.shape,u,a.shape,a.dtype,d,o.shape,f,p,c);return n.makeTensorInfo(m,a.dtype,h)}var KU={kernelName:Fn,backendName:`webgl`,kernelFunc:GU},qU=e=>{let{backend:t,attrs:n}=e,{start:r,stop:i,step:a,dtype:o}=n,s=HI(r,i,a,o);return t.makeTensorInfo([s.length],o,s)},JU={kernelName:In,backendName:`webgl`,kernelFunc:qU},YU={kernelName:Rn,backendName:`webgl`,kernelFunc:uR({opSnippet:`return 1.0 / x;`})},XU={kernelName:zn,backendName:`webgl`,kernelFunc:uR({opSnippet:SL+`
  return (x < 0.0) ? 0.0 : x;
`,packedOpSnippet:`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`})},ZU={kernelName:Gn,backendName:`webgl`,kernelFunc:uR({opSnippet:SL+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,packedOpSnippet:`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`})},QU=class{constructor(e,t,n,r,i){this.variableNames=[`A`],this.outputShape=[];let[a,o,s,c]=e;this.outputShape=[a,t,n,c];let l=[r&&t>1?o-1:o,r&&n>1?s-1:s],u=[r&&t>1?t-1:t,r&&n>1?n-1:n],d;d=i?`(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)`:`vec2(yRC) * effectiveInputOverOutputRatioRC`,this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${l[0]/u[0]},
          ${l[1]/u[1]});
      const vec2 inputShapeRC = vec2(${o}.0, ${s}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${d};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}},$U=class{constructor(e,t,n,r,i){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,o,s,c]=e;this.outputShape=[a,t,n,c];let l=[r&&t>1?o-1:o,r&&n>1?s-1:s],u=[r&&t>1?t-1:t,r&&n>1?n-1:n],d;d=i?`(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)`:`vec3(yRC) * effectiveInputOverOutputRatioRC`,this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${l[0]/u[0]},
          ${l[1]/u[1]},
          ${l[1]/u[1]});
      const vec3 inputShapeRC = vec3(${o}.0, ${s}.0,
                                     ${s}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${d};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${c-1};
        bool hasNextRow = coords.z < ${n-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}};function eW(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r,[c,l]=s,u=N().getBool(`WEBGL_PACK_IMAGE_OPERATIONS`)?new $U(i.shape,c,l,a,o):new QU(i.shape,c,l,a,o);return n.runWebGLProgram(u,[i],`float32`)}var tW={kernelName:Un,backendName:`webgl`,kernelFunc:eW},nW=class{constructor(e,t,n){this.variableNames=[`dy`],this.outputShape=[],this.outputShape=t;let[,r,i]=t,[,a,o]=e,s=[n&&a>1?r-1:r,n&&o>1?i-1:i],c=[n&&a>1?a-1:a,n&&o>1?o-1:o],l=s[0]/c[0],u=s[1]/c[1],d=1/l,f=1/u,p=Math.ceil(d)*2+2,m=Math.ceil(f)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${l});
        const float widthScale = float(${u});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${f});

        const int winHeight = int(${p});
        const int winWidth = int(${m});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${a}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${r-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${i-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function rW(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r,s=new nW(a.shape,i.shape,o);return n.runWebGLProgram(s,[a],a.dtype)}var iW={kernelName:Wn,backendName:`webgl`,kernelFunc:rW},aW=class{constructor(e,t,n,r,i){this.variableNames=[`A`],this.outputShape=[];let[a,o,s,c]=e;this.outputShape=[a,t,n,c];let l=[r&&t>1?o-1:o,r&&n>1?s-1:s],u=[r&&t>1?t-1:t,r&&n>1?n-1:n],d=r?`0.5`:`0.0`,f;f=i?`max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))`:`vec2(yRC) * effectiveInputOverOutputRatioRC`,this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${l[0]/u[0]},
          ${l[1]/u[1]});
      const vec2 inputShapeRC = vec2(${o}.0, ${s}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${f};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${d})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}},oW=class{constructor(e,t,n,r,i){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,o,s,c]=e;this.outputShape=[a,t,n,c];let l=[r&&t>1?o-1:o,r&&n>1?s-1:s],u=[r&&t>1?t-1:t,r&&n>1?n-1:n],d=r?`0.5`:`0.0`,f;f=i?`max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))`:`vec3(yRC) * effectiveInputOverOutputRatioRC`,this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${l[0]/u[0]},
          ${l[1]/u[1]},
          ${l[1]/u[1]});
      const vec3 inputShapeRC = vec3(${o}.0, ${s}.0,
                                     ${s}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${f};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${d})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${c-1};
        bool hasNextRow = coords.z < ${n-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}};function sW(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r,[c,l]=s,u=N().getBool(`WEBGL_PACK_IMAGE_OPERATIONS`)?new oW(i.shape,c,l,a,o):new aW(i.shape,c,l,a,o);return n.runWebGLProgram(u,[i],i.dtype)}var cW={kernelName:Vn,backendName:`webgl`,kernelFunc:sW},lW=class{constructor(e,t,n){this.variableNames=[`dy`],this.outputShape=[],this.outputShape=t;let[,r,i]=t,[,a,o]=e,s=[n&&a>1?r-1:r,n&&o>1?i-1:i],c=[n&&a>1?a-1:a,n&&o>1?o-1:o],l=s[0]/c[0],u=s[1]/c[1],d=1/l,f=1/u,p=Math.ceil(d)*2+2,m=Math.ceil(f)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${l});
        const float widthScale = float(${u});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${f});

        const int winHeight = int(${p});
        const int winWidth = int(${m});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${a}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float sourceFracRow =
              float(${s[0]}) *
                (float(dyR) / float(${c[0]}));

            float sourceFracCol =
                float(${s[1]}) *
                  (float(dyC) / float(${c[1]}));

            int sourceNearestRow = int(min(
                float(int(${r}) - 1),
                ${n} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${i}) - 1),
                ${n} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function uW(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r,s=new lW(a.shape,i.shape,o);return n.runWebGLProgram(s,[a],a.dtype)}var dW={kernelName:Hn,backendName:`webgl`,kernelFunc:uW},fW=class{constructor(e,t){this.variableNames=[`x`];let n=e.length;if(n>4)throw Error(`WebGL backend: Reverse of rank-${n} tensor is not yet supported`);if(this.outputShape=e,n===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${e[0]} - coord - 1));
        }
      `;return}let r=n=>t.indexOf(n)!==-1&&e[n]!==1?`${e[n]} - coords[${n}] - 1`:`coords[${n}]`,i=e.map((e,t)=>r(t)).join(`,`),a=EF(n);this.userCode=`
      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${i}));
      }
    `}},pW=class{constructor(e,t){this.variableNames=[`x`],this.packedInputs=!0,this.packedOutput=!0;let n=e.length;if(n>4)throw Error(`WebGL backend: Reverse of rank-${n} tensor is not yet supported`);this.outputShape=e;let r=lL(`rc`,n),i=`${r[n-1]} + 1 < ${this.outputShape[n-1]}`,a=`${r[n-2]} + 1 < ${this.outputShape[n-2]}`,o=EF(n);n===1?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${e[0]} - rc - 1),
            ${e[0]} - rc - 1);
          if(${i}){
              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),
                ${e[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${o} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${s(r.slice())};
          if(${i}){
            result.g = ${c(r.slice())};
          }
          if(${a}) {
            result.b = ${l(r.slice())};
            if(${i}) {
              result.a = ${u(r.slice())};
            }
          }
          setOutput(result);
        }
    `;function s(e){return d(e)}function c(e){return e[n-1]=`(`+e[n-1]+` + 1)`,d(e)}function l(e){return e[n-2]=`(`+e[n-2]+` + 1)`,d(e)}function u(e){return e[n-1]=`(`+e[n-1]+` + 1)`,e[n-2]=`(`+e[n-2]+` + 1)`,d(e)}function d(t){let n=e.map((e,n)=>f(n,t));return`getChannel(getX(${n.join(`,`)}), vec2(${n.slice(-2).join(`,`)}))`}function f(n,r){return t.indexOf(n)!==-1&&e[n]!==1?`${e[n]} - ${r[n]} - 1`:`${r[n]}`}}};function mW(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dims:a}=r,o=i.shape.length,s=j(a,i.shape);if(o===0)return ZL({inputs:{x:i},backend:n});let c=N().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new pW(i.shape,s):new fW(i.shape,s);return n.runWebGLProgram(c,[i],i.dtype)}var hW={kernelName:Kn,backendName:`webgl`,kernelFunc:mW},gW=class{constructor(e,t){this.variableNames=[`Image`],this.outputShape=[],this.customUniforms=[{name:`params`,type:`vec4`}];let n=e[1],r=e[2];this.outputShape=e;let i=``;i=typeof t==`number`?`float outputValue = ${t.toFixed(2)};`:`
        vec3 fill = vec3(${t.join(`,`)});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${i}
          if(coordX >= 0 && coordX < ${r} && coordY >= 0 && coordY < ${n}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}},_W={kernelName:Mr,backendName:`webgl`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{image:r}=e,{radians:i,fillValue:a,center:o}=t,s=n,c=new gW(r.shape,a),[l,u]=sh(o,r.shape[1],r.shape[2]),d=[[l,u,Math.sin(i),Math.cos(i)]];return s.runWebGLProgram(c,[r],r.dtype,d)}},vW={kernelName:qn,backendName:`webgl`,kernelFunc:uR({opSnippet:`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`})},yW={kernelName:Jn,backendName:`webgl`,kernelFunc:uR({opSnippet:`return inversesqrt(x);`,cpuKernelImpl:UI})},bW=class{constructor(e,t,n,r,i,a,o=!0,s=!1){this.variableNames=[`updates`,`indices`,`defaultValue`],this.outputShape=a;let c=EF(i.length),l=EF(a.length),u=``;n===1?u=`i`:n===2&&(u=`i, j`);let d=`getIndices(${u})`,f=``;r===1?f=`i`:r===2&&(f=`i, coords[1]`);let p=`getUpdates(${f})`,m=``;s&&(m=`coords[0], coords[1]`);let h=`getDefaultValue(${m})`,g=t>1?`strides[j]`:`strides`;this.userCode=`
        ${c} strides = ${c}(${i});

        void main() {
          ${l} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${e}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${t}; j++) {
              int index = round(${d});
              flattenedIndex += index * ${g};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${p};
              found = true;
            }
          }
          setOutput(mix(${h}, sum, float(found)));
        }
      `}},xW=class{constructor(e,t,n,r,i,a,o=!0,s=!1){this.variableNames=[`updates`,`indices`,`defaultValue`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=a;let c=EF(i.length),l=EF(a.length),u=``;n===1?u=`i`:n===2&&(u=`i, j`);let d=`getIndices(${u})`,f=``;r===1?f=`i`:r===2&&(f=`i, coords[1]`);let p=`getUpdates(${f})`,m=``;s&&(m=`coords[0], coords[1]`);let h=`getDefaultValue(${m})`,g=t>1?`strides[j]`:`strides`,_=t>1?`strides[j + 1]`:`strides`;this.userCode=`
        ${c} strides = ${c}(${i});

        void main() {
          ${l} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${e}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${t}; j+=2) {
              ivec4 index = round(${d});
              flattenedIndex += index.xz * ${g};
              if (j + 1 < ${t}) {
                flattenedIndex += index.yw * ${_};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${p};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${h}, sum, found));
        }
      `}};function SW(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i,updates:a}=t,{shape:o}=r,{sliceRank:s,numUpdates:c,sliceSize:l,strides:u,outputSize:d}=Rf(a,i,o),f=[d/l,l];if(d===0)return n.makeTensorInfo(o,i.dtype);let p=$({inputs:{x:i},backend:n,attrs:{shape:[c,s]}}),m=$({inputs:{x:a},backend:n,attrs:{shape:[c,l]}}),h=n.makeTensorInfo([],`float32`,new Float32Array([0])),g;g=N().getBool(`WEBGL_PACK`)?new xW(c,s,p.shape.length,m.shape.length,u,f):new bW(c,s,p.shape.length,m.shape.length,u,f);let _=n.runWebGLProgram(g,[m,p,h],m.dtype),v=$({inputs:{x:_},backend:n,attrs:{shape:o}});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(_),n.disposeIntermediateTensorInfo(h),v}var CW={kernelName:Yn,backendName:`webgl`,kernelFunc:SW},wW=class{constructor(e,t,n,r){this.variableNames=[`sortedSequence`,`values`],this.customUniforms=[{name:`numInputs`,type:`int`}],this.outputShape=[e,n];let i=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,a=N().getNumber(`WEBGL_VERSION`)===2?`while (left < right) {`:i,o=r===`left`?`<`:`<=`;this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${a}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${o} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}};function TW(e){let{inputs:t,backend:n,attrs:r}=e,{sortedSequence:i,values:a}=t,{side:o}=r,s=new wW(i.shape[0],i.shape[1],a.shape[1],o),c=[[i.shape[1]]];return n.runWebGLProgram(s,[i,a],`int32`,c)}var EW={kernelName:Zn,backendName:`webgl`,kernelFunc:TW},DW=class{constructor(e,t,n){this.variableNames=[`c`,`a`,`b`],this.outputShape=t;let r,i;if(n>4)throw Error(`Where for rank ${n} is not yet supported`);if(n===1)i=`resRC`,r=`resRC`;else{let n=[`resRC.x`,`resRC.y`,`resRC.z`,`resRC.w`],a=[],o=[];for(let r=0;r<t.length;r++)o.push(`${n[r]}`),r<e&&a.push(`${n[r]}`);r=a.join(),i=o.join()}let a=EF(n);this.userCode=`
      void main() {
        ${a} resRC = getOutputCoords();
        float cVal = getC(${r});
        if (cVal >= 1.0) {
          setOutput(getA(${i}));
        } else {
          setOutput(getB(${i}));
        }
      }
    `}};function OW(e){let{inputs:t,backend:n}=e,{condition:r,t:i,e:a}=t,o=new DW(r.shape.length,i.shape,i.shape.length);return n.runWebGLProgram(o,[r,i,a],Ki(i.dtype,a.dtype))}var kW={kernelName:Qn,backendName:`webgl`,kernelFunc:OW},AW={kernelName:$n,backendName:`webgl`,kernelFunc:uR({opSnippet:`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${ph};
  float scale = ${mh};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`})},jW={kernelName:rr,backendName:`webgl`,kernelFunc:uR({opSnippet:lR+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,packedOpSnippet:`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:GI})},MW={kernelName:nr,backendName:`webgl`,kernelFunc:uR({opSnippet:`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`})},NW={kernelName:`Sin`,backendName:`webgl`,kernelFunc:uR({opSnippet:lR+`
  return sin(x);
`,packedOpSnippet:`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${YL}
  return result;
`})},PW={kernelName:tr,backendName:`webgl`,kernelFunc:uR({opSnippet:`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`})},FW={kernelName:ir,backendName:`webgl`,kernelFunc:uR({opSnippet:`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`})},IW={kernelName:or,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,paddings:o}=r;O(i.shape.length<=4,()=>`spaceToBatchND for rank > 4 with a WebGL backend not implemented yet`);let s=a.reduce((e,t)=>e*t),c=[[0,0]];c.push(...o);for(let e=1+a.length;e<i.shape.length;++e)c.push([0,0]);let l=[],u=IU({inputs:{x:i},backend:n,attrs:{paddings:c,constantValue:0}}),d=ch(u.shape,a,s,!1),f=lh(d.length,a.length,!1),p=uh(u.shape,a,s,!1),m=$({inputs:{x:u},backend:n,attrs:{shape:d}}),h=MR({inputs:{x:m},backend:n,attrs:{perm:f}}),g=$({inputs:{x:h},backend:n,attrs:{shape:p}});return l.push(u),l.push(m),l.push(h),l.forEach(e=>n.disposeIntermediateTensorInfo(e)),g}};function LW(e){let{inputs:t,backend:n}=e,{indices:r,values:i,denseShape:a,defaultValue:o}=t;if(a.shape.length!==1)throw Error(`Dense shape must be a vector, saw:
         ${a.shape}`);if(r.shape.length!==2)throw Error(`Indices must be a matrix, saw:
         ${r.shape}`);if(i.shape.length!==1)throw Error(`Values must be a vector, saw:
         ${i.shape}`);if(o.shape.length!==0)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let s=n.readSync(r.dataId),c=n.readSync(i.dataId),l=n.readSync(a.dataId),u=n.readSync(o.dataId)[0],[d,f,p,m,h]=JI(s,r.shape,r.dtype,c,i.dtype,l,u);return[n.makeTensorInfo(f,r.dtype,d),n.makeTensorInfo([f[0]],i.dtype,p),n.makeTensorInfo([m.length],`bool`,new Uint8Array(m.map(e=>Number(e)))),n.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}var RW={kernelName:lr,backendName:`webgl`,kernelFunc:LW};function zW(e){let{inputs:t,backend:n}=e,{inputIndices:r,inputShape:i,newShape:a}=t;if(r.shape.length!==2)throw Error(`Input indices should be a matrix but received shape ${r.shape}`);if(i.shape.length!==1)throw Error(`Input shape should be a vector but received shape ${i.shape}`);if(a.shape.length!==1)throw Error(`Target shape should be a vector but received shape ${a.shape}`);let o=Array.from(n.readSync(i.dataId)),s=n.readSync(r.dataId),c=Array.from(n.readSync(a.dataId)),[l,u,d]=YI(s,r.shape,r.dtype,o,c);return[n.makeTensorInfo(u,r.dtype,l),n.makeTensorInfo([d.length],a.dtype,new Int32Array(d))]}var BW={kernelName:ur,backendName:`webgl`,kernelFunc:zW};function VW(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
              ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
              ${a.shape}`);let o=n.readSync(r.dataId),s=n.readSync(i.dataId),c=n.readSync(a.dataId),[l,u]=XI(o,r.shape,r.dtype,s,c,!0);return n.makeTensorInfo(u,r.dtype,l)}var HW={kernelName:dr,backendName:`webgl`,kernelFunc:VW};function UW(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
             ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
             ${a.shape}`);let o=n.readSync(r.dataId),s=n.readSync(i.dataId),c=n.readSync(a.dataId),[l,u]=XI(o,r.shape,r.dtype,s,c);return n.makeTensorInfo(u,r.dtype,l)}var WW={kernelName:fr,backendName:`webgl`,kernelFunc:UW};function GW(e){let{inputs:t,backend:n,attrs:r}=e,{sparseIndices:i,sparseValues:a,defaultValue:o}=t,{outputShape:s}=r,{sliceRank:c,numUpdates:l,sliceSize:u,strides:d,outputSize:f}=Rf(a,i,s);if(a.dtype===`string`){let e=WI(n.bufferSync(i),n.bufferSync(a),s,f,u,l,c,d,gi(n.readSync(o.dataId)[0]),!1);return n.makeTensorInfo(s,e.dtype,e.values)}let p=new bW(l,c,i.shape.length,a.shape.length,d,[f,1],!1),m=n.runWebGLProgram(p,[a,i,o],a.dtype),h=$({inputs:{x:m},backend:n,attrs:{shape:s}});return n.disposeIntermediateTensorInfo(m),h}var KW={kernelName:pr,backendName:`webgl`,kernelFunc:GW};function qW(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{numOrSizeSplits:a,axis:o}=r,s=j(o,i.shape)[0],c=zh(i,a,s),l=i.shape.length,u=Array(l).fill(0),d=i.shape.slice();return c.map(e=>{let t=[...d];t[s]=e;let r=Pz({inputs:{x:i},backend:n,attrs:{begin:u,size:t}});return u[s]+=e,r})}var JW={kernelName:sr,backendName:`webgl`,kernelFunc:qW},YW=`return sqrt(x);`,XW={kernelName:ar,backendName:`webgl`,kernelFunc:uR({opSnippet:YW,packedOpSnippet:YW,cpuKernelImpl:ZI})},ZW={kernelName:hr,backendName:`webgl`,kernelFunc:uR({opSnippet:`return x * x;`})},QW=`return (a - b) * (a - b);`,$W={kernelName:mr,backendName:`webgl`,kernelFunc:dR({opSnippet:QW,packedOpSnippet:QW})};function eG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;if(i.dtype!==`string`)throw Error(`Input must be of datatype string`);let a=QI(rg(n.readSync(i.dataId)),`string`,r);return n.makeTensorInfo(i.shape,`string`,a)}var tG={kernelName:gr,backendName:`webgl`,kernelFunc:eG};function nG({inputs:e,attrs:t,backend:n}){let{x:r}=e,i=SL+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,a=new xL(r.shape,i);return n.runWebGLProgram(a,[r],r.dtype)}var rG={kernelName:Ar,backendName:`webgl`,kernelFunc:nG},iG=class{constructor(e,t,n){this.variableNames=[`x`],this.outputShape=n;let r=n.length,i=EF(n.length),a=EF(n.length),o=``;if(r===1)o=`coords * strides + begin`;else{let e=0;o=n.map((t,r)=>(e++,n.length===1?`coords * strides[${r}] + begin[${r}]`:`coords[${e-1}] * strides[${r}] + begin[${r}]`)).join(`,`)}this.userCode=`
      ${i} begin = ${i}(${e});
      ${i} strides = ${i}(${t});

      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${o}));
      }
    `}};function aG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,end:o,strides:s,beginMask:c,endMask:l,ellipsisMask:u,newAxisMask:d,shrinkAxisMask:f}=r,{finalShapeSparse:p,finalShape:m,isIdentity:h,sliceDim0:g,isSimpleSlice:_,begin:v,end:y,strides:b}=qm(i.shape,a,o,s,c,l,u,d,f),x;if(h)x=$({inputs:{x:i},backend:n,attrs:{shape:m}});else if(g||_){O(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=Pm(v,y,b),t=Pz({inputs:{x:i},backend:n,attrs:{begin:v,size:e}});x=$({inputs:{x:t},backend:n,attrs:{shape:m}}),n.disposeIntermediateTensorInfo(t)}else if(n.shouldExecuteOnCPU([i])){let e=n.readSync(i.dataId),t=$I(p,So(i.shape,i.dtype,e),b,v);x=n.makeTensorInfo(m,i.dtype,t.values)}else{let e=new iG(v,b,p);x=n.runWebGLProgram(e,[i],i.dtype)}let S=$({inputs:{x},backend:n,attrs:{shape:m}});return n.disposeIntermediateTensorInfo(x),S}var oG={kernelName:_r,backendName:`webgl`,kernelFunc:aG};function sG(e){let{inputs:t,backend:n,attrs:r}=e,{separator:i,nGramWidths:a,leftPad:o,rightPad:s,padWidth:c,preserveShortSequences:l}=r,{data:u,dataSplits:d}=t,[f,p]=eL(n.readSync(u.dataId),n.readSync(d.dataId),i,a,o,s,c,l);return[n.makeTensorInfo([f.length],`string`,f),n.makeTensorInfo(d.shape,`int32`,p)]}var cG={kernelName:vr,backendName:`webgl`,kernelFunc:sG};function lG(e){let{inputs:t,backend:n,attrs:r}=e,{skipEmpty:i}=r,{input:a,delimiter:o}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(a.shape.length!==1)throw Error(`Input must be a vector, got shape: ${a.shape}`);if(o.shape.length!==0)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let s=n.readSync(a.dataId),c=n.readSync(o.dataId)[0],[l,u,d]=tL(s,c,i),f=u.length;return[n.makeTensorInfo([f,2],`int32`,l),n.makeTensorInfo([f],`string`,u),n.makeTensorInfo([2],`int32`,new Int32Array(d))]}var uG={kernelName:yr,backendName:`webgl`,kernelFunc:lG};function dG(e){let{inputs:t,backend:n,attrs:r}=e,{numBuckets:i}=r,{input:a}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(i<=0)throw Error(`Number of buckets must be at least 1`);let o=nL(n.readSync(a.dataId),i);return n.makeTensorInfo(a.shape,`int32`,o)}var fG={kernelName:br,backendName:`webgl`,kernelFunc:dG},pG={kernelName:`Tan`,backendName:`webgl`,kernelFunc:uR({opSnippet:`return tan(x);`})},mG={kernelName:xr,backendName:`webgl`,kernelFunc:uR({opSnippet:`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`})};function hG(e){let{inputs:t,backend:n,attrs:r}=e,{tensor:i,indices:a,updates:o}=t,{}=r,{sliceRank:s,numUpdates:c,sliceSize:l,strides:u,outputSize:d}=Rf(o,a,i.shape),f=[d/l,l];if(d===0)return n.makeTensorInfo(i.shape,a.dtype);let p=$({inputs:{x:a},backend:n,attrs:{shape:[c,s]}}),m=$({inputs:{x:o},backend:n,attrs:{shape:[c,l]}}),h=$({inputs:{x:i},backend:n,attrs:{shape:f}}),g=new bW(c,s,p.shape.length,m.shape.length,u,f,!1,!0),_=n.runWebGLProgram(g,[m,p,h],h.dtype),v=$({inputs:{x:_},backend:n,attrs:{shape:i.shape}});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(_),v}var gG={kernelName:Xn,backendName:`webgl`,kernelFunc:hG},_G=class{constructor(e,t){this.variableNames=[`A`];let n=Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[r]*t[r];this.outputShape=n,this.rank=n.length;let r=EF(this.rank),i=vG(e);this.userCode=`
      void main() {
        ${r} resRC = getOutputCoords();
        setOutput(getA(${i}));
      }
    `}};function vG(e){let t=e.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(t===1)return`imod(resRC, ${e[0]})`;let n=[`resRC.x`,`resRC.y`,`resRC.z`,`resRC.w`,`resRC.u`],r=[];for(let t=0;t<e.length;t++)r.push(`imod(${n[t]}, ${e[t]})`);return r.join()}function yG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reps:a}=r;if(i.dtype===`string`||i.shape.length>5){let e=n.readSync(i.dataId),t=i.dtype===`string`?e.map(e=>gi(e)):e,r=iL(So(i.shape,i.dtype,t),a);return n.makeTensorInfo(r.shape,r.dtype,r.values)}let o=new _G(i.shape,a);return n.runWebGLProgram(o,[i],i.dtype)}var bG={kernelName:Sr,backendName:`webgl`,kernelFunc:yG},xG=class{constructor(e){this.variableNames=[`x`,`indices`],this.customUniforms=[{name:`n`,type:`int`},{name:`firstPass`,type:`int`},{name:`negativeInf`,type:`float`},{name:`dir`,type:`int`},{name:`inc`,type:`int`}],this.outputShape=e,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}},SG=class{constructor(e){this.variableNames=[`x`,`indices`],this.customUniforms=[{name:`n`,type:`int`},{name:`firstPass`,type:`int`},{name:`k`,type:`int`}],this.outputShape=e,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}};function CG(e,t){t!==null&&e.disposeIntermediateTensorInfo(t)}function wG(e){let t=1;for(;t<e;)t*=2;return t}function TG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{k:a,sorted:o}=r,s=N().getNumber(`TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD`),c=N().getNumber(`TOPK_K_CPU_HANDOFF_THRESHOLD`),l=i.shape,u=l[l.length-1];if(n.shouldExecuteOnCPU([i])||u<s||a>c){let[e,t]=aL(n.readSync(i.dataId),l,i.dtype,a,o);return[n.makeTensorInfo(e.shape,e.dtype,e.values),n.makeTensorInfo(t.shape,t.dtype,t.values)]}if(a===0)return l[l.length-1]=0,[n.makeTensorInfo(l,i.dtype,[]),n.makeTensorInfo(l,`int32`,[])];if(u===1)return[i,VV({attrs:{shape:l,dtype:`int32`,value:0},backend:n})];let d=n.texData.get(i.dataId),f=d!==null&&d.isPacked,p=f?n.unpackTensor(i):i,m=k(l)/u,h=$({inputs:{x:p},attrs:{shape:[m,u]},backend:n});f&&CG(n,p);let g=wG(a),_=wG(u),v=null,y=()=>v===null?[h,h]:[h,v],b=(e,t,r)=>{let i=y(),a=new xG(r),o=[[u],[+(v===null)],[-1/0],[e],[t]],s=v;v=n.runWebGLProgram(a,i,`int32`,o),CG(n,s)};for(let e=1;e<g;e*=2){let t=e*2;for(let n=e;n>=1;n/=2)b(t,n,[m,_])}for(let e=_;e>g;e/=2){let t=y(),r=new SG([m,e/2]),i=[[u],[+(v===null)],[g]],a=v;v=n.runWebGLProgram(r,t,`int32`,i),CG(n,a);let o=g/2,s=o*2;for(let e=o;e>=1;e/=2)b(s,e,v.shape)}let x=v;v=Pz({inputs:{x:v},backend:n,attrs:{begin:0,size:[m,a]}}),CG(n,x);let S=lH({inputs:{x:h,indices:v},backend:n,attrs:{axis:1,batchDims:1}});CG(n,h);let C=l.slice(0,-1);C.push(a),x=v,v=$({inputs:{x:v},attrs:{shape:C},backend:n}),CG(n,x);let w=S;return S=$({inputs:{x:S},attrs:{shape:C},backend:n}),CG(n,w),[S,v]}var EG={kernelName:Cr,backendName:`webgl`,kernelFunc:TG},DG=class{constructor(e,t,n,r,i,a){this.variableNames=[`Image`,`Transforms`],this.outputShape=a;let o=n===`nearest`?1:2,s;switch(r){case`constant`:s=1;break;case`reflect`:s=2;break;case`wrap`:s=3;break;case`nearest`:s=4;break;default:s=1;break}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${s} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${s} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${s} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${e} && 0 <= coordX && coordX < ${t}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${i});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${i});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${t}));
                float mapY = mapCoord(inY, float(${e}));

                if (${o} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}};function OG(e){let{inputs:t,backend:n,attrs:r}=e,{image:i,transforms:a}=t,{interpolation:o,fillMode:s,fillValue:c,outputShape:l}=r,[u,d,f,p]=i.shape,[m,h]=l==null?[d,f]:l,g=new DG(d,f,o,s,c,[u,m,h,p]);return n.runWebGLProgram(g,[i,a],`float32`)}var kG={kernelName:wr,backendName:`webgl`,kernelFunc:OG};function AG(e){let{inputs:t,attrs:n,backend:r}=e,{axis:i}=n,{x:a}=t;kP(a,`unique`),console.warn(`WARNING: `,`UI might be locked temporarily as data is being downloaded`);let{outputValues:o,outputShape:s,indices:c}=sL(r.readSync(a.dataId),i,a.shape,a.dtype);return[r.makeTensorInfo(s,a.dtype,o),r.makeTensorInfo([c.length],`int32`,c)]}var jG={kernelName:Er,backendName:`webgl`,kernelFunc:AG};function MG(e){let{inputs:t,backend:n,attrs:r}=e,{value:i}=t,{axis:a}=r;a<0&&(a+=i.shape.length);let o=i,s=o.shape.length,c=i.shape[a],l=Array(s-1),u=0;for(let e=0;e<s;e++)e!==a&&(l[u++]=o.shape[e]);let d=[],f=Array(s).fill(0),p=o.shape.slice();p[a]=1;let m=Array(c);for(let e=0;e<m.length;e++){f[a]=e;let t=Pz({inputs:{x:o},backend:n,attrs:{begin:f,size:p}});m[e]=$({inputs:{x:t},backend:n,attrs:{shape:l}}),d.push(t)}return d.forEach(e=>n.disposeIntermediateTensorInfo(e)),m}var NG={kernelName:Dr,backendName:`webgl`,kernelFunc:MG},PG=class{constructor(e,t){this.variableNames=[`x`,`segmentIds`];let n=e.windowSize,r=e.batchSize,i=e.inSize,a=e.numSegments,o=a*Math.ceil(i/n);this.outputShape=[r,o];let s=Math.floor(n/4)*4,c=n%4,l=`
        sumValue += dot(values, segFilter);
    `,u=``;i%n>0&&(u=`
        if (inIdx < 0 || inIdx >= ${i}) {
          return initializationValue;
        }
      `);let d=``;i%n>0&&(d=`
        if (inIdx < 0 || inIdx >= ${i}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        ${u}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${d}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${a})) * float(${n}));
        int currentSeg = int(mod(float(outIdx), float(${a})));

        float sumValue = 0.0;

        for (int i = 0; i < ${s}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${l}
        }

        int inIdx = inOffset + ${s};
        if (${c===1}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${l}
        } else if (${c===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${l}
        } else if (${c===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${l}
        }
        setOutput(sumValue);
      }
    `}};function FG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,segmentIds:a}=t,{numSegments:o}=r,s=i.shape.length,c=[],l=0,u=ll([l],s),d=i;u!=null&&(d=MR({inputs:{x:i},backend:n,attrs:{perm:u}}),c.push(d),l=dl(1,s)[0]);let f=eg(d.shape,l,o),p=k([d.shape[l]]),m=$({inputs:{x:d},backend:n,attrs:{shape:[-1,p]}});c.push(m);let h=qi(i.dtype),g=(e,t,r,i,a)=>{let o=e.shape[0],s=e.shape[1],l=$h(s,a),u=new PG({windowSize:l,inSize:s,batchSize:o,numSegments:a},t),d=n.compileAndRun(u,[e,r],i);if(c.push(d),d.shape[1]===a)return d;let f=qU({backend:n,attrs:{start:0,stop:a,step:1,dtype:`float32`}}),p=yG({inputs:{x:f},backend:n,attrs:{reps:[s/l]}});return c.push(f),c.push(p),g(d,t,p,i,a)},_=$({inputs:{x:g(m,`unsortedSegmentSum`,a,h,o)},backend:n,attrs:{shape:f}}),v=_;if(u!=null){c.push(_);let e=ul(u);v=MR({inputs:{x:v},backend:n,attrs:{perm:e}})}return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),v}var IG=[IR,zR,BR,VR,UR,qR,YR,ZR,iz,oz,sz,cz,lz,uz,dz,hz,_z,xz,Cz,Tz,Oz,Iz,Rz,Hz,Wz,Qz,eB,iB,eR,cB,_B,EB,MB,FB,LB,zB,VB,HB,UB,GB,QB,eV,nV,aV,lV,pV,hV,vV,xV,CV,wV,DV,OV,kV,jV,NV,FV,zV,HV,WV,KV,qV,XV,tH,rH,oH,uH,dH,fH,QL,mH,pB,hH,gH,_H,iR,vH,yH,xH,SH,CH,wH,TH,EH,kH,jH,PH,FH,LH,zH,UH,GH,qH,YH,ZH,QH,tU,nU,fU,vR,gU,yU,SU,TU,Kz,DU,jU,NU,LU,RU,cR,BU,HU,WU,KU,JU,Jz,aU,YU,XU,ZU,bR,tW,iW,cW,dW,hW,_W,vW,yW,CW,EW,kW,AW,jW,MW,NW,PW,Fz,uU,FW,IW,RW,BW,HW,WW,KW,JW,XW,ZW,$W,tG,rG,oG,cG,uG,fG,cU,jR,pG,mG,gG,bG,EG,kG,NR,jG,NG,{kernelName:Or,backendName:`webgl`,kernelFunc:FG},kU];for(let e of IG)Ur(e);var LG=Object.defineProperty,RG=(e,t,n)=>t in e?LG(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,zG=(e,t,n)=>RG(e,typeof t==`symbol`?t:t+``,n),BG=!1;async function VG(){if(!BG)try{await Da(`webgl`),await Oa(),console.log(`[KataGo] TensorFlow.js initialized in main thread (WebGL backend)`),BG=!0}catch(e){console.warn(`[KataGo] WebGL init failed in main thread:`,e)}}var HG=e=>e.length<=30?e:e.slice(e.length-30),UG=class extends Error{constructor(e=`Analysis canceled`){super(e),zG(this,`canceled`,!0),this.name=`KataGoCanceledError`}},WG=null;function GG(e){WG=e}function KG(){return WG||new URL(`data:video/mp2t;base64,Ly8vIDxyZWZlcmVuY2UgbGliPSJ3ZWJ3b3JrZXIiIC8+CgppbXBvcnQgKiBhcyB0ZiBmcm9tICdAdGVuc29yZmxvdy90ZmpzJzsKaW1wb3J0ICdAdGVuc29yZmxvdy90ZmpzLWJhY2tlbmQtd2ViZ3B1JzsKaW1wb3J0ICdAdGVuc29yZmxvdy90ZmpzLWJhY2tlbmQtd2FzbSc7CmltcG9ydCB7IHNldFRocmVhZHNDb3VudCwgc2V0V2FzbVBhdGhzIH0gZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1iYWNrZW5kLXdhc20nOwppbXBvcnQgcGFrbyBmcm9tICdwYWtvJzsKCmltcG9ydCB0eXBlIHsgS2F0YUdvQW5hbHl6ZVJlcXVlc3QsIEthdGFHb1dvcmtlclJlcXVlc3QsIEthdGFHb1dvcmtlclJlc3BvbnNlIH0gZnJvbSAnLi90eXBlcyc7CmltcG9ydCB0eXBlIHsgQm9hcmRTdGF0ZSwgR2FtZVJ1bGVzLCBNb3ZlLCBQbGF5ZXIsIFJlZ2lvbk9mSW50ZXJlc3QgfSBmcm9tICcuLi90eXBlcyc7CmltcG9ydCB7IHB1YmxpY1VybCB9IGZyb20gJy4uL3V0aWxzL3B1YmxpY1VybCc7CmltcG9ydCB7IHBhcnNlS2F0YUdvTW9kZWxWOCB9IGZyb20gJy4vbG9hZE1vZGVsVjgnOwppbXBvcnQgeyBLYXRhR29Nb2RlbFY4VGYgfSBmcm9tICcuL21vZGVsVjgnOwppbXBvcnQgeyBFTkdJTkVfTUFYX1RJTUVfTVMsIEVOR0lORV9NQVhfVklTSVRTIH0gZnJvbSAnLi9saW1pdHMnOwppbXBvcnQgeyBNY3RzU2VhcmNoLCB0eXBlIE93bmVyc2hpcE1vZGUgfSBmcm9tICcuL2FuYWx5emVNY3RzJzsKaW1wb3J0IHsgZmlsbElucHV0c1Y3RmFzdCwgdHlwZSBSZWNlbnRNb3ZlIH0gZnJvbSAnLi9mZWF0dXJlc1Y3RmFzdCc7CmltcG9ydCB7CiAgQkxBQ0ssCiAgQk9BUkRfQVJFQSwKICBCT0FSRF9TSVpFLAogIFBBU1NfTU9WRSwKICBXSElURSwKICBjb21wdXRlQXJlYU1hcFY3S2F0YUdvSW50bywKICBjb21wdXRlTGFkZGVyRmVhdHVyZXNWN0thdGFHb0ludG8sCiAgY29tcHV0ZUxhZGRlcmVkU3RvbmVzVjdLYXRhR29JbnRvLAogIGNvbXB1dGVMaWJlcnR5TWFwSW50bywKICBwbGF5TW92ZSwKICBzZXRCb2FyZFNpemUsCiAgdHlwZSBTaW1Qb3NpdGlvbiwKICB0eXBlIFN0b25lQ29sb3IsCn0gZnJvbSAnLi9mYXN0Qm9hcmQnOwppbXBvcnQgeyBwb3N0cHJvY2Vzc0thdGFHb1Y4IH0gZnJvbSAnLi9ldmFsVjgnOwoKbGV0IG1vZGVsOiBLYXRhR29Nb2RlbFY4VGYgfCBudWxsID0gbnVsbDsKbGV0IGxvYWRlZE1vZGVsTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkOwpsZXQgbG9hZGVkTW9kZWxVcmw6IHN0cmluZyB8IG51bGwgPSBudWxsOwpsZXQgYmFja2VuZFByb21pc2U6IFByb21pc2U8dm9pZD4gfCBudWxsID0gbnVsbDsKbGV0IHF1ZXVlOiBQcm9taXNlPHZvaWQ+ID0gUHJvbWlzZS5yZXNvbHZlKCk7CgpsZXQgVjdfU1BBVElBTF9TVFJJREUgPSBCT0FSRF9BUkVBICogMjI7CmNvbnN0IFY3X0dMT0JBTF9TVFJJREUgPSAxOTsKCmxldCBldmFsU3BhdGlhbFY3ID0gbmV3IEZsb2F0MzJBcnJheShWN19TUEFUSUFMX1NUUklERSk7CmxldCBldmFsR2xvYmFsVjcgPSBuZXcgRmxvYXQzMkFycmF5KFY3X0dMT0JBTF9TVFJJREUpOwoKbGV0IHN0b25lc1NjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKbGV0IHByZXZTdG9uZXNTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CmxldCBwcmV2UHJldlN0b25lc1NjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKCmxldCBrb1NpbVN0b25lc1NjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKbGV0IGtvU2ltUG9zU2NyYXRjaDogU2ltUG9zaXRpb24gPSB7IHN0b25lczoga29TaW1TdG9uZXNTY3JhdGNoLCBrb1BvaW50OiAtMSB9Owpjb25zdCBrb0NhcHR1cmVTdGFja1NjcmF0Y2g6IG51bWJlcltdID0gW107CgpsZXQgbGliZXJ0eU1hcFNjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKbGV0IGFyZWFNYXBTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CgpsZXQgbGFkZGVyZWRTdG9uZXNTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CmxldCBsYWRkZXJXb3JraW5nTW92ZXNTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CmxldCBwcmV2TGFkZGVyZWRTdG9uZXNTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CmxldCBwcmV2UHJldkxhZGRlcmVkU3RvbmVzU2NyYXRjaCA9IG5ldyBVaW50OEFycmF5KEJPQVJEX0FSRUEpOwoKbGV0IGV2YWxCYXRjaENhcGFjaXR5ID0gMDsKbGV0IGV2YWxCYXRjaFNwYXRpYWxWNyA9IG5ldyBGbG9hdDMyQXJyYXkoMCk7CmxldCBldmFsQmF0Y2hHbG9iYWxWNyA9IG5ldyBGbG9hdDMyQXJyYXkoMCk7CmxldCBzY3JhdGNoQm9hcmRTaXplID0gQk9BUkRfU0laRTsKCmZ1bmN0aW9uIHJlZ2lvbktleShyb2k/OiBSZWdpb25PZkludGVyZXN0IHwgbnVsbCk6IHN0cmluZyB8IG51bGwgewogIGlmICghcm9pKSByZXR1cm4gbnVsbDsKICBjb25zdCB4TWluID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oQk9BUkRfU0laRSAtIDEsIE1hdGgubWluKHJvaS54TWluLCByb2kueE1heCkpKTsKICBjb25zdCB4TWF4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oQk9BUkRfU0laRSAtIDEsIE1hdGgubWF4KHJvaS54TWluLCByb2kueE1heCkpKTsKICBjb25zdCB5TWluID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oQk9BUkRfU0laRSAtIDEsIE1hdGgubWluKHJvaS55TWluLCByb2kueU1heCkpKTsKICBjb25zdCB5TWF4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oQk9BUkRfU0laRSAtIDEsIE1hdGgubWF4KHJvaS55TWluLCByb2kueU1heCkpKTsKICBjb25zdCBpc1NpbmdsZVBvaW50ID0geE1pbiA9PT0geE1heCAmJiB5TWluID09PSB5TWF4OwogIGNvbnN0IGlzV2hvbGVCb2FyZCA9IHhNaW4gPT09IDAgJiYgeU1pbiA9PT0gMCAmJiB4TWF4ID09PSBCT0FSRF9TSVpFIC0gMSAmJiB5TWF4ID09PSBCT0FSRF9TSVpFIC0gMTsKICBpZiAoaXNTaW5nbGVQb2ludCB8fCBpc1dob2xlQm9hcmQpIHJldHVybiBudWxsOwogIHJldHVybiBgJHt4TWlufSwke3hNYXh9LCR7eU1pbn0sJHt5TWF4fWA7Cn0KCmZ1bmN0aW9uIGdldEV2YWxCYXRjaEJ1ZmZlcnNWNyhiYXRjaDogbnVtYmVyKTogeyBzcGF0aWFsOiBGbG9hdDMyQXJyYXk7IGdsb2JhbDogRmxvYXQzMkFycmF5IH0gewogIGlmIChiYXRjaCA+IGV2YWxCYXRjaENhcGFjaXR5KSB7CiAgICBldmFsQmF0Y2hDYXBhY2l0eSA9IGJhdGNoOwogICAgZXZhbEJhdGNoU3BhdGlhbFY3ID0gbmV3IEZsb2F0MzJBcnJheShiYXRjaCAqIFY3X1NQQVRJQUxfU1RSSURFKTsKICAgIGV2YWxCYXRjaEdsb2JhbFY3ID0gbmV3IEZsb2F0MzJBcnJheShiYXRjaCAqIFY3X0dMT0JBTF9TVFJJREUpOwogIH0KICByZXR1cm4gewogICAgc3BhdGlhbDogZXZhbEJhdGNoU3BhdGlhbFY3LnN1YmFycmF5KDAsIGJhdGNoICogVjdfU1BBVElBTF9TVFJJREUpLAogICAgZ2xvYmFsOiBldmFsQmF0Y2hHbG9iYWxWNy5zdWJhcnJheSgwLCBiYXRjaCAqIFY3X0dMT0JBTF9TVFJJREUpLAogIH07Cn0KCmZ1bmN0aW9uIHBsYXllclRvQ29sb3IocDogUGxheWVyKTogU3RvbmVDb2xvciB7CiAgcmV0dXJuIHAgPT09ICdibGFjaycgPyBCTEFDSyA6IFdISVRFOwp9CgpmdW5jdGlvbiBib2FyZFN0YXRlVG9TdG9uZXNJbnRvKGJvYXJkOiBCb2FyZFN0YXRlLCBvdXQ6IFVpbnQ4QXJyYXkpOiB2b2lkIHsKICBvdXQuZmlsbCgwKTsKICBmb3IgKGxldCB5ID0gMDsgeSA8IEJPQVJEX1NJWkU7IHkrKykgewogICAgY29uc3Qgcm93ID0gYm9hcmRbeV07CiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IEJPQVJEX1NJWkU7IHgrKykgewogICAgICBjb25zdCB2ID0gcm93Py5beF0gPz8gbnVsbDsKICAgICAgaWYgKCF2KSBjb250aW51ZTsKICAgICAgb3V0W3kgKiBCT0FSRF9TSVpFICsgeF0gPSB2ID09PSAnYmxhY2snID8gQkxBQ0sgOiBXSElURTsKICAgIH0KICB9Cn0KCmZ1bmN0aW9uIG1vdmVzVG9SZWNlbnRNb3Zlcyhtb3ZlczogTW92ZVtdKTogUmVjZW50TW92ZVtdIHsKICBjb25zdCBvdXQgPSBuZXcgQXJyYXk8UmVjZW50TW92ZT4obW92ZXMubGVuZ3RoKTsKICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7CiAgICBjb25zdCBtID0gbW92ZXNbaV0hOwogICAgb3V0W2ldID0gewogICAgICBtb3ZlOiBtLnggPCAwIHx8IG0ueSA8IDAgPyBQQVNTX01PVkUgOiBtLnkgKiBCT0FSRF9TSVpFICsgbS54LAogICAgICBwbGF5ZXI6IG0ucGxheWVyLAogICAgfTsKICB9CiAgcmV0dXJuIG91dDsKfQoKZnVuY3Rpb24gY291bnRIaXN0b3J5VHVybnNJbmNsdWRlZChhcmdzOiB7IHJlY2VudE1vdmVzOiBSZWNlbnRNb3ZlW107IGN1cnJlbnRQbGF5ZXI6IFBsYXllcjsgY29uc2VydmF0aXZlUGFzc0FuZElzUm9vdDogYm9vbGVhbiB9KTogbnVtYmVyIHsKICBjb25zdCBsYXN0TW92ZSA9IGFyZ3MucmVjZW50TW92ZXMubGVuZ3RoID4gMCA/IGFyZ3MucmVjZW50TW92ZXNbYXJncy5yZWNlbnRNb3Zlcy5sZW5ndGggLSAxXSA6IG51bGw7CiAgY29uc3QgcGFzc1dvdWxkRW5kR2FtZSA9IGxhc3RNb3ZlPy5tb3ZlID09PSBQQVNTX01PVkU7CiAgaWYgKGFyZ3MuY29uc2VydmF0aXZlUGFzc0FuZElzUm9vdCAmJiBwYXNzV291bGRFbmRHYW1lKSByZXR1cm4gMDsKCiAgY29uc3QgcGxhID0gYXJncy5jdXJyZW50UGxheWVyOwogIGNvbnN0IG9wcCA9IHBsYSA9PT0gJ2JsYWNrJyA/ICd3aGl0ZScgOiAnYmxhY2snOwogIGNvbnN0IGV4cGVjdGVkUGxheWVyczogUGxheWVyW10gPSBbb3BwLCBwbGEsIG9wcCwgcGxhLCBvcHBdOwoKICBsZXQgaW5jbHVkZWQgPSAwOwogIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7CiAgICBjb25zdCBtID0gYXJncy5yZWNlbnRNb3Zlc1thcmdzLnJlY2VudE1vdmVzLmxlbmd0aCAtIDEgLSBpXTsKICAgIGlmICghbSkgYnJlYWs7CiAgICBpZiAobS5wbGF5ZXIgIT09IGV4cGVjdGVkUGxheWVyc1tpXSkgYnJlYWs7CiAgICBpbmNsdWRlZCsrOwogIH0KICByZXR1cm4gaW5jbHVkZWQ7Cn0KCmZ1bmN0aW9uIGNvbXB1dGVLb1BvaW50QWZ0ZXJNb3ZlKHByZXZpb3VzU3RvbmVzOiBVaW50OEFycmF5LCBtb3ZlOiBNb3ZlIHwgbnVsbCk6IG51bWJlciB7CiAgaWYgKCFtb3ZlIHx8IG1vdmUueCA8IDAgfHwgbW92ZS55IDwgMCkgcmV0dXJuIC0xOwoKICBrb1NpbVN0b25lc1NjcmF0Y2guc2V0KHByZXZpb3VzU3RvbmVzKTsKICBrb1NpbVBvc1NjcmF0Y2gua29Qb2ludCA9IC0xOwogIGtvQ2FwdHVyZVN0YWNrU2NyYXRjaC5sZW5ndGggPSAwOwoKICB0cnkgewogICAgcGxheU1vdmUoa29TaW1Qb3NTY3JhdGNoLCBtb3ZlLnkgKiBCT0FSRF9TSVpFICsgbW92ZS54LCBwbGF5ZXJUb0NvbG9yKG1vdmUucGxheWVyKSwga29DYXB0dXJlU3RhY2tTY3JhdGNoKTsKICAgIHJldHVybiBrb1NpbVBvc1NjcmF0Y2gua29Qb2ludDsKICB9IGNhdGNoIHsKICAgIHJldHVybiAtMTsKICB9Cn0KCmZ1bmN0aW9uIGZpbGxJbnB1dHNWN0Zhc3RGb3JQb3NpdGlvbihhcmdzOiB7CiAgYm9hcmQ6IEJvYXJkU3RhdGU7CiAgcHJldmlvdXNCb2FyZD86IEJvYXJkU3RhdGU7CiAgcHJldmlvdXNQcmV2aW91c0JvYXJkPzogQm9hcmRTdGF0ZTsKICBjdXJyZW50UGxheWVyOiBQbGF5ZXI7CiAgbW92ZUhpc3Rvcnk6IE1vdmVbXTsKICBrb21pOiBudW1iZXI7CiAgcnVsZXM6IEdhbWVSdWxlczsKICBjb25zZXJ2YXRpdmVQYXNzQW5kSXNSb290OiBib29sZWFuOwogIG91dFNwYXRpYWw6IEZsb2F0MzJBcnJheTsKICBvdXRHbG9iYWw6IEZsb2F0MzJBcnJheTsKfSk6IHZvaWQgewogIGJvYXJkU3RhdGVUb1N0b25lc0ludG8oYXJncy5ib2FyZCwgc3RvbmVzU2NyYXRjaCk7CgogIGlmIChhcmdzLnByZXZpb3VzQm9hcmQpIGJvYXJkU3RhdGVUb1N0b25lc0ludG8oYXJncy5wcmV2aW91c0JvYXJkLCBwcmV2U3RvbmVzU2NyYXRjaCk7CiAgZWxzZSBwcmV2U3RvbmVzU2NyYXRjaC5zZXQoc3RvbmVzU2NyYXRjaCk7CgogIGlmIChhcmdzLnByZXZpb3VzUHJldmlvdXNCb2FyZCkgYm9hcmRTdGF0ZVRvU3RvbmVzSW50byhhcmdzLnByZXZpb3VzUHJldmlvdXNCb2FyZCwgcHJldlByZXZTdG9uZXNTY3JhdGNoKTsKICBlbHNlIHByZXZQcmV2U3RvbmVzU2NyYXRjaC5zZXQocHJldlN0b25lc1NjcmF0Y2gpOwoKICBjb25zdCBsYXN0TW92ZSA9IGFyZ3MubW92ZUhpc3RvcnkubGVuZ3RoID4gMCA/IGFyZ3MubW92ZUhpc3RvcnlbYXJncy5tb3ZlSGlzdG9yeS5sZW5ndGggLSAxXSEgOiBudWxsOwogIGNvbnN0IHByZXZNb3ZlID0gYXJncy5tb3ZlSGlzdG9yeS5sZW5ndGggPj0gMiA/IGFyZ3MubW92ZUhpc3RvcnlbYXJncy5tb3ZlSGlzdG9yeS5sZW5ndGggLSAyXSEgOiBudWxsOwoKICBjb25zdCBrb1BvaW50ID0gYXJncy5wcmV2aW91c0JvYXJkID8gY29tcHV0ZUtvUG9pbnRBZnRlck1vdmUocHJldlN0b25lc1NjcmF0Y2gsIGxhc3RNb3ZlKSA6IC0xOwogIGNvbnN0IHByZXZLb1BvaW50ID0gYXJncy5wcmV2aW91c1ByZXZpb3VzQm9hcmQgPyBjb21wdXRlS29Qb2ludEFmdGVyTW92ZShwcmV2UHJldlN0b25lc1NjcmF0Y2gsIHByZXZNb3ZlKSA6IC0xOwogIGNvbnN0IHByZXZQcmV2S29Qb2ludCA9IC0xOwoKICBjb25zdCByZWNlbnRNb3ZlcyA9IG1vdmVzVG9SZWNlbnRNb3ZlcyhhcmdzLm1vdmVIaXN0b3J5KTsKICBjb25zdCBudW1UdXJuc09mSGlzdG9yeUluY2x1ZGVkID0gY291bnRIaXN0b3J5VHVybnNJbmNsdWRlZCh7CiAgICByZWNlbnRNb3ZlcywKICAgIGN1cnJlbnRQbGF5ZXI6IGFyZ3MuY3VycmVudFBsYXllciwKICAgIGNvbnNlcnZhdGl2ZVBhc3NBbmRJc1Jvb3Q6IGFyZ3MuY29uc2VydmF0aXZlUGFzc0FuZElzUm9vdCwKICB9KTsKCiAgY29uc3QgcHJldkxhZGRlclN0b25lcyA9IG51bVR1cm5zT2ZIaXN0b3J5SW5jbHVkZWQgPCAxID8gc3RvbmVzU2NyYXRjaCA6IHByZXZTdG9uZXNTY3JhdGNoOwogIGNvbnN0IHByZXZMYWRkZXJLb1BvaW50ID0gbnVtVHVybnNPZkhpc3RvcnlJbmNsdWRlZCA8IDEgPyBrb1BvaW50IDogcHJldktvUG9pbnQ7CgogIGNvbnN0IHByZXZQcmV2TGFkZGVyU3RvbmVzID0gbnVtVHVybnNPZkhpc3RvcnlJbmNsdWRlZCA8IDIgPyBwcmV2TGFkZGVyU3RvbmVzIDogcHJldlByZXZTdG9uZXNTY3JhdGNoOwogIGNvbnN0IHByZXZQcmV2TGFkZGVyS29Qb2ludCA9IG51bVR1cm5zT2ZIaXN0b3J5SW5jbHVkZWQgPCAyID8gcHJldkxhZGRlcktvUG9pbnQgOiBwcmV2UHJldktvUG9pbnQ7CgogIGNvbXB1dGVMaWJlcnR5TWFwSW50byhzdG9uZXNTY3JhdGNoLCBsaWJlcnR5TWFwU2NyYXRjaCk7CiAgaWYgKGFyZ3MucnVsZXMgPT09ICdjaGluZXNlJykgY29tcHV0ZUFyZWFNYXBWN0thdGFHb0ludG8oc3RvbmVzU2NyYXRjaCwgYXJlYU1hcFNjcmF0Y2gpOwoKICBjb21wdXRlTGFkZGVyRmVhdHVyZXNWN0thdGFHb0ludG8oewogICAgc3RvbmVzOiBzdG9uZXNTY3JhdGNoLAogICAga29Qb2ludCwKICAgIGN1cnJlbnRQbGF5ZXI6IHBsYXllclRvQ29sb3IoYXJncy5jdXJyZW50UGxheWVyKSwKICAgIG91dExhZGRlcmVkU3RvbmVzOiBsYWRkZXJlZFN0b25lc1NjcmF0Y2gsCiAgICBvdXRMYWRkZXJXb3JraW5nTW92ZXM6IGxhZGRlcldvcmtpbmdNb3Zlc1NjcmF0Y2gsCiAgfSk7CiAgY29tcHV0ZUxhZGRlcmVkU3RvbmVzVjdLYXRhR29JbnRvKHsKICAgIHN0b25lczogcHJldkxhZGRlclN0b25lcywKICAgIGtvUG9pbnQ6IHByZXZMYWRkZXJLb1BvaW50LAogICAgb3V0TGFkZGVyZWRTdG9uZXM6IHByZXZMYWRkZXJlZFN0b25lc1NjcmF0Y2gsCiAgfSk7CiAgY29tcHV0ZUxhZGRlcmVkU3RvbmVzVjdLYXRhR29JbnRvKHsKICAgIHN0b25lczogcHJldlByZXZMYWRkZXJTdG9uZXMsCiAgICBrb1BvaW50OiBwcmV2UHJldkxhZGRlcktvUG9pbnQsCiAgICBvdXRMYWRkZXJlZFN0b25lczogcHJldlByZXZMYWRkZXJlZFN0b25lc1NjcmF0Y2gsCiAgfSk7CgogIGZpbGxJbnB1dHNWN0Zhc3QoewogICAgc3RvbmVzOiBzdG9uZXNTY3JhdGNoLAogICAga29Qb2ludCwKICAgIGN1cnJlbnRQbGF5ZXI6IGFyZ3MuY3VycmVudFBsYXllciwKICAgIHJlY2VudE1vdmVzLAogICAga29taTogYXJncy5rb21pLAogICAgcnVsZXM6IGFyZ3MucnVsZXMsCiAgICBjb25zZXJ2YXRpdmVQYXNzQW5kSXNSb290OiBhcmdzLmNvbnNlcnZhdGl2ZVBhc3NBbmRJc1Jvb3QsCiAgICBsaWJlcnR5TWFwOiBsaWJlcnR5TWFwU2NyYXRjaCwKICAgIGFyZWFNYXA6IGFyZ3MucnVsZXMgPT09ICdjaGluZXNlJyA/IGFyZWFNYXBTY3JhdGNoIDogdW5kZWZpbmVkLAogICAgbGFkZGVyZWRTdG9uZXM6IGxhZGRlcmVkU3RvbmVzU2NyYXRjaCwKICAgIHByZXZMYWRkZXJlZFN0b25lczogcHJldkxhZGRlcmVkU3RvbmVzU2NyYXRjaCwKICAgIHByZXZQcmV2TGFkZGVyZWRTdG9uZXM6IHByZXZQcmV2TGFkZGVyZWRTdG9uZXNTY3JhdGNoLAogICAgbGFkZGVyV29ya2luZ01vdmVzOiBsYWRkZXJXb3JraW5nTW92ZXNTY3JhdGNoLAogICAgb3V0U3BhdGlhbDogYXJncy5vdXRTcGF0aWFsLAogICAgb3V0R2xvYmFsOiBhcmdzLm91dEdsb2JhbCwKICB9KTsKfQoKbGV0IHNlYXJjaDogTWN0c1NlYXJjaCB8IG51bGwgPSBudWxsOwpsZXQgc2VhcmNoS2V5OiB7CiAgcG9zaXRpb25JZDogc3RyaW5nOwogIG1vZGVsVXJsOiBzdHJpbmc7CiAgYm9hcmRTaXplOiBudW1iZXI7CiAgbWF4Q2hpbGRyZW46IG51bWJlcjsKICBvd25lcnNoaXBNb2RlOiBPd25lcnNoaXBNb2RlOwogIGtvbWk6IG51bWJlcjsKICBjdXJyZW50UGxheWVyOiAnYmxhY2snIHwgJ3doaXRlJzsKICB3aWRlUm9vdE5vaXNlOiBudW1iZXI7CiAgcnVsZXM6IEdhbWVSdWxlczsKICBublJhbmRvbWl6ZTogYm9vbGVhbjsKICBjb25zZXJ2YXRpdmVQYXNzOiBib29sZWFuOwogIHJvaUtleTogc3RyaW5nIHwgbnVsbDsKfSB8IG51bGwgPSBudWxsOwpjb25zdCBsYXRlc3RBbmFseXplQnlHcm91cCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7CmxldCBpbnRlcmFjdGl2ZVRva2VuID0gMDsKY29uc3QgYW5hbHl6ZU1ldGEgPSBuZXcgV2Vha01hcDxLYXRhR29BbmFseXplUmVxdWVzdCwgeyBhbmFseXNpc0dyb3VwOiAnaW50ZXJhY3RpdmUnIHwgJ2JhY2tncm91bmQnOyBpbnRlcmFjdGl2ZVRva2VuOiBudW1iZXIgfT4oKTsKCmZ1bmN0aW9uIGVuc3VyZUJvYXJkU2l6ZUZvcldvcmtlcihib2FyZFNpemU6IG51bWJlcik6IHZvaWQgewogIGlmIChib2FyZFNpemUgPT09IHNjcmF0Y2hCb2FyZFNpemUpIHJldHVybjsKICBzZXRCb2FyZFNpemUoYm9hcmRTaXplKTsKICBzY3JhdGNoQm9hcmRTaXplID0gQk9BUkRfU0laRTsKICBWN19TUEFUSUFMX1NUUklERSA9IEJPQVJEX0FSRUEgKiAyMjsKICBldmFsU3BhdGlhbFY3ID0gbmV3IEZsb2F0MzJBcnJheShWN19TUEFUSUFMX1NUUklERSk7CiAgZXZhbEdsb2JhbFY3ID0gbmV3IEZsb2F0MzJBcnJheShWN19HTE9CQUxfU1RSSURFKTsKICBzdG9uZXNTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CiAgcHJldlN0b25lc1NjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKICBwcmV2UHJldlN0b25lc1NjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKICBrb1NpbVN0b25lc1NjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKICBrb1NpbVBvc1NjcmF0Y2ggPSB7IHN0b25lczoga29TaW1TdG9uZXNTY3JhdGNoLCBrb1BvaW50OiAtMSB9OwogIGxpYmVydHlNYXBTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CiAgYXJlYU1hcFNjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKICBsYWRkZXJlZFN0b25lc1NjcmF0Y2ggPSBuZXcgVWludDhBcnJheShCT0FSRF9BUkVBKTsKICBsYWRkZXJXb3JraW5nTW92ZXNTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CiAgcHJldkxhZGRlcmVkU3RvbmVzU2NyYXRjaCA9IG5ldyBVaW50OEFycmF5KEJPQVJEX0FSRUEpOwogIHByZXZQcmV2TGFkZGVyZWRTdG9uZXNTY3JhdGNoID0gbmV3IFVpbnQ4QXJyYXkoQk9BUkRfQVJFQSk7CiAgZXZhbEJhdGNoQ2FwYWNpdHkgPSAwOwogIGV2YWxCYXRjaFNwYXRpYWxWNyA9IG5ldyBGbG9hdDMyQXJyYXkoMCk7CiAgZXZhbEJhdGNoR2xvYmFsVjcgPSBuZXcgRmxvYXQzMkFycmF5KDApOwogIHNlYXJjaCA9IG51bGw7CiAgc2VhcmNoS2V5ID0gbnVsbDsKfQoKYXN5bmMgZnVuY3Rpb24gaW5pdEJhY2tlbmQoYmFzZVVybD86IHN0cmluZyk6IFByb21pc2U8dm9pZD4gewogIC8vIOajgOafpeS4u+e6v+eoi+aYr+WQpuW3sue7j+WIneWni+WMluS6hiBXZWJHTAogIGNvbnN0IGN1cnJlbnRCYWNrZW5kID0gdGYuZ2V0QmFja2VuZCgpOwogIGlmIChjdXJyZW50QmFja2VuZCA9PT0gJ3dlYmdsJykgewogICAgY29uc29sZS5sb2coJ1tLYXRhR28gV29ya2VyXSBXZWJHTCBhbHJlYWR5IGluaXRpYWxpemVkIGluIG1haW4gdGhyZWFkJyk7CiAgICByZXR1cm47CiAgfQogIAogIC8vIOS4u+e6v+eoi+ayoeWIneWni+WMlu+8jOWwneivleWcqCBXb3JrZXIg5Lit5Yid5aeL5YyWCiAgLy8gTm90ZTogV2ViR0wgaXMgbm90IGF2YWlsYWJsZSBpbiBXZWIgV29ya2VycyAoY2FuJ3QgY3JlYXRlIGNhbnZhcykKICAvLyBUcnkgV0FTTSBiYWNrZW5kICh3b3JrcyBpbiBXZWIgV29ya2VycykKICAKICB0cnkgewogICAgLy8gVXNlIGFic29sdXRlIHBhdGggZm9yIFdBU00gZmlsZXMKICAgIGNvbnN0IHdhc21CYXNlID0gYmFzZVVybCA/IGJhc2VVcmwgKyAndGZqcy8nIDogJy90ZmpzLyc7CiAgICBzZXRXYXNtUGF0aHMod2FzbUJhc2UpOwogICAgY29uc3QgaXNDcm9zc09yaWdpbklzb2xhdGVkID0gKGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IGNyb3NzT3JpZ2luSXNvbGF0ZWQ/OiBib29sZWFuIH0pLmNyb3NzT3JpZ2luSXNvbGF0ZWQgPT09IHRydWU7CiAgICBpZiAoaXNDcm9zc09yaWdpbklzb2xhdGVkKSB7CiAgICAgIGNvbnN0IGhjID0gKGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IG5hdmlnYXRvcj86IHsgaGFyZHdhcmVDb25jdXJyZW5jeT86IG51bWJlciB9IH0pLm5hdmlnYXRvcj8uaGFyZHdhcmVDb25jdXJyZW5jeSA/PyAxOwogICAgICBjb25zdCBudW1UaHJlYWRzID0gTWF0aC5tYXgoMSwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihoYykpKTsKICAgICAgc2V0VGhyZWFkc0NvdW50KG51bVRocmVhZHMpOwogICAgfQogICAgYXdhaXQgdGYuc2V0QmFja2VuZCgnd2FzbScpOwogICAgYXdhaXQgdGYucmVhZHkoKTsKICAgIGNvbnNvbGUubG9nKCdbS2F0YUdvXSBVc2luZyBXQVNNIGJhY2tlbmQgKFdlYkdMIG5vdCBhdmFpbGFibGUgaW4gV29ya2VycyknKTsKICAgIHJldHVybjsKICB9IGNhdGNoIChlcnIpIHsKICAgIGNvbnNvbGUud2FybignW0thdGFHb10gV0FTTSBiYWNrZW5kIGZhaWxlZCwgZmFsbGluZyBiYWNrIHRvIENQVTonLCBlcnIpOwogIH0KICAKICAvLyBMYXN0IHJlc29ydDogQ1BVIGJhY2tlbmQKICBhd2FpdCB0Zi5zZXRCYWNrZW5kKCdjcHUnKTsKICBhd2FpdCB0Zi5yZWFkeSgpOwogIGNvbnNvbGUubG9nKCdbS2F0YUdvXSBVc2luZyBDUFUgYmFja2VuZCcpOwp9CgpmdW5jdGlvbiBtYXliZVVuZ3ppcChkYXRhOiBVaW50OEFycmF5KTogVWludDhBcnJheSB7CiAgLy8gZ3ppcCBtYWdpYyBieXRlcyAweDFmOGIKICBpZiAoZGF0YS5sZW5ndGggPj0gMiAmJiBkYXRhWzBdID09PSAweDFmICYmIGRhdGFbMV0gPT09IDB4OGIpIHJldHVybiBwYWtvLnVuZ3ppcChkYXRhKTsKICByZXR1cm4gZGF0YTsKfQoKbGV0IGxvYWRlZEJhc2VVcmw6IHN0cmluZyB8IHVuZGVmaW5lZDsKCmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUJhY2tlbmQoYmFzZVVybD86IHN0cmluZyk6IFByb21pc2U8dm9pZD4gewogIC8vIOWmguaenCBiYXNlVXJsIOWPmOWMlizpnIDopoHph43mlrDliJ3lp4vljJYKICBpZiAoYmFja2VuZFByb21pc2UgJiYgbG9hZGVkQmFzZVVybCAhPT0gYmFzZVVybCkgewogICAgYmFja2VuZFByb21pc2UgPSBudWxsOwogICAgbG9hZGVkQmFzZVVybCA9IHVuZGVmaW5lZDsKICB9CiAgaWYgKCFiYWNrZW5kUHJvbWlzZSkgewogICAgbG9hZGVkQmFzZVVybCA9IGJhc2VVcmw7CiAgICBiYWNrZW5kUHJvbWlzZSA9IGluaXRCYWNrZW5kKGJhc2VVcmwpCiAgICAgIC50aGVuKCgpID0+IHsKICAgICAgICB0Zi5lbmFibGVQcm9kTW9kZSgpOwogICAgICB9KQogICAgICAuY2F0Y2goKGVycikgPT4gewogICAgICAgIGJhY2tlbmRQcm9taXNlID0gbnVsbDsKICAgICAgICBsb2FkZWRCYXNlVXJsID0gdW5kZWZpbmVkOwogICAgICAgIHRocm93IGVycjsKICAgICAgfSk7CiAgfQogIGF3YWl0IGJhY2tlbmRQcm9taXNlOwp9Cgphc3luYyBmdW5jdGlvbiBlbnN1cmVNb2RlbChtb2RlbFVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7CiAgYXdhaXQgZW5zdXJlQmFja2VuZCgpOwogIGlmIChtb2RlbCAmJiBsb2FkZWRNb2RlbFVybCA9PT0gbW9kZWxVcmwpIHsKICAgIC8vIOaooeWei+W3suWKoOi9vSzlj5HpgIEgMTAwJSDov5vluqblkYrnn6XkuLvnur/nqIsKICAgIHBvc3QoewogICAgICB0eXBlOiAna2F0YWdvOnByb2dyZXNzJywKICAgICAgbG9hZGVkOiAwLAogICAgICB0b3RhbDogMCwKICAgICAgcHJvZ3Jlc3M6IDEwMAogICAgfSk7CiAgICByZXR1cm47CiAgfQoKCiAgLy8g5L2/55So5rWB5byP5LiL6L295Lul5pSv5oyB6L+b5bqm5oql5ZGKCiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2gobW9kZWxVcmwpOwogIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBtb2RlbDogJHtyZXMuc3RhdHVzfSAke3Jlcy5zdGF0dXNUZXh0fWApOwoKICBjb25zdCBjb250ZW50TGVuZ3RoID0gcmVzLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpOwogIGNvbnN0IHRvdGFsID0gY29udGVudExlbmd0aCA/IHBhcnNlSW50KGNvbnRlbnRMZW5ndGgsIDEwKSA6IDA7CgogIGxldCBsb2FkZWQgPSAwOwogIGNvbnN0IGNodW5rczogVWludDhBcnJheVtdID0gW107CgogIGlmIChyZXMuYm9keSkgewogICAgY29uc3QgcmVhZGVyID0gcmVzLmJvZHkuZ2V0UmVhZGVyKCk7CiAgICB3aGlsZSAodHJ1ZSkgewogICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpOwogICAgICBpZiAoZG9uZSkgYnJlYWs7CiAgICAgIGNodW5rcy5wdXNoKHZhbHVlKTsKICAgICAgbG9hZGVkICs9IHZhbHVlLmxlbmd0aDsKCiAgICAgIC8vIOaKpeWRiuS4i+i9vei/m+W6pgogICAgICBpZiAodG90YWwgPiAwKSB7CiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSAobG9hZGVkIC8gdG90YWwpICogMTAwOwogICAgICAgIHBvc3QoewogICAgICAgICAgdHlwZTogJ2thdGFnbzpwcm9ncmVzcycsCiAgICAgICAgICBsb2FkZWQsCiAgICAgICAgICB0b3RhbCwKICAgICAgICAgIHByb2dyZXNzCiAgICAgICAgfSk7CiAgICAgIH0KICAgIH0KCiAgICAvLyDlkIjlubbmiYDmnIkgY2h1bmtzCiAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsb2FkZWQpOwogICAgbGV0IG9mZnNldCA9IDA7CiAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykgewogICAgICBidWYuc2V0KGNodW5rLCBvZmZzZXQpOwogICAgICBvZmZzZXQgKz0gY2h1bmsubGVuZ3RoOwogICAgfQoKICAgIGNvbnN0IGRhdGEgPSBtYXliZVVuZ3ppcChidWYpOwogICAgY29uc3QgcGFyc2VkID0gcGFyc2VLYXRhR29Nb2RlbFY4KGRhdGEpOwogICAgbW9kZWw/LmRpc3Bvc2UoKTsKICAgIG1vZGVsID0gbmV3IEthdGFHb01vZGVsVjhUZihwYXJzZWQpOwogICAgbG9hZGVkTW9kZWxOYW1lID0gcGFyc2VkLm1vZGVsTmFtZTsKICAgIGxvYWRlZE1vZGVsVXJsID0gbW9kZWxVcmw7CiAgICBzZWFyY2ggPSBudWxsOwogICAgc2VhcmNoS2V5ID0gbnVsbDsKCiAgICAvLyBXYXJtdXAgY29tcGlsYXRpb24uCiAgICBjb25zdCBzcGF0aWFsID0gdGYuemVyb3MoWzEsIDE5LCAxOSwgMjJdLCAnZmxvYXQzMicpIGFzIHRmLlRlbnNvcjREOwogICAgY29uc3QgZ2xvYmFsID0gdGYuemVyb3MoWzEsIDE5XSwgJ2Zsb2F0MzInKSBhcyB0Zi5UZW5zb3IyRDsKICAgIGNvbnN0IG91dCA9IG1vZGVsLmZvcndhcmRWYWx1ZU9ubHkoc3BhdGlhbCwgZ2xvYmFsKTsKICAgIGF3YWl0IFByb21pc2UuYWxsKFtvdXQudmFsdWUuZGF0YSgpLCBvdXQuc2NvcmVWYWx1ZS5kYXRhKCldKTsKICAgIHNwYXRpYWwuZGlzcG9zZSgpOwogICAgZ2xvYmFsLmRpc3Bvc2UoKTsKICAgIG91dC52YWx1ZS5kaXNwb3NlKCk7CiAgICBvdXQuc2NvcmVWYWx1ZS5kaXNwb3NlKCk7CiAgfSBlbHNlIHsKICAgIC8vIGZhbGxiYWNrOiDlpoLmnpzkuI3mlK/mjIEgUmVhZGFibGVTdHJlYW0KICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KGF3YWl0IHJlcy5hcnJheUJ1ZmZlcigpKTsKICAgIGNvbnN0IGRhdGEgPSBtYXliZVVuZ3ppcChidWYpOwogICAgY29uc3QgcGFyc2VkID0gcGFyc2VLYXRhR29Nb2RlbFY4KGRhdGEpOwogICAgbW9kZWw/LmRpc3Bvc2UoKTsKICAgIG1vZGVsID0gbmV3IEthdGFHb01vZGVsVjhUZihwYXJzZWQpOwogICAgbG9hZGVkTW9kZWxOYW1lID0gcGFyc2VkLm1vZGVsTmFtZTsKICAgIGxvYWRlZE1vZGVsVXJsID0gbW9kZWxVcmw7CiAgICBzZWFyY2ggPSBudWxsOwogICAgc2VhcmNoS2V5ID0gbnVsbDsKICB9Cn0KCmZ1bmN0aW9uIHBvc3QobXNnOiBLYXRhR29Xb3JrZXJSZXNwb25zZSwgdHJhbnNmZXI/OiBUcmFuc2ZlcmFibGVbXSkgewogIGlmICh0cmFuc2ZlciAmJiB0cmFuc2Zlci5sZW5ndGggPiAwKSBzZWxmLnBvc3RNZXNzYWdlKG1zZywgdHJhbnNmZXIpOwogIGVsc2Ugc2VsZi5wb3N0TWVzc2FnZShtc2cpOwp9Cgphc3luYyBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKG1zZzogS2F0YUdvV29ya2VyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4gewogIGlmIChtc2cudHlwZSA9PT0gJ2thdGFnbzppbml0JykgewogICAgdHJ5IHsKICAgICAgYXdhaXQgZW5zdXJlQmFja2VuZChtc2cuYmFzZVVybCk7CiAgICAgIGF3YWl0IGVuc3VyZU1vZGVsKG1zZy5tb2RlbFVybCk7CiAgICAgIHBvc3QoewogICAgICAgIHR5cGU6ICdrYXRhZ286aW5pdF9yZXN1bHQnLAogICAgICAgIG9rOiB0cnVlLAogICAgICAgIGJhY2tlbmQ6IHRmLmdldEJhY2tlbmQoKSwKICAgICAgICBtb2RlbE5hbWU6IGxvYWRlZE1vZGVsTmFtZSwKICAgICAgfSk7CiAgICB9IGNhdGNoIChlcnIpIHsKICAgICAgY29uc29sZS5lcnJvcignW0thdGFHb1dvcmtlcl0gaW5pdCBlcnJvcjonLCBlcnIpOwogICAgICBwb3N0KHsKICAgICAgICB0eXBlOiAna2F0YWdvOmluaXRfcmVzdWx0JywKICAgICAgICBvazogZmFsc2UsCiAgICAgICAgZXJyb3I6IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKSwKICAgICAgfSk7CiAgICB9CiAgICByZXR1cm47CiAgfQoKICBpZiAobXNnLnR5cGUgPT09ICdrYXRhZ286ZXZhbCcpIHsKICAgIGF3YWl0IGVuc3VyZU1vZGVsKG1zZy5tb2RlbFVybCk7CiAgICBpZiAoIW1vZGVsKSB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIG5vdCBsb2FkZWQnKTsKICAgIGVuc3VyZUJvYXJkU2l6ZUZvcldvcmtlcihtc2cuYm9hcmQubGVuZ3RoKTsKICAgIGNvbnN0IGJvYXJkU2l6ZSA9IEJPQVJEX1NJWkU7CgogICAgY29uc3QgY29uc2VydmF0aXZlUGFzcyA9IG1zZy5jb25zZXJ2YXRpdmVQYXNzICE9PSBmYWxzZTsKICAgIGNvbnN0IHJ1bGVzOiBHYW1lUnVsZXMgPSBtc2cucnVsZXMgPT09ICdjaGluZXNlJyA/ICdjaGluZXNlJyA6IG1zZy5ydWxlcyA9PT0gJ2tvcmVhbicgPyAna29yZWFuJyA6ICdqYXBhbmVzZSc7CgogICAgZmlsbElucHV0c1Y3RmFzdEZvclBvc2l0aW9uKHsKICAgICAgYm9hcmQ6IG1zZy5ib2FyZCwKICAgICAgcHJldmlvdXNCb2FyZDogbXNnLnByZXZpb3VzQm9hcmQsCiAgICAgIHByZXZpb3VzUHJldmlvdXNCb2FyZDogbXNnLnByZXZpb3VzUHJldmlvdXNCb2FyZCwKICAgICAgY3VycmVudFBsYXllcjogbXNnLmN1cnJlbnRQbGF5ZXIsCiAgICAgIG1vdmVIaXN0b3J5OiBtc2cubW92ZUhpc3RvcnksCiAgICAgIGtvbWk6IG1zZy5rb21pLAogICAgICBydWxlcywKICAgICAgY29uc2VydmF0aXZlUGFzc0FuZElzUm9vdDogY29uc2VydmF0aXZlUGFzcywKICAgICAgb3V0U3BhdGlhbDogZXZhbFNwYXRpYWxWNywKICAgICAgb3V0R2xvYmFsOiBldmFsR2xvYmFsVjcsCiAgICB9KTsKCiAgICBjb25zdCBzcGF0aWFsID0gdGYudGVuc29yNGQoZXZhbFNwYXRpYWxWNywgWzEsIGJvYXJkU2l6ZSwgYm9hcmRTaXplLCAyMl0pOwogICAgY29uc3QgZ2xvYmFsID0gdGYudGVuc29yMmQoZXZhbEdsb2JhbFY3LCBbMSwgMTldKTsKICAgIGNvbnN0IG91dCA9IG1vZGVsLmZvcndhcmRWYWx1ZU9ubHkoc3BhdGlhbCwgZ2xvYmFsKTsKICAgIGNvbnN0IFt2YWx1ZUxvZ2l0c0Fyciwgc2NvcmVWYWx1ZUFycl0gPSBhd2FpdCBQcm9taXNlLmFsbChbb3V0LnZhbHVlLmRhdGEoKSwgb3V0LnNjb3JlVmFsdWUuZGF0YSgpXSk7CiAgICBzcGF0aWFsLmRpc3Bvc2UoKTsKICAgIGdsb2JhbC5kaXNwb3NlKCk7CiAgICBvdXQudmFsdWUuZGlzcG9zZSgpOwogICAgb3V0LnNjb3JlVmFsdWUuZGlzcG9zZSgpOwoKICAgIGNvbnN0IGV2YWxlZCA9IHBvc3Rwcm9jZXNzS2F0YUdvVjgoewogICAgICBuZXh0UGxheWVyOiBtc2cuY3VycmVudFBsYXllciwKICAgICAgdmFsdWVMb2dpdHM6IHZhbHVlTG9naXRzQXJyLAogICAgICBzY29yZVZhbHVlOiBzY29yZVZhbHVlQXJyLAogICAgICBwb3N0UHJvY2Vzc1BhcmFtczogbW9kZWwucG9zdFByb2Nlc3NQYXJhbXMsCiAgICB9KTsKCiAgICBwb3N0KHsKICAgICAgdHlwZTogJ2thdGFnbzpldmFsX3Jlc3VsdCcsCiAgICAgIGlkOiBtc2cuaWQsCiAgICAgIG9rOiB0cnVlLAogICAgICBiYWNrZW5kOiB0Zi5nZXRCYWNrZW5kKCksCiAgICAgIG1vZGVsTmFtZTogbG9hZGVkTW9kZWxOYW1lLAogICAgICBldmFsOiB7CiAgICAgICAgcm9vdFdpblJhdGU6IGV2YWxlZC5ibGFja1dpblByb2IsCiAgICAgICAgcm9vdFNjb3JlTGVhZDogZXZhbGVkLmJsYWNrU2NvcmVMZWFkLAogICAgICAgIHJvb3RTY29yZVNlbGZwbGF5OiBldmFsZWQuYmxhY2tTY29yZU1lYW4sCiAgICAgICAgcm9vdFNjb3JlU3RkZXY6IGV2YWxlZC5ibGFja1Njb3JlU3RkZXYsCiAgICAgIH0sCiAgICB9KTsKICAgIHJldHVybjsKICB9CgogIGlmIChtc2cudHlwZSA9PT0gJ2thdGFnbzpldmFsX2JhdGNoJykgewogICAgYXdhaXQgZW5zdXJlTW9kZWwobXNnLm1vZGVsVXJsKTsKICAgIGlmICghbW9kZWwpIHRocm93IG5ldyBFcnJvcignTW9kZWwgbm90IGxvYWRlZCcpOwoKICAgIGNvbnN0IGNvbnNlcnZhdGl2ZVBhc3MgPSBtc2cuY29uc2VydmF0aXZlUGFzcyAhPT0gZmFsc2U7CiAgICBjb25zdCBydWxlczogR2FtZVJ1bGVzID0gbXNnLnJ1bGVzID09PSAnY2hpbmVzZScgPyAnY2hpbmVzZScgOiBtc2cucnVsZXMgPT09ICdrb3JlYW4nID8gJ2tvcmVhbicgOiAnamFwYW5lc2UnOwoKICAgIGNvbnN0IGJhdGNoID0gbXNnLnBvc2l0aW9ucy5sZW5ndGg7CiAgICBpZiAoYmF0Y2ggPD0gMCkgewogICAgICBwb3N0KHsKICAgICAgICB0eXBlOiAna2F0YWdvOmV2YWxfYmF0Y2hfcmVzdWx0JywKICAgICAgICBpZDogbXNnLmlkLAogICAgICAgIG9rOiB0cnVlLAogICAgICAgIGJhY2tlbmQ6IHRmLmdldEJhY2tlbmQoKSwKICAgICAgICBtb2RlbE5hbWU6IGxvYWRlZE1vZGVsTmFtZSwKICAgICAgICBldmFsczogW10sCiAgICAgIH0pOwogICAgICByZXR1cm47CiAgICB9CgogICAgY29uc3QgYm9hcmRTaXplID0gbXNnLnBvc2l0aW9uc1swXSA/IG1zZy5wb3NpdGlvbnNbMF0uYm9hcmQubGVuZ3RoIDogQk9BUkRfU0laRTsKICAgIGVuc3VyZUJvYXJkU2l6ZUZvcldvcmtlcihib2FyZFNpemUpOwogICAgY29uc3Qgc2l6ZSA9IEJPQVJEX1NJWkU7CgogICAgY29uc3QgeyBzcGF0aWFsOiBzcGF0aWFsQmF0Y2gsIGdsb2JhbDogZ2xvYmFsQmF0Y2ggfSA9IGdldEV2YWxCYXRjaEJ1ZmZlcnNWNyhiYXRjaCk7CgogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXRjaDsgaSsrKSB7CiAgICAgIGNvbnN0IHBvcyA9IG1zZy5wb3NpdGlvbnNbaV0hOwogICAgICBmaWxsSW5wdXRzVjdGYXN0Rm9yUG9zaXRpb24oewogICAgICAgIGJvYXJkOiBwb3MuYm9hcmQsCiAgICAgICAgcHJldmlvdXNCb2FyZDogcG9zLnByZXZpb3VzQm9hcmQsCiAgICAgICAgcHJldmlvdXNQcmV2aW91c0JvYXJkOiBwb3MucHJldmlvdXNQcmV2aW91c0JvYXJkLAogICAgICAgIGN1cnJlbnRQbGF5ZXI6IHBvcy5jdXJyZW50UGxheWVyLAogICAgICAgIG1vdmVIaXN0b3J5OiBwb3MubW92ZUhpc3RvcnksCiAgICAgICAga29taTogcG9zLmtvbWksCiAgICAgICAgcnVsZXMsCiAgICAgICAgY29uc2VydmF0aXZlUGFzc0FuZElzUm9vdDogY29uc2VydmF0aXZlUGFzcywKICAgICAgICBvdXRTcGF0aWFsOiBzcGF0aWFsQmF0Y2guc3ViYXJyYXkoaSAqIFY3X1NQQVRJQUxfU1RSSURFLCAoaSArIDEpICogVjdfU1BBVElBTF9TVFJJREUpLAogICAgICAgIG91dEdsb2JhbDogZ2xvYmFsQmF0Y2guc3ViYXJyYXkoaSAqIFY3X0dMT0JBTF9TVFJJREUsIChpICsgMSkgKiBWN19HTE9CQUxfU1RSSURFKSwKICAgICAgfSk7CiAgICB9CgogICAgY29uc3Qgc3BhdGlhbCA9IHRmLnRlbnNvcjRkKHNwYXRpYWxCYXRjaCwgW2JhdGNoLCBzaXplLCBzaXplLCAyMl0pOwogICAgY29uc3QgZ2xvYmFsID0gdGYudGVuc29yMmQoZ2xvYmFsQmF0Y2gsIFtiYXRjaCwgMTldKTsKICAgIGNvbnN0IG91dCA9IG1vZGVsLmZvcndhcmRWYWx1ZU9ubHkoc3BhdGlhbCwgZ2xvYmFsKTsKICAgIGNvbnN0IFt2YWx1ZUxvZ2l0c0Fyciwgc2NvcmVWYWx1ZUFycl0gPSBhd2FpdCBQcm9taXNlLmFsbChbb3V0LnZhbHVlLmRhdGEoKSwgb3V0LnNjb3JlVmFsdWUuZGF0YSgpXSk7CiAgICBzcGF0aWFsLmRpc3Bvc2UoKTsKICAgIGdsb2JhbC5kaXNwb3NlKCk7CiAgICBvdXQudmFsdWUuZGlzcG9zZSgpOwogICAgb3V0LnNjb3JlVmFsdWUuZGlzcG9zZSgpOwoKICAgIGNvbnN0IGV2YWxzID0gbmV3IEFycmF5KGJhdGNoKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmF0Y2g7IGkrKykgewogICAgICBjb25zdCBldmFsZWQgPSBwb3N0cHJvY2Vzc0thdGFHb1Y4KHsKICAgICAgICBuZXh0UGxheWVyOiBtc2cucG9zaXRpb25zW2ldIS5jdXJyZW50UGxheWVyLAogICAgICAgIHZhbHVlTG9naXRzOiB2YWx1ZUxvZ2l0c0Fyci5zdWJhcnJheShpICogMywgaSAqIDMgKyAzKSwKICAgICAgICBzY29yZVZhbHVlOiBzY29yZVZhbHVlQXJyLnN1YmFycmF5KGkgKiA0LCBpICogNCArIDQpLAogICAgICAgIHBvc3RQcm9jZXNzUGFyYW1zOiBtb2RlbC5wb3N0UHJvY2Vzc1BhcmFtcywKICAgICAgfSk7CiAgICAgIGV2YWxzW2ldID0gewogICAgICAgIHJvb3RXaW5SYXRlOiBldmFsZWQuYmxhY2tXaW5Qcm9iLAogICAgICAgIHJvb3RTY29yZUxlYWQ6IGV2YWxlZC5ibGFja1Njb3JlTGVhZCwKICAgICAgICByb290U2NvcmVTZWxmcGxheTogZXZhbGVkLmJsYWNrU2NvcmVNZWFuLAogICAgICAgIHJvb3RTY29yZVN0ZGV2OiBldmFsZWQuYmxhY2tTY29yZVN0ZGV2LAogICAgICB9OwogICAgfQoKICAgIHBvc3QoewogICAgICB0eXBlOiAna2F0YWdvOmV2YWxfYmF0Y2hfcmVzdWx0JywKICAgICAgaWQ6IG1zZy5pZCwKICAgICAgb2s6IHRydWUsCiAgICAgIGJhY2tlbmQ6IHRmLmdldEJhY2tlbmQoKSwKICAgICAgbW9kZWxOYW1lOiBsb2FkZWRNb2RlbE5hbWUsCiAgICAgIGV2YWxzLAogICAgfSk7CiAgICByZXR1cm47CiAgfQoKICBpZiAobXNnLnR5cGUgPT09ICdrYXRhZ286YW5hbHl6ZScpIHsKICAgIGNvbnN0IG1ldGEgPSBhbmFseXplTWV0YS5nZXQobXNnKTsKICAgIGNvbnN0IGFuYWx5c2lzR3JvdXAgPSBtZXRhPy5hbmFseXNpc0dyb3VwID8/IG1zZy5hbmFseXNpc0dyb3VwID8/ICdiYWNrZ3JvdW5kJzsKICAgIGNvbnN0IGludGVyYWN0aXZlVG9rZW5BdEVucXVldWUgPSBtZXRhPy5pbnRlcmFjdGl2ZVRva2VuID8/IGludGVyYWN0aXZlVG9rZW47CiAgICBjb25zdCBpc1N0YWxlID0gKCkgPT4gbGF0ZXN0QW5hbHl6ZUJ5R3JvdXAuZ2V0KGFuYWx5c2lzR3JvdXApICE9PSBtc2cuaWQ7CiAgICBjb25zdCBpc1ByZWVtcHRlZEJ5SW50ZXJhY3RpdmUgPQogICAgICBhbmFseXNpc0dyb3VwICE9PSAnaW50ZXJhY3RpdmUnICYmIGludGVyYWN0aXZlVG9rZW4gIT09IGludGVyYWN0aXZlVG9rZW5BdEVucXVldWU7CiAgICBjb25zdCBzaG91bGRBYm9ydCA9ICgpID0+IGlzU3RhbGUoKSB8fCBpc1ByZWVtcHRlZEJ5SW50ZXJhY3RpdmU7CiAgICBjb25zdCBwb3N0Q2FuY2VsZWQgPSAoKSA9PgogICAgICBwb3N0KHsKICAgICAgICB0eXBlOiAna2F0YWdvOmFuYWx5emVfcmVzdWx0JywKICAgICAgICBpZDogbXNnLmlkLAogICAgICAgIG9rOiBmYWxzZSwKICAgICAgICBjYW5jZWxlZDogdHJ1ZSwKICAgICAgICBlcnJvcjogJ2NhbmNlbGVkJywKICAgICAgfSk7CgogICAgaWYgKHNob3VsZEFib3J0KCkpIHsKICAgICAgcG9zdENhbmNlbGVkKCk7CiAgICAgIHJldHVybjsKICAgIH0KCiAgICBhd2FpdCBlbnN1cmVNb2RlbChtc2cubW9kZWxVcmwpOwogICAgaWYgKCFtb2RlbCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbCBub3QgbG9hZGVkJyk7CiAgICBpZiAoc2hvdWxkQWJvcnQoKSkgewogICAgICBwb3N0Q2FuY2VsZWQoKTsKICAgICAgcmV0dXJuOwogICAgfQoKICAgIGVuc3VyZUJvYXJkU2l6ZUZvcldvcmtlcihtc2cuYm9hcmQubGVuZ3RoKTsKICAgIGNvbnN0IGJvYXJkU2l6ZSA9IEJPQVJEX1NJWkU7CgogICAgY29uc3QgbWF4VmlzaXRzID0gTWF0aC5tYXgoMTYsIE1hdGgubWluKG1zZy52aXNpdHMgPz8gMjU2LCBFTkdJTkVfTUFYX1ZJU0lUUykpOwogICAgY29uc3QgbWF4VGltZU1zID0gTWF0aC5tYXgoMjUsIE1hdGgubWluKG1zZy5tYXhUaW1lTXMgPz8gODAwLCBFTkdJTkVfTUFYX1RJTUVfTVMpKTsKICAgIGNvbnN0IGJhdGNoU2l6ZSA9IE1hdGgubWF4KDEsIE1hdGgubWluKG1zZy5iYXRjaFNpemUgPz8gKHRmLmdldEJhY2tlbmQoKSA9PT0gJ3dlYmdwdScgPyAxNiA6IDQpLCA2NCkpOwogICAgY29uc3QgbWF4Q2hpbGRyZW4gPSBNYXRoLm1heCg0LCBNYXRoLm1pbihtc2cubWF4Q2hpbGRyZW4gPz8gNjQsIEJPQVJEX0FSRUEpKTsKICAgIGNvbnN0IHRvcEsgPSBNYXRoLm1heCgxLCBNYXRoLm1pbihtc2cudG9wSyA/PyAxMCwgNTApKTsKICAgIGNvbnN0IGluY2x1ZGVNb3Zlc093bmVyc2hpcCA9IG1zZy5pbmNsdWRlTW92ZXNPd25lcnNoaXAgPT09IHRydWU7CiAgICBjb25zdCByZXF1ZXN0ZWRPd25lcnNoaXBNb2RlOiBPd25lcnNoaXBNb2RlID0gbXNnLm93bmVyc2hpcE1vZGUgPz8gJ3Jvb3QnOwogICAgY29uc3Qgb3duZXJzaGlwTW9kZTogT3duZXJzaGlwTW9kZSA9IGluY2x1ZGVNb3Zlc093bmVyc2hpcCA/ICd0cmVlJyA6IHJlcXVlc3RlZE93bmVyc2hpcE1vZGU7CiAgICBjb25zdCBhbmFseXNpc1B2TGVuID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obXNnLmFuYWx5c2lzUHZMZW4gPz8gMTUsIDYwKSk7CiAgICBjb25zdCB3aWRlUm9vdE5vaXNlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obXNnLndpZGVSb290Tm9pc2UgPz8gMC4wNCwgNSkpOwogICAgY29uc3QgcnVsZXM6IEdhbWVSdWxlcyA9IG1zZy5ydWxlcyA9PT0gJ2NoaW5lc2UnID8gJ2NoaW5lc2UnIDogbXNnLnJ1bGVzID09PSAna29yZWFuJyA/ICdrb3JlYW4nIDogJ2phcGFuZXNlJzsKICAgIGNvbnN0IG5uUmFuZG9taXplID0gbXNnLm5uUmFuZG9taXplICE9PSBmYWxzZTsKICAgIGNvbnN0IGNvbnNlcnZhdGl2ZVBhc3MgPSBtc2cuY29uc2VydmF0aXZlUGFzcyAhPT0gZmFsc2U7CiAgICBjb25zdCByb2lLZXkgPSByZWdpb25LZXkobXNnLnJlZ2lvbk9mSW50ZXJlc3QpOwogICAgY29uc3QgcmVwb3J0RXZlcnlNc1JhdyA9IG1zZy5yZXBvcnREdXJpbmdTZWFyY2hFdmVyeU1zOwogICAgY29uc3QgcmVwb3J0RXZlcnlNcyA9CiAgICAgIHR5cGVvZiByZXBvcnRFdmVyeU1zUmF3ID09PSAnbnVtYmVyJyAmJiBOdW1iZXIuaXNGaW5pdGUocmVwb3J0RXZlcnlNc1JhdykKICAgICAgICA/IE1hdGgubWF4KDAsIHJlcG9ydEV2ZXJ5TXNSYXcpCiAgICAgICAgOiAwOwogICAgY29uc3Qgc2hvdWxkUmVwb3J0ID0gcmVwb3J0RXZlcnlNcyA+IDA7CiAgICBjb25zdCBjbG9uZUJ1ZmZlcnMgPSBtc2cucmV1c2VUcmVlID09PSB0cnVlIHx8IHNob3VsZFJlcG9ydDsKCiAgICBjb25zdCBjYW5SZXVzZSA9CiAgICAgIG1zZy5yZXVzZVRyZWUgPT09IHRydWUgJiYKICAgICAgdHlwZW9mIG1zZy5wb3NpdGlvbklkID09PSAnc3RyaW5nJyAmJgogICAgICAhIXNlYXJjaCAmJgogICAgICAhIXNlYXJjaEtleSAmJgogICAgICBzZWFyY2hLZXkucG9zaXRpb25JZCA9PT0gbXNnLnBvc2l0aW9uSWQgJiYKICAgICAgc2VhcmNoS2V5Lm1vZGVsVXJsID09PSBtc2cubW9kZWxVcmwgJiYKICAgICAgc2VhcmNoS2V5LmJvYXJkU2l6ZSA9PT0gYm9hcmRTaXplICYmCiAgICAgIHNlYXJjaEtleS5tYXhDaGlsZHJlbiA9PT0gbWF4Q2hpbGRyZW4gJiYKICAgICAgc2VhcmNoS2V5Lm93bmVyc2hpcE1vZGUgPT09IG93bmVyc2hpcE1vZGUgJiYKICAgICAgc2VhcmNoS2V5LmtvbWkgPT09IG1zZy5rb21pICYmCiAgICAgIHNlYXJjaEtleS5jdXJyZW50UGxheWVyID09PSBtc2cuY3VycmVudFBsYXllciAmJgogICAgICBzZWFyY2hLZXkud2lkZVJvb3ROb2lzZSA9PT0gd2lkZVJvb3ROb2lzZSAmJgogICAgICBzZWFyY2hLZXkucnVsZXMgPT09IHJ1bGVzICYmCiAgICAgIHNlYXJjaEtleS5ublJhbmRvbWl6ZSA9PT0gbm5SYW5kb21pemUgJiYKICAgICAgc2VhcmNoS2V5LmNvbnNlcnZhdGl2ZVBhc3MgPT09IGNvbnNlcnZhdGl2ZVBhc3MgJiYKICAgICAgc2VhcmNoS2V5LnJvaUtleSA9PT0gcm9pS2V5OwoKICAgIGxldCByZXVzZWRTZWFyY2ggPSBjYW5SZXVzZTsKCiAgICAvLyBSZS1yb290IHRoZSBleGlzdGluZyBzZWFyY2ggd2hlbiB0aGUgbmV3IHBvc2l0aW9uIGlzIGEgZGlyZWN0IGNoaWxkIG9mIHRoZSBjdXJyZW50IHJvb3QuCiAgICBpZiAoCiAgICAgICFyZXVzZWRTZWFyY2ggJiYKICAgICAgbXNnLnJldXNlVHJlZSA9PT0gdHJ1ZSAmJgogICAgICBzZWFyY2ggJiYKICAgICAgc2VhcmNoS2V5ICYmCiAgICAgIHR5cGVvZiBtc2cucG9zaXRpb25JZCA9PT0gJ3N0cmluZycgJiYKICAgICAgdHlwZW9mIG1zZy5wYXJlbnRQb3NpdGlvbklkID09PSAnc3RyaW5nJwogICAgKSB7CiAgICAgIGNvbnN0IGNhblJlUm9vdCA9CiAgICAgICAgc2VhcmNoS2V5LnBvc2l0aW9uSWQgPT09IG1zZy5wYXJlbnRQb3NpdGlvbklkICYmCiAgICAgICAgc2VhcmNoS2V5Lm1vZGVsVXJsID09PSBtc2cubW9kZWxVcmwgJiYKICAgICAgICBzZWFyY2hLZXkubWF4Q2hpbGRyZW4gPT09IG1heENoaWxkcmVuICYmCiAgICAgICAgc2VhcmNoS2V5Lm93bmVyc2hpcE1vZGUgPT09IG93bmVyc2hpcE1vZGUgJiYKICAgICAgICBzZWFyY2hLZXkua29taSA9PT0gbXNnLmtvbWkgJiYKICAgICAgICBzZWFyY2hLZXkud2lkZVJvb3ROb2lzZSA9PT0gd2lkZVJvb3ROb2lzZSAmJgogICAgICAgIHNlYXJjaEtleS5ydWxlcyA9PT0gcnVsZXMgJiYKICAgICAgICBzZWFyY2hLZXkubm5SYW5kb21pemUgPT09IG5uUmFuZG9taXplICYmCiAgICAgICAgc2VhcmNoS2V5LmNvbnNlcnZhdGl2ZVBhc3MgPT09IGNvbnNlcnZhdGl2ZVBhc3MgJiYKICAgICAgICBzZWFyY2hLZXkucm9pS2V5ID09PSByb2lLZXk7CgogICAgICBpZiAoY2FuUmVSb290KSB7CiAgICAgICAgY29uc3QgbGFzdE1vdmUgPSBtc2cubW92ZUhpc3RvcnlbbXNnLm1vdmVIaXN0b3J5Lmxlbmd0aCAtIDFdID8/IG51bGw7CiAgICAgICAgY29uc3QgbW92ZSA9CiAgICAgICAgICBsYXN0TW92ZSAmJiBsYXN0TW92ZS54ID49IDAgJiYgbGFzdE1vdmUueSA+PSAwID8gbGFzdE1vdmUueSAqIEJPQVJEX1NJWkUgKyBsYXN0TW92ZS54IDogUEFTU19NT1ZFOwogICAgICAgIGlmIChsYXN0TW92ZSkgewogICAgICAgICAgY29uc3QgcmVSb290ZWQgPSBhd2FpdCBzZWFyY2gucmVSb290VG9DaGlsZCh7CiAgICAgICAgICAgIG1vdmUsCiAgICAgICAgICAgIGJvYXJkOiBtc2cuYm9hcmQsCiAgICAgICAgICAgIHByZXZpb3VzQm9hcmQ6IG1zZy5wcmV2aW91c0JvYXJkLAogICAgICAgICAgICBwcmV2aW91c1ByZXZpb3VzQm9hcmQ6IG1zZy5wcmV2aW91c1ByZXZpb3VzQm9hcmQsCiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXI6IG1zZy5jdXJyZW50UGxheWVyLAogICAgICAgICAgICBtb3ZlSGlzdG9yeTogbXNnLm1vdmVIaXN0b3J5LAogICAgICAgICAgICBrb21pOiBtc2cua29taSwKICAgICAgICAgICAgcnVsZXMsCiAgICAgICAgICAgIHJlZ2lvbk9mSW50ZXJlc3Q6IG1zZy5yZWdpb25PZkludGVyZXN0LAogICAgICAgICAgfSk7CiAgICAgICAgICBpZiAocmVSb290ZWQpIHsKICAgICAgICAgICAgcmV1c2VkU2VhcmNoID0gdHJ1ZTsKICAgICAgICAgICAgc2VhcmNoS2V5ID0gewogICAgICAgICAgICAgIHBvc2l0aW9uSWQ6IG1zZy5wb3NpdGlvbklkLAogICAgICAgICAgICAgIG1vZGVsVXJsOiBtc2cubW9kZWxVcmwsCiAgICAgICAgICAgICAgYm9hcmRTaXplLAogICAgICAgICAgICAgIG1heENoaWxkcmVuLAogICAgICAgICAgICAgIG93bmVyc2hpcE1vZGUsCiAgICAgICAgICAgICAga29taTogbXNnLmtvbWksCiAgICAgICAgICAgICAgY3VycmVudFBsYXllcjogbXNnLmN1cnJlbnRQbGF5ZXIsCiAgICAgICAgICAgICAgd2lkZVJvb3ROb2lzZSwKICAgICAgICAgICAgICBydWxlcywKICAgICAgICAgICAgICBublJhbmRvbWl6ZSwKICAgICAgICAgICAgICBjb25zZXJ2YXRpdmVQYXNzLAogICAgICAgICAgICAgIHJvaUtleSwKICAgICAgICAgICAgfTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0KICAgIH0KCiAgICBpZiAoIXJldXNlZFNlYXJjaCkgewogICAgICBzZWFyY2ggPSBhd2FpdCBNY3RzU2VhcmNoLmNyZWF0ZSh7CiAgICAgICAgbW9kZWwsCiAgICAgICAgYm9hcmQ6IG1zZy5ib2FyZCwKICAgICAgICBwcmV2aW91c0JvYXJkOiBtc2cucHJldmlvdXNCb2FyZCwKICAgICAgICBwcmV2aW91c1ByZXZpb3VzQm9hcmQ6IG1zZy5wcmV2aW91c1ByZXZpb3VzQm9hcmQsCiAgICAgICAgY3VycmVudFBsYXllcjogbXNnLmN1cnJlbnRQbGF5ZXIsCiAgICAgICAgbW92ZUhpc3Rvcnk6IG1zZy5tb3ZlSGlzdG9yeSwKICAgICAgICBrb21pOiBtc2cua29taSwKICAgICAgICBydWxlcywKICAgICAgICBublJhbmRvbWl6ZSwKICAgICAgICBjb25zZXJ2YXRpdmVQYXNzLAogICAgICAgIG1heENoaWxkcmVuLAogICAgICAgIG93bmVyc2hpcE1vZGUsCiAgICAgICAgd2lkZVJvb3ROb2lzZSwKICAgICAgICByZWdpb25PZkludGVyZXN0OiBtc2cucmVnaW9uT2ZJbnRlcmVzdCwKICAgICAgfSk7CiAgICAgIGlmICh0eXBlb2YgbXNnLnBvc2l0aW9uSWQgPT09ICdzdHJpbmcnKSB7CiAgICAgICAgc2VhcmNoS2V5ID0gewogICAgICAgICAgcG9zaXRpb25JZDogbXNnLnBvc2l0aW9uSWQsCiAgICAgICAgICBtb2RlbFVybDogbXNnLm1vZGVsVXJsLAogICAgICAgICAgYm9hcmRTaXplLAogICAgICAgICAgbWF4Q2hpbGRyZW4sCiAgICAgICAgICBvd25lcnNoaXBNb2RlLAogICAgICAgICAga29taTogbXNnLmtvbWksCiAgICAgICAgICBjdXJyZW50UGxheWVyOiBtc2cuY3VycmVudFBsYXllciwKICAgICAgICAgIHdpZGVSb290Tm9pc2UsCiAgICAgICAgICBydWxlcywKICAgICAgICAgIG5uUmFuZG9taXplLAogICAgICAgICAgY29uc2VydmF0aXZlUGFzcywKICAgICAgICAgIHJvaUtleSwKICAgICAgICB9OwogICAgICB9IGVsc2UgewogICAgICAgIHNlYXJjaEtleSA9IG51bGw7CiAgICAgIH0KICAgIH0KCiAgICBjb25zdCBwb3N0QW5hbHlzaXMgPSAoYW5hbHlzaXM6IFJldHVyblR5cGU8TWN0c1NlYXJjaFsnZ2V0QW5hbHlzaXMnXT4sIHR5cGU6ICdrYXRhZ286YW5hbHl6ZV91cGRhdGUnIHwgJ2thdGFnbzphbmFseXplX3Jlc3VsdCcpID0+IHsKICAgICAgY29uc3QgdHJhbnNmZXI6IFRyYW5zZmVyYWJsZVtdID0gW107CiAgICAgIGNvbnN0IHB1c2ggPSAodmFsdWU/OiB1bmtub3duKSA9PiB7CiAgICAgICAgaWYgKHZhbHVlICYmIEFycmF5QnVmZmVyLmlzVmlldyh2YWx1ZSkpIHRyYW5zZmVyLnB1c2godmFsdWUuYnVmZmVyKTsKICAgICAgfTsKICAgICAgcHVzaChhbmFseXNpcy5vd25lcnNoaXApOwogICAgICBwdXNoKGFuYWx5c2lzLm93bmVyc2hpcFN0ZGV2KTsKICAgICAgcHVzaChhbmFseXNpcy5wb2xpY3kpOwogICAgICBmb3IgKGNvbnN0IG1vdmUgb2YgYW5hbHlzaXMubW92ZXMpIHB1c2gobW92ZS5vd25lcnNoaXApOwoKICAgICAgcG9zdCgKICAgICAgICB7CiAgICAgICAgICB0eXBlLAogICAgICAgICAgaWQ6IG1zZy5pZCwKICAgICAgICAgIG9rOiB0cnVlLAogICAgICAgICAgYmFja2VuZDogdGYuZ2V0QmFja2VuZCgpLAogICAgICAgICAgbW9kZWxOYW1lOiBsb2FkZWRNb2RlbE5hbWUsCiAgICAgICAgICBhbmFseXNpcywKICAgICAgICB9LAogICAgICAgIHRyYW5zZmVyCiAgICAgICk7CiAgICB9OwoKICAgIGNvbnN0IGJ1aWxkQW5hbHlzaXMgPSAoKSA9PgogICAgICBzZWFyY2ghLmdldEFuYWx5c2lzKHsKICAgICAgICB0b3BLLAogICAgICAgIGluY2x1ZGVNb3Zlc093bmVyc2hpcCwKICAgICAgICBhbmFseXNpc1B2TGVuLAogICAgICAgIGNsb25lQnVmZmVycywKICAgICAgICBvd25lcnNoaXBSZWZyZXNoSW50ZXJ2YWxNczogbXNnLm93bmVyc2hpcFJlZnJlc2hJbnRlcnZhbE1zLAogICAgICB9KTsKCiAgICBpZiAoIXNob3VsZFJlcG9ydCkgewogICAgICBjb25zdCBhYm9ydGVkID0gYXdhaXQgc2VhcmNoIS5ydW4oeyB2aXNpdHM6IG1heFZpc2l0cywgbWF4VGltZU1zLCBiYXRjaFNpemUsIHNob3VsZEFib3J0IH0pOwogICAgICBpZiAoYWJvcnRlZCB8fCBzaG91bGRBYm9ydCgpKSB7CiAgICAgICAgcG9zdENhbmNlbGVkKCk7CiAgICAgICAgaWYgKG1zZy5yZXVzZVRyZWUgIT09IHRydWUpIHsKICAgICAgICAgIHNlYXJjaCA9IG51bGw7CiAgICAgICAgICBzZWFyY2hLZXkgPSBudWxsOwogICAgICAgIH0KICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgcG9zdEFuYWx5c2lzKGJ1aWxkQW5hbHlzaXMoKSwgJ2thdGFnbzphbmFseXplX3Jlc3VsdCcpOwogICAgICBpZiAobXNnLnJldXNlVHJlZSAhPT0gdHJ1ZSkgewogICAgICAgIHNlYXJjaCA9IG51bGw7CiAgICAgICAgc2VhcmNoS2V5ID0gbnVsbDsKICAgICAgfQogICAgICByZXR1cm47CiAgICB9CgogICAgY29uc3QgZGVhZGxpbmUgPSBwZXJmb3JtYW5jZS5ub3coKSArIG1heFRpbWVNczsKICAgIGxldCBsYXN0UmVwb3J0VmlzaXRzID0gLTE7CiAgICB3aGlsZSAodHJ1ZSkgewogICAgICBpZiAoc2hvdWxkQWJvcnQoKSkgewogICAgICAgIHBvc3RDYW5jZWxlZCgpOwogICAgICAgIGlmIChtc2cucmV1c2VUcmVlICE9PSB0cnVlKSB7CiAgICAgICAgICBzZWFyY2ggPSBudWxsOwogICAgICAgICAgc2VhcmNoS2V5ID0gbnVsbDsKICAgICAgICB9CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpOwogICAgICBjb25zdCByZW1haW5pbmcgPSBkZWFkbGluZSAtIG5vdzsKICAgICAgaWYgKHJlbWFpbmluZyA8PSAwKSBicmVhazsKICAgICAgY29uc3Qgc2xpY2VNcyA9IE1hdGgubWluKHJlcG9ydEV2ZXJ5TXMsIHJlbWFpbmluZyk7CiAgICAgIGNvbnN0IGFib3J0ZWQgPSBhd2FpdCBzZWFyY2ghLnJ1bih7IHZpc2l0czogbWF4VmlzaXRzLCBtYXhUaW1lTXM6IHNsaWNlTXMsIGJhdGNoU2l6ZSwgc2hvdWxkQWJvcnQgfSk7CiAgICAgIGlmIChhYm9ydGVkIHx8IHNob3VsZEFib3J0KCkpIHsKICAgICAgICBwb3N0Q2FuY2VsZWQoKTsKICAgICAgICBpZiAobXNnLnJldXNlVHJlZSAhPT0gdHJ1ZSkgewogICAgICAgICAgc2VhcmNoID0gbnVsbDsKICAgICAgICAgIHNlYXJjaEtleSA9IG51bGw7CiAgICAgICAgfQogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBjb25zdCBhbmFseXNpcyA9IGJ1aWxkQW5hbHlzaXMoKTsKICAgICAgY29uc3QgZG9uZSA9IGFuYWx5c2lzLnJvb3RWaXNpdHMgPj0gbWF4VmlzaXRzIHx8IHBlcmZvcm1hbmNlLm5vdygpID49IGRlYWRsaW5lOwogICAgICBpZiAoZG9uZSkgewogICAgICAgIHBvc3RBbmFseXNpcyhhbmFseXNpcywgJ2thdGFnbzphbmFseXplX3Jlc3VsdCcpOwogICAgICAgIGlmIChtc2cucmV1c2VUcmVlICE9PSB0cnVlKSB7CiAgICAgICAgICBzZWFyY2ggPSBudWxsOwogICAgICAgICAgc2VhcmNoS2V5ID0gbnVsbDsKICAgICAgICB9CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGlmIChhbmFseXNpcy5yb290VmlzaXRzID4gbGFzdFJlcG9ydFZpc2l0cykgewogICAgICAgIGxhc3RSZXBvcnRWaXNpdHMgPSBhbmFseXNpcy5yb290VmlzaXRzOwogICAgICAgIHBvc3RBbmFseXNpcyhhbmFseXNpcywgJ2thdGFnbzphbmFseXplX3VwZGF0ZScpOwogICAgICB9CiAgICB9CgogICAgcG9zdEFuYWx5c2lzKGJ1aWxkQW5hbHlzaXMoKSwgJ2thdGFnbzphbmFseXplX3Jlc3VsdCcpOwogICAgaWYgKG1zZy5yZXVzZVRyZWUgIT09IHRydWUpIHsKICAgICAgc2VhcmNoID0gbnVsbDsKICAgICAgc2VhcmNoS2V5ID0gbnVsbDsKICAgIH0KICB9Cn0KCnNlbGYub25tZXNzYWdlID0gKGV2OiBNZXNzYWdlRXZlbnQ8S2F0YUdvV29ya2VyUmVxdWVzdD4pID0+IHsKICBjb25zdCBtc2cgPSBldi5kYXRhOwogIGlmIChtc2cudHlwZSA9PT0gJ2thdGFnbzphbmFseXplJykgewogICAgY29uc3QgYW5hbHlzaXNHcm91cCA9IG1zZy5hbmFseXNpc0dyb3VwID8/ICdiYWNrZ3JvdW5kJzsKICAgIGxhdGVzdEFuYWx5emVCeUdyb3VwLnNldChhbmFseXNpc0dyb3VwLCBtc2cuaWQpOwogICAgaWYgKGFuYWx5c2lzR3JvdXAgPT09ICdpbnRlcmFjdGl2ZScpIGludGVyYWN0aXZlVG9rZW4rKzsKICAgIGFuYWx5emVNZXRhLnNldChtc2csIHsgYW5hbHlzaXNHcm91cCwgaW50ZXJhY3RpdmVUb2tlbiB9KTsKICB9CiAgcXVldWUgPSBxdWV1ZQogICAgLnRoZW4oKCkgPT4gaGFuZGxlTWVzc2FnZShtc2cpKQogICAgLmNhdGNoKChlcnI6IHVua25vd24pID0+IHsKICAgICAgaWYgKG1zZy50eXBlID09PSAna2F0YWdvOmluaXQnKSB7CiAgICAgICAgcG9zdCh7CiAgICAgICAgICB0eXBlOiAna2F0YWdvOmluaXRfcmVzdWx0JywKICAgICAgICAgIG9rOiBmYWxzZSwKICAgICAgICAgIGVycm9yOiBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVyciksCiAgICAgICAgfSk7CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2thdGFnbzpldmFsJykgewogICAgICAgIHBvc3QoewogICAgICAgICAgdHlwZTogJ2thdGFnbzpldmFsX3Jlc3VsdCcsCiAgICAgICAgICBpZDogbXNnLmlkLAogICAgICAgICAgb2s6IGZhbHNlLAogICAgICAgICAgZXJyb3I6IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKSwKICAgICAgICB9KTsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgaWYgKG1zZy50eXBlID09PSAna2F0YWdvOmV2YWxfYmF0Y2gnKSB7CiAgICAgICAgcG9zdCh7CiAgICAgICAgICB0eXBlOiAna2F0YWdvOmV2YWxfYmF0Y2hfcmVzdWx0JywKICAgICAgICAgIGlkOiBtc2cuaWQsCiAgICAgICAgICBvazogZmFsc2UsCiAgICAgICAgICBlcnJvcjogZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IFN0cmluZyhlcnIpLAogICAgICAgIH0pOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBpZiAobXNnLnR5cGUgPT09ICdrYXRhZ286YW5hbHl6ZScpIHsKICAgICAgICBwb3N0KHsKICAgICAgICAgIHR5cGU6ICdrYXRhZ286YW5hbHl6ZV9yZXN1bHQnLAogICAgICAgICAgaWQ6IG1zZy5pZCwKICAgICAgICAgIG9rOiBmYWxzZSwKICAgICAgICAgIGVycm9yOiBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVyciksCiAgICAgICAgfSk7CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICB9KTsKfTsK`,import.meta.url).href}var qG=class{constructor(){zG(this,`worker`,null),zG(this,`nextId`,1),zG(this,`pendingInit`,null),zG(this,`pending`,new Map),zG(this,`pendingEval`,new Map),zG(this,`pendingEvalBatch`,new Map),zG(this,`backend`,null),zG(this,`modelName`,null),zG(this,`lastLoggedEngineLabel`,null),zG(this,`pendingProgress`,null)}async ensureWorker(){var e=this;if(e.worker)return;await VG();let t=KG();e.worker=new Worker(t,{type:`module`}),e.worker.onmessage=t=>{let n=t.data;e.handleMessage(n)}}handleMessage(e){var t;if(e.type===`katago:init_result`){var n;let t=this.pendingInit;if(!t)return;this.pendingInit=null,this.pendingProgress=null,e.ok&&this.syncEngineInfo(e),e.ok?t.resolve():t.reject(Error((n=e.error)==null?`Init failed`:n));return}if(e.type===`katago:progress`){this.pendingProgress&&this.pendingProgress(e.loaded,e.total,e.progress);return}if(e.type===`katago:analyze_update`){let n=this.pending.get(e.id);if(!n||e.canceled||e.error===`canceled`||(this.syncEngineInfo(e),!e.ok||!e.analysis))return;(t=n.onProgress)==null||t.call(n,e.analysis);return}if(e.type===`katago:analyze_result`){var r;let t=this.pending.get(e.id);if(!t)return;if(this.pending.delete(e.id),e.canceled||e.error===`canceled`){t.reject(new UG);return}this.syncEngineInfo(e),!e.ok||!e.analysis?t.reject(Error((r=e.error)==null?`Analysis failed`:r)):t.resolve(e.analysis);return}if(e.type===`katago:eval_result`){var i;let t=this.pendingEval.get(e.id);if(!t)return;this.pendingEval.delete(e.id),this.syncEngineInfo(e),!e.ok||!e.eval?t.reject(Error((i=e.error)==null?`Eval failed`:i)):t.resolve(e.eval);return}if(e.type===`katago:eval_batch_result`){var a;let t=this.pendingEvalBatch.get(e.id);if(!t)return;this.pendingEvalBatch.delete(e.id),this.syncEngineInfo(e),!e.ok||!e.evals?t.reject(Error((a=e.error)==null?`Eval batch failed`:a)):t.resolve(e.evals)}}syncEngineInfo(e){let t=!1;if(typeof e.backend==`string`&&e.backend!==this.backend&&(this.backend=e.backend,t=!0),typeof e.modelName==`string`&&e.modelName!==this.modelName&&(this.modelName=e.modelName,t=!0),!t)return;let n=[];this.backend&&n.push(this.backend),this.modelName&&n.push(this.modelName);let r=n.join(` / `);!r||r===this.lastLoggedEngineLabel||(this.lastLoggedEngineLabel=r)}getEngineInfo(){return{backend:this.backend,modelName:this.modelName}}init(e,t,n){return this.ensureWorker(),this.pendingInit?Promise.reject(Error(`Init already in progress`)):new Promise((r,i)=>{this.pendingInit={resolve:r,reject:i},t&&(this.pendingProgress=t);let a={type:`katago:init`,modelUrl:e,baseUrl:n};this.worker.postMessage(a)})}async analyze(e){var t=this;t.ensureWorker();let n=t.nextId++,r={type:`katago:analyze`,id:n,analysisGroup:e.analysisGroup,positionId:e.positionId,parentPositionId:e.parentPositionId,modelUrl:e.modelUrl,board:e.board,previousBoard:e.previousBoard,previousPreviousBoard:e.previousPreviousBoard,currentPlayer:e.currentPlayer,moveHistory:HG(e.moveHistory),komi:e.komi,rules:e.rules,regionOfInterest:e.regionOfInterest,topK:e.topK,analysisPvLen:e.analysisPvLen,includeMovesOwnership:e.includeMovesOwnership,wideRootNoise:e.wideRootNoise,nnRandomize:e.nnRandomize,conservativePass:e.conservativePass,visits:e.visits,maxTimeMs:e.maxTimeMs,batchSize:e.batchSize,maxChildren:e.maxChildren,reportDuringSearchEveryMs:e.reportDuringSearchEveryMs,ownershipRefreshIntervalMs:e.ownershipRefreshIntervalMs,reuseTree:e.reuseTree,ownershipMode:e.ownershipMode},i=new Promise((r,i)=>{t.pending.set(n,{resolve:r,reject:i,onProgress:e.onProgress})});return t.worker.postMessage(r),i}async evaluate(e){var t=this;t.ensureWorker();let n=t.nextId++,r={type:`katago:eval`,id:n,modelUrl:e.modelUrl,board:e.board,previousBoard:e.previousBoard,previousPreviousBoard:e.previousPreviousBoard,currentPlayer:e.currentPlayer,moveHistory:HG(e.moveHistory),komi:e.komi,rules:e.rules,conservativePass:e.conservativePass},i=new Promise((e,r)=>{t.pendingEval.set(n,{resolve:e,reject:r})});return t.worker.postMessage(r),i}async evaluateBatch(e){var t=this;t.ensureWorker();let n=t.nextId++,r={type:`katago:eval_batch`,id:n,modelUrl:e.modelUrl,positions:e.positions.map(e=>({board:e.board,previousBoard:e.previousBoard,previousPreviousBoard:e.previousPreviousBoard,currentPlayer:e.currentPlayer,moveHistory:HG(e.moveHistory),komi:e.komi})),rules:e.rules,conservativePass:e.conservativePass},i=new Promise((e,r)=>{t.pendingEvalBatch.set(n,{resolve:e,reject:r})});return t.worker.postMessage(r),i}},JG=null;function YG(){return JG||(JG=new qG),JG}GG(p()+`assets/worker.js`);var XG=class{constructor(){e(this,`client`,YG())}async init(e){var t=this;let n=p();return t.client.init(e.modelUrl,e.onProgress,n)}async analyze(e){return this.client.analyze({analysisGroup:e.analysisGroup,positionId:e.positionId,parentPositionId:e.parentPositionId,modelUrl:e.modelUrl,board:e.board,previousBoard:e.previousBoard,previousPreviousBoard:e.previousPreviousBoard,currentPlayer:e.currentPlayer,moveHistory:e.moveHistory,komi:e.komi,rules:e.rules,regionOfInterest:e.regionOfInterest,topK:e.topK,analysisPvLen:e.analysisPvLen,includeMovesOwnership:e.includeMovesOwnership,wideRootNoise:e.wideRootNoise,nnRandomize:e.nnRandomize,conservativePass:e.conservativePass,visits:e.visits,maxTimeMs:e.maxTimeMs,batchSize:e.batchSize,maxChildren:e.maxChildren,reportDuringSearchEveryMs:e.reportDuringSearchEveryMs,ownershipRefreshIntervalMs:e.ownershipRefreshIntervalMs,reuseTree:e.reuseTree,ownershipMode:e.ownershipMode,onProgress:e.onProgress})}async evaluate(e){return this.client.evaluate({modelUrl:e.modelUrl,board:e.board,previousBoard:e.previousBoard,previousPreviousBoard:e.previousPreviousBoard,currentPlayer:e.currentPlayer,moveHistory:e.moveHistory,komi:e.komi,rules:e.rules,conservativePass:e.conservativePass})}async evaluateBatch(e){return this.client.evaluateBatch({modelUrl:e.modelUrl,positions:e.positions,rules:e.rules,conservativePass:e.conservativePass})}getEngineInfo(){return this.client.getEngineInfo()}};function ZG(){return new XG}export{m as a,d as i,_ as n,c as o,p as r,ZG as t};
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Oc(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const St={},$s=[],ri=()=>{},Pf=()=>!1,_a=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ga=n=>n.startsWith("onUpdate:"),$t=Object.assign,Fc=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Ap=Object.prototype.hasOwnProperty,dt=(n,e)=>Ap.call(n,e),Ge=Array.isArray,Ys=n=>io(n)==="[object Map]",cr=n=>io(n)==="[object Set]",Su=n=>io(n)==="[object Date]",Ze=n=>typeof n=="function",It=n=>typeof n=="string",ai=n=>typeof n=="symbol",xt=n=>n!==null&&typeof n=="object",Df=n=>(xt(n)||Ze(n))&&Ze(n.then)&&Ze(n.catch),If=Object.prototype.toString,io=n=>If.call(n),Rp=n=>io(n).slice(8,-1),Lf=n=>io(n)==="[object Object]",Bc=n=>It(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Or=Oc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),va=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},Cp=/-\w/g,Vn=va(n=>n.replace(Cp,e=>e.slice(1).toUpperCase())),Pp=/\B([A-Z])/g,ys=va(n=>n.replace(Pp,"-$1").toLowerCase()),Uf=va(n=>n.charAt(0).toUpperCase()+n.slice(1)),Na=va(n=>n?`on${Uf(n)}`:""),ei=(n,e)=>!Object.is(n,e),jo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Nf=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},xa=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Eu;const ya=()=>Eu||(Eu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ma(n){if(Ge(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=It(i)?Up(i):Ma(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(It(n)||xt(n))return n}const Dp=/;(?![^(]*\))/g,Ip=/:([^]+)/,Lp=/\/\*[^]*?\*\//g;function Up(n){const e={};return n.replace(Lp,"").split(Dp).forEach(t=>{if(t){const i=t.split(Ip);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Vi(n){let e="";if(It(n))e=n;else if(Ge(n))for(let t=0;t<n.length;t++){const i=Vi(n[t]);i&&(e+=i+" ")}else if(xt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Np="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Op=Oc(Np);function Of(n){return!!n||n===""}function Fp(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=ur(n[i],e[i]);return t}function ur(n,e){if(n===e)return!0;let t=Su(n),i=Su(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=ai(n),i=ai(e),t||i)return n===e;if(t=Ge(n),i=Ge(e),t||i)return t&&i?Fp(n,e):!1;if(t=xt(n),i=xt(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!ur(n[o],e[o]))return!1}}return String(n)===String(e)}function zc(n,e){return n.findIndex(t=>ur(t,e))}const Ff=n=>!!(n&&n.__v_isRef===!0),ot=n=>It(n)?n:n==null?"":Ge(n)||xt(n)&&(n.toString===If||!Ze(n.toString))?Ff(n)?ot(n.value):JSON.stringify(n,Bf,2):String(n),Bf=(n,e)=>Ff(e)?Bf(n,e.value):Ys(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[Oa(i,r)+" =>"]=s,t),{})}:cr(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Oa(t))}:ai(e)?Oa(e):xt(e)&&!Ge(e)&&!Lf(e)?String(e):e,Oa=(n,e="")=>{var t;return ai(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};let Wt;class Bp{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Wt&&(Wt.active?(this.parent=Wt,this.index=(Wt.scopes||(Wt.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){const i=this.scopes.slice();for(e=0,t=i.length;e<t;e++)i[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){const s=this.scopes.slice();for(e=0,t=s.length;e<t;e++)s[e].resume()}const i=this.effects.slice();for(e=0,t=i.length;e<t;e++)i[e].resume()}}run(e){if(this._active){const t=Wt;try{return Wt=this,e()}finally{Wt=t}}}on(){++this._on===1&&(this.prevScope=Wt,Wt=this)}off(){if(this._on>0&&--this._on===0){if(Wt===this)Wt=this.prevScope;else{let e=Wt;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(t=0,i=s.length;t<i;t++)s[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function zp(){return Wt}let Et;const Fa=new WeakSet;class zf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Wt&&(Wt.active?Wt.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Fa.has(this)&&(Fa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||kf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,bu(this),Vf(this);const e=Et,t=Gn;Et=this,Gn=!0;try{return this.fn()}finally{Gf(this),Et=e,Gn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Vc(e);this.deps=this.depsTail=void 0,bu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Fa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ll(this)&&this.run()}get dirty(){return Ll(this)}}let Hf=0,Fr,Br;function kf(n,e=!1){if(n.flags|=8,e){n.next=Br,Br=n;return}n.next=Fr,Fr=n}function Hc(){Hf++}function kc(){if(--Hf>0)return;if(Br){let e=Br;for(Br=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Fr;){let e=Fr;for(Fr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Vf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Gf(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),Vc(i),Hp(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Ll(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Wf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Wf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Gr)||(n.globalVersion=Gr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Ll(n))))return;n.flags|=2;const e=n.dep,t=Et,i=Gn;Et=n,Gn=!0;try{Vf(n);const s=n.fn(n._value);(e.version===0||ei(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Et=t,Gn=i,Gf(n),n.flags&=-3}}function Vc(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)Vc(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Hp(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Gn=!0;const Xf=[];function Ti(){Xf.push(Gn),Gn=!1}function wi(){const n=Xf.pop();Gn=n===void 0?!0:n}function bu(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Et;Et=void 0;try{e()}finally{Et=t}}}let Gr=0;class kp{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Gc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Et||!Gn||Et===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Et)t=this.activeLink=new kp(Et,this),Et.deps?(t.prevDep=Et.depsTail,Et.depsTail.nextDep=t,Et.depsTail=t):Et.deps=Et.depsTail=t,$f(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Et.depsTail,t.nextDep=void 0,Et.depsTail.nextDep=t,Et.depsTail=t,Et.deps===t&&(Et.deps=i)}return t}trigger(e){this.version++,Gr++,this.notify(e)}notify(e){Hc();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{kc()}}}function $f(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)$f(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Ul=new WeakMap,ds=Symbol(""),Nl=Symbol(""),Wr=Symbol("");function Jt(n,e,t){if(Gn&&Et){let i=Ul.get(n);i||Ul.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new Gc),s.map=i,s.key=t),s.track()}}function xi(n,e,t,i,s,r){const o=Ul.get(n);if(!o){Gr++;return}const a=l=>{l&&l.trigger()};if(Hc(),e==="clear")o.forEach(a);else{const l=Ge(n),c=l&&Bc(t);if(l&&t==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===Wr||!ai(f)&&f>=u)&&a(h)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(Wr)),e){case"add":l?c&&a(o.get("length")):(a(o.get(ds)),Ys(n)&&a(o.get(Nl)));break;case"delete":l||(a(o.get(ds)),Ys(n)&&a(o.get(Nl)));break;case"set":Ys(n)&&a(o.get(ds));break}}kc()}function Es(n){const e=ft(n);return e===n?e:(Jt(e,"iterate",Wr),Ln(n)?e:e.map(Wn))}function Sa(n){return Jt(n=ft(n),"iterate",Wr),n}function Zn(n,e){return Ai(n)?tr(ps(n)?Wn(e):e):Wn(e)}const Vp={__proto__:null,[Symbol.iterator](){return Ba(this,Symbol.iterator,n=>Zn(this,n))},concat(...n){return Es(this).concat(...n.map(e=>Ge(e)?Es(e):e))},entries(){return Ba(this,"entries",n=>(n[1]=Zn(this,n[1]),n))},every(n,e){return ci(this,"every",n,e,void 0,arguments)},filter(n,e){return ci(this,"filter",n,e,t=>t.map(i=>Zn(this,i)),arguments)},find(n,e){return ci(this,"find",n,e,t=>Zn(this,t),arguments)},findIndex(n,e){return ci(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ci(this,"findLast",n,e,t=>Zn(this,t),arguments)},findLastIndex(n,e){return ci(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ci(this,"forEach",n,e,void 0,arguments)},includes(...n){return za(this,"includes",n)},indexOf(...n){return za(this,"indexOf",n)},join(n){return Es(this).join(n)},lastIndexOf(...n){return za(this,"lastIndexOf",n)},map(n,e){return ci(this,"map",n,e,void 0,arguments)},pop(){return vr(this,"pop")},push(...n){return vr(this,"push",n)},reduce(n,...e){return Tu(this,"reduce",n,e)},reduceRight(n,...e){return Tu(this,"reduceRight",n,e)},shift(){return vr(this,"shift")},some(n,e){return ci(this,"some",n,e,void 0,arguments)},splice(...n){return vr(this,"splice",n)},toReversed(){return Es(this).toReversed()},toSorted(n){return Es(this).toSorted(n)},toSpliced(...n){return Es(this).toSpliced(...n)},unshift(...n){return vr(this,"unshift",n)},values(){return Ba(this,"values",n=>Zn(this,n))}};function Ba(n,e,t){const i=Sa(n),s=i[e]();return i!==n&&!Ln(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=t(r.value)),r}),s}const Gp=Array.prototype;function ci(n,e,t,i,s,r){const o=Sa(n),a=o!==n&&!Ln(n),l=o[e];if(l!==Gp[e]){const h=l.apply(n,r);return a?Wn(h):h}let c=t;o!==n&&(a?c=function(h,f){return t.call(this,Zn(n,h),f,n)}:t.length>2&&(c=function(h,f){return t.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Tu(n,e,t,i){const s=Sa(n),r=s!==n&&!Ln(n);let o=t,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=Zn(n,c)),t.call(this,c,Zn(n,u),h,n)}):t.length>3&&(o=function(c,u,h){return t.call(this,c,u,h,n)}));const l=s[e](o,...i);return a?Zn(n,l):l}function za(n,e,t){const i=ft(n);Jt(i,"iterate",Wr);const s=i[e](...t);return(s===-1||s===!1)&&$c(t[0])?(t[0]=ft(t[0]),i[e](...t)):s}function vr(n,e,t=[]){Ti(),Hc();const i=ft(n)[e].apply(n,t);return kc(),wi(),i}const Wp=Oc("__proto__,__v_isRef,__isVue"),Yf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ai));function Xp(n){ai(n)||(n=String(n));const e=ft(this);return Jt(e,"has",n),e.hasOwnProperty(n)}class qf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?tm:Jf:r?Zf:Kf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=Ge(e);if(!s){let l;if(o&&(l=Vp[t]))return l;if(t==="hasOwnProperty")return Xp}const a=Reflect.get(e,t,Qt(e)?e:i);if((ai(t)?Yf.has(t):Wp(t))||(s||Jt(e,"get",t),r))return a;if(Qt(a)){const l=o&&Bc(t)?a:a.value;return s&&xt(l)?Fl(l):l}return xt(a)?s?Fl(a):er(a):a}}class jf extends qf{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const o=Ge(e)&&Bc(t);if(!this._isShallow){const c=Ai(r);if(!Ln(i)&&!Ai(i)&&(r=ft(r),i=ft(i)),!o&&Qt(r)&&!Qt(i))return c||(r.value=i),!0}const a=o?Number(t)<e.length:dt(e,t),l=Reflect.set(e,t,i,Qt(e)?e:s);return e===ft(s)&&l&&(a?ei(i,r)&&xi(e,"set",t,i):xi(e,"add",t,i)),l}deleteProperty(e,t){const i=dt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&xi(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!ai(t)||!Yf.has(t))&&Jt(e,"has",t),i}ownKeys(e){return Jt(e,"iterate",Ge(e)?"length":ds),Reflect.ownKeys(e)}}class $p extends qf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Yp=new jf,qp=new $p,jp=new jf(!0);const Ol=n=>n,ho=n=>Reflect.getPrototypeOf(n);function Kp(n,e,t){return function(...i){const s=this.__v_raw,r=ft(s),o=Ys(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=t?Ol:e?tr:Wn;return!e&&Jt(r,"iterate",l?Nl:ds),$t(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function fo(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Zp(n,e){const t={get(s){const r=this.__v_raw,o=ft(r),a=ft(s);n||(ei(s,a)&&Jt(o,"get",s),Jt(o,"get",a));const{has:l}=ho(o),c=e?Ol:n?tr:Wn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Jt(ft(s),"iterate",ds),s.size},has(s){const r=this.__v_raw,o=ft(r),a=ft(s);return n||(ei(s,a)&&Jt(o,"has",s),Jt(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ft(a),c=e?Ol:n?tr:Wn;return!n&&Jt(l,"iterate",ds),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return $t(t,n?{add:fo("add"),set:fo("set"),delete:fo("delete"),clear:fo("clear")}:{add(s){const r=ft(this),o=ho(r),a=ft(s),l=!e&&!Ln(s)&&!Ai(s)?a:s;return o.has.call(r,l)||ei(s,l)&&o.has.call(r,s)||ei(a,l)&&o.has.call(r,a)||(r.add(l),xi(r,"add",l,l)),this},set(s,r){!e&&!Ln(r)&&!Ai(r)&&(r=ft(r));const o=ft(this),{has:a,get:l}=ho(o);let c=a.call(o,s);c||(s=ft(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?ei(r,u)&&xi(o,"set",s,r):xi(o,"add",s,r),this},delete(s){const r=ft(this),{has:o,get:a}=ho(r);let l=o.call(r,s);l||(s=ft(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&xi(r,"delete",s,void 0),c},clear(){const s=ft(this),r=s.size!==0,o=s.clear();return r&&xi(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Kp(s,n,e)}),t}function Wc(n,e){const t=Zp(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(dt(t,s)&&s in i?t:i,s,r)}const Jp={get:Wc(!1,!1)},Qp={get:Wc(!1,!0)},em={get:Wc(!0,!1)};const Kf=new WeakMap,Zf=new WeakMap,Jf=new WeakMap,tm=new WeakMap;function nm(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function er(n){return Ai(n)?n:Xc(n,!1,Yp,Jp,Kf)}function im(n){return Xc(n,!1,jp,Qp,Zf)}function Fl(n){return Xc(n,!0,qp,em,Jf)}function Xc(n,e,t,i,s){if(!xt(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const o=nm(Rp(n));if(o===0)return n;const a=new Proxy(n,o===2?i:t);return s.set(n,a),a}function ps(n){return Ai(n)?ps(n.__v_raw):!!(n&&n.__v_isReactive)}function Ai(n){return!!(n&&n.__v_isReadonly)}function Ln(n){return!!(n&&n.__v_isShallow)}function $c(n){return n?!!n.__v_raw:!1}function ft(n){const e=n&&n.__v_raw;return e?ft(e):n}function sm(n){return!dt(n,"__v_skip")&&Object.isExtensible(n)&&Nf(n,"__v_skip",!0),n}const Wn=n=>xt(n)?er(n):n,tr=n=>xt(n)?Fl(n):n;function Qt(n){return n?n.__v_isRef===!0:!1}function tt(n){return rm(n,!1)}function rm(n,e){return Qt(n)?n:new om(n,e)}class om{constructor(e,t){this.dep=new Gc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:ft(e),this._value=t?e:Wn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Ln(e)||Ai(e);e=i?e:ft(e),ei(e,t)&&(this._rawValue=e,this._value=i?e:Wn(e),this.dep.trigger())}}function Rn(n){return Qt(n)?n.value:n}const am={get:(n,e,t)=>e==="__v_raw"?n:Rn(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return Qt(s)&&!Qt(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function Qf(n){return ps(n)?n:new Proxy(n,am)}class lm{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Gc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Gr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Et!==this)return kf(this,!0),!0}get value(){const e=this.dep.track();return Wf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function cm(n,e,t=!1){let i,s;return Ze(n)?i=n:(i=n.get,s=n.set),new lm(i,s,t)}const po={},sa=new WeakMap;let ss;function um(n,e=!1,t=ss){if(t){let i=sa.get(t);i||sa.set(t,i=[]),i.push(n)}}function hm(n,e,t=St){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=t,c=y=>s?y:Ln(y)||s===!1||s===0?yi(y,1):yi(y);let u,h,f,d,_=!1,g=!1;if(Qt(n)?(h=()=>n.value,_=Ln(n)):ps(n)?(h=()=>c(n),_=!0):Ge(n)?(g=!0,_=n.some(y=>ps(y)||Ln(y)),h=()=>n.map(y=>{if(Qt(y))return y.value;if(ps(y))return c(y);if(Ze(y))return l?l(y,2):y()})):Ze(n)?e?h=l?()=>l(n,2):n:h=()=>{if(f){Ti();try{f()}finally{wi()}}const y=ss;ss=u;try{return l?l(n,3,[d]):n(d)}finally{ss=y}}:h=ri,e&&s){const y=h,C=s===!0?1/0:s;h=()=>yi(y(),C)}const m=zp(),p=()=>{u.stop(),m&&m.active&&Fc(m.effects,u)};if(r&&e){const y=e;e=(...C)=>{const P=y(...C);return p(),P}}let S=g?new Array(n.length).fill(po):po;const w=y=>{if(!(!(u.flags&1)||!u.dirty&&!y))if(e){const C=u.run();if(y||s||_||(g?C.some((P,A)=>ei(P,S[A])):ei(C,S))){f&&f();const P=ss;ss=u;try{const A=[C,S===po?void 0:g&&S[0]===po?[]:S,d];S=C,l?l(e,3,A):e(...A)}finally{ss=P}}}else u.run()};return a&&a(w),u=new zf(h),u.scheduler=o?()=>o(w,!1):w,d=y=>um(y,!1,u),f=u.onStop=()=>{const y=sa.get(u);if(y){if(l)l(y,4);else for(const C of y)C();sa.delete(u)}},e?i?w(!0):S=u.run():o?o(w.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function yi(n,e=1/0,t){if(e<=0||!xt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,Qt(n))yi(n.value,e,t);else if(Ge(n))for(let i=0;i<n.length;i++)yi(n[i],e,t);else if(cr(n)||Ys(n))n.forEach(i=>{yi(i,e,t)});else if(Lf(n)){for(const i in n)yi(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&yi(n[i],e,t)}return n}function so(n,e,t,i){try{return i?n(...i):n()}catch(s){Ea(s,e,t)}}function Xn(n,e,t,i){if(Ze(n)){const s=so(n,e,t,i);return s&&Df(s)&&s.catch(r=>{Ea(r,e,t)}),s}if(Ge(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Xn(n[r],e,t,i));return s}}function Ea(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||St;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){Ti(),so(r,null,10,[n,l,c]),wi();return}}fm(n,t,s,i,o)}function fm(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const rn=[];let jn=-1;const qs=[];let Bi=null,ks=0;const ed=Promise.resolve();let ra=null;function Yc(n){const e=ra||ed;return n?e.then(this?n.bind(this):n):e}function dm(n){let e=jn+1,t=rn.length;for(;e<t;){const i=e+t>>>1,s=rn[i],r=Xr(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function qc(n){if(!(n.flags&1)){const e=Xr(n),t=rn[rn.length-1];!t||!(n.flags&2)&&e>=Xr(t)?rn.push(n):rn.splice(dm(e),0,n),n.flags|=1,td()}}function td(){ra||(ra=ed.then(id))}function pm(n){if(!Ge(n))Bi&&n.id===-1?Bi.splice(ks+1,0,n):n.flags&1||(qs.push(n),n.flags|=1);else for(let e=0;e<n.length;e++)qs.push(n[e]);td()}function wu(n,e,t=jn+1){for(;t<rn.length;t++){const i=rn[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;rn.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function nd(n){if(qs.length){const e=[...new Set(qs)].sort((t,i)=>Xr(t)-Xr(i));if(qs.length=0,Bi){for(let t=0;t<e.length;t++)Bi.push(e[t]);return}for(Bi=e,ks=0;ks<Bi.length;ks++){const t=Bi[ks];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Bi=null,ks=0}}const Xr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function id(n){try{for(jn=0;jn<rn.length;jn++){const e=rn[jn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),so(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;jn<rn.length;jn++){const e=rn[jn];e&&(e.flags&=-2)}jn=-1,rn.length=0,nd(),ra=null,(rn.length||qs.length)&&id()}}let In=null,sd=null;function oa(n){const e=In;return In=n,sd=n&&n.type.__scopeId||null,e}function mm(n,e=In,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Fu(-1);const r=oa(e),o=ms.length;let a;try{a=n(...s)}finally{for(let l=ms.length;l>o;l--)Rd();oa(r),i._d&&Fu(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Kn(n,e){if(In===null)return n;const t=Ca(In),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,o,a,l=St]=e[s];r&&(Ze(r)&&(r={mounted:r,updated:r}),r.deep&&yi(o),i.push({dir:r,instance:t,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function qi(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Ti(),Xn(l,t,8,[n.el,a,n,e]),wi())}}function _m(n,e){if(on){let t=on.provides;const i=on.parent&&on.parent.provides;i===t&&(t=on.provides=Object.create(i)),t[n]=e}}function Ko(n,e,t=!1){const i=h_();if(i||Ks){let s=Ks?Ks._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Ze(e)?e.call(i&&i.proxy):e}}const gm=Symbol.for("v-scx"),vm=()=>Ko(gm);function js(n,e,t){return rd(n,e,t)}function rd(n,e,t=St){const{immediate:i,deep:s,flush:r,once:o}=t,a=$t({},t),l=e&&i||!e&&r!=="post";let c;if(qr){if(r==="sync"){const d=vm();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=ri,d.resume=ri,d.pause=ri,d}}const u=on;a.call=(d,_,g)=>Xn(d,u,_,g);let h=!1;r==="post"?a.scheduler=d=>{un(d,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(d,_)=>{_?d():qc(d)}),a.augmentJob=d=>{e&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=hm(n,e,a);return qr&&(c?c.push(f):l&&f()),f}function xm(n,e,t){const i=this.proxy,s=It(n)?n.includes(".")?od(i,n):()=>i[n]:n.bind(i,i);let r;Ze(e)?r=e:(r=e.handler,t=e);const o=ro(this),a=rd(s,r.bind(i),t);return o(),a}function od(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const ym=Symbol("_vte"),ba=n=>n.__isTeleport,Ha=Symbol("_leaveCb");function Mm(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==Ri){e=t;break}}return e}function ad(n){if(!Kc(n))return ba(n.type)&&n.children?Mm(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&Ze(t.default))return t.default()}}function jc(n,e){if(n.shapeFlag&6&&n.component){n.transition=e;const t=n.component.subTree;jc(ba(t.type)&&ad(t)||t,e)}else n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Ta(n,e){return Ze(n)?$t({name:n.name},e,{setup:n}):n}function ld(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Au(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const aa=new WeakMap;function zr(n,e,t,i,s=!1){if(Ge(n)){n.forEach((g,m)=>zr(g,e&&(Ge(e)?e[m]:e),t,i,s));return}if(Hr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&zr(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?Ca(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=e&&e.r,u=a.refs===St?a.refs={}:a.refs,h=a.setupState,f=ft(h),d=h===St?Pf:g=>Au(u,g)?!1:dt(f,g),_=(g,m)=>!(m&&Au(u,m));if(c!=null&&c!==l){if(Ru(e),It(c))u[c]=null,d(c)&&(h[c]=null);else if(Qt(c)){const g=e;_(c,g.k)&&(c.value=null),g.k&&(u[g.k]=null)}}if(Ze(l))so(l,a,12,[o,u]);else{const g=It(l),m=Qt(l);if(g||m){const p=()=>{if(n.f){const S=g?d(l)?h[l]:u[l]:_()||!n.k?l.value:u[n.k];if(s)Ge(S)&&Fc(S,r);else if(Ge(S))S.includes(r)||S.push(r);else if(g)u[l]=[r],d(l)&&(h[l]=u[l]);else{const w=[r];_(l,n.k)&&(l.value=w),n.k&&(u[n.k]=w)}}else g?(u[l]=o,d(l)&&(h[l]=o)):m&&(_(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const S=()=>{p(),aa.delete(n)};S.id=-1,aa.set(n,S),un(S,t)}else Ru(n),p()}}}function Ru(n){const e=aa.get(n);e&&(e.flags|=8,aa.delete(n))}ya().requestIdleCallback;ya().cancelIdleCallback;const Hr=n=>!!n.type.__asyncLoader,Kc=n=>n.type.__isKeepAlive;function Sm(n,e){cd(n,"a",e)}function Em(n,e){cd(n,"da",e)}function cd(n,e,t=on){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(wa(e,i,t),t){let s=t.parent;for(;s&&s.parent;)Kc(s.parent.vnode)&&bm(i,e,t,s),s=s.parent}}function bm(n,e,t,i){const s=wa(e,n,i,!0);ud(()=>{Fc(i[e],s)},t)}function wa(n,e,t=on,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{Ti();const a=ro(t),l=Xn(e,t,n,o);return a(),wi(),l});return i?s.unshift(r):s.push(r),r}}const Pi=n=>(e,t=on)=>{(!qr||n==="sp")&&wa(n,(...i)=>e(...i),t)},Tm=Pi("bm"),Zc=Pi("m"),wm=Pi("bu"),Am=Pi("u"),Jc=Pi("bum"),ud=Pi("um"),Rm=Pi("sp"),Cm=Pi("rtg"),Pm=Pi("rtc");function Dm(n,e=on){wa("ec",n,e)}const Im=Symbol.for("v-ndc");function zn(n,e,t,i){let s;const r=t,o=Ge(n);if(o||It(n)){const a=o&&ps(n);let l=!1,c=!1;a&&(l=!Ln(n),c=Ai(n),n=Sa(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=e(l?c?tr(Wn(n[u])):Wn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=e(a+1,a,void 0,r)}else if(xt(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>e(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}const Bl=n=>n?Id(n)?Ca(n):Bl(n.parent):null,kr=$t(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Bl(n.parent),$root:n=>Bl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>fd(n),$forceUpdate:n=>n.f||(n.f=()=>{qc(n.update)}),$nextTick:n=>n.n||(n.n=Yc.bind(n.proxy)),$watch:n=>xm.bind(n)}),ka=(n,e)=>n!==St&&!n.__isScriptSetup&&dt(n,e),Lm={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(e[0]!=="$"){const f=o[e];if(f!==void 0)switch(f){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(ka(i,e))return o[e]=1,i[e];if(s!==St&&dt(s,e))return o[e]=2,s[e];if(dt(r,e))return o[e]=3,r[e];if(t!==St&&dt(t,e))return o[e]=4,t[e];zl&&(o[e]=0)}}const c=kr[e];let u,h;if(c)return e==="$attrs"&&Jt(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[e]))return u;if(t!==St&&dt(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,dt(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return ka(s,e)?(s[e]=t,!0):i!==St&&dt(i,e)?(i[e]=t,!0):dt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(t[a]||n!==St&&a[0]!=="$"&&dt(n,a)||ka(e,a)||dt(r,a)||dt(i,a)||dt(kr,a)||dt(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:dt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Cu(n){return Ge(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let zl=!0;function Um(n){const e=fd(n),t=n.proxy,i=n.ctx;zl=!1,e.beforeCreate&&Pu(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:_,activated:g,deactivated:m,beforeDestroy:p,beforeUnmount:S,destroyed:w,unmounted:y,render:C,renderTracked:P,renderTriggered:A,errorCaptured:R,serverPrefetch:M,expose:E,inheritAttrs:I,components:F,directives:j,filters:ie}=e;if(c&&Nm(c,i,null),o)for(const K in o){const k=o[K];Ze(k)&&(i[K]=k.bind(t))}if(s){const K=s.call(t,t);xt(K)&&(n.data=er(K))}if(zl=!0,r)for(const K in r){const k=r[K],le=Ze(k)?k.bind(t,t):Ze(k.get)?k.get.bind(t,t):ri,ve=!Ze(k)&&Ze(k.set)?k.set.bind(t):ri,be=hn({get:le,set:ve});Object.defineProperty(i,K,{enumerable:!0,configurable:!0,get:()=>be.value,set:Fe=>be.value=Fe})}if(a)for(const K in a)hd(a[K],i,t,K);if(l){const K=Ze(l)?l.call(t):l;Reflect.ownKeys(K).forEach(k=>{_m(k,K[k])})}u&&Pu(u,n,"c");function q(K,k){Ge(k)?k.forEach(le=>K(le.bind(t))):k&&K(k.bind(t))}if(q(Tm,h),q(Zc,f),q(wm,d),q(Am,_),q(Sm,g),q(Em,m),q(Dm,R),q(Pm,P),q(Cm,A),q(Jc,S),q(ud,y),q(Rm,M),Ge(E))if(E.length){const K=n.exposed||(n.exposed={});E.forEach(k=>{Object.defineProperty(K,k,{get:()=>t[k],set:le=>t[k]=le,enumerable:!0})})}else n.exposed||(n.exposed={});C&&n.render===ri&&(n.render=C),I!=null&&(n.inheritAttrs=I),F&&(n.components=F),j&&(n.directives=j),M&&ld(n)}function Nm(n,e,t=ri){Ge(n)&&(n=Hl(n));for(const i in n){const s=n[i];let r;xt(s)?"default"in s?r=Ko(s.from||i,s.default,!0):r=Ko(s.from||i):r=Ko(s),Qt(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[i]=r}}function Pu(n,e,t){Xn(Ge(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function hd(n,e,t,i){let s=i.includes(".")?od(t,i):()=>t[i];if(It(n)){const r=e[n];Ze(r)&&js(s,r)}else if(Ze(n))js(s,n.bind(t));else if(xt(n))if(Ge(n))n.forEach(r=>hd(r,e,t,i));else{const r=Ze(n.handler)?n.handler.bind(t):e[n.handler];Ze(r)&&js(s,r,n)}}function fd(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(e);let l;return a?l=a:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>la(l,c,o,!0)),la(l,e,o)),xt(e)&&r.set(e,l),l}function la(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&la(n,r,t,!0),s&&s.forEach(o=>la(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=Om[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const Om={data:Du,props:Iu,emits:Iu,methods:Dr,computed:Dr,beforeCreate:nn,created:nn,beforeMount:nn,mounted:nn,beforeUpdate:nn,updated:nn,beforeDestroy:nn,beforeUnmount:nn,destroyed:nn,unmounted:nn,activated:nn,deactivated:nn,errorCaptured:nn,serverPrefetch:nn,components:Dr,directives:Dr,watch:Bm,provide:Du,inject:Fm};function Du(n,e){return e?n?function(){return $t(Ze(n)?n.call(this,this):n,Ze(e)?e.call(this,this):e)}:e:n}function Fm(n,e){return Dr(Hl(n),Hl(e))}function Hl(n){if(Ge(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function nn(n,e){return n?[...new Set([].concat(n,e))]:e}function Dr(n,e){return n?$t(Object.create(null),n,e):e}function Iu(n,e){return n?Ge(n)&&Ge(e)?[...new Set([...n,...e])]:$t(Object.create(null),Cu(n),Cu(e??{})):e}function Bm(n,e){if(!n)return e;if(!e)return n;const t=$t(Object.create(null),n);for(const i in e)t[i]=nn(n[i],e[i]);return t}function dd(){return{app:null,config:{isNativeTag:Pf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zm=0;function Hm(n,e){return function(i,s=null){Ze(i)||(i=$t({},i)),s!=null&&!xt(s)&&(s=null);const r=dd(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:zm++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:g_,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&Ze(u.install)?(o.add(u),u.install(c,...h)):Ze(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||oi(i,s);return d.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(d,u,f),l=!0,c._container=u,u.__vue_app__=c,Ca(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Xn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Ks;Ks=c;try{return u()}finally{Ks=h}}};return c}}let Ks=null;const km=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Vn(e)}Modifiers`]||n[`${ys(e)}Modifiers`];function Vm(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||St;let s=t;const r=e.startsWith("update:"),o=r&&km(i,e.slice(7));o&&(o.trim&&(s=t.map(u=>It(u)?u.trim():u)),o.number&&(s=t.map(xa)));let a,l=i[a=Na(e)]||i[a=Na(Vn(e))];!l&&r&&(l=i[a=Na(ys(e))]),l&&Xn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Xn(c,n,6,s)}}const Gm=new WeakMap;function pd(n,e,t=!1){const i=t?Gm:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Ze(n)){const l=c=>{const u=pd(c,e,!0);u&&(a=!0,$t(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(xt(n)&&i.set(n,null),null):(Ge(r)?r.forEach(l=>o[l]=null):$t(o,r),xt(n)&&i.set(n,o),o)}function Aa(n,e){return!n||!_a(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),dt(n,e[0].toLowerCase()+e.slice(1))||dt(n,ys(e))||dt(n,e))}function Lu(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:_,inheritAttrs:g}=n,m=oa(n);let p,S;try{if(t.shapeFlag&4){const y=s||i,C=y;p=Jn(c.call(C,y,u,h,d,f,_)),S=a}else{const y=e;p=Jn(y.length>1?y(h,{attrs:a,slots:o,emit:l}):y(h,null)),S=e.props?a:Wm(a)}}catch(y){ms.length=0,Ea(y,n,1),p=oi(Ri)}let w=p;if(S&&g!==!1){const y=Object.keys(S),{shapeFlag:C}=w;y.length&&C&7&&(r&&y.some(ga)&&(S=Xm(S,r)),w=nr(w,S,!1,!0))}if(t.dirs&&(w=nr(w,null,!1,!0),w.dirs=w.dirs?w.dirs.concat(t.dirs):t.dirs),t.transition){const y=ba(w.type)&&ad(w)||w;jc(y,t.transition)}return p=w,oa(m),p}const Wm=n=>{let e;for(const t in n)(t==="class"||t==="style"||_a(t))&&((e||(e={}))[t]=n[t]);return e},Xm=(n,e)=>{const t={};for(const i in n)(!ga(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function $m(n,e,t){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Uu(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(md(o,i,f)&&!Aa(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Uu(i,o,c):!0:!!o;return!1}function Uu(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(md(e,n,r)&&!Aa(t,r))return!0}return!1}function md(n,e,t){const i=n[t],s=e[t];return t==="style"&&xt(i)&&xt(s)?!ur(i,s):i!==s}function Ym({vnode:n,parent:e,suspense:t},i){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=e.vnode).el=i,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=i)}const _d={},gd=()=>Object.create(_d),vd=n=>Object.getPrototypeOf(n)===_d;function qm(n,e,t,i=!1){const s={},r=gd();n.propsDefaults=Object.create(null),xd(n,e,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:im(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function jm(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ft(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Aa(n.emitsOptions,f))continue;const d=e[f];if(l)if(dt(r,f))d!==r[f]&&(r[f]=d,c=!0);else{const _=Vn(f);s[_]=kl(l,a,_,d,n,!1)}else d!==r[f]&&(r[f]=d,c=!0)}}}else{xd(n,e,s,r)&&(c=!0);let u;for(const h in a)(!e||!dt(e,h)&&((u=ys(h))===h||!dt(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=kl(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!e||!dt(e,h))&&(delete r[h],c=!0)}c&&xi(n.attrs,"set","")}function xd(n,e,t,i){const[s,r]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Or(l))continue;const c=e[l];let u;s&&dt(s,u=Vn(l))?!r||!r.includes(u)?t[u]=c:(a||(a={}))[u]=c:Aa(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ft(t),c=a||St;for(let u=0;u<r.length;u++){const h=r[u];t[h]=kl(s,l,h,c[h],n,!dt(c,h))}}return o}function kl(n,e,t,i,s,r){const o=n[t];if(o!=null){const a=dt(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ze(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=ro(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ys(t))&&(i=!0))}return i}const Km=new WeakMap;function yd(n,e,t=!1){const i=t?Km:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Ze(n)){const u=h=>{l=!0;const[f,d]=yd(h,e,!0);$t(o,f),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return xt(n)&&i.set(n,$s),$s;if(Ge(r))for(let u=0;u<r.length;u++){const h=Vn(r[u]);Nu(h)&&(o[h]=St)}else if(r)for(const u in r){const h=Vn(u);if(Nu(h)){const f=r[u],d=o[h]=Ge(f)||Ze(f)?{type:f}:$t({},f),_=d.type;let g=!1,m=!0;if(Ge(_))for(let p=0;p<_.length;++p){const S=_[p],w=Ze(S)&&S.name;if(w==="Boolean"){g=!0;break}else w==="String"&&(m=!1)}else g=Ze(_)&&_.name==="Boolean";d[0]=g,d[1]=m,(g||dt(d,"default"))&&a.push(h)}}const c=[o,a];return xt(n)&&i.set(n,c),c}function Nu(n){return n[0]!=="$"&&!Or(n)}const Qc=n=>n==="_"||n==="_ctx"||n==="$stable",eu=n=>Ge(n)?n.map(Jn):[Jn(n)],Zm=(n,e,t)=>{if(e._n)return e;const i=mm((...s)=>eu(e(...s)),t);return i._c=!1,i},Md=(n,e,t)=>{const i=n._ctx;for(const s in n){if(Qc(s))continue;const r=n[s];if(Ze(r))e[s]=Zm(s,r,i);else if(r!=null){const o=eu(r);e[s]=()=>o}}},Sd=(n,e)=>{const t=eu(e);n.slots.default=()=>t},Ed=(n,e,t)=>{for(const i in e)(t||!Qc(i))&&(n[i]=e[i])},Jm=(n,e,t)=>{const i=n.slots=gd();if(n.vnode.shapeFlag&32){const s=e._;s?(Ed(i,e,t),t&&Nf(i,"_",s,!0)):Md(e,i)}else e&&Sd(n,e)},Qm=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,o=St;if(i.shapeFlag&32){const a=e._;a?t&&a===1?r=!1:Ed(s,e,t):(r=!e.$stable,Md(e,s)),o=e}else e&&(Sd(n,e),o={default:1});if(r)for(const a in s)!Qc(a)&&o[a]==null&&delete s[a]},un=s_;function e_(n){return t_(n)}function t_(n,e){const t=ya();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=ri,insertStaticContent:_}=n,g=(D,v,W,Z=null,Y=null,H=null,fe=void 0,J=null,re=!!v.dynamicChildren)=>{if(D===v)return;D&&!xr(D,v)&&(Z=ue(D),Fe(D,Y,H,!0),D=null),v.patchFlag===-2&&(re=!1,v.dynamicChildren=null);const{type:ne,ref:Se,shapeFlag:b}=v;switch(ne){case Ra:m(D,v,W,Z);break;case Ri:p(D,v,W,Z);break;case Ga:D==null&&S(v,W,Z,fe);break;case Ut:F(D,v,W,Z,Y,H,fe,J,re);break;default:b&1?C(D,v,W,Z,Y,H,fe,J,re):b&6?j(D,v,W,Z,Y,H,fe,J,re):(b&64||b&128)&&ne.process(D,v,W,Z,Y,H,fe,J,re,Ue)}Se!=null&&Y?zr(Se,D&&D.ref,H,v||D,!v):Se==null&&D&&D.ref!=null&&zr(D.ref,null,H,D,!0)},m=(D,v,W,Z)=>{if(D==null)i(v.el=a(v.children),W,Z);else{const Y=v.el=D.el;v.children!==D.children&&c(Y,v.children)}},p=(D,v,W,Z)=>{D==null?i(v.el=l(v.children||""),W,Z):v.el=D.el},S=(D,v,W,Z)=>{[D.el,D.anchor]=_(D.children,v,W,Z,D.el,D.anchor)},w=({el:D,anchor:v},W,Z)=>{let Y;for(;D&&D!==v;)Y=f(D),i(D,W,Z),D=Y;i(v,W,Z)},y=({el:D,anchor:v})=>{let W;for(;D&&D!==v;)W=f(D),s(D),D=W;s(v)},C=(D,v,W,Z,Y,H,fe,J,re)=>{if(v.type==="svg"?fe="svg":v.type==="math"&&(fe="mathml"),D==null)P(v,W,Z,Y,H,fe,J,re);else{const ne=D.el&&D.el._isVueCE?D.el:null;try{ne&&ne._beginPatch(),M(D,v,Y,H,fe,J,re)}finally{ne&&ne._endPatch()}}},P=(D,v,W,Z,Y,H,fe,J)=>{let re,ne;const{props:Se,shapeFlag:b,transition:x,dirs:U}=D;if(re=D.el=o(D.type,H,Se&&Se.is,Se),b&8?u(re,D.children):b&16&&R(D.children,re,null,Z,Y,Va(D,H),fe,J),U&&qi(D,null,Z,"created"),A(re,D,D.scopeId,fe,Z),Se){for(const se in Se)se!=="value"&&!Or(se)&&r(re,se,null,Se[se],H,Z);"value"in Se&&r(re,"value",null,Se.value,H),(ne=Se.onVnodeBeforeMount)&&Yn(ne,Z,D)}U&&qi(D,null,Z,"beforeMount");const X=n_(Y,x);X&&x.beforeEnter(re),i(re,v,W),((ne=Se&&Se.onVnodeMounted)||X||U)&&un(()=>{ne&&Yn(ne,Z,D),X&&x.enter(re),U&&qi(D,null,Z,"mounted")},Y)},A=(D,v,W,Z,Y)=>{if(W&&d(D,W),Z)for(let H=0;H<Z.length;H++)d(D,Z[H]);if(Y){let H=Y.subTree;if(v===H||Ad(H.type)&&(H.ssContent===v||H.ssFallback===v)){const fe=Y.vnode;A(D,fe,fe.scopeId,fe.slotScopeIds,Y.parent)}}},R=(D,v,W,Z,Y,H,fe,J,re=0)=>{for(let ne=re;ne<D.length;ne++){const Se=D[ne]=J?vi(D[ne]):Jn(D[ne]);g(null,Se,v,W,Z,Y,H,fe,J)}},M=(D,v,W,Z,Y,H,fe)=>{const J=v.el=D.el;let{patchFlag:re,dynamicChildren:ne,dirs:Se}=v;re|=D.patchFlag&16;const b=D.props||St,x=v.props||St;let U;if(W&&ji(W,!1),(U=x.onVnodeBeforeUpdate)&&Yn(U,W,v,D),Se&&qi(v,D,W,"beforeUpdate"),W&&ji(W,!0),ne&&(!D.dynamicChildren||D.dynamicChildren.length!==ne.length)&&(re=0,fe=!1,ne=null),(b.innerHTML&&x.innerHTML==null||b.textContent&&x.textContent==null)&&u(J,""),ne?E(D.dynamicChildren,ne,J,W,Z,Va(v,Y),H):fe||k(D,v,J,null,W,Z,Va(v,Y),H,!1),re>0){if(re&16)I(J,b,x,W,Y);else if(re&2&&b.class!==x.class&&r(J,"class",null,x.class,Y),re&4&&r(J,"style",b.style,x.style,Y),re&8){const X=v.dynamicProps;for(let se=0;se<X.length;se++){const $=X[se],xe=b[$],he=x[$];(he!==xe||$==="value")&&r(J,$,xe,he,Y,W)}}re&1&&D.children!==v.children&&u(J,v.children)}else!fe&&ne==null&&I(J,b,x,W,Y);((U=x.onVnodeUpdated)||Se)&&un(()=>{U&&Yn(U,W,v,D),Se&&qi(v,D,W,"updated")},Z)},E=(D,v,W,Z,Y,H,fe)=>{for(let J=0;J<v.length;J++){const re=D[J],ne=v[J],Se=re.el&&(re.type===Ut||!xr(re,ne)||re.shapeFlag&198)?h(re.el):W;g(re,ne,Se,null,Z,Y,H,fe,!0)}},I=(D,v,W,Z,Y)=>{if(v!==W){if(v!==St)for(const H in v)!Or(H)&&!(H in W)&&r(D,H,v[H],null,Y,Z);for(const H in W){if(Or(H))continue;const fe=W[H],J=v[H];fe!==J&&H!=="value"&&r(D,H,J,fe,Y,Z)}"value"in W&&r(D,"value",v.value,W.value,Y)}},F=(D,v,W,Z,Y,H,fe,J,re)=>{const ne=v.el=D?D.el:a(""),Se=v.anchor=D?D.anchor:a("");let{patchFlag:b,dynamicChildren:x,slotScopeIds:U}=v;U&&(J=J?J.concat(U):U),D==null?(i(ne,W,Z),i(Se,W,Z),R(v.children||[],W,Se,Y,H,fe,J,re)):b>0&&b&64&&x&&D.dynamicChildren&&D.dynamicChildren.length===x.length?(E(D.dynamicChildren,x,W,Y,H,fe,J),(v.key!=null||Y&&v===Y.subTree)&&bd(D,v,!0)):k(D,v,W,Se,Y,H,fe,J,re)},j=(D,v,W,Z,Y,H,fe,J,re)=>{v.slotScopeIds=J,D==null?v.shapeFlag&512?Y.ctx.activate(v,W,Z,fe,re):ie(v,W,Z,Y,H,fe,re):Q(D,v,re)},ie=(D,v,W,Z,Y,H,fe)=>{const J=D.component=u_(D,Z,Y);if(Kc(D)&&(J.ctx.renderer=Ue),f_(J,!1,fe),J.asyncDep){if(Y&&Y.registerDep(J,q,fe),!D.el){const re=J.subTree=oi(Ri);p(null,re,v,W),D.placeholder=re.el}}else q(J,D,v,W,Y,H,fe)},Q=(D,v,W)=>{const Z=v.component=D.component;if($m(D,v,W))if(Z.asyncDep&&!Z.asyncResolved){K(Z,v,W);return}else Z.next=v,Z.update();else v.el=D.el,Z.vnode=v},q=(D,v,W,Z,Y,H,fe)=>{const J=()=>{if(D.isMounted){let{next:b,bu:x,u:U,parent:X,vnode:se}=D;{const Te=Td(D);if(Te){b&&(b.el=se.el,K(D,b,fe)),Te.asyncDep.then(()=>{un(()=>{D.isUnmounted||ne()},Y)});return}}let $=b,xe;ji(D,!1),b?(b.el=se.el,K(D,b,fe)):b=se,x&&jo(x),(xe=b.props&&b.props.onVnodeBeforeUpdate)&&Yn(xe,X,b,se),ji(D,!0);const he=Lu(D),we=D.subTree;D.subTree=he,g(we,he,h(we.el),ue(we),D,Y,H),b.el=he.el,$===null&&Ym(D,he.el),U&&un(U,Y),(xe=b.props&&b.props.onVnodeUpdated)&&un(()=>Yn(xe,X,b,se),Y)}else{let b;const{el:x,props:U}=v,{bm:X,m:se,parent:$,root:xe,type:he}=D,we=Hr(v);ji(D,!1),X&&jo(X),!we&&(b=U&&U.onVnodeBeforeMount)&&Yn(b,$,v),ji(D,!0);{xe.ce&&xe.ce._hasShadowRoot()&&xe.ce._injectChildStyle(he,D.parent?D.parent.type:void 0);const Te=D.subTree=Lu(D);g(null,Te,W,Z,D,Y,H),v.el=Te.el}if(se&&un(se,Y),!we&&(b=U&&U.onVnodeMounted)){const Te=v;un(()=>Yn(b,$,Te),Y)}(v.shapeFlag&256||$&&Hr($.vnode)&&$.vnode.shapeFlag&256)&&D.a&&un(D.a,Y),D.isMounted=!0,v=W=Z=null}};D.scope.on();const re=D.effect=new zf(J);D.scope.off();const ne=D.update=re.run.bind(re),Se=D.job=re.runIfDirty.bind(re);Se.i=D,Se.id=D.uid,re.scheduler=()=>qc(Se),ji(D,!0),ne()},K=(D,v,W)=>{v.component=D;const Z=D.vnode.props;D.vnode=v,D.next=null,jm(D,v.props,Z,W),Qm(D,v.children,W),Ti(),wu(D),wi()},k=(D,v,W,Z,Y,H,fe,J,re=!1)=>{const ne=D&&D.children,Se=D?D.shapeFlag:0,b=v.children,{patchFlag:x,shapeFlag:U}=v;if(x>0){if(x&128){ve(ne,b,W,Z,Y,H,fe,J,re);return}else if(x&256){le(ne,b,W,Z,Y,H,fe,J,re);return}}U&8?(Se&16&&oe(ne,Y,H),b!==ne&&u(W,b)):Se&16?U&16?ve(ne,b,W,Z,Y,H,fe,J,re):oe(ne,Y,H,!0):(Se&8&&u(W,""),U&16&&R(b,W,Z,Y,H,fe,J,re))},le=(D,v,W,Z,Y,H,fe,J,re)=>{D=D||$s,v=v||$s;const ne=D.length,Se=v.length,b=Math.min(ne,Se);let x;for(x=0;x<b;x++){const U=v[x]=re?vi(v[x]):Jn(v[x]);g(D[x],U,W,null,Y,H,fe,J,re)}ne>Se?oe(D,Y,H,!0,!1,b):R(v,W,Z,Y,H,fe,J,re,b)},ve=(D,v,W,Z,Y,H,fe,J,re)=>{let ne=0;const Se=v.length;let b=D.length-1,x=Se-1;for(;ne<=b&&ne<=x;){const U=D[ne],X=v[ne]=re?vi(v[ne]):Jn(v[ne]);if(xr(U,X))g(U,X,W,null,Y,H,fe,J,re);else break;ne++}for(;ne<=b&&ne<=x;){const U=D[b],X=v[x]=re?vi(v[x]):Jn(v[x]);if(xr(U,X))g(U,X,W,null,Y,H,fe,J,re);else break;b--,x--}if(ne>b){if(ne<=x){const U=x+1,X=U<Se?v[U].el:Z;for(;ne<=x;)g(null,v[ne]=re?vi(v[ne]):Jn(v[ne]),W,X,Y,H,fe,J,re),ne++}}else if(ne>x)for(;ne<=b;)Fe(D[ne],Y,H,!0),ne++;else{const U=ne,X=ne,se=new Map;for(ne=X;ne<=x;ne++){const De=v[ne]=re?vi(v[ne]):Jn(v[ne]);De.key!=null&&se.set(De.key,ne)}let $,xe=0;const he=x-X+1;let we=!1,Te=0;const pe=new Array(he);for(ne=0;ne<he;ne++)pe[ne]=0;for(ne=U;ne<=b;ne++){const De=D[ne];if(xe>=he){Fe(De,Y,H,!0);continue}let Re;if(De.key!=null)Re=se.get(De.key);else for($=X;$<=x;$++)if(pe[$-X]===0&&xr(De,v[$])){Re=$;break}Re===void 0?Fe(De,Y,H,!0):(pe[Re-X]=ne+1,Re>=Te?Te=Re:we=!0,g(De,v[Re],W,null,Y,H,fe,J,re),xe++)}const ye=we?i_(pe):$s;for($=ye.length-1,ne=he-1;ne>=0;ne--){const De=X+ne,Re=v[De],Me=v[De+1],Ye=De+1<Se?Me.el||wd(Me):Z;pe[ne]===0?g(null,Re,W,Ye,Y,H,fe,J,re):we&&($<0||ne!==ye[$]?be(Re,W,Ye,2):$--)}}},be=(D,v,W,Z,Y=null)=>{const{el:H,type:fe,transition:J,children:re,shapeFlag:ne}=D;if(ne&6){be(D.component.subTree,v,W,Z);return}if(ne&128){D.suspense.move(v,W,Z);return}if(ne&64){fe.move(D,v,W,Ue);return}if(fe===Ut){i(H,v,W);for(let b=0;b<re.length;b++)be(re[b],v,W,Z);i(D.anchor,v,W);return}if(fe===Ga){w(D,v,W);return}if(Z!==2&&ne&1&&J)if(Z===0)J.persisted&&!H[Ha]?i(H,v,W):(J.beforeEnter(H),i(H,v,W),un(()=>J.enter(H),Y));else{const{leave:b,delayLeave:x,afterLeave:U}=J,X=()=>{D.ctx.isUnmounted?s(H):i(H,v,W)},se=()=>{const $=H._isLeaving||!!H[Ha];H._isLeaving&&H[Ha](!0),J.persisted&&!$?X():b(H,()=>{X(),U&&U()})};x?x(H,X,se):se()}else i(H,v,W)},Fe=(D,v,W,Z=!1,Y=!1)=>{const{type:H,props:fe,ref:J,children:re,dynamicChildren:ne,shapeFlag:Se,patchFlag:b,dirs:x,cacheIndex:U,memo:X}=D;if(b===-2&&(Y=!1),J!=null&&(Ti(),zr(J,null,W,D,!0),wi()),U!=null&&(v.renderCache[U]=void 0),Se&256){v.ctx.deactivate(D);return}const se=Se&1&&x,$=!Hr(D);let xe;if($&&(xe=fe&&fe.onVnodeBeforeUnmount)&&Yn(xe,v,D),Se&6)st(D.component,W,Z);else{if(Se&128){D.suspense.unmount(W,Z);return}se&&qi(D,null,v,"beforeUnmount"),Se&64?D.type.remove(D,v,W,Ue,Z):ne&&!ne.hasOnce&&(H!==Ut||b>0&&b&64)?oe(ne,v,W,!1,!0):(H===Ut&&b&384||!Y&&Se&16)&&oe(re,v,W),Z&&at(D)}const he=X!=null&&U==null;($&&(xe=fe&&fe.onVnodeUnmounted)||se||he)&&un(()=>{xe&&Yn(xe,v,D),se&&qi(D,null,v,"unmounted"),he&&(D.el=null)},W)},at=D=>{const{type:v,el:W,anchor:Z,transition:Y}=D;if(v===Ut){We(W,Z);return}if(v===Ga){y(D);return}const H=()=>{s(W),Y&&!Y.persisted&&Y.afterLeave&&Y.afterLeave()};if(D.shapeFlag&1&&Y&&!Y.persisted){const{leave:fe,delayLeave:J}=Y,re=()=>fe(W,H);J?J(D.el,H,re):re()}else H()},We=(D,v)=>{let W;for(;D!==v;)W=f(D),s(D),D=W;s(v)},st=(D,v,W)=>{const{bum:Z,scope:Y,job:H,subTree:fe,um:J,m:re,a:ne}=D;Ou(re),Ou(ne),Z&&jo(Z),Y.stop(),H&&(H.flags|=8,Fe(fe,D,v,W)),J&&un(J,v),un(()=>{D.isUnmounted=!0},v)},oe=(D,v,W,Z=!1,Y=!1,H=0)=>{for(let fe=H;fe<D.length;fe++)Fe(D[fe],v,W,Z,Y)},ue=D=>{if(D.shapeFlag&6)return ue(D.component.subTree);if(D.shapeFlag&128)return D.suspense.next();const v=f(D.anchor||D.el),W=v&&v[ym];return W?f(W):v};let Pe=!1;const ze=(D,v,W)=>{let Z;D==null?v._vnode&&(Fe(v._vnode,null,null,!0),Z=v._vnode.component):g(v._vnode||null,D,v,null,null,null,W),v._vnode=D,Pe||(Pe=!0,wu(Z),nd(),Pe=!1)},Ue={p:g,um:Fe,m:be,r:at,mt:ie,mc:R,pc:k,pbc:E,n:ue,o:n};return{render:ze,hydrate:void 0,createApp:Hm(ze)}}function Va({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function ji({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function n_(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function bd(n,e,t=!1){const i=n.children,s=e.children;if(Ge(i)&&Ge(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=vi(s[r]),a.el=o.el),!t&&a.patchFlag!==-2&&bd(o,a)),a.type===Ra&&(a.patchFlag===-1&&(a=s[r]=vi(a)),a.el=o.el),a.type===Ri&&!a.el&&(a.el=o.el)}}function i_(n){const e=n.slice(),t=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,o=t.length-1;r<o;)a=r+o>>1,n[t[a]]<c?r=a+1:o=a;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function Td(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Td(e)}function Ou(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function wd(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?wd(e.subTree):null}const Ad=n=>n.__isSuspense;function s_(n,e){e&&e.pendingBranch?Ge(n)?e.effects.push(...n):e.effects.push(n):pm(n)}const Ut=Symbol.for("v-fgt"),Ra=Symbol.for("v-txt"),Ri=Symbol.for("v-cmt"),Ga=Symbol.for("v-stc"),ms=[];let vn=null;function Ve(n=!1){ms.push(vn=n?null:[])}function Rd(){ms.pop(),vn=ms[ms.length-1]||null}let $r=1;function Fu(n,e=!1){$r+=n,n<0&&vn&&e&&(vn.hasOnce=!0)}function Cd(n){return n.dynamicChildren=$r>0?vn||$s:null,Rd(),$r>0&&vn&&vn.push(n),n}function qe(n,e,t,i,s,r){return Cd(G(n,e,t,i,s,r,!0))}function Vl(n,e,t,i,s){return Cd(oi(n,e,t,i,s,!0))}function Pd(n){return n?n.__v_isVNode===!0:!1}function xr(n,e){return n.type===e.type&&n.key===e.key}const Dd=({key:n})=>n??null,Zo=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?It(n)||Qt(n)||Ze(n)?{i:In,r:n,k:e,f:!!t}:n:null);function G(n,e=null,t=null,i=0,s=null,r=n===Ut?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Dd(e),ref:e&&Zo(e),scopeId:sd,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:In};return a?(ca(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=It(t)?8:16),$r>0&&!o&&vn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&vn.push(l),l}const oi=r_;function r_(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===Im)&&(n=Ri),Pd(n)){const a=nr(n,e,!0);return t&&ca(a,t),$r>0&&!r&&vn&&(a.shapeFlag&6?vn[vn.indexOf(n)]=a:vn.push(a)),a.patchFlag=-2,a}if(__(n)&&(n=n.__vccOpts),e){e=o_(e);let{class:a,style:l}=e;a&&!It(a)&&(e.class=Vi(a)),xt(l)&&($c(l)&&!Ge(l)&&(l=$t({},l)),e.style=Ma(l))}const o=It(n)?1:Ad(n)?128:ba(n)?64:xt(n)?4:Ze(n)?2:0;return G(n,e,t,i,s,o,r,!0)}function o_(n){return n?$c(n)||vd(n)?$t({},n):n:null}function nr(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=e?a_(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Dd(c),ref:e&&e.ref?t&&r?Ge(r)?r.concat(Zo(e)):[r,Zo(e)]:Zo(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Ut?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&nr(n.ssContent),ssFallback:n.ssFallback&&nr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&jc(u,l.clone(u)),u}function rs(n=" ",e=0){return oi(Ra,null,n,e)}function Gt(n="",e=!1){return e?(Ve(),Vl(Ri,null,n)):oi(Ri,null,n)}function Jn(n){return n==null||typeof n=="boolean"?oi(Ri):Ge(n)?oi(Ut,null,n.slice()):Pd(n)?vi(n):oi(Ra,null,String(n))}function vi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:nr(n)}function ca(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Ge(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),ca(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!vd(e)?e._ctx=In:s===3&&In&&(In.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(Ze(e)){if(i&65){ca(n,{default:e});return}e={default:e,_ctx:In},t=32}else e=String(e),i&64?(t=16,e=[rs(e)]):t=8;n.children=e,n.shapeFlag|=t}function a_(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Vi([e.class,i.class]));else if(s==="style")e.style=Ma([e.style,i.style]);else if(_a(s)){const r=e[s],o=i[s];o&&r!==o&&!(Ge(r)&&r.includes(o))?e[s]=r?[].concat(r,o):o:o==null&&r==null&&!ga(s)&&(e[s]=o)}else s!==""&&(e[s]=i[s])}return e}function Yn(n,e,t,i=null){Xn(n,e,7,[t,i])}const l_=dd();let c_=0;function u_(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||l_,r={uid:c_++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Bp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:yd(i,s),emitsOptions:pd(i,s),emit:null,emitted:null,propsDefaults:St,inheritAttrs:i.inheritAttrs,ctx:St,data:St,props:St,attrs:St,slots:St,refs:St,setupState:St,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Vm.bind(null,r),n.ce&&n.ce(r),r}let on=null;const h_=()=>on||In;let ua,Yr;{const n=ya(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};ua=e("__VUE_INSTANCE_SETTERS__",t=>on=t),Yr=e("__VUE_SSR_SETTERS__",t=>qr=t)}const ro=n=>{const e=on;return ua(n),n.scope.on(),()=>{n.scope.off(),ua(e)}},Bu=()=>{on&&on.scope.off(),ua(null)};function Id(n){return n.vnode.shapeFlag&4}let qr=!1;function f_(n,e=!1,t=!1){e&&Yr(e);const{props:i,children:s}=n.vnode,r=Id(n);qm(n,i,r,e),Jm(n,s,t||e);const o=r?d_(n,e):void 0;return e&&Yr(!1),o}function d_(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Lm);const{setup:i}=t;if(i){Ti();const s=n.setupContext=i.length>1?m_(n):null,r=ro(n),o=so(i,n,0,[n.props,s]),a=Df(o);if(wi(),r(),(a||n.sp)&&!Hr(n)&&ld(n),a){if(o.then(Bu,Bu),e)return o.then(l=>{Yr(!0);try{zu(n,l,e)}finally{Yr(!1)}}).catch(l=>{Ea(l,n,0)});n.asyncDep=o}else zu(n,o)}else Ld(n)}function zu(n,e,t){Ze(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:xt(e)&&(n.setupState=Qf(e)),Ld(n)}function Ld(n,e,t){const i=n.type;n.render||(n.render=i.render||ri);{const s=ro(n);Ti();try{Um(n)}finally{wi(),s()}}}const p_={get(n,e){return Jt(n,"get",""),n[e]}};function m_(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,p_),slots:n.slots,emit:n.emit,expose:e}}function Ca(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Qf(sm(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in kr)return kr[t](n)},has(e,t){return t in e||t in kr}})):n.proxy}function __(n){return Ze(n)&&"__vccOpts"in n}const hn=(n,e)=>cm(n,e,qr),g_="3.5.41";let Gl;const Hu=typeof window<"u"&&window.trustedTypes;if(Hu)try{Gl=Hu.createPolicy("vue",{createHTML:n=>n})}catch{}const Ud=Gl?n=>Gl.createHTML(n):n=>n,v_="http://www.w3.org/2000/svg",x_="http://www.w3.org/1998/Math/MathML",gi=typeof document<"u"?document:null,ku=gi&&gi.createElement("template"),y_={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?gi.createElementNS(v_,n):e==="mathml"?gi.createElementNS(x_,n):t?gi.createElement(n,{is:t}):gi.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>gi.createTextNode(n),createComment:n=>gi.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>gi.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const o=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{ku.innerHTML=Ud(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=ku.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},M_=Symbol("_vtc");function S_(n,e,t){const i=n[M_];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Vu=Symbol("_vod"),E_=Symbol("_vsh"),b_=Symbol(""),T_=/(?:^|;)\s*display\s*:/;function w_(n,e,t){const i=n.style,s=It(t);let r=!1;if(t&&!s){if(e)if(It(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Ir(i,a,"")}else for(const o in e)t[o]==null&&Ir(i,o,"");for(const o in t){o==="display"&&(r=!0);const a=t[o];a!=null?R_(n,o,!It(e)&&e?e[o]:void 0,a)||Ir(i,o,a):Ir(i,o,"")}}else if(s){if(e!==t){const o=i[b_];o&&(t+=";"+o),i.cssText=t,r=T_.test(t)}}else e&&n.removeAttribute("style");Vu in n&&(n[Vu]=r?i.display:"",n[E_]&&(i.display="none"))}const Gu=/\s*!important$/;function Ir(n,e,t){if(Ge(t))t.forEach(i=>Ir(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=A_(n,e);Gu.test(t)?n.setProperty(ys(i),t.replace(Gu,""),"important"):n[i]=t}}const Wu=["Webkit","Moz","ms"],Wa={};function A_(n,e){const t=Wa[e];if(t)return t;let i=Vn(e);if(i!=="filter"&&i in n)return Wa[e]=i;i=Uf(i);for(let s=0;s<Wu.length;s++){const r=Wu[s]+i;if(r in n)return Wa[e]=r}return e}function R_(n,e,t,i){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&It(i)&&t===i}const Xu="http://www.w3.org/1999/xlink";function $u(n,e,t,i,s,r=Op(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Xu,e.slice(6,e.length)):n.setAttributeNS(Xu,e,t):t==null||r&&!Of(t)?n.removeAttribute(e):n.setAttribute(e,r?"":ai(t)?String(t):t)}function Yu(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Ud(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=Of(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function Hi(n,e,t,i){n.addEventListener(e,t,i)}function C_(n,e,t,i){n.removeEventListener(e,t,i)}const qu=Symbol("_vei");function P_(n,e,t,i,s=null){const r=n[qu]||(n[qu]={}),o=r[e];if(i&&o)o.value=i;else{const[a,l]=L_(e);if(i){const c=r[e]=O_(i,s);Hi(n,a,c,l)}else o&&(C_(n,a,o,l),r[e]=void 0)}}const D_=/(Once|Passive|Capture)$/,I_=/^on:?(?:Once|Passive|Capture)$/;function L_(n){let e,t;for(;(t=n.match(D_))&&!I_.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):ys(n.slice(2)),e]}let Xa=0;const U_=Promise.resolve(),N_=()=>Xa||(U_.then(()=>Xa=0),Xa=Date.now());function O_(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;const s=t.value;if(Ge(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const o=s.slice(),a=[i];for(let l=0;l<o.length&&!i._stopped;l++){const c=o[l];c&&Xn(c,e,5,a)}}else Xn(s,e,5,[i])};return t.value=n,t.attached=N_(),t}const ju=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,F_=(n,e,t,i,s,r)=>{const o=s==="svg";e==="class"?S_(n,i,o):e==="style"?w_(n,t,i):_a(e)?ga(e)||P_(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):B_(n,e,i,o))?(Yu(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&$u(n,e,i,o,r,e!=="value")):n._isVueCE&&(z_(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!It(i)))?Yu(n,Vn(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),$u(n,e,i,o))};function B_(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&ju(e)&&Ze(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return ju(e)&&It(t)?!1:e in n}function z_(n,e){const t=n._def.props;if(!t)return!1;const i=Vn(e);return Array.isArray(t)?t.some(s=>Vn(s)===i):Object.keys(t).some(s=>Vn(s)===i)}const ir=n=>{const e=n.props["onUpdate:modelValue"]||!1;return Ge(e)?t=>jo(e,t):e};function H_(n){n.target.composing=!0}function Ku(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const ti=Symbol("_assign"),mo=Symbol("_initialValue");function $a(n,e,t){return e&&(n=n.trim()),t&&(n=xa(n)),n}const Zu={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n.parentNode&&(n.type==="text"?n[mo]=n.defaultValue.replace(/[\r\n]/g,""):n.type==="textarea"&&(n[mo]=n.defaultValue.replace(/\r\n?/g,`
`))),n[ti]=ir(s);const r=i||s.props&&s.props.type==="number";Hi(n,e?"change":"input",o=>{o.target.composing||n[ti]($a(n.value,t,r))}),(t||r)&&Hi(n,"change",()=>{n.value=$a(n.value,t,r)}),e||(Hi(n,"compositionstart",H_),Hi(n,"compositionend",Ku),Hi(n,"change",Ku))},mounted(n,{value:e,modifiers:{trim:t,number:i}}){const s=e??"",r=n[mo];delete n[mo],r!==void 0&&(n.type==="text"||n.type==="textarea")&&n.value!==r?n[ti]($a(n.value,t,i)):n.value=s},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},o){if(n[ti]=ir(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?xa(n.value):n.value,l=e??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l)}},yr={deep:!0,created(n,e,t){n[ti]=ir(t),Hi(n,"change",()=>{const i=n._modelValue,s=jr(n),r=n.checked,o=n[ti];if(Ge(i)){const a=zc(i,s),l=a!==-1;if(r&&!l)o(i.concat(s));else if(!r&&l){const c=[...i];c.splice(a,1),o(c)}}else if(cr(i)){const a=new Set(i);r?a.add(s):a.delete(s),o(a)}else o(Nd(n,r))})},mounted:Ju,beforeUpdate(n,e,t){n[ti]=ir(t),Ju(n,e,t)}};function Ju(n,{value:e,oldValue:t},i){n._modelValue=e;let s;if(Ge(e))s=zc(e,i.props.value)>-1;else if(cr(e))s=e.has(i.props.value);else{if(e===t)return;s=ur(e,Nd(n,!0))}n.checked!==s&&(n.checked=s)}const Wl={deep:!0,created(n,{value:e,modifiers:{number:t}},i){n._modelValue=e,Hi(n,"change",()=>{const s=Array.prototype.filter.call(n.options,r=>r.selected).map(r=>t?xa(jr(r)):jr(r));n[ti](n.multiple?cr(n._modelValue)?new Set(s):s:s[0]),n._assigning=!0,Yc(()=>{n._assigning=!1})}),n[ti]=ir(i)},mounted(n,{value:e}){Qu(n,e)},beforeUpdate(n,{value:e},t){n._modelValue=e,n[ti]=ir(t)},updated(n,{value:e}){n._assigning||Qu(n,e)}};function Qu(n,e){const t=n.multiple,i=Ge(e);if(!(t&&!i&&!cr(e))){for(let s=0,r=n.options.length;s<r;s++){const o=n.options[s],a=jr(o);if(t)if(i){const l=typeof a;l==="string"||l==="number"?o.selected=e.some(c=>String(c)===String(a)):o.selected=zc(e,a)>-1}else o.selected=e.has(a);else if(ur(jr(o),e)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function jr(n){return"_value"in n?n._value:n.value}function Nd(n,e){const t=e?"_trueValue":"_falseValue";return t in n?n[t]:e}const k_=$t({patchProp:F_},y_);let eh;function V_(){return eh||(eh=e_(k_))}const G_=((...n)=>{const e=V_().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=X_(i);if(!s)return;const r=e._component;!Ze(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,W_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function W_(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function X_(n){return It(n)?document.querySelector(n):n}const tu="180",Zs={ROTATE:0,DOLLY:1,PAN:2},Vs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$_=0,th=1,Y_=2,Od=1,q_=2,mi=3,Xi=0,dn=1,Hn=2,Gi=0,Js=1,nh=2,ih=3,sh=4,j_=5,ls=100,K_=101,Z_=102,J_=103,Q_=104,eg=200,tg=201,ng=202,ig=203,Xl=204,$l=205,sg=206,rg=207,og=208,ag=209,lg=210,cg=211,ug=212,hg=213,fg=214,Yl=0,ql=1,jl=2,sr=3,Kl=4,Zl=5,Jl=6,Ql=7,Fd=0,dg=1,pg=2,Wi=0,mg=1,_g=2,gg=3,vg=4,xg=5,yg=6,Mg=7,Bd=300,rr=301,or=302,ec=303,tc=304,Pa=306,nc=1e3,hs=1001,ic=1002,xn=1003,Sg=1004,_o=1005,ni=1006,Ya=1007,fs=1008,li=1009,zd=1010,Hd=1011,Kr=1012,nu=1013,gs=1014,ii=1015,oo=1016,iu=1017,su=1018,Zr=1020,kd=35902,Vd=35899,Gd=1021,Wd=1022,kn=1023,Jr=1026,Qr=1027,ru=1028,ou=1029,Xd=1030,au=1031,lu=1033,Jo=33776,Qo=33777,ea=33778,ta=33779,sc=35840,rc=35841,oc=35842,ac=35843,lc=36196,cc=37492,uc=37496,hc=37808,fc=37809,dc=37810,pc=37811,mc=37812,_c=37813,gc=37814,vc=37815,xc=37816,yc=37817,Mc=37818,Sc=37819,Ec=37820,bc=37821,Tc=36492,wc=36494,Ac=36495,Rc=36283,Cc=36284,Pc=36285,Dc=36286,Eg=3200,bg=3201,$d=0,Tg=1,ki="",fn="srgb",ar="srgb-linear",ha="linear",gt="srgb",bs=7680,rh=519,wg=512,Ag=513,Rg=514,Yd=515,Cg=516,Pg=517,Dg=518,Ig=519,oh=35044,Lg=35048,ah="300 es",si=2e3,fa=2001;class Ms{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vr=Math.PI/180,Ic=180/Math.PI;function ao(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function it(n,e,t){return Math.max(e,Math.min(t,n))}function Ug(n,e){return(n%e+e)%e}function qa(n,e,t){return(1-t)*n+t*e}function Mr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ng={DEG2RAD:Vr};class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],d=r[o+1],_=r[o+2],g=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=_,e[t+3]=g;return}if(h!==g||l!==f||c!==d||u!==_){let m=1-a;const p=l*f+c*d+u*_+h*g,S=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const C=Math.sqrt(w),P=Math.atan2(C,p*S);m=Math.sin(m*P)/C,a=Math.sin(a*P)/C}const y=a*S;if(l=l*m+f*y,c=c*m+d*y,u=u*m+_*y,h=h*m+g*y,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],_=r[o+3];return e[t]=a*_+u*h+l*d-c*f,e[t+1]=l*_+u*f+c*h-a*d,e[t+2]=c*_+u*d+a*f-l*h,e[t+3]=u*_-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),d=l(s/2),_=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"YZX":this._x=f*u*h+c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h-f*d*_;break;case"XZY":this._x=f*u*h-c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(lh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(lh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),h=2*(r*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ja.copy(this).projectOnVector(e),this.sub(ja)}reflect(e){return this.sub(ja.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ja=new L,lh=new Xt;class Je{constructor(e,t,i,s,r,o,a,l,c){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],_=i[8],g=s[0],m=s[3],p=s[6],S=s[1],w=s[4],y=s[7],C=s[2],P=s[5],A=s[8];return r[0]=o*g+a*S+l*C,r[3]=o*m+a*w+l*P,r[6]=o*p+a*y+l*A,r[1]=c*g+u*S+h*C,r[4]=c*m+u*w+h*P,r[7]=c*p+u*y+h*A,r[2]=f*g+d*S+_*C,r[5]=f*m+d*w+_*P,r[8]=f*p+d*y+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,_=t*h+i*f+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=h*g,e[1]=(s*c-u*i)*g,e[2]=(a*i-s*o)*g,e[3]=f*g,e[4]=(u*t-s*l)*g,e[5]=(s*r-a*t)*g,e[6]=d*g,e[7]=(i*l-c*t)*g,e[8]=(o*t-i*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ka.makeScale(e,t)),this}rotate(e){return this.premultiply(Ka.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ka.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ka=new Je;function qd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function eo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Og(){const n=eo("canvas");return n.style.display="block",n}const ch={};function to(n){n in ch||(ch[n]=!0,console.warn(n))}function Fg(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const uh=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hh=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bg(){const n={enabled:!0,workingColorSpace:ar,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===gt&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===gt&&(s.r=Qs(s.r),s.g=Qs(s.g),s.b=Qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ki?ha:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return to("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return to("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ar]:{primaries:e,whitePoint:i,transfer:ha,toXYZ:uh,fromXYZ:hh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:fn},outputColorSpaceConfig:{drawingBufferColorSpace:fn}},[fn]:{primaries:e,whitePoint:i,transfer:gt,toXYZ:uh,fromXYZ:hh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:fn}}}),n}const ut=Bg();function Si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ts;class zg{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ts===void 0&&(Ts=eo("canvas")),Ts.width=e.width,Ts.height=e.height;const s=Ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ts}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=eo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Si(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Si(t[i]/255)*255):t[i]=Si(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hg=0;class cu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=ao(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Za(s[o].image)):r.push(Za(s[o]))}else r=Za(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Za(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zg.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let kg=0;const Ja=new L;class en extends Ms{constructor(e=en.DEFAULT_IMAGE,t=en.DEFAULT_MAPPING,i=hs,s=hs,r=ni,o=fs,a=kn,l=li,c=en.DEFAULT_ANISOTROPY,u=ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=ao(),this.name="",this.source=new cu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ja).x}get height(){return this.source.getSize(Ja).y}get depth(){return this.source.getSize(Ja).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nc:e.x=e.x-Math.floor(e.x);break;case hs:e.x=e.x<0?0:1;break;case ic:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nc:e.y=e.y-Math.floor(e.y);break;case hs:e.y=e.y<0?0:1;break;case ic:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Bd;en.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,t=0,i=0,s=1){Dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,y=(d+1)/2,C=(p+1)/2,P=(u+f)/4,A=(h+g)/4,R=(_+m)/4;return w>y&&w>C?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=P/i,r=A/i):y>C?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=P/s,r=R/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=A/r,s=R/r),this.set(i,s,r,t),this}let S=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-_)/S,this.y=(h-g)/S,this.z=(f-u)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vg extends Ms{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new en(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:ni,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new cu(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vs extends Vg{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class jd extends en{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=xn,this.minFilter=xn,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gg extends en{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=xn,this.minFilter=xn,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $i{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(On.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(On.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=On.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,On):On.fromBufferAttribute(r,o),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),go.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),go.copy(i.boundingBox)),go.applyMatrix4(e.matrixWorld),this.union(go)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sr),vo.subVectors(this.max,Sr),ws.subVectors(e.a,Sr),As.subVectors(e.b,Sr),Rs.subVectors(e.c,Sr),Di.subVectors(As,ws),Ii.subVectors(Rs,As),Ki.subVectors(ws,Rs);let t=[0,-Di.z,Di.y,0,-Ii.z,Ii.y,0,-Ki.z,Ki.y,Di.z,0,-Di.x,Ii.z,0,-Ii.x,Ki.z,0,-Ki.x,-Di.y,Di.x,0,-Ii.y,Ii.x,0,-Ki.y,Ki.x,0];return!Qa(t,ws,As,Rs,vo)||(t=[1,0,0,0,1,0,0,0,1],!Qa(t,ws,As,Rs,vo))?!1:(xo.crossVectors(Di,Ii),t=[xo.x,xo.y,xo.z],Qa(t,ws,As,Rs,vo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(On).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ui=[new L,new L,new L,new L,new L,new L,new L,new L],On=new L,go=new $i,ws=new L,As=new L,Rs=new L,Di=new L,Ii=new L,Ki=new L,Sr=new L,vo=new L,xo=new L,Zi=new L;function Qa(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Zi.fromArray(n,r);const a=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),l=e.dot(Zi),c=t.dot(Zi),u=i.dot(Zi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Wg=new $i,Er=new L,el=new L;class hr{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Wg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);const t=Er.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Er,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(el.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(el)),this.expandByPoint(Er.copy(e.center).sub(el))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const hi=new L,tl=new L,yo=new L,Li=new L,nl=new L,Mo=new L,il=new L;class Da{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){tl.copy(e).add(t).multiplyScalar(.5),yo.copy(t).sub(e).normalize(),Li.copy(this.origin).sub(tl);const r=e.distanceTo(t)*.5,o=-this.direction.dot(yo),a=Li.dot(this.direction),l=-Li.dot(yo),c=Li.lengthSq(),u=Math.abs(1-o*o);let h,f,d,_;if(u>0)if(h=o*l-a,f=o*a-l,_=r*u,h>=0)if(f>=-_)if(f<=_){const g=1/u;h*=g,f*=g,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(tl).addScaledVector(yo,f),d}intersectSphere(e,t){hi.subVectors(e.center,this.origin);const i=hi.dot(this.direction),s=hi.dot(hi)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,i,s,r){nl.subVectors(t,e),Mo.subVectors(i,e),il.crossVectors(nl,Mo);let o=this.direction.dot(il),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Li.subVectors(this.origin,e);const l=a*this.direction.dot(Mo.crossVectors(Li,Mo));if(l<0)return null;const c=a*this.direction.dot(nl.cross(Li));if(c<0||l+c>o)return null;const u=-a*Li.dot(il);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt{constructor(e,t,i,s,r,o,a,l,c,u,h,f,d,_,g,m){pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,h,f,d,_,g,m)}set(e,t,i,s,r,o,a,l,c,u,h,f,d,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Cs.setFromMatrixColumn(e,0).length(),r=1/Cs.setFromMatrixColumn(e,1).length(),o=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,_=a*u,g=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,_=c*u,g=c*h;t[0]=f+g*a,t[4]=_*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,_=c*u,g=c*h;t[0]=f-g*a,t[4]=-o*h,t[8]=_+d*a,t[1]=d+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,_=a*u,g=a*h;t[0]=l*u,t[4]=_*c-d,t[8]=f*c+g,t[1]=l*h,t[5]=g*c+f,t[9]=d*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*h,t[8]=_*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+_,t[10]=f-g*h}else if(e.order==="XZY"){const f=o*l,d=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+g,t[5]=o*u,t[9]=d*h-_,t[2]=_*h-d,t[6]=a*u,t[10]=g*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xg,e,$g)}lookAt(e,t,i){const s=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Ui.crossVectors(i,_n),Ui.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Ui.crossVectors(i,_n)),Ui.normalize(),So.crossVectors(_n,Ui),s[0]=Ui.x,s[4]=So.x,s[8]=_n.x,s[1]=Ui.y,s[5]=So.y,s[9]=_n.y,s[2]=Ui.z,s[6]=So.z,s[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],_=i[2],g=i[6],m=i[10],p=i[14],S=i[3],w=i[7],y=i[11],C=i[15],P=s[0],A=s[4],R=s[8],M=s[12],E=s[1],I=s[5],F=s[9],j=s[13],ie=s[2],Q=s[6],q=s[10],K=s[14],k=s[3],le=s[7],ve=s[11],be=s[15];return r[0]=o*P+a*E+l*ie+c*k,r[4]=o*A+a*I+l*Q+c*le,r[8]=o*R+a*F+l*q+c*ve,r[12]=o*M+a*j+l*K+c*be,r[1]=u*P+h*E+f*ie+d*k,r[5]=u*A+h*I+f*Q+d*le,r[9]=u*R+h*F+f*q+d*ve,r[13]=u*M+h*j+f*K+d*be,r[2]=_*P+g*E+m*ie+p*k,r[6]=_*A+g*I+m*Q+p*le,r[10]=_*R+g*F+m*q+p*ve,r[14]=_*M+g*j+m*K+p*be,r[3]=S*P+w*E+y*ie+C*k,r[7]=S*A+w*I+y*Q+C*le,r[11]=S*R+w*F+y*q+C*ve,r[15]=S*M+w*j+y*K+C*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*d-i*l*d)+g*(+t*l*d-t*c*f+r*o*f-s*o*d+s*c*u-r*l*u)+m*(+t*c*h-t*a*d-r*o*h+i*o*d+r*a*u-i*c*u)+p*(-s*a*u-t*l*h+t*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],_=e[12],g=e[13],m=e[14],p=e[15],S=h*m*c-g*f*c+g*l*d-a*m*d-h*l*p+a*f*p,w=_*f*c-u*m*c-_*l*d+o*m*d+u*l*p-o*f*p,y=u*g*c-_*h*c+_*a*d-o*g*d-u*a*p+o*h*p,C=_*h*l-u*g*l-_*a*f+o*g*f+u*a*m-o*h*m,P=t*S+i*w+s*y+r*C;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/P;return e[0]=S*A,e[1]=(g*f*r-h*m*r-g*s*d+i*m*d+h*s*p-i*f*p)*A,e[2]=(a*m*r-g*l*r+g*s*c-i*m*c-a*s*p+i*l*p)*A,e[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*d-i*l*d)*A,e[4]=w*A,e[5]=(u*m*r-_*f*r+_*s*d-t*m*d-u*s*p+t*f*p)*A,e[6]=(_*l*r-o*m*r-_*s*c+t*m*c+o*s*p-t*l*p)*A,e[7]=(o*f*r-u*l*r+u*s*c-t*f*c-o*s*d+t*l*d)*A,e[8]=y*A,e[9]=(_*h*r-u*g*r-_*i*d+t*g*d+u*i*p-t*h*p)*A,e[10]=(o*g*r-_*a*r+_*i*c-t*g*c-o*i*p+t*a*p)*A,e[11]=(u*a*r-o*h*r-u*i*c+t*h*c+o*i*d-t*a*d)*A,e[12]=C*A,e[13]=(u*g*s-_*h*s+_*i*f-t*g*f-u*i*m+t*h*m)*A,e[14]=(_*a*s-o*g*s-_*i*l+t*g*l+o*i*m-t*a*m)*A,e[15]=(o*h*s-u*a*s+u*i*l-t*h*l-o*i*f+t*a*f)*A,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,_=r*h,g=o*u,m=o*h,p=a*h,S=l*c,w=l*u,y=l*h,C=i.x,P=i.y,A=i.z;return s[0]=(1-(g+p))*C,s[1]=(d+y)*C,s[2]=(_-w)*C,s[3]=0,s[4]=(d-y)*P,s[5]=(1-(f+p))*P,s[6]=(m+S)*P,s[7]=0,s[8]=(_+w)*A,s[9]=(m-S)*A,s[10]=(1-(f+g))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Cs.set(s[0],s[1],s[2]).length();const o=Cs.set(s[4],s[5],s[6]).length(),a=Cs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Fn.copy(this);const c=1/r,u=1/o,h=1/a;return Fn.elements[0]*=c,Fn.elements[1]*=c,Fn.elements[2]*=c,Fn.elements[4]*=u,Fn.elements[5]*=u,Fn.elements[6]*=u,Fn.elements[8]*=h,Fn.elements[9]*=h,Fn.elements[10]*=h,t.setFromRotationMatrix(Fn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=si,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(i-s),f=(t+e)/(t-e),d=(i+s)/(i-s);let _,g;if(l)_=r/(o-r),g=o*r/(o-r);else if(a===si)_=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===fa)_=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=si,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-s),f=-(t+e)/(t-e),d=-(i+s)/(i-s);let _,g;if(l)_=1/(o-r),g=o/(o-r);else if(a===si)_=-2/(o-r),g=-(o+r)/(o-r);else if(a===fa)_=-1/(o-r),g=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Cs=new L,Fn=new pt,Xg=new L(0,0,0),$g=new L(1,1,1),Ui=new L,So=new L,_n=new L,fh=new pt,dh=new Xt;class $n{constructor(e=0,t=0,i=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-it(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(it(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dh.setFromEuler(this),this.setFromQuaternion(dh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class uu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yg=0;const ph=new L,Ps=new Xt,fi=new pt,Eo=new L,br=new L,qg=new L,jg=new Xt,mh=new L(1,0,0),_h=new L(0,1,0),gh=new L(0,0,1),vh={type:"added"},Kg={type:"removed"},Ds={type:"childadded",child:null},sl={type:"childremoved",child:null};class Lt extends Ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=ao(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new L,t=new $n,i=new Xt,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new Je}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(mh,e)}rotateY(e){return this.rotateOnAxis(_h,e)}rotateZ(e){return this.rotateOnAxis(gh,e)}translateOnAxis(e,t){return ph.copy(e).applyQuaternion(this.quaternion),this.position.add(ph.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mh,e)}translateY(e){return this.translateOnAxis(_h,e)}translateZ(e){return this.translateOnAxis(gh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Eo.copy(e):Eo.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(br,Eo,this.up):fi.lookAt(Eo,br,this.up),this.quaternion.setFromRotationMatrix(fi),s&&(fi.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(fi),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vh),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kg),sl.child=e,this.dispatchEvent(sl),sl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vh),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,e,qg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,jg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Lt.DEFAULT_UP=new L(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Bn=new L,di=new L,rl=new L,pi=new L,Is=new L,Ls=new L,xh=new L,ol=new L,al=new L,ll=new L,cl=new Dt,ul=new Dt,hl=new Dt;class Pn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Bn.subVectors(e,t),s.cross(Bn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Bn.subVectors(s,t),di.subVectors(i,t),rl.subVectors(e,t);const o=Bn.dot(Bn),a=Bn.dot(di),l=Bn.dot(rl),c=di.dot(di),u=di.dot(rl),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,_=(o*u-a*l)*f;return r.set(1-d-_,_,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,pi.x),l.addScaledVector(o,pi.y),l.addScaledVector(a,pi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return cl.setScalar(0),ul.setScalar(0),hl.setScalar(0),cl.fromBufferAttribute(e,t),ul.fromBufferAttribute(e,i),hl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(cl,r.x),o.addScaledVector(ul,r.y),o.addScaledVector(hl,r.z),o}static isFrontFacing(e,t,i,s){return Bn.subVectors(i,t),di.subVectors(e,t),Bn.cross(di).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Bn.cross(di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Pn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;Is.subVectors(s,i),Ls.subVectors(r,i),ol.subVectors(e,i);const l=Is.dot(ol),c=Ls.dot(ol);if(l<=0&&c<=0)return t.copy(i);al.subVectors(e,s);const u=Is.dot(al),h=Ls.dot(al);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Is,o);ll.subVectors(e,r);const d=Is.dot(ll),_=Ls.dot(ll);if(_>=0&&d<=_)return t.copy(r);const g=d*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(i).addScaledVector(Ls,a);const m=u*_-d*h;if(m<=0&&h-u>=0&&d-_>=0)return xh.subVectors(r,s),a=(h-u)/(h-u+(d-_)),t.copy(s).addScaledVector(xh,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(i).addScaledVector(Is,o).addScaledVector(Ls,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},bo={h:0,s:0,l:0};function fl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ut.workingColorSpace){if(e=Ug(e,1),t=it(t,0,1),i=it(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=fl(o,r,e+1/3),this.g=fl(o,r,e),this.b=fl(o,r,e-1/3)}return ut.colorSpaceToWorking(this,s),this}setStyle(e,t=fn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fn){const i=Kd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}copyLinearToSRGB(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fn){return ut.workingToColorSpace(qt.copy(this),e),Math.round(it(qt.r*255,0,255))*65536+Math.round(it(qt.g*255,0,255))*256+Math.round(it(qt.b*255,0,255))}getHexString(e=fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(qt.copy(this),t);const i=qt.r,s=qt.g,r=qt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=fn){ut.workingToColorSpace(qt.copy(this),e);const t=qt.r,i=qt.g,s=qt.b;return e!==fn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(bo);const i=qa(Ni.h,bo.h,t),s=qa(Ni.s,bo.s,t),r=qa(Ni.l,bo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new Qe;Qe.NAMES=Kd;let Zg=0;class fr extends Ms{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=ao(),this.name="",this.type="Material",this.blending=Js,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xl,this.blendDst=$l,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Js&&(i.blending=this.blending),this.side!==Xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xl&&(i.blendSrc=this.blendSrc),this.blendDst!==$l&&(i.blendDst=this.blendDst),this.blendEquation!==ls&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ia extends fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Fd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new L,To=new $e;let Jg=0;class yn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Jg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=oh,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)To.fromBufferAttribute(this,t),To.applyMatrix3(e),this.setXY(t,To.x,To.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Mr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ln(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mr(t,this.array)),t}setX(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mr(t,this.array)),t}setY(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mr(t,this.array)),t}setW(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array),s=ln(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array),s=ln(s,this.array),r=ln(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==oh&&(e.usage=this.usage),e}}class Zd extends yn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Jd extends yn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ht extends yn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Qg=0;const wn=new pt,dl=new Lt,Us=new L,gn=new $i,Tr=new $i,Ht=new L;class Ft extends Ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qg++}),this.uuid=ao(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qd(e)?Jd:Zd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,t,i){return wn.makeTranslation(e,t,i),this.applyMatrix4(wn),this}scale(e,t,i){return wn.makeScale(e,t,i),this.applyMatrix4(wn),this}lookAt(e){return dl.lookAt(e),dl.updateMatrix(),this.applyMatrix4(dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ht(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Tr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ht.addVectors(gn.min,Tr.min),gn.expandByPoint(Ht),Ht.addVectors(gn.max,Tr.max),gn.expandByPoint(Ht)):(gn.expandByPoint(Tr.min),gn.expandByPoint(Tr.max))}gn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ht.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ht));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ht.fromBufferAttribute(a,c),l&&(Us.fromBufferAttribute(e,c),Ht.add(Us)),s=Math.max(s,i.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new L,l[R]=new L;const c=new L,u=new L,h=new L,f=new $e,d=new $e,_=new $e,g=new L,m=new L;function p(R,M,E){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,M),h.fromBufferAttribute(i,E),f.fromBufferAttribute(r,R),d.fromBufferAttribute(r,M),_.fromBufferAttribute(r,E),u.sub(c),h.sub(c),d.sub(f),_.sub(f);const I=1/(d.x*_.y-_.x*d.y);isFinite(I)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-d.y).multiplyScalar(I),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(I),a[R].add(g),a[M].add(g),a[E].add(g),l[R].add(m),l[M].add(m),l[E].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let R=0,M=S.length;R<M;++R){const E=S[R],I=E.start,F=E.count;for(let j=I,ie=I+F;j<ie;j+=3)p(e.getX(j+0),e.getX(j+1),e.getX(j+2))}const w=new L,y=new L,C=new L,P=new L;function A(R){C.fromBufferAttribute(s,R),P.copy(C);const M=a[R];w.copy(M),w.sub(C.multiplyScalar(C.dot(M))).normalize(),y.crossVectors(P,M);const I=y.dot(l[R])<0?-1:1;o.setXYZW(R,w.x,w.y,w.z,I)}for(let R=0,M=S.length;R<M;++R){const E=S[R],I=E.start,F=E.count;for(let j=I,ie=I+F;j<ie;j+=3)A(e.getX(j+0)),A(e.getX(j+1)),A(e.getX(j+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new yn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?d=l[g]*a.data.stride+a.offset:d=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[d++]}return new yn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yh=new pt,Ji=new Da,wo=new hr,Mh=new L,Ao=new L,Ro=new L,Co=new L,pl=new L,Po=new L,Sh=new L,Do=new L;class Ce extends Lt{constructor(e=new Ft,t=new Ia){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Po.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(pl.fromBufferAttribute(h,e),o?Po.addScaledVector(pl,u):Po.addScaledVector(pl.sub(t),u))}t.add(Po)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wo.copy(i.boundingSphere),wo.applyMatrix4(r),Ji.copy(e.ray).recast(e.near),!(wo.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(wo,Mh)===null||Ji.origin.distanceToSquared(Mh)>(e.far-e.near)**2))&&(yh.copy(r).invert(),Ji.copy(e.ray).applyMatrix4(yh),!(i.boundingBox!==null&&Ji.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ji)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],S=Math.max(m.start,d.start),w=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=S,C=w;y<C;y+=3){const P=a.getX(y),A=a.getX(y+1),R=a.getX(y+2);s=Io(this,p,e,i,c,u,h,P,A,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const S=a.getX(m),w=a.getX(m+1),y=a.getX(m+2);s=Io(this,o,e,i,c,u,h,S,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],S=Math.max(m.start,d.start),w=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=S,C=w;y<C;y+=3){const P=y,A=y+1,R=y+2;s=Io(this,p,e,i,c,u,h,P,A,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const S=m,w=m+1,y=m+2;s=Io(this,o,e,i,c,u,h,S,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function ev(n,e,t,i,s,r,o,a){let l;if(e.side===dn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Xi,a),l===null)return null;Do.copy(a),Do.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Do);return c<t.near||c>t.far?null:{distance:c,point:Do.clone(),object:n}}function Io(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Ao),n.getVertexPosition(l,Ro),n.getVertexPosition(c,Co);const u=ev(n,e,t,i,Ao,Ro,Co,Sh);if(u){const h=new L;Pn.getBarycoord(Sh,Ao,Ro,Co,h),s&&(u.uv=Pn.getInterpolatedAttribute(s,a,l,c,h,new $e)),r&&(u.uv1=Pn.getInterpolatedAttribute(r,a,l,c,h,new $e)),o&&(u.normal=Pn.getInterpolatedAttribute(o,a,l,c,h,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new L,materialIndex:0};Pn.getNormal(Ao,Ro,Co,f.normal),u.face=f,u.barycoord=h}return u}class At extends Ft{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,i,t,e,o,r,0),_("z","y","x",1,-1,i,t,-e,o,r,1),_("x","z","y",1,1,e,i,t,s,o,2),_("x","z","y",1,-1,e,i,-t,s,o,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(h,2));function _(g,m,p,S,w,y,C,P,A,R,M){const E=y/A,I=C/R,F=y/2,j=C/2,ie=P/2,Q=A+1,q=R+1;let K=0,k=0;const le=new L;for(let ve=0;ve<q;ve++){const be=ve*I-j;for(let Fe=0;Fe<Q;Fe++){const at=Fe*E-F;le[g]=at*S,le[m]=be*w,le[p]=ie,c.push(le.x,le.y,le.z),le[g]=0,le[m]=0,le[p]=P>0?1:-1,u.push(le.x,le.y,le.z),h.push(Fe/A),h.push(1-ve/R),K+=1}}for(let ve=0;ve<R;ve++)for(let be=0;be<A;be++){const Fe=f+be+Q*ve,at=f+be+Q*(ve+1),We=f+(be+1)+Q*(ve+1),st=f+(be+1)+Q*ve;l.push(Fe,at,st),l.push(at,We,st),k+=6}a.addGroup(d,k,M),d+=k,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new At(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function lr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function sn(n){const e={};for(let t=0;t<n.length;t++){const i=lr(n[t]);for(const s in i)e[s]=i[s]}return e}function tv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Qd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}const nv={clone:lr,merge:sn};var iv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends fr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iv,this.fragmentShader=sv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lr(e.uniforms),this.uniformsGroups=tv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ep extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new L,Eh=new $e,bh=new $e;class Cn extends ep{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ic*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ic*2*Math.atan(Math.tan(Vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,Eh,bh),t.subVectors(bh,Eh)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ns=-90,Os=1;class rv extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Cn(Ns,Os,e,t);s.layers=this.layers,this.add(s);const r=new Cn(Ns,Os,e,t);r.layers=this.layers,this.add(r);const o=new Cn(Ns,Os,e,t);o.layers=this.layers,this.add(o);const a=new Cn(Ns,Os,e,t);a.layers=this.layers,this.add(a);const l=new Cn(Ns,Os,e,t);l.layers=this.layers,this.add(l);const c=new Cn(Ns,Os,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class tp extends en{constructor(e=[],t=rr,i,s,r,o,a,l,c,u){super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ov extends vs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new tp(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new At(5,5,5),r=new Ci({name:"CubemapFromEquirect",uniforms:lr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:dn,blending:Gi});r.uniforms.tEquirect.value=t;const o=new Ce(s,r),a=t.minFilter;return t.minFilter===fs&&(t.minFilter=ni),new rv(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}class Mi extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const av={type:"move"};class ml{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(av)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Mi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class hu{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Qe(e),this.near=t,this.far=i}clone(){return new hu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class lv extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class cv extends en{constructor(e=null,t=1,i=1,s,r,o,a,l,c=xn,u=xn,h,f){super(null,o,a,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Th extends yn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Fs=new pt,wh=new pt,Lo=[],Ah=new $i,uv=new pt,wr=new Ce,Ar=new hr;class Rh extends Ce{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Th(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,uv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $i),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Fs),Ah.copy(e.boundingBox).applyMatrix4(Fs),this.boundingBox.union(Ah)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Fs),Ar.copy(e.boundingSphere).applyMatrix4(Fs),this.boundingSphere.union(Ar)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(wr.geometry=this.geometry,wr.material=this.material,wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ar.copy(this.boundingSphere),Ar.applyMatrix4(i),e.ray.intersectsSphere(Ar)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fs),wh.multiplyMatrices(i,Fs),wr.matrixWorld=wh,wr.raycast(e,Lo);for(let o=0,a=Lo.length;o<a;o++){const l=Lo[o];l.instanceId=r,l.object=this,t.push(l)}Lo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Th(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new cv(new Float32Array(s*this.count),s,this.count,ru,ii));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _l=new L,hv=new L,fv=new Je;class zi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=_l.subVectors(i,t).cross(hv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(_l),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||fv.getNormalMatrix(e),s=this.coplanarPoint(_l).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qi=new hr,dv=new $e(.5,.5),Uo=new L;class fu{constructor(e=new zi,t=new zi,i=new zi,s=new zi,r=new zi,o=new zi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=si,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],_=r[8],g=r[9],m=r[10],p=r[11],S=r[12],w=r[13],y=r[14],C=r[15];if(s[0].setComponents(c-o,d-u,p-_,C-S).normalize(),s[1].setComponents(c+o,d+u,p+_,C+S).normalize(),s[2].setComponents(c+a,d+h,p+g,C+w).normalize(),s[3].setComponents(c-a,d-h,p-g,C-w).normalize(),i)s[4].setComponents(l,f,m,y).normalize(),s[5].setComponents(c-l,d-f,p-m,C-y).normalize();else if(s[4].setComponents(c-l,d-f,p-m,C-y).normalize(),t===si)s[5].setComponents(c+l,d+f,p+m,C+y).normalize();else if(t===fa)s[5].setComponents(l,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(e){Qi.center.set(0,0,0);const t=dv.distanceTo(e.center);return Qi.radius=.7071067811865476+t,Qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Uo.x=s.normal.x>0?e.max.x:e.min.x,Uo.y=s.normal.y>0?e.max.y:e.min.y,Uo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Uo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xs extends fr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const da=new L,pa=new L,Ch=new pt,Rr=new Da,No=new hr,gl=new L,Ph=new L;class _i extends Lt{constructor(e=new Ft,t=new xs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)da.fromBufferAttribute(t,s-1),pa.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=da.distanceTo(pa);e.setAttribute("lineDistance",new ht(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),No.copy(i.boundingSphere),No.applyMatrix4(s),No.radius+=r,e.ray.intersectsSphere(No)===!1)return;Ch.copy(s).invert(),Rr.copy(e.ray).applyMatrix4(Ch);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=d,m=_-1;g<m;g+=c){const p=u.getX(g),S=u.getX(g+1),w=Oo(this,e,Rr,l,p,S,g);w&&t.push(w)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(d),p=Oo(this,e,Rr,l,g,m,_-1);p&&t.push(p)}}else{const d=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=d,m=_-1;g<m;g+=c){const p=Oo(this,e,Rr,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Oo(this,e,Rr,l,_-1,d,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Oo(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(da.fromBufferAttribute(a,s),pa.fromBufferAttribute(a,r),t.distanceSqToSegment(da,pa,gl,Ph)>i)return;gl.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(gl);if(!(c<e.near||c>e.far))return{distance:c,point:Ph.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Dh=new L,Ih=new L;class no extends _i{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Dh.fromBufferAttribute(t,s),Ih.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Dh.distanceTo(Ih);e.setAttribute("lineDistance",new ht(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class np extends en{constructor(e,t,i=gs,s,r,o,a=xn,l=xn,c,u=Jr,h=1){if(u!==Jr&&u!==Qr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new cu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ip extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Kt extends Ft{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let _=0;const g=[],m=i/2;let p=0;S(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new ht(h,3)),this.setAttribute("normal",new ht(f,3)),this.setAttribute("uv",new ht(d,2));function S(){const y=new L,C=new L;let P=0;const A=(t-e)/i;for(let R=0;R<=r;R++){const M=[],E=R/r,I=E*(t-e)+e;for(let F=0;F<=s;F++){const j=F/s,ie=j*l+a,Q=Math.sin(ie),q=Math.cos(ie);C.x=I*Q,C.y=-E*i+m,C.z=I*q,h.push(C.x,C.y,C.z),y.set(Q,A,q).normalize(),f.push(y.x,y.y,y.z),d.push(j,1-E),M.push(_++)}g.push(M)}for(let R=0;R<s;R++)for(let M=0;M<r;M++){const E=g[M][R],I=g[M+1][R],F=g[M+1][R+1],j=g[M][R+1];(e>0||M!==0)&&(u.push(E,I,j),P+=3),(t>0||M!==r-1)&&(u.push(I,F,j),P+=3)}c.addGroup(p,P,0),p+=P}function w(y){const C=_,P=new $e,A=new L;let R=0;const M=y===!0?e:t,E=y===!0?1:-1;for(let F=1;F<=s;F++)h.push(0,m*E,0),f.push(0,E,0),d.push(.5,.5),_++;const I=_;for(let F=0;F<=s;F++){const ie=F/s*l+a,Q=Math.cos(ie),q=Math.sin(ie);A.x=M*q,A.y=m*E,A.z=M*Q,h.push(A.x,A.y,A.z),f.push(0,E,0),P.x=Q*.5+.5,P.y=q*.5*E+.5,d.push(P.x,P.y),_++}for(let F=0;F<s;F++){const j=C+F,ie=I+F;y===!0?u.push(ie,ie+1,j):u.push(ie+1,ie,j),R+=3}c.addGroup(p,R,y===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class du extends Ft{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),c(i),u(),this.setAttribute("position",new ht(r,3)),this.setAttribute("normal",new ht(r.slice(),3)),this.setAttribute("uv",new ht(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const w=new L,y=new L,C=new L;for(let P=0;P<t.length;P+=3)d(t[P+0],w),d(t[P+1],y),d(t[P+2],C),l(w,y,C,S)}function l(S,w,y,C){const P=C+1,A=[];for(let R=0;R<=P;R++){A[R]=[];const M=S.clone().lerp(y,R/P),E=w.clone().lerp(y,R/P),I=P-R;for(let F=0;F<=I;F++)F===0&&R===P?A[R][F]=M:A[R][F]=M.clone().lerp(E,F/I)}for(let R=0;R<P;R++)for(let M=0;M<2*(P-R)-1;M++){const E=Math.floor(M/2);M%2===0?(f(A[R][E+1]),f(A[R+1][E]),f(A[R][E])):(f(A[R][E+1]),f(A[R+1][E+1]),f(A[R+1][E]))}}function c(S){const w=new L;for(let y=0;y<r.length;y+=3)w.x=r[y+0],w.y=r[y+1],w.z=r[y+2],w.normalize().multiplyScalar(S),r[y+0]=w.x,r[y+1]=w.y,r[y+2]=w.z}function u(){const S=new L;for(let w=0;w<r.length;w+=3){S.x=r[w+0],S.y=r[w+1],S.z=r[w+2];const y=m(S)/2/Math.PI+.5,C=p(S)/Math.PI+.5;o.push(y,1-C)}_(),h()}function h(){for(let S=0;S<o.length;S+=6){const w=o[S+0],y=o[S+2],C=o[S+4],P=Math.max(w,y,C),A=Math.min(w,y,C);P>.9&&A<.1&&(w<.2&&(o[S+0]+=1),y<.2&&(o[S+2]+=1),C<.2&&(o[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function d(S,w){const y=S*3;w.x=e[y+0],w.y=e[y+1],w.z=e[y+2]}function _(){const S=new L,w=new L,y=new L,C=new L,P=new $e,A=new $e,R=new $e;for(let M=0,E=0;M<r.length;M+=9,E+=6){S.set(r[M+0],r[M+1],r[M+2]),w.set(r[M+3],r[M+4],r[M+5]),y.set(r[M+6],r[M+7],r[M+8]),P.set(o[E+0],o[E+1]),A.set(o[E+2],o[E+3]),R.set(o[E+4],o[E+5]),C.copy(S).add(w).add(y).divideScalar(3);const I=m(C);g(P,E+0,S,I),g(A,E+2,w,I),g(R,E+4,y,I)}}function g(S,w,y,C){C<0&&S.x===1&&(o[w]=S.x-1),y.x===0&&y.z===0&&(o[w]=C/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new du(e.vertices,e.indices,e.radius,e.details)}}const Fo=new L,Bo=new L,vl=new L,zo=new Pn;class Lh extends Ft{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(Vr*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let _=0;_<l;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:g,b:m,c:p}=zo;if(g.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),zo.getNormal(vl),h[0]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let S=0;S<3;S++){const w=(S+1)%3,y=h[S],C=h[w],P=zo[u[S]],A=zo[u[w]],R=`${y}_${C}`,M=`${C}_${y}`;M in f&&f[M]?(vl.dot(f[M].normal)<=r&&(d.push(P.x,P.y,P.z),d.push(A.x,A.y,A.z)),f[M]=null):R in f||(f[R]={index0:c[S],index1:c[w],normal:vl.clone()})}}for(const _ in f)if(f[_]){const{index0:g,index1:m}=f[_];Fo.fromBufferAttribute(a,g),Bo.fromBufferAttribute(a,m),d.push(Fo.x,Fo.y,Fo.z),d.push(Bo.x,Bo.y,Bo.z)}this.setAttribute("position",new ht(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Gs extends du{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gs(e.radius,e.detail)}}class lo extends Ft{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=e/a,f=t/l,d=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const S=p*f-o;for(let w=0;w<c;w++){const y=w*h-r;_.push(y,-S,0),g.push(0,0,1),m.push(w/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const w=S+c*p,y=S+c*(p+1),C=S+1+c*(p+1),P=S+1+c*p;d.push(w,y,P),d.push(y,C,P)}this.setIndex(d),this.setAttribute("position",new ht(_,3)),this.setAttribute("normal",new ht(g,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.width,e.height,e.widthSegments,e.heightSegments)}}class pu extends Ft{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new L,f=new L,d=[],_=[],g=[],m=[];for(let p=0;p<=i;p++){const S=[],w=p/i;let y=0;p===0&&o===0?y=.5/t:p===i&&l===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const P=C/t;h.x=-e*Math.cos(s+P*r)*Math.sin(o+w*a),h.y=e*Math.cos(o+w*a),h.z=e*Math.sin(s+P*r)*Math.sin(o+w*a),_.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),m.push(P+y,1-w),S.push(c++)}u.push(S)}for(let p=0;p<i;p++)for(let S=0;S<t;S++){const w=u[p][S+1],y=u[p][S],C=u[p+1][S],P=u[p+1][S+1];(p!==0||o>0)&&d.push(w,y,P),(p!==i-1||l<Math.PI)&&d.push(y,C,P)}this.setIndex(d),this.setAttribute("position",new ht(_,3)),this.setAttribute("normal",new ht(g,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class cs extends Ft{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new L,h=new L,f=new L;for(let d=0;d<=i;d++)for(let _=0;_<=s;_++){const g=_/s*r,m=d/i*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(g),h.y=(e+t*Math.cos(m))*Math.sin(g),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/s),c.push(d/i)}for(let d=1;d<=i;d++)for(let _=1;_<=s;_++){const g=(s+1)*d+_-1,m=(s+1)*(d-1)+_-1,p=(s+1)*(d-1)+_,S=(s+1)*d+_;o.push(g,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new ht(a,3)),this.setAttribute("normal",new ht(l,3)),this.setAttribute("uv",new ht(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class pv extends fr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$d,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mv extends fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _v extends fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const xl={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class gv{constructor(e,t,i){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],_=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const vv=new gv;class mu{constructor(e){this.manager=e!==void 0?e:vv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}mu.DEFAULT_MATERIAL_NAME="__DEFAULT";const Bs=new WeakMap;class xv extends mu{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=xl.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let h=Bs.get(o);h===void 0&&(h=[],Bs.set(o,h)),h.push({onLoad:t,onError:s})}return o}const a=eo("img");function l(){u(),t&&t(this);const h=Bs.get(this)||[];for(let f=0;f<h.length;f++){const d=h[f];d.onLoad&&d.onLoad(this)}Bs.delete(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),xl.remove(`image:${e}`);const f=Bs.get(this)||[];for(let d=0;d<f.length;d++){const _=f[d];_.onError&&_.onError(h)}Bs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),xl.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class yv extends mu{constructor(e){super(e)}load(e,t,i,s){const r=new en,o=new xv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class sp extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Mv extends sp{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const yl=new pt,Uh=new L,Nh=new L;class Sv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=li,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fu,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Uh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Uh),Nh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Nh),t.updateMatrixWorld(),yl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class rp extends ep{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ev extends Sv{constructor(){super(new rp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Oh extends sp{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new Ev}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class bv extends Cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Fh=new pt;class op{constructor(e,t,i=0,s=1/0){this.ray=new Da(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new uu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Fh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fh),this}intersectObject(e,t=!0,i=[]){return Lc(e,this,i,t),i.sort(Bh),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Lc(e[s],this,i,t);return i.sort(Bh),i}}function Bh(n,e){return n.distance-e.distance}function Lc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Lc(r[o],e,t,!0)}}class zh{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=it(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(it(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Tv extends no{constructor(e=10,t=10,i=4473924,s=8947848){i=new Qe(i),s=new Qe(s);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let f=0,d=0,_=-a;f<=t;f++,_+=o){l.push(-a,0,_,a,0,_),l.push(_,0,-a,_,0,a);const g=f===r?i:s;g.toArray(c,d),d+=3,g.toArray(c,d),d+=3,g.toArray(c,d),d+=3,g.toArray(c,d),d+=3}const u=new Ft;u.setAttribute("position",new ht(l,3)),u.setAttribute("color",new ht(c,3));const h=new xs({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Ho=new $i;class wv extends no{constructor(e,t=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new Ft;r.setIndex(new yn(i,1)),r.setAttribute("position",new yn(s,3)),super(r,new xs({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Ho.setFromObject(this.object),Ho.isEmpty())return;const e=Ho.min,t=Ho.max,i=this.geometry.attributes.position,s=i.array;s[0]=t.x,s[1]=t.y,s[2]=t.z,s[3]=e.x,s[4]=t.y,s[5]=t.z,s[6]=e.x,s[7]=e.y,s[8]=t.z,s[9]=t.x,s[10]=e.y,s[11]=t.z,s[12]=t.x,s[13]=t.y,s[14]=e.z,s[15]=e.x,s[16]=t.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=t.x,s[22]=e.y,s[23]=e.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Av extends no{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new Ft;s.setAttribute("position",new ht(t,3)),s.setAttribute("color",new ht(i,3));const r=new xs({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,t,i){const s=new Qe,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(t),s.toArray(r,6),s.toArray(r,9),s.set(i),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class ap extends Ms{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Hh(n,e,t,i){const s=Rv(i);switch(t){case Gd:return n*e;case ru:return n*e/s.components*s.byteLength;case ou:return n*e/s.components*s.byteLength;case Xd:return n*e*2/s.components*s.byteLength;case au:return n*e*2/s.components*s.byteLength;case Wd:return n*e*3/s.components*s.byteLength;case kn:return n*e*4/s.components*s.byteLength;case lu:return n*e*4/s.components*s.byteLength;case Jo:case Qo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ea:case ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case rc:case ac:return Math.max(n,16)*Math.max(e,8)/4;case sc:case oc:return Math.max(n,8)*Math.max(e,8)/2;case lc:case cc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case uc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case dc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case pc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case mc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case _c:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case gc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case vc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case xc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case yc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Mc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Sc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ec:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case bc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Tc:case wc:case Ac:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Rc:case Cc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Pc:case Dc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rv(n){switch(n){case li:case zd:return{byteLength:1,components:1};case Kr:case Hd:case oo:return{byteLength:2,components:1};case iu:case su:return{byteLength:2,components:4};case gs:case nu:case ii:return{byteLength:4,components:1};case kd:case Vd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tu);function lp(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Cv(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<h.length;d++){const _=h[f],g=h[d];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,h[f]=g)}h.length=f+1;for(let d=0,_=h.length;d<_;d++){const g=h[d];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Pv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Iv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ov=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,zv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$v=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Kv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Jv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Qv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,e0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,t0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,n0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,i0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,s0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,r0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,o0="gl_FragColor = linearToOutputTexel( gl_FragColor );",a0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,l0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,c0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,u0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,h0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,f0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,d0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,p0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,m0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,g0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,v0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,x0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,y0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,M0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,S0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,E0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,b0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,T0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,w0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,A0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,R0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,C0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,P0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,D0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,L0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,O0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,F0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,B0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,z0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,H0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,k0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,V0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,G0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,W0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,X0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,q0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,j0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,J0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Q0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ex=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ix=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,rx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ox=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ax=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ux=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,fx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,px=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,mx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_x=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ex=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ax=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Rx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Px=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ix=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ux=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ox=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Fx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Bx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$x=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Kx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ey=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ty=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ny=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ry=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ay=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ly=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:Pv,alphahash_pars_fragment:Dv,alphamap_fragment:Iv,alphamap_pars_fragment:Lv,alphatest_fragment:Uv,alphatest_pars_fragment:Nv,aomap_fragment:Ov,aomap_pars_fragment:Fv,batching_pars_vertex:Bv,batching_vertex:zv,begin_vertex:Hv,beginnormal_vertex:kv,bsdfs:Vv,iridescence_fragment:Gv,bumpmap_pars_fragment:Wv,clipping_planes_fragment:Xv,clipping_planes_pars_fragment:$v,clipping_planes_pars_vertex:Yv,clipping_planes_vertex:qv,color_fragment:jv,color_pars_fragment:Kv,color_pars_vertex:Zv,color_vertex:Jv,common:Qv,cube_uv_reflection_fragment:e0,defaultnormal_vertex:t0,displacementmap_pars_vertex:n0,displacementmap_vertex:i0,emissivemap_fragment:s0,emissivemap_pars_fragment:r0,colorspace_fragment:o0,colorspace_pars_fragment:a0,envmap_fragment:l0,envmap_common_pars_fragment:c0,envmap_pars_fragment:u0,envmap_pars_vertex:h0,envmap_physical_pars_fragment:S0,envmap_vertex:f0,fog_vertex:d0,fog_pars_vertex:p0,fog_fragment:m0,fog_pars_fragment:_0,gradientmap_pars_fragment:g0,lightmap_pars_fragment:v0,lights_lambert_fragment:x0,lights_lambert_pars_fragment:y0,lights_pars_begin:M0,lights_toon_fragment:E0,lights_toon_pars_fragment:b0,lights_phong_fragment:T0,lights_phong_pars_fragment:w0,lights_physical_fragment:A0,lights_physical_pars_fragment:R0,lights_fragment_begin:C0,lights_fragment_maps:P0,lights_fragment_end:D0,logdepthbuf_fragment:I0,logdepthbuf_pars_fragment:L0,logdepthbuf_pars_vertex:U0,logdepthbuf_vertex:N0,map_fragment:O0,map_pars_fragment:F0,map_particle_fragment:B0,map_particle_pars_fragment:z0,metalnessmap_fragment:H0,metalnessmap_pars_fragment:k0,morphinstance_vertex:V0,morphcolor_vertex:G0,morphnormal_vertex:W0,morphtarget_pars_vertex:X0,morphtarget_vertex:$0,normal_fragment_begin:Y0,normal_fragment_maps:q0,normal_pars_fragment:j0,normal_pars_vertex:K0,normal_vertex:Z0,normalmap_pars_fragment:J0,clearcoat_normal_fragment_begin:Q0,clearcoat_normal_fragment_maps:ex,clearcoat_pars_fragment:tx,iridescence_pars_fragment:nx,opaque_fragment:ix,packing:sx,premultiplied_alpha_fragment:rx,project_vertex:ox,dithering_fragment:ax,dithering_pars_fragment:lx,roughnessmap_fragment:cx,roughnessmap_pars_fragment:ux,shadowmap_pars_fragment:hx,shadowmap_pars_vertex:fx,shadowmap_vertex:dx,shadowmask_pars_fragment:px,skinbase_vertex:mx,skinning_pars_vertex:_x,skinning_vertex:gx,skinnormal_vertex:vx,specularmap_fragment:xx,specularmap_pars_fragment:yx,tonemapping_fragment:Mx,tonemapping_pars_fragment:Sx,transmission_fragment:Ex,transmission_pars_fragment:bx,uv_pars_fragment:Tx,uv_pars_vertex:wx,uv_vertex:Ax,worldpos_vertex:Rx,background_vert:Cx,background_frag:Px,backgroundCube_vert:Dx,backgroundCube_frag:Ix,cube_vert:Lx,cube_frag:Ux,depth_vert:Nx,depth_frag:Ox,distanceRGBA_vert:Fx,distanceRGBA_frag:Bx,equirect_vert:zx,equirect_frag:Hx,linedashed_vert:kx,linedashed_frag:Vx,meshbasic_vert:Gx,meshbasic_frag:Wx,meshlambert_vert:Xx,meshlambert_frag:$x,meshmatcap_vert:Yx,meshmatcap_frag:qx,meshnormal_vert:jx,meshnormal_frag:Kx,meshphong_vert:Zx,meshphong_frag:Jx,meshphysical_vert:Qx,meshphysical_frag:ey,meshtoon_vert:ty,meshtoon_frag:ny,points_vert:iy,points_frag:sy,shadow_vert:ry,shadow_frag:oy,sprite_vert:ay,sprite_frag:ly},Ee={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},Qn={basic:{uniforms:sn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:sn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Qe(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:sn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:sn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:sn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new Qe(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:sn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:sn([Ee.points,Ee.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:sn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:sn([Ee.common,Ee.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:sn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:sn([Ee.sprite,Ee.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:sn([Ee.common,Ee.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:sn([Ee.lights,Ee.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Qn.physical={uniforms:sn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const ko={r:0,b:0,g:0},es=new $n,cy=new pt;function uy(n,e,t,i,s,r,o){const a=new Qe(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function _(w){let y=w.isScene===!0?w.background:null;return y&&y.isTexture&&(y=(w.backgroundBlurriness>0?t:e).get(y)),y}function g(w){let y=!1;const C=_(w);C===null?p(a,l):C&&C.isColor&&(p(C,1),y=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,y){const C=_(y);C&&(C.isCubeTexture||C.mapping===Pa)?(u===void 0&&(u=new Ce(new At(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:lr(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),es.copy(y.backgroundRotation),es.x*=-1,es.y*=-1,es.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(cy.makeRotationFromEuler(es)),u.material.toneMapped=ut.getTransfer(C.colorSpace)!==gt,(h!==C||f!==C.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=C,f=C.version,d=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Ce(new lo(2,2),new Ci({name:"BackgroundMaterial",uniforms:lr(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=ut.getTransfer(C.colorSpace)!==gt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||f!==C.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=C,f=C.version,d=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,y){w.getRGB(ko,Qd(n)),i.buffers.color.setClear(ko.r,ko.g,ko.b,y,o)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,y=1){a.set(w),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(a,l)},render:g,addToRenderList:m,dispose:S}}function hy(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(E,I,F,j,ie){let Q=!1;const q=h(j,F,I);r!==q&&(r=q,c(r.object)),Q=d(E,j,F,ie),Q&&_(E,j,F,ie),ie!==null&&e.update(ie,n.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,y(E,I,F,j),ie!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(ie).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function h(E,I,F){const j=F.wireframe===!0;let ie=i[E.id];ie===void 0&&(ie={},i[E.id]=ie);let Q=ie[I.id];Q===void 0&&(Q={},ie[I.id]=Q);let q=Q[j];return q===void 0&&(q=f(l()),Q[j]=q),q}function f(E){const I=[],F=[],j=[];for(let ie=0;ie<t;ie++)I[ie]=0,F[ie]=0,j[ie]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:j,object:E,attributes:{},index:null}}function d(E,I,F,j){const ie=r.attributes,Q=I.attributes;let q=0;const K=F.getAttributes();for(const k in K)if(K[k].location>=0){const ve=ie[k];let be=Q[k];if(be===void 0&&(k==="instanceMatrix"&&E.instanceMatrix&&(be=E.instanceMatrix),k==="instanceColor"&&E.instanceColor&&(be=E.instanceColor)),ve===void 0||ve.attribute!==be||be&&ve.data!==be.data)return!0;q++}return r.attributesNum!==q||r.index!==j}function _(E,I,F,j){const ie={},Q=I.attributes;let q=0;const K=F.getAttributes();for(const k in K)if(K[k].location>=0){let ve=Q[k];ve===void 0&&(k==="instanceMatrix"&&E.instanceMatrix&&(ve=E.instanceMatrix),k==="instanceColor"&&E.instanceColor&&(ve=E.instanceColor));const be={};be.attribute=ve,ve&&ve.data&&(be.data=ve.data),ie[k]=be,q++}r.attributes=ie,r.attributesNum=q,r.index=j}function g(){const E=r.newAttributes;for(let I=0,F=E.length;I<F;I++)E[I]=0}function m(E){p(E,0)}function p(E,I){const F=r.newAttributes,j=r.enabledAttributes,ie=r.attributeDivisors;F[E]=1,j[E]===0&&(n.enableVertexAttribArray(E),j[E]=1),ie[E]!==I&&(n.vertexAttribDivisor(E,I),ie[E]=I)}function S(){const E=r.newAttributes,I=r.enabledAttributes;for(let F=0,j=I.length;F<j;F++)I[F]!==E[F]&&(n.disableVertexAttribArray(F),I[F]=0)}function w(E,I,F,j,ie,Q,q){q===!0?n.vertexAttribIPointer(E,I,F,ie,Q):n.vertexAttribPointer(E,I,F,j,ie,Q)}function y(E,I,F,j){g();const ie=j.attributes,Q=F.getAttributes(),q=I.defaultAttributeValues;for(const K in Q){const k=Q[K];if(k.location>=0){let le=ie[K];if(le===void 0&&(K==="instanceMatrix"&&E.instanceMatrix&&(le=E.instanceMatrix),K==="instanceColor"&&E.instanceColor&&(le=E.instanceColor)),le!==void 0){const ve=le.normalized,be=le.itemSize,Fe=e.get(le);if(Fe===void 0)continue;const at=Fe.buffer,We=Fe.type,st=Fe.bytesPerElement,oe=We===n.INT||We===n.UNSIGNED_INT||le.gpuType===nu;if(le.isInterleavedBufferAttribute){const ue=le.data,Pe=ue.stride,ze=le.offset;if(ue.isInstancedInterleavedBuffer){for(let Ue=0;Ue<k.locationSize;Ue++)p(k.location+Ue,ue.meshPerAttribute);E.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ue=0;Ue<k.locationSize;Ue++)m(k.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,at);for(let Ue=0;Ue<k.locationSize;Ue++)w(k.location+Ue,be/k.locationSize,We,ve,Pe*st,(ze+be/k.locationSize*Ue)*st,oe)}else{if(le.isInstancedBufferAttribute){for(let ue=0;ue<k.locationSize;ue++)p(k.location+ue,le.meshPerAttribute);E.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ue=0;ue<k.locationSize;ue++)m(k.location+ue);n.bindBuffer(n.ARRAY_BUFFER,at);for(let ue=0;ue<k.locationSize;ue++)w(k.location+ue,be/k.locationSize,We,ve,be*st,be/k.locationSize*ue*st,oe)}}else if(q!==void 0){const ve=q[K];if(ve!==void 0)switch(ve.length){case 2:n.vertexAttrib2fv(k.location,ve);break;case 3:n.vertexAttrib3fv(k.location,ve);break;case 4:n.vertexAttrib4fv(k.location,ve);break;default:n.vertexAttrib1fv(k.location,ve)}}}}S()}function C(){R();for(const E in i){const I=i[E];for(const F in I){const j=I[F];for(const ie in j)u(j[ie].object),delete j[ie];delete I[F]}delete i[E]}}function P(E){if(i[E.id]===void 0)return;const I=i[E.id];for(const F in I){const j=I[F];for(const ie in j)u(j[ie].object),delete j[ie];delete I[F]}delete i[E.id]}function A(E){for(const I in i){const F=i[I];if(F[E.id]===void 0)continue;const j=F[E.id];for(const ie in j)u(j[ie].object),delete j[ie];delete F[E.id]}}function R(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:P,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:S}}function fy(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let _=0;_<h;_++)d+=u[_];t.update(d,i,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*f[g];t.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dy(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==kn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const R=A===oo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==li&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==ii&&!R)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:y,vertexTextures:C,maxSamples:P}}function py(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new zi,a=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{const S=r?0:i,w=S*4;let y=p.clippingState||null;l.value=y,y=u(_,f,w,d);for(let C=0;C!==w;++C)y[C]=t[C];p.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,d,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=d+g*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,y=d;w!==g;++w,y+=4)o.copy(h[w]).applyMatrix4(S,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function my(n){let e=new WeakMap;function t(o,a){return a===ec?o.mapping=rr:a===tc&&(o.mapping=or),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ec||a===tc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ov(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Ws=4,kh=[.125,.215,.35,.446,.526,.582],us=20,Ml=new rp,Vh=new Qe;let Sl=null,El=0,bl=0,Tl=!1;const os=(1+Math.sqrt(5))/2,zs=1/os,Gh=[new L(-os,zs,0),new L(os,zs,0),new L(-zs,0,os),new L(zs,0,os),new L(0,os,-zs),new L(0,os,zs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],_y=new L;class Wh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=_y}=r;Sl=this._renderer.getRenderTarget(),El=this._renderer.getActiveCubeFace(),bl=this._renderer.getActiveMipmapLevel(),Tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sl,El,bl),this._renderer.xr.enabled=Tl,e.scissorTest=!1,Vo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rr||e.mapping===or?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sl=this._renderer.getRenderTarget(),El=this._renderer.getActiveCubeFace(),bl=this._renderer.getActiveMipmapLevel(),Tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:oo,format:kn,colorSpace:ar,depthBuffer:!1},s=Xh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xh(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gy(r)),this._blurMaterial=vy(r,e,t)}return s}_compileMaterial(e){const t=new Ce(this._lodPlanes[0],e);this._renderer.compile(t,Ml)}_sceneToCubeUV(e,t,i,s,r){const l=new Cn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Vh),h.toneMapping=Wi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const g=new Ia({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),m=new Ce(new At,g);let p=!1;const S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,p=!0):(g.color.copy(Vh),p=!0);for(let w=0;w<6;w++){const y=w%3;y===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[w],r.y,r.z)):y===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[w]));const C=this._cubeSize;Vo(s,y*C,w>2?C:0,C,C),h.setRenderTarget(s),p&&h.render(m,l),h.render(e,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=S}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===rr||e.mapping===or;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$h());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ce(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Vo(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Ml)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Gh[(s-r-1)%Gh.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ce(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*us-1),g=r/_,m=isFinite(r)?1+Math.floor(u*g):us;m>us&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${us}`);const p=[];let S=0;for(let A=0;A<us;++A){const R=A/g,M=Math.exp(-R*R/2);p.push(M),A===0?S+=M:A<m&&(S+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:w}=this;f.dTheta.value=_,f.mipInt.value=w-i;const y=this._sizeLods[s],C=3*y*(s>w-Ws?s-w+Ws:0),P=4*(this._cubeSize-y);Vo(t,C,P,3*y,2*y),l.setRenderTarget(t),l.render(h,Ml)}}function gy(n){const e=[],t=[],i=[];let s=n;const r=n-Ws+1+kh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-Ws?l=kh[o-n+Ws-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,g=3,m=2,p=1,S=new Float32Array(g*_*d),w=new Float32Array(m*_*d),y=new Float32Array(p*_*d);for(let P=0;P<d;P++){const A=P%3*2/3-1,R=P>2?0:-1,M=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];S.set(M,g*_*P),w.set(f,m*_*P);const E=[P,P,P,P,P,P];y.set(E,p*_*P)}const C=new Ft;C.setAttribute("position",new yn(S,g)),C.setAttribute("uv",new yn(w,m)),C.setAttribute("faceIndex",new yn(y,p)),e.push(C),s>Ws&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Xh(n,e,t){const i=new vs(n,e,t);return i.texture.mapping=Pa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Vo(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function vy(n,e,t){const i=new Float32Array(us),s=new L(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:us,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_u(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Gi,depthTest:!1,depthWrite:!1})}function $h(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_u(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gi,depthTest:!1,depthWrite:!1})}function Yh(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_u(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gi,depthTest:!1,depthWrite:!1})}function _u(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function xy(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===ec||l===tc,u=l===rr||l===or;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Wh(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new Wh(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function yy(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&to("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function My(n,e,t,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],n.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,_=h.attributes.position;let g=0;if(d!==null){const S=d.array;g=d.version;for(let w=0,y=S.length;w<y;w+=3){const C=S[w+0],P=S[w+1],A=S[w+2];f.push(C,P,P,A,A,C)}}else if(_!==void 0){const S=_.array;g=_.version;for(let w=0,y=S.length/3-1;w<y;w+=3){const C=w+0,P=w+1,A=w+2;f.push(C,P,P,A,A,C)}}else return;const m=new(qd(f)?Jd:Zd)(f,1);m.version=g;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Sy(n,e,t){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*o),t.update(d,i,1)}function c(f,d,_){_!==0&&(n.drawElementsInstanced(i,d,r,f*o,_),t.update(d,i,_))}function u(f,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];t.update(m,i,1)}function h(f,d,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,g,0,_);let p=0;for(let S=0;S<_;S++)p+=d[S]*g[S];t.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Ey(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function by(n,e,t){const i=new WeakMap,s=new Dt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let E=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",E)};var d=E;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),m===!0&&(y=3);let C=a.attributes.position.count*y,P=1;C>e.maxTextureSize&&(P=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const A=new Float32Array(C*P*4*h),R=new jd(A,C,P,h);R.type=ii,R.needsUpdate=!0;const M=y*4;for(let I=0;I<h;I++){const F=p[I],j=S[I],ie=w[I],Q=C*P*4*I;for(let q=0;q<F.count;q++){const K=q*M;_===!0&&(s.fromBufferAttribute(F,q),A[Q+K+0]=s.x,A[Q+K+1]=s.y,A[Q+K+2]=s.z,A[Q+K+3]=0),g===!0&&(s.fromBufferAttribute(j,q),A[Q+K+4]=s.x,A[Q+K+5]=s.y,A[Q+K+6]=s.z,A[Q+K+7]=0),m===!0&&(s.fromBufferAttribute(ie,q),A[Q+K+8]=s.x,A[Q+K+9]=s.y,A[Q+K+10]=s.z,A[Q+K+11]=ie.itemSize===4?s.w:1)}}f={count:h,texture:R,size:new $e(C,P)},i.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Ty(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const cp=new en,qh=new np(1,1),up=new jd,hp=new Gg,fp=new tp,jh=[],Kh=[],Zh=new Float32Array(16),Jh=new Float32Array(9),Qh=new Float32Array(4);function dr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=jh[s];if(r===void 0&&(r=new Float32Array(s),jh[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function La(n,e){let t=Kh[e];t===void 0&&(t=new Int32Array(e),Kh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function wy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ay(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function Ry(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function Cy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function Py(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Qh.set(i),n.uniformMatrix2fv(this.addr,!1,Qh),zt(t,i)}}function Dy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Jh.set(i),n.uniformMatrix3fv(this.addr,!1,Jh),zt(t,i)}}function Iy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Zh.set(i),n.uniformMatrix4fv(this.addr,!1,Zh),zt(t,i)}}function Ly(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Uy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function Ny(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function Oy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function Fy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function By(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function zy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function Hy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function ky(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(qh.compareFunction=Yd,r=qh):r=cp,t.setTexture2D(e||r,s)}function Vy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||hp,s)}function Gy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||fp,s)}function Wy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||up,s)}function Xy(n){switch(n){case 5126:return wy;case 35664:return Ay;case 35665:return Ry;case 35666:return Cy;case 35674:return Py;case 35675:return Dy;case 35676:return Iy;case 5124:case 35670:return Ly;case 35667:case 35671:return Uy;case 35668:case 35672:return Ny;case 35669:case 35673:return Oy;case 5125:return Fy;case 36294:return By;case 36295:return zy;case 36296:return Hy;case 35678:case 36198:case 36298:case 36306:case 35682:return ky;case 35679:case 36299:case 36307:return Vy;case 35680:case 36300:case 36308:case 36293:return Gy;case 36289:case 36303:case 36311:case 36292:return Wy}}function $y(n,e){n.uniform1fv(this.addr,e)}function Yy(n,e){const t=dr(e,this.size,2);n.uniform2fv(this.addr,t)}function qy(n,e){const t=dr(e,this.size,3);n.uniform3fv(this.addr,t)}function jy(n,e){const t=dr(e,this.size,4);n.uniform4fv(this.addr,t)}function Ky(n,e){const t=dr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Zy(n,e){const t=dr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Jy(n,e){const t=dr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Qy(n,e){n.uniform1iv(this.addr,e)}function eM(n,e){n.uniform2iv(this.addr,e)}function tM(n,e){n.uniform3iv(this.addr,e)}function nM(n,e){n.uniform4iv(this.addr,e)}function iM(n,e){n.uniform1uiv(this.addr,e)}function sM(n,e){n.uniform2uiv(this.addr,e)}function rM(n,e){n.uniform3uiv(this.addr,e)}function oM(n,e){n.uniform4uiv(this.addr,e)}function aM(n,e,t){const i=this.cache,s=e.length,r=La(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||cp,r[o])}function lM(n,e,t){const i=this.cache,s=e.length,r=La(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||hp,r[o])}function cM(n,e,t){const i=this.cache,s=e.length,r=La(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||fp,r[o])}function uM(n,e,t){const i=this.cache,s=e.length,r=La(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||up,r[o])}function hM(n){switch(n){case 5126:return $y;case 35664:return Yy;case 35665:return qy;case 35666:return jy;case 35674:return Ky;case 35675:return Zy;case 35676:return Jy;case 5124:case 35670:return Qy;case 35667:case 35671:return eM;case 35668:case 35672:return tM;case 35669:case 35673:return nM;case 5125:return iM;case 36294:return sM;case 36295:return rM;case 36296:return oM;case 35678:case 36198:case 36298:case 36306:case 35682:return aM;case 35679:case 36299:case 36307:return lM;case 35680:case 36300:case 36308:case 36293:return cM;case 36289:case 36303:case 36311:case 36292:return uM}}class fM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Xy(t.type)}}class dM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hM(t.type)}}class pM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const wl=/(\w+)(\])?(\[|\.)?/g;function ef(n,e){n.seq.push(e),n.map[e.id]=e}function mM(n,e,t){const i=n.name,s=i.length;for(wl.lastIndex=0;;){const r=wl.exec(i),o=wl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){ef(t,c===void 0?new fM(a,n,e):new dM(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new pM(a),ef(t,h)),t=h}}}class na{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);mM(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function tf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const _M=37297;let gM=0;function vM(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const nf=new Je;function xM(n){ut._getMatrix(nf,ut.workingColorSpace,n);const e=`mat3( ${nf.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(n)){case ha:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function sf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+vM(n.getShaderSource(e),a)}else return r}function yM(n,e){const t=xM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function MM(n,e){let t;switch(e){case mg:t="Linear";break;case _g:t="Reinhard";break;case gg:t="Cineon";break;case vg:t="ACESFilmic";break;case yg:t="AgX";break;case Mg:t="Neutral";break;case xg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Go=new L;function SM(){ut.getLuminanceCoefficients(Go);const n=Go.x.toFixed(4),e=Go.y.toFixed(4),t=Go.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function EM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function bM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function TM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Lr(n){return n!==""}function rf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function of(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uc(n){return n.replace(wM,RM)}const AM=new Map;function RM(n,e){let t=et[e];if(t===void 0){const i=AM.get(e);if(i!==void 0)t=et[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Uc(t)}const CM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function af(n){return n.replace(CM,PM)}function PM(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lf(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function DM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Od?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===q_?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===mi&&(e="SHADOWMAP_TYPE_VSM"),e}function IM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case rr:case or:e="ENVMAP_TYPE_CUBE";break;case Pa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function LM(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===or&&(e="ENVMAP_MODE_REFRACTION"),e}function UM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Fd:e="ENVMAP_BLENDING_MULTIPLY";break;case dg:e="ENVMAP_BLENDING_MIX";break;case pg:e="ENVMAP_BLENDING_ADD";break}return e}function NM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function OM(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=DM(t),c=IM(t),u=LM(t),h=UM(t),f=NM(t),d=EM(t),_=bM(r),g=s.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Lr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Lr).join(`
`),p.length>0&&(p+=`
`)):(m=[lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),p=[lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wi?"#define TONE_MAPPING":"",t.toneMapping!==Wi?et.tonemapping_pars_fragment:"",t.toneMapping!==Wi?MM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,yM("linearToOutputTexel",t.outputColorSpace),SM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),o=Uc(o),o=rf(o,t),o=of(o,t),a=Uc(a),a=rf(a,t),a=of(a,t),o=af(o),a=af(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ah?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ah?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=S+m+o,y=S+p+a,C=tf(s,s.VERTEX_SHADER,w),P=tf(s,s.FRAGMENT_SHADER,y);s.attachShader(g,C),s.attachShader(g,P),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(I){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(g)||"",j=s.getShaderInfoLog(C)||"",ie=s.getShaderInfoLog(P)||"",Q=F.trim(),q=j.trim(),K=ie.trim();let k=!0,le=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,C,P);else{const ve=sf(s,C,"vertex"),be=sf(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+Q+`
`+ve+`
`+be)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(q===""||K==="")&&(le=!1);le&&(I.diagnostics={runnable:k,programLog:Q,vertexShader:{log:q,prefix:m},fragmentShader:{log:K,prefix:p}})}s.deleteShader(C),s.deleteShader(P),R=new na(s,g),M=TM(s,g)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(g,_M)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=P,this}let FM=0;class BM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new zM(e),t.set(e,i)),i}}class zM{constructor(e){this.id=FM++,this.code=e,this.usedTimes=0}}function HM(n,e,t,i,s,r,o){const a=new uu,l=new BM,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,E,I,F,j){const ie=F.fog,Q=j.geometry,q=M.isMeshStandardMaterial?F.environment:null,K=(M.isMeshStandardMaterial?t:e).get(M.envMap||q),k=K&&K.mapping===Pa?K.image.height:null,le=_[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const ve=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,be=ve!==void 0?ve.length:0;let Fe=0;Q.morphAttributes.position!==void 0&&(Fe=1),Q.morphAttributes.normal!==void 0&&(Fe=2),Q.morphAttributes.color!==void 0&&(Fe=3);let at,We,st,oe;if(le){const lt=Qn[le];at=lt.vertexShader,We=lt.fragmentShader}else at=M.vertexShader,We=M.fragmentShader,l.update(M),st=l.getVertexShaderID(M),oe=l.getFragmentShaderID(M);const ue=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),ze=j.isInstancedMesh===!0,Ue=j.isBatchedMesh===!0,nt=!!M.map,D=!!M.matcap,v=!!K,W=!!M.aoMap,Z=!!M.lightMap,Y=!!M.bumpMap,H=!!M.normalMap,fe=!!M.displacementMap,J=!!M.emissiveMap,re=!!M.metalnessMap,ne=!!M.roughnessMap,Se=M.anisotropy>0,b=M.clearcoat>0,x=M.dispersion>0,U=M.iridescence>0,X=M.sheen>0,se=M.transmission>0,$=Se&&!!M.anisotropyMap,xe=b&&!!M.clearcoatMap,he=b&&!!M.clearcoatNormalMap,we=b&&!!M.clearcoatRoughnessMap,Te=U&&!!M.iridescenceMap,pe=U&&!!M.iridescenceThicknessMap,ye=X&&!!M.sheenColorMap,De=X&&!!M.sheenRoughnessMap,Re=!!M.specularMap,Me=!!M.specularColorMap,Ye=!!M.specularIntensityMap,N=se&&!!M.transmissionMap,me=se&&!!M.thicknessMap,ge=!!M.gradientMap,Ie=!!M.alphaMap,de=M.alphaTest>0,ce=!!M.alphaHash,Ne=!!M.extensions;let je=Wi;M.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(je=n.toneMapping);const mt={shaderID:le,shaderType:M.type,shaderName:M.name,vertexShader:at,fragmentShader:We,defines:M.defines,customVertexShaderID:st,customFragmentShaderID:oe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Ue,batchingColor:Ue&&j._colorsTexture!==null,instancing:ze,instancingColor:ze&&j.instanceColor!==null,instancingMorph:ze&&j.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ue===null?n.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:ar,alphaToCoverage:!!M.alphaToCoverage,map:nt,matcap:D,envMap:v,envMapMode:v&&K.mapping,envMapCubeUVHeight:k,aoMap:W,lightMap:Z,bumpMap:Y,normalMap:H,displacementMap:f&&fe,emissiveMap:J,normalMapObjectSpace:H&&M.normalMapType===Tg,normalMapTangentSpace:H&&M.normalMapType===$d,metalnessMap:re,roughnessMap:ne,anisotropy:Se,anisotropyMap:$,clearcoat:b,clearcoatMap:xe,clearcoatNormalMap:he,clearcoatRoughnessMap:we,dispersion:x,iridescence:U,iridescenceMap:Te,iridescenceThicknessMap:pe,sheen:X,sheenColorMap:ye,sheenRoughnessMap:De,specularMap:Re,specularColorMap:Me,specularIntensityMap:Ye,transmission:se,transmissionMap:N,thicknessMap:me,gradientMap:ge,opaque:M.transparent===!1&&M.blending===Js&&M.alphaToCoverage===!1,alphaMap:Ie,alphaTest:de,alphaHash:ce,combine:M.combine,mapUv:nt&&g(M.map.channel),aoMapUv:W&&g(M.aoMap.channel),lightMapUv:Z&&g(M.lightMap.channel),bumpMapUv:Y&&g(M.bumpMap.channel),normalMapUv:H&&g(M.normalMap.channel),displacementMapUv:fe&&g(M.displacementMap.channel),emissiveMapUv:J&&g(M.emissiveMap.channel),metalnessMapUv:re&&g(M.metalnessMap.channel),roughnessMapUv:ne&&g(M.roughnessMap.channel),anisotropyMapUv:$&&g(M.anisotropyMap.channel),clearcoatMapUv:xe&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:he&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:De&&g(M.sheenRoughnessMap.channel),specularMapUv:Re&&g(M.specularMap.channel),specularColorMapUv:Me&&g(M.specularColorMap.channel),specularIntensityMapUv:Ye&&g(M.specularIntensityMap.channel),transmissionMapUv:N&&g(M.transmissionMap.channel),thicknessMapUv:me&&g(M.thicknessMap.channel),alphaMapUv:Ie&&g(M.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(H||Se),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!Q.attributes.uv&&(nt||Ie),fog:!!ie,useFog:M.fog===!0,fogExp2:!!ie&&ie.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Pe,skinning:j.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Fe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:je,decodeVideoTexture:nt&&M.map.isVideoTexture===!0&&ut.getTransfer(M.map.colorSpace)===gt,decodeVideoTextureEmissive:J&&M.emissiveMap.isVideoTexture===!0&&ut.getTransfer(M.emissiveMap.colorSpace)===gt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Hn,flipSided:M.side===dn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ne&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&M.extensions.multiDraw===!0||Ue)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function p(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const I in M.defines)E.push(I),E.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(S(E,M),w(E,M),E.push(n.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function S(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function w(M,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),E.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){const E=_[M.type];let I;if(E){const F=Qn[E];I=nv.clone(F.uniforms)}else I=M.uniforms;return I}function C(M,E){let I;for(let F=0,j=u.length;F<j;F++){const ie=u[F];if(ie.cacheKey===E){I=ie,++I.usedTimes;break}}return I===void 0&&(I=new OM(n,E,M,r),u.push(I)),I}function P(M){if(--M.usedTimes===0){const E=u.indexOf(M);u[E]=u[u.length-1],u.pop(),M.destroy()}}function A(M){l.remove(M)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:C,releaseProgram:P,releaseShaderCache:A,programs:u,dispose:R}}function kM(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function VM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function cf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function uf(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h,f,d,_,g,m){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},n[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=g,p.group=m),e++,p}function a(h,f,d,_,g,m){const p=o(h,f,d,_,g,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):t.push(p)}function l(h,f,d,_,g,m){const p=o(h,f,d,_,g,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||VM),i.length>1&&i.sort(f||cf),s.length>1&&s.sort(f||cf)}function u(){for(let h=e,f=n.length;h<f;h++){const d=n[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function GM(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new uf,n.set(i,[o])):s>=r.length?(o=new uf,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function WM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Qe};break;case"SpotLight":t={position:new L,direction:new L,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function XM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let $M=0;function YM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function qM(n){const e=new WM,t=XM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,r=new pt,o=new pt;function a(c){let u=0,h=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let d=0,_=0,g=0,m=0,p=0,S=0,w=0,y=0,C=0,P=0,A=0;c.sort(YM);for(let M=0,E=c.length;M<E;M++){const I=c[M],F=I.color,j=I.intensity,ie=I.distance,Q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=F.r*j,h+=F.g*j,f+=F.b*j;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],j);A++}else if(I.isDirectionalLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const K=I.shadow,k=t.get(I);k.shadowIntensity=K.intensity,k.shadowBias=K.bias,k.shadowNormalBias=K.normalBias,k.shadowRadius=K.radius,k.shadowMapSize=K.mapSize,i.directionalShadow[d]=k,i.directionalShadowMap[d]=Q,i.directionalShadowMatrix[d]=I.shadow.matrix,S++}i.directional[d]=q,d++}else if(I.isSpotLight){const q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(F).multiplyScalar(j),q.distance=ie,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[g]=q;const K=I.shadow;if(I.map&&(i.spotLightMap[C]=I.map,C++,K.updateMatrices(I),I.castShadow&&P++),i.spotLightMatrix[g]=K.matrix,I.castShadow){const k=t.get(I);k.shadowIntensity=K.intensity,k.shadowBias=K.bias,k.shadowNormalBias=K.normalBias,k.shadowRadius=K.radius,k.shadowMapSize=K.mapSize,i.spotShadow[g]=k,i.spotShadowMap[g]=Q,y++}g++}else if(I.isRectAreaLight){const q=e.get(I);q.color.copy(F).multiplyScalar(j),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=q,m++}else if(I.isPointLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){const K=I.shadow,k=t.get(I);k.shadowIntensity=K.intensity,k.shadowBias=K.bias,k.shadowNormalBias=K.normalBias,k.shadowRadius=K.radius,k.shadowMapSize=K.mapSize,k.shadowCameraNear=K.camera.near,k.shadowCameraFar=K.camera.far,i.pointShadow[_]=k,i.pointShadowMap[_]=Q,i.pointShadowMatrix[_]=I.shadow.matrix,w++}i.point[_]=q,_++}else if(I.isHemisphereLight){const q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(j),q.groundColor.copy(I.groundColor).multiplyScalar(j),i.hemi[p]=q,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const R=i.hash;(R.directionalLength!==d||R.pointLength!==_||R.spotLength!==g||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==S||R.numPointShadows!==w||R.numSpotShadows!==y||R.numSpotMaps!==C||R.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=y+C-P,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=A,R.directionalLength=d,R.pointLength=_,R.spotLength=g,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=S,R.numPointShadows=w,R.numSpotShadows=y,R.numSpotMaps=C,R.numLightProbes=A,i.version=$M++)}function l(c,u){let h=0,f=0,d=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const w=c[p];if(w.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),h++}else if(w.isSpotLight){const y=i.spot[d];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(w.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(w.width*.5,0,0),y.halfHeight.set(0,w.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(w.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(w.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:i}}function hf(n){const e=new qM(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function jM(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new hf(n),e.set(s,[a])):r>=o.length?(a=new hf(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const KM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function JM(n,e,t){let i=new fu;const s=new $e,r=new $e,o=new Dt,a=new mv({depthPacking:bg}),l=new _v,c={},u=t.maxTextureSize,h={[Xi]:dn,[dn]:Xi,[Hn]:Hn},f=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:KM,fragmentShader:ZM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new Ft;_.setAttribute("position",new yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ce(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Od;let p=this.type;this.render=function(P,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const M=n.getRenderTarget(),E=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Gi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const j=p!==mi&&this.type===mi,ie=p===mi&&this.type!==mi;for(let Q=0,q=P.length;Q<q;Q++){const K=P[Q],k=K.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const le=k.getFrameExtents();if(s.multiply(le),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/le.x),s.x=r.x*le.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/le.y),s.y=r.y*le.y,k.mapSize.y=r.y)),k.map===null||j===!0||ie===!0){const be=this.type!==mi?{minFilter:xn,magFilter:xn}:{};k.map!==null&&k.map.dispose(),k.map=new vs(s.x,s.y,be),k.map.texture.name=K.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const ve=k.getViewportCount();for(let be=0;be<ve;be++){const Fe=k.getViewport(be);o.set(r.x*Fe.x,r.y*Fe.y,r.x*Fe.z,r.y*Fe.w),F.viewport(o),k.updateMatrices(K,be),i=k.getFrustum(),y(A,R,k.camera,K,this.type)}k.isPointLightShadow!==!0&&this.type===mi&&S(k,R),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(M,E,I)};function S(P,A){const R=e.update(g);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,d.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new vs(s.x,s.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(A,null,R,f,g,null),d.uniforms.shadow_pass.value=P.mapPass.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(A,null,R,d,g,null)}function w(P,A,R,M){let E=null;const I=R.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(I!==void 0)E=I;else if(E=R.isPointLight===!0?l:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=E.uuid,j=A.uuid;let ie=c[F];ie===void 0&&(ie={},c[F]=ie);let Q=ie[j];Q===void 0&&(Q=E.clone(),ie[j]=Q,A.addEventListener("dispose",C)),E=Q}if(E.visible=A.visible,E.wireframe=A.wireframe,M===mi?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:h[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,R.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const F=n.properties.get(E);F.light=R}return E}function y(P,A,R,M,E){if(P.visible===!1)return;if(P.layers.test(A.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&E===mi)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,P.matrixWorld);const j=e.update(P),ie=P.material;if(Array.isArray(ie)){const Q=j.groups;for(let q=0,K=Q.length;q<K;q++){const k=Q[q],le=ie[k.materialIndex];if(le&&le.visible){const ve=w(P,le,M,E);P.onBeforeShadow(n,P,A,R,j,ve,k),n.renderBufferDirect(R,null,j,ve,P,k),P.onAfterShadow(n,P,A,R,j,ve,k)}}}else if(ie.visible){const Q=w(P,ie,M,E);P.onBeforeShadow(n,P,A,R,j,Q,null),n.renderBufferDirect(R,null,j,Q,P,null),P.onAfterShadow(n,P,A,R,j,Q,null)}}const F=P.children;for(let j=0,ie=F.length;j<ie;j++)y(F[j],A,R,M,E)}function C(P){P.target.removeEventListener("dispose",C);for(const R in c){const M=c[R],E=P.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}const QM={[Yl]:ql,[jl]:Jl,[Kl]:Ql,[sr]:Zl,[ql]:Yl,[Jl]:jl,[Ql]:Kl,[Zl]:sr};function eS(n,e){function t(){let N=!1;const me=new Dt;let ge=null;const Ie=new Dt(0,0,0,0);return{setMask:function(de){ge!==de&&!N&&(n.colorMask(de,de,de,de),ge=de)},setLocked:function(de){N=de},setClear:function(de,ce,Ne,je,mt){mt===!0&&(de*=je,ce*=je,Ne*=je),me.set(de,ce,Ne,je),Ie.equals(me)===!1&&(n.clearColor(de,ce,Ne,je),Ie.copy(me))},reset:function(){N=!1,ge=null,Ie.set(-1,0,0,0)}}}function i(){let N=!1,me=!1,ge=null,Ie=null,de=null;return{setReversed:function(ce){if(me!==ce){const Ne=e.get("EXT_clip_control");ce?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),me=ce;const je=de;de=null,this.setClear(je)}},getReversed:function(){return me},setTest:function(ce){ce?ue(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(ce){ge!==ce&&!N&&(n.depthMask(ce),ge=ce)},setFunc:function(ce){if(me&&(ce=QM[ce]),Ie!==ce){switch(ce){case Yl:n.depthFunc(n.NEVER);break;case ql:n.depthFunc(n.ALWAYS);break;case jl:n.depthFunc(n.LESS);break;case sr:n.depthFunc(n.LEQUAL);break;case Kl:n.depthFunc(n.EQUAL);break;case Zl:n.depthFunc(n.GEQUAL);break;case Jl:n.depthFunc(n.GREATER);break;case Ql:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ie=ce}},setLocked:function(ce){N=ce},setClear:function(ce){de!==ce&&(me&&(ce=1-ce),n.clearDepth(ce),de=ce)},reset:function(){N=!1,ge=null,Ie=null,de=null,me=!1}}}function s(){let N=!1,me=null,ge=null,Ie=null,de=null,ce=null,Ne=null,je=null,mt=null;return{setTest:function(lt){N||(lt?ue(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(lt){me!==lt&&!N&&(n.stencilMask(lt),me=lt)},setFunc:function(lt,Un,Mn){(ge!==lt||Ie!==Un||de!==Mn)&&(n.stencilFunc(lt,Un,Mn),ge=lt,Ie=Un,de=Mn)},setOp:function(lt,Un,Mn){(ce!==lt||Ne!==Un||je!==Mn)&&(n.stencilOp(lt,Un,Mn),ce=lt,Ne=Un,je=Mn)},setLocked:function(lt){N=lt},setClear:function(lt){mt!==lt&&(n.clearStencil(lt),mt=lt)},reset:function(){N=!1,me=null,ge=null,Ie=null,de=null,ce=null,Ne=null,je=null,mt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,S=null,w=null,y=null,C=null,P=null,A=new Qe(0,0,0),R=0,M=!1,E=null,I=null,F=null,j=null,ie=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,K=0;const k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(k)[1]),q=K>=1):k.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),q=K>=2);let le=null,ve={};const be=n.getParameter(n.SCISSOR_BOX),Fe=n.getParameter(n.VIEWPORT),at=new Dt().fromArray(be),We=new Dt().fromArray(Fe);function st(N,me,ge,Ie){const de=new Uint8Array(4),ce=n.createTexture();n.bindTexture(N,ce),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<ge;Ne++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(me,0,n.RGBA,1,1,Ie,0,n.RGBA,n.UNSIGNED_BYTE,de):n.texImage2D(me+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,de);return ce}const oe={};oe[n.TEXTURE_2D]=st(n.TEXTURE_2D,n.TEXTURE_2D,1),oe[n.TEXTURE_CUBE_MAP]=st(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[n.TEXTURE_2D_ARRAY]=st(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),oe[n.TEXTURE_3D]=st(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(n.DEPTH_TEST),o.setFunc(sr),Y(!1),H(th),ue(n.CULL_FACE),W(Gi);function ue(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Pe(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function ze(N,me){return h[N]!==me?(n.bindFramebuffer(N,me),h[N]=me,N===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=me),N===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=me),!0):!1}function Ue(N,me){let ge=d,Ie=!1;if(N){ge=f.get(me),ge===void 0&&(ge=[],f.set(me,ge));const de=N.textures;if(ge.length!==de.length||ge[0]!==n.COLOR_ATTACHMENT0){for(let ce=0,Ne=de.length;ce<Ne;ce++)ge[ce]=n.COLOR_ATTACHMENT0+ce;ge.length=de.length,Ie=!0}}else ge[0]!==n.BACK&&(ge[0]=n.BACK,Ie=!0);Ie&&n.drawBuffers(ge)}function nt(N){return _!==N?(n.useProgram(N),_=N,!0):!1}const D={[ls]:n.FUNC_ADD,[K_]:n.FUNC_SUBTRACT,[Z_]:n.FUNC_REVERSE_SUBTRACT};D[J_]=n.MIN,D[Q_]=n.MAX;const v={[eg]:n.ZERO,[tg]:n.ONE,[ng]:n.SRC_COLOR,[Xl]:n.SRC_ALPHA,[lg]:n.SRC_ALPHA_SATURATE,[og]:n.DST_COLOR,[sg]:n.DST_ALPHA,[ig]:n.ONE_MINUS_SRC_COLOR,[$l]:n.ONE_MINUS_SRC_ALPHA,[ag]:n.ONE_MINUS_DST_COLOR,[rg]:n.ONE_MINUS_DST_ALPHA,[cg]:n.CONSTANT_COLOR,[ug]:n.ONE_MINUS_CONSTANT_COLOR,[hg]:n.CONSTANT_ALPHA,[fg]:n.ONE_MINUS_CONSTANT_ALPHA};function W(N,me,ge,Ie,de,ce,Ne,je,mt,lt){if(N===Gi){g===!0&&(Pe(n.BLEND),g=!1);return}if(g===!1&&(ue(n.BLEND),g=!0),N!==j_){if(N!==m||lt!==M){if((p!==ls||y!==ls)&&(n.blendEquation(n.FUNC_ADD),p=ls,y=ls),lt)switch(N){case Js:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nh:n.blendFunc(n.ONE,n.ONE);break;case ih:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case sh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Js:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ih:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,w=null,C=null,P=null,A.set(0,0,0),R=0,m=N,M=lt}return}de=de||me,ce=ce||ge,Ne=Ne||Ie,(me!==p||de!==y)&&(n.blendEquationSeparate(D[me],D[de]),p=me,y=de),(ge!==S||Ie!==w||ce!==C||Ne!==P)&&(n.blendFuncSeparate(v[ge],v[Ie],v[ce],v[Ne]),S=ge,w=Ie,C=ce,P=Ne),(je.equals(A)===!1||mt!==R)&&(n.blendColor(je.r,je.g,je.b,mt),A.copy(je),R=mt),m=N,M=!1}function Z(N,me){N.side===Hn?Pe(n.CULL_FACE):ue(n.CULL_FACE);let ge=N.side===dn;me&&(ge=!ge),Y(ge),N.blending===Js&&N.transparent===!1?W(Gi):W(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Ie=N.stencilWrite;a.setTest(Ie),Ie&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),J(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Y(N){E!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),E=N)}function H(N){N!==$_?(ue(n.CULL_FACE),N!==I&&(N===th?n.cullFace(n.BACK):N===Y_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),I=N}function fe(N){N!==F&&(q&&n.lineWidth(N),F=N)}function J(N,me,ge){N?(ue(n.POLYGON_OFFSET_FILL),(j!==me||ie!==ge)&&(n.polygonOffset(me,ge),j=me,ie=ge)):Pe(n.POLYGON_OFFSET_FILL)}function re(N){N?ue(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function ne(N){N===void 0&&(N=n.TEXTURE0+Q-1),le!==N&&(n.activeTexture(N),le=N)}function Se(N,me,ge){ge===void 0&&(le===null?ge=n.TEXTURE0+Q-1:ge=le);let Ie=ve[ge];Ie===void 0&&(Ie={type:void 0,texture:void 0},ve[ge]=Ie),(Ie.type!==N||Ie.texture!==me)&&(le!==ge&&(n.activeTexture(ge),le=ge),n.bindTexture(N,me||oe[N]),Ie.type=N,Ie.texture=me)}function b(){const N=ve[le];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function he(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pe(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ye(N){at.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),at.copy(N))}function De(N){We.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),We.copy(N))}function Re(N,me){let ge=c.get(me);ge===void 0&&(ge=new WeakMap,c.set(me,ge));let Ie=ge.get(N);Ie===void 0&&(Ie=n.getUniformBlockIndex(me,N.name),ge.set(N,Ie))}function Me(N,me){const Ie=c.get(me).get(N);l.get(me)!==Ie&&(n.uniformBlockBinding(me,Ie,N.__bindingPointIndex),l.set(me,Ie))}function Ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},le=null,ve={},h={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,S=null,w=null,y=null,C=null,P=null,A=new Qe(0,0,0),R=0,M=!1,E=null,I=null,F=null,j=null,ie=null,at.set(0,0,n.canvas.width,n.canvas.height),We.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ue,disable:Pe,bindFramebuffer:ze,drawBuffers:Ue,useProgram:nt,setBlending:W,setMaterial:Z,setFlipSided:Y,setCullFace:H,setLineWidth:fe,setPolygonOffset:J,setScissorTest:re,activeTexture:ne,bindTexture:Se,unbindTexture:b,compressedTexImage2D:x,compressedTexImage3D:U,texImage2D:Te,texImage3D:pe,updateUBOMapping:Re,uniformBlockBinding:Me,texStorage2D:he,texStorage3D:we,texSubImage2D:X,texSubImage3D:se,compressedTexSubImage2D:$,compressedTexSubImage3D:xe,scissor:ye,viewport:De,reset:Ye}}function tS(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,x){return d?new OffscreenCanvas(b,x):eo("canvas")}function g(b,x,U){let X=1;const se=Se(b);if((se.width>U||se.height>U)&&(X=U/Math.max(se.width,se.height)),X<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const $=Math.floor(X*se.width),xe=Math.floor(X*se.height);h===void 0&&(h=_($,xe));const he=x?_($,xe):h;return he.width=$,he.height=xe,he.getContext("2d").drawImage(b,0,0,$,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+$+"x"+xe+")."),he}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){n.generateMipmap(b)}function S(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(b,x,U,X,se=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let $=x;if(x===n.RED&&(U===n.FLOAT&&($=n.R32F),U===n.HALF_FLOAT&&($=n.R16F),U===n.UNSIGNED_BYTE&&($=n.R8)),x===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.R8UI),U===n.UNSIGNED_SHORT&&($=n.R16UI),U===n.UNSIGNED_INT&&($=n.R32UI),U===n.BYTE&&($=n.R8I),U===n.SHORT&&($=n.R16I),U===n.INT&&($=n.R32I)),x===n.RG&&(U===n.FLOAT&&($=n.RG32F),U===n.HALF_FLOAT&&($=n.RG16F),U===n.UNSIGNED_BYTE&&($=n.RG8)),x===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RG8UI),U===n.UNSIGNED_SHORT&&($=n.RG16UI),U===n.UNSIGNED_INT&&($=n.RG32UI),U===n.BYTE&&($=n.RG8I),U===n.SHORT&&($=n.RG16I),U===n.INT&&($=n.RG32I)),x===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RGB8UI),U===n.UNSIGNED_SHORT&&($=n.RGB16UI),U===n.UNSIGNED_INT&&($=n.RGB32UI),U===n.BYTE&&($=n.RGB8I),U===n.SHORT&&($=n.RGB16I),U===n.INT&&($=n.RGB32I)),x===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RGBA8UI),U===n.UNSIGNED_SHORT&&($=n.RGBA16UI),U===n.UNSIGNED_INT&&($=n.RGBA32UI),U===n.BYTE&&($=n.RGBA8I),U===n.SHORT&&($=n.RGBA16I),U===n.INT&&($=n.RGBA32I)),x===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),x===n.RGBA){const xe=se?ha:ut.getTransfer(X);U===n.FLOAT&&($=n.RGBA32F),U===n.HALF_FLOAT&&($=n.RGBA16F),U===n.UNSIGNED_BYTE&&($=xe===gt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function y(b,x){let U;return b?x===null||x===gs||x===Zr?U=n.DEPTH24_STENCIL8:x===ii?U=n.DEPTH32F_STENCIL8:x===Kr&&(U=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===gs||x===Zr?U=n.DEPTH_COMPONENT24:x===ii?U=n.DEPTH_COMPONENT32F:x===Kr&&(U=n.DEPTH_COMPONENT16),U}function C(b,x){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==xn&&b.minFilter!==ni?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function P(b){const x=b.target;x.removeEventListener("dispose",P),R(x),x.isVideoTexture&&u.delete(x)}function A(b){const x=b.target;x.removeEventListener("dispose",A),E(x)}function R(b){const x=i.get(b);if(x.__webglInit===void 0)return;const U=b.source,X=f.get(U);if(X){const se=X[x.__cacheKey];se.usedTimes--,se.usedTimes===0&&M(b),Object.keys(X).length===0&&f.delete(U)}i.remove(b)}function M(b){const x=i.get(b);n.deleteTexture(x.__webglTexture);const U=b.source,X=f.get(U);delete X[x.__cacheKey],o.memory.textures--}function E(b){const x=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let se=0;se<x.__webglFramebuffer[X].length;se++)n.deleteFramebuffer(x.__webglFramebuffer[X][se]);else n.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)n.deleteFramebuffer(x.__webglFramebuffer[X]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const U=b.textures;for(let X=0,se=U.length;X<se;X++){const $=i.get(U[X]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(U[X])}i.remove(b)}let I=0;function F(){I=0}function j(){const b=I;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),I+=1,b}function ie(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function Q(b,x){const U=i.get(b);if(b.isVideoTexture&&re(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&U.__version!==b.version){const X=b.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(U,b,x);return}}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+x)}function q(b,x){const U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){oe(U,b,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+x)}function K(b,x){const U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){oe(U,b,x);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+x)}function k(b,x){const U=i.get(b);if(b.version>0&&U.__version!==b.version){ue(U,b,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+x)}const le={[nc]:n.REPEAT,[hs]:n.CLAMP_TO_EDGE,[ic]:n.MIRRORED_REPEAT},ve={[xn]:n.NEAREST,[Sg]:n.NEAREST_MIPMAP_NEAREST,[_o]:n.NEAREST_MIPMAP_LINEAR,[ni]:n.LINEAR,[Ya]:n.LINEAR_MIPMAP_NEAREST,[fs]:n.LINEAR_MIPMAP_LINEAR},be={[wg]:n.NEVER,[Ig]:n.ALWAYS,[Ag]:n.LESS,[Yd]:n.LEQUAL,[Rg]:n.EQUAL,[Dg]:n.GEQUAL,[Cg]:n.GREATER,[Pg]:n.NOTEQUAL};function Fe(b,x){if(x.type===ii&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===ni||x.magFilter===Ya||x.magFilter===_o||x.magFilter===fs||x.minFilter===ni||x.minFilter===Ya||x.minFilter===_o||x.minFilter===fs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,le[x.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,le[x.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,le[x.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ve[x.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ve[x.minFilter]),x.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,be[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===xn||x.minFilter!==_o&&x.minFilter!==fs||x.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function at(b,x){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",P));const X=x.source;let se=f.get(X);se===void 0&&(se={},f.set(X,se));const $=ie(x);if($!==b.__cacheKey){se[$]===void 0&&(se[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),se[$].usedTimes++;const xe=se[b.__cacheKey];xe!==void 0&&(se[b.__cacheKey].usedTimes--,xe.usedTimes===0&&M(x)),b.__cacheKey=$,b.__webglTexture=se[$].texture}return U}function We(b,x,U){return Math.floor(Math.floor(b/U)/x)}function st(b,x,U,X){const $=b.updateRanges;if($.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,U,X,x.data);else{$.sort((pe,ye)=>pe.start-ye.start);let xe=0;for(let pe=1;pe<$.length;pe++){const ye=$[xe],De=$[pe],Re=ye.start+ye.count,Me=We(De.start,x.width,4),Ye=We(ye.start,x.width,4);De.start<=Re+1&&Me===Ye&&We(De.start+De.count-1,x.width,4)===Me?ye.count=Math.max(ye.count,De.start+De.count-ye.start):(++xe,$[xe]=De)}$.length=xe+1;const he=n.getParameter(n.UNPACK_ROW_LENGTH),we=n.getParameter(n.UNPACK_SKIP_PIXELS),Te=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let pe=0,ye=$.length;pe<ye;pe++){const De=$[pe],Re=Math.floor(De.start/4),Me=Math.ceil(De.count/4),Ye=Re%x.width,N=Math.floor(Re/x.width),me=Me,ge=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ye),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Ye,N,me,ge,U,X,x.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,he),n.pixelStorei(n.UNPACK_SKIP_PIXELS,we),n.pixelStorei(n.UNPACK_SKIP_ROWS,Te)}}function oe(b,x,U){let X=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=n.TEXTURE_3D);const se=at(b,x),$=x.source;t.bindTexture(X,b.__webglTexture,n.TEXTURE0+U);const xe=i.get($);if($.version!==xe.__version||se===!0){t.activeTexture(n.TEXTURE0+U);const he=ut.getPrimaries(ut.workingColorSpace),we=x.colorSpace===ki?null:ut.getPrimaries(x.colorSpace),Te=x.colorSpace===ki||he===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let pe=g(x.image,!1,s.maxTextureSize);pe=ne(x,pe);const ye=r.convert(x.format,x.colorSpace),De=r.convert(x.type);let Re=w(x.internalFormat,ye,De,x.colorSpace,x.isVideoTexture);Fe(X,x);let Me;const Ye=x.mipmaps,N=x.isVideoTexture!==!0,me=xe.__version===void 0||se===!0,ge=$.dataReady,Ie=C(x,pe);if(x.isDepthTexture)Re=y(x.format===Qr,x.type),me&&(N?t.texStorage2D(n.TEXTURE_2D,1,Re,pe.width,pe.height):t.texImage2D(n.TEXTURE_2D,0,Re,pe.width,pe.height,0,ye,De,null));else if(x.isDataTexture)if(Ye.length>0){N&&me&&t.texStorage2D(n.TEXTURE_2D,Ie,Re,Ye[0].width,Ye[0].height);for(let de=0,ce=Ye.length;de<ce;de++)Me=Ye[de],N?ge&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,Me.width,Me.height,ye,De,Me.data):t.texImage2D(n.TEXTURE_2D,de,Re,Me.width,Me.height,0,ye,De,Me.data);x.generateMipmaps=!1}else N?(me&&t.texStorage2D(n.TEXTURE_2D,Ie,Re,pe.width,pe.height),ge&&st(x,pe,ye,De)):t.texImage2D(n.TEXTURE_2D,0,Re,pe.width,pe.height,0,ye,De,pe.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){N&&me&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ie,Re,Ye[0].width,Ye[0].height,pe.depth);for(let de=0,ce=Ye.length;de<ce;de++)if(Me=Ye[de],x.format!==kn)if(ye!==null)if(N){if(ge)if(x.layerUpdates.size>0){const Ne=Hh(Me.width,Me.height,x.format,x.type);for(const je of x.layerUpdates){const mt=Me.data.subarray(je*Ne/Me.data.BYTES_PER_ELEMENT,(je+1)*Ne/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,je,Me.width,Me.height,1,ye,mt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Me.width,Me.height,pe.depth,ye,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,Re,Me.width,Me.height,pe.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ge&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Me.width,Me.height,pe.depth,ye,De,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,Re,Me.width,Me.height,pe.depth,0,ye,De,Me.data)}else{N&&me&&t.texStorage2D(n.TEXTURE_2D,Ie,Re,Ye[0].width,Ye[0].height);for(let de=0,ce=Ye.length;de<ce;de++)Me=Ye[de],x.format!==kn?ye!==null?N?ge&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,Me.width,Me.height,ye,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,de,Re,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ge&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,Me.width,Me.height,ye,De,Me.data):t.texImage2D(n.TEXTURE_2D,de,Re,Me.width,Me.height,0,ye,De,Me.data)}else if(x.isDataArrayTexture)if(N){if(me&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ie,Re,pe.width,pe.height,pe.depth),ge)if(x.layerUpdates.size>0){const de=Hh(pe.width,pe.height,x.format,x.type);for(const ce of x.layerUpdates){const Ne=pe.data.subarray(ce*de/pe.data.BYTES_PER_ELEMENT,(ce+1)*de/pe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,pe.width,pe.height,1,ye,De,Ne)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,ye,De,pe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,pe.width,pe.height,pe.depth,0,ye,De,pe.data);else if(x.isData3DTexture)N?(me&&t.texStorage3D(n.TEXTURE_3D,Ie,Re,pe.width,pe.height,pe.depth),ge&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,ye,De,pe.data)):t.texImage3D(n.TEXTURE_3D,0,Re,pe.width,pe.height,pe.depth,0,ye,De,pe.data);else if(x.isFramebufferTexture){if(me)if(N)t.texStorage2D(n.TEXTURE_2D,Ie,Re,pe.width,pe.height);else{let de=pe.width,ce=pe.height;for(let Ne=0;Ne<Ie;Ne++)t.texImage2D(n.TEXTURE_2D,Ne,Re,de,ce,0,ye,De,null),de>>=1,ce>>=1}}else if(Ye.length>0){if(N&&me){const de=Se(Ye[0]);t.texStorage2D(n.TEXTURE_2D,Ie,Re,de.width,de.height)}for(let de=0,ce=Ye.length;de<ce;de++)Me=Ye[de],N?ge&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ye,De,Me):t.texImage2D(n.TEXTURE_2D,de,Re,ye,De,Me);x.generateMipmaps=!1}else if(N){if(me){const de=Se(pe);t.texStorage2D(n.TEXTURE_2D,Ie,Re,de.width,de.height)}ge&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ye,De,pe)}else t.texImage2D(n.TEXTURE_2D,0,Re,ye,De,pe);m(x)&&p(X),xe.__version=$.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function ue(b,x,U){if(x.image.length!==6)return;const X=at(b,x),se=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+U);const $=i.get(se);if(se.version!==$.__version||X===!0){t.activeTexture(n.TEXTURE0+U);const xe=ut.getPrimaries(ut.workingColorSpace),he=x.colorSpace===ki?null:ut.getPrimaries(x.colorSpace),we=x.colorSpace===ki||xe===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Te=x.isCompressedTexture||x.image[0].isCompressedTexture,pe=x.image[0]&&x.image[0].isDataTexture,ye=[];for(let ce=0;ce<6;ce++)!Te&&!pe?ye[ce]=g(x.image[ce],!0,s.maxCubemapSize):ye[ce]=pe?x.image[ce].image:x.image[ce],ye[ce]=ne(x,ye[ce]);const De=ye[0],Re=r.convert(x.format,x.colorSpace),Me=r.convert(x.type),Ye=w(x.internalFormat,Re,Me,x.colorSpace),N=x.isVideoTexture!==!0,me=$.__version===void 0||X===!0,ge=se.dataReady;let Ie=C(x,De);Fe(n.TEXTURE_CUBE_MAP,x);let de;if(Te){N&&me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Ye,De.width,De.height);for(let ce=0;ce<6;ce++){de=ye[ce].mipmaps;for(let Ne=0;Ne<de.length;Ne++){const je=de[Ne];x.format!==kn?Re!==null?N?ge&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne,0,0,je.width,je.height,Re,je.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne,Ye,je.width,je.height,0,je.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne,0,0,je.width,je.height,Re,Me,je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne,Ye,je.width,je.height,0,Re,Me,je.data)}}}else{if(de=x.mipmaps,N&&me){de.length>0&&Ie++;const ce=Se(ye[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Ye,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(pe){N?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ye[ce].width,ye[ce].height,Re,Me,ye[ce].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Ye,ye[ce].width,ye[ce].height,0,Re,Me,ye[ce].data);for(let Ne=0;Ne<de.length;Ne++){const mt=de[Ne].image[ce].image;N?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne+1,0,0,mt.width,mt.height,Re,Me,mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne+1,Ye,mt.width,mt.height,0,Re,Me,mt.data)}}else{N?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Re,Me,ye[ce]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Ye,Re,Me,ye[ce]);for(let Ne=0;Ne<de.length;Ne++){const je=de[Ne];N?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne+1,0,0,Re,Me,je.image[ce]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne+1,Ye,Re,Me,je.image[ce])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),$.__version=se.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Pe(b,x,U,X,se,$){const xe=r.convert(U.format,U.colorSpace),he=r.convert(U.type),we=w(U.internalFormat,xe,he,U.colorSpace),Te=i.get(x),pe=i.get(U);if(pe.__renderTarget=x,!Te.__hasExternalTextures){const ye=Math.max(1,x.width>>$),De=Math.max(1,x.height>>$);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,$,we,ye,De,x.depth,0,xe,he,null):t.texImage2D(se,$,we,ye,De,0,xe,he,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),J(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,se,pe.__webglTexture,0,fe(x)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,se,pe.__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ze(b,x,U){if(n.bindRenderbuffer(n.RENDERBUFFER,b),x.depthBuffer){const X=x.depthTexture,se=X&&X.isDepthTexture?X.type:null,$=y(x.stencilBuffer,se),xe=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=fe(x);J(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,$,x.width,x.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,he,$,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,$,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,b)}else{const X=x.textures;for(let se=0;se<X.length;se++){const $=X[se],xe=r.convert($.format,$.colorSpace),he=r.convert($.type),we=w($.internalFormat,xe,he,$.colorSpace),Te=fe(x);U&&J(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,we,x.width,x.height):J(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te,we,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,we,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ue(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=i.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Q(x.depthTexture,0);const se=X.__webglTexture,$=fe(x);if(x.depthTexture.format===Jr)J(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0);else if(x.depthTexture.format===Qr)J(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function nt(b){const x=i.get(b),U=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const X=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){const se=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",se)};X.addEventListener("dispose",se),x.__depthDisposeCallback=se}x.__boundDepthTexture=X}if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const X=b.texture.mipmaps;X&&X.length>0?Ue(x.__webglFramebuffer[0],b):Ue(x.__webglFramebuffer,b)}else if(U){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=n.createRenderbuffer(),ze(x.__webglDepthbuffer[X],b,!1);else{const se=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,$)}}else{const X=b.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),ze(x.__webglDepthbuffer,b,!1);else{const se=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,$)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function D(b,x,U){const X=i.get(b);x!==void 0&&Pe(X.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&nt(b)}function v(b){const x=b.texture,U=i.get(b),X=i.get(x);b.addEventListener("dispose",A);const se=b.textures,$=b.isWebGLCubeRenderTarget===!0,xe=se.length>1;if(xe||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=x.version,o.memory.textures++),$){U.__webglFramebuffer=[];for(let he=0;he<6;he++)if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer[he]=[];for(let we=0;we<x.mipmaps.length;we++)U.__webglFramebuffer[he][we]=n.createFramebuffer()}else U.__webglFramebuffer[he]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer=[];for(let he=0;he<x.mipmaps.length;he++)U.__webglFramebuffer[he]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(xe)for(let he=0,we=se.length;he<we;he++){const Te=i.get(se[he]);Te.__webglTexture===void 0&&(Te.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&J(b)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let he=0;he<se.length;he++){const we=se[he];U.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[he]);const Te=r.convert(we.format,we.colorSpace),pe=r.convert(we.type),ye=w(we.internalFormat,Te,pe,we.colorSpace,b.isXRRenderTarget===!0),De=fe(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,ye,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,U.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),ze(U.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,x);for(let he=0;he<6;he++)if(x.mipmaps&&x.mipmaps.length>0)for(let we=0;we<x.mipmaps.length;we++)Pe(U.__webglFramebuffer[he][we],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,we);else Pe(U.__webglFramebuffer[he],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);m(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let he=0,we=se.length;he<we;he++){const Te=se[he],pe=i.get(Te);let ye=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ye=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ye,pe.__webglTexture),Fe(ye,Te),Pe(U.__webglFramebuffer,b,Te,n.COLOR_ATTACHMENT0+he,ye,0),m(Te)&&p(ye)}t.unbindTexture()}else{let he=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(he=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,X.__webglTexture),Fe(he,x),x.mipmaps&&x.mipmaps.length>0)for(let we=0;we<x.mipmaps.length;we++)Pe(U.__webglFramebuffer[we],b,x,n.COLOR_ATTACHMENT0,he,we);else Pe(U.__webglFramebuffer,b,x,n.COLOR_ATTACHMENT0,he,0);m(x)&&p(he),t.unbindTexture()}b.depthBuffer&&nt(b)}function W(b){const x=b.textures;for(let U=0,X=x.length;U<X;U++){const se=x[U];if(m(se)){const $=S(b),xe=i.get(se).__webglTexture;t.bindTexture($,xe),p($),t.unbindTexture()}}}const Z=[],Y=[];function H(b){if(b.samples>0){if(J(b)===!1){const x=b.textures,U=b.width,X=b.height;let se=n.COLOR_BUFFER_BIT;const $=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(b),he=x.length>1;if(he)for(let Te=0;Te<x.length;Te++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const we=b.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Te=0;Te<x.length;Te++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),he){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[Te]);const pe=i.get(x[Te]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,pe,0)}n.blitFramebuffer(0,0,U,X,0,0,U,X,se,n.NEAREST),l===!0&&(Z.length=0,Y.length=0,Z.push(n.COLOR_ATTACHMENT0+Te),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Z.push($),Y.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Y)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Z))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let Te=0;Te<x.length;Te++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,xe.__webglColorRenderbuffer[Te]);const pe=i.get(x[Te]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const x=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function fe(b){return Math.min(s.maxSamples,b.samples)}function J(b){const x=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function re(b){const x=o.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function ne(b,x){const U=b.colorSpace,X=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==ar&&U!==ki&&(ut.getTransfer(U)===gt?(X!==kn||se!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),x}function Se(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=F,this.setTexture2D=Q,this.setTexture2DArray=q,this.setTexture3D=K,this.setTextureCube=k,this.rebindTextures=D,this.setupRenderTarget=v,this.updateRenderTargetMipmap=W,this.updateMultisampleRenderTarget=H,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=J}function nS(n,e){function t(i,s=ki){let r;const o=ut.getTransfer(s);if(i===li)return n.UNSIGNED_BYTE;if(i===iu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===su)return n.UNSIGNED_SHORT_5_5_5_1;if(i===kd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Vd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===zd)return n.BYTE;if(i===Hd)return n.SHORT;if(i===Kr)return n.UNSIGNED_SHORT;if(i===nu)return n.INT;if(i===gs)return n.UNSIGNED_INT;if(i===ii)return n.FLOAT;if(i===oo)return n.HALF_FLOAT;if(i===Gd)return n.ALPHA;if(i===Wd)return n.RGB;if(i===kn)return n.RGBA;if(i===Jr)return n.DEPTH_COMPONENT;if(i===Qr)return n.DEPTH_STENCIL;if(i===ru)return n.RED;if(i===ou)return n.RED_INTEGER;if(i===Xd)return n.RG;if(i===au)return n.RG_INTEGER;if(i===lu)return n.RGBA_INTEGER;if(i===Jo||i===Qo||i===ea||i===ta)if(o===gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Jo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Jo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===sc||i===rc||i===oc||i===ac)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===sc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===rc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===oc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ac)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lc||i===cc||i===uc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===lc||i===cc)return o===gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===uc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===hc||i===fc||i===dc||i===pc||i===mc||i===_c||i===gc||i===vc||i===xc||i===yc||i===Mc||i===Sc||i===Ec||i===bc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===hc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===pc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_c)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===xc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Sc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ec)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===bc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Tc||i===wc||i===Ac)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Tc)return o===gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rc||i===Cc||i===Pc||i===Dc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Rc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Cc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Dc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const iS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new ip(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ci({vertexShader:iS,fragmentShader:sS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ce(new lo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class oS extends Ms{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,_=null;const g=typeof XRWebGLBinding<"u",m=new rS,p={},S=t.getContextAttributes();let w=null,y=null;const C=[],P=[],A=new $e;let R=null;const M=new Cn;M.viewport=new Dt;const E=new Cn;E.viewport=new Dt;const I=[M,E],F=new bv;let j=null,ie=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let ue=C[oe];return ue===void 0&&(ue=new ml,C[oe]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(oe){let ue=C[oe];return ue===void 0&&(ue=new ml,C[oe]=ue),ue.getGripSpace()},this.getHand=function(oe){let ue=C[oe];return ue===void 0&&(ue=new ml,C[oe]=ue),ue.getHandSpace()};function Q(oe){const ue=P.indexOf(oe.inputSource);if(ue===-1)return;const Pe=C[ue];Pe!==void 0&&(Pe.update(oe.inputSource,oe.frame,c||o),Pe.dispatchEvent({type:oe.type,data:oe.inputSource}))}function q(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",K);for(let oe=0;oe<C.length;oe++){const ue=P[oe];ue!==null&&(P[oe]=null,C[oe].disconnect(ue))}j=null,ie=null,m.reset();for(const oe in p)delete p[oe];e.setRenderTarget(w),d=null,f=null,h=null,s=null,y=null,st.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){r=oe,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){a=oe,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(oe){c=oe},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(oe){if(s=oe,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",q),s.addEventListener("inputsourceschange",K),S.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,ze=null,Ue=null;S.depth&&(Ue=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=S.stencil?Qr:Jr,ze=S.stencil?Zr:gs);const nt={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(nt),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new vs(f.textureWidth,f.textureHeight,{format:kn,type:li,depthTexture:new np(f.textureWidth,f.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Pe={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,Pe),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new vs(d.framebufferWidth,d.framebufferHeight,{format:kn,type:li,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),st.setContext(s),st.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function K(oe){for(let ue=0;ue<oe.removed.length;ue++){const Pe=oe.removed[ue],ze=P.indexOf(Pe);ze>=0&&(P[ze]=null,C[ze].disconnect(Pe))}for(let ue=0;ue<oe.added.length;ue++){const Pe=oe.added[ue];let ze=P.indexOf(Pe);if(ze===-1){for(let nt=0;nt<C.length;nt++)if(nt>=P.length){P.push(Pe),ze=nt;break}else if(P[nt]===null){P[nt]=Pe,ze=nt;break}if(ze===-1)break}const Ue=C[ze];Ue&&Ue.connect(Pe)}}const k=new L,le=new L;function ve(oe,ue,Pe){k.setFromMatrixPosition(ue.matrixWorld),le.setFromMatrixPosition(Pe.matrixWorld);const ze=k.distanceTo(le),Ue=ue.projectionMatrix.elements,nt=Pe.projectionMatrix.elements,D=Ue[14]/(Ue[10]-1),v=Ue[14]/(Ue[10]+1),W=(Ue[9]+1)/Ue[5],Z=(Ue[9]-1)/Ue[5],Y=(Ue[8]-1)/Ue[0],H=(nt[8]+1)/nt[0],fe=D*Y,J=D*H,re=ze/(-Y+H),ne=re*-Y;if(ue.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(ne),oe.translateZ(re),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert(),Ue[10]===-1)oe.projectionMatrix.copy(ue.projectionMatrix),oe.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const Se=D+re,b=v+re,x=fe-ne,U=J+(ze-ne),X=W*v/b*Se,se=Z*v/b*Se;oe.projectionMatrix.makePerspective(x,U,X,se,Se,b),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}}function be(oe,ue){ue===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(ue.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(s===null)return;let ue=oe.near,Pe=oe.far;m.texture!==null&&(m.depthNear>0&&(ue=m.depthNear),m.depthFar>0&&(Pe=m.depthFar)),F.near=E.near=M.near=ue,F.far=E.far=M.far=Pe,(j!==F.near||ie!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),j=F.near,ie=F.far),F.layers.mask=oe.layers.mask|6,M.layers.mask=F.layers.mask&3,E.layers.mask=F.layers.mask&5;const ze=oe.parent,Ue=F.cameras;be(F,ze);for(let nt=0;nt<Ue.length;nt++)be(Ue[nt],ze);Ue.length===2?ve(F,M,E):F.projectionMatrix.copy(M.projectionMatrix),Fe(oe,F,ze)};function Fe(oe,ue,Pe){Pe===null?oe.matrix.copy(ue.matrixWorld):(oe.matrix.copy(Pe.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(ue.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(ue.projectionMatrix),oe.projectionMatrixInverse.copy(ue.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=Ic*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(oe){l=oe,f!==null&&(f.fixedFoveation=oe),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=oe)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(oe){return p[oe]};let at=null;function We(oe,ue){if(u=ue.getViewerPose(c||o),_=ue,u!==null){const Pe=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let ze=!1;Pe.length!==F.cameras.length&&(F.cameras.length=0,ze=!0);for(let v=0;v<Pe.length;v++){const W=Pe[v];let Z=null;if(d!==null)Z=d.getViewport(W);else{const H=h.getViewSubImage(f,W);Z=H.viewport,v===0&&(e.setRenderTargetTextures(y,H.colorTexture,H.depthStencilTexture),e.setRenderTarget(y))}let Y=I[v];Y===void 0&&(Y=new Cn,Y.layers.enable(v),Y.viewport=new Dt,I[v]=Y),Y.matrix.fromArray(W.transform.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.projectionMatrix.fromArray(W.projectionMatrix),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert(),Y.viewport.set(Z.x,Z.y,Z.width,Z.height),v===0&&(F.matrix.copy(Y.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ze===!0&&F.cameras.push(Y)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){h=i.getBinding();const v=h.getDepthInformation(Pe[0]);v&&v.isValid&&v.texture&&m.init(v,s.renderState)}if(Ue&&Ue.includes("camera-access")&&g){e.state.unbindTexture(),h=i.getBinding();for(let v=0;v<Pe.length;v++){const W=Pe[v].camera;if(W){let Z=p[W];Z||(Z=new ip,p[W]=Z);const Y=h.getCameraImage(W);Z.sourceTexture=Y}}}}for(let Pe=0;Pe<C.length;Pe++){const ze=P[Pe],Ue=C[Pe];ze!==null&&Ue!==void 0&&Ue.update(ze,ue,c||o)}at&&at(oe,ue),ue.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ue}),_=null}const st=new lp;st.setAnimationLoop(We),this.setAnimationLoop=function(oe){at=oe},this.dispose=function(){}}}const ts=new $n,aS=new pt;function lS(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Qd(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,w,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),g(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===dn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===dn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),w=S.envMap,y=S.envMapRotation;w&&(m.envMap.value=w,ts.copy(y),ts.x*=-1,ts.y*=-1,ts.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ts.y*=-1,ts.z*=-1),m.envMapRotation.value.setFromMatrix4(aS.makeRotationFromEuler(ts)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===dn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function cS(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){const y=w.program;i.uniformBlockBinding(S,y)}function c(S,w){let y=s[S.id];y===void 0&&(_(S),y=u(S),s[S.id]=y,S.addEventListener("dispose",m));const C=w.program;i.updateUBOMapping(S,C);const P=e.render.frame;r[S.id]!==P&&(f(S),r[S.id]=P)}function u(S){const w=h();S.__bindingPointIndex=w;const y=n.createBuffer(),C=S.__size,P=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,C,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,y),y}function h(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const w=s[S.id],y=S.uniforms,C=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let P=0,A=y.length;P<A;P++){const R=Array.isArray(y[P])?y[P]:[y[P]];for(let M=0,E=R.length;M<E;M++){const I=R[M];if(d(I,P,M,C)===!0){const F=I.__offset,j=Array.isArray(I.value)?I.value:[I.value];let ie=0;for(let Q=0;Q<j.length;Q++){const q=j[Q],K=g(q);typeof q=="number"||typeof q=="boolean"?(I.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,F+ie,I.__data)):q.isMatrix3?(I.__data[0]=q.elements[0],I.__data[1]=q.elements[1],I.__data[2]=q.elements[2],I.__data[3]=0,I.__data[4]=q.elements[3],I.__data[5]=q.elements[4],I.__data[6]=q.elements[5],I.__data[7]=0,I.__data[8]=q.elements[6],I.__data[9]=q.elements[7],I.__data[10]=q.elements[8],I.__data[11]=0):(q.toArray(I.__data,ie),ie+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(S,w,y,C){const P=S.value,A=w+"_"+y;if(C[A]===void 0)return typeof P=="number"||typeof P=="boolean"?C[A]=P:C[A]=P.clone(),!0;{const R=C[A];if(typeof P=="number"||typeof P=="boolean"){if(R!==P)return C[A]=P,!0}else if(R.equals(P)===!1)return R.copy(P),!0}return!1}function _(S){const w=S.uniforms;let y=0;const C=16;for(let A=0,R=w.length;A<R;A++){const M=Array.isArray(w[A])?w[A]:[w[A]];for(let E=0,I=M.length;E<I;E++){const F=M[E],j=Array.isArray(F.value)?F.value:[F.value];for(let ie=0,Q=j.length;ie<Q;ie++){const q=j[ie],K=g(q),k=y%C,le=k%K.boundary,ve=k+le;y+=le,ve!==0&&C-ve<K.storage&&(y+=C-ve),F.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=K.storage}}}const P=y%C;return P>0&&(y+=C-P),S.__size=y,S.__cache={},this}function g(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function m(S){const w=S.target;w.removeEventListener("dispose",m);const y=o.indexOf(w.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class uS{constructor(e={}){const{canvas:t=Og(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const S=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=fn;let P=0,A=0,R=null,M=-1,E=null;const I=new Dt,F=new Dt;let j=null;const ie=new Qe(0);let Q=0,q=t.width,K=t.height,k=1,le=null,ve=null;const be=new Dt(0,0,q,K),Fe=new Dt(0,0,q,K);let at=!1;const We=new fu;let st=!1,oe=!1;const ue=new pt,Pe=new L,ze=new Dt,Ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function D(){return R===null?k:1}let v=i;function W(T,B){return t.getContext(T,B)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${tu}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",de,!1),v===null){const B="webgl2";if(v=W(B,T),v===null)throw W(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Z,Y,H,fe,J,re,ne,Se,b,x,U,X,se,$,xe,he,we,Te,pe,ye,De,Re,Me,Ye;function N(){Z=new yy(v),Z.init(),Re=new nS(v,Z),Y=new dy(v,Z,e,Re),H=new eS(v,Z),Y.reversedDepthBuffer&&f&&H.buffers.depth.setReversed(!0),fe=new Ey(v),J=new kM,re=new tS(v,Z,H,J,Y,Re,fe),ne=new my(y),Se=new xy(y),b=new Cv(v),Me=new hy(v,b),x=new My(v,b,fe,Me),U=new Ty(v,x,b,fe),pe=new by(v,Y,re),he=new py(J),X=new HM(y,ne,Se,Z,Y,Me,he),se=new lS(y,J),$=new GM,xe=new jM(Z),Te=new uy(y,ne,Se,H,U,d,l),we=new JM(y,U,Y),Ye=new cS(v,fe,Y,H),ye=new fy(v,Z,fe),De=new Sy(v,Z,fe),fe.programs=X.programs,y.capabilities=Y,y.extensions=Z,y.properties=J,y.renderLists=$,y.shadowMap=we,y.state=H,y.info=fe}N();const me=new oS(y,v);this.xr=me,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){const T=Z.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Z.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(T){T!==void 0&&(k=T,this.setSize(q,K,!1))},this.getSize=function(T){return T.set(q,K)},this.setSize=function(T,B,ee=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=T,K=B,t.width=Math.floor(T*k),t.height=Math.floor(B*k),ee===!0&&(t.style.width=T+"px",t.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(q*k,K*k).floor()},this.setDrawingBufferSize=function(T,B,ee){q=T,K=B,k=ee,t.width=Math.floor(T*ee),t.height=Math.floor(B*ee),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(be)},this.setViewport=function(T,B,ee,te){T.isVector4?be.set(T.x,T.y,T.z,T.w):be.set(T,B,ee,te),H.viewport(I.copy(be).multiplyScalar(k).round())},this.getScissor=function(T){return T.copy(Fe)},this.setScissor=function(T,B,ee,te){T.isVector4?Fe.set(T.x,T.y,T.z,T.w):Fe.set(T,B,ee,te),H.scissor(F.copy(Fe).multiplyScalar(k).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(T){H.setScissorTest(at=T)},this.setOpaqueSort=function(T){le=T},this.setTransparentSort=function(T){ve=T},this.getClearColor=function(T){return T.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor(...arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha(...arguments)},this.clear=function(T=!0,B=!0,ee=!0){let te=0;if(T){let z=!1;if(R!==null){const _e=R.texture.format;z=_e===lu||_e===au||_e===ou}if(z){const _e=R.texture.type,Ae=_e===li||_e===gs||_e===Kr||_e===Zr||_e===iu||_e===su,Oe=Te.getClearColor(),Le=Te.getClearAlpha(),ke=Oe.r,Xe=Oe.g,Be=Oe.b;Ae?(_[0]=ke,_[1]=Xe,_[2]=Be,_[3]=Le,v.clearBufferuiv(v.COLOR,0,_)):(g[0]=ke,g[1]=Xe,g[2]=Be,g[3]=Le,v.clearBufferiv(v.COLOR,0,g))}else te|=v.COLOR_BUFFER_BIT}B&&(te|=v.DEPTH_BUFFER_BIT),ee&&(te|=v.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),v.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Te.dispose(),$.dispose(),xe.dispose(),J.dispose(),ne.dispose(),Se.dispose(),U.dispose(),Me.dispose(),Ye.dispose(),X.dispose(),me.dispose(),me.removeEventListener("sessionstart",Mn),me.removeEventListener("sessionend",pr),Nn.stop()};function ge(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=fe.autoReset,B=we.enabled,ee=we.autoUpdate,te=we.needsUpdate,z=we.type;N(),fe.autoReset=T,we.enabled=B,we.autoUpdate=ee,we.needsUpdate=te,we.type=z}function de(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ce(T){const B=T.target;B.removeEventListener("dispose",ce),Ne(B)}function Ne(T){je(T),J.remove(T)}function je(T){const B=J.get(T).programs;B!==void 0&&(B.forEach(function(ee){X.releaseProgram(ee)}),T.isShaderMaterial&&X.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,ee,te,z,_e){B===null&&(B=Ue);const Ae=z.isMesh&&z.matrixWorld.determinant()<0,Oe=Ke(T,B,ee,te,z);H.setMaterial(te,Ae);let Le=ee.index,ke=1;if(te.wireframe===!0){if(Le=x.getWireframeAttribute(ee),Le===void 0)return;ke=2}const Xe=ee.drawRange,Be=ee.attributes.position;let rt=Xe.start*ke,_t=(Xe.start+Xe.count)*ke;_e!==null&&(rt=Math.max(rt,_e.start*ke),_t=Math.min(_t,(_e.start+_e.count)*ke)),Le!==null?(rt=Math.max(rt,0),_t=Math.min(_t,Le.count)):Be!=null&&(rt=Math.max(rt,0),_t=Math.min(_t,Be.count));const Pt=_t-rt;if(Pt<0||Pt===1/0)return;Me.setup(z,te,Oe,ee,Le);let bt,yt=ye;if(Le!==null&&(bt=b.get(Le),yt=De,yt.setIndex(bt)),z.isMesh)te.wireframe===!0?(H.setLineWidth(te.wireframeLinewidth*D()),yt.setMode(v.LINES)):yt.setMode(v.TRIANGLES);else if(z.isLine){let He=te.linewidth;He===void 0&&(He=1),H.setLineWidth(He*D()),z.isLineSegments?yt.setMode(v.LINES):z.isLineLoop?yt.setMode(v.LINE_LOOP):yt.setMode(v.LINE_STRIP)}else z.isPoints?yt.setMode(v.POINTS):z.isSprite&&yt.setMode(v.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)to("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),yt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))yt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const He=z._multiDrawStarts,Rt=z._multiDrawCounts,ct=z._multiDrawCount,pn=Le?b.get(Le).bytesPerElement:1,Ss=J.get(te).currentProgram.getUniforms();for(let mn=0;mn<ct;mn++)Ss.setValue(v,"_gl_DrawID",mn),yt.render(He[mn]/pn,Rt[mn])}else if(z.isInstancedMesh)yt.renderInstances(rt,Pt,z.count);else if(ee.isInstancedBufferGeometry){const He=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Rt=Math.min(ee.instanceCount,He);yt.renderInstances(rt,Pt,Rt)}else yt.render(rt,Pt)};function mt(T,B,ee){T.transparent===!0&&T.side===Hn&&T.forceSinglePass===!1?(T.side=dn,T.needsUpdate=!0,O(T,B,ee),T.side=Xi,T.needsUpdate=!0,O(T,B,ee),T.side=Hn):O(T,B,ee)}this.compile=function(T,B,ee=null){ee===null&&(ee=T),p=xe.get(ee),p.init(B),w.push(p),ee.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),T!==ee&&T.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const te=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const _e=z.material;if(_e)if(Array.isArray(_e))for(let Ae=0;Ae<_e.length;Ae++){const Oe=_e[Ae];mt(Oe,ee,z),te.add(Oe)}else mt(_e,ee,z),te.add(_e)}),p=w.pop(),te},this.compileAsync=function(T,B,ee=null){const te=this.compile(T,B,ee);return new Promise(z=>{function _e(){if(te.forEach(function(Ae){J.get(Ae).currentProgram.isReady()&&te.delete(Ae)}),te.size===0){z(T);return}setTimeout(_e,10)}Z.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let lt=null;function Un(T){lt&&lt(T)}function Mn(){Nn.stop()}function pr(){Nn.start()}const Nn=new lp;Nn.setAnimationLoop(Un),typeof self<"u"&&Nn.setContext(self),this.setAnimationLoop=function(T){lt=T,me.setAnimationLoop(T),T===null?Nn.stop():Nn.start()},me.addEventListener("sessionstart",Mn),me.addEventListener("sessionend",pr),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(B),B=me.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,B,R),p=xe.get(T,w.length),p.init(B),w.push(p),ue.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),We.setFromProjectionMatrix(ue,si,B.reversedDepth),oe=this.localClippingEnabled,st=he.init(this.clippingPlanes,oe),m=$.get(T,S.length),m.init(),S.push(m),me.enabled===!0&&me.isPresenting===!0){const _e=y.xr.getDepthSensingMesh();_e!==null&&mr(_e,B,-1/0,y.sortObjects)}mr(T,B,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(le,ve),nt=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,nt&&Te.addToRenderList(m,T),this.info.render.frame++,st===!0&&he.beginShadows();const ee=p.state.shadowsArray;we.render(ee,T,B),st===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=m.opaque,z=m.transmissive;if(p.setupLights(),B.isArrayCamera){const _e=B.cameras;if(z.length>0)for(let Ae=0,Oe=_e.length;Ae<Oe;Ae++){const Le=_e[Ae];Sn(te,z,T,Le)}nt&&Te.render(T);for(let Ae=0,Oe=_e.length;Ae<Oe;Ae++){const Le=_e[Ae];co(m,T,Le,Le.viewport)}}else z.length>0&&Sn(te,z,T,B),nt&&Te.render(T),co(m,T,B);R!==null&&A===0&&(re.updateMultisampleRenderTarget(R),re.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(y,T,B),Me.resetDefaultState(),M=-1,E=null,w.pop(),w.length>0?(p=w[w.length-1],st===!0&&he.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function mr(T,B,ee,te){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)ee=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||We.intersectsSprite(T)){te&&ze.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ue);const Ae=U.update(T),Oe=T.material;Oe.visible&&m.push(T,Ae,Oe,ee,ze.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||We.intersectsObject(T))){const Ae=U.update(T),Oe=T.material;if(te&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ze.copy(T.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ze.copy(Ae.boundingSphere.center)),ze.applyMatrix4(T.matrixWorld).applyMatrix4(ue)),Array.isArray(Oe)){const Le=Ae.groups;for(let ke=0,Xe=Le.length;ke<Xe;ke++){const Be=Le[ke],rt=Oe[Be.materialIndex];rt&&rt.visible&&m.push(T,Ae,rt,ee,ze.z,Be)}}else Oe.visible&&m.push(T,Ae,Oe,ee,ze.z,null)}}const _e=T.children;for(let Ae=0,Oe=_e.length;Ae<Oe;Ae++)mr(_e[Ae],B,ee,te)}function co(T,B,ee,te){const z=T.opaque,_e=T.transmissive,Ae=T.transparent;p.setupLightsView(ee),st===!0&&he.setGlobalState(y.clippingPlanes,ee),te&&H.viewport(I.copy(te)),z.length>0&&En(z,B,ee),_e.length>0&&En(_e,B,ee),Ae.length>0&&En(Ae,B,ee),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function Sn(T,B,ee,te){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[te.id]===void 0&&(p.state.transmissionRenderTarget[te.id]=new vs(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?oo:li,minFilter:fs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace}));const _e=p.state.transmissionRenderTarget[te.id],Ae=te.viewport||I;_e.setSize(Ae.z*y.transmissionResolutionScale,Ae.w*y.transmissionResolutionScale);const Oe=y.getRenderTarget(),Le=y.getActiveCubeFace(),ke=y.getActiveMipmapLevel();y.setRenderTarget(_e),y.getClearColor(ie),Q=y.getClearAlpha(),Q<1&&y.setClearColor(16777215,.5),y.clear(),nt&&Te.render(ee);const Xe=y.toneMapping;y.toneMapping=Wi;const Be=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),p.setupLightsView(te),st===!0&&he.setGlobalState(y.clippingPlanes,te),En(T,ee,te),re.updateMultisampleRenderTarget(_e),re.updateRenderTargetMipmap(_e),Z.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let _t=0,Pt=B.length;_t<Pt;_t++){const bt=B[_t],yt=bt.object,He=bt.geometry,Rt=bt.material,ct=bt.group;if(Rt.side===Hn&&yt.layers.test(te.layers)){const pn=Rt.side;Rt.side=dn,Rt.needsUpdate=!0,_r(yt,ee,te,He,Rt,ct),Rt.side=pn,Rt.needsUpdate=!0,rt=!0}}rt===!0&&(re.updateMultisampleRenderTarget(_e),re.updateRenderTargetMipmap(_e))}y.setRenderTarget(Oe,Le,ke),y.setClearColor(ie,Q),Be!==void 0&&(te.viewport=Be),y.toneMapping=Xe}function En(T,B,ee){const te=B.isScene===!0?B.overrideMaterial:null;for(let z=0,_e=T.length;z<_e;z++){const Ae=T[z],Oe=Ae.object,Le=Ae.geometry,ke=Ae.group;let Xe=Ae.material;Xe.allowOverride===!0&&te!==null&&(Xe=te),Oe.layers.test(ee.layers)&&_r(Oe,B,ee,Le,Xe,ke)}}function _r(T,B,ee,te,z,_e){T.onBeforeRender(y,B,ee,te,z,_e),T.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(y,B,ee,te,T,_e),z.transparent===!0&&z.side===Hn&&z.forceSinglePass===!1?(z.side=dn,z.needsUpdate=!0,y.renderBufferDirect(ee,B,te,z,T,_e),z.side=Xi,z.needsUpdate=!0,y.renderBufferDirect(ee,B,te,z,T,_e),z.side=Hn):y.renderBufferDirect(ee,B,te,z,T,_e),T.onAfterRender(y,B,ee,te,z,_e)}function O(T,B,ee){B.isScene!==!0&&(B=Ue);const te=J.get(T),z=p.state.lights,_e=p.state.shadowsArray,Ae=z.state.version,Oe=X.getParameters(T,z.state,_e,B,ee),Le=X.getProgramCacheKey(Oe);let ke=te.programs;te.environment=T.isMeshStandardMaterial?B.environment:null,te.fog=B.fog,te.envMap=(T.isMeshStandardMaterial?Se:ne).get(T.envMap||te.environment),te.envMapRotation=te.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,ke===void 0&&(T.addEventListener("dispose",ce),ke=new Map,te.programs=ke);let Xe=ke.get(Le);if(Xe!==void 0){if(te.currentProgram===Xe&&te.lightsStateVersion===Ae)return ae(T,Oe),Xe}else Oe.uniforms=X.getUniforms(T),T.onBeforeCompile(Oe,y),Xe=X.acquireProgram(Oe,Le),ke.set(Le,Xe),te.uniforms=Oe.uniforms;const Be=te.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Be.clippingPlanes=he.uniform),ae(T,Oe),te.needsLights=uo(T),te.lightsStateVersion=Ae,te.needsLights&&(Be.ambientLightColor.value=z.state.ambient,Be.lightProbe.value=z.state.probe,Be.directionalLights.value=z.state.directional,Be.directionalLightShadows.value=z.state.directionalShadow,Be.spotLights.value=z.state.spot,Be.spotLightShadows.value=z.state.spotShadow,Be.rectAreaLights.value=z.state.rectArea,Be.ltc_1.value=z.state.rectAreaLTC1,Be.ltc_2.value=z.state.rectAreaLTC2,Be.pointLights.value=z.state.point,Be.pointLightShadows.value=z.state.pointShadow,Be.hemisphereLights.value=z.state.hemi,Be.directionalShadowMap.value=z.state.directionalShadowMap,Be.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Be.spotShadowMap.value=z.state.spotShadowMap,Be.spotLightMatrix.value=z.state.spotLightMatrix,Be.spotLightMap.value=z.state.spotLightMap,Be.pointShadowMap.value=z.state.pointShadowMap,Be.pointShadowMatrix.value=z.state.pointShadowMatrix),te.currentProgram=Xe,te.uniformsList=null,Xe}function V(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=na.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function ae(T,B){const ee=J.get(T);ee.outputColorSpace=B.outputColorSpace,ee.batching=B.batching,ee.batchingColor=B.batchingColor,ee.instancing=B.instancing,ee.instancingColor=B.instancingColor,ee.instancingMorph=B.instancingMorph,ee.skinning=B.skinning,ee.morphTargets=B.morphTargets,ee.morphNormals=B.morphNormals,ee.morphColors=B.morphColors,ee.morphTargetsCount=B.morphTargetsCount,ee.numClippingPlanes=B.numClippingPlanes,ee.numIntersection=B.numClipIntersection,ee.vertexAlphas=B.vertexAlphas,ee.vertexTangents=B.vertexTangents,ee.toneMapping=B.toneMapping}function Ke(T,B,ee,te,z){B.isScene!==!0&&(B=Ue),re.resetTextureUnits();const _e=B.fog,Ae=te.isMeshStandardMaterial?B.environment:null,Oe=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ar,Le=(te.isMeshStandardMaterial?Se:ne).get(te.envMap||Ae),ke=te.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,Xe=!!ee.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Be=!!ee.morphAttributes.position,rt=!!ee.morphAttributes.normal,_t=!!ee.morphAttributes.color;let Pt=Wi;te.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Pt=y.toneMapping);const bt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,yt=bt!==void 0?bt.length:0,He=J.get(te),Rt=p.state.lights;if(st===!0&&(oe===!0||T!==E)){const tn=T===E&&te.id===M;he.setState(te,T,tn)}let ct=!1;te.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Rt.state.version||He.outputColorSpace!==Oe||z.isBatchedMesh&&He.batching===!1||!z.isBatchedMesh&&He.batching===!0||z.isBatchedMesh&&He.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&He.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&He.instancing===!1||!z.isInstancedMesh&&He.instancing===!0||z.isSkinnedMesh&&He.skinning===!1||!z.isSkinnedMesh&&He.skinning===!0||z.isInstancedMesh&&He.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&He.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&He.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&He.instancingMorph===!1&&z.morphTexture!==null||He.envMap!==Le||te.fog===!0&&He.fog!==_e||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==he.numPlanes||He.numIntersection!==he.numIntersection)||He.vertexAlphas!==ke||He.vertexTangents!==Xe||He.morphTargets!==Be||He.morphNormals!==rt||He.morphColors!==_t||He.toneMapping!==Pt||He.morphTargetsCount!==yt)&&(ct=!0):(ct=!0,He.__version=te.version);let pn=He.currentProgram;ct===!0&&(pn=O(te,B,z));let Ss=!1,mn=!1,gr=!1;const Ct=pn.getUniforms(),bn=He.uniforms;if(H.useProgram(pn.program)&&(Ss=!0,mn=!0,gr=!0),te.id!==M&&(M=te.id,mn=!0),Ss||E!==T){H.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Ct.setValue(v,"projectionMatrix",T.projectionMatrix),Ct.setValue(v,"viewMatrix",T.matrixWorldInverse);const an=Ct.map.cameraPosition;an!==void 0&&an.setValue(v,Pe.setFromMatrixPosition(T.matrixWorld)),Y.logarithmicDepthBuffer&&Ct.setValue(v,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Ct.setValue(v,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,mn=!0,gr=!0)}if(z.isSkinnedMesh){Ct.setOptional(v,z,"bindMatrix"),Ct.setOptional(v,z,"bindMatrixInverse");const tn=z.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),Ct.setValue(v,"boneTexture",tn.boneTexture,re))}z.isBatchedMesh&&(Ct.setOptional(v,z,"batchingTexture"),Ct.setValue(v,"batchingTexture",z._matricesTexture,re),Ct.setOptional(v,z,"batchingIdTexture"),Ct.setValue(v,"batchingIdTexture",z._indirectTexture,re),Ct.setOptional(v,z,"batchingColorTexture"),z._colorsTexture!==null&&Ct.setValue(v,"batchingColorTexture",z._colorsTexture,re));const Tn=ee.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&pe.update(z,ee,pn),(mn||He.receiveShadow!==z.receiveShadow)&&(He.receiveShadow=z.receiveShadow,Ct.setValue(v,"receiveShadow",z.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(bn.envMap.value=Le,bn.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&B.environment!==null&&(bn.envMapIntensity.value=B.environmentIntensity),mn&&(Ct.setValue(v,"toneMappingExposure",y.toneMappingExposure),He.needsLights&&Vt(bn,gr),_e&&te.fog===!0&&se.refreshFogUniforms(bn,_e),se.refreshMaterialUniforms(bn,te,k,K,p.state.transmissionRenderTarget[T.id]),na.upload(v,V(He),bn,re)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(na.upload(v,V(He),bn,re),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Ct.setValue(v,"center",z.center),Ct.setValue(v,"modelViewMatrix",z.modelViewMatrix),Ct.setValue(v,"normalMatrix",z.normalMatrix),Ct.setValue(v,"modelMatrix",z.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const tn=te.uniformsGroups;for(let an=0,Ua=tn.length;an<Ua;an++){const Yi=tn[an];Ye.update(Yi,pn),Ye.bind(Yi,pn)}}return pn}function Vt(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function uo(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,B,ee){const te=J.get(T);te.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),J.get(T.texture).__webglTexture=B,J.get(T.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:ee,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,B){const ee=J.get(T);ee.__webglFramebuffer=B,ee.__useDefaultFramebuffer=B===void 0};const bp=v.createFramebuffer();this.setRenderTarget=function(T,B=0,ee=0){R=T,P=B,A=ee;let te=!0,z=null,_e=!1,Ae=!1;if(T){const Le=J.get(T);if(Le.__useDefaultFramebuffer!==void 0)H.bindFramebuffer(v.FRAMEBUFFER,null),te=!1;else if(Le.__webglFramebuffer===void 0)re.setupRenderTarget(T);else if(Le.__hasExternalTextures)re.rebindTextures(T,J.get(T.texture).__webglTexture,J.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Be=T.depthTexture;if(Le.__boundDepthTexture!==Be){if(Be!==null&&J.has(Be)&&(T.width!==Be.image.width||T.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(T)}}const ke=T.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ae=!0);const Xe=J.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Xe[B])?z=Xe[B][ee]:z=Xe[B],_e=!0):T.samples>0&&re.useMultisampledRTT(T)===!1?z=J.get(T).__webglMultisampledFramebuffer:Array.isArray(Xe)?z=Xe[ee]:z=Xe,I.copy(T.viewport),F.copy(T.scissor),j=T.scissorTest}else I.copy(be).multiplyScalar(k).floor(),F.copy(Fe).multiplyScalar(k).floor(),j=at;if(ee!==0&&(z=bp),H.bindFramebuffer(v.FRAMEBUFFER,z)&&te&&H.drawBuffers(T,z),H.viewport(I),H.scissor(F),H.setScissorTest(j),_e){const Le=J.get(T.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le.__webglTexture,ee)}else if(Ae){const Le=B;for(let ke=0;ke<T.textures.length;ke++){const Xe=J.get(T.textures[ke]);v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0+ke,Xe.__webglTexture,ee,Le)}}else if(T!==null&&ee!==0){const Le=J.get(T.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,Le.__webglTexture,ee)}M=-1},this.readRenderTargetPixels=function(T,B,ee,te,z,_e,Ae,Oe=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=J.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(Le=Le[Ae]),Le){H.bindFramebuffer(v.FRAMEBUFFER,Le);try{const ke=T.textures[Oe],Xe=ke.format,Be=ke.type;if(!Y.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Y.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-te&&ee>=0&&ee<=T.height-z&&(T.textures.length>1&&v.readBuffer(v.COLOR_ATTACHMENT0+Oe),v.readPixels(B,ee,te,z,Re.convert(Xe),Re.convert(Be),_e))}finally{const ke=R!==null?J.get(R).__webglFramebuffer:null;H.bindFramebuffer(v.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(T,B,ee,te,z,_e,Ae,Oe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=J.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(Le=Le[Ae]),Le)if(B>=0&&B<=T.width-te&&ee>=0&&ee<=T.height-z){H.bindFramebuffer(v.FRAMEBUFFER,Le);const ke=T.textures[Oe],Xe=ke.format,Be=ke.type;if(!Y.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Y.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const rt=v.createBuffer();v.bindBuffer(v.PIXEL_PACK_BUFFER,rt),v.bufferData(v.PIXEL_PACK_BUFFER,_e.byteLength,v.STREAM_READ),T.textures.length>1&&v.readBuffer(v.COLOR_ATTACHMENT0+Oe),v.readPixels(B,ee,te,z,Re.convert(Xe),Re.convert(Be),0);const _t=R!==null?J.get(R).__webglFramebuffer:null;H.bindFramebuffer(v.FRAMEBUFFER,_t);const Pt=v.fenceSync(v.SYNC_GPU_COMMANDS_COMPLETE,0);return v.flush(),await Fg(v,Pt,4),v.bindBuffer(v.PIXEL_PACK_BUFFER,rt),v.getBufferSubData(v.PIXEL_PACK_BUFFER,0,_e),v.deleteBuffer(rt),v.deleteSync(Pt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,B=null,ee=0){const te=Math.pow(2,-ee),z=Math.floor(T.image.width*te),_e=Math.floor(T.image.height*te),Ae=B!==null?B.x:0,Oe=B!==null?B.y:0;re.setTexture2D(T,0),v.copyTexSubImage2D(v.TEXTURE_2D,ee,0,0,Ae,Oe,z,_e),H.unbindTexture()};const Tp=v.createFramebuffer(),wp=v.createFramebuffer();this.copyTextureToTexture=function(T,B,ee=null,te=null,z=0,_e=null){_e===null&&(z!==0?(to("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),_e=z,z=0):_e=0);let Ae,Oe,Le,ke,Xe,Be,rt,_t,Pt;const bt=T.isCompressedTexture?T.mipmaps[_e]:T.image;if(ee!==null)Ae=ee.max.x-ee.min.x,Oe=ee.max.y-ee.min.y,Le=ee.isBox3?ee.max.z-ee.min.z:1,ke=ee.min.x,Xe=ee.min.y,Be=ee.isBox3?ee.min.z:0;else{const Tn=Math.pow(2,-z);Ae=Math.floor(bt.width*Tn),Oe=Math.floor(bt.height*Tn),T.isDataArrayTexture?Le=bt.depth:T.isData3DTexture?Le=Math.floor(bt.depth*Tn):Le=1,ke=0,Xe=0,Be=0}te!==null?(rt=te.x,_t=te.y,Pt=te.z):(rt=0,_t=0,Pt=0);const yt=Re.convert(B.format),He=Re.convert(B.type);let Rt;B.isData3DTexture?(re.setTexture3D(B,0),Rt=v.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(re.setTexture2DArray(B,0),Rt=v.TEXTURE_2D_ARRAY):(re.setTexture2D(B,0),Rt=v.TEXTURE_2D),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,B.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,B.unpackAlignment);const ct=v.getParameter(v.UNPACK_ROW_LENGTH),pn=v.getParameter(v.UNPACK_IMAGE_HEIGHT),Ss=v.getParameter(v.UNPACK_SKIP_PIXELS),mn=v.getParameter(v.UNPACK_SKIP_ROWS),gr=v.getParameter(v.UNPACK_SKIP_IMAGES);v.pixelStorei(v.UNPACK_ROW_LENGTH,bt.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,bt.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,ke),v.pixelStorei(v.UNPACK_SKIP_ROWS,Xe),v.pixelStorei(v.UNPACK_SKIP_IMAGES,Be);const Ct=T.isDataArrayTexture||T.isData3DTexture,bn=B.isDataArrayTexture||B.isData3DTexture;if(T.isDepthTexture){const Tn=J.get(T),tn=J.get(B),an=J.get(Tn.__renderTarget),Ua=J.get(tn.__renderTarget);H.bindFramebuffer(v.READ_FRAMEBUFFER,an.__webglFramebuffer),H.bindFramebuffer(v.DRAW_FRAMEBUFFER,Ua.__webglFramebuffer);for(let Yi=0;Yi<Le;Yi++)Ct&&(v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,J.get(T).__webglTexture,z,Be+Yi),v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,J.get(B).__webglTexture,_e,Pt+Yi)),v.blitFramebuffer(ke,Xe,Ae,Oe,rt,_t,Ae,Oe,v.DEPTH_BUFFER_BIT,v.NEAREST);H.bindFramebuffer(v.READ_FRAMEBUFFER,null),H.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else if(z!==0||T.isRenderTargetTexture||J.has(T)){const Tn=J.get(T),tn=J.get(B);H.bindFramebuffer(v.READ_FRAMEBUFFER,Tp),H.bindFramebuffer(v.DRAW_FRAMEBUFFER,wp);for(let an=0;an<Le;an++)Ct?v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,Tn.__webglTexture,z,Be+an):v.framebufferTexture2D(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,Tn.__webglTexture,z),bn?v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,tn.__webglTexture,_e,Pt+an):v.framebufferTexture2D(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,tn.__webglTexture,_e),z!==0?v.blitFramebuffer(ke,Xe,Ae,Oe,rt,_t,Ae,Oe,v.COLOR_BUFFER_BIT,v.NEAREST):bn?v.copyTexSubImage3D(Rt,_e,rt,_t,Pt+an,ke,Xe,Ae,Oe):v.copyTexSubImage2D(Rt,_e,rt,_t,ke,Xe,Ae,Oe);H.bindFramebuffer(v.READ_FRAMEBUFFER,null),H.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else bn?T.isDataTexture||T.isData3DTexture?v.texSubImage3D(Rt,_e,rt,_t,Pt,Ae,Oe,Le,yt,He,bt.data):B.isCompressedArrayTexture?v.compressedTexSubImage3D(Rt,_e,rt,_t,Pt,Ae,Oe,Le,yt,bt.data):v.texSubImage3D(Rt,_e,rt,_t,Pt,Ae,Oe,Le,yt,He,bt):T.isDataTexture?v.texSubImage2D(v.TEXTURE_2D,_e,rt,_t,Ae,Oe,yt,He,bt.data):T.isCompressedTexture?v.compressedTexSubImage2D(v.TEXTURE_2D,_e,rt,_t,bt.width,bt.height,yt,bt.data):v.texSubImage2D(v.TEXTURE_2D,_e,rt,_t,Ae,Oe,yt,He,bt);v.pixelStorei(v.UNPACK_ROW_LENGTH,ct),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,pn),v.pixelStorei(v.UNPACK_SKIP_PIXELS,Ss),v.pixelStorei(v.UNPACK_SKIP_ROWS,mn),v.pixelStorei(v.UNPACK_SKIP_IMAGES,gr),_e===0&&B.generateMipmaps&&v.generateMipmap(Rt),H.unbindTexture()},this.initRenderTarget=function(T){J.get(T).__webglFramebuffer===void 0&&re.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?re.setTextureCube(T,0):T.isData3DTexture?re.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?re.setTexture2DArray(T,0):re.setTexture2D(T,0),H.unbindTexture()},this.resetState=function(){P=0,A=0,R=null,H.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}}const ff={type:"change"},gu={type:"start"},dp={type:"end"},Wo=new Da,df=new zi,hS=Math.cos(70*Ng.DEG2RAD),Ot=new L,cn=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Al=1e-6;class fS extends ap{constructor(e,t=null){super(e,t),this.state=vt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zs.ROTATE,MIDDLE:Zs.DOLLY,RIGHT:Zs.PAN},this.touches={ONE:Vs.ROTATE,TWO:Vs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Xt,this._lastTargetPosition=new L,this._quat=new Xt().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new zh,this._sphericalDelta=new zh,this._scale=1,this._panOffset=new L,this._rotateStart=new $e,this._rotateEnd=new $e,this._rotateDelta=new $e,this._panStart=new $e,this._panEnd=new $e,this._panDelta=new $e,this._dollyStart=new $e,this._dollyEnd=new $e,this._dollyDelta=new $e,this._dollyDirection=new L,this._mouse=new $e,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=pS.bind(this),this._onPointerDown=dS.bind(this),this._onPointerUp=mS.bind(this),this._onContextMenu=SS.bind(this),this._onMouseWheel=vS.bind(this),this._onKeyDown=xS.bind(this),this._onTouchStart=yS.bind(this),this._onTouchMove=MS.bind(this),this._onMouseDown=_S.bind(this),this._onMouseMove=gS.bind(this),this._interceptControlDown=ES.bind(this),this._interceptControlUp=bS.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ff),this.update(),this.state=vt.NONE}update(e=null){const t=this.object.position;Ot.copy(t).sub(this.target),Ot.applyQuaternion(this._quat),this._spherical.setFromVector3(Ot),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=cn:i>Math.PI&&(i-=cn),s<-Math.PI?s+=cn:s>Math.PI&&(s-=cn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ot.setFromSpherical(this._spherical),Ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ot.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Wo.origin.copy(this.object.position),Wo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wo.direction))<hS?this.object.lookAt(this.target):(df.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wo.intersectPlane(df,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Al||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Al||this._lastTargetPosition.distanceToSquared(this.target)>Al?(this.dispatchEvent(ff),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?cn/60*this.autoRotateSpeed*e:cn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ot.setFromMatrixColumn(t,0),Ot.multiplyScalar(-e),this._panOffset.add(Ot)}_panUp(e,t){this.screenSpacePanning===!0?Ot.setFromMatrixColumn(t,1):(Ot.setFromMatrixColumn(t,0),Ot.crossVectors(this.object.up,Ot)),Ot.multiplyScalar(e),this._panOffset.add(Ot)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ot.copy(s).sub(this.target);let r=Ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/t.clientHeight),this._rotateUp(cn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/t.clientHeight),this._rotateUp(cn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new $e,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function dS(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function pS(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function mS(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(dp),this.state=vt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function _S(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Zs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=vt.DOLLY;break;case Zs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=vt.ROTATE}break;case Zs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(gu)}function gS(n){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function vS(n){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(n.preventDefault(),this.dispatchEvent(gu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(dp))}function xS(n){this.enabled!==!1&&this._handleKeyDown(n)}function yS(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Vs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=vt.TOUCH_ROTATE;break;case Vs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case Vs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=vt.TOUCH_DOLLY_PAN;break;case Vs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(gu)}function MS(n){switch(this._trackPointer(n),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=vt.NONE}}function SS(n){this.enabled!==!1&&n.preventDefault()}function ES(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bS(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ns=new op,Zt=new L,Fi=new L,wt=new Xt,pf={X:new L(1,0,0),Y:new L(0,1,0),Z:new L(0,0,1)},Rl={type:"change"},mf={type:"mouseDown",mode:null},_f={type:"mouseUp",mode:null},gf={type:"objectChange"};class TS extends ap{constructor(e,t=null){super(void 0,t);const i=new DS(this);this._root=i;const s=new IS;this._gizmo=s,i.add(s);const r=new LS;this._plane=r,i.add(r);const o=this;function a(w,y){let C=y;Object.defineProperty(o,w,{get:function(){return C!==void 0?C:y},set:function(P){C!==P&&(C=P,r[w]=P,s[w]=P,o.dispatchEvent({type:w+"-changed",value:P}),o.dispatchEvent(Rl))}}),o[w]=y,r[w]=y,s[w]=y}a("camera",e),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0),a("minX",-1/0),a("maxX",1/0),a("minY",-1/0),a("maxY",1/0),a("minZ",-1/0),a("maxZ",1/0);const l=new L,c=new L,u=new Xt,h=new Xt,f=new L,d=new Xt,_=new L,g=new L,m=new L,p=0,S=new L;a("worldPosition",l),a("worldPositionStart",c),a("worldQuaternion",u),a("worldQuaternionStart",h),a("cameraPosition",f),a("cameraQuaternion",d),a("pointStart",_),a("pointEnd",g),a("rotationAxis",m),a("rotationAngle",p),a("eye",S),this._offset=new L,this._startNorm=new L,this._endNorm=new L,this._cameraScale=new L,this._parentPosition=new L,this._parentQuaternion=new Xt,this._parentQuaternionInv=new Xt,this._parentScale=new L,this._worldScaleStart=new L,this._worldQuaternionInv=new Xt,this._worldScale=new L,this._positionStart=new L,this._quaternionStart=new Xt,this._scaleStart=new L,this._getPointer=wS.bind(this),this._onPointerDown=RS.bind(this),this._onPointerHover=AS.bind(this),this._onPointerMove=CS.bind(this),this._onPointerUp=PS.bind(this),t!==null&&this.connect(t)}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&ns.setFromCamera(e,this.camera);const t=Cl(this._gizmo.picker[this.mode],ns);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&ns.setFromCamera(e,this.camera);const t=Cl(this._plane,ns,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,mf.mode=this.mode,this.dispatchEvent(mf)}}pointerMove(e){const t=this.axis,i=this.mode,s=this.object;let r=this.space;if(i==="scale"?r="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(r="world"),s===void 0||t===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&ns.setFromCamera(e,this.camera);const o=Cl(this._plane,ns,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),i==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),r==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),r==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),s.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(r==="local"&&(s.position.applyQuaternion(wt.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(s.position.x=Math.round(s.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(s.position.y=Math.round(s.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(s.position.z=Math.round(s.position.z/this.translationSnap)*this.translationSnap),s.position.applyQuaternion(this._quaternionStart)),r==="world"&&(s.parent&&s.position.add(Zt.setFromMatrixPosition(s.parent.matrixWorld)),t.search("X")!==-1&&(s.position.x=Math.round(s.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(s.position.y=Math.round(s.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(s.position.z=Math.round(s.position.z/this.translationSnap)*this.translationSnap),s.parent&&s.position.sub(Zt.setFromMatrixPosition(s.parent.matrixWorld)))),s.position.x=Math.max(this.minX,Math.min(this.maxX,s.position.x)),s.position.y=Math.max(this.minY,Math.min(this.maxY,s.position.y)),s.position.z=Math.max(this.minZ,Math.min(this.maxZ,s.position.z));else if(i==="scale"){if(t.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),Fi.set(a,a,a)}else Zt.copy(this.pointStart),Fi.copy(this.pointEnd),Zt.applyQuaternion(this._worldQuaternionInv),Fi.applyQuaternion(this._worldQuaternionInv),Fi.divide(Zt),t.search("X")===-1&&(Fi.x=1),t.search("Y")===-1&&(Fi.y=1),t.search("Z")===-1&&(Fi.z=1);s.scale.copy(this._scaleStart).multiply(Fi),this.scaleSnap&&(t.search("X")!==-1&&(s.scale.x=Math.round(s.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(s.scale.y=Math.round(s.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(s.scale.z=Math.round(s.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(i==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(Zt.setFromMatrixPosition(this.camera.matrixWorld));let l=!1;t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Zt.copy(this.rotationAxis).cross(this.eye))*a):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(pf[t]),Zt.copy(pf[t]),r==="local"&&Zt.applyQuaternion(this.worldQuaternion),Zt.cross(this.eye),Zt.length()===0?l=!0:this.rotationAngle=this._offset.dot(Zt.normalize())*a),(t==="E"||l)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),r==="local"&&t!=="E"&&t!=="XYZE"?(s.quaternion.copy(this._quaternionStart),s.quaternion.multiply(wt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),s.quaternion.copy(wt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),s.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Rl),this.dispatchEvent(gf)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(_f.mode=this.mode,this.dispatchEvent(_f)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(e){return this.object=e,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Rl),this.dispatchEvent(gf),this.pointStart.copy(this.pointEnd))}getRaycaster(){return ns}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}setColors(e,t,i,s){const r=this._gizmo.materialLib;r.xAxis.color.set(e),r.yAxis.color.set(t),r.zAxis.color.set(i),r.active.color.set(s),r.xAxisTransparent.color.set(e),r.yAxisTransparent.color.set(t),r.zAxisTransparent.color.set(i),r.activeTransparent.color.set(s),r.xAxis._color&&r.xAxis._color.set(e),r.yAxis._color&&r.yAxis._color.set(t),r.zAxis._color&&r.zAxis._color.set(i),r.active._color&&r.active._color.set(s),r.xAxisTransparent._color&&r.xAxisTransparent._color.set(e),r.yAxisTransparent._color&&r.yAxisTransparent._color.set(t),r.zAxisTransparent._color&&r.zAxisTransparent._color.set(i),r.activeTransparent._color&&r.activeTransparent._color.set(s)}}function wS(n){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:n.button};{const e=this.domElement.getBoundingClientRect();return{x:(n.clientX-e.left)/e.width*2-1,y:-(n.clientY-e.top)/e.height*2+1,button:n.button}}}function AS(n){if(this.enabled)switch(n.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(n));break}}function RS(n){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(n)),this.pointerDown(this._getPointer(n)))}function CS(n){this.enabled&&this.pointerMove(this._getPointer(n))}function PS(n){this.enabled&&(this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(n)))}function Cl(n,e,t){const i=e.intersectObject(n,!0);for(let s=0;s<i.length;s++)if(i[s].object.visible||t)return i[s];return!1}const Xo=new $n,Mt=new L(0,1,0),vf=new L(0,0,0),xf=new pt,$o=new Xt,ia=new Xt,qn=new L,yf=new pt,Ur=new L(1,0,0),as=new L(0,1,0),Nr=new L(0,0,1),Yo=new L,Cr=new L,Pr=new L;class DS extends Lt{constructor(e){super(),this.isTransformControlsRoot=!0,this.controls=e,this.visible=!1}updateMatrixWorld(e){const t=this.controls;t.object!==void 0&&(t.object.updateMatrixWorld(),t.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):t.object.parent.matrixWorld.decompose(t._parentPosition,t._parentQuaternion,t._parentScale),t.object.matrixWorld.decompose(t.worldPosition,t.worldQuaternion,t._worldScale),t._parentQuaternionInv.copy(t._parentQuaternion).invert(),t._worldQuaternionInv.copy(t.worldQuaternion).invert()),t.camera.updateMatrixWorld(),t.camera.matrixWorld.decompose(t.cameraPosition,t.cameraQuaternion,t._cameraScale),t.camera.isOrthographicCamera?t.camera.getWorldDirection(t.eye).negate():t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(),super.updateMatrixWorld(e)}dispose(){this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class IS extends Lt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new Ia({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new xs({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),i=e.clone();i.opacity=.15;const s=t.clone();s.opacity=.5;const r=e.clone();r.color.setHex(16711680);const o=e.clone();o.color.setHex(65280);const a=e.clone();a.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const u=e.clone();u.color.setHex(255),u.opacity=.5;const h=e.clone();h.opacity=.25;const f=e.clone();f.color.setHex(16776960),f.opacity=.25;const d=e.clone();d.color.setHex(16776960);const _=e.clone();_.color.setHex(7895160),this.materialLib={xAxis:r,yAxis:o,zAxis:a,active:d,xAxisTransparent:l,yAxisTransparent:c,zAxisTransparent:u,activeTransparent:f};const g=new Kt(0,.04,.1,12);g.translate(0,.05,0);const m=new At(.08,.08,.08);m.translate(0,.04,0);const p=new Ft;p.setAttribute("position",new ht([0,0,0,1,0,0],3));const S=new Kt(.0075,.0075,.5,3);S.translate(0,.25,0);function w(Q,q){const K=new cs(Q,.0075,3,64,q*Math.PI*2);return K.rotateY(Math.PI/2),K.rotateX(Math.PI/2),K}function y(){const Q=new Ft;return Q.setAttribute("position",new ht([0,0,0,1,1,1],3)),Q}const C={X:[[new Ce(g,r),[.5,0,0],[0,0,-Math.PI/2]],[new Ce(g,r),[-.5,0,0],[0,0,Math.PI/2]],[new Ce(S,r),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new Ce(g,o),[0,.5,0]],[new Ce(g,o),[0,-.5,0],[Math.PI,0,0]],[new Ce(S,o)]],Z:[[new Ce(g,a),[0,0,.5],[Math.PI/2,0,0]],[new Ce(g,a),[0,0,-.5],[-Math.PI/2,0,0]],[new Ce(S,a),null,[Math.PI/2,0,0]]],XYZ:[[new Ce(new Gs(.1,0),h),[0,0,0]]],XY:[[new Ce(new At(.15,.15,.01),u),[.15,.15,0]]],YZ:[[new Ce(new At(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Ce(new At(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]]},P={X:[[new Ce(new Kt(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new Ce(new Kt(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new Ce(new Kt(.2,0,.6,4),i),[0,.3,0]],[new Ce(new Kt(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new Ce(new Kt(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new Ce(new Kt(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new Ce(new Gs(.2,0),i)]],XY:[[new Ce(new At(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new Ce(new At(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Ce(new At(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]]},A={START:[[new Ce(new Gs(.01,2),s),null,null,null,"helper"]],END:[[new Ce(new Gs(.01,2),s),null,null,null,"helper"]],DELTA:[[new _i(y(),s),null,null,null,"helper"]],X:[[new _i(p,s),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new _i(p,s),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new _i(p,s),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},R={XYZE:[[new Ce(w(.5,1),_),null,[0,Math.PI/2,0]]],X:[[new Ce(w(.5,.5),r)]],Y:[[new Ce(w(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new Ce(w(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new Ce(w(.75,1),f),null,[0,Math.PI/2,0]]]},M={AXIS:[[new _i(p,s),[-1e3,0,0],null,[1e6,1,1],"helper"]]},E={XYZE:[[new Ce(new pu(.25,10,8),i)]],X:[[new Ce(new cs(.5,.1,4,24),i),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new Ce(new cs(.5,.1,4,24),i),[0,0,0],[Math.PI/2,0,0]]],Z:[[new Ce(new cs(.5,.1,4,24),i),[0,0,0],[0,0,-Math.PI/2]]],E:[[new Ce(new cs(.75,.1,2,24),i)]]},I={X:[[new Ce(m,r),[.5,0,0],[0,0,-Math.PI/2]],[new Ce(S,r),[0,0,0],[0,0,-Math.PI/2]],[new Ce(m,r),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new Ce(m,o),[0,.5,0]],[new Ce(S,o)],[new Ce(m,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new Ce(m,a),[0,0,.5],[Math.PI/2,0,0]],[new Ce(S,a),[0,0,0],[Math.PI/2,0,0]],[new Ce(m,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new Ce(new At(.15,.15,.01),u),[.15,.15,0]]],YZ:[[new Ce(new At(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Ce(new At(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new Ce(new At(.1,.1,.1),h)]]},F={X:[[new Ce(new Kt(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new Ce(new Kt(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new Ce(new Kt(.2,0,.6,4),i),[0,.3,0]],[new Ce(new Kt(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new Ce(new Kt(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new Ce(new Kt(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new Ce(new At(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new Ce(new At(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Ce(new At(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new Ce(new At(.2,.2,.2),i),[0,0,0]]]},j={X:[[new _i(p,s),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new _i(p,s),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new _i(p,s),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function ie(Q){const q=new Lt;for(const K in Q)for(let k=Q[K].length;k--;){const le=Q[K][k][0].clone(),ve=Q[K][k][1],be=Q[K][k][2],Fe=Q[K][k][3],at=Q[K][k][4];le.name=K,le.tag=at,ve&&le.position.set(ve[0],ve[1],ve[2]),be&&le.rotation.set(be[0],be[1],be[2]),Fe&&le.scale.set(Fe[0],Fe[1],Fe[2]),le.updateMatrix();const We=le.geometry.clone();We.applyMatrix4(le.matrix),le.geometry=We,le.renderOrder=1/0,le.position.set(0,0,0),le.rotation.set(0,0,0),le.scale.set(1,1,1),q.add(le)}return q}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=ie(C)),this.add(this.gizmo.rotate=ie(R)),this.add(this.gizmo.scale=ie(I)),this.add(this.picker.translate=ie(P)),this.add(this.picker.rotate=ie(E)),this.add(this.picker.scale=ie(F)),this.add(this.helper.translate=ie(A)),this.add(this.helper.rotate=ie(M)),this.add(this.helper.scale=ie(j)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const i=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:ia;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let s=[];s=s.concat(this.picker[this.mode].children),s=s.concat(this.gizmo[this.mode].children),s=s.concat(this.helper[this.mode].children);for(let r=0;r<s.length;r++){const o=s[r];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(wt.setFromEuler(Xo.set(0,0,0)),o.quaternion.copy(i).multiply(wt),Math.abs(Mt.copy(Ur).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(wt.setFromEuler(Xo.set(0,0,Math.PI/2)),o.quaternion.copy(i).multiply(wt),Math.abs(Mt.copy(as).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(wt.setFromEuler(Xo.set(0,Math.PI/2,0)),o.quaternion.copy(i).multiply(wt),Math.abs(Mt.copy(Nr).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(wt.setFromEuler(Xo.set(0,Math.PI/2,0)),Mt.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(xf.lookAt(vf,Mt,as)),o.quaternion.multiply(wt),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),Zt.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Zt.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(Zt),o.visible=this.dragging):(o.quaternion.copy(i),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(i),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(Mt.copy(Ur).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(Mt.copy(as).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(Mt.copy(Nr).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(Mt.copy(Nr).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(Mt.copy(Ur).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(Mt.copy(as).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&($o.copy(i),Mt.copy(this.eye).applyQuaternion(wt.copy(i).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(xf.lookAt(this.eye,vf,as)),o.name==="X"&&(wt.setFromAxisAngle(Ur,Math.atan2(-Mt.y,Mt.z)),wt.multiplyQuaternions($o,wt),o.quaternion.copy(wt)),o.name==="Y"&&(wt.setFromAxisAngle(as,Math.atan2(Mt.x,Mt.z)),wt.multiplyQuaternions($o,wt),o.quaternion.copy(wt)),o.name==="Z"&&(wt.setFromAxisAngle(Nr,Math.atan2(Mt.y,Mt.x)),wt.multiplyQuaternions($o,wt),o.quaternion.copy(wt))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis?(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1):this.axis.split("").some(function(l){return o.name===l})&&(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1))}super.updateMatrixWorld(e)}}class LS extends Ce{constructor(){super(new lo(1e5,1e5,2,2),new Ia({visible:!1,wireframe:!0,side:Hn,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),Yo.copy(Ur).applyQuaternion(t==="local"?this.worldQuaternion:ia),Cr.copy(as).applyQuaternion(t==="local"?this.worldQuaternion:ia),Pr.copy(Nr).applyQuaternion(t==="local"?this.worldQuaternion:ia),Mt.copy(Cr),this.mode){case"translate":case"scale":switch(this.axis){case"X":Mt.copy(this.eye).cross(Yo),qn.copy(Yo).cross(Mt);break;case"Y":Mt.copy(this.eye).cross(Cr),qn.copy(Cr).cross(Mt);break;case"Z":Mt.copy(this.eye).cross(Pr),qn.copy(Pr).cross(Mt);break;case"XY":qn.copy(Pr);break;case"YZ":qn.copy(Yo);break;case"XZ":Mt.copy(Pr),qn.copy(Cr);break;case"XYZ":case"E":qn.set(0,0,0);break}break;default:qn.set(0,0,0)}qn.length()===0?this.quaternion.copy(this.cameraQuaternion):(yf.lookAt(Zt.set(0,0,0),qn,Mt),this.quaternion.setFromRotationMatrix(yf)),super.updateMatrixWorld(e)}}async function jt(n,e={},t){return window.__TAURI_INTERNALS__.invoke(n,e,t)}const Tt={openVehicle:()=>jt("open_vehicle"),openVehiclePath:n=>jt("open_vehicle_path",{path:n}),resolveVehicleBase:(n,e)=>jt("resolve_vehicle_base",{path:n,reference:e}),chooseVehicleBase:()=>jt("choose_vehicle_base"),chooseVehicleWorkspace:()=>jt("choose_vehicle_workspace"),scanVehicleWorkspace:n=>jt("scan_vehicle_workspace",{path:n}),scanVehicleSchema:n=>jt("scan_vehicle_schema",{path:n}),chooseFolder:()=>jt("choose_folder"),chooseOverrideFile:()=>jt("choose_override_file"),chooseSupportFile:n=>jt("choose_support_file",{kind:n}),readBuiltinSupport:n=>jt("read_builtin_support",{kind:n}),scanFolder:(n,e)=>jt("scan_resource_folder",{path:n,kind:e}),readText:n=>jt("read_text_path",{path:n}),readBinary:async n=>{const e=await jt("read_binary_base64",{path:n}),t=atob(e),i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i.buffer},saveVehicle:(n,e,t=!1)=>jt("save_vehicle",{path:n,text:e,saveAs:t}),saveWeapon:(n,e)=>jt("save_weapon",{path:n,text:e})};function US(n){const e=new DataView(n),t=e.byteLength;if(t<8||e.getUint16(0,!0)!==4096)throw new Error("不是受支持的 OGRE .mesh 文件");const[i,s]=vu(e,2,t),r=_s(e,s,t);if(!r||r.id!==12288)throw new Error("OGRE mesh 缺少 M_MESH 块");let o=r.payload+1;const a=[];let l=null,c;const u=new Map;for(;o+6<=t;){const h=_s(e,o,t);if(!h)break;if(h.id===16384){const f=NS(e,h.payload,t);a.push(f.value),o=f.pos}else if(h.id===20480){const f=pp(e,h.payload,t);l=f.value,o=f.pos}else if(h.id===36864&&h.payload+28<=h.end)c={min:Mf(e,h.payload,3),max:Mf(e,h.payload+12,3),radius:e.getFloat32(h.payload+24,!0)},o+=h.length;else if(h.id===40960){const f=OS(e,h.payload,t);f.names.forEach((d,_)=>u.set(_,d)),o=f.pos}else{if([45056,49152,53248,57344].includes(h.id))break;o+=h.length}}return a.forEach((h,f)=>{h.name=u.get(f)??h.materialName??`submesh-${f}`}),{version:i,sharedGeometry:l,submeshes:a,bounds:c}}function NS(n,e,t){const[i,s]=vu(n,e,t);let r=s;if(r+6>t)throw new Error("OGRE submesh 头部不完整");const o=n.getUint8(r)!==0,a=n.getUint32(r+1,!0),l=n.getUint8(r+5)!==0;r+=6;const c=[],u=l?4:2;for(let d=0;d<a&&r+u<=t;d++,r+=u)c.push(l?n.getUint32(r,!0):n.getUint16(r,!0));let h=null,f=4;for(;r+6<=t;){const d=_s(n,r,t);if(!d)break;if(d.id===20480){const _=pp(n,d.payload,t);h=_.value,r=_.pos}else if(d.id===16400&&d.payload+2<=d.end)f=n.getUint16(d.payload,!0),r+=d.length;else if(d.id===16640||d.id===16896)r+=d.length;else break}return{value:{name:i,materialName:i,useSharedVertices:o,operationType:f,indices:c,geometry:h},pos:r}}function pp(n,e,t){if(e+4>t)throw new Error("OGRE geometry 不完整");const i=n.getUint32(e,!0);let s=e+4;const r=[],o=new Map;for(;s+6<=t;){const u=_s(n,s,t);if(!u)break;if(u.id===20736){let h=u.payload;for(;h+6<=t;){const f=_s(n,h,t);if(!f||f.id!==20752||f.payload+10>f.end)break;r.push({source:n.getUint16(f.payload,!0),type:n.getUint16(f.payload+2,!0),semantic:n.getUint16(f.payload+4,!0),offset:n.getUint16(f.payload+6,!0),index:n.getUint16(f.payload+8,!0)}),h+=f.length}s=h}else if(u.id===20992&&u.payload+4<=u.end){const h=n.getUint16(u.payload,!0),f=n.getUint16(u.payload+2,!0),d=_s(n,u.payload+4,t);d?.id===21008?(o.set(h,{stride:f,rawStart:d.payload,rawEnd:d.end}),s=u.payload+4+d.length):s+=u.length}else break}const a=[],l=[],c=[];for(const u of r){const h=o.get(u.source);if(!h)continue;const f=u.type===0?1:u.type===1?2:u.type===2?3:u.type===3?4:0;if(!f)continue;const d=u.semantic===1?a:u.semantic===4?l:u.semantic===7&&u.index===0?c:null;if(d)for(let _=0;_<i;_++){const g=h.rawStart+_*h.stride+u.offset;if(g+f*4>h.rawEnd)break;for(let m=0;m<f;m++)d.push(n.getFloat32(g+m*4,!0))}}return{value:{vertexCount:i,positions:a,normals:l,uvs:c},pos:s}}function OS(n,e,t){const i=new Map;let s=e;for(;s+6<=t;){const r=_s(n,s,t);if(!r||r.id!==41216||r.payload+2>r.end)break;const o=n.getUint16(r.payload,!0),[a]=vu(n,r.payload+2,r.end);i.set(o,a),s+=r.length}return{names:i,pos:s}}function _s(n,e,t){if(e+6>Math.min(t,n.byteLength))return null;const i=n.getUint16(e,!0),s=n.getUint32(e+2,!0);return s<6?null:{id:i,length:s,payload:e+6,end:Math.min(e+s,t,n.byteLength)}}function vu(n,e,t){const i=[];for(;e<t&&e<n.byteLength&&n.getUint8(e)!==10;)i.push(n.getUint8(e++));if(e>=t||e>=n.byteLength)throw new Error("OGRE 字符串未终止");return[new TextDecoder().decode(new Uint8Array(i)),e+1]}function Mf(n,e,t){return Array.from({length:t},(i,s)=>n.getFloat32(e+s*4,!0))}function Dn(n){const e=(n??"").trim().split(/\s+/).filter(Boolean).map(Number);return[Pl(e[0]),Pl(e[1]),Pl(e[2])]}function FS(n){return n.map(e=>Number(e.toFixed(5)).toString()).join(" ")}function Pl(n){return Number.isFinite(n)?n:0}function BS(n){const e=n.root;if(!e||e.name!=="vehicle")throw new Error("根元素不是 <vehicle>");const t=[],i=[["physics","physics","物理 / 碰撞"],["control","control","操控"],["tire_set","tire","轮组"],["turret","turret","炮塔"],["visual","visual","外观"],["character_slot","slot","乘员"]];for(const[o,a,l]of i){const c=e.children.filter(u=>u.name===o);c.forEach((u,h)=>{const f=n.attrs(u),d=a==="visual"?`${f.class??"visual"} · ${f.mesh_filename||"无模型"}`:a==="turret"?f.weapon_key||"无武器":a==="slot"?f.type||"unknown":"";t.push({node:u,kind:a,index:h,label:`${l}${c.length>1?` ${h}`:""}${d?` · ${d}`:""}`})})}const s=new Set(i.map(([o])=>o));return e.children.filter(o=>!s.has(o.name)).forEach((o,a)=>{const l=n.value(o,"key")??n.value(o,"class")??n.value(o,"type")??"";t.push({node:o,kind:"other",index:a,label:`${o.name}${l?` · ${l}`:""}`})}),t}function zS(n,e,t){return n.value(e,"key")==="broken"===t}function xu(n,e){return e.children.find(t=>t.name==="state"&&n.value(t,"class")==="idle")}function HS(n,e){return e.name==="character_slot"&&n.value(e,"hiding")==="1"}function ma(n,e,t,i=new Set){const s=e[t];if(!s||i.has(t))return null;const r=Dn(n.value(s,"offset")),o=_p(n.value(s,"rotation")),a=mp(n.value(s,"parent_turret_index"));if(a===null||a===t||!e[a])return{position:r,rotation:o};const l=new Set(i);l.add(t);const c=ma(n,e,a,l);if(!c)return{position:r,rotation:o};const u=yu(r,c.rotation);return{position:[c.position[0]+u[0],c.position[1]+u[1],c.position[2]+u[2]],rotation:c.rotation+o}}function Sf(n,e,t){const i=xu(n,e),s=Dn((i?n.value(i,"position"):void 0)??n.value(e,"seat_position")??n.value(e,"position")),r=_p(i?n.value(i,"rotation")??n.value(e,"rotation"):n.value(e,"rotation")),o=mp(n.value(e,"attached_on_turret"));if(o===null)return{position:s,rotation:r,attachmentIndex:null,attachmentRotation:0};const a=ma(n,t,o);if(!a)return{position:s,rotation:r,attachmentIndex:o,attachmentRotation:0};const l=yu(s,a.rotation);return{position:[a.position[0]+l[0],a.position[1]+l[1],a.position[2]+l[2]],rotation:a.rotation+r,attachmentIndex:o,attachmentRotation:a.rotation}}function yu(n,e){const t=Math.cos(e),i=Math.sin(e);return[t*n[0]+i*n[2],n[1],-i*n[0]+t*n[2]]}const Ef=-Math.PI/2;function mp(n){if(n===void 0||n.trim()==="")return null;const e=Number(n);return Number.isInteger(e)&&e>=0?e:null}function _p(n){const e=Number(n??0);return Number.isFinite(e)?e:0}function kS(n,e){if(n.value(e,"class")!=="tire"||!n.root)return null;const t=Number.parseInt(n.value(e,"index")??"",10);if(!Number.isInteger(t)||t<0)return null;const i=n.root.children.filter(r=>r.name==="tire_set")[Math.floor(t/2)];if(!i)return null;const s=Dn(n.value(i,"offset"));return[t%2===0?s[0]:-s[0],s[1],s[2]]}class An{constructor(e){this.source=e,this.parse()}source;roots=[];nodes=[];changes=new Map;get root(){return this.roots[0]}get dirty(){return this.changes.size>0}key(e,t){return`${e.id}:${t}`}value(e,t){return this.changes.get(this.key(e,t))??e.attributes.find(s=>s.name===t)?.value}attrs(e){return Object.fromEntries(e.attributes.map(t=>[t.name,this.value(e,t.name)??""]))}set(e,t,i){const s=e.attributes.find(o=>o.name===t)?.value;if(s===void 0)throw new Error(`属性 ${t} 不存在；当前版本只修改已有属性`);const r=this.key(e,t);i===s?this.changes.delete(r):this.changes.set(r,i)}reset(e){if(!e)this.changes.clear();else for(const t of e.attributes)this.changes.delete(this.key(e,t.name))}addAttribute(e,t,i="0"){const s=e.id;this.materialize();const r=this.nodes[s];if(!r)throw new Error("对象已经不存在");if(!/^[A-Za-z_:][\w:.-]*$/.test(t))throw new Error(`无效的属性名称：${t}`);if(r.attributes.some(c=>c.name===t))throw new Error(`属性 ${t} 已存在`);const o=r.selfClosing?2:1,a=r.startTagEnd-o,l=`${this.source.slice(0,a)} ${t}="${Dl(i,'"')}"${this.source.slice(a)}`;this.commit(l)}removeAttribute(e,t){const i=e.id,s=typeof t=="string"?t:t.name;this.materialize();const r=this.nodes[i],o=r?.attributes.find(l=>l.name===s);if(!r||!o)return;let a=o.start;for(;a>r.start&&/[ \t]/.test(this.source[a-1]);)a--;this.commit(this.source.slice(0,a)+this.source.slice(o.end))}appendChild(e,t,i={}){const s=e.id;this.materialize();const r=this.nodes[s];if(!r)throw new Error("父对象已经不存在");if(!/^[A-Za-z_:][\w:.-]*$/.test(t))throw new Error(`无效的对象类型：${t}`);const o=Object.entries(i).map(([h,f])=>{if(!/^[A-Za-z_:][\w:.-]*$/.test(h))throw new Error(`无效的属性名称：${h}`);return` ${h}="${Dl(f,'"')}"`}).join(""),a=GS(this.source,r.start),l=`${a}  `;if(r.selfClosing){const h=r.startTagEnd-2,f=`>
${l}<${t}${o} />
${a}</${r.name}>`;this.commit(this.source.slice(0,h)+f+this.source.slice(r.startTagEnd));return}const c=r.endTagStart,u=c>0&&this.source[c-1]===`
`?"":`
`;this.commit(this.source.slice(0,c)+`${u}${l}<${t}${o} />
${a}`+this.source.slice(c))}removeNode(e){const t=e.id;this.materialize();const i=this.nodes[t];if(!i)return;let s=i.start,r=i.endTagEnd;const o=this.source.lastIndexOf(`
`,s-1)+1;/^[ \t]*$/.test(this.source.slice(o,s))&&(s=o),this.source[r]==="\r"&&this.source[r+1]===`
`?r+=2:this.source[r]===`
`&&(r+=1),this.commit(this.source.slice(0,s)+this.source.slice(r))}commit(e){this.source=e,this.changes.clear(),this.roots.length=0,this.nodes.length=0,this.parse()}serialize(){const e=[];for(const i of this.nodes)for(const s of i.attributes){const r=this.changes.get(this.key(i,s.name));r!==void 0&&e.push({start:s.valueStart,end:s.valueEnd,value:Dl(r,s.quote)})}e.sort((i,s)=>s.start-i.start);let t=this.source;for(const i of e)t=t.slice(0,i.start)+i.value+t.slice(i.end);return t}descendants(e){return this.nodes.filter(t=>t.name===e)}raw(e){return this.source.slice(e.start,e.endTagEnd)}materialize(){this.dirty&&this.commit(this.serialize())}parse(){const e=[];let t=0;for(;t<this.source.length;){const i=this.source.indexOf("<",t);if(i<0)break;if(this.source.startsWith("<!--",i)){const f=this.source.indexOf("-->",i+4);t=f<0?this.source.length:f+3;continue}if(this.source.startsWith("<![CDATA[",i)){const f=this.source.indexOf("]]>",i+9);t=f<0?this.source.length:f+3;continue}if(this.source[i+1]==="?"||this.source[i+1]==="!"){t=bf(this.source,i)+1;continue}const s=bf(this.source,i);if(s<i)throw new Error("XML 起始标签未闭合");const r=this.source.slice(i+1,s);if(r.startsWith("/")){const f=e.pop();f&&(f.endTagStart=i,f.endTagEnd=s+1),t=s+1;continue}const o=r.match(/^\s*([\w:.-]+)/);if(!o){t=s+1;continue}const a=o[1],l={id:this.nodes.length,name:a,attributes:[],children:[],parent:e.at(-1)??null,start:i,startTagEnd:s+1,endTagStart:s+1,endTagEnd:s+1,selfClosing:/\/\s*$/.test(r)},c=i+1,u=/([A-Za-z_:][\w:.-]*)\s*=\s*(["'])(.*?)\2/gs;let h;for(;h=u.exec(r);){if(h.index<(o.index??0)+o[0].length)continue;const f=h[0],d=h[2],_=f.indexOf(d),g=c+h.index+_+1;l.attributes.push({name:h[1],value:VS(h[3]),quote:d,start:c+h.index,end:c+h.index+f.length,valueStart:g,valueEnd:g+h[3].length})}this.nodes.push(l),l.parent?l.parent.children.push(l):this.roots.push(l),l.selfClosing||e.push(l),t=s+1}for(const i of e)i.endTagEnd=this.source.length}}function bf(n,e){let t="";for(let i=e+1;i<n.length;i++){const s=n[i];if(t)s===t&&(t="");else if(s==='"'||s==="'")t=s;else if(s===">")return i}return-1}function Dl(n,e){let t=n.replaceAll("&","&amp;").replaceAll("<","&lt;");return t=e==='"'?t.replaceAll('"',"&quot;"):t.replaceAll("'","&apos;"),t}function VS(n){return n.replaceAll("&quot;",'"').replaceAll("&apos;","'").replaceAll("&lt;","<").replaceAll("&gt;",">").replaceAll("&amp;","&")}function GS(n,e){const t=n.lastIndexOf(`
`,e-1)+1;return n.slice(t,e).match(/^[ \t]*/)?.[0]??""}const Tf=.04;function Hs(n){const e=Math.max(0,Math.min(1,n));return e===0||e===1?e:e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}class Mu{voxels=[];particles=[];sticks=[];constraintByVoxel=[];animations=[];particleIndex=new Map;voxelBindings=[];static parse(e,t){const i=new Mu,s=new An(e);if(s.root?.name!=="model")throw new Error("人物模型 XML 根元素不是 <model>");i.voxels=s.descendants("voxel").filter(l=>l.parent?.name==="voxels").map(l=>({x:kt(s.value(l,"x")),y:kt(s.value(l,"y")),z:kt(s.value(l,"z")),r:kt(s.value(l,"r"),1),g:kt(s.value(l,"g"),1),b:kt(s.value(l,"b"),1),a:kt(s.value(l,"a"),1)}));const r=s.descendants("skeleton")[0];if(r)for(const l of r.children)l.name==="particle"&&i.particles.push({id:s.value(l,"id")??`${i.particles.length}`,name:s.value(l,"name")??"",x:kt(s.value(l,"x")),y:kt(s.value(l,"y")),z:kt(s.value(l,"z"))}),l.name==="stick"&&i.sticks.push({a:s.value(l,"a")??"",b:s.value(l,"b")??""});i.particleIndex=new Map(i.particles.map((l,c)=>[l.id,c])),i.constraintByVoxel=Array(i.voxels.length).fill(null);const o=s.descendants("group").filter(l=>l.parent?.name==="skeletonVoxelBindings");for(const l of o){const c=Math.trunc(kt(s.value(l,"constraintIndex"),-1));for(const u of l.children.filter(h=>h.name==="voxel")){const h=Math.trunc(kt(s.value(u,"index"),-1));h>=0&&h<i.voxels.length&&(i.constraintByVoxel[h]=c)}}const a=new An(t);return i.animations=a.root?.children.filter(l=>l.name==="animation").map((l,c)=>({name:a.value(l,"comment")||`animation ${c}`,loop:a.value(l,"loop")!=="0",end:kt(a.value(l,"end")),speed:kt(a.value(l,"speed"),1),frames:l.children.filter(u=>u.name==="frame").map(u=>({time:kt(a.value(u,"time")),positions:new Float32Array(u.children.filter(h=>h.name==="position").flatMap(h=>[kt(a.value(h,"x")),kt(a.value(h,"y")),kt(a.value(h,"z"))]))}))}))??[],i.prepareVoxelBindings(),i}animation(e,t){if(t)return this.animations.find(i=>i.name===t)??this.animations.find(i=>i.name.toLowerCase()===t.toLowerCase());if(e!==void 0){const i=Number.parseInt(e,10);if(Number.isInteger(i))return this.animations[i]}return this.animations.find(i=>i.name==="still")??this.animations[1]}isStatic(e){if(!e||e.frames.length<=1)return!0;const t=e.frames[0].positions;return e.frames.slice(1).every(i=>i.positions.length===t.length&&i.positions.every((s,r)=>s===t[r]))}createPoseBuffer(){return new Float32Array(this.particles.length*3)}sampleInto(e,t,i){if(!e?.frames.length){this.particles.forEach((f,d)=>{const _=d*3;i[_]=f.x,i[_+1]=f.y,i[_+2]=f.z});return}const s=e.end||e.frames.at(-1).time||1,r=e.loop?t*e.speed%s:Math.min(t*e.speed,s);let o=e.frames.findIndex(f=>f.time>=r);o<0&&(o=e.frames.length-1);const a=Math.max(0,o-1),l=e.frames[a],c=e.frames[o],u=a===o||c.time===l.time?0:(r-l.time)/(c.time-l.time),h=Math.max(0,Math.min(1,u));this.particles.forEach((f,d)=>{const _=d*3,g=l.positions[_]??f.x,m=l.positions[_+1]??f.y,p=l.positions[_+2]??f.z;i[_]=g+((c.positions[_]??g)-g)*h,i[_+1]=m+((c.positions[_+1]??m)-m)*h,i[_+2]=p+((c.positions[_+2]??p)-p)*h})}initializeInstanceMatrices(e){for(let t=0;t<this.voxels.length;t++){const i=t*16;e[i]=1,e[i+5]=1,e[i+10]=1,e[i+15]=1}}writePoseMatrices(e,t){for(let i=0;i<this.voxelBindings.length;i++){const s=this.voxelBindings[i],r=i*16,o=s.a*3;let a=e[o],l=e[o+1],c=e[o+2];if(s.b>=0){const u=s.b*3;a+=(e[u]-a)*s.along,l+=(e[u+1]-l)*s.along,c+=(e[u+2]-c)*s.along}t[r+12]=a+s.offsetX,t[r+13]=l+s.offsetY,t[r+14]=c+s.offsetZ}}prepareVoxelBindings(){this.voxelBindings=this.voxels.map((e,t)=>{const i=this.constraintByVoxel[t],s=i===null?void 0:this.sticks[i],r=s?this.particleIndex.get(s.a):void 0,o=s?this.particleIndex.get(s.b):void 0;if(r!==void 0&&o!==void 0){const u=this.particles[r],h=this.particles[o],f=h.x-u.x,d=h.y-u.y,_=h.z-u.z,g=f*f+d*d+_*_,m=g?((e.x-u.x)*f+(e.y-u.y)*d+(e.z-u.z)*_)/g:0;return{a:r,b:o,along:m,offsetX:e.x-(u.x+f*m),offsetY:e.y-(u.y+d*m),offsetZ:e.z-(u.z+_*m)}}let a=0,l=1/0;this.particles.forEach((u,h)=>{const f=(u.x-e.x)**2+(u.y-e.y)**2+(u.z-e.z)**2;f<l&&(l=f,a=h)});const c=this.particles[a]??{x:e.x,y:e.y,z:e.z};return{a,b:-1,along:0,offsetX:e.x-c.x,offsetY:e.y-c.y,offsetZ:e.z-c.z}})}}function kt(n,e=0){const t=Number.parseFloat(n??"");return Number.isFinite(t)?t:e}function WS(n){const e=new An(n);if(e.root?.name!=="model")throw new Error("体素武器模型的根元素不是 <model>");return e.descendants("voxel").filter(t=>t.parent?.name==="voxels").map(t=>({x:is(e.value(t,"x")),y:is(e.value(t,"y")),z:is(e.value(t,"z")),r:is(e.value(t,"r"),1),g:is(e.value(t,"g"),1),b:is(e.value(t,"b"),1),a:is(e.value(t,"a"),1)})).filter(t=>t.a>0)}function is(n,e=0){const t=Number(n);return Number.isFinite(t)?t:e}class XS{constructor(e,t,i,s){this.host=e,this.onSelect=t,this.onMove=i,this.onStats=s,this.scene.background=new Qe(856341),this.scene.fog=new hu(856341,80,250),this.camera.position.set(16,11,18),this.renderer=new uS({antialias:!0,powerPreference:"high-performance"}),this.renderer.outputColorSpace=fn,this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.25)),this.renderer.shadowMap.enabled=!1,this.host.appendChild(this.renderer.domElement),this.controls=new fS(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.target.set(0,1.6,0),this.controls.screenSpacePanning=!0,this.transform=new TS(this.camera,this.renderer.domElement),this.transform.setMode("translate"),this.transform.setSize(.75),this.scene.add(this.transform.getHelper()),this.scene.add(this.root),this.transform.addEventListener("dragging-changed",o=>{this.controls.enabled=!o.value}),this.transform.addEventListener("mouseDown",()=>{this.drag&&this.drag.start.copy(this.proxy.position)}),this.transform.addEventListener("mouseUp",()=>{if(!this.drag)return;const o=this.proxy.position.clone().sub(this.drag.start),a=this.drag.value;o.applyAxisAngle(new L(0,1,0),-this.drag.basisRotation),this.onMove(this.drag.node,this.drag.attr,[a[0]+o.x,a[1]+o.y,a[2]+o.z])}),this.renderer.domElement.addEventListener("pointerdown",o=>this.pick(o)),new ResizeObserver(()=>this.resize()).observe(e),this.addEnvironment(),this.resetCamera(),this.loop()}host;onSelect;onMove;onStats;scene=new lv;camera=new Cn(45,1,.05,1e3);renderer;controls;transform;root=new Mi;selectedHelper;proxy=new Lt;drag;doc;catalog;soldier;options;meshCache=new Map;textureCache=new Map;voxelCache=new Map;nodeObjects=new Map;occupants=[];startTime=performance.now();pickTargets=[];raycaster=new op;pointer=new $e;frame=0;lastAnimationUpdate=-1/0;animationIntervalMs=50;fpsFrames=0;fpsStarted=performance.now();async setDocument(e,t,i,s){this.doc=e,this.catalog=t,this.soldier=i,this.options=s,this.transform.detach(),this.drag=void 0,this.startTime=performance.now(),this.lastAnimationUpdate=-1/0,this.clearRoot();const r=e.root;if(!r)return;const o=r.children.find(c=>c.name==="physics"),a=Dn(o?e.value(o,"visual_offset"):void 0),l=r.children.filter(c=>c.name==="turret");for(const c of r.children.filter(u=>u.name==="visual")){const u=e.attrs(c);if(!zS(e,c,s.showBroken))continue;const h=t.resolve(u.mesh_filename,"model");if(h)try{const f=await this.loadMesh(h),d=await this.buildMesh(f,c),_=Dn(u.offset);let g=[a[0]+_[0],a[1]+_[1],a[2]+_[2]];if(u.class==="tire"){const m=kS(e,c);m&&(g=[a[0]+_[0]+m[0],a[1]+_[1]+m[1],a[2]+_[2]+m[2]])}if(u.class==="turret"){const m=ma(e,l,Number.parseInt(u.turret_index??"0",10));if(m){const p=yu(_,m.rotation);g=[a[0]+m.position[0]+p[0],a[1]+m.position[1]+p[1],a[2]+m.position[2]+p[2]],d.rotation.y=m.rotation}}d.position.set(...g),d.userData.nodeId=c.id,d.traverse(m=>m.userData.nodeId=c.id),this.root.add(d),this.pickTargets.push(d),this.nodeObjects.set(c.id,d)}catch(f){console.warn(`模型加载失败：${u.mesh_filename}`,f)}}for(const[c,u]of l.entries())await this.addWeapon(u,c,a);if(s.showBounds&&o&&this.addBounds(o),s.showOccupants&&i)for(const c of r.children.filter(u=>u.name==="character_slot"))this.addOccupant(c,l)}select(e){if(this.transform.detach(),this.drag=void 0,this.selectedHelper&&(this.root.remove(this.selectedHelper),this.selectedHelper.dispose(),this.selectedHelper=void 0),!e||!this.doc)return;const t=this.nodeObjects.get(e.id);t&&(this.selectedHelper=new wv(t,15775819),this.root.add(this.selectedHelper));const i=$S(this.doc,e);if(!i)return;const s=t?.position.clone()??new L(...i.value);this.proxy.position.copy(s),this.scene.add(this.proxy),this.transform.attach(this.proxy);const r=this.doc.root?.children.filter(a=>a.name==="turret")??[],o=e.name==="character_slot"?Sf(this.doc,e,r).attachmentRotation:0;this.drag={node:i.node,attr:i.attr,value:i.value,start:s.clone(),basisRotation:o}}resetCamera(){this.camera.position.set(14,10,17),this.controls.target.set(0,1.5,0),this.controls.update()}topView(){this.camera.position.set(0,28,.01),this.controls.target.set(0,0,0),this.controls.update()}sideView(){this.camera.position.set(28,4,0),this.controls.target.set(0,1.5,0),this.controls.update()}async addWeapon(e,t,i){if(!this.doc||!this.catalog)return;const s=this.doc.attrs(e),r=await this.catalog.weapon(s.weapon_key);if(r)try{const o=ma(this.doc,this.doc.root?.children.filter(c=>c.name==="turret")??[],t);if(!o)return;const a=new Mi,l=Dn(s.weapon_offset);if(a.position.set(i[0]+o.position[0],i[1]+o.position[1],i[2]+o.position[2]),a.rotation.y=o.rotation,r.mesh){const c=this.catalog.resolve(r.mesh,"model");if(c){const u=await this.loadMesh(c),h=await this.buildMeshWithTextures(u,r.texture?[r.texture]:[]);h.position.set(...l),a.add(h)}}if(r.voxelModel){const c=this.catalog.resolve(r.voxelModel,"model");if(c){const u=await this.loadVoxels(c),h=this.buildVoxelModel(u);h.position.set(...l),h.rotation.y=Ef,a.add(h)}}if(this.options?.showShields){const c=new Mi;c.position.set(...l),c.rotation.y=Ef;for(const u of r.shields){if(!u.extent.some(d=>Math.abs(d)>0))continue;const h=new At(Math.abs(u.extent[0]),Math.abs(u.extent[1]),Math.abs(u.extent[2])),f=new no(new Lh(h),new xs({color:14249215,transparent:!0,opacity:.95}));f.position.set(...u.offset),c.add(f)}c.children.length&&a.add(c)}if(!a.children.length)return;a.userData.nodeId=e.id,a.traverse(c=>c.userData.nodeId=e.id),this.root.add(a),this.pickTargets.push(a),this.nodeObjects.set(e.id,a)}catch(o){console.warn(`武器模型加载失败：${r.mesh??r.voxelModel??s.weapon_key}`,o)}}buildVoxelModel(e){const t=new Rh(new At(.96,.96,.96),wf(),e.length),i=new pt;return e.forEach((s,r)=>{i.makeTranslation(s.x,s.y,s.z),t.setMatrixAt(r,i),t.setColorAt(r,new Qe(Hs(s.r),Hs(s.g),Hs(s.b)))}),t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0),t.scale.setScalar(Tf),t}addBounds(e){if(!this.doc)return;const t=this.doc.attrs(e),i=(s,r,o)=>{const a=Dn(t[s]),l=Dn(t[r]);if(!a.some(f=>f>0))return;const c=new At(Math.abs(a[0]),Math.max(.05,Math.abs(a[1])),Math.abs(a[2])),u=new Lh(c),h=new no(u,new xs({color:o,transparent:!0,opacity:.85}));h.position.set(...l),h.userData.nodeId=e.id,this.root.add(h)};i("collision_model_extent","collision_model_pos",16735581),i("extent","offset",5294335)}addOccupant(e,t){if(!this.doc||!this.soldier||!this.options||HS(this.doc,e))return;const i=xu(this.doc,e),s=this.doc.attrs(e),r=i?this.doc.attrs(i):{},o=Sf(this.doc,e,t),a=new L(...o.position),l=o.rotation,c=new At(.96,.96,.96),u=wf(),h=new Rh(c,u,this.soldier.voxels.length);h.instanceMatrix.setUsage(Lg),h.position.copy(a),h.rotation.y=l,h.scale.setScalar(Tf),this.soldier.voxels.forEach((g,m)=>h.setColorAt(m,new Qe(Hs(g.r),Hs(g.g),Hs(g.b)))),h.instanceColor&&(h.instanceColor.needsUpdate=!0);const f=this.soldier.animation(r.animation_id??s.animation_id,r.animation_key??s.animation_key),d=this.soldier.createPoseBuffer(),_=h.instanceMatrix.array;this.soldier.initializeInstanceMatrices(_),this.soldier.sampleInto(f,0,d),this.soldier.writePoseMatrices(d,_),h.instanceMatrix.needsUpdate=!0,h.userData.nodeId=e.id,this.root.add(h),this.nodeObjects.set(e.id,h),this.occupants.push({mesh:h,animation:f,assets:this.soldier,pose:d,dynamic:!this.soldier.isStatic(f)})}async buildMesh(e,t){if(!this.doc)return new Mi;const i=this.doc.attrs(t),s=t.children.filter(r=>r.name==="part").map(r=>this.doc.value(r,"texture_filename")??"");return this.buildMeshWithTextures(e,s.length?s:[i.texture_filename??""])}async buildMeshWithTextures(e,t){const i=new Mi;if(!this.catalog)return i;for(let s=0;s<e.submeshes.length;s++){const r=e.submeshes[s],o=r.useSharedVertices?e.sharedGeometry:r.geometry;if(!o||r.operationType!==4)continue;const a=new Ft;a.setAttribute("position",new ht(o.positions,3)),o.normals.length===o.positions.length?a.setAttribute("normal",new ht(o.normals,3)):a.computeVertexNormals(),o.uvs.length>=o.vertexCount*2&&a.setAttribute("uv",new ht(o.uvs,2)),a.setIndex(r.indices),a.computeBoundingSphere();const l=t[Math.min(s,t.length-1)]||t[0],c=this.catalog.resolve(l,"texture");let u;if(c)try{u=await this.loadTexture(c)}catch{}const h=new pv({map:u,color:u?16777215:YS(r.materialName),roughness:.78,metalness:.08,side:Hn}),f=new Ce(a,h);f.castShadow=!1,f.receiveShadow=!1,f.name=r.name,i.add(f)}return i}loadMesh(e){let t=this.meshCache.get(e);return t||(t=Tt.readBinary(e).then(US),this.meshCache.set(e,t)),t}loadVoxels(e){let t=this.voxelCache.get(e);return t||(t=Tt.readText(e).then(WS),this.voxelCache.set(e,t)),t}loadTexture(e){let t=this.textureCache.get(e);return t||(t=Tt.readBinary(e).then(i=>new Promise((s,r)=>{const o=e.split(".").at(-1)?.toLowerCase();if(!["png","jpg","jpeg","bmp"].includes(o??"")){r(new Error(`暂不支持浏览器纹理格式 ${o}`));return}const a=URL.createObjectURL(new Blob([i]));new yv().load(a,l=>{URL.revokeObjectURL(a),l.colorSpace=fn,l.flipY=!1,s(l)},void 0,l=>{URL.revokeObjectURL(a),r(l)})}))),this.textureCache.set(e,t),t}addEnvironment(){this.scene.add(new Mv(12241663,2629654,1.45));const e=new Oh(16777215,2.2);e.position.set(18,28,20),e.castShadow=!1,this.scene.add(e);const t=new Oh(7773695,.7);t.position.set(-20,12,-18),this.scene.add(t);const i=new Tv(80,80,6910588,2436147);i.position.y=-.02,this.scene.add(i);const s=new Av(3);this.scene.add(s)}clearRoot(){for(this.occupants=[],this.pickTargets=[],this.nodeObjects.clear();this.root.children.length;)this.root.children.pop().traverse(t=>{t.geometry?.dispose?.(),Array.isArray(t.material)?t.material.forEach(i=>i.dispose()):t.material?.dispose?.()})}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;!e||!t||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1))}pick(e){if(this.transform.dragging)return;const t=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);const i=this.raycaster.intersectObjects(this.pickTargets,!0).find(r=>Af(r.object)!==void 0),s=i?Af(i.object):void 0;s!==void 0&&this.onSelect(s)}loop=()=>{this.frame=requestAnimationFrame(this.loop),this.controls.update();const e=performance.now();this.options?.animate&&e-this.lastAnimationUpdate>=this.animationIntervalMs&&(this.updateOccupants((e-this.startTime)/1e3),this.lastAnimationUpdate=e),this.selectedHelper?.update(),this.renderer.render(this.scene,this.camera),this.fpsFrames++,e-this.fpsStarted>=750&&(this.onStats(Math.round(this.fpsFrames*1e3/(e-this.fpsStarted)),this.occupants.filter(t=>t.dynamic).length),this.fpsFrames=0,this.fpsStarted=e)};updateOccupants(e){for(const t of this.occupants)t.dynamic&&(t.assets.sampleInto(t.animation,e,t.pose),t.assets.writePoseMatrices(t.pose,t.mesh.instanceMatrix.array),t.mesh.instanceMatrix.needsUpdate=!0)}}function wf(){return new Ci({uniforms:{occupantOpacity:{value:1}},vertexShader:`
      varying vec3 vOccupantColor;
      void main() {
        #ifdef USE_INSTANCING_COLOR
          vOccupantColor = instanceColor;
        #else
          vOccupantColor = vec3(1.0);
        #endif
        vec4 modelPosition = vec4(position, 1.0);
        #ifdef USE_INSTANCING
          modelPosition = instanceMatrix * modelPosition;
        #endif
        gl_Position = projectionMatrix * modelViewMatrix * modelPosition;
      }
    `,fragmentShader:`
      uniform float occupantOpacity;
      varying vec3 vOccupantColor;
      void main() { gl_FragColor = vec4(vOccupantColor, occupantOpacity); }
    `,transparent:!1,depthWrite:!0,toneMapped:!1})}function $S(n,e){const t=e.name==="character_slot"?xu(n,e):void 0;if(t&&n.value(t,"position")!==void 0)return{node:t,attr:"position",value:Dn(n.value(t,"position"))};const i=e.name==="physics"?["collision_model_pos","visual_offset","offset"]:e.name==="character_slot"?["seat_position","position","enter_position"]:["offset"];for(const s of i)if(n.value(e,s)!==void 0)return{node:e,attr:s,value:Dn(n.value(e,s))};return null}function Af(n){let e=n;for(;e;){if(typeof e.userData.nodeId=="number")return e.userData.nodeId;e=e.parent}}function YS(n){let e=0;for(const t of n)e=e*31+t.charCodeAt(0)>>>0;return new Qe().setHSL(e%360/360,.2,.42)}const qS={class:"view-buttons"},jS=Ta({__name:"EditorViewport",props:{document:{},catalog:{},soldier:{},options:{},selectedId:{},revision:{}},emits:["select","move"],setup(n,{expose:e,emit:t}){const i=n,s=t,r=tt(),o=tt(0),a=tt(0);let l;Zc(()=>{l=new XS(r.value,h=>s("select",h),(h,f,d)=>s("move",h,f,d),(h,f)=>{o.value=h,a.value=f}),c()}),Jc(()=>{});async function c(){l&&i.document&&(await l.setDocument(i.document,i.catalog,i.soldier,i.options),u())}function u(){l?.select(i.selectedId===void 0?void 0:i.document?.nodes[i.selectedId])}return js(()=>[i.document,i.revision,i.soldier,i.options.showBroken,i.options.showOccupants,i.options.showBounds,i.options.showShields],c),js(()=>i.selectedId,u),e({reset:()=>l?.resetCamera(),top:()=>l?.topView(),side:()=>l?.sideView()}),(h,f)=>(Ve(),qe("div",{ref_key:"host",ref:r,class:"viewport-host"},[f[3]||(f[3]=G("div",{class:"viewport-help"},"左键旋转 · 右键平移 · 滚轮缩放 · 单击模型选择 · 拖动箭头修改位置",-1)),G("div",{class:Vi(["fps-badge",{slow:o.value>0&&o.value<25}])},ot(o.value||"—")+" FPS · "+ot(a.value)+" 动态乘员",3),G("div",qS,[G("button",{onClick:f[0]||(f[0]=d=>Rn(l)?.resetCamera())},"透视"),G("button",{onClick:f[1]||(f[1]=d=>Rn(l)?.topView())},"顶视"),G("button",{onClick:f[2]||(f[2]=d=>Rn(l)?.sideView())},"侧视")])],512))}}),Ei="builtin://soldier/model",bi="builtin://soldier/animations",gp={folders:{model:"",texture:"",weapon:""},supportModel:Ei,supportAnimations:bi},vp="rwr-vehicle-studio.resource-presets.v1";function xp(){if(typeof localStorage>"u")return{presets:[],activePresetId:""};try{const n=JSON.parse(localStorage.getItem(vp)??"{}");return{presets:Array.isArray(n.presets)?n.presets.map(JS).filter(e=>!!e):[],activePresetId:typeof n.activePresetId=="string"?n.activePresetId:"",lastSelection:n.lastSelection?yp(n.lastSelection):void 0}}catch{return{presets:[],activePresetId:""}}}function qo(n){typeof localStorage>"u"||localStorage.setItem(vp,JSON.stringify(n))}function Xs(n){return{folders:{...n.folders},supportModel:n.supportModel||Ei,supportAnimations:n.supportAnimations||bi}}function KS(n){return n===Ei||n===bi}function ZS(){return`preset-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function JS(n){if(!n||typeof n!="object")return;const e=n;if(!(typeof e.id!="string"||typeof e.name!="string"||!e.name.trim()))return{id:e.id,name:e.name.trim(),...yp(e)}}function yp(n){const e=n.folders??gp.folders;return{folders:{model:typeof e.model=="string"?e.model:"",texture:typeof e.texture=="string"?e.texture:"",weapon:typeof e.weapon=="string"?e.weapon:""},supportModel:typeof n.supportModel=="string"&&n.supportModel?n.supportModel:Ei,supportAnimations:typeof n.supportAnimations=="string"&&n.supportAnimations?n.supportAnimations:bi}}const QS={class:"modal-backdrop"},eE={class:"dialog resource-dialog"},tE={class:"preset-box"},nE={class:"preset-row"},iE=["value"],sE=["disabled"],rE=["disabled"],oE={class:"preset-row"},aE=["onUpdate:modelValue"],lE=["onClick"],cE={class:"path-row support-row"},uE=["value"],hE=["disabled"],fE={class:"path-row support-row"},dE=["value"],pE=["disabled"],mE={class:"muted"},_E=["disabled"],gE=Ta({__name:"ResourceDialog",props:{catalog:{},supportModel:{},supportAnimations:{}},emits:["close","apply"],setup(n,{emit:e}){const t=n,i=e,s=xp(),r=tt(s.presets),o=tt(s.activePresetId),a=tt(r.value.find(A=>A.id===o.value)?.name??""),l=er({...t.catalog.folders}),c=tt(t.supportModel||Ei),u=tt(t.supportAnimations||bi),h=tt(""),f=tt(!1),d=hn(()=>r.value.find(A=>A.id===o.value));async function _(A){const R=await Tt.chooseFolder();R&&(l[A]=R)}async function g(A){const R=await Tt.chooseSupportFile(A);R&&((A==="model"?c:u).value=R)}function m(){return{folders:{...l},supportModel:c.value,supportAnimations:u.value}}function p(){const A=d.value;A&&(Object.assign(l,A.folders),c.value=A.supportModel,u.value=A.supportAnimations,a.value=A.name,qo({presets:r.value,activePresetId:A.id,lastSelection:Xs(A)}))}function S(){const A=a.value.trim();if(!A){h.value="请先填写预设名称";return}const R=r.value.find(E=>E.name.toLocaleLowerCase()===A.toLocaleLowerCase()),M={id:R?.id??ZS(),name:A,...Xs(m())};r.value=R?r.value.map(E=>E.id===R.id?M:E):[...r.value,M],o.value=M.id,h.value=`已保存预设“${A}”`,qo({presets:r.value,activePresetId:M.id,lastSelection:Xs(M)})}function w(){const A=d.value;!A||!confirm(`删除资源预设“${A.name}”？`)||(r.value=r.value.filter(R=>R.id!==A.id),o.value="",a.value="",h.value="已删除预设",qo({presets:r.value,activePresetId:"",lastSelection:m()}))}function y(A){A==="model"?c.value=Ei:u.value=bi}function C(A,R){return KS(A)?`内置：${R==="model"?"Normandy Ranger 人物模型":"RWR 人物动画"}`:A}async function P(){f.value=!0,h.value="正在递归建立资源索引…";try{for(const R of["model","texture","weapon"])await t.catalog.setFolder(R,l[R]);const A=m();qo({presets:r.value,activePresetId:o.value,lastSelection:Xs(A)}),i("apply",A)}catch(A){h.value=`载入失败：${A instanceof Error?A.message:String(A)}`}finally{f.value=!1}}return(A,R)=>(Ve(),qe("div",QS,[G("section",eE,[G("header",null,[R[9]||(R[9]=G("div",null,[G("small",null,"RESOURCE WORKSPACE"),G("h2",null,"资源文件夹与人物预览")],-1)),G("button",{class:"icon",onClick:R[0]||(R[0]=M=>A.$emit("close"))},"×")]),R[15]||(R[15]=G("p",{class:"muted"},"选择三个上层文件夹后会递归索引同名资源；不要求逐个选取。单文件例外请在主界面“文件覆盖”中指定。",-1)),G("section",tE,[R[11]||(R[11]=G("strong",null,"资源路径预设",-1)),G("div",nE,[Kn(G("select",{"onUpdate:modelValue":R[1]||(R[1]=M=>o.value=M),onChange:R[2]||(R[2]=M=>a.value=d.value?.name??"")},[R[10]||(R[10]=G("option",{value:""},"选择已保存预设",-1)),(Ve(!0),qe(Ut,null,zn(r.value,M=>(Ve(),qe("option",{key:M.id,value:M.id},ot(M.name),9,iE))),128))],544),[[Wl,o.value]]),G("button",{disabled:!d.value,onClick:p},"载入预设",8,sE),G("button",{disabled:!d.value,onClick:w},"删除",8,rE)]),G("div",oE,[Kn(G("input",{"onUpdate:modelValue":R[3]||(R[3]=M=>a.value=M),placeholder:"新预设名称；同名时覆盖更新"},null,512),[[Zu,a.value]]),G("button",{onClick:S},"保存当前路径")]),R[12]||(R[12]=G("small",null,"预设包含模型、纹理、武器文件夹以及人物模型和动画选择；最后使用的配置会在下次打开载具时自动载入。",-1))]),(Ve(),qe(Ut,null,zn({model:"模型文件夹",texture:"纹理文件夹",weapon:"武器文件夹"},(M,E)=>G("label",{key:E,class:"path-row"},[G("span",null,ot(M),1),Kn(G("input",{"onUpdate:modelValue":I=>l[E]=I},null,8,aE),[[Zu,l[E]]]),G("button",{onClick:I=>_(E)},"浏览",8,lE)])),64)),R[16]||(R[16]=G("hr",null,null,-1)),G("label",cE,[R[13]||(R[13]=G("span",null,"乘员模型",-1)),G("input",{value:C(c.value,"model"),readonly:""},null,8,uE),G("button",{onClick:R[4]||(R[4]=M=>g("model"))},"更改"),G("button",{disabled:c.value===Rn(Ei),onClick:R[5]||(R[5]=M=>y("model"))},"恢复默认",8,hE)]),G("label",fE,[R[14]||(R[14]=G("span",null,"动画文件",-1)),G("input",{value:C(u.value,"animation"),readonly:""},null,8,dE),G("button",{onClick:R[6]||(R[6]=M=>g("animation"))},"更改"),G("button",{disabled:u.value===Rn(bi),onClick:R[7]||(R[7]=M=>y("animation"))},"恢复默认",8,pE)]),G("footer",null,[G("span",mE,ot(h.value),1),G("button",{onClick:R[8]||(R[8]=M=>A.$emit("close"))},"取消"),G("button",{class:"primary",disabled:f.value,onClick:P},"建立索引并载入",8,_E)])])]))}}),vE={class:"modal-backdrop"},xE={class:"dialog override-dialog"},yE={class:"override-list"},ME={key:0,class:"empty"},SE=Ta({__name:"OverrideDialog",props:{catalog:{}},emits:["close","changed"],setup(n,{emit:e}){const t=n,i=e;async function s(){const r=await Tt.chooseOverrideFile();r&&(t.catalog.override(r),i("changed"))}return(r,o)=>(Ve(),qe("div",vE,[G("section",xE,[G("header",null,[o[2]||(o[2]=G("div",null,[G("small",null,"EXPLICIT OVERRIDES"),G("h2",null,"单文件资源覆盖")],-1)),G("button",{class:"icon",onClick:o[0]||(o[0]=a=>r.$emit("close"))},"×")]),o[3]||(o[3]=G("p",{class:"muted"},"同名覆盖优先于文件夹自动索引，适合重名资源或位于目录外的特殊文件。",-1)),G("div",yE,[Object.keys(n.catalog.overrides).length?Gt("",!0):(Ve(),qe("div",ME,"尚未指定覆盖文件")),(Ve(!0),qe(Ut,null,zn(n.catalog.overrides,(a,l)=>(Ve(),qe("div",{key:l},[G("strong",null,ot(l),1),G("span",null,ot(a),1)]))),128))]),G("footer",null,[G("button",{onClick:o[1]||(o[1]=a=>r.$emit("close"))},"完成"),G("button",{class:"primary",onClick:s},"添加文件")])])]))}});function Rf(n,e){const t=new An(n),i=t.descendants("model")[0],s=i?t.value(i,"filename"):void 0,r=i?t.value(i,"mesh_filename")??(s?.toLowerCase().endsWith(".mesh")?s:void 0):void 0,o=s?.toLowerCase().endsWith(".xml")?s:void 0,a=t.descendants("shield").map(l=>({offset:Dn(t.value(l,"offset")),extent:Dn(t.value(l,"extent"))}));return{sourcePath:e,mesh:r,voxelModel:o,texture:i?t.value(i,"texture_filename"):void 0,shields:a}}class EE{folders={model:"",texture:"",weapon:""};indexes={model:{},texture:{},weapon:{}};overrides={};weaponCache=new Map;async setFolder(e,t){this.folders[e]=t,this.indexes[e]=t?await Tt.scanFolder(t,e):{},this.weaponCache.clear()}override(e){this.overrides[Cf(e).toLowerCase()]=e,this.weaponCache.clear()}resolve(e,t){if(!e)return;const i=Cf(e).toLowerCase();return this.overrides[i]??this.indexes[t][i]}async weapon(e){if(!e)return null;const t=e.toLowerCase();if(this.weaponCache.has(t))return this.weaponCache.get(t);const i=this.resolve(e,"weapon");if(!i)return this.weaponCache.set(t,null),null;try{const s=await Tt.readText(i),r=Rf(s,i);return this.weaponCache.set(t,r),r}catch{return this.weaponCache.set(t,null),null}}setWeaponPreview(e,t,i){const s=Rf(i,t);return this.weaponCache.set(e.toLowerCase(),s),s}async missing(e){const t=new Set;for(const i of e.descendants("visual")){const s=e.attrs(i);s.mesh_filename&&!this.resolve(s.mesh_filename,"model")&&t.add(`模型：${s.mesh_filename}`),s.texture_filename&&!this.resolve(s.texture_filename,"texture")&&t.add(`纹理：${s.texture_filename}`);for(const r of i.children.filter(o=>o.name==="part")){const o=e.value(r,"texture_filename");o&&!this.resolve(o,"texture")&&t.add(`纹理：${o}`)}}for(const i of e.descendants("turret")){if(i.parent?.name!=="vehicle")continue;const s=e.value(i,"weapon_key");if(!s)continue;const r=await this.weapon(s);r?(r.mesh?.toLowerCase().endsWith(".mesh")&&!this.resolve(r.mesh,"model")&&t.add(`武器模型：${r.mesh}`),r.voxelModel&&!this.resolve(r.voxelModel,"model")&&t.add(`武器体素模型：${r.voxelModel}`),r.texture&&!this.resolve(r.texture,"texture")&&t.add(`武器纹理：${r.texture}`)):t.add(`武器：${s}`)}return[...t].sort()}}function Cf(n){return n.replaceAll("\\","/").split("/").at(-1)??n}function bE(n){if(!n.root)return;const e=n.value(n.root,"file")?.trim();return e?e.split(/[\\/]/).at(-1)?.toLowerCase()==="vehicle_base.vehicle"?void 0:e:void 0}const TE=new Set(["physics","control","tire_set","turret","visual","character_slot"]),Nc="__rwr_vehicle_origin";function wE(n,e){if(!n?.root||!e.root)return AE(e);const t=new Map;for(const h of e.root.children){const f=t.get(h.name)??[];f.push(h),t.set(h.name,f)}const i=new Set,s=new Map,r=[];for(const h of n.root.children){const f=s.get(h.name)??0;s.set(h.name,f+1);const d=TE.has(h.name)?t.get(h.name)?.[f]:void 0;d?(i.add(d.id),r.push(Il(e,d,`leaf:${d.id}`))):r.push(Il(n,h,`base:${h.id}`))}for(const h of e.root.children)i.has(h.id)||r.push(Il(e,h,`leaf:${h.id}`));const o=new An(`<vehicle>${r.join("")}</vehicle>`),a=new Map,l=new Set,c=new Map(n.nodes.map(h=>[h.id,h])),u=new Map(e.nodes.map(h=>[h.id,h]));for(const h of o.root?.children??[]){const f=h.attributes.find(m=>m.name===Nc)?.value;if(!f)continue;h.attributes=h.attributes.filter(m=>m.name!==Nc);const[d,_]=f.split(":"),g=d==="leaf"?u.get(Number(_)):c.get(Number(_));g&&Mp(h,g,d==="leaf"?a:void 0,l,d==="base")}return{document:o,editableNode:h=>a.get(h.id),inherited:h=>l.has(h.id)}}function AE(n){return{document:n,editableNode:e=>e,inherited:()=>!1}}function Il(n,e,t){const i=n.raw(e),s=i.search(/[\s/>]/);return s<0?i:`${i.slice(0,s)} ${Nc}="${t}"${i.slice(s)}`}function Mp(n,e,t,i,s){t&&t.set(n.id,e),s&&i.add(n.id);const r=Math.min(n.children.length,e.children.length);for(let o=0;o<r;o++)Mp(n.children[o],e.children[o],t,i,s)}const Sp="rwr-vehicle-studio.vehicle-workspace.v1";function Ep(n,e,t=0){const i=[];for(const s of n)i.push({entry:s,depth:t}),s.isDirectory&&e.has(s.path)&&i.push(...Ep(s.children,e,t+1));return i}function RE(){if(typeof localStorage>"u")return{root:"",expanded:[],panelOpen:!0};try{const n=JSON.parse(localStorage.getItem(Sp)??"{}");return{root:typeof n.root=="string"?n.root:"",expanded:Array.isArray(n.expanded)?n.expanded.filter(e=>typeof e=="string"):[],panelOpen:typeof n.panelOpen=="boolean"?n.panelOpen:!0}}catch{return{root:"",expanded:[],panelOpen:!0}}}function CE(n){if(!(typeof localStorage>"u"))try{localStorage.setItem(Sp,JSON.stringify(n))}catch{}}const PE={class:"app-shell"},DE={class:"topbar"},IE=["disabled"],LE=["disabled"],UE=["disabled"],NE=["disabled"],OE={class:"workspace"},FE={class:"scene-panel"},BE=["open"],zE={class:"workspace-toolbar"},HE=["title"],kE={key:0,class:"workspace-error"},VE={key:1,class:"workspace-empty"},GE={key:2,class:"workspace-tree"},WE=["title","onClick"],XE={class:"workspace-kind"},$E={class:"base-actions"},YE={key:1,class:"object-add-row"},qE=["disabled"],jE=["value"],KE=["disabled"],ZE={key:2,class:"schema-hint"},JE={key:3,class:"empty-state"},QE=["title","onClick"],eb={class:"kind-mark"},tb={key:0},nb={key:4,class:"missing-box"},ib={class:"viewport-panel"},sb={key:0,class:"viewport-empty"},rb={class:"quick-options"},ob={class:"inspector"},ab={class:"panel-title"},lb={key:0,class:"empty-state"},cb={key:1,class:"field-list"},ub=["value","disabled","onChange"],hb=["disabled","title","onClick"],fb={key:2,class:"weapon-shield-editor"},db={key:0},pb={key:0,class:"weapon-error"},mb=["title"],_b={key:0,class:"weapon-empty"},gb=["onClick"],vb=["value","onChange"],xb=["value","onChange"],yb={class:"weapon-actions"},Mb=["disabled"],Sb={key:3,class:"attribute-add-row"},Eb=["disabled"],bb=["value"],Tb=["disabled"],wb={class:"inspector-actions"},Ab=["disabled"],Rb=["disabled"],Cb=["disabled"],Pb={class:"statusbar"},Db=Ta({__name:"App",setup(n){const e=xp();let t=Xs(e.lastSelection??gp);const i=tt(),s=tt(),r=tt(),o=new EE;let a;const l=tt(""),c=tt(),u=tt(),h=tt(!1),f=tt(""),d=tt(""),_=tt([]);o.folders={...t.folders};const g=tt([]),m=tt(),p=tt(0),S=tt("请选择 .vehicle 文件"),w=tt([]),y=tt(!1),C=tt(!1),P=tt(),A=tt(t.supportModel||Ei),R=tt(t.supportAnimations||bi),M=er({showBroken:!1,showOccupants:!0,showBounds:!0,showShields:!1,animate:!0}),E=RE(),I=tt(),F=tt(""),j=tt(E.panelOpen),ie=er(new Set(E.expanded)),Q=tt({objectTypes:[],attributes:{}}),q=tt(""),K=tt(""),k=new Map,le=tt(),ve=tt(""),be=tt(0),Fe=tt(0),at=hn(()=>Object.entries({physics:"基础 / 碰撞",control:"操控",tire:"轮组",turret:"炮塔与武器",visual:"外观模型",slot:"乘员位置",other:"其它对象"}).map(([V,ae])=>({kind:V,label:ae,items:g.value.filter(Ke=>Ke.kind===V)})).filter(V=>V.items.length)),We=hn(()=>g.value.find(O=>O.node.id===m.value)),st=hn(()=>We.value?.kind==="turret"&&r.value?r.value.value(We.value.node,"weapon_key")??"":""),oe=hn(()=>{const O=We.value?.node;return!O||!r.value?[]:[O,...O.children.filter(ae=>["state","turret","part"].includes(ae.name))].flatMap(ae=>ae.attributes.map(Ke=>({node:ae,sourceNode:a?.editableNode(ae),attr:Ke.name,value:r.value.value(ae,Ke.name)??"",inherited:a?.inherited(ae)??!1,section:ae===O?O.name:`${ae.name}${r.value.value(ae,"class")?`:${r.value.value(ae,"class")}`:""}`})))}),ue=hn(()=>(p.value,s.value?s.value.serialize()!==d.value:!1)),Pe=hn(()=>(be.value,!!le.value&&le.value.document.serialize()!==le.value.savedText)),ze=hn(()=>ue.value||Fe.value>0),Ue=hn(()=>{be.value;const O=le.value;return O?O.document.descendants("shield").map((V,ae)=>({node:V,index:ae,offset:O.document.value(V,"offset")??"",extent:O.document.value(V,"extent")??""})):[]}),nt=hn(()=>_.value.length>0),D=hn(()=>!!We.value&&!!a?.editableNode(We.value.node)),v=hn(()=>Ep(I.value?.entries??[],ie)),W=hn(()=>{const O=We.value?.node;if(!O)return[];const V=new Set(O.attributes.map(ae=>ae.name));return(Q.value.attributes[O.name]??[]).filter(ae=>!V.has(ae))});async function Z(){if(Se())try{const O=await Tt.openVehicle();if(!O)return;await Y(O)}catch(O){Sn(O)}}async function Y(O){i.value=O,s.value=new An(O.text),d.value=O.text,_.value=[],w.value=[],await H(),ne(!1),Object.values(t.folders).every(Boolean)?(S.value=`已打开 ${O.name}；正在载入上次使用的资源预设…`,await xe(t)):(S.value=`已打开 ${O.name}；请配置资源文件夹`,await we(),y.value=!0)}async function H(){if(c.value=void 0,u.value=void 0,h.value=!1,f.value="",l.value=s.value?bE(s.value)??"":"",!(!l.value||!i.value))try{const O=await Tt.resolveVehicleBase(i.value.path,l.value);if(!O){f.value=`同目录下未找到 ${l.value}`;return}if(O.path===i.value.path){f.value="基础文件不能指向当前载具自身";return}c.value=O,u.value=new An(O.text),h.value=!0}catch(O){f.value=En(O)}}async function fe(){try{const O=await Tt.chooseVehicleBase();if(!O)return;if(O.path===i.value?.path){f.value="基础文件不能选择当前载具自身";return}c.value=O,u.value=new An(O.text),h.value=!1,f.value="",ne(),await ge(),S.value=`已手动指定基础载具：${O.name}`}catch(O){Sn(O)}}async function J(){await H(),ne(),await ge(),S.value=c.value?`已自动匹配基础载具：${c.value.name}`:f.value}async function re(){if(!(!c.value||!Se()))try{await Y(await Tt.openVehiclePath(c.value.path))}catch(O){Sn(O)}}function ne(O=!0){if(!s.value){r.value=void 0,a=void 0,g.value=[],m.value=void 0,p.value++;return}const V=O?We.value:void 0,ae=V?{kind:V.kind,index:V.index}:void 0;a=wE(u.value,s.value),r.value=a.document,g.value=BS(a.document),m.value=(ae?g.value.find(Ke=>Ke.kind===ae.kind&&Ke.index===ae.index):g.value[0])?.node.id,p.value++}function Se(){return!ue.value||confirm("当前载具有未保存修改，仍要打开另一辆载具吗？")}async function b(){try{const O=await Tt.chooseVehicleWorkspace();if(!O)return;I.value=O,F.value="",ie.clear(),j.value=!0,se(),await U(O.root),S.value=`载具工作区：${O.root}`}catch(O){F.value=En(O),Sn(O)}}async function x(){if(E.root)try{I.value=await Tt.scanVehicleWorkspace(E.root),F.value="",await U(E.root)}catch(O){F.value=En(O),S.value=`载具工作区不可用：${F.value}`}}async function U(O){Q.value=await Tt.scanVehicleSchema(O),q.value=Q.value.objectTypes[0]??"",K.value=""}function X(O){j.value=O.currentTarget.open,se()}function se(){CE({root:I.value?.root??E.root,expanded:[...ie],panelOpen:j.value})}async function $(O){if(O.isDirectory){ie.has(O.path)?ie.delete(O.path):ie.add(O.path),se();return}if(!O.isVehicle){const V=`“${O.name}”不是 .vehicle 载具文件`;S.value=V,alert(V);return}if(Se())try{await Y(await Tt.openVehiclePath(O.path))}catch(V){Sn(V)}}async function xe(O){try{for(const V of["model","texture","weapon"])await o.setFolder(V,O.folders[V]);await he(O)}catch(V){S.value=`上次使用的资源路径不可用：${En(V)}`,y.value=!0}}async function he(O){t=Xs(O),A.value=O.supportModel,R.value=O.supportAnimations,y.value=!1,await we(),await ge(),p.value++,await pe(),S.value=`已载入：${g.value.filter(V=>V.kind==="visual").length} 个外观，${g.value.filter(V=>V.kind==="slot").length} 个乘员位`}async function we(){if(!A.value||!R.value){P.value=void 0;return}try{const[O,V]=await Promise.all([A.value===Ei?Tt.readBuiltinSupport("model"):Tt.readText(A.value),R.value===bi?Tt.readBuiltinSupport("animation"):Tt.readText(R.value)]);P.value=Mu.parse(O,V)}catch(O){P.value=void 0,S.value=`人物预览未载入：${En(O)}`}}let Te=0;async function pe(){const O=++Te,V=st.value;if(ve.value="",!V){le.value=void 0;return}le.value=void 0;try{const ae=await o.weapon(V);if(O!==Te)return;if(!ae){le.value=void 0,ve.value=`未找到武器文件：${V}`;return}const Ke=ae.sourcePath.toLowerCase();let Vt=k.get(Ke);if(Vt)Vt.key=V,o.setWeaponPreview(V,Vt.path,Vt.document.serialize());else{const uo=await Tt.readText(ae.sourcePath);if(O!==Te)return;Vt={key:V,path:ae.sourcePath,name:ae.sourcePath.replaceAll("\\","/").split("/").at(-1)??V,document:new An(uo),savedText:uo},k.set(Ke,Vt)}le.value=Vt,be.value++}catch(ae){O===Te&&(le.value=void 0,ve.value=En(ae))}}function ye(){Fe.value=[...k.values()].filter(O=>O.document.serialize()!==O.savedText).length}function De(){const O=le.value;O&&(o.setWeaponPreview(O.key,O.path,O.document.serialize()),be.value++,ye(),p.value++)}function Re(O,V,ae){const Ke=le.value;if(!Ke)return;const Vt=ae.target.value;Ke.document.value(O,V)!==Vt&&(Ke.document.set(O,V,Vt),De())}function Me(){const O=le.value;O?.document.root&&(O.document.appendChild(O.document.root,"shield",{offset:"0 0 0",extent:"1 1 1"}),De(),S.value=`已向 ${O.name} 增加 shield（尚未保存）`)}function Ye(O){const V=le.value;V&&(V.document.removeNode(O),De(),S.value=`已从 ${V.name} 删除 shield（尚未保存）`)}async function N(){const O=le.value;if(O)try{const V=O.document.serialize(),ae=await Tt.saveWeapon(O.path,V);O.savedText=V,O.document.commit(V),o.setWeaponPreview(O.key,O.path,V),be.value++,ye(),p.value++,S.value=`已保存武器：${ae.path}；备份：${ae.backupPath}`}catch(V){Sn(V)}}async function me(){const O=le.value;if(!(!O||Pe.value&&!confirm("未保存的护盾修改将丢失，仍要从磁盘重新载入武器吗？")))try{const V=await Tt.readText(O.path);O.document=new An(V),O.savedText=V,o.setWeaponPreview(O.key,O.path,V),be.value++,ye(),p.value++,S.value=`已重新载入武器：${O.name}`}catch(V){Sn(V)}}async function ge(){r.value&&(w.value=await o.missing(r.value))}function Ie(O){m.value=O}function de(){if(!s.value)return;const O=s.value.serialize();_.value.at(-1)!==O&&(_.value=[..._.value.slice(-99),O])}function ce(O,V){if(!s.value||!O.sourceNode){S.value="该属性继承自基础载具；请打开基础文件后编辑";return}const ae=V.target.value;s.value.value(O.sourceNode,O.attr)!==ae&&(de(),s.value.set(O.sourceNode,O.attr,ae),ne())}function Ne(O,V,ae){if(!s.value)return;const Ke=a?.editableNode(O);if(!Ke){S.value="该位置继承自基础载具；请打开基础文件后编辑",ne();return}const Vt=FS(ae);s.value.value(Ke,V)!==Vt&&(de(),s.value.set(Ke,V,Vt),ne(),S.value=`${V} = ${Vt}`)}function je(){if(!s.value||!We.value)return;const O=a?.editableNode(We.value.node);if(!O){S.value="继承项不能在覆盖文件中恢复；请打开基础文件";return}de(),s.value.reset(O);for(const V of O.children)s.value.reset(V);ne()}function mt(){if(!s.value?.root||!q.value)return;de(),s.value.appendChild(s.value.root,q.value),ne(!1);const O=[...g.value].reverse().find(V=>V.node.name===q.value&&!a?.inherited(V.node));m.value=O?.node.id,S.value=`已增加空对象 <${q.value} />`}function lt(){if(!s.value||!We.value)return;const O=a?.editableNode(We.value.node);if(!O){S.value="继承自基础载具的对象不能在覆盖文件中删除";return}de();const V=O.name;s.value.removeNode(O),ne(!1),S.value=`已删除对象 <${V}>；可用 Ctrl+Z 恢复`}function Un(){if(!s.value||!We.value||!K.value)return;const O=a?.editableNode(We.value.node);if(!O){S.value="继承自基础载具的对象不能在覆盖文件中增加属性";return}de();const V=K.value;s.value.addAttribute(O,V,"0"),ne(),K.value="",S.value=`已加入属性 ${V}`}function Mn(O){if(!s.value||!O.sourceNode){S.value="继承属性不能在覆盖文件中删除";return}de();const V=O.attr;s.value.removeAttribute(O.sourceNode,V),ne(),S.value=`已删除属性 ${V}；可用 Ctrl+Z 恢复`}function pr(){const O=_.value.at(-1);O&&(_.value=_.value.slice(0,-1),s.value=new An(O),ne(),S.value="已撤销上一次修改")}async function Nn(O=!1){if(!(!s.value||!i.value))try{const V=s.value.serialize(),ae=h.value,Ke=await Tt.saveVehicle(i.value.path,V,O);if(!Ke)return;i.value={name:Ke.name,path:Ke.path,text:V},d.value=V,s.value.commit(V),O&&ae&&await H(),ne(),S.value=Ke.backupPath?`已保存；备份：${Ke.backupPath}`:`已保存：${Ke.path}`}catch(V){Sn(V)}}async function mr(){if(!(!i.value||ue.value&&!confirm("未保存修改将丢失，仍要重新载入吗？")))try{const O=await Tt.readText(i.value.path);s.value=new An(O),d.value=O,_.value=[],(h.value||!c.value)&&await H(),ne(),S.value="已从磁盘重新载入"}catch(O){Sn(O)}}async function co(){await ge(),p.value++}function Sn(O){S.value=`错误：${En(O)}`}function En(O){return O instanceof Error?O.message:String(O)}function _r(O){(O.ctrlKey||O.metaKey)&&!O.shiftKey&&O.key.toLowerCase()==="z"&&(O.preventDefault(),pr())}return js(st,()=>{pe()}),Zc(async()=>{window.addEventListener("beforeunload",O=>{ze.value&&(O.preventDefault(),O.returnValue="")}),window.addEventListener("keydown",_r),await x(),Yc()}),Jc(()=>window.removeEventListener("keydown",_r)),(O,V)=>(Ve(),qe("main",PE,[G("header",DE,[V[16]||(V[16]=G("div",{class:"brand"},[G("strong",null,"RWR VEHICLE STUDIO"),G("small",null,"0.2.3 PREVIEW")],-1)),G("nav",null,[G("button",{onClick:Z},"打开载具"),G("button",{onClick:V[0]||(V[0]=ae=>y.value=!0)},"资源文件夹"),G("button",{onClick:V[1]||(V[1]=ae=>C.value=!0)},"文件覆盖"),V[15]||(V[15]=G("span",{class:"divider"},null,-1)),G("button",{disabled:!nt.value,title:"Ctrl+Z",onClick:pr},"撤销",8,IE),G("button",{disabled:!s.value,class:"primary",onClick:V[2]||(V[2]=ae=>Nn(!1))},"保存",8,LE),G("button",{disabled:!s.value,onClick:V[3]||(V[3]=ae=>Nn(!0))},"另存为",8,UE),G("button",{disabled:!s.value,onClick:mr},"重新载入",8,NE)]),G("div",{class:Vi(["file-badge",{dirty:ze.value}])},[G("b",null,ot(i.value?.name??"未打开文件"),1),G("span",null,ot(ze.value?`未保存：${ue.value?"载具":""}${ue.value&&Fe.value?"、":""}${Fe.value?`${Fe.value} 个武器`:""}`:"磁盘同步"),1)],2)]),G("section",OE,[G("aside",FE,[G("details",{class:"vehicle-workspace",open:j.value,onToggle:X},[G("summary",null,[V[17]||(V[17]=G("span",null,"载具工作区",-1)),G("b",null,ot(I.value?v.value.length:0),1)]),G("div",zE,[G("button",{onClick:b},"打开文件夹"),G("span",{title:I.value?.root},ot(I.value?.root??"尚未选择工作区"),9,HE)]),F.value?(Ve(),qe("div",kE,ot(F.value),1)):I.value&&!v.value.length?(Ve(),qe("div",VE,"此文件夹为空")):(Ve(),qe("div",GE,[(Ve(!0),qe(Ut,null,zn(v.value,ae=>(Ve(),qe("button",{key:ae.entry.path,class:Vi(["workspace-entry",{directory:ae.entry.isDirectory,vehicle:ae.entry.isVehicle,other:!ae.entry.isDirectory&&!ae.entry.isVehicle,active:i.value?.path===ae.entry.path}]),style:Ma({paddingLeft:`${9+ae.depth*14}px`}),title:ae.entry.path,onClick:Ke=>$(ae.entry)},[G("span",XE,ot(ae.entry.isDirectory?ie.has(ae.entry.path)?"▾":"▸":ae.entry.isVehicle?"V":"·"),1),G("span",null,ot(ae.entry.name),1)],14,WE))),128))]))],40,BE),l.value?(Ve(),qe("section",{key:0,class:Vi(["base-vehicle-box",{missing:!c.value}])},[G("div",null,[V[18]||(V[18]=G("small",null,"BASE VEHICLE",-1)),G("b",null,ot(c.value?.name??l.value),1),G("span",null,ot(c.value?h.value?"同目录自动匹配":"手动指定":f.value),1)]),G("div",$E,[c.value?(Ve(),qe("button",{key:0,onClick:re},"打开基础")):Gt("",!0),G("button",{onClick:fe},"手动选择"),h.value?Gt("",!0):(Ve(),qe("button",{key:1,onClick:J},"自动匹配"))])],2)):Gt("",!0),V[20]||(V[20]=G("div",{class:"panel-title"},[G("small",null,"SCENE GRAPH"),G("h2",null,"场景对象")],-1)),s.value?(Ve(),qe("div",YE,[Kn(G("select",{"onUpdate:modelValue":V[4]||(V[4]=ae=>q.value=ae),disabled:!Q.value.objectTypes.length,title:"候选来自当前工作区的 .vehicle 文件"},[V[19]||(V[19]=G("option",{disabled:"",value:""},"选择对象类型",-1)),(Ve(!0),qe(Ut,null,zn(Q.value.objectTypes,ae=>(Ve(),qe("option",{key:ae,value:ae},ot(ae),9,jE))),128))],8,qE),[[Wl,q.value]]),G("button",{disabled:!q.value,onClick:mt},"增加空对象",8,KE)])):Gt("",!0),s.value&&!Q.value.objectTypes.length?(Ve(),qe("small",ZE,"打开载具工作区后可从其中出现过的类型增加对象。")):Gt("",!0),s.value?Gt("",!0):(Ve(),qe("div",JE,"打开载具文件后，此处会按物理、炮塔、外观和乘员分类。")),(Ve(!0),qe(Ut,null,zn(at.value,ae=>(Ve(),qe("details",{key:ae.kind,open:""},[G("summary",null,[G("span",null,ot(ae.label),1),G("b",null,ot(ae.items.length),1)]),(Ve(!0),qe(Ut,null,zn(ae.items,Ke=>(Ve(),qe("button",{key:Ke.node.id,class:Vi(["scene-item",{active:m.value===Ke.node.id,inherited:Rn(a)?.inherited(Ke.node)}]),title:Rn(a)?.inherited(Ke.node)?"继承自基础载具（只读）":"来自当前载具文件",onClick:Vt=>Ie(Ke.node.id)},[G("span",eb,ot(Ke.index),1),G("span",null,ot(Ke.label),1),Rn(a)?.inherited(Ke.node)?(Ve(),qe("em",tb,"基础")):Gt("",!0)],10,QE))),128))]))),128)),w.value.length?(Ve(),qe("div",nb,[G("strong",null,"未解析资源 "+ot(w.value.length),1),(Ve(!0),qe(Ut,null,zn(w.value.slice(0,12),ae=>(Ve(),qe("span",{key:ae},ot(ae),1))),128)),G("button",{onClick:V[5]||(V[5]=ae=>C.value=!0)},"指定单文件覆盖")])):Gt("",!0)]),G("section",ib,[oi(jS,{document:r.value,catalog:Rn(o),soldier:P.value,options:M,"selected-id":m.value,revision:p.value,onSelect:Ie,onMove:Ne},null,8,["document","catalog","soldier","options","selected-id","revision"]),s.value?Gt("",!0):(Ve(),qe("div",sb,[V[21]||(V[21]=G("b",null,"NO VEHICLE LOADED",-1)),V[22]||(V[22]=G("span",null,"读取 .vehicle、OGRE .mesh 与引用纹理，在游戏外直接校准数字。",-1)),G("button",{class:"primary",onClick:Z},"选择载具文件")])),G("div",rb,[G("label",null,[Kn(G("input",{"onUpdate:modelValue":V[6]||(V[6]=ae=>M.showBounds=ae),type:"checkbox"},null,512),[[yr,M.showBounds]]),V[23]||(V[23]=rs(" 碰撞框",-1))]),G("label",null,[Kn(G("input",{"onUpdate:modelValue":V[7]||(V[7]=ae=>M.showShields=ae),type:"checkbox"},null,512),[[yr,M.showShields]]),V[24]||(V[24]=rs(" 显示护盾范围",-1))]),G("label",null,[Kn(G("input",{"onUpdate:modelValue":V[8]||(V[8]=ae=>M.showOccupants=ae),type:"checkbox"},null,512),[[yr,M.showOccupants]]),V[25]||(V[25]=rs(" 乘员",-1))]),G("label",null,[Kn(G("input",{"onUpdate:modelValue":V[9]||(V[9]=ae=>M.animate=ae),type:"checkbox"},null,512),[[yr,M.animate]]),V[26]||(V[26]=rs(" 动画",-1))]),G("label",null,[Kn(G("input",{"onUpdate:modelValue":V[10]||(V[10]=ae=>M.showBroken=ae),type:"checkbox"},null,512),[[yr,M.showBroken]]),V[27]||(V[27]=rs(" 损毁外观",-1))])])]),G("aside",ob,[G("div",ab,[V[28]||(V[28]=G("small",null,"INSPECTOR",-1)),G("h2",null,ot(We.value?.label??"属性编辑"),1)]),V[33]||(V[33]=G("p",{class:"muted"},"数值修改即时进入预览；位置也可在视口拖动三轴箭头。保存只写载具 XML。",-1)),We.value?(Ve(),qe("div",cb,[(Ve(!0),qe(Ut,null,zn(oe.value,ae=>(Ve(),qe("label",{key:`${ae.node.id}:${ae.attr}`},[G("span",null,[G("small",null,ot(ae.section)+ot(ae.inherited?" · 基础只读":""),1),rs(ot(ae.attr),1)]),G("input",{value:ae.value,disabled:!ae.sourceNode,onChange:Ke=>ce(ae,Ke)},null,40,ub),G("button",{class:"field-delete",disabled:!ae.sourceNode,title:`删除 ${ae.attr}`,onClick:Ke=>Mn(ae)},"×",8,hb)]))),128))])):(Ve(),qe("div",lb,"从场景对象中选择一项。")),We.value?.kind==="turret"?(Ve(),qe("section",fb,[G("header",null,[G("div",null,[V[29]||(V[29]=G("small",null,"WEAPON SHIELDS",-1)),G("b",null,ot(le.value?.name||st.value||"未引用武器"),1)]),Pe.value?(Ve(),qe("em",db,"未保存")):Gt("",!0)]),ve.value?(Ve(),qe("p",pb,ot(ve.value),1)):le.value?(Ve(),qe(Ut,{key:1},[G("p",{class:"weapon-path",title:le.value.path},ot(le.value.path),9,mb),Ue.value.length?Gt("",!0):(Ve(),qe("div",_b,"此武器没有 shield，可在下方增加。")),(Ve(!0),qe(Ut,null,zn(Ue.value,ae=>(Ve(),qe("article",{key:ae.node.id,class:"shield-card"},[G("div",null,[G("b",null,"shield "+ot(ae.index),1),G("button",{class:"field-delete",title:"删除此 shield",onClick:Ke=>Ye(ae.node)},"×",8,gb)]),G("label",null,[V[30]||(V[30]=G("span",null,"offset",-1)),G("input",{value:ae.offset,onChange:Ke=>Re(ae.node,"offset",Ke)},null,40,vb)]),G("label",null,[V[31]||(V[31]=G("span",null,"extent",-1)),G("input",{value:ae.extent,onChange:Ke=>Re(ae.node,"extent",Ke)},null,40,xb)])]))),128)),G("div",yb,[G("button",{onClick:Me},"增加 shield"),G("button",{onClick:me},"重新载入"),G("button",{class:"primary",disabled:!Pe.value,onClick:N},"保存武器护盾",8,Mb)])],64)):Gt("",!0)])):Gt("",!0),We.value?(Ve(),qe("div",Sb,[Kn(G("select",{"onUpdate:modelValue":V[11]||(V[11]=ae=>K.value=ae),disabled:!D.value||!W.value.length},[V[32]||(V[32]=G("option",{disabled:"",value:""},"选择可加入的数值类",-1)),(Ve(!0),qe(Ut,null,zn(W.value,ae=>(Ve(),qe("option",{key:ae,value:ae},ot(ae),9,bb))),128))],8,Eb),[[Wl,K.value]]),G("button",{disabled:!K.value||!D.value,onClick:Un},"加入新数值类",8,Tb)])):Gt("",!0),G("div",wb,[G("button",{disabled:!D.value,class:"danger",onClick:lt},"删除对象",8,Ab),G("button",{disabled:!D.value,onClick:je},"恢复本项",8,Rb),G("button",{disabled:!s.value,class:"primary",onClick:V[12]||(V[12]=ae=>Nn(!1))},"保存载具",8,Cb)])])]),G("footer",Pb,[G("span",null,ot(S.value),1),G("span",null,ot(i.value?.path??""),1)]),y.value?(Ve(),Vl(gE,{key:0,catalog:Rn(o),"support-model":A.value,"support-animations":R.value,onClose:V[13]||(V[13]=ae=>y.value=!1),onApply:he},null,8,["catalog","support-model","support-animations"])):Gt("",!0),C.value?(Ve(),Vl(SE,{key:1,catalog:Rn(o),onClose:V[14]||(V[14]=ae=>C.value=!1),onChanged:co},null,8,["catalog"])):Gt("",!0)]))}});G_(Db).mount("#app");

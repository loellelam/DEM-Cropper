(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function Il(){document.querySelectorAll(".tab").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".view").forEach(t=>t.classList.remove("active")),i.classList.add("active"),document.getElementById(i.dataset.view).classList.add("active")})})}function ra(i){document.querySelectorAll(".tab").forEach(n=>n.classList.remove("active")),document.querySelectorAll(".view").forEach(n=>n.classList.remove("active"));const t=document.querySelector(`.tab[data-view="${i}"]`),e=document.getElementById(i);t&&e&&(t.classList.add("active"),e.classList.add("active"))}function Ul(){document.querySelectorAll(".accordion-header").forEach(i=>{i.addEventListener("click",()=>{const t=i.nextElementSibling;t.classList.toggle("active"),document.querySelectorAll(".accordion-content").forEach(e=>{e!==t&&e.classList.remove("active")})})})}const Qt=L.map("map").setView([21,202],7),Nl=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});Nl.addTo(Qt);const Fl=new L.LayerGroup,Ir=new L.LayerGroup;let Bo=null,ko=null,zo=null,Ho=null;function Sr(){return Bo}function Go(i){Bo=i}function Ol(){return ko}function Bl(i){ko=i}function kl(){return zo}function zl(i){zo=i}function Hl(){return Ho}function Gl(i){Ho=i}function Vl(){const i=document.getElementById("customExaggerationBtn"),t=document.getElementById("verticalExaggerationSelect"),e=document.getElementById("verticalExaggerationInput");i.addEventListener("click",()=>{e.style.display==="none"?(e.style.display="",t.style.display="none",e.value=t.value,e.focus()):(e.style.display="none",t.style.display="")}),t.addEventListener("change",()=>{e.value=t.value})}function Wl(){const i=document.getElementById("verticalExaggerationSelect"),t=document.getElementById("verticalExaggerationInput");return t.style.display!=="none"?parseFloat(t.value):parseFloat(i.value)}function Xl(i,t){const e=i.width,n=i.height,r=t.getBounds(),s=i.xmin,o=i.ymax,a=i.xmax,l=i.ymin;let h=Array.from({length:n},()=>Array(e).fill(0));function u(m,c){if(m===void 0||c===void 0)return console.error("Invalid lat/lng:",{lat:m,lng:c}),{x:NaN,y:NaN};const x=Math.floor((c-s)/(a-s)*e),M=Math.floor((o-m)/(o-l)*n);return{x:Math.max(0,Math.min(e-1,x)),y:Math.max(0,Math.min(n-1,M))}}let f=[];if(t instanceof L.Circle){const m=t.getLatLng(),c=t.getRadius(),x=64,M=[];for(let E=0;E<x;E++){const A=E/x*2*Math.PI,I=m.lat+c/111320*Math.cos(A),R=m.lng+c/(111320*Math.cos(m.lat*Math.PI/180))*Math.sin(A);M.push({lat:I,lng:R})}f.push(M.map(E=>u(E.lat,E.lng)))}else if(t.getLatLngs){const m=t.getLatLngs();m.length>1?m.forEach(c=>{c.forEach(x=>{const M=x.map(E=>u(E.lat,E.lng));f.push(M)})}):f.push(m[0].map(c=>u(c.lat,c.lng)))}else return console.error("Unsupported shape type:",t),null;function p(m,c,x){let M=!1,E=x.length-1;for(let A=0;A<x.length;A++){let I=x[A].x,R=x[A].y,N=x[E].x,b=x[E].y;R>c!=b>c&&m<(N-I)*(c-R)/(b-R)+I&&(M=!M),E=A}return M}const d=u(r.getNorth(),r.getWest()),v=u(r.getSouth(),r.getEast());for(let m=0;m<f.length;m++)for(let c=d.y;c<=v.y;c++)for(let x=d.x;x<=v.x;x++)p(x,c,f[m])&&(h[c][x]^=1);const _=[];for(let m=0;m<h.length;m++)for(let c=0;c<h[m].length;c++)_.push(h[m][c]);return _}async function ql(i,t,e,n,r){let s;return window.location.hostname==="localhost"?s="http://localhost:5000":s="https://loelle-dem-cropper.cis230038.projects.jetstream-cloud.org",await(await fetch(`${s}/api/process`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({maskedElevation2D:i,physicalWidth:t,physicalHeight:e,bedWidth:n,bedHeight:r})})).json()}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sa="173",oi={ROTATE:0,DOLLY:1,PAN:2},si={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yl=0,ba=1,jl=2,Vo=1,Zl=2,ln=3,En=0,Ae=1,$e=2,Sn=0,li=1,Ta=2,wa=3,Aa=4,Kl=5,Nn=100,$l=101,Jl=102,Ql=103,tc=104,ec=200,nc=201,ic=202,rc=203,_s=204,gs=205,sc=206,ac=207,oc=208,lc=209,cc=210,hc=211,uc=212,dc=213,fc=214,vs=0,xs=1,ys=2,ui=3,Ss=4,Ms=5,Es=6,bs=7,Wo=0,pc=1,mc=2,Mn=0,_c=1,gc=2,vc=3,xc=4,yc=5,Sc=6,Mc=7,Xo=300,di=301,fi=302,Ts=303,ws=304,Ar=306,As=1e3,On=1001,Rs=1002,Ye=1003,Ec=1004,Fi=1005,Je=1006,Ur=1007,Bn=1008,fn=1009,qo=1010,Yo=1011,Pi=1012,aa=1013,kn=1014,hn=1015,Li=1016,oa=1017,la=1018,pi=1020,jo=35902,Zo=1021,Ko=1022,qe=1023,$o=1024,Jo=1025,ci=1026,mi=1027,Qo=1028,ca=1029,tl=1030,ha=1031,ua=1033,ur=33776,dr=33777,fr=33778,pr=33779,Cs=35840,Ps=35841,Ls=35842,Ds=35843,Is=36196,Us=37492,Ns=37496,Fs=37808,Os=37809,Bs=37810,ks=37811,zs=37812,Hs=37813,Gs=37814,Vs=37815,Ws=37816,Xs=37817,qs=37818,Ys=37819,js=37820,Zs=37821,mr=36492,Ks=36494,$s=36495,el=36283,Js=36284,Qs=36285,ta=36286,bc=3200,Tc=3201,nl=0,wc=1,yn="",Fe="srgb",_i="srgb-linear",Mr="linear",ne="srgb",Wn=7680,Ra=519,Ac=512,Rc=513,Cc=514,il=515,Pc=516,Lc=517,Dc=518,Ic=519,Ca=35044,Pa="300 es",un=2e3,Er=2001;class Gn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_r=Math.PI/180,ea=180/Math.PI;function Di(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ye[i&255]+ye[i>>8&255]+ye[i>>16&255]+ye[i>>24&255]+"-"+ye[t&255]+ye[t>>8&255]+"-"+ye[t>>16&15|64]+ye[t>>24&255]+"-"+ye[e&63|128]+ye[e>>8&255]+"-"+ye[e>>16&255]+ye[e>>24&255]+ye[n&255]+ye[n>>8&255]+ye[n>>16&255]+ye[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function Uc(i,t){return(i%t+t)%t}function Nr(i,t,e){return(1-e)*i+e*t}function Si(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Te(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Nc={DEG2RAD:_r};class Gt{constructor(t=0,e=0){Gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ht{constructor(t,e,n,r,s,o,a,l,h){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,h)}set(t,e,n,r,s,o,a,l,h){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],h=n[1],u=n[4],f=n[7],p=n[2],d=n[5],v=n[8],_=r[0],m=r[3],c=r[6],x=r[1],M=r[4],E=r[7],A=r[2],I=r[5],R=r[8];return s[0]=o*_+a*x+l*A,s[3]=o*m+a*M+l*I,s[6]=o*c+a*E+l*R,s[1]=h*_+u*x+f*A,s[4]=h*m+u*M+f*I,s[7]=h*c+u*E+f*R,s[2]=p*_+d*x+v*A,s[5]=p*m+d*M+v*I,s[8]=p*c+d*E+v*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],h=t[7],u=t[8];return e*o*u-e*a*h-n*s*u+n*a*l+r*s*h-r*o*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],h=t[7],u=t[8],f=u*o-a*h,p=a*l-u*s,d=h*s-o*l,v=e*f+n*p+r*d;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return t[0]=f*_,t[1]=(r*h-u*n)*_,t[2]=(a*n-r*o)*_,t[3]=p*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(n*l-h*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const l=Math.cos(s),h=Math.sin(s);return this.set(n*l,n*h,-n*(l*o+h*a)+o+t,-r*h,r*l,-r*(-h*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Fr.makeScale(t,e)),this}rotate(t){return this.premultiply(Fr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fr=new Ht;function rl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Fc(){const i=br("canvas");return i.style.display="block",i}const La={};function ri(i){i in La||(La[i]=!0,console.warn(i))}function Oc(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Bc(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function kc(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Da=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ia=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zc(){const i={enabled:!0,workingColorSpace:_i,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ne&&(r.r=dn(r.r),r.g=dn(r.g),r.b=dn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ne&&(r.r=hi(r.r),r.g=hi(r.g),r.b=hi(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===yn?Mr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[_i]:{primaries:t,whitePoint:n,transfer:Mr,toXYZ:Da,fromXYZ:Ia,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:n,transfer:ne,toXYZ:Da,fromXYZ:Ia,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),i}const Kt=zc();function dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Xn;class Hc{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Xn===void 0&&(Xn=br("canvas")),Xn.width=t.width,Xn.height=t.height;const n=Xn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Xn}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=br("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=dn(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(dn(e[n]/255)*255):e[n]=dn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Gc=0;class sl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gc++}),this.uuid=Di(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Or(r[o].image)):s.push(Or(r[o]))}else s=Or(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Or(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vc=0;class Re extends Gn{constructor(t=Re.DEFAULT_IMAGE,e=Re.DEFAULT_MAPPING,n=On,r=On,s=Je,o=Bn,a=qe,l=fn,h=Re.DEFAULT_ANISOTROPY,u=yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vc++}),this.uuid=Di(),this.name="",this.source=new sl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case As:t.x=t.x-Math.floor(t.x);break;case On:t.x=t.x<0?0:1;break;case Rs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case As:t.y=t.y-Math.floor(t.y);break;case On:t.y=t.y<0?0:1;break;case Rs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Re.DEFAULT_IMAGE=null;Re.DEFAULT_MAPPING=Xo;Re.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,n=0,r=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,h=l[0],u=l[4],f=l[8],p=l[1],d=l[5],v=l[9],_=l[2],m=l[6],c=l[10];if(Math.abs(u-p)<.01&&Math.abs(f-_)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(f+_)<.1&&Math.abs(v+m)<.1&&Math.abs(h+d+c-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(h+1)/2,E=(d+1)/2,A=(c+1)/2,I=(u+p)/4,R=(f+_)/4,N=(v+m)/4;return M>E&&M>A?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=I/n,s=R/n):E>A?E<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),n=I/r,s=N/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=R/s,r=N/s),this.set(n,r,s,e),this}let x=Math.sqrt((m-v)*(m-v)+(f-_)*(f-_)+(p-u)*(p-u));return Math.abs(x)<.001&&(x=1),this.x=(m-v)/x,this.y=(f-_)/x,this.z=(p-u)/x,this.w=Math.acos((h+d+c-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wc extends Gn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Re(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const e=Object.assign({},t.texture.image);return this.texture.source=new sl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zn extends Wc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class al extends Re{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xc extends Re{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hn{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let l=n[r+0],h=n[r+1],u=n[r+2],f=n[r+3];const p=s[o+0],d=s[o+1],v=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=h,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=p,t[e+1]=d,t[e+2]=v,t[e+3]=_;return}if(f!==_||l!==p||h!==d||u!==v){let m=1-a;const c=l*p+h*d+u*v+f*_,x=c>=0?1:-1,M=1-c*c;if(M>Number.EPSILON){const A=Math.sqrt(M),I=Math.atan2(A,c*x);m=Math.sin(m*I)/A,a=Math.sin(a*I)/A}const E=a*x;if(l=l*m+p*E,h=h*m+d*E,u=u*m+v*E,f=f*m+_*E,m===1-a){const A=1/Math.sqrt(l*l+h*h+u*u+f*f);l*=A,h*=A,u*=A,f*=A}}t[e]=l,t[e+1]=h,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],l=n[r+1],h=n[r+2],u=n[r+3],f=s[o],p=s[o+1],d=s[o+2],v=s[o+3];return t[e]=a*v+u*f+l*d-h*p,t[e+1]=l*v+u*p+h*f-a*d,t[e+2]=h*v+u*d+a*p-l*f,t[e+3]=u*v-a*f-l*p-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,h=a(n/2),u=a(r/2),f=a(s/2),p=l(n/2),d=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=p*u*f+h*d*v,this._y=h*d*f-p*u*v,this._z=h*u*v+p*d*f,this._w=h*u*f-p*d*v;break;case"YXZ":this._x=p*u*f+h*d*v,this._y=h*d*f-p*u*v,this._z=h*u*v-p*d*f,this._w=h*u*f+p*d*v;break;case"ZXY":this._x=p*u*f-h*d*v,this._y=h*d*f+p*u*v,this._z=h*u*v+p*d*f,this._w=h*u*f-p*d*v;break;case"ZYX":this._x=p*u*f-h*d*v,this._y=h*d*f+p*u*v,this._z=h*u*v-p*d*f,this._w=h*u*f+p*d*v;break;case"YZX":this._x=p*u*f+h*d*v,this._y=h*d*f+p*u*v,this._z=h*u*v-p*d*f,this._w=h*u*f-p*d*v;break;case"XZY":this._x=p*u*f-h*d*v,this._y=h*d*f-p*u*v,this._z=h*u*v+p*d*f,this._w=h*u*f+p*d*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],h=e[2],u=e[6],f=e[10],p=n+a+f;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-h)*d,this._z=(o-r)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+h)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(s-h)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-r)/d,this._x=(s+h)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,h=e._z,u=e._w;return this._x=n*u+o*a+r*h-s*l,this._y=r*u+o*l+s*a-n*h,this._z=s*u+o*h+n*l-r*a,this._w=o*u-n*a-r*l-s*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const h=Math.sqrt(l),u=Math.atan2(h,a),f=Math.sin((1-e)*u)/h,p=Math.sin(e*u)/h;return this._w=o*f+this._w*p,this._x=n*f+this._x*p,this._y=r*f+this._y*p,this._z=s*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,n=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ua.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ua.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,h=2*(o*r-a*n),u=2*(a*e-s*r),f=2*(s*n-o*e);return this.x=e+l*h+o*f-a*u,this.y=n+l*u+a*h-s*f,this.z=r+l*f+s*u-o*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Br.copy(this).projectOnVector(t),this.sub(Br)}reflect(t){return this.sub(Br.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Br=new z,Ua=new Hn;class bn{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(He.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(He.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=He.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,He):He.fromBufferAttribute(s,o),He.applyMatrix4(t.matrixWorld),this.expandByPoint(He);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Oi.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Oi.copy(n.boundingBox)),Oi.applyMatrix4(t.matrixWorld),this.union(Oi)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,He),He.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Mi),Bi.subVectors(this.max,Mi),qn.subVectors(t.a,Mi),Yn.subVectors(t.b,Mi),jn.subVectors(t.c,Mi),pn.subVectors(Yn,qn),mn.subVectors(jn,Yn),Rn.subVectors(qn,jn);let e=[0,-pn.z,pn.y,0,-mn.z,mn.y,0,-Rn.z,Rn.y,pn.z,0,-pn.x,mn.z,0,-mn.x,Rn.z,0,-Rn.x,-pn.y,pn.x,0,-mn.y,mn.x,0,-Rn.y,Rn.x,0];return!kr(e,qn,Yn,jn,Bi)||(e=[1,0,0,0,1,0,0,0,1],!kr(e,qn,Yn,jn,Bi))?!1:(ki.crossVectors(pn,mn),e=[ki.x,ki.y,ki.z],kr(e,qn,Yn,jn,Bi))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,He).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(He).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const nn=[new z,new z,new z,new z,new z,new z,new z,new z],He=new z,Oi=new bn,qn=new z,Yn=new z,jn=new z,pn=new z,mn=new z,Rn=new z,Mi=new z,Bi=new z,ki=new z,Cn=new z;function kr(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Cn.fromArray(i,s);const a=r.x*Math.abs(Cn.x)+r.y*Math.abs(Cn.y)+r.z*Math.abs(Cn.z),l=t.dot(Cn),h=e.dot(Cn),u=n.dot(Cn);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>a)return!1}return!0}const qc=new bn,Ei=new z,zr=new z;class Rr{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):qc.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ei.subVectors(t,this.center);const e=Ei.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Ei,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(zr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ei.copy(t.center).add(zr)),this.expandByPoint(Ei.copy(t.center).sub(zr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const rn=new z,Hr=new z,zi=new z,_n=new z,Gr=new z,Hi=new z,Vr=new z;class da{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(rn.copy(this.origin).addScaledVector(this.direction,e),rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Hr.copy(t).add(e).multiplyScalar(.5),zi.copy(e).sub(t).normalize(),_n.copy(this.origin).sub(Hr);const s=t.distanceTo(e)*.5,o=-this.direction.dot(zi),a=_n.dot(this.direction),l=-_n.dot(zi),h=_n.lengthSq(),u=Math.abs(1-o*o);let f,p,d,v;if(u>0)if(f=o*l-a,p=o*a-l,v=s*u,f>=0)if(p>=-v)if(p<=v){const _=1/u;f*=_,p*=_,d=f*(f+o*p+2*a)+p*(o*f+p+2*l)+h}else p=s,f=Math.max(0,-(o*p+a)),d=-f*f+p*(p+2*l)+h;else p=-s,f=Math.max(0,-(o*p+a)),d=-f*f+p*(p+2*l)+h;else p<=-v?(f=Math.max(0,-(-o*s+a)),p=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+p*(p+2*l)+h):p<=v?(f=0,p=Math.min(Math.max(-s,-l),s),d=p*(p+2*l)+h):(f=Math.max(0,-(o*s+a)),p=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+p*(p+2*l)+h);else p=o>0?-s:s,f=Math.max(0,-(o*p+a)),d=-f*f+p*(p+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Hr).addScaledVector(zi,p),d}intersectSphere(t,e){rn.subVectors(t.center,this.origin);const n=rn.dot(this.direction),r=rn.dot(rn)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,l;const h=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,p=this.origin;return h>=0?(n=(t.min.x-p.x)*h,r=(t.max.x-p.x)*h):(n=(t.max.x-p.x)*h,r=(t.min.x-p.x)*h),u>=0?(s=(t.min.y-p.y)*u,o=(t.max.y-p.y)*u):(s=(t.max.y-p.y)*u,o=(t.min.y-p.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-p.z)*f,l=(t.max.z-p.z)*f):(a=(t.max.z-p.z)*f,l=(t.min.z-p.z)*f),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,rn)!==null}intersectTriangle(t,e,n,r,s){Gr.subVectors(e,t),Hi.subVectors(n,t),Vr.crossVectors(Gr,Hi);let o=this.direction.dot(Vr),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;_n.subVectors(this.origin,t);const l=a*this.direction.dot(Hi.crossVectors(_n,Hi));if(l<0)return null;const h=a*this.direction.dot(Gr.cross(_n));if(h<0||l+h>o)return null;const u=-a*_n.dot(Vr);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,n,r,s,o,a,l,h,u,f,p,d,v,_,m){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,h,u,f,p,d,v,_,m)}set(t,e,n,r,s,o,a,l,h,u,f,p,d,v,_,m){const c=this.elements;return c[0]=t,c[4]=e,c[8]=n,c[12]=r,c[1]=s,c[5]=o,c[9]=a,c[13]=l,c[2]=h,c[6]=u,c[10]=f,c[14]=p,c[3]=d,c[7]=v,c[11]=_,c[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Zn.setFromMatrixColumn(t,0).length(),s=1/Zn.setFromMatrixColumn(t,1).length(),o=1/Zn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),h=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const p=o*u,d=o*f,v=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=h,e[1]=d+v*h,e[5]=p-_*h,e[9]=-a*l,e[2]=_-p*h,e[6]=v+d*h,e[10]=o*l}else if(t.order==="YXZ"){const p=l*u,d=l*f,v=h*u,_=h*f;e[0]=p+_*a,e[4]=v*a-d,e[8]=o*h,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-v,e[6]=_+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*u,d=l*f,v=h*u,_=h*f;e[0]=p-_*a,e[4]=-o*f,e[8]=v+d*a,e[1]=d+v*a,e[5]=o*u,e[9]=_-p*a,e[2]=-o*h,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*u,d=o*f,v=a*u,_=a*f;e[0]=l*u,e[4]=v*h-d,e[8]=p*h+_,e[1]=l*f,e[5]=_*h+p,e[9]=d*h-v,e[2]=-h,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,d=o*h,v=a*l,_=a*h;e[0]=l*u,e[4]=_-p*f,e[8]=v*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-h*u,e[6]=d*f+v,e[10]=p-_*f}else if(t.order==="XZY"){const p=o*l,d=o*h,v=a*l,_=a*h;e[0]=l*u,e[4]=-f,e[8]=h*u,e[1]=p*f+_,e[5]=o*u,e[9]=d*f-v,e[2]=v*f-d,e[6]=a*u,e[10]=_*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yc,t,jc)}lookAt(t,e,n){const r=this.elements;return Pe.subVectors(t,e),Pe.lengthSq()===0&&(Pe.z=1),Pe.normalize(),gn.crossVectors(n,Pe),gn.lengthSq()===0&&(Math.abs(n.z)===1?Pe.x+=1e-4:Pe.z+=1e-4,Pe.normalize(),gn.crossVectors(n,Pe)),gn.normalize(),Gi.crossVectors(Pe,gn),r[0]=gn.x,r[4]=Gi.x,r[8]=Pe.x,r[1]=gn.y,r[5]=Gi.y,r[9]=Pe.y,r[2]=gn.z,r[6]=Gi.z,r[10]=Pe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],h=n[12],u=n[1],f=n[5],p=n[9],d=n[13],v=n[2],_=n[6],m=n[10],c=n[14],x=n[3],M=n[7],E=n[11],A=n[15],I=r[0],R=r[4],N=r[8],b=r[12],T=r[1],O=r[5],C=r[9],F=r[13],S=r[2],k=r[6],it=r[10],G=r[14],Q=r[3],tt=r[7],ct=r[11],V=r[15];return s[0]=o*I+a*T+l*S+h*Q,s[4]=o*R+a*O+l*k+h*tt,s[8]=o*N+a*C+l*it+h*ct,s[12]=o*b+a*F+l*G+h*V,s[1]=u*I+f*T+p*S+d*Q,s[5]=u*R+f*O+p*k+d*tt,s[9]=u*N+f*C+p*it+d*ct,s[13]=u*b+f*F+p*G+d*V,s[2]=v*I+_*T+m*S+c*Q,s[6]=v*R+_*O+m*k+c*tt,s[10]=v*N+_*C+m*it+c*ct,s[14]=v*b+_*F+m*G+c*V,s[3]=x*I+M*T+E*S+A*Q,s[7]=x*R+M*O+E*k+A*tt,s[11]=x*N+M*C+E*it+A*ct,s[15]=x*b+M*F+E*G+A*V,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],h=t[13],u=t[2],f=t[6],p=t[10],d=t[14],v=t[3],_=t[7],m=t[11],c=t[15];return v*(+s*l*f-r*h*f-s*a*p+n*h*p+r*a*d-n*l*d)+_*(+e*l*d-e*h*p+s*o*p-r*o*d+r*h*u-s*l*u)+m*(+e*h*f-e*a*d-s*o*f+n*o*d+s*a*u-n*h*u)+c*(-r*a*u-e*l*f+e*a*p+r*o*f-n*o*p+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],h=t[7],u=t[8],f=t[9],p=t[10],d=t[11],v=t[12],_=t[13],m=t[14],c=t[15],x=f*m*h-_*p*h+_*l*d-a*m*d-f*l*c+a*p*c,M=v*p*h-u*m*h-v*l*d+o*m*d+u*l*c-o*p*c,E=u*_*h-v*f*h+v*a*d-o*_*d-u*a*c+o*f*c,A=v*f*l-u*_*l-v*a*p+o*_*p+u*a*m-o*f*m,I=e*x+n*M+r*E+s*A;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/I;return t[0]=x*R,t[1]=(_*p*s-f*m*s-_*r*d+n*m*d+f*r*c-n*p*c)*R,t[2]=(a*m*s-_*l*s+_*r*h-n*m*h-a*r*c+n*l*c)*R,t[3]=(f*l*s-a*p*s-f*r*h+n*p*h+a*r*d-n*l*d)*R,t[4]=M*R,t[5]=(u*m*s-v*p*s+v*r*d-e*m*d-u*r*c+e*p*c)*R,t[6]=(v*l*s-o*m*s-v*r*h+e*m*h+o*r*c-e*l*c)*R,t[7]=(o*p*s-u*l*s+u*r*h-e*p*h-o*r*d+e*l*d)*R,t[8]=E*R,t[9]=(v*f*s-u*_*s-v*n*d+e*_*d+u*n*c-e*f*c)*R,t[10]=(o*_*s-v*a*s+v*n*h-e*_*h-o*n*c+e*a*c)*R,t[11]=(u*a*s-o*f*s-u*n*h+e*f*h+o*n*d-e*a*d)*R,t[12]=A*R,t[13]=(u*_*r-v*f*r+v*n*p-e*_*p-u*n*m+e*f*m)*R,t[14]=(v*a*r-o*_*r-v*n*l+e*_*l+o*n*m-e*a*m)*R,t[15]=(o*f*r-u*a*r+u*n*l-e*f*l-o*n*p+e*a*p)*R,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,h=s*o,u=s*a;return this.set(h*o+n,h*a-r*l,h*l+r*a,0,h*a+r*l,u*a+n,u*l-r*o,0,h*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,h=s+s,u=o+o,f=a+a,p=s*h,d=s*u,v=s*f,_=o*u,m=o*f,c=a*f,x=l*h,M=l*u,E=l*f,A=n.x,I=n.y,R=n.z;return r[0]=(1-(_+c))*A,r[1]=(d+E)*A,r[2]=(v-M)*A,r[3]=0,r[4]=(d-E)*I,r[5]=(1-(p+c))*I,r[6]=(m+x)*I,r[7]=0,r[8]=(v+M)*R,r[9]=(m-x)*R,r[10]=(1-(p+_))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=Zn.set(r[0],r[1],r[2]).length();const o=Zn.set(r[4],r[5],r[6]).length(),a=Zn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Ge.copy(this);const h=1/s,u=1/o,f=1/a;return Ge.elements[0]*=h,Ge.elements[1]*=h,Ge.elements[2]*=h,Ge.elements[4]*=u,Ge.elements[5]*=u,Ge.elements[6]*=u,Ge.elements[8]*=f,Ge.elements[9]*=f,Ge.elements[10]*=f,e.setFromRotationMatrix(Ge),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=un){const l=this.elements,h=2*s/(e-t),u=2*s/(n-r),f=(e+t)/(e-t),p=(n+r)/(n-r);let d,v;if(a===un)d=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Er)d=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=un){const l=this.elements,h=1/(e-t),u=1/(n-r),f=1/(o-s),p=(e+t)*h,d=(n+r)*u;let v,_;if(a===un)v=(o+s)*f,_=-2*f;else if(a===Er)v=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Zn=new z,Ge=new ae,Yc=new z(0,0,0),jc=new z(1,1,1),gn=new z,Gi=new z,Pe=new z,Na=new ae,Fa=new Hn;class tn{constructor(t=0,e=0,n=0,r=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],h=r[5],u=r[9],f=r[2],p=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,h),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Na.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Na,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fa.setFromEuler(this),this.setFromQuaternion(Fa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class ol{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Zc=0;const Oa=new z,Kn=new Hn,sn=new ae,Vi=new z,bi=new z,Kc=new z,$c=new Hn,Ba=new z(1,0,0),ka=new z(0,1,0),za=new z(0,0,1),Ha={type:"added"},Jc={type:"removed"},$n={type:"childadded",child:null},Wr={type:"childremoved",child:null};class ve extends Gn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zc++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new z,e=new tn,n=new Hn,r=new z(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ae},normalMatrix:{value:new Ht}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ol,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Kn.setFromAxisAngle(t,e),this.quaternion.multiply(Kn),this}rotateOnWorldAxis(t,e){return Kn.setFromAxisAngle(t,e),this.quaternion.premultiply(Kn),this}rotateX(t){return this.rotateOnAxis(Ba,t)}rotateY(t){return this.rotateOnAxis(ka,t)}rotateZ(t){return this.rotateOnAxis(za,t)}translateOnAxis(t,e){return Oa.copy(t).applyQuaternion(this.quaternion),this.position.add(Oa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ba,t)}translateY(t){return this.translateOnAxis(ka,t)}translateZ(t){return this.translateOnAxis(za,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(sn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Vi.copy(t):Vi.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sn.lookAt(bi,Vi,this.up):sn.lookAt(Vi,bi,this.up),this.quaternion.setFromRotationMatrix(sn),r&&(sn.extractRotation(r.matrixWorld),Kn.setFromRotationMatrix(sn),this.quaternion.premultiply(Kn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ha),$n.child=t,this.dispatchEvent($n),$n.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Jc),Wr.child=t,this.dispatchEvent(Wr),Wr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ha),$n.child=t,this.dispatchEvent($n),$n.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,t,Kc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,$c,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){const f=l[h];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,h=this.material.length;l<h;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),h=o(t.textures),u=o(t.images),f=o(t.shapes),p=o(t.skeletons),d=o(t.animations),v=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),v.length>0&&(n.nodes=v)}return n.object=r,n;function o(a){const l=[];for(const h in a){const u=a[h];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}ve.DEFAULT_UP=new z(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ve=new z,an=new z,Xr=new z,on=new z,Jn=new z,Qn=new z,Ga=new z,qr=new z,Yr=new z,jr=new z,Zr=new ce,Kr=new ce,$r=new ce;class Be{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Ve.subVectors(t,e),r.cross(Ve);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Ve.subVectors(r,e),an.subVectors(n,e),Xr.subVectors(t,e);const o=Ve.dot(Ve),a=Ve.dot(an),l=Ve.dot(Xr),h=an.dot(an),u=an.dot(Xr),f=o*h-a*a;if(f===0)return s.set(0,0,0),null;const p=1/f,d=(h*l-a*u)*p,v=(o*u-a*l)*p;return s.set(1-d-v,v,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(t,e,n,r,s,o,a,l){return this.getBarycoord(t,e,n,r,on)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,on.x),l.addScaledVector(o,on.y),l.addScaledVector(a,on.z),l)}static getInterpolatedAttribute(t,e,n,r,s,o){return Zr.setScalar(0),Kr.setScalar(0),$r.setScalar(0),Zr.fromBufferAttribute(t,e),Kr.fromBufferAttribute(t,n),$r.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Zr,s.x),o.addScaledVector(Kr,s.y),o.addScaledVector($r,s.z),o}static isFrontFacing(t,e,n,r){return Ve.subVectors(n,e),an.subVectors(t,e),Ve.cross(an).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ve.subVectors(this.c,this.b),an.subVectors(this.a,this.b),Ve.cross(an).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Be.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Be.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Be.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Be.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Be.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;Jn.subVectors(r,n),Qn.subVectors(s,n),qr.subVectors(t,n);const l=Jn.dot(qr),h=Qn.dot(qr);if(l<=0&&h<=0)return e.copy(n);Yr.subVectors(t,r);const u=Jn.dot(Yr),f=Qn.dot(Yr);if(u>=0&&f<=u)return e.copy(r);const p=l*f-u*h;if(p<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(Jn,o);jr.subVectors(t,s);const d=Jn.dot(jr),v=Qn.dot(jr);if(v>=0&&d<=v)return e.copy(s);const _=d*h-l*v;if(_<=0&&h>=0&&v<=0)return a=h/(h-v),e.copy(n).addScaledVector(Qn,a);const m=u*v-d*f;if(m<=0&&f-u>=0&&d-v>=0)return Ga.subVectors(s,r),a=(f-u)/(f-u+(d-v)),e.copy(r).addScaledVector(Ga,a);const c=1/(m+_+p);return o=_*c,a=p*c,e.copy(n).addScaledVector(Jn,o).addScaledVector(Qn,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ll={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vn={h:0,s:0,l:0},Wi={h:0,s:0,l:0};function Jr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Kt.workingColorSpace){if(t=Uc(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Jr(o,s,t+1/3),this.g=Jr(o,s,t),this.b=Jr(o,s,t-1/3)}return Kt.toWorkingColorSpace(this,r),this}setStyle(t,e=Fe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){const n=ll[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=dn(t.r),this.g=dn(t.g),this.b=dn(t.b),this}copyLinearToSRGB(t){return this.r=hi(t.r),this.g=hi(t.g),this.b=hi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return Kt.fromWorkingColorSpace(Se.copy(this),t),Math.round(Xt(Se.r*255,0,255))*65536+Math.round(Xt(Se.g*255,0,255))*256+Math.round(Xt(Se.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Se.copy(this),e);const n=Se.r,r=Se.g,s=Se.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,h;const u=(a+o)/2;if(a===o)l=0,h=0;else{const f=o-a;switch(h=u<=.5?f/(o+a):f/(2-o-a),o){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return t.h=l,t.s=h,t.l=u,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=Fe){Kt.fromWorkingColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,r=Se.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(vn),this.setHSL(vn.h+t,vn.s+e,vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(vn),t.getHSL(Wi);const n=Nr(vn.h,Wi.h,e),r=Nr(vn.s,Wi.s,e),s=Nr(vn.l,Wi.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new qt;qt.NAMES=ll;let Qc=0;class vi extends Gn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qc++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=li,this.side=En,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_s,this.blendDst=gs,this.blendEquation=Nn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=ui,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ra,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wn,this.stencilZFail=Wn,this.stencilZPass=Wn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==li&&(n.blending=this.blending),this.side!==En&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==_s&&(n.blendSrc=this.blendSrc),this.blendDst!==gs&&(n.blendDst=this.blendDst),this.blendEquation!==Nn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ui&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ra&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Wn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Wn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class cl extends vi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new z,Xi=new Gt;let th=0;class je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:th++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ca,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Xi.fromBufferAttribute(this,e),Xi.applyMatrix3(t),this.setXY(e,Xi.x,Xi.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Si(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Si(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Si(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Si(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Si(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),r=Te(r,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ca&&(t.usage=this.usage),t}}class hl extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ul extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class De extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let eh=0;const Ne=new ae,Qr=new ve,ti=new z,Le=new bn,Ti=new bn,_e=new z;class Ze extends Gn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rl(t)?ul:hl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ht().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ne.makeRotationFromQuaternion(t),this.applyMatrix4(Ne),this}rotateX(t){return Ne.makeRotationX(t),this.applyMatrix4(Ne),this}rotateY(t){return Ne.makeRotationY(t),this.applyMatrix4(Ne),this}rotateZ(t){return Ne.makeRotationZ(t),this.applyMatrix4(Ne),this}translate(t,e,n){return Ne.makeTranslation(t,e,n),this.applyMatrix4(Ne),this}scale(t,e,n){return Ne.makeScale(t,e,n),this.applyMatrix4(Ne),this}lookAt(t){return Qr.lookAt(t),Qr.updateMatrix(),this.applyMatrix4(Qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ti).negate(),this.translate(ti.x,ti.y,ti.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new De(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Le.setFromBufferAttribute(s),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,Le.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,Le.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(Le.min),this.boundingBox.expandByPoint(Le.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(Le.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Ti.setFromBufferAttribute(a),this.morphTargetsRelative?(_e.addVectors(Le.min,Ti.min),Le.expandByPoint(_e),_e.addVectors(Le.max,Ti.max),Le.expandByPoint(_e)):(Le.expandByPoint(Ti.min),Le.expandByPoint(Ti.max))}Le.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)_e.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(_e));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let h=0,u=a.count;h<u;h++)_e.fromBufferAttribute(a,h),l&&(ti.fromBufferAttribute(t,h),_e.add(ti)),r=Math.max(r,n.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<n.count;N++)a[N]=new z,l[N]=new z;const h=new z,u=new z,f=new z,p=new Gt,d=new Gt,v=new Gt,_=new z,m=new z;function c(N,b,T){h.fromBufferAttribute(n,N),u.fromBufferAttribute(n,b),f.fromBufferAttribute(n,T),p.fromBufferAttribute(s,N),d.fromBufferAttribute(s,b),v.fromBufferAttribute(s,T),u.sub(h),f.sub(h),d.sub(p),v.sub(p);const O=1/(d.x*v.y-v.x*d.y);isFinite(O)&&(_.copy(u).multiplyScalar(v.y).addScaledVector(f,-d.y).multiplyScalar(O),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-v.x).multiplyScalar(O),a[N].add(_),a[b].add(_),a[T].add(_),l[N].add(m),l[b].add(m),l[T].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let N=0,b=x.length;N<b;++N){const T=x[N],O=T.start,C=T.count;for(let F=O,S=O+C;F<S;F+=3)c(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const M=new z,E=new z,A=new z,I=new z;function R(N){A.fromBufferAttribute(r,N),I.copy(A);const b=a[N];M.copy(b),M.sub(A.multiplyScalar(A.dot(b))).normalize(),E.crossVectors(I,b);const O=E.dot(l[N])<0?-1:1;o.setXYZW(N,M.x,M.y,M.z,O)}for(let N=0,b=x.length;N<b;++N){const T=x[N],O=T.start,C=T.count;for(let F=O,S=O+C;F<S;F+=3)R(t.getX(F+0)),R(t.getX(F+1)),R(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);const r=new z,s=new z,o=new z,a=new z,l=new z,h=new z,u=new z,f=new z;if(t)for(let p=0,d=t.count;p<d;p+=3){const v=t.getX(p+0),_=t.getX(p+1),m=t.getX(p+2);r.fromBufferAttribute(e,v),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,v),l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,m),a.add(u),l.add(u),h.add(u),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let p=0,d=e.count;p<d;p+=3)r.fromBufferAttribute(e,p+0),s.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(a,l){const h=a.array,u=a.itemSize,f=a.normalized,p=new h.constructor(l.length*u);let d=0,v=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let c=0;c<u;c++)p[v++]=h[d++]}return new je(p,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ze,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],h=t(l,n);e.setAttribute(a,h)}const s=this.morphAttributes;for(const a in s){const l=[],h=s[a];for(let u=0,f=h.length;u<f;u++){const p=h[u],d=t(p,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const h=o[a];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],u=[];for(let f=0,p=h.length;f<p;f++){const d=h[f];u.push(d.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const h in r){const u=r[h];this.setAttribute(h,u.clone(e))}const s=t.morphAttributes;for(const h in s){const u=[],f=s[h];for(let p=0,d=f.length;p<d;p++)u.push(f[p].clone(e));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let h=0,u=o.length;h<u;h++){const f=o[h];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Va=new ae,Pn=new da,qi=new Rr,Wa=new z,Yi=new z,ji=new z,Zi=new z,ts=new z,Ki=new z,Xa=new z,$i=new z;class Qe extends ve{constructor(t=new Ze,e=new cl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Ki.set(0,0,0);for(let l=0,h=s.length;l<h;l++){const u=a[l],f=s[l];u!==0&&(ts.fromBufferAttribute(f,t),o?Ki.addScaledVector(ts,u):Ki.addScaledVector(ts.sub(e),u))}e.add(Ki)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qi.copy(n.boundingSphere),qi.applyMatrix4(s),Pn.copy(t.ray).recast(t.near),!(qi.containsPoint(Pn.origin)===!1&&(Pn.intersectSphere(qi,Wa)===null||Pn.origin.distanceToSquared(Wa)>(t.far-t.near)**2))&&(Va.copy(s).invert(),Pn.copy(t.ray).applyMatrix4(Va),!(n.boundingBox!==null&&Pn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pn)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,h=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,p=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,_=p.length;v<_;v++){const m=p[v],c=o[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let E=x,A=M;E<A;E+=3){const I=a.getX(E),R=a.getX(E+1),N=a.getX(E+2);r=Ji(this,c,t,n,h,u,f,I,R,N),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const v=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=v,c=_;m<c;m+=3){const x=a.getX(m),M=a.getX(m+1),E=a.getX(m+2);r=Ji(this,o,t,n,h,u,f,x,M,E),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,_=p.length;v<_;v++){const m=p[v],c=o[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let E=x,A=M;E<A;E+=3){const I=E,R=E+1,N=E+2;r=Ji(this,c,t,n,h,u,f,I,R,N),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const v=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=v,c=_;m<c;m+=3){const x=m,M=m+1,E=m+2;r=Ji(this,o,t,n,h,u,f,x,M,E),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function nh(i,t,e,n,r,s,o,a){let l;if(t.side===Ae?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,t.side===En,a),l===null)return null;$i.copy(a),$i.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo($i);return h<e.near||h>e.far?null:{distance:h,point:$i.clone(),object:i}}function Ji(i,t,e,n,r,s,o,a,l,h){i.getVertexPosition(a,Yi),i.getVertexPosition(l,ji),i.getVertexPosition(h,Zi);const u=nh(i,t,e,n,Yi,ji,Zi,Xa);if(u){const f=new z;Be.getBarycoord(Xa,Yi,ji,Zi,f),r&&(u.uv=Be.getInterpolatedAttribute(r,a,l,h,f,new Gt)),s&&(u.uv1=Be.getInterpolatedAttribute(s,a,l,h,f,new Gt)),o&&(u.normal=Be.getInterpolatedAttribute(o,a,l,h,f,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a,b:l,c:h,normal:new z,materialIndex:0};Be.getNormal(Yi,ji,Zi,p.normal),u.face=p,u.barycoord=f}return u}class Ii extends Ze{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],h=[],u=[],f=[];let p=0,d=0;v("z","y","x",-1,-1,n,e,t,o,s,0),v("z","y","x",1,-1,n,e,-t,o,s,1),v("x","z","y",1,1,t,n,e,r,o,2),v("x","z","y",1,-1,t,n,-e,r,o,3),v("x","y","z",1,-1,t,e,n,r,s,4),v("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new De(h,3)),this.setAttribute("normal",new De(u,3)),this.setAttribute("uv",new De(f,2));function v(_,m,c,x,M,E,A,I,R,N,b){const T=E/R,O=A/N,C=E/2,F=A/2,S=I/2,k=R+1,it=N+1;let G=0,Q=0;const tt=new z;for(let ct=0;ct<it;ct++){const V=ct*O-F;for(let q=0;q<k;q++){const gt=q*T-C;tt[_]=gt*x,tt[m]=V*M,tt[c]=S,h.push(tt.x,tt.y,tt.z),tt[_]=0,tt[m]=0,tt[c]=I>0?1:-1,u.push(tt.x,tt.y,tt.z),f.push(q/R),f.push(1-ct/N),G+=1}}for(let ct=0;ct<N;ct++)for(let V=0;V<R;V++){const q=p+V+k*ct,gt=p+V+k*(ct+1),Y=p+(V+1)+k*(ct+1),nt=p+(V+1)+k*ct;l.push(q,gt,nt),l.push(gt,Y,nt),Q+=6}a.addGroup(d,Q,b),d+=Q,p+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ii(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function gi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Ee(i){const t={};for(let e=0;e<i.length;e++){const n=gi(i[e]);for(const r in n)t[r]=n[r]}return t}function ih(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function dl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const rh={clone:gi,merge:Ee};var sh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ah=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tn extends vi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sh,this.fragmentShader=ah,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gi(t.uniforms),this.uniformsGroups=ih(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class fl extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=un}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xn=new z,qa=new Gt,Ya=new Gt;class Oe extends fl{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ea*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(_r*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ea*2*Math.atan(Math.tan(_r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(xn.x,xn.y).multiplyScalar(-t/xn.z),xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xn.x,xn.y).multiplyScalar(-t/xn.z)}getViewSize(t,e){return this.getViewBounds(t,qa,Ya),e.subVectors(Ya,qa)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(_r*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,h=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*n/h,r*=o.width/l,n*=o.height/h}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ei=-90,ni=1;class oh extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Oe(ei,ni,t,e);r.layers=this.layers,this.add(r);const s=new Oe(ei,ni,t,e);s.layers=this.layers,this.add(s);const o=new Oe(ei,ni,t,e);o.layers=this.layers,this.add(o);const a=new Oe(ei,ni,t,e);a.layers=this.layers,this.add(a);const l=new Oe(ei,ni,t,e);l.layers=this.layers,this.add(l);const h=new Oe(ei,ni,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,l]=e;for(const h of e)this.remove(h);if(t===un)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,h,u]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,h),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(f,p,d),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class pl extends Re{constructor(t,e,n,r,s,o,a,l,h,u){t=t!==void 0?t:[],e=e!==void 0?e:di,super(t,e,n,r,s,o,a,l,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class lh extends zn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new pl(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ii(5,5,5),s=new Tn({name:"CubemapFromEquirect",uniforms:gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ae,blending:Sn});s.uniforms.tEquirect.value=e;const o=new Qe(r,s),a=e.minFilter;return e.minFilter===Bn&&(e.minFilter=Je),new oh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}class Qi extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ch={type:"move"};class es{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),c=this._getHandJoint(h,_);m!==null&&(c.matrix.fromArray(m.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,c.jointRadius=m.radius),c.visible=m!==null}const u=h.joints["index-finger-tip"],f=h.joints["thumb-tip"],p=u.position.distanceTo(f.position),d=.02,v=.005;h.inputState.pinching&&p>d+v?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&p<=d-v&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ch)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Qi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class hh extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const ns=new z,uh=new z,dh=new Ht;class cn{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=ns.subVectors(n,e).cross(uh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ns),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||dh.getNormalMatrix(t),r=this.coplanarPoint(ns).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ln=new Rr,tr=new z;class fa{constructor(t=new cn,e=new cn,n=new cn,r=new cn,s=new cn,o=new cn){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=un){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],h=r[4],u=r[5],f=r[6],p=r[7],d=r[8],v=r[9],_=r[10],m=r[11],c=r[12],x=r[13],M=r[14],E=r[15];if(n[0].setComponents(l-s,p-h,m-d,E-c).normalize(),n[1].setComponents(l+s,p+h,m+d,E+c).normalize(),n[2].setComponents(l+o,p+u,m+v,E+x).normalize(),n[3].setComponents(l-o,p-u,m-v,E-x).normalize(),n[4].setComponents(l-a,p-f,m-_,E-M).normalize(),e===un)n[5].setComponents(l+a,p+f,m+_,E+M).normalize();else if(e===Er)n[5].setComponents(a,f,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ln.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ln.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ln)}intersectsSprite(t){return Ln.center.set(0,0,0),Ln.radius=.7071067811865476,Ln.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ln)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(tr.x=r.normal.x>0?t.max.x:t.min.x,tr.y=r.normal.y>0?t.max.y:t.min.y,tr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ml extends vi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Tr=new z,wr=new z,ja=new ae,wi=new da,er=new Rr,is=new z,Za=new z;class fh extends ve{constructor(t=new Ze,e=new ml){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)Tr.fromBufferAttribute(e,r-1),wr.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=Tr.distanceTo(wr);t.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(r),er.radius+=s,t.ray.intersectsSphere(er)===!1)return;ja.copy(r).invert(),wi.copy(t.ray).applyMatrix4(ja);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,h=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),v=Math.min(u.count,o.start+o.count);for(let _=d,m=v-1;_<m;_+=h){const c=u.getX(_),x=u.getX(_+1),M=nr(this,t,wi,l,c,x,_);M&&e.push(M)}if(this.isLineLoop){const _=u.getX(v-1),m=u.getX(d),c=nr(this,t,wi,l,_,m,v-1);c&&e.push(c)}}else{const d=Math.max(0,o.start),v=Math.min(p.count,o.start+o.count);for(let _=d,m=v-1;_<m;_+=h){const c=nr(this,t,wi,l,_,_+1,_);c&&e.push(c)}if(this.isLineLoop){const _=nr(this,t,wi,l,v-1,d,v-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function nr(i,t,e,n,r,s,o){const a=i.geometry.attributes.position;if(Tr.fromBufferAttribute(a,r),wr.fromBufferAttribute(a,s),e.distanceSqToSegment(Tr,wr,is,Za)>n)return;is.applyMatrix4(i.matrixWorld);const h=t.ray.origin.distanceTo(is);if(!(h<t.near||h>t.far))return{distance:h,point:Za.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Ka=new z,$a=new z;class ph extends fh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)Ka.fromBufferAttribute(e,r),$a.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ka.distanceTo($a);t.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _l extends Re{constructor(t,e,n,r,s,o,a,l,h,u=ci){if(u!==ci&&u!==mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ci&&(n=kn),n===void 0&&u===mi&&(n=pi),super(null,r,s,o,a,l,u,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ye,this.minFilter=l!==void 0?l:Ye,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Cr extends Ze{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(r),h=a+1,u=l+1,f=t/a,p=e/l,d=[],v=[],_=[],m=[];for(let c=0;c<u;c++){const x=c*p-o;for(let M=0;M<h;M++){const E=M*f-s;v.push(E,-x,0),_.push(0,0,1),m.push(M/a),m.push(1-c/l)}}for(let c=0;c<l;c++)for(let x=0;x<a;x++){const M=x+h*c,E=x+h*(c+1),A=x+1+h*(c+1),I=x+1+h*c;d.push(M,E,I),d.push(E,A,I)}this.setIndex(d),this.setAttribute("position",new De(v,3)),this.setAttribute("normal",new De(_,3)),this.setAttribute("uv",new De(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cr(t.width,t.height,t.widthSegments,t.heightSegments)}}class mh extends vi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nl,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _h extends vi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gh extends vi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class gl extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const rs=new ae,Ja=new z,Qa=new z;class vh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fa,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ja.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ja),Qa.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Qa),e.updateMatrixWorld(),rs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rs),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(rs)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class vl extends fl{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,o=s+h*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class xh extends vh{constructor(){super(new vl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yh extends gl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new xh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Sh extends gl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Mh extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}class to{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const eo=new z,ir=new z;class Eh{constructor(t=new z,e=new z){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){eo.subVectors(t,this.start),ir.subVectors(this.end,this.start);const n=ir.dot(ir);let s=ir.dot(eo)/n;return e&&(s=Xt(s,0,1)),s}closestPointToPoint(t,e,n){const r=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class bh extends ph{constructor(t=10,e=10,n=4473924,r=8947848){n=new qt(n),r=new qt(r);const s=e/2,o=t/e,a=t/2,l=[],h=[];for(let p=0,d=0,v=-a;p<=e;p++,v+=o){l.push(-a,0,v,a,0,v),l.push(v,0,-a,v,0,a);const _=p===s?n:r;_.toArray(h,d),d+=3,_.toArray(h,d),d+=3,_.toArray(h,d),d+=3,_.toArray(h,d),d+=3}const u=new Ze;u.setAttribute("position",new De(l,3)),u.setAttribute("color",new De(h,3));const f=new ml({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Th extends Gn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function no(i,t,e,n){const r=wh(n);switch(e){case Zo:return i*t;case $o:return i*t;case Jo:return i*t*2;case Qo:return i*t/r.components*r.byteLength;case ca:return i*t/r.components*r.byteLength;case tl:return i*t*2/r.components*r.byteLength;case ha:return i*t*2/r.components*r.byteLength;case Ko:return i*t*3/r.components*r.byteLength;case qe:return i*t*4/r.components*r.byteLength;case ua:return i*t*4/r.components*r.byteLength;case ur:case dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case fr:case pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ps:case Ds:return Math.max(i,16)*Math.max(t,8)/4;case Cs:case Ls:return Math.max(i,8)*Math.max(t,8)/2;case Is:case Us:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ns:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Os:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Bs:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ks:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case zs:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Hs:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Gs:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Vs:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ws:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Xs:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case qs:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ys:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case js:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Zs:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case mr:case Ks:case $s:return Math.ceil(i/4)*Math.ceil(t/4)*16;case el:case Js:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Qs:case ta:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wh(i){switch(i){case fn:case qo:return{byteLength:1,components:1};case Pi:case Yo:case Li:return{byteLength:2,components:1};case oa:case la:return{byteLength:2,components:4};case kn:case aa:case hn:return{byteLength:4,components:1};case jo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xl(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Ah(i){const t=new WeakMap;function e(a,l){const h=a.array,u=a.usage,f=h.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,h,u),a.onUploadCallback();let d;if(h instanceof Float32Array)d=i.FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=i.SHORT;else if(h instanceof Uint32Array)d=i.UNSIGNED_INT;else if(h instanceof Int32Array)d=i.INT;else if(h instanceof Int8Array)d=i.BYTE;else if(h instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,h){const u=l.array,f=l.updateRanges;if(i.bindBuffer(h,a),f.length===0)i.bufferSubData(h,0,u);else{f.sort((d,v)=>d.start-v.start);let p=0;for(let d=1;d<f.length;d++){const v=f[p],_=f[d];_.start<=v.start+v.count+1?v.count=Math.max(v.count,_.start+_.count-v.start):(++p,f[p]=_)}f.length=p+1;for(let d=0,v=f.length;d<v;d++){const _=f[d];i.bufferSubData(h,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const h=t.get(a);if(h===void 0)t.set(a,e(a,l));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,l),h.version=a.version}}return{get:r,remove:s,update:o}}var Rh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ch=`#ifdef USE_ALPHAHASH
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
#endif`,Ph=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ih=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Uh=`#ifdef USE_AOMAP
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
#endif`,Nh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fh=`#ifdef USE_BATCHING
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
#endif`,Oh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Hh=`#ifdef USE_IRIDESCENCE
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
#endif`,Gh=`#ifdef USE_BUMPMAP
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
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,$h=`#define PI 3.141592653589793
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
} // validated`,Jh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qh=`vec3 transformedNormal = objectNormal;
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
#endif`,tu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ru="gl_FragColor = linearToOutputTexel( gl_FragColor );",su=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,au=`#ifdef USE_ENVMAP
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
#endif`,ou=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lu=`#ifdef USE_ENVMAP
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
#endif`,cu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hu=`#ifdef USE_ENVMAP
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
#endif`,uu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,du=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mu=`#ifdef USE_GRADIENTMAP
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
}`,_u=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xu=`uniform bool receiveShadow;
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
#endif`,yu=`#ifdef USE_ENVMAP
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
#endif`,Su=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Eu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tu=`PhysicalMaterial material;
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
#endif`,wu=`struct PhysicalMaterial {
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
}`,Au=`
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
#endif`,Ru=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Du=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Iu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ou=`#if defined( USE_POINTS_UV )
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
#endif`,Bu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ku=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vu=`#ifdef USE_MORPHTARGETS
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
#endif`,Wu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Yu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ju=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ku=`#ifdef USE_NORMALMAP
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
#endif`,$u=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ju=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,td=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ed=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,id=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ad=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,od=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ld=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
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
#endif`,hd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ud=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dd=`float getShadowMask() {
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
}`,fd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pd=`#ifdef USE_SKINNING
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
#endif`,md=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_d=`#ifdef USE_SKINNING
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
#endif`,gd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sd=`#ifdef USE_TRANSMISSION
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
#endif`,Md=`#ifdef USE_TRANSMISSION
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
#endif`,Ed=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Td=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ad=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rd=`uniform sampler2D t2D;
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
}`,Cd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ld=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Id=`#include <common>
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
}`,Ud=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Nd=`#define DISTANCE
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
}`,Fd=`#define DISTANCE
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
}`,Od=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kd=`uniform float scale;
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
}`,zd=`uniform vec3 diffuse;
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
}`,Hd=`#include <common>
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
}`,Gd=`uniform vec3 diffuse;
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
}`,Vd=`#define LAMBERT
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
}`,Wd=`#define LAMBERT
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
}`,Xd=`#define MATCAP
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
}`,qd=`#define MATCAP
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
}`,Yd=`#define NORMAL
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
}`,jd=`#define NORMAL
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
}`,Zd=`#define PHONG
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
}`,Kd=`#define PHONG
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
}`,$d=`#define STANDARD
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
}`,Jd=`#define STANDARD
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
}`,Qd=`#define TOON
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
}`,tf=`#define TOON
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
}`,ef=`uniform float size;
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
}`,nf=`uniform vec3 diffuse;
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
}`,rf=`#include <common>
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
}`,sf=`uniform vec3 color;
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
}`,af=`uniform float rotation;
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
}`,of=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:Rh,alphahash_pars_fragment:Ch,alphamap_fragment:Ph,alphamap_pars_fragment:Lh,alphatest_fragment:Dh,alphatest_pars_fragment:Ih,aomap_fragment:Uh,aomap_pars_fragment:Nh,batching_pars_vertex:Fh,batching_vertex:Oh,begin_vertex:Bh,beginnormal_vertex:kh,bsdfs:zh,iridescence_fragment:Hh,bumpmap_pars_fragment:Gh,clipping_planes_fragment:Vh,clipping_planes_pars_fragment:Wh,clipping_planes_pars_vertex:Xh,clipping_planes_vertex:qh,color_fragment:Yh,color_pars_fragment:jh,color_pars_vertex:Zh,color_vertex:Kh,common:$h,cube_uv_reflection_fragment:Jh,defaultnormal_vertex:Qh,displacementmap_pars_vertex:tu,displacementmap_vertex:eu,emissivemap_fragment:nu,emissivemap_pars_fragment:iu,colorspace_fragment:ru,colorspace_pars_fragment:su,envmap_fragment:au,envmap_common_pars_fragment:ou,envmap_pars_fragment:lu,envmap_pars_vertex:cu,envmap_physical_pars_fragment:yu,envmap_vertex:hu,fog_vertex:uu,fog_pars_vertex:du,fog_fragment:fu,fog_pars_fragment:pu,gradientmap_pars_fragment:mu,lightmap_pars_fragment:_u,lights_lambert_fragment:gu,lights_lambert_pars_fragment:vu,lights_pars_begin:xu,lights_toon_fragment:Su,lights_toon_pars_fragment:Mu,lights_phong_fragment:Eu,lights_phong_pars_fragment:bu,lights_physical_fragment:Tu,lights_physical_pars_fragment:wu,lights_fragment_begin:Au,lights_fragment_maps:Ru,lights_fragment_end:Cu,logdepthbuf_fragment:Pu,logdepthbuf_pars_fragment:Lu,logdepthbuf_pars_vertex:Du,logdepthbuf_vertex:Iu,map_fragment:Uu,map_pars_fragment:Nu,map_particle_fragment:Fu,map_particle_pars_fragment:Ou,metalnessmap_fragment:Bu,metalnessmap_pars_fragment:ku,morphinstance_vertex:zu,morphcolor_vertex:Hu,morphnormal_vertex:Gu,morphtarget_pars_vertex:Vu,morphtarget_vertex:Wu,normal_fragment_begin:Xu,normal_fragment_maps:qu,normal_pars_fragment:Yu,normal_pars_vertex:ju,normal_vertex:Zu,normalmap_pars_fragment:Ku,clearcoat_normal_fragment_begin:$u,clearcoat_normal_fragment_maps:Ju,clearcoat_pars_fragment:Qu,iridescence_pars_fragment:td,opaque_fragment:ed,packing:nd,premultiplied_alpha_fragment:id,project_vertex:rd,dithering_fragment:sd,dithering_pars_fragment:ad,roughnessmap_fragment:od,roughnessmap_pars_fragment:ld,shadowmap_pars_fragment:cd,shadowmap_pars_vertex:hd,shadowmap_vertex:ud,shadowmask_pars_fragment:dd,skinbase_vertex:fd,skinning_pars_vertex:pd,skinning_vertex:md,skinnormal_vertex:_d,specularmap_fragment:gd,specularmap_pars_fragment:vd,tonemapping_fragment:xd,tonemapping_pars_fragment:yd,transmission_fragment:Sd,transmission_pars_fragment:Md,uv_pars_fragment:Ed,uv_pars_vertex:bd,uv_vertex:Td,worldpos_vertex:wd,background_vert:Ad,background_frag:Rd,backgroundCube_vert:Cd,backgroundCube_frag:Pd,cube_vert:Ld,cube_frag:Dd,depth_vert:Id,depth_frag:Ud,distanceRGBA_vert:Nd,distanceRGBA_frag:Fd,equirect_vert:Od,equirect_frag:Bd,linedashed_vert:kd,linedashed_frag:zd,meshbasic_vert:Hd,meshbasic_frag:Gd,meshlambert_vert:Vd,meshlambert_frag:Wd,meshmatcap_vert:Xd,meshmatcap_frag:qd,meshnormal_vert:Yd,meshnormal_frag:jd,meshphong_vert:Zd,meshphong_frag:Kd,meshphysical_vert:$d,meshphysical_frag:Jd,meshtoon_vert:Qd,meshtoon_frag:tf,points_vert:ef,points_frag:nf,shadow_vert:rf,shadow_frag:sf,sprite_vert:af,sprite_frag:of},xt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Ke={basic:{uniforms:Ee([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Ee([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Ee([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Ee([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Ee([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Ee([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Ee([xt.points,xt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Ee([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Ee([xt.common,xt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Ee([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Ee([xt.sprite,xt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Ee([xt.common,xt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Ee([xt.lights,xt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Ke.physical={uniforms:Ee([Ke.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const rr={r:0,b:0,g:0},Dn=new tn,lf=new ae;function cf(i,t,e,n,r,s,o){const a=new qt(0);let l=s===!0?0:1,h,u,f=null,p=0,d=null;function v(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?e:t).get(E)),E}function _(M){let E=!1;const A=v(M);A===null?c(a,l):A&&A.isColor&&(c(A,1),E=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,E){const A=v(E);A&&(A.isCubeTexture||A.mapping===Ar)?(u===void 0&&(u=new Qe(new Ii(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:gi(Ke.backgroundCube.uniforms),vertexShader:Ke.backgroundCube.vertexShader,fragmentShader:Ke.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,R,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Dn.copy(E.backgroundRotation),Dn.x*=-1,Dn.y*=-1,Dn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Dn.y*=-1,Dn.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(lf.makeRotationFromEuler(Dn)),u.material.toneMapped=Kt.getTransfer(A.colorSpace)!==ne,(f!==A||p!==A.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=A,p=A.version,d=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(h===void 0&&(h=new Qe(new Cr(2,2),new Tn({name:"BackgroundMaterial",uniforms:gi(Ke.background.uniforms),vertexShader:Ke.background.vertexShader,fragmentShader:Ke.background.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(h)),h.material.uniforms.t2D.value=A,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.toneMapped=Kt.getTransfer(A.colorSpace)!==ne,A.matrixAutoUpdate===!0&&A.updateMatrix(),h.material.uniforms.uvTransform.value.copy(A.matrix),(f!==A||p!==A.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,f=A,p=A.version,d=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null))}function c(M,E){M.getRGB(rr,dl(i)),n.buffers.color.setClear(rr.r,rr.g,rr.b,E,o)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),l=E,c(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,c(a,l)},render:_,addToRenderList:m,dispose:x}}function hf(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,o=!1;function a(T,O,C,F,S){let k=!1;const it=f(F,C,O);s!==it&&(s=it,h(s.object)),k=d(T,F,C,S),k&&v(T,F,C,S),S!==null&&t.update(S,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,E(T,O,C,F),S!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(S).buffer))}function l(){return i.createVertexArray()}function h(T){return i.bindVertexArray(T)}function u(T){return i.deleteVertexArray(T)}function f(T,O,C){const F=C.wireframe===!0;let S=n[T.id];S===void 0&&(S={},n[T.id]=S);let k=S[O.id];k===void 0&&(k={},S[O.id]=k);let it=k[F];return it===void 0&&(it=p(l()),k[F]=it),it}function p(T){const O=[],C=[],F=[];for(let S=0;S<e;S++)O[S]=0,C[S]=0,F[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:C,attributeDivisors:F,object:T,attributes:{},index:null}}function d(T,O,C,F){const S=s.attributes,k=O.attributes;let it=0;const G=C.getAttributes();for(const Q in G)if(G[Q].location>=0){const ct=S[Q];let V=k[Q];if(V===void 0&&(Q==="instanceMatrix"&&T.instanceMatrix&&(V=T.instanceMatrix),Q==="instanceColor"&&T.instanceColor&&(V=T.instanceColor)),ct===void 0||ct.attribute!==V||V&&ct.data!==V.data)return!0;it++}return s.attributesNum!==it||s.index!==F}function v(T,O,C,F){const S={},k=O.attributes;let it=0;const G=C.getAttributes();for(const Q in G)if(G[Q].location>=0){let ct=k[Q];ct===void 0&&(Q==="instanceMatrix"&&T.instanceMatrix&&(ct=T.instanceMatrix),Q==="instanceColor"&&T.instanceColor&&(ct=T.instanceColor));const V={};V.attribute=ct,ct&&ct.data&&(V.data=ct.data),S[Q]=V,it++}s.attributes=S,s.attributesNum=it,s.index=F}function _(){const T=s.newAttributes;for(let O=0,C=T.length;O<C;O++)T[O]=0}function m(T){c(T,0)}function c(T,O){const C=s.newAttributes,F=s.enabledAttributes,S=s.attributeDivisors;C[T]=1,F[T]===0&&(i.enableVertexAttribArray(T),F[T]=1),S[T]!==O&&(i.vertexAttribDivisor(T,O),S[T]=O)}function x(){const T=s.newAttributes,O=s.enabledAttributes;for(let C=0,F=O.length;C<F;C++)O[C]!==T[C]&&(i.disableVertexAttribArray(C),O[C]=0)}function M(T,O,C,F,S,k,it){it===!0?i.vertexAttribIPointer(T,O,C,S,k):i.vertexAttribPointer(T,O,C,F,S,k)}function E(T,O,C,F){_();const S=F.attributes,k=C.getAttributes(),it=O.defaultAttributeValues;for(const G in k){const Q=k[G];if(Q.location>=0){let tt=S[G];if(tt===void 0&&(G==="instanceMatrix"&&T.instanceMatrix&&(tt=T.instanceMatrix),G==="instanceColor"&&T.instanceColor&&(tt=T.instanceColor)),tt!==void 0){const ct=tt.normalized,V=tt.itemSize,q=t.get(tt);if(q===void 0)continue;const gt=q.buffer,Y=q.type,nt=q.bytesPerElement,_t=Y===i.INT||Y===i.UNSIGNED_INT||tt.gpuType===aa;if(tt.isInterleavedBufferAttribute){const ft=tt.data,pt=ft.stride,Pt=tt.offset;if(ft.isInstancedInterleavedBuffer){for(let At=0;At<Q.locationSize;At++)c(Q.location+At,ft.meshPerAttribute);T.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let At=0;At<Q.locationSize;At++)m(Q.location+At);i.bindBuffer(i.ARRAY_BUFFER,gt);for(let At=0;At<Q.locationSize;At++)M(Q.location+At,V/Q.locationSize,Y,ct,pt*nt,(Pt+V/Q.locationSize*At)*nt,_t)}else{if(tt.isInstancedBufferAttribute){for(let ft=0;ft<Q.locationSize;ft++)c(Q.location+ft,tt.meshPerAttribute);T.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let ft=0;ft<Q.locationSize;ft++)m(Q.location+ft);i.bindBuffer(i.ARRAY_BUFFER,gt);for(let ft=0;ft<Q.locationSize;ft++)M(Q.location+ft,V/Q.locationSize,Y,ct,V*nt,V/Q.locationSize*ft*nt,_t)}}else if(it!==void 0){const ct=it[G];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(Q.location,ct);break;case 3:i.vertexAttrib3fv(Q.location,ct);break;case 4:i.vertexAttrib4fv(Q.location,ct);break;default:i.vertexAttrib1fv(Q.location,ct)}}}}x()}function A(){N();for(const T in n){const O=n[T];for(const C in O){const F=O[C];for(const S in F)u(F[S].object),delete F[S];delete O[C]}delete n[T]}}function I(T){if(n[T.id]===void 0)return;const O=n[T.id];for(const C in O){const F=O[C];for(const S in F)u(F[S].object),delete F[S];delete O[C]}delete n[T.id]}function R(T){for(const O in n){const C=n[O];if(C[T.id]===void 0)continue;const F=C[T.id];for(const S in F)u(F[S].object),delete F[S];delete C[T.id]}}function N(){b(),o=!0,s!==r&&(s=r,h(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:N,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:I,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function uf(i,t,e){let n;function r(h){n=h}function s(h,u){i.drawArrays(n,h,u),e.update(u,n,1)}function o(h,u,f){f!==0&&(i.drawArraysInstanced(n,h,u,f),e.update(u,n,f))}function a(h,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,u,0,f);let d=0;for(let v=0;v<f;v++)d+=u[v];e.update(d,n,1)}function l(h,u,f,p){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let v=0;v<h.length;v++)o(h[v],u[v],p[v]);else{d.multiDrawArraysInstancedWEBGL(n,h,0,u,0,p,0,f);let v=0;for(let _=0;_<f;_++)v+=u[_]*p[_];e.update(v,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function df(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==qe&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const N=R===Li&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==hn&&!N)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const u=l(h);u!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);const f=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),c=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=v>0,I=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:f,reverseDepthBuffer:p,maxTextures:d,maxVertexTextures:v,maxTextureSize:_,maxCubemapSize:m,maxAttributes:c,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:E,vertexTextures:A,maxSamples:I}}function ff(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new cn,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const d=f.length!==0||p||n!==0||r;return r=p,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,p){e=u(f,p,0)},this.setState=function(f,p,d){const v=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,c=i.get(f);if(!r||v===null||v.length===0||s&&!m)s?u(null):h();else{const x=s?0:n,M=x*4;let E=c.clippingState||null;l.value=E,E=u(v,p,M,d);for(let A=0;A!==M;++A)E[A]=e[A];c.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,p,d,v){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,v!==!0||m===null){const c=d+_*4,x=p.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<c)&&(m=new Float32Array(c));for(let M=0,E=d;M!==_;++M,E+=4)o.copy(f[M]).applyMatrix4(x,a),o.normal.toArray(m,E),m[E+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function pf(i){let t=new WeakMap;function e(o,a){return a===Ts?o.mapping=di:a===ws&&(o.mapping=fi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ts||a===ws)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const h=new lh(l.height);return h.fromEquirectangularTexture(i,o),t.set(o,h),o.addEventListener("dispose",r),e(h.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const ai=4,io=[.125,.215,.35,.446,.526,.582],Fn=20,ss=new vl,ro=new qt;let as=null,os=0,ls=0,cs=!1;const Un=(1+Math.sqrt(5))/2,ii=1/Un,so=[new z(-Un,ii,0),new z(Un,ii,0),new z(-ii,0,Un),new z(ii,0,Un),new z(0,Un,-ii),new z(0,Un,ii),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class ao{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){as=this._renderer.getRenderTarget(),os=this._renderer.getActiveCubeFace(),ls=this._renderer.getActiveMipmapLevel(),cs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=co(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(as,os,ls),this._renderer.xr.enabled=cs,t.scissorTest=!1,sr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===di||t.mapping===fi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),as=this._renderer.getRenderTarget(),os=this._renderer.getActiveCubeFace(),ls=this._renderer.getActiveMipmapLevel(),cs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:Li,format:qe,colorSpace:_i,depthBuffer:!1},r=oo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oo(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mf(s)),this._blurMaterial=_f(s,t,e)}return r}_compileMaterial(t){const e=new Qe(this._lodPlanes[0],t);this._renderer.compile(e,ss)}_sceneToCubeUV(t,e,n,r){const a=new Oe(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(ro),u.toneMapping=Mn,u.autoClear=!1;const d=new cl({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),v=new Qe(new Ii,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(ro),_=!0);for(let c=0;c<6;c++){const x=c%3;x===0?(a.up.set(0,l[c],0),a.lookAt(h[c],0,0)):x===1?(a.up.set(0,0,l[c]),a.lookAt(0,h[c],0)):(a.up.set(0,l[c],0),a.lookAt(0,0,h[c]));const M=this._cubeSize;sr(r,x*M,c>2?M:0,M,M),u.setRenderTarget(r),_&&u.render(v,a),u.render(t,a)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=p,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===di||t.mapping===fi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=co()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lo());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Qe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;sr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ss)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=so[(r-s-1)%so.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const l=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Qe(this._lodPlanes[r],h),p=h.uniforms,d=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Fn-1),_=s/v,m=isFinite(s)?1+Math.floor(u*_):Fn;m>Fn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Fn}`);const c=[];let x=0;for(let R=0;R<Fn;++R){const N=R/_,b=Math.exp(-N*N/2);c.push(b),R===0?x+=b:R<m&&(x+=2*b)}for(let R=0;R<c.length;R++)c[R]=c[R]/x;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=c,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:M}=this;p.dTheta.value=v,p.mipInt.value=M-n;const E=this._sizeLods[r],A=3*E*(r>M-ai?r-M+ai:0),I=4*(this._cubeSize-E);sr(e,A,I,3*E,2*E),l.setRenderTarget(e),l.render(f,ss)}}function mf(i){const t=[],e=[],n=[];let r=i;const s=i-ai+1+io.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-ai?l=io[o-i+ai-1]:o===0&&(l=0),n.push(l);const h=1/(a-2),u=-h,f=1+h,p=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,v=6,_=3,m=2,c=1,x=new Float32Array(_*v*d),M=new Float32Array(m*v*d),E=new Float32Array(c*v*d);for(let I=0;I<d;I++){const R=I%3*2/3-1,N=I>2?0:-1,b=[R,N,0,R+2/3,N,0,R+2/3,N+1,0,R,N,0,R+2/3,N+1,0,R,N+1,0];x.set(b,_*v*I),M.set(p,m*v*I);const T=[I,I,I,I,I,I];E.set(T,c*v*I)}const A=new Ze;A.setAttribute("position",new je(x,_)),A.setAttribute("uv",new je(M,m)),A.setAttribute("faceIndex",new je(E,c)),t.push(A),r>ai&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function oo(i,t,e){const n=new zn(i,t,e);return n.texture.mapping=Ar,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sr(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function _f(i,t,e){const n=new Float32Array(Fn),r=new z(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:Fn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:pa(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function lo(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pa(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function co(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function pa(){return`

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
	`}function gf(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,h=l===Ts||l===ws,u=l===di||l===fi;if(h||u){let f=t.get(a);const p=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new ao(i)),f=h?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return h&&d&&d.height>0||u&&d&&r(d)?(e===null&&(e=new ao(i)),f=h?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const h=6;for(let u=0;u<h;u++)a[u]!==void 0&&l++;return l===h}function s(a){const l=a.target;l.removeEventListener("dispose",s);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function vf(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&ri("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function xf(i,t,e,n){const r={},s=new WeakMap;function o(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const v in p.attributes)t.remove(p.attributes[v]);p.removeEventListener("dispose",o),delete r[p.id];const d=s.get(p);d&&(t.remove(d),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(f,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,e.memory.geometries++),p}function l(f){const p=f.attributes;for(const d in p)t.update(p[d],i.ARRAY_BUFFER)}function h(f){const p=[],d=f.index,v=f.attributes.position;let _=0;if(d!==null){const x=d.array;_=d.version;for(let M=0,E=x.length;M<E;M+=3){const A=x[M+0],I=x[M+1],R=x[M+2];p.push(A,I,I,R,R,A)}}else if(v!==void 0){const x=v.array;_=v.version;for(let M=0,E=x.length/3-1;M<E;M+=3){const A=M+0,I=M+1,R=M+2;p.push(A,I,I,R,R,A)}}else return;const m=new(rl(p)?ul:hl)(p,1);m.version=_;const c=s.get(f);c&&t.remove(c),s.set(f,m)}function u(f){const p=s.get(f);if(p){const d=f.index;d!==null&&p.version<d.version&&h(f)}else h(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function yf(i,t,e){let n;function r(p){n=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,d){i.drawElements(n,d,s,p*o),e.update(d,n,1)}function h(p,d,v){v!==0&&(i.drawElementsInstanced(n,d,s,p*o,v),e.update(d,n,v))}function u(p,d,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,p,0,v);let m=0;for(let c=0;c<v;c++)m+=d[c];e.update(m,n,1)}function f(p,d,v,_){if(v===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let c=0;c<p.length;c++)h(p[c]/o,d[c],_[c]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,p,0,_,0,v);let c=0;for(let x=0;x<v;x++)c+=d[x]*_[x];e.update(c,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Sf(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Mf(i,t,e){const n=new WeakMap,r=new ce;function s(o,a,l){const h=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let p=n.get(a);if(p===void 0||p.count!==f){let T=function(){N.dispose(),n.delete(a),a.removeEventListener("dispose",T)};var d=T;p!==void 0&&p.texture.dispose();const v=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,c=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let E=0;v===!0&&(E=1),_===!0&&(E=2),m===!0&&(E=3);let A=a.attributes.position.count*E,I=1;A>t.maxTextureSize&&(I=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const R=new Float32Array(A*I*4*f),N=new al(R,A,I,f);N.type=hn,N.needsUpdate=!0;const b=E*4;for(let O=0;O<f;O++){const C=c[O],F=x[O],S=M[O],k=A*I*4*O;for(let it=0;it<C.count;it++){const G=it*b;v===!0&&(r.fromBufferAttribute(C,it),R[k+G+0]=r.x,R[k+G+1]=r.y,R[k+G+2]=r.z,R[k+G+3]=0),_===!0&&(r.fromBufferAttribute(F,it),R[k+G+4]=r.x,R[k+G+5]=r.y,R[k+G+6]=r.z,R[k+G+7]=0),m===!0&&(r.fromBufferAttribute(S,it),R[k+G+8]=r.x,R[k+G+9]=r.y,R[k+G+10]=r.z,R[k+G+11]=S.itemSize===4?r.w:1)}}p={count:f,texture:N,size:new Gt(A,I)},n.set(a,p),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let v=0;for(let m=0;m<h.length;m++)v+=h[m];const _=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",h)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function Ef(i,t,e,n){let r=new WeakMap;function s(l){const h=n.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return f}function o(){r=new WeakMap}function a(l){const h=l.target;h.removeEventListener("dispose",a),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:s,dispose:o}}const yl=new Re,ho=new _l(1,1),Sl=new al,Ml=new Xc,El=new pl,uo=[],fo=[],po=new Float32Array(16),mo=new Float32Array(9),_o=new Float32Array(4);function xi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=uo[r];if(s===void 0&&(s=new Float32Array(r),uo[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function pe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Pr(i,t){let e=fo[t];e===void 0&&(e=new Int32Array(t),fo[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function bf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Tf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2fv(this.addr,t),me(e,t)}}function wf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(pe(e,t))return;i.uniform3fv(this.addr,t),me(e,t)}}function Af(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4fv(this.addr,t),me(e,t)}}function Rf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;_o.set(n),i.uniformMatrix2fv(this.addr,!1,_o),me(e,n)}}function Cf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;mo.set(n),i.uniformMatrix3fv(this.addr,!1,mo),me(e,n)}}function Pf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;po.set(n),i.uniformMatrix4fv(this.addr,!1,po),me(e,n)}}function Lf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Df(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2iv(this.addr,t),me(e,t)}}function If(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;i.uniform3iv(this.addr,t),me(e,t)}}function Uf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4iv(this.addr,t),me(e,t)}}function Nf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ff(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2uiv(this.addr,t),me(e,t)}}function Of(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;i.uniform3uiv(this.addr,t),me(e,t)}}function Bf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4uiv(this.addr,t),me(e,t)}}function kf(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(ho.compareFunction=il,s=ho):s=yl,e.setTexture2D(t||s,r)}function zf(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Ml,r)}function Hf(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||El,r)}function Gf(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Sl,r)}function Vf(i){switch(i){case 5126:return bf;case 35664:return Tf;case 35665:return wf;case 35666:return Af;case 35674:return Rf;case 35675:return Cf;case 35676:return Pf;case 5124:case 35670:return Lf;case 35667:case 35671:return Df;case 35668:case 35672:return If;case 35669:case 35673:return Uf;case 5125:return Nf;case 36294:return Ff;case 36295:return Of;case 36296:return Bf;case 35678:case 36198:case 36298:case 36306:case 35682:return kf;case 35679:case 36299:case 36307:return zf;case 35680:case 36300:case 36308:case 36293:return Hf;case 36289:case 36303:case 36311:case 36292:return Gf}}function Wf(i,t){i.uniform1fv(this.addr,t)}function Xf(i,t){const e=xi(t,this.size,2);i.uniform2fv(this.addr,e)}function qf(i,t){const e=xi(t,this.size,3);i.uniform3fv(this.addr,e)}function Yf(i,t){const e=xi(t,this.size,4);i.uniform4fv(this.addr,e)}function jf(i,t){const e=xi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Zf(i,t){const e=xi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Kf(i,t){const e=xi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function $f(i,t){i.uniform1iv(this.addr,t)}function Jf(i,t){i.uniform2iv(this.addr,t)}function Qf(i,t){i.uniform3iv(this.addr,t)}function tp(i,t){i.uniform4iv(this.addr,t)}function ep(i,t){i.uniform1uiv(this.addr,t)}function np(i,t){i.uniform2uiv(this.addr,t)}function ip(i,t){i.uniform3uiv(this.addr,t)}function rp(i,t){i.uniform4uiv(this.addr,t)}function sp(i,t,e){const n=this.cache,r=t.length,s=Pr(e,r);pe(n,s)||(i.uniform1iv(this.addr,s),me(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||yl,s[o])}function ap(i,t,e){const n=this.cache,r=t.length,s=Pr(e,r);pe(n,s)||(i.uniform1iv(this.addr,s),me(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Ml,s[o])}function op(i,t,e){const n=this.cache,r=t.length,s=Pr(e,r);pe(n,s)||(i.uniform1iv(this.addr,s),me(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||El,s[o])}function lp(i,t,e){const n=this.cache,r=t.length,s=Pr(e,r);pe(n,s)||(i.uniform1iv(this.addr,s),me(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Sl,s[o])}function cp(i){switch(i){case 5126:return Wf;case 35664:return Xf;case 35665:return qf;case 35666:return Yf;case 35674:return jf;case 35675:return Zf;case 35676:return Kf;case 5124:case 35670:return $f;case 35667:case 35671:return Jf;case 35668:case 35672:return Qf;case 35669:case 35673:return tp;case 5125:return ep;case 36294:return np;case 36295:return ip;case 36296:return rp;case 35678:case 36198:case 36298:case 36306:case 35682:return sp;case 35679:case 36299:case 36307:return ap;case 35680:case 36300:case 36308:case 36293:return op;case 36289:case 36303:case 36311:case 36292:return lp}}class hp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Vf(e.type)}}class up{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cp(e.type)}}class dp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const hs=/(\w+)(\])?(\[|\.)?/g;function go(i,t){i.seq.push(t),i.map[t.id]=t}function fp(i,t,e){const n=i.name,r=n.length;for(hs.lastIndex=0;;){const s=hs.exec(n),o=hs.lastIndex;let a=s[1];const l=s[2]==="]",h=s[3];if(l&&(a=a|0),h===void 0||h==="["&&o+2===r){go(e,h===void 0?new hp(a,i,t):new up(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new dp(a),go(e,f)),e=f}}}class gr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);fp(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function vo(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const pp=37297;let mp=0;function _p(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const xo=new Ht;function gp(i){Kt._getMatrix(xo,Kt.workingColorSpace,i);const t=`mat3( ${xo.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case Mr:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function yo(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+_p(i.getShaderSource(t),o)}else return r}function vp(i,t){const e=gp(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function xp(i,t){let e;switch(t){case _c:e="Linear";break;case gc:e="Reinhard";break;case vc:e="Cineon";break;case xc:e="ACESFilmic";break;case Sc:e="AgX";break;case Mc:e="Neutral";break;case yc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ar=new z;function yp(){Kt.getLuminanceCoefficients(ar);const i=ar.x.toFixed(4),t=ar.y.toFixed(4),e=ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ri).join(`
`)}function Mp(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ep(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ri(i){return i!==""}function So(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Mo(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bp=/^[ \t]*#include +<([\w\d./]+)>/gm;function na(i){return i.replace(bp,wp)}const Tp=new Map;function wp(i,t){let e=Vt[t];if(e===void 0){const n=Tp.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return na(e)}const Ap=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eo(i){return i.replace(Ap,Rp)}function Rp(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function bo(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Cp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Vo?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Zl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(t="SHADOWMAP_TYPE_VSM"),t}function Pp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case di:case fi:t="ENVMAP_TYPE_CUBE";break;case Ar:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Lp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case fi:t="ENVMAP_MODE_REFRACTION";break}return t}function Dp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Wo:t="ENVMAP_BLENDING_MULTIPLY";break;case pc:t="ENVMAP_BLENDING_MIX";break;case mc:t="ENVMAP_BLENDING_ADD";break}return t}function Ip(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Up(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Cp(e),h=Pp(e),u=Lp(e),f=Dp(e),p=Ip(e),d=Sp(e),v=Mp(s),_=r.createProgram();let m,c,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ri).join(`
`),m.length>0&&(m+=`
`),c=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ri).join(`
`),c.length>0&&(c+=`
`)):(m=[bo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ri).join(`
`),c=[bo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Mn?"#define TONE_MAPPING":"",e.toneMapping!==Mn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Mn?xp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,vp("linearToOutputTexel",e.outputColorSpace),yp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ri).join(`
`)),o=na(o),o=So(o,e),o=Mo(o,e),a=na(a),a=So(a,e),a=Mo(a,e),o=Eo(o),a=Eo(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,c=["#define varying in",e.glslVersion===Pa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Pa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+c);const M=x+m+o,E=x+c+a,A=vo(r,r.VERTEX_SHADER,M),I=vo(r,r.FRAGMENT_SHADER,E);r.attachShader(_,A),r.attachShader(_,I),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(O){if(i.debug.checkShaderErrors){const C=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(A).trim(),S=r.getShaderInfoLog(I).trim();let k=!0,it=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,A,I);else{const G=yo(r,A,"vertex"),Q=yo(r,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+C+`
`+G+`
`+Q)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(F===""||S==="")&&(it=!1);it&&(O.diagnostics={runnable:k,programLog:C,vertexShader:{log:F,prefix:m},fragmentShader:{log:S,prefix:c}})}r.deleteShader(A),r.deleteShader(I),N=new gr(r,_),b=Ep(r,_)}let N;this.getUniforms=function(){return N===void 0&&R(this),N};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(_,pp)),T},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=mp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=I,this}let Np=0;class Fp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Op(t),e.set(t,n)),n}}class Op{constructor(t){this.id=Np++,this.code=t,this.usedTimes=0}}function Bp(i,t,e,n,r,s,o){const a=new ol,l=new Fp,h=new Set,u=[],f=r.logarithmicDepthBuffer,p=r.vertexTextures;let d=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return h.add(b),b===0?"uv":`uv${b}`}function m(b,T,O,C,F){const S=C.fog,k=F.geometry,it=b.isMeshStandardMaterial?C.environment:null,G=(b.isMeshStandardMaterial?e:t).get(b.envMap||it),Q=G&&G.mapping===Ar?G.image.height:null,tt=v[b.type];b.precision!==null&&(d=r.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const ct=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,V=ct!==void 0?ct.length:0;let q=0;k.morphAttributes.position!==void 0&&(q=1),k.morphAttributes.normal!==void 0&&(q=2),k.morphAttributes.color!==void 0&&(q=3);let gt,Y,nt,_t;if(tt){const te=Ke[tt];gt=te.vertexShader,Y=te.fragmentShader}else gt=b.vertexShader,Y=b.fragmentShader,l.update(b),nt=l.getVertexShaderID(b),_t=l.getFragmentShaderID(b);const ft=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),Pt=F.isInstancedMesh===!0,At=F.isBatchedMesh===!0,Bt=!!b.map,Yt=!!b.matcap,Ut=!!G,g=!!b.aoMap,ot=!!b.lightMap,$=!!b.bumpMap,U=!!b.normalMap,D=!!b.displacementMap,H=!!b.emissiveMap,et=!!b.metalnessMap,w=!!b.roughnessMap,y=b.anisotropy>0,B=b.clearcoat>0,Z=b.dispersion>0,X=b.iridescence>0,J=b.sheen>0,mt=b.transmission>0,ht=y&&!!b.anisotropyMap,vt=B&&!!b.clearcoatMap,Wt=B&&!!b.clearcoatNormalMap,ut=B&&!!b.clearcoatRoughnessMap,Tt=X&&!!b.iridescenceMap,Et=X&&!!b.iridescenceThicknessMap,It=J&&!!b.sheenColorMap,wt=J&&!!b.sheenRoughnessMap,Ft=!!b.specularMap,kt=!!b.specularColorMap,ee=!!b.specularIntensityMap,W=mt&&!!b.transmissionMap,yt=mt&&!!b.thicknessMap,at=!!b.gradientMap,lt=!!b.alphaMap,St=b.alphaTest>0,bt=!!b.alphaHash,zt=!!b.extensions;let oe=Mn;b.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(oe=i.toneMapping);const xe={shaderID:tt,shaderType:b.type,shaderName:b.name,vertexShader:gt,fragmentShader:Y,defines:b.defines,customVertexShaderID:nt,customFragmentShaderID:_t,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:At,batchingColor:At&&F._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,instancingMorph:Pt&&F.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ft===null?i.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:_i,alphaToCoverage:!!b.alphaToCoverage,map:Bt,matcap:Yt,envMap:Ut,envMapMode:Ut&&G.mapping,envMapCubeUVHeight:Q,aoMap:g,lightMap:ot,bumpMap:$,normalMap:U,displacementMap:p&&D,emissiveMap:H,normalMapObjectSpace:U&&b.normalMapType===wc,normalMapTangentSpace:U&&b.normalMapType===nl,metalnessMap:et,roughnessMap:w,anisotropy:y,anisotropyMap:ht,clearcoat:B,clearcoatMap:vt,clearcoatNormalMap:Wt,clearcoatRoughnessMap:ut,dispersion:Z,iridescence:X,iridescenceMap:Tt,iridescenceThicknessMap:Et,sheen:J,sheenColorMap:It,sheenRoughnessMap:wt,specularMap:Ft,specularColorMap:kt,specularIntensityMap:ee,transmission:mt,transmissionMap:W,thicknessMap:yt,gradientMap:at,opaque:b.transparent===!1&&b.blending===li&&b.alphaToCoverage===!1,alphaMap:lt,alphaTest:St,alphaHash:bt,combine:b.combine,mapUv:Bt&&_(b.map.channel),aoMapUv:g&&_(b.aoMap.channel),lightMapUv:ot&&_(b.lightMap.channel),bumpMapUv:$&&_(b.bumpMap.channel),normalMapUv:U&&_(b.normalMap.channel),displacementMapUv:D&&_(b.displacementMap.channel),emissiveMapUv:H&&_(b.emissiveMap.channel),metalnessMapUv:et&&_(b.metalnessMap.channel),roughnessMapUv:w&&_(b.roughnessMap.channel),anisotropyMapUv:ht&&_(b.anisotropyMap.channel),clearcoatMapUv:vt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Wt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:It&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:wt&&_(b.sheenRoughnessMap.channel),specularMapUv:Ft&&_(b.specularMap.channel),specularColorMapUv:kt&&_(b.specularColorMap.channel),specularIntensityMapUv:ee&&_(b.specularIntensityMap.channel),transmissionMapUv:W&&_(b.transmissionMap.channel),thicknessMapUv:yt&&_(b.thicknessMap.channel),alphaMapUv:lt&&_(b.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(U||y),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!k.attributes.uv&&(Bt||lt),fog:!!S,useFog:b.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:pt,skinning:F.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:V,morphTextureStride:q,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:oe,decodeVideoTexture:Bt&&b.map.isVideoTexture===!0&&Kt.getTransfer(b.map.colorSpace)===ne,decodeVideoTextureEmissive:H&&b.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(b.emissiveMap.colorSpace)===ne,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===$e,flipSided:b.side===Ae,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:zt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&b.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return xe.vertexUv1s=h.has(1),xe.vertexUv2s=h.has(2),xe.vertexUv3s=h.has(3),h.clear(),xe}function c(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const O in b.defines)T.push(O),T.push(b.defines[O]);return b.isRawShaderMaterial===!1&&(x(T,b),M(T,b),T.push(i.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function x(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function M(b,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reverseDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),b.push(a.mask)}function E(b){const T=v[b.type];let O;if(T){const C=Ke[T];O=rh.clone(C.uniforms)}else O=b.uniforms;return O}function A(b,T){let O;for(let C=0,F=u.length;C<F;C++){const S=u[C];if(S.cacheKey===T){O=S,++O.usedTimes;break}}return O===void 0&&(O=new Up(i,T,b,s),u.push(O)),O}function I(b){if(--b.usedTimes===0){const T=u.indexOf(b);u[T]=u[u.length-1],u.pop(),b.destroy()}}function R(b){l.remove(b)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:c,getUniforms:E,acquireProgram:A,releaseProgram:I,releaseShaderCache:R,programs:u,dispose:N}}function kp(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function zp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function To(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function wo(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(f,p,d,v,_,m){let c=i[t];return c===void 0?(c={id:f.id,object:f,geometry:p,material:d,groupOrder:v,renderOrder:f.renderOrder,z:_,group:m},i[t]=c):(c.id=f.id,c.object=f,c.geometry=p,c.material=d,c.groupOrder=v,c.renderOrder=f.renderOrder,c.z=_,c.group=m),t++,c}function a(f,p,d,v,_,m){const c=o(f,p,d,v,_,m);d.transmission>0?n.push(c):d.transparent===!0?r.push(c):e.push(c)}function l(f,p,d,v,_,m){const c=o(f,p,d,v,_,m);d.transmission>0?n.unshift(c):d.transparent===!0?r.unshift(c):e.unshift(c)}function h(f,p){e.length>1&&e.sort(f||zp),n.length>1&&n.sort(p||To),r.length>1&&r.sort(p||To)}function u(){for(let f=t,p=i.length;f<p;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:h}}function Hp(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new wo,i.set(n,[o])):r>=s.length?(o=new wo,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Gp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new qt};break;case"SpotLight":e={position:new z,direction:new z,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function Vp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Wp=0;function Xp(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function qp(i){const t=new Gp,e=Vp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new z);const r=new z,s=new ae,o=new ae;function a(h){let u=0,f=0,p=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,v=0,_=0,m=0,c=0,x=0,M=0,E=0,A=0,I=0,R=0;h.sort(Xp);for(let b=0,T=h.length;b<T;b++){const O=h[b],C=O.color,F=O.intensity,S=O.distance,k=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)u+=C.r*F,f+=C.g*F,p+=C.b*F;else if(O.isLightProbe){for(let it=0;it<9;it++)n.probe[it].addScaledVector(O.sh.coefficients[it],F);R++}else if(O.isDirectionalLight){const it=t.get(O);if(it.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const G=O.shadow,Q=e.get(O);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,n.directionalShadow[d]=Q,n.directionalShadowMap[d]=k,n.directionalShadowMatrix[d]=O.shadow.matrix,x++}n.directional[d]=it,d++}else if(O.isSpotLight){const it=t.get(O);it.position.setFromMatrixPosition(O.matrixWorld),it.color.copy(C).multiplyScalar(F),it.distance=S,it.coneCos=Math.cos(O.angle),it.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),it.decay=O.decay,n.spot[_]=it;const G=O.shadow;if(O.map&&(n.spotLightMap[A]=O.map,A++,G.updateMatrices(O),O.castShadow&&I++),n.spotLightMatrix[_]=G.matrix,O.castShadow){const Q=e.get(O);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,n.spotShadow[_]=Q,n.spotShadowMap[_]=k,E++}_++}else if(O.isRectAreaLight){const it=t.get(O);it.color.copy(C).multiplyScalar(F),it.halfWidth.set(O.width*.5,0,0),it.halfHeight.set(0,O.height*.5,0),n.rectArea[m]=it,m++}else if(O.isPointLight){const it=t.get(O);if(it.color.copy(O.color).multiplyScalar(O.intensity),it.distance=O.distance,it.decay=O.decay,O.castShadow){const G=O.shadow,Q=e.get(O);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,Q.shadowCameraNear=G.camera.near,Q.shadowCameraFar=G.camera.far,n.pointShadow[v]=Q,n.pointShadowMap[v]=k,n.pointShadowMatrix[v]=O.shadow.matrix,M++}n.point[v]=it,v++}else if(O.isHemisphereLight){const it=t.get(O);it.skyColor.copy(O.color).multiplyScalar(F),it.groundColor.copy(O.groundColor).multiplyScalar(F),n.hemi[c]=it,c++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=p;const N=n.hash;(N.directionalLength!==d||N.pointLength!==v||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==c||N.numDirectionalShadows!==x||N.numPointShadows!==M||N.numSpotShadows!==E||N.numSpotMaps!==A||N.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=v,n.hemi.length=c,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=E+A-I,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=R,N.directionalLength=d,N.pointLength=v,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=c,N.numDirectionalShadows=x,N.numPointShadows=M,N.numSpotShadows=E,N.numSpotMaps=A,N.numLightProbes=R,n.version=Wp++)}function l(h,u){let f=0,p=0,d=0,v=0,_=0;const m=u.matrixWorldInverse;for(let c=0,x=h.length;c<x;c++){const M=h[c];if(M.isDirectionalLight){const E=n.directional[f];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),f++}else if(M.isSpotLight){const E=n.spot[d];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const E=n.rectArea[v];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),v++}else if(M.isPointLight){const E=n.point[p];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),p++}else if(M.isHemisphereLight){const E=n.hemi[_];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Ao(i){const t=new qp(i),e=[],n=[];function r(u){h.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:h,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Yp(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Ao(i),t.set(r,[a])):s>=o.length?(a=new Ao(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const jp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zp=`uniform sampler2D shadow_pass;
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
}`;function Kp(i,t,e){let n=new fa;const r=new Gt,s=new Gt,o=new ce,a=new _h({depthPacking:Tc}),l=new gh,h={},u=e.maxTextureSize,f={[En]:Ae,[Ae]:En,[$e]:$e},p=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:jp,fragmentShader:Zp}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const v=new Ze;v.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Qe(v,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vo;let c=this.type;this.render=function(I,R,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;const b=i.getRenderTarget(),T=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),C=i.state;C.setBlending(Sn),C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);const F=c!==ln&&this.type===ln,S=c===ln&&this.type!==ln;for(let k=0,it=I.length;k<it;k++){const G=I[k],Q=G.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;r.copy(Q.mapSize);const tt=Q.getFrameExtents();if(r.multiply(tt),s.copy(Q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/tt.x),r.x=s.x*tt.x,Q.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/tt.y),r.y=s.y*tt.y,Q.mapSize.y=s.y)),Q.map===null||F===!0||S===!0){const V=this.type!==ln?{minFilter:Ye,magFilter:Ye}:{};Q.map!==null&&Q.map.dispose(),Q.map=new zn(r.x,r.y,V),Q.map.texture.name=G.name+".shadowMap",Q.camera.updateProjectionMatrix()}i.setRenderTarget(Q.map),i.clear();const ct=Q.getViewportCount();for(let V=0;V<ct;V++){const q=Q.getViewport(V);o.set(s.x*q.x,s.y*q.y,s.x*q.z,s.y*q.w),C.viewport(o),Q.updateMatrices(G,V),n=Q.getFrustum(),E(R,N,Q.camera,G,this.type)}Q.isPointLightShadow!==!0&&this.type===ln&&x(Q,N),Q.needsUpdate=!1}c=this.type,m.needsUpdate=!1,i.setRenderTarget(b,T,O)};function x(I,R){const N=t.update(_);p.defines.VSM_SAMPLES!==I.blurSamples&&(p.defines.VSM_SAMPLES=I.blurSamples,d.defines.VSM_SAMPLES=I.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new zn(r.x,r.y)),p.uniforms.shadow_pass.value=I.map.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,i.setRenderTarget(I.mapPass),i.clear(),i.renderBufferDirect(R,null,N,p,_,null),d.uniforms.shadow_pass.value=I.mapPass.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,i.setRenderTarget(I.map),i.clear(),i.renderBufferDirect(R,null,N,d,_,null)}function M(I,R,N,b){let T=null;const O=N.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(O!==void 0)T=O;else if(T=N.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const C=T.uuid,F=R.uuid;let S=h[C];S===void 0&&(S={},h[C]=S);let k=S[F];k===void 0&&(k=T.clone(),S[F]=k,R.addEventListener("dispose",A)),T=k}if(T.visible=R.visible,T.wireframe=R.wireframe,b===ln?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:f[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,N.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const C=i.properties.get(T);C.light=N}return T}function E(I,R,N,b,T){if(I.visible===!1)return;if(I.layers.test(R.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&T===ln)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,I.matrixWorld);const F=t.update(I),S=I.material;if(Array.isArray(S)){const k=F.groups;for(let it=0,G=k.length;it<G;it++){const Q=k[it],tt=S[Q.materialIndex];if(tt&&tt.visible){const ct=M(I,tt,b,T);I.onBeforeShadow(i,I,R,N,F,ct,Q),i.renderBufferDirect(N,null,F,ct,I,Q),I.onAfterShadow(i,I,R,N,F,ct,Q)}}}else if(S.visible){const k=M(I,S,b,T);I.onBeforeShadow(i,I,R,N,F,k,null),i.renderBufferDirect(N,null,F,k,I,null),I.onAfterShadow(i,I,R,N,F,k,null)}}const C=I.children;for(let F=0,S=C.length;F<S;F++)E(C[F],R,N,b,T)}function A(I){I.target.removeEventListener("dispose",A);for(const N in h){const b=h[N],T=I.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}const $p={[vs]:xs,[ys]:Es,[Ss]:bs,[ui]:Ms,[xs]:vs,[Es]:ys,[bs]:Ss,[Ms]:ui};function Jp(i,t){function e(){let W=!1;const yt=new ce;let at=null;const lt=new ce(0,0,0,0);return{setMask:function(St){at!==St&&!W&&(i.colorMask(St,St,St,St),at=St)},setLocked:function(St){W=St},setClear:function(St,bt,zt,oe,xe){xe===!0&&(St*=oe,bt*=oe,zt*=oe),yt.set(St,bt,zt,oe),lt.equals(yt)===!1&&(i.clearColor(St,bt,zt,oe),lt.copy(yt))},reset:function(){W=!1,at=null,lt.set(-1,0,0,0)}}}function n(){let W=!1,yt=!1,at=null,lt=null,St=null;return{setReversed:function(bt){if(yt!==bt){const zt=t.get("EXT_clip_control");yt?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);const oe=St;St=null,this.setClear(oe)}yt=bt},getReversed:function(){return yt},setTest:function(bt){bt?ft(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(bt){at!==bt&&!W&&(i.depthMask(bt),at=bt)},setFunc:function(bt){if(yt&&(bt=$p[bt]),lt!==bt){switch(bt){case vs:i.depthFunc(i.NEVER);break;case xs:i.depthFunc(i.ALWAYS);break;case ys:i.depthFunc(i.LESS);break;case ui:i.depthFunc(i.LEQUAL);break;case Ss:i.depthFunc(i.EQUAL);break;case Ms:i.depthFunc(i.GEQUAL);break;case Es:i.depthFunc(i.GREATER);break;case bs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}lt=bt}},setLocked:function(bt){W=bt},setClear:function(bt){St!==bt&&(yt&&(bt=1-bt),i.clearDepth(bt),St=bt)},reset:function(){W=!1,at=null,lt=null,St=null,yt=!1}}}function r(){let W=!1,yt=null,at=null,lt=null,St=null,bt=null,zt=null,oe=null,xe=null;return{setTest:function(te){W||(te?ft(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(te){yt!==te&&!W&&(i.stencilMask(te),yt=te)},setFunc:function(te,ke,en){(at!==te||lt!==ke||St!==en)&&(i.stencilFunc(te,ke,en),at=te,lt=ke,St=en)},setOp:function(te,ke,en){(bt!==te||zt!==ke||oe!==en)&&(i.stencilOp(te,ke,en),bt=te,zt=ke,oe=en)},setLocked:function(te){W=te},setClear:function(te){xe!==te&&(i.clearStencil(te),xe=te)},reset:function(){W=!1,yt=null,at=null,lt=null,St=null,bt=null,zt=null,oe=null,xe=null}}}const s=new e,o=new n,a=new r,l=new WeakMap,h=new WeakMap;let u={},f={},p=new WeakMap,d=[],v=null,_=!1,m=null,c=null,x=null,M=null,E=null,A=null,I=null,R=new qt(0,0,0),N=0,b=!1,T=null,O=null,C=null,F=null,S=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let it=!1,G=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(Q)[1]),it=G>=1):Q.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),it=G>=2);let tt=null,ct={};const V=i.getParameter(i.SCISSOR_BOX),q=i.getParameter(i.VIEWPORT),gt=new ce().fromArray(V),Y=new ce().fromArray(q);function nt(W,yt,at,lt){const St=new Uint8Array(4),bt=i.createTexture();i.bindTexture(W,bt),i.texParameteri(W,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(W,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let zt=0;zt<at;zt++)W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?i.texImage3D(yt,0,i.RGBA,1,1,lt,0,i.RGBA,i.UNSIGNED_BYTE,St):i.texImage2D(yt+zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,St);return bt}const _t={};_t[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),_t[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_t[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ft(i.DEPTH_TEST),o.setFunc(ui),$(!1),U(ba),ft(i.CULL_FACE),g(Sn);function ft(W){u[W]!==!0&&(i.enable(W),u[W]=!0)}function pt(W){u[W]!==!1&&(i.disable(W),u[W]=!1)}function Pt(W,yt){return f[W]!==yt?(i.bindFramebuffer(W,yt),f[W]=yt,W===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=yt),W===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=yt),!0):!1}function At(W,yt){let at=d,lt=!1;if(W){at=p.get(yt),at===void 0&&(at=[],p.set(yt,at));const St=W.textures;if(at.length!==St.length||at[0]!==i.COLOR_ATTACHMENT0){for(let bt=0,zt=St.length;bt<zt;bt++)at[bt]=i.COLOR_ATTACHMENT0+bt;at.length=St.length,lt=!0}}else at[0]!==i.BACK&&(at[0]=i.BACK,lt=!0);lt&&i.drawBuffers(at)}function Bt(W){return v!==W?(i.useProgram(W),v=W,!0):!1}const Yt={[Nn]:i.FUNC_ADD,[$l]:i.FUNC_SUBTRACT,[Jl]:i.FUNC_REVERSE_SUBTRACT};Yt[Ql]=i.MIN,Yt[tc]=i.MAX;const Ut={[ec]:i.ZERO,[nc]:i.ONE,[ic]:i.SRC_COLOR,[_s]:i.SRC_ALPHA,[cc]:i.SRC_ALPHA_SATURATE,[oc]:i.DST_COLOR,[sc]:i.DST_ALPHA,[rc]:i.ONE_MINUS_SRC_COLOR,[gs]:i.ONE_MINUS_SRC_ALPHA,[lc]:i.ONE_MINUS_DST_COLOR,[ac]:i.ONE_MINUS_DST_ALPHA,[hc]:i.CONSTANT_COLOR,[uc]:i.ONE_MINUS_CONSTANT_COLOR,[dc]:i.CONSTANT_ALPHA,[fc]:i.ONE_MINUS_CONSTANT_ALPHA};function g(W,yt,at,lt,St,bt,zt,oe,xe,te){if(W===Sn){_===!0&&(pt(i.BLEND),_=!1);return}if(_===!1&&(ft(i.BLEND),_=!0),W!==Kl){if(W!==m||te!==b){if((c!==Nn||E!==Nn)&&(i.blendEquation(i.FUNC_ADD),c=Nn,E=Nn),te)switch(W){case li:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ta:i.blendFunc(i.ONE,i.ONE);break;case wa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Aa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case li:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ta:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case wa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Aa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}x=null,M=null,A=null,I=null,R.set(0,0,0),N=0,m=W,b=te}return}St=St||yt,bt=bt||at,zt=zt||lt,(yt!==c||St!==E)&&(i.blendEquationSeparate(Yt[yt],Yt[St]),c=yt,E=St),(at!==x||lt!==M||bt!==A||zt!==I)&&(i.blendFuncSeparate(Ut[at],Ut[lt],Ut[bt],Ut[zt]),x=at,M=lt,A=bt,I=zt),(oe.equals(R)===!1||xe!==N)&&(i.blendColor(oe.r,oe.g,oe.b,xe),R.copy(oe),N=xe),m=W,b=!1}function ot(W,yt){W.side===$e?pt(i.CULL_FACE):ft(i.CULL_FACE);let at=W.side===Ae;yt&&(at=!at),$(at),W.blending===li&&W.transparent===!1?g(Sn):g(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),s.setMask(W.colorWrite);const lt=W.stencilWrite;a.setTest(lt),lt&&(a.setMask(W.stencilWriteMask),a.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),a.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),H(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?ft(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function $(W){T!==W&&(W?i.frontFace(i.CW):i.frontFace(i.CCW),T=W)}function U(W){W!==Yl?(ft(i.CULL_FACE),W!==O&&(W===ba?i.cullFace(i.BACK):W===jl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),O=W}function D(W){W!==C&&(it&&i.lineWidth(W),C=W)}function H(W,yt,at){W?(ft(i.POLYGON_OFFSET_FILL),(F!==yt||S!==at)&&(i.polygonOffset(yt,at),F=yt,S=at)):pt(i.POLYGON_OFFSET_FILL)}function et(W){W?ft(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function w(W){W===void 0&&(W=i.TEXTURE0+k-1),tt!==W&&(i.activeTexture(W),tt=W)}function y(W,yt,at){at===void 0&&(tt===null?at=i.TEXTURE0+k-1:at=tt);let lt=ct[at];lt===void 0&&(lt={type:void 0,texture:void 0},ct[at]=lt),(lt.type!==W||lt.texture!==yt)&&(tt!==at&&(i.activeTexture(at),tt=at),i.bindTexture(W,yt||_t[W]),lt.type=W,lt.texture=yt)}function B(){const W=ct[tt];W!==void 0&&W.type!==void 0&&(i.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function X(){try{i.compressedTexImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function mt(){try{i.texSubImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ht(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function vt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Wt(){try{i.texStorage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ut(){try{i.texStorage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Tt(){try{i.texImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Et(){try{i.texImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function It(W){gt.equals(W)===!1&&(i.scissor(W.x,W.y,W.z,W.w),gt.copy(W))}function wt(W){Y.equals(W)===!1&&(i.viewport(W.x,W.y,W.z,W.w),Y.copy(W))}function Ft(W,yt){let at=h.get(yt);at===void 0&&(at=new WeakMap,h.set(yt,at));let lt=at.get(W);lt===void 0&&(lt=i.getUniformBlockIndex(yt,W.name),at.set(W,lt))}function kt(W,yt){const lt=h.get(yt).get(W);l.get(yt)!==lt&&(i.uniformBlockBinding(yt,lt,W.__bindingPointIndex),l.set(yt,lt))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},tt=null,ct={},f={},p=new WeakMap,d=[],v=null,_=!1,m=null,c=null,x=null,M=null,E=null,A=null,I=null,R=new qt(0,0,0),N=0,b=!1,T=null,O=null,C=null,F=null,S=null,gt.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ft,disable:pt,bindFramebuffer:Pt,drawBuffers:At,useProgram:Bt,setBlending:g,setMaterial:ot,setFlipSided:$,setCullFace:U,setLineWidth:D,setPolygonOffset:H,setScissorTest:et,activeTexture:w,bindTexture:y,unbindTexture:B,compressedTexImage2D:Z,compressedTexImage3D:X,texImage2D:Tt,texImage3D:Et,updateUBOMapping:Ft,uniformBlockBinding:kt,texStorage2D:Wt,texStorage3D:ut,texSubImage2D:J,texSubImage3D:mt,compressedTexSubImage2D:ht,compressedTexSubImage3D:vt,scissor:It,viewport:wt,reset:ee}}function Qp(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Gt,u=new WeakMap;let f;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,y){return d?new OffscreenCanvas(w,y):br("canvas")}function _(w,y,B){let Z=1;const X=et(w);if((X.width>B||X.height>B)&&(Z=B/Math.max(X.width,X.height)),Z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const J=Math.floor(Z*X.width),mt=Math.floor(Z*X.height);f===void 0&&(f=v(J,mt));const ht=y?v(J,mt):f;return ht.width=J,ht.height=mt,ht.getContext("2d").drawImage(w,0,0,J,mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+J+"x"+mt+")."),ht}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),w;return w}function m(w){return w.generateMipmaps}function c(w){i.generateMipmap(w)}function x(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(w,y,B,Z,X=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let J=y;if(y===i.RED&&(B===i.FLOAT&&(J=i.R32F),B===i.HALF_FLOAT&&(J=i.R16F),B===i.UNSIGNED_BYTE&&(J=i.R8)),y===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(J=i.R8UI),B===i.UNSIGNED_SHORT&&(J=i.R16UI),B===i.UNSIGNED_INT&&(J=i.R32UI),B===i.BYTE&&(J=i.R8I),B===i.SHORT&&(J=i.R16I),B===i.INT&&(J=i.R32I)),y===i.RG&&(B===i.FLOAT&&(J=i.RG32F),B===i.HALF_FLOAT&&(J=i.RG16F),B===i.UNSIGNED_BYTE&&(J=i.RG8)),y===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(J=i.RG8UI),B===i.UNSIGNED_SHORT&&(J=i.RG16UI),B===i.UNSIGNED_INT&&(J=i.RG32UI),B===i.BYTE&&(J=i.RG8I),B===i.SHORT&&(J=i.RG16I),B===i.INT&&(J=i.RG32I)),y===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(J=i.RGB8UI),B===i.UNSIGNED_SHORT&&(J=i.RGB16UI),B===i.UNSIGNED_INT&&(J=i.RGB32UI),B===i.BYTE&&(J=i.RGB8I),B===i.SHORT&&(J=i.RGB16I),B===i.INT&&(J=i.RGB32I)),y===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),B===i.UNSIGNED_INT&&(J=i.RGBA32UI),B===i.BYTE&&(J=i.RGBA8I),B===i.SHORT&&(J=i.RGBA16I),B===i.INT&&(J=i.RGBA32I)),y===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),y===i.RGBA){const mt=X?Mr:Kt.getTransfer(Z);B===i.FLOAT&&(J=i.RGBA32F),B===i.HALF_FLOAT&&(J=i.RGBA16F),B===i.UNSIGNED_BYTE&&(J=mt===ne?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function E(w,y){let B;return w?y===null||y===kn||y===pi?B=i.DEPTH24_STENCIL8:y===hn?B=i.DEPTH32F_STENCIL8:y===Pi&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===kn||y===pi?B=i.DEPTH_COMPONENT24:y===hn?B=i.DEPTH_COMPONENT32F:y===Pi&&(B=i.DEPTH_COMPONENT16),B}function A(w,y){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ye&&w.minFilter!==Je?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function I(w){const y=w.target;y.removeEventListener("dispose",I),N(y),y.isVideoTexture&&u.delete(y)}function R(w){const y=w.target;y.removeEventListener("dispose",R),T(y)}function N(w){const y=n.get(w);if(y.__webglInit===void 0)return;const B=w.source,Z=p.get(B);if(Z){const X=Z[y.__cacheKey];X.usedTimes--,X.usedTimes===0&&b(w),Object.keys(Z).length===0&&p.delete(B)}n.remove(w)}function b(w){const y=n.get(w);i.deleteTexture(y.__webglTexture);const B=w.source,Z=p.get(B);delete Z[y.__cacheKey],o.memory.textures--}function T(w){const y=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(y.__webglFramebuffer[Z]))for(let X=0;X<y.__webglFramebuffer[Z].length;X++)i.deleteFramebuffer(y.__webglFramebuffer[Z][X]);else i.deleteFramebuffer(y.__webglFramebuffer[Z]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[Z])}else{if(Array.isArray(y.__webglFramebuffer))for(let Z=0;Z<y.__webglFramebuffer.length;Z++)i.deleteFramebuffer(y.__webglFramebuffer[Z]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Z=0;Z<y.__webglColorRenderbuffer.length;Z++)y.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[Z]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const B=w.textures;for(let Z=0,X=B.length;Z<X;Z++){const J=n.get(B[Z]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(B[Z])}n.remove(w)}let O=0;function C(){O=0}function F(){const w=O;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),O+=1,w}function S(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function k(w,y){const B=n.get(w);if(w.isVideoTexture&&D(w),w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){const Z=w.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(B,w,y);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+y)}function it(w,y){const B=n.get(w);if(w.version>0&&B.__version!==w.version){Y(B,w,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+y)}function G(w,y){const B=n.get(w);if(w.version>0&&B.__version!==w.version){Y(B,w,y);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+y)}function Q(w,y){const B=n.get(w);if(w.version>0&&B.__version!==w.version){nt(B,w,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+y)}const tt={[As]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[Rs]:i.MIRRORED_REPEAT},ct={[Ye]:i.NEAREST,[Ec]:i.NEAREST_MIPMAP_NEAREST,[Fi]:i.NEAREST_MIPMAP_LINEAR,[Je]:i.LINEAR,[Ur]:i.LINEAR_MIPMAP_NEAREST,[Bn]:i.LINEAR_MIPMAP_LINEAR},V={[Ac]:i.NEVER,[Ic]:i.ALWAYS,[Rc]:i.LESS,[il]:i.LEQUAL,[Cc]:i.EQUAL,[Dc]:i.GEQUAL,[Pc]:i.GREATER,[Lc]:i.NOTEQUAL};function q(w,y){if(y.type===hn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Je||y.magFilter===Ur||y.magFilter===Fi||y.magFilter===Bn||y.minFilter===Je||y.minFilter===Ur||y.minFilter===Fi||y.minFilter===Bn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,tt[y.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,tt[y.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,tt[y.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ct[y.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ct[y.minFilter]),y.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,V[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ye||y.minFilter!==Fi&&y.minFilter!==Bn||y.type===hn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function gt(w,y){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",I));const Z=y.source;let X=p.get(Z);X===void 0&&(X={},p.set(Z,X));const J=S(y);if(J!==w.__cacheKey){X[J]===void 0&&(X[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),X[J].usedTimes++;const mt=X[w.__cacheKey];mt!==void 0&&(X[w.__cacheKey].usedTimes--,mt.usedTimes===0&&b(y)),w.__cacheKey=J,w.__webglTexture=X[J].texture}return B}function Y(w,y,B){let Z=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Z=i.TEXTURE_3D);const X=gt(w,y),J=y.source;e.bindTexture(Z,w.__webglTexture,i.TEXTURE0+B);const mt=n.get(J);if(J.version!==mt.__version||X===!0){e.activeTexture(i.TEXTURE0+B);const ht=Kt.getPrimaries(Kt.workingColorSpace),vt=y.colorSpace===yn?null:Kt.getPrimaries(y.colorSpace),Wt=y.colorSpace===yn||ht===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let ut=_(y.image,!1,r.maxTextureSize);ut=H(y,ut);const Tt=s.convert(y.format,y.colorSpace),Et=s.convert(y.type);let It=M(y.internalFormat,Tt,Et,y.colorSpace,y.isVideoTexture);q(Z,y);let wt;const Ft=y.mipmaps,kt=y.isVideoTexture!==!0,ee=mt.__version===void 0||X===!0,W=J.dataReady,yt=A(y,ut);if(y.isDepthTexture)It=E(y.format===mi,y.type),ee&&(kt?e.texStorage2D(i.TEXTURE_2D,1,It,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,It,ut.width,ut.height,0,Tt,Et,null));else if(y.isDataTexture)if(Ft.length>0){kt&&ee&&e.texStorage2D(i.TEXTURE_2D,yt,It,Ft[0].width,Ft[0].height);for(let at=0,lt=Ft.length;at<lt;at++)wt=Ft[at],kt?W&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,wt.width,wt.height,Tt,Et,wt.data):e.texImage2D(i.TEXTURE_2D,at,It,wt.width,wt.height,0,Tt,Et,wt.data);y.generateMipmaps=!1}else kt?(ee&&e.texStorage2D(i.TEXTURE_2D,yt,It,ut.width,ut.height),W&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut.width,ut.height,Tt,Et,ut.data)):e.texImage2D(i.TEXTURE_2D,0,It,ut.width,ut.height,0,Tt,Et,ut.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){kt&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,It,Ft[0].width,Ft[0].height,ut.depth);for(let at=0,lt=Ft.length;at<lt;at++)if(wt=Ft[at],y.format!==qe)if(Tt!==null)if(kt){if(W)if(y.layerUpdates.size>0){const St=no(wt.width,wt.height,y.format,y.type);for(const bt of y.layerUpdates){const zt=wt.data.subarray(bt*St/wt.data.BYTES_PER_ELEMENT,(bt+1)*St/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,bt,wt.width,wt.height,1,Tt,zt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,wt.width,wt.height,ut.depth,Tt,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,at,It,wt.width,wt.height,ut.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?W&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,wt.width,wt.height,ut.depth,Tt,Et,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,at,It,wt.width,wt.height,ut.depth,0,Tt,Et,wt.data)}else{kt&&ee&&e.texStorage2D(i.TEXTURE_2D,yt,It,Ft[0].width,Ft[0].height);for(let at=0,lt=Ft.length;at<lt;at++)wt=Ft[at],y.format!==qe?Tt!==null?kt?W&&e.compressedTexSubImage2D(i.TEXTURE_2D,at,0,0,wt.width,wt.height,Tt,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,at,It,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?W&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,wt.width,wt.height,Tt,Et,wt.data):e.texImage2D(i.TEXTURE_2D,at,It,wt.width,wt.height,0,Tt,Et,wt.data)}else if(y.isDataArrayTexture)if(kt){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,It,ut.width,ut.height,ut.depth),W)if(y.layerUpdates.size>0){const at=no(ut.width,ut.height,y.format,y.type);for(const lt of y.layerUpdates){const St=ut.data.subarray(lt*at/ut.data.BYTES_PER_ELEMENT,(lt+1)*at/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,lt,ut.width,ut.height,1,Tt,Et,St)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,Tt,Et,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,It,ut.width,ut.height,ut.depth,0,Tt,Et,ut.data);else if(y.isData3DTexture)kt?(ee&&e.texStorage3D(i.TEXTURE_3D,yt,It,ut.width,ut.height,ut.depth),W&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,Tt,Et,ut.data)):e.texImage3D(i.TEXTURE_3D,0,It,ut.width,ut.height,ut.depth,0,Tt,Et,ut.data);else if(y.isFramebufferTexture){if(ee)if(kt)e.texStorage2D(i.TEXTURE_2D,yt,It,ut.width,ut.height);else{let at=ut.width,lt=ut.height;for(let St=0;St<yt;St++)e.texImage2D(i.TEXTURE_2D,St,It,at,lt,0,Tt,Et,null),at>>=1,lt>>=1}}else if(Ft.length>0){if(kt&&ee){const at=et(Ft[0]);e.texStorage2D(i.TEXTURE_2D,yt,It,at.width,at.height)}for(let at=0,lt=Ft.length;at<lt;at++)wt=Ft[at],kt?W&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,Tt,Et,wt):e.texImage2D(i.TEXTURE_2D,at,It,Tt,Et,wt);y.generateMipmaps=!1}else if(kt){if(ee){const at=et(ut);e.texStorage2D(i.TEXTURE_2D,yt,It,at.width,at.height)}W&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Tt,Et,ut)}else e.texImage2D(i.TEXTURE_2D,0,It,Tt,Et,ut);m(y)&&c(Z),mt.__version=J.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function nt(w,y,B){if(y.image.length!==6)return;const Z=gt(w,y),X=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+B);const J=n.get(X);if(X.version!==J.__version||Z===!0){e.activeTexture(i.TEXTURE0+B);const mt=Kt.getPrimaries(Kt.workingColorSpace),ht=y.colorSpace===yn?null:Kt.getPrimaries(y.colorSpace),vt=y.colorSpace===yn||mt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Wt=y.isCompressedTexture||y.image[0].isCompressedTexture,ut=y.image[0]&&y.image[0].isDataTexture,Tt=[];for(let lt=0;lt<6;lt++)!Wt&&!ut?Tt[lt]=_(y.image[lt],!0,r.maxCubemapSize):Tt[lt]=ut?y.image[lt].image:y.image[lt],Tt[lt]=H(y,Tt[lt]);const Et=Tt[0],It=s.convert(y.format,y.colorSpace),wt=s.convert(y.type),Ft=M(y.internalFormat,It,wt,y.colorSpace),kt=y.isVideoTexture!==!0,ee=J.__version===void 0||Z===!0,W=X.dataReady;let yt=A(y,Et);q(i.TEXTURE_CUBE_MAP,y);let at;if(Wt){kt&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,Ft,Et.width,Et.height);for(let lt=0;lt<6;lt++){at=Tt[lt].mipmaps;for(let St=0;St<at.length;St++){const bt=at[St];y.format!==qe?It!==null?kt?W&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St,0,0,bt.width,bt.height,It,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St,Ft,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St,0,0,bt.width,bt.height,It,wt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St,Ft,bt.width,bt.height,0,It,wt,bt.data)}}}else{if(at=y.mipmaps,kt&&ee){at.length>0&&yt++;const lt=et(Tt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,Ft,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(ut){kt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Tt[lt].width,Tt[lt].height,It,wt,Tt[lt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Ft,Tt[lt].width,Tt[lt].height,0,It,wt,Tt[lt].data);for(let St=0;St<at.length;St++){const zt=at[St].image[lt].image;kt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St+1,0,0,zt.width,zt.height,It,wt,zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St+1,Ft,zt.width,zt.height,0,It,wt,zt.data)}}else{kt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,It,wt,Tt[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Ft,It,wt,Tt[lt]);for(let St=0;St<at.length;St++){const bt=at[St];kt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St+1,0,0,It,wt,bt.image[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St+1,Ft,It,wt,bt.image[lt])}}}m(y)&&c(i.TEXTURE_CUBE_MAP),J.__version=X.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function _t(w,y,B,Z,X,J){const mt=s.convert(B.format,B.colorSpace),ht=s.convert(B.type),vt=M(B.internalFormat,mt,ht,B.colorSpace),Wt=n.get(y),ut=n.get(B);if(ut.__renderTarget=y,!Wt.__hasExternalTextures){const Tt=Math.max(1,y.width>>J),Et=Math.max(1,y.height>>J);X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?e.texImage3D(X,J,vt,Tt,Et,y.depth,0,mt,ht,null):e.texImage2D(X,J,vt,Tt,Et,0,mt,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),U(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,X,ut.__webglTexture,0,$(y)):(X===i.TEXTURE_2D||X>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,X,ut.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(w,y,B){if(i.bindRenderbuffer(i.RENDERBUFFER,w),y.depthBuffer){const Z=y.depthTexture,X=Z&&Z.isDepthTexture?Z.type:null,J=E(y.stencilBuffer,X),mt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=$(y);U(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,J,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,J,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,J,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,mt,i.RENDERBUFFER,w)}else{const Z=y.textures;for(let X=0;X<Z.length;X++){const J=Z[X],mt=s.convert(J.format,J.colorSpace),ht=s.convert(J.type),vt=M(J.internalFormat,mt,ht,J.colorSpace),Wt=$(y);B&&U(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,vt,y.width,y.height):U(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt,vt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,vt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(w,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(y.depthTexture);Z.__renderTarget=y,(!Z.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),k(y.depthTexture,0);const X=Z.__webglTexture,J=$(y);if(y.depthTexture.format===ci)U(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0);else if(y.depthTexture.format===mi)U(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function Pt(w){const y=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){const Z=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Z){const X=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Z.removeEventListener("dispose",X)};Z.addEventListener("dispose",X),y.__depthDisposeCallback=X}y.__boundDepthTexture=Z}if(w.depthTexture&&!y.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");pt(y.__webglFramebuffer,w)}else if(B){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]===void 0)y.__webglDepthbuffer[Z]=i.createRenderbuffer(),ft(y.__webglDepthbuffer[Z],w,!1);else{const X=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),ft(y.__webglDepthbuffer,w,!1);else{const Z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,X)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function At(w,y,B){const Z=n.get(w);y!==void 0&&_t(Z.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Pt(w)}function Bt(w){const y=w.texture,B=n.get(w),Z=n.get(y);w.addEventListener("dispose",R);const X=w.textures,J=w.isWebGLCubeRenderTarget===!0,mt=X.length>1;if(mt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=y.version,o.memory.textures++),J){B.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[ht]=[];for(let vt=0;vt<y.mipmaps.length;vt++)B.__webglFramebuffer[ht][vt]=i.createFramebuffer()}else B.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let ht=0;ht<y.mipmaps.length;ht++)B.__webglFramebuffer[ht]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(mt)for(let ht=0,vt=X.length;ht<vt;ht++){const Wt=n.get(X[ht]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&U(w)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ht=0;ht<X.length;ht++){const vt=X[ht];B.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ht]);const Wt=s.convert(vt.format,vt.colorSpace),ut=s.convert(vt.type),Tt=M(vt.internalFormat,Wt,ut,vt.colorSpace,w.isXRRenderTarget===!0),Et=$(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Et,Tt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,B.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(B.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),q(i.TEXTURE_CUBE_MAP,y);for(let ht=0;ht<6;ht++)if(y.mipmaps&&y.mipmaps.length>0)for(let vt=0;vt<y.mipmaps.length;vt++)_t(B.__webglFramebuffer[ht][vt],w,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,vt);else _t(B.__webglFramebuffer[ht],w,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(y)&&c(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(mt){for(let ht=0,vt=X.length;ht<vt;ht++){const Wt=X[ht],ut=n.get(Wt);e.bindTexture(i.TEXTURE_2D,ut.__webglTexture),q(i.TEXTURE_2D,Wt),_t(B.__webglFramebuffer,w,Wt,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,0),m(Wt)&&c(i.TEXTURE_2D)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ht=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,Z.__webglTexture),q(ht,y),y.mipmaps&&y.mipmaps.length>0)for(let vt=0;vt<y.mipmaps.length;vt++)_t(B.__webglFramebuffer[vt],w,y,i.COLOR_ATTACHMENT0,ht,vt);else _t(B.__webglFramebuffer,w,y,i.COLOR_ATTACHMENT0,ht,0);m(y)&&c(ht),e.unbindTexture()}w.depthBuffer&&Pt(w)}function Yt(w){const y=w.textures;for(let B=0,Z=y.length;B<Z;B++){const X=y[B];if(m(X)){const J=x(w),mt=n.get(X).__webglTexture;e.bindTexture(J,mt),c(J),e.unbindTexture()}}}const Ut=[],g=[];function ot(w){if(w.samples>0){if(U(w)===!1){const y=w.textures,B=w.width,Z=w.height;let X=i.COLOR_BUFFER_BIT;const J=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=n.get(w),ht=y.length>1;if(ht)for(let vt=0;vt<y.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let vt=0;vt<y.length;vt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(X|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(X|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,mt.__webglColorRenderbuffer[vt]);const Wt=n.get(y[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Wt,0)}i.blitFramebuffer(0,0,B,Z,0,0,B,Z,X,i.NEAREST),l===!0&&(Ut.length=0,g.length=0,Ut.push(i.COLOR_ATTACHMENT0+vt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ut.push(J),g.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,g)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let vt=0;vt<y.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,mt.__webglColorRenderbuffer[vt]);const Wt=n.get(y[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,Wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function $(w){return Math.min(r.maxSamples,w.samples)}function U(w){const y=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function D(w){const y=o.render.frame;u.get(w)!==y&&(u.set(w,y),w.update())}function H(w,y){const B=w.colorSpace,Z=w.format,X=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==_i&&B!==yn&&(Kt.getTransfer(B)===ne?(Z!==qe||X!==fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),y}function et(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(h.width=w.naturalWidth||w.width,h.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(h.width=w.displayWidth,h.height=w.displayHeight):(h.width=w.width,h.height=w.height),h}this.allocateTextureUnit=F,this.resetTextureUnits=C,this.setTexture2D=k,this.setTexture2DArray=it,this.setTexture3D=G,this.setTextureCube=Q,this.rebindTextures=At,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=ot,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=U}function tm(i,t){function e(n,r=yn){let s;const o=Kt.getTransfer(r);if(n===fn)return i.UNSIGNED_BYTE;if(n===oa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===la)return i.UNSIGNED_SHORT_5_5_5_1;if(n===jo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qo)return i.BYTE;if(n===Yo)return i.SHORT;if(n===Pi)return i.UNSIGNED_SHORT;if(n===aa)return i.INT;if(n===kn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===Li)return i.HALF_FLOAT;if(n===Zo)return i.ALPHA;if(n===Ko)return i.RGB;if(n===qe)return i.RGBA;if(n===$o)return i.LUMINANCE;if(n===Jo)return i.LUMINANCE_ALPHA;if(n===ci)return i.DEPTH_COMPONENT;if(n===mi)return i.DEPTH_STENCIL;if(n===Qo)return i.RED;if(n===ca)return i.RED_INTEGER;if(n===tl)return i.RG;if(n===ha)return i.RG_INTEGER;if(n===ua)return i.RGBA_INTEGER;if(n===ur||n===dr||n===fr||n===pr)if(o===ne)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ur)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ur)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===dr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Cs||n===Ps||n===Ls||n===Ds)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Cs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ps)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ls)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ds)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Is||n===Us||n===Ns)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Is||n===Us)return o===ne?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ns)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Fs||n===Os||n===Bs||n===ks||n===zs||n===Hs||n===Gs||n===Vs||n===Ws||n===Xs||n===qs||n===Ys||n===js||n===Zs)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Fs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Os)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Bs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ks)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===zs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Hs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Gs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ws)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ys)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===js)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Zs)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mr||n===Ks||n===$s)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===mr)return o===ne?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ks)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$s)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===el||n===Js||n===Qs||n===ta)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===mr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Js)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ta)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===pi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nm=`
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

}`;class im{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Re,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Tn({vertexShader:em,fragmentShader:nm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Qe(new Cr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rm extends Gn{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,h=null,u=null,f=null,p=null,d=null,v=null;const _=new im,m=e.getContextAttributes();let c=null,x=null;const M=[],E=[],A=new Gt;let I=null;const R=new Oe;R.viewport=new ce;const N=new Oe;N.viewport=new ce;const b=[R,N],T=new Mh;let O=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let nt=M[Y];return nt===void 0&&(nt=new es,M[Y]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Y){let nt=M[Y];return nt===void 0&&(nt=new es,M[Y]=nt),nt.getGripSpace()},this.getHand=function(Y){let nt=M[Y];return nt===void 0&&(nt=new es,M[Y]=nt),nt.getHandSpace()};function F(Y){const nt=E.indexOf(Y.inputSource);if(nt===-1)return;const _t=M[nt];_t!==void 0&&(_t.update(Y.inputSource,Y.frame,h||o),_t.dispatchEvent({type:Y.type,data:Y.inputSource}))}function S(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",S),r.removeEventListener("inputsourceschange",k);for(let Y=0;Y<M.length;Y++){const nt=E[Y];nt!==null&&(E[Y]=null,M[Y].disconnect(nt))}O=null,C=null,_.reset(),t.setRenderTarget(c),d=null,p=null,f=null,r=null,x=null,gt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(c=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",S),r.addEventListener("inputsourceschange",k),m.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(A),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,ft=null,pt=null;m.depth&&(pt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=m.stencil?mi:ci,ft=m.stencil?pi:kn);const Pt={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:s};f=new XRWebGLBinding(r,e),p=f.createProjectionLayer(Pt),r.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),x=new zn(p.textureWidth,p.textureHeight,{format:qe,type:fn,depthTexture:new _l(p.textureWidth,p.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}else{const _t={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,_t),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new zn(d.framebufferWidth,d.framebufferHeight,{format:qe,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}x.isXRRenderTarget=!0,this.setFoveation(l),h=null,o=await r.requestReferenceSpace(a),gt.setContext(r),gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function k(Y){for(let nt=0;nt<Y.removed.length;nt++){const _t=Y.removed[nt],ft=E.indexOf(_t);ft>=0&&(E[ft]=null,M[ft].disconnect(_t))}for(let nt=0;nt<Y.added.length;nt++){const _t=Y.added[nt];let ft=E.indexOf(_t);if(ft===-1){for(let Pt=0;Pt<M.length;Pt++)if(Pt>=E.length){E.push(_t),ft=Pt;break}else if(E[Pt]===null){E[Pt]=_t,ft=Pt;break}if(ft===-1)break}const pt=M[ft];pt&&pt.connect(_t)}}const it=new z,G=new z;function Q(Y,nt,_t){it.setFromMatrixPosition(nt.matrixWorld),G.setFromMatrixPosition(_t.matrixWorld);const ft=it.distanceTo(G),pt=nt.projectionMatrix.elements,Pt=_t.projectionMatrix.elements,At=pt[14]/(pt[10]-1),Bt=pt[14]/(pt[10]+1),Yt=(pt[9]+1)/pt[5],Ut=(pt[9]-1)/pt[5],g=(pt[8]-1)/pt[0],ot=(Pt[8]+1)/Pt[0],$=At*g,U=At*ot,D=ft/(-g+ot),H=D*-g;if(nt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(H),Y.translateZ(D),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),pt[10]===-1)Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const et=At+D,w=Bt+D,y=$-H,B=U+(ft-H),Z=Yt*Bt/w*et,X=Ut*Bt/w*et;Y.projectionMatrix.makePerspective(y,B,Z,X,et,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function tt(Y,nt){nt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(nt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let nt=Y.near,_t=Y.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(_t=_.depthFar)),T.near=N.near=R.near=nt,T.far=N.far=R.far=_t,(O!==T.near||C!==T.far)&&(r.updateRenderState({depthNear:T.near,depthFar:T.far}),O=T.near,C=T.far),R.layers.mask=Y.layers.mask|2,N.layers.mask=Y.layers.mask|4,T.layers.mask=R.layers.mask|N.layers.mask;const ft=Y.parent,pt=T.cameras;tt(T,ft);for(let Pt=0;Pt<pt.length;Pt++)tt(pt[Pt],ft);pt.length===2?Q(T,R,N):T.projectionMatrix.copy(R.projectionMatrix),ct(Y,T,ft)};function ct(Y,nt,_t){_t===null?Y.matrix.copy(nt.matrixWorld):(Y.matrix.copy(_t.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(nt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ea*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(p===null&&d===null))return l},this.setFoveation=function(Y){l=Y,p!==null&&(p.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(T)};let V=null;function q(Y,nt){if(u=nt.getViewerPose(h||o),v=nt,u!==null){const _t=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let ft=!1;_t.length!==T.cameras.length&&(T.cameras.length=0,ft=!0);for(let At=0;At<_t.length;At++){const Bt=_t[At];let Yt=null;if(d!==null)Yt=d.getViewport(Bt);else{const g=f.getViewSubImage(p,Bt);Yt=g.viewport,At===0&&(t.setRenderTargetTextures(x,g.colorTexture,p.ignoreDepthValues?void 0:g.depthStencilTexture),t.setRenderTarget(x))}let Ut=b[At];Ut===void 0&&(Ut=new Oe,Ut.layers.enable(At),Ut.viewport=new ce,b[At]=Ut),Ut.matrix.fromArray(Bt.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(Bt.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),At===0&&(T.matrix.copy(Ut.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),ft===!0&&T.cameras.push(Ut)}const pt=r.enabledFeatures;if(pt&&pt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){const At=f.getDepthInformation(_t[0]);At&&At.isValid&&At.texture&&_.init(t,At,r.renderState)}}for(let _t=0;_t<M.length;_t++){const ft=E[_t],pt=M[_t];ft!==null&&pt!==void 0&&pt.update(ft,nt,h||o)}V&&V(Y,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),v=null}const gt=new xl;gt.setAnimationLoop(q),this.setAnimationLoop=function(Y){V=Y},this.dispose=function(){}}}const In=new tn,sm=new ae;function am(i,t){function e(m,c){m.matrixAutoUpdate===!0&&m.updateMatrix(),c.value.copy(m.matrix)}function n(m,c){c.color.getRGB(m.fogColor.value,dl(i)),c.isFog?(m.fogNear.value=c.near,m.fogFar.value=c.far):c.isFogExp2&&(m.fogDensity.value=c.density)}function r(m,c,x,M,E){c.isMeshBasicMaterial||c.isMeshLambertMaterial?s(m,c):c.isMeshToonMaterial?(s(m,c),f(m,c)):c.isMeshPhongMaterial?(s(m,c),u(m,c)):c.isMeshStandardMaterial?(s(m,c),p(m,c),c.isMeshPhysicalMaterial&&d(m,c,E)):c.isMeshMatcapMaterial?(s(m,c),v(m,c)):c.isMeshDepthMaterial?s(m,c):c.isMeshDistanceMaterial?(s(m,c),_(m,c)):c.isMeshNormalMaterial?s(m,c):c.isLineBasicMaterial?(o(m,c),c.isLineDashedMaterial&&a(m,c)):c.isPointsMaterial?l(m,c,x,M):c.isSpriteMaterial?h(m,c):c.isShadowMaterial?(m.color.value.copy(c.color),m.opacity.value=c.opacity):c.isShaderMaterial&&(c.uniformsNeedUpdate=!1)}function s(m,c){m.opacity.value=c.opacity,c.color&&m.diffuse.value.copy(c.color),c.emissive&&m.emissive.value.copy(c.emissive).multiplyScalar(c.emissiveIntensity),c.map&&(m.map.value=c.map,e(c.map,m.mapTransform)),c.alphaMap&&(m.alphaMap.value=c.alphaMap,e(c.alphaMap,m.alphaMapTransform)),c.bumpMap&&(m.bumpMap.value=c.bumpMap,e(c.bumpMap,m.bumpMapTransform),m.bumpScale.value=c.bumpScale,c.side===Ae&&(m.bumpScale.value*=-1)),c.normalMap&&(m.normalMap.value=c.normalMap,e(c.normalMap,m.normalMapTransform),m.normalScale.value.copy(c.normalScale),c.side===Ae&&m.normalScale.value.negate()),c.displacementMap&&(m.displacementMap.value=c.displacementMap,e(c.displacementMap,m.displacementMapTransform),m.displacementScale.value=c.displacementScale,m.displacementBias.value=c.displacementBias),c.emissiveMap&&(m.emissiveMap.value=c.emissiveMap,e(c.emissiveMap,m.emissiveMapTransform)),c.specularMap&&(m.specularMap.value=c.specularMap,e(c.specularMap,m.specularMapTransform)),c.alphaTest>0&&(m.alphaTest.value=c.alphaTest);const x=t.get(c),M=x.envMap,E=x.envMapRotation;M&&(m.envMap.value=M,In.copy(E),In.x*=-1,In.y*=-1,In.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(In.y*=-1,In.z*=-1),m.envMapRotation.value.setFromMatrix4(sm.makeRotationFromEuler(In)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=c.reflectivity,m.ior.value=c.ior,m.refractionRatio.value=c.refractionRatio),c.lightMap&&(m.lightMap.value=c.lightMap,m.lightMapIntensity.value=c.lightMapIntensity,e(c.lightMap,m.lightMapTransform)),c.aoMap&&(m.aoMap.value=c.aoMap,m.aoMapIntensity.value=c.aoMapIntensity,e(c.aoMap,m.aoMapTransform))}function o(m,c){m.diffuse.value.copy(c.color),m.opacity.value=c.opacity,c.map&&(m.map.value=c.map,e(c.map,m.mapTransform))}function a(m,c){m.dashSize.value=c.dashSize,m.totalSize.value=c.dashSize+c.gapSize,m.scale.value=c.scale}function l(m,c,x,M){m.diffuse.value.copy(c.color),m.opacity.value=c.opacity,m.size.value=c.size*x,m.scale.value=M*.5,c.map&&(m.map.value=c.map,e(c.map,m.uvTransform)),c.alphaMap&&(m.alphaMap.value=c.alphaMap,e(c.alphaMap,m.alphaMapTransform)),c.alphaTest>0&&(m.alphaTest.value=c.alphaTest)}function h(m,c){m.diffuse.value.copy(c.color),m.opacity.value=c.opacity,m.rotation.value=c.rotation,c.map&&(m.map.value=c.map,e(c.map,m.mapTransform)),c.alphaMap&&(m.alphaMap.value=c.alphaMap,e(c.alphaMap,m.alphaMapTransform)),c.alphaTest>0&&(m.alphaTest.value=c.alphaTest)}function u(m,c){m.specular.value.copy(c.specular),m.shininess.value=Math.max(c.shininess,1e-4)}function f(m,c){c.gradientMap&&(m.gradientMap.value=c.gradientMap)}function p(m,c){m.metalness.value=c.metalness,c.metalnessMap&&(m.metalnessMap.value=c.metalnessMap,e(c.metalnessMap,m.metalnessMapTransform)),m.roughness.value=c.roughness,c.roughnessMap&&(m.roughnessMap.value=c.roughnessMap,e(c.roughnessMap,m.roughnessMapTransform)),c.envMap&&(m.envMapIntensity.value=c.envMapIntensity)}function d(m,c,x){m.ior.value=c.ior,c.sheen>0&&(m.sheenColor.value.copy(c.sheenColor).multiplyScalar(c.sheen),m.sheenRoughness.value=c.sheenRoughness,c.sheenColorMap&&(m.sheenColorMap.value=c.sheenColorMap,e(c.sheenColorMap,m.sheenColorMapTransform)),c.sheenRoughnessMap&&(m.sheenRoughnessMap.value=c.sheenRoughnessMap,e(c.sheenRoughnessMap,m.sheenRoughnessMapTransform))),c.clearcoat>0&&(m.clearcoat.value=c.clearcoat,m.clearcoatRoughness.value=c.clearcoatRoughness,c.clearcoatMap&&(m.clearcoatMap.value=c.clearcoatMap,e(c.clearcoatMap,m.clearcoatMapTransform)),c.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=c.clearcoatRoughnessMap,e(c.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),c.clearcoatNormalMap&&(m.clearcoatNormalMap.value=c.clearcoatNormalMap,e(c.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(c.clearcoatNormalScale),c.side===Ae&&m.clearcoatNormalScale.value.negate())),c.dispersion>0&&(m.dispersion.value=c.dispersion),c.iridescence>0&&(m.iridescence.value=c.iridescence,m.iridescenceIOR.value=c.iridescenceIOR,m.iridescenceThicknessMinimum.value=c.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=c.iridescenceThicknessRange[1],c.iridescenceMap&&(m.iridescenceMap.value=c.iridescenceMap,e(c.iridescenceMap,m.iridescenceMapTransform)),c.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=c.iridescenceThicknessMap,e(c.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),c.transmission>0&&(m.transmission.value=c.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),c.transmissionMap&&(m.transmissionMap.value=c.transmissionMap,e(c.transmissionMap,m.transmissionMapTransform)),m.thickness.value=c.thickness,c.thicknessMap&&(m.thicknessMap.value=c.thicknessMap,e(c.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=c.attenuationDistance,m.attenuationColor.value.copy(c.attenuationColor)),c.anisotropy>0&&(m.anisotropyVector.value.set(c.anisotropy*Math.cos(c.anisotropyRotation),c.anisotropy*Math.sin(c.anisotropyRotation)),c.anisotropyMap&&(m.anisotropyMap.value=c.anisotropyMap,e(c.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=c.specularIntensity,m.specularColor.value.copy(c.specularColor),c.specularColorMap&&(m.specularColorMap.value=c.specularColorMap,e(c.specularColorMap,m.specularColorMapTransform)),c.specularIntensityMap&&(m.specularIntensityMap.value=c.specularIntensityMap,e(c.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,c){c.matcap&&(m.matcap.value=c.matcap)}function _(m,c){const x=t.get(c).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function om(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const E=M.program;n.uniformBlockBinding(x,E)}function h(x,M){let E=r[x.id];E===void 0&&(v(x),E=u(x),r[x.id]=E,x.addEventListener("dispose",m));const A=M.program;n.updateUBOMapping(x,A);const I=t.render.frame;s[x.id]!==I&&(p(x),s[x.id]=I)}function u(x){const M=f();x.__bindingPointIndex=M;const E=i.createBuffer(),A=x.__size,I=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,A,I),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,E),E}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(x){const M=r[x.id],E=x.uniforms,A=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let I=0,R=E.length;I<R;I++){const N=Array.isArray(E[I])?E[I]:[E[I]];for(let b=0,T=N.length;b<T;b++){const O=N[b];if(d(O,I,b,A)===!0){const C=O.__offset,F=Array.isArray(O.value)?O.value:[O.value];let S=0;for(let k=0;k<F.length;k++){const it=F[k],G=_(it);typeof it=="number"||typeof it=="boolean"?(O.__data[0]=it,i.bufferSubData(i.UNIFORM_BUFFER,C+S,O.__data)):it.isMatrix3?(O.__data[0]=it.elements[0],O.__data[1]=it.elements[1],O.__data[2]=it.elements[2],O.__data[3]=0,O.__data[4]=it.elements[3],O.__data[5]=it.elements[4],O.__data[6]=it.elements[5],O.__data[7]=0,O.__data[8]=it.elements[6],O.__data[9]=it.elements[7],O.__data[10]=it.elements[8],O.__data[11]=0):(it.toArray(O.__data,S),S+=G.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,C,O.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,M,E,A){const I=x.value,R=M+"_"+E;if(A[R]===void 0)return typeof I=="number"||typeof I=="boolean"?A[R]=I:A[R]=I.clone(),!0;{const N=A[R];if(typeof I=="number"||typeof I=="boolean"){if(N!==I)return A[R]=I,!0}else if(N.equals(I)===!1)return N.copy(I),!0}return!1}function v(x){const M=x.uniforms;let E=0;const A=16;for(let R=0,N=M.length;R<N;R++){const b=Array.isArray(M[R])?M[R]:[M[R]];for(let T=0,O=b.length;T<O;T++){const C=b[T],F=Array.isArray(C.value)?C.value:[C.value];for(let S=0,k=F.length;S<k;S++){const it=F[S],G=_(it),Q=E%A,tt=Q%G.boundary,ct=Q+tt;E+=tt,ct!==0&&A-ct<G.storage&&(E+=A-ct),C.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=E,E+=G.storage}}}const I=E%A;return I>0&&(E+=A-I),x.__size=E,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const E=o.indexOf(M.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function c(){for(const x in r)i.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:h,dispose:c}}class lm{constructor(t={}){const{canvas:e=Fc(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const v=new Uint32Array(4),_=new Int32Array(4);let m=null,c=null;const x=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fe,this.toneMapping=Mn,this.toneMappingExposure=1;const E=this;let A=!1,I=0,R=0,N=null,b=-1,T=null;const O=new ce,C=new ce;let F=null;const S=new qt(0);let k=0,it=e.width,G=e.height,Q=1,tt=null,ct=null;const V=new ce(0,0,it,G),q=new ce(0,0,it,G);let gt=!1;const Y=new fa;let nt=!1,_t=!1;this.transmissionResolutionScale=1;const ft=new ae,pt=new ae,Pt=new z,At=new ce,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function Ut(){return N===null?Q:1}let g=n;function ot(P,j){return e.getContext(P,j)}try{const P={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sa}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",bt,!1),g===null){const j="webgl2";if(g=ot(j,P),g===null)throw ot(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let $,U,D,H,et,w,y,B,Z,X,J,mt,ht,vt,Wt,ut,Tt,Et,It,wt,Ft,kt,ee,W;function yt(){$=new vf(g),$.init(),kt=new tm(g,$),U=new df(g,$,t,kt),D=new Jp(g,$),U.reverseDepthBuffer&&p&&D.buffers.depth.setReversed(!0),H=new Sf(g),et=new kp,w=new Qp(g,$,D,et,U,kt,H),y=new pf(E),B=new gf(E),Z=new Ah(g),ee=new hf(g,Z),X=new xf(g,Z,H,ee),J=new Ef(g,X,Z,H),It=new Mf(g,U,w),ut=new ff(et),mt=new Bp(E,y,B,$,U,ee,ut),ht=new am(E,et),vt=new Hp,Wt=new Yp($),Et=new cf(E,y,B,D,J,d,l),Tt=new Kp(E,J,U),W=new om(g,H,U,D),wt=new uf(g,$,H),Ft=new yf(g,$,H),H.programs=mt.programs,E.capabilities=U,E.extensions=$,E.properties=et,E.renderLists=vt,E.shadowMap=Tt,E.state=D,E.info=H}yt();const at=new rm(E,g);this.xr=at,this.getContext=function(){return g},this.getContextAttributes=function(){return g.getContextAttributes()},this.forceContextLoss=function(){const P=$.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=$.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(P){P!==void 0&&(Q=P,this.setSize(it,G,!1))},this.getSize=function(P){return P.set(it,G)},this.setSize=function(P,j,rt=!0){if(at.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}it=P,G=j,e.width=Math.floor(P*Q),e.height=Math.floor(j*Q),rt===!0&&(e.style.width=P+"px",e.style.height=j+"px"),this.setViewport(0,0,P,j)},this.getDrawingBufferSize=function(P){return P.set(it*Q,G*Q).floor()},this.setDrawingBufferSize=function(P,j,rt){it=P,G=j,Q=rt,e.width=Math.floor(P*rt),e.height=Math.floor(j*rt),this.setViewport(0,0,P,j)},this.getCurrentViewport=function(P){return P.copy(O)},this.getViewport=function(P){return P.copy(V)},this.setViewport=function(P,j,rt,st){P.isVector4?V.set(P.x,P.y,P.z,P.w):V.set(P,j,rt,st),D.viewport(O.copy(V).multiplyScalar(Q).round())},this.getScissor=function(P){return P.copy(q)},this.setScissor=function(P,j,rt,st){P.isVector4?q.set(P.x,P.y,P.z,P.w):q.set(P,j,rt,st),D.scissor(C.copy(q).multiplyScalar(Q).round())},this.getScissorTest=function(){return gt},this.setScissorTest=function(P){D.setScissorTest(gt=P)},this.setOpaqueSort=function(P){tt=P},this.setTransparentSort=function(P){ct=P},this.getClearColor=function(P){return P.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(P=!0,j=!0,rt=!0){let st=0;if(P){let K=!1;if(N!==null){const dt=N.texture.format;K=dt===ua||dt===ha||dt===ca}if(K){const dt=N.texture.type,Mt=dt===fn||dt===kn||dt===Pi||dt===pi||dt===oa||dt===la,Rt=Et.getClearColor(),Ct=Et.getClearAlpha(),Nt=Rt.r,Ot=Rt.g,Lt=Rt.b;Mt?(v[0]=Nt,v[1]=Ot,v[2]=Lt,v[3]=Ct,g.clearBufferuiv(g.COLOR,0,v)):(_[0]=Nt,_[1]=Ot,_[2]=Lt,_[3]=Ct,g.clearBufferiv(g.COLOR,0,_))}else st|=g.COLOR_BUFFER_BIT}j&&(st|=g.DEPTH_BUFFER_BIT),rt&&(st|=g.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),g.clear(st)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Et.dispose(),vt.dispose(),Wt.dispose(),et.dispose(),y.dispose(),B.dispose(),J.dispose(),ee.dispose(),W.dispose(),mt.dispose(),at.dispose(),at.removeEventListener("sessionstart",ga),at.removeEventListener("sessionend",va),wn.stop()};function lt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const P=H.autoReset,j=Tt.enabled,rt=Tt.autoUpdate,st=Tt.needsUpdate,K=Tt.type;yt(),H.autoReset=P,Tt.enabled=j,Tt.autoUpdate=rt,Tt.needsUpdate=st,Tt.type=K}function bt(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function zt(P){const j=P.target;j.removeEventListener("dispose",zt),oe(j)}function oe(P){xe(P),et.remove(P)}function xe(P){const j=et.get(P).programs;j!==void 0&&(j.forEach(function(rt){mt.releaseProgram(rt)}),P.isShaderMaterial&&mt.releaseShaderCache(P))}this.renderBufferDirect=function(P,j,rt,st,K,dt){j===null&&(j=Bt);const Mt=K.isMesh&&K.matrixWorld.determinant()<0,Rt=Al(P,j,rt,st,K);D.setMaterial(st,Mt);let Ct=rt.index,Nt=1;if(st.wireframe===!0){if(Ct=X.getWireframeAttribute(rt),Ct===void 0)return;Nt=2}const Ot=rt.drawRange,Lt=rt.attributes.position;let jt=Ot.start*Nt,$t=(Ot.start+Ot.count)*Nt;dt!==null&&(jt=Math.max(jt,dt.start*Nt),$t=Math.min($t,(dt.start+dt.count)*Nt)),Ct!==null?(jt=Math.max(jt,0),$t=Math.min($t,Ct.count)):Lt!=null&&(jt=Math.max(jt,0),$t=Math.min($t,Lt.count));const he=$t-jt;if(he<0||he===1/0)return;ee.setup(K,st,Rt,rt,Ct);let le,Zt=wt;if(Ct!==null&&(le=Z.get(Ct),Zt=Ft,Zt.setIndex(le)),K.isMesh)st.wireframe===!0?(D.setLineWidth(st.wireframeLinewidth*Ut()),Zt.setMode(g.LINES)):Zt.setMode(g.TRIANGLES);else if(K.isLine){let Dt=st.linewidth;Dt===void 0&&(Dt=1),D.setLineWidth(Dt*Ut()),K.isLineSegments?Zt.setMode(g.LINES):K.isLineLoop?Zt.setMode(g.LINE_LOOP):Zt.setMode(g.LINE_STRIP)}else K.isPoints?Zt.setMode(g.POINTS):K.isSprite&&Zt.setMode(g.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)Zt.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if($.get("WEBGL_multi_draw"))Zt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Dt=K._multiDrawStarts,ge=K._multiDrawCounts,Jt=K._multiDrawCount,ze=Ct?Z.get(Ct).bytesPerElement:1,Vn=et.get(st).currentProgram.getUniforms();for(let Ce=0;Ce<Jt;Ce++)Vn.setValue(g,"_gl_DrawID",Ce),Zt.render(Dt[Ce]/ze,ge[Ce])}else if(K.isInstancedMesh)Zt.renderInstances(jt,he,K.count);else if(rt.isInstancedBufferGeometry){const Dt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,ge=Math.min(rt.instanceCount,Dt);Zt.renderInstances(jt,he,ge)}else Zt.render(jt,he)};function te(P,j,rt){P.transparent===!0&&P.side===$e&&P.forceSinglePass===!1?(P.side=Ae,P.needsUpdate=!0,Ni(P,j,rt),P.side=En,P.needsUpdate=!0,Ni(P,j,rt),P.side=$e):Ni(P,j,rt)}this.compile=function(P,j,rt=null){rt===null&&(rt=P),c=Wt.get(rt),c.init(j),M.push(c),rt.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(c.pushLight(K),K.castShadow&&c.pushShadow(K))}),P!==rt&&P.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(c.pushLight(K),K.castShadow&&c.pushShadow(K))}),c.setupLights();const st=new Set;return P.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const dt=K.material;if(dt)if(Array.isArray(dt))for(let Mt=0;Mt<dt.length;Mt++){const Rt=dt[Mt];te(Rt,rt,K),st.add(Rt)}else te(dt,rt,K),st.add(dt)}),M.pop(),c=null,st},this.compileAsync=function(P,j,rt=null){const st=this.compile(P,j,rt);return new Promise(K=>{function dt(){if(st.forEach(function(Mt){et.get(Mt).currentProgram.isReady()&&st.delete(Mt)}),st.size===0){K(P);return}setTimeout(dt,10)}$.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let ke=null;function en(P){ke&&ke(P)}function ga(){wn.stop()}function va(){wn.start()}const wn=new xl;wn.setAnimationLoop(en),typeof self<"u"&&wn.setContext(self),this.setAnimationLoop=function(P){ke=P,at.setAnimationLoop(P),P===null?wn.stop():wn.start()},at.addEventListener("sessionstart",ga),at.addEventListener("sessionend",va),this.render=function(P,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(at.cameraAutoUpdate===!0&&at.updateCamera(j),j=at.getCamera()),P.isScene===!0&&P.onBeforeRender(E,P,j,N),c=Wt.get(P,M.length),c.init(j),M.push(c),pt.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),Y.setFromProjectionMatrix(pt),_t=this.localClippingEnabled,nt=ut.init(this.clippingPlanes,_t),m=vt.get(P,x.length),m.init(),x.push(m),at.enabled===!0&&at.isPresenting===!0){const dt=E.xr.getDepthSensingMesh();dt!==null&&Lr(dt,j,-1/0,E.sortObjects)}Lr(P,j,0,E.sortObjects),m.finish(),E.sortObjects===!0&&m.sort(tt,ct),Yt=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Yt&&Et.addToRenderList(m,P),this.info.render.frame++,nt===!0&&ut.beginShadows();const rt=c.state.shadowsArray;Tt.render(rt,P,j),nt===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const st=m.opaque,K=m.transmissive;if(c.setupLights(),j.isArrayCamera){const dt=j.cameras;if(K.length>0)for(let Mt=0,Rt=dt.length;Mt<Rt;Mt++){const Ct=dt[Mt];ya(st,K,P,Ct)}Yt&&Et.render(P);for(let Mt=0,Rt=dt.length;Mt<Rt;Mt++){const Ct=dt[Mt];xa(m,P,Ct,Ct.viewport)}}else K.length>0&&ya(st,K,P,j),Yt&&Et.render(P),xa(m,P,j);N!==null&&R===0&&(w.updateMultisampleRenderTarget(N),w.updateRenderTargetMipmap(N)),P.isScene===!0&&P.onAfterRender(E,P,j),ee.resetDefaultState(),b=-1,T=null,M.pop(),M.length>0?(c=M[M.length-1],nt===!0&&ut.setGlobalState(E.clippingPlanes,c.state.camera)):c=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Lr(P,j,rt,st){if(P.visible===!1)return;if(P.layers.test(j.layers)){if(P.isGroup)rt=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(j);else if(P.isLight)c.pushLight(P),P.castShadow&&c.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||Y.intersectsSprite(P)){st&&At.setFromMatrixPosition(P.matrixWorld).applyMatrix4(pt);const Mt=J.update(P),Rt=P.material;Rt.visible&&m.push(P,Mt,Rt,rt,At.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||Y.intersectsObject(P))){const Mt=J.update(P),Rt=P.material;if(st&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),At.copy(P.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),At.copy(Mt.boundingSphere.center)),At.applyMatrix4(P.matrixWorld).applyMatrix4(pt)),Array.isArray(Rt)){const Ct=Mt.groups;for(let Nt=0,Ot=Ct.length;Nt<Ot;Nt++){const Lt=Ct[Nt],jt=Rt[Lt.materialIndex];jt&&jt.visible&&m.push(P,Mt,jt,rt,At.z,Lt)}}else Rt.visible&&m.push(P,Mt,Rt,rt,At.z,null)}}const dt=P.children;for(let Mt=0,Rt=dt.length;Mt<Rt;Mt++)Lr(dt[Mt],j,rt,st)}function xa(P,j,rt,st){const K=P.opaque,dt=P.transmissive,Mt=P.transparent;c.setupLightsView(rt),nt===!0&&ut.setGlobalState(E.clippingPlanes,rt),st&&D.viewport(O.copy(st)),K.length>0&&Ui(K,j,rt),dt.length>0&&Ui(dt,j,rt),Mt.length>0&&Ui(Mt,j,rt),D.buffers.depth.setTest(!0),D.buffers.depth.setMask(!0),D.buffers.color.setMask(!0),D.setPolygonOffset(!1)}function ya(P,j,rt,st){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;c.state.transmissionRenderTarget[st.id]===void 0&&(c.state.transmissionRenderTarget[st.id]=new zn(1,1,{generateMipmaps:!0,type:$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float")?Li:fn,minFilter:Bn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const dt=c.state.transmissionRenderTarget[st.id],Mt=st.viewport||O;dt.setSize(Mt.z*E.transmissionResolutionScale,Mt.w*E.transmissionResolutionScale);const Rt=E.getRenderTarget();E.setRenderTarget(dt),E.getClearColor(S),k=E.getClearAlpha(),k<1&&E.setClearColor(16777215,.5),E.clear(),Yt&&Et.render(rt);const Ct=E.toneMapping;E.toneMapping=Mn;const Nt=st.viewport;if(st.viewport!==void 0&&(st.viewport=void 0),c.setupLightsView(st),nt===!0&&ut.setGlobalState(E.clippingPlanes,st),Ui(P,rt,st),w.updateMultisampleRenderTarget(dt),w.updateRenderTargetMipmap(dt),$.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let Lt=0,jt=j.length;Lt<jt;Lt++){const $t=j[Lt],he=$t.object,le=$t.geometry,Zt=$t.material,Dt=$t.group;if(Zt.side===$e&&he.layers.test(st.layers)){const ge=Zt.side;Zt.side=Ae,Zt.needsUpdate=!0,Sa(he,rt,st,le,Zt,Dt),Zt.side=ge,Zt.needsUpdate=!0,Ot=!0}}Ot===!0&&(w.updateMultisampleRenderTarget(dt),w.updateRenderTargetMipmap(dt))}E.setRenderTarget(Rt),E.setClearColor(S,k),Nt!==void 0&&(st.viewport=Nt),E.toneMapping=Ct}function Ui(P,j,rt){const st=j.isScene===!0?j.overrideMaterial:null;for(let K=0,dt=P.length;K<dt;K++){const Mt=P[K],Rt=Mt.object,Ct=Mt.geometry,Nt=st===null?Mt.material:st,Ot=Mt.group;Rt.layers.test(rt.layers)&&Sa(Rt,j,rt,Ct,Nt,Ot)}}function Sa(P,j,rt,st,K,dt){P.onBeforeRender(E,j,rt,st,K,dt),P.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),K.onBeforeRender(E,j,rt,st,P,dt),K.transparent===!0&&K.side===$e&&K.forceSinglePass===!1?(K.side=Ae,K.needsUpdate=!0,E.renderBufferDirect(rt,j,st,K,P,dt),K.side=En,K.needsUpdate=!0,E.renderBufferDirect(rt,j,st,K,P,dt),K.side=$e):E.renderBufferDirect(rt,j,st,K,P,dt),P.onAfterRender(E,j,rt,st,K,dt)}function Ni(P,j,rt){j.isScene!==!0&&(j=Bt);const st=et.get(P),K=c.state.lights,dt=c.state.shadowsArray,Mt=K.state.version,Rt=mt.getParameters(P,K.state,dt,j,rt),Ct=mt.getProgramCacheKey(Rt);let Nt=st.programs;st.environment=P.isMeshStandardMaterial?j.environment:null,st.fog=j.fog,st.envMap=(P.isMeshStandardMaterial?B:y).get(P.envMap||st.environment),st.envMapRotation=st.environment!==null&&P.envMap===null?j.environmentRotation:P.envMapRotation,Nt===void 0&&(P.addEventListener("dispose",zt),Nt=new Map,st.programs=Nt);let Ot=Nt.get(Ct);if(Ot!==void 0){if(st.currentProgram===Ot&&st.lightsStateVersion===Mt)return Ea(P,Rt),Ot}else Rt.uniforms=mt.getUniforms(P),P.onBeforeCompile(Rt,E),Ot=mt.acquireProgram(Rt,Ct),Nt.set(Ct,Ot),st.uniforms=Rt.uniforms;const Lt=st.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Lt.clippingPlanes=ut.uniform),Ea(P,Rt),st.needsLights=Cl(P),st.lightsStateVersion=Mt,st.needsLights&&(Lt.ambientLightColor.value=K.state.ambient,Lt.lightProbe.value=K.state.probe,Lt.directionalLights.value=K.state.directional,Lt.directionalLightShadows.value=K.state.directionalShadow,Lt.spotLights.value=K.state.spot,Lt.spotLightShadows.value=K.state.spotShadow,Lt.rectAreaLights.value=K.state.rectArea,Lt.ltc_1.value=K.state.rectAreaLTC1,Lt.ltc_2.value=K.state.rectAreaLTC2,Lt.pointLights.value=K.state.point,Lt.pointLightShadows.value=K.state.pointShadow,Lt.hemisphereLights.value=K.state.hemi,Lt.directionalShadowMap.value=K.state.directionalShadowMap,Lt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Lt.spotShadowMap.value=K.state.spotShadowMap,Lt.spotLightMatrix.value=K.state.spotLightMatrix,Lt.spotLightMap.value=K.state.spotLightMap,Lt.pointShadowMap.value=K.state.pointShadowMap,Lt.pointShadowMatrix.value=K.state.pointShadowMatrix),st.currentProgram=Ot,st.uniformsList=null,Ot}function Ma(P){if(P.uniformsList===null){const j=P.currentProgram.getUniforms();P.uniformsList=gr.seqWithValue(j.seq,P.uniforms)}return P.uniformsList}function Ea(P,j){const rt=et.get(P);rt.outputColorSpace=j.outputColorSpace,rt.batching=j.batching,rt.batchingColor=j.batchingColor,rt.instancing=j.instancing,rt.instancingColor=j.instancingColor,rt.instancingMorph=j.instancingMorph,rt.skinning=j.skinning,rt.morphTargets=j.morphTargets,rt.morphNormals=j.morphNormals,rt.morphColors=j.morphColors,rt.morphTargetsCount=j.morphTargetsCount,rt.numClippingPlanes=j.numClippingPlanes,rt.numIntersection=j.numClipIntersection,rt.vertexAlphas=j.vertexAlphas,rt.vertexTangents=j.vertexTangents,rt.toneMapping=j.toneMapping}function Al(P,j,rt,st,K){j.isScene!==!0&&(j=Bt),w.resetTextureUnits();const dt=j.fog,Mt=st.isMeshStandardMaterial?j.environment:null,Rt=N===null?E.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:_i,Ct=(st.isMeshStandardMaterial?B:y).get(st.envMap||Mt),Nt=st.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,Ot=!!rt.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),Lt=!!rt.morphAttributes.position,jt=!!rt.morphAttributes.normal,$t=!!rt.morphAttributes.color;let he=Mn;st.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(he=E.toneMapping);const le=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,Zt=le!==void 0?le.length:0,Dt=et.get(st),ge=c.state.lights;if(nt===!0&&(_t===!0||P!==T)){const Me=P===T&&st.id===b;ut.setState(st,P,Me)}let Jt=!1;st.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==ge.state.version||Dt.outputColorSpace!==Rt||K.isBatchedMesh&&Dt.batching===!1||!K.isBatchedMesh&&Dt.batching===!0||K.isBatchedMesh&&Dt.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Dt.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Dt.instancing===!1||!K.isInstancedMesh&&Dt.instancing===!0||K.isSkinnedMesh&&Dt.skinning===!1||!K.isSkinnedMesh&&Dt.skinning===!0||K.isInstancedMesh&&Dt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Dt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Dt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Dt.instancingMorph===!1&&K.morphTexture!==null||Dt.envMap!==Ct||st.fog===!0&&Dt.fog!==dt||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==ut.numPlanes||Dt.numIntersection!==ut.numIntersection)||Dt.vertexAlphas!==Nt||Dt.vertexTangents!==Ot||Dt.morphTargets!==Lt||Dt.morphNormals!==jt||Dt.morphColors!==$t||Dt.toneMapping!==he||Dt.morphTargetsCount!==Zt)&&(Jt=!0):(Jt=!0,Dt.__version=st.version);let ze=Dt.currentProgram;Jt===!0&&(ze=Ni(st,j,K));let Vn=!1,Ce=!1,yi=!1;const re=ze.getUniforms(),Ie=Dt.uniforms;if(D.useProgram(ze.program)&&(Vn=!0,Ce=!0,yi=!0),st.id!==b&&(b=st.id,Ce=!0),Vn||T!==P){D.buffers.depth.getReversed()?(ft.copy(P.projectionMatrix),Bc(ft),kc(ft),re.setValue(g,"projectionMatrix",ft)):re.setValue(g,"projectionMatrix",P.projectionMatrix),re.setValue(g,"viewMatrix",P.matrixWorldInverse);const be=re.map.cameraPosition;be!==void 0&&be.setValue(g,Pt.setFromMatrixPosition(P.matrixWorld)),U.logarithmicDepthBuffer&&re.setValue(g,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&re.setValue(g,"isOrthographic",P.isOrthographicCamera===!0),T!==P&&(T=P,Ce=!0,yi=!0)}if(K.isSkinnedMesh){re.setOptional(g,K,"bindMatrix"),re.setOptional(g,K,"bindMatrixInverse");const Me=K.skeleton;Me&&(Me.boneTexture===null&&Me.computeBoneTexture(),re.setValue(g,"boneTexture",Me.boneTexture,w))}K.isBatchedMesh&&(re.setOptional(g,K,"batchingTexture"),re.setValue(g,"batchingTexture",K._matricesTexture,w),re.setOptional(g,K,"batchingIdTexture"),re.setValue(g,"batchingIdTexture",K._indirectTexture,w),re.setOptional(g,K,"batchingColorTexture"),K._colorsTexture!==null&&re.setValue(g,"batchingColorTexture",K._colorsTexture,w));const Ue=rt.morphAttributes;if((Ue.position!==void 0||Ue.normal!==void 0||Ue.color!==void 0)&&It.update(K,rt,ze),(Ce||Dt.receiveShadow!==K.receiveShadow)&&(Dt.receiveShadow=K.receiveShadow,re.setValue(g,"receiveShadow",K.receiveShadow)),st.isMeshGouraudMaterial&&st.envMap!==null&&(Ie.envMap.value=Ct,Ie.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),st.isMeshStandardMaterial&&st.envMap===null&&j.environment!==null&&(Ie.envMapIntensity.value=j.environmentIntensity),Ce&&(re.setValue(g,"toneMappingExposure",E.toneMappingExposure),Dt.needsLights&&Rl(Ie,yi),dt&&st.fog===!0&&ht.refreshFogUniforms(Ie,dt),ht.refreshMaterialUniforms(Ie,st,Q,G,c.state.transmissionRenderTarget[P.id]),gr.upload(g,Ma(Dt),Ie,w)),st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(gr.upload(g,Ma(Dt),Ie,w),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&re.setValue(g,"center",K.center),re.setValue(g,"modelViewMatrix",K.modelViewMatrix),re.setValue(g,"normalMatrix",K.normalMatrix),re.setValue(g,"modelMatrix",K.matrixWorld),st.isShaderMaterial||st.isRawShaderMaterial){const Me=st.uniformsGroups;for(let be=0,Dr=Me.length;be<Dr;be++){const An=Me[be];W.update(An,ze),W.bind(An,ze)}}return ze}function Rl(P,j){P.ambientLightColor.needsUpdate=j,P.lightProbe.needsUpdate=j,P.directionalLights.needsUpdate=j,P.directionalLightShadows.needsUpdate=j,P.pointLights.needsUpdate=j,P.pointLightShadows.needsUpdate=j,P.spotLights.needsUpdate=j,P.spotLightShadows.needsUpdate=j,P.rectAreaLights.needsUpdate=j,P.hemisphereLights.needsUpdate=j}function Cl(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(P,j,rt){et.get(P.texture).__webglTexture=j,et.get(P.depthTexture).__webglTexture=rt;const st=et.get(P);st.__hasExternalTextures=!0,st.__autoAllocateDepthBuffer=rt===void 0,st.__autoAllocateDepthBuffer||$.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),st.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,j){const rt=et.get(P);rt.__webglFramebuffer=j,rt.__useDefaultFramebuffer=j===void 0};const Pl=g.createFramebuffer();this.setRenderTarget=function(P,j=0,rt=0){N=P,I=j,R=rt;let st=!0,K=null,dt=!1,Mt=!1;if(P){const Ct=et.get(P);if(Ct.__useDefaultFramebuffer!==void 0)D.bindFramebuffer(g.FRAMEBUFFER,null),st=!1;else if(Ct.__webglFramebuffer===void 0)w.setupRenderTarget(P);else if(Ct.__hasExternalTextures)w.rebindTextures(P,et.get(P.texture).__webglTexture,et.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Lt=P.depthTexture;if(Ct.__boundDepthTexture!==Lt){if(Lt!==null&&et.has(Lt)&&(P.width!==Lt.image.width||P.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(P)}}const Nt=P.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(Mt=!0);const Ot=et.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Ot[j])?K=Ot[j][rt]:K=Ot[j],dt=!0):P.samples>0&&w.useMultisampledRTT(P)===!1?K=et.get(P).__webglMultisampledFramebuffer:Array.isArray(Ot)?K=Ot[rt]:K=Ot,O.copy(P.viewport),C.copy(P.scissor),F=P.scissorTest}else O.copy(V).multiplyScalar(Q).floor(),C.copy(q).multiplyScalar(Q).floor(),F=gt;if(rt!==0&&(K=Pl),D.bindFramebuffer(g.FRAMEBUFFER,K)&&st&&D.drawBuffers(P,K),D.viewport(O),D.scissor(C),D.setScissorTest(F),dt){const Ct=et.get(P.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct.__webglTexture,rt)}else if(Mt){const Ct=et.get(P.texture),Nt=j;g.framebufferTextureLayer(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,Ct.__webglTexture,rt,Nt)}else if(P!==null&&rt!==0){const Ct=et.get(P.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,Ct.__webglTexture,rt)}b=-1},this.readRenderTargetPixels=function(P,j,rt,st,K,dt,Mt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=et.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Mt!==void 0&&(Rt=Rt[Mt]),Rt){D.bindFramebuffer(g.FRAMEBUFFER,Rt);try{const Ct=P.texture,Nt=Ct.format,Ot=Ct.type;if(!U.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!U.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=P.width-st&&rt>=0&&rt<=P.height-K&&g.readPixels(j,rt,st,K,kt.convert(Nt),kt.convert(Ot),dt)}finally{const Ct=N!==null?et.get(N).__webglFramebuffer:null;D.bindFramebuffer(g.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(P,j,rt,st,K,dt,Mt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=et.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Mt!==void 0&&(Rt=Rt[Mt]),Rt){const Ct=P.texture,Nt=Ct.format,Ot=Ct.type;if(!U.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(j>=0&&j<=P.width-st&&rt>=0&&rt<=P.height-K){D.bindFramebuffer(g.FRAMEBUFFER,Rt);const Lt=g.createBuffer();g.bindBuffer(g.PIXEL_PACK_BUFFER,Lt),g.bufferData(g.PIXEL_PACK_BUFFER,dt.byteLength,g.STREAM_READ),g.readPixels(j,rt,st,K,kt.convert(Nt),kt.convert(Ot),0);const jt=N!==null?et.get(N).__webglFramebuffer:null;D.bindFramebuffer(g.FRAMEBUFFER,jt);const $t=g.fenceSync(g.SYNC_GPU_COMMANDS_COMPLETE,0);return g.flush(),await Oc(g,$t,4),g.bindBuffer(g.PIXEL_PACK_BUFFER,Lt),g.getBufferSubData(g.PIXEL_PACK_BUFFER,0,dt),g.deleteBuffer(Lt),g.deleteSync($t),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,j=null,rt=0){P.isTexture!==!0&&(ri("WebGLRenderer: copyFramebufferToTexture function signature has changed."),j=arguments[0]||null,P=arguments[1]);const st=Math.pow(2,-rt),K=Math.floor(P.image.width*st),dt=Math.floor(P.image.height*st),Mt=j!==null?j.x:0,Rt=j!==null?j.y:0;w.setTexture2D(P,0),g.copyTexSubImage2D(g.TEXTURE_2D,rt,0,0,Mt,Rt,K,dt),D.unbindTexture()};const Ll=g.createFramebuffer(),Dl=g.createFramebuffer();this.copyTextureToTexture=function(P,j,rt=null,st=null,K=0,dt=null){P.isTexture!==!0&&(ri("WebGLRenderer: copyTextureToTexture function signature has changed."),st=arguments[0]||null,P=arguments[1],j=arguments[2],dt=arguments[3]||0,rt=null),dt===null&&(K!==0?(ri("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),dt=K,K=0):dt=0);let Mt,Rt,Ct,Nt,Ot,Lt,jt,$t,he;const le=P.isCompressedTexture?P.mipmaps[dt]:P.image;if(rt!==null)Mt=rt.max.x-rt.min.x,Rt=rt.max.y-rt.min.y,Ct=rt.isBox3?rt.max.z-rt.min.z:1,Nt=rt.min.x,Ot=rt.min.y,Lt=rt.isBox3?rt.min.z:0;else{const Ue=Math.pow(2,-K);Mt=Math.floor(le.width*Ue),Rt=Math.floor(le.height*Ue),P.isDataArrayTexture?Ct=le.depth:P.isData3DTexture?Ct=Math.floor(le.depth*Ue):Ct=1,Nt=0,Ot=0,Lt=0}st!==null?(jt=st.x,$t=st.y,he=st.z):(jt=0,$t=0,he=0);const Zt=kt.convert(j.format),Dt=kt.convert(j.type);let ge;j.isData3DTexture?(w.setTexture3D(j,0),ge=g.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(w.setTexture2DArray(j,0),ge=g.TEXTURE_2D_ARRAY):(w.setTexture2D(j,0),ge=g.TEXTURE_2D),g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,j.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,j.unpackAlignment);const Jt=g.getParameter(g.UNPACK_ROW_LENGTH),ze=g.getParameter(g.UNPACK_IMAGE_HEIGHT),Vn=g.getParameter(g.UNPACK_SKIP_PIXELS),Ce=g.getParameter(g.UNPACK_SKIP_ROWS),yi=g.getParameter(g.UNPACK_SKIP_IMAGES);g.pixelStorei(g.UNPACK_ROW_LENGTH,le.width),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,le.height),g.pixelStorei(g.UNPACK_SKIP_PIXELS,Nt),g.pixelStorei(g.UNPACK_SKIP_ROWS,Ot),g.pixelStorei(g.UNPACK_SKIP_IMAGES,Lt);const re=P.isDataArrayTexture||P.isData3DTexture,Ie=j.isDataArrayTexture||j.isData3DTexture;if(P.isDepthTexture){const Ue=et.get(P),Me=et.get(j),be=et.get(Ue.__renderTarget),Dr=et.get(Me.__renderTarget);D.bindFramebuffer(g.READ_FRAMEBUFFER,be.__webglFramebuffer),D.bindFramebuffer(g.DRAW_FRAMEBUFFER,Dr.__webglFramebuffer);for(let An=0;An<Ct;An++)re&&(g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,et.get(P).__webglTexture,K,Lt+An),g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,et.get(j).__webglTexture,dt,he+An)),g.blitFramebuffer(Nt,Ot,Mt,Rt,jt,$t,Mt,Rt,g.DEPTH_BUFFER_BIT,g.NEAREST);D.bindFramebuffer(g.READ_FRAMEBUFFER,null),D.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else if(K!==0||P.isRenderTargetTexture||et.has(P)){const Ue=et.get(P),Me=et.get(j);D.bindFramebuffer(g.READ_FRAMEBUFFER,Ll),D.bindFramebuffer(g.DRAW_FRAMEBUFFER,Dl);for(let be=0;be<Ct;be++)re?g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,Ue.__webglTexture,K,Lt+be):g.framebufferTexture2D(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,Ue.__webglTexture,K),Ie?g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,Me.__webglTexture,dt,he+be):g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,Me.__webglTexture,dt),K!==0?g.blitFramebuffer(Nt,Ot,Mt,Rt,jt,$t,Mt,Rt,g.COLOR_BUFFER_BIT,g.NEAREST):Ie?g.copyTexSubImage3D(ge,dt,jt,$t,he+be,Nt,Ot,Mt,Rt):g.copyTexSubImage2D(ge,dt,jt,$t,Nt,Ot,Mt,Rt);D.bindFramebuffer(g.READ_FRAMEBUFFER,null),D.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else Ie?P.isDataTexture||P.isData3DTexture?g.texSubImage3D(ge,dt,jt,$t,he,Mt,Rt,Ct,Zt,Dt,le.data):j.isCompressedArrayTexture?g.compressedTexSubImage3D(ge,dt,jt,$t,he,Mt,Rt,Ct,Zt,le.data):g.texSubImage3D(ge,dt,jt,$t,he,Mt,Rt,Ct,Zt,Dt,le):P.isDataTexture?g.texSubImage2D(g.TEXTURE_2D,dt,jt,$t,Mt,Rt,Zt,Dt,le.data):P.isCompressedTexture?g.compressedTexSubImage2D(g.TEXTURE_2D,dt,jt,$t,le.width,le.height,Zt,le.data):g.texSubImage2D(g.TEXTURE_2D,dt,jt,$t,Mt,Rt,Zt,Dt,le);g.pixelStorei(g.UNPACK_ROW_LENGTH,Jt),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,ze),g.pixelStorei(g.UNPACK_SKIP_PIXELS,Vn),g.pixelStorei(g.UNPACK_SKIP_ROWS,Ce),g.pixelStorei(g.UNPACK_SKIP_IMAGES,yi),dt===0&&j.generateMipmaps&&g.generateMipmap(ge),D.unbindTexture()},this.copyTextureToTexture3D=function(P,j,rt=null,st=null,K=0){return P.isTexture!==!0&&(ri("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,st=arguments[1]||null,P=arguments[2],j=arguments[3],K=arguments[4]||0),ri('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,j,rt,st,K)},this.initRenderTarget=function(P){et.get(P).__webglFramebuffer===void 0&&w.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?w.setTextureCube(P,0):P.isData3DTexture?w.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?w.setTexture2DArray(P,0):w.setTexture2D(P,0),D.unbindTexture()},this.resetState=function(){I=0,R=0,N=null,D.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}function cm(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,l=new Ze;let h=0;for(let u=0;u<i.length;++u){const f=i[u];let p=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(f.attributes[d]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,d,u),h+=d}}if(e){let u=0;const f=[];for(let p=0;p<i.length;++p){const d=i[p].index;for(let v=0;v<d.count;++v)f.push(d.getX(v)+u);u+=i[p].attributes.position.count}l.setIndex(f)}for(const u in s){const f=Ro(s[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let p=0;p<f;++p){const d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][p]);const v=Ro(d);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(v)}}return l}function Ro(i){let t,e,n,r=-1,s=0;for(let h=0;h<i.length;++h){const u=i[h];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*e}const o=new t(s),a=new je(o,e,n);let l=0;for(let h=0;h<i.length;++h){const u=i[h];if(u.isInterleavedBufferAttribute){const f=l/e;for(let p=0,d=u.count;p<d;p++)for(let v=0;v<e;v++){const _=u.getComponent(p,v);a.setComponent(p+f,v,_)}}else o.set(u.array,l);l+=u.count*e}return r!==void 0&&(a.gpuType=r),a}const Co={type:"change"},ma={type:"start"},bl={type:"end"},or=new da,Po=new cn,hm=Math.cos(70*Nc.DEG2RAD),de=new z,we=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},us=1e-6;class um extends Th{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.enabled=!0,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:oi.ROTATE,MIDDLE:oi.DOLLY,RIGHT:oi.PAN},this.touches={ONE:si.ROTATE,TWO:si.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new Hn,this._lastTargetPosition=new z,this._quat=new Hn().setFromUnitVectors(t.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new to,this._sphericalDelta=new to,this._scale=1,this._panOffset=new z,this._rotateStart=new Gt,this._rotateEnd=new Gt,this._rotateDelta=new Gt,this._panStart=new Gt,this._panEnd=new Gt,this._panDelta=new Gt,this._dollyStart=new Gt,this._dollyEnd=new Gt,this._dollyDelta=new Gt,this._dollyDirection=new z,this._mouse=new Gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fm.bind(this),this._onPointerDown=dm.bind(this),this._onPointerUp=pm.bind(this),this._onContextMenu=Sm.bind(this),this._onMouseWheel=gm.bind(this),this._onKeyDown=vm.bind(this),this._onTouchStart=xm.bind(this),this._onTouchMove=ym.bind(this),this._onMouseDown=mm.bind(this),this._onMouseMove=_m.bind(this),this._interceptControlDown=Mm.bind(this),this._interceptControlUp=Em.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Co),this.update(),this.state=ie.NONE}update(t=null){const e=this.object.position;de.copy(e).sub(this.target),de.applyQuaternion(this._quat),this._spherical.setFromVector3(de),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=we:n>Math.PI&&(n-=we),r<-Math.PI?r+=we:r>Math.PI&&(r-=we),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(de.setFromSpherical(this._spherical),de.applyQuaternion(this._quatInverse),e.copy(this.target).add(de),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=de.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new z(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const h=new z(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(a),this.object.updateMatrixWorld(),o=de.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(or.origin.copy(this.object.position),or.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(or.direction))<hm?this.object.lookAt(this.target):(Po.setFromNormalAndCoplanarPoint(this.object.up,this.target),or.intersectPlane(Po,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>us||8*(1-this._lastQuaternion.dot(this.object.quaternion))>us||this._lastTargetPosition.distanceToSquared(this.target)>us?(this.dispatchEvent(Co),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?we/60*this.autoRotateSpeed*t:we/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){de.setFromMatrixColumn(e,0),de.multiplyScalar(-t),this._panOffset.add(de)}_panUp(t,e){this.screenSpacePanning===!0?de.setFromMatrixColumn(e,1):(de.setFromMatrixColumn(e,0),de.crossVectors(this.object.up,de)),de.multiplyScalar(t),this._panOffset.add(de)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;de.copy(r).sub(this.target);let s=de.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=t-n.left,s=e-n.top,o=n.width,a=n.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(we*this._rotateDelta.x/e.clientHeight),this._rotateUp(we*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(we*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-we*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(we*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-we*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(n,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),r=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(we*this._rotateDelta.x/e.clientHeight),this._rotateUp(we*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function dm(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function fm(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function pm(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bl),this.state=ie.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function mm(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case oi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ie.DOLLY;break;case oi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}break;case oi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(ma)}function _m(i){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function gm(i){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(i.preventDefault(),this.dispatchEvent(ma),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(bl))}function vm(i){this.enabled!==!1&&this._handleKeyDown(i)}function xm(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case si.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ie.TOUCH_ROTATE;break;case si.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case si.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ie.TOUCH_DOLLY_PAN;break;case si.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(ma)}function ym(i){switch(this._trackPointer(i),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ie.NONE}}function Sm(i){this.enabled!==!1&&i.preventDefault()}function Mm(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Em(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const vr=0,bm=1,Tm=new z,Lo=new Eh,ds=new cn,Do=new z,lr=new Be;class wm{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Io,this.unassigned=new Io,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new Am(t[e]));this.compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(n){const r=n.geometry;if(r!==void 0){const s=r.attributes.position;if(s!==void 0)for(let o=0,a=s.count;o<a;o++){const l=new z;l.fromBufferAttribute(s,o).applyMatrix4(n.matrixWorld),e.push(l)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,r=e.length;n<r;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const n=this.faces;let r=-1/0,s=1/0;for(let o=0,a=n.length;o<a;o++){const l=n[o],h=l.distanceToPoint(t.origin),u=l.normal.dot(t.direction);if(h>0&&u>=0)return null;const f=u!==0?-h/u:0;if(!(f<=0)&&(u>0?s=Math.min(f,s):r=Math.max(f,r),r>s))return null}return r!==-1/0?t.at(r,e):t.at(s,e),e}intersectsRay(t){return this.intersectRay(t,Tm)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let n=t.outside;for(;n.next!==null&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}deleteFaceVertices(t,e){const n=this.removeAllVerticesFromFace(t);if(n!==void 0)if(e===void 0)this.unassigned.appendChain(n);else{let r=n;do{const s=r.next;e.distanceToPoint(r.point)>this.tolerance?this.addVertexToFace(r,e):this.unassigned.append(r),r=s}while(r!==null)}return this}resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const n=e.next;let r=this.tolerance,s=null;for(let o=0;o<t.length;o++){const a=t[o];if(a.mark===vr){const l=a.distanceToPoint(e.point);if(l>r&&(r=l,s=a),r>1e3*this.tolerance)break}}s!==null&&this.addVertexToFace(e,s),e=n}while(e!==null)}return this}computeExtremes(){const t=new z,e=new z,n=[],r=[];for(let s=0;s<3;s++)n[s]=r[s]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let s=0,o=this.vertices.length;s<o;s++){const a=this.vertices[s],l=a.point;for(let h=0;h<3;h++)l.getComponent(h)<t.getComponent(h)&&(t.setComponent(h,l.getComponent(h)),n[h]=a);for(let h=0;h<3;h++)l.getComponent(h)>e.getComponent(h)&&(e.setComponent(h,l.getComponent(h)),r[h]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:r}}computeInitialHull(){const t=this.vertices,e=this.computeExtremes(),n=e.min,r=e.max;let s=0,o=0;for(let p=0;p<3;p++){const d=r[p].point.getComponent(p)-n[p].point.getComponent(p);d>s&&(s=d,o=p)}const a=n[o],l=r[o];let h,u;s=0,Lo.set(a.point,l.point);for(let p=0,d=this.vertices.length;p<d;p++){const v=t[p];if(v!==a&&v!==l){Lo.closestPointToPoint(v.point,!0,Do);const _=Do.distanceToSquared(v.point);_>s&&(s=_,h=v)}}s=-1,ds.setFromCoplanarPoints(a.point,l.point,h.point);for(let p=0,d=this.vertices.length;p<d;p++){const v=t[p];if(v!==a&&v!==l&&v!==h){const _=Math.abs(ds.distanceToPoint(v.point));_>s&&(s=_,u=v)}}const f=[];if(ds.distanceToPoint(u.point)<0){f.push(We.create(a,l,h),We.create(u,l,a),We.create(u,h,l),We.create(u,a,h));for(let p=0;p<3;p++){const d=(p+1)%3;f[p+1].getEdge(2).setTwin(f[0].getEdge(d)),f[p+1].getEdge(1).setTwin(f[d+1].getEdge(0))}}else{f.push(We.create(a,h,l),We.create(u,a,l),We.create(u,l,h),We.create(u,h,a));for(let p=0;p<3;p++){const d=(p+1)%3;f[p+1].getEdge(2).setTwin(f[0].getEdge((3-p)%3)),f[p+1].getEdge(0).setTwin(f[d+1].getEdge(1))}}for(let p=0;p<4;p++)this.faces.push(f[p]);for(let p=0,d=t.length;p<d;p++){const v=t[p];if(v!==a&&v!==l&&v!==h&&v!==u){s=this.tolerance;let _=null;for(let m=0;m<4;m++){const c=this.faces[m].distanceToPoint(v.point);c>s&&(s=c,_=this.faces[m])}_!==null&&this.addVertexToFace(v,_)}}return this}reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const n=this.faces[e];n.mark===vr&&t.push(n)}return this.faces=t,this}nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const n=this.assigned.first().face;let r=n.outside;do{const s=n.distanceToPoint(r.point);s>e&&(e=s,t=r),r=r.next}while(r!==null&&r.face===n);return t}}computeHorizon(t,e,n,r){this.deleteFaceVertices(n),n.mark=bm;let s;e===null?s=e=n.getEdge(0):s=e.next;do{const o=s.twin,a=o.face;a.mark===vr&&(a.distanceToPoint(t)>this.tolerance?this.computeHorizon(t,o,a,r):r.push(s)),s=s.next}while(s!==e);return this}addAdjoiningFace(t,e){const n=We.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}addNewFaces(t,e){this.newFaces=[];let n=null,r=null;for(let s=0;s<e.length;s++){const o=e[s],a=this.addAdjoiningFace(t,o);n===null?n=a:a.next.setTwin(r),this.newFaces.push(a.face),r=a}return n.next.setTwin(r),this}addVertexToHull(t){const e=[];return this.unassigned.clear(),this.removeVertexFromFace(t,t.face),this.computeHorizon(t.point,null,t.face,e),this.addNewFaces(t,e),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let t;for(this.computeInitialHull();(t=this.nextVertexToAdd())!==void 0;)this.addVertexToHull(t);return this.reindexFaces(),this.cleanup(),this}}class We{constructor(){this.normal=new z,this.midpoint=new z,this.area=0,this.constant=0,this.outside=null,this.mark=vr,this.edge=null}static create(t,e,n){const r=new We,s=new fs(t,r),o=new fs(e,r),a=new fs(n,r);return s.next=a.prev=o,o.next=s.prev=a,a.next=o.prev=s,r.edge=s,r.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return lr.set(t.point,e.point,n.point),lr.getNormal(this.normal),lr.getMidpoint(this.midpoint),this.area=lr.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class fs{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class Am{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class Io{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class Ai extends Ze{constructor(t=[]){super();const e=[],n=[],s=new wm().setFromPoints(t).faces;for(let o=0;o<s.length;o++){const a=s[o];let l=a.edge;do{const h=l.head().point;e.push(h.x,h.y,h.z),n.push(a.normal.x,a.normal.y,a.normal.z),l=l.next}while(l!==a.edge)}this.setAttribute("position",new De(e,3)),this.setAttribute("normal",new De(n,3))}}const{scene:Ci}=Rm();let ia,Tl,fe=null,Xe=[];function Rm(){const i=new hh,t=1e3,e=100,n=new bh(t,e,4473924,4473924);n.position.y=-2,i.add(n);const r=new Oe(75,window.innerWidth/window.innerHeight,.1,1e3);r.position.y=70,r.position.z=70;const s=new lm;function o(){const f=document.getElementById("dem");if(!f||f.clientWidth===0||f.clientHeight===0){setTimeout(o,50);return}s.setSize(f.clientWidth,f.clientHeight),r.aspect=f.clientWidth/f.clientHeight,r.updateProjectionMatrix(),f.appendChild(s.domElement),s.setAnimationLoop(()=>a(i,r,s))}o();function a(f,p,d){d.render(f,p)}const l=new Sh(16777215,.5);i.add(l);const h=new yh(16777215,1);return h.position.set(10,10,10),i.add(h),new um(r,s.domElement).listenToKeyEvents(window),window.addEventListener("resize",()=>{const f=document.getElementById("dem");s.setSize(f.clientWidth,f.clientHeight),r.aspect=f.clientWidth/f.clientHeight,r.updateProjectionMatrix()}),{scene:i,camera:r,renderer:s}}async function _a(){const i=Sr(),t=Ol();if(i){if(!t){window.alert("Please select a shape in Step 2 first.");return}}else{window.alert("Please upload a geotiff in Step 1 first.");return}ra("demView");let e=parseFloat(document.getElementById("baseThicknessInput").value),n=parseFloat(Wl()),r=parseFloat(document.getElementById("bedWidthInput").value),s=parseFloat(document.getElementById("bedHeightInput").value),o=parseFloat(document.getElementById("physicalWidthInput").value),a=0,l=document.getElementById("physicalHeightInput");const h=i.georasters[0];let u=h.width,f=h.height,p=h.values[0];console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");function d(){const m=(h.ymin+h.ymax)/2,c=40075017,x=111320,M=Math.abs(c*Math.cos(m*Math.PI/180)/360),E=h.pixelWidth*x,A=h.pixelHeight*M,I=E*h.width,R=A*h.height,N=R/I;a=parseFloat((o*N).toFixed(2)),l.value=a;const b=o/I,T=a/R;return{scaleX:b,scaleY:T}}({scaleX:ia,scaleY:Tl}=d());const v=[];for(let m=0;m<p.length;m++)for(let c=0;c<p[m].length;c++)v.push(p[m][c]*ia*n);p=v;const _=Xl(h,t);if(o<=r&&a<=s)wl(e,u,f,p,_,o,a),Pm();else{const m=Dm(p,_),c=Im(m,u,f),M=(await ql(c,o,a,r,s)).best_cut;Cm(M,m,u,f,o,a,e),Lm()}}function wl(i,t,e,n,r,s,o){fe&&Ci.remove(fe);const a=-Math.abs(parseFloat(i)),l=parseInt(t),h=parseInt(e);let u=s/l,f=o/h;u=ia*100*l/s,f=Tl*100*h/o;let p=[];for(let c=0;c<l;c++)for(let x=0;x<h;x++){const M=se(r,c,x,l,h),E=se(r,c+1,x,l,h),A=se(r,c,x+1,l,h),I=se(r,c+1,x+1,l,h),R=se(n,c,x,l,h),N=se(n,c+1,x,l,h),b=se(n,c,x+1,l,h),T=se(n,c+1,x+1,l,h);if(M==1&&E==1&&A==1&&I==1&&R>=0&&N>=0&&b>=0&&T>=0){let O=[new z(c*u,x*f,a),new z(c*u,x*f,se(n,c,x,l,h)),new z((c+1)*u,x*f,a),new z((c+1)*u,x*f,se(n,c+1,x,l,h)),new z(c*u,(x+1)*f,a),new z(c*u,(x+1)*f,se(n,c,x+1,l,h)),new z((c+1)*u,(x+1)*f,a),new z((c+1)*u,(x+1)*f,se(n,c+1,x+1,l,h))],C=new Ai(O);p.push(C)}else if(M==1&&E==1&&A==1&&R>=0&&N>=0&&b>=0){let O=[new z(c*u,x*f,a),new z(c*u,x*f,se(n,c,x,l,h)),new z((c+1)*u,x*f,a),new z((c+1)*u,x*f,se(n,c+1,x,l,h)),new z(c*u,(x+1)*f,a),new z(c*u,(x+1)*f,se(n,c,x+1,l,h))],C=new Ai(O);p.push(C)}else if(M==1&&E==1&&I==1&&R>=0&&N>=0&&T>=0){let O=[new z(c*u,x*f,a),new z(c*u,x*f,se(n,c,x,l,h)),new z((c+1)*u,x*f,a),new z((c+1)*u,x*f,se(n,c+1,x,l,h)),new z((c+1)*u,(x+1)*f,a),new z((c+1)*u,(x+1)*f,se(n,c+1,x+1,l,h))],C=new Ai(O);p.push(C)}else if(E==1&&A==1&&I==1&&N>=0&&b>=0&&T>=0){let O=[new z((c+1)*u,x*f,a),new z((c+1)*u,x*f,se(n,c+1,x,l,h)),new z(c*u,(x+1)*f,a),new z(c*u,(x+1)*f,se(n,c,x+1,l,h)),new z((c+1)*u,(x+1)*f,a),new z((c+1)*u,(x+1)*f,se(n,c+1,x+1,l,h))],C=new Ai(O);p.push(C)}else if(M==1&&A==1&&I==1&&R>=0&&b>=0&&T>=0){let O=[new z(c*u,x*f,a),new z(c*u,x*f,se(n,c,x,l,h)),new z(c*u,(x+1)*f,a),new z(c*u,(x+1)*f,se(n,c,x+1,l,h)),new z((c+1)*u,(x+1)*f,a),new z((c+1)*u,(x+1)*f,se(n,c+1,x+1,l,h))],C=new Ai(O);p.push(C)}}if(p.length==0){fe=null;return}let d=cm(p);const v=new qt().setHSL(0*.618033988749895%1,.5,.5);let _=new mh({color:v,side:$e});_.needsUpdate=!0;let m=new Qe(d,_);m.rotateX(3*Math.PI/2),fe=m,Ci.add(fe),console.log(fe)}function se(i,t,e,n,r){if(t>=n||e>=r)return null;const s=r-1-e;return i[s*n+t]}function Cm(i,t,e,n,r,s,o,a={}){if(console.log("Partitioning..."),Xe&&Xe.length)for(const p of Xe)try{p&&(Ci.remove(p),p.geometry&&typeof p.geometry.dispose=="function"&&p.geometry.dispose(),p.material&&(Array.isArray(p.material)?p.material.forEach(d=>{d&&typeof d.dispose=="function"&&d.dispose()}):typeof p.material.dispose=="function"&&p.material.dispose()))}catch(d){console.warn("Error disposing previous partition mesh:",d)}Xe=[];let l=[];i||console.warn("No label map provided");for(let p=0;p<i.length;p++)for(let d=0;d<i[p].length;d++)l.push(i[p][d]);const h=parseInt(e)*parseInt(n);l.length!==h&&console.warn("Label map size doesn't match demWidth*demHeight:",l.length,"vs",h);const u=new Set;for(let p=0;p<Math.min(l.length,h);p++){const d=l[p];typeof d=="number"&&d>=0&&u.add(Math.trunc(d))}const f=Array.from(u).sort((p,d)=>p-d);for(const p of f){const d=new Array(h).fill(0);for(let v=0;v<h&&v<l.length;v++)l[v]===p&&(d[v]=1);if(wl(o,e,n,t,d,r,s),fe){const v=fe.clone(!0);v.material=fe.material.clone(),v.material.color=new qt().setHSL(p*.618033988749895%1,.5,.5),v.name=`partition_${p}`,Ci.add(v),Xe.push(v)}}return fe&&(Ci.remove(fe),fe=null),Xe}function Pm(){const i=new bn().setFromObject(fe),t=new z;i.getSize(t),fe.position.x-=i.min.x+t.x/2,fe.position.y-=i.min.y+t.y/2,fe.position.z-=i.min.z+t.z/2,fe.updateMatrix()}function Lm(){const i=new bn;Xe.forEach(n=>{const r=new bn().setFromObject(n);i.union(r)});const t=new z;i.getSize(t);const e=new z(i.min.x+t.x/2,i.min.y+t.y/2,i.min.z+t.z/2);Xe.forEach(n=>{n.position.sub(e),n.updateMatrix()})}function Dm(i,t){const e=[];for(let n=0;n<i.length;n++)t[n]===0||i[n]<-2e30?e.push(NaN):t[n]===1?e.push(i[n]):console.log("Unexpected mask value at index",n,"mask:",t[n],"elevation:",i[n]);return e}function Im(i,t,e){const n=[];for(let r=0;r<e;r++){const s=[];for(let o=0;o<t;o++){const a=r*t+o;s.push(i[a])}n.push(s)}return n}function Uo(){const i=Sr();if(!i)return 1;const t=i.georasters[0],e=(t.ymin+t.ymax)/2,n=40075017,r=111320,s=Math.abs(n*Math.cos(e*Math.PI/180)/360),o=t.pixelWidth*r,a=t.pixelHeight*s,l=o*t.width;return a*t.height/l}function xr(i){const t=document.createElement("div");t.style.textAlign="center";const e=document.createElement("button");e.classList.add("generateDEMButton"),e.onclick=()=>{_a()},e.style.marginRight="5px",e.textContent="Generate DEM";const n=document.createElement("button");n.onclick=()=>{i.remove()},n.textContent="Delete",t.appendChild(e),t.appendChild(n),i.bindPopup(t)}function Um(i,t,e){const n=document.createElement("div");n.classList.add("historyDivItem"),n.title="Click to select this TIFF layer";const r=document.createElement("span");r.textContent=t,n.onclick=()=>{No(i,n,r.textContent)},No(i,n,r.textContent);const s=document.createElement("button");s.classList.add("historyButton"),s.classList.add("floatRight"),s.innerHTML='<i class="fas fa-eye"></i>',s.title="Toggle visibility";let o=!0;s.onclick=h=>{h.stopPropagation(),o?(Qt.removeLayer(i),s.innerHTML='<i class="fas fa-eye-slash"></i>',o=!1):(Qt.addLayer(i),s.innerHTML='<i class="fas fa-eye"></i>',o=!0)};const a=document.createElement("button");a.classList.add("historyButton"),a.innerHTML='<i class="fa-solid fa-keyboard"></i>',a.title="Rename",a.onclick=h=>{h.stopPropagation();const u=prompt("Enter new name for the TIFF:",r.textContent);u&&u.trim()!==""&&(r.textContent=u.trim())};const l=document.createElement("button");l.classList.add("historyButton"),l.innerHTML='<i class="fas fa-trash-can"></i>',l.title="Delete",l.onclick=h=>{h.stopPropagation(),Qt.removeLayer(i),n.remove(),Go(null),document.getElementById("tiffUpload").value="",document.getElementById("step1").innerHTML="Step 1: GeoTIFF"},n.appendChild(r),n.appendChild(s),n.appendChild(a),n.appendChild(l),document.getElementById(e).appendChild(n)}let Nm=1,Fm=1,Om=1,Bm=1;function yr(i,t,e){const n=document.createElement("div");n.classList.add("historyDivItem"),n.title="Click to select this shape";const r=document.createElement("span");t=="Rectangle"?r.textContent=t+Nm++:t=="Polygon"?r.textContent=t+Fm++:t=="Circle"?r.textContent=t+Om++:r.textContent=t+Bm++,n.onclick=()=>{ps(i,n,r.textContent)},ps(i,n,r.textContent);const s=document.createElement("button");s.classList.add("historyButton"),s.classList.add("floatRight"),s.innerHTML='<i class="fas fa-eye"></i>',s.title="Toggle visibility";let o=!0;s.onclick=u=>{u.stopPropagation(),o?(Qt.removeLayer(i),s.innerHTML='<i class="fas fa-eye-slash"></i>',o=!1):(Qt.addLayer(i),s.innerHTML='<i class="fas fa-eye"></i>',o=!0)};const a=document.createElement("button");a.classList.add("historyButton"),a.innerHTML='<i class="fas fa-hammer"></i>',a.title="Build 3D Model",a.onclick=u=>{u.stopPropagation(),ps(i,n),_a()};const l=document.createElement("button");l.classList.add("historyButton"),l.innerHTML='<i class="fa-solid fa-keyboard"></i>',l.title="Rename",l.onclick=u=>{u.stopPropagation();const f=prompt("Enter new name for the shape:",r.textContent);f&&f.trim()!==""&&(r.textContent=f.trim())};const h=document.createElement("button");h.classList.add("historyButton"),h.innerHTML='<i class="fas fa-trash-can"></i>',h.title="Delete",h.onclick=()=>{i.remove(),n.remove()},n.appendChild(r),n.appendChild(s),n.appendChild(a),n.appendChild(l),n.appendChild(h),document.getElementById(e).appendChild(n)}function No(i,t,e){ra("mapView"),Qt.fitBounds(i.getBounds()),Go(i);let n=kl();n&&n.classList.remove("historyDivItemClicked"),zl(t),t.classList.toggle("historyDivItemClicked"),e&&(document.getElementById("step1").innerHTML=`Step 1: GeoTIFF - ${e}`)}function ps(i,t,e){ra("mapView"),Qt.fitBounds(i.getBounds()),Bl(i);let n=Hl();n&&n.classList.remove("historyDivItemClicked"),Gl(t),t.classList.toggle("historyDivItemClicked"),e&&(document.getElementById("step2").innerHTML=`Step 2: Crop - ${e}`)}function km(){let i=null,t=null,e=null,n=null;document.getElementById("rectangleTool").addEventListener("click",function(){r("rectangleTool")}),document.getElementById("polygonTool").addEventListener("click",function(){r("polygonTool")}),document.getElementById("circleTool").addEventListener("click",function(){r("circleTool")});function r(_){i==_?o():s(_)}function s(_){o(),i=_,document.getElementById(_).classList.add("selected"),document.getElementById("map").classList.add("crosshair-cursor"),_==="rectangleTool"?Qt.once("click",a):_==="polygonTool"?Qt.on("click",u):_==="circleTool"&&Qt.once("click",p)}function o(){i&&(document.getElementById(i).classList.remove("selected"),document.getElementById("map").classList.remove("crosshair-cursor"),Qt.off("click"),i=null)}function a(_){_.originalEvent.stopPropagation(),n=_.latlng;const m=[n,n];t=L.rectangle(m,{color:"green",weight:2}).addTo(Qt),Qt.on("mousemove",l),Qt.once("click",h)}function l(_){const m=L.latLng(Math.min(n.lat,_.latlng.lat),Math.min(n.lng,_.latlng.lng)),c=L.latLng(Math.max(n.lat,_.latlng.lat),Math.max(n.lng,_.latlng.lng));t.setBounds([m,c])}function h(){Qt.off("mousemove",l),Qt.off("click",h),Ir.addLayer(t),xr(t),t.setStyle({color:"blue"}),yr(t,"Rectangle","drawHistory"),t=null,document.getElementById("rectangleTool").classList.remove("selected"),o()}function u(_){t?t.addLatLng(_.latlng):(t=L.polygon([_.latlng],{color:"green"}).addTo(Qt),e=L.circleMarker(_.latlng,{color:"red",radius:8}).addTo(Qt),e.bindTooltip("Click this point to close the shape",{permanent:!1,opacity:.8}).openTooltip(),e.on("click",f))}function f(){Qt.off("click",u),e.off("click",f),e.remove(),Ir.addLayer(t),xr(t),t.setStyle({color:"blue"}),yr(t,"Polygon","drawHistory"),t=null,e=null,document.getElementById("polygonTool").classList.remove("selected"),o()}function p(_){_.originalEvent.stopPropagation(),n=_.latlng,t=L.circle(n,{radius:0,color:"green",weight:2}).addTo(Qt),Qt.on("mousemove",d),Qt.once("click",v)}function d(_){const m=Qt.distance(n,_.latlng);t.setRadius(m)}function v(){Qt.off("mousemove",d),Qt.off("click",v),Ir.addLayer(t),xr(t),t.setStyle({color:"blue"}),yr(t,"Circle","drawHistory"),t=null,document.getElementById("circleTool").classList.remove("selected"),o()}}function zm(){const i=document.getElementById("geojsonHistory");document.getElementById("tiffUpload").addEventListener("change",function(t){const e=t.target.files[0],n=document.getElementById("tiffUpload"),r=document.querySelector('label[for="tiffUpload"]');if(e){const s=r.innerHTML;n.disabled=!0,r.innerHTML='<i class="fas fa-spinner fa-spin"></i> Uploading...',r.classList.add("loading");const o=new FileReader;o.onload=function(a){const l=a.target.result;parseGeoraster(l).then(h=>{h.filename=e.name;const u=geoblaze.stats(h),f=0,p=u[0].max,d=new GeoRasterLayer({georaster:h,opacity:.7,pixelValuesToColorFn:function(v){if(v<0)return"transparent";{let _=(v-f)/(p-f)*255;return`rgb(${_}, ${_}, ${_})`}},resolution:128});d.addTo(Qt),Fl.addLayer(d),Qt.fitBounds(d.getBounds()),Um(d,e.name,"geotiffHistory"),n.disabled=!1,r.innerHTML=s,r.classList.remove("loading")})},o.readAsArrayBuffer(e)}}),document.getElementById("geojsonUpload").addEventListener("change",function(t){const e=t.target.files[0],n=document.getElementById("geojsonUpload"),r=document.querySelector('label[for="geojsonUpload"]');if(e){const s=r.innerHTML;n.disabled=!0,r.innerHTML='<i class="fas fa-spinner fa-spin"></i> Uploading...',r.classList.add("loading");const o=new FileReader;o.onload=function(a){try{const l=JSON.parse(a.target.result),h=L.geoJSON(l,{onEachFeature:function(d,v){xr(v)}}).addTo(Qt);Qt.fitBounds(h.getBounds());const u=document.createElement("div");u.classList.add("geojsonHistoryDiv");const f=document.createElement("div");f.textContent=e.name+" ▼",f.title="Click to expand",f.cursor="pointer",f.onclick=()=>{p.style.display=p.style.display==="none"?"block":"none"};const p=document.createElement("div");p.id=e.name+"Submenu",p.classList.add("geojsonSubmenu"),p.style.display="none",u.appendChild(f),u.appendChild(p),i.appendChild(u),h.eachLayer(function(d){yr(d,e.name,p.id)}),n.disabled=!1,r.innerHTML=s,r.classList.remove("loading")}catch(l){alert("Invalid GeoJSON file"),console.error("GeoJSON Error:",l)}},o.readAsText(e)}})}function Hm(){const i=document.getElementById("regenerateButton"),t=document.getElementById("exportButton");i.addEventListener("click",async()=>{const e=i.innerHTML;i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin"></i> Generating...',i.classList.add("loading"),t.disabled=!0,t.title="Mesh generation in progress. Please wait...",t.classList.add("loading");try{await _a()}catch(n){console.error("generateDEM failed:",n)}finally{i.disabled=!1,i.innerHTML=e,i.classList.remove("loading"),t.disabled=!1,t.title="",t.classList.remove("loading")}})}class Fo{parse(t,e={}){e=Object.assign({binary:!1},e);const n=e.binary,r=[];let s=0;t.traverse(function(c){if(c.isMesh){const x=c.geometry,M=x.index,E=x.getAttribute("position");s+=M!==null?M.count/3:E.count/3,r.push({object3d:c,geometry:x})}});let o,a=80;if(n===!0){const c=s*2+s*3*4*4+80+4,x=new ArrayBuffer(c);o=new DataView(x),o.setUint32(a,s,!0),a+=4}else o="",o+=`solid exported
`;const l=new z,h=new z,u=new z,f=new z,p=new z,d=new z;for(let c=0,x=r.length;c<x;c++){const M=r[c].object3d,E=r[c].geometry,A=E.index,I=E.getAttribute("position");if(A!==null)for(let R=0;R<A.count;R+=3){const N=A.getX(R+0),b=A.getX(R+1),T=A.getX(R+2);v(N,b,T,I,M)}else for(let R=0;R<I.count;R+=3){const N=R+0,b=R+1,T=R+2;v(N,b,T,I,M)}}return n===!1&&(o+=`endsolid exported
`),o;function v(c,x,M,E,A){l.fromBufferAttribute(E,c),h.fromBufferAttribute(E,x),u.fromBufferAttribute(E,M),A.isSkinnedMesh===!0&&(A.applyBoneTransform(c,l),A.applyBoneTransform(x,h),A.applyBoneTransform(M,u)),l.applyMatrix4(A.matrixWorld),h.applyMatrix4(A.matrixWorld),u.applyMatrix4(A.matrixWorld),_(l,h,u),m(l),m(h),m(u),n===!0?(o.setUint16(a,0,!0),a+=2):(o+=`		endloop
`,o+=`	endfacet
`)}function _(c,x,M){f.subVectors(M,x),p.subVectors(c,x),f.cross(p).normalize(),d.copy(f).normalize(),n===!0?(o.setFloat32(a,d.x,!0),a+=4,o.setFloat32(a,d.y,!0),a+=4,o.setFloat32(a,d.z,!0),a+=4):(o+="	facet normal "+d.x+" "+d.y+" "+d.z+`
`,o+=`		outer loop
`)}function m(c){n===!0?(o.setFloat32(a,c.x,!0),a+=4,o.setFloat32(a,c.y,!0),a+=4,o.setFloat32(a,c.z,!0),a+=4):o+="			vertex "+c.x+" "+c.y+" "+c.z+`
`}}}var cr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Gm(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}function hr(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ms={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/var Oo;function Vm(){return Oo||(Oo=1,function(i,t){(function(e){i.exports=e()})(function(){return function e(n,r,s){function o(h,u){if(!r[h]){if(!n[h]){var f=typeof hr=="function"&&hr;if(!u&&f)return f(h,!0);if(a)return a(h,!0);var p=new Error("Cannot find module '"+h+"'");throw p.code="MODULE_NOT_FOUND",p}var d=r[h]={exports:{}};n[h][0].call(d.exports,function(v){var _=n[h][1][v];return o(_||v)},d,d.exports,e,n,r,s)}return r[h].exports}for(var a=typeof hr=="function"&&hr,l=0;l<s.length;l++)o(s[l]);return o}({1:[function(e,n,r){var s=e("./utils"),o=e("./support"),a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(l){for(var h,u,f,p,d,v,_,m=[],c=0,x=l.length,M=x,E=s.getTypeOf(l)!=="string";c<l.length;)M=x-c,f=E?(h=l[c++],u=c<x?l[c++]:0,c<x?l[c++]:0):(h=l.charCodeAt(c++),u=c<x?l.charCodeAt(c++):0,c<x?l.charCodeAt(c++):0),p=h>>2,d=(3&h)<<4|u>>4,v=1<M?(15&u)<<2|f>>6:64,_=2<M?63&f:64,m.push(a.charAt(p)+a.charAt(d)+a.charAt(v)+a.charAt(_));return m.join("")},r.decode=function(l){var h,u,f,p,d,v,_=0,m=0,c="data:";if(l.substr(0,c.length)===c)throw new Error("Invalid base64 input, it looks like a data url.");var x,M=3*(l=l.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(l.charAt(l.length-1)===a.charAt(64)&&M--,l.charAt(l.length-2)===a.charAt(64)&&M--,M%1!=0)throw new Error("Invalid base64 input, bad content length.");for(x=o.uint8array?new Uint8Array(0|M):new Array(0|M);_<l.length;)h=a.indexOf(l.charAt(_++))<<2|(p=a.indexOf(l.charAt(_++)))>>4,u=(15&p)<<4|(d=a.indexOf(l.charAt(_++)))>>2,f=(3&d)<<6|(v=a.indexOf(l.charAt(_++))),x[m++]=h,d!==64&&(x[m++]=u),v!==64&&(x[m++]=f);return x}},{"./support":30,"./utils":32}],2:[function(e,n,r){var s=e("./external"),o=e("./stream/DataWorker"),a=e("./stream/Crc32Probe"),l=e("./stream/DataLengthProbe");function h(u,f,p,d,v){this.compressedSize=u,this.uncompressedSize=f,this.crc32=p,this.compression=d,this.compressedContent=v}h.prototype={getContentWorker:function(){var u=new o(s.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l("data_length")),f=this;return u.on("end",function(){if(this.streamInfo.data_length!==f.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),u},getCompressedWorker:function(){return new o(s.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},h.createWorkerFrom=function(u,f,p){return u.pipe(new a).pipe(new l("uncompressedSize")).pipe(f.compressWorker(p)).pipe(new l("compressedSize")).withStreamInfo("compression",f)},n.exports=h},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,n,r){var s=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new s("STORE compression")},uncompressWorker:function(){return new s("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,n,r){var s=e("./utils"),o=function(){for(var a,l=[],h=0;h<256;h++){a=h;for(var u=0;u<8;u++)a=1&a?3988292384^a>>>1:a>>>1;l[h]=a}return l}();n.exports=function(a,l){return a!==void 0&&a.length?s.getTypeOf(a)!=="string"?function(h,u,f,p){var d=o,v=p+f;h^=-1;for(var _=p;_<v;_++)h=h>>>8^d[255&(h^u[_])];return-1^h}(0|l,a,a.length,0):function(h,u,f,p){var d=o,v=p+f;h^=-1;for(var _=p;_<v;_++)h=h>>>8^d[255&(h^u.charCodeAt(_))];return-1^h}(0|l,a,a.length,0):0}},{"./utils":32}],5:[function(e,n,r){r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,n,r){var s=null;s=typeof Promise<"u"?Promise:e("lie"),n.exports={Promise:s}},{lie:37}],7:[function(e,n,r){var s=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",o=e("pako"),a=e("./utils"),l=e("./stream/GenericWorker"),h=s?"uint8array":"array";function u(f,p){l.call(this,"FlateWorker/"+f),this._pako=null,this._pakoAction=f,this._pakoOptions=p,this.meta={}}r.magic="\b\0",a.inherits(u,l),u.prototype.processChunk=function(f){this.meta=f.meta,this._pako===null&&this._createPako(),this._pako.push(a.transformTo(h,f.data),!1)},u.prototype.flush=function(){l.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},u.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this._pako=null},u.prototype._createPako=function(){this._pako=new o[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var f=this;this._pako.onData=function(p){f.push({data:p,meta:f.meta})}},r.compressWorker=function(f){return new u("Deflate",f)},r.uncompressWorker=function(){return new u("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,n,r){function s(d,v){var _,m="";for(_=0;_<v;_++)m+=String.fromCharCode(255&d),d>>>=8;return m}function o(d,v,_,m,c,x){var M,E,A=d.file,I=d.compression,R=x!==h.utf8encode,N=a.transformTo("string",x(A.name)),b=a.transformTo("string",h.utf8encode(A.name)),T=A.comment,O=a.transformTo("string",x(T)),C=a.transformTo("string",h.utf8encode(T)),F=b.length!==A.name.length,S=C.length!==T.length,k="",it="",G="",Q=A.dir,tt=A.date,ct={crc32:0,compressedSize:0,uncompressedSize:0};v&&!_||(ct.crc32=d.crc32,ct.compressedSize=d.compressedSize,ct.uncompressedSize=d.uncompressedSize);var V=0;v&&(V|=8),R||!F&&!S||(V|=2048);var q=0,gt=0;Q&&(q|=16),c==="UNIX"?(gt=798,q|=function(nt,_t){var ft=nt;return nt||(ft=_t?16893:33204),(65535&ft)<<16}(A.unixPermissions,Q)):(gt=20,q|=function(nt){return 63&(nt||0)}(A.dosPermissions)),M=tt.getUTCHours(),M<<=6,M|=tt.getUTCMinutes(),M<<=5,M|=tt.getUTCSeconds()/2,E=tt.getUTCFullYear()-1980,E<<=4,E|=tt.getUTCMonth()+1,E<<=5,E|=tt.getUTCDate(),F&&(it=s(1,1)+s(u(N),4)+b,k+="up"+s(it.length,2)+it),S&&(G=s(1,1)+s(u(O),4)+C,k+="uc"+s(G.length,2)+G);var Y="";return Y+=`
\0`,Y+=s(V,2),Y+=I.magic,Y+=s(M,2),Y+=s(E,2),Y+=s(ct.crc32,4),Y+=s(ct.compressedSize,4),Y+=s(ct.uncompressedSize,4),Y+=s(N.length,2),Y+=s(k.length,2),{fileRecord:f.LOCAL_FILE_HEADER+Y+N+k,dirRecord:f.CENTRAL_FILE_HEADER+s(gt,2)+Y+s(O.length,2)+"\0\0\0\0"+s(q,4)+s(m,4)+N+k+O}}var a=e("../utils"),l=e("../stream/GenericWorker"),h=e("../utf8"),u=e("../crc32"),f=e("../signature");function p(d,v,_,m){l.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=v,this.zipPlatform=_,this.encodeFileName=m,this.streamFiles=d,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}a.inherits(p,l),p.prototype.push=function(d){var v=d.meta.percent||0,_=this.entriesCount,m=this._sources.length;this.accumulate?this.contentBuffer.push(d):(this.bytesWritten+=d.data.length,l.prototype.push.call(this,{data:d.data,meta:{currentFile:this.currentFile,percent:_?(v+100*(_-m-1))/_:100}}))},p.prototype.openedSource=function(d){this.currentSourceOffset=this.bytesWritten,this.currentFile=d.file.name;var v=this.streamFiles&&!d.file.dir;if(v){var _=o(d,v,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:_.fileRecord,meta:{percent:0}})}else this.accumulate=!0},p.prototype.closedSource=function(d){this.accumulate=!1;var v=this.streamFiles&&!d.file.dir,_=o(d,v,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(_.dirRecord),v)this.push({data:function(m){return f.DATA_DESCRIPTOR+s(m.crc32,4)+s(m.compressedSize,4)+s(m.uncompressedSize,4)}(d),meta:{percent:100}});else for(this.push({data:_.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},p.prototype.flush=function(){for(var d=this.bytesWritten,v=0;v<this.dirRecords.length;v++)this.push({data:this.dirRecords[v],meta:{percent:100}});var _=this.bytesWritten-d,m=function(c,x,M,E,A){var I=a.transformTo("string",A(E));return f.CENTRAL_DIRECTORY_END+"\0\0\0\0"+s(c,2)+s(c,2)+s(x,4)+s(M,4)+s(I.length,2)+I}(this.dirRecords.length,_,d,this.zipComment,this.encodeFileName);this.push({data:m,meta:{percent:100}})},p.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},p.prototype.registerPrevious=function(d){this._sources.push(d);var v=this;return d.on("data",function(_){v.processChunk(_)}),d.on("end",function(){v.closedSource(v.previous.streamInfo),v._sources.length?v.prepareNextSource():v.end()}),d.on("error",function(_){v.error(_)}),this},p.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},p.prototype.error=function(d){var v=this._sources;if(!l.prototype.error.call(this,d))return!1;for(var _=0;_<v.length;_++)try{v[_].error(d)}catch{}return!0},p.prototype.lock=function(){l.prototype.lock.call(this);for(var d=this._sources,v=0;v<d.length;v++)d[v].lock()},n.exports=p},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,n,r){var s=e("../compressions"),o=e("./ZipFileWorker");r.generateWorker=function(a,l,h){var u=new o(l.streamFiles,h,l.platform,l.encodeFileName),f=0;try{a.forEach(function(p,d){f++;var v=function(x,M){var E=x||M,A=s[E];if(!A)throw new Error(E+" is not a valid compression method !");return A}(d.options.compression,l.compression),_=d.options.compressionOptions||l.compressionOptions||{},m=d.dir,c=d.date;d._compressWorker(v,_).withStreamInfo("file",{name:p,dir:m,date:c,comment:d.comment||"",unixPermissions:d.unixPermissions,dosPermissions:d.dosPermissions}).pipe(u)}),u.entriesCount=f}catch(p){u.error(p)}return u}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,n,r){function s(){if(!(this instanceof s))return new s;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var o=new s;for(var a in this)typeof this[a]!="function"&&(o[a]=this[a]);return o}}(s.prototype=e("./object")).loadAsync=e("./load"),s.support=e("./support"),s.defaults=e("./defaults"),s.version="3.10.1",s.loadAsync=function(o,a){return new s().loadAsync(o,a)},s.external=e("./external"),n.exports=s},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,n,r){var s=e("./utils"),o=e("./external"),a=e("./utf8"),l=e("./zipEntries"),h=e("./stream/Crc32Probe"),u=e("./nodejsUtils");function f(p){return new o.Promise(function(d,v){var _=p.decompressed.getContentWorker().pipe(new h);_.on("error",function(m){v(m)}).on("end",function(){_.streamInfo.crc32!==p.decompressed.crc32?v(new Error("Corrupted zip : CRC32 mismatch")):d()}).resume()})}n.exports=function(p,d){var v=this;return d=s.extend(d||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:a.utf8decode}),u.isNode&&u.isStream(p)?o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):s.prepareContent("the loaded zip file",p,!0,d.optimizedBinaryString,d.base64).then(function(_){var m=new l(d);return m.load(_),m}).then(function(_){var m=[o.Promise.resolve(_)],c=_.files;if(d.checkCRC32)for(var x=0;x<c.length;x++)m.push(f(c[x]));return o.Promise.all(m)}).then(function(_){for(var m=_.shift(),c=m.files,x=0;x<c.length;x++){var M=c[x],E=M.fileNameStr,A=s.resolve(M.fileNameStr);v.file(A,M.decompressed,{binary:!0,optimizedBinaryString:!0,date:M.date,dir:M.dir,comment:M.fileCommentStr.length?M.fileCommentStr:null,unixPermissions:M.unixPermissions,dosPermissions:M.dosPermissions,createFolders:d.createFolders}),M.dir||(v.file(A).unsafeOriginalName=E)}return m.zipComment.length&&(v.comment=m.zipComment),v})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,n,r){var s=e("../utils"),o=e("../stream/GenericWorker");function a(l,h){o.call(this,"Nodejs stream input adapter for "+l),this._upstreamEnded=!1,this._bindStream(h)}s.inherits(a,o),a.prototype._bindStream=function(l){var h=this;(this._stream=l).pause(),l.on("data",function(u){h.push({data:u,meta:{percent:0}})}).on("error",function(u){h.isPaused?this.generatedError=u:h.error(u)}).on("end",function(){h.isPaused?h._upstreamEnded=!0:h.end()})},a.prototype.pause=function(){return!!o.prototype.pause.call(this)&&(this._stream.pause(),!0)},a.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},n.exports=a},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,n,r){var s=e("readable-stream").Readable;function o(a,l,h){s.call(this,l),this._helper=a;var u=this;a.on("data",function(f,p){u.push(f)||u._helper.pause(),h&&h(p)}).on("error",function(f){u.emit("error",f)}).on("end",function(){u.push(null)})}e("../utils").inherits(o,s),o.prototype._read=function(){this._helper.resume()},n.exports=o},{"../utils":32,"readable-stream":16}],14:[function(e,n,r){n.exports={isNode:typeof Buffer<"u",newBufferFrom:function(s,o){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(s,o);if(typeof s=="number")throw new Error('The "data" argument must not be a number');return new Buffer(s,o)},allocBuffer:function(s){if(Buffer.alloc)return Buffer.alloc(s);var o=new Buffer(s);return o.fill(0),o},isBuffer:function(s){return Buffer.isBuffer(s)},isStream:function(s){return s&&typeof s.on=="function"&&typeof s.pause=="function"&&typeof s.resume=="function"}}},{}],15:[function(e,n,r){function s(A,I,R){var N,b=a.getTypeOf(I),T=a.extend(R||{},u);T.date=T.date||new Date,T.compression!==null&&(T.compression=T.compression.toUpperCase()),typeof T.unixPermissions=="string"&&(T.unixPermissions=parseInt(T.unixPermissions,8)),T.unixPermissions&&16384&T.unixPermissions&&(T.dir=!0),T.dosPermissions&&16&T.dosPermissions&&(T.dir=!0),T.dir&&(A=c(A)),T.createFolders&&(N=m(A))&&x.call(this,N,!0);var O=b==="string"&&T.binary===!1&&T.base64===!1;R&&R.binary!==void 0||(T.binary=!O),(I instanceof f&&I.uncompressedSize===0||T.dir||!I||I.length===0)&&(T.base64=!1,T.binary=!0,I="",T.compression="STORE",b="string");var C=null;C=I instanceof f||I instanceof l?I:v.isNode&&v.isStream(I)?new _(A,I):a.prepareContent(A,I,T.binary,T.optimizedBinaryString,T.base64);var F=new p(A,C,T);this.files[A]=F}var o=e("./utf8"),a=e("./utils"),l=e("./stream/GenericWorker"),h=e("./stream/StreamHelper"),u=e("./defaults"),f=e("./compressedObject"),p=e("./zipObject"),d=e("./generate"),v=e("./nodejsUtils"),_=e("./nodejs/NodejsStreamInputAdapter"),m=function(A){A.slice(-1)==="/"&&(A=A.substring(0,A.length-1));var I=A.lastIndexOf("/");return 0<I?A.substring(0,I):""},c=function(A){return A.slice(-1)!=="/"&&(A+="/"),A},x=function(A,I){return I=I!==void 0?I:u.createFolders,A=c(A),this.files[A]||s.call(this,A,null,{dir:!0,createFolders:I}),this.files[A]};function M(A){return Object.prototype.toString.call(A)==="[object RegExp]"}var E={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(A){var I,R,N;for(I in this.files)N=this.files[I],(R=I.slice(this.root.length,I.length))&&I.slice(0,this.root.length)===this.root&&A(R,N)},filter:function(A){var I=[];return this.forEach(function(R,N){A(R,N)&&I.push(N)}),I},file:function(A,I,R){if(arguments.length!==1)return A=this.root+A,s.call(this,A,I,R),this;if(M(A)){var N=A;return this.filter(function(T,O){return!O.dir&&N.test(T)})}var b=this.files[this.root+A];return b&&!b.dir?b:null},folder:function(A){if(!A)return this;if(M(A))return this.filter(function(b,T){return T.dir&&A.test(b)});var I=this.root+A,R=x.call(this,I),N=this.clone();return N.root=R.name,N},remove:function(A){A=this.root+A;var I=this.files[A];if(I||(A.slice(-1)!=="/"&&(A+="/"),I=this.files[A]),I&&!I.dir)delete this.files[A];else for(var R=this.filter(function(b,T){return T.name.slice(0,A.length)===A}),N=0;N<R.length;N++)delete this.files[R[N].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(A){var I,R={};try{if((R=a.extend(A||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:o.utf8encode})).type=R.type.toLowerCase(),R.compression=R.compression.toUpperCase(),R.type==="binarystring"&&(R.type="string"),!R.type)throw new Error("No output type specified.");a.checkSupport(R.type),R.platform!=="darwin"&&R.platform!=="freebsd"&&R.platform!=="linux"&&R.platform!=="sunos"||(R.platform="UNIX"),R.platform==="win32"&&(R.platform="DOS");var N=R.comment||this.comment||"";I=d.generateWorker(this,R,N)}catch(b){(I=new l("error")).error(b)}return new h(I,R.type||"string",R.mimeType)},generateAsync:function(A,I){return this.generateInternalStream(A).accumulate(I)},generateNodeStream:function(A,I){return(A=A||{}).type||(A.type="nodebuffer"),this.generateInternalStream(A).toNodejsStream(I)}};n.exports=E},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,n,r){n.exports=e("stream")},{stream:void 0}],17:[function(e,n,r){var s=e("./DataReader");function o(a){s.call(this,a);for(var l=0;l<this.data.length;l++)a[l]=255&a[l]}e("../utils").inherits(o,s),o.prototype.byteAt=function(a){return this.data[this.zero+a]},o.prototype.lastIndexOfSignature=function(a){for(var l=a.charCodeAt(0),h=a.charCodeAt(1),u=a.charCodeAt(2),f=a.charCodeAt(3),p=this.length-4;0<=p;--p)if(this.data[p]===l&&this.data[p+1]===h&&this.data[p+2]===u&&this.data[p+3]===f)return p-this.zero;return-1},o.prototype.readAndCheckSignature=function(a){var l=a.charCodeAt(0),h=a.charCodeAt(1),u=a.charCodeAt(2),f=a.charCodeAt(3),p=this.readData(4);return l===p[0]&&h===p[1]&&u===p[2]&&f===p[3]},o.prototype.readData=function(a){if(this.checkOffset(a),a===0)return[];var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},n.exports=o},{"../utils":32,"./DataReader":18}],18:[function(e,n,r){var s=e("../utils");function o(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}o.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(){},readInt:function(a){var l,h=0;for(this.checkOffset(a),l=this.index+a-1;l>=this.index;l--)h=(h<<8)+this.byteAt(l);return this.index+=a,h},readString:function(a){return s.transformTo("string",this.readData(a))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC(1980+(a>>25&127),(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},n.exports=o},{"../utils":32}],19:[function(e,n,r){var s=e("./Uint8ArrayReader");function o(a){s.call(this,a)}e("../utils").inherits(o,s),o.prototype.readData=function(a){this.checkOffset(a);var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},n.exports=o},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,n,r){var s=e("./DataReader");function o(a){s.call(this,a)}e("../utils").inherits(o,s),o.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},o.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},o.prototype.readAndCheckSignature=function(a){return a===this.readData(4)},o.prototype.readData=function(a){this.checkOffset(a);var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},n.exports=o},{"../utils":32,"./DataReader":18}],21:[function(e,n,r){var s=e("./ArrayReader");function o(a){s.call(this,a)}e("../utils").inherits(o,s),o.prototype.readData=function(a){if(this.checkOffset(a),a===0)return new Uint8Array(0);var l=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},n.exports=o},{"../utils":32,"./ArrayReader":17}],22:[function(e,n,r){var s=e("../utils"),o=e("../support"),a=e("./ArrayReader"),l=e("./StringReader"),h=e("./NodeBufferReader"),u=e("./Uint8ArrayReader");n.exports=function(f){var p=s.getTypeOf(f);return s.checkSupport(p),p!=="string"||o.uint8array?p==="nodebuffer"?new h(f):o.uint8array?new u(s.transformTo("uint8array",f)):new a(s.transformTo("array",f)):new l(f)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,n,r){r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,n,r){var s=e("./GenericWorker"),o=e("../utils");function a(l){s.call(this,"ConvertWorker to "+l),this.destType=l}o.inherits(a,s),a.prototype.processChunk=function(l){this.push({data:o.transformTo(this.destType,l.data),meta:l.meta})},n.exports=a},{"../utils":32,"./GenericWorker":28}],25:[function(e,n,r){var s=e("./GenericWorker"),o=e("../crc32");function a(){s.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(a,s),a.prototype.processChunk=function(l){this.streamInfo.crc32=o(l.data,this.streamInfo.crc32||0),this.push(l)},n.exports=a},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,n,r){var s=e("../utils"),o=e("./GenericWorker");function a(l){o.call(this,"DataLengthProbe for "+l),this.propName=l,this.withStreamInfo(l,0)}s.inherits(a,o),a.prototype.processChunk=function(l){if(l){var h=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=h+l.data.length}o.prototype.processChunk.call(this,l)},n.exports=a},{"../utils":32,"./GenericWorker":28}],27:[function(e,n,r){var s=e("../utils"),o=e("./GenericWorker");function a(l){o.call(this,"DataWorker");var h=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,l.then(function(u){h.dataIsReady=!0,h.data=u,h.max=u&&u.length||0,h.type=s.getTypeOf(u),h.isPaused||h._tickAndRepeat()},function(u){h.error(u)})}s.inherits(a,o),a.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this.data=null},a.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,s.delay(this._tickAndRepeat,[],this)),!0)},a.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(s.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},a.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var l=null,h=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":l=this.data.substring(this.index,h);break;case"uint8array":l=this.data.subarray(this.index,h);break;case"array":case"nodebuffer":l=this.data.slice(this.index,h)}return this.index=h,this.push({data:l,meta:{percent:this.max?this.index/this.max*100:0}})},n.exports=a},{"../utils":32,"./GenericWorker":28}],28:[function(e,n,r){function s(o){this.name=o||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}s.prototype={push:function(o){this.emit("data",o)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(o){this.emit("error",o)}return!0},error:function(o){return!this.isFinished&&(this.isPaused?this.generatedError=o:(this.isFinished=!0,this.emit("error",o),this.previous&&this.previous.error(o),this.cleanUp()),!0)},on:function(o,a){return this._listeners[o].push(a),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(o,a){if(this._listeners[o])for(var l=0;l<this._listeners[o].length;l++)this._listeners[o][l].call(this,a)},pipe:function(o){return o.registerPrevious(this)},registerPrevious:function(o){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=o.streamInfo,this.mergeStreamInfo(),this.previous=o;var a=this;return o.on("data",function(l){a.processChunk(l)}),o.on("end",function(){a.end()}),o.on("error",function(l){a.error(l)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var o=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),o=!0),this.previous&&this.previous.resume(),!o},flush:function(){},processChunk:function(o){this.push(o)},withStreamInfo:function(o,a){return this.extraStreamInfo[o]=a,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var o in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,o)&&(this.streamInfo[o]=this.extraStreamInfo[o])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var o="Worker "+this.name;return this.previous?this.previous+" -> "+o:o}},n.exports=s},{}],29:[function(e,n,r){var s=e("../utils"),o=e("./ConvertWorker"),a=e("./GenericWorker"),l=e("../base64"),h=e("../support"),u=e("../external"),f=null;if(h.nodestream)try{f=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function p(v,_){return new u.Promise(function(m,c){var x=[],M=v._internalType,E=v._outputType,A=v._mimeType;v.on("data",function(I,R){x.push(I),_&&_(R)}).on("error",function(I){x=[],c(I)}).on("end",function(){try{var I=function(R,N,b){switch(R){case"blob":return s.newBlob(s.transformTo("arraybuffer",N),b);case"base64":return l.encode(N);default:return s.transformTo(R,N)}}(E,function(R,N){var b,T=0,O=null,C=0;for(b=0;b<N.length;b++)C+=N[b].length;switch(R){case"string":return N.join("");case"array":return Array.prototype.concat.apply([],N);case"uint8array":for(O=new Uint8Array(C),b=0;b<N.length;b++)O.set(N[b],T),T+=N[b].length;return O;case"nodebuffer":return Buffer.concat(N);default:throw new Error("concat : unsupported type '"+R+"'")}}(M,x),A);m(I)}catch(R){c(R)}x=[]}).resume()})}function d(v,_,m){var c=_;switch(_){case"blob":case"arraybuffer":c="uint8array";break;case"base64":c="string"}try{this._internalType=c,this._outputType=_,this._mimeType=m,s.checkSupport(c),this._worker=v.pipe(new o(c)),v.lock()}catch(x){this._worker=new a("error"),this._worker.error(x)}}d.prototype={accumulate:function(v){return p(this,v)},on:function(v,_){var m=this;return v==="data"?this._worker.on(v,function(c){_.call(m,c.data,c.meta)}):this._worker.on(v,function(){s.delay(_,arguments,m)}),this},resume:function(){return s.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(v){if(s.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new f(this,{objectMode:this._outputType!=="nodebuffer"},v)}},n.exports=d},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,n,r){if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",r.nodebuffer=typeof Buffer<"u",r.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")r.blob=!1;else{var s=new ArrayBuffer(0);try{r.blob=new Blob([s],{type:"application/zip"}).size===0}catch{try{var o=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);o.append(s),r.blob=o.getBlob("application/zip").size===0}catch{r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch{r.nodestream=!1}},{"readable-stream":16}],31:[function(e,n,r){for(var s=e("./utils"),o=e("./support"),a=e("./nodejsUtils"),l=e("./stream/GenericWorker"),h=new Array(256),u=0;u<256;u++)h[u]=252<=u?6:248<=u?5:240<=u?4:224<=u?3:192<=u?2:1;h[254]=h[254]=1;function f(){l.call(this,"utf-8 decode"),this.leftOver=null}function p(){l.call(this,"utf-8 encode")}r.utf8encode=function(d){return o.nodebuffer?a.newBufferFrom(d,"utf-8"):function(v){var _,m,c,x,M,E=v.length,A=0;for(x=0;x<E;x++)(64512&(m=v.charCodeAt(x)))==55296&&x+1<E&&(64512&(c=v.charCodeAt(x+1)))==56320&&(m=65536+(m-55296<<10)+(c-56320),x++),A+=m<128?1:m<2048?2:m<65536?3:4;for(_=o.uint8array?new Uint8Array(A):new Array(A),x=M=0;M<A;x++)(64512&(m=v.charCodeAt(x)))==55296&&x+1<E&&(64512&(c=v.charCodeAt(x+1)))==56320&&(m=65536+(m-55296<<10)+(c-56320),x++),m<128?_[M++]=m:(m<2048?_[M++]=192|m>>>6:(m<65536?_[M++]=224|m>>>12:(_[M++]=240|m>>>18,_[M++]=128|m>>>12&63),_[M++]=128|m>>>6&63),_[M++]=128|63&m);return _}(d)},r.utf8decode=function(d){return o.nodebuffer?s.transformTo("nodebuffer",d).toString("utf-8"):function(v){var _,m,c,x,M=v.length,E=new Array(2*M);for(_=m=0;_<M;)if((c=v[_++])<128)E[m++]=c;else if(4<(x=h[c]))E[m++]=65533,_+=x-1;else{for(c&=x===2?31:x===3?15:7;1<x&&_<M;)c=c<<6|63&v[_++],x--;1<x?E[m++]=65533:c<65536?E[m++]=c:(c-=65536,E[m++]=55296|c>>10&1023,E[m++]=56320|1023&c)}return E.length!==m&&(E.subarray?E=E.subarray(0,m):E.length=m),s.applyFromCharCode(E)}(d=s.transformTo(o.uint8array?"uint8array":"array",d))},s.inherits(f,l),f.prototype.processChunk=function(d){var v=s.transformTo(o.uint8array?"uint8array":"array",d.data);if(this.leftOver&&this.leftOver.length){if(o.uint8array){var _=v;(v=new Uint8Array(_.length+this.leftOver.length)).set(this.leftOver,0),v.set(_,this.leftOver.length)}else v=this.leftOver.concat(v);this.leftOver=null}var m=function(x,M){var E;for((M=M||x.length)>x.length&&(M=x.length),E=M-1;0<=E&&(192&x[E])==128;)E--;return E<0||E===0?M:E+h[x[E]]>M?E:M}(v),c=v;m!==v.length&&(o.uint8array?(c=v.subarray(0,m),this.leftOver=v.subarray(m,v.length)):(c=v.slice(0,m),this.leftOver=v.slice(m,v.length))),this.push({data:r.utf8decode(c),meta:d.meta})},f.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:r.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},r.Utf8DecodeWorker=f,s.inherits(p,l),p.prototype.processChunk=function(d){this.push({data:r.utf8encode(d.data),meta:d.meta})},r.Utf8EncodeWorker=p},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,n,r){var s=e("./support"),o=e("./base64"),a=e("./nodejsUtils"),l=e("./external");function h(_){return _}function u(_,m){for(var c=0;c<_.length;++c)m[c]=255&_.charCodeAt(c);return m}e("setimmediate"),r.newBlob=function(_,m){r.checkSupport("blob");try{return new Blob([_],{type:m})}catch{try{var c=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return c.append(_),c.getBlob(m)}catch{throw new Error("Bug : can't construct the Blob.")}}};var f={stringifyByChunk:function(_,m,c){var x=[],M=0,E=_.length;if(E<=c)return String.fromCharCode.apply(null,_);for(;M<E;)m==="array"||m==="nodebuffer"?x.push(String.fromCharCode.apply(null,_.slice(M,Math.min(M+c,E)))):x.push(String.fromCharCode.apply(null,_.subarray(M,Math.min(M+c,E)))),M+=c;return x.join("")},stringifyByChar:function(_){for(var m="",c=0;c<_.length;c++)m+=String.fromCharCode(_[c]);return m},applyCanBeUsed:{uint8array:function(){try{return s.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return s.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch{return!1}}()}};function p(_){var m=65536,c=r.getTypeOf(_),x=!0;if(c==="uint8array"?x=f.applyCanBeUsed.uint8array:c==="nodebuffer"&&(x=f.applyCanBeUsed.nodebuffer),x)for(;1<m;)try{return f.stringifyByChunk(_,c,m)}catch{m=Math.floor(m/2)}return f.stringifyByChar(_)}function d(_,m){for(var c=0;c<_.length;c++)m[c]=_[c];return m}r.applyFromCharCode=p;var v={};v.string={string:h,array:function(_){return u(_,new Array(_.length))},arraybuffer:function(_){return v.string.uint8array(_).buffer},uint8array:function(_){return u(_,new Uint8Array(_.length))},nodebuffer:function(_){return u(_,a.allocBuffer(_.length))}},v.array={string:p,array:h,arraybuffer:function(_){return new Uint8Array(_).buffer},uint8array:function(_){return new Uint8Array(_)},nodebuffer:function(_){return a.newBufferFrom(_)}},v.arraybuffer={string:function(_){return p(new Uint8Array(_))},array:function(_){return d(new Uint8Array(_),new Array(_.byteLength))},arraybuffer:h,uint8array:function(_){return new Uint8Array(_)},nodebuffer:function(_){return a.newBufferFrom(new Uint8Array(_))}},v.uint8array={string:p,array:function(_){return d(_,new Array(_.length))},arraybuffer:function(_){return _.buffer},uint8array:h,nodebuffer:function(_){return a.newBufferFrom(_)}},v.nodebuffer={string:p,array:function(_){return d(_,new Array(_.length))},arraybuffer:function(_){return v.nodebuffer.uint8array(_).buffer},uint8array:function(_){return d(_,new Uint8Array(_.length))},nodebuffer:h},r.transformTo=function(_,m){if(m=m||"",!_)return m;r.checkSupport(_);var c=r.getTypeOf(m);return v[c][_](m)},r.resolve=function(_){for(var m=_.split("/"),c=[],x=0;x<m.length;x++){var M=m[x];M==="."||M===""&&x!==0&&x!==m.length-1||(M===".."?c.pop():c.push(M))}return c.join("/")},r.getTypeOf=function(_){return typeof _=="string"?"string":Object.prototype.toString.call(_)==="[object Array]"?"array":s.nodebuffer&&a.isBuffer(_)?"nodebuffer":s.uint8array&&_ instanceof Uint8Array?"uint8array":s.arraybuffer&&_ instanceof ArrayBuffer?"arraybuffer":void 0},r.checkSupport=function(_){if(!s[_.toLowerCase()])throw new Error(_+" is not supported by this platform")},r.MAX_VALUE_16BITS=65535,r.MAX_VALUE_32BITS=-1,r.pretty=function(_){var m,c,x="";for(c=0;c<(_||"").length;c++)x+="\\x"+((m=_.charCodeAt(c))<16?"0":"")+m.toString(16).toUpperCase();return x},r.delay=function(_,m,c){setImmediate(function(){_.apply(c||null,m||[])})},r.inherits=function(_,m){function c(){}c.prototype=m.prototype,_.prototype=new c},r.extend=function(){var _,m,c={};for(_=0;_<arguments.length;_++)for(m in arguments[_])Object.prototype.hasOwnProperty.call(arguments[_],m)&&c[m]===void 0&&(c[m]=arguments[_][m]);return c},r.prepareContent=function(_,m,c,x,M){return l.Promise.resolve(m).then(function(E){return s.blob&&(E instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(E))!==-1)&&typeof FileReader<"u"?new l.Promise(function(A,I){var R=new FileReader;R.onload=function(N){A(N.target.result)},R.onerror=function(N){I(N.target.error)},R.readAsArrayBuffer(E)}):E}).then(function(E){var A=r.getTypeOf(E);return A?(A==="arraybuffer"?E=r.transformTo("uint8array",E):A==="string"&&(M?E=o.decode(E):c&&x!==!0&&(E=function(I){return u(I,s.uint8array?new Uint8Array(I.length):new Array(I.length))}(E))),E):l.Promise.reject(new Error("Can't read the data of '"+_+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,n,r){var s=e("./reader/readerFor"),o=e("./utils"),a=e("./signature"),l=e("./zipEntry"),h=e("./support");function u(f){this.files=[],this.loadOptions=f}u.prototype={checkSignature:function(f){if(!this.reader.readAndCheckSignature(f)){this.reader.index-=4;var p=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+o.pretty(p)+", expected "+o.pretty(f)+")")}},isSignature:function(f,p){var d=this.reader.index;this.reader.setIndex(f);var v=this.reader.readString(4)===p;return this.reader.setIndex(d),v},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var f=this.reader.readData(this.zipCommentLength),p=h.uint8array?"uint8array":"array",d=o.transformTo(p,f);this.zipComment=this.loadOptions.decodeFileName(d)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var f,p,d,v=this.zip64EndOfCentralSize-44;0<v;)f=this.reader.readInt(2),p=this.reader.readInt(4),d=this.reader.readData(p),this.zip64ExtensibleData[f]={id:f,length:p,value:d}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var f,p;for(f=0;f<this.files.length;f++)p=this.files[f],this.reader.setIndex(p.localHeaderOffset),this.checkSignature(a.LOCAL_FILE_HEADER),p.readLocalPart(this.reader),p.handleUTF8(),p.processAttributes()},readCentralDir:function(){var f;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);)(f=new l({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(f);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var f=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(f<0)throw this.isSignature(0,a.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(f);var p=f;if(this.checkSignature(a.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===o.MAX_VALUE_16BITS||this.diskWithCentralDirStart===o.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===o.MAX_VALUE_16BITS||this.centralDirRecords===o.MAX_VALUE_16BITS||this.centralDirSize===o.MAX_VALUE_32BITS||this.centralDirOffset===o.MAX_VALUE_32BITS){if(this.zip64=!0,(f=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(f),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var d=this.centralDirOffset+this.centralDirSize;this.zip64&&(d+=20,d+=12+this.zip64EndOfCentralSize);var v=p-d;if(0<v)this.isSignature(p,a.CENTRAL_FILE_HEADER)||(this.reader.zero=v);else if(v<0)throw new Error("Corrupted zip: missing "+Math.abs(v)+" bytes.")},prepareReader:function(f){this.reader=s(f)},load:function(f){this.prepareReader(f),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},n.exports=u},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,n,r){var s=e("./reader/readerFor"),o=e("./utils"),a=e("./compressedObject"),l=e("./crc32"),h=e("./utf8"),u=e("./compressions"),f=e("./support");function p(d,v){this.options=d,this.loadOptions=v}p.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(d){var v,_;if(d.skip(22),this.fileNameLength=d.readInt(2),_=d.readInt(2),this.fileName=d.readData(this.fileNameLength),d.skip(_),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((v=function(m){for(var c in u)if(Object.prototype.hasOwnProperty.call(u,c)&&u[c].magic===m)return u[c];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+o.pretty(this.compressionMethod)+" unknown (inner file : "+o.transformTo("string",this.fileName)+")");this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,v,d.readData(this.compressedSize))},readCentralPart:function(d){this.versionMadeBy=d.readInt(2),d.skip(2),this.bitFlag=d.readInt(2),this.compressionMethod=d.readString(2),this.date=d.readDate(),this.crc32=d.readInt(4),this.compressedSize=d.readInt(4),this.uncompressedSize=d.readInt(4);var v=d.readInt(2);if(this.extraFieldsLength=d.readInt(2),this.fileCommentLength=d.readInt(2),this.diskNumberStart=d.readInt(2),this.internalFileAttributes=d.readInt(2),this.externalFileAttributes=d.readInt(4),this.localHeaderOffset=d.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");d.skip(v),this.readExtraFields(d),this.parseZIP64ExtraField(d),this.fileComment=d.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var d=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),d==0&&(this.dosPermissions=63&this.externalFileAttributes),d==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var d=s(this.extraFields[1].value);this.uncompressedSize===o.MAX_VALUE_32BITS&&(this.uncompressedSize=d.readInt(8)),this.compressedSize===o.MAX_VALUE_32BITS&&(this.compressedSize=d.readInt(8)),this.localHeaderOffset===o.MAX_VALUE_32BITS&&(this.localHeaderOffset=d.readInt(8)),this.diskNumberStart===o.MAX_VALUE_32BITS&&(this.diskNumberStart=d.readInt(4))}},readExtraFields:function(d){var v,_,m,c=d.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});d.index+4<c;)v=d.readInt(2),_=d.readInt(2),m=d.readData(_),this.extraFields[v]={id:v,length:_,value:m};d.setIndex(c)},handleUTF8:function(){var d=f.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=h.utf8decode(this.fileName),this.fileCommentStr=h.utf8decode(this.fileComment);else{var v=this.findExtraFieldUnicodePath();if(v!==null)this.fileNameStr=v;else{var _=o.transformTo(d,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(_)}var m=this.findExtraFieldUnicodeComment();if(m!==null)this.fileCommentStr=m;else{var c=o.transformTo(d,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(c)}}},findExtraFieldUnicodePath:function(){var d=this.extraFields[28789];if(d){var v=s(d.value);return v.readInt(1)!==1||l(this.fileName)!==v.readInt(4)?null:h.utf8decode(v.readData(d.length-5))}return null},findExtraFieldUnicodeComment:function(){var d=this.extraFields[25461];if(d){var v=s(d.value);return v.readInt(1)!==1||l(this.fileComment)!==v.readInt(4)?null:h.utf8decode(v.readData(d.length-5))}return null}},n.exports=p},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,n,r){function s(v,_,m){this.name=v,this.dir=m.dir,this.date=m.date,this.comment=m.comment,this.unixPermissions=m.unixPermissions,this.dosPermissions=m.dosPermissions,this._data=_,this._dataBinary=m.binary,this.options={compression:m.compression,compressionOptions:m.compressionOptions}}var o=e("./stream/StreamHelper"),a=e("./stream/DataWorker"),l=e("./utf8"),h=e("./compressedObject"),u=e("./stream/GenericWorker");s.prototype={internalStream:function(v){var _=null,m="string";try{if(!v)throw new Error("No output type specified.");var c=(m=v.toLowerCase())==="string"||m==="text";m!=="binarystring"&&m!=="text"||(m="string"),_=this._decompressWorker();var x=!this._dataBinary;x&&!c&&(_=_.pipe(new l.Utf8EncodeWorker)),!x&&c&&(_=_.pipe(new l.Utf8DecodeWorker))}catch(M){(_=new u("error")).error(M)}return new o(_,m,"")},async:function(v,_){return this.internalStream(v).accumulate(_)},nodeStream:function(v,_){return this.internalStream(v||"nodebuffer").toNodejsStream(_)},_compressWorker:function(v,_){if(this._data instanceof h&&this._data.compression.magic===v.magic)return this._data.getCompressedWorker();var m=this._decompressWorker();return this._dataBinary||(m=m.pipe(new l.Utf8EncodeWorker)),h.createWorkerFrom(m,v,_)},_decompressWorker:function(){return this._data instanceof h?this._data.getContentWorker():this._data instanceof u?this._data:new a(this._data)}};for(var f=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],p=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},d=0;d<f.length;d++)s.prototype[f[d]]=p;n.exports=s},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,n,r){(function(s){var o,a,l=s.MutationObserver||s.WebKitMutationObserver;if(l){var h=0,u=new l(v),f=s.document.createTextNode("");u.observe(f,{characterData:!0}),o=function(){f.data=h=++h%2}}else if(s.setImmediate||s.MessageChannel===void 0)o="document"in s&&"onreadystatechange"in s.document.createElement("script")?function(){var _=s.document.createElement("script");_.onreadystatechange=function(){v(),_.onreadystatechange=null,_.parentNode.removeChild(_),_=null},s.document.documentElement.appendChild(_)}:function(){setTimeout(v,0)};else{var p=new s.MessageChannel;p.port1.onmessage=v,o=function(){p.port2.postMessage(0)}}var d=[];function v(){var _,m;a=!0;for(var c=d.length;c;){for(m=d,d=[],_=-1;++_<c;)m[_]();c=d.length}a=!1}n.exports=function(_){d.push(_)!==1||a||o()}}).call(this,typeof cr<"u"?cr:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,n,r){var s=e("immediate");function o(){}var a={},l=["REJECTED"],h=["FULFILLED"],u=["PENDING"];function f(c){if(typeof c!="function")throw new TypeError("resolver must be a function");this.state=u,this.queue=[],this.outcome=void 0,c!==o&&_(this,c)}function p(c,x,M){this.promise=c,typeof x=="function"&&(this.onFulfilled=x,this.callFulfilled=this.otherCallFulfilled),typeof M=="function"&&(this.onRejected=M,this.callRejected=this.otherCallRejected)}function d(c,x,M){s(function(){var E;try{E=x(M)}catch(A){return a.reject(c,A)}E===c?a.reject(c,new TypeError("Cannot resolve promise with itself")):a.resolve(c,E)})}function v(c){var x=c&&c.then;if(c&&(typeof c=="object"||typeof c=="function")&&typeof x=="function")return function(){x.apply(c,arguments)}}function _(c,x){var M=!1;function E(R){M||(M=!0,a.reject(c,R))}function A(R){M||(M=!0,a.resolve(c,R))}var I=m(function(){x(A,E)});I.status==="error"&&E(I.value)}function m(c,x){var M={};try{M.value=c(x),M.status="success"}catch(E){M.status="error",M.value=E}return M}(n.exports=f).prototype.finally=function(c){if(typeof c!="function")return this;var x=this.constructor;return this.then(function(M){return x.resolve(c()).then(function(){return M})},function(M){return x.resolve(c()).then(function(){throw M})})},f.prototype.catch=function(c){return this.then(null,c)},f.prototype.then=function(c,x){if(typeof c!="function"&&this.state===h||typeof x!="function"&&this.state===l)return this;var M=new this.constructor(o);return this.state!==u?d(M,this.state===h?c:x,this.outcome):this.queue.push(new p(M,c,x)),M},p.prototype.callFulfilled=function(c){a.resolve(this.promise,c)},p.prototype.otherCallFulfilled=function(c){d(this.promise,this.onFulfilled,c)},p.prototype.callRejected=function(c){a.reject(this.promise,c)},p.prototype.otherCallRejected=function(c){d(this.promise,this.onRejected,c)},a.resolve=function(c,x){var M=m(v,x);if(M.status==="error")return a.reject(c,M.value);var E=M.value;if(E)_(c,E);else{c.state=h,c.outcome=x;for(var A=-1,I=c.queue.length;++A<I;)c.queue[A].callFulfilled(x)}return c},a.reject=function(c,x){c.state=l,c.outcome=x;for(var M=-1,E=c.queue.length;++M<E;)c.queue[M].callRejected(x);return c},f.resolve=function(c){return c instanceof this?c:a.resolve(new this(o),c)},f.reject=function(c){var x=new this(o);return a.reject(x,c)},f.all=function(c){var x=this;if(Object.prototype.toString.call(c)!=="[object Array]")return this.reject(new TypeError("must be an array"));var M=c.length,E=!1;if(!M)return this.resolve([]);for(var A=new Array(M),I=0,R=-1,N=new this(o);++R<M;)b(c[R],R);return N;function b(T,O){x.resolve(T).then(function(C){A[O]=C,++I!==M||E||(E=!0,a.resolve(N,A))},function(C){E||(E=!0,a.reject(N,C))})}},f.race=function(c){var x=this;if(Object.prototype.toString.call(c)!=="[object Array]")return this.reject(new TypeError("must be an array"));var M=c.length,E=!1;if(!M)return this.resolve([]);for(var A=-1,I=new this(o);++A<M;)R=c[A],x.resolve(R).then(function(N){E||(E=!0,a.resolve(I,N))},function(N){E||(E=!0,a.reject(I,N))});var R;return I}},{immediate:36}],38:[function(e,n,r){var s={};(0,e("./lib/utils/common").assign)(s,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),n.exports=s},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,n,r){var s=e("./zlib/deflate"),o=e("./utils/common"),a=e("./utils/strings"),l=e("./zlib/messages"),h=e("./zlib/zstream"),u=Object.prototype.toString,f=0,p=-1,d=0,v=8;function _(c){if(!(this instanceof _))return new _(c);this.options=o.assign({level:p,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},c||{});var x=this.options;x.raw&&0<x.windowBits?x.windowBits=-x.windowBits:x.gzip&&0<x.windowBits&&x.windowBits<16&&(x.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var M=s.deflateInit2(this.strm,x.level,x.method,x.windowBits,x.memLevel,x.strategy);if(M!==f)throw new Error(l[M]);if(x.header&&s.deflateSetHeader(this.strm,x.header),x.dictionary){var E;if(E=typeof x.dictionary=="string"?a.string2buf(x.dictionary):u.call(x.dictionary)==="[object ArrayBuffer]"?new Uint8Array(x.dictionary):x.dictionary,(M=s.deflateSetDictionary(this.strm,E))!==f)throw new Error(l[M]);this._dict_set=!0}}function m(c,x){var M=new _(x);if(M.push(c,!0),M.err)throw M.msg||l[M.err];return M.result}_.prototype.push=function(c,x){var M,E,A=this.strm,I=this.options.chunkSize;if(this.ended)return!1;E=x===~~x?x:x===!0?4:0,typeof c=="string"?A.input=a.string2buf(c):u.call(c)==="[object ArrayBuffer]"?A.input=new Uint8Array(c):A.input=c,A.next_in=0,A.avail_in=A.input.length;do{if(A.avail_out===0&&(A.output=new o.Buf8(I),A.next_out=0,A.avail_out=I),(M=s.deflate(A,E))!==1&&M!==f)return this.onEnd(M),!(this.ended=!0);A.avail_out!==0&&(A.avail_in!==0||E!==4&&E!==2)||(this.options.to==="string"?this.onData(a.buf2binstring(o.shrinkBuf(A.output,A.next_out))):this.onData(o.shrinkBuf(A.output,A.next_out)))}while((0<A.avail_in||A.avail_out===0)&&M!==1);return E===4?(M=s.deflateEnd(this.strm),this.onEnd(M),this.ended=!0,M===f):E!==2||(this.onEnd(f),!(A.avail_out=0))},_.prototype.onData=function(c){this.chunks.push(c)},_.prototype.onEnd=function(c){c===f&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=c,this.msg=this.strm.msg},r.Deflate=_,r.deflate=m,r.deflateRaw=function(c,x){return(x=x||{}).raw=!0,m(c,x)},r.gzip=function(c,x){return(x=x||{}).gzip=!0,m(c,x)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,n,r){var s=e("./zlib/inflate"),o=e("./utils/common"),a=e("./utils/strings"),l=e("./zlib/constants"),h=e("./zlib/messages"),u=e("./zlib/zstream"),f=e("./zlib/gzheader"),p=Object.prototype.toString;function d(_){if(!(this instanceof d))return new d(_);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},_||{});var m=this.options;m.raw&&0<=m.windowBits&&m.windowBits<16&&(m.windowBits=-m.windowBits,m.windowBits===0&&(m.windowBits=-15)),!(0<=m.windowBits&&m.windowBits<16)||_&&_.windowBits||(m.windowBits+=32),15<m.windowBits&&m.windowBits<48&&!(15&m.windowBits)&&(m.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var c=s.inflateInit2(this.strm,m.windowBits);if(c!==l.Z_OK)throw new Error(h[c]);this.header=new f,s.inflateGetHeader(this.strm,this.header)}function v(_,m){var c=new d(m);if(c.push(_,!0),c.err)throw c.msg||h[c.err];return c.result}d.prototype.push=function(_,m){var c,x,M,E,A,I,R=this.strm,N=this.options.chunkSize,b=this.options.dictionary,T=!1;if(this.ended)return!1;x=m===~~m?m:m===!0?l.Z_FINISH:l.Z_NO_FLUSH,typeof _=="string"?R.input=a.binstring2buf(_):p.call(_)==="[object ArrayBuffer]"?R.input=new Uint8Array(_):R.input=_,R.next_in=0,R.avail_in=R.input.length;do{if(R.avail_out===0&&(R.output=new o.Buf8(N),R.next_out=0,R.avail_out=N),(c=s.inflate(R,l.Z_NO_FLUSH))===l.Z_NEED_DICT&&b&&(I=typeof b=="string"?a.string2buf(b):p.call(b)==="[object ArrayBuffer]"?new Uint8Array(b):b,c=s.inflateSetDictionary(this.strm,I)),c===l.Z_BUF_ERROR&&T===!0&&(c=l.Z_OK,T=!1),c!==l.Z_STREAM_END&&c!==l.Z_OK)return this.onEnd(c),!(this.ended=!0);R.next_out&&(R.avail_out!==0&&c!==l.Z_STREAM_END&&(R.avail_in!==0||x!==l.Z_FINISH&&x!==l.Z_SYNC_FLUSH)||(this.options.to==="string"?(M=a.utf8border(R.output,R.next_out),E=R.next_out-M,A=a.buf2string(R.output,M),R.next_out=E,R.avail_out=N-E,E&&o.arraySet(R.output,R.output,M,E,0),this.onData(A)):this.onData(o.shrinkBuf(R.output,R.next_out)))),R.avail_in===0&&R.avail_out===0&&(T=!0)}while((0<R.avail_in||R.avail_out===0)&&c!==l.Z_STREAM_END);return c===l.Z_STREAM_END&&(x=l.Z_FINISH),x===l.Z_FINISH?(c=s.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===l.Z_OK):x!==l.Z_SYNC_FLUSH||(this.onEnd(l.Z_OK),!(R.avail_out=0))},d.prototype.onData=function(_){this.chunks.push(_)},d.prototype.onEnd=function(_){_===l.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=_,this.msg=this.strm.msg},r.Inflate=d,r.inflate=v,r.inflateRaw=function(_,m){return(m=m||{}).raw=!0,v(_,m)},r.ungzip=v},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,n,r){var s=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";r.assign=function(l){for(var h=Array.prototype.slice.call(arguments,1);h.length;){var u=h.shift();if(u){if(typeof u!="object")throw new TypeError(u+"must be non-object");for(var f in u)u.hasOwnProperty(f)&&(l[f]=u[f])}}return l},r.shrinkBuf=function(l,h){return l.length===h?l:l.subarray?l.subarray(0,h):(l.length=h,l)};var o={arraySet:function(l,h,u,f,p){if(h.subarray&&l.subarray)l.set(h.subarray(u,u+f),p);else for(var d=0;d<f;d++)l[p+d]=h[u+d]},flattenChunks:function(l){var h,u,f,p,d,v;for(h=f=0,u=l.length;h<u;h++)f+=l[h].length;for(v=new Uint8Array(f),h=p=0,u=l.length;h<u;h++)d=l[h],v.set(d,p),p+=d.length;return v}},a={arraySet:function(l,h,u,f,p){for(var d=0;d<f;d++)l[p+d]=h[u+d]},flattenChunks:function(l){return[].concat.apply([],l)}};r.setTyped=function(l){l?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,o)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,a))},r.setTyped(s)},{}],42:[function(e,n,r){var s=e("./common"),o=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch{o=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{a=!1}for(var l=new s.Buf8(256),h=0;h<256;h++)l[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;function u(f,p){if(p<65537&&(f.subarray&&a||!f.subarray&&o))return String.fromCharCode.apply(null,s.shrinkBuf(f,p));for(var d="",v=0;v<p;v++)d+=String.fromCharCode(f[v]);return d}l[254]=l[254]=1,r.string2buf=function(f){var p,d,v,_,m,c=f.length,x=0;for(_=0;_<c;_++)(64512&(d=f.charCodeAt(_)))==55296&&_+1<c&&(64512&(v=f.charCodeAt(_+1)))==56320&&(d=65536+(d-55296<<10)+(v-56320),_++),x+=d<128?1:d<2048?2:d<65536?3:4;for(p=new s.Buf8(x),_=m=0;m<x;_++)(64512&(d=f.charCodeAt(_)))==55296&&_+1<c&&(64512&(v=f.charCodeAt(_+1)))==56320&&(d=65536+(d-55296<<10)+(v-56320),_++),d<128?p[m++]=d:(d<2048?p[m++]=192|d>>>6:(d<65536?p[m++]=224|d>>>12:(p[m++]=240|d>>>18,p[m++]=128|d>>>12&63),p[m++]=128|d>>>6&63),p[m++]=128|63&d);return p},r.buf2binstring=function(f){return u(f,f.length)},r.binstring2buf=function(f){for(var p=new s.Buf8(f.length),d=0,v=p.length;d<v;d++)p[d]=f.charCodeAt(d);return p},r.buf2string=function(f,p){var d,v,_,m,c=p||f.length,x=new Array(2*c);for(d=v=0;d<c;)if((_=f[d++])<128)x[v++]=_;else if(4<(m=l[_]))x[v++]=65533,d+=m-1;else{for(_&=m===2?31:m===3?15:7;1<m&&d<c;)_=_<<6|63&f[d++],m--;1<m?x[v++]=65533:_<65536?x[v++]=_:(_-=65536,x[v++]=55296|_>>10&1023,x[v++]=56320|1023&_)}return u(x,v)},r.utf8border=function(f,p){var d;for((p=p||f.length)>f.length&&(p=f.length),d=p-1;0<=d&&(192&f[d])==128;)d--;return d<0||d===0?p:d+l[f[d]]>p?d:p}},{"./common":41}],43:[function(e,n,r){n.exports=function(s,o,a,l){for(var h=65535&s|0,u=s>>>16&65535|0,f=0;a!==0;){for(a-=f=2e3<a?2e3:a;u=u+(h=h+o[l++]|0)|0,--f;);h%=65521,u%=65521}return h|u<<16|0}},{}],44:[function(e,n,r){n.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,n,r){var s=function(){for(var o,a=[],l=0;l<256;l++){o=l;for(var h=0;h<8;h++)o=1&o?3988292384^o>>>1:o>>>1;a[l]=o}return a}();n.exports=function(o,a,l,h){var u=s,f=h+l;o^=-1;for(var p=h;p<f;p++)o=o>>>8^u[255&(o^a[p])];return-1^o}},{}],46:[function(e,n,r){var s,o=e("../utils/common"),a=e("./trees"),l=e("./adler32"),h=e("./crc32"),u=e("./messages"),f=0,p=4,d=0,v=-2,_=-1,m=4,c=2,x=8,M=9,E=286,A=30,I=19,R=2*E+1,N=15,b=3,T=258,O=T+b+1,C=42,F=113,S=1,k=2,it=3,G=4;function Q(g,ot){return g.msg=u[ot],ot}function tt(g){return(g<<1)-(4<g?9:0)}function ct(g){for(var ot=g.length;0<=--ot;)g[ot]=0}function V(g){var ot=g.state,$=ot.pending;$>g.avail_out&&($=g.avail_out),$!==0&&(o.arraySet(g.output,ot.pending_buf,ot.pending_out,$,g.next_out),g.next_out+=$,ot.pending_out+=$,g.total_out+=$,g.avail_out-=$,ot.pending-=$,ot.pending===0&&(ot.pending_out=0))}function q(g,ot){a._tr_flush_block(g,0<=g.block_start?g.block_start:-1,g.strstart-g.block_start,ot),g.block_start=g.strstart,V(g.strm)}function gt(g,ot){g.pending_buf[g.pending++]=ot}function Y(g,ot){g.pending_buf[g.pending++]=ot>>>8&255,g.pending_buf[g.pending++]=255&ot}function nt(g,ot){var $,U,D=g.max_chain_length,H=g.strstart,et=g.prev_length,w=g.nice_match,y=g.strstart>g.w_size-O?g.strstart-(g.w_size-O):0,B=g.window,Z=g.w_mask,X=g.prev,J=g.strstart+T,mt=B[H+et-1],ht=B[H+et];g.prev_length>=g.good_match&&(D>>=2),w>g.lookahead&&(w=g.lookahead);do if(B[($=ot)+et]===ht&&B[$+et-1]===mt&&B[$]===B[H]&&B[++$]===B[H+1]){H+=2,$++;do;while(B[++H]===B[++$]&&B[++H]===B[++$]&&B[++H]===B[++$]&&B[++H]===B[++$]&&B[++H]===B[++$]&&B[++H]===B[++$]&&B[++H]===B[++$]&&B[++H]===B[++$]&&H<J);if(U=T-(J-H),H=J-T,et<U){if(g.match_start=ot,w<=(et=U))break;mt=B[H+et-1],ht=B[H+et]}}while((ot=X[ot&Z])>y&&--D!=0);return et<=g.lookahead?et:g.lookahead}function _t(g){var ot,$,U,D,H,et,w,y,B,Z,X=g.w_size;do{if(D=g.window_size-g.lookahead-g.strstart,g.strstart>=X+(X-O)){for(o.arraySet(g.window,g.window,X,X,0),g.match_start-=X,g.strstart-=X,g.block_start-=X,ot=$=g.hash_size;U=g.head[--ot],g.head[ot]=X<=U?U-X:0,--$;);for(ot=$=X;U=g.prev[--ot],g.prev[ot]=X<=U?U-X:0,--$;);D+=X}if(g.strm.avail_in===0)break;if(et=g.strm,w=g.window,y=g.strstart+g.lookahead,B=D,Z=void 0,Z=et.avail_in,B<Z&&(Z=B),$=Z===0?0:(et.avail_in-=Z,o.arraySet(w,et.input,et.next_in,Z,y),et.state.wrap===1?et.adler=l(et.adler,w,Z,y):et.state.wrap===2&&(et.adler=h(et.adler,w,Z,y)),et.next_in+=Z,et.total_in+=Z,Z),g.lookahead+=$,g.lookahead+g.insert>=b)for(H=g.strstart-g.insert,g.ins_h=g.window[H],g.ins_h=(g.ins_h<<g.hash_shift^g.window[H+1])&g.hash_mask;g.insert&&(g.ins_h=(g.ins_h<<g.hash_shift^g.window[H+b-1])&g.hash_mask,g.prev[H&g.w_mask]=g.head[g.ins_h],g.head[g.ins_h]=H,H++,g.insert--,!(g.lookahead+g.insert<b)););}while(g.lookahead<O&&g.strm.avail_in!==0)}function ft(g,ot){for(var $,U;;){if(g.lookahead<O){if(_t(g),g.lookahead<O&&ot===f)return S;if(g.lookahead===0)break}if($=0,g.lookahead>=b&&(g.ins_h=(g.ins_h<<g.hash_shift^g.window[g.strstart+b-1])&g.hash_mask,$=g.prev[g.strstart&g.w_mask]=g.head[g.ins_h],g.head[g.ins_h]=g.strstart),$!==0&&g.strstart-$<=g.w_size-O&&(g.match_length=nt(g,$)),g.match_length>=b)if(U=a._tr_tally(g,g.strstart-g.match_start,g.match_length-b),g.lookahead-=g.match_length,g.match_length<=g.max_lazy_match&&g.lookahead>=b){for(g.match_length--;g.strstart++,g.ins_h=(g.ins_h<<g.hash_shift^g.window[g.strstart+b-1])&g.hash_mask,$=g.prev[g.strstart&g.w_mask]=g.head[g.ins_h],g.head[g.ins_h]=g.strstart,--g.match_length!=0;);g.strstart++}else g.strstart+=g.match_length,g.match_length=0,g.ins_h=g.window[g.strstart],g.ins_h=(g.ins_h<<g.hash_shift^g.window[g.strstart+1])&g.hash_mask;else U=a._tr_tally(g,0,g.window[g.strstart]),g.lookahead--,g.strstart++;if(U&&(q(g,!1),g.strm.avail_out===0))return S}return g.insert=g.strstart<b-1?g.strstart:b-1,ot===p?(q(g,!0),g.strm.avail_out===0?it:G):g.last_lit&&(q(g,!1),g.strm.avail_out===0)?S:k}function pt(g,ot){for(var $,U,D;;){if(g.lookahead<O){if(_t(g),g.lookahead<O&&ot===f)return S;if(g.lookahead===0)break}if($=0,g.lookahead>=b&&(g.ins_h=(g.ins_h<<g.hash_shift^g.window[g.strstart+b-1])&g.hash_mask,$=g.prev[g.strstart&g.w_mask]=g.head[g.ins_h],g.head[g.ins_h]=g.strstart),g.prev_length=g.match_length,g.prev_match=g.match_start,g.match_length=b-1,$!==0&&g.prev_length<g.max_lazy_match&&g.strstart-$<=g.w_size-O&&(g.match_length=nt(g,$),g.match_length<=5&&(g.strategy===1||g.match_length===b&&4096<g.strstart-g.match_start)&&(g.match_length=b-1)),g.prev_length>=b&&g.match_length<=g.prev_length){for(D=g.strstart+g.lookahead-b,U=a._tr_tally(g,g.strstart-1-g.prev_match,g.prev_length-b),g.lookahead-=g.prev_length-1,g.prev_length-=2;++g.strstart<=D&&(g.ins_h=(g.ins_h<<g.hash_shift^g.window[g.strstart+b-1])&g.hash_mask,$=g.prev[g.strstart&g.w_mask]=g.head[g.ins_h],g.head[g.ins_h]=g.strstart),--g.prev_length!=0;);if(g.match_available=0,g.match_length=b-1,g.strstart++,U&&(q(g,!1),g.strm.avail_out===0))return S}else if(g.match_available){if((U=a._tr_tally(g,0,g.window[g.strstart-1]))&&q(g,!1),g.strstart++,g.lookahead--,g.strm.avail_out===0)return S}else g.match_available=1,g.strstart++,g.lookahead--}return g.match_available&&(U=a._tr_tally(g,0,g.window[g.strstart-1]),g.match_available=0),g.insert=g.strstart<b-1?g.strstart:b-1,ot===p?(q(g,!0),g.strm.avail_out===0?it:G):g.last_lit&&(q(g,!1),g.strm.avail_out===0)?S:k}function Pt(g,ot,$,U,D){this.good_length=g,this.max_lazy=ot,this.nice_length=$,this.max_chain=U,this.func=D}function At(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=x,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new o.Buf16(2*R),this.dyn_dtree=new o.Buf16(2*(2*A+1)),this.bl_tree=new o.Buf16(2*(2*I+1)),ct(this.dyn_ltree),ct(this.dyn_dtree),ct(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new o.Buf16(N+1),this.heap=new o.Buf16(2*E+1),ct(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new o.Buf16(2*E+1),ct(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Bt(g){var ot;return g&&g.state?(g.total_in=g.total_out=0,g.data_type=c,(ot=g.state).pending=0,ot.pending_out=0,ot.wrap<0&&(ot.wrap=-ot.wrap),ot.status=ot.wrap?C:F,g.adler=ot.wrap===2?0:1,ot.last_flush=f,a._tr_init(ot),d):Q(g,v)}function Yt(g){var ot=Bt(g);return ot===d&&function($){$.window_size=2*$.w_size,ct($.head),$.max_lazy_match=s[$.level].max_lazy,$.good_match=s[$.level].good_length,$.nice_match=s[$.level].nice_length,$.max_chain_length=s[$.level].max_chain,$.strstart=0,$.block_start=0,$.lookahead=0,$.insert=0,$.match_length=$.prev_length=b-1,$.match_available=0,$.ins_h=0}(g.state),ot}function Ut(g,ot,$,U,D,H){if(!g)return v;var et=1;if(ot===_&&(ot=6),U<0?(et=0,U=-U):15<U&&(et=2,U-=16),D<1||M<D||$!==x||U<8||15<U||ot<0||9<ot||H<0||m<H)return Q(g,v);U===8&&(U=9);var w=new At;return(g.state=w).strm=g,w.wrap=et,w.gzhead=null,w.w_bits=U,w.w_size=1<<w.w_bits,w.w_mask=w.w_size-1,w.hash_bits=D+7,w.hash_size=1<<w.hash_bits,w.hash_mask=w.hash_size-1,w.hash_shift=~~((w.hash_bits+b-1)/b),w.window=new o.Buf8(2*w.w_size),w.head=new o.Buf16(w.hash_size),w.prev=new o.Buf16(w.w_size),w.lit_bufsize=1<<D+6,w.pending_buf_size=4*w.lit_bufsize,w.pending_buf=new o.Buf8(w.pending_buf_size),w.d_buf=1*w.lit_bufsize,w.l_buf=3*w.lit_bufsize,w.level=ot,w.strategy=H,w.method=$,Yt(g)}s=[new Pt(0,0,0,0,function(g,ot){var $=65535;for($>g.pending_buf_size-5&&($=g.pending_buf_size-5);;){if(g.lookahead<=1){if(_t(g),g.lookahead===0&&ot===f)return S;if(g.lookahead===0)break}g.strstart+=g.lookahead,g.lookahead=0;var U=g.block_start+$;if((g.strstart===0||g.strstart>=U)&&(g.lookahead=g.strstart-U,g.strstart=U,q(g,!1),g.strm.avail_out===0)||g.strstart-g.block_start>=g.w_size-O&&(q(g,!1),g.strm.avail_out===0))return S}return g.insert=0,ot===p?(q(g,!0),g.strm.avail_out===0?it:G):(g.strstart>g.block_start&&(q(g,!1),g.strm.avail_out),S)}),new Pt(4,4,8,4,ft),new Pt(4,5,16,8,ft),new Pt(4,6,32,32,ft),new Pt(4,4,16,16,pt),new Pt(8,16,32,32,pt),new Pt(8,16,128,128,pt),new Pt(8,32,128,256,pt),new Pt(32,128,258,1024,pt),new Pt(32,258,258,4096,pt)],r.deflateInit=function(g,ot){return Ut(g,ot,x,15,8,0)},r.deflateInit2=Ut,r.deflateReset=Yt,r.deflateResetKeep=Bt,r.deflateSetHeader=function(g,ot){return g&&g.state?g.state.wrap!==2?v:(g.state.gzhead=ot,d):v},r.deflate=function(g,ot){var $,U,D,H;if(!g||!g.state||5<ot||ot<0)return g?Q(g,v):v;if(U=g.state,!g.output||!g.input&&g.avail_in!==0||U.status===666&&ot!==p)return Q(g,g.avail_out===0?-5:v);if(U.strm=g,$=U.last_flush,U.last_flush=ot,U.status===C)if(U.wrap===2)g.adler=0,gt(U,31),gt(U,139),gt(U,8),U.gzhead?(gt(U,(U.gzhead.text?1:0)+(U.gzhead.hcrc?2:0)+(U.gzhead.extra?4:0)+(U.gzhead.name?8:0)+(U.gzhead.comment?16:0)),gt(U,255&U.gzhead.time),gt(U,U.gzhead.time>>8&255),gt(U,U.gzhead.time>>16&255),gt(U,U.gzhead.time>>24&255),gt(U,U.level===9?2:2<=U.strategy||U.level<2?4:0),gt(U,255&U.gzhead.os),U.gzhead.extra&&U.gzhead.extra.length&&(gt(U,255&U.gzhead.extra.length),gt(U,U.gzhead.extra.length>>8&255)),U.gzhead.hcrc&&(g.adler=h(g.adler,U.pending_buf,U.pending,0)),U.gzindex=0,U.status=69):(gt(U,0),gt(U,0),gt(U,0),gt(U,0),gt(U,0),gt(U,U.level===9?2:2<=U.strategy||U.level<2?4:0),gt(U,3),U.status=F);else{var et=x+(U.w_bits-8<<4)<<8;et|=(2<=U.strategy||U.level<2?0:U.level<6?1:U.level===6?2:3)<<6,U.strstart!==0&&(et|=32),et+=31-et%31,U.status=F,Y(U,et),U.strstart!==0&&(Y(U,g.adler>>>16),Y(U,65535&g.adler)),g.adler=1}if(U.status===69)if(U.gzhead.extra){for(D=U.pending;U.gzindex<(65535&U.gzhead.extra.length)&&(U.pending!==U.pending_buf_size||(U.gzhead.hcrc&&U.pending>D&&(g.adler=h(g.adler,U.pending_buf,U.pending-D,D)),V(g),D=U.pending,U.pending!==U.pending_buf_size));)gt(U,255&U.gzhead.extra[U.gzindex]),U.gzindex++;U.gzhead.hcrc&&U.pending>D&&(g.adler=h(g.adler,U.pending_buf,U.pending-D,D)),U.gzindex===U.gzhead.extra.length&&(U.gzindex=0,U.status=73)}else U.status=73;if(U.status===73)if(U.gzhead.name){D=U.pending;do{if(U.pending===U.pending_buf_size&&(U.gzhead.hcrc&&U.pending>D&&(g.adler=h(g.adler,U.pending_buf,U.pending-D,D)),V(g),D=U.pending,U.pending===U.pending_buf_size)){H=1;break}H=U.gzindex<U.gzhead.name.length?255&U.gzhead.name.charCodeAt(U.gzindex++):0,gt(U,H)}while(H!==0);U.gzhead.hcrc&&U.pending>D&&(g.adler=h(g.adler,U.pending_buf,U.pending-D,D)),H===0&&(U.gzindex=0,U.status=91)}else U.status=91;if(U.status===91)if(U.gzhead.comment){D=U.pending;do{if(U.pending===U.pending_buf_size&&(U.gzhead.hcrc&&U.pending>D&&(g.adler=h(g.adler,U.pending_buf,U.pending-D,D)),V(g),D=U.pending,U.pending===U.pending_buf_size)){H=1;break}H=U.gzindex<U.gzhead.comment.length?255&U.gzhead.comment.charCodeAt(U.gzindex++):0,gt(U,H)}while(H!==0);U.gzhead.hcrc&&U.pending>D&&(g.adler=h(g.adler,U.pending_buf,U.pending-D,D)),H===0&&(U.status=103)}else U.status=103;if(U.status===103&&(U.gzhead.hcrc?(U.pending+2>U.pending_buf_size&&V(g),U.pending+2<=U.pending_buf_size&&(gt(U,255&g.adler),gt(U,g.adler>>8&255),g.adler=0,U.status=F)):U.status=F),U.pending!==0){if(V(g),g.avail_out===0)return U.last_flush=-1,d}else if(g.avail_in===0&&tt(ot)<=tt($)&&ot!==p)return Q(g,-5);if(U.status===666&&g.avail_in!==0)return Q(g,-5);if(g.avail_in!==0||U.lookahead!==0||ot!==f&&U.status!==666){var w=U.strategy===2?function(y,B){for(var Z;;){if(y.lookahead===0&&(_t(y),y.lookahead===0)){if(B===f)return S;break}if(y.match_length=0,Z=a._tr_tally(y,0,y.window[y.strstart]),y.lookahead--,y.strstart++,Z&&(q(y,!1),y.strm.avail_out===0))return S}return y.insert=0,B===p?(q(y,!0),y.strm.avail_out===0?it:G):y.last_lit&&(q(y,!1),y.strm.avail_out===0)?S:k}(U,ot):U.strategy===3?function(y,B){for(var Z,X,J,mt,ht=y.window;;){if(y.lookahead<=T){if(_t(y),y.lookahead<=T&&B===f)return S;if(y.lookahead===0)break}if(y.match_length=0,y.lookahead>=b&&0<y.strstart&&(X=ht[J=y.strstart-1])===ht[++J]&&X===ht[++J]&&X===ht[++J]){mt=y.strstart+T;do;while(X===ht[++J]&&X===ht[++J]&&X===ht[++J]&&X===ht[++J]&&X===ht[++J]&&X===ht[++J]&&X===ht[++J]&&X===ht[++J]&&J<mt);y.match_length=T-(mt-J),y.match_length>y.lookahead&&(y.match_length=y.lookahead)}if(y.match_length>=b?(Z=a._tr_tally(y,1,y.match_length-b),y.lookahead-=y.match_length,y.strstart+=y.match_length,y.match_length=0):(Z=a._tr_tally(y,0,y.window[y.strstart]),y.lookahead--,y.strstart++),Z&&(q(y,!1),y.strm.avail_out===0))return S}return y.insert=0,B===p?(q(y,!0),y.strm.avail_out===0?it:G):y.last_lit&&(q(y,!1),y.strm.avail_out===0)?S:k}(U,ot):s[U.level].func(U,ot);if(w!==it&&w!==G||(U.status=666),w===S||w===it)return g.avail_out===0&&(U.last_flush=-1),d;if(w===k&&(ot===1?a._tr_align(U):ot!==5&&(a._tr_stored_block(U,0,0,!1),ot===3&&(ct(U.head),U.lookahead===0&&(U.strstart=0,U.block_start=0,U.insert=0))),V(g),g.avail_out===0))return U.last_flush=-1,d}return ot!==p?d:U.wrap<=0?1:(U.wrap===2?(gt(U,255&g.adler),gt(U,g.adler>>8&255),gt(U,g.adler>>16&255),gt(U,g.adler>>24&255),gt(U,255&g.total_in),gt(U,g.total_in>>8&255),gt(U,g.total_in>>16&255),gt(U,g.total_in>>24&255)):(Y(U,g.adler>>>16),Y(U,65535&g.adler)),V(g),0<U.wrap&&(U.wrap=-U.wrap),U.pending!==0?d:1)},r.deflateEnd=function(g){var ot;return g&&g.state?(ot=g.state.status)!==C&&ot!==69&&ot!==73&&ot!==91&&ot!==103&&ot!==F&&ot!==666?Q(g,v):(g.state=null,ot===F?Q(g,-3):d):v},r.deflateSetDictionary=function(g,ot){var $,U,D,H,et,w,y,B,Z=ot.length;if(!g||!g.state||(H=($=g.state).wrap)===2||H===1&&$.status!==C||$.lookahead)return v;for(H===1&&(g.adler=l(g.adler,ot,Z,0)),$.wrap=0,Z>=$.w_size&&(H===0&&(ct($.head),$.strstart=0,$.block_start=0,$.insert=0),B=new o.Buf8($.w_size),o.arraySet(B,ot,Z-$.w_size,$.w_size,0),ot=B,Z=$.w_size),et=g.avail_in,w=g.next_in,y=g.input,g.avail_in=Z,g.next_in=0,g.input=ot,_t($);$.lookahead>=b;){for(U=$.strstart,D=$.lookahead-(b-1);$.ins_h=($.ins_h<<$.hash_shift^$.window[U+b-1])&$.hash_mask,$.prev[U&$.w_mask]=$.head[$.ins_h],$.head[$.ins_h]=U,U++,--D;);$.strstart=U,$.lookahead=b-1,_t($)}return $.strstart+=$.lookahead,$.block_start=$.strstart,$.insert=$.lookahead,$.lookahead=0,$.match_length=$.prev_length=b-1,$.match_available=0,g.next_in=w,g.input=y,g.avail_in=et,$.wrap=H,d},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,n,r){n.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,n,r){n.exports=function(s,o){var a,l,h,u,f,p,d,v,_,m,c,x,M,E,A,I,R,N,b,T,O,C,F,S,k;a=s.state,l=s.next_in,S=s.input,h=l+(s.avail_in-5),u=s.next_out,k=s.output,f=u-(o-s.avail_out),p=u+(s.avail_out-257),d=a.dmax,v=a.wsize,_=a.whave,m=a.wnext,c=a.window,x=a.hold,M=a.bits,E=a.lencode,A=a.distcode,I=(1<<a.lenbits)-1,R=(1<<a.distbits)-1;t:do{M<15&&(x+=S[l++]<<M,M+=8,x+=S[l++]<<M,M+=8),N=E[x&I];e:for(;;){if(x>>>=b=N>>>24,M-=b,(b=N>>>16&255)===0)k[u++]=65535&N;else{if(!(16&b)){if(!(64&b)){N=E[(65535&N)+(x&(1<<b)-1)];continue e}if(32&b){a.mode=12;break t}s.msg="invalid literal/length code",a.mode=30;break t}T=65535&N,(b&=15)&&(M<b&&(x+=S[l++]<<M,M+=8),T+=x&(1<<b)-1,x>>>=b,M-=b),M<15&&(x+=S[l++]<<M,M+=8,x+=S[l++]<<M,M+=8),N=A[x&R];n:for(;;){if(x>>>=b=N>>>24,M-=b,!(16&(b=N>>>16&255))){if(!(64&b)){N=A[(65535&N)+(x&(1<<b)-1)];continue n}s.msg="invalid distance code",a.mode=30;break t}if(O=65535&N,M<(b&=15)&&(x+=S[l++]<<M,(M+=8)<b&&(x+=S[l++]<<M,M+=8)),d<(O+=x&(1<<b)-1)){s.msg="invalid distance too far back",a.mode=30;break t}if(x>>>=b,M-=b,(b=u-f)<O){if(_<(b=O-b)&&a.sane){s.msg="invalid distance too far back",a.mode=30;break t}if(F=c,(C=0)===m){if(C+=v-b,b<T){for(T-=b;k[u++]=c[C++],--b;);C=u-O,F=k}}else if(m<b){if(C+=v+m-b,(b-=m)<T){for(T-=b;k[u++]=c[C++],--b;);if(C=0,m<T){for(T-=b=m;k[u++]=c[C++],--b;);C=u-O,F=k}}}else if(C+=m-b,b<T){for(T-=b;k[u++]=c[C++],--b;);C=u-O,F=k}for(;2<T;)k[u++]=F[C++],k[u++]=F[C++],k[u++]=F[C++],T-=3;T&&(k[u++]=F[C++],1<T&&(k[u++]=F[C++]))}else{for(C=u-O;k[u++]=k[C++],k[u++]=k[C++],k[u++]=k[C++],2<(T-=3););T&&(k[u++]=k[C++],1<T&&(k[u++]=k[C++]))}break}}break}}while(l<h&&u<p);l-=T=M>>3,x&=(1<<(M-=T<<3))-1,s.next_in=l,s.next_out=u,s.avail_in=l<h?h-l+5:5-(l-h),s.avail_out=u<p?p-u+257:257-(u-p),a.hold=x,a.bits=M}},{}],49:[function(e,n,r){var s=e("../utils/common"),o=e("./adler32"),a=e("./crc32"),l=e("./inffast"),h=e("./inftrees"),u=1,f=2,p=0,d=-2,v=1,_=852,m=592;function c(C){return(C>>>24&255)+(C>>>8&65280)+((65280&C)<<8)+((255&C)<<24)}function x(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function M(C){var F;return C&&C.state?(F=C.state,C.total_in=C.total_out=F.total=0,C.msg="",F.wrap&&(C.adler=1&F.wrap),F.mode=v,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new s.Buf32(_),F.distcode=F.distdyn=new s.Buf32(m),F.sane=1,F.back=-1,p):d}function E(C){var F;return C&&C.state?((F=C.state).wsize=0,F.whave=0,F.wnext=0,M(C)):d}function A(C,F){var S,k;return C&&C.state?(k=C.state,F<0?(S=0,F=-F):(S=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?d:(k.window!==null&&k.wbits!==F&&(k.window=null),k.wrap=S,k.wbits=F,E(C))):d}function I(C,F){var S,k;return C?(k=new x,(C.state=k).window=null,(S=A(C,F))!==p&&(C.state=null),S):d}var R,N,b=!0;function T(C){if(b){var F;for(R=new s.Buf32(512),N=new s.Buf32(32),F=0;F<144;)C.lens[F++]=8;for(;F<256;)C.lens[F++]=9;for(;F<280;)C.lens[F++]=7;for(;F<288;)C.lens[F++]=8;for(h(u,C.lens,0,288,R,0,C.work,{bits:9}),F=0;F<32;)C.lens[F++]=5;h(f,C.lens,0,32,N,0,C.work,{bits:5}),b=!1}C.lencode=R,C.lenbits=9,C.distcode=N,C.distbits=5}function O(C,F,S,k){var it,G=C.state;return G.window===null&&(G.wsize=1<<G.wbits,G.wnext=0,G.whave=0,G.window=new s.Buf8(G.wsize)),k>=G.wsize?(s.arraySet(G.window,F,S-G.wsize,G.wsize,0),G.wnext=0,G.whave=G.wsize):(k<(it=G.wsize-G.wnext)&&(it=k),s.arraySet(G.window,F,S-k,it,G.wnext),(k-=it)?(s.arraySet(G.window,F,S-k,k,0),G.wnext=k,G.whave=G.wsize):(G.wnext+=it,G.wnext===G.wsize&&(G.wnext=0),G.whave<G.wsize&&(G.whave+=it))),0}r.inflateReset=E,r.inflateReset2=A,r.inflateResetKeep=M,r.inflateInit=function(C){return I(C,15)},r.inflateInit2=I,r.inflate=function(C,F){var S,k,it,G,Q,tt,ct,V,q,gt,Y,nt,_t,ft,pt,Pt,At,Bt,Yt,Ut,g,ot,$,U,D=0,H=new s.Buf8(4),et=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!C||!C.state||!C.output||!C.input&&C.avail_in!==0)return d;(S=C.state).mode===12&&(S.mode=13),Q=C.next_out,it=C.output,ct=C.avail_out,G=C.next_in,k=C.input,tt=C.avail_in,V=S.hold,q=S.bits,gt=tt,Y=ct,ot=p;t:for(;;)switch(S.mode){case v:if(S.wrap===0){S.mode=13;break}for(;q<16;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(2&S.wrap&&V===35615){H[S.check=0]=255&V,H[1]=V>>>8&255,S.check=a(S.check,H,2,0),q=V=0,S.mode=2;break}if(S.flags=0,S.head&&(S.head.done=!1),!(1&S.wrap)||(((255&V)<<8)+(V>>8))%31){C.msg="incorrect header check",S.mode=30;break}if((15&V)!=8){C.msg="unknown compression method",S.mode=30;break}if(q-=4,g=8+(15&(V>>>=4)),S.wbits===0)S.wbits=g;else if(g>S.wbits){C.msg="invalid window size",S.mode=30;break}S.dmax=1<<g,C.adler=S.check=1,S.mode=512&V?10:12,q=V=0;break;case 2:for(;q<16;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(S.flags=V,(255&S.flags)!=8){C.msg="unknown compression method",S.mode=30;break}if(57344&S.flags){C.msg="unknown header flags set",S.mode=30;break}S.head&&(S.head.text=V>>8&1),512&S.flags&&(H[0]=255&V,H[1]=V>>>8&255,S.check=a(S.check,H,2,0)),q=V=0,S.mode=3;case 3:for(;q<32;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}S.head&&(S.head.time=V),512&S.flags&&(H[0]=255&V,H[1]=V>>>8&255,H[2]=V>>>16&255,H[3]=V>>>24&255,S.check=a(S.check,H,4,0)),q=V=0,S.mode=4;case 4:for(;q<16;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}S.head&&(S.head.xflags=255&V,S.head.os=V>>8),512&S.flags&&(H[0]=255&V,H[1]=V>>>8&255,S.check=a(S.check,H,2,0)),q=V=0,S.mode=5;case 5:if(1024&S.flags){for(;q<16;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}S.length=V,S.head&&(S.head.extra_len=V),512&S.flags&&(H[0]=255&V,H[1]=V>>>8&255,S.check=a(S.check,H,2,0)),q=V=0}else S.head&&(S.head.extra=null);S.mode=6;case 6:if(1024&S.flags&&(tt<(nt=S.length)&&(nt=tt),nt&&(S.head&&(g=S.head.extra_len-S.length,S.head.extra||(S.head.extra=new Array(S.head.extra_len)),s.arraySet(S.head.extra,k,G,nt,g)),512&S.flags&&(S.check=a(S.check,k,nt,G)),tt-=nt,G+=nt,S.length-=nt),S.length))break t;S.length=0,S.mode=7;case 7:if(2048&S.flags){if(tt===0)break t;for(nt=0;g=k[G+nt++],S.head&&g&&S.length<65536&&(S.head.name+=String.fromCharCode(g)),g&&nt<tt;);if(512&S.flags&&(S.check=a(S.check,k,nt,G)),tt-=nt,G+=nt,g)break t}else S.head&&(S.head.name=null);S.length=0,S.mode=8;case 8:if(4096&S.flags){if(tt===0)break t;for(nt=0;g=k[G+nt++],S.head&&g&&S.length<65536&&(S.head.comment+=String.fromCharCode(g)),g&&nt<tt;);if(512&S.flags&&(S.check=a(S.check,k,nt,G)),tt-=nt,G+=nt,g)break t}else S.head&&(S.head.comment=null);S.mode=9;case 9:if(512&S.flags){for(;q<16;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(V!==(65535&S.check)){C.msg="header crc mismatch",S.mode=30;break}q=V=0}S.head&&(S.head.hcrc=S.flags>>9&1,S.head.done=!0),C.adler=S.check=0,S.mode=12;break;case 10:for(;q<32;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}C.adler=S.check=c(V),q=V=0,S.mode=11;case 11:if(S.havedict===0)return C.next_out=Q,C.avail_out=ct,C.next_in=G,C.avail_in=tt,S.hold=V,S.bits=q,2;C.adler=S.check=1,S.mode=12;case 12:if(F===5||F===6)break t;case 13:if(S.last){V>>>=7&q,q-=7&q,S.mode=27;break}for(;q<3;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}switch(S.last=1&V,q-=1,3&(V>>>=1)){case 0:S.mode=14;break;case 1:if(T(S),S.mode=20,F!==6)break;V>>>=2,q-=2;break t;case 2:S.mode=17;break;case 3:C.msg="invalid block type",S.mode=30}V>>>=2,q-=2;break;case 14:for(V>>>=7&q,q-=7&q;q<32;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if((65535&V)!=(V>>>16^65535)){C.msg="invalid stored block lengths",S.mode=30;break}if(S.length=65535&V,q=V=0,S.mode=15,F===6)break t;case 15:S.mode=16;case 16:if(nt=S.length){if(tt<nt&&(nt=tt),ct<nt&&(nt=ct),nt===0)break t;s.arraySet(it,k,G,nt,Q),tt-=nt,G+=nt,ct-=nt,Q+=nt,S.length-=nt;break}S.mode=12;break;case 17:for(;q<14;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(S.nlen=257+(31&V),V>>>=5,q-=5,S.ndist=1+(31&V),V>>>=5,q-=5,S.ncode=4+(15&V),V>>>=4,q-=4,286<S.nlen||30<S.ndist){C.msg="too many length or distance symbols",S.mode=30;break}S.have=0,S.mode=18;case 18:for(;S.have<S.ncode;){for(;q<3;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}S.lens[et[S.have++]]=7&V,V>>>=3,q-=3}for(;S.have<19;)S.lens[et[S.have++]]=0;if(S.lencode=S.lendyn,S.lenbits=7,$={bits:S.lenbits},ot=h(0,S.lens,0,19,S.lencode,0,S.work,$),S.lenbits=$.bits,ot){C.msg="invalid code lengths set",S.mode=30;break}S.have=0,S.mode=19;case 19:for(;S.have<S.nlen+S.ndist;){for(;Pt=(D=S.lencode[V&(1<<S.lenbits)-1])>>>16&255,At=65535&D,!((pt=D>>>24)<=q);){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(At<16)V>>>=pt,q-=pt,S.lens[S.have++]=At;else{if(At===16){for(U=pt+2;q<U;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(V>>>=pt,q-=pt,S.have===0){C.msg="invalid bit length repeat",S.mode=30;break}g=S.lens[S.have-1],nt=3+(3&V),V>>>=2,q-=2}else if(At===17){for(U=pt+3;q<U;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}q-=pt,g=0,nt=3+(7&(V>>>=pt)),V>>>=3,q-=3}else{for(U=pt+7;q<U;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}q-=pt,g=0,nt=11+(127&(V>>>=pt)),V>>>=7,q-=7}if(S.have+nt>S.nlen+S.ndist){C.msg="invalid bit length repeat",S.mode=30;break}for(;nt--;)S.lens[S.have++]=g}}if(S.mode===30)break;if(S.lens[256]===0){C.msg="invalid code -- missing end-of-block",S.mode=30;break}if(S.lenbits=9,$={bits:S.lenbits},ot=h(u,S.lens,0,S.nlen,S.lencode,0,S.work,$),S.lenbits=$.bits,ot){C.msg="invalid literal/lengths set",S.mode=30;break}if(S.distbits=6,S.distcode=S.distdyn,$={bits:S.distbits},ot=h(f,S.lens,S.nlen,S.ndist,S.distcode,0,S.work,$),S.distbits=$.bits,ot){C.msg="invalid distances set",S.mode=30;break}if(S.mode=20,F===6)break t;case 20:S.mode=21;case 21:if(6<=tt&&258<=ct){C.next_out=Q,C.avail_out=ct,C.next_in=G,C.avail_in=tt,S.hold=V,S.bits=q,l(C,Y),Q=C.next_out,it=C.output,ct=C.avail_out,G=C.next_in,k=C.input,tt=C.avail_in,V=S.hold,q=S.bits,S.mode===12&&(S.back=-1);break}for(S.back=0;Pt=(D=S.lencode[V&(1<<S.lenbits)-1])>>>16&255,At=65535&D,!((pt=D>>>24)<=q);){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(Pt&&!(240&Pt)){for(Bt=pt,Yt=Pt,Ut=At;Pt=(D=S.lencode[Ut+((V&(1<<Bt+Yt)-1)>>Bt)])>>>16&255,At=65535&D,!(Bt+(pt=D>>>24)<=q);){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}V>>>=Bt,q-=Bt,S.back+=Bt}if(V>>>=pt,q-=pt,S.back+=pt,S.length=At,Pt===0){S.mode=26;break}if(32&Pt){S.back=-1,S.mode=12;break}if(64&Pt){C.msg="invalid literal/length code",S.mode=30;break}S.extra=15&Pt,S.mode=22;case 22:if(S.extra){for(U=S.extra;q<U;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}S.length+=V&(1<<S.extra)-1,V>>>=S.extra,q-=S.extra,S.back+=S.extra}S.was=S.length,S.mode=23;case 23:for(;Pt=(D=S.distcode[V&(1<<S.distbits)-1])>>>16&255,At=65535&D,!((pt=D>>>24)<=q);){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(!(240&Pt)){for(Bt=pt,Yt=Pt,Ut=At;Pt=(D=S.distcode[Ut+((V&(1<<Bt+Yt)-1)>>Bt)])>>>16&255,At=65535&D,!(Bt+(pt=D>>>24)<=q);){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}V>>>=Bt,q-=Bt,S.back+=Bt}if(V>>>=pt,q-=pt,S.back+=pt,64&Pt){C.msg="invalid distance code",S.mode=30;break}S.offset=At,S.extra=15&Pt,S.mode=24;case 24:if(S.extra){for(U=S.extra;q<U;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}S.offset+=V&(1<<S.extra)-1,V>>>=S.extra,q-=S.extra,S.back+=S.extra}if(S.offset>S.dmax){C.msg="invalid distance too far back",S.mode=30;break}S.mode=25;case 25:if(ct===0)break t;if(nt=Y-ct,S.offset>nt){if((nt=S.offset-nt)>S.whave&&S.sane){C.msg="invalid distance too far back",S.mode=30;break}_t=nt>S.wnext?(nt-=S.wnext,S.wsize-nt):S.wnext-nt,nt>S.length&&(nt=S.length),ft=S.window}else ft=it,_t=Q-S.offset,nt=S.length;for(ct<nt&&(nt=ct),ct-=nt,S.length-=nt;it[Q++]=ft[_t++],--nt;);S.length===0&&(S.mode=21);break;case 26:if(ct===0)break t;it[Q++]=S.length,ct--,S.mode=21;break;case 27:if(S.wrap){for(;q<32;){if(tt===0)break t;tt--,V|=k[G++]<<q,q+=8}if(Y-=ct,C.total_out+=Y,S.total+=Y,Y&&(C.adler=S.check=S.flags?a(S.check,it,Y,Q-Y):o(S.check,it,Y,Q-Y)),Y=ct,(S.flags?V:c(V))!==S.check){C.msg="incorrect data check",S.mode=30;break}q=V=0}S.mode=28;case 28:if(S.wrap&&S.flags){for(;q<32;){if(tt===0)break t;tt--,V+=k[G++]<<q,q+=8}if(V!==(4294967295&S.total)){C.msg="incorrect length check",S.mode=30;break}q=V=0}S.mode=29;case 29:ot=1;break t;case 30:ot=-3;break t;case 31:return-4;case 32:default:return d}return C.next_out=Q,C.avail_out=ct,C.next_in=G,C.avail_in=tt,S.hold=V,S.bits=q,(S.wsize||Y!==C.avail_out&&S.mode<30&&(S.mode<27||F!==4))&&O(C,C.output,C.next_out,Y-C.avail_out)?(S.mode=31,-4):(gt-=C.avail_in,Y-=C.avail_out,C.total_in+=gt,C.total_out+=Y,S.total+=Y,S.wrap&&Y&&(C.adler=S.check=S.flags?a(S.check,it,Y,C.next_out-Y):o(S.check,it,Y,C.next_out-Y)),C.data_type=S.bits+(S.last?64:0)+(S.mode===12?128:0)+(S.mode===20||S.mode===15?256:0),(gt==0&&Y===0||F===4)&&ot===p&&(ot=-5),ot)},r.inflateEnd=function(C){if(!C||!C.state)return d;var F=C.state;return F.window&&(F.window=null),C.state=null,p},r.inflateGetHeader=function(C,F){var S;return C&&C.state&&2&(S=C.state).wrap?((S.head=F).done=!1,p):d},r.inflateSetDictionary=function(C,F){var S,k=F.length;return C&&C.state?(S=C.state).wrap!==0&&S.mode!==11?d:S.mode===11&&o(1,F,k,0)!==S.check?-3:O(C,F,k,k)?(S.mode=31,-4):(S.havedict=1,p):d},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,n,r){var s=e("../utils/common"),o=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],l=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];n.exports=function(u,f,p,d,v,_,m,c){var x,M,E,A,I,R,N,b,T,O=c.bits,C=0,F=0,S=0,k=0,it=0,G=0,Q=0,tt=0,ct=0,V=0,q=null,gt=0,Y=new s.Buf16(16),nt=new s.Buf16(16),_t=null,ft=0;for(C=0;C<=15;C++)Y[C]=0;for(F=0;F<d;F++)Y[f[p+F]]++;for(it=O,k=15;1<=k&&Y[k]===0;k--);if(k<it&&(it=k),k===0)return v[_++]=20971520,v[_++]=20971520,c.bits=1,0;for(S=1;S<k&&Y[S]===0;S++);for(it<S&&(it=S),C=tt=1;C<=15;C++)if(tt<<=1,(tt-=Y[C])<0)return-1;if(0<tt&&(u===0||k!==1))return-1;for(nt[1]=0,C=1;C<15;C++)nt[C+1]=nt[C]+Y[C];for(F=0;F<d;F++)f[p+F]!==0&&(m[nt[f[p+F]]++]=F);if(R=u===0?(q=_t=m,19):u===1?(q=o,gt-=257,_t=a,ft-=257,256):(q=l,_t=h,-1),C=S,I=_,Q=F=V=0,E=-1,A=(ct=1<<(G=it))-1,u===1&&852<ct||u===2&&592<ct)return 1;for(;;){for(N=C-Q,T=m[F]<R?(b=0,m[F]):m[F]>R?(b=_t[ft+m[F]],q[gt+m[F]]):(b=96,0),x=1<<C-Q,S=M=1<<G;v[I+(V>>Q)+(M-=x)]=N<<24|b<<16|T|0,M!==0;);for(x=1<<C-1;V&x;)x>>=1;if(x!==0?(V&=x-1,V+=x):V=0,F++,--Y[C]==0){if(C===k)break;C=f[p+m[F]]}if(it<C&&(V&A)!==E){for(Q===0&&(Q=it),I+=S,tt=1<<(G=C-Q);G+Q<k&&!((tt-=Y[G+Q])<=0);)G++,tt<<=1;if(ct+=1<<G,u===1&&852<ct||u===2&&592<ct)return 1;v[E=V&A]=it<<24|G<<16|I-_|0}}return V!==0&&(v[I+V]=C-Q<<24|64<<16|0),c.bits=it,0}},{"../utils/common":41}],51:[function(e,n,r){n.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,n,r){var s=e("../utils/common"),o=0,a=1;function l(D){for(var H=D.length;0<=--H;)D[H]=0}var h=0,u=29,f=256,p=f+1+u,d=30,v=19,_=2*p+1,m=15,c=16,x=7,M=256,E=16,A=17,I=18,R=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],N=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],T=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],O=new Array(2*(p+2));l(O);var C=new Array(2*d);l(C);var F=new Array(512);l(F);var S=new Array(256);l(S);var k=new Array(u);l(k);var it,G,Q,tt=new Array(d);function ct(D,H,et,w,y){this.static_tree=D,this.extra_bits=H,this.extra_base=et,this.elems=w,this.max_length=y,this.has_stree=D&&D.length}function V(D,H){this.dyn_tree=D,this.max_code=0,this.stat_desc=H}function q(D){return D<256?F[D]:F[256+(D>>>7)]}function gt(D,H){D.pending_buf[D.pending++]=255&H,D.pending_buf[D.pending++]=H>>>8&255}function Y(D,H,et){D.bi_valid>c-et?(D.bi_buf|=H<<D.bi_valid&65535,gt(D,D.bi_buf),D.bi_buf=H>>c-D.bi_valid,D.bi_valid+=et-c):(D.bi_buf|=H<<D.bi_valid&65535,D.bi_valid+=et)}function nt(D,H,et){Y(D,et[2*H],et[2*H+1])}function _t(D,H){for(var et=0;et|=1&D,D>>>=1,et<<=1,0<--H;);return et>>>1}function ft(D,H,et){var w,y,B=new Array(m+1),Z=0;for(w=1;w<=m;w++)B[w]=Z=Z+et[w-1]<<1;for(y=0;y<=H;y++){var X=D[2*y+1];X!==0&&(D[2*y]=_t(B[X]++,X))}}function pt(D){var H;for(H=0;H<p;H++)D.dyn_ltree[2*H]=0;for(H=0;H<d;H++)D.dyn_dtree[2*H]=0;for(H=0;H<v;H++)D.bl_tree[2*H]=0;D.dyn_ltree[2*M]=1,D.opt_len=D.static_len=0,D.last_lit=D.matches=0}function Pt(D){8<D.bi_valid?gt(D,D.bi_buf):0<D.bi_valid&&(D.pending_buf[D.pending++]=D.bi_buf),D.bi_buf=0,D.bi_valid=0}function At(D,H,et,w){var y=2*H,B=2*et;return D[y]<D[B]||D[y]===D[B]&&w[H]<=w[et]}function Bt(D,H,et){for(var w=D.heap[et],y=et<<1;y<=D.heap_len&&(y<D.heap_len&&At(H,D.heap[y+1],D.heap[y],D.depth)&&y++,!At(H,w,D.heap[y],D.depth));)D.heap[et]=D.heap[y],et=y,y<<=1;D.heap[et]=w}function Yt(D,H,et){var w,y,B,Z,X=0;if(D.last_lit!==0)for(;w=D.pending_buf[D.d_buf+2*X]<<8|D.pending_buf[D.d_buf+2*X+1],y=D.pending_buf[D.l_buf+X],X++,w===0?nt(D,y,H):(nt(D,(B=S[y])+f+1,H),(Z=R[B])!==0&&Y(D,y-=k[B],Z),nt(D,B=q(--w),et),(Z=N[B])!==0&&Y(D,w-=tt[B],Z)),X<D.last_lit;);nt(D,M,H)}function Ut(D,H){var et,w,y,B=H.dyn_tree,Z=H.stat_desc.static_tree,X=H.stat_desc.has_stree,J=H.stat_desc.elems,mt=-1;for(D.heap_len=0,D.heap_max=_,et=0;et<J;et++)B[2*et]!==0?(D.heap[++D.heap_len]=mt=et,D.depth[et]=0):B[2*et+1]=0;for(;D.heap_len<2;)B[2*(y=D.heap[++D.heap_len]=mt<2?++mt:0)]=1,D.depth[y]=0,D.opt_len--,X&&(D.static_len-=Z[2*y+1]);for(H.max_code=mt,et=D.heap_len>>1;1<=et;et--)Bt(D,B,et);for(y=J;et=D.heap[1],D.heap[1]=D.heap[D.heap_len--],Bt(D,B,1),w=D.heap[1],D.heap[--D.heap_max]=et,D.heap[--D.heap_max]=w,B[2*y]=B[2*et]+B[2*w],D.depth[y]=(D.depth[et]>=D.depth[w]?D.depth[et]:D.depth[w])+1,B[2*et+1]=B[2*w+1]=y,D.heap[1]=y++,Bt(D,B,1),2<=D.heap_len;);D.heap[--D.heap_max]=D.heap[1],function(ht,vt){var Wt,ut,Tt,Et,It,wt,Ft=vt.dyn_tree,kt=vt.max_code,ee=vt.stat_desc.static_tree,W=vt.stat_desc.has_stree,yt=vt.stat_desc.extra_bits,at=vt.stat_desc.extra_base,lt=vt.stat_desc.max_length,St=0;for(Et=0;Et<=m;Et++)ht.bl_count[Et]=0;for(Ft[2*ht.heap[ht.heap_max]+1]=0,Wt=ht.heap_max+1;Wt<_;Wt++)lt<(Et=Ft[2*Ft[2*(ut=ht.heap[Wt])+1]+1]+1)&&(Et=lt,St++),Ft[2*ut+1]=Et,kt<ut||(ht.bl_count[Et]++,It=0,at<=ut&&(It=yt[ut-at]),wt=Ft[2*ut],ht.opt_len+=wt*(Et+It),W&&(ht.static_len+=wt*(ee[2*ut+1]+It)));if(St!==0){do{for(Et=lt-1;ht.bl_count[Et]===0;)Et--;ht.bl_count[Et]--,ht.bl_count[Et+1]+=2,ht.bl_count[lt]--,St-=2}while(0<St);for(Et=lt;Et!==0;Et--)for(ut=ht.bl_count[Et];ut!==0;)kt<(Tt=ht.heap[--Wt])||(Ft[2*Tt+1]!==Et&&(ht.opt_len+=(Et-Ft[2*Tt+1])*Ft[2*Tt],Ft[2*Tt+1]=Et),ut--)}}(D,H),ft(B,mt,D.bl_count)}function g(D,H,et){var w,y,B=-1,Z=H[1],X=0,J=7,mt=4;for(Z===0&&(J=138,mt=3),H[2*(et+1)+1]=65535,w=0;w<=et;w++)y=Z,Z=H[2*(w+1)+1],++X<J&&y===Z||(X<mt?D.bl_tree[2*y]+=X:y!==0?(y!==B&&D.bl_tree[2*y]++,D.bl_tree[2*E]++):X<=10?D.bl_tree[2*A]++:D.bl_tree[2*I]++,B=y,mt=(X=0)===Z?(J=138,3):y===Z?(J=6,3):(J=7,4))}function ot(D,H,et){var w,y,B=-1,Z=H[1],X=0,J=7,mt=4;for(Z===0&&(J=138,mt=3),w=0;w<=et;w++)if(y=Z,Z=H[2*(w+1)+1],!(++X<J&&y===Z)){if(X<mt)for(;nt(D,y,D.bl_tree),--X!=0;);else y!==0?(y!==B&&(nt(D,y,D.bl_tree),X--),nt(D,E,D.bl_tree),Y(D,X-3,2)):X<=10?(nt(D,A,D.bl_tree),Y(D,X-3,3)):(nt(D,I,D.bl_tree),Y(D,X-11,7));B=y,mt=(X=0)===Z?(J=138,3):y===Z?(J=6,3):(J=7,4)}}l(tt);var $=!1;function U(D,H,et,w){Y(D,(h<<1)+(w?1:0),3),function(y,B,Z,X){Pt(y),gt(y,Z),gt(y,~Z),s.arraySet(y.pending_buf,y.window,B,Z,y.pending),y.pending+=Z}(D,H,et)}r._tr_init=function(D){$||(function(){var H,et,w,y,B,Z=new Array(m+1);for(y=w=0;y<u-1;y++)for(k[y]=w,H=0;H<1<<R[y];H++)S[w++]=y;for(S[w-1]=y,y=B=0;y<16;y++)for(tt[y]=B,H=0;H<1<<N[y];H++)F[B++]=y;for(B>>=7;y<d;y++)for(tt[y]=B<<7,H=0;H<1<<N[y]-7;H++)F[256+B++]=y;for(et=0;et<=m;et++)Z[et]=0;for(H=0;H<=143;)O[2*H+1]=8,H++,Z[8]++;for(;H<=255;)O[2*H+1]=9,H++,Z[9]++;for(;H<=279;)O[2*H+1]=7,H++,Z[7]++;for(;H<=287;)O[2*H+1]=8,H++,Z[8]++;for(ft(O,p+1,Z),H=0;H<d;H++)C[2*H+1]=5,C[2*H]=_t(H,5);it=new ct(O,R,f+1,p,m),G=new ct(C,N,0,d,m),Q=new ct(new Array(0),b,0,v,x)}(),$=!0),D.l_desc=new V(D.dyn_ltree,it),D.d_desc=new V(D.dyn_dtree,G),D.bl_desc=new V(D.bl_tree,Q),D.bi_buf=0,D.bi_valid=0,pt(D)},r._tr_stored_block=U,r._tr_flush_block=function(D,H,et,w){var y,B,Z=0;0<D.level?(D.strm.data_type===2&&(D.strm.data_type=function(X){var J,mt=4093624447;for(J=0;J<=31;J++,mt>>>=1)if(1&mt&&X.dyn_ltree[2*J]!==0)return o;if(X.dyn_ltree[18]!==0||X.dyn_ltree[20]!==0||X.dyn_ltree[26]!==0)return a;for(J=32;J<f;J++)if(X.dyn_ltree[2*J]!==0)return a;return o}(D)),Ut(D,D.l_desc),Ut(D,D.d_desc),Z=function(X){var J;for(g(X,X.dyn_ltree,X.l_desc.max_code),g(X,X.dyn_dtree,X.d_desc.max_code),Ut(X,X.bl_desc),J=v-1;3<=J&&X.bl_tree[2*T[J]+1]===0;J--);return X.opt_len+=3*(J+1)+5+5+4,J}(D),y=D.opt_len+3+7>>>3,(B=D.static_len+3+7>>>3)<=y&&(y=B)):y=B=et+5,et+4<=y&&H!==-1?U(D,H,et,w):D.strategy===4||B===y?(Y(D,2+(w?1:0),3),Yt(D,O,C)):(Y(D,4+(w?1:0),3),function(X,J,mt,ht){var vt;for(Y(X,J-257,5),Y(X,mt-1,5),Y(X,ht-4,4),vt=0;vt<ht;vt++)Y(X,X.bl_tree[2*T[vt]+1],3);ot(X,X.dyn_ltree,J-1),ot(X,X.dyn_dtree,mt-1)}(D,D.l_desc.max_code+1,D.d_desc.max_code+1,Z+1),Yt(D,D.dyn_ltree,D.dyn_dtree)),pt(D),w&&Pt(D)},r._tr_tally=function(D,H,et){return D.pending_buf[D.d_buf+2*D.last_lit]=H>>>8&255,D.pending_buf[D.d_buf+2*D.last_lit+1]=255&H,D.pending_buf[D.l_buf+D.last_lit]=255&et,D.last_lit++,H===0?D.dyn_ltree[2*et]++:(D.matches++,H--,D.dyn_ltree[2*(S[et]+f+1)]++,D.dyn_dtree[2*q(H)]++),D.last_lit===D.lit_bufsize-1},r._tr_align=function(D){Y(D,2,3),nt(D,M,O),function(H){H.bi_valid===16?(gt(H,H.bi_buf),H.bi_buf=0,H.bi_valid=0):8<=H.bi_valid&&(H.pending_buf[H.pending++]=255&H.bi_buf,H.bi_buf>>=8,H.bi_valid-=8)}(D)}},{"../utils/common":41}],53:[function(e,n,r){n.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,n,r){(function(s){(function(o,a){if(!o.setImmediate){var l,h,u,f,p=1,d={},v=!1,_=o.document,m=Object.getPrototypeOf&&Object.getPrototypeOf(o);m=m&&m.setTimeout?m:o,l={}.toString.call(o.process)==="[object process]"?function(E){process.nextTick(function(){x(E)})}:function(){if(o.postMessage&&!o.importScripts){var E=!0,A=o.onmessage;return o.onmessage=function(){E=!1},o.postMessage("","*"),o.onmessage=A,E}}()?(f="setImmediate$"+Math.random()+"$",o.addEventListener?o.addEventListener("message",M,!1):o.attachEvent("onmessage",M),function(E){o.postMessage(f+E,"*")}):o.MessageChannel?((u=new MessageChannel).port1.onmessage=function(E){x(E.data)},function(E){u.port2.postMessage(E)}):_&&"onreadystatechange"in _.createElement("script")?(h=_.documentElement,function(E){var A=_.createElement("script");A.onreadystatechange=function(){x(E),A.onreadystatechange=null,h.removeChild(A),A=null},h.appendChild(A)}):function(E){setTimeout(x,0,E)},m.setImmediate=function(E){typeof E!="function"&&(E=new Function(""+E));for(var A=new Array(arguments.length-1),I=0;I<A.length;I++)A[I]=arguments[I+1];var R={callback:E,args:A};return d[p]=R,l(p),p++},m.clearImmediate=c}function c(E){delete d[E]}function x(E){if(v)setTimeout(x,0,E);else{var A=d[E];if(A){v=!0;try{(function(I){var R=I.callback,N=I.args;switch(N.length){case 0:R();break;case 1:R(N[0]);break;case 2:R(N[0],N[1]);break;case 3:R(N[0],N[1],N[2]);break;default:R.apply(a,N)}})(A)}finally{c(E),v=!1}}}}function M(E){E.source===o&&typeof E.data=="string"&&E.data.indexOf(f)===0&&x(+E.data.slice(f.length))}})(typeof self>"u"?s===void 0?this:s:self)}).call(this,typeof cr<"u"?cr:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})}(ms)),ms.exports}var Wm=Vm();const Xm=Gm(Wm);function qm(){document.getElementById("exportButton").addEventListener("click",async function(){fe?i(fe,"DEM.stl"):Xe&&Xe.length>0?t(Xe):window.alert("No mesh to export. Generate a mesh first.")});function i(e,n="DEM.stl"){var m,c;const r=e.rotation.x;e.rotation.x-=3*Math.PI/2,e.updateMatrixWorld();const s=new Fo,o={binary:!0},a=s.parse(e,o);var l=new Blob([a],{type:"text/plain"});e.rotation.x=r,e.updateMatrixWorld();let h="DEM";const u=Sr();(c=(m=u==null?void 0:u.georasters)==null?void 0:m[0])!=null&&c.filename&&(h=u.georasters[0].filename.replace(/\.[^/.]+$/,""));const f=new Date,p=x=>x.toString().padStart(2,"0"),d=`${f.getFullYear()}${p(f.getMonth()+1)}${p(f.getDate())}-${p(f.getHours())}${p(f.getMinutes())}`,v=n==="DEM.stl"?`${h}_${d}.stl`:n;var _=document.createElement("a");_.style.display="none",document.body.appendChild(_),_.href=URL.createObjectURL(l),_.download=v,_.click()}function t(e){var f,p;if(!e||Object.keys(e).length===0){window.alert("No partition meshes to export.");return}let n="DEM";const r=Sr();(p=(f=r==null?void 0:r.georasters)==null?void 0:f[0])!=null&&p.filename&&(n=r.georasters[0].filename.replace(/\.[^/.]+$/,""));const s=new Date,o=d=>d.toString().padStart(2,"0"),a=`${s.getFullYear()}${o(s.getMonth()+1)}${o(s.getDate())}-${o(s.getHours())}${o(s.getMinutes())}`,l=Object.entries(e),h=new Fo,u=new Xm;for(const[d,v]of l){if(!v)continue;const _=v.rotation.x;v.rotation.x-=3*Math.PI/2,v.updateMatrixWorld();const m={binary:!0},c=h.parse(v,m);v.rotation.x=_,v.updateMatrixWorld();const x=new Blob([c],{type:"application/octet-stream"});u.file(`${n}_${a}_part${d}.stl`,x)}u.generateAsync({type:"blob"}).then(function(d){var v=document.createElement("a");v.style.display="none",document.body.appendChild(v),v.href=URL.createObjectURL(d),v.download=`${n}_${a}_partitions.zip`,v.click()})}}function Ym(){const i=document.getElementById("physicalWidthInput"),t=document.getElementById("physicalHeightInput");let e=null;function n(){if(e==="height")return;e="width";const s=Uo();s>0&&(t.value=(parseFloat(i.value)*s).toFixed(2)),e=null}function r(){if(e==="width")return;e="height";const s=Uo();s>0&&(i.value=(parseFloat(t.value)/s).toFixed(2)),e=null}i.addEventListener("input",n),t.addEventListener("input",r)}Il();Ul();km();zm();Hm();qm();document.addEventListener("DOMContentLoaded",()=>{Ym(),Vl()});

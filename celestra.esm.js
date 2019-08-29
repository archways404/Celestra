"use strict";
/** Celestra * @version 3.0.2 * @see https://github.com/Serrin/Celestra/ * @license MIT */
if(!Array.from){Array.from=function(o,fn){if(o==null){throw new TypeError("Array.from requires an array-like object - not null or undefined");}var a = Array.prototype.slice.call(o);if(fn){if(typeof fn!=="function"){throw new TypeError("Array.from: when provided, the second argument must be a function");}return a.map(fn);}return a;};}
if(!Array.of){Array.of=function(){return Array.prototype.slice.call(arguments);};}
if(!Object.create){Object.create=function(o){function F(){} F.prototype=o;return new F();};}
if(!Object.assign){Object.assign=function(){var t=arguments[0]||{};for(var i=0,l=arguments.length;i<l;i++){var s=arguments[i];for(var a in s){if(s.hasOwnProperty(a)){t[a]=s[a];}}}return t;};}
if(!Array.prototype.find){Array.prototype.find=function(fn){for(var i=0,l=this.length;i<l;i++){if(fn(this[i],i,this)){return this[i];}}return undefined;};}
if(!Array.prototype.findIndex){Array.prototype.findIndex=function(fn){for(var i=0,l=this.length;i<l;i++){if(fn(this[i],i,this)){return i;}}return -1;};}
if(!Array.prototype.fill){Array.prototype.fill=function(value,start,end){if(arguments.length===2){end=this.length;}else if(arguments.length<2){start=0;end=this.length;}if(start<0){start=this.length+start;}if(end<0){end=this.length+end;}for(var i=start;i<end;i++){this[i]=value;}return this;}}
if(!Array.prototype.includes){Array.prototype.includes=function(v,f){return (this.indexOf(v,f)>-1);};}
if(!String.prototype.includes){String.prototype.includes=function(v,f){return (this.indexOf(v,f)>-1);};}
if(!String.prototype.trimStart){String.prototype.trimStart=function(){return this.replace(/^\s+/,"");};}
if(!String.prototype.trimLeft){String.prototype.trimLeft=function(){return this.replace(/^\s+/,"");};}
if(!String.prototype.trimEnd){String.prototype.trimEnd=function(){return this.replace(/\s+$/,"");};}
if(!String.prototype.trimRight){String.prototype.trimRight=function(){return this.replace(/\s+$/,"");};}
if(!String.prototype.startsWith){String.prototype.startsWith=function(searchString,position){if(position===undefined){position=0;}return this.indexOf(searchString)===position;};}
if(!String.prototype.endsWith){String.prototype.endsWith=function(searchString,length){if(length===undefined){length=this.length;}var subs=this.substring(0,length);return subs.indexOf(searchString)===(subs.length-searchString.length);};}
if(!String.prototype.padStart){String.prototype.padStart=function(len,str){len=Math.floor(Number(len));if(len<=this.length||len===NaN){return String(this);}else{str=String(typeof str!=="undefined"?str:" ");if(str.length===0){return String(this);}var res="",n=Math.floor((len-this.length)/str.length)+1;for(var i=0;i<n;i++){res+=str;}return res.slice(0,len-this.length)+String(this);};};}
if(!String.prototype.padEnd){String.prototype.padEnd=function(len,str){len=Math.floor(Number(len));if(len<=this.length||len===NaN){return String(this);}else{str=String(typeof str!=="undefined"?str:" ");if(str.length===0){return String(this);}var res="",n=Math.floor((len-this.length)/str.length)+1;for(var i=0;i<n;i++){res+=str;}return String(this)+res.slice(0,len-this.length);};};}
if(!String.prototype.repeat){String.prototype.repeat=function(c){"use strict";if(this==null){throw new TypeError("can\"t convert "+this+" to object");}var str=""+this;c=+c;if(c!=c){c=0;}if(c<0){throw new RangeError("repeat count must be non-negative");}if(c==Infinity){throw new RangeError("repeat count must be less than infinity");}c=Math.floor(c);if(str.length==0||c==0){return "";}if(str.length*c>=1<<28){throw new RangeError("repeat count must not overflow maximum string size");}var maxCount=str.length*c;c=Math.floor(Math.log(c)/Math.log(2));while(c){str+=str;c--;}str+=str.substring(0,maxCount-str.length);return str;}}
[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(p){if(!p.after){p.after=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.parentNode.insertBefore((e instanceof Node?e:document.createTextNode(String(e))),t.nextSibling);});};}if(!p.before){p.before=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.parentNode.insertBefore((e instanceof Node?e:document.createTextNode(String(e))),t);});};}if(!p.remove){p.remove=function(){this.parentNode.removeChild(this);};}if(!p.replaceWith){p.replaceWith=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.parentNode.replaceChild((e instanceof Node?e:document.createTextNode(String(e))),t);});};}if(!p.append){p.append=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.appendChild(e instanceof Node?e:document.createTextNode(String(e)));});};}if(!p.prepend){p.prepend=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.insertBefore((e instanceof Node?e:document.createTextNode(String(e))),t.firstChild);});};}});
if(!Element.prototype.toggleAttribute){Element.prototype.toggleAttribute=function(name,force){var forcePassed=(arguments.length===2);var forceOn=!!force;var forceOff=(forcePassed&&!force);if(this.getAttribute(name)!==null){if(forceOn){return true;}this.removeAttribute(name);return false;}else{if(forceOff){return false;}this.setAttribute(name,"");return true;}};}
if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.oMatchesSelector||function(s){var matches=(this.document||this.ownerDocument).querySelectorAll(s),i=matches.length;while(--i>=0&&matches.item(i)!==this){}return i>-1;};}
if(!Element.prototype.closest){Element.prototype.closest=function(s){var el=this;if(!document.documentElement.contains(el)){return null;}do{if(el.matches(s)){return el;}el=el.parentElement||el.parentNode;}while(el!==null&&el.nodeType===1);return null;};}
if(!Element.prototype.getAttributeNames){Element.prototype.getAttributeNames=function(){var attributes=this.attributes;var length=attributes.length;var result=new Array(length);for(var i=0;i<length;i++){result[i]=attributes[i].name;}return result;};}
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=function(callback,thisArg){thisArg=thisArg||window;for(var i=0;i<this.length;i++){callback.call(thisArg,this[i],i,this);}};}
if(!Array.prototype.flat){Array.prototype.flat=function(depth){if(depth===undefined){depth=1;}else{depth=Math.floor(Number(depth));if(isNaN(depth)||depth<1){return this;}}function deepFlat(a,cd){a.forEach(function(e){if(Array.isArray(e)){if(cd<depth){deepFlat(e,cd+1);}else{res.push(e);}}else{res.push(e);}});}var res=[];deepFlat(this,0);return res;};}
if(!Array.prototype.flatMap){Array.prototype.flatMap=function(fn){var res=[];this.map(fn).forEach(function(e){if(Array.isArray(e)){res=res.concat(e);}else{res.push(e);}});return res;};}
if(!Object.fromEntries){Object.fromEntries=function(entries){var res={};if(Array.isArray(entries)){entries.forEach(function(e){res[e[0]]=e[1];});}else if(Object.prototype.toString.call(entries)==="[object Map]"){entries.forEach(function(value,key){res[key]=value;});}else{throw "TypeError: Celestra Object.fromEntries() polyfill supports only Array and Map parameters in the modern browsers. In IE11 only the Array parameter is supported.";}return res;};}
if(!Object.entries){Object.entries=function(o){return Object.keys(o).map(function(e){return[e,o[e]];});};}
if(!Object.values){Object.values=function(o){return Object.keys(o).map(function(e){return o[e];});};}
if(!Object.is){Object.is=function(x,y){if(x===y){return x!==0||1/x===1/y;}else{return x!==x&&y!==y;}};}
if(!Object.getOwnPropertyDescriptors){Object.getOwnPropertyDescriptors=function(obj){var res={};var n=Object.getOwnPropertyNames(obj);for(var i=0,l=n.length;i<l;i++){res[n[i]]=Object.getOwnPropertyDescriptor(obj,n[i]);}return res;};}
if(!Array.prototype.copyWithin){Array.prototype.copyWithin=function(target,start){if(this==null){throw new TypeError("this is null or not defined");}var O=Object(this);var len=O.length >>> 0;var relativeTarget=target >> 0;var to=relativeTarget<0?Math.max(len+relativeTarget,0):Math.min(relativeTarget,len);var relativeStart=start >> 0;var fr=relativeStart<0?Math.max(len+relativeStart,0):Math.min(relativeStart,len);var end=arguments[2];var relativeEnd=end===undefined?len:end >> 0;var final=relativeEnd<0?Math.max(len+relativeEnd,0):Math.min(relativeEnd,len);var count=Math.min(final-fr,len-to);var direction=1;if(fr<to&&to<(fr+count)){direction=-1;fr+=count-1;to+=count-1;}while(count>0){if(fr in O){O[to]=O[fr];}else{delete O[to];}fr+=direction;to+=direction;count--;}return O;};}
if(Array.prototype.keys&&Array.prototype.entries&&!Array.prototype.values){Array.prototype.values=Array.prototype[Symbol.iterator];}
/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
if(!String.fromCodePoint){(function(){var defineProperty=(function(){try{var object={};var $defineProperty=Object.defineProperty;var result=$defineProperty(object,object,object)&&$defineProperty;}catch(error){}return result;}());var stringFromCharCode=String.fromCharCode;var floor=Math.floor;var fromCodePoint=function(_){var MAX_SIZE=0x4000;var codeUnits=[];var highSurrogate;var lowSurrogate;var index=-1;var length=arguments.length;if(!length){return "";}var result="";while(++index<length){var codePoint=Number(arguments[index]);if(!isFinite(codePoint)||codePoint<0||codePoint>0x10FFFF||floor(codePoint)!=codePoint){throw RangeError("Invalid code point: "+codePoint);}if(codePoint<=0xFFFF){codeUnits.push(codePoint);}else{codePoint-=0x10000;highSurrogate=(codePoint>>10)+0xD800;lowSurrogate=(codePoint % 0x400)+0xDC00;codeUnits.push(highSurrogate,lowSurrogate);}if(index+1==length||codeUnits.length>MAX_SIZE){result+=stringFromCharCode.apply(null,codeUnits);codeUnits.length=0;}}return result;};if(defineProperty){defineProperty(String,"fromCodePoint",{"value":fromCodePoint,"configurable":true,"writable":true});}else{String.fromCodePoint=fromCodePoint;}}());}
/*! https://mths.be/codepointat v0.2.0 by @mathias */
if(!String.prototype.codePointAt){(function(){"use strict";var defineProperty=(function(){try{var object={};var $defineProperty=Object.defineProperty;var result=$defineProperty(object,object,object)&& $defineProperty;}catch(error){}return result;}());var codePointAt=function(position){if(this==null){throw TypeError();}var string=String(this);var size=string.length;var index=position?Number(position):0;if(index!=index){index=0;}if(index<0||index>=size){return undefined;}var first=string.charCodeAt(index);var second;if(first>=0xD800&&first<=0xDBFF&&size>index+1){second=string.charCodeAt(index+1);if(second>=0xDC00&&second<=0xDFFF){return (first-0xD800)*0x400+second-0xDC00+0x10000;}}return first;};if(defineProperty){defineProperty(String.prototype,"codePointAt",{"value":codePointAt,"configurable":true,"writable":true});}else{String.prototype.codePointAt=codePointAt;}}());}
if(!("screenLeft" in window)){window.screenLeft=window.screenX;}
if(!("screenTop" in window)){window.screenTop=window.screenY;}
/* https://github.com/tc39/proposal-global */
(function(global){if(!global.globalThis){if(Object.defineProperty){Object.defineProperty(global,"globalThis",{configurable:true,enumerable:false,value:global,writable:true});}else{global.globalThis=global;}}})(typeof this==="object"?this:Function("return this")());
if(RegExp.prototype.flags===undefined){Object.defineProperty(RegExp.prototype,"flags",{configurable:true,get:function(){return this.toString().match(/[gimsuy]*$/)[0];}});}
if(!window.GeneratorFunction){window.GeneratorFunction=Object.getPrototypeOf(function*(){}).constructor;}
if(!String.prototype.matchAll){String.prototype.matchAll=function*(regex){function ef(fls,fl){return (fls.includes(fl)?fls:fls+fl);}const lc=new RegExp(regex,ef(regex.flags,"g"));let match;while(match=lc.exec(this)){yield match;}};}
if(Number.MIN_SAFE_INTEGER===undefined){Number.MIN_SAFE_INTEGER=-9007199254740991;}
if(Number.MAX_SAFE_INTEGER===undefined){Number.MAX_SAFE_INTEGER=9007199254740991;}
if(Number.EPSILON===undefined){Number.EPSILON=Math.pow(2,-52);}
if(!Number.isNaN){Number.isNaN=function(v){return v!==v;};}
if(!window.isNaN){window.isNaN=function isNaN(v){return Number.isNaN(Number(v));};}
if(!Number.isInteger){Number.isInteger=function(v){return typeof v==="number"&&isFinite(v)&&v>-9007199254740992&&v<9007199254740992&&Math.floor(v)===v;};}
if(!Number.isFinite){Number.isFinite=function(v){return typeof v==="number"&&isFinite(v);};}
if(!Number.isSafeInteger){Number.isSafeInteger=function(v){return Number.isInteger(v)&&Math.abs(v)<=Number.MAX_SAFE_INTEGER;};}
if(!Number.parseInt){Number.parseInt=window.parseInt;}
if(!Number.parseFloat){Number.parseFloat=window.parseFloat;}
Math.acosh=Math.acosh||function(x){return Math.log(x+Math.sqrt(x*x-1));};
Math.asinh=Math.asinh||function(x){if(x===-Infinity){return x;}else{return Math.log(x+Math.sqrt(x*x+1));}};
Math.atanh=Math.atanh||function(x){return Math.log((1+x)/(1-x))/2;};
if(!Math.cbrt){Math.cbrt=function(x){var y=Math.pow(Math.abs(x),1/3);return x<0?-y:y;};}
if(!Math.clz32)Math.clz32=(function(log,LN2){return function(x){if(x==null||x===0){return 32;}return 31-log(x >>> 0)/LN2|0;};})(Math.log,Math.LN2);
Math.cosh=Math.cosh||function(x){var y=Math.exp(x);return (y+1/y)/2;};
Math.expm1=Math.expm1||function(x){return Math.exp(x)-1;};
Math.fround=Math.fround||(function(array){return function(x){return array[0]=x,array[0];};})(new Float32Array(1));
Math.hypot=Math.hypot||function(x,y){var max=0;var s=0;for(var i=0;i<arguments.length;i+=1){var arg=Math.abs(Number(arguments[i]));if(arg>max){s*=(max/arg)*(max/arg);max=arg;}s+=arg===0&&max===0?0:(arg/max)*(arg/max);}return max===1/0?1/0:max*Math.sqrt(s);};
Math.imul=Math.imul||function(a,b){var aHi=(a >>> 16)&0xffff;var aLo=a&0xffff;var bHi=(b >>> 16)&0xffff;var bLo=b&0xffff;return ((aLo*bLo)+(((aHi*bLo+aLo*bHi) << 16) >>> 0)|0);};
Math.log1p=Math.log1p||function(x){return Math.log(1+x);};
Math.log10=Math.log10||function(x){return Math.log(x)*Math.LOG10E;};
Math.log2=Math.log2||function(x){return Math.log(x)*Math.LOG2E;};
if(!Math.sign){Math.sign=function(x){return ((x>0)-(x<0))||+x;};}
Math.sinh=Math.sinh||function(x){var y=Math.exp(x);return (y-1/y)/2;}
Math.tanh=Math.tanh||function(x){var a=Math.exp(+x),b=Math.exp(-x);return a==Infinity?1:b==Infinity?-1:(a-b)/(a+b);}
if(!Math.trunc){Math.trunc=function(v){v=+v;return(v-v%1)||(!isFinite(v)||v===0?v:v<0?-0:0);};}
function random(i=100,a){if(a===undefined){a=i;i=0;}return Math.floor(Math.random()*(a-i+1))+i;}
function randomString(pl=100,sc=false){var chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";if(sc){chars+=",?,.:-_*$ß¤Łł÷×¸¨˝´˙`˛°˘^ˇ~§'+!%/=()[]#<>&@{}\"\\/| éáűőúöüóíÉÁŰŐÚÖÜÓÍß";}var s="",l=chars.length;for(var i=0;i<pl;i++){s+=chars[Math.floor(Math.random()*l)];}return s;}
function b64Encode(str){return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,function toSolidBytes(match,p1){return String.fromCharCode("0x"+ p1);}));}
function b64Decode(str){return decodeURIComponent(atob(str).split("").map(function(c){return "%"+("00"+c.charCodeAt(0).toString(16)).slice(-2);}).join(""));}
function javaHash(s,hx){if(s!==undefined){s=""+s;}else{return 0;}var h=0,l=s.length,c="";if(l==0){return h;}for(var i=0;i<l;i++){c=s.charCodeAt(i);h=((h<<5)-h)+c;h=h&h;}if(hx){return h.toString(16);}return h;}
function inherit(c,p){c.prototype=Object.create(p.prototype);c.prototype.constructor=c;return c;}
function getUrlVar(n){var r={},w=window.location.search.substring(1).split("&");for(var i=0,l=w.length;i<l;i++){var e=w[i].split("=");r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);}if(JSON.stringify(r)==="{\"\":\"undefined\"}"){r={};}if(n){return r[n]?r[n]:null;}else{return r;}}
function getUrlVarFromString(qstr,n){var r={},w=qstr.substring(1).split("&");for(var i=0,l=w.length;i<l;i++){var e=w[i].split("=");r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);}if(JSON.stringify(r)==="{\"\":\"undefined\"}"){r={};}if(n){return r[n]?r[n]:null;}else{return r;}}
function obj2string(o){var s="";for(var p in o){if(o.hasOwnProperty(p)){s+=encodeURIComponent(p)+"="+encodeURIComponent(o[p])+"&";}}return s.substring(0,s.length-1);}
function getType(v,t){var ot=(typeof v).toLowerCase();if(ot==="object"){ot=Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/,"$1").toLowerCase();}if(arguments.length===2){return ot===t.toLowerCase();}return ot;}
function extend(){var so={};if(typeof arguments[0]==="boolean"){var t=arguments[1],d=arguments[0],s=2;}else{var t=arguments[0],d=false,s=1;}for(var i=s,l=arguments.length;i<l;i++){so=arguments[i];if(so!==null&&so!==undefined){for(var a in so){if(so.hasOwnProperty(a)){if(typeof so[a]==="object"&&d){t[a]=celestra.extend(true,{},so[a]);}else{t[a]=so[a];}}}}}return t;}
function deepAssign(){var s={},t=arguments[0];for(var i=1,l=arguments.length;i<l;i++){s=arguments[i];if(s!==null&&s!==undefined){for(var a in s){if(s.hasOwnProperty(a)){if(typeof s[a]==="object"){t[a]=celestra.deepAssign({},s[a]);}else{t[a]=s[a];}}}}}return t;}
function strRemoveTags(s){return String(s).replace(/<[^>]*>/g," ").replace(/\s{2,}/g," ").trim();}
const strReverse=(s)=>[...String(s)].reverse().join("");
function forIn(o,fn){for(var p in o){if(o.hasOwnProperty(p)){fn(o[p],p,o);}}return o;}
function mapIn(o,fn){var r={};for(var p in o){if(o.hasOwnProperty(p)){r[p]=fn(o[p],p,o);}}return r;}
const toFunction=(fn)=>Function.prototype.call.bind(fn);
const bind=Function.prototype.call.bind(Function.prototype.bind);
const hasOwn=Function.prototype.call.bind(Object.prototype.hasOwnProperty);
const constant=(v)=>()=>v;
const identity=(v)=>v;
function noop(){}
const T=()=>!0;
const F=()=>!1;
const qsa=(s,c=document)=>[...c.querySelectorAll(s)];
const qs=(s,c=document)=>c.querySelector(s);
function domReady(fn){if(document.readyState!=="loading"){fn();}else{document.addEventListener("DOMContentLoaded",function(event){fn();});}}
function domCreate(t,ps,iH){if(arguments.length===1&&typeof t==="object"){var obj=t;t=obj.elementType;ps={};for(var p in obj){if(p!=="elementType"){ps[p]=obj[p];}}}var el=document.createElement(t);if(ps){for(var p in ps){if(p!=="style"||typeof ps[p]==="string"){el[p]=ps[p];}else{for(var s in ps[p]){el.style[s]=ps[p][s];}}}}if(iH){el.innerHTML=iH;}return el;}
function domToElement(s){var e=document.createElement("div");e.innerHTML=s;return e.firstElementChild;}
function domGetCSS(e,p){return(window.getComputedStyle?getComputedStyle(e,null):e.currentStyle)[p];}
function domSetCSS(e,n,v){if(typeof n==="string"){e.style[n]=v;}else if(typeof n==="object"){for(var p in n){e.style[p]=n[p];}}}
function domFadeIn(e,dur,d){var s=e.style,step=25/(dur||500);s.opacity=(s.opacity||0);s.display=(d||"");(function fade(){(s.opacity=parseFloat(s.opacity)+step)>1?s.opacity=1:setTimeout(fade,25);})();}
function domFadeOut(e,dur){var s=e.style,step=25/(dur||500);s.opacity=(s.opacity||1);(function fade(){(s.opacity-=step)<0?s.display="none":setTimeout(fade,25);})();}
function domFadeToggle(e,dur,d){if((window.getComputedStyle?getComputedStyle(e,null):e.currentStyle).display==="none"){celestra.domFadeIn(e,dur,(d||""));}else{celestra.domFadeOut(e,dur);}}
const domHide=(e)=>e.style.display="none";
const domShow=(e,d="")=>e.style.display=d;
function domToggle(e,d){if((window.getComputedStyle?getComputedStyle(e,null):e.currentStyle).display==="none"){e.style.display=(d||"");}else{e.style.display="none";}}
function domIsHidden(e){return ((window.getComputedStyle?getComputedStyle(e,null):e.currentStyle).display==="none");}
const domOn=(el,et,fn)=>el.addEventListener(et,fn);
const domOff=(el,et,fn)=>el.removeEventListener(et,fn);
const domTrigger=(el,et)=>el[et]();
const domSiblings=(el)=>Array.prototype.filter.call(el.parentNode.children,(e)=>(e!==el));
function importScript(u,s){var scr=document.createElement("script");scr.type="text\/javascript";scr.src=u;scr.onerror=function(e){throw new URIError("Loading failed for the script with source "+e.target.src);};if(s){scr.onreadystatechange=s;scr.onload=s;}(document.head||document.getElementsByTagName("head")[0]).appendChild(scr);}
function importScripts(s){if(Array.isArray(s)){s.forEach(function(e){celestra.importScript(e.url,e.success);});}else{Array.prototype.forEach.call(arguments,function(e){celestra.importScript(e);});}}
function importStyle(h,s){var stl=document.createElement("link");stl.rel="stylesheet";stl.type="text\/css";stl.href=h;stl.onerror=function(e){throw new URIError("Loading failed for the style with source "+e.target.href);};if(s){stl.onreadystatechange=s;stl.onload=s;}(document.head||document.getElementsByTagName("head")[0]).appendChild(stl);}
function importStyles(s){if(Array.isArray(s)){s.forEach(function(e){celestra.importStyle(e.href,e.success);});}else{Array.prototype.forEach.call(arguments,function(e){celestra.importStyle(e);});}}
function form2array(f){var fld,a=[];if(typeof f==="object"&&f.nodeName.toLowerCase()==="form"){for(var i=0,len=f.elements.length;i<len;i++){fld=f.elements[i];if(fld.name&&!fld.disabled&&fld.type!=="file"&&fld.type!=="reset"&&fld.type!=="submit"&&fld.type!=="button"){if(fld.type==="select-multiple"){for(var j=0,l=f.elements[i].options.length;j<l;j++){if(fld.options[j].selected){a.push({"name":encodeURIComponent(fld.name),"value":encodeURIComponent(fld.options[j].value)});}}}else if((fld.type!=="checkbox"&&fld.type!=="radio")||fld.checked){a.push({"name": encodeURIComponent(fld.name),"value":encodeURIComponent(fld.value)});}}}}return a;}
function form2string(f){var fld,a=[];if(typeof f==="object"&&f.nodeName.toLowerCase()==="form"){for(var i=0,len=f.elements.length;i<len;i++){fld=f.elements[i];if(fld.name&&!fld.disabled&&fld.type!=="file"&&fld.type!=="reset"&&fld.type!=="submit"&&fld.type!=="button"){if(fld.type==="select-multiple"){for(var j=0,l=f.elements[i].options.length;j<l;j++){if(fld.options[j].selected){a.push(encodeURIComponent(fld.name)+"="+encodeURIComponent(fld.options[j].value));}}}else if((fld.type!=="checkbox"&&fld.type!=="radio")||fld.checked){a.push(encodeURIComponent(fld.name)+"="+encodeURIComponent(fld.value));}}}}return a.join("&").replace(/%20/g,"+");}
const getDoNotTrack=()=>(!!window.doNotTrack||!!navigator.doNotTrack||!!navigator.msDoNotTrack);
function getLocation(s,e){if(!e){var e=function(){};}function getE(error){e("ERROR("+error.code+"): "+error.message);}if(navigator.geolocation){navigator.geolocation.getCurrentPosition(s,getE);}else{getE("Geolocation is not supported in this browser.");}}
function createFile(fln,c,dt){var l=arguments.length;if(l>1){if(l===2){dt="text/plain";}var b=new Blob([c],{type:dt});if(window.navigator.msSaveOrOpenBlob){window.navigator.msSaveBlob(b,fln);}else{var e=window.document.createElement("a");e.href=window.URL.createObjectURL(b);e.download=fln;document.body.appendChild(e);e.click();document.body.removeChild(e);window.URL.revokeObjectURL(e.href);}}else{throw "Celestra createFile error: too few parameters.";}}
function getFullscreen(){return(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement||undefined);}
function setFullscreenOn(s){if(typeof s==="string"){var e=document.querySelector(s);}else if(typeof s==="object"){var e=s;}if(e.requestFullscreen){e.requestFullscreen();}else if(e.mozRequestFullScreen){e.mozRequestFullScreen();}else if(e.webkitRequestFullscreen){e.webkitRequestFullscreen();}else if(e.msRequestFullscreen){e.msRequestFullscreen();}}
function setFullscreenOff(){if(document.exitFullscreen){document.exitFullscreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.webkitExitFullscreen){document.webkitExitFullscreen();}else if(document.msExitFullscreen){document.msExitFullscreen();}}
function getAjax(url,format,success,error,user,password){var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");if(typeof user==="string"&&typeof password==="string"){xhr.open("GET",url,true,user,password);}else{xhr.open("GET",url,true);}xhr.onreadystatechange=function(){if(this.readyState===4&&this.status===200){switch(format.toLowerCase()){case "text":success(this.responseText);break;case "json":success(JSON.parse(this.responseText));break;case "xml":success(this.responseXML);break;default:success(this.responseText);}}};if(error){xhr.onerror=error;}xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.send();}
function postAjax(url,data,format,success,error,user,password){var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");if(typeof user==="string"&&typeof password==="string"){xhr.open("POST",url,true,user,password);}else{xhr.open("POST",url,true);}xhr.onreadystatechange=function(){if(this.readyState===4&&this.status===200){switch(format.toLowerCase()){case "text":success(this.responseText);break;case "json":success(JSON.parse(this.responseText));break;case "xml":success(this.responseXML);break;default:success(this.responseText);}}};if(error){xhr.onerror=error;}xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");xhr.send(encodeURIComponent(data));}
function getCors(url,format,success,error,user,password){var xhr=new XMLHttpRequest();if(!("withCredentials" in xhr))xhr=new XDomainRequest();if(typeof user==="string"&&typeof password==="string"){xhr.open("GET",url,true,user,password);}else{xhr.open("GET",url,true);}xhr.onload=function(request){switch(format.toLowerCase()){case "text":success(request.target.responseText||request.currentTarget.response);break;case "json":success(JSON.parse(request.target.responseText||request.currentTarget.response));break;case "xml":success(request.target.responseXML||request.currentTarget.responseXML);break;default:success(request.target.responseText||request.currentTarget.response);}};if(error){xhr.onerror=error;}xhr.send();}
function postCors(url,data,format,success,error,user,password){var xhr=new XMLHttpRequest();if(!("withCredentials" in xhr))xhr=new XDomainRequest();if(typeof user==="string"&&typeof password==="string"){xhr.open("POST",url,true,user,password);}else{xhr.open("POST",url,true);}xhr.onload=function(request){switch(format.toLowerCase()){case "text":success(request.target.responseText||request.currentTarget.response);break;case "json":success(JSON.parse(request.target.responseText||request.currentTarget.response));break;case "xml":success(request.target.responseXML||request.currentTarget.responseXML);break;default:success(request.target.responseText||request.currentTarget.response);}};if(error){xhr.onerror=error;}xhr.send(encodeURIComponent(data));}
function getText(u,s){celestra.ajax({url:u,success:s});}
function getJson(u,s){celestra.ajax({url:u,format:"json",success:s});}
function ajax(o){if(typeof o.url!=="string"){throw new TypeError("Celestra ajax error: The url parameter have to a function.");}if(typeof o.success!=="function"){throw new TypeError("Celestra ajax error: The success parameter have to a function.");}if(!(["function","undefined"].includes(typeof o.error))){throw new TypeError("Celestra ajax error: The error parameter have to a function or undefined.");}if(!o.queryType){o.queryType="ajax";}else{o.queryType=o.queryType.toLowerCase();}if(!o.type){o.type="get";}else{o.type=o.type.toLowerCase();}if(o.type==="get"){var typeStr="GET";}else if(o.type==="post"){var typeStr="POST";}else{ throw "Celestra ajax error: The type parameter have to be \"get\" or \"post\".";}if(!o.format){o.format="text";}else{o.format=o.format.toLowerCase();if(!(["text","json","xml"].includes(o.format))){throw "Celestra ajax error: The format parameter have to be \"text\" or \"json\" or \"xml\".";}}var xhr;if(o.queryType==="ajax"){xhr=new XMLHttpRequest();}else if(o.queryType==="cors"){xhr=new XMLHttpRequest();if(!("withCredentials" in xhr)){xhr=new XDomainRequest();}}else{throw "Celestra ajax error: The querytype parameter have to be \"ajax\" or \"cors\".";}if(typeof user==="string"&&typeof password==="string"){xhr.open(typeStr,o.url,true,o.user,o.password);}else{xhr.open(typeStr,o.url,true);}if(o.queryType==="ajax"){xhr.onreadystatechange=function(){if(this.readyState===4&&this.status===200){switch(o.format.toLowerCase()){case "text":o.success(this.responseText);break;case"json":o.success(JSON.parse(this.responseText));break;case"xml":o.success(this.responseXML);break;default:o.success(this.responseText);}}};xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");if(o.typeStr==="POST"){xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");}}else if(o.queryType==="cors"){xhr.onload=function(request){switch(o.format.toLowerCase()){case "text":o.success(request.target.responseText||request.currentTarget.response);break;case "json":o.success(JSON.parse(request.target.responseText||request.currentTarget.response));break;case "xml":o.success(request.target.responseXML||request.currentTarget.responseXML);break;default:o.success(request.target.responseText||request.currentTarget.response);}};}if(typeof o.error==="function"){xhr.onerror=o.error;}if(typeStr==="GET"){xhr.send();}else if(typeStr==="POST"){xhr.send(encodeURI(o.data));}}
function isEqual(a,b){return (celestra.getType(a,celestra.getType(b))&&JSON.stringify(a)===JSON.stringify(b));}
const isString=(v)=>(typeof v==="string");
const isChar=(v)=>(typeof v==="string"&&v.length===1);
const isNumber=(v)=>(typeof v==="number");
const isInteger=Number.isInteger;
const isFloat=(v)=>(typeof v==="number"&&!!(v % 1));
function isNumeric(v){return((typeof v==="number"&&v===v)?true:(!isNaN(parseFloat(v))&&isFinite(v)));}
const isBoolean=(v)=>(typeof v==="boolean");
const isObject=(v)=>(typeof v==="object");
function isEmptyObject(v){if(typeof v==="object"){for(var n in v){return false;}return true;}return false;}
const isFunction=(v)=>(typeof v==="function");
const isArray=Array.isArray;
const isEmptyArray=(v)=>(Array.isArray(v)&&v.length===0);
const isArraylike=(v)=>((typeof v==="object"||typeof v === "string")&&v!==null&&typeof v.length==="number"&&v.length>=0&&v.length%1===0);
const isNull=(v)=>(v===null);
const isUndefined=(v)=>(v===undefined);
const isNullOrUndefined=(v)=>(v===null||v=== undefined);
const isNil=isNullOrUndefined;
const isPrimitive=(v)=>(v===null||typeof v!=="object"&&typeof v!=="function");
const isSymbol=(v)=>(typeof v==="symbol");
const isMap=(v)=>(celestra.__objType__(v)==="map");
const isSet=(v)=>(celestra.__objType__(v)==="set");
const isWeakMap=(v)=>(celestra.__objType__(v)==="weakmap");
const isWeakSet=(v)=>(celestra.__objType__(v)==="weakset");
const isIterator=(v)=>(celestra.__objType__(v).includes("iterator"));
const isDate=(v)=>(celestra.__objType__(v)==="date");
const isRegexp=(v)=>(celestra.__objType__(v)==="regexp");
const isElement=(v)=>(typeof v==="object"&&v.nodeType===1);
const isIterable=(v)=>(!!v[Symbol.iterator]);
const isBigInt=(v)=>(typeof v==="bigint");
const isArrayBuffer=(v)=>(celestra.__objType__(v)==="arraybuffer");
function isTypedArray(v){return ["int8array","uint8array","uint8clampedarray","int16array","uint16array","int32array","uint32array","float32array","float64array","bigint64array","biguint64array"].includes(celestra.__objType__(v));}
const isGenerator=(v)=>(Object.getPrototypeOf(v).constructor===Object.getPrototypeOf(function*(){}).constructor);
function setCookie(name,value,hours,path,domain,secure,HttpOnly){if(!hours){var hours=8760;}var expire=new Date();expire.setTime(expire.getTime()+(Math.round(hours*60*60*1000)));document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+"; expires="+expire.toUTCString()+"; path="+(path?path:"/")+(domain?"; domain="+domain:"")+(secure?"; secure":"")+(HttpOnly?"; HttpOnly":"")+";";}
function getCookie(name){if(document.cookie.length!==0){var r={},a=document.cookie.split(";");for(var i=0,l=a.length;i<l;i++){var e=a[i].trim().split("=");r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);}if(name){return r[name]?r[name]:null;}else{return r;}}return name?null:{};}
function hasCookie(name){return (document.cookie.includes(encodeURIComponent(name)+"="));}
function removeCookie(name,path,domain,secure,HttpOnly){var r=(document.cookie.indexOf(encodeURIComponent(name)+"=")!==-1);document.cookie=encodeURIComponent(name)+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT"+"; path="+(path?path:"/")+(domain?"; domain="+domain:"")+(secure?"; secure":"")+(HttpOnly?"; HttpOnly":"")+";";return r;}
function clearCookies(path,domain,secure,HttpOnly){for(var item in celestra.getCookie()){celestra.removeCookie(item,path,domain,secure,HttpOnly);}}
function forEach(a,fn){var t=Object.prototype.toString.call(a).replace(/^\[object (.+)\]$/,"$1").toLowerCase();if(Array.isArray(a)||t==="map"||t==="set"){a.forEach(fn);return a;}else{var a2=Array.from(a);a2.forEach(fn);if(typeof a!=="string"){return a2;}return a2.join("");}}
function map(a,fn){var t=Object.prototype.toString.call(a).replace(/^\[object (.+)\]$/,"$1").toLowerCase();if(Array.isArray(a)){return a.map(fn);}else if(t==="string"){return Array.from(a).map(fn).join("");}else if(t==="map"){return new Map(Array.from(a).map(fn));}else if(t==="set"){return new Set(Array.from(a).map(fn));}else{return Array.from(a).map(fn);}}
const arrayUnion=(...a)=>[...new Set(a.map(([...e])=>e).flat())];
function arrayIntersection([...a],[...b]){return a.filter((v)=>b.includes(v)).filter((e,i,arr)=>arr.indexOf(e)===i);}
function arrayDifference([...a],[...b]){return a.filter((v)=>!(b.includes(v))).filter((e,i,arr)=>arr.indexOf(e)===i);}
function arraySymmetricDifference([...a],[...b]){return a.filter((v)=>!(b.includes(v))).concat(b.filter((v)=>!(a.includes(v)))).filter((e,i,arr)=>arr.indexOf(e)===i);}
const setUnion=(...a)=>new Set(a.map(([...e])=>e).flat());
const setIntersection=([...a],b)=>new Set(a.filter((v)=>b.has(v)));
const setDifference=([...a],b)=>new Set(a.filter((v)=>!(b.has(v))));
function setSymmetricDifference(a,b){return new Set([...a].filter((v)=>!(b.has(v))).concat([...b].filter((v)=>!(a.has(v)))));}
const arrayKeys=([...a])=>[...a.keys()];
const arrayValues=([...a])=>a;
const arrayEntries=([...a])=>[...a.entries()];
const isSuperset=([...sup],[...sub])=>sub.every((v)=>sup.includes(v));
function min([...a]){if(a.length>0){var r=a[0];a.forEach(function(v,i,arr){if(v<r){r=v;}});return r;}return null;}
function minIndex([...a]){if(a.length>0){var r=0;a.forEach(function(v,i,arr){if(v<arr[r]){r=i;}});return r;}return null;}
function max([...a]){if(a.length>0){var r=a[0];a.forEach(function(v,i,arr){if(v>r){r=v;}});return r;}return null;}
function maxIndex([...a]){if(a.length>0){var r=0;a.forEach(function(v,i,arr){if(v>arr[r]){r=i;}});return r;}return null;}
const arrayRepeat=(v,n=100)=>Array(n).fill(v);
const arrayCycle=([...a],n=100)=>Array(n).fill(a).flat();
function arrayRange(start,end,step=1){var i=Number(start),end2=Number(end),res=[];while(i<=end2){res.push(i);i+=step;}return res;}
function zip(){var arrays=[],res=[],i,j,l,item;for(i=0,l=arguments.length;i<l;i++){arrays.push(Array.from(arguments[i]));}var min=arrays[0].length;for(i=1,l=arrays.length;i<l;i++){if(arrays[i].length<min){min=arrays[i].length;}}for(i=0;i<min;i++){item=[];for(j=0;j<l;j++){item.push(arrays[j][i]);}res.push(item);}return res;}
function unzip([...a]){var a2=a.map(([...v])=>v);var res=[],i,j,l1=a2[0].length,l2=a2.length;for(i=0;i<l1;i++){res.push([]);}for(i=0;i<l1;i++){for(j=0;j<l2;j++){res[i].push(a2[j][i]);}}return res;}
const uniqueArray=([...a])=>[...new Set(a)];
function uniquePush(a,v){if(a.indexOf(v)===-1){a.push(v);return true;}return false;}
function arrayClear(a){a.length=0;return a;}
function arrayRemove(a,v,all){var found=(a.indexOf(v)!==-1);if(!all){var pos=a.indexOf(v);if(pos!==-1){a.splice(pos,1);}}else{var pos=-1;while((pos=a.indexOf(v))!==-1){a.splice(pos,1);}}return found;}
const item=([...a],i)=>a[(i<0?a.length+i:i)];
function arrayMerge(){if(typeof arguments[0]==="boolean"){var t=arguments[1],d=arguments[0],s=2;}else{var t=arguments[0],d=false,s=1;}for(var i=s,il=arguments.length;i<il;i++){if(Array.isArray(arguments[i])){for(var j=0,a=arguments[i],jl=a.length;j<jl;j++){if(Array.isArray(a[j])&&d){celestra.arrayMerge(true,t,a[j]);}else{t.push(a[j]);}}}else{t.push(arguments[i]);}}return t;}
function*iterRange(start=0,step=1,end=Infinity){let i=start;while(i<=end){yield i;i+=step;}}
function*iterCycle(it,n=Infinity){let i=0;let it2=Array.from(it);while(i<n){yield* it2.values();i++;}}
function*iterRepeat(value,n=Infinity){let i=0;while(i<n){yield value;i++;}}
function*takeWhile(it,fn){for(let item of it){if(!fn(item)){break;}yield item;}}
function*dropWhile(it,fn){let d=true;for(let item of it){if(d&&!fn(item)){d=false;}if(!d){yield item;}}}
function*takeOf(it,n=1){let i=n;for(let item of it){if(i<=0){break;}yield item;i--;}}
function*dropOf(it,n=1){let i=n;for(let item of it){if(i<1){yield item;}else{i--;}}}
function forOf(it,fn){let i=0;for(let item of it){fn(item,i++);}}
function*mapOf(it,fn){let i=0;for(let item of it){yield fn(item,i++);}}
function*filterOf(it,fn){let i=0;for(let item of it){if(fn(item,i++)){yield item;}}}
function*sliceOf(it,begin=0,end=Infinity){let i=0;for(let item of it){if(i>=begin&&i<=end){yield item;}else if(i>end){return;}i++;}}
function itemOf(it,p){let i=0;for(let item of it){if(i++===p){return item;}}}
function sizeOf(it){let i=0;for(let item of it){i++;}return i;}
function firstOf(it){for(let item of it){return item;}}
function lastOf(it){let item;for(item of it){}return item;}
const reverseOf=([...a])=>a.reverse().values();
const sortOf=([...a])=>a.sort().values();
function hasOf(it,v){for(let item of it){if(item===v){return true;}}return false;}
function findOf(it,fn){let i=0;for(let item of it){if(fn(item,i++)){return item;}}}
function everyOf(it,fn){let i=0;for(let item of it){if(!fn(item,i++)){return false;}}if(i===0){return false;}return true;}
function someOf(it,fn){let i=0;for(let item of it){if(fn(item,i++)){return true;}}return false;}
function noneOf(it,fn){let i=0;for(let item of it){if(fn(item,i++)){return false;}}if(i===0){return false;}return true;}
function*takeRight([...a],n=1){let i=n;for(let item of a.reverse()){if(i<=0){break;}yield item;i--;}}
function*takeRightWhile([...a],fn){let i=0;for(let item of a.reverse()){if(fn(item,i)){yield item;}else{break;}}}
function*dropRight([...a],n=1){let i=n;for(let item of a.reverse()){if(i<1){yield item;}else{i--;}}}
function*dropRightWhile([...a],fn){let d=true;for(let item of a.reverse()){if(d&&!fn(item)){d=false;}if(!d){yield item;}}}
function*concatOf(){for(let item of arguments){yield* item;}}
function reduceOf(it,fn,iv){let acc=iv;let i=0;for(let item of it){if(i===0&&acc===undefined){acc=item;}else{acc=fn(acc,item,i++);}}return acc;}
function noConflict(){return celestra;}
function __objType__(v){return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/,"$1").toLowerCase();}
var celestra={VERSION:"Celestra v3.0.2", noConflict:noConflict, __objType__:__objType__, random:random, randomString:randomString, b64Encode:b64Encode, b64Decode:b64Decode, javaHash:javaHash, inherit:inherit, getUrlVar:getUrlVar, getUrlVarFromString:getUrlVarFromString, obj2string:obj2string, getType:getType, extend:extend, deepAssign:deepAssign, strRemoveTags:strRemoveTags, strReverse:strReverse, forIn:forIn, mapIn:mapIn, toFunction:toFunction, bind:bind, hasOwn:hasOwn, constant:constant, identity:identity, noop:noop, T:T, F:F, qsa:qsa, qs:qs, domReady:domReady, domCreate:domCreate, domToElement:domToElement, domGetCSS:domGetCSS, domSetCSS:domSetCSS, domFadeIn:domFadeIn, domFadeOut:domFadeOut, domFadeToggle:domFadeToggle, domHide:domHide, domShow:domShow, domToggle:domToggle, domIsHidden:domIsHidden, domOn:domOn, domOff:domOff, domTrigger:domTrigger, domSiblings:domSiblings, importScript:importScript, importScripts:importScripts, importStyle:importStyle, importStyles:importStyles, form2array:form2array, form2string:form2string, getDoNotTrack:getDoNotTrack, getLocation:getLocation, createFile:createFile, getFullscreen:getFullscreen, setFullscreenOn:setFullscreenOn, setFullscreenOff:setFullscreenOff, getAjax:getAjax, postAjax:postAjax, getCors:getCors, postCors:postCors, getText:getText, getJson:getJson, ajax:ajax, isEqual:isEqual, isString:isString, isChar:isChar, isNumber:isNumber, isInteger:isInteger, isFloat:isFloat, isNumeric:isNumeric, isBoolean:isBoolean, isObject:isObject, isEmptyObject:isEmptyObject, isFunction:isFunction, isArray:isArray, isEmptyArray:isEmptyArray, isArraylike:isArraylike, isNull:isNull, isUndefined:isUndefined, isNullOrUndefined:isNullOrUndefined, isNil:isNil, isPrimitive:isPrimitive, isSymbol:isSymbol, isMap:isMap, isSet:isSet, isWeakMap:isWeakMap, isWeakSet:isWeakSet, isIterator:isIterator, isDate:isDate, isRegexp:isRegexp, isElement:isElement, isIterable:isIterable, isBigInt:isBigInt, isArrayBuffer:isArrayBuffer, isTypedArray:isTypedArray, isGenerator:isGenerator, setCookie:setCookie, getCookie:getCookie, hasCookie:hasCookie, removeCookie:removeCookie, clearCookies:clearCookies, forEach:forEach, map:map, arrayUnion:arrayUnion, arrayIntersection:arrayIntersection, arrayDifference:arrayDifference, arraySymmetricDifference:arraySymmetricDifference, setUnion:setUnion, setIntersection:setIntersection, setDifference:setDifference, setSymmetricDifference:setSymmetricDifference, arrayKeys:arrayKeys, arrayValues:arrayValues, arrayEntries:arrayEntries, isSuperset:isSuperset, min:min, minIndex:minIndex, max:max, maxIndex:maxIndex, arrayRepeat:arrayRepeat, arrayCycle:arrayCycle, arrayRange:arrayRange, zip:zip, unzip:unzip, uniqueArray:uniqueArray, uniquePush:uniquePush, arrayClear:arrayClear, arrayRemove:arrayRemove, item:item, arrayMerge:arrayMerge, iterRange:iterRange, iterCycle:iterCycle, iterRepeat:iterRepeat, takeWhile:takeWhile, dropWhile:dropWhile, takeOf:takeOf, dropOf:dropOf, forOf:forOf, mapOf:mapOf, filterOf:filterOf, sliceOf:sliceOf, itemOf:itemOf, sizeOf:sizeOf, firstOf:firstOf, lastOf:lastOf, reverseOf:reverseOf, sortOf:sortOf, hasOf:hasOf, findOf:findOf, everyOf:everyOf, someOf:someOf, noneOf:noneOf, takeRight:takeRight, takeRightWhile:takeRightWhile, dropRight:dropRight, dropRightWhile:dropRightWhile, concatOf:concatOf, reduceOf:reduceOf};
export { celestra };
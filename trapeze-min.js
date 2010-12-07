/*!
 * jQuery JavaScript Library v1.4.1
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Jan 25 19:43:33 2010 -0500
 */
(function(z,v){function la(){if(!c.isReady){try{r.documentElement.doScroll("left")}catch(a){setTimeout(la,1);return}c.ready()}}function Ma(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,i){var j=a.length;if(typeof b==="object"){for(var n in b)X(a,n,b[n],f,e,d);return a}if(d!==v){f=!i&&f&&c.isFunction(d);for(n=0;n<j;n++)e(a[n],b,f?d.call(a[n],n,e(a[n],b)):d,i);return a}return j?
e(a[0],b):null}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function ma(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function na(a){var b,d=[],f=[],e=arguments,i,j,n,o,m,s,x=c.extend({},c.data(this,"events").live);if(!(a.button&&a.type==="click")){for(o in x){j=x[o];if(j.live===a.type||j.altLive&&c.inArray(a.type,j.altLive)>-1){i=j.data;i.beforeFilter&&i.beforeFilter[a.type]&&!i.beforeFilter[a.type](a)||f.push(j.selector)}else delete x[o]}i=c(a.target).closest(f,
a.currentTarget);m=0;for(s=i.length;m<s;m++)for(o in x){j=x[o];n=i[m].elem;f=null;if(i[m].selector===j.selector){if(j.live==="mouseenter"||j.live==="mouseleave")f=c(a.relatedTarget).closest(j.selector)[0];if(!f||f!==n)d.push({elem:n,fn:j})}}m=0;for(s=d.length;m<s;m++){i=d[m];a.currentTarget=i.elem;a.data=i.fn.data;if(i.fn.apply(i.elem,e)===false){b=false;break}}return b}}function oa(a,b){return"live."+(a?a+".":"")+b.replace(/\./g,"`").replace(/ /g,"&")}function pa(a){return!a||!a.parentNode||a.parentNode.nodeType===
11}function qa(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var i in f)for(var j in f[i])c.event.add(this,i,f[i][j],f[i][j].data)}}})}function ra(a,b,d){var f,e,i;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&a[0].indexOf("<option")<0&&(c.support.checkClone||!sa.test(a[0]))){e=true;if(i=c.fragments[a[0]])if(i!==1)f=i}if(!f){b=b&&b[0]?b[0].ownerDocument||b[0]:r;f=b.createDocumentFragment();
c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=i?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(ta.concat.apply([],ta.slice(0,b)),function(){d[this]=a});return d}function ua(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Na=z.jQuery,Oa=z.$,r=z.document,S,Pa=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Qa=/^.[^:#\[\.,]*$/,Ra=/\S/,Sa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Ta=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,O=navigator.userAgent,
va=false,P=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,Q=Array.prototype.slice,wa=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(typeof a==="string")if((d=Pa.exec(a))&&(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:r;if(a=Ta.exec(a))if(c.isPlainObject(b)){a=[r.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=ra([d[1]],
[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}}else{if(b=r.getElementById(d[2])){if(b.id!==d[2])return S.find(a);this.length=1;this[0]=b}this.context=r;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=r;a=r.getElementsByTagName(a)}else return!b||b.jquery?(b||S).find(a):c(b).find(a);else if(c.isFunction(a))return S.ready(a);if(a.selector!==v){this.selector=a.selector;this.context=a.context}return c.isArray(a)?this.setArray(a):c.makeArray(a,
this)},selector:"",jquery:"1.4.1",length:0,size:function(){return this.length},toArray:function(){return Q.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){a=c(a||null);a.prevObject=this;a.context=this.context;if(b==="find")a.selector=this.selector+(this.selector?" ":"")+d;else if(b)a.selector=this.selector+"."+b+"("+d+")";return a},setArray:function(a){this.length=0;ba.apply(this,a);return this},each:function(a,b){return c.each(this,
a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(r,c);else P&&P.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(Q.apply(this,arguments),"slice",Q.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};
c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,i,j,n;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(i in e){j=a[i];n=e[i];if(a!==n)if(f&&n&&(c.isPlainObject(n)||c.isArray(n))){j=j&&(c.isPlainObject(j)||c.isArray(j))?j:c.isArray(n)?[]:{};a[i]=c.extend(f,j,n)}else if(n!==v)a[i]=n}return a};c.extend({noConflict:function(a){z.$=
Oa;if(a)z.jQuery=Na;return c},isReady:false,ready:function(){if(!c.isReady){if(!r.body)return setTimeout(c.ready,13);c.isReady=true;if(P){for(var a,b=0;a=P[b++];)a.call(r,c);P=null}c.fn.triggerHandler&&c(r).triggerHandler("ready")}},bindReady:function(){if(!va){va=true;if(r.readyState==="complete")return c.ready();if(r.addEventListener){r.addEventListener("DOMContentLoaded",L,false);z.addEventListener("load",c.ready,false)}else if(r.attachEvent){r.attachEvent("onreadystatechange",L);z.attachEvent("onload",
c.ready);var a=false;try{a=z.frameElement==null}catch(b){}r.documentElement.doScroll&&a&&la()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,"isPrototypeOf"))return false;var b;for(b in a);return b===v||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;
return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return z.JSON&&z.JSON.parse?z.JSON.parse(a):(new Function("return "+a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Ra.test(a)){var b=r.getElementsByTagName("head")[0]||
r.documentElement,d=r.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(r.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,i=a.length,j=i===v||c.isFunction(a);if(d)if(j)for(f in a){if(b.apply(a[f],d)===false)break}else for(;e<i;){if(b.apply(a[e++],d)===false)break}else if(j)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=
a[0];e<i&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Sa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==
v;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,i=a.length;e<i;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,i=0,j=a.length;i<j;i++){e=b(a[i],i,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=v}else if(b&&!c.isFunction(b)){d=b;b=v}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},
uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});O=c.uaMatch(O);if(O.browser){c.browser[O.browser]=true;c.browser.version=O.version}if(c.browser.webkit)c.browser.safari=true;if(wa)c.inArray=function(a,b){return wa.call(b,a)};S=c(r);if(r.addEventListener)L=function(){r.removeEventListener("DOMContentLoaded",
L,false);c.ready()};else if(r.attachEvent)L=function(){if(r.readyState==="complete"){r.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=r.documentElement,b=r.createElement("script"),d=r.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var e=d.getElementsByTagName("*"),i=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!i)){c.support=
{leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(i.getAttribute("style")),hrefNormalized:i.getAttribute("href")==="/a",opacity:/^0.55$/.test(i.style.opacity),cssFloat:!!i.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:r.createElement("select").appendChild(r.createElement("option")).selected,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};
b.type="text/javascript";try{b.appendChild(r.createTextNode("window."+f+"=1;"))}catch(j){}a.insertBefore(b,a.firstChild);if(z[f]){c.support.scriptEval=true;delete z[f]}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function n(){c.support.noCloneEvent=false;d.detachEvent("onclick",n)});d.cloneNode(true).fireEvent("onclick")}d=r.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=r.createDocumentFragment();a.appendChild(d.firstChild);
c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var n=r.createElement("div");n.style.width=n.style.paddingLeft="1px";r.body.appendChild(n);c.boxModel=c.support.boxModel=n.offsetWidth===2;r.body.removeChild(n).style.display="none"});a=function(n){var o=r.createElement("div");n="on"+n;var m=n in o;if(!m){o.setAttribute(n,"return;");m=typeof o[n]==="function"}return m};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=i=null}})();c.props=
{"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ua=0,xa={},Va={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==z?xa:a;var f=a[G],e=c.cache;if(!b&&!f)return null;f||(f=++Ua);if(typeof b==="object"){a[G]=f;e=e[f]=c.extend(true,
{},b)}else e=e[f]?e[f]:typeof d==="undefined"?Va:(e[f]={});if(d!==v){a[G]=f;e[b]=d}return typeof b==="string"?e[b]:e}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==z?xa:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{try{delete a[G]}catch(i){a.removeAttribute&&a.removeAttribute(G)}delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,
a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===v){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===v&&this.length)f=c.data(this[0],a);return f===v&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);
return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===v)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||
a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var ya=/[\n\t]/g,ca=/\s+/,Wa=/\r/g,Xa=/href|src|style/,Ya=/(button|input)/i,Za=/(button|input|object|select|textarea)/i,$a=/^(a|area)$/i,za=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(o){var m=
c(this);m.addClass(a.call(this,o,m.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className)for(var i=" "+e.className+" ",j=0,n=b.length;j<n;j++){if(i.indexOf(" "+b[j]+" ")<0)e.className+=" "+b[j]}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(o){var m=c(this);m.removeClass(a.call(this,o,m.attr("class")))});if(a&&typeof a==="string"||a===v)for(var b=(a||"").split(ca),
d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var i=(" "+e.className+" ").replace(ya," "),j=0,n=b.length;j<n;j++)i=i.replace(" "+b[j]+" "," ");e.className=i.substring(1,i.length-1)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var i=c(this);i.toggleClass(a.call(this,e,i.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,i=0,j=c(this),n=b,o=
a.split(ca);e=o[i++];){n=f?n:!j.hasClass(e);j[n?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(ya," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===v){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||
{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var i=b?d:0;for(d=b?d+1:e.length;i<d;i++){var j=e[i];if(j.selected){a=c(j).val();if(b)return a;f.push(a)}}return f}if(za.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Wa,"")}return v}var n=c.isFunction(a);return this.each(function(o){var m=c(this),s=a;if(this.nodeType===1){if(n)s=a.call(this,o,m.val());
if(typeof s==="number")s+="";if(c.isArray(s)&&za.test(this.type))this.checked=c.inArray(m.val(),s)>=0;else if(c.nodeName(this,"select")){var x=c.makeArray(s);c("option",this).each(function(){this.selected=c.inArray(c(this).val(),x)>=0});if(!x.length)this.selectedIndex=-1}else this.value=s}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return v;if(f&&b in c.attrFn)return c(a)[b](d);
f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==v;b=f&&c.props[b]||b;if(a.nodeType===1){var i=Xa.test(b);if(b in a&&f&&!i){if(e){b==="type"&&Ya.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:Za.test(a.nodeName)||$a.test(a.nodeName)&&a.href?0:v;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=
""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&i?a.getAttribute(b,2):a.getAttribute(b);return a===null?v:a}return c.style(a,b,d)}});var ab=function(a){return a.replace(/[^\w\s\.\|`]/g,function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==z&&!a.frameElement)a=z;if(!d.guid)d.guid=c.guid++;if(f!==v){d=c.proxy(d);d.data=f}var e=c.data(a,"events")||c.data(a,"events",{}),i=c.data(a,"handle"),j;if(!i){j=
function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(j.elem,arguments):v};i=c.data(a,"handle",j)}if(i){i.elem=a;b=b.split(/\s+/);for(var n,o=0;n=b[o++];){var m=n.split(".");n=m.shift();if(o>1){d=c.proxy(d);if(f!==v)d.data=f}d.type=m.slice(0).sort().join(".");var s=e[n],x=this.special[n]||{};if(!s){s=e[n]={};if(!x.setup||x.setup.call(a,f,m,d)===false)if(a.addEventListener)a.addEventListener(n,i,false);else a.attachEvent&&a.attachEvent("on"+n,i)}if(x.add)if((m=x.add.call(a,
d,f,m,s))&&c.isFunction(m)){m.guid=m.guid||d.guid;m.data=m.data||d.data;m.type=m.type||d.type;d=m}s[d.guid]=d;this.global[n]=true}a=null}}},global:{},remove:function(a,b,d){if(!(a.nodeType===3||a.nodeType===8)){var f=c.data(a,"events"),e,i,j;if(f){if(b===v||typeof b==="string"&&b.charAt(0)===".")for(i in f)this.remove(a,i+(b||""));else{if(b.type){d=b.handler;b=b.type}b=b.split(/\s+/);for(var n=0;i=b[n++];){var o=i.split(".");i=o.shift();var m=!o.length,s=c.map(o.slice(0).sort(),ab);s=new RegExp("(^|\\.)"+
s.join("\\.(?:.*\\.)?")+"(\\.|$)");var x=this.special[i]||{};if(f[i]){if(d){j=f[i][d.guid];delete f[i][d.guid]}else for(var A in f[i])if(m||s.test(f[i][A].type))delete f[i][A];x.remove&&x.remove.call(a,o,j);for(e in f[i])break;if(!e){if(!x.teardown||x.teardown.call(a,o)===false)if(a.removeEventListener)a.removeEventListener(i,c.data(a,"handle"),false);else a.detachEvent&&a.detachEvent("on"+i,c.data(a,"handle"));e=null;delete f[i]}}}}for(e in f)break;if(!e){if(A=c.data(a,"handle"))A.elem=null;c.removeData(a,
"events");c.removeData(a,"handle")}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();this.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return v;a.result=v;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,
b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(i){}if(!a.isPropagationStopped()&&f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){d=a.target;var j;if(!(c.nodeName(d,"a")&&e==="click")&&!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()])){try{if(d[e]){if(j=d["on"+e])d["on"+e]=null;this.triggered=true;d[e]()}}catch(n){}if(j)d["on"+e]=j;this.triggered=false}}},handle:function(a){var b,
d;a=arguments[0]=c.event.fix(a||z.event);a.currentTarget=this;d=a.type.split(".");a.type=d.shift();b=!d.length&&!a.exclusive;var f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)");d=(c.data(this,"events")||{})[a.type];for(var e in d){var i=d[e];if(b||f.test(i.type)){a.handler=i;a.data=i.data;i=i.apply(this,arguments);if(i!==v){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||r;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=r.documentElement;d=r.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==v)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a,b){c.extend(a,b||{});a.guid+=b.selector+b.live;b.liveProxy=a;c.event.add(this,b.live,na,b)},remove:function(a){if(a.length){var b=
0,d=new RegExp("(^|\\.)"+a[0]+"(\\.|$)");c.each(c.data(this,"events").live||{},function(){d.test(this.type)&&b++});b<1&&c.event.remove(this,a[0],na)}},special:{}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};
c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y};var Aa=function(a){for(var b=
a.relatedTarget;b&&b!==this;)try{b=b.parentNode}catch(d){break}if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}},Ba=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ba:Aa,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ba:Aa)}}});if(!c.support.submitBubbles)c.event.special.submit={setup:function(a,b,d){if(this.nodeName.toLowerCase()!==
"form"){c.event.add(this,"click.specialSubmit."+d.guid,function(f){var e=f.target,i=e.type;if((i==="submit"||i==="image")&&c(e).closest("form").length)return ma("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit."+d.guid,function(f){var e=f.target,i=e.type;if((i==="text"||i==="password")&&c(e).closest("form").length&&f.keyCode===13)return ma("submit",this,arguments)})}else return false},remove:function(a,b){c.event.remove(this,"click.specialSubmit"+(b?"."+b.guid:""));c.event.remove(this,
"keypress.specialSubmit"+(b?"."+b.guid:""))}};if(!c.support.changeBubbles){var da=/textarea|input|select/i;function Ca(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d}function ea(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Ca(d);if(a.type!=="focusout"||
d.type!=="radio")c.data(d,"_change_data",e);if(!(f===v||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}}c.event.special.change={filters:{focusout:ea,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return ea.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return ea.call(this,a)},beforeactivate:function(a){a=
a.target;a.nodeName.toLowerCase()==="input"&&a.type==="radio"&&c.data(a,"_change_data",Ca(a))}},setup:function(a,b,d){for(var f in T)c.event.add(this,f+".specialChange."+d.guid,T[f]);return da.test(this.nodeName)},remove:function(a,b){for(var d in T)c.event.remove(this,d+".specialChange"+(b?"."+b.guid:""),T[d]);return da.test(this.nodeName)}};var T=c.event.special.change.filters}r.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,
f)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var i in d)this[b](i,f,d[i],e);return this}if(c.isFunction(f)){e=f;f=v}var j=b==="one"?c.proxy(e,function(n){c(this).unbind(n,j);return e.apply(this,arguments)}):e;return d==="unload"&&b!=="one"?this.one(d,f,e):this.each(function(){c.event.add(this,d,j,f)})}});c.fn.extend({unbind:function(a,
b){if(typeof a==="object"&&!a.preventDefault){for(var d in a)this.unbind(d,a[d]);return this}return this.each(function(){c.event.remove(this,a,b)})},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+
a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e){var i,j=0;if(c.isFunction(f)){e=f;f=v}for(d=(d||"").split(/\s+/);(i=d[j++])!=null;){i=i==="focus"?"focusin":i==="blur"?"focusout":i==="hover"?d.push("mouseleave")&&"mouseenter":i;b==="live"?c(this.context).bind(oa(i,this.selector),{data:f,selector:this.selector,
live:i},e):c(this.context).unbind(oa(i,this.selector),e?{guid:e.guid+this.selector+i}:null)}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});z.attachEvent&&!z.addEventListener&&z.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});
(function(){function a(g){for(var h="",k,l=0;g[l];l++){k=g[l];if(k.nodeType===3||k.nodeType===4)h+=k.nodeValue;else if(k.nodeType!==8)h+=a(k.childNodes)}return h}function b(g,h,k,l,q,p){q=0;for(var u=l.length;q<u;q++){var t=l[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===k){y=l[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=k;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}l[q]=y}}}function d(g,h,k,l,q,p){q=0;for(var u=l.length;q<u;q++){var t=l[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===
k){y=l[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=k;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(o.filter(h,[t]).length>0){y=t;break}}t=t[g]}l[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,i=Object.prototype.toString,j=false,n=true;[0,0].sort(function(){n=false;return 0});var o=function(g,h,k,l){k=k||[];var q=h=h||r;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||
typeof g!=="string")return k;for(var p=[],u,t,y,R,H=true,M=w(h),I=g;(f.exec(""),u=f.exec(I))!==null;){I=u[3];p.push(u[1]);if(u[2]){R=u[3];break}}if(p.length>1&&s.exec(g))if(p.length===2&&m.relative[p[0]])t=fa(p[0]+p[1],h);else for(t=m.relative[p[0]]?[h]:o(p.shift(),h);p.length;){g=p.shift();if(m.relative[g])g+=p.shift();t=fa(g,t)}else{if(!l&&p.length>1&&h.nodeType===9&&!M&&m.match.ID.test(p[0])&&!m.match.ID.test(p[p.length-1])){u=o.find(p.shift(),h,M);h=u.expr?o.filter(u.expr,u.set)[0]:u.set[0]}if(h){u=
l?{expr:p.pop(),set:A(l)}:o.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=u.expr?o.filter(u.expr,u.set):u.set;if(p.length>0)y=A(t);else H=false;for(;p.length;){var D=p.pop();u=D;if(m.relative[D])u=p.pop();else D="";if(u==null)u=h;m.relative[D](y,u,M)}}else y=[]}y||(y=t);y||o.error(D||g);if(i.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))k.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&
y[g].nodeType===1&&k.push(t[g]);else k.push.apply(k,y);else A(y,k);if(R){o(R,q,k,l);o.uniqueSort(k)}return k};o.uniqueSort=function(g){if(C){j=n;g.sort(C);if(j)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};o.matches=function(g,h){return o(g,null,null,h)};o.find=function(g,h,k){var l,q;if(!g)return[];for(var p=0,u=m.order.length;p<u;p++){var t=m.order[p];if(q=m.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");l=m.find[t](q,
h,k);if(l!=null){g=g.replace(m.match[t],"");break}}}}l||(l=h.getElementsByTagName("*"));return{set:l,expr:g}};o.filter=function(g,h,k,l){for(var q=g,p=[],u=h,t,y,R=h&&h[0]&&w(h[0]);g&&h.length;){for(var H in m.filter)if((t=m.leftMatch[H].exec(g))!=null&&t[2]){var M=m.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-1)!=="\\"){if(u===p)p=[];if(m.preFilter[H])if(t=m.preFilter[H](t,u,k,p,l,R)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=u[U])!=null;U++)if(D){I=M(D,t,U,u);var Da=
l^!!I;if(k&&I!=null)if(Da)y=true;else u[U]=false;else if(Da){p.push(D);y=true}}if(I!==v){k||(u=p);g=g.replace(m.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)o.error(g);else break;q=g}return u};o.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var m=o.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},relative:{"+":function(g,h){var k=typeof h==="string",l=k&&!/\W/.test(h);k=k&&!l;if(l)h=h.toLowerCase();l=0;for(var q=g.length,
p;l<q;l++)if(p=g[l]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[l]=k||p&&p.nodeName.toLowerCase()===h?p||false:p===h}k&&o.filter(h,g,true)},">":function(g,h){var k=typeof h==="string";if(k&&!/\W/.test(h)){h=h.toLowerCase();for(var l=0,q=g.length;l<q;l++){var p=g[l];if(p){k=p.parentNode;g[l]=k.nodeName.toLowerCase()===h?k:false}}}else{l=0;for(q=g.length;l<q;l++)if(p=g[l])g[l]=k?p.parentNode:p.parentNode===h;k&&o.filter(h,g,true)}},"":function(g,h,k){var l=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=
h=h.toLowerCase();q=b}q("parentNode",h,l,g,p,k)},"~":function(g,h,k){var l=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,l,g,p,k)}},find:{ID:function(g,h,k){if(typeof h.getElementById!=="undefined"&&!k)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var k=[];h=h.getElementsByName(g[1]);for(var l=0,q=h.length;l<q;l++)h[l].getAttribute("name")===g[1]&&k.push(h[l]);return k.length===0?null:k}},
TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,k,l,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var u;(u=h[p])!=null;p++)if(u)if(q^(u.className&&(" "+u.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))k||l.push(u);else if(k)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&
"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,k,l,q,p){h=g[1].replace(/\\/g,"");if(!p&&m.attrMap[h])g[1]=m.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,k,l,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=o(g[3],null,null,h);else{g=o.filter(g[3],h,k,true^q);k||l.push.apply(l,g);return false}else if(m.match.POS.test(g[0])||m.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);
return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,k){return!!o(k[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===
g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},setFilters:{first:function(g,h){return h===0},last:function(g,h,k,l){return h===l.length-1},even:function(g,h){return h%2===
0},odd:function(g,h){return h%2===1},lt:function(g,h,k){return h<k[3]-0},gt:function(g,h,k){return h>k[3]-0},nth:function(g,h,k){return k[3]-0===h},eq:function(g,h,k){return k[3]-0===h}},filter:{PSEUDO:function(g,h,k,l){var q=h[1],p=m.filters[q];if(p)return p(g,k,h,l);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=h[3];k=0;for(l=h.length;k<l;k++)if(h[k]===g)return false;return true}else o.error("Syntax error, unrecognized expression: "+
q)},CHILD:function(g,h){var k=h[1],l=g;switch(k){case "only":case "first":for(;l=l.previousSibling;)if(l.nodeType===1)return false;if(k==="first")return true;l=g;case "last":for(;l=l.nextSibling;)if(l.nodeType===1)return false;return true;case "nth":k=h[2];var q=h[3];if(k===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var u=0;for(l=p.firstChild;l;l=l.nextSibling)if(l.nodeType===1)l.nodeIndex=++u;p.sizcache=h}g=g.nodeIndex-q;return k===0?g===0:g%k===0&&g/k>=
0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var k=h[1];g=m.attrHandle[k]?m.attrHandle[k](g):g[k]!=null?g[k]:g.getAttribute(k);k=g+"";var l=h[2];h=h[4];return g==null?l==="!=":l==="="?k===h:l==="*="?k.indexOf(h)>=0:l==="~="?(" "+k+" ").indexOf(h)>=0:!h?k&&g!==false:l==="!="?k!==h:l==="^="?
k.indexOf(h)===0:l==="$="?k.substr(k.length-h.length)===h:l==="|="?k===h||k.substr(0,h.length+1)===h+"-":false},POS:function(g,h,k,l){var q=m.setFilters[h[2]];if(q)return q(g,k,h,l)}}},s=m.match.POS;for(var x in m.match){m.match[x]=new RegExp(m.match[x].source+/(?![^\[]*\])(?![^\(]*\))/.source);m.leftMatch[x]=new RegExp(/(^(?:.|\r|\n)*?)/.source+m.match[x].source.replace(/\\(\d+)/g,function(g,h){return"\\"+(h-0+1)}))}var A=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};
try{Array.prototype.slice.call(r.documentElement.childNodes,0)}catch(B){A=function(g,h){h=h||[];if(i.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var k=0,l=g.length;k<l;k++)h.push(g[k]);else for(k=0;g[k];k++)h.push(g[k]);return h}}var C;if(r.documentElement.compareDocumentPosition)C=function(g,h){if(!g.compareDocumentPosition||!h.compareDocumentPosition){if(g==h)j=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===
h?0:1;if(g===0)j=true;return g};else if("sourceIndex"in r.documentElement)C=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)j=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)j=true;return g};else if(r.createRange)C=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)j=true;return g.ownerDocument?-1:1}var k=g.ownerDocument.createRange(),l=h.ownerDocument.createRange();k.setStart(g,0);k.setEnd(g,0);l.setStart(h,0);l.setEnd(h,0);g=k.compareBoundaryPoints(Range.START_TO_END,
l);if(g===0)j=true;return g};(function(){var g=r.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var k=r.documentElement;k.insertBefore(g,k.firstChild);if(r.getElementById(h)){m.find.ID=function(l,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(l[1]))?q.id===l[1]||typeof q.getAttributeNode!=="undefined"&&q.getAttributeNode("id").nodeValue===l[1]?[q]:v:[]};m.filter.ID=function(l,q){var p=typeof l.getAttributeNode!=="undefined"&&l.getAttributeNode("id");
return l.nodeType===1&&p&&p.nodeValue===q}}k.removeChild(g);k=g=null})();(function(){var g=r.createElement("div");g.appendChild(r.createComment(""));if(g.getElementsByTagName("*").length>0)m.find.TAG=function(h,k){k=k.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var l=0;k[l];l++)k[l].nodeType===1&&h.push(k[l]);k=h}return k};g.innerHTML="<a href='#'></a>";if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")m.attrHandle.href=function(h){return h.getAttribute("href",
2)};g=null})();r.querySelectorAll&&function(){var g=o,h=r.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){o=function(l,q,p,u){q=q||r;if(!u&&q.nodeType===9&&!w(q))try{return A(q.querySelectorAll(l),p)}catch(t){}return g(l,q,p,u)};for(var k in g)o[k]=g[k];h=null}}();(function(){var g=r.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===
0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){m.order.splice(1,0,"CLASS");m.find.CLASS=function(h,k,l){if(typeof k.getElementsByClassName!=="undefined"&&!l)return k.getElementsByClassName(h[1])};g=null}}})();var E=r.compareDocumentPosition?function(g,h){return g.compareDocumentPosition(h)&16}:function(g,h){return g!==h&&(g.contains?g.contains(h):true)},w=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},fa=function(g,h){var k=[],
l="",q;for(h=h.nodeType?[h]:h;q=m.match.PSEUDO.exec(g);){l+=q[0];g=g.replace(m.match.PSEUDO,"")}g=m.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)o(g,h[q],k);return o.filter(l,k)};c.find=o;c.expr=o.selectors;c.expr[":"]=c.expr.filters;c.unique=o.uniqueSort;c.getText=a;c.isXMLDoc=w;c.contains=E})();var bb=/Until$/,cb=/^(?:parents|prevUntil|prevAll)/,db=/,/;Q=Array.prototype.slice;var Ea=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,i){return!!b.call(e,i,e)===d});else if(b.nodeType)return c.grep(a,
function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Qa.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;c.find(a,this[f],b);if(f>0)for(var i=d;i<b.length;i++)for(var j=0;j<d;j++)if(b[j]===b[i]){b.splice(i--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=
0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ea(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ea(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,i={},j;if(f&&a.length){e=0;for(var n=a.length;e<n;e++){j=a[e];i[j]||(i[j]=c.expr.match.POS.test(j)?c(j,b||this.context):j)}for(;f&&f.ownerDocument&&f!==b;){for(j in i){e=i[j];if(e.jquery?e.index(f)>
-1:c(f).is(e)){d.push({selector:j,elem:f});delete i[j]}}f=f.parentNode}}return d}var o=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(m,s){for(;s&&s.ownerDocument&&s!==b;){if(o?o.index(s)>-1:c(s).is(a))return s;s=s.parentNode}return null})},index:function(a){if(!a||typeof a==="string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),
a);return this.pushStack(pa(a[0])||pa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},
nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);bb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):
e;if((this.length>1||db.test(f))&&cb.test(a))e=e.reverse();return this.pushStack(e,a,Q.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===v||a.nodeType!==1||!c(a).is(d));){a.nodeType===1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==
b&&d.push(a);return d}});var Fa=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ga=/(<([\w:]+)[^>]*?)\/>/g,eb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,Ha=/<([\w:]+)/,fb=/<tbody/i,gb=/<|&\w+;/,sa=/checked\s*(?:[^=]|=\s*.checked.)/i,Ia=function(a,b,d){return eb.test(d)?a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],
col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==v)return this.empty().append((this[0]&&this[0].ownerDocument||r).createTextNode(a));return c.getText(this)},
wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?
d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,
false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&
!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Fa,"").replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){qa(this,b);qa(this.find("*"),b.find("*"))}return b},html:function(a){if(a===v)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Fa,""):null;else if(typeof a==="string"&&!/<script/i.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(Ha.exec(a)||
["",""])[1].toLowerCase()]){a=a.replace(Ga,Ia);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var i=c(this),j=i.html();i.empty().append(function(){return a.call(this,e,j)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,
b,f))});else a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(s){return c.nodeName(s,"table")?s.getElementsByTagName("tbody")[0]||s.appendChild(s.ownerDocument.createElement("tbody")):s}var e,i,j=a[0],n=[];if(!c.support.checkClone&&arguments.length===3&&typeof j===
"string"&&sa.test(j))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(j))return this.each(function(s){var x=c(this);a[0]=j.call(this,s,b?x.html():v);x.domManip(a,b,d)});if(this[0]){e=a[0]&&a[0].parentNode&&a[0].parentNode.nodeType===11?{fragment:a[0].parentNode}:ra(a,this,n);if(i=e.fragment.firstChild){b=b&&c.nodeName(i,"tr");for(var o=0,m=this.length;o<m;o++)d.call(b?f(this[o],i):this[o],e.cacheable||this.length>1||o>0?e.fragment.cloneNode(true):e.fragment)}n&&c.each(n,
Ma)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);for(var e=0,i=d.length;e<i;e++){var j=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),j);f=f.concat(j)}return this.pushStack(f,a,d.selector)}});c.each({remove:function(a,b){if(!a||c.filter(a,[this]).length){if(!b&&this.nodeType===1){c.cleanData(this.getElementsByTagName("*"));c.cleanData([this])}this.parentNode&&
this.parentNode.removeChild(this)}},empty:function(){for(this.nodeType===1&&c.cleanData(this.getElementsByTagName("*"));this.firstChild;)this.removeChild(this.firstChild)}},function(a,b){c.fn[a]=function(){return this.each(b,arguments)}});c.extend({clean:function(a,b,d,f){b=b||r;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||r;var e=[];c.each(a,function(i,j){if(typeof j==="number")j+="";if(j){if(typeof j==="string"&&!gb.test(j))j=b.createTextNode(j);else if(typeof j===
"string"){j=j.replace(Ga,Ia);var n=(Ha.exec(j)||["",""])[1].toLowerCase(),o=F[n]||F._default,m=o[0];i=b.createElement("div");for(i.innerHTML=o[1]+j+o[2];m--;)i=i.lastChild;if(!c.support.tbody){m=fb.test(j);n=n==="table"&&!m?i.firstChild&&i.firstChild.childNodes:o[1]==="<table>"&&!m?i.childNodes:[];for(o=n.length-1;o>=0;--o)c.nodeName(n[o],"tbody")&&!n[o].childNodes.length&&n[o].parentNode.removeChild(n[o])}!c.support.leadingWhitespace&&V.test(j)&&i.insertBefore(b.createTextNode(V.exec(j)[0]),i.firstChild);
j=c.makeArray(i.childNodes)}if(j.nodeType)e.push(j);else e=c.merge(e,j)}});if(d)for(a=0;e[a];a++)if(f&&c.nodeName(e[a],"script")&&(!e[a].type||e[a].type.toLowerCase()==="text/javascript"))f.push(e[a].parentNode?e[a].parentNode.removeChild(e[a]):e[a]);else{e[a].nodeType===1&&e.splice.apply(e,[a+1,0].concat(c.makeArray(e[a].getElementsByTagName("script"))));d.appendChild(e[a])}return e},cleanData:function(a){for(var b=0,d;(d=a[b])!=null;b++){c.event.remove(d);c.removeData(d)}}});var hb=/z-?index|font-?weight|opacity|zoom|line-?height/i,
Ja=/alpha\([^)]*\)/,Ka=/opacity=([^)]*)/,ga=/float/i,ha=/-([a-z])/ig,ib=/([A-Z])/g,jb=/^-?\d+(?:px)?$/i,kb=/^-?\d/,lb={position:"absolute",visibility:"hidden",display:"block"},mb=["Left","Right"],nb=["Top","Bottom"],ob=r.defaultView&&r.defaultView.getComputedStyle,La=c.support.cssFloat?"cssFloat":"styleFloat",ia=function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===v)return c.curCSS(d,f);if(typeof e==="number"&&!hb.test(f))e+="px";c.style(d,f,e)})};
c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return v;if((b==="width"||b==="height")&&parseFloat(d)<0)d=v;var f=a.style||a,e=d!==v;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=Ja.test(a)?a.replace(Ja,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Ka.exec(f.filter)[1])/100+"":""}if(ga.test(b))b=La;b=b.replace(ha,ia);if(e)f[b]=d;return f[b]},css:function(a,
b,d,f){if(b==="width"||b==="height"){var e,i=b==="width"?mb:nb;function j(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(i,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,"border"+this+"Width",true))||0})}a.offsetWidth!==0?j():c.swap(a,lb,j);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&
a.currentStyle){f=Ka.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ga.test(b))b=La;if(!d&&e&&e[b])f=e[b];else if(ob){if(ga.test(b))b="float";b=b.replace(ib,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ha,ia);f=a.currentStyle[b]||a.currentStyle[d];if(!jb.test(f)&&kb.test(f)){b=e.left;var i=a.runtimeStyle.left;a.runtimeStyle.left=
a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=i}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var pb=
J(),qb=/<script(.|\s)*?\/script>/gi,rb=/select|textarea/i,sb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ja=/\?/,tb=/(\?|&)_=.*?(&|$)/,ub=/^(\w+:)?\/\/([^\/?#]+)/,vb=/%20/g;c.fn.extend({_load:c.fn.load,load:function(a,b,d){if(typeof a!=="string")return this._load(a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=
c.param(b,c.ajaxSettings.traditional);f="POST"}var i=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(j,n){if(n==="success"||n==="notmodified")i.html(e?c("<div />").append(j.responseText.replace(qb,"")).find(e):j.responseText);d&&i.each(d,[j.responseText,n,j])}});return this},serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&
(this.checked||rb.test(this.nodeName)||sb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,
b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:z.XMLHttpRequest&&(z.location.protocol!=="file:"||!z.ActiveXObject)?function(){return new z.XMLHttpRequest}:
function(){try{return new z.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&e.success.call(o,n,j,w);e.global&&f("ajaxSuccess",[w,e])}function d(){e.complete&&e.complete.call(o,w,j);e.global&&f("ajaxComplete",[w,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}
function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),i,j,n,o=a&&a.context||e,m=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(m==="GET")N.test(e.url)||(e.url+=(ja.test(e.url)?"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||
N.test(e.url))){i=e.jsonpCallback||"jsonp"+pb++;if(e.data)e.data=(e.data+"").replace(N,"="+i+"$1");e.url=e.url.replace(N,"="+i+"$1");e.dataType="script";z[i]=z[i]||function(q){n=q;b();d();z[i]=v;try{delete z[i]}catch(p){}A&&A.removeChild(B)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===false&&m==="GET"){var s=J(),x=e.url.replace(tb,"$1_="+s+"$2");e.url=x+(x===e.url?(ja.test(e.url)?"&":"?")+"_="+s:"")}if(e.data&&m==="GET")e.url+=(ja.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&
c.event.trigger("ajaxStart");s=(s=ub.exec(e.url))&&(s[1]&&s[1]!==location.protocol||s[2]!==location.host);if(e.dataType==="script"&&m==="GET"&&s){var A=r.getElementsByTagName("head")[0]||r.documentElement,B=r.createElement("script");B.src=e.url;if(e.scriptCharset)B.charset=e.scriptCharset;if(!i){var C=false;B.onload=B.onreadystatechange=function(){if(!C&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){C=true;b();d();B.onload=B.onreadystatechange=null;A&&B.parentNode&&
A.removeChild(B)}}}A.insertBefore(B,A.firstChild);return v}var E=false,w=e.xhr();if(w){e.username?w.open(m,e.url,e.async,e.username,e.password):w.open(m,e.url,e.async);try{if(e.data||a&&a.contentType)w.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&w.setRequestHeader("If-Modified-Since",c.lastModified[e.url]);c.etag[e.url]&&w.setRequestHeader("If-None-Match",c.etag[e.url])}s||w.setRequestHeader("X-Requested-With","XMLHttpRequest");w.setRequestHeader("Accept",
e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(fa){}if(e.beforeSend&&e.beforeSend.call(o,w,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");w.abort();return false}e.global&&f("ajaxSend",[w,e]);var g=w.onreadystatechange=function(q){if(!w||w.readyState===0||q==="abort"){E||d();E=true;if(w)w.onreadystatechange=c.noop}else if(!E&&w&&(w.readyState===4||q==="timeout")){E=true;w.onreadystatechange=c.noop;j=q==="timeout"?"timeout":!c.httpSuccess(w)?
"error":e.ifModified&&c.httpNotModified(w,e.url)?"notmodified":"success";var p;if(j==="success")try{n=c.httpData(w,e.dataType,e)}catch(u){j="parsererror";p=u}if(j==="success"||j==="notmodified")i||b();else c.handleError(e,w,j,p);d();q==="timeout"&&w.abort();if(e.async)w=null}};try{var h=w.abort;w.abort=function(){w&&h.call(w);g("abort")}}catch(k){}e.async&&e.timeout>0&&setTimeout(function(){w&&!E&&g("timeout")},e.timeout);try{w.send(m==="POST"||m==="PUT"||m==="DELETE"?e.data:null)}catch(l){c.handleError(e,
w,null,l);d()}e.async||g();return w}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=
f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b==="json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(j,n){if(c.isArray(n))c.each(n,
function(o,m){b?f(j,m):d(j+"["+(typeof m==="object"||c.isArray(m)?o:"")+"]",m)});else!b&&n!=null&&typeof n==="object"?c.each(n,function(o,m){d(j+"["+o+"]",m)}):f(j,n)}function f(j,n){n=c.isFunction(n)?n():n;e[e.length]=encodeURIComponent(j)+"="+encodeURIComponent(n)}var e=[];if(b===v)b=c.ajaxSettings.traditional;if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var i in a)d(i,a[i]);return e.join("&").replace(vb,"+")}});var ka={},wb=/toggle|show|hide/,xb=/^([+-]=)?([\d+-.]+)(.*)$/,
W,ta=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(ka[d])f=ka[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();
ka[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&
c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var i=c.extend({},e),j,n=this.nodeType===1&&c(this).is(":hidden"),
o=this;for(j in a){var m=j.replace(ha,ia);if(j!==m){a[m]=a[j];delete a[j];j=m}if(a[j]==="hide"&&n||a[j]==="show"&&!n)return i.complete.call(this);if((j==="height"||j==="width")&&this.style){i.display=c.css(this,"display");i.overflow=this.style.overflow}if(c.isArray(a[j])){(i.specialEasing=i.specialEasing||{})[j]=a[j][1];a[j]=a[j][0]}}if(i.overflow!=null)this.style.overflow="hidden";i.curAnim=c.extend({},a);c.each(a,function(s,x){var A=new c.fx(o,i,s);if(wb.test(x))A[x==="toggle"?n?"show":"hide":x](a);
else{var B=xb.exec(x),C=A.cur(true)||0;if(B){x=parseFloat(B[2]);var E=B[3]||"px";if(E!=="px"){o.style[s]=(x||1)+E;C=(x||1)/A.cur(true)*C;o.style[s]=C+E}if(B[1])x=(B[1]==="-="?-1:1)*x+C;A.custom(C,x,E)}else A.custom(C,x,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",
1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration==="number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,
b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==
null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(i){return e.step(i)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop===
"width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=
this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=
c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=
null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in r.documentElement?function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),
f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=this[0];if(a)return this.each(function(s){c.offset.setOffset(this,a,s)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=
b,e=b.ownerDocument,i,j=e.documentElement,n=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var o=b.offsetTop,m=b.offsetLeft;(b=b.parentNode)&&b!==n&&b!==j;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;i=e?e.getComputedStyle(b,null):b.currentStyle;o-=b.scrollTop;m-=b.scrollLeft;if(b===d){o+=b.offsetTop;m+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){o+=parseFloat(i.borderTopWidth)||
0;m+=parseFloat(i.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&i.overflow!=="visible"){o+=parseFloat(i.borderTopWidth)||0;m+=parseFloat(i.borderLeftWidth)||0}f=i}if(f.position==="relative"||f.position==="static"){o+=n.offsetTop;m+=n.offsetLeft}if(c.offset.supportsFixedPosition&&f.position==="fixed"){o+=Math.max(j.scrollTop,n.scrollTop);m+=Math.max(j.scrollLeft,n.scrollLeft)}return{top:o,left:m}};c.offset={initialize:function(){var a=r.body,b=r.createElement("div"),
d,f,e,i=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";a.insertBefore(b,a.firstChild);
d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i;a.removeChild(b);c.offset.initialize=c.noop},
bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),i=parseInt(c.curCSS(a,"top",true),10)||0,j=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,d,e);d={top:b.top-e.top+i,left:b.left-
e.left+j};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=
this.offsetParent||r.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],i;if(!e)return null;if(f!==v)return this.each(function(){if(i=ua(this))i.scrollTo(!a?f:c(i).scrollLeft(),a?f:c(i).scrollTop());else this[d]=f});else return(i=ua(e))?"pageXOffset"in i?i[a?"pageYOffset":"pageXOffset"]:c.support.boxModel&&i.document.documentElement[d]||i.document.body[d]:e[d]}});
c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(i){var j=c(this);j[d](f.call(this,i,j[d]()))});return"scrollTo"in e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||
e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===v?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});z.jQuery=z.$=c})(window);

;jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};
;(function(){var STARTPOINT=256;if(window.saw===undefined){window.saw={};}
function getDic(){var result={};for(var i=0;i<STARTPOINT;i++){var ch=String.fromCharCode(i);result[ch]=i;};return result;}
function tTable(){var result={};for(var i=0;i<STARTPOINT;i++){var ch=String.fromCharCode(i);result[i]=ch;};return result;}
var LZW={encode:function(str){var index=STARTPOINT,dictionary=getDic(),outStr=[],s='';var len=str.length,s=str[0];for(var i=1;i<len;i++){var c=str[i];if(dictionary[s+c]){s=s+c;}else{var code=++index;outStr.push(String.fromCharCode(dictionary[s]));dictionary[s+c]=code;s=c;}}
for(var c in s){outStr.push(s[c]);}
return outStr.join('');},decode:function(str){debugger;var table=tTable(),buffer='',outStr=[],first_code=str[0].charCodeAt(0),len=str.length,counter=STARTPOINT-1,character='';var decodearr=[];for(var i=0;i<len;i++){var next_code=str[i].charCodeAt(0);if(!table[next_code]){buffer=table[first_code];buffer=buffer+character;}else{buffer=table[next_code];}
outStr.push(buffer);character=buffer[0];table[++counter]=table[first_code]+
character;first_code=next_code;};return outStr.join('');},strSize:function(str){return encodeURIComponent(str).replace(/%../g,'x').length;}};window.saw.lzw=LZW;}());
;if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());
;var base64alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function Base64Reader(base64)
{this.position=0;this.base64=base64;this.bits=0;this.bitsLength=0;this.readByte=function(){if(this.bitsLength==0)
{var tailBits=0;while(this.position<this.base64.length&&this.bitsLength<24)
{var ch=this.base64.charAt(this.position);++this.position;if(ch>" ")
{var index=base64alphabet.indexOf(ch);if(index<0)throw"Invalid character in Base64Reader";if(index<64)
{if(tailBits>0)throw"Invalid encoding (padding)";this.bits=(this.bits<<6)|index;}
else
{if(this.bitsLenght<8)throw"Invalid encoding (extra)";this.bits<<=6;tailBits+=6;}
this.bitsLength+=6;}}
if(this.position>=this.base64.length)
{if(this.bitsLength==0)
return-1;else if(this.bitsLength<24)
throw"Invalid encoding (end)";}
if(tailBits==6)
tailBits=8;else if(tailBits==12)
tailBits=16;this.bits=this.bits>>tailBits;this.bitsLength-=tailBits;}
this.bitsLength-=8
var code=(this.bits>>this.bitsLength)&0xFF;return code;};}
function DeflateException(message){this.message=message;}
function BitReader(reader)
{this.bitsLength=0;this.bits=0;this.reader=reader;this.readBit=function(){if(this.bitsLength==0){var nextByte=this.reader.readByte();if(nextByte<0)
throw new DeflateException("Unexpected end of stream");this.bits=nextByte;this.bitsLength=8;}
var bit=(this.bits&1)!=0;this.bits>>=1;--this.bitsLength;return bit;};this.align=function(){this.bitsLength=0;}
this.readLSB=function(length){var data=0;for(var i=0;i<length;++i)
{if(this.readBit())data|=1<<i;}
return data;};this.readMSB=function(length){var data=0;for(var i=0;i<length;++i)
{if(this.readBit())data=(data<<1)|1;else data<<=1;}
return data;};}
function TextReader(translator){this.translator=translator;this.unreads=new Array(0);this.readChar=function(){if(this.unreads.length>0)
return this.unreads.pop();else{try{var c=translator.readChar();}catch(e){if(e instanceof DeflateException){console.warn("Reading deflate stream failed");c=null;}else{throw e;}}
return c;}};this.unreadChar=function(ch){this.unreads.push(ch);};this.readToEnd=function(){var slarge="";var s="";var ch=this.readChar();while(ch!=null)
{s+=ch;if(s.length>1000)
{slarge+=s;s="";}
ch=this.readChar();}
return slarge+s;};this.readLine=function(){var s="";var ch=this.readChar();if(ch==null)return null;while(ch!="\r"&&ch!="\n")
{s+=ch;ch=this.readChar();if(ch==null)return s;}
if(ch=="\r")
{ch=this.readChar();if(ch!=null&&ch!="\n")
this.unreadChar(ch);}
return s;};}
function DefaultTranslator(reader){this.reader=reader;this.readChar=function(){var code=reader.readByte();return code<0?null:String.fromCharCode(code);};}
function UnicodeTranslator(reader){this.reader=reader;this.bomState=0;this.readChar=function(){var b1=reader.readByte();if(b1<0)return null;var b2=reader.readByte();if(b2<0)throw"Incomplete unicode character";if(this.bomState==0&&b1+b2==509)
{this.bomState=b2==254?1:2;b1=reader.readByte();if(b1<0)return null;b2=reader.readByte();if(b2<0)throw"Incomplete unicode character";}
else
this.bomState=1;var code=this.bomState==1?(b2<<8|b1):(b1<<8|b2);return String.fromCharCode(code);};}
function Utf8Translator(reader){this.reader=reader;this.waitBom=true;this.pendingChar=null;this.readChar=function(){var ch=null;do
{if(this.pendingChar!=null)
{ch=this.pendingChar;this.pendingChar=null;}
else
{var b1=this.reader.readByte();if(b1<0)return null;if((b1&0x80)==0)
{ch=String.fromCharCode(b1);}
else
{var currentPrefix=0xC0;var validBits=5;do
{var mask=currentPrefix>>1|0x80;if((b1&mask)==currentPrefix)break;currentPrefix=currentPrefix>>1|0x80;--validBits;}while(validBits>=0);if(validBits>0)
{var code=(b1&((1<<validBits)-1));for(var i=5;i>=validBits;--i)
{var bi=this.reader.readByte();if((bi&0xC0)!=0x80)throw"Invalid sequence character";code=(code<<6)|(bi&0x3F);}
if(code<=0xFFFF)
{if(code==0xFEFF&&this.waitBom)
ch=null;else
ch=String.fromCharCode(code);}
else
{var v=code-0x10000;var w1=0xD800|((v>>10)&0x3FF);var w2=0xDC00|(v&0x3FF);this.pendingChar=String.fromCharCode(w2);ch=String.fromCharCode(w1);}}
else
throw"Invalid character in UTF8 translator";}}
this.waitBom=false;}while(ch==null);return ch;};}
var staticCodes,staticDistances;var encodedLengthStart=new Array(3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258);var encodedLengthAdditionalBits=new Array(0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0);var encodedDistanceStart=new Array(1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577);var encodedDistanceAdditionalBits=new Array(0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13);var clenMap=new Array(16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15);function buildCodes(lengths)
{var codes=new Array(lengths.length);var maxBits=lengths[0];for(var i=1;i<lengths.length;i++)
{if(maxBits<lengths[i])maxBits=lengths[i];}
var bitLengthsCount=new Array(maxBits+1);for(var i=0;i<=maxBits;i++)bitLengthsCount[i]=0;for(var i=0;i<lengths.length;i++)
{++bitLengthsCount[lengths[i]];}
var nextCode=new Array(maxBits+1);var code=0;bitLengthsCount[0]=0;for(var bits=1;bits<=maxBits;bits++)
{code=(code+bitLengthsCount[bits-1])<<1;nextCode[bits]=code;}
for(var n=0;n<codes.length;n++)
{var len=lengths[n];if(len!=0)
{codes[n]=nextCode[len];nextCode[len]++;}}
return codes;}
function initializeStaticTrees()
{var codes=new Array(288);var codesLengths=new Array(288);for(var i=0;i<=143;i++)
{codes[i]=0x0030+i;codesLengths[i]=8;}
for(var i=144;i<=255;i++)
{codes[i]=0x0190+i-144;codesLengths[i]=9;}
for(var i=256;i<=279;i++)
{codes[i]=0x0000+i-256;codesLengths[i]=7;}
for(var i=280;i<=287;i++)
{codes[i]=0x00C0+i-280;codesLengths[i]=8;}
staticCodes=buildTree(codes,codesLengths);var distances=new Array(32);var distancesLengths=new Array(32);for(var i=0;i<=31;i++)
{distances[i]=i;distancesLengths[i]=5;}
staticDistances=buildTree(distances,distancesLengths);}
function buildTree(codes,lengths)
{var nonEmptyCodes=new Array(0);for(var i=0;i<codes.length;++i)
{if(lengths[i]>0)
{var code=new Object();code.bits=codes[i];code.length=lengths[i];code.index=i;nonEmptyCodes.push(code);}}
return buildTreeBranch(nonEmptyCodes,0,0);}
function buildTreeBranch(codes,prefix,prefixLength)
{if(codes.length==0)return null;var zeros=new Array(0);var ones=new Array(0);var branch=new Object();branch.isLeaf=false;for(var i=0;i<codes.length;++i)
{if(codes[i].length==prefixLength&&codes[i].bits==prefix)
{branch.isLeaf=true;branch.index=codes[i].index;break;}
else
{var nextBit=((codes[i].bits>>(codes[i].length-prefixLength-1))&1)>0;if(nextBit)
{ones.push(codes[i]);}
else
{zeros.push(codes[i]);}}}
if(!branch.isLeaf)
{branch.zero=buildTreeBranch(zeros,(prefix<<1),prefixLength+1);branch.one=buildTreeBranch(ones,(prefix<<1)|1,prefixLength+1);}
return branch;}
function readDynamicTrees(bitReader)
{var hlit=bitReader.readLSB(5)+257;var hdist=bitReader.readLSB(5)+1;var hclen=bitReader.readLSB(4)+4;var clen=new Array(19);for(var i=0;i<clen.length;++i)clen[i]=0;for(var i=0;i<hclen;++i)clen[clenMap[i]]=bitReader.readLSB(3);var clenCodes=buildCodes(clen);var clenTree=buildTree(clenCodes,clen);var lengthsSequence=new Array(0);while(lengthsSequence.length<hlit+hdist)
{var p=clenTree;while(!p.isLeaf)
{p=bitReader.readBit()?p.one:p.zero;}
var code=p.index;if(code<=15)
lengthsSequence.push(code);else if(code==16)
{var repeat=bitReader.readLSB(2)+3;for(var q=0;q<repeat;++q)
lengthsSequence.push(lengthsSequence[lengthsSequence.length-1]);}
else if(code==17)
{var repeat=bitReader.readLSB(3)+3;for(var q=0;q<repeat;++q)
lengthsSequence.push(0);}
else if(code==18)
{var repeat=bitReader.readLSB(7)+11;for(var q=0;q<repeat;++q)
lengthsSequence.push(0);}}
var codesLengths=lengthsSequence.slice(0,hlit);var codes=buildCodes(codesLengths);var distancesLengths=lengthsSequence.slice(hlit,hlit+hdist);var distances=buildCodes(distancesLengths);var result=new Object();result.codesTree=buildTree(codes,codesLengths);result.distancesTree=buildTree(distances,distancesLengths);return result;}
function Inflator(reader)
{this.reader=reader;this.bitReader=new BitReader(reader);this.buffer=new Array(0);this.bufferPosition=0;this.state=0;this.blockFinal=false;this.readByte=function(){while(this.bufferPosition>=this.buffer.length)
{var item=this.decodeItem();if(item==null)return-1;switch(item.itemType)
{case 0:this.buffer=this.buffer.concat(item.array);break;case 2:this.buffer.push(item.symbol);break;case 3:var j=this.buffer.length-item.distance;for(var i=0;i<item.length;i++)
{this.buffer.push(this.buffer[j++]);}
break;}}
var symbol=this.buffer[this.bufferPosition++];if(this.bufferPosition>0xC000)
{var shift=this.buffer.length-0x8000;if(shift>this.bufferPosition)shift=this.bufferPosition;this.buffer.splice(0,shift);this.bufferPosition-=shift;}
return symbol;}
this.decodeItem=function(){if(this.state==2)return null;var item;if(this.state==0)
{this.blockFinal=this.bitReader.readBit();var blockType=this.bitReader.readLSB(2);switch(blockType)
{case 0:this.bitReader.align();var len=this.bitReader.readLSB(16);var nlen=this.bitReader.readLSB(16);if((len&~nlen)!=len)throw"Invalid block type 0 length";item=new Object();item.itemType=0;item.array=new Array(len);for(var i=0;i<len;++i)
{var nextByte=this.reader.readByte();if(nextByte<0)throw"Uncomplete block";item.array[i]=nextByte;}
if(this.blockFinal)this.state=2;return item;case 1:this.codesTree=staticCodes;this.distancesTree=staticDistances;this.state=1;break;case 2:var dynamicTrees=readDynamicTrees(this.bitReader);this.codesTree=dynamicTrees.codesTree;this.distancesTree=dynamicTrees.distancesTree;this.state=1;break;default:throw new"Invalid block type (3)";}}
item=new Object();var p=this.codesTree;while(!p.isLeaf)
{p=this.bitReader.readBit()?p.one:p.zero;}
if(p.index<256)
{item.itemType=2;item.symbol=p.index;}
else if(p.index>256)
{var lengthCode=p.index;if(lengthCode>285)throw new"Invalid length code";var length=encodedLengthStart[lengthCode-257];if(encodedLengthAdditionalBits[lengthCode-257]>0)
{length+=this.bitReader.readLSB(encodedLengthAdditionalBits[lengthCode-257]);}
p=this.distancesTree;while(!p.isLeaf)
{p=this.bitReader.readBit()?p.one:p.zero;}
var distanceCode=p.index;var distance=encodedDistanceStart[distanceCode];if(encodedDistanceAdditionalBits[distanceCode]>0)
{distance+=this.bitReader.readLSB(encodedDistanceAdditionalBits[distanceCode]);}
item.itemType=3;item.distance=distance;item.length=length;}
else
{item.itemType=1;this.state=this.blockFinal?2:0;}
return item;};}
initializeStaticTrees();
;function extend(subClass,baseClass){function inheritance(){}
inheritance.prototype=baseClass.prototype;subClass.prototype=new inheritance();subClass.prototype.constructor=subClass;subClass.baseConstructor=baseClass;subClass.superClass=baseClass.prototype;}
function getBytes(s){var length=s.length;var ret=[];for(var i=0;i<length;i++)
ret.push(s.charCodeAt(i)&0xFF);return ret;}
function isDigit(c)
{if(c>='0'&&c<='9')
return true;return false;}
function intToSignedByte(i){if(i>127)
return i-256;else
return i;}
function toSignedByte(c){var bite=c.charCodeAt(0);if(bite>127)
return bite-256;else
return bite;}
String.prototype.repeat=function(num)
{return new Array(num+1).join(this);}
;function UnimplementedException(message){this.message="UnimplementedException: "+message;console.error(this.message);this.toString=function(){return this.message;}}
function ParseException(message){this.message="ParseException: "+message;console.error(this.message);this.toString=function(){return this.message;}}
function Exception(message){this.message="Exception: "+message;console.error(this.message);this.toString=function(){return this.message;}}
;function GeneralPath(){this.at=new AffineTransform();this.commands=[['transform',[this.at.m00,this.at.m10,this.at.m01,this.at.m11,this.at.m02,this.at.m12]]];}
GeneralPath.prototype.moveTo=function(x,y){this.commands.push(['moveTo',[x,y]]);}
GeneralPath.prototype.quadTo=function(x1,y1,x2,y2){this.commands.push(['quadraticCurveTo',[x1,y1,x2,y2]]);}
GeneralPath.prototype.curveTo=function(cp1x,cp1y,cp2x,cp2y,x,y){this.commands.push(['bezierCurveTo',[cp1x,cp1y,cp2x,cp2y,x,y]]);}
GeneralPath.prototype.lineTo=function(x,y){this.commands.push(['lineTo',[x,y]]);}
GeneralPath.prototype.closePath=function(){this.commands.push(['closePath',[]]);}
GeneralPath.prototype.transform=function(matrix){this.at=this.at.multiply(matrix);this.commands[0]=['transform',[this.at.m00,this.at.m10,this.at.m01,this.at.m11,this.at.m02,this.at.m12]];}
GeneralPath.prototype.append=function(path){for(var i=1;i<path.commands.length;i++){this.commands.push(path.commands[i]);}}
;function AsyncFileReader(url,context,callback,progress){this.url=url;this.callback=callback;this.progress=progress;this.context=context;}
AsyncFileReader.prototype.start=function(){var that=this;if(this.url instanceof File){var reader=new FileReader();reader.onload=function(e){fileContents=e.target.result;fileSize=fileContents.length;that.callback.apply(that.context,[fileSize,fileContents]);};reader.readAsBinaryString(this.url);}else{var req=new XMLHttpRequest();req.addEventListener("progress",function(e){that.progress.apply(that.context,[e]);},false);req.addEventListener("load",function(){if(req.status!=200)throw new Exception("File load failed");fileContents=req.responseText;fileSize=fileContents.length;that.callback.apply(that.context,[fileSize,fileContents]);},false);req.open('GET',this.url,true);req.overrideMimeType('text/plain; charset=x-user-defined');req.send(null);}}
;function Rectangle2D(x,y,w,h){this.x=x;this.y=y;this.width=w;this.height=h;}
Rectangle2D.prototype={getX:function(){return this.x;},getY:function(){return this.y},getWidth:function(){return this.width;},getHeight:function(){return this.height;},getMinX:function(){return this.x;},getMinY:function(){return this.y;},isEmpty:function(){if(this.width==0||this.height==0)
return true;return false;}};
;function COSDocument(){this.version;this.parser;this._objectPool={};this._xrefTable={};this._trailer=null;}
COSDocument.prototype={getObjectFromPool:function(key){var hash=key.getKey();var object=this._objectPool[hash];if(object==null){object=new COSObject(null,key,this);this._objectPool[hash]=object;}
return object;},setXRef:function(key,offset){if(typeof offset=="string"){while(offset.charAt(0)=='0'){if(offset.length==1){break};if(offset.charAt(1)=='.'){break};offset=offset.substr(1,offset.length-1)}
offset=parseInt(offset);}
this._xrefTable[key.getKey()]=offset;},getTrailer:function(){return this._trailer;},setTrailer:function(trailer){this._trailer=trailer;},loadObject:function(key){var pos=this._xrefTable[key.getKey()];if(pos instanceof COSObjectStreamLocation){var obj=this.getObjectFromPool(pos.streamObjectKey);var parser=new PDFObjectStreamParser(obj.getObject(),this);parser.parse();var compressedObjects=parser.streamObjects;var coLength=compressedObjects.length;for(var j=0;j<coLength;j++){var next=compressedObjects[j];var key=next.getKey();var obj=this.getObjectFromPool(key);obj.setObject(next.getObject());}}else{var oldPos=this.parser.stream.getPosition();this.parser.stream.setPosition(pos);var newObject=this.parser.parseObject();this.parser.stream.setPosition(oldPos);}},toString:function(){return"COSDocument";var retval="";for(property in this._objectPool)
retval+=this._objectPool[property].toString()+"\n";return retval;}}
;function COSArray(){this._objects=[];}
COSArray.prototype={add:function(object){this._objects.push(object);},remove:function(){return this._objects.pop();},get:function(index){return this._objects[index];},size:function(){return this._objects.length;},getObject:function(index){var obj=this._objects[index];if(obj instanceof COSObject){obj=obj.getObject();}
return obj;},getArray:function(){var size=this.size();var ret=new Array(size);for(var i=0;i<size;i++){ret[i]=this.getObject(i);}
return ret;},toString:function(depth){return"COSArray";depth=depth||0;if(depth>10)return"\t".repeat(depth)+"...";var retVal="\t".repeat(depth)+"COSArray: [\n";for(var i=0;i<this._objects.length;i++){retVal+=this._objects[i].toString(depth+1)+"\n";}
return retVal+"\t".repeat(depth)+"]";}}
;function COSDictionary(items){if(typeof items!='undefined')
this._items=items;else
this._items={};}
COSDictionary.prototype={setItem:function(key,value){this._items[key.name]=value;},getItem:function(key){return this._items[key];},getDictionaryObject:function(key){var retval=this._items[key];if(typeof(retval)=='undefined')
return null;if(retval instanceof COSObject)
{return retval.getObject();}
return retval;},getDictionaryObjectTwoKey:function(firstKey,secondKey){var retval=this.getDictionaryObject(firstKey);if(retval==null){retval=this.getDictionaryObject(secondKey);}
return retval;},addAll:function(dic){var dicKeys=dic.keyList();var dicLength=dicKeys.length;for(var i=0;i<dicLength;i++){var key=dicKeys[i];var value=dic.getItem(key);if(key!="Size"||this._items["Size"]==null)
{this.setItem({"name":key},value);}}},putAll:function(dic){var dicKeys=dic.keyList();var dicLength=dicKeys.length;for(var i=0;i<dicLength;i++){var key=dicKeys[i];var value=dic.getItem(key);this.setItem({"name":key},value);}},keyList:function(){var ret=[];for(property in this._items){ret.push(property);}
return ret;},toString:function(depth){return"COSDictionary";depth=depth||0;if(depth>2)return"\t".repeat(depth)+"...";var retval="\t".repeat(depth)+"COSDictionary: \n";for(property in this._items)
retval+="\t".repeat(depth)+"'"+property+"' => "+this._items[property].toString(depth+1).replace(/^\s+/,"")+"\n";return retval;}}
;function COSStream(dictionary,file){this.dictionary=dictionary;this.file=file;}
COSStream.prototype={decode:function(){var value=this.dictionary.getItem("Filter");var filters=[];var params=[];if(value==null){filters.push('NoFilter');}else{if(value instanceof COSName){filters.push(value.name);params.push(this.dictionary.getDictionaryObject('DecodeParms'));}else if(value instanceof COSArray){var paramsArray=this.dictionary.getDictionaryObject('DecodeParms');for(var i=0;i<value.size();i++){filters.push(value.getObject(i).name);if(paramsArray!=null)
params.push(paramsArray.getObject(i));}}else{throw"Bad COS type for filter name";}}
var buf=this.file;for(var i=0;i<filters.length;i++){var filterName=filters[i];var filter=FilterManager.getFilter(filterName);buf=filter.decode(buf,params[i]);}
return buf;},getStreamTokens:function(){var parser=new PDFStreamParser(this);parser.parse();return parser.getTokens();},toString:function(depth){depth=depth||0;return"\t".repeat(depth)+"COSStream:";},getImageString:function(resources,graphics){var filterType=this.dictionary.getDictionaryObject('Filter').name;if(filterType=='DCTDecode'){return'data:image/jpeg;base64,'+base64.encode(this.file);}else if(filterType=='FlateDecode'||filterType=="Fl"){return PDFImage.create(this,resources,graphics).getImageString();}else{console.error("Uknown filter type for image '"+filterType+"'");return"";}}}
;function COSString(value){this.value=value;}
COSString.prototype={toString:function(depth){depth=depth||0;return"\t".repeat(depth)+"COSString: "+this.value;}}
COSString.createFromHexString=function(hex){var retval="";var hexBuffer="";var len=hex.length;for(var i=0;i<len;i++){var c=hex.charAt(i);if((c>='0'&&c<='9')||(c>='a'&&c<='f')||(c>='A'&&c<='F'))
hexBuffer+=c;}
if(hexBuffer.length%2==1){hexBuffer+="0";}
for(var i=0;i<hexBuffer.length;){var hexChars=hexBuffer.charAt(i++)+hexBuffer.charAt(i++);retval+=String.fromCharCode(parseInt(hexChars,16));}
var cosString=new COSString(retval);cosString.cameFromHEX=true;return cosString;}
;function COSName(name){this.name=name;}
COSName.prototype={toString:function(depth){depth=depth||0;return"\t".repeat(depth)+"COSName: "+this.name;}};
;function COSObject(object,key,document){this._object=object;this._key=key;this._document=document;}
COSObject.prototype={setObject:function(object){this._object=object;},getObject:function(){if(this._object===null){this._document.loadObject(this._key);if(this._object===null){throw Exception("Error loading indirect object: "+obj.key.getKey());}}
return this._object;},getKey:function(){return this._key;},toString:function(depth){return"COSObject";depth=depth||0;if(this.object!=null)
return"\t".repeat(depth)+"COSObject: \n"+this.object.toString(depth+1);else
return"\t".repeat(depth)+"COSObject: null";}}
;function COSObjectKey(num,gen){if(typeof num=="string")
this.number=parseInt(num);else
this.number=num;if(typeof gen=="string")
this.generation=parseInt(gen);else
this.generation=gen;}
COSObjectKey.prototype={getKey:function(){return this.number+"-"+this.generation;},toString:function(){return"COSObjectKey: "+this.getKey();}}
;function COSNumber(value){this.value=parseFloat(value);}
COSNumber.prototype={toString:function(depth){depth=depth||0;return"\t".repeat(depth)+"COSNumber: "+this.value;}}
;function COSNull(){}
;function COSBoolean(value){this.value=value;}
COSBoolean.prototype.toString=function(){return"COSBoolean: "+this.value;};COSBoolean.TRUE=new COSBoolean(true);COSBoolean.FALSE=new COSBoolean(false);
;function COSStreamArray(base){this.streams=base;this.decode=function(){var out="";for(var i=0;i<this.streams.size();i++){out+=this.streams.getObject(i).decode();}
return out;};this.getStreamTokens=function(){var parser=new PDFStreamParser(this);parser.parse();return parser.getTokens();};}
;function COSObjectReference(){}
;function COSObjectStreamLocation(streamObjectKey,index){this.streamObjectKey=streamObjectKey;this.index=index;}
;function PDFObject(type,object){if(typeof(type)=='undefined')
throw new Exception("Undefined type");this.type=type;this.object=object;}
PDFObject.prototype={getBooleanValue:function(){if(this.type==0){return this.dereference().getBooleanValue();}
return this.object;},getIntValue:function(){if(this.type==0){return this.dereference().getIntValue();}
return this.object;},is:function(type){if(this.type==0){return this.dereference().is();}
return this.type==type;},toString:function(depth){depth=depth||0;if(this.object!=null)
return"\t".repeat(depth)+"PDFObject("+PDFObject.TYPE_MAP[this.type]+"):";}}
PDFObject.INDIRECT=0;PDFObject.BOOLEAN=1;PDFObject.NUMBER=2;PDFObject.STRING=3;PDFObject.NAME=4;PDFObject.ARRAY=5;PDFObject.DICTIONARY=6;PDFObject.STREAM=7;PDFObject.NULL=8;PDFObject.KEYWORD=9;PDFObject.TYPE_MAP=['INDIRECT','BOOLEAN','NUMBER','STRING','NAME','ARRAY','DICTIONARY','STREAM','NULL','KEYWORD'];PDFObject.TRUE_OBJECT=new PDFObject(PDFObject.BOOLEAN,true);PDFObject.FALSE_OBJECT=new PDFObject(PDFObject.BOOLEAN,false);PDFObject.NULL_OBJECT=new PDFObject(PDFObject.NULL,null);
;function PDDocument(cosDocument){this.document=cosDocument;this.getNumberOfPages=function(){var cat=this.getDocumentCatalog();return cat.getPages().getCount();};this.getDocumentCatalog=function(){var trailer=this.document.getTrailer();var infoDic=trailer.getDictionaryObject('Root');if(infoDic==null)
{console.error(" ");throw"hello";documentCatalog=new PDDocumentCatalog(this);}
else
{documentCatalog=new PDDocumentCatalog(this,infoDic);}
return documentCatalog;};this.getDocumentInformation=function(){var trailer=this.document.getTrailer();var infoDic=trailer.getDictionaryObject('Info');if(infoDic==null)
{infoDic=new COSDictionary();trailer.setItem({name:'Info'},infoDic);}
var documentInformation=new PDDocumentInformation(infoDic);return documentInformation;}}
;function PDDocumentCatalog(doc,rootDictionary){this.document=doc;if(rootDictionary){this.root=rootDictionary;}else{this.root=new COSDictionary();this.root.setItem('Type',new COSString("Catalog"));this.document.document.getTrailer().setItem('Root',this.root);}
this.getPages=function()
{return new PDPageNode(this.root.getDictionaryObject('Pages'));}
this.getAllPages=function()
{var retval=[];var rootNode=this.getPages();rootNode.getAllKids(retval);return retval;}}
;function PDPageNode(pages){this.page=pages;this.getCount=function()
{return this.page.getDictionaryObject('Count').value;}
this.getAllKids=function(result){PDPageNode.getAllKidsStatic(result,this.page,true);};this.getParent=function()
{var parent=null;var parentDic=this.page.getDictionaryObjectTwoKey("Parent","P");if(parentDic!=null)
{parent=new PDPageNode(parentDic);}
return parent;}
this.getMediaBox=function()
{var retval=null;var array=this.page.getDictionaryObject('MediaBox');if(array!=null)
{retval=new Rectangle2D(array.getObject(0).value,array.getObject(1).value,array.getObject(2).value-array.getObject(0).value,array.getObject(3).value-array.getObject(1).value);}
return retval;}
this.findResources=function()
{var retval=this.getResources();var parent=this.getParent();if(retval==null&&parent!=null)
{retval=parent.findResources();}
return retval;}
this.getResources=function()
{var retval=null;var resources=this.page.getDictionaryObject('Resources');if(resources!=null)
{retval=new PDResources(resources);}
return retval;}
this.findMediaBox=function()
{var retval=this.getMediaBox();var parent=this.getParent();if(retval==null&&parent!=null)
{retval=this.parent.findMediaBox();}
return retval;}}
PDPageNode.getAllKidsStatic=function(result,page,recurse)
{var kids=page.getDictionaryObject('Kids');if(kids==null)
return[];for(var i=0;i<kids.size();i++)
{var obj=kids.getObject(i);if(obj instanceof COSDictionary)
{var kid=obj;if('Page'==kid.getDictionaryObject('Type').name)
{result.push(new PDPage(kid));}
else
{if(recurse)
{PDPageNode.getAllKidsStatic(result,kid,recurse);}
else
{result.push(new PDPageNode(kid));}}}}
return kids;}
;function PDPage(pageDic){this.page=pageDic;this.getMediaBox=function()
{var retval=null;var array=this.page.getDictionaryObject('MediaBox');if(array!=null)
{retval=new Rectangle2D(array.getObject(0).value,array.getObject(1).value,array.getObject(2).value-array.getObject(0).value,array.getObject(3).value-array.getObject(1).value);}
return retval;}
this.getRotation=function(){var rotation=0;var rotate=this.page.getDictionaryObject('Rotate');if(rotate!=null)
rotation=rotate.value;return rotation;}
this.findMediaBox=function()
{var retval=this.getMediaBox();var parent=this.getParent();if(retval==null&&parent!=null)
{retval=parent.findMediaBox();}
return retval;}
this.getParent=function()
{var parent=null;var parentDic=this.page.getDictionaryObjectTwoKey("Parent","P");if(parentDic!=null)
{parent=new PDPageNode(parentDic);}
return parent;}
this.getResources=function(previousResources)
{var retval=null;var resources=this.page.getDictionaryObject('Resources');if(resources!=null)
{retval=new PDResources(resources);}
return retval;}
this.findResources=function()
{var retval=this.getResources();var parent=this.getParent();if(retval==null&&parent!=null)
{retval=parent.findResources();}
return retval;}
this.getContents=function()
{return PDStream.createFromCOS(this.page.getDictionaryObject('Contents'));}
this.drawToCanvas=function()
{var resolution=96;var mBox=this.findMediaBox();var widthPt=mBox.getWidth();var heightPt=mBox.getHeight();var scaling=resolution/72;var widthPx=Math.round(widthPt*scaling);var heightPx=Math.round(heightPt*scaling);}
this.getInitialTransform=function(width,height){var at=new AffineTransform();switch(this.getRotation()){case 0:at=new AffineTransform(1,0,0,-1,0,height);break;case 90:at=new AffineTransform(0,1,1,0,0,0);break;case 180:at=new AffineTransform(-1,0,0,1,width,0);break;case 270:at=new AffineTransform(0,-1,-1,0,width,height);break;}
var clip=this.findMediaBox();if(this.getRotation()==90||this.getRotation()==270){var tmp=clip.width;clip.width=clip.height;clip.height=tmp;}
var scaleX=width/clip.getWidth();var scaleY=height/clip.getHeight();at=at.scale(scaleX,scaleY);var zx=-clip.getMinX();var zy=-clip.getMinY();at=at.translate(-clip.getMinX(),-clip.getMinY());return at;}
this.getUnstretchedSize=function(width,height){var clip=this.findMediaBox();if(clip==null){console.error('todo');clip=bbox;}else{if(this.getRotation()==90||this.getRotation()==270){clip=new Rectangle2D(clip.getX(),clip.getY(),clip.getHeight(),clip.getWidth());}}
var ratio=clip.getHeight()/clip.getWidth();var askratio=height/width;if(askratio>ratio){height=parseInt(width*ratio+0.5);}else{width=parseInt(height/ratio+0.5);}
return{'width':width,'height':height};}}
;function PDStream(stream){this.stream=stream;this.getStream=function(){return this.stream;};}
PDStream.createFromCOS=function(base){var retval=null;if(base instanceof COSStream){retval=new PDStream(base);}else if(base instanceof COSArray){retval=new PDStream(new COSStreamArray(base));}else{if(base!=null){throw new IOException("Contents are unknown type:"+base.getClass().getName());}}
return retval;}
;function PDDocumentInformation(dic){this.info=dic;this.getTitle=function(){return this.info.getItem('Title');};}
;function PDResources(resourceDictionary){this.resources=resourceDictionary;this.getFonts=function()
{var retval=null;var fonts=this.resources.getDictionaryObject('Font');console.log(fonts);retval={};return retval;}
this.getFont=function(name)
{var fonts=this.resources.getDictionaryObject('Font');var font=fonts.getDictionaryObject(name);return font;}
this.getXObject=function(name){var x=this.resources.getDictionaryObject('XObject');return x.getDictionaryObject(name);};this.getGraphicsState=function(name)
{var states=this.resources.getDictionaryObject("ExtGState");if(states==null)
return null;return states.getDictionaryObject(name);}}
;function FilterManager(){}
FilterManager.getFilter=function(name){if(name=="FlateDecode"||name=="Fl"){return new FlateFilter();}else if(name=="NoFilter"){return new NoFilter();}else if(name=="LZWDecode"||name=="LZW"){return new LzwFilter();}else if(name=="ASCII85Decode"||name=="A85"){return new ASCII85Filter();}else{throw new Exception("Unknown filter "+name);}};
;function FlateFilter(){this.decode=function(stream,params){var inflator=new Inflator(new function(){var filePointer=2;var fileSize=stream.length-4;this.readByte=function(){if(filePointer>=fileSize)
return-1;return stream.charCodeAt(filePointer++)&0xff;}});var textReader=new TextReader(new DefaultTranslator(inflator));var outBytes=textReader.readToEnd();if(params!=null)
var predictor=params.getDictionaryObject("Predictor");if(params!=null&&predictor!=null){var predictor=Predictor.getPredictor(params);if(predictor!=null){outBytes=predictor.unpredict(outBytes);}}
return outBytes;};}
;function LzwFilter(){var buf;var bytepos;var bitpos;var dict=new Array(4096);var dictlen=0;var bitspercode=9;var STOP=257;var CLEARDICT=256;for(var i=0;i<256;i++){dict[i]=new Array(1);dict[i][0]=i;}
dictlen=258;bitspercode=9;bytepos=0;bitpos=0;this._nextCode=function(){var fillbits=bitspercode;var value=0;if(bytepos>=buf.getLimit()-1){return-1;}
while(fillbits>0){var nextbits=buf.getAt(bytepos);var bitsfromhere=8-bitpos;if(bitsfromhere>fillbits){bitsfromhere=fillbits;}
value|=((nextbits>>(8-bitpos-bitsfromhere))&(0xff>>(8-bitsfromhere)))<<(fillbits-bitsfromhere);fillbits-=bitsfromhere;bitpos+=bitsfromhere;if(bitpos>=8){bitpos=0;bytepos++;}}
return value;};this._resetDict=function(){dictlen=258;bitspercode=9;};this.decode=function(stream){buf=new StreamBuffer(stream);var cW=CLEARDICT;var baos={output:[],write:function(b,offset,length){for(var i=offset;i<(offset+length);i++){this.output.push(b[i]);}}};function arrayCopy(src,srcPos,dest,destPos,len){for(var i=0;i<len;i++){dest[destPos+i]=src[srcPos+i];}}
while(true){var pW=cW;cW=this._nextCode();if(cW==-1){throw new PDFParseException("Missed the stop code in LZWDecode!");}
if(cW==STOP){break;}else if(cW==CLEARDICT){this._resetDict();}else if(pW==CLEARDICT){baos.write(dict[cW],0,dict[cW].length);}else{if(cW<dictlen){baos.write(dict[cW],0,dict[cW].length);var p=new Array(dict[pW].length+1);arrayCopy(dict[pW],0,p,0,dict[pW].length);p[dict[pW].length]=dict[cW][0];dict[dictlen++]=p;}else{var p=new Array(dict[pW].length+1);arrayCopy(dict[pW],0,p,0,dict[pW].length);p[dict[pW].length]=p[0];baos.write(p,0,p.length);dict[dictlen++]=p;}
if(dictlen>=(1<<bitspercode)-1&&bitspercode<12){bitspercode++;}}}
return String.fromCharCode.apply(this,baos.output);};}
;function ASCII85Filter(){var buf=null;function nextChar(){while(buf.remaining()>0){var c=buf.get();if(!BaseParser.isWhiteSpace(String.fromCharCode(c))){return c;}}
return-1;}
var TILDY='~'.charCodeAt(0);var GT='>'.charCodeAt(0);var EX='!'.charCodeAt(0);var Z='z'.charCodeAt(0);var U='u'.charCodeAt(0);this.decode5=function(baos){var five=new Array(5);var i;for(i=0;i<5;i++){five[i]=nextChar();if(five[i]==TILDY){if(nextChar()==GT){break;}else{throw new PDFParseException("Bad character in ASCII85Decode: not ~>");}}else if(five[i]>=EX&&five[i]<=U){five[i]-=EX;}else if(five[i]==Z){if(i==0){five[i]=0;i=4;}else{throw new PDFParseException("Inappropriate 'z' in ASCII85Decode");}}else{throw new PDFParseException("Bad character in ASCII85Decode: "+five[i]+" ("+five[i]+")");}}
if(i>0){i-=1;}
var value=five[0]*85*85*85*85+
five[1]*85*85*85+
five[2]*85*85+
five[3]*85+
five[4];for(var j=0;j<i;j++){var shift=8*(3-j);baos.write((value>>shift)&0xff);}
return(i==4);}
this.decode=function(stream){buf=new StreamBuffer(stream);var baos={output:[],write:function(b){this.output.push(b);}};while(this.decode5(baos)){};return String.fromCharCode.apply(this,baos.output);};}
;function NoFilter(){this.decode=function(text){return text;};}
;function Predictor(){this._algorithm;this._colors=1;this._bpc=8;this._columns=1;}
Predictor.prototype.getAlgorithm=function(){return this._algorithm;}
Predictor.prototype.getColors=function(){return this._colors;}
Predictor.prototype.setColors=function(colors){this._colors=colors;}
Predictor.prototype.getBitsPerComponent=function(){return this._bpc;}
Predictor.prototype.setBitsPerComponent=function(bpc){this._bpc=bpc;}
Predictor.prototype.getColumns=function(){return this._columns;}
Predictor.prototype.setColumns=function(columns){this._columns=columns;}
Predictor.getPredictor=function(params){var algorithmObj=params.getDictionaryObject("Predictor");if(algorithmObj==null){return null;}
var algorithm=algorithmObj.value;var predictor=null;switch(algorithm){case 1:return null;case 2:throw new UnimplementedException("Tiff Predictor not supported");case 10:case 11:case 12:case 13:case 14:case 15:predictor=new PNGPredictor();break;default:throw new PDFParseException("Unknown predictor: "+algorithm);}
var colorsObj=params.getDictionaryObject("Colors");if(colorsObj!=null){predictor.setColors(colorsObj.value);}
var bpcObj=params.getDictionaryObject("BitsPerComponent");if(bpcObj!=null){predictor.setBitsPerComponent(bpcObj.value);}
var columnsObj=params.getDictionaryObject("Columns");if(columnsObj!=null){predictor.setColumns(columnsObj.value);}
return predictor;};
;function PNGPredictor(){PNGPredictor.baseConstructor.call(this);}
extend(PNGPredictor,Predictor);PNGPredictor.prototype.unpredict=function(imageData){var rows=[];var curLine=null;var prevLine=null;imageData=new StreamBuffer(imageData);var rowSize=this.getColumns()*this.getColors()*this.getBitsPerComponent();rowSize=Math.ceil(rowSize/8.0);while(imageData.remaining()>=rowSize+1){var pos=imageData.getPosition();var algorithm=imageData.getByteAt(pos++);imageData.setPosition(pos);curLine=new Array(rowSize);imageData.getBulk(curLine);switch(algorithm){case 0:break;case 1:this.doSubLine(curLine);break;case 2:this.doUpLine(curLine,prevLine);break;case 3:this.doAverageLine(curLine,prevLine);break;case 4:this.doPaethLine(curLine,prevLine);break;}
rows.push(curLine);prevLine=curLine;}
var outBuf=new Array(rows.length*rowSize);var outBufLength=outBuf.length;var numberOfRows=rows.length;var index=0;for(var i=0;i<numberOfRows;i++){for(var j=0;j<rowSize;j++){var value=rows[i][j];outBuf[index]=value;index++;}}
return String.fromCharCode.apply(this,outBuf);}
PNGPredictor.prototype.doSubLine=function(curLine){var sub=Math.ceil((this.getBitsPerComponent()*this.getColors())/8.0);for(var i=0;i<curLine.length;i++){var prevIdx=i-sub;if(prevIdx>=0){curLine[i]+=curLine[prevIdx];}}}
PNGPredictor.prototype.doUpLine=function(curLine,prevLine){if(prevLine==null){return;}
for(var i=0;i<curLine.length;i++){curLine[i]+=prevLine[i];}}
PNGPredictor.prototype.doAverageLine=function(curLine,prevLine){var sub=Math.ceil((this.getBitsPerComponent()*this.getColors())/8.0);for(var i=0;i<curLine.length;i++){var raw=0;var prior=0;var prevIdx=i-sub;if(prevIdx>=0){raw=curLine[prevIdx]&0xff;}
if(prevLine!=null){prior=prevLine[i]&0xff;}
curLine[i]+=Math.floor((raw+prior)/2);}}
PNGPredictor.prototype.doPaethLine=function(curLine,prevLine){var sub=Math.ceil((this.getBitsPerComponent()*this.getColors())/8.0);for(var i=0;i<curLine.length;i++){var left=0;var up=0;var upLeft=0;var prevIdx=i-sub;if(prevIdx>=0){left=curLine[prevIdx]&0xff;}
if(prevLine!=null){up=prevLine[i]&0xff;}
if(prevIdx>0&&prevLine!=null){upLeft=prevLine[prevIdx]&0xff;}
curLine[i]+=this.paeth(left,up,upLeft);}}
PNGPredictor.prototype.paeth=function(left,up,upLeft){var p=left+up-upLeft;var pa=Math.abs(p-left);var pb=Math.abs(p-up);var pc=Math.abs(p-upLeft);if((pa<=pb)&&(pa<=pc)){return left;}else if(pb<=pc){return up;}else{return upLeft;}}
;function BaseParser(){}
BaseParser.prototype.parseCOSStream=function(dictionary){this.stream.readLine();var length=dictionary.getDictionaryObject('Length').value;var streamText="";var start=this.stream.getPosition();var offset=start+length;for(var i=start;i<offset;i++){streamText+=this.stream.read();}
var cosStream=new COSStream(dictionary,streamText);return cosStream;};BaseParser.prototype.parseCOSDictionary=function(){var c=this.stream.read();if(c!="<")
throw"Expecting '<'";var c=this.stream.read();if(c!="<")
throw"Expecting '<'";this.skipSpaces();var obj=new COSDictionary();var done=false;while(!done)
{this.skipSpaces();c=this.stream.read();if(c=='>')
{done=true;}
else
if(c!='/')
{console.warn("invalid dicitonary expected '/' found '"+c+"'");}
else
{var key=this.parseCOSName();var value=this.parseCOSDictionaryValue();this.skipSpaces();if(value==null)
{console.warn("Bad Dictionary Declaration. Key: "+key.name);}
else
{obj.setItem(key,value);}}}
var ch=this.stream.read();if(ch!='>')
{throw new IOException("expected='>' actual='"+ch+"'");}
return obj;};BaseParser.prototype.parseCOSDictionaryValue=function(){var retval=null;var number=this.parseDirObject();this.skipSpaces();var next=this.stream.peek();if(next>='0'&&next<='9')
{var generationNumber=this.parseDirObject();this.skipSpaces();var r=this.stream.read();if(r!='R')
{throw"Expected='R' actual='"+r+"'";}
var key=new COSObjectKey(number.value,generationNumber.value);retval=this.document.getObjectFromPool(key);}
else
{retval=number;}
return retval;};BaseParser.prototype.parseCOSArray=function(){var po=new COSArray();var pbo=null;this.skipSpaces();var i=this.stream.peek();while((i!=']')&&this.stream.hasRemaining())
{pbo=this.parseDirObject();if(pbo instanceof COSObject)
{if(po.get(po.size()-1)instanceof COSNumber)
{var genNumber=po.remove();if(po.get(po.size()-1)instanceof COSNumber)
{var number=po.remove();var key=new COSObjectKey(number.value,genNumber.value);pbo=this.document.getObjectFromPool(key);}
else
{pbo=null;}}
else
{pbo=null;}}
if(pbo!=null)
{po.add(pbo);}
else
{console.warn("Corrupt object reference");}
this.skipSpaces();i=this.stream.peek();}
this.stream.read();this.skipSpaces();return po;};BaseParser.prototype.parseCOSName=function(){var c;var sb="";while(this.stream.getPosition()<this.stream.getLimit()&&this.isRegularCharacter(c=this.stream.read())){sb+=c;}
this.stream.rewindOne();return new COSName(sb);}
BaseParser.prototype.parseCOSNumber=function(){var c=this.stream.read();var neg=c=='-';var sawdot=c=='.';var dotmult=sawdot?0.1:1;var value=(c>='0'&&c<='9')?c-'0':0;while(true){c=this.stream.read();if(c=='.'){if(sawdot){this.stream.setPosition(this.stream.getPosition()-1);break;}
sawdot=true;dotmult=0.1;}else if(c>='0'&&c<='9'){var val=c-'0';if(sawdot){value+=val*dotmult;dotmult*=0.1;}else{value=value*10+val;}}else{this.stream.setPosition(this.stream.getPosition()-1);break;}}
if(neg){value=-value;}
return new COSNumber(value);}
BaseParser.prototype.parseCOSString=function(){var parenLevel=0;var sb="";var openBrace=this.stream.read();var closeBrace;if(openBrace=='(')
closeBrace=')';else
closeBrace='>';while(this.stream.getPosition()<this.stream.getLimit()){var c=this.stream.read();if(c==closeBrace){if(parenLevel--==0){break;}}else if(c==openBrace){parenLevel++;}else if(c=='\\'){c=this.stream.read();if(c>='0'&&c<='9'){var count=0;var val=0;var zero='0'.charCodeAt(0);while(c>='0'&&c<='9'&&count<3){val=val*8+c.charCodeAt(0)-zero;c=this.stream.read();count++;}
this.stream.rewindOne();c=String.fromCharCode(val);}else if(c=='n'){c='\n';}else if(c=='r'){c='\r';}else if(c=='t'){c='\t';}else if(c=='b'){c='\b';}else if(c=='f'){c='\f';}else if(c=='\\'){c='\\';}else if(c=='('){c='(';}else if(c==')'){c=')';}else if(c=='<'){c='<';}else if(c=='>'){c='>';}}
sb+=c;}
if(openBrace=='<')
return COSString.createFromHexString(sb);else
return new COSString(sb);}
BaseParser.prototype.skipSpaces=function(){if(!this.stream.hasRemaining())
return;var c=this.stream.read();while(this.isWhiteSpace(c)||c=='%'){if(c=='%'){var comment="";while(this.stream.hasRemaining()&&c!='\n'){comment+=c;c=this.stream.read();}
if(this.stream.hasRemaining()){c=this.stream.read();if(c=='\r'){c=this.stream.read();}}}else{if(!this.stream.hasRemaining())
return;c=this.stream.read();}}
this.stream.rewindOne();}
BaseParser.prototype.readNum=function(){var c=this.stream.read();var neg=c=='-';var sawdot=c=='.';var dotmult=sawdot?0.1:1;var value=(c>='0'&&c<='9')?c-'0':0;while(true){c=this.stream.read();if(c=='.'){if(sawdot){this.stream.setPosition(this.stream.getPosition()-1);break;}
sawdot=true;dotmult=0.1;}else if(c>='0'&&c<='9'){var val=c-'0';if(sawdot){value+=val*dotmult;dotmult*=0.1;}else{value=value*10+val;}}else{this.stream.setPosition(this.stream.getPosition()-1);break;}}
if(neg){value=-value;}
return value;}
BaseParser.prototype.isWhiteSpace=function(c){switch(c){case' ':case'\n':case'\r':case'\0':case'\t':case'\f':return true;default:return false;}}
BaseParser.prototype.readString=function(){this.skipSpaces();var c;var sb="";while(this.stream.getPosition()<this.stream.getLimit()&&this.isRegularCharacter(c=this.stream.read())){sb+=c;}
if(this.stream.getPosition()<this.stream.getLimit())
this.stream.rewindOne();return sb;}
BaseParser.prototype.parseDirObject=function(){this.skipSpaces();var c=this.stream.read();var peek=this.stream.peek();if(c=='['){return this.parseCOSArray();}else if(c=='('){this.stream.rewindOne();return this.parseCOSString();}else if(c=='<'&&peek=='<'){this.stream.rewindOne();return this.parseCOSDictionary();}else if(c=='<'){this.stream.rewindOne();return this.parseCOSString();}else if(c=='/'){return this.parseCOSName();}else if(c=='R'){return new COSObject(null);}else if(c=='.'||c=='-'||(c>='0'&&c<='9')){this.stream.rewindOne();return this.parseCOSNumber();}else if(c=='n'){var st=this.readString();if(st!='ull')
throw"Expecting null string found "+st;return new COSNull();}else if(c=='t'){var st=this.readString();if(st!='rue')
throw"Expecting null string found "+st;return COSBoolean.TRUE;}else if(c=='f'){var st=this.readString();if(st!='alse')
throw"Expecting null string found "+st;return COSBoolean.FALSE;}
return null;var d=c+this.stream.read(5);console.warn(d);throw"Unable to parse object. Found token: "+d;};BaseParser.prototype.isRegularCharacter=function(c){return!(this.isWhiteSpace(c)||this.isDelimiter(c));}
BaseParser.prototype.isDelimiter=function(c){switch(c){case'(':case')':case'<':case'>':case'[':case']':case'{':case'}':case'/':case'%':return true;default:return false;}}
BaseParser.prototype.isEndOfName=function(ch){return(ch==' '||ch=='\r'||ch=='\n'||ch=='\t'||ch=='>'||ch=='<'||ch=='['||ch=='/'||ch==']'||ch==')'||ch=='('||ch==-1);}
BaseParser.isWhiteSpace=function(c){switch(c){case' ':case'\n':case'\r':case'\0':case'\t':case'\f':return true;default:return false;}}
;function PDFParser(stream){this.stream=stream;this.document=new COSDocument();this.document.parser=this;}
extend(PDFParser,BaseParser);PDFParser.prototype.parse=function(){var startXrefPos=this.stream.lastIndexOf("startxref");if(startXrefPos==-1)
throw new ParseException("Could not find the startxref");this.stream.setPosition(startXrefPos+9);this.skipSpaces();var xrefPos=this.readNum();while(true){this.stream.setPosition(xrefPos);this.skipSpaces();var peek=this.stream.peek();var trailer=null;if(peek=='x'){this.parseXrefTable();trailer=this.parseTrailer();}else{trailer=this.parseXrefStream();}
var prev=trailer.getDictionaryObject('Prev');if(prev){xrefPos=prev.value;}else{break;}}};PDFParser.prototype.parseHeader=function(){var header=this.stream.readLine();var version=header.substring(5);this.document.version=version;};PDFParser.prototype.parseObject=function(){if(!this.stream.hasRemaining())
return true;this.skipSpaces();var peek=this.stream.peek();if(peek=='e'){this.readString();this.skipSpaces();}else if(peek=='x'){this.parseXrefTable();}else if(peek=='t'||peek=='s'){if(peek=='t')
{this.parseTrailer();peek=this.stream.peek();}
if(peek=='s')
{this.parseStartXref();this.skipSpaces();if(this.stream.hasRemaining())
{}
return true;}}else{var objectNumber=this.readNum();this.skipSpaces();var genNumber=this.readNum();this.skipSpaces();var objectKey=this.stream.read(3);var pb=this.parseDirObject();var endObjectKey=this.readString();if(endObjectKey=="stream"){if(pb instanceof COSDictionary)
{pb=this.parseCOSStream(pb);}
else
{throw new Exception("Previous must be a dictionary");}
endObjectKey=this.readString();}
var key=new COSObjectKey(objectNumber,genNumber);var pdfObject=this.document.getObjectFromPool(key);pdfObject.setObject(pb);return pb;}
return false;};PDFParser.prototype.parseXrefStream=function(){var obj=this.parseObject();var parser=new PDFXrefStreamParser(obj,this.document);parser.parse();var parsedTrailer=obj.dictionary;var docTrailer=this.document.getTrailer();if(docTrailer==null)
{this.document.setTrailer(parsedTrailer);}
else
{docTrailer.addAll(parsedTrailer);}
return parsedTrailer;}
PDFParser.prototype.parseXrefTable=function(){var xref=this.readString();if(xref!="xref")
{return false;}
this.skipSpaces();while(true)
{var currObjID=this.readNum();var count=this.readNum();this.skipSpaces();for(var i=0;i<count;i++)
{if(!this.stream.hasRemaining()||this.isEndOfName(this.stream.peek()))
{break;}
if(this.stream.peek()=='t')
{break;}
var currentLine=this.stream.readLine().replace(/\s+$/,"");var splitString=currentLine.split(" ");if(splitString.length<3)
{console.warn("invalid xref line: "+currentLine);break;}
if(splitString[splitString.length-1]=="n")
{var currOffset=splitString[0];var currGenID=splitString[1];var objKey=new COSObjectKey(currObjID,currGenID);this.document.setXRef(objKey,currOffset);}
else if(splitString[2]!="f")
{throw"Corrupt XRefTable Entry - ObjID:"+currObjID;}
currObjID++;this.skipSpaces();}
this.skipSpaces();var c=this.stream.peek();if(c<'0'||c>'9')
{break;}}
return true;};PDFParser.prototype.parseTrailer=function(){var nextLine=this.stream.read(7);if(nextLine!="trailer")
throw new ParseException("Expected trailer found '"+nextLine+"'");this.skipSpaces();var parsedTrailer=this.parseCOSDictionary();var docTrailer=this.document.getTrailer();if(docTrailer==null)
{this.document.setTrailer(parsedTrailer);}
else
{docTrailer.addAll(parsedTrailer);}
this.skipSpaces();return parsedTrailer;};PDFParser.prototype.parseStartXref=function(){var startXRef=this.stream.readLine();if(startXRef!="startxref")
{throw"blah";}
this.skipSpaces();this.readNum();return true;};PDFParser.prototype.getPDDocument=function(){return new PDDocument(this.document);};
;function PDFStreamEngine(canvas,initialMatrix){this.page;this.canvas=canvas;this.initialMatrix=initialMatrix;this.resources;this.processStream=function(aPage,resources,cosStream){this.commander=new Commander(this.canvas,resources,this.initialMatrix,this);this.map=new PDFOperatorMap(this.commander).map;this.resources=resources;this.processSubStream(aPage,resources,cosStream);};this.processSubStream=function(aPage,resources,cosStream){this.page=aPage;var arguments=[];var tokens=cosStream.getStreamTokens();var length=tokens.length;for(var i=0;i<length;i++){var next=tokens[i];if(next instanceof COSObject){arguments.push(next.getObject());}else if(next instanceof PDFOperator){this.processOperator(next,arguments,(i+1)==length);arguments=[];}else{arguments.push(next);}}}
this.processOperator=function(operator,args,last){var operation=operator.operator;var processor=this.map[operation];if(processor!=null){this.commander[processor].call(this.commander,args);}else{console.warn("UNIMPLEMENTED OP '"+operation+"'");}}}
;function PDFXrefStreamParser(stream,doc){this.stream=stream;this.pdfSource=new StreamBuffer(stream.decode());this.document=doc;}
PDFXrefStreamParser.prototype={parse:function(){var dictionary=this.stream.dictionary;var xrefFormat=dictionary.getDictionaryObject("W");var indexArray=dictionary.getDictionaryObject("Index");if(indexArray==null){indexArray=new COSArray();indexArray.add(new COSNumber(0));indexArray.add(dictionary.getDictionaryObject("Size"));}
var objNums=[];var indexSize=indexArray.size();var index=0;while(index<indexSize){var objID=indexArray.get(index++).value;var size=indexArray.get(index++).value;for(var i=0;i<size;i++){objNums.push(parseInt(objID+i));}}
var objLength=objNums.length;var objIndex=0;var w0=xrefFormat.get(0).value;var w1=xrefFormat.get(1).value;var w2=xrefFormat.get(2).value;var lineSize=w0+w1+w2;while(this.pdfSource.hasRemaining()){var currLine=[];for(var i=0;i<lineSize;i++){currLine.push(this.pdfSource.get());}
var type=0;for(var i=0;i<w0;i++){type+=(currLine[i]&0x00ff)<<((w0-i-1)*8);}
var objID=objNums[objIndex++];switch(type){case 0:break;case 1:var offset=0;for(var i=0;i<w1;i++){offset+=(currLine[i+w0]&0x00ff)<<((w1-i-1)*8);}
var genNum=0;for(var i=0;i<w2;i++){genNum+=(currLine[i+w0+w1]&0x00ff)<<((w2-i-1)*8);}
var objKey=new COSObjectKey(objID,genNum);this.document.setXRef(objKey,offset);break;case 2:var streamObjectNumber=0;for(var i=0;i<w1;i++){streamObjectNumber+=(currLine[i+w0]&0x00ff)<<((w1-i-1)*8);}
var index=0;for(var i=0;i<w2;i++){index+=(currLine[i+w0+w1]&0x00ff)<<((w2-i-1)*8);}
var objKey=new COSObjectKey(objID,0);this.document.setXRef(objKey,new COSObjectStreamLocation(new COSObjectKey(streamObjectNumber,0),index));break;default:break;}}}}
;function PDFObjectStreamParser(stream,doc){PDFObjectStreamParser.baseConstructor.call(this);this.dictionary=stream.dictionary;this.stream=new StreamBuffer(stream.decode());this.document=doc;this.streamObjects=[];this.objectNumbers=[];}
extend(PDFObjectStreamParser,BaseParser);PDFObjectStreamParser.prototype.parse=function(){var numberOfObjects=this.dictionary.getDictionaryObject("N").value;this.objectNumbers=[];this.streamObjects=[];for(var i=0;i<numberOfObjects;i++){var objectNumber=this.readNum();var offset=this.readNum();this.objectNumbers.push(objectNumber);}
var object=null;var cosObject=null;var objectCounter=0;while(this.stream.hasRemaining()&&(cosObject=this.parseDirObject())!=null){var key=new COSObjectKey(this.objectNumbers[objectCounter],0);object=new COSObject(cosObject,key);this.streamObjects.push(object);objectCounter++;}}
;function PDFOperatorMap(){this.map={'b':'closeStrokefillPath','B':'fillNonZeroAndStrokePath','BI':'beginInlineImage','BT':'beginText','BX':'beginCompatibilitySection','c':'curveTo','cm':'concatenate','cs':'setNonStrokingColorSpace','Do':'doXObject','EI':'endInlineImage','ET':'endText','EX':'endCompatibilitySection','f':'fillPath','f*':'fillEvenOddRule','G':'setStrokingGrayColor','g':'setNonStrokingGrayColor','gs':'setGraphicsStateParameters','h':'closePath','j':'setLineJoinStyle','J':'setLineCapStyle','K':'setStrokingCMYKColor','k':'setNonStrokingCMYKColor','l':'lineTo','m':'moveTo','M':'setLineMiterLimit','n':'endPath','q':'saveGraphics','Q':'restoreGraphics','re':'appendRectangleToPath','RG':'setStrokingRGBColor','rg':'setNonStrokingRGBColor','s':'closeAndStrokePath','S':'strokePath','scn':'setNonStrokingColor','T*':'carriageReturn','Tc':'setCharSpacing','Td':'moveText','TD':'moveTextSetLeading','Tf':'setTextFont','Tj':'showText','TJ':'showKernedText','TL':'setTextLeading','Tm':'setTextMatrix','Tr':'setTextRenderingMode','Ts':'setTextRise','Tw':'setWordSpacing','Tz':'setHorizontalTextScaling','v':'curveToReplicateInitialPoint','w':'setLineWidth','W':'clipNonZeroRule','W*':'clipEvenOddRule','y':'curveToReplicateFinalPoint','\'':'moveAndShow'};}
;function PDFOperator(operator){this.operator=operator;}
PDFOperator.getOperator=function(operator){return new PDFOperator(operator);}
;function PDFStreamParser(stream){var streamText=stream.decode();this.stream=new StreamBuffer(streamText);this.streamObjects=[];}
extend(PDFStreamParser,BaseParser);PDFStreamParser.prototype.parse=function(){var token=null;while((token=this.parseNextToken())!=null)
{this.streamObjects.push(token);}}
PDFStreamParser.prototype.getTokens=function(){return this.streamObjects;};PDFStreamParser.prototype.parseNextToken=function(){var retval=null;if(this.stream.getPosition()>=this.stream.getLimit())
return null;this.skipSpaces();var nextByte=this.stream.peek();if(nextByte==-1)
{return null;}
var c=nextByte;switch(c)
{case'<':{var leftBracket=this.stream.read();c=this.stream.peek();this.stream.rewindOne();if(c=='<')
{var pod=this.parseCOSDictionary();this.skipSpaces();if(this.stream.peek()=='s')
{retval=this.parseCOSStream(pod,file);}
else
{retval=pod;}}
else
{retval=this.parseCOSString();}
break;}
case'[':{this.stream.read();retval=this.parseCOSArray();break;}
case'(':retval=this.parseCOSString();break;case'/':this.stream.read();retval=this.parseCOSName();break;case'n':{var nullString=this.readString();if(nullString=="null")
{retval=new COSNull();}
else
{retval=PDFOperator.getOperator(nullString);}
break;}
case't':case'f':{var next=this.readString();if(next=="true")
{retval=COSBoolean.TRUE;break;}
else if(next=="false")
{retval=COSBoolean.FALSE;}
else
{retval=PDFOperator.getOperator(next);}
break;}
case'R':{var line=this.readString();if(line=="R")
{retval=new COSObject(null);}
else
{retval=PDFOperator.getOperator(line);}
break;}
case'0':case'1':case'2':case'3':case'4':case'5':case'6':case'7':case'8':case'9':case'-':case'+':case'.':{var buf="";buf+=(c);this.stream.read();var dotNotRead=(c!='.');while(isDigit((c=this.stream.peek()))||(dotNotRead&&(c=='.')))
{buf+=c;this.stream.read();if(dotNotRead&&(c=='.'))
{dotNotRead=false;}}
retval=new COSNumber(buf);break;}
case'B':{var next=this.readString();retval=PDFOperator.getOperator(next);if(next=="BI")
{var image=this.parseInlineImage();retval=image;}
break;}
case']':{this.stream.read();retval=COSNull.NULL;break;}
default:{var operator=this.readOperator();if(operator.length==0)
{retval=null;}
else
{retval=PDFOperator.getOperator(operator);}}}
return retval;}
PDFStreamParser.prototype.parseInlineImage=function(){var hm={};while(true){var t=this.parseNextToken();if(t instanceof PDFOperator&&t.operator=="ID"){break;}
var name=t.name;if(name=="BPC"){name="BitsPerComponent";}else if(name=="CS"){name="ColorSpace";}else if(name=="D"){name="Decode";}else if(name=="DP"){name="DecodeParms";}else if(name=="F"){name="Filter";}else if(name=="H"){name="Height";}else if(name=="IM"){name="ImageMask";}else if(name=="W"){name="Width";}else if(name=="I"){name="Interpolate";}
var vobj=this.parseNextToken();hm[name]=vobj;}
var loc=this.stream.getPosition()
if(this.stream.readAt(loc)=="\r"){loc++;}
if(this.stream.readAt(loc)=="\n"||this.stream.readAt(loc)==' '){loc++}
var imObj=hm["ImageMask"];if(imObj!=null&&imObj==COSBoolean.TRUE){var decode=[0,1];var decodeObj=hm.get["Decode"];if(decodeObj!=null){decode[0]=decodeObj.getObject(0).value;decode[1]=decodeObj.getObject(1).value;}
hm["Decode"]=decode;}
var dstart=loc;while(!this.isWhiteSpace(this.stream.readAt(loc))||this.stream.readAt(loc+1)!='E'||this.stream.readAt(loc+2)!='I'){loc++;}
var streamText="";for(var i=dstart;i<loc;i++){streamText+=this.stream.readAt(i);}
var obj=new COSStream(new COSDictionary(hm),streamText);loc+=1;this.stream.setPosition(loc);return obj;}
PDFStreamParser.prototype.readOperator=function(){this.skipSpaces();var buffer="";var c=this.stream.peek();while(c!=-1&&!this.isWhiteSpace(c)&&c!=']'&&c!='['&&c!='<'&&c!='('&&c!='/'&&(c<'0'||c>'9'))
{buffer+=this.stream.read();c=this.stream.peek();}
return buffer;}
;function PDFImage(){this.width;this.height;this.bpc;this.colorSpace;}
PDFImage.prototype.getImageString=function(){var oData=this.imageData;var aHeader=[];var iWidth=oData.width;var iHeight=oData.height;aHeader.push(0x42);aHeader.push(0x4D);var iFileSize=iWidth*iHeight*3+54;aHeader.push(iFileSize%256);iFileSize=Math.floor(iFileSize/256);aHeader.push(iFileSize%256);iFileSize=Math.floor(iFileSize/256);aHeader.push(iFileSize%256);iFileSize=Math.floor(iFileSize/256);aHeader.push(iFileSize%256);aHeader.push(0);aHeader.push(0);aHeader.push(0);aHeader.push(0);aHeader.push(54);aHeader.push(0);aHeader.push(0);aHeader.push(0);var aInfoHeader=[];aInfoHeader.push(40);aInfoHeader.push(0);aInfoHeader.push(0);aInfoHeader.push(0);var iImageWidth=iWidth;aInfoHeader.push(iImageWidth%256);iImageWidth=Math.floor(iImageWidth/256);aInfoHeader.push(iImageWidth%256);iImageWidth=Math.floor(iImageWidth/256);aInfoHeader.push(iImageWidth%256);iImageWidth=Math.floor(iImageWidth/256);aInfoHeader.push(iImageWidth%256);var iImageHeight=iHeight;aInfoHeader.push(iImageHeight%256);iImageHeight=Math.floor(iImageHeight/256);aInfoHeader.push(iImageHeight%256);iImageHeight=Math.floor(iImageHeight/256);aInfoHeader.push(iImageHeight%256);iImageHeight=Math.floor(iImageHeight/256);aInfoHeader.push(iImageHeight%256);aInfoHeader.push(1);aInfoHeader.push(0);aInfoHeader.push(24);aInfoHeader.push(0);aInfoHeader.push(0);aInfoHeader.push(0);aInfoHeader.push(0);aInfoHeader.push(0);var iDataSize=iWidth*iHeight*3;aInfoHeader.push(iDataSize%256);iDataSize=Math.floor(iDataSize/256);aInfoHeader.push(iDataSize%256);iDataSize=Math.floor(iDataSize/256);aInfoHeader.push(iDataSize%256);iDataSize=Math.floor(iDataSize/256);aInfoHeader.push(iDataSize%256);for(var i=0;i<16;i++){aInfoHeader.push(0);}
var iPadding=(4-((iWidth*3)%4))%4;var aImgData=oData.data;var strPixelData="";var y=iHeight;do{var iOffsetY=iWidth*(y-1)*4;var strPixelRow="";for(var x=0;x<iWidth;x++){var iOffsetX=4*x;strPixelRow+=String.fromCharCode(aImgData[iOffsetY+iOffsetX+2]);strPixelRow+=String.fromCharCode(aImgData[iOffsetY+iOffsetX+1]);strPixelRow+=String.fromCharCode(aImgData[iOffsetY+iOffsetX]);}
for(var c=0;c<iPadding;c++){strPixelRow+=String.fromCharCode(0);}
strPixelData+=strPixelRow;}while(--y);var encodeData=function(data){var strData="";if(typeof data=="string"){strData=data;}else{var aData=data;for(var i=0;i<aData.length;i++){strData+=String.fromCharCode(aData[i]);}}
return base64.encode(strData);}
var strEncoded=encodeData(aHeader.concat(aInfoHeader))+encodeData(strPixelData);return"data:"+'image/bmp'+";base64,"+strEncoded;}
PDFImage.create=function(obj,resources,context){var image=new PDFImage();var dictionary=obj.dictionary;var widthObj=dictionary.getDictionaryObject("Width");if(widthObj==null){throw new ParseException("Unable to read image width: "+obj);}
image.width=widthObj.value;var heightObj=dictionary.getDictionaryObject("Height");if(heightObj==null){throw new ParseException("Unable to get image height: "+obj);}
image.height=heightObj.value;var bpcObj=dictionary.getDictionaryObject("BitsPerComponent");if(bpcObj==null){throw new ParseException("Unable to get bits per component: "+obj);}
image.bpc=bpcObj.value;var csObj=dictionary.getDictionaryObject("ColorSpace");if(csObj==null){throw new ParseException("No ColorSpace for image: "+obj);}
var cs=PDFColorSpace.getColorSpace(csObj,resources);image.colorSpace=cs;var imageData=context.createImageData(image.width,image.height);var pix=imageData.data;var data=new StreamBuffer(obj.decode());function ChunkReader(buffer){this.bytestream=buffer;this.offset=0;this.readBit=function()
{var b=this.bytestream.getByteAt(this.offset>>>3);var tmp=b>>(this.offset&7);this.offset++;return tmp&1;}
this.read=function(numBits)
{var val=0;for(var i=0;i<numBits;++i)
val|=this.readBit()<<i;return val;}}
data=new ChunkReader(data);var numComponents=image.colorSpace.getNumComponents();var n=pix.length;for(var i=0;i<n;i+=4){var components=new Array(numComponents);for(var j=0;j<numComponents;j++){if(cs instanceof IndexedColor)
components[j]=data.read(image.bpc);else
components[j]=data.read(image.bpc)/255;}
var rgb=image.colorSpace.toRGB(components);pix[i]=rgb[0];pix[i+1]=rgb[1];pix[i+2]=rgb[2];pix[i+3]=255;}
image.imageData=imageData;return image;}
;function AffineTransform(m00,m10,m01,m11,m02,m12){if(arguments.length==0){m00=1;m10=0;m01=0;m11=1;m02=0;m12=0;}
this.m00=m00;this.m10=m10;this.m01=m01;this.m11=m11;this.m02=m02;this.m12=m12;}
AffineTransform.prototype={multiply:function(b){var result=new AffineTransform();if(b!=null)
{result.m00=this.m00*b.m00+this.m01*b.m10;result.m01=this.m00*b.m01+this.m01*b.m11;result.m02=this.m00*b.m02+this.m01*b.m12+this.m02;result.m10=this.m10*b.m00+this.m11*b.m10;result.m11=this.m10*b.m01+this.m11*b.m11;result.m12=this.m10*b.m02+this.m11*b.m12+this.m12;}
else{console.error('no AffineTransform');}
return result;},toString:function(){var result="";result+="[[";result+=this.m00+", ";result+=this.m01+", ";result+=this.m02+"][";result+=this.m10+", ";result+=this.m11+", ";result+=this.m12+"]]";return result;},getDeterminant:function(){return this.m00*this.m11-this.m01*this.m10;},getScaleX:function(){return this.m00;},getScaleY:function(){return this.m11;},clone:function(){return new AffineTransform(this.m00,this.m10,this.m01,this.m11,this.m02,this.m12);},scale:function(x,y){var scalor=AffineTransform.getScaleInstance(x,y);return this.multiply(scalor);},translate:function(x,y){var scalor=AffineTransform.getTranslatingInstance(x,y);return this.multiply(scalor);},transform:function(pt){return{x:pt.x*this.m00+pt.y*this.m01+this.m02,y:pt.x*this.m10+pt.y*this.m11+this.m12};}}
AffineTransform.getScaleInstance=function(x,y){var affineTransform=new AffineTransform();affineTransform.m00=x;affineTransform.m11=y;return affineTransform;};AffineTransform.getTranslatingInstance=function(x,y){var affineTransform=new AffineTransform();affineTransform.m02=x;affineTransform.m12=y;return affineTransform;};
;function PDGraphicsState(){var currentTransformationMatrix=new Matrix();var textState=new PDTextState();this.clone=function(){return jQuery.extend(true,{},this);}
this.setCurrentTransformationMatrix=function(matrix){currentTransformationMatrix=matrix;};this.getCurrentTransformationMatrix=function(matrix){return currentTransformationMatrix;}
this.getTextState=function(){return this.textState;}}
;function PDTextState()
{var characterSpacing=0;var wordSpacing=0;var caling=100;var leading=0;var font;var fontSize;var renderingMode=0;var rise=0;var knockout=true;}
;
;function PDFColorSpace(cs){this._cs=cs;}
PDFColorSpace.prototype.getPaint=function(components){var rgb=this._cs.toRGB(components);return rgb;}
PDFColorSpace.prototype.getNumComponents=function(){return this._cs.getNumComponents();}
PDFColorSpace.prototype.toString=function(){var name='PDFColorSpace';if(this._cs.toString)
name+='{'+this._cs.toString()+'}';return name;}
PDFColorSpace.prototype.toRGB=function(components){return this._cs.toRGB(components);}
PDFColorSpace.getColorSpaceByName=function(name){switch(name){case PDFColorSpace.COLORSPACE_GRAY:return PDFColorSpace.graySpace;case PDFColorSpace.COLORSPACE_RGB:return PDFColorSpace.rgbSpace;case PDFColorSpace.COLORSPACE_CMYK:return PDFColorSpace.cmykSpace;case PDFColorSpace.COLORSPACE_PATTERN:return PDFColorSpace.patternSpace;default:throw new IllegalArgumentException("Unknown Color Space name: "+
name);}}
PDFColorSpace.getColorSpace=function(csobj,resources){var name;if(csobj instanceof COSName){name=csobj.name;var colorSpaces;if(resources!=null){colorSpaces=resources.resources.getDictionaryObject("ColorSpace");}
if(name=="DeviceGray"||name=="G"){return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_GRAY);}else if(name=="DeviceRGB"||name=="RGB"){return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_RGB);}else if(name=="DeviceCMYK"||name=="CMYK"){return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_CMYK);}else if(name=="Pattern"){return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_PATTERN);}else if(colorSpaces!=null){csobj=colorSpaces.getDictionaryObject(name);}}
var value=null;var ary=csobj;name=csobj.getObject(0).name;if(name=="CalGray"){value=new PDFColorSpace(new CalGrayColor(ary.getObject(1)));}else if(name=="CalRGB"){value=new PDFColorSpace(new CalRGBColor(ary.getObject(1)));}else if(name=="Lab"){value=new PDFColorSpace(new LabColor(ary.getObject(1)));}else if(name=="ICCBased"){var streamContents=ary.getObject(1).decode();var stream=new StreamBuffer(streamContents);value=new PDFColorSpace(new ICC_ColorSpace(stream));}else if(name=="Separation"||name=="DeviceN"){console.warn("Colorspace seperation and DevinceN are not implemented fullly");var alternate=PDFColorSpace.getColorSpace(ary.getObject(2),resources);var func=PDFFunction.getFunction(ary.getObject(3));value=new AlternateColorSpace(alternate,func);}else if(name=="Indexed"||name=="I"){var refspace=PDFColorSpace.getColorSpace(ary.getObject(1),resources);var count=ary.getObject(2).value;value=new IndexedColor(refspace,count,ary.getObject(3));}else if(name=="Pattern"){console.warn("Colorspace Pattern is not implemented fullly");if(ary.size()==1){return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_PATTERN);}
var base=getColorSpace(ary.getObject(1),resources);return new PatternSpace(base);}else{throw new PDFParseException("Unknown color space: "+name+" with "+ary[1]);}
return value;throw new UnimplementedException("Only support names color spaces");}
PDFColorSpace.COLORSPACE_GRAY=0;PDFColorSpace.COLORSPACE_RGB=1;PDFColorSpace.COLORSPACE_CMYK=2;PDFColorSpace.COLORSPACE_PATTERN=3;PDFColorSpace.CMYKtoRGB=function(c,m,y,k){var r=1-Math.min(1,c*(1-k)+k);var g=1-Math.min(1,m*(1-k)+k);var b=1-Math.min(1,y*(1-k)+k);r=Math.round(r*255);g=Math.round(g*255);b=Math.round(b*255);return[r,g,b];}
PDFColorSpace.rgbSpace=new PDFColorSpace({toRGB:function(components){return this.getPaint(components);},getNumComponents:function(){return 3;},getPaint:function(components){var r=Math.round(components[0]*255);var g=Math.round(components[1]*255);var b=Math.round(components[2]*255);return[r,g,b];},toString:function(){return"PDFColorSpace.rgbSpace";}});PDFColorSpace.cmykSpace=new PDFColorSpace({toRGB:function(components){return this.getPaint(components);},getNumComponents:function(){return 4;},getPaint:function(components){return PDFColorSpace.CMYKtoRGB(components);},toString:function(){return"PDFColorSpace.cmykSpace";}});function PatternSpace(base){PatternSpace.baseConstructor.call(this,null);this._base=null;}
extend(PatternSpace,PDFColorSpace);PatternSpace.prototype.getNumComponents=function(){if(this._base==null)
return 0;return this._base.getNumComponents();}
PatternSpace.prototype.getPaint=function(patternObj,components,resources){var basePaint=null;if(this._base!=null){basePaint=this._base.getPaint(components);}
debugger;zip.func();var pattern=patternObj.getCache();if(pattern==null){pattern=PDFPattern.getPattern(patternObj,resources);patternObj.setCache(pattern);}
return pattern.getPaint(basePaint);}
PatternSpace.prototype.toRGB=function(components){return this.getPaint(components);}
PatternSpace.prototype.toString=function(){return'PatternSpace';}
PDFColorSpace.patternSpace=new PatternSpace();
;function AlternateColorSpace(alternate,pdfFunction){AlternateColorSpace.baseConstructor.call(this,null);this.alternate=alternate;this.pdfFunction=pdfFunction;this._cs={toRGB:function(){return[0,0,0];}}}
extend(AlternateColorSpace,PDFColorSpace);AlternateColorSpace.prototype.getNumComponents=function(){if(this.pdfFunction!=null){return this.pdfFunction.getNumInputs();}else{return this.alternate.getNumComponents();}}
AlternateColorSpace.prototype.toString=function(){return'AlternateColorSpace';}
;function IndexedColor(base,count,stream){IndexedColor.baseConstructor.call(this,null);this.finalcolors;this.table;this.count;this.nchannels=1;count++;this.count=count;var value;if(stream instanceof COSString)
value=stream.value;else if(stream instanceof COSStream)
value=stream.decode();else
throw new UnimplementedException("Unknown type of indexed colorspace");var data=new StreamBuffer(value);this.nchannels=base.getNumComponents();var offSized=(data.getLimit()/this.nchannels)<count;this.finalcolors=new Array(3*count);this.table=new Array(count);var comps=new Array(this.nchannels);var loc=0;var finalloc=0;var temp=data.toByteArray();for(var i=0;i<count;i++){for(var j=0;j<comps.length;j++){if(loc<data.getLimit()){comps[j]=(data.getByteAt(loc++)&0xff)/255.0;}else{comps[j]=1.0;}}
this.table[i]=base.getPaint(comps);this.finalcolors[finalloc++]=this.table[i][0];this.finalcolors[finalloc++]=this.table[i][1];this.finalcolors[finalloc++]=this.table[i][2];}}
extend(IndexedColor,PDFColorSpace);IndexedColor.prototype.getNumComponents=function(){return 1;}
IndexedColor.prototype.getPaint=function(components){if(!this.table[components[0]])
throw new ParseException("Unknown indexed color for index "+components[0]);return this.table[components[0]];}
IndexedColor.prototype.toRGB=function(components){return this.getPaint(components);}
IndexedColor.prototype.toString=function(){return'IndexedColor';}
;function ICC_ColorSpace(){}
ICC_ColorSpace.prototype.getNumComponents=function(){return 3;}
ICC_ColorSpace.prototype.toRGB=function(colorValue){return colorValue;}
ICC_ColorSpace.prototype.getPaint=function(colorValue){return colorValue;}
ICC_ColorSpace.prototype.toString=function(colorValue){return'ICC_ColorSpace';}
;function PDFFontEncoding(fontType,encoding){this.differences={};if(encoding instanceof COSDictionary){var typeStr=encoding.getDictionaryObject("Type").name;if(typeStr=="Encoding"){this.type=PDFFontEncoding.TYPE_ENCODING;this.parseEncoding(encoding);}else if(typeStr=="CMap"){this.type=PDFFontEncoding.TYPE_CMAP;this.cmap=PDFCMap.getCMap(encoding);}else{throw"Uknown encoding type: "+type;}}else if(encoding instanceof COSName){if(fontType=="Type0"){this.type=PDFFontEncoding.TYPE_CMAP;this.cmap=PDFCMap.getCMap(encoding);}else{this.type=PDFFontEncoding.TYPE_ENCODING;this.differences={};this.baseEncoding=this.getBaseEncoding(encoding.name);}}else{throw"not doen pdffontencoding";}}
PDFFontEncoding.prototype.parseEncoding=function(encoding){this.differences={};var baseEncObj=encoding.getDictionaryObject("BaseEncoding");if(baseEncObj!=null){this.baseEncoding=this.getBaseEncoding(baseEncObj.name);}
var diffArrayObj=encoding.getDictionaryObject("Differences");if(diffArrayObj!=null){var diffArray=diffArrayObj;var curPosition=-1;for(var i=0;i<diffArray.size();i++){var test=diffArray.get(i);if(test instanceof COSNumber){curPosition=test.value;}else if(test instanceof COSName){var key=String.fromCharCode(curPosition);this.differences[key]=test.name;curPosition++;}else{throw"Unexpected type in diff array: "+test;}}}}
PDFFontEncoding.prototype.getBaseEncoding=function(encodingName){if(encodingName=="MacRomanEncoding"){return FontSupport.macRomanEncoding;}else if(encodingName=="MacExpertEncoding"){return FontSupport.type1CExpertCharset;}else if(encodingName=="WinAnsiEncoding"){return FontSupport.winAnsiEncoding;}else{throw"Unknown encoding: "+encodingName;}}
PDFFontEncoding.prototype.getGlyphs=function(font,text){var outList=[];for(var i=0;i<text.length;i++){switch(this.type){case PDFFontEncoding.TYPE_ENCODING:outList.push(this.getGlyphFromEncoding(font,text.charAt(i)));break;case PDFFontEncoding.TYPE_CMAP:break;}}
return outList;}
PDFFontEncoding.prototype.getGlyphFromEncoding=function(font,src){var charName;if(this.differences[src]!=null){charName=this.differences[src];}else if(this.baseEncoding!=null){var charID=this.baseEncoding[src.charCodeAt(0)];charName=FontSupport.getName(charID);}
return font.getCachedGlyph(src,charName);}
PDFFontEncoding.TYPE_ENCODING=0;PDFFontEncoding.TYPE_CMAP=1;
;function PDFFont(baseFont,descriptor){this.baseFont=baseFont;this.descriptor=descriptor;this.subType;this.encoding;this.glyphCache={};}
PDFFont.prototype.getGlyphs=function(text){if(this.encoding!=null){return this.encoding.getGlyphs(this,text);}else{var outList=[];for(var i=0;i<text.length;i++){var src=text.charAt(i);outList.push(this.getCachedGlyph(src,null));}
return outList;}}
PDFFont.prototype.getCachedGlyph=function(src,name){if(this.glyphCache[src]!=null){return this.glyphCache[src];}
var glyph=this.getGlyph(src,name);this.glyphCache[src]=glyph;return glyph;}
PDFFont.getFont=function(obj,resources){if(obj['cachedFont']!=null)
return obj['cachedFont'];var baseFont=null;var encoding=null;var descriptor=null;var subType=obj.getDictionaryObject("Subtype").name;if(subType==null){subType=obj.getDictionaryObject("S").name;}
var baseFontObj=obj.getDictionaryObject("BaseFont");var encodingObj=obj.getDictionaryObject("Encoding");var descObj=obj.getDictionaryObject("FontDescriptor");if(baseFontObj!=null){baseFont=baseFontObj.name;}else{baseFontObj=obj.getDictionaryObject("Name");if(baseFontObj!=null){baseFont=baseFontObj.name;}}
if(encodingObj!=null){encoding=new PDFFontEncoding(subType,encodingObj);}
if(descObj!=null){descriptor=new PDFFontDescriptor(descObj);}else{descriptor=new PDFFontDescriptor(baseFont);}
if(subType=="Type0"){font=new Type0Font(baseFont,obj,descriptor);}else if(subType=="Type1"){if(descriptor==null){font=new BuiltInFont(baseFont,obj);}else if(descriptor.fontFile!=null){font=new Type1Font(baseFont,obj,descriptor);}else if(descriptor.fontFile3!=null){font=new Type1CFont(baseFont,obj,descriptor);}else{font=new BuiltInFont(baseFont,obj,descriptor);}}else if(subType=="TrueType"){if(descriptor.fontFile2!=null){font=new TTFFont(baseFont,obj,descriptor);}else{font=new BuiltInFont(baseFont,obj,descriptor);}}else if(subType=="Type3"){font=new Type3Font(baseFont,obj,resources,descriptor);}else if(subType=="CIDFontType2"){font=new CIDFontType2(baseFont,obj,descriptor);}else if(subType=="CIDFontType0"){font=new CIDFontType2(baseFont,obj,descriptor);}else{throw"Don't know how to handle a '"+subType+"' font";}
font.subtype=subType;font.encoding=encoding;obj['cachedFont']=font;return font;}
;function OutlineFont(baseFont,fontObj,descriptor){OutlineFont.baseConstructor.call(this,baseFont,descriptor);this.firstChar=-1;this.lastChar=-1;this.widths=null;var firstCharObj=fontObj.getDictionaryObject("FirstChar");var lastCharObj=fontObj.getDictionaryObject("LastChar");var widthArrayObj=fontObj.getDictionaryObject("Widths");if(firstCharObj!=null){this.firstChar=firstCharObj.value;}
if(lastCharObj!=null){this.lastChar=lastCharObj.value;}
if(widthArrayObj!=null){this.widths=[];var size=widthArrayObj.size();for(var i=0;i<size;i++){this.widths[i]=widthArrayObj.get(i).value/1000;}}}
extend(OutlineFont,PDFFont);OutlineFont.prototype.getGlyph=function(src,name){var outline=null;var width=this.getWidth(src,name);if(name!=null){outline=this.getOutlineByName(name,width);}
if(outline==null){outline=this.getOutlineByCode(src,width);}
var advance={'x':width,'y':0};return new PDFGlyph(src,name,outline,advance);}
OutlineFont.prototype.getWidth=function(code,name){var charCode=code.charCodeAt(0)&0xFF;var idx=charCode-this.firstChar;if(idx<0||this.widths==null||idx>=this.widths.length){if(this.descriptor!=null){return this.descriptor.missingWidth;}else{return 0;}}
return this.widths[idx];};OutlineFont.prototype.getDefaultWidth=function(){return 1000;};
;function TTFFont(baseFont,fontObj,descriptor){TTFFont.baseConstructor.call(this,baseFont,fontObj,descriptor);this.font;this.unitsPerEm;var ttfObj=descriptor.fontFile2;if(ttfObj!=null){this.font=TrueTypeFont.parseFont(ttfObj.decode());var head=this.font.getTable("head");this.unitsPerEm=head.unitsPerEm;}else{this.font=null;}}
extend(TTFFont,OutlineFont);TTFFont.prototype.getOutlineByName=function(name,width){var idx;var postTable=this.font.getTable("post");if(postTable!=null){idx=postTable.getGlyphNameIndex(name);if(idx!=0){return this.getOutlineById(idx,width);}
return null;}
var res=AdobeGlyphList.getGlyphNameIndex(name);if(res!=null){idx=res;return this.getOutlineFromCMaps(idx,width);}
return null;};TTFFont.prototype.getOutlineByCode=function(src,width){var cmap=this.font.getTable("cmap");var maps=cmap.getCMaps();for(var i=0;i<maps.length;i++){var idx=maps[i].map(src);if(idx!=0){return this.getOutlineById(idx,width);}}
return this.getOutlineById(0,width);};TTFFont.prototype.getOutlineById=function(glyphId,width){var glyf=this.font.getTable("glyf");var g=glyf.getGlyf(glyphId);var gp=null;if(g instanceof GlyfSimple){gp=this.renderSimpleGlyph(g);}else if(g instanceof GlyfCompound){gp=this.renderCompoundGlyph(glyf,g);}else{gp=new GeneralPath();}
var hmtx=this.font.getTable("hmtx");var advance=hmtx.getAdvance(glyphId)/this.unitsPerEm;var widthfactor=width/advance;var at=AffineTransform.getScaleInstance(1/this.unitsPerEm,1/this.unitsPerEm);at=at.multiply(AffineTransform.getScaleInstance(widthfactor,1));gp.transform(at);return gp;};TTFFont.prototype.getOutlineFromCMaps=function(val,width){var cmap=this.font.getTable("cmap");if(cmap==null){return null;}
var map=cmap.getCMap(3,1);if(map==null){map=cmap.getCMap(1,0);}
var idx=map.map(val);if(idx!=0){return this.getOutlineById(idx,width);}
return null;}
TTFFont.prototype.renderSimpleGlyph=function(g){var curContour=0;var rs=new RenderState();rs.gp=new GeneralPath();for(var i=0;i<g.getNumPoints();i++){var rec=new PointRec(g,i);if(rec.onCurve){this.addOnCurvePoint(rec,rs);}else{this.addOffCurvePoint(rec,rs);}
if(i==g.getContourEndPoint(curContour)){curContour++;if(rs.firstOff!=null){this.addOffCurvePoint(rs.firstOff,rs);}
if(rs.firstOn!=null){this.addOnCurvePoint(rs.firstOn,rs);}
rs.firstOn=null;rs.firstOff=null;rs.prevOff=null;}}
return rs.gp;}
TTFFont.prototype.renderCompoundGlyph=function(glyf,g){var gp=new GeneralPath();for(var i=0;i<g.getNumComponents();i++){var gs=glyf.getGlyph(g.getGlyphIndex(i));var path=this.renderSimpleGlyph(gs);var matrix=g.getTransform(i);path.transform(new AffineTransform(matrix[0],matrix[1],matrix[2],matrix[3],matrix[4],matrix[5]));gp.append(path);}
return gp;}
TTFFont.prototype.addOnCurvePoint=function(rec,rs){if(rs.firstOn==null){rs.firstOn=rec;rs.gp.moveTo(rec.x,rec.y);}else if(rs.prevOff!=null){rs.gp.quadTo(rs.prevOff.x,rs.prevOff.y,rec.x,rec.y);rs.prevOff=null;}else{rs.gp.lineTo(rec.x,rec.y);}}
TTFFont.prototype.addOffCurvePoint=function(rec,rs){if(rs.prevOff!=null){var oc=new PointRec((rec.x+rs.prevOff.x)/2,(rec.y+rs.prevOff.y)/2,true);this.addOnCurvePoint(oc,rs);}else if(rs.firstOn==null){rs.firstOff=rec;}
rs.prevOff=rec;}
function RenderState(){this.gp;this.firstOn;this.firstOff;this.prevOff;}
function PointRec(a,b,c){if(a instanceof GlyfSimple){this.x=a.getXCoord(b);this.y=a.getYCoord(b);this.onCurve=a.onCurve(b);}else{this.x=a;this.y=b;this.onCurve=c;}}
;function TrueTypeFont(type){this.tables={};this.type=type;this.parseDirectories=function(data,numTables){for(var i=0;i<numTables;i++){var tagString=data.read(4);var checksum=data.getInt();var offset=data.getInt();var length=data.getInt();var tableData=data.subStream(offset,length);this.tables[tagString]=tableData;}};this.getTable=function(tagString){var table=this.tables[tagString];if(table==null)
return null;if(table instanceof StreamBuffer){table=TrueTypeTable.createTable(this,tagString,table)
this.tables[tagString]=table;return table;}else{return table;}};}
TrueTypeFont.parseFont=function(stream){var buffer=new StreamBuffer(stream,true);var type=buffer.getInt();var numTables=buffer.getShort();var searchRange=buffer.getShort();var entrySelector=buffer.getShort();var rangeShift=buffer.getShort();var font=new TrueTypeFont(type);font.parseDirectories(buffer,numTables);return font;}
;function PDFFontDescriptor(obj){if(obj instanceof COSDictionary){this.ascent=obj.getDictionaryObject("Ascent").value;this.capHeight=obj.getDictionaryObject("CapHeight").value;this.descent=obj.getDictionaryObject("Descent").value;this.flags=obj.getDictionaryObject("Flags").value;this.fontName=obj.getDictionaryObject("FontName").name;this.italicAngle=obj.getDictionaryObject("ItalicAngle").value;this.stemV=obj.getDictionaryObject("StemV").value;this.avgWidth=getValueOrNull("AvgWidth")||0;this.fontFile=getValueOrNull("FontFile");this.fontFile2=getValueOrNull("FontFile2");this.fontFile3=getValueOrNull("FontFile3");this.leading=getValueOrNull("Leading")||0;this.maxWidth=getValueOrNull("MaxWidth")||0;this.missingWidth=getValueOrNull("MissingWidth")||0;this.stemH=getValueOrNull("StemH")||0;this.xHeight=getValueOrNull("XHeight")||0;this.charSet=getValueOrNull("CharSet");this.fontFamily=getValueOrNull("FontFamily");this.fontWeight=getValueOrNull("FontWeight");this.fontStretch=getValueOrNull("FontStretch");}else{this.fontName=obj;}
function getValueOrNull(key){var test=obj.getDictionaryObject(key);if(test==null)
return null;else if(test instanceof COSNumber)
return test.value;else if(test instanceof COSName)
return test.name;else
return test;}}
PDFFontDescriptor.PLAIN=0;PDFFontDescriptor.BOLD=1;PDFFontDescriptor.ITALIC=2;PDFFontDescriptor.FIXED_PITCH=1<<(1-1);PDFFontDescriptor.SERIF=1<<(2-1);PDFFontDescriptor.SYMBOLIC=1<<(3-1);PDFFontDescriptor.SCRIPT=1<<(4-1);PDFFontDescriptor.NONSYMBOLIC=1<<(6-1);PDFFontDescriptor.ITALIC=1<<(7-1);PDFFontDescriptor.ALLCAP=1<<(17-1);PDFFontDescriptor.SMALLCAP=1<<(18-1);PDFFontDescriptor.FORCEBOLD=1<<(19-1);
;function FontSupport(){}
FontSupport.findName=function(name,table){for(var i=0;i<table.length;i++){if(name==table[i]){return i;}}
return-1;}
FontSupport.getName=function(i){if(i<FontSupport.stdNames.length){return FontSupport.stdNames[i];}else{i-=FontSupport.stdNames.length;if(i<FontSupport.macExtras.length){return FontSupport.macExtras[i];}}
return".notdef";}
FontSupport.stdNames=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"];FontSupport.stdValues=[""," ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","\u00a1","\u00a2","\u00a3","/fraction","\u00a5","Fflorin","\u00a7","\u00a4","\u00b4quotesingle","\u201c","?guillemotleft","\u2039","\u203a","fi","fl","--","\u2020","\u2021","\u00b7","\u00b6","\u2022","'quotesinglbase","\"quotedblbase","\"quotedblright","?guillemotright","...ellipsis","%perthousand","?questiondown","`grave","'acute","^circumflex","~tilde","-macron","?breve","?dotaccent","?dieresis","oring","ccedilla",":hungarumlaut","?ogonek",",caron","---emdash","AE","aordfeminine","LLslash","OOslash","OE","oordmasculine","ae","idotlessi","llslash","ooslash","oe","Bgermandbls","1onesuperior","~logicalnot","?mu","(TM)trademark","?Eth","1/2","+/-","?Thorn","1/4","/divide","|brokenbar","*degree","?thorn","3/4","2twosuperior","(R)","-minus","?eth","*multiply","3threesuperior","(C)","AAacute","AAcircumflex","AAdieresis","AAgrave","AAring","AAtilde","CCcedilla","EEacute","EEcircumflex","EEdieresis","EEgrave","IIacute","IIcircumflex","IIdieresis","IIgrave","NNtilde","OOacute","OOcircumflex","OOdieresis","OOgrave","OOtilde","SScaron","UUacute","UUcircumflex","UUdieresis","UUgrave","YYacute","YYdieresis","ZZcaron","aaacute","aacircumflex","aadieresis","aagrave","aaring","aatilde","cccedilla","eeacute","eecircumflex","eedieresis","eegrave","iiacute","iicircumflex","iidieresis","iigrave","nntilde","ooacute","oocircumflex","oodieresis","oograve","ootilde","sscaron","uuacute","uucircumflex","uudieresis","uugrave","yyacute","yydieresis","zzcaron","!exclamsmall","?Hungarumlautsmall","$dollaroldstyle","$dollarsuperior","&ampersandsmall","'Acutesmall","/parenleftsuperior","\\parenrightsuperior","?twodotenleader","?onedotenleader","0zerooldstyle","1oneoldstyle","2twooldstyle","3threeoldstyle","4fouroldstyle","5fiveoldstyle","6sixoldstyle","7sevenoldstyle","8eightoldstyle","9nineoldstyle","'commasuperior","--threequartersemdash",".periodsuperior","?questionsmall","aasuperior","bbsuperior","ccentsuperior","ddsuperior","eesuperior","iisuperior","llsuperior","mmsuperior","nnsuperior","oosuperior","rrsuperior","sssuperior","ttsuperior","ff","ffi","ffl","\\parenleftinferior","/parenrightinferior","^Circumflexsmall","-hyphensuperior","`Gravesmall","AAsmall","BBsmall","CCsmall","DDsmall","EEsmall","FFsmall","GGsmall","HHsmall","IIsmall","JJsmall","KKsmall","LLsmall","MMsmall","NNsmall","OOsmall","PPsmall","QQsmall","RRsmall","SSsmall","TTsmall","UUsmall","VVsmall","WWsmall","XXsmall","YYsmall","ZZsmall",":colonmonetary","1onefitted","?rupiah","~Tildesmall","!exclamdownsmall","ccentoldstyle","LLslashsmall","SScaronsmall","ZZcaronsmall","?Dieresissmall","?Brevesmall","^Caronsmall","?Dotaccentsmall","?Macronsmall","--figuredash","-hypheninferior","?Ogoneksmall","oRingsmall",",Cedillasmall","?questiondownsmall","1/8oneeighth","3/8threeeighths","5/8fiveeighths","7/8seveneighths","1/3onethird","2/3twothirds","0zerosuperior","4foursuperior","5fivesuperior","6sixsuperior","7sevensuperior","8eightsuperior","9ninesuperior","0zeroinferior","1oneinferior","2twoinferior","3threeinferior","4fourinferior","5fiveinferior","6sixinferior","7seveninferior","8eightinferior","9nineinferior","ccentinferior","$dollarinferior",".periodinferior",",commainferior","AAgravesmall","AAacutesmall","AAcircumflexsmall","AAtildesmall","AAdieresissmall","AAringsmall","AEAEsmall","CCcedillasmall","EEgravesmall","EEacutesmall","EEcircumflexsmall","EEdieresissmall","IIgravesmall","IIacutesmall","IIcircumflexsmall","IIdieresissmall","EthEthsmall","NNtildesmall","OOgravesmall","OOacutesmall","OOcircumflexsmall","OOtildesmall","OOdieresissmall","OEOEsmall","OOslashsmall","UUgravesmall","UUacutesmall","UUcircumflexsmall","UUdieresissmall","YYacutesmall","?Thornsmall","YYdieresissmall","?001.000","?001.001","?001.002","?001.003"," Black"," Bold"," Book"," Light"," Medium"," Regular"," Roman"," Semibold","?NUL","?HT"," LF"," CR","?DLE","?DC1","?DC2","?DC3","?DC4","?RS","?US","!=","?DEL","?infinity","<=",">=","?partialdiff","?summation","xproduct","?pi","?integral","?Omega","?radical","~=","?Delta"," nbspace","?lozenge","?apple"];FontSupport.type1CExpertCharset=[1,229,230,231,232,233,234,235,236,237,238,13,14,15,99,239,240,241,242,243,244,245,246,247,248,27,28,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,109,110,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,158,155,163,319,320,321,322,323,324,325,326,150,164,169,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378];FontSupport.type1CExpertSubCharset=[1,231,232,235,236,237,238,13,14,15,99,239,240,241,242,243,244,245,246,247,248,27,28,249,250,251,253,254,255,256,257,258,259,260,261,262,263,264,265,266,109,110,267,268,269,270,272,300,301,302,305,314,315,158,155,163,320,321,322,323,324,325,326,150,164,169,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346];FontSupport.macExtras=["NUL","HT","LF","CR","DLE","DC1","DC2","DC3","DC4","RS","US","notequal","DEL","infinity","lessequal","greaterequal","partialdiff","summation","product","pi","integral","Omega","radical","approxequal","Delta","nbspace","lozenge","apple"];FontSupport.macRomanEncoding=[391,154,167,140,146,192,221,197,226,392,393,157,162,394,199,228,395,396,397,398,399,155,158,150,163,169,164,160,166,168,400,401,1,2,3,4,5,6,7,104,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,124,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,403,173,175,177,178,186,189,195,200,203,201,202,205,204,206,207,210,208,209,211,214,212,213,215,216,219,217,218,220,222,225,223,224,112,161,97,98,102,116,115,149,165,170,153,125,131,402,138,141,404,156,405,406,100,152,407,408,409,410,411,139,143,412,144,147,123,96,151,413,101,414,415,106,120,121,416,174,176,191,142,148,111,137,105,119,65,8,159,417,227,198,99,103,107,108,109,110,113,114,117,118,122,172,179,171,180,181,182,183,184,185,187,188,418,190,193,194,196,145,126,127,128,129,130,132,133,134,135,136];FontSupport.isoLatin1Encoding=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,166,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,145,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,1,96,97,98,103,100,160,102,131,170,139,106,151,14,165,128,161,156,164,169,125,152,115,114,133,150,143,120,158,155,163,123,174,171,172,176,173,175,138,177,181,178,179,180,185,182,183,184,154,186,190,187,188,191,189,168,141,196,193,194,195,197,157,149,203,200,201,205,202,204,144,206,210,207,208,209,214,211,212,213,167,215,219,216,217,220,218,159,147,225,222,223,224,226,162,227];FontSupport.winAnsiEncoding=[124,125,126,127,128,129,130,131,132,133,134,135,136,145,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,117,101,118,121,112,113,0,122,192,107,142,0,0,0,0,65,8,105,119,116,111,137,0,153,221,108,148,0,0,198,1,96,97,98,103,100,160,102,131,170,139,106,151,14,165,128,161,156,164,169,125,152,115,114,133,150,143,120,158,155,163,123,174,171,172,176,173,175,138,177,181,178,179,180,185,182,183,184,154,186,190,187,188,191,189,168,141,196,193,194,195,197,157,149,203,200,201,205,202,204,144,206,210,207,208,209,214,211,212,213,167,215,219,216,217,220,218,159,147,225,222,223,224,226,162,227];FontSupport.standardEncoding=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0];
;function TrueTypeTable(){}
TrueTypeTable.createTable=function(ttf,tagString,data){var outTable=null;switch(tagString){case"cmap":outTable=new CmapTable();break;case"glyf":outTable=new GlyfTable(ttf);break;case"head":outTable=new HeadTable();break;case"hhea":outTable=new HheaTable();break;case"hmtx":outTable=new HmtxTable(ttf);break;case"loca":outTable=new LocaTable(ttf);break;case"maxp":outTable=new MaxpTable();break;case"name":outTable=new NameTable();break;case"post":outTable=new PostTable();break;default:outTable=new TrueTypeTable(tag);break;}
if(data!=null){outTable.setData(data);}
return outTable;}
;function CmapTable(){this.subTables={};this.setVersion=function(version){this.version=version;};this.setData=function(data){this.setVersion(data.getShort());var numberSubtables=data.getShort();for(var i=0;i<numberSubtables;i++){var platformID=data.getShort();var platformSpecificID=data.getShort();var offset=data.getInt();var mapData=data.subStream(offset);var cMap=CMap.getMap(mapData);if(cMap!=null){this.addCMap(platformID,platformSpecificID,cMap);}}};this.addCMap=function(platformID,platformSpecificID,cMap){this.subTables[""+platformID+platformSpecificID]=cMap;};this.getCMaps=function(){var ret=[];for(var prop in this.subTables){if(this.subTables.hasOwnProperty(prop)){ret.push(this.subTables[prop]);}}
return ret;};this.getCMap=function(platformID,platformSpecificID){return this.subTables[""+platformID+platformSpecificID];}}
;function HeadTable(){this.setData=function(data){this.version=data.getInt();this.fontRevision=data.getInt();this.checksumAdjustment=data.getInt();this.magicNumber=data.getInt();this.flags=data.getShort();this.unitsPerEm=data.getShort();this.created=data.getLong();this.modified=data.getLong();this.xMin=data.getShort();this.xMax=data.getShort();this.yMin=data.getShort();this.yMax=data.getShort();this.macStyle=data.getShort();this.lowestRecPPem=data.getShort();this.fontDirectionHint=data.getShort();this.indexToLocFormat=data.getShort();this.glyphDataFormat=data.getShort();};}
;function MaxpTable(){this.setData=function(data){this.version=data.getInt();this.numGlyphs=data.getShort();this.maxPoints=data.getShort();this.maxContours=data.getShort();this.maxComponentPoints=data.getShort();this.maxComponentContours=data.getShort();this.axZones=data.getShort();this.maxTwilightPoints=data.getShort();this.maxStorage=data.getShort();this.maxFunctionDefs=data.getShort();this.maxInstructionDefs=data.getShort();this.maxStackElements=data.getShort();this.maxSizeOfInstructions=data.getShort();this.maxComponentElements=data.getShort();this.maxComponentDepth=data.getShort();}}
;function LocaTable(ttf){var maxp=ttf.getTable("maxp");var numGlyphs=maxp.numGlyphs;var head=ttf.getTable("head");var format=head.indexToLocFormat;this.isLong=(format==1);this.offsets=[];this.setData=function(data){for(var i=0;i<(numGlyphs+1);i++){if(this.isLong){this.offsets[i]=data.getInt();}else{this.offsets[i]=2*(0xFFFF&data.getShort());}}};this.getSize=function(glyphID){return this.offsets[glyphID+1]-this.offsets[glyphID];}}
;function GlyfTable(ttf){this.loca=ttf.getTable("loca");this.maxp=ttf.getTable("maxp");var numGlyphs=this.maxp.numGlyphs;this.glyfs=[];this.setData=function(data){for(var i=0;i<numGlyphs;i++){var location=this.loca.offsets[i];var length=this.loca.getSize(i);if(length==0){continue;}
this.glyfs[i]=data.subStream(location,length);}};this.getGlyph=this.getGlyf=function(index){var o=this.glyfs[index];if(o==null){return null;}
if(o instanceof StreamBuffer){var g=Glyf.getGlyf(o);this.glyfs[index]=g;return g;}else{return o;}};}
;function HheaTable(){this.setData=function(data){this.version=data.getInt();this.ascent=data.getShort();this.descent=data.getShort();this.lineGap=data.getShort();this.advanceWidthMax=data.getShort();this.minLeftSideBearing=data.getShort();this.minRightSideBearing=data.getShort();this.xMaxExtent=data.getShort();this.caretSlopeRise=data.getShort();this.caretSlopeRun=data.getShort();this.caretOffset=data.getShort();data.getShort();data.getShort();data.getShort();data.getShort();this.metricDataFormat=data.getShort();this.numOfLongHorMetrics=data.getShort();};}
;function HmtxTable(ttf){var maxp=ttf.getTable("maxp");var numGlyphs=maxp.numGlyphs;var hhea=ttf.getTable("hhea");var numOfLongHorMetrics=hhea.numOfLongHorMetrics;this.advanceWidths=[];this.leftSideBearings=[];this.setData=function(data){var i;for(i=0;i<numGlyphs&&data.hasRemaining();i++){if(i<numOfLongHorMetrics){this.advanceWidths[i]=data.getShort();}
this.leftSideBearings[i]=data.getShort();}
if(i<numOfLongHorMetrics){for(var j=i;j<numOfLongHorMetrics;j++)
this.advanceWidths[i]=0;}
if(i<numGlyphs){for(var j=i;j<numGlyphs;j++)
this.leftSideBearings[i]=0;}}
this.getAdvance=function(glyphID){if(glyphID<this.advanceWidths.length){return this.advanceWidths[glyphID];}else{return this.advanceWidths[this.advanceWidths.length-1];}}}
;function PostTable(){this._nameMap;}
PostTable.prototype.setData=function(data){this.format=data.getInt();this.italicAngle=data.getInt();this.underlinePosition=data.getShort();this.underlineThickness=data.getShort();this.isFixedPitch=data.getShort();data.getShort();this.minMemType42=data.getInt();this.maxMemType42=data.getInt();this.minMemType1=data.getInt();this.maxMemType1=data.getInt();switch(this.format){case 0x10000:this._nameMap=new PostMapFormat0();break;case 0x20000:this._nameMap=new PostMapFormat2();break;case 0x30000:this._nameMap=new PostMap();break;default:this._nameMap=new PostMap();System.out.println("Unknown post map type: "+
Integer.toHexString(format));break;}
this._nameMap.setData(data);}
PostTable.prototype.getGlyphNameIndex=function(name){return this._nameMap.getCharIndex(name);}
function PostMap(){}
PostMap.prototype.getCharIndex=function(charName){return 0;}
PostMap.prototype.getCharName=function(charIndex){return null;}
PostMap.prototype.getLength=function(){return 0;}
PostMap.prototype.getData=function(){return ByteBuffer.allocate(0);}
PostMap.prototype.setData=function(data){return;}
function PostMapFormat0(){PostMapFormat0.baseConstructor.call(this);}
extend(PostMapFormat0,PostMap);PostMapFormat0.stdNames=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","ackslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];PostMapFormat0.prototype.getCharIndex=function(charName){var length=PostMapFormat0.stdNames.length;for(var i=0;i<length;i++){if(charName==PostMapFormat0.stdNames[i]){return i;}}
return 0;}
PostMapFormat0.prototype.getCharName=function(charIndex){return PostMapFormat0.stdNames[charIndex];}
PostMapFormat0.prototype.getLength=function(){return 0;}
PostMapFormat0.prototype.getData=function(){return ByteBuffer.allocate(0);}
PostMapFormat0.prototype.setData=function(data){return;}
function PostMapFormat2(){PostMapFormat2.baseConstructor.call(this);this.glyphNameIndex;this.glyphNames;}
extend(PostMapFormat2,PostMapFormat0);PostMapFormat2.prototype.getCharIndex=function(charName){var idx=-1;var glyphNamesLength=this.glyphNames.length;for(var i=0;i<glyphNamesLength;i++){if(charName==this.glyphNames[i]){idx=(PostMapFormat0.stdNames.length+i);break;}}
if(idx==-1){idx=PostMapFormat2.superClass.getCharIndex.call(this,charName);}
var glyphNameIndexLength=this.glyphNameIndex.length;for(var c=0;c<glyphNameIndexLength;c++){if(this.glyphNameIndex[c]==idx){return c;}}
return 0;}
PostMapFormat2.prototype.getCharName=function(charIndex){if(charIndex>=PostMapFormat0.stdNames.length){return this.glyphNames[charIndex-PostMapFormat0.stdNames.length];}
return super.getCharName(charIndex);}
PostMapFormat2.prototype.getLength=function(){var size=2+(2*this.glyphNameIndex.length);var glyphNamesLength=this.glyphNames.length
for(var i=0;i<glyphNamesLength;i++){size+=this.glyphNames[i].length+1;}
return size;}
PostMapFormat2.prototype.setData=function(data){var numGlyphs=data.getShort();this.glyphNameIndex=new Array(numGlyphs);var maxGlyph=257;for(var i=0;i<numGlyphs;i++){this.glyphNameIndex[i]=data.getShort();if(this.glyphNameIndex[i]>maxGlyph){maxGlyph=this.glyphNameIndex[i];}}
maxGlyph-=257;this.glyphNames=new Array(maxGlyph);for(var i=0;i<maxGlyph;i++){var size=data.get();var glyphName="";for(var j=0;j<size;j++){glyphName+=String.fromCharCode(data.get());}
this.glyphNames[i]=glyphName;}}
;function Glyf(){}
Glyf.getGlyf=function(data){var numContours=data.getShort();var g=null;if(numContours==0){g=new Glyf();}else if(numContours==-1){g=new GlyfCompound();}else if(numContours>0){g=new GlyfSimple();}else{throw new IllegalArgumentException("Unknown glyf type: "+
numContours);}
g.numContours=numContours;g.minX=data.getShort();g.minY=data.getShort();g.maxX=data.getShort();g.maxY=data.getShort();g.setData(data);return g;}
;function GlyfSimple(){this.setData=function(data){var contourEndPoints=[];for(var i=0;i<this.numContours;i++){contourEndPoints[i]=data.getShort();}
this.contourEndPoints=contourEndPoints;var numPoints=this.contourEndPoints[this.numContours-1]+1;var numInstructions=data.getShort();var instructions=[];for(var i=0;i<numInstructions;i++){instructions[i]=data.get();}
this.instructions=instructions;var flags=[];for(var i=0;i<numPoints;i++){flags[i]=data.get();if((flags[i]&0x8)!=0){var f=flags[i];var n=(data.get()&0xff);for(var c=0;c<n;c++){flags[++i]=f;}}}
this.flags=flags;var xCoords=[];for(var i=0;i<numPoints;i++){xCoords[i]=0;}
for(var i=0;i<numPoints;i++){if(i>0){xCoords[i]=xCoords[i-1];}
if(this.xIsByte(i)){var val=(data.get()&0xff);if(!this.xIsSame(i)){val=-val;}
xCoords[i]+=val;}else if(!this.xIsSame(i)){xCoords[i]+=data.getShort();}}
this.xCoords=xCoords;var yCoords=[];for(var i=0;i<numPoints;i++){yCoords[i]=0;}
for(var i=0;i<numPoints;i++){if(i>0){yCoords[i]=yCoords[i-1];}
if(this.yIsByte(i)){var val=(data.get()&0xff);if(!this.yIsSame(i)){val=-val;}
yCoords[i]+=val;}else if(!this.yIsSame(i)){yCoords[i]+=data.getShort();}}
this.yCoords=yCoords;};this.xIsByte=function(pointIndex){return((this.flags[pointIndex]&0x2)!=0);}
this.yIsByte=function(pointIndex){return((this.flags[pointIndex]&0x4)!=0);}
this.xIsSame=function(pointIndex){return((this.flags[pointIndex]&0x10)!=0);}
this.yIsSame=function(pointIndex){return((this.flags[pointIndex]&0x20)!=0);}
this.getNumPoints=function(){return this.flags.length;};this.getContourEndPoint=function(index){return this.contourEndPoints[index];}
this.getXCoord=function(pointIndex){return this.xCoords[pointIndex];}
this.getYCoord=function(pointIndex){return this.yCoords[pointIndex];}
this.onCurve=function(pointIndex){return((this.flags[pointIndex]&0x1)!=0);}}
;function CMap(){}
CMap.getMap=function(data){var format=data.getShort();var length=data.getShort();data=data.subStream(0,Math.min(data.getLimit(),length));data.setPosition(4)
var language=data.getShort();var outMap=this.createMap(format,language);if(outMap==null){return null;}
outMap.setData(data.getLimit(),data);return outMap;};CMap.createMap=function(format,language){var outMap=null;switch(format){case 0:outMap=new CMapFormat0(language);break;case 4:outMap=new CMapFormat4(language);break;default:throw"not done with any other CMaps";}
return outMap;}
;function CMapFormat0(languange){this.glyphIndex;}
CMapFormat0.prototype.setData=function(length,data){if(length!=262){throw new IllegalArgumentException("Bad length for CMap format 0");}
var pos=data.getPosition();this.glyphIndex=data;}
CMapFormat0.prototype.map=function(src){var i=src.charCodeAt(0)&0xFF;;return this.glyphIndex.getByteAt(i+6);}
;function CMapFormat4(languange){this.glyphIndex;this.segments={_keys:[],_items:[],remove:function(o){var length=this._keys.length;for(var i=0;i<length;i++){if(this._keys[i].equals(o)){this._keys.splice(i);this.splice(i);break;}}},put:function(key,value){this._keys.push(key);this._items.push(value);},get:function(index){return[this._keys[index],this._items[index]];},size:function(){return this._keys.length;}};}
CMapFormat4.prototype.addSegmentWithDelta=function(startCode,endCode,idDelta){var s=new Segment(startCode,endCode,false);this.segments.remove(s);this.segments.put(s,idDelta);};CMapFormat4.prototype.addSegmentWithMap=function(startCode,endCode,map){if(map.length!=(endCode-startCode)+1){throw new IllegalArgumentException("Wrong number of entries in map");}
var s=new Segment(startCode,endCode,true);this.segments.remove(s);this.segments.put(s,map);};CMapFormat4.prototype.setData=function(length,data){var segCount=data.getShort()/2;var searchRange=data.getShort();var entrySelector=data.getShort();var rangeShift=data.getShort();var endCodes=new Array(segCount);var startCodes=new Array(segCount);var idDeltas=new Array(segCount);var idRangeOffsets=new Array(segCount);var glyphArrayPos=16+(8*segCount);for(var i=0;i<segCount;i++){endCodes[i]=data.getShort();}
data.getShort();for(var i=0;i<segCount;i++){startCodes[i]=data.getShort();}
for(var i=0;i<segCount;i++){idDeltas[i]=data.getShort();}
for(var i=0;i<segCount;i++){idRangeOffsets[i]=data.getShort();if(idRangeOffsets[i]<=0){this.addSegmentWithDelta(startCodes[i],endCodes[i],idDeltas[i]);}else{var offset=(data.getPosition()-2)+idRangeOffsets[i];var size=(endCodes[i]-startCodes[i])+1;var map=new Array(size);var oldOffset=data.getPosition();for(var c=0;c<size;c++){data.setPosition(offset+(c*2));map[c]=data.getChar().charCodeAt(0);}
data.setPosition(oldOffset);this.addSegmentWithMap(startCodes[i],endCodes[i],map);}}}
CMapFormat4.prototype.map=function(src){if(typeof src=="string")
src=src.charCodeAt(0);var size=this.segments.size();for(var i=0;i<size;i++){var keyValue=this.segments.get(i);var s=keyValue[0];var value=keyValue[1];if(s.endCode>=src){if(s.startCode<=src){if(s.hasMap){var map=value;return map[src-s.startCode];}else{var idDelta=value;return(src+idDelta);}}else{return 0;}}}
return 0}
function Segment(startCode,endCode,hasMap){this.endCode=(0xffff&endCode);this.startCode=(0xffff&startCode);this.hasMap=hasMap;}
Segment.prototype.equals=function(o){return(this.compareTo(o)==0);}
Segment.prototype.compareTo=function(o){if(!(o instanceof Segment)){return-1;}
var s=o;if(((s.endCode>=this.startCode)&&(s.endCode<=this.endCode))||((s.startCode>=this.startCode)&&(s.startCode<=this.endCode))){return 0;}if(this.endCode>s.endCode){return 1;}else if(this.endCode<s.endCode){return-1;}else{return 0;}}
;function PDFGlyph(src,name,shape,advance){this.shape=shape;this.advance=advance;this.src=src;this.name=name;}
PDFGlyph.prototype.render=function(graphics,engine){if(this.shape instanceof COSStream){console.warn("todo type3font");}else{if(this.shape.commands!=null){for(var i=0;i<this.shape.commands.length;i++){command=this.shape.commands[i];graphics[command[0]].apply(graphics,command[1]);}}}
return this.advance;}
PDFGlyph.prototype.getChar=function(){return this.src;}
;function GlyfCompound(){this._components;this._instructions;}
GlyfCompound.ARG_1_AND_2_ARE_WORDS=0x1;GlyfCompound.ARGS_ARE_XY_VALUES=0x2;GlyfCompound.ROUND_XY_TO_GRID=0x4;GlyfCompound.WE_HAVE_A_SCALE=0x8;GlyfCompound.MORE_COMPONENTS=0x20;GlyfCompound.WE_HAVE_AN_X_AND_Y_SCALE=0x40;GlyfCompound.WE_HAVE_A_TWO_BY_TWO=0x80;GlyfCompound.WE_HAVE_INSTRUCTIONS=0x100;GlyfCompound.USE_MY_METRICS=0x200;GlyfCompound.OVERLAP_COMPOUND=0x400;GlyfCompound.prototype.setData=function(data){var comps=[];var cur=null;var hasInstructions=false;do{cur=new GlyfComponent();cur.flags=data.getShort();cur.glyphIndex=data.getShort();if(((cur.flags&GlyfCompound.ARG_1_AND_2_ARE_WORDS)!=0)&&((cur.flags&GlyfCompound.ARGS_ARE_XY_VALUES)!=0)){cur.e=data.getShort();cur.f=data.getShort();}else if(!((cur.flags&GlyfCompound.ARG_1_AND_2_ARE_WORDS)!=0)&&((cur.flags&GlyfCompound.ARGS_ARE_XY_VALUES)!=0)){cur.e=data.get();cur.f=data.get();}else if(((cur.flags&GlyfCompound.ARG_1_AND_2_ARE_WORDS)!=0)&&!((cur.flags&GlyfCompound.ARGS_ARE_XY_VALUES)!=0)){cur.compoundPoint=data.getShort();cur.componentPoint=data.getShort();}else{cur.compoundPoint=data.get();cur.componentPoint=data.get();}
if((cur.flags&GlyfCompound.WE_HAVE_A_SCALE)!=0){cur.a=data.getShort()/(1<<14);cur.d=cur.a;}else if((cur.flags&GlyfCompound.WE_HAVE_AN_X_AND_Y_SCALE)!=0){cur.a=data.getShort()/(1<<14);cur.d=data.getShort()/(1<<14);}else if((cur.flags&GlyfCompound.WE_HAVE_A_TWO_BY_TWO)!=0){cur.a=data.getShort()/(1<<14);cur.b=data.getShort()/(1<<14);cur.c=data.getShort()/(1<<14);cur.d=data.getShort()/(1<<14);}
if((cur.flags&GlyfCompound.WE_HAVE_INSTRUCTIONS)!=0){hasInstructions=true;}
comps.push(cur);}while((cur.flags&GlyfCompound.MORE_COMPONENTS)!=0);this._components=comps;var instr=null;if(hasInstructions){var numInstructions=data.getShort();instr=new Array(numInstructions);for(var i=0;i<numInstructions;i++){instr[i]=data.get();}}else{instr=[];}
this._instructions=instr;};GlyfCompound.prototype.getNumComponents=function(){return this._components.length;}
GlyfCompound.prototype.getGlyphIndex=function(index){return this._components[index].glyphIndex;}
GlyfCompound.prototype.getTransform=function(index){var gc=this._components[index];var m=Math.max(Math.abs(gc.a),Math.abs(gc.b));if(Math.abs(Math.abs(gc.a)-Math.abs(gc.c))<(33/65536)){m*=2;}
var n=Math.max(Math.abs(gc.c),Math.abs(gc.d));if(Math.abs(Math.abs(gc.c)-Math.abs(gc.d))<(33/65536)){n*=2;}
var e=m*gc.e;var f=n*gc.f;return[gc.a,gc.b,gc.c,gc.d,e,f];}
function GlyfComponent(){}
;function PSParser(data,start){this.data=data;this.loc=start;this.readThing=function(){while(this.isWhiteSpace(data[this.loc])){this.loc++;}
var start=this.loc;var s="";while(!this.isWhiteSpace(data[this.loc])){s+=String.fromCharCode(data[this.loc]);this.loc++;if(!this.isRegularCharacter(data[this.loc])){break;}}
return s;}
this.readArray=function(count){var ary=[];var idx=0;while(idx<count){var thing=this.readThing();if(thing.charAt(0)=='['){thing=thing.substring(1);}
if(thing.charAt(thing.length-1)=="]"){thing=thing.substring(0,thing.length-1);}
if(thing.length>0){ary[idx++]=parseFloat(thing);}}
return ary;}
this.getLoc=function(){return this.loc;}
this.setLoc=function(loc){this.loc=loc;}
this.getNEncodedBytes=function(n,key,skip){var result=Type1Font.decrypt(this.data,this.loc,this.loc+n,key,skip);this.loc+=n;return result;}
this.isRegularCharacter=function(c){return!(this.isWhiteSpace(c)||this.isDelimiter(c));}
this.isDelimiter=function(c){c=String.fromCharCode(c);switch(c){case'(':case')':case'<':case'>':case'[':case']':case'{':case'}':case'/':case'%':return true;default:return false;}}
this.isWhiteSpace=function(c){c=String.fromCharCode(c);switch(c){case'\t':case'\n':case'\r':case' ':return true;default:return false;}}}
;function CIDFontType2(baseFont,fontObj,descriptor){CIDFontType2.baseConstructor.call(this,baseFont,fontObj,descriptor);this.widths=null;this.widthsVertical=null;this.defaultWidth=1000;this.defaultWidthVertical=1000;this.parseWidths(fontObj);var systemInfoObj=fontObj.getDictionaryObject("CIDSystemInfo");var mapObj=fontObj.getDictionaryObject("CIDToGIDMap");if(mapObj!=null&&(mapObj instanceof COSStream)){throw new UnimplementedException("Haven't finished cid to gid map for CID font");this.cidToGidMap=mapObj.getStreamBuffer();}}
extend(CIDFontType2,TTFFont);CIDFontType2.prototype.parseWidths=function(fontObj){var defaultWidthObj=fontObj.getDictionaryObject("DW");if(defaultWidthObj!=null){this.defaultWidth=defaultWidthObj.value;}
var entryIdx=0;var first=0;var last=0;var widthArray;var widthObj=fontObj.getDictionaryObject("W");if(widthObj!=null){this.widths={};widthArray=widthObj;var widthArraySize=widthArray.size();for(var i=0;i<widthArraySize;i++){if(entryIdx==0){first=widthArray.getObject(i).value;}else if(entryIdx==1){if(widthArray.getObject(i)instanceof COSArray){var entries=widthArray.getObject(i);for(var c=0;c<entries.size();c++){var key=c+first;var value=entries.getObject(c).value;this.widths[key]=value;}
entryIdx=-1;}else{last=getObject(i).value;}}else{var value=widthArray.getObject(i).value;for(var c=first;c<=last;c++){this.widths[c]=value;}
entryIdx=-1;}
entryIdx++;}}
defaultWidthObj=fontObj.getDictionaryObject("DW2");if(defaultWidthObj!=null){this.defaultWidthVertical=defaultWidthObj.value;}
widthObj=fontObj.getDictionaryObject("W2");if(widthObj!=null){this.widthsVertical={};widthArray=widthObj;var widthArraySize=widthArray.size();entryIdx=0;first=0;last=0;for(var i=0;i<widthArraySize;i++){if(entryIdx==0){first=widthArray.getObject(i).value;}else if(entryIdx==1){if(widthArray.getObject(i)instanceof COSArray){var entries=widthArray.getObject(i);for(var c=0;c<entries.size();c++){var key=c+first;var value=entries.getObject(c).value;this.widthsVertical[key]=value;}
entryIdx=-1;}else{last=getObject(i).value;}}else{var value=getObject(i).value;for(var c=first;c<=last;c++){this.widthsVertical[c]=value;}
entryIdx=-1;}
entryIdx++;}}}
CIDFontType2.prototype.getDefaultWidth=function(){return this.defaultWidth;}
;function Type0Font(baseFont,fontObj,descriptor){Type0Font.baseConstructor.call(this,baseFont,fontObj,descriptor);var descendantFonts=fontObj.getDictionaryObject("DescendantFonts");var size=descendantFonts.size();this.fonts=new Array(size);for(var i=0;i<size;i++){this.fonts[i]=PDFFont.getFont(descendantFonts.getObject(i),null);}}
extend(Type0Font,PDFFont);
;function Type1Font(baseFont,fontObj,descriptor){Type1Font.baseConstructor.call(this,baseFont,fontObj,descriptor);this.name2width;this.char2name;this.password=0;this.at;this.subrs;this.lenIV;this.name2outline;this.stack=[];this.sloc=0;this.psStack=[];this.psLoc=0;this.callcount=0;if(descriptor!=null&&descriptor.fontFile!=null){var start=descriptor.fontFile.dictionary.getDictionaryObject("Length1").value;var len=descriptor.fontFile.dictionary.getDictionaryObject("Length2").value;var font=new StreamBuffer(descriptor.fontFile.decode());this.parseFontFromStream(font,start,len);}}
extend(Type1Font,OutlineFont);Type1Font.prototype.parseFontFromStream=function(font,start,len){this.name2width={};var data=null;if(this.isASCII(font,start)){throw"not done in type1font ascii";}else{data=Type1Font.decrypt(font,start,start+len,55665,4);}
var fontArray=[];var i=0;while(font.hasRemaining())
{font.setPosition(i);fontArray.push(font.getByteAt(i++));}
this.chr2name=this.readEncoding(fontArray);var lenIVLoc=this.findSlashName(data,"lenIV");var psp=new PSParser(data,0);if(lenIVLoc<0){this.lenIV=4;}else{psp.setLoc(lenIVLoc+6);this.lenIV=parseInt(psp.readThing());}
this.password=4330;var matrixloc=this.findSlashName(fontArray,"FontMatrix");if(matrixloc<0){System.out.println("No FontMatrix!");this.at=new AffineTransform(0.001,0,0,0.001,0,0);}else{var psp2=new PSParser(fontArray,matrixloc+11);var xf=psp2.readArray(6);this.at=new AffineTransform(xf[0],xf[1],xf[2],xf[3],xf[4],xf[5]);}
this.subrs=this.readArray(data,"Subrs","index");this.name2outline=this.readChars(data);};Type1Font.prototype.isASCII=function(data,start){for(var i=start;i<start+4;i++){var c=data.getByteAt(i);if(c>='0'&&c<='9'){continue;}else if(c>='a'&&c<='f'){continue;}else if(c>='A'&&c<='F'){continue;}else{return false;}}};Type1Font.prototype.readEncoding=function(d){var ary=this.readArray(d,"Encoding","def");return ary;}
Type1Font.prototype.readArray=function(d,key,end){var i=this.findSlashName(d,key);if(i<0){return[[]];}
var psp=new PSParser(d,i);var type=psp.readThing();var val;type=psp.readThing();if(type=="StandardEncoding"){var stdenc=[];var length=FontSupport.standardEncoding.length;for(i=0;i<length;i++){stdenc[i]=FontSupport.getName(FontSupport.standardEncoding[i]);}
return stdenc;}
var len=parseInt(type);var out=[];var line;while(true){var s=psp.readThing();if(s=="dup"){var id=parseInt(psp.readThing());var elt=psp.readThing();line=getBytes(elt);if(isDigit(elt.charAt(0))){var hold=parseInt(elt);var special=psp.readThing();if(special=="-|"||special=="RD"){psp.setLoc(psp.getLoc()+1);line=psp.getNEncodedBytes(hold,this.password,this.lenIV);}}
out[id]=line;}else if(s==end){break;}}
return out;}
Type1Font.prototype.findSlashName=function(d,name){var i;for(i=0;i<d.length;i++){if(d[i]=='/'.charCodeAt(0)){var found=true;for(var j=0;j<name.length;j++){if(d[i+j+1]!=name.charCodeAt(j)){found=false;break;}}
if(found){return i;}}}
return-1;}
Type1Font.prototype.readChars=function(d){var hm={};var i=this.findSlashName(d,"CharStrings");if(i<0){return hm;}
var psp=new PSParser(d,i);while(true){var s=psp.readThing();var c=s.charAt(0);if(c=='/'){var len=parseInt(psp.readThing());var go=psp.readThing();if(go=="-|"||go=="RD"){psp.setLoc(psp.getLoc()+1);var line=psp.getNEncodedBytes(len,this.password,this.lenIV);hm[s.substring(1)]=line;}}else if(s=="end"){break;}}
return hm;}
Type1Font.prototype.getWidth=function(code,name){if(this.firstChar==-1||this.lastChar==-1){var key=this.chr2name[toSignedByte(code)];if(name!=null){key=name;}
if(key!=null&&this.name2outline[key]!=null){if(this.name2width[key]==null){this.getOutlineByName(key,0);}
var width=this.name2width[key];if(width!=null){return width.x/this.getDefaultWidth();}}
return 0;}
return Type1Font.superClass.getWidth.call(this,code,name);}
Type1Font.prototype.getOutlineByName=function(name,width){if(name==null||this.name2outline[name]==null){name=".notdef";}
var obj=this.name2outline[name];if(obj instanceof GeneralPath){return obj;}else{var cs=obj;var advance={};var gp=this.parseGlyph(cs,advance,this.at);if(width!=0&&advance.x!=0){var p={"x":advance.x,"y":advance.y};p=this.at.transform(p);var scale=width/p.x;var xform=AffineTransform.getScaleInstance(scale,1.0);gp.transform(xform);}
this.name2outline[name]=gp;this.name2width[name]=advance;return gp;}};Type1Font.prototype.getOutlineByCode=function(src,width){return this.getOutlineByName(this.chr2name[toSignedByte(src)],width);}
Type1Font.prototype.parseGlyph=function(cs,advance,at){var gp=new GeneralPath();var curpoint={"x":null,"y":null};this.sloc=0;this.parse(cs,gp,curpoint,advance);gp.transform(at);return gp;};Type1Font.prototype.pop=function(){var val=0;if(this.sloc>0){val=this.stack[--this.sloc];}
return val;}
Type1Font.prototype.buildAccentChar=function(x,y,a,b,gp){console.warn("build aaccent char not finished yet");}
Type1Font.prototype.parse=function(cs,gp,pt,wid){var loc=0;var x1,x2,x3,y1,y2,y3;while(loc<cs.length){var v=cs[loc++]&0xff;if(v==255){this.stack[this.sloc++]=(((cs[loc])&0xff)<<24)+
(((cs[loc+1])&0xff)<<16)+
(((cs[loc+2])&0xff)<<8)+
(((cs[loc+3])&0xff));loc+=4;}else if(v>=251){this.stack[this.sloc++]=-((v-251)<<8)-((cs[loc])&0xff)-108;loc++;}else if(v>=247){this.stack[this.sloc++]=((v-247)<<8)+((cs[loc])&0xff)+108;loc++;}else if(v>=32){this.stack[this.sloc++]=v-139;}else{switch(v){case 0:throw new RuntimeException("Bad command ("+v+")");case 1:this.sloc=0;break;case 2:throw new RuntimeException("Bad command ("+v+")");case 3:this.sloc=0;break;case 4:pt.y+=this.pop();gp.moveTo(pt.x,pt.y);this.sloc=0;break;case 5:pt.y+=this.pop();pt.x+=this.pop();gp.lineTo(pt.x,pt.y);this.sloc=0;break;case 6:pt.x+=this.pop();gp.lineTo(pt.x,pt.y);this.sloc=0;break;case 7:pt.y+=this.pop();gp.lineTo(pt.x,pt.y);this.sloc=0;break;case 8:y3=this.pop();x3=this.pop();y2=this.pop();x2=this.pop();y1=this.pop();x1=this.pop();gp.curveTo(pt.x+x1,pt.y+y1,pt.x+x1+x2,pt.y+y1+y2,pt.x+x1+x2+x3,pt.y+y1+y2+y3);pt.x+=x1+x2+x3;pt.y+=y1+y2+y3;this.sloc=0;break;case 9:gp.closePath();this.sloc=0;break;case 10:var n=this.pop();if(this.subrs[n]==null){System.out.println("No subroutine #"+n);}else{this.callcount++;if(this.callcount>10){System.out.println("Call stack too large");}else{this.parse(this.subrs[n],gp,pt,wid);}
this.callcount--;}
break;case 11:return;case 12:v=(cs[loc++])&0xff;if(v==6){var b=this.pop();var a=this.pop();var y=this.pop();var x=this.pop();this.buildAccentChar(x,y,a,b,gp);this.sloc=0;}else if(v==7){wid.y=this.pop();wid.x=this.pop();pt.y=this.pop();pt.x=this.pop();this.sloc=0;}else if(v==12){var b=this.pop();var a=this.pop();this.stack[this.sloc++]=a/b;}else if(v==33){pt.y=this.pop();pt.x=this.pop();gp.moveTo(pt.x,pt.y);this.sloc=0;}else if(v==0){this.sloc=0;}else if(v==1){this.sloc=0;}else if(v==2){this.sloc=0;}else if(v==16){var cn=this.pop();var countargs=this.pop();switch(cn){case 0:this.psStack[this.psLoc++]=this.pop();this.psStack[this.psLoc++]=this.pop();this.pop();break;case 3:this.psStack[this.psLoc++]=3;break;default:for(var i=0;i>countargs;i--){this.psStack[this.psLoc++]=this.pop();}
break;}}else if(v==17){this.stack[this.sloc++]=this.psStack[this.psLoc-1];this.psLoc--;}else{throw new RuntimeException("Bad command ("+v+")");}
break;case 13:wid.x=this.pop();wid.y=0;pt.x=this.pop();pt.y=0;this.sloc=0;break;case 14:break;case 15:case 16:case 17:case 18:case 19:case 20:throw new RuntimeException("Bad command ("+v+")");case 21:pt.y+=this.pop();pt.x+=this.pop();gp.moveTo(pt.x,pt.y);this.sloc=0;break;case 22:pt.x+=this.pop();gp.moveTo(pt.x,pt.y);this.sloc=0;break;case 23:case 24:case 25:case 26:case 27:case 28:case 29:throw new RuntimeException("Bad command ("+v+")");case 30:x3=this.pop();y2=this.pop();x2=this.pop();y1=this.pop();x1=y3=0;gp.curveTo(pt.x,pt.y+y1,pt.x+x2,pt.y+y1+y2,pt.x+x2+x3,pt.y+y1+y2);pt.x+=x2+x3;pt.y+=y1+y2;this.sloc=0;break;case 31:y3=this.pop();y2=this.pop();x2=this.pop();x1=this.pop();y1=x3=0;gp.curveTo(pt.x+x1,pt.y,pt.x+x1+x2,pt.y+y2,pt.x+x1+x2,pt.y+y2+y3);pt.x+=x1+x2;pt.y+=y2+y3;this.sloc=0;break;}}}}
Type1Font.decrypt=function(d,start,end,key,skip){if(end-start-skip<0){skip=0;}
var o=[];var r=key;var ipos;var c1=52845;var c2=22719;for(ipos=start;ipos<end;ipos++){var c;if(d instanceof StreamBuffer)
c=d.getByteAt(ipos)&0xff;else
c=d[ipos]&0xff;var p=(c^(r>>8))&0xff;r=((c+r)*c1+c2)&0xffff;if(ipos-start-skip>=0){if(p>127)
p=p-256;else
p=p;o[ipos-start-skip]=p;}}
return o;}
;function Type1CFont(baseFont,fontObj,descriptor){Type1CFont.baseConstructor.call(this,baseFont,fontObj,descriptor);this.pos=0;this.data=new StreamBuffer(descriptor.fontFile3.decode());this.gsubrbase=0;this.lsubrbase=0;this.gsubrsoffset=0;this.lsubrsoffset=0;this.num;this.type;this.charstringtype;this.stack=[];this.stackptr=0;this.myEncoding=[];this.at=new AffineTransform(0.001,0,0,0.001,0,0);this.charstringtype=2;this.charsetbase=0;this.encodingbase=0;this.charstringbase=0;this.privatebase=0;this.privatesize=0;this.gsubrbase=0;this.lsubrbase=0;this.gsubrsoffset=0;this.lsubrsoffset=0;this.nglyphs=1;this.parse();}
extend(Type1CFont,OutlineFont);Type1CFont.CMD=0;Type1CFont.NUM=1;Type1CFont.FLT=2;var temp={parse:function(){var majorVersion=this.readByte();var minorVersion=this.readByte();var hdrsz=this.readByte();var offsize=this.readByte();var fnames=hdrsz;var topdicts=fnames+this.getIndexSize(fnames);var theNames=topdicts+this.getIndexSize(topdicts);this.gsubrbase=theNames+this.getIndexSize(theNames);this.gsubrsoffset=this.calcoffset(this.gsubrbase);this.readNames(theNames);this.pos=topdicts;this.data.setPosition(this.pos);if(this.readInt(2)!=1){throw"More than one font in this file!";}
var r=this.getIndexEntry(fnames,0);var p=this.pos;this.data.setPosition(r.start);this.fontname=this.data.read(r.len);this.data.setPosition(this.pos);this.readDict(this.getIndexEntry(topdicts,0));this.readDict({start:this.privatebase,len:this.privatesize});this.pos=this.charstringbase;this.data.setPosition(this.pos);this.nglyphs=this.readInt(2);this.readGlyphNames(this.charsetbase);this.readEncodingData(this.encodingbase);},getIndexSize:function(loc){var hold=this.pos;this.pos=loc;this.data.setPosition(loc);var count=this.readInt(2);if(count<=0){return 2;}
var encsz=this.readByte();if(encsz<1||encsz>4){throw new Exception("Offsize: "+encsz+", must be in range 1-4.");}
this.pos+=count*encsz;this.data.setPosition(this.pos);var end=this.readInt(encsz);this.pos=hold;this.data.setPosition(hold);return 2+(count+1)*encsz+end;},readByte:function(){this.pos++;return this.data.get();},readInt:function(len){var n=0;for(var i=0;i<len;i++){this.pos++;n=(n<<8)|(this.data.get()&0xff);}
return n;},calcoffset:function(base){var len=this.getTableLength(base);if(len<1240){return 107;}else if(len<33900){return 1131;}else{return 32768;}},getTableLength:function(loc){var hold=this.pos;this.pos=loc;this.data.setPosition(this.pos);var count=this.readInt(2);if(count<=0){return 2;}
this.pos=hold;this.data.setPosition(this.pos);return count;},readNames:function(base){this.pos=base;this.data.setPosition(this.pos);var nextra=this.readInt(2);this.names=[];var p=this.data.getPosition();for(var i=0;i<nextra;i++){var r=this.getIndexEntry(base,i);this.data.setPosition(r.start);this.names.push(this.data.read(r.len));}
this.data.setPosition(p);},getIndexEntry:function(index,id){var hold=this.pos;this.pos=index;this.data.setPosition(this.pos);var count=this.readInt(2);var encsz=this.readByte();if(encsz<1||encsz>4){throw new Exception("Offsize: "+encsz+", must be in range 1-4.");}
this.pos+=encsz*id;this.data.setPosition(this.pos);var from=this.readInt(encsz);var r={start:from+2+index+encsz*(count+1),len:this.readInt(encsz)-from};this.pos=hold;this.data.setPosition(this.pos);return r;},readDict:function(r){this.pos=r.start;this.data.setPosition(this.pos);var end=r.len+r.start;while(this.pos<end){var cmd=this.readCommand(false);if(cmd==1006){this.charstringtype=this.stack[0];}else if(cmd==1007){if(this.stackptr==4){this.at=new AffineTransform(this.stack[0],this.stack[1],this.stack[2],this.stack[3],0,0);}else{this.at=new AffineTransform(this.stack[0],this.stack[1],this.stack[2],this.stack[3],this.stack[4],this.stack[5]);}}else if(cmd==15){this.charsetbase=this.stack[0];}else if(cmd==16){this.encodingbase=this.stack[0];}else if(cmd==17){this.charstringbase=this.stack[0];}else if(cmd==18){this.privatesize=this.stack[0];this.privatebase=this.stack[1];}else if(cmd==19){this.lsubrbase=this.privatebase+this.stack[0];this.lsubrsoffset=this.calcoffset(this.lsubrbase);}
this.stackptr=0;}
this.data.setPosition(this.pos);},readCommand:function(charstring){while(true){var t=this.readNext(charstring);if(t==Type1CFont.CMD){return this.num;}else{this.stack[this.stackptr++]=(t==Type1CFont.NUM)?this.num:this.fnum;}}},readNext:function(charstring){this.num=this.data.getByteAt(this.pos++);if(this.num==30&&!charstring){this.readFNum();return this.type=Type1CFont.FLT;}else if(this.num==28){this.num=(this.data.getAt(this.pos)<<8)+(this.data.getByteAt(this.pos+1)&0xff);this.pos+=2;return this.type=Type1CFont.NUM;}else if(this.num==29&&!charstring){this.num=((this.data.getByteAt(this.pos)&0xff)<<24)|((this.data.getByteAt(this.pos+1)&0xff)<<16)|((this.data.getByteAt(this.pos+2)&0xff)<<8)|((this.data.getByteAt(this.pos+3)&0xff));this.pos+=4;return this.type=Type1CFont.NUM;}else if(this.num==12){this.num=1000+(this.data.getByteAt(this.pos)&0xff);this.pos++;return this.type=Type1CFont.CMD;}else if(this.num<32){return this.type=Type1CFont.CMD;}else if(this.num<247){this.num-=139;return this.type=Type1CFont.NUM;}else if(this.num<251){this.num=(this.num-247)*256+(this.data.getByteAt(this.pos)&0xff)+108;this.pos++;return this.type=Type1CFont.NUM;}else if(this.num<255){this.num=-(this.num-251)*256-(this.data.getByteAt(this.pos)&0xff)-108;this.pos++;return this.type=Type1CFont.NUM;}else if(!charstring){printData();throw new RuntimeException("Got a 255 code while reading dict");}else{this.fnum=(((this.data.getByteAt(this.pos)&0xff)<<24)|((this.data.getByteAt(this.pos+1)&0xff)<<16)|((this.data.getByteAt(this.pos+2)&0xff)<<8)|((this.data.getByteAt(this.pos+3)&0xff)))/65536;this.pos+=4;return this.type=Type1CFont.FLT;}},readFNum:function(){var f=0;var neg=false;var exp=0;var eval=0;var mul=1;this.data.setPosition(this.pos);var work=this.readByte();while(true){if(work==0xdd){work=this.readByte();}
var nyb=(work>>4)&0xf;work=((work<<4)|0xd)&0xff;if(nyb<10){if(exp!=0){eval=eval*10+nyb;}else if(mul==1){f=f*10+nyb;}else{f+=nyb*mul;mul/=10;}}else if(nyb==0xa){mul=0.1;}else if(nyb==0xb){exp=1;}else if(nyb==0xc){exp=-1;}else if(nyb==0xe){neg=true;}else{break;}}
this.fnum=(neg?-1:1)*f*Math.pow(10,eval*exp);},readGlyphNames:function(base){if(base==0){this.glyphnames=new Array(229);for(var i=0;i<229;i++){this.glyphnames[i]=i;}
return;}else if(base==1){this.glyphnames=FontSupport.type1CExpertCharset;return;}else if(base==2){this.glyphnames=FontSupport.type1CExpertSubCharset;return;}
this.glyphnames=[];this.glyphnames[0]=0;this.pos=base;this.data.setPosition(this.pos);var t=this.readByte();if(t==0){for(var i=1;i<this.nglyphs;i++){this.glyphnames[i]=this.readInt(2);}}else if(t==1){var n=1;while(n<this.nglyphs){var sid=this.readInt(2);var range=this.readByte()+1;for(var i=0;i<range;i++){this.glyphnames[n++]=sid++;}}}else if(t==2){var n=1;while(n<this.nglyphs){var sid=this.readInt(2);var range=this.readInt(2)+1;for(var i=0;i<range;i++){ths.glyphnames[n++]=sid++;}}}},readEncodingData:function(base){if(base==0){this.myEncoding=FontSupport.standardEncoding;}else if(base==1){System.out.println("**** EXPERT ENCODING!");}else{this.pos=base;this.data.setPosition(this.pos);var encodingtype=this.readByte();if((encodingtype&127)==0){var ncodes=this.readByte();for(var i=1;i<ncodes+1;i++){var idx=this.readByte()&0xff;this.myEncoding[idx]=i;}}else if((encodingtype&127)==1){var nranges=this.readByte();var p=1;for(var i=0;i<nranges;i++){var start=this.readByte();var more=this.readByte();for(var j=start;j<start+more+1;j++){this.myEncoding[j]=p++;}}}else{System.out.println("Bad encoding type: "+encodingtype);}}},getOutlineByName:function(name,width){var index=this.getNameIndex(name);for(var i=0;i<this.glyphnames.length;i++){if(this.glyphnames[i]==index){return this.readGlyph(this.charstringbase,i);}}
return this.readGlyph(this.charstringbase,0);},getOutlineByCode:function(src,width){var index=toSignedByte(src);if(this.encodingbase==0||this.encodingbase==1){for(var i=0;i<this.glyphnames.length;i++){if(this.glyphnames[i]==this.myEncoding[index]){return this.readGlyph(this.charstringbase,i);}}}else{if(index>0&&index<this.myEncoding.length){return this.readGlyph(this.charstringbase,this.myEncoding[index]);}}
return this.readGlyph(this.charstringbase,0);},getNameIndex:function(name){var val=FontSupport.findName(name,FontSupport.stdNames);if(val==-1){val=FontSupport.findName(name,this.names)+FontSupport.stdNames.length;}
if(val==-1){val=0;}
return val;},readGlyph:function(base,offset){var pt={x:0,y:0,open:false};var r=this.getIndexEntry(base,offset);var gp=new GeneralPath();var hold=this.pos;this.stackptr=0;this.parseGlyph(r,gp,pt);this.pos=hold;this.data.setPosition(this.pos);gp.transform(this.at);return gp;},parseGlyph:function(r,gp,pt){this.pos=r.start;var i;var x1,y1,x2,y2,x3,y3,ybase;var hold;var stemhints=0;var end=r.start+r.len;while(this.pos<end){var cmd=this.readCommand(true);hold=0;switch(cmd){case 1:case 3:this.stackptr=0;break;case 4:if(this.stackptr>1){this.stack[0]=this.stack[1];}
pt.y+=this.stack[0];if(pt.open){gp.closePath();}
pt.open=false;gp.moveTo(pt.x,pt.y);this.stackptr=0;break;case 5:for(i=0;i<this.stackptr;){pt.x+=this.stack[i++];pt.y+=this.stack[i++];gp.lineTo(pt.x,pt.y);}
pt.open=true;this.stackptr=0;break;case 6:for(i=0;i<this.stackptr;){if((i&1)==0){pt.x+=this.stack[i++];}else{pt.y+=this.stack[i++];}
gp.lineTo(pt.x,pt.y);}
pt.open=true;this.stackptr=0;break;case 7:for(i=0;i<this.stackptr;){if((i&1)==0){pt.y+=this.stack[i++];}else{pt.x+=this.stack[i++];}
gp.lineTo(pt.x,pt.y);}
pt.open=true;this.stackptr=0;break;case 8:for(i=0;i<this.stackptr;){x1=pt.x+this.stack[i++];y1=pt.y+this.stack[i++];x2=x1+this.stack[i++];y2=y1+this.stack[i++];pt.x=x2+this.stack[i++];pt.y=y2+this.stack[i++];gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);}
pt.open=true;this.stackptr=0;break;case 10:hold=this.pos;i=this.stack[--this.stackptr]+this.lsubrsoffset;var lsubr=this.getIndexEntry(this.lsubrbase,i);this.parseGlyph(lsubr,gp,pt);this.pos=hold;break;case 11:return;case 14:if(this.stackptr==5){console.warn('build asccent char not done');}
if(pt.open){gp.closePath();}
pt.open=false;this.stackptr=0;break;case 18:stemhints+=Math.floor(this.stackptr/2);this.stackptr=0;break;case 19:case 20:stemhints+=Math.floor(this.stackptr/2);this.pos+=Math.floor((stemhints-1)/8+1);this.stackptr=0;break;case 21:if(this.stackptr>2){this.stack[0]=this.stack[1];this.stack[1]=this.stack[2];}
pt.x+=this.stack[0];pt.y+=this.stack[1];if(pt.open){gp.closePath();}
gp.moveTo(pt.x,pt.y);pt.open=false;this.stackptr=0;break;case 22:if(this.stackptr>1){this.stack[0]=this.stack[1];}
pt.x+=this.stack[0];if(pt.open){gp.closePath();}
gp.moveTo(pt.x,pt.y);pt.open=false;this.stackptr=0;break;case 23:stemhints+=this.stackptr/2;this.stackptr=0;break;case 24:for(i=0;i<this.stackptr-2;){x1=pt.x+this.stack[i++];y1=pt.y+this.stack[i++];x2=x1+this.stack[i++];y2=y1+this.stack[i++];pt.x=x2+this.stack[i++];pt.y=y2+this.stack[i++];gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);}
pt.x+=this.stack[i++];pt.y+=this.stack[i++];gp.lineTo(pt.x,pt.y);pt.open=true;this.stackptr=0;break;case 25:for(i=0;i<this.stackptr-6;){pt.x+=this.stack[i++];pt.y+=this.stack[i++];gp.lineTo(pt.x,pt.y);}
x1=pt.x+this.stack[i++];y1=pt.y+this.stack[i++];x2=x1+this.stack[i++];y2=y1+this.stack[i++];pt.x=x2+this.stack[i++];pt.y=y2+this.stack[i++];gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);pt.open=true;this.stackptr=0;break;case 26:i=0;if((this.stackptr&1)==1){pt.x+=this.stack[i++];}
while(i<this.stackptr){x1=pt.x;y1=pt.y+this.stack[i++];x2=x1+this.stack[i++];y2=y1+this.stack[i++];pt.x=x2;pt.y=y2+this.stack[i++];gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);}
pt.open=true;this.stackptr=0;break;case 27:i=0;if((this.stackptr&1)==1){pt.y+=this.stack[i++];}
while(i<this.stackptr){x1=pt.x+this.stack[i++];y1=pt.y;x2=x1+this.stack[i++];y2=y1+this.stack[i++];pt.x=x2+this.stack[i++];pt.y=y2;gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);}
pt.open=true;this.stackptr=0;break;case 29:hold=this.pos;i=this.stack[--this.stackptr]+this.gsubrsoffset;var gsubr=this.getIndexEntry(this.gsubrbase,i);this.parseGlyph(gsubr,gp,pt);this.pos=hold;break;case 30:hold=4;case 31:for(i=0;i<this.stackptr;){var hv=(((i+hold)&4)==0);x1=pt.x+(hv?this.stack[i++]:0);y1=pt.y+(hv?0:this.stack[i++]);x2=x1+this.stack[i++];y2=y1+this.stack[i++];pt.x=x2+(hv?0:this.stack[i++]);pt.y=y2+(hv?this.stack[i++]:0);if(i==this.stackptr-1){if(hv){pt.x+=this.stack[i++];}else{pt.y+=this.stack[i++];}}
gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);}
pt.open=true;this.stackptr=0;break;case 1000:this.stackptr=0;break;case 1003:x1=this.stack[--this.stackptr];y1=this.stack[--this.stackptr];this.stack[this.stackptr++]=((x1!=0)&&(y1!=0))?1:0;break;case 1004:x1=this.stack[--this.stackptr];y1=this.stack[--this.stackptr];this.stack[this.stackptr++]=((x1!=0)||(y1!=0))?1:0;break;case 1005:x1=this.stack[--this.stackptr];this.stack[this.stackptr++]=(x1==0)?1:0;break;case 1009:this.stack[this.stackptr-1]=Math.abs(this.stack[this.stackptr-1]);break;case 1010:x1=this.stack[--this.stackptr];y1=this.stack[--this.stackptr];this.stack[this.stackptr++]=x1+y1;break;case 1011:x1=this.stack[--this.stackptr];y1=this.stack[--this.stackptr];this.stack[this.stackptr++]=y1-x1;break;case 1012:x1=this.stack[--this.stackptr];y1=this.stack[--this.stackptr];this.stack[this.stackptr++]=y1/x1;break;case 1014:this.stack[this.stackptr-1]=-this.stack[this.stackptr-1];break;case 1015:x1=this.stack[--this.stackptr];y1=this.stack[--this.stackptr];this.stack[this.stackptr++]=(x1==y1)?1:0;break;case 1018:this.stackptr--;break;case 1020:i=this.stack[--this.stackptr];x1=this.stack[--this.stackptr];this.temps[i]=x1;break;case 1021:i=this.stack[--this.stackptr];this.stack[this.stackptr++]=this.temps[i];break;case 1022:if(this.stack[this.stackptr-2]>this.stack[this.stackptr-1]){this.stack[this.stackptr-4]=this.stack[this.stackptr-3];}
this.stackptr-=3;break;case 1023:this.stack[this.stackptr++]=Math.random();break;case 1024:x1=this.stack[--this.stackptr];y1=this.stack[--this.stackptr];this.stack[this.stackptr++]=y1*x1;break;case 1026:this.stack[this.stackptr-1]=Math.sqrt(this.stack[this.stackptr-1]);break;case 1027:x1=this.stack[this.stackptr-1];this.stack[this.stackptr++]=x1;break;case 1028:x1=this.stack[this.stackptr-1];this.stack[this.stackptr-1]=this.stack[this.stackptr-2];this.stack[this.stackptr-2]=x1;break;case 1029:i=this.stack[this.stackptr-1];if(i<0){i=0;}
this.stack[this.stackptr-1]=this.stack[this.stackptr-2-i];break;case 1030:console.warn('havent finished roll yet');break;case 1034:x1=pt.x+this.stack[0];y1=ybase=pt.y;x2=x1+this.stack[1];y2=y1+this.stack[2];pt.x=x2+this.stack[3];pt.y=y2;gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);x1=pt.x+this.stack[4];y1=pt.y;x2=x1+this.stack[5];y2=ybase;pt.x=x2+this.stack[6];pt.y=y2;gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);pt.open=true;this.stackptr=0;break;case 1035:x1=pt.x+this.stack[0];y1=pt.y+this.stack[1];x2=x1+this.stack[2];y2=y1+this.stack[3];pt.x=x2+this.stack[4];pt.y=y2+this.stack[5];gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);x1=pt.x+this.stack[6];y1=pt.y+this.stack[7];x2=x1+this.stack[8];y2=y1+this.stack[9];pt.x=x2+this.stack[10];pt.y=y2+this.stack[11];gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);pt.open=true;this.stackptr=0;break;case 1036:ybase=pt.y;x1=pt.x+this.stack[0];y1=pt.y+this.stack[1];x2=x1+this.stack[2];y2=y1+this.stack[3];pt.x=x2+this.stack[4];pt.y=y2;gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);x1=pt.x+this.stack[5];y1=pt.y;x2=x1+this.stack[6];y2=y1+this.stack[7];pt.x=x2+this.stack[8];pt.y=ybase;gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);pt.open=true;this.stackptr=0;break;case 1037:ybase=pt.y;var xbase=pt.x;x1=pt.x+this.stack[0];y1=pt.y+this.stack[1];x2=x1+this.stack[2];y2=y1+this.stack[3];pt.x=x2+this.stack[4];pt.y=y2+this.stack[5];gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);x1=pt.x+this.stack[6];y1=pt.y+this.stack[7];x2=x1+this.stack[8];y2=y1+this.stack[9];if(Math.abs(x2-xbase)>Math.abs(y2-ybase)){pt.x=x2+this.stack[10];pt.y=ybase;}else{pt.x=xbase;pt.y=y2+this.stack[10];}
gp.curveTo(x1,y1,x2,y2,pt.x,pt.y);pt.open=true;this.stackptr=0;break;default:System.out.println("ERROR! TYPE1C CHARSTRING CMD IS "+cmd);break;}}}};for(var key in temp){Type1CFont.prototype[key]=temp[key];}
;function Type3Font(baseFont,fontObj,resources,descriptor){Type3Font.baseConstructor.call(this,baseFont,fontObj,descriptor);this.rsrc;this.charProcs;this.bbox;this.at;this.widths;this.firstChar;this.lastChar;this.rsrc=new COSDictionary();if(resources!=null){this.rsrc.addAll(resources.resources);}
var matrix=fontObj.getDictionaryObject("FontMatrix");var matrixAry=[];for(var i=0;i<6;i++){matrixAry.push(matrix.getObject(i).value);}
this.at=new AffineTransform(matrixAry[0],matrixAry[1],matrixAry[2],matrixAry[3],matrixAry[4],matrixAry[5]);var scale=matrixAry[0]+matrixAry[2];var rsrcObj=fontObj.getDictionaryObject("Resources");if(rsrcObj!=null){this.rsrc.addAll(rsrcObj);}
this.charProcs=fontObj.getDictionaryObject("CharProcs");var bboxdef=fontObj.getDictionaryObject("FontBBox");var bboxfdef=[];for(var i=0;i<4;i++){bboxfdef.push(bboxdef.getObject(i).value);}
this.bbox=new Rectangle2D(bboxfdef[0],bboxfdef[1],bboxfdef[2]-bboxfdef[0],bboxfdef[3]-bboxfdef[1]);if(this.bbox.isEmpty()){this.bbox=null;}
var widthArray=fontObj.getDictionaryObject("Widths");this.widths=[];var widthLength=widthArray.size();for(var i=0;i<widthLength;i++){this.widths[i]=widthArray.getObject(i).value;}
this.firstChar=fontObj.getDictionaryObject("FirstChar").value;this.lastChar=fontObj.getDictionaryObject("LastChar").value;}
extend(Type3Font,PDFFont);Type3Font.prototype.getGlyph=function(src,name){if(name==null){throw new IllegalArgumentException("Glyph name required for Type3 font!"+"Source character: "+src);}
var pageObj=this.charProcs.getDictionaryObject(name);if(pageObj==null){return new PDFGlyph(src,name,new GeneralPath(),new Point2D.Float(0,0));}
var width=this.widths[src-this.firstChar];var advance={x:width,y:0};advance=this.at.transform(advance);return new PDFGlyph(src,name,pageObj,advance);};
;function BuiltInFont(baseFont,fontObj,descriptor){BuiltInFont.baseConstructor.call(this,baseFont,fontObj,descriptor);var fontName=descriptor.fontName;for(var i=0;i<BuiltInFont.baseFonts.length;i++){if(fontName.toLowerCase()==BuiltInFont.baseFonts[i].toLowerCase()){this.parseFont(fontName);return;}}
for(var i=0;i<BuiltInFont.mappedFonts.length;i+=2){if(fontName.toLowerCase()==BuiltInFont.mappedFonts[i].toLowerCase()){this.parseFont(BuiltInFont.mappedFonts[i+1]);return;}}
var flags=descriptor.flags;var style=((flags&PDFFontDescriptor.FORCEBOLD)!=0)?PDFFontDescriptor.BOLD:PDFFontDescriptor.PLAIN;if(fontName.indexOf("Bold")>0){style|=PDFFontDescriptor.BOLD;}
if((descriptor.italicAngle!=0)||((flags&PDFFontDescriptor.NONSYMBOLIC)!=0)){style|=PDFFontDescriptor.ITALIC;}
var name=null;if((flags&PDFFontDescriptor.FIXED_PITCH)!=0){if(((style&PDFFontDescriptor.BOLD)>0)&&((style&PDFFontDescriptor.ITALIC)>0)){name="Courier-BoldOblique";}else if((style&PDFFontDescriptor.BOLD)>0){name="Courier-Bold";}else if((style&PDFFontDescriptor.ITALIC)>0){name="Courier-Oblique";}else{name="Courier";}}else if((flags&PDFFontDescriptor.SERIF)!=0){if(((style&PDFFontDescriptor.BOLD)>0)&&((style&PDFFontDescriptor.ITALIC)>0)){name="Times-BoldItalic";}else if((style&PDFFontDescriptor.BOLD)>0){name="Times-Bold";}else if((style&PDFFontDescriptor.ITALIC)>0){name="Times-Italic";}else{name="Times-Roman";}}else{if(((style&PDFFontDescriptor.BOLD)>0)&&((style&PDFFontDescriptor.ITALIC)>0)){name="Helvetica-BoldOblique";}else if((style&PDFFontDescriptor.BOLD)>0){name="Helvetica-Bold";}else if((style&PDFFontDescriptor.ITALIC)>0){name="Helvetica-Oblique";}else{name="Helvetica";}}
this.parseFont(name);}
extend(BuiltInFont,Type1Font);BuiltInFont.fontStreamCache={};BuiltInFont.prototype.getFontStream=function(file){if(BuiltInFont.fontStreamCache[file]!=null)
return BuiltInFont.fontStreamCache[file].subStream(0);var stream=StreamBuffer.createFromUrl('font/res/'+file);BuiltInFont.fontStreamCache[file]=stream;return stream;};BuiltInFont.prototype.parseFont=function(baseFont){var props=BaseFontMap;if(props[baseFont]==null){throw new IllegalArgumentException("Unknown Base Font: "+baseFont);}
var file=props[baseFont]["file"];var length=props[baseFont]["length"];var length1=0;var length2=0;var data=this.getFontStream(file);if((data.getByteAt(0)&0xff)==0x80){length1=(data.getByteAt(2)&0xff);length1|=(data.getByteAt(3)&0xff)<<8;length1|=(data.getByteAt(4)&0xff)<<16;length1|=(data.getByteAt(5)&0xff)<<24;length1+=6;length2=(data.getByteAt(length1+2)&0xff);length2|=(data.getByteAt(length1+3)&0xff)<<8;length2|=(data.getByteAt(length1+4)&0xff)<<16;length2|=(data.getByteAt(length1+5)&0xff)<<24;length1+=6;}else{throw"Builtin font read from prop file not implemented";}
this.parseFontFromStream(data,length1,length2);}
BuiltInFont.baseFonts=["Courier","Courier-Bold","Courier-BoldOblique","Courier-Oblique","Helvetica","Helvetica-Bold","Helvetica-BoldOblique","Helvetica-Oblique","Times-Roman","Times-Bold","Times-BoldItalic","Times-Italic","Symbol","ZapfDingbats"];BuiltInFont.mappedFonts=["Arial","Helvetica","Arial,Bold","Helvetica-Bold","Arial,BoldItalic","Helvetica-BoldOblique","Arial,Italic","Helvetica-Oblique","TimesNewRoman","Times-Roman","TimesNewRoman,Bold","Times-Bold","TimesNewRoman,BoldItalic","Times-BoldItalic","TimesNewRoman,Italic","Times-Italic",];
;BaseFontMap={"Courier":{"file":"n022003l.pfb","length":96263,},"Courier-Bold":{"file":"n022004l.pfb","length":120373},"Courier-BoldOblique":{"file":"n022024l.pfb","length":114228},"Courier-Oblique":{"file":"n022023l.pfb","length":101133},"Helvetica":{"file":"n019003l.pfb","length":68590},"Helvetica-Bold":{"file":"n019004l.pfb","length":72400},"Helvetica-BoldOblique":{"file":"n019024l.pfb","length":73879},"Helvetica-Oblique":{"file":"n019023l.pfb","length":71719},"Times-Roman":{"file":"n021003l.pfb","length":113206},"Times-Bold":{"file":"n021004l.pfb","length":108822},"Times-BoldItalic":{"file":"n021024l.pfb","length":96211},"Times-Italic":{"file":"n021023l.pfb","length":108217},"Symbol":{"file":"s050000l.pfb","length":32213},"ZapfDingbats":{"file":"d050000l.pfb","length":45955}}
;function AdobeGlyphList(){}
AdobeGlyphList.glyphToUnicodes=null;AdobeGlyphList.unicodeToGlyph=null;AdobeGlyphList.getGlyphNameIndex=function(glyphName){var unicodes=AdobeGlyphList.getUnicodeValues(glyphName);if(unicodes==null){return null;}else{return unicodes[0];}}
AdobeGlyphList.getUnicodeValues=function(glyphName){AdobeGlyphList.intialize();return AdobeGlyphList.glyphToUnicodes[glyphName];}
AdobeGlyphList.intialize=function(){if(AdobeGlyphList.glyphToUnicodes!=null)
return;AdobeGlyphList.glyphToUnicodes={};AdobeGlyphList.unicodeToGlyph={};var reader=StreamBuffer.createFromUrl('font/res/glyphlist.txt');while(reader.hasRemaining()){var unicodes=[];var line=reader.readLine();line=line.replace(/\s+$/,"");if(line!=""&&line.charAt(0)!="#"){var tokens=line.split(';');var glyphName=tokens[0];var unicodes=tokens[1].split(" ");var codes=new Array(unicodes.length);for(var i=0;i<unicodes.length;i++){codes[i]=parseInt(unicodes[i],16);AdobeGlyphList.unicodeToGlyph[codes[i]]=glyphName;}
AdobeGlyphList.glyphToUnicodes[glyphName]=codes;}}}
;function PDFCMap(){}
PDFCMap.prototype.map=function(src){return src;}
PDFCMap.prototype.getFontID=function(src){return 0;}
PDFCMap.getCMap=function(map){if(map instanceof COSName){return new PDFCMap();}else if(map instanceof COSStream){throw new UnimplementedException("Parsing a CMAP from a stream is not supported");}else{throw new IOException("CMap type not Name or Stream!");}}
;function PDFFunction(){}
PDFFunction.TYPE_0=0;PDFFunction.TYPE_2=2;PDFFunction.TYPE_3=3;PDFFunction.TYPE_4=4;PDFFunction.getFunction=function(obj){var pdfFunction;var type;var domain=null;var range=null;var dictObj=obj.dictionary;var typeObj=dictObj.getDictionaryObject("FunctionType");if(typeObj==null){throw new PDFParseException("No FunctionType specified in function!");}
type=typeObj.value;var domainObj=dictObj.getDictionaryObject("Domain");if(domainObj==null){throw new PDFParseException("No Domain specified in function!");}
var domainAry=domainObj;var domainArySize=domainObj.size();domain=new Array(domainArySize);for(var i=0;i<domainArySize;i++){domain[i]=domainAry.getObject(i).value;}
var rangeObj=dictObj.getDictionaryObject("Range");if(rangeObj!=null){var rangeAry=rangeObj;var rangeArySize=rangeObj.size();range=new Array(rangeArySize);for(var i=0;i<rangeArySize;i++){range[i]=rangeAry.getObject(i).value;}}
switch(type){case PDFFunction.TYPE_0:if(rangeObj==null){throw new PDFParseException("No Range specified in Type 0 Function!");}
pdfFunction=new FunctionType0();break;case PDFFunction.TYPE_2:pdfFunction=new FunctionType2();break;case PDFFunction.TYPE_3:pdfFunction=new FunctionType3();break;case PDFFunction.TYPE_4:if(rangeObj==null){throw new PDFParseException("No Range specified in Type 4 Function!");}
pdfFunction=new FunctionType4();break;default:throw new PDFParseException("Unsupported function type: "+type);}
pdfFunction.setDomain(domain);if(range!=null){pdfFunction.setRange(range);}
pdfFunction.parse(obj);return pdfFunction;}
PDFFunction.prototype.getNumInputs=function(){return(this.domain.length/2);}
PDFFunction.prototype.getNumOutputs=function(){if(this.range==null){return 0;}
return(this.range.length/2);}
PDFFunction.prototype.setDomain=function(domain){this.domain=domain;}
PDFFunction.prototype.setRange=function(range){this.range=range;}
;function FunctionType0(){FunctionType0.baseConstructor.call(this,PDFFunction.TYPE0);}
extend(FunctionType0,PDFFunction);FunctionType0.prototype.parse=function(obj){var dictObj=obj.dictionary;var sizeObj=dictObj.getDictionaryObject("Size");if(sizeObj==null){throw new PDFParseException("Size required for function type 0!");}
var sizeAry=sizeObj.getArray();var size=new Array(sizeAry.length);for(var i=0;i<sizeAry.length;i++){size[i]=sizeAry[i].value;}
this.setSize(size);var bpsObj=dictObj.getDictionaryObject("BitsPerSample");if(bpsObj==null){throw new PDFParseException("BitsPerSample required for function type 0!");}
this.setBitsPerSample(bpsObj.value);var orderObj=dictObj.getDictionaryObject("Order");if(orderObj!=null){this.setOrder(orderObj.value);}
var encodeObj=dictObj.getDictionaryObject("Encode");if(encodeObj!=null){var encodeAry=encodeObj.getArray();var encode=new Array(encodeAry.length);for(var i=0;i<encodeAry.length;i++){encode[i]=encodeAry[i].value;}
this.setEncode(encode);}
var decodeObj=dictObj.getDictionaryObject("Decode");if(decodeObj!=null){var decodeAry=decodeObj.getArray();var decode=new Array(decodeAry.length);for(var i=0;i<decodeAry.length;i++){decode[i]=decodeAry[i].value;}
this.setDecode(decode);}
this.setSamples(this.readSamples(new StreamBuffer(obj.decode())));}
FunctionType0.prototype.setSize=function(size){this.size=size;}
FunctionType0.prototype.getSize=function(dimension){return this.size[dimension];}
FunctionType0.prototype.getBitsPerSample=function(){return this.bitsPerSample;}
FunctionType0.prototype.setBitsPerSample=function(bits){this.bitsPerSample=bits;}
FunctionType0.prototype.setOrder=function(order){this.order=order;}
FunctionType0.prototype.setEncode=function(encode){this.encode=encode;}
FunctionType0.prototype.setDecode=function(decode){this.decode=decode;}
FunctionType0.prototype.setSamples=function(samples){this.samples=samples;}
FunctionType0.prototype.readSamples=function(buf){var size=1;for(var i=0;i<this.getNumInputs();i++){size*=this.getSize(i);}
var samples=new Array(size);var outputs=this.getNumOutputs();for(var i=0;i<size;i++){samples[i]=new Array(outputs);}
var bitLoc=0;var byteLoc=0;var index=0;for(var i=0;i<this.getNumInputs();i++){for(var j=0;j<this.getSize(i);j++){for(var k=0;k<this.getNumOutputs();k++){var value=0;var toRead=this.getBitsPerSample();var curByte=buf.getAt(byteLoc);while(toRead>0){var nextBit=((curByte>>(7-bitLoc))&0x1);value|=nextBit<<(toRead-1);if(++bitLoc==8){bitLoc=0;byteLoc++;if(toRead>1){curByte=buf.getAt(byteLoc);}}
toRead--;}
samples[index][k]=value;}
index++;}}
return samples;}
;function StreamBuffer(streamText,bigEndian,start,length){var bigEndian=bigEndian||true;var position=0;var limit=length||streamText.length;var buffer=streamText;var offset=start||0;this.getLimit=function(){return limit;};this.getPosition=function(){return position;};this.setPosition=function(newPosition){if(newPosition<0||newPosition>limit)
console.warn("New stream posistion is invalid.");position=newPosition;return position;};this.remaining=function(){return limit-position;};this.hasRemaining=function(){return position<limit;};this.readNumber=function(iNumBytes,iFrom){iNumBytes=iNumBytes||1;iFrom=iFrom||position;this.setPosition(iFrom+iNumBytes);var result=0;for(var i=iFrom+iNumBytes;i>iFrom;i--){result=result*256+this.getByteAt(i-1);}
return result;};this.subStream=function(start,length){var length=length||(limit-start);if(length>(limit-start)){throw"Sub stream length is greater than it could be";}
return new StreamBuffer(buffer,bigEndian,start+offset,length);};this.read=function(iNumChars){iNumChars=iNumChars||1;if(iNumChars==1){return String.fromCharCode(buffer.charCodeAt(offset+position++)&0xFF);}else{var string=buffer.substr(offset+position,iNumChars);position+=iNumChars;return string;}};this.readAt=function(pos,iNumChars){iNumChars=iNumChars||1;if(iNumChars==1){return String.fromCharCode(buffer.charCodeAt(offset+pos)&0xFF);}else{var string=buffer.substr(offset+pos,iNumChars);return string;}};this.readLine=function(){var line="";while(true){var c=this.read();if(c=="\r"){var next=this.peek();if(next=="\n"){this.read();}
break;}else if(c=="\n"){break;}
line+=c;}
return line;};this.peek=function(){var z=buffer;if(position>=limit)
return-1;var c=this.read();this.setPosition(this.getPosition()-1);return c;};this.rewindOne=function(){this.setPosition(this.getPosition()-1);};this.getByteAt=function(i){return buffer.charCodeAt(i+offset)&0xff;};this.order=function(){return bigEndian;};this.get=function(){var bite=this.getByteAt(position);position++;if(bite>127)
return bite-256;else
return bite;};this.getAt=function(loc){var bite=this.getByteAt(loc);if(bite>127)
return bite-256;else
return bite;};this.getBulk=function(dst){var len=dst.length;for(var i=0;i<len;i++){dst[i]=this.get();}};this.getChar=function(){var b1=this.get();var b0=this.get();return String.fromCharCode((b1<<8)|(b0&0xff));};this.getShort=function(){var iShort=bigEndian?(this.getByteAt(position)<<8)+this.getByteAt(position+1):(this.getByteAt(position+1)<<8)+this.getByteAt(position)
position+=2;if(iShort>32767)
return iShort-65536;else
return iShort;};this.getInt=function(){var iByte1=this.getByteAt(position),iByte2=this.getByteAt(position+1),iByte3=this.getByteAt(position+2),iByte4=this.getByteAt(position+3);var iInt=bigEndian?(((((iByte1<<8)+iByte2)<<8)+iByte3)<<8)+iByte4:(((((iByte4<<8)+iByte3)<<8)+iByte2)<<8)+iByte1;position+=4;if(iInt>2147483647)
return iInt-4294967296;else
return iInt;};this.getLong=function(){this.getInt();this.getInt();console.warn('getLong not implemented');};this.lastIndexOf=function(searchString){return streamText.lastIndexOf(searchString);};this.toByteArray=function(){var ret=new Array(limit);for(var i=0;i<limit;i++){ret[i]=this.getAt(i);}
return ret;};this.toString=function(){return"StreamBuffer: pos "+position+" lim "+limit;};};StreamBuffer.createFromUrl=function(fileURL){var req=new XMLHttpRequest();req.open('GET',fileURL,false);req.overrideMimeType('text/plain; charset=x-user-defined');req.send(null);if(req.status!=200)throwException(_exception.FileLoadFailed);fileContents=req.responseText;fileSize=fileContents.length;return new StreamBuffer(fileContents);};
;function Commander(graphics,resources,initialMatrix,streamEngine){this.graphics=graphics;this.graphics.beginPath();this.text=new TextState(this);this.textStack=[];this.transform=initialMatrix;this.transformStack=[];this.fillCS=null;this.strokeCS=null;this.resources=resources;this.initialMatrix=initialMatrix;this.streamEngine=streamEngine;this.clip=0;}
Commander.prototype={saveGraphics:function(args){this.graphics.save();this.transformStack.push(this.transform);this.transform=this.transform.clone();},restoreGraphics:function(args){this.graphics.restore();this.transform=this.transformStack.pop();},concatenate:function(args){var a=args[0].value;var b=args[1].value;var c=args[2].value;var d=args[3].value;var e=args[4].value;var f=args[5].value;this.graphics.transform(a,b,c,d,e,f);this.transform=this.transform.multiply(new AffineTransform(a,b,c,d,e,f));},appendRectangleToPath:function(args){var x=args[0].value;var y=args[1].value;var width=args[2].value;var height=args[3].value;this.graphics.moveTo(x,y);this.graphics.lineTo(x+width,y);this.graphics.lineTo(x+width,y+height);this.graphics.lineTo(x,y+height);this.graphics.closePath();},beginText:function(args){this.text.textMatrix=new AffineTransform();this.text.textLineMatrix=new AffineTransform();},endPath:function(args){if(this.clip!=0){this.addPath(this.clip);}
this.clip=0;this.graphics.closePath();this.graphics.beginPath();},setGraphicsStateParameters:function(args){var name=args[0].name;var gsobj=this.resources.getGraphicsState(name);if(gsobj==null)
return;var d;if((d=gsobj.getDictionaryObject("LW"))!=null){this.setLineWidth([d]);}
if((d=gsobj.getDictionaryObject("LC"))!=null){this.setLineCapStyle([d]);}
if((d=gsobj.getDictionaryObject("LJ"))!=null){this.setLineJoinStyle([d]);}
if((d=gsobj.getDictionaryObject("Font"))!=null){this.textFormat.setFont([d]);}
if((d=gsobj.getDictionaryObject("ML"))!=null){this.setLineMiterLimit([d]);}
if((d=gsobj.getDictionaryObject("D"))!=null){console.warn("gs - dash not done");}
if((d=gsobj.getDictionaryObject("CA"))!=null){console.warn("gs - stroke alpha not done");}
if((d=gsobj.getDictionaryObject("ca"))!=null){console.warn("gs - fille alpha not done");}},endText:function(args){},lineTo:function(args){var x=args[0].value;var y=args[1].value;this.graphics.lineTo(x,y);},moveText:function(args){var x=args[0].value;var y=args[1].value;this.text.carriageReturn(x,y);},moveTextSetLeading:function(args){var x=args[0].value;var y=args[1].value;this.text.leading=-y;this.text.carriageReturn(x,y);},moveTo:function(args){var x=args[0].value;var y=args[1].value;this.graphics.moveTo(x,y);},setTextLeading:function(args){var leading=args[0].value;this.text.leading=leading;},setTextRenderingMode:function(args){var mode=args[0].value;this.text.setMode(mode);},setTextRise:function(args){var rise=args[0].value;this.text.rise=rise;},setTextMatrix:function(args){var a=args[0].value;var b=args[1].value;var c=args[2].value;var d=args[3].value;var e=args[4].value;var f=args[5].value;var textMatrix=new AffineTransform(a,b,c,d,e,f);this.text.textMatrix=textMatrix;this.text.textLineMatrix=textMatrix.clone();},setTextFont:function(args){if(args.length>=2)
{var fontName=args[0];var fontSize=args[1].value;this.text.fontSize=fontSize;var fontObj=this.resources.getFont(fontName.name);if(fontObj!=null){var fontName=fontObj.getDictionaryObject('BaseFont');this.text.font=PDFFont.getFont(fontObj,this.resources);}else{debugger;}}},setWordSpacing:function(args){var wordSpacing=args[0].value;this.text.wordSpacing=wordSpacing;},setCharSpacing:function(args){var characterSpacing=args[0].value;this.text.characterSpacing=characterSpacing;},showText:function(args){var text=args[0].value;this.text.graphics=this.graphics;this.text.doText(text);},showKernedText:function(args){var textArray=args[0];var length=textArray.size();for(var i=0;i<length;i++){var obj=textArray.get(i);if(obj instanceof COSNumber){var val=obj.value/1000;this.text.textMatrix=this.text.textMatrix.translate(-val*this.text.fontSize*this.text.horizontalScaling,0);}else if(obj instanceof COSString){this.text.graphics=this.graphics;this.text.doText(obj.value);}}},strokePath:function(args){this.addPath(Shape.STROKE|this.clip);this.clip=0;this.graphics.beginPath();},closeAndStrokePath:function(args){this.graphics.closePath();this.addPath(Shape.STROKE|this.clip);this.clip=0;this.graphics.beginPath();},fillPath:function(args){this.addPath(Shape.FILL|this.clip);this.clip=0;this.graphics.beginPath();},fillEvenOddRule:function(args){this.addPath(Shape.FILL|this.clip);this.clip=0;this.graphics.beginPath();},fillNonZeroAndStrokePath:function(args){this.graphics.closePath();this.addPath(Shape.BOTH|this.clip);this.clip=0;this.graphics.beginPath();},closeStrokefillPath:function(args){this.graphics.closePath();this.addPath(Shape.BOTH|this.clip);this.clip=0;this.graphics.beginPath();},setNonStrokingGrayColor:function(args){var x=Math.round(args[0].value*255);this.graphics.fillStyle='rgb('+x+','+x+','+x+')';},setStrokingGrayColor:function(args){var x=Math.round(args[0].value*255);this.graphics.strokeStyle='rgb('+x+','+x+','+x+')';},setNonStrokingRGBColor:function(args){var r=Math.round(args[0].value*255);var g=Math.round(args[1].value*255);var b=Math.round(args[2].value*255);this.graphics.fillStyle='rgb('+r+','+g+','+b+')';},setStrokingRGBColor:function(args){var r=Math.round(args[0].value*255);var g=Math.round(args[1].value*255);var b=Math.round(args[2].value*255);this.graphics.strokeStyle='rgb('+r+','+g+','+b+')';},setNonStrokingCMYKColor:function(args){var c=args[0].value;var m=args[1].value;var y=args[2].value;var k=args[3].value;var rgb=PDFColorSpace.CMYKtoRGB(c,m,y,k);this.graphics.fillStyle='rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';},setStrokingCMYKColor:function(args){var c=args[0].value;var m=args[1].value;var y=args[2].value;var k=args[3].value;var rgb=PDFColorSpace.CMYKtoRGB(c,m,y,k);this.graphics.strokeStyle='rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';},setNonStrokingColorSpace:function(args){console.warn('not finished with "cs"');this.fillCS=PDFColorSpace.getColorSpace(args[0],this.resources);},setNonStrokingColor:function(args){if(this.fillCS instanceof PatternSpace){console.warn('not finished with "scn"');this.graphics.fillStyle='rgb('+0+','+0+','+0+')';return;var patternName=args[0].name;var patternDictionary=this.resources.resources.getDictionaryObject("Pattern");var pattern=patternDictionary.getDictionaryObject(patternName);var components=[];for(var i=1;i<args.length;i++)
components.push(args[i].value);this.fillCS.getPaint(pattern,components,this.resources);}else{var n=this.fillCS.getNumComponents();var arry=[];for(var i=0;i<n;i++)
arry.push(args[i].value);var rgb=this.fillCS.getPaint(arry);var r=Math.round(rgb[0]*255);var g=Math.round(rgb[1]*255);var b=Math.round(rgb[2]*255);this.graphics.fillStyle='rgb('+r+','+g+','+b+')';}},carriageReturn:function(args){this.text.carriageReturn();},moveAndShow:function(args){var text=args[0].value;this.text.carriageReturn();this.text.doText(text);},setHorizontalTextScaling:function(args){var scale=args[0].value;this.text.horizontalScaling=scale/100;},setLineWidth:function(args){var width=args[0].value;this.graphics.lineWidth=width;},clipNonZeroRule:function(args){this.clip=Shape.CLIP;},clipEvenOddRule:function(args){this.clip=Shape.CLIP;},closePath:function(args){this.graphics.closePath();},curveTo:function(args){var a=args[0].value;var b=args[1].value;var c=args[2].value;var d=args[3].value;var e=args[4].value;var f=args[5].value;this.graphics.bezierCurveTo(a,b,c,d,e,f);},curveToReplicateInitialPoint:function(args){var a=args[0].value;var b=args[1].value;var c=args[2].value;var d=args[3].value;this.graphics.quadraticCurveTo(a,b,c,d);},curveToReplicateFinalPoint:function(args){var a=args[0].value;var b=args[1].value;var c=args[2].value;var d=args[3].value;this.graphics.bezierCurveTo(a,b,c,d,c,d);},beginCompatibilitySection:function(args){},endCompatibilitySection:function(args){},beginInlineImage:function(args){},endInlineImage:function(args){this.doImage(args[0]);},doXObject:function(args){var name=args[0].name;var xObject=this.resources.getXObject(name);var dictionary=xObject.dictionary;var subType=dictionary.getDictionaryObject('Subtype').name;if(subType=='Image'){this.doImage(xObject);}else if(subType=='Form'){this.doForm(xObject);console.warn("XObject type '"+subType+"' is not completely done.");}else{console.warn("XObject type '"+subType+"' is not supported yet.");}},doImage:function(obj){this.graphics.save();var dictionary=obj.dictionary;var width=dictionary.getDictionaryObject('Width').value;var height=dictionary.getDictionaryObject('Height').value;var at=new AffineTransform(1/width,0,0,-1/height,0,1);var transform=this.transform.multiply(at);var imageSource=obj.getImageString(this.resources,this.graphics);var image=new Image();image.src=imageSource;this.graphics.drawImage(image,transform);this.graphics.restore();},doForm:function(obj){var at;var matrix=obj.dictionary.getDictionaryObject("Matrix");if(matrix==null){at=new AffineTransform();}else{var elts=[];for(var i=0;i<6;i++){elts[i]=matrix.get(i).value;}
at=new AffineTransform(elts[0],elts[1],elts[2],elts[3],elts[4],elts[5]);}
var bobj=obj.dictionary.getDictionaryObject("BBox");var r=new COSDictionary(jQuery.extend(true,{},this.resources.resources._items));var rsrc=obj.dictionary.getDictionaryObject("Resources");if(rsrc!=null){r.putAll(rsrc);}
var previousResources=this.resources;this.resources=new PDResources(r);var transform=at;this.graphics.save();this.graphics.transform(transform.m00,transform.m10,transform.m01,transform.m11,transform.m02,transform.m12);this.transform=this.transform.multiply(at);this.streamEngine.processSubStream(null,r,obj);this.graphics.restore();this.resources=previousResources;},setLineJoinStyle:function(args){var joinStyle=args[0].value;var join='miter';switch(joinStyle){case 0:join='miter';break;case 1:join='round';break;case 2:join='bevel';break;}
this.graphics.lineJoin=join;},setLineCapStyle:function(args){var capStyle=args[0].value;var cap='butt';switch(capStyle){case 0:cap='butt';break;case 1:cap='round';break;case 2:cap='square';break;}
this.graphics.lineCap=cap;},setLineMiterLimit:function(args){var limit=args[0].value;this.graphics.miterLimit=limit;},addPath:function(style){if((style&Shape.FILL)!=0)
this.graphics.fill();if((style&Shape.STROKE)!=0)
this.graphics.stroke();if((style&Shape.CLIP)!=0)
this.graphics.clip();}}
function TextState(commander){this.commander=commander
this.textMatrix;this.textLineMatrix;this.characterSpacing=0;this.wordSpacing=0;this.horizontalScaling=1;this.leading=0;this.font;this.fontSize;this.renderingMode=Shape.FILL;this.rise=0;this.knockout=true;this.graphics;this.carriageReturn=function(xArg,yArg){var x=0;var y=-this.leading;if(arguments.length==2){x=xArg;y=yArg;}
this.textLineMatrix=this.textLineMatrix.translate(x,y);this.textMatrix=this.textLineMatrix.clone();},this.setMode=function(m){var mode=0;if((m&0x1)==0){mode|=Shape.FILL;}
if((m&0x4)!=0){mode|=Shape.CLIP;}
if(((m&0x1)^((m&0x2)>>1))!=0){mode|=Shape.STROKE;}
this.renderingMode=mode;};this.doText=function(text){var scale=new AffineTransform(this.fontSize,0,0,this.fontSize*this.horizontalScaling,0,this.rise);var glyphs=this.font.getGlyphs(text);for(var i=0;i<glyphs.length;i++){this.graphics.save();var glyph=glyphs[i];var at=this.textMatrix.clone();at=at.multiply(scale);var transform=at;this.graphics.transform(transform.m00,transform.m10,transform.m01,transform.m11,transform.m02,transform.m12);this.graphics.beginPath();var advance=glyph.render(this.graphics,this.commander);if((this.renderingMode&Shape.FILL)!=0)
this.graphics.fill();if((this.renderingMode&Shape.STROKE)!=0)
this.graphics.stroke();if((this.renderingMode&Shape.CLIP)!=0)
this.graphics.clip();var advanceX=(advance.x*this.fontSize)+this.characterSpacing;if(glyph.getChar()==' '){advanceX+=this.wordSpacing;}
advanceX*=this.horizontalScaling;this.textMatrix=this.textMatrix.translate(advanceX,advance.y);this.graphics.restore();}
this.graphics.beginPath();};}
function Shape(){}
Shape.STROKE=1;Shape.FILL=2;Shape.BOTH=3;Shape.CLIP=4;
;MainThread={postMessage:function(data){WorkerThread.onmessage.call(WorkerThread.context,{'data':data});}}
WorkerThread={postMessage:function(data){MainThread.onmessage({'data':data});},setOnMessage:function(f){this.onmessage=f;}}
;function Faux2dContext(listener,index){this.listener=listener;this.index=index;this.actions=[];}
Faux2dContext.prototype={callFunction:function(method,args){args=Array.prototype.slice.call(args);this.actions.push([0,method,args]);},setAttribute:function(key,value){this.actions.push([1,key,value]);},callCustom:function(method,args){args=Array.prototype.slice.call(args);this.actions.push([3,method,args]);},post:function(){this.listener(['pageReady',[this.index,this.actions]]);},save:function(){this.callFunction('save',[]);},restore:function(){this.callFunction('restore',[]);},rotate:function(){this.callFunction('rotate',arguments);},scale:function(){this.callFunction('scale',arguments);},setTransform:function(){this.callFunction('setTransform',arguments);},transform:function(){this.callFunction('transform',arguments);},translate:function(){this.callFunction('translate',arguments);},clearRect:function(){this.callFunction('clearRect',arguments);},fillRect:function(){this.callFunction('fillRect',arguments);},strokeRect:function(){this.callFunction('strokeRect',arguments);},arc:function(){this.callFunction('arc',arguments);},arcTo:function(){this.callFunction('arcTo',arguments);},beginPath:function(){this.callFunction('beginPath',[]);},bezierCurveTo:function(){this.callFunction('bezierCurveTo',arguments);},clip:function(){this.callFunction('clip',arguments);},closePath:function(){this.callFunction('closePath',arguments);},fill:function(){this.callFunction('fill',arguments);},lineTo:function(){this.callFunction('lineTo',arguments);},moveTo:function(){this.callFunction('moveTo',arguments);},quadraticCurveTo:function(){this.callFunction('quadraticCurveTo',arguments);},rect:function(){this.callFunction('rect',arguments);},stroke:function(){this.callFunction('stroke',arguments);},drawImage:function(){this.callCustom('drawImage',arguments);},createImageData:function(width,height){return{data:new Array(width*height*4),length:width*height*4,'width':width,'height':height}},putImageDataWithTransform:function(){this.callCustom('putImageDataWithTransform',arguments);},set globalAlpha(value){this.setAttribute('globalAlpha',value);},set globalCompositeOperation(value){this.setAttribute('globalCompositeOperation',value);},set fillStyle(value){this.setAttribute('fillStyle',value);},set strokeStyle(value){this.setAttribute('strokeStyle',value);},set lineCap(value){this.setAttribute('lineCap',value);},set lineJoin(value){this.setAttribute('lineJoin',value);},set lineWidth(value){this.setAttribute('lineWidth',value);},set miterLimit(value){this.setAttribute('miterLimit',value);}};
;function Trapeze(file,settings){var defaults={enableWebWorkers:true};this.settings=$.extend({},defaults,settings);this.currentPage=1;this.totalPages=0;this.init();this.standardZooms=[10,25,50,75,100,125,150,200,400,800,1600];this.width=window.innerWidth-40;this.height=window.innerHeight-40;$('#progress').show();var asyncFileReader=new AsyncFileReader(file,this,this.loaded,this.progress);asyncFileReader.start();}
Trapeze.prototype={init:function(){this.drawnPages={};this.waitingToDraw={};this.canvasWrappers=[];this.contexts=[];this.actions=[];this.clear();},progress:function(e){var percentComplete=Math.ceil(100*e.loaded/e.total);var kbLoaded=Math.round(e.loaded/1000);var kbTotal=Math.round(e.total/1000);$('#progressBar').css('width',percentComplete+'%');$('#progressPercent').text(percentComplete+"% ["+kbLoaded+" of "+kbTotal+" KB]");console.log(percentComplete+"% ["+kbLoaded+" of "+kbTotal+" KB]");},loaded:function(fileSize,fileContents){$('#progressBar').css('width','100%');$('#progress').hide();$('.zoom').removeClass('disabled');if(this.settings.enableWebWorkers)
this.worker=new Worker("TrapezeWorker.js");else
this.worker=MainThread;var that=this;this.worker.onmessage=function(event){var method=event.data[0];var args=event.data[1];that[method].apply(that,args);};this.worker.postMessage({type:'init',fileContents:fileContents,width:this.width,height:this.height});},initPage:function(pageIndex,pageDimensions,realDimensions){var wrapper=$('<div id="page'+(pageIndex+1)+'" class="page"></div>"');var canvas=$('<canvas id="canvas'+pageIndex+'"></canvas>');wrapper.html(canvas);wrapper.append('<div id="loading'+pageIndex+'" style="position: absolute; left: 50%; top: 50%;"><img src="/images/indicator.gif"></div>');wrapper.pageNumber=pageIndex;wrapper.rendered=false;$('#pages').append(wrapper);canvas=this.getCanvas(pageIndex);var ctx=canvas.getContext('2d');canvas.width=pageDimensions.width;canvas.height=pageDimensions.height;this.setZoom(100*pageDimensions.height/realDimensions.height);this.contexts[pageIndex]=ctx;this.canvasWrappers.push(wrapper);},schedulePageToDraw:function(pageIndex){if(this.waitingToDraw[pageIndex]===true){return;}
if(this.actions[pageIndex]!=undefined){this.drawPage(pageIndex);}else{this.waitingToDraw[pageIndex]=true;this.worker.postMessage({type:'requestPage',pageIndex:pageIndex});}},pageReady:function(pageIndex,actions){this.drawnPages[pageIndex]=false;this.actions[pageIndex]=actions;if(this.waitingToDraw[pageIndex]!=undefined){this.drawPage(pageIndex);}},drawPage:function(pageIndex){this.drawnPages[pageIndex]=true;var method,args;var actions=this.actions[pageIndex];var ctx=this.contexts[pageIndex];var actionsLength=actions.length;for(var i=0;i<actionsLength;i++){var action=actions[i];var type=action[0];if(type==0){method=action[1];args=action[2];ctx[method].apply(ctx,args);}else if(type==1){var key=action[1];var value=action[2];ctx[key]=value;}else{method=action[1];args=action[2];if(method=='drawImage'){var image=new Image();image.src=args[0].src;var transform=args[1];(function(image,transform){image.onload=function(){ctx.save();ctx.setTransform(transform.m00,transform.m10,transform.m01,transform.m11,transform.m02,transform.m12);ctx.drawImage(image,0,0);ctx.restore();};})(image,transform);}}}
this.actions[pageIndex]=null;$('#loading'+pageIndex).hide();},clear:function(){$('#pages').empty();},zoomIn:function(){var newZoom=this.zoom;for(var i=0;i<this.standardZooms.length;i++){if(this.standardZooms[i]>this.zoom){newZoom=this.standardZooms[i];break;}}
this.width*=newZoom/this.zoom;this.height*=newZoom/this.zoom;this.worker.postMessage({type:'redraw',width:this.width,height:this.height});},zoomOut:function(){var newZoom=this.zoom;for(var i=this.standardZooms.length;i>-1;i--){if(this.standardZooms[i]<this.zoom){newZoom=this.standardZooms[i];break;}}
this.width*=newZoom/this.zoom;this.height*=newZoom/this.zoom;this.worker.postMessage({type:'redraw',width:this.width,height:this.height});},setZoom:function(percent){this.zoom=Math.round(percent);$('#zoomPercent').html(Math.round(percent)+'%');},setTotalPages:function(num){this.currentPage=1;this.totalPages=num;$('#totalPages').html(this.totalPages);},getCanvas:function(i){return document.getElementById('canvas'+i);},initPager:function(){if(this.totalPages>1)
$('#nextPage').show();var that=this;$(window).scroll(function(){for(var i=0;i<that.canvasWrappers.length;i++){if(that.isScrolledIntoView(that.canvasWrappers[i])){if(!that.drawnPages[i])
that.schedulePageToDraw(i);}
if(that.isScrolledIntoMiddleView(that.canvasWrappers[i])){var pageNumber=that.canvasWrappers[i].pageNumber;that.setPage(pageNumber+1);}}}).scroll();},nextPage:function(){window.location.hash='#page'+(this.currentPage+1);},previousPage:function(){window.location.hash='#page'+(this.currentPage-1);},setPage:function(page){this.currentPage=page;if(this.currentPage<2)
$('#previousPage').hide();if(this.totalPages>1&&this.currentPage<this.totalPages)
$('#nextPage').show();if(this.currentPage>=this.totalPages)
$('#nextPage').hide();if(this.currentPage>1)
$('#previousPage').show();$('#currentPage').html(page);},isScrolledIntoView:function(elem){var docViewTop=$(window).scrollTop();var docViewBottom=docViewTop+$(window).height();var elemTop=elem.offset().top;var elemBottom=elemTop+elem.height();return((elemBottom>=docViewTop)&&(elemTop<=docViewBottom));},isScrolledIntoMiddleView:function(elem){var docViewTop=$(window).scrollTop();var docViewBottom=docViewTop+($(window).height()/2);var elemTop=elem.offset().top;var elemBottom=elemTop+elem.height();return((elemBottom>=docViewTop)&&(elemTop<=docViewBottom));},log:function(value){console.log(value);},error:function(value){console.warn(value);},warn:function(value){console.warn(value);},time:function(value){console.time(value);},timeEnd:function(value){console.timeEnd(value);}};
;if(typeof window=='undefined'){importScripts("util.js","Exceptions.js","GeneralPath.js","external/deflate.js","AsyncFileReader.js","Rectangle2D.js","Faux2dContext.js","cos/COSDocument.js","cos/COSArray.js","cos/COSDictionary.js","cos/COSStream.js","cos/COSString.js","cos/COSName.js","cos/COSObject.js","cos/COSObjectKey.js","cos/COSNumber.js","cos/COSNull.js","cos/COSBoolean.js","cos/COSStreamArray.js","cos/COSObjectReference.js","cos/COSObjectStreamLocation.js","PDFObject.js","pdmodel/PDDocument.js","pdmodel/PDDocumentCatalog.js","pdmodel/PDPageNode.js","pdmodel/PDPage.js","pdmodel/PDStream.js","pdmodel/PDDocumentInformation.js","pdmodel/PDResources.js","filter/FilterManager.js","filter/FlateFilter.js","filter/LzwFilter.js","filter/ASCII85Filter.js","filter/NoFilter.js","filter/Predictor.js","filter/PNGPredictor.js","BaseParser.js","PDFParser.js","PDFStreamEngine.js","PDFXrefStreamParser.js","PDFObjectStreamParser.js","PDFOperatorMap.js","PDFOperator.js","PDFStreamParser.js","PDFImage.js","AffineTransform.js","pdmodel/graphics/PDGraphicsState.js","pdmodel/text/PDTextState.js","colorspace/PatternSpace.js","colorspace/PDFColorSpace.js","colorspace/AlternateColorSpace.js","colorspace/IndexedColor.js","colorspace/ICC_ColorSpace.js","font/PDFFontEncoding.js","font/PDFFont.js","font/OutlineFont.js","font/TTFFont.js","font/TrueTypeFont.js","font/PDFFontDescriptor.js","font/FontSupport.js","font/TrueTypeTable.js","font/CmapTable.js","font/HeadTable.js","font/MaxpTable.js","font/LocaTable.js","font/GlyfTable.js","font/HheaTable.js","font/HmtxTable.js","font/PostTable.js","font/Glyf.js","font/GlyfSimple.js","font/CMap.js","font/CMapFormat0.js","font/CMapFormat4.js","font/PDFGlyph.js","font/GlyfCompound.js","font/PSParser.js","font/CIDFontType2.js","font/Type0Font.js","font/Type1Font.js","font/Type1CFont.js","font/Type3Font.js","font/BuiltInFont.js","font/BaseFontMap.js","font/AdobeGlyphList.js","font/PDFCMap.js","function/PDFFunction.js","function/FunctionType0.js","external/base64.js","StreamBuffer.js","Commander.js");importScripts("FauxConsole.js","Image.js","external/jquerywebworker.js");}
(function(mainThread){var postMessage=mainThread.postMessage;function TrapezeWorker(){}
TrapezeWorker.prototype={onmessage:function(event){if(event.data['type']=='init'){console.time('process');var stream=new StreamBuffer(event.data['fileContents']);var parser=new PDFParser(stream);parser.parse();var myDocument=parser.getPDDocument();var info=myDocument.getDocumentInformation();this.pages=myDocument.getDocumentCatalog().getAllPages();this.currentPage=1;this.totalPages=this.pages.length;postMessage(['setTotalPages',[this.totalPages]]);this.init(event.data['width'],event.data['height']);console.timeEnd('process');}else if(event.data['type']=='redraw'){postMessage(['init',[]]);this.init(event.data['width'],event.data['height']);}else if(event.data['type']=='requestPage'){this.drawPage(event.data['pageIndex']);if((event.data['pageIndex']+1)<this.totalPages){this.drawPage(event.data['pageIndex']+1);}}},init:function(width,height){this.preferredWidth=width;this.preferredHeight=height;for(var i=0;i<this.totalPages;i++){var page=this.pages[i];page.drawn=false;var pageSize=page.getUnstretchedSize(this.preferredWidth,this.preferredHeight);var mediaBox=page.findMediaBox();postMessage(['initPage',[i,pageSize,mediaBox]]);}
postMessage(['initPager'],[]);},drawPage:function(i){var page=this.pages[i];if(page.drawn)
return;page.drawn=true;var resources=page.findResources();var canvas=this.getCanvas(i);var pageSize=page.getUnstretchedSize(this.preferredWidth,this.preferredHeight);var transform=page.getInitialTransform(pageSize.width,pageSize.height);var ctx=canvas.getContext('2d');canvas.width=pageSize.width;canvas.height=pageSize.height;ctx.transform(transform.m00,transform.m10,transform.m01,transform.m11,transform.m02,transform.m12);var engine=new PDFStreamEngine(canvas.getContext("2d"),transform);engine.processStream(page,resources,page.getContents().getStream());page.drawToCanvas();ctx.post();},getCanvas:function(i){var ctx=new Faux2dContext(postMessage,i);return{index:i,width:0,height:0,getContext:function(context){return ctx;}};}}
var worker=new TrapezeWorker();mainThread.setOnMessage(function(event){worker.onmessage(event);});})(typeof window=='undefined'?{postMessage:function(data){postMessage(data);},setOnMessage:function(f){onmessage=f;}}:WorkerThread);
;var base64={};base64.PADCHAR='=';base64.ALPHA='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';base64.makeDOMException=function(){var e,tmp;try{return new DOMException(DOMException.INVALID_CHARACTER_ERR);}catch(tmp){var ex=new Error("DOM Exception 5");ex.code=ex.number=5;ex.name=ex.description="INVALID_CHARACTER_ERR";ex.toString=function(){return'Error: '+ex.name+': '+ex.message;};return ex;}}
base64.getbyte64=function(s,i){var idx=base64.ALPHA.indexOf(s.charAt(i));if(idx===-1){throw base64.makeDOMException();}
return idx;}
base64.decode=function(s){s=''+s;var getbyte64=base64.getbyte64;var pads,i,b10;var imax=s.length
if(imax===0){return s;}
if(imax%4!==0){throw base64.makeDOMException();}
pads=0
if(s.charAt(imax-1)===base64.PADCHAR){pads=1;if(s.charAt(imax-2)===base64.PADCHAR){pads=2;}
imax-=4;}
var x=[];for(i=0;i<imax;i+=4){b10=(getbyte64(s,i)<<18)|(getbyte64(s,i+1)<<12)|(getbyte64(s,i+2)<<6)|getbyte64(s,i+3);x.push(String.fromCharCode(b10>>16,(b10>>8)&0xff,b10&0xff));}
switch(pads){case 1:b10=(getbyte64(s,i)<<18)|(getbyte64(s,i+1)<<12)|(getbyte64(s,i+2)<<6);x.push(String.fromCharCode(b10>>16,(b10>>8)&0xff));break;case 2:b10=(getbyte64(s,i)<<18)|(getbyte64(s,i+1)<<12);x.push(String.fromCharCode(b10>>16));break;}
return x.join('');}
base64.getbyte=function(s,i){var x=s.charCodeAt(i);if(x>255){throw base64.makeDOMException();}
return x;}
base64.encode=function(s){if(arguments.length!==1){throw new SyntaxError("Not enough arguments");}
var padchar=base64.PADCHAR;var alpha=base64.ALPHA;var getbyte=base64.getbyte;var i,b10;var x=[];s=''+s;var imax=s.length-s.length%3;if(s.length===0){return s;}
for(i=0;i<imax;i+=3){b10=(getbyte(s,i)<<16)|(getbyte(s,i+1)<<8)|getbyte(s,i+2);x.push(alpha.charAt(b10>>18));x.push(alpha.charAt((b10>>12)&0x3F));x.push(alpha.charAt((b10>>6)&0x3f));x.push(alpha.charAt(b10&0x3f));}
switch(s.length-imax){case 1:b10=getbyte(s,i)<<16;x.push(alpha.charAt(b10>>18)+alpha.charAt((b10>>12)&0x3F)+
padchar+padchar);break;case 2:b10=(getbyte(s,i)<<16)|(getbyte(s,i+1)<<8);x.push(alpha.charAt(b10>>18)+alpha.charAt((b10>>12)&0x3F)+
alpha.charAt((b10>>6)&0x3f)+padchar);break;}
return x.join('');}
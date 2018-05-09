function __moonf__(){
if(!window.__moonhasinit){
window.__moonhasinit=!0,window.__moonclientlog=[],window.__wxgspeeds&&(window.__wxgspeeds.moonloadedtime=+new Date),
"object"!=typeof JSON&&(window.JSON={
stringify:function(){
return"";
},
parse:function(){
return{};
}
});
var e=function(){
function e(e){
try{
var o;
/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?o="writeLog":/(Android)/i.test(navigator.userAgent)&&(o="log"),
o&&t(o,e);
}catch(n){
throw console.error(n),n;
}
}
function t(e,o){
var n,r,i={};
n=top!=window?top.window:window;
try{
r=n.WeixinJSBridge,i=n.document;
}catch(a){}
e&&r&&r.invoke?r.invoke(e,{
level:"info",
msg:"[WechatFe][moon]"+o
}):setTimeout(function(){
i.addEventListener?i.addEventListener("WeixinJSBridgeReady",function(){
t(e,o);
},!1):i.attachEvent&&(i.attachEvent("WeixinJSBridgeReady",function(){
t(e,o);
}),i.attachEvent("onWeixinJSBridgeReady",function(){
t(e,o);
}));
},0);
}
var n;
localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method&&(n=!0),
e(" moon init, moon_inline:"+window.__mooninline+", moonls:"+n),function(){
var e={},o={},t={};
e.COMBO_UNLOAD=0,e.COMBO_LOADING=1,e.COMBO_LOADED=2;
var n=function(e,t,n){
if(!o[e]){
o[e]=n;
for(var r=3;r--;)try{
moon.setItem(moon.prefix+e,n.toString()),moon.setItem(moon.prefix+e+"_ver",moon_map[e]);
break;
}catch(i){
moon.clear();
}
}
},r=window.alert;
window.__alertList=[],window.alert=function(e){
r(e),window.__alertList.push(e);
};
var i=function(e){
if(!e||!o[e])return null;
var n=o[e];
if("function"==typeof n&&!t[e]){
var a={},s={
exports:a
},c=n(i,a,s,r);
n=o[e]=c||s.exports,t[e]=!0;
}
if(".css"===e.substr(-4)){
var d=document.getElementById(e);
if(!d){
d=document.createElement("style"),d.id=e;
var _=/url\s*\(\s*\/(\"(?:[^\\\"\r\n\f]|\\[\s\S])*\"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|[^)}]+)\s*\)/g,m=window.testenv_reshost||window.__moon_host||"res.wx.qq.com";
n=n.replace(_,"url(//"+m+"/$1)"),d.innerHTML=n,document.getElementsByTagName("head")[0].appendChild(d);
}
}
return n;
};
e.combo_status=e.COMBO_UNLOAD,e.run=function(){
var o=e.run.info,t=o&&o[0],n=o&&o[1];
if(t&&e.combo_status==e.COMBO_LOADED){
var r=i(t);
n&&n(r);
}
},e.use=function(o,t){
window.__wxgspeeds&&(window.__wxgspeeds.seajs_use_time=+new Date),e.run.info=[o,t],
e.run();
},window.define=n,window.seajs=e;
}(),function(){
if(window.__nonce_str){
var e=document.createElement;
document.createElement=function(o){
var t=e.apply(this,arguments);
return"object"==typeof o&&(o=o.toString()),"string"==typeof o&&"script"==o.toLowerCase()&&t.setAttribute("nonce",window.__nonce_str),
t;
};
}
window.addEventListener&&window.__DEBUGINFO&&Math.random()<.01&&window.addEventListener("load",function(){
var e=document.createElement("script");
e.src=__DEBUGINFO.safe_js,e.type="text/javascript",e.async=!0;
var o=document.head||document.getElementsByTagName("head")[0];
o.appendChild(e);
});
}(),function(){
function t(e){
return"[object Array]"===Object.prototype.toString.call(e);
}
function n(e){
return"[object Object]"===Object.prototype.toString.call(e);
}
function r(e){
var t=e.stack+" "+e.toString()||"";
try{
if(window.testenv_reshost){
var n="http(s)?://"+window.testenv_reshost,r=new RegExp(n,"g");
t=t.replace(r,"");
}else t=t.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var r=/\/([^.]+)\/js\/(\S+?)\.js(\,|:)?/g;r.test(t);)t=t.replace(r,function(e,o,t,n){
return t+n;
});
}catch(e){
t=e.stack?e.stack:"";
}
var i=[];
for(o in u)u.hasOwnProperty(o)&&i.push(o+":"+u[o]);
return i.push("STK:"+t.replace(/\n/g,"")),i.join("|");
}
function i(e){
if(!e){
var o=window.onerror;
window.onerror=function(){},f=setTimeout(function(){
window.onerror=o,f=null;
},50);
}
}
function a(e,o,t){
if(!/^mp\.weixin\.qq\.com$/.test(location.hostname)){
var n=[];
t=t.replace(location.href,(location.origin||"")+(location.pathname||"")).replace("#wechat_redirect","").replace("#rd","").split("&");
for(var r=0,i=t.length;i>r;r++){
var a=t[r].split("=");
a[0]&&a[1]&&n.push(a[0]+"="+encodeURIComponent(a[1]));
}
var s=new window.Image;
return void(s.src=(o+n.join("&")).substr(0,1024));
}
var c;
if(window.ActiveXObject)try{
c=new ActiveXObject("Msxml2.XMLHTTP");
}catch(d){
try{
c=new ActiveXObject("Microsoft.XMLHTTP");
}catch(_){
c=!1;
}
}else window.XMLHttpRequest&&(c=new XMLHttpRequest);
c&&(c.open(e,o,!0),c.setRequestHeader("cache-control","no-cache"),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.send(t));
}
function s(e){
return function(o,t){
if("string"==typeof o)try{
o=new Function(o);
}catch(n){
throw n;
}
var r=[].slice.call(arguments,2),a=o;
return o=function(){
try{
return a.apply(this,r.length&&r||arguments);
}catch(e){
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),_&&window.__moon_report&&(window.__moon_report([{
offset:O,
log:"timeout_error;host:"+location.host,
e:e
}]),i(f)),e;
}
},e(o,t);
};
}
function c(e){
return function(o,t,n){
if("undefined"==typeof n)var n=!1;
var r=this,a=t||function(){};
return t=function(){
try{
return a.apply(r,arguments);
}catch(e){
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),_&&window.__moon_report&&(window.__moon_report([{
offset:y,
log:"listener_error;type:"+o+";host:"+location.host,
e:e
}]),i(f)),e;
}
},a.moon_lid=b,D[b]=t,b++,e.call(r,o,t,n);
};
}
function d(e){
return function(o,t,n){
if("undefined"==typeof n)var n=!1;
var r=this;
return t=D[t.moon_lid],e.call(r,o,t,n);
};
}
var _,m,l,w,u,p,f,h=/MicroMessenger/i.test(navigator.userAgent),g=window.define,v=0,y=2,x=4,O=9,j=10;
if(window.__initCatch=function(e){
_=e.idkey,m=e.startKey||0,l=e.limit,w=e.badjsId,u=e.reportOpt||"",p=e.extInfo||{},
p.rate=p.rate||.5;
},window.__moon_report=function(e,o){
var i=!1,s="";
try{
s=top.location.href;
}catch(c){
i=!0;
}
var d=.5;
if(p&&p.rate&&(d=p.rate),o&&"number"==typeof o&&(d=o),!(!/mp\.weixin\.qq\.com/.test(location.href)&&!/payapp\.weixin\.qq\.com/.test(location.href)||Math.random()>d)&&h&&(top==window||i||/mp\.weixin\.qq\.com/.test(s))&&(n(e)&&(e=[e]),
t(e)&&""!=_)){
var u="",f=[],g=[],v=[],y=[];
"number"!=typeof l&&(l=1/0);
for(var O=0;O<e.length;O++){
var j=e[O]||{};
if(!(j.offset>l||"number"!=typeof j.offset||j.offset==x&&p&&p.network_rate&&Math.random()>=p.network_rate)){
var D=1/0==l?m:m+j.offset;
f[O]="[moon]"+_+"_"+D+";"+j.log+";"+r(j.e||{})||"",g[O]=D,v[O]=1;
}
}
for(var b=0;b<g.length;b++)y[b]=_+"_"+g[b]+"_"+v[b],u=u+"&log"+b+"="+f[b];
if(y.length>0){
a("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?","idkey="+y.join(";")+"&r="+Math.random()+"&lc="+f.length+u);
var d=1;
if(p&&p.badjs_rate&&(d=p.badjs_rate),w&&Math.random()<d){
u=u.replace(/uin\:(.)*\|biz\:(.)*\|mid\:(.)*\|idx\:(.)*\|sn\:(.)*\|/,"");
var E=new Image,S="https://badjs.weixinbridge.com/badjs?id="+w+"&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent(u);
E.src=S.slice(0,1024);
}
}
}
},window.setTimeout=s(window.setTimeout),window.setInterval=s(window.setInterval),
Math.random()<.01&&window.Document&&window.HTMLElement){
var D={},b=0;
Document.prototype.addEventListener=c(Document.prototype.addEventListener),Document.prototype.removeEventListener=d(Document.prototype.removeEventListener),
HTMLElement.prototype.addEventListener=c(HTMLElement.prototype.addEventListener),
HTMLElement.prototype.removeEventListener=d(HTMLElement.prototype.removeEventListener);
}
var E=window.navigator.userAgent;
if((/ip(hone|ad|od)/i.test(E)||/android/i.test(E))&&!/windows phone/i.test(E)&&window.localStorage&&window.localStorage.setItem){
var S=window.localStorage.setItem,I=0;
window.localStorage.setItem=function(e,o){
if(!(I>=10))try{
S.call(window.localStorage,e,o);
}catch(t){
t.stack&&console&&console.error&&console.error("[TryCatch]"+t.stack),window.__moon_report([{
offset:j,
log:"localstorage_error;"+t.toString(),
e:t
}]),I++,I>=3&&window.moon&&window.moon.clear&&moon.clear();
}
};
}
window.seajs&&g&&(window.define=function(){
for(var o,t=[],n=arguments&&arguments[0],a=0,s=arguments.length;s>a;a++){
var c=o=arguments[a];
"function"==typeof o&&(o=function(){
try{
return c.apply(this,arguments);
}catch(o){
throw"string"==typeof n&&console.error("[TryCatch][DefineeErr]id:"+n),o.stack&&console&&console.error&&console.error("[TryCatch]"+o.stack),
_&&window.__moon_report&&(window.__moon_report([{
offset:v,
log:"define_error;id:"+n+";",
e:o
}]),i(f)),e(" [define_error]"+JSON.stringify(r(o))),o;
}
},o.toString=function(e){
return function(){
return e.toString();
};
}(arguments[a])),t.push(o);
}
return g.apply(this,t);
});
}(),function(o){
function t(e,o,t){
return window.__DEBUGINFO?(window.__DEBUGINFO.res_list||(window.__DEBUGINFO.res_list=[]),
window.__DEBUGINFO.res_list[e]?(window.__DEBUGINFO.res_list[e][o]=t,!0):!1):!1;
}
function n(e){
var o=new TextEncoder("utf-8").encode(e),t=crypto.subtle||crypto.webkitSubtle;
return t.digest("SHA-256",o).then(function(e){
return r(e);
});
}
function r(e){
for(var o=[],t=new DataView(e),n=0;n<t.byteLength;n+=4){
var r=t.getUint32(n),i=r.toString(16),a="00000000",s=(a+i).slice(-a.length);
o.push(s);
}
return o.join("");
}
function i(e,o,t){
if("object"==typeof e){
var n=Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,function(e,o){
return o;
});
if(t=t||e,"Array"==n){
for(var r=0,i=e.length;i>r;++r)if(o.call(t,e[r],r,e)===!1)return;
}else{
if("Object"!==n&&a!=e)throw"unsupport type";
if(a==e){
for(var r=e.length-1;r>=0;r--){
var s=a.key(r),c=a.getItem(s);
if(o.call(t,c,s,e)===!1)return;
}
return;
}
for(var r in e)if(e.hasOwnProperty(r)&&o.call(t,e[r],r,e)===!1)return;
}
}
}
var a=o.localStorage,s=document.head||document.getElementsByTagName("head")[0],c=1,d=11,_=12,m=13,l=window.__allowLoadResFromMp?1:2,w=window.__allowLoadResFromMp?1:0,u=l+w,p=window.testenv_reshost||window.__moon_host||"res.wx.qq.com",f=new RegExp("^(http(s)?:)?//"+p);
window.__loadAllResFromMp&&(p="mp.weixin.qq.com",l=0,u=l+w);
var h={
prefix:"__MOON__",
loaded:[],
unload:[],
clearSample:!1,
hit_num:0,
mod_num:0,
version:1003,
cacheData:{
js_mod_num:0,
js_hit_num:0,
js_not_hit_num:0,
js_expired_num:0,
css_mod_num:0,
css_hit_num:0,
css_not_hit_num:0,
css_expired_num:0
},
init:function(){
h.loaded=[],h.unload=[];
var e,t,r;
if(window.__moon_report_uin)try{
window.__moon_report_uin%100==120&&(h.clearSample=!0);
}catch(s){}
if(window.no_moon_ls&&(h.clearSample=!0),a){
var c="_moon_ver_key_",d=a.getItem(c);
d!=h.version&&(h.clear(),a.setItem(c,h.version));
}
if((-1!=location.search.indexOf("no_moon1=1")||-1!=location.search.indexOf("no_lshttps=1"))&&h.clear(),
a){
var _=1*a.getItem(h.prefix+"clean_time"),m=+new Date;
if(m-_>=1296e6){
h.clear();
try{
!!a&&a.setItem(h.prefix+"clean_time",+new Date);
}catch(s){}
}
}
i(moon_map,function(i,s){
if(t=h.prefix+s,r=!!i&&i.replace(f,""),e=!!a&&a.getItem(t),version=!!a&&(a.getItem(t+"_ver")||"").replace(f,""),
h.mod_num++,r&&-1!=r.indexOf(".css")?h.cacheData.css_mod_num++:r&&-1!=r.indexOf(".js")&&h.cacheData.js_mod_num++,
h.clearSample||!e||r!=version)h.unload.push(r.replace(f,"")),r&&-1!=r.indexOf(".css")?e?r!=version&&h.cacheData.css_expired_num++:h.cacheData.css_not_hit_num++:r&&-1!=r.indexOf(".js")&&(e?r!=version&&h.cacheData.js_expired_num++:h.cacheData.js_not_hit_num++);else{
if("https:"==location.protocol&&window.moon_hash_map&&window.moon_hash_map[s]&&window.crypto)try{
n(e).then(function(e){
window.moon_hash_map[s]!=e&&console.log(s);
});
}catch(c){}
try{
var d="//# sourceURL="+s+"\n//@ sourceURL="+s;
o.eval.call(o,'define("'+s+'",[],'+e+")"+d),h.hit_num++,r&&-1!=r.indexOf(".css")?h.cacheData.css_hit_num++:r&&-1!=r.indexOf(".js")&&h.cacheData.js_hit_num++;
}catch(c){
h.unload.push(r.replace(f,""));
}
}
}),h.load(h.genUrl());
},
genUrl:function(){
var e=h.unload;
if(!e||e.length<=0)return[];
var o,t,n="",r=[],i={},a=-1!=location.search.indexOf("no_moon2=1"),s="//"+p;
-1!=location.href.indexOf("moon_debug2=1")&&(s="//mp.weixin.qq.com");
for(var c=0,d=e.length;d>c;++c){
/^\/(.*?)\//.test(e[c]);
var _=/^\/(.*?)\//.exec(e[c]);
_.length<2||!_[1]||(t=_[1],n=i[t],n?(o=n+","+e[c],o.length>1e3||a?(r.push(n+"?v="+h.version),
n=location.protocol+s+e[c],i[t]=n):(n=o,i[t]=n)):(n=location.protocol+s+e[c],i[t]=n));
}
for(var m in i)i.hasOwnProperty(m)&&r.push(i[m]);
return r;
},
load:function(e){
if(window.__wxgspeeds&&(window.__wxgspeeds.mod_num=h.mod_num,window.__wxgspeeds.hit_num=h.hit_num),
!e||e.length<=0)return seajs.combo_status=seajs.COMBO_LOADED,seajs.run(),console.debug&&console.debug("[moon] load js complete, all in cache, cost time : 0ms, total count : "+h.mod_num+", hit num: "+h.hit_num),
void window.__moonclientlog.push("[moon] load js complete, all in cache, cost time : 0ms, total count : "+h.mod_num+", hit num: "+h.hit_num);
seajs.combo_status=seajs.COMBO_LOADING;
var o=0,t=+new Date;
window.__wxgspeeds&&(window.__wxgspeeds.combo_times=[],window.__wxgspeeds.combo_times.push(t)),
i(e,function(n){
h.request(n,u,function(){
if(window.__wxgspeeds&&window.__wxgspeeds.combo_times.push(+new Date),o++,o==e.length){
var n=+new Date-t;
window.__wxgspeeds&&(window.__wxgspeeds.mod_downloadtime=n),seajs.combo_status=seajs.COMBO_LOADED,
seajs.run(),console.debug&&console.debug("[moon] load js complete, url num : "+e.length+", total mod count : "+h.mod_num+", hit num: "+h.hit_num+", use time : "+n+"ms"),
window.__moonclientlog.push("[moon] load js complete, url num : "+e.length+", total mod count : "+h.mod_num+", hit num: "+h.hit_num+", use time : "+n+"ms");
}
});
});
},
request:function(o,n,r){
if(o){
n=n||0,o.indexOf("mp.weixin.qq.com")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27613_32_1&r="+Math.random(),
window.__moon_report([{
offset:_,
log:"load_script_from_mp: "+o
}],1));
var i=-1;
window.__DEBUGINFO&&(__DEBUGINFO.res_list||(__DEBUGINFO.res_list=[]),__DEBUGINFO.res_list.push({
type:"js",
status:"pendding",
start:+new Date,
end:0,
url:o
}),i=__DEBUGINFO.res_list.length-1),-1!=location.search.indexOf("no_lshttps=1")&&(o=o.replace("http://","https://"));
var a=document.createElement("script");
a.src=o,a.type="text/javascript",a.async=!0,a.down_time=+new Date,a.onerror=function(s){
t(i,"status","error"),t(i,"end",+new Date);
var _=new Error(s);
if(n>=0)if(w>n){
var l=o.replace("res.wx.qq.com","mp.weixin.qq.com");
h.request(l,n,r);
}else h.request(o,n,r);else window.__moon_report&&window.__moon_report([{
offset:c,
log:"load_script_error: "+o,
e:_
}],1);
if(n==w-1&&window.__moon_report([{
offset:d,
log:"load_script_error: "+o,
e:_
}],1),-1==n){
var u="ua: "+window.navigator.userAgent+", time="+(+new Date-a.down_time)+", load_script_error -1 : "+o;
window.__moon_report([{
offset:m,
log:u
}],1);
}
window.__moonclientlog.push("moon load js error : "+o+", error -> "+_.toString()),
e("moon_request_error url:"+o);
},"undefined"!=typeof moon_crossorigin&&moon_crossorigin&&a.setAttribute("crossorigin",!0),
a.onload=a.onreadystatechange=function(){
t(i,"status","loaded"),t(i,"end",+new Date),!a||a.readyState&&!/loaded|complete/.test(a.readyState)||(t(i,"status","200"),
a.onload=a.onreadystatechange=null,"function"==typeof r&&r());
},n--,s.appendChild(a),e("moon_request url:"+o+" retry:"+n);
}
},
setItem:function(e,o){
!!a&&a.setItem(e,o);
},
clear:function(){
a&&(i(a,function(e,o){
~o.indexOf(h.prefix)&&a.removeItem(o);
}),console.debug&&console.debug("[moon] clear"));
},
idkeyReport:function(e,o,t){
t=t||1;
var n=e+"_"+o+"_"+t;
(new Image).src="/mp/jsmonitor?idkey="+n+"&r="+Math.random();
}
};
seajs&&seajs.use&&"string"==typeof window.__moon_mainjs&&seajs.use(window.__moon_mainjs),
window.moon=h;
}(window),function(){
try{
Math.random()<1;
}catch(e){}
}(),window.moon.init();
};
e(),!!window.__moon_initcallback&&window.__moon_initcallback(),window.__wxgspeeds&&(window.__wxgspeeds.moonendtime=+new Date);
}
}
__moonf__();
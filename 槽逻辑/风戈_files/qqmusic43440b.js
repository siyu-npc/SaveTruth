define("biz_wap/utils/log.js",["biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js"],function(i){
"use strict";
var s=i("biz_wap/utils/mmversion.js"),e=i("biz_wap/jsapi/core.js");
return function(i,n,o){
"string"!=typeof i&&(i=JSON.stringify(i)),n=n||"info",o=o||function(){};
var t;
s.isIOS?t="writeLog":s.isAndroid&&(t="log"),t&&e.invoke(t,{
level:n,
msg:"[WechatFe]"+i
},o);
};
});define("sougou/index.js",["appmsg/emotion/emotion.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/utils/string/html.js","sougou/a_tpl.html.js","appmsg/cmt_tpl.html.js","appmsg/my_comment_tpl.html.js"],function(t){
"use strict";
function e(t){
var e=document.getElementById("js_cover"),n=[];
e&&n.push(e);
var o=document.getElementById("js_content");
if(o)for(var i=o.getElementsByTagName("img")||[],s=0,r=i.length;r>s;s++)n.push(i.item(s));
for(var a=[],s=0,r=n.length;r>s;s++){
var l=n[s],c=l.getAttribute("data-src")||l.getAttribute("src");
c&&(a.push(c),function(e){
m.on(l,"click",function(){
return"ios"==t?window.JSInvoker&&window.JSInvoker.openImageList&&window.JSInvoker.openImageList(JSON.stringify({
index:e,
array:a
})):window.JSInvoker&&JSInvoker.weixin_openImageList&&window.JSInvoker.weixin_openImageList(JSON.stringify({
index:e,
array:a
})),!1;
});
}(s));
}
}
var n=t("appmsg/emotion/emotion.js"),o=t("biz_common/tmpl.js"),m=(t("biz_wap/utils/ajax.js"),
t("biz_common/tmpl.js"),t("biz_common/dom/event.js"));
t("biz_common/utils/string/html.js");
t("sougou/a_tpl.html.js"),t("appmsg/cmt_tpl.html.js");
if(document.getElementById("js_report_article3")&&(document.getElementById("js_report_article3").style.display="none"),
document.getElementById("js_toobar3")&&(document.getElementById("js_toobar3").style.display="none"),
function(){
var e=t("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n&&(n.innerHTML=o.tmpl(e,{}),document.body.appendChild(n));
}(),n.init(),navigator.userAgent.toLowerCase().match(/ios/)){
var i=navigator.userAgent.toLowerCase().match(/(?:sogousearch\/ios\/)(.*)/);
if(i&&i[1]){
var s=i[1].replace(/\./g,"");
parseInt(s)>422&&e("ios");
}
}else e("android");
window.onerror=function(t){
var e=new Image;
e.src="/mp/jsreport?key=86&content="+t+"&r="+Math.random();
};
});define("biz_wap/safe/mutation_observer_report.js",[],function(){
"use strict";
window.addEventListener&&window.addEventListener("load",function(){
window.__moonsafe_mutation_report_keys||(window.__moonsafe_mutation_report_keys={});
var e=window.moon&&moon.moonsafe_id||29715,o=window.moon&&moon.moonsafe_key||0,t=[],n={},r=function(e){
return"[object Array]"==Object.prototype.toString.call(e);
},s=function(e,o,s){
s=s||1,n[e]||(n[e]=0),n[e]+=s,o&&(r(o)?t=t.concat(o):t.push(o)),setTimeout(function(){
a();
},1500);
},a=function(){
var r=[],s=t.length,i=["r="+Math.random()];
for(var c in n)n.hasOwnProperty(c)&&r.push(e+"_"+(1*c+1*o)+"_"+n[c]);
for(var c=0;s>c&&!(c>=10);++c)i.push("log"+c+"="+encodeURIComponent(t[c]));
if(!(0==r.length&&i.length<=1)){
var _,d="idkey="+r.join(";")+"&lc="+(i.length-1)+"&"+i.join("&");
if(window.ActiveXObject)try{
_=new ActiveXObject("Msxml2.XMLHTTP");
}catch(w){
try{
_=new ActiveXObject("Microsoft.XMLHTTP");
}catch(f){
_=!1;
}
}else window.XMLHttpRequest&&(_=new XMLHttpRequest);
_&&(_.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),_.setRequestHeader("cache-control","no-cache"),
_.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
_.setRequestHeader("X-Requested-With","XMLHttpRequest"),_.onreadystatechange=function(){
4===_.readyState&&(t.length>10?(t=t.slice(10),a()):(t=[],n={}));
},t=[],n={},_.send(d));
}
};
try{
if(!window.__observer)return;
var i=window.__observer_data;
if(window.__observer.takeRecords){
var c=window.__observer.takeRecords();
if(c&&c.length){
i.count++;
var _=new Date;
c.forEach(function(e){
for(var o=e.addedNodes,t=0;t<o.length;t++){
var n=o[t];
if("SCRIPT"===n.tagName){
var r=n.src;
!r||/qq\.com/.test(r)||/weishi\.com/.test(r)||i.list.push(r);
}
}
}),i.exec_time+=new Date-_;
}
}
window.__observer.disconnect();
for(var d=window.__moonsafe_mutation_report_keys.observer||2,w=window.__moonsafe_mutation_report_keys.script_src||8,f=window.__moonsafe_mutation_report_keys.setattribute||9,u=window.__moonsafe_mutation_report_keys.ajax||10,m=25,v=0;v<i.list.length;v++){
var l=i.list[v],h=["[moonsafe][observer][url]:"+location.href,"[moonsafe][observer][src]:"+l,"[moonsafe][observer][ua]:"+navigator.userAgent];
i.list.length==v+1&&(h.push("[moonsafe][observer][count]:"+i.count),h.push("[moonsafe][observer][exec_time]:"+i.exec_time+"ms")),
s(d,h),"inlinescript_without_nonce"==l&&s(m,h);
}
var p=window.__danger_src;
if(p)for(var y=[{
key:"xmlhttprequest",
idkey:u
},{
key:"script_src",
idkey:w
},{
key:"script_setAttribute",
idkey:f
}],v=0;v<y.length;v++){
var b=y[v].key,g=p[b];
if(g&&g.length)for(var k=0;k<g.length;k++){
var h=["[moonsafe]["+b+"][url]:"+location.href,"[moonsafe]["+b+"][src]:"+g[k],"[moonsafe]["+b+"][ua]:"+navigator.userAgent];
s(y[v].idkey,h);
}
}
}catch(q){
var R=3,h=["[moonsafe][observer][exception]:"+q];
s(R,h);
}
},!1);
});define("appmsg/fereport.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js","biz_common/base64.js"],function(e){
"use strict";
function n(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var n,i=e.timing,o=0,m=0,r=window.location.protocol,u=Math.random(),p=1>2*u,c=1>25*u,_=1>100*u,l=1>250*u,g=1>1e3*u,f=1>1e4*u,S=!0;
"https:"==r?(o=18,m=27,S=!1):"http:"==r&&(o=9,m=19);
var v=window.__wxgspeeds||{};
if(v&&v.moonloadtime&&v.moonloadedtime){
var B=v.moonloadedtime-v.moonloadtime;
n=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
s.saveSpeeds({
sample:21==n||22==n&&g?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:n,
time:B
},
user_define:w
});
}
v&&v.mod_downloadtime&&s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:24,
time:v.mod_downloadtime
},
user_define:w
});
var h=i.domContentLoadedEventStart-i.navigationStart;
if(h>3e3&&(s.setBasicTime({
sample:_&&S||c&&!S?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:m
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_28_1&lc=1&log0="+window.encodeURIComponent(location.href)),
0==window.optimizing_flag?s.setBasicTime({
sample:g,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:467
}):1==window.optimizing_flag?s.setBasicTime({
sample:_,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:468
}):2==window.optimizing_flag&&s.setBasicTime({
sample:_,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:469
}),s.setBasicTime({
sample:l&&S||_&&!S?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o
}),d.htmlSize){
var I=d.htmlSize/(i.responseEnd-i.connectStart);
s.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:25,
time:Math.round(I)
},
user_define:w
});
}
if(v&&v.combo_times)for(var b=1;b<v.combo_times.length;b++)s.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:26,
time:v.combo_times[b]-v.combo_times[b-1]
},
user_define:w
});
if(v&&v.mod_num){
var R=v.hit_num/v.mod_num;
s.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:[{
sid:27,
time:Math.round(100*R)
},{
sid:28,
time:Math.round(1e3*R)
}],
user_define:w
});
}
var C=window.logs.pagetime.jsapi_ready_time-i.navigationStart;
s.saveSpeeds(156==o||155==o?{
sample:p,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:31,
time:C
},
user_define:w
}:{
sample:g,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:31,
time:C
},
user_define:w
}),s.send(),window.setTimeout(function(){
window.__moonclientlog&&t("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(n=window.WeixinJSBridge&&window.WeixinJSBridge._createdByScriptTag?33:32,
s.saveSpeeds({
sample:f,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:n,
time:window.onBridgeReadyTime-i.navigationStart
},
user_define:w
}),s.send());
},5e3);
}
}
function i(e){
for(var n=[],i=new DataView(e),o=0;o<i.byteLength;o+=4){
var s=i.getUint32(o),d=s.toString(16),t="00000000",a=(t+d).slice(-t.length);
n.push(a);
}
return n.join("");
}
function o(e,n){
var o=new TextEncoder("utf-8").encode(e),s=crypto.subtle||crypto.webkitSubtle;
return s.digest(n,o).then(function(e){
return i(e);
});
}
var s=e("biz_wap/utils/wapsdk.js"),d=e("biz_common/utils/http.js"),t=e("appmsg/log.js"),a=e("biz_common/base64.js"),w=a.toBase64(JSON.stringify({
scene:window.source,
sessionid:window.sessionid
}));
n(),function(){
try{
var e=Math.random(),n=window.localStorage,i=[],d=[];
for(var t in n)-1!=t.indexOf("__MOON__")&&window.moon_map[t.substr(8)]&&i.push(n[t]);
if(window.crypto){
var m="";
m=.5>e?"SHA-256":"SHA-1";
for(var r=(new Date).getTime(),u=0;u<i.length;u++)d.push(o(i[u],m));
Promise.all(d).then(function(){
var n=(new Date).getTime(),i=n-r;
s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:108,
speeds:{
sid:.5>e?21:23,
time:i
},
user_define:w
}),s.send();
});
}else s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:108,
speeds:{
sid:24,
time:1
},
user_define:w
}),s.send();
}catch(p){}
}();
});define("appmsg/fereport_without_localstorage.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js","biz_common/base64.js"],function(e){
"use strict";
function i(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var i,a=e.timing,m=0,w=0,p=window.location.protocol,u=Math.random(),r=1>2*u,_=1>25*u,c=1>100*u,l=1>250*u,g=1>1e3*u,f=1>1e4*u,S=!0;
"https:"==p?(m=462,w=464,S=!1):"http:"==p&&(m=417,w=463);
var B=window.__wxgspeeds||{};
if(B&&B.moonloadtime&&B.moonloadedtime){
var v=B.moonloadedtime-B.moonloadtime;
i=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
o.saveSpeeds({
sample:21==i||22==i&&g?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:i,
time:v
},
user_define:t
});
}
B&&B.mod_downloadtime&&o.saveSpeeds({
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:24,
time:B.mod_downloadtime
},
user_define:t
});
var I=a.domContentLoadedEventStart-a.navigationStart;
if(I>3e3&&(o.setBasicTime({
sample:c&&S||_&&!S?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_28_1&lc=1&log0="+encodeURIComponent(location.href)),
0==window.optimizing_flag?o.setBasicTime({
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:473
}):1==window.optimizing_flag?o.setBasicTime({
sample:c,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:474
}):2==window.optimizing_flag&&o.setBasicTime({
sample:c,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:475
}),o.setBasicTime({
sample:l&&S||c&&!S?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m
}),n.htmlSize){
var R=n.htmlSize/(a.responseEnd-a.connectStart);
o.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:25,
time:Math.round(R)
},
user_define:t
});
}
if(B&&B.combo_times)for(var h=1;h<B.combo_times.length;h++)o.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:26,
time:B.combo_times[h]-B.combo_times[h-1]
},
user_define:t
});
if(B&&B.mod_num){
var C=B.hit_num/B.mod_num;
o.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:[{
sid:27,
time:Math.round(100*C)
},{
sid:28,
time:Math.round(1e3*C)
}],
user_define:t
});
}
var U=window.logs.pagetime.jsapi_ready_time-a.navigationStart;
o.saveSpeeds(156==m||155==m?{
sample:r,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:31,
time:U
},
user_define:t
}:{
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:31,
time:U
},
user_define:t
}),o.send(),window.setTimeout(function(){
window.__moonclientlog&&s("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(i=window.WeixinJSBridge&&window.WeixinJSBridge._createdByScriptTag?33:32,
o.saveSpeeds({
sample:f,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:i,
time:window.onBridgeReadyTime-a.navigationStart
},
user_define:t
}),o.send());
},5e3);
}
}
var o=e("biz_wap/utils/wapsdk.js"),n=e("biz_common/utils/http.js"),s=e("appmsg/log.js"),d=e("biz_common/base64.js"),t=d.toBase64(JSON.stringify({
scene:window.source,
sessionid:window.sessionid
}));
i();
});define("appmsg/report.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(){
var t=(e("biz_wap/utils/mmversion.js"),e("biz_common/utils/report.js"),e("biz_common/utils/monitor.js")),a=!1,r=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
return;
}(),r&&r.timing&&r.timing.navigationStart?(a=r.timing.navigationStart,function(){
return;
}(),function(){
function e(){
if(-1==i.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,n=e.length;n>t;++t)if(-1!=i.indexOf(e[t]))return!0;
return!1;
}
var n=window.performance&&window.performance.timing,r=write_sceen_time-a,s=first_sceen__time-a,d=page_endtime-a,m=(window.onload_endtime||+new Date)-a;
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(r=real_show_page_time-a,s=real_show_page_time-a);
var g=window.logs.jsapi_ready_time?window.logs.jsapi_ready_time-a:void 0,w=window.logs.a8key_ready_time?window.logs.a8key_ready_time-a:void 0,p=n&&n.connectEnd-n.connectStart,c=n&&n.secureConnectionStart&&n.connectEnd-n.secureConnectionStart,u=n&&n.domainLookupEnd&&n.domainLookupStart&&n.domainLookupEnd-n.domainLookupStart;
if(window.logs.pagetime.wtime=r,window.logs.pagetime.ftime=s,window.logs.pagetime.ptime=d,
window.logs.pagetime.onload_time=m,window.logs.pagetime.jsapi_ready_time=g,window.logs.pagetime.a8key_ready_time=w,
need_report_cost?o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["1|1|"+d,"1|2|"+s,"1|3|"+m,"1|4|"+g,"1|5|"+w,"1|6|"+p,"1|7|"+c,"1|8|"+u].join(";")
}
}):Math.random()<.01&&o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["#1|1|"+d,"1|2|"+s,"1|3|"+m,"1|4|"+g,"1|5|"+w,"1|6|"+p,"1|7|"+c,"1|8|"+u].join(";")
}
}),need_report_cost&&s>3e3){
var l=new Image,_=(new Date).getTime();
l.onload=function(){
var e=(new Date).getTime()-_,t=(new Date).getTime(),n=new Image;
n.onload=function(){
var n=(new Date).getTime()-t;
o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["^2|1|"+e,"2|2|"+n].join(";")
}
});
},n.src="http://ugc.qpic.cn/adapt/0/7d8963bb-aace-df23-0569-f8a4e388eacb/100?r="+Math.random();
},l.src="http://ugc.qpic.cn/adapt/0/7d8963bb-aace-df23-0569-f8a4e388eacb/100?r="+Math.random();
}
if(!(Math.random()>.2||0>m||0>r||0>s||0>d)){
if(g&&t.setAvg(27822,15,g),w&&t.setAvg(27822,17,w),d>=15e3)return t.setAvg(27822,29,d),
void t.send();
t.setAvg(27822,1,d).setAvg(27822,3,m).setAvg(27822,5,s),window.isWeixinCached&&t.setAvg(27822,19,d),
e()?(t.setAvg(27822,9,d),window.isWeixinCached&&t.setAvg(27822,23,d)):"wifi"==networkType?(t.setAvg(27822,7,d),
window.isWeixinCached&&t.setAvg(27822,21,d)):"2g/3g"==networkType?(t.setAvg(27822,11,d),
window.isWeixinCached&&t.setAvg(27822,25,d)):"4g"==networkType?(t.setAvg(27822,14,d),
window.isWeixinCached&&t.setAvg(27822,26,d)):(t.setAvg(27822,13,d),window.isWeixinCached&&t.setAvg(27822,28,d)),
window.moon&&moon.clearSample&&(t.setAvg(27822,71,d),e()?t.setAvg(27822,73,d):"wifi"==networkType?t.setAvg(27822,75,d):"2g/3g"==networkType?t.setAvg(27822,77,d):"4g"==networkType?t.setAvg(27822,78,d):t.setAvg(27822,79,d)),
p&&t.setAvg(27822,65,p),c&&t.setAvg(27822,67,c),u&&t.setAvg(27822,69,u),t.send();
}
}(),function(){
window.logs.jsapi_ready_fail&&(t.setSum(24729,55,window.logs.jsapi_ready_fail),t.send());
}(),function(){
var e=document.getElementById("js_toobar3"),t=document.getElementById("page-content"),i=window.innerHeight||document.documentElement.clientHeight;
if(t&&!(Math.random()>.1)){
var o=function(){
var a=window.pageYOffset||document.documentElement.scrollTop,s=e.offsetTop;
if(a+i>=s){
for(var d,m,g=t.getElementsByTagName("img"),w={},p=[],c=0,u=0,l=0,_=0,f=g.length;f>_;++_){
var v=g[_];
d=v.getAttribute("data-src")||v.getAttribute("src"),m=v.getAttribute("src"),d&&(d.isCDN()?u++:l++,
c++,w[m]={});
}
if(p.push("1="+1e3*c),p.push("2="+1e3*u),p.push("3="+1e3*l),r.getEntries){
var y=r.getEntries(),h=window.logs.img.download,A=[0,0,0],k=[0,0,0];
c=u=0;
for(var _=0,T=y.length;T>_;++_){
var j=y[_],b=j.name;
b&&"img"==j.initiatorType&&w[b]&&(b.isCDN()&&(k[0]+=j.duration,u++),A[0]+=j.duration,
c++,w[b]={
startTime:j.startTime,
responseEnd:j.responseEnd
});
}
A[0]>0&&c>0&&(A[2]=A[0]/c),k[0]>0&&u>0&&(k[2]=k[0]/u);
for(var _ in h)if(h.hasOwnProperty(_)){
for(var M=h[_],E=0,x=0,C=0,z=0,S=0,f=M.length;f>S;++S){
var d=M[S];
if(w[d]&&w[d].startTime&&w[d].responseEnd){
var D=w[d].startTime,I=w[d].responseEnd;
E=Math.max(E,I),x=x?Math.min(x,D):D,d.isCDN()&&(C=Math.max(E,I),z=x?Math.min(x,D):D);
}
}
A[1]+=Math.round(E-x),k[1]+=Math.round(C-z);
}
for(var W=4,N=7,_=0;3>_;_++)A[_]=Math.round(A[_]),k[_]=Math.round(k[_]),A[_]>0&&(p.push(W+_+"="+A[_]),
"wifi"==networkType?p.push(W+_+6+"="+A[_]):("2g/3g"==networkType||"4g"==networkType)&&p.push(W+_+12+"="+A[_])),
k[_]>0&&(p.push(N+_+"="+k[_]),"wifi"==networkType?p.push(N+_+6+"="+k[_]):("2g/3g"==networkType||"4g"==networkType)&&p.push(N+_+12+"="+k[_]));
}
n.off(window,"scroll",o,!1);
}
};
n.on(window,"scroll",o,!1);
}
}(),void function(){
if(!(Math.random()>.001)){
var e=document.createElement("iframe"),t=[600,800,1e3,1200,1500,2e3,3e3,5e3,1e4,18e3],n=Math.ceil(10*Math.random())-1,i=uin+mid+idx+Math.ceil(1e3*Math.random())+(new Date).getTime();
e.style.display="none",e.id="js_ajax",e.setAttribute("data-time",n),e.src="/mp/iframetest?action=page&traceid="+i+"&devicetype="+devicetype+"&timeout="+t[n];
var o=document.getElementById("js_article");
o.appendChild(e);
}
}()):!1;
}
var n=e("biz_common/dom/event.js"),i=navigator.userAgent,o=e("biz_wap/utils/ajax.js");
e("appmsg/cdn_img_lib.js"),n.on(window,"load",function(){
if(""==networkType&&window.isInWeixinApp()){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(n){
networkType=e[n.err_msg],"network_type:edge"==n.err_msg&&n.detailtype&&"4g"==n.detailtype&&(networkType="4g"),
t();
});
}else t();
},!1);
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/articleReport.js","biz_wap/utils/ajax.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js"],function(e,o,i,t){
"use strict";
function n(){
var e=window.location.protocol+"//",o=p.indexOf("://")<0?e+p:p;
if(-1!=o.indexOf("mp.weixin.qq.com/s")||-1!=o.indexOf("mp.weixin.qq.com/mp/appmsg/show")||-1!=o.indexOf("mp.weixin.qq.com/mp/homepage")){
var i=o.split("#");
o=m.addParam(i[0],"scene",25,!0)+(i[1]?"#"+i[1]:""),o=o.replace(/#rd$/g,"#wechat_redirect");
}else o=e+"mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(p);
try{
if("mp.weixin.qq.com"!=top.window.location.host)return window.top.open(o,"_blank"),
!1;
}catch(t){}
var n=location.search.replace("wx_header","del_wx_header"),r={
url:"/mp/advertisement_report"+n+"&report_type=3&action_type=0&url="+encodeURIComponent(p)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
},s=1;
return r.timeout=2e3,r.complete=function(){
l(o,{
sample:s,
scene:60,
user_name:user_name,
reject:function(){
location.href=o;
}
});
},a(r),!1;
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),m=e("biz_common/utils/url/parse.js"),s=e("appmsg/articleReport.js"),a=e("biz_wap/utils/ajax.js"),c=msg_title.htmlDecode(),p=msg_source_url.htmlDecode(),l=e("appmsg/open_url_with_webview.js"),_=e("biz_wap/jsapi/core.js");
s.init({
dom:document.getElementById("js_report_article3"),
title:c,
link:window.msg_link
});
var d=document.getElementById("js_view_source");
r.on(d,"click",function(){
return n(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js","biz_wap/utils/mmversion.js","biz_wap/utils/wapsdk.js"],function(e){
"use strict";
function t(e){
window.logs||(window.logs={}),f.js_content=e.js_content||document.getElementById("js_content");
var t=e.js_toobar3||document.getElementById("js_toobar3");
f.pageEndTop=t?t.offsetTop:0,f.imgs=f.js_content?f.js_content.getElementsByTagName("img")||[]:[],
f.media=e.media||document.getElementById("media"),f.title=e.title||(window.msg_title||"").htmlDecode(),
f.video_cnt=e.video_cnt||window.logs.video_cnt||0,f.js_cmt_area=e.js_cmt_area||document.getElementById("js_cmt_area"),
f.item_show_type=e.item_show_type||window.item_show_type||0,p=document.getElementsByTagName("html"),
p&&1==!!p.length&&c&&(p=p[0].innerHTML,j.content_length=c.htmlSize),window.logs.pageinfo=j,
function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(w.on(window,"load",function(){
if(S=1*v.get(k),!window.__second_open__){
var t=location.href.indexOf("scrolltodown")>-1,o=f.js_cmt_area;
if(t&&o&&o.offsetTop){
var n=o.offsetTop;
window.scrollTo(0,n-25);
}else window.scrollTo(0,S),h.saveSpeeds({
uin:uin,
pid:"https:"==T?462:417,
speeds:{
sid:36,
time:Math.ceil(S/f.screen_height)
}
}),h.send();
}
if(window.__wxjs_is_wkwebview||window.__second_open__){
var i=y.getData(),m=localStorage.getItem("hand_up_id");
for(var w in i)w!=m&&i[w]&&(s(i[w].val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random(),
y.remove(w));
window.setInterval(function(){
var e=a();
y.set(B,e,+new Date+864e7);
},1e3);
}
var c=b.getData("spad");
c&&c.spad&&r(c.spad.val),e.hasSpAd&&window.setInterval(function(){
d();
var e=_();
b.set("spad",e,+new Date+864e7);
},1e3),window.setTimeout(function(){
l({
url:"/mp/appmsgreport?action=page_time_5s&__biz="+biz,
type:"POST",
mayAbort:!0,
data:a(),
async:!0,
timeout:2e3
});
},5e3);
}),w.on(window,"unload",function(){
if(console.log("test unload"),!window.__second_open__){
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=a();
s(e);
}
}),window.logs.read_height=0,w.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(E),E=setTimeout(function(){
S=window.pageYOffset,v.set(k,S,+new Date+72e5);
},500);
}),w.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(E),E=setTimeout(function(){
S=window.pageYOffset,v.set(k,S,+new Date+72e5);
},500);
})),w.on(document,"visibilitychange",function(){
u.isHidden()?localStorage.setItem("hand_up_id",B):localStorage.setItem("hand_up_id","");
}),m();
}
function o(e,t){
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,s=0,d=e.length;d>s;++s)o=e[s],
o&&(n=o.getAttribute(t),n&&(i=n.match(a),i&&i[2]&&(z[i[2]]=!0)));
}
function n(e){
for(var t=0,o=O.length;o>t;++t)if(O[t]==e)return!0;
return!1;
}
function i(){
z={},o(document.getElementsByTagName("a"),"href"),o(document.getElementsByTagName("link"),"href"),
o(document.getElementsByTagName("iframe"),"src"),o(document.getElementsByTagName("script"),"src"),
o(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in z)z.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!I&&n(t)&&(I=!0),
e.push(t));
return z={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=f.js_content,n=f.screen_height,a=f.screen_width,s=f.scroll_height,d=Math.ceil(s/n),_=Math.ceil((o.scrollHeight||o.offsetHeight)/n),r=(window.logs.read_height||t)+n,m=f.pageEndTop,w=f.imgs,l=Math.ceil(r/n)||1,c=f.media,g=50,h=0,v=0,y=0,b=0,z=r+g>m?1:0;
l>d&&(l=d);
var T=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
h++;
var a=i.getAttribute("src"),s=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(v++,a.isCDN()&&(y++,-1!=a.indexOf("tp=webp")&&b++),s&&(e["img_"+s+"_cnt"]=e["img_"+s+"_cnt"]||0,
e["img_"+s+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=b||0,e.download_img_cnt=v||0,e.download_cdn_img_cnt=y||0,
e.img_cnt=h||0;
},O=window.appmsgstat||{},x=window.logs.img||{},E=window.logs.pagetime||{},S=x.load||{},k=x.read||{},D=[],B=[],M=0,N=0,H=0;
for(var q in k)q&&0==q.indexOf("http")&&k.hasOwnProperty(q)&&B.push(q);
for(var q in S)q&&0==q.indexOf("http")&&S.hasOwnProperty(q)&&D.push(q);
for(var A=0,P=D.length;P>A;++A){
var Y=D[A];
Y&&Y.isCDN()&&(-1!=Y.indexOf("/0")&&M++,-1!=Y.indexOf("/640")&&N++,-1!=Y.indexOf("/300")&&H++);
}
var e={
report_bizuin:biz,
title:f.title,
mid:mid,
idx:idx,
subscene:window.subscene||1e4,
sessionid:window.sessionid||0,
read_cnt:O.read_num||0,
like_cnt:O.like_num||0,
screen_width:a,
screen_height:n,
screen_num:_,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:f.video_cnt,
read_screen_num:l||0,
is_finished_read:z,
scene:source,
content_len:j.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
handup_time:u.getHandUpTime(),
img_640_cnt:N,
img_0_cnt:M,
img_300_cnt:H,
wtime:E.onload_time||0,
ftime:E.ftime||0,
ptime:E.ptime||0,
onload_time:E.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:window.ct,
item_show_type:f.item_show_type
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=D.length,
e.wifi_read_imgs_cnt=B.length),window.logs.webplog&&4==window.logs.webplog.total){
var K=window.logs.webplog;
e.webp_total=1,e.webp_lossy=K.lossy,e.webp_lossless=K.lossless,e.webp_alpha=K.alpha,
e.webp_animation=K.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var R=window.logs.idkeys,C=[];
for(var L in R)if(R.hasOwnProperty(L)){
var W=R[L];
W.val>0&&C.push(L+"_"+W.val);
}
e.idkey=C.join(";");
}
T(!!c&&c.getElementsByTagName("img")),T(w);
var J=(new Date).getDay(),U=i();
return(I||0!==user_uin&&Math.floor(user_uin/100)%7==J)&&(e.domain_list=U),I&&(e.html_content=p),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e.ascene=window.ascene||-1,0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),e;
}
function s(e){
x||(x=!0,y.remove(B),e.report_time=parseInt(+new Date/1e3),l({
url:"/mp/appmsgreport?action=page_time&__biz="+biz,
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function d(){
v.set(k,S,+new Date+72e5);
}
function _(){
return window.__video_report_data;
}
function r(e){
e&&e.play_type&&(b.remove("spad"),e.report_type=1,l({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function m(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/geticon?__biz="+biz+"&r="+Math.random();
}
e("biz_common/utils/string/html.js");
var w=e("biz_common/dom/event.js"),l=e("biz_wap/utils/ajax.js"),c=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var p,g=e("biz_wap/utils/storage.js"),u=e("biz_wap/utils/hand_up_state.js"),h=(e("biz_wap/utils/mmversion.js"),
e("biz_wap/utils/wapsdk.js")),f={
js_cmt_area:null,
js_content:null,
screen_height:document.documentElement.clientHeight||window.innerHeight,
screen_width:document.documentElement.clientWidth||window.innerWidth,
scroll_height:document.body.scrollHeight||document.body.offsetHeight,
pageEndTop:0,
imgs:[],
media:null,
title:"",
video_cnt:0,
item_show_type:0
},v=new g("page_pos"),y=new g("time_on_page"),b=new g("spad"),j={},z={},T=window.location.protocol,I=!1,O=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],x=!1,E=null,S=0,k=[biz,sn,mid,idx].join("_"),D=Math.random(),B=[biz,sn,mid,idx,D].join("_");
return{
init:t
};
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(){
function e(e){
var t=[];
for(var i in e)t.push(i+"="+encodeURIComponent(e[i]||""));
return t.join("&");
}
if(networkType){
var t=window.performance||window.msPerformance||window.webkitPerformance;
if(t&&"undefined"!=typeof t.getEntries){
var i,n,a=100,o=document.getElementsByTagName("img"),p=o.length,s=navigator.userAgent,g=!1;
/micromessenger\/(\d+\.\d+)/i.test(s),n=RegExp.$1;
for(var m=0,d=o.length;d>m;m++)if(i=parseInt(100*Math.random()),!(i>a)){
var w=o[m].getAttribute("src");
if(w&&!(w.indexOf("mp.weixin.qq.com")>=0)){
for(var f,_=t.getEntries(),u=0;u<_.length;u++)if(f=_[u],f.name==w){
var c=o[m].getAttribute("data-fail");
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:n,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:w,
img_size:o[m].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:p>100?100:p,
delay_time:parseInt(f.duration),
from:window.isSg?"sougou":"",
fail:c
})
}),g=!0;
break;
}
if(g)break;
}
}
}
}
}
var i=e("biz_common/dom/event.js"),n=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
n.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],"network_type:edge"==e.err_msg&&e.detailtype&&"4g"==e.detailtype&&(networkType="4g"),
t();
}),i.on(window,"load",t,!1);
});define("appmsg/wxtopic.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/dom/event.js","appmsg/topic_tpl.html.js"],function(t){
"use strict";
function e(t){
t.parentNode.removeChild(t);
}
function i(t,e){
var i=c;
e.img_url||(e.img_url=topic_default_img);
for(var o in e){
var a=new RegExp("{"+o+"}","g");
i=i.replace(a,e[o]);
}
var p=document.createElement("span");
p.className="db topic_area",p.innerHTML=i,t.parentNode.insertBefore(p,t),t.parentNode.removeChild(t),
r.tap(p,function(){
var e=location.protocol+"//mp.weixin.qq.com/mp/topic?action=topic_detail_page&topic_id="+t.getAttribute("data-topic-id")+"&topic_type="+t.getAttribute("data-topic-type")+"&sn="+t.getAttribute("data-topic-sn")+"&scene=101#wechat_redirect";
n.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t&&-1!==t.err_msg.indexOf(":ok")||(location.href=e);
});
});
}
function o(t){
var o={
topic_id:t.getAttribute("data-topic-id"),
topic_type:t.getAttribute("data-topic-type"),
sn:t.getAttribute("data-topic-sn"),
biz:biz
};
p({
url:"/mp/topic?action=get_topic_info",
type:"post",
data:o,
success:function(o){
if(console.log(o),o=JSON.parse(o),0!=o.base_resp.ret)return void e(t);
var a={
title:o.title,
author:o.author||(o.leading_actor?o.leading_actor.replace(/\$\$/g," / "):"-"),
img_url:o.img_url,
msg_num:o.msg_num
};
i(t,a);
},
error:function(){
e(t);
}
});
}
function a(){
var t=document.getElementsByTagName("wxtopic");
t[0]&&o(t[0]);
}
var p=t("biz_wap/utils/ajax.js"),n=t("biz_wap/jsapi/core.js"),r=t("biz_common/dom/event.js"),c=t("appmsg/topic_tpl.html.js");
a();
});define("appmsg/weapp.js",["biz_common/utils/string/html.js","pages/weapp_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/tmpl.js","biz_common/dom/class.js","appmsg/weapp_common.js"],function(e){
"use strict";
function t(e,t,n){
var o=new Image;
o.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=106&content="+n+",biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(t.toString())+"&r="+Math.random()).substr(0,1024);
}
function n(e,t,n,o,i,a,p){
_({
url:"/mp/appmsgreport?action=appmsg_weapp_report",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e||"",
weapp_pos:t||0,
weapp_title:o||0,
weapp_nickname:n||0,
type:i||0,
scene:window.source||-1,
weapp_type:a,
is_confirm:p||0,
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
function o(){
var e=s("js_content");
if(!e)return!1;
v=e.getElementsByTagName("mp-weapp")||[],b=e.getElementsByTagName("mp-miniprogram")||[],
I=[];
for(var t=e.getElementsByTagName("a"),n=0,o=t.length;o>n;n++){
var i=t[n],a=i.getAttribute("data-miniprogram-appid");
a&&I.push(i);
}
return v.length<=0&&b.length<=0&&0==I.length?!1:C&&0!=C.length?!0:!1;
}
function i(e){
return e=e||"",e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function a(e,t,o,i,a){
n(e,t,o,i,4,a),window.__addIdKeyReport&&window.__addIdKeyReport("28307",103);
}
function p(e,t,o,i,a){
n(e,t,o,i,5,a);
}
function r(){
function e(e){
e&&(d=setTimeout(function(){
e.style.display="none",s=-1;
},100));
}
window.reportWeappid=[];
for(var o=0;o<C.length;o++)window.reportWeappid.push(C[o].appid);
var r=function(){};
g.on(document.getElementById("js_minipro_dialog_ok"),"click",function(){
r&&r(),document.getElementById("js_minipro_dialog").style.display="none";
}),g.on(document.getElementById("js_minipro_dialog_cancel"),"click",function(){
var e=document.getElementById("js_minipro_dialog");
e.style.display="none",n(e._appid,e._i,e._nickname,e._title,3,1,1),window.__addIdKeyReport&&window.__addIdKeyReport("28307",116);
});
var d,s,_=!y.canJumpOnTap||y.isNonWechat,v=document.getElementById("js_pc_weapp_code"),b=document.getElementById("js_pc_weapp_code_img"),I=document.getElementById("js_pc_weapp_code_des");
_&&(g.on(v,"mouseenter",function(){
clearTimeout(d);
}),g.on(v,"mouseleave",function(){
e(v);
})),y.getAppidInfo({
onSuccess:function(j){
console.log("WeappCommon.getAppidInfo onsuccess");
var C=j.data.infoMap;
if(C){
for(o=0;o<k.length;o++)(function(o){
window.__addIdKeyReport("111535",1);
var j=k[o].appid,E=k[o].path,x=k[o].imageUrl,R=k[o].title,T=k[o].elem,B=C[j];
if(B){
var K=T.tagName.toLowerCase(),z=T.firstChild&&1==T.firstChild.nodeType&&"IMG"===T.firstChild.tagName;
if(z=z||T.firstElementChild&&"IMG"===T.firstElementChild.tagName,"a"!=K)T.innerHTML=w.tmpl(f,{
imageUrl:i(x),
title:i(R),
nickname:i(B.nickname),
avatar:i(B.logo_url)
});else{
if(z){
var A=T.firstChild;
A&&h.addClass(T,"weapp_image_link");
}else h.addClass(T,"weapp_text_link");
T.setAttribute("href","");
}
g.on(T,"tap",function(){
if(r=function(){
var e=z?1:"a"==K?2:0;
return y.jumpUrl({
sceneNote:encodeURIComponent(location.href),
appid:j,
path:E,
scene:1058,
beforeNonWechatWarn:function(){
p(j,o,B.nickname,R,e);
},
beforeJumpBackupPage:function(){
a(j,o,B.nickname,R,e);
},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102),
t(107,new Error(e.err_msg),"");
}
}),window.__addIdKeyReport&&window.__addIdKeyReport("28307",100),n(j,o,B.nickname,R,3,e,z?2:0),
z&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",115),!1;
},z&&wxa_img_alert){
document.getElementById("js_minipro_dialog_name").innerText=B.nickname;
var e=document.getElementById("js_minipro_dialog");
return r(),e._appid=j,e._i=o,e._nickname=B.nickname,e._title=R,n(j,o,B.nickname,R,3,1,0),
y.canJumpOnTap&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",114),!1;
}
return r();
},"a"==K),_&&(g.on(T,"mouseenter",function(){
function e(e){
function t(){
if(!g&&s===o){
v.style.display="block",g=!0;
var e=v.offsetHeight,t=v.offsetWidth;
"a"!=K||z?n>t?(c(v,"right-center"),v.style.left=n-t-_+"px",v.style.top=i+"px"):(c(v),
v.style.top=i+f-e-_+"px",v.style.left=n+d-t-_+"px"):(v.style.left=a>n+d/2-t/2?a+"px":n+d/2+t/2>a+p?a+p-t+"px":n+d/2-t/2+"px",
r>e?(c(v,"down-center"),v.style.top=i-e-_+"px"):(c(v,"up-center"),v.style.top=i+f-_+"px"));
}
}
if(e){
var n=l(T),i=m(z?T.firstElementChild:T),a=l(T.parentNode),p=T.parentNode.offsetWidth,r=T.getBoundingClientRect().top,d=z?T.firstElementChild.offsetWidth:T.offsetWidth,f=z?T.firstElementChild.offsetHeight:T.offsetHeight,_=8,g=!1;
I.innerText=u(B.nickname,48),b.onload=t,b.src=e,(b.complete||b.width)&&t();
}
}
clearTimeout(d),s!==o&&(v.style.display="none",s=o,y.getAppidCode({
appid:j,
path:E
},e));
}),g.on(T,"mouseleave",function(){
e(v);
}));
}
})(o);
var x=null,R=function(){
x=null;
for(var e=window.innerHeight||document.documentElement.clientHeight,t=0;t<E.length;t++){
var o=E[t].elem,i=o.tagName.toLowerCase(),a=o.firstChild&&1==o.firstChild.nodeType,p=a?1:"a"==i?2:0,r=E[t].elem.getBoundingClientRect();
r.top<e&&r.bottom>0&&(setTimeout(function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307",101);
},0),n(E[t].appid,t,C[E[t].appid].nickname,E[t].title,2,p),E.splice(t--,1));
}
};
R(),g.on(window,"scroll",function(){
x||(x=setTimeout(R,100));
});
}
},
onError:function(e){
3==e.code&&t(106,e.catchErr,"parsing weapp info error");
}
});
}
function d(){
for(var e=0;e<b.length+v.length;e++){
var t=e<b.length,n=t?b[e]:v[e-b.length],o=n.getAttribute(t?"data-miniprogram-appid":"data-weapp-appid")||"",i=n.getAttribute(t?"data-miniprogram-path":"data-weapp-path")||"",a=n.getAttribute(t?"data-miniprogram-imageUrl":"data-weapp-imageUrl")||"",p=n.getAttribute(t?"data-miniprogram-title":"data-weapp-title")||"",r=document.createElement("span");
n.setAttribute("class",""),r.setAttribute("class","weapp_display_element js_weapp_display_element"),
k.push({
appid:o,
path:i,
imageUrl:a,
title:p,
elem:r
}),E.push({
appid:o,
elem:r,
title:p
}),n.parentNode.insertBefore(r,n.nextSibling);
}
for(var e=0;e<I.length;e++){
var d=I[e];
k.push({
appid:d.getAttribute("data-miniprogram-appid"),
path:d.getAttribute("data-miniprogram-path")||"",
elem:d
});
}
}
function s(e){
return document.getElementById(e);
}
function l(e){
for(var t=0;e;)t+=e.offsetLeft,e=e.offsetParent;
return t;
}
function m(e){
for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;
return t;
}
function c(e,t){
for(var n=0;3>n;n++)h.removeClass(e,"weui-desktop-popover_pos-up-"+x[n]),h.removeClass(e,"weui-desktop-popover_pos-down-"+x[n]),
h.removeClass(e,"weui-desktop-popover_pos-left-"+R[n]),h.removeClass(e,"weui-desktop-popover_pos-right-"+R[n]);
h.removeClass(e,"weui-desktop-popover_hide-arrow"),t?h.addClass(e,"weui-desktop-popover_pos-"+t):h.addClass(e,"weui-desktop-popover_hide-arrow");
}
function u(e,t){
var n=/[^\x00-\xff]/g;
if(e.replace(n,"**").length>t)for(var o=Math.floor(t/2),i=o,a=e.length;a>i;i++)if(e.substring(0,i).replace(n,"**").length>=t)return e.substring(0,i)+"...";
return e;
}
e("biz_common/utils/string/html.js");
var f=e("pages/weapp_tpl.html.js"),_=e("biz_wap/utils/ajax.js"),g=e("biz_common/dom/event.js"),w=e("biz_common/tmpl.js"),h=e("biz_common/dom/class.js"),y=e("appmsg/weapp_common.js"),v=null,b=null,I=null,j={},k=[],C=y.appidSnInfo,E=[];
if(o()){
d(),r();
var x=["left","center","right"],R=["top","center","bottom"];
return j;
}
});define("appmsg/weproduct.js",["appmsg/weapp_common.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_common/utils/monitor.js"],function(t){
"use strict";
function e(){
if(console.log("weproduct init"),"function"==typeof document.getElementsByClassName){
var t=document.getElementsByClassName("js_product_container");
t&&t.length>0&&(a(t),p.getAppidInfo({
onSuccess:function(e){
m.data=e.data,o(t);
}
})),r();
}
}
function a(t){
try{
for(var e=0,a=t.length;a>e;e++){
var o=t[e];
if(o.className.indexOf("js_list_container")>=0){
var i=o.querySelector("img.js_cover");
if(i){
var r=i.parentNode.getBoundingClientRect();
i.style.setProperty("width",r.width+"px","important"),i.style.setProperty("height",r.height+"px","important"),
i.style.setProperty("background-size","unset","important"),"0"==i.getAttribute("data-fail")?n.call(i):i.getAttribute("data-fail")||(i.lazyLoadOnload=i.lazyLoadOnload||[],
i.lazyLoadOnload.push(n));
}
}
}
}catch(d){}
}
function n(){
var t=this.parentNode;
if(t){
var e=document.createElement("span");
e.className=this.className,e.style.background='url("'+this.src+'") no-repeat center',
t.insertBefore(e,this),t.removeChild(this);
}
}
function o(t){
for(var e=0,a=t.length;a>e;e++)!function(t,e){
c.on(t,"tap",".js_product_loop_content",function(t){
var a=t.delegatedTarget,n=a.getAttribute("data-wxaappid"),o=a.getAttribute("data-wxapath"),i=a.getAttribute("data-pid"),r=a.getAttribute("data-appid");
return p.jumpUrl({
privateExtraData:{
cookies:"cps_package=123456; expires=1538286412; busid=mmbiz_ad_cps; domain=*"
},
sourceAppId:r,
appid:n,
path:o,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(i),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
if("openWeApp:ok"===t.err_msg&&i){
var o=a.getAttribute("data-pidtype"),r=2;
2==o&&(r=4),d([{
wxa_appid:n,
pid:i,
type:r,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
}]);
}
}
}),!1;
});
}(t[e],e);
var n=document.getElementsByClassName("js_product_loop_content");
if(n&&n.length>0&&m.innerHeight){
for(var e=0;e<n.length;e++)m.pvele.push(n[e]);
i(),c.on(window,"scroll",i);
}
}
function i(){
m.checkInScreenId&&clearTimeout(m.checkInScreenId),m.checkInScreenId=setTimeout(function(){
m.checkInScreenId=null;
for(var t=[],e=0;e<m.pvele.length;e++){
var a=m.pvele[e],n=a.getBoundingClientRect(),o=n.height||n.bottom-n.top;
if(o>0&&n.top<m.innerHeight&&n.bottom>0){
var r=a.getAttribute("data-pid");
if(r){
var p=a.getAttribute("data-pidtype"),s=1;
2==p&&(s=3),t.push({
wxa_appid:a.getAttribute("data-wxaappid"),
pid:r,
type:s,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
});
}
m.pvele.splice(e--,1);
}
}
d(t),0==m.pvele.length&&(c.off(window,"scroll",i),i=null);
},100);
}
function r(){
setTimeout(function(){
var t=document.getElementsByClassName("js_product_loop_content").length,e=document.getElementsByClassName("js_product_err_container").length;
u.setSum("64469","15",t+e),u.setSum("64469","16",t),u.setSum("64469","18",e),u.send();
},0);
}
function d(t){
if(t&&0!=t.length){
for(var e={
batch_no:l.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
total:t.length
},a=0;a<t.length;a++){
var n=t[a],o=a+1;
for(var i in n)n.hasOwnProperty(i)&&(e[i+""+o]=n[i]);
}
s({
url:"/mp/productreport?",
type:"POST",
data:e,
dataType:"json",
async:!0
});
}
}
var p=t("appmsg/weapp_common.js"),c=t("biz_common/dom/event.js"),s=t("biz_wap/utils/ajax.js"),l=t("biz_common/utils/url/parse.js"),u=t("biz_common/utils/monitor.js"),m={
pvele:[],
innerHeight:window.innerHeight||document.documentElement.clientHeight,
checkInScreenId:null,
reportRandom:Math.random()
};
e();
});define("appmsg/voicemsg.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_common/dom/class.js"],function(e){
"use strict";
function o(e){
return document.getElementById(e);
}
function i(){
"1"==window.show_msg_voice&&(s.invoke("getBackgroundAudioState",{},function(e){
console.log("voicemsg getBackgroundAudioState res",e);
var i="waiting"==e.playState||"seeked"==e.playState||"seeking"==e.playState||"play"==e.playState;
e.paused=1*e.paused,e&&!e.paused&&i&&e.src&&e.src.indexOf("/mp/msgvoice?action=get_voice")>=0?a||(o("js_msgvoice_reading").style.display="",
o("js_msgvoice_reading_title").innerHTML=e.title,console.log("hello msgvoice reading"),
n.on(o("js_msgvoice_reading"),"click",function(){
location.href=e.musicbar_url||"https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"#wechat_redirect";
}),c.addClass(o("page-content"),"voice"),console.log("add class voice in page-content"),
a=!0):(a=!1,o("js_msgvoice_reading").style.display="none",c.removeClass(o("page-content"),"voice"),
console.log("removeClass done"));
}),console.log("begin to getBackgroundAudioState in show_msg_voice"),setTimeout(function(){
i(),4>=d&&(d++,t+=1e3);
},t)),console.log("show_msg_voice is",window.show_msg_voice);
}
var s=e("biz_wap/jsapi/core.js"),n=e("biz_common/dom/event.js"),c=e("biz_common/dom/class.js"),t=1e3,a=!1,d=0;
i();
});define("appmsg/autoread.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","pages/voice_tpl.html.js","pages/voice_component.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
var e=d("autoread");
e&&(e.innerHTML='<p><label>朗读类型：</label>                                <select id="autoreadSelect">                                <option selected="true" value="0">女1</option>                                <option value="1">女2</option>                                <option value="2">男1</option>                                <option value="6">男2</option>                                </select></p><p id="autoread_voice"></p>',
r.on(d("autoreadSelect"),"change",function(){
p.player&&(p.player.destory(),p.player=null),p.checkAudioId&&(clearTimeout(p.checkAudioId),
p.checkAudioId=null);
var e=d("autoreadSelect");
d("autoread_voice").innerHTML="",o(e.value);
}),o(0));
}
function o(e){
var i=d("autoread_voice");
p._oMusic={
voiceid:p.voiceid,
duration_str:"",
posIndex:p.posIndex,
title:"文章朗读体验（"+p.voiceType[e||0]+"）",
nickname:window.nickname||"公众号"
},s.renderPlayer(u,p._oMusic,i,!0),d("voice_author_"+p.key).innerHTML="来自"+p._oMusic.nickname+"（创建音频中）",
c(e);
}
function n(e,i){
var o=p._oMusic;
d("voice_author_"+p.key).innerHTML="来自"+o.nickname,d("voice_duration_"+p.key).innerHTML=s.formatTime(1*i),
p.player=s.init({
protocal:"hls",
wxIndex:o.posIndex,
type:2,
songId:e,
src:a("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&media="+e),
allowPause:!0,
autoPlay:!0,
duration:i,
title:o.title,
singer:o.nickname?o.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:d("voice_main_"+p.key),
playArea:d("voice_play_"+p.key),
progress:d("voice_progress_"+p.key),
fileSize:o.fileSize,
playtimeDom:d("voice_playtime_"+p.key),
bufferDom:d("voice_buffer_"+p.key),
playdotDom:d("voice_playdot_"+p.key),
seekRange:d("voice_seekRange_"+p.key),
seekContainer:d("voice_main_"+p.key),
loadingDom:d("voice_loading_"+p.key)
});
}
function t(e){
p.curNum+=1;
var i=1e3;
p.curNum>p.maxNum&&(i=2e3);
var o=["/mp/msgvoice?action=get_media&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(o){
o.mediaid&&o.duration?n(o.mediaid,o.duration):p.checkAudioId=setTimeout(function(){
t(e);
},i);
},
error:function(){
p.checkAudioId=setTimeout(function(){
t(e);
},i);
}
});
}
function a(e){
return e+=["&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&uin=",window.uin||"","&key=",window.key||"","&pass_ticket=",window.pass_ticket||"","&clientversion=",window.clientversion||"","&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join("");
}
function c(e){
p.curNum=0;
var i=["/mp/msgvoice?action=tts&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:i,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?t(e):d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
},
error:function(){
d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
}
});
}
function d(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),u=e("pages/voice_tpl.html.js"),s=e("pages/voice_component.js"),m=e("biz_wap/utils/ajax.js"),p={
checkId:"",
voiceid:"autoread",
posIndex:0,
key:"autoread_0",
voiceType:{
0:"女1",
1:"女2",
2:"男1",
6:"男2"
},
maxNum:5,
curNum:0
};
i();
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","appmsg/log.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=a("js_content");
return e?(p._oElements=e.getElementsByTagName("mpvoice")||[],p._oElements.length<=0?!1:!0):!1;
}
function o(){
p.musicLen=p._oElements.length;
}
function n(){
for(var e=0,i=0;i<p.musicLen;i++){
var o=p._oElements[i],n={},c=o.getAttribute("voice_encode_fileid")||"";
try{
c=decodeURIComponent(c);
}catch(a){}
n.voiceid=r.encodeStr(c),n.voiceid=n.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
n.isaac=1*o.getAttribute("isaac2")||0,n.src=p.srcRoot.replace("#meidaid#",n.voiceid),
1===n.isaac&&(n.jsapi2Src=n.src+"&voice_type=1"),n.voiceid&&"undefined"!=n.voiceid&&(t(o,n,e),
e++);
}
}
function t(e,i,o){
i.duration=parseInt((1*e.getAttribute("play_length")||0)/1e3,10),i.duration_str=r.formatTime(i.duration),
i.posIndex=o;
var n=e.getAttribute("name")||"";
try{
n=decodeURIComponent(n);
}catch(t){}
i.title=r.encodeStr(n).replace(/^\s/,"").replace(/\s$/,""),i.fileSize=1*e.getAttribute("high_size")||0,
i.nickname=window.nickname,r.renderPlayer(d,i,e),c(i),p.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.voiceid+"_"+e.posIndex,o="";
if(window.voice_in_appmsg&&window.voice_in_appmsg[e.voiceid]){
var n=window.voice_in_appmsg[e.voiceid],t=window.biz||"",c=window.mid||"",d=window.idx||"";
n.bizuin&&n.appmsgid&&n.idx&&(t=n.bizuin,c=n.appmsgid,d=n.idx);
var p=window.location.protocol||"https:";
o=p+"//mp.weixin.qq.com/mp/audio?_wxindex_=#_wxindex_#&scene=104&__biz=#biz#&mid=#mid#&idx=#idx#&voice_id=#voice_id#&sn=#sn##wechat_redirect".replace("#_wxindex_#",e.posIndex).replace("#biz#",t).replace("#mid#",c).replace("#idx#",d).replace("#voice_id#",e.voiceid).replace("#sn#",n.sn||"");
}
s("[Voice] init"+o);
var m=r.decodeStr(e.title);
e.player=r.init({
wxIndex:e.posIndex,
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
jsapi2Src:e.jsapi2Src,
allowPause:!0,
duration:e.duration,
title:m,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:a("voice_main_"+i),
playArea:a("voice_play_"+i),
progress:a("voice_progress_"+i),
fileSize:e.fileSize,
playtimeDom:a("voice_playtime_"+i),
bufferDom:a("voice_buffer_"+i),
playdotDom:a("voice_playdot_"+i),
seekRange:a("voice_seekRange_"+i),
seekContainer:a("voice_main_"+i),
loadingDom:a("voice_loading_"+i),
detailArea:o?a("voice_detail_"+i):"",
detailUrl:o,
webUrl:o
});
}
function a(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var d=e("pages/voice_tpl.html.js"),s=e("appmsg/log.js"),r=e("pages/voice_component.js"),p={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return i()?(o(),n(),p.musicList):void 0;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(p._oElements=e.getElementsByTagName("qqmusic")||[],p._oElements.length<=0?!1:!0):!1;
}
function i(){
p.musicLen=p._oElements.length;
}
function s(){
for(var e=0,t=0;t<p.musicLen;t++){
var i=p._oElements[t],s={};
s.musicid=l.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
if(t.media_id=l.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=l.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=l.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=l.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=l.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=l.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=l.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
!t.singer||"undefined"==t.singer){
var s=e.getAttribute("src")||"",r=decodeURIComponent(a.getQuery("singer",s)||"");
t.singer=l.encodeStr(r).replace(/^\s/,"").replace(/\s$/,""),t.singer&&"undefined"!=t.singer||(t.singer="");
}
t.music_name=l.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
p.adapter[t.musictype]&&"function"==typeof p.adapter[t.musictype].initData&&(t=p.adapter[t.musictype].initData(t,{
scene:0
})),l.renderPlayer(m,t,e),n(t),p.musicList[t.musicid+"_"+t.posIndex]=t;
}
function n(e){
var t=e.musicid+"_"+e.posIndex;
c("[Music] init "+e.detailUrl);
var i=l.decodeStr(e.music_name);
e.player=l.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"音乐",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:u("qqmusic_home_"+t)
});
}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var a=e("biz_common/utils/url/parse.js"),c=e("appmsg/log.js"),m=e("pages/qqmusic_tpl.html.js"),l=e("pages/voice_component.js"),p={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),p.musicList):void 0;
});
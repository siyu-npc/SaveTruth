define("appmsg/fereport.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js"],function(e){
"use strict";
function i(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var i,s=e.timing,d=0,a=0,m=window.location.protocol,p=Math.random(),r=1>2*p,u=1>25*p,l=1>100*p,w=1>250*p,c=1>1e3*p,g=1>1e4*p,_=!0;
"https:"==m?(d=18,a=27,_=!1):"http:"==m&&(d=9,a=19);
var v=window.__wxgspeeds||{};
if(v&&v.moonloadtime&&v.moonloadedtime){
var S=v.moonloadedtime-v.moonloadtime;
i=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
n.saveSpeeds({
sample:21==i||22==i&&c?1:0,
uin:uin,
pid:d,
speeds:{
sid:i,
time:S
}
});
}
v&&v.mod_downloadtime&&n.saveSpeeds({
uin:uin,
pid:d,
speeds:{
sid:24,
time:v.mod_downloadtime
}
});
var f=s.domContentLoadedEventStart-s.navigationStart;
if(f>3e3&&(n.setBasicTime({
sample:l&&_||u&&!_?1:0,
uin:uin,
pid:a
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_28_1&lc=1&log0="+encodeURIComponent(location.href)),
n.setBasicTime({
sample:w&&_||l&&!_?1:0,
uin:uin,
pid:d
}),o.htmlSize){
var h=o.htmlSize/(s.responseEnd-s.connectStart);
n.saveSpeeds({
sample:c,
uin:uin,
pid:d,
speeds:{
sid:25,
time:Math.round(h)
}
});
}
if(v&&v.combo_times)for(var b=1;b<v.combo_times.length;b++)n.saveSpeeds({
sample:w,
uin:uin,
pid:d,
speeds:{
sid:26,
time:v.combo_times[b]-v.combo_times[b-1]
}
});
if(v&&v.mod_num){
var j=v.hit_num/v.mod_num;
n.saveSpeeds({
sample:w,
uin:uin,
pid:d,
speeds:[{
sid:27,
time:Math.round(100*j)
},{
sid:28,
time:Math.round(1e3*j)
}]
});
}
var y=window.logs.pagetime.jsapi_ready_time-s.navigationStart;
n.saveSpeeds(156==d||155==d?{
sample:r,
uin:uin,
pid:d,
speeds:{
sid:31,
time:y
}
}:{
sample:c,
uin:uin,
pid:d,
speeds:{
sid:31,
time:y
}
}),n.send(),window.setTimeout(function(){
window.__moonclientlog&&t("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(i=top.window.WeixinJSBridge&&top.window.WeixinJSBridge._createdByScriptTag?33:32,
n.saveSpeeds({
sample:g,
uin:uin,
pid:d,
speeds:{
sid:i,
time:window.onBridgeReadyTime-s.navigationStart
}
}),n.send());
},5e3);
}
}
var n=e("biz_wap/utils/wapsdk.js"),o=e("biz_common/utils/http.js"),t=e("appmsg/log.js");
i(),function(){
function e(e){
var n=new TextEncoder("utf-8").encode(e),o=crypto.subtle||crypto.webkitSubtle;
return o.digest(m,n).then(function(e){
return i(e);
});
}
function i(e){
for(var i=[],n=new DataView(e),o=0;o<n.byteLength;o+=4){
var t=n.getUint32(o),s=t.toString(16),d="00000000",a=(d+s).slice(-d.length);
i.push(a);
}
return i.join("");
}
try{
var o=Math.random(),t=window.localStorage,s=[],d=[];
for(var a in t)-1!=a.indexOf("__MOON__")&&window.moon_map[a.substr(8)]&&s.push(t[a]);
if(window.crypto){
var m="";
m=.5>o?"SHA-256":"SHA-1";
for(var p=(new Date).getTime(),r=0;r<s.length;r++)d.push(e(s[r]));
Promise.all(d).then(function(){
var e=(new Date).getTime(),i=e-p;
n.saveSpeeds({
uin:uin,
pid:108,
speeds:{
sid:.5>o?21:23,
time:i
}
}),n.send();
});
}else n.saveSpeeds({
uin:uin,
pid:108,
speeds:{
sid:24,
time:1
}
}),n.send();
}catch(u){}
}();
});
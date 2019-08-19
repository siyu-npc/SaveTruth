define("appmsg/share_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <a href="<#= url #>" class="share_appmsg_container appmsg_card_context flex_context">\n        <div class="flex_hd">\n            <i class="share_appmsg_icon"> </i>\n        </div>\n        <div class="flex_bd">\n            <div class="share_appmsg_title">分享给订阅用户</div>\n            <p class="share_appmsg_desc">可快速分享原创文章给你的公众号订阅用户</p>\n        </div>\n    </a>\n</div>\n';
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js"],function(e){
"use strict";
function t(e){
function t(e){
for(var t=window.location.href,s=t.indexOf("?"),i=t.substr(s+1),n=i.split("&"),a=0;a<n.length;a++){
var _=n[a].split("=");
if(_[0].toUpperCase()==e.toUpperCase())return _[1];
}
return"";
}
var a={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
idx:"",
scene:"",
title:"",
ct:"",
abtest_cookie:"",
devicetype:"",
version:"",
is_need_ticket:0,
is_need_ad:0,
comment_id:"",
is_need_reward:0,
both_ad:0,
reward_uin_count:0,
send_time:"",
msg_daily_idx:"",
is_original:0,
is_only_read:0,
req_id:"",
pass_ticket:"",
is_temp_url:0,
more_read_type:0,
rtId:"",
rtKey:"",
appmsg_like_type:1,
onSuccess:function(){},
onError:function(){}
};
for(var _ in e)e.hasOwnProperty(_)&&(a[_]=e[_]);
console.info("[(评论、点赞、赞赏) 发送请求]: ",new Date),i({
url:"/mp/getappmsgext?f=json&mock="+t("mock"),
data:{
r:Math.random(),
__biz:a.biz,
appmsg_type:a.appmsg_type,
mid:a.mid,
sn:a.sn,
idx:a.idx,
scene:a.scene,
title:encodeURIComponent(a.title.htmlDecode()),
ct:a.ct,
abtest_cookie:a.abtest_cookie,
devicetype:a.devicetype.htmlDecode(),
version:a.version.htmlDecode(),
is_need_ticket:a.is_need_ticket,
is_need_ad:a.is_need_ad,
comment_id:a.comment_id,
is_need_reward:a.is_need_reward,
both_ad:a.both_ad,
reward_uin_count:a.is_need_reward?a.reward_uin_count:0,
send_time:a.send_time,
msg_daily_idx:a.msg_daily_idx,
is_original:a.is_original,
is_only_read:a.is_only_read,
req_id:a.req_id,
pass_ticket:a.pass_ticket,
is_temp_url:a.is_temp_url,
item_show_type:a.item_show_type,
tmp_version:1,
more_read_type:a.more_read_type,
appmsg_like_type:a.appmsg_like_type
},
type:"POST",
dataType:"json",
rtId:a.rtId,
rtKey:a.rtKey,
rtDesc:n,
async:!0,
success:function(e){
if(console.info("[(评论、点赞、赞赏) 响应请求]: ",new Date,e),s("[Appmsg] success get async data"),
"function"==typeof a.onSuccess&&a.onSuccess(e),e)try{
s("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(t){}else s("[Appmsg] success get async data, async data is empty");
},
error:function(){
s("[Appmsg] error get async data, biz="+a.biz+", mid="+a.mid),"function"==typeof a.onError&&a.onError();
}
});
}
var s=e("appmsg/log.js"),i=e("biz_wap/utils/ajax.js"),n=e("rt/appmsg/getappmsgext.rt.js");
return{
getData:t
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("pages/video_ctrl.js",[],function(){
"use strict";
function n(n){
n=n||window;
var i=n.cgiData;
return i&&2==i.ori_status&&1==i.is_mp_video&&(i.nick_name||i.hit_username)?!0:!1;
}
function i(n){
return n=n||window,!1;
}
function e(){
return-1!=r.indexOf("&vl=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function t(){
return-1!=r.indexOf("&dd=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function o(){
var n;
if(parent==window)n=window;else try{
{
parent.window.__videoDefaultRatio;
}
n=parent.window;
}catch(i){
n=window;
}
var e=n.__videoDefaultRatio||16/9;
return"54"==n.appmsg_type?e:e;
}
var r=window.location.href;
return{
showPauseTips:t,
showVideoLike:e,
showVideoDetail:i,
showReprint:n,
getRatio:o
};
});define("pages/create_txv.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax_load_js.js","pages/loadscript.js"],function(e){
"use strict";
function n(){
"function"!=typeof window.__createTxVideo&&(window.__createTxVideo=function(e){
o(e);
});
}
function o(e){
var n=function(){},o=function(){};
"function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(n=e.onError),
r.Load({
url:c.jsUrl,
version:c.jsVersion,
useCache:!0,
win:e.win,
onSuccess:function(s){
2!=s.code&&3!=s.code||0!=s.queueIndex||(i.setSum("64728","111",1),i.setSum("64728","112",1));
var u=e.win||window,a=!0;
if(u.Txp&&"function"==typeof u.Txp.Player?(a=!0,0==s.queueIndex&&(2==s.code?i.setSum("64728","116",1):3==s.code&&i.setSum("64728","117",1),
i.send())):(a=!1,0==s.queueIndex&&(2==s.code?i.setSum("64728","114",1):3==s.code&&i.setSum("64728","115",1),
i.send())),a){
var d=t({
win:u,
options:e
});
o({
player:d
});
}else r.ClearCache({
win:u,
version:c.jsVersion,
url:c.jsUrl
}),n();
},
onError:function(n){
0==n.queueIndex&&(i.setSum("64728","111",1),i.setSum("64728","118",1),51==n.code?i.setSum("64728","119",1):52==n.code?i.setSum("64728","120",1):53==n.code&&i.setSum("64728","121",1),
i.send()),s(e);
}
});
}
function t(e){
var n=e.win||window,o=e.options,t=new n.Txp.Player({
containerId:o.containerId,
vid:o.vid,
width:o.width,
height:o.height,
autoplay:o.autoplay===!0?!0:!1,
allowFullScreen:o.allowFullScreen===!0?!0:!1
});
return t;
}
function s(e){
var n=function(){},o=function(){};
"function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(n=e.onError);
var s=c.jsUrl;
s+=-1==s.indexOf("?")?"?"+c.customerParam+"="+c.jsVersion:"&"+c.customerParam+"="+c.jsVersion,
u({
win:e.win,
url:s,
timeout:1e4,
type:"JS",
callback:function(){
i.setSum("64728","122",1);
var s=e.win||window;
if(s.Txp&&"function"==typeof s.Txp.Player){
i.setSum("64728","124",1),i.send();
var r=t({
win:e.win,
options:e
});
o({
player:r
});
}else i.setSum("64728","123",1),i.send(),n();
},
onerror:function(e){
switch(i.setSum("64728","122",1),1*e){
case 400:
c.jsLoadState=4,i.setSum("64728","125",1);
break;

case 500:
c.jsLoadState=5,i.setSum("64728","126",1);
break;

default:
c.jsLoadState=6,i.setSum("64728","127",1);
}
i.send(),n();
}
});
}
var i=e("biz_common/utils/monitor.js"),r=e("biz_wap/utils/ajax_load_js.js"),u=e("pages/loadscript.js"),c={
customerParam:"wxv",
jsUrl:"//vm.gtimg.cn/tencentvideo/txp/js/iframe/api.js?",
jsVersion:"v1"
};
return{
createTxVideo:o,
createGlobalFunc:n
};
});define("appmsg/comment_utils.js",["appmsg/comment.js"],function(n){
"use strict";
function m(m){
1==m.comment_enabled&&(window.can_fans_comment_only=m.only_fans_can_comment,window.comment_count=m.comment_count,
window._is_fans=m.is_fans,window._logo_url=m.logo_url,window._nick_name=m.nick_name,
window.friend_comment_enabled=m.friend_comment_enabled,n("appmsg/comment.js"));
}
return{
initCommentByExtData:m
};
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("appmsg/malicious_wording.js",[],function(){
"use strict";
var i={
0:{
90041:"此标题包含夸大误导信息",
20012:"此标题包含低俗恶俗内容"
},
1:{
90041:"",
20012:""
},
2:{
90041:"此文章包含夸大误导信息",
20012:"此文章包含低俗恶俗内容"
}
},s={
0:{
90041:"标题使用夸大、煽动、低俗等词语造成误导或引人不适",
20012:"标题使用低俗或恶俗词语造成不正当影响或引人不适"
},
1:{
90041:"摘要包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"摘要包含低俗或恶俗内容造成不正当影响或引人不适"
},
2:{
90041:"文章包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"文章包含低俗或恶俗内容造成不正当影响或引人不适"
}
};
return{
maliciousTitleMap:i,
maliciousDescMap:s
};
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
"use strict";
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
e.user_define&&(p=e.user_define);
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>=0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in u)r({
pid_uin_rid:e,
speeds:u[e],
user_define:p
},c);
u={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
u[n]||(u[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance||{};
if(t&&t.timing){
var o=t.timing||{};
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(u),u[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
u[e]=u[e]||[],u[e][n]=u[e][n]||[],0>t||(21>n?u[e][n][0]=t:u[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2];
e.user_define&&(o+="&user_define="+e.user_define);
for(var i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():f.push(e);
}
function a(){
for(var e=0;e<f.length;e++)f[e]();
f=[];
}
var p,u={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",f=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("a/a_config.js",[],function(){
"use strict";
var _={
ANDROID_APP_PRODUCT_TYPE:12,
IOS_APP_PRODUCT_TYPE:19,
ADD_CONTACT_PRODUCT_TYPE:23,
MINI_GAME_PRODUCT_TYPE:46,
CARD_PRODUCT_TYPE:36,
SHOP_PRODUCT_TYPE:30,
WECHATCARD_PRODUCT_TYPE:47,
BRAND_WECHAT_PRODUCT_TYPE:29,
BRAND_GDT_PRODUCT_TYPE:31
},a={
POS_BOTTOM:0,
POS_MID:4,
POS_SPONSOR:3,
POS_AD_BEFORE_VIDEO:7
},e={
AD_DEST_TYPE:0,
OUTER_DEST_TYPE:1,
APPDETAIL_DEST_TYPE:2,
BIZ_DEST_TYPE:3,
APPINFO_PAGE_DEST_TYPE:4,
WECHAT_SHOP_DEST_TYPE:5,
WECHAT_APPLET_DEST_TYPE:6,
LEAF_DEST_TYPE:7,
CANVAS_AD_DEST_TYPE:9
},T=18e4,E=["openUrlWithExtraWebview","openADCanvas","addContact","profile","getInstallState","installDownloadTask","addDownloadTask","pauseDownloadTask","resumeDownloadTask","queryDownloadTask","launchApplication","writeCommData","adDataReport","downloadAppInternal","wxdownload:progress_change","menu:share:appmessage","menu:share:timeline","menu:share:weibo","menu:share:facebook","menu:general:share","launch3rdApp","addDownloadTaskStraight","sendAppMessage","shareTimeline","getNetworkType","jumpToBizProfile","shareWeibo","shareFB","imagePreview","getBackgroundAudioState","openWeApp","preloadMiniProgramContacts","preloadMiniProgramEnv","calRqt"],D=["/mp/advertisement_report","/mp/ad_report","/mp/ad_video_report","/mp/jsmonitor","/mp/ad_complaint","/mp/jsreport","/tp/datacenter/report"];
return{
AD_TYPE:_,
AD_POS:a,
AD_CACHE_TIME:T,
AD_DEST_TYPE:e,
AD_FRAME_DOMAIN:"https://wxa.wxs.qq.com",
INVALID_METHOD_NAME_MSG_PREFIX:"Invalid methodName",
INVALID_METHOD_TYPE_MSG_PREFIX:"Invalid methodType",
INVALID_ARGS_MSG_PREFIX:"Invalid args",
INVALID_REQ_PATH_MSG_PREFIX:"Invalid request path",
AD_IFRAME_HIDE_CLASS:"iframe_ad_dn",
AD_JSAPI_WHITE_LIST:E,
AD_REQ_PATH_WHITE_LIST:D,
ORIGIN_VIDEO_VID_PREFIX:"wxv",
AD_VIDEO_END_ACTION:"adVideoEnd",
AD_VIDEO_PLAY_ACTION:"onVideoPlayV2",
GET_APPMSGAD_READY_STATUS_ACTION:"getAppmsgadReadyStatus",
APPMSGAD_READY_ACTION:"appmsgadReady"
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("a/a_utils.js",["biz_wap/jsapi/core.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_common/utils/url/parse.js","biz_wap/utils/openUrl.js","biz_wap/utils/wapsdk.js"],function(e){
"use strict";
function t(e,t){
m("/mp/ad_report?action=follow&type="+e+t);
}
function n(e,t){
w.jsmonitor({
id:115849,
key:e,
value:t
});
}
function i(e){
if(!e)return"";
var t=document.createElement("a");
return t.href=e,t.hostname;
}
function r(e){
for(var t=[],n=0;n<e.length;++n){
var i=e[n],a="undefined"==typeof i?"undefined":_typeof(i);
i="string"===a?i.htmlDecode():i,"object"===a&&(i="[object Array]"===Object.prototype.toString.call(i)?r(i):o(i)),
t.push(i);
}
return t;
}
function o(e){
var t={};
for(var n in e)if(e.hasOwnProperty(n)){
var i=e[n],a="undefined"==typeof i?"undefined":_typeof(i);
i="string"===a?i.htmlDecode():i,"object"===a&&(i="[object Array]"===Object.prototype.toString.call(i)?r(i):o(i)),
t[n]=i;
}
return t;
}
function a(e,t){
var n=0;
u.isIOS?n=1:u.isAndroid&&(n=2);
var i={
creative_load_fail:[{
ts:parseInt(+new Date/1e3,10),
aid:parseInt(e.info.aid,10),
img_url:t,
network_type:window.networkType,
errmsg:"",
os_type:n,
client_version:parseInt(window.clientversion,10),
traceid:e.info.traceid
}]
};
i=JSON.stringify(i),c({
url:"/mp/advertisement_report?action=extra_report&extra_data="+i+"&__biz="+window.biz,
timeout:2e3
});
}
function d(e,t){
var n={
ad_sign_data:t.adSignData,
ad_sign_k1:t.adSignK1,
ad_sign_k2:t.adSignK2,
ad_sign_md5:t.signMd5
};
return l.join(e,n,!0);
}
function s(e,t,n,i){
try{
e.postMessage(JSON.stringify({
action:t,
value:n
}),i||"*");
}catch(r){}
}
var p=e("biz_wap/jsapi/core.js"),c=e("biz_wap/utils/ajax.js"),u=e("biz_wap/utils/mmversion.js"),m=e("biz_common/utils/report.js"),_=e("biz_common/dom/class.js"),l=e("biz_common/utils/url/parse.js"),f=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,w=e("biz_wap/utils/wapsdk.js"),g="pos_",y=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],v=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],b={
report:t,
report115849:n,
saveCopy:o,
joinSignParam:d,
postMessage:s,
checkShowCpc:function(e,t,n,i){
if(t)return!0;
if(e){
var r,o=document.documentElement.clientHeight||window.innerHeight,a=o/2,d=e.offsetTop,s=n.offsetHeight;
if(a>d?r=1:o>d&&(r=2),r&&i){
var p=JSON.stringify({
biz_middle_not_exp:[{
scene:r,
traceid:i.traceid,
aid:+i.aid,
appmsg_id:+window.appmsgid,
item_idx:+window.idx
}]
});
c({
url:"/mp/advertisement_report?action=extra_report&extra_data="+p+"&__biz="+window.biz,
timeout:2e3
});
}
return a>d||a>s-d?!1:!0;
}
},
insertAfter:function(e,t){
var n=t.parentNode;
n.lastChild===t?n.appendChild(e):n.insertBefore(e,t.nextSibling);
},
openWebAppStore:function(e,t){
var n=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
return n&&n[1]&&parseInt(n[1].split("_")[0],10)>=12?void p.invoke("launchApplication",{
schemeUrl:e
},function(){}):void p.invoke("downloadAppInternal",{
appUrl:e
},function(n){
n.err_msg&&-1!==n.err_msg.indexOf("ok")||f("/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+t);
});
},
adOptReport:function(e,t,n,i){
var r=l.join("/mp/ad_complaint",{
action:"report",
type:e,
pos_type:t,
trace_id:n,
aid:i,
__biz:window.biz,
r:Math.random()
},!0);
m(r);
},
checkAdImg:function(e){
if(e){
var t=e.image_url||"",n=i(t);
n&&-1===v.indexOf(n)&&window.__addIdKeyReport(28307,58);
}
},
formName:function(e){
for(var t=-1,n=0,i=y.length;i>n;++n){
var r=y[n],o=e.indexOf(r);
-1!==o&&(-1===t||t>o)&&(t=o);
}
return-1!==t&&(e=e.substring(0,t)),e;
},
formSize:function(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
},
debounce:function(e,t,n){
var i;
return function(){
var r=this,o=arguments,a=function(){
i=null,n||e.apply(r,o);
},d=n&&!i;
i||(i=setTimeout(a,t),d&&e.apply(r,o));
};
},
isItunesLink:function(e){
return/^https?:\/\/itunes\.apple\.com\//.test(e);
},
extend:function(e,t){
for(var n in t)e[n]=t[n];
return e;
},
getPosKeyDesc:function(e,t){
var n=t?e+"_"+t:e;
return g+n;
},
openCanvasAd:function(e){
p.invoke("openADCanvas",{
canvasId:e.canvasId,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:e.pos_type
}),
adInfoXml:e.adInfoXml
},function(n){
0!=n.ret?(f(e.url),t(135,e.report_param)):t(134,e.report_param);
});
},
setBackgroundClass:function(){
window._has_comment||0!==window.adDatas.num||window._share_redirect_url||window.is_temp_url?_.removeClass(document.body,"rich_media_empty_extra"):_.addClass(document.body,"rich_media_empty_extra");
},
lazyLoadAdImg:function(e){
for(var t=document.getElementsByClassName("js_alazy_img"),n=0;n<t.length;n++){
var i=t[n];
i.onload=function(){
window.__addIdKeyReport(28307,54),i.src.indexOf("retry")>-1&&window.__addIdKeyReport(28307,69);
},i.onerror=function(){
if(-1===i.src.indexOf("retry"))i.src=l.addParam(i.src,"retry",1);else{
window.__addIdKeyReport(28307,98);
var t="other";
u.isIOS?t="iphone":u.isAndroid&&(t="android"),setTimeout(function(){
var n=window.networkType||"unknow",r=l.join("/tp/datacenter/report",{
cmd:"report",
id:900023,
uin:777,
os:t,
aid:e.aid,
image_url:encodeURIComponent(i.src),
type:e.type,
network:n
},!0);
c({
url:r,
async:!0
});
},500),a(e,i.src);
}
window.__addIdKeyReport(28307,57);
},i.src=i.dataset.src;
}
},
reportUrlLength:function(e,t,n,i,r,o,a){
var s=d(a,{
adSignData:e,
adSignK1:t,
adSignK2:n,
signMd5:i,
viewidKeyObj:r
});
if(s.length>=4e3){
var p=JSON.stringify({
biz_log_report:[{
pos_type:+o.pos_type,
traceid:o.tid,
aid:+o.aid,
log_type:1,
ext_info:"[url length:"+s.length+"]"+a.substring(0,2e3)
}]
});
c({
url:"/mp/advertisement_report?action=extra_report",
timeout:2e3,
data:{
extra_data:p,
__biz:window.biz
},
type:"post"
});
}
},
isVideoSharePageOnlyAd:function(){
return"5"===window.item_show_type&&"ad"===l.getQuery("render_type");
},
listenMessage:function(e,t,n){
arguments.length<3&&(n=t,t=null),e.addEventListener("message",function(e){
var i;
if(!t||e.origin===t){
try{
i=JSON.parse(e.data);
}catch(r){
return;
}
"function"==typeof n&&n(e,i);
}
});
},
isUseAppMsgAd:function(){
var e=[350064395,3194181833,3191008240,459315e3,2547206501,17516575,3194183798,3193008987,3191008237,3190008366,1314021127,3190008373,3192140177,3193183025,3191138746,3192008231,3191138747,3191138743,3193183023,3193183029],t=.5;
return e.indexOf(window.user_uin)>-1?!0:window.user_uin&&window.user_uin%1e3<10*t?!0:void 0;
},
broadcastFrame:function(e,t,n,i){
e=e||[];
for(var r=0;r<e.length;r++)(!i||i&&e[r].src.indexOf(i)>-1)&&s(e[r].contentWindow,t,n);
}
};
return b;
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_wap/utils/device.js","a/a_sign.js","biz_wap/utils/openUrl.js","biz_common/utils/get_para_list.js","biz_wap/utils/show_time.js","biz_common/utils/url/parse.js","biz_common/dom/event.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","a/tpl/crt_tpl_manager.js","a/a_config.js","a/video.js","a/a_utils.js","biz_common/dom/offset.js","a/appdialog_confirm.js","appmsg/cdn_img_lib.js","a/tpl/cpc_tpl.html.js","a/sponsor.js","a/app_card.js","a/profile.js","a/android.js","a/ios.js"],function(require,exports,module,alert){
"use strict";
function processAdEleByPos(e){
var a;
e===AD_POS.POS_MID&&(a=document.getElementsByTagName("mpcpc")),adElCountMapByPos[e]=a.length;
for(var t=0;t<a.length;t++)el_gdt_areas[utils.getPosKeyDesc(e,t)]=a[t],ping_cpm_apurl[utils.getPosKeyDesc(e,t)]={};
}
function initAdData(){
processAdEleByPos(AD_POS.POS_MID);
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0;
if(!globalAdDebug){
var inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx||mmversion.isInMiniProgram){
if(is_need_ad=0,js_sponsor_ad_area.style.display="none",js_bottom_ad_area.style.display="none",
adElCountMapByPos[AD_POS.POS_MID])for(var i=0;i<adElCountMapByPos[AD_POS.POS_MID];i++)el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,i)].style.display="none";
}else if(window.localStorage&&-1===location.href.indexOf("mock"))try{
var _ad=adLS.get(lsKey);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&_now-1*_adInfoSaveTime<AD_CONFIG.AD_CACHE_TIME&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(lsKey),
log("[Ad] is_need_ad: "+is_need_ad+" , adData:"+JSON.stringify(_ad));
}catch(e){
is_need_ad=1,_adInfo=null;
}
}
return{
is_need_ad:is_need_ad,
both_ad:0,
_adInfo:_adInfo
};
}
function insertAutoAdElement(e,a){
if(e.pos_type===AD_POS.POS_MID&&!adElCountMapByPos[AD_POS.POS_MID]){
var t=getParaList(contentWrp),i=void 0!==e.position_index&&e.position_index>=0&&e.position_index<t.length,n=i?e.position_index:Math.ceil(t.length/2)-1,_=document.createElement("mpcpc");
el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID)]=_,utils.insertAfter(_,t[n]),a&&utils.report115849(2);
}
}
function getExpParaVal(e,a){
if(e&&e.flow_exp_info){
var t=e.flow_exp_info||"";
try{
t=JSON.parse(t.replace(/&quot;/g,'"'));
}catch(i){
return;
}
if(t.length)for(var n=0;n<t.length;n++)if(t[n].exp_para&&t[n].exp_para.length)for(var _=0;_<t[n].exp_para.length;_++)if(t[n].exp_para[_].name===a)return t[n].exp_para[_].value;
}
}
function isUseFrame(){
var e=getExpParaVal.apply(null,arguments);
return"1"===e?!0:void 0;
}
function separateAdData(e){
e=e||[];
var a=[],t=[];
for(var i in e){
var n=e[i];
isUseFrame(n,"widget_gray_biz_intext_iframe")&&n.pos_type===AD_POS.POS_MID||utils.isUseAppMsgAd()&&n.pos_type===AD_POS.POS_AD_BEFORE_VIDEO?t.push(n):a.push(n);
}
return{
oldAdInfos:a,
newAdInfos:t
};
}
function createAdFrame(e,a){
console.log("广告 "+a.aid+"使用了新的iframe组件渲染模式");
var t=document.createElement("iframe"),i=getExpParaVal(a,"widget_gray_iframe_path"),n=i?i+"/":"";
return t.src=AD_CONFIG.AD_FRAME_DOMAIN+"/tmpl/"+n+"base_tmpl.html#aid="+a.aid,t.className="iframe_ad_container",
e.appendChild(t),t;
}
function postMessageToAdFrame(e,a,t){
utils.postMessage(e,a,t,AD_CONFIG.AD_FRAME_DOMAIN);
}
function invalidMsg(e,a){
return e+" | "+a;
}
function isVideoFrameHasVid(e,a){
return e.src&&e.src.indexOf("vid="+a)>-1;
}
function proxyCallback(e,a,t){
postMessageToAdFrame(e,"proxyCallbackV2",{
proxyId:a.proxyId,
aid:a.aid,
proxyData:t
});
}
function androidAppDialogConfirm(e,a){
var t=a.proxyData||{};
appDialogConfirm({
app_name:t.args.app_name,
app_img_url:t.args.icon_url,
onOk:function(){
proxyCallback(e,a,{
err_msg:"appDialogConfirm:yes"
});
},
onCancel:function(){
proxyCallback(e,a,{
err_msg:"appDialogConfirm:cancel"
});
}
});
}
function AdFrame(){
this.aInfoMap={},this.iframes=document.getElementsByTagName("iframe");
}
function processAdAvatar(e){
var a=e.product_type;
return(a===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||a===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&e.app_info&&e.app_info.icon_url?(e.avatar=e.app_info.icon_url,
void(e.avatarTitle=e.app_info.appname)):a===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&e.game_info&&e.game_info.head_img?(e.avatar=e.game_info.head_img,
void(e.avatarTitle=e.game_info.nick_name)):void((e.pos_type===AD_POS.POS_MID&&(a===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE||a===AD_TYPE.BRAND_GDT_PRODUCT_TYPE||a===AD_TYPE.BRAND_WECHAT_PRODUCT_TYPE)||e.pos_type!==AD_POS.POS_MID)&&e.biz_info&&e.biz_info.head_img&&(e.avatar=e.biz_info.head_img,
e.avatarTitle=e.biz_info.nick_name));
}
function handleVideoSharePage(){
var e=document.body.offsetHeight;
JSAPI.invoke("configMpAdAttrs",{
viewHeight:e
},function(a){
console.log("debug for configMpAdAttrs height: ",e,", response:",a);
});
}
function setBottomSize(e){
if(e.material_height&&e.material_width){
var a=js_bottom_ad_area.getElementsByClassName("js_mpad_smallbanner_info_banner"),t=js_bottom_ad_area.getElementsByClassName("js_mpad_banner_img"),i=e.material_height/e.material_width;
a.length&&(a[0].style.minHeight=a[0].offsetWidth*i+"px"),t.length&&(t[0].style.minHeight=t[0].offsetWidth*i+"px");
}
}
function afterGetAdData(e,a){
function t(e){
var a=e;
if(a.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&(a.is_wx_app=!0),
e.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||e.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var t=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",_=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",o=a.app_info.apk_name||a.app_info.pkg_name||"";
t=utils.formSize(t),i=utils.formName(i),a.app_info.app_size=t,a.app_info.app_name=i,
a.app_info.apk_name=o,a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=o,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=_;
var p=utils.extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:o,
url_scheme:a.app_info.url_scheme,
androiddownurl:n,
versioncode:a.app_info.version_code,
appinfo_url:a.app_info.appinfo_url,
traceid:a.traceid,
pt:a.pt,
url:a.url,
ticket:a.ticket,
type:a.type,
adid:a.aid,
source:source||"",
is_appmsg:!0,
file_md5:_
},a);
return p;
}
if(e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
for(var r=a.exp_info.exp_value||[],d=!1,s=0,l=0;l<r.length;++l){
var c=r[l]||{};
if(1==c.exp_type&&(s=c.comm_attention_num,d=s>0),2==c.exp_type){
d=!1,s=0;
break;
}
}
a.biz_info.show_comm_attention_num=d,a.biz_info.comm_attention_num=s;
var p=utils.extend({
usename:a.biz_info.user_name,
pt:a.pt,
url:a.url,
traceid:a.traceid,
adid:a.aid,
ticket:a.ticket,
is_appmsg:!0
},a);
return p;
}
return e;
}
function i(e){
var a,t=e;
if(e.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||e.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var i=t.app_info.app_size||0,n=t.app_info.app_name||t.app_info.appname||"",_=t.app_info.apk_url||t.app_info.pkgurl||"",o=t.app_info.file_md5||t.app_info.pkgmd5||t.app_info.app_md5||"",p=t.app_info.apk_name||t.app_info.pkg_name||"",r=t.app_info.category,d=["万","百万","亿"],s=t.app_info.down_count||0;
if(s>=1e4){
s/=1e4;
for(var l=0;s>=10&&2>l;)s/=100,l++;
s=s.toFixed(1)+d[l]+"次";
}else s=s.toFixed(1)+"次";
return r=r?r[0]||"其他":"其他",i=utils.formSize(i),n=utils.formName(n),t.app_info._down_count=s,
t.app_info._category=r,t.app_info.app_size=i,t.app_info.app_name=n,t.app_info.apk_name=p,
t.app_info.appname=t.app_info.app_name,t.app_info.app_rating=t.app_info.app_rating||0,
t.app_info.app_id=t.app_info.app_id,t.app_info.icon_url=t.app_info.icon_url,t.app_info.channel_id=t.app_info.channel_id,
t.app_info.md5sum=t.app_info.app_md5,t.app_info.rl=t.rl,t.app_info.pkgname=p,t.app_info.url_scheme=t.app_info.url_scheme,
t.app_info.androiddownurl=_,t.app_info.versioncode=t.app_info.version_code,t.app_info.appinfo_url=t.app_info.appinfo_url,
t.app_info.traceid=t.traceid,t.app_info.pt=t.pt,t.app_info.url=t.url,t.app_info.ticket=t.ticket,
t.app_info.type=t.type,t.app_info.adid=t.aid,t.app_info.file_md5=o,a=utils.extend({
appname:t.app_info.app_name,
app_rating:t.app_info.app_rating||0,
app_id:t.app_info.app_id,
icon_url:t.app_info.icon_url,
channel_id:t.app_info.channel_id,
md5sum:t.app_info.app_md5,
rl:t.rl,
pkgname:p,
url_scheme:t.app_info.url_scheme,
androiddownurl:_,
versioncode:t.app_info.version_code,
appinfo_url:t.app_info.appinfo_url,
traceid:t.traceid,
pt:t.pt,
url:t.url,
ticket:t.ticket,
type:t.type,
adid:t.aid,
source:source||"",
is_appmsg:!0,
file_md5:o
},t);
}
if(e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
for(var c=t.exp_info.exp_value||[],m=!1,u=0,f=0;f<c.length;++f){
var g=c[f]||{};
if(1==g.exp_type&&(u=g.comm_attention_num,m=u>0),2==g.exp_type){
m=!1,u=0;
break;
}
}
return t.biz_info.show_comm_attention_num=m,t.biz_info.comm_attention_num=u,a=utils.extend({
usename:t.biz_info.user_name,
pt:t.pt,
url:t.url,
traceid:t.traceid,
adid:t.aid,
ticket:t.ticket,
is_appmsg:!0
},t);
}
if(e.product_type==AD_TYPE.CARD_PRODUCT_TYPE||e.product_type==AD_TYPE.COUPON_PRODUCT_TYPE){
var y=t.card_info.card_id||"",D=t.card_info.card_ext||"";
D=D.htmlDecode();
try{
D=JSON.parse(D),D.outer_str=t.card_info.card_outer_id||"",D=JSON.stringify(D);
}catch(P){
D="{}";
}
return a=utils.extend({
card_id:y,
card_ext:D,
pt:A,
ticket:t.ticket||"",
url:t.url,
rl:t.rl,
tid:t.traceid,
traceid:t.traceid,
type:t.type,
adid:t.aid,
is_appmsg:!0
},t);
}
if(e.product_type==AD_TYPE.SHOP_PRODUCT_TYPE){
if(t.mp_shop_info){
var v=t.mp_shop_info.pid||"",T=t.mp_shop_info.outer_id||"";
a=utils.extend({
pid:v,
outer_id:T,
pt:A,
url:t.url,
rl:t.rl,
tid:t.traceid,
traceid:t.traceid,
type:t.type,
adid:t.aid,
is_appmsg:!0
},t);
}else a=t;
return a;
}
return e;
}
isVideoSharePageOnlyAd&&urlParser.getQuery("adWidth")&&(document.documentElement.style.width=urlParser.getQuery("adWidth")+"px");
var n={},_={},o=e.is_need_ad,p=e._adInfo;
if(0==o)_=p,_||(_={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var r=a.advertisement_info;
_.advertisement_info=utils.saveCopy(r);
}
if(_.advertisement_num=a.advertisement_num,window._adRenderData=_,_){
var d=utils.saveCopy(_),s=d.advertisement_info;
if(s)for(var l in s)s[l].pos_type===AD_POS.POS_AD_BEFORE_VIDEO&&(delete s[l],d.advertisement_num--);
adLS.set(lsKey,{
info:JSON.stringify(d),
time:Date.now()
},+new Date+24e4);
}
}
_=_||{
advertisement_num:0
};
var c=!1;
if(!_.flag&&_.advertisement_num>0){
var m=_.advertisement_num,u=_.advertisement_info,f=separateAdData(u);
u=f.oldAdInfos,m=u.length,(new AdFrame).handleAdWithFrame(f.newAdInfos),window.adDatas.num=m;
for(var g=0;m>g;++g){
var y,D=null,P=u[g];
P.exp_info=P.exp_info||{},P.is_cpm=P.is_cpm||0,P.biz_info=P.biz_info||{},P.app_info=P.app_info||{},
P.pos_type=P.pos_type||0,P.logo=P.logo||"",P.use_new_protocol=P.use_new_protocol||0;
var A=P.pt,v=P.pos_type,T=P.product_type;
if(2==P.use_new_protocol&&P.pos_type==AD_POS.POS_BOTTOM){
var h=JSON.stringify({
biz_log_report:[{
pos_type:+P.pos_type,
traceid:P.traceid,
aid:+P.aid,
log_type:1,
ext_info:P.crt_size
}]
});
CrtManager.CRT_CONF[P.crt_size]||(P.use_new_protocol=P.product_type!=AD_TYPE.IOS_APP_PRODUCT_TYPE&&P.product_type!=AD_TYPE.ANDROID_APP_PRODUCT_TYPE||2!=P.material_type&&9!=P.material_type||P.dest_type!=AD_CONFIG.AD_DEST_TYPE.APPDETAIL_DEST_TYPE&&P.dest_type!=AD_CONFIG.AD_DEST_TYPE.APPINFO_PAGE_DEST_TYPE&&!AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE?0:1,
console.info("[底部广告旧协议兼容] crt_size:",P.crt_size," 最终协议类型：",P.use_new_protocol),ajax({
url:"/mp/advertisement_report?action=extra_report&extra_data="+h+"&__biz="+biz,
timeout:2e3
}));
}
if(urlParser.getQuery("oldAd")&&(P.use_new_protocol=0),y=P.use_new_protocol,n[v]||(n[v]=0),
n[v]++,y)1==y?v===AD_POS.POS_MID?(c=!0,P=t(P),D=P):0===v?(P=i(P),(T===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||T===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(D=P)):3===v&&(D=P):2==y&&(v===AD_POS.POS_MID?(c=!0,
P=t(P)):0==v&&(P=i(P)),D=P);else if(100===A||115===A){
for(var E=P.exp_info.exp_value||[],b=!1,w=0,O=0;O<E.length;++O){
var x=E[O]||{};
if(1==x.exp_type&&(w=x.comm_attention_num,b=w>0),2==x.exp_type){
b=!1,w=0;
break;
}
}
P.biz_info.show_comm_attention_num=b,P.biz_info.comm_attention_num=w,D={
usename:P.biz_info.user_name,
pt:A,
url:P.url,
traceid:P.traceid,
adid:P.aid,
ticket:P.ticket,
is_appmsg:!0
};
}else if(102===A)D={
appname:P.app_info.app_name,
versioncode:P.app_info.version_code,
pkgname:P.app_info.apk_name,
androiddownurl:P.app_info.apk_url,
md5sum:P.app_info.app_md5,
signature:P.app_info.version_code,
rl:P.rl,
traceid:P.traceid,
pt:A,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0
};else if(101===A)D={
appname:P.app_info.app_name,
app_id:P.app_info.app_id,
icon_url:P.app_info.icon_url,
appinfo_url:P.app_info.appinfo_url,
rl:P.rl,
traceid:P.traceid,
pt:A,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0
};else if(103===A||104===A||2===A&&P.app_info){
var I=P.app_info.down_count||0,S=P.app_info.app_size||0,C=P.app_info.app_name||"",j=P.app_info.category,k=["万","百万","亿"];
if(I>=1e4){
I/=1e4;
for(var Y=0;I>=10&&2>Y;)I/=100,Y++;
I=I.toFixed(1)+k[Y]+"次";
}else I=I.toFixed(1)+"次";
S=utils.formSize(S),j=j?j[0]||"其他":"其他",C=utils.formName(C),P.app_info._down_count=I,
P.app_info._app_size=S,P.app_info._category=j,P.app_info.app_name=C,D={
appname:P.app_info.app_name,
app_rating:P.app_info.app_rating||0,
icon_url:P.app_info.icon_url,
app_id:P.app_info.app_id,
channel_id:P.app_info.channel_id,
md5sum:P.app_info.app_md5,
rl:P.rl,
pkgname:P.app_info.apk_name,
url_scheme:P.app_info.url_scheme,
androiddownurl:P.app_info.apk_url,
versioncode:P.app_info.version_code,
appinfo_url:P.app_info.appinfo_url,
traceid:P.traceid,
pt:A,
url:P.url,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0,
app_info:P.app_info
};
}else if(105===A){
var N=P.card_info.card_id||"",M=P.card_info.card_ext||"";
M=M.htmlDecode();
try{
M=JSON.parse(M),M.outer_str=P.card_info.card_outer_id||"",M=JSON.stringify(M);
}catch(R){
M="{}";
}
D={
card_id:N,
card_ext:M,
pt:A,
ticket:P.ticket||"",
url:P.url,
rl:P.rl,
tid:P.traceid,
traceid:P.traceid,
type:P.type,
adid:P.aid,
is_appmsg:!0
};
}else if(106===A){
var z=P.mp_shop_info.pid||"",U=P.mp_shop_info.outer_id||"";
D={
pid:z,
outer_id:U,
pt:A,
url:P.url,
rl:P.rl,
tid:P.traceid,
traceid:P.traceid,
type:P.type,
adid:P.aid,
is_appmsg:!0
};
}else if(108===A||109===A||110===A||116===A||117===A)D={
pt:A,
ticket:P.ticket||"",
url:P.url,
traceid:P.traceid,
adid:P.aid,
is_appmsg:!0
},P.video_info&&(D.displayWidth=P.video_info.displayWidth,D.displayHeight=P.video_info.displayHeight,
D.thumbUrl=P.video_info.thumbUrl,D.videoUrl=P.video_info.videoUrl,D.rl=P.rl),P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P);else if(111===A||113===A||114===A||112===A||121===A||122===A){
var S=P.app_info.app_size||0,C=P.app_info.app_name||"";
S=utils.formSize(S),C=utils.formName(C),P.app_info.app_size=S,P.app_info.app_name=C,
D={
appname:P.app_info.app_name,
app_rating:P.app_info.app_rating||0,
app_id:P.app_info.app_id,
icon_url:P.app_info.icon_url,
channel_id:P.app_info.channel_id,
md5sum:P.app_info.app_md5,
rl:P.rl,
pkgname:P.app_info.apk_name,
url_scheme:P.app_info.url_scheme,
androiddownurl:P.app_info.apk_url,
versioncode:P.app_info.version_code,
appinfo_url:P.app_info.appinfo_url,
traceid:P.traceid,
pt:A,
url:P.url,
ticket:P.ticket,
type:P.type,
adid:P.aid,
source:source||"",
is_appmsg:!0,
app_info:P.app_info
};
}else if(118===A)D=P,c=!0,Wxopen_card.startConnect(P);else if(119===A||120===A)D=P,
Wxopen_card.startConnect(P);else if(125===A)D=P,P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P);else if(140===A){
D=P;
try{
D.shopImage=D.shop_image[0],D.shopImage.mp_tags=D.shopImage.mp_tags||[];
}catch(F){
D.shopImage={};
}
}
var W=P.image_url;
require("appmsg/cdn_img_lib.js"),W&&W.isCDN()&&(W=W.replace(/\/0$/,"/640"),W=W.replace(/\/0\?/,"/640?"),
P.image_url=urlParser.addParam(W,"wxfrom","50",!0)),adDatas.ads[utils.getPosKeyDesc(v,n[v]-1)]={
a_info:P,
adData:D
},localStorage&&localStorage.setItem&&P.app_info&&P.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+P.traceid,P.app_info.url_scheme),
P.has_installed=!1,P.app_info&&!function(e){
JSAPI.invoke("getInstallState",{
packageName:e.app_info.apk_name
},function(a){
var t=a.err_msg;
t.indexOf("get_install_state:yes")>-1&&(e.has_installed=!0);
});
}(P),0===v&&9===P.material_type&&(T===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&P.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&P.game_info&&(P.biz_info.head_img=P.game_info.head_img,
P.biz_info.nick_name=P.game_info.nick_name),T!==AD_TYPE.IOS_APP_PRODUCT_TYPE&&T!==AD_TYPE.ANDROID_APP_PRODUCT_TYPE||!P.app_info||(P.biz_info.head_img=P.app_info.icon_url,
P.biz_info.nick_name=P.app_info.app_name));
}
var q=function oa(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
if(js_sponsor_ad_area.offsetTop<e+innerHeight){
var a=document.getElementById("js_ad_area");
a&&Class.addClass(a,"show"),DomEvent.off(window,"scroll",oa);
}
},B=adDatas.ads;
for(var H in B)if(0===H.indexOf("pos_")){
var D=B[H],P=!!D&&D.a_info,T=P.product_type;
if(D&&P){
if(insertAutoAdElement(P),2!==P.use_new_protocol){
if(0==P.pos_type){
if(P.new_appmsg=window.new_appmsg,P.longAppBtnText=T===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
P.shortAppBtnText=T===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看":"下载",js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,P),
111==P.pt||112==P.pt||113==P.pt||114==P.pt){
var V=document.getElementsByClassName("js_download_app_card")[0],L=V.offsetWidth,G=Math.floor(L/2.875);
G>0&&(V.style.height=G+"px");
}
}else if(3==P.pos_type){
var V=document.createElement("div");
V.appendChild(document.createTextNode(P.image_url)),P.image_url=V.innerHTML.replace(/&amp;/g,"&"),
P.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,P),
js_sponsor_ad_area.style.display="block";
var K=js_sponsor_ad_area.clientWidth;
108!=P.pt&&109!=P.pt&&110!=P.pt||2==P.use_new_protocol?116==P.pt||117==P.pt:document.getElementById("js_main_img").style.height=K/1.77+"px",
DomEvent.on(window,"scroll",q),q(0);
}else if(P.pos_type===AD_POS.POS_MID&&utils.checkShowCpc(el_gdt_areas[H],globalAdDebug,contentWrp,P)){
P=_parseExpCpc(P);
var J=!1;
if(T===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||T===AD_TYPE.IOS_APP_PRODUCT_TYPE)js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,P),
J=!0;else{
var X=require("a/tpl/cpc_tpl.html.js"),Q=P.exp_obj.sale_text;
(T===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE||T===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||T===AD_TYPE.IOS_APP_PRODUCT_TYPE||T===AD_TYPE.MINI_GAME_PRODUCT_TYPE)&&(Q=P.avatarTitle),
js_cpc_area.innerHTML=TMPL.tmpl(X,{
tag_pos:P.exp_obj.tag_pos,
type:P.tag_pos,
ticket:P.ticket,
url:P.url,
rl:P.rl,
aid:P.aid,
pt:P.pt,
traceid:P.traceid,
group_id:P.group_id,
apurl:P.apurl,
is_cpm:P.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:P.pos_type,
banner:P.image_url,
price:P.exp_obj.price,
title:Q,
is_wx_app:P.is_wx_app,
btn_text:P.exp_obj.btn_text,
avatar:P.avatar,
isDownload:J
});
}
}
mmversion.isIOS&&P.app_info&&P.app_info.url_scheme&&T===AD_TYPE.IOS_APP_PRODUCT_TYPE&&(document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+P.pos_type)&&(document.getElementById("js_ad_btn_"+P.pos_type).innerHTML="查看应用"));
}else{
var Z,$={},J=!1,ea={};
if(P.button_action)try{
"string"==typeof P.button_action&&(P.button_action=JSON.parse(P.button_action.html())),
P.button_action.button_text&&""!=P.button_action.button_text||(P.button_action.button_text="去逛逛");
}catch(R){
P.button_action={
button_text:"decode error"
};
}else P.button_action={
button_text:"something wrong"
};
if(Z=P.crt_size,(T===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||T===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(J=!0),
processAdAvatar(P),P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P),
P.pos_type===AD_POS.POS_MID){
if(utils.checkShowCpc(el_gdt_areas[H],globalAdDebug,contentWrp,P)){
P=_parseExpCpc(P);
var Q="",aa="";
(P.avatarTitle||P.exp_obj.sale_text)&&P.avatar&&(Q=P.avatarTitle||P.exp_obj.sale_text,
aa=P.avatar),$={
tag_pos:P.exp_obj.tag_pos,
type:P.tag_pos,
ticket:P.ticket,
url:P.url,
rl:P.rl,
aid:P.aid,
pt:P.pt,
traceid:P.traceid,
group_id:P.group_id,
apurl:P.apurl,
is_cpm:P.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:P.pos_type,
banner:P.image_url,
price:P.exp_obj.price,
title:Q,
is_wx_app:P.is_wx_app,
is_ios:mmversion.isIOS,
isDownload:J,
btn_text:P.exp_obj.btn_text,
avatar:aa
},J&&(ea.customUpdataFunc=function(e,a){
var t=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),n=e.querySelector(".js_download_inner");
t&&(t.style.width=a.percent+"%"),i.textContent=a.btn_text,n.textContent=a.btn_text;
}),ad_render_object[H]=new CrtManager.createCrtObject(Z,$,el_gdt_areas[H],ea),gdt_as[H]=el_gdt_areas[H].getElementsByClassName("js_ad_main_area");
}
}else if(P.pos_type==AD_POS.POS_SPONSOR){
var V=document.createElement("div");
V.appendChild(document.createTextNode(P.image_url)),P.image_url=V.innerHTML.replace(/&amp;/g,"&"),
P.new_appmsg=window.new_appmsg;
var D={
pt:P.pt,
ticket:P.ticket||"",
url:P.url,
traceid:P.traceid,
adid:P.aid,
is_appmsg:!0
};
if(P.video_info&&(D.displayWidth=P.video_info.displayWidth,D.displayHeight=P.video_info.displayHeight,
D.thumbUrl=P.video_info.thumbUrl,D.videoUrl=P.video_info.videoUrl,D.rl=P.rl),$={
type:P.tag_pos,
ticket:P.ticket,
url:P.url,
rl:P.rl,
aid:P.aid,
pt:P.pt,
traceid:P.traceid,
group_id:P.group_id,
apurl:P.apurl,
is_cpm:P.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:P.pos_type,
banner:P.image_url,
title:P.biz_info.nick_name,
is_wx_app:P.button_action.jump_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE,
is_ios:mmversion.isIOS,
isDownload:J,
btn_text:P.button_action.button_text,
avatar:P.biz_info.head_img,
isApp:!1
},ad_render_object[H]=new CrtManager.createCrtObject(Z,$,js_sponsor_ad_area,ea),
js_sponsor_ad_area.style.display="block",gdt_as["pos_"+P.pos_type]=js_sponsor_ad_area.getElementsByClassName("js_ad_main_area"),
!ad_render_object[H].getCrtData().has_banner){
var ta="&tid="+P.traceid+"&uin="+uin+"&key="+l+"&ticket="+(P.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+P.adid+"&ad_engine=0&pos_type="+P.pos_type+"&exp_id="+P.exp_info.exp_id+"&exp_value="+P.exp_info.exp_value+"&r="+Math.random();
P.report_param=ta;
}
var ia=require("a/sponsor.js");
new ia({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:D,
a_info:P,
pos_type:P.pos_type,
report_param:ta
}),DomEvent.on(window,"scroll",q),q(0);
}else if(P.pos_type==AD_POS.POS_BOTTOM){
var ea={};
if(P.video_info&&(D.displayWidth=P.video_info.displayWidth,D.displayHeight=P.video_info.displayHeight,
D.thumbUrl=P.video_info.thumbUrl,D.videoUrl=P.video_info.videoUrl,D.rl=P.rl),J&&(ea.customUpdataFunc=function(e,a){
var t=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),n=e.querySelector(".js_download_inner");
t&&(t.style.width=a.percent+"%"),i.textContent=a.btn_text,n.textContent=a.btn_text;
},ea.afterRenderFunc=function(e,a){
JSAPI.invoke("getInstallState",{
packageName:P.app_info.apk_name
},function(t){
var i=t.err_msg,n=e.querySelector(".js_watermark_text");
i.indexOf("get_install_state:yes")>-1&&P.app_info.url_scheme&&(n.textContent=354==parseInt(a.crt_size)||117==parseInt(a.crt_size)||355==parseInt(a.crt_size)||568==parseInt(a.crt_size)?"进入":"进入应用");
});
}),$=utils.extend({
banner:P.image_url,
is_wx_app:P.button_action.jump_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE,
btn_text:P.button_action.button_text,
avatar:P.avatar,
isApp:!1,
isDownload:J
},P),ad_render_object["pos_"+P.pos_type]=new CrtManager.createCrtObject(Z,$,js_bottom_ad_area,ea),
!ad_render_object["pos_"+P.pos_type].getCrtData().has_banner){
var ta="&tid="+P.traceid+"&uin="+uin+"&key="+l+"&ticket="+(P.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+P.adid+"&ad_engine=0&pos_type="+pos_type+"&exp_id="+P.exp_info.exp_id+"&exp_value="+P.exp_info.exp_value+"&r="+Math.random();
P.report_param=ta;
var na=ad_render_object["pos_"+P.pos_type].getWrapperElm().getElementsByClassName("js_video_container_new_protocol");
na[0]&&(na=na[0],P.videoContainer=na,videoAdMap[P.aid]=new VideoAd(P));
}
gdt_as["pos_"+P.pos_type]=js_bottom_ad_area.getElementsByClassName("js_ad_main_area"),
setBottomSize(P);
}
}
utils.lazyLoadAdImg({
aid:P.aid,
type:P.pt,
info:P
}),utils.checkAdImg(P);
}
}
isVideoSharePageOnlyAd&&handleVideoSharePage(),bindAdOperation();
}
if(is_temp_url&&adElCountMapByPos[AD_POS.POS_MID]&&!c)for(var _a=0;_a<adElCountMapByPos[AD_POS.POS_MID];_a++){
if(!utils.checkShowCpc(el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,_a)]),contentWrp)return;
el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,_a)].innerHTML=TMPL.tmpl(cpc_a_tpl,{
type:"",
ticket:"",
url:"",
rl:"",
aid:"",
pt:"",
traceid:"",
group_id:"",
apurl:"",
is_cpm:"",
pos_type:"",
dest_type:"",
exp_obj:{
btn_text:"按钮"
},
image_url:"https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiaPhsbHe4ctnlUllMCDCEIJib69wX3BUX42XagNypd2JcgyEiaoFRu4KicKF3avfRgVnWPABVTjtPRwQ/0?wx_fmt=png"
});
}
}
function _parseExpCpc(e){
var a=e.product_type,t={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(t.btn_text="查看详情"),29===a||31===a?t.btn_text="查看详情":a===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||a===AD_TYPE.IOS_APP_PRODUCT_TYPE?t.btn_text=a===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用":30===a?t.btn_text="去逛逛":a===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.btn_text=e.biz_info.is_subscribed?"查看公众号":"关注公众号":a===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&(t.btn_text="进入小游戏"),
e.dest_type===AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE&&(t.btn_text="查看详情"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var i=e.cpc_exp_info.exp_content;
try{
for(var n=JSON.parse(i.replace(/&quot;/g,'"')),_=-1,o=0;o<n.aid_list.length;o++)n.aid_list[o].aid==e.aid&&(_=o);
_>-1&&(t.icon_pos=n.icon_pos||"",t.btn_text=n.btn_text||t.btn_text,t.price=n.aid_list[_].price,
t.sale_text=n.aid_list[_].sale_text,window.__addIdKeyReport("68064",15));
}catch(p){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=t,e;
}
function seeAds(){
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var scrollFn=function scrollFn(event,adOffsetWebviewTopFromApp,scrollViewHeight){
var scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
scrollViewHeight=scrollViewHeight||innerHeight;
for(var i in adDatas.ads)!function(pos_key){
var gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var aInfo=adDatas.ads[pos_key].a_info,gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,aid=gdt_a.dataset.aid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=aInfo.pos_type,offsetTop=offset.getOffsetTop(el_gdt_areas[pos_key]),adHeight=el_gdt_areas[pos_key].offsetHeight,adOffsetTop=offsetTop+gdt_a.offsetTop,gh_id="",pt=aInfo.pt,adOffsetWebviewTop=adOffsetWebviewTopFromApp?adOffsetWebviewTopFromApp+gdt_a.offsetTop:offsetTop-scrollTop,intoView=scrollViewHeight>adOffsetWebviewTop&&adOffsetWebviewTop>-adHeight,signData={
click_pos:"",
rl:encodeURIComponent(a_info.rl),
__biz:biz,
pos_x:"",
pos_y:"",
press_interval:""
};
adDatas.ads[pos_key]&&aInfo&&aInfo.weapp_info&&aInfo.weapp_info.original_id&&(gh_id=aInfo.weapp_info.original_id),
adDatas.ads[pos_key].ad_engine=0;
try{
exp_value=JSON.stringify(exp_value);
}catch(e){
exp_value="[]";
}
if(-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),intoView?showTime.startShow(aInfo):showTime.stopShow(aid),
!ping_apurl[pos_key]&&intoView){
ping_apurl[pos_key]=!0;
var report_arg="trace_id="+tid+"&product_type="+pt+"&logtype=2&url="+encodeURIComponent(location.href)+"&apurl="+encodeURIComponent(apurl);
tid&&mmversion.gtVersion("6.3.22",!0)&&JSAPI.invoke("adDataReport",{
ad_info:report_arg
},function(){}),log("[Ad] seeAd, tid="+tid+", aid="+aid+", pos_type="+pos_type),
Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
var reportOriginUrl=urlParser.join("/mp/advertisement_report",{
report_type:1,
tid:tid,
aid:aid,
gh_id:gh_id,
adver_group_id:gid,
apurl:encodeURIComponent(apurl),
__biz:biz,
ascene:encodeURIComponent(window.ascene||-1),
pos_type:pos_type,
exp_id:exp_id,
exp_value:exp_value,
r:Math.random()
},!0);
ajax({
url:utils.joinSignParam(reportOriginUrl,{
adSignData:adSignData,
adSignK1:adSignK1,
adSignK2:adSignK2,
signMd5:signMd5,
viewidKeyObj:viewidKeyObj
}),
success:function success(res){
log("[Ad] seeAd report success, tid="+tid+", aid="+aid+", pos_type="+pos_type);
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1;
},
error:function(){
log("[Ad] seeAd report error, tid="+tid+", aid="+aid+", pos_type="+pos_type),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_27_1";
},
async:!0
}),utils.reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},reportOriginUrl);
});
}
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollViewHeight-adHeight*rh>adOffsetWebviewTop&&adOffsetWebviewTop>-adHeight*(1-rh)?3==pos_type?(ping_cpm_apurl_obj.hasPing=!0,
Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
var reportOriginUrl=urlParser.join("/mp/advertisement_report",{
report_type:1,
tid:tid,
aid:aid,
gh_id:gh_id,
adver_group_id:gid,
apurl:encodeURIComponent(apurl+"&viewable=true"),
__biz:biz,
ascene:encodeURIComponent(window.ascene||-1),
pos_type:pos_type,
r:Math.random()
},!0);
ajax({
url:utils.joinSignParam(reportOriginUrl,{
adSignData:adSignData,
adSignK1:adSignK1,
adSignK2:adSignK2,
signMd5:signMd5,
viewidKeyObj:viewidKeyObj
}),
mayAbort:!0,
success:function success(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
}),utils.reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},reportOriginUrl);
})):ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
var reportOriginUrl=urlParser.join("/mp/advertisement_report",{
report_type:1,
tid:tid,
aid:aid,
gh_id:gh_id,
adver_group_id:gid,
apurl:encodeURIComponent(apurl+"&viewable=true"),
__biz:biz,
ascene:encodeURIComponent(window.ascene||-1),
pos_type:pos_type,
exp_id:exp_id,
exp_value:exp_value,
r:Math.random()
},!0);
ajax({
url:utils.joinSignParam(reportOriginUrl,{
adSignData:adSignData,
adSignK1:adSignK1,
adSignK2:adSignK2,
signMd5:signMd5,
viewidKeyObj:viewidKeyObj
}),
mayAbort:!0,
success:function success(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
}),utils.reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},reportOriginUrl);
});
},1001)):3!=pos_type&&ping_cpm_apurl_obj.clk&&(clearTimeout(ping_cpm_apurl_obj.clk),
ping_cpm_apurl_obj.clk=null);
}
var allReport=!0;
if(107==pt||108==pt||110==pt)for(var i=0;i<see_ad_detail_report.length;i++)if(see_ad_detail_report[i])allReport=!1;else{
var report_url=location.protocol+"//mp.weixin.qq.com/mp/ad_report?action=see_report&aid="+aid+"&tid="+tid;
if((0==i&&scrollTop+scrollViewHeight>adOffsetTop+1||1==i&&scrollTop+scrollViewHeight>adOffsetTop+.5*adHeight||2==i&&scrollTop+scrollViewHeight>adOffsetTop+adHeight)&&((new Image).src=report_url+"&seepos="+(i+1)+"&report_type=0",
see_ad_detail_report[i]=!0),i>=3)if(scrollTop+scrollViewHeight>adOffsetTop&&adOffsetTop+adHeight>scrollTop){
if(see_ad_detail_first_see_time>0){
var t=0;
3==i&&(t=500),4==i&&(t=1e3),5==i&&(t=2e3),+new Date-see_ad_detail_first_see_time>t?((new Image).src=report_url+"&seetime="+t+"&report_type=1",
see_ad_detail_report[i]=!0):window.setTimeout(function(){
seeAds();
},t);
}
0==see_ad_detail_first_see_time&&(see_ad_detail_first_see_time=+new Date);
}else see_ad_detail_first_see_time=0;
}
}
}(i);
},onScroll=utils.debounce(scrollFn,50);
DomEvent.on(window,"scroll",onScroll),!isVideoSharePageOnlyAd&&onScroll(),isVideoSharePageOnlyAd&&JSAPI.on("onScrollViewDidScroll",function(e){
onScroll(null,e.subViewOffsetTop,e.scrollViewHeight);
});
}
}
function ad_click(e,a,t,i,n,_,o,p,r,d,s,l,c,m,u,f,g,y,D){
if(!has_click[n]){
has_click[n]=!0;
{
var P=document.getElementById("loading_"+n);
g.product_type;
}
P&&(P.style.display="inline");
var A=g.exp_info||{},v=A.exp_id||"",T=A.exp_value||[];
try{
T=JSON.stringify(T);
}catch(h){
T="[]";
}
var E="";
l&&l.weapp_info&&l.weapp_info.original_id&&(E=l.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:v,
exp_value:T,
url:encodeURIComponent(a),
tid:n,
aid:p,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:r,
pos_x:c,
pos_y:m,
ad_w:u,
ad_h:f,
gh_id:E,
press_interval:window.__a_press_interval||-1
},function(){
if(has_click[n]=!1,P&&(P.style.display="none"),g.app_info){
var t=handleApp(a,n,idx,mid,biz,r,p,s,d,l,g,_,y);
if(t)return;
}
if(isCanvasAd(g))return void utils.openCanvasAd({
canvasId:g.canvas_info.canvas_id,
adInfoXml:g.canvas_info.ad_info_xml,
pos_type:d,
report_param:y,
url:a
});
if(D)if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.OUTER_DEST_TYPE)handleH5(a,n,idx,mid,biz,r,p,s,d,l,g);else if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE)Wxopen_card.openWxopen(l);else if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.AD_DEST_TYPE)openUrlWithExtraWebview(a);else{
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_SHOP_DEST_TYPE)return void openUrlWithExtraWebview(urlParser.join(a,{
outer_id:l.outer_id
}));
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.BIZ_DEST_TYPE&&g.product_type==AD_CONFIG.AD_TYPE.CARD_PRODUCT_TYPE)return void Card.openCardDetail(l.card_id,l.card_ext,l);
console.info("[广告新协议兜底跳转]",g),openUrlWithExtraWebview(a);
}else if("5"==e)openUrlWithExtraWebview("/mp/profile?source=from_ad&tousername="+a+"&ticket="+_+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+n);else{
if("105"==r&&l)return void Card.openCardDetail(l.card_id,l.card_ext,l);
if("106"==r&&l)return void openUrlWithExtraWebview(urlParser.join(a,{
outer_id:l.outer_id
}));
if("118"==r||"119"==r||"120"==r)return void Wxopen_card.openWxopen(l);
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE)return void Wxopen_card.openWxopen(l);
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:n,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:p,
ad_engine:s,
pos_type:d
},o=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&l||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var c="",m="";
l&&(c=l.pkgname&&l.pkgname.replace(/\./g,"_"),m=l.channel_id||""),i={
source:4,
tid:n,
traceid:n,
mid:mid,
idx:idx,
appuin:biz,
pt:r,
channel_id:m,
aid:p,
engine:s,
pos_type:d,
pkgname:c
};
}
a=urlParser.join(a,i),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=urlParser.join(a,{
traceid:n,
aid:p,
engine:s
})),!p&&o&&o(80,a);
}
openUrlWithExtraWebview(a);
}
});
}
}
function bindAdOperation(){
seeAds();
for(var e in adDatas.ads)!function(e){
var a=el_gdt_areas[e];
if(!a)return!1;
if(!a.getElementsByClassName&&a.style)return a.style.display="none",!1;
var t=a.getElementsByClassName("js_ad_link")||[],i=adDatas.ads[e];
if(i){
var n,_,o=i.adData,p=i.a_info,r=p.pos_type,d=p.pos_type,s=i.ad_engine,l=a.getElementsByClassName("js_ad_opt_list_btn_"+r),c=a.getElementsByClassName("js_complain_btn_"+r);
if(2==p.use_new_protocol){
var m=a.getElementsByClassName("js_material_"+r),u=a.getElementsByClassName("js_ad_action_"+r);
if(o){
o.adid=window.adid||o.adid||o.aid;
var f="&tid="+o.traceid+"&uin="+uin+"&key="+key+"&ticket="+(o.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+o.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
}
if(m.length>0&&(_=o.tid||p.traceid,n=p.aid,DomEvent.on(m[0],"click",function(e){
var a=p,t=!!e&&e.target;
if(p&&p.has_installed&&("104"==o.pt||"113"==o.pt||"114"==o.pt||"2"==o.pt)?utils.report(114,f):"103"==o.pt||"111"==o.pt||"112"==o.pt?utils.report(23,f):("104"==o.pt||"113"==o.pt||"114"==o.pt)&&utils.report(25,f),
!(!a||3===d||-1!==t.className.indexOf("js_muted_btn")||videoAdMap[a.aid]&&videoAdMap[a.aid].adPlayer&&"play"!==videoAdMap[a.aid].adPlayer.adVideoStatus)){
var i,l,c,u,g=a.type,y=a.url,D=a.rl,P=a.apurl,A=a.ticket,v=a.group_id,T=a.pt,h=p.use_new_protocol;
return i=position.getX(t,"js_material_"+r)+e.offsetX,l=position.getY(t,"js_material_"+r)+e.offsetY,
c=m[0].clientWidth,u=m[0].clientHeight,ad_click(g,y,D,P,_,A,v,n,T,d,s,o,i,l,c,u,p,f,h),
log("[Ad] ad_click: type="+g+", url="+y+", rl="+D+", apurl="+P+", traceid="+_+", ticket="+A+", group_id="+v+", aid="+n+", pt="+T+", pos_type="+d+", ad_engine="+s),
!1;
}
})),u.length>0&&p.button_action&&3!=p.pos_type)if(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var g=require("a/app_card.js"),y=15,D=o.pkgname&&o.pkgname.replace(/\./g,"_");
new g({
btn:u[0],
adData:o,
report_param:f,
pos_type:d,
url_scheme:o.url_scheme,
via:[o.traceid,o.adid,D,source,y,s].join("."),
ticket:o.ticket,
appdetail_params:["&aid="+o.adid,"traceid="+o.traceid,"pkgname="+D,"source="+source,"type="+y,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+o.ticket,"scene="+scene].join("&"),
engine:s,
percentStatus:function(a,t){
var i=ad_render_object[e].getData();
i.percent=t,"downloading"==a?i.btn_text="暂停":"paused"==a?i.btn_text="继续":"installed"==a?(i.percent=0,
i.btn_text="已安装"):"downloaded"==a?(i.percent=0,i.btn_text="安装"):"gotodetail"==a?(i.percent=0,
i.btn_text=117==parseInt(p.crt_size)||354==parseInt(p.crt_size)||355==parseInt(p.crt_size)||568==parseInt(p.crt_size)?"进入":"进入应用"):(i.percent=0,
i.btn_text=117==parseInt(p.crt_size)||354==parseInt(p.crt_size)||355==parseInt(p.crt_size)||568==parseInt(p.crt_size)?"进入":"进入应用"),
ad_render_object[e].updateData(i);
}
});
}else if(p.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
var P=require("a/profile.js");
o.adid=window.adid||o.adid||o.aid,new P({
btnProfile:u[0],
adData:o,
pos_type:d,
report_param:f,
aid:o.adid,
ad_engine:s
});
}else p.product_type==AD_TYPE.CARD_PRODUCT_TYPE?new Card({
btn:u[0],
adData:o,
report_param:f,
pos_type:d
}):p.product_type==AD_TYPE.WECHATCARD_PRODUCT_TYPE?new MpShop({
btn:u[0],
adData:o,
report_param:f,
pos_type:d
}):DomEvent.on(u[0],"click",function(e){
var a=o,t=!!e&&e.target,i=a.type,n=p.button_action.jump_url,_=a.rl,l=a.apurl,c=a.tid||p.traceid,m=a.ticket,f=a.group_id,g=a.aid,y=a.pt,D=p.use_new_protocol;
if(console.info("[广告新协议点击素材]",p.dest_type,p.product_type),o){
o.adid=window.adid||o.adid||o.aid;
var P="&tid="+o.traceid+"&uin="+uin+"&key="+key+"&ticket="+(o.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+o.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
}
var A,v,T,h;
return A=position.getX(t,"js_ad_action_"+r)+e.offsetX,v=position.getY(t,"js_ad_action_"+r)+e.offsetY,
T=u[0].clientWidth,h=u[0].clientHeight,ad_click(i,n,_,l,c,m,f,g,y,d,s,o,A,v,T,h,p,P,D),
log("[Ad] ad_click: type="+i+", url="+n+", rl="+_+", apurl="+l+", traceid="+c+", ticket="+m+", group_id="+f+", aid="+g+", pt="+y+", pos_type="+d+", ad_engine="+s),
!1;
});
}else for(var A=0,v=t.length;v>A;++A)!function(e,a){
var i=t[e],o=i.dataset;
if(o&&3!=p.pos_type){
var r=o.type,l=o.url,c=o.rl,m=o.apurl,u=o.ticket,f=o.group_id,g=o.pt,y=p.use_new_protocol,D=!0;
_=o.tid,n=o.aid,(y&&(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE)||115===g)&&(D=!1),
p.pos_type===AD_POS.POS_MID&&(D=!1),DomEvent.on(i,"click",function(e){
var t=!!e&&e.target,i=[AD_TYPE.ANDROID_APP_PRODUCT_TYPE,AD_TYPE.IOS_APP_PRODUCT_TYPE,AD_TYPE.ADD_CONTACT_PRODUCT_TYPE];
if(!t||!t.className||d==AD_POS.POS_MID&&a&&-1==i.toString().indexOf(a.product_type)||-1==t.className.indexOf("js_ad_btn")&&-1==t.className.indexOf("js_btn_process")&&-1==t.className.indexOf("js_muted_btn")&&-1==t.className.indexOf("js_poster_cover")&&-1==t.className.indexOf("js_ad_opt_list_btn")&&-1==t.className.indexOf("js_complain_btn")&&-1==t.className.indexOf("js_view_profile")&&-1==t.className.indexOf("js_add_contact")){
if(a){
a.adid=window.adid||a.adid||a.aid;
var o="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
p&&p.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?utils.report(114,o):"103"==a.pt||"111"==a.pt||"112"==a.pt?utils.report(23,o):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&utils.report(25,o);
}
var D,P,A,v;
return D=position.getX(t,"js_ad_link")+e.offsetX,P=position.getY(t,"js_ad_link")+e.offsetY,
A=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(r,l,c,m,_,u,f,n,g,d,s,a,D,P,A,v,p,o,y),log("[Ad] ad_click: type="+r+", url="+l+", rl="+c+", apurl="+m+", traceid="+_+", ticket="+u+", group_id="+f+", aid="+n+", pt="+g+", pos_type="+d+", ad_engine="+s),
!1;
}
},D),DomEvent.on(i,"touchstart",function(){
window.__a_press_interval=+new Date;
}),DomEvent.on(i,"touchend",function(){
window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(A,o);
if(l[0]&&DomEvent.on(l[0],"click",function(){
if(parseInt(window.can_see_complaint)){
var e=l[0].getElementsByClassName("js_ad_opt_list_"+p.pos_type);
utils.adOptReport(0,p.pos_type,_,n),e&&e[0]&&(e[0].style.display="none"==e[0].style.display?"block":"none");
}
return!1;
}),c[0]&&DomEvent.on(c[0],"click",function(){
var e="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+n+"&traceid="+_+"&source="+p.pos_type+"&biz="+window.biz+"&material_id="+JSON.stringify(p.material_id_list);
return utils.adOptReport(1,p.pos_type,_,n),mmversion.isWp||mmversion.isIOS||mmversion.isAndroid?JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):openUrlWithExtraWebview(e),!1;
}),o&&2!=p.use_new_protocol){
o.adid=window.adid||o.adid||o.aid;
var T=p.exp_info||{},h=T.exp_id||"",E=T.exp_value||[];
try{
E=JSON.stringify(E);
}catch(b){
E="[]";
}
var f="&tid="+o.traceid+"&uin="+uin+"&key="+key+"&ticket="+(o.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+o.adid+"&ad_engine="+s+"&pos_type="+d+"&exp_id="+h+"&exp_value="+E+"&r="+Math.random();
if(o.report_param=f,o.use_new_protocol){
if(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var g=require("a/app_card.js"),y=15,D=o.pkgname&&o.pkgname.replace(/\./g,"_"),w=document.getElementById("js_ad_btn_"+d);
new g({
btn:w,
adData:o,
report_param:f,
pos_type:d,
url_scheme:o.url_scheme,
via:[o.traceid,o.adid,D,source,y,s].join("."),
ticket:o.ticket,
appdetail_params:["&aid="+o.adid,"traceid="+o.traceid,"pkgname="+D,"source="+source,"type="+y,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+o.ticket,"scene="+scene].join("&"),
engine:s
});
}else if(p.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
var P=require("a/profile.js");
new P({
btnProfile:document.getElementById("js_ad_btn_"+d),
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:o,
pos_type:d,
report_param:f,
aid:o.adid,
ad_engine:s,
a_info:p
});
}
9==p.material_type&&(p.report_param=f,videoAdMap[p.aid]=new VideoAd(p));
}else{
if("100"==o.pt||"115"==o.pt){
var P=require("a/profile.js");
return void new P({
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:o,
pos_type:d,
report_param:f,
aid:o.adid,
ad_engine:s,
a_info:p
});
}
if("102"==o.pt){
var O=require("a/android.js"),y=15,D=o.pkgname&&o.pkgname.replace(/\./g,"_");
return void new O({
btn:document.getElementById("js_app_action_"+d),
adData:o,
report_param:f,
task_ext_info:[o.adid,o.traceid,D,source,y,s].join("."),
via:[o.traceid,o.adid,D,source,y,s].join(".")
});
}
if("101"==o.pt){
var x=require("a/ios.js");
return void new x({
btn:document.getElementById("js_app_action_"+d),
adData:o,
ticket:o.ticket,
report_param:f
});
}
if("105"==o.pt)return void new Card({
btn:document.getElementById("js_card_action_"+d),
adData:o,
report_param:f,
pos_type:d
});
if("106"==o.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+d),
adData:o,
report_param:f,
pos_type:d
});
if("103"==o.pt||"104"==o.pt||"111"==o.pt||"112"==o.pt||"113"==o.pt||"114"==o.pt||"121"==o.pt||"122"==o.pt){
var g=require("a/app_card.js"),y=15,D=o.pkgname&&o.pkgname.replace(/\./g,"_");
return void new g({
btn:document.getElementById("js_appdetail_action_"+d),
js_app_rating:document.getElementById("js_app_rating_"+d),
adData:o,
report_param:f,
pos_type:d,
url_scheme:o.url_scheme,
via:[o.traceid,o.adid,D,source,y,s].join("."),
ticket:o.ticket,
appdetail_params:["&aid="+o.adid,"traceid="+o.traceid,"pkgname="+D,"source="+source,"type="+y,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+o.ticket,"scene="+scene].join("&"),
engine:s
});
}
if("108"==o.pt||"109"==o.pt||"110"==o.pt||"116"==o.pt||"117"==o.pt){
var I=require("a/sponsor.js");
new I({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:o,
a_info:p,
pos_type:d,
report_param:f
});
}
"118"==p.pt&&(o.report_param=f),"125"==p.pt&&(p.report_param=f,videoAdMap[p.aid]=new VideoAd(p));
}
}
}
}(e);
}
function isCanvasAd(e){
return!!e.canvas_info&&e.dest_type===AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE;
}
function launchIosAppBackup(e,a,t,i,n,_,o,p,r,d,s,l,c){
return isCanvasAd(s)?void utils.openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:c,
url:e
}):s.dest_type!==AD_CONFIG.AD_DEST_TYPE.OUTER_DEST_TYPE||utils.isItunesLink(e)?s.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE?void Wxopen_card.openWxopen(d):s.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_SHOP_DEST_TYPE?void openUrlWithExtraWebview(urlParser.join(e,{
outer_id:d.outer_id
})):void utils.openWebAppStore(s.app_info.appinfo_url,l):void handleH5(e,a,t,i,n,_,o,p,r,d,s);
}
function handleApp(e,a,t,i,n,_,o,p,r,d,s,l,c){
console.info("[广告处理下载事件]",s);
var m=arguments;
if(s.has_installed&&!utils.isItunesLink(s.app_info.appinfo_url)&&s.app_info.url_scheme)return JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=s.app_info.url_scheme);
}),!0;
if(utils.isItunesLink(s.app_info.appinfo_url)){
if(s.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)){
var u=1,f=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
f&&f[1]&&parseInt(f[1].split("_")[0],10)>=12&&(u=0);
var g={
schemeUrl:s.app_info.url_scheme,
messageExt:s.app_info.url_scheme,
appID:s.app_info.open_platform_appid
};
s.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE&&utils.extend(g,{
installSchemeUrl:s.app_info.appinfo_url,
installAction:u
}),JSAPI.invoke("launchApplication",g,function(e){
(-1===e.err_msg.indexOf("ok")||"fail"===e.launchInstallResult)&&launchIosAppBackup.apply(null,m);
});
}else launchIosAppBackup.apply(null,m);
return!0;
}
if(s.product_type!==AD_TYPE.ANDROID_APP_PRODUCT_TYPE&&s.product_type!==AD_TYPE.IOS_APP_PRODUCT_TYPE)return!1;
if(isCanvasAd(s))return utils.openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:c,
url:e
}),!0;
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var y={
source:4,
tid:a,
idx:t,
mid:i,
appuin:n,
pt:_,
aid:o,
ad_engine:p,
pos_type:r
},D=window.__report;
if(d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var P="",A="";
d&&(P=d.pkgname&&d.pkgname.replace(/\./g,"_"),A=d.channel_id||""),y={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:n,
pt:_,
channel_id:A,
aid:o,
engine:p,
pos_type:r,
pkgname:P
};
}
e=urlParser.join(e,y),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=urlParser.join(e,{
traceid:a,
aid:o,
engine:p
})),!o&&D&&D(80,e);
}
return openUrlWithExtraWebview(e),!0;
}
function handleH5(e,a,t,i,n,_,o,p,r,d,s){
if(console.info("[广告处理H5事件]",s),-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var l={
source:4,
tid:a,
idx:t,
mid:i,
appuin:n,
pt:_,
aid:o,
ad_engine:p,
pos_type:r
},c=window.__report;
if(("104"==_||"113"==_||"114"==_||"122"==_)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",u="";
d&&(m=d.pkgname&&d.pkgname.replace(/\./g,"_"),u=d.channel_id||""),l={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:n,
pt:_,
channel_id:u,
aid:o,
engine:p,
pos_type:r,
pkgname:m
};
}
e=urlParser.join(e,l),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=urlParser.join(e,{
traceid:a,
aid:o,
engine:p
})),!o&&c&&c(80,e);
}
console.info("[广告H5落地页最终URL]",e),openUrlWithExtraWebview(e);
}
var mmversion=require("biz_wap/utils/mmversion.js"),Device=require("biz_wap/utils/device.js"),Sign=require("a/a_sign.js"),openUrl=require("biz_wap/utils/openUrl.js"),getParaList=require("biz_common/utils/get_para_list.js"),showTime=require("biz_wap/utils/show_time.js"),urlParser=require("biz_common/utils/url/parse.js"),DomEvent=require("biz_common/dom/event.js"),AdClickReport=require("a/a_report.js").AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),Wxopen_card=require("a/wxopen_card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),cpc_a_tpl=require("a/cpc_a_tpl.html.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),log=require("appmsg/log.js"),CrtManager=require("a/tpl/crt_tpl_manager.js"),classList=require("biz_common/dom/class.js"),AD_CONFIG=require("a/a_config.js"),VideoAd=require("a/video.js"),utils=require("a/a_utils.js"),offset=require("biz_common/dom/offset.js"),appDialogConfirm=require("a/appdialog_confirm.js"),adLS=new LS("ad"),lsKey=[biz,sn,mid,idx].join("_"),globalAdDebug=!!urlParser.getQuery("mock")||!!urlParser.getQuery("rtx"),AD_TYPE=AD_CONFIG.AD_TYPE,AD_POS=AD_CONFIG.AD_POS,pos_type=window.pos_type||0,__report=window.__report,js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),el_gdt_areas={
pos_3:js_sponsor_ad_area,
pos_0:js_bottom_ad_area
},adElCountMapByPos={},contentWrp=document.getElementById("js_content"),ad_render_object={
pos_3:null,
pos_0:null
},gdt_as={
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
},ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{}
},isScroll=!1,isSee=!1,openUrlWithExtraWebview=openUrl.openUrlWithExtraWebview,see_ad_detail_report=[!1,!1,!1,!1,!1,!1],see_ad_detail_first_see_time=0,innerHeight=window.innerHeight||document.documentElement.clientHeight,ad_engine=0;
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},videoAdMap={},isVideoSharePageOnlyAd=utils.isVideoSharePageOnlyAd();
return AdFrame.prototype.initMidAd=function(e,a){
insertAutoAdElement(e,!0);
var t=document.getElementsByTagName("mpcpc")[a];
t&&(this.aInfoMap[e.aid].iframeEle=createAdFrame(t,e),__report&&__report(125),utils.report115849("0"));
},AdFrame.prototype.initAdBeforeVideo=function(e){
for(var a=0;a<this.iframes.length;a++){
var t=this.iframes[a];
if(isVideoFrameHasVid(t,e.vid)){
var i=this.aInfoMap[e.aid],n=document.createElement("div");
n.className="mpad_relative";
var _=t.nextSibling;
utils.insertAfter(n,t),n.appendChild(t);
var o=createAdFrame(n,e);
return classList.addClass(o,"mpad_absolute"),i.iframeEle=o,i.heightWidthRate=parseInt(t.style.height,10)/parseInt(t.style.width,10),
_&&n.appendChild(_),void utils.report115849(1);
}
}
},AdFrame.prototype.onFrameReady=function(e,a){
var t=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,i="",n=this.aInfoMap[a];
if(n){
var _=n.iframeEle.parentNode;
n.aInfo.pos_type===AD_POS.POS_MID&&(i=_&&_.dataset&&_.dataset.category_id_list),
postMessageToAdFrame(e,"setPageDataV2",{
biz:window.biz,
uin:window.uin,
scene:window.scene,
source:window.source,
idx:window.idx,
mid:window.mid,
isSg:window.isSg,
userUin:window.user_uin,
passTicket:decodeURIComponent(window.pass_ticket),
globalAdDebug:globalAdDebug,
bodyScrollTop:t,
contentOffsetHeight:contentWrp.offsetHeight,
adOffsetTop:offset.getOffsetTop(n.iframeEle),
screenHeight:innerHeight,
midCategoryIdList:i,
heightWidthRate:n.heightWidthRate
}),postMessageToAdFrame(e,"setAdDataV2",n.aInfo);
}
},AdFrame.prototype.mapInfoMap=function(e,a){
for(var t in this.aInfoMap){
var i=this.aInfoMap[t].iframeEle;
this.aInfoMap.hasOwnProperty(t)&&i&&(!a||a&&a===t)&&e&&e(this.aInfoMap[t].aInfo,i);
}
},AdFrame.prototype.broadcastAdFrame=function(e,a){
this.mapInfoMap(function(t,i){
postMessageToAdFrame(i.contentWindow,e,a);
});
},AdFrame.prototype.bindScrollEvent=function(){
var e=this,a=utils.debounce(function(){
var a=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
e.mapInfoMap(function(e,t){
postMessageToAdFrame(t.contentWindow,"pageScrollV2",{
bodyScrollTop:a,
adOffsetTop:offset.getOffsetTop(t)
});
});
},50);
DomEvent.on(window,"scroll",a);
},AdFrame.prototype.checkApiInvokeValid=function(e){
if(!this.aInfoMap[e.aid])return"Invalid aid";
var a=e.proxyData||{},t=this.aInfoMap[e.aid].aInfo,i=a.methodName;
return-1===AD_CONFIG.AD_JSAPI_WHITE_LIST.indexOf(i)?invalidMsg(AD_CONFIG.INVALID_METHOD_NAME_MSG_PREFIX,i):"addContact"!==i&&"profile"!==i||t&&t.biz_info&&a.args.username===t.biz_info.user_name?!0:invalidMsg(AD_CONFIG.INVALID_ARGS_MSG_PREFIX,"Invalid biz username");
},AdFrame.prototype.changeFrameStyle=function(e){
if(this.aInfoMap[e.aid]){
var a=this.aInfoMap[e.aid].iframeEle;
e.display===!1?classList.addClass(a,AD_CONFIG.AD_IFRAME_HIDE_CLASS):e.display===!0&&classList.removeClass(a,AD_CONFIG.AD_IFRAME_HIDE_CLASS),
e.height&&(a.style.height=e.height);
}
},AdFrame.prototype.commonRequest=function(e,a){
var t=a.proxyData||{},i=t.args||{};
return-1===AD_CONFIG.AD_REQ_PATH_WHITE_LIST.indexOf(i.path)?void proxyCallback(e,a,{
err_msg:invalidMsg(AD_CONFIG.INVALID_REQ_PATH_MSG_PREFIX,i.path)
}):void ajax({
type:i.requestType,
url:i.path+"?"+(i.requestQuery||""),
data:i.requestBody||{},
mayAbort:!0,
success:function(t){
proxyCallback(e,a,{
err_msg:"request:success",
response:t
});
},
error:function(t,i){
proxyCallback(e,a,{
err_msg:"request:error",
xhr:t,
err_info:i
});
}
});
},AdFrame.prototype.onJsapiProxy=function(e,a){
var t=a.proxyData||{},i=this.checkApiInvokeValid(a);
if("string"==typeof i)return void proxyCallback(e,a,{
err_msg:i
});
try{
JSAPI[t.methodType](t.methodName,t.args,function(i){
proxyCallback(e,a,i),"openUrlWithExtraWebview"===t.methodName&&-1===i.err_msg.indexOf("ok")&&(location.href=t.args.url);
});
}catch(n){
console.error(n),proxyCallback(e,a,{
err_msg:invalidMsg(AD_CONFIG.INVALID_METHOD_TYPE_MSG_PREFIX,t.methodType)
});
}
},AdFrame.prototype.onProxy=function(e,a){
if("jsapi"===a.proxyType)return void this.onJsapiProxy.apply(this,arguments);
var t=a.proxyData||{};
if("bizapi"===a.proxyType){
if("appDialogConfirm"===t.methodName)return void androidAppDialogConfirm.apply(this,arguments);
if("request"===t.methodName)return void this.commonRequest.apply(this,arguments);
if("addIdKeyReport"===t.methodName)return void window.__addIdKeyReport(t.args.id,t.args.key,t.args.val);
}
},AdFrame.prototype.bindAdEvent=function(){
var e=this;
utils.listenMessage(window,function(a,t){
var i=t.action,n=t.value||{};
if(i===AD_CONFIG.AD_VIDEO_PLAY_ACTION&&(n.vid||n.aid))return e.mapInfoMap(function(e,a){
e.vid===n.vid||e.aid===n.aid?e.vid===n.vid&&postMessageToAdFrame(a.contentWindow,"playVideoV2",""):postMessageToAdFrame(a.contentWindow,"pauseVideoV2","");
}),void(n.aid&&utils.broadcastFrame(e.iframes,AD_CONFIG.AD_VIDEO_PLAY_ACTION,"","vid="));
if(a.origin!==AD_CONFIG.AD_FRAME_DOMAIN);else switch(i){
case"onFrameReadyV2":
e.onFrameReady(a.source,n.aid);
break;

case"onProxyV2":
e.onProxy(a.source,n);
break;

case"changeFrameStyle":
e.changeFrameStyle(n);
break;

case"onVideoEndV2":
e.mapInfoMap(function(a){
utils.broadcastFrame(e.iframes,AD_CONFIG.AD_VIDEO_END_ACTION,"","vid="+a.vid);
},n.aid);
}
}),this.bindScrollEvent();
},AdFrame.prototype.handleAdWithFrame=function(e){
if(e.length){
var a=0,t=this;
e.forEach(function(e){
return t.aInfoMap[e.aid]={
aInfo:e
},e.pos_type===AD_POS.POS_MID?(t.initMidAd(e,a),void a++):e.pos_type===AD_POS.POS_AD_BEFORE_VIDEO&&0===e.is_mp_video?void t.initAdBeforeVideo(e):void 0;
}),this.bindAdEvent();
}
},initAdData(),{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
});define("pages/video_communicate_adaptor.js",[],function(){
"use strict";
function t(){
window.addEventListener("message",e,!1),v();
}
function e(t){
var e;
if(t.origin?e=t.origin:t.originalEvent&&(e=t.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(e)&&t.source){
var i=t.data;
if(i&&i.type){
if(!/^mpvideo_/.test(i.type))return;
var o=i.type.replace(/^mpvideo_/,"");
/^broadcast_/.test(o)?f.postMessageEvt.broadcast({
data:i.data,
type:o
}):f.postMessageEvt[o]&&f.postMessageEvt[o](i.data);
}
}
}
function i(t){
var e=t.type.replace(/^broadcast_/,""),i=a();
if(i.length>0)for(var n=0,d=i.length;d>n;n++){
var r=i[n];
o({
win:r.contentWindow,
type:e,
data:t.data
});
}
o({
win:window,
type:e,
data:t.data
});
}
function o(t){
var e=t.type;
/^mpvideo_/.test(e)||(e="mpvideo_"+e);
var i={
data:t.data,
type:e
};
t.win.postMessage(i,document.location.protocol+"//mp.weixin.qq.com");
}
function n(t){
for(var e=a({
vid:t.vid
}),i=0,n=e.length;n>i;i++){
var d=e[i];
d.style.display="";
var r=d.parentNode,v=r.querySelectorAll('.js_img_loading[data-vid="'+t.vid+'"]');
if(v&&v.length>0)for(var i=0,n=v.length;n>i;i++)r.removeChild(v[i]);
o({
type:"afterRemoveLoading",
win:d.contentWindow
});
}
}
function a(t){
t=t||{};
for(var e=document.getElementsByTagName("iframe"),i=[],o=0,n=e.length;n>o;o++){
var a=e[o],d=a.getAttribute("src");
if(d&&-1!=d.indexOf("/mp/videoplayer")){
if("undefined"!=typeof t.vid){
var r=d.match(/[\?&]vid\=([^&]*)/);
if(!r||!r[1]||r[1]!=t.vid)continue;
}
i.push(a);
}
}
return i;
}
function d(t){
if(t.height){
var e=a({
vid:t.vid
});
if(0!=e.length){
var i=e[0],o=i.offsetHeight+1*t.height;
i.setAttribute("height",o),i.setAttribute("data-additionalheight",t.height),i.style.setProperty&&i.style.setProperty("height",o+"px","important");
}
}
}
function r(t){
f.videoInfo[t.vid]||(f.videoInfo[t.vid]={}),f.videoInfo[t.vid].ori_status=t.ori_status,
f.videoInfo[t.vid].hit_bizuin=t.hit_bizuin,f.videoInfo[t.vid].hit_vid=t.hit_vid;
}
function v(){
"function"==typeof window.__getVideoWh&&window.addEventListener("resize",function(){
for(var t=a(),e=0,i=t.length;i>e;e++){
var o=t[e];
setTimeout(function(t){
return function(){
var e=window.__getVideoWh(t),i=e.w,o=e.h,n=1*t.getAttribute("data-additionalheight");
n&&(o+=n),t.setAttribute("width",i),t.setAttribute("height",o),t.style.setProperty&&(t.style.setProperty("width",i+"px","important"),
t.style.setProperty("height",o+"px","important"));
};
}(o),50);
}
},!1);
}
function s(){
return f.videoInfo;
}
var f={
videoInfo:{},
postMessageEvt:{
broadcast:i,
removeVideoLoading:n,
addVideoIframeHeight:d,
videoInited:r
}
};
return t(),{
getVideoInfo:s
};
});define("biz_wap/utils/ajax_wx.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
console.log(e),/^(http:\/\/|https:\/\/|\/\/)/.test(e.url)?/^\/\//.test(e.url)&&(e.url="https:"+e.url):e.url="https://mp.weixin.qq.com/"+e.url.replace(/^\//,""),
e.url+=-1==e.url.indexOf("?")?"?fasttmplajax=1":"&fasttmplajax=1","html"==e.f||-1!=e.url.indexOf("?f=json")&&-1!=e.url.indexOf("&f=json")||(e.url+="&f=json");
var t=null;
if("object"==typeof e.data){
var o=e.data;
t=[];
for(var a in o)o.hasOwnProperty(a)&&t.push(a+"="+encodeURIComponent(o[a]));
t=t.join("&");
}else t="string"==typeof e.data?e.data:null;
console.log("before request");
var n=1,i=function(e,t){
return r.invoke("request",{
url:e.url,
method:e.type,
data:t,
header:{
Cookie:document.cookie
}
},function(o){
if(console.log("jsapiRequest",o.err_msg),o.err_msg.indexOf(":ok")>-1){
var a={};
if(o.data){
console.log(e.dataType),console.log(e);
try{
a="json"==e.dataType?JSON.parse(o.data):o.data;
}catch(l){
return console.error(l),void(e.error&&e.error({}));
}
}
var c={};
try{
c=JSON.parse(o.data);
}catch(l){}
c.base_resp&&"-3"==c.base_resp.ret&&n>0?(n--,r.invoke("updatePageAuth",{},function(r){
console.log("updatePageAuth",r),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_3_1",
r&&r.err_msg&&r.err_msg.indexOf(":ok")>-1?(window.top.pass_ticket=encodeURIComponent(s.getQuery("pass_ticket",r.fullUrl).html(!1).replace(/\s/g,"+")),
e.pass_ticket&&(e.pass_ticket=window.top.pass_ticket),i(e,t),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_4_1"):e.success&&e.success(a);
})):e.success&&e.success(a);
}else o.err_msg.indexOf("no permission")>-1?Ajax(e):e.error&&e.error({});
e.complete&&e.complete();
});
};
return i(e,t);
}
e("biz_common/utils/string/html.js");
var s=e("biz_common/utils/url/parse.js"),r=e("biz_wap/jsapi/core.js");
return t;
});define("biz_common/utils/respTypes.js",[],function(require,exports,module,alert){
"use strict";
var logList=[],log=function(r){
logList.push(r);
},printLog=function(){
for(var r=0,e=logList.length;e>r;++r)console.log("[RespType]"+logList[r]);
},isArray=function(r){
return"[object Array]"==Object.prototype.toString.call(r);
},getValueType=function(r){
return isArray(r)?"array":typeof r;
},parseRtDesc=function(r,e){
var t="mix",o=!1,c=e;
if(e){
var n="_R",s=e.indexOf(n),i=e.length-n.length;
o=-1!=s&&s==i,c=o?e.substring(0,i):e;
}
return"string"==typeof r?t=r:isArray(r)?t="array":"object"==typeof r&&(t="object"),
{
key:c,
type:t,
isRequired:o
};
},checkForArrayRtDesc=function(r,e){
if(!isArray(r))return!1;
for(var t=0,o=r.length;o>t;++t){
for(var c,n=r[t],s=0,i=0===e.length;c=e[s++];)if(checkForRtDesc(n,c)){
i=!0;
break;
}
if(!i)return!1;
}
return!0;
},checkForStringRtDesc=function(r,e){
var t=getValueType(r),o=parseRtDesc(e),c=o.type==t;
return c||log("miss match type : "+t+" !== "+o.type),c;
},checkForObjectRtDesc=function(r,e){
if("object"!=typeof r||isArray(r))return log("must be object"),!1;
var t=r,o=r;
for(var c in e)if(e.hasOwnProperty(c)){
var n=e[c],s=parseRtDesc(n,c),i=s.key;
o=t[i];
var u=getValueType(o);
if(s.isRequired&&void 0===o)return log("is required @key="+i),!1;
if(void 0!==o){
if(u!=s.type&&"mix"!=s.type)return log("miss match type : "+u+" !== "+s.type+" @key="+i),
!1;
if(("array"==u||"object"==u)&&"mix"!=s.type&&!checkForRtDesc(o,n))return!1;
}
}
return!0;
},checkForRtDesc=function(r,e){
return isArray(e)?checkForArrayRtDesc(r,e):"object"==typeof e?checkForObjectRtDesc(r,e):"string"==typeof e?checkForStringRtDesc(r,e):!1;
},check=function(json,rtDescs){
if("string"==typeof json)try{
json=eval("("+json+")");
}catch(e){
return log("parse json error"),!1;
}
if("object"!=typeof json)return log("must be object"),!1;
isArray(rtDesc)||(rtDescs=[rtDescs]);
for(var rtDesc,i=0;rtDesc=rtDescs[i++];)if(checkForRtDesc(json,rtDesc))return!0;
return!1;
};
return{
check:function(r,e){
logList=[];
try{
var t=check(r,e);
return t||printLog(),t;
}catch(o){
return logList.push("[rtException]"+o.toString()),printLog(),!1;
}
},
getMsg:function(){
return logList.join(";");
}
};
});
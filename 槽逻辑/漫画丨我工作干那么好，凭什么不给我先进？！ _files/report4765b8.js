define("biz_common/utils/wxgspeedsdk.js",[],function(){
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
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+d.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function n(){
return window.__second_open__?!0:-1!=p.indexOf("&_newvideoplayer=0")?!1:-1!=p.indexOf("&_newvideoplayer=1")?!0:1!=d.is_login?!1:d.use_tx_video_player?!1:c.canSupportVideo&&m.inWechat?m.is_ios||m.is_android?!0:!1:(d._hasReportCanSupportVideo||c.canSupportVideo||!m.inWechat||(d._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function s(){
console.log("isUseAd: "+x.isInMiniProgram);
{
var e=p,i=window.location.href;
d.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=d.sn&&"f62e1cb98630008303667f77c17c43d7"!=d.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=d.sn?x.isInMiniProgram?!1:-1!=e.indexOf("&_videoad=1")?!0:-1===e.indexOf("mp.weixin.qq.com/s")&&-1===e.indexOf("mp.weixin.qq.com/mp/appmsg/show")&&-1===e.indexOf("mp.weixin.qq.com/mp/authreadtemplate")?!1:"54"==d.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:d.__appmsgCgiData&&d.__appmsgCgiData.can_use_page&&(m.is_ios||m.is_android)?!0:u.showAd()?!0:!1:!1;
}
function o(){
var e=p,i=t(),n=(new Date).getHours(),s=!1;
return d.user_uin?-1!=e.indexOf("&_proxy=0")?!1:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:n>=9&&14>=n?!1:(-1!=e.indexOf("&_proxy=1")&&(s=!0),
m.inWechat&&m.is_android&&m.is_x5&&m.wechatVer>="6.2.2"&&(s=!0),m.inWechat&&m.is_android&&m.is_xweb&&m.xweb_version>=16&&(s=!0),
m.inWechat&&m.is_ios&&(-1!=f.indexOf("MicroMessenger/6.2.4")||m.wechatVer>="6.2.4")&&(s=!0),
s&&i&&i.isUseProxy?!0:!1):!1;
}
function r(){
return l.networkType;
}
function t(){
var e={
isUseProxy:0,
isUsePreload:0,
experSet:0
},i=!1;
if(parseInt(window.user_uin)==parseInt(2930301160)?(e.experSet=1,i=!0):parseInt(window.user_uin)==parseInt(3190019565)?(e.experSet=2,
i=!0):parseInt(window.user_uin)==parseInt(3193024205)||parseInt(window.user_uin)==parseInt(2092846410)?(e.experSet=3,
i=!0):(parseInt(window.user_uin)==parseInt(3194023964)||parseInt(window.user_uin)==parseInt(3193170635)||2756892560==parseInt(window.user_uin)||3193060470==parseInt(window.user_uin)||3495278585==parseInt(window.user_uin))&&(e.experSet=4,
i=!0),i||(e.experSet=window.user_uin&&window.user_uin%100<=4?window.user_uin%4+1:3),
e)switch(e.experSet){
case 1:
e.isUseProxy=0,e.isUsePreload=0;
break;

case 2:
e.isUseProxy=0,e.isUsePreload=1;
break;

case 3:
e.isUseProxy=1,e.isUsePreload=0;
break;

case 4:
e.isUseProxy=1,e.isUsePreload=1;
break;

default:
e=!1;
}
return 10>v&&a(h,!1),h||(e.isUseProxy=0),y||(e.isUsePreload=0),0==e.isUseProxy&&0==e.isUsePreload?e.experSet=1:0==e.isUseProxy&&1==e.isUsePreload?e.experSet=2:1==e.isUseProxy&&0==e.isUsePreload?e.experSet=3:1==e.isUseProxy&&1==e.isUsePreload&&(e.experSet=4),
console.log("[视频代理实验]",e),e;
}
function a(e,i){
h=e,y=i;
}
var d,p,w=e("biz_common/dom/event.js"),_=e("biz_wap/jsapi/core.js"),c=e("biz_wap/utils/device.js"),u=e("new_video/ctl.js"),x=e("biz_wap/utils/mmversion.js"),f=window.navigator.userAgent,l={
networkType:""
},m={},h=!0,y=!0,g=function(){
var e=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
return e&&e[1]&&parseInt(e[1].split("_")[0],10);
},v=g();
if(parent==window)d=window,p=window.location.href;else try{
p=parent.window.location.href,d=parent.window;
}catch(P){
p=window.location.href,d=window;
}
return function(e){
var i=c.os;
m.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),m.is_android=!!i.android,m.is_wp=!!i.phone,
m.is_pc=!(i.phone||!i.Mac&&!i.windows),m.inWechat=/MicroMessenger/.test(e),m.inWindowWechat=/WindowsWechat/i.test(e),
m.inMacWechat=/wechat.*mac os/i.test(e),m.is_android_phone=m.is_android&&/Mobile/i.test(e),
m.is_android_tablet=m.is_android&&!/Mobile/i.test(e),m.ipad=/iPad/i.test(e),m.iphone=!m.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
m.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var n,s=/XWEB\/([\d\.]+)/i,o=e.match(s);
o&&o[1]&&(n=parseInt(o[1])),m.is_xweb=!!o,m.xweb_version=n;
var r=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
m.wechatVer=r&&r[1]||0,w.on(window,"load",function(){
if(""==l.networkType&&m.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
_.invoke("getNetworkType",{},function(i){
l.networkType=e[i.err_msg]||"fail",("network_type:edge"==i.err_msg||"network_type:wwan"==i.err_msg)&&(i.detailtype&&"4g"==i.detailtype||i.subtype&&"4g"==i.subtype)&&(l.networkType="4g");
});
}
},!1);
}(window.navigator.userAgent),"undefined"==typeof d._hasReportCanSupportVideo&&(d._hasReportCanSupportVideo=!1),
{
device:m,
isShowMpVideo:n,
isUseProxy:o,
isUseAd:s,
getNetworkType:r,
proxyPreloadExper:t,
modifyExper:a
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
POS_AD_BEFORE_VIDEO:7,
POS_AD_AFTER_VIDEO:9
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
},A=18e4,T=["openUrlWithExtraWebview","openADCanvas","addContact","profile","getInstallState","installDownloadTask","addDownloadTask","pauseDownloadTask","resumeDownloadTask","queryDownloadTask","launchApplication","writeCommData","adDataReport","downloadAppInternal","wxdownload:progress_change","menu:share:appmessage","menu:share:timeline","menu:share:weibo","menu:share:facebook","menu:general:share","launch3rdApp","addDownloadTaskStraight","sendAppMessage","shareTimeline","getNetworkType","jumpToBizProfile","shareWeibo","shareFB","imagePreview","getBackgroundAudioState","openWeApp","preloadMiniProgramContacts","preloadMiniProgramEnv","calRqt","openCardDetail","batchAddCard","handleMPPageAction","makePhoneCall"],D=["/mp/advertisement_report","/mp/ad_report","/mp/ad_video_report","/mp/jsmonitor","/mp/ad_complaint","/mp/jsreport","/tp/datacenter/report","/mp/getappmsgad"];
return{
AD_TYPE:_,
AD_POS:a,
AD_CACHE_TIME:A,
AD_DEST_TYPE:e,
AD_FRAME_DOMAIN:"https://wxa.wxs.qq.com",
INVALID_METHOD_NAME_MSG_PREFIX:"Invalid methodName",
INVALID_METHOD_TYPE_MSG_PREFIX:"Invalid methodType",
INVALID_ARGS_MSG_PREFIX:"Invalid args",
INVALID_REQ_PATH_MSG_PREFIX:"Invalid request path",
AD_IFRAME_HIDE_CLASS:"iframe_ad_dn",
AD_JSAPI_WHITE_LIST:T,
AD_REQ_PATH_WHITE_LIST:D,
ORIGIN_VIDEO_VID_PREFIX:"wxv",
AD_VIDEO_END_ACTION:"adVideoEnd",
AD_VIDEO_PLAY_ACTION:"onVideoPlayV2",
AD_PLAY_VIDEO_ACTION:"playVideoV2",
GET_APPMSGAD_READY_STATUS_ACTION:"getAppmsgadReadyStatus",
APPMSGAD_READY_ACTION:"appmsgadReady",
HAS_AD_DATA_QUERY_KEY:"has_ad_data",
GET_AD_DATA_AFTER_VIDEO_ACTION_NAME:"getAdDataAfterVideo",
SET_PAGE_DATA_ACTION_NAME:"setPageDataV2",
SEND_AD_VID_ACTION:"sendAdVid",
GET_AD_VID_ACTION:"getAdVid"
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("a/a_utils.js",["biz_wap/jsapi/core.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_common/utils/url/parse.js","biz_wap/utils/openUrl.js","biz_wap/utils/wapsdk.js","common/utils.js"],function(e){
"use strict";
function t(e,t){
l("/mp/ad_report?action=follow&type="+e+t);
}
function n(e,t){
w.jsmonitor({
id:115849,
key:e,
value:t
});
}
function i(e){
w.jsmonitor({
id:28307,
key:e
});
}
function r(e){
if(!e)return"";
var t=document.createElement("a");
return t.href=e,t.hostname;
}
function o(e){
for(var t=[],n=0;n<e.length;++n){
var i=e[n],r="undefined"==typeof i?"undefined":_typeof(i);
i="string"===r?i.htmlDecode():i,"object"===r&&(i="[object Array]"===Object.prototype.toString.call(i)?o(i):a(i)),
t.push(i);
}
return t;
}
function a(e){
var t={};
for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){
var i=e[n],r="undefined"==typeof i?"undefined":_typeof(i);
i="string"===r?i.htmlDecode():i,"object"===r&&(i="[object Array]"===Object.prototype.toString.call(i)?o(i):a(i)),
t[n]=i;
}
return t;
}
function s(e,t){
var n=0;
m.isIOS?n=1:m.isAndroid&&(n=2);
var i={
creative_load_fail:[{
ts:parseInt(+new Date/1e3,10),
aid:parseInt(e.info.aid,10),
img_url:encodeURIComponent(t),
network_type:window.networkType,
errmsg:"",
os_type:n,
client_version:parseInt(window.clientversion,10),
traceid:e.info.traceid
}]
};
i=JSON.stringify(i),u({
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
return f.join(e,n,!0);
}
function c(e,t,n,i){
try{
e.postMessage(JSON.stringify({
action:t,
value:n
}),i||"*");
}catch(r){
console.log("postMessage error",r);
}
}
var p=e("biz_wap/jsapi/core.js"),u=e("biz_wap/utils/ajax.js"),m=e("biz_wap/utils/mmversion.js"),l=e("biz_common/utils/report.js"),_=e("biz_common/dom/class.js"),f=e("biz_common/utils/url/parse.js"),g=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,w=e("biz_wap/utils/wapsdk.js"),y=e("common/utils.js"),v="pos_",b=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],j=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],h={
report:t,
report115849:n,
saveCopy:a,
joinSignParam:d,
postMessage:c,
checkShowCpc:function(e,t,n,i){
if(t)return!0;
if(!e)return!1;
var r=y.getInnerHeight(),o=r/2,a=e.offsetTop,s=n.offsetHeight,d=void 0;
if(o>a?d=1:r>a&&(d=2),d&&i){
var c=JSON.stringify({
biz_middle_not_exp:[{
scene:d,
traceid:i.traceid,
aid:+i.aid,
appmsg_id:+window.appmsgid,
item_idx:+window.idx
}]
});
u({
url:"/mp/advertisement_report?action=extra_report&extra_data="+c+"&__biz="+window.biz,
timeout:2e3
});
}
return o>a||o>s-a?!1:!0;
},
openWebAppStore:function(e,t){
return y.getIosMainVersion()>=12?void p.invoke("launchApplication",{
schemeUrl:e
},function(){}):void p.invoke("downloadAppInternal",{
appUrl:e
},function(n){
n.err_msg&&-1!==n.err_msg.indexOf("ok")||g("/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+t);
});
},
adOptReport:function(e,t,n,i){
var r=f.join("/mp/ad_complaint",{
action:"report",
type:e,
pos_type:t,
trace_id:n,
aid:i,
__biz:window.biz,
r:Math.random()
},!0);
l(r);
},
checkAdImg:function(e){
if(e){
var t=e.image_url||"",n=r(t);
n&&-1===j.indexOf(n)&&i(58);
}
},
formName:function(e){
for(var t=-1,n=0,i=b.length;i>n;++n){
var r=b[n],o=e.indexOf(r);
-1!==o&&(-1===t||t>o)&&(t=o);
}
return-1!==t&&(e=e.substring(0,t)),e;
},
formSize:function(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
},
debounce:function(e,t,n){
var i=void 0;
return function(){
var r=this,o=arguments,a=function(){
i=null,n||e.apply(r,o);
},s=n&&!i;
i||(i=setTimeout(a,t),s&&e.apply(r,o));
};
},
isItunesLink:function(e){
return/^https?:\/\/(itunes|apps)\.apple\.com\//.test(e);
},
extend:function(e,t){
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
return e;
},
getPosKeyDesc:function(e,t){
var n=t?e+"_"+t:e;
return v+n;
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
0!==Number(n.ret)?(g(e.url),t(135,e.report_param)):t(134,e.report_param);
});
},
setBackgroundClass:function(){
window._has_comment||0!==window.adDatas.realNum||window._share_redirect_url||window.is_temp_url?_.removeClass(document.body,"rich_media_empty_extra"):_.addClass(document.body,"rich_media_empty_extra");
},
lazyLoadAdImg:function(e){
for(var t=document.getElementsByClassName("js_alazy_img"),n=function(n){
var r=t[n];
r.onload=function(){
i(54),r.src.indexOf("retry")>-1&&i(69);
},r.onerror=function(){
-1===r.src.indexOf("retry")?r.src=f.addParam(r.src,"retry",1):!function(){
i(98);
var t="other";
m.isIOS?t="iphone":m.isAndroid&&(t="android"),setTimeout(function(){
var n=window.networkType||"unknow",i=f.join("/tp/datacenter/report",{
cmd:"report",
id:900023,
uin:777,
os:t,
aid:e.aid,
image_url:encodeURIComponent(r.src),
type:e.type,
network:n
},!0);
u({
url:i,
async:!0
});
},500),s(e,r.src);
}(),i(57);
},r.src=r.dataset.src;
},r=0;r<t.length;r++)n(r);
},
reportUrlLength:function(e,t,i,r,o,a,s){
var c=d(s,{
adSignData:e,
adSignK1:t,
adSignK2:i,
signMd5:r,
viewidKeyObj:o
});
if(c.length>=4e3){
n(13);
var p=JSON.stringify({
biz_log_report:[{
pos_type:+a.pos_type,
traceid:a.tid,
aid:+a.aid,
log_type:1,
ext_info:"[url length:"+c.length+"]"+s.substring(0,2e3)
}]
});
u({
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
return"5"===window.item_show_type&&"ad"===f.getQuery("render_type");
},
listenMessage:function(e,t,n){
arguments.length<3&&(n=t,t=null),e.addEventListener("message",function(e){
var i=void 0;
if(!t||e.origin===t){
if("object"!==_typeof(e.data))try{
i=JSON.parse(e.data);
}catch(r){
return;
}else i=e.data;
"function"==typeof n&&n(e,i);
}
});
},
isUseAppMsgAd:function(){
var e=[350064395,3194181833,3191183081,3191008240,459315e3,2547206501,17516575,3194183798,3193008987,3191008237,3190008366,1314021127,3190008373,3192140177,3193183025,3191138746,3192008231,3191138747,3191138743,3193183023,3193183029,3192138635,3190138969,3192138631,3194182870,3192138630,3194182869,3192138629,3192138628,3193183024,3191138744,3192138627,3194182868,3193183031,3192138634,3190138972,3191138745,3192138633,3193183030,3190138971,3193183028,3193183027,3193183026,3190138970,3192138632,3192184240,3194248804,388382775],t=67;
return e.indexOf(window.user_uin)>-1?!0:window.user_uin&&window.user_uin/100%1e3<10*t?!0:!1;
},
broadcastFrame:function(e,t,n,i){
e=e||[];
for(var r=0;r<e.length;r++){
var o=e[r].src||e[r].getAttribute("data-realsrc");
(!i||i&&o.indexOf(i)>-1)&&c(e[r].contentWindow,t,n);
}
}
};
return h;
});function _defineProperty(e,t,a){
return t in e?Object.defineProperty(e,t,{
value:a,
enumerable:!0,
configurable:!0,
writable:!0
}):e[t]=a,e;
}
define("a/a.js",["biz_wap/utils/mmversion.js","biz_wap/utils/device.js","a/a_sign.js","biz_wap/utils/openUrl.js","biz_common/utils/get_para_list.js","biz_wap/utils/show_time.js","biz_common/utils/url/parse.js","biz_common/dom/event.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","a/tpl/crt_tpl_manager.js","a/a_config.js","a/video.js","a/a_utils.js","common/utils.js","biz_common/dom/offset.js","a/appdialog_confirm.js","biz_common/utils/monitor.js","appmsg/cdn_img_lib.js","a/tpl/cpc_tpl.html.js","a/sponsor.js","a/app_card.js","a/profile.js","a/android.js","a/ios.js"],function(require,exports,module,alert){
"use strict";
function processAdEleByPos(e){
var t;
e===AD_POS.POS_MID&&(t=document.getElementsByTagName("mpcpc")),adElCountMapByPos[e]=t.length;
for(var a=0;a<t.length;a++)el_gdt_areas[utils.getPosKeyDesc(e,a)]=t[a],ping_cpm_apurl[utils.getPosKeyDesc(e,a)]={};
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
function insertAutoAdElement(e,t,a,i){
if(e.pos_type===AD_POS.POS_MID&&!adElCountMapByPos[AD_POS.POS_MID]){
paragraphList||(paragraphList=getParaList(contentWrp,e.position_index>=getParaList.paragraphStartIdx));
var o=void 0!==e.position_index;
e.position_index=e.position_index>=getParaList.paragraphStartIdx?e.position_index-getParaList.paragraphStartIdx:e.position_index,
o=o&&e.position_index>=0&&e.position_index<paragraphList.length;
var n=i?(a+1)/(i+1)*paragraphList.length:paragraphList.length/2,_=o?e.position_index:Math.floor(n)-1;
_=0>_?0:_;
var p=document.createElement("mpcpc");
el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID)]=p,commonUtils.insertAfter(p,paragraphList[_]),
t&&utils.report115849(2);
}
}
function getExpParaVal(e,t){
if(e&&e.flow_exp_info){
var a=e.flow_exp_info||"";
try{
a=JSON.parse(a.replace(/&quot;/g,'"'));
}catch(i){
return;
}
if(a.length)for(var o=0;o<a.length;o++)if(a[o].exp_para&&a[o].exp_para.length)for(var n=0;n<a[o].exp_para.length;n++)if(a[o].exp_para[n].name===t)return a[o].exp_para[n].value;
}
}
function isUseFrame(){
var e=getExpParaVal.apply(null,arguments);
return"1"===e?!0:void 0;
}
function separateAdData(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=0,a=[],i=[],o=["904"];
for(var n in e){
var _=e[n],p=isUseFrame(_,"widget_gray_biz_intext_iframe")&&_.pos_type===AD_POS.POS_MID,r=isUseFrame(_,"widget_gray_biz_bottom_iframe");
r=r&&_.pos_type===AD_POS.POS_BOTTOM,r=r&&!isVideoSharePageOnlyAd&&"5"!==window.item_show_type,
r=r&&CrtManager.CRT_CONF[_.crt_size],r=r||o.indexOf(_.crt_size)>-1,p&&t++,p||utils.isUseAppMsgAd()&&_.pos_type===AD_POS.POS_AD_BEFORE_VIDEO||r||_.pos_type===AD_POS.POS_AD_AFTER_VIDEO?i.push(_):a.push(_);
}
return{
oldAdInfos:a,
newAdInfos:i,
midAdDataCount:t
};
}
function createAdFrame(e,t){
if(e){
console.log("广告 "+t.aid+"使用了新的iframe组件渲染模式");
var a=document.createElement("iframe"),i=getExpParaVal(t,"widget_gray_iframe_path"),o=i?i+"/":"",n=AD_CONFIG.AD_FRAME_DOMAIN+"/tmpl/"+o+"base_tmpl.html";
a.src=n,a.className="iframe_ad_container",a.scrolling="no",a.createIframeTime=Date.now(),
e.appendChild(a),mmversion.isIOS&&(a.style.width="1px",a.style.minWidth="100%"),
!i&&utils.report115849(85);
var _=new Image;
_.onerror=function(){
utils.report115849(86);
},_.onload=function(){
utils.report115849(87);
},_.src="https://wxa.wxs.qq.com/images/icon/icon_video_go.png";
try{
localStorage.setItem("__WXLS_ad_iframe_url",n);
}catch(p){}
return a;
}
}
function postMessageToAdFrame(e,t,a){
utils.postMessage(e,t,a,AD_CONFIG.AD_FRAME_DOMAIN);
}
function invalidMsg(e,t){
return e+" | "+t;
}
function isVideoFrameHasVid(e,t){
var a=e.getAttribute("data-src"),i=e.src||a;
return/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(a)||/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/.test(a)?i&&i.indexOf("vid="+t)>-1:!1;
}
function proxyCallback(e,t,a){
postMessageToAdFrame(e,"proxyCallbackV2",{
proxyId:t.proxyId,
aid:t.aid,
proxyData:a
});
}
function androidAppDialogConfirm(e,t){
var a=t.proxyData||{};
appDialogConfirm({
app_name:a.args.app_name,
app_img_url:a.args.icon_url,
onOk:function(){
proxyCallback(e,t,{
err_msg:"appDialogConfirm:yes"
});
},
onCancel:function(){
proxyCallback(e,t,{
err_msg:"appDialogConfirm:cancel"
});
}
});
}
function AdFrame(){
this.aInfoMap={},this.iframes=document.getElementsByTagName("iframe");
}
function getClickEventPageOffset(e){
var t=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
return{
x:e.pageX?e.pageX:e.clientX,
y:e.pageY?e.pageY:e.clientY+t
};
}
function processAdAvatar(e){
var t=e.product_type;
return(t===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&e.app_info&&e.app_info.icon_url?(e.avatar=e.app_info.icon_url,
void(e.avatarTitle=e.app_info.appname)):t===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&e.game_info&&e.game_info.head_img?(e.avatar=e.game_info.head_img,
void(e.avatarTitle=e.game_info.nick_name)):void((e.pos_type===AD_POS.POS_MID&&(t===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE||t===AD_TYPE.BRAND_GDT_PRODUCT_TYPE||t===AD_TYPE.BRAND_WECHAT_PRODUCT_TYPE)||e.pos_type!==AD_POS.POS_MID)&&e.biz_info&&e.biz_info.head_img&&(e.avatar=e.biz_info.head_img,
e.avatarTitle=e.biz_info.nick_name));
}
function handleVideoSharePage(e){
e=e||document.body.offsetHeight,JSAPI.invoke("configMpAdAttrs",{
viewHeight:e
},function(t){
console.log("debug for configMpAdAttrs height: ",e,", response:",t);
});
}
function setBottomSize(e){
if(e.material_height&&e.material_width){
var t=js_bottom_ad_area.getElementsByClassName("js_mpad_smallbanner_info_banner"),a=js_bottom_ad_area.getElementsByClassName("js_mpad_banner_img"),i=e.material_height/e.material_width;
t.length&&(t[0].style.minHeight=t[0].offsetWidth*i+"px"),a.length&&(a[0].style.minHeight=a[0].offsetWidth*i+"px");
}
}
function afterGetAdData(e,t){
function a(e){
var t=e;
if(t.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&(t.is_wx_app=!0),
e.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||e.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var a=t.app_info.app_size||0,i=t.app_info.app_name||t.app_info.appname||"",o=t.app_info.apk_url||t.app_info.pkgurl||"",n=t.app_info.file_md5||t.app_info.pkgmd5||t.app_info.app_md5||"",_=t.app_info.apk_name||t.app_info.pkg_name||"";
a=utils.formSize(a),i=utils.formName(i),t.app_info.app_size=a,t.app_info.app_name=i,
t.app_info.apk_name=_,t.app_info.appname=t.app_info.app_name,t.app_info.app_rating=t.app_info.app_rating||0,
t.app_info.app_id=t.app_info.app_id,t.app_info.icon_url=t.app_info.icon_url,t.app_info.channel_id=t.app_info.channel_id,
t.app_info.md5sum=t.app_info.app_md5,t.app_info.rl=t.rl,t.app_info.pkgname=_,t.app_info.url_scheme=t.app_info.url_scheme,
t.app_info.androiddownurl=o,t.app_info.versioncode=t.app_info.version_code,t.app_info.appinfo_url=t.app_info.appinfo_url,
t.app_info.traceid=t.traceid,t.app_info.pt=t.pt,t.app_info.url=t.url,t.app_info.ticket=t.ticket,
t.app_info.type=t.type,t.app_info.adid=t.aid,t.app_info.file_md5=n;
var p=utils.extend({
appname:t.app_info.app_name,
app_rating:t.app_info.app_rating||0,
app_id:t.app_info.app_id,
icon_url:t.app_info.icon_url,
channel_id:t.app_info.channel_id,
md5sum:t.app_info.app_md5,
rl:t.rl,
pkgname:_,
url_scheme:t.app_info.url_scheme,
androiddownurl:o,
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
file_md5:n
},t);
return p;
}
if(e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
for(var r=t.exp_info.exp_value||[],d=!1,s=0,l=0;l<r.length;++l){
var c=r[l]||{};
if(1==c.exp_type&&(s=c.comm_attention_num,d=s>0),2==c.exp_type){
d=!1,s=0;
break;
}
}
t.biz_info.show_comm_attention_num=d,t.biz_info.comm_attention_num=s;
var p=utils.extend({
usename:t.biz_info.user_name,
pt:t.pt,
url:t.url,
traceid:t.traceid,
adid:t.aid,
ticket:t.ticket,
is_appmsg:!0
},t);
return p;
}
return e;
}
function i(e){
var t,a=e;
if(e.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||e.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var i=a.app_info.app_size||0,o=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",_=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",p=a.app_info.apk_name||a.app_info.pkg_name||"",r=a.app_info.category,d=["万","百万","亿"],s=a.app_info.down_count||0;
if(s>=1e4){
s/=1e4;
for(var l=0;s>=10&&2>l;)s/=100,l++;
s=s.toFixed(1)+d[l]+"次";
}else s=s.toFixed(1)+"次";
return r=r?r[0]||"其他":"其他",i=utils.formSize(i),o=utils.formName(o),a.app_info._down_count=s,
a.app_info._category=r,a.app_info.app_size=i,a.app_info.app_name=o,a.app_info.apk_name=p,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=p,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=_,t=utils.extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:p,
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
}
if(e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
for(var c=a.exp_info.exp_value||[],m=!1,u=0,f=0;f<c.length;++f){
var g=c[f]||{};
if(1==g.exp_type&&(u=g.comm_attention_num,m=u>0),2==g.exp_type){
m=!1,u=0;
break;
}
}
return a.biz_info.show_comm_attention_num=m,a.biz_info.comm_attention_num=u,t=utils.extend({
usename:a.biz_info.user_name,
pt:a.pt,
url:a.url,
traceid:a.traceid,
adid:a.aid,
ticket:a.ticket,
is_appmsg:!0
},a);
}
if(e.product_type==AD_TYPE.CARD_PRODUCT_TYPE||e.product_type==AD_TYPE.COUPON_PRODUCT_TYPE){
var A=a.card_info.card_id||"",y=a.card_info.card_ext||"";
y=y.htmlDecode();
try{
y=JSON.parse(y),y.outer_str=a.card_info.card_outer_id||"",y=JSON.stringify(y);
}catch(D){
y="{}";
}
return t=utils.extend({
card_id:A,
card_ext:y,
pt:h,
ticket:a.ticket||"",
url:a.url,
rl:a.rl,
tid:a.traceid,
traceid:a.traceid,
type:a.type,
adid:a.aid,
is_appmsg:!0
},a);
}
if(e.product_type==AD_TYPE.SHOP_PRODUCT_TYPE){
if(a.mp_shop_info){
var v=a.mp_shop_info.pid||"",P=a.mp_shop_info.outer_id||"";
t=utils.extend({
pid:v,
outer_id:P,
pt:h,
url:a.url,
rl:a.rl,
tid:a.traceid,
traceid:a.traceid,
type:a.type,
adid:a.aid,
is_appmsg:!0
},a);
}else t=a;
return t;
}
return e;
}
isVideoSharePageOnlyAd&&urlParser.getQuery("adWidth")&&(document.documentElement.style.width=urlParser.getQuery("adWidth")+"px");
var o={},n={},_=e.is_need_ad,p=e._adInfo;
if(0==_)n=p,n||(n={
advertisement_num:0
});else{
if(t.advertisement_num>0&&t.advertisement_info){
var r=t.advertisement_info;
n.advertisement_info=utils.saveCopy(r);
}
if(n.advertisement_num=t.advertisement_num,window._adRenderData=n,n){
var d=utils.saveCopy(n),s=d.advertisement_info;
if(s)for(var l in s)(s[l].pos_type===AD_POS.POS_AD_BEFORE_VIDEO||s[l].pos_type===AD_POS.POS_AD_AFTER_VIDEO)&&(delete s[l],
d.advertisement_num--);
adLS.set(lsKey,{
info:JSON.stringify(d),
time:Date.now()
},+new Date+24e4);
}
}
n=n||{
advertisement_num:0
};
var c=!1,m=separateAdData(n.advertisement_info),u=m.oldAdInfos,f=u.length;
if((new AdFrame).handleAdWithFrame(m.newAdInfos,m.midAdDataCount),!n.flag&&n.advertisement_num>0){
var g=n.advertisement_num,A=n.advertisement_info;
window.adDatas.realNum=g,A=u,g=f,window.adDatas.num=g;
for(var y=0;g>y;++y){
var D,v=null,P=A[y];
P.exp_info=P.exp_info||{},P.is_cpm=P.is_cpm||0,P.biz_info=P.biz_info||{},P.app_info=P.app_info||{},
P.pos_type=P.pos_type||0,P.logo=P.logo||"",P.use_new_protocol=P.use_new_protocol||0;
var h=P.pt,T=P.pos_type,w=P.product_type;
if(2==P.use_new_protocol&&P.pos_type==AD_POS.POS_BOTTOM){
var E=JSON.stringify({
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
url:"/mp/advertisement_report?action=extra_report&extra_data="+E+"&__biz="+biz,
timeout:2e3
}));
}
if(urlParser.getQuery("oldAd")&&(P.use_new_protocol=0),D=P.use_new_protocol,o[T]||(o[T]=0),
o[T]++,D)1==D?T===AD_POS.POS_MID?(c=!0,P=a(P),v=P):0===T?(P=i(P),(w===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||w===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(v=P)):3===T&&(v=P):2==D&&(T===AD_POS.POS_MID?(c=!0,
P=a(P)):0==T&&(P=i(P)),v=P);else if(100===h||115===h){
for(var O=P.exp_info.exp_value||[],b=!1,I=0,x=0;x<O.length;++x){
var S=O[x]||{};
if(1==S.exp_type&&(I=S.comm_attention_num,b=I>0),2==S.exp_type){
b=!1,I=0;
break;
}
}
P.biz_info.show_comm_attention_num=b,P.biz_info.comm_attention_num=I,v={
usename:P.biz_info.user_name,
pt:h,
url:P.url,
traceid:P.traceid,
adid:P.aid,
ticket:P.ticket,
is_appmsg:!0
};
}else if(102===h)v={
appname:P.app_info.app_name,
versioncode:P.app_info.version_code,
pkgname:P.app_info.apk_name,
androiddownurl:P.app_info.apk_url,
md5sum:P.app_info.app_md5,
signature:P.app_info.version_code,
rl:P.rl,
traceid:P.traceid,
pt:h,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0
};else if(101===h)v={
appname:P.app_info.app_name,
app_id:P.app_info.app_id,
icon_url:P.app_info.icon_url,
appinfo_url:P.app_info.appinfo_url,
rl:P.rl,
traceid:P.traceid,
pt:h,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0
};else if(103===h||104===h||2===h&&P.app_info){
var C=P.app_info.down_count||0,j=P.app_info.app_size||0,k=P.app_info.app_name||"",N=P.app_info.category,M=["万","百万","亿"];
if(C>=1e4){
C/=1e4;
for(var Y=0;C>=10&&2>Y;)C/=100,Y++;
C=C.toFixed(1)+M[Y]+"次";
}else C=C.toFixed(1)+"次";
j=utils.formSize(j),N=N?N[0]||"其他":"其他",k=utils.formName(k),P.app_info._down_count=C,
P.app_info._app_size=j,P.app_info._category=N,P.app_info.app_name=k,v={
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
pt:h,
url:P.url,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0,
app_info:P.app_info
};
}else if(105===h){
var R=P.card_info.card_id||"",F=P.card_info.card_ext||"";
F=F.htmlDecode();
try{
F=JSON.parse(F),F.outer_str=P.card_info.card_outer_id||"",F=JSON.stringify(F);
}catch(z){
F="{}";
}
v={
card_id:R,
card_ext:F,
pt:h,
ticket:P.ticket||"",
url:P.url,
rl:P.rl,
tid:P.traceid,
traceid:P.traceid,
type:P.type,
adid:P.aid,
is_appmsg:!0
};
}else if(106===h){
var U=P.mp_shop_info.pid||"",W=P.mp_shop_info.outer_id||"";
v={
pid:U,
outer_id:W,
pt:h,
url:P.url,
rl:P.rl,
tid:P.traceid,
traceid:P.traceid,
type:P.type,
adid:P.aid,
is_appmsg:!0
};
}else if(108===h||109===h||110===h||116===h||117===h)v={
pt:h,
ticket:P.ticket||"",
url:P.url,
traceid:P.traceid,
adid:P.aid,
is_appmsg:!0
},P.video_info&&(v.displayWidth=P.video_info.displayWidth,v.displayHeight=P.video_info.displayHeight,
v.thumbUrl=P.video_info.thumbUrl,v.videoUrl=P.video_info.videoUrl,v.rl=P.rl),P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P);else if(111===h||113===h||114===h||112===h||121===h||122===h){
var j=P.app_info.app_size||0,k=P.app_info.app_name||"";
j=utils.formSize(j),k=utils.formName(k),P.app_info.app_size=j,P.app_info.app_name=k,
v={
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
pt:h,
url:P.url,
ticket:P.ticket,
type:P.type,
adid:P.aid,
source:source||"",
is_appmsg:!0,
app_info:P.app_info
};
}else if(118===h)v=P,c=!0,Wxopen_card.startConnect(P);else if(119===h||120===h)v=P,
Wxopen_card.startConnect(P);else if(125===h)v=P,P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P);else if(140===h){
v=P;
try{
v.shopImage=v.shop_image[0],v.shopImage.mp_tags=v.shopImage.mp_tags||[];
}catch(q){
v.shopImage={};
}
}
var V=P.image_url;
require("appmsg/cdn_img_lib.js"),V&&V.isCDN()&&(V=V.replace(/\/0$/,"/640"),V=V.replace(/\/0\?/,"/640?"),
P.image_url=urlParser.addParam(V,"wxfrom","50",!0)),adDatas.ads[utils.getPosKeyDesc(T,o[T]-1)]={
a_info:P,
adData:v
},localStorage&&localStorage.setItem&&P.app_info&&P.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+P.traceid,P.app_info.url_scheme),
P.has_installed=!1,P.app_info&&!function(e){
JSAPI.invoke("getInstallState",{
packageName:e.app_info.apk_name
},function(t){
var a=t.err_msg;
a.indexOf("get_install_state:yes")>-1&&(e.has_installed=!0);
});
}(P),0===T&&9===P.material_type&&(w===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&P.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&P.game_info&&(P.biz_info.head_img=P.game_info.head_img,
P.biz_info.nick_name=P.game_info.nick_name),w!==AD_TYPE.IOS_APP_PRODUCT_TYPE&&w!==AD_TYPE.ANDROID_APP_PRODUCT_TYPE||!P.app_info||(P.biz_info.head_img=P.app_info.icon_url,
P.biz_info.nick_name=P.app_info.app_name));
}
var B=function rt(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
if(js_sponsor_ad_area.offsetTop<e+commonUtils.getInnerHeight()){
var t=document.getElementById("js_ad_area");
t&&Class.addClass(t,"show"),DomEvent.off(window,"scroll",rt);
}
},H=adDatas.ads;
for(var L in H)if(0===L.indexOf("pos_")){
var v=H[L],P=!!v&&v.a_info,w=P.product_type;
if(v&&P){
if(insertAutoAdElement(P),2!==P.use_new_protocol){
if(0==P.pos_type){
if(P.new_appmsg=window.new_appmsg,P.longAppBtnText=w===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
P.shortAppBtnText=w===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看":"下载",js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,P),
111==P.pt||112==P.pt||113==P.pt||114==P.pt){
var G=document.getElementsByClassName("js_download_app_card")[0],K=G.offsetWidth,J=Math.floor(K/2.875);
J>0&&(G.style.height=J+"px");
}
}else if(3==P.pos_type){
var G=document.createElement("div");
G.appendChild(document.createTextNode(P.image_url)),P.image_url=G.innerHTML.replace(/&amp;/g,"&"),
P.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,P),
js_sponsor_ad_area.style.display="block";
var X=js_sponsor_ad_area.clientWidth;
108!=P.pt&&109!=P.pt&&110!=P.pt||2==P.use_new_protocol?116==P.pt||117==P.pt:document.getElementById("js_main_img").style.height=X/1.77+"px",
DomEvent.on(window,"scroll",B),B(0);
}else if(P.pos_type===AD_POS.POS_MID&&utils.checkShowCpc(el_gdt_areas[L],globalAdDebug,contentWrp,P)){
P=_parseExpCpc(P);
var Q=!1;
if(w===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||w===AD_TYPE.IOS_APP_PRODUCT_TYPE)js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,P),
Q=!0;else{
var Z=require("a/tpl/cpc_tpl.html.js"),$=P.exp_obj.sale_text;
(w===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE||w===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||w===AD_TYPE.IOS_APP_PRODUCT_TYPE||w===AD_TYPE.MINI_GAME_PRODUCT_TYPE)&&($=P.avatarTitle),
js_cpc_area.innerHTML=TMPL.tmpl(Z,{
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
title:$,
is_wx_app:P.is_wx_app,
btn_text:P.exp_obj.btn_text,
avatar:P.avatar,
isDownload:Q
});
}
}
mmversion.isIOS&&P.app_info&&P.app_info.url_scheme&&w===AD_TYPE.IOS_APP_PRODUCT_TYPE&&(document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+P.pos_type)&&(document.getElementById("js_ad_btn_"+P.pos_type).innerHTML="查看应用"));
}else{
var et,tt={},Q=!1,at={};
if(P.button_action)try{
"string"==typeof P.button_action&&(P.button_action=JSON.parse(P.button_action.html())),
P.button_action.button_text&&""!=P.button_action.button_text||(P.button_action.button_text="去逛逛");
}catch(z){
P.button_action={
button_text:"decode error"
};
}else P.button_action={
button_text:"something wrong"
};
et=P.crt_size,(w===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||w===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(Q=!0);
var $="",it="";
if(processAdAvatar(P),P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P),
P.pos_type===AD_POS.POS_MID)utils.checkShowCpc(el_gdt_areas[L],globalAdDebug,contentWrp,P)&&(P=_parseExpCpc(P),
(P.avatarTitle||P.exp_obj.sale_text)&&P.avatar&&($=P.avatarTitle||P.exp_obj.sale_text,
it=P.avatar),tt={
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
title:$,
is_wx_app:P.is_wx_app,
is_ios:mmversion.isIOS,
isDownload:Q,
btn_text:P.exp_obj.btn_text,
avatar:it
},Q&&(at.customUpdataFunc=function(e,t){
var a=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),o=e.querySelector(".js_download_inner");
a&&(a.style.width=t.percent+"%"),i.textContent=t.btn_text,o.textContent=t.btn_text;
}),ad_render_object[L]=new CrtManager.createCrtObject(et,tt,el_gdt_areas[L],at),
gdt_as[L]=el_gdt_areas[L].getElementsByClassName("js_ad_main_area"));else if(P.pos_type==AD_POS.POS_SPONSOR){
var G=document.createElement("div");
G.appendChild(document.createTextNode(P.image_url)),P.image_url=G.innerHTML.replace(/&amp;/g,"&"),
P.new_appmsg=window.new_appmsg;
var v={
pt:P.pt,
ticket:P.ticket||"",
url:P.url,
traceid:P.traceid,
adid:P.aid,
is_appmsg:!0
};
if(P.video_info&&(v.displayWidth=P.video_info.displayWidth,v.displayHeight=P.video_info.displayHeight,
v.thumbUrl=P.video_info.thumbUrl,v.videoUrl=P.video_info.videoUrl,v.rl=P.rl),tt={
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
isDownload:Q,
btn_text:P.button_action.button_text,
avatar:P.biz_info.head_img,
isApp:!1
},ad_render_object[L]=new CrtManager.createCrtObject(et,tt,js_sponsor_ad_area,at),
js_sponsor_ad_area.style.display="block",gdt_as["pos_"+P.pos_type]=js_sponsor_ad_area.getElementsByClassName("js_ad_main_area"),
!ad_render_object[L].getCrtData().has_banner){
var ot="&tid="+P.traceid+"&uin="+uin+"&key="+l+"&ticket="+(P.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+P.adid+"&ad_engine=0&pos_type="+P.pos_type+"&exp_id="+P.exp_info.exp_id+"&exp_value="+P.exp_info.exp_value+"&r="+Math.random();
P.report_param=ot;
}
var nt=require("a/sponsor.js");
new nt({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:v,
a_info:P,
pos_type:P.pos_type,
report_param:ot
}),DomEvent.on(window,"scroll",B),B(0);
}else if(P.pos_type==AD_POS.POS_BOTTOM){
var at={};
if(P.video_info&&(v.displayWidth=P.video_info.displayWidth,v.displayHeight=P.video_info.displayHeight,
v.thumbUrl=P.video_info.thumbUrl,v.videoUrl=P.video_info.videoUrl,v.rl=P.rl),Q&&(at.customUpdataFunc=function(e,t){
var a=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),o=e.querySelector(".js_download_inner");
a&&(a.style.width=t.percent+"%"),i.textContent=t.btn_text,o.textContent=t.btn_text;
},at.afterRenderFunc=function(e,t){
JSAPI.invoke("getInstallState",{
packageName:P.app_info.apk_name
},function(a){
var i=a.err_msg,o=e.querySelector(".js_watermark_text");
i.indexOf("get_install_state:yes")>-1&&P.app_info.url_scheme&&(o.textContent=354==parseInt(t.crt_size)||117==parseInt(t.crt_size)||355==parseInt(t.crt_size)||568==parseInt(t.crt_size)?"进入":"进入应用");
});
}),P.avatarTitle&&P.avatar&&($=P.avatarTitle||P.exp_obj.sale_text,it=P.avatar),tt=utils.extend({
banner:P.image_url,
is_wx_app:P.button_action.jump_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE,
btn_text:P.button_action.button_text,
avatar:P.avatar,
isApp:!1,
isDownload:Q,
title:$
},P),ad_render_object["pos_"+P.pos_type]=new CrtManager.createCrtObject(et,tt,js_bottom_ad_area,at),
!ad_render_object["pos_"+P.pos_type].getCrtData().has_banner){
var ot="&tid="+P.traceid+"&uin="+uin+"&key="+l+"&ticket="+(P.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+P.adid+"&ad_engine=0&pos_type="+pos_type+"&exp_id="+P.exp_info.exp_id+"&exp_value="+P.exp_info.exp_value+"&r="+Math.random();
P.report_param=ot;
var _t=ad_render_object["pos_"+P.pos_type].getWrapperElm().getElementsByClassName("js_video_container_new_protocol");
_t[0]&&(_t=_t[0],P.videoContainer=_t,videoAdMap[P.aid]=new VideoAd(P));
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
isVideoSharePageOnlyAd&&js_bottom_ad_area.offsetHeight&&handleVideoSharePage(),bindAdOperation();
}
if(is_temp_url&&adElCountMapByPos[AD_POS.POS_MID]&&!c)for(var pt=0;pt<adElCountMapByPos[AD_POS.POS_MID];pt++){
if(!utils.checkShowCpc(el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,pt)],globalAdDebug,contentWrp))return;
el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,pt)].innerHTML=TMPL.tmpl(cpc_a_tpl,{
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
var t=e.product_type,a={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(a.btn_text="查看详情"),29===t||31===t?a.btn_text="查看详情":t===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t===AD_TYPE.IOS_APP_PRODUCT_TYPE?a.btn_text=t===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用":30===t?a.btn_text="去逛逛":t===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?a.btn_text=e.biz_info.is_subscribed?"查看公众号":"关注公众号":t===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&(a.btn_text="进入小游戏"),
e.dest_type===AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE&&(a.btn_text="查看详情"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var i=e.cpc_exp_info.exp_content;
try{
for(var o=JSON.parse(i.replace(/&quot;/g,'"')),n=-1,_=0;_<o.aid_list.length;_++)o.aid_list[_].aid==e.aid&&(n=_);
n>-1&&(a.icon_pos=o.icon_pos||"",a.btn_text=o.btn_text||a.btn_text,a.price=o.aid_list[n].price,
a.sale_text=o.aid_list[n].sale_text,window.__addIdKeyReport("68064",15));
}catch(p){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=a,e;
}
function seeAds(){
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var scrollFn=function scrollFn(event,adOffsetWebviewTopFromApp,scrollViewHeight){
var scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
scrollViewHeight=scrollViewHeight||commonUtils.getInnerHeight();
for(var i in adDatas.ads)!function(pos_key){
var gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var aInfo=adDatas.ads[pos_key].a_info,gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,aid=gdt_a.dataset.aid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=aInfo.pos_type,offsetTop=offset.getOffset(el_gdt_areas[pos_key]).offsetTop,adHeight=el_gdt_areas[pos_key].offsetHeight,adOffsetTop=offsetTop+gdt_a.offsetTop,gh_id="",pt=aInfo.pt,adOffsetWebviewTop=adOffsetWebviewTopFromApp?adOffsetWebviewTopFromApp+gdt_a.offsetTop:offsetTop-scrollTop,intoView=scrollViewHeight>adOffsetWebviewTop&&adOffsetWebviewTop>-adHeight,signData={
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
function ad_click(e,t,a,i,o,n,_,p,r,d,s,l,c,m,u,f,g,A,y){
if(!has_click[o]){
has_click[o]=!0;
{
var D=document.getElementById("loading_"+o);
g.product_type;
}
D&&(D.style.display="inline");
var v=g.exp_info||{},P=v.exp_id||"",h=v.exp_value||[];
try{
h=JSON.stringify(h);
}catch(T){
h="[]";
}
var w="";
l&&l.weapp_info&&l.weapp_info.original_id&&(w=l.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:P,
exp_value:h,
url:encodeURIComponent(t),
tid:o,
aid:p,
rl:encodeURIComponent(a),
__biz:biz,
pos_type:d,
pt:r,
pos_x:c,
pos_y:m,
ad_w:u,
ad_h:f,
gh_id:w,
press_interval:window.__a_press_interval||-1
},function(){
if(has_click[o]=!1,D&&(D.style.display="none"),g.app_info){
var a=handleApp(t,o,idx,mid,biz,r,p,s,d,l,g,n,A);
if(a)return;
}
if(isCanvasAd(g))return void utils.openCanvasAd({
canvasId:g.canvas_info.canvas_id,
adInfoXml:g.canvas_info.ad_info_xml,
pos_type:d,
report_param:A,
url:t
});
if(y)if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.OUTER_DEST_TYPE)handleH5(t,o,idx,mid,biz,r,p,s,d,l,g);else if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE)Wxopen_card.openWxopen(l);else if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.AD_DEST_TYPE)openUrlWithExtraWebview(t);else{
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_SHOP_DEST_TYPE)return void openUrlWithExtraWebview(urlParser.join(t,{
outer_id:l.outer_id
}));
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.BIZ_DEST_TYPE&&g.product_type==AD_CONFIG.AD_TYPE.CARD_PRODUCT_TYPE)return void Card.openCardDetail(l.card_id,l.card_ext,l);
console.info("[广告新协议兜底跳转]",g),openUrlWithExtraWebview(t);
}else if("5"==e)openUrlWithExtraWebview("/mp/profile?source=from_ad&tousername="+t+"&ticket="+n+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+o);else{
if("105"==r&&l)return void Card.openCardDetail(l.card_id,l.card_ext,l);
if("106"==r&&l)return void openUrlWithExtraWebview(urlParser.join(t,{
outer_id:l.outer_id
}));
if("118"==r||"119"==r||"120"==r)return void Wxopen_card.openWxopen(l);
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE)return void Wxopen_card.openWxopen(l);
if(-1==t.indexOf("mp.weixin.qq.com"))t="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t);else if(-1==t.indexOf("mp.weixin.qq.com/s")&&-1==t.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:o,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:p,
ad_engine:s,
pos_type:d
},_=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&l||-1!=t.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var c="",m="";
l&&(c=l.pkgname&&l.pkgname.replace(/\./g,"_"),m=l.channel_id||""),i={
source:4,
tid:o,
traceid:o,
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
t=urlParser.join(t,i),(0==t.indexOf("http://mp.weixin.qq.com/promotion/")||0==t.indexOf("https://mp.weixin.qq.com/promotion/"))&&(t=urlParser.join(t,{
traceid:o,
aid:p,
engine:s
})),!p&&_&&_(80,t);
}
openUrlWithExtraWebview(t);
}
});
}
}
function hideComplainBtns(){
for(var e=document.getElementsByClassName("js_ad_opt_list"),t=0;t<e.length;t++)e[t].style.display="none";
}
function bindAdOperation(){
seeAds();
for(var e in adDatas.ads)!function(e){
var t=el_gdt_areas[e];
if(!t)return!1;
if(!t.getElementsByClassName&&t.style)return t.style.display="none",!1;
var a=t.getElementsByClassName("js_ad_link")||[],i=adDatas.ads[e];
if(i){
var o,n,_=i.adData,p=i.a_info,r=p.pos_type,d=p.pos_type,s=i.ad_engine,l=t.getElementsByClassName("js_ad_opt_list_btn_"+r),c=t.getElementsByClassName("js_complain_btn_"+r);
if(2==p.use_new_protocol){
var m=t.getElementsByClassName("js_material_"+r),u=t.getElementsByClassName("js_ad_action_"+r);
if(_){
_.adid=window.adid||_.adid||_.aid;
var f="&tid="+_.traceid+"&uin="+uin+"&key="+key+"&ticket="+(_.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+_.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
}
if(m.length>0&&(n=_.tid||p.traceid,o=p.aid,DomEvent.on(m[0],"click",function(e){
var t=p,a=!!e&&e.target;
if(p&&p.has_installed&&("104"==_.pt||"113"==_.pt||"114"==_.pt||"2"==_.pt)?utils.report(114,f):"103"==_.pt||"111"==_.pt||"112"==_.pt?utils.report(23,f):("104"==_.pt||"113"==_.pt||"114"==_.pt)&&utils.report(25,f),
!(!t||3===d||-1!==a.className.indexOf("js_muted_btn")||videoAdMap[t.aid]&&videoAdMap[t.aid].adPlayer&&"play"!==videoAdMap[t.aid].adPlayer.adVideoStatus)){
var i,r,l=t.type,c=t.url,u=t.rl,g=t.apurl,A=t.ticket,y=t.group_id,D=t.pt,v=p.use_new_protocol;
i=m[0].clientWidth,r=m[0].clientHeight;
var P=getClickEventPageOffset(e),h=offset.getOffset(m[0]),T=P.x-h.offsetLeft,w=P.y-h.offsetTop;
ad_click(l,c,u,g,n,A,y,o,D,d,s,_,T,w,i,r,p,f,v),log("[Ad] ad_click: type="+l+", url="+c+", rl="+u+", apurl="+g+", traceid="+n+", ticket="+A+", group_id="+y+", aid="+o+", pt="+D+", pos_type="+d+", ad_engine="+s);
}
})),u.length>0&&p.button_action&&3!=p.pos_type)if(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var g=require("a/app_card.js"),A=15,y=_.pkgname&&_.pkgname.replace(/\./g,"_");
new g({
btn:u[0],
adData:_,
report_param:f,
pos_type:d,
url_scheme:_.url_scheme,
via:[_.traceid,_.adid,y,source,A,s].join("."),
ticket:_.ticket,
appdetail_params:["&aid="+_.adid,"traceid="+_.traceid,"pkgname="+y,"source="+source,"type="+A,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+_.ticket,"scene="+scene].join("&"),
engine:s,
percentStatus:function(t,a){
var i=ad_render_object[e].getData();
i.percent=a,"downloading"==t?i.btn_text="暂停":"paused"==t?i.btn_text="继续":"installed"==t?(i.percent=0,
i.btn_text="已安装"):"downloaded"==t?(i.percent=0,i.btn_text="安装"):"gotodetail"==t?(i.percent=0,
i.btn_text=117==parseInt(p.crt_size)||354==parseInt(p.crt_size)||355==parseInt(p.crt_size)||568==parseInt(p.crt_size)?"进入":"进入应用"):(i.percent=0,
i.btn_text=117==parseInt(p.crt_size)||354==parseInt(p.crt_size)||355==parseInt(p.crt_size)||568==parseInt(p.crt_size)?"进入":"进入应用"),
ad_render_object[e].updateData(i);
}
});
}else if(p.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
var D=require("a/profile.js");
_.adid=window.adid||_.adid||_.aid,new D({
btnProfile:u[0],
adData:_,
pos_type:d,
report_param:f,
aid:_.adid,
ad_engine:s
});
}else p.product_type==AD_TYPE.CARD_PRODUCT_TYPE?new Card({
btn:u[0],
adData:_,
report_param:f,
pos_type:d
}):p.product_type==AD_TYPE.WECHATCARD_PRODUCT_TYPE?new MpShop({
btn:u[0],
adData:_,
report_param:f,
pos_type:d
}):DomEvent.on(u[0],"click",function(e){
var t=_,a=!!e&&e.target,i=t.type,o=p.button_action.jump_url,n=t.rl,l=t.apurl,c=t.tid||p.traceid,m=t.ticket,f=t.group_id,g=t.aid,A=t.pt,y=p.use_new_protocol;
if(console.info("[广告新协议点击素材]",p.dest_type,p.product_type),_){
_.adid=window.adid||_.adid||_.aid;
var D="&tid="+_.traceid+"&uin="+uin+"&key="+key+"&ticket="+(_.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+_.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
}
var v,P,h,T;
v=position.getX(a,"js_ad_action_"+r)+e.offsetX,P=position.getY(a,"js_ad_action_"+r)+e.offsetY,
h=u[0].clientWidth,T=u[0].clientHeight;
var w=getClickEventPageOffset(e),E=offset.getOffset(u[0]),O=w.x-E.offsetLeft,b=w.y-E.offsetTop;
return ad_click(i,o,n,l,c,m,f,g,A,d,s,_,O,b,h,T,p,D,y),log("[Ad] ad_click: type="+i+", url="+o+", rl="+n+", apurl="+l+", traceid="+c+", ticket="+m+", group_id="+f+", aid="+g+", pt="+A+", pos_type="+d+", ad_engine="+s),
hideComplainBtns(),!1;
});
}else for(var v=0,P=a.length;P>v;++v)!function(e,t){
var i=a[e],_=i.dataset;
if(_&&3!=p.pos_type){
var r=_.type,l=_.url,c=_.rl,m=_.apurl,u=_.ticket,f=_.group_id,g=_.pt,A=p.use_new_protocol,y=!0;
n=_.tid,o=_.aid,(A&&(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE)||115===g)&&(y=!1),
p.pos_type===AD_POS.POS_MID&&(y=!1),DomEvent.on(i,"click",function(e){
var a=!!e&&e.target,i=[AD_TYPE.ANDROID_APP_PRODUCT_TYPE,AD_TYPE.IOS_APP_PRODUCT_TYPE,AD_TYPE.ADD_CONTACT_PRODUCT_TYPE];
if(!a||!a.className||d==AD_POS.POS_MID&&t&&-1==i.toString().indexOf(t.product_type)||-1==a.className.indexOf("js_ad_btn")&&-1==a.className.indexOf("js_btn_process")&&-1==a.className.indexOf("js_muted_btn")&&-1==a.className.indexOf("js_poster_cover")&&-1==a.className.indexOf("js_ad_opt_list_btn")&&-1==a.className.indexOf("js_complain_btn")&&-1==a.className.indexOf("js_view_profile")&&-1==a.className.indexOf("js_add_contact")){
if(t){
t.adid=window.adid||t.adid||t.aid;
var _="&tid="+t.traceid+"&uin="+uin+"&key="+key+"&ticket="+(t.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+t.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
p&&p.has_installed&&("104"==t.pt||"113"==t.pt||"114"==t.pt||"2"==t.pt)?utils.report(114,_):"103"==t.pt||"111"==t.pt||"112"==t.pt?utils.report(23,_):("104"==t.pt||"113"==t.pt||"114"==t.pt)&&utils.report(25,_);
}
var y,D,v,P;
return y=position.getX(a,"js_ad_link")+e.offsetX,D=position.getY(a,"js_ad_link")+e.offsetY,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
P=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(r,l,c,m,n,u,f,o,g,d,s,t,y,D,v,P,p,_,A),log("[Ad] ad_click: type="+r+", url="+l+", rl="+c+", apurl="+m+", traceid="+n+", ticket="+u+", group_id="+f+", aid="+o+", pt="+g+", pos_type="+d+", ad_engine="+s),
!1;
}
},y),DomEvent.on(i,"touchstart",function(){
window.__a_press_interval=+new Date;
}),DomEvent.on(i,"touchend",function(){
window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(v,_);
if(l[0]&&DomEvent.on(l[0],"click",function(){
if(parseInt(window.can_see_complaint)){
var e=l[0].getElementsByClassName("js_ad_opt_list_"+p.pos_type);
utils.adOptReport(0,p.pos_type,n,o),e&&e[0]&&(e[0].style.display="none"==e[0].style.display?"block":"none");
}
return!1;
}),c[0]&&DomEvent.on(c[0],"click",function(){
var e="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+o+"&traceid="+n+"&source="+p.pos_type+"&biz="+window.biz+"&material_id="+JSON.stringify(p.material_id_list);
return utils.adOptReport(1,p.pos_type,n,o),mmversion.isWp||mmversion.isIOS||mmversion.isAndroid?JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
-1==t.err_msg.indexOf("ok")&&(location.href=e);
}):openUrlWithExtraWebview(e),hideComplainBtns(),!1;
}),_&&2!=p.use_new_protocol){
_.adid=window.adid||_.adid||_.aid;
var h=p.exp_info||{},T=h.exp_id||"",w=h.exp_value||[];
try{
w=JSON.stringify(w);
}catch(E){
w="[]";
}
var f="&tid="+_.traceid+"&uin="+uin+"&key="+key+"&ticket="+(_.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+_.adid+"&ad_engine="+s+"&pos_type="+d+"&exp_id="+T+"&exp_value="+w+"&r="+Math.random();
if(_.report_param=f,_.use_new_protocol){
if(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var g=require("a/app_card.js"),A=15,y=_.pkgname&&_.pkgname.replace(/\./g,"_"),O=document.getElementById("js_ad_btn_"+d);
new g({
btn:O,
adData:_,
report_param:f,
pos_type:d,
url_scheme:_.url_scheme,
via:[_.traceid,_.adid,y,source,A,s].join("."),
ticket:_.ticket,
appdetail_params:["&aid="+_.adid,"traceid="+_.traceid,"pkgname="+y,"source="+source,"type="+A,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+_.ticket,"scene="+scene].join("&"),
engine:s
});
}else if(p.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
var D=require("a/profile.js");
new D({
btnProfile:document.getElementById("js_ad_btn_"+d),
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:_,
pos_type:d,
report_param:f,
aid:_.adid,
ad_engine:s,
a_info:p
});
}
9==p.material_type&&(p.report_param=f,videoAdMap[p.aid]=new VideoAd(p));
}else{
if("100"==_.pt||"115"==_.pt){
var D=require("a/profile.js");
return void new D({
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:_,
pos_type:d,
report_param:f,
aid:_.adid,
ad_engine:s,
a_info:p
});
}
if("102"==_.pt){
var b=require("a/android.js"),A=15,y=_.pkgname&&_.pkgname.replace(/\./g,"_");
return void new b({
btn:document.getElementById("js_app_action_"+d),
adData:_,
report_param:f,
task_ext_info:[_.adid,_.traceid,y,source,A,s].join("."),
via:[_.traceid,_.adid,y,source,A,s].join(".")
});
}
if("101"==_.pt){
var I=require("a/ios.js");
return void new I({
btn:document.getElementById("js_app_action_"+d),
adData:_,
ticket:_.ticket,
report_param:f
});
}
if("105"==_.pt)return void new Card({
btn:document.getElementById("js_card_action_"+d),
adData:_,
report_param:f,
pos_type:d
});
if("106"==_.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+d),
adData:_,
report_param:f,
pos_type:d
});
if("103"==_.pt||"104"==_.pt||"111"==_.pt||"112"==_.pt||"113"==_.pt||"114"==_.pt||"121"==_.pt||"122"==_.pt){
var g=require("a/app_card.js"),A=15,y=_.pkgname&&_.pkgname.replace(/\./g,"_");
return void new g({
btn:document.getElementById("js_appdetail_action_"+d),
js_app_rating:document.getElementById("js_app_rating_"+d),
adData:_,
report_param:f,
pos_type:d,
url_scheme:_.url_scheme,
via:[_.traceid,_.adid,y,source,A,s].join("."),
ticket:_.ticket,
appdetail_params:["&aid="+_.adid,"traceid="+_.traceid,"pkgname="+y,"source="+source,"type="+A,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+_.ticket,"scene="+scene].join("&"),
engine:s
});
}
if("108"==_.pt||"109"==_.pt||"110"==_.pt||"116"==_.pt||"117"==_.pt){
var x=require("a/sponsor.js");
new x({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:_,
a_info:p,
pos_type:d,
report_param:f
});
}
"118"==p.pt&&(_.report_param=f),"125"==p.pt&&(p.report_param=f,videoAdMap[p.aid]=new VideoAd(p));
}
}
}
}(e);
var t=document.getElementById("js_article");
t&&t.addEventListener("click",function(e){
if(e.target){
var t=e.target.className;
-1===t.indexOf("js_ad_opt_list_btn")&&-1===t.indexOf("js_mpad_more")&&hideComplainBtns();
}
});
}
function isCanvasAd(e){
return!!e.canvas_info&&e.dest_type===AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE;
}
function launchIosAppBackup(e,t,a,i,o,n,_,p,r,d,s,l,c){
return isCanvasAd(s)?void utils.openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:c,
url:e
}):s.dest_type!==AD_CONFIG.AD_DEST_TYPE.OUTER_DEST_TYPE||utils.isItunesLink(e)?s.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE?void Wxopen_card.openWxopen(d):s.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_SHOP_DEST_TYPE?void openUrlWithExtraWebview(urlParser.join(e,{
outer_id:d.outer_id
})):void utils.openWebAppStore(s.app_info.appinfo_url,l):void handleH5(e,t,a,i,o,n,_,p,r,d,s);
}
function handleApp(e,t,a,i,o,n,_,p,r,d,s,l,c){
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
var A={
source:4,
tid:t,
idx:a,
mid:i,
appuin:o,
pt:n,
aid:_,
ad_engine:p,
pos_type:r
},y=window.__report;
if(d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var D="",v="";
d&&(D=d.pkgname&&d.pkgname.replace(/\./g,"_"),v=d.channel_id||""),A={
source:4,
tid:t,
traceid:t,
mid:i,
idx:a,
appuin:o,
pt:n,
channel_id:v,
aid:_,
engine:p,
pos_type:r,
pkgname:D
};
}
e=urlParser.join(e,A),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=urlParser.join(e,{
traceid:t,
aid:_,
engine:p
})),!_&&y&&y(80,e);
}
return openUrlWithExtraWebview(e),!0;
}
function handleH5(e,t,a,i,o,n,_,p,r,d,s){
if(console.info("[广告处理H5事件]",s),-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var l={
source:4,
tid:t,
idx:a,
mid:i,
appuin:o,
pt:n,
aid:_,
ad_engine:p,
pos_type:r
},c=window.__report;
if(("104"==n||"113"==n||"114"==n||"122"==n)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",u="";
d&&(m=d.pkgname&&d.pkgname.replace(/\./g,"_"),u=d.channel_id||""),l={
source:4,
tid:t,
traceid:t,
mid:i,
idx:a,
appuin:o,
pt:n,
channel_id:u,
aid:_,
engine:p,
pos_type:r,
pkgname:m
};
}
e=urlParser.join(e,l),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=urlParser.join(e,{
traceid:t,
aid:_,
engine:p
})),!_&&c&&c(80,e);
}
console.info("[广告H5落地页最终URL]",e),openUrlWithExtraWebview(e);
}
var mmversion=require("biz_wap/utils/mmversion.js"),Device=require("biz_wap/utils/device.js"),Sign=require("a/a_sign.js"),openUrl=require("biz_wap/utils/openUrl.js"),getParaList=require("biz_common/utils/get_para_list.js"),showTime=require("biz_wap/utils/show_time.js"),urlParser=require("biz_common/utils/url/parse.js"),DomEvent=require("biz_common/dom/event.js"),AdClickReport=require("a/a_report.js").AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),Wxopen_card=require("a/wxopen_card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),cpc_a_tpl=require("a/cpc_a_tpl.html.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),log=require("appmsg/log.js"),CrtManager=require("a/tpl/crt_tpl_manager.js"),classList=require("biz_common/dom/class.js"),AD_CONFIG=require("a/a_config.js"),VideoAd=require("a/video.js"),utils=require("a/a_utils.js"),commonUtils=require("common/utils.js"),offset=require("biz_common/dom/offset.js"),appDialogConfirm=require("a/appdialog_confirm.js"),monitor=require("biz_common/utils/monitor.js"),adLS=new LS("ad"),lsKey=[biz,sn,mid,idx].join("_"),globalAdDebug=!!urlParser.getQuery("mock")||!!urlParser.getQuery("rtx"),AD_TYPE=AD_CONFIG.AD_TYPE,AD_POS=AD_CONFIG.AD_POS,pos_type=window.pos_type||0,__report=window.__report,js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),el_gdt_areas={
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
},isScroll=!1,isSee=!1,openUrlWithExtraWebview=openUrl.openUrlWithExtraWebview,see_ad_detail_report=[!1,!1,!1,!1,!1,!1],see_ad_detail_first_see_time=0,ad_engine=0;
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},videoAdMap={},isVideoSharePageOnlyAd=utils.isVideoSharePageOnlyAd(),paragraphList=void 0;
return AdFrame.prototype.initMidAd=function(e,t){
insertAutoAdElement(e,!0,t,this.midAdDataCount);
var a=document.getElementsByTagName("mpcpc")[t];
a&&(this.aInfoMap[e.aid].iframeEle=createAdFrame(a,e),__report&&__report(125),utils.report115849("0"));
},AdFrame.prototype.initAdBeforeVideo=function(e){
for(var t=[],a=[],i=0;i<this.iframes.length;i++){
var o=this.iframes[i];
if(t.push(o.getAttribute("data-src")),a.push(o.src),isVideoFrameHasVid(o,e.vid)){
utils.report115849(19);
var n=this.aInfoMap[e.aid],_=document.createElement("div");
_.className="mpad_relative";
var p=o.nextSibling;
commonUtils.insertAfter(_,o),_.appendChild(o);
var r=createAdFrame(_,e);
return classList.addClass(r,"mpad_absolute"),n.iframeEle=r,n.heightWidthRate=parseInt(o.style.height,10)/parseInt(o.style.width,10),
o.adVidFromAppmsg=e.vid,setTimeout(function(){
o.contentWindow?o.contentWindow.adVidFromAppmsg=e.vid:utils.report115849(51),utils.postMessage(o.contentWindow,AD_CONFIG.SEND_AD_VID_ACTION,{
adVidFromAppmsg:e.vid
});
},0),p&&_.appendChild(p),void utils.report115849(1);
}
}
var d=new Image;
d.src=urlParser.join("https://badjs.weixinbridge.com/badjs",{
from:window.encodeURIComponent(window.location),
id:220,
level:4,
msg:JSON.stringify({
frameDataSrcList:JSON.stringify(t),
vid:e.vid,
frameSrcList:JSON.stringify(a)
})
});
},AdFrame.prototype.responseVideoGetAdVid=function(e){
for(var t=0;t<this.iframes.length;t++)if(e===this.iframes[t].contentWindow&&this.iframes[t].adVidFromAppmsg)return void utils.postMessage(e,AD_CONFIG.SEND_AD_VID_ACTION,{
adVidFromAppmsg:this.iframes[t].adVidFromAppmsg
});
utils.postMessage(e,AD_CONFIG.SEND_AD_VID_ACTION,{});
},AdFrame.prototype.initAdAfterVideo=function(e){
var t=createAdFrame(document.body,e);
this.aInfoMap[e.aid].heightWidthRate=document.body.offsetHeight/document.body.offsetWidth,
this.aInfoMap[e.aid].iframeEle=t;
},AdFrame.prototype.initBottomAd=function(e){
this.aInfoMap[e.aid].iframeEle=createAdFrame(js_bottom_ad_area,e),utils.report115849(9);
},AdFrame.prototype.onFrameReady=function(e){
var t,a="";
if(utils.report115849(99),(new Image).src="http://pingfore.qq.com/pingd?dm=wxa.wxs.qq.com&url=/tmpl/biz_frame_ready.html&rdm=-&rurl=-&rarg=-&pvid=NoCookie&scr=1080x1920&scl=24-bit&lang=zh-cn&java=0&pf=MacIntel&tz=-8&flash=-&ct=-&vs=tcss.3.1.5&ext=ls%3Dwxa.wxs.qq.com/tmpl/base_tmpl.html%3Btm%3D5&hurlcn=&reserved1=-1&tt=&rand="+Math.round(1e5*Math.random()),
this.mapInfoMap(function(a,i,o){
i.contentWindow===e&&(t=o);
}),t){
var i=t.iframeEle.parentNode;
t.aInfo.pos_type===AD_POS.POS_MID&&(a=i&&i.dataset&&i.dataset.category_id_list),
postMessageToAdFrame(e,AD_CONFIG.SET_PAGE_DATA_ACTION_NAME,{
biz:window.biz,
uin:window.uin,
scene:window.scene,
source:window.source,
idx:window.idx,
mid:window.mid,
isSg:window.isSg,
userUin:window.user_uin,
sn:window.sn,
appmsgid:window.appmsgid,
sendTime:window.send_time||"",
passTicket:decodeURIComponent(window.pass_ticket),
globalAdDebug:globalAdDebug,
bodyScrollTop:commonUtils.getScrollTop(),
contentOffsetHeight:contentWrp.offsetHeight,
adOffsetTop:offset.getOffset(t.iframeEle).offsetTop,
screenHeight:commonUtils.getInnerHeight(),
midCategoryIdList:a,
heightWidthRate:t.heightWidthRate,
createIframeTime:t.iframeEle.createIframeTime,
skin:"5"===window.item_show_type?"black":"white"
}),postMessageToAdFrame(e,"setAdDataV2",t.aInfo);
}
},AdFrame.prototype.mapInfoMap=function(e,t){
for(var a in this.aInfoMap){
{
var i=this.aInfoMap[a],o=i.iframeEle;
i.aInfo.pos_type===AD_POS.POS_AD_AFTER_VIDEO;
}
this.aInfoMap.hasOwnProperty(a)&&o&&(!t||t&&t===a)&&e&&e(i.aInfo,o,i);
}
},AdFrame.prototype.broadcastAdFrame=function(e,t){
this.mapInfoMap(function(a,i){
postMessageToAdFrame(i.contentWindow,e,t);
});
},AdFrame.prototype.hasVideoPlayingInScreen=function(e,t){
try{
for(var a=e+t,i=0;i<this.iframes.length;i++){
var o=this.iframes[i],n=offset.getOffset(o).offsetTop;
if(("play"===o.contentWindow.videoStatus||"loading"===o.contentWindow.videoStatus)&&a>n&&e<n+o.offsetHeight)return!0;
}
}catch(_){
return!1;
}
},AdFrame.prototype.bindScrollEvent=function(){
var e=this,t=utils.debounce(function(){
var t=commonUtils.getScrollTop(),a=commonUtils.getInnerHeight();
e.mapInfoMap(function(i,o){
var n=offset.getOffset(o).offsetTop;
postMessageToAdFrame(o.contentWindow,"pageScrollV2",{
bodyScrollTop:t,
adOffsetTop:n,
screenHeight:a,
hasVideoPlayingInScreen:e.hasVideoPlayingInScreen(t,a)
});
});
},50);
DomEvent.on(window,"scroll",t);
},AdFrame.prototype.checkApiInvokeValid=function(e){
if(!this.aInfoMap[e.aid])return"Invalid aid";
var t=e.proxyData||{},a=this.aInfoMap[e.aid].aInfo,i=t.methodName;
return-1===AD_CONFIG.AD_JSAPI_WHITE_LIST.indexOf(i)?invalidMsg(AD_CONFIG.INVALID_METHOD_NAME_MSG_PREFIX,i):"addContact"!==i&&"profile"!==i||a&&a.biz_info&&t.args.username===a.biz_info.user_name?!0:invalidMsg(AD_CONFIG.INVALID_ARGS_MSG_PREFIX,"Invalid biz username");
},AdFrame.prototype.changeFrameStyle=function(e){
if(this.aInfoMap[e.aid]){
var t=this.aInfoMap[e.aid].iframeEle;
e.display===!1?classList.addClass(t,AD_CONFIG.AD_IFRAME_HIDE_CLASS):e.display===!0&&classList.removeClass(t,AD_CONFIG.AD_IFRAME_HIDE_CLASS),
e.height&&(t.style.height=e.height),isVideoSharePageOnlyAd&&handleVideoSharePage(parseInt(e.height,10)),
this.aInfoMap[e.aid].aInfo.pos_type!==AD_POS.POS_BOTTOM||this.hasReportBottomTime||"5"!==window.item_show_type||(monitor.setAvg(112287,38,Date.now()-window.logs.pagetime.page_begin),
monitor.send(),this.hasReportBottomTime=!0);
}
},AdFrame.prototype.commonRequest=function(e,t){
var a=t.proxyData||{},i=a.args||{};
return-1===AD_CONFIG.AD_REQ_PATH_WHITE_LIST.indexOf(i.path)?void proxyCallback(e,t,{
err_msg:invalidMsg(AD_CONFIG.INVALID_REQ_PATH_MSG_PREFIX,i.path)
}):(ajax({
type:i.requestType,
url:i.path+"?"+(i.requestQuery||""),
data:i.requestBody||{},
mayAbort:!0,
success:function(a){
proxyCallback(e,t,{
err_msg:"request:success",
response:a
});
},
error:function(a,i){
proxyCallback(e,t,{
err_msg:"request:error",
xhr:a,
err_info:i
});
}
}),void("/mp/advertisement_report"===i.path&&i.requestQuery.indexOf("report_type=2")>-1&&utils.report115849(38)));
},AdFrame.prototype.onJsapiProxy=function(e,t){
var a=t.proxyData||{},i=this.checkApiInvokeValid(t);
if("string"==typeof i)return void proxyCallback(e,t,{
err_msg:i
});
try{
JSAPI[a.methodType](a.methodName,a.args,function(i){
proxyCallback(e,t,i),"openUrlWithExtraWebview"===a.methodName&&-1===i.err_msg.indexOf("ok")&&(location.href=a.args.url);
});
}catch(o){
console.error(o),proxyCallback(e,t,{
err_msg:invalidMsg(AD_CONFIG.INVALID_METHOD_TYPE_MSG_PREFIX,a.methodType)
});
}
"adDataReport"===a.methodName&&1===a.args.need_record_page_operation&&utils.report115849(41);
},AdFrame.prototype.onProxy=function(e,t){
if("jsapi"===t.proxyType)return void this.onJsapiProxy.apply(this,arguments);
var a=t.proxyData||{};
if("bizapi"===t.proxyType){
if("appDialogConfirm"===a.methodName)return void androidAppDialogConfirm.apply(this,arguments);
if("request"===a.methodName)return void this.commonRequest.apply(this,arguments);
if("addIdKeyReport"===a.methodName)return void(window.__addIdKeyReport&&window.__addIdKeyReport(a.args.id,a.args.key,a.args.val));
}
},AdFrame.prototype.createAdWebview=function(e){
this.hasCreateAdWebview||(JSAPI.invoke("handleMPPageAction",{
action:"createAdWebview",
adUrl:urlParser.join(location.origin+"/mp/authreadtemplate?t=ad/only_ad_tmpl",_defineProperty({
vid:window.cgiData.vid,
item_show_type:window.item_show_type,
idx:window.idx,
mid:window.mid,
sn:window.sn,
scene:window.scene,
appmsg_type:window.appmsg_type,
msg_title:window.msg_title,
ct:window.ct,
send_time:window.send_time,
abtest_cookie:window.abtest_cookie,
msg_daily_idx:window.msg_daily_idx,
user_uin:window.user_uin,
__biz:window.biz,
pos_type_list:9,
get_ad_after_video:1
},AD_CONFIG.HAS_AD_DATA_QUERY_KEY,e?1:0))
},function(e){
e.err_msg.indexOf("fail")>-1&&utils.report115849(40);
}),this.hasCreateAdWebview=!0);
},AdFrame.prototype.reportAdAfterVideo=function(e){
var t=this;
"ended"!==e.state||Number(urlParser.getQuery(AD_CONFIG.HAS_AD_DATA_QUERY_KEY))||(!this.hasReportEnd&&this.hasAdAfterVideo&&(utils.report115849(69),
this.hasReportEnd=!0),setTimeout(function(){
!t.hasAdAfterVideo||t.adAfterVideoAppear||t.hasReportAppearError||(utils.report115849(68),
t.hasReportAppearError=!0);
},500));
},AdFrame.prototype.listenAndCreateAdWebview=function(){
function e(){
o=!0,setTimeout(function(){
return n?void(o=!1):(_++,r>=i-_&&p.createAdWebview(),void e());
},1e3);
}
function t(){
JSAPI.invoke("handleMPPageAction",{
action:"getMPVideoState"
},function(t){
t.vid===window.cgiData.vid&&(_=parseInt(t.currentTime,10)>=parseInt(t.duration,10)?0:t.currentTime,
i=t.duration,"play"===t.state&&!o&&e());
});
}
var a=this,i=void 0,o=void 0,n=!1,_=0,p=this,r=10;
JSAPI.on("onMPVideoStateChange",function(e){
"play"===e.state?(t(),n=!1):n=!0,a.reportAdAfterVideo(e);
}),t();
},AdFrame.prototype.bindAppVideoEvent=function(){
var e=this;
JSAPI.on("onMPAdWebviewStateChange",function(t){
return"appear"===t.state?(e.adAfterVideoAppear=!0,void e.mapInfoMap(function(e,t){
e.pos_type===AD_POS.POS_AD_AFTER_VIDEO&&(postMessageToAdFrame(t.contentWindow,AD_CONFIG.SET_PAGE_DATA_ACTION_NAME,{
heightWidthRate:document.body.offsetHeight/document.body.offsetWidth
}),postMessageToAdFrame(t.contentWindow,AD_CONFIG.AD_PLAY_VIDEO_ACTION,""));
})):void("destroy"===t.state&&(e.hasCreateAdWebview=!1));
}),JSAPI.on("onMPVideoStateChange",function(t){
e.reportAdAfterVideo(t);
}),"5"===window.item_show_type&&commonUtils.isNativePage()&&(this.listenAndCreateAdWebview(),
JSAPI.on("onReceiveMPPageData",function(t){
t.data===AD_CONFIG.GET_AD_DATA_AFTER_VIDEO_ACTION_NAME&&e.newAdInfos.map(function(e){
e.pos_type===AD_POS.POS_AD_AFTER_VIDEO&&JSAPI.invoke("handleMPPageAction",{
action:"sendMPPageData",
data:JSON.stringify(e),
sendTo:"adWeb"
});
});
}));
},AdFrame.prototype.bindAdEvent=function(){
var e=this,t=document.getElementById("js_article");
utils.listenMessage(window,function(t,a){
var i=a.action,o=a.value||{};
if(i===AD_CONFIG.AD_VIDEO_PLAY_ACTION&&o.playAd&&utils.report115849(35),i===AD_CONFIG.AD_VIDEO_PLAY_ACTION&&(o.vid||o.aid))return o.playAd&&utils.report115849(25),
e.mapInfoMap(function(e,t){
e.vid&&e.vid===o.vid||e.aid===o.aid?e.vid===o.vid&&(postMessageToAdFrame(t.contentWindow,AD_CONFIG.AD_PLAY_VIDEO_ACTION,""),
o.playAd&&utils.report115849(21)):postMessageToAdFrame(t.contentWindow,"pauseVideoV2","");
}),void(o.aid&&utils.broadcastFrame(e.iframes,AD_CONFIG.AD_VIDEO_PLAY_ACTION,"","vid="));
if("mpvideo_broadcast_statusChange"===a.type)return void(t.source.videoStatus=a.data.status);
if(a.action===AD_CONFIG.GET_AD_VID_ACTION&&e.responseVideoGetAdVid(t.source),t.origin!==AD_CONFIG.AD_FRAME_DOMAIN);else switch(i){
case"onFrameReadyV2":
e.onFrameReady(t.source);
break;

case"onProxyV2":
e.onProxy(t.source,o);
break;

case"changeFrameStyle":
e.changeFrameStyle(o);
break;

case"onVideoEndV2":
e.mapInfoMap(function(t){
utils.broadcastFrame(e.iframes,AD_CONFIG.AD_VIDEO_END_ACTION,"","vid="+t.vid);
},o.aid);
}
}),t&&t.addEventListener("click",function(){
e.broadcastAdFrame("clickOutsideV2","");
}),this.bindScrollEvent();
},AdFrame.prototype.handleAdWithFrame=function(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],a=0,i=this;
this.midAdDataCount=t,this.newAdInfos=e,e.forEach(function(e){
return i.aInfoMap[e.aid]={
aInfo:e
},e.pos_type===AD_POS.POS_MID?(i.initMidAd(e,a),void a++):e.pos_type===AD_POS.POS_AD_BEFORE_VIDEO&&0===e.is_mp_video?(utils.report115849(18),
void i.initAdBeforeVideo(e)):e.pos_type===AD_POS.POS_BOTTOM?void i.initBottomAd(e):e.pos_type===AD_POS.POS_AD_AFTER_VIDEO?(i.hasAdAfterVideo=!0,
void(commonUtils.isNativePage()?i.createAdWebview(!0):(utils.report115849(33),i.initAdAfterVideo(e)))):void 0;
}),this.bindAppVideoEvent(),e.length&&this.bindAdEvent();
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
window.addEventListener("message",e,!1),s();
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
var r=d.parentNode,s=r.querySelectorAll('.js_img_loading[data-vid="'+t.vid+'"]');
if(s&&s.length>0)for(var i=0,n=s.length;n>i;i++)r.removeChild(s[i]);
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
if(window.__second_open__&&(d=a.getAttribute("data-realsrc")),d&&-1!=d.indexOf("/mp/videoplayer")){
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
function s(){
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
function v(){
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
getVideoInfo:v
};
});define("biz_wap/utils/ajax_wx.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e,t){
return e.url.indexOf(t)>-1&&-1===e.url.indexOf("action=")&&(!e.data||!e.data.action);
}
function o(e){
console.log(e),/^(http:\/\/|https:\/\/|\/\/)/.test(e.url)?/^\/\//.test(e.url)&&(e.url="https:"+e.url):e.url="https://mp.weixin.qq.com/"+e.url.replace(/^\//,""),
e.url+=-1==e.url.indexOf("?")?"?fasttmplajax=1":"&fasttmplajax=1","html"==e.f||-1!=e.url.indexOf("?f=json")&&-1!=e.url.indexOf("&f=json")||(e.url+="&f=json");
var o=null;
if("object"==typeof e.data){
var n=e.data;
o=[];
for(var i in n)n.hasOwnProperty(i)&&o.push(i+"="+encodeURIComponent(n[i]));
o=o.join("&");
}else o="string"==typeof e.data?e.data:null;
console.log("before request");
var a=1,p=function(e,o){
return r.invoke("request",{
url:e.url,
method:e.type,
data:o,
header:{
Cookie:document.cookie
}
},function(n){
if(console.log("jsapiRequest",n.err_msg),n.err_msg.indexOf(":ok")>-1){
t(e,"/mp/getappmsgext")&&(window.receiveGetAppmsgExt=n.statusCode+"|"+Date.now()),
t(e,"/mp/getappmsgad")&&(window.receiveGetAppmsgAd=n.statusCode+"|"+Date.now());
var i={};
if(n.data){
console.log(e.dataType),console.log(e);
try{
i="json"==e.dataType?JSON.parse(n.data):n.data;
}catch(m){
return console.error(m),void(e.error&&e.error({},{
type:1,
error:m
}));
}
}
var c={};
try{
c=JSON.parse(n.data);
}catch(m){}
c.base_resp&&"-3"==c.base_resp.ret&&a>0?(a--,r.invoke("updatePageAuth",{},function(t){
console.log("updatePageAuth",t),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_3_1",
t&&t.err_msg&&t.err_msg.indexOf(":ok")>-1?(window.top.pass_ticket=encodeURIComponent(s.getQuery("pass_ticket",t.fullUrl).html(!1).replace(/\s/g,"+")),
e.pass_ticket&&(e.pass_ticket=window.top.pass_ticket),p(e,o),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_4_1"):e.success&&e.success(i);
})):e.success&&e.success(i);
}else if(n.err_msg.indexOf("no permission")>-1)Ajax(e),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_31_1";else{
e.error&&e.error({},n),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_32_1";
var l="request: "+JSON.stringify(e.type)+" "+JSON.stringify(e.url)+" ;;;; cookie: "+JSON.stringify(document.cookie)+" ;;;; data: "+JSON.stringify(o)+" ;;;; resp: "+JSON.stringify(n);
(new Image).src="https://badjs.weixinbridge.com/badjs?id=226&level=4&msg="+encodeURIComponent(l)+"&uin="+encodeURIComponent(window.uin)+"&from="+encodeURIComponent(window.location.href);
}
e.complete&&e.complete();
});
};
return t(e,"/mp/getappmsgext")&&(window.startGetAppmsgExtTime=Date.now()),t(e,"/mp/getappmsgad")&&(window.startGetAppmsgAdTime=Date.now()),
p(e,o);
}
e("biz_common/utils/string/html.js");
var s=e("biz_common/utils/url/parse.js"),r=e("biz_wap/jsapi/core.js");
return o;
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
});define("biz_wap/utils/log.js",["biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js"],function(i){
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
});define("appmsg/report.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","common/utils.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(){
var t=(e("biz_wap/utils/mmversion.js"),e("biz_common/utils/report.js"),e("biz_common/utils/monitor.js")),r=!1,s=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
return;
}(),s&&s.timing&&s.timing.navigationStart?(r=s.timing.navigationStart,function(){
return;
}(),function(){
function e(){
if(-1==i.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,n=e.length;n>t;++t)if(-1!=i.indexOf(e[t]))return!0;
return!1;
}
var n=window.performance&&window.performance.timing,a=write_sceen_time-r,s=first_sceen__time-r,d=page_endtime-r,m=(window.onload_endtime||+new Date)-r;
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(a=real_show_page_time-r,s=real_show_page_time-r);
var g=window.logs.jsapi_ready_time?window.logs.jsapi_ready_time-r:void 0,w=window.logs.a8key_ready_time?window.logs.a8key_ready_time-r:void 0,p=n&&n.connectEnd-n.connectStart,c=n&&n.secureConnectionStart&&n.connectEnd-n.secureConnectionStart,u=n&&n.domainLookupEnd&&n.domainLookupStart&&n.domainLookupEnd-n.domainLookupStart;
if(window.logs.pagetime.wtime=a,window.logs.pagetime.ftime=s,window.logs.pagetime.ptime=d,
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
if(!(Math.random()>.2||0>m||0>a||0>s||0>d)){
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
var e=document.getElementById("js_toobar3"),t=document.getElementById("page-content");
if(t&&!(Math.random()>.1)){
var i=function o(){
var i=window.pageYOffset||document.documentElement.scrollTop,r=e.offsetTop;
if(i+a.getInnerHeight()>=r){
for(var d,m,g=t.getElementsByTagName("img"),w={},p=[],c=0,u=0,l=0,_=0,f=g.length;f>_;++_){
var v=g[_];
d=v.getAttribute("data-src")||v.getAttribute("src"),m=v.getAttribute("src"),d&&(d.isCDN()?u++:l++,
c++,w[m]={});
}
if(p.push("1="+1e3*c),p.push("2="+1e3*u),p.push("3="+1e3*l),s.getEntries){
var y=s.getEntries(),h=window.logs.img.download,k=[0,0,0],A=[0,0,0];
c=u=0;
for(var _=0,T=y.length;T>_;++_){
var j=y[_],b=j.name;
b&&"img"==j.initiatorType&&w[b]&&(b.isCDN()&&(A[0]+=j.duration,u++),k[0]+=j.duration,
c++,w[b]={
startTime:j.startTime,
responseEnd:j.responseEnd
});
}
k[0]>0&&c>0&&(k[2]=k[0]/c),A[0]>0&&u>0&&(A[2]=A[0]/u);
for(var _ in h)if(h.hasOwnProperty(_)){
for(var M=h[_],x=0,E=0,C=0,z=0,S=0,f=M.length;f>S;++S){
var d=M[S];
if(w[d]&&w[d].startTime&&w[d].responseEnd){
var D=w[d].startTime,I=w[d].responseEnd;
x=Math.max(x,I),E=E?Math.min(E,D):D,d.isCDN()&&(C=Math.max(x,I),z=E?Math.min(E,D):D);
}
}
k[1]+=Math.round(x-E),A[1]+=Math.round(C-z);
}
for(var W=4,N=7,_=0;3>_;_++)k[_]=Math.round(k[_]),A[_]=Math.round(A[_]),k[_]>0&&(p.push(W+_+"="+k[_]),
"wifi"==networkType?p.push(W+_+6+"="+k[_]):("2g/3g"==networkType||"4g"==networkType)&&p.push(W+_+12+"="+k[_])),
A[_]>0&&(p.push(N+_+"="+A[_]),"wifi"==networkType?p.push(N+_+6+"="+A[_]):("2g/3g"==networkType||"4g"==networkType)&&p.push(N+_+12+"="+A[_]));
}
n.off(window,"scroll",o,!1);
}
};
n.on(window,"scroll",i,!1);
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
var n=e("biz_common/dom/event.js"),i=navigator.userAgent,o=e("biz_wap/utils/ajax.js"),a=e("common/utils.js");
e("appmsg/cdn_img_lib.js"),n.on(window,"load",function(){
if(""==networkType&&window.isInWeixinApp()){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(n){
networkType=e[n.err_msg],("network_type:edge"==n.err_msg||"network_type:wwan"==n.err_msg)&&(n.detailtype&&"4g"==n.detailtype||n.subtype&&"4g"==n.subtype)&&(networkType="4g"),
t();
});
}else t();
},!1);
});
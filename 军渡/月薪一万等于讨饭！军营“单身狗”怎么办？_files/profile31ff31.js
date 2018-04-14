define("appmsg/emotion/common.js",[],function(){
"use strict";
return{
EMOTIONS_COUNT:99,
EMOTION_LI_SIZE:36,
EMOTION_SIZE:22
};
});define("appmsg/emotion/slide.js",["appmsg/emotion/common.js","appmsg/emotion/dom.js","appmsg/emotion/nav.js"],function(n,t){
"use strict";
function o(){
function n(n){
n.preventDefault(),n.stopPropagation(),l||(g=!0,i=a(n),m.isMoved=!1,u=+new Date);
}
function t(n){
n.preventDefault(),n.stopPropagation(),!l&&g&&(r=a(n),h=r-i,e(),Math.abs(h)>6&&(m.isMoved=!0));
}
function o(){
l||(g=!1,s());
}
function a(n){
return n.touches&&n.touches.length>0?n.touches[0].clientX:n.clientX;
}
var i,r,u;
c.on("touchstart",n),c.on("mousedown",n),c.on("touchmove",t),c.on("mousemove",t),
c.on("touchend",o),c.on("mouseup",o);
}
function e(){
var n=m.WIDTH,t=-d*n+h,o=n/4;
t>o?t=o:u-o>t&&(t=u-o);
var e="translate3d("+t+"px, 0, 0)";
c.css({
webkitTransform:e,
transform:e
});
}
function s(){
var n=m.WIDTH,t=55,o=parseInt(h/n),e=h%n;
d-=o,Math.abs(e)>t&&(d-=Math.abs(e)/e*1),d>m.pageCount-1?d=m.pageCount-1:0>d&&(d=0),
h=0,a(d);
}
function a(n){
l=!0,f=-n*m.WIDTH,i(),e(),setTimeout(function(){
l=!1,r();
},T),v.activeNav(n);
}
function i(){
var n="all 0.3s ease";
c.css({
transition:n,
webkitTransition:n
});
}
function r(){
var n=c.el[0].style;
n.transition="",n.webkitTransition="";
}
var u,m=n("appmsg/emotion/common.js"),p=n("appmsg/emotion/dom.js"),t={},c=p("#js_slide_wrapper"),f=0,v=n("appmsg/emotion/nav.js"),l=!1,d=0,g=!1,h=0;
t.init=function(){
u=-m.wrapperWidth+m.WIDTH,o();
var n="translate3d(0, 0, 0)";
c.css({
webkitTransform:n,
transform:n
});
};
var T=300;
return t;
});define("pages/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var o="number"!=typeof t.retry?1:t.retry,n=document.createElement("script"),r=t.type||"JSONP",a=document.head||document.getElementsByTagName("head")[0]||document.documentElement,d=t.callbackName,i="uninitialized",c="undefined"==typeof t.successCode?200:t.successCode,u="undefined"==typeof t.timeoutCode?500:t.timeoutCode,l="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,s=!1,f=null;
"JSONP"!=r&&"JS"!=r&&(r="JSONP");
var m="";
m="JSONP"==r?t.url+"&t="+Math.random():t.url;
var p=function(e){
n&&!s&&(s=!0,f&&(clearTimeout(f),f=null),n.onload=n.onreadystatechange=n.onerror=null,
a&&n.parentNode&&a.removeChild(n),n=null,d&&-1==d.indexOf(".")&&(window[d]=null),
"JS"==r&&e==c&&"loaded"==i&&"function"==typeof t.callback?t.callback():e!=c&&"loaded"!=i&&"function"==typeof t.onerror&&t.onerror(e));
};
if(d&&"function"==typeof t.callback&&"JSONP"==r){
var y=d;
-1==d.indexOf(".")&&(d=window[d]?d+e.counter++:d,window[d]=function(){
i="loaded",t.callback.apply(null,arguments);
}),m=m.replace("="+y,"="+d);
}
n.onload=n.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&("JS"==r&&(i="loaded"),
p("loaded"==i?c:l));
},n.onerror=function(){
return o>0?(t.retry=o-1,f&&(clearTimeout(f),f=null),void e(t)):void p(l);
},t.timeout&&(f=setTimeout(function(){
p(u);
},parseInt(t.timeout,10))),i="loading",n.charset="utf-8",setTimeout(function(){
n.src=m;
try{
a.insertBefore(n,a.lastChild);
}catch(e){}
},0);
}
return e;
});define("pages/music_report_conf.js",[],function(){
"use strict";
return{
m_pv:"28306_0",
m_wx_pv:"28306_1",
m_h5_pv:"28306_2",
m_unload_wx_pv:"28306_3",
v_pv:"28306_4",
v_wx_pv:"28306_5",
v_h5_pv:"28306_6",
v_unload_wx_pv:"28306_7",
force_h5:"28306_30",
m_h5_err_total:"28306_31",
m_h5_err_1:"28306_32",
m_h5_err_2:"28306_33",
m_h5_err_3:"28306_34",
m_h5_err_4:"28306_35",
m_h5_err_5:"28306_36",
v_h5_err_total:"28306_37",
v_h5_err_1:"28306_38",
v_h5_err_2:"28306_39",
v_h5_err_3:"28306_40",
v_h5_err_4:"28306_41",
v_h5_err_5:"28306_42",
m_wx_pv_2:"28306_43",
v_wx_pv_2:"28306_44",
m_wx_pv_1:"28306_50",
v_wx_pv_1:"28306_55",
m_wx_err_1:"28306_58",
m_wx_err_2:"28306_59",
v_wx_err_1:"28306_60",
v_wx_err_2:"28306_61",
v_stoped_android:"59288_1",
v_stoped_ios:"59288_0",
v_paused_android:"59288_7",
v_paused_ios:"59288_6",
m_stoped_android:"59288_3",
m_stoped_ios:"59288_2",
m_paused_android:"59288_9",
m_paused_ios:"59288_8",
k_stoped_android:"59288_5",
k_stoped_ios:"59288_4",
k_paused_android:"59288_11",
k_paused_ios:"59288_10",
k_pv:"28306_66",
k_wx_pv:"28306_67",
k_h5_pv:"28306_69",
k_unload_wx_pv:"28306_71",
k_h5_err_total:"28306_72",
k_h5_err_1:"28306_74",
k_h5_err_2:"28306_75",
k_h5_err_3:"28306_76",
k_h5_err_4:"28306_77",
k_h5_err_5:"28306_78",
k_wx_pv_1:"28306_79",
k_wx_pv_2:"28306_81",
k_wx_err_1:"28306_83",
k_wx_err_2:"28306_85",
aac_pv:"28306_104",
ios_aac_err_1:"28306_106",
ios_aac_err_2:"28306_108",
android_aac_err_1:"28306_110",
android_aac_err_2:"28306_112",
v_seek_err:"28306_114",
android_aac_err_3:"28306_116",
ios_aac_err_3:"28306_118",
QMClient_pv:"62866_0",
QMClient_play:"62866_1",
QMClient_js_num:"62866_2",
QMClient_js_suc:"62866_3",
QMClient_js_err:"62866_5",
QMClient_js_timeout:"62866_7",
QMClient_js_network:"62866_9"
};
});define("pages/report.js",["biz_wap/utils/ajax.js","pages/version4video.js"],function(e){
"use strict";
function i(e){
var i=["/mp/pagereport?type=","undefined"==typeof e.type?1:e.type,"&comment_id=",e.comment_id||"","&voiceid=",e.voiceid||"","&action=",e.action,"&__biz=",top.window.biz||"","&mid=",top.window.mid||"","&idx=",top.window.idx||"","&scene=",e.scene||"","&uin=",top.window.uin||"","&key=",top.window.key||"","&pass_ticket=",top.window.pass_ticket||"","&t=",Math.random(),"#wechat_redirect"].join(""),t=new Image;
t.src=i;
}
function t(e){
s({
type:"POST",
url:"/mp/videoreport?#wechat_redirect",
timeout:2e4,
async:!1,
data:e.data
});
}
function o(e){
for(var i=JSON.parse(JSON.stringify(e.data)),t=[],o=0,n=i.seek_position.length;n>o;o++){
var a=i.seek_position[o];
if(a&&a.length>0){
var d=a.join("#");
t.push(d||"");
}else t.push("");
}
i.seek_position=t;
for(var r=[],o=0,n=i.seek_loaded.length;n>o;o++){
var a=i.seek_loaded[o];
if(a&&a.length>0){
var d=a.join(",");
r.push(d||"");
}else r.push("");
}
i.seek_loaded=r;
for(var p=[],c=30;i.musicid.length>0;){
var a={};
for(var o in i)i.hasOwnProperty(o)&&("[object Array]"==Object.prototype.toString.call(i[o])?(a[o]=i[o].splice(0,c),
a[o]=a[o].join("mtitle"==o?";#":";")):a[o]=i[o]);
p.push(a);
}
for(var o=0;o<p.length;o++)s({
type:"POST",
url:"/mp/musicreport?#wechat_redirect",
timeout:2e4,
async:!0,
data:p[o]
});
}
function n(e){
document.domain="qq.com";
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(top.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&val=","undefined"!=typeof e.val?e.val:"","&val1=","undefined"!=typeof e.val1?e.val1:"","&vurl=",encodeURIComponent(e.vurl),"&t=",Math.random(),"&url=",t,"&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
function a(e){
if(3==e.step||6==e.step||1999==e.step){
document.domain="qq.com";
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(top.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=",e.step,"&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&loadwait=","undefined"!=typeof e.loadwait?e.loadwait:"","&val=","undefined"!=typeof e.val?e.val:"","&t=",Math.random(),"&url=",t,"undefined"!=typeof e.vt&&""!==e.vt&&6==e.step?"&vt="+e.vt:"","&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
}
function d(){
var e=_.device;
return e.ipad?60101:e.is_android_phone?60301:e.iphone?60401:e.is_android_tablet?60501:"";
}
function r(){
var e=_.device;
return e.ipad?"v4010":e.is_android_phone&&_.isUseProxy()?"v5060":e.is_android_phone?"v5060":e.iphone&&_.isUseProxy()?"v3060":e.iphone?"v3060":e.is_android_tablet?"v6010":"";
}
function p(e){
var i={
mid:window.mid||0,
__biz:window.biz||0,
idx:window.idx||0,
musicid:[],
hasended:[],
commentid:[],
scene_type:e.type||0,
mtitle:[],
detail_click:[],
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
errorcode:[],
seek:[],
seek_position:[],
duration2:[],
play_duration2:[],
play_last_time:[],
local_time:[],
seek_loaded:[]
};
return i;
}
function c(){
var e={
videoerror:0,
like_kv_vid:"",
like_click_vid:"",
like_kv_alginfo:"",
like_click_alginfo:"",
tad:"",
page:0,
like_click_type:0,
iplat:2,
ptype:1,
rtype:"",
getvinfo_ret:-1,
getvinfo_time:0,
v_err_code:0,
loadwait:0,
hasended:0,
last_ms:0,
duration_ms:0,
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
mid:"",
__biz:"",
idx:"",
detail_click:0,
vtitle:"",
vid:"",
commentid:"",
scene_type:"",
replay:0,
full_screen:0,
quick_play:0,
ad_play_time:-1,
video_play_time:-1,
click_play_button:0,
traceid:"",
webviewid:"",
orderid:0,
play_time:0,
client_time_when_play:0,
drag_times:"",
pause_num:0,
h5_profile:0,
to_article:0,
desc_more_click:0,
desc_more_show:0,
fromid:0,
openid:window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",
file_size:0,
rate:0,
resolution:0,
format:"",
vt:"",
video_ext:"unknown"
};
return e;
}
function l(e,i,t){
var o=0,n=[],a={};
if(i&&"[object String]"==Object.prototype.toString.call(i))o=1,"img"==t&&(i=encodeURIComponent(i)),
n.push("log0="+i),a.log0=i;else if(i&&"[object Array]"==Object.prototype.toString.call(i)){
o=i.length;
for(var d=0;o>d;d++){
var r="img"==t?encodeURIComponent(i[d]):i[d];
n.push("log"+d+"="+r),a["log"+d]=r;
}
}
if("img"==t){
var p=new Image,c="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e;
o>0&&(c+="&lc="+o+"&"+n.join("&")),c+="&t="+Math.random(),p.src=c;
}else{
var l={};
o>0&&(l=a),l.idkey=e,l.lc=o,s({
type:"POST",
url:"//mp.weixin.qq.com/mp/jsmonitor?",
timeout:1e4,
data:l,
dataType:"json"
});
}
}
var s=e("biz_wap/utils/ajax.js"),_=e("pages/version4video.js");
return{
report:i,
videoreport:t,
getPlatformType:d,
getsdtfrom:r,
getinfoReport:n,
qqvideo_common_report:a,
musicreport:o,
getMusicReportData:p,
getVideoReportData:c,
logReport:l
};
});define("pages/player_adaptor.js",["pages/music_player.js","biz_common/utils/monitor.js","pages/loadscript.js","pages/music_report_conf.js"],function(t){
"use strict";
function i(t,i){
0!=t.type&&1!=t.type||!p.inQMClient?"function"==typeof i.callback&&i.callback(new a.init(t)):(p.initPlayerQueue.push(n("QMClient",t,i)),
e("QMClient"));
}
function n(t,i,n){
var e=p.config[t].func;
return function(t,i,n,e){
return function(){
"function"==typeof window[i]?"function"==typeof e.callback&&e.callback(new r(n,{
type:t
})):"function"==typeof e.callback&&e.callback(new a.init(n));
};
}(t,e,i,n);
}
function e(t){
var i=p.config[t];
if(1!=i.jsLoadState){
if(2==i.jsLoadState||3==i.jsLoadState)return void s();
i.jsLoadState=1;
var n=+new Date,e=l[t+"_js_num"];
e&&(e=e.split("_"),c.setSum(e[0],e[1],1),c.send()),u({
url:i.jsLink,
timeout:1e4,
type:"JS",
callback:function(){
+new Date-n;
2==i.jsLoadState,s();
var e=l[t+"_js_suc"];
e&&(e=e.split("_"),c.setSum(e[0],e[1],1),c.send());
},
onerror:function(e){
+new Date-n;
i.jsLoadState=3,s();
var o=l[t+"_js_err"],r=l[t+"_js_timeout"],a=l[t+"_js_network"];
if(o&&r&&a){
switch(o=o.split("_"),r=r.split("_"),a=a.split("_"),c.setSum(o[0],o[1],1),1*e){
case 400:
c.setSum(a[0],a[1],1);
break;

case 500:
c.setSum(r[0],r[1],1);
}
c.send();
}
}
});
}
}
function s(){
for(var t=0,i=p.initPlayerQueue.length;i>t;t++)"function"==typeof p.initPlayerQueue[t]&&p.initPlayerQueue[t]();
p.initPlayerQueue=[];
}
function o(){
for(var t in p.config)"function"==typeof p[t+"EvInit"]&&p[t+"EvInit"]();
}
function r(t,i){
if(this.opt=t,this.opt2=i,this._g={
_blockPlugin:{},
playType:"-1"
},"QMClient"==i.type&&p.inQMClient){
var n=p.config[i.type];
n.playerObj||(p.config[i.type].playerObj=new window[n.func]),this._g.playType=i.type,
this.player=n.playerObj,this._initPlugins(),this._bindQMEvent();
}
}
var a=t("pages/music_player.js"),c=t("biz_common/utils/monitor.js"),u=t("pages/loadscript.js"),l=t("pages/music_report_conf.js"),p={
debug:location.href.indexOf("_qqclient=1")>0?!0:!1,
config:{
QMClient:{
func:"Player",
playerObj:null,
jsLink:"https://imgcache.qq.com/music/h5/player/player.js?max_age=604800&v=1",
jsLoadState:-1
}
},
inQMClient:!1,
initPlayerQueue:[]
};
return p.QMClientEvInit=function(){
if(p.inQMClient=window.navigator.userAgent.indexOf("QQMusic/")>0||p.debug?!0:!1,
p.inQMClient&&window.msg_cdn_url&&window.msg_title){
var t=window.location.href,i=a.getQuery("scene",t);
i&&(t=t.replace("&scene="+i,"").replace("?scene="+i,"")),t=t.replace(/#rd$/,"").replace(/#wechat_redirect$/,""),
-1==t.indexOf("?")&&(t+="?"),t+="&scene=112#wechat_redirect";
var n=function(t){
window.WebViewJavascriptBridge?t():document.addEventListener("WebViewJavascriptBridgeReady",t);
},e=(window.msg_title||"").html(!1),s=(window.msg_desc||"").html(!1);
n(function(){
M.client.invoke("ui","setActionBtn",{
type:"icon",
content:"share"
},function(){
M.client.invoke("other","callShareWeb",{
imgUrl:window.msg_cdn_url,
link:t,
title:e,
desc:s
});
});
});
}
},o(),r.prototype={
_initPlugins:function(){
this.opt.plugins||(this.opt.plugins=[]);
for(var t=this.opt.plugins,i=0,n=t.length;n>i;++i){
var e=t[i];
e.setPlayer(this),!!e.init&&e.init();
}
},
_trigger:function(t,i){
var n=this.opt,e=this._g,s=n.plugins,o=e._blockPlugin[t]||e._blockPlugin.all,r=0;
if(o&&"function"==typeof o.recv&&(r|=o.recv(t,i),1&r))return!1;
for(var a=0,c=s.length;c>a&&(r|=s[a].recv(t,i),!(2&r));++a);
if(!(4&r)){
var u=this["__"+t+"Handler"];
u&&u.call(this,i);
}
8&r||this.__triggerOutside(t,i);
},
__triggerOutside:function(){
var t=arguments,i=t[0];
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var n=this.opt["on"+i];
"function"==typeof n&&n.apply(this,t);
}
},
_setBlockPlugin:function(t,i){
this._g._blockPlugin[t]=i;
},
_bindQMEvent:function(){
var t=this;
this.player.on("play",function(i){
i&&i.song&&i.song.mid==t.opt.mid?(t._trigger("statusChange",1),t._trigger("QMClientPlay")):t._trigger("statusChange",3);
}),this.player.on("pause",function(i){
i&&i.song&&i.song.mid==t.opt.mid&&t._trigger("statusChange",2);
}),this.player.on("stop",function(i){
i&&i.song&&i.song.mid==t.opt.mid&&t._trigger("statusChange",3);
});
},
play:function(){
"QMClient"==this._g.playType&&this.player.play(this.opt.mid);
},
pause:function(){
this.player.pause();
},
stop:function(){
this.player.stop();
},
getDuration:function(){
return this.opt.duration?this.opt.duration:"QMClient"==this._g.playType?this.player.duration||0:0;
},
getCurTime:function(){
return"QMClient"==this._g.playType?this.player.currentTime||0:0;
},
surportSeekRange:function(){
return!1;
},
getSrc:function(){
return"";
},
destory:function(){},
seek:function(){},
setDuration:function(){},
setSrc:function(){}
},{
create:i,
inQMClient:p.inQMClient
};
});define("pages/music_player.js",["biz_wap/utils/mmversion.js","pages/report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/version4video.js","biz_common/utils/monitor.js","appmsg/log.js"],function(t){
"use strict";
function e(){
b.hasInit||(b.hasInit=!0,p(),d(),u());
}
function o(t){
e(),this._o={
plugins:[],
protocal:"",
wxIndex:0,
type:0,
src:"",
jsapi2Src:"",
mid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:"",
musicbar_url:"",
fileSize:0,
onStatusChange:function(){},
onTimeupdate:function(){},
onError:function(){},
onUpdateSeekRange:function(){}
},this._extend(t),this._status=-1,this._g={
mutexKey:"",
jsapiSrcId:"",
hasCheckPlay:!1,
playTimeoutId:null,
stateChangeCallback:{},
_blockPlugin:{},
hasInitH5Event:!1,
h5Event:{},
totalPlayTime:0
},this._initPlugins(),this._fixAndroidSizeLimit(),0!==b.surportType&&(this._initData(),
this._synPlayStatus());
}
function i(t){
S.invoke("musicPlay",{
app_id:"a",
title:"微信公众平台",
singer:"微信公众平台",
epname:"微信公众平台",
coverImgUrl:"http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
dataUrl:b.ev,
lowbandUrl:b.ev,
webUrl:"http://mp.weixin.qq.com/s?"
},function(e){
"function"==typeof t&&t(e);
});
}
function a(t){
n({
cur:t,
stopCur:!1
});
}
function n(t){
function e(){
if(b.mutexCount==s&&(s=0,b.mutexCount=0,"function"==typeof a)){
var t=0;
1==b.surportType?t=2e3:3==b.surportType&&(t=0),setTimeout(function(){
a();
},t);
}
}
if(0!=b.mutexCount)return void setTimeout(function(){
n(t);
},200);
var o=t.cur,i=t.stopCur===!0?!0:!1,a=t.callback,s=0;
for(var r in b.mutexPlayers)for(var u=0,p=b.mutexPlayers[r].length;p>u;u++)s++;
for(var r in b.mutexPlayers)for(var u=0,p=b.mutexPlayers[r].length;p>u;u++){
var c=b.mutexPlayers[r][u];
if(c&&c!==o){
var l=c.getSurportType(),d="";
2!=l||1!=c._status&&4!=c._status?1!=l&&3!=l||1!=c._status&&2!=c._status&&4!=c._status||(d="stop"):d=c._o.allowPause?"pause":"stop",
d&&"function"==typeof c[d]?c[d](i,function(){
b.mutexCount++,e();
}):(b.mutexCount++,e());
}else b.mutexCount++,e();
}
}
function s(){
return b.surportType;
}
function r(t){
return new o(t);
}
function u(){
b.surportType>0&&b.isAndroidLow&&window.addEventListener("canplay",function(t){
t.target&&"function"==typeof t.target.play&&t.target.play();
},!0);
}
function p(){
b.jsapiGlobalEvent={
error:_,
pause:y,
stop:h,
play:g,
preempted:h,
waiting:f
};
}
function c(t){
return"&"+b.wxtag+"="+t;
}
function l(t,e){
e=e||"info";
var o="[musicplay]"+t+"[location:"+location.href+"]";
A(o,e);
}
function d(){
S.on("onBackgroundAudioStateChange",function(t){
if(!!b.debug&&console.log("onBackgroundAudioStateChange log:"+JSON.stringify(t||{})),
t.src&&t.state){
var e=P(b.wxtag,t.src)||"";
e&&(e=c(e));
var o=b.mutexPlayers[t.src]||b.mutexPlayers2[t.src]||b.mutexPlayers[e];
if(o){
var i;
if(t.srcId)for(var a=0,n=o.length;n>a;a++)o[a]._g.jsapiSrcId==t.srcId&&(i=o[a]);else if(1==o.length)i=o[0];else for(var a=0,n=o.length;n>a;a++)if(-1!=o[a]._status&&0!=o[a]._status&&3!=o[a]._status){
i=o[a];
break;
}
if(i&&i._g.stateChangeCallback){
var s=t.state;
"ended"==s&&(s="stop"),"wait"==s&&(s="waiting");
var r=!1,u=JSON.stringify(t||{});
if("error"==s){
i.jsapiLog("onBackgroundAudioStateChange error;res:"+u);
for(var p in i._g.stateChangeCallback)i._g.stateChangeCallback.hasOwnProperty(p)&&"function"==typeof i._g.stateChangeCallback[p]&&(r=!0,
i._g.stateChangeCallback[p](-1,t.errMsg||""),i._g.stateChangeCallback[p]=null);
}else"function"==typeof i._g.stateChangeCallback[s]&&(b.debug&&console.log("excute stateChangeCallback :"+s),
i.jsapiLog("onBackgroundAudioStateChange "+s+";res:"+u),r=!0,i._g.stateChangeCallback[s](0),
i._g.stateChangeCallback[s]=null);
r||"function"!=typeof b.jsapiGlobalEvent[s]||(i.jsapiLog("onBackgroundAudioStateChange "+s+" unHandle;res:"+u),
b.jsapiGlobalEvent[s](t,i));
}
}
}
});
}
function _(t,e){
e.stop(!1),e._trigger("jsapi2PlayingErr");
}
function h(t,e){
e.stop(!1),e._trigger("jsapi2PlayingStop");
}
function y(t,e){
e.pause(!1,null,!0),e._trigger("jsapi2PlayingPause");
}
function g(t,e){
1!=e._status&&e.resume(!1,null,!0);
}
function f(t,e){
e.onload();
}
function m(){
for(var t in b.mutexPlayers)if(b.mutexPlayers.hasOwnProperty(t))for(var e=0,o=b.mutexPlayers[t].length;o>e;e++){
var i=b.mutexPlayers[t][e];
if(i&&1==i._status&&(1==i._surportType||3==i._surportType)){
i._trigger("unloadPlaying");
break;
}
}
}
function P(t){
var e=arguments[1]||window.location.search,o=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),i=e.substr(e.indexOf("?")+1).match(o);
return null!=i?i[2]:"";
}
function T(t,e,o){
function i(t,e){
for(;b.synPlayStatusArr.length>0;){
var o=b.synPlayStatusArr.shift();
o&&"function"==typeof o[t]&&o[t](e);
}
}
b.synPlayStatusArr.push({
_t:t,
onSuccess:e,
onError:o
}),b.synPlayStatusId&&clearTimeout(b.synPlayStatusId),b.synPlayStatusId=setTimeout(function(){
t._jsapi_getMusicPlayerState({
onSuccess:function(t){
i("onSuccess",t);
},
onError:function(t){
i("onError",t);
}
});
},0);
}
document.domain="qq.com";
var v=t("biz_wap/utils/mmversion.js"),S=(t("pages/report.js"),t("biz_common/dom/event.js"),
t("biz_wap/jsapi/core.js")),k=t("pages/version4video.js"),A=(t("biz_common/utils/monitor.js"),
t("appmsg/log.js")),b={
hasInit:!1,
synPlayStatusId:null,
synPlayStatusArr:[],
inWechat:!k.device.inWechat||k.device.inWindowWechat||k.device.inMacWechat?!1:!0,
mutexCount:0,
ev:0!=window._empty_v.indexOf(window.location.protocol)?"http:"+window._empty_v:window._empty_v,
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
_playtype:1*P("_playtype")||0,
isAndroidLow:/android\s2\.3/i.test(navigator.userAgent),
isAndroid:v.isAndroid,
surportType:"addEventListener"in window?2:0,
mutexPlayers:{},
mutexPlayers2:{},
wxtag:"__wxtag__"
};
return o.prototype._initPlugins=function(){
for(var t=this._o.plugins,e=0,o=t.length;o>e;++e){
var i=t[e];
i.setPlayer(this),!!i.init&&i.init();
}
},o.prototype._trigger=function(t,e){
var o=this._o,i=this._g,a=o.plugins,n=i._blockPlugin[t]||i._blockPlugin.all,s=0;
if(n&&"function"==typeof n.recv&&(s|=n.recv(t,e),1&s))return!1;
for(var r=0,u=a.length;u>r&&(s|=a[r].recv(t,e),!(2&s));++r);
if(!(4&s)){
var p=this["__"+t+"Handler"];
p&&p.call(this,e);
}
8&s||this.__triggerOutside(t,e);
},o.prototype.__triggerOutside=function(){
var t=arguments,e=t[0];
if(e){
e=e.substr(0,1).toUpperCase()+e.substr(1);
var o=this._o["on"+e];
"function"==typeof o&&o.apply(this,t);
}
},o.prototype._setBlockPlugin=function(t,e){
this._g._blockPlugin[t]=e;
},o.prototype._synPlayStatus=function(){
function t(t){
if(n&&clearTimeout(n),a.hasCheckPlay===!0)return void console.log("ios8 synPlayStatusSuccess hasCheckPlay");
if(a.hasCheckPlay=!0,o._surportType=3,b.surportType=3,!!b.debug&&console.log("_synPlayStatus mutexKey:"+a.mutexKey),
t.src&&(i.src==t.src||t.src.indexOf(a.mutexKey)>=0)){
if(t.srcId){
if(t.srcId!=a.jsapiSrcId)return;
}else if(b.mutexPlayers[a.mutexKey].length>1&&b.mutexPlayers[a.mutexKey][0]!==o)return;
o._initJsapiData({
curTime:t.currentTime,
bufferedPercent:t.bufferedPercent,
starTime:+new Date-1e3*t.currentTime
}),o._trigger("jsapi2Begin2Play",t);
var e=o.jsApiData,s="waiting"==t.playState||"seeked"==t.playState||"seeking"==t.playState||"play"==t.playState;
!t.paused||s?(o._onPlay(),o._analogUpdateTime()):(o._onTimeupdate(null,e.curTime),
o._onPause()),o._getMusicPlayerState();
}
}
function e(){
console.log("ios8 synPlayStatusError"),n&&clearTimeout(n),a.hasCheckPlay!==!0&&(a.hasCheckPlay=!0,
o._o.autoPlay&&o.play());
}
var o=this,i=this._o,a=this._g;
if(!b.inWechat||1*b._playtype>0)return a.hasCheckPlay=!0,void(o._o.autoPlay&&o.play());
var n;
T(o,t,e);
var s=+new Date;
console.log("starTime",s,i.syncTimeout),n=setTimeout(function(){
console.log("ios8 timeout error",+new Date-s),e();
},i.syncTimeout||1e4);
},o.prototype._fixAndroidSizeLimit=function(){
if(!(1*b._playtype>0)&&b.isAndroid){
var t=this._o;
!t.fileSize||t.fileSize>300||v.gtVersion("6.3.28",!0)||(this._trigger("androidForceH5"),
this._g._playtype=2);
}
},o.prototype._createAutoAndPlay=function(){
function t(){
e._trigger("h5Begin2Play"),e._h5Audio=document.createElement("audio"),e._initH5Data(!0),
e._H5bindEvent(!0),e._h5Audio.setAttribute("style","height:0;width:0;display:none"),
e._h5Audio.setAttribute("autoplay",""),e._status=0,e._onLoading(),b.isAndroidLow?(e._h5Audio.src=e._o.src,
document.body.appendChild(e._h5Audio),e._h5Audio.load()):(document.body.appendChild(e._h5Audio),
setTimeout(function(){
e._h5Audio.src=e._o.src,e._h5Audio.play();
},0)),e._surportType=2;
}
var e=this;
b.inWechat?this._stopJsapiPlay(!0,function(){
t();
}):t();
},o.prototype._destoryH5Audio=function(){
this._h5Audio&&(-1!=this._status&&"function"==typeof this._h5Audio.pause&&this._h5Audio.pause(),
document.body.removeChild(this._h5Audio),this._h5Audio=null,this._status=-1);
},o.prototype._onLoading=function(t){
this._status=4;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onPlay=function(t){
this._status=1;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._startCountTime();
},o.prototype._onPause=function(t){
this._status=2,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onEnd=function(t){
this._status=3,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onLoadedmetadata=function(t){
"function"==typeof this._o.onLoadedmetadata&&this._o.onLoadedmetadata.call(this,t||{});
},o.prototype._onUpdateSeekRange=function(t){
this.surportSeekRange()&&(t=Math.max(t,0),t=Math.min(t,100),"function"==typeof this._o.onUpdateSeekRange&&this._o.onUpdateSeekRange.call(this,t));
},o.prototype._onTimeupdate=function(t,e){
"function"==typeof this._o.onTimeupdate&&this._o.onTimeupdate.call(this,t||{},e),
e>0&&this._startCountTime();
},o.prototype._onError=function(t,e){
this._status=-1,"function"==typeof this._o.onError&&this._o.onError.call(this,t||{},e);
},o.prototype._initH5Event=function(){
var t=this,e=this._o,o=this._g;
if(!t._g.hasInitH5Event){
t._g.hasInitH5Event=!0;
var i=o.h5Event;
i.canplaythrough=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 canplaythrough"),t._h5Data.firstCanplaythrough=!0,
t._onPlay(e),t._onUpdateSeekRange(t._h5Data.downloadDuration||0));
},i.play=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),t._h5Data.firstCanplaythrough===!0&&(t._onPlay(e),
t._onUpdateSeekRange(t._h5Data.downloadDuration||0)));
},i.ended=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 ended"),t._onUpdateSeekRange(t._h5Data.downloadDuration),
t._onEnd(e));
},i.pause=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 pause"),t._o.allowPause!==!0||0==t._h5Audio.currentTime?t._onEnd(e):t._onPause(e));
},i.waiting=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e));
};
var a,n=100;
i.seeking=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e),
a=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),a=null,t._trigger("seekNeed2Load");
},n));
},i.seeked=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 seeked"),(1==t._status||2==t._status||4==t._status)&&(t._onPlay(e),
t._h5Audio.play()),a&&(clearTimeout(a),a=null,t._trigger("seekNotNeed2Load")));
},i.error=function(e){
var o=1*e.target.error.code||5;
(1>o||o>5)&&(o=5),t._trigger("h5Error",{
code:o
}),t._onError(e,{
type:1,
code:o
}),t._destoryH5Audio();
},i.timeupdate=function(o){
t._h5Audio&&((1==t._status||4==t._status)&&t._onUpdateSeekRange(t._getH5DownloadDuration()),
1==t._status&&t._onTimeupdate(o,t._h5Audio.currentTime),"undefined"!=typeof e.duration&&1*e.duration>0&&t._h5Audio.currentTime>=e.duration&&t._h5Stop());
},i.loadedmetadata=function(e){
t._h5Audio&&t._onLoadedmetadata(e);
};
}
},o.prototype._H5bindEvent=function(t){
var e=(this._o,this._g),o={
canplaythrough:"canplaythrough",
play:"play",
playing:"play",
ended:"ended",
pause:"pause",
seeking:"seeking",
waiting:"waiting",
seeked:"seeked",
error:"error"
};
try{
for(var i in o)o.hasOwnProperty(i)&&this._h5Audio.removeEventListener(i,e.h5Event[o[i]]);
this._h5Audio.removeEventListener("timeupdate",e.h5Event.timeupdate),this._h5Audio.removeEventListener("loadedmetadata",e.h5Event.loadedmetadata);
}catch(a){}
if(t){
for(var i in o)o.hasOwnProperty(i)&&this._h5Audio.addEventListener(i,e.h5Event[o[i]],!1);
"function"==typeof this._o.onTimeupdate&&this._h5Audio.addEventListener("timeupdate",e.h5Event.timeupdate,!1),
"function"==typeof this._o.onLoadedmetadata&&this._h5Audio.addEventListener("loadedmetadata",e.h5Event.loadedmetadata,!1);
}
},o.prototype._initData=function(){
var t=this._o;
this._createMutexKey(),b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this],
t.jsapi2Src&&t.jsapi2Src!=t.src&&(b.mutexPlayers2[t.jsapi2Src]?b.mutexPlayers2[t.jsapi2Src].push(this):b.mutexPlayers2[t.jsapi2Src]=[this]),
this._initH5Event();
},o.prototype._createMutexKey=function(){
var t=this._o.mid||"";
this._o.src?(this._g.mutexKey=this._o.src,this._g.jsapiSrcId=b.wxtag+"_"+this._o.wxIndex):(this._g.mutexKey=c(t),
this._g.jsapiSrcId=this._g.mutexKey+"_"+this._o.wxIndex);
},o.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},o.prototype._initH5Data=function(t){
this._h5Data={
firstCanplaythrough:t===!0?!1:!0,
downloadDuration:0,
lastPlaytime:null
};
},o.prototype._initJsapiData=function(t){
t=t||{},this.jsApiData&&(this.jsApiData.updateTimeoutId&&clearTimeout(this.jsApiData.updateTimeoutId),
this.jsApiData.getStatusId&&clearTimeout(this.jsApiData.getStatusId)),this.jsApiData={
getStatusId:null,
getStatusTime:t.getStatusTime||2500,
updateTimeoutId:null,
seeking:!1,
starTime:t.starTime||+new Date,
curTime:t.curTime||0,
bufferedPercent:t.bufferedPercent||0,
duration:this._o.duration||void 0,
lastPlaytime:null
};
},o.prototype._getMusicPlayerState=function(){
var t=this,e=t._o,o=t.jsApiData;
o&&o.getStatusId&&clearTimeout(o.getStatusId),t._jsapi_getMusicPlayerState({
onSuccess:function(i){
i.src==e.src&&(o.curTime=i.currentTime,o.starTime=+new Date-1e3*i.currentTime,o.bufferedPercent=i.bufferedPercent,
(1==t._status||2==t._status)&&(o.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},o.getStatusTime)),t._onUpdateSeekRange(o.bufferedPercent),1==i.paused&&1==t._status?(b.debug&&console.log("_getMusicPlayerState force syn"),
t._pauseJsapiPlay(!1)):0==i.paused&&2==t._status&&(b.debug&&console.log("_getMusicPlayerState force syn"),
t._resumeJsapiPlay(!1))),t._o.onMusicPlayerInfo&&t._o.onMusicPlayerInfo(i);
},
onError:function(){
o.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},o.getStatusTime);
}
});
},o.prototype._analogUpdateTime=function(){
var t=this,e=t.jsApiData;
if(e){
if(e.updateTimeoutId&&clearTimeout(e.updateTimeoutId),1==t._status){
if(e.curTime=1*((+new Date-e.starTime)/1e3).toFixed(2),e.curTime>=e.duration)return t._stopJsapiPlay(!1),
!0;
t._onTimeupdate(null,e.curTime);
}
return e.updateTimeoutId=setTimeout(function(){
t._analogUpdateTime();
},1e3),!1;
}
},o.prototype._jsapi_getMusicPlayerState=function(t){
var e=this._o;
S.invoke("getBackgroundAudioState",{},function(o){
if(!!b.debug&&console.log("getBackgroundAudioState log:"+JSON.stringify(o||{})),
/:ok$/.test(o.err_msg)){
if(o.paused=1*o.paused,o.currentTime=o.currentTime?(1*o.currentTime).toFixed(2):0,
o.buffered){
var i=Math.floor(o.buffered/e.duration*100);
i=Math.max(i,0),i=Math.min(i,100),o.bufferedPercent=i;
}else o.bufferedPercent=0;
"function"==typeof t.onSuccess&&t.onSuccess(o);
}else"function"==typeof t.onError&&(console.log("get err invoke err",o),t.onError(o));
});
},o.prototype._jsapi_musicPlay=function(t){
if(this._h5Audio&&this._destoryH5Audio(),2==b._playtype)return void("function"==typeof t.onError&&t.onError({}));
var e=this,o=this._o;
this.jsapiLog("jsapi_musicPlay"),S.invoke("musicPlay",{
app_id:"a",
title:o.title,
singer:o.singer,
epname:o.epname,
coverImgUrl:o.coverImgUrl,
dataUrl:o.src,
lowbandUrl:o.src,
webUrl:o.webUrl
},function(i){
!!b.debug&&console.log("playlog:"+JSON.stringify(i||{})),i.err_msg.indexOf("ok")>=0?(e._trigger("jsapi1Begin2Play"),
e._surportType=1,b.surportType=1,e._initJsapiData(),e._onPlay(),"undefined"!=typeof o.duration&&1*o.duration>0&&e._analogUpdateTime(),
e._onUpdateSeekRange(0),"function"==typeof t.onSuccess&&t.onSuccess(i)):"function"==typeof t.onError&&t.onError(i);
});
},o.prototype._jsapi_setBackgroundAudioState=function(t){
if(this._h5Audio&&this._destoryH5Audio(),console.log("_playtype",b._playtype),1*b._playtype>0){
if("function"==typeof t.onError){
var e={};
e.err_code=1,t.onError(e);
}
}else{
var o=this,i=this._o,a=o._g;
console.log("invoke set setBackgroundAudioState with param",i),this.jsapiLog("jsapi_setBackgroundAudioState"),
S.invoke("setBackgroundAudioState",{
protocol:i.protocal||"",
src:i.jsapi2Src||i.src,
lowbandUrl:i.jsapi2Src||i.src,
title:i.title,
epname:i.epname,
singer:i.singer,
srcId:a.jsapiSrcId,
coverImgUrl:i.coverImgUrl,
webUrl:i.webUrl,
musicbar_url:i.musicbar_url||""
},function(e){
!!b.debug&&console.log("setBackgroundAudioState log:"+JSON.stringify(e||{})),e.err_msg.indexOf("ok")>=0?("function"==typeof t.onSuccess&&t.onSuccess("waiting"),
a.stateChangeCallback.play=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("play"):0!=e&&"function"==typeof t.onError&&t.onError({
err_code:2,
err_msg:o||""
});
}):"function"==typeof t.onError&&(e=e||{},e.err_code=1,t.onError(e));
});
}
},o.prototype._jsapi_operateBackgroundAudio=function(t){
var e=this,o=(this._o,e._g),i=1*t.position||0;
this.jsapiLog("jsapi_operateBackgroundAudio;param:"+JSON.stringify(t||{})),S.invoke("operateBackgroundAudio",{
operationType:t.type,
currentTime:i
},function(e){
if(!!b.debug&&console.log("operateBackgroundAudio "+t.type+",position:"+i+", log:"+JSON.stringify(e||{})),
e.err_msg.indexOf("ok")>=0){
var a=t.type;
"seek"==a?(o.stateChangeCallback.seeking=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeking",i):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
},o.stateChangeCallback.seeked=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeked",i):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
}):o.stateChangeCallback[a]=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess():0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
};
}else"function"==typeof t.onError&&t.onError(e);
});
},o.prototype._jsapiPlay=function(){
{
var t=this;
this._o;
}
console.log("supporttype",b.surportType),1==b.surportType?this._jsapi_musicPlay({
onError:function(){
t._h5Play();
}
}):this._jsapi_setBackgroundAudioState({
onSuccess:function(e){
"waiting"===e?(t._trigger("jsapi2Begin2Play",e),t._initJsapiData(),t._surportType=3,
b.surportType=3,t._onLoading()):"play"===e&&(t._initJsapiData(),t._onPlay(),t._analogUpdateTime(),
t._getMusicPlayerState(),t._trigger("jsapi2PlaySuccess"));
},
onError:function(e){
e&&1==e.err_code?t._jsapi_musicPlay({
onError:function(){
t._h5Play();
}
}):(t._h5Play(),t._trigger("jsapi2Begin2PlayErr"));
}
});
},o.prototype._getJsapiDownloadSec=function(){
this._getMusicPlayerState();
var t=Math.floor(this._o.duration*this.jsApiData.bufferedPercent/100);
return!!b.debug&&console.log("downloadSec:"+t),t;
},o.prototype._jsapiSeek=function(t){
function e(){
a.seeking=!1,o._onPlay(),console.log("seek toPlay position is",b.seekingPosition),
a.starTime=+new Date-1e3*b.seekingPosition,o._analogUpdateTime(),o._getMusicPlayerState();
}
var o=this,i=this._g,a=(this._o,this.jsApiData),n=parseInt(t,10);
this._o.duration&&n>=this._o.duration&&(n=this._o.duration-1),a.getStatusId&&clearTimeout(a.getStatusId),
a.updateTimeoutId&&clearTimeout(a.updateTimeoutId),a.seekWaitId&&clearTimeout(a.seekWaitId),
a.seeking=!0;
var s,r,u=100;
b.seekingPosition=n,console.log("begin to seek to",n),this._jsapi_operateBackgroundAudio({
type:"seek",
position:n,
onError:function(){
o._trigger("seekErr"),!!b.debug&&console.log("seek callback fail"),a.seeking=!1,
o._analogUpdateTime(),o._getMusicPlayerState();
},
onSuccess:function(t,n){
console.log("jsapi seek res is ",t),"seeking"==t?(!!b.debug&&console.log("seeking callback success"),
a.seeking=!0,o._onLoading(),i.stateChangeCallback.play=function(){
!!b.debug&&console.log("seeked to play"),s&&clearTimeout(s),e(n);
},r=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),r=null,o._trigger("seekNeed2Load");
},u)):"seeked"==t&&(!!b.debug&&console.log("seeked callback success"),(2==o._status||4==o._status)&&v.cpVersion("6.6.0",-1)&&(s=setTimeout(function(){
!!b.debug&&console.log("setTimeout to play"),i.stateChangeCallback.play=null,o._resumeJsapiPlay(!0);
},1e3)),r&&(clearTimeout(r),r=null,o._trigger("seekNotNeed2Load")));
}
}),o._getMusicPlayerState();
},o.prototype._resumeJsapiPlay=function(t,e){
function o(t){
var e=i.jsApiData;
e.starTime=+new Date-1e3*e.curTime,i._onPlay(),i._analogUpdateTime(),i._getMusicPlayerState(),
"function"==typeof t&&t();
}
var i=this;
1==this._surportType?this._jsapiPlay():3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"play",
onError:function(){
i._stopJsapiPlay(!1,function(){
i.play();
});
},
onSuccess:function(){
o(e);
}
}):o(e));
},o.prototype._pauseJsapiPlay=function(t,e,o){
function i(t){
var e=a.jsApiData;
a._analogUpdateTime(),a._getMusicPlayerState(),e&&e.updateTimeoutId&&clearTimeout(e.updateTimeoutId),
e.updateTimeoutId=null,t===!0&&e&&e.getStatusId&&clearTimeout(e.getStatusId),1==a._status&&a._onPause();
}
var a=this;
return 2==a._status?(i(e),void("function"==typeof o&&o())):void(1==this._surportType?this._stopJsapiPlay(t,o):3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"pause",
onSuccess:function(){
i(e),"function"==typeof o&&o();
},
onError:function(){
a._stopJsapiPlay(!0,o);
}
}):(i(e),"function"==typeof o&&o())));
},o.prototype._stopJsapiPlay=function(t,e){
function o(t){
a._onTimeupdate(null,0),a._onUpdateSeekRange(0),a._onEnd(),a._initJsapiData(),"function"==typeof t&&t();
}
{
var a=this;
a.jsApiData;
}
t?1==a._surportType?i(function(){
o(e);
}):a._jsapi_operateBackgroundAudio({
type:"stop",
onSuccess:function(){
o(e);
},
onError:function(){
o(e);
}
}):o(e);
},o.prototype._getH5DownloadSec=function(){
var t=Math.floor(this._o.duration*this._getH5DownloadDuration()/100);
return!!b.debug&&console.log("h5 downloadSec:"+t),t;
},o.prototype._getH5DownloadDuration=function(){
if(!this._h5Audio)return 0;
if(this._h5Data.downloadDuration>=100)return 100;
var t=this._h5Audio.buffered,e=t.end(t.length-1);
return this._h5Data.downloadDuration=parseInt(e/this._o.duration*100,10),this._h5Data.downloadDuration;
},o.prototype._h5Play=function(){
0!==b.surportType&&(this.jsapiLog("h5Play"),this._h5Audio?(this._h5Audio.ended||this._h5Audio.paused)&&(this._trigger("h5Begin2Play"),
this._initH5Data(),this._onLoading(),this._H5bindEvent(!0),this._h5Audio.currentTime=0):this._createAutoAndPlay());
},o.prototype._h5Resume=function(){
this._h5Audio&&this._h5Audio.play();
},o.prototype._h5Stop=function(){
this._h5Audio&&(this._onUpdateSeekRange(0),this._onEnd(),this._H5bindEvent(!1),this._h5Audio.pause(),
this._h5Audio.currentTime=0,this._initH5Data());
},o.prototype._h5Seek=function(t){
if(this._h5Audio){
var e=(this._h5Data,parseInt(t,10));
e=Math.min(e,this._o.duration),!!b.debug&&console.log("h5 seek position:"+e),this._h5Audio.currentTime=e;
}
},o.prototype._startCountTime=function(){
1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio&&this._h5Data&&null===this._h5Data.lastPlaytime&&(this._h5Data.lastPlaytime=this._h5Audio.currentTime):null===this.jsApiData.lastPlaytime&&(this.jsApiData.lastPlaytime=this.jsApiData.curTime);
},o.prototype._endCountTime=function(){
if(1!=this._surportType&&3!=this._surportType||!this.jsApiData){
if(this._h5Audio&&this._h5Data){
var t=this._h5Audio,e=this._h5Data;
t.currentTime>0&&t.currentTime>e.lastPlaytime&&null!==e.lastPlaytime&&(this._g.totalPlayTime+=t.currentTime-e.lastPlaytime),
e.lastPlaytime=null;
}
}else{
var o=this.jsApiData;
o.curTime>0&&o.curTime>o.lastPlaytime&&null!==o.lastPlaytime&&(this._g.totalPlayTime+=o.curTime-o.lastPlaytime),
o.lastPlaytime=null;
}
},o.prototype._delMutexPlayers=function(){
var t=this._o,e=this._g.mutexKey,o=b.mutexPlayers[e];
if(o){
for(var i=0,a=o.length;a>i;i++)if(o[i]===this){
o.splice(i,1);
break;
}
if(0==o.length)try{
delete b.mutexPlayers[e];
}catch(n){}
}
if(t.jsapi2Src&&b.mutexPlayers2[t.jsapi2Src]){
for(var s=b.mutexPlayers2[t.jsapi2Src],i=0,a=s.length;a>i;i++)if(s[i]===this){
s.splice(i,1);
break;
}
if(0==s.length)try{
delete b.mutexPlayers2[t.jsapi2Src];
}catch(n){}
}
},o.prototype.resetPlayTotalTime=function(){
this._g.totalPlayTime=0;
},o.prototype.getPlayTotalTime=function(){
return this._endCountTime(),this._g.totalPlayTime;
},o.prototype.surportSeekRange=function(){
return 1==b._playtype?!1:2==this._surportType||3==this._surportType?!0:!1;
},o.prototype.setSrc=function(t){
-1==t.indexOf("?")&&(t+="?"),t+=c(this._o.mid),this._o.src=t,this._delMutexPlayers(),
this._g.mutexKey=this._o.src,b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this];
},o.prototype.getSrc=function(){
return this._o.src||"";
},o.prototype.setDuration=function(t){
this._o.duration=t||0;
},o.prototype.getSurportType=function(){
return this._surportType||0;
},o.prototype.getPlayStatus=function(){
return this._status;
},o.prototype.getCurTime=function(){
return 1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio?this._h5Audio.currentTime:0:this.jsApiData.curTime||0;
},o.prototype.getDuration=function(){
return this._o.duration||void 0;
},o.prototype.pause=function(t,e,o){
return o===!0||this._o.allowPause?void(1==this._surportType||3==this._surportType?this._pauseJsapiPlay(t===!1?!1:!0,!1,function(){
"function"==typeof e&&e();
},function(){
"function"==typeof e&&e();
}):2==this._surportType&&this._h5Audio&&"function"==typeof this._h5Audio.pause&&(this._h5Audio.pause(),
"function"==typeof e&&e())):void this.stop(t,e);
},o.prototype.stop=function(t,e){
return 1==this._surportType||3==this._surportType?void this._stopJsapiPlay(t===!1?!1:!0,e):(2==this._surportType&&this._h5Audio&&this._h5Stop(),
void("function"==typeof e&&e()));
},o.prototype.destory=function(){
this.stop(),this._h5Audio&&(document.body.removeChild(this._h5Audio),this._h5Audio=null),
this._delMutexPlayers();
},o.prototype.resume=function(t,e,o){
(o===!0||2==this._status&&this._o.allowPause)&&(2==this._surportType&&this._h5Audio?this._h5Resume():b.inWechat&&this._resumeJsapiPlay(t===!1?!1:!0));
},o.prototype.onload=function(){
this._onLoading();
},o.prototype.jsapiLog=function(t,e){
try{
var o=this._o,i={
type:o.type,
src:o.src,
mid:o.mid,
protocal:o.protocal,
webUrl:o.webUrl,
musicbar_url:o.musicbar_url
},a="["+JSON.stringify(i)+"]"+t;
l(a,e);
}catch(n){}
},o.prototype.play=function(){
var t=this,e=this._g;
if(t._o.src)return console.log("before play status is",t._status,e.hasCheckPlay),
2==t._status&&t._o.allowPause?void t.resume():(e.playTimeoutId&&clearTimeout(e.playTimeoutId),
e.hasCheckPlay?void(b.inWechat?(console.log("jsapi play"),this._jsapiPlay()):0!=b.surportType&&this._h5Play()):void(e.playTimeoutId=setTimeout(function(){
t.play();
},1e3)));
},o.prototype.seek=function(t){
{
var e=this;
this._g;
}
return 1!=e._status&&2!=e._status?void console.log("player status is",e._status):(console.log("support type is",this._surportType,t),
3==this._surportType?(this._endCountTime(),void this._jsapiSeek(t)):2==this._surportType&&this._h5Audio?(this._endCountTime(),
void this._h5Seek(t)):void 0);
},o.prototype.getBackgroundAudioState=function(t){
t||(t={}),S.invoke("getBackgroundAudioState",{},function(e){
/:ok$/.test(e.err_msg)?(e.paused=1*e.paused,t.success&&t.success(e)):t.error&&t.error(e);
});
},o.prototype.setOption=function(t){
this._extend(t),t.duration&&this.jsApiData&&(this.jsApiData.duration=t.duration);
},{
init:r,
triggerUnloadPlaying:m,
isAndroid:b.isAndroid,
getSurportType:s,
getQuery:P
};
});define("appmsg/emotion/dom.js",["biz_common/dom/event.js"],function(t){
"use strict";
function e(t){
if("string"==typeof t){
document.querySelectorAll||!function(){
var t=document.createStyleSheet(),e=function(e,n){
var i,o=document.all,r=o.length,u=[];
for(t.addRule(e,"foo:bar"),i=0;r>i&&!("bar"===o[i].currentStyle.foo&&(u.push(o[i]),
u.length>n));i+=1);
return t.removeRule(0),u;
};
document.querySelectorAll=function(t){
return e(t,1/0);
};
}();
var e=document.querySelectorAll(t);
}else e=[t];
return{
el:e,
on:function(t,e){
return this.each(function(n){
i.on(n,t,e);
}),this;
},
hide:function(){
return this.each(function(t){
t.style.display="none";
}),this;
},
show:function(){
return this.each(function(t){
t.style.display="block";
}),this;
},
each:function(t){
return n(this.el,t),this;
},
width:function(){
return this.el[0].clientWidth;
},
css:function(t){
return this.each(function(e){
for(var n in t)e.style[n]=t[n];
}),this;
},
attr:function(t,e){
var n=this.el[0];
return e?(n.setAttribute(t,e),this):n.getAttribute(t);
},
append:function(t){
return t.el&&(t=t.el[0]),this.el[0].appendChild(t),this;
},
html:function(t){
this.each(function(e){
e.innerHTML=t;
});
}
};
}
function n(t,e){
for(var n=0,i=t.length;i>n;n++)e(t[n],n);
}
var i=t("biz_common/dom/event.js");
return e.el=function(t){
return document.createElement(t);
},e.later=function(t){
setTimeout(t,3);
},e.log=function(){},e.each=n,e;
});define("appmsg/comment_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n    <div class="discuss_container" id="js_cmt_main" style="display:none">\n        <div class="mod_title_context">\n            <strong class="mod_title">精选留言</strong>\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <p class="discuss_icon_tips tr" id="js_cmt_addbtn1" style="display:none">\n                <a href="javascript:;" id="js_cmt_write1">写留言</a>\n            </p>\n            <#}#>\n            <p class="tips_global tr title_bottom_tips" id="js_cmt_nofans1" style="display:none;">作者已设置关注后才可以留言</p>\n        </div>\n        <ul class="discuss_list" id="js_cmt_list"></ul>\n    </div>\n\n\n    <!-- 没有付费才给写留言入口 -->\n    <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n    <div class="mod_title_context">\n        <p class="discuss_icon_tips tc" id="js_cmt_addbtn2" style="display:none">\n            <a href="javascript:;" id="js_cmt_write2">写留言</a>\n        </p>\n    </div>\n    <#}#>\n\n    <div class="tips_global rich_split_tips tc" id="js_cmt_nofans2" style="display:none;">\n        作者已设置关注后才可以留言    </div>\n    <p class="rich_split_tips tc tips_global" id="js_cmt_tips" style="display:none;"></p>\n\n\n    <div class="weui-loadmore" id="js_cmt_loading">\n        <i class="weui-loading"></i>\n        <span class="weui-loadmore__tips">正在加载</span>\n    </div>\n\n    <div class="rich_split_tips tc discuss_end_tips" id="js_cmt_statement" style="display:none">\n        <div class="weui-loadmore weui-loadmore_line weui-loadmore_dot">\n            <span class="weui-loadmore__tips"></span>\n        </div>\n        <!--\n        以上留言由公众号审核产生，        <a href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150313qmMbyi.html?scene_id=kf264">\n            了解留言功能详情        </a>\n        -->\n    </div>\n<#}else{#>\n    <div class="discuss_container" id="js_cmt_main" style="display:none">\n        <div class="rich_tips with_line title_tips discuss_title_line">\n            <span class="tips">精选留言</span>\n        </div>\n        <p class="discuss_icon_tips title_bottom_tips tr" id="js_cmt_addbtn1" style="display:none">\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <a href="javascript:;" id="js_cmt_write1">写留言<img class="icon_edit" src="<#=window.comment_edit_icon#>" alt=""></a>\n            <#}#>\n        </p>\n        <p class="tips_global tc title_bottom_tips" id="js_cmt_nofans1" style="display:none;">该文章作者已设置需关注才可以留言</p>\n        <ul class="discuss_list" id="js_cmt_list"></ul>\n    </div>\n\n\n    <p class="discuss_icon_tips rich_split_tips tr" id="js_cmt_addbtn2" style="display:none">\n        <!-- 没有付费才给写留言入口 -->\n        <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n        <a href="javascript:;" id="js_cmt_write2">写留言<img class="icon_edit" src="<#=window.comment_edit_icon#>" alt=""></a>\n        <#}#>\n    </p>\n\n    <div class="tips_global rich_split_tips tc" id="js_cmt_nofans2" style="display:none;">\n        该文章作者已设置需关注才可以留言    </div>\n    <p class="rich_split_tips tc tips_global" id="js_cmt_tips" style="display:none;"></p>\n\n\n    <div class="rich_tips tips_global loading_tips" id="js_cmt_loading">\n        <img src="<#=window.comment_loading_img#>" class="rich_icon icon_loading_white" alt="">\n        <span class="tips">加载中</span>\n    </div>\n\n    <div class="rich_tips with_line tips_global" id="js_cmt_statement" style="display:none">\n        <span class="tips">以上留言由公众号筛选后显示</span>\n    </div>\n\n    <p class="rich_split_tips tc" id="js_cmt_qa" style="display:none;">\n        <a href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150313qmMbyi.html?scene_id=kf264">\n            了解留言功能详情        </a>\n    </p>\n<#}#>\n\n';
});define("biz_wap/utils/fakehash.js",["biz_common/dom/event.js"],function(t){
"use strict";
function s(t){
t=t||location.hash.substr(1);
var s,o,e,i,r=!1,c=[];
for(s=0;s<h.length;s++)o=h[s],e=o[0],i=o[1],e!==a?("string"==typeof e&&e===t||e instanceof RegExp&&e.test(t))&&(i(n),
r=!0):c.push(i);
if(!r)for(s=0;s<c.length;s++)c[s](n,t);
n=t;
}
var o=t("biz_common/dom/event.js"),h=[],a="__default_hash__",n=location.hash.substr(1);
return o.on(window,"popstate",function(t){
var o=a;
t.state&&t.state.hash&&(o=t.state.hash),s(o);
}),o.on(window,"hashchange",s),o.on(window,"load",function(){
history.state&&history.state.hash&&s(history.state.hash);
}),{
val:function(){
return history.state&&history.state.hash||location.hash.substr(1);
},
push:function(t){
history.pushState?(history.pushState({
hash:t
},document.title,location.href),s(t)):location.hash=t;
},
replace:function(t){
history.replaceState?(history.replaceState({
hash:t
},document.title,location.href),s(t)):this.push(t);
},
on:function(t,s){
"function"==typeof t&&(s=t,t=a),h.push([t,s]);
}
};
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
"use strict";
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>=0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in p)r({
pid_uin_rid:e,
speeds:p[e]
},c);
p={};
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
p[n]||(p[n]=[]);
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
}(p),p[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
p[e]=p[e]||[],p[e][n]=p[e][n]||[],0>t||(21>n?p[e][n][0]=t:p[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
for(var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2],i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
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
"complete"==document.readyState?e():u.push(e);
}
function a(){
for(var e=0;e<u.length;e++)u[e]();
u=[];
}
var p={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",u=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("a/video.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t);
}
function i(){
l({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST"
});
}
function o(e){
function o(e,t,i){
var o;
return function(){
var n=this,r=arguments,d=function(){
o=null,i||e.apply(n,r);
},a=i&&!o;
clearTimeout(o),o=setTimeout(d,t),a&&e.apply(n,r);
};
}
var r=document.getElementById("js_video_container"),_=null,l=e.rl||"",w="";
if(l){
l=l.split("?"),l=l.length>1?l[1]:"";
var c=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),m=l.match(c);
m&&(w=unescape(m[2]));
}
window.__video_report_data={
aid:e.aid,
traceid:e.traceid,
user_uin:top.window.user_uin,
appmsg_id:mid,
item_idx:idx,
viewid:w,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var f=null,v=!0,y=!1;
if(r){
_=new p({
container:r,
cover:e.video_info.thumbUrl,
width:r.offsetWidth,
height:r.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth),
muted:v,
ad_muted_btn:v,
always_hide_loading:!0,
src:e.video_info.videoUrl,
autoHide:!0,
blockTouchVideo:!0,
onError:function(i){
console.log("播放出错",i),t(129,e.report_param),r.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+e.video_info.thumbUrl+"); height:"+s.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(130,e.report_param),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,_.play(),i();
},
onTimeupdate:function(e,t){
window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*_.__getDuration(),u||(window.__video_report_data.report_type=3,
i(),u=1);
}
}),_._showPlayer(),_.setSrc(e.video_info.videoUrl,"auto");
var g=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,h=document.documentElement.clientHeight||window.innerHeight,b=o(function(){
if(3==window.__video_report_data.play_type)return void n.off(window,"scroll",b);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(g=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
h=document.documentElement.clientHeight||window.innerHeight,_.isPlay()&&(s.offsetTop>g+h-s.offsetHeight/2||s.offsetTop+s.offsetHeight/2<g))_.pause();else if(!(_.isPlay()||"wifi"!=window.networkType&&"4g"!=window.networkType||s.offsetTop>g+h+s.offsetHeight/2||s.offsetTop+s.offsetHeight<g-s.offsetHeight/2)){
if(a.isAndroid&&!y)return;
d.invoke("getBackgroundAudioState",{},function(i){
/:ok$/.test(i.err_msg)&&1*i.paused==0&&i.src||(0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(131,e.report_param),
a.isIOS&&_.triggerMuted(v),_.__beginPlayHandler(),_._trigger("beginPlay")):_.play());
});
}
},500);
n.on(window,"scroll",b),b(),f=function(){
window.setTimeout(function(){
_.triggerMuted(v);
},1e3);
};
}
n.on(document.getElementById("js_video_container"),"tap",function(i){
if(i.target.className.indexOf("js_muted_btn")>-1)"true"==_.video.getAttribute("muted")?(_.triggerMuted(!1),
v=!1):(_.triggerMuted(!0),v=!0),t(132,e.report_param);else if(!_.isPlay())return _.__beginPlayHandler(),
_.triggerMuted(!0),t(133,e.report_param),void(window.__video_report_data.play_type=2);
}),n.on(window,"resize",function(){
setTimeout(function(){
var t=(s.clientWidth,r.offsetWidth),i=r.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth);
_.setHeight(i),_.setWidth(t),s.style.width=t,s.style.height=i;
},0);
});
}
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),d=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/mmversion.js"),_=e("a/a_report.js"),p=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),s=(_.AdClickReport,e("biz_common/utils/url/parse.js"),
document.getElementById("js_bottom_ad_area")),l=e("biz_wap/utils/ajax.js"),u=!1;
return o;
});define("a/sponsor.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function o(){
u({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST",
success:function(){}
});
}
function i(e,o,i){
o.canvas_info?d.invoke("openADCanvas",{
canvasId:o.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:o.pos_type
}),
adInfoXml:o.canvas_info.ad_info_xml
},function(o){
0!=o.ret?(location.href=e,t(135,i)):t(134,i);
}):_.isWp||_.isIOS?d.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
-1==t.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
}
function n(e){
var n=e.adData,r=e.pos_type,p=n.traceid,u=e.a_info.type,m=n.adid,w=n.url,y=e.a_info.rl;
110==n.pt&&(w=w.replace("#","&AdType=80#"));
var v={};
e.report_param=e.report_param||"";
var g=e.adDetailBtn,h=e.adMoreBtn,b=(e.adMessage,e.adAbout),j=e.adImg,T=e.adVideo,z=0,k={
type:u,
report_type:2,
url:encodeURIComponent(w),
tid:p,
rl:encodeURIComponent(y),
__biz:biz,
pos_type:r,
pt:n.pt,
click_pos:""
},x=null,y=n.rl||"",W="";
if(y){
y=y.split("?"),y=y.length>1?y[1]:"";
var H=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),I=y.match(H);
I&&(W=unescape(I[2]));
}
window.__video_report_data={
aid:n.adid,
traceid:n.traceid,
user_uin:top.window.user_uin,
publisher_appid:n.publisher_appid||0,
appmsg_id:mid,
item_idx:idx,
viewid:W,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var E=null,O=!0,A=!1;
if(T){
x=new s({
container:T,
cover:n.thumbUrl,
width:T.offsetWidth,
height:T.offsetWidth*parseInt(n.displayHeight)/parseInt(n.displayWidth),
muted:!0,
ad_muted_btn:!0,
always_hide_loading:!0,
src:n.videoUrl,
autoHide:!0,
blockTouchVideo:!0,
onError:function(o){
console.log("播放出错",o),t(123,e),T.parentNode.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+n.thumbUrl+"); height:"+c.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(122,e),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,x.play(),o();
},
onTimeupdate:function(e,t){
window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*x.__getDuration(),f||(window.__video_report_data.report_type=3,
o(),f=1);
}
}),z=29,x._showPlayer(),x.setSrc(n.videoUrl,"auto");
var M=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,P=document.documentElement.clientHeight||window.innerHeight;
if(_.isAndroid)if(c.offsetTop>M&&c.offsetTop<M+P)window.__video_report_data.auto_play=0;else{
var S=function(){
x.__beginPlayHandler(),a.off(window,"touchstart",S),A=!0;
};
a.on(window,"touchstart",S);
}
var U=function(){
if(3==window.__video_report_data.play_type)return void a.off(window,"scroll",U);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(M=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
P=document.documentElement.clientHeight||window.innerHeight,x.isPlay()&&(c.offsetTop>M+P||c.offsetTop+c.offsetHeight<M))x.pause();else if(!x.isPlay()&&!(c.offsetTop>M+P||c.offsetTop+c.offsetHeight<M)){
if(_.isAndroid&&!A)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(121,e),
_.isIOS&&x.triggerMuted(!0),x.__beginPlayHandler()):x.play();
}
};
a.on(window,"scroll",U),U(),E=function(){
window.setTimeout(function(){
x.triggerMuted(!0);
},1e3);
};
}
a.on(window,"touchend",function(e){
e.target!=b&&e.target!=g&&(b.style.display="none");
}),a.on(document.getElementById("js_ad_inner"),"click",function(o){
if(o.target.className.indexOf("js_muted_btn")>-1)"true"==x.video.getAttribute("muted")?(x.triggerMuted(!1),
O=!1):(x.triggerMuted(!0),O=!0),t(124,e);else{
if(x&&(!x.isPlay()||0==window.__video_report_data.play_type))return x.__beginPlayHandler(),
O||x.triggerMuted(!1),t(121,e),void(window.__video_report_data.play_type=2);
"js_main_img"==o.target.id||o.target.className.indexOf("video_mask")>-1?v[p+"_1"]||(v[p+"_1"]=!0,
k.click_pos=1,l(k,function(){
t(87+z,e),v[p+"_1"]=!1,!!E&&E(),i(w,e.a_info,e);
})):v[p+"_2"]||(v[p+"_2"]=!0,k.click_pos=2,l(k,function(){
t(88+z,e),v[p+"_2"]=!1,!!E&&E(),i(w,e.a_info,e);
}));
}
return!1;
}),a.on(h,"click",function(){
return v[p+"_3"]||(v[p+"_3"]=!0,k.click_pos=3,l(k,function(){
t(89+z,e),v[p+"_3"]=!1,!!E&&E(),i(w,e.a_info,e);
})),!1;
}),a.on(g,"click",function(){
return t(90+z,e),b.style.display="none"==window.getComputedStyle(b).display?"initial":"none",
!1;
}),a.on(b,"click",function(){
t(91+z,e);
var o="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid="+m+"&tid="+p+"#wechat_redirect";
return!!E&&E(),_.isWp||_.isIOS||_.isAndroid?d.invoke("openUrlWithExtraWebview",{
url:o,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=o);
}):location.href=o,!1;
}),a.on(window,"resize",function(){
setTimeout(function(){
var e=c.clientWidth;
if(j)j.style.height=e/1.77+"px";else{
var t=T.offsetWidth,o=T.offsetWidth*parseInt(n.displayHeight)/parseInt(n.displayWidth);
x.setHeight(o),x.setWidth(t),c.style.width=t,c.style.height=o;
}
},0);
});
}
var a=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),d=e("biz_wap/jsapi/core.js"),_=e("biz_wap/utils/mmversion.js"),p=e("a/a_report.js"),s=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),l=p.AdClickReport,c=(e("biz_common/utils/url/parse.js"),
document.getElementById("js_sponsor_ad_area")),u=e("biz_wap/utils/ajax.js"),f=!1;
return n;
});define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/appdialog_confirm.js","biz_common/utils/url/parse.js"],function(a,t,n,e){
"use strict";
function o(a){
h("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+D.report_param);
}
function d(a,t){
if(D.app_status=a,"downloading"==a){
t=t||0,console.log(t);
var n="";
if(document.getElementById("js_appdetail_action_0")&&(z=document.getElementById("js_appdetail_action_0").offsetWidth,
console.log("btn_width: ",z)),104==D.data.pt?n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停('+t+"%)</span>":113==D.data.pt||114==D.data.pt?D.btn.innerHTML.indexOf("继续")>-1?(n=D.btn.innerHTML,
n=n.replace("继续","暂停")):n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停</span>':122==D.data.pt?(D.btn.innerHTML.indexOf("继续")>-1?(n=D.btn.innerHTML,
n=n.replace(/继续/g,"暂停")):0==T?n='<span class="btn_progress_inner js_btn_process" id="percent_btn_1" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+z+'px;">暂停</span></span>暂停':document.getElementById("percent_btn_1").style.width=t+"%",
T=t):n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">'+t+"%</span>",
!n)return;
D.btn.innerHTML=n,122==D.data.pt?w.addClass(D.btn,"btn_progress"):w.addClass(D.btn,"with_processor");
}else if("paused"==a){
var n="";
104==D.data.pt||113==D.data.pt||114==D.data.pt||122==D.data.pt?(n=D.btn.innerHTML,
n=n.replace(/暂停/g,"继续"),D.btn.innerHTML=n):(w.removeClass(D.btn,"with_processor"),
w.removeClass(D.btn,"btn_progress"),D.btn.innerHTML=I[a]);
}else w.removeClass(D.btn,"with_processor"),w.removeClass(D.btn,"btn_progress"),
D.btn.innerHTML=I[a];
}
function i(a){
var t=a.js_app_rating,n=1*D.data.app_rating;
n>5&&(n=5),0>n&&(n=0);
var e=["","one","two","three","four","five"],o="",d=Math.floor(n);
if(o="star_"+e[d],n>d&&(n=d+.5,o+="_half"),t&&n>0){
var i=t.getElementsByClassName("js_stars"),s=t.getElementsByClassName("js_scores");
i&&s&&i[0]&&s[0]&&(i=i[0],s=s[0],i.style.display="inline-block",w.addClass(i,o));
}
}
function s(a){
"undefined"!=typeof b&&b.log&&b.log(a);
}
function l(){
b.on("wxdownload:progress_change",function(a){
a.download_id==D.download_id&&d("downloading",a.progress);
});
}
function r(){
D.download_id&&b.invoke("queryDownloadTask",{
download_id:D.download_id
},function(a){
if(s("queryDownloadTask : "+a.state+"; dowloadid = "+D.download_id),a&&a.state){
if("download_succ"==a.state&&(d("downloaded"),window.clearInterval(D.clock)),"downloading"==a.state)return;
("download_fail"==a.state||"default"==a.state)&&(window.clearInterval(D.clock),window.clearInterval(D.install_clock),
e("下载失败"),d("download"));
}
});
}
function p(){
b.invoke("getInstallState",{
packageName:D.data.pkgname,
download_id:D.download_id
},function(a){
var t=a.err_msg;
t.indexOf("get_install_state:yes")>-1&&(s("getInstallState @app, version : "+t),
window.clearInterval(D.install_clock),d(D.url_scheme?"gotodetail":"installed"));
});
}
function c(){
b.invoke("pauseDownloadTask",{
packageName:D.data.pkgname,
download_id:D.download_id
},function(a){
a.err_msg.indexOf("pause_download_task:ok")>-1&&d("paused");
});
}
function _(){
b.invoke("resumeDownloadTask",{
packageName:D.data.pkgname,
download_id:D.download_id
},function(a){
a.err_msg.indexOf("ok")>-1&&d("downloading");
});
}
function m(){
if(104==D.data.pt||113==D.data.pt||114==D.data.pt||122==D.data.pt&&D.url_scheme)j.gtVersion("6.5.6",!0)?b.invoke("launchApplication",{
schemeUrl:D.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=D.url_scheme);
}):location.href=D.url_scheme;else{
var t=D.data.url,n=a("biz_common/utils/url/parse.js");
(!t||0!=t.indexOf("http://mp.weixin.qq.com/tp/")&&0!=t.indexOf("https://mp.weixin.qq.com/tp/"))&&(t="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+D.data.app_id+(D.appdetail_params||"")+"&channel_id="+D.channelid+"&md5sum="+D.data.md5sum+"#wechat_redirect"),
D.url_scheme&&(t=n.join(t,{
is_installed:"1"
})),location.href=t;
}
}
function u(a){
if(D.btn=a.btn,!D.btn)return!1;
D.data=a.adData,D.url_scheme=a.url_scheme,D.appdetail_params=a.appdetail_params||"";
var t={};
D.channelid=D.data.channel_id||"",D.report_param=a.report_param;
var n=20;
if(("103"==D.data.pt||"104"==D.data.pt)&&i(a),"104"==D.data.pt||"113"==D.data.pt||"114"==D.data.pt||"122"==D.data.pt){
var u=D.data.androiddownurl;
if(u&&u.match){
var w=/&channelid\=([^&]*)/,g=u.match(w);
g&&g[1]&&(D.channelid=g[1],D.data.androiddownurl=u.replace(w,""));
}
D.channelid&&(D.channelid="&channelid="+D.channelid),a.via&&(D.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
b.ready(function(){
("113"==D.data.pt||"114"==D.data.pt||"104"==D.data.pt||"122"==D.data.pt)&&(b.invoke("getInstallState",{
packageName:O
},function(a){
var t=a.err_msg;
s("getInstallState @yingyongbao : "+t);
var n=t.lastIndexOf("_")+1,e=t.substring(n);
1*e>=C&&t.indexOf("get_install_state:yes")>-1&&(x=!0);
}),b.invoke("getInstallState",{
packageName:D.data.pkgname
},function(a){
var t=a.err_msg;
s("getInstallState @"+D.data.pkgname+" : "+t);
var n=t.lastIndexOf("_")+1,e=t.substring(n);
1*e>=D.data.versioncode&&t.indexOf("get_install_state:yes")>-1&&d(D.url_scheme?"gotodetail":"installed");
})),f.on(D.btn,"click",function(i){
if("installed"==D.app_status)return d("installed"),!1;
if("gotodetail"==D.app_status)return o(74),m(),!1;
if("downloading"==D.app_status)return o(71),c(),!1;
if("paused"==D.app_status)return o(72),_(),!1;
if("downloaded"==D.app_status)return o(73),b.invoke("installDownloadTask",{
download_id:D.download_id,
file_md5:D.data.md5sum
},function(a){
var t=a.err_msg;
s("installDownloadTask : "+t),t.indexOf("install_download_task:ok")>-1?D.install_clock=setInterval(p,1e3):e("安装失败！");
}),!1;
var u=function(){
if("103"==D.data.pt||"111"==D.data.pt||"112"==D.data.pt||"121"==D.data.pt){
o(23);
var t="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(D.data.appinfo_url)+"&ticket="+(D.data.ticket||window.ticket)+"#wechat_redirect";
D.url_scheme&&j.gtVersion("6.5.6",!0)?b.invoke("launchApplication",{
schemeUrl:D.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=t);
}):b.invoke("downloadAppInternal",{
appUrl:D.data.appinfo_url
},function(a){
a.err_msg&&-1!=a.err_msg.indexOf("ok")||(location.href=t);
});
}else{
if(x)return o(16),void(location.href="tmast://download?oplist=1,2&pname="+D.data.pkgname+D.channelid+D.via);
o(15);
var i=[D.data.adid,D.data.traceid,(D.data.pkgname||"").replace(/\./g,"_"),D.data.source,n,a.engine].join("."),c=function(a,t,n){
b.invoke("addDownloadTaskStraight",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},function(e){
var o=e.err_msg;
o.indexOf("ok")>-1?n&&n(e):b.invoke("addDownloadTask",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},n);
}),a.url_scheme&&j.isAndroid&&j.gtVersion("6.5.6",!0)&&b.invoke("writeCommData",{
packageName:a.data.pkgname,
data:a.url_scheme
},function(a){
console.log(a);
});
};
c(D,i,function(a){
var t=a.err_msg;
s("addDownloadTask : "+t),t.indexOf("ok")>-1?(D.download_id=a.download_id,s("download_id : "+D.download_id),
d("downloading"),D.clock=setInterval(r,1e3),D.install_clock=setInterval(p,1e3),l()):e("调用下载器失败！");
});
}
},f=function(){
return j.isIOS?void u():void y({
app_name:D.data.appname,
app_img_url:D.data.icon_url,
onOk:function(){
u(),o(x?106:100);
},
onCancel:function(){
o(x?107:101);
}
});
};
if("download"==D.app_status&&D.data.rl&&D.data.traceid){
if(!t[D.data.traceid]){
t[D.data.traceid]=!0;
var w,g,h,I,O=!!i&&i.target;
O&&(w=v.getX(O,"js_ad_link")+i.offsetX,g=v.getY(O,"js_ad_link")+i.offsetY,h=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
I=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
k({
type:D.data.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(D.data.androiddownurl),
tid:D.data.traceid,
rl:encodeURIComponent(D.data.rl),
__biz:biz,
pos_type:a.pos_type||0,
pt:D.data.pt,
pos_x:w,
pos_y:g,
ad_w:h||0,
ad_h:I||0
},function(){
t[D.data.traceid]=!1,f();
});
}
}else f();
return!1;
});
});
}
var f=a("biz_common/dom/event.js"),w=a("biz_common/dom/class.js"),g=a("a/a_report.js"),k=g.AdClickReport,v=a("biz_wap/utils/position.js"),h=a("biz_common/utils/report.js"),b=a("biz_wap/jsapi/core.js"),j=a("biz_wap/utils/mmversion.js"),y=a("a/appdialog_confirm.js"),I={
download:"下载",
downloading:"下载中",
paused:"继续",
downloaded:"安装",
gotodetail:"进入",
installed:"已安装"
},x=!1,O="com.tencent.android.qqdownloader",C=1060125,T=0,z=0,D={
app_status:"download",
btn:null,
download_id:0,
clock:null,
install_clock:null,
data:{},
channelid:"",
via:"",
report_param:"",
appdetail_params:""
};
return u;
});define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(e);
}
function o(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function i(e){
var i=e.btn;
if(!i)return!1;
var r=e.adData,p=!1,c={};
e.report_param=e.report_param||"";
var d="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(r.appinfo_url)+"&ticket="+(e.ticket||window.ticket)+"#wechat_redirect";
n.on(i,"click",function(){
if(t("click @js_app_action"),p)return t("is_app_installed"),o(r.is_appmsg?17:13,e),
void(location.href=r.app_id+"://");
var i=function(){
t("download"),o(r.is_appmsg?15:11,e),t("go : "+d),location.href=d;
};
return t("download"),r.rl&&r.traceid?c[r.traceid]||(c[r.traceid]=!0,a({
url:"/mp/advertisement_report?report_type=2&type="+r.type+"&url="+encodeURIComponent(r.appinfo_url)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&tid="+r.traceid+"&rl="+encodeURIComponent(r.rl)+"&pt="+r.pt+e.report_param,
type:"GET",
timeout:1e3,
complete:function(){
t("ready to download"),c[r.traceid]=!1,i();
},
async:!0
})):i(),!1;
});
}
{
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),a=e("biz_wap/utils/ajax.js");
e("biz_wap/jsapi/core.js");
}
return i;
});define("a/android.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(n,a,e,t){
"use strict";
function o(n){
"undefined"!=typeof s&&s.log&&s.log(n);
}
function i(n,a){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+n+a.report_param);
}
function d(n){
function a(){
s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var a=n.err_msg;
a.indexOf("get_install_state:yes")>-1&&(window.clearInterval(T),k=!0,d.innerHTML=x.installed);
});
}
function e(){
b&&s.invoke("queryDownloadTask",{
download_id:b
},function(a){
if(a&&a.state){
if("download_succ"==a.state){
o("download_succ"),i(c.is_appmsg?18:14,n),window.clearInterval(y),I=!1,j=!0,d.innerHTML=x.downloaded;
var e=document.createEvent("MouseEvents");
e.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(e);
}
if("downloading"==a.state)return;
("download_fail"==a.state||"default"==a.state)&&(o("fail, download_state : "+a.state),
window.clearInterval(y),I=!1,t("下载失败"),d.innerHTML=x.download);
}
});
}
var d=n.btn;
if(!d)return!1;
var r={},c=n.adData,m="",u="",p=c.androiddownurl;
if(p&&p.match){
var _=/&channelid\=([^&]*)/,w=p.match(_);
w&&w[1]&&(m="&channelid="+w[1],c.androiddownurl=p.replace(_,""));
}
n.via&&(u=["&via=ANDROIDWX.YYB.WX.ADVERTISE",n.via].join("."));
var f=!1,v="com.tencent.android.qqdownloader",g=1060125,k=!1,I=!1,j=!1,b=0,y=null,T=null,x={
download:"下载",
downloading:"下载中",
downloaded:"安装",
installed:"已安装"
};
d.innerHTML=x.download,s.ready(function(){
s.invoke("getInstallState",{
packageName:v
},function(n){
var a=n.err_msg;
o("getInstallState @yingyongbao : "+a);
var e=a.lastIndexOf("_")+1,t=a.substring(e);
1*t>=g&&a.indexOf("get_install_state:yes")>-1&&(f=!0);
}),s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var a=n.err_msg;
o("getInstallState @"+c.pkgname+" : "+a);
var e=a.lastIndexOf("_")+1,t=a.substring(e);
1*t>=c.versioncode&&a.indexOf("get_install_state:yes")>-1&&(k=!0,d.innerHTML=x.installed);
}),d.addEventListener("click",function(){
if(o("click @js_app_action"),!I){
if(k)return!1;
if(j)return s.invoke("installDownloadTask",{
download_id:b,
file_md5:c.md5sum
},function(n){
var e=n.err_msg;
o("installDownloadTask : "+e),e.indexOf("install_download_task:ok")>-1?T=setInterval(a,1e3):t("安装失败！");
}),!1;
var p=function(){
return f?(i(c.is_appmsg?16:12,n),void(location.href="tmast://download?oplist=1,2&pname="+c.pkgname+m+u)):void s.invoke("addDownloadTask",{
task_name:c.appname,
task_url:c.androiddownurl,
extInfo:n.task_ext_info,
file_md5:c.md5sum
},function(a){
var r=a.err_msg;
o("addDownloadTask : "+r),r.indexOf("add_download_task:ok")>-1?(i(c.is_appmsg?15:11,n),
I=!0,b=a.download_id,o("download_id : "+b),d.innerHTML=x.downloading,y=setInterval(e,1e3)):t("调用下载器失败！");
});
};
return c.rl&&c.traceid?r[c.traceid]||(r[c.traceid]=!0,l({
url:"/mp/advertisement_report?report_type=2&type="+c.type+"&url="+encodeURIComponent(c.androiddownurl)+"&tid="+c.traceid+"&rl="+encodeURIComponent(c.rl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pt="+c.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
r[c.traceid]=!1,p();
},
async:!0
})):p(),!1;
}
});
});
}
var r=(n("biz_common/dom/event.js"),n("biz_common/utils/report.js")),l=n("biz_wap/utils/ajax.js"),s=n("biz_wap/jsapi/core.js");
return d;
});define("a/profile.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function e(t,e){
a("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+e.report_param);
}
function n(t){
console.log(t),location.href=t;
}
function i(t){
var i=t.adData,s=t.pos_type||0,l={};
t.report_param=t.report_param||"",function(){
function r(t){
{
var e=_.dataset;
"https:"==top.location.protocol?1500:1200;
}
if(e.rl&&e.url&&e.type&&e.tid){
var n=e.tid,o=e.type,a=e.url,r=e.rl;
if(!l[n]){
l[n]=!0;
var d,m,u,j,b=!!t&&t.target;
b&&(d=c.getX(b,"js_ad_link")+t.offsetX,m=c.getY(b,"js_ad_link")+t.offsetY,u=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
j=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
p({
type:o,
report_type:2,
click_pos:0,
url:encodeURIComponent(a),
tid:n,
rl:encodeURIComponent(r),
__biz:biz,
pos_type:s,
pt:i.pt,
pos_x:d,
pos_y:m,
ad_w:u||0,
ad_h:j||0
},function(){
l[n]=!1,f();
});
}
}else f();
}
var _=t.btnAddContact,m=t.btnViewProfile;
if(_&&_.dataset){
var u=function(o,s){
var p=o.err_msg,r=i.is_appmsg?6:1;
-1!=p.indexOf("ok")?(m.style.display="inline-block",_.style.display="none",r=i.is_appmsg?9:4):"add_contact:added"==p?r=i.is_appmsg?7:2:"add_contact:cancel"==p?r=i.is_appmsg?8:3:(--s,
s>=0?d.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(t){
u(t,s);
}):(p="addContact:fail|msg:"+p+"|uin:"+uin+"|biz:"+biz,a("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+p+"&r="+Math.random()),
n(i.url))),e(r,t);
},f=function(){
e(i.is_appmsg?10:5,t),d.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(t){
u(t,1);
});
};
o.on(_,"click",r);
}
}(),function(){
var e=t.btnViewProfile;
e&&o.on(e,"click",function(){
var e=t.btnAddContact.dataset,o={
source:4,
tid:e.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:i.pt,
aid:t.aid,
ad_engine:t.ad_engine,
pos_type:s
},a=r.join(i.url,o);
return n(a),!1;
});
}();
}
{
var o=t("biz_common/dom/event.js"),a=t("biz_common/utils/report.js"),s=t("a/a_report.js"),p=s.AdClickReport,r=(t("biz_wap/utils/ajax.js"),
t("biz_common/utils/url/parse.js")),c=t("biz_wap/utils/position.js"),d=t("biz_wap/jsapi/core.js");
"https:"==top.location.protocol?5:0,window.__report;
}
return i;
});
define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/articleReport.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js"],function(e,i,o,n){
"use strict";
function t(){
var e=window.location.protocol+"//",i=l.indexOf("://")<0?e+l:l;
if(-1!=i.indexOf("mp.weixin.qq.com/s")||-1!=i.indexOf("mp.weixin.qq.com/mp/appmsg/show")||-1!=i.indexOf("mp.weixin.qq.com/mp/homepage")){
var o=i.split("#");
i=s.addParam(o[0],"scene",25,!0)+(o[1]?"#"+o[1]:""),i=i.replace(/#rd$/g,"#wechat_redirect");
}else i=e+"mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(l);
try{
if("mp.weixin.qq.com"!=top.window.location.host)return window.top.open(i,"_blank"),
!1;
}catch(n){}
var t=location.search.replace("wx_header","del_wx_header"),r={
url:"/mp/advertisement_report"+t+"&report_type=3&action_type=0&url="+encodeURIComponent(l)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
},m=p.isInMiniProgram?0:1;
return r.timeout=2e3,r.complete=function(){
_(i,{
sample:m,
scene:60,
user_name:user_name,
reject:function(){
location.href=i;
}
});
},a(r),!1;
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),s=e("biz_common/utils/url/parse.js"),m=e("appmsg/articleReport.js"),a=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/mmversion.js"),c=msg_title.htmlDecode(),l=msg_source_url.htmlDecode(),_=e("appmsg/open_url_with_webview.js"),d=e("biz_wap/jsapi/core.js");
m.init({
dom:document.getElementById("js_report_article3"),
title:c,
link:window.msg_link
});
var u=document.getElementById("js_view_source");
r.on(u,"click",function(){
return t(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_wap/jsapi/leaveReport.js","biz_wap/utils/wapsdk.js","common/utils.js","appmsg/log.js","biz_common/utils/url/parse.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof H&&(t.key=H),"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),
"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),
"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=x?"1":"0",t.f="json",z.join(e,t);
}
function o(e){
window.logs||(window.logs={}),O.js_content=e.js_content||document.getElementById("js_content");
var o=e.js_toobar3||document.getElementById("js_toobar3");
if(O.pageEndTop=o?o.offsetTop:0,O.imgs=O.js_content?O.js_content.getElementsByTagName("img")||[]:[],
O.media=e.media||document.getElementById("media"),O.title=e.title||(window.msg_title||"").htmlDecode(),
O.video_cnt=e.video_cnt||window.logs.video_cnt||0,O.js_cmt_area=e.js_cmt_area||document.getElementById("js_cmt_area"),
O.item_show_type=e.item_show_type||window.item_show_type||0,g=document.getElementsByTagName("html"),
g&&1==!!g.length&&c&&(g=g[0].innerHTML,A.content_length=c.htmlSize),window.logs.pageinfo=A,
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
if(R=1*k.get(H),!window.__second_open__){
var t=location.href.indexOf("scrolltodown")>-1,o=O.js_cmt_area;
if(t&&o&&o.offsetTop){
var i=o.offsetTop;
window.scrollTo(0,i-25);
}else window.scrollTo(0,R),b.saveSpeeds({
uin:uin,
pid:"https:"==D?462:417,
speeds:{
sid:36,
time:Math.ceil(R/j.getInnerHeight())
}
}),b.send();
}
if(window.__wxjs_is_wkwebview||window.__second_open__){
if(C)return;
var n=I.getData(),a=localStorage.getItem("hand_up_id");
for(var p in n)p!=a&&n[p]&&(r(n[p].val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random(),
I.remove(p));
window.setInterval(function(){
var e=s();
I.set(G,e,+new Date+864e7);
},1e3);
}
var w=S.getData("spad");
w&&w.spad&&m(w.spad.val),e.hasSpAd&&window.setInterval(function(){
d();
var e=_();
S.set("spad",e,+new Date+864e7);
},1e3),window.setTimeout(function(){
l({
url:"/mp/appmsgreport?action=page_time_5s&__biz="+biz,
type:"POST",
mayAbort:!0,
data:s(),
async:!0,
timeout:2e3
});
},5e3);
}),w.on(window,"unload",function(){
if(!window.__second_open__&&!window.__jsapi_report_has_done__){
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=s();
r(e),window.__unload_has_done__=!0;
}
}),window.logs.read_height=0,w.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(M),M=setTimeout(function(){
R=window.pageYOffset,k.set(H,R,+new Date+72e5);
},500);
}),w.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(M),M=setTimeout(function(){
R=window.pageYOffset,k.set(H,R,+new Date+72e5);
},500);
})),window.__second_open__)y.addReport(function(){
B=!0,I.remove(G);
var e=s(),t=[];
for(var o in e)e.hasOwnProperty(o)&&t.push(o+"="+encodeURIComponent(e[o]));
var i={
reportUrl:"https://mp.weixin.qq.com/mp/appmsgreport?action=page_time&__biz="+biz,
reportData:t.join("&"),
method:"POST"
};
return T("[Appmsg leaveReport length]: "+JSON.stringify(i).length),i;
});else{
var i=function(){
if(window.__unload_has_done__){
var e={
data:{}
};
return T("[Appmsg leaveReport length]: "+JSON.stringify(e).length),e;
}
B=!0,I.remove(G);
var o=s(),i=[];
for(var n in o)o.hasOwnProperty(n)&&i.push(n+"="+encodeURIComponent(o[n]));
var e=[{
reportUrl:t("https://mp.weixin.qq.com/mp/appmsgreport?action=page_time&__biz="+biz),
reportData:i.join("&"),
method:"POST"
}];
return window.__jsapi_report_has_done__=!0,T("[Appmsg leaveReport length]: "+JSON.stringify(e).length),
{
data:{
requestList:e
}
};
};
v.on("reportOnLeaveForMP",i);
}
w.on(document,"visibilitychange",function(){
h.isHidden()?localStorage.setItem("hand_up_id",G):localStorage.setItem("hand_up_id","");
}),p();
}
function i(e,t){
if(e&&!(e.length<=0))for(var o,i,n,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,s=0,r=e.length;r>s;++s)o=e[s],
o&&(i=o.getAttribute(t),i&&(n=i.match(a),n&&n[2]&&(E[n[2]]=!0)));
}
function n(e){
for(var t=0,o=N.length;o>t;++t)if(N[t]==e)return!0;
return!1;
}
function a(){
E={},i(document.getElementsByTagName("a"),"href"),i(document.getElementsByTagName("link"),"href"),
i(document.getElementsByTagName("iframe"),"src"),i(document.getElementsByTagName("script"),"src"),
i(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in E)E.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!q&&n(t)&&(q=!0),
e.push(t));
return E={},e.join(",");
}
function s(){
{
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=O.js_content,i=j.getInnerHeight(),n=O.screen_width,s=O.scroll_height,r=Math.ceil(s/i),d=Math.ceil((o.scrollHeight||o.offsetHeight)/i),_=(window.logs.read_height||t)+i,m=O.pageEndTop,p=O.imgs,w=Math.ceil(_/i)||1,l=O.media,c=50,u=0,f=0,v=0,y=0,b=_+c>m?1:0;
o.offsetTop+o.scrollHeight;
}
w>r&&(w=r);
var T=function(t){
if(t)for(var o=0,i=t.length;i>o;++o){
var n=t[o];
if(n){
u++;
var a=n.getAttribute("src"),s=n.getAttribute("data-type");
a&&0==a.indexOf("http")&&(f++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&y++),s&&(e["img_"+s+"_cnt"]=e["img_"+s+"_cnt"]||0,
e["img_"+s+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=y||0,e.download_img_cnt=f||0,e.download_cdn_img_cnt=v||0,
e.img_cnt=u||0;
},z=window.appmsgstat||{},x=window.logs.img||{},k=window.logs.pagetime||{},I=x.load||{},S=x.read||{},E=[],D=[],N=0,B=0,M=0;
for(var R in S)R&&0==R.indexOf("http")&&S.hasOwnProperty(R)&&D.push(R);
for(var R in I)R&&0==R.indexOf("http")&&I.hasOwnProperty(R)&&E.push(R);
for(var H=0,P=E.length;P>H;++H){
var G=E[H];
G&&G.isCDN()&&(-1!=G.indexOf("/0")&&N++,-1!=G.indexOf("/640")&&B++,-1!=G.indexOf("/300")&&M++);
}
var e={
report_bizuin:biz,
title:O.title,
mid:mid,
idx:idx,
subscene:window.subscene||1e4,
sessionid:window.sessionid||0,
read_cnt:z.read_num||0,
like_cnt:z.like_num||0,
screen_width:n,
screen_height:j.getInnerHeight(),
screen_num:d,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:O.video_cnt,
read_screen_num:w||0,
is_finished_read:b,
scene:source,
content_len:A.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
handup_time:h.getHandUpTime(),
total_height:m,
exit_height:_>m?m:_,
img_640_cnt:B,
img_0_cnt:N,
img_300_cnt:M,
wtime:k.onload_time||0,
ftime:k.ftime||0,
ptime:k.ptime||0,
onload_time:k.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:window.ct,
item_show_type:O.item_show_type,
page_req_info:JSON.stringify({
startGetAppmsgExtTime:window.startGetAppmsgExtTime,
startGetAppmsgAdTime:window.startGetAppmsgAdTime,
receiveGetAppmsgExt:window.receiveGetAppmsgExt,
receiveGetAppmsgAd:window.receiveGetAppmsgAd,
jsapiReadyTime:window.jsapiReadyTime,
domCompleteTime:window.domCompleteTime
})
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=E.length,
e.wifi_read_imgs_cnt=D.length),window.logs.webplog&&4==window.logs.webplog.total){
var C=window.logs.webplog;
e.webp_total=1,e.webp_lossy=C.lossy,e.webp_lossless=C.lossless,e.webp_alpha=C.alpha,
e.webp_animation=C.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var J=window.logs.idkeys,U=[];
for(var Y in J)if(J.hasOwnProperty(Y)){
var L=J[Y];
L.val>0&&U.push(Y+"_"+L.val);
}
e.idkey=U.join(";");
}
T(!!l&&l.getElementsByTagName("img")),T(p);
var K=(new Date).getDay(),V=a();
return(q||0!==user_uin&&Math.floor(user_uin/100)%7==K)&&(e.domain_list=V),q&&(e.html_content=g),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e.ascene=window.ascene||-1,0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),e;
}
function r(e){
B||(B=!0,I.remove(G),e.report_time=parseInt(+new Date/1e3),l({
url:"/mp/appmsgreport?action=page_time&__biz="+biz,
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function d(){
k.set(H,R,+new Date+72e5);
}
function _(){
return window.__video_report_data;
}
function m(e){
e&&e.play_type&&(S.remove("spad"),e.report_type=1,l({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function p(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/geticon?__biz="+biz+"&r="+Math.random();
}
e("biz_common/utils/string/html.js");
var w=e("biz_common/dom/event.js"),l=e("biz_wap/utils/ajax.js"),c=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var g,u=e("biz_wap/utils/storage.js"),h=e("biz_wap/utils/hand_up_state.js"),f=e("biz_wap/utils/mmversion.js"),v=e("biz_wap/jsapi/core.js"),y=e("biz_wap/jsapi/leaveReport.js"),b=e("biz_wap/utils/wapsdk.js"),j=e("common/utils.js"),T=e("appmsg/log.js"),z=e("biz_common/utils/url/parse.js"),x=-1!=navigator.userAgent.indexOf("TBS/"),O={
js_cmt_area:null,
js_content:null,
screen_height:j.getInnerHeight(),
screen_width:document.documentElement.clientWidth||window.innerWidth,
scroll_height:document.body.scrollHeight||document.body.offsetHeight,
pageEndTop:0,
imgs:[],
media:null,
title:"",
video_cnt:0,
item_show_type:0
},k=new u("page_pos"),I=new u("time_on_page"),S=new u("spad"),A={},E={},D=window.location.protocol,q=!1,N=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],B=!1,M=null,R=0,H=[biz,sn,mid,idx].join("_"),P=Math.random(),G=[biz,sn,mid,idx,P].join("_"),C=f.isAndroid&&f.gtVersion("7.0.4",!0)||f.isIOS&&f.gtVersion("7.0.4",!0);
return{
init:o
};
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(){
function e(e){
var t=[];
for(var n in e)t.push(n+"="+encodeURIComponent(e[n]||""));
return t.join("&");
}
if(networkType){
var t=window.performance||window.msPerformance||window.webkitPerformance;
if(t&&"undefined"!=typeof t.getEntries){
var n,i,a=100,o=document.getElementsByTagName("img"),p=o.length,s=navigator.userAgent,g=!1;
/micromessenger\/(\d+\.\d+)/i.test(s),i=RegExp.$1;
for(var w=0,m=o.length;m>w;w++)if(n=parseInt(100*Math.random()),!(n>a)){
var d=o[w].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,_=t.getEntries(),u=0;u<_.length;u++)if(f=_[u],f.name==d){
var c=o[w].getAttribute("data-fail");
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:i,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[w].fileSize||0,
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
var n=e("biz_common/dom/event.js"),i=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
i.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],("network_type:edge"==e.err_msg||"network_type:wwan"==e.err_msg)&&(e.detailtype&&"4g"==e.detailtype||e.subtype&&"4g"==e.subtype)&&(networkType="4g"),
t();
}),n.on(window,"load",t,!1);
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
});define("question_answer/appmsg.js",["biz_common/utils/string/html.js","question_answer/appmsg_tpl.html.js","biz_wap/utils/ajax.js","question_answer/utils.js","biz_common/dom/event.js","biz_common/tmpl.js","pages/utils.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var a=t("question_answer/appmsg_tpl.html.js"),e=t("biz_wap/utils/ajax.js"),n=t("question_answer/utils.js"),i=t("biz_common/dom/event.js"),s=t("biz_common/tmpl.js"),r=t("pages/utils.js"),o={
data:{},
batchGetQuestionParam:null,
retry:1
},l=function(t){
return document.getElementById(t);
},u=function(){
var t=l("js_content");
if(!t)return!1;
for(var a=t.getElementsByTagName("mp-question")||[],e=0,n=a.length;n>e;e++){
var i=a[e],s=i.getAttribute("data-mid"),r=i.getAttribute("data-idx"),u=window.biz+"_"+s+"_"+r;
o.data[u]?o.data[u].invisibleElems.push(i):o.data[u]={
invisibleElems:[i],
dataStatus:1
};
}
return 0===a.length?!1:!0;
},m=function(){
if(o.batchGetQuestionParam)return o.batchGetQuestionParam;
var t={
num:0,
__biz:window.biz
};
for(var a in o.data)if(Object.prototype.hasOwnProperty.call(o.data,a)){
var e=a.split("_");
t["mid"+t.num]=e[1],t["idx"+t.num]=e[2],t.num++;
}
return o.batchGetQuestionParam=t,o.batchGetQuestionParam;
},d=function(t){
n.bindReviewImageEvent({
container:t.dom,
filterClass:n.classPrefix+"preview_js",
imgsSrc:t.imgsSrc
});
},c=function(t){
var a="."+n.classPrefix;
t.allQuestionImg&&t.allQuestionImg.length>0&&i.on(t.dom,"tap",a+"showimg_js",function(){
return n.reviewImage({
curUrl:t.allQuestionImg[0],
imgsSrc:t.allQuestionImg
}),!1;
}),t.allAnswerImg&&t.allAnswerImg.length>0&&d({
dom:t.dom,
imgsSrc:t.allAnswerImg
}),i.on(t.dom,"tap",a+"show_detail_js",function(t){
var a=t.delegatedTarget,e=a.getAttribute("data-key");
r.jumpUrl(o.data[e].question_page_url,!0);
});
},g=function(t){
o.data[t.key]&&o.data[t.key].invisibleElems&&1*o.data[t.key].dataStatus!==1&&!function(){
var e=t.data||{};
e.dataStatus=o.data[t.key].dataStatus;
var n=o.data[t.key].invisibleElems.map(function(t){
var n=document.createElement("div");
return n.innerHTML=s.tmpl(a,e,!0),t.parentNode.insertBefore(n.firstChild,t.nextsibling);
});
o.data[t.key].invisibleElems=null,n.length>0&&1*o.data[t.key].dataStatus===2&&n.forEach(function(a){
c({
dom:a,
allQuestionImg:t.data.allQuestionImg,
allAnswerImg:t.data.allAnswerImg
});
});
}();
},_=function(){},p=function f(){
e({
url:"/mp/qa?action=batch_get_question&__biz="+window.biz,
type:"POST",
dataType:"json",
data:m(),
async:!0,
success:function(t){
t&&t.base_resp&&1*t.base_resp.ret===0&&"[object Array]"===Object.prototype.toString.call(t.question_list)?(t.question_list.forEach(function(t){
var a=window.biz+"_"+t.appmsgid+"_"+t.idx;
if(o.data[a]&&o.data[a].invisibleElems){
var e=n.formatQuestionInfo(t);
e.dataKey=a,o.data[a].qa_id=e.qa_id,o.data[a].allImg=e.allImg,o.data[a].question_page_url=e.question_page_url,
o.data[a].dataStatus=2,g({
data:e,
key:a
});
}
}),_(4)):_(3);
},
error:function(){
o.retry?(o.retry--,f()):_(3);
}
});
},b=function(){
u()&&p();
};
b();
});define("appmsg/weapp.js",["biz_common/utils/string/html.js","pages/weapp_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/tmpl.js","biz_common/dom/class.js","appmsg/weapp_common.js","common/utils.js","appmsg/popup_report.js"],function(e){
"use strict";
function t(e,t,n){
var o=new Image;
o.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=106&content="+n+",biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(t.toString())+"&r="+Math.random()).substr(0,1024);
}
function n(e,t,n,o,i,p,a){
f({
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
weapp_type:p,
is_confirm:a||0,
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
j=e.getElementsByTagName("mp-weapp")||[],I=e.getElementsByTagName("mp-miniprogram")||[],
k=[];
for(var t=e.getElementsByTagName("a"),n=0,o=t.length;o>n;n++){
var i=t[n],p=i.getAttribute("data-miniprogram-appid");
p&&k.push(i);
}
return j.length<=0&&I.length<=0&&0==k.length?!1:x&&0!=x.length?!0:!1;
}
function i(e){
return e=e||"",e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function p(e,t,o,i,p){
n(e,t,o,i,4,p),window.__addIdKeyReport&&window.__addIdKeyReport("28307",103);
}
function a(e,t,o,i,p){
n(e,t,o,i,5,p);
}
function r(){
function e(e){
e.preventDefault();
}
function o(e){
e&&(s=setTimeout(function(){
e.style.display="none",f=-1;
},100));
}
window.reportWeappid=[];
for(var r=0;r<x.length;r++)window.reportWeappid.push(x[r].appid);
var d=function(){};
g.on(document.getElementById("js_minipro_dialog_ok"),"click",function(){
document.querySelector("body").removeEventListener("touchmove",e);
var t=document.getElementById("js_minipro_dialog");
d&&d(),document.getElementById("js_minipro_dialog").style.display="none",b.report([4,1,"",img_popup?1:0,window.source,t._appid]);
}),g.on(document.getElementById("js_minipro_dialog_cancel"),"click",function(){
document.querySelector("body").removeEventListener("touchmove",e);
var t=document.getElementById("js_minipro_dialog");
t.style.display="none",n(t._appid,t._i,t._nickname,t._title,3,1,1),window.__addIdKeyReport&&window.__addIdKeyReport("28307",116),
b.report([3,1,"",img_popup?1:0,window.source,t._appid]);
});
var s,f,j=!y.canJumpOnTap||y.isNonWechat,I=document.getElementById("js_pc_weapp_code"),k=document.getElementById("js_pc_weapp_code_img"),C=document.getElementById("js_pc_weapp_code_des");
j&&(g.on(I,"mouseenter",function(){
clearTimeout(s);
}),g.on(I,"mouseleave",function(){
o(I);
})),y.getAppidInfo({
onSuccess:function(x){
console.log("WeappCommon.getAppidInfo onsuccess");
var B=x.data.infoMap;
if(B){
for(r=0;r<E.length;r++)(function(r){
window.__addIdKeyReport("111535",1);
var v=E[r].appid,x=E[r].path,R=E[r].imageUrl,T=E[r].title,K=E[r].elem,z=B[v];
if(z){
var A=K.tagName.toLowerCase(),N=K.firstChild&&1==K.firstChild.nodeType&&"IMG"===K.firstChild.tagName;
if(N=N||K.firstElementChild&&"IMG"===K.firstElementChild.tagName,"a"!=A)K.innerHTML=w.tmpl(_,{
imageUrl:i(R),
title:i(T),
nickname:i(z.nickname),
avatar:i(z.logo_url)
});else{
if(N){
var W=K.firstChild;
W&&h.addClass(K,"weapp_image_link");
}else h.addClass(K,"weapp_text_link");
K.setAttribute("href","");
}
g.on(K,"tap",function(){
if(d=function(){
var e=N?1:"a"==A?2:0;
return y.jumpUrl({
sceneNote:encodeURIComponent(location.href),
appid:v,
path:x,
scene:1058,
beforeNonWechatWarn:function(){
a(v,r,z.nickname,T,e);
},
beforeJumpBackupPage:function(){
p(v,r,z.nickname,T,e);
},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102),
t(107,new Error(e.err_msg),"");
}
}),window.__addIdKeyReport&&window.__addIdKeyReport("28307",100),n(v,r,z.nickname,T,3,e,N?2:0),
N&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",115),!1;
},N&&b.report([2,1,"",img_popup?1:0,window.source,v]),N&&img_popup){
document.getElementById("js_minipro_dialog_name").innerText='即将打开"'+z.nickname+'"小程序';
var o=document.getElementById("js_minipro_dialog");
return o.style.display="block",document.querySelector("body").addEventListener("touchmove",e,{
passive:!1
}),o._appid=v,o._i=r,o._nickname=z.nickname,o._title=T,n(v,r,z.nickname,T,3,1,0),
y.canJumpOnTap&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",114),!1;
}
return d();
},"a"==A),g.on(K,"click",function(e){
e.preventDefault(),e.stopPropagation();
},"a"==A),j&&(g.on(K,"mouseenter",function(){
function e(e){
function t(){
if(!g&&f===r){
I.style.display="block",g=!0;
var e=I.offsetHeight,t=I.offsetWidth;
"a"!=A||N?n>t?(c(I,"right-center"),I.style.left=n-t-_+"px",I.style.top=o+"px"):(c(I),
I.style.top=o+s-e-_+"px",I.style.left=n+d-t-_+"px"):(I.style.left=i>n+d/2-t/2?i+"px":n+d/2+t/2>i+p?i+p-t+"px":n+d/2-t/2+"px",
a>e?(c(I,"down-center"),I.style.top=o-e-_+"px"):(c(I,"up-center"),I.style.top=o+s-_+"px"));
}
}
if(e){
var n=m(K),o=l(N?K.firstElementChild:K),i=m(K.parentNode),p=K.parentNode.offsetWidth,a=K.getBoundingClientRect().top,d=N?K.firstElementChild.offsetWidth:K.offsetWidth,s=N?K.firstElementChild.offsetHeight:K.offsetHeight,_=8,g=!1;
C.innerText=u(z.nickname,48),k.onload=t,k.src=e,(k.complete||k.width)&&t();
}
}
clearTimeout(s),f!==r&&(I.style.display="none",f=r,y.getAppidCode({
appid:v,
path:x
},e));
}),g.on(K,"mouseleave",function(){
o(I);
}));
}
})(r);
var T=null,K=function(){
T=null;
for(var e=0;e<R.length;e++){
var t=R[e].elem,o=t.tagName.toLowerCase(),i=t.firstChild&&1==t.firstChild.nodeType,p=i?1:"a"==o?2:0,a=R[e].elem.getBoundingClientRect();
a.top<v.getInnerHeight()&&a.bottom>0&&(setTimeout(function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307",101);
},0),n(R[e].appid,e,B[R[e].appid].nickname,R[e].title,2,p),R.splice(e--,1));
}
};
K(),g.on(window,"scroll",function(){
T||(T=setTimeout(K,100));
});
}
},
onError:function(e){
3==e.code&&t(106,e.catchErr,"parsing weapp info error");
}
});
}
function d(){
for(var e=0;e<I.length+j.length;e++){
var t=e<I.length,n=t?I[e]:j[e-I.length],o=n.getAttribute(t?"data-miniprogram-appid":"data-weapp-appid")||"",i=n.getAttribute(t?"data-miniprogram-path":"data-weapp-path")||"",p=n.getAttribute(t?"data-miniprogram-imageUrl":"data-weapp-imageUrl")||"",a=n.getAttribute(t?"data-miniprogram-title":"data-weapp-title")||"",r=document.createElement("span");
n.setAttribute("class",""),r.setAttribute("class","weapp_display_element js_weapp_display_element"),
E.push({
appid:o,
path:i,
imageUrl:p,
title:a,
elem:r
}),R.push({
appid:o,
elem:r,
title:a
}),n.parentNode.insertBefore(r,n.nextSibling);
}
for(var e=0;e<k.length;e++){
var d=k[e];
E.push({
appid:d.getAttribute("data-miniprogram-appid"),
path:d.getAttribute("data-miniprogram-path")||"",
elem:d
});
}
}
function s(e){
return document.getElementById(e);
}
function m(e){
for(var t=0;e;)t+=e.offsetLeft,e=e.offsetParent;
return t;
}
function l(e){
for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;
return t;
}
function c(e,t){
for(var n=0;3>n;n++)h.removeClass(e,"weui-desktop-popover_pos-up-"+B[n]),h.removeClass(e,"weui-desktop-popover_pos-down-"+B[n]),
h.removeClass(e,"weui-desktop-popover_pos-left-"+T[n]),h.removeClass(e,"weui-desktop-popover_pos-right-"+T[n]);
h.removeClass(e,"weui-desktop-popover_hide-arrow"),t?h.addClass(e,"weui-desktop-popover_pos-"+t):h.addClass(e,"weui-desktop-popover_hide-arrow");
}
function u(e,t){
var n=/[^\x00-\xff]/g;
if(e.replace(n,"**").length>t)for(var o=Math.floor(t/2),i=o,p=e.length;p>i;i++)if(e.substring(0,i).replace(n,"**").length>=t)return e.substring(0,i)+"...";
return e;
}
e("biz_common/utils/string/html.js");
var _=e("pages/weapp_tpl.html.js"),f=e("biz_wap/utils/ajax.js"),g=e("biz_common/dom/event.js"),w=e("biz_common/tmpl.js"),h=e("biz_common/dom/class.js"),y=e("appmsg/weapp_common.js"),v=e("common/utils.js"),b=e("appmsg/popup_report.js"),j=null,I=null,k=null,C={},E=[],x=y.appidSnInfo,R=[];
if(o()){
d(),r();
var B=["left","center","right"],T=["top","center","bottom"];
return C;
}
});define("appmsg/weproduct.js",["appmsg/weapp_common.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_common/utils/monitor.js","common/utils.js"],function(t){
"use strict";
function e(){
if(console.log("weproduct init"),"function"==typeof document.getElementsByClassName){
var t=document.getElementsByClassName("js_product_container");
t&&t.length>0&&(a(t),d.getAppidInfo({
onSuccess:function(e){
g.data=e.data,o(t);
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
}catch(p){}
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
return d.jumpUrl({
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
2==o&&(r=4),p([{
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
if(n&&n.length>0&&m.getInnerHeight()){
for(var e=0;e<n.length;e++)g.pvele.push(n[e]);
i(),c.on(window,"scroll",i);
}
}
function i(){
g.checkInScreenId&&clearTimeout(g.checkInScreenId),g.checkInScreenId=setTimeout(function(){
g.checkInScreenId=null;
for(var t=[],e=0;e<g.pvele.length;e++){
var a=g.pvele[e],n=a.getBoundingClientRect(),o=n.height||n.bottom-n.top;
if(o>0&&n.top<m.getInnerHeight()&&n.bottom>0){
var r=a.getAttribute("data-pid");
if(r){
var d=a.getAttribute("data-pidtype"),s=1;
2==d&&(s=3),t.push({
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
g.pvele.splice(e--,1);
}
}
p(t),0==g.pvele.length&&(c.off(window,"scroll",i),i=null);
},100);
}
function r(){
setTimeout(function(){
var t=document.getElementsByClassName("js_product_loop_content").length,e=document.getElementsByClassName("js_product_err_container").length;
u.setSum("64469","15",t+e),u.setSum("64469","16",t),u.setSum("64469","18",e),u.send();
},0);
}
function p(t){
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
var d=t("appmsg/weapp_common.js"),c=t("biz_common/dom/event.js"),s=t("biz_wap/utils/ajax.js"),l=t("biz_common/utils/url/parse.js"),u=t("biz_common/utils/monitor.js"),m=t("common/utils.js"),g={
pvele:[],
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
jumpurlkey:e.jumpurlkey,
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
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","pages/video_communicate_adaptor.js","biz_wap/utils/ajax_wx.js","common/utils.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}catch(n){}
}
function i(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=c.video_top.length,n=e+d.getInnerHeight(),r=0,m=0;t>m;m++){
var a=c.video_top[m];
a.reported?r++:n>=a.start&&n<=a.end&&(a.reported=!0,setTimeout(function(e,t,i){
return function(){
var n=o.getVideoInfo(),d="",r="",c=3;
n[e]&&(n[e].hit_bizuin&&(d=n[e].hit_bizuin),n[e].hit_vid&&(r=n[e].hit_vid),n[e].ori_status&&(c=n[e].ori_status)),
s.report({
step:1,
hit_vid:r,
hit_bizuin:d,
ori_status:c,
vid:e,
screen_num:Math.ceil(t/i),
screen_height:i
});
};
}(a.vid,n,d.getInnerHeight()),1e4));
}
r==t&&(p.off(window,"scroll",i),c.video_top=c.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o=e("pages/video_communicate_adaptor.js"),n=e("biz_wap/utils/ajax_wx.js"),d=e("common/utils.js"),r=e("biz_common/utils/url/parse.js"),s=e("new_video/ctl.js"),c={
txVideoReg:/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
mpVideoReg:/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/,
video_iframe:[],
video_top:[]
},m=e("pages/version4video.js"),a=e("biz_common/dom/attr.js"),p=(a.setProperty,e("biz_common/dom/event.js")),l=document.getElementsByTagName("iframe"),u=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var _=Math.ceil(1e4*Math.random()),w=0,v=l.length;v>w;++w)!function(e){
var i=e.getAttribute("data-src")||"",o=e.className||"",d=e.getAttribute("src")||i;
if(!i||"#"==i){
var s=e.getAttribute("data-display-src");
if(s&&(0==s.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==s.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
s=s.replace(/&amp;/g,"&");
for(var a=s.split("&"),p=["/mp/newappmsgvote?action=show"],l=0;l<a.length;l++)(0==a[l].indexOf("__biz=")||0==a[l].indexOf("supervoteid="))&&p.push(a[l]);
p.length>1&&(i=p.join("&")+"#wechat_redirect");
}
}
if(d&&(c.txVideoReg.test(d)||c.mpVideoReg.test(d))){
if(m.isShowMpVideo()||c.mpVideoReg.test(d)){
var w=r.getQuery("vid",i);
if(!w)return;
var v=e.getAttribute("data-vw"),f=e.getAttribute("data-vh"),g=document.domain;
"qq.com"==g&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(w),c.video_iframe.push({
dom:e,
vid:w
}),d=["/mp/videoplayer?video_h=",f,"&video_w=",v,"&scene=",window.source,"&random_num=",_,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",w,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||"","&sessionid=",window.sessionid||"","&preview=",window.is_temp_url?1:0].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t){
t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__?n({
url:e,
type:"GET",
f:"html",
success:function(i){
t.setAttribute("src",e),t.setAttribute("data-realsrc",e),t.contentDocument.open("text/html","replace"),
t.contentDocument.write(i),t.contentDocument.close(),t.contentWindow.__iframe_src__=e,
t.contentWindow.history.replaceState(null,null,e);
}
}):t.setAttribute("src",e);
},0,d,e);
}
}else if(i&&(i.indexOf("newappmsgvote")>-1&&o.indexOf("js_editor_vote_card")>=0||0==i.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&o.indexOf("card_iframe")>=0||i.indexOf("appmsgvote")>-1||i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&i.indexOf(window.biz)<0)return void u.push(e);
if(window.__second_open__||(i=i.replace(/^http:/,location.protocol)),o.indexOf("card_iframe")>=0){
var h=i.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(h+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?n({
url:h,
type:"GET",
f:"html",
success:function(o){
e.setAttribute("src",h),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(o),
e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,h),
-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",h),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}else{
var x=i.indexOf("#wechat_redirect")>-1,b=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?b+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):o.indexOf("vote_iframe")>=0&&(b+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var h=x?i.replace("#wechat_redirect",b):i+b;
window.__second_open__?n({
url:h,
type:"GET",
f:"html",
success:function(o){
e.contentWindow.Ajax=n,e.setAttribute("src",h),e.contentWindow.document.open("text/html","replace"),
e.contentWindow.document.write(o),e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,h),
-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",h),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}
e.appmsg_idx=l;
}
if(i&&i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&v>0){
var y=v,j=3*y/4;
e.width=y,e.height=j,e.style.setProperty&&(e.style.setProperty("width",y+"px","important"),
e.style.setProperty("height",j+"px","important"));
}
}(l[w]);
for(var f=0;f<u.length;f++){
var g=u[f];
g.parentNode.removeChild(g);
}
if(window.iframe_reload=function(){
for(var e=0,i=l.length;i>e;++e){
var o=l[e],n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var h,x=document.getElementsByClassName("video_iframe"),w=0;h=x.item(w++);)h.setAttribute("scrolling","no"),
h.style.overflow="hidden";
c.video_iframe.length>0&&setTimeout(function(){
for(var e=c.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var r=e[o];
if(!r||!r.dom)return;
for(var s=r.dom,m=s.offsetHeight,a=0;s&&t!==s;)a+=s.offsetTop,s=s.offsetParent;
c.video_top.push({
start:a+m/2,
end:a+m/2+d.getInnerHeight(),
reported:!1,
vid:r.vid
});
}
i(),p.on(window,"scroll",i);
});
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("question_answer/utils.js",["biz_common/utils/string/html.js","pages/utils.js","biz_wap/jsapi/core.js","appmsg/log.js","biz_wap/utils/mmversion.js","biz_common/dom/event.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var t=e("pages/utils.js"),r=e("biz_wap/jsapi/core.js"),i=e("appmsg/log.js"),o=e("biz_wap/utils/mmversion.js"),n=e("biz_common/dom/event.js"),a={
classPrefix:"qa__",
previewFlag:!1
},s=function(e,t){
var r=new Date(1e3*e),i=e-t,o=r.getFullYear(),n=1*t,a=new Date(1e3*n);
r.setHours(0),r.setMinutes(0),r.setSeconds(0);
var s=r.getTime()/1e3;
return n>=s?3600>i?Math.ceil(i/60)+"分钟前":"今天":n>=s-86400?"昨天":n>=s-172800?"前天":a.getFullYear()===o?a.getMonth()+1+"月"+a.getDate()+"日":a.getFullYear()+"年"+(a.getMonth()+1)+"月"+a.getDate()+"日";
},l=function(e,r){
r=r||Math.ceil((new Date).getTime()/1e3),e.elected_comment_num=e.elected_comment_num||0,
e.like_num=e.like_num||0,1*e.is_anoymous&&1*!e.is_self_question&&(e.questioner_nickname="匿名",
e.questioner_headimg="",e.question_info.questioner_useruin=""),e.questioner_headimg||(e.questioner_headimg="https://mmbiz.qpic.cn/mmbiz_png/cVgP5bCElFjtIK2EeF0OjuGhbZVFRYyGRfbFeZ9GibWsibibIWP7XRSKews1ibWFZD5biaSXb7HfMF6dMricUib4naAFw/0");
var i=e.question_info;
e.question_page_url=c(e.question_page_url.html(!1)),e.questioner_useruin=i.questioner_useruin,
e.qa_id=e.question_info.qa_id,i.answer&&(i.answer.answer_time_str=s(r,i.answer.answer_timestamp)),
i.question&&(i.question.ask_time_str=s(r,i.question.ask_timestamp),i.question.title=i.question.title.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
i.question.title=t.emojiFormat(i.question.title));
for(var o=[],n=[],a=[],l=[i.question?i.question.desc:[],i.answer?i.answer.answer:[]],u=function(e){
l[e]=l[e].map(function(r){
return"TEXT"===r.type&&r.content?(r.content=r.content.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
r.content=t.emojiFormat(r.content)):"PIC_CDN_URL"===r.type&&(o.push(r.content),0===e?n.push(r.content):1===e&&a.push(r.content)),
r;
});
},p=0,m=l.length;m>p;p++)u(p,m);
return e.allImg=o,e.allQuestionImg=n,e.allAnswerImg=a,e;
},u=function(e){
if(!a.previewFlag){
a.previewFlag=!0,"undefined"==typeof window.getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var t={
current:e.curUrl,
urls:e.imgsSrc,
currentInfo:{
url:e.curUrl,
data:""
}
},n=e.dataUrlDom,s="";
if(n){
var l=window.getComputedStyle(n),u=document.createElement("canvas");
u.style.width=l.width,u.style.height=l.height,u.width=parseFloat(l.width),u.height=parseFloat(l.height);
var p=u.getContext("2d");
if(!o.isAndroid)try{
p.drawImage(n,0,0,parseFloat(l.width),parseFloat(l.height)),s=u.toDataURL();
}catch(c){
s="";
}
s&&(t.currentInfo.data=s);
}
var m=null;
if(e.posDom){
var d=window.getComputedStyle(e.posDom),g=e.posDom.getBoundingClientRect();
m={
x:g.left-parseFloat(d.paddingLeft)-parseFloat(d.borderLeftWidth),
y:g.top-parseFloat(d.paddingTop)-parseFloat(d.borderTopWidth),
width:g.width-parseFloat(d.paddingLeft)-parseFloat(d.paddingRight)-parseFloat(d.borderLeftWidth)-parseFloat(d.borderRightWidth),
height:g.height-parseFloat(d.paddingTop)-parseFloat(d.paddingBottom)-parseFloat(d.borderTopWidth)-parseFloat(d.borderBottomWidth)
},t.currentInfo.pos=m;
}
r.invoke("imagePreview",t,function(t){
console.log("imagePreview response",t),window.__addIdKeyReport&&e.reportId&&e.reportKey&&window.__addIdKeyReport(e.reportId,e.reportKey);
}),setTimeout(function(){
a.previewFlag=!1;
},500),i("[questionAnswer] click image, src: "+e.curUrl);
}
},p=function(e){
var t="."+a.classPrefix+"preview_js";
e.container.querySelectorAll(t).forEach(function(t){
!function(r){
n.on(r,"click",function(){
var i=null;
i="img"===r.nodeName.toLocaleLowerCase()&&r.className.indexOf("qa__preview_base64_js")>=0?r:r.querySelector("img.qa__preview_base64_js"),
u({
curUrl:r.getAttribute("data-src"),
dataUrlDom:i,
imgsSrc:e.imgsSrc,
posDom:t,
reportId:e.jsapiReportId,
reportKey:e.jsapiReportKey
});
});
}(t);
});
},c=function(e){
return e.replace("#rd","#wechat_redirect").replace(/^http:\/\//,"https://");
};
return{
formatQuestionInfo:l,
formatCreateTime:s,
classPrefix:a.classPrefix,
bindReviewImageEvent:p,
formatPageUrl:c,
reviewImage:u
};
});define("appmsg/product.js",["biz_common/dom/event.js","common/utils.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=0;t<i.length;++t){
var o=i[t];
if(!o.isReport){
var n=o.offsetTop;
n>=e&&e+r.getInnerHeight()>=n&&(o.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+o.product_id+"&order="+o.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js"),r=e("common/utils.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),d=document.getElementsByClassName("js_product_a"),i=[],s=0;s<n.length;++s){
var a=n[s];
a.dataset&&a.dataset.product_id&&a.dataset.order&&i.push({
dom:a,
offsetTop:a.offsetTop,
product_id:a.dataset.product_id||"",
order:a.dataset.order||"",
isReport:!1
});
}
i.length>0&&(o.on(window,"scroll",t),t());
for(var s=0;s<d.length;++s)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(d[s]);
}
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t,o,a){
var i={
current:e,
urls:t,
currentInfo:{
url:e,
data:o,
pos:a
}
};
console.log("imagePreview request",i),console.log("previewFlag",g),g||(g=!0,r.invoke("imagePreview",i,function(e){
console.log("imagePreview response",e),window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),setTimeout(function(){
g=!1;
},500),d("[Appmsg] click image, src: "+e));
}
function o(e,t){
s({
url:"/mp/rewardappmsgreport",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
oper:t||"",
cdn_url:e||"",
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0
});
}
function a(e){
var a=[],r=e.container,d=e.imgs||[];
if(r)for(var s=r.getElementsByTagName("img")||[],g=0,l=s.length;l>g;g++)d.push(s.item(g));
for(var c=p.isIOS&&1==window._copyright_stat&&1==window.is_need_reward,m=0,g=0,l=d.length;l>g;g++){
var w=d[g],u=w.getAttribute("data-src")||w.getAttribute("src"),h=w.getAttribute("data-type");
if(u&&!u.isGif()&&0!=u.indexOf("data:")){
for(;-1!=u.indexOf("?tp=webp");)u=u.replace("?tp=webp","");
w.dataset&&w.dataset.s&&u.isCDN()&&(u=u.replace(/\/640$/,"/0"),u=u.replace(/\/640\?/,"/0?")),
u.isCDN()&&(u=n.addParam(u,"wxfrom","3",!0)),u=e.is_https_res?u.http2https():u.https2http(),
h&&(u=n.addParam(u,"wxtype",h,!0)),a.push(u),"1"!=w.getAttribute("data-nopreviewclick")&&!function(e){
p.isAndroid&&w.setAttribute("data-wxsrc",e),i.on(w,"click",function(i){
if(i.stopPropagation(),!(i&&i.target&&i.target.className&&i.target.className.indexOf("img_loadederror")>-1)){
if("function"==typeof window.__addIdKeyReport&&window.__addIdKeyReport("110644",2),
window.getComputedStyle){
for(var r=i.target,n=r.getBoundingClientRect(),d=.15*n.width,s=.15*n.height,g=!0;r&&"body"!=r.nodeName.toLowerCase();){
var l=window.getComputedStyle(r,null),w=parseInt(l.getPropertyValue("opacity")),u=l.getPropertyValue("filter"),h=l.getPropertyValue("visibility"),f=l.mixBlendMode;
if(1!=w||"visible"!=h||u.indexOf("opacity")>=0||u.indexOf("blur")>=0||f&&"normal"!=f){
g=!1;
break;
}
var b=r.getBoundingClientRect();
if(("hidden"==l.overflow||"hidden"==l.overflowX||"hidden"==l.overflowY)&&(b.left-n.left>d||b.right-n.right<-1*d||b.top-n.top>s||b.bottom-n.bottom<-1*s)){
g=!1;
break;
}
r=r.parentElement;
}
if(!g){
if(console.log("don't try this again"),"function"==typeof window.__addIdKeyReport){
window.__addIdKeyReport("110644",3);
var y=new Image,_="https://badjs.weixinbridge.com/badjs?id=168&level=4&from="+encodeURIComponent(location.href)+"&msg="+encodeURIComponent(e);
y.src=_.slice(0,1024);
}
return!1;
}
}
"undefined"==typeof getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var v=i.target,j=window.getComputedStyle(v),F=v.getBoundingClientRect(),x=document.createElement("canvas");
x.style.width=j.width,x.style.height=j.height,x.width=parseFloat(j.width),x.height=parseFloat(j.height);
var C=x.getContext("2d"),I="";
C.drawImage(v,0,0,parseFloat(j.width),parseFloat(j.height));
try{
I=x.toDataURL();
}catch(i){}
p.isAndroid&&(I=""),t(e,a,I,{
x:F.left-parseFloat(j.paddingLeft)-parseFloat(j.borderLeftWidth),
y:F.top-parseFloat(j.paddingTop)-parseFloat(j.borderTopWidth),
width:F.width-parseFloat(j.paddingLeft)-parseFloat(j.paddingRight)-parseFloat(j.borderLeftWidth)-parseFloat(j.borderRightWidth),
height:F.height-parseFloat(j.paddingTop)-parseFloat(j.paddingBottom)-parseFloat(j.borderTopWidth)-parseFloat(j.borderBottomWidth)
}),c&&0==m&&o(i.target.src,2);
}
});
}(u),w.removeAttribute("data-nopreviewclick");
}
}
if(c){
var f=document.getElementById("js_content"),b=0,y=0;
i.on(f,"touchstart",function(e){
return e&&e.target&&e.target.tagName&&"string"==typeof e.target.tagName&&"IMG"==e.target.tagName.toString().toUpperCase()?(m=+new Date,
b=e.touches[0].pageX,void(y=e.touches[0].pageY)):void(m=0);
}),i.on(f,"touchmove",function(e){
var t=e.touches[0].pageX,o=e.touches[0].pageY;
Math.abs(t-b)>10&&Math.abs(o-y)>10&&(m=0);
}),i.on(f,"touchend",function(e){
0!=m&&(+new Date-m>800&&+new Date-m<6e3?o(e.target.src,1):m=0);
});
}
}
var i=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),n=e("biz_common/utils/url/parse.js"),d=e("appmsg/log.js"),s=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/mmversion.js"),g=!1;
return e("appmsg/cdn_img_lib.js"),a;
});define("appmsg/outer_link.js",["biz_common/dom/event.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","appmsg/popup_report.js"],function(e){
"use strict";
function t(e){
e.preventDefault();
}
function n(e){
var n=e.container;
if(!n)return!1;
for(var u=n.getElementsByTagName("a")||[],l=0,_=u.length;_>l;++l)!function(n){
var l=u[n],_=l.getAttribute("href");
if(!_)return!1;
var d=0,g=l.innerHTML;
/^[^<>]+$/.test(g)?d=1:/^<img[^>]*>$/.test(g)&&(d=2);
var f=l.getAttribute("data-linktype"),y=l.getAttribute("href");
!!e.changeHref&&!/^https?:\/\/mp\.weixin\.qq\.com\/cgi-bin\//.test(_)&&(_=e.changeHref(_,d)),
o.on(l,"tap",function(e){
e.preventDefault();
var n="";
s[l.getAttribute("data-itemshowtype")]&&(n=s[l.getAttribute("data-itemshowtype")]);
var o=document.getElementById("js_link_dialog_name");
if(o.innerText="即将打开新的页面",a[y]&&a[y].subject_name&&"0"===a[y].item_show_type&&a[y].title?o.innerText='即将打开公众号 "'+a[y].subject_name+'" 的'+s[a[y].item_show_type]+"《"+a[y].title+"》":a[y]&&a[y].subject_name&&a[y].item_show_type>=0&&(o.innerText='即将打开公众号 "'+a[y].subject_name+'" 的'+s[a[y].item_show_type]),
e.stopPropagation(),"undefined"==typeof c[y]&&(y.indexOf("mp.weixin.qq.com/s/")>-1||y.indexOf("mp.weixin.qq.com/s?")>-1)?(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=110809_6_1&r="+Math.random():"undefined"==typeof c[y]&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=110809_7_1&r="+Math.random()),
c=function(){
return a[y]&&a[y].item_show_type>=0&&_.indexOf("mp.weixin.qq.com")>-1&&(p.isIOS||p.isAndroid)&&!p.isInMiniProgram?1==l.getAttribute("clicked")?!1:(r.invoke("openWebViewUseFastLoad",{
url:_,
item_show_type:a[y].item_show_type,
openType:0,
scene:1
},function(e){
console.log("openWebViewUseFastLoad res: ",e),e&&e.err_msg&&-1==e.err_msg.indexOf("ok")?r.invoke("openUrlWithExtraWebview",{
url:_,
openType:1
},function(e){
l.setAttribute("clicked",0),e&&e.err_msg&&-1==e.err_msg.indexOf("ok")&&(window.location.href=url);
}):(l.setAttribute("clicked",0),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28839_37_1");
}),!1):void(p.isAndroid||p.isIOS?i(_,{
sample:1,
reject:function(){
location.href=_;
}
}):location.href=_);
},"1"===f&&m.report([2,m.getRedirectType(y),"",img_popup?1:0,window.source,m.getUrlData(y)]),
"1"===f&&img_popup){
var u=document.getElementById("js_link_dialog");
u.style.display="block",u._url=y,document.querySelector("body").addEventListener("touchmove",t,{
passive:!1
});
}else c();
return!1;
},!0);
}(l);
}
var o=e("biz_common/dom/event.js"),i=e("appmsg/open_url_with_webview.js"),r=e("biz_wap/jsapi/core.js"),p=e("biz_wap/utils/mmversion.js"),m=(e("biz_wap/utils/ajax.js"),
e("appmsg/popup_report.js")),s={
0:"文章",
11:"文章",
8:"图片",
7:"语音",
5:"视频"
},a={};
if("undefined"!=typeof jumpInfo)for(var u=0;u<jumpInfo.length;u++)a[jumpInfo[u].url]={
title:jumpInfo[u].title,
item_show_type:jumpInfo[u].item_show_type,
subject_name:jumpInfo[u].subject_name,
link_type:jumpInfo[u].link_type
};
var c=function(){};
return o.on(document.getElementById("js_link_dialog_ok"),"click",function(){
var e=document.getElementById("js_link_dialog");
m.report([4,m.getRedirectType(e._url),"",img_popup?1:0,window.source,m.getUrlData(e._url)]),
document.querySelector("body").removeEventListener("touchmove",t),c&&c(),document.getElementById("js_link_dialog").style.display="none";
}),o.on(document.getElementById("js_link_dialog_cancel"),"click",function(){
document.querySelector("body").removeEventListener("touchmove",t);
var e=document.getElementById("js_link_dialog");
e.style.display="none",m.report([3,m.getRedirectType(e._url),"",img_popup?1:0,window.source,m.getUrlData(e._url)]);
}),n;
});
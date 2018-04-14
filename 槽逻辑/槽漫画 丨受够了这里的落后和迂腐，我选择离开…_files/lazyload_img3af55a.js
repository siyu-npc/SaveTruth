define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js"],function(e){
"use strict";
function t(e,t){
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,d=0,r=e.length;r>d;++d)o=e[d],
o&&(n=o.getAttribute(t),n&&(i=n.match(a),i&&i[2]&&(h[i[2]]=!0)));
}
function o(e){
for(var t=0,o=v.length;o>t;++t)if(v[t]==e)return!0;
return!1;
}
function n(){
h={},t(document.getElementsByTagName("a"),"href"),t(document.getElementsByTagName("link"),"href"),
t(document.getElementsByTagName("iframe"),"src"),t(document.getElementsByTagName("script"),"src"),
t(document.getElementsByTagName("img"),"src");
var e=[];
for(var n in h)h.hasOwnProperty(n)&&(window.networkType&&"wifi"==window.networkType&&!y&&o(n)&&(y=!0),
e.push(n));
return h={},e.join(",");
}
function i(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=b.js_content,i=b.screen_height,a=b.screen_width,d=b.scroll_height,r=Math.ceil(d/i),s=Math.ceil((o.scrollHeight||o.offsetHeight)/i),m=(window.logs.read_height||t)+i,_=b.pageEndTop,w=b.imgs,c=Math.ceil(m/i)||1,g=b.media,p=50,u=0,h=0,v=0,j=0,T=m+p>_?1:0;
c>r&&(c=r);
var z=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
u++;
var a=i.getAttribute("src"),d=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(h++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&j++),d&&(e["img_"+d+"_cnt"]=e["img_"+d+"_cnt"]||0,
e["img_"+d+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=j||0,e.download_img_cnt=h||0,e.download_cdn_img_cnt=v||0,
e.img_cnt=u||0;
},O=window.appmsgstat||{},E=window.logs.img||{},x=window.logs.pagetime||{},k=E.load||{},D=E.read||{},I=[],S=[],B=0,N=0,M=0;
for(var H in D)H&&0==H.indexOf("http")&&D.hasOwnProperty(H)&&S.push(H);
for(var H in k)H&&0==H.indexOf("http")&&k.hasOwnProperty(H)&&I.push(H);
for(var P=0,q=I.length;q>P;++P){
var A=I[P];
A&&A.isCDN()&&(-1!=A.indexOf("/0")&&B++,-1!=A.indexOf("/640")&&N++,-1!=A.indexOf("/300")&&M++);
}
var e={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
subscene:window.subscene||0,
read_cnt:O.read_num||0,
like_cnt:O.like_num||0,
screen_width:a,
screen_height:i,
screen_num:s,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:window.logs.video_cnt||0,
read_screen_num:c||0,
is_finished_read:T,
scene:source,
content_len:f.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:N,
img_0_cnt:B,
img_300_cnt:M,
wtime:x.onload_time||0,
ftime:x.ftime||0,
ptime:x.ptime||0,
onload_time:x.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:ct
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=I.length,
e.wifi_read_imgs_cnt=S.length),window.logs.webplog&&4==window.logs.webplog.total){
var R=window.logs.webplog;
e.webp_total=1,e.webp_lossy=R.lossy,e.webp_lossless=R.lossless,e.webp_alpha=R.alpha,
e.webp_animation=R.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var Y=window.logs.idkeys,J=[];
for(var K in Y)if(Y.hasOwnProperty(K)){
var C=Y[K];
C.val>0&&J.push(K+"_"+C.val);
}
e.idkey=J.join(";");
}
z(!!g&&g.getElementsByTagName("img")),z(w);
var W=(new Date).getDay(),L=n();
return(y||0!==user_uin&&Math.floor(user_uin/100)%7==W)&&(e.domain_list=L),y&&(e.html_content=l),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e;
}
function a(e){
j||(j=!0,p.remove("page_time"),e.report_time=parseInt(+new Date/1e3),e.ascene=window.ascene||-1,
_({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function d(){
if(window._adRenderData&&"undefined"!=typeof JSON&&JSON.stringify){
var e=JSON.stringify(window._adRenderData),t=+new Date,o=[biz,sn,mid,idx].join("_"),n=new c("ad");
n.set(o,{
info:e,
time:t
},+new Date+24e4);
}
g.set(o,z,+new Date+72e5);
}
function r(){
return window.__video_report_data;
}
function s(e){
e&&e.play_type&&(u.remove("spad"),e.report_type=1,_({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
e("biz_common/utils/string/html.js");
var m=e("biz_common/dom/event.js"),_=e("biz_wap/utils/ajax.js"),w=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var l,c=e("biz_wap/utils/storage.js"),g=new c("page_pos"),p=new c("time_on_page"),u=new c("spad"),f={};
!function(){
l=document.getElementsByTagName("html"),l&&1==!!l.length&&w&&(l=l[0].innerHTML,f.content_length=w.htmlSize),
window.logs.pageinfo=f;
}();
var h={},y=!1,v=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],b={
js_content:document.getElementById("js_content"),
screen_height:document.documentElement.clientHeight||window.innerHeight,
screen_width:document.documentElement.clientWidth||window.innerWidth,
scroll_height:document.body.scrollHeight||document.body.offsetHeight,
pageEndTop:document.getElementById("js_toobar3").offsetTop,
imgs:document.getElementById("js_content").getElementsByTagName("img")||[],
media:document.getElementById("media")
},j=!1,T=null,z=0,O=(msg_link.split("?").pop(),[biz,sn,mid,idx].join("_"));
!function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(m.on(window,"load",function(){
z=1*g.get(O);
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var o=t.offsetTop;
window.scrollTo(0,o-25);
}else window.scrollTo(0,z);
if(window.__wxjs_is_wkwebview){
var n=p.getData("page_time");
n.page_time&&(a(n.page_time.val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random()),
window.setInterval(function(){
var e=i();
p.set("page_time",e,+new Date+864e7);
},1e3);
}
var m=u.getData("spad");
m.spad&&s(m.spad.val),window.setInterval(function(){
d();
var e=r();
u.set("spad",e,+new Date+864e7);
},1e3);
}),m.on(window,"unload",function(){
window.__ajaxtest="2";
var e=i();
a(e);
}),window.logs.read_height=0,m.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(T),T=setTimeout(function(){
z=window.pageYOffset,g.set(O,z,+new Date+72e5);
},500);
}),m.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(T),T=setTimeout(function(){
z=window.pageYOffset,g.set(O,z,+new Date+72e5);
},500);
}));
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
function e(e){
var i=[];
for(var n in e)i.push(n+"="+encodeURIComponent(e[n]||""));
return i.join("&");
}
if(networkType){
var i=window.performance||window.msPerformance||window.webkitPerformance;
if(i&&"undefined"!=typeof i.getEntries){
var n,t,a=100,o=document.getElementsByTagName("img"),s=o.length,p=navigator.userAgent,m=!1;
/micromessenger\/(\d+\.\d+)/i.test(p),t=RegExp.$1;
for(var g=0,w=o.length;w>g;g++)if(n=parseInt(100*Math.random()),!(n>a)){
var d=o[g].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,u=i.getEntries(),c=0;c<u.length;c++)if(f=u[c],f.name==d){
var _=o[g].getAttribute("data-fail");
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:t,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[g].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:s>100?100:s,
delay_time:parseInt(f.duration),
from:window.isSg?"sougou":"",
fail:_
})
}),m=!0;
break;
}
if(m)break;
}
}
}
}
}
var n=e("biz_common/dom/event.js"),t=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
t.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],i();
}),n.on(window,"load",i,!1);
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
});define("appmsg/new_index.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
var n=e("biz_common/dom/event.js"),s=e("biz_wap/jsapi/core.js"),t=document.getElementById("js_new_appmsg_addcontact");
n.tap(t,function(){
return s.invoke("addContact",{
webtype:"1",
username:user_name_new||user_name
},function(e){
(-1!=e.err_msg.indexOf("ok")||-1!=e.err_msg.indexOf("added"))&&(t.style.display="none");
}),!1;
});
});define("appmsg/weapp.js",["biz_common/utils/string/html.js","pages/weapp_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/tmpl.js","biz_common/dom/class.js","appmsg/weapp_common.js"],function(e){
"use strict";
function t(e,t,n){
var i=new Image;
i.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=106&content="+n+",biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(t.toString())+"&r="+Math.random()).substr(0,1024),
console&&t&&console.error(t);
}
function n(e,t,n,i,a,o,p){
s({
url:"/mp/appmsgreport?action=appmsg_weapp_report",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e||"",
weapp_pos:t||0,
weapp_title:i||0,
weapp_nickname:n||0,
type:a||0,
scene:window.source||-1,
weapp_type:o,
is_confirm:p||0,
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
function i(){
var e=m("js_content");
if(!e)return!1;
w=e.getElementsByTagName("mp-weapp")||[],f=e.getElementsByTagName("mp-miniprogram")||[],
h=[];
for(var t=e.getElementsByTagName("a"),n=0,i=t.length;i>n;n++){
var a=t[n],o=a.getAttribute("data-miniprogram-appid");
o&&h.push(a);
}
return w.length<=0&&f.length<=0&&0==h.length?!1:j&&0!=j.length?!0:!1;
}
function a(e){
return e=e||"",e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function o(e,t,i,a,o){
n(e,t,i,a,4,o),window.__addIdKeyReport&&window.__addIdKeyReport("28307",103);
}
function p(e,t,i,a,o){
n(e,t,i,a,5,o);
}
function r(){
window.reportWeappid=[];
for(var e=0;e<j.length;e++)window.reportWeappid.push(j[e].appid);
var i=function(){};
c.on(document.getElementById("js_minipro_dialog_ok"),"click",function(){
i&&i(),document.getElementById("js_minipro_dialog").style.display="none";
}),c.on(document.getElementById("js_minipro_dialog_cancel"),"click",function(){
var e=document.getElementById("js_minipro_dialog");
e.style.display="none",n(e._appid,e._i,e._nickname,e._title,3,1,1),window.__addIdKeyReport&&window.__addIdKeyReport("28307",116);
}),u.getAppidInfo({
onSuccess:function(r){
var d=r.data.infoMap;
if(d){
for(e=0;e<b.length;e++)(function(e){
var r=b[e].appid,m=b[e].path,s=b[e].imageUrl,w=b[e].title,f=b[e].elem,h=d[r];
if(h){
var y=f.tagName.toLowerCase(),j=f.firstChild&&1==f.firstChild.nodeType&&"IMG"===f.firstChild.tagName;
if(j=j||f.firstElementChild&&"IMG"===f.firstElementChild.tagName,"a"!=y)f.innerHTML=_.tmpl(l,{
imageUrl:a(s),
title:a(w),
nickname:a(h.nickname),
avatar:a(h.logo_url)
});else{
if(j){
var I=f.firstChild;
I&&g.addClass(f,"weapp_image_link");
}else g.addClass(f,"weapp_text_link");
f.href="javascript:void(0);";
}
c.on(f,"a"==y?"click":"tap",function(){
if(i=function(){
var i=j?1:"a"==y?2:0;
return u.jumpUrl({
sceneNote:encodeURIComponent(location.href),
appid:r,
path:m,
scene:1058,
beforeNonWechatWarn:function(){
p(r,e,h.nickname,w,i);
},
beforeJumpBackupPage:function(){
o(r,e,h.nickname,w,i);
},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102),
t(107,new Error(e.err_msg),"");
}
}),window.__addIdKeyReport&&window.__addIdKeyReport("28307",100),n(r,e,h.nickname,w,3,i,j?2:0),
j&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",115),!1;
},j&&wxa_img_alert){
document.getElementById("js_minipro_dialog_name").innerText=h.nickname;
var a=document.getElementById("js_minipro_dialog");
return a.style.display="block",a._appid=r,a._i=e,a._nickname=h.nickname,a._title=w,
n(r,e,h.nickname,w,3,1,0),u.canJumpOnTap&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",114),
!1;
}
return i();
},"a"==y);
}
})(e);
var m=null,s=function(){
m=null;
for(var e=window.innerHeight||document.documentElement.clientHeight,t=0;t<I.length;t++){
var i=I[t].elem,a=i.tagName.toLowerCase(),o=i.firstChild&&1==i.firstChild.nodeType,p=o?1:"a"==a?2:0,r=I[t].elem.getBoundingClientRect();
r.top<e&&r.bottom>0&&(setTimeout(function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307",101);
},0),n(I[t].appid,t,d[I[t].appid].nickname,I[t].title,2,p),I.splice(t--,1));
}
};
s(),c.on(window,"scroll",function(){
m||(m=setTimeout(s,100));
});
}
},
onError:function(e){
3==e.code&&t(106,e.catchErr,"parsing weapp info error");
}
});
}
function d(){
for(var e=0;e<f.length+w.length;e++){
var t=e<f.length,n=t?f[e]:w[e-f.length],i=n.getAttribute(t?"data-miniprogram-appid":"data-weapp-appid")||"",a=n.getAttribute(t?"data-miniprogram-path":"data-weapp-path")||"",o=n.getAttribute(t?"data-miniprogram-imageUrl":"data-weapp-imageUrl")||"",p=n.getAttribute(t?"data-miniprogram-title":"data-weapp-title")||"",r=document.createElement("span");
n.setAttribute("class",""),r.setAttribute("class","weapp_display_element js_weapp_display_element"),
b.push({
appid:i,
path:a,
imageUrl:o,
title:p,
elem:r
}),I.push({
appid:i,
elem:r,
title:p
}),n.parentNode.insertBefore(r,n.nextSibling);
}
for(var e=0;e<h.length;e++){
var d=h[e];
b.push({
appid:d.getAttribute("data-miniprogram-appid"),
path:d.getAttribute("data-miniprogram-path")||"",
elem:d
});
}
}
function m(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var l=e("pages/weapp_tpl.html.js"),s=e("biz_wap/utils/ajax.js"),c=e("biz_common/dom/event.js"),_=e("biz_common/tmpl.js"),g=e("biz_common/dom/class.js"),u=e("appmsg/weapp_common.js"),w=null,f=null,h=null,y={},b=[],j=u.appidSnInfo,I=[];
return i()?(d(),r(),y):void 0;
});define("appmsg/weproduct.js",["appmsg/weapp_common.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(){
if("function"==typeof document.getElementsByClassName){
var e=document.getElementsByClassName("js_product_container");
e&&e.length>0&&r.getAppidInfo({
onSuccess:function(t){
l.data=t.data,n(e);
}
}),a();
}
}
function n(e){
for(var t=0,n=e.length;n>t;t++)!function(e,t){
c.on(e,"tap",".js_product_loop_content",function(e){
var n=e.delegatedTarget,o=n.getAttribute("data-wxaappid"),a=n.getAttribute("data-wxapath"),c=n.getAttribute("data-pid");
return r.jumpUrl({
appid:o,
path:a,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(c),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&c&&i([{
wxa_appid:o,
pid:c,
type:2,
absolute_order:t+1,
templateid:n.getAttribute("data-templateid")||"",
relative_order:1*n.getAttribute("data-order"),
packid:n.getAttribute("data-packid")||""
}]);
}
}),!1;
});
}(e[t],t);
var a=document.getElementsByClassName("js_product_loop_content");
if(a&&a.length>0&&l.innerHeight){
for(var t=0;t<a.length;t++)l.pvele.push(a[t]);
o(),c.on(window,"scroll",o);
}
}
function o(){
l.checkInScreenId&&clearTimeout(l.checkInScreenId),l.checkInScreenId=setTimeout(function(){
l.checkInScreenId=null;
for(var e=[],t=0;t<l.pvele.length;t++){
var n=l.pvele[t],a=n.getBoundingClientRect(),r=a.rect||a.bottom-a.top;
if(r>0&&a.top<l.innerHeight-r/2&&a.bottom>r/2){
var d=n.getAttribute("data-pid");
d&&e.push({
wxa_appid:n.getAttribute("data-wxaappid"),
pid:d,
type:1,
absolute_order:t+1,
templateid:n.getAttribute("data-templateid")||"",
relative_order:1*n.getAttribute("data-order"),
packid:n.getAttribute("data-packid")||""
}),l.pvele.splice(t--,1);
}
}
i(e),0==l.pvele.length&&(c.off(window,"scroll",o),o=null);
},100);
}
function a(){
setTimeout(function(){
var e=document.getElementsByClassName("js_product_loop_content").length,t=document.getElementsByClassName("js_product_err_container").length;
u.setSum("64469","15",e+t),u.setSum("64469","16",e),u.setSum("64469","18",t),u.send();
},0);
}
function i(e){
if(e&&0!=e.length){
for(var t={
batch_no:p.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.user_uin||"",
total:e.length
},n=0;n<e.length;n++){
var o=e[n],a=n+1;
for(var i in o)o.hasOwnProperty(i)&&(t[i+""+a]=o[i]);
}
d({
url:"/mp/productreport?",
type:"POST",
data:t,
dataType:"json",
async:!0
});
}
}
var r=e("appmsg/weapp_common.js"),c=e("biz_common/dom/event.js"),d=e("biz_wap/utils/ajax.js"),p=e("biz_common/utils/url/parse.js"),u=e("biz_common/utils/monitor.js"),l={
pvele:[],
innerHeight:window.innerHeight||document.documentElement.clientHeight,
checkInScreenId:null,
reportRandom:Math.random()
};
t();
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
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(l._oElements=e.getElementsByTagName("qqmusic")||[],l._oElements.length<=0?!1:!0):!1;
}
function i(){
l.musicLen=l._oElements.length;
}
function s(){
for(var e=0,t=0;t<l.musicLen;t++){
var i=l._oElements[t],s={};
s.musicid=m.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
t.media_id=m.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=m.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=m.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=m.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=m.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=m.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=m.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
t.music_name=m.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
l.adapter[t.musictype]&&"function"==typeof l.adapter[t.musictype].initData&&(t=l.adapter[t.musictype].initData(t,{
scene:0
})),m.renderPlayer(n,t,e),a(t),l.musicList[t.musicid+"_"+t.posIndex]=t;
}
function a(e){
var t=e.musicid+"_"+e.posIndex;
c("[Music] init "+e.detailUrl);
var i=m.decodeStr(e.music_name);
e.player=m.init({
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
epname:"QQ音乐",
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
var c=e("appmsg/log.js"),n=e("pages/qqmusic_tpl.html.js"),m=e("pages/voice_component.js"),l={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),l.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
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
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=d.video_top.length,o=e+d.innerHeight,n=0,s=0;t>s;s++){
var m=d.video_top[s];
m.reported?n++:o>=m.start&&o<=m.end&&(m.reported=!0,r.report({
step:1,
vid:m.vid
}));
}
n==t&&(a.off(window,"scroll",i),d.video_top=d.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o,n=e("biz_common/utils/url/parse.js"),r=e("new_video/ctl.js"),d={
videoIframeResizer:[],
txVideoReg:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},s=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),a=(m.setProperty,e("biz_common/dom/event.js")),c=document.getElementsByTagName("iframe"),p=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var l=Math.ceil(1e4*Math.random()),v=0,_=c.length;_>v;++v){
o=c[v];
var u=o.getAttribute("data-src")||"",w=o.className||"",f=o.getAttribute("src")||u;
if(!u||"#"==u){
var g=o.getAttribute("data-display-src");
if(g&&(0==g.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==g.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
g=g.replace(/&amp;/g,"&");
for(var h=g.split("&"),x=["/mp/newappmsgvote?action=show"],v=0;v<h.length;v++)(0==h[v].indexOf("__biz=")||0==h[v].indexOf("supervoteid="))&&x.push(h[v]);
x.length>1&&(u=x.join("&")+"#wechat_redirect");
}
}
if(f&&d.txVideoReg.test(f))if(s.isShowMpVideo()){
var y=n.getQuery("vid",u);
if(!y)continue;
var b=o.getAttribute("data-vw"),k=o.getAttribute("data-vh");
window.reportVid.push(y),d.video_iframe.push({
dom:o,
vid:y
}),f=["/mp/videoplayer?video_h=",k,"&video_w=",b,"&scene=",window.source,"&random_num=",l,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",y,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t,i,o){
return function(){
o.setAttribute("marginWidth",0),o.setAttribute("marginHeight",0),o.style.top="0",
o.setAttribute("src",i);
};
}(b,k,f,o),0);
}else d.videoIframeResizer.push(o);else if(u&&(u.indexOf("newappmsgvote")>-1&&w.indexOf("js_editor_vote_card")>=0||0==u.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&w.indexOf("card_iframe")>=0||u.indexOf("appmsgvote")>-1||u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&u.indexOf(window.biz)<0){
p.push(o);
continue;
}
if(u=u.replace(/^http:/,location.protocol),w.indexOf("card_iframe")>=0){
var j=u.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(j+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
o.setAttribute("src",j);
}else{
var z=u.indexOf("#wechat_redirect")>-1,O=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?O+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):w.indexOf("vote_iframe")>=0&&(O+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var j=z?u.replace("#wechat_redirect",O):u+O;
o.setAttribute("src",j);
}
-1==u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(o),o.appmsg_idx=v;
}
if(u&&u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&b>0){
var I=b,A=3*I/4;
o.width=I,o.height=A,o.style.setProperty&&(o.style.setProperty("width",I+"px","important"),
o.style.setProperty("height",A+"px","important"));
}
}
for(var H=0;H<p.length;H++){
var R=p[H];
R.parentNode.removeChild(R);
}
if(d.videoIframeResizer&&d.videoIframeResizer.length>0&&"function"==typeof window.__getVideoWh&&a.on(window,"resize",function(){
try{
for(var e=0,t=d.videoIframeResizer.length;t>e;e++){
var i=d.videoIframeResizer[e],o=i.contentDocument,n=o.getElementById("mod_player"),r=o.getElementById("mod_tenvideo_video_player_0");
if(n&&r){
var s=window.__getVideoWh(i);
i.style.width=s.w+"px",i.style.height=s.h+"px",n.style.width=s.vw+"px",n.style.height=s.vh+"px",
r.style.width=s.vw+"px",r.style.height=s.vh+"px";
}
}
}catch(m){}
},!1),window.iframe_reload=function(){
for(var e=0,i=c.length;i>e;++e){
o=c[e];
var n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var q,E=document.getElementsByClassName("video_iframe"),v=0;q=E.item(v++);)q.setAttribute("scrolling","no"),
q.style.overflow="hidden";
d.video_iframe.length>0&&setTimeout(function(){
for(var e=d.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var r=e[o];
if(!r||!r.dom)return;
for(var s=r.dom,m=s.offsetHeight,c=0;s&&t!==s;)c+=s.offsetTop,s=s.offsetParent;
d.video_top.push({
start:c+m/2,
end:c+m/2+d.innerHeight,
reported:!1,
vid:r.vid
});
}
i(),a.on(window,"scroll",i);
},0);
});define("appmsg/product.js",["biz_common/dom/event.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=window.innerHeight||document.documentElement.clientHeight,o=0;o<d.length;++o){
var n=d[o];
if(!n.isReport){
var r=n.offsetTop;
r>=e&&e+t>=r&&(n.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+n.product_id+"&order="+n.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),r=document.getElementsByClassName("js_product_a"),d=[],i=0;i<n.length;++i){
var s=n[i];
s.dataset&&s.dataset.product_id&&s.dataset.order&&d.push({
dom:s,
offsetTop:s.offsetTop,
product_id:s.dataset.product_id||"",
order:s.dataset.order||"",
isReport:!1
});
}
d.length>0&&(o.on(window,"scroll",t),t());
for(var i=0;i<r.length;++i)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(r[i]);
}
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/cdn_img_lib.js"],function(t){
"use strict";
function e(t,e){
r.invoke("imagePreview",{
current:t,
urls:e
},function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),o("[Appmsg] click image, src: "+t);
}
function a(t,e){
p({
url:"/mp/rewardappmsgreport",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
oper:e||"",
cdn_url:t||"",
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0
});
}
function i(t){
var i=[],r=t.container,o=t.imgs||[];
if(r)for(var p=r.getElementsByTagName("img")||[],d=0,m=p.length;m>d;d++)o.push(p.item(d));
for(var g=c.isIOS&&1==window._copyright_stat&&1==window.is_need_reward,u=0,d=0,m=o.length;m>d;d++){
var w=o[d],_=w.getAttribute("data-src")||w.getAttribute("src"),l=w.getAttribute("data-type");
if(_&&!_.isGif()&&0!=_.indexOf("data:")){
for(;-1!=_.indexOf("?tp=webp");)_=_.replace("?tp=webp","");
w.dataset&&w.dataset.s&&_.isCDN()&&(_=_.replace(/\/640$/,"/0"),_=_.replace(/\/640\?/,"/0?")),
_.isCDN()&&(_=n.addParam(_,"wxfrom","3",!0)),_=t.is_https_res?_.http2https():_.https2http(),
l&&(_=n.addParam(_,"wxtype",l,!0)),i.push(_),"1"!=w.getAttribute("data-nopreviewclick")&&!function(t){
s.on(w,"click",function(s){
s&&s.target&&s.target.className&&s.target.className.indexOf("img_loadederror")>-1||(e(t,i),
g&&0==u&&a(s.target.src,2));
});
}(_),w.removeAttribute("data-nopreviewclick");
}
}
if(g){
var b=document.getElementById("js_content"),f=0,j=0;
s.on(b,"touchstart",function(t){
return t&&t.target&&t.target.tagName&&"string"==typeof t.target.tagName&&"IMG"==t.target.tagName.toString().toUpperCase()?(u=+new Date,
f=t.touches[0].pageX,void(j=t.touches[0].pageY)):void(u=0);
}),s.on(b,"touchmove",function(t){
var e=t.touches[0].pageX,a=t.touches[0].pageY;
Math.abs(e-f)>10&&Math.abs(a-j)>10&&(u=0);
}),s.on(b,"touchend",function(t){
0!=u&&(+new Date-u>800&&+new Date-u<6e3?a(t.target.src,1):u=0);
});
}
}
var s=t("biz_common/dom/event.js"),r=t("biz_wap/jsapi/core.js"),n=t("biz_common/utils/url/parse.js"),o=t("appmsg/log.js"),p=t("biz_wap/utils/ajax.js"),c=t("biz_wap/utils/mmversion.js");
return t("appmsg/cdn_img_lib.js"),i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var r=n.getElementsByTagName("a")||[],i=0,o=r.length;o>i;++i)!function(n){
var i=r[n],o=i.getAttribute("href");
if(!o)return!1;
var a=0,c=i.innerHTML;
/^[^<>]+$/.test(c)?a=1:/^<img[^>]*>$/.test(c)&&(a=2),!!e.changeHref&&(o=e.changeHref(o,a)),
t.on(i,"click",function(){
return location.href=o,!1;
},!0);
}(i);
}
var t=e("biz_common/dom/event.js");
return n;
});define("appmsg/copyright_report.js",["biz_common/dom/event.js"],function(t){
"use strict";
function o(t){
var o=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",t.scene,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join("");
window.isSg&&(o+="&from=sougou");
var e=new Image;
e.src=o.substr(0,1024);
}
function e(){
var t=__appmsgCgiData;
if("2"==t.copyright_stat){
for(var o=r("copyright_info"),e=r("js_article");o&&e!==o;)c.copyright_top+=o.offsetTop,
o=o.offsetParent;
i.on(window,"scroll",n);
}
}
function n(){
var t=window.pageYOffset||document.documentElement.scrollTop;
t+c.innerHeight>c.copyright_top&&(o({
scene:"1",
card_pos:"0"
}),i.off(window,"scroll",n),n=c.copyright_top=null);
}
function r(t){
return document.getElementById(t);
}
var i=t("biz_common/dom/event.js"),c={
innerHeight:window.innerHeight||document.documentElement.clientHeight,
copyright_top:0
};
return{
card_click_report:o,
card_pv_report:e
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","biz_common/dom/class.js","appmsg/img_copyright_tpl.html.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","biz_wap/utils/mmversion.js","pages/version4video.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js"],function(e,t,n,r){
"use strict";
function i(e,t){
var n=w.getQuery("vid",t);
if(n&&e){
var r=e.parentNode;
if(r){
for(var i=[],a=0,o=r.children.length;o>a;a++){
var s=r.children[a];
s.className.indexOf("img_loading")>=0&&s.getAttribute("data-vid")==n&&i.push(s);
}
for(var a=0,o=i.length;o>a;a++)r.removeChild(i[a]);
e.style.display="block";
}
}
}
function a(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},n=e.img_copy_info.list,r=window.__appmsgCgiData.copyright_stat,i=window.__appmsgCgiData.source_biz,a=0,o=n.length;o>a;a++){
var s=n[a];
if(2==s.type){
if(2==r&&i==s.source_uin)continue;
t[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin,
source_encode_biz:s.source_encode_biz||""
};
}
}
for(var d=document.getElementsByTagName("img"),a=0,o=d.length;o>a;a++){
var s=d[a],_=s.getAttribute("data-src")||s.getAttribute("data-backsrc")||"";
if(t[_]){
var m=document.createElement("div");
m.innerHTML=x.tmpl(u,t[_]);
{
var c=m.children[0],p=s.parentNode,l=p.insertBefore(c,s),w=l.children[0];
(function(e,t){
v.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(k.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}),!1);
});
})(t[_],w);
}
l.insertBefore(s,w);
}
}
}
}
function o(e){
if(O&&O.length>0)for(var t,n,r,i=0,a=O.length;a>i;++i)t=O[i],n=t.iframe,r=t.src,
e&&(r=r.replace(/\&encryptVer=[^\&]*/gi,""),r=r.replace(/\&platform=[^\&]*/gi,""),
r=r.replace(/\&cKey=[^\&]*/gi,""),r=r+"&encryptVer=6.0&platform=61001&cKey="+e),
n.setAttribute("src",r);
}
function s(t){
var n=t.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=n),n.show&&(!function(){
var e=document.getElementById("js_read_area3"),t=document.getElementById("like3");
e.style.display="block",t.style.display="inline",n.liked=window.is_temp_url?window.liked:n.liked,
n.liked&&j.addClass(t,"praised"),t.setAttribute("like",n.liked?"1":"0");
var r=document.getElementById("likeNum3"),i=document.getElementById("readNum3"),a=window.is_temp_url?window.read_num:n.read_num,o=window.is_temp_url?window.like_num:n.like_num;
a||(a=1),o||(o="赞"),parseInt(a)>1e5?a="100000+":"",parseInt(o)>1e5?o="100000+":"",
i&&(i.innerHTML=a),r&&(r.innerHTML=o);
}(),e("appmsg/like.js"));
var i=document.getElementById("js_share_appmsg");
t.share_redirect_url&&i&&(window._share_redirect_url=t.share_redirect_url,i.innerHTML=x.tmpl(h,{
url:t.share_redirect_url
})),1==t.comment_enabled&&(window.can_fans_comment_only=t.only_fans_can_comment,
window.comment_count=t.comment_count,window._is_fans=t.is_fans,window._logo_url=t.logo_url,
window._nick_name=t.nick_name,e("appmsg/comment.js")),window._has_comment||0!=window.adDatas.num||window._share_redirect_url||g.addClass(document.body,"rich_media_empty_extra"),
-1==f.indexOf("WindowsWechat")&&-1!=f.indexOf("MicroMessenger")&&(c=e("appmsg/reward_entry.js"),
c.handle(t.reward,_())),1!=t.reward_entrance_enable_for_preview||E.isIOS||(document.getElementById("js_preview_reward")&&(document.getElementById("js_preview_reward").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_wording")&&(document.getElementById("js_preview_reward_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_wording").style.display="block"),v.on(document.getElementById("js_preview_reward_link"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
})),t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
v.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
}));
}
function d(){
var t="";
O&&O.length>0&&(t="&is_need_ticket=1");
var n=B.checkNeedAds(),r=n.is_need_ad,i=(n._adInfo,n.both_ad),d=-1!=location.href.indexOf("mock_ad=");
d&&(n.is_need_ad=r=1),z("[Appmsg] start get asycn data, is_need_ad:"+r);
var m=window.new_appmsg&&1==_copyright_stat?1:0;
b({
url:"/mp/getappmsgext?__biz="+biz+"&appmsg_type="+appmsg_type+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&abtest_cookie="+abtest_cookie+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+t+"&is_need_ad="+r+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+i+"&reward_uin_count="+(is_need_reward?3*_():0)+(window.send_time?"&send_time="+send_time:"")+"&msg_daily_idx="+msg_daily_idx+"&is_original="+m,
data:{
is_only_read:is_only_read,
req_id:window.req_id||"",
pass_ticket:pass_ticket,
is_temp_url:window.is_temp_url||0
},
type:"POST",
dataType:"json",
rtId:"27613",
rtKey:"50",
rtDesc:I,
async:!0,
success:function(t){
if(z("[Appmsg] success get async data"),t){
try{
if(d){
var r=e("a/testdata.js");
t.advertisement_info=r.getAd(),console.log("----------------------"),console.log(t.advertisement_info),
console.log("----------------------"),t.advertisement_num=t.advertisement_info.length;
}
if(t&&t.base_resp&&t.base_resp.wxtoken&&(window.wxtoken=t.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
o(t.appmsgticket?t.appmsgticket.ticket:""),a(t),t.ret)return;
B.afterGetAdData(n,t),window.wx_user_can_reward=t.user_can_reward,s({
appmsgstat:t.appmsgstat,
comment_enabled:t.comment_enabled,
comment_count:t.comment_count,
only_fans_can_comment:t.only_fans_can_comment,
reward:{
reward_total:t.reward_total_count,
reward_head_imgs:t.reward_head_imgs||[],
can_reward:t.can_reward,
user_can_reward:t.user_can_reward,
reward_qrcode_ticket:t.reward_qrcode_ticket,
is_ios_reward_open:t.is_ios_reward_open,
timestamp:t.timestamp,
reward_author_head:t.reward_author_head
},
reward_entrance_enable_for_preview:t.reward_entrance_enable_for_preview,
reward_wording:t.reward_wording,
is_ios_reward_open:t.is_ios_reward_open,
comment_entrance_enable_for_preview:t.comment_entrance_enable_for_preview,
share_redirect_url:t.share_redirect_url||"",
logo_url:t.logo_url,
nick_name:t.nick_name,
is_fans:t.is_fans
});
}catch(i){
z("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var _=new Image;
return _.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(i.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(i));
}
z("[Appmsg] success get async data, async data is: "+JSON.stringify(t));
}
},
error:function(){
z("[Appmsg] error get async data, biz="+biz+", mid="+mid);
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function _(){
return v.on(window,"resize",function(){
m(),c&&c.render(_());
}),m();
}
function m(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(n){}
var r=30,i=34,a=Math.floor(.9*(e-r)/i);
return window.new_appmsg&&(a=Math.floor(.8*(e-60)/i)),document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=a*i+"px"),
_=function(){
return a;
},a;
}
e("biz_common/utils/string/html.js");
var c,p,l=e("pages/video_ctrl.js"),w=e("biz_common/utils/url/parse.js"),g=e("biz_common/dom/class.js"),u=e("appmsg/img_copyright_tpl.html.js"),h=e("appmsg/share_tpl.html.js"),f=navigator.userAgent,y=-1!=f.indexOf("MicroMessenger"),v=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),b=e("biz_wap/utils/ajax.js"),j=e("biz_common/dom/class.js"),k=e("biz_wap/jsapi/core.js"),x=e("biz_common/tmpl.js"),z=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),I=e("rt/appmsg/getappmsgext.rt.js"),B=e("a/a.js"),E=e("biz_wap/utils/mmversion.js"),A=document.getElementsByTagName("iframe"),M=document.getElementById("js_content"),O=[],q=M.offsetWidth,W=q/l.getRatio();
window.logs.video_cnt=0;
for(var D=0,T=A.length;T>D;++D){
p=A[D];
var C=p.getAttribute("data-src")||"",N=p.getAttribute("src")||C;
if(N){
var R=e("pages/version4video.js");
if(0==N.indexOf("http://z.weishi.com/weixin/player.html"))N=N.replace(/width=\d+/g,"width="+q),
N=N.replace(/height=\d+/g,"height="+W),p.width=q,p.height=W,p.style.setProperty&&(p.style.setProperty("width",q+"px","important"),
p.style.setProperty("height",W+"px","important")),p.setAttribute("src",N),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(N)){
R.isShowMpVideo()||(!function(e,t){
e.onload=function(){
i(this,t);
};
}(p,N),y?O.push({
iframe:p,
src:N
}):p.setAttribute("src",N),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10)),
window.logs.video_cnt++;
continue;
}
}
}
d();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,a=this.offset||20,s=0;
if("wifi"==window.networkType){
var m={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(m=this.lazyloadHeightWhenWifi()),a=Math.max(m.bottom*e,a),
s=Math.max(m.top*e,s);
}
for(var c=+new Date,d=[],g=this.sw,u=this,p=-1,w=0,A=t.length;A>w;w++)!function(t,e){
var m=n(t.el),c=t.src;
if(c){
(c.match(/\:\/\/[^\/]+\/mmbiz\//)&&c.indexOf("wx_fmt=gif")>-1||c.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&p++;
var u=s,w=a;
(c.match(/\:\/\/[^\/]+\/mmbiz\//)&&c.indexOf("wx_fmt=gif")>-1||c.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&f&&(u=0,
w=20),!t.show&&(i>=m&&i<=m+t.height+u||m>i&&i+o+w>m)&&(e.inImgRead&&(i>=m&&i<=m+t.height||m>i&&i+o>m)&&e.inImgRead(c,networkType),
e.changeSrc&&(c=e.changeSrc(t.el,c,p)),t.el.onerror=function(){
var i=this;
!!e.onerror&&e.onerror(t.el.src,i);
},t.el.onload=function(){
var i=this;
if("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="!=i.src){
var o=i.getAttribute("data-forceheight");
o?(i.removeAttribute("data-forceheight"),l(i,"height",o,"important")):l(i,"height","auto","important"),
i.getAttribute("_width")?l(i,"width",i.getAttribute("_width"),"important"):l(i,"width","auto","important"),
!!e.onload&&e.onload(t.el.src,i);
}
},h(t.el,"src",c),d.push(c),t.show=!0,l(t.el,"visibility","visible","important")),
r.isWp&&1*t.el.width>g&&(t.el.width=g);
}
}(t[w],u);
d.length>0&&this.detect&&this.detect({
time:c,
loadList:d,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,a=this.attrKey||"data-src",n=o.offsetWidth,r=0,s=this.imgOccupied||!1;
o.currentStyle?r=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(r=getComputedStyle(o).width),
this.sw=1*r.replace("px","");
for(var m=0,d=t.length;d>m;m++){
var f=t.item(m),g=h(f,a),u=h(f,"src");
if(g&&!(u&&u.indexOf("data:image/gif;base64")<0)){
var p=100;
if(f.dataset&&f.dataset.ratio){
var w=1*f.dataset.ratio,A=1*f.dataset.w||n;
"number"==typeof w&&w>0?(A=n>=A?A:n,p=A*w,s||(f.style.width&&f.setAttribute("_width",f.style.width),
l(f,"width",A+"px","important"),l(f,"visibility","visible","important"),f.setAttribute("src",c))):l(f,"visibility","hidden","important");
}else l(f,"visibility","hidden","important");
s||l(f,"height",p+"px","important"),e.push({
el:f,
src:g,
height:p,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),this.__called_first_time?(i.call(e,t),this.__called_first_time=!1):e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function a(t){
s.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),s.on(document,"touchmove",function(i){
o.call(t,i);
}),t.__called_first_time=!0,o.call(t,{});
}
function n(t){
for(var i=t.offsetTop;t=t.offsetParent;)i+=t.offsetTop;
return i>=111&&(i-=111),i;
}
var r=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),m=t("biz_common/dom/attr.js"),h=m.attr,l=m.setProperty,c=t("biz_common/ui/imgonepx.js"),d=new Date,f=(d.getHours(),
!0);
return a;
});
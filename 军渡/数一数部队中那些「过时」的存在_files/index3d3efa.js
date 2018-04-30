define("appmsg/fereport.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js"],function(e){
"use strict";
function i(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var i,s=e.timing,a=0,d=0,m=window.location.protocol,p=Math.random(),r=1>2*p,u=1>25*p,l=1>100*p,w=1>250*p,c=1>1e3*p,g=1>1e4*p,_=!0;
"https:"==m?(a=18,d=27,_=!1):"http:"==m&&(a=9,d=19);
var S=window.__wxgspeeds||{};
if(S&&S.moonloadtime&&S.moonloadedtime){
var v=S.moonloadedtime-S.moonloadtime;
i=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
n.saveSpeeds({
sample:21==i||22==i&&c?1:0,
uin:uin,
pid:a,
speeds:{
sid:i,
time:v
}
});
}
S&&S.mod_downloadtime&&n.saveSpeeds({
uin:uin,
pid:a,
speeds:{
sid:24,
time:S.mod_downloadtime
}
});
var f=s.domContentLoadedEventStart-s.navigationStart;
if(f>3e3&&(n.setBasicTime({
sample:l&&_||u&&!_?1:0,
uin:uin,
pid:d
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_28_1&lc=1&log0="+encodeURIComponent(location.href)),
window.moon&&moon.clearSample&&n.setBasicTime({
sample:1,
uin:uin,
pid:417
}),n.setBasicTime({
sample:w&&_||l&&!_?1:0,
uin:uin,
pid:a
}),o.htmlSize){
var h=o.htmlSize/(s.responseEnd-s.connectStart);
n.saveSpeeds({
sample:c,
uin:uin,
pid:a,
speeds:{
sid:25,
time:Math.round(h)
}
});
}
if(S&&S.combo_times)for(var b=1;b<S.combo_times.length;b++)n.saveSpeeds({
sample:w,
uin:uin,
pid:a,
speeds:{
sid:26,
time:S.combo_times[b]-S.combo_times[b-1]
}
});
if(S&&S.mod_num){
var j=S.hit_num/S.mod_num;
n.saveSpeeds({
sample:w,
uin:uin,
pid:a,
speeds:[{
sid:27,
time:Math.round(100*j)
},{
sid:28,
time:Math.round(1e3*j)
}]
});
}
var T=window.logs.pagetime.jsapi_ready_time-s.navigationStart;
n.saveSpeeds(156==a||155==a?{
sample:r,
uin:uin,
pid:a,
speeds:{
sid:31,
time:T
}
}:{
sample:c,
uin:uin,
pid:a,
speeds:{
sid:31,
time:T
}
}),n.send(),window.setTimeout(function(){
window.__moonclientlog&&t("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(i=window.WeixinJSBridge&&window.WeixinJSBridge._createdByScriptTag?33:32,
n.saveSpeeds({
sample:g,
uin:uin,
pid:a,
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
var t=n.getUint32(o),s=t.toString(16),a="00000000",d=(a+s).slice(-a.length);
i.push(d);
}
return i.join("");
}
try{
var o=Math.random(),t=window.localStorage,s=[],a=[];
for(var d in t)-1!=d.indexOf("__MOON__")&&window.moon_map[d.substr(8)]&&s.push(t[d]);
if(window.crypto){
var m="";
m=.5>o?"SHA-256":"SHA-1";
for(var p=(new Date).getTime(),r=0;r<s.length;r++)a.push(e(s[r]));
Promise.all(a).then(function(){
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
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js"],function(e){
"use strict";
function t(e){
window.logs||(window.logs={}),p.js_content=e.js_content||document.getElementById("js_content");
var t=e.js_toobar3||document.getElementById("js_toobar3");
p.pageEndTop=t?t.offsetTop:0,p.imgs=p.js_content?p.js_content.getElementsByTagName("img")||[]:[],
p.media=e.media||document.getElementById("media"),p.title=e.title||(window.msg_title||"").htmlDecode(),
p.video_cnt=e.video_cnt||window.logs.video_cnt||0,p.js_cmt_area=e.js_cmt_area||document.getElementById("js_cmt_area"),
p.item_show_type=e.item_show_type||window.item_show_type||0,c=document.getElementsByTagName("html"),
c&&1==!!c.length&&l&&(c=c[0].innerHTML,y.content_length=l.htmlSize),window.logs.pageinfo=y,
function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(m.on(window,"load",function(){
O=1*u.get(E);
var t=location.href.indexOf("scrolltodown")>-1?!0:!1,o=p.js_cmt_area;
if(t&&o&&o.offsetTop){
var n=o.offsetTop;
window.scrollTo(0,n-25);
}else window.scrollTo(0,O);
if(window.__wxjs_is_wkwebview){
var i=h.getData("page_time");
i.page_time&&(d(i.page_time.val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random()),
window.setInterval(function(){
var e=a();
h.set("page_time",e,+new Date+864e7);
},1e3);
}
var m=f.getData("spad");
m&&m.spad&&_(m.spad.val),e.hasSpAd&&window.setInterval(function(){
s();
var e=r();
f.set("spad",e,+new Date+864e7);
},1e3);
}),m.on(window,"unload",function(){
window.__ajaxtest="2";
var e=a();
d(e);
}),window.logs.read_height=0,m.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(z),z=setTimeout(function(){
O=window.pageYOffset,u.set(E,O,+new Date+72e5);
},500);
}),m.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(z),z=setTimeout(function(){
O=window.pageYOffset,u.set(E,O,+new Date+72e5);
},500);
}));
}
function o(e,t){
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,d=0,s=e.length;s>d;++d)o=e[d],
o&&(n=o.getAttribute(t),n&&(i=n.match(a),i&&i[2]&&(v[i[2]]=!0)));
}
function n(e){
for(var t=0,o=j.length;o>t;++t)if(j[t]==e)return!0;
return!1;
}
function i(){
v={},o(document.getElementsByTagName("a"),"href"),o(document.getElementsByTagName("link"),"href"),
o(document.getElementsByTagName("iframe"),"src"),o(document.getElementsByTagName("script"),"src"),
o(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in v)v.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!b&&n(t)&&(b=!0),
e.push(t));
return v={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=p.js_content,n=p.screen_height,a=p.screen_width,d=p.scroll_height,s=Math.ceil(d/n),r=Math.ceil((o.scrollHeight||o.offsetHeight)/n),_=(window.logs.read_height||t)+n,m=p.pageEndTop,w=p.imgs,l=Math.ceil(_/n)||1,g=p.media,u=50,h=0,f=0,v=0,j=0,T=_+u>m?1:0;
l>s&&(l=s);
var z=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
h++;
var a=i.getAttribute("src"),d=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(f++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&j++),d&&(e["img_"+d+"_cnt"]=e["img_"+d+"_cnt"]||0,
e["img_"+d+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=j||0,e.download_img_cnt=f||0,e.download_cdn_img_cnt=v||0,
e.img_cnt=h||0;
},O=window.appmsgstat||{},E=window.logs.img||{},x=window.logs.pagetime||{},D=E.load||{},k=E.read||{},S=[],I=[],N=0,B=0,M=0;
for(var H in k)H&&0==H.indexOf("http")&&k.hasOwnProperty(H)&&I.push(H);
for(var H in D)H&&0==H.indexOf("http")&&D.hasOwnProperty(H)&&S.push(H);
for(var A=0,P=S.length;P>A;++A){
var q=S[A];
q&&q.isCDN()&&(-1!=q.indexOf("/0")&&N++,-1!=q.indexOf("/640")&&B++,-1!=q.indexOf("/300")&&M++);
}
var e={
__biz:biz,
title:p.title,
mid:mid,
idx:idx,
subscene:window.subscene||0,
read_cnt:O.read_num||0,
like_cnt:O.like_num||0,
screen_width:a,
screen_height:n,
screen_num:r,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:p.video_cnt,
read_screen_num:l||0,
is_finished_read:T,
scene:source,
content_len:y.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:B,
img_0_cnt:N,
img_300_cnt:M,
wtime:x.onload_time||0,
ftime:x.ftime||0,
ptime:x.ptime||0,
onload_time:x.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:window.ct,
item_show_type:p.item_show_type
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=S.length,
e.wifi_read_imgs_cnt=I.length),window.logs.webplog&&4==window.logs.webplog.total){
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
var W=(new Date).getDay(),L=i();
return(b||0!==user_uin&&Math.floor(user_uin/100)%7==W)&&(e.domain_list=L),b&&(e.html_content=c),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e;
}
function d(e){
T||(T=!0,h.remove("page_time"),e.report_time=parseInt(+new Date/1e3),e.ascene=window.ascene||-1,
w({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function s(){
if(window._adRenderData&&"undefined"!=typeof JSON&&JSON.stringify){
var e=JSON.stringify(window._adRenderData),t=+new Date,o=[biz,sn,mid,idx].join("_"),n=new g("ad");
n.set(o,{
info:e,
time:t
},+new Date+24e4);
}
u.set(o,O,+new Date+72e5);
}
function r(){
return window.__video_report_data;
}
function _(e){
e&&e.play_type&&(f.remove("spad"),e.report_type=1,w({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
e("biz_common/utils/string/html.js");
var m=e("biz_common/dom/event.js"),w=e("biz_wap/utils/ajax.js"),l=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var c,g=e("biz_wap/utils/storage.js"),p={
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
},u=new g("page_pos"),h=new g("time_on_page"),f=new g("spad"),y={},v={},b=!1,j=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],T=!1,z=null,O=0,E=[biz,sn,mid,idx].join("_");
return{
init:t
};
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js","pages/create_txv.js"],function(e){
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
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=r.video_top.length,o=e+r.innerHeight,n=0,s=0;t>s;s++){
var m=r.video_top[s];
m.reported?n++:o>=m.start&&o<=m.end&&(m.reported=!0,d.report({
step:1,
vid:m.vid
}));
}
n==t&&(c.off(window,"scroll",i),r.video_top=r.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o,n=e("biz_common/utils/url/parse.js"),d=e("new_video/ctl.js"),r={
txVideoReg:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},s=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),c=(m.setProperty,e("biz_common/dom/event.js")),a=document.getElementsByTagName("iframe"),p=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var l=Math.ceil(1e4*Math.random()),w=0,_=a.length;_>w;++w){
o=a[w];
var u=o.getAttribute("data-src")||"",v=o.className||"",g=o.getAttribute("src")||u;
if(!u||"#"==u){
var f=o.getAttribute("data-display-src");
if(f&&(0==f.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==f.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
f=f.replace(/&amp;/g,"&");
for(var h=f.split("&"),x=["/mp/newappmsgvote?action=show"],w=0;w<h.length;w++)(0==h[w].indexOf("__biz=")||0==h[w].indexOf("supervoteid="))&&x.push(h[w]);
x.length>1&&(u=x.join("&")+"#wechat_redirect");
}
}
if(g&&r.txVideoReg.test(g)){
if(s.isShowMpVideo()){
e("pages/create_txv.js");
var b=n.getQuery("vid",u);
if(!b)continue;
var y=o.getAttribute("data-vw"),k=o.getAttribute("data-vh"),j=document.domain;
"qq.com"==j&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(b),r.video_iframe.push({
dom:o,
vid:b
}),g=["/mp/videoplayer?video_h=",k,"&video_w=",y,"&scene=",window.source,"&random_num=",l,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",b,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||"","&__testd=",j,"&__td=",document.domain].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t,i,o){
return function(){
o.setAttribute("marginWidth",0),o.setAttribute("marginHeight",0),o.style.top="0",
o.setAttribute("src",i);
};
}(y,k,g,o),0);
}
}else if(u&&(u.indexOf("newappmsgvote")>-1&&v.indexOf("js_editor_vote_card")>=0||0==u.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&v.indexOf("card_iframe")>=0||u.indexOf("appmsgvote")>-1||u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&u.indexOf(window.biz)<0){
p.push(o);
continue;
}
if(u=u.replace(/^http:/,location.protocol),v.indexOf("card_iframe")>=0){
var O=u.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(O+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
o.setAttribute("src",O);
}else{
var q=u.indexOf("#wechat_redirect")>-1,z=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?z+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):v.indexOf("vote_iframe")>=0&&(z+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var O=q?u.replace("#wechat_redirect",z):u+z;
o.setAttribute("src",O);
}
-1==u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(o),o.appmsg_idx=w;
}
if(u&&u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&y>0){
var A=y,H=3*A/4;
o.width=A,o.height=H,o.style.setProperty&&(o.style.setProperty("width",A+"px","important"),
o.style.setProperty("height",H+"px","important"));
}
}
for(var I=0;I<p.length;I++){
var R=p[I];
R.parentNode.removeChild(R);
}
if(window.iframe_reload=function(){
for(var e=0,i=a.length;i>e;++e){
o=a[e];
var n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var D,E=document.getElementsByClassName("video_iframe"),w=0;D=E.item(w++);)D.setAttribute("scrolling","no"),
D.style.overflow="hidden";
r.video_iframe.length>0&&setTimeout(function(){
for(var e=r.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var d=e[o];
if(!d||!d.dom)return;
for(var s=d.dom,m=s.offsetHeight,a=0;s&&t!==s;)a+=s.offsetTop,s=s.offsetParent;
r.video_top.push({
start:a+m/2,
end:a+m/2+r.innerHeight,
reported:!1,
vid:d.vid
});
}
i(),c.on(window,"scroll",i);
},0);
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/comment_utils.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","biz_common/dom/class.js","appmsg/img_copyright_tpl.html.js","appmsg/appmsgext.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","biz_wap/utils/mmversion.js","pages/version4video.js","pages/create_txv.js","appmsg/like.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js"],function(e,t,i,r){
"use strict";
function n(){
for(var t=document.getElementsByTagName("iframe"),i=[],r=0,n=t.length;n>r;++r)i.push(t[r]);
t=null;
var o=document.getElementById("js_content"),s=o.offsetWidth,d=s/w.getRatio();
window.logs.video_cnt=0;
for(var r=0,n=i.length;n>r;++r){
var _=i[r],m=_.getAttribute("data-src")||"",c=_.getAttribute("src")||m;
if(c){
var p=e("pages/version4video.js");
if(0==c.indexOf("http://z.weishi.com/weixin/player.html"))c=c.replace(/width=\d+/g,"width="+s),
c=c.replace(/height=\d+/g,"height="+d),_.width=s,_.height=d,_.style.setProperty&&(_.style.setProperty("width",s+"px","important"),
_.style.setProperty("height",d+"px","important")),_.setAttribute("src",c),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(c)){
if(!p.isShowMpVideo()){
var l;
l=a(b?_:_),l&&A.push(l),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10);
}
window.logs.video_cnt++;
continue;
}
}
}
A.length>0&&"function"==typeof window.__getVideoWh&&j.on(window,"resize",function(){
try{
for(var e=0,t=A.length;t>e;e++){
var i=A[e],r=i.playerObj;
if(r){
var n=window.__getVideoWh(i);
i.style.width=n.w+"px",i.style.height=n.h+"px",r.resize({
width:n.vw,
height:n.vh
});
}
}
}catch(a){}
},!1);
}
function a(t){
var i=t.getAttribute("data-src")||t.getAttribute("src"),r=u.getQuery("vid",i),n=t.getAttribute("data-vw"),a=t.getAttribute("data-vh"),s=t.getAttribute("data-ratio"),d=document.createElement("span");
d.setAttribute("data-ratio",s),d.id="js_tx_video_container_"+Math.random(),d.className="js_tx_video_container",
d.style.cssText=t.style.cssText,d.style.display="none";
var _=t.parentNode;
if(_){
_.lastChild===t?_.appendChild(d):_.insertBefore(d,t.nextSibling);
var m=e("pages/create_txv.js");
return m.createTxVideo({
containerId:d.id,
vid:r,
width:n,
height:a,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(e){
d.playerObj=e.player,o(d,r),d.style.display="block";
},
onError:function(){}
}),_.removeChild(t),d;
}
}
function o(e,t){
if(t&&e){
var i=e.parentNode;
if(i){
for(var r=[],n=0,a=i.children.length;a>n;n++){
var o=i.children[n];
o.className.indexOf("img_loading")>=0&&o.getAttribute("data-vid")==t&&r.push(o);
}
for(var n=0,a=r.length;a>n;n++)i.removeChild(r[n]);
e.style.display="block";
}
}
}
function s(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,r=window.__appmsgCgiData.copyright_stat,n=window.__appmsgCgiData.source_biz,a=0,o=i.length;o>a;a++){
var s=i[a];
if(2==s.type){
if(2==r&&n==s.source_uin)continue;
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
m.innerHTML=k.tmpl(h,t[_]);
{
var c=m.children[0],p=s.parentNode,l=p.insertBefore(c,s),w=l.children[0];
(function(e,t){
j.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(x.invoke("openUrlWithExtraWebview",{
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
function d(t){
var i=t.appmsgstat||{};
if(window.appmsgstat||(window.appmsgstat=i),i.show){
var n=document.getElementById("js_read_area3"),a=document.getElementById("like3"),o=document.getElementById("likeNum3"),s=document.getElementById("readNum3");
if(!(n&&a&&o&&s))return;
var d=e("appmsg/like.js");
i.liked=window.is_temp_url?window.liked:i.liked,d.showLikeNum({
show:!0,
likeAreaDom:a,
likeNumDom:o,
liked:i.liked,
className:"praised",
likeAreaDisplayValue:"inline",
likeNum:window.is_temp_url?window.like_num:i.like_num
}),d.showReadNum({
show:!0,
readAreaDom:n,
readNumDom:s,
readAreaDisplayValue:"block",
readNum:window.is_temp_url?window.read_num:i.read_num
}),d.initLikeEvent({
likeAreaDom:a,
likeNumDom:o,
className:"praised",
biz:window.biz,
mid:window.mid,
idx:window.idx,
appmsgid:window.appmsgid,
itemidx:window.itemidx,
is_temp_url:window.is_temp_url
});
}
var _=document.getElementById("js_share_appmsg");
t.share_redirect_url&&_&&(window._share_redirect_url=t.share_redirect_url,_.innerHTML=k.tmpl(f,{
url:t.share_redirect_url
})),l.initCommentByExtData(t),window._has_comment||0!=window.adDatas.num||window._share_redirect_url||g.addClass(document.body,"rich_media_empty_extra"),
-1==y.indexOf("WindowsWechat")&&-1!=y.indexOf("MicroMessenger")&&(p=e("appmsg/reward_entry.js"),
p.handle(t.reward,m())),1!=t.reward_entrance_enable_for_preview||I.isIOS||(document.getElementById("js_preview_reward")&&(document.getElementById("js_preview_reward").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_wording")&&(document.getElementById("js_preview_reward_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_wording").style.display="block"),j.on(document.getElementById("js_preview_reward_link"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
})),t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
j.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
}));
}
function _(){
var t=E.checkNeedAds(),i=t.is_need_ad,r=t.both_ad,n=-1!=location.href.indexOf("mock_ad=");
n&&(t.is_need_ad=i=1),z("[Appmsg] start get asycn data, is_need_ad:"+i);
var a=window.new_appmsg&&1==_copyright_stat?1:0;
v.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:msg_title,
ct:ct,
abtest_cookie:abtest_cookie,
devicetype:devicetype,
version:version,
is_need_ticket:A&&A.length>0?1:0,
is_need_ad:i,
comment_id:comment_id,
is_need_reward:is_need_reward,
both_ad:r,
reward_uin_count:is_need_reward?3*m():0,
send_time:window.send_time||"",
msg_daily_idx:msg_daily_idx,
is_original:a,
is_only_read:is_only_read,
req_id:window.req_id||"",
pass_ticket:pass_ticket,
is_temp_url:window.is_temp_url||0,
rtId:"27613",
rtKey:"50",
onSuccess:function(i){
if(i)try{
if(n){
var r=e("a/testdata.js");
i.advertisement_info=r.getAd(),i.advertisement_num=i.advertisement_info.length;
}
if(i&&i.base_resp&&i.base_resp.wxtoken&&(window.wxtoken=i.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
s(i),i.ret)return;
E.afterGetAdData(t,i),window.wx_user_can_reward=i.user_can_reward,d({
appmsgstat:i.appmsgstat,
comment_enabled:i.comment_enabled,
comment_count:i.comment_count,
friend_comment_enabled:i.friend_comment_enabled,
only_fans_can_comment:i.only_fans_can_comment,
reward:{
reward_total:i.reward_total_count,
reward_head_imgs:i.reward_head_imgs||[],
can_reward:i.can_reward,
user_can_reward:i.user_can_reward,
reward_qrcode_ticket:i.reward_qrcode_ticket,
is_ios_reward_open:i.is_ios_reward_open,
timestamp:i.timestamp,
reward_author_head:i.reward_author_head
},
reward_entrance_enable_for_preview:i.reward_entrance_enable_for_preview,
reward_wording:i.reward_wording,
is_ios_reward_open:i.is_ios_reward_open,
comment_entrance_enable_for_preview:i.comment_entrance_enable_for_preview,
share_redirect_url:i.share_redirect_url||"",
logo_url:i.logo_url,
nick_name:i.nick_name,
is_fans:i.is_fans
});
}catch(a){
z("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var o=new Image;
return o.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(a.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(a));
}
},
onError:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function m(){
return j.on(window,"resize",function(){
c(),p&&p.render(m());
}),c();
}
function c(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(i){}
var r=30,n=34,a=Math.floor(.9*(e-r)/n);
return window.new_appmsg&&(a=Math.floor(.8*(e-60)/n)),document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=a*n+"px"),
m=function(){
return a;
},a;
}
e("biz_common/utils/string/html.js");
var p,l=e("appmsg/comment_utils.js"),w=e("pages/video_ctrl.js"),u=e("biz_common/utils/url/parse.js"),g=e("biz_common/dom/class.js"),h=e("appmsg/img_copyright_tpl.html.js"),v=e("appmsg/appmsgext.js"),f=e("appmsg/share_tpl.html.js"),y=navigator.userAgent,b=-1!=y.indexOf("MicroMessenger"),j=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),x=(e("biz_wap/utils/ajax.js"),e("biz_common/dom/class.js"),
e("biz_wap/jsapi/core.js")),k=e("biz_common/tmpl.js"),z=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),E=(e("rt/appmsg/getappmsgext.rt.js"),e("a/a.js")),I=e("biz_wap/utils/mmversion.js"),A=[];
n(),_();
});define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","appmsg/appmsg_report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function i(e,i){
var n="",t="";
try{
""!=tid&&(t="tid="+tid+"&aid=54");
var o=e.split("?")[1]||"";
if(o=o.split("#")[0],""==o);else{
var s=[o,"mpshare=1","scene="+i,"srcid="+srcid];
""!=t&&s.push(t),o=s.join("&"),n=e.split("?")[0]+"?"+o+"#"+(e.split("#")[1]||"");
}
}catch(m){
n="";
}
return n||(n=location.href+"#wechat_redirect",(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_47_1&lc=1&log0=[share_link]["+encodeURIComponent(location.href)+"]["+encodeURIComponent(e)+"]["+encodeURIComponent(msg_link)+"]"),
n;
}
function n(e,i,n){
m.shareReport({
link:e,
action_type:n
});
}
function t(e,i){
return e.isCDN()&&(e=o.addParam(e,"wxfrom",i,!0)),e;
}
e("biz_common/utils/string/html.js"),e("appmsg/cdn_img_lib.js");
var o=(e("biz_common/dom/event.js"),e("biz_common/utils/url/parse.js")),s=e("biz_wap/utils/mmversion.js"),m=e("appmsg/appmsg_report.js"),a=(e("biz_wap/utils/ajax.js"),
{
90041:"此标题包含夸大误导信息",
20012:"此标题包含低俗恶俗性内容"
}),c={
90041:"标题使用夸大、煽动、低俗等词语造成误导或引人不适。",
20012:"标题使用低俗或恶俗性词语造成不正当影响或引人不适。"
},r=e("biz_wap/jsapi/core.js");
r.call("hideToolbar"),r.call("showOptionMenu");
var l=msg_title.htmlDecode(),u=(msg_source_url.htmlDecode(),""),_=msg_cdn_url||ori_head_img_url||round_head_img,d=_,p=msg_link.htmlDecode(),l=msg_title.htmlDecode(),h=msg_desc.htmlDecode();
h=h||p,h=h.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(h=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
_.isCDN()&&(_=_.replace(/\/0$/,"/300"),_=_.replace(/\/0\?/,"/300?")),d.isCDN()&&(d=d.replace(/\/0$/,"/640"),
d=d.replace(/\/0\?/,"/640?")),malicious_title_reason_id&&(l=a[malicious_title_reason_id],
h=c[malicious_title_reason_id],_="https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png"),
"1"==is_limit_user&&r.call("hideOptionMenu"),window.is_temp_url&&r.invoke("hideMenuItems",{
menuList:["menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:qzone","menuitem:share:weibo","menuItem:share:WeiboApp","menuItem:share:QZone","menuitem:facebook","menuItem:copyUrl","menuItem:share:email","menuitem:copy_url"]
},function(){}),r.on("menu:share:appmessage",function(e){
var o=1,s=t(_,"1");
e&&"favorite"==e.scene&&(o=24,s=t(_,"4")),r.invoke("sendAppMessage",{
appid:u,
img_url:s,
img_width:"640",
img_height:"640",
link:i(p,o),
desc:h,
title:l
},function(){
n(p,fakeid,o);
});
}),r.on("menu:share:timeline",function(){
var e=_;
s.isIOS||(e=t(_,"2")),n(p,fakeid,2),r.invoke("shareTimeline",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,2),
desc:h,
title:l
},function(){});
});
r.on("menu:share:weiboApp",function(){
r.invoke("shareWeiboApp",{
img_url:_,
link:i(p,3),
title:l
},function(){
n(p,fakeid,3);
});
}),r.on("menu:share:facebook",function(){
n(p,fakeid,7),r.invoke("shareFB",{
img_url:d,
img_width:"640",
img_height:"640",
link:i(p,43),
desc:h,
title:l
},function(){});
}),r.on("menu:share:QZone",function(){
var e=t(_,"6");
n(p,fakeid,5),r.invoke("shareQZone",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,22),
desc:h,
title:l
},function(){});
}),r.on("menu:share:qq",function(){
var e=t(_,"7");
n(p,fakeid,5),r.invoke("shareQQ",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,23),
desc:h,
title:l
},function(){});
}),r.on("menu:share:email",function(){
n(p,fakeid,5),r.invoke("sendEmail",{
content:i(p,5),
title:l
},function(){});
}),r.on("onArticleReadingBtnClicked",function(e){
console.log("argv",e),location.href="https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"#wechat_redirect";
}),1==window.show_msg_voice&&r.invoke("showMenuItems",{
menuList:["menuItem:readArticle"]
},function(e){
console.log("showMenuItems call",e);
}),r.on("sys:record",function(){
r.invoke("recordHistory",{
link:p,
title:l,
source:nickname,
img_url:_
},function(){});
});
});define("appmsg/appmsg_report.js",["biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(e){
var i=e.link,t=e.action_type,n=i.split("?").pop();
if(n=n.split("#").shift(),""!=n){
var p=e.reportVid||window.reportVid,d=e.reportMid||window.reportMid,r=e.reportVoiceid||window.reportVoiceid,s=e.reportWeappid||window.reportWeappid,w=[n,"action=share","action_type="+t,"scene="+(e.source||window.source),"ascene="+(e.ascene||window.ascene||-1),"req_id="+(e.req_id||window.req_id||""),"vid="+("undefined"!=typeof p?p.join(";"):""),"musicid="+("undefined"!=typeof d?d.join(";"):""),"voiceid="+("undefined"!=typeof r?r.join(";"):""),"weappid="+("undefined"!=typeof s?s.join(";"):""),"item_show_type="+(e.item_show_type||window.item_show_type||0)].join("&");
o({
url:"/mp/appmsgreport",
type:"POST",
data:w,
async:!1,
timeout:1e3
});
}
}
function t(e){
o({
url:"/mp/appmsgreport?action=name_click",
data:{
url:location.href,
title:e.title||window.msg_title||"",
msgid:window.mid||"",
itemidx:window.idx||"",
__biz:window.biz||"",
ascene:window.ascene||-1,
isnew:e.isnew||0,
item_show_type:e.item_show_type||window.item_show_type||0
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
var o=e("biz_wap/utils/ajax.js");
return{
shareReport:i,
profileReport:t
};
});define("biz_wap/jsapi/core.js",[],function(e,i,n,o){
"use strict";
var t=window.__moon_report||function(){},r=8,d={},a=!1;
try{
d=top.window.document;
}catch(w){
a=!0;
}
var c={
ready:function(e){
var i=function(){
try{
e&&(window.onBridgeReadyTime=window.onBridgeReadyTime||+new Date,e());
}catch(i){
throw t([{
offset:r,
log:"ready",
e:i
}]),i;
}
};
a||"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?i():d.addEventListener?d.addEventListener("WeixinJSBridgeReady",i,!1):d.attachEvent&&(d.attachEvent("WeixinJSBridgeReady",i),
d.attachEvent("onWeixinJSBridgeReady",i));
},
invoke:function(e,i,n){
this.ready(function(){
return a?!1:"object"!=typeof top.window.WeixinJSBridge?(o("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(e,i,function(i){
try{
if(n){
n.apply(window,arguments);
var o=i&&i.err_msg?", err_msg-> "+i.err_msg:"";
console.info("[jsapi] invoke->"+e+o);
}
}catch(d){
throw t([{
offset:r,
log:"invoke;methodName:"+e,
e:d
}]),d;
}
});
});
},
call:function(e){
this.ready(function(){
if(a)return!1;
if("object"!=typeof top.window.WeixinJSBridge)return!1;
try{
top.window.WeixinJSBridge.call(e);
}catch(i){
throw t([{
offset:r,
log:"call;methodName:"+e,
e:i
}]),i;
}
});
},
on:function(e,i){
this.ready(function(){
return a?!1:"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(e,function(){
try{
i&&i.apply(window,arguments);
}catch(n){
throw t([{
offset:r,
log:"on;eventName:"+e,
e:n
}]),n;
}
}):!1;
});
}
};
return c;
});define("appmsg/test.js",[],function(){
"use strict";
var t=[],e=function(){
"undefined"==typeof getComputedStyle&&document.body.currentStyle&&(window.getComputedStyle=function(t){
return t.currentStyle;
});
},n=function(){
for(var e="/mp/jsmonitor?idkey=",n=[],r=0,i=t.length;i>r;++r){
var o=t[r],d=o.idkey.toString()+"_"+o.order.toString()+"_"+o.num.toString();
n.push(d);
}
e+=n.join(";"),t.length>0&&((new Image).src=e);
},r=function(){
try{
e(),i(),n();
}catch(t){
console.log(t);
}
},i=function(){
var e=10,n=window.user_uin||0,r=0!==n&&Math.floor(n/100)%1e3<e;
if(r){
var i=document.getElementsByTagName("img"),o=i.length,d=document.getElementById("img-content"),u=d.offsetWidth,a=0,g=0,c=getComputedStyle(d);
a=parseInt(c.paddingLeft)+parseInt(c.paddingRight),u-=a,u||(u=window.innerWidth-30);
for(var f=0;o>f;++f){
var m=i[f].getAttribute("data-src");
if(m){
var s=1*i[f].getAttribute("data-w")||u,l=1*i[f].getAttribute("data-ratio");
l&&l>0&&s>u&&g++;
}
}
g>0&&t.push({
idkey:28307,
order:22,
num:g
});
}
};
return r;
});define("appmsg/max_age.js",["biz_wap/utils/ajax.js"],function(e){
"use strict";
function a(){
window.location.href.indexOf("clearStorage=1")>=0&&(localStorage.removeItem("max-age-storage-test"),
console.log("清除 localStorage"));
var e=1,a=window.user_uin||0,t=0!==a&&Math.floor(a/100)%1e3<e;
if(t&&(o({
type:"GET",
url:"/mp/reportcache?type=1&random="+Math.random()
}),(new Image).src="/mp/reportcache?type=2&uin="+uin,localStorage&&null==localStorage.getItem("max-age-storage-test"))){
console.log("localstorage为空");
try{
localStorage.setItem("max-age-storage-test",!0),console.log("localStorage设置成功");
}catch(r){}
o({
type:"GET",
url:"/mp/reportcache?type=3&random="+Math.random()
});
}
}
var o=e("biz_wap/utils/ajax.js");
return a;
});define("biz_wap/utils/ajax.js",["biz_common/utils/url/parse.js","biz_common/utils/respTypes.js"],function(require,exports,module,alert){
"use strict";
function joinUrl(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=isx5?"1":"0",t.f="json",Url.join(e,t);
}
function reportRt(e,t,o){
var r="";
if(o&&o.length){
var n=1e3,s=o.length,a=Math.ceil(s/n);
r=["&lc="+a];
for(var i=0;a>i;++i)r.push("&log"+i+"=[rtCheckError]["+i+"]"+encodeURIComponent(o.substr(i*n,n)));
r=r.join("");
}
var c,p="idkey="+e+"_"+t+"_1"+r+"&r="+Math.random();
if(window.ActiveXObject)try{
c=new ActiveXObject("Msxml2.XMLHTTP");
}catch(d){
try{
c=new ActiveXObject("Microsoft.XMLHTTP");
}catch(_){
c=!1;
}
}else window.XMLHttpRequest&&(c=new XMLHttpRequest);
c&&(c.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),c.setRequestHeader("cache-control","no-cache"),
c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.send(p));
}
function Ajax(obj){
var type=(obj.type||"GET").toUpperCase(),url;
url=obj.notJoinUrl?obj.url:joinUrl(obj.url);
var mayAbort=!!obj.mayAbort,async="undefined"==typeof obj.async?!0:obj.async,xhr=new XMLHttpRequest,timer=null,data=null;
if("object"==typeof obj.data){
var d=obj.data;
data=[];
for(var k in d)d.hasOwnProperty(k)&&data.push(k+"="+encodeURIComponent(d[k]));
data=data.join("&");
}else data="string"==typeof obj.data?obj.data:null;
xhr.open(type,url,async);
var _onreadystatechange=xhr.onreadystatechange;
xhr.onreadystatechange=function(){
if("function"==typeof _onreadystatechange&&_onreadystatechange.apply(xhr),3==xhr.readyState&&obj.received&&obj.received(xhr),
4==xhr.readyState){
xhr.onreadystatechange=null;
var status=xhr.status;
if(status>=200&&400>status)try{
var responseText=xhr.responseText,resp=responseText;
if("json"==obj.dataType)try{
resp=eval("("+resp+")");
var rtId=obj.rtId,rtKey=obj.rtKey||0,rtDesc=obj.rtDesc,checkRet=!0;
rtId&&rtDesc&&RespTypes&&!RespTypes.check(resp,rtDesc)&&reportRt(rtId,rtKey,RespTypes.getMsg()+"[detail]"+responseText+";"+obj.url);
}catch(e){
return void(obj.error&&obj.error(xhr));
}
obj.success&&obj.success(resp);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_SUCCESS_OFFSET,
e:e
}),e;
}else{
try{
obj.error&&obj.error(xhr);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_ERROR_OFFSET,
e:e
}),e;
}
if(status||!mayAbort){
var __ajaxtest=window.__ajaxtest||"0";
__moon_report({
offset:MOON_AJAX_NETWORK_OFFSET,
log:"ajax_network_error["+status+"]["+__ajaxtest+"]: "+url+";host:"+location.host,
e:""
});
}
}
clearTimeout(timer);
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null;
}
},"POST"==type&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
obj.noXRequestedWidthHeader||xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),
"undefined"!=typeof obj.timeout&&(timer=setTimeout(function(){
xhr.abort("timeout");
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null,__moon_report({
offset:MOON_AJAX_TIMEOUT_OFFSET,
log:"ajax_timeout_error: "+url,
e:""
});
},obj.timeout));
try{
xhr.send(data);
}catch(e){
obj.error&&obj.error();
}
return xhr;
}
var Url=require("biz_common/utils/url/parse.js"),RespTypes=require("biz_common/utils/respTypes.js"),isx5=-1!=navigator.userAgent.indexOf("TBS/"),__moon_report=window.__moon_report||function(){},MOON_AJAX_SUCCESS_OFFSET=3,MOON_AJAX_NETWORK_OFFSET=4,MOON_AJAX_ERROR_OFFSET=5,MOON_AJAX_TIMEOUT_OFFSET=6,MOON_AJAX_COMPLETE_OFFSET=7;
return Ajax;
});define("appmsg/index.js",["biz_common/utils/string/html.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/moment.js","appmsg/appmsg_report.js","page/appmsg_new/combo.css","page/appmsg_new/not_in_mm.css","page/appmsg/page_mp_article_improve_combo.css","page/appmsg/not_in_mm.css","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/copyright_report.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/product.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/autoread.js","appmsg/voicemsg.js","appmsg/weproduct.js","appmsg/weapp.js","appmsg/new_index.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e){
"use strict";
function t(){
function t(e,t){
var o={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},n=new Image;
n.onload=function(){
var o=n.width>0&&n.height>0;
t(e,o);
},n.onerror=function(){
t(e,!1);
},n.src="data:image/webp;base64,"+o[e];
}
function a(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var t=e.timing;
i("[Appmsg] dns:"+(t.domainLookupEnd-t.domainLookupStart)+"^^^ ssl:"+(0==t.secureConnectionStart?0:t.connectEnd-t.secureConnectionStart)+"^^^ tcp:"+(t.connectEnd-t.connectStart)+"^^^ request:"+(t.responseStart-t.requestStart)+"^^^ getPackageTime:"+(t.responseEnd-t.responseStart)+"^^^ domCententLoaded:"+(t.domContentLoadedEventStart-t.domLoading)+"^^^ domComplete:"+(t.domComplete-t.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-t.navigationStart)+"^^^ interactiveTime:"+(page_endtime-t.navigationStart))+"^^^ ua:"+window.navigator.userAgent,
setTimeout(function(){
t.loadEventEnd&&i("[Appmsg] onload:"+(t.loadEventEnd-t.loadEventStart));
},100);
}
"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
}),""==document.getElementById("js_content").innerHTML.trim()&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_94_1");
var o=Math.random();
.001>o&&document.getElementById("js_read_area3")&&document.getElementById("js_read_area3").innerText&&document.getElementById("js_read_area3").innerText.indexOf("Pageview")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_95_1"),
window.__wxjs_is_wkwebview&&window.__addIdKeyReport("28307",67);
}
window.is_new_msg&&(m.on(document.getElementById("profileBt"),"click",function(){
_.profileReport({
isnew:1
});
}),m.on(window,"load",function(){
l.invoke("setPageTitle",{
title:""
},function(){}),v=!1;
}),window.onscroll=function(){
var e=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
e>=document.getElementById("js_content").offsetTop&&0==v?(console.log(window.title+"init setPageTitle :top["+(document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop)+"]:content["+document.getElementById("js_content").offsetTop+"]"),
l.invoke("setPageTitle",{
title:window.title
},function(){}),v=!0):e<document.getElementById("js_content").offsetTop&&1==v&&(l.invoke("setPageTitle",{
title:""
},function(){}),v=!1);
});
var g=document.getElementsByTagName("body");
if(!g||!g[0])return!1;
g=g[0],function(){
var e=(new Date).getHours(),t=function(e,t){
t=t||"",window.isSg?(t=["uin:sougou","resp:"+t].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random()+"&from=sougou"):(t=["uin:"+window.user_uin,"resp:"+t].join("|"),
(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random());
},o=function(e,t,o){
var n=e+"_"+t;
o=o||1,window.logs.idkeys[n]||(window.logs.idkeys[n]={
val:0
}),window.logs.idkeys[n].val+=o;
},n=e>=11&&17>=e&&Math.random()<1,i=function(e,o){
n&&t(e,o);
};
window.__report=t,window.__commonVideoReport=i,window.__addIdKeyReport=o;
}();
var u=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&location.href&&u.test(location.href))&&!window.isSg)throw new Error("in iframe");
}catch(y){
var b="",j=new Image;
j.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+b+"&r="+Math.random()).substr(0,1024);
}
if(window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached){
var I=-1!=location.href.indexOf("?")?"&":"?";
location.replace(location.href.replace(/#rd$/,I+"rd2werd=1#wechat_redirect"));
}
var x=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var E=!c.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
e("appmsg/share.js");
var R=w(1e3*parseInt(top.window.modify_time)),q=R.format("YYYY-MM-DD"),B=document.getElementById("js_modify_time");
if(B&&(B.innerHTML=q),window.isSg||"mp.weixin.qq.com"==location.host){
var z=e("biz_common/log/jserr.js");
z({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var k=-1!=navigator.userAgent.indexOf("TBS/"),T=function(e,o){
t(e,function(e,t){
if(window.logs.webplog[e]=t?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
k&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var r=n.lossy&n.lossless&n.alpha;
o(!!r);
}
});
},S=function(e){
for(var t=document.getElementsByTagName("img"),o=!1,n=0,i=t.length;i>n;n++){
var r=t[n].getAttribute("data-src");
r&&r.isGif()&&(o=!0);
}
(h||navigator.userAgent.indexOf("Br_trunk")>-1)&&o&&c.isIOS&&c.gtVersion("6.5.13",!0)?(console.log("当前版本可以启用img代理"),
l.invoke("imageProxyInit",{},function(t){
console.log(t),t.err_msg.indexOf(":ok")>-1?(A=t.serverUrl,window.__addIdKeyReport("28307",117)):t.err_msg.indexOf(":fail")>-1&&window.__addIdKeyReport("28307",118),
e();
})):e();
},O=function(e){
T("lossy",e),T("lossless",e),T("alpha",e),T("animation",e);
};
window.webp=!1,S(function(){
O(function(t){
function o(e){
e.width<40||e.height<40||-1==e.className.indexOf("img_loading")&&(e.className+=" img_loading");
}
function n(e){
if(!(e.width<40||e.height<40)){
var t=e.src;
if(e.className=e.className.replace("img_loading",""),-1==e.className.indexOf("img_loadederror")){
e.className+=" img_loadederror",e.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
window.__addIdKeyReport("28307",51);
var n=function(){
window.__addIdKeyReport("28307",66),r(e),o(e);
var n=e.__retryload;
return n=0,t=t.https2http(),e.__retryload=n,e.src=x.addParam(t,"retryload",n,!0),
!1;
};
m.on(e,"click",n);
}
}
}
function r(e){
e.className=e.className.replace("img_loading",""),e.className=e.className.replace("img_loadederror","");
}
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var a=document.getElementById("js_cover");
if(a){
var d=a.getAttribute("data-src");
d&&(d.isCDN()&&(d=d.imgChange640(),t&&(d=x.addParam(d,"tp","webp",!0)),d=x.addParam(d,"wxfrom","5",!0),
is_https_res||f?d=d.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(d=d.https2http())),
setTimeout(function(){
a.onload=function(){
s(a,"height","auto","important"),s(a,"visibility","visible","important");
},a.setAttribute("src",d);
},0),window.logs.img.read[d]=!0,window.logs.img.load[d]=!0,a.removeAttribute("data-src"));
}
var c=e("biz_wap/ui/lazyload_img.js"),p=1;
window.logs.outer_pic=0;
for(var l=document.getElementsByTagName("img"),w=0,_=l.length;_>w;w++){
{
var g=l[w].getAttribute("data-src");
l[w].getAttribute("src");
}
g&&g.isGif()&&l[w].className.indexOf("__bg_gif")<0&&(l[w].className+=" __bg_gif"),
g&&o(l[w]);
}
for(var u=document.getElementsByClassName("__bg_gif"),w=0,_=u.length;_>w;++w)u[w].setAttribute("data-order",w);
new c({
attrKey:"data-src",
imgOccupied:!0,
lazyloadHeightWhenWifi:function(){
var e,t=1,o=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var n=e.getHours();
return n>=20&&23>n&&(t=.5,o=0),{
bottom:t,
top:o
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,t){
if(!t)return"";
var o=t;
if(t.isCDN()){
o=o.imgChange640();
var n,r=window.navigator.userAgent,a=/TBS\/([\d\.]+)/i,s=r.match(a);
s&&s[1]&&(n=parseInt(s[1]));
var d,c=/XWEB\/([\d\.]+)/i,p=r.match(c);
p&&p[1]&&(d=parseInt(p[1]));
var m=1e3,l=window.user_uin||0,w=0!==l&&Math.floor(l/100)%1e3<m;
w&&(n>=43305||d>=16)&&o.isGif()?(o=x.addParam(o,"tp","wxpic",!0),window.__addIdKeyReport("28307",91)):window.webp&&(o=x.addParam(o,"tp","webp",!0),
window.__addIdKeyReport("28307",84)),o=x.addParam(o,"wxfrom","5",!0),is_https_res||f?(o=o.http2https(),
window.__addIdKeyReport("28307",77)):("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(o=o.https2http(),
window.__addIdKeyReport("28307",70));
}else try{
var a=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
a.test(t)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(_){}
var g=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
o=o.replace(g,"http://m.qpic.cn"),o=x.addParam(o,"wx_lazy","1",!0);
return A&&o.isGif()&&(window.__addIdKeyReport("28307",106),o=x.addParam(o,"tp","wxpic",!0),
o=A+"hevc?url="+encodeURIComponent(o)+"&type=gif"),window.logs.img.load[o]=!0,i("[Appmsg] image_load_event_change_src. originsrc:"+t+"  ^^^ newsrc : "+o),
e.start_load_time=+new Date,o;
},
onerror:function(e,t){
var o=t?t.__retryload||0:0;
if(1==o&&n(t),e&&!(o>p)){
if(!e.isCDN()){
if(!A)return;
if(-1==e.indexOf(A))return;
}
var r=0==e.indexOf("https://")?7:0;
if(window.__addIdKeyReport("28307",72+r),window.__addIdKeyReport("28307",75+1*o+r),
e.isWxpic()?(window.__addIdKeyReport("28307",93),window.__addIdKeyReport("28307",96+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",86),
window.__addIdKeyReport("28307",89+1*o)),A&&e.indexOf(A)>-1&&window.__addIdKeyReport("28307",108),
p>o){
if(o++,t.__retryload=o,1==o&&e.indexOf("http://")>-1?(e=e.http2https(),window.__addIdKeyReport("28307",60),
window.__addIdKeyReport("28307",77)):1==o&&e.indexOf("https://")>-1&&(window.__addIdKeyReport("28307",61),
window.__addIdKeyReport("28307",77)),A&&e.indexOf(A)>-1){
var a=e.split("hevc?url=")[1];
a=a.split("&type")[0],a=decodeURIComponent(a),a=a.replace("tp=wxpic",""),e=a.https2http();
}
t.start_load_time=+new Date,t.src=x.addParam(e,"retryload",o,!0);
}
window.__has_imgfailed||(window.__has_imgfailed=!0,window.__addIdKeyReport("28307",65)),
i("[Appmsg] image_load_event_on_error. src:"+e),t.setAttribute("data-fail",1);
var s=10;
/tp\=webp/.test(e)&&(s=11);
var d=new Image;
d.src="http://mp.weixin.qq.com/mp/jsreport?key="+s+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,t){
r(t),t.gray&&!t.loadGif&&((t.width||t.naturalWidth)<120||(t.height||t.naturalHeight)<120?t.autoTap&&t.autoTap():t.span&&t.span.children&&t.span.children.item(0)&&(t.span.children.item(0).style.display=""));
var o=t?t.__retryload||0:0;
if(!(o>p)){
i("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+o),
t.setAttribute("data-fail",0);
var n=0==e.indexOf("https://")?7:0;
window.__addIdKeyReport("28307",71+n),window.__addIdKeyReport("28307",73+1*o+n),
e.isWxpic()?(window.__addIdKeyReport("28307",92),window.__addIdKeyReport("28307",94+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",85),
window.__addIdKeyReport("28307",87+1*o)),A&&e.indexOf(A)>-1&&window.__addIdKeyReport("28307",107),
window.__has_imgsucceed||(window.__has_imgsucceed=!0,window.__addIdKeyReport("28307",64)),
1==o&&e.indexOf("http://")>-1&&window.__addIdKeyReport("28307",50),1==o&&e.indexOf("https://")>-1&&window.__addIdKeyReport("28307",52);
var a=Math.random(),s=+new Date-t.start_load_time;
s&&0==e.indexOf("https://")&&.5>a?(window.__addIdKeyReport("27822",121,s),window.__addIdKeyReport("27822",122)):s&&5e-4>a&&(window.__addIdKeyReport("27822",124,s),
window.__addIdKeyReport("27822",125));
}
},
detect:function(e){
if(e&&e.time&&e.loadList){
var t=e.time,o=e.loadList;
window.logs.img.download[t]=o;
}
},
container:document.getElementById("page-content")
});
});
}),e("appmsg/async.js"),!window.isSg;
var K=e("appmsg/copyright_report.js");
!function(){
var e=document.getElementById("post-user"),t=document.getElementById("copyright_info"),o=[],n=document.getElementById("post-user-headimg");
if(e){
var a="57";
"26"==window.source&&(a="95"),"28"==window.source&&(a="96"),"29"==window.source&&(a="39"),
"15"==window.source&&(a="121"),o.push({
dom:e,
username:user_name_new||user_name,
profileReportInfo:window.profileReportInfo||"",
scene:a
}),n&&o.push({
dom:n,
username:user_name_new||user_name,
profileReportInfo:window.profileReportInfo||"",
scene:a
});
}
t&&source_encode_biz&&o.push({
dom:t,
source_encode_biz:source_encode_biz,
scene:"110"
});
var s=document.getElementById("js_share_headimg");
s&&(window.new_appmsg&&window.source_encode_biz?m.on(s,"click",function(){
return location.href="/mp/profile_ext?action=home&__biz="+window.source_encode_biz+"#wechat_redirect",
!1;
}):o.push({
dom:s,
username:source_username,
scene:0
}));
var d=document.getElementById("js_share_author");
d&&(window.new_appmsg&&window.source_encode_biz?m.on(d,"click",function(){
return location.href="/mp/profile_ext?action=home&__biz="+window.source_encode_biz+"#wechat_redirect",
!1;
}):o.push({
dom:d,
username:source_username,
scene:0
}));
for(var p=0,w=o.length;w>p;p++)!function(e){
m.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
K.card_click_report({
scene:"0"
});
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?location.href=t:l.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
});
}else{
if(i("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
_.profileReport({}),profileReportInfo){
var o=String(profileReportInfo).split("_");
3==o.length&&r({
url:"/mp/ad_biz_info?action=report&__biz="+window.biz+"&report_type=2&aid="+o[1]+"&tid="+o[2],
type:"GET",
dataType:"json",
async:!0,
success:function(){}
});
}
l.invoke("profile",{
username:e.username,
profileReportInfo:e.profileReportInfo||"",
scene:e.scene
},function(t){
window.__addIdKeyReport("28307","1"),i("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", profileReportInfo:"+e.profileReportInfo+", res.err_msg:"+t.err_msg);
});
}
return!1;
}),c.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(o[p]);
}(),function(){
location.href.match(/fontScale=\d+/)&&c.isIOS&&l.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
try{
var C=document.getElementById("js_author_name");
if(C){
var N="";
N="https://mp.weixin.qq.com/mp/author?action=show&author_id="+author_id+"#wechat_redirect",
m.on(C,"click",function(){
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(c.isIOS||c.isAndroid||c.isWp)?l.invoke("openUrlWithExtraWebview",{
url:N,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=N);
}):location.href=N;
});
}
}catch(y){}
var D=e("appmsg/outer_link.js");
if(new D({
container:document.getElementById("js_content"),
changeHref:function(e,t){
if(!e||0!=e.indexOf("http://mp.weixin.qq.com/")&&0!=e.indexOf("https://mp.weixin.qq.com/")){
if(18==ban_scene)return"/mp/ban?action=check&__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+ban_scene+"#wechat_redirect";
if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0";
}else{
e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),e=e.replace(/[\?&]scene=21/,"");
var o="&";
-1==e.indexOf("?")&&(o="?"),e+=o+"scene=21#wechat_redirect";
}
return e;
}
}),!E){
var M=e("appmsg/review_image.js"),W=document.getElementById("js_cover"),P=[];
W&&P.push(W),new M({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:P
});
}
e("appmsg/product.js"),function(){
try{
var e=document.getElementById("js_content");
if(!e||!e.querySelectorAll)return;
for(var t=e.querySelectorAll("*"),o="js_tx_video_container,js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-2,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link".split(","),n=function(e){
if(e&&e.className){
for(var t=e.className.split(/\s+/),n=[],i=0,r=t.length;r>i;++i){
var a=t[i];
a&&-1!=o.indexOf(a)&&n.push(a);
}
e.className=n.join(" ");
}
},i=0,r=t.length;r>i;++i){
var a=t[i];
a.tagName&&"iframe"!=a.tagName.toLowerCase()&&n(a);
}
}catch(s){}
}(),window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
window.__appmsgCgiData&&1==window.__appmsgCgiData.show_msg_voice&&e("appmsg/autoread.js"),
"1"==window.show_msg_voice&&(console.log("load voicemsg"),e("appmsg/voicemsg.js")),
window.__appmsgCgiData&&1==window.__appmsgCgiData.wxa_product&&e("appmsg/weproduct.js"),
e("appmsg/weapp.js"),window.new_appmsg&&e("appmsg/new_index.js"),e("appmsg/wxtopic.js"),
e("appmsg/cdn_speed_report.js");
var Q=e("appmsg/page_pos.js");
Q.init({
hasSpAd:!0
}),setTimeout(function(){
window.article_improve_combo_css;
},0),setTimeout(function(){
m.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),d(),p(),e("appmsg/report_and_source.js"),function(){
if(E){
n.addClass(g,"not_in_mm");
var e=document.getElementById("js_pc_qr_code_img");
if(e){
var t=10000004,o=document.referrer;
if(0==o.indexOf("http://weixin.sogou.com")?t=10000001:0==o.indexOf("https://wx.qq.com")&&(t=10000003),
window.isSg)e.setAttribute("src",sg_qr_code.htmlDecode());else{
e.setAttribute("src","/mp/qrcode?scene="+t+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var i=new Image;
i.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+t+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var r=document.getElementById("js_profile_qrcode"),a=document.getElementById("js_profile_arrow_wrp"),s=document.getElementById("post-user");
if(r&&s&&a){
var d=function(){
var e=10000005,t=document.referrer;
0==t.indexOf("http://weixin.sogou.com")?e=10000006:0==t.indexOf("https://wx.qq.com")&&(e=10000007);
var o=document.getElementById("js_profile_qrcode_img");
if(o)if(window.isSg)o.setAttribute("src",sg_qr_code.htmlDecode());else{
o.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return r.style.display="block",a.style.left=s.offsetLeft-r.offsetLeft+s.offsetWidth/2-8+"px",
!1;
};
m.on(s,"click",d),m.on(r,"click",d),m.on(document,"click",function(e){
var t=e.target||e.srcElement;
t!=s&&t!=r&&(r.style.display="none");
});
}
}else{
var c=document.getElementById("js_report_article3");
!!c&&(c.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=document.getElementById("img-content");
if(e&&t&&t.getBoundingClientRect){
var o=t.getBoundingClientRect().height;
window.scrollTo(0,o);
}
}(),e("appmsg/report.js");
for(var t=document.getElementsByTagName("map"),o=0,i=t.length;i>o;++o)t[o].parentNode.removeChild(t[o]);
if(K.card_pv_report(),Math.random()<.01)try{
var r="https://js.aq.qq.com/js/aq_common.js",a=document.createElement("script");
a.src=r;
var s=document.getElementsByTagName("head")[0];
s.appendChild(a);
}catch(c){}
var l=document.getElementById("js_close_temp");
m.on(l,"click",function(){
l.parentNode.parentNode.removeChild(l.parentNode),n.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(o.os.ios&&"onorientationchange"in window){
var e=[],t="onorientationchange"in window?"orientationchange":"resize",n=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:n(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
m.on(window,t,function(){
var t=e.length-2,o=n();
if(t>=0){
var r=e[t],a=r.ori;
a!==o||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,r.scroll));
}
e.push({
ori:o,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
}),m.on(window,"scroll",function(){
var t=e.length-1;
e[t].ori==n()&&(e[t].scroll=window.pageYOffset||document.documentElement.scrollTop,
e[t].istouchmove=!0);
});
}
}(),i("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
e("appmsg/fereport.js"),function(){
window.addEventListener&&document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
c.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
c.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
}(),"undefined"!=typeof isSg&&e("sougou/index.js"),setTimeout(function(){
for(var e=function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_49_1&lc=1&log0=[28307_49_appmsg_fe_filter]"+encodeURIComponent(location.href);
},t=(window.appmsg_fe_filter||"").split(","),o=function(t,o){
try{
if(!t)return;
if(t.querySelectorAll){
var n=t.querySelectorAll("*["+o+"]");
if(n&&n.length>0){
e();
for(var i=0;i<n.length;++i)n[i]&&n[i].removeAttribute&&n[i].removeAttribute(o);
}
return;
}
var r=t.childNodes;
if(t.hasAttribute&&t.hasAttribute(o)&&e(),t.removeAttribute&&t.removeAttribute(o),
r&&r.length)for(var i=0;i<r.length;++i)filterContenteditable(r[i]);
}catch(a){}
},n=document.getElementById("js_content"),i=0;i<t.length;++i)t[i]&&o(n,t[i]);
},0),setTimeout(function(){
var e=999,t=636,o="http://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0",n=(new Date).getHours();
if(!(11>n||n>16||Math.random()<.99)){
var i=new Image;
i.onload=function(){
var o=i.naturalWidth||i.width,n=i.naturalHeight||i.height;
(o!=e||n!=t)&&window.__addIdKeyReport("28307","wifi"===window.networkType?120:123),
window.__addIdKeyReport("28307","wifi"===window.networkType?121:124);
},i.src=o;
var r=new Image;
r.onload=function(){
var o=r.naturalWidth||r.width,n=r.naturalHeight||r.height;
(o!=e||n!=t)&&window.__addIdKeyReport("28307",126),window.__addIdKeyReport("28307",127);
},r.src="https://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0";
}
},3e3);
var U=Math.random();
if(2e-4>U)try{
for(var L=document.getElementsByTagName("img"),G=window.screen.height,H=window.screen.width,J=0,Y=window.devicePixelRatio,J="",V=0,F=L.length;F>V;V++){
var X=L[V].getAttribute("data-src");
if(X){
var $=L[V].getBoundingClientRect();
J+=H+"|"+G+"|"+$.left.toFixed(2)+"|"+(H-$.right).toFixed(2)+"|"+$.width.toFixed(2)+"|"+Y.toFixed(2)+"|"+X+";";
}
}
r({
url:"/mp/wapreport?action=img_display_report",
data:{
key:J
},
type:"POST",
dataType:"json",
async:!0
});
}catch(y){}
}
e("biz_common/utils/string/html.js");
var o=e("biz_wap/utils/device.js"),n=e("biz_common/dom/class.js"),i=e("appmsg/log.js"),r=e("biz_wap/utils/ajax.js"),a=e("biz_common/dom/attr.js"),s=a.setProperty,d=e("appmsg/max_age.js"),c=e("biz_wap/utils/mmversion.js"),p=e("appmsg/test.js"),m=e("biz_common/dom/event.js"),l=e("biz_wap/jsapi/core.js"),w=e("biz_common/moment.js"),_=e("appmsg/appmsg_report.js");
window.new_appmsg?(e("page/appmsg_new/combo.css"),e("page/appmsg_new/not_in_mm.css")):(e("page/appmsg/page_mp_article_improve_combo.css"),
e("page/appmsg/not_in_mm.css"));
var g=window.user_uin||0,u=Math.floor(g/100)%1e3,f=0!==g&&1001>u,h=!0,A="";
window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.log("进入index.js init"),
i("[Appmsg] start run index.js init"),t();
var v=!1;
});
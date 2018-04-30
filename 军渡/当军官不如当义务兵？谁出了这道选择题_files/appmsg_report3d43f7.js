define("pages/create_txv.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax_load_js.js","pages/loadscript.js"],function(e){
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
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","pages/create_txv.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
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
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=s.video_top.length,o=e+s.innerHeight,n=0,d=0;t>d;d++){
var m=s.video_top[d];
m.reported?n++:o>=m.start&&o<=m.end&&(m.reported=!0,r.report({
step:1,
vid:m.vid
}));
}
n==t&&(a.off(window,"scroll",i),s.video_top=s.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o,n=e("biz_common/utils/url/parse.js"),d=e("pages/create_txv.js"),r=e("new_video/ctl.js"),s={
txVideoReg:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},m=e("pages/version4video.js"),c=e("biz_common/dom/attr.js"),a=(c.setProperty,e("biz_common/dom/event.js")),p=document.getElementsByTagName("iframe"),l=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var w=Math.ceil(1e4*Math.random()),_=0,u=p.length;u>_;++_){
o=p[_];
var v=o.getAttribute("data-src")||"",g=o.className||"",f=o.getAttribute("src")||v;
if(!v||"#"==v){
var h=o.getAttribute("data-display-src");
if(h&&(0==h.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==h.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
h=h.replace(/&amp;/g,"&");
for(var x=h.split("&"),b=["/mp/newappmsgvote?action=show"],_=0;_<x.length;_++)(0==x[_].indexOf("__biz=")||0==x[_].indexOf("supervoteid="))&&b.push(x[_]);
b.length>1&&(v=b.join("&")+"#wechat_redirect");
}
}
if(f&&s.txVideoReg.test(f)){
if(m.isShowMpVideo()){
e("pages/create_txv.js");
var y=n.getQuery("vid",v);
if(!y)continue;
var j=o.getAttribute("data-vw"),k=o.getAttribute("data-vh"),O=document.domain;
"qq.com"==O&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(y),s.video_iframe.push({
dom:o,
vid:y
}),f=["/mp/videoplayer?video_h=",k,"&video_w=",j,"&scene=",window.source,"&random_num=",w,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",y,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||"","&__testd=",O,"&__td=",document.domain].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
d.createGlobalFunc(),setTimeout(function(e,t,i,o){
return function(){
o.setAttribute("marginWidth",0),o.setAttribute("marginHeight",0),o.style.top="0",
o.setAttribute("src",i);
};
}(j,k,f,o),0);
}
}else if(v&&(v.indexOf("newappmsgvote")>-1&&g.indexOf("js_editor_vote_card")>=0||0==v.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&g.indexOf("card_iframe")>=0||v.indexOf("appmsgvote")>-1||v.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&v.indexOf(window.biz)<0){
l.push(o);
continue;
}
if(v=v.replace(/^http:/,location.protocol),g.indexOf("card_iframe")>=0){
var q=v.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(q+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
o.setAttribute("src",q);
}else{
var z=v.indexOf("#wechat_redirect")>-1,A=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?A+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):g.indexOf("vote_iframe")>=0&&(A+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var q=z?v.replace("#wechat_redirect",A):v+A;
o.setAttribute("src",q);
}
-1==v.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(o),o.appmsg_idx=_;
}
if(v&&v.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&j>0){
var H=j,I=3*H/4;
o.width=H,o.height=I,o.style.setProperty&&(o.style.setProperty("width",H+"px","important"),
o.style.setProperty("height",I+"px","important"));
}
}
for(var R=0;R<l.length;R++){
var D=l[R];
D.parentNode.removeChild(D);
}
if(window.iframe_reload=function(){
for(var e=0,i=p.length;i>e;++e){
o=p[e];
var n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var E,C=document.getElementsByClassName("video_iframe"),_=0;E=C.item(_++);)E.setAttribute("scrolling","no"),
E.style.overflow="hidden";
s.video_iframe.length>0&&setTimeout(function(){
for(var e=s.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var d=e[o];
if(!d||!d.dom)return;
for(var r=d.dom,m=r.offsetHeight,c=0;r&&t!==r;)c+=r.offsetTop,r=r.offsetParent;
s.video_top.push({
start:c+m/2,
end:c+m/2+s.innerHeight,
reported:!1,
vid:d.vid
});
}
i(),a.on(window,"scroll",i);
},0);
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/comment_utils.js","pages/create_txv.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","biz_common/dom/class.js","appmsg/img_copyright_tpl.html.js","appmsg/appmsgext.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","biz_wap/utils/mmversion.js","pages/version4video.js","appmsg/like.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js"],function(e,t,i,r){
"use strict";
function n(){
for(var t=document.getElementsByTagName("iframe"),i=[],r=0,n=t.length;n>r;++r)i.push(t[r]);
t=null;
var o=document.getElementById("js_content"),s=o.offsetWidth,d=s/u.getRatio();
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
l=a(j?_:_),l&&B.push(l),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10);
}
window.logs.video_cnt++;
continue;
}
}
}
B.length>0&&"function"==typeof window.__getVideoWh&&x.on(window,"resize",function(){
try{
for(var e=0,t=B.length;t>e;e++){
var i=B[e],r=i.playerObj;
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
function a(e){
var t=e.getAttribute("data-src")||e.getAttribute("src"),i=g.getQuery("vid",t),r=e.getAttribute("data-vw"),n=e.getAttribute("data-vh"),a=e.getAttribute("data-ratio"),s=document.createElement("span");
s.setAttribute("data-ratio",a),s.id="js_tx_video_container_"+Math.random(),s.className="js_tx_video_container",
s.style.cssText=e.style.cssText,s.style.display="none";
var d=e.parentNode;
return d?(d.lastChild===e?d.appendChild(s):d.insertBefore(s,e.nextSibling),w.createTxVideo({
containerId:s.id,
vid:i,
width:r,
height:n,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(e){
s.playerObj=e.player,o(s,i),s.style.display="block";
},
onError:function(){}
}),d.removeChild(e),s):void 0;
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
m.innerHTML=z.tmpl(v,t[_]);
{
var c=m.children[0],p=s.parentNode,l=p.insertBefore(c,s),w=l.children[0];
(function(e,t){
x.on(t,"click",function(){
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
t.share_redirect_url&&_&&(window._share_redirect_url=t.share_redirect_url,_.innerHTML=z.tmpl(y,{
url:t.share_redirect_url
})),l.initCommentByExtData(t),window._has_comment||0!=window.adDatas.num||window._share_redirect_url||h.addClass(document.body,"rich_media_empty_extra"),
-1==b.indexOf("WindowsWechat")&&-1!=b.indexOf("MicroMessenger")&&(p=e("appmsg/reward_entry.js"),
p.handle(t.reward,m())),1!=t.reward_entrance_enable_for_preview||A.isIOS||(document.getElementById("js_preview_reward")&&(document.getElementById("js_preview_reward").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_wording")&&(document.getElementById("js_preview_reward_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_wording").style.display="block"),x.on(document.getElementById("js_preview_reward_link"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
})),t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
x.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
}));
}
function _(){
var t=I.checkNeedAds(),i=t.is_need_ad,r=t.both_ad,n=-1!=location.href.indexOf("mock_ad=");
n&&(t.is_need_ad=i=1),E("[Appmsg] start get asycn data, is_need_ad:"+i);
var a=window.new_appmsg&&1==_copyright_stat?1:0;
f.getData({
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
is_need_ticket:B&&B.length>0?1:0,
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
I.afterGetAdData(t,i),window.wx_user_can_reward=i.user_can_reward,d({
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
E("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
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
return x.on(window,"resize",function(){
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
var p,l=e("appmsg/comment_utils.js"),w=e("pages/create_txv.js"),u=e("pages/video_ctrl.js"),g=e("biz_common/utils/url/parse.js"),h=e("biz_common/dom/class.js"),v=e("appmsg/img_copyright_tpl.html.js"),f=e("appmsg/appmsgext.js"),y=e("appmsg/share_tpl.html.js"),b=navigator.userAgent,j=-1!=b.indexOf("MicroMessenger"),x=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),k=(e("biz_wap/utils/ajax.js"),e("biz_common/dom/class.js"),
e("biz_wap/jsapi/core.js")),z=e("biz_common/tmpl.js"),E=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),I=(e("rt/appmsg/getappmsgext.rt.js"),e("a/a.js")),A=e("biz_wap/utils/mmversion.js"),B=[];
n(),_();
});define("appmsg/appmsg_report.js",["biz_wap/utils/ajax.js"],function(i){
"use strict";
function e(i){
var e=i.link,o=i.action_type,n=e.split("?").pop();
if(n=n.split("#").shift(),""!=n){
var p=i.reportVid||window.reportVid,d=i.reportMid||window.reportMid,r=i.reportVoiceid||window.reportVoiceid,s=i.reportWeappid||window.reportWeappid,w=[n,"action=share","action_type="+o,"scene="+(i.source||window.source),"ascene="+(i.ascene||window.ascene||-1),"req_id="+(i.req_id||window.req_id||""),"vid="+("undefined"!=typeof p?p.join(";"):""),"musicid="+("undefined"!=typeof d?d.join(";"):""),"voiceid="+("undefined"!=typeof r?r.join(";"):""),"weappid="+("undefined"!=typeof s?s.join(";"):""),"item_show_type="+(i.item_show_type||window.item_show_type||0)].join("&");
t({
url:"/mp/appmsgreport",
type:"POST",
data:w
});
}
}
function o(i){
t({
url:"/mp/appmsgreport?action=name_click",
data:{
url:location.href,
title:i.title||window.msg_title||"",
msgid:window.mid||"",
itemidx:window.idx||"",
__biz:window.biz||"",
ascene:window.ascene||-1,
isnew:i.isnew||0,
item_show_type:i.item_show_type||window.item_show_type||0
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
var t=i("biz_wap/utils/ajax.js");
return{
shareReport:e,
profileReport:o
};
});
define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js"],function(e){
"use strict";
function t(e){
window.logs||(window.logs={}),u.js_content=e.js_content||document.getElementById("js_content");
var t=e.js_toobar3||document.getElementById("js_toobar3");
u.pageEndTop=t?t.offsetTop:0,u.imgs=u.js_content?u.js_content.getElementsByTagName("img")||[]:[],
u.media=e.media||document.getElementById("media"),u.title=e.title||(window.msg_title||"").htmlDecode(),
u.video_cnt=e.video_cnt||window.logs.video_cnt||0,u.js_cmt_area=e.js_cmt_area||document.getElementById("js_cmt_area"),
u.item_show_type=e.item_show_type||window.item_show_type||0,c=document.getElementsByTagName("html"),
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
if(S=1*h.get(E),!window.__second_open__){
var t=location.href.indexOf("scrolltodown")>-1,o=u.js_cmt_area;
if(t&&o&&o.offsetTop){
var n=o.offsetTop;
window.scrollTo(0,n-25);
}else window.scrollTo(0,S);
}
if(window.__wxjs_is_wkwebview){
var i=f.getData(),m=localStorage.getItem("hand_up_id");
for(var w in i)w!=m&&i[w]&&(d(i[w].val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random(),
f.remove(w));
window.setInterval(function(){
var e=a();
f.set(x,e,+new Date+864e7);
},1e3);
}
var l=v.getData("spad");
l&&l.spad&&r(l.spad.val),e.hasSpAd&&window.setInterval(function(){
s();
var e=_();
v.set("spad",e,+new Date+864e7);
},1e3);
}),m.on(window,"unload",function(){
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=a();
d(e);
}),window.logs.read_height=0,m.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(O),O=setTimeout(function(){
S=window.pageYOffset,h.set(E,S,+new Date+72e5);
},500);
}),m.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(O),O=setTimeout(function(){
S=window.pageYOffset,h.set(E,S,+new Date+72e5);
},500);
})),m.on(document,"visibilitychange",function(){
p.isHidden()?localStorage.setItem("hand_up_id",x):localStorage.setItem("hand_up_id","");
});
}
function o(e,t){
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,d=0,s=e.length;s>d;++d)o=e[d],
o&&(n=o.getAttribute(t),n&&(i=n.match(a),i&&i[2]&&(b[i[2]]=!0)));
}
function n(e){
for(var t=0,o=T.length;o>t;++t)if(T[t]==e)return!0;
return!1;
}
function i(){
b={},o(document.getElementsByTagName("a"),"href"),o(document.getElementsByTagName("link"),"href"),
o(document.getElementsByTagName("iframe"),"src"),o(document.getElementsByTagName("script"),"src"),
o(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in b)b.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!j&&n(t)&&(j=!0),
e.push(t));
return b={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=u.js_content,n=u.screen_height,a=u.screen_width,d=u.scroll_height,s=Math.ceil(d/n),_=Math.ceil((o.scrollHeight||o.offsetHeight)/n),r=(window.logs.read_height||t)+n,m=u.pageEndTop,w=u.imgs,l=Math.ceil(r/n)||1,g=u.media,h=50,f=0,v=0,b=0,T=0,z=r+h>m?1:0;
l>s&&(l=s);
var O=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
f++;
var a=i.getAttribute("src"),d=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(v++,a.isCDN()&&(b++,-1!=a.indexOf("tp=webp")&&T++),d&&(e["img_"+d+"_cnt"]=e["img_"+d+"_cnt"]||0,
e["img_"+d+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=T||0,e.download_img_cnt=v||0,e.download_cdn_img_cnt=b||0,
e.img_cnt=f||0;
},S=window.appmsgstat||{},E=window.logs.img||{},I=window.logs.pagetime||{},x=E.load||{},D=E.read||{},k=[],N=[],B=0,H=0,M=0;
for(var A in D)A&&0==A.indexOf("http")&&D.hasOwnProperty(A)&&N.push(A);
for(var A in x)A&&0==A.indexOf("http")&&x.hasOwnProperty(A)&&k.push(A);
for(var P=0,q=k.length;q>P;++P){
var R=k[P];
R&&R.isCDN()&&(-1!=R.indexOf("/0")&&B++,-1!=R.indexOf("/640")&&H++,-1!=R.indexOf("/300")&&M++);
}
var e={
__biz:biz,
title:u.title,
mid:mid,
idx:idx,
subscene:window.subscene||0,
read_cnt:S.read_num||0,
like_cnt:S.like_num||0,
screen_width:a,
screen_height:n,
screen_num:_,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:u.video_cnt,
read_screen_num:l||0,
is_finished_read:z,
scene:source,
content_len:y.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
handup_time:p.getHandUpTime(),
img_640_cnt:H,
img_0_cnt:B,
img_300_cnt:M,
wtime:I.onload_time||0,
ftime:I.ftime||0,
ptime:I.ptime||0,
onload_time:I.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:window.ct,
item_show_type:u.item_show_type
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=k.length,
e.wifi_read_imgs_cnt=N.length),window.logs.webplog&&4==window.logs.webplog.total){
var Y=window.logs.webplog;
e.webp_total=1,e.webp_lossy=Y.lossy,e.webp_lossless=Y.lossless,e.webp_alpha=Y.alpha,
e.webp_animation=Y.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var J=window.logs.idkeys,K=[];
for(var C in J)if(J.hasOwnProperty(C)){
var L=J[C];
L.val>0&&K.push(C+"_"+L.val);
}
e.idkey=K.join(";");
}
O(!!g&&g.getElementsByTagName("img")),O(w);
var W=(new Date).getDay(),U=i();
return(j||0!==user_uin&&Math.floor(user_uin/100)%7==W)&&(e.domain_list=U),j&&(e.html_content=c),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e;
}
function d(e){
z||(z=!0,f.remove(x),e.report_time=parseInt(+new Date/1e3),e.ascene=window.ascene||-1,
0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),w({
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
var e=JSON.stringify(window._adRenderData),t=+new Date,o=new g("ad");
o.set(E,{
info:e,
time:t
},+new Date+24e4);
}
h.set(E,S,+new Date+72e5);
}
function _(){
return window.__video_report_data;
}
function r(e){
e&&e.play_type&&(v.remove("spad"),e.report_type=1,w({
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
var c,g=e("biz_wap/utils/storage.js"),p=e("biz_wap/utils/hand_up_state.js"),u={
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
},h=new g("page_pos"),f=new g("time_on_page"),v=new g("spad"),y={},b={},j=!1,T=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],z=!1,O=null,S=0,E=[biz,sn,mid,idx].join("_"),I=Math.random(),x=[biz,sn,mid,idx,I].join("_");
return{
init:t
};
});define("appmsg/weapp.js",["biz_common/utils/string/html.js","pages/weapp_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/tmpl.js","biz_common/dom/class.js","appmsg/weapp_common.js"],function(e){
"use strict";
function t(e,t,n){
var o=new Image;
o.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=106&content="+n+",biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(t.toString())+"&r="+Math.random()).substr(0,1024),
console&&t&&console.error(t);
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
T.href="javascript:void(0);";
}
g.on(T,"a"==K?"click":"tap",function(){
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
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","pages/create_txv.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight),
console.log("iframe height: ",t);
var o=e.parentElement;
if(o&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var i=e.contentWindow.document.getElementsByTagName("html");
i&&i.length&&(i[0].style.overflow="hidden");
}
}catch(n){}
}
function o(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=c.video_top.length,i=e+c.innerHeight,n=0,d=0;t>d;d++){
var s=c.video_top[d];
s.reported?n++:i>=s.start&&i<=s.end&&(s.reported=!0,r.report({
step:1,
vid:s.vid
}));
}
n==t&&(a.off(window,"scroll",o),c.video_top=c.video_iframe=o=null);
}
e("biz_common/utils/string/html.js");
{
var i=e("biz_wap/utils/ajax.js"),n=e("biz_common/utils/url/parse.js"),d=e("pages/create_txv.js"),r=e("new_video/ctl.js"),c={
txVideoReg:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},s=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),a=(m.setProperty,e("biz_common/dom/event.js")),p=document.getElementsByTagName("iframe"),l=[];
/MicroMessenger/.test(navigator.userAgent);
}
console.log("iframes length:",p.length),window.reportVid=[];
for(var u=Math.ceil(1e4*Math.random()),w=0,_=p.length;_>w;++w)!function(o){
var r=o.getAttribute("data-src")||"",m=o.className||"",a=o.getAttribute("src")||r;
if(!r||"#"==r){
var p=o.getAttribute("data-display-src");
if(p&&(0==p.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==p.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
p=p.replace(/&amp;/g,"&");
for(var w=p.split("&"),_=["/mp/newappmsgvote?action=show"],g=0;g<w.length;g++)(0==w[g].indexOf("__biz=")||0==w[g].indexOf("supervoteid="))&&_.push(w[g]);
_.length>1&&(r=_.join("&")+"#wechat_redirect");
}
}
if(console.log("before insert iframe"),a&&c.txVideoReg.test(a)){
if(s.isShowMpVideo()){
e("pages/create_txv.js");
var f=n.getQuery("vid",r);
if(!f)return;
var v=o.getAttribute("data-vw"),h=o.getAttribute("data-vh"),x=document.domain;
"qq.com"==x&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(f),c.video_iframe.push({
dom:o,
vid:f
}),a=["/mp/videoplayer?video_h=",h,"&video_w=",v,"&scene=",window.source,"&random_num=",u,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",f,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
d.createGlobalFunc(),setTimeout(function(e,t){
t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__?i({
url:e,
type:"GET",
f:"html",
success:function(o){
console.log("video jsapi success"),console.log(t.contentDocument.charset),t.setAttribute("src",e),
t.contentDocument.open("text/html","replace"),t.contentDocument.write(o),t.contentDocument.close(),
t.contentWindow.__iframe_src__=e;
}
}):t.setAttribute("src",e);
},0,a,o);
}
}else if(r&&(r.indexOf("newappmsgvote")>-1&&m.indexOf("js_editor_vote_card")>=0||0==r.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&m.indexOf("card_iframe")>=0||r.indexOf("appmsgvote")>-1||r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&r.indexOf(window.biz)<0)return void l.push(o);
if(window.__second_open__||(r=r.replace(/^http:/,location.protocol)),m.indexOf("card_iframe")>=0){
var b=r.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(b+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?i({
url:b,
type:"GET",
f:"html",
success:function(e){
console.log("cardticket jsapi success"),o.setAttribute("src",b),o.contentWindow.document.open("text/html","replace"),
o.contentWindow.document.write(e),o.contentWindow.document.close(),-1==r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(o.onload=function(){
t(o);
});
}
}):(o.setAttribute("src",b),-1==r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(o.onload=function(){
t(o);
}));
}else{
var y=r.indexOf("#wechat_redirect")>-1,j=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?j+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):m.indexOf("vote_iframe")>=0&&(j+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var b=y?r.replace("#wechat_redirect",j):r+j;
window.__second_open__?i({
url:b,
type:"GET",
f:"html",
success:function(e){
console.log("vote jsapi success"),o.setAttribute("src",b),o.contentWindow.document.open("text/html","replace"),
o.contentWindow.document.write(e),o.contentWindow.document.close(),-1==r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(o.onload=function(){
t(o);
});
}
}):(o.setAttribute("src",b),-1==r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(o.onload=function(){
t(o);
}));
}
o.appmsg_idx=g;
}
if(r&&r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&v>0){
var k=v,q=3*k/4;
o.width=k,o.height=q,o.style.setProperty&&(o.style.setProperty("width",k+"px","important"),
o.style.setProperty("height",q+"px","important"));
}
}(p[w]);
for(var g=0;g<l.length;g++){
var f=l[g];
f.parentNode.removeChild(f);
}
if(window.iframe_reload=function(){
for(var e=0,o=p.length;o>e;++e){
var i=p[e],n=i.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(i);
}
},"getElementsByClassName"in document)for(var v,h=document.getElementsByClassName("video_iframe"),w=0;v=h.item(w++);)v.setAttribute("scrolling","no"),
v.style.overflow="hidden";
c.video_iframe.length>0&&setTimeout(function(){
for(var e=c.video_iframe,t=document.getElementById("js_article"),i=0,n=e.length;n>i;i++){
var d=e[i];
if(!d||!d.dom)return;
for(var r=d.dom,s=r.offsetHeight,m=0;r&&t!==r;)m+=r.offsetTop,r=r.offsetParent;
c.video_top.push({
start:m+s/2,
end:m+s/2+c.innerHeight,
reported:!1,
vid:d.vid
});
}
o(),a.on(window,"scroll",o);
});
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t,a,o){
var i={
current:e,
urls:t,
currentInfo:{
url:e,
data:a,
pos:o
}
};
console.log("imagePreview request",i),r.invoke("imagePreview",i,function(e){
console.log("imagePreview response",e),window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),d("[Appmsg] click image, src: "+e);
}
function a(e,t){
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
function o(e){
var o=[],r=e.container,d=e.imgs||[];
if(r)for(var s=r.getElementsByTagName("img")||[],g=0,l=s.length;l>g;g++)d.push(s.item(g));
for(var c=p.isIOS&&1==window._copyright_stat&&1==window.is_need_reward,m=0,g=0,l=d.length;l>g;g++){
var w=d[g],u=w.getAttribute("data-src")||w.getAttribute("src"),h=w.getAttribute("data-type");
if(u&&!u.isGif()&&0!=u.indexOf("data:")){
for(;-1!=u.indexOf("?tp=webp");)u=u.replace("?tp=webp","");
w.dataset&&w.dataset.s&&u.isCDN()&&(u=u.replace(/\/640$/,"/0"),u=u.replace(/\/640\?/,"/0?")),
u.isCDN()&&(u=n.addParam(u,"wxfrom","3",!0)),u=e.is_https_res?u.http2https():u.https2http(),
h&&(u=n.addParam(u,"wxtype",h,!0)),o.push(u),"1"!=w.getAttribute("data-nopreviewclick")&&!function(e){
i.on(w,"click",function(i){
if(!(i&&i.target&&i.target.className&&i.target.className.indexOf("img_loadederror")>-1)){
if("function"==typeof window.__addIdKeyReport&&window.__addIdKeyReport("110644",2),
window.getComputedStyle){
for(var r=i.target,n=r.getBoundingClientRect(),d=!0;r&&"body"!=r.nodeName.toLowerCase();){
var s=window.getComputedStyle(r,null),p=parseInt(s.getPropertyValue("opacity")),g=s.getPropertyValue("filter"),l=s.getPropertyValue("visibility");
if(1!=p||"visible"!=l||g.indexOf("opacity")>=0||g.indexOf("blur")>=0){
d=!1;
break;
}
var w=r.getBoundingClientRect();
if(("hidden"==s.overflow||"hidden"==s.overflowX||"hidden"==s.overflowY)&&(w.left>n.left||w.right<n.right||w.top>n.top||w.bottom<n.bottom)){
d=!1;
break;
}
r=r.parentElement;
}
if(!d){
if(console.log("don't try this again"),"function"==typeof window.__addIdKeyReport){
window.__addIdKeyReport("110644",3);
var u=new Image,h="https://badjs.weixinbridge.com/badjs?id=168&level=4&from="+encodeURIComponent(location.href)+"&msg="+encodeURIComponent(e);
u.src=h.slice(0,1024);
}
return!1;
}
}
"undefined"==typeof getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var f=i.target,b=window.getComputedStyle(f),y=f.getBoundingClientRect(),_=document.createElement("canvas");
_.style.width=b.width,_.style.height=b.height,_.width=parseFloat(b.width),_.height=parseFloat(b.height);
var v=_.getContext("2d"),j="";
v.drawImage(f,0,0,parseFloat(b.width),parseFloat(b.height));
try{
j=_.toDataURL();
}catch(i){}
t(e,o,j,{
x:y.left-parseFloat(b.paddingLeft)-parseFloat(b.borderLeftWidth),
y:y.top-parseFloat(b.paddingTop)-parseFloat(b.borderTopWidth),
width:y.width-parseFloat(b.paddingLeft)-parseFloat(b.paddingRight)-parseFloat(b.borderLeftWidth)-parseFloat(b.borderRightWidth),
height:y.height-parseFloat(b.paddingTop)-parseFloat(b.paddingBottom)-parseFloat(b.borderTopWidth)-parseFloat(b.borderBottomWidth)
}),c&&0==m&&a(i.target.src,2);
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
var t=e.touches[0].pageX,a=e.touches[0].pageY;
Math.abs(t-b)>10&&Math.abs(a-y)>10&&(m=0);
}),i.on(f,"touchend",function(e){
0!=m&&(+new Date-m>800&&+new Date-m<6e3?a(e.target.src,1):m=0);
});
}
}
var i=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),n=e("biz_common/utils/url/parse.js"),d=e("appmsg/log.js"),s=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/mmversion.js");
return e("appmsg/cdn_img_lib.js"),o;
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/comment_utils.js","pages/create_txv.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","biz_common/dom/class.js","appmsg/img_copyright_tpl.html.js","appmsg/appmsgext.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","biz_wap/utils/mmversion.js","pages/version4video.js","appmsg/like.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js"],function(e,t,r,i){
"use strict";
function n(){
for(var t=document.getElementsByTagName("iframe"),r=[],i=0,n=t.length;n>i;++i)r.push(t[i]);
t=null;
var d=document.getElementById("js_content"),o=d.offsetWidth,s=o/u.getRatio();
window.logs.video_cnt=0;
for(var i=0,n=r.length;n>i;++i){
var _=r[i],m=_.getAttribute("data-src")||"",c=_.getAttribute("src")||m;
if(c){
var l=e("pages/version4video.js");
if(0==c.indexOf("http://z.weishi.com/weixin/player.html"))c=c.replace(/width=\d+/g,"width="+o),
c=c.replace(/height=\d+/g,"height="+s),_.width=o,_.height=s,_.style.setProperty&&(_.style.setProperty("width",o+"px","important"),
_.style.setProperty("height",s+"px","important")),_.setAttribute("src",c),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(c)){
if(!l.isShowMpVideo()){
var w;
w=a(j?_:_),w&&N.push(w),"function"==typeof window.__addIdKeyReport&&(window.__addIdKeyReport("28307",10),
l.device.inWechat&&l.device.inWindowWechat?window.__addIdKeyReport("110644",0):l.device.inWechat&&l.device.inMacWechat&&window.__addIdKeyReport("110644",1));
}
window.logs.video_cnt++;
continue;
}
}
}
N.length>0&&"function"==typeof window.__getVideoWh&&k.on(window,"resize",function(){
try{
for(var e=0,t=N.length;t>e;e++){
var r=N[e],i=r.playerObj;
if(i){
var n=window.__getVideoWh(r);
r.style.width=n.w+"px",r.style.height=n.h+"px",i.resize({
width:n.vw,
height:n.vh
});
}
}
}catch(a){}
},!1);
}
function a(e){
var t=e.getAttribute("data-src")||e.getAttribute("src"),r=g.getQuery("vid",t),i=e.getAttribute("data-vw"),n=e.getAttribute("data-vh"),a=e.getAttribute("data-ratio"),o=document.createElement("span");
o.setAttribute("data-ratio",a),o.id="js_tx_video_container_"+Math.random(),o.className="js_tx_video_container",
o.style.cssText=e.style.cssText,o.style.display="none";
var s=e.parentNode;
return s?(s.lastChild===e?s.appendChild(o):s.insertBefore(o,e.nextSibling),p.createTxVideo({
containerId:o.id,
vid:r,
width:i,
height:n,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(e){
o.playerObj=e.player,d(o,r),o.style.display="block";
},
onError:function(){}
}),s.removeChild(e),o):void 0;
}
function d(e,t){
if(t&&e){
var r=e.parentNode;
if(r){
for(var i=[],n=0,a=r.children.length;a>n;n++){
var d=r.children[n];
d.className.indexOf("img_loading")>=0&&d.getAttribute("data-vid")==t&&i.push(d);
}
for(var n=0,a=i.length;a>n;n++)r.removeChild(i[n]);
e.style.display="block";
}
}
}
function o(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},r=e.img_copy_info.list,i=window.__appmsgCgiData.copyright_stat,n=window.__appmsgCgiData.source_biz,a=0,d=r.length;d>a;a++){
var o=r[a];
if(2==o.type){
if(2==i&&n==o.source_uin)continue;
t[o.img_url]={
source_nickname:o.source_nickname,
source_uin:o.source_uin,
source_encode_biz:o.source_encode_biz||""
};
}
}
for(var s=document.getElementsByTagName("img"),a=0,d=s.length;d>a;a++){
var o=s[a],_=o.getAttribute("data-src")||o.getAttribute("data-backsrc")||"";
if(t[_]){
var m=document.createElement("div");
m.innerHTML=E.tmpl(v,t[_]);
{
var c=m.children[0],l=o.parentNode,w=l.insertBefore(c,o),p=w.children[0];
(function(e,t){
k.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(I.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}),!1);
});
})(t[_],p);
}
w.insertBefore(o,p);
}
}
}
}
function s(t){
var r=t.appmsgstat||{};
if(window.appmsgstat||(window.appmsgstat=r),r.show){
var n=document.getElementById("js_read_area3"),a=document.getElementById("like3"),d=document.getElementById("likeNum3"),o=document.getElementById("readNum3");
if(!(n&&a&&d&&o))return;
var s=e("appmsg/like.js");
r.liked=window.is_temp_url?window.liked:r.liked,s.showLikeNum({
show:!0,
likeAreaDom:a,
likeNumDom:d,
liked:r.liked,
className:"praised",
likeAreaDisplayValue:"inline",
likeNum:window.is_temp_url?window.like_num:r.like_num
}),s.showReadNum({
show:!0,
readAreaDom:n,
readNumDom:o,
readAreaDisplayValue:"block",
readNum:window.is_temp_url?window.read_num:r.read_num
}),s.initLikeEvent({
likeAreaDom:a,
likeNumDom:d,
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
t.share_redirect_url&&_&&(window._share_redirect_url=t.share_redirect_url,_.innerHTML=E.tmpl(f,{
url:t.share_redirect_url
})),w.initCommentByExtData(t),window._has_comment||0!=window.adDatas.num||window._share_redirect_url||window.is_temp_url||h.addClass(document.body,"rich_media_empty_extra");
var c=document.getElementById("js_author_name");
t.reward_entrance_enable_for_preview||(-1!=b.indexOf("WindowsWechat")||-1==b.indexOf("MicroMessenger")||A.isInMiniProgram?A.isInMiniProgram&&c&&x.removeClass(c,"rich_media_meta_link"):(l=e("appmsg/reward_entry.js"),
l.handle(t.reward,m()),c&&t.reward.rewardsn&&t.reward.timestamp&&(c.setAttribute("data-rewardsn",t.reward.rewardsn),
c.setAttribute("data-timestamp",t.reward.timestamp),c.setAttribute("data-canreward",t.reward.can_reward)),
c&&!t.reward.can_reward&&x.removeClass(c,"rich_media_meta_link"))),1!=t.reward_entrance_enable_for_preview||A.isInMiniProgram?(1==t.reward_entrance_enable_for_preview||A.isInMiniProgram)&&c&&x.removeClass(c,"rich_media_meta_link"):author_id?(document.getElementById("js_preview_reward_author")&&(document.getElementById("js_preview_reward_author").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_author_wording")&&(document.getElementById("js_preview_reward_author_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_author_wording").style.display="block"),
t.reward_author_head&&document.getElementById("js_preview_reward_author_avatar")&&(document.getElementById("js_preview_reward_author_head").setAttribute("src",t.reward_author_head),
document.getElementById("js_preview_reward_author_avatar").style.display="block"),
document.getElementById("js_preview_reward_link_text").innerText="喜欢作者",k.on(document.getElementById("js_preview_reward_author_link"),"tap",function(e){
e.preventDefault(),i("预览状态下无法操作。");
})):A.isAndroid&&(document.getElementById("js_preview_reward_author")&&(document.getElementById("js_preview_reward_author").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_author_wording")&&(document.getElementById("js_preview_reward_author_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_author_wording").style.display="block"),
document.getElementById("js_preview_reward_author_name").style.display="none",k.on(document.getElementById("js_preview_reward_author_link"),"tap",function(e){
e.preventDefault(),i("预览状态下无法操作。");
}));
var p=document.getElementById("js_cmt_container");
1==t.comment_entrance_enable_for_preview&&window.is_temp_url&&p&&(p.style.display="block"),
t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
k.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),i("预览状态下无法操作。");
})),t.comment_enabled&&p&&(p.style.display="block");
}
function _(){
var t=B.checkNeedAds(),r=t.is_need_ad,i=t.both_ad,n=-1!=location.href.indexOf("mock_ad=");
n&&(t.is_need_ad=r=1),z("[Appmsg] start get asycn data, is_need_ad:"+r);
var a=0;
y.getData({
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
version:window.clientversion,
is_need_ticket:N&&N.length>0?1:0,
is_need_ad:r,
comment_id:comment_id,
is_need_reward:is_need_reward,
both_ad:i,
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
onSuccess:function(r){
if(console.log("appmsgext success",r),r)try{
if(n){
var i=e("a/testdata.js");
r.advertisement_info=i.getAd(),r.advertisement_num=r.advertisement_info.length;
}
if(r&&r.base_resp&&r.base_resp.wxtoken&&(window.wxtoken=r.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
o(r),r.ret)return;
B.afterGetAdData(t,r),window.wx_user_can_reward=r.user_can_reward,s({
appmsgstat:r.appmsgstat,
comment_enabled:r.comment_enabled,
comment_count:r.comment_count,
friend_comment_enabled:r.friend_comment_enabled,
only_fans_can_comment:r.only_fans_can_comment,
reward:{
reward_total:r.reward_total_count,
reward_head_imgs:r.reward_head_imgs||[],
can_reward:r.can_reward,
user_can_reward:r.user_can_reward,
reward_qrcode_ticket:r.reward_qrcode_ticket,
timestamp:r.timestamp,
reward_author_head:r.reward_author_head,
rewardsn:r.rewardsn
},
reward_entrance_enable_for_preview:r.reward_entrance_enable_for_preview,
reward_wording:r.reward_wording,
reward_author_head:r.reward_author_head,
comment_entrance_enable_for_preview:r.comment_entrance_enable_for_preview,
share_redirect_url:r.share_redirect_url||"",
logo_url:r.logo_url,
nick_name:r.nick_name,
is_fans:r.is_fans
});
}catch(a){
z("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var d=new Image;
return d.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(a.toString())+"&r="+Math.random()).substr(0,1024),
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
return k.on(window,"resize",function(){
c(),l&&l.render(m());
}),c();
}
function c(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(r){}
var i=30,n=36,a=Math.floor(.9*(e-i)/n);
return window.new_appmsg&&(a=Math.floor(.8*(e-60)/n)),document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=a*n+"px"),
m=function(){
return a;
},a;
}
e("biz_common/utils/string/html.js");
var l,w=e("appmsg/comment_utils.js"),p=e("pages/create_txv.js"),u=e("pages/video_ctrl.js"),g=e("biz_common/utils/url/parse.js"),h=e("biz_common/dom/class.js"),v=e("appmsg/img_copyright_tpl.html.js"),y=e("appmsg/appmsgext.js"),f=e("appmsg/share_tpl.html.js"),b=navigator.userAgent,j=-1!=b.indexOf("MicroMessenger"),k=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),x=(e("biz_wap/utils/ajax.js"),e("biz_common/dom/class.js")),I=e("biz_wap/jsapi/core.js"),E=e("biz_common/tmpl.js"),z=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),B=(e("rt/appmsg/getappmsgext.rt.js"),e("a/a.js")),A=e("biz_wap/utils/mmversion.js"),N=[];
n(),_();
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
});define("biz_wap/utils/ajax.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_common/utils/respTypes.js","biz_wap/jsapi/core.js"],function(require,exports,module,alert){
"use strict";
function logClientLog(e){
try{
var t;
/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?t="writeLog":/(Android)/i.test(navigator.userAgent)&&(t="log"),
t&&doLog(t,e);
}catch(o){
throw console.error(o),o;
}
}
function doLog(e,t){
var o,r,n={};
o=top!=window?top.window:window;
try{
r=o.WeixinJSBridge,n=o.document;
}catch(s){}
e&&r&&r.invoke?r.invoke(e,{
level:"info",
msg:"[WechatFe][ajax]"+t
}):setTimeout(function(){
n.addEventListener?n.addEventListener("WeixinJSBridgeReady",function(){
doLog(e,t);
},!1):n.attachEvent&&(n.attachEvent("WeixinJSBridgeReady",function(){
doLog(e,t);
}),n.attachEvent("onWeixinJSBridgeReady",function(){
doLog(e,t);
}));
},0);
}
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
var c,d="idkey="+e+"_"+t+"_1"+r+"&r="+Math.random();
if(window.ActiveXObject)try{
c=new ActiveXObject("Msxml2.XMLHTTP");
}catch(p){
try{
c=new ActiveXObject("Microsoft.XMLHTTP");
}catch(u){
c=!1;
}
}else window.XMLHttpRequest&&(c=new XMLHttpRequest);
c&&(c.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),c.setRequestHeader("cache-control","no-cache"),
c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.send(d));
}
function Ajax(obj){
var type=(obj.type||"GET").toUpperCase(),url;
url=obj.notJoinUrl?obj.url:joinUrl(obj.url),"html"==obj.f&&(url=url.replace("&f=json",""));
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
function Ajax_wx(e){
console.log(e),-1==e.url.indexOf("mp.weixin.qq.com")&&(e.url="/"!=e.url.charAt(0)?"https://mp.weixin.qq.com/"+e.url:"https://mp.weixin.qq.com"+e.url),
"html"!=e.f&&(-1==e.url.indexOf("?")?e.url+="?f=json":(-1==e.url.indexOf("?f=json")||-1==e.url.indexOf("&f=json"))&&(e.url+="&f=json"));
var t=null;
if("object"==typeof e.data){
var o=e.data;
t=[];
for(var r in o)o.hasOwnProperty(r)&&t.push(r+"="+encodeURIComponent(o[r]));
t=t.join("&");
}else t="string"==typeof e.data?e.data:null;
console.log("before request");
var n=1,s=function(e,t){
return JSAPI.invoke("request",{
url:e.url,
method:e.type,
data:t,
header:{
Cookie:document.cookie
}
},function(o){
if(console.log("jsapiRequest",o.err_msg),o.err_msg.indexOf(":ok")>-1){
var r={};
if(o.data){
console.log(e.dataType),console.log(e);
try{
r="json"==e.dataType?JSON.parse(o.data):o.data;
}catch(a){
return console.error(a),void(e.error&&e.error({}));
}
}
var i={};
try{
i=JSON.parse(o.data);
}catch(a){}
i.base_resp&&"-3"==i.base_resp.ret&&n>0?(n--,JSAPI.invoke("updatePageAuth",{},function(o){
console.log("updatePageAuth",o),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_3_1",
o&&o.err_msg&&o.err_msg.indexOf(":ok")>-1?(window.pass_ticket=encodeURIComponent(Url.getQuery("pass_ticket",o.fullUrl).html(!1).replace(/\s/g,"+")),
e.pass_ticket&&(e.pass_ticket=window.pass_ticket),s(e,t),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_4_1"):e.success&&e.success(r);
})):e.success&&e.success(r);
}else o.err_msg.indexOf("no permission")>-1?Ajax(e):e.error&&e.error({});
e.complete&&e.complete();
});
};
return s(e,t);
}
require("biz_common/utils/string/html.js");
var Url=require("biz_common/utils/url/parse.js"),RespTypes=require("biz_common/utils/respTypes.js"),JSAPI=require("biz_wap/jsapi/core.js"),isx5=-1!=navigator.userAgent.indexOf("TBS/"),__moon_report=window.__moon_report||function(){},MOON_AJAX_SUCCESS_OFFSET=3,MOON_AJAX_NETWORK_OFFSET=4,MOON_AJAX_ERROR_OFFSET=5,MOON_AJAX_TIMEOUT_OFFSET=6,MOON_AJAX_COMPLETE_OFFSET=7,doc={},isAcrossOrigin=!1;
try{
doc=top.window.document;
}catch(e){
isAcrossOrigin=!0;
}
return window.__second_open__||!isAcrossOrigin&&top.window.__second_open__?Ajax_wx:Ajax;
});define("appmsg/index.js",["biz_common/tmpl.js","cps/tpl/banner_tpl.html.js","cps/tpl/card_tpl.html.js","cps/tpl/list_tpl.html.js","biz_common/utils/string/html.js","appmsg/weapp_common.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/moment.js","appmsg/appmsg_report.js","biz_common/utils/url/parse.js","page/appmsg_new/combo.css","page/appmsg_new/not_in_mm.css","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/copyright_report.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/product.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/autoread.js","appmsg/voicemsg.js","appmsg/weproduct.js","appmsg/weapp.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport_without_localstorage.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e,t,o,n){
"use strict";
function i(e){
for(var t=window.location.search,o=t.substring(1,t.length).split("&"),n=0;n<o.length;n++){
var i=o[n].split("=");
if(i[0].toUpperCase()===e.toUpperCase())return i[1];
}
return"";
}
function a(){
function t(e){
if(e&&0!=e.length){
for(var t={
batch_no:I.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
total:e.length
},o=0;o<e.length;o++){
var n=e[o],i=o+1;
for(var a in n)n.hasOwnProperty(a)&&(t[a+""+i]=n[a]);
}
w({
url:"/mp/productreport?",
type:"POST",
data:t,
dataType:"json",
async:!0
});
}
}
function o(){
D&&clearTimeout(D),D=setTimeout(function(){
try{
D=null;
for(var e=0;e<C.length;e++){
var o=C[e],n=g.attr(o,"data-showed");
if("no"==n){
var i=o.getElementsByClassName("js_product_loop_content");
if(i.length>0){
i=i[0];
var a=i.getBoundingClientRect(),r=a.height||a.bottom-a.top,s=window.innerHeight||document.documentElement.clientHeight;
if(r>0&&a.top<s&&a.bottom>0){
o.setAttribute("data-showed","yes");
var d=i.getAttribute("data-pid");
d&&t([{
wxa_appid:i.getAttribute("data-wxaappid"),
pid:d,
type:3,
absolute_order:e+1,
appid:i.getAttribute("data-appid")||"",
templateid:i.getAttribute("data-templateid")||"",
relative_order:1*i.getAttribute("data-order"),
packid:i.getAttribute("data-packid")||""
}]);
}
}
}
}
}catch(p){}
},100);
}
function a(e){
try{
for(var n=window.pageYOffset||document.documentElement.scrollTop,a=window.innerHeight||document.documentElement.clientHeight,m=0;m<C.length;m+=q){
var l=C[m];
if(!(l.offsetTop>n+a+100)){
var _=g.attr(l,"data-cpsstatus");
if("hide"==_){
l.setAttribute("data-cpsstatus","loading");
for(var u=""+m,f=1,h=m+1;h<C.length&&m+q>h;h++)u=u+"%2c"+h,f++;
var y=Math.ceil(1e7*Math.random());
if(""!==i("mockcps"))var A="/mp/cps_product_info?biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&cpslist="+u+"&sn="+window.sn+"&mockcps="+i("mockcps");else var A="/mp/cps_product_info?biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&cpslist="+u+"&sn="+window.sn+"&istempurl="+(window.is_temp_url||0)+"&random="+y;
!function(e,n,i){
w({
url:n,
type:"GET",
dataType:"json",
async:!0,
error:function(){
try{
window.__addIdKeyReport("64469","18",i);
}catch(e){}
},
success:function(e){
try{
window.__addIdKeyReport("64469","16",e.product_list.length),e.product_list.length<i&&window.__addIdKeyReport("64469","18",i-e.product_list.length);
for(var n=0;n<e.product_list.length;n++){
e.product_list[n].data.cps_isready=!0,e.product_list[n].data.pid_type=e.product_list[n].data.pid_type||e.product_list[n].attr.pid_type;
var a=C[e.product_list[n].index],m=e.product_list[n].template_id;
"list"==m?a.innerHTML=r.tmpl(p,e.product_list[n].data):"banner"==m?a.innerHTML=r.tmpl(s,e.product_list[n].data):"card"==m&&(a.innerHTML=r.tmpl(d,e.product_list[n].data)),
e.product_list[n].weapp_username&&(e.product_list[n].attr.weapp_username=e.product_list[n].weapp_username),
e.product_list[n].weapp_version&&(e.product_list[n].attr.weapp_version=e.product_list[n].weapp_version),
a.setAttribute("data-cpsstatus","complete");
for(var l=a.getElementsByClassName("js_product_loop_content"),_=0;_<l.length;_++)for(var w in e.product_list[n].attr)l[_].setAttribute("data-"+w,e.product_list[n].attr[w]);
for(var u=a.getElementsByTagName("img"),_=0;_<u.length;_++)u[_].src=g.attr(u[_],"data-src");
!function(e,o){
v.on(e,"tap",".js_product_loop_content",function(e){
try{
var n=e.delegatedTarget,i=n.getAttribute("data-wxaappid"),a=n.getAttribute("data-wxapath"),r=n.getAttribute("data-pid"),s=n.getAttribute("data-appid"),d=n.getAttribute("data-cpspackage"),p=Math.floor((new Date).getTime()/1e3)+5184e3,m=n.getAttribute("data-weapp_username"),l=n.getAttribute("data-weapp_version");
c.jumpUrl({
cps_weapp_username:m,
cps_weapp_version:l,
privateExtraData:{
cookies:"cps_package="+encodeURIComponent(d)+"; expires="+p+"; busid=mmbiz_ad_cps; domain=*; spread=*"
},
sourceAppId:s,
appid:i,
path:a,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(r),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&r&&t([{
wxa_appid:i,
pid:r,
type:4,
absolute_order:o+1,
appid:n.getAttribute("data-appid")||"",
templateid:n.getAttribute("data-templateid")||"",
relative_order:1*n.getAttribute("data-order"),
packid:n.getAttribute("data-packid")||""
}]);
}
});
}catch(e){}
return!1;
});
}(a,e.product_list[n].index);
}
o();
}catch(f){
window.__addIdKeyReport("64469","18",e.product_list.length);
}
}
});
}(u,A,f);
}
}
}
}catch(e){
console.log(e);
}
}
function x(e){
try{
L&&clearTimeout(L),L=setTimeout(function(){
a(e);
},300);
}catch(e){}
}
function E(){
var e=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
e>=40&&0==B?(console.log("__timelogs__: "+JSON.stringify(window.__timelogs__)),document.title=window.title,
B=!0):40>e&&1==B&&(console.log("__timelogs__: "+JSON.stringify(window.__timelogs__)),
document.title="",B=!1);
}
function T(e,t){
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
function O(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var t=e.timing;
_("[Appmsg] dns:"+(t.domainLookupEnd-t.domainLookupStart)+"^^^ ssl:"+(0==t.secureConnectionStart?0:t.connectEnd-t.secureConnectionStart)+"^^^ tcp:"+(t.connectEnd-t.connectStart)+"^^^ request:"+(t.responseStart-t.requestStart)+"^^^ getPackageTime:"+(t.responseEnd-t.responseStart)+"^^^ domCententLoaded:"+(t.domContentLoadedEventStart-t.domLoading)+"^^^ domComplete:"+(t.domComplete-t.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-t.navigationStart)+"^^^ interactiveTime:"+(page_endtime-t.navigationStart))+"^^^ ua:"+window.navigator.userAgent,
setTimeout(function(){
t.loadEventEnd&&_("[Appmsg] onload:"+(t.loadEventEnd-t.loadEventStart));
},100);
}
"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
}),""==document.getElementById("js_content").innerHTML.trim()&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_94_1");
var o=Math.random();
.001>o&&document.getElementById("js_read_area3")&&document.getElementById("js_read_area3").innerText&&document.getElementById("js_read_area3").innerText.indexOf("Pageview")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_95_1"),
window.__wxjs_is_wkwebview&&window.__addIdKeyReport("28307",67);
}
try{
var C=document.getElementsByTagName("mpcps");
window.__addIdKeyReport("64469","15",C.length);
for(var S=0;S<C.length;S++){
C[S].setAttribute("data-cpsstatus","hide"),C[S].setAttribute("data-showed","no");
var N={
cps_isready:!1,
cps_state:"",
pid_type:"",
img_url:"",
title:"",
desc:"",
source_name:"",
source_logo_url:"",
is_ad:1
},K=g.attr(C[S],"data-templateid");
"list"==K?C[S].innerHTML=r.tmpl(p,N):"banner"==K?C[S].innerHTML=r.tmpl(s,N):"card"==K&&(C[S].innerHTML=r.tmpl(d,N));
}
}catch(M){
console.log(M);
}
var L,D=null;
o(),v.on(window,"scroll",o),a(),v.on(window,"scroll",x),window.is_new_msg&&-1!=navigator.userAgent.indexOf("MicroMessenger")&&(window.title&&(window.title=window.title.replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&")),
console.log("hd_head_img:"+hd_head_img),A.invoke("currentMpInfo",{
brandName:window.title,
brandIcon:hd_head_img.replace(/\/0$/,"/132")
},function(e){
console.log("currentMpInfo res: "+e);
}),v.on(window,"load",function(){
document.title="",B=!1,E();
}),window.onscroll=E,window.addEventListener("pageshow",E));
var P=document.getElementsByTagName("body");
if(!P||!P[0])return!1;
P=P[0],h.isInMiniProgram&&(document.getElementById("js_name")&&l.addClass(document.getElementById("js_name"),"tips_global_primary"),
document.getElementsByClassName("account_nickname_inner").length&&l.addClass(document.getElementsByClassName("account_nickname_inner")[0],"tips_global_primary"),
document.getElementById("js_share_author")&&l.addClass(document.getElementById("js_share_author"),"tips_global_primary")),
function(){
var e=document.getElementById("js_hotspot_area"),t=0===window.hotspotInfoList.length,o=function(n){
if(!t){
var i=(window.innerHeight||document.documentElement.clientHeight)+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop);
e.offsetTop<i?(t=!0,v.off(window,"scroll",o),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=59977_15_1",
j.hotspotReport({
hotspotjson:JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})
})):"function"==typeof n&&n();
}
};
o(function(){
v.on(window,"scroll",o);
});
}();
var W=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&location.href&&W.test(location.href))&&!window.isSg)throw new Error("in iframe");
}catch(M){
var U="",H=new Image;
H.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+U+"&r="+Math.random()).substr(0,1024);
}
if(window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&!window.__second_open__){
var Q=-1!=location.href.indexOf("?")?"&":"?";
location.replace(location.href.replace(/#rd$/,Q+"rd2werd=1#wechat_redirect"));
}
var J=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var G=!h.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
e("appmsg/share.js");
var Y=b(1e3*parseInt(top.window.modify_time)),V=Y.format("YYYY-MM-DD"),F=document.getElementById("js_modify_time");
if(F&&(F.innerHTML=V),window.isSg||"mp.weixin.qq.com"==location.host){
var $=e("biz_common/log/jserr.js");
$({
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
var X=-1!=navigator.userAgent.indexOf("TBS/"),Z=function(e,t){
T(e,function(e,o){
if(window.logs.webplog[e]=o?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
X&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var a=n.lossy&n.lossless&n.alpha;
t(!!a);
}
});
},et=function(e){
for(var t=document.getElementsByTagName("img"),o=!1,n=0,i=t.length;i>n;n++){
var a=t[n].getAttribute("data-src");
a&&a.isGif()&&(o=!0);
}
(R||navigator.userAgent.indexOf("Br_trunk")>-1)&&o&&h.isIOS&&h.gtVersion("6.5.13",!0)?(console.log("当前版本可以启用img代理"),
A.invoke("imageProxyInit",{},function(t){
console.log(t),t.err_msg.indexOf(":ok")>-1?(k=t.serverUrl,window.__addIdKeyReport("28307",117)):t.err_msg.indexOf(":fail")>-1&&window.__addIdKeyReport("28307",118),
e();
})):e();
},tt=function(e){
Z("lossy",e),Z("lossless",e),Z("alpha",e),Z("animation",e);
};
window.webp=!1,et(function(){
tt(function(t){
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
window.__addIdKeyReport("28307",66),i(e),o(e);
var n=e.__retryload;
return n=0,t=t.https2http(),e.__retryload=n,e.src=J.addParam(t,"retryload",n,!0),
!1;
};
v.on(e,"click",n);
}
}
}
function i(e){
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
var r=a.getAttribute("data-src");
r&&(r.isCDN()&&(r=r.imgChange640(),t&&(r=J.addParam(r,"tp","webp",!0)),r=J.addParam(r,"wxfrom","5",!0),
is_https_res||z?r=r.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(r=r.https2http())),
setTimeout(function(){
a.onload=function(){
u(a,"height","auto","important"),u(a,"visibility","visible","important");
},a.setAttribute("src",r);
},0),window.logs.img.read[r]=!0,window.logs.img.load[r]=!0,a.removeAttribute("data-src"));
}
var s=e("biz_wap/ui/lazyload_img.js"),d=1;
window.logs.outer_pic=0;
for(var p=document.getElementsByTagName("img"),c=0,m=p.length;m>c;c++){
{
var w=p[c].getAttribute("data-src");
p[c].getAttribute("src");
}
w&&w.isGif()&&p[c].className.indexOf("__bg_gif")<0&&(p[c].className+=" __bg_gif");
}
for(var g=document.getElementsByClassName("__bg_gif"),c=0,m=g.length;m>c;++c)g[c].setAttribute("data-order",c);
var f=function(e){
try{
var t=e,o=t.getAttribute("data-src");
if(null==o.match(/^https\:\/\/mmbiz\.qpic\.cn/)&&null==o.match(/^http\:\/\/mmbiz\.qpic\.cn/))return;
var n=t.parentNode;
if(l.hasClass(n,"js_jump_icon"))return;
for(var i=!1;n.tagName&&"body"!=n.tagName.toLowerCase();){
if("a"==n.tagName.toLowerCase()){
var a=n.getAttribute("href")||"";
if(null!=a.match(/^http/)){
console.log("hrefmatch",a),i=!0;
break;
}
break;
}
n=n.parentNode;
}
if(!i)return;
var r=document.createElement("span"),s=getComputedStyle(t);
"static"!=s.positon&&(r.style.position=s.positon),r.style.left=s.left,r.style.top=s.top,
r.style.right=s.right,r.style.bottom=s.bottom,r.style.margin=s.margin,l.addClass(r,"js_jump_icon"),
l.addClass(r,"h5_image_link"),t.style.position="static",t.style.margin="0px",t.parentNode.insertBefore(r,t),
r.appendChild(t),window.__addIdKeyReport("111535",0);
}catch(d){}
},h=function(e){
try{
var t=e.childNodes,o=getComputedStyle(e);
(o.backgroundImage.match(/https\:\/\/mmbiz\.qpic\.cn/)||o.backgroundImage.match(/http\:\/\/mmbiz\.qpic\.cn/))&&window.__addIdKeyReport("111535",2);
for(var n=0;n<t.length;n++)"a"!=t[n].tagName.toLowerCase()&&h(t[n]);
}catch(i){}
};
try{
for(var y=document.getElementsByTagName("a"),A=0;A<y.length;A++){
var b=y.item(A),j=b.getAttribute("href")||"";
null!=j.match(/^http/)&&h(b);
}
}catch(I){}
new s({
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
var n,i=window.navigator.userAgent,a=/TBS\/([\d\.]+)/i,r=i.match(a);
r&&r[1]&&(n=parseInt(r[1]));
var s,d=/XWEB\/([\d\.]+)/i,p=i.match(d);
p&&p[1]&&(s=parseInt(p[1]));
var c=1e3,m=window.user_uin||0,l=0!==m&&Math.floor(m/100)%1e3<c;
l&&(n>=43305||s>=16)&&o.isGif()?(o=J.addParam(o,"tp","wxpic",!0),window.__addIdKeyReport("28307",91)):window.webp&&(o=J.addParam(o,"tp","webp",!0),
window.__addIdKeyReport("28307",84)),o=J.addParam(o,"wxfrom","5",!0),is_https_res||z?(o=o.http2https(),
window.__addIdKeyReport("28307",77)):("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(o=o.https2http(),
window.__addIdKeyReport("28307",70));
}else try{
var a=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
a.test(t)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(w){}
var g=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
o=o.replace(g,"http://m.qpic.cn"),o=J.addParam(o,"wx_lazy","1",!0);
return k&&o.isGif()&&(window.__addIdKeyReport("28307",106),o=J.addParam(o,"tp","wxpic",!0),
o=k+"hevc?url="+encodeURIComponent(o)+"&type=gif"),window.logs.img.load[o]=!0,_("[Appmsg] image_load_event_change_src. originsrc:"+t+"  ^^^ newsrc : "+o),
e.start_load_time=+new Date,o;
},
onerror:function(e,t){
var o=t?t.__retryload||0:0;
if(1==o&&n(t),e&&!(o>d)){
if(!e.isCDN()){
if(!k)return;
if(-1==e.indexOf(k))return;
}
var i=0==e.indexOf("https://")?7:0;
if(window.__addIdKeyReport("28307",72+i),window.__addIdKeyReport("28307",75+1*o+i),
e.isWxpic()?(window.__addIdKeyReport("28307",93),window.__addIdKeyReport("28307",96+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",86),
window.__addIdKeyReport("28307",89+1*o)),k&&e.indexOf(k)>-1&&window.__addIdKeyReport("28307",108),
d>o){
if(o++,t.__retryload=o,1==o&&e.indexOf("http://")>-1?(e=e.http2https(),window.__addIdKeyReport("28307",60),
window.__addIdKeyReport("28307",77)):1==o&&e.indexOf("https://")>-1&&(window.__addIdKeyReport("28307",61),
window.__addIdKeyReport("28307",77)),k&&e.indexOf(k)>-1){
var a=e.split("hevc?url=")[1];
a=a.split("&type")[0],a=decodeURIComponent(a),a=a.replace("tp=wxpic",""),e=a.https2http();
}
t.start_load_time=+new Date,t.src=J.addParam(e,"retryload",o,!0);
}
window.__has_imgfailed||(window.__has_imgfailed=!0,window.__addIdKeyReport("28307",65)),
_("[Appmsg] image_load_event_on_error. src:"+e),t.setAttribute("data-fail",1);
try{
if("[object Array]"==Object.prototype.toString.call(t.lazyLoadOnerror))for(var r=0,s=t.lazyLoadOnerror.length;s>r;r++)"function"==typeof t.lazyLoadOnerror[r]&&t.lazyLoadOnerror[r].call(t);
}catch(p){}
var c=10;
/tp\=webp/.test(e)&&(c=11);
var m=new Image;
m.src="http://mp.weixin.qq.com/mp/jsreport?key="+c+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,t){
i(t),t.gray&&!t.loadGif&&((t.width||t.naturalWidth)<120||(t.height||t.naturalHeight)<120?t.autoTap&&t.autoTap():t.span&&t.span.children&&t.span.children.item(0)&&(t.span.children.item(0).style.display=""));
var o=t?t.__retryload||0:0;
if(!(o>d)){
_("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+o),
t.setAttribute("data-fail",0),f(t);
try{
if("[object Array]"==Object.prototype.toString.call(t.lazyLoadOnload))for(var n=0,a=t.lazyLoadOnload.length;a>n;n++)"function"==typeof t.lazyLoadOnload[n]&&t.lazyLoadOnload[n].call(t);
}catch(r){}
var s=0==e.indexOf("https://")?7:0;
window.__addIdKeyReport("28307",71+s),window.__addIdKeyReport("28307",73+1*o+s),
e.isWxpic()?(window.__addIdKeyReport("28307",92),window.__addIdKeyReport("28307",94+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",85),
window.__addIdKeyReport("28307",87+1*o)),k&&e.indexOf(k)>-1&&window.__addIdKeyReport("28307",107),
window.__has_imgsucceed||(window.__has_imgsucceed=!0,window.__addIdKeyReport("28307",64)),
1==o&&e.indexOf("http://")>-1&&window.__addIdKeyReport("28307",50),1==o&&e.indexOf("https://")>-1&&window.__addIdKeyReport("28307",52);
var p=Math.random(),c=+new Date-t.start_load_time;
c&&0==e.indexOf("https://")&&.5>p?(window.__addIdKeyReport("27822",121,c),window.__addIdKeyReport("27822",122)):c&&5e-4>p&&(window.__addIdKeyReport("27822",124,c),
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
var ot=e("appmsg/copyright_report.js");
!function(){
var e=document.getElementById("profileBt"),t=document.getElementById("copyright_info"),o=[];
if(e){
var n="57";
"26"==window.source&&(n="95"),"28"==window.source&&(n="96"),"29"==window.source&&(n="39"),
"15"==window.source&&(n="121"),o.push({
dom:e,
username:user_name_new||user_name,
profileReportInfo:window.profileReportInfo||"",
scene:n
});
}
t&&source_encode_biz&&o.push({
dom:t,
source_encode_biz:source_encode_biz,
scene:"110"
});
var i=document.getElementById("js_share_headimg");
i&&o.push({
dom:i,
username:source_username,
scene:0
});
var a=document.getElementById("js_share_author");
a&&o.push({
dom:a,
username:source_username,
scene:"0"
});
for(var r=0,s=o.length;s>r;r++)!function(e){
v.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
ot.card_click_report({
scene:"0"
});
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")?location.href=t:A.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
});
}else{
if(_("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
j.profileReport({
hotspotjson:JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})
}),profileReportInfo){
var o=String(profileReportInfo).split("_");
3==o.length&&w({
url:"/mp/ad_biz_info?action=report&__biz="+window.biz+"&report_type=2&aid="+o[1]+"&tid="+o[2],
type:"GET",
dataType:"json",
async:!0,
success:function(){}
});
}
h.isInMiniProgram||A.invoke("profile",{
username:e.username,
profileReportInfo:e.profileReportInfo||"",
scene:e.scene+""
},function(t){
window.__addIdKeyReport("28307","1"),_("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", profileReportInfo:"+e.profileReportInfo+", res.err_msg:"+t.err_msg);
});
}
return!1;
}),h.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(o[r]);
}(),function(){
location.href.match(/fontScale=\d+/)&&h.isIOS&&!window.__second_open__&&A.on("menu:setfont",function(e){
for(var t in e)console.log("fontScale:"+t+":"+e[t]);
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
l.addClass(document.getElementsByTagName("body").item(0),"appmsg_skin_fontscale_"+e.fontSize);
});
}(),function(){
function e(){
if("hidden"in document)return"hidden";
for(var e=["webkit","moz","ms","o"],t=0;t<e.length;t++)return e[t]+"Hidden"in document,
e[t]+"Hidden";
return null;
}
function t(){
var t=e();
return t?document[t]:!1;
}
function o(){
if(t()){
var e=window._players;
if(e)for(var o in e){
var n=e[o];
n.isPlay()&&(window.playPlayer=n,n.hideLoading(),n.pause(),n._trigger("userpause"),
n.hideControllBar(!0),n._showPlayControllBar());
}
}else window.playPlayer&&(window.playPlayer.__forcePause=!1,window.playPlayer.showLoading(),
window.playPlayer.play(),window.playPlayer._trigger("userplay"));
}
document.webkitVisibilityState?document.addEventListener("webkitvisibilitychange",o,!1):document.msVisibilityState?document.addEventListener("msvisibilitychange",o,!1):document.visibilityState&&document.addEventListener("visibilitychange",o,!1);
}();
try{
var nt=document.getElementById("js_author_name");
if(nt){
var it="";
v.on(nt,"click",function(){
return l.hasClass(nt,"rich_media_meta_link")?window.is_temp_url?(n("预览状态下不能操作"),
!1):nt.getAttribute("data-rewardsn")?1!=nt.getAttribute("data-canreward")?!1:(it="https://mp.weixin.qq.com/mp/author?action=show&author_id="+author_id+"&rewardsn="+nt.getAttribute("data-rewardsn")+"&timestamp="+nt.getAttribute("data-timestamp")+"&__biz="+window.biz+"&appmsgid="+window.appmsgid+"&idx="+window.idx+"&scene=142&rscene=129#wechat_redirect",
h.isInMiniProgram?!1:(-1!=navigator.userAgent.indexOf("MicroMessenger")&&(h.isIOS||h.isAndroid||h.isWp)?(window.__addIdKeyReport("110809","1"),
A.invoke("openUrlWithExtraWebview",{
url:it,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=it);
})):location.href=it,!1)):!1:!1;
});
}
}catch(M){}
var at=e("appmsg/outer_link.js");
if(new at({
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
}),!G){
var rt=e("appmsg/review_image.js"),st=document.getElementById("js_cover"),dt=[];
st&&dt.push(st),new rt({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:dt
});
}
e("appmsg/product.js"),function(){
try{
var e=document.getElementById("js_content");
if(!e||!e.querySelectorAll)return;
for(var t=e.querySelectorAll("*"),o="js_banner_container,js_list_container,js_cover,js_tx_video_container,js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-2,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link,js_img_loading,wx_video_context,db,wx_video_thumb_primary,wx_video_play_btn,wx_video_mask".split(","),n=[new RegExp("^cps_inner"),new RegExp("^bizsvr_")],i=function(e){
if(e&&e.className){
for(var t=e.className.split(/\s+/),i=[],a=0,r=t.length;r>a;++a){
var s=t[a];
if(s&&-1!=o.indexOf(s))i.push(s);else for(var d=0,p=n.length;p>d;d++)if(n[d].test(s)){
i.push(s);
break;
}
}
e.className=i.join(" ");
}
},a=0,r=t.length;r>a;++a){
var s=t[a];
s.tagName&&"iframe"!=s.tagName.toLowerCase()&&i(s);
}
}catch(d){}
}(),window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
window.__appmsgCgiData&&1==window.__appmsgCgiData.show_msg_voice&&e("appmsg/autoread.js"),
"1"==window.show_msg_voice&&(console.log("load voicemsg"),e("appmsg/voicemsg.js")),
!window.__appmsgCgiData||1!=window.__appmsgCgiData.wxa_product&&1!=window.__appmsgCgiData.wxa_cps||e("appmsg/weproduct.js"),
e("appmsg/weapp.js"),e("appmsg/wxtopic.js"),e("appmsg/cdn_speed_report.js");
var pt=e("appmsg/page_pos.js");
pt.init({
hasSpAd:!0
}),setTimeout(function(){
window.article_improve_combo_css;
},0),setTimeout(function(){
v.tap(document.getElementById("copyright_logo"),function(){
window.__second_open__?A.invoke("openUrlWithExtraWebview",{
url:"http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html",
openType:1
},function(){}):location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),f(),y(),v.tap(document.getElementById("js_hotspot_area"),function(e){
if(l.hasClass(e.target,"js_hotspot")){
var t=e.target.dataset.id;
if(!t)return;
t="https://search.weixin.qq.com/cgi-bin/searchweb/clientjump?scene=306&tag=mp_topic&topic_id="+t+"#wechat_redirect",
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(h.isIOS||h.isAndroid||h.isWp)?A.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}):location.href=t;
}
}),e("appmsg/report_and_source.js"),function(){
if(G){
document.title=window.title,l.addClass(P,"not_in_mm");
var e=document.getElementById("js_pc_qr_code_img");
if(e){
var t=10000004,o=document.referrer;
if(0==o.indexOf("http://weixin.sogou.com")?t=10000001:0==o.indexOf("https://wx.qq.com")&&(t=10000003),
window.isSg)e.setAttribute("src",sg_qr_code.htmlDecode());else{
e.setAttribute("src","/mp/qrcode?scene="+t+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+t+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var i=document.getElementById("js_profile_qrcode"),a=document.getElementById("js_profile_arrow_wrp"),r=document.getElementById("profileBt");
if(i&&r&&a){
var s=function(){
var e=10000005,t=document.referrer;
0==t.indexOf("http://weixin.sogou.com")?e=10000006:0==t.indexOf("https://wx.qq.com")&&(e=10000007);
var o=document.getElementById("js_profile_qrcode_img");
if(o)if(window.isSg)o.setAttribute("src",sg_qr_code.htmlDecode());else{
o.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return i.style.display="block",a.style.left=r.offsetWidth/2-8+"px",!1;
};
v.on(r,"click",s),v.on(i,"click",s),v.on(document,"click",function(e){
var t=e.target||e.srcElement;
t!=r&&t!=i&&(i.style.display="none");
});
}
}else{
var d=document.getElementById("js_report_article3");
!!d&&(d.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=document.getElementById("img-content");
if(e&&t&&t.getBoundingClientRect){
var o=t.getBoundingClientRect().height;
window.scrollTo(0,o);
}
}(),e("appmsg/report.js");
for(var t=document.getElementsByTagName("map"),o=0,n=t.length;n>o;++o)t[o].parentNode.removeChild(t[o]);
if(ot.card_pv_report(),Math.random()<.01)try{
var i="https://js.aq.qq.com/js/aq_common.js",a=document.createElement("script");
a.src=i;
var r=document.getElementsByTagName("head")[0];
r.appendChild(a);
}catch(s){}
var d=document.getElementById("js_close_temp");
v.on(d,"click",function(){
d.parentNode.parentNode.removeChild(d.parentNode),l.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(m.os.ios&&"onorientationchange"in window){
var e=[],t="onorientationchange"in window?"orientationchange":"resize",o=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:o(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var n=(new Date).getHours();
v.on(window,t,function(){
var t=e.length-2,i=o();
if(t>=0){
var a=e[t],r=a.ori;
r!==i||e[e.length-1].istouchmove||(n>=11&&17>=n&&window.__report(63),window.scrollTo(0,a.scroll));
}
e.push({
ori:i,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
});
var i=document.getElementById("js_hotspot_area"),a=0===i.children.length;
v.on(window,"scroll",function(){
var t=e.length-1,n=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
if(e[t].ori==o()&&(e[t].scroll=n,e[t].istouchmove=!0,!a)){
var r=(window.innerHeight||document.documentElement.clientHeight)+n;
i.offsetTop<r&&(a=!0,(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=59977_15_1");
}
});
}
}(),_("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",O,!1):window.attachEvent&&window.attachEvent("onload",O),
e(window.moon&&moon.clearSample?"appmsg/fereport_without_localstorage.js":"appmsg/fereport.js"),
function(){
window.addEventListener&&document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
h.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
h.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
}(),function(){
var e=document.getElementById("publish_time");
e&&v.on(e,"click",function(){
e.innerText=window.publish_time;
});
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
var a=t.childNodes;
if(t.hasAttribute&&t.hasAttribute(o)&&e(),t.removeAttribute&&t.removeAttribute(o),
a&&a.length)for(var i=0;i<a.length;++i)filterContenteditable(a[i]);
}catch(r){}
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
var a=new Image;
a.onload=function(){
var o=a.naturalWidth||a.width,n=a.naturalHeight||a.height;
(o!=e||n!=t)&&window.__addIdKeyReport("28307",126),window.__addIdKeyReport("28307",127);
},a.src="https://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0";
}
},3e3);
var ct=Math.random();
if(2e-4>ct)try{
for(var mt=document.getElementsByTagName("img"),lt=window.screen.height,_t=window.screen.width,wt=0,gt=window.devicePixelRatio,wt="",S=0,ut=mt.length;ut>S;S++){
var ft=mt[S].getAttribute("data-src");
if(ft){
var ht=mt[S].getBoundingClientRect();
wt+=_t+"|"+lt+"|"+ht.left.toFixed(2)+"|"+(_t-ht.right).toFixed(2)+"|"+ht.width.toFixed(2)+"|"+gt.toFixed(2)+"|"+ft+";";
}
}
w({
url:"/mp/wapreport?action=img_display_report",
data:{
key:wt
},
type:"POST",
dataType:"json",
async:!0
});
}catch(M){}
}
var r=e("biz_common/tmpl.js"),s=e("cps/tpl/banner_tpl.html.js"),d=e("cps/tpl/card_tpl.html.js"),p=e("cps/tpl/list_tpl.html.js");
e("biz_common/utils/string/html.js");
var c=e("appmsg/weapp_common.js"),m=e("biz_wap/utils/device.js"),l=e("biz_common/dom/class.js"),_=e("appmsg/log.js"),w=e("biz_wap/utils/ajax.js"),g=e("biz_common/dom/attr.js"),u=g.setProperty,f=e("appmsg/max_age.js"),h=e("biz_wap/utils/mmversion.js"),y=e("appmsg/test.js"),v=e("biz_common/dom/event.js"),A=e("biz_wap/jsapi/core.js"),b=e("biz_common/moment.js"),j=e("appmsg/appmsg_report.js"),I=e("biz_common/utils/url/parse.js");
window.new_appmsg&&(e("page/appmsg_new/combo.css"),e("page/appmsg_new/not_in_mm.css"));
var x=window.user_uin||0,E=Math.floor(x/100)%1e3,z=0!==x&&1001>E,R=!0,k="",q=5;
window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.log("进入index.js init"),
_("[Appmsg] start run index.js init"),function(){
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
}(),a();
var B=!1;
});
define("appmsg/report.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/utils/monitor.js"],function(e){
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
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/articleReport.js","biz_wap/utils/ajax.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js"],function(e,t,o,i){
"use strict";
function n(){
var e=a.indexOf("://")<0?"http://"+a:a;
if(-1!=e.indexOf("mp.weixin.qq.com/s")||-1!=e.indexOf("mp.weixin.qq.com/mp/appmsg/show")||-1!=e.indexOf("mp.weixin.qq.com/mp/homepage")){
var t=e.split("#");
e=m.addParam(t[0],"scene",25,!0)+(t[1]?"#"+t[1]:""),e=e.replace(/#rd$/g,"#wechat_redirect");
}else e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);
try{
if("mp.weixin.qq.com"!=top.window.location.host)return window.top.open(e,"_blank"),
!1;
}catch(o){}
var i=location.search.replace("wx_header","del_wx_header"),n={
url:"/mp/advertisement_report"+i+"&report_type=3&action_type=0&url="+encodeURIComponent(a)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
},r=window.__second_open__?1:0;
return n.timeout=2e3,n.complete=function(){
_(e,{
sample:r,
reject:function(){
location.href=e;
}
});
},s(n),!1;
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),m=e("biz_common/utils/url/parse.js"),p=e("appmsg/articleReport.js"),s=e("biz_wap/utils/ajax.js"),c=msg_title.htmlDecode(),a=msg_source_url.htmlDecode(),_=e("appmsg/open_url_with_webview.js"),l=e("biz_wap/jsapi/core.js");
p.init({
dom:document.getElementById("js_report_article3"),
title:c,
link:window.msg_link
});
var d=document.getElementById("js_view_source");
r.on(d,"click",function(){
return n(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js"],function(e){
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
sessionid:window.sessionid||0,
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
});define("appmsg/weproduct.js",["appmsg/weapp_common.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_common/utils/monitor.js"],function(t){
"use strict";
function e(){
if("function"==typeof document.getElementsByClassName){
var t=document.getElementsByClassName("js_product_container");
t&&t.length>0&&(a(t),p.getAppidInfo({
onSuccess:function(e){
m.data=e.data,i(t);
}
})),r();
}
}
function a(t){
try{
for(var e=0,a=t.length;a>e;e++){
var i=t[e];
if(i.className.indexOf("js_list_container")>=0){
var o=i.querySelector("img.js_cover");
if(o){
var r=o.parentNode.getBoundingClientRect();
o.style.setProperty("width",r.width+"px","important"),o.style.setProperty("height",r.height+"px","important"),
o.style.setProperty("background-size","unset","important"),"0"==o.getAttribute("data-fail")?n.call(o):o.getAttribute("data-fail")||(o.lazyLoadOnload=o.lazyLoadOnload||[],
o.lazyLoadOnload.push(n));
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
function i(t){
for(var e=0,a=t.length;a>e;e++)!function(t,e){
c.on(t,"tap",".js_product_loop_content",function(t){
var a=t.delegatedTarget,n=a.getAttribute("data-wxaappid"),i=a.getAttribute("data-wxapath"),o=a.getAttribute("data-pid"),r=a.getAttribute("data-appid");
return p.jumpUrl({
privateExtraData:{
cookies:"cps_package=123456; expires=1538286412; busid=mmbiz_ad_cps; domain=*"
},
sourceAppId:r,
appid:n,
path:i,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(o),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
if("openWeApp:ok"===t.err_msg&&o){
var i=a.getAttribute("data-pidtype"),r=2;
2==i&&(r=4),d([{
wxa_appid:n,
pid:o,
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
o(),c.on(window,"scroll",o);
}
}
function o(){
m.checkInScreenId&&clearTimeout(m.checkInScreenId),m.checkInScreenId=setTimeout(function(){
m.checkInScreenId=null;
for(var t=[],e=0;e<m.pvele.length;e++){
var a=m.pvele[e],n=a.getBoundingClientRect(),i=n.height||n.bottom-n.top;
if(i>0&&n.top<m.innerHeight&&n.bottom>0){
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
d(t),0==m.pvele.length&&(c.off(window,"scroll",o),o=null);
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
var n=t[a],i=a+1;
for(var o in n)n.hasOwnProperty(o)&&(e[o+""+i]=n[o]);
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
var c=e("appmsg/log.js"),n=e("pages/qqmusic_tpl.html.js"),m=e("pages/voice_component.js"),l={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),l.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","biz_wap/utils/ajax_wx.js","biz_common/utils/url/parse.js","pages/create_txv.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
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
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=c.video_top.length,o=e+c.innerHeight,n=0,d=0;t>d;d++){
var s=c.video_top[d];
s.reported?n++:o>=s.start&&o<=s.end&&(s.reported=!0,r.report({
step:1,
vid:s.vid,
screen_num:Math.ceil(o/c.innerHeight),
screen_height:c.innerHeight
}));
}
n==t&&(a.off(window,"scroll",i),c.video_top=c.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o=e("biz_wap/utils/ajax_wx.js"),n=e("biz_common/utils/url/parse.js"),d=e("pages/create_txv.js"),r=e("new_video/ctl.js"),c={
txVideoReg:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
mpVideoReg:/http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},s=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),a=(m.setProperty,e("biz_common/dom/event.js")),p=document.getElementsByTagName("iframe"),l=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var w=Math.ceil(1e4*Math.random()),_=0,u=p.length;u>_;++_)!function(i){
var r=i.getAttribute("data-src")||"",m=i.className||"",a=i.getAttribute("src")||r;
if(!r||"#"==r){
var p=i.getAttribute("data-display-src");
if(p&&(0==p.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==p.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
p=p.replace(/&amp;/g,"&");
for(var _=p.split("&"),u=["/mp/newappmsgvote?action=show"],g=0;g<_.length;g++)(0==_[g].indexOf("__biz=")||0==_[g].indexOf("supervoteid="))&&u.push(_[g]);
u.length>1&&(r=u.join("&")+"#wechat_redirect");
}
}
if(a&&(c.txVideoReg.test(a)||c.mpVideoReg.test(a))){
if(s.isShowMpVideo()||c.mpVideoReg.test(a)){
e("pages/create_txv.js");
var f=n.getQuery("vid",r);
if(!f)return;
var v=i.getAttribute("data-vw"),h=i.getAttribute("data-vh"),x=document.domain;
"qq.com"==x&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(f),c.video_iframe.push({
dom:i,
vid:f
}),a=["/mp/videoplayer?video_h=",h,"&video_w=",v,"&scene=",window.source,"&random_num=",w,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",f,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
d.createGlobalFunc(),setTimeout(function(e,t){
t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__?o({
url:e,
type:"GET",
f:"html",
success:function(i){
t.setAttribute("src",e),t.contentDocument.open("text/html","replace"),t.contentDocument.write(i),
t.contentDocument.close(),t.contentWindow.__iframe_src__=e;
}
}):t.setAttribute("src",e);
},0,a,i);
}
}else if(r&&(r.indexOf("newappmsgvote")>-1&&m.indexOf("js_editor_vote_card")>=0||0==r.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&m.indexOf("card_iframe")>=0||r.indexOf("appmsgvote")>-1||r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&r.indexOf(window.biz)<0)return void l.push(i);
if(window.__second_open__||(r=r.replace(/^http:/,location.protocol)),m.indexOf("card_iframe")>=0){
var b=r.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(b+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?o({
url:b,
type:"GET",
f:"html",
success:function(e){
i.setAttribute("src",b),i.contentWindow.document.open("text/html","replace"),i.contentWindow.document.write(e),
i.contentWindow.document.close(),-1==r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(i.onload=function(){
t(i);
});
}
}):(i.setAttribute("src",b),-1==r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(i.onload=function(){
t(i);
}));
}else{
var y=r.indexOf("#wechat_redirect")>-1,j=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?j+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):m.indexOf("vote_iframe")>=0&&(j+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var b=y?r.replace("#wechat_redirect",j):r+j;
window.__second_open__?o({
url:b,
type:"GET",
f:"html",
success:function(e){
i.contentWindow.Ajax=o,i.setAttribute("src",b),i.contentWindow.document.open("text/html","replace"),
i.contentWindow.document.write(e),i.contentWindow.document.close(),-1==r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(i.onload=function(){
t(i);
});
}
}):(i.setAttribute("src",b),-1==r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(i.onload=function(){
t(i);
}));
}
i.appmsg_idx=g;
}
if(r&&r.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&v>0){
var k=v,q=3*k/4;
i.width=k,i.height=q,i.style.setProperty&&(i.style.setProperty("width",k+"px","important"),
i.style.setProperty("height",q+"px","important"));
}
}(p[_]);
for(var g=0;g<l.length;g++){
var f=l[g];
f.parentNode.removeChild(f);
}
if(window.iframe_reload=function(){
for(var e=0,i=p.length;i>e;++e){
var o=p[e],n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var v,h=document.getElementsByClassName("video_iframe"),_=0;v=h.item(_++);)v.setAttribute("scrolling","no"),
v.style.overflow="hidden";
c.video_iframe.length>0&&setTimeout(function(){
for(var e=c.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var d=e[o];
if(!d||!d.dom)return;
for(var r=d.dom,s=r.offsetHeight,m=0;r&&t!==r;)m+=r.offsetTop,r=r.offsetParent;
c.video_top.push({
start:m+s/2,
end:m+s/2+c.innerHeight,
reported:!1,
vid:d.vid
});
}
i(),a.on(window,"scroll",i);
});
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
var s=window.getComputedStyle(r,null),g=parseInt(s.getPropertyValue("opacity")),l=s.getPropertyValue("filter"),w=s.getPropertyValue("visibility");
if(1!=g||"visible"!=w||l.indexOf("opacity")>=0||l.indexOf("blur")>=0){
d=!1;
break;
}
var u=r.getBoundingClientRect();
if(("hidden"==s.overflow||"hidden"==s.overflowX||"hidden"==s.overflowY)&&(u.left>n.left||u.right<n.right||u.top>n.top||u.bottom<n.bottom)){
d=!1;
break;
}
r=r.parentElement;
}
if(!d){
if(console.log("don't try this again"),"function"==typeof window.__addIdKeyReport){
window.__addIdKeyReport("110644",3);
var h=new Image,f="https://badjs.weixinbridge.com/badjs?id=168&level=4&from="+encodeURIComponent(location.href)+"&msg="+encodeURIComponent(e);
h.src=f.slice(0,1024);
}
return!1;
}
}
"undefined"==typeof getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var b=i.target,y=window.getComputedStyle(b),_=b.getBoundingClientRect(),v=document.createElement("canvas");
v.style.width=y.width,v.style.height=y.height,v.width=parseFloat(y.width),v.height=parseFloat(y.height);
var j=v.getContext("2d"),F="";
j.drawImage(b,0,0,parseFloat(y.width),parseFloat(y.height));
try{
F=v.toDataURL();
}catch(i){}
p.isAndroid&&(F=""),t(e,o,F,{
x:_.left-parseFloat(y.paddingLeft)-parseFloat(y.borderLeftWidth),
y:_.top-parseFloat(y.paddingTop)-parseFloat(y.borderTopWidth),
width:_.width-parseFloat(y.paddingLeft)-parseFloat(y.paddingRight)-parseFloat(y.borderLeftWidth)-parseFloat(y.borderRightWidth),
height:_.height-parseFloat(y.paddingTop)-parseFloat(y.paddingBottom)-parseFloat(y.borderTopWidth)-parseFloat(y.borderBottomWidth)
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
});define("appmsg/outer_link.js",["biz_common/dom/event.js","appmsg/reportClickLink.js","biz_wap/utils/ajax.js"],function(n){
"use strict";
function e(n){
var e=n.container;
if(!e)return!1;
for(var i=e.getElementsByTagName("a")||[],a=0,o=i.length;o>a;++a)!function(e){
var a=i[e],o=a.getAttribute("href");
if(!o)return!1;
var s=0,c=a.innerHTML;
/^[^<>]+$/.test(c)?s=1:/^<img[^>]*>$/.test(c)&&(s=2),!!n.changeHref&&(o=n.changeHref(o,s)),
r.on(a,"click",function(n){
return n.preventDefault(),"MzIxNzA1NDEyNQ=="===window.biz&&(o.indexOf("campaign%3Dtw")>=0||o.indexOf("campaign%3Dtuiwen")>=0)?(t({
path:o,
type:s,
success:function(){
location.href=o;
},
error:function(){
location.href=o;
}
}),!1):(location.href=o,!1);
},!0);
}(a);
}
function i(){
var n=navigator.userAgent.toLowerCase(),e=~n.indexOf("android"),i=~n.search(/ip(od|hone|ad)/);
return e?"Android":i?"iOS":"unknown";
}
function t(n){
var e="/mp/articleh5report?action=open_h5",t={
OsName:i(),
UserAgent:navigator.userAgent,
Count:1,
bizuin:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.user_uin||"",
currentURL:window.location.href,
targetURL:n.path||"",
linkType:n.type||2,
targetType:0,
targetAppId:n.appid||"",
isAD:0
};
a({
url:e,
data:{
json:JSON.stringify(t)
},
type:"POST",
dataType:"json",
async:!0,
success:n.success,
error:n.error
});
}
var r=n("biz_common/dom/event.js"),a=(n("appmsg/reportClickLink.js"),n("biz_wap/utils/ajax.js"));
return e;
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
});
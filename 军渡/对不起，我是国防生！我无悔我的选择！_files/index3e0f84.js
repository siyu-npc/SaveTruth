define("biz_wap/utils/device.js",[],function(){
"use strict";
function s(s){
{
var r=s.match(/MQQBrowser\/(\d+\.\d+)/i),e=s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i)||s.match(/V1_AND_SQ_([\d\.]+)/),i=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||s.match(/MicroMessenger\/((\d+)\.(\d+))/),t=s.match(/Mac\sOS\sX\s(\d+\.\d+)/),n=s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),a=s.match(/MiuiBrowser\/(\d+\.\d+)/i),d=s.match(/MI-ONE/),h=s.match(/MI PAD/),w=s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||s.match(/\sUC\s/),c=s.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||s.match(/WPDesktop/),u=s.match(/(ipod).*\s([\d_]+)/i),b=s.match(/(ipad).*\s([\d_]+)/i),p=s.match(/(iphone)\sos\s([\d_]+)/i),v=s.match(/Chrome\/(\d+\.\d+)/),m=s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/),f=s.match(/(android)\s([\d\.]+)/i);
s.indexOf("HTC")>-1;
}
if(o.browser=o.browser||{},o.os=o.os||{},window.ActiveXObject){
var l=6;
(window.XMLHttpRequest||s.indexOf("MSIE 7.0")>-1)&&(l=7),(window.XDomainRequest||s.indexOf("Trident/4.0")>-1)&&(l=8),
s.indexOf("Trident/5.0")>-1&&(l=9),s.indexOf("Trident/6.0")>-1&&(l=10),o.browser.ie=!0,
o.browser.version=l;
}else s.indexOf("Trident/7.0")>-1&&(o.browser.ie=!0,o.browser.version=11);
f&&(this.os.android=!0,this.os.version=f[2]),u&&(this.os.ios=this.os.ipod=!0,this.os.version=u[2].replace(/_/g,".")),
b&&(this.os.ios=this.os.ipad=!0,this.os.version=b[2].replace(/_/g,".")),p&&(this.os.iphone=this.os.ios=!0,
this.os.version=p[2].replace(/_/g,".")),n&&(this.os.windows=!0,this.os.version=n[2]),
t&&(this.os.Mac=!0,this.os.version=t[1]),s.indexOf("lepad_hls")>0&&(this.os.LePad=!0),
h&&(this.os.MIPAD=!0),r&&(this.browser.MQQ=!0,this.browser.version=r[1]),e&&(this.browser.MQQClient=!0,
this.browser.version=e[1]),i&&(this.browser.WeChat=!0,this.browser.mmversion=this.browser.version=i[1]),
a&&(this.browser.MIUI=!0,this.browser.version=a[1]),w&&(this.browser.UC=!0,this.browser.version=w[1]||0/0),
c&&(this.browser.IEMobile=!0,this.browser.version=c[2]),m&&(this.browser.AndriodBrowser=!0),
d&&(this.browser.M1=!0),v&&(this.browser.Chrome=!0,this.browser.version=v[1]),this.os.windows&&(this.os.win64="undefined"!=typeof navigator.platform&&"win64"==navigator.platform.toLowerCase()?!0:!1);
var M={
iPad7:"iPad; CPU OS 7",
LePad:"lepad_hls",
XiaoMi:"MI-ONE",
SonyDTV:"SonyDTV",
SamSung:"SAMSUNG",
HTC:"HTC",
VIVO:"vivo"
};
for(var g in M)this.os[g]=-1!==s.indexOf(M[g]);
o.os.phone=o.os.phone||/windows phone/i.test(s),this.os.getNumVersion=function(){
return parseFloat(o.os.version,"10");
},this.os.hasTouch="ontouchstart"in window,this.os.hasTouch&&this.os.ios&&this.os.getNumVersion()<6&&(this.os.hasTouch=!1),
o.browser.WeChat&&o.browser.version<5&&(this.os.hasTouch=!1),o.browser.getNumVersion=function(){
return parseFloat(o.browser.version,"10");
},o.browser.isFFCanOcx=function(){
return o.browser.firefox&&o.browser.getNumVersion()>=3?!0:!1;
},o.browser.isCanOcx=function(){
return!(!o.os.windows||!o.browser.ie&&!o.browser.isFFCanOcx()&&!o.browser.webkit);
},o.browser.isNotIESupport=function(){
return!!o.os.windows&&(!!o.browser.webkit||o.browser.isFFCanOcx());
},o.userAgent={},o.userAgent.browserVersion=o.browser.version,o.userAgent.osVersion=o.os.version,
delete o.userAgent.version;
}
var o={};
s.call(o,window.navigator.userAgent);
var r=function(){
var s=window.navigator.userAgent,r=null;
if(o.os.android){
if(o.browser.MQQ&&o.browser.getNumVersion()>=4.2)return!0;
if(-1!=s.indexOf("MI2"))return!0;
if(o.os.version>="4"&&(r=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))&&r[1]>=4.2)return!0;
if(o.os.version>="4.1")return!0;
}
return!1;
}(),e=function(){
var s=document.createElement("video");
if("function"==typeof s.canPlayType){
if("probably"==s.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
if("probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E"')||"probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0;
}
return!1;
}(),i=function(){
return o.os.ios&&o.os.getNumVersion()<=9?!1:!0;
}();
return o.canSupportVideo=e||r,o.canSupportVideoMp4=e,o.canSupportH5Video=r,o.canSupportAutoPlay=i,
o;
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},String.prototype.htmlLite=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&gt;",">","&lt;","<","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncodeLite=function(){
return this.htmlLite(!0);
},String.prototype.htmlDecodeLite=function(){
return this.htmlLite(!1);
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
},
htmlEncodeLite:function(t){
return t.htmlEncodeLite();
},
htmlDecodeLite:function(t){
return t.htmlDecodeLite();
}
};
});define("appmsg/index.js",["biz_common/utils/string/html.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/moment.js","appmsg/appmsg_report.js","page/appmsg_new/combo.css","page/appmsg_new/not_in_mm.css","page/appmsg/page_mp_article_improve_combo.css","page/appmsg/not_in_mm.css","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/copyright_report.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/product.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/autoread.js","appmsg/voicemsg.js","appmsg/weproduct.js","appmsg/weapp.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport_without_localstorage.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e){
"use strict";
function o(){
function o(e,o){
var t={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},n=new Image;
n.onload=function(){
var t=n.width>0&&n.height>0;
o(e,t);
},n.onerror=function(){
o(e,!1);
},n.src="data:image/webp;base64,"+t[e];
}
function a(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var o=e.timing;
i("[Appmsg] dns:"+(o.domainLookupEnd-o.domainLookupStart)+"^^^ ssl:"+(0==o.secureConnectionStart?0:o.connectEnd-o.secureConnectionStart)+"^^^ tcp:"+(o.connectEnd-o.connectStart)+"^^^ request:"+(o.responseStart-o.requestStart)+"^^^ getPackageTime:"+(o.responseEnd-o.responseStart)+"^^^ domCententLoaded:"+(o.domContentLoadedEventStart-o.domLoading)+"^^^ domComplete:"+(o.domComplete-o.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-o.navigationStart)+"^^^ interactiveTime:"+(page_endtime-o.navigationStart))+"^^^ ua:"+window.navigator.userAgent,
setTimeout(function(){
o.loadEventEnd&&i("[Appmsg] onload:"+(o.loadEventEnd-o.loadEventStart));
},100);
}
"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
}),""==document.getElementById("js_content").innerHTML.trim()&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_94_1");
var t=Math.random();
.001>t&&document.getElementById("js_read_area3")&&document.getElementById("js_read_area3").innerText&&document.getElementById("js_read_area3").innerText.indexOf("Pageview")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_95_1"),
window.__wxjs_is_wkwebview&&window.__addIdKeyReport("28307",67);
}
window.is_new_msg&&(console.log("currentMpInfo:"+round_head_img+"|title:"+window.title),
l.invoke("currentMpInfo",{
brandName:window.title,
brandIcon:round_head_img
},function(e){
console.log("currentMpInfo res: "+e);
}),m.on(window,"load",function(){
document.title="",v=!1;
}),window.onscroll=function(){
var e=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
e>=40&&0==v?(console.log(window.title+"init setPageTitle :top["+e+"]:title_show["+v+"]"),
document.title=window.title,v=!0):40>e&&1==v&&(console.log(window.title+"init setPageTitle :top["+e+"]:title_show["+v+"]"),
document.title="",v=!1);
},window.addEventListener("pageshow",function(){
var e=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
console.log("pageshow:top="+e),e>=40?(document.title=window.title,v=!0):40>e&&(document.title="",
v=!1);
}));
var _=document.getElementsByTagName("body");
if(!_||!_[0])return!1;
_=_[0],function(){
var e=document.getElementById("js_hotspot_area"),o=0===window.hotspotInfoList.length,t=function(n){
if(!o){
var i=(window.innerHeight||document.documentElement.clientHeight)+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop);
e.offsetTop<i?(o=!0,m.off(window,"scroll",t),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=59977_15_1",
g.hotspotReport({
hotspotjson:JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})
})):"function"==typeof n&&n();
}
};
t(function(){
m.on(window,"scroll",t);
});
}(),function(){
var e=(new Date).getHours(),o=function(e,o){
o=o||"",window.isSg?(o=["uin:sougou","resp:"+o].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+o+"&r="+Math.random()+"&from=sougou"):(o=["uin:"+window.user_uin,"resp:"+o].join("|"),
(new Image).src="/mp/jsreport?key="+e+"&content="+o+"&r="+Math.random());
},t=function(e,o,t){
var n=e+"_"+o;
t=t||1,window.logs.idkeys[n]||(window.logs.idkeys[n]={
val:0
}),window.logs.idkeys[n].val+=t;
},n=e>=11&&17>=e&&Math.random()<1,i=function(e,t){
n&&o(e,t);
};
window.__report=o,window.__commonVideoReport=i,window.__addIdKeyReport=t;
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
var R=w(1e3*parseInt(top.window.modify_time)),q=R.format("YYYY-MM-DD"),z=document.getElementById("js_modify_time");
if(z&&(z.innerHTML=q),window.isSg||"mp.weixin.qq.com"==location.host){
var B=e("biz_common/log/jserr.js");
B({
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
var O=-1!=navigator.userAgent.indexOf("TBS/"),k=function(e,t){
o(e,function(e,o){
if(window.logs.webplog[e]=o?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
O&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var r=n.lossy&n.lossless&n.alpha;
t(!!r);
}
});
},T=function(e){
for(var o=document.getElementsByTagName("img"),t=!1,n=0,i=o.length;i>n;n++){
var r=o[n].getAttribute("data-src");
r&&r.isGif()&&(t=!0);
}
(h||navigator.userAgent.indexOf("Br_trunk")>-1)&&t&&c.isIOS&&c.gtVersion("6.5.13",!0)?(console.log("当前版本可以启用img代理"),
l.invoke("imageProxyInit",{},function(o){
console.log(o),o.err_msg.indexOf(":ok")>-1?(A=o.serverUrl,window.__addIdKeyReport("28307",117)):o.err_msg.indexOf(":fail")>-1&&window.__addIdKeyReport("28307",118),
e();
})):e();
},S=function(e){
k("lossy",e),k("lossless",e),k("alpha",e),k("animation",e);
};
window.webp=!1,T(function(){
S(function(o){
function t(e){
e.width<40||e.height<40||-1==e.className.indexOf("img_loading")&&(e.className+=" img_loading");
}
function n(e){
if(!(e.width<40||e.height<40)){
var o=e.src;
if(e.className=e.className.replace("img_loading",""),-1==e.className.indexOf("img_loadederror")){
e.className+=" img_loadederror",e.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
window.__addIdKeyReport("28307",51);
var n=function(){
window.__addIdKeyReport("28307",66),r(e),t(e);
var n=e.__retryload;
return n=0,o=o.https2http(),e.__retryload=n,e.src=x.addParam(o,"retryload",n,!0),
!1;
};
m.on(e,"click",n);
}
}
}
function r(e){
e.className=e.className.replace("img_loading",""),e.className=e.className.replace("img_loadederror","");
}
window.webp=o,o&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var a=document.getElementById("js_cover");
if(a){
var d=a.getAttribute("data-src");
d&&(d.isCDN()&&(d=d.imgChange640(),o&&(d=x.addParam(d,"tp","webp",!0)),d=x.addParam(d,"wxfrom","5",!0),
is_https_res||f?d=d.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(d=d.https2http())),
setTimeout(function(){
a.onload=function(){
s(a,"height","auto","important"),s(a,"visibility","visible","important");
},a.setAttribute("src",d);
},0),window.logs.img.read[d]=!0,window.logs.img.load[d]=!0,a.removeAttribute("data-src"));
}
var c=e("biz_wap/ui/lazyload_img.js"),p=1;
window.logs.outer_pic=0;
for(var l=document.getElementsByTagName("img"),w=0,g=l.length;g>w;w++){
{
var _=l[w].getAttribute("data-src");
l[w].getAttribute("src");
}
_&&_.isGif()&&l[w].className.indexOf("__bg_gif")<0&&(l[w].className+=" __bg_gif"),
_&&t(l[w]);
}
for(var u=document.getElementsByClassName("__bg_gif"),w=0,g=u.length;g>w;++w)u[w].setAttribute("data-order",w);
new c({
attrKey:"data-src",
imgOccupied:!0,
lazyloadHeightWhenWifi:function(){
var e,o=1,t=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var n=e.getHours();
return n>=20&&23>n&&(o=.5,t=0),{
bottom:o,
top:t
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,o){
if(!o)return"";
var t=o;
if(o.isCDN()){
t=t.imgChange640();
var n,r=window.navigator.userAgent,a=/TBS\/([\d\.]+)/i,s=r.match(a);
s&&s[1]&&(n=parseInt(s[1]));
var d,c=/XWEB\/([\d\.]+)/i,p=r.match(c);
p&&p[1]&&(d=parseInt(p[1]));
var m=1e3,l=window.user_uin||0,w=0!==l&&Math.floor(l/100)%1e3<m;
w&&(n>=43305||d>=16)&&t.isGif()?(t=x.addParam(t,"tp","wxpic",!0),window.__addIdKeyReport("28307",91)):window.webp&&(t=x.addParam(t,"tp","webp",!0),
window.__addIdKeyReport("28307",84)),t=x.addParam(t,"wxfrom","5",!0),is_https_res||f?(t=t.http2https(),
window.__addIdKeyReport("28307",77)):("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(t=t.https2http(),
window.__addIdKeyReport("28307",70));
}else try{
var a=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
a.test(o)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(g){}
var _=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
t=t.replace(_,"http://m.qpic.cn"),t=x.addParam(t,"wx_lazy","1",!0);
return A&&t.isGif()&&(window.__addIdKeyReport("28307",106),t=x.addParam(t,"tp","wxpic",!0),
t=A+"hevc?url="+encodeURIComponent(t)+"&type=gif"),window.logs.img.load[t]=!0,i("[Appmsg] image_load_event_change_src. originsrc:"+o+"  ^^^ newsrc : "+t),
e.start_load_time=+new Date,t;
},
onerror:function(e,o){
var t=o?o.__retryload||0:0;
if(1==t&&n(o),e&&!(t>p)){
if(!e.isCDN()){
if(!A)return;
if(-1==e.indexOf(A))return;
}
var r=0==e.indexOf("https://")?7:0;
if(window.__addIdKeyReport("28307",72+r),window.__addIdKeyReport("28307",75+1*t+r),
e.isWxpic()?(window.__addIdKeyReport("28307",93),window.__addIdKeyReport("28307",96+1*t)):e.isWebp()&&(window.__addIdKeyReport("28307",86),
window.__addIdKeyReport("28307",89+1*t)),A&&e.indexOf(A)>-1&&window.__addIdKeyReport("28307",108),
p>t){
if(t++,o.__retryload=t,1==t&&e.indexOf("http://")>-1?(e=e.http2https(),window.__addIdKeyReport("28307",60),
window.__addIdKeyReport("28307",77)):1==t&&e.indexOf("https://")>-1&&(window.__addIdKeyReport("28307",61),
window.__addIdKeyReport("28307",77)),A&&e.indexOf(A)>-1){
var a=e.split("hevc?url=")[1];
a=a.split("&type")[0],a=decodeURIComponent(a),a=a.replace("tp=wxpic",""),e=a.https2http();
}
o.start_load_time=+new Date,o.src=x.addParam(e,"retryload",t,!0);
}
window.__has_imgfailed||(window.__has_imgfailed=!0,window.__addIdKeyReport("28307",65)),
i("[Appmsg] image_load_event_on_error. src:"+e),o.setAttribute("data-fail",1);
try{
if("[object Array]"==Object.prototype.toString.call(o.lazyLoadOnerror))for(var s=0,d=o.lazyLoadOnerror.length;d>s;s++)"function"==typeof o.lazyLoadOnerror[s]&&o.lazyLoadOnerror[s].call(o);
}catch(c){}
var m=10;
/tp\=webp/.test(e)&&(m=11);
var l=new Image;
l.src="http://mp.weixin.qq.com/mp/jsreport?key="+m+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,o){
r(o),o.gray&&!o.loadGif&&((o.width||o.naturalWidth)<120||(o.height||o.naturalHeight)<120?o.autoTap&&o.autoTap():o.span&&o.span.children&&o.span.children.item(0)&&(o.span.children.item(0).style.display=""));
var t=o?o.__retryload||0:0;
if(!(t>p)){
i("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+t),
o.setAttribute("data-fail",0);
try{
if("[object Array]"==Object.prototype.toString.call(o.lazyLoadOnload))for(var n=0,a=o.lazyLoadOnload.length;a>n;n++)"function"==typeof o.lazyLoadOnload[n]&&o.lazyLoadOnload[n].call(o);
}catch(s){}
var d=0==e.indexOf("https://")?7:0;
window.__addIdKeyReport("28307",71+d),window.__addIdKeyReport("28307",73+1*t+d),
e.isWxpic()?(window.__addIdKeyReport("28307",92),window.__addIdKeyReport("28307",94+1*t)):e.isWebp()&&(window.__addIdKeyReport("28307",85),
window.__addIdKeyReport("28307",87+1*t)),A&&e.indexOf(A)>-1&&window.__addIdKeyReport("28307",107),
window.__has_imgsucceed||(window.__has_imgsucceed=!0,window.__addIdKeyReport("28307",64)),
1==t&&e.indexOf("http://")>-1&&window.__addIdKeyReport("28307",50),1==t&&e.indexOf("https://")>-1&&window.__addIdKeyReport("28307",52);
var c=Math.random(),m=+new Date-o.start_load_time;
m&&0==e.indexOf("https://")&&.5>c?(window.__addIdKeyReport("27822",121,m),window.__addIdKeyReport("27822",122)):m&&5e-4>c&&(window.__addIdKeyReport("27822",124,m),
window.__addIdKeyReport("27822",125));
}
},
detect:function(e){
if(e&&e.time&&e.loadList){
var o=e.time,t=e.loadList;
window.logs.img.download[o]=t;
}
},
container:document.getElementById("page-content")
});
});
}),e("appmsg/async.js"),!window.isSg;
var K=e("appmsg/copyright_report.js");
!function(){
var e=document.getElementById("profileBt"),o=document.getElementById("copyright_info"),t=[];
if(e){
var n="57";
"26"==window.source&&(n="95"),"28"==window.source&&(n="96"),"29"==window.source&&(n="39"),
"15"==window.source&&(n="121"),t.push({
dom:e,
username:user_name_new||user_name,
profileReportInfo:window.profileReportInfo||"",
scene:n
});
}
o&&source_encode_biz&&t.push({
dom:o,
source_encode_biz:source_encode_biz,
scene:"110"
});
var a=document.getElementById("js_share_headimg");
a&&t.push({
dom:a,
username:source_username,
scene:0
});
var s=document.getElementById("js_share_author");
s&&t.push({
dom:s,
username:source_username,
scene:"0"
});
for(var d=0,p=t.length;p>d;d++)!function(e){
m.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
K.card_click_report({
scene:"0"
});
var o="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?location.href=o:l.invoke("openUrlWithExtraWebview",{
url:o,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=o);
});
}else{
if(i("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
g.profileReport({
hotspotjson:JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})
}),profileReportInfo){
var t=String(profileReportInfo).split("_");
3==t.length&&r({
url:"/mp/ad_biz_info?action=report&__biz="+window.biz+"&report_type=2&aid="+t[1]+"&tid="+t[2],
type:"GET",
dataType:"json",
async:!0,
success:function(){}
});
}
c.isInMiniProgram||l.invoke("profile",{
username:e.username,
profileReportInfo:e.profileReportInfo||"",
scene:e.scene+""
},function(o){
window.__addIdKeyReport("28307","1"),i("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", profileReportInfo:"+e.profileReportInfo+", res.err_msg:"+o.err_msg);
});
}
return!1;
}),c.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(t[d]);
}(),function(){
location.href.match(/fontScale=\d+/)&&c.isIOS&&l.on("menu:setfont",function(e){
for(var o in e)console.log("fontScale:"+o+":"+e[o]);
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
n.addClass(document.getElementsByTagName("body").item(0),"appmsg_skin_fontscale_"+e.fontSize);
});
}();
try{
var C=document.getElementById("js_author_name");
if(C){
var N="";
m.on(C,"click",function(){
return N="https://mp.weixin.qq.com/mp/author?action=show&author_id="+author_id+"&rewardsn="+C.getAttribute("data-rewardsn")+"&timestamp="+C.getAttribute("data-timestamp")+"&__biz="+window.biz+"&appmsgid="+window.appmsgid+"&idx="+window.idx+"&scene=142&rscene=129#wechat_redirect",
c.isInMiniProgram?!1:(-1!=navigator.userAgent.indexOf("MicroMessenger")&&(c.isIOS||c.isAndroid||c.isWp)?l.invoke("openUrlWithExtraWebview",{
url:N,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=N);
}):location.href=N,!1);
});
}
}catch(y){}
var M=e("appmsg/outer_link.js");
if(new M({
container:document.getElementById("js_content"),
changeHref:function(e,o){
if(!e||0!=e.indexOf("http://mp.weixin.qq.com/")&&0!=e.indexOf("https://mp.weixin.qq.com/")){
if(18==ban_scene)return"/mp/ban?action=check&__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+ban_scene+"#wechat_redirect";
if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+o+"&scene=0";
}else{
e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),e=e.replace(/[\?&]scene=21/,"");
var t="&";
-1==e.indexOf("?")&&(t="?"),e+=t+"scene=21#wechat_redirect";
}
return e;
}
}),!E){
var D=e("appmsg/review_image.js"),L=document.getElementById("js_cover"),W=[];
L&&W.push(L),new D({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:W
});
}
e("appmsg/product.js"),function(){
try{
var e=document.getElementById("js_content");
if(!e||!e.querySelectorAll)return;
for(var o=e.querySelectorAll("*"),t="js_banner_container,js_list_container,js_cover,js_tx_video_container,js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-2,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link".split(","),n=[new RegExp("^cps_inner"),new RegExp("^bizsvr_")],i=function(e){
if(e&&e.className){
for(var o=e.className.split(/\s+/),i=[],r=0,a=o.length;a>r;++r){
var s=o[r];
if(s&&-1!=t.indexOf(s))i.push(s);else for(var d=0,c=n.length;c>d;d++)if(n[d].test(s)){
i.push(s);
break;
}
}
e.className=i.join(" ");
}
},r=0,a=o.length;a>r;++r){
var s=o[r];
s.tagName&&"iframe"!=s.tagName.toLowerCase()&&i(s);
}
}catch(d){}
}(),window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
window.__appmsgCgiData&&1==window.__appmsgCgiData.show_msg_voice&&e("appmsg/autoread.js"),
"1"==window.show_msg_voice&&(console.log("load voicemsg"),e("appmsg/voicemsg.js")),
!window.__appmsgCgiData||1!=window.__appmsgCgiData.wxa_product&&1!=window.__appmsgCgiData.wxa_cps||e("appmsg/weproduct.js"),
e("appmsg/weapp.js"),e("appmsg/wxtopic.js"),e("appmsg/cdn_speed_report.js");
var P=e("appmsg/page_pos.js");
P.init({
hasSpAd:!0
}),setTimeout(function(){
window.article_improve_combo_css;
},0),setTimeout(function(){
m.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),d(),p(),m.tap(document.getElementById("js_hotspot_area"),function(e){
if(n.hasClass(e.target,"js_hotspot")){
var o=e.target.dataset.id;
if(!o)return;
o="https://search.weixin.qq.com/cgi-bin/searchweb/clientjump?scene=306&tag=mp_topic&topic_id="+o+"#wechat_redirect",
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(c.isIOS||c.isAndroid||c.isWp)?l.invoke("openUrlWithExtraWebview",{
url:o,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=o);
}):location.href=o;
}
}),e("appmsg/report_and_source.js"),function(){
if(E){
document.title=window.title,n.addClass(_,"not_in_mm");
var e=document.getElementById("js_pc_qr_code_img");
if(e){
var o=10000004,t=document.referrer;
if(0==t.indexOf("http://weixin.sogou.com")?o=10000001:0==t.indexOf("https://wx.qq.com")&&(o=10000003),
window.isSg)e.setAttribute("src",sg_qr_code.htmlDecode());else{
e.setAttribute("src","/mp/qrcode?scene="+o+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var i=new Image;
i.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+o+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var r=document.getElementById("js_profile_qrcode"),a=document.getElementById("js_profile_arrow_wrp"),s=document.getElementById("profileBt");
if(r&&s&&a){
var d=function(){
var e=10000005,o=document.referrer;
0==o.indexOf("http://weixin.sogou.com")?e=10000006:0==o.indexOf("https://wx.qq.com")&&(e=10000007);
var t=document.getElementById("js_profile_qrcode_img");
if(t)if(window.isSg)t.setAttribute("src",sg_qr_code.htmlDecode());else{
t.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return r.style.display="block",a.style.left=s.offsetWidth/2-8+"px",!1;
};
m.on(s,"click",d),m.on(r,"click",d),m.on(document,"click",function(e){
var o=e.target||e.srcElement;
o!=s&&o!=r&&(r.style.display="none");
});
}
}else{
var c=document.getElementById("js_report_article3");
!!c&&(c.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,o=document.getElementById("img-content");
if(e&&o&&o.getBoundingClientRect){
var t=o.getBoundingClientRect().height;
window.scrollTo(0,t);
}
}(),e("appmsg/report.js");
for(var o=document.getElementsByTagName("map"),t=0,i=o.length;i>t;++t)o[t].parentNode.removeChild(o[t]);
if(K.card_pv_report(),Math.random()<.01)try{
var r="https://js.aq.qq.com/js/aq_common.js",a=document.createElement("script");
a.src=r;
var s=document.getElementsByTagName("head")[0];
s.appendChild(a);
}catch(w){}
var g=document.getElementById("js_close_temp");
m.on(g,"click",function(){
g.parentNode.parentNode.removeChild(g.parentNode),n.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(t.os.ios&&"onorientationchange"in window){
var e=[],o="onorientationchange"in window?"orientationchange":"resize",n=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:n(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
m.on(window,o,function(){
var o=e.length-2,t=n();
if(o>=0){
var r=e[o],a=r.ori;
a!==t||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,r.scroll));
}
e.push({
ori:t,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
});
var r=document.getElementById("js_hotspot_area"),a=0===r.children.length;
m.on(window,"scroll",function(){
var o=e.length-1,t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
if(e[o].ori==n()&&(e[o].scroll=t,e[o].istouchmove=!0,!a)){
var i=(window.innerHeight||document.documentElement.clientHeight)+t;
r.offsetTop<i&&(a=!0,(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=59977_15_1");
}
});
}
}(),i("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
e(window.moon&&moon.clearSample?"appmsg/fereport_without_localstorage.js":"appmsg/fereport.js"),
function(){
window.addEventListener&&document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
c.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
c.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
}(),function(){
var e=document.getElementById("publish_time");
e&&m.on(e,"click",function(){
e.innerText=window.publish_time;
});
}(),"undefined"!=typeof isSg&&e("sougou/index.js"),setTimeout(function(){
for(var e=function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_49_1&lc=1&log0=[28307_49_appmsg_fe_filter]"+encodeURIComponent(location.href);
},o=(window.appmsg_fe_filter||"").split(","),t=function(o,t){
try{
if(!o)return;
if(o.querySelectorAll){
var n=o.querySelectorAll("*["+t+"]");
if(n&&n.length>0){
e();
for(var i=0;i<n.length;++i)n[i]&&n[i].removeAttribute&&n[i].removeAttribute(t);
}
return;
}
var r=o.childNodes;
if(o.hasAttribute&&o.hasAttribute(t)&&e(),o.removeAttribute&&o.removeAttribute(t),
r&&r.length)for(var i=0;i<r.length;++i)filterContenteditable(r[i]);
}catch(a){}
},n=document.getElementById("js_content"),i=0;i<o.length;++i)o[i]&&t(n,o[i]);
},0),setTimeout(function(){
var e=999,o=636,t="http://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0",n=(new Date).getHours();
if(!(11>n||n>16||Math.random()<.99)){
var i=new Image;
i.onload=function(){
var t=i.naturalWidth||i.width,n=i.naturalHeight||i.height;
(t!=e||n!=o)&&window.__addIdKeyReport("28307","wifi"===window.networkType?120:123),
window.__addIdKeyReport("28307","wifi"===window.networkType?121:124);
},i.src=t;
var r=new Image;
r.onload=function(){
var t=r.naturalWidth||r.width,n=r.naturalHeight||r.height;
(t!=e||n!=o)&&window.__addIdKeyReport("28307",126),window.__addIdKeyReport("28307",127);
},r.src="https://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0";
}
},3e3);
var Q=Math.random();
if(2e-4>Q)try{
for(var U=document.getElementsByTagName("img"),G=window.screen.height,H=window.screen.width,J=0,Y=window.devicePixelRatio,J="",V=0,F=U.length;F>V;V++){
var X=U[V].getAttribute("data-src");
if(X){
var $=U[V].getBoundingClientRect();
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
var t=e("biz_wap/utils/device.js"),n=e("biz_common/dom/class.js"),i=e("appmsg/log.js"),r=e("biz_wap/utils/ajax.js"),a=e("biz_common/dom/attr.js"),s=a.setProperty,d=e("appmsg/max_age.js"),c=e("biz_wap/utils/mmversion.js"),p=e("appmsg/test.js"),m=e("biz_common/dom/event.js"),l=e("biz_wap/jsapi/core.js"),w=e("biz_common/moment.js"),g=e("appmsg/appmsg_report.js");
window.new_appmsg?(e("page/appmsg_new/combo.css"),e("page/appmsg_new/not_in_mm.css")):(e("page/appmsg/page_mp_article_improve_combo.css"),
e("page/appmsg/not_in_mm.css"));
var _=window.user_uin||0,u=Math.floor(_/100)%1e3,f=0!==_&&1001>u,h=!0,A="";
window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.log("进入index.js init"),
i("[Appmsg] start run index.js init"),o();
var v=!1;
});
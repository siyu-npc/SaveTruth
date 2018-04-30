define("a/a.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","appmsg/cdn_img_lib.js","a/profile.js","a/android.js","a/ios.js","a/app_card.js","a/sponsor.js","a/video.js"],function(require,exports,module,alert){
"use strict";
function report(e,a){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+a);
}
function getWindowHeight(){
return"CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0,inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)is_need_ad=0,
js_sponsor_ad_area.style.display="none",js_bottom_ad_area.style.display="none",js_cpc_area&&js_cpc_area.style&&(js_cpc_area.style.display="none");else{
var adLS=new LS("ad");
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key),
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
function afterGetAdData(e,a){
function p(e){
if(12==e.product_type||19==e.product_type){
var a=e,p=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",t=a.app_info.apk_url||a.app_info.pkgurl||"",o=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",n=a.app_info.apk_name||a.app_info.pkg_name||"";
p=formSize(p),i=formName(i),a.app_info.app_size=p,a.app_info.app_name=i,a.app_info.apk_name=n,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=n,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=t,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=o;
var _=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:n,
url_scheme:a.app_info.url_scheme,
androiddownurl:t,
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
file_md5:o
},a);
return console.log(_),_;
}
return e;
}
function i(e){
if(12==e.product_type||19==e.product_type){
var a=e,p=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",t=a.app_info.apk_url||a.app_info.pkgurl||"",o=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",n=a.app_info.apk_name||a.app_info.pkg_name||"";
p=formSize(p),i=formName(i),a.app_info.app_size=p,a.app_info.app_name=i,a.app_info.apk_name=n,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=n,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=t,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=o;
var _=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:n,
url_scheme:a.app_info.url_scheme,
androiddownurl:t,
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
file_md5:o
},a);
return console.log(_),_;
}
return e;
}
var t={},o=e.is_need_ad,n=e._adInfo;
if(0==o)t=n,t||(t={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var _=a.advertisement_info;
t.advertisement_info=saveCopy(_);
}
t.advertisement_num=a.advertisement_num;
}
1==o&&(window._adRenderData=t),t=t||{
advertisement_num:0
};
var r=!1;
if(!t.flag&&t.advertisement_num>0){
var d=t.advertisement_num,s=t.advertisement_info;
window.adDatas.num=d;
for(var c=0;d>c;++c){
var l,m=null,f=s[c];
if(f.exp_info=f.exp_info||{},f.is_cpm=f.is_cpm||0,f.biz_info=f.biz_info||{},f.app_info=f.app_info||{},
f.pos_type=f.pos_type||0,f.logo=f.logo||"",f.use_new_protocol=f.use_new_protocol||0,
l=f.use_new_protocol)4==f.pos_type?(r=!0,f=p(f),m=f):0==f.pos_type&&(f=i(f),m=f);else if(100==f.pt||115==f.pt){
for(var u=f.exp_info.exp_value||[],g=!1,y=0,h=0;h<u.length;++h){
var v=u[h]||{};
if(1==v.exp_type&&(y=v.comm_attention_num,g=y>0),2==v.exp_type){
g=!1,y=0;
break;
}
}
f.biz_info.show_comm_attention_num=g,f.biz_info.comm_attention_num=y,m={
usename:f.biz_info.user_name,
pt:f.pt,
url:f.url,
traceid:f.traceid,
adid:f.aid,
ticket:f.ticket,
is_appmsg:!0
};
}else if(102==f.pt)m={
appname:f.app_info.app_name,
versioncode:f.app_info.version_code,
pkgname:f.app_info.apk_name,
androiddownurl:f.app_info.apk_url,
md5sum:f.app_info.app_md5,
signature:f.app_info.version_code,
rl:f.rl,
traceid:f.traceid,
pt:f.pt,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0
};else if(101==f.pt)m={
appname:f.app_info.app_name,
app_id:f.app_info.app_id,
icon_url:f.app_info.icon_url,
appinfo_url:f.app_info.appinfo_url,
rl:f.rl,
traceid:f.traceid,
pt:f.pt,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0
};else if(103==f.pt||104==f.pt||2==f.pt&&f.app_info){
var w=f.app_info.down_count||0,x=f.app_info.app_size||0,j=f.app_info.app_name||"",k=f.app_info.category,b=["万","百万","亿"];
if(w>=1e4){
w/=1e4;
for(var I=0;w>=10&&2>I;)w/=100,I++;
w=w.toFixed(1)+b[I]+"次";
}else w=w.toFixed(1)+"次";
x=formSize(x),k=k?k[0]||"其他":"其他",j=formName(j),f.app_info._down_count=w,f.app_info._app_size=x,
f.app_info._category=k,f.app_info.app_name=j,m={
appname:f.app_info.app_name,
app_rating:f.app_info.app_rating||0,
icon_url:f.app_info.icon_url,
app_id:f.app_info.app_id,
channel_id:f.app_info.channel_id,
md5sum:f.app_info.app_md5,
rl:f.rl,
pkgname:f.app_info.apk_name,
url_scheme:f.app_info.url_scheme,
androiddownurl:f.app_info.apk_url,
versioncode:f.app_info.version_code,
appinfo_url:f.app_info.appinfo_url,
traceid:f.traceid,
pt:f.pt,
url:f.url,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0,
app_info:f.app_info
};
}else if(105==f.pt){
var q=f.card_info.card_id||"",E=f.card_info.card_ext||"";
E=E.htmlDecode();
try{
E=JSON.parse(E),E.outer_str=f.card_info.card_outer_id||"",E=JSON.stringify(E);
}catch(z){
E="{}";
}
m={
card_id:q,
card_ext:E,
pt:f.pt,
ticket:f.ticket||"",
url:f.url,
rl:f.rl,
tid:f.traceid,
traceid:f.traceid,
type:f.type,
adid:f.aid,
is_appmsg:!0
};
}else if(106==f.pt){
var C=f.mp_shop_info.pid||"",O=f.mp_shop_info.outer_id||"";
m={
pid:C,
outer_id:O,
pt:f.pt,
url:f.url,
rl:f.rl,
tid:f.traceid,
traceid:f.traceid,
type:f.type,
adid:f.aid,
is_appmsg:!0
};
}else if(108==f.pt||109==f.pt||110==f.pt||116==f.pt||117==f.pt)m={
pt:f.pt,
ticket:f.ticket||"",
url:f.url,
traceid:f.traceid,
adid:f.aid,
is_appmsg:!0
},f.video_info&&(m.displayWidth=f.video_info.displayWidth,m.displayHeight=f.video_info.displayHeight,
m.thumbUrl=f.video_info.thumbUrl,m.videoUrl=f.video_info.videoUrl,m.rl=f.rl),6==f.dest_type&&Wxopen_card.startConnect(f);else if(111==f.pt||113==f.pt||114==f.pt||112==f.pt||121==f.pt||122==f.pt){
var x=f.app_info.app_size||0,j=f.app_info.app_name||"";
x=formSize(x),j=formName(j),f.app_info.app_size=x,f.app_info.app_name=j,m={
appname:f.app_info.app_name,
app_rating:f.app_info.app_rating||0,
app_id:f.app_info.app_id,
icon_url:f.app_info.icon_url,
channel_id:f.app_info.channel_id,
md5sum:f.app_info.app_md5,
rl:f.rl,
pkgname:f.app_info.apk_name,
url_scheme:f.app_info.url_scheme,
androiddownurl:f.app_info.apk_url,
versioncode:f.app_info.version_code,
appinfo_url:f.app_info.appinfo_url,
traceid:f.traceid,
pt:f.pt,
url:f.url,
ticket:f.ticket,
type:f.type,
adid:f.aid,
source:source||"",
is_appmsg:!0
};
}else 118==f.pt?(m=f,r=!0,console.log("?#$:"),Wxopen_card.startConnect(f)):119==f.pt||120==f.pt?(m=f,
Wxopen_card.startConnect(f)):125==f.pt&&(m=f,6==f.dest_type&&Wxopen_card.startConnect(f));
var A=f.image_url;
if(require("appmsg/cdn_img_lib.js"),A&&A.isCDN()&&(A=A.replace(/\/0$/,"/640"),A=A.replace(/\/0\?/,"/640?"),
f.image_url=ParseJs.addParam(A,"wxfrom","50",!0)),adDatas.ads["pos_"+f.pos_type]={
a_info:f,
adData:m
},localStorage&&localStorage.setItem&&f.app_info&&f.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+f.traceid,f.app_info.url_scheme),
f.has_installed=!1,l){
if(12==f.product_type||19==f.product_type){
console.log("pkgname:",f.app_info.apk_name),console.log(f);
var D=f.pos_type;
console.log("appPos",D),function(e,a){
console.log("appPos in",e),JSAPI.invoke("getInstallState",{
packageName:a.app_info.apk_name
},function(p){
var i=p.err_msg;
i.indexOf("get_install_state:yes")>-1&&(a.has_installed=!0,console.log("change btn","js_ad_btn_"+e),
document.getElementById("js_ad_btn_"+e)&&(document.getElementById("js_ad_btn_"+e).innerHTML="进入应用"),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
}(D,f);
}
}else f&&(104==f.pt||113==f.pt||114==f.pt||2==f.pt||122==f.pt)&&f.app_info.url_scheme&&JSAPI.invoke("getInstallState",{
packageName:f.app_info.apk_name
},function(e){
var a=e.err_msg;
a.indexOf("get_install_state:yes")>-1&&(f.has_installed=!0,document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
}
var T=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
js_sponsor_ad_area.offsetTop<e+a&&(Class.addClass(document.getElementById("js_ad_area"),"show"),
DomEvent.off(window,"scroll",T));
},B=adDatas.ads;
for(var S in B)if(0==S.indexOf("pos_")){
var m=B[S],f=!!m&&m.a_info;
if(m&&f){
if(console.log(f),0==f.pos_type){
if(f.new_appmsg=window.new_appmsg,js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,f),
111==f.pt||112==f.pt||113==f.pt||114==f.pt){
var R=document.getElementsByClassName("js_download_app_card")[0],N=R.offsetWidth,H=Math.floor(N/2.875);
H>0&&(R.style.height=H+"px");
}
}else if(3==f.pos_type){
var R=document.createElement("div");
R.appendChild(document.createTextNode(f.image_url)),f.image_url=R.innerHTML.replace(/&amp;/g,"&"),
f.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,f),
js_sponsor_ad_area.style.display="block";
var U=js_sponsor_ad_area.clientWidth;
108==f.pt||109==f.pt||110==f.pt?document.getElementById("js_main_img").style.height=U/1.77+"px":116==f.pt||117==f.pt,
DomEvent.on(window,"scroll",T),T(0);
}else 4==f.pos_type&&(console.log("test"),_checkShowCpc()&&(f=_parseExpCpc(f),console.log(f),
js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,f),console.log("show cpc")));
lazyLoadAdImg({
aid:f.aid,
type:f.pt
}),checkAdImg(f),console.log("check ios",mmversion.isIOS,f.app_info),mmversion.isIOS&&f.app_info&&f.app_info.url_scheme&&(console.log("check ios end",document.getElementById("js_promotion_tag")),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+f.pos_type)&&(document.getElementById("js_ad_btn_"+f.pos_type).innerHTML="查看应用"));
}
}
bindAdOperation();
}
is_temp_url&&document.getElementsByTagName("mpcpc").length>0&&_checkShowCpc()&&!r&&(js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,{
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
image_url:"https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiaPhsbHe4ctnlUllMCDCEIJib69wX3BUX42XagNypd2JcgyEiaoFRu4KicKF3avfRgVnWPABVTjtPRwQ/0?wx_fmt=png"
}));
}
function _parseExpCpc(e){
var a={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(a.btn_text="查看详情"),29==e.product_type||31==e.product_type?a.btn_text="查看详情":12==e.product_type||19==e.product_type?a.btn_text="下载应用":30==e.product_type&&(a.btn_text="去逛逛"),
e.has_installed&&(a.btn_text="进入应用"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var p=e.cpc_exp_info.exp_content;
try{
for(var i=JSON.parse(p.replace(/&quot;/g,'"')),t=-1,o=0;o<i.aid_list.length;o++)i.aid_list[o].aid==e.aid&&(t=o);
t>-1&&(a.icon_pos=i.icon_pos||"",a.btn_text=i.btn_text||a.btn_text,a.price=i.aid_list[t].price,
a.sale_text=i.aid_list[t].sale_text,window.__addIdKeyReport("68064",15));
}catch(n){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=a,e;
}
function _checkShowCpc(){
if(js_cpc_area){
var e=(document.documentElement.clientHeight||window.innerHeight)/2,a=js_cpc_area.offsetTop,p=document.getElementById("js_content").offsetHeight;
return e>a||e>p-a?!1:!0;
}
}
function lazyLoadAdImg(e){
for(var a=document.getElementsByClassName("js_alazy_img"),p=0;p<a.length;p++){
var i=a[p];
a[p].onload=function(){
window.__addIdKeyReport("28307",54),i.src.indexOf("retry")>-1&&window.__addIdKeyReport("28307",69);
},a[p].onerror=function(){
if(-1==i.src.indexOf("retry"))i.src=ParseJs.addParam(i.src,"retry",1);else{
window.__addIdKeyReport("28307",98);
var a="other";
mmversion.isIOS?a="iphone":mmversion.isAndroid&&(a="android"),window.setTimeout(function(){
var p=window.networkType||"unknow";
ajax({
url:"http://mp.weixin.qq.com/tp/datacenter/report?cmd=report&id=900023&os="+a+"&uin=777&aid="+e.aid+"&image_url="+encodeURIComponent(i.src)+"&type="+e.type+"&network="+p,
type:"GET",
async:!0
});
},500);
}
window.__addIdKeyReport("28307",57);
},a[p].src=a[p].dataset.src;
}
}
function getHost(e){
if(!e)return"";
var a=document.createElement("a");
return a.href=e,a.hostname;
}
function checkAdImg(e){
if(e){
var a=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],p=e.image_url||"",i=getHost(p);
return void(i&&-1==a.indexOf(i)&&window.__addIdKeyReport("28307",58));
}
}
function saveCopyArr(e){
for(var a=[],p=0;p<e.length;++p){
var i=e[p],t=typeof i;
i="string"==t?i.htmlDecode():i,"object"==t&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a.push(i);
}
return a;
}
function saveCopy(e){
var a={};
for(var p in e)if(e.hasOwnProperty(p)){
var i=e[p],t=typeof i;
i="string"==t?i.htmlDecode():i,"object"==t&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a[p]=i;
}
return a;
}
function formName(e){
for(var a=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],p=-1,i=0,t=a.length;t>i;++i){
var o=a[i],n=e.indexOf(o);
-1!=n&&(-1==p||p>n)&&(p=n);
}
return-1!=p&&(e=e.substring(0,p)),e;
}
function formSize(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
}
function seeAds(){
function debounce(e,a,p){
var i;
return function(){
var t=this,o=arguments,n=function(){
i=null,p||e.apply(t,o);
},_=p&&!i;
clearTimeout(i),i=setTimeout(n,a),_&&e.apply(t,o);
};
}
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var onScroll=debounce(function(){
for(var scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i,gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,aid=gdt_a.dataset.aid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=adDatas.ads[pos_key].a_info.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop,adHeight=gdt_a.clientHeight,adOffsetTop=offsetTop+gdt_a.offsetTop,gh_id="",pt=adDatas.ads[pos_key].a_info.pt;
adDatas.ads[pos_key]&&adDatas.ads[pos_key].a_info&&adDatas.ads[pos_key].a_info.weapp_info&&adDatas.ads[pos_key].a_info.weapp_info.original_id&&(gh_id=adDatas.ads[pos_key].a_info.weapp_info.original_id),
adDatas.ads[pos_key].ad_engine=0;
try{
exp_value=JSON.stringify(exp_value);
}catch(e){
exp_value="[]";
}
if(-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),!ping_apurl[pos_key]&&scrollTop+innerHeight>offsetTop){
ping_apurl[pos_key]=!0;
var report_arg="trace_id="+tid+"&product_type="+pt+"&logtype=2&url="+encodeURIComponent(location.href)+"&apurl="+encodeURIComponent(apurl);
tid&&mmversion.gtVersion("6.3.22",!0)&&JSAPI.invoke("adDataReport",{
ad_info:report_arg
},function(){}),log("[Ad] seeAd, tid="+tid+", aid="+aid+", pos_type="+pos_type),
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random(),
success:function(res){
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
});
}
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollTop+innerHeight>=adOffsetTop+adHeight*rh&&adOffsetTop+adHeight*(1-rh)>=scrollTop?3==pos_type?(ping_cpm_apurl_obj.hasPing=!0,
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
})):ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
});
},1001)):3!=pos_type&&ping_cpm_apurl_obj.clk&&(clearTimeout(ping_cpm_apurl_obj.clk),
ping_cpm_apurl_obj.clk=null);
}
var allReport=!0;
if(107==pt||108==pt||110==pt)for(var i=0;i<see_ad_detail_report.length;i++)if(see_ad_detail_report[i])allReport=!1;else{
var report_url=location.protocol+"//mp.weixin.qq.com/mp/ad_report?action=see_report&aid="+aid+"&tid="+tid;
if((0==i&&scrollTop+innerHeight>offsetTop+1||1==i&&scrollTop+innerHeight>offsetTop+.5*adHeight||2==i&&scrollTop+innerHeight>offsetTop+adHeight)&&((new Image).src=report_url+"&seepos="+(i+1)+"&report_type=0",
see_ad_detail_report[i]=!0),i>=3)if(scrollTop+innerHeight>offsetTop&&offsetTop+adHeight>scrollTop){
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
},500);
DomEvent.on(window,"scroll",onScroll),onScroll();
}
}
function imgReport(e){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_"+e+"_1&r="+Math.random();
}
function imgReportBadJs(e){
var a=Math.random();
.5>a&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=102&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent(e));
}
function ad_click(e,a,p,i,t,o,n,_,r,d,s,c,l,m,f,u,g,y,h){
if(!has_click[t]){
has_click[t]=!0;
var v=document.getElementById("loading_"+t);
v&&(v.style.display="inline");
var w=g.exp_info||{},x=w.exp_id||"",j=w.exp_value||[];
try{
j=JSON.stringify(j);
}catch(k){
j="[]";
}
var b="";
c&&c.weapp_info&&c.weapp_info.original_id&&(b=c.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:x,
exp_value:j,
url:encodeURIComponent(a),
tid:t,
aid:_,
rl:encodeURIComponent(p),
__biz:biz,
pos_type:d,
pt:r,
pos_x:l,
pos_y:m,
ad_w:f,
ad_h:u,
gh_id:b,
press_interval:window.__a_press_interval||-1
},function(){
function p(e,a,p,i,t,n,_,r,d,s,c){
if(console.log("handleApp",c),c&&c.has_installed&&-1==e.indexOf("itunes.apple.com")&&c.app_info.url_scheme)return void JSAPI.invoke("launchApplication",{
schemeUrl:c.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=c.app_info.url_scheme);
});
if(0==e.indexOf("https://itunes.apple.com/")||0==e.indexOf("http://itunes.apple.com/"))return c.app_info&&c.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:c.app_info.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):JSAPI.invoke("downloadAppInternal",{
appUrl:e
},function(a){
a.err_msg&&-1!=a.err_msg.indexOf("ok")||(console.log("http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+o+"#wechat_redirect"),
location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+o+"#wechat_redirect");
}),!1;
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var l={
source:4,
tid:a,
idx:p,
mid:i,
appuin:t,
pt:n,
aid:_,
ad_engine:r,
pos_type:d
},m=window.__report;
if(s||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var f="",u="";
s&&(f=s.pkgname&&s.pkgname.replace(/\./g,"_"),u=s.channel_id||""),l={
source:4,
tid:a,
traceid:a,
mid:i,
idx:p,
appuin:t,
pt:n,
channel_id:u,
aid:_,
engine:r,
pos_type:d,
pkgname:f
};
}
e=URL.join(e,l),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:_,
engine:r
})),!_&&m&&m(80,e);
}
location.href=e;
}
function i(e,a,p,i,t,o,n,_,r,d){
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var s={
source:4,
tid:a,
idx:p,
mid:i,
appuin:t,
pt:o,
aid:n,
ad_engine:_,
pos_type:r
},c=window.__report;
if(("104"==o||"113"==o||"114"==o||"122"==o)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var l="",m="";
d&&(l=d.pkgname&&d.pkgname.replace(/\./g,"_"),m=d.channel_id||""),s={
source:4,
tid:a,
traceid:a,
mid:i,
idx:p,
appuin:t,
pt:o,
channel_id:m,
aid:n,
engine:_,
pos_type:r,
pkgname:l
};
}
e=URL.join(e,s),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:n,
engine:_
})),!n&&c&&c(80,e);
}
location.href=e;
}
if(has_click[t]=!1,v&&(v.style.display="none"),g.canvas_info)return void JSAPI.invoke("openADCanvas",{
canvasId:g.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:d
}),
adInfoXml:g.canvas_info.ad_info_xml
},function(e){
0!=e.ret?(location.href=a,report(135,y)):report(134,y);
});
if(h)1==g.dest_type?i(a,t,idx,mid,biz,r,_,s,d,c,g):(12==g.product_type||19==g.product_type)&&p(a,t,idx,mid,biz,r,_,s,d,c,g);else if("5"==e)location.href="/mp/profile?source=from_ad&tousername="+a+"&ticket="+o+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+t;else{
if("105"==r&&c)return void Card.openCardDetail(c.card_id,c.card_ext,c);
if("106"==r&&c)return void(location.href=ParseJs.join(a,{
outer_id:c.outer_id
}));
if("118"==r||"119"==r||"120"==r)return void Wxopen_card.openWxopen(c);
if("125"==r&&6==g.dest_type)return void Wxopen_card.openWxopen(c);
if(g&&g.has_installed&&("104"==r||"113"==r||"114"==r||"122"==r||"2"==r&&-1==a.indexOf("itunes.apple.com"))&&g.app_info.url_scheme)return void JSAPI.invoke("launchApplication",{
schemeUrl:g.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=g.app_info.url_scheme);
});
if(0==a.indexOf("https://itunes.apple.com/")||0==a.indexOf("http://itunes.apple.com/"))return g.app_info&&g.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:g.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=a);
}):JSAPI.invoke("downloadAppInternal",{
appUrl:a
},function(e){
e.err_msg&&-1!=e.err_msg.indexOf("ok")||(location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(a)+"&ticket="+o+"#wechat_redirect");
}),!1;
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var n={
source:4,
tid:t,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:_,
ad_engine:s,
pos_type:d
},l=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&c||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",f="";
c&&(m=c.pkgname&&c.pkgname.replace(/\./g,"_"),f=c.channel_id||""),n={
source:4,
tid:t,
traceid:t,
mid:mid,
idx:idx,
appuin:biz,
pt:r,
channel_id:f,
aid:_,
engine:s,
pos_type:d,
pkgname:m
};
}
a=URL.join(a,n),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=URL.join(a,{
traceid:t,
aid:_,
engine:s
})),!_&&l&&l(80,a);
}
location.href=a;
}
});
}
}
function bindAdOperation(){
seeAds();
for(var e=0;total_pos_type>e;++e)!function(e){
var a="pos_"+e,p=el_gdt_areas[a];
if(!p)return!1;
if(!p.getElementsByClassName&&p.style)return p.style.display="none",!1;
var i=p.getElementsByClassName("js_ad_link")||[],t=adDatas.ads[a];
if(t){
for(var o=t.adData,n=t.a_info,_=n.pos_type,r=t.ad_engine,d=0,s=i.length;s>d;++d)!function(e,a){
var p=i[e],t=p.dataset;
if(t&&3!=n.pos_type){
var o=t.type,d=t.url,s=t.rl,c=t.apurl,l=t.tid,m=t.ticket,f=t.group_id,u=t.aid,g=t.pt,y=n.use_new_protocol,h=!0;
console.log("js click data: ",t),console.log("js click data: ",n),!y||12!=n.product_type&&19!=n.product_type||(h=!1,
console.log("js dom event type: ",h)),DomEvent.on(p,"click",function(e){
var p=!!e&&e.target;
if(p&&"js_ad_btn"==p.id);else if(!p||!p.className||-1==p.className.indexOf("js_ad_btn")&&-1==p.className.indexOf("js_btn_process")&&-1==p.className.indexOf("js_muted_btn")&&-1==p.className.indexOf("js_poster_cover")){
if(a){
a.adid=window.adid||a.adid||a.aid;
var i="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+r+"&pos_type="+_+"&r="+Math.random();
n&&n.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?report(114,i):"103"==a.pt||"111"==a.pt||"112"==a.pt?report(23,i):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&report(25,i);
}
var t,h,v,w;
return t=position.getX(p,"js_ad_link")+e.offsetX,h=position.getY(p,"js_ad_link")+e.offsetY,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
w=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(o,d,s,c,l,m,f,u,g,_,r,a,t,h,v,w,n,i,y),log("[Ad] ad_click: type="+o+", url="+d+", rl="+s+", apurl="+c+", traceid="+l+", ticket="+m+", group_id="+f+", aid="+u+", pt="+g+", pos_type="+_+", ad_engine="+r),
!1;
}
},h),DomEvent.on(p,"touchstart",function(){
console.log("touchstart",+new Date),window.__a_press_interval=+new Date;
}),DomEvent.on(p,"touchend",function(){
console.log("touchend",+new Date),window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(d,o);
if(o){
o.adid=window.adid||o.adid||o.aid;
var c=n.exp_info||{},l=c.exp_id||"",m=c.exp_value||[];
try{
m=JSON.stringify(m);
}catch(f){
m="[]";
}
var u="&tid="+o.traceid+"&uin="+uin+"&key="+key+"&ticket="+(o.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+o.adid+"&ad_engine="+r+"&pos_type="+_+"&exp_id="+l+"&exp_value="+m+"&r="+Math.random();
if(o.report_param=u,o.use_new_protocol){
if(12==n.product_type||19==n.product_type){
var g=require("a/app_card.js"),y=15,h=o.pkgname&&o.pkgname.replace(/\./g,"_"),v=document.getElementById("js_ad_btn_"+_);
new g({
btn:v,
adData:o,
report_param:u,
pos_type:_,
url_scheme:o.url_scheme,
via:[o.traceid,o.adid,h,source,y,r].join("."),
ticket:o.ticket,
appdetail_params:["&aid="+o.adid,"traceid="+o.traceid,"pkgname="+h,"source="+source,"type="+y,"engine="+r,"appuin="+biz,"pos_type="+_,"ticket="+o.ticket,"scene="+scene].join("&"),
engine:r
});
}
if(9==n.material_type){
n.report_param=u;
var w=require("a/video.js");
console.log("video_info",n),new w(n),console.log("new video loaded");
}
}else{
if("100"==o.pt||"115"==o.pt){
var x=require("a/profile.js");
return void new x({
btnViewProfile:document.getElementById("js_view_profile_"+_),
btnAddContact:document.getElementById("js_add_contact_"+_),
adData:o,
pos_type:_,
report_param:u,
aid:o.adid,
ad_engine:r
});
}
if("102"==o.pt){
var j=require("a/android.js"),y=15,h=o.pkgname&&o.pkgname.replace(/\./g,"_");
return void new j({
btn:document.getElementById("js_app_action_"+_),
adData:o,
report_param:u,
task_ext_info:[o.adid,o.traceid,h,source,y,r].join("."),
via:[o.traceid,o.adid,h,source,y,r].join(".")
});
}
if("101"==o.pt){
var k=require("a/ios.js");
return void new k({
btn:document.getElementById("js_app_action_"+_),
adData:o,
ticket:o.ticket,
report_param:u
});
}
if("105"==o.pt)return void new Card({
btn:document.getElementById("js_card_action_"+_),
adData:o,
report_param:u,
pos_type:_
});
if("106"==o.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+_),
adData:o,
report_param:u,
pos_type:_
});
if("103"==o.pt||"104"==o.pt||"111"==o.pt||"112"==o.pt||"113"==o.pt||"114"==o.pt||"121"==o.pt||"122"==o.pt){
var g=require("a/app_card.js"),y=15,h=o.pkgname&&o.pkgname.replace(/\./g,"_");
return void new g({
btn:document.getElementById("js_appdetail_action_"+_),
js_app_rating:document.getElementById("js_app_rating_"+_),
adData:o,
report_param:u,
pos_type:_,
url_scheme:o.url_scheme,
via:[o.traceid,o.adid,h,source,y,r].join("."),
ticket:o.ticket,
appdetail_params:["&aid="+o.adid,"traceid="+o.traceid,"pkgname="+h,"source="+source,"type="+y,"engine="+r,"appuin="+biz,"pos_type="+_,"ticket="+o.ticket,"scene="+scene].join("&"),
engine:r
});
}
if("108"==o.pt||"109"==o.pt||"110"==o.pt||"116"==o.pt||"117"==o.pt){
var b=require("a/sponsor.js");
new b({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adData:o,
a_info:n,
pos_type:_,
report_param:u
});
}
if("118"==n.pt&&(o.report_param=u),"125"==n.pt){
n.report_param=u,console.log("old video info");
var w=require("a/video.js");
new w(n);
}
}
}
}
}(e);
}
function extend(e,a){
for(var p in a)e[p]=a[p];
return e;
}
var mmversion=require("biz_wap/utils/mmversion.js"),js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),js_cpc_area=document.getElementsByTagName("mpcpc"),gdt_pos_4={};
js_cpc_area.length>0?(js_cpc_area=document.getElementsByTagName("mpcpc")[0],gdt_pos_4=js_cpc_area.getElementsByClassName("js_ad_link")):js_cpc_area=void 0;
var pos_type=window.pos_type||0,__report=window.__report,total_pos_type=5,el_gdt_areas={
pos_4:js_cpc_area,
pos_3:js_sponsor_ad_area,
pos_0:js_bottom_ad_area
},gdt_as={
pos_4:gdt_pos_4,
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
},isScroll=!1,isSee=!1;
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("a/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),Wxopen_card=require("a/wxopen_card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),ParseJs=require("biz_common/utils/url/parse.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),cpc_a_tpl=require("a/cpc_a_tpl.html.js"),Report=require("biz_common/utils/report.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),ParseJs=require("biz_common/utils/url/parse.js"),log=require("appmsg/log.js"),ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1,
pos_4:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{},
pos_4:{}
},ping_test_apurl={
pos_0:[],
pos_1:[],
pos_3:[],
pos_4:[]
},see_ad_detail_report=[!1,!1,!1,!1,!1,!1],see_ad_detail_first_see_time=0,ping_test_apurl_random=Math.random()<.3,innerHeight=window.innerHeight||document.documentElement.clientHeight,innerHeight_new=getWindowHeight(),ad_engine=0,keyOffset="https:"==location.protocol?5:0;
return{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});
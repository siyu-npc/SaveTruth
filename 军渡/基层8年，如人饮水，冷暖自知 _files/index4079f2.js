!function(n){
"use strict";
function t(n,t){
var r=(65535&n)+(65535&t),u=(n>>16)+(t>>16)+(r>>16);
return u<<16|65535&r;
}
function r(n,t){
return n<<t|n>>>32-t;
}
function u(n,u,e,o,c,f){
return t(r(t(t(u,n),t(o,f)),c),e);
}
function e(n,t,r,e,o,c,f){
return u(t&r|~t&e,n,t,o,c,f);
}
function o(n,t,r,e,o,c,f){
return u(t&e|r&~e,n,t,o,c,f);
}
function c(n,t,r,e,o,c,f){
return u(t^r^e,n,t,o,c,f);
}
function f(n,t,r,e,o,c,f){
return u(r^(t|~e),n,t,o,c,f);
}
function i(n,r){
n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;
var u,i,h,a,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;
for(u=0;u<n.length;u+=16)i=l,h=d,a=v,g=C,l=e(l,d,v,C,n[u],7,-680876936),C=e(C,l,d,v,n[u+1],12,-389564586),
v=e(v,C,l,d,n[u+2],17,606105819),d=e(d,v,C,l,n[u+3],22,-1044525330),l=e(l,d,v,C,n[u+4],7,-176418897),
C=e(C,l,d,v,n[u+5],12,1200080426),v=e(v,C,l,d,n[u+6],17,-1473231341),d=e(d,v,C,l,n[u+7],22,-45705983),
l=e(l,d,v,C,n[u+8],7,1770035416),C=e(C,l,d,v,n[u+9],12,-1958414417),v=e(v,C,l,d,n[u+10],17,-42063),
d=e(d,v,C,l,n[u+11],22,-1990404162),l=e(l,d,v,C,n[u+12],7,1804603682),C=e(C,l,d,v,n[u+13],12,-40341101),
v=e(v,C,l,d,n[u+14],17,-1502002290),d=e(d,v,C,l,n[u+15],22,1236535329),l=o(l,d,v,C,n[u+1],5,-165796510),
C=o(C,l,d,v,n[u+6],9,-1069501632),v=o(v,C,l,d,n[u+11],14,643717713),d=o(d,v,C,l,n[u],20,-373897302),
l=o(l,d,v,C,n[u+5],5,-701558691),C=o(C,l,d,v,n[u+10],9,38016083),v=o(v,C,l,d,n[u+15],14,-660478335),
d=o(d,v,C,l,n[u+4],20,-405537848),l=o(l,d,v,C,n[u+9],5,568446438),C=o(C,l,d,v,n[u+14],9,-1019803690),
v=o(v,C,l,d,n[u+3],14,-187363961),d=o(d,v,C,l,n[u+8],20,1163531501),l=o(l,d,v,C,n[u+13],5,-1444681467),
C=o(C,l,d,v,n[u+2],9,-51403784),v=o(v,C,l,d,n[u+7],14,1735328473),d=o(d,v,C,l,n[u+12],20,-1926607734),
l=c(l,d,v,C,n[u+5],4,-378558),C=c(C,l,d,v,n[u+8],11,-2022574463),v=c(v,C,l,d,n[u+11],16,1839030562),
d=c(d,v,C,l,n[u+14],23,-35309556),l=c(l,d,v,C,n[u+1],4,-1530992060),C=c(C,l,d,v,n[u+4],11,1272893353),
v=c(v,C,l,d,n[u+7],16,-155497632),d=c(d,v,C,l,n[u+10],23,-1094730640),l=c(l,d,v,C,n[u+13],4,681279174),
C=c(C,l,d,v,n[u],11,-358537222),v=c(v,C,l,d,n[u+3],16,-722521979),d=c(d,v,C,l,n[u+6],23,76029189),
l=c(l,d,v,C,n[u+9],4,-640364487),C=c(C,l,d,v,n[u+12],11,-421815835),v=c(v,C,l,d,n[u+15],16,530742520),
d=c(d,v,C,l,n[u+2],23,-995338651),l=f(l,d,v,C,n[u],6,-198630844),C=f(C,l,d,v,n[u+7],10,1126891415),
v=f(v,C,l,d,n[u+14],15,-1416354905),d=f(d,v,C,l,n[u+5],21,-57434055),l=f(l,d,v,C,n[u+12],6,1700485571),
C=f(C,l,d,v,n[u+3],10,-1894986606),v=f(v,C,l,d,n[u+10],15,-1051523),d=f(d,v,C,l,n[u+1],21,-2054922799),
l=f(l,d,v,C,n[u+8],6,1873313359),C=f(C,l,d,v,n[u+15],10,-30611744),v=f(v,C,l,d,n[u+6],15,-1560198380),
d=f(d,v,C,l,n[u+13],21,1309151649),l=f(l,d,v,C,n[u+4],6,-145523070),C=f(C,l,d,v,n[u+11],10,-1120210379),
v=f(v,C,l,d,n[u+2],15,718787259),d=f(d,v,C,l,n[u+9],21,-343485551),l=t(l,i),d=t(d,h),
v=t(v,a),C=t(C,g);
return[l,d,v,C];
}
function h(n){
var t,r="";
for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);
return r;
}
function a(n){
var t,r=[];
for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;
for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;
return r;
}
function g(n){
return h(i(a(n),8*n.length));
}
function l(n,t){
var r,u,e=a(n),o=[],c=[];
for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),r=0;16>r;r+=1)o[r]=909522486^e[r],
c[r]=1549556828^e[r];
return u=i(o.concat(a(t)),512+8*t.length),h(i(c.concat(u),640));
}
function d(n){
var t,r,u="0123456789abcdef",e="";
for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+=u.charAt(t>>>4&15)+u.charAt(15&t);
return e;
}
function v(n){
return unescape(encodeURIComponent(n));
}
function C(n){
return g(v(n));
}
function s(n){
return d(C(n));
}
function A(n,t){
return l(v(n),v(t));
}
function m(n,t){
return d(A(n,t));
}
n.md5=function(n,t,r){
return t?r?A(t,n):m(t,n):r?C(n):s(n);
};
}("function"==typeof jQuery?jQuery:this);define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/appdialog_confirm.js","biz_wap/utils/openUrl.js","biz_common/utils/url/parse.js"],function(a,t,n,e){
"use strict";
function o(a){
"undefined"!=typeof u&&u.log&&u.log(a);
}
function d(a,t){
u.invoke("downloadAppInternal",{
appUrl:a
},function(n){
n.err_msg&&-1!=n.err_msg.indexOf("ok")||w("http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(a)+"&ticket="+t+"#wechat_redirect");
});
}
function s(a){
this.g={
app_status:"download",
btn:null,
download_id:0,
clock:null,
install_clock:null,
data:{},
channelid:"",
via:"",
report_param:"",
appdetail_params:"",
btn_percent:0,
btn_width:0,
btn_height:0
};
var t=this,n=this.g;
if(n.btn=a.btn,!n.btn)return!1;
n.data=a.adData,n.url_scheme=a.url_scheme,n.appdetail_params=a.appdetail_params||"",
n.percentStatus=a.percentStatus;
var s={};
n.channelid=n.data.channel_id||"",n.report_param=a.report_param;
var r=20;
if(("103"==n.data.pt||"104"==n.data.pt)&&t.setAppRating(a),"104"==n.data.pt||"113"==n.data.pt||"114"==n.data.pt||"122"==n.data.pt||n.data.use_new_protocol>0&&12==n.data.product_type){
var l=n.data.androiddownurl;
if(l&&l.match){
var c=/&channelid\=([^&]*)/,w=l.match(c);
w&&w[1]&&(n.channelid=w[1],n.data.androiddownurl=l.replace(c,""));
}
n.channelid&&(n.channelid="&channelid="+n.channelid),a.via&&(n.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
u.ready(function(){
console.log("appcard info",n),("113"==n.data.pt||"114"==n.data.pt||"104"==n.data.pt||"122"==n.data.pt||n.data.use_new_protocol>0&&12==n.data.product_type)&&(u.invoke("getInstallState",{
packageName:b
},function(a){
var t=a.err_msg;
o("getInstallState @yingyongbao : "+t);
var n=t.lastIndexOf("_")+1,e=t.substring(n);
1*e>=k&&t.indexOf("get_install_state:yes")>-1&&(h=!0);
}),u.invoke("getInstallState",{
packageName:n.data.pkgname
},function(a){
var e=a.err_msg;
o("getInstallState @"+n.data.pkgname+" : "+e);
var d=e.lastIndexOf("_")+1,s=e.substring(d);
e.indexOf("get_install_state:yes")>-1&&t.setBtn(1*s>=n.data.versioncode&&n.url_scheme?"gotodetail":"installed");
})),console.log("bind btn",n.btn.id),i.on(n.btn,"click",function(i){
if(console.log("app click",n),console.log(i.target),"installed"==n.app_status)return t.setBtn("installed"),
!1;
if("gotodetail"==n.app_status)return t.report(74),t.gotoDetail(),!1;
if("downloading"==n.app_status)return t.report(71),t.pauseDownload(),!1;
if("paused"==n.app_status)return t.report(72),t.resumeDownload(),!1;
if("downloaded"==n.app_status)return t.report(73),u.invoke("installDownloadTask",{
download_id:n.download_id,
file_md5:n.data.md5sum
},function(a){
var d=a.err_msg;
o("installDownloadTask : "+d),d.indexOf("install_download_task:ok")>-1?n.install_clock=setInterval(t.installStateChange.bind(t),500):e("安装失败！");
}),!1;
var l=function(){
if("103"==n.data.pt||"111"==n.data.pt||"112"==n.data.pt||"121"==n.data.pt||n.data.use_new_protocol>0&&19==n.data.product_type){
t.report(23);
var s=n.data.ticket||window.ticket;
n.url_scheme&&m.gtVersion("6.5.6",!0)?u.invoke("launchApplication",{
schemeUrl:n.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&d(n.data.appinfo_url,s);
}):d(n.data.appinfo_url,s);
}else{
if(h)return t.report(16),void(location.href="tmast://download?oplist=1,2&pname="+n.data.pkgname+n.channelid+n.via);
t.report(15);
var i=[n.data.adid,n.data.traceid,(n.data.pkgname||"").replace(/\./g,"_"),n.data.source,r,a.engine].join("."),l=function(a,t,n){
console.log("addDownloadTask : "+a.data.appname+","+a.data.androiddownurl+","+t+","+a.data.md5sum),
u.invoke("addDownloadTaskStraight",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},function(e){
var o=e.err_msg;
o.indexOf("ok")>-1?n&&n(e):u.invoke("addDownloadTask",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},n);
}),a.url_scheme&&m.isAndroid&&m.gtVersion("6.5.6",!0)&&u.invoke("writeCommData",{
packageName:a.data.pkgname,
data:a.url_scheme
},function(a){
console.log(a);
});
};
console.log("addDownloadTask : "+n.data.appname+","+n.data.androiddownurl+","+i+","+n.data.md5sum),
l(n,i,function(a){
var d=a.err_msg;
o("addDownloadTask : "+d),d.indexOf("ok")>-1?(n.download_id=a.download_id,y[n.download_id]=t,
o("download_id : "+n.download_id),t.setBtn("downloading"),n.clock=setInterval(t.queryDownloadState.bind(t),500),
n.install_clock=setInterval(t.installStateChange.bind(t),500),t.changeDownloadState()):e("调用下载器失败！");
});
}
},c=function(){
return m.isIOS?void l():void g({
app_name:n.data.appname,
app_img_url:n.data.icon_url,
onOk:function(){
l(),t.report(h?106:100);
},
onCancel:function(){
t.report(h?107:101);
}
});
};
if("download"==n.app_status&&n.data.rl&&n.data.traceid){
if(!s[n.data.traceid]){
s[n.data.traceid]=!0;
var w,f,b,k,v=!!i&&i.target;
v&&(w=_.getX(v,"js_ad_link")+i.offsetX,f=_.getY(v,"js_ad_link")+i.offsetY,b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
k=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
p({
type:n.data.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(n.data.androiddownurl),
tid:n.data.traceid,
rl:encodeURIComponent(n.data.rl),
__biz:biz,
pos_type:a.pos_type||0,
pt:n.data.pt,
pos_x:w,
pos_y:f,
ad_w:b||0,
ad_h:k||0
},function(){
s[n.data.traceid]=!1,c();
});
}
}else c();
return!1;
});
});
}
var i=a("biz_common/dom/event.js"),r=a("biz_common/dom/class.js"),l=a("a/a_report.js"),p=l.AdClickReport,_=a("biz_wap/utils/position.js"),c=a("biz_common/utils/report.js"),u=a("biz_wap/jsapi/core.js"),m=a("biz_wap/utils/mmversion.js"),g=a("a/appdialog_confirm.js"),w=a("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,f={
download:"下载",
downloading:"下载中",
paused:"继续",
downloaded:"安装",
gotodetail:"进入",
installed:"已安装"
},h=!1,b="com.tencent.android.qqdownloader",k=1060125,v=!1,y={};
return s.prototype.report=function(a){
var t=this.g;
c("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+t.report_param);
},s.prototype.setBtn=function(a,t){
var n=this.g,e=n.data.pt;
if(n.app_status=a,n.percentStatus)return n.percentStatus(a,t),!1;
if("downloading"===a){
t=t||0;
var o="";
if(n.btn_width=n.btn.offsetWidth,n.btn_height=n.btn.offsetHeight,104===e?o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停('+t+"%)</span>":113===e||114===e?n.btn.innerHTML.indexOf("继续")>-1?(o=n.btn.innerHTML,
o=o.replace("继续","暂停")):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停</span>':122===e?(n.btn.innerHTML.indexOf("继续")>-1?(o=n.btn.innerHTML,
o=o.replace(/继续/g,"暂停")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+n.btn_width+'px;">暂停</span></span>暂停',
n.btn_percent=t):1===n.data.use_new_protocol?(n.btn_width=n.btn.offsetWidth,n.btn_height=n.btn.offsetHeight,
n.btn.innerHTML.indexOf("继续")>-1?(o=n.btn.innerHTML,o=o.replace(/继续/g,"暂停")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+n.btn_width+"px; line-height: "+n.btn_height+'px">暂停下载</span></span>暂停下载',
n.btn_percent=t):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">'+t+"%</span>",
!o)return;
n.btn.innerHTML=o,122===e||1===n.data.use_new_protocol?r.addClass(n.btn,"btn_progress"):r.addClass(n.btn,"with_processor");
}else if("paused"===a){
var o="";
104===e||113===e||114===e||122===e||n.data.use_new_protocol>0?(o=n.btn.innerHTML,
o=o.replace(/暂停/g,"继续"),n.btn.innerHTML=o):(r.removeClass(n.btn,"with_processor"),
r.removeClass(n.btn,"btn_progress"),n.btn.innerHTML=f[a]);
}else r.removeClass(n.btn,"with_processor"),r.removeClass(n.btn,"btn_progress"),
n.btn.innerHTML=f[a],n.data.use_new_protocol>0&&"gotodetail"===a&&(n.btn.innerHTML="进入应用");
},s.prototype.setAppRating=function(a){
var t=this.g,n=a.js_app_rating,e=1*t.data.app_rating;
e>5&&(e=5),0>e&&(e=0);
var o=["","one","two","three","four","five"],d="",s=Math.floor(e);
if(d="star_"+o[s],e>s&&(e=s+.5,d+="_half"),n&&e>0){
var i=n.getElementsByClassName("js_stars"),l=n.getElementsByClassName("js_scores");
i&&l&&i[0]&&l[0]&&(i=i[0],l=l[0],i.style.display="inline-block",r.addClass(i,d));
}
},s.prototype.changeDownloadState=function(){
if(!v){
{
this.g;
}
v=!0,u.on("wxdownload:progress_change",function(a){
y[a.download_id]&&y[a.download_id].setBtn("downloading",a.progress);
});
}
},s.prototype.queryDownloadState=function(){
var a=this.g,t=this;
a.download_id&&u.invoke("queryDownloadTask",{
download_id:a.download_id
},function(n){
if(o("queryDownloadTask : "+n.state+"; dowloadid = "+a.download_id),n&&n.state){
if("download_succ"==n.state&&(t.setBtn("downloaded"),window.clearInterval(a.clock)),
"downloading"==n.state)return;
"download_fail"==n.state&&(window.clearInterval(a.clock),window.clearInterval(a.install_clock),
e("下载失败"),t.setBtn("download"));
}
});
},s.prototype.installStateChange=function(){
var a=this.g,t=this;
u.invoke("getInstallState",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(n){
var e=n.err_msg;
e.indexOf("get_install_state:yes")>-1&&(o("getInstallState @app, version : "+e),
window.clearInterval(a.install_clock),t.setBtn(a.url_scheme?"gotodetail":"installed"));
});
},s.prototype.pauseDownload=function(){
var a=this.g,t=this;
u.invoke("pauseDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("pause_download_task:ok")>-1&&t.setBtn("paused");
});
},s.prototype.resumeDownload=function(){
var a=this.g,t=this;
u.invoke("resumeDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("ok")>-1&&t.setBtn("downloading");
});
},s.prototype.gotoDetail=function(){
var t=this.g;
if(104==t.data.pt||113==t.data.pt||114==t.data.pt||122==t.data.pt||t.data.use_new_protocol>0&&12==t.data.product_type&&t.url_scheme)m.gtVersion("6.5.6",!0)?u.invoke("launchApplication",{
schemeUrl:t.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=t.url_scheme);
}):location.href=t.url_scheme;else{
var n=t.data.url,e=a("biz_common/utils/url/parse.js");
(!n||0!=n.indexOf("http://mp.weixin.qq.com/tp/")&&0!=n.indexOf("https://mp.weixin.qq.com/tp/"))&&(n="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+t.data.app_id+(t.appdetail_params||"")+"&channel_id="+t.channelid+"&md5sum="+t.data.md5sum+"#wechat_redirect"),
t.url_scheme&&(n=e.join(n,{
is_installed:"1"
})),w(n);
}
},s;
});define("a/a_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n        <#if(window.new_appmsg){#>\n        <div class="weui-loadmore weui-loadmore_line mod_title_context_primary mpad_more_container">\n            <span class="weui-loadmore__tips js_ad_opt_list_btn_<#=pos_type#>">Ad                <!--投诉入口 begin-->\n                <div class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="display:none"<#}#>>\n                    <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                            <li class="mpad_more_list_ele">\n                                <a class="mpad_more_list_ele_container  js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                            </li>\n                    </ul>\n                </div>\n                <!--投诉入口 end-->\n            </span>\n        </div>\n        <#}else{#>\n        <div class="rich_tips with_line title_tips mpad_more_center_container">\n            <span class="tips js_ad_opt_list_btn_<#=pos_type#>">Ad</span>\n            <!--投诉入口 begin-->\n            <div class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>">\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                </ul>\n            </div>\n            <!--投诉入口 end-->\n        </div>\n        <# } #>\n    <# } #>\n    <div class="js_ad_link extra_link <# if(pt==107){ #>preview_img_primary<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(!use_new_protocol){ #>\n            <# if(pt==1){ #>\n                <#=hint_txt#>\n                <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n                <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n            <# }else if(pt==2||pt==107||pt==119){ #>\n                <!--第三方logo-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n                <# } #>\n                <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                <# if(watermark_type!=0){ #>\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(pt==119){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if(watermark_type==1){ #>\n                        商品推广\n                    <# }else if (watermark_type==2){ #>\n                        活动推广\n                    <# }else if (watermark_type==3){ #>\n                        <#=longAppBtnText#>\n                    <# }else if (watermark_type==7){ #>\n                        小游戏推广\n                    <# }else if (watermark_type==8){ #>\n                        进入小游戏\n                    <# } #>\n                    </i>\n                <# } #>\n            <# }else if(pt==7||pt==120){ #>\n            <!-- 图文 -->\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_group_title2"><#=hint_txt#></strong>\n                        <div class="preview_group_desc"><#=ad_desc#></div>\n                        <img data-src="<#=image_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <i class="promotion_tag">\n                        <# if(pt==120){ #>\n                        <span class="icon26_weapp_white"></span>\n                        <# } #>\n\n                        <# if (watermark_type==7){ #>\n                            小游戏推广\n                        <# }else if (watermark_type==8){ #>\n                            进入小游戏\n                        <# }else{ #>\n                            活动推广\n                        <# } #>\n                    </i>\n                </div>\n            </div>\n            <# }else if(pt==115){ #>\n            <div class="preview_group mod_follow_with_img">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=biz_info.head_img#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=biz_info.nick_name#></strong>\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">查看</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn" style="z-index: 2;">关注</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==100){ #>\n            <div class="preview_group follow <# if(!!biz_info.show_comm_attention_num){ #>with_tips<# } #>">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <# if(!!biz_info.show_comm_attention_num){ #>\n                        <div class="preview_group_desc weak_tips">有<#=biz_info.comm_attention_num#>个好友关注</div>\n                        <# } #>\n                        <# if(!!biz_info.head_img){ #>\n                        <img data-src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius js_alazy_img" >\n                        <# }else{ #>\n                        <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>" >\n                        <# } #>\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn">查看</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn">关注</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==102){ #>\n            <div class="preview_group">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download"><#=shortAppBtnText#></a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==101){ #>\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn"><#=shortAppBtnText#></a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==103||pt==104){ #>\n            <div class="preview_group obvious_app">\n                <div class="preview_group_inner">\n                    <div class="pic_app">\n                        <img data-src="<#=image_url#>" alt="" class="js_alazy_img">\n                    </div>\n                    <div class="info_app">\n                        <p class="name_app"><#=app_info.app_name#></p>\n                        <# if(pt==103){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                        <# } else if(pt==104){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                        <# } #>\n                        <!--星级评分-->\n                        <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                            <!--\n                                半星：star_half\n                                一星：star_one\n                                一星半：star_one_half\n                                二星：star_two\n                                三星：star_three\n                                四星：star_four\n                                五星：star_five\n                            -->\n                            <span class="js_stars stars" style="display:none;"></span>\n                            <!--暂无评分\n                            <span class="scores">3.5</span>\n                            -->\n                            <span class="js_scores scores"></span>\n                        </p>\n                        <div class="dm_app">\n                            <a id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn"><#=shortAppBtnText#></a>\n                            <p class="extra_info">来自<# if(pt==103){ #>App Store<# }else{ #>腾讯应用宝<# } #></p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==105){ #>\n            <div class="mpda_card cardticket">\n                <div class="cardticket_hd cell">\n                    <div class="cell_hd">\n                        <span class="radius_avatar">\n                            <img class="avatar js_alazy_img" data-src="<#=card_info.card_logo_url#>" >\n                        </span>\n                    </div>\n                    <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                    <div class="cell_ft">\n                        <a class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">领券</a>\n                    </div>\n                </div>\n                <div class="cardticket_ft">\n                    <div class="cardticket_theme"></div>\n                    <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n                </div>\n            </div>\n            <# }else if(pt==106){ #>\n            <!-- 小店广告 -->\n            <div class="preview_group preview_card preview_shop_card">\n                <div class="preview_group_inner shop_card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_shop_card_title"><#=mp_shop_info.name#></strong>\n                        <div class="preview_shop_card_desc">\n                            <span class="preview_card_desc_meta btn_plain_primary preview_shop_card_btn_buy js_ad_btn" id="js_shop_action_<#=pos_type#>">购买</span>\n                            <span class="preview_card_desc_meta preview_shop_card_oldprice">&yen;<#=mp_shop_info.ori_price/100#></span>\n                            <span class="preview_card_desc_meta preview_shop_card_price">&yen;<#=mp_shop_info.cur_price/100#></span>\n                        </div>\n                        <img data-src="<#=mp_shop_info.img#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==111||pt==113||pt==112||pt==114){ #>\n            <!-- 背景高斯模糊带描述文字、带背景图的app下载 -->\n            <div class="preview_group download_app_with_desc js_download_app_card">\n                <div class="preview_group_inner" style="background-image:url(<#=image_url#>)">\n                    <div class="preview_group_hd">\n                        <div class="preview_group_hd_inner">\n                            <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                            <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                            <a id="js_appdetail_action_<#=pos_type#>" class="preview_group_btn js_ad_btn"><#=shortAppBtnText#></a>\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">继续</a>\n                            <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">打开</a> -->\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn with_processor"><i class="btn_processor" style="width:35%;"></i><span class="btn_processor_value">35%</span></a> -->\n                        </div>\n                    </div>\n                    <# if(pt==111||pt==113){ #>\n                    <div class="preview_group_bd">\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[0]#></div>\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[1] || ""#></div>\n                    </div>\n                    <div class="preview_group_ft"><div class="preview_group_download_info"><span class="download_size" ><#=app_info.app_size#></span>&nbsp;来自<# if(pt==111){ #>App Store<# }else{ #>腾讯应用宝<# } #></div></div>\n                    <# } #>\n                </div>\n            </div>\n            <# }else if(pt==122||pt==121){ #>\n            <!-- app下载类广告 -->\n            <!--117 新卡片 begin -->\n            <div class="preview_group mod_method117">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=app_info.icon_url#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=app_info.app_name#></strong>\n                        <a id="js_appdetail_action_<#=pos_type#>" class="wx_min_plain_btn primary js_ad_btn"><#=shortAppBtnText#></a>\n                        <!-- <a href="#" class="wx_min_plain_btn primary btn_progress">\n                            <span class="btn_progress_inner" style="width:37%;">\n                                <span class="btn_progress_bd" style="width:57px;">暂停</span>\n                            </span>\n                            暂停\n                        </a> -->\n                    </div>\n                </div>\n            </div>\n            <!--117 end-->\n            <!--互选广告 begin-->\n            <# }else if(pt==125 || pt==140 || pt==142){ #>\n            <div class="da_area">\n              <div class="da_inner">\n                <!--广告头部-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!-- <span class="da_video_bg_cover" id="js_main_img" style="background-image:url(<#=video_info.thumbUrl#>)"></span> -->\n                    <!--放视频-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--广告信息-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <a class="da_btn_more">\n                    <# if(dest_type==6){ #><span class="icon26_weapp_blue"></span><# } #>\n                    \n                    <# if (dest_type==9){ #>\n                        查看详情\n                    <# }else if (watermark_type==7){ #>\n                        小游戏推广\n                    <# }else if (watermark_type==8){ #>\n                        进入小游戏\n                    <# }else if (product_type==46){ #>\n                        进入小游戏\n                    <# }else{ #>\n                        查看详情\n                    <# } #>\n                </a>\n                </div>\n              </div>\n            </div>\n            <# } #>\n            <!--互选广告 end-->\n        <# }else{ #>\n            <!--新协议-->\n            <# if(material_type == 9){ #>\n            <!--视频-->\n            <div class="da_area">\n              <div class="da_inner">\n                <!--广告头部-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!-- <span class="da_video_bg_cover" id="js_main_img" style="background-image:url(<#=video_info.thumbUrl#>)"></span> -->\n                    <!--放视频-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--广告信息-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <# if (product_type==12 || product_type==19){ #>\n                  <!--<a id="js_ad_btn_<#=pos_type#>" class="da_btn_more wx_min_plain_btn ba_btn btn_progress">立即下载</a>-->\n                  <a id="js_ad_btn_<#=pos_type#>" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress"><#=longAppBtnText#></a>\n                  <# }else{ #>\n                  <a class="da_btn_more">查看详情</a>\n                  <# } #>\n                </div>\n              </div>\n            </div>\n            <# }else if(material_type == 2){ #>\n            <!--图片-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n                <# } #>\n                    <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(dest_type==6){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if (product_type==12 || product_type==19){ #>\n                        <#=longAppBtnText#>\n                    <# } #>\n                    </i>\n            <# } #>\n        <# } #>\n    </div>\n</div>\n';
});define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","pages/player_adaptor.js","biz_common/dom/class.js","pages/report.js","biz_common/utils/monitor.js","pages/music_report_conf.js","biz_wap/utils/openUrl.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e,t,a,o){
"use strict";
function r(){
C.hasInit||(p(),s(),c(),C.hasInit=!0);
}
function n(e){
r(),this._o={
protocal:"",
wxIndex:0,
type:0,
comment_id:"",
src:"",
jsapi2Src:"",
mid:"",
songId:"",
otherid:"",
albumid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
appPlay:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:[location.protocol,"//mp.weixin.qq.com/s?referFrom=#referFrom#&songid=#songId#&__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
musicbar_url:"",
playingCss:"",
pauseCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:"",
fileSize:0,
playtimeDom:"",
loadingDom:"",
bufferDom:"",
playdotDom:"",
seekRange:"",
seekContainer:""
},this._init(e),C.allComponent.push(this);
}
function i(e,t,a,o){
C.num++,t.musicSupport=C.musicSupport,t.show_not_support=!1,C.musicSupport||1!=C.num||(t.show_not_support=!0);
var r=document.createElement("div"),n="";
if(n=h.tmpl(e,t),r.innerHTML=n,o===!0)a.appendChild(r.children[0]);else{
var i=a.parentNode;
if(!i)return;
i.lastChild===a?i.appendChild(r.children[0]):i.insertBefore(r.children[0],a.nextSibling);
}
}
function s(){
C.hasInit||v.inQMClient&&l("QMClient_pv",1);
}
function p(){
window.reportMid=[],window.reportVoiceid=[];
for(var e in I)if(I.hasOwnProperty(e)){
var t=I[e],a=t.split("_");
C.reportData2[e]={
id:a[0],
key:a[1],
count:0
};
}
}
function l(e,t){
C.reportData2[e]&&(t=t||1,C.reportData2[e].count+=t,C.debug&&console.log("addpv:"+e+" count:"+C.reportData2[e].count));
}
function c(){
f.on(window,"unload",d);
}
function d(){
D.triggerUnloadPlaying(),u();
for(var e=0,t=C.allComponent.length;t>e;e++){
var a=C.allComponent[e];
a.player&&"function"==typeof a.player.getPlayTotalTime&&(C.reportData[a._o.type].play_last_time[a._g.posIndex]=parseInt(1e3*a.player.getPlayTotalTime()));
}
for(var e in C.reportData)w.musicreport({
data:C.reportData[e]
});
p();
for(var e=0,t=C.allComponent.length;t>e;e++){
var a=C.allComponent[e];
a&&"function"==typeof a._initReportData&&a._initReportData(),a.player&&"function"==typeof a.player.resetPlayTotalTime&&a.player.resetPlayTotalTime();
}
}
function u(){
for(var e in C.reportData2)if(C.reportData2.hasOwnProperty(e)){
var t=C.reportData2[e];
t.count>0&&x.setSum(t.id,t.key,t.count);
}
x.send();
}
function g(e){
return new n(e);
}
function _(e){
if(isNaN(e))return"00:00";
e=Math.floor(e);
var t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),o=e-3600*t-60*a;
return 0!=t?(10>t&&(t="0"+t),t+=":"):t="",10>a&&(a="0"+a),10>o&&(o="0"+o),t+a+":"+o;
}
function y(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function m(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
var f=e("biz_common/dom/event.js"),h=e("biz_common/tmpl.js"),D=e("pages/music_player.js"),v=e("pages/player_adaptor.js"),k=e("biz_common/dom/class.js"),w=e("pages/report.js"),x=e("biz_common/utils/monitor.js"),I=e("pages/music_report_conf.js"),b=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,C={
allComponent:[],
hasInit:!1,
reportId:"28306",
musicSupport:D.getSurportType(),
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
reportData:{},
posIndex:{},
num:0,
reportData2:{},
adapter:{
m:e("pages/qqmusic_ctrl.js"),
k:e("pages/kugoumusic_ctrl.js")
}
};
return n.prototype._init=function(e){
this._extend(e),this._g={
posIndex:void 0,
tag:"",
canDragBar:!1,
barDraging:!1,
canGoDetail:!0
},5==this._o.type||6==this._o.type||9==this._o.type?this._g.tag="k":this._o.type>=2&&this._o.type<=4?this._g.tag="v":7==this._o.type?this._g.tag="a":(0==this._o.type||1==this._o.type||8==this._o.type)&&(this._g.tag="m"),
this._initData(),this._initQQmusicLyric(),this._initReportData(),this._initPlayer();
},n.prototype._initData=function(){},n.prototype._initQQmusicLyric=function(){
var e=this._o,t=this._g;
e.webUrl="m"==t.tag?e.webUrl.replace("#songId#",e.songId||"").replace("#referFrom#","music.qq.com"):e.webUrl.replace("#songId#","").replace("#referFrom#","");
},n.prototype._initReportData=function(){
var e=this._o,t=this._g;
"v"==t.tag?window.reportVoiceid.push(e.songId):"m"==t.tag&&window.reportMid.push(e.songId),
"undefined"==typeof C.reportData[e.type]&&(C.reportData[e.type]=w.getMusicReportData(e),
C.posIndex[e.type]=0),"undefined"==typeof t.posIndex&&(t.posIndex=C.posIndex[e.type]++);
var a=C.reportData[e.type];
a.musicid[t.posIndex]=e.songId,a.commentid[t.posIndex]=e.comment_id,a.hasended[t.posIndex]=0,
a.mtitle[t.posIndex]=e.title,a.detail_click[t.posIndex]=0,a.duration2[t.posIndex]=parseInt(1e3*e.duration),
a.errorcode[t.posIndex]=0,a.play_duration2[t.posIndex]=0,a.seek[t.posIndex]=0,a.seek_position[t.posIndex]=[],
a.play_last_time[t.posIndex]=0,a.local_time[t.posIndex]=0,a.seek_loaded[t.posIndex]=[];
},n.prototype._initPlayer=function(){
if(C.musicSupport){
var e=this,t=this._o,a=this._g.tag;
t.onStatusChange=this._statusChangeCallBack(),t.onTimeupdate=this._timeupdateCallBack(),
t.onError=this._errorCallBack(),t.onUpdateSeekRange=this._onUpdateSeekRange(),t.onAndroidForceH5=function(){
l("force_h5",1);
},t.onH5Begin2Play=function(){
l(a+"_pv",1),l(a+"_h5_pv",1);
},t.onH5Error=function(t,o){
l(a+"_h5_err_total",1),l(a+"_h5_err_"+o.code,1),e._reportH5Error({
type:1,
code:o.code
});
},t.onJsapi1Begin2Play=function(){
l(a+"_pv",1),l(a+"_wx_pv",1),l(a+"_wx_pv_1",1);
},t.onJsapi2Begin2Play=function(e,o){
l(a+"_pv",1),l(a+"_wx_pv",1),l(a+"_wx_pv_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src&&l("aac_pv",1),
t.musicPlayerOnJsapi2Begin2Play&&t.musicPlayerOnJsapi2Begin2Play(o);
},t.onJsapi2PlaySuccess=function(e,a){
t.musicPlayerOnJsapi2PlaySuccess&&t.musicPlayerOnJsapi2PlaySuccess(a);
},t.onJsapi2Begin2PlayErr=function(){
if(l(a+"_wx_err_1",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_start_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(w.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_1",1)):(w.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_1",1));
}
},t.onJsapi2PlayingErr=function(){
if(l(a+"_wx_err_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_ing_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(w.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_2",1)):(w.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_2",1));
}
},t.onJsapi2PlayingStop=function(){
var e=a+"_stoped_";
e+=D.isAndroid?"android":"ios",l(e,1);
},t.onJsapi2PlayingPause=function(){
var e=a+"_paused_";
e+=D.isAndroid?"android":"ios",l(e,1);
},t.onSeekErr=function(){
if(l(a+"_seek_err",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_seek_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(w.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_3",1)):(w.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_3",1));
}
},t.onUnloadPlaying=function(){
l(a+"_unload_wx_pv",1);
},t.onQMClientPlay=function(){
l("QMClient_play",1);
},t.onSeekNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=C.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=1);
}
},t.onSeekNotNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=C.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=0);
}
},v.create(this._o,{
callback:function(t){
e.player=t,e.afterCreatePlayer();
}
});
}
},n.prototype.afterCreatePlayer=function(){
this._playEvent();
},n.prototype.isInSeekrang=function(e){
var t=this._o.seekRange;
if(!t)return!1;
if(t===e)return!0;
for(var a=t.getElementsByTagName("*"),o=0,r=a.length;r>o;o++)if(a[o]===e)return!0;
return!1;
},n.prototype._playEvent=function(){
var e=this,t=this._o,a=this._g;
if(t.detailUrl&&t.detailArea&&f.on(t.detailArea,"click",function(r){
if(!a.barDraging&&a.canGoDetail){
var n=r.target||r.srcElement;
n&&e.isInSeekrang(n)||("v"==a.tag?(C.reportData[t.type].detail_click[a.posIndex]=1,
window.__second_open__?b(t.detailUrl):window.location.href=t.detailUrl):("m"==a.tag||"k"==a.tag)&&C.adapter[a.tag].getPlayUrl(t,{
callback:function(e){
e.canplay?(C.reportData[t.type].detail_click[a.posIndex]=1,window.__second_open__?b(t.detailUrl):window.location.href=t.detailUrl):e.msg&&setTimeout(function(){
o(e.msg);
},0);
}
}));
}
}),C.musicSupport){
var r=0,n=4,i=5;
switch(1*t.type){
case 0:
r=1;
break;

case 1:
r=13;
break;

case 8:
r=14;
break;

case 2:
r=3;
break;

case 3:
r=6;
break;

case 4:
r=7;
break;

case 5:
r=10;
break;

case 6:
r=15;
break;

case 7:
r=11;
break;

case 9:
r=12;
}
var s="";
s=t.allowPause?t.pauseCss||t.playingCss:t.playingCss,f.tap(t.playArea,function(){
return console.log("click playArea",k.hasClass(t.playCssDom,s)),k.hasClass(t.playCssDom,s)?(t.allowPause?e.player.pause():e.player.stop(),
w.report({
type:r,
comment_id:t.comment_id,
voiceid:t.songId,
action:i
})):"v"==a.tag||"a"==a.tag?e._playMusic(r,n):C.adapter[a.tag].getPlayUrl(t,{
callback:function(i){
i.canplay&&i.play_url?(i.duration&&(t.duration=i.duration,e.player.setDuration(t.duration),
C.reportData[t.type].duration2[a.posIndex]=parseInt(1e3*t.duration)),e.player.setSrc(i.play_url),
e._playMusic(r,n)):i.msg&&setTimeout(function(){
o(i.msg);
},0);
}
}),!1;
}),e._dragEvent();
}
},n.prototype._dragEvent=function(){
var e=this,t=this._o,a=this._g,o=t.seekRange;
if(o){
var r=0,n=o,i=!1,s=window.__zoom||1;
for(1!=s&&(i=!0);n&&n!=document.body;)r+=i?n.offsetLeft*s:n.offsetLeft,"page-content"==n.id&&(i=!1),
n=n.offsetParent;
var p=e.player.getDuration();
a.seekData={
zoom:s,
offsetLeft:r,
duration:p,
rangeWidth:o.offsetWidth,
startTime:0,
dragTime:0,
downX:0,
moveX:0
},f.on(o,"mousedown",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.pageX||t.clientX
}),t.preventDefault());
}),f.on(t.seekContainer,"mousemove",function(t){
a.canDragBar&&a.barDraging&&(e._pointerMoveHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation());
}),f.on(document.body,"mouseup",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation(),!1):void 0;
}),f.on(o,"touchstart",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault());
}),f.on(o,"touchmove",function(t){
return a.canDragBar&&a.barDraging?(e._pointerMoveHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),void t.stopPropagation()):void console.log("no can drag",a.canDragBar,a.barDraging);
}),f.on(o,"touchend",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),t.stopPropagation(),!1):void console.log("no can drag",a.canDragBar,a.barDraging);
});
}
},n.prototype._pointerDownHandler=function(e){
var t=this._g;
t.barDraging=!0,t.canGoDetail=!1,t.seekData.downX=e.x,t.seekData.startTime=this.player.getCurTime();
},n.prototype._pointerMoveHandler=function(e){
var t=this._g,a=t.seekData;
a.moveX=e.x;
var o=(a.moveX-a.offsetLeft)/a.zoom/a.rangeWidth;
o=Math.min(o,1),o=Math.max(o,0),a.dragTime=o*a.duration,a.dragTime!=a.startTime&&this._updateProgressBar(a.dragTime);
},n.prototype._pointerUpHandler=function(e){
var t=this._g,a=t.seekData;
a.dragTime||this._pointerMoveHandler({
x:e.x
}),console.log("up dragging",a.dragTime),t.barDraging=!1,this.player.seek(a.dragTime),
C.reportData[this._o.type].seek[t.posIndex]=1,C.reportData[this._o.type].seek_position[t.posIndex].push(parseInt(1e3*a.startTime)+","+parseInt(1e3*a.dragTime));
var o=C.reportData[this._o.type].seek_position[t.posIndex].length;
C.reportData[this._o.type].seek_loaded[t.posIndex][o-1]=0,t.seekData.startTime=0,
t.seekData.dragTime=0,t.seekData.downX=0,t.seekData.moveX=0,setTimeout(function(){
t.canGoDetail=!0;
},1e3);
},n.prototype._playMusic=function(e,t){
var a=this._o,o=this._g;
this.player.play(),C.reportData[a.type].hasended[o.posIndex]=1,0==C.reportData[a.type].local_time[o.posIndex]&&(C.reportData[a.type].local_time[o.posIndex]=parseInt(+new Date/1e3)),
w.report({
type:e,
comment_id:a.comment_id,
voiceid:a.songId,
action:t
});
},n.prototype._extend=function(e){
for(var t in e)this._o[t]=e[t];
},n.prototype._onUpdateSeekRange=function(){
var e=this,t=e._o,a=e._g;
return function(e){
this.surportSeekRange()&&t.bufferDom&&t.playdotDom?(a.canDragBar=!0,t.playdotDom.style.display="block",
t.bufferDom.style.width=1*e+"%"):(a.canDragBar=!1,t.playdotDom&&(t.playdotDom.style.display="none"));
};
},n.prototype._statusChangeCallBack=function(){
var e=this;
return function(t,a){
e._updatePlayerCss(this,a),e._o.musicPlayerStatusChange&&e._o.musicPlayerStatusChange(a);
};
},n.prototype._timeupdateCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
e._updateProgress(r),0!=r&&(C.reportData[t.type].play_duration2[a.posIndex]=parseInt(1e3*r));
};
},n.prototype._errorCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
C.reportData[t.type].errorcode[a.posIndex]=r.code,e._updatePlayerCss(this,3);
};
},n.prototype._reportH5Error=function(e){
if("mp.weixin.qq.com"==location.host&&1==e.type||C.debug){
var t=["code:",e.code,";type:",this._o.type,";url:",window.location.href];
this.player&&t.push(";src:"+this.player.getSrc());
var a=new Image;
a.src=["https://badjs.weixinbridge.com/badjs?level=4&id=112&msg=",encodeURIComponent(t.join("")),"&uin=",window.uin||"","&from=",this._o.type].join("");
}
},n.prototype._updatePlayerCss=function(e,t){
!!C.debug&&console.log("status:"+t);
{
var a=this._o,o=a.playCssDom;
a.progress;
}
2==t?(k.removeClass(o,a.playingCss),a.pauseCss&&k.removeClass(o,a.pauseCss),a.playdotDom&&(e.surportSeekRange()?(a.playdotDom.style.display="block",
this._g.canDragBar=!0):(a.playdotDom.style.display="none",this._g.canDragBar=!1))):3==t?(k.removeClass(o,a.playingCss),
a.pauseCss&&k.removeClass(o,a.pauseCss),a.playdotDom&&(a.playdotDom.style.display="none",
this._g.canDragBar=!1),this._updateProgress(0)):(1==t||4==t)&&(a.allowPause?k.addClass(o,a.pauseCss||a.playingCss):k.addClass(o,a.playingCss),
a.playdotDom&&(e.surportSeekRange()?(a.playdotDom.style.display="block",this._g.canDragBar=!0):(a.playdotDom.style.display="none",
this._g.canDragBar=!1))),a.loadingDom&&(a.loadingDom.style.display=4==t?"block":"none");
},n.prototype._updateProgress=function(e){
return this._g.barDraging?void console.log("no dragging return",e):void this._updateProgressBar(e);
},n.prototype._updateProgressBar=function(e){
var t=this._o,a=this.player,o=a.getDuration();
if(o){
var r=this._countProgress(o,e);
t.progress&&(t.progress.style.width=r),t.playtimeDom&&e>0&&(t.playtimeDom.innerHTML=_(e)),
t.playdotDom&&(t.playdotDom.style.left=r);
}
},n.prototype._countProgress=function(e,t){
return Math.min(t/e*100,100)+"%";
},n.prototype.destory=function(){
this.player&&this.player.destory();
},n.prototype.setOption=function(e){
e.duration&&(this._g.seekData.duration=e.duration),this._extend(e);
},n.prototype.setMusicPlayerOption=function(e){
e.duration&&this._g&&this._g.seekData&&(this._g.seekData.duration=e.duration),this.player&&this.player.setOption(e);
},n.prototype.getBackgroundAudioState=function(e){
return this.player.getBackgroundAudioState(e);
},{
init:g,
renderPlayer:i,
formatTime:_,
decodeStr:y,
encodeStr:m
};
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+r.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function n(){
return window.__second_open__?!0:-1!=a.indexOf("&_newvideoplayer=0")?!1:-1!=a.indexOf("&_newvideoplayer=1")?!0:1!=r.is_login?!1:r.use_tx_video_player?!1:w.canSupportVideo&&h.inWechat?h.is_ios||h.is_android?!0:!1:(r._hasReportCanSupportVideo||w.canSupportVideo||!h.inWechat||(r._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function o(){
console.log("isUseAd: "+c.isInMiniProgram);
{
var e=a,i=window.location.href;
r.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=r.sn&&"f62e1cb98630008303667f77c17c43d7"!=r.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=r.sn?c.isInMiniProgram?!1:-1!=e.indexOf("&_videoad=1")?!0:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:"54"==r.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:r.__appmsgCgiData&&r.__appmsgCgiData.can_use_page&&(h.is_ios||h.is_android)?!0:_.showAd()?!0:!1:!1;
}
function t(){
var e=a;
if(!r.user_uin)return!1;
if(-1!=e.indexOf("&_proxy=1"))return!0;
if(-1!=e.indexOf("&_proxy=0"))return!1;
if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show"))return!1;
var i=(new Date).getHours();
return i>=9&&14>=i?!1:h.inWechat&&h.is_android&&h.is_x5&&h.wechatVer>="6.2.2"?!0:h.inWechat&&h.is_android&&h.is_xweb&&h.xweb_version>=16?!0:h.inWechat&&h.is_ios&&(-1!=f.indexOf("MicroMessenger/6.2.4")||h.wechatVer>="6.2.4")?!0:!1;
}
function s(){
return u.networkType;
}
var r,a,d=e("biz_common/dom/event.js"),p=e("biz_wap/jsapi/core.js"),w=e("biz_wap/utils/device.js"),_=e("new_video/ctl.js"),c=e("biz_wap/utils/mmversion.js"),f=window.navigator.userAgent,u={
networkType:""
},h={};
if(parent==window)r=window,a=window.location.href;else try{
a=parent.window.location.href,r=parent.window;
}catch(m){
a=window.location.href,r=window;
}
return function(e){
var i=w.os;
h.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),h.is_android=!!i.android,h.is_wp=!!i.phone,
h.is_pc=!(i.phone||!i.Mac&&!i.windows),h.inWechat=/MicroMessenger/.test(e),h.inWindowWechat=/WindowsWechat/i.test(e),
h.inMacWechat=/wechat.*mac os/i.test(e),h.is_android_phone=h.is_android&&/Mobile/i.test(e),
h.is_android_tablet=h.is_android&&!/Mobile/i.test(e),h.ipad=/iPad/i.test(e),h.iphone=!h.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
h.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var n,o=/XWEB\/([\d\.]+)/i,t=e.match(o);
t&&t[1]&&(n=parseInt(t[1])),h.is_xweb=!!t,h.xweb_version=n;
var s=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
h.wechatVer=s&&s[1]||0,d.on(window,"load",function(){
if(""==u.networkType&&h.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
p.invoke("getNetworkType",{},function(i){
u.networkType=e[i.err_msg]||"fail","network_type:edge"==i.err_msg&&i.detailtype&&"4g"==i.detailtype&&(u.networkType="4g");
});
}
},!1);
}(window.navigator.userAgent),"undefined"==typeof r._hasReportCanSupportVideo&&(r._hasReportCanSupportVideo=!1),
{
device:h,
isShowMpVideo:n,
isUseProxy:t,
isUseAd:o,
getNetworkType:s
};
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_wap/utils/device.js","a/a_sign.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","a/tpl/crt_tpl_manager.js","appmsg/cdn_img_lib.js","a/tpl/cpc_tpl.html.js","a/sponsor.js","a/app_card.js","a/profile.js","a/android.js","a/ios.js","a/video.js"],function(require,exports,module,alert){
"use strict";
function _GetQuery(e){
for(var a=window.location.search,i=a.substring(1,a.length).split("&"),t=0;t<i.length;t++){
var n=i[t].split("=");
if(n[0].toUpperCase()===e.toUpperCase())return n[1];
}
return"";
}
function report(e,a){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+a);
}
function adOptReport(e,a,i,t){
Report("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+a+"&trace_id="+i+"&aid="+t+"&__biz="+window.biz+"&r="+Math.random());
}
function getWindowHeight(){
return"CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0;
if(!globalAdDebug){
var inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx||mmversion.isInMiniProgram)is_need_ad=0,
js_sponsor_ad_area.style.display="none",js_bottom_ad_area.style.display="none",js_cpc_area&&js_cpc_area.style&&(js_cpc_area.style.display="none");else{
var adLS=new LS("ad");
if(window.localStorage&&-1===location.href.indexOf("mock"))try{
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
}
return{
is_need_ad:is_need_ad,
both_ad:0,
_adInfo:_adInfo
};
}
function afterGetAdData(e,a){
function i(e){
var a=e;
if(6==a.dest_type&&(a.is_wx_app=!0),e.product_type===ANDROID_APP_PRODUCT_TYPE||e.product_type===IOS_APP_PRODUCT_TYPE){
var i=a.app_info.app_size||0,t=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",p=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",o=a.app_info.apk_name||a.app_info.pkg_name||"";
i=formSize(i),t=formName(t),a.app_info.app_size=i,a.app_info.app_name=t,a.app_info.apk_name=o,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=o,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=p;
var _=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:o,
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
file_md5:p
},a);
return _;
}
if(23==e.product_type){
for(var r=a.exp_info.exp_value||[],d=!1,s=0,c=0;c<r.length;++c){
var l=r[c]||{};
if(1==l.exp_type&&(s=l.comm_attention_num,d=s>0),2==l.exp_type){
d=!1,s=0;
break;
}
}
a.biz_info.show_comm_attention_num=d,a.biz_info.comm_attention_num=s;
var _=extend({
usename:a.biz_info.user_name,
pt:a.pt,
url:a.url,
traceid:a.traceid,
adid:a.aid,
ticket:a.ticket,
is_appmsg:!0
},a);
return _;
}
return e;
}
function t(e){
if(e.product_type===ANDROID_APP_PRODUCT_TYPE||e.product_type===IOS_APP_PRODUCT_TYPE){
var a=e,i=a.app_info.app_size||0,t=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",p=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",o=a.app_info.apk_name||a.app_info.pkg_name||"";
i=formSize(i),t=formName(t),a.app_info.app_size=i,a.app_info.app_name=t,a.app_info.apk_name=o,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=o,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=p;
var _=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:o,
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
file_md5:p
},a);
return console.log(_),_;
}
return e;
}
function n(e){
return e;
}
var p={},o=e.is_need_ad,_=e._adInfo;
if(0==o)p=_,p||(p={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var r=a.advertisement_info;
p.advertisement_info=saveCopy(r);
}
p.advertisement_num=a.advertisement_num;
}
1==o&&(window._adRenderData=p),p=p||{
advertisement_num:0
};
var d=!1;
if(!p.flag&&p.advertisement_num>0){
var s=p.advertisement_num,c=p.advertisement_info;
window.adDatas.num=s;
for(var l=0;s>l;++l){
var m,u=null,f=c[l];
f.exp_info=f.exp_info||{},f.is_cpm=f.is_cpm||0,f.biz_info=f.biz_info||{},f.app_info=f.app_info||{},
f.pos_type=f.pos_type||0,f.logo=f.logo||"",f.use_new_protocol=f.use_new_protocol||0;
var g=f.pt,y=f.pos_type,v=f.product_type;
if(m=f.use_new_protocol)1==m?4===y?(d=!0,f=i(f),u=f):0===y?(f=t(f),(v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE)&&(u=f)):3===y&&(f=n(f),
u=f):2==m&&4===y&&(d=!0,f=i(f),u=f);else if(100===g||115===g){
for(var w=f.exp_info.exp_value||[],h=!1,b=0,x=0;x<w.length;++x){
var j=w[x]||{};
if(1==j.exp_type&&(b=j.comm_attention_num,h=b>0),2==j.exp_type){
h=!1,b=0;
break;
}
}
f.biz_info.show_comm_attention_num=h,f.biz_info.comm_attention_num=b,u={
usename:f.biz_info.user_name,
pt:g,
url:f.url,
traceid:f.traceid,
adid:f.aid,
ticket:f.ticket,
is_appmsg:!0
};
}else if(102===g)u={
appname:f.app_info.app_name,
versioncode:f.app_info.version_code,
pkgname:f.app_info.apk_name,
androiddownurl:f.app_info.apk_url,
md5sum:f.app_info.app_md5,
signature:f.app_info.version_code,
rl:f.rl,
traceid:f.traceid,
pt:g,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0
};else if(101===g)u={
appname:f.app_info.app_name,
app_id:f.app_info.app_id,
icon_url:f.app_info.icon_url,
appinfo_url:f.app_info.appinfo_url,
rl:f.rl,
traceid:f.traceid,
pt:g,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0
};else if(103===g||104===g||2===g&&f.app_info){
var k=f.app_info.down_count||0,P=f.app_info.app_size||0,O=f.app_info.app_name||"",D=f.app_info.category,I=["万","百万","亿"];
if(k>=1e4){
k/=1e4;
for(var E=0;k>=10&&2>E;)k/=100,E++;
k=k.toFixed(1)+I[E]+"次";
}else k=k.toFixed(1)+"次";
P=formSize(P),D=D?D[0]||"其他":"其他",O=formName(O),f.app_info._down_count=k,f.app_info._app_size=P,
f.app_info._category=D,f.app_info.app_name=O,u={
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
pt:g,
url:f.url,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0,
app_info:f.app_info
};
}else if(105===g){
var A=f.card_info.card_id||"",T=f.card_info.card_ext||"";
T=T.htmlDecode();
try{
T=JSON.parse(T),T.outer_str=f.card_info.card_outer_id||"",T=JSON.stringify(T);
}catch(C){
T="{}";
}
u={
card_id:A,
card_ext:T,
pt:g,
ticket:f.ticket||"",
url:f.url,
rl:f.rl,
tid:f.traceid,
traceid:f.traceid,
type:f.type,
adid:f.aid,
is_appmsg:!0
};
}else if(106===g){
var S=f.mp_shop_info.pid||"",z=f.mp_shop_info.outer_id||"";
u={
pid:S,
outer_id:z,
pt:g,
url:f.url,
rl:f.rl,
tid:f.traceid,
traceid:f.traceid,
type:f.type,
adid:f.aid,
is_appmsg:!0
};
}else if(108===g||109===g||110===g||116===g||117===g)u={
pt:g,
ticket:f.ticket||"",
url:f.url,
traceid:f.traceid,
adid:f.aid,
is_appmsg:!0
},f.video_info&&(u.displayWidth=f.video_info.displayWidth,u.displayHeight=f.video_info.displayHeight,
u.thumbUrl=f.video_info.thumbUrl,u.videoUrl=f.video_info.videoUrl,u.rl=f.rl),6==f.dest_type&&Wxopen_card.startConnect(f);else if(111===g||113===g||114===g||112===g||121===g||122===g){
var P=f.app_info.app_size||0,O=f.app_info.app_name||"";
P=formSize(P),O=formName(O),f.app_info.app_size=P,f.app_info.app_name=O,u={
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
pt:g,
url:f.url,
ticket:f.ticket,
type:f.type,
adid:f.aid,
source:source||"",
is_appmsg:!0
};
}else 118===g?(u=f,d=!0,console.log("?#$:"),Wxopen_card.startConnect(f)):119===g||120===g?(u=f,
Wxopen_card.startConnect(f)):125===g&&(u=f,6==f.dest_type&&Wxopen_card.startConnect(f));
var q=f.image_url;
require("appmsg/cdn_img_lib.js"),q&&q.isCDN()&&(q=q.replace(/\/0$/,"/640"),q=q.replace(/\/0\?/,"/640?"),
f.image_url=ParseJs.addParam(q,"wxfrom","50",!0)),adDatas.ads["pos_"+y]={
a_info:f,
adData:u
},localStorage&&localStorage.setItem&&f.app_info&&f.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+f.traceid,f.app_info.url_scheme),
f.has_installed=!1,(!m&&(104===g||113===g||114===g||2===g||122===g)||m&&(v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE))&&JSAPI.invoke("getInstallState",{
packageName:f.app_info.apk_name
},function(e){
var a=e.err_msg;
a.indexOf("get_install_state:yes")>-1&&(f.has_installed=!0);
}),0===y&&9===f.material_type&&(46===v&&6===f.dest_type&&f.game_info&&(f.biz_info.head_img=f.game_info.head_img,
f.biz_info.nick_name=f.game_info.nick_name),v!==IOS_APP_PRODUCT_TYPE&&v!==ANDROID_APP_PRODUCT_TYPE||!f.app_info||(f.biz_info.head_img=f.app_info.icon_url,
f.biz_info.nick_name=f.app_info.app_name));
}
var R=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
js_sponsor_ad_area.offsetTop<e+a&&(Class.addClass(document.getElementById("js_ad_area"),"show"),
DomEvent.off(window,"scroll",R));
},U=adDatas.ads;
for(var B in U)if(0==B.indexOf("pos_")){
var u=U[B],f=!!u&&u.a_info,v=f.product_type;
if(u&&f){
if(4===f.pos_type&&!js_cpc_area){
var N=f.position_index||Math.ceil(contentWrp.children.length/2)-1;
js_cpc_area=document.createElement("mpcpc"),el_gdt_areas.pos_4=js_cpc_area,gdt_as.pos_4=js_cpc_area.getElementsByClassName("js_ad_link"),
contentWrp.insertBefore(js_cpc_area,contentWrp.children[N+1]);
}
if(2!==f.use_new_protocol){
if(0==f.pos_type){
if(f.new_appmsg=window.new_appmsg,f.longAppBtnText=v===IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
f.shortAppBtnText=v===IOS_APP_PRODUCT_TYPE?"查看":"下载",js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,f),
111==f.pt||112==f.pt||113==f.pt||114==f.pt){
var W=document.getElementsByClassName("js_download_app_card")[0],M=W.offsetWidth,H=Math.floor(M/2.875);
H>0&&(W.style.height=H+"px");
}
}else if(3==f.pos_type){
var W=document.createElement("div");
W.appendChild(document.createTextNode(f.image_url)),f.image_url=W.innerHTML.replace(/&amp;/g,"&"),
f.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,f),
js_sponsor_ad_area.style.display="block";
var Y=js_sponsor_ad_area.clientWidth;
108!=f.pt&&109!=f.pt&&110!=f.pt||2==f.use_new_protocol?116==f.pt||117==f.pt:document.getElementById("js_main_img").style.height=Y/1.77+"px",
DomEvent.on(window,"scroll",R),R(0);
}else if(4==f.pos_type&&_checkShowCpc()){
f=_parseExpCpc(f);
var K=!1;
if(console.info("[APPMSG AD DEBUG] cpc render data: ",f),v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE)js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,f),
K=!0;else{
var L=require("a/tpl/cpc_tpl.html.js"),J=f.exp_obj.sale_text;
(23===v||v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE||46===v)&&(J=f.avatarTitle),
js_cpc_area.innerHTML=TMPL.tmpl(L,{
tag_pos:f.exp_obj.tag_pos,
type:f.tag_pos,
ticket:f.ticket,
url:f.url,
rl:f.rl,
aid:f.aid,
pt:f.pt,
traceid:f.traceid,
group_id:f.group_id,
apurl:f.apurl,
is_cpm:f.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:f.pos_type,
banner:f.image_url,
price:f.exp_obj.price,
title:J,
is_wx_app:f.is_wx_app,
btn_text:f.exp_obj.btn_text,
avatar:f.avatar,
isDownload:K
});
}
}
console.log("check ios",mmversion.isIOS,f.app_info),mmversion.isIOS&&f.app_info&&f.app_info.url_scheme&&(console.log("check ios end",document.getElementById("js_promotion_tag")),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+f.pos_type)&&(document.getElementById("js_ad_btn_"+f.pos_type).innerHTML="查看应用"));
}else{
var G,X={},K=!1,V={};
if(f.button_action)try{
console.log("button_action:",f.button_action,typeof f.button_action),"string"==typeof f.button_action&&(f.button_action=JSON.parse(f.button_action.html())),
f.button_action.button_text&&""!=f.button_action.button_text||(f.button_action.button_text="去逛逛");
}catch(C){
f.button_action={
button_text:"decode error"
};
}else f.button_action={
button_text:"something wrong"
};
if(G=f.crt_size,f.biz_info&&f.biz_info.head_img&&23==f.product_type&&(f.avatar=f.biz_info.head_img,
f.avatarTitle=f.biz_info.nick_name),(v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE)&&(K=!0,
f.app_info&&f.app_info.icon_url&&(f.avatar=f.app_info.icon_url,f.avatarTitle=f.app_info.appname)),
46===v&&f.game_info&&f.game_info.head_img&&(f.avatar=f.game_info.head_img,f.avatarTitle=f.game_info.nick_name),
6==f.dest_type&&Wxopen_card.startConnect(f),4==f.pos_type){
if(_checkShowCpc()){
f=_parseExpCpc(f);
var J=f.exp_obj.sale_text;
(23===v||v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE||46===v)&&(J=f.avatarTitle),
X={
tag_pos:f.exp_obj.tag_pos,
type:f.tag_pos,
ticket:f.ticket,
url:f.url,
rl:f.rl,
aid:f.aid,
pt:f.pt,
traceid:f.traceid,
group_id:f.group_id,
apurl:f.apurl,
is_cpm:f.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:f.pos_type,
banner:f.image_url,
price:f.exp_obj.price,
title:J,
is_wx_app:f.is_wx_app,
is_ios:mmversion.isIOS,
isDownload:K,
btn_text:f.button_action.button_text,
avatar:f.avatar
},K&&(V.customUpdataFunc=function(e,a){
var i=e.querySelector(".js_download_percent"),t=e.querySelector(".js_download_outside"),n=e.querySelector(".js_download_inner");
i&&(i.style.width=a.percent+"%"),t.textContent=a.btn_text,n.textContent=a.btn_text;
}),ad_render_object["pos_"+f.pos_type]=new CrtManager.createCrtObject(G,X,js_cpc_area,V),
gdt_as.pos_4=js_cpc_area.getElementsByClassName("js_ad_main_area");
}
}else if(3==f.pos_type){
var W=document.createElement("div");
W.appendChild(document.createTextNode(f.image_url)),f.image_url=W.innerHTML.replace(/&amp;/g,"&"),
f.new_appmsg=window.new_appmsg;
var u={
pt:f.pt,
ticket:f.ticket||"",
url:f.url,
traceid:f.traceid,
adid:f.aid,
is_appmsg:!0
};
if(f.video_info&&(u.displayWidth=f.video_info.displayWidth,u.displayHeight=f.video_info.displayHeight,
u.thumbUrl=f.video_info.thumbUrl,u.videoUrl=f.video_info.videoUrl,u.rl=f.rl),X={
type:f.tag_pos,
ticket:f.ticket,
url:f.url,
rl:f.rl,
aid:f.aid,
pt:f.pt,
traceid:f.traceid,
group_id:f.group_id,
apurl:f.apurl,
is_cpm:f.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:f.pos_type,
banner:f.image_url,
title:f.biz_info.nick_name,
is_wx_app:6==f.button_action.jump_type,
is_ios:mmversion.isIOS,
isDownload:K,
btn_text:f.button_action.button_text,
avatar:f.biz_info.head_img,
isApp:!1
},ad_render_object["pos_"+f.pos_type]=new CrtManager.createCrtObject(G,X,js_sponsor_ad_area,V),
js_sponsor_ad_area.style.display="block",gdt_as.pos_3=js_sponsor_ad_area.getElementsByClassName("js_ad_main_area"),
!ad_render_object["pos_"+f.pos_type].getCrtData().has_banner){
var F="&tid="+f.traceid+"&uin="+uin+"&key="+B+"&ticket="+(f.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+f.adid+"&ad_engine=0&pos_type="+pos_type+"&exp_id="+f.exp_info.exp_id+"&exp_value="+f.exp_info.exp_value+"&r="+Math.random();
f.report_param=F;
}
var Q=require("a/sponsor.js");
new Q({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:u,
a_info:f,
pos_type:pos_type,
report_param:F
}),DomEvent.on(window,"scroll",R),R(0);
}
}
lazyLoadAdImg({
aid:f.aid,
type:f.pt
}),checkAdImg(f);
}
}
bindAdOperation();
}
is_temp_url&&document.getElementsByTagName("mpcpc").length>0&&_checkShowCpc()&&!d&&(js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,{
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
exp_obj:{},
pos_type:"",
dest_type:"",
image_url:"https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiaPhsbHe4ctnlUllMCDCEIJib69wX3BUX42XagNypd2JcgyEiaoFRu4KicKF3avfRgVnWPABVTjtPRwQ/0?wx_fmt=png"
}));
}
function _parseExpCpc(e){
var a=e.product_type,i={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(i.btn_text="查看详情"),console.log("文中",e),e.biz_info&&e.biz_info.head_img&&23==e.product_type&&(e.avatar=e.biz_info.head_img,
e.avatarTitle=e.biz_info.nick_name),29===a||31===a?i.btn_text="查看详情":a===ANDROID_APP_PRODUCT_TYPE||a===IOS_APP_PRODUCT_TYPE?(i.btn_text=a===IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
e.app_info&&e.app_info.icon_url&&(e.avatar=e.app_info.icon_url,e.avatarTitle=e.app_info.appname)):30===a?i.btn_text="去逛逛":23===a?i.btn_text=e.biz_info.is_subscribed?"查看公众号":"关注公众号":46===a&&(i.btn_text="进入小游戏",
e.game_info&&e.game_info.head_img&&(e.avatar=e.game_info.head_img,e.avatarTitle=e.game_info.nick_name)),
9==e.dest_type&&(i.btn_text="查看详情"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var t=e.cpc_exp_info.exp_content;
try{
for(var n=JSON.parse(t.replace(/&quot;/g,'"')),p=-1,o=0;o<n.aid_list.length;o++)n.aid_list[o].aid==e.aid&&(p=o);
p>-1&&(i.icon_pos=n.icon_pos||"",i.btn_text=n.btn_text||i.btn_text,i.price=n.aid_list[p].price,
i.sale_text=n.aid_list[p].sale_text,window.__addIdKeyReport("68064",15));
}catch(_){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=i,e;
}
function _checkShowCpc(){
if(globalAdDebug)return!0;
if(js_cpc_area){
var e=(document.documentElement.clientHeight||window.innerHeight)/2,a=js_cpc_area.offsetTop,i=contentWrp.offsetHeight;
return e>a||e>i-a?!1:!0;
}
}
function lazyLoadAdImg(e){
for(var a=document.getElementsByClassName("js_alazy_img"),i=0;i<a.length;i++){
var t=a[i];
a[i].onload=function(){
window.__addIdKeyReport("28307",54),t.src.indexOf("retry")>-1&&window.__addIdKeyReport("28307",69);
},a[i].onerror=function(){
if(-1==t.src.indexOf("retry"))t.src=ParseJs.addParam(t.src,"retry",1);else{
window.__addIdKeyReport("28307",98);
var a="other";
mmversion.isIOS?a="iphone":mmversion.isAndroid&&(a="android"),window.setTimeout(function(){
var i=window.networkType||"unknow";
ajax({
url:"http://mp.weixin.qq.com/tp/datacenter/report?cmd=report&id=900023&os="+a+"&uin=777&aid="+e.aid+"&image_url="+encodeURIComponent(t.src)+"&type="+e.type+"&network="+i,
type:"GET",
async:!0
});
},500);
}
window.__addIdKeyReport("28307",57);
},a[i].src=a[i].dataset.src;
}
}
function getHost(e){
if(!e)return"";
var a=document.createElement("a");
return a.href=e,a.hostname;
}
function checkAdImg(e){
if(e){
var a=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],i=e.image_url||"",t=getHost(i);
return void(t&&-1==a.indexOf(t)&&window.__addIdKeyReport("28307",58));
}
}
function saveCopyArr(e){
for(var a=[],i=0;i<e.length;++i){
var t=e[i],n=typeof t;
t="string"==n?t.htmlDecode():t,"object"==n&&(t="[object Array]"==Object.prototype.toString.call(t)?saveCopyArr(t):saveCopy(t)),
a.push(t);
}
return a;
}
function saveCopy(e){
var a={};
for(var i in e)if(e.hasOwnProperty(i)){
var t=e[i],n=typeof t;
t="string"==n?t.htmlDecode():t,"object"==n&&(t="[object Array]"==Object.prototype.toString.call(t)?saveCopyArr(t):saveCopy(t)),
a[i]=t;
}
return a;
}
function formName(e){
for(var a=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],i=-1,t=0,n=a.length;n>t;++t){
var p=a[t],o=e.indexOf(p);
-1!=o&&(-1==i||i>o)&&(i=o);
}
return-1!=i&&(e=e.substring(0,i)),e;
}
function formSize(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
}
function debounce(e,a,i){
var t;
return function(){
var n=this,p=arguments,o=function(){
t=null,i||e.apply(n,p);
},_=i&&!t;
clearTimeout(t),t=setTimeout(o,a),_&&e.apply(n,p);
};
}
function seeAds(){
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var onScroll=debounce(function(){
for(var scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i,gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,aid=gdt_a.dataset.aid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=adDatas.ads[pos_key].a_info.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop,adHeight=gdt_a.clientHeight,adOffsetTop=offsetTop+gdt_a.offsetTop,gh_id="",pt=adDatas.ads[pos_key].a_info.pt,signData={
click_pos:"",
rl:encodeURIComponent(a_info.rl),
__biz:biz,
pos_x:"",
pos_y:"",
press_interval:""
};
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
Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
console.info("createSign",adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj),ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random()+"&ad_sign_data="+adSignData+"&ad_sign_k1="+adSignK1+"&ad_sign_k2="+adSignK2+"&ad_sign_md5="+signMd5+"&viewid="+viewidKeyObj.viewid,
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
});
}
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollTop+innerHeight>=adOffsetTop+adHeight*rh&&adOffsetTop+adHeight*(1-rh)>=scrollTop?3==pos_type?(ping_cpm_apurl_obj.hasPing=!0,
Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
console.info("createSign",adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj),ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&r="+Math.random()+"&ad_sign_k1="+adSignK1+"&ad_sign_k2="+adSignK2+"&ad_sign_md5="+signMd5+"&viewid="+viewidKeyObj.viewid,
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
})):ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
console.info("createSign",adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj),ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random()+"&ad_sign_k1="+adSignK1+"&ad_sign_k2="+adSignK2+"&ad_sign_md5="+signMd5+"&viewid="+viewidKeyObj.viewid,
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
},250);
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
function openWebAppStore(e,a){
JSAPI.invoke("downloadAppInternal",{
appUrl:e
},function(i){
i.err_msg&&-1!=i.err_msg.indexOf("ok")||OpenUrlWithExtraWebview("http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+a+"#wechat_redirect");
});
}
function openCanvasAd(e){
console.log("jsapi invoke OpenADCanvas"),console.log("canvas_id: "+e.canvasId),console.log("ad_info_xml: "+e.adInfoXml),
JSAPI.invoke("openADCanvas",{
canvasId:e.canvasId,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:e.pos_type
}),
adInfoXml:e.adInfoXml
},function(a){
console.log(JSON.stringify(a)),0!=a.ret?(OpenUrlWithExtraWebview(e.url),report(135,e.report_param)):report(134,e.report_param);
});
}
function ad_click(e,a,i,t,n,p,o,_,r,d,s,c,l,m,u,f,g,y,v){
if(!has_click[n]){
has_click[n]=!0;
var w=document.getElementById("loading_"+n),h=g.product_type;
w&&(w.style.display="inline");
var b=g.exp_info||{},x=b.exp_id||"",j=b.exp_value||[];
try{
j=JSON.stringify(j);
}catch(k){
j="[]";
}
var P="";
c&&c.weapp_info&&c.weapp_info.original_id&&(P=c.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:x,
exp_value:j,
url:encodeURIComponent(a),
tid:n,
aid:_,
rl:encodeURIComponent(i),
__biz:biz,
pos_type:d,
pt:r,
pos_x:l,
pos_y:m,
ad_w:u,
ad_h:f,
gh_id:P,
press_interval:window.__a_press_interval||-1
},function(){
if(has_click[n]=!1,w&&(w.style.display="none"),g.canvas_info)return void openCanvasAd({
canvasId:g.canvas_info.canvas_id,
adInfoXml:g.canvas_info.ad_info_xml,
pos_type:d,
report_param:y,
url:a
});
if(v)1==g.dest_type?handleH5(a,n,idx,mid,biz,r,_,s,d,c,g):6==g.dest_type?Wxopen_card.openWxopen(c):h===ANDROID_APP_PRODUCT_TYPE||h===IOS_APP_PRODUCT_TYPE?handleApp(a,n,idx,mid,biz,r,_,s,d,c,g,p,y):0==g.dest_type?OpenUrlWithExtraWebview(a):(console.info("[APPMSG AD DEBUG] new protocol debug click:",g),
OpenUrlWithExtraWebview(a));else if("5"==e)OpenUrlWithExtraWebview("/mp/profile?source=from_ad&tousername="+a+"&ticket="+p+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+n);else{
if("105"==r&&c)return void Card.openCardDetail(c.card_id,c.card_ext,c);
if("106"==r&&c)return void OpenUrlWithExtraWebview(ParseJs.join(a,{
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
-1==e.err_msg.indexOf("ok")&&openWebAppStore(a,p);
}):openWebAppStore(a,p),!1;
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:n,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:_,
ad_engine:s,
pos_type:d
},t=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&c||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var o="",l="";
c&&(o=c.pkgname&&c.pkgname.replace(/\./g,"_"),l=c.channel_id||""),i={
source:4,
tid:n,
traceid:n,
mid:mid,
idx:idx,
appuin:biz,
pt:r,
channel_id:l,
aid:_,
engine:s,
pos_type:d,
pkgname:o
};
}
a=URL.join(a,i),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=URL.join(a,{
traceid:n,
aid:_,
engine:s
})),!_&&t&&t(80,a);
}
OpenUrlWithExtraWebview(a);
}
});
}
}
function bindAdOperation(){
console.log("bindAdOperation"),seeAds();
for(var e=0;total_pos_type>e;++e)!function(e){
var a="pos_"+e,i=el_gdt_areas[a];
if(!i)return!1;
if(!i.getElementsByClassName&&i.style)return i.style.display="none",!1;
var t=i.getElementsByClassName("js_ad_link")||[],n=adDatas.ads[a],p=i.getElementsByClassName("js_ad_opt_list_btn_"+e),o=i.getElementsByClassName("js_complain_btn_"+e);
if(n){
var _,r,d=n.adData,s=n.a_info,c=s.pos_type,l=n.ad_engine;
if(2==s.use_new_protocol){
var m=i.getElementsByClassName("js_material_"+e),u=i.getElementsByClassName("js_ad_action_"+e);
if(m.length>0&&(r=m[0].dataset.tid,_=m[0].dataset.aid,DomEvent.on(m[0],"click",function(a){
console.log("click ad material");
var i=m[0].dataset,t=!!a&&a.target;
if(i&&3!=s.pos_type){
var n=i.type,p=i.url,o=i.rl,u=i.apurl,f=i.ticket,g=i.group_id,y=i.pt,v=s.use_new_protocol;
if(d){
d.adid=window.adid||d.adid||d.aid;
var w="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
}
var h,b,x,j;
return h=position.getX(t,"js_material_"+e)+a.offsetX,b=position.getY(t,"js_material_"+e)+a.offsetY,
x=m[0].clientWidth,j=m[0].clientHeight,ad_click(n,p,o,u,r,f,g,_,y,c,l,d,h,b,x,j,s,w,v),
log("[Ad] ad_click: type="+n+", url="+p+", rl="+o+", apurl="+u+", traceid="+r+", ticket="+f+", group_id="+g+", aid="+_+", pt="+y+", pos_type="+c+", ad_engine="+l),
!1;
}
})),u.length>0&&s.button_action&&3!=s.pos_type)if(s.product_type===ANDROID_APP_PRODUCT_TYPE||s.product_type===IOS_APP_PRODUCT_TYPE){
console.log("init app download");
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
new f({
btn:u[0],
adData:d,
report_param:P,
pos_type:c,
url_scheme:d.url_scheme,
via:[d.traceid,d.adid,y,source,g,l].join("."),
ticket:d.ticket,
appdetail_params:["&aid="+d.adid,"traceid="+d.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+l,"appuin="+biz,"pos_type="+c,"ticket="+d.ticket,"scene="+scene].join("&"),
engine:l
});
}else if(23==s.product_type){
var v=require("a/profile.js");
d.adid=window.adid||d.adid||d.aid,new v({
btnProfile:u[0],
adData:d,
pos_type:c,
report_param:P,
aid:d.adid,
ad_engine:l
});
}else DomEvent.on(u[0],"click",function(a){
var i=m[0].dataset,t=!!a&&a.target,n=i.type,p=s.button_action.jump_url,o=i.rl,_=i.apurl,r=i.tid,f=i.ticket,g=i.group_id,y=i.aid,v=i.pt,w=s.use_new_protocol;
if(console.info("[APPMSG AD DEBUG] new protocol btn action debug click: ",s.dest_type,s.product_type),
d){
d.adid=window.adid||d.adid||d.aid;
var h="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
}
var b,x,j,k;
return b=position.getX(t,"js_ad_action_"+e)+a.offsetX,x=position.getY(t,"js_ad_action_"+e)+a.offsetY,
j=u[0].clientWidth,k=u[0].clientHeight,ad_click(n,p,o,_,r,f,g,y,v,c,l,d,b,x,j,k,s,h,w),
log("[Ad] ad_click: type="+n+", url="+p+", rl="+o+", apurl="+_+", traceid="+r+", ticket="+f+", group_id="+g+", aid="+y+", pt="+v+", pos_type="+c+", ad_engine="+l),
!1;
});
}else for(var w=0,h=t.length;h>w;++w)!function(e,a){
var i=t[e],n=i.dataset;
if(n&&3!=s.pos_type){
var p=n.type,o=n.url,d=n.rl,m=n.apurl,u=n.ticket,f=n.group_id,g=n.pt,y=s.use_new_protocol,v=!0;
r=n.tid,_=n.aid,(y&&(s.product_type===ANDROID_APP_PRODUCT_TYPE||s.product_type===IOS_APP_PRODUCT_TYPE)||115===g)&&(v=!1,
console.log("js dom event type: ",v)),4==s.pos_type&&(v=!1,console.log("js dom for pos_type:4 event type: ",v)),
DomEvent.on(i,"click",function(e){
var i=!!e&&e.target,t=[ANDROID_APP_PRODUCT_TYPE,IOS_APP_PRODUCT_TYPE,23];
if(!i||!i.className||4==c&&a&&-1==t.toString().indexOf(a.product_type)||-1==i.className.indexOf("js_ad_btn")&&-1==i.className.indexOf("js_btn_process")&&-1==i.className.indexOf("js_muted_btn")&&-1==i.className.indexOf("js_poster_cover")&&-1==i.className.indexOf("js_ad_opt_list_btn")&&-1==i.className.indexOf("js_complain_btn")&&-1==i.className.indexOf("js_view_profile")&&-1==i.className.indexOf("js_add_contact")){
if(a){
a.adid=window.adid||a.adid||a.aid;
var n="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
s&&s.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?report(114,n):"103"==a.pt||"111"==a.pt||"112"==a.pt?report(23,n):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&report(25,n);
}
var v,w,h,b;
return v=position.getX(i,"js_ad_link")+e.offsetX,w=position.getY(i,"js_ad_link")+e.offsetY,
h=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(p,o,d,m,r,u,f,_,g,c,l,a,v,w,h,b,s,n,y),log("[Ad] ad_click: type="+p+", url="+o+", rl="+d+", apurl="+m+", traceid="+r+", ticket="+u+", group_id="+f+", aid="+_+", pt="+g+", pos_type="+c+", ad_engine="+l),
!1;
}
},v),DomEvent.on(i,"touchstart",function(){
console.log("touchstart",+new Date),window.__a_press_interval=+new Date;
}),DomEvent.on(i,"touchend",function(){
console.log("touchend",+new Date),window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(w,d);
if(p[0]&&(console.log("bind btn:",p[0]," for pos type:",s.pos_type," aid:",_),DomEvent.on(p[0],"click",function(){
if(console.log("optListBtn click on: pos",s.pos_type),parseInt(window.can_see_complaint)){
var e=document.getElementsByClassName("js_ad_opt_list_"+s.pos_type);
adOptReport(0,s.pos_type,r,_),e&&e[0]&&(e[0].style.display="none"==e[0].style.display?"block":"none");
}
return!1;
})),o[0]&&DomEvent.on(o[0],"click",function(){
console.log("complainBtn click on: pos",s.pos_type);
var e="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+_+"&traceid="+r+"&source="+s.pos_type+"&biz="+window.biz;
return adOptReport(1,s.pos_type,r,_),mmversion.isWp||mmversion.isIOS||mmversion.isAndroid?JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):OpenUrlWithExtraWebview(e),!1;
}),d&&2!=s.use_new_protocol){
d.adid=window.adid||d.adid||d.aid;
var b=s.exp_info||{},x=b.exp_id||"",j=b.exp_value||[];
try{
j=JSON.stringify(j);
}catch(k){
j="[]";
}
var P="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&exp_id="+x+"&exp_value="+j+"&r="+Math.random();
if(d.report_param=P,d.use_new_protocol){
if(s.product_type===ANDROID_APP_PRODUCT_TYPE||s.product_type===IOS_APP_PRODUCT_TYPE){
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_"),O=document.getElementById("js_ad_btn_"+c);
new f({
btn:O,
adData:d,
report_param:P,
pos_type:c,
url_scheme:d.url_scheme,
via:[d.traceid,d.adid,y,source,g,l].join("."),
ticket:d.ticket,
appdetail_params:["&aid="+d.adid,"traceid="+d.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+l,"appuin="+biz,"pos_type="+c,"ticket="+d.ticket,"scene="+scene].join("&"),
engine:l
});
}else if(23==s.product_type){
var v=require("a/profile.js");
new v({
btnProfile:document.getElementById("js_ad_btn_"+c),
btnViewProfile:document.getElementById("js_view_profile_"+c),
btnAddContact:document.getElementById("js_add_contact_"+c),
adData:d,
pos_type:c,
report_param:P,
aid:d.adid,
ad_engine:l,
a_info:s
});
}
if(9==s.material_type){
s.report_param=P;
var D=require("a/video.js");
new D(s);
}
}else{
if("100"==d.pt||"115"==d.pt){
var v=require("a/profile.js");
return void new v({
btnViewProfile:document.getElementById("js_view_profile_"+c),
btnAddContact:document.getElementById("js_add_contact_"+c),
adData:d,
pos_type:c,
report_param:P,
aid:d.adid,
ad_engine:l,
a_info:s
});
}
if("102"==d.pt){
var I=require("a/android.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
return void new I({
btn:document.getElementById("js_app_action_"+c),
adData:d,
report_param:P,
task_ext_info:[d.adid,d.traceid,y,source,g,l].join("."),
via:[d.traceid,d.adid,y,source,g,l].join(".")
});
}
if("101"==d.pt){
var E=require("a/ios.js");
return void new E({
btn:document.getElementById("js_app_action_"+c),
adData:d,
ticket:d.ticket,
report_param:P
});
}
if("105"==d.pt)return void new Card({
btn:document.getElementById("js_card_action_"+c),
adData:d,
report_param:P,
pos_type:c
});
if("106"==d.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+c),
adData:d,
report_param:P,
pos_type:c
});
if("103"==d.pt||"104"==d.pt||"111"==d.pt||"112"==d.pt||"113"==d.pt||"114"==d.pt||"121"==d.pt||"122"==d.pt){
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
return void new f({
btn:document.getElementById("js_appdetail_action_"+c),
js_app_rating:document.getElementById("js_app_rating_"+c),
adData:d,
report_param:P,
pos_type:c,
url_scheme:d.url_scheme,
via:[d.traceid,d.adid,y,source,g,l].join("."),
ticket:d.ticket,
appdetail_params:["&aid="+d.adid,"traceid="+d.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+l,"appuin="+biz,"pos_type="+c,"ticket="+d.ticket,"scene="+scene].join("&"),
engine:l
});
}
if("108"==d.pt||"109"==d.pt||"110"==d.pt||"116"==d.pt||"117"==d.pt){
var A=require("a/sponsor.js");
new A({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:d,
a_info:s,
pos_type:c,
report_param:P
});
}
if("118"==s.pt&&(d.report_param=P),"125"==s.pt){
s.report_param=P,console.log("old video info");
var D=require("a/video.js");
new D(s);
}
}
}
}
}(e);
}
function extend(e,a){
for(var i in a)e[i]=a[i];
return e;
}
function handleApp(e,a,i,t,n,p,o,_,r,d,s,c,l){
if(console.info("[APPMSG AD DEBUG] handleApp",s),s&&s.has_installed&&-1==e.indexOf("itunes.apple.com")&&s.app_info.url_scheme)return void JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(a){
if(-1==a.err_msg.indexOf("ok")){
if(s.canvas_info)return void openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:l,
url:e
});
location.href=s.app_info.url_scheme;
}
});
if(0==e.indexOf("https://itunes.apple.com/")||0==e.indexOf("http://itunes.apple.com/"))return s.app_info&&s.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&openWebAppStore(e,c);
}):openWebAppStore(e,c),!1;
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var m={
source:4,
tid:a,
idx:i,
mid:t,
appuin:n,
pt:p,
aid:o,
ad_engine:_,
pos_type:r
},u=window.__report;
if(d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var f="",g="";
d&&(f=d.pkgname&&d.pkgname.replace(/\./g,"_"),g=d.channel_id||""),m={
source:4,
tid:a,
traceid:a,
mid:t,
idx:i,
appuin:n,
pt:p,
channel_id:g,
aid:o,
engine:_,
pos_type:r,
pkgname:f
};
}
e=URL.join(e,m),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:o,
engine:_
})),!o&&u&&u(80,e);
}
OpenUrlWithExtraWebview(e);
}
function handleH5(e,a,i,t,n,p,o,_,r,d,s){
if(console.info("[APPMSG AD DEBUG] handle h5",s),-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var c={
source:4,
tid:a,
idx:i,
mid:t,
appuin:n,
pt:p,
aid:o,
ad_engine:_,
pos_type:r
},l=window.__report;
if(("104"==p||"113"==p||"114"==p||"122"==p)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",u="";
d&&(m=d.pkgname&&d.pkgname.replace(/\./g,"_"),u=d.channel_id||""),c={
source:4,
tid:a,
traceid:a,
mid:t,
idx:i,
appuin:n,
pt:p,
channel_id:u,
aid:o,
engine:_,
pos_type:r,
pkgname:m
};
}
e=URL.join(e,c),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:o,
engine:_
})),!o&&l&&l(80,e);
}
console.info("[APPMSG AD DEBUG] handle h5 url",e),OpenUrlWithExtraWebview(e);
}
var mmversion=require("biz_wap/utils/mmversion.js"),js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),js_cpc_area=document.getElementsByTagName("mpcpc"),contentWrp=document.getElementById("js_content"),gdt_pos_4={},Device=require("biz_wap/utils/device.js"),Sign=require("a/a_sign.js"),OpenUrlWithExtraWebview=require("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,ANDROID_APP_PRODUCT_TYPE=12,IOS_APP_PRODUCT_TYPE=19;
js_cpc_area.length>0?(js_cpc_area=document.getElementsByTagName("mpcpc")[0],gdt_pos_4=js_cpc_area.getElementsByClassName("js_ad_link")):js_cpc_area=void 0;
var globalAdDebug=!!_GetQuery("mock"),pos_type=window.pos_type||0,__report=window.__report,total_pos_type=5,el_gdt_areas={
pos_4:js_cpc_area,
pos_3:js_sponsor_ad_area,
pos_0:js_bottom_ad_area
},ad_render_object={
pos_4:null,
pos_3:null,
pos_0:null
},gdt_as={
pos_4:gdt_pos_4,
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
},isScroll=!1,isSee=!1;
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("a/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),Wxopen_card=require("a/wxopen_card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),ParseJs=require("biz_common/utils/url/parse.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),cpc_a_tpl=require("a/cpc_a_tpl.html.js"),Report=require("biz_common/utils/report.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),ParseJs=require("biz_common/utils/url/parse.js"),log=require("appmsg/log.js"),CrtManager=require("a/tpl/crt_tpl_manager.js"),ping_apurl={
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
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/articleReport.js","biz_wap/utils/ajax.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js"],function(e,o,i,t){
"use strict";
function n(){
var e=window.location.protocol+"//",o=a.indexOf("://")<0?e+a:a;
if(-1!=o.indexOf("mp.weixin.qq.com/s")||-1!=o.indexOf("mp.weixin.qq.com/mp/appmsg/show")||-1!=o.indexOf("mp.weixin.qq.com/mp/homepage")){
var i=o.split("#");
o=m.addParam(i[0],"scene",25,!0)+(i[1]?"#"+i[1]:""),o=o.replace(/#rd$/g,"#wechat_redirect");
}else o=e+"mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);
try{
if("mp.weixin.qq.com"!=top.window.location.host)return window.top.open(o,"_blank"),
!1;
}catch(t){}
var n=location.search.replace("wx_header","del_wx_header"),r={
url:"/mp/advertisement_report"+n+"&report_type=3&action_type=0&url="+encodeURIComponent(a)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
},s=window.__second_open__?1:0;
return r.timeout=2e3,r.complete=function(){
l(o,{
sample:s,
reject:function(){
location.href=o;
}
});
},c(r),!1;
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),m=e("biz_common/utils/url/parse.js"),s=e("appmsg/articleReport.js"),c=e("biz_wap/utils/ajax.js"),p=msg_title.htmlDecode(),a=msg_source_url.htmlDecode(),l=e("appmsg/open_url_with_webview.js"),_=e("biz_wap/jsapi/core.js");
s.init({
dom:document.getElementById("js_report_article3"),
title:p,
link:window.msg_link
});
var d=document.getElementById("js_view_source");
r.on(d,"click",function(){
return n(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js","biz_wap/utils/mmversion.js"],function(e){
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
if(window.__wxjs_is_wkwebview||window.__second_open__){
var i=f.getData(),m=localStorage.getItem("hand_up_id");
for(var w in i)w!=m&&i[w]&&(s(i[w].val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random(),
f.remove(w));
window.setInterval(function(){
var e=a();
f.set(x,e,+new Date+864e7);
},1e3);
}
var l=v.getData("spad");
l&&l.spad&&r(l.spad.val),e.hasSpAd&&window.setInterval(function(){
d();
var e=_();
v.set("spad",e,+new Date+864e7);
},1e3);
}),m.on(window,"unload",function(){
if(console.log("test unload"),!window.__second_open__){
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=a();
s(e);
}
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
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,s=0,d=e.length;d>s;++s)o=e[s],
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
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=u.js_content,n=u.screen_height,a=u.screen_width,s=u.scroll_height,d=Math.ceil(s/n),_=Math.ceil((o.scrollHeight||o.offsetHeight)/n),r=(window.logs.read_height||t)+n,m=u.pageEndTop,w=u.imgs,l=Math.ceil(r/n)||1,g=u.media,h=50,f=0,v=0,b=0,T=0,z=r+h>m?1:0;
l>d&&(l=d);
var O=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
f++;
var a=i.getAttribute("src"),s=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(v++,a.isCDN()&&(b++,-1!=a.indexOf("tp=webp")&&T++),s&&(e["img_"+s+"_cnt"]=e["img_"+s+"_cnt"]||0,
e["img_"+s+"_cnt"]++));
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
report_bizuin:biz,
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
e.ascene=window.ascene||-1,0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),e;
}
function s(e){
z||(z=!0,f.remove(x),e.report_time=parseInt(+new Date/1e3),w({
url:"/mp/appmsgreport?action=page_time&__biz="+biz,
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function d(){
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
var c,g=e("biz_wap/utils/storage.js"),p=e("biz_wap/utils/hand_up_state.js"),u=(e("biz_wap/utils/mmversion.js"),
{
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
}),h=new g("page_pos"),f=new g("time_on_page"),v=new g("spad"),y={},b={},j=!1,T=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],z=!1,O=null,S=0,E=[biz,sn,mid,idx].join("_"),I=Math.random(),x=[biz,sn,mid,idx,I].join("_");
return{
init:t
};
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
P&&clearTimeout(P),P=setTimeout(function(){
try{
P=null;
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
for(var n=window.pageYOffset||document.documentElement.scrollTop,a=window.innerHeight||document.documentElement.clientHeight,m=0;m<C.length;m+=B){
var l=C[m];
if(!(l.offsetTop>n+a+100)){
var _=g.attr(l,"data-cpsstatus");
if("hide"==_){
l.setAttribute("data-cpsstatus","loading");
for(var u=""+m,f=1,h=m+1;h<C.length&&m+B>h;h++)u=u+"%2c"+h,f++;
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
e>=40&&!q?(document.title=window.title,q=!0):40>e&&q&&(document.title="",q=!1);
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
var K={
cps_isready:!1,
cps_state:"",
pid_type:"",
img_url:"",
title:"",
desc:"",
source_name:"",
source_logo_url:"",
is_ad:1
},N=g.attr(C[S],"data-templateid");
"list"==N?C[S].innerHTML=r.tmpl(p,K):"banner"==N?C[S].innerHTML=r.tmpl(s,K):"card"==N&&(C[S].innerHTML=r.tmpl(d,K));
}
}catch(M){
console.log(M);
}
var L,P=null;
o(),v.on(window,"scroll",o),a(),v.on(window,"scroll",x),window.is_new_msg&&-1!=navigator.userAgent.indexOf("MicroMessenger")&&(window.title&&(window.title=window.title.replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&")),
console.log("hd_head_img:"+hd_head_img),A.invoke("currentMpInfo",{
brandName:window.title,
brandIcon:hd_head_img.replace(/\/0$/,"/132")
},function(e){
console.log("currentMpInfo res: "+e);
}),v.on(window,"load",function(){
document.title="",q=!1,E();
}),window.onscroll=E,window.addEventListener("pageshow",E));
var D=document.getElementsByTagName("body");
if(!D||!D[0])return!1;
D=D[0],h.isInMiniProgram&&(document.getElementById("js_name")&&l.addClass(document.getElementById("js_name"),"tips_global_primary"),
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
var G=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var J=!h.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
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
(z||navigator.userAgent.indexOf("Br_trunk")>-1)&&o&&h.isIOS&&h.gtVersion("6.5.13",!0)?(console.log("当前版本可以启用img代理"),
A.invoke("imageProxyInit",{},function(t){
console.log(t),t.err_msg.indexOf(":ok")>-1?(R=t.serverUrl,window.__addIdKeyReport("28307",117)):t.err_msg.indexOf(":fail")>-1&&window.__addIdKeyReport("28307",118),
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
return n=0,t=t.https2http(),e.__retryload=n,e.src=G.addParam(t,"retryload",n,!0),
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
r&&(r.isCDN()&&(r=r.imgChange640(),t&&(r=G.addParam(r,"tp","webp",!0)),r=G.addParam(r,"wxfrom","5",!0),
is_https_res||k?r=r.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(r=r.https2http())),
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
crossOrigin:!0,
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
l&&(n>=43305||s>=16)&&44206!=n&&o.isGif()?(o=G.addParam(o,"tp","wxpic",!0),window.__addIdKeyReport("28307",91)):window.webp&&(o=G.addParam(o,"tp","webp",!0),
window.__addIdKeyReport("28307",84)),o=G.addParam(o,"wxfrom","5",!0),is_https_res||k?(o=o.http2https(),
window.__addIdKeyReport("28307",77)):("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(o=o.https2http(),
window.__addIdKeyReport("28307",70));
}else try{
var a=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
a.test(t)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(w){}
var g=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
o=o.replace(g,"http://m.qpic.cn"),o=G.addParam(o,"wx_lazy","1",!0);
return R&&o.isGif()&&(window.__addIdKeyReport("28307",106),o=G.addParam(o,"tp","wxpic",!0),
o=R+"hevc?url="+encodeURIComponent(o)+"&type=gif"),"anonymous"==e.crossOrigin&&(o=G.addParam(o,"wx_co","1",!0)),
window.logs.img.load[o]=!0,_("[Appmsg] image_load_event_change_src. originsrc:"+t+"  ^^^ newsrc : "+o),
e.start_load_time=+new Date,o;
},
onerror:function(e,t){
var o=t?t.__retryload||0:0;
if(1==o&&n(t),e&&!(o>d)){
if(!e.isCDN()){
if(!R)return;
if(-1==e.indexOf(R))return;
}
var i=0==e.indexOf("https://")?7:0;
if(window.__addIdKeyReport("28307",72+i),window.__addIdKeyReport("28307",75+1*o+i),
e.isWxpic()?(window.__addIdKeyReport("28307",93),window.__addIdKeyReport("28307",96+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",86),
window.__addIdKeyReport("28307",89+1*o)),R&&e.indexOf(R)>-1&&window.__addIdKeyReport("28307",108),
d>o){
if(o++,t.__retryload=o,1==o&&e.indexOf("http://")>-1?(e=e.http2https(),window.__addIdKeyReport("28307",60),
window.__addIdKeyReport("28307",77)):1==o&&e.indexOf("https://")>-1&&(window.__addIdKeyReport("28307",61),
window.__addIdKeyReport("28307",77)),R&&e.indexOf(R)>-1){
var a=e.split("hevc?url=")[1];
a=a.split("&type")[0],a=decodeURIComponent(a),a=a.replace("tp=wxpic",""),e=a.https2http();
}
t.start_load_time=+new Date,t.src=G.addParam(e,"retryload",o,!0);
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
window.__addIdKeyReport("28307",87+1*o)),R&&e.indexOf(R)>-1&&window.__addIdKeyReport("28307",107),
window.__has_imgsucceed||(window.__has_imgsucceed=!0,window.__addIdKeyReport("28307",64)),
1==o&&e.indexOf("http://")>-1&&window.__addIdKeyReport("28307",50),1==o&&e.indexOf("https://")>-1&&window.__addIdKeyReport("28307",52);
var p=Math.random(),c=+new Date-t.start_load_time;
c&&0==e.indexOf("https://")&&.5>p?(window.__addIdKeyReport("27822",121,c),window.__addIdKeyReport("27822",122)):c&&5e-4>p&&(window.__addIdKeyReport("27822",124,c),
window.__addIdKeyReport("27822",125)),"none"!=getComputedStyle(t).filter&&(t.style.transform="translateZ(0)",
t.style.webkitTransform="translateZ(0)");
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
h.isIOS&&location.href.match(/fontScale=\d+/)&&A.on("menu:setfont",function(e){
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
}),!J){
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
var t=e.getAttribute("class");
if(t){
for(var i=t.split(/\s+/),a=[],r=0,s=i.length;s>r;++r){
var d=i[r];
if(d&&-1!=o.indexOf(d))a.push(d);else for(var p=0,c=n.length;c>p;p++)if(n[p].test(d)){
a.push(d);
break;
}
}
e.setAttribute("class",a.join(" "));
}
},a=0,r=t.length;r>a;++a){
var s=t[a];
s&&s.tagName&&"iframe"!=s.tagName.toLowerCase()&&i(s);
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
var e="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
window.__second_open__?A.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
-1==t.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
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
if(J){
document.title=window.title,l.addClass(D,"not_in_mm");
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
var x=window.user_uin||0,E=Math.floor(x/100)%1e3,k=0!==x&&1001>E,z=!0,R="",B=5;
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
var q=!1;
});
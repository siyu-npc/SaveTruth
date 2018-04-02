define("new_video/plugin/imgAd.html.js",[],function(){
return'<!--前贴片广告：图片展示区域-->\n<div id="js_mpvedio_imgad_<#=id#>" style="display:none;width:<#=width#>px;height:<#=height#>px;">	  \n	<div class="video_ad js_ad_controll" style="display:none;">  \n		<span class="button_left_time video_ad_time_meta">广告<span class="button_left_time_num js_play_time"></span></span>\n	    <a href="javascript:void(0);" class="btn_close js_btn_can_close_ad video_ad_time_meta" style="display:none;">可在<span class="js_can_close_time">(5s)</span>后关闭</a>\n	    <a href="javascript:void(0);" class="btn_close js_btn_close_ad video_ad_time_meta" style="display:none;">关闭<i></i></a>\n	</div>\n	<!-- 广告详情入口 -->\n	<div class="video_ad_detail js_ad_detail" style="display:none;">\n	    <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_detail">了解详情</a>\n	</div>\n	<div class="video_ad_detail js_ad_app" style="display:none;">\n	    <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_app">下载应用</a>\n	</div>\n\n    <!-- 跟播放器相同比例是style加上：\n    -webkit-background-size:cover;background-size:cover;  -->\n    <div style="background-image:url(<#=imgUrl#>);"  class="js_img imgad_cover">\n        <!--\n	    <img src="<#=imgUrl#>">\n        -->\n	</div>\n</div>\n';
});define("biz_wap/jsapi/app.js",["biz_wap/jsapi/core.js"],function(n){
"use strict";
var a=n("biz_wap/jsapi/core.js"),o={
getInstallState:function(n,o){
a.invoke("getInstallState",n,o);
},
launch3rdApp:function(n,o){
a.invoke("launch3rdApp",n,o);
},
addDownloadTask:function(n,o){
a.invoke("addDownloadTask",n,o);
},
cancelDownloadTask:function(n,o){
a.invoke("cancelDownloadTask",n,o);
},
queryDownloadTask:function(n,o){
a.invoke("queryDownloadTask",n,o);
},
installDownloadTask:function(n,o){
a.invoke("installDownloadTask",n,o);
},
downloadStateChange:function(n){
a.on("wxdownload:state_change",n);
}
};
return o;
});define("new_video/plugin/imgAd.js",["new_video/plugin/imgAd.html.js","biz_common/tmpl.js"],function(t){
"use strict";
var i=t("new_video/plugin/imgAd.html.js"),o=t("biz_common/tmpl.js"),e=0,n=function(t){
var n=t.duration||0,r=this,r=this,u=r.container=$(t.container);
r.opt=t,r.duration=n,r.currentTime=0,r.clock=null,t.id=r.id=e++,u.append(o.tmpl(i,t)),
r.dom=$("#js_mpvedio_imgad_"+r.id),this._getImageRatio();
};
return n.prototype._getImageRatio=function(){
var t=this,i=this.opt,o=new window.Image;
o.onload=function(){
var e=o.naturalWidth||o.width||0,n=o.naturalHeight||o.height||0;
e&&n&&Math.abs(e/n-i.ratio)<=.1&&t.dom.find(".js_img").css({
"-webkit-background-size":"cover",
"background-size":"cover"
}),o.onload=null,o=null;
},o.src=i.imgUrl;
},n.prototype._trigger=function(t){
var i=this;
i[t]&&i[t]();
},n.prototype._getContainer=function(){
return this.dom;
},n.prototype.beginPlay=function(){
var t=this,i=t.dom;
i.show(),t.clock=setTimeout(function(){
t.timeupdate();
},100);
},n.prototype._hidePlayer=function(){
this.dom.hide();
},n.prototype.play=function(){
this.dom.show(),this.beginPlay();
},n.prototype.pause=function(){
var t=this;
t.clock&&clearTimeout(t.clock);
},n.prototype.setVideoCSS=function(t){
this._getContainer().css(t);
},n.prototype.timeupdate=function(){
var t=this,i=t.opt;
return t.currentTime>t.duration?void(i.onEnd&&i.onEnd("end")):(t.currentTime+=100,
setTimeout(function(){
t.timeupdate();
},100),void(i.onTimeupdate&&i.onTimeupdate("end",{
currentTime:t.currentTime/1e3
})));
},n;
});define("biz_wap/utils/hashrouter.js",[],function(){
"use strict";
function e(e,s){
h.push([e,s]);
}
function s(){
var e,s,t,i,r=a.hash.substr(1),o=!1,u=[];
for(e=0;e<h.length;e++)if(s=h[e],t=s[0],i=s[1],"default"!==t){
if("string"==typeof t&&t==r||t instanceof RegExp&&t.test(r)){
i(n),o=!0;
break;
}
}else u.push(i);
o||u.forEach(function(e){
e(n);
}),n=r;
}
var t=top.window,a=t.location,n=a.hash.substr(1),h=t.__HashMap=t.__HashMap||[];
return t.__hasListenedHashChange||(t.addEventListener("hashchange",s),t.addEventListener("load",s),
t.__hasListenedHashChange=!0),{
get:e
};
});define("biz_wap/jsapi/log.js",["biz_wap/jsapi/core.js"],function(o){
"use strict";
function r(o,r){
r=e+" "+r+" location:["+location.href+"]",n.invoke("log",{
level:o,
msg:r
}),n.invoke("writeLog",{
level:o,
msg:r
});
}
var n=o("biz_wap/jsapi/core.js"),e="__wap__",i={
info:function(){
r("info",Array.prototype.join.apply(arguments));
},
warn:function(){
r("warn",Array.prototype.join.apply(arguments));
},
error:function(){
r("error",Array.prototype.join.apply(arguments));
},
debug:function(){
r("debug",Array.prototype.join.apply(arguments));
}
};
return i.log=i.info,i;
});define("new_video/plugin_base.js",[],function(){
"use strict";
var t=0,o=function(t,o){
var e=function(){};
e.prototype=o.prototype,t.prototype=new e,t.prototype.constructor=t,t.uber=o.prototype;
},e=function(){
this.player=null;
};
return e.prototype.setPlayer=function(t){
this.player=t;
},e.prototype.setBlockEvt=function(t){
this.player._setBlockPlugin(t,this);
},e.prototype.setUnblockEvt=function(t){
this.player._setBlockPlugin(t,null);
},e.prototype.recv=function(o){
var e=this[o+"Handler"];
return"function"==typeof e?e.apply(this,arguments):t;
},{
Class:e,
inherit:o,
BASE_BITSET:t
};
});define("pages/video_like.html.js",[],function(){
return'<div class="wrp_video_continue" aria-hidden="true">\n    <div class="wrp_video_continue_inner">\n        <div class="tit_desc"><span>以下视频将跳到腾讯视频播放</span></div>\n        <dl id="like_info_dd" class="dl_video_continue">  \n            <# for(var i=0,il=like.length;i<il;i++){ #>\n            <dd class="dd_continue_inner" >\n            <# var a=like[i]; #>\n            <ul class="js_video_list video_list">\n                <# for(var j=0,jl=a.length;j<jl;j++){ #>\n                <# var d=a[j]; #>\n                <li data-id="<#=d.id#>" data-id_type="<#=d.id_type#>" data-alginfo="<#=d.alginfo#>" data-pcurl="<#=d.playurl#>" class="video_item clearfix">\n                <a href="javascript:void(0);" class="inner_item">\n                    <img  class="cover" src="" back_src="<#=d.pic3url#>"/>\n                    <div class="desc">\n                        <#=d.title#>\n                    </div>\n                </a>\n                </li> \n                <# } #>\n            </ul>\n            </dd>\n            <# } #> \n        </dl>\n        <div class="continue_opr"><a href="javascript:void(0);" class="btn_replay js_replay" aria-hidden="true"><i class="icon_replay"></i>重新播放</a></div>\n        <div id="like_title" class="continue_nav">\n            <# for(var i=0,il=like.length;i<il;i++){ #>\n            <span class="nav_dot <# if(i==cur){ #>current<# } #>"></span>\n            <# } #>\n        </div>\n        <div id="end_download" class="inner_app_download_container" style="display:none;">\n            <div class="inner_app_download_bd js_progress_main" style="display:table-cell;">\n                <p class="inner_app_download_tips">正在下载腾讯视频，马上就能看哟</p>\n                <div class="app_download_progress_wrp">\n                    <div class="app_download_progress js_progress" style="width:50%"></div>\n                </div>\n            </div>\n            <div class="inner_app_download_bd success js_suc_main" style="display:none;">\n                <p class="inner_app_download_tips js_suc_text">安装完成后，点击以上视频播放</p>\n            </div>\n        </div>\n    </div>\n</div>\n\n';
});define("pages/slider.js",["biz_wap/zepto/zepto.js"],function(t){
"use strict";
function i(t){
this.opt={
titleId:"",
titleTag:"",
contentId:"",
contentTag:"",
className:"current",
autoLag:5e3,
backAttr:"back_src",
stopMoveEvent:!0,
func:function(){}
},n(this.opt,t),this._g={
diffX:0,
diffY:0,
ratio:1,
current:0,
_imgs:[],
_cont:[],
oContent:null,
perWidth:0,
minX:0,
maxX:0,
_tabs:[],
xStyle:"translate3d(0, 0, 0)",
isMoving:!1
},this._init();
}
function n(t,i){
for(var n in i)t[n]=i[n];
}
return t("biz_wap/zepto/zepto.js"),i.prototype={
_init:function(){
{
var t=this,i=t.opt;
t._g;
}
i.contentId&&(this._initContent(),this._bindEvent()),this._setAuto();
},
_initContent:function(){
var t=this,i=t.opt,n=t._g;
n.oContent=$("#"+i.contentId),n.perWidth=n.oContent.width(),n.oContent.find(i.contentTag).each(function(){
var t=$(this),i=t[0].style;
i.width=n.perWidth+"px",i.visibility="hidden",i["float"]="left",n._cont.push(t);
}),n.totalWidth=n.perWidth*n._cont.length,n.maxX=n.perWidth/4,n.minX=-n.totalWidth+n.perWidth-n.maxX;
var o=n.oContent[0].style;
if(o.width=n.totalWidth+"px",o.webkitTransform=n.xStyle,o.transform=n.xStyle,i.titleId){
n.oTitle=$("#"+i.titleId);
var e=0;
n.oTitle.find(i.titleTag).each(function(){
var t=$(this);
t.attr("index",e++),n._tabs.push(t);
});
}
this._showItem(n.current);
},
_bindEvent:function(){
var t=this,i=(t.opt,t._g);
i.oContent.on("touchstart",function(t){
if(!i.isMoving){
var n=t.touches[0];
i.x=n.clientX,i.y=n.clientY;
}
}).on("touchmove",function(n){
var o=n.touches[0],e=o.clientX-i.x,s=o.clientY-i.y;
Math.abs(e)>Math.abs(s)&&(t._stopAuto(),n.preventDefault(),n.stopPropagation(),i.diffX=e,
t._moveWrapper());
}).on("touchend",function(){
i.isMoving||(t._slideTo(),t._setAuto());
}).on("touchcancel",function(){
i.isMoving||(t._slideTo(),t._setAuto());
});
},
_moveWrapper:function(){
var t=(this.opt,this._g),i=-t.current*t.perWidth+t.diffX;
i>t.maxX?i=t.maxX:i<t.minX&&(i=t.minX);
var n="translate3d("+i+"px, 0, 0)",o=t.oContent[0].style;
o.webkitTransform=n,o.transform=n;
},
_slideTo:function(t){
var i,n=(this.opt,this._g),o=n.current;
if("undefined"!=typeof t)o=t,i=-n.ratio;else{
var e=parseInt(n.diffX/n.perWidth),s=n.diffX%n.perWidth;
i=Math.abs(s)/s*1,o-=e,Math.abs(s)>70&&(o-=i);
}
o>n._cont.length-1?o=n._cont.length-1:0>o&&(o=0);
for(var a=Math.abs(n.current-o),r=0;a>r;r++)this._showItem(n.current-i);
n.current=o,0==n.current?n.ratio=1:n.current==n._cont.length-1&&(n.ratio=-1),n.diffX=0,
this._animateTo(),this._setAuto();
},
_animateTo:function(){
{
var t=(this.opt,this._g);
-t.current*t.perWidth;
}
t.isMoving=!0,this._addAnimation(),this._moveWrapper(),setTimeout(function(){
t.isMoving=!1;
var i=t.oContent[0].style;
i.transition="",i.webkitTransition="";
},300);
},
_addAnimation:function(){
var t="all 0.3s ease",i=this._g.oContent[0].style;
i.transition=t,i.webkitTransition=t;
},
_showItem:function(t){
var i=this.opt,n=this._g;
if(!(0>t||t>n._cont.length)){
if(n._cont[t]&&n._imgs[t]!==!0&&(n._cont[t][0].style.visibility="visible",$(n._cont[t]).find("img").each(function(){
var t=$(this);
t.attr("src",t.attr(i.backAttr));
}),n._imgs[t]=!0),n._tabs[t]){
for(var o=0,e=n._tabs.length;e>o;o++)o!=t&&n._tabs[o].removeClass(i.className);
n._tabs[t].addClass(i.className);
}
i.func(t);
}
},
_setAuto:function(t){
var i=this,n=i.opt,o=i._g;
this._stopAuto(),t!==!0||o.isMoving?o.autoIntr=setInterval(function(){
o.isMoving||i._slideTo(o.current+1*o.ratio);
},n.autoLag):i._slideTo(o.current+1*o.ratio);
},
_stopAuto:function(){
!!this._g.autoIntr&&clearInterval(this._g.autoIntr);
}
},i;
});define("pages/app_open.js",["pages/version4video.js","biz_wap/jsapi/app.js","biz_wap/jsapi/core.js"],function(o,a,n,e){
"use strict";
function t(o){
this._o={
pc_open_url:"",
packageUrl:"",
packageName:"",
wp_open_url:"",
wp_download_url:"",
ios_open_url:"",
android_open_url:"",
ios_download_url:"",
android_download_url:"",
android_md5:"",
task_name:"",
autoInstall:!0,
download_fail_callback:function(){},
download_remove_callback:function(){},
check_downloading_callback:function(){},
final_fail_callback:function(){},
before_open_callback:function(){},
beforeDownload:function(){},
download_start_callback:function(){},
download_complete_callback:function(){}
},this._g={},l(this._o,o);
}
function d(o){
r.installDownloadTask({
download_id:o
},function(){});
}
function l(o,a){
for(var n in a)o[n]=a[n];
}
function i(){
return w.system;
}
function s(o){
"function"==typeof o.callback&&("ios"==w.system&&o.packageUrl||"android"==w.system&&o.packageName?r.getInstallState({
packageUrl:o.packageUrl||"",
packageName:o.packageName||""
},function(a){
var n=a.err_msg;
o.callback(n.indexOf("get_install_state:yes")>-1?!0:!1);
}):o.callback(!1));
}
var _=o("pages/version4video.js"),c=_.device,r=o("biz_wap/jsapi/app.js"),p=o("biz_wap/jsapi/core.js"),w={
system:"other",
inWechat:c.inWechat,
windowWechat:/WindowsWechat/i.test(navigator.userAgent),
macWechat:/wechat.*mac os/i.test(navigator.userAgent),
debug:top.window.location.href.indexOf("&vconsole=1")>=0?!0:!1
};
return function(){
w.system=c.is_ios?"ios":c.is_android?"android":c.is_wp?"wp":c.is_pc?"pc":"other",
top!=window&&(document.domain="qq.com");
}(),t.prototype._checkInstallState=function(){
var o=this,a=this._o,n=this._g;
"ios"==w.system&&a.packageUrl||"android"==w.system&&a.packageName?r.getInstallState({
packageUrl:a.packageUrl||"",
packageName:a.packageName||""
},function(a){
var e=a.err_msg;
e.indexOf("get_install_state:yes")>-1?(n.installed=!0,o._openApp()):(n.installed=!1,
o._downloadApp());
}):"wp"==w.system&&a.wp_open_url&&a.wp_download_url?o._openWpApp():a.final_fail_callback.call(o);
},t.prototype._openApp=function(){
function o(o){
p.invoke("launchApplication",{
schemeUrl:o
},function(n){
w.debug&&top.window.console.log("launchApplication res:"+JSON.stringify(n)),/:ok$/.test(n.err_msg)||a._jumpUrl(o);
});
}
var a=this,n=this._o;
"ios"==w.system&&n.ios_open_url?(n.before_open_callback.call(this,{
type:5
}),o(n.ios_open_url)):"android"==w.system&&n.android_open_url&&(n.before_open_callback.call(this,{
type:3
}),o(n.android_open_url));
},t.prototype._jumpUrl=function(o){
w.inWechat?w.windowWechat||w.macWechat?window.location.href=o:p.invoke("openUrlWithExtraWebview",{
url:o,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(window.location.href=o);
}):window.location.href=o;
},t.prototype._downloadApp=function(){
var o=this._o,a=this._g;
"ios"==w.system&&o.ios_download_url?(o.before_open_callback.call(this,{
type:4
}),this._jumpUrl(o.ios_download_url)):"android"==w.system&&o.android_download_url&&o.android_md5&&("undefined"!=typeof a.download_id?this._checkDownloadAndroidApp():(o.before_open_callback.call(this,{
type:2
}),this._downloadAndroidApp()));
},t.prototype._openWpApp=function(){
var o=this._o,a=document.createElement("iframe"),n=(new Date).valueOf();
a.style.display="none",a.src=o.wp_open_url,document.body.appendChild(a),setTimeout(function(){
var a=(new Date).valueOf();
1550>a-n&&(window.location.href=o.wp_download_url);
},1500);
},t.prototype._checkDownloadAndroidApp=function(){
var o=this,a=this._o,n=this._g;
r.queryDownloadTask({
download_id:n.download_id
},function(e){
return w.debug&&top.window.console.log("queryDownloadTask res:"+JSON.stringify(e)),
e&&"undefined"!=typeof e.state&&"default"!=e.state?void("download_succ"==e.state?(a.download_complete_callback.call(o,n.download_id),
a.autoInstall&&o._installAndroidApp()):"download_fail"==e.state?o._downloadFail():"downloading"==e.state&&a.check_downloading_callback.call(o,n.download_id)):void o._downloadRemoved();
});
},t.prototype._downloadAndroidApp=function(){
var o=this,a=this._o,n=this._g;
if(n.download_id=void 0,a.beforeDownload.call(this)!==!1){
var t={
title:a.title||"",
thumb_url:a.thumb_url||"",
task_name:a.task_name,
task_url:a.android_download_url,
file_md5:a.android_md5
};
w.debug&&top.window.console.log("addDownloadTask param:"+JSON.stringify(t)),r.addDownloadTask(t,function(t){
w.debug&&top.window.console.log("addDownloadTask res:"+JSON.stringify(t)),/:ok$/.test(t.err_msg)?(n.download_id=t.download_id,
a.download_start_callback.call(o,n.download_id),o._downloadStateChange()):/:fail_network_not_connected$/.test(t.err_msg)?setTimeout(function(){
e("当前网络不可用，请检查");
},0):/:fail_sdcard_not_ready$/.test(t.err_msg)?setTimeout(function(){
e("sd卡不可用，请检查");
},0):/:fail_sdcard_has_not_enough_space$/.test(t.err_msg)&&setTimeout(function(){
e("手机空间不足，请检查");
},0);
});
}
},t.prototype._downloadStateChange=function(){
var o=this,a=this._o,n=this._g;
r.downloadStateChange(function(e){
return w.debug&&top.window.console.log("downloadStateChange res:"+JSON.stringify(e)),
e&&"undefined"!=typeof e.download_id&&"download_removed"!=e.state?e.download_id!=n.download_id?void o._downloadRemoved():void("download_succ"==e.state?(a.download_complete_callback.call(o,n.download_id),
a.autoInstall&&o._installAndroidApp()):"download_fail"==e.state&&o._downloadFail()):void o._downloadRemoved();
});
},t.prototype._installAndroidApp=function(){
var o=(this._o,this._g);
"undefined"!=typeof o.download_id&&r.installDownloadTask({
download_id:o.download_id
},function(o){
w.debug&&top.window.console.log("installDownloadTask res:"+JSON.stringify(o));
});
},t.prototype._downloadRemoved=function(){
var o=this._g,a=this._o;
o.download_id=void 0,a.download_remove_callback.call(this);
},t.prototype._downloadFail=function(){
var o=this._g,a=this._o;
o.download_id=void 0,a.download_fail_callback.call(this);
},t.prototype.open=function(){
var o=this._o;
"pc"==w.system&&o.pc_open_url?(o.before_open_callback.call(this,{
type:1
}),top!=window?top.window.open(o.pc_open_url):window.open(o.pc_open_url)):!w.inWechat||"ios"!=w.system&&"android"!=w.system&&"wp"!=w.system?o.final_fail_callback.call(this):this._checkInstallState();
},{
install:d,
create:t,
getSystemType:i,
checkInstallState:s
};
});define("pages/video_plugin/sha1.js",[],function(){
"use strict";
var r=function(){
function r(r,t,n){
var e,o,h,p,l,d,v,A,w,F=0,R=[],B=0,U=!1,y=[],T=[],H=!1;
if(n=n||{},e=n.encoding||"UTF8",w=n.numRounds||1,h=c(t,e),w!==parseInt(w,10)||1>w)throw Error("numRounds must a integer >= 1");
if("SHA-1"!==r)throw Error("Chosen SHA variant is not supported");
l=512,d=b,v=g,p=160,A=function(r){
return r.slice();
},o=E(r),this.setHMACKey=function(t,n,a){
var u;
if(!0===U)throw Error("HMAC key already set");
if(!0===H)throw Error("Cannot set HMAC key after calling update");
if(e=(a||{}).encoding||"UTF8",n=c(n,e)(t),t=n.binLen,n=n.value,u=l>>>3,a=u/4-1,t/8>u){
for(n=v(n,t,0,E(r),p);n.length<=a;)n.push(0);
n[a]&=4294967040;
}else if(u>t/8){
for(;n.length<=a;)n.push(0);
n[a]&=4294967040;
}
for(t=0;a>=t;t+=1)y[t]=909522486^n[t],T[t]=1549556828^n[t];
o=d(y,o),F=l,U=!0;
},this.update=function(r){
var t,n,e,a=0,u=l>>>5;
for(t=h(r,R,B),r=t.binLen,n=t.value,t=r>>>5,e=0;t>e;e+=u)r>=a+l&&(o=d(n.slice(e,e+u),o),
a+=l);
F+=a,R=n.slice(a>>>5),B=r%l,H=!0;
},this.getHash=function(t,n){
var e,c,h,l;
if(!0===U)throw Error("Cannot call getHash after setting HMAC key");
switch(h=s(n),t){
case"HEX":
e=function(r){
return a(r,p,h);
};
break;

case"B64":
e=function(r){
return u(r,p,h);
};
break;

case"BYTES":
e=function(r){
return i(r,p);
};
break;

case"ARRAYBUFFER":
try{
c=new ArrayBuffer(0);
}catch(b){
throw Error("ARRAYBUFFER not supported by this environment");
}
e=function(r){
return f(r,p);
};
break;

default:
throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
}
for(l=v(R.slice(),B,F,A(o),p),c=1;w>c;c+=1)l=v(l,p,0,E(r),p);
return e(l);
},this.getHMAC=function(t,n){
var e,c,h,b;
if(!1===U)throw Error("Cannot call getHMAC without first setting HMAC key");
switch(h=s(n),t){
case"HEX":
e=function(r){
return a(r,p,h);
};
break;

case"B64":
e=function(r){
return u(r,p,h);
};
break;

case"BYTES":
e=function(r){
return i(r,p);
};
break;

case"ARRAYBUFFER":
try{
e=new ArrayBuffer(0);
}catch(g){
throw Error("ARRAYBUFFER not supported by this environment");
}
e=function(r){
return f(r,p);
};
break;

default:
throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
}
return c=v(R.slice(),B,F,A(o),p),b=d(T,E(r)),b=v(c,p,l,b,p),e(b);
};
}
function t(r,t,n){
var e,o,a,u,i,f=r.length;
if(t=t||[0],n=n||0,i=n>>>3,0!==f%2)throw Error("String of HEX type must be in byte increments");
for(e=0;f>e;e+=2){
if(o=parseInt(r.substr(e,2),16),isNaN(o))throw Error("String of HEX type contains invalid characters");
for(u=(e>>>1)+i,a=u>>>2;t.length<=a;)t.push(0);
t[a]|=o<<8*(3-u%4);
}
return{
value:t,
binLen:4*f+n
};
}
function n(r,t,n){
var e,o,a,u,i=[],i=t||[0];
for(n=n||0,o=n>>>3,e=0;e<r.length;e+=1)t=r.charCodeAt(e),u=e+o,a=u>>>2,i.length<=a&&i.push(0),
i[a]|=t<<8*(3-u%4);
return{
value:i,
binLen:8*r.length+n
};
}
function e(r,t,n){
var e,o,a,u,i,f,s=[],c=0,s=t||[0];
if(n=n||0,t=n>>>3,-1===r.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");
if(o=r.indexOf("="),r=r.replace(/\=/g,""),-1!==o&&o<r.length)throw Error("Invalid '=' found in base-64 string");
for(o=0;o<r.length;o+=4){
for(i=r.substr(o,4),a=u=0;a<i.length;a+=1)e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(i[a]),
u|=e<<18-6*a;
for(a=0;a<i.length-1;a+=1){
for(f=c+t,e=f>>>2;s.length<=e;)s.push(0);
s[e]|=(u>>>16-8*a&255)<<8*(3-f%4),c+=1;
}
}
return{
value:s,
binLen:8*c+n
};
}
function o(r,t,n){
var e,o,a,u=[],u=t||[0];
for(n=n||0,e=n>>>3,t=0;t<r.byteLength;t+=1)a=t+e,o=a>>>2,u.length<=o&&u.push(0),
u[o]|=r[t]<<8*(3-a%4);
return{
value:u,
binLen:8*r.byteLength+n
};
}
function a(r,t,n){
var e="";
t/=8;
var o,a;
for(o=0;t>o;o+=1)a=r[o>>>2]>>>8*(3-o%4),e+="0123456789abcdef".charAt(a>>>4&15)+"0123456789abcdef".charAt(15&a);
return n.outputUpper?e.toUpperCase():e;
}
function u(r,t,n){
var e,o,a,u="",i=t/8;
for(e=0;i>e;e+=3)for(o=i>e+1?r[e+1>>>2]:0,a=i>e+2?r[e+2>>>2]:0,a=(r[e>>>2]>>>8*(3-e%4)&255)<<16|(o>>>8*(3-(e+1)%4)&255)<<8|a>>>8*(3-(e+2)%4)&255,
o=0;4>o;o+=1)u+=t>=8*e+6*o?"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a>>>6*(3-o)&63):n.b64Pad;
return u;
}
function i(r,t){
var n,e,o="",a=t/8;
for(n=0;a>n;n+=1)e=r[n>>>2]>>>8*(3-n%4)&255,o+=String.fromCharCode(e);
return o;
}
function f(r,t){
var n,e=t/8,o=new ArrayBuffer(e);
for(n=0;e>n;n+=1)o[n]=r[n>>>2]>>>8*(3-n%4)&255;
return o;
}
function s(r){
var t={
outputUpper:!1,
b64Pad:"=",
shakeLen:-1
};
if(r=r||{},t.outputUpper=r.outputUpper||!1,!0===r.hasOwnProperty("b64Pad")&&(t.b64Pad=r.b64Pad),
"boolean"!=typeof t.outputUpper)throw Error("Invalid outputUpper formatting option");
if("string"!=typeof t.b64Pad)throw Error("Invalid b64Pad formatting option");
return t;
}
function c(r,a){
var u;
switch(a){
case"UTF8":
case"UTF16BE":
case"UTF16LE":
break;

default:
throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
}
switch(r){
case"HEX":
u=t;
break;

case"TEXT":
u=function(r,t,n){
var e,o,u,i,f,s=[],c=[],h=0,s=t||[0];
if(t=n||0,u=t>>>3,"UTF8"===a)for(e=0;e<r.length;e+=1)for(n=r.charCodeAt(e),c=[],
128>n?c.push(n):2048>n?(c.push(192|n>>>6),c.push(128|63&n)):55296>n||n>=57344?c.push(224|n>>>12,128|n>>>6&63,128|63&n):(e+=1,
n=65536+((1023&n)<<10|1023&r.charCodeAt(e)),c.push(240|n>>>18,128|n>>>12&63,128|n>>>6&63,128|63&n)),
o=0;o<c.length;o+=1){
for(f=h+u,i=f>>>2;s.length<=i;)s.push(0);
s[i]|=c[o]<<8*(3-f%4),h+=1;
}else if("UTF16BE"===a||"UTF16LE"===a)for(e=0;e<r.length;e+=1){
for(n=r.charCodeAt(e),"UTF16LE"===a&&(o=255&n,n=o<<8|n>>>8),f=h+u,i=f>>>2;s.length<=i;)s.push(0);
s[i]|=n<<8*(2-f%4),h+=2;
}
return{
value:s,
binLen:8*h+t
};
};
break;

case"B64":
u=e;
break;

case"BYTES":
u=n;
break;

case"ARRAYBUFFER":
try{
u=new ArrayBuffer(0);
}catch(i){
throw Error("ARRAYBUFFER not supported by this environment");
}
u=o;
break;

default:
throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
}
return u;
}
function h(r,t){
return r<<t|r>>>32-t;
}
function p(r,t){
var n=(65535&r)+(65535&t);
return((r>>>16)+(t>>>16)+(n>>>16)&65535)<<16|65535&n;
}
function l(r,t,n,e,o){
var a=(65535&r)+(65535&t)+(65535&n)+(65535&e)+(65535&o);
return((r>>>16)+(t>>>16)+(n>>>16)+(e>>>16)+(o>>>16)+(a>>>16)&65535)<<16|65535&a;
}
function E(r){
var t=[];
if("SHA-1"!==r)throw Error("No SHA variants supported");
return t=[1732584193,4023233417,2562383102,271733878,3285377520];
}
function b(r,t){
var n,e,o,a,u,i,f,s=[];
for(n=t[0],e=t[1],o=t[2],a=t[3],u=t[4],f=0;80>f;f+=1)s[f]=16>f?r[f]:h(s[f-3]^s[f-8]^s[f-14]^s[f-16],1),
i=20>f?l(h(n,5),e&o^~e&a,u,1518500249,s[f]):40>f?l(h(n,5),e^o^a,u,1859775393,s[f]):60>f?l(h(n,5),e&o^e&a^o&a,u,2400959708,s[f]):l(h(n,5),e^o^a,u,3395469782,s[f]),
u=a,a=o,o=h(e,30),e=n,n=i;
return t[0]=p(n,t[0]),t[1]=p(e,t[1]),t[2]=p(o,t[2]),t[3]=p(a,t[3]),t[4]=p(u,t[4]),
t;
}
function g(r,t,n,e){
var o;
for(o=(t+65>>>9<<4)+15;r.length<=o;)r.push(0);
for(r[t>>>5]|=128<<24-t%32,t+=n,r[o]=4294967295&t,r[o-1]=t/4294967296|0,t=r.length,
o=0;t>o;o+=16)e=b(r.slice(o,o+16),e);
return e;
}
return r;
}(window);
return r;
});define("pages/video_plugin/base.js",[],function(){
"use strict";
var t=0,e=function(t,e){
var n=function(){};
n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.uber=e.prototype;
},n=function(){
this.player=null;
};
return n.prototype.setPlayer=function(t){
this.player=t;
},n.prototype.setBlockEvt=function(t){
this.player._setBlockPlugin(t,this);
},n.prototype.setUnblockEvt=function(t){
this.player._setBlockPlugin(t,null);
},n.prototype.recv=function(e){
var n=this[e+"Handler"];
if("function"==typeof n){
var o=n.apply(this,arguments);
return"undefined"==typeof o||null===o?t:o;
}
return t;
},{
Class:n,
inherit:e,
BASE_BITSET:t
};
});define("pages/video_error.html.js",[],function(){
return'<div style="<#if(typeof width!=\'undefined\'){#>width:<#=width#>px;<#}#><#if(typeof height!=\'undefined\'){#>height:<#=height#>px;<#}#>" class="wrp_pop_tips wx_video_error_box">\n   <div class="wx_video_error_msg js_error_area">\n       <span role="heading"><#=msg#></span><i class="wx_video_error_code">错误码：<#=errcode#></i>\n       <# if(showBtn){ #>\n       <a class="wx_video_error_msg_btn js_video_errormsg_btn" role="button" href="javascript:void(0);">\n           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAqCAMAAADhynmdAAAAQlBMVEUAAACcnJycnJycnJyoqKicnJycnJycnJycnJycnJyfn5+cnJydnZ2enp6kpKSdnZ2cnJyenp6cnJycnJycnJybm5t8KrXMAAAAFXRSTlMAyeb3CNp3tJRvHIEtJhBgqztWRJ+p5TqGAAABCklEQVQ4y5WTi27DIAxFAUMhgTzX8/+/urB2pdKI0x0pSoRuruyLbf7gF3PBaDE6X44LyY0D1SJQsfd9PpMM/CJx60v8SmV1HMSi1lKyA1n0jnwWSO08l04uJbxpBmTrpDtbGB6fmxC6Tc4BHv9aZDJdJsHW9w43Jez9x8T5M4l31WZsJn2bsYY+nUum2lQkGIVANPZ4FCLWOJImSTgjZE2SkU9crmu57mj9JBc93Qzj9R1d3HSG5bN5MRsnUzcGKK8Ns02z+Da7rYQE4bUE2PG1C6kVnkCyf0pwX8/jwbyxCLhcHpKTFkvkwK3pRmXtRrVFoTGYLvN+t0EUl0qrRaF1pFBz0anp/ptvNB4SY1XDAVMAAAAASUVORK5CYII=" alt="" class="wx_video_error_refresh">\n           刷新       </a>\n       <# } #>\n   </div>\n   <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIXRSTlMAOx20pMJbzBQNTDGTh2ohLCZmeUF2hEmXCFdxUquef4yHE17nAAACnklEQVRIx9WW2xqiIBSFRc1AUATJU1a+/1MOm0NYKvnNXM260ZLftRcbqCQinOLI0yiY/iXKuUZPjx5Fk+6RhF1yHiVF0wC6IZfr9fqIkpRqdNyQ9AoiUU8g+YZ8Xn96YmNKvkhkLMskKgEo/yJzaxkXeZsGsjeWKEIFU/FBZgA+D5yEwGtTgR0J18lYUvdcLZ1YkUjLf+a0saYYSG/J3Hury+WSkTCjCETtF6Mvd8QGJMZSWIfsAlKhWGRl5zQ1ZNBDgy/zzvvFavWUK7SyTRs+rsiUZS/4LHIHyo8VgBx7vDkKx2WhPS7dD1Q6cNlu2dTa0gMys4bz/vJR6ph8ADgcVcSVUkfnhzJTc6gRj8fbCOHk30UI2KC+V4gKjskJQqC5frFHli0kafogFIfFkAXVCSqdAFVR8pmtVCWiXCtaarbWpGtQAYx7sjf2GCbfjFRQpH7lTLucveSMBE7+Z6VqViT2/PVs0d7hPk9TUcTaUuVaT8k/f/v6SXOgyG7InZaSvM8vj/309LrbvpSAORDH2/kWGyHhm/u5AYUc8qdFBRRrsV749bRv6I5x1OY50GZUUxQz9aGplAXZcOQ1DL3vwsTyvHQ2YWgjZV2rDTmxYRjUuoBvcQDr7QRLBiiNzJ4BawG3FLtTmEMGBigTRyC2oIKht1vbwLWrKmXKBZal+yApDGhm4q5JCVdNdrZeQBe8B44WnE2NGmxrR1bCvMugHdkhSwMWI9wjIGeosnPlJmNrst6PQrpeFkBSyAmkdD016DYqAVC6HHcNtnCPgazcuytAd5IqB/qYtq4bkP7vnEaL3W4KH9/HhKBAKl8XFUlMIWYIek4hZgh6UtjHBLVA4pPkCKRf9jOQ5Kwp1UvPDyb3qkPJaRG8Ln7f8Q8Bki/Kj5IYnQAAAABJRU5ErkJggg==" class="wx_video_error_loading js_video_errormsg_loading" style="display:none;">\n</div>\n<!--\n<div class="wrp_load_failed">\n   <span class="wrp_icon_info"></span>\n   <p>视频加载失败</p>\n</div>\n-->\n';
});define("new_video/plugin/ad.js",["biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","biz_wap/utils/device.js","biz_wap/utils/ajax.js","biz_wap/utils/storage.js","biz_wap/utils/hashrouter.js","biz_wap/jsapi/core.js","biz_common/utils/monitor.js","new_video/plugin_base.js","new_video/plugin/imgAd.js","new_video/ctl.js","new_video/player.js"],function(require,exports,module,alert){
"use strict";
function log(e){
"undefined"!=typeof JSAPI&&JSAPI.log&&JSAPI.log(e);
}
function setPageTitle(e){
JSAPI.invoke("setPageTitle",{
title:e||""
}),top.window.document.title=e;
}
function videoAdReport(e){
ajax({
url:"/mp/ad_video_report?action="+(e.action||"exposure"),
type:"post",
data:{
step:e.step||"",
view_id:e.view_id||"",
traceid:e.traceid||"",
orderid:e.orderid||0,
ad_source:e.ad_source||0,
report_time:e.report_time,
devicetype:top.window.devicetype,
version:top.window.clientversion,
__biz:top.window.biz||"",
lcount:1
}
});
}
function report3rd(e,t){
e=1e3*e|0,t.forEach(function(t){
1!=t.reported&&e>=t.report_time&&(t.reported=1,iframe&&iframe.contentWindow&&iframe.contentWindow.postMessage(JSON.stringify({
type:"report",
url:t.url
}),location.protocol+"//"+location.host));
});
}
function parseCookie(e){
var t,i;
try{
t=e.split("Expires="),i=t[1]&&t[1].replace(";",""),i=Date.parse(i);
}catch(a){
i=null;
}
return i;
}
require("biz_wap/zepto/zepto.js"),require("biz_wap/zepto/event.js"),require("biz_wap/zepto/touch.js");
var Device=require("biz_wap/utils/device.js"),ajax=require("biz_wap/utils/ajax.js"),LS=require("biz_wap/utils/storage.js"),HashRouter=require("biz_wap/utils/hashrouter.js"),JSAPI=require("biz_wap/jsapi/core.js"),Monitor=require("biz_common/utils/monitor.js"),Plugin=require("new_video/plugin_base.js"),ImgAd=require("new_video/plugin/imgAd.js"),VideoCtl=require("new_video/ctl.js"),Player=require("new_video/player.js"),CAN_CLOSE_TIME=5,AD_TYPE_VIDEO15S=1515,AD_TYPE_VIDEO6S=888,AD_TYPE_IMG5S=555,is_yyb_installed=!1,yyb_pkgname="com.tencent.android.qqdownloader",yyb_min_version=1060125;
JSAPI.invoke("getInstallState",{
packageName:yyb_pkgname
},function(e){
var t=e.err_msg;
log("getInstallState @yingyongbao : "+t);
var i=t.lastIndexOf("_")+1,a=t.substring(i);
1*a>=yyb_min_version&&t.indexOf("get_install_state:yes")>-1&&(is_yyb_installed=!0);
});
var fnOpenApp=function(e){
location.href=e;
},appmsgTitle=top.window.document.title,testJson={
base_resp:{
ret:0
},
ticket:"asd",
video_ad_item_list:[{
url:"http://www.qq.com/",
report_time:0,
no_click:0,
jump_url:"http://wximg.qq.com/tmt/_events/20150831-gongyi/dist/html/",
local_storage:"",
report_3rd:[],
duration:15e3,
aid:"testviewid",
view_id:"testviewid",
orderid:"testorderid",
traceid:"testtraceid",
pt:100,
app_info:{
auto_download:1,
app_id:1206479,
app_name:"天朝小将",
version_code:390,
apk_name:"com.joygame.loong",
app_md5:"5E82FC113CECB2773598646D7301587D",
appinfo_url:"http://imc.l.qq.com/ss",
signature_md5:"5F1C5D905813BD1F382A4E72B978F2F7",
channel_id:"xxx"
},
ad_source:1,
creative_type:AD_TYPE_VIDEO15S,
img_url:"http://shp.qpic.cn/qqvideo/0/q1320k59fh8/400",
close_time:0
}]
},r=Math.random();
.33>=r?(testJson.video_ad_item_list[0].creative_type=AD_TYPE_VIDEO15S,testJson.video_ad_item_list[0].duration=15e3,
testJson.video_ad_item_list[0].close_time=5e3):r>.33&&.66>=r?(testJson.video_ad_item_list[0].creative_type=AD_TYPE_VIDEO6S,
testJson.video_ad_item_list[0].duration=6e3,testJson.video_ad_item_list[0].close_time=-1):r>.66&&(testJson.video_ad_item_list[0].creative_type=AD_TYPE_IMG5S,
testJson.video_ad_item_list[0].duration=5e3,testJson.video_ad_item_list[0].close_time=-1);
var doc=top.window.document,iframe=doc.getElementById("js_video_ad_iframe");
iframe||(iframe=doc.createElement("iframe"),iframe.src="/mp/readtemplate?t=pages/video_ad_iframe",
iframe.id="js_video_ad_iframe",iframe.className="video_ad_iframe");
var iframeWrap=doc.getElementById("js_video_ad_iframe_wrap");
iframeWrap||(iframeWrap=doc.createElement("div"),iframeWrap.id="js_video_ad_iframe_wrap",
iframeWrap.className="video_ad_iframe",iframeWrap.style.overflow="scroll",iframeWrap.style.webkitOverflowScrolling="touch",
iframeWrap.style.display="none",iframeWrap.appendChild(iframe),doc.body.appendChild(iframeWrap));
var AdPlugin=function(e){
this.hasPlayAd=!1,this.hasError=!1,this.vid=e.vid,this.opt=e,console.log("init ad vid : "+e.vid),
this.initAd=!1;
var t=this;
this._ad_play_time=-1,this.__beforeplayHandler=[],t.__initAd();
};
return Plugin.inherit(AdPlugin,Plugin.Class),AdPlugin.prototype.__getAd=function(suc,err,complete){
var __commonVideoReport=top.window.__commonVideoReport,that=this,opt=this.opt,tmpsn=","+["bbbe1aa6f92bad5000f34bb3cd8b5640","7d8e21a2fb0233d4cfc18d2e0ee0470b"].join(",")+",";
if(-1!=top.location.href.indexOf("&_video_testad=1")&&opt.tmpGetAd&&tmpsn.indexOf(","+top.sn+",")>=0){
var tmpSuc=function(e){
var t=e&&e.data&&e.data.totalUrl,i=e&&e.data&&e.data.time;
if(t&&i){
var a=testJson;
i=a.video_ad_item_list[0].duration/1e3,a.video_ad_item_list[0].url=t;
var r=that.adData=a.video_ad_item_list&&a.video_ad_item_list[0];
r.creative_type=r.creative_type||AD_TYPE_VIDEO15S,r.close_time="undefined"==typeof r.close_time?5e3:r.close_time,
that.__beforeplayHandler.push({
func:videoAdReport,
arg:[{
step:0==a.base_resp.ret?1:3,
view_id:r.view_id,
traceid:r.traceid,
orderid:r.orderid,
ad_source:r.ad_source,
report_time:0
}]
}),that.reportData=that.reportData2=[],suc({
video_ad_list:[{
image:[{
url:t
}],
duration:1e3*i
}]
});
}else err();
complete();
};
return opt.tmpGetAd(tmpSuc,function(){
err(),complete();
}),!1;
}
var cgiData=window.cgiData||{};
ajax({
url:"/mp/ad_video",
type:"post",
data:{
vid:that.vid,
clienttime:+new Date,
is_gray:VideoCtl.showAd()?1:0,
webviewid:VideoCtl.getWebviewid(),
__biz:top.window.biz||"",
appmsgid:cgiData.mid,
idx:cgiData.idx
},
success:function(resp){
__commonVideoReport&&__commonVideoReport(60);
try{
resp=eval("("+resp+")");
}catch(e){
resp={};
}
if(that.adVideoRet=resp.base_resp&&resp.base_resp.ret,that.ticket=resp.ticket||"",
!resp.base_resp||0!=resp.base_resp.ret&&1!=resp.base_resp.ret)return void err();
var adData=that.adData=resp.video_ad_item_list&&resp.video_ad_item_list[0];
return adData?(that.__beforeplayHandler.push({
func:videoAdReport,
arg:[{
step:0==resp.base_resp.ret?1:3,
view_id:adData.view_id,
traceid:adData.traceid,
orderid:adData.orderid,
ad_source:adData.ad_source,
report_time:0
}]
}),adData.creative_type=adData.creative_type||AD_TYPE_VIDEO15S,adData.close_time="undefined"==typeof adData.close_time?5e3:adData.close_time,
adData.creative_type!=AD_TYPE_VIDEO15S&&adData.creative_type!=AD_TYPE_VIDEO6S||adData.url?(that.reportData=[{
step:3,
time:adData.report_time||0,
traceid:adData.traceid,
orderid:adData.orderid,
ad_source:adData.ad_source,
view_id:adData.view_id
}],that.reportData2=[{
step:3,
time:0
},{
step:4,
time:5
}],void suc({
video_ad_list:[{
image:[{
url:adData.url
}],
duration:adData.duration
}]
})):void err()):void err();
},
error:function(e){
err();
var t=["uin:"+top.window.user_uin,"status:"+e&&e.status].join("|");
(new Image).src="/mp/jsreport?key=69&content="+t+"&r="+Math.random();
},
complete:complete
});
},AdPlugin.prototype.__openWebview=function(e){
var t=this.adPlayer,i=this;
i.adData.jump_url=e,JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(e){
e.err_msg.match(/\:ok$/)?(t.pause(),JSAPI.on("activity:state_change",function(e){
"onresume"==e.state.toLowerCase()&&t.play();
})):top.window.location.hash="addetail"+i.vid;
});
},AdPlugin.prototype.__init6sVideoBtn=function(){},AdPlugin.prototype.__initIosAppBtn=function(){
var e=this,t=(this.player,this.adData),i=this.adPlayer,a=i._getContainer(),r=a.find(".js_ad_app"),d=a.find(".js_btn_ad_app"),o=t.jump_url;
(-1!=o.indexOf("https://itunes.apple.com/")||-1!=o.indexOf("http://itunes.apple.com/"))&&(r.show(),
d.on("touchend",function(){
e.__clickreport(),i.pause(),setTimeout(function(){
JSAPI.invoke("downloadAppInternal",{
appUrl:o
},function(t){
t.err_msg&&-1!=t.err_msg.indexOf("ok")||e.__openWebview(o);
});
},500);
}));
},AdPlugin.prototype.__initAndroidAppBtn=function(){
var e=this,t=(this.player,this.adData),i=t.app_info,a=this.adPlayer,r=a._getContainer(),d=r.find(".js_ad_app"),o=r.find(".js_btn_ad_app"),n=!1,s="",_=i.auto_download||0;
1==_&&o.addClass("primary").text("立即下载"),JSAPI.invoke("getInstallState",{
packageName:i.apk_name
},function(e){
var t=e.err_msg;
log("getInstallState @"+i.apk_name+" : "+t);
var a=t.lastIndexOf("_")+1,r=t.substring(a);
1*r>=i.version_code&&t.indexOf("get_install_state:yes")>-1?(n=!0,o.text("已安装app"),
o.removeClass("btn_download"),o.addClass("btn_installed")):d.show();
}),o.on("touchend",function(){
if(is_yyb_installed&&!n){
e.__clickreport();
var a="";
i.channel_id&&(a="&channelid="+i.channel_id);
var r=["&via=ANDROIDWX.YYB.WX.ADVERTISE",t.traceid,t.aid,i.apk_name,0,15,1].join(".");
setTimeout(function(){
fnOpenApp("tmast://download?oplist=1;2&pname="+i.apk_name+a+r);
},500);
}else{
if(n)return!1;
e.__clickreport(),setTimeout(function(){
var a="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/videoad_app_detail&action=new&app_id="+i.app_id+s+"&md5sum="+i.app_md5+"&auto="+_+["&__biz=",top.window.biz,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&ticket=",e.ticket].join("");
1!=t.ad_source||!t.jump_url||0!=t.jump_url.indexOf("http://mp.weixin.qq.com/tp/ad_detail_info")&&0!=t.jump_url.indexOf("https://mp.weixin.qq.com/tp/ad_detail_info")||(a=t.jump_url,
-1!=a.indexOf("#wechat_redirect")?a=a.replace("#wechat_redirect","&ticket="+e.ticket+"#wechat_redirect"):a+="&ticket="+e.ticket),
e.__openWebview(a);
},500);
}
});
},AdPlugin.prototype.__initDetailBtn=function(){
var e=this,t=(this.player,this.adPlayer),i=t._getContainer(),a=i.find(".js_ad_detail"),r=i.find(".js_btn_ad_detail");
100==e.adData.pt&&(r.text("了解公众号"),e.adData.jump_url=e.adData.jump_url.replace("#","&jsapi_scene=107&AdType=64#")),
a.show(),r.on("touchend",function(){
var t=e.adData.jump_url;
t&&((0==t.indexOf("http://mp.weixin.qq.com")||0==t.indexOf("https://mp.weixin.qq.com"))&&(-1==t.indexOf("?")?t+="?ticket="+e.ticket:-1==t.indexOf("#")?t+="&ticket="+e.ticket:t=t.replace("#","&ticket="+e.ticket+"#")),
e.__openWebview(t),e.__clickreport());
});
},AdPlugin.prototype.__clickreport=function(){
{
var e=this;
this.player;
}
videoAdReport({
action:"click",
view_id:e.adData.view_id,
traceid:e.adData.traceid,
orderid:e.adData.orderid,
ad_source:e.adData.ad_source,
report_time:e.getAdPlaytime()
}),VideoCtl.report({
vid:e.vid,
step:8,
ext1:e.getAdPlaytime(),
ext2:e.adData.jump_url,
ad_source:e.adData.ad_source,
orderid:e.getOrderid(),
traceid:e.getTraceId()
}),e.adData.report_3rd_click_url&&e.adData.report_3rd_click_url.forEach(function(e){
iframe&&iframe.contentWindow&&iframe.contentWindow.postMessage(JSON.stringify({
type:"report",
url:e
}),location.protocol+"//"+location.host);
});
},AdPlugin.prototype.__initAdEx=function(){
var e=this,t=this.adData,i=t.pt,a=(this.player,this.adPlayer,t.creative_type);
if(1!=t.no_click&&(a==AD_TYPE_VIDEO15S||a==AD_TYPE_VIDEO6S||a==AD_TYPE_IMG5S)){
if(103==i)return void e.__initIosAppBtn();
if(104==i)return void e.__initAndroidAppBtn();
if(t.jump_url)return void e.__initDetailBtn();
}
},AdPlugin.prototype.__initAd=function(){
var e=this;
e.__getAd(function(t){
var i=e.adData;
e.initAd=!0,console.log(t),CAN_CLOSE_TIME=i.close_time/1e3,e.video_url=t.video_ad_list[0].image[0].url,
e.duration=t.video_ad_list[0].duration/1e3,e.trace_id=t.trace_id,console.log(e.video_url);
},function(){
e.initAd=!0,e.hasError=!0,e.player&&(e._whenEnded(),e.player._trigger("loading",{
autoplay:!1
}));
},function(){
e.initAd=!0,e.player&&e.player.hideLoading();
});
},AdPlugin.prototype.getAdPlaytime=function(){
return this._ad_play_time;
},AdPlugin.prototype.getTraceId=function(){
return this.adData&&this.adData.traceid?this.adData.traceid:0;
},AdPlugin.prototype.getOrderid=function(){
return this.adData&&this.adData.orderid?this.adData.orderid:0;
},AdPlugin.prototype.init=function(){
this.container=$(this.player.opt.container),0==this.hasError&&(this.player.showLoading(),
this.setBlockEvt("loading"));
},AdPlugin.prototype.noop=function(){
return this.hasPlayAd||this.hasError?Plugin.BASE_BITSET:10;
},AdPlugin.prototype.loadingHandler=function(){
if(this.hasSetAdSrc||this.hadPlayAd||this.hasError)return Plugin.BASE_BITSET;
var e=this,t=e.player;
return e._whenGetAdSrc(function(){
if(this.initAd&&!this.hasError&&!this.hasSetAdSrc){
var i=e.video_url,a=t.opt,r=e.adData,d=r.creative_type,o=e.container;
if(console.log(r),d==AD_TYPE_IMG5S){
var n=o.find(".js_adImgCover");
n.html('<img src="'+r.img_url+'">').show();
var s=e.adPlayer=new ImgAd({
duration:r.duration,
container:o,
imgUrl:r.img_url,
ratio:a.ratio,
width:a.width,
height:a.height,
onTimeupdate:function(t,i){
e.timeupdate(t,i);
},
onEnd:function(){
e.end();
}
});
}else if(d==AD_TYPE_VIDEO15S||d==AD_TYPE_VIDEO6S){
var s=e.adPlayer=new Player({
defineCSS:!0,
container:o,
cover:"",
ratio:a.ratio,
width:a.width,
height:a.height,
duration:e.duration,
autoplay:!1,
autoHide:!0,
loop:!1,
blockTouchVideo:!0,
plugins:[],
src:i,
onTimeupdate:function(t,i){
e.timeupdate(t,i);
},
onCanplay:function(){
0==e.hasPlayAd&&0==e.hasError&&videoAdReport({
step:2,
view_id:e.adData.view_id,
traceid:e.adData.traceid,
orderid:e.adData.orderid,
ad_source:e.adData.ad_source,
report_time:0
});
},
onEnd:function(){
e.end();
},
onError:function(){
var t=e.adPlayer;
t.isPlay()?e.end():(e.hasError=!0,e._whenEnded());
}
});
s.setSrc(i,-1==top.window.location.search.indexOf("&preload=0")?"auto":"metadata");
}
this.hasSetAdSrc=!0,this.setUnblockEvt("loading");
}
t._trigger("loading");
}),1;
},AdPlugin.prototype.readyBeginPlayHandler=function(){
var e=this.__beforeplayHandler;
if(e&&e.length>0)for(var t=null;t=e.shift();){
var i=t.func;
"function"==typeof i&&i.apply(this,t.arg||[]);
}
if(this.hasPlayAd||this.hasError)return Plugin.BASE_BITSET;
{
var a=this,r=this.player,d=this.adPlayer,o=d._getContainer(),n=o.find(".js_btn_close_ad"),s=o.find(".js_ad_controll"),_=(o.find(".js_btn_ad_detail"),
o.find(".js_video_poster")),p=a.adData;
p.creative_type;
}
d.hideControllBar&&d.hideControllBar(),d._trigger("beginPlay"),d._showPlayer&&d._showPlayer(),
r._hidePlayer(),s.show(),n.on("touchend",function(){
videoAdReport({
step:4,
view_id:a.adData.view_id,
traceid:a.adData.traceid,
orderid:a.adData.orderid,
ad_source:a.adData.ad_source,
report_time:a.getAdPlaytime()
}),VideoCtl.report({
vid:a.vid,
step:5,
ext1:a.getAdPlaytime(),
ext2:a.adVideoRet,
orderid:a.getOrderid(),
traceid:a.getTraceId(),
ad_source:a.adData.ad_source
}),a.__hasShowCanCloseAd&&a._whenEnded(!0);
}),_.on("touchend",function(){
videoAdReport({
step:6,
view_id:a.adData.view_id,
traceid:a.adData.traceid,
orderid:a.adData.orderid,
ad_source:a.adData.ad_source,
report_time:a.getAdPlaytime()
});
});
var l;
return HashRouter.get("addetail"+a.vid,function(){
a.adData.jump_url&&(iframe&&iframe.contentWindow&&iframe.contentWindow.postMessage(JSON.stringify({
type:"page",
src:a.adData.jump_url
}),location.protocol+"//"+location.host),iframeWrap.style.display="block",doc.getElementById("js_article").style.display="none",
doc.body.style.overflow=document.documentElement.style.overflow="hidden",setPageTitle("广告详情"),
d.pause(),JSAPI.call("hideOptionMenu"),l=top.window.pageYOffset||doc.documentElement.scrollTop);
}),HashRouter.get("default",function(e){
e=="addetail"+a.vid&&(iframeWrap.style.display="none",doc.getElementById("js_article").style.display="block",
doc.body.style.overflow=document.documentElement.style.overflow="auto",l&&top.window.scrollTo(0,l),
setPageTitle(appmsgTitle),d.play(),JSAPI.call("showOptionMenu"));
}),r._trigger("preload"),8;
},AdPlugin.prototype.beginPlayHandler=function(){
if(this.hasPlayAd||this.hasError){
{
var e=this;
e.player;
}
return Plugin.BASE_BITSET;
}
return 14;
},AdPlugin.prototype.canplayHandler=function(){
return this._adEndedTime&&!this._canplayTime&&(this._canplayTime=+new Date,this._canplayTime-this._adEndedTime>0&&Monitor.setAvg(27822,35,this._canplayTime-this._adEndedTime).send()),
Plugin.BASE_BITSET;
},AdPlugin.prototype.timeupdateHandler=function(){
return(this.hasPlayAd||this.hasError)&&this.hasError&&1==this.adVideoRet&&this.adData.report_3rd&&report3rd(0,this.adData.report_3rd),
this._adEndedTime&&this.hasPlayAd&&!this._timeupdateTime&&(this._timeupdateTime=+new Date,
this._timeupdateTime-this._adEndedTime>0&&Monitor.setAvg(27822,37,this._timeupdateTime-this._adEndedTime).send()),
Plugin.BASE_BITSET;
},AdPlugin.prototype.timeupdate=function(e,t){
{
var i=t.currentTime,a=this,r=a.adData,d=r.creative_type,o=this.adPlayer,n=o._getContainer(),s=n.find(".js_btn_can_close_ad"),_=n.find(".js_can_close_time"),p=n.find(".js_btn_close_ad"),l=n.find(".js_play_time");
n.find(".js_can_close_ad"),n.find(".js_ad_detail"),n.find(".js_ad_app");
}
a.__isInitAdEx||(a.__initAdEx(),a.__isInitAdEx=!0),r.close_time>=0?i>=CAN_CLOSE_TIME?(a.__hasShowCanCloseAd||(a.__hasShowCanCloseAd=!0),
s.hide(),p.show()):(s.show(),p.hide(),_.text("("+Math.round(CAN_CLOSE_TIME-i)+"s)")):s.hide();
var c=this.duration;
a._ad_play_time=1e3*i|0,l.text("("+Math.max(1,Math.floor(c-i))+"s)"),(d==AD_TYPE_VIDEO15S||d==AD_TYPE_VIDEO6S)&&this.processWhenInAdTime(),
this.reportData.forEach(function(e){
1!=e.reported&&1e3*i>=e.time&&(e.reported=1,e.report_time=a.getAdPlaytime(),videoAdReport(e));
}),this.reportData2.forEach(function(e){
1!=e.reported&&1e3*i>=e.time&&(e.reported=1,VideoCtl.report({
vid:a.vid,
step:e.step,
ext2:a.adVideoRet,
ad_source:a.adData.ad_source,
orderid:a.getOrderid(),
traceid:a.getTraceId()
}));
}),report3rd(i,this.adData.report_3rd);
},AdPlugin.prototype.processWhenInAdTime=function(){
var e=this.adPlayer.video,t=e.currentTime;
e&&this.lastCurrentTime&&t!=this.lastCurrentTime&&Math.abs(t-this.lastCurrentTime)>3?e.currentTime=this.lastCurrentTime:this.lastCurrentTime=t;
},AdPlugin.prototype.touchVideoHandler=function(){
return this.hasPlayAd||this.hasError?Plugin.BASE_BITSET:14;
},AdPlugin.prototype.end=function(){
videoAdReport({
step:5,
view_id:this.adData.view_id,
traceid:this.adData.traceid,
orderid:this.adData.orderid,
ad_source:this.adData.ad_source,
report_time:this.getAdPlaytime()
}),this._whenEnded(!0);
},AdPlugin.prototype._whenEnded=function(e){
var t=this,i=t.player,a=t.adPlayer;
this.hasPlayAd=!0,e&&(t._adEndedTime=+new Date),a&&a._hidePlayer&&a._hidePlayer(),
i._showPlayer(),e&&i._trigger("beginPlay");
},AdPlugin.prototype._whenGetAdSrc=function(e){
var t=this;
setTimeout(function(){
t.initAd?!!e&&e.call(t):t._whenGetAdSrc(e);
},500);
},AdPlugin.prototype.setSize=function(e){
var t=this,i=t.adPlayer;
i&&i.setVideoCSS(e);
},AdPlugin;
});define("new_video/plugin/proxy.js",["new_video/plugin_base.js","biz_wap/jsapi/core.js","pages/version4video.js","biz_wap/jsapi/log.js"],function(e){
"use strict";
function i(e){
y.invoke("videoProxySetPlayerState",{
webviewVideoProxyPlayState:e
},function(){});
}
function o(e){
try{
1==top.window.logs.video_cnt&&y.invoke("videoProxyStopPlay",{
webviewVideoProxyPlaydataId:e
},function(e){
p.log("videoProxyStopPlay resp: "+JSON.stringify(e));
});
}catch(i){}
}
function t(e,i,o){
i=i||"",i=["uin:"+top.window.user_uin,"resp:"+i].join("|"),e=41>e&&u.device.is_ios?e+8:e;
try{
(o||S)&&((new window.Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random());
}catch(t){
if(window.__moon_report){
var r=[c.join(""),";userAgent:"+top.window.navigator.userAgent];
window.__moon_report([{
offset:8,
log:r.join(""),
e:t
}]);
}
}
}
function r(e){
var i=u.device.is_ios?116:142,o=u.device.is_ios?h.ios:h.android;
y.invoke("reportIDKey",{
idKeyDataInfo:[{
id:i,
key:o[e],
value:"1"
}]
},function(){});
}
function n(e){
var i=0,o=+new Date-e;
o/=1e3,o>0&&1>=o?i=1:o>1&&3>=o?i=2:o>3&&7>=o?i=3:o>7&&15>=o?i=4:o>15&&(i=5),e&&i&&r(i);
}
function a(e){
if(e){
var i=0;
switch(e.code){
case x:
i=6;
break;

case m:
i=7;
break;

case I:
i=8;
break;

case b:
i=9;
}
i&&r(i);
}
}
function l(e){
T++,y.invoke("videoProxyInit",{},function(i){
return p.log("videoProxyInit resp:"+JSON.stringify(i)),3>T&&u.device.is_android&&(!i.err_msg||-1==i.err_msg.indexOf("videoProxyInit"))?void l(e):void e(i);
});
}
var s,c=["modle_init_typeof_image:",typeof Image,";modle_init_typeof_winimage:",typeof window.Image,";modle_init_typeof_topwinimage:",typeof top.window.Image],d=e("new_video/plugin_base.js"),y=e("biz_wap/jsapi/core.js"),u=e("pages/version4video.js"),p=e("biz_wap/jsapi/log.js"),f=top.window.navigator.userAgent.match(/MicroMessenger\/((\d+)(\.\d+)*)/),v=f&&f[1]||0,_=5,g=6,P=7,w=8,S=Math.random()>.75,h={
ios:[2,3,4,5,6,7,12,13,14,15],
android:[45,40,41,42,43,44,50,51,52,53]
},x=1,m=2,I=3,b=4,T=0;
s="object"==typeof top.window._playerProxyPluginData?top.window._playerProxyPluginData:top.window._playerProxyPluginData={
callbacks:[],
hasInited:!1,
initing:!1,
initResult:"default"
},!u.isUseProxy()||s.hasInited||s.initing||(s.initing=!0,t(32),l(function(e){
s.hasInited=!0,s.initResult=0==e.videoProxyInitResult?"success":"fail";
for(var i=s.callbacks,o=null;o=i.shift();)o&&"function"==typeof o._getLocalSrc&&o._getLocalSrc();
t(41),e.err_msg&&e.err_msg.indexOf("function_not_exist")>0&&t(28),e.err_msg&&-1!=e.err_msg.indexOf("function_not_exist")||0==e.videoProxyInitResult||t(29,JSON.stringify(e),!0);
}));
var k=function(e){
var i,o=this,r=e.data.vl.vi[0],n=e.data.fl;
if(n&&n.cnt>0)for(var a=n.fi,l=0,s=a.length;s>l;l++)if(1*a[l].sl===1){
i=a[l].id;
break;
}
o.cdnUrl=e.cdn_url,o.fileId=r.vid+"."+i,o.fileSize=r.fs,o.duration=0|+r.td,o.lastWaiting=0,
o.useProxy=u.isUseProxy(),o._whenInit(),t(25);
};
return d.inherit(k,d.Class),k.prototype.init=function(){
this.hasInit=!1;
},k.prototype._getLocalSrc=function(){
var e=this;
"success"==s.initResult?(t(42),e._videoProxyStartPlayCallbacked=0,setTimeout(function(){
0==e._videoProxyStartPlayCallbacked&&t(43);
},2e3),y.invoke("videoProxyStartPlay",{
webviewVideoProxyCdnUrls:e.cdnUrl,
webviewVideoProxyFileId:e.fileId,
webviewVideoProxyFileSize:e.fileSize,
webviewVideoProxyFileDuration:e.duration,
webviewVideoProxyFileType:"1"
},function(i){
e.localSrc=i.videoProxyPlayLocalUrl,e.playId=i.videoProxyPlayDataId,e.useProxy=!!e.localSrc,
e.__getLocalSrcCallback&&e.__getLocalSrcCallback(),e.useProxy?t(26):t(30,JSON.stringify(i),!0),
e._videoProxyStartPlayCallbacked=1;
})):(e.useProxy=!1,e.__getLocalSrcCallback&&e.__getLocalSrcCallback());
},k.prototype._whenInit=function(){
var e=this;
s.hasInited?e._getLocalSrc():s.callbacks.push(e);
},k.prototype._whenGetLocalSrc=function(e){
var i=this;
i.localSrc||!i.useProxy?(e&&setTimeout(e,1),i.__getLocalSrcCallback=null):i.__getLocalSrcCallback=e;
},k.prototype.preload=function(e){
function i(){
r.buffered.length&&r.buffered.end(0)>e&&(r.removeEventListener("progress",i),r=null);
}
var o=this;
if(p.log("preload video. src: "+(o.localSrc||o.cdnUrl)),v>="6.3")y.invoke("videoProxyPreload",{
webviewVideoProxyPlaydataId:o.playId,
webviewVideoProxyPreloadTime:""+e
},function(e){
e.err_msg.indexOf("videoProxyPreload:ok"),p.log("videoProxyPreload resp: "+e.err_msg);
});else{
var r=document.createElement("video");
r.setAttribute("src",o.localSrc||o.cdnUrl),r.setAttribute("preload","auto"),r.addEventListener("progress",i);
}
t(45);
},k.prototype.preloadHandler=function(){
var e=this;
return u.isUseAd()&&-1==top.window.location.search.indexOf("&preload=0")&&e._whenGetLocalSrc(function(){
p.log("preload video:",e.localSrc||e.cdnUrl),e.preload(10);
}),d.BASE_BITSET;
},k.prototype.loadingHandler=function(e,i){
var o=this,t=o.player;
return o.hasInit||!o.useProxy?d.BASE_BITSET:(o._whenGetLocalSrc(function(){
o.hasInit=!0,o.localSrc?t._trigger("loaded",{
autoplay:i&&i.autoplay
}):t._trigger("loading",i);
}),t.showLoading(),14);
},k.prototype.readyBeginPlayHandler=function(){
var e=this,i=this.player;
return e.useProxy?(p.log("set player src: "+this.localSrc),i.setSrc(this.localSrc),
i._trigger("beginPlay"),14):d.BASE_BITSET;
},k.prototype._getRemainTime=function(){
for(var e=this.player.video,i=e.currentTime,o=e.buffered,t=o&&o.length||0,r=0;t>r;r++){
var n=o.start(r),a=o.end(r);
if(i>=n&&a>=i){
var l=a-i;
return l;
}
}
},k.prototype._syncRemainTime=function(){
var e=this,i=0|e._getRemainTime();
y.invoke("videoProxySetRemainTime",{
webviewVideoProxyPlaydataId:e.playId,
webviewVideoProxyRemainTime:i||0
},function(){}),e.remainTimer=setTimeout(function(){
e._syncRemainTime();
},1e3);
},k.prototype.canplayHandler=function(){
return this.useProxy&&(this.canPlay=!0),d.BASE_BITSET;
},k.prototype.beginPlayHandler=function(){
{
var e=this,i=e.player;
i._getContainer(),i.video;
}
return e.useProxy&&(e.remainTimer=setTimeout(function(){
e._syncRemainTime();
},1e3),t(27),p.log("video begin play using proxy."),this.setPlayBufferCnt=0),d.BASE_BITSET;
},k.prototype.playHandler=function(){
return this.useProxy&&(i(g),this.canPlay&&n(this.lastWaiting),this.lastWaiting=0),
d.BASE_BITSET;
},k.prototype.replayHandler=function(){
var e=this;
return e.useProxy?(e.localSrc="",e._whenInit(),e._whenGetLocalSrc(function(){
e.player.setSrc(e.localSrc||e.cdnUrl),e.player._afterReplay(),p.log("set player src: "+(e.localSrc||e.cdnUrl));
}),14):d.BASE_BITSET;
},k.prototype.pauseHandler=function(){
return this.useProxy&&i(_),d.BASE_BITSET;
},k.prototype.waitingHandler=function(){
return this.useProxy&&this.canPlay&&(i(P),this.setPlayBufferCnt++,this.lastWaiting=+new Date,
r(0)),p.log("waiting event triggered in proxy plugin.",this.useProxy,this.canPlay),
d.BASE_BITSET;
},k.prototype.errorHandler=function(){
var e=this,r=this.player;
return this.useProxy&&(i(w),a(r.video&&r.video.error),t(31,null,!0),o(e.playId)),
d.BASE_BITSET;
},k.prototype.endHandler=function(){
{
var e=this;
e.player;
}
if(e.useProxy){
clearTimeout(e.remainTimer);
var i=this.setPlayBufferCnt+72;
i=i>78?78:i,t(i,null,!0);
}
return d.BASE_BITSET;
},k;
});define("biz_wap/utils/localstorage.js",[],function(){
"use strict";
var t={};
return t=window.localStorage?{
set:function(t,e){
null!==this.get(t)&&this.remove(t),localStorage.setItem(t,e);
},
get:function(t){
var e=localStorage.getItem(t);
return void 0===e?null:e;
},
remove:function(t){
localStorage.removeItem(t);
},
clear:function(){
localStorage.clear();
},
each:function(t){
for(var e,o=localStorage.length,n=0,t=t||function(){};o>n&&(e=localStorage.key(n),
t.call(this,e,this.get(e))!==!1);n++)localStorage.length<o&&(o--,n--);
}
}:{
set:function(){},
get:function(){},
remove:function(){},
clear:function(){},
each:function(){}
};
});
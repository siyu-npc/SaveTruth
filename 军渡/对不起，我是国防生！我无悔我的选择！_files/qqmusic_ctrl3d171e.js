define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js"],function(t,n){
"use strict";
function i(){
v.WIDTH=S=_("#js_article").width()||_("#js_cmt_mine").width(),v.pageCount=M=e(),
o(),a(),s();
}
function e(){
d=S-2*P,C=parseInt(d/W),k=3*C-1;
var t=parseInt(R/k);
return R%k!==0&&t++,t;
}
function o(){
var t=_("#js_slide_wrapper"),n=v.wrapperWidth=M*S;
t.css({
width:n+"px"
});
}
function a(){
for(var t=_("#js_slide_wrapper").el[0],n=(S-C*W)/2,i=0,e=M;e>i;i++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),t.appendChild(o),_(o).css({
width:S+"px",
"float":"left",
"padding-left":n+"px",
"padding-right":"0"
}),r(o,i,n);
}
}
function s(){
for(var t=_("#js_navbar"),n=0,i=M;i>n;n++){
var e=_(_.el("li"));
e.attr("class","emotion_nav js_emotion_nav"),D.push(e),t.append(e);
}
v.navs=D;
}
function r(t,n,i){
for(var e=0,o=k;o>e;e++){
var a=document.createElement("li");
if(y++,y>R)break;
a=c(y),_(t).append(a);
}
var s=m(i);
_(t).append(s);
}
function c(t){
var n=_(_.el("li")),i=_(_.el("i")),e=0;
i.attr("class","icon_emotion icon"+t),i.css({
"background-position":"0px "+((1-t)*Z-e)+"px"
}),n.attr("class","emotion_item js_emotion_item"),n.attr("data-index",t);
var o=W+"px";
return n.css({
width:o,
height:o
}),n.append(i),n;
}
function m(t){
var n=_(_.el("li")),i=_(_.el("i"));
n.attr("class","emotion_item del js_emotion_item"),n.attr("data-index",-1),i.attr("class","icon_emotion del");
var e=W+"px";
return n.css({
width:e,
height:e,
right:t+"px"
}),n.append(i),n;
}
function p(){
function t(){
o.show(),w.show(),e.blur(),_.later(function(){
e.blur();
});
}
function n(){
o.hide(),w.hide(),e.focus(),_.later(function(){
e.focus();
});
}
w=_("#js_emotion_panel");
var i=_("#js_cmt_input"),e=i.el[0],o=_("#js_emotion_panel_arrow_wrp");
w.hide(),_("#js_emotion_switch").on("tap",function(i){
i.preventDefault(),i.stopPropagation(),g=!g,g?t():n();
}),i.on("tap",function(){
w.hide(),g=!1;
});
}
function l(){
function t(t){
if(!v.isMoved){
var n=_(t.currentTarget),i=+n.attr("data-index");
h.inputEmotion(i);
}
}
_("li.js_emotion_item").on("click",t),_("li.js_emotion_item").on("touchend",t);
}
function u(t){
for(var n=[],i=0;i<x.length;i++){
var e=x[i];
if(e.cn){
var o=new RegExp(e.cn.replace("[","\\[").replace("]","\\]"),"g"),a=t.match(o);
a&&(n=n.concat(a));
}
if(e.emoji){
var o=new RegExp(e.emoji,"g"),a=t.match(o);
a&&(n=n.concat(a));
}
}
return _.each(n,function(n){
if(void 0!==I[n]){
var i=I[n],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
t=t.replace(n,o);
}
}),t;
}
for(var d,_=t("appmsg/emotion/dom.js"),f=t("appmsg/emotion/slide.js"),v=t("appmsg/emotion/common.js"),j=t("appmsg/emotion/nav.js"),h=t("appmsg/emotion/textarea.js"),n=(_.each,
{}),g=!1,w=null,x=t("biz_common/utils/emoji_data.js"),b=t("biz_common/utils/emoji_panel_data.js"),E={},I={},O=[],T=0;T<x.length;T++){
var N=x[T];
E[N.id]=N;
}
for(var T=0;T<b.length;T++){
var z=b[T],N=E[z];
I[N.cn]=T,N.emoji&&(I[N.emoji]=T),O.push(N.style);
}
var M,k,C,S,D=[],P=15,R=v.EMOTIONS_COUNT,W=v.EMOTION_LI_SIZE,Z=v.EMOTION_SIZE;
n.init=function(){
p(),i(),f.init(),j.activeNav(0),l(),h.init();
};
var y=0;
return n.encode=function(t){
t=u(t);
var n=/\/([\u4e00-\u9fa5\w]{1,4})/g,i=t.match(n);
return i?(_.each(i,function(n){
var i=n.replace("/",""),e=[i.slice(0,4),i.slice(0,3),i.slice(0,2),i.slice(0,1)];
_.each(e,function(n){
if(void 0!==I["["+n+"]"]){
var i=I["["+n+"]"],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
t=t.replace("/"+n,o);
}
});
}),t):t;
},n.hidePannel=function(){
w.hide();
},n;
});define("biz_wap/utils/wapsdk.js",["biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function s(e){
var s=.001;
"number"==typeof e.sample&&(s=e.sample);
var n=Math.random();
s>n&&o.saveSpeeds(e);
}
function n(e){
var s=e.sample||.001,n=Math.random();
s>n&&o.setBasicTime(e);
}
function i(){
o.send();
}
function a(e){
var e=e||[];
if(!e.length){
var s=e;
e=[],e.push(s);
}
for(var n=[],i=0;i<e.length;i++){
var s=e[i],a=s.id,o=s.key,t=s.value||1;
a&&o&&n.push(a+"_"+o+"_"+t);
}
0!=n.length&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey="+n.join(";"));
}
var o=e("biz_common/utils/wxgspeedsdk.js");
return{
saveSpeeds:s,
setBasicTime:n,
send:i,
jsmonitor:a
};
});define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("appmsg/open_url_with_webview.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),i=function(e,i){
i=i||{};
var o=i.sample||0;
o*=1e3;
var n=window.user_uin||0,t=0!==n&&Math.floor(n/100)%1e3<o;
return t?void r.invoke("openUrlWithExtraWebview",{
url:e,
openType:i.openType||1
},function(e){
e&&"openUrlWithExtraWebview:ok"===e.err_msg?i.resolve&&i.resolve():i.reject&&i.reject();
}):void(i.reject&&i.reject());
};
return i;
});define("appmsg/articleReport.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function n(i){
i.dom&&(i.dom.style.display="",t.tap(i.dom,function(){
var n=["https://mp.weixin.qq.com/mp/infringement?url=",encodeURIComponent(i.link.htmlDecode()),"&title=",encodeURIComponent(i.title),"&__biz=",window.biz].join("");
return location.href=n+"#wechat_redirect",!1;
}));
}
i("biz_common/utils/string/html.js");
{
var t=i("biz_common/dom/event.js"),e=i("biz_wap/utils/mmversion.js");
({
not_in_mm:!e.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger")
});
}
return{
init:n
};
});define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("appmsg/topic_tpl.html.js",[],function(){
return'<span class="db topic_wrp">\n    <span class="topic_thumb" style="background-image:url({img_url});"></span>\n    <span class="topic_content">\n        <strong class="topic_title">{title}</strong>\n        <span class="topic_desc">{author}</span>\n        <span class="topic_info">\n            <span class="topic_info_extra"><span class="icon_topic"></span>话题</span>\n            <span class="topic_info_primary">相关文章{msg_num}篇</span>\n        </span>\n    </span>\n</span>\n';
});define("pages/weapp_tpl.html.js",[],function(){
return'<!-- <span class="weapp_card flex_context">\n    <span class="weapp_card_hd">\n        <span class="radius_avatar weapp_card_avatar">\n            <img src="<#=avatar#>">\n        </span>\n    </span>\n    <span class="weapp_card_bd flex_bd">\n        <strong class="weapp_card_nickname"><#=nickname#></strong>\n        <span class="weapp_card_logo"><img class="icon_weapp_logo_mini" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUAAAB4it11h9x2h9x2h9x2htx8j+R8i+B1h9x2h9x3h92Snv91htt2h9x1h9x4h9x1h9x1h9x2idx1h9t2h9t1htt1h9x1h9x1htx2h9x1h912h9x4h913iN17juOOjuN1iNx2h9t4h958i+B1htvejBiPAAAAJHRSTlMALPLcxKcVEOXXUgXtspU498sx69DPu5+Yc2JeRDwbCYuIRiGBtoolAAAA3ElEQVQoz62S1xKDIBBFWYiFYImm2DWF///G7DJEROOb58U79zi4O8iOo8zuCRfV8EdFgbYE49qFQs8ksJInajOA1wWfYvLcGSueU/oUGBtPpti09uNS68KTMcrQ5jce4kmN/HKn9XVPAo702JEdx9hTUrWUqVrI3KwUmM1NhIWMKdwiGvpGMWZOAj1PZuzAxHwhVSplrajoseBnbyDHAwvrtvKKhdqTtFBkL8wO5ijcsS3G1JMNvQ5mdW7fc0x0+ZcnlJlZiflAomdEyFaM7qeK2JahEjy5ZyU7jC/q/Rz/DgqEuAAAAABJRU5ErkJggg==" alt="">小程序</span>\n    </span>\n</span> -->\n<span class="weapp_card app_context appmsg_card_context">\n    <span class="weapp_card_bd">\n        <span class="weapp_card_profile flex_context">\n            <span class="radius_avatar weapp_card_avatar">\n                <img src="<#=avatar#>">\n            </span>\n            <span class="weapp_card_nickname flex_bd"><#=nickname#></span>\n        </span>\n        <span class="weapp_card_info">\n            <span class="weapp_card_title"><#=title#></span>\n            <span class="weapp_card_thumb_wrp" style="background-image:url(<#=imageUrl#>);"></span>\n        </span>\n    </span>\n    <span class="weapp_card_ft">\n        <span class="weapp_card_logo"><img class="icon_weapp_logo_mini" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUAAAB4it11h9x2h9x2h9x2htx8j+R8i+B1h9x2h9x3h92Snv91htt2h9x1h9x4h9x1h9x1h9x2idx1h9t2h9t1htt1h9x1h9x1htx2h9x1h912h9x4h913iN17juOOjuN1iNx2h9t4h958i+B1htvejBiPAAAAJHRSTlMALPLcxKcVEOXXUgXtspU498sx69DPu5+Yc2JeRDwbCYuIRiGBtoolAAAA3ElEQVQoz62S1xKDIBBFWYiFYImm2DWF///G7DJEROOb58U79zi4O8iOo8zuCRfV8EdFgbYE49qFQs8ksJInajOA1wWfYvLcGSueU/oUGBtPpti09uNS68KTMcrQ5jce4kmN/HKn9XVPAo702JEdx9hTUrWUqVrI3KwUmM1NhIWMKdwiGvpGMWZOAj1PZuzAxHwhVSplrajoseBnbyDHAwvrtvKKhdqTtFBkL8wO5ijcsS3G1JMNvQ5mdW7fc0x0+ZcnlJlZiflAomdEyFaM7qeK2JahEjy5ZyU7jC/q/Rz/DgqEuAAAAABJRU5ErkJggg==" alt="">小程序</span>\n    </span>\n</span>\n';
});define("biz_common/utils/monitor.js",[],function(){
"use strict";
var n=[],t={};
return t.setAvg=function(i,e,o){
return n.push(i+"_"+e+"_"+o),n.push(i+"_"+(e-1)+"_1"),t;
},t.setSum=function(i,e,o){
return n.push(i+"_"+e+"_"+o),t;
},t.send=function(){
if(0!=n.length){
var t=new Image;
t.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+n.join(";")+"&t="+Math.random(),n=[];
}
},t;
});define("appmsg/weapp_common.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","appmsg/reportClickLink.js"],function(e,n,p,a){
"use strict";
function o(){
var e=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(e){
var n=Number(e[1]),p=Number(e[2]),a=Number(e[3]);
n>6?h.canJumpOnTap=!0:6===n&&p>5?h.canJumpOnTap=!0:6===n&&5===p&&a>=3&&(h.canJumpOnTap=!0);
}else navigator.userAgent.match(/MicroMessenger\//)||(h.isNonWechat=!0);
t();
}
function t(){
try{
h.appidSnInfo=JSON.parse(window.weapp_sn_arr_json).weapp_card_list;
}catch(e){
h.appidSnInfo=[];
}
if(!h.appidSnInfo||0==h.appidSnInfo.length)return h.getInfoState=1,void r();
for(var n={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.uin||"",
key:window.key||"",
pass_ticket:window.pass_ticket||"",
weapp_num:h.appidSnInfo.length
},p={},a={},o=0;o<n.weapp_num;o++){
var t=h.appidSnInfo[o].appid,i=h.appidSnInfo[o].sn;
p[t]?p[t].push(o):(p[t]=[o],n["weapp_appid_"+o]=h.appidSnInfo[o].appid),a[i]?a[i].push(o):(a[i]=[o],
n["weapp_sn_"+o]=h.appidSnInfo[o].sn);
}
var c="/mp/appmsg_weapp?action=batch_get_weapp";
for(var f in n)c+="&"+f+"="+encodeURIComponent(n[f]);
I({
url:c,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
try{
if(h.appidInfoResp=e,e.base_resp.ret)throw new Error("Fetch weapp info but get ret="+e.base_resp.ret);
h.data={
infoMap:{},
appid:e.appid||"",
appmsg_compact_url:e.appmsg_compact_url||"",
pathArgs:"appid="+encodeURIComponent(e.appid)+(e.appmsg_compact_url?"&appmsg_compact_url="+encodeURIComponent(e.appmsg_compact_url):"")
};
for(var n=e.weapp_info,p=0;p<n.length;p++){
var a=n[p].weapp_appid;
h.data.infoMap[a]=n[p];
}
h.getInfoState=4;
}catch(o){
h.getInfoState=3,h.appidInfoCatchErr=o;
}
r();
},
error:function(){
h.getInfoState=2,r();
}
});
}
function r(){
if(1==h.getInfoState||2==h.getInfoState)for(var e=0,n=h.appInfoErrQueue.length;n>e;e++){
var p=h.appInfoErrQueue[e];
"function"==typeof p&&p({
code:h.getInfoState
});
}else if(3==h.getInfoState)for(var e=0,n=h.appInfoErrQueue.length;n>e;e++){
var p=h.appInfoErrQueue[e];
"function"==typeof p&&p({
code:h.getInfoState,
resp:h.appidInfoResp,
catchErr:h.appidInfoCatchErr
});
}else if(4==h.getInfoState)for(var e=0,n=h.appInfoSucQueue.length;n>e;e++){
var p=h.appInfoSucQueue[e];
"function"==typeof p&&p({
resp:h.appidInfoResp,
data:h.data
});
}
h.appInfoErrQueue=[],h.appInfoSucQueue=[];
}
function i(e){
1!=h.getInfoState&&2!=h.getInfoState||"function"!=typeof e.onError?3==h.getInfoState&&"function"==typeof e.onError?e.onError({
code:h.getInfoState,
resp:h.appidInfoResp,
catchErr:h.appidInfoCatchErr
}):4==h.getInfoState&&"function"==typeof e.onSuccess?e.onSuccess({
resp:h.appidInfoResp,
data:h.data
}):("function"==typeof e.onSuccess&&h.appInfoSucQueue.push(e.onSuccess),"function"==typeof e.onError&&h.appInfoErrQueue.push(e.onError)):e.onError({
code:h.getInfoState
});
}
function c(e){
if(!e||!h.data)return"";
var n="",p=e.indexOf("?");
return n=p>=0?e.slice(0,p)+(p>0?".html":"")+e.slice(p)+"&"+h.data.pathArgs:e+(""!==e?".html?":"?")+h.data.pathArgs;
}
function f(e){
e=e||{};
var n;
if(e.options)n=e.options;else if(e.appid&&h.data){
var p=h.data.infoMap[e.appid];
p&&(n={
userName:p.weapp_username,
scene:e.scene,
sceneNote:e.sceneNote,
relativeURL:c(e.path)
},void 0!==p.app_version&&(n.appVersion=p.app_version));
}
n&&(n.scene=e.scene||1058,h.canJumpOnTap?m.invoke("openWeApp",n,function(n){
"system:function_not_exist"===n.err_msg?h.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&s():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&u(e.appid):"function"==typeof e.onJsapiCallback&&e.onJsapiCallback(n);
}):h.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&s():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&u(e.appid),
g(e));
}
function u(e){
location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&appid="+encodeURIComponent(e)+"#wechat_redirect";
}
function s(){
setTimeout(function(){
a("请在微信内打开小程序");
},0);
}
function d(){
var e=navigator.userAgent.toLowerCase(),n=~e.indexOf("android"),p=~e.search(/ip(od|hone|ad)/);
return n?"Android":p?"iOS":"unknown";
}
function g(e){
var n="/mp/articleh5report?action=open_h5",p={
OsName:d(),
UserAgent:navigator.userAgent,
Count:1,
bizuin:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.user_uin||"",
currentURL:window.location.href,
targetURL:e.path||"",
linkType:e.type||2,
targetType:1,
targetAppId:e.appid||"",
isAD:0
};
I({
url:n,
data:{
json:JSON.stringify(p)
},
type:"POST",
dataType:"json",
async:!0,
success:function(){},
error:function(){}
});
}
var I=e("biz_wap/utils/ajax.js"),m=e("biz_wap/jsapi/core.js"),h=(e("appmsg/reportClickLink.js"),
{
canJumpOnTap:!1,
isNonWechat:!1,
data:null,
appidInfoResp:null,
appidInfoCatchErr:null,
appInfoSucQueue:[],
appInfoErrQueue:[],
appidSnInfo:[],
getInfoState:0
});
return o(),{
canJumpOnTap:h.canJumpOnTap,
isNonWechat:h.isNonWechat,
getAppidInfo:i,
appidSnInfo:h.appidSnInfo,
getRelativeURL:c,
jumpUrl:f
};
});define("pages/voice_tpl.html.js",[],function(){
return'<span class="js_audio_frame db">\n    <#if(show_not_support===true){#>\n    <span class="db">当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放</span>\n    <#}#>\n    <span aria-labelledby="语音" id="voice_main_<#=voiceid#>_<#=posIndex#>" class="share_audio_context flex_context pages_reset" <#if(!musicSupport){#>style="display:none;"<#}#>>\n        <span id="voice_play_<#=voiceid#>_<#=posIndex#>" aria-labelledby="播放开关" class="db share_audio_switch"><em class="icon_share_audio_switch" role="button"></em></span>\n        <span id="voice_detail_<#=voiceid#>_<#=posIndex#>" class="share_audio_info flex_bd db">\n            <strong id="voice_title_<#=voiceid#>_<#=posIndex#>" class="share_audio_title" aria-describedby="语音标题" role="link"><#=title#></strong>\n            <#if(!!nickname){#>\n            <span id="voice_author_<#=voiceid#>_<#=posIndex#>" class="share_audio_tips db">来自<#=nickname#></span>\n            <#}#>\n            <span id="voice_seekRange_<#=voiceid#>_<#=posIndex#>" class="db share_audio_progress_wrp">\n                <span class="db share_audio_progress">\n                    <span id="voice_progress_<#=voiceid#>_<#=posIndex#>" style="width:0%" class="share_audio_progress_inner"></span>\n                    <span id="voice_buffer_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_buffer" style="width:0%;"></span>\n                    <span id="voice_loading_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_loading" style="display:none;">\n                        <span class="share_audio_progress_loading_inner"></span>\n                    </span>\n                </span>\n                <span id="voice_playdot_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_handle" style="display:none;left:0%;"></span>\n            </span>\n            <span class="share_audio_desc db" aria-labelledby="时长">\n                <em id="voice_playtime_<#=voiceid#>_<#=posIndex#>" class="share_audio_length_current" aria-hidden="true">00:00</em>\n                <em id="voice_duration_<#=voiceid#>_<#=posIndex#>" class="share_audio_length_total"><#=duration_str#></em>\n            </span>\n        </span>\n    </span>\n</span>\n';
});define("pages/kugoumusic_ctrl.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function r(e,r){
for(var t,a=[/^http(s)?:\/\/singerimg\.kugou\.com([\/?].*)*$/i,/^http(s)?:\/\/imge\.kugou\.com([\/?].*)*$/i],o=!1,c=0;t=a[c++];)if(t.test(e.albumurl)){
o=!0;
break;
}
return o||(e.albumurl=""),e.detailUrl="https://m3ws.kugou.com/kgsong/"+e.jumpurlkey+".html?fromweixin=",
e.webUrl=e.detailUrl,e.musicIcon=i.musicIcon,e.media_id=e.musicid,e.type=1*r.scene===0?5:1*r.scene===1?6:9,
e;
}
function t(e,r){
var t=e,a=t.otherid+(t.albumid||""),c=i.cache[a];
return c&&"function"==typeof r.callback?void r.callback(c):void(i.submiting[a]!==!0&&(i.submiting[a]=!0,
o({
akey:t.otherid,
albumid:t.albumid||"",
onSuc:function(e){
i.submiting[a]=!1,i.cache[a]=e,"function"==typeof r.callback&&r.callback(e);
},
onError:function(){
i.submiting[a]=!1,"function"==typeof r.callback&&r.callback({
canplay:!1,
msg:"系统繁忙，请稍后再试。返回码：-1",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var r=!0,t="";
switch(1*e){
case 0:
r=!0;
break;

case 1:
r=!1,t="该歌曲版权已过期，无法播放。";
break;

case 1002:
r=!1,t="系统错误，请稍后再试。";
break;

case 1001:
r=!1,t="系统错误，请稍后再试。";
break;

default:
r=!1,t="系统错误，请稍后再试。";
}
return t&&(t+="错误码："+e),{
canplay:r,
msg:t
};
}
function o(e){
u.setSum(i.reportId,87,1),u.send();
var r=+new Date,t="/mp/getkugousong?params=#params#",o=[{
akey:e.akey,
albumid:e.albumid||""
}];
t=t.replace("#params#",encodeURIComponent(JSON.stringify(o))),s({
url:t,
type:"GET",
dataType:"json",
success:function(t){
var o=+new Date-r;
if(!t||"undefined"==typeof t.errcode){
var u=1;
return c({
type:"error",
time:o,
code:u
}),void("function"==typeof e.onError&&e.onError({
errcode:u
}));
}
var s=0,i="";
0==t.errcode?t.data&&t.data[0]&&t.data[0].url?(s=0,i=t.data[0].url):s=1001:s=1==t.errcode?1:1002,
c({
type:"success",
time:o,
code:s
});
var n=a(s);
e.onSuc({
canplay:n.canplay,
msg:n.msg,
errcode:s,
play_url:i
});
},
error:function(){
var t=+new Date-r,a=2;
c({
type:"error",
time:t,
code:a
}),"function"==typeof e.onError&&e.onError({
errcode:a
});
}
});
}
function c(e){
var r=Math.max(e.time,0);
if(r=Math.min(r,1e4),r>=0&&500>r?u.setSum(i.reportId,98,1):r>=500&&1e3>r?u.setSum(i.reportId,99,1):r>=1e3&&2e3>r?u.setSum(i.reportId,100,1):r>=2e3&&5e3>r?u.setSum(i.reportId,101,1):r>=5e3&&1e4>=r&&u.setSum(i.reportId,102,1),
"error"==e.type){
switch(1*e.code){
case 1:
u.setSum(i.reportId,94,1);
break;

case 2:
u.setSum(i.reportId,91,1);
break;

case 3:
u.setSum(i.reportId,92,1);
break;

case 4:
u.setSum(i.reportId,93,1);
}
u.setSum(i.reportId,88,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
u.setSum(i.reportId,95,1);
break;

case 0:
u.setSum(i.reportId,97,1);
break;

case 1002:
u.setSum(i.reportId,96,1);
break;

case 1001:
u.setSum(i.reportId,103,1);
}
u.setSum(i.reportId,89,1);
}
u.send();
}
var u=e("biz_common/utils/monitor.js"),s=e("biz_wap/utils/ajax.js"),i={
reportId:"28306",
musicIcon:window.icon_kugou_source||"",
cache:{},
submiting:{}
};
return{
initData:r,
getPlayUrl:t
};
});define("pages/qqmusic_ctrl.js",["biz_common/utils/monitor.js","pages/player_adaptor.js","pages/loadscript.js"],function(e){
"use strict";
function t(e,t){
if(/^http(s)?:\/\//i.test(e.albumurl)){
for(var r,a=[/^http(s)?:\/\/imgcache\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/y\.gtimg\.cn([\/?].*)*$/i],i=!1,o=0;r=a[o++];)if(r.test(e.albumurl)){
i=!0;
break;
}
i||(e.albumurl="");
}else{
var s=e.albumurl.split("/");
try{
s=s[s.length-1],s=s.split(".")[0];
}catch(n){
s="";
}
e.albumurl=s?m.imgroot2.replace("#mid#",s):m.imgroot+e.albumurl;
}
return e.musicIcon=m.musicIcon,e.type=1*t.scene===0?0:1*t.scene===1?1:8,c.inQMClient?(e.allowPause=!0,
e.detailUrl="",e.pauseCss="qqmusic_playing_pause",e.webUrl=e.detailUrl):(e.allowPause=!1,
e.pauseCss="",e.detailUrl=["http://i.y.qq.com/v8/playsong.html?referFrom=music.qq.com&songid=",e.musicid,"&songmid=",e.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join(""),
e.webUrl=e.detailUrl),e;
}
function r(e,t){
var r=e,a=m.cache[r.songId];
return c.inQMClient?void t.callback({
canplay:!0,
play_url:"https://www.qq.com"
}):a&&"function"==typeof t.callback?void t.callback(a):void(m.submiting[r.songId]!==!0&&(m.submiting[r.songId]=!0,
i({
id:r.songId,
mid:r.mid,
onSuc:function(e){
m.submiting[r.songId]=!1,m.cache[r.songId]=e,"function"==typeof t.callback&&t.callback(e);
},
onError:function(){
m.submiting[r.songId]=!1,"function"==typeof t.callback&&t.callback({
canplay:!1,
msg:"系统繁忙，请稍后再试。返回码：-1",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var t=!0,r="";
switch(1*e){
case 0:
t=!0;
break;

case 1:
t=!1,r="该歌曲版权已过期，无法播放。";
break;

case 2:
t=!1,r="抱歉，应版权方要求，当前国家或地区暂不提供此歌曲服务。";
break;

case 3:
t=!1,r="该歌曲版权已过期，无法播放。";
break;

case 4:
t=!1,r="抱歉，歌曲信息不正确。";
break;

case 5:
t=!1,r="系统错误，请稍后再试。";
break;

case 6:
t=!1,r="系统错误，请稍后再试。";
break;

default:
t=!1,r="系统错误，请稍后再试。";
}
return r&&(r+="错误码："+e),{
canplay:t,
msg:r
};
}
function i(e){
s.setSum(m.reportId,18,1),s.send();
var t=+new Date,r="//open.music.qq.com/fcgi-bin/fcg_music_get_song_info_weixin.fcg?song_id=#songid#&mid=#mid#&format=json&app_id=1034002693&app_key=cjjDaueOyPYRJFeTqG&device_id=weixin&file_type=mp3&qqmusic_fromtag=50&callback=get_song_info_back";
r=r.replace("#mid#",e.mid).replace("#songid#",e.id),n({
url:r,
timeout:1e4,
callbackName:"get_song_info_back",
callback:function(r){
var i=+new Date-t;
if(!r||"undefined"==typeof r.ret){
var s=1;
return o({
type:"error",
time:i,
code:s
}),void("function"==typeof e.onError&&e.onError({
errcode:s
}));
}
var c;
c=0==r.ret?r.play_url?0:6:1001==r.ret?1:1002==r.ret?2:1003==r.ret?3:1004==r.ret?4:5,
o({
type:"success",
time:i,
code:c
});
var n=a(1*c);
e.onSuc({
canplay:n.canplay,
msg:n.msg,
status:c,
play_url:r.play_url||"",
duration:r.song_play_time||0
});
},
onerror:function(r){
var a=+new Date-t,i=4;
switch(1*r){
case 400:
i=2;
break;

case 500:
i=3;
break;

default:
i=4;
}
o({
type:"error",
time:a,
code:i
}),"function"==typeof e.onError&&e.onError({
errcode:i
});
}
});
}
function o(e){
var t=Math.max(e.time,0);
if(t=Math.min(t,6e4),e.time>=0&&e.time<200?s.setSum(m.reportId,24,1):e.time>=200&&e.time<500?s.setSum(m.reportId,25,1):e.time>=500&&e.time<1e3?s.setSum(m.reportId,26,1):e.time>=1e3&&e.time<2e3?s.setSum(m.reportId,27,1):e.time>=2e3&&e.time<1e4?s.setSum(m.reportId,28,1):e.time>=1e4&&s.setSum(m.reportId,29,1),
s.setAvg(m.reportId,23,t),"error"==e.type){
switch(1*e.code){
case 1:
s.setSum(m.reportId,9,1);
break;

case 2:
s.setSum(m.reportId,10,1);
break;

case 3:
s.setSum(m.reportId,11,1);
break;

case 4:
s.setSum(m.reportId,12,1);
}
s.setSum(m.reportId,19,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
s.setSum(m.reportId,8,1);
break;

case 0:
s.setSum(m.reportId,17,1);
break;

case 2:
s.setSum(m.reportId,13,1);
break;

case 3:
s.setSum(m.reportId,14,1);
break;

case 4:
s.setSum(m.reportId,15,1);
break;

case 5:
s.setSum(m.reportId,16,1);
break;

case 6:
s.setSum(m.reportId,47,1);
}
s.setSum(m.reportId,20,1);
}
s.send();
}
var s=e("biz_common/utils/monitor.js"),c=e("pages/player_adaptor.js"),n=e("pages/loadscript.js"),m={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_68",
imgroot2:"https://y.gtimg.cn/music/photo_new/T002R68x68M000#mid#.jpg",
reportId:"28306",
musicIcon:window.icon_qqmusic_source||"",
cache:{},
submiting:{}
};
return{
initData:t,
getPlayUrl:r
};
});
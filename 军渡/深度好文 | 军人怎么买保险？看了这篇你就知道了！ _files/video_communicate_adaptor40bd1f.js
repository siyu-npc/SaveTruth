define("new_video/player.js",["page/pages/video.css","biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","biz_common/dom/event.js","new_video/player.html.js","biz_wap/utils/device.js","new_video/ctl.js","biz_common/tmpl.js","pages/iframe_communicate.js"],function(e){
"use strict";
function t(){
i();
}
function i(){
document.webkitVisibilityState?document.addEventListener("webkitvisibilitychange",r,!1):document.msVisibilityState?document.addEventListener("msvisibilitychange",r,!1):document.visibilityState&&document.addEventListener("visibilitychange",r,!1);
}
function n(){
if("hidden"in document)return"hidden";
for(var e=["webkit","moz","ms","o"],t=0;t<e.length;t++)return e[t]+"Hidden"in document,
e[t]+"Hidden";
return null;
}
function o(){
var e=n();
return e?document[e]:!1;
}
function r(){
if(o())for(var e in h._players){
var t=h._players[e];
if(t.hasBeginPlay()&&t.isPlay()){
t.pause4outer(),h.visibilityPausePlayer=t;
break;
}
}else{
var i=h.visibilityPausePlayer;
i&&i.hasBeginPlay()&&!i.isEnd()&&(i.play4outer(),h.visibilityPausePlayer=null);
}
}
e("page/pages/video.css"),e("biz_wap/zepto/zepto.js"),e("biz_wap/zepto/event.js"),
e("biz_wap/zepto/touch.js");
var a=e("biz_common/dom/event.js"),s=e("new_video/player.html.js"),_=e("biz_wap/utils/device.js"),d=e("new_video/ctl.js"),l=e("biz_common/tmpl.js"),u=e("pages/iframe_communicate.js"),h={
_players:{},
visibilityPausePlayer:null
},c=3e3;
t();
var p=function(){},f=(navigator.userAgent,function(){
return!0;
}()),g=function(){
return!!_.browser.M1;
}(),v=function(e,t){
var i=document.createElement("div");
return e in i.style?(i.style[e]=t,i.style[e]===t):!1;
},y=function(e){
var t=0,i=0,n=0;
.5>e&&(e=0),e=Math.ceil(e);
var t=Math.floor(e/3600),i=Math.floor((e-3600*t)/60),n=e-3600*t-60*i;
return 0!=t?(10>t&&(t="0"+t),t+=":"):t="",10>i&&(i="0"+i),10>n&&(n="0"+n),t+i+":"+n;
},m=!_.canSupportVideo,w=function(e){
var t=$(e.container);
"undefined"==typeof e.videoReportType&&(e.videoReportType=-1),e.width=e.width||300,
e.height=e.height||300,e.videoWidth=e.videoWidth||0,e.videoHeight=e.videoHeight||0,
e.duration=e.duration||0,e.videoFit=!1;
var i={
needToFit:!1,
supportObjectFit:!1,
os:_.os
};
if(e.width&&e.height&&e.videoWidth&&e.videoHeight){
var n=Math.abs(e.width/e.height-e.videoWidth/e.videoHeight);
.1>=n&&(i.needToFit=!0,v("objectFit","fill")&&(i.supportObjectFit=!0,e.videoFit=!0));
}
e.ratio=e.ratio||e.width/e.height,e.autoplay=!!e.autoplay||!1,this.opt=e,this.id=e.id=+new Date+"_"+Math.floor(Math.random()*Math.floor(+new Date)),
this.__forcePause=!1,this.__hasFuncControllBar=!0,this.__dragTimes=[],this.__play_total_time=0,
this.__last_playtime=0,this.__always_hide_loading=e.always_hide_loading||!1,e._mustHideFullScreen=g,
e.display=e.autoHide?"none":"block",e.ad_muted_btn=e.ad_muted_btn||!1;
var o=l.tmpl(s,e);
t.append(o);
var r=this.container=$("#js_mpvedio_"+this.id);
this.$video=r.find("video");
var a=this.video=this.$video[0];
this.__initData(),this.__initVideo();
var d=e.src;
if(!d)return void this.__triggerOutside("error",{
errorcode:5
});
if(a.setAttribute("origin_src",d),m)return r.find(".js_btn_play").attr("href",d).show(),
this.__loadedHandler(),void this.__bindBtnEvent();
var u=e.plugins||[];
this._blockPlugin={};
for(var c=0,p=u.length;p>c;++c){
var f=u[c];
f.setPlayer(this),!!f.init&&f.init();
}
this.plugins=u,this._trigger("afterCheckVideoFit",i),this._trigger("loading",e),
this._defineEvent(),this.__bindBtnEvent(),this.__bindVideoEvent(),this._addPostmessageListener(),
h._players[this.id]=this;
};
return $.extend(w.prototype,{
__triggerOutside:function(){
var e=this.opt,t=arguments,i=t[0],n=this,o=this.video;
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var r=e["on"+i];
"function"==typeof r&&r.apply(this,t),"BeginPlay"!=i||null!=n.__replaySec&&0!=n.__replaySec||!_.os.ios||(o.currentTime=.1);
}
},
__errorHandler:function(){
this.video.removeAttribute("src");
},
__loadingHandler:function(e){
this.showLoading(),this._trigger("ready",e);
},
__readyHandler:function(e){
this.opt.src;
this._trigger("loaded",e);
},
__loadedHandler:function(e){
if(e&&e.autoplay)return void this._trigger("readyBeginPlay",e);
this.hideLoading(),this.container.find(".js_video_play_controll").css({
display:"block"
});
var t=this.opt.duration;
t&&t>0&&this.container.find(".js_video_length").html(y(t)).show();
},
__readyBeginPlayHandler:function(e){
this.setSrc(this.opt.src),this._trigger("beginPlay",e);
},
__beginPlayHandler:function(){
m&&(location.href=this.opt.src);
var e=this.container,t=this,i=this.video;
e.find(".js_video_poster").show(),this.showCover(),e.find(".js_video_play_controll").hide(),
this.__hasBeginPlay=!0,t.showLoading("firstTime"),setTimeout(function(){
i.play();
},1);
},
__replayHandler:function(){
var e=this.video.muted;
this.setSrc(this.src,this.video.preload),this.triggerMuted(e),this._afterReplay();
},
__endHandler:function(){
this.container.find(".js_btn_play_aria").data("status","3").removeClass("video_playing"),
this.hideControllBar(),this._hidePlayControllBar();
},
__hideControllTimeoutCallback:function(){
return this.__onTouch?void this.__hideControllTimeout():void(this.isPlay()&&this.hideControllBar());
},
__touchVideoHandler:function(){
var e=this,t=this.opt;
if(t.blockTouchVideo||this.__onTouch)return!1;
if(!e.__canplay||e.isEnd()&&t.hideControllBarAtEnd)return void e.hideControllBar();
var i=e.container.find(".js_controll");
"none"==i.css("display")?e.showControllBar():e.hideControllBar(!0),e.__hideControllTimeout();
},
__hideControllTimeout:function(){
var e=this;
this.__touchVideoTimeoutHandler&&clearTimeout(this.__touchVideoTimeoutHandler),this.__touchVideoTimeoutHandler=setTimeout(function(){
e.__hideControllTimeoutCallback();
},c);
},
__initData:function(){
this.log={
hasended:0,
lastsec:0,
duration:0,
video_error:0
},this.__hasBeginPlay=!1,this.__canplay=!1,this.__hasscroll=!1,this.__replaySec=null,
this.__playQueue=[];
},
__initVideo:function(){
var e=this.opt,t=this.video;
t.addEventListener("contextmenu",function(e){
e.preventDefault(),e.stopPropagation();
},!1),t.hasAttribute("controls")&&t.removeAttribute("controls"),t.setAttribute("webkit-playsinline","isiPhoneShowPlaysinline"),
t.setAttribute("playsinline","isiPhoneShowPlaysinline"),e.loop&&t.setAttribute("loop",e.loop),
e.muted&&t.setAttribute("muted",e.muted),this.$video.off("loadedmetadata durationchange"),
this.__hasVideoDurationchange=!1;
},
__getDuration:function(){
var e=this.opt,t=this.video,i=t.duration;
return i&&1!=i?i:e.duration;
},
__videoDurationchange:function(){
var e=this;
if(!e.__hasVideoDurationchange){
var t=this.video,i=this.opt,n=this.container;
if(1/0!=t.duration&&t.duration>0&&1!=t.duration)e.duration=t.duration,e.__hasVideoDurationchange=!0;else{
if(!i.duration)return!1;
e.duration=i.duration,e.__hasVideoDurationchange=!0;
}
e.log.duration=e.duration,n.find(".js_total_time").text(y(e.duration)),this.__hasFuncControllBar&&n.find(".js_progress_bar,.js_total_time").show();
var o=+new Date,r=o-e.log.loadwait_start;
e.log.loadwait=r,e._trigger("durationchange",{
loadwait:r
});
}
},
__startCountTime:function(){
var e=this,t=this.video;
t&&null===e.__last_playtime&&(e.__last_playtime=t.currentTime);
},
__endCountTime:function(){
var e=this,t=this.video;
t&&t.currentTime>e.__last_playtime&&null!==e.__last_playtime&&(e.__play_total_time+=t.currentTime-e.__last_playtime,
e.__last_playtime=null);
},
__bindVideoEvent:function(){
var e=this.$video,t=this,i=this.container,n=i.find(".js_switch"),o=(i.find(".js_video_pause_controll"),
this.video);
e.off("timeupdate").on("timeupdate",function(){
if(t.__forcePause===!0)return void p(t.id+":timeupdate __forcePause return");
if(t.__hasBeginPlay&&!t.__canplay)return t.showLoading(),!1;
o=t.video,null!=t.__replaySec&&(p(t.id+":timeupdate __replaySec"),o.pause(),o.currentTime=t.__replaySec,
t.__last_playtime=t.__replaySec,o.play(),t.__replaySec=null),t.__startCountTime(),
t.__videoDurationchange();
var e=o.currentTime;
if(e>0){
t.__seeking||t.hideLoading();
var n=t.__getDuration();
t.__onTouch||t.__setControllBar(e/n),t.hideCover(),i.find(".js_now_play_time").text(y(e)),
t._trigger("timeupdate",{
currentTime:e
});
}
}),e.off("canplay").on("canplay",function(){
null!=t.__replaySec&&(o.currentTime=Math.floor(t.__replaySec),t.__last_playtime=t.__replaySec,
t.__replaySec=null),t.__canplay=!0,t._trigger("canplay");
}),e.off("ended").on("ended",function(){
p("player inner isend:"+t.isEnd()),t.isEnd()&&(t.__endCountTime(),t._trigger("end"));
}),e.off("emptied").on("emptied",function(){}),t.waitingHandlerTimer=null;
var r=0;
e.off("stalled").on("stalled",function(){
if(this.__hasBeginPlay&&!t.waitingHandlerTimer){
t.showLoading();
var e=o.src,i=o.readyState,n=o.error;
0!=i||n&&0!=n.code||(clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null,
t.showLoading(),t.showCover(),o.pause(),o.src=e,o.load(),o.play(),p(t.id+":stalled"));
}
}),e.on("seeked",function(){
t.__onTouch||(o.play(),t.hideLoading(),t.__seeking=!1);
}),e.off("seeking").on("seeking",function(){
p("seeking,__hasBeginPlay:"+t.__hasBeginPlay),t.__hasBeginPlay&&(t.__seeking=!0,
t.showLoading());
}),e.off("waiting").on("waiting",function(){
if(p("waiting,__hasBeginPlay:"+t.__hasBeginPlay),t.__hasBeginPlay){
t.showLoading(),clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null;
var e=0;
for(var i in h._players)if(h._players.hasOwnProperty(i)&&e++,e>1)break;
e>1&&t.__forcePause===!1&&(t.waitingHandlerTimer=setTimeout(function(){
if(t.__forcePause!==!0){
var e=o.error;
if(0==o.readyState&&(!e||0==e.code)){
clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null;
var i=o.src;
t.showLoading(),t.showCover(),o.pause(),o.src=i,r++,o.load(),o.play(),p(t.id+":waitingHandlerTimer");
}
}
},1e4)),t._trigger("waiting");
}
}),e.off("play playing").on("play playing",function(){
return t.__forcePause===!0?void p(t.id+":play playing __forcePause return"):(p(t.id+":play playing"),
n.removeClass("switch_on"),n.addClass("switch_off"),t._hidePlayControllBar(),t.__startCountTime(),
void t._trigger("play"));
}),e.off("pause").on("pause",function(){
p(t.id+":video pause event"),n.addClass("switch_on"),n.removeClass("switch_off"),
!t.__canplay||t.isEnd()||t.__onTouch?t._hidePlayControllBar():(t.hideControllBar(!0),
t._showPlayControllBar()),t.__endCountTime(),t._trigger("pause");
}),e.off("error").on("error",function(){
var e;
t.video.error&&(e=t.video.error.code),t._trigger("error",{
errorcode:e
});
}),e.on("webkitfullscreenchange mozfullscreenchange fullscreenchange",function(){
var e=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen,i=$(this);
e?(i.parents(".js_inner").removeClass("not_fullscreen"),t.__isInFullScreen=!0):(i.parents(".js_inner").addClass("not_fullscreen"),
t.hideLoading(),t.__isInFullScreen=!1);
});
},
_defineEvent:function(){
var e=this;
this._event={
progressBarMousemove:function(t){
e.__hasFuncControllBar&&e.__onTouch&&e._pointerMoveHandler({
x:t.pageX||t.clientX,
y:t.pageY||t.clientY,
e:t
});
},
progressBarMouseup:function(t){
return e.__hasFuncControllBar&&e.__onTouch?(e._pointerUpHandler({
x:t.pageX||t.clientX,
y:t.pageY||t.clientY,
e:t
}),!1):void 0;
},
progressBarTouchmove:function(t){
if(e.__hasFuncControllBar&&e.__onTouch){
var i=t.changedTouches[0];
e._pointerMoveHandler({
x:i.pageX,
y:i.pageY,
e:t
});
}
},
progressBarTouchend:function(t){
if(e.__hasFuncControllBar&&e.__onTouch){
var i=t.changedTouches[0];
return e._pointerUpHandler({
x:i.pageX,
y:i.pageY,
e:t
}),!1;
}
},
broadcastPlay:function(t){
t.id!==e.id&&e.__hasBeginPlay&&!e.isEnd()&&e.pause4outer();
}
};
},
_addPostmessageListener:function(){
u.addListener({
type:"broadcastPlay",
func:this._event.broadcastPlay
});
},
__bindBtnEvent:function(){
function e(){
if(m)return location.href=i.opt.src,!1;
if(o){
var e=2;
try{
e=window.cgiData&&"0"==window.cgiData.media_source?11:2;
}catch(t){}
d.report({
step:e,
vid:o.vid,
traceid:o.pageplayer._getTraceId(),
orderid:o.pageplayer._getOrderid(),
ori_status:o.pageplayer._getOriStatus(),
type:n.videoReportType
});
}
i._trigger("readyBeginPlay");
}
function t(){
i.isPlay()?(o&&d.report({
step:12,
vid:o.vid,
traceid:o.pageplayer._getTraceId(),
orderid:o.pageplayer._getOrderid(),
ori_status:o.pageplayer._getOriStatus(),
type:n.videoReportType
}),i.pause4outer()):i.play4outer();
}
var i=this,n=this.opt,o=n.extinfo,r=this.container,s=(this.video,r.find(".js_video_play_controll"),
r.find(".js_btn_play")),l=r.find(".js_btn_play_aria"),u=r.find(".js_video_poster"),h=r.find(".js_switch"),c=r.find(".js_progress_bar"),p=r.find(".js_controll"),g=(r.find(".js_played_bar"),
r.find(".js_page_video")),v=r.find(".js_full_mask"),y=r.find(".js_video_pause_controll"),w=r.find(".js_full_screen_control"),T=r.find(".js_loading");
a.on(y[0],"tap",".js_btn_pause",function(){
i.play4outer();
});
var b,P,j,B,C=0,S=!1,k=0,M=0,D=i.__getDuration(),H=0,F=1,x=window.user_uin||0,E=0!==x&&Math.floor(x/100)%1e3<F,L=!1,V=0;
g.on("touchstart",function(e){
1==e.targetTouches.length&&i.isPlay()&&(n.blockTouchVideo||(j=b=new Date,B=P={
x:e.targetTouches[0].clientX,
y:e.targetTouches[0].clientY
},H=i.getCurTime(),_.os.android&&e.preventDefault()));
}),g.on("touchmove",function(e){
if(1==e.targetTouches.length&&i.isPlay()&&!n.blockTouchVideo){
var t=new Date,o=e.changedTouches[0].clientX,r=e.changedTouches[0].clientY;
if(B.x==P.x&&B.y==P.y&&Math.abs(r-B.y)>=10)return void(S=!1);
var a=t-b,s=o-P.x,_=r-P.y,d=Math.sqrt(Math.pow(s,2)+Math.pow(_,2))+M,l=Math.min(Math.ceil(d/a),6);
k=Math.floor(.1*d+.2*l*l*l)*Math.ceil(D/500),M=0==k?d:0,0>s&&(k=-k);
var u=180*Math.atan2(_,s)/Math.PI;
S||(u>=-30&&30>=u&&++C,(u>=150&&180>=u||u>=-180&&-150>=u)&&--C,(C>=4||-4>=C)&&(5>=d?C=0:(V=Math.max(V,l),
S=!0))),S&&(H+=k,0>H&&(H=0),H>D&&(H=1*D),i.__setForwardBar(H),e.preventDefault(),
e.stopPropagation()),P={
x:o,
y:r
},b=t;
}
}),g.on("touchend",function(e){
if(S){
if(i.play(H),r.find(".js_forward").css("display","none"),E&&((new Image).src="/mp/jsmonitor?idkey=28307_29_1",
!L)){
var t=(new Date,{
x:e.changedTouches[0].clientX,
y:e.changedTouches[0].clientY
}),n=t.x-B.x,o=t.y-B.y,a=parseInt(Math.sqrt(Math.pow(n,2)+Math.pow(o,2))),s=parseInt(180*Math.atan2(o,n)/Math.PI);
s>=-30&&30>=s||s>=150&&180>=s||s>=-180&&-150>=s||((new Image).src="/mp/jsmonitor?idkey=28307_35_1"),
(new Image).src="/mp/jsmonitor?idkey=28307_31_1;28307_33_"+a+";28307_34_"+V,L=!0;
}
i._seekReport();
}
k=0,S=!1,C=0;
}),g.on("touchmove MSPointerMove pointermove mousemove",function(e){
i.isInFullScreen()&&!f&&(e.preventDefault(),e.stopPropagation());
}),a.tap(g[0],function(e){
e.target===p[0]||p[0].contains(e.target)||i.isEnd()||i.isPause()||S||i._trigger("touchVideo");
}),a.tap(v[0],function(){
i.isEnd()||i._trigger("touchVideo");
}),v.on("touchmove MSPointerMove pointermove mousemove",function(e){
i.isInFullScreen()&&!f&&(e.preventDefault(),e.stopPropagation());
}),a.tap(l[0],function(){
var n=$(this),o=1*n.data("status");
0==o?(n.addClass("video_playing").data("status","1"),e()):1==o?(n.removeClass("video_playing").data("status","2"),
t()):2==o?(n.addClass("video_playing").data("status","1"),t()):3==o&&(n.addClass("video_playing").data("status","1"),
i._trigger("ariaReplay"));
}),a.tap(s[0],function(){
e();
}),a.tap(T[0],function(){
i._trigger("touchVideo");
}),a.tap(h[0],function(){
t();
}),i.__onTouch=!1,c.on("mousedown",function(e){
i.__hasFuncControllBar&&(p.off("mousemove",i._event.progressBarMousemove).on("mousemove",i._event.progressBarMousemove),
u.off("mousemove",i._event.progressBarMousemove).on("mousemove",i._event.progressBarMousemove),
$(document.body).off("mouseup").on("mouseup",i._event.progressBarMouseup),i._pointerDownHandler({
x:e.pageX||e.clientX,
y:e.pageY||e.clientY,
e:e
}));
}),c.on("touchstart",function(e){
if(i.__hasFuncControllBar){
c.off("touchmove",i._event.progressBarTouchmove).on("touchmove",i._event.progressBarTouchmove),
c.off("touchend",i._event.progressBarTouchend).on("touchend",i._event.progressBarTouchend);
var t=e.changedTouches[0];
i._pointerDownHandler({
e:e,
x:t.pageX,
y:t.pageY
});
}
}),a.tap(w[0],function(e){
return i.isInFullScreen()?f&&i.exitFullScreen():(i.__has_fullscreen=!0,f&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_56_1&r="+Math.random(),
i.enterFullScreen())),e.stopPropagation(),e.preventDefault(),!1;
});
},
_pointerDownHandler:function(e){
this.__onTouch=!0,this.progressBarSeekData={
x1:e.x,
y1:e.y,
startTime:this.video.currentTime
},e.e.preventDefault(),this.pause();
},
_pointerMoveHandler:function(e){
var t=this.container.find(".js_played_bar"),i=this.container.find(".js_progress_bar");
this.__onTouch=!0,this.__has_drag=!0,this.progressBarSeekData.x2=e.x,this.progressBarSeekData.y2=e.y;
var n=t.offset(),o=i.width(),r=(e.x-n.left)/o,a=this.__getDuration();
this.progressBarSeekData.dragTime=1*(a*r).toFixed(4),this.progressBarSeekData.dragTime>a&&(this.progressBarSeekData.dragTime=a-1),
this.video.currentTime=this.progressBarSeekData.dragTime,this.__setControllBar(r),
e.e&&(e.e.preventDefault(),e.e.stopPropagation());
},
_pointerUpHandler:function(e){
var t=this;
e.e.preventDefault(),e.e.stopPropagation(),this.container.find(".js_controll").off("mousemove",t._event.progressBarMousemove),
this.container.find(".js_video_poster").off("mousemove",t._event.progressBarMousemove),
$(document.body).off("mouseup",t._event.progressBarMouseup),this.container.find(".js_progress_bar").off("touchmove",t._event.progressBarTouchmove).off("touchend",t._event.progressBarTouchend),
"undefined"==typeof this.progressBarSeekData.dragTime&&this._pointerMoveHandler({
x:e.x,
y:e.y
});
var i=this.progressBarSeekData.dragTime<0?0:this.progressBarSeekData.dragTime;
this.progressBarSeekData.startTime&&t.__dragTimes.push(Math.round(1e3*this.progressBarSeekData.startTime)+":#:"+Math.round(1e3*i)),
this.progressBarSeekData=null,setTimeout(function(){
t.__onTouch=!1,t.__forcePause=!1,t.isEnd()||(t.showLoading(),t.play(1*i+.1),t._seekReport());
},0),this.__hideControllTimeout();
},
_seekReport:function(){
var e=this.opt,t=e.extinfo;
t&&d.report({
step:13,
vid:t.vid,
traceid:t.pageplayer._getTraceId(),
orderid:t.pageplayer._getOrderid(),
ori_status:t.pageplayer._getOriStatus(),
type:e.videoReportType
});
},
_hidePlayControllBar:function(){
var e=this.container.find(".js_video_pause_controll");
e.hide();
},
_showPlayControllBar:function(){
var e=this.container.find(".js_video_pause_controll");
this.isEnd()||(this.hideControllBar(),e.show(),this.container.find(".js_video_play_controll").hide());
},
_showPlayer:function(){
var e=this.container.find(".js_page_video");
e.show();
},
_hidePlayer:function(){
var e=this.container.find(".js_page_video");
e.hide();
},
__setControllBar:function(e){
e=Math.ceil(100*e),0>e&&(e=0),e>100&&(e=100);
this.video,this.duration;
this.__setBufferBar(e),e+="%";
var t=this.container;
t.find(".js_played_bar").css({
width:e
}),t.find(".js_played_speed_cnt").css({
left:e
});
},
__setForwardBar:function(e){
var t=this.container,i=(this.video,this.__getDuration()),n=e/i;
t.find(".js_forward").css("display","block"),t.find(".total_time").text(y(i)),t.find(".js_forward_bar").css("width",100*n+"%"),
t.find(".js_forward_play_time").text(y(e));
},
__setBufferBar:function(e){
var t=this.container,i=this.video,n=this.__getDuration(),o=i.currentTime;
e=e||o/n;
var r=e;
i.buffered&&i.buffered.length>0&&i.buffered.end&&n&&(r=i.buffered.end(0)/n,r=Math.max(e,Math.ceil(parseInt(100*r))),
r>98&&(r=100)),t.find(".js_buffer_bar").css({
width:r+"%"
});
},
__resetVideo:function(){
this.$video.remove();
var e=this.container,t=e.find(".js_video_poster");
t.append("<video></video>");
{
var i=this.$video=t.find("video");
this.video=i[0];
}
this.__canplay=!1,this.__forcePause=!1,this.__initVideo(),this.__bindVideoEvent();
},
_trigger:function(e,t){
var i=this;
"play"==e&&(i.__forcePause=!1,i._trigger("userplay"),u.broadcastMessage({
type:"broadcastPlay",
data:{
id:this.id
}
}));
var n=this.plugins,o=this._blockPlugin[e]||this._blockPlugin.all,r=0;
if(o&&"function"==typeof o.recv&&(r|=o.recv(e,t),1&r))return!1;
for(var a=0,s=n.length;s>a&&(r|=n[a].recv(e,t),!(2&r));++a);
if(!(this._blockInnerHandler||4&r)){
var _=this["__"+e+"Handler"];
_&&_.call(this,t);
}
8&r||this.__triggerOutside(e,t);
},
_setBlockInnerHandler:function(e){
this._blockInnerHandler=e;
},
_setBlockPlugin:function(e,t){
this._blockPlugin[e]=t;
},
_getContainer:function(){
return this.container;
},
_setCover:function(e,t){
this.container.find(".js_poster_cover").css(t),this.opt.cover=e;
},
_removeCover:function(e){
var e=e||{
"background-image":"none"
};
this.container.find(".js_poster_cover").css(e);
},
_afterReplay:function(){
this.__hasBeginPlay=!0,this.play();
},
setSrc:function(e,t){
var i=this,n=this.$video,o=(this.opt,this.video);
this.src=e,i.__initData(),i.__initVideo(),this.showCover(),i.log.loadwait_start=+new Date,
n.attr("src",e),o.preload=t||"metadata",o.load(),this.container.find(".js_now_play_time").text(y(0)),
n.on("loadedmetadata",function(){
if(i.__videoDurationchange(),i.__playQueue&&i.__playQueue.length>0){
var e=i.__playQueue[0].sec;
i.__playQueue=[],i.play(e);
}
}),o.duration>0&&1!=o.duration&&i.__videoDurationchange();
},
replay:function(){
_.os.android;
var e=this.opt.extinfo;
e&&d.report({
step:9,
vid:e.vid,
traceid:e.pageplayer._getTraceId(),
orderid:e.pageplayer._getOrderid(),
ori_status:e.pageplayer._getOriStatus(),
type:this.opt.videoReportType
}),this._trigger("replay");
},
resetVideo:function(){
this.container.find(".js_video_poster").hide(),this.showCover(),this.__resetVideo(),
this._trigger("loading"),this.__hasBeginPlay=!0;
},
play:function(e){
var t=this.video,i=this;
if(!i.isEnd()){
if(!t||0==t.readyState)return void(this.__playQueue[0]={
sec:e
});
e*=1;
try{
if(isNaN(e)||"number"!=typeof e)i.__canplay&&i.isPause()||0==t.currentTime?t.play():t.currentTime=0;else{
var n=this.__getDuration();
e>=n&&(e=n-1),0>e&&(e=0),e=Math.floor(e),i.__last_playtime=e,i.container.find(".js_now_play_time").text(y(e)),
t.currentTime==e?t.play():t.currentTime=e;
}
}catch(o){
0==t.currentTime?t.play():t.currentTime=0;
}
}
},
pause:function(){
var e=this.video;
e&&0==e.readyState||(this.__replaySec=null,this.__delayToPlay&&(clearTimeout(this.__delayToPlay),
this.__delayToPlay=null),this.waitingHandlerTimer&&(clearTimeout(this.waitingHandlerTimer),
this.waitingHandlerTimer=null),e.pause(),p(this.id+":pause function"));
},
enterFullScreen:function(){
var e=this.video;
e.webkitSupportsFullscreen?e.webkitEnterFullscreen():e.webkitRequestFullScreen&&e.webkitRequestFullScreen(),
this.__isInFullScreen=!0;
},
exitFullScreen:function(){
this.video;
this.hideLoading(),document.webkitExitFullscreen&&document.webkitExitFullscreen(),
this.__isInFullScreen=!1;
},
isInFullScreen:function(){
return!!this.__isInFullScreen;
},
play4outer:function(e){
this.__forcePause=!1,this.play(e),this._trigger("userplay"),this._hidePlayControllBar();
},
pause4outer:function(){
this.__forcePause=!0,this.hideLoading(),this.pause(),this._trigger("userpause"),
this.hideControllBar(!0),this._showPlayControllBar();
},
setWidth:function(e){
this.container.find(".js_page_video").css({
width:e
});
},
setHeight:function(e){
this.container.find(".js_page_video").css({
height:e
});
},
showCover:function(){
this.container.find(".js_poster_cover").show();
},
hideCover:function(){
this.container.find(".js_poster_cover").hide();
},
showFuncControllBar:function(){
var e=this.container.find(".js_progress_bar,.js_full_screen_control");
e.show(),this.__hasFuncControllBar=!0;
},
hideFuncControllBar:function(){
var e=this.container.find(".js_progress_bar,.js_full_screen_control");
e.hide(),this.__hasFuncControllBar=!1;
},
showControllBar:function(){
this.container.find(".js_controll").removeClass("opr_fade_out").show();
},
hideControllBar:function(e){
var t=this.container.find(".js_controll");
t.removeClass("opr_fade_in");
var i=this,e=!1;
e?(i.__timerHideControll&&clearTimeout(i.__timerHideControll),t.hide()):(t.addClass("opr_fade_out"),
i.__timerHideControll=setTimeout(function(){
t.hide();
},500));
},
showLoading:function(e){
if(!this.__isshowLoading&&!this.__always_hide_loading){
this.__isshowLoading=!0;
var t=this;
window.setTimeout(function(){
t.__isshowLoading=!1;
},1e3),"firstTime"==e&&this.container.find(".js_loading").addClass("start_loading"),
this.container.find(".js_loading").show();
}
},
hideLoading:function(){
this.container.find(".js_loading").hasClass("start_loading")&&this.container.find(".js_loading").removeClass("start_loading"),
this.container.find(".js_loading").hide();
},
triggerMuted:function(e){
e?(this.video.muted=!0,this.video.setAttribute("muted",!0),this.container.find(".js_muted_btn").addClass("muting")):(this.video.muted=!1,
this.video.removeAttribute("muted"),this.container.find(".js_muted_btn").removeClass("muting"));
},
setVideoCSS:function(e){
var t=this,i=t.container,n=i.find(".js_page_video");
n.css(e);
},
hasFullScreen:function(){
return!!this.__has_fullscreen;
},
hasDrag:function(){
return!!this.__has_drag;
},
getCurTime:function(){
return this.video.currentTime;
},
getEndDom:function(){
return this.container.find(".js_end_dom");
},
getDrag:function(){
return this.__dragTimes;
},
getPlayTotalTime:function(){
return this.__endCountTime(),this.__play_total_time;
},
getLog:function(){
var e=this.log||{};
return{
hasended:e.hasended,
last_ms:Math.floor(1e3*(e.lastsec||0)),
duration_ms:Math.floor(1e3*(e.duration||0)),
video_error:e.video_error||0,
video_error_code:e.video_error_code||0,
loadwait:e.loadwait||0
};
},
isPlay:function(){
return!this.video.paused&&!this.isEnd();
},
isPause:function(){
return!!this.video.paused;
},
isEnd:function(){
return!!this.video.ended;
},
hasBeginPlay:function(){
return this.__hasBeginPlay;
},
destroy:function(){
u.removeListener({
type:"broadcastPlay",
func:this._event.broadcastPlay
});
try{
delete h._players[this.id];
}catch(e){}
h.visibilityPausePlayer===this&&(h.visibilityPausePlayer=null);
}
}),w._getFormatTime=y,w;
});!function(n){
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
}("function"==typeof jQuery?jQuery:this);define("a/video.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","biz_wap/utils/ajax.js","biz_wap/utils/device.js"],function(e){
"use strict";
function t(e,t){
d("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t);
}
function o(){
u({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST"
});
}
function i(e,t,o){
var i;
return function(){
var n=this,r=arguments,d=function(){
i=null,o||e.apply(n,r);
},a=o&&!i;
clearTimeout(i),i=setTimeout(d,t),a&&e.apply(n,r);
};
}
function n(e){
var n=document.getElementById("js_video_container"),d=null,p=e.rl||"",u="";
if(p){
p=p.split("?"),p=p.length>1?p[1]:"";
var m=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),f=p.match(m);
f&&(u=unescape(f[2]));
}
window.__video_report_data={
aid:e.aid,
traceid:e.traceid,
user_uin:window.user_uin,
appmsg_id:mid,
item_idx:idx,
viewid:u,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var v=null,y=!0,g=!1;
if(_.isAndroid&&_.gtVersion("6.6.6",!0)&&(g=!0),console.log(n),n){
console.log("player is begin"),d=new s({
container:n,
cover:e.video_info.thumbUrl,
width:n.offsetWidth,
height:n.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth),
muted:y,
ad_muted_btn:y,
always_hide_loading:!0,
src:e.video_info.videoUrl,
pt:e.pt,
autoHide:!0,
blockTouchVideo:!0,
onError:function(o){
console.log("播放出错",o),t(129,e.report_param),n.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+e.video_info.thumbUrl+"); height:"+l.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(130,e.report_param),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,d.replay(),o();
},
onTimeupdate:function(e,t){
2==window.__video_report_data.report_type&&(window.__video_report_data.report_type=3,
o()),window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*d.__getDuration(),w||(window.__video_report_data.report_type=3,
o(),w=1);
}
}),d._showPlayer(),d.setSrc(e.video_info.videoUrl,"auto");
var h=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,b=document.documentElement.clientHeight||window.innerHeight,j=i(function(){
if(3==window.__video_report_data.play_type)return void r.off(window,"scroll",j);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(h=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
b=document.documentElement.clientHeight||window.innerHeight,d.isPlay()&&(l.offsetTop>h+b-l.offsetHeight/2||l.offsetTop+l.offsetHeight/2<h))d.pause4outer();else if(!d.isPlay()&&c.canSupportAutoPlay&&("wifi"==window.networkType||"4g"==window.networkType)&&!(l.offsetTop>h+b+l.offsetHeight/2||l.offsetTop+l.offsetHeight<h-l.offsetHeight/2)){
if(_.isAndroid&&!g)return;
a.invoke("getBackgroundAudioState",{},function(o){
if(/:ok$/.test(o.err_msg)&&1*o.paused==0&&o.src);else{
if(window.no_vedio_ad&&1==window.no_vedio_ad&&"56"==window.ascene)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(131,e.report_param),
_.isIOS&&d.triggerMuted(y),d._trigger("beginPlay")):d.play4outer();
}
});
}
},500);
r.on(window,"scroll",j),j(),v=function(){
window.setTimeout(function(){
d.triggerMuted(y);
},1e3);
};
}
r.on(document.getElementById("js_video_container"),"tap",function(o){
if(o.target.className.indexOf("js_muted_btn")>-1)"true"==d.video.getAttribute("muted")?(d.triggerMuted(!1),
y=!1):(d.triggerMuted(!0),y=!0),t(132,e.report_param);else if(!d.isPlay())return d.__beginPlayHandler(),
d.triggerMuted(!0),t(133,e.report_param),void(window.__video_report_data.play_type=2);
}),r.on(window,"resize",function(){
setTimeout(function(){
var t=(l.clientWidth,n.offsetWidth),o=n.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth);
d.setHeight(o),d.setWidth(t),l.style.width=t,l.style.height=o;
},0);
});
}
var r=e("biz_common/dom/event.js"),d=e("biz_common/utils/report.js"),a=e("biz_wap/jsapi/core.js"),_=e("biz_wap/utils/mmversion.js"),p=e("a/a_report.js"),s=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),l=(p.AdClickReport,e("biz_common/utils/url/parse.js"),
document.getElementById("js_bottom_ad_area")),u=e("biz_wap/utils/ajax.js"),w=!1,c=e("biz_wap/utils/device.js");
return n;
});define("pages/video_communicate_adaptor.js",[],function(){
"use strict";
function t(){
window.addEventListener("message",e,!1),s();
}
function e(t){
var e;
if(t.origin?e=t.origin:t.originalEvent&&(e=t.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(e)&&t.source){
var i=t.data;
if(i&&i.type){
if(!/^mpvideo_/.test(i.type))return;
var o=i.type.replace(/^mpvideo_/,"");
/^broadcast_/.test(o)?f.postMessageEvt.broadcast({
data:i.data,
type:o
}):f.postMessageEvt[o]&&f.postMessageEvt[o](i.data);
}
}
}
function i(t){
var e=t.type.replace(/^broadcast_/,""),i=a();
if(i.length>0)for(var n=0,r=i.length;r>n;n++){
var d=i[n];
o({
win:d.contentWindow,
type:e,
data:t.data
});
}
o({
win:window,
type:e,
data:t.data
});
}
function o(t){
var e=t.type;
/^mpvideo_/.test(e)||(e="mpvideo_"+e);
var i={
data:t.data,
type:e
};
t.win.postMessage(i,document.location.protocol+"//mp.weixin.qq.com");
}
function n(t){
var e=a({
vid:t.vid
});
if(0!=e.length){
e[0].style.display="";
var i=e[0].parentNode,o=i.querySelectorAll('.js_img_loading[data-vid="'+t.vid+'"]');
if(o&&o.length>0)for(var n=0,r=o.length;r>n;n++)i.removeChild(o[n]);
}
}
function a(t){
t=t||{};
for(var e=document.getElementsByTagName("iframe"),i=[],o=0,n=e.length;n>o;o++){
var a=e[o],r=a.getAttribute("src");
if(r&&-1!=r.indexOf("/mp/videoplayer")){
if("undefined"!=typeof t.vid){
var d=r.match(/[\?&]vid\=([^&]*)/);
if(!d||!d[1]||d[1]!=t.vid)continue;
}
i.push(a);
}
}
return i;
}
function r(t){
if(t.height){
var e=a({
vid:t.vid
});
if(0!=e.length){
var i=e[0],o=i.offsetHeight+1*t.height;
i.setAttribute("height",o),i.setAttribute("data-additionalheight",t.height),i.style.setProperty&&i.style.setProperty("height",o+"px","important");
}
}
}
function d(t){
f.videoInfo[t.vid]||(f.videoInfo[t.vid]={}),f.videoInfo[t.vid].ori_status=t.ori_status;
}
function s(){
"function"==typeof window.__getVideoWh&&window.addEventListener("resize",function(){
for(var t=a(),e=0,i=t.length;i>e;e++){
var o=t[e];
setTimeout(function(t){
return function(){
var e=window.__getVideoWh(t),i=e.w,o=e.h,n=1*t.getAttribute("data-additionalheight");
n&&(o+=n),t.setAttribute("width",i),t.setAttribute("height",o),t.style.setProperty&&(t.style.setProperty("width",i+"px","important"),
t.style.setProperty("height",o+"px","important"));
};
}(o),50);
}
},!1);
}
function v(){
return f.videoInfo;
}
var f={
videoInfo:{},
postMessageEvt:{
broadcast:i,
removeVideoLoading:n,
addVideoIframeHeight:r,
videoInited:d
}
};
return t(),{
getVideoInfo:v
};
});
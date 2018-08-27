define("new_video/player.js",["page/pages/video.css","biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","new_video/player.html.js","biz_wap/utils/device.js","new_video/ctl.js","biz_common/tmpl.js"],function(e,i,t,n){
"use strict";
e("page/pages/video.css"),e("biz_wap/zepto/zepto.js"),e("biz_wap/zepto/event.js"),
e("biz_wap/zepto/touch.js");
var o=e("new_video/player.html.js"),a=e("biz_wap/utils/device.js"),r=e("new_video/ctl.js"),s=e("biz_common/tmpl.js"),l=3e3;
if(parent.window._players||(parent.window._players={}),parent.window._players_guid||(parent.window._players_guid=1),
parent.window.lastFullScreenPlay=null,a.os.ios||parent.window._hasHashChange||(parent.window._hasHashChange=!0,
$(parent.window).on("hashchange",function(){
var e=parent.window.lastFullScreenPlay,i=parent.location.hash;
e&&"#fullscreen"!=i&&e.isInFullScreen()&&e.exitH5FullScreen();
})),!parent.window._hasOnOrient){
var d="onorientationchange"in window?"orientationchange":"resize";
$(parent.window).on(d,function(){
var e=parent.window.lastFullScreenPlay;
e&&e.adaptH5FullScreen();
}),parent.window._hasOnOrient=!0;
}
var _=(parent.window.location.href.indexOf("&vconsole=1")>0?!0:!1,function(){}),h=(navigator.userAgent,
function(){
return!0;
}()),u=function(){
return!!a.browser.M1;
}(),c=function(e,i){
var t=document.createElement("div");
return e in t.style?(t.style[e]=i,t.style[e]===i):!1;
},p=function(e){
var i=0,t=0,n=0;
.5>e&&(e=0),e=Math.ceil(e);
var i=Math.floor(e/3600),t=Math.floor((e-3600*i)/60),n=e-3600*i-60*t;
return 0!=i?(10>i&&(i="0"+i),i+=":"):i="",10>t&&(t="0"+t),10>n&&(n="0"+n),i+t+":"+n;
},f=!a.canSupportVideo,g=function(e){
var i=$(e.container);
"undefined"==typeof e.videoReportType&&(e.videoReportType=-1),e.width=e.width||300,
e.height=e.height||300,e.videoWidth=e.videoWidth||0,e.videoHeight=e.videoHeight||0,
e.duration=e.duration||0,e.videoFit=!1;
var t={
needToFit:!1,
supportObjectFit:!1,
os:a.os
};
if(e.width&&e.height&&e.videoWidth&&e.videoHeight){
var n=Math.abs(e.width/e.height-e.videoWidth/e.videoHeight);
.1>=n&&(t.needToFit=!0,c("objectFit","fill")&&(t.supportObjectFit=!0,e.videoFit=!0));
}
e.ratio=e.ratio||e.width/e.height,e.autoplay=!!e.autoplay||!1,this.opt=e,this.id=e.id=parent.window._players_guid++,
this.__forcePause=!1,this.__hasFuncControllBar=!0,this.__dragTimes=[],this.__play_total_time=0,
this.__last_playtime=0,this.__always_hide_loading=e.always_hide_loading||!1,e._mustHideFullScreen=u,
e.display=e.autoHide?"none":"block",e.ad_muted_btn=e.ad_muted_btn||!1;
var r=s.tmpl(o,e);
i.append(r);
var l=this.container=$("#js_mpvedio_"+this.id);
this.$video=l.find("video");
var d=this.video=this.$video[0];
this.__initData(),this.__initVideo();
var _=e.src;
if(!_)return void this.__triggerOutside("error",{
errorcode:5
});
if(d.setAttribute("origin_src",_),f)return l.find(".js_btn_play").attr("href",_).show(),
this.__loadedHandler(),void this.__bindBtnEvent();
var h=e.plugins||[];
this._blockPlugin={};
for(var p=0,g=h.length;g>p;++p){
var v=h[p];
v.setPlayer(this),!!v.init&&v.init();
}
this.plugins=h,parent.window._players[_]=this,this._trigger("afterCheckVideoFit",t),
this._trigger("loading",e),this.__bindBtnEvent(),this.__bindVideoEvent();
};
return $.extend(g.prototype,{
__triggerOutside:function(){
var e=this.opt,i=arguments,t=i[0],n=this,o=this.video;
if(t){
t=t.substr(0,1).toUpperCase()+t.substr(1);
var r=e["on"+t];
"function"==typeof r&&r.apply(this,i),"BeginPlay"!=t||null!=n.__replaySec&&0!=n.__replaySec||!a.os.ios||(o.currentTime=.1);
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
var i=this.opt.duration;
i&&i>0&&this.container.find(".js_video_length").html(p(i)).show();
},
__outsidePauseHandler:function(){
_("__outsidePauseHandler"),this.hideLoading(),this.pause(),this._trigger("userpause"),
this.hideControllBar(!0),this._showPlayControllBar();
},
__readyBeginPlayHandler:function(e){
this.setSrc(this.opt.src),this._trigger("beginPlay",e);
},
__beginPlayHandler:function(){
f&&(location.href=this.opt.src);
var e=this.container,i=this,t=this.video;
e.find(".js_video_poster").show(),this.showCover(),e.find(".js_video_play_controll").hide(),
this.__hasBeginPlay=!0,i.showLoading("firstTime"),setTimeout(function(){
t.play();
},1);
},
__replayHandler:function(){
this.setSrc(this.src),this._afterReplay();
},
__endHandler:function(){
this.container.find(".js_btn_play_aria").data("status","3").removeClass("video_playing"),
this.hideControllBar(),this._hidePlayControllBar();
},
__hideControllTimeoutCallback:function(){
this.isPlay()&&this.hideControllBar();
},
__touchVideoHandler:function(){
var e=this,i=this.opt;
if(i.blockTouchVideo)return!1;
var t=this.__touchVideoTimeoutHandler;
if(!e.__canplay||e.isEnd()&&i.hideControllBarAtEnd)return void e.hideControllBar();
var n=e.container.find(".js_controll");
"none"==n.css("display")?e.showControllBar():e.hideControllBar(!0),t&&clearTimeout(t),
e.__touchVideoTimeoutHandler=setTimeout(function(){
e.__hideControllTimeoutCallback.call(e);
},l);
},
__initData:function(){
this.log={
hasended:0,
lastsec:0,
duration:0,
video_error:0
},this.__hasBeginPlay=!1,this.__canplay=!1,this.__hasscroll=!1,this.__replaySec=null;
},
__initVideo:function(){
var e=this.opt,i=this.video;
i.addEventListener("contextmenu",function(e){
e.preventDefault(),e.stopPropagation();
},!1),i.hasAttribute("controls")&&i.removeAttribute("controls"),i.setAttribute("webkit-playsinline","isiPhoneShowPlaysinline"),
i.setAttribute("playsinline","isiPhoneShowPlaysinline"),e.loop&&i.setAttribute("loop",e.loop),
e.muted&&i.setAttribute("muted",e.muted),this.$video.off("loadedmetadata durationchange"),
this.__hasVideoDurationchange=!1;
},
__getDuration:function(){
var e=this.opt,i=this.video,t=i.duration;
return t&&1!=t?t:e.duration;
},
__videoDurationchange:function(){
var e=this;
if(!e.__hasVideoDurationchange){
var i=this.video,t=this.opt,n=this.container;
if(1/0!=i.duration&&i.duration>0&&1!=i.duration)e.duration=i.duration,e.__hasVideoDurationchange=!0;else{
if(!t.duration)return!1;
e.duration=t.duration,e.__hasVideoDurationchange=!0;
}
e.log.duration=e.duration,n.find(".js_total_time").text(p(e.duration)),this.__hasFuncControllBar&&n.find(".js_progress_bar,.js_total_time").show();
var o=+new Date,a=o-e.log.loadwait_start;
e.log.loadwait=a,e._trigger("durationchange",{
loadwait:a
});
}
},
__startCountTime:function(){
var e=this,i=this.video;
i&&null===e.__last_playtime&&(e.__last_playtime=i.currentTime);
},
__endCountTime:function(){
var e=this,i=this.video;
i&&i.currentTime>e.__last_playtime&&null!==e.__last_playtime&&(e.__play_total_time+=i.currentTime-e.__last_playtime,
e.__last_playtime=null);
},
__bindVideoEvent:function(){
var e=this.$video,i=this,t=this.container,n=t.find(".js_switch"),o=(t.find(".js_video_pause_controll"),
this.video);
e.off("timeupdate").on("timeupdate",function(){
if(i.__forcePause===!0)return void _(i.id+":timeupdate __forcePause return");
if(i.__hasBeginPlay&&!i.__canplay)return i.showLoading(),!1;
o=i.video,null!=i.__replaySec&&(_(i.id+":timeupdate __replaySec"),o.pause(),o.currentTime=i.__replaySec,
i.__last_playtime=i.__replaySec,o.play(),i.__replaySec=null),i.__startCountTime(),
i.hideLoading(),i.__videoDurationchange();
var e=o.currentTime;
if(e>0){
var n=i.__getDuration();
i.__setControllBar(e/n),i.hideCover(),i.hideLoading(),t.find(".js_now_play_time").text(p(e)),
i._trigger("timeupdate",{
currentTime:e
});
}
}),e.off("canplay").on("canplay",function(){
null!=i.__replaySec&&(o.currentTime=i.__replaySec,i.__last_playtime=i.__replaySec,
i.__replaySec=null),i.__canplay=!0,i._trigger("canplay");
}),e.off("ended").on("ended",function(){
_("player inner isend:"+i.isEnd()),i.isEnd()&&(i.__endCountTime(),i._trigger("end"));
}),e.off("emptied").on("emptied",function(){}),i.waitingHandlerTimer=null;
var a=0;
e.off("stalled").on("stalled",function(){
if(this.__hasBeginPlay&&!i.waitingHandlerTimer){
i.showLoading();
var e=o.src,t=o.readyState,n=o.error;
0!=t||n&&0!=n.code||(clearTimeout(i.waitingHandlerTimer),i.waitingHandlerTimer=null,
i.showLoading(),i.showCover(),o.pause(),o.src=e,o.load(),o.play(),_(i.id+":stalled"));
}
}),e.off("seeking").on("seeking",function(){
_("seeking,__hasBeginPlay:"+i.__hasBeginPlay),i.__hasBeginPlay&&i.showLoading();
}),e.off("waiting").on("waiting",function(){
if(_("waiting,__hasBeginPlay:"+i.__hasBeginPlay),i.__hasBeginPlay){
i.showLoading(),clearTimeout(i.waitingHandlerTimer),i.waitingHandlerTimer=null;
var e=0,t=parent.window._players;
for(var n in t)if(t.hasOwnProperty(n)&&e++,e>1)break;
e>1&&i.__forcePause===!1&&(i.waitingHandlerTimer=setTimeout(function(){
if(i.__forcePause!==!0){
var e=o.error;
if(0==o.readyState&&(!e||0==e.code)){
clearTimeout(i.waitingHandlerTimer),i.waitingHandlerTimer=null;
var t=o.src;
i.showLoading(),i.showCover(),o.pause(),o.src=t,a++,o.load(),o.play(),_(i.id+":waitingHandlerTimer");
}
}
},1e4)),i._trigger("waiting");
}
}),e.off("play playing").on("play playing",function(){
return i.__forcePause===!0?void _(i.id+":play playing __forcePause return"):(_(i.id+":play playing"),
n.removeClass("switch_on"),n.addClass("switch_off"),i._hidePlayControllBar(),i.__startCountTime(),
void i._trigger("play"));
}),e.off("pause").on("pause",function(){
_(i.id+":video pause event"),n.addClass("switch_on"),n.removeClass("switch_off"),
!i.__canplay||i.isEnd()||i.__onTouch?i._hidePlayControllBar():(i.hideControllBar(!0),
i._showPlayControllBar()),i.__endCountTime(),i._trigger("pause");
}),e.off("error").on("error",function(){
var e;
i.video.error&&(e=i.video.error.code),i._trigger("error",{
errorcode:e
});
}),e.on("webkitfullscreenchange mozfullscreenchange fullscreenchange",function(){
var e=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen,t=$(this);
e?(t.parents(".js_inner").removeClass("not_fullscreen"),i.__isInFullScreen=!0):(t.parents(".js_inner").addClass("not_fullscreen"),
i.hideLoading(),i.__isInFullScreen=!1);
});
},
__bindBtnEvent:function(){
function e(){
if(f)return location.href=t.opt.src,!1;
if(o){
var e=2;
try{
e=window.cgiData&&"0"==window.cgiData.media_source?11:2;
}catch(i){}
r.report({
step:e,
vid:o.vid,
traceid:o.pageplayer._getTraceId(),
orderid:o.pageplayer._getOrderid(),
type:n.videoReportType
});
}
t._trigger("readyBeginPlay");
}
function i(){
t.isPlay()?(t.hideLoading(),t.pause(),t._trigger("userpause"),t.hideControllBar(!0),
t._showPlayControllBar()):(t.__forcePause=!1,t.showLoading(),t.play(),t._trigger("userplay"));
}
var t=this,n=this.opt,o=n.extinfo,s=this.container,l=this.video,d=(s.find(".js_video_play_controll"),
s.find(".js_btn_play")),u=s.find(".js_btn_play_aria"),c=(s.find(".js_video_poster"),
s.find(".js_switch")),p=s.find(".js_progress_bar"),g=s.find(".js_played_bar"),v=s.find(".js_page_video"),y=s.find(".js_full_mask"),w=s.find(".js_video_pause_controll"),m=s.find(".js_full_screen_control"),T=s.find(".js_loading");
w.on("tap",".js_btn_pause",function(){
t.__forcePause=!1,t.play(),t._trigger("userplay"),t._hidePlayControllBar();
});
var j,C,b,P,S=0,B=!1,F=0,H=0,x=0,D=t.__getDuration(),k=0,M=1,L=parent.window.user_uin||0,V=0!==L&&Math.floor(L/100)%1e3<M,E=!1,I=0;
v.on("touchstart",function(e){
1==e.targetTouches.length&&t.isPlay()&&(n.blockTouchVideo||(b=j=new Date,P=C={
x:e.targetTouches[0].clientX,
y:e.targetTouches[0].clientY
},x=parent.document.body.scrollTop,k=t.getCurTime(),a.os.android&&e.preventDefault()));
}),v.on("touchmove",function(e){
if(1==e.targetTouches.length&&t.isPlay()&&!n.blockTouchVideo){
if(parent.document.body.scrollTop!=x)return B=!1,void(x=-1);
var i=new Date,o=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY,r=i-j,s=o-C.x,l=a-C.y,d=Math.sqrt(Math.pow(s,2)+Math.pow(l,2))+H,_=Math.min(Math.ceil(d/r),6);
F=Math.floor(.1*d+.2*_*_*_)*Math.ceil(D/500),H=0==F?d:0,0>s&&(F=-F);
var h=180*Math.atan2(l,s)/Math.PI;
B||(h>=-30&&30>=h&&++S,(h>=150&&180>=h||h>=-180&&-150>=h)&&--S,(S>=4||-4>=S)&&(5>=d?S=0:(I=Math.max(I,_),
B=!0))),B&&(k+=F,0>k&&(k=0),k>D&&(k=1*D),t.__setForwardBar(k),e.preventDefault(),
e.stopPropagation()),C={
x:o,
y:a
},j=i;
}
}),v.on("touchend",function(e){
if(t.isEnd()||t.isPause()||B||t._trigger("touchVideo"),B&&(t.play(k),s.find(".js_forward").css("display","none"),
V&&((new Image).src="/mp/jsmonitor?idkey=28307_29_1",!E))){
var i=(new Date,{
x:e.changedTouches[0].clientX,
y:e.changedTouches[0].clientY
}),n=i.x-P.x,o=i.y-P.y,a=parseInt(Math.sqrt(Math.pow(n,2)+Math.pow(o,2))),r=parseInt(180*Math.atan2(o,n)/Math.PI);
r>=-30&&30>=r||r>=150&&180>=r||r>=-180&&-150>=r||((new Image).src="/mp/jsmonitor?idkey=28307_35_1"),
(new Image).src="/mp/jsmonitor?idkey=28307_31_1;28307_33_"+a+";28307_34_"+I,E=!0;
}
F=0,B=!1,S=0;
}),v.on("touchmove MSPointerMove pointermove mousemove",function(e){
t.isInFullScreen()&&!h&&(e.preventDefault(),e.stopPropagation());
}),T.on("touchend",function(){
t._trigger("touchVideo");
}),y.on("touchend",function(){
t.isEnd()||t._trigger("touchVideo");
}),y.on("touchmove MSPointerMove pointermove mousemove",function(e){
t.isInFullScreen()&&!h&&(e.preventDefault(),e.stopPropagation());
}),_("play aria click"),u.on("tap",function(){
var n=$(this),o=1*n.data("status");
_("play aria status:"+o),0==o?(n.addClass("video_playing").data("status","1"),e()):1==o?(n.removeClass("video_playing").data("status","2"),
i()):2==o?(n.addClass("video_playing").data("status","1"),i()):3==o&&(n.addClass("video_playing").data("status","1"),
t._trigger("ariaReplay"));
}),d.on("tap",function(){
e();
}),T.on("touchend",function(){
t._trigger("touchVideo");
}),c.on("tap",function(){
i();
});
var z,O,A,R=null,q=[];
t.__onTouch=!1,p.on("touchstart",function(e){
t.__hasFuncControllBar&&(t.__onTouch=!0,O=z?e:e.touches[0],R={},R.x1=O.pageX,R.y1=O.pageY,
A=l.currentTime,q=A,t.pause(),e.preventDefault());
}),p.on("touchmove",function(e){
if(t.__hasFuncControllBar){
t.__onTouch=!0,O=z?e:e.touches[0];
var i=O.pageX,n=O.pageY;
R.x2=i,R.y2=n;
var o=g.offset(),a=p.width(),r=(i-o.left)/a;
A=t.__getDuration()*r,t.pause(),t.__setControllBar(r),t.__has_drag=!0,e.preventDefault(),
e.stopPropagation();
}
}),p.on("touchend",function(e){
if(t.__hasFuncControllBar){
if(t.__onTouch=!1,R&&R.x1){
var i=R.x2?R.x2:R.x1,n=g.offset(),o=p.width(),a=(i-n.left)/o;
if(a=a>1?1:a,A=t.__getDuration()*a,t.__setControllBar(a),q){
var r=0>A?0:A;
t.__dragTimes.push(Math.round(1e3*q)+":#:"+Math.round(1e3*r)),q=0;
}
}
return R=null,setTimeout(function(){
t.__forcePause=!1,t.showLoading(),t.play(A);
},0),e.preventDefault(),e.stopPropagation(),!1;
}
}),m.on("tap",function(e){
return t.isInFullScreen()?h?t.exitFullScreen():t.exitH5FullScreen():(t.__has_fullscreen=!0,
h?((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_56_1&r="+Math.random(),
t.enterFullScreen()):t.enterH5FullScreen()),e.stopPropagation(),e.preventDefault(),
!1;
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
var i=this.container;
i.find(".js_played_bar").css({
width:e
}),i.find(".js_played_speed_cnt").css({
left:e
});
},
__setForwardBar:function(e){
var i=this.container,t=(this.video,this.__getDuration()),n=e/t;
i.find(".js_forward").css("display","block"),i.find(".total_time").text(p(t)),i.find(".js_forward_bar").css("width",100*n+"%"),
i.find(".js_forward_play_time").text(p(e));
},
__setBufferBar:function(e){
var i=this.container,t=this.video,n=this.__getDuration(),o=t.currentTime;
e=e||o/n;
var a=e;
t.buffered&&t.buffered.length>0&&t.buffered.end&&n&&(a=t.buffered.end(0)/n,a=Math.max(e,Math.ceil(parseInt(100*a))),
a>98&&(a=100)),i.find(".js_buffer_bar").css({
width:a+"%"
});
},
__resetVideo:function(){
this.$video.remove();
var e=this.container,i=e.find(".js_video_poster");
i.append("<video></video>");
{
var t=this.$video=i.find("video");
this.video=t[0];
}
this.__canplay=!1,this.__forcePause=!1,this.__initVideo(),this.__bindVideoEvent();
},
_trigger:function(e,i){
if("play"==e){
var t=parent.window._players;
for(var n in t){
var o=t[n];
o!==this&&o.__hasBeginPlay&&!o.isEnd()?(o.__forcePause=!0,o.hideLoading(),o.video.pause(),
o._trigger("userpause"),_(o.id+":pause other"),o._showPlayControllBar()):o===this&&(o.__forcePause=!1,
o._trigger("userplay"));
}
}
var a=this.plugins,r=this._blockPlugin[e]||this._blockPlugin.all,s=0;
if(r&&"function"==typeof r.recv&&(s|=r.recv(e,i),1&s))return!1;
for(var n=0,l=a.length;l>n&&(s|=a[n].recv(e,i),!(2&s));++n);
if(!(this._blockInnerHandler||4&s)){
var d=this["__"+e+"Handler"];
d&&d.call(this,i);
}
8&s||this.__triggerOutside(e,i);
},
_setBlockInnerHandler:function(e){
this._blockInnerHandler=e;
},
_setBlockPlugin:function(e,i){
this._blockPlugin[e]=i;
},
_getContainer:function(){
return this.container;
},
_setCover:function(e,i){
this.container.find(".js_poster_cover").css(i),this.opt.cover=e;
},
_removeCover:function(e){
var e=e||{
"background-image":"none"
};
this.container.find(".js_poster_cover").css(e);
},
_afterReplay:function(){
this.__hasBeginPlay=!0,this.showControllBar(),this.play(.1);
},
setSrc:function(e,i){
var t=this,n=this.$video,o=(this.opt,this.video);
this.src=e,t.__initData(),t.__initVideo(),this.showCover(),t.log.loadwait_start=+new Date,
n.attr("src",e),o.preload=i||"metadata",o.load(),this.container.find(".js_now_play_time").text(p(0)),
n.on("loadedmetadata durationchange",function(){
t.__videoDurationchange();
}),o.duration>0&&1!=o.duration&&t.__videoDurationchange();
},
replay:function(){
a.os.android;
var e=this.opt.extinfo;
e&&r.report({
step:9,
vid:e.vid,
traceid:e.pageplayer._getTraceId(),
orderid:e.pageplayer._getOrderid(),
type:this.opt.videoReportType
}),this._trigger("replay");
},
resetVideo:function(){
this.container.find(".js_video_poster").hide(),this.showCover(),this.__resetVideo(),
this._trigger("loading"),this.__hasBeginPlay=!0;
},
play:function(e){
if(!i||0!=i.readyState){
var i=this.video,t=this;
e*=1;
try{
if(isNaN(e)||"number"!=typeof e)e=0;else{
var n=this.__getDuration();
e>=n&&(e=n-.01),0>e&&(e=0),i.currentTime=e,t.__replaySec=e,t.__last_playtime=e,t.container.find(".js_now_play_time").text(p(e));
}
}catch(o){
e=0;
}
clearTimeout(t.__delayToPlay),t.__delayToPlay=setTimeout(function(){
t.__forcePause!==!0&&(i.pause(),i.play(),t._trigger("play"),_(t.id+":delayToplay"));
},100),_(t.id+":play function");
}
},
pause:function(){
if(!e||0!=e.readyState){
var e=this.video;
this.__replaySec=null,this.__delayToPlay&&(clearTimeout(this.__delayToPlay),this.__delayToPlay=null),
this.waitingHandlerTimer&&(clearTimeout(this.waitingHandlerTimer),this.waitingHandlerTimer=null),
e.pause(),_(this.id+":pause function");
}
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
var i=this.container.find(".js_controll");
i.removeClass("opr_fade_in");
var t=this,e=!1;
e?(t.__timerHideControll&&clearTimeout(t.__timerHideControll),i.hide()):(i.addClass("opr_fade_out"),
t.__timerHideControll=setTimeout(function(){
i.hide();
},500));
},
showLoading:function(e){
if(!this.__isshowLoading&&!this.__always_hide_loading){
this.__isshowLoading=!0;
var i=this;
window.setTimeout(function(){
i.__isshowLoading=!1;
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
adaptH5FullScreen:function(){
var e=$(window).width(),i=$(window).height(),t=!1;
(180==window.orientation||0==window.orientation||i>e)&&(t=!0);
var o=this,a=this.opt,r=o.container,s=r.find(".js_page_video"),l=o.$video;
if(a.defineCSS)return!1;
if(t){
var d=e,_=l.height()/l.width(),h=d*_;
s.css({
marginTop:-h/2,
marginLeft:-d/2,
width:d+"px",
height:h+"px"
});
}else n("!isVertical"),s.css({
marginTop:0,
marginLeft:0,
width:"100%!important",
height:"100%!important"
});
},
enterH5FullScreen:function(){
{
var e=this,i=this.opt,t=e.container;
t.find(".js_page_video"),e.$video;
}
!!i.onBeforeEnterH5FullScreen&&i.onBeforeEnterH5FullScreen(),$("body").addClass("full_screen_mv"),
this.adaptH5FullScreen(),parent.window.lastFullScreenPlay=this,this.__isInFullScreen=!0,
"#fullscreen"!=parent.location.hash&&(parent.location.hash="#fullscreen");
},
exitH5FullScreen:function(){
{
var e=this,i=this.opt,t=e.container,n=t.find(".js_page_video");
e.$video;
}
!!i.onBeforeExitH5FullScreen&&i.onBeforeExitH5FullScreen(),n.css({
marginTop:0,
marginLeft:"auto",
marginRight:"auto",
width:i.width+"px",
height:i.height+"px"
}),$("body").removeClass("full_screen_mv"),t.find(".js_controll").removeClass("opr_fade_out").addClass("opr_fade_in").show(),
parent.window.lastFullScreenPlay=null,this.__isInFullScreen=!1,"#fullscreen"==parent.location.hash&&(parent.location.hash="");
},
setVideoCSS:function(e){
var i=this,t=i.container,n=t.find(".js_page_video");
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
}
}),g._getFormatTime=p,g;
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
}("function"==typeof jQuery?jQuery:this);define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(e);
}
function o(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function i(e){
var i=e.btn;
if(!i)return!1;
var r=e.adData,p=!1,c={};
e.report_param=e.report_param||"";
var d="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(r.appinfo_url)+"&ticket="+(e.ticket||window.ticket)+"#wechat_redirect";
n.on(i,"click",function(){
if(t("click @js_app_action"),p)return t("is_app_installed"),o(r.is_appmsg?17:13,e),
void(location.href=r.app_id+"://");
var i=function(){
t("download"),o(r.is_appmsg?15:11,e),t("go : "+d),location.href=d;
};
return t("download"),r.rl&&r.traceid?c[r.traceid]||(c[r.traceid]=!0,a({
url:"/mp/advertisement_report?report_type=2&type="+r.type+"&url="+encodeURIComponent(r.appinfo_url)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&tid="+r.traceid+"&rl="+encodeURIComponent(r.rl)+"&pt="+r.pt+e.report_param,
type:"GET",
timeout:1e3,
complete:function(){
t("ready to download"),c[r.traceid]=!1,i();
},
async:!0
})):i(),!1;
});
}
{
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),a=e("biz_wap/utils/ajax.js");
e("biz_wap/jsapi/core.js");
}
return i;
});define("a/android.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(n,a,e,t){
"use strict";
function o(n){
"undefined"!=typeof s&&s.log&&s.log(n);
}
function i(n,a){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+n+a.report_param);
}
function d(n){
function a(){
s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var a=n.err_msg;
a.indexOf("get_install_state:yes")>-1&&(window.clearInterval(T),k=!0,d.innerHTML=x.installed);
});
}
function e(){
b&&s.invoke("queryDownloadTask",{
download_id:b
},function(a){
if(a&&a.state){
if("download_succ"==a.state){
o("download_succ"),i(c.is_appmsg?18:14,n),window.clearInterval(y),I=!1,j=!0,d.innerHTML=x.downloaded;
var e=document.createEvent("MouseEvents");
e.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(e);
}
if("downloading"==a.state)return;
("download_fail"==a.state||"default"==a.state)&&(o("fail, download_state : "+a.state),
window.clearInterval(y),I=!1,t("下载失败"),d.innerHTML=x.download);
}
});
}
var d=n.btn;
if(!d)return!1;
var r={},c=n.adData,m="",u="",p=c.androiddownurl;
if(p&&p.match){
var _=/&channelid\=([^&]*)/,w=p.match(_);
w&&w[1]&&(m="&channelid="+w[1],c.androiddownurl=p.replace(_,""));
}
n.via&&(u=["&via=ANDROIDWX.YYB.WX.ADVERTISE",n.via].join("."));
var f=!1,v="com.tencent.android.qqdownloader",g=1060125,k=!1,I=!1,j=!1,b=0,y=null,T=null,x={
download:"下载",
downloading:"下载中",
downloaded:"安装",
installed:"已安装"
};
d.innerHTML=x.download,s.ready(function(){
s.invoke("getInstallState",{
packageName:v
},function(n){
var a=n.err_msg;
o("getInstallState @yingyongbao : "+a);
var e=a.lastIndexOf("_")+1,t=a.substring(e);
1*t>=g&&a.indexOf("get_install_state:yes")>-1&&(f=!0);
}),s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var a=n.err_msg;
o("getInstallState @"+c.pkgname+" : "+a);
var e=a.lastIndexOf("_")+1,t=a.substring(e);
1*t>=c.versioncode&&a.indexOf("get_install_state:yes")>-1&&(k=!0,d.innerHTML=x.installed);
}),d.addEventListener("click",function(){
if(o("click @js_app_action"),!I){
if(k)return!1;
if(j)return s.invoke("installDownloadTask",{
download_id:b,
file_md5:c.md5sum
},function(n){
var e=n.err_msg;
o("installDownloadTask : "+e),e.indexOf("install_download_task:ok")>-1?T=setInterval(a,1e3):t("安装失败！");
}),!1;
var p=function(){
return f?(i(c.is_appmsg?16:12,n),void(location.href="tmast://download?oplist=1,2&pname="+c.pkgname+m+u)):void s.invoke("addDownloadTask",{
task_name:c.appname,
task_url:c.androiddownurl,
extInfo:n.task_ext_info,
file_md5:c.md5sum
},function(a){
var r=a.err_msg;
o("addDownloadTask : "+r),r.indexOf("add_download_task:ok")>-1?(i(c.is_appmsg?15:11,n),
I=!0,b=a.download_id,o("download_id : "+b),d.innerHTML=x.downloading,y=setInterval(e,1e3)):t("调用下载器失败！");
});
};
return c.rl&&c.traceid?r[c.traceid]||(r[c.traceid]=!0,l({
url:"/mp/advertisement_report?report_type=2&type="+c.type+"&url="+encodeURIComponent(c.androiddownurl)+"&tid="+c.traceid+"&rl="+encodeURIComponent(c.rl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pt="+c.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
r[c.traceid]=!1,p();
},
async:!0
})):p(),!1;
}
});
});
}
var r=(n("biz_common/dom/event.js"),n("biz_common/utils/report.js")),l=n("biz_wap/utils/ajax.js"),s=n("biz_wap/jsapi/core.js");
return d;
});define("a/profile.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(e,t){
d("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function n(e,t){
if(t&&t.crt_exp_info)try{
var n=JSON.parse(t.crt_exp_info.html());
n.is_new_profile?f.invoke("profile",{
username:n.username
}):(console.log("exp to profile h5"),location.href=e);
}catch(i){
console.error("decode crt_exp_info error",t),location.href=e;
}else location.href=e;
return!1;
}
function i(e){
var i=e.adData,l=e.pos_type||0,b={},j=e.a_info;
e.report_param=e.report_param||"",function(){
function m(e){
{
var t=y.dataset;
"https:"==top.location.protocol?1500:1200;
}
if(t.rl&&t.url&&t.type&&t.tid){
var n=t.tid,o=t.type,a=t.url,s=t.rl;
if(!b[n]){
b[n]=!0;
var r,c,p,d,m=!!e&&e.target;
m&&(r=u.getX(m,"js_ad_link")+e.offsetX,c=u.getY(m,"js_ad_link")+e.offsetY,p=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
d=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
_({
type:o,
report_type:2,
click_pos:0,
url:encodeURIComponent(a),
tid:n,
rl:encodeURIComponent(s),
__biz:biz,
pos_type:l,
pt:i.pt,
pos_x:r,
pos_y:c,
ad_w:p||0,
ad_h:d||0
},function(){
b[n]=!1,w();
});
}
}else w();
}
var y=e.btnAddContact,k=e.btnViewProfile;
if(y&&y.dataset){
var v=function(o,a){
var s=o.err_msg,r=i.is_appmsg?6:1;
-1!=s.indexOf("ok")?(k.style.display="inline-block",y.style.display="none",r=i.is_appmsg?9:4):"add_contact:added"==s?r=i.is_appmsg?7:2:"add_contact:cancel"==s?r=i.is_appmsg?8:3:(--a,
a>=0?f.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
v(e,a);
}):(s="addContact:fail|msg:"+s+"|uin:"+uin+"|biz:"+biz,d("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+s+"&r="+Math.random()),
n(i.url,j))),t(r,e);
},w=function(){
t(i.is_appmsg?10:5,e),g.setSum(110696,7,1),o?g.setSum(110696,10,1):(o=!0,a=+new Date),
s?+new Date-s<2e3&&(g.setSum(110696,11,1),setTimeout(function(){
s=0;
},2e3)):s=+new Date,r?+new Date-r<3e3&&(g.setSum(110696,12,1),setTimeout(function(){
r=0;
},3e3)):r=+new Date,c?+new Date-c<4e3&&(g.setSum(110696,13,1),setTimeout(function(){
c=0;
},4e3)):c=+new Date,f.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
var t=+new Date-a;
g.setAvg(110696,9,t).send(),o=!1,v(e,1);
});
};
p.on(y,"click",m);
}
}(),function(){
var t=e.btnViewProfile;
console.log("opt",e),t&&p.on(t,"click",function(){
console.log(e);
var t=e.btnAddContact.dataset,o={
source:4,
tid:t.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:i.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:l
},a=m.join(i.url,o);
return n(a,e.a_info),!1;
});
}(),function(){
var o=e.btnProfile;
if(o){
var a=function(o,s,r){
var c=o.err_msg,p=i.is_appmsg?6:1;
-1!=c.indexOf("ok")?(e.adData.biz_info.is_subscribed=1,console.log(r),r.innerHTML=r.innerHTML.replace("关注","查看"),
p=i.is_appmsg?9:4):"add_contact:added"==c?p=i.is_appmsg?7:2:"add_contact:cancel"==c?p=i.is_appmsg?8:3:(--s,
s>=0?f.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
a(e,s,r);
}):(c="addContact:fail|msg:"+c+"|uin:"+uin+"|biz:"+biz,d("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+c+"&r="+Math.random()),
n(i.url,e.a_info))),t(p,e);
},s=function(n){
t(i.is_appmsg?10:5,e),f.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
a(e,1,n);
});
};
p.on(o,"click",function(t){
if(console.log("has_click",b,e.adData),e.adData.biz_info.is_subscribed){
var o=e.adData;
o.tid=o.traceid;
var a={
source:4,
tid:o.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:i.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:l
},r=m.join(i.url,a);
n(r,e.a_info);
}else{
{
var o=e.adData;
"https:"==top.location.protocol?1500:1200;
}
if(o.tid=o.traceid,o.rl&&o.url&&o.type&&o.tid){
var c=o.tid,p=o.type,r=o.url,d=o.rl;
if(!b[c]){
console.log("has_click[tid]",b[c]),b[c]=!0;
var f,g,j,y,k=!!t&&t.target;
k&&(f=u.getX(k,"js_ad_link")+t.offsetX,g=u.getY(k,"js_ad_link")+t.offsetY,j=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
y=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
_({
type:p,
report_type:2,
click_pos:0,
url:encodeURIComponent(r),
tid:c,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:l,
pt:i.pt,
pos_x:f,
pos_y:g,
ad_w:j||0,
ad_h:y||0
},function(){
b[c]=!1,s(k);
});
}
}else{
var k=!!t&&t.target;
s(k);
}
}
return!1;
});
}
}();
}
var o,a,s,r,c,p=e("biz_common/dom/event.js"),d=e("biz_common/utils/report.js"),l=e("a/a_report.js"),_=l.AdClickReport,m=(e("biz_wap/utils/ajax.js"),
e("biz_common/utils/url/parse.js")),u=e("biz_wap/utils/position.js"),f=e("biz_wap/jsapi/core.js"),g=("https:"==top.location.protocol?5:0,
window.__report,e("biz_common/utils/monitor.js"));
return i;
});define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/appdialog_confirm.js","biz_common/utils/url/parse.js"],function(a,t,n,e){
"use strict";
function o(a){
h("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+H.report_param);
}
function d(a,t){
if(H.app_status=a,H.percentStatus)return H.percentStatus(a,t),!1;
if("downloading"==a){
t=t||0;
var n="";
if(document.getElementById("js_appdetail_action_0")&&(z=document.getElementById("js_appdetail_action_0").offsetWidth,
D=document.getElementById("js_appdetail_action_0").offsetHeight),104==H.data.pt?n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停('+t+"%)</span>":113==H.data.pt||114==H.data.pt?H.btn.innerHTML.indexOf("继续")>-1?(n=H.btn.innerHTML,
n=n.replace("继续","暂停")):n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停</span>':122==H.data.pt?(H.btn.innerHTML.indexOf("继续")>-1?(n=H.btn.innerHTML,
n=n.replace(/继续/g,"暂停")):0==C?n='<span class="btn_progress_inner js_btn_process" id="percent_btn_1" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+z+'px;">暂停</span></span>暂停':document.getElementById("percent_btn_1").style.width=t+"%",
C=t):1==H.data.use_new_protocol?(z=H.btn.offsetWidth,D=H.btn.offsetHeight,H.btn.innerHTML.indexOf("继续")>-1?(n=H.btn.innerHTML,
n=n.replace(/继续/g,"暂停")):0==C?n='<span class="btn_progress_inner js_btn_process" id="percent_btn_1" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+z+"px; line-height: "+D+'px">暂停下载</span></span>暂停下载':document.getElementById("percent_btn_1").style.width=t+"%",
C=t):n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">'+t+"%</span>",
console.log(H.btn.innerHTML),!n)return;
H.btn.innerHTML=n,122==H.data.pt||1==H.data.use_new_protocol?w.addClass(H.btn,"btn_progress"):w.addClass(H.btn,"with_processor");
}else if("paused"==a){
var n="";
104==H.data.pt||113==H.data.pt||114==H.data.pt||122==H.data.pt||H.data.use_new_protocol>0?(n=H.btn.innerHTML,
n=n.replace(/暂停/g,"继续"),H.btn.innerHTML=n):(w.removeClass(H.btn,"with_processor"),
w.removeClass(H.btn,"btn_progress"),H.btn.innerHTML=x[a]);
}else w.removeClass(H.btn,"with_processor"),w.removeClass(H.btn,"btn_progress"),
H.btn.innerHTML=x[a],H.data.use_new_protocol>0&&"gotodetail"==a&&(H.btn.innerHTML="进入应用");
}
function s(a){
var t=a.js_app_rating,n=1*H.data.app_rating;
n>5&&(n=5),0>n&&(n=0);
var e=["","one","two","three","four","five"],o="",d=Math.floor(n);
if(o="star_"+e[d],n>d&&(n=d+.5,o+="_half"),t&&n>0){
var s=t.getElementsByClassName("js_stars"),i=t.getElementsByClassName("js_scores");
s&&i&&s[0]&&i[0]&&(s=s[0],i=i[0],s.style.display="inline-block",w.addClass(s,o));
}
}
function i(a){
"undefined"!=typeof v&&v.log&&v.log(a);
}
function l(){
v.on("wxdownload:progress_change",function(a){
a.download_id==H.download_id&&d("downloading",a.progress);
});
}
function r(){
H.download_id&&v.invoke("queryDownloadTask",{
download_id:H.download_id
},function(a){
if(i("queryDownloadTask : "+a.state+"; dowloadid = "+H.download_id),a&&a.state){
if("download_succ"==a.state&&(d("downloaded"),window.clearInterval(H.clock)),"downloading"==a.state)return;
("download_fail"==a.state||"default"==a.state)&&(window.clearInterval(H.clock),window.clearInterval(H.install_clock),
e("下载失败"),d("download"));
}
});
}
function p(){
v.invoke("getInstallState",{
packageName:H.data.pkgname,
download_id:H.download_id
},function(a){
var t=a.err_msg;
t.indexOf("get_install_state:yes")>-1&&(i("getInstallState @app, version : "+t),
window.clearInterval(H.install_clock),d(H.url_scheme?"gotodetail":"installed"));
});
}
function c(){
v.invoke("pauseDownloadTask",{
packageName:H.data.pkgname,
download_id:H.download_id
},function(a){
a.err_msg.indexOf("pause_download_task:ok")>-1&&d("paused");
});
}
function _(){
v.invoke("resumeDownloadTask",{
packageName:H.data.pkgname,
download_id:H.download_id
},function(a){
a.err_msg.indexOf("ok")>-1&&d("downloading");
});
}
function m(){
if(104==H.data.pt||113==H.data.pt||114==H.data.pt||122==H.data.pt||H.data.use_new_protocol>0&&12==H.data.product_type&&H.url_scheme)j.gtVersion("6.5.6",!0)?v.invoke("launchApplication",{
schemeUrl:H.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=H.url_scheme);
}):location.href=H.url_scheme;else{
var t=H.data.url,n=a("biz_common/utils/url/parse.js");
(!t||0!=t.indexOf("http://mp.weixin.qq.com/tp/")&&0!=t.indexOf("https://mp.weixin.qq.com/tp/"))&&(t="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+H.data.app_id+(H.appdetail_params||"")+"&channel_id="+H.channelid+"&md5sum="+H.data.md5sum+"#wechat_redirect"),
H.url_scheme&&(t=n.join(t,{
is_installed:"1"
})),location.href=t;
}
}
function u(a){
if(H.btn=a.btn,!H.btn)return!1;
H.data=a.adData,H.url_scheme=a.url_scheme,H.appdetail_params=a.appdetail_params||"",
H.percentStatus=a.percentStatus;
var t={};
H.channelid=H.data.channel_id||"",H.report_param=a.report_param;
var n=20;
if(("103"==H.data.pt||"104"==H.data.pt)&&s(a),"104"==H.data.pt||"113"==H.data.pt||"114"==H.data.pt||"122"==H.data.pt||H.data.use_new_protocol>0&&12==H.data.product_type){
var u=H.data.androiddownurl;
if(u&&u.match){
var w=/&channelid\=([^&]*)/,g=u.match(w);
g&&g[1]&&(H.channelid=g[1],H.data.androiddownurl=u.replace(w,""));
}
H.channelid&&(H.channelid="&channelid="+H.channelid),a.via&&(H.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
v.ready(function(){
console.log("appcard info",H),("113"==H.data.pt||"114"==H.data.pt||"104"==H.data.pt||"122"==H.data.pt||H.data.use_new_protocol>0&&12==H.data.product_type)&&(v.invoke("getInstallState",{
packageName:T
},function(a){
var t=a.err_msg;
i("getInstallState @yingyongbao : "+t);
var n=t.lastIndexOf("_")+1,e=t.substring(n);
1*e>=O&&t.indexOf("get_install_state:yes")>-1&&(I=!0);
}),v.invoke("getInstallState",{
packageName:H.data.pkgname
},function(a){
var t=a.err_msg;
i("getInstallState @"+H.data.pkgname+" : "+t);
var n=t.lastIndexOf("_")+1,e=t.substring(n);
1*e>=H.data.versioncode&&t.indexOf("get_install_state:yes")>-1&&d(H.url_scheme?"gotodetail":"installed");
})),console.log("bind btn",H.btn.id),f.on(H.btn,"click",function(s){
if(console.log("app click",H),console.log(s.target),"installed"==H.app_status)return d("installed"),
!1;
if("gotodetail"==H.app_status)return o(74),m(),!1;
if("downloading"==H.app_status)return o(71),c(),!1;
if("paused"==H.app_status)return o(72),_(),!1;
if("downloaded"==H.app_status)return o(73),v.invoke("installDownloadTask",{
download_id:H.download_id,
file_md5:H.data.md5sum
},function(a){
var t=a.err_msg;
i("installDownloadTask : "+t),t.indexOf("install_download_task:ok")>-1?H.install_clock=setInterval(p,1e3):e("安装失败！");
}),!1;
var u=function(){
if("103"==H.data.pt||"111"==H.data.pt||"112"==H.data.pt||"121"==H.data.pt||H.data.use_new_protocol>0&&19==H.data.product_type){
o(23);
var t="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(H.data.appinfo_url)+"&ticket="+(H.data.ticket||window.ticket)+"#wechat_redirect";
H.url_scheme&&j.gtVersion("6.5.6",!0)?v.invoke("launchApplication",{
schemeUrl:H.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=t);
}):v.invoke("downloadAppInternal",{
appUrl:H.data.appinfo_url
},function(a){
a.err_msg&&-1!=a.err_msg.indexOf("ok")||(location.href=t);
});
}else{
if(I)return o(16),void(location.href="tmast://download?oplist=1,2&pname="+H.data.pkgname+H.channelid+H.via);
o(15);
var s=[H.data.adid,H.data.traceid,(H.data.pkgname||"").replace(/\./g,"_"),H.data.source,n,a.engine].join("."),c=function(a,t,n){
console.log("addDownloadTask : "+a.data.appname+","+a.data.androiddownurl+","+t+","+a.data.md5sum),
v.invoke("addDownloadTaskStraight",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},function(e){
var o=e.err_msg;
o.indexOf("ok")>-1?n&&n(e):v.invoke("addDownloadTask",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},n);
}),a.url_scheme&&j.isAndroid&&j.gtVersion("6.5.6",!0)&&v.invoke("writeCommData",{
packageName:a.data.pkgname,
data:a.url_scheme
},function(a){
console.log(a);
});
};
console.log("addDownloadTask : "+H.data.appname+","+H.data.androiddownurl+","+s+","+H.data.md5sum),
c(H,s,function(a){
var t=a.err_msg;
i("addDownloadTask : "+t),t.indexOf("ok")>-1?(H.download_id=a.download_id,i("download_id : "+H.download_id),
d("downloading"),H.clock=setInterval(r,1e3),H.install_clock=setInterval(p,1e3),l()):e("调用下载器失败！");
});
}
},f=function(){
return j.isIOS?void u():void y({
app_name:H.data.appname,
app_img_url:H.data.icon_url,
onOk:function(){
u(),o(I?106:100);
},
onCancel:function(){
o(I?107:101);
}
});
};
if("download"==H.app_status&&H.data.rl&&H.data.traceid){
if(!t[H.data.traceid]){
t[H.data.traceid]=!0;
var w,g,h,x,T=!!s&&s.target;
T&&(w=k.getX(T,"js_ad_link")+s.offsetX,g=k.getY(T,"js_ad_link")+s.offsetY,h=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
x=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
b({
type:H.data.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(H.data.androiddownurl),
tid:H.data.traceid,
rl:encodeURIComponent(H.data.rl),
__biz:biz,
pos_type:a.pos_type||0,
pt:H.data.pt,
pos_x:w,
pos_y:g,
ad_w:h||0,
ad_h:x||0
},function(){
t[H.data.traceid]=!1,f();
});
}
}else f();
return!1;
});
});
}
var f=a("biz_common/dom/event.js"),w=a("biz_common/dom/class.js"),g=a("a/a_report.js"),b=g.AdClickReport,k=a("biz_wap/utils/position.js"),h=a("biz_common/utils/report.js"),v=a("biz_wap/jsapi/core.js"),j=a("biz_wap/utils/mmversion.js"),y=a("a/appdialog_confirm.js"),x={
download:"下载",
downloading:"下载中",
paused:"继续",
downloaded:"安装",
gotodetail:"进入",
installed:"已安装"
},I=!1,T="com.tencent.android.qqdownloader",O=1060125,C=0,z=0,D=0,H={
app_status:"download",
btn:null,
download_id:0,
clock:null,
install_clock:null,
data:{},
channelid:"",
via:"",
report_param:"",
appdetail_params:""
};
return u;
});define("a/sponsor.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","a/wxopen_card.js","biz_wap/utils/ajax.js","biz_wap/utils/device.js"],function(e){
"use strict";
function i(e,i){
d("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i.report_param);
}
function o(e,i,o,t){
d("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+i+"&trace_id="+o+"&aid="+t+"&__biz="+window.biz+"&r="+Math.random());
}
function t(){
m({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST",
success:function(){}
});
}
function n(e,o,t){
o.canvas_info?_.invoke("openADCanvas",{
canvasId:o.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:o.pos_type
}),
adInfoXml:o.canvas_info.ad_info_xml
},function(o){
0!=o.ret?(location.href=e,i(135,t)):i(134,t);
}):p.isWp||p.isIOS?_.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(i){
-1==i.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
}
function a(e){
var a=e.adData,d=e.pos_type,s=a.traceid,m=e.a_info.type,v=a.adid,g=a.url,h=e.a_info.rl;
110==a.pt&&(g=g.replace("#","&AdType=80#"));
var b={};
e.report_param=e.report_param||"";
var j=e.adDetailBtn,x=e.adMoreBtn,z=(e.adMessage,e.adAbout),k=e.adComplain,T=e.adImg,W=e.adVideo,I=0,H=document.getElementById("js_sponsor_opt_list"),O={
type:m,
report_type:2,
url:encodeURIComponent(g),
tid:s,
rl:encodeURIComponent(h),
__biz:biz,
pos_type:d,
pt:a.pt,
click_pos:""
},E=null,h=a.rl||"",A="";
if(h){
h=h.split("?"),h=h.length>1?h[1]:"";
var U=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),S=h.match(U);
S&&(A=unescape(S[2]));
}
window.__video_report_data={
aid:a.adid,
traceid:a.traceid,
user_uin:window.user_uin,
publisher_appid:a.publisher_appid||0,
appmsg_id:mid,
item_idx:idx,
viewid:A,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var M=null,P=!0,q=!1;
if(p.isAndroid&&p.gtVersion("6.6.6",!0)&&(q=!0),console.log("data.videoUrl",a),W&&a.videoUrl){
E=new l({
container:W,
cover:a.thumbUrl,
width:W.offsetWidth,
height:W.offsetWidth*parseInt(a.displayHeight)/parseInt(a.displayWidth),
muted:!0,
ad_muted_btn:!0,
always_hide_loading:!0,
src:a.videoUrl,
autoHide:!0,
blockTouchVideo:!0,
onError:function(o){
console.log("播放出错",o),i(123,e),W.parentNode.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+a.thumbUrl+"); height:"+f.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
i(122,e),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,E.play(),t();
},
onTimeupdate:function(e,i){
window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*i.currentTime,
window.__video_report_data.video_duration=1e3*E.__getDuration(),w||(window.__video_report_data.report_type=3,
t(),w=1);
}
}),I=29,E._showPlayer(),E.setSrc(a.videoUrl,"auto");
var C=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,B=document.documentElement.clientHeight||window.innerHeight;
if(p.isAndroid)if(f.offsetTop>C&&f.offsetTop<C+B)window.__video_report_data.auto_play=0;else{
var D=function(){
E.__beginPlayHandler(),r.off(window,"touchstart",D),q=!0;
};
r.on(window,"touchstart",D);
}
var N=function(){
if(3==window.__video_report_data.play_type)return void r.off(window,"scroll",N);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(C=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
B=document.documentElement.clientHeight||window.innerHeight,E.isPlay()&&(f.offsetTop>C+B||f.offsetTop+f.offsetHeight<C))E.pause();else if(!E.isPlay()&&y.canSupportAutoPlay&&!(f.offsetTop>C+B||f.offsetTop+f.offsetHeight<C)){
if(p.isAndroid&&!q)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(i(121,e),
p.isIOS&&E.triggerMuted(!0),E.__beginPlayHandler()):E.play();
}
};
r.on(window,"scroll",N),N(),M=function(){
window.setTimeout(function(){
E.triggerMuted(!0);
},1e3);
};
}
r.on(window,"touchend",function(e){
console.log(e.target),e.target==z||e.target==j||e.target==k||e.target.className.indexOf("js_opt_item")>=0||(z.style.display="none",
k.style.display="none",H.style.display="none");
}),r.on(document.getElementById("js_ad_inner"),"click",function(o){
if(o.target.className.indexOf("js_muted_btn")>-1)"true"==E.video.getAttribute("muted")?(E.triggerMuted(!1),
P=!1):(E.triggerMuted(!0),P=!0),i(124,e);else{
if(E&&(!E.isPlay()||0==window.__video_report_data.play_type))return E.__beginPlayHandler(),
P||E.triggerMuted(!1),i(121,e),void(window.__video_report_data.play_type=2);
"js_main_img"==o.target.id||o.target.className.indexOf("video_mask")>-1?b[s+"_1"]||(b[s+"_1"]=!0,
O.click_pos=1,u(O,function(){
i(87+I,e),b[s+"_1"]=!1,!!M&&M(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
})):b[s+"_2"]||(b[s+"_2"]=!0,O.click_pos=2,u(O,function(){
i(88+I,e),b[s+"_2"]=!1,!!M&&M(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
}));
}
return!1;
}),r.on(x,"click",function(){
return b[s+"_3"]||(b[s+"_3"]=!0,O.click_pos=3,u(O,function(){
i(89+I,e),b[s+"_3"]=!1,!!M&&M(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
})),!1;
}),r.on(j,"click",function(){
return i(90+I,e),o(0,d,e.a_info.traceid,e.a_info.aid),"none"==window.getComputedStyle(z).display?(z.style.display="initial",
H.style.display="initial",parseInt(window.can_see_complaint)&&(k.style.display="initial")):(z.style.display="none",
k.style.display="none",H.style.display="none"),!1;
}),r.on(z,"click",function(){
i(91+I,e);
var o="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid="+v+"&tid="+s+"#wechat_redirect";
return!!M&&M(),p.isWp||p.isIOS||p.isAndroid?_.invoke("openUrlWithExtraWebview",{
url:o,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=o);
}):location.href=o,!1;
}),r.on(k,"click",function(){
var i="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+e.a_info.aid+"&traceid="+e.a_info.traceid+"&source="+d+"&biz="+window.biz;
return!!M&&M(),o(1,d,e.a_info.traceid,e.a_info.aid),p.isWp||p.isIOS||p.isAndroid?_.invoke("openUrlWithExtraWebview",{
url:i,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=i);
}):location.href=i,!1;
}),r.on(window,"resize",function(){
setTimeout(function(){
var i=f.clientWidth;
if(T&&2!=e.a_info.use_new_protocol)T.style.height=i/1.77+"px",console.log("do not change height");else{
var o=W.offsetWidth,t=W.offsetWidth*parseInt(a.displayHeight)/parseInt(a.displayWidth);
E.setHeight(t),E.setWidth(o),f.style.width=o,f.style.height=t;
}
},0);
});
}
var r=e("biz_common/dom/event.js"),d=e("biz_common/utils/report.js"),_=e("biz_wap/jsapi/core.js"),p=e("biz_wap/utils/mmversion.js"),s=e("a/a_report.js"),l=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),c=e("a/wxopen_card.js"),u=s.AdClickReport,f=(e("biz_common/utils/url/parse.js"),
document.getElementById("js_sponsor_ad_area")),m=e("biz_wap/utils/ajax.js"),w=!1,y=e("biz_wap/utils/device.js");
return a;
});define("a/mpshop.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js"],function(t){
"use strict";
function e(t,e){
s("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+e.report_param);
}
function o(t){
var o=t.adData,s=t.pos_type||0,a=o.tid,_=o.type,l=(o.adid,o.outer_id),m=o.url,c=o.rl,d={};
t.report_param=t.report_param||"";
var j=t.btn;
if(j){
i.on(j,"click",function(o){
if(!d[a]){
d[a]=!0;
var i,j,u,b,f=!!o&&o.target;
f&&(i=r.getX(f,"js_ad_link")+o.offsetX,j=r.getY(f,"js_ad_link")+o.offsetY,u=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
n({
type:_,
report_type:2,
click_pos:0,
url:encodeURIComponent(m),
tid:a,
rl:encodeURIComponent(c),
__biz:biz,
pos_type:s,
pt:106,
pos_x:i,
pos_y:j,
ad_w:u||0,
ad_h:b||0
},function(){
d[a]=!1,e(61,t),location.href=p.join(m,{
outer_id:l
});
});
}
return!1;
});
}
}
var i=t("biz_common/dom/event.js"),s=t("biz_common/utils/report.js"),a=t("a/a_report.js"),n=a.AdClickReport,r=(t("biz_wap/utils/ajax.js"),
t("biz_wap/utils/position.js")),p=(t("biz_wap/jsapi/core.js"),t("biz_common/utils/url/parse.js"));
return o;
});define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function i(e,i){
c("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function t(e){
var t=e.url||"";
t=t.replace(/&amp;/g,"&");
var n=t.indexOf("?"),c=0;
(119==e.pt||120==e.pt)&&(c=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
t.indexOf("?")>=0?t=t.slice(0,n)+".html"+t.slice(n):t+=".html";
var u="",_="";
if(document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(u=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
"undefined"==typeof l){
var l;
l=window.cgiData&&window.cgiData.__biz?window.cgiData.__biz:window.parent.biz;
}
_=e.traceid+":"+u+":"+l+":"+e.aid+":"+e.pos_type,console.log("sceneNote",_);
var g={
scene:1067,
sceneNote:_,
userName:e.weapp_info.original_id+"@app",
relativeURL:t,
appVersion:1
},w=!1,f=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(f){
var v=Number(f[1]),b=Number(f[2]),j=Number(f[3]);
v>6?w=!0:6===v&&b>5?w=!0:6===v&&5===b&&j>=3&&(w=!0);
}
return console.log("canJumpOnTap : ",w,e.weapp_info.original_id,navigator.userAgent),
w?(d.setSum(110696,0,1),o?d.setSum(110696,3,1):(o=!0,a=+new Date),r?+new Date-r<2e3&&(d.setSum(110696,4,1),
setTimeout(function(){
r=0;
},2e3)):r=+new Date,p?+new Date-p<3e3&&(d.setSum(110696,5,1),setTimeout(function(){
p=0;
},3e3)):p=+new Date,s?+new Date-s<4e3&&(d.setSum(110696,6,1),setTimeout(function(){
s=0;
},4e3)):s=+new Date,void m.invoke("openWeApp",g,function(t){
var n=+new Date-a;
"openWeApp:ok"===t.err_msg&&i(125+c,e.report_param),"system:function_not_exist"===t.err_msg&&(location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect",
i(126+c,e.report_param)),d.setAvg(110696,2,n).send(),o=!1;
})):(location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect",
void i(126+c,e.report_param));
}
function n(e){
m.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(e){
console.log(e);
}),m.invoke("preloadMiniProgramEnv",{
userNames:[e.weapp_info.original_id+"@app"]
},function(e){
console.log(e);
});
}
var o,a,r,p,s,m=e("biz_wap/jsapi/core.js"),c=e("biz_common/utils/report.js"),d=(e("biz_wap/utils/mmversion.js"),
e("biz_common/utils/monitor.js"));
return{
openWxopen:t,
startConnect:n
};
});define("appmsg/comment.js",["biz_common/dom/class.js","appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","appmsg/comment_report.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/comment_tpl.html.js","appmsg/friend_comment_tpl.html.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js"],function(e,t,n,o){
"use strict";
function m(e,t){
e&&(e.style.display=t?t:"block");
}
function i(e){
e&&(e.style.display="none");
}
function c(){
setTimeout(function(){
m(W.toast);
},750),setTimeout(function(){
i(W.toast);
},1500);
}
function d(e){
return e.replace(/^\s+|\s+$/g,"");
}
function a(e,t){
if(!(Math.random()<.999)){
var n=window.location.protocol,o=9;
"https:"==n&&(o=18),M.saveSpeeds({
uin:uin,
pid:o,
speeds:[{
sid:29,
time:e
},{
sid:30,
time:t
}]
}),M.send();
}
}
function l(e,t){
if("undefined"!=typeof e){
var n=new Image;
n.src=F.idkey?"//mp.weixin.qq.com/mp/jsmonitor?idkey="+(F.idkey+"_"+e+"_1")+"&t="+Math.random():"http://mp.weixin.qq.com/mp/jsreport?key="+e+"&content="+(t||"")+"&r="+Math.random();
}
}
function s(){
var e=window.innerHeight||document.documentElement.clientHeight,t=window.pageYOffset||document.documentElement.scrollTop,n=document.documentElement.scrollHeight;
if(t+e+100>n&&R.off(window,"scroll",s),!(Z||-1==Q||Q>0&&n-t-e>500)){
if("number"==typeof window.comment_count&&0==window.comment_count)return void r({
enabled:1,
elected_comment:[],
friend_comment:[],
elected_comment_total_cnt:0,
my_comment:[],
only_fans_can_comment:window.only_fans_can_comment,
is_fans:window._is_fans,
logo_url:window._logo_url,
nick_name:window._nick_name
});
var o=+new Date;
Z=!0,i(W.tips),m(W.loading);
var c="/mp/appmsg_comment?action=getcomment&scene="+F.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+H+"&offset="+Q+"&limit="+X+(window.send_time?"&send_time="+send_time:"");
try{
nt++,nt>1&&l(F.moreList,encodeURIComponent(c)),tt.indexOf(c)>-1&&l(F.repeatList,encodeURIComponent(c)),
tt.push(c);
}catch(d){}
!!O&&console.log("[Appmsg comment] start get comment data:"+c),U("[Appmsg comment] start get comment data, url:"+c),
A({
url:c,
type:"get",
success:function(e){
var t=+new Date,n=t-o,m={};
try{
m=window.eval.call(window,"("+e+")");
}catch(i){}
window.test_comment_data&&(m=window.test_comment_data);
var d=m.base_resp&&m.base_resp.ret;
if(0==d){
r(m);
var s=+new Date-t;
a(n,s);
}else l(F.errList,"type:resperr;url:"+encodeURIComponent(c)+";ret="+d);
U("[Appmsg comment] get comment success, text: "+e);
},
error:function(){
l(F.errList,"type:ajaxerr;url:"+encodeURIComponent(c)),U("[Appmsg comment] get comment ajax error");
},
complete:function(){
Z=!1,i(W.loading),R.off(window,"scroll",k);
}
});
}
}
function r(e){
var t,n,o=document.createDocumentFragment(),c=document.createDocumentFragment();
ot++,ot>1&&l(F.handleList,encodeURIComponent(JSON.stringify({
comment_id:H,
offset:Q,
url:location.href
}))),"undefined"!=typeof e.only_fans_can_comment?window.can_fans_comment_only=e.only_fans_can_comment:"undefined"==typeof window.can_fans_comment_only&&(window.can_fans_comment_only=0),
1!=e.enabled?(T&&(T.style.display="none"),z&&i(z),e.elected_comment=[],e.friend_comment=[],
e.elected_comment_total_cnt=0,e.friend_comment_total_cnt=0):(T&&(T.style.display="block"),
z&&m(z)),0==Q?($=e.logo_url,G=e.nick_name,t=e.elected_comment,t&&t.length?(g(t,o,"elected"),
W.list.appendChild(o),m(W.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?m(document.getElementById("js_cmt_addbtn1")):m(document.getElementById("js_cmt_nofans1"),"block"),
e.elected_comment_total_cnt<=10&&(m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa")))):(i(W.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?m(document.getElementById("js_cmt_addbtn2")):m(document.getElementById("js_cmt_nofans2"),"block")),
n=e.friend_comment,g(n,c,"friend"),n&&0==n.length&&(console.log("friend_cmt_area hide"),
i(z)),W.fdlist.appendChild(c),n&&n.length?(m(W.fdmain),(0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans)&&(i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),m(document.getElementById("js_cmt_addbtn3")))):i(W.fdmain),
e.friend_comment.length>0||e.elected_comment.length>0,function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}
}()):(t=e.elected_comment,t&&t.length&&(g(t,o,"elected"),W.list.appendChild(o))),
0==e.elected_comment_total_cnt?(Q=-1,i(document.getElementById("js_cmt_loading")),
i(document.getElementById("js_cmt_statement")),i(document.getElementById("js_cmt_qa"))):Q+X>=e.elected_comment_total_cnt?(Q=-1,
i(document.getElementById("js_cmt_loading")),m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa"))):Q+=e.elected_comment.length;
}
function _(){
J.log("tag1");
var e=d(W.input.value);
if(J.log("tag2"),!D.hasClass(W.submit,"btn_disabled")){
if(J.log("tag3"),e.length<1)return y("Comment cannot be empty");
if(J.log("tag4"),e.length>600)return y("Up to 600 characters");
J.log("tag5"),D.addClass(W.submit,"btn_disabled"),J.log("tag6");
var t=document.getElementById("activity-name");
J.log("tag7"),mt!=e&&(it=+new Date);
var n=function(t){
{
var n=document.createDocumentFragment();
document.createDocumentFragment();
}
c(),console.log("------------------------",window.friend_comment_enabled),g([{
content:e,
nick_name:G,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:$,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:t.my_id,
content_id:t.content_id
}],n,"mine"),W.mylist.insertBefore(n,W.mylist.firstChild);
m(W.mylist.parentNode),W.input.value="",v();
};
if(window.test_comment_data)return void n({
my_id:"111"
});
var o="/mp/appmsg_comment?action=addcomment&scene="+F.scene+"&comment_id="+H+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
A({
url:o,
data:{
content:e,
title:t&&d(t.innerText),
head_img:$,
nickname:G,
client_id:it
},
type:"POST",
success:function(t){
J.log("tag8"),P.hidePannel();
var m={};
try{
m=window.eval.call(window,"("+t+")");
}catch(i){}
switch(+m.ret){
case 0:
n(m);
break;

case-6:
y("Too many comments. Try again later.");
break;

case-7:
y("You cannot write a comment as you didn't follow this Official Account");
break;

case-10:
y("Up to 600 characters");
break;

case-15:
y("Comment unavailable");
break;

default:
mt=e,y("系统错误，请重试");
}
0!=m.ret&&l(F.addCommentErr,"type:resperr;url:"+encodeURIComponent(o)+";ret="+m.ret);
},
error:function(e){
J.log("shit;"+e.status+";"+e.statusText),l(F.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(o));
},
complete:function(){
""!=W.input.value&&D.removeClass(W.submit,"btn_disabled");
}
});
}
}
function p(){
if(0==K){
var e="/mp/appmsg_comment?action=getmycomment&scene="+F.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+H,t=document.getElementById("js_mycmt_loading");
K=1,m(t),A({
url:e,
type:"get",
success:function(t){
var n={};
try{
n=window.eval.call(window,"("+t+")");
}catch(o){}
var i=n.base_resp&&n.base_resp.ret;
if(0==i){
var c=n.my_comment,d=document.createDocumentFragment();
c&&c.length&&(g(c,d,"mine"),W.mylist.appendChild(d),m(W.mylist.parentNode)),K=2;
}else K=0,l(F.errComment,"type:resperr;url:"+encodeURIComponent(e)+";ret="+i);
},
error:function(){
K=0,l(F.errComment,"type:ajaxerr;url:"+encodeURIComponent(e));
},
complete:function(){
i(t);
}
});
}
}
function u(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,m=n/1e3-e,i=new Date(n).getFullYear(),c=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+" minute(s) ago":86400>m?Math.floor(o/60/60)+" hour(s) ago":172800>m?"Yesterday":604800>m?Math.floor(m/24/60/60)+" day(s) ago":c.getFullYear()==i?c.getMonth()+1+"-"+c.getDate():c.getFullYear()+"-"+(c.getMonth()+1)+"-"+c.getDate();
}
function g(e,t,n){
var o,m="",i=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",d="";
"elected"==n?d=0:"friend"==n&&(d=1),et={};
for(var a,s=0;a=e[s];++s){
a.time=u(a.create_time),a.status="",a.logo_url=a.logo_url||c,a.logo_url=-1!=a.logo_url.indexOf("wx.qlogo.cn")?a.logo_url.replace(/\/132$/,"/96"):a.logo_url,
a.content=a.content.htmlDecodeLite().htmlEncodeLite(),a.nick_name=a.nick_name.htmlDecodeLite().htmlEncodeLite(),
a.like_num_format=parseInt(a.like_num)>=1e4?(a.like_num/1e4).toFixed(1)+"万":a.like_num,
a.is_from_friend="friend"==n?0:a.is_from_friend||0,a.is_from_me="mine"==n?1:a.is_from_me||0,
a.reply=a.reply||{
reply_list:[]
},a.is_mine=n?!1:!0,a.is_elected="elected"==n||"friend"==n?1:a.is_elected,a.is_top="friend"==n?0:a.is_top,
a.report_elected=a.is_elected||0,a.report_friend=a.is_from_friend||0,a.scene=d,a.reply.reply_list.length>0&&(a.reply.reply_list[0].time=u(a.reply.reply_list[0].create_time),
a.reply.reply_list[0].content=(a.reply.reply_list[0].content||"").htmlEncodeLite(),
a.reply.reply_list[0].reply_like_status=a.reply.reply_list[0].reply_like_status||0,
a.reply.reply_list[0].reply_like_num=a.reply.reply_list[0].reply_like_num||0,a.reply.reply_list[0].reply_like_num_format=parseInt(a.reply.reply_list[0].reply_like_num)>=1e4?(a.reply.reply_list[0].reply_like_num/1e4).toFixed(1)+"万":a.reply.reply_list[0].reply_like_num),
a.new_appmsg=window.new_appmsg,m+=S.tmpl(x,a);
try{
var r=a.nick_name+a.content,_=!1,p=F.repeatContentID;
et[r]&&(_=!0,p=F.repeatContent),V.indexOf(a.content_id)>-1&&(_=!0,p=F.repeatContentID),
V.push(a.content_id),et[r]=!0,_&&l(p,encodeURIComponent(JSON.stringify({
comment_id:H,
content_id:a.content_id,
offset:Q,
length:e.length,
url:location.href
})));
}catch(g){}
}
for(i.innerHTML=m,f(i);o=i.children.item(0);)t.appendChild(o);
}
function f(e){
J.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=P.encode(e.innerHTML);
});
}
function y(e){
return setTimeout(function(){
o(e);
});
}
function w(){
var e="1"===L.getParam("js_my_comment");
e&&h(!0);
}
function h(e){
Y=window.pageYOffset||document.documentElement.scrollTop,console.log(Y),i(W.article),
m(W.mine),window.scrollTo(0,0),p(),e||J.later(function(){
W.input.focus();
});
}
function j(){
i(W.mine),m(W.article),console.log(Y),window.scrollTo(0,Y),W.input.blur();
}
function b(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(D.hasClass(t,"js_comment_praise")&&(n=t),n){
for(var o=parseInt(n.dataset.status),m=0==o?1:0,i=n.dataset.contentId,c=n.dataset.scene,d=document.querySelectorAll('.js_comment_praise[data-content-id="'+i+'"]'),a=0;a<d.length;a++)E(d[a]);
if(window.test_comment_data)return;
A({
url:"/mp/appmsg_comment?action=likecomment",
type:"POST",
data:{
like:m,
__biz:biz,
appmsgid:appmsgid,
comment_id:H,
content_id:i,
item_show_type:window.item_show_type||0,
scene:c
}
});
}
}
function I(e){
for(var t=e.delegatedTarget,n=parseInt(t.dataset.status),o=n?0:1,m=t.dataset.contentId,i=t.dataset.replyId,c=t.dataset.scene,d=document.querySelectorAll('.js_reply_praise[data-content-id="'+m+'"]'),a=0;a<d.length;a++)E(d[a]);
document.querySelector("meta[name=viewport]"),window.test_comment_data||A({
url:"/mp/appmsg_comment?action=like_author_reply",
type:"post",
data:{
comment_id:H,
content_id:m,
reply_id:i,
like:o,
scene:c,
item_show_type:window.item_show_type||0
}
});
}
function E(e){
var t=D.hasClass(e,"praised"),n=e.querySelector(".praise_num"),o=n.innerHTML,m=o.indexOf("万"),i=parseInt(o)?parseInt(o):0;
t?(-1==m&&(n.innerHTML=i-1>0?i-1:""),D.removeClass(e,"praised"),e.dataset.status=0):(-1==m&&(n.innerHTML=i+1),
D.addClass(e,"praised"),e.dataset.status=1);
}
function v(){
W.list.children.length?W.fdlist.children.length?(m(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn1")),i(document.getElementById("js_cmt_addbtn2")),
i(document.getElementById("js_cmt_addbtn4"))):(m(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),i(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn4"))):W.fdlist.children.length?(m(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn4")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2"))):(m(document.getElementById("js_cmt_addbtn2")),
i(document.getElementById("js_cmt_addbtn3")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn4")));
}
function B(e){
var t=e.delegatedTarget,n=t.getAttribute("data-my-id"),m="/mp/appmsg_comment?action=delete&scene="+F.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+H+"&my_id="+n;
confirm("确定删除吗？")&&A({
url:m,
success:function(e){
var m,c=t;
try{
e=JSON.parse(e);
}catch(d){
e={};
}
if(0==e.ret){
for(;c&&(c.nodeType!=c.ELEMENT_NODE||"li"!=c.tagName.toLowerCase());)c=c.parentNode;
if(c){
c.parentNode.removeChild(c),m=document.getElementById("cid"+n);
for(var a=document.querySelectorAll(".cid"+n),l=0;l<a.length;l++)a[l].parentNode.removeChild(a[l]);
0==W.list.children.length?(i(W.main),i(document.getElementById("js_cmt_statement")),
i(document.getElementById("js_cmt_qa")),0==W.fdlist.children.length&&i(W.fdmain)):0==W.fdlist.children.length&&i(W.fdmain),
0==W.mylist.children.length&&i(W.mylist.parentNode),W.list.children.length+W.fdlist.children.length==0,
v();
}
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
});
}
function k(){
try{
var e=W.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<window.innerHeight&&Z&&t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_45_1&lc=1&log0",
R.off(window,"scroll",k));
}catch(n){}
}
function C(e){
var t=document.createElement("a");
t.setAttribute("href",e),this.el=t,this.parser=this.el,this.getParam=function(e){
var t=new RegExp("([?&])"+e+"=([^&#]*)([&#])?"),n=this.el.search.match(t);
return n?n[2]:null;
};
}
var D=e("biz_common/dom/class.js"),x=e("appmsg/cmt_tpl.html.js"),T=document.getElementById("js_cmt_area"),z=document.getElementById("js_friend_cmt_area"),L=new C(window.location.href),M=e("biz_common/utils/wxgspeedsdk.js"),q=e("appmsg/comment_report.js"),O=location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,H=0;
if(window._has_comment=!0,"undefined"!=typeof window.comment_id?H=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(H=window.cgiData.comment_id),
!!O&&console.log("comment_id:"+H+";uin:"+uin+";key:"+key),-1!=navigator.userAgent.indexOf("MicroMessenger")||window.test_comment_data||(T&&(T.style.display="none"),
z&&(z.style.display="none"),H=0,window._has_comment=!1),0==H||!uin||!key)return void(window._has_comment=!1);
var R=e("biz_common/dom/event.js"),A=e("biz_wap/utils/ajax.js"),S=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),N=e("biz_wap/utils/fakehash.js"),U=e("appmsg/log.js"),F={
scene:0,
idkey:"",
moreList:27,
repeatList:25,
errList:18,
handleList:26,
addCommentErr:19,
errComment:18,
repeatContent:24,
repeatContentID:23
},Y=null;
window.__commentReportData&&window.__commentReportData.idkey&&(!!O&&console.log("init reportData"),
F=window.__commentReportData),function(){
if(T){
var t=e("appmsg/comment_tpl.html.js");
T.innerHTML=S.tmpl(t,{
new_appmsg:window.new_appmsg
});
}
if(z){
var n=e("appmsg/friend_comment_tpl.html.js");
z.innerHTML=S.tmpl(n,{
new_appmsg:window.new_appmsg
});
}
}(),function(){
var t=e("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n.innerHTML=S.tmpl(t,{
new_appmsg:window.new_appmsg,
friend_comment_enabled:window.friend_comment_enabled
}),document.body.appendChild(n);
}();
var P=e("appmsg/emotion/emotion.js"),J=e("appmsg/emotion/dom.js"),Q=(new Image,0),X=100,Z=!1,$="",G="我",K=0,W={
article:document.getElementById("js_article"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById("js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading"),
fdmain:document.getElementById("js_friend_cmt_main"),
fdlist:document.getElementById("js_friend_cmt_list"),
fdlisthide:document.getElementById("js_friend_cmt_list_hide"),
morefdlist:document.getElementById("js_more_friend_cmt_area"),
morefd:document.getElementById("js_more_friend_cmt")
},V=[],et={},tt=(new Image,[]),nt=0,ot=0,mt=null,it=+new Date;
!function(){
s(),w(),P.init();
}(),N.on("comment",function(){
!!O&&console.log("FakeHash on comment"),h();
}),N.on("article",function(){
!!O&&console.log("FakeHash on article"),j();
}),N.on(function(e){
"comment"==e&&j();
}),R.on(W.input,"input",function(){
var e=d(W.input.value);
e.length<1?D.addClass(W.submit,"btn_disabled"):D.removeClass(W.submit,"btn_disabled");
}),R.on(W.list,"tap",".js_comment_praise",b),R.on(W.mylist,"tap",".js_comment_praise",b),
R.on(W.fdlist,"tap",".js_comment_praise",b),R.on(W.list,"tap",".js_reply_praise",I),
R.on(W.fdlist,"tap",".js_reply_praise",I),R.on(W.list,"tap",".js_del",B),R.on(W.mylist,"tap",".js_del",B),
R.on(W.fdlist,"tap",".js_del",B),R.on(W.list,"tap",".js_del",function(e){
e.preventDefault();
}),R.on(W.mylist,"tap",".js_del",function(e){
e.preventDefault();
}),R.on(W.fdlist,"tap",".js_del",function(e){
e.preventDefault();
}),R.on(W.submit,"tap",_),R.on(W.submit,"click",function(e){
e.preventDefault();
}),R.on(window,"scroll",s),R.on(window,"scroll",k),R.on(document.getElementById("js_cmt_write1"),"click",function(e){
e.preventDefault(),!!O&&console.log("push comment"),N.push("comment");
}),R.on(document.getElementById("js_cmt_write2"),"click",function(e){
e.preventDefault(),!!O&&console.log("push comment"),N.push("comment");
}),R.on(document.getElementById("js_cmt_write3"),"click",function(e){
e.preventDefault(),!!O&&console.log("push comment"),N.push("comment");
}),R.on(document.getElementById("js_cmt_write4"),"click",function(e){
e.preventDefault(),!!O&&console.log("push comment"),N.push("comment");
}),new q({
comment_id:H,
appmsgid:appmsgid,
idx:idx,
item_show_type:window.item_show_type||0,
biz:biz
});
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n  <div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n    <div class="discuss_container editing access">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="Official Account has opted for comments to be displayed publicly"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="Official Account has opted for comments to be displayed publicly"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">My Comment</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="Official Account has opted for comments to be displayed publicly"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="Official Account has opted for comments to be displayed publicly"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">My Comment</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">Loading</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">Comment Submitted</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n';
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+r.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function n(){
return-1!=a.indexOf("&_newvideoplayer=0")?!1:-1!=a.indexOf("&_newvideoplayer=1")?!0:1!=r.is_login?!1:r.use_tx_video_player?!1:w.canSupportVideo&&h.inWechat?h.is_ios||h.is_android?!0:!1:(r._hasReportCanSupportVideo||w.canSupportVideo||!h.inWechat||(r._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function o(){
console.log("isUseAd: "+_.isInMiniProgram);
{
var e=a,i=window.location.href;
r.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=r.sn&&"f62e1cb98630008303667f77c17c43d7"!=r.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=r.sn?_.isInMiniProgram?!1:-1!=e.indexOf("&_videoad=1")?!0:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:"54"==r.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:r.__appmsgCgiData&&r.__appmsgCgiData.can_use_page&&(h.is_ios||h.is_android)?!0:c.showAd()?!0:!1:!1;
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
var r,a,d=e("biz_common/dom/event.js"),p=e("biz_wap/jsapi/core.js"),w=e("biz_wap/utils/device.js"),c=e("new_video/ctl.js"),_=e("biz_wap/utils/mmversion.js"),f=window.navigator.userAgent,u={
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
u.networkType=e[i.err_msg]||"fail","network_type:edge"==i.err_msg&&i.detailtype&&"4g"==i.detailtype&&(networkType="4g");
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
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_wap/utils/device.js","a/a_sign.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","a/tpl/crt_tpl_manager.js","appmsg/cdn_img_lib.js","a/tpl/cpc_tpl.html.js","a/sponsor.js","a/app_card.js","a/profile.js","a/android.js","a/ios.js","a/video.js"],function(require,exports,module,alert){
"use strict";
function _GetQuery(e){
for(var a=window.location.search,t=a.substring(1,a.length).split("&"),i=0;i<t.length;i++){
var n=t[i].split("=");
if(n[0].toUpperCase()===e.toUpperCase())return n[1];
}
return"";
}
function report(e,a){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+a);
}
function adOptReport(e,a,t,i){
Report("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+a+"&trace_id="+t+"&aid="+i+"&__biz="+window.biz+"&r="+Math.random());
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
function t(e){
var a=e;
if(6==a.dest_type&&(a.is_wx_app=!0),12==e.product_type||19==e.product_type){
var t=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",o=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",p=a.app_info.apk_name||a.app_info.pkg_name||"";
t=formSize(t),i=formName(i),a.app_info.app_size=t,a.app_info.app_name=i,a.app_info.apk_name=p,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=p,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
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
pkgname:p,
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
file_md5:o
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
function i(e){
if(12==e.product_type||19==e.product_type){
var a=e,t=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",o=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",p=a.app_info.apk_name||a.app_info.pkg_name||"";
t=formSize(t),i=formName(i),a.app_info.app_size=t,a.app_info.app_name=i,a.app_info.apk_name=p,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=p,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
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
pkgname:p,
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
file_md5:o
},a);
return console.log(_),_;
}
return e;
}
function n(e){
return e;
}
var o={},p=e.is_need_ad,_=e._adInfo;
if(0==p)o=_,o||(o={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var r=a.advertisement_info;
o.advertisement_info=saveCopy(r);
}
o.advertisement_num=a.advertisement_num;
}
1==p&&(window._adRenderData=o),o=o||{
advertisement_num:0
};
var d=!1;
if(!o.flag&&o.advertisement_num>0){
var s=o.advertisement_num,c=o.advertisement_info;
window.adDatas.num=s;
for(var l=0;s>l;++l){
var m,u=null,f=c[l];
f.exp_info=f.exp_info||{},f.is_cpm=f.is_cpm||0,f.biz_info=f.biz_info||{},f.app_info=f.app_info||{},
f.pos_type=f.pos_type||0,f.logo=f.logo||"",f.use_new_protocol=f.use_new_protocol||0;
var g=f.pt,y=f.pos_type,v=f.product_type;
if(m=f.use_new_protocol)1==m?4===y?(d=!0,f=t(f),u=f):0===y?(f=i(f),(12===v||19===v)&&(u=f)):3===y&&(f=n(f),
u=f):2==m&&4===y&&(d=!0,f=t(f),u=f);else if(100===g||115===g){
for(var h=f.exp_info.exp_value||[],w=!1,b=0,j=0;j<h.length;++j){
var x=h[j]||{};
if(1==x.exp_type&&(b=x.comm_attention_num,w=b>0),2==x.exp_type){
w=!1,b=0;
break;
}
}
f.biz_info.show_comm_attention_num=w,f.biz_info.comm_attention_num=b,u={
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
var k=f.app_info.down_count||0,I=f.app_info.app_size||0,S=f.app_info.app_name||"",z=f.app_info.category,D=["万","百万","亿"];
if(k>=1e4){
k/=1e4;
for(var E=0;k>=10&&2>E;)k/=100,E++;
k=k.toFixed(1)+D[E]+"次";
}else k=k.toFixed(1)+"次";
I=formSize(I),z=z?z[0]||"其他":"其他",S=formName(S),f.app_info._down_count=k,f.app_info._app_size=I,
f.app_info._category=z,f.app_info.app_name=S,u={
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
var q=f.card_info.card_id||"",C=f.card_info.card_ext||"";
C=C.htmlDecode();
try{
C=JSON.parse(C),C.outer_str=f.card_info.card_outer_id||"",C=JSON.stringify(C);
}catch(O){
C="{}";
}
u={
card_id:q,
card_ext:C,
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
var B=f.mp_shop_info.pid||"",A=f.mp_shop_info.outer_id||"";
u={
pid:B,
outer_id:A,
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
var I=f.app_info.app_size||0,S=f.app_info.app_name||"";
I=formSize(I),S=formName(S),f.app_info.app_size=I,f.app_info.app_name=S,u={
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
var T=f.image_url;
if(require("appmsg/cdn_img_lib.js"),T&&T.isCDN()&&(T=T.replace(/\/0$/,"/640"),T=T.replace(/\/0\?/,"/640?"),
f.image_url=ParseJs.addParam(T,"wxfrom","50",!0)),adDatas.ads["pos_"+y]={
a_info:f,
adData:u
},localStorage&&localStorage.setItem&&f.app_info&&f.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+f.traceid,f.app_info.url_scheme),
f.has_installed=!1,m){
if(12===v||19===v){
var M=f.pos_type;
!function(e,a){
JSAPI.invoke("getInstallState",{
packageName:a.app_info.apk_name
},function(t){
var i=t.err_msg;
i.indexOf("get_install_state:yes")>-1&&(a.has_installed=!0,console.log("change btn","js_ad_btn_"+e),
document.getElementById("js_ad_btn_"+e)&&(document.getElementById("js_ad_btn_"+e).innerHTML="进入应用"),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
}(M,f);
}
}else f&&(104===g||113===g||114===g||2===g||122===g)&&f.app_info.url_scheme&&JSAPI.invoke("getInstallState",{
packageName:f.app_info.apk_name
},function(e){
var a=e.err_msg;
a.indexOf("get_install_state:yes")>-1&&(f.has_installed=!0,document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
0===y&&9===f.material_type&&(46===v&&6===f.dest_type&&f.game_info&&(f.biz_info.head_img=f.game_info.head_img,
f.biz_info.nick_name=f.game_info.nick_name),19!==v&&12!==v||!f.app_info||(f.biz_info.head_img=f.app_info.icon_url,
f.biz_info.nick_name=f.app_info.app_name));
}
var N=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
js_sponsor_ad_area.offsetTop<e+a&&(Class.addClass(document.getElementById("js_ad_area"),"show"),
DomEvent.off(window,"scroll",N));
},R=adDatas.ads;
for(var U in R)if(0==U.indexOf("pos_")){
var u=R[U],f=!!u&&u.a_info;
if(u&&f){
if(2!=m){
if(0==f.pos_type){
if(f.new_appmsg=window.new_appmsg,js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,f),
111==f.pt||112==f.pt||113==f.pt||114==f.pt){
var H=document.getElementsByClassName("js_download_app_card")[0],P=H.offsetWidth,K=Math.floor(P/2.875);
K>0&&(H.style.height=K+"px");
}
}else if(3==f.pos_type){
var H=document.createElement("div");
H.appendChild(document.createTextNode(f.image_url)),f.image_url=H.innerHTML.replace(/&amp;/g,"&"),
f.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,f),
js_sponsor_ad_area.style.display="block";
var L=js_sponsor_ad_area.clientWidth;
108!=f.pt&&109!=f.pt&&110!=f.pt||2==f.use_new_protocol?116==f.pt||117==f.pt:document.getElementById("js_main_img").style.height=L/1.77+"px",
DomEvent.on(window,"scroll",N),N(0);
}else if(4==f.pos_type&&_checkShowCpc()){
f=_parseExpCpc(f);
var W=!1;
if(console.info("[APPMSG AD DEBUG] cpc render data: ",f),12==f.product_type||19==f.product_type)js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,f),
W=!0;else{
var J=require("a/tpl/cpc_tpl.html.js"),G=f.exp_obj.sale_text;
(23==f.product_type||12==f.product_type||19==f.product_type||46==f.product_type)&&(G=f.avatarTitle),
js_cpc_area.innerHTML=TMPL.tmpl(J,{
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
title:G,
is_wx_app:f.is_wx_app,
btn_text:f.exp_obj.btn_text,
avatar:f.avatar,
isDownload:W
});
}
}
console.log("check ios",mmversion.isIOS,f.app_info),mmversion.isIOS&&f.app_info&&f.app_info.url_scheme&&(console.log("check ios end",document.getElementById("js_promotion_tag")),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+f.pos_type)&&(document.getElementById("js_ad_btn_"+f.pos_type).innerHTML="查看应用"));
}else{
var X,V={},W=!1,F={};
if(f.button_action)try{
console.log("button_action:",f.button_action,typeof f.button_action),"string"==typeof f.button_action&&(f.button_action=JSON.parse(f.button_action.html())),
f.button_action.button_text&&""!=f.button_action.button_text||(f.button_action.button_text="去逛逛");
}catch(O){
f.button_action={
button_text:"decode error"
};
}else f.button_action={
button_text:"something wrong"
};
if(X=f.crt_size,f.biz_info&&f.biz_info.head_img&&(f.avatar=f.biz_info.head_img,f.avatarTitle=f.biz_info.nick_name),
(12==f.product_type||19==f.product_type)&&(W=!0,f.app_info&&f.app_info.icon_url&&(f.avatar=f.app_info.icon_url,
f.avatarTitle=f.app_info.appname)),46==f.product_type&&f.game_info&&f.game_info.head_img&&(f.avatar=f.game_info.head_img,
f.avatarTitle=f.game_info.nick_name),6==f.dest_type&&Wxopen_card.startConnect(f),
4==f.pos_type){
if(_checkShowCpc()){
f=_parseExpCpc(f);
var G=f.exp_obj.sale_text;
(23==f.product_type||12==f.product_type||19==f.product_type||46==f.product_type)&&(G=f.avatarTitle),
V={
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
title:G,
is_wx_app:f.is_wx_app,
is_ios:mmversion.isIOS,
isDownload:W,
btn_text:f.button_action.button_text,
avatar:f.avatar
},W&&(F.customUpdataFunc=function(e,a){
var t=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),n=e.querySelector(".js_download_inner");
t&&(t.style.width=a.percent+"%"),i.textContent=a.btn_text,n.textContent=a.btn_text;
}),ad_render_object["pos_"+f.pos_type]=new CrtManager.createCrtObject(X,V,js_cpc_area,F),
gdt_as.pos_4=js_cpc_area.getElementsByClassName("js_ad_main_area");
}
}else if(3==f.pos_type){
var H=document.createElement("div");
H.appendChild(document.createTextNode(f.image_url)),f.image_url=H.innerHTML.replace(/&amp;/g,"&"),
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
u.thumbUrl=f.video_info.thumbUrl,u.videoUrl=f.video_info.videoUrl,u.rl=f.rl),V={
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
isDownload:W,
btn_text:f.button_action.button_text,
avatar:f.biz_info.head_img,
isApp:!1
},ad_render_object["pos_"+f.pos_type]=new CrtManager.createCrtObject(X,V,js_sponsor_ad_area,F),
js_sponsor_ad_area.style.display="block",gdt_as.pos_3=js_sponsor_ad_area.getElementsByClassName("js_ad_main_area"),
!ad_render_object["pos_"+f.pos_type].getCrtData().has_banner){
var Y="&tid="+f.traceid+"&uin="+uin+"&key="+U+"&ticket="+(f.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+f.adid+"&ad_engine=0&pos_type="+pos_type+"&exp_id="+f.exp_info.exp_id+"&exp_value="+f.exp_info.exp_value+"&r="+Math.random();
f.report_param=Y;
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
report_param:Y
}),DomEvent.on(window,"scroll",N),N(0);
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
if(5==e.watermark_type&&(a.btn_text="查看详情"),console.log("文中",e),e.biz_info&&e.biz_info.head_img&&(e.avatar=e.biz_info.head_img,
e.avatarTitle=e.biz_info.nick_name),29==e.product_type||31==e.product_type?a.btn_text="查看详情":12==e.product_type||19==e.product_type?(a.btn_text="下载应用",
e.app_info&&e.app_info.icon_url&&(e.avatar=e.app_info.icon_url,e.avatarTitle=e.app_info.appname)):30==e.product_type?a.btn_text="去逛逛":23==e.product_type?a.btn_text=e.biz_info.is_subscribed?"查看公众号":"关注公众号":46==e.product_type&&(a.btn_text="进入小游戏",
e.game_info&&e.game_info.head_img&&(e.avatar=e.game_info.head_img,e.avatarTitle=e.game_info.nick_name)),
e.has_installed&&(a.btn_text="进入应用"),9==e.dest_type&&(a.btn_text="查看详情"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var t=e.cpc_exp_info.exp_content;
try{
for(var i=JSON.parse(t.replace(/&quot;/g,'"')),n=-1,o=0;o<i.aid_list.length;o++)i.aid_list[o].aid==e.aid&&(n=o);
n>-1&&(a.icon_pos=i.icon_pos||"",a.btn_text=i.btn_text||a.btn_text,a.price=i.aid_list[n].price,
a.sale_text=i.aid_list[n].sale_text,window.__addIdKeyReport("68064",15));
}catch(p){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=a,e;
}
function _checkShowCpc(){
if(globalAdDebug)return!0;
if(js_cpc_area){
var e=(document.documentElement.clientHeight||window.innerHeight)/2,a=js_cpc_area.offsetTop,t=document.getElementById("js_content").offsetHeight;
return e>a||e>t-a?!1:!0;
}
}
function lazyLoadAdImg(e){
for(var a=document.getElementsByClassName("js_alazy_img"),t=0;t<a.length;t++){
var i=a[t];
a[t].onload=function(){
window.__addIdKeyReport("28307",54),i.src.indexOf("retry")>-1&&window.__addIdKeyReport("28307",69);
},a[t].onerror=function(){
if(-1==i.src.indexOf("retry"))i.src=ParseJs.addParam(i.src,"retry",1);else{
window.__addIdKeyReport("28307",98);
var a="other";
mmversion.isIOS?a="iphone":mmversion.isAndroid&&(a="android"),window.setTimeout(function(){
var t=window.networkType||"unknow";
ajax({
url:"http://mp.weixin.qq.com/tp/datacenter/report?cmd=report&id=900023&os="+a+"&uin=777&aid="+e.aid+"&image_url="+encodeURIComponent(i.src)+"&type="+e.type+"&network="+t,
type:"GET",
async:!0
});
},500);
}
window.__addIdKeyReport("28307",57);
},a[t].src=a[t].dataset.src;
}
}
function getHost(e){
if(!e)return"";
var a=document.createElement("a");
return a.href=e,a.hostname;
}
function checkAdImg(e){
if(e){
var a=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],t=e.image_url||"",i=getHost(t);
return void(i&&-1==a.indexOf(i)&&window.__addIdKeyReport("28307",58));
}
}
function saveCopyArr(e){
for(var a=[],t=0;t<e.length;++t){
var i=e[t],n=typeof i;
i="string"==n?i.htmlDecode():i,"object"==n&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a.push(i);
}
return a;
}
function saveCopy(e){
var a={};
for(var t in e)if(e.hasOwnProperty(t)){
var i=e[t],n=typeof i;
i="string"==n?i.htmlDecode():i,"object"==n&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a[t]=i;
}
return a;
}
function formName(e){
for(var a=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],t=-1,i=0,n=a.length;n>i;++i){
var o=a[i],p=e.indexOf(o);
-1!=p&&(-1==t||t>p)&&(t=p);
}
return-1!=t&&(e=e.substring(0,t)),e;
}
function formSize(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
}
function seeAds(){
function debounce(e,a,t){
var i;
return function(){
var n=this,o=arguments,p=function(){
i=null,t||e.apply(n,o);
},_=t&&!i;
clearTimeout(i),i=setTimeout(p,a),_&&e.apply(n,o);
};
}
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
function ad_click(e,a,t,i,n,o,p,_,r,d,s,c,l,m,u,f,g,y,v){
if(!has_click[n]){
has_click[n]=!0;
var h=document.getElementById("loading_"+n);
h&&(h.style.display="inline");
var w=g.exp_info||{},b=w.exp_id||"",j=w.exp_value||[];
try{
j=JSON.stringify(j);
}catch(x){
j="[]";
}
var k="";
c&&c.weapp_info&&c.weapp_info.original_id&&(k=c.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:b,
exp_value:j,
url:encodeURIComponent(a),
tid:n,
aid:_,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:r,
pos_x:l,
pos_y:m,
ad_w:u,
ad_h:f,
gh_id:k,
press_interval:window.__a_press_interval||-1
},function(){
if(has_click[n]=!1,h&&(h.style.display="none"),g.canvas_info)return console.log(" jsapi invoke OpenADCanvas"),
console.log(g.canvas_info.canvas_id),console.log(g.canvas_info.ad_info_xml),void JSAPI.invoke("openADCanvas",{
canvasId:g.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:d
}),
adInfoXml:g.canvas_info.ad_info_xml
},function(e){
console.log(JSON.stringify(e)),0!=e.ret?(location.href=a,report(135,y)):report(134,y);
});
if(v)1==g.dest_type?handleH5(a,n,idx,mid,biz,r,_,s,d,c,g):6==g.dest_type?Wxopen_card.openWxopen(c):12==g.product_type||19==g.product_type?handleApp(a,n,idx,mid,biz,r,_,s,d,c,g):0==g.dest_type?location.href=a:(console.info("[APPMSG AD DEBUG] new protocol debug click:",g),
location.href=a);else if("5"==e)location.href="/mp/profile?source=from_ad&tousername="+a+"&ticket="+o+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+n;else{
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
var t={
source:4,
tid:n,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:_,
ad_engine:s,
pos_type:d
},i=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&c||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var p="",l="";
c&&(p=c.pkgname&&c.pkgname.replace(/\./g,"_"),l=c.channel_id||""),t={
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
pkgname:p
};
}
a=URL.join(a,t),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=URL.join(a,{
traceid:n,
aid:_,
engine:s
})),!_&&i&&i(80,a);
}
location.href=a;
}
});
}
}
function bindAdOperation(){
console.log("bindAdOperation"),seeAds();
for(var e=0;total_pos_type>e;++e)!function(e){
var a="pos_"+e,t=el_gdt_areas[a];
if(!t)return!1;
if(!t.getElementsByClassName&&t.style)return t.style.display="none",!1;
var i=t.getElementsByClassName("js_ad_link")||[],n=adDatas.ads[a],o=t.getElementsByClassName("js_ad_opt_list_btn_"+e),p=t.getElementsByClassName("js_complain_btn_"+e);
if(n){
var _,r,d=n.adData,s=n.a_info,c=s.pos_type,l=n.ad_engine;
if(2==s.use_new_protocol){
var m=t.getElementsByClassName("js_material_"+e),u=t.getElementsByClassName("js_ad_action_"+e);
if(m.length>0&&(r=m[0].dataset.tid,_=m[0].dataset.aid,DomEvent.on(m[0],"click",function(a){
console.log("click ad material");
var t=m[0].dataset,i=!!a&&a.target;
if(t&&3!=s.pos_type){
var n=t.type,o=t.url,p=t.rl,u=t.apurl,f=t.ticket,g=t.group_id,y=t.pt,v=s.use_new_protocol;
if(d){
d.adid=window.adid||d.adid||d.aid;
var h="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
}
var w,b,j,x;
return w=position.getX(i,"js_material_"+e)+a.offsetX,b=position.getY(i,"js_material_"+e)+a.offsetY,
j=m[0].clientWidth,x=m[0].clientHeight,ad_click(n,o,p,u,r,f,g,_,y,c,l,d,w,b,j,x,s,h,v),
log("[Ad] ad_click: type="+n+", url="+o+", rl="+p+", apurl="+u+", traceid="+r+", ticket="+f+", group_id="+g+", aid="+_+", pt="+y+", pos_type="+c+", ad_engine="+l),
!1;
}
})),u.length>0&&s.button_action&&3!=s.pos_type)if(12==s.product_type||19==s.product_type){
console.log("init app download");
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
new f({
btn:u[0],
adData:d,
report_param:I,
pos_type:c,
url_scheme:d.url_scheme,
via:[d.traceid,d.adid,y,source,g,l].join("."),
ticket:d.ticket,
appdetail_params:["&aid="+d.adid,"traceid="+d.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+l,"appuin="+biz,"pos_type="+c,"ticket="+d.ticket,"scene="+scene].join("&"),
engine:l,
percentStatus:function(e,a){
var t=ad_render_object["pos_"+s.pos_type].getData();
t.percent=a,"downloading"==e?t.btn_text="暂停":"paused"==e?t.btn_text="继续":"installed"==e?(t.percent=0,
t.btn_text="已安装"):"downloaded"==e?(t.percent=0,t.btn_text="安装"):"gotodetail"==e?(t.percent=0,
t.btn_text="进入"):(t.percent=0,t.btn_text="进入应用"),ad_render_object["pos_"+s.pos_type].updateData(t);
}
});
}else if(23==s.product_type){
var v=require("a/profile.js");
d.adid=window.adid||d.adid||d.aid,new v({
btnProfile:u[0],
adData:d,
pos_type:c,
report_param:I,
aid:d.adid,
ad_engine:l
});
}else DomEvent.on(u[0],"click",function(a){
var t=m[0].dataset,i=!!a&&a.target,n=t.type,o=s.button_action.jump_url,p=t.rl,_=t.apurl,r=t.tid,f=t.ticket,g=t.group_id,y=t.aid,v=t.pt,h=s.use_new_protocol;
if(console.info("[APPMSG AD DEBUG] new protocol btn action debug click: ",s.dest_type,s.product_type),
d){
d.adid=window.adid||d.adid||d.aid;
var w="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
}
var b,j,x,k;
return b=position.getX(i,"js_ad_action_"+e)+a.offsetX,j=position.getY(i,"js_ad_action_"+e)+a.offsetY,
x=u[0].clientWidth,k=u[0].clientHeight,ad_click(n,o,p,_,r,f,g,y,v,c,l,d,b,j,x,k,s,w,h),
log("[Ad] ad_click: type="+n+", url="+o+", rl="+p+", apurl="+_+", traceid="+r+", ticket="+f+", group_id="+g+", aid="+y+", pt="+v+", pos_type="+c+", ad_engine="+l),
!1;
});
}else for(var h=0,w=i.length;w>h;++h)!function(e,a){
var t=i[e],n=t.dataset;
if(n&&3!=s.pos_type){
var o=n.type,p=n.url,d=n.rl,m=n.apurl,u=n.ticket,f=n.group_id,g=n.pt,y=s.use_new_protocol,v=!0;
r=n.tid,_=n.aid,(y&&(12==s.product_type||19==s.product_type)||115==g)&&(v=!1,console.log("js dom event type: ",v)),
4==s.pos_type&&(v=!1,console.log("js dom for pos_type:4 event type: ",v)),DomEvent.on(t,"click",function(e){
var t=!!e&&e.target,i=[12,19,23];
if(!t||!t.className||4==c&&a&&-1==i.toString().indexOf(a.product_type)||-1==t.className.indexOf("js_ad_btn")&&-1==t.className.indexOf("js_btn_process")&&-1==t.className.indexOf("js_muted_btn")&&-1==t.className.indexOf("js_poster_cover")&&-1==t.className.indexOf("js_ad_opt_list_btn")&&-1==t.className.indexOf("js_complain_btn")&&-1==t.className.indexOf("js_view_profile")&&-1==t.className.indexOf("js_add_contact")){
if(a){
a.adid=window.adid||a.adid||a.aid;
var n="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
s&&s.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?report(114,n):"103"==a.pt||"111"==a.pt||"112"==a.pt?report(23,n):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&report(25,n);
}
var v,h,w,b;
return v=position.getX(t,"js_ad_link")+e.offsetX,h=position.getY(t,"js_ad_link")+e.offsetY,
w=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(o,p,d,m,r,u,f,_,g,c,l,a,v,h,w,b,s,n,y),log("[Ad] ad_click: type="+o+", url="+p+", rl="+d+", apurl="+m+", traceid="+r+", ticket="+u+", group_id="+f+", aid="+_+", pt="+g+", pos_type="+c+", ad_engine="+l),
!1;
}
},v),DomEvent.on(t,"touchstart",function(){
console.log("touchstart",+new Date),window.__a_press_interval=+new Date;
}),DomEvent.on(t,"touchend",function(){
console.log("touchend",+new Date),window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(h,d);
if(o[0]&&(console.log("bind btn:",o[0]," for pos type:",s.pos_type," aid:",_),DomEvent.on(o[0],"click",function(){
if(console.log("optListBtn click on: pos",s.pos_type),parseInt(window.can_see_complaint)){
var e=document.getElementsByClassName("js_ad_opt_list_"+s.pos_type);
adOptReport(0,s.pos_type,r,_),e&&e[0]&&(e[0].style.display="none"==e[0].style.display?"block":"none");
}
return!1;
})),p[0]&&DomEvent.on(p[0],"click",function(){
console.log("complainBtn click on: pos",s.pos_type);
var e="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+_+"&traceid="+r+"&source="+s.pos_type+"&biz="+window.biz;
return adOptReport(1,s.pos_type,r,_),mmversion.isWp||mmversion.isIOS||mmversion.isAndroid?JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e,!1;
}),d&&2!=s.use_new_protocol){
d.adid=window.adid||d.adid||d.aid;
var b=s.exp_info||{},j=b.exp_id||"",x=b.exp_value||[];
try{
x=JSON.stringify(x);
}catch(k){
x="[]";
}
var I="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&exp_id="+j+"&exp_value="+x+"&r="+Math.random();
if(d.report_param=I,d.use_new_protocol){
if(12==s.product_type||19==s.product_type){
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_"),S=document.getElementById("js_ad_btn_"+c);
new f({
btn:S,
adData:d,
report_param:I,
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
report_param:I,
aid:d.adid,
ad_engine:l,
a_info:s
});
}
if(9==s.material_type){
s.report_param=I;
var z=require("a/video.js");
new z(s);
}
}else{
if("100"==d.pt||"115"==d.pt){
var v=require("a/profile.js");
return void new v({
btnViewProfile:document.getElementById("js_view_profile_"+c),
btnAddContact:document.getElementById("js_add_contact_"+c),
adData:d,
pos_type:c,
report_param:I,
aid:d.adid,
ad_engine:l,
a_info:s
});
}
if("102"==d.pt){
var D=require("a/android.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
return void new D({
btn:document.getElementById("js_app_action_"+c),
adData:d,
report_param:I,
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
report_param:I
});
}
if("105"==d.pt)return void new Card({
btn:document.getElementById("js_card_action_"+c),
adData:d,
report_param:I,
pos_type:c
});
if("106"==d.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+c),
adData:d,
report_param:I,
pos_type:c
});
if("103"==d.pt||"104"==d.pt||"111"==d.pt||"112"==d.pt||"113"==d.pt||"114"==d.pt||"121"==d.pt||"122"==d.pt){
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
return void new f({
btn:document.getElementById("js_appdetail_action_"+c),
js_app_rating:document.getElementById("js_app_rating_"+c),
adData:d,
report_param:I,
pos_type:c,
url_scheme:d.url_scheme,
via:[d.traceid,d.adid,y,source,g,l].join("."),
ticket:d.ticket,
appdetail_params:["&aid="+d.adid,"traceid="+d.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+l,"appuin="+biz,"pos_type="+c,"ticket="+d.ticket,"scene="+scene].join("&"),
engine:l
});
}
if("108"==d.pt||"109"==d.pt||"110"==d.pt||"116"==d.pt||"117"==d.pt){
var q=require("a/sponsor.js");
new q({
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
report_param:I
});
}
if("118"==s.pt&&(d.report_param=I),"125"==s.pt){
s.report_param=I,console.log("old video info");
var z=require("a/video.js");
new z(s);
}
}
}
}
}(e);
}
function extend(e,a){
for(var t in a)e[t]=a[t];
return e;
}
function handleApp(e,a,t,i,n,o,p,_,r,d,s){
if(console.info("[APPMSG AD DEBUG] handleApp",s),s&&s.has_installed&&-1==e.indexOf("itunes.apple.com")&&s.app_info.url_scheme)return void(location.href=e);
if(0==e.indexOf("https://itunes.apple.com/")||0==e.indexOf("http://itunes.apple.com/"))return s.app_info&&s.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):JSAPI.invoke("downloadAppInternal",{
appUrl:e
},function(a){
a.err_msg&&-1!=a.err_msg.indexOf("ok")||(console.log("http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+ticket+"#wechat_redirect"),
location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+ticket+"#wechat_redirect");
}),!1;
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var c={
source:4,
tid:a,
idx:t,
mid:i,
appuin:n,
pt:o,
aid:p,
ad_engine:_,
pos_type:r
},l=window.__report;
if(d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",u="";
d&&(m=d.pkgname&&d.pkgname.replace(/\./g,"_"),u=d.channel_id||""),c={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:n,
pt:o,
channel_id:u,
aid:p,
engine:_,
pos_type:r,
pkgname:m
};
}
e=URL.join(e,c),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:p,
engine:_
})),!p&&l&&l(80,e);
}
location.href=e;
}
function handleH5(e,a,t,i,n,o,p,_,r,d,s){
if(console.info("[APPMSG AD DEBUG] handle h5",s),-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var c={
source:4,
tid:a,
idx:t,
mid:i,
appuin:n,
pt:o,
aid:p,
ad_engine:_,
pos_type:r
},l=window.__report;
if(("104"==o||"113"==o||"114"==o||"122"==o)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",u="";
d&&(m=d.pkgname&&d.pkgname.replace(/\./g,"_"),u=d.channel_id||""),c={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:n,
pt:o,
channel_id:u,
aid:p,
engine:_,
pos_type:r,
pkgname:m
};
}
e=URL.join(e,c),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:p,
engine:_
})),!p&&l&&l(80,e);
}
console.info("[APPMSG AD DEBUG] handle h5 url",e),location.href=e;
}
var mmversion=require("biz_wap/utils/mmversion.js"),js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),js_cpc_area=document.getElementsByTagName("mpcpc"),gdt_pos_4={},Device=require("biz_wap/utils/device.js"),Sign=require("a/a_sign.js");
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
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js"],function(e){
"use strict";
function t(e){
function t(e){
for(var t=window.location.href,s=t.indexOf("?"),i=t.substr(s+1),n=i.split("&"),a=0;a<n.length;a++){
var r=n[a].split("=");
if(r[0].toUpperCase()==e.toUpperCase())return r[1];
}
return"";
}
var a={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
idx:"",
scene:"",
title:"",
ct:"",
abtest_cookie:"",
devicetype:"",
version:"",
is_need_ticket:0,
is_need_ad:0,
comment_id:"",
is_need_reward:0,
both_ad:0,
reward_uin_count:0,
send_time:"",
msg_daily_idx:"",
is_original:0,
is_only_read:0,
req_id:"",
pass_ticket:"",
is_temp_url:0,
rtId:"",
rtKey:"",
onSuccess:function(){},
onError:function(){}
};
for(var r in e)e.hasOwnProperty(r)&&(a[r]=e[r]);
console.log("getData",a),i({
url:"/mp/getappmsgext?f=json&mock="+t("mock"),
data:{
r:Math.random(),
__biz:a.biz,
appmsg_type:a.appmsg_type,
mid:a.mid,
sn:a.sn,
idx:a.idx,
scene:a.scene,
title:encodeURIComponent(a.title.htmlDecode()),
ct:a.ct,
abtest_cookie:a.abtest_cookie,
devicetype:a.devicetype.htmlDecode(),
version:a.version.htmlDecode(),
is_need_ticket:a.is_need_ticket,
is_need_ad:a.is_need_ad,
comment_id:a.comment_id,
is_need_reward:a.is_need_reward,
both_ad:a.both_ad,
reward_uin_count:a.is_need_reward?a.reward_uin_count:0,
send_time:a.send_time,
msg_daily_idx:a.msg_daily_idx,
is_original:a.is_original,
is_only_read:a.is_only_read,
req_id:a.req_id,
pass_ticket:a.pass_ticket,
is_temp_url:a.is_temp_url,
item_show_type:a.item_show_type,
tmp_version:1
},
type:"POST",
dataType:"json",
rtId:a.rtId,
rtKey:a.rtKey,
rtDesc:n,
async:!0,
success:function(e){
if(s("[Appmsg] success get async data"),"function"==typeof a.onSuccess&&a.onSuccess(e),
e)try{
s("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(t){}else s("[Appmsg] success get async data, async data is empty");
},
error:function(){
s("[Appmsg] error get async data, biz="+a.biz+", mid="+a.mid),"function"==typeof a.onError&&a.onError();
}
});
}
var s=e("appmsg/log.js"),i=e("biz_wap/utils/ajax.js"),n=e("rt/appmsg/getappmsgext.rt.js");
return{
getData:t
};
});define("appmsg/comment_utils.js",["appmsg/comment.js"],function(n){
"use strict";
function m(m){
1==m.comment_enabled&&(window.can_fans_comment_only=m.only_fans_can_comment,window.comment_count=m.comment_count,
window._is_fans=m.is_fans,window._logo_url=m.logo_url,window._nick_name=m.nick_name,
window.friend_comment_enabled=m.friend_comment_enabled,n("appmsg/comment.js"));
}
return{
initCommentByExtData:m
};
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/articleReport.js","biz_wap/utils/ajax.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js"],function(e,t,i,o){
"use strict";
function n(){
var e=c.indexOf("://")<0?"http://"+c:c;
if(-1!=e.indexOf("mp.weixin.qq.com/s")||-1!=e.indexOf("mp.weixin.qq.com/mp/appmsg/show")||-1!=e.indexOf("mp.weixin.qq.com/mp/homepage")){
var t=e.split("#");
e=m.addParam(t[0],"scene",25,!0)+(t[1]?"#"+t[1]:""),e=e.replace(/#rd$/g,"#wechat_redirect");
}else e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(c);
try{
if("mp.weixin.qq.com"!=top.window.location.host)return window.top.open(e,"_blank"),
!1;
}catch(i){}
var o=location.search.replace("wx_header","del_wx_header"),n={
url:"/mp/advertisement_report"+o+"&report_type=3&action_type=0&url="+encodeURIComponent(c)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
};
return n.timeout=2e3,n.complete=function(){
l(e,{
sample:0,
reject:function(){
location.href=e;
}
});
},s(n),!1;
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),m=e("biz_common/utils/url/parse.js"),p=e("appmsg/articleReport.js"),s=e("biz_wap/utils/ajax.js"),a=msg_title.htmlDecode(),c=msg_source_url.htmlDecode(),l=e("appmsg/open_url_with_webview.js"),_=e("biz_wap/jsapi/core.js");
p.init({
dom:document.getElementById("js_report_article3"),
title:a,
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
c&&1==!!c.length&&w&&(c=c[0].innerHTML,v.content_length=w.htmlSize),window.logs.pageinfo=v,
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
S=1*h.get(I);
var t=location.href.indexOf("scrolltodown")>-1?!0:!1,o=u.js_cmt_area;
if(t&&o&&o.offsetTop){
var n=o.offsetTop;
window.scrollTo(0,n-25);
}else window.scrollTo(0,S);
if(window.__wxjs_is_wkwebview){
var i=f.getData(),m=localStorage.getItem("hand_up_id");
console.log("preReportdata",i),console.log("nowHandUpId",m),console.log("pageTimeKey",E);
for(var l in i)console.log("data in preReportdata",l),l!=m&&i[l]&&(d(i[l].val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random(),
f.remove(l));
window.setInterval(function(){
var e=a();
f.set(E,e,+new Date+864e7),console.log("timeOnPageLS",f.getData());
},1e3);
}
var w=y.getData("spad");
w&&w.spad&&_(w.spad.val),e.hasSpAd&&window.setInterval(function(){
s();
var e=r();
y.set("spad",e,+new Date+864e7);
},1e3);
}),m.on(window,"unload",function(){
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=a();
d(e);
}),window.logs.read_height=0,m.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(O),O=setTimeout(function(){
S=window.pageYOffset,h.set(I,S,+new Date+72e5);
},500);
}),m.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(O),O=setTimeout(function(){
S=window.pageYOffset,h.set(I,S,+new Date+72e5);
},500);
})),m.on(document,"visibilitychange",function(){
p.isHidden()?localStorage.setItem("hand_up_id",E):localStorage.setItem("hand_up_id","");
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
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=u.js_content,n=u.screen_height,a=u.screen_width,d=u.scroll_height,s=Math.ceil(d/n),r=Math.ceil((o.scrollHeight||o.offsetHeight)/n),_=(window.logs.read_height||t)+n,m=u.pageEndTop,l=u.imgs,w=Math.ceil(_/n)||1,g=u.media,h=50,f=0,y=0,b=0,T=0,z=_+h>m?1:0;
w>s&&(w=s);
var O=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
f++;
var a=i.getAttribute("src"),d=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(y++,a.isCDN()&&(b++,-1!=a.indexOf("tp=webp")&&T++),d&&(e["img_"+d+"_cnt"]=e["img_"+d+"_cnt"]||0,
e["img_"+d+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=T||0,e.download_img_cnt=y||0,e.download_cdn_img_cnt=b||0,
e.img_cnt=f||0;
},S=window.appmsgstat||{},I=window.logs.img||{},x=window.logs.pagetime||{},E=I.load||{},D=I.read||{},k=[],N=[],B=0,H=0,M=0;
for(var P in D)P&&0==P.indexOf("http")&&D.hasOwnProperty(P)&&N.push(P);
for(var P in E)P&&0==P.indexOf("http")&&E.hasOwnProperty(P)&&k.push(P);
for(var R=0,A=k.length;A>R;++R){
var q=k[R];
q&&q.isCDN()&&(-1!=q.indexOf("/0")&&B++,-1!=q.indexOf("/640")&&H++,-1!=q.indexOf("/300")&&M++);
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
screen_num:r,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:u.video_cnt,
read_screen_num:w||0,
is_finished_read:z,
scene:source,
content_len:v.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
handup_time:p.getHandUpTime(),
img_640_cnt:H,
img_0_cnt:B,
img_300_cnt:M,
wtime:x.onload_time||0,
ftime:x.ftime||0,
ptime:x.ptime||0,
onload_time:x.onload_time||0,
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
for(var L in J)if(J.hasOwnProperty(L)){
var C=J[L];
C.val>0&&K.push(L+"_"+C.val);
}
e.idkey=K.join(";");
}
O(!!g&&g.getElementsByTagName("img")),O(l);
var U=(new Date).getDay(),W=i();
return(j||0!==user_uin&&Math.floor(user_uin/100)%7==U)&&(e.domain_list=W),j&&(e.html_content=c),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e;
}
function d(e){
z||(z=!0,f.remove(E),e.report_time=parseInt(+new Date/1e3),e.ascene=window.ascene||-1,
0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),l({
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
h.set(o,S,+new Date+72e5);
}
function r(){
return window.__video_report_data;
}
function _(e){
e&&e.play_type&&(y.remove("spad"),e.report_type=1,l({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
e("biz_common/utils/string/html.js");
var m=e("biz_common/dom/event.js"),l=e("biz_wap/utils/ajax.js"),w=(e("biz_common/utils/cookie.js"),
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
},h=new g("page_pos"),f=new g("time_on_page"),y=new g("spad"),v={},b={},j=!1,T=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],z=!1,O=null,S=0,I=[biz,sn,mid,idx].join("_"),x=Math.random(),E=[biz,sn,mid,idx,x].join("_");
return{
init:t
};
});
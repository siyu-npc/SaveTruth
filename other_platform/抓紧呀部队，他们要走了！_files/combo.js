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
},f=function(e){
var i=0,t=0,n=0;
.5>e&&(e=0),e=Math.ceil(e);
var i=Math.floor(e/3600),t=Math.floor((e-3600*i)/60),n=e-3600*i-60*t;
return 0!=i?(10>i&&(i="0"+i),i+=":"):i="",10>t&&(t="0"+t),10>n&&(n="0"+n),i+t+":"+n;
},p=!a.canSupportVideo,g=function(e){
var i=$(e.container);
e.width=e.width||300,e.height=e.height||300,e.videoWidth=e.videoWidth||0,e.videoHeight=e.videoHeight||0,
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
e.ratio=e.ratio||e.width/e.height,this.opt=e,this.id=e.id=parent.window._players_guid++,
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
if(d.setAttribute("origin_src",_),p)return l.find(".js_btn_play").attr("href",_).show(),
this.__loadedHandler(),void this.__bindBtnEvent();
var h=e.plugins||[];
this._blockPlugin={};
for(var f=0,g=h.length;g>f;++f){
var v=h[f];
v.setPlayer(this),!!v.init&&v.init();
}
this.plugins=h,parent.window._players[_]=this,this._trigger("afterCheckVideoFit",t),
this._trigger("loading"),this.__bindBtnEvent(),this.__bindVideoEvent();
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
i&&i>0&&this.container.find(".js_video_length").html(f(i)).show();
},
__outsidePauseHandler:function(){
_("__outsidePauseHandler"),this.hideLoading(),this.pause(),this._trigger("userpause"),
this.hideControllBar(!0),this._showPlayControllBar();
},
__readyBeginPlayHandler:function(e){
this.setSrc(this.opt.src),this._trigger("beginPlay",e);
},
__beginPlayHandler:function(){
p&&(location.href=this.opt.src);
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
e.log.duration=e.duration,n.find(".js_total_time").text(f(e.duration)),this.__hasFuncControllBar&&n.find(".js_progress_bar,.js_total_time").show();
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
i.__setControllBar(e/n),i.hideCover(),i.hideLoading(),t.find(".js_now_play_time").text(f(e)),
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
if(p)return location.href=t.opt.src,!1;
if(o){
var e=2;
try{
e=window.cgiData&&"0"==window.cgiData.media_source?11:2;
}catch(i){}
r.report({
step:e,
vid:o.vid,
traceid:o.pageplayer._getTraceId(),
orderid:o.pageplayer._getOrderid()
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
s.find(".js_switch")),f=s.find(".js_progress_bar"),g=s.find(".js_played_bar"),v=s.find(".js_page_video"),y=s.find(".js_full_mask"),w=s.find(".js_video_pause_controll"),m=s.find(".js_full_screen_control"),j=s.find(".js_loading");
w.on("tap",".js_btn_pause",function(){
t.__forcePause=!1,t.play(),t._trigger("userplay"),t._hidePlayControllBar();
});
var C,T,b,P,S=0,B=!1,F=0,H=0,x=0,D=t.__getDuration(),k=0,M=1,L=parent.window.user_uin||0,V=0!==L&&Math.floor(L/100)%1e3<M,E=!1,I=0;
v.on("touchstart",function(e){
1==e.targetTouches.length&&t.isPlay()&&(n.blockTouchVideo||(b=C=new Date,P=T={
x:e.targetTouches[0].clientX,
y:e.targetTouches[0].clientY
},x=parent.document.body.scrollTop,k=t.getCurTime(),a.os.android&&e.preventDefault()));
}),v.on("touchmove",function(e){
if(1==e.targetTouches.length&&t.isPlay()&&!n.blockTouchVideo){
if(parent.document.body.scrollTop!=x)return B=!1,void(x=-1);
var i=new Date,o=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY,r=i-C,s=o-T.x,l=a-T.y,d=Math.sqrt(Math.pow(s,2)+Math.pow(l,2))+H,_=Math.min(Math.ceil(d/r),6);
F=Math.floor(.1*d+.2*_*_*_)*Math.ceil(D/500),H=0==F?d:0,0>s&&(F=-F);
var h=180*Math.atan2(l,s)/Math.PI;
B||(h>=-30&&30>=h&&++S,(h>=150&&180>=h||h>=-180&&-150>=h)&&--S,(S>=4||-4>=S)&&(5>=d?S=0:(I=Math.max(I,_),
B=!0))),B&&(k+=F,0>k&&(k=0),k>D&&(k=1*D),t.__setForwardBar(k),e.preventDefault(),
e.stopPropagation()),T={
x:o,
y:a
},C=i;
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
}),j.on("touchend",function(){
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
}),j.on("touchend",function(){
t._trigger("touchVideo");
}),c.on("tap",function(){
i();
});
var z,O,A,q=null,R=[];
t.__onTouch=!1,f.on("touchstart",function(e){
t.__hasFuncControllBar&&(t.__onTouch=!0,O=z?e:e.touches[0],q={},q.x1=O.pageX,q.y1=O.pageY,
A=l.currentTime,R=A,t.pause(),e.preventDefault());
}),f.on("touchmove",function(e){
if(t.__hasFuncControllBar){
t.__onTouch=!0,O=z?e:e.touches[0];
var i=O.pageX,n=O.pageY;
q.x2=i,q.y2=n;
var o=g.offset(),a=f.width(),r=(i-o.left)/a;
A=t.__getDuration()*r,t.pause(),t.__setControllBar(r),t.__has_drag=!0,e.preventDefault(),
e.stopPropagation();
}
}),f.on("touchend",function(e){
if(t.__hasFuncControllBar){
if(t.__onTouch=!1,q&&q.x1){
var i=q.x2?q.x2:q.x1,n=g.offset(),o=f.width(),a=(i-n.left)/o;
if(a=a>1?1:a,A=t.__getDuration()*a,t.__setControllBar(a),R){
var r=0>A?0:A;
t.__dragTimes.push(Math.round(1e3*R)+":#:"+Math.round(1e3*r)),R=0;
}
}
return q=null,setTimeout(function(){
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
i.find(".js_forward").css("display","block"),i.find(".total_time").text(f(t)),i.find(".js_forward_bar").css("width",100*n+"%"),
i.find(".js_forward_play_time").text(f(e));
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
n.attr("src",e),o.preload=i||"metadata",o.load(),this.container.find(".js_now_play_time").text(f(0)),
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
orderid:e.pageplayer._getOrderid()
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
e>=n&&(e=n-.01),0>e&&(e=0),i.currentTime=e,t.__replaySec=e,t.__last_playtime=e,t.container.find(".js_now_play_time").text(f(e));
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
}),g._getFormatTime=f,g;
});define("a/video.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t);
}
function i(){
l({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST"
});
}
function o(e){
function o(e,t,i){
var o;
return function(){
var n=this,r=arguments,d=function(){
o=null,i||e.apply(n,r);
},a=i&&!o;
clearTimeout(o),o=setTimeout(d,t),a&&e.apply(n,r);
};
}
var r=document.getElementById("js_video_container"),_=null,l=e.rl||"",w="";
if(l){
l=l.split("?"),l=l.length>1?l[1]:"";
var c=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),m=l.match(c);
m&&(w=unescape(m[2]));
}
window.__video_report_data={
aid:e.aid,
traceid:e.traceid,
user_uin:window.user_uin,
appmsg_id:mid,
item_idx:idx,
viewid:w,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var f=null,v=!0,y=!1;
if(a.isAndroid&&a.gtVersion("6.6.6",!0)&&(y=!0),r){
_=new p({
container:r,
cover:e.video_info.thumbUrl,
width:r.offsetWidth,
height:r.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth),
muted:v,
ad_muted_btn:v,
always_hide_loading:!0,
src:e.video_info.videoUrl,
pt:e.pt,
autoHide:!0,
blockTouchVideo:!0,
onError:function(i){
console.log("播放出错",i),t(129,e.report_param),r.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+e.video_info.thumbUrl+"); height:"+s.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(130,e.report_param),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,_.play(),i();
},
onTimeupdate:function(e,t){
window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*_.__getDuration(),u||(window.__video_report_data.report_type=3,
i(),u=1);
}
}),_._showPlayer(),_.setSrc(e.video_info.videoUrl,"auto");
var g=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,h=document.documentElement.clientHeight||window.innerHeight,b=o(function(){
if(3==window.__video_report_data.play_type)return void n.off(window,"scroll",b);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(g=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
h=document.documentElement.clientHeight||window.innerHeight,_.isPlay()&&(s.offsetTop>g+h-s.offsetHeight/2||s.offsetTop+s.offsetHeight/2<g))_.pause();else if(!(_.isPlay()||"wifi"!=window.networkType&&"4g"!=window.networkType||s.offsetTop>g+h+s.offsetHeight/2||s.offsetTop+s.offsetHeight<g-s.offsetHeight/2)){
if(a.isAndroid&&!y)return;
d.invoke("getBackgroundAudioState",{},function(i){
/:ok$/.test(i.err_msg)&&1*i.paused==0&&i.src||(0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(131,e.report_param),
a.isIOS&&_.triggerMuted(v),_.__beginPlayHandler(),_._trigger("beginPlay")):_.play());
});
}
},500);
n.on(window,"scroll",b),b(),f=function(){
window.setTimeout(function(){
_.triggerMuted(v);
},1e3);
};
}
n.on(document.getElementById("js_video_container"),"tap",function(i){
if(i.target.className.indexOf("js_muted_btn")>-1)"true"==_.video.getAttribute("muted")?(_.triggerMuted(!1),
v=!1):(_.triggerMuted(!0),v=!0),t(132,e.report_param);else if(!_.isPlay())return _.__beginPlayHandler(),
_.triggerMuted(!0),t(133,e.report_param),void(window.__video_report_data.play_type=2);
}),n.on(window,"resize",function(){
setTimeout(function(){
var t=(s.clientWidth,r.offsetWidth),i=r.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth);
_.setHeight(i),_.setWidth(t),s.style.width=t,s.style.height=i;
},0);
});
}
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),d=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/mmversion.js"),_=e("a/a_report.js"),p=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),s=(_.AdClickReport,e("biz_common/utils/url/parse.js"),
document.getElementById("js_bottom_ad_area")),l=e("biz_wap/utils/ajax.js"),u=!1;
return o;
});define("a/sponsor.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","a/wxopen_card.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function o(e,o){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+o.report_param);
}
function t(){
f({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST",
success:function(){}
});
}
function i(e,t,i){
t.canvas_info?d.invoke("openADCanvas",{
canvasId:t.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:t.pos_type
}),
adInfoXml:t.canvas_info.ad_info_xml
},function(t){
0!=t.ret?(location.href=e,o(135,i)):o(134,i);
}):_.isWp||_.isIOS?d.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(o){
-1==o.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
}
function n(e){
var n=e.adData,r=e.pos_type,p=n.traceid,f=e.a_info.type,m=n.adid,y=n.url,v=e.a_info.rl;
110==n.pt&&(y=y.replace("#","&AdType=80#"));
var g={};
e.report_param=e.report_param||"";
var h=e.adDetailBtn,b=e.adMoreBtn,j=(e.adMessage,e.adAbout),x=e.adImg,T=e.adVideo,z=0,W={
type:f,
report_type:2,
url:encodeURIComponent(y),
tid:p,
rl:encodeURIComponent(v),
__biz:biz,
pos_type:r,
pt:n.pt,
click_pos:""
},k=null,v=n.rl||"",H="";
if(v){
v=v.split("?"),v=v.length>1?v[1]:"";
var I=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),E=v.match(I);
E&&(H=unescape(E[2]));
}
window.__video_report_data={
aid:n.adid,
traceid:n.traceid,
user_uin:window.user_uin,
publisher_appid:n.publisher_appid||0,
appmsg_id:mid,
item_idx:idx,
viewid:H,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var O=null,A=!0,U=!1;
if(_.isAndroid&&_.gtVersion("6.6.6",!0)&&(U=!0),T&&n.videoUrl){
k=new s({
container:T,
cover:n.thumbUrl,
width:T.offsetWidth,
height:T.offsetWidth*parseInt(n.displayHeight)/parseInt(n.displayWidth),
muted:!0,
ad_muted_btn:!0,
always_hide_loading:!0,
src:n.videoUrl,
autoHide:!0,
blockTouchVideo:!0,
onError:function(t){
console.log("播放出错",t),o(123,e),T.parentNode.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+n.thumbUrl+"); height:"+u.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
o(122,e),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,k.play(),t();
},
onTimeupdate:function(e,o){
window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*o.currentTime,
window.__video_report_data.video_duration=1e3*k.__getDuration(),w||(window.__video_report_data.report_type=3,
t(),w=1);
}
}),z=29,k._showPlayer(),k.setSrc(n.videoUrl,"auto");
var M=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,P=document.documentElement.clientHeight||window.innerHeight;
if(_.isAndroid)if(u.offsetTop>M&&u.offsetTop<M+P)window.__video_report_data.auto_play=0;else{
var S=function(){
k.__beginPlayHandler(),a.off(window,"touchstart",S),U=!0;
};
a.on(window,"touchstart",S);
}
var C=function(){
if(3==window.__video_report_data.play_type)return void a.off(window,"scroll",C);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(M=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
P=document.documentElement.clientHeight||window.innerHeight,k.isPlay()&&(u.offsetTop>M+P||u.offsetTop+u.offsetHeight<M))k.pause();else if(!k.isPlay()&&!(u.offsetTop>M+P||u.offsetTop+u.offsetHeight<M)){
if(_.isAndroid&&!U)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(o(121,e),
_.isIOS&&k.triggerMuted(!0),k.__beginPlayHandler()):k.play();
}
};
a.on(window,"scroll",C),C(),O=function(){
window.setTimeout(function(){
k.triggerMuted(!0);
},1e3);
};
}
a.on(window,"touchend",function(e){
e.target!=j&&e.target!=h&&(j.style.display="none");
}),a.on(document.getElementById("js_ad_inner"),"click",function(t){
if(t.target.className.indexOf("js_muted_btn")>-1)"true"==k.video.getAttribute("muted")?(k.triggerMuted(!1),
A=!1):(k.triggerMuted(!0),A=!0),o(124,e);else{
if(k&&(!k.isPlay()||0==window.__video_report_data.play_type))return k.__beginPlayHandler(),
A||k.triggerMuted(!1),o(121,e),void(window.__video_report_data.play_type=2);
"js_main_img"==t.target.id||t.target.className.indexOf("video_mask")>-1?g[p+"_1"]||(g[p+"_1"]=!0,
W.click_pos=1,c(W,function(){
o(87+z,e),g[p+"_1"]=!1,!!O&&O(),6!=e.a_info.dest_type?i(y,e.a_info,e):l.openWxopen(e.a_info);
})):g[p+"_2"]||(g[p+"_2"]=!0,W.click_pos=2,c(W,function(){
o(88+z,e),g[p+"_2"]=!1,!!O&&O(),6!=e.a_info.dest_type?i(y,e.a_info,e):l.openWxopen(e.a_info);
}));
}
return!1;
}),a.on(b,"click",function(){
return g[p+"_3"]||(g[p+"_3"]=!0,W.click_pos=3,c(W,function(){
o(89+z,e),g[p+"_3"]=!1,!!O&&O(),6!=e.a_info.dest_type?i(y,e.a_info,e):l.openWxopen(e.a_info);
})),!1;
}),a.on(h,"click",function(){
return o(90+z,e),j.style.display="none"==window.getComputedStyle(j).display?"initial":"none",
!1;
}),a.on(j,"click",function(){
o(91+z,e);
var t="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid="+m+"&tid="+p+"#wechat_redirect";
return!!O&&O(),_.isWp||_.isIOS||_.isAndroid?d.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}):location.href=t,!1;
}),a.on(window,"resize",function(){
setTimeout(function(){
var e=u.clientWidth;
if(x)x.style.height=e/1.77+"px";else{
var o=T.offsetWidth,t=T.offsetWidth*parseInt(n.displayHeight)/parseInt(n.displayWidth);
k.setHeight(t),k.setWidth(o),u.style.width=o,u.style.height=t;
}
},0);
});
}
var a=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),d=e("biz_wap/jsapi/core.js"),_=e("biz_wap/utils/mmversion.js"),p=e("a/a_report.js"),s=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),l=e("a/wxopen_card.js"),c=p.AdClickReport,u=(e("biz_common/utils/url/parse.js"),
document.getElementById("js_sponsor_ad_area")),f=e("biz_wap/utils/ajax.js"),w=!1;
return n;
});define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/appdialog_confirm.js","biz_common/utils/url/parse.js"],function(a,t,n,e){
"use strict";
function o(a){
h("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+H.report_param);
}
function d(a,t){
if(H.app_status=a,"downloading"==a){
t=t||0,console.log(t);
var n="";
if(document.getElementById("js_appdetail_action_0")&&(z=document.getElementById("js_appdetail_action_0").offsetWidth,
D=document.getElementById("js_appdetail_action_0").offsetHeight,console.log("btn_width: ",z)),
104==H.data.pt?n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停('+t+"%)</span>":113==H.data.pt||114==H.data.pt?H.btn.innerHTML.indexOf("继续")>-1?(n=H.btn.innerHTML,
n=n.replace("继续","暂停")):n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停</span>':122==H.data.pt?(H.btn.innerHTML.indexOf("继续")>-1?(n=H.btn.innerHTML,
n=n.replace(/继续/g,"暂停")):0==C?n='<span class="btn_progress_inner js_btn_process" id="percent_btn_1" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+z+'px;">暂停</span></span>暂停':document.getElementById("percent_btn_1").style.width=t+"%",
C=t):1==H.data.use_new_protocol?(z=H.btn.offsetWidth,D=H.btn.offsetHeight,H.btn.innerHTML.indexOf("继续")>-1?(n=H.btn.innerHTML,
n=n.replace(/继续/g,"暂停")):0==C?n='<span class="btn_progress_inner js_btn_process" id="percent_btn_1" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+z+"px; line-height: "+D+'px">暂停下载</span></span>暂停下载':document.getElementById("percent_btn_1").style.width=t+"%",
C=t):n='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">'+t+"%</span>",
console.log(H.btn.innerHTML),!n)return;
H.btn.innerHTML=n,122==H.data.pt||1==H.data.use_new_protocol?w.addClass(H.btn,"btn_progress"):w.addClass(H.btn,"with_processor");
}else if("paused"==a){
var n="";
104==H.data.pt||113==H.data.pt||114==H.data.pt||122==H.data.pt||1==H.data.use_new_protocol?(n=H.btn.innerHTML,
n=n.replace(/暂停/g,"继续"),H.btn.innerHTML=n):(w.removeClass(H.btn,"with_processor"),
w.removeClass(H.btn,"btn_progress"),H.btn.innerHTML=x[a]);
}else w.removeClass(H.btn,"with_processor"),w.removeClass(H.btn,"btn_progress"),
H.btn.innerHTML=x[a],1==H.data.use_new_protocol&&"gotodetail"==a&&(H.btn.innerHTML="进入应用");
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
if(104==H.data.pt||113==H.data.pt||114==H.data.pt||122==H.data.pt||1==H.data.use_new_protocol&&12==H.data.product_type&&H.url_scheme)j.gtVersion("6.5.6",!0)?v.invoke("launchApplication",{
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
H.data=a.adData,H.url_scheme=a.url_scheme,H.appdetail_params=a.appdetail_params||"";
var t={};
H.channelid=H.data.channel_id||"",H.report_param=a.report_param;
var n=20;
if(("103"==H.data.pt||"104"==H.data.pt)&&s(a),"104"==H.data.pt||"113"==H.data.pt||"114"==H.data.pt||"122"==H.data.pt||1==H.data.use_new_protocol&&12==H.data.product_type){
var u=H.data.androiddownurl;
if(u&&u.match){
var w=/&channelid\=([^&]*)/,g=u.match(w);
g&&g[1]&&(H.channelid=g[1],H.data.androiddownurl=u.replace(w,""));
}
H.channelid&&(H.channelid="&channelid="+H.channelid),a.via&&(H.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
v.ready(function(){
console.log("appcard info",H.btn.id),console.log(H),("113"==H.data.pt||"114"==H.data.pt||"104"==H.data.pt||"122"==H.data.pt||1==H.data.use_new_protocol&&12==H.data.product_type)&&(v.invoke("getInstallState",{
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
if("103"==H.data.pt||"111"==H.data.pt||"112"==H.data.pt||"121"==H.data.pt||1==H.data.use_new_protocol&&19==H.data.product_type){
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
});define("a/cpc_a_tpl.html.js",[],function(){
return'<!--有title “广告”，去掉 class appmsg_card_context。没有title “广告”，加class appmsg_card_context-->\n<div id="js_cpc_area"  class="js_ad_link  <# if(exp_obj.icon_pos != \'left\' && exp_obj.icon_pos != \'right\'){ #> appmsg_card_context <# } #> appmsg_card_active mpda_cpc_context pages_reset" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <!--有文字 "广告"-->\n    <# if(exp_obj.icon_pos == \'left\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"广告" 居左-->\n      <p class="mpda_cpc_title mpda_cpc_title_left">广告</p>\n    </div>\n    <# } else if(exp_obj.icon_pos == \'right\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"广告" 居右-->\n      <p class="mpda_cpc_title mpda_cpc_title_right">广告</p>\n    </div>\n    <# } #>\n    <div class="mpda_cpc_inner">\n      <div class="appmsg_card_bd mpda_cpc_bd" style="background-image:url(<#=image_url#>)"></div>\n\n      <div class="appmsg_card_ft mpda_cpc_ft <# if(!exp_obj.price){ #> single<# } #>" style="z-index: 2;">\n          <# if(exp_obj.icon_pos == \'left\' || exp_obj.icon_pos == \'right\'){ #>\n\n          <# } else { #>\n          <span class="dropdown_opr_tips">\n              广告\n              <span class="dropdown_opr_popover"></span>\n          </span>\n          <# } #>\n          <!--title 金额-->\n\n          <# if(!!exp_obj.sale_text){ #>\n          <span class="appmsg_card_msg">\n              <span class="appmsg_card_msg_title">\n                  <#=exp_obj.sale_text#>\n              </span>\n              <# if(!!exp_obj.price){ #>\n              <span class="appmsg_card_msg_supp price">\n                  ¥<#=exp_obj.price#>\n              </span>\n              <# } #>\n          </span>\n          <# } #>\n\n\n          <# if(use_new_protocol){ #>\n          <a href="javascript:void(0);" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress" id="js_ad_btn_<#=pos_type#>">\n              <!-- 新广告协议逻辑去掉小程序 -->\n              <#=exp_obj.btn_text#>\n          </a>    \n          <# } else { #>\n          <a href="javascript:void(0);" class="appmsg_card_btn">\n              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt="">\n              <#=exp_obj.btn_text#>\n          </a>\n          <# } #>\n          <!--\n          <a href="javascript:void(0);" class="link_tips">\n              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAh1BMVEUAAAD19fX19fX////09PT09PT09PT09PT19fX09PT29vb29vb4+Pj////19fX09PT19fX09PR1htvJz+t6i9zS1+6wuefs7fLn6fKSn+GFlN5/j93w8fTZ3O+8xOmMmuCiruScqOOYpOLGzOvByOqrteamseWAkN7g4/De4e/N0uzM0uyAkN1rIPf0AAAAEXRSTlMAf/ML6NnTv6qlclIjFoLyg7LPVaEAAAFSSURBVDjLlZXZcoMwDEWNgRAIkPgGCEuWZu/2/99XlxYjUBgP9wUjnUGWLAsxVByFgS+lH4RRLCaVpAtFtEiTl5jrSDWSdFzOrTz1Qt5qzDlqQs4w7FJNaknDU46TLK41+kpZ9J+R69lAzyWB7cETyR35uc6qYtdXPtHghnMFWj1zY0k1uGDcUUN11QBNac5diJhx+wbZp37cgYcxxiJi4AEo2kWNkzFGImTgFti2iwsyYwxFMAm+Z+SLgfCH++vBWwbcjMMXku7ugqoDHwDeSA+Ldf9y1b5TB+rUi33vWwufZotL2YEf11IR+SSZM3A0yYwVkPI0eoOTYEgK/o2qO8GcgRE5wvMfsKuBkoExaYr8tyDH4knLQppCpOPuwmnHwHTYuF+1xrI752QyvgplftAYkzPjcs25rvYBMHOk2IfUrLFnH6QzRjNXsrEPe/vv4weFgFW8AqzRsgAAAABJRU5ErkJggg==" alt="">\n              去逛逛\n          </a>\n          -->\n        </div>\n    </div>\n</div>\n';
});define("a/a_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n        <#if(window.new_appmsg){#>\n        <div class="mod_title_context">\n            <strong class="mod_title">广告</strong>\n        </div>\n        <#}else{#>\n        <div class="rich_tips with_line title_tips">\n            <span class="tips">广告</span>\n        </div>\n        <# } #>\n    <# } #>\n    <div class="js_ad_link extra_link <# if(pt==107){ #>preview_img_primary<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(!use_new_protocol){ #>\n            <# if(pt==1){ #>\n                <#=hint_txt#>\n                <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n                <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n            <# }else if(pt==2||pt==107||pt==119){ #>\n                <!--第三方logo-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n                <# } #>\n                <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                <# if(watermark_type!=0){ #>\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(pt==119){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if(watermark_type==1){ #>\n                        商品推广\n                    <# }else if (watermark_type==2){ #>\n                        活动推广\n                    <# }else if (watermark_type==3){ #>\n                        应用下载\n                    <# } #>\n                    </i>\n                <# } #>\n            <# }else if(pt==7||pt==120){ #>\n            <!-- 图文 -->\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_group_title2"><#=hint_txt#></strong>\n                        <div class="preview_group_desc"><#=ad_desc#></div>\n                        <img data-src="<#=image_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <i class="promotion_tag">\n                        <# if(pt==120){ #>\n                        <span class="icon26_weapp_white"></span>\n                        <# } #>\n                        活动推广\n                    </i>\n                </div>\n            </div>\n            <# }else if(pt==115){ #>\n            <div class="preview_group mod_follow_with_img">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=biz_info.head_img#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=biz_info.nick_name#></strong>\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">查看</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">关注</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==100){ #>\n            <div class="preview_group follow <# if(!!biz_info.show_comm_attention_num){ #>with_tips<# } #>">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <# if(!!biz_info.show_comm_attention_num){ #>\n                        <div class="preview_group_desc weak_tips">有<#=biz_info.comm_attention_num#>个好友关注</div>\n                        <# } #>\n                        <# if(!!biz_info.head_img){ #>\n                        <img data-src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius js_alazy_img" >\n                        <# }else{ #>\n                        <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>" >\n                        <# } #>\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn">查看</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn">关注</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==102){ #>\n            <div class="preview_group">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download">下载</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==101){ #>\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn">下载</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==103||pt==104){ #>\n            <div class="preview_group obvious_app">\n                <div class="preview_group_inner">\n                    <div class="pic_app">\n                        <img data-src="<#=image_url#>" alt="" class="js_alazy_img">\n                    </div>\n                    <div class="info_app">\n                        <p class="name_app"><#=app_info.app_name#></p>\n                        <# if(pt==103){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                        <# } else if(pt==104){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                        <# } #>\n                        <!--星级评分-->\n                        <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                            <!--\n                                半星：star_half\n                                一星：star_one\n                                一星半：star_one_half\n                                二星：star_two\n                                三星：star_three\n                                四星：star_four\n                                五星：star_five\n                            -->\n                            <span class="js_stars stars" style="display:none;"></span>\n                            <!--暂无评分\n                            <span class="scores">3.5</span>\n                            -->\n                            <span class="js_scores scores"></span>\n                        </p>\n                        <div class="dm_app">\n                            <a id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn">下载</a>\n                            <p class="extra_info">来自<# if(pt==103){ #>App Store<# }else{ #>腾讯应用宝<# } #></p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==105){ #>\n            <div class="mpda_card cardticket">\n                <div class="cardticket_hd cell">\n                    <div class="cell_hd">\n                        <span class="radius_avatar">\n                            <img class="avatar js_alazy_img" data-src="<#=card_info.card_logo_url#>" >\n                        </span>\n                    </div>\n                    <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                    <div class="cell_ft">\n                        <a class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">领券</a>\n                    </div>\n                </div>\n                <div class="cardticket_ft">\n                    <div class="cardticket_theme"></div>\n                    <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n                </div>\n            </div>\n            <# }else if(pt==106){ #>\n            <!-- 小店广告 -->\n            <div class="preview_group preview_card preview_shop_card">\n                <div class="preview_group_inner shop_card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_shop_card_title"><#=mp_shop_info.name#></strong>\n                        <div class="preview_shop_card_desc">\n                            <span class="preview_card_desc_meta btn_plain_primary preview_shop_card_btn_buy js_ad_btn" id="js_shop_action_<#=pos_type#>">购买</span>\n                            <span class="preview_card_desc_meta preview_shop_card_oldprice">&yen;<#=mp_shop_info.ori_price/100#></span>\n                            <span class="preview_card_desc_meta preview_shop_card_price">&yen;<#=mp_shop_info.cur_price/100#></span>\n                        </div>\n                        <img data-src="<#=mp_shop_info.img#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==111||pt==113||pt==112||pt==114){ #>\n            <!-- 背景高斯模糊带描述文字、带背景图的app下载 -->\n            <div class="preview_group download_app_with_desc js_download_app_card">\n                <div class="preview_group_inner" style="background-image:url(<#=image_url#>)">\n                    <div class="preview_group_hd">\n                        <div class="preview_group_hd_inner">\n                            <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                            <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                            <a id="js_appdetail_action_<#=pos_type#>" class="preview_group_btn js_ad_btn">下载</a>\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">继续</a>\n                            <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">打开</a> -->\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn with_processor"><i class="btn_processor" style="width:35%;"></i><span class="btn_processor_value">35%</span></a> -->\n                        </div>\n                    </div>\n                    <# if(pt==111||pt==113){ #>\n                    <div class="preview_group_bd">\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[0]#></div>\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[1] || ""#></div>\n                    </div>\n                    <div class="preview_group_ft"><div class="preview_group_download_info"><span class="download_size" ><#=app_info.app_size#></span>&nbsp;来自<# if(pt==111){ #>App Store<# }else{ #>腾讯应用宝<# } #></div></div>\n                    <# } #>\n                </div>\n            </div>\n            <# }else if(pt==122||pt==121){ #>\n            <!-- app下载类广告 -->\n            <!--117 新卡片 begin -->\n            <div class="preview_group mod_method117">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=app_info.icon_url#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=app_info.app_name#></strong>\n                        <a id="js_appdetail_action_<#=pos_type#>" class="wx_min_plain_btn primary js_ad_btn">下载</a>\n                        <!-- <a href="#" class="wx_min_plain_btn primary btn_progress">\n                            <span class="btn_progress_inner" style="width:37%;">\n                                <span class="btn_progress_bd" style="width:57px;">暂停</span>\n                            </span>\n                            暂停\n                        </a> -->\n                    </div>\n                </div>\n            </div>\n            <!--117 end-->\n            <!--互选广告 begin-->\n            <# }else if(pt==125 || pt==140 || pt==142){ #>\n            <div class="da_area">\n              <div class="da_inner">\n                <!--广告头部-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!-- <span class="da_video_bg_cover" id="js_main_img" style="background-image:url(<#=video_info.thumbUrl#>)"></span> -->\n                    <!--放视频-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--广告信息-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <a class="da_btn_more"><# if(dest_type==6){ #><span class="icon26_weapp_blue"></span><# } #>查看详情</a>\n                </div>\n              </div>\n            </div>\n            <# } #>\n            <!--互选广告 end-->\n        <# }else{ #>\n            <!--新协议-->\n            <# if(material_type == 9){ #>\n            <!--视频-->\n            <div class="da_area">\n              <div class="da_inner">\n                <!--广告头部-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!-- <span class="da_video_bg_cover" id="js_main_img" style="background-image:url(<#=video_info.thumbUrl#>)"></span> -->\n                    <!--放视频-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--广告信息-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <# if (product_type==12 || product_type==19){ #>\n                  <!--<a id="js_ad_btn_<#=pos_type#>" class="da_btn_more wx_min_plain_btn ba_btn btn_progress">立即下载</a>-->\n                  <a id="js_ad_btn_<#=pos_type#>" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress">下载应用</a>\n                  <# }else{ #>\n                  <a class="da_btn_more">查看详情</a>\n                  <# } #>\n                </div>\n              </div>\n            </div>\n            <# }else if(material_type == 2){ #>\n            <!--图片-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n                <# } #>\n                    <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(dest_type==6){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if (product_type==12 || product_type==19){ #>\n                        应用下载\n                    <# } #>\n                    </i>\n            <# } #>\n        <# } #>\n    </div>\n</div>\n';
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","appmsg/cdn_img_lib.js","a/profile.js","a/android.js","a/ios.js","a/app_card.js","a/sponsor.js","a/video.js"],function(require,exports,module,alert){
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
var l=null,m=s[c],f=m.use_new_protocol;
if(m.exp_info=m.exp_info||{},m.is_cpm=m.is_cpm||0,m.biz_info=m.biz_info||{},m.app_info=m.app_info||{},
m.pos_type=m.pos_type||0,m.logo=m.logo||"",f)4==m.pos_type?(r=!0,m=p(m),l=m):0==m.pos_type&&(m=i(m),
l=m);else if(100==m.pt||115==m.pt){
for(var u=m.exp_info.exp_value||[],g=!1,y=0,h=0;h<u.length;++h){
var v=u[h]||{};
if(1==v.exp_type&&(y=v.comm_attention_num,g=y>0),2==v.exp_type){
g=!1,y=0;
break;
}
}
m.biz_info.show_comm_attention_num=g,m.biz_info.comm_attention_num=y,l={
usename:m.biz_info.user_name,
pt:m.pt,
url:m.url,
traceid:m.traceid,
adid:m.aid,
ticket:m.ticket,
is_appmsg:!0
};
}else if(102==m.pt)l={
appname:m.app_info.app_name,
versioncode:m.app_info.version_code,
pkgname:m.app_info.apk_name,
androiddownurl:m.app_info.apk_url,
md5sum:m.app_info.app_md5,
signature:m.app_info.version_code,
rl:m.rl,
traceid:m.traceid,
pt:m.pt,
ticket:m.ticket,
type:m.type,
adid:m.aid,
is_appmsg:!0
};else if(101==m.pt)l={
appname:m.app_info.app_name,
app_id:m.app_info.app_id,
icon_url:m.app_info.icon_url,
appinfo_url:m.app_info.appinfo_url,
rl:m.rl,
traceid:m.traceid,
pt:m.pt,
ticket:m.ticket,
type:m.type,
adid:m.aid,
is_appmsg:!0
};else if(103==m.pt||104==m.pt||2==m.pt&&m.app_info){
var w=m.app_info.down_count||0,x=m.app_info.app_size||0,j=m.app_info.app_name||"",k=m.app_info.category,b=["万","百万","亿"];
if(w>=1e4){
w/=1e4;
for(var I=0;w>=10&&2>I;)w/=100,I++;
w=w.toFixed(1)+b[I]+"次";
}else w=w.toFixed(1)+"次";
x=formSize(x),k=k?k[0]||"其他":"其他",j=formName(j),m.app_info._down_count=w,m.app_info._app_size=x,
m.app_info._category=k,m.app_info.app_name=j,l={
appname:m.app_info.app_name,
app_rating:m.app_info.app_rating||0,
icon_url:m.app_info.icon_url,
app_id:m.app_info.app_id,
channel_id:m.app_info.channel_id,
md5sum:m.app_info.app_md5,
rl:m.rl,
pkgname:m.app_info.apk_name,
url_scheme:m.app_info.url_scheme,
androiddownurl:m.app_info.apk_url,
versioncode:m.app_info.version_code,
appinfo_url:m.app_info.appinfo_url,
traceid:m.traceid,
pt:m.pt,
url:m.url,
ticket:m.ticket,
type:m.type,
adid:m.aid,
is_appmsg:!0,
app_info:m.app_info
};
}else if(105==m.pt){
var q=m.card_info.card_id||"",E=m.card_info.card_ext||"";
E=E.htmlDecode();
try{
E=JSON.parse(E),E.outer_str=m.card_info.card_outer_id||"",E=JSON.stringify(E);
}catch(z){
E="{}";
}
l={
card_id:q,
card_ext:E,
pt:m.pt,
ticket:m.ticket||"",
url:m.url,
rl:m.rl,
tid:m.traceid,
traceid:m.traceid,
type:m.type,
adid:m.aid,
is_appmsg:!0
};
}else if(106==m.pt){
var C=m.mp_shop_info.pid||"",O=m.mp_shop_info.outer_id||"";
l={
pid:C,
outer_id:O,
pt:m.pt,
url:m.url,
rl:m.rl,
tid:m.traceid,
traceid:m.traceid,
type:m.type,
adid:m.aid,
is_appmsg:!0
};
}else if(108==m.pt||109==m.pt||110==m.pt||116==m.pt||117==m.pt)l={
pt:m.pt,
ticket:m.ticket||"",
url:m.url,
traceid:m.traceid,
adid:m.aid,
is_appmsg:!0
},m.video_info&&(l.displayWidth=m.video_info.displayWidth,l.displayHeight=m.video_info.displayHeight,
l.thumbUrl=m.video_info.thumbUrl,l.videoUrl=m.video_info.videoUrl,l.rl=m.rl),6==m.dest_type&&Wxopen_card.startConnect(m);else if(111==m.pt||113==m.pt||114==m.pt||112==m.pt||121==m.pt||122==m.pt){
var x=m.app_info.app_size||0,j=m.app_info.app_name||"";
x=formSize(x),j=formName(j),m.app_info.app_size=x,m.app_info.app_name=j,l={
appname:m.app_info.app_name,
app_rating:m.app_info.app_rating||0,
app_id:m.app_info.app_id,
icon_url:m.app_info.icon_url,
channel_id:m.app_info.channel_id,
md5sum:m.app_info.app_md5,
rl:m.rl,
pkgname:m.app_info.apk_name,
url_scheme:m.app_info.url_scheme,
androiddownurl:m.app_info.apk_url,
versioncode:m.app_info.version_code,
appinfo_url:m.app_info.appinfo_url,
traceid:m.traceid,
pt:m.pt,
url:m.url,
ticket:m.ticket,
type:m.type,
adid:m.aid,
source:source||"",
is_appmsg:!0
};
}else 118==m.pt?(l=m,r=!0,console.log("?#$:"),Wxopen_card.startConnect(m)):119==m.pt||120==m.pt?(l=m,
Wxopen_card.startConnect(m)):125==m.pt&&(l=m,6==m.dest_type&&Wxopen_card.startConnect(m));
var A=m.image_url;
if(require("appmsg/cdn_img_lib.js"),A&&A.isCDN()&&(A=A.replace(/\/0$/,"/640"),A=A.replace(/\/0\?/,"/640?"),
m.image_url=ParseJs.addParam(A,"wxfrom","50",!0)),adDatas.ads["pos_"+m.pos_type]={
a_info:m,
adData:l
},localStorage&&localStorage.setItem&&m.app_info&&m.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+m.traceid,m.app_info.url_scheme),
m.has_installed=!1,f){
if(12==m.product_type||19==m.product_type){
console.log("pkgname:",m.app_info.apk_name),console.log(m);
var D=m.pos_type;
console.log("appPos",D),function(e,a){
console.log("appPos in",e),JSAPI.invoke("getInstallState",{
packageName:a.app_info.apk_name
},function(p){
var i=p.err_msg;
i.indexOf("get_install_state:yes")>-1&&(a.has_installed=!0,console.log("change btn","js_ad_btn_"+e),
document.getElementById("js_ad_btn_"+e)&&(document.getElementById("js_ad_btn_"+e).innerHTML="进入应用"),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
}(D,m);
}
}else m&&(104==m.pt||113==m.pt||114==m.pt||2==m.pt||122==m.pt)&&m.app_info.url_scheme&&JSAPI.invoke("getInstallState",{
packageName:m.app_info.apk_name
},function(e){
var a=e.err_msg;
a.indexOf("get_install_state:yes")>-1&&(m.has_installed=!0,document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
}
var T=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
js_sponsor_ad_area.offsetTop<e+a&&(Class.addClass(document.getElementById("js_ad_area"),"show"),
DomEvent.off(window,"scroll",T));
},B=adDatas.ads;
for(var S in B)if(0==S.indexOf("pos_")){
var l=B[S],m=!!l&&l.a_info;
if(l&&m){
if(console.log(m),0==m.pos_type){
if(m.new_appmsg=window.new_appmsg,js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,m),
111==m.pt||112==m.pt||113==m.pt||114==m.pt){
var R=document.getElementsByClassName("js_download_app_card")[0],N=R.offsetWidth,H=Math.floor(N/2.875);
H>0&&(R.style.height=H+"px");
}
}else if(3==m.pos_type){
var R=document.createElement("div");
R.appendChild(document.createTextNode(m.image_url)),m.image_url=R.innerHTML.replace(/&amp;/g,"&"),
m.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,m),
js_sponsor_ad_area.style.display="block";
var U=js_sponsor_ad_area.clientWidth;
108==m.pt||109==m.pt||110==m.pt?document.getElementById("js_main_img").style.height=U/1.77+"px":116==m.pt||117==m.pt,
DomEvent.on(window,"scroll",T),T(0);
}else 4==m.pos_type&&(console.log("test"),_checkShowCpc()&&(m=_parseExpCpc(m),console.log(m),
js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,m),console.log("show cpc")));
lazyLoadAdImg({
aid:m.aid,
type:m.pt
}),checkAdImg(m),console.log("check ios",mmversion.isIOS,m.app_info),mmversion.isIOS&&m.app_info&&m.app_info.url_scheme&&(console.log("check ios end",document.getElementById("js_promotion_tag")),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+m.pos_type)&&(document.getElementById("js_ad_btn_"+m.pos_type).innerHTML="查看应用"));
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
});;define('page/appmsg/page_mp_article_improve_combo.css', [], function(require, exports, module) {
	return ".selectTdClass{background-color:#edf5fa!important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd!important}table{margin-bottom:10px;border-collapse:collapse;display:table;width:100%!important}td,th{word-wrap:break-word;word-break:break-all;padding:5px 10px;border:1px solid #DDD}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center}th{border-top:2px solid #BBB;background:#f7f7f7}.ue-table-interlace-color-single{background-color:#fcfcfc}.ue-table-interlace-color-double{background-color:#f7faff}td p{margin:0;padding:0}.res_iframe{display:block;width:100%;background-color:transparent;border:0}.shopcard_iframe{margin:14px 0;height:95px}.vote_area{display:block;position:relative;margin:14px 0;white-space:normal!important}.vote_iframe{display:block;width:100%;height:100%;background-color:transparent;border:0}form{display:none!important}@media screen and (min-width:0\\0) and (min-resolution:72dpi){.rich_media_content table{table-layout:fixed!important}.rich_media_content td,.rich_media_content th{width:auto!important}}.tc{text-align:center}.tl{text-align:left}.tr{text-align:right}.tips_global{color:#8c8c8c}.rich_split_tips{margin:20px 0;min-height:24px}.rich_media_tool_tips{margin-bottom:8px}.rich_media_tool{overflow:hidden;padding-top:15px;line-height:32px}.rich_media_tool .meta_primary{float:left;margin-right:10px}.rich_media_tool .meta_extra{float:right;margin-left:10px}.rich_media_tool .meta_praise{margin-right:0;margin-left:8px}.media_tool_meta i{vertical-align:0;position:relative;top:1px;margin-right:3px}.meta_praise{-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;min-width:3.5em}.meta_praise .praise_num{display:inline-block;vertical-align:top}.icon_praise_gray{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp\/O+GkJHJd4H7kr5nm\/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil\/ENST20ml8BF4Afu4z9HT3V80B\/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS\/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9\/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq\/sQqSpmgWvo82rBbTdCPeAA4N69\/noXS1XhphaBz27SPPVtapz\/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko\/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA\/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8\/GsFi3mW\/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width:13px;height:13px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto}.icon_praise_gray.praised{background-position:0 -18px}.praised .icon_praise_gray{background-position:0 -18px}.rich_split_tips{margin:20px 0;min-height:24px}.rich_media_tool_tips{margin-bottom:8px}.rich_media_tool{overflow:hidden;padding-top:15px;line-height:32px}.rich_media_tool .meta_primary{float:left;margin-right:10px}.rich_media_tool .meta_primary.article_modify_tag{margin-bottom:0;float:none;color:#bcbcbc;font-size:14px}.rich_media_tool .meta_extra{float:right;margin-left:10px}.rich_media_tool .meta_praise{margin-right:0;margin-left:8px}.media_tool_meta i{vertical-align:0;position:relative;top:1px;margin-right:3px}.meta_praise{-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;min-width:3.5em}.meta_praise .praise_num{display:inline-block;vertical-align:top}.icon_praise_gray{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp\/O+GkJHJd4H7kr5nm\/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil\/ENST20ml8BF4Afu4z9HT3V80B\/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS\/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9\/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq\/sQqSpmgWvo82rBbTdCPeAA4N69\/noXS1XhphaBz27SPPVtapz\/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko\/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA\/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8\/GsFi3mW\/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width:13px;height:13px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto}.icon_praise_gray.praised{background-position:0 -18px}.praised .icon_praise_gray{background-position:0 -18px}.rich_tips{margin-top:25px;margin-bottom:0;min-height:24px;text-align:center}.rich_tips .tips{display:inline-block;vertical-align:middle}.rich_tips .tips,.rich_tips .rich_icon{vertical-align:middle}.rich_tips .rich_icon{margin-top:-3px 5px 0 0}.rich_tips.with_line{border-top:1px dotted #e1e1e1}.rich_tips.with_line .tips{position:relative;top:-12px;padding-left:16px;padding-right:16px;background-color:#f3f3f3}.btn_primary{background-color:#04be02}.btn_primary:not(.btn_disabled):visited{color:#fff}.btn_primary:not(.btn_disabled):active{color:rgba(255,255,255,0.4);background-color:#039702}.btn_disabled{color:rgba(255,255,255,0.6)}.rich_tips.with_line{line-height:16px}.rich_tips.with_line .tips{top:-11px;padding-left:.35em;padding-right:.35em}.title_tips{margin-top:35px}.title_tips .tips{color:#868686;font-size:16px}.loading_tips{margin:36px 0 20px}.title_bottom_tips{margin-top:-10px}.icon_arrow_gray{width:7px}.icon_loading_white{width:16px}.icon_loading_white.icon_before{margin-right:1em}.icon_loading_white.icon_after{margin-left:1em}.btn{display:block;padding-left:14px;padding-right:14px;font-size:18px;text-align:center;text-decoration:none;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;color:#fff;line-height:42px;-webkit-tap-highlight-color:rgba(255,255,255,0)}.btn.btn_inline{display:inline-block}.rich_media_extra{overflow:hidden}.sougou_body .rich_media_area_primary{margin-top:10px}.sougou_body .rich_media_area_primary:first-child{margin-top:0}.sougou_body .rich_media_area_primary.sougou ul{padding-left:0;list-style-type:none}.sougou_body .rich_media_area_extra{margin-top:10px;background-color:#fff}.sougou_body .rich_media_area_title{font-size:16px;margin-bottom:.5em}.sougou_body .relate_article_list{font-size:15px}.sougou_body .relate_article_link{display:block;padding:.35em 0;color:#8c8c8c;-webkit-tap-highlight-color:rgba(0,0,0,0)}.sougou_body .rich_tips.discuss_title_line{text-align:left;margin-top:0;padding:20px 0 .5em;border-width:0;line-height:1.6}.sougou_body .rich_tips.discuss_title_line .tips{position:static;padding:0;color:#3e3e3e}.sougou_body .rich_tips.with_line .tips{background-color:#fff}.sougou_body .rich_split_tips{margin:0;padding:20px 0}.sougou_body .rich_media_extra .loading_tips{margin:0;padding:20px 0}.emotion_tool{position:relative;overflow:hidden}.pic_emotion_switch_wrp{margin-left:15px;margin-bottom:6px;display:inline-block;font-size:0}.pic_emotion_switch_wrp img{width:35px;display:block}.pic_emotion_switch_wrp .pic_active{display:none}.pic_emotion_switch_wrp:active .pic_default{display:none}.pic_emotion_switch_wrp:active .pic_active{display:block}.emotion_switch{margin-left:15px;margin-bottom:6px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:35px;height:35px;vertical-align:middle;display:inline-block;-webkit-background-size:35px auto;background-size:35px auto}.emotion_switch:active{background-position:0 -40px}.emotion_panel_arrow_wrp{position:absolute;margin-top:-6px;margin-left:26px}.emotion_panel_arrow_wrp .emotion_panel_arrow{position:absolute;display:inline-block;width:0;height:0;border-width:6px;border-style:dashed;border-color:transparent;border-top-width:0;border-bottom-color:#e5e5e7;border-bottom-style:solid}.emotion_panel_arrow_wrp .arrow_in{border-bottom-color:#f6f6f8;top:1px}.emotion_panel{background-color:#f6f6f8;position:relative}.emotion_panel:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e3e3e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_panel:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e3e3e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_list_wrp{overflow:hidden;position:relative;font-size:0;white-space:nowrap}.emotion_list{padding:10px 15px 0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;white-space:normal;display:inline-block;vertical-align:top}.emotion_list:last-child .emotion_item.del{position:absolute;bottom:0;right:18px}.emotion_item{display:inline-block;width:36px;height:36px;margin-bottom:5px;text-align:center;line-height:36px}.emotion_navs{text-align:center;padding-bottom:5px}.emotion_nav{display:inline-block;width:8px;height:8px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;background-color:#bbb;margin:0 5px}.emotion_nav.current{background-color:#8c8c8c}.icon_emotion{width:22px;height:22px;vertical-align:middle;display:inline-block;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/icon_emotion_panel.2x3518c6.png) no-repeat 0 0;-webkit-background-size:22px auto;background-size:22px auto}.icon_emotion.del{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:28px;height:28px;vertical-align:middle;display:inline-block;background-position:2px -62px;-webkit-background-size:28px auto;background-size:28px auto}.icon_emotion.del:active{background-position:2px -92px}.icon_emotion_single{width:22px;height:22px;vertical-align:middle;display:inline-block;-webkit-background-size:22px auto;background-size:22px auto}.icon_smiley_0{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_03518c6.png)}.icon_smiley_1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_13518c6.png)}.icon_smiley_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_23518c6.png)}.icon_smiley_3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_33518c6.png)}.icon_smiley_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_43518c6.png)}.icon_smiley_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_53518c6.png)}.icon_smiley_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_63518c6.png)}.icon_smiley_7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_73518c6.png)}.icon_smiley_8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_83518c6.png)}.icon_smiley_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_93518c6.png)}.icon_smiley_10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_103518c6.png)}.icon_smiley_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_113518c6.png)}.icon_smiley_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_123518c6.png)}.icon_smiley_13{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_133518c6.png)}.icon_smiley_14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_143518c6.png)}.icon_smiley_15{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_153518c6.png)}.icon_smiley_17{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_173518c6.png)}.icon_smiley_18{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_183518c6.png)}.icon_smiley_19{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_193518c6.png)}.icon_smiley_20{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_203518c6.png)}.icon_smiley_21{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_213518c6.png)}.icon_smiley_22{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_223518c6.png)}.icon_smiley_23{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_233518c6.png)}.icon_smiley_25{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_253518c6.png)}.icon_smiley_26{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_263518c6.png)}.icon_smiley_27{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_273518c6.png)}.icon_smiley_28{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_283518c6.png)}.icon_smiley_29{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_293518c6.png)}.icon_smiley_30{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_303518c6.png)}.icon_smiley_31{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_313518c6.png)}.icon_smiley_32{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_323518c6.png)}.icon_smiley_33{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_333518c6.png)}.icon_smiley_34{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_343518c6.png)}.icon_smiley_36{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_363518c6.png)}.icon_smiley_37{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_373518c6.png)}.icon_smiley_38{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_383518c6.png)}.icon_smiley_39{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_393518c6.png)}.icon_smiley_40{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_403518c6.png)}.icon_smiley_41{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_413518c6.png)}.icon_smiley_42{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_423518c6.png)}.icon_smiley_44{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_443518c6.png)}.icon_smiley_45{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_453518c6.png)}.icon_smiley_46{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_463518c6.png)}.icon_smiley_47{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_473518c6.png)}.icon_smiley_48{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_483518c6.png)}.icon_smiley_49{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_493518c6.png)}.icon_smiley_50{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_503518c6.png)}.icon_smiley_51{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_513518c6.png)}.icon_smiley_52{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_523518c6.png)}.icon_smiley_54{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_543518c6.png)}.icon_smiley_55{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_553518c6.png)}.icon_smiley_56{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_563518c6.png)}.icon_smiley_57{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_573518c6.png)}.icon_smiley_60{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_603518c6.png)}.icon_smiley_62{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_623518c6.png)}.icon_smiley_63{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_633518c6.png)}.icon_smiley_64{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_643518c6.png)}.icon_smiley_65{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_653518c6.png)}.icon_smiley_66{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_663518c6.png)}.icon_smiley_67{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_673518c6.png)}.icon_smiley_68{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_683518c6.png)}.icon_smiley_70{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_703518c6.png)}.icon_smiley_74{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_743518c6.png)}.icon_smiley_75{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_753518c6.png)}.icon_smiley_76{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_763518c6.png)}.icon_smiley_78{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_783518c6.png)}.icon_smiley_79{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_793518c6.png)}.icon_smiley_80{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_803518c6.png)}.icon_smiley_81{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_813518c6.png)}.icon_smiley_82{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_823518c6.png)}.icon_smiley_83{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_833518c6.png)}.icon_smiley_84{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_843518c6.png)}.icon_smiley_85{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_853518c6.png)}.icon_smiley_89{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_893518c6.png)}.icon_smiley_92{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_923518c6.png)}.icon_smiley_93{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_933518c6.png)}.icon_smiley_94{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_943518c6.png)}.icon_smiley_95{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_953518c6.png)}.icon_emoji_ios_0{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6043518c6.png)}.icon_emoji_ios_1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6373518c6.png)}.icon_emoji_ios_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6023518c6.png)}.icon_emoji_ios_3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F61D3518c6.png)}.icon_emoji_ios_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6333518c6.png)}.icon_emoji_ios_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6313518c6.png)}.icon_emoji_ios_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6143518c6.png)}.icon_emoji_ios_7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6123518c6.png)}.icon_emoji_wx_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_043518c6.png)}.icon_emoji_wx_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_053518c6.png)}.icon_emoji_wx_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_023518c6.png)}.icon_emoji_wx_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_063518c6.png)}.icon_emoji_wx_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_123518c6.png)}.icon_emoji_wx_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_113518c6.png)}.icon_emoji_ios_8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F47B3518c6.png)}.icon_emoji_ios_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F64F.03518c6.png)}.icon_emoji_ios_10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F4AA.03518c6.png)}.icon_emoji_ios_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F3893518c6.png)}.icon_emoji_ios_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F3813518c6.png)}.icon_emoji_wx_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_093518c6.png)}.icon_emoji_wx_14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_143518c6.png)}.wx_poptips{position:fixed;z-index:3;width:120px;min-height:120px;top:180px;left:50%;margin-left:-60px;background:rgba(40,40,40,0.5)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#80282828',endcolorstr = '#80282828');text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;color:#fff}.wx_poptips .icon_toast{width:53px;margin:15px 0 0}.wx_poptips .toast_content{margin:0 0 15px}.discuss_container .rich_media_title{font-size:18px}.discuss_container.disabled .btn_discuss{color:#60f05f}.discuss_container.access .discuss_container_inner{padding:15px 15px 0}.discuss_container.editing .discuss_container_inner{padding-bottom:25px}.discuss_container.editing .frm_textarea_box_wrp{margin:0 -15px}.discuss_container.editing .frm_textarea{height:78px;-webkit-overflow-scrolling:touch}.discuss_container.editing .frm_append.counter{display:block}.discuss_container.editing .discuss_btn_wrp{display:block}.discuss_container.editing .discuss_icon_tips{margin-top:0;margin-bottom:-14px}.discuss_container.editing .discuss_title_line{margin-bottom:-20px}.discuss_container.warning .counter{color:#e15f63}.frm_textarea{width:100%;background-color:transparent;border:0;display:block;font-size:14px;-webkit-box-sizing:border-box;box-sizing:border-box;height:37px;padding:10px 15px;resize:none;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.frm_textarea_box_wrp{position:relative}.frm_textarea_box_wrp:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:-1px}.frm_textarea_box_wrp:after{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.frm_textarea_box{display:block;background-color:#fff}.frm_append.counter{display:none;position:absolute;right:8px;bottom:8px;color:#a3a3a3;font-weight:400;font-style:normal;font-size:12px}.frm_append .current_num.warn{color:#f43631}.discuss_btn_wrp{display:none;margin-top:20px;margin-bottom:20px;text-align:right}.btn_discuss{padding-left:1.5em;padding-right:1.5em}.discuss_list{margin-top:-5px;padding-bottom:20px;font-size:16px;list-style:none}.discuss_item{position:relative;padding-left:45px;margin-top:26px;*zoom:1}.discuss_item:after{content:\"\\200B\";display:block;height:0;clear:both}.discuss_item .user_info{min-height:20px;overflow:hidden}.discuss_item .nickname{display:inline-block;vertical-align:middle;font-weight:400;font-style:normal;color:#727272;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;max-width:9em}.discuss_item .avatar{position:absolute;top:0;left:0;top:3px;width:35px;height:35px;background-color:#ccc;vertical-align:top;margin-top:0;border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px}.discuss_item .discuss_message{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;color:#3e3e3e;line-height:1.5}.discuss_item .discuss_message_content{white-space:pre-wrap}.discuss_item .discuss_extra_info{color:#bdbdbd;font-size:13px}.discuss_item .discuss_extra_info a{margin-left:.5em}.discuss_item .discuss_status{color:#ff7a21;white-space:nowrap}.discuss_item .discuss_status i{font-style:normal;margin-right:2px}.discuss_item .discuss_opr{float:right}.discuss_item .discuss_opr .meta_praise{display:inline-block;text-align:right;padding-top:5px;margin-top:-5px}.discuss_item .discuss_opr .praise_num{-webkit-user-select:none;user-select:none}.discuss_item .discuss_del{margin-left:.5em}.discuss_icon_tips{margin-bottom:20px}.discuss_icon_tips img{vertical-align:middle;margin-right:3px;margin-top:-4px}.discuss_icon_tips .icon_edit{width:12px}.discuss_icon_tips .icon_access{width:13px}.reply_result{position:relative;margin-top:.5em;padding-top:.5em;padding-left:.4em}.reply_result:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #dadada;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.reply_result .discuss_message{clear:both}.reply_result .nickname{position:relative;overflow:visible}.reply_result .nickname:before{content:\" \";position:absolute;left:-0.4em;top:50%;margin-top:-7px;width:3px;height:14px;background-color:#02bb00}.rich_tips.discuss_title_line{margin-top:50px}.icon_discuss_top{display:inline-block;vertical-align:middle;padding:1px .5em;border:1px solid #bdbdbd;color:#bdbdbd;border-top-left-radius:.7em 50%;-moz-border-radius-topleft:.7em 50%;-webkit-border-top-left-radius:.7em 50%;border-top-right-radius:.7em 50%;-moz-border-radius-topright:.7em 50%;-webkit-border-top-right-radius:.7em 50%;border-bottom-left-radius:.7em 50%;-moz-border-radius-bottomleft:.7em 50%;-webkit-border-bottom-left-radius:.7em 50%;border-bottom-right-radius:.7em 50%;-moz-border-radius-bottomright:.7em 50%;-webkit-border-bottom-right-radius:.7em 50%;font-size:12px;line-height:1;margin-top:-1px;margin-left:.5em}@media screen and (device-aspect-ratio:2\/3),screen and (device-aspect-ratio:40\/71){.icon_discuss_top{font-size:11px;line-height:1.1;padding-top:0}}.reward_area{padding:38px 0 20px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.reward_inner{position:relative}.reward_area_inner{margin:0 auto;position:relative;left:3px}.reward-avatar{display:inline-block;width:50px;height:50px;margin:0 auto;border-radius:50%;overflow:hidden}.reward-avatar img{width:100%;height:100%!important;object-fit:cover}.reward-author{font-size:16px;color:#000;text-align:center;margin-top:10px;line-height:1}.reward_access{display:inline-block;padding:0 1.6em;line-height:2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:16px;background-color:#dc5d4a;color:#fff;-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_access:active{background-color:#be5041;color:#e69990}.icon-reward{display:none;width:17px;height:18px;vertical-align:-2px;background-image:url(\"data:image\/svg+xml,%3Csvg width='19' height='20' viewBox='0 0 19 20' xmlns='http:\/\/www.w3.org\/2000\/svg'%3E%3Ctitle%3Eicon reward%3C\/title%3E%3Cdesc%3Ewechat reward.%3C\/desc%3E%3Cg fill='none'%3E%3Cpath d='M14.313 7.261l-.032-.004c-.462-.066-.712-.364-.824-.711-.042-.13-.06-.253-.068-.398-.009-.151-.008-.235.001-.645.022-.999-.015-1.624-.194-2.298l-.121-.386-.035-.118c-.044-.196-.184-.549-.437-.895-.44-.602-1.044-.918-1.951-.846-.963.076-1.397.848-1.406 2.11v.009c-.006.908-.022 1.375-.093 1.972-.169 1.421-.593 2.49-1.473 3.132-.617.45-1.61.688-2.962.826-.984.101-1.996.129-2.824.12l-.072-.001c-.153 0-.759.697-.759.95l-.11 7.776c-.044.569.331.917.869.917h10.741c1.054 0 1.88-.147 2.786-.693.52-.314.988-.738 1.396-1.294 1.321-1.803 1.5-3.456 1.085-7.244-.107-.982-1.029-1.976-2.161-2.132l-1.357-.145z' stroke='%23FAFAFA' stroke-width='1.9'\/%3E%3Cpath d='M9.241 15.058l-.184.044c-.153 0-.286-.084-.356-.208l-.027-.058-1.994-2.273-.02-.085c-.065-.243.221-.556.463-.476l.122.04 1.496.998c.096.063.211.099.334.099l.209-.037 4.601-3.524c.543-.148.661.002.426.529l-5.027 4.926-.045.026z' fill='%23FAFAFA'\/%3E%3C\/g%3E%3C\/svg%3E\");background-repeat:no-repeat;-webkit-background-size:contain;background-size:contain;margin-right:.5em}.reward_button{display:inline-block;margin-top:30px;padding:0 1.6em;line-height:2.2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:16px;border:1px solid currentColor;color:#fd6143;-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_button:active{color:#f46f56}.reward_button:before{content:\" \";width:17px;height:17px;display:inline-block;background:transparent url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAFNQDtUAAAABGdBTUEAALGPC\/xhBQAABglJREFUWAm1V3uIVUUY\/75z73pzdbOHhprmSmlBtkEkUffebctMxAi1pAfB3t3VhR6CaUoUPqIH\/SEJGmU+dq+gpRY9IK0Uxdy7+YcU9DDKQoxws3yVsbru3j1fv5lzZ84597kKDdydb77X\/M7Mb76ZJco1aYq\/ZGTHCOTSMkklXldjR1LJVdIYd3lTJ2N8SFoabiBY\/1BWGC7ofl5iIktjchmRa\/PlIpQdnqn4Zk\/K\/4scIq3JUdqreeroaCjOcfuROC4mKmQ0Sp0ilVgoK1b4H2GMOm8q3i7N8elaVvOZjNKY+Nk4SnPiVs8hkbW6VHyBwt5tFPm9zVRgKBOk1u0LFRCMDiNnuic\/YzSkEKrSY6bTOkuMxwUXahcWalowQDsF51NGbO5i46RsoSmwNic43THCOKg+BJI3ZaxRUg03EfM3QQzBQILxe05n6hSJSjZQKA4KZXwH7sYsQ\/2xJ4Vg5BuRYK3SKap4dJEh+NB5+X4VktAkQP47HCSTw2NMohQgyA4SvhPSlWEHPgz4NwZ10jLtKnLPJcl1P1Z6jRLn6TsSucWDG3QPy1jlkUR9xzjdGTEWvadMD2Hv5HKjDPZI3onxFZhgEOar5fQ+RR2bwPoKDwcjEx6frHZgAiY5YNilOHABYYPIiUypGC7uSBJ6AehvVr5mCcrzZPucCO3o+gnuQ2iQTOX1nYeKTVQ+iSkCJjJSfS237e4yQ9NX4glA8PMGNrnnfzSBwX4ASegvL4APY6eGBYONXDKJiOQ+1flNOzP9YILy+5JJqKn+GeXM7fv3ekHSp3p5ds5gb+z\/LZpEWlurSNzVvhskdubr8emuc4of+B00dgada0myB4mlGhyoNgbdD46N4bV7jwV1MjdZR32yFJgexqK\/gXqyqLDgMHXB+Da3Z14JBitZmhIPQP+plnPbr3bOq3vsNKHepZWxVAP8L2FLWzvTUSCvVWNvTVgU9W2TuQ1j7AACzlcW6N4BinZfz96uQeEhkXASytJJtXhYzeeQYiU5PIfbOz7wE6jM\/on2kIgTQoJj30PRqgleAmdmQQKdTRImqYckkocEVt6471fVGcdgr4mYQg6mT5TeQ+JGQkiCAUXlVPKU1rdnZqk+tyb9ddJUrypX6Sb9qGrOZJDwVbUgIN+TzKwfD14SkjfJ7S+dwFpcT4pG7uaN+\/cbddFvNsZKPUrkBpzsliJ+vUD6CLinb4Qi9gKVt64F6soKXFWrLQjmb3WJdpyF4KRXssX9CEDXVc7keVwyEGwOrvpcE3pLVR1QchWAjAV7vPUXmafPvPEr0186EKHhNm9E7I0PMCeg\/9za+uVBK5cRLgmItN57PRh7nc0rkQNW1gJ3B8Y1AbmkmGN8SXuBQeZPj9HZfz+0Buat2Jbf7dgT\/PvNlSUoS0uwlWdQwgHYeZ9qhr7Haz4LnfeSp0bUNb731Ejq7R2P91MtVgBnl2aBoGPtpMy7Uefvt+OAAKI2wHcNVJMCal9kPkLDq+t45S69eixPT7maunvw1qLRvlcZyTsVmykae5E37PmzjGdRk\/rnCcVogTYyH6f2jtGqIKlLS12Dt+cM63H+t6JYZuH8D4lzGj+8vVGwL6LJioYoHe17DSGLkOsxbuvcHgzHap3Hal2mdRFOclsmA47gBaVKpdc6\/MvfqAbeS0t9PfW72wDiGlxRTZgA5bhoUxy6TVtcVlsHIEwxi8MpvHWCaVDEloIvyxGzkmpqlivCSet9w6i3J40vnElZN0uO8wQ+ZlswrlD2jzviNFgHQsw65t2hVp8T8A5\/mWJRvMlpNp0926Mv6QvnUUNkBkV4Nh7\/VZVBIFponM3NdEbJamsAJLc1+S8C6+0LvG7fSYwm4pa8CzzaitV5yjx2fK\/SEsj6KOJQh1Tjkzh17yoJW4MVMRRxBn6X48u\/Qrxf1FS2Cg0kfRwgtlg3pmYjRwEisDXlOWKCLrZXT0TM0wYajPBiWb0X7sBqfG1y4fgmjmBrxhvF\/9sDgMOL9eWYN1GUZoyaQDuPLwTaRgDyq2ae40UN9YtJenDCfkHOgyDyTtrYsce8pIrl+g89bFNOD\/AegwAAAABJRU5ErkJggg==') 0 0 no-repeat;background-size:17px 17px;vertical-align:-3px;margin-right:4px}.reward_tips{margin-bottom:5px}.reward_user_tips{margin-top:2em}.reward_user_list{padding-top:.5em;overflow:hidden}.reward_user_avatar{display:inline-block;vertical-align:top;width:28px;height:28px;margin:0 6px 6px 0}.reward_user_avatar img{width:100%;height:100%!important}.reward_user_avatar.readmore{-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_qrcode_area{margin:38px 0 20px;padding:30px 20px;font-size:14px;border:1px solid #ebebeb}.reward_qrcode_area p{word-wrap:break-word;word-break:break-all}.reward_qrcode_area .tips_global{font-size:13px}.reward_qrcode_area .reward_money{font-size:30px;margin-top:.6em;margin-bottom:-0.1em;line-height:1;font-family:\"WeChatNumber-151125\"}.reward_qrcode_area .reward_tips{margin-top:1em;margin-bottom:0}.reward_qrcode_img_wrp{width:200px;height:200px;background-color:#fff;display:block;margin:1.5em auto 1.6em}.reward_qrcode_img{width:100%;height:100%;display:block}@font-face{font-weight:normal;font-style:normal;font-family:\"WeChatNumber-151125\";src:url('https:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/assets\/WeChatNumber-170206.ttf') format('truetype')}@media(min-device-width:414px){.reward_qrcode_area .tips_global{line-height:1.8}.reward_qrcode_area .reward_money{margin-top:.6em}.reward_qrcode_area .reward_tips{margin-top:1.2em}.reward_qrcode_img_wrp{width:224px;height:224px;margin:1.8em auto}.reward_access{line-height:44px;font-size:17px}.icon-reward{width:19px;height:20px;vertical-align:-3px}}.reward_area_primary .reward-avatar{border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px}.reward_area_primary .reward-author{margin-top:15px;font-size:17px}.rich_media_extra{position:relative}.rich_media_extra .extra_link{display:block}.rich_media_extra img{vertical-align:middle;margin-top:-3px}.rich_media_extra .appmsg_banner{width:100%}.rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.btn_default.btn_line,.btn_primary.btn_line{background-color:#fff;color:#04be02;border:1px solid #04be02;font-size:15px}.rich_media_extra .extra_link{position:relative}.promotion_tag{background-color:rgba(0,0,0,0.51);position:absolute;display:block;height:20px;line-height:20px;font-size:14px;font-style:normal;color:#fff;padding-right:6px;text-align:right;right:0;bottom:0}.promotion_tag:before{content:'';width:14px;height:20px;position:absolute;top:0;right:100%;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_primary2c7543.png) no-repeat 0 0;-webkit-background-size:79px 20px;background-size:79px 20px;overflow:hidden}.brand_logo{position:absolute;display:block;width:24%;right:1.54%;top:0}.brand_logo img{width:100%;vertical-align:top;max-height:35px}.top_banner{background-color:#fff}.top_banner .rich_media_extra{padding:15px 15px 20px 15px}.top_banner .rich_media_extra .extra_link{position:relative;padding-bottom:10px}.top_banner .rich_media_extra .extra_link:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #d6d6d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.top_banner .rich_media_extra .extra_link:active,.top_banner .rich_media_extra .extra_link:focus{outline:0;border:0}.top_banner .rich_media_extra .appmsg_banner{width:100%;vertical-align:top;outline:0}.top_banner .rich_media_extra .appmsg_banner:active,.top_banner .rich_media_extra .appmsg_banner:focus{outline:0;border:0}.top_banner .rich_media_extra .promotion_tag{height:19px;line-height:19px;width:69px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_small24a2fe.png) no-repeat 0 0;font-size:12px;-webkit-background-size:69px 19px;background-size:69px 19px;bottom:10px;padding-left:6px}.top_banner .rich_media_extra .brand_logo{width:20%;right:2.22%}.top_banner .rich_media_extra .brand_logo img{max-height:35px}.top_banner .rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.top_banner .rich_media_extra .ad_msg_mask img{position:absolute;width:16px;top:50%;margin-top:-8px;left:50%;margin-left:-8px}.top_banner .preview_group.obvious_app{min-height:54px;position:relative}.top_banner .preview_group.obvious_app .pic_app{width:66.6%}.top_banner .preview_group.obvious_app .pic_app img{height:100%;min-height:54px}.top_banner .preview_group.obvious_app .info_app{width:33%;left:68%}.top_banner .preview_group.obvious_app .info_app .name_app{line-height:18px;font-size:13px}.top_banner .preview_group.obvious_app .info_app .profile_app{font-size:10px}.top_banner .preview_group.obvious_app .info_app .dm_app{bottom:5px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn{font-size:12px;padding-left:17px;line-height:16px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{-webkit-background-size:14px 14px;background-size:14px 14px;background-position:0 center;-webkit-background-position:0 center}.top_banner .preview_group.obvious_app .info_app .dm_app .extra_info{display:none}.appmsg_card_btn.with_processor .btn_processor{background-color:#576b95}.da_btn_more.with_processor .btn_processor{background-color:#576b95}.with_processor{position:relative;overflow:hidden}.with_processor .btn_processor{display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:#04be02}.with_processor .btn_processor_value{position:relative}.wrp_preview_group{padding-top:100px}.preview_group{position:relative;min-height:83px;background-color:#fff;border:1px solid #e7e7eb;-webkit-text-size-adjust:none;text-size-adjust:none}.preview_group.fixed_pos{position:fixed;bottom:0;left:0;right:0}.preview_group .preview_group_inner{padding:14px}.preview_group .preview_group_inner .preview_group_info{padding-left:68px;color:#8d8d8d;font-size:14px}.preview_group .preview_group_inner .preview_group_info .preview_group_title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;color:#000;font-weight:400;font-style:normal;padding-right:73px;max-width:142px;display:block}.preview_group .preview_group_inner .preview_group_info .preview_group_desc{padding-right:65px;display:inline-block;line-height:20px}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar{position:absolute;width:55px;height:55px;left:13px;top:50%;margin-top:-27px;z-index:1}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar.br_radius{border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%}.preview_group .preview_group_inner .preview_group_opr{position:absolute;line-height:83px;top:0;right:13px}.preview_group .preview_group_inner .preview_group_opr .btn{padding:0;min-width:60px;min-height:30px;height:auto;line-height:30px;text-align:center}.preview_group.preview_card .card_inner{padding:0;min-height:89px}.preview_group.preview_card .card_inner .preview_card_avatar{position:absolute;width:89px;height:89px!important;margin:0;left:0;top:0}.preview_group.preview_card .card_inner .preview_group_info{padding:10px 12px 0 106px}.preview_group.preview_card .card_inner .preview_group_info .preview_group_title2{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;padding-right:0;display:block;color:#3e3e3e;font-weight:400}.preview_group.preview_card .card_inner .preview_group_info .preview_group_desc{padding-right:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3}.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_desc,.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_title{padding-right:68px;width:auto}.preview_group.preview_shop_card .shop_card_inner{padding:0;min-height:96px}.preview_group.preview_shop_card .preview_card_avatar{position:absolute;width:96px;height:96px!important;margin:0;left:0;top:0}.preview_group.preview_shop_card .preview_group_info{padding:10px 12px 0 111px}.preview_group.preview_shop_card .preview_shop_card_title{display:block;color:#3e3e3e;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3;font-size:15px}.preview_group.preview_shop_card .preview_shop_card_desc{color:#8c8c8c;position:absolute;bottom:6px;left:111px;right:12px}.preview_group.preview_shop_card .preview_shop_card_price{font-size:16px;color:#3e3e3e}.preview_group.preview_shop_card .preview_shop_card_oldprice{text-decoration:line-through;color:#8c8c8c;font-size:13px;margin-bottom:-0.5em}.preview_group.preview_shop_card .preview_shop_card_price,.preview_group.preview_shop_card .preview_shop_card_oldprice{display:block}.preview_group.preview_shop_card .preview_shop_card_btn_buy{float:right;line-height:1.75;font-size:16px;padding:0 .8em;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;margin-top:1px}.preview_group.obvious_app{width:100%}.preview_group.obvious_app .preview_group_inner{padding:0}.preview_group.obvious_app .pic_app{width:58.3%;height:100%;display:inline-block;margin-right:2%;vertical-align:top}.preview_group.obvious_app .pic_app img{width:100%;vertical-align:top;margin-top:0}.preview_group.obvious_app .info_app{display:inline-block;width:38%;color:#8a8a8a;font-size:12px;box-sizing:border-box;-webkit-box-sizing:border-box;position:absolute;left:62%;top:0;height:100%}.preview_group.obvious_app .info_app .name_app{color:#000;font-size:15px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;margin-top:3px}.preview_group.obvious_app .info_app .profile_app{line-height:10px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.obvious_app .info_app .profile_app span{padding:0 5px}.preview_group.obvious_app .info_app .profile_app span:first-child{padding-left:0}.preview_group.obvious_app .info_app .profile_app em{font-size:9px;line-height:16px;font-weight:400;font-style:normal;color:#dfdfdf}.preview_group.obvious_app .info_app .dm_app{line-height:20px;vertical-align:middle;position:absolute;left:0;bottom:5px}.preview_group.obvious_app .info_app .dm_app .ad_btn{display:block;color:#04be02;font-size:15px;padding-left:22px}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_download@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_install@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_installed@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;color:#8a8a8a;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_open@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app p{line-height:15px}.preview_group.obvious_app .info_app .dm_app .extra_info{font-size:9px}.preview_group.obvious_app .info_app .grade_app{height:11px;line-height:11px;font-size:12px;color:#888}.preview_group.obvious_app .info_app .grade_app .stars{display:inline-block;width:55px;height:11px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/star_sprite25624b.png) no-repeat 0 0;-webkit-background-size:55px 110px;background-size:55px 110px}.preview_group.obvious_app .info_app .grade_app .stars.star_half{backgroud-position:0}.preview_group.obvious_app .info_app .grade_app .stars.star_one{background-position:0 -11px}.preview_group.obvious_app .info_app .grade_app .stars.star_one_half{background-position:0 -22px}.preview_group.obvious_app .info_app .grade_app .stars.star_two{background-position:0 -33px}.preview_group.obvious_app .info_app .grade_app .stars.star_two_half{background-position:0 -44px}.preview_group.obvious_app .info_app .grade_app .stars.star_three{background-position:0 -55px}.preview_group.obvious_app .info_app .grade_app .stars.star_three_half{background-position:0 -66px}.preview_group.obvious_app .info_app .grade_app .stars.star_four{background-position:0 -77px}.preview_group.obvious_app .info_app .grade_app .stars.star_four_half{background-position:0 -88px}.preview_group.obvious_app .info_app .grade_app .stars.star_five{background-position:0 -99px}.preview_group.download_app_with_desc{border:0;color:#fff;font-weight:400}.preview_group.download_app_with_desc .preview_group_inner{position:relative;background-repeat:no-repeat;background-position:center;background-size:cover;height:100%;width:100%;box-sizing:border-box;padding:0;overflow:hidden}.preview_group.download_app_with_desc .preview_group_hd{position:relative;z-index:9;width:24%;text-align:center;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;display:box;box-orient:horizontal;box-pack:center;box-align:center;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;height:100%;float:right;margin-right:2.875%}.preview_group.download_app_with_desc .preview_group_hd .preview_card_avatar{width:45%;height:45%!important;margin:0;border-radius:18%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{display:block;font-weight:400;font-size:12px;padding-top:4%;padding-bottom:8%;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{display:block;margin:0 auto;font-size:14px;padding:6.5% 0;line-height:1;width:72%;text-align:center;border:1px solid #fff;border-radius:5px;color:#fff;-webkit-tap-highlight-color:transparent}.preview_group.download_app_with_desc .preview_group_hd_inner{-webkit-box-flex:1;-webkit-flex:1;flex:1}.preview_group.download_app_with_img .preview_card_avatar{box-shadow:0 -1px 2px rgba(0,0,0,0.2)}.preview_group.download_app_with_desc{overflow:hidden}.preview_group.download_app_with_desc .preview_group_bg{width:100%;height:100%;position:absolute;background-repeat:no-repeat;background-position:center;background-size:cover;z-index:0;-webkit-filter:blur(30px);-moz-filter:blur(30px);-o-filter:blur(30px);-ms-filter:blur(30px);filter:blur(30px)}.preview_group.download_app_with_desc .preview_group_bd{position:absolute;left:2.875%;right:26%;top:46%;transform:translateY(-50%);-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);text-align:center}.preview_group.download_app_with_desc .preview_group_ft{position:absolute;left:2.875%;right:26%;bottom:26%;transform:translateY(50%);-webkit-transform:translateY(50%);-moz-transform:translateY(50%);-ms-transform:translateY(50%);text-align:center}.preview_group.download_app_with_desc .preview_group_desc{display:block;font-size:17px;line-height:1.5;width:12em;margin:0 auto;overflow-x:hidden;white-space:nowrap}.preview_group.download_app_with_desc .preview_group_download_info{display:inline-block;font-size:9px}.preview_group.follow .preview_group_inner .preview_group_info .preview_group_desc{display:block}.preview_group.follow.with_tips .preview_group_desc{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.follow .weak_tips{color:#bbb}.btn_plain_primary{color:#04be02;border:1px solid #04be02}.btn_plain_primary:active{border-color:#039702}.mpda_card .btn{padding:0;font-size:15px}.mpda_card .btn_inline{width:4em;line-height:2}.mpda_card .cardticket_hd{background-color:#fff;border-top-left-radius:5px;-moz-border-radius-topleft:5px;-webkit-border-top-left-radius:5px;border-top-right-radius:5px;-moz-border-radius-topright:5px;-webkit-border-top-right-radius:5px;border:1px solid #ececec;border-bottom-width:0}.mpda_card .cardticket_hd .radius_avatar{width:45px;height:45px}.mpda_card .cardticket_hd .cell_hd{padding-left:12px}.mpda_card .cardticket_hd .cell_bd{font-size:17px;padding-left:.5em}.mpda_card .cardticket_hd .cell_ft{padding-right:10px}.mpda_card .cardticket_ft{position:relative;margin-top:10px;padding:.35em 12px;font-size:12px;background-color:#fff;border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;-webkit-border-bottom-left-radius:5px;border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;-webkit-border-bottom-right-radius:5px;border:1px solid #ececec;border-top-width:0}.mpda_card .cardticket_theme{position:absolute;top:-10px;left:8px;right:8px;height:10px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle290773.png) no-repeat 0 0;background-repeat:repeat-x;-webkit-background-size:10px auto;background-size:10px auto}.mpda_card .cardticket_theme:before{content:\" \";position:absolute;left:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_left290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}.mpda_card .cardticket_theme:after{content:\" \";position:absolute;right:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_right290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}@media(max-width:354px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:16px;line-height:1.4}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{padding-top:3%;padding-bottom:6%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{font-size:13px}}@media(min-width:400px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:18px}}.wx_flex_layout{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.wx_flex_ft{text-align:center}.mod_follow_with_img .wx_flex_ft{width:32%}.mod_follow_with_img .fwi_thumb{margin:0;display:block;width:100%}.mod_follow_with_img .radius_avatar{width:35px;height:35px;padding:0}.mod_follow_with_img .radius_avatar img{margin:0}.mod_follow_with_img .fwi_nickname{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;display:block;margin:.2em 1em .5em;font-weight:400;font-size:12px;color:#8c8c8c}.mod_method117 .wx_flex_ft{width:30.435%}.mod_method117 .fwi_thumb{margin:0;display:block;width:100%}.mod_method117 .radius_avatar{width:35px;height:35px;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;padding:0}.mod_method117 .radius_avatar img{margin:0;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px}.mod_method117 .fwi_nickname{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;display:block;margin:.3em 1em .5em;font-weight:400;font-size:12px;color:#8c8c8c}.wx_min_plain_btn{display:inline-block;vertical-align:middle;padding:0 .85em;line-height:1.6em;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px}.wx_min_plain_btn.primary{color:#1aad19;border:1px solid #1aad19}.wx_min_plain_btn.primary:active{color:rgba(26,173,25,0.6);border-color:rgba(26,173,25,0.6)}.wx_min_plain_btn.ba_btn{color:#576b95;border:1px solid #576b95}.wx_min_plain_btn.ba_btn:active{color:#576b95;border-color:#576b95}.btn_progress{position:relative;overflow:hidden}.btn_progress.primary:active{color:#1aad19;border-color:#1aad19}.btn_progress.ba_btn{color:#576b95;border:1px solid #576b95}.btn_progress.ba_btn .btn_progress_bd{width:57px;position:absolute;top:0;left:0;color:#fff;background-color:#576b95;text-align:center;display:block;height:100%;max-width:initial!important}.btn_progress_inner{position:absolute;left:0;top:0;bottom:0;overflow:hidden;-webkit-transition:width 1s;transition:width 1s}.with_processor .btn_progress_inner{right:0;height:100%}.with_processor .btn_progress_bd{height:100%}.btn_progress_bd{position:absolute;top:0;left:0;color:#fff;background-color:#1aad19;text-align:center}.icon26_weapp_white{display:inline-block;width:14px;height:14px;background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAY1BMVEVHcEz\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/80LMUcAAAAIHRSTlMAfBg4AeNjmS\/2\/PDnrcyG1Qt1az8ys4MhUcLc6UWcl7QkidAAAADFSURBVHhetdFJqsMwEEVRWZ0luYm79E5y97\/Kz6cQQXaATPJGDw4UpZL6OuN8a+O9vuzFOACIk91IiORUpdgB6Pz13EAyBT0A\/1+0g66gCnppHtaCXvCUyQvEgmqopR1g+Ei2SnBQkuNs3hR6oNXynBMknWl0QBNEGsCNmTRwEtEt0If3wGU6qrwNqbLFhjlD3mZPERZpT3gVtIKX1m8P3oHTcjh4FGQSNOer74Bh84MVOTGoMnaKIs6oXS71Pa63eVS\/zR\/btROXGlgZggAAAABJRU5ErkJggg==);background-size:cover;background-repeat:no-repeat;vertical-align:middle;margin-right:-2px}.da_area{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fcfcfc;border:1px solid #ebebeb;-webkit-user-select:none;user-select:none;font-size:17px}.da_area .da_inner{position:relative;width:100%;transition:opacity .6s;-webkit-transition:opacity .6s}.da_area .da_bd{padding:8.5px 10px;width:100%;position:relative;border-top:1px solid #ebebeb;box-sizing:border-box;white-space:nowrap;display:flex;justify-content:space-between;align-items:center}.icon26_weapp_blue{display:inline-block;width:12.5px;height:12.5px;background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ\/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF\/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy\/Td6GRD\/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ\/kOb7rnhO9AtOOdpnjHkyO6448\/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA\/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU\/hWz9SCYNwwojpZsX4zaqU5bItDp\/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9\/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A\/k2uEje\/oyrcTfoBtANQk\/d6iE\/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl\/cVVBnEptgppxGzumgpkDA3bQiW\/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH\/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe\/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r\/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO\/RwlGY+ISbg\/L85q8KwuGOueX8ke6AlIUHX1CJ+7l\/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==);background-size:cover;background-repeat:no-repeat;vertical-align:middle;margin-right:4px;position:relative;top:-0.5px}span.img_bg_cover{background-repeat:no-repeat;background-position:center center;background-size:cover}.ct_mpda_wrp{margin:38px 0 20px}.ct_mpda_area{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fcfcfc;border:1px solid #ebebeb;-webkit-user-select:none;user-select:none}.ct_mpda_placeholder{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:100%}.ct_mpda_tips{color:#d8d8d8;text-align:center;font-size:15px}.ct_mpda_inner{position:relative;width:100%;opacity:0;transition:opacity .6s;-webkit-transition:opacity .6s}.ct_mpda_area.show .ct_mpda_inner{opacity:1}.ct_mpda_main_img{width:100%;min-height:100px;display:block}.ct_mpda_hd .page_video{min-height:0}.ct_mpda_bd{width:100%;position:relative;border-top:1px solid #ebebeb;box-sizing:border-box;white-space:nowrap}.ct_mpda_logo{width:35px;height:35px;display:inline-block;margin:15px 10px;vertical-align:middle;border-radius:50%;overflow:hidden}.ct_mpda_desc_box{font-size:0;display:inline-block;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;margin-left:-60px;padding-left:55px;padding-right:80px;box-sizing:border-box;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.ct_mpda_btn_more{position:absolute;right:10px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);display:inline-block;color:#576b95;font-size:13px;border:1px solid #576b95;border-radius:3px;line-height:2.2;padding:0 .75em}.ct_mpda_btn_more:active{border-color:#354567;color:#354567;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_title{font-size:14px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ct_mpda_details{display:inline-block;vertical-align:top;font-size:12px;color:#878787;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_details:after{content:'';display:inline-block;width:4px;height:4px;border-width:0 1px 1px 0;border-style:solid;border-color:#878787;-webkit-transform:rotate(45deg) translateY(-3px);transform:rotate(45deg) translateY(-4px);margin-left:3px}.ct_mpda_btn_about{display:none;font-size:13px;line-height:2.8;padding:0 1em;background:#fff;color:#576b95;border:1px solid #dfdfdf;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);border-radius:3px;position:absolute;bottom:-28px;left:55px;z-index:9;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_btn_about:active{background-color:#ececec}.db{display:block}.qqmusic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.qqmusic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.qqmusic_area .pic_qqmusic_default{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;width:37px;height:37px;display:none}.qqmusic_area.unsupport .unsupport_tips{display:block}.qqmusic_area.unsupport .pic_qqmusic_default{display:inline-block}.qqmusic_area.unsupport .icon_qqmusic_switch{display:none}.qqmusic_wrp{border:1px solid #ebebeb;line-height:1.6}.qqmusic_bd{position:relative;background-color:#fcfcfc;overflow:hidden}.qqmusic_ft{text-align:right;background-color:#f5f5f5;border-top:1px solid #ebebeb;line-height:2.5;overflow:hidden;font-size:11px;padding:0 .5em}.play_area{float:left;width:60px;height:60px;margin-right:12px;position:relative}.qqmusic_thumb{display:block;width:60px;height:60px!important}.access_area{display:block;color:#8c8c8c;min-height:60px;overflow:hidden;margin-right:10px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.qqmusic_songname,.qqmusic_singername{display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.qqmusic_songname{padding:7px 0 3px;margin-bottom:-4px;font-size:16px;color:#3e3e3e}.qqmusic_singername{font-size:14px;margin-right:20px}.qqmusic_source{position:absolute;right:6px;bottom:6px}.qqmusic_source img{width:13px;height:13px;vertical-align:top;border:0}.qqmusic_love{position:relative;float:right;margin:10px 0 0 10px;height:54px;color:#607fa6;width:53px;text-align:center;font-size:13px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png) no-repeat 0 0}.qqmusic_love:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.qqmusic_love .icon_love{margin-top:16px}.qqmusic_love .love_num{display:block}.icon_qqmusic_switch{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;line-height:200px;overflow:hidden;cursor:pointer;width:37px;height:37px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAADeCAMAAACt+WYWAAABPlBMVEUAAAAAAAD\/\/\/8vLy\/09PT\/\/\/\/\/\/\/\/+\/v5xcXH\/\/\/9ZWVn5+fm7u7slJSXm5ub\/\/\/\/\/\/\/\/\/\/\/9tbW0WFhb\/\/\/+ioqL\/\/\/\/\/\/\/\/\/\/\/9lZWVGRkb\/\/\/\/\/\/\/\/\/\/\/\/39\/f\/\/\/\/X19efn5+cnJyUlJT\/\/\/\/p6en9\/f37+\/v\/\/\/\/\/\/\/+AgID\/\/\/\/\/\/\/\/\/\/\/\/c3Nz\/\/\/92dnbBwcH\/\/\/\/w8PD\/\/\/\/\/\/\/\/Ly8vFxcX\/\/\/\/\/\/\/\/\/\/\/9eXl7\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/6+vpCQkLt7e3f39\/\/\/\/+FhYW\/v7+0tLT\/\/\/\/\/\/\/\/\/\/\/\/R0dH\/\/\/\/Ozs62trZqamr\/\/\/\/\/\/\/9JSUn\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/g4OCqqqqnp6fw8PDw8PD\/\/\/\/Hx8fDw8O4uLj\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/9lS7ogAAAAaXRSTlNmAPty7u0F94oHgfS1b93hvROIayal8d2fhXpTSALy0s6ioZyT4fv4uqqSkGc505aNuurpzsjDvrSbjIJwbGNYGxT3eeXW1JS4seTYycfFxbGIh4F7d05APDMiDNaqqOroysC8s62CWy61f9DEAAAGCUlEQVR42qzY50IaQRSG4cMu7NKkiYACgopi771rNMbEmGI3vee9\/xuIGhOUsmyZ7x9\/HpZhduacIz6rJAvrleGn8YCmzWbnR0620j6LtKZC55US9Ymv5ENOqYuVAKANvnw9kAo\/0fWetemupfdVIFC5ckAZv0rAp2ejHVKXYHQPSFzapTazEFl6I83zZrEKid92qKsF8H\/olNbRZ0y0t6F2VKiiEemSNtEXITthTaXn0RZ1aZ\/pObRxKyqfwR8UW+l8BTmjJbUBk7rYTdcQy6EW1FuIioMEd0m8e0zVpI\/iKN0REkYTagMGxGHCEXKNVB4+iuMEhzipp9IZouIiA2gXj6nQPJPiKjM8Tz6iKvh1d1TnID8eUleaFhSXCZsUHlALLIrrRHlh\/Kc2iejuqU4\/6\/8oI0uXeMgAs6F76hd+8ZTPjN9TJT54o7rIFu+oCyKd3qjOXgp31ApLrb+vGpu2tU9zt1QowBtplV3gld7+iCATuqHO+SQtA0Ckr601R\/6GqvCsDQWxcBvqGZUbqsRoWwrtmfU\/M0rJJ0m0jvYU+A+sqA6NHSkwKHYomHwirTNIQdZ5aZOiarGTX7IuU7y2S8Fey6PoNVMyzIBtymKTDTAsT0k5oejtl2ZJ8VTihB1REGu2\/GHiEuCJQ4qyNOYJAdHQVVA6mgsqpregZulRsew9zEqWNRWbYY2szDOtYotOMy8jdNmlqodWx\/uInLCk4nVe4qds8V68HzLyni1JU7VBaTNtLqUqafHFCXo\/kIPEfeJbIer9mvhO7obKsyctE7F3eckeW+3uwY\/VwWkRu\/egr8KieMxXVny31BVV3ZvUscvEHeVLMOONinJ8XxRdYuoeH6pwT\/kS3lbrG198\/6jfGtPupTWNy1qF\/JY599VajJyvRoWyvHK\/5oHkA8o3obktkkc1zh+3S+MMBd1IPb2s1jdxOXa7nUv6HMdGPWUsEwk73lGDvEg2dqmhBJGgw2ca5Pl2s975XYKhAUfrNMfzdPOO3sjBjP39NdrLi+2WI4sTjUG7CxbVOE5aDFIunmNG7TzYWgxWDcvxTvIH+NuuWMc3jcB526FT4QV87uq0gqIRyCVtjMKM9VnonWm1Ybu\/7sKXS5sDutB4FphrNqD7vgccFxyMDYuFXKZxbLhfBTIrE46HmfnKU+oTz21ZDDOtslNYn6qNWH86HrHWYkxsri6XbqVAvLS8ujlhuKPSZ8MmdTGHz9JOqeTGEYC\/HO0PhntuVj0c7I+W\/QBHG0kH1PaYCUPlvlOpy2lfeQjMsW2b1M6UBrG+jhZbvS8G2tSODao4HoDJlGVdNgmB8WI76noBYt1ti6AYLFxbU\/lMrV2wTH8vmbwFVRyDfV1sRd+HsWIryhhBOxTbOdQYMZpT7xKYB+IgB2aLaa2RIJISR0k1n9YWR1xcqeEII8UGagwzJY6TMhmrp\/JoB+IiBxr5x9R1hkNxlUMy1w+p4gL74jL7LBQfUOP06m4pvZfxGrUToF9cp5\/Azn9qiph4SIypf9S2RrcXqhtt+54aY1I8ZZKxv1TSJOWNCmIm76gNYuIxMTbuqCOaN7R+APA3fGpMH0e3VJqhDstuvuFTYzqGSN9QZ5TFKyVlzm6oYfq8U30M+8QwOfVOnWIaMoFfvFPiZ0I2KaugymzKKlEVVJRVWaZfBdXPspQIqqCClCRO2CtVG7H2qKB6aiNWr5SOppBS+AMVLrvCzaBwiyp8cRS+zgoPGYVHn7oDWeE1ofDyUnelKrzoFZUfKcykuqJIYammroBUWNaqK7YVtgDqGhN17ZK6Jk5ha6mu4VXXhqsbDqgbWSgbpKgb7ygYOqX+tGvHJgDDQBRDG0\/jzbz\/AikVSMBghVS6AVTa8HmMTl9OYX6g+3029GOmn1iztdnabG22Nlubrc3WutLe1nLa1s6xHjfmka2ldG8d2dr1ehtbq1PYWpvC1uoUtlansLU6ha3VKWytTmFrdQpba1MMvz6FrdUpbK1OYWt1ClurU9hancLW6hS21qewtfpBxtb6bwJbuzlpa7lsbbY2W5utzdZma7O1e1t7AVSPynzIx\/HfAAAAAElFTkSuQmCC) no-repeat 0 0;-webkit-background-size:37px auto;background-size:37px auto}.qqmusic_playing .icon_qqmusic_switch{background-position:0 -74px}.qqmusic_playing_pause .icon_qqmusic_switch{background-position:0 -37px}.icon_love{width:12px;height:12px;vertical-align:middle;display:inline-block;margin-top:-0.2em;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png) no-repeat 0 0;-webkit-background-size:12px auto;background-size:12px auto}.loved .icon_love{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png);background-position:0 -17px}.db{display:block}.icon_share_audio_switch{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAaVBMVEUAAAAarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRlIa6J1AAAAInRSTlMA9wYa38QR7ZJnMK1IIqBsO3fXDbSGQudZz5fKpV0rfbpRlHIjYQAAA35JREFUWMPFWduyqjAMDS0tgtwEFBGv\/P9Hntmh3cWDTYsMs\/Oio3SRy0qapuCU7PXIRdUGQxCFncgfrwzWCb\/l4TCTML\/xbxFlIQariEJ+AZnkwUBKkCdLIZvBQ5olsPw61Uhc4vTOa4Ca39P4IqYWXH2dyw5mWXUs2ez\/8liZVx6YD2bW6wXRzmpesov0U70HxW5azTBmpD1xqJW9uUzfaS0Lp1ms0Nru6Nfv9WPSi8lahT2BKoWyvARPKZUPhLRiduq9ckHaKds6y5pa6XmARXJQutaEP4MzLJTzyJfmk193I2YKiyUdUXcf+OnCdKPO+JqNvxO2kx4YNcr+c2jvjpE7Wv27W4uRS\/C1jFEu3mpdhJyX34PWISY3ByNj\/SxhhZRjfZ0UMkUJt3Bxx08rJU2xbFB16YEZDiG3JSy6sHlXNPbCHIbOVpHiN1VzjBLzKOCkmxjGKld6B4oNbjkiqi3rkJeBNN8jBj7SUEaxyGgnjE1OkS0mHkUAgd5X\/qWF80mWR7PaOY0410GrnHHXVHpSqlZII521RzeXqtpkTkgEEitIiwF1YeLDJgQnIldbgAx5wMBj5z4br+aWB5GdGbxUxGjUp6ESLmxhJsaMFzx+Pi5+VIpN6bTUlcvPfw\/InXlvjO5MjsdE\/ucg6DjxRlEJY4Wb0J1IlnR0ZoXGEHF\/6l1I68d+vj3ho9xH0mO+cjumNiMxvg\/tTOWYcIAkqCl+XjRbtH7CHv4aCQrIQIui3TCxNPyN1BMXfhQFFxCgJ\/yzmYAaTpGgEZpPoOq60GJctfkRaX5IBApRVTNTm\/TvnYHqCEoh6kMzUCuNxnUUpVzkB\/2+\/Pc5iTpT5PdNUx78FrMT6kymqbugmEpxNZU4JXaph7v0GbOGxJQ3SZU+ryINSWT8iAt6skg7txPD1wCJN\/rrQG0nZuNzo54nHQOnNj6zRTtRj5Pe5klu0d7NBGTThvFENhNE20NQS5BtD9GgUdQqyQZtaSuZ4bIr1fUGcmHTCz1SRpJNL9GeE3xNHe35\/CDhRj04DhLzI48b9eI48mxxONvyGLn+wGtsLTY5mm87RFg\/7jhNxh3bD2aANWtHSFsOu7Yfy60fIG4\/6lw\/lN14fOwedJdWXxKD7m1H8u7LAwZMZsn88mCDa46\/v5DZ6OoIhcf7dg7Y7mPalb7XcVEwDEFU+V3H\/QOplcP+ctPpgwAAAABJRU5ErkJggg==) no-repeat 0 0;width:42px;height:42px;vertical-align:middle;display:inline-block;-webkit-background-size:42px auto;background-size:42px auto;overflow:hidden;color:transparent}.icon_share_audio_switch:before{content:\"\u64ad\u653e\u8bed\u97f3\"}.icon_share_audio_switch_accessibility{position:absolute;width:20px;height:20px;left:-9999em}.icon_share_audio_switch_accessibility:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_playing .icon_share_audio_switch{background-image:url(data:image\/gif;base64,R0lGODlhVABUAPfJAButGiKwIe747m7Kbe\/47\/r8+vj7+J3bnB+vHqDcny20LByuG+j16Pz9\/HvPeiOwIk\/ATuT05FLBUTa3Np7bnTm4OCqzKdXv1ff79ySwI8Lowi+1Lj66Pb3mvdvx23nPeaTepMjqyLXktVzEW63hrTW2NEu+So7WjdLu0j66PrzmvKrgqn7QfeL04p\/cnkm+SCiyJ7\/nvmTHYyGwIPn8+fX69d7y3vb69iWxJE2\/TPL58iuzKqzgrHjOeEW8RPT69PH58ZXYlNDtz4bThSyzK+337eb15mLGYdbv1mnJaW\/Lb8bqxja3NeX15V3FXPD48GHGYfP689fw11HAUHzQe3fOd0q+STi4N8rrytPu01\/FXz25PGzKa17FXez37CCvH6ngqaDcoOn26ODz3x6vHZLXkiaxJef150y\/S+Hz4NDt0E\/AT77nvrTjtJfZlnrPeje3N0K7QWvKaoXThLvmu8fqxmXHZIPSg5bZlavgq8\/tz9zx3JzbnI\/WjtHu0Ue9RkS8Q93y3ZTYk6LdovH58FfDV2DGYInUiX3QfIfThmfIZtnw2Dq4OZDXkLrlulDAUIzVi43VjG\/LbsPpw\/n7+XTNc1TBUx6uHcDnv3DLcDG1MN\/y31\/FXsjqx2jJaFPBUi60LS60LljDWHXNdGbIZTS2M6\/hrnfOdke9R9Tv1FbCVWPHYkC6P1rEWbDir0a8RVXCVMnryYvVi4jUiMHowVnDWMvry+v36zO2Mqjfpx2uHGfIZyeyJsDowLHisZHXkZPYk7nluXbNddnw2fv8+4fUhzC1LxqtGf39\/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH\/C05FVFNDQVBFMi4wAwEAAAAh\/wtYTVAgRGF0YVhNUDw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzEyYzBkMi03NGJlLTQ5MTEtYmQyMi1lNmI4ZTlhZmQ5ZGIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkUzMTAyRkEyMjg0MTFFN0JDNzBCMEY5NjNCMDhDQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkUzMTAyRjkyMjg0MTFFN0JDNzBCMEY5NjNCMDhDQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NzEyYzBkMi03NGJlLTQ5MTEtYmQyMi1lNmI4ZTlhZmQ5ZGIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODcxMmMwZDItNzRiZS00OTExLWJkMjItZTZiOGU5YWZkOWRiIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af\/+\/fz7+vn49\/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M\/OzczLysnIx8bFxMPCwcC\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)}.share_audio_playing .icon_share_audio_switch:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_playing .icon_share_audio_switch_accessibility:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_context{background-color:#fcfcfc;padding:14px 15px 6px;font-size:16px;position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_context:before{content:\" \";position:absolute;top:0;left:0;border:1px solid #e0e0e0;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;width:200%;height:200%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0}.share_audio_switch{margin:-10px 15px 0 0;position:relative;z-index:1}.share_audio_info{position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_title{display:block;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;min-height:1.6em;word-wrap:break-word}.share_audio_tips{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;padding-bottom:6px;font-size:12px;color:#8c8c8c}.share_audio_progress_wrp{height:2px;margin-right:7px;position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_progress{height:100%;background-color:#ebebeb;position:relative;width:100%;padding-left:7px;-webkit-box-sizing:initial!important;box-sizing:initial!important}.share_audio_progress_inner{background-color:#09bb07;height:100%;position:absolute;top:0;left:0;z-index:1}.share_audio_progress_buffer{position:absolute;top:0;left:0;bottom:0;background-color:#d9d9d9}@-webkit-keyframes slidein{from{-webkit-transform:translateX(-50%);transform:translateX(-50%)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes slidein{from{-webkit-transform:translateX(-50%);transform:translateX(-50%)}to{-webkit-transform:translateX(0);transform:translateX(0)}}.share_audio_progress_loading{position:absolute;top:0;bottom:0;left:0;right:0;overflow:hidden;display:none}.share_audio_progress_loading .share_audio_progress_loading_inner{position:absolute;top:0;bottom:0;left:0;-webkit-animation:slidein 6s linear infinite normal;animation:slidein 6s linear infinite normal;width:200%;max-width:none!important;background-image:-webkit-repeating-linear-gradient(-15deg,#d9d9d9,#d9d9d9 2px,#ebebeb 2px,#ebebeb 4px);background-image:repeating-linear-gradient(-15deg,#d9d9d9,#d9d9d9 2px,#ebebeb 2px,#ebebeb 4px)}.share_audio_progress_handle{z-index:2;position:absolute;width:14px;height:14px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:rgba(9,187,7,0.15);top:50%;margin-top:-7px;margin-left:-3.5px;cursor:pointer;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_progress_handle:before{content:\" \";width:8px;height:8px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:#09bb07;position:absolute;left:50%;top:50%;margin-top:-4px;margin-left:-4px}.share_audio_desc{color:#b2b2b2;overflow:hidden;padding-top:6px;font-size:12px}.share_audio_desc em{font-weight:400;font-style:normal}.share_audio_length_current{float:left}.share_audio_length_total{float:right}.share_audio_length_total:before{position:absolute;left:-9999em;content:\"\u603b\u65f6\u957f\"}.topic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.topic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.topic_area.unsupport .unsupport_tips{display:block}.topic_wrp{border:1px solid #ebebeb;line-height:1.6;background-color:#fcfcfc;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden;padding:8px 10px;display:block}.topic_thumb{float:left;width:75px;height:100px;margin-right:20px;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}.topic_content{position:relative;display:block;overflow:hidden;height:100px}.topic_title{font-weight:400;font-size:16px;color:#3e3e3e}.topic_desc{color:#8c8c8c;font-size:14px}.topic_title,.topic_desc{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.topic_info{position:absolute;bottom:0;left:0;right:0;color:#8c8c8c}.topic_info_primary{float:left;margin-right:.5em;font-size:14px}.topic_info_extra{float:right;margin-left:.5em;font-size:14px}.icon_topic{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/topic\/icon_topic.2x2e4987.png) no-repeat 0 0;width:10px;height:11px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto;margin:-2px 5px 0 0}.iframe_full_video{position:fixed!important;left:0;right:0;top:0;bottom:0;z-index:1000;background-color:#000;margin-top:0!important}.video_iframe{display:block}.video_iframe+.img_loading{display:block}.video_ad_iframe{border:0;position:absolute;left:0;top:0;z-index:100;width:100%;height:100%;background-color:#fff}@media screen and (device-aspect-ratio:2\/3),screen and (device-aspect-ratio:40\/71){.meta_original_tag{padding-top:0}}@media(min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.mm_appmsg .rich_media_inner,.mm_appmsg .rich_media_meta,.mm_appmsg .discuss_list,.mm_appmsg .rich_media_extra,.mm_appmsg .title_tips .tips{font-size:17px}.mm_appmsg .meta_original_tag{font-size:15px}}@media(min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.mm_appmsg .rich_media_title{font-size:25px}}@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){.rich_media_area_extra{padding-bottom:34px}}@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:landscape){.rich_media_area_primary{padding:20px 59px 15px 59px}.rich_media_area_extra{padding:0 59px 21px 59px}}@media screen and (min-width:1024px){.rich_media{width:740px;margin-left:auto;margin-right:auto}.rich_media_inner{padding:20px}body{background-color:#fff}}@media screen and (min-width:1025px){body{font-family:\"Helvetica Neue\",Helvetica,\"Hiragino Sans GB\",\"Microsoft YaHei\",Arial,sans-serif}.rich_media{position:relative}.rich_media_inner{background-color:#fff;padding-bottom:100px}}@media screen and (min-width:1024px){.rich_media_meta{max-width:none}a.rich_media_meta_nickname{display:inline-block!important}span.rich_media_meta_nickname{display:none!important}.rich_media_content{min-height:350px}.rich_media_title{padding-bottom:10px;margin-bottom:14px;border-bottom:1px solid #e7e7eb}.discuss_container.access{width:740px;margin-left:auto;margin-right:auto;background-color:#fff}.discuss_container.editing .frm_textarea_box{margin:0}.frm_textarea_box{position:relative}.frm_textarea_box:before{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.frm_textarea_box:after{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5);left:auto;right:-2px}.rich_media_meta.nickname{max-width:none}.rich_tips.with_line .tips{background-color:#fff}}.text_unselecet{-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;user-select:none}.pay_reading_area{padding:60px 8px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.pay_tit_tips_wrp{position:relative}.pay_tit_tips_wrp:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e0e0e0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.pay_tit_tips{position:relative;top:-0.75em;padding:0 .5em;background-color:#fff;color:#8c8c8c}.pay_tit_sub_tips{word-wrap:break-word;word-break:break-all;margin:-12px 0 10px}.btn_pay_reading{width:180px;height:35px;line-height:35px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;color:#0aba07;border:1px solid #0aba07;margin:5px 0 14px 0;display:inline-block}.btn_pay_reading.disabled{border-color:#d5d6d7;color:#c4c2c5;background-color:#fbfbfd}.pay_tips{font-size:14px}.pop_tips .inner{width:280px;box-sizing:border-box;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:14px;background-color:#f7f7f9;position:fixed;left:50%;top:28%;margin-left:-140px;z-index:20}.pop_tips .inner .tips_title{font-size:16px;display:block;vertical-align:middle;max-width:98%;padding:15px 10px 0;color:#3e3e3e;text-align:center}.pop_tips .inner .tips_con{color:#888;font-size:14px;padding:10px 15px}.pop_tips .inner .tips_opr{line-height:50px;font-size:18px}.pop_tips .inner .tips_opr .ft_btn{position:relative;width:280px;display:block;text-align:center;color:#0aba07}.pop_tips .inner .tips_opr .ft_btn:before{content:\" \";position:absolute;top:0;right:0;height:1px;border-top:1px solid #ececec;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);left:0}.pop_tips .mask{width:100%;height:100%;position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.4);z-index:1}.wx_poptips_wrp.pay_reading{top:50%;margin-top:-60px}.wx_poptips_wrp.pay_reading .toast_content{margin-top:75px}.weui_loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:weuiLoading 1s steps(12,end) infinite;animation:weuiLoading 1s steps(12,end) infinite;background:transparent url(data:image\/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;-webkit-background-size:100%;background-size:100%}@-webkit-keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}@keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}.load_img_wrp{display:inline-block;font-size:0;position:relative;font-weight:400;font-style:normal;text-indent:0;text-shadow:none 1px 1px rgba(0,0,0,0.5)}.load_img_wrp img{vertical-align:top}.base_loading_opr{position:absolute;top:50%;left:50%;margin-top:-15px;margin-left:-15px}.weui_loading.base_img_loading{width:30px;height:30px}.base_reload_opr{display:block;position:absolute;top:50%;left:50%;text-align:center;margin-top:-32px;margin-left:-28px}.base_reload_opr .base_img_reload{display:inline-block;width:40px;height:40px;background-image:url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD\/\/\/9paWkyMjL\/\/\/\/\/\/\/\/\/\/\/\/29vb\/\/\/\/09PTn5+fh4eGvr6\/\/\/\/\/6+vqZmZm8vLz39\/fj4+P8\/PyBgYH\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Gxsb\/\/\/\/\/\/\/\/\/\/\/\/v7+\/MzMzr6+v\/\/\/+4uLj\/\/\/\/o6OhNTU3Y2NjQ0ND9\/f35+fn\/\/\/\/\/\/\/\/\/\/\/\/t7e3\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/z8\/Pb29v\/\/\/\/y8vLw8PDU1NT\/\/\/\/\/\/\/\/ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp\/K+L4DBxUDZQkjInpB+7\/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ\/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe\/pxsLCvfdR7HNvHU30WldQebill\/Pph9ben3t\/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe\/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ\/uRL+QiTBKbIMaLCxPq6n6lKz\/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb\/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP\/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b\/c+uss1iFWsaH5fYZtU0g6XrxUzj\/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2\/b\/thee7vy2O2FTa\/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0\/XH5B1c4zX\/WEj5\/f1R6LdH9xef7x8\/SF410f1139Q+P+fPa74ONPBJ6Q\/+TfzjGYmPq8AAAAASUVORK5CYII=');background-size:cover;background-repeat:no-repeat}.base_reload_opr .desc{font-size:14px;color:#888;margin-top:10px}.bg_gray_wrp{position:absolute;top:0;left:0;right:0;bottom:0;background-color:#eeedeb}.gif_img_wrp{display:inline-block;font-size:0;position:relative;font-weight:400;font-style:normal;text-indent:0;text-shadow:none 1px 1px rgba(0,0,0,0.5)}.gif_img_wrp img{vertical-align:top}.gif_img_tips{background:rgba(0,0,0,0.6)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#99000000',endcolorstr = '#99000000');border-top-left-radius:1.2em 50%;-moz-border-radius-topleft:1.2em 50%;-webkit-border-top-left-radius:1.2em 50%;border-top-right-radius:1.2em 50%;-moz-border-radius-topright:1.2em 50%;-webkit-border-top-right-radius:1.2em 50%;border-bottom-left-radius:1.2em 50%;-moz-border-radius-bottomleft:1.2em 50%;-webkit-border-bottom-left-radius:1.2em 50%;border-bottom-right-radius:1.2em 50%;-moz-border-radius-bottomright:1.2em 50%;-webkit-border-bottom-right-radius:1.2em 50%;line-height:2.3;font-size:11px;color:#fff;text-align:center;position:absolute;bottom:10px;left:10px;min-width:65px}.gif_img_tips.loading{min-width:75px}.gif_img_tips i{vertical-align:middle;margin:-0.2em .73em 0 -2px}.gif_img_play_arrow{display:inline-block;width:0;height:0;border-width:8px;border-style:dashed;border-color:transparent;border-right-width:0;border-left-color:#fff;border-left-style:solid;border-width:5px 0 5px 8px}.gif_img_loading{width:14px;height:14px}i.gif_img_loading{margin-left:-4px}.gif_bg_tips_wrp{position:relative;height:0;line-height:0;margin:0;padding:0}.gif_bg_tips_wrp .gif_img_tips_group{position:absolute;top:0;left:0;z-index:9999}.gif_bg_tips_wrp .gif_img_tips_group .gif_img_tips{top:0;left:0;bottom:auto}.flex_context{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.weapp_card{border:1px solid #e1e1e1;background-color:#fdfdfd;color:#3e3e3e;line-height:1.6;font-size:16px;font-weight:400;font-style:normal;text-indent:0;text-align:left;text-decoration:none}.weapp_card.flex_context{padding:12px 15px}.weapp_card.flex_context .weapp_card_hd{padding-right:1em}.weapp_card.flex_context .weapp_card_avatar{width:50px;height:50px}.weapp_card.flex_context .weapp_card_nickname{font-size:17px;font-weight:400;display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.weapp_card.app_context{padding-top:10px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden}.weapp_card.app_context .weapp_card_bd{padding:0 15px 15px}.weapp_card.app_context .weapp_card_profile{font-size:12px;color:#8c8c8c}.weapp_card.app_context .weapp_card_avatar{width:20px;height:20px;margin:-0.2em 5px 0 0}.weapp_card.app_context .weapp_card_nickname{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-weight:400}.weapp_card.app_context .weapp_card_title{padding:.3em 0 .75em;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-weight:400}.weapp_card.app_context .weapp_card_thumb_wrp{position:relative;display:block;padding-bottom:80%;overflow:hidden;background-repeat:no-repeat;background-position:center center;-webkit-background-size:cover;background-size:cover}.weapp_card.app_context .weapp_card_thumb{position:absolute;top:0;left:0;width:100%;height:100%!important}.weapp_card.app_context .weapp_card_ft{padding:0 15px;border-top:1px solid #e1e1e1;line-height:1.56em}.weapp_card.app_context,.weapp_card .weapp_card_bd,.weapp_card .weapp_card_ft,.weapp_card .weapp_card_nickname,.weapp_card .weapp_card_info,.weapp_card .weapp_card_title{display:block}.weapp_card_avatar{padding:0}.weapp_card_logo{color:#8c8c8c;font-size:13px}.icon_weapp_logo_mini{width:14px;height:14px;vertical-align:middle;margin-right:.2em;margin-top:-0.2em}.share_appmsg_container{padding:17px 20px;text-decoration:none;color:#000;-webkit-tap-highlight-color:transparent}.share_appmsg_container:active{background-color:#f7f7f7}.share_appmsg_container .flex_bd{padding-left:10px}.share_appmsg_title{font-size:16px}.share_appmsg_desc{color:#8c8c8c;font-size:13px;line-height:1.4;margin-top:.2em}.share_appmsg_icon{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABGCAMAAABCBcKLAAAAflBMVEUAAAAso0Q\/rFYso0Qro0Qro0QupkkvqUsso0QtpEYwp0lFu2Iro0Qro0UspEUspEYso0QspEQso0UvpUUro0Uro0Uro0Qro0Qso0UspEU4rEorokQso0Qso0QtpEUro0YspEUspkQso0Uro0Qto0Uto0QupEYrokUzqkQrokS9r21\/AAAAKXRSTlMA5Av887MjG39JFQPo3FJAlIN4L8+sppyLWw3t06J+bEw10MRyZCvUHvB+FQ8AAAFySURBVFjD7dhrb4MgGIZhREXFs2099dy13Z7\/\/weXZkvVBTt54WPvjyZcCYpIZNPEtf5IPfybE7GZZLnD0hw1wUMPGimNLAFMkRDPXL\/LRc9epEb4ZjASwR7pIyMDGaMhIYZSRkMyjCpoCE8w6khDQozLSIicrrGIhJSwgOwsIAI\/7fyiLQ+Hg6AgVwBwKzlcISA1ALSMGSEpANwNEVe91PXV1gbS2UByG4iwgXCmXxD8QRghx1uZI4ATWECw5hYQ+LEFBIUNBEca0udV4z9PDu5JG4mjJsU0b6WHnJut6owRaCBnH+rWfCkiN5jNj5ch2RYvqhYhLWCKxHsMUadTY4h6Y0sMUR9xhmmUxSYTqNNZ9vvRgEtddvnqq9d9Ae\/ur3AJc07dCjZ4lITCYFMK3Adx40bbYwig6A036k94J9NPhsD2PDtTyZYhNzdn8y1EmoqZI\/vYAtIxC4ikIDpj3sgbeSO07CMOSDkTJCIp0x9T39HayMQFhdt5AAAAAElFTkSuQmCC) no-repeat 0 0;width:34px;height:35px;vertical-align:middle;display:inline-block;-webkit-background-size:34px auto;background-size:34px auto}.friend_cmt_area{-webkit-transition:height .3s;transition:height .3s}.friend_cmt_area.hide{position:absolute;visibility:hidden}.friend_cmt_readmore{padding:30px;text-align:center}.friend_cmt_readmore a{-webkit-tap-highlight-color:rgba(0,0,0,0)}.img_loadederror{background-color:#eeedeb;border:1px solid #eeedeb;background-image:url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD\/\/\/9paWkyMjL\/\/\/\/\/\/\/\/\/\/\/\/29vb\/\/\/\/09PTn5+fh4eGvr6\/\/\/\/\/6+vqZmZm8vLz39\/fj4+P8\/PyBgYH\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Gxsb\/\/\/\/\/\/\/\/\/\/\/\/v7+\/MzMzr6+v\/\/\/+4uLj\/\/\/\/o6OhNTU3Y2NjQ0ND9\/f35+fn\/\/\/\/\/\/\/\/\/\/\/\/t7e3\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/z8\/Pb29v\/\/\/\/y8vLw8PDU1NT\/\/\/\/\/\/\/\/ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp\/K+L4DBxUDZQkjInpB+7\/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ\/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe\/pxsLCvfdR7HNvHU30WldQebill\/Pph9ben3t\/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe\/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ\/uRL+QiTBKbIMaLCxPq6n6lKz\/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb\/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP\/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b\/c+uss1iFWsaH5fYZtU0g6XrxUzj\/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2\/b\/thee7vy2O2FTa\/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0\/XH5B1c4zX\/WEj5\/f1R6LdH9xef7x8\/SF410f1139Q+P+fPa74ONPBJ6Q\/+TfzjGYmPq8AAAAASUVORK5CYII=');background-size:40px;background-position:center center;background-repeat:no-repeat}.img_loading{background-color:#eeedeb;border:1px solid #eeedeb;background-size:22px;background-position:center center;background-repeat:no-repeat;background-image:url('data:image\/gif;base64,R0lGODlhPAA8APYAAJeXl56enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19nZ2dra2tvb29zc3N3d3eDg4OHh4ePj4wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkEAEIAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAPAA8AAAH\/oBCgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKJgwMJ5ycBQAABaKbBKUEqI9BQUCIA6UDhyELDRytg7BAQYezALWGCgEBDLuCvUCxhcHDhA4CAgELyULLzYTPhSAF0wMS10LMzL\/btIUNAdPW49nngtyDFQPTBBjjyuXaQqoArAYlmCYggr5B\/OIZKGVgUAR7Ak5x+tGjh49Dy+JdMGDgwiAG7Aoe8iBBwgdJPXio7PHDUK94hx5MU2CIQ4QEBw5MQKmyZw9DzBghOGDIggIESA+I49lT5cVLFhYgndpABCUfTVdagpBg6oEFFDClbPpzkoOpCBJMIKHJx1ge\/mUlPRiK4IEGVG6fUpowocPBv4ADCz7EIweOw4gR88BUIoOFx5AfY0jBKIeNy5gz58B0wcGDz6A\/O8hQObNpGzg4ew4N2sHdRTwSy8axAxMJDJEjX2gxuLfv35xu0KBhyYOHEqhsyIDBXAYlDRUoVNAwQpMOGsyzO58EvYJ3Cx1WXKIRIzvzGZY2WPDuHcPJSTmWm49RAxMIDOy9Z6Acacb8+oW0wNsiIljVzQX5+RUJdufdYAgLKaTwgiIjcMBBCIaUwMF6FCgICQ4z0JCaIS9EmIILg7xwwgkTCiKChRwgZ8gJHXAQCicrmNiiECgUiMIgGlroAWAlRsgCISYUe2gCISDAuKQ+MqgQoQoxIKkkISjUyEEHKujTgokoWinCk4NUaKGBycAgZQoq2FBIkmMW8oIHFnZAZitfRhimmHcKQgKMaOJp5CFw9ilICBtsECgqNLjQgpuGFHrICyKMcKRvkgKXyAkF3qjpITRESNynpJZq6qmopopKIAAh+QQJBABFACwAAAAAPAA8AIaVlZWbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBFgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKKA4OKZycBwAAB6KbBaUFqI9EQ0NEhwSlBIchCw4drYNDQkJDs7WHCgEBDbyCvr\/BhbQAtoUPAtQMyUXLv7KEz9GDIgXUBBPX2L\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\/nDjSmAUQ61dFi\/axt1rwOiiHFWxXoVhA9OHCF\/Dgn3w4ITUx5AjY6rLwtKFCx9MuUhhonMKShIYLGAggWQmGitOdPYMeunSBhZMXGKBYnVnFZYmNHDN4AEGSjJq20bRApOGB7wZRBghaYXtE8ULlSjBSEO+QhkcuF5QQRKLzidUsC00AgQI2Yk4TJiQwdAHCrsXWJAUQ8UKGYdQmAdBXdAKESLgJsgG602QmSEiWECBCKCIYF4IKAwCAgYY7CSIBxSsN184+pnH3CAeZJCBB4RgUCCJ0qwQwoOfgSgiioKEkOEEFXw4DAn7oefiiIWot951vKSwIggixFBIiDwSTZJCBetRcOAsOJqn444wDtJBgUCqUsIHINhICJJVDpKBBBJsMEwLJZAw3pEvHpKCBhtMCRWYkiUiAoUM1nmICwDmpeefgAYq6KCEXhIIACH5BAkEAEYALAAAAAA8ADwAhpeXl5iYmJmZmZubm5ycnJ6enp+fn6CgoKGhoaOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3eDg4OHh4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEaCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4tCQpygQUBAQaCboqSmjz87O0CHqKWHREVFqoM7OTk7sKOyhUTBRLeCubo8hrGGwsHERj26OTqvhMrAzM5GxjnI1b6FRdjZPjrRPd6pg+HCttlGPNG8g9aCzMPuguW654L09qA7bNiQVwiaLoJDggQZMohZu0IZFCTQIOnGjIs2dBgy1g3RunuELCQQAADAAkk2Ll6kgcOQDo2LmhV6MCCATQAKJPGooXJly0sPCNgcWoADpRs0es6wYQmBgKEACDC41ANpzxqUDAwNIGABCE05eF7EOulAAAABDkwwpePGDUv+DBhYwEe3rt27h3TEgPGir18YMX5aCiHBQYPDiB1AMMEoBovHkCPDwPSggOXLmCM0jsyZxeRLDjCLLrB2UQ4YfP32Bfz2kgcIhhEfduAgBd7buHNzcszCkgULH0y9SFGiuO1JEhYoWBDBaKYaK0wUN04pwoLrCxhUOHGJxYnpxVVYmsAA+wIHFyjRQAG+xAkXmDI4ML8AAglJK8CbaGGoOCMNFEHUAHYKVIAfCSWYoEIMhozwwQfcJbKBBBJgYMgHFJSnwFyRyKDCCjIcgsKDH5QwyAohhLDCIBpQKEFwhohQAQUigBICiSgM8sEFF8BohAcTUGggXSM+OAIhHmCDgIEHhGDgIpPusADCgyCIN0gHSnZASAhBSkCBidmUQCJjhGCJgZaETEhhgMSkMOUHIYRYZpaFrFABhRP4qIqYD0Y455mGcOAim3t68MGRhpiJZiEYRBABocKZQIKchSh6iAoZbOAnXkkuqZsiIfAYwqeJvCCCCJ+RquqqrLbq6qugBAIAIfkECQQASQAsAAAAADwAPACGlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39\/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ASYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbikVDQ0WcnEFAQEGim6SmqI9APDtCh6qnhkhHR0isgzw5OTuypbSFR0ZGR7qCvL08hrOGxMXHyD69OTqxhM6ESMXRyMnVzNnBw93S3z861T7jq4Pc3bnfgj3Vv4PagtDG84TqvT0GCSmFLck+I6J42LghrlC9ZYOICBFCZNC+c4Q4MFjAQdKNGSBt6DC0A6AiaBgFZVggAACABh5BgqSBg+Q9RcUMRSAQoCcABpJ61JA5s+alCAUA9Ox5AASlGzSIzrBhSYGApQAKPLjk4yPRGpQQLA0woMEITTqGggQ7KUEApf4JLKDaceOGJQcOMvTby7evX0Y7ZMSIAWNw4RgzRl4iMeEB3scOHkhIwUiGi8uYM8vAFMGA58+gJ1TOTNpFDEwQQKs2UAGwYMKGB8swaimEBMeQI0Ng8be379+6ZLRoYSkDBhGoYKgwwVwFJQoNGDSg8EGTDRYnmDenNKGB9wYOLji35AKFduYrLFVw8J0BBL2TaqQ4bwLFC0wcIHz3LuGEJBbnneCCISf4twgHHRWywQPtXSBJCyWYcAILmxViQgghUJaIBxRQoIEhIVjgAAMMYCDJDCywMMMhK2AYAgqDuDDCCAMKwsEEHYZwCAkYWFCCKCNgKEJ6goiQQQbICZECQgUdOshXixiaQAgIGmjg1CAadEiBjv28IIKQxA3yQZXVDTICkxRYYOA3J7iooZhkFtKBlgkiw8KXIYxAQyFjalDmIC1c0GEFSerSJoZvwumnIR\/Q+Q0KIIAgJaNxGqLBBBN08E0MKJywJ6WLGtICBx0k+heVVgK3CAlHkqCqIjKQQEKFr9Zq66245qprP4EAACH5BAkEAEEALAAAAAA8ADwAhpiYmKCgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2Nra2tvb29zc3N3d3d7e3t\/f3+Li4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o7OTk7nJw3NjY3opukNjiojzYzMqyGqqeGPzw8Pq2DMi8vMoe0hzw7Ozy7gr2+M7OltYQ9xcbIQTS+LzCyg8KEP9I7PdRByi\/MhNyDxMXH4jUw1zTnztDfuuLV1zHypoTq4PeD3vmKJwhHKW3R1oma0aKFuULWfAETpAMHDh3ppIU7BATIJBcpQraYSCjGMkXq2BXqyFJSi5AhVbwwFEPfIlyGWOqURGMFzJgzL+ncScmFip8pWFga2tJSjZc\/lU5i6lETDBYwpUpiikqGCxdLqwIcS7asWUMyTphYy3btCRj+mDIgIDCgrl0CBjwwQiGir9+\/JzAVAEC4sOEDjFL8XSwi8CUChiMDSMCIhtq2bYNasmCArt26BAiEOEu6tGlOfEdYcuDgAioTHzbI\/kApgYAAAhJQ0ORCBAfZskFQQiCguIABDYRbGtEBeHBLCgYYD1DgASUWHpxv6FACU4QCxosf4CAphHMOJAxtIL8IAgRDEAhMZyBJhIb1IVIY0lChgt5EEiCAgHWFWLDAAAEE0IAkKoQgggqHgNBfBewFMQIGGKgmSAQHCGjBIRo0sIAGolwwIW2CWNBAAx8KUkECAi5A1gcTkjgIBaztNogDAiJQAUAkWNCfBSIQgqMDOgprkgGMCChQITIcTNhBIUcmKYgEHSLwHjUgCFnBBRAamWMhIywgYAIt7hJlf\/+JiaQhE\/S4pZoUUGAjlWMa8sABB0RAzQnNhYnnm4aMAEEEKJJW5WmKYLAiBowmgkIGGegX6aWYZqrpppyiEggAIfkECQQARAAsAAAAADwAPACGlpaWm5ubnJycnZ2dnp6eoKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW2NjY2dnZ2tra29vb3Nzc3d3d39\/f4ODgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ARIKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbij07Oz2cnDk3Nzmim6SmqI85NDM6h6qnhkE9PkCsgzMwMDKypbSFPTw8PrqCvL01hrOGPsXGyEQ2Mb0xO4XOhLbRP9NEyjA02sGF0MXH4DjWvTeE24I\/0Ty54EQ1vb7w5oPExd\/uCWoHg5mgeOh4hOJUw4ULg4Xy9SIniEeOHDwGJQxYSIiQIUMkvUCRQoWLGYZkTFSEbiGhIR5jSnKRomZJGCl\/LerhclDMn5JqrLBZc0UMTDB\/eqz0YijRFpaUegxp6YYLFU8pSRWyKQYLmyy0\/qTKacaLF5ZAchXItq3bt\/6GaKRAcaKu3RModFraoMBAgb+ADSQIwUjFiMOIE6PAdACA48eQFRROTHnE4kuNIWtewMgGCrp37R69lCGBX8B\/DRwoAbe169ecVJAgYcmBgwyoUITgwJvwpAQCAghIUEETjBEdePemBFyA8wENRFwi4UH58koKBjgPXgACJRcfrHPwYAKThALbnR\/4IGmEdfKGOnRgFCGCoQgEtgdgIInEBg4diLCCIRtYYAF7iVCQQALeFYLBAgMEEEADkrAgAglhGRKCgRZ4MIgJGmhQniASILAgBodw0AADHIiCgYEX+EZEBg88gJsgFyiwIH9sbWjgBoRcAAEEFxDywIIJFH55jwkvWnABbYNYMKQFhGigYwILeAhOBxwiGOWUhUyApATgiHCBgRhARYiUEFBJSAkMLKgAishwaaCXX7ZpSAVI2oeMBxVU0KIhbLpZCAQIIEAmMil40IGahRR6SAkRTADCa0ISCZsiG9QI5KaIrLDBBhmCauqpqKaq6qqiBAIAIfkECQQARQAsAAAAADwAPACGmZmZmpqam5ubnJycnp6eoKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39\/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ARYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbizk5nKA4NTU4oJs3ozemjzgyMZ+GqDWqhkA8PD+rgzEuLjGHsrSFOzo6PLqCvL0zsamGPcXGyEU0L70vOoXBhUHExT3TRTK9LjLazoQ80cfhNta9NYTbgz7ROrnh1OS\/g\/OC3jrA5RP0zgWNQaJIDYJWbAcoGi0MHqJBzpwgHjhwsCui7tshIkOGEJHkIoXJFhYJKWOWqKPDQiCFyBxC0qRJFS8MwYDBaMdLQkNkCqUZqcYKmzd5XgoqVOjISS5UIE3RwhLTpkQr2YiKlAWlqzOfYorBwqbXSVdDmprRy6rIgf5w48qdOxGFiRJ485YwkZLuIBQhAgsefMJvoRQgBis2YZhQDRN39eZV2riy5cuYi6QQMcJSAwYXTJ34oCGDhg+UDgQAEODABE0vRGzQQPt06gC4AwhYEOLSCA61aYOwhEBAbgAEGlBq4SG4Bg4lMEEgkBt3gQ6SQgTnQMLQhg2MIEAw9GDA8QWSRJjeACKFIQ0UKHhQJOHAAQeGLCgQAAAAA0krhCDCCoeAEN8EHAxCAgYYdCdIBAbYZ8EhGiyggAagXBBfBagJYgEDDEwoSAUI2KdAXAbGlwEhFDTQAAWEOGDfARUMRIIFG4pAyAQuvjZIBiUekAB24WwQHwVEDmLCYwM+DiJBhAeMNw0IFcR3AYE79lgICQrYh0BoyBgZ33yFLNmkkjNKqQsHE0yAoSFmHuKAAQZEMA0KHGyAZZlaGkICBBIMZ1iLL2ZmCAYgYmDoYRlkoMKikEYq6aSUVjpIIAAh+QQJBABGACwAAAAAPAA8AIaYmJiZmZmampqbm5udnZ2enp6fn5+goKChoaGioqKkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3g4ODh4eEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBGgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKPzg3PpycNjMzNqKbNaWnqI43MTA4h6ozNYdAOzs\/rYMwLCwvs6W2hjs5OTu8gr6\/MYa0xIQ8x8jKRjMtvy45hdCFQDrUPdZGzCzOhN6ExsfJ5DXZLC006cOEPtQ6oeRGMr\/AhEiZWkeNB79BLv7JGCSQlZFpx3SIkqFixUJD\/poN2mHDhjsj7HKMMxSk5BBJK0iUMKECHaEXvy4igvhx0JAgQHIGQVmi58oWhlwEW6RDYiGcOXVKooHCZ88TQC8JSZp0JyUWJ5yWUGEJKVUhl2qsMOE0BSWvOcFqepHCp9lJ\/l6DqOUU45clIXIP6t3Lt++hGWRJCB5c4oRLS0QSK17cyMSHx5Ajl8C0uHLiIoxORN78YfIly5YZ1SgxuPTKoZaKgFbst7Xr16JQhAhhiQGDC6hMdMBwAUMHSggCAAiAYIImFyAyYFjum9KBANADCFgA4pKIDcyXe7CUQEB0AAQaXOWQHcOGEZggEBge3cDvSCB6L9eAvpAGDYwcODD0YMD3BZLEh0EGH6BgCAYSSMCBIhEUYAADhliggAAAAABhJCp8AAJXhniQYAQbDDKCBRbUZ8QDDhpQwSEaLKBAiJxUkOAE2wlCgQIKUDAIBQcYYEACe3mYIG6DSLDAAhIQg8KAjwboyM8IFMxI2yARHBkBIRj0aAACC5KjQYISwEillYVAkOJ+1nwwQYIVrFBIlQtcScgICfh4wIrKfJlgl4TAKSchEjCJJi8aRBABBof4eUgDBRTwgDUnbJCBm4YoasgIDkDwwWtGIgmbIhfgSOSnh6RwwQUckqrqqqy26uqrogQCACH5BAkEAEoALAAAAAA8ADwAhpSUlJWVlZaWlpeXl5iYmJmZmZubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t\/f3wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEqCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4pCOTlCnJw4NDQ4ops3pTeojzkzMjyHqjSshkM8PUGtgzIuLjGzq4c8Ojo9vIK+vzSGtLaEPcbHyUo1L78wsoTPhUM7xjs\/1UrLLs3cw9HTyOQ42C4vNum1hD\/TO0DkgjW\/wPTQlBQz5mPfIBj+agwiZWqQD3yiarBgga5Qv18zBvXAgaOdEmkEDxUZMqSIpBYlTJxgkbHQsoqHQG4jVERIkJtDJLEwwVPlC0Mxgi3iMXMQkZtIc0aykaInTxQwMBGxiTSIECOUXKBwamKFJapVlVbCweKEU6+TwOLEmimGip7+KiiBFUIE1YwWLSyRNGmwr9+\/gA3ZQGGW64kUMCklQcK4seNGKUJInkwZBSYkRzJr3oyEkQoQlEOfuLy59JHOi3CcKOz0sAxMi087bhy4tu3bolaMIGHJgQMMqFB80JBBAwhKCAIAEICggqYYIjZomG4ceYDrAQY0EHGJRAfqGjaEsKRAAHYABR5QeuEBvIYOJjBFKID9uoEPkkSA5xC\/EAcOjEAAgSEQEHAeA5KMUJx4aBGiAQUTeKCIBAYcoF4hGCwwAAAAOHBSCCLkZUgIFEDYwSAnZJBBf0pEUOEBFxzCQQMLAMjJBSVWcJwgFzTQQIyCWIDAAQcs4BeJJWqIQEgFvjk3iANEHmCBQSZYkCNvg1DgGwUODnmAAhKSw0GJFISZ5ZaFUEjkgNWEUEGJF4h4pgNcEmKCAkQmACQvY5aIXyFa0mnIBFGyyUsHE0ywwSGB1lnIAwYYEEE1KXTAgZyENHqICRBIMJ5tTDrgJG6IZOBjBqQmwsJ0mKbq6quwxirrrJsEAgAh+QQJBABEACwAAAAAPAA8AIaYmJiZmZmampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzOzs7Pz8\/Q0NDR0dHS0tLT09PV1dXW1tbX19fY2NjZ2dna2trb29vc3Nze3t7i4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBEgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKPDQ0PJycMy8vMqKbMqWnqI40LS02h6qmhzw3Nzqtgy0nKCyzq4c2nze7gi0oyi+GtKyEOJ80xscwKcoqsoTOhTw10jnHyMooLoXchDfS1OIz1ygpz0TogjnSNbrigjDkwIP0RIh9wqGPkAplKWAMIvVixqBon2qIguFLoSF+ylo8nDGDoCB1n8IZ8sGDxw9JKECEEHHCXCEWylwigqiNEEkdOENFOhGi50oVhlasYGSj5qAeOJPqhCSDhM+eI4Ze6rEjKc4dJyelGPFUhAlLVa3uWEppBgoRT79OCqsUiKYW\/iVCqCxBie0OH6hcpEhhqSTegoADCx68KAbXpz5JMLskJIjjx5CFMBqhYYPly5Y1iMAUBIjnz6CDMCJRGfNlzZxBqwYietEMtIihamQMuXYQyYRz697dqkQHD5aGCEc1IgOFCRQ0UBLOfIgmFh0qUJiefHnz4Zc8XEA+vcKG4NexS1KBgfr0CyEwhRcPiQN3ChZAGLJggdGCBYbWS+owYUIFDmoRUoEDDmSgSAMABIDAIdehxEEHKByyAYENXDBICP1tJsgCCQYQASLsaRIBgQ98J0gEBhjwoSAQCBBAAAUINiGBFBDyQIoPEHLAix4CFgIEJH5AiAMHHOCAgAO8bkiAgfpYQKADGBRCpJGFMNAhfuJw8ACBEfA1ZJFHEiJCAS8OIIE4ThLI5JdUSvkiAFjuckEDDVRwyJRhFpIAAHCKQ8IFFngpJZiHhKAAAxzwdqMBOfKmCAUp1uhoIihUUIGgk2aq6aacduqpPoEAACH5BAkEAEgALAAAAAA8ADwAhpaWlpeXl5iYmJmZmZqampubm52dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tzc3N3d3d\/f3+Dg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEiCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o\/NDQ\/nJwyLS0yopsxpTGojzUtLDeHMKUwhz43OD2tgywmJiuztYc2nzi8giwnyy6GtC22hTmfNLLIMCjLKceEz9GDPzWfNTrIycsnLYXehTjU1uYz2Scop4PsgzvUNTzmgy\/ogg1S1YLVoGKfcvgjlALdi0GkTA3SsU8UDBMnvhECuEydoBwyZCgU5C7hoSA+egSRhOIDiBAmmhVawUxRSRuGgPTYwdOHpBMggoIQkcKQChWMbOAs9IMHz56SZIwQGlQE0ktNn\/LkIYQSChFUQZSwtFMrD5+WaJwIQXXspLL+T30M0cSihFC3kuD2CCXqBQoUlnz4ALKwsOHDiBnJEME2bIgRGikVGSKksuXKQ4owGqGhs+fPIjANCUK6tOm5i0hk+Mw6BCYhpmMHQa1oRmPHIjxaInK5txDNiYMLH97KhAcPlo4YMYKKM4UJFDRQWk79iCYXHSpQ2E5hw3Tq1DF9uMB9u\/dK4KtTWpGhPIULri8pT89cUgfo2y2AMFTBAqMFCxhCX32QeABdBRyYYAgFDTSQgSINABBAAobMF14kKXDQQVGGbNAgAxcMEgIEEOwnCAMSBiDBIcsdYR0nEDTowHlIRGCAAREMEoEAAQRQwGEeNjgBIQ8ccMADhCCC0GMAOS4UwgMyIjeIA0Y6QEgFA\/RIgHT+WNBgAxgUQuUBVhISYY8BmsOBAw1CwOGUVRYiQgE9DjAkMhV8+aCYcYrZIwBp8nIBAwxQcMiYZRaSAAAAMGAOCRdY8CYhiB4iggIMdEBckUcStwgEN0LgqSIoVFDBpKOmquqqrLbqqjmBAAAh+QQJBABJACwAAAAAPAA8AIaTk5OUlJSVlZWWlpaXl5eYmJiampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\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\/v7\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\/z38+Pc9hFyioMD7egQQLIl\/r2NHD0ojMMBedwu0dokPO\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\/RdvQkULSqVjz\/9kgsU9pmQAg2S7HdeITrowAgMMBjiwgn2rVCgfEIYogMOOOygSAzVjUdIDCtAWEJakQgRXX+F8IAhDgoKooMNNrRYBAzVsbCaITOwsMKNm+SwooaC2DDDDO4JIkONg2V\/piKGMhYhJJGEvFCjDJj14COGPRBSw5DLDUJDC9W1UCQ6F2II5CBbztDlIBxW1yA6S+KQww+FpLmmIDiAyUILPLpSZoaG2GlImyy82UuZTaLJ5SFSFoqODwnSGeiihuAAQww3PJfmmM8h8iSnnRrCww03nBnqqaimquqqrAoUCAAh+QQJBABKACwAAAAAPAA8AIaVlZWWlpaXl5eZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39\/g4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBKgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKMRsbMZycGQwMGaKbFQ0NFaiPIBIPJYcUqxSHLBocKK6DEAUFDrS2hxoTExy9ghAGzROGtQ23hR4U1hvKShcHzQmzhNHTgy0X1hUg2UrMzoXhhRzWFNjpHAjNB6eD7oMjFdYWJtIJstDMQANCqlgRyhDvg8BBCu5ZGETK1KAP\/ihcEMVhQYN5hQgaKBBhUAkLFr4p4TDBGjpDLEKAYCGpAQAAAhZgMOSAXaIO1vIRSgFCQwYMIiQxABCg6YCShRgcXIRhZyESGzJozRBCkgcDTZsCICABUwkOW7V2cEHpAQGm\/k0FKLD0IW0GDiMuiWggIGyABJQ8pNUgAoYmCwgCMEUQ+GgGDydQYXAgrNIIESoeat7MuTOiI6BDi06CSQYKEyVSqzZxogajI0Ziy559BJOJDyBy6879gdci2LOD1750e\/fuDykaiRZt5AgSTDFOq15t4obn69izcyIiRIglFixCiRoSBIj5IJRSqE5hOFMRIebjo5+kfvUK65bgxz9vScX0Eie0QEkR5e0XxBCYvHDCfyi4Fol+8XlXCA88MBKDeIS0gJpqK0gCYRBEGLJDDjn0oMgMLbTQHiExrIAaCTRFwp0QIRrSA4k5VCgIDzbYoKMSMqTYAg2HzLDCCkRyiqIDjj4McsMMM+CnBA1CvrDZjSTuQIgNUNpACAxCJpnOD0uS2OQgXM7gJZoupOgCDgLxgKOJW3ZZSJApYtiLD2XqICGadhKywwtuiumKnCT+CKiahqCYZzaIamlImmsWAmYLMmQDBIXzFULpITvEIAOc2H2qXSKmnnrIDzjg8IOqsMYq66y01upKIAAh+QQJBABHACwAAAAAPAA8AIaYmJiZmZmampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nze3t7f39\/i4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBHgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKLhcXLpycFQYGFaKbD6UPqI8cDAoihw4HBw6HKRYYJa2DCwAACbO1t4YVDQ0XvYK\/AQHFhLS2hhkO1srLEgPOBbLRxIUpEdYPHMvMzgANhdLQghgN1hbn7wTOA6eD7YQfD9YQ3uhBcBYAASFVBlgNomDNgTl6gwo4ExBhEClTgzb4c1BRlBEjiCKkYzAoRIQIIQZdiOfw0IkOHFBI+kjzEAJn7qhZy0eoBIcKFCZ0mEmzZqFajCZMMATCAoWnEx5GKloUE4gLT7NiUEGJqlFKG4BmvfABk1eQkzJkpVDBQwtN\/l4paQhKQcOIVh8tefBgAqLfv4ADMyoypLDhw0QwvSARorHjxiNiMBoipLLly0MwidCwobPnzhpITL5MWkjmS5s\/fw49+LDrIYkvtRjx+LEIGoJz697dC4gPH5ZSpHiBCkgPHsh7UDIhormJt5mE+EBOXfmkEs2bj0iB25KP49R5AK90IntzElwnBQFf\/QemFSTMiyghQ9L09oZw4GDUAjohFSOYJ1Mk94kHhCE31FBDDp2ggAILhrhwQoAipCBJEL8daIgOCtawnyA5yCADg4K04CAKMBwCg4OScWJDhzoMMsMLL8wwyIoOpucXhwreQIgMNNY3yAonpgjRDi8qaRjjIEC+IKQgMqTgYAo20oNDhyQyGWQhLpzoXy86JGnDeFo6WcgNKkxpZC9XKphlmU8O8oKX57TpoyFNxjkICyec8CUqPOhH5o9bItiCCzXwlidviyzKaCI80EADD49WaumlmGaq6V+BAAAh+QQJBABIACwAAAAAPAA8AIaWlpaXl5eYmJiZmZmampqbm5udnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trc3Nzd3d3f39\/g4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBIgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKLxcXL5ycEQYGEaKbDwcHD6iPHQwKIocOqw6HKRUXJK6DCwAACbS2hxQMDBe9gr8BAbeFtQfPhBkN1hbKSBIDzQUj0MSEKRDWDhzZSAvNANOC0e1IF9YN2OgYBM0D9e7hgh4O1h7MQockQrMACAipYkVowrwNBAcVaCbglCBSpgZtANgAgqgjR4wYOWQwAAAGg0BEiABi0AUG1s4ZStGBQwpJInMeMZSgGbxCGKxRMGSCQwUKEzzgzJnT0CpGEiQYCmGBgtUJHSYx1YkpxAWrYDOsoBRy68hKG46CvfABk9md\/pMygKVQwYMLTWWbTtqAlIIGXqKMgLTkwcOJiIgTK158qMgQIZAjQx5CBNOLESFAaN4cQoQMRkOCiB5NekhXDahTq\/62KDTp10JOq1adAbCiIpJzC6l8qYWIzJs1hwhBg7Hx48g5AfHhw9KJE3dF\/eixo3oPSiQ+ePhAYmymIT6qi78+acSH8x9AmJhxyQcP8dYtlUB\/PgQKSkLew+fxA5OKEPR94Jkk4YnHnyE33MAICyzMBCB6JhA4HhCG2EADDTgo4sJz3hHiggkgaHdYJEH04EMQh+RwIYaD4BBDDBkKwsJzJ8BwyAsnmGAjJzWsmMMgMrTQwmeC4PjcTYipgnihDYTEIGQMhKhAYygE8dDjhTsQAoOQOwoSAwrPoVAcOjesGOMgW7bQpSAt0NhgNjpcWUN\/WnJZyA0phEllL2Ve+GMhaa4pyIbPvdkLDkseEughK+TYQjY94HBDc4YsiiALLdSAXJpQJpeIky106ukhPMwwA3mjpqrqqqy26qoogQAAIfkECQQAPwAsAAAAADwAPACFmpqam5uboaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2tra29vb3d3d3t7e39\/fAAAABv7An3BILBqPyKRyyWw6n9CodEqtWq\/YrHarLDUaJi7XAAAYxFtCAEBAa9WBthHEaHDcTri8qBAIGnhNekYPA4YMgUyDRCAGhgQSiUuLQw4Ch5KTAXFEFQSGBRmZSgVlBUQKhgMRo0oHZQdDEZ8DZ1w+PT0+TxcGBhdDDZcDkUYeExIfUj08zbpUDoYKRh0RCgkIE8vN3D1U2EYWCwnkCMVQPtzq3lcXDOTwDSFUzOo87FQQ1\/AMFVe49nhQeQAvgYIJJLTkUjcQW4IHosTgwjeFAoU7rTJq3MhRyI0bOEKKBLkDSwkNFyyoXHkBQwomOWzInEkTBxYMDyDo3Knzgf4GJjhoCrVhsx3Pow82MNkhsmnIGzqwkMiQcqXKliw6at3KFcsNGjSsfPBQAo2NGTHSzqCywUIFCxtEaMlBI63dtVPasvSw4koNGXbVWuFg1QIGZVNwAA4sowaWEBkKa3gZpa7dxkZcuGAyQm4REBhWVuggxXIMGjeMtFCh4oUSEh06zCsCO2UFD1JwgE1tBAZrFZuFvECBwrWQEbE7hDFywkOHE2JY\/IYxJAUJEpR\/mHDeAfEo36xbEEFxHQWREMmXS5Kx4ncMIieuQx+CgrsHFZlc\/DY+JD6J+UPAFptngcDQngos2FCEfwAK90FsHjSIhn6s8deffEYI2AGBbjVQKB5zGBqBHgcjJEKDCy0oCOJ\/R7ggwghZaUUeCeZ1hcSMNdpoxAyshaXjj0AGKeSQRF4RBAA7')}.appmsg_card_context{position:relative;background-color:#fdfdfd}.appmsg_card_context:before{content:\" \";border:1px solid #e2e2e2;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;position:absolute;top:0;left:0;width:200%;height:200%;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.appmsg_card_context .mpda_cpc_inner{border:0}.mpda_cpc_inner{position:relative;border:1px solid #e2e2e2}.mpda_cpc_title{font-size:13px;padding:6px 10px;line-height:1.2;color:#8c8c8c}.mpda_cpc_title.mpda_cpc_title_right{text-align:right}.mpda_cpc_title.mpda_cpc_title_left{text-align:left}.appmsg_card_ft{position:relative;font-size:13px;display:flex;justify-content:space-between;align-items:center}.appmsg_card_ft:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #ececec;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.dropdown_opr_tips{display:inline-block;vertical-align:top;color:#8c8c8c;position:relative}.dropdown_opr_tips.tl{display:block}.dropdown_opr_popover{display:none;font-size:13px;line-height:2.8;padding:0 1em;background:#fff;color:#576b95;border:1px solid #dfdfdf;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);border-radius:3px;position:absolute;top:100%;left:50%;-webkit-tap-highlight-color:rgba(0,0,0,0)}.dropdown_opr_popover:active{background-color:#ececec}.link_tips{float:right}.link_tips img{width:20px;height:20px;vertical-align:middle;margin-right:.2em;margin-top:-2px}.appmsg_card_btn{position:absolute;right:11px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);color:#576b95;border:1px solid #576b95;border-radius:3px;font-size:13px;line-height:1;padding:8px 9px;display:flex;justify-content:center;align-items:center}.appmsg_card_btn:active{border-color:#354567;color:#354567;-webkit-tap-highlight-color:rgba(0,0,0,0)}.appmsg_card_btn img{display:inline-block;width:13px;height:13px!important;vertical-align:middle;margin-right:6px;position:relative;top:.5px}.mpda_cpc_context{border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;margin:14px 0}.mpda_cpc_context:before{border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;z-index:1}.mpda_cpc_bd{position:relative;padding-bottom:56.25%;width:auto;height:auto;-webkit-background-size:cover;background-size:cover;background-position:50% 50%;background-repeat:no-repeat}.mpda_cpc_thumb{width:100%;position:absolute;top:0;left:0}.mpda_cpc_ft{padding:10.5px 11px}.mpda_cpc_ft.single{padding:22px 11px}.appmsg_card_msg{position:relative;top:2px;display:inline-block}.appmsg_card_msg .appmsg_card_msg_title{display:block;color:#3e3e3e;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3;font-size:17px}.appmsg_card_msg .appmsg_card_msg_supp{margin-top:2px;display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;font-size:13px;font-weight:400;color:#fa7834}.appmsg_card_msg .appmsg_card_msg_supp.price{font-family:'wechatnum';font-size:13px}@font-face{font-family:'wechatnum';src:url('data:application\/octet-stream;base64,AAEAAAAQAQAABAAATFRTSJjR0dUAAAEMAAAAEE9TLzKKcYMzAAABHAAAAGBWRE1YdDl7tgAAAXwAAAXgY21hcADqAd0AAAdcAAAAjmN2dCAA8oWXAAAH7AAAACBmcGdtdCgNNAAACAwAAALmZ2x5Zpf8R\/4AAAr0AAAGtGhkbXhOU2qhAAARqAAAAXhoZWFkBzA24QAAEyAAAAA2aGhlYQWdASoAABNYAAAAJGhtdHgX3AJCAAATfAAAADBsb2NhC1gJcgAAE6wAAAAabWF4cAIkAzEAABPIAAAAIG5hbWUBGuGYAAAT6AAAAs9wb3N0\/50ARgAAFrgAAAAgcHJlcDNDNIkAABbYAAAAkwAAAAwBO0szTEs7S0tLS0sAAwH7AfQAAAAEArwCigAAAIwCvAKKAAAB3QAyAPoAAAIABgMEAAACAAQAAAABAAAAAAAAAAAAAAAAcHlycwBAAAAAOQLI\/zMARQLUAAwAAAABAAAAAAH7AsgAAAAgAAAAAAABAAEBAQEBAAwA+Aj\/AAgACP\/+AAkACf\/+AAoACv\/9AAsAC\/\/9AAwADP\/9AA0ADf\/9AA4ADv\/9AA8AD\/\/8ABAAEP\/8ABEAEf\/8ABIAEv\/8ABMAE\/\/7ABQAFP\/7ABUAFf\/7ABYAFv\/7ABcAF\/\/7ABgAGP\/6ABkAGf\/6ABoAGv\/6ABsAG\/\/6ABwAHP\/6AB0AHf\/5AB4AHv\/5AB8AH\/\/5ACAAIP\/5ACEAIf\/5ACIAIv\/4ACMAI\/\/4ACQAJP\/4ACUAJf\/4ACYAJv\/3ACcAJ\/\/3ACgAKP\/3ACkAKf\/3ACoAKv\/3ACsAK\/\/2ACwALP\/2AC0ALf\/2AC4ALv\/2AC8AL\/\/2ADAAMP\/1ADEAMf\/1ADIAMv\/1ADMAM\/\/1ADQANP\/1ADUANf\/0ADYANv\/0ADcAN\/\/0ADgAOP\/0ADkAOf\/zADoAOv\/zADsAO\/\/zADwAPP\/zAD0APf\/zAD4APv\/yAD8AP\/\/yAEAAQP\/yAEEAQf\/yAEIAQv\/yAEMAQ\/\/xAEQARP\/xAEUARf\/xAEYARv\/xAEcAR\/\/xAEgASP\/wAEkASf\/wAEoASv\/wAEsAS\/\/wAEwATP\/vAE0ATf\/vAE4ATv\/vAE8AT\/\/vAFAAUP\/vAFEAUf\/uAFIAUv\/uAFMAU\/\/uAFQAVP\/uAFUAVf\/uAFYAVv\/tAFcAV\/\/tAFgAWP\/tAFkAWf\/tAFoAWv\/tAFsAW\/\/sAFwAXP\/sAF0AXf\/sAF4AXv\/sAF8AX\/\/rAGAAYP\/rAGEAYf\/rAGIAYv\/rAGMAY\/\/rAGQAZP\/qAGUAZf\/qAGYAZv\/qAGcAZ\/\/qAGgAaP\/qAGkAaf\/pAGoAav\/pAGsAa\/\/pAGwAbP\/pAG0Abf\/pAG4Abv\/oAG8Ab\/\/oAHAAcP\/oAHEAcf\/oAHIAcv\/nAHMAc\/\/nAHQAdP\/nAHUAdf\/nAHYAdv\/nAHcAd\/\/mAHgAeP\/mAHkAef\/mAHoAev\/mAHsAe\/\/mAHwAfP\/lAH0Aff\/lAH4Afv\/lAH8Af\/\/lAIAAgP\/kAIEAgf\/kAIIAgv\/kAIMAg\/\/kAIQAhP\/kAIUAhf\/jAIYAhv\/jAIcAh\/\/jAIgAiP\/jAIkAif\/jAIoAiv\/iAIsAi\/\/iAIwAjP\/iAI0Ajf\/iAI4Ajv\/iAI8Aj\/\/hAJAAkP\/hAJEAkf\/hAJIAkv\/hAJMAk\/\/gAJQAlP\/gAJUAlf\/gAJYAlv\/gAJcAl\/\/gAJgAmP\/fAJkAmf\/fAJoAmv\/fAJsAm\/\/fAJwAnP\/fAJ0Anf\/eAJ4Anv\/eAJ8An\/\/eAKAAoP\/eAKEAof\/eAKIAov\/dAKMAo\/\/dAKQApP\/dAKUApf\/dAKYApv\/cAKcAp\/\/cAKgAqP\/cAKkAqf\/cAKoAqv\/cAKsAq\/\/bAKwArP\/bAK0Arf\/bAK4Arv\/bAK8Ar\/\/bALAAsP\/aALEAsf\/aALIAsv\/aALMAs\/\/aALQAtP\/aALUAtf\/ZALYAtv\/ZALcAt\/\/ZALgAuP\/ZALkAuf\/YALoAuv\/YALsAu\/\/YALwAvP\/YAL0Avf\/YAL4Avv\/XAL8Av\/\/XAMAAwP\/XAMEAwf\/XAMIAwv\/XAMMAw\/\/WAMQAxP\/WAMUAxf\/WAMYAxv\/WAMcAx\/\/WAMgAyP\/VAMkAyf\/VAMoAyv\/VAMsAy\/\/VAMwAzP\/UAM0Azf\/UAM4Azv\/UAM8Az\/\/UANAA0P\/UANEA0f\/TANIA0v\/TANMA0\/\/TANQA1P\/TANUA1f\/TANYA1v\/SANcA1\/\/SANgA2P\/SANkA2f\/SANoA2v\/SANsA2\/\/RANwA3P\/RAN0A3f\/RAN4A3v\/RAN8A3\/\/QAOAA4P\/QAOEA4f\/QAOIA4v\/QAOMA4\/\/QAOQA5P\/PAOUA5f\/PAOYA5v\/PAOcA5\/\/PAOgA6P\/PAOkA6f\/OAOoA6v\/OAOsA6\/\/OAOwA7P\/OAO0A7f\/NAO4A7v\/NAO8A7\/\/NAPAA8P\/NAPEA8f\/NAPIA8v\/MAPMA8\/\/MAPQA9P\/MAPUA9f\/MAPYA9v\/MAPcA9\/\/LAPgA+P\/LAPkA+f\/LAPoA+v\/LAPsA+\/\/LAPwA\/P\/KAP0A\/f\/KAP4A\/v\/KAP8A\/\/\/KAAAAAwAAAAMAAABmAAEAAAAAABwAAwABAAAAPgAGACIAAAAuAAwACwAAAAEAAgADAAQABQAGAAcACAAJAAoABAAoAAAABgAEAAEAAgAuADn\/\/wAAAC4AMP\/\/\/93\/0QABAAAAAAAAAAQAKAAAAAYABAABAAIALgA5\/\/8AAAAuADD\/\/\/\/d\/9EAAQAAAAAAAAAAABQAWwBmgAAAAP\/6AAYB+wAGAsgABgAUAGUAawAAAAC4AAAsS7gACVBYsQEBjlm4Af+FuABEHbkACQADX14tuAABLCAgRWlEsAFgLbgAAiy4AAEqIS24AAMsIEawAyVGUlgjWSCKIIpJZIogRiBoYWSwBCVGIGhhZFJYI2WKWS8gsABTWGkgsABUWCGwQFkbaSCwAFRYIbBAZVlZOi24AAQsIEawBCVGUlgjilkgRiBqYWSwBCVGIGphZFJYI4pZL\/0tuAAFLEsgsAMmUFhRWLCARBuwQERZGyEhIEWwwFBYsMBEGyFZWS24AAYsICBFaUSwAWAgIEV9aRhEsAFgLbgAByy4AAYqLbgACCxLILADJlNYsEAbsABZioogsAMmU1gjIbCAioobiiNZILADJlNYIyG4AMCKihuKI1kgsAMmU1gjIbgBAIqKG4ojWSCwAyZTWCMhuAFAioobiiNZILgAAyZTWLADJUW4AYBQWCMhuAGAIyEbsAMlRSMhIyFZGyFZRC24AAksS1NYRUQbISFZLbgACixLuAAJUFixAQGOWbgB\/4W4AEQduQAJAANfXi24AAssICBFaUSwAWAtuAAMLLgACyohLbgADSwgRrADJUZSWCNZIIogiklkiiBGIGhhZLAEJUYgaGFkUlgjZYpZLyCwAFNYaSCwAFRYIbBAWRtpILAAVFghsEBlWVk6LbgADiwgRrAEJUZSWCOKWSBGIGphZLAEJUYgamFkUlgjilkv\/S24AA8sSyCwAyZQWFFYsIBEG7BARFkbISEgRbDAUFiwwEQbIVlZLbgAECwgIEVpRLABYCAgRX1pGESwAWAtuAARLLgAECotuAASLEsgsAMmU1iwQBuwAFmKiiCwAyZTWCMhsICKihuKI1kgsAMmU1gjIbgAwIqKG4ojWSCwAyZTWCMhuAEAioobiiNZILADJlNYIyG4AUCKihuKI1kguAADJlNYsAMlRbgBgFBYIyG4AYAjIRuwAyVFIyEjIVkbIVlELbgAEyxLU1hFRBshIVktAAAAAgA7\/\/QB2gLUABUAKwAquAAsL7gAFi+5AAUAAvS4ACwQuAAQ0LgAEC+5ACEAAvS4AAUQuAAt3DAxATIeAhURFA4CIyIuAjURND4CFzQuAiMiDgIVERQeAjMyPgI1AQorTDghIThMKytLOCEhOEuQEBslFRUkHBAQHCQVFSUbEALUIThMK\/7AK0w4ISE4TCsBQCtMOCHKFSUbEBAbJRX+tBUlGxAQGyUVAAAAAAEAUgAAAXUCyAAHAC8AuAAARVi4AAAvG7kAAAAJPlm4AABFWLgAAi8buQACAAU+WboABAACAAAREjkwMQEzESMRByc3AQRxcWtHsgLI\/TgCP19TlQAAAAABAD8AAAHYAtQAHQBsuAAKK7sAGwANAAgADiu4ABsQuAAB0LgAAS9BBQBKAAgAWgAIAAJdQQkACQAIABkACAApAAgAOQAIAARduAAbELgAH9wAuAALRVi4AAIvG7kAAgAOPlm7ABYADAANAA4ruAACELkAAAAM9DAxNyEVIT0BATY1NC4CIyIOAgcnPgEzMh4CFRQHwgER\/mwBHREQGyQVFScgFwRTF25FK0s4ISFqamoBAWoXHhMjGQ8QFxoLNTpJIDdJKj0yAAEAH\/\/0AegCyAAnAE+4AAoruwAFAA0AFgAOK0EFAEoAFgBaABYAAl1BCQAJABYAGQAWACkAFgA5ABYABF24AAUQuAAo3AC7ABEADAAKAA4ruwAlAAwAIgAOKzAxAR4DFRQOAiMiJic3HgEzMj4CNTQuAiMiBgcGByc3IzUhFQcBKSlGMx0mQlkyRXEgZBE8JRsvJBQUJC8bBgsFKRw1r8ABWYQBzwkrPk4rMldBJkQ5NB0jFCIvGhsuIxQBAQgaJP9lNsMAAAAAAgAaAAAB7gLIAAoADQA5ALgAAEVYuAAILxu5AAgACT5ZuAAARVi4AAMvG7kAAwAFPlm6AAsAAwAIERI5ugANAAMACBESOTAxJRUjFSM1ITUBMxEhMxEB7k1l\/t4BFnH+6bL5ZZSUZQHP\/jEBOAAAAAEAL\/\/0Ae8CyAAoAHm4AAoruAApL7gAFi9BBQBKABYAWgAWAAJdQQkACQAWABkAFgApABYAOQAWAARduQAFAA30uAApELgAItC4ACIvuQAnAA30uAAFELgAKtwAuwARAAwACgAOK7sAJAAMACUADiu7AAAADAAbAA4rugAnABsAABESOTAxATIeAhUUDgIjIiYnNx4BMzI+AjU0LgIjIgYHDgEHJxEhFSMVNgECMVZBJSVBVjFFcR1kDzslGi0iFBQiLRoZLhECAQFEAUbhGwHOJUFWMTFWQSVHOjQeJhMiLRoaLSIUFBEBAgEuAWVlnAcAAAACACz\/9AHvAsgAFwArABQAuAAARVi4ABMvG7kAEwAJPlkwMQEyHgIVFA4CIyIuAjU0NjcTMwMyNhMyPgI1NC4CIyIOAhUUHgIBDi5SPiMjPlIuL1I+Iw0LynaKBQoFGCsgExMgKxgZKyATEyArAbcjPlIvL1E+IyM+US8cMhcBjv7uAf6oEyArGBkrIBMTICsZGCsgEwAAAAEAQgAAAdYCyAAIABQAuAAARVi4AAQvG7kABAAFPlkwMRMhFTEDIxMhNUIBlOJ14P7jAshf\/ZcCY2UAAAMAKf\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') format('truetype');font-weight:normal;font-style:normal}@media(min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.appmsg_card_ft,.appmsg_card_btn{font-size:15px}}.da_video_area .da_video_bg_cover{width:100%;min-height:100px;display:block;background-repeat:no-repeat;background-position:center center;background-size:cover}.da_btn_more{display:inline-block;color:#576b95;font-size:13px;border:1px solid #576b95;border-radius:3px;line-height:2.2;padding:0 .65em}.da_brand_info{display:flex;align-items:center;min-height:38px}.da_brand_info .da_brand_info_hd{width:35px;height:35px;display:inline-block;margin-right:10px;vertical-align:middle;border-radius:50%;overflow:hidden;background-repeat:no-repeat;background-position:center center;background-size:cover}.da_brand_info .da_brand_info_content{font-size:0;display:inline-block;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0);box-sizing:border-box;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.da_brand_info .da_brand_info_title{margin:0;font-size:14px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.da_brand_info .da_brand_info_details{margin:0;vertical-align:top;font-size:13px;color:#878787;-webkit-tap-highlight-color:rgba(0,0,0,0)}.discuss_icon_tips{margin-top:20px}.rich_tips.discuss_title_line{margin-top:30px}.discuss_item:first-child{margin-top:12px}.discuss_item:last-child{margin-bottom:20px}";
});;define('page/appmsg_new/combo.css', [], function(require, exports, module) {
	return ".selectTdClass{background-color:#edf5fa!important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd!important}table{margin-bottom:10px;border-collapse:collapse;display:table;width:100%!important}td,th{word-wrap:break-word;word-break:break-all;padding:5px 10px;border:1px solid #DDD}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center}th{border-top:2px solid #BBB;background:#f7f7f7}.ue-table-interlace-color-single{background-color:#fcfcfc}.ue-table-interlace-color-double{background-color:#f7faff}td p{margin:0;padding:0}.res_iframe{display:block;width:100%;background-color:transparent;border:0}.shopcard_iframe{margin:14px 0;height:95px}.vote_area{display:block;position:relative;margin:14px 0;white-space:normal!important}.vote_iframe{display:block;width:100%;height:100%;background-color:transparent;border:0}form{display:none!important}@media screen and (min-width:0\\0) and (min-resolution:72dpi){.rich_media_content table{table-layout:fixed!important}.rich_media_content td,.rich_media_content th{width:auto!important}}.tc{text-align:center}.tl{text-align:left}.tr{text-align:right}.tips_global{color:#888}.rich_split_tips{margin:20px 0;min-height:24px}.rich_media_tool_tips{margin-bottom:8px}.rich_media_tool{overflow:hidden;padding-top:15px;line-height:32px}.rich_media_tool .meta_primary{float:left;margin-right:10px}.rich_media_tool .meta_extra{float:right;margin-left:10px}.rich_media_tool .meta_praise{margin-right:0;margin-left:8px}.media_tool_meta i{vertical-align:0;position:relative;top:1px;margin-right:3px}.meta_praise{-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;min-width:3.5em}.meta_praise .praise_num{display:inline-block;vertical-align:top}.icon_praise_gray{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp\/O+GkJHJd4H7kr5nm\/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil\/ENST20ml8BF4Afu4z9HT3V80B\/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS\/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9\/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq\/sQqSpmgWvo82rBbTdCPeAA4N69\/noXS1XhphaBz27SPPVtapz\/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko\/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA\/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8\/GsFi3mW\/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width:13px;height:13px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto}.icon_praise_gray.praised{background-position:0 -18px}.praised .icon_praise_gray{background-position:0 -18px}.rich_split_tips{margin:20px 0;min-height:24px}.rich_media_tool_tips{margin-bottom:8px}.rich_media_tool{overflow:hidden;padding-top:15px;line-height:32px}.rich_media_tool .meta_primary{float:left;margin-right:10px}.rich_media_tool .meta_primary.article_modify_tag{margin-bottom:0;float:none;color:#bcbcbc;font-size:14px}.rich_media_tool .meta_extra{float:right;margin-left:10px}.rich_media_tool .meta_praise{margin-right:0;margin-left:8px}.media_tool_meta i{vertical-align:0;position:relative;top:1px;margin-right:3px}.meta_praise{-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;min-width:3.5em}.meta_praise .praise_num{display:inline-block;vertical-align:top}.icon_praise_gray{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp\/O+GkJHJd4H7kr5nm\/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil\/ENST20ml8BF4Afu4z9HT3V80B\/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS\/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9\/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq\/sQqSpmgWvo82rBbTdCPeAA4N69\/noXS1XhphaBz27SPPVtapz\/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko\/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA\/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8\/GsFi3mW\/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width:13px;height:13px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto}.icon_praise_gray.praised{background-position:0 -18px}.praised .icon_praise_gray{background-position:0 -18px}.rich_tips{margin-top:25px;margin-bottom:0;min-height:24px;text-align:center}.rich_tips .tips{display:inline-block;vertical-align:middle}.rich_tips .tips,.rich_tips .rich_icon{vertical-align:middle}.rich_tips .rich_icon{margin-top:-3px 5px 0 0}.rich_tips.with_line{border-top:1px dotted #e1e1e1}.rich_tips.with_line .tips{position:relative;top:-12px;padding-left:16px;padding-right:16px;background-color:#f2f2f2}.btn_primary{background-color:#04be02}.btn_primary:not(.btn_disabled):visited{color:#fff}.btn_primary:not(.btn_disabled):active{color:rgba(255,255,255,0.4);background-color:#039702}.btn_disabled{color:rgba(255,255,255,0.6)}.rich_tips.with_line{line-height:16px}.rich_tips.with_line .tips{top:-11px;padding-left:.35em;padding-right:.35em}.title_tips{margin-top:35px}.title_tips .tips{color:#868686;font-size:16px}.loading_tips{margin:36px 0 20px}.title_bottom_tips{margin-top:-10px}.icon_arrow_gray{width:7px}.icon_loading_white{width:16px}.icon_loading_white.icon_before{margin-right:1em}.icon_loading_white.icon_after{margin-left:1em}.btn{display:block;padding-left:14px;padding-right:14px;font-size:18px;text-align:center;text-decoration:none;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;color:#fff;line-height:42px;-webkit-tap-highlight-color:rgba(255,255,255,0)}.btn.btn_inline{display:inline-block}.rich_media_extra{overflow:hidden}.sougou_body .rich_media_area_primary{margin-top:10px}.sougou_body .rich_media_area_primary:first-child{margin-top:0}.sougou_body .rich_media_area_primary.sougou ul{padding-left:0;list-style-type:none}.sougou_body .rich_media_area_extra{margin-top:10px;background-color:#fff}.sougou_body .rich_media_area_title{font-size:16px;margin-bottom:.5em}.sougou_body .relate_article_list{font-size:15px}.sougou_body .relate_article_link{display:block;padding:.35em 0;color:#888;-webkit-tap-highlight-color:rgba(0,0,0,0)}.sougou_body .rich_tips.discuss_title_line{text-align:left;margin-top:0;padding:20px 0 .5em;border-width:0;line-height:1.6}.sougou_body .rich_tips.discuss_title_line .tips{position:static;padding:0;color:#333}.sougou_body .rich_tips.with_line .tips{background-color:#fff}.sougou_body .rich_split_tips{margin:0;padding:20px 0}.sougou_body .rich_media_extra .loading_tips{margin:0;padding:20px 0}.emotion_tool{position:relative;overflow:hidden}.pic_emotion_switch_wrp{margin-left:15px;margin-bottom:6px;display:inline-block;font-size:0}.pic_emotion_switch_wrp img{width:35px;display:block}.pic_emotion_switch_wrp .pic_active{display:none}.pic_emotion_switch_wrp:active .pic_default{display:none}.pic_emotion_switch_wrp:active .pic_active{display:block}.emotion_switch{margin-left:15px;margin-bottom:6px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:35px;height:35px;vertical-align:middle;display:inline-block;-webkit-background-size:35px auto;background-size:35px auto}.emotion_switch:active{background-position:0 -40px}.emotion_panel_arrow_wrp{position:absolute;margin-top:-6px;margin-left:26px}.emotion_panel_arrow_wrp .emotion_panel_arrow{position:absolute;display:inline-block;width:0;height:0;border-width:6px;border-style:dashed;border-color:transparent;border-top-width:0;border-bottom-color:#e5e5e7;border-bottom-style:solid}.emotion_panel_arrow_wrp .arrow_in{border-bottom-color:#f6f6f8;top:1px}.emotion_panel{background-color:#f6f6f8;position:relative}.emotion_panel:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e3e3e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_panel:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e3e3e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_list_wrp{overflow:hidden;position:relative;font-size:0;white-space:nowrap}.emotion_list{padding:10px 15px 0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;white-space:normal;display:inline-block;vertical-align:top}.emotion_list:last-child .emotion_item.del{position:absolute;bottom:0;right:18px}.emotion_item{display:inline-block;width:36px;height:36px;margin-bottom:5px;text-align:center;line-height:36px}.emotion_navs{text-align:center;padding-bottom:5px}.emotion_nav{display:inline-block;width:8px;height:8px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;background-color:#bbb;margin:0 5px}.emotion_nav.current{background-color:#8c8c8c}.icon_emotion{width:22px;height:22px;vertical-align:middle;display:inline-block;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/icon_emotion_panel.2x3518c6.png) no-repeat 0 0;-webkit-background-size:22px auto;background-size:22px auto}.icon_emotion.del{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:28px;height:28px;vertical-align:middle;display:inline-block;background-position:2px -62px;-webkit-background-size:28px auto;background-size:28px auto}.icon_emotion.del:active{background-position:2px -92px}.icon_emotion_single{width:22px;height:22px;vertical-align:middle;display:inline-block;-webkit-background-size:22px auto;background-size:22px auto}.icon_smiley_0{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_03518c6.png)}.icon_smiley_1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_13518c6.png)}.icon_smiley_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_23518c6.png)}.icon_smiley_3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_33518c6.png)}.icon_smiley_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_43518c6.png)}.icon_smiley_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_53518c6.png)}.icon_smiley_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_63518c6.png)}.icon_smiley_7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_73518c6.png)}.icon_smiley_8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_83518c6.png)}.icon_smiley_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_93518c6.png)}.icon_smiley_10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_103518c6.png)}.icon_smiley_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_113518c6.png)}.icon_smiley_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_123518c6.png)}.icon_smiley_13{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_133518c6.png)}.icon_smiley_14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_143518c6.png)}.icon_smiley_15{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_153518c6.png)}.icon_smiley_17{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_173518c6.png)}.icon_smiley_18{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_183518c6.png)}.icon_smiley_19{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_193518c6.png)}.icon_smiley_20{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_203518c6.png)}.icon_smiley_21{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_213518c6.png)}.icon_smiley_22{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_223518c6.png)}.icon_smiley_23{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_233518c6.png)}.icon_smiley_25{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_253518c6.png)}.icon_smiley_26{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_263518c6.png)}.icon_smiley_27{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_273518c6.png)}.icon_smiley_28{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_283518c6.png)}.icon_smiley_29{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_293518c6.png)}.icon_smiley_30{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_303518c6.png)}.icon_smiley_31{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_313518c6.png)}.icon_smiley_32{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_323518c6.png)}.icon_smiley_33{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_333518c6.png)}.icon_smiley_34{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_343518c6.png)}.icon_smiley_36{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_363518c6.png)}.icon_smiley_37{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_373518c6.png)}.icon_smiley_38{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_383518c6.png)}.icon_smiley_39{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_393518c6.png)}.icon_smiley_40{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_403518c6.png)}.icon_smiley_41{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_413518c6.png)}.icon_smiley_42{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_423518c6.png)}.icon_smiley_44{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_443518c6.png)}.icon_smiley_45{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_453518c6.png)}.icon_smiley_46{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_463518c6.png)}.icon_smiley_47{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_473518c6.png)}.icon_smiley_48{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_483518c6.png)}.icon_smiley_49{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_493518c6.png)}.icon_smiley_50{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_503518c6.png)}.icon_smiley_51{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_513518c6.png)}.icon_smiley_52{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_523518c6.png)}.icon_smiley_54{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_543518c6.png)}.icon_smiley_55{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_553518c6.png)}.icon_smiley_56{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_563518c6.png)}.icon_smiley_57{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_573518c6.png)}.icon_smiley_60{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_603518c6.png)}.icon_smiley_62{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_623518c6.png)}.icon_smiley_63{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_633518c6.png)}.icon_smiley_64{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_643518c6.png)}.icon_smiley_65{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_653518c6.png)}.icon_smiley_66{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_663518c6.png)}.icon_smiley_67{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_673518c6.png)}.icon_smiley_68{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_683518c6.png)}.icon_smiley_70{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_703518c6.png)}.icon_smiley_74{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_743518c6.png)}.icon_smiley_75{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_753518c6.png)}.icon_smiley_76{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_763518c6.png)}.icon_smiley_78{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_783518c6.png)}.icon_smiley_79{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_793518c6.png)}.icon_smiley_80{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_803518c6.png)}.icon_smiley_81{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_813518c6.png)}.icon_smiley_82{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_823518c6.png)}.icon_smiley_83{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_833518c6.png)}.icon_smiley_84{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_843518c6.png)}.icon_smiley_85{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_853518c6.png)}.icon_smiley_89{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_893518c6.png)}.icon_smiley_92{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_923518c6.png)}.icon_smiley_93{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_933518c6.png)}.icon_smiley_94{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_943518c6.png)}.icon_smiley_95{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_953518c6.png)}.icon_emoji_ios_0{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6043518c6.png)}.icon_emoji_ios_1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6373518c6.png)}.icon_emoji_ios_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6023518c6.png)}.icon_emoji_ios_3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F61D3518c6.png)}.icon_emoji_ios_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6333518c6.png)}.icon_emoji_ios_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6313518c6.png)}.icon_emoji_ios_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6143518c6.png)}.icon_emoji_ios_7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6123518c6.png)}.icon_emoji_wx_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_043518c6.png)}.icon_emoji_wx_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_053518c6.png)}.icon_emoji_wx_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_023518c6.png)}.icon_emoji_wx_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_063518c6.png)}.icon_emoji_wx_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_123518c6.png)}.icon_emoji_wx_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_113518c6.png)}.icon_emoji_ios_8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F47B3518c6.png)}.icon_emoji_ios_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F64F.03518c6.png)}.icon_emoji_ios_10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F4AA.03518c6.png)}.icon_emoji_ios_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F3893518c6.png)}.icon_emoji_ios_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F3813518c6.png)}.icon_emoji_wx_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_093518c6.png)}.icon_emoji_wx_14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_143518c6.png)}.wx_poptips{position:fixed;z-index:3;width:120px;min-height:120px;top:180px;left:50%;margin-left:-60px;background:rgba(40,40,40,0.5)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#80282828',endcolorstr = '#80282828');text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;color:#fff}.wx_poptips .icon_toast{width:53px;margin:15px 0 0}.wx_poptips .toast_content{margin:0 0 15px}.discuss_container .rich_media_title{font-size:18px}.discuss_container.disabled .btn_discuss{color:#60f05f}.discuss_container.access .discuss_container_inner{padding:15px 15px 0}.discuss_container.editing .discuss_container_inner{padding-bottom:25px}.discuss_container.editing .frm_textarea_box_wrp{margin:0 -15px}.discuss_container.editing .frm_textarea{height:78px;-webkit-overflow-scrolling:touch}.discuss_container.editing .frm_append.counter{display:block}.discuss_container.editing .discuss_btn_wrp{display:block}.discuss_container.editing .discuss_icon_tips{margin-top:0;margin-bottom:-14px}.discuss_container.editing .discuss_title_line{margin-bottom:-20px}.discuss_container.warning .counter{color:#e15f63}.frm_textarea{width:100%;background-color:transparent;border:0;display:block;font-size:14px;-webkit-box-sizing:border-box;box-sizing:border-box;height:37px;padding:10px 15px;resize:none;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.frm_textarea_box_wrp{position:relative}.frm_textarea_box_wrp:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:-1px}.frm_textarea_box_wrp:after{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.frm_textarea_box{display:block;background-color:#fff}.frm_append.counter{display:none;position:absolute;right:8px;bottom:8px;color:#a3a3a3;font-weight:400;font-style:normal;font-size:12px}.frm_append .current_num.warn{color:#f43631}.discuss_btn_wrp{display:none;margin-top:20px;margin-bottom:20px;text-align:right}.btn_discuss{padding-left:1.5em;padding-right:1.5em}.discuss_list{margin-top:-5px;padding-bottom:20px;font-size:16px;list-style:none}.discuss_item{position:relative;padding-left:45px;margin-top:26px;*zoom:1}.discuss_item:after{content:\"\\200B\";display:block;height:0;clear:both}.discuss_item .user_info{min-height:20px;overflow:hidden}.discuss_item .nickname{display:inline-block;vertical-align:middle;font-weight:400;font-style:normal;color:#727272;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;max-width:9em}.discuss_item .avatar{position:absolute;top:0;left:0;top:3px;width:35px;height:35px;background-color:#ccc;vertical-align:top;margin-top:0;border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px}.discuss_item .discuss_message{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;color:#333;line-height:1.5}.discuss_item .discuss_message_content{white-space:pre-wrap}.discuss_item .discuss_extra_info{color:#bdbdbd;font-size:13px}.discuss_item .discuss_extra_info a{margin-left:.5em}.discuss_item .discuss_status{color:#ff7a21;white-space:nowrap}.discuss_item .discuss_status i{font-style:normal;margin-right:2px}.discuss_item .discuss_opr{float:right}.discuss_item .discuss_opr .meta_praise{display:inline-block;text-align:right;padding-top:5px;margin-top:-5px}.discuss_item .discuss_opr .praise_num{-webkit-user-select:none;user-select:none}.discuss_item .discuss_del{margin-left:.5em}.discuss_icon_tips{margin-bottom:20px}.discuss_icon_tips img{vertical-align:middle;margin-right:3px;margin-top:-4px}.discuss_icon_tips .icon_edit{width:12px}.discuss_icon_tips .icon_access{width:13px}.reply_result{position:relative;margin-top:.5em;padding-top:.5em;padding-left:.4em}.reply_result:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #dadada;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.reply_result .discuss_message{clear:both}.reply_result .nickname{position:relative;overflow:visible}.reply_result .nickname:before{content:\" \";position:absolute;left:-0.4em;top:50%;margin-top:-7px;width:3px;height:14px;background-color:#02bb00}.rich_tips.discuss_title_line{margin-top:50px}.icon_discuss_top{display:inline-block;vertical-align:middle;padding:1px .5em;border:1px solid #bdbdbd;color:#bdbdbd;border-top-left-radius:.7em 50%;-moz-border-radius-topleft:.7em 50%;-webkit-border-top-left-radius:.7em 50%;border-top-right-radius:.7em 50%;-moz-border-radius-topright:.7em 50%;-webkit-border-top-right-radius:.7em 50%;border-bottom-left-radius:.7em 50%;-moz-border-radius-bottomleft:.7em 50%;-webkit-border-bottom-left-radius:.7em 50%;border-bottom-right-radius:.7em 50%;-moz-border-radius-bottomright:.7em 50%;-webkit-border-bottom-right-radius:.7em 50%;font-size:12px;line-height:1;margin-top:-1px;margin-left:.5em}@media screen and (device-aspect-ratio:2\/3),screen and (device-aspect-ratio:40\/71){.icon_discuss_top{font-size:11px;line-height:1.1;padding-top:0}}.reward_area{padding:38px 0 20px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.reward_inner{position:relative}.reward_area_inner{margin:0 auto;position:relative;left:3px}.reward-avatar{display:inline-block;width:50px;height:50px;margin:0 auto;border-radius:50%;overflow:hidden}.reward-avatar img{width:100%;height:100%!important;object-fit:cover}.reward-author{font-size:16px;color:#000;text-align:center;margin-top:10px;line-height:1}.reward_access{display:inline-block;padding:0 1.6em;line-height:2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:16px;background-color:#dc5d4a;color:#fff;-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_access:active{background-color:#be5041;color:#e69990}.icon-reward{display:none;width:17px;height:18px;vertical-align:-2px;background-image:url(\"data:image\/svg+xml,%3Csvg width='19' height='20' viewBox='0 0 19 20' xmlns='http:\/\/www.w3.org\/2000\/svg'%3E%3Ctitle%3Eicon reward%3C\/title%3E%3Cdesc%3Ewechat reward.%3C\/desc%3E%3Cg fill='none'%3E%3Cpath d='M14.313 7.261l-.032-.004c-.462-.066-.712-.364-.824-.711-.042-.13-.06-.253-.068-.398-.009-.151-.008-.235.001-.645.022-.999-.015-1.624-.194-2.298l-.121-.386-.035-.118c-.044-.196-.184-.549-.437-.895-.44-.602-1.044-.918-1.951-.846-.963.076-1.397.848-1.406 2.11v.009c-.006.908-.022 1.375-.093 1.972-.169 1.421-.593 2.49-1.473 3.132-.617.45-1.61.688-2.962.826-.984.101-1.996.129-2.824.12l-.072-.001c-.153 0-.759.697-.759.95l-.11 7.776c-.044.569.331.917.869.917h10.741c1.054 0 1.88-.147 2.786-.693.52-.314.988-.738 1.396-1.294 1.321-1.803 1.5-3.456 1.085-7.244-.107-.982-1.029-1.976-2.161-2.132l-1.357-.145z' stroke='%23FAFAFA' stroke-width='1.9'\/%3E%3Cpath d='M9.241 15.058l-.184.044c-.153 0-.286-.084-.356-.208l-.027-.058-1.994-2.273-.02-.085c-.065-.243.221-.556.463-.476l.122.04 1.496.998c.096.063.211.099.334.099l.209-.037 4.601-3.524c.543-.148.661.002.426.529l-5.027 4.926-.045.026z' fill='%23FAFAFA'\/%3E%3C\/g%3E%3C\/svg%3E\");background-repeat:no-repeat;-webkit-background-size:contain;background-size:contain;margin-right:.5em}.reward_button{display:inline-block;margin-top:30px;padding:0 1.6em;line-height:2.2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:16px;border:1px solid currentColor;color:#fd6143;-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_button:active{color:#f46f56}.reward_button:before{content:\" \";width:17px;height:17px;display:inline-block;background:transparent url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAFNQDtUAAAABGdBTUEAALGPC\/xhBQAABglJREFUWAm1V3uIVUUY\/75z73pzdbOHhprmSmlBtkEkUffebctMxAi1pAfB3t3VhR6CaUoUPqIH\/SEJGmU+dq+gpRY9IK0Uxdy7+YcU9DDKQoxws3yVsbru3j1fv5lzZ84597kKDdydb77X\/M7Mb76ZJco1aYq\/ZGTHCOTSMkklXldjR1LJVdIYd3lTJ2N8SFoabiBY\/1BWGC7ofl5iIktjchmRa\/PlIpQdnqn4Zk\/K\/4scIq3JUdqreeroaCjOcfuROC4mKmQ0Sp0ilVgoK1b4H2GMOm8q3i7N8elaVvOZjNKY+Nk4SnPiVs8hkbW6VHyBwt5tFPm9zVRgKBOk1u0LFRCMDiNnuic\/YzSkEKrSY6bTOkuMxwUXahcWalowQDsF51NGbO5i46RsoSmwNic43THCOKg+BJI3ZaxRUg03EfM3QQzBQILxe05n6hSJSjZQKA4KZXwH7sYsQ\/2xJ4Vg5BuRYK3SKap4dJEh+NB5+X4VktAkQP47HCSTw2NMohQgyA4SvhPSlWEHPgz4NwZ10jLtKnLPJcl1P1Z6jRLn6TsSucWDG3QPy1jlkUR9xzjdGTEWvadMD2Hv5HKjDPZI3onxFZhgEOar5fQ+RR2bwPoKDwcjEx6frHZgAiY5YNilOHABYYPIiUypGC7uSBJ6AehvVr5mCcrzZPucCO3o+gnuQ2iQTOX1nYeKTVQ+iSkCJjJSfS237e4yQ9NX4glA8PMGNrnnfzSBwX4ASegvL4APY6eGBYONXDKJiOQ+1flNOzP9YILy+5JJqKn+GeXM7fv3ekHSp3p5ds5gb+z\/LZpEWlurSNzVvhskdubr8emuc4of+B00dgada0myB4mlGhyoNgbdD46N4bV7jwV1MjdZR32yFJgexqK\/gXqyqLDgMHXB+Da3Z14JBitZmhIPQP+plnPbr3bOq3vsNKHepZWxVAP8L2FLWzvTUSCvVWNvTVgU9W2TuQ1j7AACzlcW6N4BinZfz96uQeEhkXASytJJtXhYzeeQYiU5PIfbOz7wE6jM\/on2kIgTQoJj30PRqgleAmdmQQKdTRImqYckkocEVt6471fVGcdgr4mYQg6mT5TeQ+JGQkiCAUXlVPKU1rdnZqk+tyb9ddJUrypX6Sb9qGrOZJDwVbUgIN+TzKwfD14SkjfJ7S+dwFpcT4pG7uaN+\/cbddFvNsZKPUrkBpzsliJ+vUD6CLinb4Qi9gKVt64F6soKXFWrLQjmb3WJdpyF4KRXssX9CEDXVc7keVwyEGwOrvpcE3pLVR1QchWAjAV7vPUXmafPvPEr0186EKHhNm9E7I0PMCeg\/9za+uVBK5cRLgmItN57PRh7nc0rkQNW1gJ3B8Y1AbmkmGN8SXuBQeZPj9HZfz+0Buat2Jbf7dgT\/PvNlSUoS0uwlWdQwgHYeZ9qhr7Haz4LnfeSp0bUNb731Ejq7R2P91MtVgBnl2aBoGPtpMy7Uefvt+OAAKI2wHcNVJMCal9kPkLDq+t45S69eixPT7maunvw1qLRvlcZyTsVmykae5E37PmzjGdRk\/rnCcVogTYyH6f2jtGqIKlLS12Dt+cM63H+t6JYZuH8D4lzGj+8vVGwL6LJioYoHe17DSGLkOsxbuvcHgzHap3Hal2mdRFOclsmA47gBaVKpdc6\/MvfqAbeS0t9PfW72wDiGlxRTZgA5bhoUxy6TVtcVlsHIEwxi8MpvHWCaVDEloIvyxGzkmpqlivCSet9w6i3J40vnElZN0uO8wQ+ZlswrlD2jzviNFgHQsw65t2hVp8T8A5\/mWJRvMlpNp0926Mv6QvnUUNkBkV4Nh7\/VZVBIFponM3NdEbJamsAJLc1+S8C6+0LvG7fSYwm4pa8CzzaitV5yjx2fK\/SEsj6KOJQh1Tjkzh17yoJW4MVMRRxBn6X48u\/Qrxf1FS2Cg0kfRwgtlg3pmYjRwEisDXlOWKCLrZXT0TM0wYajPBiWb0X7sBqfG1y4fgmjmBrxhvF\/9sDgMOL9eWYN1GUZoyaQDuPLwTaRgDyq2ae40UN9YtJenDCfkHOgyDyTtrYsce8pIrl+g89bFNOD\/AegwAAAABJRU5ErkJggg==') 0 0 no-repeat;background-size:17px 17px;vertical-align:-3px;margin-right:4px}.reward_tips{margin-bottom:5px}.reward_user_tips{margin-top:2em}.reward_user_list{padding-top:.5em;overflow:hidden}.reward_user_avatar{display:inline-block;vertical-align:top;width:28px;height:28px;margin:0 6px 6px 0}.reward_user_avatar img{width:100%;height:100%!important}.reward_user_avatar.readmore{-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_qrcode_area{margin:38px 0 20px;padding:30px 20px;font-size:14px;border:1px solid #ebebeb}.reward_qrcode_area p{word-wrap:break-word;word-break:break-all}.reward_qrcode_area .tips_global{font-size:13px}.reward_qrcode_area .reward_money{font-size:30px;margin-top:.6em;margin-bottom:-0.1em;line-height:1;font-family:\"WeChatNumber-151125\"}.reward_qrcode_area .reward_tips{margin-top:1em;margin-bottom:0}.reward_qrcode_img_wrp{width:200px;height:200px;background-color:#fff;display:block;margin:1.5em auto 1.6em}.reward_qrcode_img{width:100%;height:100%;display:block}@font-face{font-weight:normal;font-style:normal;font-family:\"WeChatNumber-151125\";src:url('https:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/assets\/WeChatNumber-170206.ttf') format('truetype')}@media(min-device-width:414px){.reward_qrcode_area .tips_global{line-height:1.8}.reward_qrcode_area .reward_money{margin-top:.6em}.reward_qrcode_area .reward_tips{margin-top:1.2em}.reward_qrcode_img_wrp{width:224px;height:224px;margin:1.8em auto}.reward_access{line-height:44px;font-size:17px}.icon-reward{width:19px;height:20px;vertical-align:-3px}}.reward_area_primary .reward-avatar{border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px}.reward_area_primary .reward-author{margin-top:15px;font-size:17px}.rich_media_extra{position:relative}.rich_media_extra .extra_link{display:block}.rich_media_extra img{vertical-align:middle;margin-top:-3px}.rich_media_extra .appmsg_banner{width:100%}.rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.btn_default.btn_line,.btn_primary.btn_line{background-color:#fff;color:#04be02;border:1px solid #04be02;font-size:15px}.rich_media_extra .extra_link{position:relative}.promotion_tag{background-color:rgba(0,0,0,0.51);position:absolute;display:block;height:20px;line-height:20px;font-size:14px;font-style:normal;color:#fff;padding-right:6px;text-align:right;right:0;bottom:0}.promotion_tag:before{content:'';width:14px;height:20px;position:absolute;top:0;right:100%;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_primary2c7543.png) no-repeat 0 0;-webkit-background-size:79px 20px;background-size:79px 20px;overflow:hidden}.brand_logo{position:absolute;display:block;width:24%;right:1.54%;top:0}.brand_logo img{width:100%;vertical-align:top;max-height:35px}.top_banner{background-color:#fff}.top_banner .rich_media_extra{padding:15px 15px 20px 15px}.top_banner .rich_media_extra .extra_link{position:relative;padding-bottom:10px}.top_banner .rich_media_extra .extra_link:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #d6d6d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.top_banner .rich_media_extra .extra_link:active,.top_banner .rich_media_extra .extra_link:focus{outline:0;border:0}.top_banner .rich_media_extra .appmsg_banner{width:100%;vertical-align:top;outline:0}.top_banner .rich_media_extra .appmsg_banner:active,.top_banner .rich_media_extra .appmsg_banner:focus{outline:0;border:0}.top_banner .rich_media_extra .promotion_tag{height:19px;line-height:19px;width:69px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_small24a2fe.png) no-repeat 0 0;font-size:12px;-webkit-background-size:69px 19px;background-size:69px 19px;bottom:10px;padding-left:6px}.top_banner .rich_media_extra .brand_logo{width:20%;right:2.22%}.top_banner .rich_media_extra .brand_logo img{max-height:35px}.top_banner .rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.top_banner .rich_media_extra .ad_msg_mask img{position:absolute;width:16px;top:50%;margin-top:-8px;left:50%;margin-left:-8px}.top_banner .preview_group.obvious_app{min-height:54px;position:relative}.top_banner .preview_group.obvious_app .pic_app{width:66.6%}.top_banner .preview_group.obvious_app .pic_app img{height:100%;min-height:54px}.top_banner .preview_group.obvious_app .info_app{width:33%;left:68%}.top_banner .preview_group.obvious_app .info_app .name_app{line-height:18px;font-size:13px}.top_banner .preview_group.obvious_app .info_app .profile_app{font-size:10px}.top_banner .preview_group.obvious_app .info_app .dm_app{bottom:5px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn{font-size:12px;padding-left:17px;line-height:16px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{-webkit-background-size:14px 14px;background-size:14px 14px;background-position:0 center;-webkit-background-position:0 center}.top_banner .preview_group.obvious_app .info_app .dm_app .extra_info{display:none}.appmsg_card_btn.with_processor .btn_processor{background-color:#576b95}.da_btn_more.with_processor .btn_processor{background-color:#576b95}.with_processor{position:relative;overflow:hidden}.with_processor .btn_processor{display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:#04be02}.with_processor .btn_processor_value{position:relative}.wrp_preview_group{padding-top:100px}.preview_group{position:relative;min-height:83px;background-color:#fff;border:1px solid #e7e7eb;-webkit-text-size-adjust:none;text-size-adjust:none}.preview_group.fixed_pos{position:fixed;bottom:0;left:0;right:0}.preview_group .preview_group_inner{padding:14px}.preview_group .preview_group_inner .preview_group_info{padding-left:68px;color:#8d8d8d;font-size:14px}.preview_group .preview_group_inner .preview_group_info .preview_group_title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;color:#000;font-weight:400;font-style:normal;padding-right:73px;max-width:142px;display:block}.preview_group .preview_group_inner .preview_group_info .preview_group_desc{padding-right:65px;display:inline-block;line-height:20px}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar{position:absolute;width:55px;height:55px;left:13px;top:50%;margin-top:-27px;z-index:1}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar.br_radius{border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%}.preview_group .preview_group_inner .preview_group_opr{position:absolute;line-height:83px;top:0;right:13px}.preview_group .preview_group_inner .preview_group_opr .btn{padding:0;min-width:60px;min-height:30px;height:auto;line-height:30px;text-align:center}.preview_group.preview_card .card_inner{padding:0;min-height:89px}.preview_group.preview_card .card_inner .preview_card_avatar{position:absolute;width:89px;height:89px!important;margin:0;left:0;top:0}.preview_group.preview_card .card_inner .preview_group_info{padding:10px 12px 0 106px}.preview_group.preview_card .card_inner .preview_group_info .preview_group_title2{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;padding-right:0;display:block;color:#333;font-weight:400}.preview_group.preview_card .card_inner .preview_group_info .preview_group_desc{padding-right:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3}.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_desc,.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_title{padding-right:68px;width:auto}.preview_group.preview_shop_card .shop_card_inner{padding:0;min-height:96px}.preview_group.preview_shop_card .preview_card_avatar{position:absolute;width:96px;height:96px!important;margin:0;left:0;top:0}.preview_group.preview_shop_card .preview_group_info{padding:10px 12px 0 111px}.preview_group.preview_shop_card .preview_shop_card_title{display:block;color:#333;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3;font-size:15px}.preview_group.preview_shop_card .preview_shop_card_desc{color:#888;position:absolute;bottom:6px;left:111px;right:12px}.preview_group.preview_shop_card .preview_shop_card_price{font-size:16px;color:#333}.preview_group.preview_shop_card .preview_shop_card_oldprice{text-decoration:line-through;color:#888;font-size:13px;margin-bottom:-0.5em}.preview_group.preview_shop_card .preview_shop_card_price,.preview_group.preview_shop_card .preview_shop_card_oldprice{display:block}.preview_group.preview_shop_card .preview_shop_card_btn_buy{float:right;line-height:1.75;font-size:16px;padding:0 .8em;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;margin-top:1px}.preview_group.obvious_app{width:100%}.preview_group.obvious_app .preview_group_inner{padding:0}.preview_group.obvious_app .pic_app{width:58.3%;height:100%;display:inline-block;margin-right:2%;vertical-align:top}.preview_group.obvious_app .pic_app img{width:100%;vertical-align:top;margin-top:0}.preview_group.obvious_app .info_app{display:inline-block;width:38%;color:#8a8a8a;font-size:12px;box-sizing:border-box;-webkit-box-sizing:border-box;position:absolute;left:62%;top:0;height:100%}.preview_group.obvious_app .info_app .name_app{color:#000;font-size:15px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;margin-top:3px}.preview_group.obvious_app .info_app .profile_app{line-height:10px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.obvious_app .info_app .profile_app span{padding:0 5px}.preview_group.obvious_app .info_app .profile_app span:first-child{padding-left:0}.preview_group.obvious_app .info_app .profile_app em{font-size:9px;line-height:16px;font-weight:400;font-style:normal;color:#dfdfdf}.preview_group.obvious_app .info_app .dm_app{line-height:20px;vertical-align:middle;position:absolute;left:0;bottom:5px}.preview_group.obvious_app .info_app .dm_app .ad_btn{display:block;color:#04be02;font-size:15px;padding-left:22px}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_download@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_install@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_installed@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;color:#8a8a8a;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_open@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app p{line-height:15px}.preview_group.obvious_app .info_app .dm_app .extra_info{font-size:9px}.preview_group.obvious_app .info_app .grade_app{height:11px;line-height:11px;font-size:12px;color:#888}.preview_group.obvious_app .info_app .grade_app .stars{display:inline-block;width:55px;height:11px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/star_sprite25624b.png) no-repeat 0 0;-webkit-background-size:55px 110px;background-size:55px 110px}.preview_group.obvious_app .info_app .grade_app .stars.star_half{backgroud-position:0}.preview_group.obvious_app .info_app .grade_app .stars.star_one{background-position:0 -11px}.preview_group.obvious_app .info_app .grade_app .stars.star_one_half{background-position:0 -22px}.preview_group.obvious_app .info_app .grade_app .stars.star_two{background-position:0 -33px}.preview_group.obvious_app .info_app .grade_app .stars.star_two_half{background-position:0 -44px}.preview_group.obvious_app .info_app .grade_app .stars.star_three{background-position:0 -55px}.preview_group.obvious_app .info_app .grade_app .stars.star_three_half{background-position:0 -66px}.preview_group.obvious_app .info_app .grade_app .stars.star_four{background-position:0 -77px}.preview_group.obvious_app .info_app .grade_app .stars.star_four_half{background-position:0 -88px}.preview_group.obvious_app .info_app .grade_app .stars.star_five{background-position:0 -99px}.preview_group.download_app_with_desc{border:0;color:#fff;font-weight:400}.preview_group.download_app_with_desc .preview_group_inner{position:relative;background-repeat:no-repeat;background-position:center;background-size:cover;height:100%;width:100%;box-sizing:border-box;padding:0;overflow:hidden}.preview_group.download_app_with_desc .preview_group_hd{position:relative;z-index:9;width:24%;text-align:center;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;display:box;box-orient:horizontal;box-pack:center;box-align:center;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;height:100%;float:right;margin-right:2.875%}.preview_group.download_app_with_desc .preview_group_hd .preview_card_avatar{width:45%;height:45%!important;margin:0;border-radius:18%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{display:block;font-weight:400;font-size:12px;padding-top:4%;padding-bottom:8%;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{display:block;margin:0 auto;font-size:14px;padding:6.5% 0;line-height:1;width:72%;text-align:center;border:1px solid #fff;border-radius:5px;color:#fff;-webkit-tap-highlight-color:transparent}.preview_group.download_app_with_desc .preview_group_hd_inner{-webkit-box-flex:1;-webkit-flex:1;flex:1}.preview_group.download_app_with_img .preview_card_avatar{box-shadow:0 -1px 2px rgba(0,0,0,0.2)}.preview_group.download_app_with_desc{overflow:hidden}.preview_group.download_app_with_desc .preview_group_bg{width:100%;height:100%;position:absolute;background-repeat:no-repeat;background-position:center;background-size:cover;z-index:0;-webkit-filter:blur(30px);-moz-filter:blur(30px);-o-filter:blur(30px);-ms-filter:blur(30px);filter:blur(30px)}.preview_group.download_app_with_desc .preview_group_bd{position:absolute;left:2.875%;right:26%;top:46%;transform:translateY(-50%);-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);text-align:center}.preview_group.download_app_with_desc .preview_group_ft{position:absolute;left:2.875%;right:26%;bottom:26%;transform:translateY(50%);-webkit-transform:translateY(50%);-moz-transform:translateY(50%);-ms-transform:translateY(50%);text-align:center}.preview_group.download_app_with_desc .preview_group_desc{display:block;font-size:17px;line-height:1.5;width:12em;margin:0 auto;overflow-x:hidden;white-space:nowrap}.preview_group.download_app_with_desc .preview_group_download_info{display:inline-block;font-size:9px}.preview_group.follow .preview_group_inner .preview_group_info .preview_group_desc{display:block}.preview_group.follow.with_tips .preview_group_desc{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.follow .weak_tips{color:#bbb}.btn_plain_primary{color:#04be02;border:1px solid #04be02}.btn_plain_primary:active{border-color:#039702}.mpda_card .btn{padding:0;font-size:15px}.mpda_card .btn_inline{width:4em;line-height:2}.mpda_card .cardticket_hd{background-color:#fff;border-top-left-radius:5px;-moz-border-radius-topleft:5px;-webkit-border-top-left-radius:5px;border-top-right-radius:5px;-moz-border-radius-topright:5px;-webkit-border-top-right-radius:5px;border:1px solid #ececec;border-bottom-width:0}.mpda_card .cardticket_hd .radius_avatar{width:45px;height:45px}.mpda_card .cardticket_hd .cell_hd{padding-left:12px}.mpda_card .cardticket_hd .cell_bd{font-size:17px;padding-left:.5em}.mpda_card .cardticket_hd .cell_ft{padding-right:10px}.mpda_card .cardticket_ft{position:relative;margin-top:10px;padding:.35em 12px;font-size:12px;background-color:#fff;border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;-webkit-border-bottom-left-radius:5px;border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;-webkit-border-bottom-right-radius:5px;border:1px solid #ececec;border-top-width:0}.mpda_card .cardticket_theme{position:absolute;top:-10px;left:8px;right:8px;height:10px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle290773.png) no-repeat 0 0;background-repeat:repeat-x;-webkit-background-size:10px auto;background-size:10px auto}.mpda_card .cardticket_theme:before{content:\" \";position:absolute;left:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_left290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}.mpda_card .cardticket_theme:after{content:\" \";position:absolute;right:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_right290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}@media(max-width:354px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:16px;line-height:1.4}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{padding-top:3%;padding-bottom:6%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{font-size:13px}}@media(min-width:400px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:18px}}.wx_flex_layout{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.wx_flex_ft{text-align:center}.mod_follow_with_img .wx_flex_ft{width:32%}.mod_follow_with_img .fwi_thumb{margin:0;display:block;width:100%}.mod_follow_with_img .radius_avatar{width:35px;height:35px;padding:0}.mod_follow_with_img .radius_avatar img{margin:0}.mod_follow_with_img .fwi_nickname{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;display:block;margin:.2em 1em .5em;font-weight:400;font-size:12px;color:#888}.mod_method117 .wx_flex_ft{width:30.435%}.mod_method117 .fwi_thumb{margin:0;display:block;width:100%}.mod_method117 .radius_avatar{width:35px;height:35px;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;padding:0}.mod_method117 .radius_avatar img{margin:0;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px}.mod_method117 .fwi_nickname{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;display:block;margin:.3em 1em .5em;font-weight:400;font-size:12px;color:#888}.wx_min_plain_btn{display:inline-block;vertical-align:middle;padding:0 .85em;line-height:1.6em;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px}.wx_min_plain_btn.primary{color:#1aad19;border:1px solid #1aad19}.wx_min_plain_btn.primary:active{color:rgba(26,173,25,0.6);border-color:rgba(26,173,25,0.6)}.wx_min_plain_btn.ba_btn{color:#576b95;border:1px solid #576b95}.wx_min_plain_btn.ba_btn:active{color:#576b95;border-color:#576b95}.btn_progress{position:relative;overflow:hidden}.btn_progress.primary:active{color:#1aad19;border-color:#1aad19}.btn_progress.ba_btn{color:#576b95;border:1px solid #576b95}.btn_progress.ba_btn .btn_progress_bd{width:57px;position:absolute;top:0;left:0;color:#fff;background-color:#576b95;text-align:center;display:block;height:100%;max-width:initial!important}.btn_progress_inner{position:absolute;left:0;top:0;bottom:0;overflow:hidden;-webkit-transition:width 1s;transition:width 1s}.with_processor .btn_progress_inner{right:0;height:100%}.with_processor .btn_progress_bd{height:100%}.btn_progress_bd{position:absolute;top:0;left:0;color:#fff;background-color:#1aad19;text-align:center}.icon26_weapp_white{display:inline-block;width:14px;height:14px;background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAY1BMVEVHcEz\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/80LMUcAAAAIHRSTlMAfBg4AeNjmS\/2\/PDnrcyG1Qt1az8ys4MhUcLc6UWcl7QkidAAAADFSURBVHhetdFJqsMwEEVRWZ0luYm79E5y97\/Kz6cQQXaATPJGDw4UpZL6OuN8a+O9vuzFOACIk91IiORUpdgB6Pz13EAyBT0A\/1+0g66gCnppHtaCXvCUyQvEgmqopR1g+Ei2SnBQkuNs3hR6oNXynBMknWl0QBNEGsCNmTRwEtEt0If3wGU6qrwNqbLFhjlD3mZPERZpT3gVtIKX1m8P3oHTcjh4FGQSNOer74Bh84MVOTGoMnaKIs6oXS71Pa63eVS\/zR\/btROXGlgZggAAAABJRU5ErkJggg==);background-size:cover;background-repeat:no-repeat;vertical-align:middle;margin-right:-2px}.da_area{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fcfcfc;border:1px solid #ebebeb;-webkit-user-select:none;user-select:none;font-size:17px}.da_area .da_inner{position:relative;width:100%;transition:opacity .6s;-webkit-transition:opacity .6s}.da_area .da_bd{padding:8.5px 10px;width:100%;position:relative;border-top:1px solid #ebebeb;box-sizing:border-box;white-space:nowrap;display:flex;justify-content:space-between;align-items:center}.icon26_weapp_blue{display:inline-block;width:12.5px;height:12.5px;background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ\/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF\/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy\/Td6GRD\/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ\/kOb7rnhO9AtOOdpnjHkyO6448\/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA\/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU\/hWz9SCYNwwojpZsX4zaqU5bItDp\/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9\/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A\/k2uEje\/oyrcTfoBtANQk\/d6iE\/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl\/cVVBnEptgppxGzumgpkDA3bQiW\/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH\/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe\/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r\/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO\/RwlGY+ISbg\/L85q8KwuGOueX8ke6AlIUHX1CJ+7l\/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==);background-size:cover;background-repeat:no-repeat;vertical-align:middle;margin-right:4px;position:relative;top:-0.5px}span.img_bg_cover{background-repeat:no-repeat;background-position:center center;background-size:cover}.ct_mpda_wrp{margin:38px 0 20px}.ct_mpda_area{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fcfcfc;border:1px solid #ebebeb;-webkit-user-select:none;user-select:none}.ct_mpda_placeholder{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:100%}.ct_mpda_tips{color:#d8d8d8;text-align:center;font-size:15px}.ct_mpda_inner{position:relative;width:100%;opacity:0;transition:opacity .6s;-webkit-transition:opacity .6s}.ct_mpda_area.show .ct_mpda_inner{opacity:1}.ct_mpda_main_img{width:100%;min-height:100px;display:block}.ct_mpda_hd .page_video{min-height:0}.ct_mpda_bd{width:100%;position:relative;border-top:1px solid #ebebeb;box-sizing:border-box;white-space:nowrap}.ct_mpda_logo{width:35px;height:35px;display:inline-block;margin:15px 10px;vertical-align:middle;border-radius:50%;overflow:hidden}.ct_mpda_desc_box{font-size:0;display:inline-block;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;margin-left:-60px;padding-left:55px;padding-right:80px;box-sizing:border-box;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.ct_mpda_btn_more{position:absolute;right:10px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);display:inline-block;color:#576b95;font-size:13px;border:1px solid #576b95;border-radius:3px;line-height:2.2;padding:0 .75em}.ct_mpda_btn_more:active{border-color:#354567;color:#354567;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_title{font-size:14px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ct_mpda_details{display:inline-block;vertical-align:top;font-size:12px;color:#878787;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_details:after{content:'';display:inline-block;width:4px;height:4px;border-width:0 1px 1px 0;border-style:solid;border-color:#878787;-webkit-transform:rotate(45deg) translateY(-3px);transform:rotate(45deg) translateY(-4px);margin-left:3px}.ct_mpda_btn_about{display:none;font-size:13px;line-height:2.8;padding:0 1em;background:#fff;color:#576b95;border:1px solid #dfdfdf;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);border-radius:3px;position:absolute;bottom:-28px;left:55px;z-index:9;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_btn_about:active{background-color:#ececec}.db{display:block}.qqmusic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.qqmusic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.qqmusic_area .pic_qqmusic_default{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;width:37px;height:37px;display:none}.qqmusic_area.unsupport .unsupport_tips{display:block}.qqmusic_area.unsupport .pic_qqmusic_default{display:inline-block}.qqmusic_area.unsupport .icon_qqmusic_switch{display:none}.qqmusic_wrp{border:1px solid #ebebeb;line-height:1.6}.qqmusic_bd{position:relative;background-color:#fcfcfc;overflow:hidden}.qqmusic_ft{text-align:right;background-color:#f5f5f5;border-top:1px solid #ebebeb;line-height:2.5;overflow:hidden;font-size:11px;padding:0 .5em}.play_area{float:left;width:60px;height:60px;margin-right:12px;position:relative}.qqmusic_thumb{display:block;width:60px;height:60px!important}.access_area{display:block;color:#888;min-height:60px;overflow:hidden;margin-right:10px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.qqmusic_songname,.qqmusic_singername{display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.qqmusic_songname{padding:7px 0 3px;margin-bottom:-4px;font-size:16px;color:#333}.qqmusic_singername{font-size:14px;margin-right:20px}.qqmusic_source{position:absolute;right:6px;bottom:6px}.qqmusic_source img{width:13px;height:13px;vertical-align:top;border:0}.qqmusic_love{position:relative;float:right;margin:10px 0 0 10px;height:54px;color:#607fa6;width:53px;text-align:center;font-size:13px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png) no-repeat 0 0}.qqmusic_love:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.qqmusic_love .icon_love{margin-top:16px}.qqmusic_love .love_num{display:block}.icon_qqmusic_switch{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;line-height:200px;overflow:hidden;cursor:pointer;width:37px;height:37px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAADeCAMAAACt+WYWAAABPlBMVEUAAAAAAAD\/\/\/8vLy\/09PT\/\/\/\/\/\/\/\/+\/v5xcXH\/\/\/9ZWVn5+fm7u7slJSXm5ub\/\/\/\/\/\/\/\/\/\/\/9tbW0WFhb\/\/\/+ioqL\/\/\/\/\/\/\/\/\/\/\/9lZWVGRkb\/\/\/\/\/\/\/\/\/\/\/\/39\/f\/\/\/\/X19efn5+cnJyUlJT\/\/\/\/p6en9\/f37+\/v\/\/\/\/\/\/\/+AgID\/\/\/\/\/\/\/\/\/\/\/\/c3Nz\/\/\/92dnbBwcH\/\/\/\/w8PD\/\/\/\/\/\/\/\/Ly8vFxcX\/\/\/\/\/\/\/\/\/\/\/9eXl7\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/6+vpCQkLt7e3f39\/\/\/\/+FhYW\/v7+0tLT\/\/\/\/\/\/\/\/\/\/\/\/R0dH\/\/\/\/Ozs62trZqamr\/\/\/\/\/\/\/9JSUn\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/g4OCqqqqnp6fw8PDw8PD\/\/\/\/Hx8fDw8O4uLj\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/9lS7ogAAAAaXRSTlNmAPty7u0F94oHgfS1b93hvROIayal8d2fhXpTSALy0s6ioZyT4fv4uqqSkGc505aNuurpzsjDvrSbjIJwbGNYGxT3eeXW1JS4seTYycfFxbGIh4F7d05APDMiDNaqqOroysC8s62CWy61f9DEAAAGCUlEQVR42qzY50IaQRSG4cMu7NKkiYACgopi771rNMbEmGI3vee9\/xuIGhOUsmyZ7x9\/HpZhduacIz6rJAvrleGn8YCmzWbnR0620j6LtKZC55US9Ymv5ENOqYuVAKANvnw9kAo\/0fWetemupfdVIFC5ckAZv0rAp2ejHVKXYHQPSFzapTazEFl6I83zZrEKid92qKsF8H\/olNbRZ0y0t6F2VKiiEemSNtEXITthTaXn0RZ1aZ\/pObRxKyqfwR8UW+l8BTmjJbUBk7rYTdcQy6EW1FuIioMEd0m8e0zVpI\/iKN0REkYTagMGxGHCEXKNVB4+iuMEhzipp9IZouIiA2gXj6nQPJPiKjM8Tz6iKvh1d1TnID8eUleaFhSXCZsUHlALLIrrRHlh\/Kc2iejuqU4\/6\/8oI0uXeMgAs6F76hd+8ZTPjN9TJT54o7rIFu+oCyKd3qjOXgp31ApLrb+vGpu2tU9zt1QowBtplV3gld7+iCATuqHO+SQtA0Ckr601R\/6GqvCsDQWxcBvqGZUbqsRoWwrtmfU\/M0rJJ0m0jvYU+A+sqA6NHSkwKHYomHwirTNIQdZ5aZOiarGTX7IuU7y2S8Fey6PoNVMyzIBtymKTDTAsT0k5oejtl2ZJ8VTihB1REGu2\/GHiEuCJQ4qyNOYJAdHQVVA6mgsqpregZulRsew9zEqWNRWbYY2szDOtYotOMy8jdNmlqodWx\/uInLCk4nVe4qds8V68HzLyni1JU7VBaTNtLqUqafHFCXo\/kIPEfeJbIer9mvhO7obKsyctE7F3eckeW+3uwY\/VwWkRu\/egr8KieMxXVny31BVV3ZvUscvEHeVLMOONinJ8XxRdYuoeH6pwT\/kS3lbrG198\/6jfGtPupTWNy1qF\/JY599VajJyvRoWyvHK\/5oHkA8o3obktkkc1zh+3S+MMBd1IPb2s1jdxOXa7nUv6HMdGPWUsEwk73lGDvEg2dqmhBJGgw2ca5Pl2s975XYKhAUfrNMfzdPOO3sjBjP39NdrLi+2WI4sTjUG7CxbVOE5aDFIunmNG7TzYWgxWDcvxTvIH+NuuWMc3jcB526FT4QV87uq0gqIRyCVtjMKM9VnonWm1Ybu\/7sKXS5sDutB4FphrNqD7vgccFxyMDYuFXKZxbLhfBTIrE46HmfnKU+oTz21ZDDOtslNYn6qNWH86HrHWYkxsri6XbqVAvLS8ujlhuKPSZ8MmdTGHz9JOqeTGEYC\/HO0PhntuVj0c7I+W\/QBHG0kH1PaYCUPlvlOpy2lfeQjMsW2b1M6UBrG+jhZbvS8G2tSODao4HoDJlGVdNgmB8WI76noBYt1ti6AYLFxbU\/lMrV2wTH8vmbwFVRyDfV1sRd+HsWIryhhBOxTbOdQYMZpT7xKYB+IgB2aLaa2RIJISR0k1n9YWR1xcqeEII8UGagwzJY6TMhmrp\/JoB+IiBxr5x9R1hkNxlUMy1w+p4gL74jL7LBQfUOP06m4pvZfxGrUToF9cp5\/Azn9qiph4SIypf9S2RrcXqhtt+54aY1I8ZZKxv1TSJOWNCmIm76gNYuIxMTbuqCOaN7R+APA3fGpMH0e3VJqhDstuvuFTYzqGSN9QZ5TFKyVlzm6oYfq8U30M+8QwOfVOnWIaMoFfvFPiZ0I2KaugymzKKlEVVJRVWaZfBdXPspQIqqCClCRO2CtVG7H2qKB6aiNWr5SOppBS+AMVLrvCzaBwiyp8cRS+zgoPGYVHn7oDWeE1ofDyUnelKrzoFZUfKcykuqJIYammroBUWNaqK7YVtgDqGhN17ZK6Jk5ha6mu4VXXhqsbDqgbWSgbpKgb7ygYOqX+tGvHJgDDQBRDG0\/jzbz\/AikVSMBghVS6AVTa8HmMTl9OYX6g+3029GOmn1iztdnabG22Nlubrc3WutLe1nLa1s6xHjfmka2ldG8d2dr1ehtbq1PYWpvC1uoUtlansLU6ha3VKWytTmFrdQpba1MMvz6FrdUpbK1OYWt1ClurU9hancLW6hS21qewtfpBxtb6bwJbuzlpa7lsbbY2W5utzdZma7O1e1t7AVSPynzIx\/HfAAAAAElFTkSuQmCC) no-repeat 0 0;-webkit-background-size:37px auto;background-size:37px auto}.qqmusic_playing .icon_qqmusic_switch{background-position:0 -74px}.qqmusic_playing_pause .icon_qqmusic_switch{background-position:0 -37px}.icon_love{width:12px;height:12px;vertical-align:middle;display:inline-block;margin-top:-0.2em;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png) no-repeat 0 0;-webkit-background-size:12px auto;background-size:12px auto}.loved .icon_love{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png);background-position:0 -17px}.topic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.topic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.topic_area.unsupport .unsupport_tips{display:block}.topic_wrp{border:1px solid #ebebeb;line-height:1.6;background-color:#fcfcfc;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden;padding:8px 10px;display:block}.topic_thumb{float:left;width:75px;height:100px;margin-right:20px;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}.topic_content{position:relative;display:block;overflow:hidden;height:100px}.topic_title{font-weight:400;font-size:16px;color:#333}.topic_desc{color:#888;font-size:14px}.topic_title,.topic_desc{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.topic_info{position:absolute;bottom:0;left:0;right:0;color:#888}.topic_info_primary{float:left;margin-right:.5em;font-size:14px}.topic_info_extra{float:right;margin-left:.5em;font-size:14px}.icon_topic{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/topic\/icon_topic.2x2e4987.png) no-repeat 0 0;width:10px;height:11px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto;margin:-2px 5px 0 0}.iframe_full_video{position:fixed!important;left:0;right:0;top:0;bottom:0;z-index:1000;background-color:#000;margin-top:0!important}.video_iframe{display:block}.video_iframe+.img_loading{display:block}.video_ad_iframe{border:0;position:absolute;left:0;top:0;z-index:100;width:100%;height:100%;background-color:#fff}@media screen and (min-width:1024px){.rich_media_meta{max-width:none}a.rich_media_meta_nickname{display:inline-block!important}span.rich_media_meta_nickname{display:none!important}.rich_media_content{min-height:350px}.rich_media_title{padding-bottom:10px;margin-bottom:14px;border-bottom:1px solid #e7e7eb}.discuss_container.access{width:740px;margin-left:auto;margin-right:auto;background-color:#fff}.discuss_container.editing .frm_textarea_box{margin:0}.frm_textarea_box{position:relative}.frm_textarea_box:before{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.frm_textarea_box:after{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5);left:auto;right:-2px}.rich_media_meta.nickname{max-width:none}.rich_tips.with_line .tips{background-color:#fff}}.article_modify_area{margin-top:30px;text-align:center}.article_modify_area .weui-loadmore{width:80%;margin-top:45px;margin-bottom:-12px}.article_modify_area .weui-loadmore_line .weui-loadmore__tips{background-color:#fafafa;top:-0.8em}.text_unselecet{-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;user-select:none}.pay_reading_area{padding:60px 8px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.pay_tit_tips_wrp{position:relative}.pay_tit_tips_wrp:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e0e0e0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.pay_tit_tips{position:relative;top:-0.75em;padding:0 .5em;background-color:#fff;color:#888}.pay_tit_sub_tips{word-wrap:break-word;word-break:break-all;margin:-12px 0 10px}.btn_pay_reading{width:180px;height:35px;line-height:35px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;color:#0aba07;border:1px solid #0aba07;margin:5px 0 14px 0;display:inline-block}.btn_pay_reading.disabled{border-color:#d5d6d7;color:#c4c2c5;background-color:#fbfbfd}.pay_tips{font-size:14px}.pop_tips .inner{width:280px;box-sizing:border-box;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:14px;background-color:#f7f7f9;position:fixed;left:50%;top:28%;margin-left:-140px;z-index:20}.pop_tips .inner .tips_title{font-size:16px;display:block;vertical-align:middle;max-width:98%;padding:15px 10px 0;color:#3e3e3e;text-align:center}.pop_tips .inner .tips_con{color:#888;font-size:14px;padding:10px 15px}.pop_tips .inner .tips_opr{line-height:50px;font-size:18px}.pop_tips .inner .tips_opr .ft_btn{position:relative;width:280px;display:block;text-align:center;color:#0aba07}.pop_tips .inner .tips_opr .ft_btn:before{content:\" \";position:absolute;top:0;right:0;height:1px;border-top:1px solid #ececec;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);left:0}.pop_tips .mask{width:100%;height:100%;position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.4);z-index:1}.wx_poptips_wrp.pay_reading{top:50%;margin-top:-60px}.wx_poptips_wrp.pay_reading .toast_content{margin-top:75px}.weui_loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:weuiLoading 1s steps(12,end) infinite;animation:weuiLoading 1s steps(12,end) infinite;background:transparent url(data:image\/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;-webkit-background-size:100%;background-size:100%}@-webkit-keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}@keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}.load_img_wrp{display:inline-block;font-size:0;position:relative;font-weight:400;font-style:normal;text-indent:0;text-shadow:none 1px 1px rgba(0,0,0,0.5)}.load_img_wrp img{vertical-align:top}.base_loading_opr{position:absolute;top:50%;left:50%;margin-top:-15px;margin-left:-15px}.weui_loading.base_img_loading{width:30px;height:30px}.base_reload_opr{display:block;position:absolute;top:50%;left:50%;text-align:center;margin-top:-32px;margin-left:-28px}.base_reload_opr .base_img_reload{display:inline-block;width:40px;height:40px;background-image:url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD\/\/\/9paWkyMjL\/\/\/\/\/\/\/\/\/\/\/\/29vb\/\/\/\/09PTn5+fh4eGvr6\/\/\/\/\/6+vqZmZm8vLz39\/fj4+P8\/PyBgYH\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Gxsb\/\/\/\/\/\/\/\/\/\/\/\/v7+\/MzMzr6+v\/\/\/+4uLj\/\/\/\/o6OhNTU3Y2NjQ0ND9\/f35+fn\/\/\/\/\/\/\/\/\/\/\/\/t7e3\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/z8\/Pb29v\/\/\/\/y8vLw8PDU1NT\/\/\/\/\/\/\/\/ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp\/K+L4DBxUDZQkjInpB+7\/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ\/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe\/pxsLCvfdR7HNvHU30WldQebill\/Pph9ben3t\/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe\/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ\/uRL+QiTBKbIMaLCxPq6n6lKz\/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb\/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP\/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b\/c+uss1iFWsaH5fYZtU0g6XrxUzj\/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2\/b\/thee7vy2O2FTa\/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0\/XH5B1c4zX\/WEj5\/f1R6LdH9xef7x8\/SF410f1139Q+P+fPa74ONPBJ6Q\/+TfzjGYmPq8AAAAASUVORK5CYII=');background-size:cover;background-repeat:no-repeat}.base_reload_opr .desc{font-size:14px;color:#888;margin-top:10px}.bg_gray_wrp{position:absolute;top:0;left:0;right:0;bottom:0;background-color:#eeedeb}.gif_img_wrp{display:inline-block;font-size:0;position:relative;font-weight:400;font-style:normal;text-indent:0;text-shadow:none 1px 1px rgba(0,0,0,0.5)}.gif_img_wrp img{vertical-align:top}.gif_img_tips{background:rgba(0,0,0,0.6)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#99000000',endcolorstr = '#99000000');border-top-left-radius:1.2em 50%;-moz-border-radius-topleft:1.2em 50%;-webkit-border-top-left-radius:1.2em 50%;border-top-right-radius:1.2em 50%;-moz-border-radius-topright:1.2em 50%;-webkit-border-top-right-radius:1.2em 50%;border-bottom-left-radius:1.2em 50%;-moz-border-radius-bottomleft:1.2em 50%;-webkit-border-bottom-left-radius:1.2em 50%;border-bottom-right-radius:1.2em 50%;-moz-border-radius-bottomright:1.2em 50%;-webkit-border-bottom-right-radius:1.2em 50%;line-height:2.3;font-size:11px;color:#fff;text-align:center;position:absolute;bottom:10px;left:10px;min-width:65px}.gif_img_tips.loading{min-width:75px}.gif_img_tips i{vertical-align:middle;margin:-0.2em .73em 0 -2px}.gif_img_play_arrow{display:inline-block;width:0;height:0;border-width:8px;border-style:dashed;border-color:transparent;border-right-width:0;border-left-color:#fff;border-left-style:solid;border-width:5px 0 5px 8px}.gif_img_loading{width:14px;height:14px}i.gif_img_loading{margin-left:-4px}.gif_bg_tips_wrp{position:relative;height:0;line-height:0;margin:0;padding:0}.gif_bg_tips_wrp .gif_img_tips_group{position:absolute;top:0;left:0;z-index:9999}.gif_bg_tips_wrp .gif_img_tips_group .gif_img_tips{top:0;left:0;bottom:auto}.flex_context{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.weapp_card{border:1px solid #e1e1e1;background-color:#fdfdfd;color:#333;line-height:1.6;font-size:16px;font-weight:400;font-style:normal;text-indent:0;text-align:left;text-decoration:none}.weapp_card.flex_context{padding:12px 15px}.weapp_card.flex_context .weapp_card_hd{padding-right:1em}.weapp_card.flex_context .weapp_card_avatar{width:50px;height:50px}.weapp_card.flex_context .weapp_card_nickname{font-size:17px;font-weight:400;display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.weapp_card.app_context{padding-top:10px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden}.weapp_card.app_context .weapp_card_bd{padding:0 15px 15px}.weapp_card.app_context .weapp_card_profile{font-size:12px;color:#888}.weapp_card.app_context .weapp_card_avatar{width:20px;height:20px;margin:-0.2em 5px 0 0}.weapp_card.app_context .weapp_card_nickname{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-weight:400}.weapp_card.app_context .weapp_card_title{padding:.3em 0 .75em;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-weight:400}.weapp_card.app_context .weapp_card_thumb_wrp{position:relative;display:block;padding-bottom:80%;overflow:hidden;background-repeat:no-repeat;background-position:center center;-webkit-background-size:cover;background-size:cover}.weapp_card.app_context .weapp_card_thumb{position:absolute;top:0;left:0;width:100%;height:100%!important}.weapp_card.app_context .weapp_card_ft{padding:0 15px;border-top:1px solid #e1e1e1;line-height:1.56em}.weapp_card.app_context,.weapp_card .weapp_card_bd,.weapp_card .weapp_card_ft,.weapp_card .weapp_card_nickname,.weapp_card .weapp_card_info,.weapp_card .weapp_card_title{display:block}.weapp_card_avatar{padding:0}.weapp_card_logo{color:#888;font-size:13px}.icon_weapp_logo_mini{width:14px;height:14px;vertical-align:middle;margin-right:.2em;margin-top:-0.2em}.img_loadederror{background-color:#eeedeb;border:1px solid #eeedeb;background-image:url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD\/\/\/9paWkyMjL\/\/\/\/\/\/\/\/\/\/\/\/29vb\/\/\/\/09PTn5+fh4eGvr6\/\/\/\/\/6+vqZmZm8vLz39\/fj4+P8\/PyBgYH\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Gxsb\/\/\/\/\/\/\/\/\/\/\/\/v7+\/MzMzr6+v\/\/\/+4uLj\/\/\/\/o6OhNTU3Y2NjQ0ND9\/f35+fn\/\/\/\/\/\/\/\/\/\/\/\/t7e3\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/z8\/Pb29v\/\/\/\/y8vLw8PDU1NT\/\/\/\/\/\/\/\/ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp\/K+L4DBxUDZQkjInpB+7\/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ\/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe\/pxsLCvfdR7HNvHU30WldQebill\/Pph9ben3t\/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe\/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ\/uRL+QiTBKbIMaLCxPq6n6lKz\/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb\/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP\/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b\/c+uss1iFWsaH5fYZtU0g6XrxUzj\/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2\/b\/thee7vy2O2FTa\/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0\/XH5B1c4zX\/WEj5\/f1R6LdH9xef7x8\/SF410f1139Q+P+fPa74ONPBJ6Q\/+TfzjGYmPq8AAAAASUVORK5CYII=');background-size:40px;background-position:center center;background-repeat:no-repeat}.img_loading{background-color:#eeedeb;border:1px solid #eeedeb;background-size:22px;background-position:center center;background-repeat:no-repeat;background-image:url('data:image\/gif;base64,R0lGODlhPAA8APYAAJeXl56enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19nZ2dra2tvb29zc3N3d3eDg4OHh4ePj4wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkEAEIAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAPAA8AAAH\/oBCgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKJgwMJ5ycBQAABaKbBKUEqI9BQUCIA6UDhyELDRytg7BAQYezALWGCgEBDLuCvUCxhcHDhA4CAgELyULLzYTPhSAF0wMS10LMzL\/btIUNAdPW49nngtyDFQPTBBjjyuXaQqoArAYlmCYggr5B\/OIZKGVgUAR7Ak5x+tGjh49Dy+JdMGDgwiAG7Aoe8iBBwgdJPXio7PHDUK94hx5MU2CIQ4QEBw5MQKmyZw9DzBghOGDIggIESA+I49lT5cVLFhYgndpABCUfTVdagpBg6oEFFDClbPpzkoOpCBJMIKHJx1ge\/mUlPRiK4IEGVG6fUpowocPBv4ADCz7EIweOw4gR88BUIoOFx5AfY0jBKIeNy5gz58B0wcGDz6A\/O8hQObNpGzg4ew4N2sHdRTwSy8axAxMJDJEjX2gxuLfv35xu0KBhyYOHEqhsyIDBXAYlDRUoVNAwQpMOGsyzO58EvYJ3Cx1WXKIRIzvzGZY2WPDuHcPJSTmWm49RAxMIDOy9Z6Acacb8+oW0wNsiIljVzQX5+RUJdufdYAgLKaTwgiIjcMBBCIaUwMF6FCgICQ4z0JCaIS9EmIILg7xwwgkTCiKChRwgZ8gJHXAQCicrmNiiECgUiMIgGlroAWAlRsgCISYUe2gCISDAuKQ+MqgQoQoxIKkkISjUyEEHKujTgokoWinCk4NUaKGBycAgZQoq2FBIkmMW8oIHFnZAZitfRhimmHcKQgKMaOJp5CFw9ilICBtsECgqNLjQgpuGFHrICyKMcKRvkgKXyAkF3qjpITRESNynpJZq6qmopopKIAAh+QQJBABFACwAAAAAPAA8AIaVlZWbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBFgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKKA4OKZycBwAAB6KbBaUFqI9EQ0NEhwSlBIchCw4drYNDQkJDs7WHCgEBDbyCvr\/BhbQAtoUPAtQMyUXLv7KEz9GDIgXUBBPX2L\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\/nDjSmAUQ61dFi\/axt1rwOiiHFWxXoVhA9OHCF\/Dgn3w4ITUx5AjY6rLwtKFCx9MuUhhonMKShIYLGAggWQmGitOdPYMeunSBhZMXGKBYnVnFZYmNHDN4AEGSjJq20bRApOGB7wZRBghaYXtE8ULlSjBSEO+QhkcuF5QQRKLzidUsC00AgQI2Yk4TJiQwdAHCrsXWJAUQ8UKGYdQmAdBXdAKESLgJsgG602QmSEiWECBCKCIYF4IKAwCAgYY7CSIBxSsN184+pnH3CAeZJCBB4RgUCCJ0qwQwoOfgSgiioKEkOEEFXw4DAn7oefiiIWot951vKSwIggixFBIiDwSTZJCBetRcOAsOJqn444wDtJBgUCqUsIHINhICJJVDpKBBBJsMEwLJZAw3pEvHpKCBhtMCRWYkiUiAoUM1nmICwDmpeefgAYq6KCEXhIIACH5BAkEAEYALAAAAAA8ADwAhpeXl5iYmJmZmZubm5ycnJ6enp+fn6CgoKGhoaOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3eDg4OHh4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEaCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4tCQpygQUBAQaCboqSmjz87O0CHqKWHREVFqoM7OTk7sKOyhUTBRLeCubo8hrGGwsHERj26OTqvhMrAzM5GxjnI1b6FRdjZPjrRPd6pg+HCttlGPNG8g9aCzMPuguW654L09qA7bNiQVwiaLoJDggQZMohZu0IZFCTQIOnGjIs2dBgy1g3RunuELCQQAADAAkk2Ll6kgcOQDo2LmhV6MCCATQAKJPGooXJly0sPCNgcWoADpRs0es6wYQmBgKEACDC41ANpzxqUDAwNIGABCE05eF7EOulAAAABDkwwpePGDUv+DBhYwEe3rt27h3TEgPGir18YMX5aCiHBQYPDiB1AMMEoBovHkCPDwPSggOXLmCM0jsyZxeRLDjCLLrB2UQ4YfP32Bfz2kgcIhhEfduAgBd7buHNzcszCkgULH0y9SFGiuO1JEhYoWBDBaKYaK0wUN04pwoLrCxhUOHGJxYnpxVVYmsAA+wIHFyjRQAG+xAkXmDI4ML8AAglJK8CbaGGoOCMNFEHUAHYKVIAfCSWYoEIMhozwwQfcJbKBBBJgYMgHFJSnwFyRyKDCCjIcgsKDH5QwyAohhLDCIBpQKEFwhohQAQUigBICiSgM8sEFF8BohAcTUGggXSM+OAIhHmCDgIEHhGDgIpPusADCgyCIN0gHSnZASAhBSkCBidmUQCJjhGCJgZaETEhhgMSkMOUHIYRYZpaFrFABhRP4qIqYD0Y455mGcOAim3t68MGRhpiJZiEYRBABocKZQIKchSh6iAoZbOAnXkkuqZsiIfAYwqeJvCCCCJ+RquqqrLbq6qugBAIAIfkECQQASQAsAAAAADwAPACGlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39\/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ASYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbikVDQ0WcnEFAQEGim6SmqI9APDtCh6qnhkhHR0isgzw5OTuypbSFR0ZGR7qCvL08hrOGxMXHyD69OTqxhM6ESMXRyMnVzNnBw93S3z861T7jq4Pc3bnfgj3Vv4PagtDG84TqvT0GCSmFLck+I6J42LghrlC9ZYOICBFCZNC+c4Q4MFjAQdKNGSBt6DC0A6AiaBgFZVggAACABh5BgqSBg+Q9RcUMRSAQoCcABpJ61JA5s+alCAUA9Ox5AASlGzSIzrBhSYGApQAKPLjk4yPRGpQQLA0woMEITTqGggQ7KUEApf4JLKDaceOGJQcOMvTby7evX0Y7ZMSIAWNw4RgzRl4iMeEB3scOHkhIwUiGi8uYM8vAFMGA58+gJ1TOTNpFDEwQQKs2UAGwYMKGB8swaimEBMeQI0Ng8be379+6ZLRoYSkDBhGoYKgwwVwFJQoNGDSg8EGTDRYnmDenNKGB9wYOLji35AKFduYrLFVw8J0BBL2TaqQ4bwLFC0wcIHz3LuGEJBbnneCCISf4twgHHRWywQPtXSBJCyWYcAILmxViQgghUJaIBxRQoIEhIVjgAAMMYCDJDCywMMMhK2AYAgqDuDDCCAMKwsEEHYZwCAkYWFCCKCNgKEJ6goiQQQbICZECQgUdOshXixiaQAgIGmjg1CAadEiBjv28IIKQxA3yQZXVDTICkxRYYOA3J7iooZhkFtKBlgkiw8KXIYxAQyFjalDmIC1c0GEFSerSJoZvwumnIR\/Q+Q0KIIAgJaNxGqLBBBN08E0MKJywJ6WLGtICBx0k+heVVgK3CAlHkqCqIjKQQEKFr9Zq66245qprP4EAACH5BAkEAEEALAAAAAA8ADwAhpiYmKCgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2Nra2tvb29zc3N3d3d7e3t\/f3+Li4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o7OTk7nJw3NjY3opukNjiojzYzMqyGqqeGPzw8Pq2DMi8vMoe0hzw7Ozy7gr2+M7OltYQ9xcbIQTS+LzCyg8KEP9I7PdRByi\/MhNyDxMXH4jUw1zTnztDfuuLV1zHypoTq4PeD3vmKJwhHKW3R1oma0aKFuULWfAETpAMHDh3ppIU7BATIJBcpQraYSCjGMkXq2BXqyFJSi5AhVbwwFEPfIlyGWOqURGMFzJgzL+ncScmFip8pWFga2tJSjZc\/lU5i6lETDBYwpUpiikqGCxdLqwIcS7asWUMyTphYy3btCRj+mDIgIDCgrl0CBjwwQiGir9+\/JzAVAEC4sOEDjFL8XSwi8CUChiMDSMCIhtq2bYNasmCArt26BAiEOEu6tGlOfEdYcuDgAioTHzbI\/kApgYAAAhJQ0ORCBAfZskFQQiCguIABDYRbGtEBeHBLCgYYD1DgASUWHpxv6FACU4QCxosf4CAphHMOJAxtIL8IAgRDEAhMZyBJhIb1IVIY0lChgt5EEiCAgHWFWLDAAAEE0IAkKoQgggqHgNBfBewFMQIGGKgmSAQHCGjBIRo0sIAGolwwIW2CWNBAAx8KUkECAi5A1gcTkjgIBaztNogDAiJQAUAkWNCfBSIQgqMDOgprkgGMCChQITIcTNhBIUcmKYgEHSLwHjUgCFnBBRAamWMhIywgYAIt7hJlf\/+JiaQhE\/S4pZoUUGAjlWMa8sABB0RAzQnNhYnnm4aMAEEEKJJW5WmKYLAiBowmgkIGGegX6aWYZqrpppyiEggAIfkECQQARAAsAAAAADwAPACGlpaWm5ubnJycnZ2dnp6eoKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW2NjY2dnZ2tra29vb3Nzc3d3d39\/f4ODgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ARIKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbij07Oz2cnDk3Nzmim6SmqI85NDM6h6qnhkE9PkCsgzMwMDKypbSFPTw8PrqCvL01hrOGPsXGyEQ2Mb0xO4XOhLbRP9NEyjA02sGF0MXH4DjWvTeE24I\/0Ty54EQ1vb7w5oPExd\/uCWoHg5mgeOh4hOJUw4ULg4Xy9SIniEeOHDwGJQxYSIiQIUMkvUCRQoWLGYZkTFSEbiGhIR5jSnKRomZJGCl\/LerhclDMn5JqrLBZc0UMTDB\/eqz0YijRFpaUegxp6YYLFU8pSRWyKQYLmyy0\/qTKacaLF5ZAchXItq3bt\/6GaKRAcaKu3RModFraoMBAgb+ADSQIwUjFiMOIE6PAdACA48eQFRROTHnE4kuNIWtewMgGCrp37R69lCGBX8B\/DRwoAbe169ecVJAgYcmBgwyoUITgwJvwpAQCAghIUEETjBEdePemBFyA8wENRFwi4UH58koKBjgPXgACJRcfrHPwYAKThALbnR\/4IGmEdfKGOnRgFCGCoQgEtgdgIInEBg4diLCCIRtYYAF7iVCQQALeFYLBAgMEEEADkrAgAglhGRKCgRZ4MIgJGmhQniASILAgBodw0AADHIiCgYEX+EZEBg88gJsgFyiwIH9sbWjgBoRcAAEEFxDywIIJFH55jwkvWnABbYNYMKQFhGigYwILeAhOBxwiGOWUhUyApATgiHCBgRhARYiUEFBJSAkMLKgAishwaaCXX7ZpSAVI2oeMBxVU0KIhbLpZCAQIIEAmMil40IGahRR6SAkRTADCa0ISCZsiG9QI5KaIrLDBBhmCauqpqKaq6qqiBAIAIfkECQQARQAsAAAAADwAPACGmZmZmpqam5ubnJycnp6eoKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39\/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ARYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbizk5nKA4NTU4oJs3ozemjzgyMZ+GqDWqhkA8PD+rgzEuLjGHsrSFOzo6PLqCvL0zsamGPcXGyEU0L70vOoXBhUHExT3TRTK9LjLazoQ80cfhNta9NYTbgz7ROrnh1OS\/g\/OC3jrA5RP0zgWNQaJIDYJWbAcoGi0MHqJBzpwgHjhwsCui7tshIkOGEJHkIoXJFhYJKWOWqKPDQiCFyBxC0qRJFS8MwYDBaMdLQkNkCqUZqcYKmzd5XgoqVOjISS5UIE3RwhLTpkQr2YiKlAWlqzOfYorBwqbXSVdDmprRy6rIgf5w48qdOxGFiRJ485YwkZLuIBQhAgsefMJvoRQgBis2YZhQDRN39eZV2riy5cuYi6QQMcJSAwYXTJ34oCGDhg+UDgQAEODABE0vRGzQQPt06gC4AwhYEOLSCA61aYOwhEBAbgAEGlBq4SG4Bg4lMEEgkBt3gQ6SQgTnQMLQhg2MIEAw9GDA8QWSRJjeACKFIQ0UKHhQJOHAAQeGLCgQAAAAA0krhCDCCoeAEN8EHAxCAgYYdCdIBAbYZ8EhGiyggAagXBBfBagJYgEDDEwoSAUI2KdAXAbGlwEhFDTQAAWEOGDfARUMRIIFG4pAyAQuvjZIBiUekAB24WwQHwVEDmLCYwM+DiJBhAeMNw0IFcR3AYE79lgICQrYh0BoyBgZ33yFLNmkkjNKqQsHE0yAoSFmHuKAAQZEMA0KHGyAZZlaGkICBBIMZ1iLL2ZmCAYgYmDoYRlkoMKikEYq6aSUVjpIIAAh+QQJBABGACwAAAAAPAA8AIaYmJiZmZmampqbm5udnZ2enp6fn5+goKChoaGioqKkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3g4ODh4eEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBGgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKPzg3PpycNjMzNqKbNaWnqI43MTA4h6ozNYdAOzs\/rYMwLCwvs6W2hjs5OTu8gr6\/MYa0xIQ8x8jKRjMtvy45hdCFQDrUPdZGzCzOhN6ExsfJ5DXZLC006cOEPtQ6oeRGMr\/AhEiZWkeNB79BLv7JGCSQlZFpx3SIkqFixUJD\/poN2mHDhjsj7HKMMxSk5BBJK0iUMKECHaEXvy4igvhx0JAgQHIGQVmi58oWhlwEW6RDYiGcOXVKooHCZ88TQC8JSZp0JyUWJ5yWUGEJKVUhl2qsMOE0BSWvOcFqepHCp9lJ\/l6DqOUU45clIXIP6t3Lt++hGWRJCB5c4oRLS0QSK17cyMSHx5Ajl8C0uHLiIoxORN78YfIly5YZ1SgxuPTKoZaKgFbst7Xr16JQhAhhiQGDC6hMdMBwAUMHSggCAAiAYIImFyAyYFjum9KBANADCFgA4pKIDcyXe7CUQEB0AAQaXOWQHcOGEZggEBge3cDvSCB6L9eAvpAGDYwcODD0YMD3BZLEh0EGH6BgCAYSSMCBIhEUYAADhliggAAAAABhJCp8AAJXhniQYAQbDDKCBRbUZ8QDDhpQwSEaLKBAiJxUkOAE2wlCgQIKUDAIBQcYYEACe3mYIG6DSLDAAhIQg8KAjwboyM8IFMxI2yARHBkBIRj0aAACC5KjQYISwEillYVAkOJ+1nwwQYIVrFBIlQtcScgICfh4wIrKfJlgl4TAKSchEjCJJi8aRBABBof4eUgDBRTwgDUnbJCBm4YoasgIDkDwwWtGIgmbIhfgSOSnh6RwwQUckqrqqqy26uqrogQCACH5BAkEAEoALAAAAAA8ADwAhpSUlJWVlZaWlpeXl5iYmJmZmZubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t\/f3wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEqCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4pCOTlCnJw4NDQ4ops3pTeojzkzMjyHqjSshkM8PUGtgzIuLjGzq4c8Ojo9vIK+vzSGtLaEPcbHyUo1L78wsoTPhUM7xjs\/1UrLLs3cw9HTyOQ42C4vNum1hD\/TO0DkgjW\/wPTQlBQz5mPfIBj+agwiZWqQD3yiarBgga5Qv18zBvXAgaOdEmkEDxUZMqSIpBYlTJxgkbHQsoqHQG4jVERIkJtDJLEwwVPlC0Mxgi3iMXMQkZtIc0aykaInTxQwMBGxiTSIECOUXKBwamKFJapVlVbCweKEU6+TwOLEmimGip7+KiiBFUIE1YwWLSyRNGmwr9+\/gA3ZQGGW64kUMCklQcK4seNGKUJInkwZBSYkRzJr3oyEkQoQlEOfuLy59JHOi3CcKOz0sAxMi087bhy4tu3bolaMIGHJgQMMqFB80JBBAwhKCAIAEICggqYYIjZomG4ceYDrAQY0EHGJRAfqGjaEsKRAAHYABR5QeuEBvIYOJjBFKID9uoEPkkSA5xC\/EAcOjEAAgSEQEHAeA5KMUJx4aBGiAQUTeKCIBAYcoF4hGCwwAAAAOHBSCCLkZUgIFEDYwSAnZJBBf0pEUOEBFxzCQQMLAMjJBSVWcJwgFzTQQIyCWIDAAQcs4BeJJWqIQEgFvjk3iANEHmCBQSZYkCNvg1DgGwUODnmAAhKSw0GJFISZ5ZaFUEjkgNWEUEGJF4h4pgNcEmKCAkQmACQvY5aIXyFa0mnIBFGyyUsHE0ywwSGB1lnIAwYYEEE1KXTAgZyENHqICRBIMJ5tTDrgJG6IZOBjBqQmwsJ0mKbq6quwxirrrJsEAgAh+QQJBABEACwAAAAAPAA8AIaYmJiZmZmampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzOzs7Pz8\/Q0NDR0dHS0tLT09PV1dXW1tbX19fY2NjZ2dna2trb29vc3Nze3t7i4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBEgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKPDQ0PJycMy8vMqKbMqWnqI40LS02h6qmhzw3Nzqtgy0nKCyzq4c2nze7gi0oyi+GtKyEOJ80xscwKcoqsoTOhTw10jnHyMooLoXchDfS1OIz1ygpz0TogjnSNbrigjDkwIP0RIh9wqGPkAplKWAMIvVixqBon2qIguFLoSF+ylo8nDGDoCB1n8IZ8sGDxw9JKECEEHHCXCEWylwigqiNEEkdOENFOhGi50oVhlasYGSj5qAeOJPqhCSDhM+eI4Ze6rEjKc4dJyelGPFUhAlLVa3uWEppBgoRT79OCqsUiKYW\/iVCqCxBie0OH6hcpEhhqSTegoADCx68KAbXpz5JMLskJIjjx5CFMBqhYYPly5Y1iMAUBIjnz6CDMCJRGfNlzZxBqwYietEMtIihamQMuXYQyYRz697dqkQHD5aGCEc1IgOFCRQ0UBLOfIgmFh0qUJiefHnz4Zc8XEA+vcKG4NexS1KBgfr0CyEwhRcPiQN3ChZAGLJggdGCBYbWS+owYUIFDmoRUoEDDmSgSAMABIDAIdehxEEHKByyAYENXDBICP1tJsgCCQYQASLsaRIBgQ98J0gEBhjwoSAQCBBAAAUINiGBFBDyQIoPEHLAix4CFgIEJH5AiAMHHOCAgAO8bkiAgfpYQKADGBRCpJGFMNAhfuJw8ACBEfA1ZJFHEiJCAS8OIIE4ThLI5JdUSvkiAFjuckEDDVRwyJRhFpIAAHCKQ8IFFngpJZiHhKAAAxzwdqMBOfKmCAUp1uhoIihUUIGgk2aq6aacduqpPoEAACH5BAkEAEgALAAAAAA8ADwAhpaWlpeXl5iYmJmZmZqampubm52dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tzc3N3d3d\/f3+Dg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEiCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o\/NDQ\/nJwyLS0yopsxpTGojzUtLDeHMKUwhz43OD2tgywmJiuztYc2nzi8giwnyy6GtC22hTmfNLLIMCjLKceEz9GDPzWfNTrIycsnLYXehTjU1uYz2Scop4PsgzvUNTzmgy\/ogg1S1YLVoGKfcvgjlALdi0GkTA3SsU8UDBMnvhECuEydoBwyZCgU5C7hoSA+egSRhOIDiBAmmhVawUxRSRuGgPTYwdOHpBMggoIQkcKQChWMbOAs9IMHz56SZIwQGlQE0ktNn\/LkIYQSChFUQZSwtFMrD5+WaJwIQXXspLL+T30M0cSihFC3kuD2CCXqBQoUlnz4ALKwsOHDiBnJEME2bIgRGikVGSKksuXKQ4owGqGhs+fPIjANCUK6tOm5i0hk+Mw6BCYhpmMHQa1oRmPHIjxaInK5txDNiYMLH97KhAcPlo4YMYKKM4UJFDRQWk79iCYXHSpQ2E5hw3Tq1DF9uMB9u\/dK4KtTWpGhPIULri8pT89cUgfo2y2AMFTBAqMFCxhCX32QeABdBRyYYAgFDTSQgSINABBAAobMF14kKXDQQVGGbNAgAxcMEgIEEOwnCAMSBiDBIcsdYR0nEDTowHlIRGCAAREMEoEAAQRQwGEeNjgBIQ8ccMADhCCC0GMAOS4UwgMyIjeIA0Y6QEgFA\/RIgHT+WNBgAxgUQuUBVhISYY8BmsOBAw1CwOGUVRYiQgE9DjAkMhV8+aCYcYrZIwBp8nIBAwxQcMiYZRaSAAAAMGAOCRdY8CYhiB4iggIMdEBckUcStwgEN0LgqSIoVFDBpKOmquqqrLbqqjmBAAAh+QQJBABJACwAAAAAPAA8AIaTk5OUlJSVlZWWlpaXl5eYmJiampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\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\/v7\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\/z38+Pc9hFyioMD7egQQLIl\/r2NHD0ojMMBedwu0dokPO\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\/RdvQkULSqVjz\/9kgsU9pmQAg2S7HdeITrowAgMMBjiwgn2rVCgfEIYogMOOOygSAzVjUdIDCtAWEJakQgRXX+F8IAhDgoKooMNNrRYBAzVsbCaITOwsMKNm+SwooaC2DDDDO4JIkONg2V\/piKGMhYhJJGEvFCjDJj14COGPRBSw5DLDUJDC9W1UCQ6F2II5CBbztDlIBxW1yA6S+KQww+FpLmmIDiAyUILPLpSZoaG2GlImyy82UuZTaLJ5SFSFoqODwnSGeiihuAAQww3PJfmmM8h8iSnnRrCww03nBnqqaimquqqrAoUCAAh+QQJBABKACwAAAAAPAA8AIaVlZWWlpaXl5eZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39\/g4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBKgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKMRsbMZycGQwMGaKbFQ0NFaiPIBIPJYcUqxSHLBocKK6DEAUFDrS2hxoTExy9ghAGzROGtQ23hR4U1hvKShcHzQmzhNHTgy0X1hUg2UrMzoXhhRzWFNjpHAjNB6eD7oMjFdYWJtIJstDMQANCqlgRyhDvg8BBCu5ZGETK1KAP\/ihcEMVhQYN5hQgaKBBhUAkLFr4p4TDBGjpDLEKAYCGpAQAAAhZgMOSAXaIO1vIRSgFCQwYMIiQxABCg6YCShRgcXIRhZyESGzJozRBCkgcDTZsCICABUwkOW7V2cEHpAQGm\/k0FKLD0IW0GDiMuiWggIGyABJQ8pNUgAoYmCwgCMEUQ+GgGDydQYXAgrNIIESoeat7MuTOiI6BDi06CSQYKEyVSqzZxogajI0Ziy559BJOJDyBy6879gdci2LOD1750e\/fuDykaiRZt5AgSTDFOq15t4obn69izcyIiRIglFixCiRoSBIj5IJRSqE5hOFMRIebjo5+kfvUK65bgxz9vScX0Eie0QEkR5e0XxBCYvHDCfyi4Fol+8XlXCA88MBKDeIS0gJpqK0gCYRBEGLJDDjn0oMgMLbTQHiExrIAaCTRFwp0QIRrSA4k5VCgIDzbYoKMSMqTYAg2HzLDCCkRyiqIDjj4McsMMM+CnBA1CvrDZjSTuQIgNUNpACAxCJpnOD0uS2OQgXM7gJZoupOgCDgLxgKOJW3ZZSJApYtiLD2XqICGadhKywwtuiumKnCT+CKiahqCYZzaIamlImmsWAmYLMmQDBIXzFULpITvEIAOc2H2qXSKmnnrIDzjg8IOqsMYq66y01upKIAAh+QQJBABHACwAAAAAPAA8AIaYmJiZmZmampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nze3t7f39\/i4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBHgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKLhcXLpycFQYGFaKbD6UPqI8cDAoihw4HBw6HKRYYJa2DCwAACbO1t4YVDQ0XvYK\/AQHFhLS2hhkO1srLEgPOBbLRxIUpEdYPHMvMzgANhdLQghgN1hbn7wTOA6eD7YQfD9YQ3uhBcBYAASFVBlgNomDNgTl6gwo4ExBhEClTgzb4c1BRlBEjiCKkYzAoRIQIIQZdiOfw0IkOHFBI+kjzEAJn7qhZy0eoBIcKFCZ0mEmzZqFajCZMMATCAoWnEx5GKloUE4gLT7NiUEGJqlFKG4BmvfABk1eQkzJkpVDBQwtN\/l4paQhKQcOIVh8tefBgAqLfv4ADMyoypLDhw0QwvSARorHjxiNiMBoipLLly0MwidCwobPnzhpITL5MWkjmS5s\/fw49+LDrIYkvtRjx+LEIGoJz697dC4gPH5ZSpHiBCkgPHsh7UDIhormJt5mE+EBOXfmkEs2bj0iB25KP49R5AK90IntzElwnBQFf\/QemFSTMiyghQ9L09oZw4GDUAjohFSOYJ1Mk94kHhCE31FBDDp2ggAILhrhwQoAipCBJEL8daIgOCtawnyA5yCADg4K04CAKMBwCg4OScWJDhzoMMsMLL8wwyIoOpucXhwreQIgMNNY3yAonpgjRDi8qaRjjIEC+IKQgMqTgYAo20oNDhyQyGWQhLpzoXy86JGnDeFo6WcgNKkxpZC9XKphlmU8O8oKX57TpoyFNxjkICyec8CUqPOhH5o9bItiCCzXwlidviyzKaCI80EADD49WaumlmGaq6V+BAAAh+QQJBABIACwAAAAAPAA8AIaWlpaXl5eYmJiZmZmampqbm5udnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trc3Nzd3d3f39\/g4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBIgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKLxcXL5ycEQYGEaKbDwcHD6iPHQwKIocOqw6HKRUXJK6DCwAACbS2hxQMDBe9gr8BAbeFtQfPhBkN1hbKSBIDzQUj0MSEKRDWDhzZSAvNANOC0e1IF9YN2OgYBM0D9e7hgh4O1h7MQockQrMACAipYkVowrwNBAcVaCbglCBSpgZtANgAgqgjR4wYOWQwAAAGg0BEiABi0AUG1s4ZStGBQwpJInMeMZSgGbxCGKxRMGSCQwUKEzzgzJnT0CpGEiQYCmGBgtUJHSYx1YkpxAWrYDOsoBRy68hKG46CvfABk9md\/pMygKVQwYMLTWWbTtqAlIIGXqKMgLTkwcOJiIgTK158qMgQIZAjQx5CBNOLESFAaN4cQoQMRkOCiB5NekhXDahTq\/62KDTp10JOq1adAbCiIpJzC6l8qYWIzJs1hwhBg7Hx48g5AfHhw9KJE3dF\/eixo3oPSiQ+ePhAYmymIT6qi78+acSH8x9AmJhxyQcP8dYtlUB\/PgQKSkLew+fxA5OKEPR94Jkk4YnHnyE33MAICyzMBCB6JhA4HhCG2EADDTgo4sJz3hHiggkgaHdYJEH04EMQh+RwIYaD4BBDDBkKwsJzJ8BwyAsnmGAjJzWsmMMgMrTQwmeC4PjcTYipgnihDYTEIGQMhKhAYygE8dDjhTsQAoOQOwoSAwrPoVAcOjesGOMgW7bQpSAt0NhgNjpcWUN\/WnJZyA0phEllL2Ve+GMhaa4pyIbPvdkLDkseEughK+TYQjY94HBDc4YsiiALLdSAXJpQJpeIky106ukhPMwwA3mjpqrqqqy26qoogQAAIfkECQQAPwAsAAAAADwAPACFmpqam5uboaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2tra29vb3d3d3t7e39\/fAAAABv7An3BILBqPyKRyyWw6n9CodEqtWq\/YrHarLDUaJi7XAAAYxFtCAEBAa9WBthHEaHDcTri8qBAIGnhNekYPA4YMgUyDRCAGhgQSiUuLQw4Ch5KTAXFEFQSGBRmZSgVlBUQKhgMRo0oHZQdDEZ8DZ1w+PT0+TxcGBhdDDZcDkUYeExIfUj08zbpUDoYKRh0RCgkIE8vN3D1U2EYWCwnkCMVQPtzq3lcXDOTwDSFUzOo87FQQ1\/AMFVe49nhQeQAvgYIJJLTkUjcQW4IHosTgwjeFAoU7rTJq3MhRyI0bOEKKBLkDSwkNFyyoXHkBQwomOWzInEkTBxYMDyDo3Knzgf4GJjhoCrVhsx3Pow82MNkhsmnIGzqwkMiQcqXKliw6at3KFcsNGjSsfPBQAo2NGTHSzqCywUIFCxtEaMlBI63dtVPasvSw4koNGXbVWuFg1QIGZVNwAA4sowaWEBkKa3gZpa7dxkZcuGAyQm4REBhWVuggxXIMGjeMtFCh4oUSEh06zCsCO2UFD1JwgE1tBAZrFZuFvECBwrWQEbE7hDFywkOHE2JY\/IYxJAUJEpR\/mHDeAfEo36xbEEFxHQWREMmXS5Kx4ncMIieuQx+CgrsHFZlc\/DY+JD6J+UPAFptngcDQngos2FCEfwAK90FsHjSIhn6s8deffEYI2AGBbjVQKB5zGBqBHgcjJEKDCy0oCOJ\/R7ggwghZaUUeCeZ1hcSMNdpoxAyshaXjj0AGKeSQRF4RBAA7')}.share_appmsg_container{padding:17px 20px;text-decoration:none;color:#000;-webkit-tap-highlight-color:transparent}.share_appmsg_container:active{background-color:#f7f7f7}.share_appmsg_container .flex_bd{padding-left:10px}.share_appmsg_title{font-size:16px}.share_appmsg_desc{color:#888;font-size:13px;line-height:1.4;margin-top:.2em}.share_appmsg_icon{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABGCAMAAABCBcKLAAAAflBMVEUAAAAso0Q\/rFYso0Qro0Qro0QupkkvqUsso0QtpEYwp0lFu2Iro0Qro0UspEUspEYso0QspEQso0UvpUUro0Uro0Uro0Qro0Qso0UspEU4rEorokQso0Qso0QtpEUro0YspEUspkQso0Uro0Qto0Uto0QupEYrokUzqkQrokS9r21\/AAAAKXRSTlMA5Av887MjG39JFQPo3FJAlIN4L8+sppyLWw3t06J+bEw10MRyZCvUHvB+FQ8AAAFySURBVFjD7dhrb4MgGIZhREXFs2099dy13Z7\/\/weXZkvVBTt54WPvjyZcCYpIZNPEtf5IPfybE7GZZLnD0hw1wUMPGimNLAFMkRDPXL\/LRc9epEb4ZjASwR7pIyMDGaMhIYZSRkMyjCpoCE8w6khDQozLSIicrrGIhJSwgOwsIAI\/7fyiLQ+Hg6AgVwBwKzlcISA1ALSMGSEpANwNEVe91PXV1gbS2UByG4iwgXCmXxD8QRghx1uZI4ATWECw5hYQ+LEFBIUNBEca0udV4z9PDu5JG4mjJsU0b6WHnJut6owRaCBnH+rWfCkiN5jNj5ch2RYvqhYhLWCKxHsMUadTY4h6Y0sMUR9xhmmUxSYTqNNZ9vvRgEtddvnqq9d9Ae\/ur3AJc07dCjZ4lITCYFMK3Adx40bbYwig6A036k94J9NPhsD2PDtTyZYhNzdn8y1EmoqZI\/vYAtIxC4ikIDpj3sgbeSO07CMOSDkTJCIp0x9T39HayMQFhdt5AAAAAElFTkSuQmCC) no-repeat 0 0;width:34px;height:35px;vertical-align:middle;display:inline-block;-webkit-background-size:34px auto;background-size:34px auto}.friend_cmt_area{-webkit-transition:height .3s;transition:height .3s}.friend_cmt_area.hide{position:absolute;visibility:hidden}.friend_cmt_readmore{padding:30px;text-align:center}.friend_cmt_readmore a{-webkit-tap-highlight-color:rgba(0,0,0,0)}.appmsg_card_context{position:relative;background-color:#fdfdfd}.appmsg_card_context:before{content:\" \";border:1px solid #e2e2e2;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;position:absolute;top:0;left:0;width:200%;height:200%;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.appmsg_card_context .mpda_cpc_inner{border:0}.mpda_cpc_inner{position:relative;border:1px solid #e2e2e2}.mpda_cpc_title{font-size:13px;padding:6px 10px;line-height:1.2;color:#888}.mpda_cpc_title.mpda_cpc_title_right{text-align:right}.mpda_cpc_title.mpda_cpc_title_left{text-align:left}.appmsg_card_ft{position:relative;font-size:13px;display:flex;justify-content:space-between;align-items:center}.appmsg_card_ft:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e6e6e6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.dropdown_opr_tips{display:inline-block;vertical-align:top;color:#888;position:relative}.dropdown_opr_tips.tl{display:block}.dropdown_opr_popover{display:none;font-size:13px;line-height:2.8;padding:0 1em;background:#fff;color:#576b95;border:1px solid #dfdfdf;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);border-radius:3px;position:absolute;top:100%;left:50%;-webkit-tap-highlight-color:rgba(0,0,0,0)}.dropdown_opr_popover:active{background-color:#ececec}.link_tips{float:right}.link_tips img{width:20px;height:20px;vertical-align:middle;margin-right:.2em;margin-top:-2px}.appmsg_card_btn{position:absolute;right:11px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);color:#576b95;border:1px solid #576b95;border-radius:3px;font-size:13px;line-height:1;padding:8px 9px;display:flex;justify-content:center;align-items:center}.appmsg_card_btn:active{border-color:#354567;color:#354567;-webkit-tap-highlight-color:rgba(0,0,0,0)}.appmsg_card_btn img{display:inline-block;width:13px;height:13px!important;vertical-align:middle;margin-right:6px;position:relative;top:.5px}.mpda_cpc_context{border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;margin:14px 0}.mpda_cpc_context:before{border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;z-index:1}.mpda_cpc_bd{position:relative;padding-bottom:56.25%;width:auto;height:auto;-webkit-background-size:cover;background-size:cover;background-position:50% 50%;background-repeat:no-repeat}.mpda_cpc_thumb{width:100%;position:absolute;top:0;left:0}.mpda_cpc_ft{padding:10.5px 11px}.mpda_cpc_ft.single{padding:22px 11px}.appmsg_card_msg{position:relative;top:2px;display:inline-block}.appmsg_card_msg .appmsg_card_msg_title{display:block;color:#333;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3;font-size:17px}.appmsg_card_msg .appmsg_card_msg_supp{margin-top:2px;display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;font-size:13px;font-weight:400;color:#fa7834}.appmsg_card_msg .appmsg_card_msg_supp.price{font-family:'wechatnum';font-size:13px}@font-face{font-family:'wechatnum';src:url('data:application\/octet-stream;base64,AAEAAAAQAQAABAAATFRTSJjR0dUAAAEMAAAAEE9TLzKKcYMzAAABHAAAAGBWRE1YdDl7tgAAAXwAAAXgY21hcADqAd0AAAdcAAAAjmN2dCAA8oWXAAAH7AAAACBmcGdtdCgNNAAACAwAAALmZ2x5Zpf8R\/4AAAr0AAAGtGhkbXhOU2qhAAARqAAAAXhoZWFkBzA24QAAEyAAAAA2aGhlYQWdASoAABNYAAAAJGhtdHgX3AJCAAATfAAAADBsb2NhC1gJcgAAE6wAAAAabWF4cAIkAzEAABPIAAAAIG5hbWUBGuGYAAAT6AAAAs9wb3N0\/50ARgAAFrgAAAAgcHJlcDNDNIkAABbYAAAAkwAAAAwBO0szTEs7S0tLS0sAAwH7AfQAAAAEArwCigAAAIwCvAKKAAAB3QAyAPoAAAIABgMEAAACAAQAAAABAAAAAAAAAAAAAAAAcHlycwBAAAAAOQLI\/zMARQLUAAwAAAABAAAAAAH7AsgAAAAgAAAAAAABAAEBAQEBAAwA+Aj\/AAgACP\/+AAkACf\/+AAoACv\/9AAsAC\/\/9AAwADP\/9AA0ADf\/9AA4ADv\/9AA8AD\/\/8ABAAEP\/8ABEAEf\/8ABIAEv\/8ABMAE\/\/7ABQAFP\/7ABUAFf\/7ABYAFv\/7ABcAF\/\/7ABgAGP\/6ABkAGf\/6ABoAGv\/6ABsAG\/\/6ABwAHP\/6AB0AHf\/5AB4AHv\/5AB8AH\/\/5ACAAIP\/5ACEAIf\/5ACIAIv\/4ACMAI\/\/4ACQAJP\/4ACUAJf\/4ACYAJv\/3ACcAJ\/\/3ACgAKP\/3ACkAKf\/3ACoAKv\/3ACsAK\/\/2ACwALP\/2AC0ALf\/2AC4ALv\/2AC8AL\/\/2ADAAMP\/1ADEAMf\/1ADIAMv\/1ADMAM\/\/1ADQANP\/1ADUANf\/0ADYANv\/0ADcAN\/\/0ADgAOP\/0ADkAOf\/zADoAOv\/zADsAO\/\/zADwAPP\/zAD0APf\/zAD4APv\/yAD8AP\/\/yAEAAQP\/yAEEAQf\/yAEIAQv\/yAEMAQ\/\/xAEQARP\/xAEUARf\/xAEYARv\/xAEcAR\/\/xAEgASP\/wAEkASf\/wAEoASv\/wAEsAS\/\/wAEwATP\/vAE0ATf\/vAE4ATv\/vAE8AT\/\/vAFAAUP\/vAFEAUf\/uAFIAUv\/uAFMAU\/\/uAFQAVP\/uAFUAVf\/uAFYAVv\/tAFcAV\/\/tAFgAWP\/tAFkAWf\/tAFoAWv\/tAFsAW\/\/sAFwAXP\/sAF0AXf\/sAF4AXv\/sAF8AX\/\/rAGAAYP\/rAGEAYf\/rAGIAYv\/rAGMAY\/\/rAGQAZP\/qAGUAZf\/qAGYAZv\/qAGcAZ\/\/qAGgAaP\/qAGkAaf\/pAGoAav\/pAGsAa\/\/pAGwAbP\/pAG0Abf\/pAG4Abv\/oAG8Ab\/\/oAHAAcP\/oAHEAcf\/oAHIAcv\/nAHMAc\/\/nAHQAdP\/nAHUAdf\/nAHYAdv\/nAHcAd\/\/mAHgAeP\/mAHkAef\/mAHoAev\/mAHsAe\/\/mAHwAfP\/lAH0Aff\/lAH4Afv\/lAH8Af\/\/lAIAAgP\/kAIEAgf\/kAIIAgv\/kAIMAg\/\/kAIQAhP\/kAIUAhf\/jAIYAhv\/jAIcAh\/\/jAIgAiP\/jAIkAif\/jAIoAiv\/iAIsAi\/\/iAIwAjP\/iAI0Ajf\/iAI4Ajv\/iAI8Aj\/\/hAJAAkP\/hAJEAkf\/hAJIAkv\/hAJMAk\/\/gAJQAlP\/gAJUAlf\/gAJYAlv\/gAJcAl\/\/gAJgAmP\/fAJkAmf\/fAJoAmv\/fAJsAm\/\/fAJwAnP\/fAJ0Anf\/eAJ4Anv\/eAJ8An\/\/eAKAAoP\/eAKEAof\/eAKIAov\/dAKMAo\/\/dAKQApP\/dAKUApf\/dAKYApv\/cAKcAp\/\/cAKgAqP\/cAKkAqf\/cAKoAqv\/cAKsAq\/\/bAKwArP\/bAK0Arf\/bAK4Arv\/bAK8Ar\/\/bALAAsP\/aALEAsf\/aALIAsv\/aALMAs\/\/aALQAtP\/aALUAtf\/ZALYAtv\/ZALcAt\/\/ZALgAuP\/ZALkAuf\/YALoAuv\/YALsAu\/\/YALwAvP\/YAL0Avf\/YAL4Avv\/XAL8Av\/\/XAMAAwP\/XAMEAwf\/XAMIAwv\/XAMMAw\/\/WAMQAxP\/WAMUAxf\/WAMYAxv\/WAMcAx\/\/WAMgAyP\/VAMkAyf\/VAMoAyv\/VAMsAy\/\/VAMwAzP\/UAM0Azf\/UAM4Azv\/UAM8Az\/\/UANAA0P\/UANEA0f\/TANIA0v\/TANMA0\/\/TANQA1P\/TANUA1f\/TANYA1v\/SANcA1\/\/SANgA2P\/SANkA2f\/SANoA2v\/SANsA2\/\/RANwA3P\/RAN0A3f\/RAN4A3v\/RAN8A3\/\/QAOAA4P\/QAOEA4f\/QAOIA4v\/QAOMA4\/\/QAOQA5P\/PAOUA5f\/PAOYA5v\/PAOcA5\/\/PAOgA6P\/PAOkA6f\/OAOoA6v\/OAOsA6\/\/OAOwA7P\/OAO0A7f\/NAO4A7v\/NAO8A7\/\/NAPAA8P\/NAPEA8f\/NAPIA8v\/MAPMA8\/\/MAPQA9P\/MAPUA9f\/MAPYA9v\/MAPcA9\/\/LAPgA+P\/LAPkA+f\/LAPoA+v\/LAPsA+\/\/LAPwA\/P\/KAP0A\/f\/KAP4A\/v\/KAP8A\/\/\/KAAAAAwAAAAMAAABmAAEAAAAAABwAAwABAAAAPgAGACIAAAAuAAwACwAAAAEAAgADAAQABQAGAAcACAAJAAoABAAoAAAABgAEAAEAAgAuADn\/\/wAAAC4AMP\/\/\/93\/0QABAAAAAAAAAAQAKAAAAAYABAABAAIALgA5\/\/8AAAAuADD\/\/\/\/d\/9EAAQAAAAAAAAAAABQAWwBmgAAAAP\/6AAYB+wAGAsgABgAUAGUAawAAAAC4AAAsS7gACVBYsQEBjlm4Af+FuABEHbkACQADX14tuAABLCAgRWlEsAFgLbgAAiy4AAEqIS24AAMsIEawAyVGUlgjWSCKIIpJZIogRiBoYWSwBCVGIGhhZFJYI2WKWS8gsABTWGkgsABUWCGwQFkbaSCwAFRYIbBAZVlZOi24AAQsIEawBCVGUlgjilkgRiBqYWSwBCVGIGphZFJYI4pZL\/0tuAAFLEsgsAMmUFhRWLCARBuwQERZGyEhIEWwwFBYsMBEGyFZWS24AAYsICBFaUSwAWAgIEV9aRhEsAFgLbgAByy4AAYqLbgACCxLILADJlNYsEAbsABZioogsAMmU1gjIbCAioobiiNZILADJlNYIyG4AMCKihuKI1kgsAMmU1gjIbgBAIqKG4ojWSCwAyZTWCMhuAFAioobiiNZILgAAyZTWLADJUW4AYBQWCMhuAGAIyEbsAMlRSMhIyFZGyFZRC24AAksS1NYRUQbISFZLbgACixLuAAJUFixAQGOWbgB\/4W4AEQduQAJAANfXi24AAssICBFaUSwAWAtuAAMLLgACyohLbgADSwgRrADJUZSWCNZIIogiklkiiBGIGhhZLAEJUYgaGFkUlgjZYpZLyCwAFNYaSCwAFRYIbBAWRtpILAAVFghsEBlWVk6LbgADiwgRrAEJUZSWCOKWSBGIGphZLAEJUYgamFkUlgjilkv\/S24AA8sSyCwAyZQWFFYsIBEG7BARFkbISEgRbDAUFiwwEQbIVlZLbgAECwgIEVpRLABYCAgRX1pGESwAWAtuAARLLgAECotuAASLEsgsAMmU1iwQBuwAFmKiiCwAyZTWCMhsICKihuKI1kgsAMmU1gjIbgAwIqKG4ojWSCwAyZTWCMhuAEAioobiiNZILADJlNYIyG4AUCKihuKI1kguAADJlNYsAMlRbgBgFBYIyG4AYAjIRuwAyVFIyEjIVkbIVlELbgAEyxLU1hFRBshIVktAAAAAgA7\/\/QB2gLUABUAKwAquAAsL7gAFi+5AAUAAvS4ACwQuAAQ0LgAEC+5ACEAAvS4AAUQuAAt3DAxATIeAhURFA4CIyIuAjURND4CFzQuAiMiDgIVERQeAjMyPgI1AQorTDghIThMKytLOCEhOEuQEBslFRUkHBAQHCQVFSUbEALUIThMK\/7AK0w4ISE4TCsBQCtMOCHKFSUbEBAbJRX+tBUlGxAQGyUVAAAAAAEAUgAAAXUCyAAHAC8AuAAARVi4AAAvG7kAAAAJPlm4AABFWLgAAi8buQACAAU+WboABAACAAAREjkwMQEzESMRByc3AQRxcWtHsgLI\/TgCP19TlQAAAAABAD8AAAHYAtQAHQBsuAAKK7sAGwANAAgADiu4ABsQuAAB0LgAAS9BBQBKAAgAWgAIAAJdQQkACQAIABkACAApAAgAOQAIAARduAAbELgAH9wAuAALRVi4AAIvG7kAAgAOPlm7ABYADAANAA4ruAACELkAAAAM9DAxNyEVIT0BATY1NC4CIyIOAgcnPgEzMh4CFRQHwgER\/mwBHREQGyQVFScgFwRTF25FK0s4ISFqamoBAWoXHhMjGQ8QFxoLNTpJIDdJKj0yAAEAH\/\/0AegCyAAnAE+4AAoruwAFAA0AFgAOK0EFAEoAFgBaABYAAl1BCQAJABYAGQAWACkAFgA5ABYABF24AAUQuAAo3AC7ABEADAAKAA4ruwAlAAwAIgAOKzAxAR4DFRQOAiMiJic3HgEzMj4CNTQuAiMiBgcGByc3IzUhFQcBKSlGMx0mQlkyRXEgZBE8JRsvJBQUJC8bBgsFKRw1r8ABWYQBzwkrPk4rMldBJkQ5NB0jFCIvGhsuIxQBAQgaJP9lNsMAAAAAAgAaAAAB7gLIAAoADQA5ALgAAEVYuAAILxu5AAgACT5ZuAAARVi4AAMvG7kAAwAFPlm6AAsAAwAIERI5ugANAAMACBESOTAxJRUjFSM1ITUBMxEhMxEB7k1l\/t4BFnH+6bL5ZZSUZQHP\/jEBOAAAAAEAL\/\/0Ae8CyAAoAHm4AAoruAApL7gAFi9BBQBKABYAWgAWAAJdQQkACQAWABkAFgApABYAOQAWAARduQAFAA30uAApELgAItC4ACIvuQAnAA30uAAFELgAKtwAuwARAAwACgAOK7sAJAAMACUADiu7AAAADAAbAA4rugAnABsAABESOTAxATIeAhUUDgIjIiYnNx4BMzI+AjU0LgIjIgYHDgEHJxEhFSMVNgECMVZBJSVBVjFFcR1kDzslGi0iFBQiLRoZLhECAQFEAUbhGwHOJUFWMTFWQSVHOjQeJhMiLRoaLSIUFBEBAgEuAWVlnAcAAAACACz\/9AHvAsgAFwArABQAuAAARVi4ABMvG7kAEwAJPlkwMQEyHgIVFA4CIyIuAjU0NjcTMwMyNhMyPgI1NC4CIyIOAhUUHgIBDi5SPiMjPlIuL1I+Iw0LynaKBQoFGCsgExMgKxgZKyATEyArAbcjPlIvL1E+IyM+US8cMhcBjv7uAf6oEyArGBkrIBMTICsZGCsgEwAAAAEAQgAAAdYCyAAIABQAuAAARVi4AAQvG7kABAAFPlkwMRMhFTEDIxMhNUIBlOJ14P7jAshf\/ZcCY2UAAAMAKf\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') format('truetype');font-weight:normal;font-style:normal}@media(min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.appmsg_card_ft,.appmsg_card_btn{font-size:15px}}.db{display:block}.icon_share_audio_switch{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAaVBMVEUAAAAarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRlIa6J1AAAAInRSTlMA9wYa38QR7ZJnMK1IIqBsO3fXDbSGQudZz5fKpV0rfbpRlHIjYQAAA35JREFUWMPFWduyqjAMDS0tgtwEFBGv\/P9Hntmh3cWDTYsMs\/Oio3SRy0qapuCU7PXIRdUGQxCFncgfrwzWCb\/l4TCTML\/xbxFlIQariEJ+AZnkwUBKkCdLIZvBQ5olsPw61Uhc4vTOa4Ca39P4IqYWXH2dyw5mWXUs2ez\/8liZVx6YD2bW6wXRzmpesov0U70HxW5azTBmpD1xqJW9uUzfaS0Lp1ms0Nru6Nfv9WPSi8lahT2BKoWyvARPKZUPhLRiduq9ckHaKds6y5pa6XmARXJQutaEP4MzLJTzyJfmk193I2YKiyUdUXcf+OnCdKPO+JqNvxO2kx4YNcr+c2jvjpE7Wv27W4uRS\/C1jFEu3mpdhJyX34PWISY3ByNj\/SxhhZRjfZ0UMkUJt3Bxx08rJU2xbFB16YEZDiG3JSy6sHlXNPbCHIbOVpHiN1VzjBLzKOCkmxjGKld6B4oNbjkiqi3rkJeBNN8jBj7SUEaxyGgnjE1OkS0mHkUAgd5X\/qWF80mWR7PaOY0410GrnHHXVHpSqlZII521RzeXqtpkTkgEEitIiwF1YeLDJgQnIldbgAx5wMBj5z4br+aWB5GdGbxUxGjUp6ESLmxhJsaMFzx+Pi5+VIpN6bTUlcvPfw\/InXlvjO5MjsdE\/ucg6DjxRlEJY4Wb0J1IlnR0ZoXGEHF\/6l1I68d+vj3ho9xH0mO+cjumNiMxvg\/tTOWYcIAkqCl+XjRbtH7CHv4aCQrIQIui3TCxNPyN1BMXfhQFFxCgJ\/yzmYAaTpGgEZpPoOq60GJctfkRaX5IBApRVTNTm\/TvnYHqCEoh6kMzUCuNxnUUpVzkB\/2+\/Pc5iTpT5PdNUx78FrMT6kymqbugmEpxNZU4JXaph7v0GbOGxJQ3SZU+ryINSWT8iAt6skg7txPD1wCJN\/rrQG0nZuNzo54nHQOnNj6zRTtRj5Pe5klu0d7NBGTThvFENhNE20NQS5BtD9GgUdQqyQZtaSuZ4bIr1fUGcmHTCz1SRpJNL9GeE3xNHe35\/CDhRj04DhLzI48b9eI48mxxONvyGLn+wGtsLTY5mm87RFg\/7jhNxh3bD2aANWtHSFsOu7Yfy60fIG4\/6lw\/lN14fOwedJdWXxKD7m1H8u7LAwZMZsn88mCDa46\/v5DZ6OoIhcf7dg7Y7mPalb7XcVEwDEFU+V3H\/QOplcP+ctPpgwAAAABJRU5ErkJggg==) no-repeat 0 0;width:42px;height:42px;vertical-align:middle;display:inline-block;-webkit-background-size:42px auto;background-size:42px auto;overflow:hidden;color:transparent}.icon_share_audio_switch:before{content:\"\u64ad\u653e\u8bed\u97f3\"}.icon_share_audio_switch_accessibility{position:absolute;width:20px;height:20px;left:-9999em}.icon_share_audio_switch_accessibility:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_playing .icon_share_audio_switch{background-image:url(data:image\/gif;base64,R0lGODlhVABUAPfJAButGiKwIe747m7Kbe\/47\/r8+vj7+J3bnB+vHqDcny20LByuG+j16Pz9\/HvPeiOwIk\/ATuT05FLBUTa3Np7bnTm4OCqzKdXv1ff79ySwI8Lowi+1Lj66Pb3mvdvx23nPeaTepMjqyLXktVzEW63hrTW2NEu+So7WjdLu0j66PrzmvKrgqn7QfeL04p\/cnkm+SCiyJ7\/nvmTHYyGwIPn8+fX69d7y3vb69iWxJE2\/TPL58iuzKqzgrHjOeEW8RPT69PH58ZXYlNDtz4bThSyzK+337eb15mLGYdbv1mnJaW\/Lb8bqxja3NeX15V3FXPD48GHGYfP689fw11HAUHzQe3fOd0q+STi4N8rrytPu01\/FXz25PGzKa17FXez37CCvH6ngqaDcoOn26ODz3x6vHZLXkiaxJef150y\/S+Hz4NDt0E\/AT77nvrTjtJfZlnrPeje3N0K7QWvKaoXThLvmu8fqxmXHZIPSg5bZlavgq8\/tz9zx3JzbnI\/WjtHu0Ue9RkS8Q93y3ZTYk6LdovH58FfDV2DGYInUiX3QfIfThmfIZtnw2Dq4OZDXkLrlulDAUIzVi43VjG\/LbsPpw\/n7+XTNc1TBUx6uHcDnv3DLcDG1MN\/y31\/FXsjqx2jJaFPBUi60LS60LljDWHXNdGbIZTS2M6\/hrnfOdke9R9Tv1FbCVWPHYkC6P1rEWbDir0a8RVXCVMnryYvVi4jUiMHowVnDWMvry+v36zO2Mqjfpx2uHGfIZyeyJsDowLHisZHXkZPYk7nluXbNddnw2fv8+4fUhzC1LxqtGf39\/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH\/C05FVFNDQVBFMi4wAwEAAAAh\/wtYTVAgRGF0YVhNUDw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzEyYzBkMi03NGJlLTQ5MTEtYmQyMi1lNmI4ZTlhZmQ5ZGIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkUzMTAyRkEyMjg0MTFFN0JDNzBCMEY5NjNCMDhDQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkUzMTAyRjkyMjg0MTFFN0JDNzBCMEY5NjNCMDhDQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NzEyYzBkMi03NGJlLTQ5MTEtYmQyMi1lNmI4ZTlhZmQ5ZGIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODcxMmMwZDItNzRiZS00OTExLWJkMjItZTZiOGU5YWZkOWRiIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af\/+\/fz7+vn49\/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M\/OzczLysnIx8bFxMPCwcC\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)}.share_audio_playing .icon_share_audio_switch:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_playing .icon_share_audio_switch_accessibility:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_context{background-color:#fcfcfc;padding:14px 15px 6px;font-size:16px;position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_context:before{content:\" \";position:absolute;top:0;left:0;border:1px solid #e0e0e0;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;width:200%;height:200%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0}.share_audio_switch{margin:-10px 15px 0 0;position:relative;z-index:1}.share_audio_info{position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_title{display:block;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;min-height:1.6em;word-wrap:break-word}.share_audio_tips{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;padding-bottom:6px;font-size:12px;color:#888}.share_audio_progress_wrp{height:2px;margin-right:7px;position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_progress{height:100%;background-color:#ebebeb;position:relative;width:100%;padding-left:7px;-webkit-box-sizing:initial!important;box-sizing:initial!important}.share_audio_progress_inner{background-color:#09bb07;height:100%;position:absolute;top:0;left:0;z-index:1}.share_audio_progress_buffer{position:absolute;top:0;left:0;bottom:0;background-color:#d9d9d9}@-webkit-keyframes slidein{from{-webkit-transform:translateX(-50%);transform:translateX(-50%)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes slidein{from{-webkit-transform:translateX(-50%);transform:translateX(-50%)}to{-webkit-transform:translateX(0);transform:translateX(0)}}.share_audio_progress_loading{position:absolute;top:0;bottom:0;left:0;right:0;overflow:hidden;display:none}.share_audio_progress_loading .share_audio_progress_loading_inner{position:absolute;top:0;bottom:0;left:0;-webkit-animation:slidein 6s linear infinite normal;animation:slidein 6s linear infinite normal;width:200%;max-width:none!important;background-image:-webkit-repeating-linear-gradient(-15deg,#d9d9d9,#d9d9d9 2px,#ebebeb 2px,#ebebeb 4px);background-image:repeating-linear-gradient(-15deg,#d9d9d9,#d9d9d9 2px,#ebebeb 2px,#ebebeb 4px)}.share_audio_progress_handle{z-index:2;position:absolute;width:14px;height:14px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:rgba(9,187,7,0.15);top:50%;margin-top:-7px;margin-left:-3.5px;cursor:pointer;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_progress_handle:before{content:\" \";width:8px;height:8px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:#09bb07;position:absolute;left:50%;top:50%;margin-top:-4px;margin-left:-4px}.share_audio_desc{color:#b2b2b2;overflow:hidden;padding-top:6px;font-size:12px}.share_audio_desc em{font-weight:400;font-style:normal}.share_audio_length_current{float:left}.share_audio_length_total{float:right}.share_audio_length_total:before{position:absolute;left:-9999em;content:\"\u603b\u65f6\u957f\"}.da_video_area .da_video_bg_cover{width:100%;min-height:100px;display:block;background-repeat:no-repeat;background-position:center center;background-size:cover}.da_btn_more{display:inline-block;color:#576b95;font-size:13px;border:1px solid #576b95;border-radius:3px;line-height:2.2;padding:0 .65em}.da_brand_info{display:flex;align-items:center;min-height:38px}.da_brand_info .da_brand_info_hd{width:35px;height:35px;display:inline-block;margin-right:10px;vertical-align:middle;border-radius:50%;overflow:hidden;background-repeat:no-repeat;background-position:center center;background-size:cover}.da_brand_info .da_brand_info_content{font-size:0;display:inline-block;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0);box-sizing:border-box;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.da_brand_info .da_brand_info_title{margin:0;font-size:14px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.da_brand_info .da_brand_info_details{margin:0;vertical-align:top;font-size:13px;color:#878787;-webkit-tap-highlight-color:rgba(0,0,0,0)}.rich_media_tool{font-size:14px;padding-top:30px;margin:0 -8px}.rich_media_tool .meta_primary{margin-right:20px}.rich_media_tool .meta_extra{color:#607fa6}.rich_media_tool .meta_praise{min-width:2.5em;margin-left:0;margin-right:20px}.rich_media_tool .meta_praise i{margin-right:5px}.icon_praise_gray{background-image:url(\"data:image\/svg+xml;charset=utf8, %3Csvg width='14' height='12' viewBox='0 0 14 12' xmlns='http:\/\/www.w3.org\/2000\/svg'%3E%3Cpath d='M7 11.442l.07-.036c.233-.12.492-.262.771-.425.8-.464 1.598-1.001 2.342-1.6C12.263 7.702 13.497 5.878 13.5 4c0-1.969-1.538-3.5-3.5-3.5-.892 0-1.809.347-2.735.924L7 1.59l-.265-.165C5.81.847 4.892.5 4 .5 2.038.5.5 2.031.5 4 .503 5.877 1.735 7.7 3.814 9.377A18.84 18.84 0 0 0 7 11.442z' stroke='%23576B95' fill='none' fill-rule='evenodd'\/%3E%3C\/svg%3E\");width:14px;height:12px}.praised .icon_praise_gray,.icon_praise_gray.praised{background-image:url(\"data:image\/svg+xml;charset=utf8, %3Csvg width='14' height='12' viewBox='0 0 14 12' xmlns='http:\/\/www.w3.org\/2000\/svg'%3E%3Cpath d='M10 0C8.82 0 7.726.548 7 1 6.274.548 5.18 0 4 0 1.771 0 0 1.746 0 4c.008 4.719 7 8 7 8s6.992-3.281 7-8c0-2.254-1.771-4-4-4z' fill='%23576B95' fill-rule='evenodd'\/%3E%3C\/svg%3E\");background-position:0 0}.praised .praise_num{color:#607fa6}.rich_media_extra{overflow:hidden}.mod_title_context{overflow:hidden;line-height:1.2;margin-bottom:17px}.mod_title_context .mod_title{float:left;font-weight:400;font-size:15px;color:#888}.mod_title_context .discuss_icon_tips{overflow:hidden;margin:0;font-size:15px}.mod_title_context .discuss_icon_tips img{margin-right:3px}.mod_title_context .discuss_icon_tips .icon_edit{width:10px}.mod_title_context .title_bottom_tips{margin-top:.2em}.discuss_extra_info{padding-top:.5em}.reply_result{padding-top:.2em;padding-left:0}.reply_result:before{display:none}.reply_result .nickname{padding-left:.65em;color:#888}.reply_result .nickname:before{width:2px;left:0;margin-top:-9px;height:16px;background-color:#1aad19}.discuss_list{font-size:14px;margin-top:0}.discuss_item{margin-top:30px}.discuss_item .avatar{width:30px;height:30px!important}.discuss_item .discuss_extra_info{color:#888;font-size:14px}.discuss_message{font-size:17px;padding-top:.5em}.title_bottom_tips{font-size:13px;margin-top:0}.discuss_end_tips{margin-top:14px;margin-bottom:0;color:#888;font-size:13px}.discuss_end_tips .weui-loadmore_line{margin:0 auto;width:56%;height:1.2em;border-color:#e6e6e6}.discuss_end_tips .weui-loadmore__tips.weui-loadmore__tips{background-color:#f2f2f2;padding:0 .34em}.discuss_btn_wrp{margin-bottom:30px}.mpda_bottom_container .rich_media_extra{padding-bottom:30px}.mpda_bottom_container .appmsg_banner{margin-top:0}.preview_group{border:0;border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px}.preview_group:before{content:\" \";position:absolute;top:0;left:0;border:1px solid #e6e6e6;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;width:200%;height:200%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0}.preview_group.download_app_with_desc:before{display:none}.preview_group_inner{position:relative}.reward_area{margin:30px 0;padding:30px 10% 30px}.reward_tips{margin-bottom:15px}.reward_user_tips{margin-top:20px;font-size:14px;margin-bottom:5px}.appmsg_card_context{border-width:0;border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px}.appmsg_card_active:active{background-color:#f7f7f7}.qqmusic_bd{background-color:transparent}.play_area{width:auto;height:auto;margin-right:15px}.qqmusic_thumb{width:68px;height:68px!important}.qqmusic_songname{padding:10px 0 5px}.qqmusic_singername{font-size:13px}.share_audio_context{padding:14px 20px 6px;background-color:#fdfdfd}.share_audio_context:before{border-color:#e6e6e6}.share_audio_context:active{background-color:#f7f7f7}.ct_mpda_area:before{border-top-left-radius:0;-moz-border-radius-topleft:0;-webkit-border-top-left-radius:0;border-top-right-radius:0;-moz-border-radius-topright:0;-webkit-border-top-right-radius:0;z-index:1}.ct_mpda_bd{position:relative;border:0;z-index:2}.ct_mpda_bd:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e6e6e6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.weapp_card.app_context{overflow:visible}.weapp_card.app_context .weapp_card_ft{border-width:0;position:relative}.weapp_card.app_context .weapp_card_ft:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e6e6e6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.msg_card .card_content{border-top-left-radius:2px;-moz-border-radius-topleft:2px;-webkit-border-top-left-radius:2px;border-top-right-radius:2px;-moz-border-radius-topright:2px;-webkit-border-top-right-radius:2px}.msg_card .card_bottom{position:relative;border-width:0}.msg_card .card_bottom:before{content:\" \";position:absolute;top:0;left:0;border:1px solid #e6e6e6;border-bottom-left-radius:4px;-moz-border-radius-bottomleft:4px;-webkit-border-bottom-left-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-bottomright:4px;-webkit-border-bottom-right-radius:4px;border-top:0;width:200%;height:200%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0}.weui-loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:weuiLoading 1s steps(12,end) infinite;animation:weuiLoading 1s steps(12,end) infinite;background:transparent url(data:image\/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size:100%}.weui-loading.weui-loading_transparent,.weui-btn_loading.weui-btn_primary .weui-loading,.weui-btn_loading.weui-btn_warn .weui-loading{background-image:url(\"data:image\/svg+xml;charset=utf-8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'\/%3E%3Crect xmlns='http:\/\/www.w3.org\/2000\/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'\/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'\/%3E%3C\/svg%3E\")}@-webkit-keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg);transform:rotate3d(0,0,1,360deg)}}@keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg);transform:rotate3d(0,0,1,360deg)}}.weui-loadmore{width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center}.weui-loadmore__tips{display:inline-block;vertical-align:middle}.weui-loadmore_line{border-top:1px solid #e5e5e5;margin-top:2.4em}.weui-loadmore_line .weui-loadmore__tips{position:relative;top:-0.9em;padding:0 .55em;background-color:#fff;color:#999}.weui-loadmore_dot .weui-loadmore__tips{padding:0 .16em}.weui-loadmore_dot .weui-loadmore__tips:before{content:\" \";width:4px;height:4px;border-radius:50%;background-color:#e5e5e5;display:inline-block;position:relative;vertical-align:0;top:-0.16em}@font-face{font-weight:normal;font-style:normal;font-family:\"weui\";src:url('data:application\/octet-stream;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzJAKEx+AAABfAAAAFZjbWFw65cFHQAAAhwAAAJQZ2x5ZvCRR\/EAAASUAAAKtGhlYWQMPROtAAAA4AAAADZoaGVhCCwD+gAAALwAAAAkaG10eEJo\/\/8AAAHUAAAASGxvY2EYqhW4AAAEbAAAACZtYXhwASEAVQAAARgAAAAgbmFtZeNcHtgAAA9IAAAB5nBvc3T6bLhLAAARMAAAAOYAAQAAA+gAAABaA+j\/\/\/\/\/A+kAAQAAAAAAAAAAAAAAAAAAABIAAQAAAAEAACbZbxtfDzz1AAsD6AAAAADUm2dvAAAAANSbZ2\/\/\/wAAA+kD6gAAAAgAAgAAAAAAAAABAAAAEgBJAAUAAAAAAAIAAAAKAAoAAAD\/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQOwAZAABQAIAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA6gHqEQPoAAAAWgPqAAAAAAABAAAAAAAAAAAAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+j\/\/wPoAAAD6AAAAAAABQAAAAMAAAAsAAAABAAAAXQAAQAAAAAAbgADAAEAAAAsAAMACgAAAXQABABCAAAABAAEAAEAAOoR\/\/8AAOoB\/\/8AAAABAAQAAAABAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA4ADwAQABEAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAANwAAAAAAAAAEQAA6gEAAOoBAAAAAQAA6gIAAOoCAAAAAgAA6gMAAOoDAAAAAwAA6gQAAOoEAAAABAAA6gUAAOoFAAAABQAA6gYAAOoGAAAABgAA6gcAAOoHAAAABwAA6ggAAOoIAAAACAAA6gkAAOoJAAAACQAA6goAAOoKAAAACgAA6gsAAOoLAAAACwAA6gwAAOoMAAAADAAA6g0AAOoNAAAADQAA6g4AAOoOAAAADgAA6g8AAOoPAAAADwAA6hAAAOoQAAAAEAAA6hEAAOoRAAAAEQAAAAAARgCMANIBJAF4AcQCMgJgAqgC\/ANIA6YD\/gROBKAE9AVaAAAAAgAAAAADrwOtABQAKQAAASIHBgcGFBcWFxYyNzY3NjQnJicmAyInJicmNDc2NzYyFxYXFhQHBgcGAfV4Z2Q7PDw7ZGfwZmQ7PDw7ZGZ4bl5bNjc3Nlte215bNjc3NlteA608O2Rn8GdjOzw8O2Nn8GdkOzz8rzc1W17bXlw1Nzc1XF7bXls1NwAAAAACAAAAAAOzA7MAFwAtAAABIgcGBwYVFBcWFxYzMjc2NzY1NCcmJyYTBwYiLwEmNjsBETQ2OwEyFhURMzIWAe52Z2Q7PT07ZGd2fGpmOz4+O2ZpIXYOKA52Dg0XXQsHJgcLXRcNA7M+O2ZqfHZnZDs9PTtkZ3Z9aWY7Pv3wmhISmhIaARcICwsI\/ukaAAMAAAAAA+UD5QAXACMALAAAASIHBgcGFRQXFhcWMzI3Njc2NTQnJicmAxQrASI1AzQ7ATIHJyImNDYyFhQGAe6Ecm9BRERBb3KEiXZxQkREQnF1aQIxAwgCQgMBIxIZGSQZGQPkREJxdomEcm9BRERBb3KEinVxQkT9HQICAWICAjEZIxkZIxkAAAAAAgAAAAADsQPkABkALgAAAQYHBgc2BREUFxYXFhc2NzY3NjURJBcmJyYTAQYvASY\/ATYyHwEWNjclNjIfARYB9VVVQk+v\/tFHPmxebGxdbT1I\/tGvT0JVo\/7VBASKAwMSAQUBcQEFAgESAgUBEQQD4xMYEhk3YP6sjnVlSD8cHD9IZXWOAVRgNxkSGP62\/tkDA48EBBkCAVYCAQHlAQIQBAAAAAADAAAAAAOxA+QAGwAqADMAAAEGBwYHBgcGNxEUFxYXFhc2NzY3NjURJBcmJyYHMzIWFQMUBisBIicDNDYTIiY0NjIWFAYB9UFBODssO38gRz5sXmxsXW09SP7YqFBBVW80BAYMAwImBQELBh4PFhYeFRUD5A8SDhIOEikK\/q2PdWRJPh0dPklkdY8BU141GRIY\/AYE\/sYCAwUBOgQG\/kAVHxUVHxUAAAACAAAAAAPkA+QAFwAtAAABIgcGBwYVFBcWFxYzMjc2NzY1NCcmJyYTAQYiLwEmPwE2Mh8BFjI3ATYyHwEWAe6Ecm9BQ0NCbnODiXVxQkREQnF1kf6gAQUBowMDFgEFAYUCBQEBQwIFARUEA+NEQnF1iYNzbkJDQ0FvcoSJdXFCRP6j\/qUBAagEBR4CAWYBAQENAgIVBAAAAAQAAAAAA68DrQAUACkAPwBDAAABIgcGBwYUFxYXFjI3Njc2NCcmJyYDIicmJyY0NzY3NjIXFhcWFAcGBwYTBQ4BLwEmBg8BBhYfARYyNwE+ASYiFzAfAQH1eGdkOzw8O2Rn8GZkOzw8O2RmeG5eWzY3NzZbXtteWzY3NzZbXmn+9gYSBmAGDwUDBQEGfQUQBgElBQELEBUBAQOtPDtkZ\/BnYzs8PDtjZ\/BnZDs8\/K83NVte215cNTc3NVxe215bNTcCJt0FAQVJBQIGBAcRBoAGBQEhBQ8LBAEBAAABAAAAAAO7AzoAFwAAEy4BPwE+AR8BFjY3ATYWFycWFAcBBiInPQoGBwUHGgzLDCELAh0LHwsNCgr9uQoeCgGzCyEOCw0HCZMJAQoBvgkCCg0LHQv9sQsKAAAAAAIAAAAAA+UD5gAXACwAAAEiBwYHBhUUFxYXFjMyNzY3NjU0JyYnJhMHBi8BJicmNRM0NjsBMhYVExceAQHvhHJvQUNDQm5zg4l1cUJEREJxdVcQAwT6AwIEEAMCKwIDDsUCAQPlREJxdYmDc25CQ0NBb3KEiXVxQkT9VhwEAncCAgMGAXoCAwMC\/q2FAgQAAAQAAAAAA68DrQADABgALQAzAAABMB8BAyIHBgcGFBcWFxYyNzY3NjQnJicmAyInJicmNDc2NzYyFxYXFhQHBgcGAyMVMzUjAuUBAfJ4Z2Q7PDw7ZGfwZmQ7PDw7ZGZ4bl5bNjc3Nlte215bNjc3NltemyT92QKDAQEBLDw7ZGfwZ2M7PDw7Y2fwZ2Q7PPyvNzVbXtteXDU3NzVcXtteWzU3AjH9JAAAAAMAAAAAA+QD5AAXACcAMAAAASIHBgcGFRQXFhcWMzI3Njc2NTQnJicmAzMyFhUDFAYrASImNQM0NhMiJjQ2MhYUBgHuhHJvQUNDQm5zg4l1cUJEREJxdZ42BAYMAwInAwMMBh8PFhYeFhYD40RCcXWJg3NuQkNDQW9yhIl1cUJE\/vYGBf7AAgMDAgFABQb+NhYfFhYfFgAABAAAAAADwAPAAAgAEgAoAD0AAAEyNjQmIgYUFhcjFTMRIxUzNSMDIgcGBwYVFBYXFjMyNzY3NjU0Jy4BAyInJicmNDc2NzYyFxYXFhQHBgcGAfQYISEwISFRjzk5yTorhG5rPT99am+DdmhlPD4+PMyFbV5bNTc3NVte2l5bNTc3NVteAqAiLyIiLyI5Hf7EHBwCsT89a26Ed8w8Pj48ZWh2g29qffyjNzVbXtpeWzU3NzVbXtpeWzU3AAADAAAAAAOoA6gACwAgADUAAAEHJwcXBxc3FzcnNwMiBwYHBhQXFhcWMjc2NzY0JyYnJgMiJyYnJjQ3Njc2MhcWFxYUBwYHBgKOmpocmpocmpocmpq2dmZiOjs7OmJm7GZiOjs7OmJmdmtdWTQ2NjRZXdZdWTQ2NjRZXQKqmpocmpocmpocmpoBGTs6YmbsZmI6Ozs6YmbsZmI6O\/zCNjRZXdZdWTQ2NjRZXdZdWTQ2AAMAAAAAA+kD6gAaAC8AMAAAAQYHBiMiJyYnJjQ3Njc2MhcWFxYVFAcGBwEHATI3Njc2NCcmJyYiBwYHBhQXFhcWMwKONUBCR21dWjU3NzVaXdpdWzU2GBcrASM5\/eBXS0grKysrSEuuSkkqLCwqSUpXASMrFxg2NVtd2l1aNTc3NVpdbUdCQDX+3jkBGSsrSEuuSkkqLCwqSUquS0grKwAC\/\/8AAAPoA+gAFAAwAAABIgcGBwYQFxYXFiA3Njc2ECcmJyYTFg4BIi8BBwYuATQ\/AScmPgEWHwE3Nh4BBg8BAfSIdHFDRERDcXQBEHRxQ0REQ3F0SQoBFBsKoqgKGxMKqKIKARQbCqKoChsUAQqoA+hEQ3F0\/vB0cUNERENxdAEQdHFDRP1jChsTCqiiCgEUGwqiqAobFAEKqKIKARQbCqIAAAIAAAAAA+QD5AAXADQAAAEiBwYHBhUUFxYXFjMyNzY3NjU0JyYnJhMUBiMFFxYUDwEGLwEuAT8BNh8BFhQPAQUyFh0BAe6Ecm9BQ0NCbnODiXVxQkREQnF1fwQC\/pGDAQEVAwTsAgEC7AQEFAIBhAFwAgMD40RCcXWJg3NuQkNDQW9yhIl1cUJE\/fYCAwuVAgQCFAQE0AIFAtEEBBQCBQGVCwMDJwAAAAUAAAAAA9QD0wAjACcANwBHAEgAAAERFAYjISImNREjIiY9ATQ2MyE1NDYzITIWHQEhMhYdARQGIyERIREHIgYVERQWOwEyNjURNCYjISIGFREUFjsBMjY1ETQmKwEDeyYb\/XYbJkMJDQ0JAQYZEgEvExkBBgkNDQn9CQJc0QkNDQktCQ0NCf7sCQ0NCS0JDQ0JLQMi\/TQbJiYbAswMCiwJDS4SGRkSLg0JLAoM\/UwCtGsNCf5NCQ0NCQGzCQ0NCf5NCQ0NCQGzCQ0AAAAAEADGAAEAAAAAAAEABAAAAAEAAAAAAAIABwAEAAEAAAAAAAMABAALAAEAAAAAAAQABAAPAAEAAAAAAAUACwATAAEAAAAAAAYABAAeAAEAAAAAAAoAKwAiAAEAAAAAAAsAEwBNAAMAAQQJAAEACABgAAMAAQQJAAIADgBoAAMAAQQJAAMACAB2AAMAAQQJAAQACAB+AAMAAQQJAAUAFgCGAAMAAQQJAAYACACcAAMAAQQJAAoAVgCkAAMAAQQJAAsAJgD6d2V1aVJlZ3VsYXJ3ZXVpd2V1aVZlcnNpb24gMS4wd2V1aUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAHcAZQB1AGkAUgBlAGcAdQBsAGEAcgB3AGUAdQBpAHcAZQB1AGkAVgBlAHIAcwBpAG8AbgAgADEALgAwAHcAZQB1AGkARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETAAZjaXJjbGUIZG93bmxvYWQEaW5mbwxzYWZlX3N1Y2Nlc3MJc2FmZV93YXJuB3N1Y2Nlc3MOc3VjY2Vzcy1jaXJjbGURc3VjY2Vzcy1uby1jaXJjbGUHd2FpdGluZw53YWl0aW5nLWNpcmNsZQR3YXJuC2luZm8tY2lyY2xlBmNhbmNlbAZzZWFyY2gFY2xlYXIEYmFjawZkZWxldGUAAAAA') format('truetype')}[class^=\"weui-icon-\"],[class*=\" weui-icon-\"]{display:inline-block;vertical-align:middle;font:normal normal normal 14px\/1 \"weui\";font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased}[class^=\"weui-icon-\"]:before,[class*=\" weui-icon-\"]:before{display:inline-block;margin-left:.2em;margin-right:.2em}.weui-icon-success-no-circle:before{content:\"\\EA08\"}.weui-toast{position:fixed;z-index:5000;width:7.6em;min-height:7.6em;top:180px;left:50%;margin-left:-3.8em;background:rgba(17,17,17,0.7);text-align:center;border-radius:5px;color:#fff}.weui-icon_toast{margin:22px 0 0;display:block}.weui-icon_toast.weui-icon-success-no-circle:before{color:#fff;font-size:55px}.weui-icon_toast.weui-loading{margin:30px 0 0;width:38px;height:38px;vertical-align:baseline}.weui-toast__content{margin:0 0 15px}.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}";
});
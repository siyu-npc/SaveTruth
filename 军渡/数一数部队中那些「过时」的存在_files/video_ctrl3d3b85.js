define("biz_wap/utils/localstorage.js",[],function(){
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
});define("new_video/player.js",["page/pages/video.css","biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","new_video/player.html.js","biz_wap/utils/device.js","new_video/ctl.js","biz_common/tmpl.js"],function(e,i,t,n){
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
});define("pages/report.js",["biz_wap/utils/ajax.js","pages/version4video.js"],function(e){
"use strict";
function i(e){
var i=["/mp/pagereport?type=","undefined"==typeof e.type?1:e.type,"&comment_id=",e.comment_id||"","&voiceid=",e.voiceid||"","&action=",e.action,"&__biz=",parent.window.biz||"","&mid=",parent.window.mid||"","&idx=",parent.window.idx||"","&scene=",e.scene||"","&uin=",parent.window.uin||"","&key=",parent.window.key||"","&pass_ticket=",parent.window.pass_ticket||"","&t=",Math.random(),"#wechat_redirect"].join(""),t=new Image;
t.src=i;
}
function t(e){
s({
type:"POST",
url:"/mp/videoreport?#wechat_redirect",
timeout:2e4,
async:!1,
data:e.data
});
}
function o(e){
for(var i=JSON.parse(JSON.stringify(e.data)),t=[],o=0,n=i.seek_position.length;n>o;o++){
var a=i.seek_position[o];
if(a&&a.length>0){
var d=a.join("#");
t.push(d||"");
}else t.push("");
}
i.seek_position=t;
for(var r=[],o=0,n=i.seek_loaded.length;n>o;o++){
var a=i.seek_loaded[o];
if(a&&a.length>0){
var d=a.join(",");
r.push(d||"");
}else r.push("");
}
i.seek_loaded=r;
for(var p=[],c=30;i.musicid.length>0;){
var a={};
for(var o in i)i.hasOwnProperty(o)&&("[object Array]"==Object.prototype.toString.call(i[o])?(a[o]=i[o].splice(0,c),
a[o]=a[o].join("mtitle"==o?";#":";")):a[o]=i[o]);
p.push(a);
}
for(var o=0;o<p.length;o++)s({
type:"POST",
url:"/mp/musicreport?#wechat_redirect",
timeout:2e4,
async:!0,
data:p[o]
});
}
function n(e){
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(parent.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&val=","undefined"!=typeof e.val?e.val:"","&val1=","undefined"!=typeof e.val1?e.val1:"","&vurl=",encodeURIComponent(e.vurl),"&t=",Math.random(),"&url=",t,"&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
function a(e){
if(3==e.step||6==e.step||1999==e.step){
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(parent.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=",e.step,"&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&loadwait=","undefined"!=typeof e.loadwait?e.loadwait:"","&val=","undefined"!=typeof e.val?e.val:"","&t=",Math.random(),"&url=",t,"undefined"!=typeof e.vt&&""!==e.vt&&6==e.step?"&vt="+e.vt:"","&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
}
function d(){
var e=_.device;
return e.ipad?60101:e.is_android_phone?60301:e.iphone?60401:e.is_android_tablet?60501:"";
}
function r(){
var e=_.device;
return e.ipad?"v4010":e.is_android_phone&&_.isUseProxy()?"v5060":e.is_android_phone?"v5060":e.iphone&&_.isUseProxy()?"v3060":e.iphone?"v3060":e.is_android_tablet?"v6010":"";
}
function p(e){
var i={
mid:window.mid||0,
__biz:window.biz||0,
idx:window.idx||0,
musicid:[],
hasended:[],
commentid:[],
scene_type:e.type||0,
mtitle:[],
detail_click:[],
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
errorcode:[],
seek:[],
seek_position:[],
duration2:[],
play_duration2:[],
play_last_time:[],
local_time:[],
seek_loaded:[]
};
return i;
}
function c(){
var e={
videoerror:0,
like_kv_vid:"",
like_click_vid:"",
like_kv_alginfo:"",
like_click_alginfo:"",
tad:"",
page:0,
like_click_type:0,
iplat:2,
ptype:1,
rtype:"",
getvinfo_ret:-1,
getvinfo_time:0,
v_err_code:0,
loadwait:0,
hasended:0,
last_ms:0,
duration_ms:0,
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
mid:"",
__biz:"",
idx:"",
detail_click:0,
vtitle:"",
vid:"",
commentid:"",
scene_type:"",
replay:0,
full_screen:0,
quick_play:0,
ad_play_time:-1,
video_play_time:-1,
click_play_button:0,
traceid:"",
webviewid:"",
orderid:0,
play_time:0,
client_time_when_play:0,
drag_times:"",
pause_num:0,
h5_profile:0,
to_article:0,
desc_more_click:0,
desc_more_show:0,
fromid:0,
openid:window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",
file_size:0,
rate:0,
resolution:0,
format:"",
vt:"",
video_ext:"unknown"
};
return e;
}
function l(e,i,t){
var o=0,n=[],a={};
if(i&&"[object String]"==Object.prototype.toString.call(i))o=1,"img"==t&&(i=encodeURIComponent(i)),
n.push("log0="+i),a.log0=i;else if(i&&"[object Array]"==Object.prototype.toString.call(i)){
o=i.length;
for(var d=0;o>d;d++){
var r="img"==t?encodeURIComponent(i[d]):i[d];
n.push("log"+d+"="+r),a["log"+d]=r;
}
}
if("img"==t){
var p=new Image,c="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e;
o>0&&(c+="&lc="+o+"&"+n.join("&")),c+="&t="+Math.random(),p.src=c;
}else{
var l={};
o>0&&(l=a),l.idkey=e,l.lc=o,s({
type:"POST",
url:"//mp.weixin.qq.com/mp/jsmonitor?",
timeout:1e4,
data:l,
dataType:"json"
});
}
}
var s=e("biz_wap/utils/ajax.js"),_=e("pages/version4video.js");
return{
report:i,
videoreport:t,
getPlatformType:d,
getsdtfrom:r,
getinfoReport:n,
qqvideo_common_report:a,
musicreport:o,
getMusicReportData:p,
getVideoReportData:c,
logReport:l
};
});define("pages/music_player.js",["biz_wap/utils/mmversion.js","pages/report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/version4video.js","biz_common/utils/monitor.js","appmsg/log.js"],function(t){
"use strict";
function e(){
b.hasInit||(b.hasInit=!0,p(),d(),u());
}
function o(t){
e(),this._o={
plugins:[],
protocal:"",
wxIndex:0,
type:0,
src:"",
jsapi2Src:"",
mid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:"",
musicbar_url:"",
fileSize:0,
onStatusChange:function(){},
onTimeupdate:function(){},
onError:function(){},
onUpdateSeekRange:function(){}
},this._extend(t),this._status=-1,this._g={
mutexKey:"",
jsapiSrcId:"",
hasCheckPlay:!1,
playTimeoutId:null,
stateChangeCallback:{},
_blockPlugin:{},
hasInitH5Event:!1,
h5Event:{},
totalPlayTime:0
},this._initPlugins(),this._fixAndroidSizeLimit(),0!==b.surportType&&(this._initData(),
this._synPlayStatus());
}
function i(t){
S.invoke("musicPlay",{
app_id:"a",
title:"微信公众平台",
singer:"微信公众平台",
epname:"微信公众平台",
coverImgUrl:"http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
dataUrl:b.ev,
lowbandUrl:b.ev,
webUrl:"http://mp.weixin.qq.com/s?"
},function(e){
"function"==typeof t&&t(e);
});
}
function a(t){
n({
cur:t,
stopCur:!1
});
}
function n(t){
function e(){
if(b.mutexCount==s&&(s=0,b.mutexCount=0,"function"==typeof a)){
var t=0;
1==b.surportType?t=2e3:3==b.surportType&&(t=0),setTimeout(function(){
a();
},t);
}
}
if(0!=b.mutexCount)return void setTimeout(function(){
n(t);
},200);
var o=t.cur,i=t.stopCur===!0?!0:!1,a=t.callback,s=0;
for(var r in b.mutexPlayers)for(var u=0,p=b.mutexPlayers[r].length;p>u;u++)s++;
for(var r in b.mutexPlayers)for(var u=0,p=b.mutexPlayers[r].length;p>u;u++){
var l=b.mutexPlayers[r][u];
if(l&&l!==o){
var c=l.getSurportType(),d="";
2!=c||1!=l._status&&4!=l._status?1!=c&&3!=c||1!=l._status&&2!=l._status&&4!=l._status||(d="stop"):d=l._o.allowPause?"pause":"stop",
d&&"function"==typeof l[d]?l[d](i,function(){
b.mutexCount++,e();
}):(b.mutexCount++,e());
}else b.mutexCount++,e();
}
}
function s(){
return b.surportType;
}
function r(t){
return new o(t);
}
function u(){
b.surportType>0&&b.isAndroidLow&&window.addEventListener("canplay",function(t){
t.target&&"function"==typeof t.target.play&&t.target.play();
},!0);
}
function p(){
b.jsapiGlobalEvent={
error:_,
pause:y,
stop:h,
play:g,
preempted:h,
waiting:f
};
}
function l(t){
return"&"+b.wxtag+"="+t;
}
function c(t,e){
e=e||"info";
var o="[musicplay]"+t+"[location:"+location.href+"]";
A(o,e);
}
function d(){
S.on("onBackgroundAudioStateChange",function(t){
if(!!b.debug&&console.log("onBackgroundAudioStateChange log:"+JSON.stringify(t||{})),
t.src&&t.state){
var e=P(b.wxtag,t.src)||"";
e&&(e=l(e));
var o=b.mutexPlayers[t.src]||b.mutexPlayers2[t.src]||b.mutexPlayers[e];
if(o){
var i;
if(t.srcId)for(var a=0,n=o.length;n>a;a++)o[a]._g.jsapiSrcId==t.srcId&&(i=o[a]);else if(1==o.length)i=o[0];else for(var a=0,n=o.length;n>a;a++)if(-1!=o[a]._status&&0!=o[a]._status&&3!=o[a]._status){
i=o[a];
break;
}
if(i&&i._g.stateChangeCallback){
var s=t.state;
"ended"==s&&(s="stop"),"wait"==s&&(s="waiting");
var r=!1,u=JSON.stringify(t||{});
if("error"==s){
i.jsapiLog("onBackgroundAudioStateChange error;res:"+u);
for(var p in i._g.stateChangeCallback)i._g.stateChangeCallback.hasOwnProperty(p)&&"function"==typeof i._g.stateChangeCallback[p]&&(r=!0,
i._g.stateChangeCallback[p](-1,t.errMsg||""),i._g.stateChangeCallback[p]=null);
}else"function"==typeof i._g.stateChangeCallback[s]&&(b.debug&&console.log("excute stateChangeCallback :"+s),
i.jsapiLog("onBackgroundAudioStateChange "+s+";res:"+u),r=!0,i._g.stateChangeCallback[s](0),
i._g.stateChangeCallback[s]=null);
r||"function"!=typeof b.jsapiGlobalEvent[s]||(i.jsapiLog("onBackgroundAudioStateChange "+s+" unHandle;res:"+u),
b.jsapiGlobalEvent[s](t,i));
}
}
}
});
}
function _(t,e){
e.stop(!1),e._trigger("jsapi2PlayingErr");
}
function h(t,e){
e.stop(!1),e._trigger("jsapi2PlayingStop");
}
function y(t,e){
e.pause(!1,null,!0),e._trigger("jsapi2PlayingPause");
}
function g(t,e){
1!=e._status&&e.resume(!1,null,!0);
}
function f(t,e){
e.onload();
}
function m(){
for(var t in b.mutexPlayers)if(b.mutexPlayers.hasOwnProperty(t))for(var e=0,o=b.mutexPlayers[t].length;o>e;e++){
var i=b.mutexPlayers[t][e];
if(i&&1==i._status&&(1==i._surportType||3==i._surportType)){
i._trigger("unloadPlaying");
break;
}
}
}
function P(t){
var e=arguments[1]||window.location.search,o=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),i=e.substr(e.indexOf("?")+1).match(o);
return null!=i?i[2]:"";
}
function T(t,e,o){
function i(t,e){
for(;b.synPlayStatusArr.length>0;){
var o=b.synPlayStatusArr.shift();
o&&"function"==typeof o[t]&&o[t](e);
}
}
b.synPlayStatusArr.push({
_t:t,
onSuccess:e,
onError:o
}),b.synPlayStatusId&&clearTimeout(b.synPlayStatusId),b.synPlayStatusId=setTimeout(function(){
t._jsapi_getMusicPlayerState({
onSuccess:function(t){
i("onSuccess",t);
},
onError:function(t){
i("onError",t);
}
});
},0);
}
var v=t("biz_wap/utils/mmversion.js"),S=(t("pages/report.js"),t("biz_common/dom/event.js"),
t("biz_wap/jsapi/core.js")),k=t("pages/version4video.js"),A=(t("biz_common/utils/monitor.js"),
t("appmsg/log.js")),b={
hasInit:!1,
synPlayStatusId:null,
synPlayStatusArr:[],
inWechat:!k.device.inWechat||k.device.inWindowWechat||k.device.inMacWechat?!1:!0,
mutexCount:0,
ev:0!=window._empty_v.indexOf(window.location.protocol)?"http:"+window._empty_v:window._empty_v,
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
_playtype:1*P("_playtype")||0,
isAndroidLow:/android\s2\.3/i.test(navigator.userAgent),
isAndroid:v.isAndroid,
surportType:"addEventListener"in window?2:0,
mutexPlayers:{},
mutexPlayers2:{},
wxtag:"__wxtag__"
};
return o.prototype._initPlugins=function(){
for(var t=this._o.plugins,e=0,o=t.length;o>e;++e){
var i=t[e];
i.setPlayer(this),!!i.init&&i.init();
}
},o.prototype._trigger=function(t,e){
var o=this._o,i=this._g,a=o.plugins,n=i._blockPlugin[t]||i._blockPlugin.all,s=0;
if(n&&"function"==typeof n.recv&&(s|=n.recv(t,e),1&s))return!1;
for(var r=0,u=a.length;u>r&&(s|=a[r].recv(t,e),!(2&s));++r);
if(!(4&s)){
var p=this["__"+t+"Handler"];
p&&p.call(this,e);
}
8&s||this.__triggerOutside(t,e);
},o.prototype.__triggerOutside=function(){
var t=arguments,e=t[0];
if(e){
e=e.substr(0,1).toUpperCase()+e.substr(1);
var o=this._o["on"+e];
"function"==typeof o&&o.apply(this,t);
}
},o.prototype._setBlockPlugin=function(t,e){
this._g._blockPlugin[t]=e;
},o.prototype._synPlayStatus=function(){
function t(t){
if(n&&clearTimeout(n),a.hasCheckPlay===!0)return void console.log("ios8 synPlayStatusSuccess hasCheckPlay");
if(a.hasCheckPlay=!0,o._surportType=3,b.surportType=3,!!b.debug&&console.log("_synPlayStatus mutexKey:"+a.mutexKey),
t.src&&(i.src==t.src||t.src.indexOf(a.mutexKey)>=0)){
if(t.srcId){
if(t.srcId!=a.jsapiSrcId)return;
}else if(b.mutexPlayers[a.mutexKey].length>1&&b.mutexPlayers[a.mutexKey][0]!==o)return;
o._initJsapiData({
curTime:t.currentTime,
bufferedPercent:t.bufferedPercent,
starTime:+new Date-1e3*t.currentTime
}),o._trigger("jsapi2Begin2Play",t);
var e=o.jsApiData,s="waiting"==t.playState||"seeked"==t.playState||"seeking"==t.playState||"play"==t.playState;
!t.paused||s?(o._onPlay(),o._analogUpdateTime()):(o._onTimeupdate(null,e.curTime),
o._onPause()),o._getMusicPlayerState();
}
}
function e(){
console.log("ios8 synPlayStatusError"),n&&clearTimeout(n),a.hasCheckPlay!==!0&&(a.hasCheckPlay=!0,
o._o.autoPlay&&o.play());
}
var o=this,i=this._o,a=this._g;
if(!b.inWechat||1*b._playtype>0)return a.hasCheckPlay=!0,void(o._o.autoPlay&&o.play());
var n;
T(o,t,e);
var s=+new Date;
console.log("starTime",s,i.syncTimeout),n=setTimeout(function(){
console.log("ios8 timeout error",+new Date-s),e();
},i.syncTimeout||1e4);
},o.prototype._fixAndroidSizeLimit=function(){
if(!(1*b._playtype>0)&&b.isAndroid){
var t=this._o;
!t.fileSize||t.fileSize>300||v.gtVersion("6.3.28",!0)||(this._trigger("androidForceH5"),
this._g._playtype=2);
}
},o.prototype._createAutoAndPlay=function(){
function t(){
e._trigger("h5Begin2Play"),e._h5Audio=document.createElement("audio"),e._initH5Data(!0),
e._H5bindEvent(!0),e._h5Audio.setAttribute("style","height:0;width:0;display:none"),
e._h5Audio.setAttribute("autoplay",""),e._status=0,e._onLoading(),b.isAndroidLow?(e._h5Audio.src=e._o.src,
document.body.appendChild(e._h5Audio),e._h5Audio.load()):(document.body.appendChild(e._h5Audio),
setTimeout(function(){
e._h5Audio.src=e._o.src,e._h5Audio.play();
},0)),e._surportType=2;
}
var e=this;
b.inWechat?this._stopJsapiPlay(!0,function(){
t();
}):t();
},o.prototype._destoryH5Audio=function(){
this._h5Audio&&(-1!=this._status&&"function"==typeof this._h5Audio.pause&&this._h5Audio.pause(),
document.body.removeChild(this._h5Audio),this._h5Audio=null,this._status=-1);
},o.prototype._onLoading=function(t){
this._status=4;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onPlay=function(t){
this._status=1;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._startCountTime();
},o.prototype._onPause=function(t){
this._status=2,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onEnd=function(t){
this._status=3,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onLoadedmetadata=function(t){
"function"==typeof this._o.onLoadedmetadata&&this._o.onLoadedmetadata.call(this,t||{});
},o.prototype._onUpdateSeekRange=function(t){
this.surportSeekRange()&&(t=Math.max(t,0),t=Math.min(t,100),"function"==typeof this._o.onUpdateSeekRange&&this._o.onUpdateSeekRange.call(this,t));
},o.prototype._onTimeupdate=function(t,e){
"function"==typeof this._o.onTimeupdate&&this._o.onTimeupdate.call(this,t||{},e),
e>0&&this._startCountTime();
},o.prototype._onError=function(t,e){
this._status=-1,"function"==typeof this._o.onError&&this._o.onError.call(this,t||{},e);
},o.prototype._initH5Event=function(){
var t=this,e=this._o,o=this._g;
if(!t._g.hasInitH5Event){
t._g.hasInitH5Event=!0;
var i=o.h5Event;
i.canplaythrough=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 canplaythrough"),t._h5Data.firstCanplaythrough=!0,
t._onPlay(e),t._onUpdateSeekRange(t._h5Data.downloadDuration||0));
},i.play=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),t._h5Data.firstCanplaythrough===!0&&(t._onPlay(e),
t._onUpdateSeekRange(t._h5Data.downloadDuration||0)));
},i.ended=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 ended"),t._onUpdateSeekRange(t._h5Data.downloadDuration),
t._onEnd(e));
},i.pause=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 pause"),t._o.allowPause!==!0||0==t._h5Audio.currentTime?t._onEnd(e):t._onPause(e));
},i.waiting=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e));
};
var a,n=100;
i.seeking=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e),
a=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),a=null,t._trigger("seekNeed2Load");
},n));
},i.seeked=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 seeked"),(1==t._status||2==t._status||4==t._status)&&(t._onPlay(e),
t._h5Audio.play()),a&&(clearTimeout(a),a=null,t._trigger("seekNotNeed2Load")));
},i.error=function(e){
var o=1*e.target.error.code||5;
(1>o||o>5)&&(o=5),t._trigger("h5Error",{
code:o
}),t._onError(e,{
type:1,
code:o
}),t._destoryH5Audio();
},i.timeupdate=function(o){
t._h5Audio&&((1==t._status||4==t._status)&&t._onUpdateSeekRange(t._getH5DownloadDuration()),
1==t._status&&t._onTimeupdate(o,t._h5Audio.currentTime),"undefined"!=typeof e.duration&&1*e.duration>0&&t._h5Audio.currentTime>=e.duration&&t._h5Stop());
},i.loadedmetadata=function(e){
t._h5Audio&&t._onLoadedmetadata(e);
};
}
},o.prototype._H5bindEvent=function(t){
var e=(this._o,this._g),o={
canplaythrough:"canplaythrough",
play:"play",
playing:"play",
ended:"ended",
pause:"pause",
seeking:"seeking",
waiting:"waiting",
seeked:"seeked",
error:"error"
};
try{
for(var i in o)o.hasOwnProperty(i)&&this._h5Audio.removeEventListener(i,e.h5Event[o[i]]);
this._h5Audio.removeEventListener("timeupdate",e.h5Event.timeupdate),this._h5Audio.removeEventListener("loadedmetadata",e.h5Event.loadedmetadata);
}catch(a){}
if(t){
for(var i in o)o.hasOwnProperty(i)&&this._h5Audio.addEventListener(i,e.h5Event[o[i]],!1);
"function"==typeof this._o.onTimeupdate&&this._h5Audio.addEventListener("timeupdate",e.h5Event.timeupdate,!1),
"function"==typeof this._o.onLoadedmetadata&&this._h5Audio.addEventListener("loadedmetadata",e.h5Event.loadedmetadata,!1);
}
},o.prototype._initData=function(){
var t=this._o;
this._createMutexKey(),b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this],
t.jsapi2Src&&t.jsapi2Src!=t.src&&(b.mutexPlayers2[t.jsapi2Src]?b.mutexPlayers2[t.jsapi2Src].push(this):b.mutexPlayers2[t.jsapi2Src]=[this]),
this._initH5Event();
},o.prototype._createMutexKey=function(){
var t=this._o.mid||"";
this._o.src?(this._g.mutexKey=this._o.src,this._g.jsapiSrcId=b.wxtag+"_"+this._o.wxIndex):(this._g.mutexKey=l(t),
this._g.jsapiSrcId=this._g.mutexKey+"_"+this._o.wxIndex);
},o.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},o.prototype._initH5Data=function(t){
this._h5Data={
firstCanplaythrough:t===!0?!1:!0,
downloadDuration:0,
lastPlaytime:null
};
},o.prototype._initJsapiData=function(t){
t=t||{},this.jsApiData&&(this.jsApiData.updateTimeoutId&&clearTimeout(this.jsApiData.updateTimeoutId),
this.jsApiData.getStatusId&&clearTimeout(this.jsApiData.getStatusId)),this.jsApiData={
getStatusId:null,
getStatusTime:t.getStatusTime||2500,
updateTimeoutId:null,
seeking:!1,
starTime:t.starTime||+new Date,
curTime:t.curTime||0,
bufferedPercent:t.bufferedPercent||0,
duration:this._o.duration||void 0,
lastPlaytime:null
};
},o.prototype._getMusicPlayerState=function(){
var t=this,e=t._o,o=t.jsApiData;
o&&o.getStatusId&&clearTimeout(o.getStatusId),t._jsapi_getMusicPlayerState({
onSuccess:function(i){
i.src==e.src&&(o.curTime=i.currentTime,o.starTime=+new Date-1e3*i.currentTime,o.bufferedPercent=i.bufferedPercent,
(1==t._status||2==t._status)&&(o.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},o.getStatusTime)),t._onUpdateSeekRange(o.bufferedPercent),1==i.paused&&1==t._status?(b.debug&&console.log("_getMusicPlayerState force syn"),
t._pauseJsapiPlay(!1)):0==i.paused&&2==t._status&&(b.debug&&console.log("_getMusicPlayerState force syn"),
t._resumeJsapiPlay(!1))),t._o.onMusicPlayerInfo&&t._o.onMusicPlayerInfo(i);
},
onError:function(){
o.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},o.getStatusTime);
}
});
},o.prototype._analogUpdateTime=function(){
var t=this,e=t.jsApiData;
if(e){
if(e.updateTimeoutId&&clearTimeout(e.updateTimeoutId),1==t._status){
if(e.curTime=1*((+new Date-e.starTime)/1e3).toFixed(2),e.curTime>=e.duration)return t._stopJsapiPlay(!1),
!0;
t._onTimeupdate(null,e.curTime);
}
return e.updateTimeoutId=setTimeout(function(){
t._analogUpdateTime();
},1e3),!1;
}
},o.prototype._jsapi_getMusicPlayerState=function(t){
var e=this._o;
S.invoke("getBackgroundAudioState",{},function(o){
if(!!b.debug&&console.log("getBackgroundAudioState log:"+JSON.stringify(o||{})),
/:ok$/.test(o.err_msg)){
if(o.paused=1*o.paused,o.currentTime=o.currentTime?(1*o.currentTime).toFixed(2):0,
o.buffered){
var i=Math.floor(o.buffered/e.duration*100);
i=Math.max(i,0),i=Math.min(i,100),o.bufferedPercent=i;
}else o.bufferedPercent=0;
"function"==typeof t.onSuccess&&t.onSuccess(o);
}else"function"==typeof t.onError&&(console.log("get err invoke err",o),t.onError(o));
});
},o.prototype._jsapi_musicPlay=function(t){
if(this._h5Audio&&this._destoryH5Audio(),2==b._playtype)return void("function"==typeof t.onError&&t.onError({}));
var e=this,o=this._o;
this.jsapiLog("jsapi_musicPlay"),S.invoke("musicPlay",{
app_id:"a",
title:o.title,
singer:o.singer,
epname:o.epname,
coverImgUrl:o.coverImgUrl,
dataUrl:o.src,
lowbandUrl:o.src,
webUrl:o.webUrl
},function(i){
!!b.debug&&console.log("playlog:"+JSON.stringify(i||{})),i.err_msg.indexOf("ok")>=0?(e._trigger("jsapi1Begin2Play"),
e._surportType=1,b.surportType=1,e._initJsapiData(),e._onPlay(),"undefined"!=typeof o.duration&&1*o.duration>0&&e._analogUpdateTime(),
e._onUpdateSeekRange(0),"function"==typeof t.onSuccess&&t.onSuccess(i)):"function"==typeof t.onError&&t.onError(i);
});
},o.prototype._jsapi_setBackgroundAudioState=function(t){
if(this._h5Audio&&this._destoryH5Audio(),console.log("_playtype",b._playtype),1*b._playtype>0){
if("function"==typeof t.onError){
var e={};
e.err_code=1,t.onError(e);
}
}else{
var o=this,i=this._o,a=o._g;
console.log("invoke set setBackgroundAudioState with param",i),this.jsapiLog("jsapi_setBackgroundAudioState"),
S.invoke("setBackgroundAudioState",{
protocol:i.protocal||"",
src:i.jsapi2Src||i.src,
lowbandUrl:i.jsapi2Src||i.src,
title:i.title,
epname:i.epname,
singer:i.singer,
srcId:a.jsapiSrcId,
coverImgUrl:i.coverImgUrl,
webUrl:i.webUrl,
musicbar_url:i.musicbar_url||""
},function(e){
!!b.debug&&console.log("setBackgroundAudioState log:"+JSON.stringify(e||{})),e.err_msg.indexOf("ok")>=0?("function"==typeof t.onSuccess&&t.onSuccess("waiting"),
a.stateChangeCallback.play=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("play"):0!=e&&"function"==typeof t.onError&&t.onError({
err_code:2,
err_msg:o||""
});
}):"function"==typeof t.onError&&(e=e||{},e.err_code=1,t.onError(e));
});
}
},o.prototype._jsapi_operateBackgroundAudio=function(t){
var e=this,o=(this._o,e._g),i=1*t.position||0;
this.jsapiLog("jsapi_operateBackgroundAudio;param:"+JSON.stringify(t||{})),S.invoke("operateBackgroundAudio",{
operationType:t.type,
currentTime:i
},function(e){
if(!!b.debug&&console.log("operateBackgroundAudio "+t.type+",position:"+i+", log:"+JSON.stringify(e||{})),
e.err_msg.indexOf("ok")>=0){
var a=t.type;
"seek"==a?(o.stateChangeCallback.seeking=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeking",i):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
},o.stateChangeCallback.seeked=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeked",i):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
}):o.stateChangeCallback[a]=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess():0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
};
}else"function"==typeof t.onError&&t.onError(e);
});
},o.prototype._jsapiPlay=function(){
{
var t=this;
this._o;
}
console.log("supporttype",b.surportType),1==b.surportType?this._jsapi_musicPlay({
onError:function(){
t._h5Play();
}
}):this._jsapi_setBackgroundAudioState({
onSuccess:function(e){
"waiting"===e?(t._trigger("jsapi2Begin2Play",e),t._initJsapiData(),t._surportType=3,
b.surportType=3,t._onLoading()):"play"===e&&(t._initJsapiData(),t._onPlay(),t._analogUpdateTime(),
t._getMusicPlayerState(),t._trigger("jsapi2PlaySuccess"));
},
onError:function(e){
e&&1==e.err_code?t._jsapi_musicPlay({
onError:function(){
t._h5Play();
}
}):(t._h5Play(),t._trigger("jsapi2Begin2PlayErr"));
}
});
},o.prototype._getJsapiDownloadSec=function(){
this._getMusicPlayerState();
var t=Math.floor(this._o.duration*this.jsApiData.bufferedPercent/100);
return!!b.debug&&console.log("downloadSec:"+t),t;
},o.prototype._jsapiSeek=function(t){
function e(){
a.seeking=!1,o._onPlay(),console.log("seek toPlay position is",b.seekingPosition),
a.starTime=+new Date-1e3*b.seekingPosition,o._analogUpdateTime(),o._getMusicPlayerState();
}
var o=this,i=this._g,a=(this._o,this.jsApiData),n=parseInt(t,10);
this._o.duration&&n>=this._o.duration&&(n=this._o.duration-1),a.getStatusId&&clearTimeout(a.getStatusId),
a.updateTimeoutId&&clearTimeout(a.updateTimeoutId),a.seekWaitId&&clearTimeout(a.seekWaitId),
a.seeking=!0;
var s,r,u=100;
b.seekingPosition=n,console.log("begin to seek to",n),this._jsapi_operateBackgroundAudio({
type:"seek",
position:n,
onError:function(){
o._trigger("seekErr"),!!b.debug&&console.log("seek callback fail"),a.seeking=!1,
o._analogUpdateTime(),o._getMusicPlayerState();
},
onSuccess:function(t,n){
console.log("jsapi seek res is ",t),"seeking"==t?(!!b.debug&&console.log("seeking callback success"),
a.seeking=!0,o._onLoading(),i.stateChangeCallback.play=function(){
!!b.debug&&console.log("seeked to play"),s&&clearTimeout(s),e(n);
},r=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),r=null,o._trigger("seekNeed2Load");
},u)):"seeked"==t&&(!!b.debug&&console.log("seeked callback success"),(2==o._status||4==o._status)&&v.cpVersion("6.6.0",-1)&&(s=setTimeout(function(){
!!b.debug&&console.log("setTimeout to play"),i.stateChangeCallback.play=null,o._resumeJsapiPlay(!0);
},1e3)),r&&(clearTimeout(r),r=null,o._trigger("seekNotNeed2Load")));
}
}),o._getMusicPlayerState();
},o.prototype._resumeJsapiPlay=function(t,e){
function o(t){
var e=i.jsApiData;
e.starTime=+new Date-1e3*e.curTime,i._onPlay(),i._analogUpdateTime(),i._getMusicPlayerState(),
"function"==typeof t&&t();
}
var i=this;
1==this._surportType?this._jsapiPlay():3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"play",
onError:function(){
i._stopJsapiPlay(!1,function(){
i.play();
});
},
onSuccess:function(){
o(e);
}
}):o(e));
},o.prototype._pauseJsapiPlay=function(t,e,o){
function i(t){
var e=a.jsApiData;
a._analogUpdateTime(),a._getMusicPlayerState(),e&&e.updateTimeoutId&&clearTimeout(e.updateTimeoutId),
e.updateTimeoutId=null,t===!0&&e&&e.getStatusId&&clearTimeout(e.getStatusId),1==a._status&&a._onPause();
}
var a=this;
return 2==a._status?(i(e),void("function"==typeof o&&o())):void(1==this._surportType?this._stopJsapiPlay(t,o):3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"pause",
onSuccess:function(){
i(e),"function"==typeof o&&o();
},
onError:function(){
a._stopJsapiPlay(!0,o);
}
}):(i(e),"function"==typeof o&&o())));
},o.prototype._stopJsapiPlay=function(t,e){
function o(t){
a._onTimeupdate(null,0),a._onUpdateSeekRange(0),a._onEnd(),a._initJsapiData(),"function"==typeof t&&t();
}
{
var a=this;
a.jsApiData;
}
t?1==a._surportType?i(function(){
o(e);
}):a._jsapi_operateBackgroundAudio({
type:"stop",
onSuccess:function(){
o(e);
},
onError:function(){
o(e);
}
}):o(e);
},o.prototype._getH5DownloadSec=function(){
var t=Math.floor(this._o.duration*this._getH5DownloadDuration()/100);
return!!b.debug&&console.log("h5 downloadSec:"+t),t;
},o.prototype._getH5DownloadDuration=function(){
if(!this._h5Audio)return 0;
if(this._h5Data.downloadDuration>=100)return 100;
var t=this._h5Audio.buffered,e=t.end(t.length-1);
return this._h5Data.downloadDuration=parseInt(e/this._o.duration*100,10),this._h5Data.downloadDuration;
},o.prototype._h5Play=function(){
0!==b.surportType&&(this.jsapiLog("h5Play"),this._h5Audio?(this._h5Audio.ended||this._h5Audio.paused)&&(this._trigger("h5Begin2Play"),
this._initH5Data(),this._onLoading(),this._H5bindEvent(!0),this._h5Audio.currentTime=0):this._createAutoAndPlay());
},o.prototype._h5Resume=function(){
this._h5Audio&&this._h5Audio.play();
},o.prototype._h5Stop=function(){
this._h5Audio&&(this._onUpdateSeekRange(0),this._onEnd(),this._H5bindEvent(!1),this._h5Audio.pause(),
this._h5Audio.currentTime=0,this._initH5Data());
},o.prototype._h5Seek=function(t){
if(this._h5Audio){
var e=(this._h5Data,parseInt(t,10));
e=Math.min(e,this._o.duration),!!b.debug&&console.log("h5 seek position:"+e),this._h5Audio.currentTime=e;
}
},o.prototype._startCountTime=function(){
1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio&&this._h5Data&&null===this._h5Data.lastPlaytime&&(this._h5Data.lastPlaytime=this._h5Audio.currentTime):null===this.jsApiData.lastPlaytime&&(this.jsApiData.lastPlaytime=this.jsApiData.curTime);
},o.prototype._endCountTime=function(){
if(1!=this._surportType&&3!=this._surportType||!this.jsApiData){
if(this._h5Audio&&this._h5Data){
var t=this._h5Audio,e=this._h5Data;
t.currentTime>0&&t.currentTime>e.lastPlaytime&&null!==e.lastPlaytime&&(this._g.totalPlayTime+=t.currentTime-e.lastPlaytime),
e.lastPlaytime=null;
}
}else{
var o=this.jsApiData;
o.curTime>0&&o.curTime>o.lastPlaytime&&null!==o.lastPlaytime&&(this._g.totalPlayTime+=o.curTime-o.lastPlaytime),
o.lastPlaytime=null;
}
},o.prototype._delMutexPlayers=function(){
var t=this._o,e=this._g.mutexKey,o=b.mutexPlayers[e];
if(o){
for(var i=0,a=o.length;a>i;i++)if(o[i]===this){
o.splice(i,1);
break;
}
if(0==o.length)try{
delete b.mutexPlayers[e];
}catch(n){}
}
if(t.jsapi2Src&&b.mutexPlayers2[t.jsapi2Src]){
for(var s=b.mutexPlayers2[t.jsapi2Src],i=0,a=s.length;a>i;i++)if(s[i]===this){
s.splice(i,1);
break;
}
if(0==s.length)try{
delete b.mutexPlayers2[t.jsapi2Src];
}catch(n){}
}
},o.prototype.resetPlayTotalTime=function(){
this._g.totalPlayTime=0;
},o.prototype.getPlayTotalTime=function(){
return this._endCountTime(),this._g.totalPlayTime;
},o.prototype.surportSeekRange=function(){
return 1==b._playtype?!1:2==this._surportType||3==this._surportType?!0:!1;
},o.prototype.setSrc=function(t){
-1==t.indexOf("?")&&(t+="?"),t+=l(this._o.mid),this._o.src=t,this._delMutexPlayers(),
this._g.mutexKey=this._o.src,b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this];
},o.prototype.getSrc=function(){
return this._o.src||"";
},o.prototype.setDuration=function(t){
this._o.duration=t||0;
},o.prototype.getSurportType=function(){
return this._surportType||0;
},o.prototype.getPlayStatus=function(){
return this._status;
},o.prototype.getCurTime=function(){
return 1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio?this._h5Audio.currentTime:0:this.jsApiData.curTime||0;
},o.prototype.getDuration=function(){
return this._o.duration||void 0;
},o.prototype.pause=function(t,e,o){
return o===!0||this._o.allowPause?void(1==this._surportType||3==this._surportType?this._pauseJsapiPlay(t===!1?!1:!0,!1,function(){
"function"==typeof e&&e();
},function(){
"function"==typeof e&&e();
}):2==this._surportType&&this._h5Audio&&"function"==typeof this._h5Audio.pause&&(this._h5Audio.pause(),
"function"==typeof e&&e())):void this.stop(t,e);
},o.prototype.stop=function(t,e){
return 1==this._surportType||3==this._surportType?void this._stopJsapiPlay(t===!1?!1:!0,e):(2==this._surportType&&this._h5Audio&&this._h5Stop(),
void("function"==typeof e&&e()));
},o.prototype.destory=function(){
this.stop(),this._h5Audio&&(document.body.removeChild(this._h5Audio),this._h5Audio=null),
this._delMutexPlayers();
},o.prototype.resume=function(t,e,o){
(o===!0||2==this._status&&this._o.allowPause)&&(2==this._surportType&&this._h5Audio?this._h5Resume():b.inWechat&&this._resumeJsapiPlay(t===!1?!1:!0));
},o.prototype.onload=function(){
this._onLoading();
},o.prototype.jsapiLog=function(t,e){
try{
var o=this._o,i={
type:o.type,
src:o.src,
mid:o.mid,
protocal:o.protocal,
webUrl:o.webUrl,
musicbar_url:o.musicbar_url
},a="["+JSON.stringify(i)+"]"+t;
c(a,e);
}catch(n){}
},o.prototype.play=function(){
var t=this,e=this._g;
if(t._o.src)return console.log("before play status is",t._status,e.hasCheckPlay),
2==t._status&&t._o.allowPause?void t.resume():(e.playTimeoutId&&clearTimeout(e.playTimeoutId),
e.hasCheckPlay?void(b.inWechat?(console.log("jsapi play"),this._jsapiPlay()):0!=b.surportType&&this._h5Play()):void(e.playTimeoutId=setTimeout(function(){
t.play();
},1e3)));
},o.prototype.seek=function(t){
{
var e=this;
this._g;
}
return 1!=e._status&&2!=e._status?void console.log("player status is",e._status):(console.log("support type is",this._surportType,t),
3==this._surportType?(this._endCountTime(),void this._jsapiSeek(t)):2==this._surportType&&this._h5Audio?(this._endCountTime(),
void this._h5Seek(t)):void 0);
},o.prototype.getBackgroundAudioState=function(t){
t||(t={}),S.invoke("getBackgroundAudioState",{},function(e){
/:ok$/.test(e.err_msg)?(e.paused=1*e.paused,t.success&&t.success(e)):t.error&&t.error(e);
});
},o.prototype.setOption=function(t){
this._extend(t),t.duration&&this.jsApiData&&(this.jsApiData.duration=t.duration);
},{
init:r,
triggerUnloadPlaying:m,
isAndroid:b.isAndroid,
getSurportType:s,
getQuery:P
};
});define("pages/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=t.win||window,r=o.document,a=r.createElement("script"),i=t.type||"JSONP",d=r.head||r.getElementsByTagName("head")[0]||r.documentElement,l=t.callbackName,c="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,s="undefined"==typeof t.timeoutCode?500:t.timeoutCode,f="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,m=!1,p=null;
"JSONP"!=i&&"JS"!=i&&(i="JSONP");
var y="";
y="JSONP"==i?t.url+"&t="+Math.random():t.url;
var h=function(e){
a&&!m&&(m=!0,p&&(clearTimeout(p),p=null),a.onload=a.onreadystatechange=a.onerror=null,
d&&a.parentNode&&d.removeChild(a),a=null,l&&-1==l.indexOf(".")&&(window[l]=null),
"JS"==i&&e==u&&"loaded"==c&&"function"==typeof t.callback?t.callback():e!=u&&"loaded"!=c&&"function"==typeof t.onerror&&t.onerror(e));
};
if(l&&"function"==typeof t.callback&&"JSONP"==i){
var w=l;
-1==l.indexOf(".")&&(l=window[l]?l+e.counter++:l,window[l]=function(){
c="loaded",t.callback.apply(null,arguments);
}),y=y.replace("="+w,"="+l);
}
a.onload=a.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&("JS"==i&&(c="loaded"),
h("loaded"==c?u:f));
},a.onerror=function(){
return n>0?(t.retry=n-1,p&&(clearTimeout(p),p=null),void e(t)):void h(f);
},t.timeout&&(p=setTimeout(function(){
h(s);
},parseInt(t.timeout,10))),c="loading",a.charset="utf-8",setTimeout(function(){
a.src=y;
try{
d.insertBefore(a,d.lastChild);
}catch(e){}
},0);
}
return e;
});define("biz_wap/utils/ajax_load_js.js",["biz_wap/utils/ajax.js","biz_wap/utils/localstorage.js"],function(e){
"use strict";
function n(e){
var n=d(e.url,e.version),o=function(){},i=function(){};
if("function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(i=e.onError),
c(e.win,n))return void o({
code:1,
queueIndex:0
});
if(e.useCache){
var a=u(e.url,e.version);
if(a&&t({
win:e.win,
funcStr:a,
useCache:!1,
url:e.url,
version:e.version
}),c(e.win,n))return void o({
code:2,
queueIndex:0
});
}
if(S.callbackQueue.push({
options:e,
onSuccess:o,
onError:i
}),"undefined"==typeof S.jsLoadState[n]&&(S.jsLoadState[n]=-1),-1==S.jsLoadState[n]){
var s=e.url;
s+=-1==s.indexOf("?")?"?"+S.customerParam+"="+e.version:"&"+S.customerParam+"="+e.version,
r({
originUrl:e.url,
version:e.version,
url:s,
key:n
});
}
}
function r(e){
S.jsLoadState[e.key]=1,w({
url:e.url,
notJoinUrl:!0,
timeout:1e4,
type:"POST",
dataType:"text",
noXRequestedWidthHeader:!0,
success:function(n){
if(1==S.jsLoadState[e.key]){
S.jsLoadState[e.key]=-1;
var r=!0;
r=n?t({
win:null,
funcStr:n,
useCache:!0,
url:e.originUrl,
version:e.version
}):!1,o(r?{
code:3,
type:"suc",
funcStr:n
}:{
code:51,
type:"err"
});
}
},
error:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:52,
type:"err"
}));
},
complete:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:53,
type:"err"
}));
}
});
}
function t(e){
var n=e.win||window,r=!0;
try{
n.eval(e.funcStr),r=!0;
}catch(t){
r=!1;
}
return r?(s({
url:e.url,
version:e.version,
win:n
}),e.useCache&&a(e.url,e.version,e.funcStr),!0):(l({
url:e.url,
version:e.version,
win:n
}),i(e.url),!1);
}
function o(e){
for(var n=0,r=S.callbackQueue.length;r>n;n++){
var o=S.callbackQueue[n],u=o.options,i=u.win,a=d(u.url,u.version);
"suc"==e.type?(e.funcStr&&!c(i,a)&&t({
win:i,
funcStr:e.funcStr,
useCache:!1,
url:u.url,
version:u.version
}),o.onSuccess({
code:e.code,
queueIndex:n
})):o.onError({
code:e.code,
queueIndex:n
});
}
S.callbackQueue=[];
}
function u(e,n){
var r=f(e),t=y.get(r);
if(!t)return null;
var o;
try{
o=JSON.parse(t);
}catch(u){}
if(o){
var a=+new Date,c=1*o.time;
return a-c>S.lsTimeout||o.version!=n||!o.func?(i(e),null):o.func;
}
}
function i(e){
var n=f(e);
y.remove(n);
}
function a(e,n,r){
var t={
version:n,
func:r,
time:+new Date
},o=f(e);
try{
y.set(o,JSON.stringify(t));
}catch(u){}
}
function c(e,n){
return e=e||window,e[S.winCacheKey]&&e[S.winCacheKey][n]&&e[S.winCacheKey][n].state===!0?!0:!1;
}
function s(e){
var n=d(e.url,e.version),r=e.win||window;
r[S.winCacheKey]||(r[S.winCacheKey]={}),r[S.winCacheKey][n]||(r[S.winCacheKey][n]={}),
r[S.winCacheKey][n].state=!0;
}
function l(e){
var n=d(e.url,e.version),r=e.win||window;
if(r[S.winCacheKey]&&r[S.winCacheKey][n])try{
delete r[S.winCacheKey][n];
}catch(t){}
}
function f(e){
return encodeURIComponent(e);
}
function d(e,n){
return encodeURIComponent(e)+"_"+n||"";
}
function v(e){
l(e),i(e.url);
}
var w=e("biz_wap/utils/ajax.js"),y=e("biz_wap/utils/localstorage.js"),S={
jsLoadState:{},
winCacheKey:"__loadExternalJsStates__",
lsTimeout:1728e5,
customerParam:"wxv",
callbackQueue:[]
};
return{
ClearCache:v,
Load:n
};
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
var O=null,A=!0,M=!1;
if(_.isAndroid&&_.gtVersion("6.6.6",!0)&&(M=!0),T){
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
var P=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,S=document.documentElement.clientHeight||window.innerHeight;
if(_.isAndroid)if(u.offsetTop>P&&u.offsetTop<P+S)window.__video_report_data.auto_play=0;else{
var U=function(){
k.__beginPlayHandler(),a.off(window,"touchstart",U),M=!0;
};
a.on(window,"touchstart",U);
}
var C=function(){
if(3==window.__video_report_data.play_type)return void a.off(window,"scroll",C);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(P=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
S=document.documentElement.clientHeight||window.innerHeight,k.isPlay()&&(u.offsetTop>P+S||u.offsetTop+u.offsetHeight<P))k.pause();else if(!k.isPlay()&&!(u.offsetTop>P+S||u.offsetTop+u.offsetHeight<P)){
if(_.isAndroid&&!M)return;
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
});define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
n("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function o(e){
var o=e.url||"";
o=o.replace(/&amp;/g,"&");
var a=o.indexOf("?"),n=0;
(119==e.pt||120==e.pt)&&(n=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
o.indexOf("?")>=0?o=o.slice(0,a)+".html"+o.slice(a):o+=".html";
var r="",p="";
if(document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(r=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
"undefined"==typeof c){
var c;
c=window.cgiData&&window.cgiData.__biz?window.cgiData.__biz:window.parent.biz;
}
p=e.traceid+":"+r+":"+c+":"+e.aid+":"+e.pos_type,console.log("sceneNote",p);
var m={
scene:1067,
sceneNote:p,
userName:e.weapp_info.original_id+"@app",
relativeURL:o,
appVersion:1
},s=!1,d=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(d){
var _=Number(d[1]),g=Number(d[2]),l=Number(d[3]);
_>6?s=!0:6===_&&g>5?s=!0:6===_&&5===g&&l>=3&&(s=!0);
}
return console.log("canJumpOnTap : ",s,e.weapp_info.original_id,navigator.userAgent),
s?void t.invoke("openWeApp",m,function(o){
"openWeApp:ok"===o.err_msg&&i(125+n,e.report_param),"system:function_not_exist"===o.err_msg&&(location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect",
i(126+n,e.report_param));
}):(location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect",
void i(126+n,e.report_param));
}
function a(e){
t.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(e){
console.log(e);
});
}
{
var t=e("biz_wap/jsapi/core.js"),n=e("biz_common/utils/report.js");
e("biz_wap/utils/mmversion.js");
}
return{
openWxopen:o,
startConnect:a
};
});define("a/a_report.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","appmsg/log.js"],function(o){
"use strict";
function e(o,e){
var a="https:"==location.protocol?1500:1200,_="/mp/advertisement_report?r="+Math.random()+"&ascene="+encodeURIComponent(window.ascene||-1)+"&",d=[],c=!1;
for(var u in o)o.hasOwnProperty(u)&&d.push(u+"="+o[u]);
var l=2;
1==window.__ad_has_exposure&&(l=1),d.push("has_exposure="+l),_+=d.join("&");
var w="trace_id="+o.tid+"&product_type="+o.pt+"&jump_url="+o.url+"&logtype=3&url="+encodeURIComponent(location.href)+"&rl="+o.rl;
o.tid&&p.gtVersion("6.3.22",!0)&&i.invoke("adDataReport",{
ad_info:w,
need_record_page_operation:1
},function(){}),s("[Ad report] url="+_),2==l&&window.__addIdKeyReport("68064",0),
window.__ad_test_exposure||window.__addIdKeyReport("68064",7),t({
url:_,
mayAbort:!0,
type:"GET",
success:function(){
r&&r(56+n);
},
error:function(){
r&&r(57+n);
},
complete:function(){
c||(c=!0,!!e&&e());
},
async:!0
}),setTimeout(function(){
c||(c=!0,window.__ajaxtest="1",!!e&&e());
},a);
}
var t=o("biz_wap/utils/ajax.js"),r=window.__report,a=location.protocol,n="https:"==a?5:0,i=o("biz_wap/jsapi/core.js"),p=o("biz_wap/utils/mmversion.js"),s=o("appmsg/log.js");
return{
AdClickReport:e
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
});define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","pages/player_adaptor.js","biz_common/dom/class.js","pages/report.js","biz_common/utils/monitor.js","pages/music_report_conf.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e,t,a,o){
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
for(var e in C.reportData)x.musicreport({
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
t.count>0&&w.setSum(t.id,t.key,t.count);
}
w.send();
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
var f=e("biz_common/dom/event.js"),h=e("biz_common/tmpl.js"),D=e("pages/music_player.js"),v=e("pages/player_adaptor.js"),k=e("biz_common/dom/class.js"),x=e("pages/report.js"),w=e("biz_common/utils/monitor.js"),I=e("pages/music_report_conf.js"),C={
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
"undefined"==typeof C.reportData[e.type]&&(C.reportData[e.type]=x.getMusicReportData(e),
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
D.isAndroid?(x.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_1",1)):(x.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_1",1));
}
},t.onJsapi2PlayingErr=function(){
if(l(a+"_wx_err_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_ing_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(x.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_2",1)):(x.logReport("",e.replace("#type#","ios"),"ajax"),
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
D.isAndroid?(x.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_3",1)):(x.logReport("",e.replace("#type#","ios"),"ajax"),
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
window.location.href=t.detailUrl):("m"==a.tag||"k"==a.tag)&&C.adapter[a.tag].getPlayUrl(t,{
callback:function(e){
e.canplay?(C.reportData[t.type].detail_click[a.posIndex]=1,window.location.href=t.detailUrl):e.msg&&setTimeout(function(){
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
x.report({
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
x.report({
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
});define("new_video/ctl.js",["biz_wap/utils/ajax.js"],function(e){
"use strict";
var i;
if(parent==window)i=window;else try{
{
parent.window.location.href;
}
i=parent.window;
}catch(t){
i=window;
}
var r=i.user_uin,n=Math.floor(i.user_uin/100)%20;
r||(n=-1);
var a=function(){
return n>=0;
};
i.__webviewid||(i.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var d=function(){
var e=i.mid,t=i.idx,n="";
n=e&&t?e+"_"+t:"";
var a=i.__webviewid,d=[r,n,a].join("_");
return d;
},o=function(i){
if(20>n)try{
var t=i.vid||"",r={};
r.__biz=parent.window.biz||"",r.vid=t,r.clienttime=+new Date;
var o=parent.window.mid,w=parent.window.idx,_="";
o&&w?(r.type=1,_=o+"_"+w):(r.type=2,_=t),r.id=_,r.webviewid=d(),r.step=i.step||0,
r.orderid=i.orderid||0,r.ad_source=i.ad_source||0,r.traceid=i.traceid||0,r.ext1=i.ext1||"",
r.ext2=i.ext2||"",r.r=Math.random(),r.devicetype=parent.window.devicetype,r.version=parent.window.clientversion,
r.is_gray=a()?1:0;
var c=e("biz_wap/utils/ajax.js");
c({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:r
});
}catch(v){}
};
return{
report:o,
getWebviewid:d,
showAd:a
};
});define("pages/create_txv.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax_load_js.js","pages/loadscript.js"],function(e){
"use strict";
function n(){
"function"!=typeof window.__createTxVideo&&(window.__createTxVideo=function(e){
o(e);
});
}
function o(e){
var n=function(){},o=function(){};
"function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(n=e.onError),
r.Load({
url:c.jsUrl,
version:c.jsVersion,
useCache:!0,
win:e.win,
onSuccess:function(s){
2!=s.code&&3!=s.code||0!=s.queueIndex||(i.setSum("64728","111",1),i.setSum("64728","112",1));
var u=e.win||window,a=!0;
if(u.Txp&&"function"==typeof u.Txp.Player?(a=!0,0==s.queueIndex&&(2==s.code?i.setSum("64728","116",1):3==s.code&&i.setSum("64728","117",1),
i.send())):(a=!1,0==s.queueIndex&&(2==s.code?i.setSum("64728","114",1):3==s.code&&i.setSum("64728","115",1),
i.send())),a){
var d=t({
win:u,
options:e
});
o({
player:d
});
}else r.ClearCache({
win:u,
version:c.jsVersion,
url:c.jsUrl
}),n();
},
onError:function(n){
0==n.queueIndex&&(i.setSum("64728","111",1),i.setSum("64728","118",1),51==n.code?i.setSum("64728","119",1):52==n.code?i.setSum("64728","120",1):53==n.code&&i.setSum("64728","121",1),
i.send()),s(e);
}
});
}
function t(e){
var n=e.win||window,o=e.options,t=new n.Txp.Player({
containerId:o.containerId,
vid:o.vid,
width:o.width,
height:o.height,
autoplay:o.autoplay===!0?!0:!1,
allowFullScreen:o.allowFullScreen===!0?!0:!1
});
return t;
}
function s(e){
var n=function(){},o=function(){};
"function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(n=e.onError);
var s=c.jsUrl;
s+=-1==s.indexOf("?")?"?"+c.customerParam+"="+c.jsVersion:"&"+c.customerParam+"="+c.jsVersion,
u({
win:e.win,
url:s,
timeout:1e4,
type:"JS",
callback:function(){
i.setSum("64728","122",1);
var s=e.win||window;
if(s.Txp&&"function"==typeof s.Txp.Player){
i.setSum("64728","124",1),i.send();
var r=t({
win:e.win,
options:e
});
o({
player:r
});
}else i.setSum("64728","123",1),i.send(),n();
},
onerror:function(e){
switch(i.setSum("64728","122",1),1*e){
case 400:
c.jsLoadState=4,i.setSum("64728","125",1);
break;

case 500:
c.jsLoadState=5,i.setSum("64728","126",1);
break;

default:
c.jsLoadState=6,i.setSum("64728","127",1);
}
i.send(),n();
}
});
}
var i=e("biz_common/utils/monitor.js"),r=e("biz_wap/utils/ajax_load_js.js"),u=e("pages/loadscript.js"),c={
customerParam:"wxv",
jsUrl:"//vm.gtimg.cn/tencentvideo/txp/js/iframe/api.js?",
jsVersion:"v1"
};
return n(),{
createTxVideo:o
};
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+r.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function n(){
return-1!=s.indexOf("&_newvideoplayer=0")?!1:-1!=s.indexOf("&_newvideoplayer=1")?!0:1!=r.is_login?!1:r.use_tx_video_player?!1:w.canSupportVideo&&u.inWechat?u.is_ios||u.is_android?!0:!1:(r._hasReportCanSupportVideo||w.canSupportVideo||!u.inWechat||(r._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function o(){
{
var e=s,i=window.location.href;
r.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=r.sn&&"f62e1cb98630008303667f77c17c43d7"!=r.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=r.sn?-1!=e.indexOf("&_videoad=1")?!0:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:"54"==r.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:r.__appmsgCgiData&&r.__appmsgCgiData.can_use_page&&(u.is_ios||u.is_android)?!0:c.showAd()?!0:!1:!1;
}
function t(){
var e=s;
if(!r.user_uin)return!1;
if(-1!=e.indexOf("&_proxy=1"))return!0;
if(-1!=e.indexOf("&_proxy=0"))return!1;
if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show"))return!1;
var i=(new Date).getHours();
return i>=9&&14>=i?!1:u.inWechat&&u.is_android&&u.is_x5&&u.wechatVer>="6.2.2"?!0:u.inWechat&&u.is_android&&u.is_xweb&&u.xweb_version>=16?!0:u.inWechat&&u.is_ios&&(-1!=_.indexOf("MicroMessenger/6.2.4")||u.wechatVer>="6.2.4")?!0:!1;
}
function a(){
return f.networkType;
}
var r,s,d=e("biz_common/dom/event.js"),p=e("biz_wap/jsapi/core.js"),w=e("biz_wap/utils/device.js"),c=e("new_video/ctl.js"),_=window.navigator.userAgent,f={
networkType:""
},u={};
if(parent==window)r=window,s=window.location.href;else try{
s=parent.window.location.href,r=parent.window;
}catch(h){
s=window.location.href,r=window;
}
return function(e){
var i=w.os;
u.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),u.is_android=!!i.android,u.is_wp=!!i.phone,
u.is_pc=!(i.phone||!i.Mac&&!i.windows),u.inWechat=/MicroMessenger/.test(e),u.inWindowWechat=/WindowsWechat/i.test(e),
u.inMacWechat=/wechat.*mac os/i.test(e),u.is_android_phone=u.is_android&&/Mobile/i.test(e),
u.is_android_tablet=u.is_android&&!/Mobile/i.test(e),u.ipad=/iPad/i.test(e),u.iphone=!u.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
u.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var n,o=/XWEB\/([\d\.]+)/i,t=e.match(o);
t&&t[1]&&(n=parseInt(t[1])),u.is_xweb=!!t,u.xweb_version=n;
var a=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
u.wechatVer=a&&a[1]||0,d.on(window,"load",function(){
if(""==f.networkType&&u.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
p.invoke("getNetworkType",{},function(i){
f.networkType=e[i.err_msg]||"fail";
});
}
},!1);
}(window.navigator.userAgent),"undefined"==typeof r._hasReportCanSupportVideo&&(r._hasReportCanSupportVideo=!1),
{
device:u,
isShowMpVideo:n,
isUseProxy:t,
isUseAd:o,
getNetworkType:a
};
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","appmsg/cdn_img_lib.js","a/profile.js","a/android.js","a/ios.js","a/app_card.js","a/sponsor.js","a/video.js"],function(require,exports,module,alert){
"use strict";
function report(e,t){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t);
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
function afterGetAdData(e,t){
function a(e){
return e;
}
var i={},o=e.is_need_ad,n=e._adInfo;
if(0==o)i=n,i||(i={
advertisement_num:0
});else{
if(t.advertisement_num>0&&t.advertisement_info){
var p=t.advertisement_info;
i.advertisement_info=saveCopy(p);
}
i.advertisement_num=t.advertisement_num;
}
1==o&&(window._adRenderData=i),i=i||{
advertisement_num:0
};
var r=!1;
if(!i.flag&&i.advertisement_num>0){
var _=i.advertisement_num,d=i.advertisement_info;
window.adDatas.num=_;
for(var s=0;_>s;++s){
var c=null,l=d[s],m=l.use_new_protocol;
if(l.exp_info=l.exp_info||{},l.is_cpm=l.is_cpm||0,l.biz_info=l.biz_info||{},l.app_info=l.app_info||{},
l.pos_type=l.pos_type||0,l.logo=l.logo||"",m)4==l.pos_type&&(r=!0,l=a(l));else if(100==l.pt||115==l.pt){
for(var u=l.exp_info.exp_value||[],f=!1,g=0,y=0;y<u.length;++y){
var v=u[y]||{};
if(1==v.exp_type&&(g=v.comm_attention_num,f=g>0),2==v.exp_type){
f=!1,g=0;
break;
}
}
l.biz_info.show_comm_attention_num=f,l.biz_info.comm_attention_num=g,c={
usename:l.biz_info.user_name,
pt:l.pt,
url:l.url,
traceid:l.traceid,
adid:l.aid,
ticket:l.ticket,
is_appmsg:!0
};
}else if(102==l.pt)c={
appname:l.app_info.app_name,
versioncode:l.app_info.version_code,
pkgname:l.app_info.apk_name,
androiddownurl:l.app_info.apk_url,
md5sum:l.app_info.app_md5,
signature:l.app_info.version_code,
rl:l.rl,
traceid:l.traceid,
pt:l.pt,
ticket:l.ticket,
type:l.type,
adid:l.aid,
is_appmsg:!0
};else if(101==l.pt)c={
appname:l.app_info.app_name,
app_id:l.app_info.app_id,
icon_url:l.app_info.icon_url,
appinfo_url:l.app_info.appinfo_url,
rl:l.rl,
traceid:l.traceid,
pt:l.pt,
ticket:l.ticket,
type:l.type,
adid:l.aid,
is_appmsg:!0
};else if(103==l.pt||104==l.pt||2==l.pt&&l.app_info){
var h=l.app_info.down_count||0,w=l.app_info.app_size||0,j=l.app_info.app_name||"",x=l.app_info.category,k=["万","百万","亿"];
if(h>=1e4){
h/=1e4;
for(var b=0;h>=10&&2>b;)h/=100,b++;
h=h.toFixed(1)+k[b]+"次";
}else h=h.toFixed(1)+"次";
w=formSize(w),x=x?x[0]||"其他":"其他",j=formName(j),l.app_info._down_count=h,l.app_info._app_size=w,
l.app_info._category=x,l.app_info.app_name=j,c={
appname:l.app_info.app_name,
app_rating:l.app_info.app_rating||0,
icon_url:l.app_info.icon_url,
app_id:l.app_info.app_id,
channel_id:l.app_info.channel_id,
md5sum:l.app_info.app_md5,
rl:l.rl,
pkgname:l.app_info.apk_name,
url_scheme:l.app_info.url_scheme,
androiddownurl:l.app_info.apk_url,
versioncode:l.app_info.version_code,
appinfo_url:l.app_info.appinfo_url,
traceid:l.traceid,
pt:l.pt,
url:l.url,
ticket:l.ticket,
type:l.type,
adid:l.aid,
is_appmsg:!0
};
}else if(105==l.pt){
var I=l.card_info.card_id||"",q=l.card_info.card_ext||"";
q=q.htmlDecode();
try{
q=JSON.parse(q),q.outer_str=l.card_info.card_outer_id||"",q=JSON.stringify(q);
}catch(C){
q="{}";
}
c={
card_id:I,
card_ext:q,
pt:l.pt,
ticket:l.ticket||"",
url:l.url,
rl:l.rl,
tid:l.traceid,
traceid:l.traceid,
type:l.type,
adid:l.aid,
is_appmsg:!0
};
}else if(106==l.pt){
var E=l.mp_shop_info.pid||"",z=l.mp_shop_info.outer_id||"";
c={
pid:E,
outer_id:z,
pt:l.pt,
url:l.url,
rl:l.rl,
tid:l.traceid,
traceid:l.traceid,
type:l.type,
adid:l.aid,
is_appmsg:!0
};
}else if(108==l.pt||109==l.pt||110==l.pt||116==l.pt||117==l.pt)c={
pt:l.pt,
ticket:l.ticket||"",
url:l.url,
traceid:l.traceid,
adid:l.aid,
is_appmsg:!0
},l.video_info&&(c.displayWidth=l.video_info.displayWidth,c.displayHeight=l.video_info.displayHeight,
c.thumbUrl=l.video_info.thumbUrl,c.videoUrl=l.video_info.videoUrl,c.rl=l.rl),6==l.dest_type&&Wxopen_card.startConnect(l);else if(111==l.pt||113==l.pt||114==l.pt||112==l.pt||121==l.pt||122==l.pt){
var w=l.app_info.app_size||0,j=l.app_info.app_name||"";
w=formSize(w),j=formName(j),l.app_info.app_size=w,l.app_info.app_name=j,c={
appname:l.app_info.app_name,
app_rating:l.app_info.app_rating||0,
app_id:l.app_info.app_id,
icon_url:l.app_info.icon_url,
channel_id:l.app_info.channel_id,
md5sum:l.app_info.app_md5,
rl:l.rl,
pkgname:l.app_info.apk_name,
url_scheme:l.app_info.url_scheme,
androiddownurl:l.app_info.apk_url,
versioncode:l.app_info.version_code,
appinfo_url:l.app_info.appinfo_url,
traceid:l.traceid,
pt:l.pt,
url:l.url,
ticket:l.ticket,
type:l.type,
adid:l.aid,
source:source||"",
is_appmsg:!0
};
}else 118==l.pt?(c=l,r=!0,console.log("?#$:"),Wxopen_card.startConnect(l)):119==l.pt||120==l.pt?(c=l,
Wxopen_card.startConnect(l)):125==l.pt&&(c=l,6==l.dest_type&&Wxopen_card.startConnect(l));
var D=l.image_url;
require("appmsg/cdn_img_lib.js"),D&&D.isCDN()&&(D=D.replace(/\/0$/,"/640"),D=D.replace(/\/0\?/,"/640?"),
l.image_url=ParseJs.addParam(D,"wxfrom","50",!0)),adDatas.ads["pos_"+l.pos_type]={
a_info:l,
adData:c
},localStorage&&localStorage.setItem&&l.app_info&&l.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+l.traceid,l.app_info.url_scheme);
}
l.has_installed=!1,l&&(104==l.pt||113==l.pt||114==l.pt||2==l.pt||122==l.pt)&&l.app_info.url_scheme&&JSAPI.invoke("getInstallState",{
packageName:l.app_info.apk_name
},function(e){
var t=e.err_msg;
t.indexOf("get_install_state:yes")>-1&&(l.has_installed=!0,document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
var T=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,t=document.documentElement.clientHeight||window.innerHeight;
js_sponsor_ad_area.offsetTop<e+t&&(Class.addClass(document.getElementById("js_ad_area"),"show"),
DomEvent.off(window,"scroll",T));
},A=adDatas.ads;
for(var O in A)if(0==O.indexOf("pos_")){
var c=A[O],l=!!c&&c.a_info;
if(c&&l){
if(0==l.pos_type){
if(l.new_appmsg=window.new_appmsg,js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,l),
111==l.pt||112==l.pt||113==l.pt||114==l.pt){
var B=document.getElementsByClassName("js_download_app_card")[0],S=B.offsetWidth,R=Math.floor(S/2.875);
R>0&&(B.style.height=R+"px");
}
}else if(3==l.pos_type){
var B=document.createElement("div");
B.appendChild(document.createTextNode(l.image_url)),l.image_url=B.innerHTML.replace(/&amp;/g,"&"),
l.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,l),
js_sponsor_ad_area.style.display="block";
var N=js_sponsor_ad_area.clientWidth;
108==l.pt||109==l.pt||110==l.pt?document.getElementById("js_main_img").style.height=N/1.77+"px":116==l.pt||117==l.pt,
DomEvent.on(window,"scroll",T),T(0);
}else 4==l.pos_type&&_checkShowCpc()&&(l=_parseExpCpc(l),js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,l));
lazyLoadAdImg({
aid:l.aid,
type:l.pt
}),checkAdImg(l);
}
}
mmversion.isIOS&&l.app_info&&l.app_info.url_scheme&&(document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看")),
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
var t={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(t.btn_text="查看详情"),29==e.product_type||31==e.product_type?t.btn_text="查看详情":30==e.product_type&&(t.btn_text="去逛逛"),
e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var a=e.cpc_exp_info.exp_content;
try{
for(var i=JSON.parse(a.replace(/&quot;/g,'"')),o=-1,n=0;n<i.aid_list.length;n++)i.aid_list[n].aid==e.aid&&(o=n);
o>-1&&(t.icon_pos=i.icon_pos||"",t.btn_text=i.btn_text||t.btn_text,t.price=i.aid_list[o].price,
t.sale_text=i.aid_list[o].sale_text,window.__addIdKeyReport("68064",15));
}catch(p){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=t,e;
}
function _checkShowCpc(){
if(js_cpc_area){
var e=(document.documentElement.clientHeight||window.innerHeight)/2,t=js_cpc_area.offsetTop,a=document.getElementById("js_content").offsetHeight;
return e>t||e>a-t?!1:!0;
}
}
function lazyLoadAdImg(e){
for(var t=document.getElementsByClassName("js_alazy_img"),a=0;a<t.length;a++){
var i=t[a];
t[a].onload=function(){
window.__addIdKeyReport("28307",54),i.src.indexOf("retry")>-1&&window.__addIdKeyReport("28307",69);
},t[a].onerror=function(){
if(-1==i.src.indexOf("retry"))i.src=ParseJs.addParam(i.src,"retry",1);else{
window.__addIdKeyReport("28307",98);
var t="other";
mmversion.isIOS?t="iphone":mmversion.isAndroid&&(t="android"),window.setTimeout(function(){
var a=window.networkType||"unknow";
ajax({
url:"http://mp.weixin.qq.com/tp/datacenter/report?cmd=report&id=900023&os="+t+"&uin=777&aid="+e.aid+"&image_url="+encodeURIComponent(i.src)+"&type="+e.type+"&network="+a,
type:"GET",
async:!0
});
},500);
}
window.__addIdKeyReport("28307",57);
},t[a].src=t[a].dataset.src;
}
}
function getHost(e){
if(!e)return"";
var t=document.createElement("a");
return t.href=e,t.hostname;
}
function checkAdImg(e){
if(e){
var t=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],a=e.image_url||"",i=getHost(a);
return void(i&&-1==t.indexOf(i)&&window.__addIdKeyReport("28307",58));
}
}
function saveCopyArr(e){
for(var t=[],a=0;a<e.length;++a){
var i=e[a],o=typeof i;
i="string"==o?i.htmlDecode():i,"object"==o&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
t.push(i);
}
return t;
}
function saveCopy(e){
var t={};
for(var a in e)if(e.hasOwnProperty(a)){
var i=e[a],o=typeof i;
i="string"==o?i.htmlDecode():i,"object"==o&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
t[a]=i;
}
return t;
}
function formName(e){
for(var t=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],a=-1,i=0,o=t.length;o>i;++i){
var n=t[i],p=e.indexOf(n);
-1!=p&&(-1==a||a>p)&&(a=p);
}
return-1!=a&&(e=e.substring(0,a)),e;
}
function formSize(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
}
function seeAds(){
function debounce(e,t,a){
var i;
return function(){
var o=this,n=arguments,p=function(){
i=null,a||e.apply(o,n);
},r=a&&!i;
clearTimeout(i),i=setTimeout(p,t),r&&e.apply(o,n);
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
var t=Math.random();
.5>t&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=102&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent(e));
}
function ad_click(e,t,a,i,o,n,p,r,_,d,s,c,l,m,u,f,g,y,v){
if(!has_click[o]){
has_click[o]=!0;
var h=document.getElementById("loading_"+o);
h&&(h.style.display="inline");
var w=g.exp_info||{},j=w.exp_id||"",x=w.exp_value||[];
try{
x=JSON.stringify(x);
}catch(k){
x="[]";
}
var b="";
c&&c.weapp_info&&c.weapp_info.original_id&&(b=c.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:j,
exp_value:x,
url:encodeURIComponent(t),
tid:o,
aid:r,
rl:encodeURIComponent(a),
__biz:biz,
pos_type:d,
pt:_,
pos_x:l,
pos_y:m,
ad_w:u,
ad_h:f,
gh_id:b,
press_interval:window.__a_press_interval||-1
},function(){
function a(e,t,a,i,o,n,p,r,_,d){
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var s={
source:4,
tid:t,
idx:a,
mid:i,
appuin:o,
pt:n,
aid:p,
ad_engine:r,
pos_type:_
},c=window.__report;
if(("104"==n||"113"==n||"114"==n||"122"==n)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var l="",m="";
d&&(l=d.pkgname&&d.pkgname.replace(/\./g,"_"),m=d.channel_id||""),s={
source:4,
tid:t,
traceid:t,
mid:i,
idx:a,
appuin:o,
pt:n,
channel_id:m,
aid:p,
engine:r,
pos_type:_,
pkgname:l
};
}
e=URL.join(e,s),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:t,
aid:p,
engine:r
})),!p&&c&&c(80,e);
}
location.href=e;
}
if(has_click[o]=!1,h&&(h.style.display="none"),g.canvas_info)return void JSAPI.invoke("openADCanvas",{
canvasId:g.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:d
}),
adInfoXml:g.canvas_info.ad_info_xml
},function(e){
0!=e.ret?(location.href=t,report(135,y)):report(134,y);
});
if(v)1==dest_type&&a(t,o,idx,mid,biz,_,r,s,d,c);else if("5"==e)location.href="/mp/profile?source=from_ad&tousername="+t+"&ticket="+n+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+o;else{
if("105"==_&&c)return void Card.openCardDetail(c.card_id,c.card_ext,c);
if("106"==_&&c)return void(location.href=ParseJs.join(t,{
outer_id:c.outer_id
}));
if("118"==_||"119"==_||"120"==_)return void Wxopen_card.openWxopen(c);
if("125"==_&&6==g.dest_type)return void Wxopen_card.openWxopen(c);
if(g&&g.has_installed&&("104"==_||"113"==_||"114"==_||"122"==_||"2"==_&&-1==t.indexOf("itunes.apple.com"))&&g.app_info.url_scheme)return void JSAPI.invoke("launchApplication",{
schemeUrl:g.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=g.app_info.url_scheme);
});
if(0==t.indexOf("https://itunes.apple.com/")||0==t.indexOf("http://itunes.apple.com/"))return g.app_info&&g.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:g.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}):JSAPI.invoke("downloadAppInternal",{
appUrl:t
},function(e){
e.err_msg&&-1!=e.err_msg.indexOf("ok")||(location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(t)+"&ticket="+n+"#wechat_redirect");
}),!1;
if(-1==t.indexOf("mp.weixin.qq.com"))t="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t);else if(-1==t.indexOf("mp.weixin.qq.com/s")&&-1==t.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:o,
idx:idx,
mid:mid,
appuin:biz,
pt:_,
aid:r,
ad_engine:s,
pos_type:d
},p=window.__report;
if(("104"==_||"113"==_||"114"==_||"122"==_)&&c||-1!=t.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var l="",m="";
c&&(l=c.pkgname&&c.pkgname.replace(/\./g,"_"),m=c.channel_id||""),i={
source:4,
tid:o,
traceid:o,
mid:mid,
idx:idx,
appuin:biz,
pt:_,
channel_id:m,
aid:r,
engine:s,
pos_type:d,
pkgname:l
};
}
t=URL.join(t,i),(0==t.indexOf("http://mp.weixin.qq.com/promotion/")||0==t.indexOf("https://mp.weixin.qq.com/promotion/"))&&(t=URL.join(t,{
traceid:o,
aid:r,
engine:s
})),!r&&p&&p(80,t);
}
location.href=t;
}
});
}
}
function bindAdOperation(){
seeAds();
for(var e=0;total_pos_type>e;++e)!function(e){
var t="pos_"+e,a=el_gdt_areas[t];
if(!a)return!1;
if(!a.getElementsByClassName&&a.style)return a.style.display="none",!1;
var i=a.getElementsByClassName("js_ad_link")||[],o=adDatas.ads[t];
if(o){
for(var n=o.adData,p=o.a_info,r=p.pos_type,_=o.ad_engine,d=0,s=i.length;s>d;++d)!function(e,t){
var a=i[e],o=a.dataset;
if(o&&3!=p.pos_type){
var n=o.type,d=o.url,s=o.rl,c=o.apurl,l=o.tid,m=o.ticket,u=o.group_id,f=o.aid,g=o.pt,y=o.use_new_protocol;
DomEvent.on(a,"click",function(e){
var a=!!e&&e.target;
if(!a||!a.className||-1==a.className.indexOf("js_ad_btn")&&-1==a.className.indexOf("js_btn_process")&&-1==a.className.indexOf("js_muted_btn")&&-1==a.className.indexOf("js_poster_cover")){
if(t){
t.adid=window.adid||t.adid||t.aid;
var i="&tid="+t.traceid+"&uin="+uin+"&key="+key+"&ticket="+(t.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+t.adid+"&ad_engine="+_+"&pos_type="+r+"&r="+Math.random();
p&&p.has_installed&&("104"==t.pt||"113"==t.pt||"114"==t.pt||"2"==t.pt)?report(114,i):"103"==t.pt||"111"==t.pt||"112"==t.pt?report(23,i):("104"==t.pt||"113"==t.pt||"114"==t.pt)&&report(25,i);
}
var o,v,h,w;
return o=position.getX(a,"js_ad_link")+e.offsetX,v=position.getY(a,"js_ad_link")+e.offsetY,
h=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
w=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(n,d,s,c,l,m,u,f,g,r,_,t,o,v,h,w,p,i,y),log("[Ad] ad_click: type="+n+", url="+d+", rl="+s+", apurl="+c+", traceid="+l+", ticket="+m+", group_id="+u+", aid="+f+", pt="+g+", pos_type="+r+", ad_engine="+_),
!1;
}
},!0),DomEvent.on(a,"touchstart",function(){
console.log("touchstart",+new Date),window.__a_press_interval=+new Date;
}),DomEvent.on(a,"touchend",function(){
console.log("touchend",+new Date),window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(d,n);
if(n){
n.adid=window.adid||n.adid||n.aid;
var c=p.exp_info||{},l=c.exp_id||"",m=c.exp_value||[];
try{
m=JSON.stringify(m);
}catch(u){
m="[]";
}
var f="&tid="+n.traceid+"&uin="+uin+"&key="+key+"&ticket="+(n.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+n.adid+"&ad_engine="+_+"&pos_type="+r+"&exp_id="+l+"&exp_value="+m+"&r="+Math.random();
if(n.report_param=f,"100"==n.pt||"115"==n.pt){
var g=require("a/profile.js");
return void new g({
btnViewProfile:document.getElementById("js_view_profile_"+r),
btnAddContact:document.getElementById("js_add_contact_"+r),
adData:n,
pos_type:r,
report_param:f,
aid:n.adid,
ad_engine:_
});
}
if("102"==n.pt){
var y=require("a/android.js"),v=15,h=n.pkgname&&n.pkgname.replace(/\./g,"_");
return void new y({
btn:document.getElementById("js_app_action_"+r),
adData:n,
report_param:f,
task_ext_info:[n.adid,n.traceid,h,source,v,_].join("."),
via:[n.traceid,n.adid,h,source,v,_].join(".")
});
}
if("101"==n.pt){
var w=require("a/ios.js");
return void new w({
btn:document.getElementById("js_app_action_"+r),
adData:n,
ticket:n.ticket,
report_param:f
});
}
if("105"==n.pt)return void new Card({
btn:document.getElementById("js_card_action_"+r),
adData:n,
report_param:f,
pos_type:r
});
if("106"==n.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+r),
adData:n,
report_param:f,
pos_type:r
});
if("103"==n.pt||"104"==n.pt||"111"==n.pt||"112"==n.pt||"113"==n.pt||"114"==n.pt||"121"==n.pt||"122"==n.pt){
var j=require("a/app_card.js"),v=15,h=n.pkgname&&n.pkgname.replace(/\./g,"_");
return void new j({
btn:document.getElementById("js_appdetail_action_"+r),
js_app_rating:document.getElementById("js_app_rating_"+r),
adData:n,
report_param:f,
pos_type:r,
url_scheme:n.url_scheme,
via:[n.traceid,n.adid,h,source,v,_].join("."),
ticket:n.ticket,
appdetail_params:["&aid="+n.adid,"traceid="+n.traceid,"pkgname="+h,"source="+source,"type="+v,"engine="+_,"appuin="+biz,"pos_type="+r,"ticket="+n.ticket,"scene="+scene].join("&"),
engine:_
});
}
if("108"==n.pt||"109"==n.pt||"110"==n.pt||"116"==n.pt||"117"==n.pt){
var x=require("a/sponsor.js");
new x({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adData:n,
a_info:p,
pos_type:r,
report_param:f
});
}
if("118"==p.pt&&(n.report_param=f),"125"==p.pt){
p.report_param=f;
var k=require("a/video.js");
new k(p);
}
}
}
}(e);
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
});define("pages/video_ctrl.js",[],function(){
"use strict";
function i(i){
return i=i||window,i.cgiData&&2==i.cgiData.ori_status?!0:!1;
}
function n(i){
return i=i||window,!1;
}
function t(){
return-1!=a.indexOf("&vl=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function e(){
return-1!=a.indexOf("&dd=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function o(){
var i;
if(parent==window)i=window;else try{
{
parent.window.__videoDefaultRatio;
}
i=parent.window;
}catch(n){
i=window;
}
var t=i.__videoDefaultRatio||16/9;
return"54"==i.appmsg_type?t:t;
}
var a=window.location.href;
return{
showPauseTips:e,
showVideoLike:t,
showVideoDetail:n,
showH5Profile:i,
getRatio:o
};
});
define("pages/loadscript.js",[],function(){
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
function l(e,t){
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
function s(e,t){
if("undefined"!=typeof e){
var n=new Image;
n.src=U.idkey?"//mp.weixin.qq.com/mp/jsmonitor?idkey="+(U.idkey+"_"+e+"_1")+"&t="+Math.random():"http://mp.weixin.qq.com/mp/jsreport?key="+e+"&content="+(t||"")+"&r="+Math.random();
}
}
function a(){
var e=window.innerHeight||document.documentElement.clientHeight,t=window.pageYOffset||document.documentElement.scrollTop,n=document.documentElement.scrollHeight;
if(t+e+100>n&&R.off(window,"scroll",a),!(Z||-1==Q||Q>0&&n-t-e>500)){
if("number"==typeof window.comment_count&&0==window.comment_count)return void _({
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
var c="/mp/appmsg_comment?action=getcomment&scene="+U.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+O+"&offset="+Q+"&limit="+X+(window.send_time?"&send_time="+send_time:"");
try{
nt++,nt>1&&s(U.moreList,encodeURIComponent(c)),tt.indexOf(c)>-1&&s(U.repeatList,encodeURIComponent(c)),
tt.push(c);
}catch(d){}
!!H&&console.log("[Appmsg comment] start get comment data:"+c),F("[Appmsg comment] start get comment data, url:"+c),
S({
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
_(m);
var a=+new Date-t;
l(n,a);
}else s(U.errList,"type:resperr;url:"+encodeURIComponent(c)+";ret="+d);
F("[Appmsg comment] get comment success, text: "+e);
},
error:function(){
s(U.errList,"type:ajaxerr;url:"+encodeURIComponent(c)),F("[Appmsg comment] get comment ajax error");
},
complete:function(){
Z=!1,i(W.loading),R.off(window,"scroll",k);
}
});
}
}
function _(e){
var t,n,o=document.createDocumentFragment(),c=document.createDocumentFragment();
ot++,ot>1&&s(U.handleList,encodeURIComponent(JSON.stringify({
comment_id:O,
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
function r(){
J.log("tag1");
var e=d(W.input.value);
if(J.log("tag2"),!D.hasClass(W.submit,"btn_disabled")){
if(J.log("tag3"),e.length<1)return y("留言不能为空");
if(J.log("tag4"),e.length>600)return y("字数不能多于600个");
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
var o="/mp/appmsg_comment?action=addcomment&scene="+U.scene+"&comment_id="+O+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
S({
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
J.log("tag8"),Y.hidePannel();
var m={};
try{
m=window.eval.call(window,"("+t+")");
}catch(i){}
switch(+m.ret){
case 0:
n(m);
break;

case-6:
y("你留言的太频繁了，休息一下吧");
break;

case-7:
y("你还未关注该公众号，不能参与留言");
break;

case-10:
y("字数不能多于600个");
break;

case-15:
y("留言已关闭");
break;

default:
mt=e,y("系统错误，请重试");
}
0!=m.ret&&s(U.addCommentErr,"type:resperr;url:"+encodeURIComponent(o)+";ret="+m.ret);
},
error:function(e){
J.log("shit;"+e.status+";"+e.statusText),s(U.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(o));
},
complete:function(){
""!=W.input.value&&D.removeClass(W.submit,"btn_disabled");
}
});
}
}
function p(){
if(0==K){
var e="/mp/appmsg_comment?action=getmycomment&scene="+U.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+O,t=document.getElementById("js_mycmt_loading");
K=1,m(t),S({
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
}else K=0,s(U.errComment,"type:resperr;url:"+encodeURIComponent(e)+";ret="+i);
},
error:function(){
K=0,s(U.errComment,"type:ajaxerr;url:"+encodeURIComponent(e));
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
return 3600>o?Math.ceil(o/60)+"分钟前":86400>m?Math.floor(o/60/60)+"小时前":172800>m?"昨天":604800>m?Math.floor(m/24/60/60)+"天前":c.getFullYear()==i?c.getMonth()+1+"月"+c.getDate()+"日":c.getFullYear()+"年"+(c.getMonth()+1)+"月"+c.getDate()+"日";
}
function g(e,t,n){
var o,m="",i=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",d="";
"elected"==n?d=0:"friend"==n&&(d=1),et={};
for(var l,a=0;l=e[a];++a){
l.time=u(l.create_time),l.status="",l.logo_url=l.logo_url||c,l.logo_url=-1!=l.logo_url.indexOf("wx.qlogo.cn")?l.logo_url.replace(/\/132$/,"/96"):l.logo_url,
l.content=l.content.htmlDecodeLite().htmlEncodeLite(),l.nick_name=l.nick_name.htmlDecodeLite().htmlEncodeLite(),
l.like_num_format=parseInt(l.like_num)>=1e4?(l.like_num/1e4).toFixed(1)+"万":l.like_num,
l.is_from_friend="friend"==n?0:l.is_from_friend||0,l.is_from_me="mine"==n?1:l.is_from_me||0,
l.reply=l.reply||{
reply_list:[]
},l.is_mine=n?!1:!0,l.is_elected="elected"==n||"friend"==n?1:l.is_elected,l.is_top="friend"==n?0:l.is_top,
l.report_elected=l.is_elected||0,l.report_friend=l.is_from_friend||0,l.scene=d,l.reply.reply_list.length>0&&(l.reply.reply_list[0].time=u(l.reply.reply_list[0].create_time),
l.reply.reply_list[0].content=(l.reply.reply_list[0].content||"").htmlEncodeLite(),
l.reply.reply_list[0].reply_like_status=l.reply.reply_list[0].reply_like_status||0,
l.reply.reply_list[0].reply_like_num=l.reply.reply_list[0].reply_like_num||0,l.reply.reply_list[0].reply_like_num_format=parseInt(l.reply.reply_list[0].reply_like_num)>=1e4?(l.reply.reply_list[0].reply_like_num/1e4).toFixed(1)+"万":l.reply.reply_list[0].reply_like_num),
l.new_appmsg=window.new_appmsg,m+=A.tmpl(x,l);
try{
var _=l.nick_name+l.content,r=!1,p=U.repeatContentID;
et[_]&&(r=!0,p=U.repeatContent),V.indexOf(l.content_id)>-1&&(r=!0,p=U.repeatContentID),
V.push(l.content_id),et[_]=!0,r&&s(p,encodeURIComponent(JSON.stringify({
comment_id:O,
content_id:l.content_id,
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
e.innerHTML=Y.encode(e.innerHTML);
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
P=window.pageYOffset||document.documentElement.scrollTop,console.log(P),i(W.article),
m(W.mine),window.scrollTo(0,0),p(),e||J.later(function(){
W.input.focus();
});
}
function j(){
i(W.mine),m(W.article),console.log(P),window.scrollTo(0,P),W.input.blur();
}
function b(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(D.hasClass(t,"js_comment_praise")&&(n=t),n){
for(var o=parseInt(n.dataset.status),m=0==o?1:0,i=n.dataset.contentId,c=n.dataset.scene,d=document.querySelectorAll('.js_comment_praise[data-content-id="'+i+'"]'),l=0;l<d.length;l++)E(d[l]);
if(window.test_comment_data)return;
S({
url:"/mp/appmsg_comment?action=likecomment",
type:"POST",
data:{
like:m,
__biz:biz,
appmsgid:appmsgid,
comment_id:O,
content_id:i,
item_show_type:window.item_show_type||0,
scene:c
}
});
}
}
function I(e){
for(var t=e.delegatedTarget,n=parseInt(t.dataset.status),o=n?0:1,m=t.dataset.contentId,i=t.dataset.replyId,c=t.dataset.scene,d=document.querySelectorAll('.js_reply_praise[data-content-id="'+m+'"]'),l=0;l<d.length;l++)E(d[l]);
document.querySelector("meta[name=viewport]"),window.test_comment_data||S({
url:"/mp/appmsg_comment?action=like_author_reply",
type:"post",
data:{
comment_id:O,
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
var t=e.delegatedTarget,n=t.getAttribute("data-my-id"),m="/mp/appmsg_comment?action=delete&scene="+U.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+O+"&my_id="+n;
confirm("确定删除吗？")&&S({
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
for(var l=document.querySelectorAll(".cid"+n),s=0;s<l.length;s++)l[s].parentNode.removeChild(l[s]);
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
var D=e("biz_common/dom/class.js"),x=e("appmsg/cmt_tpl.html.js"),T=document.getElementById("js_cmt_area"),z=document.getElementById("js_friend_cmt_area"),L=new C(window.location.href),M=e("biz_common/utils/wxgspeedsdk.js"),q=e("appmsg/comment_report.js"),H=location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,O=0;
if(window._has_comment=!0,"undefined"!=typeof window.comment_id?O=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(O=window.cgiData.comment_id),
!!H&&console.log("comment_id:"+O+";uin:"+uin+";key:"+key),-1!=navigator.userAgent.indexOf("MicroMessenger")||window.test_comment_data||(T&&(T.style.display="none"),
z&&(z.style.display="none"),O=0,window._has_comment=!1),0==O||!uin||!key)return void(window._has_comment=!1);
var R=e("biz_common/dom/event.js"),S=e("biz_wap/utils/ajax.js"),A=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),N=e("biz_wap/utils/fakehash.js"),F=e("appmsg/log.js"),U={
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
},P=null;
window.__commentReportData&&window.__commentReportData.idkey&&(!!H&&console.log("init reportData"),
U=window.__commentReportData),function(){
if(T){
var t=e("appmsg/comment_tpl.html.js");
T.innerHTML=A.tmpl(t,{
new_appmsg:window.new_appmsg
});
}
if(z){
var n=e("appmsg/friend_comment_tpl.html.js");
z.innerHTML=A.tmpl(n,{
new_appmsg:window.new_appmsg
});
}
}(),function(){
var t=e("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n.innerHTML=A.tmpl(t,{
new_appmsg:window.new_appmsg,
friend_comment_enabled:window.friend_comment_enabled
}),document.body.appendChild(n);
}();
var Y=e("appmsg/emotion/emotion.js"),J=e("appmsg/emotion/dom.js"),Q=(new Image,0),X=100,Z=!1,$="",G="我",K=0,W={
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
a(),w(),Y.init();
}(),N.on("comment",function(){
!!H&&console.log("FakeHash on comment"),h();
}),N.on("article",function(){
!!H&&console.log("FakeHash on article"),j();
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
}),R.on(W.submit,"tap",r),R.on(W.submit,"click",function(e){
e.preventDefault();
}),R.on(window,"scroll",a),R.on(window,"scroll",k),R.on(document.getElementById("js_cmt_write1"),"click",function(e){
e.preventDefault(),!!H&&console.log("push comment"),N.push("comment");
}),R.on(document.getElementById("js_cmt_write2"),"click",function(e){
e.preventDefault(),!!H&&console.log("push comment"),N.push("comment");
}),R.on(document.getElementById("js_cmt_write3"),"click",function(e){
e.preventDefault(),!!H&&console.log("push comment"),N.push("comment");
}),R.on(document.getElementById("js_cmt_write4"),"click",function(e){
e.preventDefault(),!!H&&console.log("push comment"),N.push("comment");
}),new q({
comment_id:O,
appmsgid:appmsgid,
idx:idx,
item_show_type:window.item_show_type||0,
biz:biz
});
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n  <div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n    <div class="discuss_container editing access">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">我的留言</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">我的留言</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">加载中</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">已留言</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n';
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_appmsg_tag">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <# if (is_from_me == 1) { #>\n    <p class="discuss_extra_info">\n        <!-- <#=time#> -->               \n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n    </p>\n    <# } #>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <!-- <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p> -->\n        </div>\n    <# } #>\n        \n</li>\n<#}else{#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_discuss_top">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}#>\n';
});define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js"],function(n,t){
"use strict";
function i(){
v.WIDTH=S=_("#js_article").width()||_("#js_cmt_mine").width(),v.pageCount=z=e(),
o(),a(),s();
}
function e(){
d=S-2*P,C=parseInt(d/W),M=3*C-1;
var n=parseInt(R/M);
return R%M!==0&&n++,n;
}
function o(){
var n=_("#js_slide_wrapper"),t=v.wrapperWidth=z*S;
n.css({
width:t+"px"
});
}
function a(){
for(var n=_("#js_slide_wrapper").el[0],t=(S-C*W)/2,i=0,e=z;e>i;i++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),n.appendChild(o),_(o).css({
width:S+"px",
"float":"left",
"padding-left":t+"px",
"padding-right":"0"
}),c(o,i,t);
}
}
function s(){
for(var n=_("#js_navbar"),t=0,i=z;i>t;t++){
var e=_(_.el("li"));
e.attr("class","emotion_nav js_emotion_nav"),D.push(e),n.append(e);
}
v.navs=D;
}
function c(n,t,i){
for(var e=0,o=M;o>e;e++){
var a=document.createElement("li");
if(y++,y>R)break;
a=r(y),_(n).append(a);
}
var s=m(i);
_(n).append(s);
}
function r(n){
var t=_(_.el("li")),i=_(_.el("i")),e=0;
i.attr("class","icon_emotion icon"+n),i.css({
"background-position":"0px "+((1-n)*Z-e)+"px"
}),t.attr("class","emotion_item js_emotion_item"),t.attr("data-index",n);
var o=W+"px";
return t.css({
width:o,
height:o
}),t.append(i),t;
}
function m(n){
var t=_(_.el("li")),i=_(_.el("i"));
t.attr("class","emotion_item del js_emotion_item"),t.attr("data-index",-1),i.attr("class","icon_emotion del");
var e=W+"px";
return t.css({
width:e,
height:e,
right:n+"px"
}),t.append(i),t;
}
function p(){
function n(){
o.show(),w.show(),e.blur(),_.later(function(){
e.blur();
});
}
function t(){
o.hide(),w.hide(),e.focus(),_.later(function(){
e.focus();
});
}
w=_("#js_emotion_panel");
var i=_("#js_cmt_input"),e=i.el[0],o=_("#js_emotion_panel_arrow_wrp");
w.hide(),_("#js_emotion_switch").on("tap",function(i){
console.log("emotion click"),i.preventDefault(),i.stopPropagation(),g=!g,g?n():t();
}),i.on("tap",function(){
w.hide(),g=!1;
});
}
function l(){
function n(n){
if(!v.isMoved){
var t=_(n.currentTarget),i=+t.attr("data-index");
h.inputEmotion(i);
}
}
_("li.js_emotion_item").on("click",n),_("li.js_emotion_item").on("touchend",n);
}
function u(n){
for(var t=[],i=0;i<x.length;i++){
var e=x[i];
if(e.cn){
var o=new RegExp(e.cn.replace("[","\\[").replace("]","\\]"),"g"),a=n.match(o);
a&&(t=t.concat(a));
}
if(e.emoji){
var o=new RegExp(e.emoji,"g"),a=n.match(o);
a&&(t=t.concat(a));
}
}
return _.each(t,function(t){
if(void 0!==I[t]){
var i=I[t],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
n=n.replace(t,o);
}
}),n;
}
for(var d,_=n("appmsg/emotion/dom.js"),f=n("appmsg/emotion/slide.js"),v=n("appmsg/emotion/common.js"),j=n("appmsg/emotion/nav.js"),h=n("appmsg/emotion/textarea.js"),t=(_.each,
{}),g=!1,w=null,x=n("biz_common/utils/emoji_data.js"),b=n("biz_common/utils/emoji_panel_data.js"),E={},I={},O=[],T=0;T<x.length;T++){
var N=x[T];
E[N.id]=N;
}
for(var T=0;T<b.length;T++){
var k=b[T],N=E[k];
I[N.cn]=T,N.emoji&&(I[N.emoji]=T),O.push(N.style);
}
var z,M,C,S,D=[],P=15,R=v.EMOTIONS_COUNT,W=v.EMOTION_LI_SIZE,Z=v.EMOTION_SIZE;
t.init=function(){
p(),i(),f.init(),j.activeNav(0),l(),h.init();
};
var y=0;
return t.encode=function(n){
n=u(n);
var t=/\/([\u4e00-\u9fa5\w]{1,4})/g,i=n.match(t);
return i?(_.each(i,function(t){
var i=t.replace("/",""),e=[i.slice(0,4),i.slice(0,3),i.slice(0,2),i.slice(0,1)];
_.each(e,function(t){
if(void 0!==I["["+t+"]"]){
var i=I["["+t+"]"],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
n=n.replace("/"+t,o);
}
});
}),n):n;
},t.hidePannel=function(){
w.hide();
},t;
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
});define("biz_wap/utils/hand_up_state.js",["biz_common/dom/event.js"],function(n){
"use strict";
function e(){
if("hidden"in document)return"hidden";
for(var n=["webkit","moz","ms","o"],e=0;e<n.length;e++)return n[e]+"Hidden"in document,
n[e]+"Hidden";
return null;
}
function i(){
var n=e();
return n?document[n]:!1;
}
function t(){
return r;
}
var d=n("biz_common/dom/event.js"),o=e(),r=0,u=0;
if(o){
var m=o.replace(/[H|h]idden/,"")+"visibilitychange";
d.on(document,m,function(){
i()?u=(new Date).getTime():r+=(new Date).getTime()-u;
},!1);
}
return{
getHandUpTime:t,
isHidden:i
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
});
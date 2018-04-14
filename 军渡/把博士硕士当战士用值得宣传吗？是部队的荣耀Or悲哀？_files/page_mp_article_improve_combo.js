define("appmsg/emotion/textarea.js",["appmsg/emotion/dom.js","appmsg/emotion/caret.js","biz_common/dom/class.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js"],function(e,t){
"use strict";
function n(){
var e="translate3d(0, 0, 0)";
u.css({
webkitTransform:e,
transform:e
});
}
function a(){
var e=8;
u.on("keydown",function(t){
t.keyCode===e&&i(!0)&&t.preventDefault();
});
}
function i(e){
function t(){
var e=a-1;
0>e&&(e=0);
var t=i.slice(0,e),o=i.slice(a),s=+new Date;
n.value=t+o,f.set(n,e),r(+new Date-s);
}
var n=u.el[0],a=f.get(n),i=n.value,s=4,c=a-s;
0>c&&(c=0,s=a-c);
var v=i.slice(c,a),d=v.match(/\[([\u4e00-\u9fa5\w]+)\]$/g);
if(d){
var p=d[0],_=s-p.length,j=p.replace("[","").replace("]","");
if(o(j)){
var b=v.replace(p,""),g=i.slice(0,c)+b+i.slice(a),h=+new Date;
n.value=g,f.set(n,c+_),r(+new Date-h);
}else{
if(e)return!1;
t();
}
}else{
if(e)return!1;
t();
}
return e?(n.focus(),m.later(function(){
n.focus();
})):(n.blur(),m.later(function(){
n.blur();
})),l(n.value),!0;
}
function o(e){
for(var t=0,n=j.length;n>t;t++)if(j[t]==e)return!0;
return!1;
}
function s(e){
var t=u.el[0],n=f.get(t),a=t.value,a=a.slice(0,n)+e+a.slice(n);
t.value=a,f.set(t,n+e.length+1),t.blur(),m.later(function(){
t.blur();
}),l(a);
}
function r(){}
function l(e){
var t=c.el[0];
e.length<1?v.addClass(t,"btn_disabled"):v.removeClass(t,"btn_disabled");
}
for(var u,c,t={},m=e("appmsg/emotion/dom.js"),f=e("appmsg/emotion/caret.js"),v=e("biz_common/dom/class.js"),d=e("biz_common/utils/emoji_data.js"),p=e("biz_common/utils/emoji_panel_data.js"),_={},j=[],b=0;b<d.length;b++){
var g=d[b];
_[g.id]=g;
}
for(var b=0;b<p.length;b++){
var h=p[b],g=_[h];
j.push(g.cn);
}
return t.init=function(){
u=m("#js_cmt_input"),c=m("#js_cmt_submit"),n(),a();
},t.inputEmotion=function(e,t){
-1===e?i(t):s(j[e-1]);
},t;
});define("appmsg/comment.js",["biz_common/dom/class.js","appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/comment_tpl.html.js","appmsg/friend_comment_tpl.html.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js"],function(e,t,n,m){
"use strict";
function o(e,t){
e&&(e.style.display=t?t:"block");
}
function i(e){
e&&(e.style.display="none");
}
function c(){
setTimeout(function(){
o(K.toast);
},750),setTimeout(function(){
i(K.toast),window.history.back(-1),j();
},1500);
}
function d(e){
return e.replace(/^\s+|\s+$/g,"");
}
function l(e,t){
if(!(Math.random()<.999)){
var n=window.location.protocol,m=9;
"https:"==n&&(m=18),M.saveSpeeds({
uin:uin,
pid:m,
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
n.src=F.idkey?"//mp.weixin.qq.com/mp/jsmonitor?idkey="+(F.idkey+"_"+e+"_1")+"&t="+Math.random():"http://mp.weixin.qq.com/mp/jsreport?key="+e+"&content="+(t||"")+"&r="+Math.random();
}
}
function a(){
var e=window.innerHeight||document.documentElement.clientHeight,t=window.pageYOffset||document.documentElement.scrollTop,n=document.documentElement.scrollHeight;
if(t+e+100>n&&R.off(window,"scroll",a),!(Q||-1==J||J>0&&n-t-e>500)){
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
var m=+new Date;
Q=!0,i(K.tips),o(K.loading);
var c="/mp/appmsg_comment?action=getcomment&scene="+F.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+H+"&offset="+J+"&limit="+G+(window.send_time?"&send_time="+send_time:"");
try{
tt++,tt>1&&s(F.moreList,encodeURIComponent(c)),et.indexOf(c)>-1&&s(F.repeatList,encodeURIComponent(c)),
et.push(c);
}catch(d){}
!!q&&console.log("[Appmsg comment] start get comment data:"+c),N("[Appmsg comment] start get comment data, url:"+c),
S({
url:c,
type:"get",
success:function(e){
var t=+new Date,n=t-m,o={};
try{
o=window.eval.call(window,"("+e+")");
}catch(i){}
window.test_comment_data&&(o=window.test_comment_data);
var d=o.base_resp&&o.base_resp.ret;
if(0==d){
r(o);
var a=+new Date-t;
l(n,a);
}else s(F.errList,"type:resperr;url:"+encodeURIComponent(c)+";ret="+d);
N("[Appmsg comment] get comment success, text: "+e);
},
error:function(){
s(F.errList,"type:ajaxerr;url:"+encodeURIComponent(c)),N("[Appmsg comment] get comment ajax error");
},
complete:function(){
Q=!1,i(K.loading),R.off(window,"scroll",B);
}
});
}
}
function r(e){
var t,n,m=document.createDocumentFragment(),c=document.createDocumentFragment();
nt++,nt>1&&s(F.handleList,encodeURIComponent(JSON.stringify({
comment_id:H,
offset:J,
url:location.href
}))),"undefined"!=typeof e.only_fans_can_comment?window.can_fans_comment_only=e.only_fans_can_comment:"undefined"==typeof window.can_fans_comment_only&&(window.can_fans_comment_only=0),
1!=e.enabled?(x&&(x.style.display="none"),z&&i(z),e.elected_comment=[],e.friend_comment=[],
e.elected_comment_total_cnt=0,e.friend_comment_total_cnt=0):(x&&(x.style.display="block"),
z&&o(z)),0==J?(X=e.logo_url,Z=e.nick_name,t=e.elected_comment,t&&t.length?(g(t,m,"elected"),
K.list.appendChild(m),o(K.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?o(document.getElementById("js_cmt_addbtn1")):o(document.getElementById("js_cmt_nofans1"),"block"),
e.elected_comment_total_cnt<=10&&(o(document.getElementById("js_cmt_statement")),
o(document.getElementById("js_cmt_qa")))):(i(K.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?o(document.getElementById("js_cmt_addbtn2")):o(document.getElementById("js_cmt_nofans2"),"block")),
n=e.friend_comment,g(n,c,"friend"),K.fdlist.appendChild(c),n&&n.length?(o(K.fdmain),
(0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans)&&(i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),o(document.getElementById("js_cmt_addbtn3")))):i(K.fdmain),
function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}
}()):(t=e.elected_comment,t&&t.length&&(g(t,m,"elected"),K.list.appendChild(m))),
0==e.elected_comment_total_cnt?(J=-1,i(document.getElementById("js_cmt_loading")),
i(document.getElementById("js_cmt_statement")),i(document.getElementById("js_cmt_qa"))):J+G>=e.elected_comment_total_cnt?(J=-1,
i(document.getElementById("js_cmt_loading")),o(document.getElementById("js_cmt_statement")),
o(document.getElementById("js_cmt_qa"))):J+=e.elected_comment.length;
}
function _(){
Y.log("tag1");
var e=d(K.input.value);
if(Y.log("tag2"),!D.hasClass(K.submit,"btn_disabled")){
if(Y.log("tag3"),e.length<1)return y("留言不能为空");
if(Y.log("tag4"),e.length>600)return y("字数不能多于600个");
Y.log("tag5"),D.addClass(K.submit,"btn_disabled"),Y.log("tag6");
var t=document.getElementById("activity-name");
Y.log("tag7"),mt!=e&&(ot=+new Date);
var n=function(t){
var n=document.createDocumentFragment(),m=document.createDocumentFragment();
if(c(),console.log("------------------------",window.friend_comment_enabled),g([{
content:e,
nick_name:Z,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:X,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:t.my_id,
content_id:t.content_id
}],n,"mine"),K.mylist.insertBefore(n,K.mylist.firstChild),1==window.friend_comment_enabled){
g([{
content:e,
nick_name:Z,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:X,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:t.my_id,
content_id:t.content_id
}],m,"friend");
var i=K.fdlist.querySelectorAll("li.discuss_item");
if(i.length){
for(var d=!1,l=0;l<i.length;l++)if(!i[l].querySelector(".praise_num").innerHTML){
K.fdlist.insertBefore(m,i[l]),d=!0;
break;
}
d||K.fdlist.appendChild(m);
}else K.fdlist.appendChild(m),o(K.fdmain);
}
o(K.mylist.parentNode),K.input.value="",v();
};
if(window.test_comment_data)return void n({
my_id:"111"
});
var m="/mp/appmsg_comment?action=addcomment&scene="+F.scene+"&comment_id="+H+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
S({
url:m,
data:{
content:e,
title:t&&d(t.innerText),
head_img:X,
nickname:Z,
client_id:ot
},
type:"POST",
success:function(t){
Y.log("tag8"),P.hidePannel();
var o={};
try{
o=window.eval.call(window,"("+t+")");
}catch(i){}
switch(+o.ret){
case 0:
n(o);
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
0!=o.ret&&s(F.addCommentErr,"type:resperr;url:"+encodeURIComponent(m)+";ret="+o.ret);
},
error:function(e){
Y.log("shit;"+e.status+";"+e.statusText),s(F.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(m));
},
complete:function(){
""!=K.input.value&&D.removeClass(K.submit,"btn_disabled");
}
});
}
}
function p(){
if(0==$){
var e="/mp/appmsg_comment?action=getmycomment&scene="+F.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+H,t=document.getElementById("js_mycmt_loading");
$=1,o(t),S({
url:e,
type:"get",
success:function(t){
var n={};
try{
n=window.eval.call(window,"("+t+")");
}catch(m){}
var i=n.base_resp&&n.base_resp.ret;
if(0==i){
var c=n.my_comment,d=document.createDocumentFragment();
c&&c.length&&(g(c,d,"mine"),K.mylist.appendChild(d),o(K.mylist.parentNode)),$=2;
}else $=0,s(F.errComment,"type:resperr;url:"+encodeURIComponent(e)+";ret="+i);
},
error:function(){
$=0,s(F.errComment,"type:ajaxerr;url:"+encodeURIComponent(e));
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
var m=t/1e3-e,o=n/1e3-e,i=new Date(n).getFullYear(),c=new Date(1e3*e);
return 3600>m?Math.ceil(m/60)+"分钟前":86400>o?Math.floor(m/60/60)+"小时前":172800>o?"昨天":604800>o?Math.floor(o/24/60/60)+"天前":c.getFullYear()==i?c.getMonth()+1+"月"+c.getDate()+"日":c.getFullYear()+"年"+(c.getMonth()+1)+"月"+c.getDate()+"日";
}
function g(e,t,n){
var m,o="",i=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0";
V={};
for(var d,l=0;d=e[l];++l){
d.time=u(d.create_time),d.status="",d.logo_url=d.logo_url||c,d.logo_url=-1!=d.logo_url.indexOf("wx.qlogo.cn")?d.logo_url.replace(/\/132$/,"/96"):d.logo_url,
d.content=d.content.htmlDecodeLite().htmlEncodeLite(),d.nick_name=d.nick_name.htmlDecodeLite().htmlEncodeLite(),
d.like_num_format=parseInt(d.like_num)>=1e4?(d.like_num/1e4).toFixed(1)+"万":d.like_num,
d.is_from_friend="friend"==n?0:d.is_from_friend||0,d.is_from_me="mine"==n?1:d.is_from_me||0,
d.reply=d.reply||{
reply_list:[]
},d.is_mine=n?!1:!0,d.is_elected="elected"==n||"friend"==n?1:d.is_elected,d.is_top="friend"==n?0:d.is_top,
d.reply.reply_list.length>0&&(d.reply.reply_list[0].time=u(d.reply.reply_list[0].create_time),
d.reply.reply_list[0].content=(d.reply.reply_list[0].content||"").htmlEncodeLite(),
d.reply.reply_list[0].reply_like_status=d.reply.reply_list[0].reply_like_status||0,
d.reply.reply_list[0].reply_like_num=d.reply.reply_list[0].reply_like_num||0,d.reply.reply_list[0].reply_like_num_format=parseInt(d.reply.reply_list[0].reply_like_num)>=1e4?(d.reply.reply_list[0].reply_like_num/1e4).toFixed(1)+"万":d.reply.reply_list[0].reply_like_num),
d.new_appmsg=window.new_appmsg,o+=A.tmpl(T,d);
try{
var a=d.nick_name+d.content,r=!1,_=F.repeatContentID;
V[a]&&(r=!0,_=F.repeatContent),W.indexOf(d.content_id)>-1&&(r=!0,_=F.repeatContentID),
W.push(d.content_id),V[a]=!0,r&&s(_,encodeURIComponent(JSON.stringify({
comment_id:H,
content_id:d.content_id,
offset:J,
length:e.length,
url:location.href
})));
}catch(p){}
}
for(i.innerHTML=o,f(i);m=i.children.item(0);)t.appendChild(m);
}
function f(e){
Y.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=P.encode(e.innerHTML);
});
}
function y(e){
return setTimeout(function(){
m(e);
});
}
function w(){
var e="1"===L.getParam("js_my_comment");
e&&h(!0);
}
function h(e){
i(K.article),o(K.mine),U=document.documentElement.scrollHeight,window.scrollTo(0,0),
p(),e||Y.later(function(){
K.input.focus();
});
}
function j(){
i(K.mine),o(K.article),window.scrollTo(0,U),K.input.blur();
}
function b(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(D.hasClass(t,"js_comment_praise")&&(n=t),n){
for(var m=parseInt(n.dataset.status),o=0==m?1:0,i=n.dataset.contentId,c="/mp/appmsg_comment?action=likecomment&scene="+F.scene+"&like="+o+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+H+"&content_id="+i,d=document.querySelectorAll('.js_comment_praise[data-content-id="'+i+'"]'),l=0;l<d.length;l++)E(d[l]);
if(window.test_comment_data)return;
S({
url:c,
type:"GET"
});
}
}
function I(e){
for(var t=e.delegatedTarget,n=parseInt(t.dataset.status),m=n?0:1,o=t.dataset.contentId,i=t.dataset.replyId,c=document.querySelectorAll('.js_reply_praise[data-content-id="'+o+'"]'),d=0;d<c.length;d++)E(c[d]);
document.querySelector("meta[name=viewport]"),window.test_comment_data||S({
url:"/mp/appmsg_comment?action=like_author_reply&scene="+F.scene,
type:"post",
data:{
comment_id:H,
content_id:o,
reply_id:i,
like:m
}
});
}
function E(e){
var t=D.hasClass(e,"praised"),n=e.querySelector(".praise_num"),m=n.innerHTML,o=m.indexOf("万"),i=parseInt(m)?parseInt(m):0;
t?(-1==o&&(n.innerHTML=i-1>0?i-1:""),D.removeClass(e,"praised"),e.dataset.status=0):(-1==o&&(n.innerHTML=i+1),
D.addClass(e,"praised"),e.dataset.status=1);
}
function v(){
K.list.children.length?K.fdlist.children.length?(o(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn1")),i(document.getElementById("js_cmt_addbtn2")),
i(document.getElementById("js_cmt_addbtn4"))):(o(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),i(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn4"))):K.fdlist.children.length?(o(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn4")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2"))):(o(document.getElementById("js_cmt_addbtn4")),
i(document.getElementById("js_cmt_addbtn3")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")));
}
function k(e){
var t=e.delegatedTarget,n=t.getAttribute("data-my-id"),o="/mp/appmsg_comment?action=delete&scene="+F.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+H+"&my_id="+n;
confirm("确定删除吗？")&&S({
url:o,
success:function(e){
var o,c=t;
try{
e=JSON.parse(e);
}catch(d){
e={};
}
if(0==e.ret){
for(;c&&(c.nodeType!=c.ELEMENT_NODE||"li"!=c.tagName.toLowerCase());)c=c.parentNode;
if(c){
c.parentNode.removeChild(c),o=document.getElementById("cid"+n);
for(var l=document.querySelectorAll(".cid"+n),s=0;s<l.length;s++)l[s].parentNode.removeChild(l[s]);
0==K.list.children.length?(i(K.main),i(document.getElementById("js_cmt_statement")),
i(document.getElementById("js_cmt_qa")),0==K.fdlist.children.length&&i(K.fdmain)):0==K.fdlist.children.length&&i(K.fdmain),
0==K.mylist.children.length&&i(K.mylist.parentNode),v();
}
}else m("删除失败，请重试");
},
error:function(){
m("网络错误，请重试");
}
});
}
function B(){
try{
var e=K.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<window.innerHeight&&Q&&t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_45_1&lc=1&log0",
R.off(window,"scroll",B));
}catch(n){}
}
function C(e){
var t=document.createElement("a");
t.setAttribute("href",e),this.el=t,this.parser=this.el,this.getParam=function(e){
var t=new RegExp("([?&])"+e+"=([^&#]*)([&#])?"),n=this.el.search.match(t);
return n?n[2]:null;
};
}
var D=e("biz_common/dom/class.js"),T=e("appmsg/cmt_tpl.html.js"),x=document.getElementById("js_cmt_area"),z=document.getElementById("js_friend_cmt_area"),L=new C(window.location.href),M=e("biz_common/utils/wxgspeedsdk.js"),q=location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,H=0;
if(window._has_comment=!0,"undefined"!=typeof window.comment_id?H=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(H=window.cgiData.comment_id),
!!q&&console.log("comment_id:"+H+";uin:"+uin+";key:"+key),-1!=navigator.userAgent.indexOf("MicroMessenger")||window.test_comment_data||(x&&(x.style.display="none"),
z&&(z.style.display="none"),H=0,window._has_comment=!1),0==H||!uin||!key)return void(window._has_comment=!1);
var R=e("biz_common/dom/event.js"),S=e("biz_wap/utils/ajax.js"),A=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),O=e("biz_wap/utils/fakehash.js"),N=e("appmsg/log.js"),F={
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
},U=null;
window.__commentReportData&&window.__commentReportData.idkey&&(!!q&&console.log("init reportData"),
F=window.__commentReportData),function(){
if(x){
var t=e("appmsg/comment_tpl.html.js");
x.innerHTML=A.tmpl(t,{
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
var P=e("appmsg/emotion/emotion.js"),Y=e("appmsg/emotion/dom.js"),J=(new Image,0),G=100,Q=!1,X="",Z="我",$=0,K={
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
},W=[],V={},et=(new Image,[]),tt=0,nt=0,mt=null,ot=+new Date;
!function(){
a(),w(),P.init();
}(),O.on("comment",function(){
!!q&&console.log("FakeHash on comment"),h();
}),O.on("article",function(){
!!q&&console.log("FakeHash on article"),j();
}),O.on(function(e){
"comment"==e&&j();
}),R.on(K.input,"input",function(){
var e=d(K.input.value);
e.length<1?D.addClass(K.submit,"btn_disabled"):D.removeClass(K.submit,"btn_disabled");
}),R.on(K.list,"tap",".js_comment_praise",b),R.on(K.mylist,"tap",".js_comment_praise",b),
R.on(K.fdlist,"tap",".js_comment_praise",b),R.on(K.list,"tap",".js_reply_praise",I),
R.on(K.fdlist,"tap",".js_reply_praise",I),R.on(K.list,"tap",".js_del",k),R.on(K.mylist,"tap",".js_del",k),
R.on(K.fdlist,"tap",".js_del",k),R.on(K.list,"tap",".js_del",function(e){
e.preventDefault();
}),R.on(K.mylist,"tap",".js_del",function(e){
e.preventDefault();
}),R.on(K.fdlist,"tap",".js_del",function(e){
e.preventDefault();
}),R.on(K.submit,"tap",_),R.on(K.submit,"click",function(e){
e.preventDefault();
}),R.on(window,"scroll",a),R.on(window,"scroll",B),R.on(document.getElementById("js_cmt_write1"),"click",function(e){
e.preventDefault(),!!q&&console.log("push comment"),O.push("comment");
}),R.on(document.getElementById("js_cmt_write2"),"click",function(e){
e.preventDefault(),!!q&&console.log("push comment"),O.push("comment");
}),R.on(document.getElementById("js_cmt_write3"),"click",function(e){
e.preventDefault(),!!q&&console.log("push comment"),O.push("comment");
}),R.on(document.getElementById("js_cmt_write4"),"click",function(e){
e.preventDefault(),!!q&&console.log("push comment"),O.push("comment");
});
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">我的留言</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n        </div>\n    </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">我的留言</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">加载中</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">已留言</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n';
});define("appmsg/articleReport.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function n(i){
i.dom.style.display="",t.tap(i.dom,function(){
var n=["https://mp.weixin.qq.com/mp/infringement?url=",encodeURIComponent(i.link.htmlDecode()),"&title=",encodeURIComponent(i.title),"&__biz=",window.biz].join("");
return location.href=n+"#wechat_redirect",!1;
});
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
var e="acc_start_error;type:#type#;uin:"+(top.window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+top.location.href;
D.isAndroid?(x.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_1",1)):(x.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_1",1));
}
},t.onJsapi2PlayingErr=function(){
if(l(a+"_wx_err_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_ing_error;type:#type#;uin:"+(top.window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+top.location.href;
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
var e="acc_seek_error;type:#type#;uin:"+(top.window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+top.location.href;
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
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","appmsg/log.js"],function(require,exports,module,alert){
"use strict";
function initLikeEvent(opt){
var el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom;
if(el_like&&el_likeNum){
var like_report=function(e){
log("[Appmsg] click like");
var tmpAttr=el_like.getAttribute("like"),tmpHtml=el_likeNum.innerHTML,isLike=parseInt(tmpAttr)?parseInt(tmpAttr):0,like=isLike?0:1,likeNum=parseInt(tmpHtml)?parseInt(tmpHtml):0,appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0
},
type:"POST",
success:function(res){
var data=eval("("+res+")");
log("[Appmsg] like ajax succ"+data.base_resp.ret),0==data.base_resp.ret&&(isLike?(Class.removeClass(el_like,opt.className),
el_like.setAttribute("like",0),likeNum>0&&"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum-1==0?"赞":likeNum-1)):(el_like.setAttribute("like",1),
Class.addClass(el_like,opt.className),"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum+1)));
},
async:!0
});
};
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
});
}
}
function showLikeNum(e){
var i=e||{};
if(i.show){
var t=i.likeAreaDom,l=i.likeNumDom;
t&&(t.style.display=i.likeAreaDisplayValue,i.liked&&Class.addClass(t,i.className),
t.setAttribute("like",i.liked?"1":"0"));
var s=i.likeNum||"赞";
parseInt(s)>1e5?s="100000+":"",l&&(l.innerHTML=s);
}
}
function showReadNum(e){
var i=e||{};
if(i.show){
var t=i.readAreaDom,l=i.readNumDom;
t&&(t.style.display=i.readAreaDisplayValue);
var s=i.readNum||1;
parseInt(s)>1e5?s="100000+":"",l&&(l.innerHTML=s);
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),log=require("appmsg/log.js");
return{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum,
showReadNum:showReadNum
};
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js"],function(e){
"use strict";
function t(e){
var t={
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
for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);
i({
url:"/mp/getappmsgext?f=json",
data:{
r:Math.random(),
__biz:t.biz,
appmsg_type:t.appmsg_type,
mid:t.mid,
sn:t.sn,
idx:t.idx,
scene:t.scene,
title:encodeURIComponent(t.title.htmlDecode()),
ct:t.ct,
abtest_cookie:t.abtest_cookie,
devicetype:t.devicetype.htmlDecode(),
version:t.version.htmlDecode(),
is_need_ticket:t.is_need_ticket,
is_need_ad:t.is_need_ad,
comment_id:t.comment_id,
is_need_reward:t.is_need_reward,
both_ad:t.both_ad,
reward_uin_count:t.is_need_reward?t.reward_uin_count:0,
send_time:t.send_time,
msg_daily_idx:t.msg_daily_idx,
is_original:t.is_original,
is_only_read:t.is_only_read,
req_id:t.req_id,
pass_ticket:t.pass_ticket,
is_temp_url:t.is_temp_url
},
type:"POST",
dataType:"json",
rtId:t.rtId,
rtKey:t.rtKey,
rtDesc:a,
async:!0,
success:function(e){
if(s("[Appmsg] success get async data"),"function"==typeof t.onSuccess&&t.onSuccess(e),
e)try{
s("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(i){}else s("[Appmsg] success get async data, async data is empty");
},
error:function(){
s("[Appmsg] error get async data, biz="+t.biz+", mid="+t.mid),"function"==typeof t.onError&&t.onError();
}
});
}
var s=e("appmsg/log.js"),i=e("biz_wap/utils/ajax.js"),a=e("rt/appmsg/getappmsgext.rt.js");
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
if(-1!=e.indexOf("mp.weixin.qq.com/s")||-1!=e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var t=e.split("#");
e=s.addParam(t[0],"scene",25,!0)+(t[1]?"#"+t[1]:""),e=e.replace(/#rd$/g,"#wechat_redirect");
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
},p(n),!1;
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),s=e("biz_common/utils/url/parse.js"),m=e("appmsg/articleReport.js"),p=e("biz_wap/utils/ajax.js"),a=msg_title.htmlDecode(),c=msg_source_url.htmlDecode(),l=e("appmsg/open_url_with_webview.js"),_=e("biz_wap/jsapi/core.js");
m.init({
dom:document.getElementById("js_report_article3"),
title:a,
link:window.msg_link
});
var d=document.getElementById("js_view_source");
r.on(d,"click",function(){
return n(),!1;
});
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(l._oElements=e.getElementsByTagName("qqmusic")||[],l._oElements.length<=0?!1:!0):!1;
}
function i(){
l.musicLen=l._oElements.length;
}
function s(){
for(var e=0,t=0;t<l.musicLen;t++){
var i=l._oElements[t],s={};
s.musicid=m.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
t.media_id=m.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=m.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=m.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=m.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=m.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=m.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=m.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
t.music_name=m.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
l.adapter[t.musictype]&&"function"==typeof l.adapter[t.musictype].initData&&(t=l.adapter[t.musictype].initData(t,{
scene:0
})),m.renderPlayer(n,t,e),a(t),l.musicList[t.musicid+"_"+t.posIndex]=t;
}
function a(e){
var t=e.musicid+"_"+e.posIndex;
c("[Music] init "+e.detailUrl);
var i=m.decodeStr(e.music_name);
e.player=m.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"音乐",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:u("qqmusic_home_"+t)
});
}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var c=e("appmsg/log.js"),n=e("pages/qqmusic_tpl.html.js"),m=e("pages/voice_component.js"),l={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),l.musicList):void 0;
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/comment_utils.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","biz_common/dom/class.js","appmsg/img_copyright_tpl.html.js","appmsg/appmsgext.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","biz_wap/utils/mmversion.js","pages/version4video.js","appmsg/like.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js"],function(e,t,i,r){
"use strict";
function n(e,t){
var i=g.getQuery("vid",t);
if(i&&e){
var r=e.parentNode;
if(r){
for(var n=[],a=0,o=r.children.length;o>a;a++){
var s=r.children[a];
s.className.indexOf("img_loading")>=0&&s.getAttribute("data-vid")==i&&n.push(s);
}
for(var a=0,o=n.length;o>a;a++)r.removeChild(n[a]);
e.style.display="block";
}
}
}
function a(e){
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
m.innerHTML=x.tmpl(h,t[_]);
{
var c=m.children[0],p=s.parentNode,l=p.insertBefore(c,s),w=l.children[0];
(function(e,t){
j.on(t,"click",function(){
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
function o(e){
if(N&&N.length>0)for(var t,i,r,n=0,a=N.length;a>n;++n)t=N[n],i=t.iframe,r=t.src,
e&&(r=r.replace(/\&encryptVer=[^\&]*/gi,""),r=r.replace(/\&platform=[^\&]*/gi,""),
r=r.replace(/\&cKey=[^\&]*/gi,""),r=r+"&encryptVer=6.0&platform=61001&cKey="+e),
i.setAttribute("src",r);
}
function s(t){
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
var m=document.getElementById("js_share_appmsg");
t.share_redirect_url&&m&&(window._share_redirect_url=t.share_redirect_url,m.innerHTML=x.tmpl(y,{
url:t.share_redirect_url
})),l.initCommentByExtData(t),window._has_comment||0!=window.adDatas.num||window._share_redirect_url||u.addClass(document.body,"rich_media_empty_extra"),
-1==v.indexOf("WindowsWechat")&&-1!=v.indexOf("MicroMessenger")&&(c=e("appmsg/reward_entry.js"),
c.handle(t.reward,_())),1!=t.reward_entrance_enable_for_preview||E.isIOS||(document.getElementById("js_preview_reward")&&(document.getElementById("js_preview_reward").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_wording")&&(document.getElementById("js_preview_reward_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_wording").style.display="block"),j.on(document.getElementById("js_preview_reward_link"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
})),t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
j.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
}));
}
function d(){
var t=I.checkNeedAds(),i=t.is_need_ad,r=t.both_ad,n=-1!=location.href.indexOf("mock_ad=");
n&&(t.is_need_ad=i=1),z("[Appmsg] start get asycn data, is_need_ad:"+i);
var d=window.new_appmsg&&1==_copyright_stat?1:0;
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
is_need_ticket:N&&N.length>0?1:0,
is_need_ad:i,
comment_id:comment_id,
is_need_reward:is_need_reward,
both_ad:r,
reward_uin_count:is_need_reward?3*_():0,
send_time:window.send_time||"",
msg_daily_idx:msg_daily_idx,
is_original:d,
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
o(i.appmsgticket?i.appmsgticket.ticket:""),a(i),i.ret)return;
I.afterGetAdData(t,i),window.wx_user_can_reward=i.user_can_reward,s({
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
}catch(d){
z("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var _=new Image;
return _.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(d.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(d));
}
},
onError:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function _(){
return j.on(window,"resize",function(){
m(),c&&c.render(_());
}),m();
}
function m(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(i){}
var r=30,n=34,a=Math.floor(.9*(e-r)/n);
return window.new_appmsg&&(a=Math.floor(.8*(e-60)/n)),document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=a*n+"px"),
_=function(){
return a;
},a;
}
e("biz_common/utils/string/html.js");
var c,p,l=e("appmsg/comment_utils.js"),w=e("pages/video_ctrl.js"),g=e("biz_common/utils/url/parse.js"),u=e("biz_common/dom/class.js"),h=e("appmsg/img_copyright_tpl.html.js"),f=e("appmsg/appmsgext.js"),y=e("appmsg/share_tpl.html.js"),v=navigator.userAgent,b=-1!=v.indexOf("MicroMessenger"),j=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),k=(e("biz_wap/utils/ajax.js"),e("biz_common/dom/class.js"),
e("biz_wap/jsapi/core.js")),x=e("biz_common/tmpl.js"),z=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),I=(e("rt/appmsg/getappmsgext.rt.js"),e("a/a.js")),E=e("biz_wap/utils/mmversion.js"),B=document.getElementsByTagName("iframe"),A=document.getElementById("js_content"),N=[],D=A.offsetWidth,q=D/w.getRatio();
window.logs.video_cnt=0;
for(var M=0,O=B.length;O>M;++M){
p=B[M];
var W=p.getAttribute("data-src")||"",C=p.getAttribute("src")||W;
if(C){
var R=e("pages/version4video.js");
if(0==C.indexOf("http://z.weishi.com/weixin/player.html"))C=C.replace(/width=\d+/g,"width="+D),
C=C.replace(/height=\d+/g,"height="+q),p.width=D,p.height=q,p.style.setProperty&&(p.style.setProperty("width",D+"px","important"),
p.style.setProperty("height",q+"px","important")),p.setAttribute("src",C),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(C)){
R.isShowMpVideo()||(!function(e,t){
e.onload=function(){
n(this,t);
};
}(p,C),b?N.push({
iframe:p,
src:C
}):p.setAttribute("src",C),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10)),
window.logs.video_cnt++;
continue;
}
}
}
d();
});;define('page/appmsg/not_in_mm.css', [], function(require, exports, module) {
	return ".not_in_mm .rich_media_meta_list{position:relative;z-index:1}.not_in_mm .rich_media_content{position:relative}.not_in_mm .profile_container{width:535px;position:absolute;top:100%;left:65px;font-size:14px;*margin-top:10px}.not_in_mm .profile_inner{position:relative;padding:30px 22px 36px 144px;background-color:#fff;border:1px solid #d9dadc;*zoom:1}.not_in_mm .profile_arrow_wrp{position:absolute;left:22px;top:-8px}.not_in_mm .profile_arrow{display:inline-block;width:0;height:0;border-width:8px;border-style:dashed;border-color:transparent;border-top-width:0;border-bottom-color:#d9dadc;border-bottom-style:solid;position:absolute;top:0}.not_in_mm .profile_arrow.arrow_in{margin-top:1px;border-bottom-color:#fff}.not_in_mm .profile_avatar{position:absolute;width:100px;left:24px;top:24px;height:100px!important}.not_in_mm .profile_nickname{font-size:16px;font-weight:400}.not_in_mm .profile_meta{margin-top:5px;overflow:hidden;*zoom:1}.not_in_mm .profile_meta_label{float:left;width:4em;margin-right:1em}.not_in_mm .profile_meta_value{display:block;overflow:hidden;*zoom:1;color:#adadad}.not_in_mm .icon_verify{width:16px;height:16px;vertical-align:middle;display:inline-block;line-height:9em;overflow:hidden}.not_in_mm .icon_verify.success{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/wxverify\/icon_verify_success238f07.png) no-repeat 0 0}.not_in_mm span.rich_media_meta_nickname{display:inline-block}.not_in_mm a.rich_media_meta_nickname{display:none}.not_in_mm .rich_media_inner{position:relative}.not_in_mm .qr_code_pc_outer{display:none!important;position:fixed;left:0;right:0;top:20px;color:#717375;text-align:center}.not_in_mm .qr_code_pc_inner{position:relative;width:740px;margin-left:auto;margin-right:auto}.not_in_mm .qr_code_pc{position:absolute;right:-140px;top:0;width:140px;padding:16px;border:1px solid #d9dadc;background-color:#fff;word-wrap:break-word;word-break:break-all}.not_in_mm .qr_code_pc p{font-size:14px;line-height:20px}.not_in_mm .qr_code_pc_img{width:102px;height:102px}@media screen and (min-width:1025px){.not_in_mm .qr_code_pc_outer{display:block!important}}";
});;define('page/appmsg/page_mp_article_improve_combo.css', [], function(require, exports, module) {
	return ".selectTdClass{background-color:#edf5fa!important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd!important}table{margin-bottom:10px;border-collapse:collapse;display:table;width:100%!important}td,th{word-wrap:break-word;word-break:break-all;padding:5px 10px;border:1px solid #DDD}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center}th{border-top:2px solid #BBB;background:#f7f7f7}.ue-table-interlace-color-single{background-color:#fcfcfc}.ue-table-interlace-color-double{background-color:#f7faff}td p{margin:0;padding:0}.res_iframe{display:block;width:100%;background-color:transparent;border:0}.shopcard_iframe{margin:14px 0;height:95px}.vote_area{display:block;position:relative;margin:14px 0;white-space:normal!important}.vote_iframe{display:block;width:100%;height:100%;background-color:transparent;border:0}form{display:none!important}@media screen and (min-width:0\\0) and (min-resolution:72dpi){.rich_media_content table{table-layout:fixed!important}.rich_media_content td,.rich_media_content th{width:auto!important}}.tc{text-align:center}.tl{text-align:left}.tr{text-align:right}.tips_global{color:#8c8c8c}.rich_split_tips{margin:20px 0;min-height:24px}.rich_media_tool_tips{margin-bottom:8px}.rich_media_tool{overflow:hidden;padding-top:15px;line-height:32px}.rich_media_tool .meta_primary{float:left;margin-right:10px}.rich_media_tool .meta_extra{float:right;margin-left:10px}.rich_media_tool .meta_praise{margin-right:0;margin-left:8px}.media_tool_meta i{vertical-align:0;position:relative;top:1px;margin-right:3px}.meta_praise{-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;min-width:3.5em}.meta_praise .praise_num{display:inline-block;vertical-align:top}.icon_praise_gray{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp\/O+GkJHJd4H7kr5nm\/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil\/ENST20ml8BF4Afu4z9HT3V80B\/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS\/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9\/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq\/sQqSpmgWvo82rBbTdCPeAA4N69\/noXS1XhphaBz27SPPVtapz\/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko\/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA\/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8\/GsFi3mW\/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width:13px;height:13px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto}.icon_praise_gray.praised{background-position:0 -18px}.praised .icon_praise_gray{background-position:0 -18px}.rich_split_tips{margin:20px 0;min-height:24px}.rich_media_tool_tips{margin-bottom:8px}.rich_media_tool{overflow:hidden;padding-top:15px;line-height:32px}.rich_media_tool .meta_primary{float:left;margin-right:10px}.rich_media_tool .meta_primary.article_modify_tag{margin-bottom:0;float:none;color:#bcbcbc;font-size:14px}.rich_media_tool .meta_extra{float:right;margin-left:10px}.rich_media_tool .meta_praise{margin-right:0;margin-left:8px}.media_tool_meta i{vertical-align:0;position:relative;top:1px;margin-right:3px}.meta_praise{-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;min-width:3.5em}.meta_praise .praise_num{display:inline-block;vertical-align:top}.icon_praise_gray{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp\/O+GkJHJd4H7kr5nm\/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil\/ENST20ml8BF4Afu4z9HT3V80B\/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS\/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9\/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq\/sQqSpmgWvo82rBbTdCPeAA4N69\/noXS1XhphaBz27SPPVtapz\/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko\/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA\/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8\/GsFi3mW\/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width:13px;height:13px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto}.icon_praise_gray.praised{background-position:0 -18px}.praised .icon_praise_gray{background-position:0 -18px}.rich_tips{margin-top:25px;margin-bottom:0;min-height:24px;text-align:center}.rich_tips .tips{display:inline-block;vertical-align:middle}.rich_tips .tips,.rich_tips .rich_icon{vertical-align:middle}.rich_tips .rich_icon{margin-top:-3px 5px 0 0}.rich_tips.with_line{border-top:1px dotted #e1e1e1}.rich_tips.with_line .tips{position:relative;top:-12px;padding-left:16px;padding-right:16px;background-color:#f3f3f3}.btn_primary{background-color:#04be02}.btn_primary:not(.btn_disabled):visited{color:#fff}.btn_primary:not(.btn_disabled):active{color:rgba(255,255,255,0.4);background-color:#039702}.btn_disabled{color:rgba(255,255,255,0.6)}.rich_tips.with_line{line-height:16px}.rich_tips.with_line .tips{top:-11px;padding-left:.35em;padding-right:.35em}.title_tips .tips{color:#868686;font-size:16px}.loading_tips{margin:36px 0 20px}.title_bottom_tips{margin-top:-10px}.icon_arrow_gray{width:7px}.icon_loading_white{width:16px}.icon_loading_white.icon_before{margin-right:1em}.icon_loading_white.icon_after{margin-left:1em}.btn{display:block;padding-left:14px;padding-right:14px;font-size:18px;text-align:center;text-decoration:none;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;color:#fff;line-height:42px;-webkit-tap-highlight-color:rgba(255,255,255,0)}.btn.btn_inline{display:inline-block}.rich_media_extra{overflow:hidden}.sougou_body .rich_media_area_primary{margin-top:10px}.sougou_body .rich_media_area_primary:first-child{margin-top:0}.sougou_body .rich_media_area_primary.sougou ul{padding-left:0;list-style-type:none}.sougou_body .rich_media_area_extra{margin-top:10px;background-color:#fff}.sougou_body .rich_media_area_title{font-size:16px;margin-bottom:.5em}.sougou_body .relate_article_list{font-size:15px}.sougou_body .relate_article_link{display:block;padding:.35em 0;color:#8c8c8c;-webkit-tap-highlight-color:rgba(0,0,0,0)}.sougou_body .rich_tips.discuss_title_line{text-align:left;margin-top:0;padding:20px 0 .5em;border-width:0;line-height:1.6}.sougou_body .rich_tips.discuss_title_line .tips{position:static;padding:0;color:#3e3e3e}.sougou_body .rich_tips.with_line .tips{background-color:#fff}.sougou_body .rich_split_tips{margin:0;padding:20px 0}.sougou_body .rich_media_extra .loading_tips{margin:0;padding:20px 0}.emotion_tool{position:relative;overflow:hidden}.pic_emotion_switch_wrp{margin-left:15px;margin-bottom:6px;display:inline-block;font-size:0}.pic_emotion_switch_wrp img{width:35px;display:block}.pic_emotion_switch_wrp .pic_active{display:none}.pic_emotion_switch_wrp:active .pic_default{display:none}.pic_emotion_switch_wrp:active .pic_active{display:block}.emotion_switch{margin-left:15px;margin-bottom:6px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:35px;height:35px;vertical-align:middle;display:inline-block;-webkit-background-size:35px auto;background-size:35px auto}.emotion_switch:active{background-position:0 -40px}.emotion_panel_arrow_wrp{position:absolute;margin-top:-6px;margin-left:26px}.emotion_panel_arrow_wrp .emotion_panel_arrow{position:absolute;display:inline-block;width:0;height:0;border-width:6px;border-style:dashed;border-color:transparent;border-top-width:0;border-bottom-color:#e5e5e7;border-bottom-style:solid}.emotion_panel_arrow_wrp .arrow_in{border-bottom-color:#f6f6f8;top:1px}.emotion_panel{background-color:#f6f6f8;position:relative}.emotion_panel:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e3e3e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_panel:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e3e3e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_list_wrp{overflow:hidden;position:relative;font-size:0;white-space:nowrap}.emotion_list{padding:10px 15px 0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;white-space:normal;display:inline-block;vertical-align:top}.emotion_list:last-child .emotion_item.del{position:absolute;bottom:0;right:18px}.emotion_item{display:inline-block;width:36px;height:36px;margin-bottom:5px;text-align:center;line-height:36px}.emotion_navs{text-align:center;padding-bottom:5px}.emotion_nav{display:inline-block;width:8px;height:8px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;background-color:#bbb;margin:0 5px}.emotion_nav.current{background-color:#8c8c8c}.icon_emotion{width:22px;height:22px;vertical-align:middle;display:inline-block;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/icon_emotion_panel.2x3518c6.png) no-repeat 0 0;-webkit-background-size:22px auto;background-size:22px auto}.icon_emotion.del{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:28px;height:28px;vertical-align:middle;display:inline-block;background-position:2px -62px;-webkit-background-size:28px auto;background-size:28px auto}.icon_emotion.del:active{background-position:2px -92px}.icon_emotion_single{width:22px;height:22px;vertical-align:middle;display:inline-block;-webkit-background-size:22px auto;background-size:22px auto}.icon_smiley_0{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_03518c6.png)}.icon_smiley_1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_13518c6.png)}.icon_smiley_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_23518c6.png)}.icon_smiley_3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_33518c6.png)}.icon_smiley_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_43518c6.png)}.icon_smiley_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_53518c6.png)}.icon_smiley_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_63518c6.png)}.icon_smiley_7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_73518c6.png)}.icon_smiley_8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_83518c6.png)}.icon_smiley_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_93518c6.png)}.icon_smiley_10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_103518c6.png)}.icon_smiley_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_113518c6.png)}.icon_smiley_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_123518c6.png)}.icon_smiley_13{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_133518c6.png)}.icon_smiley_14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_143518c6.png)}.icon_smiley_15{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_153518c6.png)}.icon_smiley_17{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_173518c6.png)}.icon_smiley_18{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_183518c6.png)}.icon_smiley_19{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_193518c6.png)}.icon_smiley_20{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_203518c6.png)}.icon_smiley_21{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_213518c6.png)}.icon_smiley_22{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_223518c6.png)}.icon_smiley_23{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_233518c6.png)}.icon_smiley_25{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_253518c6.png)}.icon_smiley_26{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_263518c6.png)}.icon_smiley_27{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_273518c6.png)}.icon_smiley_28{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_283518c6.png)}.icon_smiley_29{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_293518c6.png)}.icon_smiley_30{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_303518c6.png)}.icon_smiley_31{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_313518c6.png)}.icon_smiley_32{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_323518c6.png)}.icon_smiley_33{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_333518c6.png)}.icon_smiley_34{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_343518c6.png)}.icon_smiley_36{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_363518c6.png)}.icon_smiley_37{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_373518c6.png)}.icon_smiley_38{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_383518c6.png)}.icon_smiley_39{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_393518c6.png)}.icon_smiley_40{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_403518c6.png)}.icon_smiley_41{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_413518c6.png)}.icon_smiley_42{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_423518c6.png)}.icon_smiley_44{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_443518c6.png)}.icon_smiley_45{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_453518c6.png)}.icon_smiley_46{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_463518c6.png)}.icon_smiley_47{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_473518c6.png)}.icon_smiley_48{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_483518c6.png)}.icon_smiley_49{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_493518c6.png)}.icon_smiley_50{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_503518c6.png)}.icon_smiley_51{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_513518c6.png)}.icon_smiley_52{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_523518c6.png)}.icon_smiley_54{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_543518c6.png)}.icon_smiley_55{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_553518c6.png)}.icon_smiley_56{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_563518c6.png)}.icon_smiley_57{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_573518c6.png)}.icon_smiley_60{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_603518c6.png)}.icon_smiley_62{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_623518c6.png)}.icon_smiley_63{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_633518c6.png)}.icon_smiley_64{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_643518c6.png)}.icon_smiley_65{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_653518c6.png)}.icon_smiley_66{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_663518c6.png)}.icon_smiley_67{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_673518c6.png)}.icon_smiley_68{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_683518c6.png)}.icon_smiley_70{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_703518c6.png)}.icon_smiley_74{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_743518c6.png)}.icon_smiley_75{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_753518c6.png)}.icon_smiley_76{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_763518c6.png)}.icon_smiley_78{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_783518c6.png)}.icon_smiley_79{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_793518c6.png)}.icon_smiley_80{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_803518c6.png)}.icon_smiley_81{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_813518c6.png)}.icon_smiley_82{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_823518c6.png)}.icon_smiley_83{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_833518c6.png)}.icon_smiley_84{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_843518c6.png)}.icon_smiley_85{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_853518c6.png)}.icon_smiley_89{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_893518c6.png)}.icon_smiley_92{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_923518c6.png)}.icon_smiley_93{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_933518c6.png)}.icon_smiley_94{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_943518c6.png)}.icon_smiley_95{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_953518c6.png)}.icon_emoji_ios_0{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6043518c6.png)}.icon_emoji_ios_1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6373518c6.png)}.icon_emoji_ios_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6023518c6.png)}.icon_emoji_ios_3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F61D3518c6.png)}.icon_emoji_ios_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6333518c6.png)}.icon_emoji_ios_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6313518c6.png)}.icon_emoji_ios_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6143518c6.png)}.icon_emoji_ios_7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6123518c6.png)}.icon_emoji_wx_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_043518c6.png)}.icon_emoji_wx_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_053518c6.png)}.icon_emoji_wx_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_023518c6.png)}.icon_emoji_wx_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_063518c6.png)}.icon_emoji_wx_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_123518c6.png)}.icon_emoji_wx_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_113518c6.png)}.icon_emoji_ios_8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F47B3518c6.png)}.icon_emoji_ios_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F64F.03518c6.png)}.icon_emoji_ios_10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F4AA.03518c6.png)}.icon_emoji_ios_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F3893518c6.png)}.icon_emoji_ios_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F3813518c6.png)}.icon_emoji_wx_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_093518c6.png)}.icon_emoji_wx_14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_143518c6.png)}.wx_poptips{position:fixed;z-index:3;width:120px;min-height:120px;top:180px;left:50%;margin-left:-60px;background:rgba(40,40,40,0.5)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#80282828',endcolorstr = '#80282828');text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;color:#fff}.wx_poptips .icon_toast{width:53px;margin:15px 0 0}.wx_poptips .toast_content{margin:0 0 15px}.discuss_container .rich_media_title{font-size:18px}.discuss_container.disabled .btn_discuss{color:#60f05f}.discuss_container.access .discuss_container_inner{padding:15px 15px 0}.discuss_container.editing .discuss_container_inner{padding-bottom:25px}.discuss_container.editing .frm_textarea_box_wrp{margin:0 -15px}.discuss_container.editing .frm_textarea{height:78px;-webkit-overflow-scrolling:touch}.discuss_container.editing .frm_append.counter{display:block}.discuss_container.editing .discuss_btn_wrp{display:block}.discuss_container.editing .discuss_icon_tips{margin-top:0;margin-bottom:-14px}.discuss_container.editing .discuss_title_line{margin-bottom:-20px}.discuss_container.warning .counter{color:#e15f63}.frm_textarea{width:100%;background-color:transparent;border:0;display:block;font-size:14px;-webkit-box-sizing:border-box;box-sizing:border-box;height:37px;padding:10px 15px;resize:none;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.frm_textarea_box_wrp{position:relative}.frm_textarea_box_wrp:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:-1px}.frm_textarea_box_wrp:after{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.frm_textarea_box{display:block;background-color:#fff}.frm_append.counter{display:none;position:absolute;right:8px;bottom:8px;color:#a3a3a3;font-weight:400;font-style:normal;font-size:12px}.frm_append .current_num.warn{color:#f43631}.discuss_btn_wrp{display:none;margin-top:20px;margin-bottom:20px;text-align:right}.btn_discuss{padding-left:1.5em;padding-right:1.5em}.discuss_list{margin-top:-5px;padding-bottom:20px;font-size:16px;list-style:none}.discuss_item{position:relative;padding-left:45px;margin-top:26px;*zoom:1}.discuss_item:after{content:\"\\200B\";display:block;height:0;clear:both}.discuss_item .user_info{min-height:20px;overflow:hidden}.discuss_item .nickname{display:inline-block;vertical-align:middle;font-weight:400;font-style:normal;color:#727272;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;max-width:9em}.discuss_item .avatar{position:absolute;top:0;left:0;top:3px;width:35px;height:35px;background-color:#ccc;vertical-align:top;margin-top:0;border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px}.discuss_item .discuss_message{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;color:#3e3e3e;line-height:1.5}.discuss_item .discuss_message_content{white-space:pre-wrap}.discuss_item .discuss_extra_info{color:#bdbdbd;font-size:13px}.discuss_item .discuss_extra_info a{margin-left:.5em}.discuss_item .discuss_status{color:#ff7a21;white-space:nowrap}.discuss_item .discuss_status i{font-style:normal;margin-right:2px}.discuss_item .discuss_opr{float:right}.discuss_item .discuss_opr .meta_praise{display:inline-block;text-align:right;padding-top:5px;margin-top:-5px}.discuss_item .discuss_opr .praise_num{-webkit-user-select:none;user-select:none}.discuss_item .discuss_del{margin-left:.5em}.discuss_icon_tips{margin-bottom:20px}.discuss_icon_tips img{vertical-align:middle;margin-right:3px;margin-top:-4px}.discuss_icon_tips .icon_edit{width:12px}.discuss_icon_tips .icon_access{width:13px}.reply_result{position:relative;margin-top:.5em;padding-top:.5em;padding-left:.4em}.reply_result:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #dadada;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.reply_result .discuss_message{clear:both}.reply_result .nickname{position:relative;overflow:visible}.reply_result .nickname:before{content:\" \";position:absolute;left:-0.4em;top:50%;margin-top:-7px;width:3px;height:14px;background-color:#02bb00}.rich_tips.discuss_title_line{margin-top:50px}.icon_discuss_top{display:inline-block;vertical-align:middle;padding:1px .5em;border:1px solid #bdbdbd;color:#bdbdbd;border-top-left-radius:.7em 50%;-moz-border-radius-topleft:.7em 50%;-webkit-border-top-left-radius:.7em 50%;border-top-right-radius:.7em 50%;-moz-border-radius-topright:.7em 50%;-webkit-border-top-right-radius:.7em 50%;border-bottom-left-radius:.7em 50%;-moz-border-radius-bottomleft:.7em 50%;-webkit-border-bottom-left-radius:.7em 50%;border-bottom-right-radius:.7em 50%;-moz-border-radius-bottomright:.7em 50%;-webkit-border-bottom-right-radius:.7em 50%;font-size:12px;line-height:1;margin-top:-1px;margin-left:.5em}@media screen and (device-aspect-ratio:2\/3),screen and (device-aspect-ratio:40\/71){.icon_discuss_top{font-size:11px;line-height:1.1;padding-top:0}}.reward_area{padding:38px 0 20px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.reward_inner{position:relative}.reward_area_inner{margin:0 auto;position:relative;left:3px}.reward-avatar{display:inline-block;width:50px;height:50px;margin:0 auto;border-radius:50%;overflow:hidden}.reward-avatar img{width:100%;height:100%!important;object-fit:cover}.reward-author{font-size:16px;color:#000;text-align:center;margin-top:10px;line-height:1}.reward_access{display:inline-block;padding:0 1.6em;line-height:2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:16px;background-color:#dc5d4a;color:#fff;-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_access:active{background-color:#be5041;color:#e69990}.icon-reward{display:none;width:17px;height:18px;vertical-align:-2px;background-image:url(\"data:image\/svg+xml,%3Csvg width='19' height='20' viewBox='0 0 19 20' xmlns='http:\/\/www.w3.org\/2000\/svg'%3E%3Ctitle%3Eicon reward%3C\/title%3E%3Cdesc%3Ewechat reward.%3C\/desc%3E%3Cg fill='none'%3E%3Cpath d='M14.313 7.261l-.032-.004c-.462-.066-.712-.364-.824-.711-.042-.13-.06-.253-.068-.398-.009-.151-.008-.235.001-.645.022-.999-.015-1.624-.194-2.298l-.121-.386-.035-.118c-.044-.196-.184-.549-.437-.895-.44-.602-1.044-.918-1.951-.846-.963.076-1.397.848-1.406 2.11v.009c-.006.908-.022 1.375-.093 1.972-.169 1.421-.593 2.49-1.473 3.132-.617.45-1.61.688-2.962.826-.984.101-1.996.129-2.824.12l-.072-.001c-.153 0-.759.697-.759.95l-.11 7.776c-.044.569.331.917.869.917h10.741c1.054 0 1.88-.147 2.786-.693.52-.314.988-.738 1.396-1.294 1.321-1.803 1.5-3.456 1.085-7.244-.107-.982-1.029-1.976-2.161-2.132l-1.357-.145z' stroke='%23FAFAFA' stroke-width='1.9'\/%3E%3Cpath d='M9.241 15.058l-.184.044c-.153 0-.286-.084-.356-.208l-.027-.058-1.994-2.273-.02-.085c-.065-.243.221-.556.463-.476l.122.04 1.496.998c.096.063.211.099.334.099l.209-.037 4.601-3.524c.543-.148.661.002.426.529l-5.027 4.926-.045.026z' fill='%23FAFAFA'\/%3E%3C\/g%3E%3C\/svg%3E\");background-repeat:no-repeat;-webkit-background-size:contain;background-size:contain;margin-right:.5em}.reward_button{display:inline-block;margin-top:30px;padding:0 1.6em;line-height:2.2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:16px;border:1px solid currentColor;color:#fd6143;-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_button:active{color:#f46f56}.reward_button:before{content:\" \";width:17px;height:17px;display:inline-block;background:transparent url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAFNQDtUAAAABGdBTUEAALGPC\/xhBQAABglJREFUWAm1V3uIVUUY\/75z73pzdbOHhprmSmlBtkEkUffebctMxAi1pAfB3t3VhR6CaUoUPqIH\/SEJGmU+dq+gpRY9IK0Uxdy7+YcU9DDKQoxws3yVsbru3j1fv5lzZ84597kKDdydb77X\/M7Mb76ZJco1aYq\/ZGTHCOTSMkklXldjR1LJVdIYd3lTJ2N8SFoabiBY\/1BWGC7ofl5iIktjchmRa\/PlIpQdnqn4Zk\/K\/4scIq3JUdqreeroaCjOcfuROC4mKmQ0Sp0ilVgoK1b4H2GMOm8q3i7N8elaVvOZjNKY+Nk4SnPiVs8hkbW6VHyBwt5tFPm9zVRgKBOk1u0LFRCMDiNnuic\/YzSkEKrSY6bTOkuMxwUXahcWalowQDsF51NGbO5i46RsoSmwNic43THCOKg+BJI3ZaxRUg03EfM3QQzBQILxe05n6hSJSjZQKA4KZXwH7sYsQ\/2xJ4Vg5BuRYK3SKap4dJEh+NB5+X4VktAkQP47HCSTw2NMohQgyA4SvhPSlWEHPgz4NwZ10jLtKnLPJcl1P1Z6jRLn6TsSucWDG3QPy1jlkUR9xzjdGTEWvadMD2Hv5HKjDPZI3onxFZhgEOar5fQ+RR2bwPoKDwcjEx6frHZgAiY5YNilOHABYYPIiUypGC7uSBJ6AehvVr5mCcrzZPucCO3o+gnuQ2iQTOX1nYeKTVQ+iSkCJjJSfS237e4yQ9NX4glA8PMGNrnnfzSBwX4ASegvL4APY6eGBYONXDKJiOQ+1flNOzP9YILy+5JJqKn+GeXM7fv3ekHSp3p5ds5gb+z\/LZpEWlurSNzVvhskdubr8emuc4of+B00dgada0myB4mlGhyoNgbdD46N4bV7jwV1MjdZR32yFJgexqK\/gXqyqLDgMHXB+Da3Z14JBitZmhIPQP+plnPbr3bOq3vsNKHepZWxVAP8L2FLWzvTUSCvVWNvTVgU9W2TuQ1j7AACzlcW6N4BinZfz96uQeEhkXASytJJtXhYzeeQYiU5PIfbOz7wE6jM\/on2kIgTQoJj30PRqgleAmdmQQKdTRImqYckkocEVt6471fVGcdgr4mYQg6mT5TeQ+JGQkiCAUXlVPKU1rdnZqk+tyb9ddJUrypX6Sb9qGrOZJDwVbUgIN+TzKwfD14SkjfJ7S+dwFpcT4pG7uaN+\/cbddFvNsZKPUrkBpzsliJ+vUD6CLinb4Qi9gKVt64F6soKXFWrLQjmb3WJdpyF4KRXssX9CEDXVc7keVwyEGwOrvpcE3pLVR1QchWAjAV7vPUXmafPvPEr0186EKHhNm9E7I0PMCeg\/9za+uVBK5cRLgmItN57PRh7nc0rkQNW1gJ3B8Y1AbmkmGN8SXuBQeZPj9HZfz+0Buat2Jbf7dgT\/PvNlSUoS0uwlWdQwgHYeZ9qhr7Haz4LnfeSp0bUNb731Ejq7R2P91MtVgBnl2aBoGPtpMy7Uefvt+OAAKI2wHcNVJMCal9kPkLDq+t45S69eixPT7maunvw1qLRvlcZyTsVmykae5E37PmzjGdRk\/rnCcVogTYyH6f2jtGqIKlLS12Dt+cM63H+t6JYZuH8D4lzGj+8vVGwL6LJioYoHe17DSGLkOsxbuvcHgzHap3Hal2mdRFOclsmA47gBaVKpdc6\/MvfqAbeS0t9PfW72wDiGlxRTZgA5bhoUxy6TVtcVlsHIEwxi8MpvHWCaVDEloIvyxGzkmpqlivCSet9w6i3J40vnElZN0uO8wQ+ZlswrlD2jzviNFgHQsw65t2hVp8T8A5\/mWJRvMlpNp0926Mv6QvnUUNkBkV4Nh7\/VZVBIFponM3NdEbJamsAJLc1+S8C6+0LvG7fSYwm4pa8CzzaitV5yjx2fK\/SEsj6KOJQh1Tjkzh17yoJW4MVMRRxBn6X48u\/Qrxf1FS2Cg0kfRwgtlg3pmYjRwEisDXlOWKCLrZXT0TM0wYajPBiWb0X7sBqfG1y4fgmjmBrxhvF\/9sDgMOL9eWYN1GUZoyaQDuPLwTaRgDyq2ae40UN9YtJenDCfkHOgyDyTtrYsce8pIrl+g89bFNOD\/AegwAAAABJRU5ErkJggg==') 0 0 no-repeat;background-size:17px 17px;vertical-align:-3px;margin-right:4px}.reward_tips{margin-bottom:5px}.reward_user_tips{margin-top:2em}.reward_user_list{padding-top:.5em;overflow:hidden}.reward_user_avatar{display:inline-block;vertical-align:top;width:28px;height:28px;margin:0 6px 6px 0}.reward_user_avatar img{width:100%;height:100%!important}.reward_user_avatar.readmore{-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_qrcode_area{margin:38px 0 20px;padding:30px 20px;font-size:14px;border:1px solid #ebebeb}.reward_qrcode_area p{word-wrap:break-word;word-break:break-all}.reward_qrcode_area .tips_global{font-size:13px}.reward_qrcode_area .reward_money{font-size:30px;margin-top:.6em;margin-bottom:-0.1em;line-height:1;font-family:\"WeChatNumber-151125\"}.reward_qrcode_area .reward_tips{margin-top:1em;margin-bottom:0}.reward_qrcode_img_wrp{width:200px;height:200px;background-color:#fff;display:block;margin:1.5em auto 1.6em}.reward_qrcode_img{width:100%;height:100%;display:block}@font-face{font-weight:normal;font-style:normal;font-family:\"WeChatNumber-151125\";src:url('https:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/assets\/WeChatNumber-170206.ttf') format('truetype')}@media(min-device-width:414px){.reward_qrcode_area .tips_global{line-height:1.8}.reward_qrcode_area .reward_money{margin-top:.6em}.reward_qrcode_area .reward_tips{margin-top:1.2em}.reward_qrcode_img_wrp{width:224px;height:224px;margin:1.8em auto}.reward_access{line-height:44px;font-size:17px}.icon-reward{width:19px;height:20px;vertical-align:-3px}}.reward_area_primary .reward-avatar{border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px}.reward_area_primary .reward-author{margin-top:15px;font-size:17px}.rich_media_extra{position:relative}.rich_media_extra .extra_link{display:block}.rich_media_extra img{vertical-align:middle;margin-top:-3px}.rich_media_extra .appmsg_banner{width:100%}.rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.mpda_bottom_container .rich_media_extra{padding-bottom:15px}.btn_default.btn_line,.btn_primary.btn_line{background-color:#fff;color:#04be02;border:1px solid #04be02;font-size:15px}.rich_media_extra .extra_link{position:relative}.promotion_tag{background-color:rgba(0,0,0,0.51);position:absolute;display:block;height:20px;line-height:20px;font-size:14px;font-style:normal;color:#fff;padding-right:6px;text-align:right;right:0;bottom:0}.promotion_tag:before{content:'';width:14px;height:20px;position:absolute;top:0;right:100%;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_primary2c7543.png) no-repeat 0 0;-webkit-background-size:79px 20px;background-size:79px 20px;overflow:hidden}.brand_logo{position:absolute;display:block;width:24%;right:1.54%;top:0}.brand_logo img{width:100%;vertical-align:top;max-height:35px}.top_banner{background-color:#fff}.top_banner .rich_media_extra{padding:15px 15px 20px 15px}.top_banner .rich_media_extra .extra_link{position:relative;padding-bottom:10px}.top_banner .rich_media_extra .extra_link:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #d6d6d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.top_banner .rich_media_extra .extra_link:active,.top_banner .rich_media_extra .extra_link:focus{outline:0;border:0}.top_banner .rich_media_extra .appmsg_banner{width:100%;vertical-align:top;outline:0}.top_banner .rich_media_extra .appmsg_banner:active,.top_banner .rich_media_extra .appmsg_banner:focus{outline:0;border:0}.top_banner .rich_media_extra .promotion_tag{height:19px;line-height:19px;width:69px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_small24a2fe.png) no-repeat 0 0;font-size:12px;-webkit-background-size:69px 19px;background-size:69px 19px;bottom:10px;padding-left:6px}.top_banner .rich_media_extra .brand_logo{width:20%;right:2.22%}.top_banner .rich_media_extra .brand_logo img{max-height:35px}.top_banner .rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.top_banner .rich_media_extra .ad_msg_mask img{position:absolute;width:16px;top:50%;margin-top:-8px;left:50%;margin-left:-8px}.top_banner .preview_group.obvious_app{min-height:54px;position:relative}.top_banner .preview_group.obvious_app .pic_app{width:66.6%}.top_banner .preview_group.obvious_app .pic_app img{height:100%;min-height:54px}.top_banner .preview_group.obvious_app .info_app{width:33%;left:68%}.top_banner .preview_group.obvious_app .info_app .name_app{line-height:18px;font-size:13px}.top_banner .preview_group.obvious_app .info_app .profile_app{font-size:10px}.top_banner .preview_group.obvious_app .info_app .dm_app{bottom:5px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn{font-size:12px;padding-left:17px;line-height:16px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{-webkit-background-size:14px 14px;background-size:14px 14px;background-position:0 center;-webkit-background-position:0 center}.top_banner .preview_group.obvious_app .info_app .dm_app .extra_info{display:none}.wrp_preview_group{padding-top:100px}.preview_group{position:relative;min-height:83px;background-color:#fff;border:1px solid #e7e7eb;-webkit-text-size-adjust:none;text-size-adjust:none}.preview_group.fixed_pos{position:fixed;bottom:0;left:0;right:0}.preview_group .preview_group_inner{padding:14px}.preview_group .preview_group_inner .preview_group_info{padding-left:68px;color:#8d8d8d;font-size:14px}.preview_group .preview_group_inner .preview_group_info .preview_group_title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;color:#000;font-weight:400;font-style:normal;padding-right:73px;max-width:142px;display:block}.preview_group .preview_group_inner .preview_group_info .preview_group_desc{padding-right:65px;display:inline-block;line-height:20px}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar{position:absolute;width:55px;height:55px;left:13px;top:50%;margin-top:-27px;z-index:1}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar.br_radius{border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%}.preview_group .preview_group_inner .preview_group_opr{position:absolute;line-height:83px;top:0;right:13px}.preview_group .preview_group_inner .preview_group_opr .btn{padding:0;min-width:60px;min-height:30px;height:auto;line-height:30px;text-align:center}.preview_group.preview_card .card_inner{padding:0;min-height:89px}.preview_group.preview_card .card_inner .preview_card_avatar{position:absolute;width:89px;height:89px!important;margin:0;left:0;top:0}.preview_group.preview_card .card_inner .preview_group_info{padding:10px 12px 0 106px}.preview_group.preview_card .card_inner .preview_group_info .preview_group_title2{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;padding-right:0;display:block;color:#3e3e3e;font-weight:400}.preview_group.preview_card .card_inner .preview_group_info .preview_group_desc{padding-right:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3}.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_desc,.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_title{padding-right:68px;width:auto}.preview_group.preview_shop_card .shop_card_inner{padding:0;min-height:96px}.preview_group.preview_shop_card .preview_card_avatar{position:absolute;width:96px;height:96px!important;margin:0;left:0;top:0}.preview_group.preview_shop_card .preview_group_info{padding:10px 12px 0 111px}.preview_group.preview_shop_card .preview_shop_card_title{display:block;color:#3e3e3e;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3;font-size:15px}.preview_group.preview_shop_card .preview_shop_card_desc{color:#8c8c8c;position:absolute;bottom:6px;left:111px;right:12px}.preview_group.preview_shop_card .preview_shop_card_price{font-size:16px;color:#3e3e3e}.preview_group.preview_shop_card .preview_shop_card_oldprice{text-decoration:line-through;color:#8c8c8c;font-size:13px;margin-bottom:-0.5em}.preview_group.preview_shop_card .preview_shop_card_price,.preview_group.preview_shop_card .preview_shop_card_oldprice{display:block}.preview_group.preview_shop_card .preview_shop_card_btn_buy{float:right;line-height:1.75;font-size:16px;padding:0 .8em;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;margin-top:1px}.preview_group.obvious_app{width:100%}.preview_group.obvious_app .preview_group_inner{padding:0}.preview_group.obvious_app .pic_app{width:58.3%;height:100%;display:inline-block;margin-right:2%;vertical-align:top}.preview_group.obvious_app .pic_app img{width:100%;vertical-align:top;margin-top:0}.preview_group.obvious_app .info_app{display:inline-block;width:38%;color:#8a8a8a;font-size:12px;box-sizing:border-box;-webkit-box-sizing:border-box;position:absolute;left:62%;top:0;height:100%}.preview_group.obvious_app .info_app .name_app{color:#000;font-size:15px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;margin-top:3px}.preview_group.obvious_app .info_app .profile_app{line-height:10px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.obvious_app .info_app .profile_app span{padding:0 5px}.preview_group.obvious_app .info_app .profile_app span:first-child{padding-left:0}.preview_group.obvious_app .info_app .profile_app em{font-size:9px;line-height:16px;font-weight:400;font-style:normal;color:#dfdfdf}.preview_group.obvious_app .info_app .dm_app{line-height:20px;vertical-align:middle;position:absolute;left:0;bottom:5px}.preview_group.obvious_app .info_app .dm_app .ad_btn{display:block;color:#04be02;font-size:15px;padding-left:22px}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_download@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_install@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_installed@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;color:#8a8a8a;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_open@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app p{line-height:15px}.preview_group.obvious_app .info_app .dm_app .extra_info{font-size:9px}.preview_group.obvious_app .info_app .grade_app{height:11px;line-height:11px;font-size:12px;color:#888}.preview_group.obvious_app .info_app .grade_app .stars{display:inline-block;width:55px;height:11px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/star_sprite25624b.png) no-repeat 0 0;-webkit-background-size:55px 110px;background-size:55px 110px}.preview_group.obvious_app .info_app .grade_app .stars.star_half{backgroud-position:0}.preview_group.obvious_app .info_app .grade_app .stars.star_one{background-position:0 -11px}.preview_group.obvious_app .info_app .grade_app .stars.star_one_half{background-position:0 -22px}.preview_group.obvious_app .info_app .grade_app .stars.star_two{background-position:0 -33px}.preview_group.obvious_app .info_app .grade_app .stars.star_two_half{background-position:0 -44px}.preview_group.obvious_app .info_app .grade_app .stars.star_three{background-position:0 -55px}.preview_group.obvious_app .info_app .grade_app .stars.star_three_half{background-position:0 -66px}.preview_group.obvious_app .info_app .grade_app .stars.star_four{background-position:0 -77px}.preview_group.obvious_app .info_app .grade_app .stars.star_four_half{background-position:0 -88px}.preview_group.obvious_app .info_app .grade_app .stars.star_five{background-position:0 -99px}.preview_group.download_app_with_desc{border:0;color:#fff;font-weight:400}.preview_group.download_app_with_desc .preview_group_inner{position:relative;background-repeat:no-repeat;background-position:center;background-size:cover;height:100%;width:100%;box-sizing:border-box;padding:0;overflow:hidden}.preview_group.download_app_with_desc .preview_group_hd{position:relative;z-index:9;width:24%;text-align:center;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;display:box;box-orient:horizontal;box-pack:center;box-align:center;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;height:100%;float:right;margin-right:2.875%}.preview_group.download_app_with_desc .preview_group_hd .preview_card_avatar{width:45%;height:45%!important;margin:0;border-radius:18%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{display:block;font-weight:400;font-size:12px;padding-top:4%;padding-bottom:8%;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{display:block;margin:0 auto;font-size:14px;padding:6.5% 0;line-height:1;width:72%;text-align:center;border:1px solid #fff;border-radius:5px;color:#fff;-webkit-tap-highlight-color:transparent}.preview_group.download_app_with_desc .preview_group_hd_inner{-webkit-box-flex:1;-webkit-flex:1;flex:1}.preview_group.download_app_with_desc .preview_group_btn.with_processor{position:relative;overflow:hidden}.preview_group.download_app_with_desc .preview_group_btn.with_processor .btn_processor{display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:#04be02}.preview_group.download_app_with_desc .preview_group_btn.with_processor .btn_processor_value{position:relative}.preview_group.download_app_with_img .preview_card_avatar{box-shadow:0 -1px 2px rgba(0,0,0,0.2)}.preview_group.download_app_with_desc{overflow:hidden}.preview_group.download_app_with_desc .preview_group_bg{width:100%;height:100%;position:absolute;background-repeat:no-repeat;background-position:center;background-size:cover;z-index:0;-webkit-filter:blur(30px);-moz-filter:blur(30px);-o-filter:blur(30px);-ms-filter:blur(30px);filter:blur(30px)}.preview_group.download_app_with_desc .preview_group_bd{position:absolute;left:2.875%;right:26%;top:46%;transform:translateY(-50%);-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);text-align:center}.preview_group.download_app_with_desc .preview_group_ft{position:absolute;left:2.875%;right:26%;bottom:26%;transform:translateY(50%);-webkit-transform:translateY(50%);-moz-transform:translateY(50%);-ms-transform:translateY(50%);text-align:center}.preview_group.download_app_with_desc .preview_group_desc{display:block;font-size:17px;line-height:1.5;width:12em;margin:0 auto;overflow-x:hidden;white-space:nowrap}.preview_group.download_app_with_desc .preview_group_download_info{display:inline-block;font-size:9px}.preview_group.follow .preview_group_inner .preview_group_info .preview_group_desc{display:block}.preview_group.follow.with_tips .preview_group_desc{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.follow .weak_tips{color:#bbb}.btn_plain_primary{color:#04be02;border:1px solid #04be02}.btn_plain_primary:active{border-color:#039702}.mpda_card .btn{padding:0;font-size:15px}.mpda_card .btn_inline{width:4em;line-height:2}.mpda_card .cardticket_hd{background-color:#fff;border-top-left-radius:5px;-moz-border-radius-topleft:5px;-webkit-border-top-left-radius:5px;border-top-right-radius:5px;-moz-border-radius-topright:5px;-webkit-border-top-right-radius:5px;border:1px solid #ececec;border-bottom-width:0}.mpda_card .cardticket_hd .radius_avatar{width:45px;height:45px}.mpda_card .cardticket_hd .cell_hd{padding-left:12px}.mpda_card .cardticket_hd .cell_bd{font-size:17px;padding-left:.5em}.mpda_card .cardticket_hd .cell_ft{padding-right:10px}.mpda_card .cardticket_ft{position:relative;margin-top:10px;padding:.35em 12px;font-size:12px;background-color:#fff;border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;-webkit-border-bottom-left-radius:5px;border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;-webkit-border-bottom-right-radius:5px;border:1px solid #ececec;border-top-width:0}.mpda_card .cardticket_theme{position:absolute;top:-10px;left:8px;right:8px;height:10px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle290773.png) no-repeat 0 0;background-repeat:repeat-x;-webkit-background-size:10px auto;background-size:10px auto}.mpda_card .cardticket_theme:before{content:\" \";position:absolute;left:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_left290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}.mpda_card .cardticket_theme:after{content:\" \";position:absolute;right:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_right290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}@media(max-width:354px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:16px;line-height:1.4}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{padding-top:3%;padding-bottom:6%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{font-size:13px}}@media(min-width:400px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:18px}}.wx_flex_layout{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.wx_flex_ft{text-align:center}.mod_follow_with_img .wx_flex_ft{width:32%}.mod_follow_with_img .fwi_thumb{margin:0;display:block;width:100%}.mod_follow_with_img .radius_avatar{width:35px;height:35px;padding:0}.mod_follow_with_img .radius_avatar img{margin:0}.mod_follow_with_img .fwi_nickname{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;display:block;margin:.2em 1em .5em;font-weight:400;font-size:12px;color:#8c8c8c}.mod_method117 .wx_flex_ft{width:30.435%}.mod_method117 .fwi_thumb{margin:0;display:block;width:100%}.mod_method117 .radius_avatar{width:35px;height:35px;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;padding:0}.mod_method117 .radius_avatar img{margin:0;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px}.mod_method117 .fwi_nickname{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;display:block;margin:.3em 1em .5em;font-weight:400;font-size:12px;color:#8c8c8c}.wx_min_plain_btn{display:inline-block;vertical-align:middle;padding:0 .85em;line-height:1.6em;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px}.wx_min_plain_btn.primary{color:#1aad19;border:1px solid #1aad19}.wx_min_plain_btn.primary:active{color:rgba(26,173,25,0.6);border-color:rgba(26,173,25,0.6)}.btn_progress{position:relative;overflow:hidden}.btn_progress.primary:active{color:#1aad19;border-color:#1aad19}.btn_progress_inner{position:absolute;left:0;top:0;bottom:0;overflow:hidden;-webkit-transition:width 1s;transition:width 1s}.btn_progress_bd{position:absolute;top:0;left:0;color:#fff;background-color:#1aad19;text-align:center}.icon26_weapp_white{display:inline-block;width:14px;height:14px;background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAY1BMVEVHcEz\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/80LMUcAAAAIHRSTlMAfBg4AeNjmS\/2\/PDnrcyG1Qt1az8ys4MhUcLc6UWcl7QkidAAAADFSURBVHhetdFJqsMwEEVRWZ0luYm79E5y97\/Kz6cQQXaATPJGDw4UpZL6OuN8a+O9vuzFOACIk91IiORUpdgB6Pz13EAyBT0A\/1+0g66gCnppHtaCXvCUyQvEgmqopR1g+Ei2SnBQkuNs3hR6oNXynBMknWl0QBNEGsCNmTRwEtEt0If3wGU6qrwNqbLFhjlD3mZPERZpT3gVtIKX1m8P3oHTcjh4FGQSNOer74Bh84MVOTGoMnaKIs6oXS71Pa63eVS\/zR\/btROXGlgZggAAAABJRU5ErkJggg==);background-size:cover;background-repeat:no-repeat;vertical-align:middle;margin-right:-2px}.da_area{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fcfcfc;border:1px solid #ebebeb;-webkit-user-select:none;user-select:none;font-size:17px}.da_area .da_inner{position:relative;width:100%;transition:opacity .6s;-webkit-transition:opacity .6s}.da_area .da_bd{padding:8.5px 10px;width:100%;position:relative;border-top:1px solid #ebebeb;box-sizing:border-box;white-space:nowrap;display:flex;justify-content:space-between;align-items:center}.icon26_weapp_blue{display:inline-block;width:12.5px;height:12.5px;background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ\/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF\/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy\/Td6GRD\/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ\/kOb7rnhO9AtOOdpnjHkyO6448\/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA\/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU\/hWz9SCYNwwojpZsX4zaqU5bItDp\/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9\/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A\/k2uEje\/oyrcTfoBtANQk\/d6iE\/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl\/cVVBnEptgppxGzumgpkDA3bQiW\/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH\/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe\/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r\/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO\/RwlGY+ISbg\/L85q8KwuGOueX8ke6AlIUHX1CJ+7l\/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==);background-size:cover;background-repeat:no-repeat;vertical-align:middle;margin-right:4px;position:relative;top:-0.5px}span.img_bg_cover{background-repeat:no-repeat;background-position:center center;background-size:cover}.ct_mpda_wrp{margin:38px 0 20px}.ct_mpda_area{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fcfcfc;border:1px solid #ebebeb;-webkit-user-select:none;user-select:none}.ct_mpda_placeholder{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:100%}.ct_mpda_tips{color:#d8d8d8;text-align:center;font-size:15px}.ct_mpda_inner{position:relative;width:100%;opacity:0;transition:opacity .6s;-webkit-transition:opacity .6s}.ct_mpda_area.show .ct_mpda_inner{opacity:1}.ct_mpda_main_img{width:100%;min-height:100px;display:block}.ct_mpda_hd .page_video{min-height:0}.ct_mpda_bd{width:100%;position:relative;border-top:1px solid #ebebeb;box-sizing:border-box;white-space:nowrap}.ct_mpda_logo{width:35px;height:35px;display:inline-block;margin:15px 10px;vertical-align:middle;border-radius:50%;overflow:hidden}.ct_mpda_desc_box{font-size:0;display:inline-block;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;margin-left:-60px;padding-left:55px;padding-right:80px;box-sizing:border-box;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.ct_mpda_btn_more{position:absolute;right:10px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);display:inline-block;color:#576b95;font-size:13px;border:1px solid #576b95;border-radius:3px;line-height:2.2;padding:0 .75em}.ct_mpda_btn_more:active{border-color:#354567;color:#354567;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_title{font-size:14px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ct_mpda_details{display:inline-block;vertical-align:top;font-size:12px;color:#878787;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_details:after{content:'';display:inline-block;width:4px;height:4px;border-width:0 1px 1px 0;border-style:solid;border-color:#878787;-webkit-transform:rotate(45deg) translateY(-3px);transform:rotate(45deg) translateY(-4px);margin-left:3px}.ct_mpda_btn_about{display:none;font-size:13px;line-height:2.8;padding:0 1em;background:#fff;color:#576b95;border:1px solid #dfdfdf;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);border-radius:3px;position:absolute;bottom:-28px;left:55px;z-index:9;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_btn_about:active{background-color:#ececec}.db{display:block}.qqmusic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.qqmusic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.qqmusic_area .pic_qqmusic_default{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;width:37px;height:37px;display:none}.qqmusic_area.unsupport .unsupport_tips{display:block}.qqmusic_area.unsupport .pic_qqmusic_default{display:inline-block}.qqmusic_area.unsupport .icon_qqmusic_switch{display:none}.qqmusic_wrp{border:1px solid #ebebeb;line-height:1.6}.qqmusic_bd{position:relative;background-color:#fcfcfc;overflow:hidden}.qqmusic_ft{text-align:right;background-color:#f5f5f5;border-top:1px solid #ebebeb;line-height:2.5;overflow:hidden;font-size:11px;padding:0 .5em}.play_area{float:left;width:60px;height:60px;margin-right:12px;position:relative}.qqmusic_thumb{display:block;width:60px;height:60px!important}.access_area{display:block;color:#8c8c8c;min-height:60px;overflow:hidden;margin-right:10px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.qqmusic_songname,.qqmusic_singername{display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.qqmusic_songname{padding:7px 0 3px;margin-bottom:-4px;font-size:16px;color:#3e3e3e}.qqmusic_singername{font-size:14px;margin-right:20px}.qqmusic_source{position:absolute;right:6px;bottom:6px}.qqmusic_source img{width:13px;height:13px;vertical-align:top;border:0}.qqmusic_love{position:relative;float:right;margin:10px 0 0 10px;height:54px;color:#607fa6;width:53px;text-align:center;font-size:13px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png) no-repeat 0 0}.qqmusic_love:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.qqmusic_love .icon_love{margin-top:16px}.qqmusic_love .love_num{display:block}.icon_qqmusic_switch{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;line-height:200px;overflow:hidden;cursor:pointer;width:37px;height:37px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAADeCAMAAACt+WYWAAABPlBMVEUAAAAAAAD\/\/\/8vLy\/09PT\/\/\/\/\/\/\/\/+\/v5xcXH\/\/\/9ZWVn5+fm7u7slJSXm5ub\/\/\/\/\/\/\/\/\/\/\/9tbW0WFhb\/\/\/+ioqL\/\/\/\/\/\/\/\/\/\/\/9lZWVGRkb\/\/\/\/\/\/\/\/\/\/\/\/39\/f\/\/\/\/X19efn5+cnJyUlJT\/\/\/\/p6en9\/f37+\/v\/\/\/\/\/\/\/+AgID\/\/\/\/\/\/\/\/\/\/\/\/c3Nz\/\/\/92dnbBwcH\/\/\/\/w8PD\/\/\/\/\/\/\/\/Ly8vFxcX\/\/\/\/\/\/\/\/\/\/\/9eXl7\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/6+vpCQkLt7e3f39\/\/\/\/+FhYW\/v7+0tLT\/\/\/\/\/\/\/\/\/\/\/\/R0dH\/\/\/\/Ozs62trZqamr\/\/\/\/\/\/\/9JSUn\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/g4OCqqqqnp6fw8PDw8PD\/\/\/\/Hx8fDw8O4uLj\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/9lS7ogAAAAaXRSTlNmAPty7u0F94oHgfS1b93hvROIayal8d2fhXpTSALy0s6ioZyT4fv4uqqSkGc505aNuurpzsjDvrSbjIJwbGNYGxT3eeXW1JS4seTYycfFxbGIh4F7d05APDMiDNaqqOroysC8s62CWy61f9DEAAAGCUlEQVR42qzY50IaQRSG4cMu7NKkiYACgopi771rNMbEmGI3vee9\/xuIGhOUsmyZ7x9\/HpZhduacIz6rJAvrleGn8YCmzWbnR0620j6LtKZC55US9Ymv5ENOqYuVAKANvnw9kAo\/0fWetemupfdVIFC5ckAZv0rAp2ejHVKXYHQPSFzapTazEFl6I83zZrEKid92qKsF8H\/olNbRZ0y0t6F2VKiiEemSNtEXITthTaXn0RZ1aZ\/pObRxKyqfwR8UW+l8BTmjJbUBk7rYTdcQy6EW1FuIioMEd0m8e0zVpI\/iKN0REkYTagMGxGHCEXKNVB4+iuMEhzipp9IZouIiA2gXj6nQPJPiKjM8Tz6iKvh1d1TnID8eUleaFhSXCZsUHlALLIrrRHlh\/Kc2iejuqU4\/6\/8oI0uXeMgAs6F76hd+8ZTPjN9TJT54o7rIFu+oCyKd3qjOXgp31ApLrb+vGpu2tU9zt1QowBtplV3gld7+iCATuqHO+SQtA0Ckr601R\/6GqvCsDQWxcBvqGZUbqsRoWwrtmfU\/M0rJJ0m0jvYU+A+sqA6NHSkwKHYomHwirTNIQdZ5aZOiarGTX7IuU7y2S8Fey6PoNVMyzIBtymKTDTAsT0k5oejtl2ZJ8VTihB1REGu2\/GHiEuCJQ4qyNOYJAdHQVVA6mgsqpregZulRsew9zEqWNRWbYY2szDOtYotOMy8jdNmlqodWx\/uInLCk4nVe4qds8V68HzLyni1JU7VBaTNtLqUqafHFCXo\/kIPEfeJbIer9mvhO7obKsyctE7F3eckeW+3uwY\/VwWkRu\/egr8KieMxXVny31BVV3ZvUscvEHeVLMOONinJ8XxRdYuoeH6pwT\/kS3lbrG198\/6jfGtPupTWNy1qF\/JY599VajJyvRoWyvHK\/5oHkA8o3obktkkc1zh+3S+MMBd1IPb2s1jdxOXa7nUv6HMdGPWUsEwk73lGDvEg2dqmhBJGgw2ca5Pl2s975XYKhAUfrNMfzdPOO3sjBjP39NdrLi+2WI4sTjUG7CxbVOE5aDFIunmNG7TzYWgxWDcvxTvIH+NuuWMc3jcB526FT4QV87uq0gqIRyCVtjMKM9VnonWm1Ybu\/7sKXS5sDutB4FphrNqD7vgccFxyMDYuFXKZxbLhfBTIrE46HmfnKU+oTz21ZDDOtslNYn6qNWH86HrHWYkxsri6XbqVAvLS8ujlhuKPSZ8MmdTGHz9JOqeTGEYC\/HO0PhntuVj0c7I+W\/QBHG0kH1PaYCUPlvlOpy2lfeQjMsW2b1M6UBrG+jhZbvS8G2tSODao4HoDJlGVdNgmB8WI76noBYt1ti6AYLFxbU\/lMrV2wTH8vmbwFVRyDfV1sRd+HsWIryhhBOxTbOdQYMZpT7xKYB+IgB2aLaa2RIJISR0k1n9YWR1xcqeEII8UGagwzJY6TMhmrp\/JoB+IiBxr5x9R1hkNxlUMy1w+p4gL74jL7LBQfUOP06m4pvZfxGrUToF9cp5\/Azn9qiph4SIypf9S2RrcXqhtt+54aY1I8ZZKxv1TSJOWNCmIm76gNYuIxMTbuqCOaN7R+APA3fGpMH0e3VJqhDstuvuFTYzqGSN9QZ5TFKyVlzm6oYfq8U30M+8QwOfVOnWIaMoFfvFPiZ0I2KaugymzKKlEVVJRVWaZfBdXPspQIqqCClCRO2CtVG7H2qKB6aiNWr5SOppBS+AMVLrvCzaBwiyp8cRS+zgoPGYVHn7oDWeE1ofDyUnelKrzoFZUfKcykuqJIYammroBUWNaqK7YVtgDqGhN17ZK6Jk5ha6mu4VXXhqsbDqgbWSgbpKgb7ygYOqX+tGvHJgDDQBRDG0\/jzbz\/AikVSMBghVS6AVTa8HmMTl9OYX6g+3029GOmn1iztdnabG22Nlubrc3WutLe1nLa1s6xHjfmka2ldG8d2dr1ehtbq1PYWpvC1uoUtlansLU6ha3VKWytTmFrdQpba1MMvz6FrdUpbK1OYWt1ClurU9hancLW6hS21qewtfpBxtb6bwJbuzlpa7lsbbY2W5utzdZma7O1e1t7AVSPynzIx\/HfAAAAAElFTkSuQmCC) no-repeat 0 0;-webkit-background-size:37px auto;background-size:37px auto}.qqmusic_playing .icon_qqmusic_switch{background-position:0 -74px}.qqmusic_playing_pause .icon_qqmusic_switch{background-position:0 -37px}.icon_love{width:12px;height:12px;vertical-align:middle;display:inline-block;margin-top:-0.2em;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png) no-repeat 0 0;-webkit-background-size:12px auto;background-size:12px auto}.loved .icon_love{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png);background-position:0 -17px}.db{display:block}.icon_share_audio_switch{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAaVBMVEUAAAAarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRlIa6J1AAAAInRSTlMA9wYa38QR7ZJnMK1IIqBsO3fXDbSGQudZz5fKpV0rfbpRlHIjYQAAA35JREFUWMPFWduyqjAMDS0tgtwEFBGv\/P9Hntmh3cWDTYsMs\/Oio3SRy0qapuCU7PXIRdUGQxCFncgfrwzWCb\/l4TCTML\/xbxFlIQariEJ+AZnkwUBKkCdLIZvBQ5olsPw61Uhc4vTOa4Ca39P4IqYWXH2dyw5mWXUs2ez\/8liZVx6YD2bW6wXRzmpesov0U70HxW5azTBmpD1xqJW9uUzfaS0Lp1ms0Nru6Nfv9WPSi8lahT2BKoWyvARPKZUPhLRiduq9ckHaKds6y5pa6XmARXJQutaEP4MzLJTzyJfmk193I2YKiyUdUXcf+OnCdKPO+JqNvxO2kx4YNcr+c2jvjpE7Wv27W4uRS\/C1jFEu3mpdhJyX34PWISY3ByNj\/SxhhZRjfZ0UMkUJt3Bxx08rJU2xbFB16YEZDiG3JSy6sHlXNPbCHIbOVpHiN1VzjBLzKOCkmxjGKld6B4oNbjkiqi3rkJeBNN8jBj7SUEaxyGgnjE1OkS0mHkUAgd5X\/qWF80mWR7PaOY0410GrnHHXVHpSqlZII521RzeXqtpkTkgEEitIiwF1YeLDJgQnIldbgAx5wMBj5z4br+aWB5GdGbxUxGjUp6ESLmxhJsaMFzx+Pi5+VIpN6bTUlcvPfw\/InXlvjO5MjsdE\/ucg6DjxRlEJY4Wb0J1IlnR0ZoXGEHF\/6l1I68d+vj3ho9xH0mO+cjumNiMxvg\/tTOWYcIAkqCl+XjRbtH7CHv4aCQrIQIui3TCxNPyN1BMXfhQFFxCgJ\/yzmYAaTpGgEZpPoOq60GJctfkRaX5IBApRVTNTm\/TvnYHqCEoh6kMzUCuNxnUUpVzkB\/2+\/Pc5iTpT5PdNUx78FrMT6kymqbugmEpxNZU4JXaph7v0GbOGxJQ3SZU+ryINSWT8iAt6skg7txPD1wCJN\/rrQG0nZuNzo54nHQOnNj6zRTtRj5Pe5klu0d7NBGTThvFENhNE20NQS5BtD9GgUdQqyQZtaSuZ4bIr1fUGcmHTCz1SRpJNL9GeE3xNHe35\/CDhRj04DhLzI48b9eI48mxxONvyGLn+wGtsLTY5mm87RFg\/7jhNxh3bD2aANWtHSFsOu7Yfy60fIG4\/6lw\/lN14fOwedJdWXxKD7m1H8u7LAwZMZsn88mCDa46\/v5DZ6OoIhcf7dg7Y7mPalb7XcVEwDEFU+V3H\/QOplcP+ctPpgwAAAABJRU5ErkJggg==) no-repeat 0 0;width:42px;height:42px;vertical-align:middle;display:inline-block;-webkit-background-size:42px auto;background-size:42px auto;overflow:hidden;color:transparent}.icon_share_audio_switch:before{content:\"\u64ad\u653e\u8bed\u97f3\"}.icon_share_audio_switch_accessibility{position:absolute;width:20px;height:20px;left:-9999em}.icon_share_audio_switch_accessibility:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_playing .icon_share_audio_switch{background-image:url(data:image\/gif;base64,R0lGODlhVABUAPfJAButGiKwIe747m7Kbe\/47\/r8+vj7+J3bnB+vHqDcny20LByuG+j16Pz9\/HvPeiOwIk\/ATuT05FLBUTa3Np7bnTm4OCqzKdXv1ff79ySwI8Lowi+1Lj66Pb3mvdvx23nPeaTepMjqyLXktVzEW63hrTW2NEu+So7WjdLu0j66PrzmvKrgqn7QfeL04p\/cnkm+SCiyJ7\/nvmTHYyGwIPn8+fX69d7y3vb69iWxJE2\/TPL58iuzKqzgrHjOeEW8RPT69PH58ZXYlNDtz4bThSyzK+337eb15mLGYdbv1mnJaW\/Lb8bqxja3NeX15V3FXPD48GHGYfP689fw11HAUHzQe3fOd0q+STi4N8rrytPu01\/FXz25PGzKa17FXez37CCvH6ngqaDcoOn26ODz3x6vHZLXkiaxJef150y\/S+Hz4NDt0E\/AT77nvrTjtJfZlnrPeje3N0K7QWvKaoXThLvmu8fqxmXHZIPSg5bZlavgq8\/tz9zx3JzbnI\/WjtHu0Ue9RkS8Q93y3ZTYk6LdovH58FfDV2DGYInUiX3QfIfThmfIZtnw2Dq4OZDXkLrlulDAUIzVi43VjG\/LbsPpw\/n7+XTNc1TBUx6uHcDnv3DLcDG1MN\/y31\/FXsjqx2jJaFPBUi60LS60LljDWHXNdGbIZTS2M6\/hrnfOdke9R9Tv1FbCVWPHYkC6P1rEWbDir0a8RVXCVMnryYvVi4jUiMHowVnDWMvry+v36zO2Mqjfpx2uHGfIZyeyJsDowLHisZHXkZPYk7nluXbNddnw2fv8+4fUhzC1LxqtGf39\/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH\/C05FVFNDQVBFMi4wAwEAAAAh\/wtYTVAgRGF0YVhNUDw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzEyYzBkMi03NGJlLTQ5MTEtYmQyMi1lNmI4ZTlhZmQ5ZGIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkUzMTAyRkEyMjg0MTFFN0JDNzBCMEY5NjNCMDhDQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkUzMTAyRjkyMjg0MTFFN0JDNzBCMEY5NjNCMDhDQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NzEyYzBkMi03NGJlLTQ5MTEtYmQyMi1lNmI4ZTlhZmQ5ZGIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODcxMmMwZDItNzRiZS00OTExLWJkMjItZTZiOGU5YWZkOWRiIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af\/+\/fz7+vn49\/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M\/OzczLysnIx8bFxMPCwcC\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)}.share_audio_playing .icon_share_audio_switch:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_playing .icon_share_audio_switch_accessibility:before{content:\"\u505c\u6b62\u64ad\u653e\"}.share_audio_context{background-color:#fcfcfc;padding:14px 15px 6px;font-size:16px;position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_context:before{content:\" \";position:absolute;top:0;left:0;border:1px solid #e0e0e0;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;width:200%;height:200%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0}.share_audio_switch{margin:-10px 15px 0 0;position:relative;z-index:1}.share_audio_info{position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_title{display:block;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;min-height:1.6em;word-wrap:break-word}.share_audio_tips{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;padding-bottom:6px;font-size:12px;color:#8c8c8c}.share_audio_progress_wrp{height:2px;margin-right:7px;position:relative;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_progress{height:100%;background-color:#ebebeb;position:relative;width:100%;padding-left:7px;-webkit-box-sizing:initial!important;box-sizing:initial!important}.share_audio_progress_inner{background-color:#09bb07;height:100%;position:absolute;top:0;left:0;z-index:1}.share_audio_progress_buffer{position:absolute;top:0;left:0;bottom:0;background-color:#d9d9d9}@-webkit-keyframes slidein{from{-webkit-transform:translateX(-50%);transform:translateX(-50%)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes slidein{from{-webkit-transform:translateX(-50%);transform:translateX(-50%)}to{-webkit-transform:translateX(0);transform:translateX(0)}}.share_audio_progress_loading{position:absolute;top:0;bottom:0;left:0;right:0;overflow:hidden;display:none}.share_audio_progress_loading .share_audio_progress_loading_inner{position:absolute;top:0;bottom:0;left:0;-webkit-animation:slidein 6s linear infinite normal;animation:slidein 6s linear infinite normal;width:200%;max-width:none!important;background-image:-webkit-repeating-linear-gradient(-15deg,#d9d9d9,#d9d9d9 2px,#ebebeb 2px,#ebebeb 4px);background-image:repeating-linear-gradient(-15deg,#d9d9d9,#d9d9d9 2px,#ebebeb 2px,#ebebeb 4px)}.share_audio_progress_handle{z-index:2;position:absolute;width:14px;height:14px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:rgba(9,187,7,0.15);top:50%;margin-top:-7px;margin-left:-3.5px;cursor:pointer;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.share_audio_progress_handle:before{content:\" \";width:8px;height:8px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:#09bb07;position:absolute;left:50%;top:50%;margin-top:-4px;margin-left:-4px}.share_audio_desc{color:#b2b2b2;overflow:hidden;padding-top:6px;font-size:12px}.share_audio_desc em{font-weight:400;font-style:normal}.share_audio_length_current{float:left}.share_audio_length_total{float:right}.share_audio_length_total:before{position:absolute;left:-9999em;content:\"\u603b\u65f6\u957f\"}.topic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.topic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.topic_area.unsupport .unsupport_tips{display:block}.topic_wrp{border:1px solid #ebebeb;line-height:1.6;background-color:#fcfcfc;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden;padding:8px 10px;display:block}.topic_thumb{float:left;width:75px;height:100px;margin-right:20px;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}.topic_content{position:relative;display:block;overflow:hidden;height:100px}.topic_title{font-weight:400;font-size:16px;color:#3e3e3e}.topic_desc{color:#8c8c8c;font-size:14px}.topic_title,.topic_desc{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.topic_info{position:absolute;bottom:0;left:0;right:0;color:#8c8c8c}.topic_info_primary{float:left;margin-right:.5em;font-size:14px}.topic_info_extra{float:right;margin-left:.5em;font-size:14px}.icon_topic{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/topic\/icon_topic.2x2e4987.png) no-repeat 0 0;width:10px;height:11px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto;margin:-2px 5px 0 0}.iframe_full_video{position:fixed!important;left:0;right:0;top:0;bottom:0;z-index:1000;background-color:#000;margin-top:0!important}.video_iframe{display:block}.video_iframe+.img_loading{display:block}.video_ad_iframe{border:0;position:absolute;left:0;top:0;z-index:100;width:100%;height:100%;background-color:#fff}@media screen and (device-aspect-ratio:2\/3),screen and (device-aspect-ratio:40\/71){.meta_original_tag{padding-top:0}}@media(min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.mm_appmsg .rich_media_inner,.mm_appmsg .rich_media_meta,.mm_appmsg .discuss_list,.mm_appmsg .rich_media_extra,.mm_appmsg .title_tips .tips{font-size:17px}.mm_appmsg .meta_original_tag{font-size:15px}}@media(min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.mm_appmsg .rich_media_title{font-size:25px}}@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){.rich_media_area_extra{padding-bottom:34px}}@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:landscape){.rich_media_area_primary{padding:20px 59px 15px 59px}.rich_media_area_extra{padding:0 59px 21px 59px}}@media screen and (min-width:1024px){.rich_media{width:740px;margin-left:auto;margin-right:auto}.rich_media_inner{padding:20px}body{background-color:#fff}}@media screen and (min-width:1025px){body{font-family:\"Helvetica Neue\",Helvetica,\"Hiragino Sans GB\",\"Microsoft YaHei\",Arial,sans-serif}.rich_media{position:relative}.rich_media_inner{background-color:#fff;padding-bottom:100px}}@media screen and (min-width:1024px){.rich_media_meta{max-width:none}a.rich_media_meta_nickname{display:inline-block!important}span.rich_media_meta_nickname{display:none!important}.rich_media_content{min-height:350px}.rich_media_title{padding-bottom:10px;margin-bottom:14px;border-bottom:1px solid #e7e7eb}.discuss_container.access{width:740px;margin-left:auto;margin-right:auto;background-color:#fff}.discuss_container.editing .frm_textarea_box{margin:0}.frm_textarea_box{position:relative}.frm_textarea_box:before{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.frm_textarea_box:after{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5);left:auto;right:-2px}.rich_media_meta.nickname{max-width:none}.rich_tips.with_line .tips{background-color:#fff}}.text_unselecet{-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;user-select:none}.pay_reading_area{padding:60px 8px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.pay_tit_tips_wrp{position:relative}.pay_tit_tips_wrp:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e0e0e0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.pay_tit_tips{position:relative;top:-0.75em;padding:0 .5em;background-color:#fff;color:#8c8c8c}.pay_tit_sub_tips{word-wrap:break-word;word-break:break-all;margin:-12px 0 10px}.btn_pay_reading{width:180px;height:35px;line-height:35px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;color:#0aba07;border:1px solid #0aba07;margin:5px 0 14px 0;display:inline-block}.btn_pay_reading.disabled{border-color:#d5d6d7;color:#c4c2c5;background-color:#fbfbfd}.pay_tips{font-size:14px}.pop_tips .inner{width:280px;box-sizing:border-box;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:14px;background-color:#f7f7f9;position:fixed;left:50%;top:28%;margin-left:-140px;z-index:20}.pop_tips .inner .tips_title{font-size:16px;display:block;vertical-align:middle;max-width:98%;padding:15px 10px 0;color:#3e3e3e;text-align:center}.pop_tips .inner .tips_con{color:#888;font-size:14px;padding:10px 15px}.pop_tips .inner .tips_opr{line-height:50px;font-size:18px}.pop_tips .inner .tips_opr .ft_btn{position:relative;width:280px;display:block;text-align:center;color:#0aba07}.pop_tips .inner .tips_opr .ft_btn:before{content:\" \";position:absolute;top:0;right:0;height:1px;border-top:1px solid #ececec;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);left:0}.pop_tips .mask{width:100%;height:100%;position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.4);z-index:1}.wx_poptips_wrp.pay_reading{top:50%;margin-top:-60px}.wx_poptips_wrp.pay_reading .toast_content{margin-top:75px}.weui_loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:weuiLoading 1s steps(12,end) infinite;animation:weuiLoading 1s steps(12,end) infinite;background:transparent url(data:image\/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;-webkit-background-size:100%;background-size:100%}@-webkit-keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}@keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}.load_img_wrp{display:inline-block;font-size:0;position:relative;font-weight:400;font-style:normal;text-indent:0;text-shadow:none 1px 1px rgba(0,0,0,0.5)}.load_img_wrp img{vertical-align:top}.base_loading_opr{position:absolute;top:50%;left:50%;margin-top:-15px;margin-left:-15px}.weui_loading.base_img_loading{width:30px;height:30px}.base_reload_opr{display:block;position:absolute;top:50%;left:50%;text-align:center;margin-top:-32px;margin-left:-28px}.base_reload_opr .base_img_reload{display:inline-block;width:40px;height:40px;background-image:url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD\/\/\/9paWkyMjL\/\/\/\/\/\/\/\/\/\/\/\/29vb\/\/\/\/09PTn5+fh4eGvr6\/\/\/\/\/6+vqZmZm8vLz39\/fj4+P8\/PyBgYH\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Gxsb\/\/\/\/\/\/\/\/\/\/\/\/v7+\/MzMzr6+v\/\/\/+4uLj\/\/\/\/o6OhNTU3Y2NjQ0ND9\/f35+fn\/\/\/\/\/\/\/\/\/\/\/\/t7e3\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/z8\/Pb29v\/\/\/\/y8vLw8PDU1NT\/\/\/\/\/\/\/\/ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp\/K+L4DBxUDZQkjInpB+7\/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ\/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe\/pxsLCvfdR7HNvHU30WldQebill\/Pph9ben3t\/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe\/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ\/uRL+QiTBKbIMaLCxPq6n6lKz\/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb\/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP\/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b\/c+uss1iFWsaH5fYZtU0g6XrxUzj\/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2\/b\/thee7vy2O2FTa\/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0\/XH5B1c4zX\/WEj5\/f1R6LdH9xef7x8\/SF410f1139Q+P+fPa74ONPBJ6Q\/+TfzjGYmPq8AAAAASUVORK5CYII=');background-size:cover;background-repeat:no-repeat}.base_reload_opr .desc{font-size:14px;color:#888;margin-top:10px}.bg_gray_wrp{position:absolute;top:0;left:0;right:0;bottom:0;background-color:#eeedeb}.gif_img_wrp{display:inline-block;font-size:0;position:relative;font-weight:400;font-style:normal;text-indent:0;text-shadow:none 1px 1px rgba(0,0,0,0.5)}.gif_img_wrp img{vertical-align:top}.gif_img_tips{background:rgba(0,0,0,0.6)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#99000000',endcolorstr = '#99000000');border-top-left-radius:1.2em 50%;-moz-border-radius-topleft:1.2em 50%;-webkit-border-top-left-radius:1.2em 50%;border-top-right-radius:1.2em 50%;-moz-border-radius-topright:1.2em 50%;-webkit-border-top-right-radius:1.2em 50%;border-bottom-left-radius:1.2em 50%;-moz-border-radius-bottomleft:1.2em 50%;-webkit-border-bottom-left-radius:1.2em 50%;border-bottom-right-radius:1.2em 50%;-moz-border-radius-bottomright:1.2em 50%;-webkit-border-bottom-right-radius:1.2em 50%;line-height:2.3;font-size:11px;color:#fff;text-align:center;position:absolute;bottom:10px;left:10px;min-width:65px}.gif_img_tips.loading{min-width:75px}.gif_img_tips i{vertical-align:middle;margin:-0.2em .73em 0 -2px}.gif_img_play_arrow{display:inline-block;width:0;height:0;border-width:8px;border-style:dashed;border-color:transparent;border-right-width:0;border-left-color:#fff;border-left-style:solid;border-width:5px 0 5px 8px}.gif_img_loading{width:14px;height:14px}i.gif_img_loading{margin-left:-4px}.gif_bg_tips_wrp{position:relative;height:0;line-height:0;margin:0;padding:0}.gif_bg_tips_wrp .gif_img_tips_group{position:absolute;top:0;left:0;z-index:9999}.gif_bg_tips_wrp .gif_img_tips_group .gif_img_tips{top:0;left:0;bottom:auto}.flex_context{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.weapp_card{border:1px solid #e1e1e1;background-color:#fdfdfd;color:#3e3e3e;line-height:1.6;font-size:16px;font-weight:400;font-style:normal;text-indent:0;text-align:left;text-decoration:none}.weapp_card.flex_context{padding:12px 15px}.weapp_card.flex_context .weapp_card_hd{padding-right:1em}.weapp_card.flex_context .weapp_card_avatar{width:50px;height:50px}.weapp_card.flex_context .weapp_card_nickname{font-size:17px;font-weight:400;display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.weapp_card.app_context{padding-top:10px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden}.weapp_card.app_context .weapp_card_bd{padding:0 15px 15px}.weapp_card.app_context .weapp_card_profile{font-size:12px;color:#8c8c8c}.weapp_card.app_context .weapp_card_avatar{width:20px;height:20px;margin:-0.2em 5px 0 0}.weapp_card.app_context .weapp_card_nickname{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-weight:400}.weapp_card.app_context .weapp_card_title{padding:.3em 0 .75em;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-weight:400}.weapp_card.app_context .weapp_card_thumb_wrp{position:relative;display:block;padding-bottom:80%;overflow:hidden;background-repeat:no-repeat;background-position:center center;-webkit-background-size:cover;background-size:cover}.weapp_card.app_context .weapp_card_thumb{position:absolute;top:0;left:0;width:100%;height:100%!important}.weapp_card.app_context .weapp_card_ft{padding:0 15px;border-top:1px solid #e1e1e1;line-height:1.56em}.weapp_card.app_context,.weapp_card .weapp_card_bd,.weapp_card .weapp_card_ft,.weapp_card .weapp_card_nickname,.weapp_card .weapp_card_info,.weapp_card .weapp_card_title{display:block}.weapp_card_avatar{padding:0}.weapp_card_logo{color:#8c8c8c;font-size:13px}.icon_weapp_logo_mini{width:14px;height:14px;vertical-align:middle;margin-right:.2em;margin-top:-0.2em}.share_appmsg_container{padding:17px 20px;text-decoration:none;color:#000;-webkit-tap-highlight-color:transparent}.share_appmsg_container:active{background-color:#f7f7f7}.share_appmsg_container .flex_bd{padding-left:10px}.share_appmsg_title{font-size:16px}.share_appmsg_desc{color:#8c8c8c;font-size:13px;line-height:1.4;margin-top:.2em}.share_appmsg_icon{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABGCAMAAABCBcKLAAAAflBMVEUAAAAso0Q\/rFYso0Qro0Qro0QupkkvqUsso0QtpEYwp0lFu2Iro0Qro0UspEUspEYso0QspEQso0UvpUUro0Uro0Uro0Qro0Qso0UspEU4rEorokQso0Qso0QtpEUro0YspEUspkQso0Uro0Qto0Uto0QupEYrokUzqkQrokS9r21\/AAAAKXRSTlMA5Av887MjG39JFQPo3FJAlIN4L8+sppyLWw3t06J+bEw10MRyZCvUHvB+FQ8AAAFySURBVFjD7dhrb4MgGIZhREXFs2099dy13Z7\/\/weXZkvVBTt54WPvjyZcCYpIZNPEtf5IPfybE7GZZLnD0hw1wUMPGimNLAFMkRDPXL\/LRc9epEb4ZjASwR7pIyMDGaMhIYZSRkMyjCpoCE8w6khDQozLSIicrrGIhJSwgOwsIAI\/7fyiLQ+Hg6AgVwBwKzlcISA1ALSMGSEpANwNEVe91PXV1gbS2UByG4iwgXCmXxD8QRghx1uZI4ATWECw5hYQ+LEFBIUNBEca0udV4z9PDu5JG4mjJsU0b6WHnJut6owRaCBnH+rWfCkiN5jNj5ch2RYvqhYhLWCKxHsMUadTY4h6Y0sMUR9xhmmUxSYTqNNZ9vvRgEtddvnqq9d9Ae\/ur3AJc07dCjZ4lITCYFMK3Adx40bbYwig6A036k94J9NPhsD2PDtTyZYhNzdn8y1EmoqZI\/vYAtIxC4ikIDpj3sgbeSO07CMOSDkTJCIp0x9T39HayMQFhdt5AAAAAElFTkSuQmCC) no-repeat 0 0;width:34px;height:35px;vertical-align:middle;display:inline-block;-webkit-background-size:34px auto;background-size:34px auto}.friend_cmt_area{-webkit-transition:height .3s;transition:height .3s}.friend_cmt_area.hide{position:absolute;visibility:hidden}.friend_cmt_readmore{padding:30px;text-align:center}.friend_cmt_readmore a{-webkit-tap-highlight-color:rgba(0,0,0,0)}.img_loadederror{background-color:#eeedeb;border:1px solid #eeedeb;background-image:url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD\/\/\/9paWkyMjL\/\/\/\/\/\/\/\/\/\/\/\/29vb\/\/\/\/09PTn5+fh4eGvr6\/\/\/\/\/6+vqZmZm8vLz39\/fj4+P8\/PyBgYH\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Gxsb\/\/\/\/\/\/\/\/\/\/\/\/v7+\/MzMzr6+v\/\/\/+4uLj\/\/\/\/o6OhNTU3Y2NjQ0ND9\/f35+fn\/\/\/\/\/\/\/\/\/\/\/\/t7e3\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/z8\/Pb29v\/\/\/\/y8vLw8PDU1NT\/\/\/\/\/\/\/\/ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp\/K+L4DBxUDZQkjInpB+7\/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ\/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe\/pxsLCvfdR7HNvHU30WldQebill\/Pph9ben3t\/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe\/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ\/uRL+QiTBKbIMaLCxPq6n6lKz\/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb\/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP\/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b\/c+uss1iFWsaH5fYZtU0g6XrxUzj\/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2\/b\/thee7vy2O2FTa\/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0\/XH5B1c4zX\/WEj5\/f1R6LdH9xef7x8\/SF410f1139Q+P+fPa74ONPBJ6Q\/+TfzjGYmPq8AAAAASUVORK5CYII=');background-size:40px;background-position:center center;background-repeat:no-repeat}.img_loading{background-color:#eeedeb;border:1px solid #eeedeb;background-size:22px;background-position:center center;background-repeat:no-repeat;background-image:url('data:image\/gif;base64,R0lGODlhPAA8APYAAJeXl56enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19nZ2dra2tvb29zc3N3d3eDg4OHh4ePj4wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkEAEIAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAPAA8AAAH\/oBCgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKJgwMJ5ycBQAABaKbBKUEqI9BQUCIA6UDhyELDRytg7BAQYezALWGCgEBDLuCvUCxhcHDhA4CAgELyULLzYTPhSAF0wMS10LMzL\/btIUNAdPW49nngtyDFQPTBBjjyuXaQqoArAYlmCYggr5B\/OIZKGVgUAR7Ak5x+tGjh49Dy+JdMGDgwiAG7Aoe8iBBwgdJPXio7PHDUK94hx5MU2CIQ4QEBw5MQKmyZw9DzBghOGDIggIESA+I49lT5cVLFhYgndpABCUfTVdagpBg6oEFFDClbPpzkoOpCBJMIKHJx1ge\/mUlPRiK4IEGVG6fUpowocPBv4ADCz7EIweOw4gR88BUIoOFx5AfY0jBKIeNy5gz58B0wcGDz6A\/O8hQObNpGzg4ew4N2sHdRTwSy8axAxMJDJEjX2gxuLfv35xu0KBhyYOHEqhsyIDBXAYlDRUoVNAwQpMOGsyzO58EvYJ3Cx1WXKIRIzvzGZY2WPDuHcPJSTmWm49RAxMIDOy9Z6Acacb8+oW0wNsiIljVzQX5+RUJdufdYAgLKaTwgiIjcMBBCIaUwMF6FCgICQ4z0JCaIS9EmIILg7xwwgkTCiKChRwgZ8gJHXAQCicrmNiiECgUiMIgGlroAWAlRsgCISYUe2gCISDAuKQ+MqgQoQoxIKkkISjUyEEHKujTgokoWinCk4NUaKGBycAgZQoq2FBIkmMW8oIHFnZAZitfRhimmHcKQgKMaOJp5CFw9ilICBtsECgqNLjQgpuGFHrICyKMcKRvkgKXyAkF3qjpITRESNynpJZq6qmopopKIAAh+QQJBABFACwAAAAAPAA8AIaVlZWbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBFgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKKA4OKZycBwAAB6KbBaUFqI9EQ0NEhwSlBIchCw4drYNDQkJDs7WHCgEBDbyCvr\/BhbQAtoUPAtQMyUXLv7KEz9GDIgXUBBPX2L\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\/nDjSmAUQ61dFi\/axt1rwOiiHFWxXoVhA9OHCF\/Dgn3w4ITUx5AjY6rLwtKFCx9MuUhhonMKShIYLGAggWQmGitOdPYMeunSBhZMXGKBYnVnFZYmNHDN4AEGSjJq20bRApOGB7wZRBghaYXtE8ULlSjBSEO+QhkcuF5QQRKLzidUsC00AgQI2Yk4TJiQwdAHCrsXWJAUQ8UKGYdQmAdBXdAKESLgJsgG602QmSEiWECBCKCIYF4IKAwCAgYY7CSIBxSsN184+pnH3CAeZJCBB4RgUCCJ0qwQwoOfgSgiioKEkOEEFXw4DAn7oefiiIWot951vKSwIggixFBIiDwSTZJCBetRcOAsOJqn444wDtJBgUCqUsIHINhICJJVDpKBBBJsMEwLJZAw3pEvHpKCBhtMCRWYkiUiAoUM1nmICwDmpeefgAYq6KCEXhIIACH5BAkEAEYALAAAAAA8ADwAhpeXl5iYmJmZmZubm5ycnJ6enp+fn6CgoKGhoaOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3eDg4OHh4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEaCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4tCQpygQUBAQaCboqSmjz87O0CHqKWHREVFqoM7OTk7sKOyhUTBRLeCubo8hrGGwsHERj26OTqvhMrAzM5GxjnI1b6FRdjZPjrRPd6pg+HCttlGPNG8g9aCzMPuguW654L09qA7bNiQVwiaLoJDggQZMohZu0IZFCTQIOnGjIs2dBgy1g3RunuELCQQAADAAkk2Ll6kgcOQDo2LmhV6MCCATQAKJPGooXJly0sPCNgcWoADpRs0es6wYQmBgKEACDC41ANpzxqUDAwNIGABCE05eF7EOulAAAABDkwwpePGDUv+DBhYwEe3rt27h3TEgPGir18YMX5aCiHBQYPDiB1AMMEoBovHkCPDwPSggOXLmCM0jsyZxeRLDjCLLrB2UQ4YfP32Bfz2kgcIhhEfduAgBd7buHNzcszCkgULH0y9SFGiuO1JEhYoWBDBaKYaK0wUN04pwoLrCxhUOHGJxYnpxVVYmsAA+wIHFyjRQAG+xAkXmDI4ML8AAglJK8CbaGGoOCMNFEHUAHYKVIAfCSWYoEIMhozwwQfcJbKBBBJgYMgHFJSnwFyRyKDCCjIcgsKDH5QwyAohhLDCIBpQKEFwhohQAQUigBICiSgM8sEFF8BohAcTUGggXSM+OAIhHmCDgIEHhGDgIpPusADCgyCIN0gHSnZASAhBSkCBidmUQCJjhGCJgZaETEhhgMSkMOUHIYRYZpaFrFABhRP4qIqYD0Y455mGcOAim3t68MGRhpiJZiEYRBABocKZQIKchSh6iAoZbOAnXkkuqZsiIfAYwqeJvCCCCJ+RquqqrLbq6qugBAIAIfkECQQASQAsAAAAADwAPACGlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39\/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ASYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbikVDQ0WcnEFAQEGim6SmqI9APDtCh6qnhkhHR0isgzw5OTuypbSFR0ZGR7qCvL08hrOGxMXHyD69OTqxhM6ESMXRyMnVzNnBw93S3z861T7jq4Pc3bnfgj3Vv4PagtDG84TqvT0GCSmFLck+I6J42LghrlC9ZYOICBFCZNC+c4Q4MFjAQdKNGSBt6DC0A6AiaBgFZVggAACABh5BgqSBg+Q9RcUMRSAQoCcABpJ61JA5s+alCAUA9Ox5AASlGzSIzrBhSYGApQAKPLjk4yPRGpQQLA0woMEITTqGggQ7KUEApf4JLKDaceOGJQcOMvTby7evX0Y7ZMSIAWNw4RgzRl4iMeEB3scOHkhIwUiGi8uYM8vAFMGA58+gJ1TOTNpFDEwQQKs2UAGwYMKGB8swaimEBMeQI0Ng8be379+6ZLRoYSkDBhGoYKgwwVwFJQoNGDSg8EGTDRYnmDenNKGB9wYOLji35AKFduYrLFVw8J0BBL2TaqQ4bwLFC0wcIHz3LuGEJBbnneCCISf4twgHHRWywQPtXSBJCyWYcAILmxViQgghUJaIBxRQoIEhIVjgAAMMYCDJDCywMMMhK2AYAgqDuDDCCAMKwsEEHYZwCAkYWFCCKCNgKEJ6goiQQQbICZECQgUdOshXixiaQAgIGmjg1CAadEiBjv28IIKQxA3yQZXVDTICkxRYYOA3J7iooZhkFtKBlgkiw8KXIYxAQyFjalDmIC1c0GEFSerSJoZvwumnIR\/Q+Q0KIIAgJaNxGqLBBBN08E0MKJywJ6WLGtICBx0k+heVVgK3CAlHkqCqIjKQQEKFr9Zq66245qprP4EAACH5BAkEAEEALAAAAAA8ADwAhpiYmKCgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2Nra2tvb29zc3N3d3d7e3t\/f3+Li4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o7OTk7nJw3NjY3opukNjiojzYzMqyGqqeGPzw8Pq2DMi8vMoe0hzw7Ozy7gr2+M7OltYQ9xcbIQTS+LzCyg8KEP9I7PdRByi\/MhNyDxMXH4jUw1zTnztDfuuLV1zHypoTq4PeD3vmKJwhHKW3R1oma0aKFuULWfAETpAMHDh3ppIU7BATIJBcpQraYSCjGMkXq2BXqyFJSi5AhVbwwFEPfIlyGWOqURGMFzJgzL+ncScmFip8pWFga2tJSjZc\/lU5i6lETDBYwpUpiikqGCxdLqwIcS7asWUMyTphYy3btCRj+mDIgIDCgrl0CBjwwQiGir9+\/JzAVAEC4sOEDjFL8XSwi8CUChiMDSMCIhtq2bYNasmCArt26BAiEOEu6tGlOfEdYcuDgAioTHzbI\/kApgYAAAhJQ0ORCBAfZskFQQiCguIABDYRbGtEBeHBLCgYYD1DgASUWHpxv6FACU4QCxosf4CAphHMOJAxtIL8IAgRDEAhMZyBJhIb1IVIY0lChgt5EEiCAgHWFWLDAAAEE0IAkKoQgggqHgNBfBewFMQIGGKgmSAQHCGjBIRo0sIAGolwwIW2CWNBAAx8KUkECAi5A1gcTkjgIBaztNogDAiJQAUAkWNCfBSIQgqMDOgprkgGMCChQITIcTNhBIUcmKYgEHSLwHjUgCFnBBRAamWMhIywgYAIt7hJlf\/+JiaQhE\/S4pZoUUGAjlWMa8sABB0RAzQnNhYnnm4aMAEEEKJJW5WmKYLAiBowmgkIGGegX6aWYZqrpppyiEggAIfkECQQARAAsAAAAADwAPACGlpaWm5ubnJycnZ2dnp6eoKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW2NjY2dnZ2tra29vb3Nzc3d3d39\/f4ODgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ARIKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbij07Oz2cnDk3Nzmim6SmqI85NDM6h6qnhkE9PkCsgzMwMDKypbSFPTw8PrqCvL01hrOGPsXGyEQ2Mb0xO4XOhLbRP9NEyjA02sGF0MXH4DjWvTeE24I\/0Ty54EQ1vb7w5oPExd\/uCWoHg5mgeOh4hOJUw4ULg4Xy9SIniEeOHDwGJQxYSIiQIUMkvUCRQoWLGYZkTFSEbiGhIR5jSnKRomZJGCl\/LerhclDMn5JqrLBZc0UMTDB\/eqz0YijRFpaUegxp6YYLFU8pSRWyKQYLmyy0\/qTKacaLF5ZAchXItq3bt\/6GaKRAcaKu3RModFraoMBAgb+ADSQIwUjFiMOIE6PAdACA48eQFRROTHnE4kuNIWtewMgGCrp37R69lCGBX8B\/DRwoAbe169ecVJAgYcmBgwyoUITgwJvwpAQCAghIUEETjBEdePemBFyA8wENRFwi4UH58koKBjgPXgACJRcfrHPwYAKThALbnR\/4IGmEdfKGOnRgFCGCoQgEtgdgIInEBg4diLCCIRtYYAF7iVCQQALeFYLBAgMEEEADkrAgAglhGRKCgRZ4MIgJGmhQniASILAgBodw0AADHIiCgYEX+EZEBg88gJsgFyiwIH9sbWjgBoRcAAEEFxDywIIJFH55jwkvWnABbYNYMKQFhGigYwILeAhOBxwiGOWUhUyApATgiHCBgRhARYiUEFBJSAkMLKgAishwaaCXX7ZpSAVI2oeMBxVU0KIhbLpZCAQIIEAmMil40IGahRR6SAkRTADCa0ISCZsiG9QI5KaIrLDBBhmCauqpqKaq6qqiBAIAIfkECQQARQAsAAAAADwAPACGmZmZmpqam5ubnJycnp6eoKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39\/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ARYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbizk5nKA4NTU4oJs3ozemjzgyMZ+GqDWqhkA8PD+rgzEuLjGHsrSFOzo6PLqCvL0zsamGPcXGyEU0L70vOoXBhUHExT3TRTK9LjLazoQ80cfhNta9NYTbgz7ROrnh1OS\/g\/OC3jrA5RP0zgWNQaJIDYJWbAcoGi0MHqJBzpwgHjhwsCui7tshIkOGEJHkIoXJFhYJKWOWqKPDQiCFyBxC0qRJFS8MwYDBaMdLQkNkCqUZqcYKmzd5XgoqVOjISS5UIE3RwhLTpkQr2YiKlAWlqzOfYorBwqbXSVdDmprRy6rIgf5w48qdOxGFiRJ485YwkZLuIBQhAgsefMJvoRQgBis2YZhQDRN39eZV2riy5cuYi6QQMcJSAwYXTJ34oCGDhg+UDgQAEODABE0vRGzQQPt06gC4AwhYEOLSCA61aYOwhEBAbgAEGlBq4SG4Bg4lMEEgkBt3gQ6SQgTnQMLQhg2MIEAw9GDA8QWSRJjeACKFIQ0UKHhQJOHAAQeGLCgQAAAAA0krhCDCCoeAEN8EHAxCAgYYdCdIBAbYZ8EhGiyggAagXBBfBagJYgEDDEwoSAUI2KdAXAbGlwEhFDTQAAWEOGDfARUMRIIFG4pAyAQuvjZIBiUekAB24WwQHwVEDmLCYwM+DiJBhAeMNw0IFcR3AYE79lgICQrYh0BoyBgZ33yFLNmkkjNKqQsHE0yAoSFmHuKAAQZEMA0KHGyAZZlaGkICBBIMZ1iLL2ZmCAYgYmDoYRlkoMKikEYq6aSUVjpIIAAh+QQJBABGACwAAAAAPAA8AIaYmJiZmZmampqbm5udnZ2enp6fn5+goKChoaGioqKkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3g4ODh4eEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBGgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKPzg3PpycNjMzNqKbNaWnqI43MTA4h6ozNYdAOzs\/rYMwLCwvs6W2hjs5OTu8gr6\/MYa0xIQ8x8jKRjMtvy45hdCFQDrUPdZGzCzOhN6ExsfJ5DXZLC006cOEPtQ6oeRGMr\/AhEiZWkeNB79BLv7JGCSQlZFpx3SIkqFixUJD\/poN2mHDhjsj7HKMMxSk5BBJK0iUMKECHaEXvy4igvhx0JAgQHIGQVmi58oWhlwEW6RDYiGcOXVKooHCZ88TQC8JSZp0JyUWJ5yWUGEJKVUhl2qsMOE0BSWvOcFqepHCp9lJ\/l6DqOUU45clIXIP6t3Lt++hGWRJCB5c4oRLS0QSK17cyMSHx5Ajl8C0uHLiIoxORN78YfIly5YZ1SgxuPTKoZaKgFbst7Xr16JQhAhhiQGDC6hMdMBwAUMHSggCAAiAYIImFyAyYFjum9KBANADCFgA4pKIDcyXe7CUQEB0AAQaXOWQHcOGEZggEBge3cDvSCB6L9eAvpAGDYwcODD0YMD3BZLEh0EGH6BgCAYSSMCBIhEUYAADhliggAAAAABhJCp8AAJXhniQYAQbDDKCBRbUZ8QDDhpQwSEaLKBAiJxUkOAE2wlCgQIKUDAIBQcYYEACe3mYIG6DSLDAAhIQg8KAjwboyM8IFMxI2yARHBkBIRj0aAACC5KjQYISwEillYVAkOJ+1nwwQYIVrFBIlQtcScgICfh4wIrKfJlgl4TAKSchEjCJJi8aRBABBof4eUgDBRTwgDUnbJCBm4YoasgIDkDwwWtGIgmbIhfgSOSnh6RwwQUckqrqqqy26uqrogQCACH5BAkEAEoALAAAAAA8ADwAhpSUlJWVlZaWlpeXl5iYmJmZmZubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t\/f3wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEqCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4pCOTlCnJw4NDQ4ops3pTeojzkzMjyHqjSshkM8PUGtgzIuLjGzq4c8Ojo9vIK+vzSGtLaEPcbHyUo1L78wsoTPhUM7xjs\/1UrLLs3cw9HTyOQ42C4vNum1hD\/TO0DkgjW\/wPTQlBQz5mPfIBj+agwiZWqQD3yiarBgga5Qv18zBvXAgaOdEmkEDxUZMqSIpBYlTJxgkbHQsoqHQG4jVERIkJtDJLEwwVPlC0Mxgi3iMXMQkZtIc0aykaInTxQwMBGxiTSIECOUXKBwamKFJapVlVbCweKEU6+TwOLEmimGip7+KiiBFUIE1YwWLSyRNGmwr9+\/gA3ZQGGW64kUMCklQcK4seNGKUJInkwZBSYkRzJr3oyEkQoQlEOfuLy59JHOi3CcKOz0sAxMi087bhy4tu3bolaMIGHJgQMMqFB80JBBAwhKCAIAEICggqYYIjZomG4ceYDrAQY0EHGJRAfqGjaEsKRAAHYABR5QeuEBvIYOJjBFKID9uoEPkkSA5xC\/EAcOjEAAgSEQEHAeA5KMUJx4aBGiAQUTeKCIBAYcoF4hGCwwAAAAOHBSCCLkZUgIFEDYwSAnZJBBf0pEUOEBFxzCQQMLAMjJBSVWcJwgFzTQQIyCWIDAAQcs4BeJJWqIQEgFvjk3iANEHmCBQSZYkCNvg1DgGwUODnmAAhKSw0GJFISZ5ZaFUEjkgNWEUEGJF4h4pgNcEmKCAkQmACQvY5aIXyFa0mnIBFGyyUsHE0ywwSGB1lnIAwYYEEE1KXTAgZyENHqICRBIMJ5tTDrgJG6IZOBjBqQmwsJ0mKbq6quwxirrrJsEAgAh+QQJBABEACwAAAAAPAA8AIaYmJiZmZmampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzOzs7Pz8\/Q0NDR0dHS0tLT09PV1dXW1tbX19fY2NjZ2dna2trb29vc3Nze3t7i4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBEgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKPDQ0PJycMy8vMqKbMqWnqI40LS02h6qmhzw3Nzqtgy0nKCyzq4c2nze7gi0oyi+GtKyEOJ80xscwKcoqsoTOhTw10jnHyMooLoXchDfS1OIz1ygpz0TogjnSNbrigjDkwIP0RIh9wqGPkAplKWAMIvVixqBon2qIguFLoSF+ylo8nDGDoCB1n8IZ8sGDxw9JKECEEHHCXCEWylwigqiNEEkdOENFOhGi50oVhlasYGSj5qAeOJPqhCSDhM+eI4Ze6rEjKc4dJyelGPFUhAlLVa3uWEppBgoRT79OCqsUiKYW\/iVCqCxBie0OH6hcpEhhqSTegoADCx68KAbXpz5JMLskJIjjx5CFMBqhYYPly5Y1iMAUBIjnz6CDMCJRGfNlzZxBqwYietEMtIihamQMuXYQyYRz697dqkQHD5aGCEc1IgOFCRQ0UBLOfIgmFh0qUJiefHnz4Zc8XEA+vcKG4NexS1KBgfr0CyEwhRcPiQN3ChZAGLJggdGCBYbWS+owYUIFDmoRUoEDDmSgSAMABIDAIdehxEEHKByyAYENXDBICP1tJsgCCQYQASLsaRIBgQ98J0gEBhjwoSAQCBBAAAUINiGBFBDyQIoPEHLAix4CFgIEJH5AiAMHHOCAgAO8bkiAgfpYQKADGBRCpJGFMNAhfuJw8ACBEfA1ZJFHEiJCAS8OIIE4ThLI5JdUSvkiAFjuckEDDVRwyJRhFpIAAHCKQ8IFFngpJZiHhKAAAxzwdqMBOfKmCAUp1uhoIihUUIGgk2aq6aacduqpPoEAACH5BAkEAEgALAAAAAA8ADwAhpaWlpeXl5iYmJmZmZqampubm52dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tzc3N3d3d\/f3+Dg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEiCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o\/NDQ\/nJwyLS0yopsxpTGojzUtLDeHMKUwhz43OD2tgywmJiuztYc2nzi8giwnyy6GtC22hTmfNLLIMCjLKceEz9GDPzWfNTrIycsnLYXehTjU1uYz2Scop4PsgzvUNTzmgy\/ogg1S1YLVoGKfcvgjlALdi0GkTA3SsU8UDBMnvhECuEydoBwyZCgU5C7hoSA+egSRhOIDiBAmmhVawUxRSRuGgPTYwdOHpBMggoIQkcKQChWMbOAs9IMHz56SZIwQGlQE0ktNn\/LkIYQSChFUQZSwtFMrD5+WaJwIQXXspLL+T30M0cSihFC3kuD2CCXqBQoUlnz4ALKwsOHDiBnJEME2bIgRGikVGSKksuXKQ4owGqGhs+fPIjANCUK6tOm5i0hk+Mw6BCYhpmMHQa1oRmPHIjxaInK5txDNiYMLH97KhAcPlo4YMYKKM4UJFDRQWk79iCYXHSpQ2E5hw3Tq1DF9uMB9u\/dK4KtTWpGhPIULri8pT89cUgfo2y2AMFTBAqMFCxhCX32QeABdBRyYYAgFDTSQgSINABBAAobMF14kKXDQQVGGbNAgAxcMEgIEEOwnCAMSBiDBIcsdYR0nEDTowHlIRGCAAREMEoEAAQRQwGEeNjgBIQ8ccMADhCCC0GMAOS4UwgMyIjeIA0Y6QEgFA\/RIgHT+WNBgAxgUQuUBVhISYY8BmsOBAw1CwOGUVRYiQgE9DjAkMhV8+aCYcYrZIwBp8nIBAwxQcMiYZRaSAAAAMGAOCRdY8CYhiB4iggIMdEBckUcStwgEN0LgqSIoVFDBpKOmquqqrLbqqjmBAAAh+QQJBABJACwAAAAAPAA8AIaTk5OUlJSVlZWWlpaXl5eYmJiampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\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\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBEgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKMyoqM5ycJiAgJqKbJiEhp6iOLSMiMIclqyWHNi0uNK6DIhsbIbS2hywpKS69giIczSSGtSG3hS\/HKS3KRCcdzR6zhNHTgzYqxyrfyszNI4XhhS7W2NlEKtwcHSjgxIMx5Smg8wSZaMYBBCFVrAgZO4YuoAeCrbStOjEIhrUVolBw8JDP0EAOG9gJenHixItB8BgewjFDBg5JHihUsMAh4qAQzhRVS8HCkA0ZL4KGitShgtEKF4QVKsVoBcZCNGAEFSpJRYajRjEotRR1atAYOSh9wIDVwgZLQL3CGFqJRQcL\/ljPToqhdoYOTSM0VJCpgRLdrzZQmfDgwdKMGTcCKl7MuDEjFRgsSJ5s4YIGipd44LjBuTNnHD0YZXDwoLTp0g4uYMJRo7Xr12EXaSB92nTq1a9z14itiMUFypMvYBBXaYfn4zh8OF7OvHmvDhMoWOrR4wcqDQ8QHEDwgBKPHeB5KM9UQkICBOi5ewfPvgeQSxQWpEeQAIKl7+x38Ag9SUSD+QgwoNolPuDHHg\/vRSLBdugpYIEhCyzAiBBCGNJDfjvwB8kE2yUQQWGFJCBAAN0lIkQQQVRYyA8GavgICBFM8MEhEQgwYgODXGCAAQMScSKKKq5InXWcGGDjABEMiXIAAAAcMMiPKDJWo40IEFIAkwUQAmWQ2WBAwJEVEEIAkwQQMgSKKA4R0AI2CuBAIWMCUKaWaHLpygRfClCACHCSWciZdWbDpo1v9imnIVtmw0AAASRwSJxzFvKjnaJw0MACW4nppyFDUKhmc1cCkKVzihjApAGkKhKCAgpkmuqrsMYq66y0ZhMIACH5BAkEAEcALAAAAAA8ADwAhpiYmJmZmZqampubm5ycnJ2dnZ+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6mpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t\/f3+Li4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEeCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o4Kio4nJwoHx8oopslICAlqI8sIiAvhySrJIc2LC00roMhGRkftLaHKycmLL2CIRrNI4a1ILeFLifWycolG80cs4TR04M2KdYo3srMzSKF4IUt1ifYykcpHM0bJ9\/EgzEo5TPzBpFopkHYIFWsCBmz5iIgIXsaNoQjZWrQC3gpRJ3YwCGfoRIEQwyCYcIEjEEs4J0jhEOGjFCROEiYQEGioQ\/OFL07scLQDRkuggKMtGHmhAkVDBLy4IHRJ0M0XgQNKkNSigtHs1oAgSnq1KAwclDqYCErTQ2WYnx18WJopRX+HCiYzUAJxtoZOjSJyDBhJt1JaoPGqIGqRIcOlmbMuOGwsePHkBmlsFCBguXLFTCYwNQDxw0boEPfwOGD0YUGDRyoXo3aAqYbNGLLng1TUQbUq1k3qPB6tm8atROxqFD5suUKF55d4uE5tOgbPyJLn069l0wJlnr0iC4Kg4MDBg44oMRjh3ke3DGRiIDggHvx5M3L7xHk0gQF4d0jeJBd\/vkelITAwHvuKeDaJT6U5x8PQEgCQX4HJMBbIQsswIgQQhiSoH8ARiKBAQbsh1ghCAQAwHiJCBFEEBkW8kMP80nyAQQRKEUIBAGYyAAhRhhBiIorDnHIiz00yEkBOQp9AMEgPfY4yBArsvjYAzkGgACPTf4YpZAOXUBAjgNQgKWTT0YZBBEOLZAjAA0U0qSPWq7YojIRDJBjASKNCecgRZjJZS8LAJAjinoaAqWc8wQKQAKHvHkIkHO6sgEDCnBliKOGFIEhmtRhWl0inn6KCJmilmrqqaimqmpjgQAAIfkECQQASQAsAAAAADwAPACGlpaWl5eXmJiYmZmZmpqam5ubnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d39\/f4ODg4eHhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ASYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbijkqKjmcnCkfHymimyUgICWojywiIDGHqiAkhzYsLTWugyEZGSC0q7eGKycmLb2CIRrOI4a1xYQuJ9Ysy0kmG84cs4TShTYp1igw2UnNz4XhhC3WJ9joKhzOGyjgq62DMSjlM+gElXCm4UM+VoRUwHsRcFA9DRv2JSFlatALeKdGceiQkR1BEfxMmPiW5J21c4ZuyJCBQ5KHCRMqcDBh6MO6RNVOrDBkQ4aLFixkSOowgYJRC8IKefDA6JMhGj9bSBUaaQUGo1gvhMBE44XUry9aTvpwoSjWDZZifJX6AqAlF\/4dKmCloIESjLUuZOjQNEIDhaJ1J92VCoOXKBNLLc2YYaOh48eQIx9acUHuXAoVMuC71OOGjc+gP9\/wwQgDAwYNUqs+fQGTDRqwY8u+wSjDadWrGVhwLbs3DbGKXFiwPLcCBomVeHgOHRqI5OfQo3MiSsFSjx7ORWlwcMDAgQeUeOgYz+OHJhMSEBxY\/z38+Pc9hFyioMD7egQQLIl\/r2NHD0ojMMBedwu0dokPO\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\/RdvQkULSqVjz\/9kgsU9pmQAg2S7HdeITrowAgMMBjiwgn2rVCgfEIYogMOOOygSAzVjUdIDCtAWEJakQgRXX+F8IAhDgoKooMNNrRYBAzVsbCaITOwsMKNm+SwooaC2DDDDO4JIkONg2V\/piKGMhYhJJGEvFCjDJj14COGPRBSw5DLDUJDC9W1UCQ6F2II5CBbztDlIBxW1yA6S+KQww+FpLmmIDiAyUILPLpSZoaG2GlImyy82UuZTaLJ5SFSFoqODwnSGeiihuAAQww3PJfmmM8h8iSnnRrCww03nBnqqaimquqqrAoUCAAh+QQJBABKACwAAAAAPAA8AIaVlZWWlpaXl5eZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39\/g4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBKgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKMRsbMZycGQwMGaKbFQ0NFaiPIBIPJYcUqxSHLBocKK6DEAUFDrS2hxoTExy9ghAGzROGtQ23hR4U1hvKShcHzQmzhNHTgy0X1hUg2UrMzoXhhRzWFNjpHAjNB6eD7oMjFdYWJtIJstDMQANCqlgRyhDvg8BBCu5ZGETK1KAP\/ihcEMVhQYN5hQgaKBBhUAkLFr4p4TDBGjpDLEKAYCGpAQAAAhZgMOSAXaIO1vIRSgFCQwYMIiQxABCg6YCShRgcXIRhZyESGzJozRBCkgcDTZsCICABUwkOW7V2cEHpAQGm\/k0FKLD0IW0GDiMuiWggIGyABJQ8pNUgAoYmCwgCMEUQ+GgGDydQYXAgrNIIESoeat7MuTOiI6BDi06CSQYKEyVSqzZxogajI0Ziy559BJOJDyBy6879gdci2LOD1750e\/fuDykaiRZt5AgSTDFOq15t4obn69izcyIiRIglFixCiRoSBIj5IJRSqE5hOFMRIebjo5+kfvUK65bgxz9vScX0Eie0QEkR5e0XxBCYvHDCfyi4Fol+8XlXCA88MBKDeIS0gJpqK0gCYRBEGLJDDjn0oMgMLbTQHiExrIAaCTRFwp0QIRrSA4k5VCgIDzbYoKMSMqTYAg2HzLDCCkRyiqIDjj4McsMMM+CnBA1CvrDZjSTuQIgNUNpACAxCJpnOD0uS2OQgXM7gJZoupOgCDgLxgKOJW3ZZSJApYtiLD2XqICGadhKywwtuiumKnCT+CKiahqCYZzaIamlImmsWAmYLMmQDBIXzFULpITvEIAOc2H2qXSKmnnrIDzjg8IOqsMYq66y01upKIAAh+QQJBABHACwAAAAAPAA8AIaYmJiZmZmampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nze3t7f39\/i4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBHgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKLhcXLpycFQYGFaKbD6UPqI8cDAoihw4HBw6HKRYYJa2DCwAACbO1t4YVDQ0XvYK\/AQHFhLS2hhkO1srLEgPOBbLRxIUpEdYPHMvMzgANhdLQghgN1hbn7wTOA6eD7YQfD9YQ3uhBcBYAASFVBlgNomDNgTl6gwo4ExBhEClTgzb4c1BRlBEjiCKkYzAoRIQIIQZdiOfw0IkOHFBI+kjzEAJn7qhZy0eoBIcKFCZ0mEmzZqFajCZMMATCAoWnEx5GKloUE4gLT7NiUEGJqlFKG4BmvfABk1eQkzJkpVDBQwtN\/l4paQhKQcOIVh8tefBgAqLfv4ADMyoypLDhw0QwvSARorHjxiNiMBoipLLly0MwidCwobPnzhpITL5MWkjmS5s\/fw49+LDrIYkvtRjx+LEIGoJz697dC4gPH5ZSpHiBCkgPHsh7UDIhormJt5mE+EBOXfmkEs2bj0iB25KP49R5AK90IntzElwnBQFf\/QemFSTMiyghQ9L09oZw4GDUAjohFSOYJ1Mk94kHhCE31FBDDp2ggAILhrhwQoAipCBJEL8daIgOCtawnyA5yCADg4K04CAKMBwCg4OScWJDhzoMMsMLL8wwyIoOpucXhwreQIgMNNY3yAonpgjRDi8qaRjjIEC+IKQgMqTgYAo20oNDhyQyGWQhLpzoXy86JGnDeFo6WcgNKkxpZC9XKphlmU8O8oKX57TpoyFNxjkICyec8CUqPOhH5o9bItiCCzXwlidviyzKaCI80EADD49WaumlmGaq6V+BAAAh+QQJBABIACwAAAAAPAA8AIaWlpaXl5eYmJiZmZmampqbm5udnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trc3Nzd3d3f39\/g4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBIgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKLxcXL5ycEQYGEaKbDwcHD6iPHQwKIocOqw6HKRUXJK6DCwAACbS2hxQMDBe9gr8BAbeFtQfPhBkN1hbKSBIDzQUj0MSEKRDWDhzZSAvNANOC0e1IF9YN2OgYBM0D9e7hgh4O1h7MQockQrMACAipYkVowrwNBAcVaCbglCBSpgZtANgAgqgjR4wYOWQwAAAGg0BEiABi0AUG1s4ZStGBQwpJInMeMZSgGbxCGKxRMGSCQwUKEzzgzJnT0CpGEiQYCmGBgtUJHSYx1YkpxAWrYDOsoBRy68hKG46CvfABk9md\/pMygKVQwYMLTWWbTtqAlIIGXqKMgLTkwcOJiIgTK158qMgQIZAjQx5CBNOLESFAaN4cQoQMRkOCiB5NekhXDahTq\/62KDTp10JOq1adAbCiIpJzC6l8qYWIzJs1hwhBg7Hx48g5AfHhw9KJE3dF\/eixo3oPSiQ+ePhAYmymIT6qi78+acSH8x9AmJhxyQcP8dYtlUB\/PgQKSkLew+fxA5OKEPR94Jkk4YnHnyE33MAICyzMBCB6JhA4HhCG2EADDTgo4sJz3hHiggkgaHdYJEH04EMQh+RwIYaD4BBDDBkKwsJzJ8BwyAsnmGAjJzWsmMMgMrTQwmeC4PjcTYipgnihDYTEIGQMhKhAYygE8dDjhTsQAoOQOwoSAwrPoVAcOjesGOMgW7bQpSAt0NhgNjpcWUN\/WnJZyA0phEllL2Ve+GMhaa4pyIbPvdkLDkseEughK+TYQjY94HBDc4YsiiALLdSAXJpQJpeIky106ukhPMwwA3mjpqrqqqy26qoogQAAIfkECQQAPwAsAAAAADwAPACFmpqam5uboaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2tra29vb3d3d3t7e39\/fAAAABv7An3BILBqPyKRyyWw6n9CodEqtWq\/YrHarLDUaJi7XAAAYxFtCAEBAa9WBthHEaHDcTri8qBAIGnhNekYPA4YMgUyDRCAGhgQSiUuLQw4Ch5KTAXFEFQSGBRmZSgVlBUQKhgMRo0oHZQdDEZ8DZ1w+PT0+TxcGBhdDDZcDkUYeExIfUj08zbpUDoYKRh0RCgkIE8vN3D1U2EYWCwnkCMVQPtzq3lcXDOTwDSFUzOo87FQQ1\/AMFVe49nhQeQAvgYIJJLTkUjcQW4IHosTgwjeFAoU7rTJq3MhRyI0bOEKKBLkDSwkNFyyoXHkBQwomOWzInEkTBxYMDyDo3Knzgf4GJjhoCrVhsx3Pow82MNkhsmnIGzqwkMiQcqXKliw6at3KFcsNGjSsfPBQAo2NGTHSzqCywUIFCxtEaMlBI63dtVPasvSw4koNGXbVWuFg1QIGZVNwAA4sowaWEBkKa3gZpa7dxkZcuGAyQm4REBhWVuggxXIMGjeMtFCh4oUSEh06zCsCO2UFD1JwgE1tBAZrFZuFvECBwrWQEbE7hDFywkOHE2JY\/IYxJAUJEpR\/mHDeAfEo36xbEEFxHQWREMmXS5Kx4ncMIieuQx+CgrsHFZlc\/DY+JD6J+UPAFptngcDQngos2FCEfwAK90FsHjSIhn6s8deffEYI2AGBbjVQKB5zGBqBHgcjJEKDCy0oCOJ\/R7ggwghZaUUeCeZ1hcSMNdpoxAyshaXjj0AGKeSQRF4RBAA7')}.appmsg_card_context{position:relative;background-color:#fdfdfd}.appmsg_card_context:before{content:\" \";border:1px solid #e2e2e2;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;position:absolute;top:0;left:0;width:200%;height:200%;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.appmsg_card_context .mpda_cpc_inner{border:0}.mpda_cpc_inner{position:relative;border:1px solid #e2e2e2}.mpda_cpc_title{font-size:13px;padding:6px 10px;line-height:1.2;color:#8c8c8c}.mpda_cpc_title.mpda_cpc_title_right{text-align:right}.mpda_cpc_title.mpda_cpc_title_left{text-align:left}.appmsg_card_ft{position:relative;font-size:13px;display:flex;justify-content:space-between;align-items:center}.appmsg_card_ft:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #ececec;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.dropdown_opr_tips{display:inline-block;vertical-align:top;color:#8c8c8c;position:relative}.dropdown_opr_tips.tl{display:block}.dropdown_opr_popover{display:none;font-size:13px;line-height:2.8;padding:0 1em;background:#fff;color:#576b95;border:1px solid #dfdfdf;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);border-radius:3px;position:absolute;top:100%;left:50%;-webkit-tap-highlight-color:rgba(0,0,0,0)}.dropdown_opr_popover:active{background-color:#ececec}.link_tips{float:right}.link_tips img{width:20px;height:20px;vertical-align:middle;margin-right:.2em;margin-top:-2px}.appmsg_card_btn{position:absolute;right:11px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);color:#576b95;border:1px solid #576b95;border-radius:3px;font-size:13px;line-height:1;padding:8px 9px;display:flex;justify-content:center;align-items:center}.appmsg_card_btn:active{border-color:#354567;color:#354567;-webkit-tap-highlight-color:rgba(0,0,0,0)}.appmsg_card_btn img{display:inline-block;width:13px;height:13px!important;vertical-align:middle;margin-right:6px;position:relative;top:.5px}.mpda_cpc_context{border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;margin:14px 0}.mpda_cpc_context:before{border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;z-index:1}.mpda_cpc_bd{position:relative;padding-bottom:56.25%;width:auto;height:auto;-webkit-background-size:cover;background-size:cover;background-position:50% 50%;background-repeat:no-repeat}.mpda_cpc_thumb{width:100%;position:absolute;top:0;left:0}.mpda_cpc_ft{padding:10.5px 11px}.mpda_cpc_ft.single{padding:22px 11px}.appmsg_card_msg{position:relative;top:2px;display:inline-block}.appmsg_card_msg .appmsg_card_msg_title{display:block;color:#3e3e3e;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3;font-size:17px}.appmsg_card_msg .appmsg_card_msg_supp{margin-top:2px;display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;font-size:13px;font-weight:400;color:#fa7834}.appmsg_card_msg .appmsg_card_msg_supp.price{font-family:'wechatnum';font-size:13px}@font-face{font-family:'wechatnum';src:url('data:application\/octet-stream;base64,AAEAAAAQAQAABAAATFRTSJjR0dUAAAEMAAAAEE9TLzKKcYMzAAABHAAAAGBWRE1YdDl7tgAAAXwAAAXgY21hcADqAd0AAAdcAAAAjmN2dCAA8oWXAAAH7AAAACBmcGdtdCgNNAAACAwAAALmZ2x5Zpf8R\/4AAAr0AAAGtGhkbXhOU2qhAAARqAAAAXhoZWFkBzA24QAAEyAAAAA2aGhlYQWdASoAABNYAAAAJGhtdHgX3AJCAAATfAAAADBsb2NhC1gJcgAAE6wAAAAabWF4cAIkAzEAABPIAAAAIG5hbWUBGuGYAAAT6AAAAs9wb3N0\/50ARgAAFrgAAAAgcHJlcDNDNIkAABbYAAAAkwAAAAwBO0szTEs7S0tLS0sAAwH7AfQAAAAEArwCigAAAIwCvAKKAAAB3QAyAPoAAAIABgMEAAACAAQAAAABAAAAAAAAAAAAAAAAcHlycwBAAAAAOQLI\/zMARQLUAAwAAAABAAAAAAH7AsgAAAAgAAAAAAABAAEBAQEBAAwA+Aj\/AAgACP\/+AAkACf\/+AAoACv\/9AAsAC\/\/9AAwADP\/9AA0ADf\/9AA4ADv\/9AA8AD\/\/8ABAAEP\/8ABEAEf\/8ABIAEv\/8ABMAE\/\/7ABQAFP\/7ABUAFf\/7ABYAFv\/7ABcAF\/\/7ABgAGP\/6ABkAGf\/6ABoAGv\/6ABsAG\/\/6ABwAHP\/6AB0AHf\/5AB4AHv\/5AB8AH\/\/5ACAAIP\/5ACEAIf\/5ACIAIv\/4ACMAI\/\/4ACQAJP\/4ACUAJf\/4ACYAJv\/3ACcAJ\/\/3ACgAKP\/3ACkAKf\/3ACoAKv\/3ACsAK\/\/2ACwALP\/2AC0ALf\/2AC4ALv\/2AC8AL\/\/2ADAAMP\/1ADEAMf\/1ADIAMv\/1ADMAM\/\/1ADQANP\/1ADUANf\/0ADYANv\/0ADcAN\/\/0ADgAOP\/0ADkAOf\/zADoAOv\/zADsAO\/\/zADwAPP\/zAD0APf\/zAD4APv\/yAD8AP\/\/yAEAAQP\/yAEEAQf\/yAEIAQv\/yAEMAQ\/\/xAEQARP\/xAEUARf\/xAEYARv\/xAEcAR\/\/xAEgASP\/wAEkASf\/wAEoASv\/wAEsAS\/\/wAEwATP\/vAE0ATf\/vAE4ATv\/vAE8AT\/\/vAFAAUP\/vAFEAUf\/uAFIAUv\/uAFMAU\/\/uAFQAVP\/uAFUAVf\/uAFYAVv\/tAFcAV\/\/tAFgAWP\/tAFkAWf\/tAFoAWv\/tAFsAW\/\/sAFwAXP\/sAF0AXf\/sAF4AXv\/sAF8AX\/\/rAGAAYP\/rAGEAYf\/rAGIAYv\/rAGMAY\/\/rAGQAZP\/qAGUAZf\/qAGYAZv\/qAGcAZ\/\/qAGgAaP\/qAGkAaf\/pAGoAav\/pAGsAa\/\/pAGwAbP\/pAG0Abf\/pAG4Abv\/oAG8Ab\/\/oAHAAcP\/oAHEAcf\/oAHIAcv\/nAHMAc\/\/nAHQAdP\/nAHUAdf\/nAHYAdv\/nAHcAd\/\/mAHgAeP\/mAHkAef\/mAHoAev\/mAHsAe\/\/mAHwAfP\/lAH0Aff\/lAH4Afv\/lAH8Af\/\/lAIAAgP\/kAIEAgf\/kAIIAgv\/kAIMAg\/\/kAIQAhP\/kAIUAhf\/jAIYAhv\/jAIcAh\/\/jAIgAiP\/jAIkAif\/jAIoAiv\/iAIsAi\/\/iAIwAjP\/iAI0Ajf\/iAI4Ajv\/iAI8Aj\/\/hAJAAkP\/hAJEAkf\/hAJIAkv\/hAJMAk\/\/gAJQAlP\/gAJUAlf\/gAJYAlv\/gAJcAl\/\/gAJgAmP\/fAJkAmf\/fAJoAmv\/fAJsAm\/\/fAJwAnP\/fAJ0Anf\/eAJ4Anv\/eAJ8An\/\/eAKAAoP\/eAKEAof\/eAKIAov\/dAKMAo\/\/dAKQApP\/dAKUApf\/dAKYApv\/cAKcAp\/\/cAKgAqP\/cAKkAqf\/cAKoAqv\/cAKsAq\/\/bAKwArP\/bAK0Arf\/bAK4Arv\/bAK8Ar\/\/bALAAsP\/aALEAsf\/aALIAsv\/aALMAs\/\/aALQAtP\/aALUAtf\/ZALYAtv\/ZALcAt\/\/ZALgAuP\/ZALkAuf\/YALoAuv\/YALsAu\/\/YALwAvP\/YAL0Avf\/YAL4Avv\/XAL8Av\/\/XAMAAwP\/XAMEAwf\/XAMIAwv\/XAMMAw\/\/WAMQAxP\/WAMUAxf\/WAMYAxv\/WAMcAx\/\/WAMgAyP\/VAMkAyf\/VAMoAyv\/VAMsAy\/\/VAMwAzP\/UAM0Azf\/UAM4Azv\/UAM8Az\/\/UANAA0P\/UANEA0f\/TANIA0v\/TANMA0\/\/TANQA1P\/TANUA1f\/TANYA1v\/SANcA1\/\/SANgA2P\/SANkA2f\/SANoA2v\/SANsA2\/\/RANwA3P\/RAN0A3f\/RAN4A3v\/RAN8A3\/\/QAOAA4P\/QAOEA4f\/QAOIA4v\/QAOMA4\/\/QAOQA5P\/PAOUA5f\/PAOYA5v\/PAOcA5\/\/PAOgA6P\/PAOkA6f\/OAOoA6v\/OAOsA6\/\/OAOwA7P\/OAO0A7f\/NAO4A7v\/NAO8A7\/\/NAPAA8P\/NAPEA8f\/NAPIA8v\/MAPMA8\/\/MAPQA9P\/MAPUA9f\/MAPYA9v\/MAPcA9\/\/LAPgA+P\/LAPkA+f\/LAPoA+v\/LAPsA+\/\/LAPwA\/P\/KAP0A\/f\/KAP4A\/v\/KAP8A\/\/\/KAAAAAwAAAAMAAABmAAEAAAAAABwAAwABAAAAPgAGACIAAAAuAAwACwAAAAEAAgADAAQABQAGAAcACAAJAAoABAAoAAAABgAEAAEAAgAuADn\/\/wAAAC4AMP\/\/\/93\/0QABAAAAAAAAAAQAKAAAAAYABAABAAIALgA5\/\/8AAAAuADD\/\/\/\/d\/9EAAQAAAAAAAAAAABQAWwBmgAAAAP\/6AAYB+wAGAsgABgAUAGUAawAAAAC4AAAsS7gACVBYsQEBjlm4Af+FuABEHbkACQADX14tuAABLCAgRWlEsAFgLbgAAiy4AAEqIS24AAMsIEawAyVGUlgjWSCKIIpJZIogRiBoYWSwBCVGIGhhZFJYI2WKWS8gsABTWGkgsABUWCGwQFkbaSCwAFRYIbBAZVlZOi24AAQsIEawBCVGUlgjilkgRiBqYWSwBCVGIGphZFJYI4pZL\/0tuAAFLEsgsAMmUFhRWLCARBuwQERZGyEhIEWwwFBYsMBEGyFZWS24AAYsICBFaUSwAWAgIEV9aRhEsAFgLbgAByy4AAYqLbgACCxLILADJlNYsEAbsABZioogsAMmU1gjIbCAioobiiNZILADJlNYIyG4AMCKihuKI1kgsAMmU1gjIbgBAIqKG4ojWSCwAyZTWCMhuAFAioobiiNZILgAAyZTWLADJUW4AYBQWCMhuAGAIyEbsAMlRSMhIyFZGyFZRC24AAksS1NYRUQbISFZLbgACixLuAAJUFixAQGOWbgB\/4W4AEQduQAJAANfXi24AAssICBFaUSwAWAtuAAMLLgACyohLbgADSwgRrADJUZSWCNZIIogiklkiiBGIGhhZLAEJUYgaGFkUlgjZYpZLyCwAFNYaSCwAFRYIbBAWRtpILAAVFghsEBlWVk6LbgADiwgRrAEJUZSWCOKWSBGIGphZLAEJUYgamFkUlgjilkv\/S24AA8sSyCwAyZQWFFYsIBEG7BARFkbISEgRbDAUFiwwEQbIVlZLbgAECwgIEVpRLABYCAgRX1pGESwAWAtuAARLLgAECotuAASLEsgsAMmU1iwQBuwAFmKiiCwAyZTWCMhsICKihuKI1kgsAMmU1gjIbgAwIqKG4ojWSCwAyZTWCMhuAEAioobiiNZILADJlNYIyG4AUCKihuKI1kguAADJlNYsAMlRbgBgFBYIyG4AYAjIRuwAyVFIyEjIVkbIVlELbgAEyxLU1hFRBshIVktAAAAAgA7\/\/QB2gLUABUAKwAquAAsL7gAFi+5AAUAAvS4ACwQuAAQ0LgAEC+5ACEAAvS4AAUQuAAt3DAxATIeAhURFA4CIyIuAjURND4CFzQuAiMiDgIVERQeAjMyPgI1AQorTDghIThMKytLOCEhOEuQEBslFRUkHBAQHCQVFSUbEALUIThMK\/7AK0w4ISE4TCsBQCtMOCHKFSUbEBAbJRX+tBUlGxAQGyUVAAAAAAEAUgAAAXUCyAAHAC8AuAAARVi4AAAvG7kAAAAJPlm4AABFWLgAAi8buQACAAU+WboABAACAAAREjkwMQEzESMRByc3AQRxcWtHsgLI\/TgCP19TlQAAAAABAD8AAAHYAtQAHQBsuAAKK7sAGwANAAgADiu4ABsQuAAB0LgAAS9BBQBKAAgAWgAIAAJdQQkACQAIABkACAApAAgAOQAIAARduAAbELgAH9wAuAALRVi4AAIvG7kAAgAOPlm7ABYADAANAA4ruAACELkAAAAM9DAxNyEVIT0BATY1NC4CIyIOAgcnPgEzMh4CFRQHwgER\/mwBHREQGyQVFScgFwRTF25FK0s4ISFqamoBAWoXHhMjGQ8QFxoLNTpJIDdJKj0yAAEAH\/\/0AegCyAAnAE+4AAoruwAFAA0AFgAOK0EFAEoAFgBaABYAAl1BCQAJABYAGQAWACkAFgA5ABYABF24AAUQuAAo3AC7ABEADAAKAA4ruwAlAAwAIgAOKzAxAR4DFRQOAiMiJic3HgEzMj4CNTQuAiMiBgcGByc3IzUhFQcBKSlGMx0mQlkyRXEgZBE8JRsvJBQUJC8bBgsFKRw1r8ABWYQBzwkrPk4rMldBJkQ5NB0jFCIvGhsuIxQBAQgaJP9lNsMAAAAAAgAaAAAB7gLIAAoADQA5ALgAAEVYuAAILxu5AAgACT5ZuAAARVi4AAMvG7kAAwAFPlm6AAsAAwAIERI5ugANAAMACBESOTAxJRUjFSM1ITUBMxEhMxEB7k1l\/t4BFnH+6bL5ZZSUZQHP\/jEBOAAAAAEAL\/\/0Ae8CyAAoAHm4AAoruAApL7gAFi9BBQBKABYAWgAWAAJdQQkACQAWABkAFgApABYAOQAWAARduQAFAA30uAApELgAItC4ACIvuQAnAA30uAAFELgAKtwAuwARAAwACgAOK7sAJAAMACUADiu7AAAADAAbAA4rugAnABsAABESOTAxATIeAhUUDgIjIiYnNx4BMzI+AjU0LgIjIgYHDgEHJxEhFSMVNgECMVZBJSVBVjFFcR1kDzslGi0iFBQiLRoZLhECAQFEAUbhGwHOJUFWMTFWQSVHOjQeJhMiLRoaLSIUFBEBAgEuAWVlnAcAAAACACz\/9AHvAsgAFwArABQAuAAARVi4ABMvG7kAEwAJPlkwMQEyHgIVFA4CIyIuAjU0NjcTMwMyNhMyPgI1NC4CIyIOAhUUHgIBDi5SPiMjPlIuL1I+Iw0LynaKBQoFGCsgExMgKxgZKyATEyArAbcjPlIvL1E+IyM+US8cMhcBjv7uAf6oEyArGBkrIBMTICsZGCsgEwAAAAEAQgAAAdYCyAAIABQAuAAARVi4AAQvG7kABAAFPlkwMRMhFTEDIxMhNUIBlOJ14P7jAshf\/ZcCY2UAAAMAKf\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') format('truetype');font-weight:normal;font-style:normal}@media(min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.appmsg_card_ft,.appmsg_card_btn{font-size:15px}}.da_video_area .da_video_bg_cover{width:100%;min-height:100px;display:block;background-repeat:no-repeat;background-position:center center;background-size:cover}.da_btn_more{display:inline-block;color:#576b95;font-size:13px;border:1px solid #576b95;border-radius:3px;line-height:2.2;padding:0 .65em}.da_brand_info{display:flex;align-items:center;min-height:38px}.da_brand_info .da_brand_info_hd{width:35px;height:35px;display:inline-block;margin-right:10px;vertical-align:middle;border-radius:50%;overflow:hidden;background-repeat:no-repeat;background-position:center center;background-size:cover}.da_brand_info .da_brand_info_content{font-size:0;display:inline-block;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0);box-sizing:border-box;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.da_brand_info .da_brand_info_title{margin:0;font-size:14px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.da_brand_info .da_brand_info_details{margin:0;vertical-align:top;font-size:13px;color:#878787;-webkit-tap-highlight-color:rgba(0,0,0,0)}.discuss_icon_tips{margin-top:20px}.rich_tips.discuss_title_line{margin-top:30px}.discuss_item:first-child{margin-top:12px}.discuss_item:last-child{margin-bottom:20px}";
});
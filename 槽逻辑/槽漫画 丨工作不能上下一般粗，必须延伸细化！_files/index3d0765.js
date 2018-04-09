define("appmsg/comment.js",["biz_common/dom/class.js","appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/comment_tpl.html.js","appmsg/friend_comment_tpl.html.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js"],function(e,t,n,m){
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
c(),g([{
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
}],n,"mine"),g([{
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
}],m,"friend"),K.mylist.insertBefore(n,K.mylist.firstChild);
var i=K.fdlist.querySelectorAll("li.discuss_item");
if(i.length){
for(var d=!1,l=0;l<i.length;l++)if(!i[l].querySelector(".praise_num").innerHTML){
K.fdlist.insertBefore(m,i[l]),d=!0;
break;
}
d||K.fdlist.appendChild(m);
}else K.fdlist.appendChild(m),o(K.fdmain);
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
new_appmsg:window.new_appmsg
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
});define("appmsg/index.js",["biz_common/utils/string/html.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/moment.js","page/appmsg_new/combo.css","page/appmsg_new/not_in_mm.css","page/appmsg/page_mp_article_improve_combo.css","page/appmsg/not_in_mm.css","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/copyright_report.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/product.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/autoread.js","appmsg/voicemsg.js","appmsg/weproduct.js","appmsg/weapp.js","appmsg/new_index.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e){
"use strict";
function t(){
function t(e,t){
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
function r(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var t=e.timing;
i("[Appmsg] dns:"+(t.domainLookupEnd-t.domainLookupStart)+"^^^ ssl:"+(0==t.secureConnectionStart?0:t.connectEnd-t.secureConnectionStart)+"^^^ tcp:"+(t.connectEnd-t.connectStart)+"^^^ request:"+(t.responseStart-t.requestStart)+"^^^ getPackageTime:"+(t.responseEnd-t.responseStart)+"^^^ domCententLoaded:"+(t.domContentLoadedEventStart-t.domLoading)+"^^^ domComplete:"+(t.domComplete-t.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-t.navigationStart)+"^^^ interactiveTime:"+(page_endtime-t.navigationStart))+"^^^ ua:"+window.navigator.userAgent,
setTimeout(function(){
t.loadEventEnd&&i("[Appmsg] onload:"+(t.loadEventEnd-t.loadEventStart));
},100);
}
"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
}),""==document.getElementById("js_content").innerHTML.trim()&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_94_1");
var o=Math.random();
.001>o&&document.getElementById("js_read_area3")&&document.getElementById("js_read_area3").innerText&&document.getElementById("js_read_area3").innerText.indexOf("Pageview")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_95_1"),
window.__wxjs_is_wkwebview&&window.__addIdKeyReport("28307",67);
}
window.is_new_msg&&(m.on(document.getElementById("profileBt"),"click",function(){
a({
url:"/mp/appmsgreport?action=name_click",
data:{
url:location.href,
title:window.msg_title||"",
msgid:window.mid||"",
itemidx:window.idx||"",
__biz:window.biz||"",
ascene:window.ascene||-1,
isnew:1
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}),m.on(window,"load",function(){
l.invoke("setPageTitle",{
title:""
},function(){}),A=!1;
}),window.onscroll=function(){
var e=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
e>=document.getElementById("js_content").offsetTop&&0==A?(console.log(window.title+"init setPageTitle :top["+(document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop)+"]:content["+document.getElementById("js_content").offsetTop+"]"),
l.invoke("setPageTitle",{
title:window.title
},function(){}),A=!0):e<document.getElementById("js_content").offsetTop&&1==A&&(l.invoke("setPageTitle",{
title:""
},function(){}),A=!1);
});
var _=document.getElementsByTagName("body");
if(!_||!_[0])return!1;
_=_[0],function(){
var e=(new Date).getHours(),t=function(e,t){
t=t||"",window.isSg?(t=["uin:sougou","resp:"+t].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random()+"&from=sougou"):(t=["uin:"+top.window.user_uin,"resp:"+t].join("|"),
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
}();
var g=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&top.location.href&&g.test(top.location.href))&&!window.isSg)throw new Error("in iframe");
}catch(v){
var y="",b=new Image;
b.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+y+"&r="+Math.random()).substr(0,1024);
}
if(window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached){
var j=-1!=location.href.indexOf("?")?"&":"?";
location.replace(location.href.replace(/#rd$/,j+"rd2werd=1#wechat_redirect"));
}
var I=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var x=!c.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
e("appmsg/share.js");
var E=w(1e3*parseInt(top.window.modify_time)),R=E.format("YYYY-MM-DD"),z=document.getElementById("js_modify_time");
if(z&&(z.innerHTML=R),window.isSg||"mp.weixin.qq.com"==location.host){
var q=e("biz_common/log/jserr.js");
q({
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
var B=-1!=navigator.userAgent.indexOf("TBS/"),k=function(e,o){
t(e,function(e,t){
if(window.logs.webplog[e]=t?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
B&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var a=n.lossy&n.lossless&n.alpha;
o(!!a);
}
});
},T=function(e){
for(var t=document.getElementsByTagName("img"),o=!1,n=0,i=t.length;i>n;n++){
var a=t[n].getAttribute("data-src");
a&&a.isGif()&&(o=!0);
}
(f||navigator.userAgent.indexOf("Br_trunk")>-1)&&o&&c.isIOS&&c.gtVersion("6.5.13",!0)?(console.log("当前版本可以启用img代理"),
l.invoke("imageProxyInit",{},function(t){
console.log(t),t.err_msg.indexOf(":ok")>-1?(h=t.serverUrl,window.__addIdKeyReport("28307",117)):t.err_msg.indexOf(":fail")>-1&&window.__addIdKeyReport("28307",118),
e();
})):e();
},O=function(e){
k("lossy",e),k("lossless",e),k("alpha",e),k("animation",e);
};
window.webp=!1,T(function(){
O(function(t){
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
window.__addIdKeyReport("28307",66),a(e),o(e);
var n=e.__retryload;
return n=0,t=t.https2http(),e.__retryload=n,e.src=I.addParam(t,"retryload",n,!0),
!1;
};
m.on(e,"click",n);
}
}
}
function a(e){
e.className=e.className.replace("img_loading",""),e.className=e.className.replace("img_loadederror","");
}
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var r=document.getElementById("js_cover");
if(r){
var d=r.getAttribute("data-src");
d&&(d.isCDN()&&(d=d.imgChange640(),t&&(d=I.addParam(d,"tp","webp",!0)),d=I.addParam(d,"wxfrom","5",!0),
is_https_res||u?d=d.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(d=d.https2http())),
setTimeout(function(){
r.onload=function(){
s(r,"height","auto","important"),s(r,"visibility","visible","important");
},r.setAttribute("src",d);
},0),window.logs.img.read[d]=!0,window.logs.img.load[d]=!0,r.removeAttribute("data-src"));
}
var c=e("biz_wap/ui/lazyload_img.js"),p=1;
window.logs.outer_pic=0;
for(var l=document.getElementsByTagName("img"),w=0,_=l.length;_>w;w++){
{
var g=l[w].getAttribute("data-src");
l[w].getAttribute("src");
}
g&&g.isGif()&&l[w].className.indexOf("__bg_gif")<0&&(l[w].className+=" __bg_gif"),
g&&o(l[w]);
}
for(var f=document.getElementsByClassName("__bg_gif"),w=0,_=f.length;_>w;++w)f[w].setAttribute("data-order",w);
new c({
attrKey:"data-src",
imgOccupied:!0,
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
var n,a=top.window.navigator.userAgent,r=/TBS\/([\d\.]+)/i,s=a.match(r);
s&&s[1]&&(n=parseInt(s[1]));
var d,c=/XWEB\/([\d\.]+)/i,p=a.match(c);
p&&p[1]&&(d=parseInt(p[1]));
var m=1e3,l=top.window.user_uin||0,w=0!==l&&Math.floor(l/100)%1e3<m;
w&&(n>=43305||d>=16)&&o.isGif()?(o=I.addParam(o,"tp","wxpic",!0),window.__addIdKeyReport("28307",91)):window.webp&&(o=I.addParam(o,"tp","webp",!0),
window.__addIdKeyReport("28307",84)),o=I.addParam(o,"wxfrom","5",!0),is_https_res||u?(o=o.http2https(),
window.__addIdKeyReport("28307",77)):("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(o=o.https2http(),
window.__addIdKeyReport("28307",70));
}else try{
var r=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
r.test(t)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(_){}
var g=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
o=o.replace(g,"http://m.qpic.cn"),o=I.addParam(o,"wx_lazy","1",!0);
return h&&o.isGif()&&(window.__addIdKeyReport("28307",106),o=I.addParam(o,"tp","wxpic",!0),
o=h+"hevc?url="+encodeURIComponent(o)+"&type=gif"),window.logs.img.load[o]=!0,i("[Appmsg] image_load_event_change_src. originsrc:"+t+"  ^^^ newsrc : "+o),
e.start_load_time=+new Date,o;
},
onerror:function(e,t){
var o=t?t.__retryload||0:0;
if(1==o&&n(t),e&&!(o>p)){
if(!e.isCDN()){
if(!h)return;
if(-1==e.indexOf(h))return;
}
var a=0==e.indexOf("https://")?7:0;
if(window.__addIdKeyReport("28307",72+a),window.__addIdKeyReport("28307",75+1*o+a),
e.isWxpic()?(window.__addIdKeyReport("28307",93),window.__addIdKeyReport("28307",96+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",86),
window.__addIdKeyReport("28307",89+1*o)),h&&e.indexOf(h)>-1&&window.__addIdKeyReport("28307",108),
p>o){
if(o++,t.__retryload=o,1==o&&e.indexOf("http://")>-1?(e=e.http2https(),window.__addIdKeyReport("28307",60),
window.__addIdKeyReport("28307",77)):1==o&&e.indexOf("https://")>-1&&(window.__addIdKeyReport("28307",61),
window.__addIdKeyReport("28307",77)),h&&e.indexOf(h)>-1){
var r=e.split("hevc?url=")[1];
r=r.split("&type")[0],r=decodeURIComponent(r),r=r.replace("tp=wxpic",""),e=r.https2http();
}
t.start_load_time=+new Date,t.src=I.addParam(e,"retryload",o,!0);
}
window.__has_imgfailed||(window.__has_imgfailed=!0,window.__addIdKeyReport("28307",65)),
i("[Appmsg] image_load_event_on_error. src:"+e),t.setAttribute("data-fail",1);
var s=10;
/tp\=webp/.test(e)&&(s=11);
var d=new Image;
d.src="http://mp.weixin.qq.com/mp/jsreport?key="+s+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,t){
a(t),t.gray&&!t.loadGif&&((t.width||t.naturalWidth)<120||(t.height||t.naturalHeight)<120?t.autoTap&&t.autoTap():t.span&&t.span.children&&t.span.children.item(0)&&(t.span.children.item(0).style.display=""));
var o=t?t.__retryload||0:0;
if(!(o>p)){
i("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+o),
t.setAttribute("data-fail",0);
var n=0==e.indexOf("https://")?7:0;
window.__addIdKeyReport("28307",71+n),window.__addIdKeyReport("28307",73+1*o+n),
e.isWxpic()?(window.__addIdKeyReport("28307",92),window.__addIdKeyReport("28307",94+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",85),
window.__addIdKeyReport("28307",87+1*o)),h&&e.indexOf(h)>-1&&window.__addIdKeyReport("28307",107),
window.__has_imgsucceed||(window.__has_imgsucceed=!0,window.__addIdKeyReport("28307",64)),
1==o&&e.indexOf("http://")>-1&&window.__addIdKeyReport("28307",50),1==o&&e.indexOf("https://")>-1&&window.__addIdKeyReport("28307",52);
var r=Math.random(),s=+new Date-t.start_load_time;
s&&0==e.indexOf("https://")&&.5>r?(window.__addIdKeyReport("27822",121,s),window.__addIdKeyReport("27822",122)):s&&5e-4>r&&(window.__addIdKeyReport("27822",124,s),
window.__addIdKeyReport("27822",125));
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
var S=e("appmsg/copyright_report.js");
!function(){
var e=document.getElementById("post-user"),t=document.getElementById("copyright_info"),o=[],n=document.getElementById("post-user-headimg");
if(e){
var r="57";
"26"==window.source&&(r="95"),"28"==window.source&&(r="96"),"29"==window.source&&(r="39"),
"15"==window.source&&(r="121"),o.push({
dom:e,
username:user_name_new||user_name,
profileReportInfo:window.profileReportInfo||"",
scene:r
}),n&&o.push({
dom:n,
username:user_name_new||user_name,
profileReportInfo:window.profileReportInfo||"",
scene:r
});
}
t&&source_encode_biz&&o.push({
dom:t,
source_encode_biz:source_encode_biz,
scene:"110"
});
var s=document.getElementById("js_share_headimg");
s&&(window.new_appmsg&&window.source_encode_biz?m.on(s,"click",function(){
return location.href="/mp/profile_ext?action=home&__biz="+window.source_encode_biz+"#wechat_redirect",
!1;
}):o.push({
dom:s,
username:source_username,
scene:0
}));
var d=document.getElementById("js_share_author");
d&&(window.new_appmsg&&window.source_encode_biz?m.on(d,"click",function(){
return location.href="/mp/profile_ext?action=home&__biz="+window.source_encode_biz+"#wechat_redirect",
!1;
}):o.push({
dom:d,
username:source_username,
scene:0
}));
for(var p=0,w=o.length;w>p;p++)!function(e){
m.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
S.card_click_report({
scene:"0"
});
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?location.href=t:l.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
});
}else{
if(i("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
a({
url:"/mp/appmsgreport?action=name_click",
data:{
url:location.href,
title:window.msg_title||"",
msgid:window.mid||"",
itemidx:window.idx||"",
__biz:window.biz||"",
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
}),profileReportInfo){
var o=String(profileReportInfo).split("_");
3==o.length&&a({
url:"/mp/ad_biz_info?action=report&__biz="+window.biz+"&report_type=2&aid="+o[1]+"&tid="+o[2],
type:"GET",
dataType:"json",
async:!0,
success:function(){}
});
}
l.invoke("profile",{
username:e.username,
profileReportInfo:e.profileReportInfo||"",
scene:e.scene
},function(t){
window.__addIdKeyReport("28307","1"),i("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", profileReportInfo:"+e.profileReportInfo+", res.err_msg:"+t.err_msg);
});
}
return!1;
}),c.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(o[p]);
}(),function(){
location.href.match(/fontScale=\d+/)&&c.isIOS&&l.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
try{
var K=document.getElementById("js_author_name");
if(K){
var C="";
C="https://mp.weixin.qq.com/mp/author?action=show&author_id="+author_id+"#wechat_redirect",
m.on(K,"click",function(){
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(c.isIOS||c.isAndroid||c.isWp)?l.invoke("openUrlWithExtraWebview",{
url:C,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=C);
}):location.href=C;
});
}
}catch(v){}
var N=e("appmsg/outer_link.js");
if(new N({
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
}),!x){
var D=e("appmsg/review_image.js"),M=document.getElementById("js_cover"),W=[];
M&&W.push(M),new D({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:W
});
}
e("appmsg/product.js"),function(){
try{
var e=document.getElementById("js_content");
if(!e||!e.querySelectorAll)return;
for(var t=e.querySelectorAll("*"),o="js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-2,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link".split(","),n=function(e){
if(e&&e.className){
for(var t=e.className.split(/\s+/),n=[],i=0,a=t.length;a>i;++i){
var r=t[i];
r&&-1!=o.indexOf(r)&&n.push(r);
}
e.className=n.join(" ");
}
},i=0,a=t.length;a>i;++i){
var r=t[i];
r.tagName&&"iframe"!=r.tagName.toLowerCase()&&n(r);
}
}catch(s){}
}(),window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
window.__appmsgCgiData&&1==window.__appmsgCgiData.show_msg_voice&&e("appmsg/autoread.js"),
"1"==window.show_msg_voice&&(console.log("load voicemsg"),e("appmsg/voicemsg.js")),
window.__appmsgCgiData&&1==window.__appmsgCgiData.wxa_product&&e("appmsg/weproduct.js"),
e("appmsg/weapp.js"),window.new_appmsg&&e("appmsg/new_index.js"),e("appmsg/wxtopic.js"),
e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),setTimeout(function(){
window.article_improve_combo_css;
},0),setTimeout(function(){
m.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),d(),p(),e("appmsg/report_and_source.js"),function(){
if(x){
n.addClass(_,"not_in_mm");
var e=document.getElementById("js_pc_qr_code_img");
if(e){
var t=10000004,o=document.referrer;
if(0==o.indexOf("http://weixin.sogou.com")?t=10000001:0==o.indexOf("https://wx.qq.com")&&(t=10000003),
window.isSg)e.setAttribute("src",sg_qr_code.htmlDecode());else{
e.setAttribute("src","/mp/qrcode?scene="+t+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var i=new Image;
i.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+t+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var a=document.getElementById("js_profile_qrcode"),r=document.getElementById("js_profile_arrow_wrp"),s=document.getElementById("post-user");
if(a&&s&&r){
var d=function(){
var e=10000005,t=document.referrer;
0==t.indexOf("http://weixin.sogou.com")?e=10000006:0==t.indexOf("https://wx.qq.com")&&(e=10000007);
var o=document.getElementById("js_profile_qrcode_img");
if(o)if(window.isSg)o.setAttribute("src",sg_qr_code.htmlDecode());else{
o.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return a.style.display="block",r.style.left=s.offsetLeft-a.offsetLeft+s.offsetWidth/2-8+"px",
!1;
};
m.on(s,"click",d),m.on(a,"click",d),m.on(document,"click",function(e){
var t=e.target||e.srcElement;
t!=s&&t!=a&&(a.style.display="none");
});
}
}else{
var c=document.getElementById("js_report_article3");
!!c&&(c.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=document.getElementById("img-content");
if(e&&t&&t.getBoundingClientRect){
var o=t.getBoundingClientRect().height;
window.scrollTo(0,o);
}
}(),e("appmsg/report.js");
for(var t=document.getElementsByTagName("map"),o=0,i=t.length;i>o;++o)t[o].parentNode.removeChild(t[o]);
if(S.card_pv_report(),Math.random()<.01)try{
var a="https://js.aq.qq.com/js/aq_common.js",r=document.createElement("script");
r.src=a;
var s=document.getElementsByTagName("head")[0];
s.appendChild(r);
}catch(c){}
var l=document.getElementById("js_close_temp");
m.on(l,"click",function(){
l.parentNode.parentNode.removeChild(l.parentNode),n.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(o.os.ios&&"onorientationchange"in window){
var e=[],t="onorientationchange"in window?"orientationchange":"resize",n=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:n(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
m.on(window,t,function(){
var t=e.length-2,o=n();
if(t>=0){
var a=e[t],r=a.ori;
r!==o||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,a.scroll));
}
e.push({
ori:o,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
}),m.on(window,"scroll",function(){
var t=e.length-1;
e[t].ori==n()&&(e[t].scroll=window.pageYOffset||document.documentElement.scrollTop,
e[t].istouchmove=!0);
});
}
}(),i("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",r,!1):window.attachEvent&&window.attachEvent("onload",r),
e("appmsg/fereport.js"),function(){
window.addEventListener&&document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
c.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
c.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
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
var P=Math.random();
if(2e-4>P)try{
for(var Q=document.getElementsByTagName("img"),U=window.screen.height,L=window.screen.width,G=0,H=window.devicePixelRatio,G="",J=0,Y=Q.length;Y>J;J++){
var V=Q[J].getAttribute("data-src");
if(V){
var F=Q[J].getBoundingClientRect();
G+=L+"|"+U+"|"+F.left.toFixed(2)+"|"+(L-F.right).toFixed(2)+"|"+F.width.toFixed(2)+"|"+H.toFixed(2)+"|"+V+";";
}
}
a({
url:"/mp/wapreport?action=img_display_report",
data:{
key:G
},
type:"POST",
dataType:"json",
async:!0
});
}catch(v){}
}
e("biz_common/utils/string/html.js");
var o=e("biz_wap/utils/device.js"),n=e("biz_common/dom/class.js"),i=e("appmsg/log.js"),a=e("biz_wap/utils/ajax.js"),r=e("biz_common/dom/attr.js"),s=r.setProperty,d=e("appmsg/max_age.js"),c=e("biz_wap/utils/mmversion.js"),p=e("appmsg/test.js"),m=e("biz_common/dom/event.js"),l=e("biz_wap/jsapi/core.js"),c=e("biz_wap/utils/mmversion.js"),w=e("biz_common/moment.js");
window.new_appmsg?(e("page/appmsg_new/combo.css"),e("page/appmsg_new/not_in_mm.css")):(e("page/appmsg/page_mp_article_improve_combo.css"),
e("page/appmsg/not_in_mm.css"));
var _=top.window.user_uin||0,g=Math.floor(_/100)%1e3,u=0!==_&&1001>g,f=!0,h="";
window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.log("进入index.js init"),
i("[Appmsg] start run index.js init"),t();
var A=!1;
});
define("appmsg/comment_report.js",["biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_wap/utils/storage.js"],function(t){
"use strict";
var e,o,n=t("biz_wap/utils/ajax.js"),i=t("biz_common/dom/event.js"),m=t("biz_wap/utils/storage.js"),a=new m("comment_expose"),s=function(t){
var e=t.offsetTop;
return null!=t.offsetParent&&(e+=s(t.offsetParent)),e;
},d=document.getElementById("js_cmt_area"),c=document.getElementById("js_friend_cmt_area"),r=document.documentElement.clientHeight||window.innerHeight,_={
data:[],
appmsgid:"",
comment_id:"",
idx:"",
item_show_type:0,
biz:""
},p=function(t){
a.remove("comment_expose"),u(t);
},u=function(t){
n({
type:"post",
url:"/mp/appmsg_comment?action=exposurecomment",
data:{
comment_id:t.comment_id,
appmsgid:t.appmsgid,
idx:t.idx,
item_show_type:t.item_show_type,
__biz:t.biz,
data:JSON.stringify(t.data)
},
async:!1,
timeout:2e3
});
};
i.on(window,"scroll",function(){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,n=d.querySelectorAll(".js_comment_item"),i=c.querySelectorAll(".js_comment_item");
if(e||(e=s(d)),o||(o=s(c)),i.length)for(var m=0;m<i.length&&o+i[m].offsetTop<t+r;m++)1!=i[m].getAttribute("data-hasreport")&&(i[m].setAttribute("data-hasreport",1),
_.data.push({
content_id:i[m].dataset.content_id,
is_elected_comment:1*i[m].dataset.elected,
is_friend_comment:1,
scene:2
}));
if(n.length)for(var m=0;m<n.length&&e+n[m].offsetTop<t+r;m++)1!=n[m].getAttribute("data-hasreport")&&(n[m].setAttribute("data-hasreport",1),
_.data.push({
content_id:n[m].dataset.content_id,
is_elected_comment:1,
is_friend_comment:1*n[m].dataset.friend,
scene:1
}));
a.set("comment_expose",_);
}),i.on(window,"unload",function(){
p(_);
}),i.on(window,"load",function(){
var t=a.getData("comment_expose");
t.appmsgid&&p(t);
});
var l=function(t){
_.comment_id=t.comment_id,_.appmsgid=t.appmsgid,_.idx=t.idx,_.item_show_type=t.item_show_type||0,
_.biz=t.biz;
};
return l;
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
i(W.toast),window.history.back(-1),j();
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
if(t+e+100>n&&S.off(window,"scroll",a),!(Z||-1==Q||Q>0&&n-t-e>500)){
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
R({
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
Z=!1,i(W.loading),S.off(window,"scroll",B);
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
n=e.friend_comment,g(n,c,"friend"),W.fdlist.appendChild(c),n&&n.length?(m(W.fdmain),
(0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans)&&(i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),m(document.getElementById("js_cmt_addbtn3")))):i(W.fdmain),
function(){
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
var n=document.createDocumentFragment(),o=document.createDocumentFragment();
if(c(),console.log("------------------------",window.friend_comment_enabled),g([{
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
}],n,"mine"),W.mylist.insertBefore(n,W.mylist.firstChild),1==window.friend_comment_enabled){
g([{
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
}],o,"friend");
var i=W.fdlist.querySelectorAll("li.discuss_item");
if(i.length){
for(var d=!1,l=0;l<i.length;l++)if(!i[l].querySelector(".praise_num").innerHTML){
W.fdlist.insertBefore(o,i[l]),d=!0;
break;
}
d||W.fdlist.appendChild(o);
}else W.fdlist.appendChild(o),m(W.fdmain);
}
m(W.mylist.parentNode),W.input.value="",v();
};
if(window.test_comment_data)return void n({
my_id:"111"
});
var o="/mp/appmsg_comment?action=addcomment&scene="+U.scene+"&comment_id="+O+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
R({
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
K=1,m(t),R({
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
R({
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
document.querySelector("meta[name=viewport]"),window.test_comment_data||R({
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
i(document.getElementById("js_cmt_addbtn2"))):(m(document.getElementById("js_cmt_addbtn4")),
i(document.getElementById("js_cmt_addbtn3")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")));
}
function k(e){
var t=e.delegatedTarget,n=t.getAttribute("data-my-id"),m="/mp/appmsg_comment?action=delete&scene="+U.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+O+"&my_id="+n;
confirm("确定删除吗？")&&R({
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
0==W.mylist.children.length&&i(W.mylist.parentNode),v();
}
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
});
}
function B(){
try{
var e=W.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<window.innerHeight&&Z&&t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_45_1&lc=1&log0",
S.off(window,"scroll",B));
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
var S=e("biz_common/dom/event.js"),R=e("biz_wap/utils/ajax.js"),A=(e("biz_common/utils/string/html.js"),
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
}),S.on(W.input,"input",function(){
var e=d(W.input.value);
e.length<1?D.addClass(W.submit,"btn_disabled"):D.removeClass(W.submit,"btn_disabled");
}),S.on(W.list,"tap",".js_comment_praise",b),S.on(W.mylist,"tap",".js_comment_praise",b),
S.on(W.fdlist,"tap",".js_comment_praise",b),S.on(W.list,"tap",".js_reply_praise",I),
S.on(W.fdlist,"tap",".js_reply_praise",I),S.on(W.list,"tap",".js_del",k),S.on(W.mylist,"tap",".js_del",k),
S.on(W.fdlist,"tap",".js_del",k),S.on(W.list,"tap",".js_del",function(e){
e.preventDefault();
}),S.on(W.mylist,"tap",".js_del",function(e){
e.preventDefault();
}),S.on(W.fdlist,"tap",".js_del",function(e){
e.preventDefault();
}),S.on(W.submit,"tap",r),S.on(W.submit,"click",function(e){
e.preventDefault();
}),S.on(window,"scroll",a),S.on(window,"scroll",B),S.on(document.getElementById("js_cmt_write1"),"click",function(e){
e.preventDefault(),!!H&&console.log("push comment"),N.push("comment");
}),S.on(document.getElementById("js_cmt_write2"),"click",function(e){
e.preventDefault(),!!H&&console.log("push comment"),N.push("comment");
}),S.on(document.getElementById("js_cmt_write3"),"click",function(e){
e.preventDefault(),!!H&&console.log("push comment"),N.push("comment");
}),S.on(document.getElementById("js_cmt_write4"),"click",function(e){
e.preventDefault(),!!H&&console.log("push comment"),N.push("comment");
}),new q({
comment_id:O,
appmsgid:appmsgid,
idx:idx,
item_show_type:window.item_show_type||0,
biz:biz
});
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_appmsg_tag">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}else{#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_discuss_top">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}#>\n';
});define("appmsg/reward_entry.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","rt/appmsg/getappmsgext.rt.js","biz_wap/utils/mmversion.js","appmsg/appmsgext.js"],function(e,t,r,a){
"use strict";
function n(e){
e&&(e.style.display="block");
}
function i(e){
e&&(e.style.display="none");
}
function d(){
f.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:msg_title,
ct:ct,
devicetype:devicetype,
version:version,
is_need_reward:is_need_reward,
reward_uin_count:is_need_reward?3*l:0,
send_time:window.send_time||"",
rtId:"27613",
rtKey:"50",
onSuccess:function(e){
e&&(document.getElementById("js_reward_link")&&u.off(document.getElementById("js_reward_link"),"click",y),
s({
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp,
reward_author_head:e.reward_author_head
}));
},
onError:function(){}
});
}
function o(e){
return function(t){
return"0"==window.wx_user_can_reward?void a("你已成为该公众号的黑名单用户，暂时无法赞赏。"):(t.preventDefault(),
void g.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t.err_msg.indexOf(":ok")>-1||(location.href=e);
}));
};
}
function s(e){
var t=window.innerWidth||document.documentElement.innerWidth,r=(Math.ceil((v-188)/42)+1)*Math.floor((t-15)/42);
w="http://mp.weixin.qq.com/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&offset=0&count="+r+"&source=1#wechat_redirect";
var a="#wechat_redirect",s="";
s=source_mid&&source_biz&&source_idx?"https://mp.weixin.qq.com/mp/author?action=show&__biz="+source_encode_biz+"&appmsgid="+source_mid+"&idx="+source_idx+"&reprint_biz="+biz+"&reprint_appmsgid="+mid+"&reprint_idx="+idx+"&timestamp="+e.timestamp+"&author_id="+author_id+"&scene=141#wechat_redirect":"https://mp.weixin.qq.com/mp/author?action=show&__biz="+biz+"&appmsgid="+mid+"&timestamp="+e.timestamp+"&author_id="+author_id+"&idx="+idx+"&scene=142#wechat_redirect",
-1!=navigator.userAgent.indexOf("Android")&&(s="https://mp.weixin.qq.com/bizmall/reward?act=showpage&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&timestamp="+e.timestamp+"&showwxpaytitle=1"+a);
var m=document.getElementById("js_reward_link");
if(m&&(g.on("activity:state_change",function(e){
if("onResume"==e.state_change||"onResume"==e.state){
var t=(new Date).valueOf();
if(-1!=navigator.userAgent.indexOf("Android")&&localStorage.getItem("lastOnresumeTime")&&t-parseInt(localStorage.getItem("lastOnresumeTime"))<=j)return;
localStorage.setItem("lastOnresumeTime",t),g.invoke("setNavigationBarColor",{
actionCode:"1"
}),d();
}
}),y=o(s),u.on(m,"click",y),h.isIOS&&1==e.can_reward)){
m.setAttribute("class","reward_button"),n(document.getElementById("js_reward_author")),
n(document.getElementById("js_reward_avatar")),document.getElementById("js_reward_author_head").setAttribute("src",e.reward_author_head),
document.getElementById("js_reward_area").classList.add("reward_area_primary");
var l=document.getElementById("js_reward_link_text");
l.innerText="Like the Author";
var p=document.getElementById("js_like_total"),f=document.getElementById("js_like_total_parent"),z=document.getElementById("js_reward_total_parent");
p&&(p.innerText=e.reward_total,p.setAttribute("href",w)),f&&n(f),z&&i(z);
}
b=e.reward_head_imgs;
var E=_();
x.reward&&1==e.can_reward?(n(x.reward),u.on(window,"load",function(){
c&&(u.off(window,"scroll",c),u.on(window,"scroll",c));
})):i(x.reward);
var I=document.getElementById("js_reward_inner");
I&&E>0&&n(I);
var B=document.getElementById("js_reward_total");
B&&(B.innerText=e.reward_total,B.setAttribute("href",w));
}
function m(e,t){
var r=document.createElement("span");
r.className="reward_user_avatar";
var a=new Image;
return a.onload=function(){
window.logs&&window.logs.reward_heads_total++,a.onload=a.onerror=null;
},a.onerror=function(){
window.logs&&window.logs.reward_heads_total++,window.logs&&window.logs.reward_heads_fail++,
a.onload=a.onerror=null;
},a.src=t,r.appendChild(a),e.appendChild(r),r;
}
function _(){
if(b.length){
var e=document.getElementById("js_reward_list"),t=0,r=document.createDocumentFragment();
if(e){
for(var a=0,n=b.length;n>a&&(t++,m(r,b[a]),t!=3*l);++a);
t>l&&(e.className+=" tl"),e.innerHTML="",e.appendChild(r);
}
return t;
}
}
function c(){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+v>x.reward.offsetTop&&(p({
type:"GET",
url:"/bizmall/reward?act=report&__biz="+biz+"&appmsgid="+mid+"&idx="+idx,
async:!0
}),u.off(window,"scroll",c),c=null);
}
var l,w,u=e("biz_common/dom/event.js"),p=e("biz_wap/utils/ajax.js"),g=e("biz_wap/jsapi/core.js"),h=(e("rt/appmsg/getappmsgext.rt.js"),
e("biz_wap/utils/mmversion.js")),f=e("appmsg/appmsgext.js"),v=window.innerHeight||document.documentElement.clientHeight,x={
reward:document.getElementById("js_reward_area")
},b=[],j=500;
window.logs&&(window.logs.reward_heads_total=0,window.logs.reward_heads_fail=0);
var y=function(){};
return{
handle:function(e,t){
l=t,s(e);
},
render:function(e){
l=e,_();
}
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
});
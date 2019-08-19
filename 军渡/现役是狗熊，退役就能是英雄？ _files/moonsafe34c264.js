!function(){
var e=window.moon&&moon.moonsafe_id||29715,t=window.moon&&moon.moonsafe_key||0,o=[],n={},r=function(e){
return"[object Array]"==Object.prototype.toString.call(e);
},a=function(e,t,a){
a=a||1,n[e]||(n[e]=0),n[e]+=a,t&&(r(t)?o=o.concat(t):o.push(t)),setTimeout(function(){
s();
},1500);
},s=function(){
var r=[],a=o.length,i=["r="+Math.random()];
for(var c in n)n.hasOwnProperty(c)&&r.push(e+"_"+(1*c+1*t)+"_"+n[c]);
for(var c=0;a>c&&!(c>=10);++c)i.push("log"+c+"="+encodeURIComponent(o[c]));
if(!(0==r.length&&i.length<=1)){
var m,l="idkey="+r.join(";")+"&lc="+(i.length-1)+"&"+i.join("&");
if(window.ActiveXObject)try{
m=new ActiveXObject("Msxml2.XMLHTTP");
}catch(p){
try{
m=new ActiveXObject("Microsoft.XMLHTTP");
}catch(u){
m=!1;
}
}else window.XMLHttpRequest&&(m=new XMLHttpRequest);
m&&(m.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),m.setRequestHeader("cache-control","no-cache"),
m.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
m.setRequestHeader("X-Requested-With","XMLHttpRequest"),m.onreadystatechange=function(){
4===m.readyState&&(o.length>10?(o=o.slice(10),s()):(o=[],n={}));
},o=[],n={},m.send(l));
}
},i=0,c=1,m=4,l=5,p=6,u=7,f=19,d=21,h=22;
!function(){
for(var e=window.alert,t=window.__alertList||[],o=0,n=t.length;n>o;++o)a(i,t[o]);
window.alert=function(t){
e(t),a(i,["[moonsafe][alert][url]:"+location.href,"[moonsafe][alert][msg]:"+t]);
};
}(),function(){
for(var e=function(e){
if(e){
var t=e.match(/http(?:s)?:\/\/([^\/]+?)(\/|$)/);
if(t&&!/qq\.com$/.test(t[1])&&!/weishi\.com$/.test(t[1]))return!0;
}
return!1;
},t=function(e){
if(e){
var t=e.match(/http(?:s)?:\/\/([^\/]+?)(\/|$)/);
if(t&&!/qq\.com$/.test(t[1])&&!/weishi\.com$/.test(t[1])&&!/mmbiz\.qpic\.cn$/.test(t[1])&&!/(wx|mmbiz)\.qlogo\.cn$/.test(t[1]))return!0;
}
return!1;
},o=document.getElementsByTagName("script"),n=window.WebKitMutationObserver||window.MutationObserver||window.MozMutationObserver,r="function"==typeof n,s=/^http(s)?:\/\/mp\.weixin\.qq\.com\/s/.test(location.href),i=0;i<o.length;i++)e(o[i].src)&&(a(c,["[moonsafe][script][url]:"+location.href,"[moonsafe][script][src]:"+o[i].src,"[moonsafe][script][ua]:"+navigator.userAgent]),
r||a(m,["[moonsafe][observer][notsupport_url]:"+location.href,"[moonsafe][observer][notsupport_ua]:"+navigator.userAgent]),
s||a(l,["[moonsafe][observer][notappmsg_url]:"+location.href]),"https:"==location.protocol&&a(p,["[moonsafe][observer][https_url]:"+location.href])),
!window.__nonce_str||o[i].type&&"text/javascript"!=o[i].type.toLowerCase()||o[i].getAttribute("nonce")||a(d,["[moonsafe][csp][nonce_empty]:"+o[i].innerHTML.substr(0,200)]);
for(var g=document.getElementsByTagName("iframe"),i=0;i<g.length;i++)e(g[i].src)&&a(u,["[moonsafe][iframe][url]:"+location.href,"[moonsafe][iframe][src]:"+g[i].src,"[moonsafe][iframe][ua]:"+navigator.userAgent]);
for(var w=document.getElementsByTagName("img"),i=0;i<w.length;i++)t(w[i].src)&&a(h,["[moonsafe][img][url]:"+location.href,"[moonsafe][img][src]:"+w[i].src,"[moonsafe][img][ua]:"+navigator.userAgent]);
var v=document.createElement("iframe");
v.src=location.protocol+"//mp.weixin.qq.com/mp/readtemplate?t=appmsg/cspsupport_test_tmpl&level=1",
v.style.display="none",document.body.appendChild(v);
var y=document.createElement("iframe");
if(y.src=location.protocol+"//mp.weixin.qq.com/mp/readtemplate?t=appmsg/cspsupport_test_tmpl&level=2",
y.style.display="none",document.body.appendChild(y),document.documentElement&&document.documentElement.outerHTML){
var q=document.documentElement.outerHTML,b=/<!--tailTrap.*?<script([^>]*?)>(.*?)<\/script>.*?-->/i;
b.test(q)&&a(f,["[moonsafe][tailtrap][attr]:"+RegExp.$1,"[moonsafe[tailtrap][inline]:"+RegExp.$2]);
}
}();
}();
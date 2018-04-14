define("new_video/player.html.js",[],function(){
return'<div id="js_mpvedio_<#=id#>" class="js_mpvedio">\n<div class="js_page_video page_video <#if(ratio==(16/9)){#>ratio_primary<#}#>" style="width:<#=width#>px;height:<#=height#>px;display:<#=display#>;">\n    <!--ps: @拉风\n        1.全屏body添加扩展类： full_screen_mv\n        2.全屏是竖屏播放的情况：需要给page_video这个div加一个margin-left,margin-top\n        这两个值是page_video设置的高度和宽度的一半的负数；\n        3.如果是横屏的话(横屏默认为全屏)，page_video上设置的宽度和高度去掉即可。\n    -->\n\n<!--     <div class="wrp_loading js_loading">\n        <div class="wrp_svg">\n            <svg  class="rotate_svg" width="64" height="64" xmlns="http://www.w3.org/2000/svg">\n                <circle cx="50%" cy="50%" r="40%" stroke-width="4"/>\n                <path fill="#fff" stroke="#f00" stroke-width="4" fill-opacity="0" d="M4.5 35\n               A 26 26, 0,0,0, 27 56" transform="rotate(330.191 30 30)">\n             <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="5s" repeatCount="indefinite"></animateTransform>\n\n          </path>\n            </svg>\n            <svg class="loader_bg" xmlns="http://www.w3.org/2000/svg" width="64" height="64">\n                <circle cx="50%" cy="50%" r="40%" style="fill:#a5a4a2;stroke:#a5a4a2;stroke-width:4;fill-opacity:0;"></circle>\n            </svg>\n        </div>\n    </div>     -->\n    <!--下载腾讯视频-->\n    <div id="ing_download_<#=id#>" class="app_download_container" style="display:none;">\n        <# if (window.cgiData) { #>\n        <img class="app_thumb" src="<#=window.cgiData.appImg||""#>">\n        <# } else { #>\n        <img class="app_thumb" src="">\n        <# } #>\n        <span class="btn_app_download_wrp js_download_btn">\n            <span class="btn_app_download js_download_text">下载</span>\n        </span>\n        <span class="btn_app_download_wrp js_progress_main" style="display:none;">\n            <span class="btn_app_download progress_text js_progress_text"></span>\n            <span class="app_download_progress js_progress" style="width:0%;"></span>\n        </span>\n        <div class="app_download_info">\n            <strong class="app_download_title">提升3倍流畅度</strong>\n            <p class="app_download_desc"><span class="js_installStatus"></span>腾讯视频客户端</p>\n        </div>\n    </div>\n\n    <!-- 视频加载失败 -->\n    <!--\n    <div class="wx_video_error_box">\n        <div class="wx_video_error_msg">\n            <p>视频加载失败，请刷新重试</p>\n            <a class="wx_video_error_msg_btn" href="javascript:void(0);">刷新</a>\n        </div>\n        <img class="wx_video_error_loading" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIXRSTlMAOx20pMJbzBQNTDGTh2ohLCZmeUF2hEmXCFdxUquef4yHE17nAAACnklEQVRIx9WW2xqiIBSFRc1AUATJU1a+/1MOm0NYKvnNXM260ZLftRcbqCQinOLI0yiY/iXKuUZPjx5Fk+6RhF1yHiVF0wC6IZfr9fqIkpRqdNyQ9AoiUU8g+YZ8Xn96YmNKvkhkLMskKgEo/yJzaxkXeZsGsjeWKEIFU/FBZgA+D5yEwGtTgR0J18lYUvdcLZ1YkUjLf+a0saYYSG/J3Hury+WSkTCjCETtF6Mvd8QGJMZSWIfsAlKhWGRl5zQ1ZNBDgy/zzvvFavWUK7SyTRs+rsiUZS/4LHIHyo8VgBx7vDkKx2WhPS7dD1Q6cNlu2dTa0gMys4bz/vJR6ph8ADgcVcSVUkfnhzJTc6gRj8fbCOHk30UI2KC+V4gKjskJQqC5frFHli0kafogFIfFkAXVCSqdAFVR8pmtVCWiXCtaarbWpGtQAYx7sjf2GCbfjFRQpH7lTLucveSMBE7+Z6VqViT2/PVs0d7hPk9TUcTaUuVaT8k/f/v6SXOgyG7InZaSvM8vj/309LrbvpSAORDH2/kWGyHhm/u5AYUc8qdFBRRrsV749bRv6I5x1OY50GZUUxQz9aGplAXZcOQ1DL3vwsTyvHQ2YWgjZV2rDTmxYRjUuoBvcQDr7QRLBiiNzJ4BawG3FLtTmEMGBigTRyC2oIKht1vbwLWrKmXKBZal+yApDGhm4q5JCVdNdrZeQBe8B44WnE2NGmxrR1bCvMugHdkhSwMWI9wjIGeosnPlJmNrst6PQrpeFkBSyAmkdD016DYqAVC6HHcNtnCPgazcuytAd5IqB/qYtq4bkP7vnEaL3W4KH9/HhKBAKl8XFUlMIWYIek4hZgh6UtjHBLVA4pPkCKRf9jOQ5Kwp1UvPDyb3qkPJaRG8Ln7f8Q8Bki/Kj5IYnQAAAABJRU5ErkJggg==">\n    </div>\n    -->\n    <!--菊花-->\n    <div class="wrp_loading js_loading start_loading"  style="display:none;">\n        <div class="mid_opr">\n            <div class="spinner" role="progressbar"\n                style="position: absolute; width: 0px; z-index: 2000000000; left: 50%; top: 50%;backface-visibility:hidden; -webkit-backface-visibility:hidden;">\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-0-12 1.25s linear infinite;-webkit-animation: opacity-60-25-0-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(0deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(0deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-1-12 1.25s linear infinite;-webkit-animation: opacity-60-25-1-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(30deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(30deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-2-12 1.25s linear infinite;-webkit-animation: opacity-60-25-2-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(60deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(60deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-3-12 1.25s linear infinite;-webkit-animation: opacity-60-25-3-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(90deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(90deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-4-12 1.25s linear infinite;-webkit-animation: opacity-60-25-4-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(120deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(120deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-5-12 1.25s linear infinite;-webkit-animation: opacity-60-25-5-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(150deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(150deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-6-12 1.25s linear infinite;-webkit-animation: opacity-60-25-6-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(180deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(180deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-7-12 1.25s linear infinite;-webkit-animation: opacity-60-25-7-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(210deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(210deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-8-12 1.25s linear infinite;-webkit-animation: opacity-60-25-8-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(240deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(240deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-9-12 1.25s linear infinite;-webkit-animation: opacity-60-25-9-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(270deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(270deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-10-12 1.25s linear infinite;-webkit-animation: opacity-60-25-10-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(300deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(300deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-11-12 1.25s linear infinite;-webkit-animation: opacity-60-25-11-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(330deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(330deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n            </div>\n        </div>\n        <!--\n        <svg version="1.1" class="svg_loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n        width="60px" height="60px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve">\n\n        <circle cx="30" cy="30" r="26" style="fill:#a5a4a2;stroke:#a5a4a2;stroke-width:4;fill-opacity:0" />\n        <path  fill="#fff" stroke="#fff"  stroke-width="4"  fill-opacity="0" d="M4.5 35A 26 26, 0,0,0, 27 56" style="stroke-linecap:round;">\n        <animateTransform attributeType="xml"\n        attributeName="transform"\n        type="rotate"\n        from="0 30 30"\n        to="360 30 30"\n        dur="0.5s"\n        repeatCount="indefinite"/>\n        </path>\n        </svg>\n        -->\n    </div>\n\n    <!-- 播放按钮 z-index:12 -->\n    <div class="video_pause_controll js_video_pause_controll">\n        <a class="btn_pause js_btn_pause">\n            <i class="icon_pause"></i>\n        </a>\n    </div>\n\n    <!-- 互选视频广告 静音btn 静音状态className:muting -->\n    <# if(ad_muted_btn){ #>\n    <span class="js_muted_btn video_muted_btn muting">静音</span>\n    <# } #>\n\n    <!-- 视频广告 z-index:13 -->\n    <div class="video_ad js_ad_controll" style="display:none;">\n        <span class="button_left_time video_ad_time_meta">广告<span class="button_left_time_num js_play_time"></span></span>\n        <a href="javascript:void(0);" class="btn_close js_btn_can_close_ad video_ad_time_meta" style="display:none;">可在<span class="js_can_close_time">(5s)</span>后关闭</a>\n        <a href="javascript:void(0);" class="btn_close js_btn_close_ad video_ad_time_meta" style="display:none;">关闭<i></i></a>\n\n    </div>\n    <!-- 视频广告详情入口 -->\n    <div class="video_ad_detail js_ad_detail" style="display:none;">\n        <!--带小程序logo时，className 去掉with_arrow，加className with_weapp-->\n        <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_detail">\n            <!-- 小程序图标 -->\n            <span class="icon26_weapp_white js_video_post_weapp_icon" style="display:none;"></span>了解详情\n        </a>\n    </div>\n    <!--带小程序icon-->\n    <!-- <div class="video_ad_detail js_ad_detail" style="display:none;">\n        <a href="javascript:;" class="btn btn_ad_detail with_weapp js_btn_ad_detail">\n            <span class="icon26_weapp_white js_video_post_weapp_icon"></span>\n            了解详情\n        </a>\n    </div> -->\n\n    <div class="video_ad_detail js_ad_app" style="display:none;">\n        <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_app">下载应用</a>\n    </div>\n\n     <!--最后的视频推荐 z-index:11-->\n    <div class="js_end_dom continue_play none">\n        <!--\n        <div class="continue_inner">\n            <div class="hd_opr"><a href="#" class="btn_replay"><i class="icon_replay"></i>重新播放</a></div>\n            <div class="tit_desc">以下视频将跳到腾讯视频播放</div>\n            <ul class="video_list">\n               <li class="video_item">\n                   <a href="#" class="inner_item">\n                       <img  class="cover" src="<%@GetResFullName($images_path$pages/default_avator.png)%>"/>\n                       <div class="desc">\n                        这里是video的标题啊标题京东覅是\n                       </div>\n                   </a>\n               </li>\n            </ul>\n        </div>\n        -->\n    </div>\n\n    <!-- 无障碍按钮 -->\n    <em data-status="0" role="button" class="js_btn_play_aria btn_pause_accessibility"></em>\n\n    <!--封面-->\n    <!-- 跟播放器相同比例是style加上：\n        -webkit-background-size:cover;background-size:cover;  -->\n    <#if(cover){#>\n    <div class="js_poster_cover poster_cover" style="background-image:url(<#=cover#>)">\n        <!-- <img aria-labelledby="封面" alt="封面" src="<#=cover#>">\n        <div class="poster_cover_mask"></div> -->\n    </div>\n    <#}#>\n    <!--大播放-->\n    <div style="display:none;" class="full_screen_opr js_video_play_controll">\n        <div class="mid_play_box js_btn_play">\n            <i class="icon_mid_play"></i>\n            <p class="js_video_length video_length" style="display:none;"></p>\n        </div>\n    </div>\n\n\n    <!--mask,暂停状态下，提醒状态等的半透明蒙层-->\n    <div class="video_mask none"></div>\n\n    <!--快进。后退 操作 快进：next,快退，pre-->\n    <div  class="mid_opr fast_pre_next none js_forward">\n        <p class="video_length">\n            <span class="played_time js_forward_play_time">03:30</span>\n            <em>/</em>\n            <span class="total_time">03:30</span>\n        </p>\n        <div class="video_processor_bar">\n            <div class="processor_bar_inner js_forward_bar" style="width:30%;"></div>\n        </div>\n    </div>\n\n   <!--播放条-->\n    <!--消失opr_fade_out  出现opr_fade_in-->\n    <!--消失opr_fade_out  出现opr_fade_in-->\n    <div class="js_controll video_opr" style="display:none">\n         <div class="opr_inner">\n            <div class="opr_inner_fl">\n                <div class="js_switch switch switch_on"><!--switch_off 关闭，switch on开启-->\n                     <a href="javascript:void(0);" class="btn_opr">on/off</a>\n                 </div>\n                <div class="played_time js_now_play_time">\n                      00:00\n                </div>\n            </div>\n\n             <div class="wrp_play_bar">\n                <div class="js_progress_bar wrp_progress" style="display:none;">\n                    <div class="progress_bar">\n                        <div class="js_played_bar played_bar" style="width:0%"></div>\n                        <div class="js_buffer_bar buffer_bar" style="width:0%"></div><!--缓冲条-->\n                        <div class="js_played_speed_cnt wrp_speed_dot"><i class="speed_dot" style="left:0%"></i></div>\n                    </div>\n                </div>\n             </div>\n\n            <!-- <div class="wrp_pop_play"><a href="#" class="pop_play">小窗</a></div> -->\n            <!--清晰度选择-->\n           <!--  <div class="play_mode">\n                 <a href="#" class="btn_mode current">超清</a>\n                 <div class="pop_mode_select">\n                     <ul class="clarity">\n                         <li class="clarity_item current">超清</li>\n                         <li class="clarity_item">标清</li>\n                         <li class="clarity_item">流畅</li>\n                     </ul>\n                 </div>\n            </div> -->\n            <div class="opr_inner_fr">\n                <div class="total_time js_total_time" style="display:none;"></div>\n                <# if (!_mustHideFullScreen) { #><div class="js_full_screen_control screenSize_control full"><i class="icon_control"></i></div>  <!--全屏className：full,小窗className：small-->\n<# } #>\n            </div>\n         </div>\n    </div>\n    <!--视频-->\n    <div class="js_inner inner not_fullscreen">\n        <div class="js_video_poster video_poster" style="display:none;">\n            <div class="video_mask"></div>\n             <video class="<#if(videoFit){#>video_fill<#}#>"  webkit-playsinline playsinline>\n                  您的浏览器不支持 video 标签\n             </video>\n        </div>\n    </div>\n\n</div>\n\n    <!--全屏遮罩-->\n<div class="js_full_mask full_mask" style=""></div>\n\n<!--\n11 菊花\n10 最后的视频推荐\n9封面上边的控制按钮\n8  以后的广告浮层\n7 封面\n6 视频+控制条 （在里边控制条z-index>视频） -->\n\n</div>\n';
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
user_uin:top.window.user_uin,
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
user_uin:top.window.user_uin,
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
});define("a/sponsor_a_tpl.html.js",[],function(){
return'<div class="ct_mpda_area <#if(window.new_appmsg){#>appmsg_card_context<# } #>" id="js_ad_area">\n    <div class="ct_mpda_placeholder">\n        <p class="ct_mpda_tips">广告，也可以是生活的一部分</p>\n    </div>\n    <div class="ct_mpda_inner js_ad_link" id="js_ad_inner" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>" data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="ct_mpda_hd">\n            <# if(pt==108 || pt==109 || pt==110){ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# }else if(pt==116 || pt==117){ #>\n            <div id="js_video_container"></div>\n            <# }else{ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# } #>\n        </div>\n        <div class="ct_mpda_bd" id="js_ad_message">\n            <span class="ct_mpda_logo img_bg_cover" style="background-image:url(<#=biz_info.head_img#>)"></span>\n            <div class="ct_mpda_desc_box">\n                <p class="ct_mpda_title"><#=biz_info.nick_name#></p>\n                <p class="ct_mpda_details" id="js_ad_detail">提供的广告</p>\n            </div>\n            <# if(dest_type== 6){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more"><i class="icon26_weapp_blue"></i>查看详情</a>\n            <# }else if(pt== 108||pt==116){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">查看详情</a>\n            <# }else if(pt==109){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">下载应用</a>\n            <# }else if(pt==110||pt==117){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">了解公众号</a>\n            <# } #>\n            <a class="ct_mpda_btn_about" id="js_btn_about">关于广告</a>\n        </div>\n    </div>\n</div>\n';
});define("a/a_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n        <#if(window.new_appmsg){#>\n        <div class="mod_title_context">\n            <strong class="mod_title">广告</strong>\n        </div>\n        <#}else{#>\n        <div class="rich_tips with_line title_tips">\n            <span class="tips">广告</span>\n        </div>\n        <# } #>\n    <# } #>\n    <div class="js_ad_link extra_link <# if(pt==107){ #>preview_img_primary<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(pt==1){ #>\n            <#=hint_txt#>\n            <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n            <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n        <# }else if(pt==2||pt==107||pt==119){ #>\n            <!--第三方logo-->\n            <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n            <# } #>\n            <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n            <# if(watermark_type!=0){ #>\n                <i class="promotion_tag" id="js_promotion_tag">\n                <# if(pt==119){ #>\n                <span class="icon26_weapp_white"></span>\n                <# } #>\n\n                <# if(watermark_type==1){ #>\n                    商品推广\n                <# }else if (watermark_type==2){ #>\n                    活动推广\n                <# }else if (watermark_type==3){ #>\n                    应用下载\n                <# } #>\n                </i>\n            <# } #>\n        <# }else if(pt==7||pt==120){ #>\n        <!-- 图文 -->\n        <div class="preview_group preview_card">\n            <div class="preview_group_inner card_inner">\n                <div class="preview_group_info">\n                    <strong class="preview_group_title2"><#=hint_txt#></strong>\n                    <div class="preview_group_desc"><#=ad_desc#></div>\n                    <img data-src="<#=image_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                </div>\n                <i class="promotion_tag">\n                    <# if(pt==120){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n                    活动推广\n                </i>\n            </div>\n        </div>\n        <# }else if(pt==115){ #>\n        <div class="preview_group mod_follow_with_img">\n            <div class="wx_flex_layout">\n                <div class="wx_flex_bd">\n                    <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                </div>\n                <div class="wx_flex_ft">\n                    <span class="radius_avatar"><img data-src="<#=biz_info.head_img#>" alt="" class="js_alazy_img"></span>\n                    <strong class="fwi_nickname"><#=biz_info.nick_name#></strong>\n                    <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">查看</a>\n                    <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">关注</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==100){ #>\n        <div class="preview_group follow <# if(!!biz_info.show_comm_attention_num){ #>with_tips<# } #>">\n            <div class="preview_group_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <# if(!!biz_info.show_comm_attention_num){ #>\n                    <div class="preview_group_desc weak_tips">有<#=biz_info.comm_attention_num#>个好友关注</div>\n                    <# } #>\n                    <# if(!!biz_info.head_img){ #>\n                    <img data-src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius js_alazy_img" >\n                    <# }else{ #>\n                    <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>" >\n                    <# } #>\n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn">查看</a>\n                    <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn">关注</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==102){ #>\n        <div class="preview_group">\n            <div class="preview_group_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <img data-src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius js_alazy_img">\n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download">下载</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==101){ #>\n        <div class="preview_group preview_card">\n            <div class="preview_group_inner card_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn">下载</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==103||pt==104){ #>\n        <div class="preview_group obvious_app">\n            <div class="preview_group_inner">\n                <div class="pic_app">\n                    <img data-src="<#=image_url#>" alt="" class="js_alazy_img">\n                </div>\n                <div class="info_app">\n                    <p class="name_app"><#=app_info.app_name#></p>\n                    <# if(pt==103){ #>\n                    <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                    <# } else if(pt==104){ #>\n                    <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                    <# } #>\n                    <!--星级评分-->\n                    <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                        <!--\n                            半星：star_half\n                            一星：star_one\n                            一星半：star_one_half\n                            二星：star_two\n                            三星：star_three\n                            四星：star_four\n                            五星：star_five\n                        -->\n                        <span class="js_stars stars" style="display:none;"></span>\n                        <!--暂无评分\n                        <span class="scores">3.5</span>\n                        -->\n                        <span class="js_scores scores"></span>\n                    </p>\n                    <div class="dm_app">\n                        <a id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn">下载</a>\n                        <p class="extra_info">来自<# if(pt==103){ #>App Store<# }else{ #>腾讯应用宝<# } #></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==105){ #>\n        <div class="mpda_card cardticket">\n            <div class="cardticket_hd cell">\n                <div class="cell_hd">\n                    <span class="radius_avatar">\n                        <img class="avatar js_alazy_img" data-src="<#=card_info.card_logo_url#>" >\n                    </span>\n                </div>\n                <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                <div class="cell_ft">\n                    <a class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">领券</a>\n                </div>\n            </div>\n            <div class="cardticket_ft">\n                <div class="cardticket_theme"></div>\n                <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n            </div>\n        </div>\n        <# }else if(pt==106){ #>\n        <!-- 小店广告 -->\n        <div class="preview_group preview_card preview_shop_card">\n            <div class="preview_group_inner shop_card_inner">\n                <div class="preview_group_info">\n                    <strong class="preview_shop_card_title"><#=mp_shop_info.name#></strong>\n                    <div class="preview_shop_card_desc">\n                        <span class="preview_card_desc_meta btn_plain_primary preview_shop_card_btn_buy js_ad_btn" id="js_shop_action_<#=pos_type#>">购买</span>\n                        <span class="preview_card_desc_meta preview_shop_card_oldprice">&yen;<#=mp_shop_info.ori_price/100#></span>\n                        <span class="preview_card_desc_meta preview_shop_card_price">&yen;<#=mp_shop_info.cur_price/100#></span>\n                    </div>\n                    <img data-src="<#=mp_shop_info.img#>" alt="" class="preview_card_avatar js_alazy_img">\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==111||pt==113||pt==112||pt==114){ #>\n        <!-- 背景高斯模糊带描述文字、带背景图的app下载 -->\n        <div class="preview_group download_app_with_desc js_download_app_card">\n            <div class="preview_group_inner" style="background-image:url(<#=image_url#>)">\n                <div class="preview_group_hd">\n                    <div class="preview_group_hd_inner">\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <a id="js_appdetail_action_<#=pos_type#>" class="preview_group_btn js_ad_btn">下载</a>\n                        <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">继续</a>\n                        <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">打开</a> -->\n                        <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn with_processor"><i class="btn_processor" style="width:35%;"></i><span class="btn_processor_value">35%</span></a> -->\n                    </div>\n                </div>\n                <# if(pt==111||pt==113){ #>\n                <div class="preview_group_bd">\n                    <div class="preview_group_desc"><#=hint_txt.split(\'|\')[0]#></div>\n                    <div class="preview_group_desc"><#=hint_txt.split(\'|\')[1] || ""#></div>\n                </div>\n                <div class="preview_group_ft"><div class="preview_group_download_info"><span class="download_size" ><#=app_info.app_size#></span>&nbsp;来自<# if(pt==111){ #>App Store<# }else{ #>腾讯应用宝<# } #></div></div>\n                <# } #>\n            </div>\n        </div>\n        <# }else if(pt==122||pt==121){ #>\n        <!-- app下载类广告 -->\n        <!--117 新卡片 begin -->\n        <div class="preview_group mod_method117">\n            <div class="wx_flex_layout">\n                <div class="wx_flex_bd">\n                    <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                </div>\n                <div class="wx_flex_ft">\n                    <span class="radius_avatar"><img data-src="<#=app_info.icon_url#>" alt="" class="js_alazy_img"></span>\n                    <strong class="fwi_nickname"><#=app_info.app_name#></strong>\n                    <a id="js_appdetail_action_<#=pos_type#>" class="wx_min_plain_btn primary js_ad_btn">下载</a>\n                    <!-- <a href="#" class="wx_min_plain_btn primary btn_progress">\n                        <span class="btn_progress_inner" style="width:37%;">\n                            <span class="btn_progress_bd" style="width:57px;">暂停</span>\n                        </span>\n                        暂停\n                    </a> -->\n                </div>\n            </div>\n        </div>\n        <!--117 end-->\n        <!--互选广告 begin-->\n        <# }else if(pt==125 || pt==140 || pt==142){ #>\n        <div class="da_area">\n          <div class="da_inner">\n            <!--广告头部-->\n            <div class="da_hd">\n              <div class="da_video_area">\n                <!-- <span class="da_video_bg_cover" id="js_main_img" style="background-image:url(<#=video_info.thumbUrl#>)"></span> -->\n                <!--放视频-->\n                <div id="js_video_container"></div>\n              </div>\n            </div>\n            <!--广告信息-->\n            <div class="da_bd">\n              <div class="da_brand_info">\n                <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                <div class="da_brand_info_content">\n                  <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                </div>\n              </div>\n              <a class="da_btn_more"><# if(dest_type==6){ #><span class="icon26_weapp_blue"></span><# } #>查看详情</a>\n            </div>\n          </div>\n        </div>\n        <# } #>\n        <!--互选广告 end-->\n    </div>\n</div>\n';
});define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function t(e){
var t=e.url||"";
t=t.replace(/&amp;/g,"&");
var o=t.indexOf("?"),r=0;
(119==e.pt||120==e.pt)&&(r=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
t.indexOf("?")>=0?t=t.slice(0,o)+".html"+t.slice(o):t+=".html";
var n="",p="";
if(document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(n=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
"undefined"==typeof c)var c=top.biz;
p=e.traceid+":"+n+":"+c+":"+e.aid+":"+e.pos_type;
var m={
scene:1067,
sceneNote:p,
userName:e.weapp_info.original_id+"@app",
relativeURL:t,
appVersion:1
},s=!1,d=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(d){
var _=Number(d[1]),l=Number(d[2]),g=Number(d[3]);
_>6?s=!0:6===_&&l>5?s=!0:6===_&&5===l&&g>=3&&(s=!0);
}
return console.log("canJumpOnTap : ",s,e.weapp_info.original_id,navigator.userAgent),
s?void a.invoke("openWeApp",m,function(t){
"openWeApp:ok"===t.err_msg&&i(125+r,e.report_param),"system:function_not_exist"===t.err_msg&&(location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect",
i(126+r,e.report_param));
}):(location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect",
void i(126+r,e.report_param));
}
function o(e){
a.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(e){
console.log(e);
});
}
{
var a=e("biz_wap/jsapi/core.js"),r=e("biz_common/utils/report.js");
e("biz_wap/utils/mmversion.js");
}
return{
openWxopen:t,
startConnect:o
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
},see_ad_detail_report=[!1,!1,!1,!1,!1,!1],see_ad_detail_first_see_time=0,ping_test_apurl_random=Math.random()<.3,innerHeight=window.innerHeight||document.documentElement.clientHeight,innerHeight_new=getWindowHeight(),ad_engine=0,keyOffset="https:"==top.location.protocol?5:0;
return{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});

                !function(e,t,i){function r(e,n){this.config=i.extend(!0,{},a,e);var o=r.serializeOpenGraph();this.pageInfo=i.extend({title:o.title||t.title,url:o.url||t.location.href,pic:("array"===i.type(o.image)?o.image[0]:o.image)||"",desc:o.description||"",site:o.site_name||""},n)}var a={weibo:{appkey:""},douban:{},qq:{},qzone:{}};r.serializeOpenGraph=function(){var e={};i('meta[property^="og:"]').each(function(t,r){r=i(r);var a=r.attr("property").replace(/^og\:/,"");e[a]=r.attr("content")});var t=i('meta[property="og:image"]');return t.length>1&&(e.image=t.map(function(e,t){return i(t).attr("content")}).toArray()),e},r.prototype={constructor:r,set:function(e,t){var r={};r[e]=t,i.extend(this.config,r)},get:function(e){var t=i.extend({},this.pageInfo,this.config[e]);return{douban:{url:"https://www.douban.com/share/service/?"+i.param({href:t.url,name:t.title,image:t.pic,text:t.desc})},weibo:{url:"http://v.t.sina.com.cn/share/share.php?"+i.param({appkey:t.appkey,url:t.url,title:t.title,pic:t.pic})},qq:{url:"http://connect.qq.com/widget/shareqq/index.html?"+i.param({url:t.url,desc:t.title,pics:t.pic,site:t.site})},qzone:{url:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+i.param({url:t.url,title:t.title,summary:t.desc,pics:t.pic})}}[e]},openInNewWindow:function(t,r){r=r||{};var a=r.width||500,n=r.height||360,o=i.extend({},{width:a,height:n,toolbar:0,location:0,resizable:1,scrollbars:"yes",left:r.left||(screen.width-a)/2,top:r.top||(screen.height-n)/2},r);e.open(t,"SocialSharing",i.param(o).replace(/&/g,","))}},window.SocialSharing=r}(window,document,jQuery);

            ;
            $(function() {
    var doc = $(document)
    var logVendors = {
        'weibo': 'bshare_sina',
        'qq': 'bshare_qqim',
        'qzone': 'bshare_qzone'
    }
    var windowFeatures = {
        qq: { width: 800, height: 600 },
        qzone: { width: 800, height: 600 }
    }

    function gen_qrcode(layer, url) {
        layer.find('.sharing-wechat-qrcode').html('<img src="//img3.doubanio.com/dae/qrgen/v2/' + encodeURIComponent(url) + '.png" alt="扫描二维码" />')
    }
    doc.delegate('.sharing-indicator', 'click', function() {
        var parent = $(this).closest('.sharing')
        var layer = parent.find('.sharing-layer')
        if (layer.hasClass('is-hidden')) {
            var url = parent.data('target')['url']
            layer.removeClass('is-hidden')
            gen_qrcode(layer, url)
        } else {
            layer.addClass('is-hidden')
        }
    })
    $('body').bind('click', function(e) {
        if ($(e.target).hasClass('sharing-indicator')) {
            return
        }
        var layer = $('.sharing-layer')
        if (!layer.hasClass('is-hidden')) {
            if (!$(e.target).closest('.sharing-layer').length) {
                layer.addClass('is-hidden')
            }
        }
    })
    $('.sharing-layer').bind('click', function(e) {
        if ($(e.target).closest('.sharing-list').length) {
            $('.sharing-layer').addClass('is-hidden')
            return
        }
        e.stopPropagation()
    })
    doc.delegate('[data-share]', 'click', function() {
        var elem = $(this)
        var network = elem.data('share')
        var parent = $(this).closest('.sharing')
        var pageInfo = parent.data('target') || {}
        var socialSharing = new SocialSharing({
            weibo: {
                appkey: '3015934887'
            }
        }, pageInfo)
        var url = 'https://www.douban.com/link2?type=redir&vendor=' + logVendors[network] + '&url=' + encodeURIComponent(socialSharing.get(network).url)
        socialSharing.openInNewWindow(url, windowFeatures[network])
    });
});

        ;
              Do(function(){
                $("html").delegate(".thing-like-note-fav .btn-fav","click",function(d){var c=$(this);var a=c.attr("data-object_id");var b=c.hasClass("fav-cancel")?1:0;if(c.hasClass("stat-processing")){return}$.ajax({type:b?"delete":"post",url:"/j/note/like_thing_note",data:{note_id:a,ck:get_cookie("ck")},dataType:"json",success:function(e){}})});
              });
            ;
;
    Do(function(){var a=['<div class="popup-container hide">','<div class="popup-wrap">','<div class="popup-small">','<a class="close"></a>','<p class="popup-info">为确保你的帐户安全，并依《网络安全法》要求，<br/>操作前请先验证手机号。</p>','<div class="popup-btns">',' <a class="btn" href="javascript:;" target="_blank">前往验证</a>',"</div>","</div>","</div>","</div>"].join("");$("body").delegate(".js-verify-account","click",function(e){var t=$(this),p=t,i=$(".popup-container"),o=p.attr("data-is-verified"),r=p.attr("data-verify-url");o&&"false"!=o.toLowerCase()?p.attr("href")&&p.attr("href").length&&(location.href=p.attr("href")):(e.preventDefault(),i.size()<1&&($("body").append(a),i=$(".popup-container")),i.find(".btn").attr("href",r),i.removeClass("hide"))}).delegate(".popup-container .close","click",function(){$(".popup-container").addClass("hide")})});
  ;
Do(function() {
    $(document).delegate('.mod-usercard .lnk-contact-add', 'click', function(e) {
        e.preventDefault();
        var el = $(this);
        if (el.hasClass('processing')) {
            return;
        }
        el.addClass('processing');
        $.post_withck('/j/contact/addcontact', {
        people: el.data('id'),
        from: el.data('source')
        }, function(r) {
            el.removeClass('processing');
            if (!r.result) {
                return;
            }
            el.replaceWith('<span class="usercard-followed">已关注</span>');
        }, 'json');
    });
});

define("a/cpc_a_tpl.html.js",[],function(){
return'<!--有title “广告”，去掉 class appmsg_card_context。没有title “广告”，加class appmsg_card_context-->\n<div id="js_cpc_area"  class="js_ad_link  <# if(exp_obj.icon_pos != \'left\' && exp_obj.icon_pos != \'right\'){ #> appmsg_card_context <# } #> appmsg_card_active mpda_cpc_context pages_reset" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <!--有文字 "广告"-->\n    <# if(exp_obj.icon_pos == \'left\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"广告" 居左-->\n      <p class="mpda_cpc_title mpda_cpc_title_left">广告</p>\n    </div>\n    <# } else if(exp_obj.icon_pos == \'right\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"广告" 居右-->\n      <p class="mpda_cpc_title mpda_cpc_title_right">广告</p>\n    </div>\n    <# } #>\n    <div class="mpda_cpc_inner">\n      <div class="appmsg_card_bd mpda_cpc_bd" style="background-image:url(<#=image_url#>)"></div>\n\n      <div class="appmsg_card_ft mpda_cpc_ft <# if(!exp_obj.price){ #> single<# } #>">\n          <# if(exp_obj.icon_pos == \'left\' || exp_obj.icon_pos == \'right\'){ #>\n\n          <# } else { #>\n          <span class="dropdown_opr_tips">\n              广告\n              <span class="dropdown_opr_popover"></span>\n          </span>\n          <# } #>\n          <!--title 金额-->\n\n          <# if(!!exp_obj.sale_text){ #>\n          <span class="appmsg_card_msg">\n              <span class="appmsg_card_msg_title">\n                  <#=exp_obj.sale_text#>\n              </span>\n              <# if(!!exp_obj.price){ #>\n              <span class="appmsg_card_msg_supp price">\n                  ¥<#=exp_obj.price#>\n              </span>\n              <# } #>\n          </span>\n          <# } #>\n\n          <a href="javascript:void(0);" class="appmsg_card_btn">\n              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt="">\n              <#=exp_obj.btn_text#>\n          </a>\n          <!--\n          <a href="javascript:void(0);" class="link_tips">\n              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAh1BMVEUAAAD19fX19fX////09PT09PT09PT09PT19fX09PT29vb29vb4+Pj////19fX09PT19fX09PR1htvJz+t6i9zS1+6wuefs7fLn6fKSn+GFlN5/j93w8fTZ3O+8xOmMmuCiruScqOOYpOLGzOvByOqrteamseWAkN7g4/De4e/N0uzM0uyAkN1rIPf0AAAAEXRSTlMAf/ML6NnTv6qlclIjFoLyg7LPVaEAAAFSSURBVDjLlZXZcoMwDEWNgRAIkPgGCEuWZu/2/99XlxYjUBgP9wUjnUGWLAsxVByFgS+lH4RRLCaVpAtFtEiTl5jrSDWSdFzOrTz1Qt5qzDlqQs4w7FJNaknDU46TLK41+kpZ9J+R69lAzyWB7cETyR35uc6qYtdXPtHghnMFWj1zY0k1uGDcUUN11QBNac5diJhx+wbZp37cgYcxxiJi4AEo2kWNkzFGImTgFti2iwsyYwxFMAm+Z+SLgfCH++vBWwbcjMMXku7ugqoDHwDeSA+Ldf9y1b5TB+rUi33vWwufZotL2YEf11IR+SSZM3A0yYwVkPI0eoOTYEgK/o2qO8GcgRE5wvMfsKuBkoExaYr8tyDH4knLQppCpOPuwmnHwHTYuF+1xrI752QyvgplftAYkzPjcs25rvYBMHOk2IfUrLFnH6QzRjNXsrEPe/vv4weFgFW8AqzRsgAAAABJRU5ErkJggg==" alt="">\n              去逛逛\n          </a>\n          -->\n        </div>\n    </div>\n</div>\n';
});define("a/sponsor_a_tpl.html.js",[],function(){
return'<div class="ct_mpda_area <#if(window.new_appmsg){#>appmsg_card_context<# } #>" id="js_ad_area">\n    <div class="ct_mpda_placeholder">\n        <p class="ct_mpda_tips">广告，也可以是生活的一部分</p>\n    </div>\n    <div class="ct_mpda_inner js_ad_link" id="js_ad_inner" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>" data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="ct_mpda_hd">\n            <# if(pt==108 || pt==109 || pt==110){ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# }else if(pt==116 || pt==117){ #>\n            <div id="js_video_container"></div>\n            <# } #>\n        </div>\n        <div class="ct_mpda_bd" id="js_ad_message">\n            <span class="ct_mpda_logo img_bg_cover" style="background-image:url(<#=biz_info.head_img#>)"></span>\n            <div class="ct_mpda_desc_box">\n                <p class="ct_mpda_title"><#=biz_info.nick_name#></p>\n                <p class="ct_mpda_details" id="js_ad_detail">提供的广告</p>\n            </div>\n            <# if(pt== 108||pt==116){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">查看详情</a>\n            <# }else if(pt==109){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">下载应用</a>\n            <# }else if(pt==110||pt==117){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">了解公众号</a>\n            <# } #>\n            <a class="ct_mpda_btn_about" id="js_btn_about">关于广告</a>\n        </div>\n    </div>\n</div>\n';
});define("a/a_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n        <#if(window.new_appmsg){#>\n        <div class="mod_title_context">\n            <strong class="mod_title">广告</strong>\n        </div>\n        <#}else{#>\n        <div class="rich_tips with_line title_tips">\n            <span class="tips">广告</span>\n        </div>\n        <# } #>\n    <# } #>\n    <div class="js_ad_link extra_link <# if(pt==107){ #>preview_img_primary<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(pt==1){ #>\n            <#=hint_txt#>\n            <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n            <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n        <# }else if(pt==2||pt==107||pt==119){ #>\n            <!--第三方logo-->\n            <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n            <# } #>\n            <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n            <# if(watermark_type!=0){ #>\n                <i class="promotion_tag" id="js_promotion_tag">\n                <# if(pt==119){ #>\n                <span class="icon26_weapp_white"></span>\n                <# } #>\n\n                <# if(watermark_type==1){ #>\n                    商品推广\n                <# }else if (watermark_type==2){ #>\n                    活动推广\n                <# }else if (watermark_type==3){ #>\n                    应用下载\n                <# } #>\n                </i>\n            <# } #>\n        <# }else if(pt==7||pt==120){ #>\n        <!-- 图文 -->\n        <div class="preview_group preview_card">\n            <div class="preview_group_inner card_inner">\n                <div class="preview_group_info">\n                    <strong class="preview_group_title2"><#=hint_txt#></strong>\n                    <div class="preview_group_desc"><#=ad_desc#></div>\n                    <img data-src="<#=image_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                </div>\n                <i class="promotion_tag">\n                    <# if(pt==120){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n                    活动推广\n                </i>\n            </div>\n        </div>\n        <# }else if(pt==115){ #>\n        <div class="preview_group mod_follow_with_img">\n            <div class="wx_flex_layout">\n                <div class="wx_flex_bd">\n                    <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                </div>\n                <div class="wx_flex_ft">\n                    <span class="radius_avatar"><img data-src="<#=biz_info.head_img#>" alt="" class="js_alazy_img"></span>\n                    <strong class="fwi_nickname"><#=biz_info.nick_name#></strong>\n                    <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">查看</a>\n                    <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">关注</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==100){ #>\n        <div class="preview_group follow <# if(!!biz_info.show_comm_attention_num){ #>with_tips<# } #>">\n            <div class="preview_group_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <# if(!!biz_info.show_comm_attention_num){ #>\n                    <div class="preview_group_desc weak_tips">有<#=biz_info.comm_attention_num#>个好友关注</div>\n                    <# } #>\n                    <# if(!!biz_info.head_img){ #>\n                    <img data-src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius js_alazy_img" >\n                    <# }else{ #>\n                    <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>" >\n                    <# } #>\n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn">查看</a>\n                    <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn">关注</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==102){ #>\n        <div class="preview_group">\n            <div class="preview_group_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <img data-src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius js_alazy_img">\n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download">下载</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==101){ #>\n        <div class="preview_group preview_card">\n            <div class="preview_group_inner card_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn">下载</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==103||pt==104){ #>\n        <div class="preview_group obvious_app">\n            <div class="preview_group_inner">\n                <div class="pic_app">\n                    <img data-src="<#=image_url#>" alt="" class="js_alazy_img">\n                </div>\n                <div class="info_app">\n                    <p class="name_app"><#=app_info.app_name#></p>\n                    <# if(pt==103){ #>\n                    <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                    <# } else if(pt==104){ #>\n                    <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                    <# } #>\n                    <!--星级评分-->\n                    <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                        <!--\n                            半星：star_half\n                            一星：star_one\n                            一星半：star_one_half\n                            二星：star_two\n                            三星：star_three\n                            四星：star_four\n                            五星：star_five\n                        -->\n                        <span class="js_stars stars" style="display:none;"></span>\n                        <!--暂无评分\n                        <span class="scores">3.5</span>\n                        -->\n                        <span class="js_scores scores"></span>\n                    </p>\n                    <div class="dm_app">\n                        <a id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn">下载</a>\n                        <p class="extra_info">来自<# if(pt==103){ #>App Store<# }else{ #>腾讯应用宝<# } #></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==105){ #>\n        <div class="mpda_card cardticket">\n            <div class="cardticket_hd cell">\n                <div class="cell_hd">\n                    <span class="radius_avatar">\n                        <img class="avatar js_alazy_img" data-src="<#=card_info.card_logo_url#>" >\n                    </span>\n                </div>\n                <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                <div class="cell_ft">\n                    <a class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">领券</a>\n                </div>\n            </div>\n            <div class="cardticket_ft">\n                <div class="cardticket_theme"></div>\n                <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n            </div>\n        </div>\n        <# }else if(pt==106){ #>\n        <!-- 小店广告 -->\n        <div class="preview_group preview_card preview_shop_card">\n            <div class="preview_group_inner shop_card_inner">\n                <div class="preview_group_info">\n                    <strong class="preview_shop_card_title"><#=mp_shop_info.name#></strong>\n                    <div class="preview_shop_card_desc">\n                        <span class="preview_card_desc_meta btn_plain_primary preview_shop_card_btn_buy js_ad_btn" id="js_shop_action_<#=pos_type#>">购买</span>\n                        <span class="preview_card_desc_meta preview_shop_card_oldprice">&yen;<#=mp_shop_info.ori_price/100#></span>\n                        <span class="preview_card_desc_meta preview_shop_card_price">&yen;<#=mp_shop_info.cur_price/100#></span>\n                    </div>\n                    <img data-src="<#=mp_shop_info.img#>" alt="" class="preview_card_avatar js_alazy_img">\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==111||pt==113||pt==112||pt==114){ #>\n        <!-- 背景高斯模糊带描述文字、带背景图的app下载 -->\n        <div class="preview_group download_app_with_desc js_download_app_card">\n            <div class="preview_group_inner" style="background-image:url(<#=image_url#>)">\n                <div class="preview_group_hd">\n                    <div class="preview_group_hd_inner">\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <a id="js_appdetail_action_<#=pos_type#>" class="preview_group_btn js_ad_btn">下载</a>\n                        <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">继续</a>\n                        <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">打开</a> -->\n                        <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn with_processor"><i class="btn_processor" style="width:35%;"></i><span class="btn_processor_value">35%</span></a> -->\n                    </div>\n                </div>\n                <# if(pt==111||pt==113){ #>\n                <div class="preview_group_bd">\n                    <div class="preview_group_desc"><#=hint_txt.split(\'|\')[0]#></div>\n                    <div class="preview_group_desc"><#=hint_txt.split(\'|\')[1] || ""#></div>\n                </div>\n                <div class="preview_group_ft"><div class="preview_group_download_info"><span class="download_size" ><#=app_info.app_size#></span>&nbsp;来自<# if(pt==111){ #>App Store<# }else{ #>腾讯应用宝<# } #></div></div>\n                <# } #>\n            </div>\n        </div>\n        <# }else if(pt==122||pt==121){ #>\n        <!-- app下载类广告 -->\n        <!--117 新卡片 begin -->\n        <div class="preview_group mod_method117">\n            <div class="wx_flex_layout">\n                <div class="wx_flex_bd">\n                    <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                </div>\n                <div class="wx_flex_ft">\n                    <span class="radius_avatar"><img data-src="<#=app_info.icon_url#>" alt="" class="js_alazy_img"></span>\n                    <strong class="fwi_nickname"><#=app_info.app_name#></strong>\n                    <a id="js_appdetail_action_<#=pos_type#>" class="wx_min_plain_btn primary js_ad_btn">下载</a>\n                    <!-- <a href="#" class="wx_min_plain_btn primary btn_progress">\n                        <span class="btn_progress_inner" style="width:37%;">\n                            <span class="btn_progress_bd" style="width:57px;">暂停</span>\n                        </span>\n                        暂停\n                    </a> -->\n                </div>\n            </div>\n        </div>\n        <!--117 end-->\n        <!--互选广告 begin-->\n        <# }else if(pt==125){ #>\n        <div class="da_area">\n          <div class="da_inner">\n            <!--广告头部-->\n            <div class="da_hd">\n              <div class="da_video_area">\n                <!-- <span class="da_video_bg_cover" id="js_main_img" style="background-image:url(<#=video_info.thumbUrl#>)"></span> -->\n                <!--放视频-->\n                <div id="js_video_container"></div>\n              </div>\n            </div>\n            <!--广告信息-->\n            <div class="da_bd">\n              <div class="da_brand_info">\n                <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                <div class="da_brand_info_content">\n                  <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                </div>\n              </div>\n              <a class="da_btn_more">查看详情</a>\n            </div>\n          </div>\n        </div>\n        <# } #>\n        <!--互选广告 end-->\n    </div>\n</div>\n';
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
});define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function t(e){
var t=e.url||"";
t=t.replace(/&amp;/g,"&");
var a=t.indexOf("?"),r=0;
(119==e.pt||120==e.pt)&&(r=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
t.indexOf("?")>=0?t=t.slice(0,a)+".html"+t.slice(a):t+=".html";
var n="",p="";
document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(n=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
p=e.traceid+":"+n+":"+biz+":"+e.aid+":"+e.pos_type;
var c={
scene:1067,
sceneNote:p,
userName:e.weapp_info.original_id+"@app",
relativeURL:t,
appVersion:1
},m=!1,s=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(s){
var d=Number(s[1]),_=Number(s[2]),l=Number(s[3]);
d>6?m=!0:6===d&&_>5?m=!0:6===d&&5===_&&l>=3&&(m=!0);
}
return console.log("canJumpOnTap : ",m,e.weapp_info.original_id,navigator.userAgent),
m?void o.invoke("openWeApp",c,function(t){
"openWeApp:ok"===t.err_msg&&i(125+r,e.report_param),"system:function_not_exist"===t.err_msg&&(location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect",
i(126+r,e.report_param));
}):(location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect",
void i(126+r,e.report_param));
}
function a(e){
o.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(e){
console.log(e);
});
}
{
var o=e("biz_wap/jsapi/core.js"),r=e("biz_common/utils/report.js");
e("biz_wap/utils/mmversion.js");
}
return{
openWxopen:t,
startConnect:a
};
});define("a/card.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_wap/jsapi/cardticket.js"],function(e,t,a,i){
"use strict";
function o(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function s(e){
var t=e.adData,a=e.pos_type||0,i=t.tid,r=t.type,p=t.url,d=t.rl,l={};
e.report_param=e.report_param||"";
var m=e.btn;
if(m){
n.on(m,"click",function(n){
if(!l[i]){
l[i]=!0;
var m,j,u,f,b=!!n&&n.target;
b&&(m=_.getX(b,"js_ad_link")+n.offsetX,j=_.getY(b,"js_ad_link")+n.offsetY,u=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
f=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
c({
type:r,
report_type:2,
click_pos:0,
url:encodeURIComponent(p),
tid:i,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:a,
pt:105,
pos_x:m,
pos_y:j,
ad_w:u||0,
ad_h:f||0
},function(){
l[i]=!1,o(37,e),s.openCardDetail(t.card_id,t.card_ext,e);
});
}
return!1;
});
}
}
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),p=e("a/a_report.js"),c=p.AdClickReport,_=(e("biz_wap/utils/ajax.js"),
e("biz_wap/utils/position.js")),d=(e("biz_wap/jsapi/core.js"),e("biz_wap/jsapi/cardticket.js"));
return s.openCardDetail=function(e,t,a){
d.openCardDetail({
card_id:e,
card_ext:t,
success:function(){
!!a&&o(38,a);
},
error:function(){
!!a&&o(39,a),i("调起卡券错误");
},
access_denied:function(){
!!a&&o(40,a),i("异常错误[access_denied]");
}
});
},s;
});define("biz_wap/utils/position.js",[],function(){
"use strict";
function e(t,f){
var s=t.offsetLeft;
if(t.offsetParent&&t.offsetParent.className){
var a=t.offsetParent.className;
-1==a.indexOf(f)&&(s+=e(t.offsetParent,f));
}
return s;
}
function t(e,f){
var s=e.offsetTop;
if(e.offsetParent&&e.offsetParent.className){
var a=e.offsetParent.className;
-1==a.indexOf(f)&&(s+=t(e.offsetParent,f));
}
return s;
}
return{
getX:e,
getY:t
};
});define("a/a_report.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","appmsg/log.js"],function(o){
"use strict";
function e(o,e){
var a="https:"==top.location.protocol?1500:1200,_="/mp/advertisement_report?r="+Math.random()+"&ascene="+encodeURIComponent(window.ascene||-1)+"&",d=[],c=!1;
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
var t=o("biz_wap/utils/ajax.js"),r=window.__report,a=top.location.protocol,n="https:"==a?5:0,i=o("biz_wap/jsapi/core.js"),p=o("biz_wap/utils/mmversion.js"),s=o("appmsg/log.js");
return{
AdClickReport:e
};
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">提交</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">我的留言</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n        </div>\n    </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">提交</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">我的留言</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">加载中</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">已留言</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n';
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n<li class="discuss_item" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\'>\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_appmsg_tag primary">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\'>\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}else{#>\n<li class="discuss_item" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\'>\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_discuss_top">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\'>\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}#>\n';
});define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js"],function(t,n){
"use strict";
function i(){
v.WIDTH=S=_("#js_article").width()||_("#js_cmt_mine").width(),v.pageCount=M=e(),
o(),a(),s();
}
function e(){
d=S-2*P,C=parseInt(d/W),k=3*C-1;
var t=parseInt(R/k);
return R%k!==0&&t++,t;
}
function o(){
var t=_("#js_slide_wrapper"),n=v.wrapperWidth=M*S;
t.css({
width:n+"px"
});
}
function a(){
for(var t=_("#js_slide_wrapper").el[0],n=(S-C*W)/2,i=0,e=M;e>i;i++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),t.appendChild(o),_(o).css({
width:S+"px",
"float":"left",
"padding-left":n+"px",
"padding-right":"0"
}),r(o,i,n);
}
}
function s(){
for(var t=_("#js_navbar"),n=0,i=M;i>n;n++){
var e=_(_.el("li"));
e.attr("class","emotion_nav js_emotion_nav"),D.push(e),t.append(e);
}
v.navs=D;
}
function r(t,n,i){
for(var e=0,o=k;o>e;e++){
var a=document.createElement("li");
if(y++,y>R)break;
a=c(y),_(t).append(a);
}
var s=m(i);
_(t).append(s);
}
function c(t){
var n=_(_.el("li")),i=_(_.el("i")),e=0;
i.attr("class","icon_emotion icon"+t),i.css({
"background-position":"0px "+((1-t)*Z-e)+"px"
}),n.attr("class","emotion_item js_emotion_item"),n.attr("data-index",t);
var o=W+"px";
return n.css({
width:o,
height:o
}),n.append(i),n;
}
function m(t){
var n=_(_.el("li")),i=_(_.el("i"));
n.attr("class","emotion_item del js_emotion_item"),n.attr("data-index",-1),i.attr("class","icon_emotion del");
var e=W+"px";
return n.css({
width:e,
height:e,
right:t+"px"
}),n.append(i),n;
}
function p(){
function t(){
o.show(),w.show(),e.blur(),_.later(function(){
e.blur();
});
}
function n(){
o.hide(),w.hide(),e.focus(),_.later(function(){
e.focus();
});
}
w=_("#js_emotion_panel");
var i=_("#js_cmt_input"),e=i.el[0],o=_("#js_emotion_panel_arrow_wrp");
w.hide(),_("#js_emotion_switch").on("tap",function(i){
i.preventDefault(),i.stopPropagation(),g=!g,g?t():n();
}),i.on("tap",function(){
w.hide(),g=!1;
});
}
function l(){
function t(t){
if(!v.isMoved){
var n=_(t.currentTarget),i=+n.attr("data-index");
h.inputEmotion(i);
}
}
_("li.js_emotion_item").on("click",t),_("li.js_emotion_item").on("touchend",t);
}
function u(t){
for(var n=[],i=0;i<x.length;i++){
var e=x[i];
if(e.cn){
var o=new RegExp(e.cn.replace("[","\\[").replace("]","\\]"),"g"),a=t.match(o);
a&&(n=n.concat(a));
}
if(e.emoji){
var o=new RegExp(e.emoji,"g"),a=t.match(o);
a&&(n=n.concat(a));
}
}
return _.each(n,function(n){
if(void 0!==I[n]){
var i=I[n],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
t=t.replace(n,o);
}
}),t;
}
for(var d,_=t("appmsg/emotion/dom.js"),f=t("appmsg/emotion/slide.js"),v=t("appmsg/emotion/common.js"),j=t("appmsg/emotion/nav.js"),h=t("appmsg/emotion/textarea.js"),n=(_.each,
{}),g=!1,w=null,x=t("biz_common/utils/emoji_data.js"),b=t("biz_common/utils/emoji_panel_data.js"),E={},I={},O=[],T=0;T<x.length;T++){
var N=x[T];
E[N.id]=N;
}
for(var T=0;T<b.length;T++){
var z=b[T],N=E[z];
I[N.cn]=T,N.emoji&&(I[N.emoji]=T),O.push(N.style);
}
var M,k,C,S,D=[],P=15,R=v.EMOTIONS_COUNT,W=v.EMOTION_LI_SIZE,Z=v.EMOTION_SIZE;
n.init=function(){
p(),i(),f.init(),j.activeNav(0),l(),h.init();
};
var y=0;
return n.encode=function(t){
t=u(t);
var n=/\/([\u4e00-\u9fa5\w]{1,4})/g,i=t.match(n);
return i?(_.each(i,function(n){
var i=n.replace("/",""),e=[i.slice(0,4),i.slice(0,3),i.slice(0,2),i.slice(0,1)];
_.each(e,function(n){
if(void 0!==I["["+n+"]"]){
var i=I["["+n+"]"],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
t=t.replace("/"+n,o);
}
});
}),t):t;
},n.hidePannel=function(){
w.hide();
},n;
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
var t=top.window.user_uin||0,n=0!==t&&Math.floor(t/100)%1e3<o;
return n?void r.invoke("openUrlWithExtraWebview",{
url:e,
openType:i.openType||1
},function(e){
e&&"openUrlWithExtraWebview:ok"===e.err_msg?i.resolve&&i.resolve():i.reject&&i.reject();
}):void(i.reject&&i.reject());
};
return i;
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
});
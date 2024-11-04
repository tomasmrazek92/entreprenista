"use strict";(()=>{var I=window.innerWidth,b={};var D=(r,n,i,l,f)=>{let o=$(r);o.length!==0&&(b[i]=0,b[i]=b[i]||0,o.each(function(){let a=`${i}_${b[i]}`;O(this,n,a,[".swiper-arrow",".swiper-pag",".swiper-drag-wrapper"]);let c=A(l,a);M(this,n,a,i,c,f),b[i]++}))},O=(r,n,i,l)=>{l.forEach(f=>{$(r).find(f).addClass(i)}),$(r).find(n).addClass(i)},A=(r,n)=>Object.assign({},r,{spaceBetween:32,navigation:{prevEl:`.swiper-arrow.prev.${n}`,nextEl:`.swiper-arrow.next.${n}`},pagination:{el:`.swiper-pag.${n}`,type:"bullets",bulletActiveClass:"cc-active",bulletClass:"swiper-pag-item",clickable:!0}}),M=(r,n,i,l,f,o)=>{swipers[l]=swipers[l]||{},swipers[l][i]=swipers[l][i]||{};let a=swipers[l][i],c=a.swiperInstance,h=o==="desktop"&&window.matchMedia("(min-width: 992px)").matches,m=o==="mobile"&&window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches,v=o==="all",p=()=>{a.observer&&(a.observer.disconnect(),delete a.observer),c&&(c.destroy(!0,!0),delete swipers[l][i],console.log("Swiper destroyed for",n,"with uniqueKey",i))};!h&&o==="desktop"||!m&&o==="mobile"||!v&&o==="all"?p():(h||m||v)&&!c&&(()=>{a.observer&&a.observer.disconnect();let y=$(`${n}.${i}`)[0];console.log(y);let g=new IntersectionObserver(_=>{_.forEach(k=>{if(k.isIntersecting&&(h||m||v)&&!c){let B=new Swiper(`${n}.${i}`,f);swipers[l][i]={swiperInstance:B,mode:h?"desktop":m?"mobile":"all",initialized:!0},g.disconnect(),console.log("Swiper initialized for",n,"with uniqueKey",i)}})},{});swipers[l][i].observer=g,g.observe(y)})()},C=r=>{r.forEach(n=>{D(...n)})},E=(r,n)=>{C(r),window.addEventListener("resize",function(){window.innerWidth!==I&&(I=window.innerWidth,C(r))})};$(document).ready(()=>{let r=()=>$(window).width()<992;function n(e){return e.type==="mouseenter"&&!r()||e.type==="click"&&r()}let i=!1,l=$(".nav_dropdown-content-inner"),f=$(".nav_dropdown-small"),o=$(".nav_inner"),a=$(".nav_back"),c=$(".nav_brand"),h=$(".nav_ham");function m(e){l.hide().eq(e).css("display","flex"),r()&&(a.css("display","flex"),c.hide()),x(!0)}function v(e){p(),$(e).siblings(f).show(),r()&&(a.css("display","flex"),c.hide()),x(!0)}function p(){l.hide(),f.hide(),a.hide(),c.show(),x(!1)}function x(e){let s=$(".nav_bg");e?s.stop().fadeIn():s.stop().fadeOut()}function y(){i=!0,o.show(),h.addClass("cc-open")}function g(){i=!1,o.hide(),h.removeClass("cc-open"),p()}$(".nav_dropdowns-large .nav_dropdown-trigger").on("mouseenter click",function(e){let s=$(this).index();n(e)&&m(s)}),$(".nav").on("mouseleave",function(e){$(e.relatedTarget).closest(".nav").length||p()}),$(document).on("click",function(e){$(e.target).closest(".nav").length||p()}),$(".nav_dropdowns-small .nav_dropdown-trigger").on("mouseenter click",function(e){n(e)&&v($(this))}),h.on("click",function(){i?g():y()}),$(".nav_back").on("click",function(){p()}),$(".plyr_video").each(function(){let e={controls:["play","progress","current-time","mute","volume"],clickToPlay:!0};try{let s=$(this).parent().attr("data-video-src");s&&$(this).attr("src",s);let t=new Plyr($(this),e);players.push(t)}catch(s){console.error("Error initializing Plyr:",s)}}),$('[data-plyr="component"]').on("click",function(){let e=$(this).find(".plyr_video")[0];_(e),$(this).find('[data-plyr="cover"]').hide()});function _(e){$('[data-plyr="cover"]').show(),players.forEach(function(s){s.media!==e&&s.pause()})}E([[".impact_slider",".swiper-slider-wrap","hear-testimonials",{breakpoints:{0:{slidesPerView:1,spaceBetween:12},480:{slidesPerView:2,spaceBetween:24},992:{slidesPerView:3}},on:{slideChange:_}},"all"],[".pills_wrap",".swiper-slider-wrap","pills-homepage",{slidesPerView:"auto",spaceBetween:24},"mobile"],[".solutions_slider",".swiper-slider-wrap","solutions-homepage",{breakpoints:{0:{slidesPerView:1,spaceBetween:12},480:{slidesPerView:2,spaceBetween:24},992:{slidesPerView:3}}},"all"],[".section.cc-testimonials",".swiper-slider-wrap","testimonials-homepage",{slidesPerView:1,centeredSlides:!0,loop:!0,spaceBetween:12,on:{init:e=>{let s=e.realIndex+1,t=e.slides.length;$(e.el).find("[data-counter]").text(`${s}/${t}`)},slideChange:e=>{let s=e.realIndex+1,t=e.slides.length;$(e.el).find("[data-counter]").text(`${s}/${t}`)}}},"all"],[".events_slider",".swiper-slider-wrap","featured-events",{slidesPerView:1,spaceBetween:24},"all"],[".connect_slider",".swiper-slider-wrap","events-gallery",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16},992:{slidesPerView:4,spaceBetween:16}}},"all"],[".founders_slider",".swiper-slider-wrap","founders-stats",{slidesPerView:"auto",spaceBetween:24},"all"],[".gallery_slider",".swiper-slider-wrap","gallery",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16}}},"all"],[".speaker_slider",".swiper-slider-wrap","speakers",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16}}},"all"],[".solutions-top_slider",".swiper-slider-wrap","services",{slidesPerView:1,spaceBetween:24},"all"],[".hear-videos_wrap",".swiper-slider-wrap","hear-videos",{slidesPerView:"auto",spaceBetween:24},"mobile"],[".info-session_slider",".swiper-slider-wrap","info-session",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},992:{slidesPerView:3,spaceBetween:24}}},"all"]]),window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsfilter",e=>{if(e&&e.length>0){let[t]=e;if(t&&t.resetButtonsData&&t.resetButtonsData.size>0){let d=[...t.resetButtonsData.keys()][0];if(t.filtersData&&t.filtersData[0]){let w=function(u){u>=1?d&&$(d).removeClass("fs-cmsfilter_active"):d&&$(d).addClass("fs-cmsfilter_active")};var s=w;w(0),t.listInstance.on("renderitems",function(){let u=t.filtersData[0].values.size;w(u)})}}}}]),$('[data-filters="founders"]').each(function(){let e="fs-cmsfilter_active",s=$(this).find(".filter-tag"),t=$('[data-items="founders"]').find(".schedule_list-item").toArray();s.on("click",function(){let d=$(this).text();s.removeClass(e),$(this).addClass(e),$(t).hide(),d!=="All"?t.forEach(function(w){$(w).find('[fs-cmsfilter-field="category"]').text()===d&&$(w).show()}):$(t).show()})});let B=$(".winners-modal"),P=$(".winners_item");$(".awards-all-winners_item, .swiper-slide.cc-speaker").on("click",function(){let e=$(this).index();P.hide(),P.eq(e).css("display","flex"),B.fadeIn()}),$(".winners_item-overlay, .winners-modal_close").on("click",function(){B.hide()}),$(".winners-modal_box-head_item").each(function(){$(this).find("a").text().trim()===""&&$(this).hide()}),$(document).ready(function(){$("[data-copy]").on("click",function(){let s=$(this).attr("data-copy");s==="url"?e($(this),$(location).attr("href")):e($(this),s)});function e(s,t){var d=$("<input>"),w=$(s).find(".w-embed:first-child"),u=$(s).find(".w-embed:last-child");let V;$("body").append(d),d.val(t).select(),document.execCommand("copy"),d.remove(),clearTimeout(V),u.hide(),w.hide(),u.css("display","flex"),V=setTimeout(()=>{u.hide(),w.css("display","flex")},2e3)}})});})();

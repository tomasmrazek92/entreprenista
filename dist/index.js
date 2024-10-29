"use strict";(()=>{var u=window.innerWidth,c={};var y=(a,l,r,e,i)=>{let s=$(a);s.length!==0&&(c[r]=0,c[r]=c[r]||0,s.each(function(){let t=`${r}_${c[r]}`;x(this,l,t,[".swiper-arrow",".swiper-pag",".swiper-drag-wrapper"]);let n=B(e,t);V(this,l,t,r,n,i),c[r]++}))},x=(a,l,r,e)=>{e.forEach(i=>{$(a).find(i).addClass(r)}),$(a).find(l).addClass(r)},B=(a,l)=>Object.assign({},a,{spaceBetween:32,navigation:{prevEl:`.swiper-arrow.prev.${l}`,nextEl:`.swiper-arrow.next.${l}`},pagination:{el:`.swiper-pag.${l}`,type:"bullets",bulletActiveClass:"cc-active",bulletClass:"swiper-pag-item",clickable:!0}}),V=(a,l,r,e,i,s)=>{swipers[e]=swipers[e]||{},swipers[e][r]=swipers[e][r]||{};let t=swipers[e][r],n=t.swiperInstance,o=s==="desktop"&&window.matchMedia("(min-width: 992px)").matches,d=s==="mobile"&&window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches,p=s==="all",w=()=>{t.observer&&(t.observer.disconnect(),delete t.observer),n&&(n.destroy(!0,!0),delete swipers[e][r],console.log("Swiper destroyed for",l,"with uniqueKey",r))};!o&&s==="desktop"||!d&&s==="mobile"||!p&&s==="all"?w():(o||d||p)&&!n&&(()=>{t.observer&&t.observer.disconnect();let h=$(`${l}.${r}`)[0];console.log(h);let f=new IntersectionObserver(b=>{b.forEach(v=>{if(v.isIntersecting&&(o||d||p)&&!n){let P=new Swiper(`${l}.${r}`,i);swipers[e][r]={swiperInstance:P,mode:o?"desktop":d?"mobile":"all",initialized:!0},f.disconnect(),console.log("Swiper initialized for",l,"with uniqueKey",r)}})},{});swipers[e][r].observer=f,f.observe(h)})()},m=a=>{a.forEach(l=>{y(...l)})},g=(a,l)=>{m(a),window.addEventListener("resize",function(){window.innerWidth!==u&&(u=window.innerWidth,m(a))})};$(document).ready(()=>{$(".plyr_video").each(function(){let e={controls:["play","progress","current-time","mute","volume"],clickToPlay:!0};try{let i=$(this).parent().attr("data-video-src");i&&$(this).attr("src",i);let s=new Plyr($(this),e);players.push(s)}catch(i){console.error("Error initializing Plyr:",i)}}),$('[data-plyr="component"]').on("click",function(){let e=$(this).find(".plyr_video")[0];a(e),$(this).find('[data-plyr="cover"]').hide()});function a(e){$('[data-plyr="cover"]').show(),players.forEach(function(i){i.media!==e&&i.pause()})}g([[".impact_slider",".swiper-slider-wrap","hear-testimonials",{breakpoints:{0:{slidesPerView:1,spaceBetween:12},480:{slidesPerView:2,spaceBetween:24},992:{slidesPerView:3}},on:{slideChange:a}},"all"],[".pills_wrap",".swiper-slider-wrap","pills-homepage",{slidesPerView:"auto",spaceBetween:24},"mobile"],[".solutions_slider",".swiper-slider-wrap","solutions-homepage",{breakpoints:{0:{slidesPerView:1,spaceBetween:12},480:{slidesPerView:2,spaceBetween:24},992:{slidesPerView:3}}},"all"],[".section.cc-testimonials",".swiper-slider-wrap","testimonials-homepage",{slidesPerView:1,centeredSlides:!0,loop:!0,spaceBetween:12,on:{init:e=>{let i=e.realIndex+1,s=e.slides.length;$(e.el).find("[data-counter]").text(`${i}/${s}`)},slideChange:e=>{let i=e.realIndex+1,s=e.slides.length;$(e.el).find("[data-counter]").text(`${i}/${s}`)}}},"all"],[".events_slider",".swiper-slider-wrap","featured-events",{slidesPerView:1,spaceBetween:24},"all"],[".connect_slider",".swiper-slider-wrap","events-gallery",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16},992:{slidesPerView:4,spaceBetween:16}}},"all"],[".founders_slider",".swiper-slider-wrap","founders-stats",{slidesPerView:"auto",spaceBetween:24},"all"],[".gallery_slider",".swiper-slider-wrap","gallery",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16}}},"all"],[".speaker_slider",".swiper-slider-wrap","speakers",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16}}},"all"],[".solutions-top_slider",".swiper-slider-wrap","services",{slidesPerView:1,spaceBetween:24},"all"],[".hear-videos_wrap",".swiper-slider-wrap","hear-videos",{slidesPerView:"auto",spaceBetween:24},"mobile"],[".info-session_slider",".swiper-slider-wrap","info-session",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},992:{slidesPerView:3,spaceBetween:24}}},"all"]]),window.fsAttributes.push(["cmsfilter",e=>{if(e&&e.length>0){let[s]=e;if(s&&s.resetButtonsData&&s.resetButtonsData.size>0){let t=[...s.resetButtonsData.keys()][0];if(s.filtersData&&s.filtersData[0]){let n=function(o){o>=1?t&&$(t).removeClass("fs-cmsfilter_active"):t&&$(t).addClass("fs-cmsfilter_active")};var i=n;n(0),s.listInstance.on("renderitems",function(){let o=s.filtersData[0].values.size;n(o)})}}}}]),$('[data-filters="founders"]').each(function(){let e="fs-cmsfilter_active",i=$(this).find(".filter-tag"),s=$('[data-items="founders"]').find(".schedule_list-item").toArray();i.on("click",function(){let t=$(this).text();i.removeClass(e),$(this).addClass(e),$(s).hide(),t!=="All"?s.forEach(function(n){$(n).find('[fs-cmsfilter-field="category"]').text()===t&&$(n).show()}):$(s).show()})}),window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsfilter",e=>{console.log("cmsfilter Successfully loaded!"),$(".solutions-filter_row-checkbox").each(function(){let s=$(this),t=s.attr("data-slug");s.siblings(".solutions-filter_nest").load(`/global-tags/${t} .solutions-filter_row-inner`,function(n,o){o==="success"&&(s.siblings(".solutions-filter_nest").each(function(){$(this).children().length||($(this).hide(),s.find(".solutions-filter-inner-icon").hide())}),r())})}),$(".solutions-index_grid").find(".index_card").each(function(){let s=$(this),t=s.attr("data-slug");s.find("[data-nested-wrap]").load(`/solutions/${t} [data-nested-filters]`,function(n){n==="success"&&r()})});let[i]=e;console.log(i.listInstance)}]);function r(){window.fsAttributes.cmsfilter.destroy(),window.fsAttributes.cmsfilter.init()}$(document).ready(function(){$("[data-copy]").on("click",function(){let i=$(this).attr("data-copy");i==="url"?e($(this),$(location).attr("href")):e($(this),i)});function e(i,s){var t=$("<input>"),n=$(i).find(".w-embed:first-child"),o=$(i).find(".w-embed:last-child");let d;$("body").append(t),t.val(s).select(),document.execCommand("copy"),t.remove(),clearTimeout(d),o.hide(),n.hide(),o.css("display","flex"),d=setTimeout(()=>{o.hide(),n.css("display","flex")},2e3)}})});})();

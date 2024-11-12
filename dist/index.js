"use strict";(()=>{var j=window.innerWidth,_={};var q=(n,r,s,a,p)=>{let d=$(n);d.length!==0&&(_[s]=0,_[s]=_[s]||0,d.each(function(){let l=`${s}_${_[s]}`;K(this,r,l,[".swiper-arrow",".swiper-pag",".swiper-drag-wrapper"]);let f=ee(a,l);te(this,r,l,s,f,p),_[s]++}))},K=(n,r,s,a)=>{a.forEach(p=>{$(n).find(p).addClass(s)}),$(n).find(r).addClass(s)},ee=(n,r)=>Object.assign({},n,{speed:1e3,navigation:{prevEl:`.swiper-arrow.prev.${r}`,nextEl:`.swiper-arrow.next.${r}`},pagination:{el:`.swiper-pag.${r}`,type:"bullets",bulletActiveClass:"cc-active",bulletClass:"swiper-pag-item",clickable:!0}}),te=(n,r,s,a,p,d)=>{swipers[a]=swipers[a]||{},swipers[a][s]=swipers[a][s]||{};let l=swipers[a][s],f=l.swiperInstance,h=d==="desktop"&&window.matchMedia("(min-width: 992px)").matches,u=d==="mobile"&&window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches,w=d==="all",b=()=>{l.observer&&(l.observer.disconnect(),delete l.observer),f&&(f.destroy(!0,!0),delete swipers[a][s],console.log("Swiper destroyed for",r,"with uniqueKey",s))};!h&&d==="desktop"||!u&&d==="mobile"||!w&&d==="all"?b():(h||u||w)&&!f&&(()=>{l.observer&&l.observer.disconnect();let m=$(`${r}.${s}`)[0],g=new IntersectionObserver(k=>{k.forEach(C=>{if(C.isIntersecting&&(h||u||w)&&!f){let y=new Swiper(`${r}.${s}`,p);swipers[a][s]={swiperInstance:y,mode:h?"desktop":u?"mobile":"all",initialized:!0},g.disconnect(),console.log("Swiper initialized for",r,"with uniqueKey",s)}})},{});swipers[a][s].observer=g,g.observe(m)})()},H=n=>{n.forEach(r=>{q(...r)})},U=(n,r)=>{H(n),window.addEventListener("resize",function(){window.innerWidth!==j&&(j=window.innerWidth,H(n))})};$(document).ready(()=>{let n=()=>$(window).width()<992;function r(e){return e.type==="mouseenter"&&!n()||e.type==="click"&&n()}let s=!1,a=$(".nav"),p=$(".nav_logo"),d=$(".nav_dropdown-content-inner"),l=$(".nav_dropdown-small"),f=$(".nav_inner"),h=$(".nav_back"),u=$(".nav_brand"),w=$(".nav_ham");function b(e){m(),d.eq(e).addClass("is-open"),n()&&(h.css("display","flex"),u.hide()),g(!0)}function I(e){a.addClass("nav-open"),m(),$(e).siblings(l).addClass("is-open"),n()&&(h.css("display","flex"),u.hide()),g(!0)}function m(){d.removeClass("is-open"),l.removeClass("is-open"),h.hide(),u.show(),g(!1)}function g(e){let t=$(".nav_bg");e?t.stop().fadeIn():t.stop().fadeOut()}function k(){s=!0,f.css("display","flex"),w.addClass("cc-open")}function C(){s=!1,f.hide(),w.removeClass("cc-open"),m()}var y=$(document.body),B=0;let F;function N(){a.addClass("nav-open");var e=y.innerWidth();B=window.pageYOffset,y.css({overflow:"hidden",position:"fixed",top:`-${B}px`,width:e})}function A(){y.css({overflow:"",position:"",top:"",width:""}),$(window).scrollTop(B),clearTimeout(F),a.removeClass("nav-open")}function X(e){e?N():A()}let Y=[991,767,479],P=window.innerWidth;function G(){s&&A()}function J(){let e=window.innerWidth;Y.forEach(t=>{(P<=t&&e>t||P>=t&&e<t)&&G(t)}),P=e}window.addEventListener("resize",J),$(".nav_dropdowns-large .nav_dropdown-trigger").on("mouseenter click",function(e){let t=$(this).index();r(e)&&(a.addClass("nav-open"),b(t))}),$(".nav_dropdowns-small .nav_dropdown-trigger").on("mouseenter click",function(e){r(e)&&I($(this))}),$(".tel_nav-menu").on("mouseenter click",function(e){r(e)&&($(".tel_nav-dropdown").show(),w.filter(".sub").addClass("cc-open"))}),$(".tel_nav-menu").on("mouseleave",function(e){$(".tel_nav-dropdown").hide(),w.filter(".sub").removeClass("cc-open")}),$(".nav").on("mouseleave",function(e){!$(e.relatedTarget).closest(".nav").length&&!n()&&(a.removeClass("nav-open"),m())}),$(document).on("click",function(e){$(e.target).closest(".nav").length||m(),$(e.target).closest(".tel_nav-menu").length||($(".tel_nav-dropdown").hide(),w.filter(".sub").removeClass("cc-open"))}),w.on("click",function(){s?C():k(),X(s)}),$(".nav_back").on("click",function(){m()});function x(e){let t=!n,i=t?"43rem":"18.5rem",o=t?"7.2rem":"2.4rem";e==="set"?p.addClass("large"):e==="large"?(p.removeClass("no-transition"),p.addClass("large")):(p.removeClass("no-transition"),p.removeClass("large"))}function O(){return $(window).scrollTop()<20}let ie=gsap.timeline({scrollTrigger:{trigger:$("body"),start:"20px top",onEnter:()=>{x()},onLeaveBack:()=>{x("large")}}}),D;$(window).on("resize",function(){O()&&(clearTimeout(D),D=setTimeout(()=>{x("set")},50)),n()||f.attr("style","")}),O()&&x("set"),$(".plyr_video").each(function(){let e={controls:["play","progress","mute"],clickToPlay:!0};try{let t=$(this).parent().attr("data-video-src");t&&$(this).attr("src",t);let i=new Plyr($(this),e);players.push(i)}catch(t){console.error("Error initializing Plyr:",t)}}),$('[data-plyr="component"]').on("click",function(){let e=$(this).find(".plyr_video")[0];T(e),$(this).find('[data-plyr="cover"]').hide()}),$('[data-plyr="pause"]').on("click",function(){T()});function T(e){$('[data-plyr="cover"]').show(),players.forEach(function(t){t.media!==e&&t.pause()})}U([[".impact_slider",".swiper-slider-wrap","hear-testimonials",{breakpoints:{0:{slidesPerView:1,spaceBetween:12},480:{slidesPerView:2,spaceBetween:24},992:{slidesPerView:3,spaceBetween:32}},on:{slideChange:T}},"all"],[".pills_wrap",".swiper-slider-wrap","pills-homepage",{slidesPerView:"auto",spaceBetween:24},"mobile"],[".solutions_slider",".swiper-slider-wrap","solutions-homepage",{breakpoints:{0:{slidesPerView:1,spaceBetween:12},480:{slidesPerView:2,spaceBetween:24},992:{slidesPerView:3,spaceBetween:32}}},"all"],[".section.cc-testimonials",".swiper-slider-wrap","testimonials-homepage",{slidesPerView:1,centeredSlides:!0,loop:!0,effect:"fade",fadeEffect:{crossFade:!0},spaceBetween:12,on:{init:e=>{let t=e.realIndex+1,i=e.slides.length;$(e.el).find("[data-counter]").text(`${t}/${i}`)},slideChange:e=>{let t=e.realIndex+1,i=e.slides.length;$(e.el).find("[data-counter]").text(`${t}/${i}`)}}},"all"],[".events_slider",".swiper-slider-wrap","featured-events",{slidesPerView:1,spaceBetween:240},"all"],[".connect_slider",".swiper-slider-wrap","events-gallery",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16},992:{slidesPerView:4,spaceBetween:16}}},"all"],[".founders_slider",".swiper-slider-wrap","founders-stats",{slidesPerView:"auto",spaceBetween:24},"all"],[".gallery_slider",".swiper-slider-wrap","gallery",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16}}},"all"],[".speaker_slider",".swiper-slider-wrap","speakers",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},768:{slidesPerView:3,spaceBetween:16}}},"all"],[".solutions-top_slider",".swiper-slider-wrap","services",{slidesPerView:1,spaceBetween:24},"all"],[".hear-videos_wrap",".swiper-slider-wrap","hear-videos",{slidesPerView:"auto",spaceBetween:24},"mobile"],[".info-session_slider",".swiper-slider-wrap","info-session",{breakpoints:{0:{slidesPerView:1.1,spaceBetween:16},489:{slidesPerView:2,spaceBetween:16},992:{slidesPerView:3,spaceBetween:24}}},"all"]]),window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsfilter",e=>{if(e&&e.length>0){let[i]=e;if(i&&i.resetButtonsData&&i.resetButtonsData.size>0){let o=[...i.resetButtonsData.keys()][0];if(i.filtersData&&i.filtersData[0]){let c=function(v){v>=1?o&&$(o).removeClass("fs-cmsfilter_active"):o&&$(o).addClass("fs-cmsfilter_active")};var t=c;c(0),i.listInstance.on("renderitems",function(){M();let v=i.filtersData[0].values.size;c(v)})}}}}]),window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsload",e=>{if(e&&e.length>0){let[t]=e;t.on("renderitems",i=>{M()})}}]),window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmscombine",e=>{e.forEach(t=>{document.querySelector('[fs-cmssort-element="trigger"]').click()})}]),$('[data-filters="founders"]').each(function(){let e="fs-cmsfilter_active",t=$(this).find(".filter-tag"),i=$('[data-items="founders"]').find(".schedule_list-item").toArray();t.on("click",function(){let o=$(this).text();t.removeClass(e),$(this).addClass(e),$(i).hide(),o!=="All"?i.forEach(function(c){$(c).find('[fs-cmsfilter-field="category"]').text()===o&&$(c).show()}):$(i).show()})}),$("[data-hide-empty]").each(function(){let e=$(this);e.find(".w-dyn-item").length<=0&&e.hide()});let W=$(".winners-modal"),z=$(".winners_item");$(".awards-all-winners_item, .swiper-slide.cc-speaker").on("click",function(){let e=$(this).index();z.hide(),z.eq(e).css("display","flex"),W.fadeIn()}),$(".winners_item-overlay, .winners-modal_close").on("click",function(){W.hide()}),$(".winners-modal_box-head_item").each(function(){$(this).find("a").text().trim()===""&&$(this).hide()});function M(){$("[data-highlight]").each(function(){let e=$(this).attr("data-highlight");if(!e)return;let t=new RegExp(`(${e})`,"gi");$(this).html(function(i,o){return o.replace(t,'<span class="highlighted">$1</span>')})})}function L(){$("[data-link-tag]").each(function(){let e=$(this).attr("href"),t=encodeURIComponent($(this).text()).replace(/%20/g,"+");$(this).attr("href",`${e}?category=${t}`)})}$("[data-link-category]").each(function(){let e=$(this).attr("data-link-category");if(!e){L();return}let t;e==="Entreprenista"?t="podcast-entreprenista":e==="Startups in Stilettos"&&(t="podcast-startups-in-stilettos"),$(this).attr("href",`/${t}`),$("[data-link-tag]").attr("href",`/${t}`),L()});function Q(){let e=$(".article-d_avatar");if(!e.length)return;let t=[];e.each(function(){t.push($(this).attr("data-name"))});let i=t.length>1?t.join(" & "):t[0]||"";$("[data-hosts-name]").text(i)}Q(),$("[data-copy]").on("click",function(){let e=$(this).attr("data-copy");e==="url"?S($(this),$(location).attr("href")):S($(this),e)});function S(e,t){var i=$("<input>"),o=$(e).find(".w-embed:first-child"),c=$(e).find(".w-embed:last-child");let v;$("body").append(i),i.val(t).select(),document.execCommand("copy"),i.remove(),clearTimeout(v),c.hide(),o.hide(),c.css("display","flex"),v=setTimeout(()=>{c.hide(),o.css("display","flex")},2e3)}$(".hp-hero_featured-wrap").each(function(){let e=$(this).find(".hp-hero_mask"),t=$(this).find(".hp-hero_visual-label").find("p"),i=$(this).find(".hp-hero_content").find("p"),o=gsap.timeline({defaults:{ease:"power2.inOut",duration:1.5}});o.to(e,{scaleX:0}),o.fromTo(t,{x:"-3rem",opacity:0},{x:"0rem",opacity:1},"<"),o.fromTo(i,{y:"2rem",opacity:0},{y:"0rem",opacity:1,stagger:.2},"<0.2"),o.fromTo($(".hp-hero_featured-list .hp-hero_featured-item"),{opacity:0,yPercent:50},{opacity:1,yPercent:0,stagger:.1,duration:1,ease:"power2.inOut"},"<")}),gsap.timeline({scrollTrigger:{trigger:".info-session_circle",start:"bottom 95%",endTrigger:".section.cc-testimonials",end:"top bottom",invalidateOnRefresh:!0,scrub:1}}).to(".info-session_circle-bg",{width:()=>window.innerWidth*2/10+"rem"});let V={},E=[];function R(){let e=document.querySelectorAll("[data-title-lines]");V=new SplitType(e,{types:"lines"}),e.forEach(t=>{t.querySelectorAll(".line").forEach((o,c)=>{E.push(gsap.to(o,{x:()=>c%2===0?"1em":"-1em",ease:"power2.out",scrollTrigger:{trigger:t,start:"top bottom",end:"bottom top",scrub:1}}).scrollTrigger)})})}function Z(){E.forEach(e=>e.kill()),E=[],V.revert&&V.revert()}R(),window.addEventListener("resize",()=>{Z(),R()})});})();

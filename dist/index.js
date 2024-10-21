"use strict";(()=>{var P=window.innerWidth,y={};var A=(s,r,i,l,b)=>{let f=$(s);f.length!==0&&(y[i]=0,y[i]=y[i]||0,f.each(function(){let g=`${i}_${y[i]}`;S(this,r,g,[".swiper-arrow",".swiper-pagination",".swiper-drag-wrapper"]);let a=_(l,g);z(this,r,g,i,a,b),y[i]++}))},S=(s,r,i,l)=>{l.forEach(b=>{$(s).find(b).addClass(i)}),$(s).find(r).addClass(i)},_=(s,r)=>Object.assign({},s,{spaceBetween:32,navigation:{prevEl:`.swiper-arrow.prev.${r}`,nextEl:`.swiper-arrow.next.${r}`}}),z=(s,r,i,l,b,f)=>{swipers[l]=swipers[l]||{},swipers[l][i]=swipers[l][i]||{};let g=swipers[l][i],a=g.swiperInstance,t=f==="desktop"&&window.matchMedia("(min-width: 992px)").matches,e=f==="mobile"&&window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches,n=f==="all",d=()=>{g.observer&&(g.observer.disconnect(),delete g.observer),a&&(a.destroy(!0,!0),delete swipers[l][i],console.log("Swiper destroyed for",r,"with uniqueKey",i))};!t&&f==="desktop"||!e&&f==="mobile"||!n&&f==="all"?d():(t||e||n)&&!a&&(()=>{g.observer&&g.observer.disconnect();let w=$(`${r}.${i}`)[0],h=new IntersectionObserver(u=>{u.forEach(v=>{if(v.isIntersecting&&(t||e||n)&&!a){let x=new Swiper(`${r}.${i}`,b);swipers[l][i]={swiperInstance:x,mode:t?"desktop":e?"mobile":"all",initialized:!0},h.disconnect(),console.log("Swiper initialized for",r,"with uniqueKey",i)}})},{});swipers[l][i].observer=h,h.observe(w)})()},T=s=>{s.forEach(r=>{A(...r)})},C=(s,r)=>{T(s),window.addEventListener("resize",function(){window.innerWidth!==P&&(P=window.innerWidth,T(s))})};gsap.defaults({ease:Power1.easeOut,duration:.8});$(document).ready(()=>{function s(a,t){let e;return function(...n){let d=()=>{clearTimeout(e),a.apply(this,n)};clearTimeout(e),e=setTimeout(d,t)}}let r=sessionStorage.getItem("navbarState");r&&$(".nav").removeClass("large");let i=gsap.timeline({scrollTrigger:{trigger:$(".nav_wrapper"),start:()=>"10px top",end:"bottom top",onLeave:s(()=>{r||(r=sessionStorage.setItem("navbarState","true"),$(".nav").removeClass("large"))},200)}}),l=[[".swiper-box.cc-youtube",".swiper-box_inner","videos",{slidesPerView:"auto"},"all"],[".swiper-box.cc-articles",".swiper-box_inner","articles",{slidesPerView:1},"all"],[".swiper-box.cc-podcast",".swiper-box_inner","podcast",{slidesPerView:"auto"},"all"],[".swiper-box.cc-testimonials",".swiper-box_inner","testimonials",{slidesPerView:"1",effect:"fade",fadeEffect:{crossFade:!0},autoHeight:!0},"all"]];$(document).ready(function(){C(l)});function b(a){let e=new DOMParser().parseFromString(a.next.html,"text/html"),n=$(e).find("html").attr("data-wf-page");$("html").attr("data-wf-page",n),window.Webflow&&window.Webflow.destroy(),window.Webflow&&window.Webflow.ready(),window.Webflow&&window.Webflow.require("ix2").init()}function f(){window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsload",a=>{console.log("cmsload Successfully loaded!");let[t]=a;t.on("renderitems",e=>{console.log(e)})}])}function g(){let a=$(window).width()>991;$('[data-animation="section"]').each(function(){let t=$(this),e=$(this).find('[data-animation="heading"]'),n=$(this).find('[data-animation="item"]'),d=$(this).find('[data-animation="item-start"]'),m=$(this).find('[data-animation="stagger"]'),w=$(this).find('[data-animation="img-scale"]'),h=$(this).find('[data-animation="vertical-reveal"]'),u=$(this).find('[data-animation="horizontal-reveal"]'),v=$(this).find('[data-animation="signature"]'),x=$(this).find('[data-animation="fade"]'),O=$(this).eq(0).index(),k=t.attr("data-stagger")||.2,E=t.attr("data-start")||a?"top 80%":"top 70%",c=gsap.timeline({scrollTrigger:{trigger:O===0?"body":t,start:O===0?"-10 top":E}});if(e.length){let o=e.attr("data-split-type")||"line",p=new SplitType(e,{types:"lines, words, chars",tagName:"span"});c.from(e.find(`.${o}`),{y:"2rem",opacity:0,duration:1,ease:"power3.out",stagger:.1},"<")}if(d.length&&c.from(d,{y:"2rem",opacity:0,stagger:k},"<"),w.length&&c.from(w,{scale:1.2},"<"),h.length&&h.each(function(){let o=gsap.timeline(),p=$(this).find(".vertical-mask"),I=$(this).find("img");gsap.set(p,{y:0,yPercent:0}),o.to(p.eq(0),{yPercent:-100,duration:1.5,ease:"power3.inOut"},"<"),o.to(p.eq(1),{yPercent:100,duration:1.5,ease:"power3.inOut"},"<"),o.from(I,{scale:1.2},"<"),c.add(o,"<")}),u.length&&u.each(function(){let o=gsap.timeline(),p=$(this).find(".horizontal-mask"),I=p.attr("data-direction"),F=I==="left"?100:I==="right"?-100:0,W=$(this).find("img");gsap.set(p,{x:0,xPercent:0}),o.to(p,{xPercent:-100,duration:1.7,ease:"power3.inOut",force3D:!0},"<"),o.from(W,{scale:1.2,duration:2},"<"),c.add(o,"<")}),n.length){let o=c.getChildren();c.from(n,{y:"2rem",opacity:0,stagger:k},(o.length>0,"<"))}if(m.length&&m.each(function(){let o=$(this).find('[data-animation="stagger-item"]'),p=$(this).attr("data-stagger")||.1;c.from(o,{y:"1rem",opacity:0,stagger:p},"<")}),x.length&&x.each(function(){c.from($(this),{opacity:0},"<")}),v.length){let o=v.attr("data-direction"),p=o==="left"?-15:o==="right"?15:0;c.from(v,{opacity:0,rotate:p,duration:.4},"<0.2")}}),$(".rotate-text_circle").each(function(t,e){let n=t%2===0?30:-30;gsap.to(e,{scrollTrigger:{trigger:e,start:"top bottom",end:"bottom top",scrub:1},rotation:n,ease:"none"})})}g(),$('[data-yt-video="trigger"]').on("click",function(){let a=$(this),t=a.find('[data-yt-video="overlay"]');console.log(t);let e=a.find(".w-embed-youtubevideo").find("iframe"),n=e.attr("src"),d="revelead";function m(h){let u=new URL(h);return u.searchParams.set("autoplay","1"),u.toString()}let w=m(n);a.hasClass(d)||(a.addClass(d),t.hide(),e.attr("src",w))}),$(document).ready(function(){$("[data-copy]").on("click",function(){let t=$(this).attr("data-copy");t==="url"?a($(this),$(location).attr("href")):a($(this),t)});function a(t,e){var n=$("<input>"),d=$(t).find(".w-embed:first-child"),m=$(t).find(".w-embed:last-child");let w;$("body").append(n),n.val(e).select(),document.execCommand("copy"),n.remove(),clearTimeout(w),m.hide(),d.hide(),m.css("display","flex"),w=setTimeout(()=>{m.hide(),d.css("display","flex")},2e3)}})});})();

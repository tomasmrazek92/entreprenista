"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/globalFunctions.js
  var windowWidth = window.innerWidth;
  var uniqueIdCounters = {};
  var createResponsiveSwiper = (componentSelector, swiperSelector, classSelector, options, mode) => {
    let elements = $(componentSelector);
    if (elements.length === 0)
      return;
    uniqueIdCounters[classSelector] = 0;
    uniqueIdCounters[classSelector] = uniqueIdCounters[classSelector] || 0;
    elements.each(function() {
      let uniqueKey = `${classSelector}_${uniqueIdCounters[classSelector]}`;
      addUniqueClassesToElements(this, swiperSelector, uniqueKey, [
        ".swiper-arrow",
        ".swiper-pag",
        ".swiper-drag-wrapper"
      ]);
      let swiperOptions = getMergedSwiperOptions(options, uniqueKey);
      manageSwiperInstance(this, swiperSelector, uniqueKey, classSelector, swiperOptions, mode);
      uniqueIdCounters[classSelector]++;
    });
  };
  var addUniqueClassesToElements = (context, swiperSelector, uniqueKey, controlSelectors) => {
    controlSelectors.forEach((selector) => {
      $(context).find(selector).addClass(uniqueKey);
    });
    $(context).find(swiperSelector).addClass(uniqueKey);
  };
  var getMergedSwiperOptions = (options, uniqueKey) => {
    return Object.assign({}, options, {
      speed: 1e3,
      navigation: {
        prevEl: `.swiper-arrow.prev.${uniqueKey}`,
        nextEl: `.swiper-arrow.next.${uniqueKey}`
      },
      pagination: {
        el: `.swiper-pag.${uniqueKey}`,
        type: "bullets",
        bulletActiveClass: "cc-active",
        bulletClass: "swiper-pag-item",
        clickable: true
      }
    });
  };
  var manageSwiperInstance = (context, swiperSelector, uniqueKey, classSelector, swiperOptions, mode) => {
    swipers[classSelector] = swipers[classSelector] || {};
    swipers[classSelector][uniqueKey] = swipers[classSelector][uniqueKey] || {};
    let existingInstance = swipers[classSelector][uniqueKey];
    let existingSwiper = existingInstance.swiperInstance;
    let shouldInitDesktop = mode === "desktop" && window.matchMedia("(min-width: 992px)").matches;
    let shouldInitMobile = mode === "mobile" && window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches;
    let shouldInitAll = mode === "all";
    const destroySwiper = () => {
      if (existingInstance.observer) {
        existingInstance.observer.disconnect();
        delete existingInstance.observer;
      }
      if (existingSwiper) {
        existingSwiper.destroy(true, true);
        delete swipers[classSelector][uniqueKey];
        console.log("Swiper destroyed for", swiperSelector, "with uniqueKey", uniqueKey);
      }
    };
    const reInitObserver = () => {
      if (existingInstance.observer) {
        existingInstance.observer.disconnect();
      }
      const swiperElement = $(`${swiperSelector}.${uniqueKey}`)[0];
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (shouldInitDesktop || shouldInitMobile || shouldInitAll)) {
            if (!existingSwiper) {
              let swiper = new Swiper(`${swiperSelector}.${uniqueKey}`, swiperOptions);
              swipers[classSelector][uniqueKey] = {
                swiperInstance: swiper,
                mode: shouldInitDesktop ? "desktop" : shouldInitMobile ? "mobile" : "all",
                initialized: true
              };
              observer.disconnect();
              console.log("Swiper initialized for", swiperSelector, "with uniqueKey", uniqueKey);
            }
          }
        });
      }, {});
      swipers[classSelector][uniqueKey].observer = observer;
      observer.observe(swiperElement);
    };
    if (!shouldInitDesktop && mode === "desktop")
      destroySwiper();
    else if (!shouldInitMobile && mode === "mobile")
      destroySwiper();
    else if (!shouldInitAll && mode === "all")
      destroySwiper();
    else if ((shouldInitDesktop || shouldInitMobile || shouldInitAll) && !existingSwiper) {
      reInitObserver();
    }
  };
  var runSwipers = (swiperInstances) => {
    swiperInstances.forEach((instance) => {
      createResponsiveSwiper(...instance);
    });
  };
  var initSwipers = (swiperInstances, swipersState) => {
    runSwipers(swiperInstances);
    window.addEventListener("resize", function() {
      if (window.innerWidth !== windowWidth) {
        windowWidth = window.innerWidth;
        runSwipers(swiperInstances);
      }
    });
  };

  // src/index.js
  $(document).ready(() => {
    const isMobile = () => {
      return $(window).width() < 992;
    };
    function isTriggerEvent(e) {
      return e.type === "mouseenter" && !isMobile() || e.type === "click" && isMobile();
    }
    let hamOpen = false;
    let nav = $(".nav");
    let navLogo = $(".nav_logo");
    let dropdownCards = $(".nav_dropdown-content-inner");
    let smallDropdowns = $(".nav_dropdown-small");
    let navMenu = $(".nav_inner");
    let backBtn = $(".nav_back");
    let navBrand = $(".nav_brand");
    let navHam = $(".nav_ham");
    function showBigDropdown(index) {
      hideDropdownCards();
      dropdownCards.eq(index).addClass("is-open");
      if (isMobile()) {
        backBtn.css("display", "flex");
        navBrand.hide();
      }
      navOverlay(true);
    }
    function showSmallDropdown(el) {
      nav.addClass("nav-open");
      hideDropdownCards();
      $(el).siblings(smallDropdowns).addClass("is-open");
      if (isMobile()) {
        backBtn.css("display", "flex");
        navBrand.hide();
      }
      navOverlay(true);
    }
    function hideDropdownCards() {
      dropdownCards.removeClass("is-open");
      smallDropdowns.removeClass("is-open");
      backBtn.hide();
      navBrand.show();
      navOverlay(false);
    }
    function navOverlay(state) {
      let overlay = $(".nav_bg");
      if (state) {
        overlay.stop().fadeIn();
      } else {
        overlay.stop().fadeOut();
      }
    }
    function showMenu() {
      hamOpen = true;
      navMenu.css("display", "flex");
      navHam.addClass("cc-open");
    }
    function hideMenu() {
      hamOpen = false;
      navMenu.hide();
      navHam.removeClass("cc-open");
      hideDropdownCards();
    }
    var $body = $(document.body);
    var scrollPosition = 0;
    let logoTimeout;
    function disableScroll() {
      nav.addClass("nav-open");
      var oldWidth = $body.innerWidth();
      scrollPosition = window.pageYOffset;
      $body.css({
        overflow: "hidden",
        position: "fixed",
        top: `-${scrollPosition}px`,
        width: oldWidth
      });
    }
    function enableScroll() {
      $body.css({
        overflow: "",
        position: "",
        top: "",
        width: ""
      });
      $(window).scrollTop(scrollPosition);
      clearTimeout(logoTimeout);
      nav.removeClass("nav-open");
    }
    function toggleScroll(state) {
      if (state) {
        disableScroll();
      } else {
        enableScroll();
      }
    }
    const breakpoints = [991, 767, 479];
    let lastWidth = window.innerWidth;
    function handleBreakpoint() {
      if (hamOpen) {
        enableScroll();
      }
    }
    function checkBreakpoints() {
      const currentWidth = window.innerWidth;
      breakpoints.forEach((breakpoint) => {
        if (lastWidth <= breakpoint && currentWidth > breakpoint || lastWidth >= breakpoint && currentWidth < breakpoint) {
          handleBreakpoint(breakpoint);
        }
      });
      lastWidth = currentWidth;
    }
    window.addEventListener("resize", checkBreakpoints);
    $(".nav_dropdowns-large .nav_dropdown-trigger").on("mouseenter click", function(e) {
      let index = $(this).index();
      if (isTriggerEvent(e)) {
        nav.addClass("nav-open");
        showBigDropdown(index);
      }
    });
    $(".nav_dropdowns-small .nav_dropdown-trigger").on("mouseenter click", function(e) {
      if (isTriggerEvent(e)) {
        showSmallDropdown($(this));
      }
    });
    $(".tel_nav-menu").on("mouseenter click", function(e) {
      if (isTriggerEvent(e)) {
        $(".tel_nav-dropdown").show();
        navHam.filter(".sub").addClass("cc-open");
      }
    });
    $(".tel_nav-menu").on("mouseleave", function(e) {
      $(".tel_nav-dropdown").hide();
      navHam.filter(".sub").removeClass("cc-open");
    });
    $(".nav").on("mouseleave", function(event) {
      if (!$(event.relatedTarget).closest(".nav").length && !isMobile()) {
        nav.removeClass("nav-open");
        hideDropdownCards();
      }
    });
    $(document).on("click", function(event) {
      if (!$(event.target).closest(".nav").length) {
        hideDropdownCards();
      }
      if (!$(event.target).closest(".tel_nav-menu").length) {
        $(".tel_nav-dropdown").hide();
        navHam.filter(".sub").removeClass("cc-open");
      }
    });
    navHam.on("click", function() {
      if (!hamOpen) {
        showMenu();
      } else {
        hideMenu();
      }
      toggleScroll(hamOpen);
    });
    $(".nav_back").on("click", function() {
      hideDropdownCards();
    });
    function navAnimation(type) {
      let isDesktop = !isMobile;
      let width = isDesktop ? "43rem" : "18.5rem";
      let distance = isDesktop ? "7.2rem" : "2.4rem";
      if (type === "set") {
        navLogo.addClass("large");
      } else if (type === "large") {
        navLogo.removeClass("no-transition");
        navLogo.addClass("large");
      } else {
        navLogo.removeClass("no-transition");
        navLogo.removeClass("large");
      }
    }
    function isTop() {
      return $(window).scrollTop() < 20;
    }
    let scrollTriggerPoint = 20;
    let isNavSmall = false;
    function checkScroll() {
      let scrollTop = $(window).scrollTop();
      if (scrollTop >= scrollTriggerPoint && !isNavSmall) {
        navAnimation();
        isNavSmall = true;
      } else if (scrollTop < scrollTriggerPoint && isNavSmall) {
        navAnimation("large");
        isNavSmall = false;
      }
    }
    $(window).on("scroll", function() {
      checkScroll();
    });
    let resizeTimeout;
    $(window).on("resize", function() {
      if (isTop()) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          navAnimation("set");
        }, 50);
      }
      if (!isMobile()) {
        navMenu.attr("style", "");
      }
    });
    if (isTop()) {
      navAnimation("set");
    }
    function pauseAllPlayers(currentPlayer) {
      $('[data-plyr="cover"]').show();
      players.forEach(function(player) {
        if (player.media !== currentPlayer) {
          player.pause();
        }
      });
    }
    function initVideos() {
      $(".plyr_video").each(function() {
        let playerOptions = {
          controls: ["play", "progress", "mute"],
          clickToPlay: true
        };
        try {
          const videoSrc = $(this).parent().attr("data-video-src");
          if (videoSrc) {
            $(this).attr("src", videoSrc);
          }
          const player = new Plyr($(this), playerOptions);
          players.push(player);
        } catch (e) {
          console.error("Error initializing Plyr:", e);
        }
      });
      $('[data-plyr="component"]').on("click", function() {
        const currentPlayer = $(this).find(".plyr_video")[0];
        pauseAllPlayers(currentPlayer);
        $(this).find('[data-plyr="cover"]').hide();
      });
      $('[data-plyr="pause"]').on("click", function() {
        pauseAllPlayers();
      });
    }
    initVideos();
    const swiperInstances = [
      [
        ".impact_slider",
        ".swiper-slider-wrap",
        "hear-testimonials",
        {
          breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 12
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 24
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 32
            }
          },
          on: {
            slideChange: pauseAllPlayers
          }
        },
        "all"
      ],
      [
        ".pills_wrap",
        ".swiper-slider-wrap",
        "pills-homepage",
        {
          slidesPerView: "auto",
          spaceBetween: 24
        },
        "mobile"
      ],
      [
        ".solutions_slider",
        ".swiper-slider-wrap",
        "solutions-homepage",
        {
          breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 12
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 24
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 32
            }
          }
        },
        "all"
      ],
      [
        ".section.cc-testimonials",
        ".swiper-slider-wrap",
        "testimonials-homepage",
        {
          slidesPerView: 1,
          centeredSlides: true,
          loop: true,
          effect: "fade",
          fadeEffect: {
            crossFade: true
          },
          spaceBetween: 12,
          on: {
            init: (swiper) => {
              let index = swiper.realIndex + 1;
              let slides = swiper.slides.length;
              $(swiper.el).find("[data-counter]").text(`${index}/${slides}`);
            },
            slideChange: (swiper) => {
              let index = swiper.realIndex + 1;
              let slides = swiper.slides.length;
              $(swiper.el).find("[data-counter]").text(`${index}/${slides}`);
            }
          }
        },
        "all"
      ],
      [
        ".events_slider",
        ".swiper-slider-wrap",
        "featured-events",
        {
          slidesPerView: 1,
          spaceBetween: 240
        },
        "all"
      ],
      [
        ".connect_slider",
        ".swiper-slider-wrap",
        "events-gallery",
        {
          breakpoints: {
            0: {
              slidesPerView: 1.1,
              spaceBetween: 16
            },
            489: {
              slidesPerView: 2,
              spaceBetween: 16
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 16
            }
          }
        },
        "all"
      ],
      [
        ".founders_slider",
        ".swiper-slider-wrap",
        "founders-stats",
        {
          slidesPerView: "auto",
          spaceBetween: 24
        },
        "all"
      ],
      [
        ".gallery_slider",
        ".swiper-slider-wrap",
        "gallery",
        {
          breakpoints: {
            0: {
              slidesPerView: 1.1,
              spaceBetween: 16
            },
            489: {
              slidesPerView: 2,
              spaceBetween: 16
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16
            }
          }
        },
        "all"
      ],
      [
        ".speaker_slider",
        ".swiper-slider-wrap",
        "speakers",
        {
          breakpoints: {
            0: {
              slidesPerView: 1.1,
              spaceBetween: 16
            },
            489: {
              slidesPerView: 2,
              spaceBetween: 16
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16
            }
          }
        },
        "all"
      ],
      [
        ".solutions-top_slider",
        ".swiper-slider-wrap",
        "services",
        {
          slidesPerView: 1,
          spaceBetween: 24
        },
        "all"
      ],
      [
        ".hear-videos_wrap",
        ".swiper-slider-wrap",
        "hear-videos",
        {
          slidesPerView: "auto",
          spaceBetween: 24
        },
        "mobile"
      ],
      [
        ".info-session_slider",
        ".swiper-slider-wrap",
        "info-session",
        {
          breakpoints: {
            0: {
              slidesPerView: 1.1,
              spaceBetween: 16
            },
            489: {
              slidesPerView: 2,
              spaceBetween: 16
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          }
        },
        "all"
      ]
    ];
    initSwipers(swiperInstances);
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      "cmsfilter",
      (filterInstances) => {
        if (filterInstances && filterInstances.length > 0) {
          const [filterInstance] = filterInstances;
          if (filterInstance && filterInstance.resetButtonsData && filterInstance.resetButtonsData.size > 0) {
            const resetBtn = [...filterInstance.resetButtonsData.keys()][0];
            if (filterInstance.filtersData && filterInstance.filtersData[0]) {
              let updateResetBtn2 = function(entries) {
                if (entries >= 1) {
                  if (resetBtn) {
                    $(resetBtn).removeClass("fs-cmsfilter_active");
                  }
                } else {
                  if (resetBtn) {
                    $(resetBtn).addClass("fs-cmsfilter_active");
                  }
                }
              };
              var updateResetBtn = updateResetBtn2;
              updateResetBtn2(0);
              filterInstance.listInstance.on("renderitems", function() {
                highlightWords();
                let entries = filterInstance.filtersData[0].values.size;
                updateResetBtn2(entries);
              });
            }
          }
        }
      }
    ]);
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      "cmsload",
      (listInstances) => {
        if (listInstances && listInstances.length > 0) {
          const [listInstance] = listInstances;
          listInstance.on("renderitems", (renderedItems) => {
            updateExternalLinks();
            highlightWords();
            if ($(".plyr_video").length) {
              initVideos();
            }
          });
        }
      }
    ]);
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      "cmscombine",
      (listInstances) => {
        listInstances.forEach((element) => {
          document.querySelector('[fs-cmssort-element="trigger"]').click();
        });
      }
    ]);
    $('[data-filters="founders"]').each(function() {
      let activeClass = "fs-cmsfilter_active";
      const filters = $(this).find(".filter-tag");
      const items = $('[data-items="founders"]').find(".schedule_list-item").toArray();
      filters.on("click", function() {
        let filterText = $(this).text();
        filters.removeClass(activeClass);
        $(this).addClass(activeClass);
        $(items).hide();
        if (filterText !== "All") {
          items.forEach(function(item) {
            let text = $(item).find('[fs-cmsfilter-field="category"]').text();
            if (text === filterText) {
              $(item).show();
            }
          });
        } else {
          $(items).show();
        }
      });
    });
    $("[data-hide-empty]").each(function() {
      let self = $(this);
      if (self.find(".w-dyn-item").length <= 0) {
        self.hide();
      }
    });
    let modal = $(".winners-modal");
    let modalBoxes = $(".winners_item");
    $('[data-modal="trigger"]').on("click", function() {
      let index = $(this).index();
      modalBoxes.hide();
      modalBoxes.eq(index).css("display", "flex");
      modal.fadeIn();
    });
    $('[data-modal="close"]').on("click", function() {
      modal.hide();
    });
    $(".winners-modal_box-head_item").each(function() {
      if ($(this).find("a").text().trim() === "") {
        $(this).hide();
      }
    });
    function highlightWords() {
      $("[data-highlight]").each(function() {
        let highlight = $(this).attr("data-highlight");
        if (!highlight)
          return;
        $(this).html(function(_, html) {
          return html.split(highlight).join(`<span class="highlighted">${highlight}</span>`);
        });
      });
    }
    function updatesTagsLinks() {
      $("[data-link-tag]").each(function() {
        let href = $(this).attr("href");
        const query = encodeURIComponent($(this).text()).replace(/%20/g, "+");
        $(this).attr("href", `${href}?category=${query}`);
      });
    }
    $("[data-link-category]").each(function() {
      let category = $(this).attr("data-link-category");
      if (!category) {
        updatesTagsLinks();
        return;
      }
      let href;
      if (category === "Entreprenista") {
        href = "podcast-entreprenista";
      } else if (category === "Startups in Stilettos") {
        href = "podcast-startups-in-stilettos";
      }
      $(this).attr("href", `/${href}`);
      $("[data-link-tag]").attr("href", `/${href}`);
      updatesTagsLinks();
    });
    function displayHostsNames() {
      let avatars = $(".article-d_avatar");
      if (!avatars.length) {
        return;
      }
      let names = [];
      avatars.each(function() {
        names.push($(this).attr("data-name"));
      });
      const text = names.length > 1 ? names.join(" & ") : names[0] || "";
      $("[data-hosts-name]").text(text);
    }
    displayHostsNames();
    $("[data-copy]").on("click", function() {
      let type = $(this).attr("data-copy");
      if (type === "url") {
        copyClipboard($(this), $(location).attr("href"));
      } else {
        copyClipboard($(this), type);
      }
    });
    function copyClipboard(el, val) {
      var $temp = $("<input>");
      var ogIcon = $(el).find(".w-embed:first-child");
      var label = $(el).find(".w-embed:last-child");
      let timeOut;
      $("body").append($temp);
      $temp.val(val).select();
      document.execCommand("copy");
      $temp.remove();
      clearTimeout(timeOut);
      label.hide();
      ogIcon.hide();
      label.css("display", "flex");
      timeOut = setTimeout(() => {
        label.hide();
        ogIcon.css("display", "flex");
      }, 2e3);
    }
    function updateExternalLinks() {
      document.querySelectorAll("a[href]").forEach((link) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#"))
          return;
        const isInternal = href.startsWith("/") || href.includes(window.location.hostname);
        if (!isInternal) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
      });
    }
    updateExternalLinks();
    $(".hp-hero_featured-wrap").each(function() {
      let mask = $(this).find(".hp-hero_mask");
      let label = $(this).find(".hp-hero_visual-label").find("p");
      let texts = $(this).find(".hp-hero_content").find("p");
      let tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1.5 } });
      tl.to(mask, { scaleX: 0 });
      tl.fromTo(label, { x: "-3rem", opacity: 0 }, { x: "0rem", opacity: 1 }, "<");
      tl.fromTo(texts, { y: "2rem", opacity: 0 }, { y: "0rem", opacity: 1, stagger: 0.2 }, "<0.2");
      tl.fromTo(
        $(".hp-hero_featured-list .hp-hero_featured-item"),
        {
          opacity: 0,
          yPercent: 50
        },
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.inOut"
        },
        "<"
      );
    });
    let circleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".info-session_circle",
        start: "bottom 95%",
        endTrigger: ".section.cc-testimonials",
        end: "top bottom",
        invalidateOnRefresh: true,
        scrub: 1
      }
    });
    circleTl.to(".info-session_circle-bg", {
      width: () => {
        return window.innerWidth * 2 / 10 + "rem";
      }
    });
    let splitLetters = {};
    let scrollTriggers = [];
    function initTitles() {
      let linesTargets = document.querySelectorAll("[data-title-lines]");
      splitLetters = new SplitType(linesTargets, {
        types: "lines"
      });
      linesTargets.forEach((wrap) => {
        let lines = wrap.querySelectorAll(".line");
        lines.forEach((line, index) => {
          scrollTriggers.push(
            gsap.to(line, {
              x: () => index % 2 === 0 ? "1em" : "-1em",
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }).scrollTrigger
          );
        });
      });
    }
    function resetTitles() {
      scrollTriggers.forEach((trigger) => trigger.kill());
      scrollTriggers = [];
      if (splitLetters.revert)
        splitLetters.revert();
    }
    initTitles();
    let tilesLastWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== tilesLastWidth) {
        resetTitles();
        initTitles();
        tilesLastWidth = currentWidth;
      }
    });
  });
})();
//# sourceMappingURL=index.js.map

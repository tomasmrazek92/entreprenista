import { initSwipers } from './utils/globalFunctions';

$(document).ready(() => {
  const isMobile = () => {
    return $(window).width() < 992;
  };
  function isTriggerEvent(e) {
    return (e.type === 'mouseenter' && !isMobile()) || (e.type === 'click' && isMobile());
  }

  let hamOpen = false;

  // !!! add scroll disabler !!!

  // #region Nav
  let dropdownCards = $('.nav_dropdown-content-inner');
  let smallDropdowns = $('.nav_dropdown-small');
  let navMenu = $('.nav_inner');
  let backBtn = $('.nav_back');
  let navBrand = $('.nav_brand');
  let navHam = $('.nav_ham');

  function showBigDropdown(index) {
    dropdownCards.hide().eq(index).css('display', 'flex');
    if (isMobile()) {
      backBtn.css('display', 'flex');
      navBrand.hide();
    }
    navOverlay(true);
  }
  function showSmallDropdown(el) {
    hideDropdownCards();
    $(el).siblings(smallDropdowns).show();
    if (isMobile()) {
      backBtn.css('display', 'flex');
      navBrand.hide();
    }
    navOverlay(true);
  }
  function hideDropdownCards() {
    dropdownCards.hide();
    smallDropdowns.hide();
    backBtn.hide();
    navBrand.show();
    navOverlay(false);
  }
  function navOverlay(state) {
    let overlay = $('.nav_bg');
    if (state) {
      overlay.stop().fadeIn();
    } else {
      overlay.stop().fadeOut();
    }
  }
  function showMenu() {
    hamOpen = true;
    navMenu.css('display', 'flex');
    navHam.addClass('cc-open');
  }
  function hideMenu() {
    hamOpen = false;
    navMenu.hide();
    navHam.removeClass('cc-open');
    hideDropdownCards();
  }

  // Large Dropdowns
  $('.nav_dropdowns-large .nav_dropdown-trigger').on('mouseenter click', function (e) {
    let index = $(this).index();
    if (isTriggerEvent(e)) {
      showBigDropdown(index);
    }
  });

  $('.nav').on('mouseleave', function (event) {
    // Check if the mouse is moving to an element inside `.nav`
    if (!$(event.relatedTarget).closest('.nav').length) {
      hideDropdownCards();
    }
  });

  $(document).on('click', function (event) {
    if (!$(event.target).closest('.nav').length) {
      hideDropdownCards();
    }
  });

  // Small Dropdowns
  $('.nav_dropdowns-small .nav_dropdown-trigger').on('mouseenter click', function (e) {
    if (isTriggerEvent(e)) {
      showSmallDropdown($(this));
    }
  });

  // Ham Button
  navHam.on('click', function () {
    if (!hamOpen) {
      showMenu();
    } else {
      hideMenu();
    }
  });

  // Back Button
  $('.nav_back').on('click', function () {
    hideDropdownCards();
  });

  // #endregion

  // #region Videos

  // Ensure any promises or async loading are caught
  $('.plyr_video').each(function () {
    let playerOptions = {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume'],
      clickToPlay: true,
    };

    try {
      // Get the video src from the parent attribute
      const videoSrc = $(this).parent().attr('data-video-src');

      // Set the source for the current video element
      if (videoSrc) {
        $(this).attr('src', videoSrc);
      }

      // Initialize the player
      const player = new Plyr($(this), playerOptions);
      players.push(player);
    } catch (e) {
      console.error('Error initializing Plyr:', e);
    }
  });

  // Thumb Click
  $('[data-plyr="component"]').on('click', function () {
    const currentPlayer = $(this).find('.plyr_video')[0]; // Assume video element has [data-plyr="video"]
    pauseAllPlayers(currentPlayer);
    $(this).find('[data-plyr="cover"]').hide();
  });

  // Function to pause all players except the current one
  function pauseAllPlayers(currentPlayer) {
    // Show all covers
    $('[data-plyr="cover"]').show();

    // Pause all players except the current one
    players.forEach(function (player) {
      if (player.media !== currentPlayer) {
        player.pause();
      }
    });
  }

  // #endregion

  // #region Swipers

  // Base Swiper
  const swiperInstances = [
    [
      '.impact_slider',
      '.swiper-slider-wrap',
      'hear-testimonials',
      {
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
          },
        },
        on: {
          slideChange: pauseAllPlayers,
        },
      },
      'all',
    ],
    [
      '.pills_wrap',
      '.swiper-slider-wrap',
      'pills-homepage',
      {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
      'mobile',
    ],
    [
      '.solutions_slider',
      '.swiper-slider-wrap',
      'solutions-homepage',
      {
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
          },
        },
      },
      'all',
    ],
    [
      '.section.cc-testimonials',
      '.swiper-slider-wrap',
      'testimonials-homepage',
      {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        spaceBetween: 12,
        on: {
          init: (swiper) => {
            let index = swiper.realIndex + 1;
            let slides = swiper.slides.length;
            $(swiper.el).find('[data-counter]').text(`${index}/${slides}`);
          },
          slideChange: (swiper) => {
            let index = swiper.realIndex + 1;
            let slides = swiper.slides.length;
            $(swiper.el).find('[data-counter]').text(`${index}/${slides}`);
          },
        },
      },
      'all',
    ],
    [
      '.events_slider',
      '.swiper-slider-wrap',
      'featured-events',
      {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      'all',
    ],
    [
      '.connect_slider',
      '.swiper-slider-wrap',
      'events-gallery',
      {
        breakpoints: {
          0: {
            slidesPerView: 1.1,
            spaceBetween: 16,
          },
          489: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        },
      },
      'all',
    ],
    [
      '.founders_slider',
      '.swiper-slider-wrap',
      'founders-stats',
      {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
      'all',
    ],
    [
      '.gallery_slider',
      '.swiper-slider-wrap',
      'gallery',
      {
        breakpoints: {
          0: {
            slidesPerView: 1.1,
            spaceBetween: 16,
          },
          489: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        },
      },
      'all',
    ],
    [
      '.speaker_slider',
      '.swiper-slider-wrap',
      'speakers',
      {
        breakpoints: {
          0: {
            slidesPerView: 1.1,
            spaceBetween: 16,
          },
          489: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        },
      },
      'all',
    ],
    [
      '.solutions-top_slider',
      '.swiper-slider-wrap',
      'services',
      {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      'all',
    ],
    [
      '.hear-videos_wrap',
      '.swiper-slider-wrap',
      'hear-videos',
      {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
      'mobile',
    ],
    [
      '.info-session_slider',
      '.swiper-slider-wrap',
      'info-session',
      {
        breakpoints: {
          0: {
            slidesPerView: 1.1,
            spaceBetween: 16,
          },
          489: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
      },
      'all',
    ],
  ];

  initSwipers(swiperInstances);

  // #endregion

  // #region Filters
  //Filter Reset Button
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsfilter',
    (filterInstances) => {
      // Ensure filterInstances is defined and not empty
      if (filterInstances && filterInstances.length > 0) {
        const [filterInstance] = filterInstances;

        // Check if filterInstance exists and resetButtonsData has keys
        if (
          filterInstance &&
          filterInstance.resetButtonsData &&
          filterInstance.resetButtonsData.size > 0
        ) {
          const resetBtn = [...filterInstance.resetButtonsData.keys()][0];

          // Check if filtersData exists and has the necessary data
          if (filterInstance.filtersData && filterInstance.filtersData[0]) {
            function updateResetBtn(entries) {
              if (entries >= 1) {
                if (resetBtn) {
                  $(resetBtn).removeClass('fs-cmsfilter_active');
                }
              } else {
                if (resetBtn) {
                  $(resetBtn).addClass('fs-cmsfilter_active');
                }
              }
            }

            // Init
            updateResetBtn(0);

            filterInstance.listInstance.on('renderitems', function () {
              let entries = filterInstance.filtersData[0].values.size;
              updateResetBtn(entries);
            });
          }
        }
      }
    },
  ]);

  // Founders Weekend Filters
  $('[data-filters="founders"]').each(function () {
    let activeClass = 'fs-cmsfilter_active';
    const filters = $(this).find('.filter-tag');
    const items = $('[data-items="founders"]').find('.schedule_list-item').toArray();

    filters.on('click', function () {
      let filterText = $(this).text();

      filters.removeClass(activeClass);
      $(this).addClass(activeClass);

      // Hide all items initially
      $(items).hide();

      if (filterText !== 'All') {
        // Filter and show matching items
        items.forEach(function (item) {
          let text = $(item).find('[fs-cmsfilter-field="category"]').text();

          if (text === filterText) {
            $(item).show(); // Show only matching items
          }
        });
      } else {
        $(items).show();
      }
    });
  });

  // #endregion
  let modal = $('.winners-modal');
  let modalBoxes = $('.winners_item');

  // #region Winner Modals
  $('.awards-all-winners_item, .swiper-slide.cc-speaker').on('click', function () {
    let index = $(this).index();

    // Reveal
    modalBoxes.hide();
    modalBoxes.eq(index).css('display', 'flex');
    modal.fadeIn();
  });

  // // Close modals
  $('.winners_item-overlay, .winners-modal_close').on('click', function () {
    modal.hide();
  });

  /// Hide Empty links
  $('.winners-modal_box-head_item').each(function () {
    if ($(this).find('a').text().trim() === '') {
      $(this).hide();
    }
  });
  // #endregion

  // #Copy URL
  $(document).ready(function () {
    $('[data-copy]').on('click', function () {
      let type = $(this).attr('data-copy');

      if (type === 'url') {
        copyClipboard($(this), $(location).attr('href'));
      } else {
        copyClipboard($(this), type);
      }
    });

    function copyClipboard(el, val) {
      // Paste here
      var $temp = $('<input>');
      var ogIcon = $(el).find('.w-embed:first-child');
      var label = $(el).find('.w-embed:last-child');
      let timeOut;

      // Click
      $('body').append($temp);
      $temp.val(val).select();
      document.execCommand('copy');
      $temp.remove();

      clearTimeout(timeOut); // Corrected the function name and variable consistency
      label.hide();
      ogIcon.hide();
      label.css('display', 'flex');
      timeOut = setTimeout(() => {
        label.hide();
        ogIcon.css('display', 'flex');
      }, 2000);
    }
  });
  // #endregion
});

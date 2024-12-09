let nestedFiltersDeferreds = [];
let nestedSubTagsDeferreds = [];

function resetFS() {
  window.fsAttributes.cmsfilter.init();
  window.fsAttributes.cmsload.init();
}

// Get Nested Filters
$('.solutions-filter_row-checkbox').each(function () {
  let $this = $(this);
  let slug = $this.attr('data-slug');

  // Create deferred before the AJAX call
  let deferred = $.Deferred();
  nestedFiltersDeferreds.push(deferred);

  // Error handling for missing slug
  if (!slug) {
    console.warn('Missing slug for element:', $this);
    deferred.resolve();
    return;
  }

  $this
    .siblings('.solutions-filter_nest')
    .load(`/global-tags/${slug} .solutions-filter_row-inner`, function (response, status, xhr) {
      if (status === 'success') {
        $this.siblings('.solutions-filter_nest').each(function () {
          if (!$(this).children().length) {
            $(this).hide();
            $this.find('.solutions-filter-inner-icon').hide();
          }
        });
        deferred.resolve();
      } else {
        deferred.reject(xhr.statusText);
      }
    });
});

// Get Nested Sub Tags
$('.solutions-index_grid')
  .find('.index_card')
  .each(function () {
    let $this = $(this);
    let slug = $this.attr('data-slug');

    // Create deferred before the AJAX call
    let deferred = $.Deferred();
    nestedSubTagsDeferreds.push(deferred);

    // Error handling for missing slug
    if (!slug) {
      deferred.resolve();
      return;
    }

    $this
      .find('[data-nested-wrap]')
      .load(`/solutions-internal/${slug} [data-nested-filters]`, function (response, status, xhr) {
        if (status === 'success') {
          deferred.resolve();
        } else {
          deferred.reject(xhr.statusText);
        }
      });
  });

// Process all deferreds immediately without setTimeout
const allDeferreds = [...nestedFiltersDeferreds, ...nestedSubTagsDeferreds];

if (allDeferreds.length === 0) {
  resetFS();
} else {
  $.when
    .apply($, allDeferreds)
    .then(function () {
      resetFS();
    })
    .fail(function (error) {
      resetFS();
    });
}

// Clear Filters
$('[data-clear-button]').on('click', function () {
  document.querySelector('[fs-cmsfilter-element="clear"]').click();
});

$(document).on(
  'change',
  '.solutions-filter_row-checkbox:not(.cc-small) input[type="checkbox"]',
  function () {
    if (!this.checked) {
      $(this)
        .closest('.solutions-filter_row-checkbox')
        .siblings('.solutions-filter_nest')
        .find('input[type="checkbox"]:checked')
        .trigger('click');
    }

    // Find all other checkboxes within the same container, excluding the current one
    const checkboxes = $(this)
      .closest('.solutions-filter_row-checkbox')
      .closest('.w-dyn-item')
      .siblings()
      .find('input[type="checkbox"]:checked')
      .not(this);

    // Separate checkboxes with and without `.cc-small` parent
    const withCCSmall = checkboxes.filter(function () {
      return $(this).closest('.solutions-filter_row-checkbox').hasClass('cc-small');
    });

    const withoutCCSmall = checkboxes.filter(function () {
      return !$(this).closest('.solutions-filter_row-checkbox').hasClass('cc-small');
    });

    // Trigger clicks in order: with `.cc-small` first, then without
    withCCSmall.trigger('click');
    withoutCCSmall.trigger('click');
  }
);

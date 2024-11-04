// Clear Filters
$('[data-clear-button]').on('click', function () {
  document.querySelector('[fs-cmsfilter-element="clear"]').click();
});

// Create deferred objects for each async task
const nestedFiltersDeferred = $.Deferred();
const nestedSubTagsDeferred = $.Deferred();

// Get Nested Filters
$('.solutions-filter_row-checkbox').each(function () {
  let $this = $(this);
  let slug = $this.attr('data-slug');

  $this
    .siblings('.solutions-filter_nest')
    .load(`/global-tags/${slug} .solutions-filter_row-inner`, function (response, status) {
      if (status === 'success') {
        // Hide empty rows
        $this.siblings('.solutions-filter_nest').each(function () {
          if (!$(this).children().length) {
            $(this).hide();
            $this.find('.solutions-filter-inner-icon').hide();
          }
        });
        // Resolve the deferred for nested filters
        nestedFiltersDeferred.resolve();
      }
    });
});

// Get Nested Sub Tags
$('.solutions-index_grid')
  .find('.index_card')
  .each(function () {
    let $this = $(this);
    let slug = $this.attr('data-slug');

    $this
      .find('[data-nested-wrap]')
      .load(`/solutions-internal/${slug} [data-nested-filters]`, function (response, status) {
        if (status === 'success') {
          // Resolve the deferred for nested sub tags
          nestedSubTagsDeferred.resolve();
        }
      });
  });

// Wait for both deferred objects to be resolved
$.when(nestedFiltersDeferred, nestedSubTagsDeferred).done(function () {
  // When both things are done, we run the FS
  resetFS();
});

function resetFS() {
  window.fsAttributes.cmsfilter.init();
  window.fsAttributes.cmsload.init();
}

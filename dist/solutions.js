"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/solutions.js
  $("[data-clear-button]").on("click", function() {
    document.querySelector('[fs-cmsfilter-element="clear"]').click();
  });
  var nestedFiltersDeferred = $.Deferred();
  var nestedSubTagsDeferred = $.Deferred();
  $(".solutions-filter_row-checkbox").each(function() {
    let $this = $(this);
    let slug = $this.attr("data-slug");
    $this.siblings(".solutions-filter_nest").load(`/global-tags/${slug} .solutions-filter_row-inner`, function(response, status) {
      if (status === "success") {
        $this.siblings(".solutions-filter_nest").each(function() {
          if (!$(this).children().length) {
            $(this).hide();
            $this.find(".solutions-filter-inner-icon").hide();
          }
        });
      }
      nestedFiltersDeferred.resolve();
    });
  });
  $(".solutions-index_grid").find(".index_card").each(function() {
    let $this = $(this);
    let slug = $this.attr("data-slug");
    $this.find("[data-nested-wrap]").load(`/solutions-internal/${slug} [data-nested-filters]`, function(response, status) {
      if (status === "success") {
      }
      nestedSubTagsDeferred.resolve();
    });
  });
  $.when(nestedFiltersDeferred, nestedSubTagsDeferred).done(function() {
    console.log("hello");
    resetFS();
  });
  function resetFS() {
    window.fsAttributes.cmsfilter.init();
    window.fsAttributes.cmsload.init();
  }
})();
//# sourceMappingURL=solutions.js.map

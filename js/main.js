(function(window, document, $) {

  // DOM load
  $(function() {

    $(".skills-skill").on("mouseover", function() {
      const name = $(this).attr("name");
      $(".tag-" + name).addClass("brtlyst-highlight");
    }).on("mouseout", function() {
      $(".tag").removeClass("brtlyst-highlight");
    });

  });

})(window, document, jQuery);
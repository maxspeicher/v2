(function(window, document, $) {

  let activeSkill = "";

  // DOM load
  $(function() {

    // highlight skills onmouseover
    $(".skills-skill").on("mouseover", function() {
      const name = $(this).attr("name");
      $(".tag-" + name).addClass("brtlyst-highlight");
    }).on("mouseout", function() {
      $(".tag").removeClass("brtlyst-highlight");
    });
      
    // filter by skill
    $(".skills-skill").on("click", function() {
      const name = $(this).attr("name");
      
      $(".entry").removeClass("hidden");
      $(".skills-skill").removeClass("skills-skill--dehighlighted");

      if (name === activeSkill) {
        activeSkill = "";
      } else {
        $(".entry:not(.entry-" + name + ")").addClass("hidden");
        $(".skills-skill:not([name='" + name + "'])").addClass("skills-skill--dehighlighted");

        activeSkill = name;
      }
    });

  });

})(window, document, jQuery);
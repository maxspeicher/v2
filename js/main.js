(function(window, document, $) {

  let activeArrangement = "by-skill";
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
    $(".skills-skill").on("click", function(e) {
      e.preventDefault();
      
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
    
    // arrange by category/skill
    $(".arrangement").on("click", function(e) {
      e.preventDefault();
      
      const name = $(this).attr("name");
      
      if (name === activeArrangement) {
        return;
      }
      
      $(".container").removeClass("hidden");
      $(".container:not(#" + name + ")").addClass("hidden");
      
      $(".arrangement").removeClass("arrangement--dehighlighted");
      $(this).addClass("arrangement--dehighlighted");
      
      activeArrangement = name;
    });
    
    // smooth scroll to content
    // @unused
    $(".scroll-to-content").on("click", function() {
      document.querySelector("#content").scrollIntoView({ 
        behavior: "smooth"
      });
    });

  });

})(window, document, jQuery);
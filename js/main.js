(function(window, document, $) {

  var activeArrangement = "by-skill";
  var activeSkill = "";

  // DOM load
  $(function() {

    // highlight skills onmouseover
    $(".skills-skill").on("mouseover", function() {
      var name = $(this).attr("name");
      $(".tag-" + name).addClass("brtlyst-highlight");
    }).on("mouseout click", function() {
      if (!activeSkill) {
        $(".tag").removeClass("brtlyst-highlight");
      }
    });
    
    // highlight possibilities for arrangement
    $("[name='by-category']").on("mouseover", function() {
      $(".category").addClass("brtlyst-highlight");
    }).on("mouseout click", function() {
      $(".category").removeClass("brtlyst-highlight");
    });
    
    $("[name='by-skill']").on("mouseover", function() {
      $(".tag").addClass("brtlyst-highlight");
    }).on("mouseout click", function() {
      $(".tag").removeClass("brtlyst-highlight");

      if (activeSkill) {
        $(".tag-" + activeSkill).addClass("brtlyst-highlight");
      }
    });
      
    // filter by skill
    $(".skills-skill").on("click", function(e) {
      e.preventDefault();
      
      var name = $(this).attr("name");
      
      $(".entry").removeClass("hidden");
      $(".skills-skill").removeClass("skills-skill--dehighlighted");
      $(".tag").removeClass("brtlyst-highlight");

      if (name === activeSkill) {
        activeSkill = "";
      } else {
        $(".entry:not(.entry-" + name + ")").addClass("hidden");
        $(".skills-skill:not([name='" + name + "'])").addClass("skills-skill--dehighlighted");
        $(".tag-" + name).addClass("brtlyst-highlight");

        activeSkill = name;

        if (activeArrangement === "by-skill") {
          location.href = "#" + name;
        }
      }
    });
    
    // arrange by category/skill
    $(".arrangement").on("click", function(e) {
      e.preventDefault();
      
      var name = $(this).attr("name");
      
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
    
    // 'show more' link
    $(".link-show-more").on("click", function() {
      $(".intro-more").removeClass("hidden");
      $(".link-show-more").addClass("hidden");
    });

  });

})(window, document, jQuery);
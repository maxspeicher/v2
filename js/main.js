(function(window, document, $) {

  var activeArrangement = "by-category";
  var activeSkill = "";

  // DOM load
  $(function() {

    // highlight skills onmouseover
    $("body").on("mouseover", ".skills-skill", function() {
      var name = $(this).attr("name");
      $(".tag-" + name).addClass("brtlyst-highlight");
    }).on("mouseout click", ".skills-skill", function() {
      if (!activeSkill) {
        $(".tag").removeClass("brtlyst-highlight");
      } else {
        $(".tag:not(.tag-" + activeSkill + ")").removeClass("brtlyst-highlight");
      }
    });
    
    // highlight possibilities for arrangement
    $("body").on("mouseover", "[name='by-category']", function() {
      $(".category").addClass("brtlyst-highlight");
    }).on("mouseout click", "[name='by-category']", function() {
      $(".category").removeClass("brtlyst-highlight");
    });
    
    $("body").on("mouseover", "[name='by-skill']", function() {
      $(".tag").addClass("brtlyst-highlight");
    }).on("mouseout click", "[name='by-skill']", function() {
      $(".tag").removeClass("brtlyst-highlight");

      if (activeSkill) {
        $(".tag-" + activeSkill).addClass("brtlyst-highlight");
      }
    });
      
    // filter by skill
    $("body").on("click", ".skills-skill", function(e) {
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
    $("body").on("click", ".arrangement", function(e) {
      e.preventDefault();
      
      var name = $(this).attr("name");
      
      if (name === activeArrangement) {
        return;
      }
      
      $(".container").removeClass("hidden");
      $(".container:not(#" + name + ")").addClass("hidden");
      
      $(".arrangement").removeClass("arrangement--dehighlighted");
      $("[name='" + name + "']").addClass("arrangement--dehighlighted");
      
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

    /* Sticky skills

    var lastScroll = 0;
    var skillsHeight = $(".skills").height();
    var skillsOffset = $(".skills").offset();

    $(".skills").clone().addClass("skills-sticky hidden").appendTo("body");

    window.setInterval(function() {
      var currentScroll = $(window).scrollTop();

      if (currentScroll === lastScroll) {
        return;
      }

      if (currentScroll > skillsOffset.top + skillsHeight) {
        $(".skills-sticky").removeClass("hidden");
        $(".anchor").css({
          position: "relative",
          top: -$(".skills-sticky").height()
        });
      } else {
        $(".skills-sticky").addClass("hidden");
        $(".anchor").css({
          top: 0
        });
      }

      lastScroll = currentScroll;
    }, 1);

    */

  });

})(window, document, jQuery);
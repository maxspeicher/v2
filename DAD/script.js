(function($) {

  $(function() {
    var $mobileNav = $('<nav class="hidden" id="mobileNav"><a href="#">Menu</a></nav>');
    var $nav = $('nav').eq(0);
    var $sampleNav = $('<nav id="sampleNav"><a href="#">Ãq</a></nav>').css({
      left: -10000,
      top: -10000
    });

    $('body')
      .css('padding-top', $('nav').height())
      .append($mobileNav)
      .append($sampleNav);

    $('#mobileNav a').click(function(e) {
      e.preventDefault();
      $nav.toggleClass('hidden');
    });

    var isMobile = $nav.height() > $sampleNav.height();

    $nav.find('a').click(function() {
      if (isMobile) {
        $nav.addClass('hidden');
      }
    });

    var testNavHeight = function() {
      var navHeight = $nav.height();
      var sampleHeight = $sampleNav.height();

      if (navHeight > sampleHeight) {
        $mobileNav.removeClass('hidden');
        $nav
          .css('top', $mobileNav.height())
          .addClass('hidden');

        isMobile = true;
      } else if (navHeight <= sampleHeight) {
        $mobileNav.addClass('hidden');
        $nav
          .css('top', 0)
          .removeClass('hidden');

        isMobile = false;
      }
    };

    $(window).bind('load resize', testNavHeight);
  });

})(jQuery);
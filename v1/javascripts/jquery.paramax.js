(function(document, window, $) {

  $.fn.paramax = function(mode) {
    var $container = this;
    var $sections;

    var init = function() {
      $sections = $container.find('section');

      var count = $sections.length - 1;
      var offset = 0;

      $sections.each(function(i) {
        var $this = $(this);

        $this
          .attr('data-original-position', offset)
          .data('original-position', offset);

        if ($this.css('position') !== 'fixed') {
          $this.css({
            'position': 'absolute',
            'top': offset,
            'z-index': i
          });
        }

        $this.removeClass('last');

        if (i === count) {
          $this.addClass('last');
        }

        if ($this.attr('id')) {
          $this.removeAttr('id').removeAttr('name');
        }

        var id = $this.data('id');
        var $anchor = $('#' + id).length > 0 ? $('#' + id)
            : $('<a id="' + id + '" name="' + id + '" style="position: absolute"></a>').appendTo('body');

        $anchor.css('top', offset);

        offset += $this.outerHeight(true);
      });

      $container.height(offset);
    };

    // http://www.html5rocks.com/en/tutorials/speed/animations/
    var latestKnownScrollY = $(document).scrollTop();
    var ticking = false;

    var onScroll = function() {
      latestKnownScrollY = $(document).scrollTop();
      requestTick();
    };

    var requestTick = function() {
      if (!ticking) {
        requestAnimationFrame(updatePositions);
      }

      ticking = true;
    };

    var updatePositions = function() {
      // reset the tick so we can
      // capture the next onScroll
      ticking = false;

      var scrollTop = latestKnownScrollY;
      var wndHeight = $(window).height();

      $sections.each(function(i) {
        var $this = $(this);
        var elHeight = $this.outerHeight(true);
        var originalPos = $this.data('original-position');

        if (elHeight < wndHeight) {
          if (scrollTop >= originalPos && !$this.hasClass('last')) {
            $this.css({
              'bottom': '',
              'position': 'fixed',
              'top': 0
            });
          } else {
            $this.css({
              'bottom': '',
              'position': 'absolute',
              'top': originalPos
            });
          }
        } else {
          if (scrollTop + wndHeight >= originalPos + elHeight && !$this.hasClass('last')) {
            $this.css({
              'bottom': 0,
              'position': 'fixed',
              'top': ''
            });
          } else {
            $this.css({
              'bottom': '',
              'position': 'absolute',
              'top': originalPos
            });
          }
        }
      });
    };

    if (!mode) {
      init();
    } else if (mode === 'update') {
      init();
      updatePositions()

      return $container;
    }

    $(window).on('scroll', onScroll);

    return $container;
  };

})(document, window, jQuery);

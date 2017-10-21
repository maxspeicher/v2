$(function() {

  var isMobileDevice = MobileEsp.DetectTierTablet()
    || MobileEsp.DetectTierIphone() || MobileEsp.DetectTierOtherPhones();

  // manage background video
  var adjustVideoBg = function() {
    var $s = $('section.first');
    var $v = $('#bg-video');

    // reset video before determining size of first section
    $v.css({
      height: 0,
      width: 0
    });

    // include padding and margins
    var h = $s.outerHeight(true);
    var w = $s.outerWidth(true);

    // 1.77777 = aspect ratio of video
    var VIDEO_ASPECT_RATIO = 1.77777;
    console.log((w/VIDEO_ASPECT_RATIO) + ', ' + h);

    var videoH = $v.height();
    var videoW = $v.width();

    if (w/VIDEO_ASPECT_RATIO >= h) {
      // if height of video when scaled to section width is >= section height, set video width to 100% of section width
      videoH = w/VIDEO_ASPECT_RATIO;
      videoW = w;
    } else {
      // set video height to 100% of section height, so that the video always covers the complete section
      videoH = h;
      videoW = h*VIDEO_ASPECT_RATIO;
    }

    $v.css({
      height: videoH,
      left: -(videoW - w)/2,
      top: -(videoH - h)/2,
      width: videoW
    });
  };

  // video only for non-mobile
  if (!isMobileDevice) {
    $('.first').prepend(
      '<video id="bg-video" src="videos/Hello-World.mp4" ' +
      'autoplay loop style="width: 0px; height: 0px"></video>'
    );
  }

  // initialize self-made parallax scrolling
  $(window)
    .on('load', function() {
      if (!isMobileDevice) {
        // not all images are necessarily loaded on doc.ready -> use window.load
        $('#main').paramax();
      }
    })
    .on('resize', function() {
      if (!isMobileDevice) {
        $('#title-wrapper-outer').css('height', '100vh');
        $('#main').paramax('update');

        adjustVideoBg();
      }
    })
    .resize();

  // navigation
  var $burgerIcon = $('#burger-icon');
  var $nav = $('nav');
  // var coin = Math.round(Math.random() * 9) + 1;

  /*if (coin <= 5) {
    $burgerIcon.css('background-color', '#222');
    console.log('Congrats! You\'re the \'A\' in A/B test. Therefore, you get the burger icon with background-color.');
  } else {
    $burgerIcon.css('mix-blend-mode', 'exclusion');
    console.log('Congrats! You\'re the \'B\' in A/B test. Therefore, you get the burger icon with mix-blend-mode.');
  }*/

  $burgerIcon.on('click', function() {
    /*var message = coin <= 5 ? 'background-color' : 'mix-blend-mode';
    message += ($burgerIcon.hasClass('active') ? ' active' : ' inactive');*/

    $burgerIcon.toggleClass('active');
    $nav.toggleClass('shown hidden');

    // ga('send', 'event', 'burger', 'click', message);
  });

  // disable implicit focus border around links
  $('nav a, #title-wrapper-inner a').on('focus', function() {
    $(this).blur();
  });

  // initialize different tooltip styles depending on section/component
  $('section:nth-of-type(even) .tooltip').tooltipster({
    interactive: true,
    position: 'bottom',
    theme: '.tooltipster-dark'
  });

  $('section:nth-of-type(odd) .tooltip').tooltipster({
    interactive: true,
    position: 'bottom',
    theme: '.tooltipster-light'
  });

  // stuff with hyperlinks
  $('a').on('click', function() {
    ga('send', 'event', 'link', 'click', $(this).attr('href'));
  });

  $('nav a[href^="#"]').on('click', function(e) {
    var $element = $(this.hash);
    var hash = this.hash;
    var offset = hash === '#top' ? 0 : $element.offset().top;
    var distance = Math.abs($(document).scrollTop() - offset);
    var speed = distance / 4;

    e.preventDefault();

    $('html, body').animate({
      scrollTop: offset
    }, speed, function() {
      $burgerIcon.removeClass('active');
      $nav.removeClass('shown').addClass('hidden');

      location.href = hash;
    });
  });

});

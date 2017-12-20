jQuery(document).ready(function($) {

  var initio_parallax_animation = function() {
    $('.parallax').each(function(i, obj) {
      var speed = $(this).attr('parallax-speed');
      if (speed) {
        var background_pos = '-' + (window.pageYOffset / speed) +
          "px";
        $(this).css('background-position', 'center ' + background_pos);
      }
    });
  }

  // and run it again every time you scroll
  $(window).scroll(function() {
    initio_parallax_animation();
  });

});

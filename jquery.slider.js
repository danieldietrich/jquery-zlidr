/*
 * author: Daniel Dietrich
 *
 *  Example:
 *
 *  <script type='text/javascript' src='js/jquery.slider.js'></script>
 *
 *  <style type="text/css">
 *    #slider {
 *      width: 50%;
 *      margin: 0 auto;
 *    }
 *  </style>
 *  
 *  <div id="slider">
 *    <ul>
 *      <li><a href="javascript:void(0)" onclick="$('#slider').slideNext()">next</a></li>
 *      <li><a href="javascript:void(0)" onclick="$('#slider').slideBack()">back</a></li>
 *    </ul>
 *  </div>
 *
 *  <script type="text/javascript">
 *    $("#slider").slider();
 *  </script>
 */

(function($) {

  // called to init a slider container (e.g. div)
  $.fn.slider = function() {
    var that = this
    $(window).resize(function(e) {
      internal_resize(that)
    })
    internal_init(that)
    return internal_resize(that)
  }

  // slide back
  $.fn.slideBack = function() {
    return this.each(function() {
      var obj = $(this)
      var index = obj.attr("slide")
      internal_slide(obj, index-1)
    })
  }

  // next slide
  $.fn.slideNext = function() {
    return this.each(function() {
      var obj = $(this)
      var index = obj.attr("slide")
      internal_slide(obj, Number(index)+1)
    })
  }

  // goto slide, 0 <= index < slides.length
  $.fn.slide = function(index) {
    return this.each(function() {
      var obj = $(this)
      internal_slide(obj, index)
    })
  }

  function internal_slide(obj, index) {
    var margin = obj.width() * index * -1
    $("ul", obj).animate(
      { "marginLeft": margin },
      "fast"
    )
    obj.attr("slide", index)
  }

  // set mandatory css attributes
  function internal_init(that) {
    return that.each(function() {
      var obj = $(this)
      var ul = $("ul", obj)
      var li = ul.children()
      var width = obj.width()
      obj.attr("slide", 0)
      obj.css("overflow", "hidden")
      ul.css({
        "width": width * li.length,
        "margin": 0,
        "padding": 0,
        "list-style": "none",
      })
      li.css({
        "width": width,
        "float": "left",
        "margin": 0,
        "padding": 0,
        "overflow": "hidden"
      })
    })
  }

  // recalculate width (important case: scrollbar visibility changes)
  function internal_resize(that) {
    return that.each(function() {
      var obj = $(this)
      var ul = $("ul", obj)
      var li = ul.children()
      var width = obj.width()
      var index = obj.attr("slide")
      ul.css({
        "width": width * li.length,
        "marginLeft": index * width * -1
      })
      li.css("width", width)
    })
  }

})(jQuery)

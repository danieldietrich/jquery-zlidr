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
 *      <li><a href="javascript:void(0)" onclick="$('this').slideNext()">next</a></li>
 *      <li><a href="javascript:void(0)" onclick="$('this').slideBack()">back</a></li>
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
    that.attr("slide", 0)
    $(window).resize(function(e) {
      internal_resize(that)
    })
    internal_init(that)
    return internal_resize(that)
  }

  // slide back
  $.fn.slideBack = function() {
    return this.each(function() {
      internal_slide(this, -1)
    })
  }

  // next slide
  $.fn.slideNext = function() {
    return this.each(function() {
      internal_slide(this, 1)
    })
  }

  // goto slide, 0 <= index < slides.length
  $.fn.slide = function(index) {
    return this.each(function() {
      var obj = $(this)
      var margin = obj.width() * index * -1;
      $("ul", obj).animate(
        { "marginLeft": margin },
        "fast"
      )
      obj.attr("slide", index)
    })
  }

  // set mandatory css attributes
  function internal_init(that) {
    return that.each(function() {
      var obj = $(this)
      var ul = $("ul", obj)
      var li = ul.children()
      var width = obj.width()
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
    var index = that.attr("slide")
    return that.each(function() {
      var obj = $(this)
      var ul = $("ul", obj)
      var li = ul.children()
      var width = obj.width()
      ul.css({
        "width": width * li.length,
        "marginLeft": index * width * -1
      })
      li.css("width", width)
    })
  }

  // slide next / back
  function internal_slide(element, dir) {
    return $(element).closest("li").each(function() {
      var li = $(this)
      var ul = li.parent()
      var index = ul.children().index(li)
      if ((dir == -1 && index == 0) || (dir == 1 && index == ul.children().length-1)) {
        return
      }
      var margin = (index+dir) * li.width() * -1
      ul.animate(
        { "marginLeft": margin },
        "fast"
      )
      obj.attr("slide", index+dir)
    })
  }

})(jQuery)

/*
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

// self executing function (closure) that maps jQuery to the dollar sign
// so it can't be overwritten by another library in the scope of its execution
(function($) {
  
  // add a new function property to the jQuery.fn object
  $.fn.slider = function() {
    
    // there's no need to do $(this) because 'this' is already a jquery object
    return this.each(function() {
      
      // create a jQuery object for each element 'this' passed to this closure
      var obj = $(this)
      var ul = $("ul", obj)
      var li = ul.children()
      var li_width = obj.width()
      var ul_width = li_width * li.length

      obj.css("overflow", "hidden")

      ul.css({
        "width": ul_width,
        "margin": 0,
        "padding": 0,
        "list-style": "none",
      })

      li.css({
        "width": li_width,
        "float": "left",
        "margin": 0,
        "padding": 0,
        "overflow": "hidden"
      })

    })
  }

  // slide back
  // example: <a href="javascript:void(0)" onclick="$(this).slideBack()">back</a>
  $.fn.slideBack = function() {
    return this.each(function() {
      internal_slide(this, -1)
    })
  }

  // slide next
  // example: <a href="javascript:void(0)" onclick="$(this).slideNext()">next</a>
  $.fn.slideNext = function() {
    return this.each(function() {
      internal_slide(this, 1)
    })
  }

  // slide to specific index
  // example: <a href="javascript:void(0)" onclick="$('#slider').slide(0)">first</a>
  $.fn.slide = function(index) {
    return this.each(function() {
      var obj = $(this)
      var margin = obj.width() * index * -1;
      $("ul", obj).animate(
        { "marginLeft": margin },
        "fast"
      )
    })
  }

  // helper that slides back (dir = -1) or next (dir = 1)
  // element is a child of current li
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
    })
  }

})(jQuery)

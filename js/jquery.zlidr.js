/*
 * author: daniel dietrich
 */
(function($){
  var _ = $.zlidr = {
    init: function(id) {
      var obj = $(id)
      style(obj)
      resize(obj)
      $(window).resize(function(e) {
        resize(obj)
      })
    },
    go: function(index) {
      return this.each(function() {
        var obj = $(this),
            margin = obj.width() * index * -1
        $("ul", obj).animate(
          { "marginLeft": margin },
          "fast"
        )
        obj.attr("index", index)
      })
    }
  }
  $.fn.zlidr = function(method) {
   return _[method].apply(this, Array.prototype.slice.call(arguments, 1))
  }
  function style(obj) {
    var ul = $("ul", obj),
        li = ul.children()
    obj.css("overflow", "hidden")
    ul.css({
      "margin": 0,
      "padding": 0,
      "list-style": "none"
    })
    li.css({
      "float": "left",
      "overflow": "hidden"
    })
  }
  function resize(obj) {
      var ul = $("ul", obj),
          li = ul.children(),
          width = obj.width(),
          index = obj.attr("index") || 0
      ul.css({
        "width": width * li.length,
        "marginLeft": index * width * -1
      })
      li.css("width", width)
  }
})(jQuery)
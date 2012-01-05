/*
 * author: daniel dietrich
 */
(function($){
  var handler,
      _ = $.history = {
    init: function(h) {
      handler = h
      $("body").delegate("a[href^=/]", "click", function(e) {
        e.preventDefault()
        _.load($(this).attr("href"))
      })
      var initialURL = location.href
      $(window).bind("popstate", function(e) {
        (location.href == initialURL) ? handler.init() : handler.load(e.originalEvent.state.url)
      })
    },
    load: function(url) {
      var ok = handler.load(url)
      if (ok == undefined || ok) history.pushState({url: url}, null, url)
    }
  }
})(jQuery)
var renderSplash = function(selectorOne, selectorTwo, destination){
  if (window.localStorage.getItem("sessionId")) {
    var indexTemplate = Mustache.render($(selectorOne).html());
  } else {
    var indexTemplate = Mustache.render($(selectorTwo).html());
  }
  $(destination).html(indexTemplate);
};
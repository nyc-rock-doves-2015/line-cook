var renderSplash = function(selectorOne, selectorTwo, destination){
  console.log("renderSplash", window.localStorage.getItem("sessionId"))
  if (window.localStorage.getItem("sessionId" == null)) {
    console.log("inside if")
    var indexTemplate = Mustache.render($(selectorOne).html());
  } else {
    console.log("inside else")
    var indexTemplate = Mustache.render($(selectorTwo).html());
  }
  $(destination).html(indexTemplate);
};
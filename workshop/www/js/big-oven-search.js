var filterRecipes = function(data) {
  var noImageLink = "http://redirect.bigoven.com/pics/recipe-no-image.jpg"
  var recipes = data.Results.filter(function(result) {
    return !(result.IsBookmark || result.ImageURL == noImageLink)
  });
  return recipes;
};

var groupRecipes = function(recipes) {
  var allRecipes = [];
  for(var i = 0; i < recipes.length; i ++) {
    allRecipes.push(new RecipePreview(recipes[i]));
  };
  return allRecipes;
};

var renderRecipes = function(recipes) {
  renderPage('#search-results', '.content-container', {recipes: recipes});
  window.sessionStorage.setItem("searchResults", $('.content-container').html())
  $('span.stars').stars();
  return
};
var RecipeList = function() {
  this.recipePreviews = [];
}

RecipeList.prototype.addRecipePreview = function(recipePreview) {
  if (!recipePreview.filter()) {
    this.recipePreviews.push(recipePreview);
  }
};


// RecipeList.prototype.filterRecipes = function() {
//   var noImageLink = "http://redirect.bigoven.com/pics/recipe-no-image.jpg"
//   return this.recipePreviews.filter(function(result) {
//     return !(result.IsBookmark || result.ImageURL == noImageLink)
//   });
// };

// RecipeList.prototype.groupRecipes = function() {
//   var allRecipes = [];
//   for(var i = 0; i < recipes.length; i ++) {
//     allRecipes.push(new RecipePreview(recipes[i]));
//   };
//   return allRecipes;
// };

RecipeList.prototype.renderView = function() {
  renderPage('#search-results', '.content-container', this);
  window.sessionStorage.setItem("searchResults", $('.content-container').html())
  $('span.stars').stars();
  return
};
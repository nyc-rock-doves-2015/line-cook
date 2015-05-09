<<<<<<< HEAD
var Ingredient = function(data){
  this.name = data.Name;
  this.quantity = data.Quantity;
  this.unit = data.Unit;
}

var Recipe = function(data){
  this.title = data.Title;
  this.ingredients = [];
  this.instructions = data.Instructions;
  this.prepTime = data.TotalMinutes;
  this.yieldNumber = data.YieldNumber;
  this.yieldUnit = data.YieldUnit;
  this.stars = data.StarRating;
  this.instructions = data.Instructions;
  this.imageUrl = data.ImageURL
}

function BigOvenGetRecipeJson(recipeId) {
  var apiKey = APIKEY;
  var url = "https://api.bigoven.com/recipe/" + recipeId + "?api_key="+apiKey;

=======
var Recipe = function(data){
  this.title = data.Title;
  this.stars = data.StarRating;
  this.imageUrl = data.ImageURL
}

function BigOvenRecipeSearchJson(query) {
  var allRecipes = [];
  var noImageLink = "http://redirect.bigoven.com/pics/recipe-no-image.jpg"
  var apiKey = APIKEY;
  var titleKeyword = query;
  var url = "https://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
            + titleKeyword
            + "&api_key="+apiKey;

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
  }).then(function(data) {
    var currentRecipe = new Recipe(data);
    for(i = 0; i < data.Ingredients.length; i ++){
      currentRecipe.ingredients.push(new Ingredient(data.Ingredients[i]));
    };
  });
};

$(document).ready(function(){
  BigOvenGetRecipeJson(100);
});




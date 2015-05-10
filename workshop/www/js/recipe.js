var RecipePreview = function(data){
  this.title = data.Title;
  this.stars = data.StarRating;
  this.imageUrl = data.ImageURL;
  this.id = data.RecipeID
}

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





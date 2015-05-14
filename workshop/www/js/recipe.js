var Recipe = function(data){
  this.title = data.Title;
  this.ingredients = [];
  this.instructions = [];
  this.instructionsIndex = 0;
  this.prepTime = data.TotalMinutes;
  this.yieldNumber = data.YieldNumber;
  this.yieldUnit = data.YieldUnit;
  this.stars = data.StarRating;
  this.imageUrl = data.ImageURL;
  this.id = data.RecipeID
}

Recipe.prototype.playStart = function() {
  Ears.stopListening();
  Ears.resumeListening();
  this.instructionsIndex = 0;
  Ears.say(this.instructions[this.instructionsIndex].content);
  this.instructionsIndex += 1;
}
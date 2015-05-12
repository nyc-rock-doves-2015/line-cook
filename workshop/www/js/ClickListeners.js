 var getRecipeEvent = function(apiRequest){
  $('.container').on('click', '.recipe-container', function(event) {
    var $target = $(event.target);
    var recipeId = $target.closest('.recipe-container')[0].dataset.recipeid;
    apiRequest(recipeId);
  });
};
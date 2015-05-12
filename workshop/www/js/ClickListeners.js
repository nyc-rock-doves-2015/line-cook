 var getRecipeEvent = function(apiRequest){
  $('.container').on('click', '.recipe-container', function(event) {
    var $target = $(event.target);
    var recipeId = $target.closest('.recipe-container')[0].dataset.recipeid;
    apiRequest(recipeId);
  });
};

var getSignUpFormEvent = function(){
  $('.container').on('click', '.signup-link', function(event) {
    event.preventDefault();
    var loginTemplate = Mustache.render($('#sign-up-template').html());
    $('.navbar-collapse').collapse('toggle')
    $('.content-container').html(loginTemplate);
  });
};
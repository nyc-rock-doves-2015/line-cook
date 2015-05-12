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

var goBackSearchResultsEvent = function() {
  $('.container').on('click', '.back-search-results', function(event) {
    event.preventDefault();
    $('.content-container').html(window.sessionStorage.getItem("searchResults"));
    $('span.stars').stars();
    window.scrollTo(0, 0);
  });
};

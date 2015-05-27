var serverUrl = "http://10.0.2.210:3000"

// BigOver single recipe call
function BigOvenGetRecipeJson(recipeId) {
  clearBinds();
  $('.content-container').off('click', '#cook-button');

  var currentRecipe;
  var apiKey = "dvx7zJ0x53M8X5U4nOh6CMGpB3d0PEhH";
  var url = "https://api.bigoven.com/recipe/" + recipeId + "?api_key="+apiKey;

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
  }).then(function(data) {
    var currentRecipe = new Recipe(data);
    currentRecipe.renderView(data);
    currentRecipe.openEarsSetup();
  })
}

// BigOven recipe search
function BigOvenRecipeSearchJson(query) {
  $(document).off("receivedHypothesis")
  var titleKeyword = query;

  var recipeList = new RecipeList();

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: serverUrl + "/search_recipes",
    data: {title_keyword: titleKeyword}
  }).then(function(data) {
    recipeList.renderView(data);
  })
}

$(document).ready(function() {
  renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')
  $(document).on("deviceready", function() {
    Ears = cordova.plugins.OpenEars;
    Ears.startAudioSession();

    recipeSearchEvent(BigOvenRecipeSearchJson);
    getRecipeEvent(BigOvenGetRecipeJson);

    goBackSearchResultsEvent();
    goBackRecipeEvent();

    goHomeEvent();
    getUserProfileEvent(serverUrl);

    getSignUpFormEvent();
    signOutEvent();
    signUpEvent(serverUrl);
    signInEvent(serverUrl);

    addFavorite(serverUrl);

  });
});
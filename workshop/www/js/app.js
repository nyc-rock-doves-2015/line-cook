var serverUrl = "http://10.0.2.210:3000"

// BigOven single recipe call
function BigOvenGetRecipeJson(recipeId) {
// not sure what clearBinds is doing here
	clearBinds();
// either removes click event from content-container or #cook-button 
      	$('.content-container').off('click', '#cook-button');
 // sends GET request to our server's /get_recipe route with recipeId as JSON
 // (Our server then fetches the API key and makes the request to BigOven) 
  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: serverUrl + "/get_recipe",
    data: {recipe_id: recipeId}
// callback function for dealing with response 
// response comes back to our server and sent back to client as JSON 
  }).then(function(data) {
// make a new Recipe object with the JSON 
    var currentRecipe = new Recipe(data);
// currentRecipe's renderView function creates a view for the user  
    currentRecipe.renderView(data);
// openEarsSetup is called to await a voice command
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

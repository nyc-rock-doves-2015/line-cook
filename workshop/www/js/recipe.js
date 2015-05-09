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
  }).then(function(data){
    for(i = 0; i < data.Results.length; i ++) {
      allRecipes.push(new Recipe(data.Results[i]));
    };
    return allRecipes
  }).then(function(recipes){
    // render allRecipes here
  })
};

$(document).ready(function(){
  var bigOvenSearch = BigOvenRecipeSearchJson('cookies');
});





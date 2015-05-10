function BigOvenGetRecipeJson(recipeId) {
  var apiKey = "dvx7zJ0x53M8X5U4nOh6CMGpB3d0PEhH";
  var url = "https://api.bigoven.com/recipe/" + recipeId + "?api_key="+apiKey;

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
    var template = $('#recipe-show').html();
    var output = Mustache.render(template, currentRecipe);
    $('.container').html(output);
    var template = $('#ingredients-template').html();
    var output = Mustache.render(template, {ingredients: currentRecipe.ingredients});
    $('#ingredients').append(output);

    return currentRecipe.instructions.split(/\s{2,}/).filter(Boolean);
  }).then(function(data) {

    var instructions = data;
    var instructionsIndex = 0

    var Ears = cordova.plugins.OpenEars;
    Ears.startAudioSession();
    var languages = {};
    languages["commands"] = {};
    languages["commands"].name = "commands";
    languages["commands"].csv = "START,NEXT,REPEAT,OFF";
    languages["commands"].paths = {};
    Ears.generateLanguageModel(languages["commands"].name, languages["commands"].csv);
    $(document).on("generateLanguageModel", function(evt) {
      languages["commands"].paths = evt.originalEvent.detail;
    });

    var processHeard = function(detail) {
      if (detail.hypothesis == "NEXT") {
        Ears.say(instructions[instructionsIndex]);
        instructionsIndex += 1;
      } else if (detail.hypothesis == "START") {
        instructionsIndex = 0;
        Ears.say(instructions[instructionsIndex]);
        instructionsIndex += 1;
      }
    };

    $(document).on("receivedHypothesis", function(evt) {
      detail = evt.originalEvent.detail;
      processHeard(detail);
    });

    $(document).on("finishedSpeaking", function(evt) {
      if (instructionsIndex >= instructions.length) { Ears.stopListening(); }
    });
  })
}

// BigOven recipe search
function BigOvenRecipeSearchJson(query) {
  var allRecipes = [];
  var noImageLink = "http://redirect.bigoven.com/pics/recipe-no-image.jpg"
  var apiKey = "dvx7zJ0x53M8X5U4nOh6CMGpB3d0PEhH";
  var titleKeyword = query;
  var url = "https://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
            + titleKeyword
            + "&api_key="+apiKey;
  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
  }).then(function (data) {
    $contentContainer.html('')
    var recipes = data.Results.filter(function(result) {
      return !(result.IsBookmark || result.ImageURL == noImageLink)
    });
    return recipes;
  }).then(function(data){
    for(i = 0; i < data.length; i ++) {
      allRecipes.push(new RecipePreview(data[i]));
    };
    return allRecipes
  }).then(function(recipes){
    var template = $('#search-results').html();
    var output = Mustache.render(template, {recipes: recipes});
    $contentContainer.append(output);
  })
}

$(document).ready(function() {

  var authBar = Mustache.render($('#logged-out').html()) ;
  $('.container').html(authBar);

  $contentContainer = $('.content-container')

  $("#search-form").on('submit', function(event) {
    event.preventDefault();
    var data = $('#search').val();
    BigOvenRecipeSearchJson(data)
  });

  $('.container').on('click', '.recipe-container', function(event) {
    event.preventDefault();

    var $target = $(event.target);
    var recipeId = $target.closest('.recipe-container')[0].dataset.recipeid
    BigOvenGetRecipeJson(recipeId)

  })

  $('.signup-link').on('click', function(event) {
    event.preventDefault();

    var loginTemplate = Mustache.render($('#sign-up-template').html()) ;
    $('.container').html(loginTemplate);
    
  })

  $('.container').on('submit', '.signup-form', function(event) {
    event.preventDefault();

    $target = $(event.target)

    $.ajax({
      url: "http://10.0.2.210:3000/signup",
      type: "POST",
      data: $target.serialize()
    }).then(function(response) {
      var authBar = Mustache.render($('#logged-in').html()) ;
      $('.container').html(authBar);
    })

  })

  $('.signin-form').on('submit', function(event) {
    event.preventDefault();

    $target = $(event.target)

    $.ajax({
      url: "http://10.0.2.210:3000/signin",
      type: "POST",
      data: $target.serialize()
    }).then(function(response) {
      window.location.assign("index.html")
    })

  })

  $('#signout-index').on('click', function(event) {
    event.preventDefault();

    $target = $(event.target)

    $.ajax("http://10.0.2.210:3000/signout")
    .then(function(response) {
      window.location.assign("index.html")
    })

  })


});
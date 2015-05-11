function BigOvenGetRecipeJson(recipeId) {
  var currentRecipe;
  var apiKey = "dvx7zJ0x53M8X5U4nOh6CMGpB3d0PEhH";
  var url = "https://api.bigoven.com/recipe/" + recipeId + "?api_key="+apiKey;

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
  }).then(function(data) {
    currentRecipe = new Recipe(data);
    for(i = 0; i < data.Ingredients.length; i ++){
      currentRecipe.ingredients.push(new Ingredient(data.Ingredients[i]));
    };

    var instructions = data.Instructions.split(/\s{2,}/).filter(Boolean);
    for(i = 0; i < instructions.length; i ++){
      currentRecipe.instructions.push(new Instruction(instructions[i]));
    };

    var template = $('#recipe-show').html();
    var output = Mustache.render(template, currentRecipe);
    $('.content-container').html(output);

    var template = $('#ingredients-template').html();
    var output = Mustache.render(template, {ingredients: currentRecipe.ingredients});
    $('.recipe').append(output);

    var template = $('#instructions-template').html();
    var output = Mustache.render(template, {instructions: currentRecipe.instructions});
    $('.recipe').append(output);

    return instructions;
  }).then(function(data) {
    $('.content-container').on('click', '#cook', function(event) {
    var template = $('#instructions-template').html();
    var output = Mustache.render(template, {instructions: currentRecipe.instructions});
    $('.content-container').html(output);
    });
    return data;
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
    $('.content-container').html('')
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
    $('.content-container').append(output);
  })
}

$(document).ready(function() {

  var indexTemplate = Mustache.render($('#logged-out').html()) ;
  $('.container').html(indexTemplate);

  $('.container').on('submit', '#search-form', function(event) {
    event.preventDefault();
    var data = $('#search').val();
    BigOvenRecipeSearchJson(data)
  });

  $('.container').on('click', '.recipe-container', function(event) {
    var $target = $(event.target);
    var recipeId = $target.closest('.recipe-container')[0].dataset.recipeid
    BigOvenGetRecipeJson(recipeId)
  });

  $('.container').on('click', '.signup-link', function(event) {
    event.preventDefault();

    var loginTemplate = Mustache.render($('#sign-up-template').html()) ;
    $('.container').html(loginTemplate);
    
  })

  $('.container').on('click', '.signin-link', function(event) {
    event.preventDefault();

    var loginTemplate = Mustache.render($('#sign-in-template').html()) ;
    $('.container').html(loginTemplate);
    
  })

  $('.container').on('click', '.signout-link', function(event) {
    event.preventDefault();

    $.get("http://10.0.2.210:3000/signout")

    //I cannot add this to as a then response to the deferred object
    var indexTemplate = Mustache.render($('#logged-out').html()) ;
    $('.container').html(indexTemplate);

  })

  $('.container').on('submit', '.signup-form', function(event) {
    event.preventDefault();

    $target = $(event.target)

    $.ajax({
      url: "http://10.0.2.210:3000/signup",
      type: "POST",
      data: $target.serialize()
    }).then(function(response) {
      var indexTemplate = Mustache.render($('#logged-in').html()) ;
      $('.container').html(indexTemplate);
    })

  })

  $('.container').on('submit', '.signin-form', function(event) {
    event.preventDefault();

    $target = $(event.target)

    $.ajax({
      url: "http://10.0.2.210:3000/signin",
      type: "POST",
      data: $target.serialize()
    }).then(function(response) {
      var indexTemplate = Mustache.render($('#logged-in').html()) ;
      $('.container').html(indexTemplate);
    })
  })

});
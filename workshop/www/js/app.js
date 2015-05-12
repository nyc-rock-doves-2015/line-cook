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
    currentRecipe = new Recipe(data);
    for(i = 0; i < data.Ingredients.length; i ++){
      currentRecipe.ingredients.push(new Ingredient(data.Ingredients[i]));
    };

    var instructions = data.Instructions.split(/\s{2,}/).filter(Boolean);
    for(i = 0; i < instructions.length; i ++){
      currentRecipe.instructions.push(new Instruction(instructions[i]));
    };

    var template = $('#recipe-show').html();
    var userId = window.localStorage.getItem("sessionId")
    if (userId) {
      currentRecipe.userId = userId;
    }
    var output = Mustache.render(template, currentRecipe);
    $('.content-container').html(output);
    $('span.stars').stars();

    var template = $('#ingredients-template').html();
    var output = Mustache.render(template, {ingredients: currentRecipe.ingredients});
    $('.recipe').append(output);

    var template = $('#instructions-template').html();
    var output = Mustache.render(template, {instructions: currentRecipe.instructions});
    $('.recipe').append(output);

    window.scrollTo(0, 0);
    window.sessionStorage.setItem("recipeResult", $('.content-container').html());

    return instructions;
  }).then(function(data) {

    $('.content-container').on('click', '#cook-button', function(event) {

      var template = $('#recipe-back-template').html();
      var output = Mustache.render(template);
      $('.content-container').html(output);

      var template = $('#instructions-template').html();
      var output = Mustache.render(template, {instructions: currentRecipe.instructions});
      $('.content-container').append(output);

      var template = $('#backup-buttons-template').html();
      var output = Mustache.render(template);
      $('.content-container').append(output);

      window.scrollTo(0, 0);

      var instructions = data;
      var instructionsIndex = 0;

      Ears.stopListening();
      Ears.resumeListening();

      $('.content-container').on('click', '.backup-start', function(event) {
        Ears.stopListening();
        Ears.resumeListening();
        instructionsIndex = 0;
        Ears.say(instructions[instructionsIndex]);
        instructionsIndex += 1;
      })

      $('.content-container').on('click', '.backup-next', function(event) {
        Ears.say(instructions[instructionsIndex]);
        instructionsIndex += 1;
      })

      $('.content-container').on('click', '.backup-repeat', function(event) {
        instructionsIndex -= 1;
        Ears.say(instructions[instructionsIndex]);
        instructionsIndex += 1;
      })

      $('.content-container').on('click', '.backup-off', function(event) {
        Ears.say("Why don't you love me?")
        Ears.stopListening();
      })

      var languages = {};
      languages["commands"] = {};
      languages["commands"].name = "commands";
      languages["commands"].csv = "START,NEXT,REPEAT,QUIT";
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
          Ears.stopListening();
          Ears.resumeListening();
          instructionsIndex = 0;
          Ears.say(instructions[instructionsIndex]);
          instructionsIndex += 1;
        } else if (detail.hypothesis == "REPEAT") {
          instructionsIndex -= 1;
          Ears.say(instructions[instructionsIndex]);
          instructionsIndex += 1;
        } else if (detail.hypothesis == "QUIT") {
          Ears.say("Why don't you love me?")
          Ears.stopListening();
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
  })
}

// BigOven recipe search
function BigOvenRecipeSearchJson(query) {
  $(document).off("receivedHypothesis")
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
    window.sessionStorage.setItem("searchResults", output)
    $('.content-container').append(output);
    $('span.stars').stars();
  })
}

var clearBinds = function() {
  $(document).off("receivedHypothesis");
  $(document).off("finishedSpeaking");
  $('.content-container').off('click', '.backup-start');
  $('.content-container').off('click', '.backup-next');
  $('.content-container').off('click', '.backup-repeat');
  $('.content-container').off('click', '.backup-off');
};

$.fn.stars = function() {
  return $(this).each(function() {
    $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
  });
}

$(document).ready(function() {
  renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')
  $(document).on("deviceready", function() {
    Ears = cordova.plugins.OpenEars;
    Ears.startAudioSession();

    recipeSearchEvent(BigOvenRecipeSearchJson);

    getRecipeEvent(BigOvenGetRecipeJson);

    getSignUpFormEvent();

    $('.container').on('click', '.back-search-results', function(event) {
      event.preventDefault();

      $('.content-container').html(window.sessionStorage.getItem("searchResults"));
      $('span.stars').stars();
      window.scrollTo(0, 0);
    })

    $('.container').on('click', '.back-recipe', function(event) {
      event.preventDefault();

      $('.content-container').html(window.sessionStorage.getItem("recipeResult"));
      $('span.stars').stars();
      Ears.stopListening();
      clearBinds();
      window.scrollTo(0, 0);
    })

    $('.container').on('click', '.signout-link', function(event) {
      event.preventDefault();
      window.localStorage.removeItem("sessionId");
      var indexTemplate = Mustache.render($('#home-page-logged-out').html());
      $('.container').html(indexTemplate);
      $('body').css("background-color", "#A2DAE2")
    });

    $('.container').on('click', '.home-glyph', function(event) {
      event.preventDefault();
      $('body').css("background-color", "#A2DAE2")
      renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')
    })


    $('.container').on('submit', '.signup-form', function(event) {
      event.preventDefault();

      $target = $(event.target)
      $.ajax({
        // dan's IP
        url: "http://10.0.2.89:3000/signup",
        type: "POST",
        data: $target.serialize()
      }).then(function(response) {
        window.localStorage.setItem("sessionId", response.id);
        var indexTemplate = Mustache.render($('#logged-in').html()) ;
        $('.container').html(indexTemplate);
        $('body').css("background-color", "#FFF")
      });
    });

    $('.container').on('submit', '.signin-form', function(event) {
      event.preventDefault();

      $target = $(event.target)
      $.ajax({
        //dan's IP
        url: "http://10.0.2.89:3000/signin",
        type: "POST",
        data: $target.serialize()
      }).then(function(response) {
        window.localStorage.setItem("sessionId", response.id);
        var indexTemplate = Mustache.render($('#logged-in').html()) ;
        $('.container').html(indexTemplate);
        $('body').css("background-color", "#FFF")
      });
    });
  });
});
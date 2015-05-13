var serverUrl = "http://10.0.2.210:3000"

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
    return renderSingleRecipe(data);
  }).then(function(data) {

    $('.content-container').on('click', '#cook-button', function(event) {

      renderPage('#recipe-back-template', '.content-container')
      renderAppend('#instructions-template', '.content-container', {instructions: currentRecipe.instructions})
      renderAppend('#backup-buttons-template', '.content-container')

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
  }).then(function(data) {
    return filterRecipes(data);
  }).then(function(data) {
    return groupRecipes(data);
  }).then(function(data) {
    renderRecipes(data);
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

    goBackSearchResultsEvent();

    goBackRecipeEvent();

    signOutEvent();

    goHomeEvent();

    signUpEvent(serverUrl);

    signInEvent(serverUrl);

    getUserProfileEvent(serverUrl);

    addFavorite(serverUrl);

  });
});
// BigOven free account limited to title keyword or any keyword searches only.
// Cannot search by ingredients seperated with commas.

// BigOven recipe fetch

var Recipe = function(instructions) {
  this.instructions = instructions
}

function BigOvenGetRecipeJson(recipeId) {
  var apiKey = APIKEY;
  var url = "https://api.bigoven.com/recipe/" + recipeId + "?api_key="+apiKey;

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
  }).then(function(data) {
    $contentContainer.html('<h2>' + data.Title + '</h2>');
    $contentContainer.append(data.Instructions)
    return data.Instructions.split(/\s{2,}/).filter(Boolean);
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
  }).then(function (data) {
    $contentContainer.html('')
    data.Results.forEach(function(result) {
      if (result.IsBookmark || result.ImageURL == noImageLink) { return }
      $contentContainer.append("<li><h3>" + result.Title + "</h3><img class='recipe-container' data-recipeId='" + result.RecipeID + "' src='" + result.ImageURL + "' alt='food pic' height='200' width='300p'></li>")
      $contentContainer.append("<li class='recipe-container' data-recipeId='" + result.RecipeID + "'>" + result.WebURL + "</li>")
    })
  });
}

$(document).ready(function() {

  $contentContainer = $('.content-container')

  $("#search-form").on('submit', function(event) {
    event.preventDefault();
    var data = $('#search').val();
    BigOvenRecipeSearchJson(data)
  });

  $('.container').on('click', '.recipe-container', function(event) {
    event.preventDefault();

    var $target = $(event.target);
    var recipeId = $target[0].dataset.recipeid
    
    BigOvenGetRecipeJson(recipeId)

  })

});
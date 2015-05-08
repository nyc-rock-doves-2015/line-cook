// BigOven free account limited to title keyword or any keyword searches only.
// Cannot search by ingredients seperated with commas.

// BigOven recipe fetch

function reset() {
  recognizing = false;
  $startButton.html("Start");
}

function toggleStartStop() {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
    $startButton.html("Stop")
  }
}


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
    $contentContainer.append('<button id="start-button" onclick="toggleStartStop()" name="Start"></button>')
    $startButton = $('#start-button')
    console.log("recipe", data)
    var readable = data.Instructions.split(/\s{2,}/).filter(Boolean);
    return readable;
  }).then(function(data) {
    var recognizing;
    window.recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    reset();
    var instructions = data;
    var instructionsIndex = 0

    console.log(instructions);

    recognition.onresult = function (event) {
      console.log("onresult", event.results)
      var lastResultIndex = event.results.length - 1
      var lastResult = event.results[lastResultIndex]
      var finalTranscript = function(word) {
        return lastResult.isFinal && lastResult[0].transcript == word
      }
      var interimTranscript = function(word) {
        return !lastResult.isFinal && lastResult[0].transcript == word && lastResult[0].confidence > 0.85
      }
      // if (finalTranscript("next") || interimTranscript("next")) {
      if (finalTranscript("next")) {
        recognition.stop();
        reset();

        var utterance = new SpeechSynthesisUtterance(instructions[instructionsIndex]);
        window.speechSynthesis.speak(utterance);
        instructionsIndex += 1

        utterance.onend = function(event) {
          if (instructionsIndex < instructions.length) {toggleStartStop();}
        }
      // } else if (finalTranscript("start") || interimTranscript("start")) {
      } else if (finalTranscript("start")) {
        recognition.stop();
        reset();
        instructionsIndex = 0
        console.log("instructions: ", instructions)

        var utterance = new SpeechSynthesisUtterance(instructions[instructionsIndex]);
        window.speechSynthesis.speak(utterance)
        instructionsIndex += 1

        utterance.onend = function(event) {
          toggleStartStop();
        }
      }
      else {
        console.log("no command", event.results)
      }
    }

    recognition.onnomatch = function(event) {
      console.log("on no match", event);
    }

    recognition.onerror = function(event) {
      console.log("on error", event);
      if (event.error = "no-speech") {
        toggleStartStop();
      }
    }
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
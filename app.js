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
  $startButton.show();
  var apiKey = APIKEY;
  var url = "http://api.bigoven.com/recipe/" + recipeId + "?api_key="+apiKey;

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
  }).then(function(data) {
    // $('#bigoven-instructions').html(data["Instructions"]);
    // $('#bigoven-title').html(data.Title);
    $contentContainer.html('<h2>' + data.Title + '</h2>');
    $contentContainer.append(data.Instructions)
    console.log("recipe", data)
    var readable = data.Instructions.split(/\s{2,}/).filter(Boolean);
    return readable;
  }).then(function(data) {
    var recognizing;
    window.recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    reset();
    var instructions = data;
    var instructionsIndex = 0

    console.log(instructions);
    console.log(instructionsIndex);

    recognition.onresult = function (event) {
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          // textarea.value += event.results[i][0].transcript;
          if (event.results[i][0].transcript == "next") {
            recognition.stop();
            reset();

            var utterance = new SpeechSynthesisUtterance(instructions[instructionsIndex]);
            window.speechSynthesis.speak(utterance);
            instructionsIndex += 1

            utterance.onend = function(event) {
              toggleStartStop();
            }
          } else if (event.results[i][0].transcript == "start") {
            recognition.stop();
            reset();
            console.log("start")
            console.log("instructions: ", instructions)

            var utterance = new SpeechSynthesisUtterance(instructions[0]);
            window.speechSynthesis.speak(utterance)
            instructionsIndex += 1

            utterance.onend = function(event) {
              toggleStartStop();
            }
          }
        }
      }
    }
  }) 
}

// BigOven recipe search
function BigOvenRecipeSearchJson(query) {
  var noImageLink = "http://redirect.bigoven.com/pics/recipe-no-image.jpg"
  var apiKey = APIKEY;
  var titleKeyword = query;
  var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
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
      debugger
      if (result.IsBookmark || result.ImageURL == noImageLink) { return }
      $contentContainer.append("<li><h3>" + result.Title + "</h3><img class='recipe-container' data-recipeId='" + result.RecipeID + "' src='" + result.ImageURL + "' alt='food pic' height='200' width='300p'></li>")
      $contentContainer.append("<li class='recipe-container' data-recipeId='" + result.RecipeID + "'>" + result.WebURL + "</li>")
    });
  })
}



$(document).ready(function() {

  $startButton = $('#start-button')
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
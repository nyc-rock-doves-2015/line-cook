// BigOven free account limited to title keyword or any keyword searches only.
// Cannot search by ingredients seperated with commas.

// BigOven recipe fetch
function reset() {
  recognizing = false;
  button.innerHTML = "Click to Speak";
}

function toggleStartStop() {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
    button.innerHTML = "Click to Stop";
  }
}


var Recipe = function(instructions) {
  this.instructions = instructions
}

function BigOvenGetRecipeJson() {
  var apiKey = "dvx7zJ0x53M8X5U4nOh6CMGpB3d0PEhH";
  var recipeID = 196149;
  var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;

  var readable = [];

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
        // Remove carriage returns, newlines, and empty strings

        // Option 1
        // var readable = data["Instructions"].replace(/[\n\r]/g, '-').split("----");

        // Option 2
        // var readable = data["Instructions"].split("\r\n").filter(function(v) {return v !== ""});

        // Option 3
        // var readable = data["Instructions"].split("\r\n").filter(Boolean);
        // ----------------------------------------------------
        // console.log(readable);
        // Grab Title, Description, ActiveMinutes/TotalMinutes, Cuisine, Ingredients(Array), Instructions, YieldNumber(# of servings)
  }).then(function(data) {
    $('#bigoven-instructions').html(data["Instructions"]);
    $('#bigoven-title').html(data.Title);
    // console.log(data);
    return data["Instructions"].split("\r\n").filter(Boolean);
  }).then(function(data) {

    console.log("second then", data)
    var recognizing;
    window.recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    reset();
    var instructions = data;
    var instructionsIndex = 0

    recognition.onend = function(event) {
      console.log("onend")
    }

    recognition.onresult = function (event) {
      console.log("event results", event.results)
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          textarea.value += event.results[i][0].transcript;
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
  var apiKey = "dvx7zJ0x53M8X5U4nOh6CMGpB3d0PEhH";
  var titleKeyword = query;
  var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
            + titleKeyword
            + "&api_key="+apiKey;
  $.ajax({
      type: "GET",
      dataType: 'json',
      cache: false,
      url: url,
      success: function (data) {
          data.Results.forEach(function(result) {
            $("#bigoven-search-results").append("<li>" + result.WebURL + "</li>");
          });
          console.log(data);
      }
  });
}



$(document).ready(function() {

  // BigOvenGetRecipeJson();
  // BigOvenRecipeSearchJson();

  $("#search-form").on('submit', function(event) {
    event.preventDefault();
    var data = $('#search').val();
    BigOvenRecipeSearchJson(data)

    console.log(data);
  });
});
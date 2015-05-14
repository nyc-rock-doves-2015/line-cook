var renderSingleRecipe = function(data) {
  currentRecipe = new Recipe(data);

  for(var i = 0; i < data.Ingredients.length; i++) {
    currentRecipe.ingredients.push(new Ingredient(data.Ingredients[i]));
  };

  var instructions = data.Instructions.split(/\s{2,}/).filter(Boolean);
  for(var i = 0; i < instructions.length; i++) {
    currentRecipe.instructions.push(new Instruction(instructions[i]));
  };
  
  var userId = window.localStorage.getItem("sessionId")
  if (userId) {
    currentRecipe.userId = userId;
  }
  
  renderPage('#recipe-show', '.content-container', currentRecipe)
  $('span.stars').stars();
  
  renderAppend('#ingredients-template', '.recipe', {ingredients: currentRecipe.ingredients})
  renderAppend('#instructions-template', '.recipe', {instructions: currentRecipe.instructions})
  
  window.scrollTo(0, 0);
  window.sessionStorage.setItem("recipeResult", $('.content-container').html());
  
  return currentRecipe;
}

var openEarsSetup = function(currentRecipe) {

  $('.content-container').on('click', '#cook-button', function(event) {

    renderPage('#recipe-back-template', '.content-container')
    renderAppend('#instructions-template', '.content-container', {instructions: currentRecipe.instructions})
    renderAppend('#backup-buttons-template', '.content-container')

    window.scrollTo(0, 0);

    Ears.stopListening();
    Ears.resumeListening();

    var languages = {};
    languages["commands"] = {};
    languages["commands"].name = "commands";
    languages["commands"].csv = "START,NEXT,REPEAT,QUIT";
    languages["commands"].paths = {};
    Ears.generateLanguageModel(languages["commands"].name, languages["commands"].csv);
    $(document).on("generateLanguageModel", function(evt) {
      languages["commands"].paths = evt.originalEvent.detail;
    });

    $('.content-container').on('click', '.backup-start', function(event) {
      currentRecipe.playStart();
    })

    $('.content-container').on('click', '.backup-next', function(event) {
      currentRecipe.playNext();
    })

    $('.content-container').on('click', '.backup-repeat', function(event) {
      currentRecipe.playRepeat();
    })

    $('.content-container').on('click', '.backup-off', function(event) {
      currentRecipe.playQuit();
    })

    var processHeard = function(detail) {
      if (detail.hypothesis == "START") {
        currentRecipe.playStart();
      } else if (detail.hypothesis == "NEXT") {
        currentRecipe.playNext();
      } else if (detail.hypothesis == "REPEAT") {
        currentRecipe.playRepeat();
      } else if (detail.hypothesis == "QUIT") {
        currentRecipe.playQuit();
      }
    };

    $(document).on("receivedHypothesis", function(evt) {
      detail = evt.originalEvent.detail;
      processHeard(detail);
    });

    $(document).on("finishedSpeaking", function(evt) {
      if (instructionsIndex >= instructions.length) { Ears.stopListening(); }
    });

  });
}
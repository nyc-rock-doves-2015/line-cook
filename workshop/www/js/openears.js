var startButtonEvent = function() {
  $('.content-container').on('click', '.backup-start', function(event) {
    Ears.stopListening();
    Ears.resumeListening();
    instructionsIndex = 0;
    Ears.say(instructions[instructionsIndex]);
    instructionsIndex += 1;
  });
};

var nextButtonEvent = function() {
  $('.content-container').on('click', '.backup-next', function(event) {
    Ears.say(instructions[instructionsIndex]);
    instructionsIndex += 1;
  });
};

var repeatButtonEvent = function() {
  $('.content-container').on('click', '.backup-repeat', function(event) {
    instructionsIndex -= 1;
    Ears.say(instructions[instructionsIndex]);
    instructionsIndex += 1;
  });
};

var offButtonEvent = function() {
  $('.content-container').on('click', '.backup-off', function(event) {
    Ears.say("Why don't you love me?");
    Ears.stopListening();
  });
};
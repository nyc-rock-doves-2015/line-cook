describe("Start Cooking page", function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'spec/';
    jasmine.getFixtures().load('index-fake.html');
    renderSplash('#logged-in', '#logged-out', '.container')

    var recipeData = {
      Title: "S'mores Cookies",
      Ingredients: [{name: "unsalted butter", quantity: 11, unit: "tablespoons"}, {name: "baking soda", quantity: 1, unit: "teaspoon"}],
      Instructions: "Preheat the oven to 375 degrees.\n\rLine baking pans with parchment paper.\n\rI used one 11x17 pan and one 9x13 pan but you can really use any sized pans you want.\n\rAdd the flour mixture to the butter mixer and combine on low speed.",
      TotalMinutes: 28,
      YieldNumber: 26,
      YieldUnit: "Servings",
      StarRating: 4.54385964912281,
      ImageURL: "http://redirect.bigoven.com/pics/rs/640/smores-cookies.jpg",
      RecipeID: 208491
    };

    currentRecipe = new Recipe(recipeData);
    currentRecipe.renderView(recipeData);

    Ears = {
      stopListening: function() {},
      resumeListening: function() {},
      generateLanguageModel: function() {},
      say: function() {}
    };

    currentRecipe.openEarsSetup();
    $('#cook-button').trigger('click');
  });

  describe('when clicking the start button', function() {

    it('should recognize the click activity', function() {
      var spyEvent = spyOnEvent('.backup-start', 'click');
      $('.backup-start').trigger('click');
      expect('click').toHaveBeenTriggeredOn('.backup-start');
      expect(spyEvent).toHaveBeenTriggered();
    })

    it('should trigger OpenEars to start playing', function() {
      spyOn(currentRecipe, "playStart");
      $('.backup-start').trigger('click');
      expect(currentRecipe.playStart).toHaveBeenCalled();
    })

    it('should trigger the say function of openEars', function() {
      spyOn(Ears, 'say');
      $('.backup-start').trigger('click');
      expect(Ears.say).toHaveBeenCalled();
      expect(currentRecipe.instructionsIndex).toEqual(1);
    })
    
  });

  it('should click the next button', function() {
    var spyEvent = spyOnEvent('.backup-next', 'click');
    spyOn(currentRecipe, "playNext")
    $('.backup-next').trigger('click');
    expect('click').toHaveBeenTriggeredOn('.backup-next');
    expect(spyEvent).toHaveBeenTriggered();
    expect(currentRecipe.playNext).toHaveBeenCalled();
  });

  it('should click the repeat button', function() {
    var spyEvent = spyOnEvent('.backup-repeat', 'click');
    spyOn(currentRecipe, "playRepeat")
    $('.backup-repeat').trigger('click');
    expect('click').toHaveBeenTriggeredOn('.backup-repeat');
    expect(spyEvent).toHaveBeenTriggered();
    expect(currentRecipe.playRepeat).toHaveBeenCalled();
  });

  it('should click the off button', function() {
    var spyEvent = spyOnEvent('.backup-off', 'click');
    spyOn(currentRecipe, "playQuit")
    $('.backup-off').trigger('click');
    expect('click').toHaveBeenTriggeredOn('.backup-off');
    expect(spyEvent).toHaveBeenTriggered();
    expect(currentRecipe.playQuit).toHaveBeenCalled();
  });  

});


  




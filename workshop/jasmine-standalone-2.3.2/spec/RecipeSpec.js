describe ('recipe show', function() {

  beforeEach(function(){
    jasmine.getFixtures().fixturesPath = '../www/';
    jasmine.getFixtures().load('index.html');
    var currentRecipe = {
      title: "S'mores Cookies",
      ingredients: [{name: "unsalted butter", quantity: 11, unit: "tablespoons"}, {name: "baking soda", quantity: 1, unit: "teaspoon"}],
      instructions: [{content: "Preheat the oven to 375 degrees. Line baking pans with parchment paper. I used one 11x17 pan and one 9x13 pan but you can really use any sized pans you want."}, {content: "Add the flour mixture to the butter mixer and combine on low speed."}],
      prepTime: "28 minutes",
      yieldNumber: 26,
      yieldUnit: "Servings",
      stars: 4.54385964912281,
      imageUrl: "http://redirect.bigoven.com/pics/rs/640/smores-cookies.jpg",
      id: 208491
    };
    var template = $('#recipe-show').html();
    var output = Mustache.render(template, currentRecipe);
    $('.container').html(output);
    $('span.stars').stars();

    var template = $('#ingredients-template').html();
    var output = Mustache.render(template, {ingredients: currentRecipe.ingredients});
    $('.recipe').append(output);

    var template = $('#instructions-template').html();
    var output = Mustache.render(template, {instructions: currentRecipe.instructions});
    $('.recipe').append(output);
  });

  describe ("true", function() {
    it("should equal true", function() {
      expect(true).toBe(true);
    });
  });







});

describe("Return the recipe search results", function() {
  var value = 'lasagna'
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = '../';
    jasmine.getFixtures().load('index-fake.html');
    var indexTemplate = Mustache.render($('#home-page-logged-out').html());
    $('.container').html(indexTemplate);
  });

  describe ('recipe search event', function(){
    it('should contain an empty search field', function() {
      expect($('#search-form')).toBeInDOM();
    });
  });
});

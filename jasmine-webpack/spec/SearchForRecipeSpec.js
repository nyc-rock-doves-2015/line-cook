describe("Recipe Search Feature", function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = '../www/';
    jasmine.getFixtures().load('index.html');
  });

  describe ('recipe search event', function(){
    it('should fire when touched/clicked', function() {
      // var spyEvent = spyOnEvent('#search_form', 'submit')
      // $('#search_form').submit()
      // expect('submit').toHaveBeenTriggeredOn('#search_form')
      // expect(spyEvent).toHaveBeenTriggered()
    });
  });
});
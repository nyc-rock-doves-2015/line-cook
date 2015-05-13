describe("Splash Page", function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './';
    jasmine.getFixtures().load('index-fake.html');
  });

  describe ('container div', function(){
    it('should have a div with container class', function() {
      expect(document.getElementsByClassName('container')[0]).toBeInDOM();
    });
  });
});
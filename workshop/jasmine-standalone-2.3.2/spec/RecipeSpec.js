describe ('recipe show', function() {

  beforeEach(function(){
    jasmine.getFixtures().fixturesPath = '../www/';
    jasmine.getFixtures().load('index.html');
  });

  describe ("favorite icon", function() {
    it("should equal true", function() {
      expect(true).toBe(true);
    });
  });

});

// on click of favorite icon, event triggered/ajax request made, if signed in

// on click of favorite icon, alert/dialog box appears w/ message "Favorited", if signed in

// on click of favorite icon, alert/dialog box appears w/ message "please sign in to add favorite"
// expect($('<div><span class="some-class"></span></div>')).toContainElement('span.some-class')

// on click of back to results button, render results w/ divs class recipe-container
// expect($('<div><span class="some-class"></span></div>')).toContainElement('span.some-class')

// on click of start cooking button, render instructions-template
// expect($('<div><span class="some-class"></span></div>')).toContainElement('span.some-class')

// expect($form).toHandle("submit")
// toHandleWith(eventName, eventHandler)
// e.g. expect($form).toHandleWith("submit", yourSubmitCallback)
// toHaveAttr(attributeName, attributeValue)
// attribute value is optional, if omitted it will check only if attribute exists
// toHaveBeenTriggeredOn(selector)

// loadFixtures('myfixture.html')
// $('#my-fixture').myTestedPlugin()
// expect($('#my-fixture')).to...

// oldFunctionWithAlert = jasmine.createSpy("oldFunctionWithAlert() spy").andCallFake(function() {
    // console.log("Doing some testing");
    // return "Test";
// });
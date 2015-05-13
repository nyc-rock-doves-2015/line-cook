describe("Splash page", function() {

  beforeEach(function() {
    window.localStorage.removeItem("sessionId")
    jasmine.getFixtures().fixturesPath = './';
    jasmine.getFixtures().load('index-fake.html');
  });

  it('should have a sign in form', function() {
    window.localStorage.removeItem("sessionId")
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')

    expect(document.getElementsByClassName('signin-form')[0]).toBeInDOM();
  });

  it('should have a sign out link when logged in', function() {
    window.localStorage.setItem("sessionId", 1)
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')

    expect(document.getElementsByClassName('signout-link')[0]).toBeInDOM();
  });

})

describe("Auth", function() {

  beforeEach(function() {
    window.localStorage.removeItem("sessionId")
    jasmine.getFixtures().fixturesPath = './';
    jasmine.getFixtures().load('index-fake.html');
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')
  });

  describe('from any page where not logged in', function() {
    it('should be able to add sign up form', function() {
      getSignUpFormEvent();
      $('.signup-link').trigger('click')

      expect($('#signup-container')[0]).toBeInDOM();
    });

    describe('with async sign up', function() {

      beforeEach(function(done) {
        getSignUpFormEvent();
        $('.signup-link').trigger('click')

        signUpEvent("http://10.0.2.210:3000");
        $('.signup-form').trigger('submit');

        setTimeout(function() { 
          done() ;
        }, 1000)
      })

      it('should be able to submit a sign up form', function() {
        expect($('.signout-link')[0]).toBeInDOM(); 
      });
    });
  });
});
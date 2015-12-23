#Testing Set-Up

##Download CORS extension so that you can issue ajax calls through the jasmine server
[https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

##Launch Jasmine server
(from line-cook/simple_backend)
```
rake jasmine 
```
This should launch the jasmine server for testing. You can access it at [http://localhost:8888](http://localhost:8888)

##Issuing AJAX calls

You need to setup a beforeEach with a callback function parameter of 'done' to issue the ajax call.
Then setup a setTimeout to execute the done() function after a certain amount of time.

The 'it' block after will only be run AFTER the done() function is excuted. By this time, you should have your response back from the ajax call.

```
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
```

##Misc
Some of your tests might depend on the sinatra server responses, so make sure that is running.

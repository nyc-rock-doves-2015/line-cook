# Line-Cook
Line-cook is a cooking-helper app for iOS that utilizes iPhone's speech-synthesis/speech-recognition to allow users to cook while their device reads recipe steps aloud to them.

## Core Functionalities
1. Search for recipes via the [BigOven](http://api.bigoven.com/documentation "BigOven Documentation") API
2. Choose a recipe from search results
3. View recipe ingredients and steps and issue [voice commands](https://github.com/nyc-rock-doves-2015/line-cook/tree/readme_final)
4. Create an account to save favorite recipes

## Voice Commands
 Command        | Result
| ------------- |:-------------:|
| Start         |               |
| Next          |               |
| Repeat        |               |

Starting a python server

python -m SimpleHTTPServer

starts a server on port 8000

#Launch Chrome from command line
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files

#Setup Jasmine Webpack

##Download CORS extension so that you can issue ajax calls through the jasmine server
[https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

##Launch Jasmine server
(from line-cook directory)
cd jasmine-webpack

npm start

This should launch the jasmine server for testing. You can access it at [http://localhost:8080/SpecRunner.html](http://localhost:8080/SpecRunner.html)

##Adding spec files
You can add new spec files in webpack.config.js (there is an array of spec files that get loaded). You will need to restart the server when you add spec files.

Other additions can go into the SpecRunner.html

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
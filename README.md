# Line-Cook
Line-cook is a cooking-helper app for iOS that utilizes iPhone's speech-synthesis/speech-recognition to allow users to cook while their device reads recipe steps aloud to them.

## Core Functionalities
1. Search for recipes via the [BigOven](http://api.bigoven.com/documentation "BigOven Documentation") API
2. Choose a recipe from search results
3. View recipe ingredients and steps and issue [voice commands](https://github.com/nyc-rock-doves-2015/line-cook/tree/readme_final)
4. Create an account to save favorite recipes

## Voice Commands
 Command        | Result
| ------------- |-------------------------------|
| Start         | Begins recipe recitation      |
| Next          | Reads off next step in recipe |
| Repeat        | Repeats current step in recipe|
| Quit          | Disables listener             |

## Apis
### Apache Cordova
Line-Cook is a native JavaScript app built on the Apache Cordova mobile platform
### OpenEars
Line-Cook utilizes OpenEars to enable speech recognition and speech synthesis on iOS
### Run This Project From Mac OS X: 
#### Requirements
* OS X Mavericks or higher (though it may work on earlier versions) 
* Xcode
* Node and Node Package Manager (npm)  
#### Set-Up (Command Line and Xcode)

1. From the command line, using npm, download Apache Cordova. 
``sudo npm install -g cordova`` This will require root access.  
2. Clone the line-cook repository
3. From the command line, navigate to ``line-cook/workshop`` 
4. From this directory , add the iOS mobile platform. From the command line, type: 
``cordova platform add ios``
5. You will also need this command: 
``npm install -g ios-sim`` 
6. See that the platform was added successfully by typing this command: 
``cordova platform ls`` You should see ``Installed platforms: ios 3.8.0``.

   **NOTE:** The following steps are due to a bug in the OpenEars speech processing library, and require some   modifications to Xcode. A more permanent fix will be available shortly. 
7. Open Xcode, and navigate to "Open Another Project"
8. Go to ``line-cook/workshop/platforms/ios`` and open ``Workshop.xcodeproj`` 
9. Once the project navigator is open, click on **Workshop** (the first on the list)
10. This will open a ``Workshop.xcodeproj`` window with different settings.
  * in the "General" setting, scroll down to "Linked Frameworks and Libraries"
  * hit the **+** at the bottom, to add another library
  * In the next window that opens, click **Add Other...**
  * navigate to ``line-cook/OpenEars/src/ios/Framework`` 
  * Choose ``Kal16.framework``
  * Click **Open**
  * **Save** the project

###Instructions (JavaScript) 
* Navigate to ``line-cook/workshop/www/js``
* Open ``app.js``
* Line 1 reads:  

```javascript
var serverUrl = "http://10.0.2.210:3000"
```

* change this value to your own computer's IP address, to serve port 3000 
* save the file 

###Instructions (Ruby) 
* In a new shell, navigate to ``line-cook/simple_backend``
* ``bundle install`` for required gems
* launch the thin server with:
```
bundle exec thin start
```



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

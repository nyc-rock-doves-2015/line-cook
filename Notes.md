# Review Notes

## General

*  Can we factor out all that `content_type` noise?
*  Clean up your debugging output

## Model

* What is a `big_oven_id`.  Huh?  It automatically made me go "huh?"

## Technical notes

*  In several places you use JSON with `status` to bear forth failure
   mechanisms.  In some places you could return HTTP error code and that would
   fire your fail() callback.

## Cleanup Skeleton

* Remove all the Bunday DBC sinatra skeleton READMEs, zenchinese.jpg,
  welcome.erb etc.

## seeds

They help me understand your app.  hard to believe there's nothing here

## spec

None?  Seems risky.  No jasmine either?  Seems risky.


## www/js

* Seems like storing your API key shouldn't be done.  Could you interpolate it
  via mustache?
* Multiple document.ready():  how do you know which one runs first?  the
  ready() should be probably in one file, in one place.  The rest of the OO
  universe 
* Hard coded IPs.  Your rack environment knows its own IP address, use that
* I'd really like to see non-your javascript put into a separate folde like
  `/vendor`
* Split JS Models into separate files ... As you did with User
* Use directories to split up function (e.g. models/ controllers/)


## Codebase

Is rather daunting.  I'd prefer you to stop adding features and clean this
thing up.  Monday's demo was good, but I want the code to show off your
engineering chops.

Notable:

* `BigOvenGetRecipeJson` is HUGE and confusig.  Why not build a collection of
  classes that hold this logic?  It has DOM responsibility, data responsibility,
  etc.  Tons of responsibility.  Hard to read, refactor.
  `BigOvenRecipeSearchJson` suffers the same problem.
* All your logic is based in two core callbacks!  It's going to be hard to
    refactor / expand / work on this.  Please clean this up.

## Overall

You've delivered on your core value proposition (I believe).  Please clean up
the code base so that you can show this cool app off!

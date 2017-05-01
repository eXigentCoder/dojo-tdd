# tdd-dojo

Code Dojo on Test driven development (TDD). Start with the master branch, you wills see there is a tag called `start-here`. The answers may be found in the solutions branch, there will be tags matching up to each exercise.
The idea for this project is to teach yourself how to build an application using TDD, so make sure to follow the [red, green, refactor](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) cycle.

# Overview

You should have the app checked out from the master branch, at the tag `start-here`. You have a basic node application running express.js to server as a web api.

# Exercises

### 1.0 Base Route
We have a basic api but no actual endpoints that we can call to do any work!

1. Create an endpoint listening for `GET`, requests at the `/` route.
1. Other verbs, except for \[`GET`, `HEAD`, `OPTIONS`\] should result in a `404` error.
1. The response should contain:
    1. The name of the application.
    1. The version of the application.
    1. How long the application has been running for.
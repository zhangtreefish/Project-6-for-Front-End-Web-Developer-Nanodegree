Project 6 of Udacity Front-End Nanodegree:Testing

Jasmine output from feedreader.js at the beginning:

1 spec, 0 failures
Jasmine__TopLevel__Suite
RSS Feeds
are defined

The first action(steps 5-6 in the project 6 direction) was quoting out by /* */ the content of allFeeds in app.js:

Result:
1 spec, 1 failure;
RSS Feeds are defined;
Expected 0 not to be 0.

This is the red phase. I then restored the contents, equivalent to the green phase.

After the first action I wrote a few suits of tests following the prompt given in feedreader.js. I added a few
additional test per suggestions of the reviewer, as well as a test on error throwing. I tested the tests by modifying the app.js and checking for red messages.

Debugging: When I run the feedreader.js I got these js console message even though Jasmine did not complain:

error1: "Spec 'New Feed Selection changes the displayed content upon loading of a new feed' has no expectations."
error2: "Uncaught TypeError: this.expectationResultFactory is not a function"
error3: "Uncaught RangeError: Maximum call stack size exceeded".

errors 1 and 3 has to do with newFeed changed the diaplayed content spec because when I mess newFeed up Jasmine complained that newFeed is not defined" before the console did. I solve errors 1 and 3 by changing the expectation for the spec from

expect(feedOld).not.toBe(feedNew);

to

expect(feedOld===feedNew).toBe(false); (line 125 of feedreader.js)

Solution:
errors 1 and 2 are solved by binding a function to click as suggested in reference 4.

The references I used are:

1. Google Feed API: https://developers.google.com/feed/

2. Jasmine matchers cheatsheet: http://www.cheatography.com/citguy/cheat-sheets/jasmine-js-testing/

3. Jasmine Documentation: http://jasmine.github.io/2.2/introduction.html

4. On error message "Uncaught RangeError": http://stackoverflow.com/questions/7658775/chrome-jquery-uncaught-rangeerror-maximum-call-stack-size-exceeded
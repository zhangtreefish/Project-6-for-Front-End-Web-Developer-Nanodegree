Project 6 of Udacity Front-End Nanodegree:Testing

Jasmine output from feedreader.js at the beginning:

1 spec, 0 failures
Jasmine__TopLevel__Suite
RSS Feeds
are defined

#1: The first action(steps 5-6 in the project 6 direction) was quoting out by /* */ the content of allFeeds in app.js:

Result:
1 spec, 1 failure;
RSS Feeds are defined;
Expected 0 not to be 0.

This is the red phase. I then restored the contents, equivalent to the green phase.
#2. After the first action I wrote a few suits of tests following the prompt given in feedreader.js. I added a few
additional test per suggestions of the reviewer, as well as a test on error throwing. I tested the tests by modifying the app.js and checking for red messages.

The references I used are:

1. Google Feed API: https://developers.google.com/feed/

2. Jasmine matchers cheatsheet: http://www.cheatography.com/citguy/cheat-sheets/jasmine-js-testing/

3. Jasmine Documentation: http://jasmine.github.io/2.2/introduction.html
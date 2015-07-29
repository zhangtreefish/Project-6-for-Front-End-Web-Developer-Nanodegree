Project 6 of Udacity Front-End Nanodegree:Testing

To run this testing,
:Go to http://zhangtreefish.github.io/feedreader/
:Make changes to the app.js file, to see if Jasmine throws any complaint in red messages.

For example, Jasmine output from feedreader.js at the beginning is:

1 spec, 0 failures
Jasmine__TopLevel__Suite
RSS Feeds
are defined

Following steps 5-6 in the project 6 direction by quoting out (via /* */) the content of allFeeds in app.js produce the following complaint from Jasmine in red:

Result:
1 spec, 1 failure;
RSS Feeds are defined;
Expected 0 not to be 0.

To test the 'RSS Feeds are defined' spec,change allFeeds to [] in app.js.

To test the 'RSS Feeds all entries have a defined URL that is not empty' spec,remove 'tp://bl' from one of the url properties of allFeeds in app.js and run this code again, Jasmine threw 'Expected 'htog.udacity.com/feeds/posts/default?alt=rss' to match /^http(s?)\:\/\//.'.

To test the 'RSS Feeds all entries have a defined name that is not empty", change the [name: 'Udacity Blog',] to [name:''], Jamsine throws error on the spec 'Expected 0 to be greater than 0.'

Debugging: When I run the feedreader.js I get these js console message even though Jasmine does not complain aloud:

error1: "Spec 'New Feed Selection changes the displayed content upon loading of a new feed' has no expectations."
error2: "Uncaught TypeError: this.expectationResultFactory is not a function"
error3: "Uncaught RangeError: Maximum call stack size exceeded".

errors 1 and 3 has to do with newFeed changed the diaplayed content spec because when I mess newFeed up Jasmine complained that newFeed is not defined" before the console did. I solve errors 1 and 3 by changing the expectation for the spec from

expect(feedOld).not.toBe(feedNew);

to

expect(feedOld==feedNew).toBe(false); (line 125 of feedreader.js)

After much messing with the code the error 2 is gone as well.

The references I used are:

1. Google Feed API: https://developers.google.com/feed/

2. Jasmine matchers cheatsheet: http://www.cheatography.com/citguy/cheat-sheets/jasmine-js-testing/

3. Jasmine Documentation: http://jasmine.github.io/2.2/introduction.html

4. On error message "Uncaught RangeError": http://stackoverflow.com/questions/7658775/chrome-jquery-uncaught-rangeerror-maximum-call-stack-size-exceeded

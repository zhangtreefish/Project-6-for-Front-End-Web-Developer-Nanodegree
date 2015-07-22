/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* The first suite is all about the RSS feeds definitions, the allFeeds variable
    in our application. */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
          allFeeds variable has been defined and that it is not
          empty. I check for emptiness by verifying allFeeds being
          an array AND that having more than one element. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        it("throw an error when the feeds are empty", function() {
            var feedLength = allFeeds.length;
            var throwIt = function() {
                if (feedLength===0) {
                    throw('there is no feed');
                }
            };
            expect(throwIt).not.toThrow();
        });

        /* This test loops through each feed in the allFeeds object and ensures
        it has a URL that is defined,not empty, and contain url string elements. */
         it ('all entries have a defined URL that is not empty', function() {
            var feedLength = allFeeds.length;
            for (i=0; i<feedLength; i++) {
                var feed=allFeeds[i];
                expect(feed.url).toBeDefined(); //this is to check it exists
                expect(feed.url).not.toBe(null);//this is to check it is not empty
                expect(feed.url).toMatch(/^http(s?)\:\/\//);//this is to check url fits formats
            }
         });

        /* This test loops through each feed in the allFeeds object and ensures it has
        a name that is defined,not empty, and of a string in nature.
         */
         it ('all entries have a defined name that is not empty', function() {
            var feedLength = allFeeds.length;
            for (i=0; i<feedLength; i++) {
                var feed=allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
                expect(typeof feed.name).toBe('string');
            }
         });
    });


    /* This is a test suite named "The menu" */
    describe('menu', function() {
        /* This test ensures the menu element is hidden by default. */
        var theClasses;
        beforeEach (function() {
            theClasses = document.getElementsByTagName('body')[0].classList;
        });

        it('is hidden by default', function() {
            expect(theClasses).toContain('menu-hidden');
        });

         /* This test ensures the menu changes visibility when the menu icon
         is clicked: the two expectations are  that the menu displays when
        clicked and that it hides when clicked again. */
        it('displays when clicked and hides when clicked again', function() {
            menuIcon = $('.menu-icon-link');
            if(menuIcon.onClick) {
                expect(theClasses).toNotContain('menu-hidden');
                expect(menuIcon.toggleClass('menu-hidden')).toBeTruthy;
            } else {
                    expect(theClasses).toContain('menu-hidden');
            }
        });
    });

    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test checks that when the loadFeed function is called
        and completes its work, there is at least a single .entry element
        within the .feed container. loadFeed() is asynchronous so this test uses
        Jasmine's beforeEach and asynchronous done() function. */
         var theElements;
         beforeEach (function(done) {
            theElements = document.getElementsByClassName('entry');
            loadFeed(0,done);
         });

         it('has at least one entry', function(done) {
            expect(theElements.length).toBeGreaterThan(0);
            done();
         });
    });

    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded by the loadFeed
        function that the content actually changes. care is taken to
        address the fact that loadFeed() is asynchronous. */
         var currentFeeds = $('.feed').html();
         beforeEach (function(done) {
            loadFeed(0,done);
         });


         it('changes the displayed content upon loading of a new feed', function(done) {
            var newFeeds = $('.feed').html();
            expect(newFeeds).not.toBe(currentFeeds);
            done();
         });
    });
}());

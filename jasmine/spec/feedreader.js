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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it ('all entries have a defined URL that is not empty', function(){
            var allFeeds = [];
            var feedLength = allFeeds.length;
            for (i=0; i<feedLength; i++) {
                var feed=allFeeds[i];
                expect(feed.url).toBeDefined(); //this is to check it exists
                expect(feed.url).toNotBe(null);//this is to check it is not empty
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it ('all entries have a defined name that is not empty', function(){
            var allFeeds = [];
            var feedLength = allFeeds.length;
            for (i=0; i<feedLength; i++) {
                var feed=allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name).toNotBe(null);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var theClasses;
        beforeEach (function() {
            theClasses = document.getElementsByTagName('body')[0].classList;
        });

        it('is hidden by default', function() {
            expect(theClasses).toContain('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
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
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
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
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var currentFeeds = $('.feed').html();
         beforeEach (function(done) {
            loadFeed(0,done);
         });

         it('changes the displayed content', function(done) {
            var newFeeds = $('.feed').html();
            expect(newFeeds).not.toBe(currentFeeds);
            done();
         });
    });
}());

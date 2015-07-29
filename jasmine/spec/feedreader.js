/* feedreader.js
This is the spec file that Jasmine will read and contains
all of the tests that will be run against the application.*/

/* We're placing all of our tests within the $() function,
since some of these tests may require DOM elements. We want
to ensure they don't run until the DOM is ready. */
$(function() {
    /* The first suite is all about the RSS feeds definitions, the allFeeds variable
    in our application. */
    describe('RSS Feeds', function() {
        /* This is my first test - it tests to make sure that the
          allFeeds variable has been defined and that it is not
          empty. I check for emptiness by verifying allFeeds being
          an array AND having more than one element.*/
        it('are defined', function() {
            console.log(allFeeds);//console output [Object, Object, Object, Object]
            expect(allFeeds).toBeDefined(); //expect(allFeeds instanceof Array).toBeTruthy(); does not work, not an array
            expect(allFeeds).not.toBe(null);
        });

        /*I also include a test that throws an error when there is no
          feed entry. */
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
        it has a URL that is defined,not empty,and contains url string elements.
        I use array.forEach in lieu of a for loop for a cleaner effect per reviewer 2
        suggestion  */
        it('all entries have a defined URL that is not empty', function() {
            allFeeds.forEach(function(val){
                console.log(val.url);//console.log(this.url) is 'undefined'
                expect(val.url).toBeDefined(); //this is to check it exists
                expect(val.url).not.toBe(null);//this is to check it is not empty
                expect(val.url).toMatch(/^http(s?)\:\/\//);//this is to check url fits formats
            });
        });

        /* This test loops through each feed in the allFeeds object and ensures it has
        a name that is defined,not empty,and of a string in nature. */
        it('all entries have a defined name that is not empty', function() {
            allFeeds.forEach(function(val) {
                expect(val.name).toBeDefined();
                expect(val.name).not.toBe(null);
                expect(val.name.length).toBeGreaterThan(0);//to test that the name has at least one character long
                expect(typeof val.name).toBe('string');
            });
        });
    });

    /* This is a test suite named "The menu" */
    describe('menu', function() {
        /* This test ensures that the menu element is hidden by default. */
        var theClasses;

        beforeEach(function() {
            theClasses = document.getElementsByTagName('body')[0].classList;
        });

        it('is hidden by default', function() {
            expect(theClasses).toContain('menu-hidden');
        });

        /* This test ensures that the menu changes visibility when the menu icon
        is clicked: the two expectations are  that the menu displays when
        clicked and that it hides when clicked again. I initially had if loops, removed
        loops per reviewer 2's suggestion */
        it('displays when clicked and hides when clicked again', function() {
            var theLink=$('.menu-icon-link');
            theLink.click();
            expect($('body').hasClass('menu-hidden')).toBe(false); //if instead: expect($('body')).hasClass('menu-hidden'),will get error "hasClass is not a function"
            theLink.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });   //if missing this line, error message displays "no specs found"

    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test checks that when the loadFeed function is called
        and completes its work, there is at least a single .entry element
        within the .feed container. loadFeed() is asynchronous so this test uses
        Jasmine's beforeEach and asynchronous done() function. */
        var feeds;

        beforeEach(function(done) { //without done in the argument, Jasmine complains "done is not defined"
            loadFeed(0,done);
            feeds = $('.feed');
            console.log('1 '+ feeds);
        });

        it('has at least one entry', function() {
            expect(feeds.length).toBeGreaterThan(0);
        }); //TODO: My second reviewer suggested to remove done from the function argument and from the test, I followed but not sure.
    });

    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded by the loadFeed
        function that the content actually changes. Care is taken to
        address the fact that loadFeed() is asynchronous. */
        var feedOld, feedNew;

        beforeEach(function(done) {
            console.log('2 '+ $('article.entry'));
            $('.feed').empty(); //call empty() per reviewer 2 suggestion to stay free from external influence
            loadFeed(0,function() {
                console.log('3 '+$('article.entry'));//if use $('.feed'): get 'object object' in console
                console.log("3.1 " + $('article.entry').text());//html() get the html code in console,textContent gets the content
                feedOld=$('article.entry').text();
                loadFeed(1,function() { //if have done inside (): "done is not a function"
                    done();
                });
            });
        });

        it('changes the displayed content upon loading of a new feed', function(done) {
            loadFeed(1,done);
            feedNew=$('article.entry').text();
            console.log('4' + feedNew);
            //done();//with this line,Jasmine complains "Spec 'New Feed Selection changes the displayed content upon loading of a new feed' has no expectations
            console.log('newFeed'+ feedNew);
            console.log('oldFeed'+ feedOld);
            expect(feedOld==feedNew).toBe(false);//TODO: console message "spec 'New Feed Selection changes the displayed content upon loading of a new feed' has no expectations."
        });
    });
}());
/*
    /test/text.js
 * */
define(function (require) {

    var Text = require("../src/goatstone/text/Text");

    describe("Given the object goatstone.text.Text", function () {

        describe("if the processStory method is called with a string", function () {
            var returnedData;
            beforeEach(function (done) {
                new Text().processStory("a text document in the form of a string")
                    .then(function (data) {
                        returnedData = data;
                        done();
                    },
                    function (error) {
                        done(error);
                    });
            });
            it("should return an object", function () {
                expect(returnedData).to.be.an('object');
            });
        });

        describe("if the method 'processStory' is called without a string as argument", function () {
            var errorReturned;
            beforeEach(function (done) {
                new Text().processStory(123) // supply incorrect argument
                    .then(function (data) {
                        done();
                    },
                    function (error) {
                        errorReturned = error;
                        done();
                    });
            });
            it("should return an instance of an Error", function () {
                expect(errorReturned).to.be.an.instanceof(Error);
            });
        });
    });
});
/*
 main.js
 * */

window.addEventListener("load", function () {

    var alphaRange;
    var storyWords;
    var message;

    alphaRange = new AlphaRange();
    storyWords = new StoryWords();
    message = new Message();

    storyWords.fetchText(function () {
        alphaRange.move();
    });

    alphaRange.addSelectListener(
        function (filteredStr) {
            storyWords.highlightWords(filteredStr);
        });

});

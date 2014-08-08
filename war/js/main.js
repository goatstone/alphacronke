/*
 main.js
 * */

window.addEventListener("load", function () {

    var alphaRange;
    var storyWords;

    alphaRange = new AlphaRange();
    storyWords = new StoryWords();

    storyWords.fetchText(function () {
        alphaRange.move();
    });

    alphaRange.addSelectListener(
        function (filteredStr) {
            storyWords.highlightWords(filteredStr);
        });

});

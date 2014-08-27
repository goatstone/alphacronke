/*
 main.js
 * */

var storyWords;

window.addEventListener("load", function () {

    var alphaRange;
    var message;

    alphaRange = new AlphaRange();
    storyWords = new StoryWords();
    message = new Message();

    storyWords.fetchText(function () {
        console.log(storyWords.storyParts)
        storyWords.setSection(storyWords.storyParts.intro);
        alphaRange.move();
    });

    alphaRange.addSelectListener(
        function (filteredStr) {
            storyWords.highlightWords(filteredStr);
        });

});

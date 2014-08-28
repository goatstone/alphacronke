/*
 main.js
 * */

window.addEventListener("load", function () {

    var alphaRange;
    var message;
    var storyWords;
    var storyPartSelect;

    storyPartSelect = new StoryPartSelect();
    alphaRange = new AlphaRange();
    storyWords = new StoryWords();
    message = new Message();

    storyPartSelect.$storyPartsOpts.addEventListener('change', function (e) {
        storyWords.setSection(this.value);
    })

    storyWords.fetchText(function () {
        storyWords.setSection('intro');
        alphaRange.move();
    });

    alphaRange.addSelectListener(
        function (filteredStr) {
            storyWords.highlightWords(filteredStr);
        });

});

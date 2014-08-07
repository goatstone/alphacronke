/*
 main.js
 * */

window.addEventListener("load", function () {

    var alphaRange;
    var storyWordsWidget;

    alphaRange = new AlphaRange();
    storyWordsWidget = new StoryWords();

    alphaRange.addSelectListener(
    	function(filteredStr){ 
    		storyWordsWidget.set(filteredStr);
    	});

    storyWordsWidget.fetchText(function () {
        alphaRange.move();
    });

});

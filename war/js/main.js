/*
 main.js
 * */

window.addEventListener("load", function () {

    var alphaRange;
    var storyWordsWidget;
    var appInformation;

    alphaRange = new AlphaRange();
    storyWordsWidget = new StoryWords();
    appInformation = new AppInformation();

    alphaRange.addSelectListener(
    	function(filteredStr){ 
    		storyWordsWidget.set(filteredStr);
    	});

    storyWordsWidget.fetchText(function () {
        alphaRange.move();
    });

});

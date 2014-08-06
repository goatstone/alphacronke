/*
 alpha_brush.js
 * */

window.addEventListener("load", function () {

	var alphaRange;
	var storyWordsWidget;
	var appInformation;

    alphaRange = new AlphaRange();

    storyWordsWidget = new StoryWords();
    storyWordsWidget.fetchText(function(){
        alphaRange.move();
    });

    appInformation = new AppInformation();

});


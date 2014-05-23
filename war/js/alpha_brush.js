/*
 alpha_brush.js
 * */

var alphaRange;
var storyWordsWidget;
var appInformation;
window.addEventListener("load", function () {

    alphaRange = new AlphaRange();

    storyWordsWidget = new StoryWords();
    storyWordsWidget.fetchText(function(){
        alphaRange.move();
    });

    appInformation = new AppInformation();

});


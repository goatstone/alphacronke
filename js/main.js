/*
 main.js
 * */

window.addEventListener("load", function () {

    var alphaRange;
    var message;
    var storyWords;
    var storyPartSelect;
    var actionBar;
    var actionMenu;

    actionBar = new ActionBar();
    actionMenu = new ActionMenu();
    storyPartSelect = new StoryPartSelect();
    alphaRange = new AlphaRange();
    storyWords = new StoryWords();
    message = new Message();

    message.$closePanel.addEventListener('click', function(){
        console.log('close it!')
        message.$root.style.visibility = 'hidden';
    })

    actionBar.$showMenu.addEventListener('click', function(e){
        e.stopPropagation();
        actionMenu.$root.style.visibility = 'visible';
        return true;
    })

    actionMenu.$body.addEventListener('mousedown', function(){
        actionMenu.$root.style.visibility = 'hidden';
    })
    actionMenu.$root.addEventListener('mousedown', function(e){
        e.stopPropagation();
    })
    actionMenu.$showAbout.addEventListener('click', function(e){
        e.stopPropagation();
        console.log('about click')
        message.$root.style.visibility = 'visible';        
    })

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

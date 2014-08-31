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
    var selectStyle;

    actionBar = new ActionBar();
    actionMenu = new ActionMenu();
    storyPartSelect = new StoryPartSelect();
    alphaRange = new AlphaRange();
    storyWords = new StoryWords();
    message = new Message();
    selectStyle = new SelectStyle();

    selectStyle.$styleOpts.addEventListener('change', function (e) {

        storyWords.setStyle(this.value)
        if (this.value === 'bubble') {
            alphaRange.$root.style.visibility = 'hidden';
        }
        else if (this.value === 'alphaSelect') {
            alphaRange.$root.style.visibility = 'visible'
            alphaRange.move();
        }
    })

    message.$closePanel.addEventListener('click', function () {
        message.$root.style.visibility = 'hidden';
    })

   // actionBar 
    actionBar.$showMenu.addEventListener('mousedown', function(e){
        e.stopPropagation();
        if(!actionMenu.$root.style.visibility || actionMenu.$root.style.visibility === 'hidden'){
            actionMenu.$root.style.visibility = 'visible';            
        }
        else{
            actionMenu.$root.style.visibility = 'hidden';            
        }
        return true;
    })

    // actionMenu
    actionMenu.$body.addEventListener('mousedown', function(){
        if( actionMenu.$root.style.visibility === 'visible'){
            actionMenu.$root.style.visibility = 'hidden';            
        } 
    })
    actionMenu.$root.addEventListener('mousedown', function(e){
        e.stopPropagation();
    })
    actionMenu.$showAbout.addEventListener('click', function(e){
        e.stopPropagation();
        message.$root.style.visibility = 'visible';
        actionMenu.$root.style.visibility = 'hidden';                            
    })

    storyPartSelect.$storyPartsOpts.addEventListener('change', function (e) {
        storyWords.setSection(this.value);
//        alphaRange.setSelectedElements();
    })
    storyWords.fetchText(function () {
        storyWords.setSection('intro');
        alphaRange.setSelectedElements();
    });

    alphaRange.addSelectListener(
        function (filteredStr) {
            storyWords.highlightWords(filteredStr);
        });
});

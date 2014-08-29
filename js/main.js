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

    actionBar.$showMenu.addEventListener('click', function (e) {
        e.stopPropagation();
        actionMenu.$root.style.visibility = 'visible';
        return true;
    })

    actionMenu.$body.addEventListener('mousedown', function () {
        actionMenu.$root.style.visibility = 'hidden';
    })
    actionMenu.$root.addEventListener('mousedown', function (e) {
        e.stopPropagation();
    })
    actionMenu.$showAbout.addEventListener('click', function (e) {
        e.stopPropagation();
        message.$root.style.visibility = 'visible';
    })

    storyPartSelect.$storyPartsOpts.addEventListener('change', function (e) {
        storyWords.setSection(this.value);
        alphaRange.move();
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

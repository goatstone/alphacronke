/*
 main.js
 * */

window.addEventListener("load", function () {

    var alphaRange;
    var message;
    var storyPartSelect;
    var actionBar;
    var actionMenu;
    var selectStyle;
    var storyWords;

    actionBar = new ActionBar();
    actionMenu = new ActionMenu();
    storyPartSelect = new StoryPartSelect();
    alphaRange = new AlphaRange();
    storyWords = new StoryWords();
    message = new Message();
    selectStyle = new SelectStyle();

    // selectStyle
    selectStyle.$styleOpts.addEventListener('change', function (e) {

        storyWords.setStyle(this.value)
        if (this.value === 'bubble') {
            alphaRange.$root.style.visibility = 'hidden';
        }
        else if (this.value === 'alphaSelect') {
            alphaRange.$root.style.visibility = 'visible'
            alphaRange.setSelectedElements();
        }
    })

    // actionBar
    actionBar.$showMenu.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        if (!actionMenu.$root.style.visibility || actionMenu.$root.style.visibility === 'hidden') {
            actionMenu.$root.style.visibility = 'visible';
        }
        else {
            actionMenu.$root.style.visibility = 'hidden';
        }
        return true;
    })

    // actionMenu
    actionMenu.$body.addEventListener('mousedown', function () {
        if (actionMenu.$root.style.visibility === 'visible') {
            actionMenu.$root.style.visibility = 'hidden';
        }
    })
    actionMenu.$root.addEventListener('mousedown', function (e) {
        e.stopPropagation();
    })
    actionMenu.$a.addEventListener('click', function (e) {
        e.stopPropagation();
        selectStyle.$root.style.visibility = 'visible';
        actionMenu.$root.style.visibility = 'hidden';
    })
    actionMenu.$b.addEventListener('click', function (e) {
        e.stopPropagation();
        storyPartSelect.$root.style.visibility = 'visible';
        actionMenu.$root.style.visibility = 'hidden';
    })
    actionMenu.$c.addEventListener('click', function (e) {
        e.stopPropagation();
        alphaRange.$root.style.visibility = 'visible';
        actionMenu.$root.style.visibility = 'hidden';
    })
    actionMenu.$d.addEventListener('click', function (e) {
        e.stopPropagation();
        message.$root.style.visibility = 'visible';
        actionMenu.$root.style.visibility = 'hidden';
    })

    // storyPartSelect
    storyPartSelect.$storyPartsOpts.addEventListener('change', function (e) {
        storyWords.setSection(this.value);
        alphaRange.setSelectedElements();
    })
    storyWords.fetchText(function () {
        alphaRange.setSelectedElements();
    });

    ///svg-size : TODO part of generalControl
    document.querySelector('#svg-size').addEventListener("input", function (e) {
        storyWords.setSize(Number(this.value))
    })

    // alphaRange
    alphaRange.addSelectListener(
        function (filteredStr) {
            storyWords.highlightWords(filteredStr);
        });
});

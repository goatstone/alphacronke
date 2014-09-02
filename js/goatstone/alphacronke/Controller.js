/*
 goatstone.alphacronke.Controller

 * */

function Controller(){

    this.id = "Controller";
    this.model = new Model();

    // needs initModel to return
    this.storyWords;

    this.actionBar = new ActionBar();
    this.actionMenu = new ActionMenu();
    this.storyPartSelect = new StoryPartSelect();
    this.alphaRange = new AlphaRange();
    this.message = new Message();
    this.selectStyle = new SelectStyle();

    this.initModel();
    this.initActionBar();
    this.initControl();

}
// init the UI controls
Controller.prototype.initControl = function(){
    var $this = this;

    // selectStyle
    this.selectStyle.$styleOpts.addEventListener('change', function (e) {

        $this.storyWords.setStyle(this.value)
        if (this.value === 'bubble') {
            $this.alphaRange.$root.style.visibility = 'hidden';
        }
        else if (this.value === 'alphaSelect') {
            $this.alphaRange.$root.style.visibility = 'visible'
            $this.alphaRange.setSelectedElements();
        }
    })

    // storyPartSelect
    this.storyPartSelect.$storyPartsOpts.addEventListener('change', function (e) {
        $this.storyWords.setSection(this.value);
        $this.alphaRange.setSelectedElements();
    })

    ///svg-size : TODO part of generalControl
    document.querySelector('#svg-size').addEventListener("input", function (e) {
        $this.storyWords.setSize(Number(this.value))
    })

    // alphaRange
    this.alphaRange.addSelectListener(
        function (filteredStr) {
            $this.storyWords.highlightWords(filteredStr);
        });

};
// init the ActionBar and its ActionMenu
Controller.prototype.initActionBar = function(){

    var $this = this;

    // actionBar
    this.actionBar.$showMenu.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        if (!$this.actionMenu.$root.style.visibility || $this.actionMenu.$root.style.visibility === 'hidden') {
            $this.actionMenu.$root.style.visibility = 'visible';
        }
        else {
            $this.actionMenu.$root.style.visibility = 'hidden';
        }
        return true;
    })

    // actionMenu
    this.actionMenu.$body.addEventListener('mousedown', function () {
        if ($this.actionMenu.$root.style.visibility === 'visible') {
            $this.actionMenu.$root.style.visibility = 'hidden';
        }
    })
    this.actionMenu.$root.addEventListener('mousedown', function (e) {
        e.stopPropagation();
    })
    this.actionMenu.$a.addEventListener('click', function (e) {
        e.stopPropagation();
        $this.selectStyle.$root.style.visibility = 'visible';
        $this.actionMenu.$root.style.visibility = 'hidden';
    })
    this.actionMenu.$b.addEventListener('click', function (e) {
        e.stopPropagation();
        $this.storyPartSelect.$root.style.visibility = 'visible';
        $this.actionMenu.$root.style.visibility = 'hidden';
    })
    this.actionMenu.$c.addEventListener('click', function (e) {
        e.stopPropagation();
        $this.alphaRange.$root.style.visibility = 'visible';
        $this.actionMenu.$root.style.visibility = 'hidden';
    })
    this.actionMenu.$d.addEventListener('click', function (e) {
        e.stopPropagation();
        $this.message.$root.style.visibility = 'visible';
        $this.actionMenu.$root.style.visibility = 'hidden';
    })

};
// init the Model
Controller.prototype.initModel = function(){
    var $this = this;
    d3.text("/datum/dickory_cronke.txt", function (unparsedData) {

        var sections = [];
        var txtStart = 738;
        var textEnd = 59570;
        var storyText = unparsedData.substr(txtStart, textEnd);
         // remove \r characters
        storyText = storyText.replace(/\r/g, "");
        // chang all single \n into a single space
        storyText = storyText.replace(/([^\n])[\n]([^\n])/g, '$1 $2');

        sections = storyText.split(/[\n][\n]/g);
        $this.model.story.intro = sections.slice(0, 16);
        $this.model.story.partOne = sections.slice(17, 74);
        $this.model.story.partTwo = sections.slice(75, 129);
        $this.model.story.partThree = sections.slice(130, 172);

        sections = null;
        storyText = null;

        $this.storyWords = new StoryWords($this.model.story);

    });
}

window.addEventListener("load", function () {

    var c = new Controller();

});

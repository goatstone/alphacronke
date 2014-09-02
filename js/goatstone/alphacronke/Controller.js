/*
 goatstone.alphacronke.Controller

 * */

function Controller() {
    var $this = this;
    this.id = "Controller";

    this.model = new Model();
    this.styles = ['bubble', 'selectWord'];
    this.settings = {size: 700, style: this.styles[0], section: "intro", letterRange: "nop"}
    this.initModel();

    this.storyWords = new StoryWords( );
    this.storyPartSelect = new StoryPartSelect();
    this.alphaRange = new AlphaRange();
    this.message = new Message();
    this.selectStyle = new SelectStyle();

    var actionMenuModel = [
        {
            title: 'About AlphaCronke',
            action: function () {
                $this.message.$root.style.visibility = 'visible';
            }
        },
        {
            title: 'Select a Section',
            action: function () {
                $this.storyPartSelect.$root.style.visibility = 'visible';
            }
        },
        {
            title: 'Letter Select',
            action: function () {
                $this.alphaRange.$root.style.visibility = 'visible';
            }
        },
        {
            title: 'Select Style',
            action: function () {
                $this.selectStyle.$root.style.visibility = 'visible';
            }
        }
    ];
    this.actionBar = new ActionBar();
    this.actionMenu = new ActionMenu(actionMenuModel);
    this.initActionBar();

    // User events
    this.selectStyle.$styleOpts.addEventListener('change', function (e) {
        $this.settings.style = this.value;
    })
    this.storyPartSelect.$storyPartsOpts.addEventListener('change', function (e) {
        $this.settings.section = this.value;
    })
    this.storyPartSelect.$selectChartSizeButton.addEventListener('change', function (e) {
        $this.settings.size = Number(this.value);
    })
//    document.querySelector('#svg-size').addEventListener("input", function (e) {
//        $this.settings.size = Number(this.value);
//    })
    this.alphaRange.addSelectListener( function (filteredStr) {
        $this.settings.letterRange = filteredStr;
    });

    // Application Settings events
    var observer = new ObjectObserver(this.settings);
    observer.open(function (added, removed, changed, getOldValueFn) {
        Object.keys(changed).forEach(function (property) {
            var v = changed[property];
            switch (property) {
                case 'size':
                    $this.storyWords.setSize(v);
                    break;
                case 'style':
                    $this.storyWords.setStyle(v)
                    if (v === 'bubble') {
                        $this.alphaRange.$root.style.visibility = 'hidden';
                        $this.storyPartSelect.$selectChartSizeContainer.style.display = 'block';
                    }
                    else if (v === 'alphaSelect') {
                        $this.alphaRange.$root.style.visibility = 'visible'
                        $this.storyPartSelect.$selectChartSizeContainer.style.display = 'none';
                        $this.storyWords.highlightWords($this.alphaRange.selectedElements);
                     }
                    break;
                case 'section':
                    $this.storyWords.setSection($this.model.story[v]);
                    $this.storyWords.highlightWords($this.alphaRange.selectedElements);
                    break;
                case 'letterRange':
                    $this.storyWords.highlightWords(v);
                    break;
            }
        });
    });

}

// init the ActionBar and its ActionMenu
Controller.prototype.initActionBar = function () {
    var $this = this;

    // actionBar
    this.actionBar.$showMenu.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        if ($this.actionMenu.$root.style.visibility !== 'visible') {
            $this.actionMenu.$root.style.visibility = 'visible';
        }
        else {
            $this.actionMenu.$root.style.visibility = 'hidden';
        }
        return true;
    })


};
// init the Model
Controller.prototype.initModel = function () {
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

        $this.storyWords.setSection($this.model.story['intro']);
        $this.storyWords.setStyle('bubble');
        $this.storyPartSelect.$selectChartSizeContainer.style.visibility = 'visible';


    });
}

window.addEventListener("load", function () {

    var c = new Controller();

});

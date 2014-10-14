/*
 goatstone.alphacronke.Controller

 * */

function Controller() {

    var $this = this;

    this.model = new Model();
    this.initModel();

    var p = new Panel('#panel-a')

    var p2 = new Panel('#panel-b')

    this.storyWords = new StoryWords( );

    this.alphaRange = new AlphaRange('#dd');
    this.alphaRange.addSelectListener( function (filteredStr) {
        console.log(filteredStr)
        $this.storyWords.highlightWords(filteredStr);
    });

    var selectSize = new SelectSize('#select-chart-size');
    selectSize.setCallback(function(selection){
        console.log(selection)        
        $this.storyWords.setSize(Number(selection));
    })
    var storyPartSelect = new StoryPartSelect('#story-parts-opts');
    storyPartSelect.setCallback(function(selection){
        console.log(selection)        
        $this.storyWords.setSection($this.model.story[selection]);
        $this.storyWords.highlightWords($this.alphaRange.selectedElements);
    });

    var selectStyle = new SelectStyle('#panel-a #styles');
    selectStyle.setCallback(function(selection){
        console.log(selection)

        $this.storyWords.setStyle(selection)

        if (selection === 'bubble') {
            p2.hide();
            //storyPartSelect.$selectChartSizeContainer.style.display = 'block';
        }
        else if (selection === 'alphaSelect') {
            // $this.alphaRange.$root.style.visibility = 'visible'
            //storyPartSelect.$selectChartSizeContainer.style.display = 'none';
            // $this.storyWords.highlightWords($this.alphaRange.selectedElements);
        }
    })
    
    
    var messagePanel =  new MessagePanel('#message-panel'); // settings {x:1, y:2, w:200, h:200}
    messagePanel.panel.position(window.innerWidth - 450, window.innerHeight -200 );
    var message = new Message("#message");

    message.set( 
        '<h3>' + this.model.about.title + '</h3>' +
          '<p>'+ this.model.about.description+ '</p>' +  
          '<address class="author">' + this.model.about.author+'</address>'+  
          '<a href="/about/" target="new">more...</a>'  
        )
 

    this.actionBar = new ActionBar();
    this.actionMenu = new ActionMenu([
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
    ]);
    this.initActionBar();

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
        // $this.storyPartSelect.$selectChartSizeContainer.style.visibility = 'visible';

    });
}

window.addEventListener("load", function () {

    var c = new Controller();

});

    // User events
    // this.selectStyle.$styleOpts.addEventListener('change', function (e) {
    //     $this.storyWords.setStyle(this.value)
    //     if (this.value === 'bubble') {
    //         $this.alphaRange.$root.style.visibility = 'hidden';
    //         $this.storyPartSelect.$selectChartSizeContainer.style.display = 'block';
    //     }
    //     else if (this.value === 'alphaSelect') {
    //         $this.alphaRange.$root.style.visibility = 'visible'
    //         $this.storyPartSelect.$selectChartSizeContainer.style.display = 'none';
    //         $this.storyWords.highlightWords($this.alphaRange.selectedElements);
    //     }
    //  })
    // this.storyPartSelect.$storyPartsOpts.addEventListener('change', function (e) {
    //     $this.storyWords.setSection($this.model.story[this.value]);
    //     $this.storyWords.highlightWords($this.alphaRange.selectedElements);
    // })
    // this.storyPartSelect.$selectChartSizeButton.addEventListener('change', function (e) {
    //     $this.storyWords.setSize(Number(this.value));
    // })
    // this.alphaRange.addSelectListener( function (filteredStr) {
    //     $this.storyWords.highlightWords(filteredStr);
    // });

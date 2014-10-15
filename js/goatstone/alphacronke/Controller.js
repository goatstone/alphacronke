/*
 goatstone.alphacronke.Controller

 * */

function Controller() {

    // panels
    var alphaRangePanel, mainPanel, messagePanel;
    // components
    var alphaRange, selectSize, storyPartSelect, selectStyle, message;
    var $this = this;

    // model
    this.model = new Model();
    this.initModel();

    // storyWords
    this.storyWords = new StoryWords( );

    // alphaRange
    alphaRangePanel = new Panel('#panel-alpharange');
    alphaRange = new AlphaRange('#dd');
    alphaRange.addSelectListener( function (filteredStr) {
        $this.storyWords.highlightWords(filteredStr);
    });

    // main selection components
    mainPanel = new Panel('#panel-a');
    selectSize = new SelectSize('#select-chart-size');
    selectSize.setCallback(function(selection){
        $this.storyWords.setSize(Number(selection));
    });
    storyPartSelect = new StoryPartSelect('#story-parts-opts');
    storyPartSelect.setCallback(function(selection){
        $this.storyWords.setSection($this.model.story[selection]);
        $this.storyWords.highlightWords(alphaRange.selectedElements);
    });
    selectStyle = new SelectStyle('#panel-a #styles');
    selectStyle.setCallback(function(selection){

        $this.storyWords.setStyle(selection);

        if (selection === 'bubble') {
            alphaRange.hide();
            selectSize.show();
            alphaRangePanel.hide();
        }
        else if (selection === 'alphaSelect') {
            alphaRangePanel.show();
            alphaRange.show();
            selectSize.hide();
            $this.storyWords.highlightWords(alphaRange.selectedElements);
        }
    });
    
    // message    
    messagePanel =  new MessagePanel('#message-panel'); // settings {x:1, y:2, w:200, h:200}
    messagePanel.position(window.innerWidth - 450, window.innerHeight -200 );
    message = new Message("#message");
    message.set( 
        '<h3>' + this.model.about.title + '</h3>' +
        '<p>'+ this.model.about.description+ '</p>' +  
        '<address class="author">' + this.model.about.author+'</address>'+  
        '<a href="/about/" target="new">more...</a>'  
    );
 
    // actionBar actionMenu
    this.actionBar = new ActionBar([
        {
            title: 'About AlphaCronke',
            action: function () {
                message.show();
                messagePanel.show();
            }
        },
        {
            title: 'Letter Select',
            action: function () {
                alphaRange.show();
                alphaRangePanel.show();
            }
        },
        {
            title: 'Main Panel',
            action: function () {
                mainPanel.show();
            }
        }
    ]);
 
}

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
};

window.addEventListener("load", function () {

    var c = new Controller();

});
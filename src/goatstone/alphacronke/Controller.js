/*
 goatstone.alphacronke.Controller

 * */

function Controller() {

    // panels
    var alphaRangePanel, mainPanel, messagePanel;
    // components
    var   selectSize, storyPartSelect, selectStyle, message;
    var $this = this;

    // model
    this.model = new Model();
    this.initModel();

    // storyWords
    this.storyWords = new StoryWords( );

    // alphaRange

    this.alphaRange = new AlphaRange('#dd');
    this.alphaRange.addSelectListener( function (filteredStr) {
        $this.storyWords.highlightWords(filteredStr);
    });


    alphaRangePanel = new Panel('#panel-alpharange');
    alphaRangePanel.position(100,200);

    // main selection components
    // mainPanel = new Panel('#panel-a', { 
    //     handleBg:function(){
    //         var message = 'hello';
    //         var node = document.createElement('DIV');
    //         var txt = document.createTextNode(message);
    //         node.appendChild(txt);
    //         return node;
    //     },
    //     closeIcon:function(){
    //         var message = 'X';
    //         var node = document.createElement('DIV');
    //         var txt = document.createTextNode(message);
    //         node.appendChild(txt);
    //         return node;
    //     }
    // });
    mainPanel = new Panel('#panel-a' );

    selectSize = new SelectSize('#select-chart-size');
    selectSize.setCallback(function(selection){
        $this.storyWords.setSize(Number(selection));
    });
    storyPartSelect = new StoryPartSelect('#story-parts-opts');
    storyPartSelect.setCallback(function(selection){
        $this.storyWords.setSection($this.model.story[selection]);
        $this.storyWords.highlightWords($this.alphaRange.selectedElements);
    });
    selectStyle = new SelectStyle('#panel-a #styles');
    selectStyle.setCallback(function(selection){

        $this.storyWords.setStyle(selection);

        if (selection === 'bubble') {
            $this.alphaRange.hide();
            selectSize.show();
            alphaRangePanel.hide();
        }
        else if (selection === 'alphaSelect') {
            alphaRangePanel.show();
            $this.alphaRange.show();
            selectSize.hide();
            $this.storyWords.highlightWords($this.alphaRange.selectedElements);
        }
    });
    
    // message    
    message = new Message("#message");
    message.set( 
        '<h3>' + this.model.about.title + '</h3>' +
        '<p>'+ this.model.about.description+ '</p>' +  
        '<address class="author">' + this.model.about.author+'</address>'+  
        '<a href="/about/" target="new">more...</a>'  
    );
    messagePanel =  new Panel('#message-panel'); //  settings {x:1, y:2, w:200, h:200}
    messagePanel.position(window.innerWidth - 400, window.innerHeight -200 );
 
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
                $this.alphaRange.show();
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

        $this.storyWords.setSection($this.model.story.intro);
        // $this.storyWords.setStyle('bubble');
        $this.storyWords.highlightWords($this.alphaRange.selectedElements);

    });
};

window.addEventListener("load", function () {

    var c = new Controller();

});
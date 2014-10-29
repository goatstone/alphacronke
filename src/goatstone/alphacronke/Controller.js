/*
 goatstone.alphacronke.Controller

 * */

function  bubbleMode  ( msg, data ){
    console.log( 'bubbleMode...',msg, data );
    console.log( this );
    console.log( this.alphaRange );
    console.log( msg, data );
}

function wordSelectMode( msg, data ){
    console.log( 'wordSelectMode...',msg, data );
    console.log( msg, data );
}

////PubSub.publish( 'mode', {mode:'bubble'} );
//PubSub.publish( 'bubbleMode', {state:'on'});
//PubSub.publish( 'wordSelectMode', {state:'on'});

function Controller() {

    //PubSub.subscribe( 'bubbleMode',  bubbleMode.bind(this.prototype) );
    //PubSub.publish( 'bubbleMode', {state:'on'});
    //this.cb();

    // model
    var model = new Model();

    // panels
    var alphaRangePanel, mainPanel, messagePanel;

    // components
    var storyWords, alphaRange, selectSize, storyPartSelect, selectStyle, message;

    storyWords = new StoryWords();

    alphaRange = new AlphaRange('#dd');
    alphaRange.addSelectListener(function (filteredStr) {
        storyWords.highlightWords(filteredStr);
    });
    alphaRangePanel = new Panel('#panel-alpharange');
    alphaRangePanel.position(100, 200);

    // get a book file from the Gutenberg Library #2051
    new ProjectGutenberg().get('datum/dickory_cronke.txt')
        .then(function (data) {
            var sections = [];
            var txtStart = 738;
            var textEnd = 59570;
            var storyText = data.substr(txtStart, textEnd);
            // remove \r characters
            storyText = storyText.replace(/\r/g, "");
            // chang all single \n into a single space
            storyText = storyText.replace(/([^\n])[\n]([^\n])/g, '$1 $2');

            sections = storyText.split(/[\n][\n]/g);
            model.story.intro = sections.slice(0, 16);
            model.story.partOne = sections.slice(17, 74);
            model.story.partTwo = sections.slice(75, 129);
            model.story.partThree = sections.slice(130, 172);

            sections = null;
            storyText = null;

            storyWords.setSection(model.story.intro);
            // storyWords.setStyle('bubble');
            storyWords.highlightWords(alphaRange.selectedElements);

        }, function (err) {
        });

    mainPanel = new Panel('#panel-a');

    selectSize = new SelectSize('#select-chart-size');
    selectSize.setCallback(function (selection) {
        storyWords.setSize(Number(selection));
    });

    storyPartSelect = new StoryPartSelect('#story-parts-opts');
    storyPartSelect.setCallback(function (selection) {
        storyWords.setSection(model.story[selection]);
        storyWords.highlightWords(alphaRange.selectedElements);
    });

    selectStyle = new SelectStyle('#panel-a #styles');
    selectStyle.setCallback(function (selection) {
        storyWords.setStyle(selection);
        if (selection === 'bubble') {
            alphaRange.hide();
            selectSize.show();
            alphaRangePanel.hide();
        }
        else if (selection === 'alphaSelect') {
            alphaRangePanel.show();
            alphaRange.show();
            selectSize.hide();
            storyWords.highlightWords(alphaRange.selectedElements);
        }
    });

    message = new Message("#message");
    message.set(
            '<h3>' + model.about.title + '</h3>' +
            '<p>' + model.about.description + '</p>' +
            '<address class="author">' + model.about.author + '</address>' +
            '<a href="/about/" target="new">more...</a>'
    );
    messagePanel = new Panel('#message-panel');
    messagePanel.position(window.innerWidth - 400, window.innerHeight - 200);

    new ActionBar([
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
Controller.prototype.cb = function(){
    console.log('cb');
    console.log(this);
};
window.addEventListener("load", function () {

    new Controller();
});
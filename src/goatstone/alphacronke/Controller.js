/*
 goatstone.alphacronke.Controller

 * */

function Controller() {

    // model
    var model = new Model();
    // panels
    var alphaRangePanel, mainPanel, messagePanel;
    // components
    var storyWords, alphaRange, selectSize, storyPartSelect, selectStyle, message;

    alphaRange = new AlphaRange('#dd');
    alphaRangePanel = new Panel('#panel-alpharange', {x: 10, y: window.innerHeight - 140});
    alphaRangePanel.subscribe([{
        topic: 'mode',
        callback: function (topic, data) {
            if (data.value === 'alphaSelect') {
                alphaRangePanel.show();
            }
            else {
                alphaRangePanel.hide();
            }
        }
    }]);

    // storyWords
    storyWords = new StoryWords(model);
    storyWords.subscribe('size');
    storyWords.subscribe('mode');
    storyWords.subscribe('section');
    storyWords.subscribe('alphaRange');
    PubSub.publish('alphaRange', {value: alphaRange.selectedElements});

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
            PubSub.publish('section', {value: 'intro'});
        }, function (err) {
        });

    mainPanel = new Panel('#panel-a');
    mainPanel.subscribe([{
        topic: 'mainPanel',
        callback: function (topic, data) {
            if (data.value === 'show') {
                mainPanel.show();
            }
            else if (data.value === 'hide') {
                mainPanel.hide();
            }
        }
    }]);

    selectSize = new SelectSize('#select-chart-size');
    selectSize.subscribe('mode');

    new StoryPartSelect('#story-parts-opts');

    new SelectStyle('#panel-a #styles');

    message = new Message("#message");
    message.subscribe('size');
    message.subscribe('mode');
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
                message.show();   // TODO make this PubSub.publish('message' {value:'show'})
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
                PubSub.publish('mainPanel', {value: 'show'});
            }
        }
    ]);
}
window.addEventListener("load", function () {

    new Controller();
});

function SelectLetter() {
}
SelectLetter.prototype.subscribe = function (topic) {
    PubSub.subscribe('section', function (topic, data) {
        //console.log('section  :::: ');
        //console.log(topic, data);
    });
};
var sl = new SelectLetter();
sl.subscribe('size');

/*
 goatstone.alphacronke.Controller

 * */

function Controller() {

    // model
    var model = new Model();
    // panels
    var alphaRangePanel, mainPanel, messagePanel;
    // components
    var storyWords, alphaRange, selectSize, storyPartSelect, selectStyle, message, lineText;

    // alphaRange
    alphaRange = new AlphaRange('#alpha-range');
    alphaRangePanel = new Panel('#panel-alpharange', {x: 100, y: window.innerHeight - 140});
    alphaRangePanel.subscribe([
        {
            topic: 'alphaRangePanel',
            callback: function (topic, data) {
                if (data.value === 'show') {
                    alphaRangePanel.show();
                }
            }
        },
        {
            topic: 'mode',
            callback: function (topic, data) {
                if (data.value === 'alphaSelect') {
                    alphaRangePanel.show();
                }
                else {
                    alphaRangePanel.hide();
                }
            }
        }
    ]);

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
            PubSub.publish('alphaRange', {value: alphaRange.getRange()});
            PubSub.publish('mode', {value: 'bubble'}); // alphaSelect bubble
            PubSub.publish('mainPanel', {value: 'show'}); // alphaSelect bubble
            PubSub.publish('messagePanel', {value: 'show'});
        }, function (err) {
        });

    // bubbleText
    var bubbleText = new BubbleText('#bubble-text');
    bubbleText.subscribe([
        {
            topic: 'mode',
            callback: function (topic, data) {
                if (data.value === 'bubble') {
                    bubbleText.show();
                }
                else {
                    bubbleText.hide();
                }
            }
        },
        {
            topic: "section",
            callback: function (topic, data) {
                bubbleText.setData(model.story[data.value]);   // set the data, triggers redraw
            }
        },
        {
            topic: "size",
            callback: function (topic, data) {
                bubbleText.setSize(data.value);
            }
        }
    ]);

    // lineText
    lineText = new LineText("#line-text");
    lineText.subscribe([
        {
            topic: "section",
            callback: function (topic, data) {
                lineText.draw(model.story[data.value]); // draw, provide data as agrument
            }
        },
        {
            topic: "alphaRange",
            callback: function (topic, data) {
                lineText.setAlphaRange(data.value);
            }
        },
        {
            topic: 'mode',
            callback: function (topic, data) {
                if (data.value === 'alphaSelect') {
                    lineText.show();
                }
                else {
                    lineText.hide();
                }
            }
        }
    ]);

    // mainPanel
    mainPanel = new Panel('#panel-a', {x: 300, y: 30});
    mainPanel.subscribe([
        {
            topic: 'mainPanel',
            callback: function (topic, data) {
                if (data.value === 'show') {
                    mainPanel.show();
                }
                else if (data.value === 'hide') {
                    mainPanel.hide();
                }
            }
        }
    ]);

    // selectSize
    selectSize = new SelectSize('#select-chart-size');
    selectSize.subscribe([
        {
            topic: "mode",
            callback: function (topic, data) {
                if (data.value === 'bubble') {
                    selectSize.show();
                }
                else if (data.value === 'alphaSelect') {
                    selectSize.hide();
                }
            }
        }
    ]);

    // StoryPartSelect
    new StoryPartSelect('#story-parts-opts');

    // selectStyle
    selectStyle = new SelectStyle('#panel-a #styles');
    selectStyle.subscribe([
        {
            topic: 'mode',
            callback: function (topic, data) {
                selectStyle.selectValue(data.value);
            }
        }
    ]);

    // message, messagePanel
    message = new Message("#message");
    message.subscribe([
        {
            topic: "size",
            callback: function (topic, data) {
                message.appendStatus('size: ' + data.value);
            }
        },
        {
            topic: "mode",
            callback: function (topic, data) {
                message.appendStatus('mode: ' + data.value);
            }
        }
    ]);
    message.set(
            '<h3>' + model.about.title + '</h3>' +
            '<p>' + model.about.description + '</p>' +
            '<address class="author">' + model.about.author + '</address>' +
            '<a href="/about/" target="new">more...</a>'
    );
    messagePanel = new Panel('#message-panel', {x: window.innerWidth - 400, y: 70});
    messagePanel.subscribe([
        {
            topic: "messagePanel",
            callback: function (topic, data) {
                if (data.value === 'show') {
                    messagePanel.show();
                }
                else if (data.value === 'hide') {
                    messagePanel.hide();
                }
            }
        }
    ]);

    // ActionBar
    new ActionBar([
        {
            title: 'About AlphaCronke',
            action: function () {
                PubSub.publish('messagePanel', {value: 'show'});
            }
        },
        {
            title: 'Letter Select',
            action: function () {
                PubSub.publish('alphaRangePanel', {value: 'show'});
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

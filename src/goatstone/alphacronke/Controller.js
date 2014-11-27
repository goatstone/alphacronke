/*
 goatstone.alphacronke.Controller

 * */

define([
        'Model', 'AlphaRange', "Panel", 'ProjectGutenberg', 'Text',
        'PubSub', 'BubbleText', 'LineText', 'SelectSize', 'SelectSection',
        'SelectMode', 'Message', 'ActionBar', "Menu"],
    function (Model, AlphaRange, Panel, ProjectGutenberg, Text, PubSub, BubbleText, LineText, SelectSize, SelectSection, SelectMode, Message, ActionBar, Menu) {

        function Controller() {
            // model
            var model = new Model();
            // panels
            var alphaRangePanel, mainPanel, messagePanel;
            // components
            var alphaRange, selectSize, storyPartSelect, selectMode, message, lineText;
            // alphaRange
            alphaRange = new AlphaRange('#alpha-range');
            alphaRangePanel = new Panel('#panel-alpharange', {x: 100, y: window.innerHeight - 140});
            alphaRangePanel.subscribe([
                [   'alphaRangePanel',
                    function (data) {
                        if (data.value === 'show') {
                            alphaRangePanel.show();
                        }
                    }],
                [   'mode',
                    function (data) {
                        if (data.value === 'alphaSelect') {
                            alphaRangePanel.show();
                        }
                        else {
                            alphaRangePanel.hide();
                        }
                    }
                ]
            ]);
            // get a book file from the Gutenberg Library #2051
            new ProjectGutenberg().get('datum/dickory_cronke.txt')
                .then(function (textDocument) {

                    return new Text()
                        .processStory(textDocument)
                        .then(function (story) {
                            model.story = story;
                        });

                }, function (err) {
                    throw "Getting text document failure." + err;
                })
                .then(function () {
                    PubSub.publish('section', {value: 'intro'});
                    PubSub.publish('alphaRange', {value: alphaRange.getRange()});
                    PubSub.publish('mode', {value: 'alphaSelect'}); // alphaSelect bubble
                    PubSub.publish('mainPanel', {value: 'show'}); // alphaSelect bubble
                    PubSub.publish('messagePanel', {value: 'show'});
                }, function () {
                    throw "Getting text document failure.";
                });
            // bubbleText
            var bubbleText = new BubbleText('#bubble-text');
            bubbleText.subscribe([
                [   'mode',
                    function (data) {
                        if (data.value === 'bubble') {
                            bubbleText.show();
                        }
                        else {
                            bubbleText.hide();
                        }
                    }],
                [   "section",
                    function (data) {
                        bubbleText.setData(model.story[data.value]);   // set the data, triggers redraw
                    }
                ],
                [  "size",
                    function (data) {
                        bubbleText.setSize(data.value);
                    }
                ]
            ]);
            // lineText
            lineText = new LineText("#line-text");
            lineText.subscribe([
                [   "section",
                    function (data) {
                        lineText.draw(model.story[data.value]); // draw, provide data as agrument
                    }
                ],
                [   "alphaRange",
                    function (data) {
                        lineText.setAlphaRange(data.value);
                    }
                ],
                [   'mode',
                    function (data) {
                        if (data.value === 'alphaSelect') {
                            lineText.show();
                        }
                        else {
                            lineText.hide();
                        }
                    }
                ]
            ]);
            // mainPanel
            mainPanel = new Panel('#panel-a', {x: 10, y: 120});
            mainPanel.subscribe([
                [   'mainPanel',
                    function (data) {
                        if (data.value === 'show') {
                            mainPanel.show();
                        }
                        else if (data.value === 'hide') {
                            mainPanel.hide();
                        }
                    }
                ]
            ]);
            // selectSize
            selectSize = new SelectSize('.select-size');
            selectSize.subscribe([
                [   "mode",
                    function (data) {
                        if (data.value === 'bubble') {
                            selectSize.show();
                        }
                        else if (data.value === 'alphaSelect') {
                            selectSize.hide();
                        }
                    }
                ]
            ]);
            // SelectSection
            new SelectSection('.select-section');
            // selectMode
            selectMode = new SelectMode('.select-mode');
            selectMode.subscribe([
                [   'mode',
                    function (data) {
                        selectMode.selectValue(data.value);
                    }
                ]
            ]);
            // message, messagePanel
            message = new Message("#message");
            message.set(
                    '<h3>' + model.about.title + '</h3>' +
                    '<p>' + model.about.description + '</p>' +
                    '<address class="author">' + model.about.author + '</address>' +
                    '<a href="/about/" target="new">more...</a>'
            );
            messagePanel = new Panel('#message-panel', {x: window.innerWidth - 330, y: 70});
            messagePanel.subscribe([
                [   "messagePanel",
                    function (data) {
                        if (data.value === 'show') {
                            messagePanel.show();
                        }
                        else if (data.value === 'hide') {
                            messagePanel.hide();
                        }
                    }
                ]
            ]);
            // ActionBar
            new ActionBar('.action-menu-button');
            // menu
            var menu = new Menu('.action-menu', [
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
            menu.hide();
            menu.subscribe([
                [   "actionMenu",
                    function (data) {
                        menu.toggle();
                    }
                ]
            ]);
        }

        return Controller;
    });

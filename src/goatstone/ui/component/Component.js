/*
 goatstone.ui.component.Component.js
 require PubSub
 */

var Component = klass({
    $root: null,
    initialize: function (rootDiv) {
        if (!rootDiv) throw "Root Element must be provided.";
        this.$root = document.querySelector(rootDiv);
    },
    show: function () {
        this.$root.style.visibility = 'visible';
        for (var i = 0; i < this.$root.children.length; i++) {
            this.$root.children[i].style.visibility = 'visible';
        }
    },
    hide: function () {
        this.$root.style.visibility = 'hidden';
        for (var i = 0; i < this.$root.children.length; i++) {
            this.$root.children[i].style.visibility = 'hidden';
        }
    },
    /* subscribe expects and object in this form:
     [{
     topic: 'mode',
     callback: function (topic, data) {
     console.log('A topic message has been sent');
     }
     }];
     */
    subscribe: function (topics) {
        if (!(topics instanceof Array)) {
            throw 'Topics must be an array.';
        }
        topics.forEach(
            function (e) {
                PubSub.subscribe(e.topic, function (topic, data) {
                    e.callback(topic, data);
                });
            }
        );
    }
});

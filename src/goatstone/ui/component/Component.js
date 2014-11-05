/*
 goatstone.ui.component.Component.js
    require PubSub
 */

var Component = klass({
    $root: null,
    initialize: function (rootDiv) {
        this.$root = document.querySelector(rootDiv);
    },
    show: function () {
        this.$root.style.visibility = 'visible';
    },
    hide: function () {
        this.$root.style.visibility = 'hidden';
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

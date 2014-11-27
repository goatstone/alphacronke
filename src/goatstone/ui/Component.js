/*
 goatstone.ui.component.Component.js
 require PubSub
 */

define(['klass', 'PubSub'], function (klass, PubSub) {

    var Component = klass({
        $root: null,
        initialize: function (rootDiv) {
            if (!rootDiv) throw "Root Element must be provided.";
            this.$root = document.querySelector(rootDiv);
        },
        show: function () {
            this.$root.style.visibility = 'visible';
            this.$root.style.display = 'block';
            for (var i = 0; i < this.$root.children.length; i++) {
                this.$root.children[i].style.visibility = 'visible';
            }
        },
        hide: function () {
            this.$root.style.display = 'none';
            this.$root.style.visibility = 'hidden';
        },
        toggle: function () {
            if (this.$root.style.visibility == 'hidden') {
                this.show();
            }
            else{
                this.hide();
            }
        },
        position: function (x, y) {
            this.$root.style.left = x + 'px';
            this.$root.style.top = y + 'px';
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
                    if( !e[0] || !e[1] ) throw 'Error : Subscribe arguments not correct';
                    PubSub.subscribe(e[0], function (topic, data) {
                        e[1](data);
                    });
                }
            );
        }
    });

    return Component;
});



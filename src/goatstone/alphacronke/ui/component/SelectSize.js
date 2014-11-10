/*
 goatstone.alphacronke.ui.component.SelectSize

* */

define(["Component", 'PubSub'], function (Component, PubSub) {

    var SelectSize = Component.extend({
        initialize: function (rootDiv) {
            this.supr(rootDiv);
            this.$root.querySelector('input').addEventListener('change', function (e) {
                PubSub.publish('size', {value: e.target.value});
            });
        }
    });

    return SelectSize;
});



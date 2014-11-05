/*
 goatstone.alphacronke.ui.component.SelectStyle

require : PubSub
 */

var SelectSize = Component.extend({
    initialize: function (rootDiv) {
        this.supr(rootDiv);
        this.$root.querySelector('input').addEventListener('change', function (e) {
            PubSub.publish('size', {value: e.target.value});
        });

    }
});

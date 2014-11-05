/*
 goatstone.alphacronke.ui.component.SelectStyle

 require: SubPub
 */

var SelectStyle = Component.extend({
    initialize: function (rootDiv) {
        this.supr(rootDiv);
        this.$root.addEventListener('change', function (e) {
            PubSub.publish('mode', {value: this.value});
        });
    },
    selectValue: function (value) {
        this.$root.value = value;
    }
});

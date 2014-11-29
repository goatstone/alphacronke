/*
 goatstone.alphacronke.ui.component.SelectSize

 * */

define(["Component"], function (Component, PubSub) {

    var SelectSize = Component.extend({
        initialize: function (rootDiv, setting) {
            this.supr(rootDiv);
            var self = this;
            var s = setting || {};
            var selectSectionLabel = s.label || "";
            var l = this.$root.querySelector('label div');
            var lTxt = document.createTextNode(selectSectionLabel);
            l.appendChild(lTxt);
            this.$root.querySelector('input').addEventListener('change', function (e) {
                self.publish('size', {value: e.target.value});
            });
        }
    });

    return SelectSize;
});



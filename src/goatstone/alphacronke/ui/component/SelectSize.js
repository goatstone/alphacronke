/*
 goatstone.alphacronke.ui.component.SelectSize

* */

define(["Component", 'PubSub'], function (Component, PubSub) {

    var SelectSize = Component.extend({
        initialize: function (rootDiv) {
            this.supr(rootDiv);

            var selectSectionLabel = "Select a size ";
            var l = this.$root.querySelector('label div');
            var lTxt = document.createTextNode(selectSectionLabel);
            l.appendChild(lTxt );

            this.$root.querySelector('input').addEventListener('change', function (e) {
                PubSub.publish('size', {value: e.target.value});
            });
        }
    });

    return SelectSize;
});



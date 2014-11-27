/*      goatstone.alphacronke.ui.component.SelectStyle
 */
define(["Component", 'PubSub'], function (Component, PubSub) {

    var SelectStyle = Component.extend({
        initialize: function (rootDiv) {
            this.supr(rootDiv);

            var selectSectionLabel = "Select a mode ";
            var sections = [
                {value: 'bubble', label: "Bubble"},
                {value: 'alphaSelect', label: "Word Select"}
            ];
            var selection = this.$root.querySelector('select');
            var l = this.$root.querySelector('label div');
            var lTxt = document.createTextNode(selectSectionLabel);
            l.appendChild(lTxt);
            sections.forEach(function (e, i) {
                var o = document.createElement('option');
                o.value = e.value;
                var txt = document.createTextNode(e.label);
                o.appendChild(txt);
                selection.appendChild(o);
            });
            selection.selectedIndex = 1;
            selection.addEventListener('change', function (e) {
                PubSub.publish('mode', {value: this.value});
            });
        },
        selectValue: function (value) {
            this.$root.value = value;
        }
    });

    return SelectStyle;
});
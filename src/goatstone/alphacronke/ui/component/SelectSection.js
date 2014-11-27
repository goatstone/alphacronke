/*
 goatstone.alphacronke.ui.component.StoryPartSelect

 * */

define(["Component", 'PubSub'], function (Component, PubSub) {

    var SelectSection = Component.extend({

        initialize: function (rootDiv) {
            this.supr(rootDiv);

            // Model.sections , .storySections keyVal label startIndex endIndex
            var selectSectionLabel = "Select a section ";
            var sections = [
                {value: 'intro', label: "Intro and Preface"},
                {value: 'partOne', label: "Part I"},
                {value: 'partTwo', label: "Part II"},
                {value: 'partThree', label: "Part III"}
            ];
            var selection = this.$root.querySelector('select');
            var l = this.$root.querySelector('label div');
            var lTxt = document.createTextNode(selectSectionLabel);
            l.appendChild(lTxt );

            sections.forEach(function(e, i){
                var o = document.createElement('option');
                o.value = e.value;
                var txt = document.createTextNode(e.label);
                o.appendChild(txt);
                selection.appendChild(o);
            });

            selection.addEventListener('change', function (e) {
                PubSub.publish('section', {value: this.value});
            });
        }
    });

    return SelectSection;
});
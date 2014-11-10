/*
 goatstone.alphacronke.ui.component.StoryPartSelect

* */

define(["Component", 'PubSub'], function (Component, PubSub) {

    var StoryPartSelect = Component.extend({
        initialize: function (rootDiv) {
            this.supr(rootDiv);
            this.$root.addEventListener('change', function (e) {
                PubSub.publish('section', {value: this.value});
            });
        }
    });

    return StoryPartSelect;
});


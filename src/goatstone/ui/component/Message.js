/*
 goatstone.ui.component.Message
 extends Component

 */

define(["Component"], function(Component){

    var Message = Component.extend({
        set: function (msg) {
            this.$root.innerHTML = msg;
        }
    });

    return Message;
});

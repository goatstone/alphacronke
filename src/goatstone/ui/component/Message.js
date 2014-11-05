/*
 goatstone.ui.component.Message
 extends Component

 */

var Message = Component.extend({
    set: function (msg) {
        this.$root.innerHTML = msg;
    }
});

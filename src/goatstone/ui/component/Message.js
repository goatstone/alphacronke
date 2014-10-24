/*
 goatstone.ui.component.Message
 extends Component

 */

function Message(rootDiv) {

	this.setRoot(rootDiv);

}

Message.prototype = Object.create(Component.prototype);

Message.prototype.set = function(msg){
    this.$root.innerHTML = msg;
};


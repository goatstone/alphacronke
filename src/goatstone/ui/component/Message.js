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
Message.prototype.setStatus = function(msg){
    this.$root.innerHTML = msg;
};
Message.prototype.appendStatus = function(msg){
    var txt = document.createTextNode(msg + ' : '  );
    var div = document.createElement('DIV');
    div.appendChild(txt);
    this.$root.appendChild(div);
};
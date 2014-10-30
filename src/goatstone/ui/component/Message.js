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
    // this.$root.querySelector('#status').innerHTML = msg;
    this.$root.innerHTML = msg;
};
Message.prototype.subscribe = function(topic){
	// console.log('Message : subscribe');
	// console.log(topic);
	var self = this;
	var topics = {};
	topics.size = function(topic, data){
		// console.log('size...');
		// console.log(data);
	   self.appendStatus('size: ' + data.value);
	};
	topics.mode = function(topic, data){
		// console.log('mode...');
		// console.log(data);
	   self.appendStatus('mode: ' + data.value);
	};

   PubSub.subscribe(topic, topics[topic]);    
};
Message.prototype.appendStatus = function(msg){
    var txt = document.createTextNode(msg + ' : '  );
    var div = document.createElement('DIV');
    div.appendChild(txt);
    this.$root.appendChild(div);
};
/*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectSize(rootDiv) {

	var $root = this.setRoot(rootDiv);

    var $this = this;
    $root.querySelector('input').addEventListener('change', function (e) {
	   $this.select(e.target.value);
     });
}

SelectSize.prototype = Object.create(Component.prototype);

SelectSize.prototype.subscribe = function(topic){
	var self = this;
    PubSub.subscribe('mode', function(topic, data){
        if(data.value  === 'bubble'){
        	self.show();
        }
        else if(data.value  === 'alphaSelect'){
			self.hide();        	
        }

    });    

};

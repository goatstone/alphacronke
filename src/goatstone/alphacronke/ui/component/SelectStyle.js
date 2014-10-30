/*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectStyle(rootDiv) {

	var $root = this.setRoot(rootDiv);

    var $this = this;
    $root.addEventListener('change', function (e) {

	   $this.select(this.value);

  		PubSub.publish('mode', {value:this.value});
     
     });

}

SelectStyle.prototype = Object.create(Component.prototype);
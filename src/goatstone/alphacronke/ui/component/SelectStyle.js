/*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectStyle(rootDiv) {

	var $root = this.setRoot(rootDiv);

    var $this = this;
    $root.addEventListener('change', function (e) {

  		PubSub.publish('mode', {value:this.value});
     });
}

SelectStyle.prototype = Object.create(Component.prototype);
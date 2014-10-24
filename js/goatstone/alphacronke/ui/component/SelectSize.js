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
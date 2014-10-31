/*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectSize(rootDiv) {

    var $root = this.setRoot(rootDiv);
    $root.querySelector('input').addEventListener('change', function (e) {
        PubSub.publish('size', {value: e.target.value});
    });
}
SelectSize.prototype = Object.create(Component.prototype);


/*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectStyle(rootDiv) {

    this.$root = this.setRoot(rootDiv);
    this.$root.addEventListener('change', function (e) {
        PubSub.publish('mode', {value: this.value});
    });
}
SelectStyle.prototype = Object.create(Component.prototype);
SelectStyle.prototype.selectValue = function(value){

    this.$root.value = value ;
};

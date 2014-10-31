/*
 goatstone.alphacronke.ui.component.StoryPartSelect

 */

function StoryPartSelect(rootDiv) {

    var $root = this.setRoot(rootDiv);
    $root.addEventListener('change', function (e) {
        PubSub.publish('section', {value:this.value});
    });
}
StoryPartSelect.prototype = Object.create(Component.prototype);

/*
 goatstone.alphacronke.ui.component.StoryPartSelect

 */

function StoryPartSelect(rootDiv) {

    var $root = this.setRoot(rootDiv);
    var $this = this;
    $root.addEventListener('change', function (e) {
       $this.select(this.value);
      });
}

StoryPartSelect.prototype = Object.create(Component.prototype);

/*
 goatstone.alphacronke.ui.component.StoryPartSelect

 */

function StoryPartSelect() {

    var dDivDims =  {x: 20, y: window.innerHeight  - 240};

    this.$root = document.querySelector('#story-parts');
    this.$body = document.querySelector('body');
    this.$handle = this.$root.querySelector('.handle');
    this.$storyPartsOpts = this.$root.querySelector('#story-parts-opts')

    this.$root.style.visibility = 'visible';
    this.$root.style.top =   dDivDims.y+'px';
    this.$root.style.left =  dDivDims.x+'px';

    this.setDrag();
}

StoryPartSelect.prototype = Object.create(Panel.prototype);

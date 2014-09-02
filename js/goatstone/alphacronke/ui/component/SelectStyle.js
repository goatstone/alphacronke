/*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectStyle() {

//    var dDivDims =  {x: window.innerWidth - 350, y: window.innerHeight  - 140};

    this.$root = document.querySelector('#select-style');
    this.$body = document.querySelector('body');
    this.$handle = this.$root.querySelector('.handle');
    this.$styleOpts = this.$root.querySelector('#styles');
    this.$closePanel = this.$root.querySelector('.panel-close-button');

    this.$root.style.visibility = 'visible';
//    this.$root.style.top =   dDivDims.y+'px';
//    this.$root.style.left =  dDivDims.x+'px';

    this.setDrag();
}

SelectStyle.prototype = Object.create(Panel.prototype);
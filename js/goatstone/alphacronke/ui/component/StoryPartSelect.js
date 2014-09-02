/*
 goatstone.alphacronke.ui.component.StoryPartSelect

 */

function StoryPartSelect() {

    var dDivDims =  {x: 20, y: window.innerHeight  - 240};

    this.$root = document.querySelector('#story-parts');
    this.$body = document.querySelector('body');
    this.$handle = this.$root.querySelector('.handle');
    this.$storyPartsOpts = this.$root.querySelector('#story-parts-opts')
//select-chart-size
//    this.$select-chart-size
    this.$selectChartSizeContainer = this.$root.querySelector('#select-chart-size');
    this.$selectChartSizeButton = this.$root.querySelector('#svg-size');
//        <div id="select-chart-size">
//        <label for="svg-size">Chart Size: </label>
//        <input value="700" type="range" min="200" max="2000" id="svg-size">
//        </div>

    this.$root.style.visibility = 'visible';
    this.$root.style.top =   dDivDims.y+'px';
    this.$root.style.left =  dDivDims.x+'px';

    this.setDrag();
}

StoryPartSelect.prototype = Object.create(Panel.prototype);

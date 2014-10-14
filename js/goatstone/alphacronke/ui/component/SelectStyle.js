/*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectStyle(rootDiv) {

	var $root = this.setRoot(rootDiv)

    // this.$styleOpts =  $root.querySelector('#styles');
    // this.$closePanel =  $root.querySelector('.panel-close-button');
    var $this = this;
    $root.addEventListener('change', function (e) {
	   $this.select(this.value);
  
  //      $this.storyWords.setStyle(this.value)
     //    if (this.value === 'bubble') {
     //        $this.alphaRange.$root.style.visibility = 'hidden';
     //        $this.storyPartSelect.$selectChartSizeContainer.style.display = 'block';
     //    }
     //    else if (this.value === 'alphaSelect') {
     //        $this.alphaRange.$root.style.visibility = 'visible'
     //        $this.storyPartSelect.$selectChartSizeContainer.style.display = 'none';
     //        $this.storyWords.highlightWords($this.alphaRange.selectedElements);
     //    }
     });

}

SelectStyle.prototype = Object.create(Component.prototype);
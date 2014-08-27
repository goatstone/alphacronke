/* Panel.js  
 */

function Panel() {
}

Panel.prototype.setDrag = function() {

    // make this panel draggable
    this.mOffsets = [];
    this.handleEvent = function(e) {
        switch(e.type) {
            case 'mousedown':
                this.mOffsets[0] =  e.clientX - this.$root.offsetLeft ;
                this.mOffsets[1] =  e.clientY - this.$root.offsetTop ;
                this.$body.addEventListener('mousemove', this, false);
                break;
            case 'mousemove':
                this.$root.style.left = (e.clientX-this.mOffsets[0]) +'px' ;
                this.$root.style.top = (e.clientY-this.mOffsets[1]) +'px' ;
                break;
            case 'mouseup':
                this.$body.removeEventListener('mousemove', this, false);
                break;
        }
    };
    this.$handle.addEventListener('mousedown', this, false);
    this.$handle.addEventListener('mouseup', this, false);

};

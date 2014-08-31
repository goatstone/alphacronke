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

    this.initCloseButton();

};
// initCloseButton, set up the button used to hide the panel
Panel.prototype.initCloseButton = function(){

    var $this = this;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute( "width",  "20");
    svg.setAttribute( "height",  "20");
    svg.style.stroke = "#955";
    svg.style.strokeWidth = "5px";

    svg.addEventListener('click', function(){
        console.log('click...');
        $this.$root.style.visibility = 'hidden';

    })

    var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    line.setAttribute("x1","0");
    line.setAttribute("y1","0");
    line.setAttribute("x2","20");
    line.setAttribute("y2","20");
    line.style.strokeWidth = "5px";

    var line2 = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    line2.setAttribute("x1","20");
    line2.setAttribute("y1","0");
    line2.setAttribute("x2","0");
    line2.setAttribute("y2","20");
    line2.style.strokeWidth = "5px";

    svg.appendChild(line)
    svg.appendChild(line2)

    this.$handle.appendChild(svg);

};
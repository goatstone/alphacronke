/*
 goatstone.ui.component.AlphaRange

 * A Widget that presents the user with the letters of the alphabet and
 * enables selection of a range of letters.
 * Goatstone : 5.20.2014
 * */

function AlphaRange(rootDiv ) {

    this.panel;
    this.config = {
        width: 410,
        height: 35,
        color: d3.rgb(30, 30, 30),
        scaleSymbols: {
            colorOn: d3.rgb(255, 255, 255),
            colorOff: d3.rgb(0, 0, 0),
            listStartX: 20,
            listWidth: 390
        },
        selector: {
            arc: {
                color: d3.rgb(20, 100, 225), //30,100,255
                opacity: 0.6
            },
            selectedWindow: {
                color: d3.rgb(250, 0, 0),
                opacity: 0.3
            }
        }
    };
    this.dDivDims = [
        {x: 20, y: window.innerHeight - 140}
    ];

    var $root = this.setRoot(rootDiv);
    // this.$root = document.querySelector('#dd');
    // this.$body = document.querySelector('body');
    // this.$handle = this.$root.querySelector('.handle');

    this.ordinalScale;
    this.ordinalGroup;
    this.linearScale;

    this.brush;
    this.initExtent = [0.5, 0.9];
    this.onSelectCallback = null;

    this.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    this.selectedElements = "";
    this.prevSelectedElements = null;


    this.linearScale = d3.scale.linear().range([20, 390]);
    this.ordinalScale = d3.scale
        .ordinal()
        .domain(this.alphabet)
        .rangeBands([0, 1], 0, 0);

    this.initDraw();

    // call the parent Panel setDrag()
//    this.setDrag();
    this.setSelectedElements();

}

AlphaRange.prototype = Object.create(Component.prototype);

AlphaRange.prototype.subscribe = function(topic){
    var self = this;
    PubSub.subscribe('mode', function(topic, data){
        if(data.value  === 'bubble'){
            self.hide();
            self.panel.hide();
        }
        else if(data.value  === 'alphaSelect'){
            self.show();
            self.panel.show();
        }

    });

};
AlphaRange.prototype.setPanel = function(panel){
    this.panel = panel;
};
AlphaRange.prototype.initDraw = function(){
    var $this  =this;
    var brushArc;
    var brushGroup;
    var svgTag;

    this.$root.style.left = this.dDivDims[0].x + "px";
    this.$root.style.top = this.dDivDims[0].y + 'px';
//    this.$root.style.visibility = 'visible';

    var dDiv = d3.select("#dd")
        .selectAll("div#alpha-range")
        .data(this.dDivDims)
        .enter().append("div");

    dDiv.append("div")
        .attr("id", "scale_background");


    svgTag = d3.select("#dd")
        .append("svg")
        .attr("width", this.config.width)
        .attr("height", this.config.height)
        .style({
            "left": "0px",
            "top": "7px",
            "position": "relative",
            "opacity": 0.5
        });

    // SVG group to represent the ordinal scale
    this.ordinalGroup = svgTag.append("g");
    this.ordinalGroup
        .selectAll("text")
        .data(this.alphabet)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d) {
            return  20+ $this.ordinalScale(d) * 363;
        })
        .attr("y", function (d) {
            return $this.config.height / 2;
        })
        .attr("fill", this.config.scaleSymbols.colorOff);

    // Assemble the d3 brush, the selector component.
    this.brush = d3.svg.brush()
        .x(this.linearScale)
        .extent(this.initExtent)
        .on("brush", function () {
            // $this.setSelectedElements();
            return 1;
        })
        .on("brushstart", function () {
            return 1;
        })
        .on("brushend", function () {
            $this.setSelectedElements();
            PubSub.publish('alphaRange', {value:$this.selectedElements});
            return 1;
        });
    brushArc = d3.svg.arc()
        .outerRadius(35 / 2)
        .startAngle(0)
        .endAngle(function (d, i) {
            return i ? -Math.PI : Math.PI;
        });
    brushGroup = svgTag.append("g")
        .attr("fill", this.config.selector.arc.color)
        .attr("fill-opacity", this.config.selector.arc.opacity)
        .call($this.brush);
    brushGroup.selectAll(".resize").append("path")
        .attr("transform", "translate(0," + ( (this.config.height / 2)  ) + ")")
        .attr("d", brushArc);

    brushGroup.selectAll("rect")
        .attr("fill", this.config.selector.selectedWindow.color)
        .attr("fill-opacity", this.config.selector.selectedWindow.opacity)
        .attr("height", this.config.height)
        .attr("y", 0);

};
AlphaRange.prototype.draw = function () {
    var $this = this;
    this.ordinalGroup
        .selectAll("text")
        .text(function (d) {
            return  d;
        })
        .attr("fill", function (d) {
            if ($this.selectedElements.indexOf(d) !== -1) {
                return 'red';
            }
            else {
                return 'black';
            }
        });
};
AlphaRange.prototype.addSelectListener = function (callBack) {
    this.onSelectCallback = callBack;
};
AlphaRange.prototype.setSelectedElements = function () {
    var $this = this;
    var brushExtent = this.brush.extent();
    this.selectedElements = '';
    this.alphabet.forEach(function (e, i) {
        if ($this.ordinalScale(e) >= brushExtent[0] && $this.ordinalScale(e) <= brushExtent[1]) {
            $this.selectedElements += e;
        }
    });
    if(this.selectedElements === this.prevSelectedElements){
        return;
    }
    this.prevSelectedElements = this.selectedElements;
    if (this.onSelectCallback !== null) {
        this.onSelectCallback($this.selectedElements);
    }
    this.draw();
};


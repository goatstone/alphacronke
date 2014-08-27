/*
 * AlphaRange.js
 * A Widget that presents the user with the letters of the alphabet and
 * enables selection of a range of letters.
 * Goatstone : 5.20.2014
 * */

function AlphaRange() {
    this.$root = document.querySelector('#dd');
    this.$body = document.querySelector('body');
    this.$handle = this.$root.querySelector('.handle');

    this.ordialScale;
    this.ordinalGroup;
    this.brush;
    this.onSelectCallback = null;
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
                opacity: .6
            },
            selectedWindow: {
                color: d3.rgb(250, 0, 0),
                opacity: .3
            }
        }
    };
    this.displayWidth = 390;
    var displayStart = 20, height = 60, width = 390;
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var svgTag;
    var linearScale;
    var brushArc;
    var brushGroup;
    var $this = this;

    var dDivDims =  [{x: 20, y: window.innerHeight  - 140}];
    this.$root.style.left =  dDivDims[0].x  +"px";
    this.$root.style.top =  dDivDims[0].y + 'px';
    this.$root.style.visibility = 'visible';

    var dDiv = d3.select("#dd")
        .selectAll("div#alpha-range")
        .data(dDivDims)
        .enter().append("div");

    dDiv.append("div")
        .attr("id", "scale_background");

    this.ordialScale = d3.scale
        .ordinal()
        .domain(alphabet)
        .rangeBands([this.config.scaleSymbols.listStartX, this.config.scaleSymbols.listWidth], 0, 0);

    linearScale = d3.scale.linear()
        .range([this.config.scaleSymbols.listStartX, this.config.scaleSymbols.listWidth]);

    svgTag = d3.select("#dd")
        .append("svg")
        .attr("width", this.config.width)
        .attr("height", this.config.height)
        .style({
            "left": "0px",
            "top": "7px",
            "position": "relative",
            "opacity": .5
        });

    // SVG group to represent the ordinal scale
    this.ordinalGroup = svgTag.append("g");
    this.ordinalGroup
        .selectAll("text")
        .data(alphabet)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d) {
            return $this.ordialScale(d);
        })
        .attr("y", function (d) {
            return $this.config.height / 2;
        })
        .attr("fill", this.config.scaleSymbols.colorOff);

    // Assemble the d3 brush, the selector component.
    this.brush = d3.svg.brush()
        .x(linearScale)
        .extent([.5, .6])
        .on("brush", function () {
            $this.move();
            return 1;
        })
        .on("brushstart", function () {
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

    this.setDrag();

}

AlphaRange.prototype = Object.create(Panel.prototype);

AlphaRange.prototype.toString = function () {
    return this.name + " : " + this.version;
};

AlphaRange.prototype.addSelectListener = function(callBack){
    this.onSelectCallback = callBack;
};

AlphaRange.prototype.move = function () {
    var brushExtent = this.brush.extent();
    var filteredStr = "";
    var $this = this;

    this.ordinalGroup
        .selectAll("text")
        .text(function (d) {
            return  d;
        })
        .attr("fill", function (d) {
            var dScaled = ($this.ordialScale(d) / ($this.config.scaleSymbols.listWidth) );
            if (dScaled >= brushExtent[0] && dScaled <= brushExtent[1]) {
                filteredStr += d;
                return $this.config.scaleSymbols.colorOn;
            }
            else {
                return $this.config.scaleSymbols.colorOff;
            }
        });

        if(this.onSelectCallback !== null){
            this.onSelectCallback(filteredStr);
        }
};
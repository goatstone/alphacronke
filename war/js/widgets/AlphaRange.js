/*
 * AlphaRange.js
 * A Widget that presents the user with the letters of the alphabet and
 * enables selection of a range of letters.
 * Goatstone : 5.20.2014
 * */

function AlphaRange() {
    this.name = "AlphaRange";
    this.version = 0.7;
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
            colorOff: d3.rgb(200, 200, 100),
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

    var drag = d3.behavior.drag()
        .origin(function (d) {
            return d;
        })
        .on("dragstart", dragStart)
        .on("drag", onDrag)
        .on("dragend", dragEnd);
    var isHit = false;

    function dragStart(d) {
        if (d3.event.sourceEvent.target.id === "ui-handle") {
            d3.event.sourceEvent.stopPropagation();
            d3.select(this).classed("dragging", true);
            isHit = true;
        }
        else {
            d3.event.sourceEvent.stopPropagation();

        }
    }

    function onDrag(d) {
 //        if (d3.event.sourceEvent.target.id !== "ui-handle") {
//            console.log("hit")
//        }
        if (!isHit)return;
        d.x = d3.event.x;
        d.y = d3.event.y;
         d3.select(this).style({
            "left": d3.event.x + "px",
            "top": d3.event.y + "px"
        })
    }

    function dragEnd() {
        isHit = false;
    }

    var dDivDims = [
        {x:   window.innerWidth/2 - 200, y: window.innerHeight/2 - 60}
    ];
    var dDiv = d3.select("body")
        .selectAll("div#alpha-range")
        .data(dDivDims)
        .enter().append("div")
        .attr("id", "dd")
        .style({
            "position": "absolute",
            "top": dDivDims[0].y + "px",
            left: dDivDims[0].x + "px",
            width: "440px",
            height: "55px",
            "opacity": 1,
            "z-index": 200
        })
        .call(drag);
    dDiv.append("div")
        .attr("id", "scale_background")
        .style({
            top: "18px", left: "0px",
            width: "400px", height: "48px",
            "background-color": "#000",
            "position": "absolute",
            "border-top-right-radius": "7px",
            "border-bottom-left-radius": "7px",
            "border-bottom-right-radius": "7px",
            "opacity": 1,
            "z-index": 0
        })

    dDiv.append("div")
        .attr("id", "ui-handle")
        .style({
            top: 0, left: 0,
            width: "60px", height: "18px",
            "background-color": d3.rgb(20, 255, 225),
            "cursor": "move",
            "border-top-right-radius": "7px",
            "border-top-left-radius": "7px",
            "opacity": 1,
            "z-index": 100,
            "background-image": "linear-gradient(to bottom , rgba(30,100,255,255), rgba(10,10,10,255))"

        })

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
//            "background-color":"#f00",
            "opacity": .5
        })

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
        .attr("fill", this.config.scaleSymbols.colorOff)

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
}

AlphaRange.prototype.toString = function () {
    return this.name + " : " + this.version;
}

AlphaRange.prototype.addSelectListener = function(callBack){
    this.onSelectCallback = callBack;
}

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

        if(this.onSelectCallback != null){
            this.onSelectCallback(filteredStr);
        }

}

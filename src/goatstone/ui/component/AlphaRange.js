/*
 goatstone.ui.component.AlphaRange

 * A Widget that presents the user with the letters of the alphabet and
 * enables selection of a range of letters.
 * Goatstone : 5.20.2014
 * */

function AlphaRange(rootDiv) {
    var $this = this;
    var brushArc, brushGroup, svgTag;
    this.width = 410;
    this.height = 55;
    this.extMin;
    this.extMax;
    //var domainMax = 3.0;
    this.initExtent = [0, 4];
    this.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    this.allElements = this.alphabet;
    this.range = 'abc';
    var domainMax = this.allElements.length - 1;
    this.linearScale = d3.scale
        .linear()
        .domain([0, domainMax])
        .range([15, 15 + (domainMax * 15)]);
    //var lsi = this.linearScale.invert(10);
    //var b = this.linearScale(1);
    svgTag = d3.select("#alpha-range")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);
    // SVG group to represent the ordinal scale
    this.ordinalGroup = svgTag.append("g");
    this.ordinalGroup
        .selectAll("rect")
        .data(this.allElements)
        .enter()
        .append("rect")
        .attr('class', "element-bg")
        .attr('width', 5)
        .attr('height', 60)
        .attr("x", function (d, i) {
            return $this.linearScale(i);
        })
        .attr("y", function (d) {
            return 25;
        });
    this.ordinalGroup
        .selectAll("text")
        .data(this.allElements)
        .enter()
        .append("text")
        .attr('class', "element-text")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            var scaleToFit = 1;
            return $this.linearScale(i) * scaleToFit;
        })
        .attr("y", function (d) {
            return 30;
        })
        .attr("class", function (d, i) {
            if (i >= $this.initExtent[0] && i <= $this.initExtent[1]) {
                return 'highlight';
            }
            else return 'lowlight';
        });

    // Assemble the d3 brush, the selector component.
    this.brush = d3.svg.brush()
        .x(this.linearScale)
        .extent(this.initExtent)
        .on("brush", function () {
            return 1;
        })
        .on("brushstart", function () {
            return 1;
        })
        .on("brushend", function () {
            PubSub.publish('alphaRange', {value: $this.setRange()});
            return 1;
        });
    brushArc = d3.svg.arc()
        .outerRadius(15)
        .startAngle(0)
        .endAngle(function (d, i) {
            return i ? -Math.PI : Math.PI;
        });
    brushGroup = svgTag.append("g")
        .call(this.brush);
    brushGroup.selectAll(".resize").append("path")
        .attr("transform", "translate(0," + ( (this.height - 15  )  ) + ")")
        .attr("d", brushArc);
    brushGroup.selectAll("rect")
        .attr("height", this.height)
        .attr("y", 20);

    $this.setRange();

}
AlphaRange.prototype = Object.create(Component.prototype);
AlphaRange.prototype.setRange = function () {
    var extMin = Math.round(this.brush.extent()[0]);
    var extMax = Math.round(this.brush.extent()[1]);
    var res = this.allElements.slice(extMin, extMax + 1).join('');
    this.extMin = extMin;
    this.extMax = extMax;
    this.range = res;
    this.updateText();
    return res;
};
AlphaRange.prototype.getRange = function () {
    return this.range;
};
AlphaRange.prototype.updateText = function () {
    var self = this;
    this.ordinalGroup
        .selectAll("text")
        .attr("class", function (d, i) {
            if (i >= self.extMin && i <= self.extMax) {
                return 'highlight';
            }
            else return 'lowlight';
        });
};
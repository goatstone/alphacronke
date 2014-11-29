/*
 goatstone.ui.component.AlphaRange

 * A Widget that presents the user with the letters of the alphabet and
 * enables selection of a range of letters.
 * Goatstone : 5.20.2014
 * */

define(["Component", "D3" ], function ( Component, d3) {

    var AlphaRange = Component.extend({
        alphaScale: null,
        svgTag: null,
        initExtent: [40, 56],
        alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
        range: 'abc',
        selectedElements: [],
        ordinalGroup: null,
        brush: null,
        xAxis: null,
        initialize: function (rootDiv) {
            // this.supr(rootDiv);
            var self = this;
            var scaleA = d3.scale.ordinal().domain(this.alphabet).rangePoints([0, 400]);
            this.alphaScale = d3.scale.ordinal().domain(this.alphabet).range(scaleA.range());
            this.xAxis = d3.svg.axis().scale(this.alphaScale).tickSize([25]);
            this.svgTag = d3.select("#alpha-range")
                .append("svg")
                .attr("width", 415)
                .attr("height", 55)
                .style('padding', '0 0 0 15px');
            this.makeBrush();
            this.makeXAxis();
            this.highLightTicks();
        },
        makeBrush: function () {
            var self = this;
            // Assemble the d3 brush, the selector component.  this.brush()
            this.brush = d3.svg.brush()
                .x(this.alphaScale)
                .extent(this.initExtent)
                .on("brush", function () {
                    self.highLightTicks();
                })
                .on("brushstart", function () {
                })
                .on("brushend", function () {
                    // snap to round value
                    var min = Math.round(self.brush.extent()[0]);
                    var max = Math.round(self.brush.extent()[1]);
                    // maintain a minimum width in order to select a single character
                    if (min === max) {
                        max = max + 12;
                    }
                    self.brush.extent([min, max]);
                    d3.select(this).call(self.brush);
                    self.highLightTicks();
                    self.publish('alphaRange', {value: self.range });
                });
            var brushGroup = this.svgTag.append("g")
                .call(this.brush);
            var brushArc = d3.svg.arc()
                .outerRadius(15)
                .startAngle(0)
                .endAngle(function (d, i) {
                    return i ? -Math.PI : Math.PI;
                });
            brushGroup.selectAll(".resize").append("path")
                .attr("transform", "translate(0, 40)")
                .style('opacity', '.5')
                .attr("d", brushArc);
            brushGroup.selectAll("rect")
                .attr("height", 35)
                .attr("y", 25);
        },
        makeXAxis: function () {
            // Add the x-axis. this.xAxis
            this.ordinalGroup = this.svgTag.append("g")
                .attr("transform", "translate(0, -13)")
                .call(this.xAxis);
            this.ordinalGroup.select('path')
                .style('display', 'none');
            this.ordinalGroup.selectAll('line')
                .attr('stroke', "green");

        },
        highLightTicks: function () {
            var self = this;
            this.selectedElements = [];
            this.svgTag.selectAll('text')
                .attr("stroke", function (d, i) {
                    var extent = self.brush.extent();
                    var letterScale = self.alphaScale(d);
                    if (letterScale >= extent[0] && letterScale <= (extent[1] + 3)) {
                        self.selectedElements.push(d);
                        return 'red';
                    }
                    return '#777';
                });
            this.range = this.selectedElements.join('');
        },
        getRange: function () {
            return this.range;
        }
    });

    return AlphaRange;
});
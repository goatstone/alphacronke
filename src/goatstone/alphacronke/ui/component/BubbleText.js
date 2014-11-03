/*
 goatstone.alphacronke.ui.component.BubbleText

 Display text and provide a method to modify its appearance.
 - goatstone: 8.2014

 Usage:
 var bubbleText = new BubbleText();
 * */

function BubbleText(model) {
    this.model = model;
    this.bubbleData = {children: []};
    this.size = 700;
}
BubbleText.prototype = Object.create(Component.prototype);
BubbleText.prototype.setSize = function (size) {
    this.size = size;
    this.draw();
};
BubbleText.prototype.setData = function (data) {
    var d = this.setBubbleWordData(data);
    this.draw();
};
BubbleText.prototype.setBubbleWordData = function (data) {
    var bwd = {};
    var $this = this;
    var a = [];
    data.forEach(function (e) {
        a.push(e.split(" "));
    });
    this.bubbleData.children = [];
    var blackList = ['', 'a', 'the', 'and', 'in', 'of', 'to', 'that', 'is', 'be', 'if', 'as', 'his', 'this'];
    a.forEach(function (e, i) {
        e.forEach(function (e, i) {
            if (blackList.indexOf(e) !== -1) {
            }
            else if (!bwd[e.toLowerCase()]) {
                bwd[e.toLowerCase()] = 1;
            }
            else {
                bwd[e.toLowerCase()]++;
            }
        });
    });
    for (var b in bwd) {
        var t = {name: b + "", value: bwd[b] + ""};
        this.bubbleData.children.push(t);
    }
    return data;
};
BubbleText.prototype.draw = function () {
    var diameter = this.size;
    var color = d3.scale.category20c();
    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);
    d3.select("#bubble-text svg.bubble").remove();
    var svg = d3.select("#bubble-text").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var node = svg.selectAll(".node")
        .data(bubble.nodes(this.bubbleData)
            .filter(function (d) {
                return !d.children;
            }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d) {
            return color(d.name);
        });
    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.name;
        });
    d3.select(self.frameElement).style("height", diameter + "px");
};

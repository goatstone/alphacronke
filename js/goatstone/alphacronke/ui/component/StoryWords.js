/*
 goatstone.alphacronke.ui.component.StoryWords

 Display text and provide a method to modify its appearance.
 - goatstone: 8.2014

 Usage:
 var storyWords = new StoryWords();

 * */

function StoryWords( ) {

    this.words;
    this.sectionsWords = [];
    this.wordConfig = {
        "backgroundColorOff": "#444",
        "backgroundColorOn": "#ccc"
    };
    this.bubbleData = {children: []};
    this.styleTypes = ['bubble', 'alphaSelect'];
    this.selectedStyle = this.styleTypes[1];
    this.reString = null;
    this.size = 700;

}
StoryWords.prototype.setStyle = function(styleName){
    this.selectedStyle = styleName;
    this.clearContent();
    this.generateBGround();

}
StoryWords.prototype.setSize = function(size){
    this.size = size;
    this.generateBubbleWord(Number(size));
}
StoryWords.prototype.setSection = function (storiesPart) {
    var $this = this;
    var storyPart = storiesPart;

    this.clearContent();
    this.sectionsWords = [];

    storyPart.forEach(function (e) {
        $this.sectionsWords.push(e.split(" "));
    });

    this.generateBGround();
};
StoryWords.prototype.setBubbleWordData = function () {
    var bwd = {};
    //var $this = this;
    this.bubbleData.children = [];
    var blackList = ['', 'a', 'the', 'and', 'in', 'of', 'to', 'that', 'is', 'be', 'if', 'as', 'his', 'this']
    this.sectionsWords.forEach(function (e, i) {
        e.forEach(function (e, i) {
            if(blackList.indexOf(e) !== -1 ){}
            else if (!bwd[e.toLowerCase()]) {
                bwd[e.toLowerCase()] = 1;
            }
            else {
                bwd[e.toLowerCase()]++;
            }
        })
    });

    for (var b in bwd) {
        var t = {name: b + "", value: bwd[b] + "" };
        this.bubbleData.children.push(t);
    }
};

StoryWords.prototype.generateBGround = function(){
    if(this.selectedStyle === 'bubble'){
        this.setBubbleWordData();
        this.generateBubbleWord(window.innerHeight);
    }
    else if(this.selectedStyle === 'alphaSelect'){
        this.generateSelectWord();
    }

}
StoryWords.prototype.generateBubbleWord = function () {

    var diameter = this.size;
    //format = d3.format(",d"),
    var color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    d3.select("svg.bubble").remove();

    var svg = d3.select("body").append("svg")
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
StoryWords.prototype.generateSelectWord = function () {

    var para = d3.select("#div_words").selectAll("p")
        .data(this.sectionsWords)
        .enter().append("p");
    this.words = para.selectAll("span")
        .data(function (d) {
            return d;
        })
        .enter().append("span")
        .text(function (d) {
            return d;
        });
};

StoryWords.prototype.highlightWords = function (filteredStr) {
    if (!this.words){return false;}
    $this = this;
    this.reString = filteredStr.split("").join("|");;
    this.words.html(  function (d, i) {
        var d2 =d.replace( new RegExp("(" + $this.reString + ")", "ig" ), '<em style="color:#f40">$1</em>')
        return d2;
    });
 };

StoryWords.prototype.clearContent = function(){
    d3.select("#div_words").selectAll("p").remove();
    d3.select("body").selectAll("svg.bubble").remove();
}

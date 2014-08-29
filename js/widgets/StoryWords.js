/*
 StoryWords.js
 Display text and provide a method to modify its appearance.
 - goatstone: 8.2014

 Usage:
 var storyWords = new StoryWords();
 storyWords.fetchText(function () {
 alphaRange.move();
 });

 * */

function StoryWords() {
    this.words;
    this.sectionsWords = [];
    this.wordConfig = {
        "backgroundColorOff": "#444",
        "backgroundColorOn": "#ccc"
    };
    this.storyParts = {};
    this.bubbleData = {children: []};
    this.styleTypes = ['bubble', 'alphaSelect'];
    this.selectedStyle = this.styleTypes[1];
    this.selectedStoryPart = null;
}

StoryWords.prototype.setStyle = function(styleName){
    this.selectedStyle = styleName;

    this.clearContent();
    console.log(this.selectedStyle)
    this.generateBGround();

}

StoryWords.prototype.fetchText = function (callBack) {
    var $this = this;

    d3.text("datum/dickory_cronke.txt", function (unparsedData) {

        var sections = [];
        var txtStart = 738;
        var textEnd = 59570;
        var storyText = unparsedData.substr(txtStart, textEnd);

        // remove \r characters
        storyText = storyText.replace(/\r/g, "");
        // chang all single \n into a single space
        storyText = storyText.replace(/([^\n])[\n]([^\n])/g, '$1 $2');

        sections = storyText.split(/[\n][\n]/g);
        $this.storyParts.intro = sections.slice(0, 16);
        $this.storyParts.partOne = sections.slice(17, 74);
        $this.storyParts.partTwo = sections.slice(75, 129);
        $this.storyParts.partThree = sections.slice(130, 172);

        $this.setSection('intro')

        sections = null;
        storyText = null;

        if (callBack) {
            callBack();
        }
        return true;
    });
};
StoryWords.prototype.clearContent = function(){
    d3.select("#div_words").selectAll("p").remove();
    d3.select("body").selectAll("svg.bubble").remove();
}
StoryWords.prototype.generateBGround = function(){
    if(this.selectedStyle === 'bubble'){
        this.setBubbleWordData();
        this.generateBubbleWord();
    }
    else if(this.selectedStyle === 'alphaSelect'){
        this.generateSelectWord();
    }

}
StoryWords.prototype.setSection = function (storiesK) {
    var $this = this;

    this.selectedStoryPart = storiesK;
    var storyPart = this.storyParts[storiesK];

    // clear the contents
//    d3.select("#div_words").selectAll("p").remove();
//    d3.select("body").selectAll("svg.bubble").remove();
//    this.sectionsWords = [];
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
StoryWords.prototype.generateBubbleWord = function () {
    var diameter = 2260,
    //format = d3.format(",d"),
        color = d3.scale.category20c();

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

}
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
    var $this = this;
    if (!this.words)return false;
    this.words.style('background-color', function (d, i) {
        var reStr;
        reStr = filteredStr.split("").join("|");
        var r = new RegExp(reStr, 'i');
        var color = (r.test(d)) ?
            $this.wordConfig.backgroundColorOn :
            $this.wordConfig.backgroundColorOff;

        return color;
    });
};

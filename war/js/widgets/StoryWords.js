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
}

StoryWords.prototype.fetchText = function (callBack) {
    var $this = this;

    d3.text("datum/dickory_cronke.txt", function (unparsedData) {

        var sections = [];
        var txtStart = 738;
        var textEnd = 59570;
        textEnd = 20050;

        var storyText = unparsedData.substr(txtStart, textEnd);
        // remove \r characters
        storyText = storyText.replace(/\r/g, "")
        // chang all single \n into a single space
        storyText = storyText.replace(/([^\n])[\n]([^\n])/g, '$1 $2');

        sections = storyText.split(/[\n][\n]/g);
        sections.forEach(function (e) {
            $this.sectionsWords.push(e.split(" "));
        });
        sections = null;
        storyText = null;

        $this.setSection();

        if (callBack) {
            callBack();
        }
        return true;
    });
};

StoryWords.prototype.setSection = function () {

    var para = d3.select("body").append("div").attr("id", "div_words").selectAll("p")
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

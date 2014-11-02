/*
 goatstone.alphacronke.ui.component.LineText

 Display text and provide a method to modify its appearance.
 - goatstone: 8.2014

 Usage:
 var lineText = new LineText();
 * */

 function LineText(model) {
    this.model = model;
    this.alphaRange;
    this.words;
    this.sectionsWords = [];
}
LineText.prototype = Object.create(Component.prototype);
LineText.prototype.setAlphaRange = function (alphaRange) {
    this.alphaRange = alphaRange;
    this.highlightWords(alphaRange);
};
LineText.prototype.setSection = function (storiesPart) {
    var $this = this;
    var storyPart = this.model.story[storiesPart];
    this.sectionsWords = [];
    storyPart.forEach(function (e) {
        $this.sectionsWords.push(e.split(" "));
    });
    this.generateSelectWord();
    this.highlightWords(this.alphaRange);
};
LineText.prototype.generateSelectWord = function () {
    d3.select("#line-text").selectAll("p").remove();
    var para = d3.select("#line-text").selectAll("p")
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
LineText.prototype.highlightWords = function (filteredStr) {
    var reString = filteredStr.split("").join("|");
    this.words.html(function (d, i) {
        var d2 = d.replace(new RegExp("(" +  reString + ")", "ig"), '<em style="color:#f40">$1</em>');
        return d2;
    });
};

/*
 goatstone.alphacronke.ui.component.LineText

 Display text and provide a method to modify its appearance.
 - goatstone: 8.2014

 Usage:
 var lineText = new LineText();
 * */

function LineText(rootDiv) {
    var $root = this.setRoot(rootDiv);
    this.alphaRange;
    this.words;
}
LineText.prototype = Object.create(Component.prototype);
LineText.prototype.setAlphaRange = function (alphaRange) {
    this.alphaRange = alphaRange;
    this.highlightWords();
};
LineText.prototype.draw = function (storiesPart) {
    d3.select("#line-text")
        .selectAll("p")
        .remove();
    var paragraph = d3.select("#line-text")
        .selectAll("p")
        .data(storiesPart)
        .enter()
        .append("p");
    this.words = paragraph
        .selectAll("span")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("span")
        .text(function (d) {
            return d;
        });
    this.highlightWords();
};
LineText.prototype.highlightWords = function () {
    if (!this.alphaRange)return;
    var reString = this.alphaRange.split("").join("|");
    this.words.html(function (d, i) {
        var d2 = d.replace(new RegExp("(" + reString + ")", "ig"), '<em style="color:#f40">$1</em>');
        return d2;
    });
};

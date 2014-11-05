/*
 goatstone.alphacronke.ui.component.LineText

 Display text and provide a method to modify its appearance.
 - goatstone: 8.2014

Require: Component PubSub D3

 Usage:
 var lineText = new LineText();
 * */

var LineText = Component.extend({
    alphaRange: null,
    words: null,
    setAlphaRange: function (alphaRange) {
        this.alphaRange = alphaRange;
        this.highlightWords();
    },
    draw: function (storiesPart) {
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
    },
    highlightWords: function (msg) {
        if (!this.alphaRange)return;
        var reString = this.alphaRange.split("").join("|");
        this.words.html(function (d, i) {
            var d2 = d.replace(new RegExp("(" + reString + ")", "ig"), '<em style="color:#f40">$1</em>');
            return d2;
        });
    }
});

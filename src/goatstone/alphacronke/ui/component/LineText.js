/*
 goatstone.alphacronke.ui.component.LineText

 Display text and provide a method to modify its appearance.
 - goatstone: 8.2014

 Usage:
 var lineText = new LineText();
 * */

 define(["Component"], function(Component){

    var LineText = Component.extend({
        alphaRange: null,
        words: null,
        setAlphaRange: function (alphaRange) {
            this.alphaRange = alphaRange;
            this.highlightWords();
        },
        draw: function (storiesPart) {
            var sp = storiesPart.map(function (e) {
                return e.split(' ');
            });
            d3.select(this.$root)
                .selectAll("p")
                .remove();
            var paragraph = d3.select(this.$root)
                .selectAll("p")
                .data(sp)
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
            d3.select(this.$root).selectAll('p').selectAll('span')
                .style("background-color", function (d, i) {
                    var isSelected = false;
                    isSelected = new RegExp(reString, 'ig').test(d);
                    return isSelected ? '#555' : '#333';
                })
                .html(function (d, i) {
                    var d2 = d.replace(new RegExp("(" + reString + ")", "ig"), '<em style="color:#fbb">$1</em>');
                    return d2;
                });
        }
    });

    return LineText;
});

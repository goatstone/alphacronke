/*
 * StoryWords.js
 * */

function StoryWords() {
    this.$div_words;
    this.storyWords;
    this.wordConfig = {
        "padding": "3px",
        "border": "0px solid #ccc",
        "backgroundColorOff": "#333",
        "backgroundColorOn": "#bbb",
        "opacity": 1,
        "fontSize": "15px"
    };
}
StoryWords.prototype.fetchText = function (callBack) {

    var $that = this;

    d3.text("datum/dickory_cronke.txt", function (unparsedData) {

        var txtStrt = 738;
        var txtLn = 59570;
        var storyText = unparsedData.substr(txtStrt, txtLn);
        var storyTextPart = (storyText.substr(300, 4000));
        storyTextPart = storyTextPart.replace( /\n/g , " ")
        var storyLetters = storyTextPart.split("");

        //storyLetters = storyLetters.replace(" ", "xxxx")

        $that.storyWords = storyTextPart.split(" ");
        storyText = null;
        storyTextPart = null;

        $that.$div_words = d3.select("body")
            .append("div")
            .style({"position": "absolute", "top": "0px" })
            .attr("id", "div_words")

        $that.$div_words.selectAll("span")
            .data($that.storyWords, function (d, i) {
                return i;
            })
            .enter()
            .append("span")
            .text(function (d) {
                return d;
            })
            .style({"font-size": $that.wordConfig.fontSize ,
                "padding": $that.wordConfig.padding,
                "float":"left"
            });

        if (callBack) {
            callBack();
        }
        return true;
    });

};

StoryWords.prototype.set = function (filteredStr) {
    var $this = this;
    this.$div_words.selectAll("span")
        .data($this.storyWords, function (d, i) {
            return i;
        })
        .style("background-color", function (d, i) {
            var reStr;
            reStr = filteredStr.split("").join("|");
            var r = new RegExp(reStr, 'i');
            var color = (r.test(d)) ?
                $this.wordConfig.backgroundColorOn :
                $this.wordConfig.backgroundColorOff;

            return color;
        });
};

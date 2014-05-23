/*
 * AppInformation.js
 * Goatstone : 5.21.2014
 * */

function AppInformation() {
    this.name = "AppInformation";
    this.version = 0.7;
    var title = "AlphaCronke"
    var description = "Select Words by Letter Range from the text 'Dickory Cronke' by Daniel Defoe. "
    var makersMark = " (Goatstone, 20014.) "
    var link = "about/"
    var dDivDims = [
        {x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 60}
    ];
    var mainDiv = d3.select("body")
        .append("div")
        .attr("id", "app_information")
        .style({
            "font-size": "14px",
            "position": "fixed",
            "bottom": "10px",
            "right": "10px",
            width: "440px",
            height: "65px",
            "opacity": 1,
            "z-index": 2000,
            "background-color": d3.rgb(240, 240, 240),
            "border-radius": "5px",
            "padding": "10px",
            "box-shadow": "10px 10px 5px #777"
        })

    mainDiv.append("h2")
        .text(title)
        .style({
            "margin": "2px",
            "font-size": "16px",
            "color": d3.rgb(40, 40, 140)
        })
    mainDiv.append("p")
        .text(description)
        .style({"margin": "0px", "display": "inline"})
        .style({"position": "relative", "margin-left": "0px"})

    mainDiv.append("author")
        .text(makersMark)
        .style({"font-size": "12px"})
        .style({"margin-left": "10px"})

    mainDiv.append("a")
        .text("More Info...")
        .attr("href", link)
        .attr("target", "new")
        .style({"margin-left": "10px"})
}

AppInformation.prototype.toString = function () {
    return this.name + " : " + this.version;
}

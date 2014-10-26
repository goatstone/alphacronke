/*
 goatstone.alphacronke.Controller

 * */

function Controller() {

    // panels
    var alphaRangePanel, mainPanel, messagePanel;
    // components
    var   selectSize, storyPartSelect, selectStyle, message;
    var $this = this;

    // model
    this.model = new Model();
    this.initModel();

    // storyWords
    this.storyWords = new StoryWords( );

    // alphaRange

    this.alphaRange = new AlphaRange('#dd');
    this.alphaRange.addSelectListener( function (filteredStr) {
        $this.storyWords.highlightWords(filteredStr);
    });


    alphaRangePanel = new Panel('#panel-alpharange');
    alphaRangePanel.position(100,200);

    // main selection components
    // mainPanel = new Panel('#panel-a', { 
    //     handleBg:function(){
    //         var message = 'hello';
    //         var node = document.createElement('DIV');
    //         var txt = document.createTextNode(message);
    //         node.appendChild(txt);
    //         return node;
    //     },
    //     closeIcon:function(){
    //         var message = 'X';
    //         var node = document.createElement('DIV');
    //         var txt = document.createTextNode(message);
    //         node.appendChild(txt);
    //         return node;
    //     }
    // });
    mainPanel = new Panel('#panel-a' );

    selectSize = new SelectSize('#select-chart-size');
    selectSize.setCallback(function(selection){
        $this.storyWords.setSize(Number(selection));
    });
    storyPartSelect = new StoryPartSelect('#story-parts-opts');
    storyPartSelect.setCallback(function(selection){
        $this.storyWords.setSection($this.model.story[selection]);
        $this.storyWords.highlightWords($this.alphaRange.selectedElements);
    });
    selectStyle = new SelectStyle('#panel-a #styles');
    selectStyle.setCallback(function(selection){

        $this.storyWords.setStyle(selection);

        if (selection === 'bubble') {
            $this.alphaRange.hide();
            selectSize.show();
            alphaRangePanel.hide();
        }
        else if (selection === 'alphaSelect') {
            alphaRangePanel.show();
            $this.alphaRange.show();
            selectSize.hide();
            $this.storyWords.highlightWords($this.alphaRange.selectedElements);
        }
    });
    
    // message    
    message = new Message("#message");
    message.set( 
        '<h3>' + this.model.about.title + '</h3>' +
        '<p>'+ this.model.about.description+ '</p>' +  
        '<address class="author">' + this.model.about.author+'</address>'+  
        '<a href="/about/" target="new">more...</a>'  
    );
    messagePanel =  new Panel('#message-panel'); //  settings {x:1, y:2, w:200, h:200}
    messagePanel.position(window.innerWidth - 400, window.innerHeight -200 );
 
    // actionBar actionMenu
    this.actionBar = new ActionBar([
        {
            title: 'About AlphaCronke',
            action: function () {
                message.show();
                messagePanel.show();
            }
        },
        {
            title: 'Letter Select',
            action: function () {
                $this.alphaRange.show();
                alphaRangePanel.show();
            }
        },
        {
            title: 'Main Panel',
            action: function () {
                mainPanel.show();
            }
        }
    ]);
 
}

// init the Model
Controller.prototype.initModel = function () {
    var $this = this;
    d3.text("/datum/dickory_cronke.txt", function (unparsedData) {

        var sections = [];
        var txtStart = 738;
        var textEnd = 59570;
        var storyText = unparsedData.substr(txtStart, textEnd);
        // remove \r characters
        storyText = storyText.replace(/\r/g, "");
        // chang all single \n into a single space
        storyText = storyText.replace(/([^\n])[\n]([^\n])/g, '$1 $2');

        sections = storyText.split(/[\n][\n]/g);
        $this.model.story.intro = sections.slice(0, 16);
        $this.model.story.partOne = sections.slice(17, 74);
        $this.model.story.partTwo = sections.slice(75, 129);
        $this.model.story.partThree = sections.slice(130, 172);

        sections = null;
        storyText = null;

        $this.storyWords.setSection($this.model.story.intro);
        // $this.storyWords.setStyle('bubble');
        $this.storyWords.highlightWords($this.alphaRange.selectedElements);

    });
};

window.addEventListener("load", function () {

    var c = new Controller();

}); /*
goatstone.alphacronke.model.Model
        <h3>Goatstone: AlphaCronke</h3>
        <p>Experimental text viewing with the story, 'Dickory Cronke' by Daniel Defoe. </p>
        <address class="author">Goatstone 2014</address>
        <a href="/about/" target="new">More Info...</a>
        <p id="message-main"></p>

* */

function Model(){
    this.story = {'intro':null, 'partOne':null, 'partTwo':null, 'partThree':null};
    this.about = {
    	title: "AlphaCronke", 
    	description: "Experimental text viewing with the story, 'Dickory Cronke' by Daniel Defoe.", 
    	author:'Goatstone 2014', 
    	moreLink:'/about'
    };
}  /*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectSize(rootDiv) {

	var $root = this.setRoot(rootDiv);

    var $this = this;
    $root.querySelector('input').addEventListener('change', function (e) {
	   $this.select(e.target.value);
     });

}

SelectSize.prototype = Object.create(Component.prototype); /*
 goatstone.alphacronke.ui.component.SelectStyle

 */

function SelectStyle(rootDiv) {

	var $root = this.setRoot(rootDiv);

    var $this = this;
    $root.addEventListener('change', function (e) {

	   $this.select(this.value);
  
     });

}

SelectStyle.prototype = Object.create(Component.prototype); /*
 goatstone.alphacronke.ui.component.StoryPartSelect

 */

function StoryPartSelect(rootDiv) {

    var $root = this.setRoot(rootDiv);
    var $this = this;
    $root.addEventListener('change', function (e) {
       $this.select(this.value);
      });
}

StoryPartSelect.prototype = Object.create(Component.prototype);
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

};
StoryWords.prototype.setSize = function(size){
    this.size = size;
    this.generateBubbleWord(Number(size));
};
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
    var blackList = ['', 'a', 'the', 'and', 'in', 'of', 'to', 'that', 'is', 'be', 'if', 'as', 'his', 'this'];
    this.sectionsWords.forEach(function (e, i) {
        e.forEach(function (e, i) {
            if(blackList.indexOf(e) !== -1 ){}
            else if (!bwd[e.toLowerCase()]) {
                bwd[e.toLowerCase()] = 1;
            }
            else {
                bwd[e.toLowerCase()]++;
            }
        });
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

};
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

    var para = d3.select("#story_words").selectAll("p")
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
    this.reString = filteredStr.split("").join("|");
    this.words.html(  function (d, i) {
        var d2 =d.replace( new RegExp("(" + $this.reString + ")", "ig" ), '<em style="color:#f40">$1</em>');
        return d2;
    });
 };

StoryWords.prototype.clearContent = function(){
    d3.select("#story_words").selectAll("p").remove();
    d3.select("body").selectAll("svg.bubble").remove();
};
 /*
 goatstone.alphacronke.ui.panel.MessagePanel

 */

function MessagePanel(rootDiv) {

    this.setDom(rootDiv);

}

MessagePanel.prototype = Object.create(Panel.prototype) ;

 /*
 goatstone.ui.component.ActionBar

 */

function ActionBar(settings) {
 
    this.$showMenu = document.querySelector('#action-bar .icon-overflow');
    this.initActionBar();

    this.actionMenu = new ActionMenu(settings);

}
// init the ActionBar and its ActionMenu
ActionBar.prototype.initActionBar = function () {
    var $this = this;

    // actionBar
    this.$showMenu.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        if ($this.actionMenu.$root.style.visibility !== 'visible') {
            $this.actionMenu.$root.style.visibility = 'visible';
        }
        else {
            $this.actionMenu.$root.style.visibility = 'hidden';
        }
        return true;
    });

};


 /*
 goatstone.ui.component.ActionMenu

 */

function ActionMenu(actionMenuModel) {

    var $this = this;
    this.$root = document.querySelector('#action-menu');
    this.$body = document.querySelector('body');

    for (var i = 0; i < actionMenuModel.length; i++) {
        var tN = document.createTextNode(actionMenuModel[i].title);
        var li = document.createElement('LI');
        var indexAttr = document.createAttribute("data-index");
        indexAttr.value = i;
        li.setAttributeNode(indexAttr);
        li.appendChild(tN);
        this.$root.querySelector('ul.action-menu-main').appendChild(li);    
    }
    
    this.$root.querySelector('ul').addEventListener("click",function(e){
        var liIndex = e.target.dataset.index ;
        actionMenuModel[liIndex].action();
    });

    this.$body.addEventListener('mousedown', function () {
        if ($this.$root.style.visibility === 'visible') {
            $this.$root.style.visibility = 'hidden';
        }
    });

    this.$root.addEventListener('mousedown', function (e) {
        e.stopPropagation();
    });

}


 /*
 goatstone.ui.component.AlphaRange

 * A Widget that presents the user with the letters of the alphabet and
 * enables selection of a range of letters.
 * Goatstone : 5.20.2014
 * */

function AlphaRange(rootDiv ) {

    this.config = {
        width: 410,
        height: 35,
        color: d3.rgb(30, 30, 30),
        scaleSymbols: {
            colorOn: d3.rgb(255, 255, 255),
            colorOff: d3.rgb(0, 0, 0),
            listStartX: 20,
            listWidth: 390
        },
        selector: {
            arc: {
                color: d3.rgb(20, 100, 225), //30,100,255
                opacity: 0.6
            },
            selectedWindow: {
                color: d3.rgb(250, 0, 0),
                opacity: 0.3
            }
        }
    };
    this.dDivDims = [
        {x: 20, y: window.innerHeight - 140}
    ];

    var $root = this.setRoot(rootDiv);
    // this.$root = document.querySelector('#dd');
    // this.$body = document.querySelector('body');
    // this.$handle = this.$root.querySelector('.handle');

    this.ordinalScale;
    this.ordinalGroup;
    this.linearScale;

    this.brush;
    this.initExtent = [0.5, 0.9];
    this.onSelectCallback = null;

    this.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    this.selectedElements = "";
    this.prevSelectedElements = null;


    this.linearScale = d3.scale.linear().range([20, 390]);
    this.ordinalScale = d3.scale
        .ordinal()
        .domain(this.alphabet)
        .rangeBands([0, 1], 0, 0);

    this.initDraw();

    // call the parent Panel setDrag()
//    this.setDrag();
    this.setSelectedElements();

}

AlphaRange.prototype = Object.create(Component.prototype);

AlphaRange.prototype.initDraw = function(){
    var $this  =this;
    var brushArc;
    var brushGroup;
    var svgTag;

    this.$root.style.left = this.dDivDims[0].x + "px";
    this.$root.style.top = this.dDivDims[0].y + 'px';
//    this.$root.style.visibility = 'visible';

    var dDiv = d3.select("#dd")
        .selectAll("div#alpha-range")
        .data(this.dDivDims)
        .enter().append("div");

    dDiv.append("div")
        .attr("id", "scale_background");


    svgTag = d3.select("#dd")
        .append("svg")
        .attr("width", this.config.width)
        .attr("height", this.config.height)
        .style({
            "left": "0px",
            "top": "7px",
            "position": "relative",
            "opacity": 0.5
        });

    // SVG group to represent the ordinal scale
    this.ordinalGroup = svgTag.append("g");
    this.ordinalGroup
        .selectAll("text")
        .data(this.alphabet)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d) {
            return  20+ $this.ordinalScale(d) * 363;
        })
        .attr("y", function (d) {
            return $this.config.height / 2;
        })
        .attr("fill", this.config.scaleSymbols.colorOff);

    // Assemble the d3 brush, the selector component.
    this.brush = d3.svg.brush()
        .x(this.linearScale)
        .extent(this.initExtent)
        .on("brush", function () {
            // $this.setSelectedElements();
            return 1;
        })
        .on("brushstart", function () {
            return 1;
        })
        .on("brushend", function () {
            $this.setSelectedElements();
            return 1;
        });
    brushArc = d3.svg.arc()
        .outerRadius(35 / 2)
        .startAngle(0)
        .endAngle(function (d, i) {
            return i ? -Math.PI : Math.PI;
        });
    brushGroup = svgTag.append("g")
        .attr("fill", this.config.selector.arc.color)
        .attr("fill-opacity", this.config.selector.arc.opacity)
        .call($this.brush);
    brushGroup.selectAll(".resize").append("path")
        .attr("transform", "translate(0," + ( (this.config.height / 2)  ) + ")")
        .attr("d", brushArc);

    brushGroup.selectAll("rect")
        .attr("fill", this.config.selector.selectedWindow.color)
        .attr("fill-opacity", this.config.selector.selectedWindow.opacity)
        .attr("height", this.config.height)
        .attr("y", 0);

};
AlphaRange.prototype.draw = function () {
    var $this = this;
    this.ordinalGroup
        .selectAll("text")
        .text(function (d) {
            return  d;
        })
        .attr("fill", function (d) {
            if ($this.selectedElements.indexOf(d) !== -1) {
                return 'red';
            }
            else {
                return 'black';
            }
        });
};
AlphaRange.prototype.addSelectListener = function (callBack) {
    this.onSelectCallback = callBack;
};
AlphaRange.prototype.setSelectedElements = function () {
    var $this = this;
    var brushExtent = this.brush.extent();
    this.selectedElements = '';
    this.alphabet.forEach(function (e, i) {
        if ($this.ordinalScale(e) >= brushExtent[0] && $this.ordinalScale(e) <= brushExtent[1]) {
            $this.selectedElements += e;
        }
    });
    if(this.selectedElements === this.prevSelectedElements){
        return;
    }
    this.prevSelectedElements = this.selectedElements;
    if (this.onSelectCallback !== null) {
        this.onSelectCallback($this.selectedElements);
    }
    this.draw();
};

 /*
 goatstone.ui.component.Compoment.js

 */

function Component() {
 }
 Component.prototype.setRoot = function(rootDiv){

    this.$root = document.querySelector(rootDiv);
    this.show();
    return this.$root;
 };
Component.prototype.show = function(){

    this.$root.style.visibility = 'visible';

};
 Component.prototype.hide = function(){

    this.$root.style.visibility = 'hidden';

};
Component.prototype.select = function(selection){

    this.callback(selection);

};
Component.prototype.setCallback = function(callback){

    this.callback = callback;

};  /*
 goatstone.ui.component.Message
 extends Component

 */

function Message(rootDiv) {

	this.setRoot(rootDiv);

}

Message.prototype = Object.create(Component.prototype);

Message.prototype.set = function(msg){
    this.$root.innerHTML = msg;
};

 /*
 goatstone.ui.container.Panel.js
 
 */

function Panel(rootDiv, settings) {

    if(rootDiv){

        this.$root = document.querySelector(rootDiv);
        var handleWidth = this.$root.offsetWidth - 40;

        this.$handle = this.$root.querySelector('.handle');
        this.$body = document.querySelector('body');


        if( typeof settings === 'object' && settings.handleBg){
            this.$handle.appendChild(settings.handleBg());
        }
        else{
            this.$handle.appendChild(this.defaultBackground({
                width:handleWidth
            }));                
        }   
        if( typeof settings === 'object' && settings.closeIcon){
            this.$handle.appendChild(settings.closeIcon());
        }   
        else{
            this.$handle.appendChild(this.defaultCloseButton());                
        }   
     
        this.setDrag();
        this.show();
    }
}
Panel.prototype.show = function(){
    this.$root.style.visibility = 'visible';
    for(var i=0; i< this.$root.children.length; i++){
        this.$root.children[i].style.visibility = 'visible';
    }
};
 Panel.prototype.hide = function(){
    this.$root.style.visibility = 'hidden';
    for(var i=0; i< this.$root.children.length; i++){
        this.$root.children[i].style.visibility = 'hidden';
    }
};
Panel.prototype.position = function(x,y){
    this.$root.style.left =   x+'px';
    this.$root.style.top =   y+'px';
 };
// setDrag
Panel.prototype.setDrag = function () {

    this.mOffsets = [];
    this.handleEvent = function (e) {
        switch (e.type) {
            case 'mousedown':
                this.mOffsets[0] = e.clientX - this.$root.offsetLeft;
                this.mOffsets[1] = e.clientY - this.$root.offsetTop;
                this.$body.addEventListener('mousemove', this, false);
                break;
            case 'mousemove':
                this.$root.style.left = (e.clientX - this.mOffsets[0]) + 'px';
                this.$root.style.top = (e.clientY - this.mOffsets[1]) + 'px';
                break;
            case 'mouseup':
                this.$body.removeEventListener('mousemove', this, false);
                break;
        }
    };
    this.$handle.addEventListener('mousedown', this, false);
    this.$handle.addEventListener('mouseup', this, false);

};
Panel.prototype.defaultBackground = function (settings) {
    var width = settings.width; 
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var y = 2;
    var linesTotal = 4;

    svg.setAttribute("width", width);
    svg.setAttribute("height", "30");
    svg.setAttribute("stroke", "blue");
    svg.style.strokeWidth = "2px";
    svg.style.position = "absolute";
    svg.style.top = "0px";
    svg.style.left = "0px";
    svg.style.cursor = "move";

    while(linesTotal > 0){
        var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute("x1", "0");
        line.setAttribute("y1", y);
        line.setAttribute("x2", width);
        line.setAttribute("y2", y);

        svg.appendChild(line);
        linesTotal--;
        y += 5;

    }
    return svg;
};
Panel.prototype.defaultCloseButton = function () {

    var $this = this;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute("class", "close-button");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.style.stroke = "#955";
    svg.style.strokeWidth = "5px";

    svg.addEventListener('click', function () {
        $this.hide();

    });

    var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "0");
    line.setAttribute("x2", "20");
    line.setAttribute("y2", "20");
    line.style.strokeWidth = "5px";

    var line2 = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    line2.setAttribute("x1", "20");
    line2.setAttribute("y1", "0");
    line2.setAttribute("x2", "0");
    line2.setAttribute("y2", "20");
    line2.style.strokeWidth = "5px";

    svg.appendChild(line);
    svg.appendChild(line2);

    return svg;
};
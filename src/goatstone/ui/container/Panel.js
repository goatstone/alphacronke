/*
 goatstone.ui.container.Panel.js

 */

function Panel(rootDiv, settings) {

    if (rootDiv) {

        this.$root = document.querySelector(rootDiv);
        var handleWidth = this.$root.offsetWidth - 40;

        this.$handle = this.$root.querySelector('.handle');
        this.$body = document.querySelector('body');


        if (typeof settings === 'object' && settings.handleBg) {
            this.$handle.appendChild(settings.handleBg());
        }
        else {
            this.$handle.appendChild(this.defaultBackground({
                width: handleWidth
            }));
        }
        if (typeof settings === 'object' && settings.closeIcon) {
            this.$handle.appendChild(settings.closeIcon());
        }
        else {
            this.$handle.appendChild(this.defaultCloseButton());
        }
        // x and y setting if they exist
        if (typeof settings === 'object' && settings.x) {
            this.$root.style.left = settings.x + 'px';
        }
        if (typeof settings === 'object' && settings.y) {
            this.$root.style.top = settings.y + 'px';
        }

        this.setDrag();
        this.show();
    }
}
/* subscribe expects and object in this form:
[{
    topic: 'mode',
    callback: function (topic, data) {
        console.log('A topic message has been sent');
    }
}];
*/
Panel.prototype.subscribe = function (topics) {
    PubSub.subscribe(topics[0].topic, function (topic, data) {
        topics[0].callback(topic, data);
    });
};
Panel.prototype.show = function () {
    this.$root.style.visibility = 'visible';
    for (var i = 0; i < this.$root.children.length; i++) {
        this.$root.children[i].style.visibility = 'visible';
    }
};
Panel.prototype.hide = function () {
    this.$root.style.visibility = 'hidden';
    for (var i = 0; i < this.$root.children.length; i++) {
        this.$root.children[i].style.visibility = 'hidden';
    }
};
Panel.prototype.position = function (x, y) {
    this.$root.style.left = x + 'px';
    this.$root.style.top = y + 'px';
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

    while (linesTotal > 0) {
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
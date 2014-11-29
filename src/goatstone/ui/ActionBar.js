/*
 goatstone.ui.component.ActionBar
 */

define([  "Component", "klass"], function (Component, klass, PubSub) {

    var ActionBar = Component.extend({
        initialize: function (rootDiv) {
            this.supr(rootDiv);
            var self = this;
            this.$root.addEventListener('click', function () {
                self.publish('actionMenu', {value: "toggle"});
            });
            this.drawBackground();
        },
        drawBackground: function () {
            var b = document.createElement('button');
            var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            var y = 2;
            var linesTotal = 4;
            while (linesTotal > 0) {
                var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
                line.setAttribute("x1", "0");
                line.setAttribute("y1", y);
                line.setAttribute("x2", 23);
                line.setAttribute("y2", y);
                svg.appendChild(line);
                linesTotal--;
                y += 6;
            }
            b.appendChild(svg);
            this.$root.appendChild(svg);
        }
    });
    return ActionBar;

});
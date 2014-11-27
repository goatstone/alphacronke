/*      goatstone.ui.container.Panel
 */

define(['Component'], function (Component) {

    var Panel = Component.extend({
        initialize: function (rootDiv, settings) {
            this.supr(rootDiv);
            var self = this;
            this.$handle = document.createElement('div');
            this.$handle.className = 'handle';
            var $cancelIcon = document.createElement('div');
            $cancelIcon.className = 'cancel-icon';
            $cancelIcon.addEventListener('click', function () {
                self.hide();
            });
            $cancelIcon.appendChild(this.defaultCloseButton());
            this.$root.appendChild(this.$handle);
            this.$root.appendChild($cancelIcon);
            this.$body = document.querySelector('body');
            this.x = 10;
            this.y = 10;
            var handleWidth = this.$root.offsetWidth - 40;
            if (settings && settings.x) {
                this.x = settings.x;
            }
            if (settings && settings.y) {
                this.y = settings.y;
            }
            this.position(this.x, this.y);
            this.setDrag();
        },
        position: function (x, y) {
            this.$root.style.left = x + 'px';
            this.$root.style.top = y + 'px';
        },
        setDrag: function () {
            var mOffsets = [];
            this.handleEvent = function (e) {
                var eventType = e.type;
                var x;
                var y;
                var xTouchStart;
                var yTouchStart;
                if (eventType === 'mousedown') {
                    x = e.clientX;
                    y = e.clientY;
                    mOffsets[0] = x - this.$root.offsetLeft;
                    mOffsets[1] = y - this.$root.offsetTop;
                    this.$body.addEventListener('mousemove', this, false);
                }
                if (eventType === 'touchstart') {
                    xTouchStart = e.targetTouches[0].clientX;
                    yTouchStart = e.targetTouches[0].clientY;
                    mOffsets[0] = xTouchStart - this.$root.offsetLeft;
                    mOffsets[1] = yTouchStart - this.$root.offsetTop;
                    this.$body.addEventListener('touchmove', this, false);
                }
                if (eventType === 'mousemove') {
                    x = e.clientX;
                    y = e.clientY;
                    // this.position()
                    this.$root.style.left = (x - mOffsets[0]) + 'px';
                    this.$root.style.top = (y - mOffsets[1]) + 'px';
                }
                if (eventType === 'touchmove') {
                    // this.position()
                    var touch = e.targetTouches[0];
                    var tX = touch.clientX - mOffsets[0];
                    var tY = touch.clientY - mOffsets[1];
                    this.$root.style.left = tX + 'px';
                    this.$root.style.top = tY + 'px';
                    e.preventDefault();
                }
                if (eventType === 'mouseup') {
                    this.$body.removeEventListener('mousemove', this, false);
                }
                if (eventType === 'touchend') {
                    this.$body.removeEventListener('touchmove', this, false);
                }
            };
            this.$handle.addEventListener('mousedown', this, false);
            this.$handle.addEventListener('mouseup', this, false);
            this.$handle.addEventListener("touchstart", this, false);
            this.$handle.addEventListener("touchend", this, false);
        },
        defaultCloseButton: function () {
            var $this = this;
            var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            svg.setAttribute("class", "close-button");
            svg.setAttribute("width", "20");
            svg.setAttribute("height", "20");
            svg.style.stroke = "#955";
            svg.style.strokeWidth = "5px";
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
        }
    });

    return Panel;
});



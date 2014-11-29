/*      goatstone.ui.container.Panel
 */

define(['Component'], function (Component) {

    var Panel = Component.extend({
        initialize: function (rootDiv, settings) {
            this.supr(rootDiv);
            var self = this;
            this.$handle = document.createElement('div');
            this.$handle.className = 'handle';
            this.$handle.setAttribute('tabIndex', 1);
            this.$handle.addEventListener('focus', function (e) {
                self.setKeyMove();
            });
            this.$handle.addEventListener('blur', function (e) {
                this.removeEventListener('keydown');
            });
            var $cancelIcon = document.createElement('button');
            $cancelIcon.className = 'cancel-icon';
            $cancelIcon.addEventListener('click', function () {
                self.hide();
            });
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
        setKeyMove: function (e) {
            var self = this;
            this.$handle.addEventListener('keydown', function (e) {
                var keyCode = e.keyCode;
                var x = self.$root.offsetLeft;
                var y = self.$root.offsetTop;
                var increment = 7;
                if (keyCode === 37) { // LEFT
                    self.position(x - increment, y);
                    e.preventDefault();
                }
                if (keyCode === 39) { // RIGHT
                    self.position(x + increment, y);
                    e.preventDefault();
                }
                if (keyCode === 38) { // UP
                    self.position(x, y - increment);
                    e.preventDefault();
                }
                if (keyCode === 40) { // DOWN
                    self.position(x, y + increment);
                    e.preventDefault();
                }
            });
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
                    this.position(x - mOffsets[0], y - mOffsets[1]);
                }
                if (eventType === 'touchmove') {
                    var touch = e.targetTouches[0];
                    var tX = touch.clientX - mOffsets[0];
                    var tY = touch.clientY - mOffsets[1];
                    this.position(tX, tY);
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
        }
    });

    return Panel;
});



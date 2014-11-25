/*
 goatstone.ui.component.ActionBar
 */

define(['ActionMenu', "Component", "klass"], function (ActionMenu, Component, klass) {

    var ActionBar = Component.extend({
        initialize: function (rootDiv, menuItems) {
            this.supr(rootDiv);
            var actionMenu = document.querySelector('div#action-menu');
            var ul = actionMenu.querySelector('ul');
            var isFocused = false;
            menuItems.forEach(function (el) {
                var li = document.createElement('li');
                var button = document.createElement('button');
                var txt = document.createTextNode(el.title)
                button.appendChild(txt);
                button.addEventListener('click', function () {
                    el.action();
                    actionMenu.style.visibility = 'hidden';
                });
                button.addEventListener('focus', function () {
                    isFocused = true;
                });
                button.addEventListener('blur', function () {
                    // check to see if the other buttons are focused,
                    // if not, close the menu
                    isFocused = false;
                    setTimeout(function () {
                        if (!isFocused) {
                            actionMenu.style.visibility = 'hidden';
                        }
                    }, 200);
                });
                li.appendChild(button);
                ul.appendChild(li);
            });
            this.$root.addEventListener('click', function () {
                // toggle
                if (actionMenu.style.visibility == 'visible') {
                    actionMenu.style.visibility = 'hidden';
                } else {
                    actionMenu.style.visibility = 'visible';
                    ul.querySelector('button').focus();
                }
            })
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
/*
 goatstone.alphacronke.ui.component.SelectSize

 * */

define(["Component" ], function (Component) {

    var Menu = Component.extend({
        initialize: function (rootDiv, menuItems) {
            this.supr(rootDiv);
            this.ul = this.$root.querySelector('ul');
            var isFocused = false;
            var self = this;
            menuItems.forEach(function (el) {
                var li = document.createElement('li');
                var button = document.createElement('button');
                var txt = document.createTextNode(el.title);
                li.addEventListener('click', function () {
                    var b = this.querySelector('button');
                    b.focus();
                });
                button.appendChild(txt);
                button.addEventListener('click', function () {
                    el.action();
                    self.hide();
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
                            self.hide();
                        }
                    }, 200);
                });
                li.appendChild(button);
                self.ul.appendChild(li);
            });
            this.ul.querySelector('button').focus();
        },
        show: function () {
            this.supr();
            this.ul.querySelector('button').focus();
        }
    });
    return Menu;
});
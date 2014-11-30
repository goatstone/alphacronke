/*         goatstone.ui.WaitNotify
*/

define(["Component"], function (Component) {

    var WaitNotify = Component.extend({
        initialize: function (rootDiv, setting) {
            this.supr(rootDiv);
        }
    });

    return WaitNotify;
});

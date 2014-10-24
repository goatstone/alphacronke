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



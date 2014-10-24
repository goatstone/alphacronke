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
        li.appendChild(tN);
        this.$root.querySelector('ul.action-menu-main').appendChild(li);

        (function (_td, i) {
            _td.addEventListener('click', function(e ){
                e.stopPropagation();
                actionMenuModel[i].action()  ;
                $this.$root.style.visibility = 'hidden';
            });
        })(li, i);
    }

    this.$body.addEventListener('mousedown', function () {
        if ($this.$root.style.visibility === 'visible') {
            $this.$root.style.visibility = 'hidden';
        }
    });
    this.$root.addEventListener('mousedown', function (e) {
        e.stopPropagation();
    });

}



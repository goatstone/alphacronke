/*
 goatstone.ui.component.ActionMenu

 */

define([], function () {

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

        this.$root.querySelector('ul').addEventListener("click", function (e) {
            var liIndex = e.target.dataset.index;
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

    return ActionMenu;
});





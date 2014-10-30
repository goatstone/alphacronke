/*
 goatstone.ui.component.Compoment.js

 */

function Component() {
 }
 Component.prototype.setRoot = function(rootDiv){

    this.$root = document.querySelector(rootDiv);
    this.show();
    return this.$root;
 };
Component.prototype.show = function(){

    this.$root.style.visibility = 'visible';

};
 Component.prototype.hide = function(){

    this.$root.style.visibility = 'hidden';

};

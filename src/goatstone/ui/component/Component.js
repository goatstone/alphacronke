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
/* subscribe expects and object in this form:
 [{
 topic: 'mode',
 callback: function (topic, data) {
 console.log('A topic message has been sent');
 }
 }];
 */
Component.prototype.subscribe = function (topics) {
    PubSub.subscribe(topics[0].topic, function (topic, data) {
        topics[0].callback(topic, data);
    });
};
Component.prototype.show = function(){

    this.$root.style.visibility = 'visible';

};
 Component.prototype.hide = function(){

    this.$root.style.visibility = 'hidden';

};

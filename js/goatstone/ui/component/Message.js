/*
 goatstone.ui.component.Message

 */

function Message() {

    var dDivDims =  {x: window.innerWidth - 350, y: window.innerHeight  - 140};

    this.$root = document.querySelector('#message');
    this.$body = document.querySelector('body');
    this.$handle = this.$root.querySelector('.handle');

    this.$root.style.visibility = 'visible';
    this.$root.style.top =   dDivDims.y+'px';
    this.$root.style.left =  dDivDims.x+'px';

    this.setDrag();
}

Message.prototype = Object.create(Panel.prototype);

Message.prototype.set = function(msg){
    this.$root.querySelector("#message-main").innerHTML = msg;
};


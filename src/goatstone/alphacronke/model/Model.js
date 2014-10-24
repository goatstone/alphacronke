/*
goatstone.alphacronke.model.Model
        <h3>Goatstone: AlphaCronke</h3>
        <p>Experimental text viewing with the story, 'Dickory Cronke' by Daniel Defoe. </p>
        <address class="author">Goatstone 2014</address>
        <a href="/about/" target="new">More Info...</a>
        <p id="message-main"></p>

* */

function Model(){
    this.story = {'intro':null, 'partOne':null, 'partTwo':null, 'partThree':null};
    this.about = {
    	title: "AlphaCronke", 
    	description: "Experimental text viewing with the story, 'Dickory Cronke' by Daniel Defoe.", 
    	author:'Goatstone 2014', 
    	moreLink:'/about'
    };
} 
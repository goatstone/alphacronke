/*
    goatstone.alphacronke.model.Model

* */

 define([], function(){

    function Model(){
        this.story = {'intro':null, 'partOne':null, 'partTwo':null, 'partThree':null};
        this.about = {
            title: "AlphaCronke",
            description: "Experimental text viewing with the story, 'Dickory Cronke' by Daniel Defoe.",
            author:'Goatstone 2014',
            moreLink:'/about'
        };
    }

    return Model;
});

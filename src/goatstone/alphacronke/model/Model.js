/*
 goatstone.alphacronke.model.Model

 * */

define([], function () {

    function Model() {
        this.story = {'intro': null, 'partOne': null, 'partTwo': null, 'partThree': null};
        this.about = {
            title: "AlphaCronke",
            description: "Experimental text viewing with the story, 'Dickory Cronke' by Daniel Defoe.",
            author: 'Goatstone 2014',
            moreLink: '/about'
        };
        this.control = {
            mode: {
                label: "Select a mode:",
                options: [
                    {value: 'bubble', label: "Bubble"},
                    {value: 'alphaSelect', label: "Word Select"}
                ]},
            section: {
                label: "Select a section ",
                options: [
                    {value: 'intro', label: "Intro and Preface"},
                    {value: 'partOne', label: "Part I"},
                    {value: 'partTwo', label: "Part II"},
                    {value: 'partThree', label: "Part III"}
                ]
            }
        }
    }

    return Model;
});

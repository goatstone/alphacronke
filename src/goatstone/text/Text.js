/*
 goatstone.text.Text

 Process a text document into a 'story' a data structure that will
 be used by D3 libraries to display the words.

 Usage:
 new Text()
 .processStory(textDocument)
 .then(function(story){
 model.story = story;
 })
 * * */

var Text = klass({
    processStory: function (textToProcess) {

        return new Promise(function (resolve, reject) {
            var story = {};
            var sections = [];
            var txtStart = 738;
            var textEnd = 59570;
            var storyText = textToProcess.substr(txtStart, textEnd);
            // remove \r characters
            storyText = storyText.replace(/\r/g, "");
            // chang all single \n into a single space
            storyText = storyText.replace(/([^\n])[\n]([^\n])/g, '$1 $2');
            sections = storyText.split(/[\n][\n]/g);
            story.intro = sections.slice(0, 16);
            story.partOne = sections.slice(17, 74);
            story.partTwo = sections.slice(75, 129);
            story.partThree = sections.slice(130, 172);
            sections = null;
            storyText = null;

            resolve(story);
        });
    }
});
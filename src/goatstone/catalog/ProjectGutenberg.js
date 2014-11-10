//  ProjectGutenberg

define(["XHR"], function (XHR) {

    function ProjectGutenberg() {
    }

    ProjectGutenberg.prototype.get = function (url) {

        return new XHR().get(url);
    };

    return ProjectGutenberg;

});


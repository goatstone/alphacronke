
//  ProjectGutenberg

function ProjectGutenberg(){
}
ProjectGutenberg.prototype.get = function(url){

	return new XHR().get(url);
};

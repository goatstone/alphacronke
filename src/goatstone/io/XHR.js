//  XHR
function XHR(){
}
XHR.prototype.get = function(url){

	return new Promise(function(resolve, reject) {

		$.get(url)
		.then(function(data, textStatus, jqXHR){
			resolve(data);	
		},function(jqXHR, textStatus, errorThrown ){
			reject( textStatus );
		});
					
	});

};

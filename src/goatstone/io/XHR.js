//  XHR
function XHR() {
}
XHR.prototype.get = function (url) {

    return new Promise(function (resolve, reject) {

        reqwest(url, function (resp) {
            resolve(resp);
        });

    });

};

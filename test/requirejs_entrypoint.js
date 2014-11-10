/* global mocha */
require([], function () {

	require.config({
//        baseUrl: '../src',
        paths: {
			chai: "vendor/chai/chai"
		}
	});

	require([
		"chai"
	], function (chai) {
		chai.should();
		window.expect = chai.expect;
		mocha.setup("bdd");

		require([
            "example_test.js"
		], function () {
			mocha.run();
		});
	});

});
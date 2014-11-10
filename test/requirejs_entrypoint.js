/* global mocha */
require([], function () {

	require.config({
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
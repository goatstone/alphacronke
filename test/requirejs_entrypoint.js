/* global mocha */
require([], function () {

	require.config({
        baseUrl: '../src',
        paths: {
			chai: "../test/vendor/chai/chai",
            D3:                 'vendor/d3',
            klass:              "vendor/klass",
            Promise:            'vendor/bluebird',
            PubSub:             'vendor/pubsub',
            reqwest:            'vendor/reqwest',

            Model:              'goatstone/alphacronke/model/Model',
            Controller:         'goatstone/alphacronke/Controller',
            BubbleText:         'goatstone/alphacronke/ui/component/BubbleText',
            LineText:           'goatstone/alphacronke/ui/component/LineText',
            SelectSize:         'goatstone/alphacronke/ui/component/SelectSize',
            SelectStyle:        'goatstone/alphacronke/ui/component/SelectStyle',
            StoryPartSelect:    'goatstone/alphacronke/ui/component/StoryPartSelect',

            Message:            'goatstone/ui/component/Message',
            AlphaRange:         'goatstone/ui/component/AlphaRange',
            Component:          'goatstone/ui/component/Component',
            ActionBar:          'goatstone/ui/component/ActionBar',
            ActionMenu:         'goatstone/ui/component/ActionMenu',
            Panel:              'goatstone/ui/container/Panel',
            ProjectGutenberg:   'goatstone/catalog/ProjectGutenberg',
            Text:               "goatstone/text/Text",
            XHR:                'goatstone/io/XHR'
		}
	});

	require([
		"chai"
	], function (chai) {
		chai.should();
		window.expect = chai.expect;
		mocha.setup("bdd");

		require([
            "example_test.js",
            'text.js'
		], function () {
			mocha.run();
		});
	});

});
require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
		classy :"lib/classy",
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
		modernizr: "lib/modernizr_custom",
        pixi: "lib/pixi",
        "socket.io": "/socket.io/socket.io"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        "socket.io": {
            exports: "io"
        },
		"modernizr": {
            exports: 'Modernizr'
        }
    }
});

define([
    'router'
], function(
    router
){
    Backbone.history.start();
});

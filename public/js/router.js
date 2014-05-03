define([
    'backbone',
    'views/main',
    'views/game',
    'views/scoreboard',
	'views/gameover',
	'views/viewManager'
], function(
	Backbone,
	main,
	game,
	scoreboard,
	gameover,
	viewManager
){

    var Router = Backbone.Router.extend({
			
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions',
        },
		initialize: function () {
			console.log('router::initialize');
			viewManager.handle(scoreboard);
			viewManager.handle(main);
			viewManager.handle(game);
			viewManager.handle(gameover);
        },
        defaultActions: function () {
            console.log("router::main");
            main.show();
        },
        gameAction: function () {
            console.log("router::game");
            game.show();
        },
        scoreboardAction: function () {
            console.log("router::scoreboard");
            scoreboard.show();
        }

    });

    return new Router();
});
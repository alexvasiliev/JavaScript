define([
    'backbone',
    'views/main',
    'views/game',
    'views/scoreboard',
	'views/gameover',
	'views/viewManager',
    'views/joystick'
], function(
	Backbone,
	main,
	game,
	scoreboard,
	gameover,
	viewManager,
    joystick
){

    var Router = Backbone.Router.extend({
			
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'joystick': 'joystickAction',
            '*default': 'defaultActions'
        },
		initialize: function () {
			console.log('router::initialize');
			viewManager.handle(scoreboard);
			viewManager.handle(main);
			viewManager.handle(game);
			viewManager.handle(gameover);
            viewManager.handle(joystick);
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
        },
        joystickAction: function() {
            console.log("router::joystick");
            joystick.show();
        }

    });

    return new Router();
});
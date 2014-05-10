define([
    'backbone',
    'tmpl/game',
	'views/gameover',
	'game/game'
], function(
    Backbone,
    tmpl,
	gameover,
	Game
){

    var GameView = Backbone.View.extend({

        template: tmpl,
		viewName: 'GameScreenView',
		container: document.createElement("div"),

        initialize: function () {
			this.container.id = this.viewName;
			this.container.style.display = "none";
			document.body.appendChild(this.container);
			this.render();
        },
		postRenderInitialize: function () {
			$(document).on('game::over', function(event, s){console.log(event); console.log(s); gameover.show(s);});
		},
        render: function () {
			$('#'+this.viewName).html(this.template());
			this.postRenderInitialize();
        },
        show: function () {
            console.log("game::show");
			this.container.style.display = "block";
			this.trigger("view::show");
			this.game = Game();
        },
        hide: function () {
            console.log("game::hide");
			this.container.style.display = "none";
        }
    });

    return new GameView();
});
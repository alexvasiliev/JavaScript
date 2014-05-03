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
			this.container.setAttribute('style', 'display:none');
			document.body.appendChild(this.container);
			this.render();
			this.game = Game();
        },
		postRenderInitialize: function () {
			//document.getElementById('gameover_test').onclick = function(){gameover.show();};
			$('body').on('game::over', function(event, s){console.log(event); console.log(s); gameover.show(s);});
		},
        render: function () {
			$('#'+this.viewName).html(this.template());
			this.postRenderInitialize();
        },
        show: function () {
            console.log("game::show");
			this.container.setAttribute('style', 'display:visible');
			this.trigger("view::show");
			this.game.startNew();
        },
        hide: function () {
            console.log("game::hide");
			this.container.setAttribute('style', 'display:none');
			this.game.stop();
        }
    });

    return new GameView();
});
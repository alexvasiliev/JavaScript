define([
    'backbone',
    'tmpl/game',
	'views/gameover',
	'game/game',
    'tmpl/console'
], function(
    Backbone,
    tmpl,
	gameover,
	Game,
    consol
){

    var GameView = Backbone.View.extend({

        template: tmpl,
        con:consol,
		viewName: 'GameScreenView',
		container: document.createElement("div"),

        initialize: function () {

            $(this.className).html(this.con());
            require(['console'], function (console) {
                
            });
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
                $("#console").hide();
        },
        hide: function () {
            console.log("game::hide");
			this.container.setAttribute('style', 'display:none');
			this.game.stop();
        }
    });

    return new GameView();
});
define([
    'backbone',
    'tmpl/game',
	'views/gameover',
	'modernizr',
	'game/game'
], function(
    Backbone,
    tmpl,
	gameover,
	Modernizr,
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
		renderSupportError: function () {
			$('#'+this.viewName).html("Sorry, your browser not supported :(");
			this.postRenderInitialize();
        },
        show: function () {
            console.log("game::show");
			if (!this.checkSupport()) {
				this.renderSupportError();
				return;
			}
			this.container.style.display = "block";
			this.trigger("view::show");
			this.game = Game();
        },
        hide: function () {
            console.log("game::hide");
			this.container.style.display = "none";
        },
		checkSupport: function() {
			console.log("Checking browser support");
			return ((Modernizr.canvas && Modernizr.canvastext) || Modernizr.webgl)  && Modernizr.localstorage;
		}
		
    });

    return new GameView();
});
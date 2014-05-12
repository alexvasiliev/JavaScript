define([
    'backbone',
    'tmpl/game',
	'views/gameover',
	'modernizr',
	'game/game',
    'tmpl/console'
], function(
    Backbone,
    tmpl,
	gameover,
	Modernizr,
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
			this.container.style.display = "none";
			document.body.appendChild(this.container);
			if (this.checkSupport()) {
				this.render();
			} else {
				this.renderSupportError();
			}
			console.log("not null 2" + document.getElementById('token'));
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
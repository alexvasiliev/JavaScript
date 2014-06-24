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

	var consoleStatus = false;
    var GameView = Backbone.View.extend({

        template: tmpl,
        con:consol,
		viewName: 'GameScreenView',
		container: document.createElement("div"),

        initialize: function () { 
        	$(this.className).html(this.con());
            
			this.container.id = this.viewName;
			//this.container.style.display = "none";
			document.body.appendChild(this.container);
			if (this.checkSupport()) {
				this.container.setAttribute('style', 'display:none');
				document.body.appendChild(this.container);
				this.render();
				this.game = Game();
			} else {
				this.renderSupportError();
			}
        },
		postRenderInitialize: function () {
			$(document).on('game::over', function(event, s){console.log(event); console.log(s); gameover.show(s);});
		},
        render: function () {
			$('#'+this.viewName).html(this.template());
			this.postRenderInitialize();
			 $(document).on("gamestart",function(){
			 	console.log("gamestart");
                });
        },
		renderSupportError: function () {
			$('#'+this.viewName).html("Sorry, your browser not supported :(");
			this.postRenderInitialize();
        },
        show: function () {
        	if (!consoleStatus){
        		consoleStatus = true;
        		require(['console'], function (console) {
                
            	});
        	}
            console.log("game::show");
			this.container.style.display = "block";
			this.trigger("view::show");
			
			this.game.startNew();
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
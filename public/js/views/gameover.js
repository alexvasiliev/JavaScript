define([
    'backbone',
    'tmpl/gameover',
	'models/score',
	'collections/scores'
], function(
    Backbone,
    tmpl,
	Score,
	collectionScore
){
		
	function disableForm() {
		var form  = document.forms.gameover_form;
		form.elements.player_name.setAttribute('disabled', 'disabled' );
		form.elements.player_score.setAttribute('disabled', 'disabled' );
	};
	function enableForm() {
		var form  = document.forms.gameover_form;
		form.elements.player_name.removeAttribute('disabled');
		form.elements.player_score.removeAttribute('disabled');
	};

    var GameOverView = Backbone.View.extend({

        template: tmpl,
		viewName: 'GameOverScreenView',
		container: document.createElement("div"),

        initialize: function () {
			this.container.id = this.viewName;
			this.container.setAttribute('style', 'display:none');
			document.body.appendChild(this.container);
			$('body').on('gameover::scores::send::fail', this.sendError);
			$('body').on('gameover::scores::redirrect',  this.redirrectToScoreboard);
			this.render();
        },
        render: function () {
			$('#'+this.viewName).html(this.template());
			document.getElementById('gameover_form').onsubmit = this.submitHandler;
        },
        show: function (s) {
            console.log("gameover::show");
			this.prepareResults(s);
			this.container.setAttribute('style', 'display:visible');
			this.trigger("view::show");
        },
        hide: function () {
            console.log("gameover::hide");
			this.container.setAttribute('style', 'display:none');
        },
		prepareResults : function(s) {
			//var rndScore = Math.ceil(Math.random()*10E7);
			document.getElementById('score-holder').innerHTML = s;
			document.getElementById('player_score').setAttribute('value', s);			
		},
		submitHandler : function (event) {
			var form = document.forms.gameover_form;
			var playerScore = new Score({
				score: form.player_score.value,
				name : form.player_name.value.toString(),				
			});
			
			collectionScore.addScore(playerScore);
			disableForm();
			//var key = (new Date()).getTime();			
			//localStorage[key] = JSON.stringify(playerScore);
			collectionScore.sendScore(playerScore);
			enableForm();
			return false;	/*false - не отправит форму вдогонку стандартным образом*/
		},
		sendError : function() {
			alert('HTTP 400. Ошибка данных');
		},
		redirrectToScoreboard : function() {
			window.location.href = "/#scoreboard";
			collectionScore.fetch({reset : true});
		},		
		
    });

    return new GameOverView();
});
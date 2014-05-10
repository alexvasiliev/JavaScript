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
			this.container.style.display = "none";
			document.body.appendChild(this.container);
			this.render();
        },
        render: function () {
			$('#'+this.viewName).html(this.template());
			document.getElementById('gameover_form').onsubmit = this.submitHandler;
        },
        show: function (s) {
            console.log("gameover::show");
			this.prepareResults(s);
			this.container.style.display = "block";
			this.trigger("view::show");
        },
        hide: function () {
            console.log("gameover::hide");
			this.container.style.display = "none";
        },
		prepareResults : function(s) {
			document.getElementById('score-holder').innerHTML = s;
			document.getElementById('player_score').setAttribute('value', s);			
		},
		submitHandler : function (event) {
			var form = document.forms.gameover_form;
			var playerScore = new Score({
				score: form.player_score.value,
				name : form.player_name.value.toString(),				
			});
				
			collectionScore.sendScore(playerScore, {
				before: function(event) {
					collectionScore.addScore(playerScore);
					disableForm();	
				},			
				success: function(event) {
						window.location.href = "/#scoreboard";
						collectionScore.fetch({reset : true});
					    enableForm()
						// this.redirrectHndl() -> Not a function WTF?
				},
				fail: function(event) {
					enableForm();
					alert('Ошибка отправки данных.\n Ваши данные сохранены локально');			
				}
			});
			return false;	/*false - не отправит форму вдогонку стандартным образом*/
		}	
    });

    return new GameOverView();
});
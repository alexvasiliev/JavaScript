define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
	'models/score',
], function(
    Backbone,
    tmpl,
    collection,
	Score
){

    var ScoreboardView = Backbone.View.extend({
        
        template: tmpl,
		viewName: 'ScoreboardView',
		container: document.createElement("div"),

        initialize: function () {
			this.container.id = this.viewName;
			this.container.setAttribute('style', 'display:none');
			document.body.appendChild(this.container);
			
			$('body').on('collection::get::fail', this.getError);
			
			var context = this;
			
            collection.on("reset",function(){
                $('#'+context.viewName).html(context.template(collection.getScores(10)));
            });	
			collection.on("add",function(){
                $('#'+context.viewName).html(context.template(collection.getScores(10)));
            });	
			this.render();
        },
        render: function () {
			$('#'+this.viewName).html(this.template(collection.getScores(10)));
        },
        show: function () {
			for(var key in localStorage) {
				alert("" +key +"  " + localStorage[key] + "\n");
				var score = new Score(JSON.parse(localStorage[key]));
				var succ = collection.sendScore(score, false);
				//localStorage.removeItem(key); TODO: legit?!
			}	
			
			document.getElementById('score_table-wrapper').innerHTML = '<img src="img/loading.gif"></img>'
			collection.fetch({reset : true});
	
			this.container.setAttribute('style', 'display:visible');
			this.trigger("view::show");
        },
        hide: function () {
			console.log("scoreboard::hide");
			this.container.setAttribute('style', 'display:none');
        },
		getError : function() {
			alert("ошибка загрузки данных с сервера");
		}

    });
		
    return new ScoreboardView();
});
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
			this.container.style.display = 'none';
			document.body.appendChild(this.container);
			
			var context = this;			
            collection.on("reset",function(){
                context.fillTable(collection.toJSON());
            });	
			this.render();
			collection.resendFromLocalStorage();
        },
        render: function () {
			var context = this;
			collection.getScores(10, {
				success: function(data) {
					context.fillTable(data);
				},
				fail: function(data) {
					context.getError();
				}
			});	
        },
        show: function () {
			this.container.style.display="block";
			document.getElementById('score_table-wrapper').innerHTML = '<img src="img/loading.gif"></img>'
			collection.fetch({reset : true, data: {limit: 10}});		
			this.trigger("view::show");
        },
        hide: function () {
			console.log("scoreboard::hide");
			this.container.style.display="none";
        },
		getError : function() {
			alert("ошибка загрузки данных с сервера");
		},
		fillTable: function(data) {
			console.log("filling Table");
			console.log(data);
			var context = this;
			$('#'+context.viewName).html(context.template(data));
		}

    });
		
    return new ScoreboardView();
});
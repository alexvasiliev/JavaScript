define([
    'backbone',
    'models/score'
], function(
    Backbone,
    score
){

    var Collection = Backbone.Collection.extend({
    	model: score,
		url  : '/scores',
		urlc : '/scores?limit=',
		lsObj: 'savedScores',

    	comparator: function(player) {
    		return -player.get('score');
    	},
		getScores: function(count, callbacks){
			var context = this;
            $.ajax({
				type: 'GET',
				url: '/scores',
				data: { limit: count },
				dataType: 'json',
				success: function(data) {
					console.log("GET scores SUCCESS");
					callbacks.success(data);
				},
				error: function() {
					callbacks.fail();
				}
			});
		},
		addScore : function(playerScore) {
			this.add(playerScore);		
		},		
		sendScore : function(playerScore, callbacks) {	
			var score = {
				score : playerScore.get('score'),
				name  : playerScore.get('name')
			};
			var context = this;
            $.ajax({
				type: 'POST',
				url: '/scores',
				data: score,
				dataType: 'json',
				beforeSend: function() {
					context.resendFromLocalStorage();
					callbacks.before();
				},
				success: function() {
					callbacks.success();
				},
				error: function() {
					this.saveToLocalStorage(score);
					callbacks.fail();
				}
            });
		},
		saveToLocalStorage: function(score) {
			if (!localStorage[this.lsObj]) {
				localStorage.setItem(this.lsObj, JSON.stringify({}));
			}
			var key = (new Date()).getTime();
			var storage = JSON.parse(localStorage[this.lsObj]);
			
			storage[key] = score;
			localStorage.setItem(this.lsObj, JSON.stringify(storage));
		},
		resendFromLocalStorage: function() {
			if (localStorage[this.lsObj]) {
				var storage = JSON.parse(localStorage[this.lsObj]);
				function deleteItem(key) {
					delete storage[key];
				};
				if (storage) {
					for (var key in storage) {
						console.log("attempt to resend:" + storage[key]);
						$.ajax({
							type: 'POST',
							url: '/scores',
							data: storage[key],
							dataType: 'json',
							success: deleteItem(key)
						});
					}
					localStorage.setItem(this.lsObj, JSON.stringify(storage));
				}
			}
		}
		
    });

	return new Collection();
});
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

    	comparator: function(player) {
    		return - player.get('score');
    	},
		getScores: function(count){
			if(!count) count = 10;
			var result = null;
			
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function (e) {					
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
						result = JSON.parse(xhr.response);
                    }
					else $('body').trigger("collection::get::fail");
                }
            };
			xhr.open("GET", "/scores?limit="+count, false);
			xhr.send( null );
			return result;
		},
		addScore : function(playerScore) {
			this.add(playerScore);		
		},		
		sendScore : function(playerScore, useLS){
			
			useLS = useLS || true;
			
			var formData = new FormData();
			formData.append('score', playerScore.get('score'));
			formData.append('name',  playerScore.get('name'));
			
			var xhr = new XMLHttpRequest();
			var res = false;
			xhr.onreadystatechange = function (e) {					
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
						res = true;
						if(useLS) {
							$('body').trigger("gameover::scores::redirrect");
						}
                    } else if (xhr.status === 400) {
						res = true; /*данные дошли успешно, хотя они и ошибочны */
                        console.log(xhr.responseText);
						$('body').trigger("gameover::scores::send::fail");
                    } else if (useLS && ((xhr.status >= 500) || (xhr.status === 0))) {
						var key = (new Date()).getTime();			
						localStorage[key] = JSON.stringify(playerScore);
                    }
					else {
						alert('smth deeply wrong');
					}
                }
            };
        
			xhr.open("POST", "/scores", true);
			xhr.send( formData );
			return res;
		}
    });

	return new Collection();
});
define([
    'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
    	defaults: {
			name: '',
			score: 0
		},

    	initialize: function(){
           console.log("models::score::initialize");
        }
    });

    return Model;
});
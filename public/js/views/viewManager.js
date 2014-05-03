define([
	'backbone',
	'jquery'
], function (
	Backbone, 
	jQuery
){
	var Views = { };
		
	var ViewManager = Backbone.View.extend({
		
		handle: function (view) {	
			
			console.log('ViewManager::add::' + view.viewName);
			console.log(view);
			
			if(Views[view.viewName] === undefined ) {
				Views[view.viewName] = view;
				
				this.listenTo(view, "view::show", function() {
					for( var v in Views) {
						if( v != view.viewName) {
							console.log("Manager::hide " + v);
							Views[v].hide();
						}
					}
				});
			}
		}
	});

	return new ViewManager();
});
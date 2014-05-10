define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var MainView = Backbone.View.extend({

        template: tmpl,
		viewName: 'MainScreenView',
		container: document.createElement("div"),

        initialize: function () {
			this.container.id = this.viewName;
			this.container.style.display = "none";
			document.body.appendChild(this.container);
			this.render();
        },
        render: function () {
			$('#'+this.viewName).html(this.template());
        },
        show: function () {
            console.log("main::show");
			this.container.style.display = "block";
			this.trigger("view::show");
        },
        hide: function () {
            console.log("main::hide");
			this.container.style.display = "none";
        }

    });

    return new MainView();
});
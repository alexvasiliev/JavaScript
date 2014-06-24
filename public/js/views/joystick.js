define([
    'backbone',
    'tmpl/joystick',
	'modernizr',
    'jquery',
], function(
    Backbone,
    tmpl,
	Modernizr,
    $
){
    var alpha, beta, gamma, i = 0;
    var joystickStatus = false;
    var obj = {};
    obj.name = null; 
    obj.angle = null;
    var View = Backbone.View.extend({
        template: tmpl,
        className: "#joystick",
        viewName: 'JoystickView',
        container: document.createElement("div"),

        initialize: function () {
            this.container.id = this.viewName;
            //this.container.style.display = 'none';
            document.body.appendChild(this.container);
			if( this.checkDevice()) {
            	this.render();
			} else {
				this.renderError();
			}
                 $('#'+this.viewName).html(this.template());
                $("#helpMsg").hide();
                $("#helpMsg").css("opacity", 0.5)
                $("#helpMsg").css("font-size" , "30px");
                
                window.addEventListener('orientationchange', function(){
                    //alert("Orientation: " + window.orientation);
                });
                $(document).on("start",function(){
                    console.log("trigger");
                    $("#helpMsg").show();
                    $("#connectForm").hide();
                    document.addEventListener('click', function(){
                        window.server.send(5 , function(){});
                    console.log("click");
                    });
                });
                /*codes
                1 * - move
                1 1 - move left
                1 2 - move right
                1 3 - move bot
                1 4 - move top
                3 - shoot
                */
                window.addEventListener('deviceorientation', function(event){
                    var div = document.getElementById('joystick');
                        if (i==0){
                            alpha = event.alpha;
                            beta = event.beta;
                            gamma = event.gamma;
                            i++;
                        }


                        else{
                            if(Math.abs(event.gamma - gamma) > 0.5){
                                obj.name = "gamma";
                                obj.angle = gamma - event.gamma;
                                window.server.send( obj, function(){});
                                
                                //alpha = event.alpha;
                            }
                            if(Math.abs(event.beta - beta) > 0.5){
                                obj.name = "beta";
                                obj.angle = beta - event.beta;
                                window.server.send( obj, function(){});
                                
                                //gamma = event.gamma;
                            }
                        }
                        /*else{
                            if(Math.abs(event.alpha - alpha) > 0.5){
                                if(event.alpha > 90  ){
                                    window.server.send( 1 , function(){});
                                }
                                else{
                                    //div.innerHTML = "move right <br/>";
                                    window.server.send( 2, function(){});
                                }
                                alpha = event.alpha;
                            }
                            if(Math.abs(event.beta - beta) > 0.5){
                                if(event.beta  > -45 ){
                                    //div.innerHTML += "move top <br/>";
                                    window.server.send( 4, function(){});
                                }
                                else{
                                    //div.innerHTML += "move bot <br/>";
                                    window.server.send( 3, function(){});                            
                                }
                                gamma = event.gamma;
                            }
                        }*/
                    //var div = document.getElementById('joystick');
                    //div.innerHTML = event.alpha +  " " + event.beta + " " + event.gamma + "<br/>";
                });
            
        },
		renderError: function () {
            $('#'+this.viewName).html("Sory, your device can not be used as joystick.");
		},
        render: function () {

        },
        show: function () {
            if (!joystickStatus) {
                joystickStatus = true;
                require(['joystick'], function (joystick) {

                });
            }
            console.log("show");
            this.container.style.display = 'block';
            this.trigger("view::show");
            //console.log($(this.className))
            //$(this.className).trigger('show');
        },
        hide: function () {
            this.container.style.display = 'none';
        },
		checkDevice: function() {
			return Modernizr.touch && Modernizr.devicemotion && Modernizr.deviceorientation;
		}
    });

    return new View();
});
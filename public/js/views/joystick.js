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
		
	function sendButton(id) {
		obj={};
		obj.name = "button";
        obj.angle = id;
		window.server.send( obj, function(){});
	}
		
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
                    if(window.orientation != 90)
                    {
                        alert("Change orientation of u'r phone to 90 degrees");
                        //alert("Orientation: " + window.orientation);
                    }
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
                            }
                            if(Math.abs(event.beta - beta) > 0.5){
                                obj.name = "beta";
                                obj.angle = beta - event.beta;
                                window.server.send( obj, function(){});
                            }
                        }
                });
         //  console.log(document.getElementById('joy_fire1'));
            //console.log($('#joy_fire1'));
            document.getElementById('joy_fire1').addEventListener('click',function(){sendButton(1)},false);
            document.getElementById('joy_fire2').addEventListener('click',function(){sendButton(2)},false);
            document.getElementById('joy_fire3').addEventListener('click',function(){sendButton(3)},false);
            document.getElementById('joy_fire4').addEventListener('click',function(){sendButton(4)},false);
            document.getElementById('joy_pause').addEventListener('click',function(){sendButton(5)},false);
            
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
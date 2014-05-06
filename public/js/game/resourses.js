define([
    'classy'
], function (
    Class
){
    //var downlodableImage = Image;
    /*var downlodableImage.function(){
        downlodableImage.prototype.unloadedImg++;
    };
    downlodableImage.prototype.unloadedImg = 0;
    downlodableImage = Image;*/
    /*downlodableImage.onload = function() {
        console.log("!!!!!!!!!!!!!!!main.loaded");
        unloadedImg--;
        if(unloadedImg == 0){
            resourses.loaded = true;
        }
    };*/
    /*downlodableImage.prototype.onload = function() {
        console.log("!!!!!!!!!!!!!!!proto.loaded");
        unloadedImg--;
        if(unloadedImg == 0){
            resourses.loaded = true;
        }
    };*/
    var Resourses = Class.$extend ( {
        loadHandler :function (){
            resourses.unloaded--;
            if(resourses.unloaded == 0){
                resourses.loaded = true;
            }
            console.log(resourses.unloaded);
        },

        loadImages : function (array){
            console.log(array.length);
            if(array.length > 0){
                for(var i = 0; i < array.length; i++){
                    this[array[i]] = new Image();
                    this[array[i]].src = "static/JS-" + array[i] + ".png";
                    this[array[i]].addEventListener('load', this.loadHandler);
                    this.unloaded++;
                    console.log(this.unloaded);
                }
            }
        },

        __init__: function (){
            this.unloaded = 0;
            this.loadImages(["sprite_explosion1","sprite_explosion2", "sprite_glow1",
                "sprite_glow2", "sprite_flame1", "sprite_flame2", "ship_canon_body1",
                "ship_canon_body2", "ship_canon_gun1", "ship_canon_gun2", "ship_module0",
                "ship_module1", "ship_body0", "ship_body1", "ship_module_destroyed0",
                "ship_module_destroyed1", "ship_body_destroyed0", "ship_body_destroyed1",
                "shot1", "shop_screen" ]);
            console.log(this.sprite_explosion1);
            this.loaded = false;

            /*this.sprite_explosion1 = new downlodableImage();
            this.sprite_explosion1.src = 'static/JS-sprite_explosion1.png';
            this.sprite_explosion2 = new Image();
            this.sprite_explosion2.src = 'static/JS-sprite_explosion2.png';
            this.sprite_glow1 = new Image();
            this.sprite_glow1.src = 'static/JS-sprite_glow1.png';
            this.sprite_glow2 = new Image();
            this.sprite_glow2.src = 'static/JS-sprite_glow2.png';
            this.sprite_flame1 = new Image();
            this.sprite_flame1.src = 'static/JS-sprite_flame1.png';
            this.sprite_flame2 = new Image();
            this.sprite_flame2.src = 'static/JS-sprite_flame2.png';

            this.ship_canon_body1 = new Image();
            this.ship_canon_body1.src = 'static/JS-ship_canon_body.png';
            this.ship_canon_body2 = new Image();
            this.ship_canon_body2.src = 'static/JS-ship_canon_body2.png';
            this.ship_canon_gun1 = new Image();
            this.ship_canon_gun1.src = 'static/JS-ship_canon_gun2.png';
            this.ship_canon_gun2 = new Image();
            this.ship_canon_gun2.src = 'static/JS-ship_canon_gun2.png';
            this.ship_module0 = new Image();
            this.ship_module0.src = 'static/JS-ship_module0.png';
            this.ship_module1 = new Image();
            this.ship_module1.src = 'static/JS-ship_module0.png';
            this.ship_body0 = new Image();
            this.ship_body0.src = 'static/JS-ship_body0.png';
            this.ship_body1 = new Image();
            this.ship_body1.src = 'static/JS-ship_body1.png';
            this.ship_module_destroyed0 = new Image();
            this.ship_module_destroyed0.src = 'static/JS-ship_module_destroyed0.png';
            this.ship_module_destroyed1 = new Image();
            this.ship_module_destroyed1.src = 'static/JS-ship_module_destroyed0.png';
            this.ship_body_destroyed0 = new Image();
            this.ship_body_destroyed0.src = 'static/JS-ship_body_destroyed0.png';
            this.ship_body_destroyed1 = new Image();
            this.ship_body_destroyed1.src = 'static/JS-ship_body_destroyed1.png';

            this.background_star1 = new Image();
            this.background_star1.src = 'static/epic.png';

            this.shot1 = new Image();
            this.shot1.src = 'static/epic.png';

            this.background = new Image();
            this.background.src = 'static/background.png';

            this.shop_screen = new Image();
            this.shop_screen.src = 'static/JS-shop_screen.png';*/
        },
        getXMLDocument : function (url)  
        {  
            var xml;  
            if(window.XMLHttpRequest)  
            {  
                xml = new window.XMLHttpRequest();  
                xml.open("GET", url, false);  
                xml.send("");  
                return xml.responseXML;  
            }  
            else  
                if(window.ActiveXObject)  
                {  
                    xml = new ActiveXObject("Microsoft.XMLDOM");  
                    xml.async = false;  
                    xml.load(url);  
                    return xml;  
                }  
                else  
                {  
                    alert("Загрузка XML не поддерживается браузером");  
                    return null;  
                }  
        },
    });
    return Resourses;
});
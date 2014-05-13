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
        imageLoadHandler :function (){
            resourses.unloaded--;
            //console.log(resourses.unloaded);
            if(resourses.unloaded == 0){
                resourses.finishLoading();
            }
        },

        loadImages : function (array){
            if(array.length > 0){
                for(var i = 0; i < array.length; i++){
                    this[array[i]] = new Image();
                    this[array[i]].src = "static/" + array[i] + ".png";
                    this[array[i]].addEventListener('load', this.imageLoadHandler);
                    this.unloaded++;
                }
            }
        },

        asyncHandler : function ()
        {
            if (this.readyState != 4)
                return;
            if (this.status == 200)
            {
                
                //console.log(this);
                resourses.unloaded--;
                resourses[this.target] = this.responseXML;
                //console.log(resourses.unloaded);
                if(resourses.unloaded == 0){
                    resourses.finishLoading();
                }
            }
        },

        getXMLDocument : function (target)  
        {  
            if(window.XMLHttpRequest){  
                var url = "static/" + target + ".xml"
                var xml = new window.XMLHttpRequest();  
                xml.open("GET", url, true);  
                xml.send("");  

                xml.onreadystatechange = this.asyncHandler;
                xml.target = target;
            }  
            else {
                alert("Загрузка XML не поддерживается браузером");  
            }  
        },
        loadXMLs : function (array){
            //console.log(array.length);
            if(array.length > 0){
                for(var i = 0; i < array.length; i++){
                    this.getXMLDocument(array[i]);
                    this.unloaded++;
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
                "shot1", "shop_screen", "background_star1" ]);
            this.loadImages(["material_steel_squere", "material_steel_triangle", 
                "module_connection_node_center", "module_connection_end", "module_connection_line",
                "module_connection_connector"]);
            this.loadXMLs(["player"]);
            this.loaded = false;
        },

        finishLoading : function (){
            resourses.loaded = true;
            console.log("Resourses loaded");
            //console.log(this);
        },
    });
    return Resourses;
});
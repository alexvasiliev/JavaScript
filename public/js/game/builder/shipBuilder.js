

define([
    'classy',
    'pixi',
    'game/ship',
    'game/module',
], function (
    Class,
    Pixi,
    Ship,
    Module
){
    var ShipBuilder = Class.$extend ( {
        __init__: function (){
            this.sizeClassConstant = 1;

            this.ship = null;
            this.modules = null;
        },

        newShip : function(){
            this.ship = new Ship();
            this.modules = [];
        },

        autoShip : function(sizeClass, powerLevel){
            this.ship = null;
        },

        getValue : function(target, name){
            return target.getElementsByTagName(name)[0].childNodes[0].nodeValue;
        },

        fromXML : function(xml){
            this.newShip();

            var xml = resourses[xml];

            var ships = xml.getElementsByTagName("ship");
            if(ships)
            //for(var i = 0; i < ships.length; i++)
            {
                var i = 0;
                var ship = ships[i];
                this.ship.bodyId = this.getValue(ship, "bodyId");
                var modules = ship.getElementsByTagName("module");
                if(modules){
                    for(var j = 0; j < modules.length; j++){
                        var module = modules[i];
                        builder.module.fromXML(module);
                        this.modules.push(builder.module.getModule());
                    }
                }
                this.attachBody();
                attachAllModulesById();
            }

        },

        createBody : function(){
            builder.module.auto(sizeClass * this.sizeClassConstant, true);
            this.ship.body = builder.module.get();
        },

        addModules : function(){
            for(var i = 0; i < sizeClass; i++){
                builder.module.auto(sizeClass * this.sizeClassConstant, false);
                var newModule = builder.module.get();
                if(this.autoAttach(this.ship.body)){

                }
            }
        },
        attachBody : function(){
            for(var i = 0; i < this.modules.length; i++){
                var module =  this.modules[i];
                if(this.ship.bodyId == module.id){
                    this.ship.body = module;
                }
            }
        },
        attachAllModulesById: function(){
            for(var i = 0; i < this.modules.length; i++){
                for(var j = 0; j < this.modules[i].connections; j++){
                    for(var k = 0; k < this.modules.length; k++){
                        for(var l = 0; l < this.modules[k].connections; l++){
                            var targetModule =  this.modules[j];
                            if(this.modules[i].connections[j].targetId == 
                                this.modules[k].connections[l].id){
                                this.attachConnections(this.modules[i].connections[j],
                                    this.modules[k].connections[l]);
                            }
                        }
                    }
                }
            }
        },
        autoAttachAllModules: function(){
            for(var i = 0; i < this.modules.length; i++){
                var module =  this.modules[i];
                module.id = i+1;
                
            }
        },

        autoAttachModules : function(module1, module2){

            if(1 == 1){
                return true;
            }else{
                return false;
            }
        },

        attachConnections : function(connection1, connection2){
            //if(connection1.)

            if(1 == 1){
                return true;
            }else{
                return false;
            }
        },

        getShip: function(){
            return this.ship;
        },

        
    });
    return ShipBuilder;
});


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
            this.cellSize = 25;

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
                        var module = modules[j];
                        builder.module.fromXML(module);
                        this.modules.push(builder.module.getModule());
                    }
                }
                this.attachBody();
                this.attachAllModulesById();
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
            //console.log("attachBody");
            for(var i = 0; i < this.modules.length; i++){
                var module =  this.modules[i];
                if(this.ship.bodyId == module.id){
                    this.ship.body = module;
                    module.lock(this.ship);
                }
            }
        },

        attachAllModulesById: function(){
            //console.log("attachAllModulesById");
            //console.log(this.modules.length);
            for(var i = 0; i < this.modules.length; i++){
                //console.log(this.modules[i].connections);
                for(var j = 0; j < this.modules[i].connections.length; j++){
                    //console.log(this.modules[i].connections[j].targetId);
                    for(var k = 0; k < this.modules.length; k++){
                        for(var l = 0; l < this.modules[k].connections.length; l++){
                            var targetModule =  this.modules[j];
                            //console.log(this.modules[i].connections[j].targetId+", "+
                                //this.modules[k].connections[l].id);
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

        attachConnections : function(connectionOld, connectionNew){
            console.log("attachConnections");
            var angle = connectionOld.angle - connectionNew.angle - Math.PI;
            var transition = Math.min(connectionNew.energyTransitionMax, connectionOld.energyTransitionMax);
            connectionNew.status = "connected";
            connectionNew.target = connectionOld.owner;
            connectionNew.energyTransition = transition;
            connectionOld.status = "connector";
            connectionOld.target = connectionNew.owner;
            connectionOld.energyTransition = transition;

            var shift = {};
            console.log(connectionOld.angle+", "+connectionNew.angle+", "+angle);

            var moduleNewBaseShiftx = connectionNew.x + 0.5 - connectionNew.owner.mapColomns/2;
            var moduleNewBaseShifty = connectionNew.y + 0.5 - connectionNew.owner.mapRows/2;

            var moduleOldBaseShiftx = connectionOld.x + 0.5 - connectionOld.owner.mapColomns/2;
            var moduleOldBaseShifty = connectionOld.y + 0.5 - connectionOld.owner.mapRows/2;

            /*var baseShiftx = connectionOld.owner.mapColomns/2 - connectionNew.owner.mapColomns/2;
            var baseShifty = connectionOld.owner.mapRows/2 - connectionNew.owner.mapRows/2;
            console.log(baseShiftx+", "+baseShifty);
            var newConx = connectionNew.x - baseShiftx;
            var newCony = connectionNew.y - baseShifty;
            console.log(connectionOld.owner.mapColomns+", "+connectionNew.owner.mapColomns);
            console.log(connectionOld.owner.mapRows+", "+connectionNew.owner.mapRows);
            console.log(newConx+", "+newCony);*/
            console.log(moduleNewBaseShiftx+", "+moduleNewBaseShifty);
            console.log(moduleOldBaseShiftx+", "+moduleOldBaseShifty);
            var moduleNewShiftx = +Math.sin(angle)*(moduleNewBaseShifty) - Math.cos(angle)*(moduleNewBaseShiftx);
            var moduleNewShifty = -Math.cos(angle)*(moduleNewBaseShifty) - Math.sin(angle)*(moduleNewBaseShiftx);
            var moduleOldShiftx = +Math.sin(connectionNew.owner.angle)*(moduleOldBaseShifty) - 
                                            Math.cos(connectionNew.owner.angle)*(moduleOldBaseShiftx);
            var moduleOldShifty = -Math.cos(connectionNew.owner.angle)*(moduleOldBaseShifty) - 
                                            Math.sin(connectionNew.owner.angle)*(moduleOldBaseShiftx);
            console.log(moduleNewShiftx+", "+moduleNewShifty);
            console.log(moduleOldShiftx+", "+moduleOldShifty);
            //console.log(newShiftx+", "+newShifty);
            shift.x = moduleNewShiftx - moduleOldShiftx;
            shift.y = moduleNewShifty - moduleOldShifty;
            console.log(shift.x+", "+shift.y);
            shift.x *= this.cellSize;
            shift.y *= this.cellSize;
            shift.angle = angle;

            connectionNew.owner.lock(connectionOld.owner, shift);

            this.ship.modules.push(connectionNew.owner);

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
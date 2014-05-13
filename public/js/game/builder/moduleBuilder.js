

define([
    'classy',
    'game/slot',
    'game/connection',
    'game/module'
], function (
    Class,
    Slot,
    Connection,
    Module
){
    var ModuleBuilder = Class.$extend ( {
        __init__: function (){
            this.cellSize = 25;
            this.sizeConstant = 1;
            ////////
            this.width = null;
            this.height = null;

            this.map = null;

            this.mapRows = null;
            this.mapColomns = null;
            this.module = null;
        },
        newModule : function(width, height, tip, id){
            //console.log("newModule");
            this.width  = width*this.sizeConstant;
            this.height = height*this.sizeConstant;

            this.map = null;


            this.mapRows = null;
            this.mapColomns = null;
            this.module = new Module();
            this.module.material = "steel";

            this.module.sizeX = this.width * this.cellSize;
            this.module.sizeY = this.width * this.cellSize;

            this.createBase(tip);
            if(id){
                this.module.id = id;
            }
        },

        getValue : function(target, name){
            return target.getElementsByTagName(name)[0].childNodes[0].nodeValue;
        },

        readModule : function (target){
            //console.log("readModule");
            var width = Number(this.getValue(target, "width"));
            var height = Number(this.getValue(target, "height"));
            var tip = Number(this.getValue(target, "tip"));
            var id = Number(this.getValue(target, "id"));
            this.newModule(width, height, tip, id);
            return;
        },

        readConnection : function (target){
            //console.log("readConnection");
            var connectionID = Number(this.getValue(target, "id"));
            var targetID = Number(this.getValue(target, "targetId"));
            var moduleID = Number(this.getValue(target, "moduleId"));
            var size = Number(this.getValue(target, "size"));
            var x = Number(this.getValue(target, "x"));
            var y = Number(this.getValue(target, "y"));
            this.addConnection(size, x, y, connectionID, moduleID, targetID);
            return;
        },
        readSlot : function (target){
            //console.log("readSlot");
            var slotID = Number(this.getValue(target, "id"));
            var targetID = Number(this.getValue(target, "targetId"));
            var size = Number(this.getValue(target, "size"));
            var x = Number(this.getValue(target, "x"));
            var y = Number(this.getValue(target, "y"));
            this.addSlot(size, x, y, slotID, targetID);
            return;
        },
        fromXML : function(module){
            //console.log("fromXML");
            this.readModule(module);

            var connections = module.getElementsByTagName("connection");
            if(connections){ 
                for(var k = 0; k < connections.length; k++){
                    var connection = connections[k];
                    this.readConnection(connection);
                }
            }
            var slots = module.getElementsByTagName("slot");
            if(slots){
                for(var k = 0; k < slots.length; k++){
                    var slot = slots[k];
                    this.readSlot(slot);
                }
            }
        },
        createBase : function(tip){
            //console.log("createBase " + tip);

            this.module.map = this.createMap(this.width, this.height);
            /*if(tip){
                return;
            }else{

            }*/
        },
        createMap : function(width, height){
            //console.log("createMap");
            var arr = new Array();
            var i = 0;
            var j = 0;
            for(i = 0; i < width; i++){
                arr[i] = new Array();
                for(j = 0; j < height; j++){
                    arr[i][j] = null;
                }
            }
            this.module.mapRows = j;
            this.module.mapColomns = i;
            return arr;
        },
        attachCenter : function(){
            var centerRow = Math.ceil(this.module.mapRows/2);
            var centerColomn = Math.ceil(this.module.mapColomns/2);
            addSlot(1, centerRow, centerColomn);
        },
        addSlot : function(size, cellx, celly, id, targetId){
            if(this.module.map[cellx][celly] != null){
                return;
            }
            if((cellx >= 0 || cellx < this.module.mapColomns || 
                                celly >= 0 || celly < this.module.mapRows) &&
                                this.module.map[cellx][celly] == null){
                /*var newSlot = new Slot (size, this.cellSize * (cellx + 0.5), 
                    this.cellSize * (celly + 0.5));*/
                var newSlot = new Slot (size, cellx, celly);
                this.module.map[cellx][celly] = newSlot;
                this.module.slots.push(newSlot);
                if(id){
                    newSlot.id = id;
                }
                if(targetId){
                    newSlot.targetId = targetId;
                }
            }else{
                return;
            }
        },
        addConnection : function(size, cellx, celly, id, moduleId, targetId){
            //console.trace();
            //console.log(this);
            if(this.module.map[cellx][celly] != null){
                return;
            }
            var angleNull = -100;
            var angle = angleNull;
            if(cellx == 0){
                angle = Math.PI/2;
            }else if(cellx == this.module.mapColomns - 1){
                angle = -Math.PI/2;
            }else if(celly == 0){
                angle = Math.PI;
            }else if(celly == this.module.mapRows - 1){
                angle = 0;
            }

            if(angle != angleNull){
                /*var newConnection = new Connection (size, 
                    this.cellSize * (cellx + 0.5 + Math.sin(angle)*0.5), 
                    this.cellSize * (celly + 0.5 + Math.cos(angle)*0.5), angle);*/
                var newConnection = new Connection (size, cellx, celly, angle);
                newConnection.owner = this.module;
                this.module.map[cellx][celly] = newConnection;
                this.module.connections.push(newConnection);

                if(id){
                    newConnection.id = id;
                }
                if(moduleId){
                    newConnection.moduleId = moduleId;
                }
                if(targetId){
                    newConnection.targetId = targetId;
                }

            }else{
                alert("addConnection::angle ="+angle);
            }
        },
        getModule : function(){
            //console.log(this.module.map);
            drawer.drawModule(this.module)
            this.module.img = drawer.getImage();

            this.module.width = this.module.img.width;
            this.module.height = this.module.img.height;
            //console.log( this.module.width);
            this.module.createSprite();
            return this.module;
        },

        
    });
    return ModuleBuilder;
});
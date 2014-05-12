

define([
    'classy',
    'pixi',
    'game/slot',
    'game/connection'
], function (
    Class,
    Pixi,
    Slot,
    Connection
){
    var Builder = Class.$extend ( {
        __init__: function (){
            this.cellSize = 5;
            ////////
            this.width = null;
            this.height = null;

            this.map = null;

            this.mapRows = null;
            this.mapColomns = null;
            this.module = null;
        },
        newModule : function(width, height, tip){
            this.width  = width*this.sizeConstant;
            this.height = height*this.sizeConstant;

            this.map = null;

            this.mapRows = null;
            this.mapColomns = null;
            this.module = new Module();
            this.createBase(tip);
        },
        createBase : function(tip){
            if(tip){
                return;
            }
            else{
                this.module.map = this.createMap(this.width, this.height);

            }
        },
        createMap : function(width, height){
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
        addSlot : function(size, cellx, celly){
            if((cellx >= 0 cellx < this.module.mapColomns || 
                                celly >= 0 || celly < this.module.mapRows) &&
                                this.module.map[cellx][celly] == null){
                var newSlot = new Slot (size, this.cellSize * (cellx + 0.5), 
                    this.cellSize * (celly + 0.5));
                this.module.map[cellx][celly] = newSlot;
                this.module.slots.push(newSlot);
            }else{
                return;
            }
        },
        addConnector : function(size, cellx, celly){
            if((cellx == 0 || cellx == this.module.mapColomns - 1 || 
                                celly == 0 || celly == this.module.mapRows - 1) &&
                                this.module.map[cellx][celly] == null){
                var newConnection = new Connection (size, this.cellSize * (cellx + 0.5), 
                    this.cellSize * (celly + 0.5), angle);
                this.module.map[cellx][celly] = newConnection;
                this.module.connections.push(newConnection);
            }else{
                return;
            }
        },
        getModule : function(){
            return this.module;
        },

        
    });
    return Builder;
});
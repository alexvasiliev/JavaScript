define([
    'classy',
    'game/baseobject',
    'game/sprite',
    'game/connection',
    'game/module'
], function (
    Class,
    BaseObject,
    Sprite,
    Connection,
    Module
){
    var Ship = BaseObject.$extend ( {
        __init__ : function() {
            this.$super();
            this.modules = [];
            this.items = [];
            this.side = 0;
            this.body = null;

            this.todelete = false;
            this.destroyed = false;

            this.check = false;
        },
        /*attack : function (targetx, targety) {
            for (var i = 0; i < this.canons.length; i++){
                this.canons[i].attack(targetx, targety);
            }
        },*/
        turn : function () {
            this.$super();
            this.body.turn();
        },
        attachItem : function (item, type, slot, module) {
            console.log("i`m trying to attach item");
            this.checkItem(item, type, slot, module);
            console.log("the result is " + this.check);
            if(this.check == true){
                console.log("ok, i`m installing it now");
                this.installItem(item, type, slot, module);
                console.log("done");
                this.items.push(item);
            }
        },
        checkItem : function (item, type, slot, module) {
            if(slot.status != "open"){
                this.check = false;
                console.log("slot already in use");
                return;
            }
            if(item.size > slot.size){
                this.check = false;
                console.log("size is not ok");
                return;
            }
            this.check = true;
            return;
        },
        installItem : function (item, type, slot, module) {
            slot.status = "connector";
            slot.target = item;

            var shift = {};
            shift.x = slot.x;
            shift.y = slot.y;
            shift.angle = 0;

            item.lock(module, shift);

            console.log(item.bind);
            item.side = this.side;
        },
        attachModule : function (moduleNew, connectionNew, angle, connectionOld, moduleOld) {
            //console.log("i`m trying to attach module");
            this.checkModule(moduleNew, connectionNew, angle, connectionOld, moduleOld);
            //console.log("the result is " + this.check);
            if(this.check == true){
                //console.log("ok, i`m installing it now");
                this.installModule(moduleNew, connectionNew, angle, connectionOld, moduleOld);
                //console.log("done");
                this.modules.push(moduleNew);
            }
        },
        checkModule : function (moduleNew, connectionNew, angle, connectionOld, moduleOld) {
            if(connectionNew.status != "open" || connectionOld.status != "open"){
                this.check = false;
                console.log("connection already in use");
                return;
            }
            if(connectionNew.size > connectionOld.size){
                this.check = false;
                console.log("size is not ok");
                return;
            }
            var tempAngle = connectionNew.angle + Math.PI + angle;
            if(tempAngle > Math.PI){
                tempAngle -= 2*Math.PI;
            }else if(tempAngle < -Math.PI){
                tempAngle += 2*Math.PI;
            }
            if(Math.abs(tempAngle - connectionOld.angle) > Math.PI/10){
                this.check = false;
                console.log("wrong angle - tempAngle: " + tempAngle + 
                    ", old connection`s angle: " + connectionOld.angle);
                return;
            }
            this.check = true;
            return;
        },
        installModule : function (moduleNew, connectionNew, angle, connectionOld, moduleOld) {
            var transition = Math.min(connectionNew.energyTransitionMax, connectionOld.energyTransitionMax);
            connectionNew.status = "connected";
            connectionNew.target = moduleOld;
            connectionNew.energyTransition = transition;
            connectionOld.status = "connector";
            connectionOld.target = moduleNew;
            connectionOld.energyTransition = transition;

            var shift = {};
            shift.x = connectionOld.x + Math.sin(angle)*connectionNew.y - Math.cos(angle)*connectionNew.x;
            shift.y = connectionOld.y - Math.cos(angle)*connectionNew.y - Math.sin(angle)*connectionNew.x;
            shift.angle = angle;

            moduleNew.lock(moduleOld, shift);
        },

    });
    return Ship;
});


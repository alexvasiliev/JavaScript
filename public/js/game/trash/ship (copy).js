define([
    'classy',
    'game/movingobject',
    'game/sprite',
    'game/connection'
], function (
    Class,
    MovingObject,
    Sprite,
    Connection
){
    var Ship = MovingObject.$extend ( {
        __init__ : function(type) {
            img = resourses["ship_body"+type];
            this.$super(img);
            this.connections = [];
            if(type == 1){
                this.maxHealth = 1000;
                this.curHealth = this.maxHealth;
                this.width = 20;
                this.height = 60;
                this.addConnection(1, 0, 30, 0);
                this.addConnection(1, 0, -30, Math.PI);
                this.addConnection(1, -10, 0, Math.PI/2);
                this.addConnection(1, 10, 0, -Math.PI/2);
            }
            this.modules = [];
            this.canons = [];
            this.items = [];
            this.side = 0;
            this.burnTimer = 0;
            this.burnPeriod = 3;
            this.todelete = false;
            this.moveAngle = 0;
            this.totalSpeed = 0;
            this.check = false;
        },
        attack : function (targetx, targety) {
            for (var i = 0; i < this.canons.length; i++){
                this.canons[i].attack(targetx, targety);
            }
        },
        turn : function () {
            this.$super();
            for (var i = 0; i < this.connections.length;i++){
                if(this.connections[i].target){
                    this.connections[i].target.turn();
                }
            }
            /*for (var i = 0; i < this.modules.length;){
                if(this.modules[i].todelete == true){
                    this.modules[i].crush();
                    delete(this.modules[i]);
                    this.modules.splice(i, 1);
                }else{
                    this.modules[i].turn();
                    i++;
                }
            }*/
            for (var i = 0; i < this.canons.length;){
                if(this.canons[i].todelete == true){
                    this.canons[i].crush();
                    delete(this.canons[i]);
                    this.canons.splice(i, 1);
                }else{
                    this.canons[i].turn();
                    i++;
                }
            }
            for (var i = 0; i < this.items.length; i++){
                this.items[i].turn();
            }
            if(this.curHealth < this.maxHealth/2){
                this.burn();
            }
        },

        burn : function () {
            if(this.burnTimer++ > this.burnPeriod){
                this.burnTimer = 0;
                var flame;
                if(Math.random > 0.5){
                    flame = new Sprite("flame", 1);
                }else{
                    flame = new Sprite("flame", 2);
                }
                var misSize = Math.min(this.height, this.width)/2;
                flame.x = this.x + (0.5 - Math.random()) * misSize;
                flame.y = this.y + (0.5 - Math.random()) * misSize;
                this.totalSpeed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
                this.moveAngle = Math.atan(this.vy/this.vx) + Math.PI/2;
                if(this.vx > 0){
                    this.moveAngle += Math.PI;
                }
                flame.angle = this.moveAngle;
                flame.baseHeight = flame.img.width/2+this.totalSpeed*10;
                flame.baseWidth = flame.img.width/2;
                game.objects.push(flame);
                //console.log("burn");
            }
        },
        addConnection : function (size, x, y, angle) {
            var newConnection = new Connection (size, x, y, angle);
            this.connections.push(newConnection);
        },
        attachModule : function (moduleNew, connectionNew, angle, connectionOld, moduleOld) {
            //console.log("i`m trying to attach module");
            this.checkModule(moduleNew, connectionNew, angle, connectionOld, moduleOld);
            //console.log("the result is " + this.check);
            if(this.check == true){
                //console.log("ok, i`m installing it now");
                this.installModule(moduleNew, connectionNew, angle, connectionOld, moduleOld);
                //console.log("done");
            }
        },
        checkModule : function (moduleNew, connectionNew, angle, connectionOld, moduleOld) {
            if(connectionNew.status != "open" || connectionOld.status != "open"){
                this.check = false;
                return;
            }
            if(connectionNew.size > connectionOld.size){
                this.check = false;
                return;
            }
            var tempAngle = connectionNew.angle + Math.PI;
            if(tempAngle > Math.PI){
                tempAngle -= 2*Math.PI;
            }else if(tempAngle < -Math.PI){
                tempAngle += 2*Math.PI;
            }
            if(Math.abs(tempAngle - connectionOld.angle) > Math.PI/10){
                this.check = false;
                return;
            }
            this.check = true;
            return;
        },
        installModule : function (moduleNew, connectionNew, angle, connectionOld, moduleOld) {
            connectionNew.status = "locked";
            connectionNew.target = moduleOld;
            connectionOld.status = "locked";
            connectionOld.target = moduleNew;
            moduleNew.localangle = angle;
            moduleNew.localx = connectionOld.x + Math.sin(angle)*connectionNew.y - Math.cos(angle)*connectionNew.x;
            moduleNew.localy = connectionOld.y - Math.cos(angle)*connectionNew.y - Math.sin(angle)*connectionNew.x;
            moduleNew.bind = moduleOld;
        },
        attachItem : function (item) {
            this.items.push(item);
            item.side = this.side;
        },
        attachCanon : function (canon) {
            this.canons.push(canon);
            canon.side = this.side;
        },
        draw : function () {
            this.$super();
            for (var i = 0; i < this.connections.length;i++){
                if(this.connections[i].target){
                    this.connections[i].target.draw();
                }
            }
            /*for (var i = 0; i < this.modules.length; i++){
                this.modules[i].draw();
            }*/
            for (var i = 0; i < this.items.length; i++){
                this.items[i].draw();
            }
            for (var i = 0; i < this.canons.length; i++){
                this.canons[i].draw();
            }
        },
        takeDamage : function (damage) {
            this.curHealth -= damage;
            if(this.curHealth < 0){
                this.todelete = true;
                for (var i = 0; i < this.modules.length; i++){
                    this.modules[i].clear();
                }
            }
        },

    });
    return Ship;
});


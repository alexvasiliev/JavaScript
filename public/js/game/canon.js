define([
    'classy',
    'game/baseobject',
    'game/shot'
], function (
    Class,
    BaseObject,
    Shot
){
    var Canon = BaseObject.$extend ( {
        __init__ : function(baseClass, secondClass, size) {
            this.size = size;
            var baseImg = resourses["ship_canon_body"+baseClass];
            this.$super(baseImg);
            var scale = 0.3;

            var gunImg = resourses["ship_canon_gun"+secondClass];
            this.gun = new BaseObject(gunImg);
            this.gun.lock(this);

            console.log("Canon "+baseImg+", "+gunImg);

            if(baseClass == 1){
                this.width = 13;
                this.height = 18;
            }else if(baseClass == 2){
                this.width = 13;
                this.height = 18;
            }

            if(secondClass == 1){

                this.gun.width = 4;
                this.gun.height = 18;

                this.loaded = 7;
                this.reloadSpeed = 0.1;
                this.side = 0;
                this.ready = false;
                this.damage = 100;
                this.shotSpeed = 5;
                this.shotLifeTime = 100;
                this.shotWidth = this.shotHeight = 5;
                this.shotFriction = 0.995;
                this.shotEnergy = 50;
            }else if(secondClass == 2){

                this.gun.width = 4;
                this.gun.height = 18;

                this.loaded = 1;
                this.reloadSpeed = 0.3;
                this.side = 0;
                this.ready = false;
                this.damage = 10;
                this.shotSpeed = 15;
                this.shotLifeTime = 10;
                this.shotEnergy = 20;
                this.shotWidth = this.shotHeight = 3;
                this.shotFriction = 0.999;
            }

            this.charge = 0;
            this.todelete = false;

            this.target = null;
            this.dx = 0;
            this.dy = 0;
            this.targetRange2 = null;
            this.squareRange = null;
            this.targetRange = null;
            this.targetAngle = null;
            this.dangle = null;
            //this.gun.localy = 0;
        },
        turn : function () {
            if(this.bind.destroyed == false){
                this.$super();
                this.gun.turn();
                this.findEnemy();
                if(this.target != null){
                    this.attack();
                }
                if(this.charge > -this.loaded){
                    this.charge -= this.reloadSpeed;
                    this.gun.localy = this.charge/2-10;;
                }else{
                    this.ready = true;
                }
            }
        },
        findEnemy : function () {
            if(this.target && this.target.destroyed == false){
                this.dx = this.target.x - this.x;
                this.dy = this.target.y - this.y;
                this.targetRange2 = Math.abs(this.dx) + Math.abs(this.dy);
            }else{
                this.target = null;
            }
            for (var i = game.ships.length - 1; i >= 0; i--) {
                if(game.ships[i].side != this.side && game.ships[i].body.destroyed == false){
                    var dx = game.ships[i].x - this.x;
                    var dy = game.ships[i].y - this.y;
                    if(this.target == null){
                        this.target = game.ships[i];
                        this.targetRange2 = Math.abs(dx) + Math.abs(dy);
                    }
                    if (Math.abs(dx) + Math.abs(dy) < this.targetRange2) {
                        this.target = game.ships[i];
                        this.targetRange2 = Math.abs(dx) + Math.abs(dy);
                    };
                };
            };
        },
        attack : function(){
            var dx = this.x - this.target.x;
            var dy = this.y - this.target.y;
            var targetAngle = Math.atan(dy/dx) + Math.PI/2;
            if(dx > 0){
                targetAngle += Math.PI;
            }
            this.localangle = targetAngle - this.bind.angle;
            if(this.localangle > Math.PI){
                this.localangle -= 2*Math.PI;
            }else if(this.localangle < -Math.PI){
                this.localangle += 2*Math.PI;
            }
            if(this.ready == true && this.bind.energy > this.shotEnergy){
                this.shot();
            }
            //console.log(this.localangle);
        },
        shot : function () {
            //console.log(this.target)
            this.ready = false;
            this.bind.energy -= this.shotEnergy;
            this.charge = this.loaded;
            var shot = new Shot(this.side, 1);
            shot.x = this.gun.x;
            shot.y = this.gun.y;
            shot.vx = this.shotSpeed*Math.sin(this.angle);
            shot.vy = -this.shotSpeed*Math.cos(this.angle);
            shot.friction = this.shotFriction;
            shot.maxLifetime = this.shotLifeTime;
            shot.baseWidth = this.shotWidth;
            shot.baseHeight = this.shotHeight;
            shot.damage = this.damage;
            game.addShot(shot);
        },
        draw : function () {
            if(this.bind.destroyed == false){
                this.gun.draw();
                this.$super();
            }
        },
        crush : function () {

        }

    });
    return Canon;
});
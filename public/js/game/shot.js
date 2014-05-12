define([
    'classy',
    'game/baseobject', 
    'game/sprite'
], function (
    Class,
    BaseObject,
    Sprite
){
    var Shot = BaseObject.$extend ( {
        __init__ : function(side, type) {
            var img = resourses["shot"+type];
            this.$super(img);
            var scale = 0.3;
            this.baseWidth = 50;
            this.baseHeight = 50;
            this.damage = 0;
            this.side = side;
            this.maxLifetime = 0;
            this.lifetime = 0;
        },
        turn : function () {
            this.$super();
            if(this.maxLifetime > 0){
                this.lifetime += 1;
                if(this.lifetime > this.maxLifetime){
                    this.todelete = true;
                }else{
                    var relation = 1-this.lifetime/this.maxLifetime;
                    var size = Math.sqrt(relation);
                    this.width = this.baseWidth*size;
                    this.height = this.baseHeight*size;
                }
            }else{
                this.width = this.baseWidth;
                this.height = this.baseHeight;
            }
            this.checkAllShips();
        },
        checkAllShips : function () {
            for (var i = game.ships.length - 1; i >= 0; i--) {
                var curShip = game.ships[i];
                //console.log(this.side+"/"+curShip.side);
                if(this.side != curShip.side){

                    //this.checkHit(curShip);
                    for (var j = curShip.modules.length - 1; j >= 0; j--) {
                        //console.log(j+"/"+(curShip.modules.length-1));
                        this.checkHit(curShip.modules[j]);
                    };
                }
            };
        },
        //переход к повёрнутой координатной сетке
        checkHit : function (target) {
            if(target.destroyed == true){
                return;
            }
            var dx = this.x-target.x;
            var dy = this.y-target.y;

            var localx = Math.sin(target.angle)*dy + Math.cos(target.angle)*dx;
            var localy = Math.cos(target.angle)*dy - Math.sin(target.angle)*dx;

            /*var enemyx1 = Math.sin(-target.angle)*target.height/2 + Math.cos(-target.angle)*target.width/2;
            var enemyx2 = Math.sin(-target.angle)*target.height/2 + Math.cos(-target.angle)*target.width/2;

            var enemyy1 = Math.cos(-target.angle)*target.height/2 - Math.sin(-target.angle)*target.width/2;
            var enemyy2 = Math.cos(-target.angle)*target.height/2 - Math.sin(-target.angle)*target.width/2;*/

            /*var enemyx = Math.sin(-target.angle)*target.height/2 + Math.cos(-target.angle)*target.width/2;
            var enemyy1= Math.cos(-target.angle)*target.height/2 - Math.sin(-target.angle)*target.width/2;*/

            if(localx < target.sizeX/2 && localx > -target.sizeX/2 && 
                localy < target.sizeY/2 && localy > -target.sizeY/2){
                this.hitTarget(target);
            }
            /*var m1 = new MovingObject(this.img);
            m1.x = target.x + localx;
            m1.y = target.y + localy;
            m1.width = 5;
            m1.height = 5;
            game.objects.push(m1);*/
        },
        //упрощённая проверка столкновения
        /*checkHit : function (target) {
            var localx = this.x;
            var localy = this.y;

            var enemyx = target.x;
            var enemyy = target.y;

            if(localx < enemyx + target.width/2 && localx > enemyx - target.width/2 && 
                localy < enemyy + target.height/2 && localy > enemyy - target.height/2){
                this.hitTarget(target);
            }
        },*/
        hitTarget : function (target) {
            this.todelete = true;
            this.drawExplosion();
            target.takeDamage(this.damage);
        },
        drawExplosion : function () {
            var newSprite = new Sprite("explosion", 1);
            newSprite.x = this.x;
            newSprite.y = this.y;
            newSprite.baseHeight = this.damage;
            newSprite.baseWidth = this.damage;
            game.objects.push(newSprite);

            newSprite = new Sprite("glow", 1);
            newSprite.x = this.x;
            newSprite.y = this.y;
            newSprite.baseHeight = this.damage*2;
            newSprite.baseWidth = this.damage*2;
            game.objects.push(newSprite);
        },
        draw : function () {
            this.$super();
        },

    });
    return Shot;
});
define([
    'classy',
    'game/baseobject'
], function (
    Class,
    BaseObject
){
    var MovingObject = BaseObject.$extend ( {
        __init__ : function(Image) {
            //console.log("MovingObject "+Image);
            this.$super(Image);
            this.vx = 0;
            this.vy = 0;
            this.vangle = 0;
            this.friction = 0.96;
        },
        turn : function () {
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.vangle;
            if(this.angle > Math.PI){
                this.angle -= 2*Math.PI;
            }else if(this.angle < -Math.PI){
                this.angle += 2*Math.PI;
            }

            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vangle *= this.friction;
        },
        draw : function () {
            this.$super();
        },
    });
    return MovingObject;
});
define([
    'classy',
    'game/baseobject'
], function (
    Class,
    BaseObject
){
    var BindedObject = BaseObject.$extend ( {
        __init__ : function(Image) {
            console.log("BindedObject "+Image);
            this.$super(Image);
            this.bind = null;
            this.localx = 0;
            this.localy = 0;
            this.localangle = 0;
        },
        turn : function () {
            this.x = this.bind.x + Math.sin(-this.bind.angle)*this.localy + Math.cos(-this.bind.angle)*this.localx;
            this.y = this.bind.y + Math.cos(-this.bind.angle)*this.localy - Math.sin(-this.bind.angle)*this.localx;
            //console.log(this.x, this.y);

            this.angle = this.bind.angle + this.localangle;
            if(this.angle > Math.PI){
                this.angle -= 2*Math.PI;
            }else if(this.angle < -Math.PI){
                this.angle += 2*Math.PI;
            }
        },
        draw : function () {
            this.$super();
        },
    });
    return BindedObject;
});
define([
    'classy',
    'game/spritecontroller'
], function (
    Class,
    SpriteController
){
    var BaseObject = Class.$extend ( {

        __init__: function (Image, stage){
            this.x = 0;
            this.y = 0;
            this.angle = 0;

            this.vx = 0;
            this.vy = 0;
            this.vangle = 0;
            this.friction = 0.96;

            this.width = 0;
            this.height = 0;
            this.alpha = 1;

            this.sizeX = 0;
            this.sizeY = 0;

            this.img = Image;
            this.stage = stage;

            this.todelete = false;

            this.bind = null;
            this.localx = 0;
            this.localy = 0;
            this.localangle = 0;

            this.depth = 1;

            this.oldX = 0;
            this.oldY = 0;

        },

        createSprite : function (){
            if(this.img != null){
                if(!this.stage){
                    this.stage = "world";
                }
                game.addSpriteController(new SpriteController(this.stage, this, this.img.src));
            }
        },

        lock : function (target, shift){
            this.bind = target;
            if(shift){
                this.localx = shift.x;
                this.localy = shift.y;
                this.localangle = shift.angle;
            }else{
                this.localx = 0;
                this.localy = 0;
                this.localangle = 0;
            }
        },

        unlock : function (target, shift){
            this.bind = null;
        },

        turn : function () {
            if(this.bind){
                this.oldX = this.x;
                this.oldY = this.y;
                this.x = this.bind.x + Math.sin(-this.bind.angle)*this.localy + Math.cos(-this.bind.angle)*this.localx;
                this.y = this.bind.y + Math.cos(-this.bind.angle)*this.localy - Math.sin(-this.bind.angle)*this.localx;
                
                this.angle = this.bind.angle + this.localangle;
                if(this.angle > Math.PI){
                    this.angle -= 2*Math.PI;
                }else if(this.angle < -Math.PI){
                    this.angle += 2*Math.PI;
                }
                this.vx = this.x - this.oldX;
                this.vy = this.y - this.oldY;
                //console.log("locked turn");
            }else{
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
            }
        },

        draw : function () {

        },
    });
    return BaseObject;
});
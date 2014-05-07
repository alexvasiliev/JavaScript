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

            this.width = 0;
            this.height = 0;
            this.alpha = 1;

            this.sizeX = 0;
            this.sizeY = 0;

            this.img = Image;

            this.todelete = false;

            if(Image != null){
                if(!stage){
                    stage = "world";
                }
                game.addSpriteController(new SpriteController(stage, this, Image.src));
            }
        },

        turn : function () {

        },

        draw : function () {
            //renderer.drawObject(this);
        },
    });
    return BaseObject;
});
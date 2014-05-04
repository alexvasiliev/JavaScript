define([
    'classy',
    'game/spritecontroller'
], function (
    Class,
    SpriteController
){
    var BaseObject = Class.$extend ( {

        __init__: function (Image){
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.angle = 0;
            this.img = Image;
            this.todelete = false;
            this.alpha = 1;
            if(Image != null){
                game.addSpriteController(new SpriteController(this, Image.src));
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
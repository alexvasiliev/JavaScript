define([
    'classy'
], function (
    Class
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
            this.alpha = -1;
            //this.renderer = renderer;
            //this.img.src = 'static/epic.png';
        },

        turn : function () {
            /*this.x += this.vx;
            this.y += this.vy;
            this.angle += this.vangle;*/
        },

        draw : function () {
            renderer.drawObject(this);
        },
    });
    return BaseObject;
});
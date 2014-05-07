define([
    'classy',
    'pixi'
], function (
    Class,
    Pixi
){
    var SpriteController = Class.$extend ( {
        __init__ : function(stage, owner, imgsrc) {
            this.owner = owner;
            this.stage = stage;
            var texture = Pixi.Texture.fromImage(imgsrc);
            this.sprite = new Pixi.Sprite(texture);
            //PIXI.Sprite.fromImage("spinObj_01.png");
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;
            this.sprite.pivot.x = 0.5;
            this.sprite.pivot.y = 0.5;
            renderer[this.stage].addChild(this.sprite);
            this.todelete = false;
        },
        check : function(){
            if(this.owner == null || this.owner.todelete == true){
                this.todelete = true;
                renderer[this.stage].removeChild(this.sprite);
                //console.log(this.owner.todelete + ", " + this.todelete);
                return;
            }
            this.sprite.width = this.owner.width;
            this.sprite.height = this.owner.height;
            this.sprite.x = this.owner.x;
            this.sprite.y = this.owner.y;
            this.sprite.alpha = this.owner.alpha;
            this.sprite.rotation = this.owner.angle;

        }

    });
    return SpriteController;
});
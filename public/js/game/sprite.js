define([
    'classy',
    'game/baseobject'
], function (
    Class,
    BaseObject
){
    var Sprite = BaseObject.$extend ( {
        __init__ : function(type, number) {

            var img;
            if(type == 1 || type == "explosion"){
                img = resourses["sprite_explosion"+number];
            }else if(type == 2 || type == "glow"){
                img = resourses["sprite_glow"+number];
            }else if(type == 3 || type == "flame"){
                img = resourses["sprite_flame"+number];
            }
            this.$super(img);
            if(type == 1 || type == "explosion"){
                this.baseWidth = 100*(Math.random()+0.1)/1.1;
                this.baseHeight = this.baseWidth;
                this.maxLifetime = 40*(Math.random()+2)/3;
                game.objects.push(this);
            }else if(type == 2 || type == "glow"){
                this.baseWidth = 150*(Math.random()+0.1)/1.1;
                this.baseHeight = this.baseWidth;
                this.maxLifetime = 10*(Math.random()+2)/3;
                game.objects.push(this);
            }else if(type == 3 || type == "flame"){
                this.baseWidth = img.width/4*(2-Math.random());
                this.baseHeight = img.height/4*(2-Math.random());
                this.maxLifetime = 30;
                game.objects.push(this);
            }
            this.waitTime = 0;
            this.lifetime = 0;
            this.todelete = false;
        },
        turn : function () {
            if(this.waitTime > 0){
                this.waitTime -= 1;
            }else{
                if(this.maxLifetime > 0){
                    this.lifetime += 1;
                    if(this.lifetime >= this.maxLifetime){
                        this.todelete = true;
                    }else{
                        var relation = this.lifetime/this.maxLifetime;
                        this.alpha = Math.sqrt(1-relation);
                        var size = Math.sqrt(relation);
                        this.width = this.baseWidth*size;
                        this.height = this.baseHeight*size;
                    };
                }else{
                    this.alpha = 1;
                    this.width = this.baseWidth;
                    this.height = this.baseHeight;
                }
            }
        },
        draw : function () {
            if(this.waitTime <= 0){
                this.$super();
            }
        },
    });
    return Sprite;
});
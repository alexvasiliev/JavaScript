define([
    'classy',
    'game/baseobject'
], function (
    Class,
    BaseObject
){
    var Shop = BaseObject.$extend ( {
        __init__ : function() {
            var img  = resourses["shop_screen"];
            console.log("BaseObject "+img);
            this.$super(img);
            this.x = 200;//-renderer.sceneWidth/2;
            this.y = 300;//-renderer.sceneHeight/2;
            this.width = 0;//renderer.sceneWidth-100;
            this.height = 0;//renderer.sceneHeight-100;
            this.modules = [];
            this.items = [];
            this.inventaryx = 200;
            this.inventaryy = 200;
            //this
        },
        turn : function () {

        },
        addProduct : function (product) {
            if(product.energyCapacity){
                this.modules.push(product);
            }else{
                this.items.push(product);
            }

        },
        draw : function () {
            this.$super();
            //for()
        },
    });
    return Shop;
});
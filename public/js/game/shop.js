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
            this.$super(img);
            this.x = renderer.sceneWidth/2;
            this.y = renderer.sceneHeight/2;
            this.width = renderer.sceneWidth-100;
            this.height = renderer.sceneHeight-100;
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
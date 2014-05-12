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
            this.$super(img, "gui");
            this.alpha = 0;
            this.x = renderer.sceneWidth/2;
            this.y = renderer.sceneHeight/2;
            var shift = 100;
            var sizeModifier = 2/2;
            var width = renderer.sceneWidth-shift;
            var height = renderer.sceneHeight-shift
            var sizeK = img.width / img.height;
            /*console.log("Shop "+ img);
            console.log(width+","+height);
            console.log(img.width+","+img.height);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");*/

            if(img.width > 0 && img.height > 0 && width / img.width < height / img.height){
                console.log("width");
                this.width = width*sizeModifier;
                this.height = this.width / sizeK;
            }else{
                console.log("height");
                this.height = height*sizeModifier;
                this.width = this.height * sizeK;
            }
            //this.width = renderer.sceneWidth-100;
            //this.height = renderer.sceneHeight-100;
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
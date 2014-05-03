define([
    'classy'
], function (
    Class
){
    var Slot = Class.$extend ( {
        __init__ : function(size, x, y) {
            this.status = "open";
            this.target = null;
            this.size = size;
            this.x = x;
            this.y = y;
            //this.energyTransitionMax = size*size + 1;
            //this.energyTransition = 0;
        },

    });
    return Slot;
});
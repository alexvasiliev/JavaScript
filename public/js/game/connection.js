define([
    'classy'
], function (
    Class
){
    var Connection = Class.$extend ( {
        __init__ : function(size, x, y, angle) {
            this.status = "open";
            this.target = null;
            this.size = size;
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.energyTransitionMax = size*size + 1;
            this.energyTransition = 0;
        },

    });
    return Connection;
});
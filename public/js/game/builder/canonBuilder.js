

define([
    'classy',
    'game/canon'
], function (
    Class,
    Canon
){
    var CanonBuilder = Class.$extend ( {
        __init__: function (){
            this.canon = null;
        },
        newCanon : function (){
            this.canon = new Canon();
        },
        getCanon: function(){
            return this.canon;
        },

        
    });
    return CanonBuilder;
});
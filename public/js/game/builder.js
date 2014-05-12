

define([
    'classy',
    'pixi',
    'game/builder/moduleBuilder',
    'game/builder/shipBuilder'
], function (
    Class,
    Pixi,
    moduleBuilder,
    shipBuilder
){
    var Builder = Class.$extend ( {
        __init__: function (){
            this.module = new moduleBuilder();
            this.ship = new shipBuilder();
        },
    });
    return Builder;
});


define([
    'classy',
    'pixi',
    'game/builder/moduleBuilder',
    'game/builder/canonBuilder',
    'game/builder/shipBuilder'
], function (
    Class,
    Pixi,
    moduleBuilder,
    canonBuilder,
    shipBuilder
){
    var Builder = Class.$extend ( {
        __init__: function (){
            this.module = new moduleBuilder();
            this.ship = new shipBuilder();
            this.item = new canonBuilder();
        },
    });
    return Builder;
});
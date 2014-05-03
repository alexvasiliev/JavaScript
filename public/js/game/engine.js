

define([
    'classy',
    'game/ship',
    'game/module',
    'game/pilot',
    'game/canon'
], function (
    Class,
    Ship,
    Module,
    Pilot, 
    Canon
){
    var Engine = Class.$extend ( {

        __init__: function (){
            //console.log(renderer);

        },
        moveObjects : function (objects) {
            for (var i = 0; i < objects.length; i++)
            {
                objects[i].turn();
            }
        },
        addEnemy : function (power) {
            var enemyShip = new Ship(1, 1);
            var randomAngle = Math.random()*Math.PI*2;
            var sqrRange = renderer.sceneHeight*renderer.sceneHeight + renderer.sceneWidth*renderer.sceneWidth;
            var range = Math.sqrt(sqrRange);
            enemyShip.x = game.x + range*Math.sin(range);
            enemyShip.y = game.y + range*Math.cos(range);
            enemyShip.velocity = 0.05 + Math.random()*power*0.05;
            enemyShip.angleVelocity = 0.002 + Math.random()*0.002;
            plasmaCanon = new Canon( 1, 2, 1);
            enemyShip.attachItem(plasmaCanon, "canon", enemyShip.body.slots[0], enemyShip.body);

            enemyPilot = new Pilot(enemyShip, 0);
            game.pilots.push(enemyPilot);

            game.ships.push(enemyShip);

            //console.log(enemyShip.x + ", " + enemyShip.y);
        }
    });
    return Engine;
});
define([
    'classy',
    'game/engine',
    'game/renderer',
    'game/ship',
    'game/player',
    'game/module',
    'game/staticdepthobject',
    'game/pilot',
    'game/canon',
    'game/resourses',
    'game/shop'
], function (
    Class,
    Engine,
    Renderer,
    Ship,
    Player,
    Module,
    StaticDepthObject, 
    Pilot, 
    Canon,
    Resourses,
    Shop
){
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
    var Game = Class.$extend ( {
        clearArray:function(array){
            for (var i = 0; i < array.length;) {
                delete(array[i]);
                array.splice(i, 1);
            };
        },
        clearAll:function(){
            this.clearArray(this.ships);
            this.clearArray(this.shots);
            this.clearArray(this.background);
            this.clearArray(this.objects);
            this.clearArray(this.pilots);
            this.clearArray(this.spriteContainers);
        },

        startNew : function (){
            this.clearAll();

            this.addPlayer();
            this.addStars();

            this.x = 0;
            this.y = 0;

            this.vx = 0;
            this.vy = 0;
            
            this.enemyCooldown = 1000;
            this.enemyTimer = this.enemyCooldown;
            this.enemyPower = 1;
            this.score = 0;

            this.lastSeconds = 30;

            this.pause = false;
            this.lost = false;
            this.play = true;
        },
        start : function (){
            this.play = true;
        },
        stop : function (){
            this.play = false;
        },
        addSpriteController : function (target){
            this.spriteContainers.push(target);
        },

        __init__: function (){
            this.ships = [];
            this.shots = [];
            this.background = [];
            this.objects = [];
            this.pilots = [];
            this.spriteContainers = [];

            game = this;

            this.renderer = new Renderer();
            renderer = this.renderer;
            renderer.setSceneSize(800, 600);

            this.engine = new Engine();
            engine = this.engine;

            this.resourses = new Resourses();
            resourses = this.resourses;

            this.shop = new Shop();
            shop = this.shop;

            this.listenToKeyboard();

            this.friction = 0.95;

            this.pause = false;
            this.play = false;
            this.lost = false;

            this.spacePressed = false;

            this.animloop();
        },
        listenToKeyboard : function () {
            var game = this;
            this.keydown = [];
            $(document).bind("keydown", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = true;
            });
             $(document).bind("keyup", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = false;
            });
        },
        checkPause : function () {
            if(this.keydown[" "] == true){
                if(this.spacePressed == false){
                    if(this.pause == false){
                        this.pause = true;
                    }else{
                        this.pause = false;
                    }
                }
                this.spacePressed = true;
            }else{
                this.spacePressed = false;
            }
        },
        addStars : function () {
            for(var i = 0; i < 10; i++){
                var newStar = new StaticDepthObject("star", 1);
            }
        },
        addPlayer : function () {
            this.playerShip = new Ship(1, 1);
            this.playerShip.x = renderer.sceneWidth/2;
            this.playerShip.y = renderer.sceneHeight/2;
            this.playerShip.velocity = 0.07;
            this.playerShip.angleVelocity = 0.002;
            this.ships.push(this.playerShip);

            this.player = new Player(this.playerShip, 1);
            this.pilots.push(this.player);

            var module = new Module(1, 0);
            this.playerShip.attachModule(module, module.connections[0], 0, 
                this.playerShip.body.connections[0], this.playerShip.body);
            //console.log(module);
            var module2 = new Module(1, 0);
            this.playerShip.attachModule(module2, module2.connections[2], 0, 
                module.connections[3], module);
            var module3 = new Module(1, 0);
            this.playerShip.attachModule(module3, module3.connections[1], Math.PI, 
                module2.connections[1], module2);
            var plasmaCanon = new Canon( 2, 1, 1);
            this.playerShip.attachItem(plasmaCanon, "canon", module.slots[0], module);
            var plasmaCanon2 = new Canon( 2, 2, 1);
            this.playerShip.attachItem(plasmaCanon2, "canon", module2.slots[0], module2);
            //console.log(plasmaCanon + ", " +"canon" + ", " + module.slots[0] + ", " +module);
            //this.playerShip.trace();

            var enemyShip = new Ship(1, 1);
            enemyShip.x = renderer.sceneWidth/2+100;
            enemyShip.y = renderer.sceneHeight/2;
            enemyShip.velocity = 0.07;
            enemyShip.angleVelocity = 0.002;
            this.ships.push(enemyShip);

            enemyPilot = new Pilot(enemyShip, 0);
            this.pilots.push(enemyPilot);
            /*plasmaCanon = new Canon( 1, 2, 1);
            //console.log("123");
            enemyShip.attachItem(plasmaCanon, "canon", enemyShip.body.slots[0], enemyShip.body);
            //console.log("23");

            module = new Module(1, 1);
            this.playerShip.attachModule(module, module.connections[2], 0, 
                this.playerShip.body.connections[3], this.playerShip.body);
            module = new Module(1, 1);
            this.playerShip.attachModule(module, module.connections[1], 0, 
                this.playerShip.body.connections[1], this.playerShip.body);
            var plasmaCanon = new Canon(module, 2, 1, 1);
            this.playerShip.attachCanon(plasmaCanon);*/


        },
        addShot : function (shot) {
            this.shots.push(shot);
        },
        turnMany : function (objects) {
            for (var i = 0; i < objects.length; )
            {
                objects[i].turn();
                if(objects[i].todelete == true){
                    delete(objects[i]);
                    objects.splice(i, 1);
                }else{
                    i++;
                }
            }
        },
        turnAll : function () {
            this.checkPause();
            if(game.pause == true || this.lost == true){
                return;
            }
            this.turnMany(this.ships);
            this.turnMany(this.shots);
            this.turnMany(this.objects);
            this.turnMany(this.pilots);
            this.turnMany(this.background);
            this.checkBroders();
            this.addEnemies();
            this.score++;
        },
        drawMany : function (objects) {
            for (var i = 0; i < objects.length; i++)
            {
                objects[i].draw();
            }
        },
        drawGUI : function () {
            /*if(game.pause == true){
                shop.draw();
                var dx = -this.playerShip.x+(this.renderer.sceneWidth)/2;
                var dy = -this.playerShip.y+(this.renderer.sceneHeight)/2;
                console.log(dx + ", " + dy);
                renderer.setTempShift(dx, dy, 0);
                this.playerShip.draw();
                renderer.resetTempShift();
            }*/
            renderer.drawText(this.score, 20, 50, 15, 20, "#FFF");
        },
        drawAll : function () {
            for (var i = 0; i < this.spriteContainers.length; i++)
            {
                this.spriteContainers[i].check();
                if(this.spriteContainers[i].todelete == true){
                    delete(this.spriteContainers[i]);
                    this.spriteContainers.splice(i, 1);
                    i--;
                }

            }
            //renderer.clearScene();
            //renderer.drawBackground();
            /*renderer.setShift(this.x, this.y);
            this.drawMany(this.background);
            this.drawMany(this.ships);
            this.drawMany(this.shots);
            this.drawMany(this.objects);*/
            this.drawGUI();

            renderer.mainView.render(renderer.world);
            renderer.shipView.render(renderer.world);
            renderer.shopView.render(renderer.world);
        },
        checkBroders : function () {
            this.x += this.vx;
            this.y += this.vy;
            var speed = 0.01;
            this.vx -= (this.playerShip.x + this.x - this.renderer.sceneWidth/2)*speed;
            this.vy -= (this.playerShip.y + this.y - this.renderer.sceneHeight/2)*speed;
            //console.log((this.playerShip.x + this.x) + ", " + (this.playerShip.y + this.y));
            this.vx *= this.friction;
            this.vy *= this.friction;
        },
        addEnemies : function () {
            //console.log(this.enemyTimer);
            this.enemyTimer += 1;
            if(this.enemyTimer > this.enemyCooldown){
                this.enemyTimer = 0;
                engine.addEnemy(this.enemyPower);
                this.enemyPower += 1;
            }
        },
        update : function () {
            if(!this.play){
                return;
            }
            this.turnAll();
            this.drawAll();
        },
        animloop : function(){
            var game = this;
            game.update();
            requestAnimFrame(function() {
                game.animloop();
            });
        },
        gameOver :function () {
            console.log("Game Over");
            this.lastSeconds -= 1;
            this.play = false;
            
        },
        /*submit : function () {
        },*/

    });
    return Game;
});


document.onkeydown = function (e) {
    e = e || window.event;
    if (32 == e.keyCode){
        console.log("space");
        return false;
    }
}










/*console.time('foo');
for(var i = 0; i < 1000000; i++);
console.timeEnd('foo');*/


/*document.onkeydown = function (e) {
    e = e || window.event;
    if (32 == e.keyCode){
        console.log("space");
        return false;
    }
}

<!DOCTYPE html>
<html>
<body>

<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>
<canvas id="myCanvas2"  width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>

<script>
//style="display:none"
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var c2=document.getElementById("myCanvas2");
var ctx2=c2.getContext("2d");
ctx.fillStyle="red";
ctx.fillRect(10,10,50,50);

function copy()
{
var sizex = 50;
var sizey = 50;
var imgData=ctx.getImageData(10,10,sizex,sizey);
for (var i = 0; i < sizex; i += 1){
  for (var j = 0; j < sizey; j += 1){
    var curi = (i + j * sizex) * 4;
    imgData.data[curi+0] *= (i/sizex)/2+(j/sizey)/2;
    imgData.data[curi+1]=0;
    imgData.data[curi+2]=0;
    imgData.data[curi+3]=255;
  }
}
ctx2.putImageData(imgData, 10, 10, 0, 0, 50, 50);
}
function rotate(){
var sizex = 50;//чётное
var sizey = 50;
var imgData=ctx.getImageData(10,10,sizex,sizey);

var buffer = document.createElement('canvas');
buffer.width  = 50;
buffer.height = 50;

var ctxBuffer=buffer.getContext("2d");
ctxBuffer.fillStyle="black";
ctxBuffer.fillRect(0,0,50,50);
ctxBuffer.fillStyle="yellow";
ctxBuffer.fillRect(10,10,30,30);

var newImg = new Image();
newImg.src = buffer.toDataURL();
ctx.drawImage(newImg, 50, 50, 20, 20);
}

</script>
<p>
<button onclick="copy()">Copy</button>
<button onclick="rotate()">Rotate</button>

</body>
</html>*/
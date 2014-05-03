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
    'game/resourses'
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
    Resourses
){
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
    var Game = Class.$extend ( {

        __init__: function (){
            this.ships = [];
            this.shots = [];
            this.background = [];
            this.objects = [];
            this.pilots = [];


            this.renderer = new Renderer();
            renderer = this.renderer;
            this.setSceneSize(800, 600);
            game = this;

            this.engine = new Engine();

            this.resourses = new Resourses();
            resourses = this.resourses;


            this.addPlayer();
            this.listenToKeyboard();

            this.x = 0;
            this.y = 0;

            this.vx = 0;
            this.vy = 0;
            this.friction = 0.99;

            /*this.img = new Image();
            this.img.src = 'static/epic.png';


            var newStar = new StaticDepthObject(this.img);
            newStar.x = 13;
            newStar.y = 13;
            newStar.angle = 123;
            newStar.width = 100;
            newStar.height = 100;
            newStar.depth = 10;
            this.objects.push(newStar);

            var newObject = new Ship(this.img);
            newObject.x = 123;
            newObject.y = 123;
            newObject.angle = 0;
            newObject.width = 20;
            newObject.height = 20;
            newObject.vx = 0.01;
            newObject.vy = 0.01;
            newObject.vangle = 0.001;
            this.objects.push(newObject);

            var newModule = new Module(this.img, newObject);
            newModule.localx = 50;
            newModule.localy = 0;
            newModule.localangle = 0;
            newModule.width = 30;
            newModule.height = 30;
            this.objects.push(newModule);*/

            this.animloop();
        },
        addPlayer : function () {
            this.playerShip = new Ship(1);
            this.playerShip.x = 323;
            this.playerShip.y = 123;
            this.playerShip.angle = 1.570;
            this.playerShip.width = 20;
            this.playerShip.height = 60;
            this.playerShip.vx = 0;
            this.playerShip.vy = 0;
            this.playerShip.vangle = 0;
            this.playerShip.velocity = 0.07;
            this.playerShip.angleVelocity = 0.002;
            this.ships.push(this.playerShip);

            this.player = new Player(this.playerShip, 1);
            this.pilots.push(this.player);


            var module = new Module(this.playerShip, 1);
            module.localx = 20;
            this.playerShip.attachModule(module);

            var module2 = new Module(this.playerShip, 1);
            module2.localx = -20;
            this.playerShip.attachModule(module2);

            var module3 = new Module(this.playerShip, 1);
            module3.localy = 40;
            this.playerShip.attachModule(module3);


            var plasmaCanon = new Canon(module, 2, 2, 1);
            this.playerShip.attachCanon(plasmaCanon);
            var plasmaCanon = new Canon(module2, 2, 2, 1);
            this.playerShip.attachCanon(plasmaCanon);
            var plasmaCanon = new Canon(module3, 1, 1, 1);
            this.playerShip.attachCanon(plasmaCanon);



            var enemyShip = new Ship(1);
            enemyShip.x = 623;
            enemyShip.y = 123;
            enemyShip.angle = 0;
            enemyShip.width = 20;
            enemyShip.height = 60;
            enemyShip.vx = 0;
            enemyShip.vy = 0;
            enemyShip.vangle = 0;
            enemyShip.velocity = 0.06;
            enemyShip.angleVelocity = 0.002;
            this.ships.push(enemyShip);

            var enemyPilot = new Pilot(enemyShip, 0);
            this.pilots.push(enemyPilot);


            var module = new Module(enemyShip, 1);
            module.localx = 0;
            module.localy = 40;
            module.localangle = 0;
            module.width = 20;
            module.height = 20;
            enemyShip.attachModule(module);


            var plasmaCanon = new Canon(module, 1, 2, 1);
            enemyShip.attachCanon(plasmaCanon);


            enemyShip = new Ship(1);
            enemyShip.x = 623;
            enemyShip.y = 323;
            enemyShip.angle = 0;
            enemyShip.width = 20;
            enemyShip.height = 60;
            enemyShip.vx = 0;
            enemyShip.vy = 0;
            enemyShip.vangle = 0;
            enemyShip.velocity = 0.05;
            enemyShip.angleVelocity = 0.002;
            this.ships.push(enemyShip);

            enemyPilot = new Pilot(enemyShip, 0);
            this.pilots.push(enemyPilot);


            module = new Module(enemyShip, 1);
            module.localx = 0;
            module.localy = 40;
            module.localangle = 0;
            module.width = 20;
            module.height = 20;
            enemyShip.attachModule(module);


            plasmaCanon = new Canon(module, 1, 1, 1);
            enemyShip.attachCanon(plasmaCanon);



            module = new Module(enemyShip, 1);
            module.localx = 0;
            module.localy = 60;
            module.localangle = 0;
            module.width = 20;
            module.height = 20;
            enemyShip.attachModule(module);


            plasmaCanon = new Canon(module, 1, 1, 1);
            enemyShip.attachCanon(plasmaCanon);

            for(var i = 0; i < 10; i++){
                var newStar = new StaticDepthObject("star", 1);
            }

        },
        addShot : function (shot) {
            this.shots.push(shot);
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
        setSceneSize : function (x, y) {
            this.renderer.sceneWidth = x;
            this.renderer.sceneHeight = y;

            this.renderer.canvas.width = this.renderer.sceneWidth;
            this.renderer.canvas.height = this.renderer.sceneHeight;
        },
        turnMany : function (objects) {
            for (var i = 0; i < objects.length; i++)
            {
                objects[i].turn();
            }
        },
        turnAll : function () {
            this.turnMany(this.ships);
            this.turnMany(this.shots);
            this.turnMany(this.objects);
            this.turnMany(this.pilots);
            this.turnMany(this.background);
        },
        drawMany : function (objects) {
            for (var i = 0; i < objects.length;)
            {
                if(objects[i].todelete == true){
                    delete(objects[i]);
                    objects.splice(i, 1);
                }else{
                    objects[i].draw();
                    i++;
                }
            }
        },
        drawAll : function () {
            this.renderer.clearScene();
            this.renderer.drawBackground();
            this.drawMany(this.background);
            this.drawMany(this.ships);
            this.drawMany(this.shots);
            this.drawMany(this.objects);
        },
        checkBroders : function () {
            var border = 100;
            var speed = 0.03;
            this.vx *= this.friction;
            this.vy *= this.friction;
            if(this.playerShip.x + this.x < border){
                this.vx += speed;
            }else if(this.playerShip.x + this.x > this.renderer.sceneWidth - border){
                this.vx -= speed;
            }
            if(this.playerShip.y + this.y < border){
                this.vy += speed;
            }else if(this.playerShip.y + this.y > this.renderer.sceneHeight - border){
                this.vy -= speed;
            }
            this.x += this.vx;
            this.y += this.vy;
        },
        update : function () {
            this.renderer.clearScene();
            this.renderer.drawBackground();
            this.turnAll();
            //this.drawAll();

            //this.renderer.drawObjects(this.objects);
            for (var i = 0; i < this.background.length; i++)
            {
                this.background[i].draw();
                if(this.background[i].todelete == true){
                    delete(this.background[i]);
                    this.background.splice(i, 1);
                }
            }
            for (var i = 0; i < this.ships.length; i++)
            {
                this.ships[i].draw();
                if(this.ships[i].todelete == true){
                    delete(this.ships[i]);
                    this.ships.splice(i, 1);
                }
            }
            for (var i = 0; i < this.objects.length; i++)
            {
                this.objects[i].draw();
                //console.log(this.objects.length);
                if(this.objects[i].todelete == true){
                    delete(this.objects[i]);
                    this.objects.splice(i, 1);
                }
            }
            for (var i = 0; i < this.shots.length; i++)
            {
                this.shots[i].draw();
                if(this.shots[i].todelete == true){
                    delete(this.shots[i]);
                    this.shots.splice(i, 1);
                }
            }


            //console.log(this.vx+""+this.vy);
            //console.log(this.x+""+this.y);
        },
        animloop : function(){
            var game = this;
            game.update();
            requestAnimFrame(function() {
                game.animloop();
            });
        },

    });
    return Game;
});
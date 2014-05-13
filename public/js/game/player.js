define([
    'classy', 
    'game/pilot'
], function (
    Class,
    Pilot
){
    var Player = Pilot.$extend ( {
        __init__ : function(ship, side) {
            this.$super(ship, side);
        },
        turn : function () {
            if(this.ship){
                if(this.ship.body.destroyed == true){
                    game.gameOver();
                }
                this.checkTarget();
                this.move();
                if(this.target){
                    this.attack();
                }
            }else{
                this.todelete = true;
            }
        },
        checkTarget : function () {
            this.$super();
        },
        move : function () {
            //console.log("hi");
            var backwardsPower = 0.3;
            if(game.keydown["w"] == true){
                this.ship.vx += this.ship.velocity*Math.sin(this.ship.angle);
                this.ship.vy -= this.ship.velocity*Math.cos(this.ship.angle);
            }else if(game.keydown["s"] == true){
                this.ship.vx -= this.ship.velocity*Math.sin(this.ship.angle)*backwardsPower;
                this.ship.vy += this.ship.velocity*Math.cos(this.ship.angle)*backwardsPower;
            }
            if(game.keydown["a"] == true){
                this.ship.vangle -= this.ship.angleVelocity;
            }else if(game.keydown["d"] == true){
                this.ship.vangle += this.ship.angleVelocity;
            }


            $(document).on('action', function(event, param){
                par = param.split(' ');
                if(par[0] == 1){
                    if(par[1] == 1)
                    {
                        console.log("move1");

                    }
                    if(par[1] == 2)
                    {
                        console.log("move2");

                    }
                    if(par[1] == 3)
                    {
                        console.log("move3");

                    }
                    if(par[1] == 4)
                    {
                        console.log("move4");

                    }
                }
                if(par[0] == 3){
                    console.log("shoot");
                }
                //console.log('ping', param);
            });

        },
        attack : function () {
            this.$super();
        },

    });
    return Player;
});


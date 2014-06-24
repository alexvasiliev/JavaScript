

define([
    'classy'
], function (
    Class
){
    var Renderer = Class.$extend ( {

        __init__: function (){
            this.sceneWidth = 800;
            this.sceneHeight = 600;

            this.canvas = document.getElementById('canvas');
            this.canvas.width = this.sceneWidth;
            this.canvas.height = this.sceneHeight;

            this.ctx = canvas.getContext('2d');
            this.realx = 0;
            this.realy = 0;
            this.angle = 0;
            this.x = 0;
            this.y = 0;
            console.log(this.ctx);
        },
        drawText : function(text, x, y) {
            this.ctx.fillStyle = "#FFF";
            this.ctx.strokeStyle = "#FFF";
            this.ctx.font = "italic 30pt Arial";
            this.ctx.fillText(text, x, y);
            //this.ctx.font = 'bold 30px sans-serif';
            //this.ctx.fillText("player name", 20, 100);
        },
        setTempShift : function (x, y, angle){
            this.x += x;
            this.y += y;
            this.angle += angle;
        },
        resetTempShift : function () {
            this.x = this.realx;
            this.y = this.realy;
            this.angle = 0;
        },
        superDraw : function (image, x, y, width, height, angleInRadians) {
            this.ctx.translate(x, y);
            this.ctx.rotate(angleInRadians);
            this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
            this.ctx.rotate(-angleInRadians);
            this.ctx.translate(-x, -y);
        },
        superDraw : function (image, x, y, width, height, angleInRadians, alpha) {
            this.ctx.translate(x, y);
            this.ctx.globalAlpha = alpha;
            this.ctx.rotate(angleInRadians+this.angle);
            this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
            this.ctx.rotate(-angleInRadians-this.angle);
            this.ctx.globalAlpha = 1;
            this.ctx.translate(-x, -y);
        },
        setShift : function (x, y) {
            this.realx = this.x = x;
            this.realy = this.y = y;
        },
        drawBackground : function () {
            this.superDraw(resourses.background, this.sceneWidth/2, this.sceneHeight/2,
                this.sceneWidth, this.sceneHeight);
            this.setShift(this.x, this.y);
        },
        clearScene : function () {
            this.ctx.clearRect(0, 0, this.sceneWidth, this.sceneHeight);
        },
        drawObjects : function (objects) {
            for (var i = 0; i < objects.length; i++)
            {
                if(objects[i].depth){
                    var tempx = objects[i].x + this.x/objects[i].depth;
                    var tempy = objects[i].y + this.y/objects[i].depth;
                    var temph = objects[i].height/objects[i].depth;
                    var tempw = objects[i].width/objects[i].depth;
                }else {
                    var tempx = objects[i].x + this.x;
                    var tempy = objects[i].y + this.y;
                    var temph = objects[i].height;
                    var tempw = objects[i].width;
                }
                if((tempy + temph > 0) && (tempy - temph < this.sceneHeight) &&
                        (tempx + tempw > 0) && (tempx - tempw < this.sceneWidth))
                {
                    this.superDraw(objects[i].img, tempx, tempy, tempw, temph, objects[i].angle);
                }
            }
        },
        drawObject : function (object) {
            if(object.depth){
                var tempx = object.x + this.x/object.depth;
                var tempy = object.y + this.y/object.depth;
                var temph = object.height/object.depth;
                var tempw = object.width/object.depth;
            }else {
                var tempx = object.x + this.x;
                var tempy = object.y + this.y;
                var temph = object.height;
                var tempw = object.width;
            }
            if((tempy + temph > 0) && (tempy - temph < this.sceneHeight) &&
                    (tempx + tempw > 0) && (tempx - tempw < this.sceneWidth))
            {
                if(object.alpha == -1){
                    this.superDraw(object.img, tempx, tempy, tempw, temph, object.angle);
                }else{
                    this.superDraw(object.img, tempx, tempy, tempw, temph, object.angle, object.alpha);
                }
            }
        },
    });
    return Renderer;
});
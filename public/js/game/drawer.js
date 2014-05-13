

define([
    'classy',
    'pixi'
], function (
    Class,
    Pixi
){
    var Drawer = Class.$extend ( {
        __init__: function (){
            this.angleSize = 10;
            this.cellSize = 25;
            this.slotSize = 15;
            this.connectionSize = 15;
            ///////////////
            /*this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas); ;
            //this.canvas.style.border = "1px solid #d3d3d3;";
            this.canvas.style = "border:1px solid #d3d3d3;";
            this.renderer = this.canvas.getContext("2d");*/

            this.width = null;
            this.height = null;

            this.materialName = null;
            this.materialSquere = null;
            this.materialTriangle = null;

            this.connectorName = null;
            this.connectorEnd = null;
            this.connectorSlot = null;
            this.connectorLine = null;
            this.connectorConnection = null;

            this.map = null;

            this.mapRows = null;
            this.mapColomns = null;

            this.cellWidth = null;
            this.cellHeight = null;

        },
        drawModule : function(module){
            //console.log("drawModule");
            this.newDrawing(module.mapColomns, module.mapRows);

            this.setBaseMaterial(module.material);
            this.setConnectorMaterial();
            this.drawBase();

            for(var i = 0; i < module.connections.length; i++){
                this.drawConnection(module.connections[i]);
            }
            for(var i = 0; i < module.slots.length; i++){
                this.drawSlot(module.slots[i]);
            }
        },
        newDrawing : function(width, height){

            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas); ;
            //this.canvas.style.border = "1px solid #d3d3d3;";
            this.canvas.style = "border:1px solid #d3d3d3;";
            this.renderer = this.canvas.getContext("2d");

            this.width  = width*this.cellSize;
            this.height = height*this.cellSize;

            //console.log(this.width+", "+this.height);

            this.canvas.width  = this.width;
            this.canvas.height = this.height;

            this.material = null;
            this.materialName = null;

            this.map = null;

            this.mapRows = null;
            this.mapColomns = null;

            this.cellWidth = null;
            this.cellHeight = null;
        },

        setBaseMaterial : function (material){
            this.materialName = "material_" + material;
            this.materialSquere = resourses[this.materialName + "_squere"];
            this.materialTriangle = resourses[this.materialName + "_triangle"];
        },

        setConnectorMaterial : function (){
            this.connectorName = "module_connection";
            this.connectorEnd = resourses[this.connectorName + "_end"];
            this.connectorSlot = resourses[this.connectorName + "_node_center"];
            this.connectorLine = resourses[this.connectorName + "_line"];
            this.connectorConnection = resourses[this.connectorName + "_connector"];
        },

        drawBase : function(){
            this.drawRectangle(this.width - 2*this.angleSize, this.height - 2*this.angleSize, 
                this.angleSize, this.angleSize);//center

            this.drawRectangle(this.angleSize, this.height - 2*this.angleSize, 
                0, this.angleSize);//left line
            this.drawRectangle(this.angleSize, this.height - 2*this.angleSize, 
                this.width - this.angleSize, this.angleSize);//right linr
            this.drawRectangle(this.width - 2*this.angleSize, this.angleSize, 
                this.angleSize, 0);//top line
            this.drawRectangle(this.width - 2*this.angleSize, this.angleSize, 
                this.angleSize, this.height - this.angleSize);//bottom line

            this.drawTriangle(this.angleSize, this.angleSize, 
                this.width - this.angleSize, 0, 
                0);//top right triangle
            this.drawTriangle(this.angleSize, this.angleSize, 
                this.width - this.angleSize, this.height - this.angleSize, 
                Math.PI/2);//bottom right triangle
            this.drawTriangle(this.angleSize, this.angleSize, 
                0, this.height - this.angleSize, 
                Math.PI);//bottom left triangle
            this.drawTriangle(this.angleSize, this.angleSize, 
                0, 0, 
                -Math.PI/2);//top right triangle
        },


        drawRectangle : function(width, height, x, y){
            if(this.materialSquere == null){
                return;
            }
            var imgWidth = this.materialSquere.naturalWidth;
            var imgHeight = this.materialSquere.naturalHeight;
            var i = 0;
            var j = 0;
            if(imgWidth > 0 && imgHeight > 0 && width > 0 && height > 0){
                for(i = 0; i < width; i += imgWidth){
                    for(j = 0; j < height; j += imgHeight){
                        var imageWidth = Math.min(width - i, imgWidth);
                        var imageHeight = Math.min(height - j, imgHeight);
                        this.renderer.drawImage(this.materialSquere, i + x, j + y, 
                            imageWidth, imageHeight);
                    }
                }
            }

        },

        /*attachCenter : function(){
            var centerRow = Math.round(this.mapRows/2);
            var centerColomn = Math.round(this.mapColomns/2);
            addSlot(centerRow, centerColomn);
        },*/
        /*drawSlot : function(slot){

            drawSlot(this.slotSize, this.slotSize, 
                cellx * this.cellWidth, celly * this.cellHeight, 0);
        },*/

        drawTriangle : function(width, height, x, y, angle){
            this.drawObject(this.materialTriangle, width, height, x + width/2, y + height/2, 0.5, 0.5, angle);
        },

        drawSlot : function(slot){
            var width = this.slotSize;
            var height = this.slotSize;
            var x = this.cellSize * (slot.x + 0.5);
            var y = this.cellSize * (slot.y + 0.5);
            this.drawObject(this.connectorSlot, width, height, x, y, 0.5, 0.5, 0);
        },

        drawConnection : function(connection){
            ///console.log("drawConnection");
            var width = this.connectionSize;
            var height = this.connectionSize;
            var x = this.cellSize * (connection.x + 0.5);
            var y = this.cellSize * (connection.y + 0.5);
            var angle = connection.angle;
           //onsole.log(connection.x+", "+connection.y);
            //nsole.log(x+", "+y);
            this.drawObject(this.connectorConnection, width, height, x, y, 0.5, 0, angle);
        },

        drawObject : function(image, width, height, x, y, pivotx, pivoty, angle){
            var shiftx = x;// + width*pivotx;
            var shifty = y;// + height*pivoty;
            this.renderer.translate(shiftx, shifty);
            this.renderer.rotate(angle);
            this.renderer.drawImage(image, -width*pivotx, -height*pivoty, width, height);
            this.renderer.rotate(-angle);
            this.renderer.translate(-shiftx, -shifty);
        },
        getImage : function(){
            var newImg = new Image();
            newImg.src = this.canvas.toDataURL();
            return newImg;
        },

        
    });
    return Drawer;
});
        /*__init__: function (){
            this.stage = new Pixi.Stage(0x000000); 
            this.pixiRenderer = Pixi.autoDetectRenderer(100, 100, this.canvas, false);
            document.body.appendChild(this.pixiRenderer.view);
            var animate = this.animate;
            //requestAnimFrame( animate );
        },
        newDrawing : function(width, height){
            this.pixiRenderer.resize(width, height);
            for(var i = 0 , j = this.stage.children.length; i < j; i++)
            {
                this.stage.removeChild(this.stage.children[i]);
            }

        },
        drawBase : function(materialSrc, width, height, x, y){
            var texture = Pixi.Texture.fromImage(resourses.shot1.src);
            var tilingSprite = new Pixi.TilingSprite(texture, width, height);
            var sprite = new Pixi.Sprite(texture);

            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.pivot.x = 0.5;
            sprite.pivot.y = 0.5;
            sprite.position.x = x;
            sprite.position.y = y;

            sprite.width = width;
            sprite.height = height;
            sprite.x = x;
            sprite.y = y;
            sprite.alpha = 1;
            sprite.rotation = 0;
            //tilingSprite.x = x;
            //tilingSprite.y = y;
            //this.stage.addChild(tilingSprite);
            console.log(sprite);
            console.log(this.stage.children.length);
            this.stage.addChild(sprite);
            console.log(this.stage.children.length);
            this.pixiRenderer.render(this.stage);
        },
        getImage : function(){
            this.pixiRenderer.render(this.stage);
            console.log(this.stage.children.length);
            var newImg = new Image();
            newImg.src = this.pixiRenderer.view.toDataURL();
            return newImg;
        },*/

            //this.renderer.fillStyle = 'rgba(0,0,0,0)';
/*
// create an new instance of a pixi stage
    
    // create a renderer instance
    var renderer = Pixi.autoDetectRenderer(window.innerWidth, window.innerHeight, null);
    
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    renderer.view.style.position = "absolute";
    renderer.view.style.top = "0px";
    renderer.view.style.left = "0px";
    requestAnimFrame( animate );
    
    // create a texture from an image path
    var texture = Pixi.Texture.fromImage("p2.jpeg");
    //var tilingTexture = new Pixi.TilingTexture(texture.baseTexture);
    
    var tilingSprite = new Pixi.TilingSprite(texture, window.innerWidth, window.innerHeight)
    //bunny.width = 300;
//  bunny.height = 300;
    
    var count = 0;
    
    stage.addChild(tilingSprite);

    function animate() {
    
        requestAnimFrame( animate );
        
        
        count += 0.005
        tilingSprite.tileScale.x = 2 + Math.sin(count);
        tilingSprite.tileScale.y = 2 + Math.cos(count);
        
        tilingSprite.tilePosition.x += 1;
        tilingSprite.tilePosition.y += 1;
        
        // just for fun, lets rotate mr rabbit a little
        //stage.interactionManager.update();
        // render the stage   
        renderer.render(stage);
    }*/

/*
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
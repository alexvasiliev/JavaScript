

define([
    'classy',
    'pixi'
], function (
    Class,
    Pixi
){
    var Drawer = Class.$extend ( {
        __init__: function (){
            this.angleSize = 5;
            this.cellSize = 25;
            this.slotSize = 15;
            ///////////////
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas); ;
            //this.canvas.style.border = "1px solid #d3d3d3;";
            this.canvas.style = "border:1px solid #d3d3d3;";
            this.renderer = this.canvas.getContext("2d");

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
        newDrawing : function(width, height){
            this.width  = width*this.cellSize;
            this.height = height*this.cellSize
            ;
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
            this.connectorEnd = resourses[this.materialName + "_end"];
            this.connectorSlot = resourses[this.materialName + "_node_center"];
            this.connectorLine = resourses[this.materialName + "_line"];
            this.connectorConnection = resourses[this.materialName + "_connector"];
        },
        drawBase : function(tip){
            if(tip){
                return;
            }
            else{
                this.map = this.createMap(this.width/this.cellSize, this.height/this.cellSize);

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
            }
        },
        createMap : function(width, height){
            var arr = new Array();
            var i = 0;
            var j = 0;
            for(i = 0; i < width; i++){
                arr[i] = new Array();
                for(j = 0; j < height; j++){
                    arr[i][j] = null;
                }
            }
            this.mapRows = j;
            this.mapColomns = i;
            this.cellWidth = width / this.mapRows;
            this.cellHeight = height / this.mapColomns;
            //console.log(this.mapRows + ", " + this.mapColomns);
            return arr;
        },
        attachCenter : function(){
            var centerRow = Math.round(this.mapRows/2);
            var centerColomn = Math.round(this.mapColomns/2);
            addSlot(centerRow, centerColomn);

        },
        addSlot : function(cellx, celly){
            this.map[cellx][celly] = 1;
            drawSlot(this.slotSize, this.slotSize, 
                cellx * this.cellWidth, celly * this.cellHeight, 0);
        },
        drawSlot : function(width, height, x, y, angle){
            x += this.width/2;
            y += this.height/2;
            //console.log(width + ", " + height + ", " + x + ", " + y + ", " + angle );
            this.renderer.translate(x, y);
            this.renderer.rotate(angle);
            this.renderer.drawImage(this.materialTriangle, -width/2, -height/2, width, height);
            this.renderer.rotate(-angle);
            this.renderer.translate(-x, -y);
        },
        drawTriangle : function(width, height, x, y, angle){
            x += this.width/2;
            y += this.height/2;
            //console.log(width + ", " + height + ", " + x + ", " + y + ", " + angle );
            this.renderer.translate(x, y);
            this.renderer.rotate(angle);
            this.renderer.drawImage(this.materialTriangle, -width/2, -height/2, width, height);
            this.renderer.rotate(-angle);
            this.renderer.translate(-x, -y);
        },
        drawRectangle : function(width, height, x, y){
            if(this.materialSquere == null){
                return;
            }
            var imgWidth = this.materialSquere.naturalWidth;
            var imgHeight = this.materialSquere.naturalHeight;
            //console.log(imgWidth + ", " + imgHeight + ", " + width + ", " + height );
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
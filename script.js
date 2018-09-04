var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var x=20;
var y=100;
var radius=20;
var dx=1;
var dy=1;
var ballColor="rgb(255,0,0)";

var paddleWidth = 75;
var paddleHeight = 10;
var paddleX=myCanvas.width/2 - paddleWidth/2;

var leftKeyDown=false;
var rightKeyDown=false;

var genRandomColor = function()	{
	var colorStr="rgb(";
	colorStr+=Math.floor(Math.random()*256);
	colorStr+=",";
	colorStr+=Math.floor(Math.random()*256);
	colorStr+=",";
	colorStr+=Math.floor(Math.random()*256);
	colorStr+=")";
	ballColor=colorStr;
}

var render = function()	{
	ctx.beginPath();
	ctx.arc(x,y,radius, 0, Math.PI*2, false);
	ctx.fillStyle=ballColor;
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(paddleX, myCanvas.height-paddleHeight,
		 paddleWidth, paddleHeight);
	ctx.fillStyle="#0000FF";
	ctx.fill();
	ctx.closePath();
}
var update = function()	{
    x+=dx;
    y+=dy;
    if( y + radius >= myCanvas.height )	{
    	dy*=-1;
    	y = myCanvas.height - radius;
    	genRandomColor();
    }
    if( x + radius >= myCanvas.width )	{
    	dx*=-1;
    	x = myCanvas.width - radius;
    	genRandomColor();
    }
    if( y - radius <= 0 )	{
    	dy*=-1;
    	y=radius;
    	genRandomColor();
    }
    if( x - radius <= 0 )	{
    	dx*=-1;
    	x=radius;
    	genRandomColor();
    }
    if(paddleX <= x && x<= paddleX+paddleWidth
    	&& y+radius >= myCanvas.height - paddleHeight)	{
    	dy*=-1;
    }

    if(leftKeyDown)
    	paddleX-=3;
    if(rightKeyDown)
    	paddleX+=3;
}

var gameLoop = function()	{
	ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
	update();
	render();
}

var keyDownFunc = function(e)	{
	if(e.code == "ArrowLeft")	{
		leftKeyDown=true;
	}
	if(e.code == "ArrowRight")	{
		rightKeyDown=true;
	}
}
var keyUpFunc = function(e)	{
	if(e.code == "ArrowLeft")	{
		leftKeyDown=false;
	}
	if(e.code == "ArrowRight")	{
		rightKeyDown=false;
	}
}

document.addEventListener("keydown",keyDownFunc,false);
document.addEventListener("keyup",keyUpFunc,false);
setInterval(gameLoop,10);
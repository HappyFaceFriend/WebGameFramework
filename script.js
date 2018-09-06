var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var x=20;
var y=200;
var radius=20;
var dx=1;
var dy=-1;
var ballColor="rgb(255,0,0)";

var paddleWidth = 75;
var paddleHeight = 10;
var paddleX=myCanvas.width/2 - paddleWidth/2;

var leftKeyDown=false;
var rightKeyDown=false;

var bricks=[];
var brickRowCount = 5;
var brickColCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;

var mouseX=paddleX;

var score = 0;

var initBricks = function()	{	
	for(let i=0; i < brickColCount; i++)	{
		for(let j=0; j<brickRowCount; j++)	{
			bricks.push({x:j*(brickWidth+brickPadding) +30,
						 y:i*(brickHeight+brickPadding) +30,
						 isDelete:false});
		}
	}
}
var bricksRender = function()	{
	for(let i=0; i<brickColCount*brickRowCount; i++)	{
		if(!bricks[i].isDelete)	{
			ctx.beginPath();
			ctx.rect(bricks[i].x, bricks[i].y,
				 brickWidth, brickHeight);
			ctx.fillStyle="#444444";
			ctx.fill();
			ctx.closePath();
		}
	}
}


var collisionDetect	= function()	{
	for (let i=0; i<brickColCount*brickRowCount; i++)	{
		if(!bricks[i].isDelete &&
			x+radius > bricks[i].x &&
			x-radius < bricks[i].x + brickWidth &&
			y+radius > bricks[i].y &&
			y-radius < bricks[i].y + brickHeight)	{
			dy*=-1;
			bricks[i].isDelete = true;
			score++;
		}
	}
}

var genRandomColor = function()	{
	let colorStr="rgb(";
	colorStr+=Math.floor(Math.random()*256);
	colorStr+=",";
	colorStr+=Math.floor(Math.random()*256);
	colorStr+=",";
	colorStr+=Math.floor(Math.random()*256);
	colorStr+=")";
	ballColor=colorStr;
}

var ballRender = function()	{
	ctx.beginPath();
	ctx.arc(x,y,radius, 0, Math.PI*2, false);
	ctx.fillStyle=ballColor;
	ctx.fill();
	ctx.closePath();
}
var paddleRender = function()	{
	ctx.beginPath();
	ctx.rect(paddleX, myCanvas.height-paddleHeight,
		 paddleWidth, paddleHeight);
	ctx.fillStyle="#0000FF";
	ctx.fill();
	ctx.closePath();
}
var scoreRender = function()	{
	ctx.font = "16px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("Score: "+score, 8, 20);
}

var render = function()	{
	ballRender();
	paddleRender();
	bricksRender();
	scoreRender();
}

var ballUpdate = function()	{
    x+=dx;
    y+=dy;
    if( y + radius >= myCanvas.height )	{
    	alert("GAME OVER");
    	clearInterval(gameId);
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
}
var paddleUpdate = function()	{
    if(leftKeyDown)
    	paddleX-=3;
    if(rightKeyDown)
    	paddleX+=3;
    paddleX= mouseX - paddleWidth/2;
}
var update = function()	{
	ballUpdate();
	paddleUpdate();
	collisionDetect();
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
var mouseMoveFunc = function(e)	{
	mouseX = e.clientX - myCanvas.offsetLeft;
}

document.addEventListener("keydown",keyDownFunc,false);
document.addEventListener("keyup",keyUpFunc,false);
document.addEventListener("mousemove",mouseMoveFunc,false);

initBricks();
var gameId=setInterval(gameLoop,10);
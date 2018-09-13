var canvas = document.getElementById("myCanvas");
var renderCtx = canvas.getContext("2d");

var x = canvas.width/2 + 50;
var y = canvas.height-30;
var ballSpeed = 2;
var dx = ballSpeed;
var dy = -ballSpeed;
var ballRadius = 10;
var colorString = "rgba(0,0,0,1)";

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height-paddleHeight;
var paddleSpeed = 5;

var brickRowCount = 5;
var brickColCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var bricksX = 30;
var bricksY = 30;
var bricks = [];

var rightPressed = false;
var leftPressed = false;

var score = 0;

var mouseX;

var randomColor = function()	{
	let r=Math.floor(Math.random()*256);
	let g=Math.floor(Math.random()*256);
	let b=Math.floor(Math.random()*256);
	let colorString="rgba("+r+","+g+","+b+",1)";
	return colorString;
}

var drawBall = function() {
	renderCtx.beginPath();
	renderCtx.arc(x, y, ballRadius, 0, Math.PI*2);
	renderCtx.fillStyle = colorString;
	renderCtx.fill();
	renderCtx.closePath();
}
var drawPaddle = function()	{
	renderCtx.beginPath();
	renderCtx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	renderCtx.fillStyle = "rgba(0,100,200,1)";
	renderCtx.fill();
	renderCtx.closePath();
}
var initBricks = function()	{
	for (let i = 0; i < brickColCount; i++)	{
		bricks[i] = [];
		for(let j = 0; j < brickRowCount; j++)	{
			bricks[i][j] = { x: j * (brickWidth + brickPadding) + bricksX,
							 y: i * (brickHeight + brickPadding) + bricksY,
							 isDelete: false };
		}
	}
}
var drawBricks = function()	{
	for (let i = 0; i < brickColCount; i++)	{
		for(let j = 0; j < brickRowCount; j++)	{
			if(bricks[i][j].isDelete == false)	{
				renderCtx.beginPath();
				renderCtx.rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
				renderCtx.fillStype="rgba(0,150,250)";
				renderCtx.fill();
				renderCtx.closePath();
			}
		}
	}
}
var drawScore = function()	{
	renderCtx.font = "16px Arial";
	renderCtx.fillStyle = "rgba(0,150,250)";
	renderCtx.fillText("Score: " + score, 8, 20);
}
var draw = function() {
	renderCtx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawBricks();
	drawScore();
}

var updateBall = function()	{
	x += dx;
	y += dy;
	if(y + dy < 0 + ballRadius)	{
		dy = -dy;
		colorString = randomColor();
	}
	if(y + dy > canvas.height - ballRadius)	{
		//alert("GAME OVER");
		//document.location.reload();
		cancelAnimationFrame(gameId);
	}
	if(x + dx > canvas.width - ballRadius || x + dx < 0 + ballRadius)	{
		dx = -dx;
		colorString = randomColor();
	}
	if(x + ballRadius > paddleX && x - ballRadius < paddleX + paddleWidth && y + ballRadius >= paddleY)	{
		dy *= -1;
		y = paddleY - ballRadius;
		colorString = randomColor()
	}
}

var updatePaddle = function()	{
	if(rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += paddleSpeed;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= paddleSpeed;
	}
	paddleX = mouseX - paddleWidth/2;
}

var CheckColDir = function(brick)	{
	let brickCenter = {x: brick.x + brickWidth / 2, y: brick.y + brickHeight / 2};
	let standC = Math.atan2(brickHeight, brickWidth);
	let h = (y - brickCenter.y);
	let w = (x - brickCenter.x);
	let ballC = Math.atan2(h, w);
	if(ballC < 0 )
		ballC += Math.PI*2;
	if(ballC < standC || ballC > Math.PI*2 -standC ||
	 (ballC < standC + Math.PI && ballC > -standC + Math.PI))	{
		dx*=-1;
	}
	else if(ballC == standC || ballC == Math.PI*2 - standC ||
		ballC == standC + Math.PI || ballC == -standC + Math.PI)	{
		dx*=-1;
		dy*=-1;
	}
	else{
		dy*=-1;
	}

}

var collisionDetect = function()	{
	let d = ballSpeed + 1;
	for (let i = 0; i < brickColCount; i++)	{
		for(let j = 0; j < brickRowCount; j++)	{
			let brick = bricks[i][j];
			if(brick.isDelete == false &&
				x + ballRadius > brick.x &&
				x - ballRadius < brick.x + brickWidth &&
				y + ballRadius > brick.y &&
				y - ballRadius < brick.y + brickHeight)	{
			console.log("col " + i + ", " + j);
				CheckColDir(brick);
				brick.isDelete=true;
				score++;
			}

		}
	}
}

var update = function()	{
	updateBall();
	updatePaddle();
	collisionDetect();
}
var gameLoop = function()	{
	update();
	draw();
	requestAnimationFrame(gameLoop);
}

var keyDownHandler = function(e)	{
	if(e.code == "ArrowLeft")	{
		leftPressed=true;
	}
	else if(e.code == "ArrowRight")	{
		rightPressed=true;
	}
}

var keyUpHandler = function(e)	{
	if(e.code == "ArrowLeft")	{
		leftPressed=false;
	}
	else if(e.code == "ArrowRight")	{
		rightPressed=false;
	}
}
var mouseMoveHandler = function(e)	{
	mouseX=e.clientX - canvas.offsetLeft;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
//false : 자식부터 부모   true : 부모부터 자식
initBricks();
var gameId = requestAnimationFrame(gameLoop);
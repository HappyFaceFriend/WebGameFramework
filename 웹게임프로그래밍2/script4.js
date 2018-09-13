var canvas = document.getElementById("myCanvas");
var renderCtx = canvas.getContext("2d");

var imageList={};

var LTime = Date.now();
var RTime = 0;
var deltaTime = 0.016;

var Lkeys={};
var keys={};

var keyDownFunc = function(e)	{
	Lkeys[e.code] = 1;
}
var keyUpFunc = function(e)	{
	Lkeys[e.code] = -1;
}

document.addEventListener("keydown",keyDownFunc,false);
document.addEventListener("keyup",keyUpFunc,false);

var addKeyListener = function(code)	{
	Lkeys[code]=0;
	keys[code]=0;
}
var updateKeys = function()	{
	for(code in keys)	{
		if(Lkeys[code]==1 && keys[code]==0)	{
			keys[code]=1;
		}
		else if(Lkeys[code]==1 && keys[code]==1)	{
			keys[code]=2;
		}
		else if(Lkeys[code]==-1 && keys[code]==-1)	{
			keys[code]=0;
			Lkeys[code]=0;
		}
		else if(Lkeys[code]==-1)	{
			keys[code]=-1;
		}
	}
}

var preloadImage=function(_path)	{
	_image=new Image();
	_image.src=_path;
	imageList[_path] = {image:_image, isLoaded:false};
	_image.addEventListener('load',function(){
		imageList[_path].isLoaded=true;
	},false);
}

var unloadImage = function(_path)	{
	if(imageList[_path]!=undefined)
		imageList[_path]=undefined;
	delete imageList[_path];
}


class GameImage	{
	constructor(path)	{
		this.path=path;
		if(imageList[path]==undefined)	{
			this.image=new Image();
			this.image.src=path;
			imageList[path]={image:this.image, isLoaded:false};
			this.image.addEventListener('load',function(){
				imageList[path].isLoaded=true;
			},false);
		}
		else
			this.image=imageList[path].image;
		this.scale={x:1, y:1};
		this.pos={x:0, y:0};
		this.rot=0;
		this.doRender=true;
	}
	render()	{
		if(!imageList[this.path].isLoaded)
			return;
		renderCtx.transform(this.scale.x,0,0,this.scale.y,0,0);
		renderCtx.translate(this.image.width/2, this.image.height/2);
		renderCtx.rotate(this.rot);
		renderCtx.translate(-this.image.width/2*this.scale.x,
							 -this.image.height/2*this.scale.y);
		renderCtx.drawImage(this.image,this.pos.x,this.pos.y);
	}
}

var nowScene = undefined;

class Scene	{
	constructor()	{
		this.gameImageList=[];
	}
	init()	{

	}
	update()	{
		
	}
	addImage(image)	{
		this.gameImageList.push(image);
		return image;
	}
	start()	{
		nowScene.destroy();
		nowScene=this;
		this.init();
	}
	destroy()	{
		this.gameImageList.splice(0,this.gameImageList.length);
	}
}
var nullScene = new Scene();
nowScene=nullScene;
var update = function()	{
	nowScene.update();
	updateKeys();
}
var render = function()	{
	renderCtx.clearRect(0,0,myCanvas.width,myCanvas.height);
	for(let i=0; i<nowScene.gameImageList.length; i++)	{
		if(nowScene.gameImageList[i].doRender)
			nowScene.gameImageList[i].render();
	}
}
var gameLoop = function()	{
	RTime = Date.now();
	deltaTime = (RTime-LTime)/1000;
	LTime = RTime;
	update();
	render();

	renderCtx.font = "16px Arial";
	renderCtx.fillStyle = "rgb(0,0,0)";
	renderCtx.fillText("Lkeys: "+Lkeys["ArrowRight"] +" keys:"+keys["ArrowRight"], 8, 20);
}

setInterval(gameLoop,0);


var gameScene = new Scene();
gameScene.init=function()	{
	gameScene.plane = gameScene.addImage(new GameImage("plane.png"));
	addKeyListener("ArrowRight");
}
gameScene.update=function()	{
	if(keys["ArrowRight"]==2)
	gameScene.plane.pos.x+=1;
}
gameScene.start();




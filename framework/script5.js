var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var deltaTime = 10;
var imageList={};

var LTime = Date.now();
var RTime = 0;
var deltaTime = 0.016;

var Lkeys={};
var keys={};

var keyDownFunc = function(e)	{
	Lkeys[e.code] = 1;
	keys[e.code]=0;
}
var keyUpFunc = function(e)	{
	Lkeys[e.code] = -1;
}

document.addEventListener("keydown",keyDownFunc,false);
document.addEventListener("keyup",keyUpFunc,false);

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
var preloadImage = function(path)	{
	var _image = new Image();
	_image.src=path;
	imageList[path] = {image : _image, isLoaded:false};
	_image.addEventListener('load',function(){
		imageList[path].isLoaded=true;
	},false);
}

var isEveryImageLoaded = function()	{
	for(path in imageList)	{
		if(imageList[path].isLoaded==false)
			return false;
	}
	return true;
}

class GameImage{
	constructor(path)	{
		this.path=path;
		this.pos={x:0, y:0};
		this.scale={x:1, y:1};
		this.rot=0;
		this.anchor={x:0.5,y:0.5};
		if(imageList[path]==undefined)	{
			this.image = new Image();
			this.image.src = path;
			imageList[path]={image:this.image, isLoaded:false};
			this.image.addEventListener('load',function(){
				//이미지 로딩 됐다고 전달 
				imageList[path].isLoaded=true;
			},false);
		}
		else {
			this.image=imageList[path].image;
		}

	}
	render()	{
		if(!imageList[this.path].isLoaded)	//이미지 로딩 안됐으면
			return;
		let dx = this.image.width*this.anchor.x;
		let dy = this.image.height*this.anchor.y;
		ctx.resetTransform();
		ctx.translate(this.pos.x+dx,this.pos.y+dy);
		ctx.rotate(this.rot);
		//ctx.translate(-dx,-dy);
		ctx.transform(this.scale.x,0,0,this.scale.y,-dx*this.scale.x,-dy*this.scale.y);
		ctx.drawImage(this.image,0,0);
	}
}
var nowScene=undefined;
class Scene	{
	constructor()	{
		this.sceneImageList=[];
	}
	init()	{}
	start()	{
		nowScene=this;
		this.init();
	}
	update()	{}
	addImage(image)	{
		this.sceneImageList.push(image);
		return image;
	}
	render()	{
		for(let i=0; i<this.sceneImageList.length; i++)	{
			this.sceneImageList[i].render();
		}
	}
}
var nullScene = new Scene();
nowScene = nullScene;

var update=function()	{
	nowScene.update();
}
var render=function()	{
	nowScene.render();
}
var gameLoop = function()	{
	RTime = Date.now();
	deltaTime = (RTime-LTime)/1000;
	LTime = RTime;
	updateKeys();
	update();
	ctx.resetTransform();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	render();

	ctx.resetTransform();
	ctx.font = "16px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("Lkeys: "+Lkeys["KeyW"] +" keys:"+keys["KeyW"], 8, 20);

}

var testScene = new Scene();

testScene.init=function()	{
	preloadImage("image.png");
	this.testImage = [];
	this.testImage.push(this.addImage(new GameImage("image.png")));
	this.testImage.push(this.addImage(new GameImage("image.png")));
	//this.testImage2 = this.addImage(new GameImage("image.png"));
	this.tt=0;
}
testScene.update=function()	{
	if(keys["Space"]==1)
		this.tt=this.tt==0?1:0	;
	if(keys["KeyQ"]==2)
		this.testImage[this.tt].rot-=Math.PI*deltaTime;
	if(keys["KeyE"]==2)
		this.testImage[this.tt].rot+=Math.PI*deltaTime;
	if(keys["KeyW"]==2)
		this.testImage[this.tt].pos.y-=100*deltaTime;
	if(keys["KeyS"]==2)
		this.testImage[this.tt].pos.y+=100*deltaTime;
	if(keys["KeyA"]==2)
		this.testImage[this.tt].pos.x-=100*deltaTime;
	if(keys["KeyD"]==2)
		this.testImage[this.tt].pos.x+=100*deltaTime;
	if(keys["ArrowLeft"]==2)
		this.testImage[this.tt].scale.x-=1*deltaTime;
	if(keys["ArrowRight"]==2)
		this.testImage[this.tt].scale.x+=1*deltaTime;
	if(keys["ArrowUp"]==2)
		this.testImage[this.tt].scale.y-=1*deltaTime;
	if(keys["ArrowDown"]==2)
		this.testImage[this.tt].scale.y+=1*deltaTime;
}
testScene.start();

setInterval(gameLoop,deltaTime);

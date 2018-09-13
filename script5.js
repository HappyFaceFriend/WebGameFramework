var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var deltaTime = 10;
var imageList={};

var preloadImage = function(path)	{
	var _image = new Image();
	_image.src=path;
	imageList[path] = {image : _image, isLoaded:false};
	_image.addEventListener('load',function(){
		imageList[path].isLoaded=true;
	},false);
}

class GameImage{
	constructor(path)	{
		this.path=path;
		this.pos={x:0, y:0};
		this.scale={x:1, y:1};
		this.rot=0;
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
		ctx.resetTransform();
		ctx.transform(this.scale.x,0,0,this.scale.y,this.pos.x,this.pos.y);
		ctx.translate(this.image.width/2,this.image.height/2);
		ctx.rotate(this.rot);
		ctx.translate(-this.image.width/2,-this.image.height/2);
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
	update();
	ctx.resetTransform();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	render();
}

var testScene = new Scene();

testScene.init=function()	{
	preloadImage("image.png");
	this.testImage = this.addImage(new GameImage("image.png"));
}
testScene.update=function()	{
	this.testImage.pos.x++;
}
testScene.start();

setInterval(gameLoop,deltaTime);

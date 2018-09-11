var canvas = document.getElementById("myCanvas");
var renderCtx = canvas.getContext("2d");

var imageList={};


var deltaTime = 10;



var preloadImage=function(_path)	{
	_image=new Image();
	_image.src=_path;
	imageList[_path] = {image:_image, isLoaded:false};
	_image.addEventListener('load',function(){
		imageList[_path].isLoaded=true;
	},false);
}


class GameImage	{
	constructor(path)	{
		this.path=path;;
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

class Scene	{
	constructor()	{
		this.gameImageList=[];
	}
	update()	{
		
	}
}
var update = function()	{
	nowScene.update();
}
var render = function()	{
	for(let i=0; i<scene.gameImageList.length; i++)	{
		if(scene.gameImageList[i].doRender)
			scene.gameImageList[i].render();
	}
}
var gameLoop = function()	{
	update();
	render();
}
preloadImage("player.png");
var gi=new GameImage("player.png");
gi.pos.x=200;

setInterval(gameLoop,deltaTime);


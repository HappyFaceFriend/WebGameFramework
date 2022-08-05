
var testScene = new Scene();
testScene.preload=function()	{
	preloadImage("image.png");
}
testScene.init=function()	{
	this.testImage = [];
	this.testImage.push(this.addImage(new GameImage("image.png")));
	this.testImage.push(this.addImage(new GameImage("image.png")));
	this.tt=0;
}
testScene.update=function()	{
	if(keys["Space"]==1)
		this.tt=this.tt==0?1:0;
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
	if(keys["KeyZ"]==1)
		this.testImage[this.tt].setz(this.testImage[this.tt].z-1);
	if(keys["KeyN"]==1)
		startScene(testScene2);
}

startScene(testScene);

var testScene2 = new Scene();

testScene2.preload=function()	{
	preloadImage("player.png");
}
testScene2.init=function()	{
	this.player = this.addImage(new GameImage("player.png"));
}
testScene2.update=function()	{
}


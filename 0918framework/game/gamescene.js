
var gameScene = new Scene();
gameScene.preload=function()	{
	preloadImage("player.png");
}
gameScene.init=function()	{
	this.player=new Player(this);
}
gameScene.update=function()	{
	this.player.update();
}

startScene(gameScene);


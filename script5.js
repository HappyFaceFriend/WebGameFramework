var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var deltaTime = 10;
var update=function()	{

}
var render=function()	{
	
}
var gameLoop = function()	{
	update();
	render();
}
setInterval(gameLoop,deltaTime);
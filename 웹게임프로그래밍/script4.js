var canvas = document.getElementById("myCanvas");
var renderCtx = canvas.getContext("2d");

var img = new Image();
img.src = "player.png";

img.addEventListener('load',function(){
	renderCtx.transform(1,0,0,1,0,0);
	renderCtx.translate(img.width/2, img.height/2);
	renderCtx.rotate(Math.PI*0.5);
	renderCtx.translate(-img.width/2, -img.height/2);
	renderCtx.drawImage(img,0,0);
	//renderCtx.translate(100,100);
	//renderCtx.rotate(Math.PI*0.1);
},false);
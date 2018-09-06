var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "image.png";

img.addEventListener('load',function(){
	ctx.transform(2,0,0	,2,0,0);
	ctx.translate(img.width/2,img.height/2);
	ctx.rotate(Math.PI*1);
	ctx.translate(-img.width/2,-img.height/2);
	ctx.drawImage(img,0,0);
},false);

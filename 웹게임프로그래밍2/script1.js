var canvas = document.getElementById("myCanvas");
var renderContext=canvas.getContext("2d");

//사각형 그리기
renderContext.beginPath();
renderContext.rect(20,40,50,50);	//20,40 에서 50*50짜리
renderContext.fillStyle="#FF0000";
renderContext.fill();
renderContext.closePath();

//원 그리기 
renderContext.beginPath();
//원중심, 반지름, 시작과끝 각도(rad), 그리는 방향(false=시계)
renderContext.arc(240,160,20,0,Math.PI*2, false);
renderContext.fillStyle="#FF0000";
renderContext.fill();
renderContext.closePath();

//테두리그리기
renderContext.beginPath();
renderContext.rect(120,40,50,50);	//20,40 에서 50*50짜리
renderContext.strokeStyle="#FF0000";
renderContext.stroke();
renderContext.closePath();
class Player{
	constructor(scene)	{
		this.gImage=scene.addImage(new GameImage("player.png"));
		this.speed=200;
	}
	update()	{
		if(keys["KeyW"]==2)
			this.gImage.pos.y-=this.speed*deltaTime;
		if(keys["KeyS"]==2)
			this.gImage.pos.y+=this.speed*deltaTime;
		if(keys["KeyA"]==2)
			this.gImage.pos.x-=this.speed*deltaTime;
		if(keys["KeyD"]==2)
			this.gImage.pos.x+=this.speed*deltaTime;
	}
}
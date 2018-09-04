var Monster = function(name)	{
	this.name=name;
	this.level=1;
}

Monster.prototype.Attack=function(){
	console.log("Monster Attack");	
};

Monster.prototype.Print=function(){
	console.log("Monster : "+this.name+" lv"+this.level);
}


var Orc = function(name, fingers)	{
	Monster.call(this,name);
	this.fingers=fingers;
}

Orc.prototype = Object.create(Monster.prototype);
Orc.prototype.constructor = Orc;

Orc.prototype.Attack=function(){
	console.log("Orc's Attack");
}
Orc.prototype.Speak=function(){
	console.log("orc say hi");
}

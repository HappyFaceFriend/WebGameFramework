var Monster = function(_name)	{
	this.name=_name;
	this.level=1;
}
Monster.prototype.Attack=function()	{
	console.log("Monster Attack!");
}
Monster.prototype.Print=function()	{
	console.log("Monster : "+this.name+", lv:"
		+this.level);
}
var Orc = function(name, fingers)	{
	Monster.call(this,name);
	this.fingers=fingers;
}
Orc.prototype = new Monster();
Orc.prototype.constructor = Orc;

Orc.prototype.Speak=function()	{
	console.log("orc say hi");
}
Orc.prototype.Attack=function()	{
	console.log("Orc Attack");
}
var mons1=new Monster("mob1");
mons1.Print();	

var orc = new Orc("orc1",3);
orc.Print();
orc.Speak();
orc.Attack();
console.log(orc.name);
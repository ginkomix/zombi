const Mob = (Mob)=> class Mob  {
	constructor() {
 this.x =0;
  this.y = 0;
  this.n=0;
  this.speed=1;
	}
	
  move() {
    this.x = this.x + this.speed*Math.cos(this.n);
    this.y = this.y + this.speed*Math.sin(this.n);
  }
};
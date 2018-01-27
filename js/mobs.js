class Mob  {
	constructor(player) {
		this.x =0;
		this.y = 0;
		this.n=0;
		this.speed=1;
		this.player = player;
	}

	move() {
		let x = this.x + this.speed*Math.cos(this.n),
			y = this.y + this.speed*Math.sin(this.n);
		if( x > this.x) {
			render.clearField();
			
		}
		if( x < this.x) {
			render.clearField();
		}
		if( y > this.y) {
			render.clearField();
		}
		if( y < this.y) {
			render.clearField();
		}
		this.x = this.x + this.speed*Math.cos(this.n) ;
		this.y =this.y + this.speed*Math.sin(this.n);
		
	}
}
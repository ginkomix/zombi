class Mob  {
	constructor(character) {
		this.x =1;
		this.y = 1;
        this.sprait = 0;
        this.spraitDirection = 0;
		this.see = 150;
		this.character = character;
        this.moveX = 0;
        this.moveY = 0;
       
	}

	move() {
		this.x += this.moveX ;
		this.y += this.moveY;	
	}
  
    
}
class Logic {
	constructor() {
	
	}
	start() {
		setInterval(()=>{
			out.innerHTML = this.person.x+' '+this.person.y;
		
		
		this.person.move();
			},500);
	}
}
let plauer = new Logic();

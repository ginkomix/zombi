class Logic {
	constructor(person,num,x) {
	this.person = person;
	this.num = num;	
		this.start();
	}
	start() {
		
		if(this.num===1) {
		this.person.x = 100.5;	
		}
		var out = document.querySelector('#b'+this.num);
		
		setInterval(()=>{
			out.innerHTML = this.person.x+' '+this.person.y;
		
		
		this.person.move();
			},500);
	}
}
let m1 = new Logic(new Mob(),1);
let m2 = new Logic(new Mob(),2);
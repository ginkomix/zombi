class Logic {
	constructor() {
		this.keyboard = this.keyboard.bind(this);
		this.person = new Mob('player');
		this.mobLevel1 = [];
		this.timer = 0;
		this.timerMob = 0;
		this.timerSprait = 0;
		this.speed = 0
		this.sizeOfMobLevel1 = 10;
		this.startGameFlag = 1;
		this.levelOneStart = 0;
	}

	startGame() {
		addEventListener('keydown',this.keyboard);
		let width =window.innerWidth,
			height =window.innerHeight;
		this.person.x = width/2-30;
		this.person.y = height/2-30;
		this.sprait(this.person);
		
		this.locationMob();
		this.locationMob(this.sizeOfMobLevel1,'level1',this.mobLevel1);
		this.locationMob();
		let self = this;
		setTimeout(()=>{
			self.levelOneStart = 1;
		},5000)
		this.timer = setTimeout(function tick(){
			render.clearField(); 
			self.playerStart();
			if(self.levelOneStart) {
				self.level1();
			}
			setTimeout(tick,self.speed);
		},self.speed);



	}

	locationMob(size,level,arr) {
		let width =window.innerWidth,
			height =window.innerHeight;


		for(let i =0;i<size;i++) {
			arr.push(new Mob(level))
		}

		for(let i =0;i<size;i++) {
			arr[i].x = this.getRandom(width);
			arr[i].y = this.getRandom(height);
			this.sprait(arr[i]);
			switch(this.getRandom(4)){
				case 0:
					arr[i].moveX = 1;
					arr[i].spraitDirection= 3;
					break;
				case 1:
					arr[i].moveY = -1;
					arr[i].spraitDirection= 1;
					break;
				case 2:
					arr[i].moveX = -1;
					arr[i].spraitDirection= 2;
					break;
				case 3:
					arr[i].moveY = 1;
					arr[i].spraitDirection= 0;
					break;


			}
		}
	}

	start() {
		this.speed = 4;
	}

	stop() {
		this.speed = 1000000;
	}

	level1() {
		for(let i =0;i<this.sizeOfMobLevel1;i++) {
			this.mobLevel1[i].move();
			this.cordTrack(this.mobLevel1[i]); 
			this.endTrack(this.mobLevel1[i]);
			render.drawImg('player',this.mobLevel1[i].sprait,this.mobLevel1[i].spraitDirection,this.mobLevel1[i].x,this.mobLevel1[i].y);
		}
	}

	level2() {

	}

	playerStart() {
		this.person.move();
		this.cordTrack(this.person)       
		render.drawImg('player',this.person.sprait,this.person.spraitDirection,this.person.x,this.person.y);
	}

	getRandom(max) {
		return Math.floor(Math.random() * (max - 0)) + 0;
	}

	sprait(obj) {
		let self= this;
		this.timerSprait = setTimeout(function tick(){
			if(obj.sprait<3){
				obj.sprait++;  
			} else {
				obj.sprait=0;  
			}

			self.timerSprait = setTimeout(tick,100);
		},100)
	}

	cordTrack(obj) {
		if(render.getHeight()<obj.y){

			obj.y = -60;
		}
		if(-60>obj.y){
			obj.y = render.getHeight();
		}
		if(render.getWidth()<obj.x){
			obj.x = -60;
		}
		if(-60>obj.x){
			obj.x = render.getWidth();
		}
	}

	endTrack(obj) {

		if((obj.y<this.person.y-60 || obj.y-60>this.person.y || obj.x+46<this.person.x || obj.x>this.person.x+46)===false)
		{
			this.stop();
		}
	}

	keyboard(event) {
		let key = event.key;
		switch(key) {
			case 'w':
				this.person.moveY = -1;
				this.person.moveX = 0;
				this.person.sprait=0;
				this.person.spraitDirection= 1;
				break;
			case 's':
				this.person.moveY = 1;
				this.person.moveX = 0;
				this.person.sprait=0;
				this.person.spraitDirection= 0;
				break;
			case 'a':
				this.person.moveY = 0;
				this.person.moveX = -1;
				this.person.sprait=0;
				this.person.spraitDirection= 2;
				break;
			case'd':
				this.person.moveY = 0;
				this.person.moveX = 1;
				this.person.sprait=0;
				this.person.spraitDirection= 3;
				break;
		}
	}
}
let player = new Logic();






class Logic {
    constructor() {
        this.keyboard = this.keyboard.bind(this);
        this.person = null;
        this.mobLevel1 = [];
        this.mobLevel2 = [];
        this.timer = null;
        this.timerSprait = null;
        this.recordTimer = null;
        this.speed = 0;
        this.sizeOfMobLevel1 = 1;	
        this.sizeOfMobLevel2 = 1;
        this.levelOneStart = 0;
        this.levelTwoStart = 0;
        this.record = 0;
        this.buttonMob = this.buttonMob.bind(this);
        addEventListener('keydown',this.keyboard);
        document.querySelector('.newGame').addEventListener('click',this.startGame);
        document.querySelector('.buttonMobile').addEventListener('click',this.buttonMob);
    }

    startGame() {
        Promise.resolve()
            .then(()=>{
            addEventListener('keydown',this.keyboard);
            render.cloasGameOver();
            replay.delete();
            this.person = new Mob('player');
			
            this.mobLevel1 = [];
            this.mobLevel2 = [];
            this.levelOneStart = 0;
            this.levelTwoStart = 0;

            let width =window.innerWidth,
                height =window.innerHeight;

            this.person.x = width/2-30;
            this.person.y = height/2-30;
            this.sprait(this.person);


            this.locationMob(this.sizeOfMobLevel1,'level1',this.mobLevel1,0.7);
            this.locationMob(this.sizeOfMobLevel2,'level2',this.mobLevel2,0.5);
			console.log(this.mobLevel1);
			console.log(this.mobLevel2);
            replay.pushStart(this.mobLevel1);
            replay.pushStart(this.mobLevel2);
        })
            .then(()=>{
			
            let self = this;
            this.recordStartTimer();
            setTimeout(()=>{
                self.levelOneStart = 1;

            },3000);
            setTimeout(()=>{
                self.levelTwoStart = 1;
            },7000); 

            self.timer = setTimeout(function tick(){
                render.clearField(); 
                self.playerStart();
                replay.pushReplay(self.person.x,self.person.y);

                if(self.levelOneStart) {
                    self.level1();
                }
                if(self.levelTwoStart) {
                    self.level2();
                }
                if (self.timer != null){
                    self.timer = setTimeout(tick,self.speed);
                }
            },self.speed);



        });
    }

    locationMob(size,level,arr,speedMob) {
        return Promise.resolve()
            .then(()=>{


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
                        arr[i].moveX = speedMob;
                        arr[i].spraitDirection= 3;
                        break;
                    case 1:
                        arr[i].moveY = speedMob*(-1);
                        arr[i].spraitDirection= 1;
                        break;
                    case 2:
                        arr[i].moveX = speedMob*(-1);
                        arr[i].spraitDirection= 2;
                        break;
                    case 3:
                        arr[i].moveY = speedMob;
                        arr[i].spraitDirection= 0;
                        break;


                }
            }
        });
    }

    recordStartTimer() {
        let self = this;

        this.recordTimer = setTimeout( function tick(){
            self.record++;
            render.timerRecord(self.record);
            if(self.recordTimer!=null)	{
                self.recordTimer = setTimeout(tick,1000);
            }
        },1000);
    }

    stop(a=0) {
        Promise.resolve()
            .then(()=>{
            clearTimeout(this.timer);
            this.timer = null;
            clearTimeout(this.timerSprait);
            this.timerSprait = null;
            clearTimeout(this.recordTimer);
            this.recordTimer = null;

            if(!a) {
                bd.save(this.record);
                render.gameOver(this.record); 
                this.startReplay();
            }

        })
            .then(()=>{

            this.record = 0;
        });
    }

    startReplay() {
        removeEventListener('keydown',this.keyboard);
        this.person = new Mob('player');
        this.mobLevel1 = [];
		
        this.mobLevel2 =[];
        this.mobLevel1 = replay.getStart()[0];
        this.mobLevel2 = replay.getStart()[1];
		console.log( this.mobLevel1);
		console.log( this.mobLevel2);
        this.levelOneStart = 0;
        this.levelTwoStart = 0;

        let width =window.innerWidth,
            height =window.innerHeight;

        this.person.x = width/2-30;
        this.person.y = height/2-30;
        this.sprait(this.person);

        let self = this;
        setTimeout(()=>{
            self.levelOneStart = 1;

        },3000);
        setTimeout(()=>{
            self.levelTwoStart = 1;
        },7000); 
        let moveArr = replay.getReplay(),
            i=0;

        self.timer = setTimeout(function tick(){

            render.clearField(); 
            self.playerMoveReplay(moveArr[i].x,moveArr[i].y);
            if(self.levelOneStart) {
                self.level1(1);
            }
            if(self.levelTwoStart) {
                self.level2(1);
            }
            if (self.timer != null){
                self.timer = setTimeout(tick,self.speed);
            }
            i++;

            if((i+1)>moveArr.length) {
                self.stop(1);
            }
        },self.speed);


    }

    level1(a=0) {
        for(let i =0;i<this.sizeOfMobLevel1;i++) {
            this.mobLevel1[i].move();
            this.cordTrack(this.mobLevel1[i]); 
            if(!a) {

                this.endTrack(this.mobLevel1[i]);
            }
            render.drawImg('player',this.mobLevel1[i].sprait,this.mobLevel1[i].spraitDirection,this.mobLevel1[i].x,this.mobLevel1[i].y);
        }
    }

    level2(a=0) {
        for(let i =0;i<this.sizeOfMobLevel2;i++) {
            this.mobLevel2[i].move();

            this.cordTrack(this.mobLevel2[i]);

            let leng =Math.sqrt(Math.pow((this.mobLevel2[i].x-this.person.x),2)+Math.pow((this.mobLevel2[i].y-this.person.y),2));
            if(leng<this.mobLevel2[i].see)
            {
                this.pozRectTrack(i,leng)
            }
            if(!a) {
                this.endTrack(this.mobLevel2[i]);

            }
            render.drawImg('player',this.mobLevel2[i].sprait,this.mobLevel2[i].spraitDirection,this.mobLevel2[i].x,this.mobLevel2[i].y);
        }
    }

    playerMoveReplay(x,y) {
        this.person.x = x;
        this.person.y = y;

        render.drawImg('player',this.person.sprait,this.person.spraitDirection,this.person.x,this.person.y);
    }

    playerStart() {
        this.person.move();
        this.cordTrack(this.person)       
        render.drawImg('player',this.person.sprait,this.person.spraitDirection,this.person.x,this.person.y);
    }

    pozRectTrack(i,leng) {
        if(this.mobLevel2[i].x+10<this.person.x && this.mobLevel2[i].y>this.person.y) {
            let sin = (this.person.y - this.mobLevel2[i].y)/(leng);

            this.mobLevel2[i].moveX = 0.6;
            this.mobLevel2[i].moveY = sin*0.6;
            this.mobLevel2[i].spraitDirection = 3;


        }
        if(this.mobLevel2[i].x+10<this.person.x && this.mobLevel2[i].y<this.person.y) {

            let sin = (-this.person.y + this.mobLevel2[i].y)/(leng);

            this.mobLevel2[i].moveX = 0.6;
            this.mobLevel2[i].moveY = -(sin*0.6);
            this.mobLevel2[i].spraitDirection = 3; 

        }
        if(this.mobLevel2[i].x-10>this.person.x && this.mobLevel2[i].y>this.person.y) {
            let sin = (-this.person.y + this.mobLevel2[i].y)/(leng);

            this.mobLevel2[i].moveX = -0.6;
            this.mobLevel2[i].moveY = -(sin*0.6);
            this.mobLevel2[i].spraitDirection = 2; 

        }
        if(this.mobLevel2[i].x-10>this.person.x && this.mobLevel2[i].y<this.person.y) {
            let sin = (this.person.y - this.mobLevel2[i].y)/(leng);
            this.mobLevel2[i].moveX = -0.6;
            this.mobLevel2[i].moveY = sin*0.6;
            this.mobLevel2[i].spraitDirection = 2; 

        }
        if(this.mobLevel2[i].x+10<this.person.x && this.mobLevel2[i].x-10>this.person.x && this.mobLevel2[i].y>this.person.y) {



            this.mobLevel2[i].spraitDirection = 0; 

        }
        if(this.mobLevel2[i].x+10<this.person.x && this.mobLevel2[i].x-10>this.person.x && this.mobLevel2[i].y<this.person.y) {


            this.mobLevel2[i].spraitDirection = 1; 

        }
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
            if(self.timerSprait!=null) {
                self.timerSprait = setTimeout(tick,100);
            }
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

    buttonMob(event) {
        let target = event.target;
        if(target.tagName!='BUTTON') {
            return;
        }
        switch(target.id) {
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






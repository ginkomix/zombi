class Logic {
    constructor() {
        this.keyboard = this.keyboard.bind(this);
        this.person = new Mob('player');
        this.mobLevel1 = [];
        this.timer = 0;
        this.timerMob = 0;
        this.timerSprait = 0;
        this.sizeOfMobLevel1 = 7;
    }

    start() {
        addEventListener('keydown',this.keyboard);
        let width =window.innerWidth,
            height =window.innerHeight;

        this.sprait(this.person);

        for(let i =0;i<this.sizeOfMobLevel1;i++) {
            this.mobLevel1.push(new Mob('level1'))
        }
        
        for(let i =0;i<this.sizeOfMobLevel1;i++) {
            this.mobLevel1[i].x = this.getRandom(width);
            this.mobLevel1[i].y = this.getRandom(height);
            this.sprait(this.mobLevel1[i]);
            switch(this.getRandom(4)){
                case 0:
                    this.mobLevel1[i].moveX = 1;
                    this.mobLevel1[i].spraitDirection= 3;
                    break;
                case 1:
                    this.mobLevel1[i].moveY = -1;
                     this.mobLevel1[i].spraitDirection= 1;
                    break;
                case 2:
                    this.mobLevel1[i].moveX = -1;
                    this.mobLevel1[i].spraitDirection= 2;
                    break;
                case 3:
                    this.mobLevel1[i].moveY = 1;
                    this.mobLevel1[i].spraitDirection= 0;
                    break;


            }
        }
        this.person.x =  width/2-30;
        this.person.y =  height/2-30;

        let self = this;
        this.timer = setTimeout(function tick(){
              render.clearField(); 
            self.level0();
            setTimeout(()=>{
                self.level1();

            },100);
            setTimeout(tick,10);
        },10);



    }

    level1() {

        for(let i =0;i<this.sizeOfMobLevel1;i++) {
            this.mobLevel1[i].move();
            this.cordTrack(this.mobLevel1[i]); 
             render.drawImg('player',this.mobLevel1[i].sprait,this.mobLevel1[i].spraitDirection,this.mobLevel1[i].x,this.mobLevel1[i].y);
        }
      
      
    }
        level0() {

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


player.start();  



class Logic {
    constructor() {
        this.keyboard = this.keyboard.bind(this);
        this.person = new Mob('player');
        this.timer = 0;
        this.timerSprait = 0;
    }
    
    start() {
        addEventListener('keydown',this.keyboard);
        let self = this;
         this.sprait();
        this.timer = setTimeout(function tick(){
            
            self.person.move();
            self.cordTrack(self.person)
            render.clearField(); 
      
            render.drawImg('player',self.person.sprait,self.person.spraitDirection,self.person.x,self.person.y);
            
            self.timer = setTimeout(tick,4);
        },4);
    }
    
    sprait() {
        let self= this;
        this.timerSprait = setTimeout(function tick(){
            if(self.person.sprait<3){
              self.person.sprait++;  
            } else {
              self.person.sprait=0;  
            }
            
            self.timerSprait = setTimeout(tick,100);
        },100)
    }
    
    cordTrack(obj) {
        if(render.getHeight()<obj.y){
               
               obj.y = 0;
               }
            if(0>obj.y){
               obj.y = render.getHeight();
               }
            if(render.getWidth()<obj.x){
               obj.x = 0;
               }
            if(0>obj.x){
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

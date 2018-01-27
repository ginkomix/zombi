class Logic {
    constructor() {
        this.keyboard = this.keyboard.bind(this);
        this.person = new Mob('player');
        this.timer = 0;
    }
    
    start() {
        addEventListener('keydown',this.keyboard);
        let self = this;
        this.timer = setTimeout(function tick(){
            
            self.person.move();
            self.cordTrack(self.person)
            render.clearField();  
            render.drawImg('player',1,self.person.x,self.person.y);
            
            self.timer = setTimeout(tick,4);
        },4);
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
                break;
            case 's':
                this.person.moveY = 1;
                this.person.moveX = 0;
                break;
            case 'a':
                this.person.moveY = 0;
                this.person.moveX = -1;
                break;
            case'd':
                this.person.moveY = 0;
                this.person.moveX = 1;
                break;
            case 'ц':
                this.person.moveY = -1;
                this.person.moveX = 0;
                break;
            case 'ы':
                this.person.moveY = 1;
                this.person.moveX = 0;
                break;
            case 'ф':
                this.person.moveY = 0;
                this.person.moveX = -1;
                break;
            case'в':
                this.person.moveY = 0;
                this.person.moveX = 1;
                break;
        }

    }
}
let player = new Logic();
player.start();

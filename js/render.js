class Render {
    constructor(fieldId){
        this.fieldId=fieldId; 
        this.setSizeField= this.setSizeField.bind(this);
        this.img = new Image();
        this.imgWidth = 46;
        this.imgHeight = 60;
        this.width = document.querySelector('#game').offsetWidth;
        this.height = document.querySelector('#game').offsetHeight; 
         
        this.tuning();
    }

    tuning() {
        window.addEventListener('resize',this.setSizeField);
        this.field = document.createElement('canvas');
        this.field.id = this.fieldId;
        this.setSizeField();
        document.querySelector('#game').appendChild(this.field);
        var ctx = this.field.getContext('2d');
        this.img.src = 'img/bg.jpg';
        this.img.onload = ()=> {
            this.setSizeField();
        }
    }

    setSizeField() {
        this.width = document.querySelector('#game').offsetWidth;
        this.height = document.querySelector('#game').offsetHeight; 
        this.field.width = this.width;
        this.field.height = this.height; 
        this.clearField();
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    clearField() {
        var ctx = this.field.getContext('2d');      
        ctx.drawImage(this.img, 0, 0,this.width,this.height);
    }

    getSprait(charact,sprait,spraitDirection) {
        if(charact==='player') {
          return document.querySelector('#player'+spraitDirection+sprait); 
          
        }

    }

    drawImg(charact,sprait,spraitDirection,x,y) {
       
        let ctx = this.field.getContext('2d');      

        ctx.drawImage(this.getSprait(charact,sprait,spraitDirection), x, y,this.imgWidth,this.imgHeight);

    }


}
let render = new Render('gameField');
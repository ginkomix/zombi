class Render {
    constructor(fieldId){
        this.fieldId=fieldId; 
        this.setSizeField= this.setSizeField.bind(this);
        this.img = new Image();
       
        this.tuning();
    }

    tuning() {
		 window.addEventListener('resize',this.setSizeField);
        this.field = document.createElement('canvas');
        this.field.id = this.fieldId;
        this.setSizeField()
        document.querySelector('#game').appendChild(this.field);
        var ctx = this.field.getContext('2d');

        this.img.src = 'img/bg.jpg';
        this.img.onload = ()=> {
             this.clearField();
        }
    }

    setSizeField() {
        this.width = document.querySelector('#game').offsetWidth;
        this.height = document.querySelector('#game').offsetHeight; 
        this.field.width = this.width;
        this.field.height = this.height; 
        this.clearField();
    }

    clearField() {
        var ctx = this.field.getContext('2d');
        ctx.drawImage(this.img, 0, 0,this.width,this.height);
    }


}
let render = new Render('gameField');

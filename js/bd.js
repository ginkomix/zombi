class Bd {
    constructor(name) {
        this.name = name; 
    }
     sortRecord(arr) {
       return arr.sort(this.compareNumeric);
    }
    
    compareNumeric(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
}
    
    save(text) {
       var sObj;
        var storageText =JSON.parse(localStorage.getItem(this.name))||[];
           storageText.push(text);    
        storageText = this.sortRecord(storageText);
        storageText.length = 10;
        var sArr = JSON.stringify(this.sortRecord(storageText));
        localStorage.setItem(this.name,sArr);
    }
    
    outputSave() {
       return JSON.parse(localStorage.getItem(this.name));
        
    }

}
let bd = new Bd('localStorage');
class Bd {
    constructor(name) {
        this.name = name; 
    }
    setStorage(text) {
       var sObj;
        var storageText =JSON.parse(localStorage.getItem(this.name));
        var saveObj = {};
        if(!storageText)
        {
            saveObj = text;
        }else {
            for(var key in storageText) {
                var num = parseInt(key)+1;
                saveObj[num] = storageText[key];
                if((size-1) === num) {
                    break;
                }
            }
            Object.assign(saveObj,text);
        }
        var sObj = JSON.stringify(saveObj);
        localStorage.setItem(where,sObj);
    }

}
let bd = new Bd('localStorage');
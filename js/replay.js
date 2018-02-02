class Replay{
	constructor() {
	this.replayArr = [];
		this.startArr = [];
	}
	
	pushStart(obj) {
		this.startArr.push(obj);
		
	}
	
	delete() {
		this.replayArr = [];
		this.startArr = [];
	}
	
	getStart() {
		return this.startArr;
	}
	
	getReplay() {
		return this.replayArr;
	}
	
	pushReplay(x,y) {
		let obj = {
			x:x,
			y:y
		}
		this.replayArr.push(obj);
	}
}
let replay = new Replay();
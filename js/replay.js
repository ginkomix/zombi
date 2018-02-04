class Replay{
	constructor() {
		this.replayArr = [];
		this.startArr = [];
	}

	pushStart(obj) {
		return Promise.resolve()
		.then(()=>{
			
		
		let clone = []
		for (var key in obj) {
			clone[key] = obj[key];
		}
		console.log(clone);
		this.startArr.push(clone);
});
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
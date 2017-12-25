let pairNum = 5;
let points = [];

function setup(){
	createCanvas(300,300);
	background(0);
	stroke(255);
	strokeWeight(5);
	for(let i=0; i<2; i++) {
		let pointset = [];
		for(let j=0; j<pairNum; j++) {
			pointset.push([(Math.floor(Math.random()*(width-40))+20), (Math.floor(Math.random()*(height-40))+20)]);
		}
		points.push(pointset);
	}
	console.log(points[0]);
	for(let i=0;i<points[0].length; i++){
		point(points[0][i][0], points[0][i][1]);
	}
	stroke(0, 200, 0);
	for(let i=0;i<points[1].length; i++){
		point(points[1][i][0], points[1][i][1]);
	}
	strokeWeight(1);
	for(let i=0;i<points[1].length; i++){
		line(points[0][i][0], points[0][i][1], points[1][i][0], points[1][i][1]);
	}
	currentPos = points[0];
	console.log(currentPos[0])
	stroke(200, 0, 0);
}

function draw(){
	for(let i=0; i<currentPos.length; i++){
		currentPos[i][0]+=1;
		currentPos[i][1]+=calculateYStep(currentPos[i],points[1][i]);
		/*point(currentPos[i][0], currentPos[i][1]);*/
	}
}

function calculateYStep(p1, p2){
	gradient = (p2[0]-p1[0])/(p2[1]-p1[1]);
	return(gradient);
}

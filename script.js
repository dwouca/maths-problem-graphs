let pairNum = 5;
let points = [];

function getGradient(p1, p2){
	if(p1.y == p2.y){
		return false;
	}
	gradient = (p2.x-p1.x)/(p2.y-p1.y);
	return(gradient);
}

function setup(){
	createCanvas(300,300);
	background(0);
	stroke(255);
	strokeWeight(5);
	for(let i=0; i<pairNum; i++) {
		let pointset = [];
		for(let j=0; j<2; j++) {
			pointset.push({
				x: (Math.floor(Math.random()*(width-40))+20),
				y: (Math.floor(Math.random()*(height-40))+20),
			});
		}
		pointset.gradient = getGradient(pointset[0], pointset[1]);
		points.push(pointset);
	}
	console.log(points[0]);
	points.forEach((pair) => {
		point(pair[0].x, pair[0].y);
	})
	stroke(0, 200, 0);
	points.forEach((pair) => {
		point(pair[1].x, pair[1].y);
	})
	strokeWeight(1);
	for(let i=0;i<points.length; i++){
		line(points[i][0].x, points[i][0].y, points[i][1].x, points[i][1].y);
	}
	currentPos = [];
	points.forEach((pair) => {

		console.log({x: pair[0].x, y: pair[0].y});
		currentPos.push({x: pair[0].x,
										 y: pair[0].y});
	});
	console.log(currentPos);
	stroke(200, 0, 0);
}

function draw(){
	for(let i=0; i<currentPos.length; i++){
		if(points[i].gradient == false){
			currentPos[i].y+=1;
		} else {
			currentPos[i].x+=1;
			currentPos[i].y+=points[i].gradient;
		}
		point(currentPos[i].x, currentPos[i].y);
	}
}

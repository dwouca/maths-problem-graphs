let pairNum = 3;
let points = [];
let cnv;
let currentPos = [];

function getGradient(p1, p2){
	if(p1.y == p2.y){
		return false;
	}
	gradient = (p2.x-p1.x)/(p2.y-p1.y);
	return(gradient);
}

function centerCanvas(){
	var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup(){
	cnv = createCanvas(Math.min(windowHeight, windowWidth), Math.min(windowHeight, windowWidth));
	centerCanvas();
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

	points.forEach((pair) => {
		currentPos.push({x: pair[0].x,
										 y: pair[0].y});
	});
	console.log(currentPos);
}

function windowResized(){
	centerCanvas();
}

function draw(){
	background(0);
	strokeWeight(5);
	stroke(255);
	points.forEach((pair) => {
		point(pair[0].x, pair[0].y);
	})
	stroke(70);
	points.forEach((pair) => {
		point(pair[1].x, pair[1].y);
	})
	stroke(0, 200, 0);
	strokeWeight(1);
	for(let i=0;i<points.length; i++){
		line(points[i][0].x, points[i][0].y, points[i][1].x, points[i][1].y);
	}
	stroke(200, 0, 0);

	strokeWeight(5);
	for(let i=0; i<currentPos.length; i++){
		updatePosition(i);
	}
}
function updatePosition(i) {
	let atEndOfLine;

	if(points[i].gradient == false){ /* vertical line */
		atEndOfLine = (points[i][1].y)>=(points[i][0].y);
	} else if((points[i][1].y>=points[i][0].y) && (points[i][1].x>=points[i][0].x)) {
		atEndOfLine = (currentPos[i].y>=points[i][1].y) && (currentPos[i].x>=points[i][1].x);
	} else if((points[i][1].y<=points[i][0].y) && (points[i][1].x<=points[i][0].x)) {
		atEndOfLine = (currentPos[i].y<=points[i][1].y) && (currentPos[i].x<=points[i][1].x);
	} else if((points[i][1].y>=points[i][0].y) && (points[i][1].x<=points[i][0].x)) {
		atEndOfLine = (currentPos[i].y>=points[i][1].y) && (currentPos[i].x<=points[i][1].x);
	} else if((points[i][1].y<=points[i][0].y) && (points[i][1].x>=points[i][0].x)) {
		atEndOfLine = (currentPos[i].y<=points[i][1].y) && (currentPos[i].x>=points[i][1].x);
	};
	if(!atEndOfLine){ /* if not reached end of line */
		if(points[i].gradient == false){
			currentPos[i].x+=1/1.5;
		} else if (points[i].gradient>=0) {
			if (points[i][1].x>=points[i][0].x) {/* point going towards is higher than current point */
				currentPos[i].y+=1/1.5;
				currentPos[i].x+=points[i].gradient/1.5;
			} else {
				currentPos[i].y-=1/1.5;
				currentPos[i].x-=points[i].gradient/1.5;
			}
		} else {
			if (points[i][1].x>=points[i][0].x) {/* point going towards is higher than current point */
				currentPos[i].y-=1/1.5;
				currentPos[i].x-=points[i].gradient/1.5;
			} else {
				currentPos[i].y+=1/1.5;
				currentPos[i].x+=points[i].gradient/1.5;
			}
		}
	}
	point(currentPos[i].x, currentPos[i].y);
}

let data = [];
let m = 0;
let b = 0;
let learningRate;
let info;
function setup() {
	createCanvas(500, 500)
	learningRate = createSlider(0.01, 1, 0.01 ,0.01)
}

function mousePressed() {
	let mx = mouseX;
	let my = mouseY;
	if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
		// MAP data between 0 and 1
		mx = map(mx, 0, width, 0, 1);
		my = map(my, 0, height, 1, 0);

		data.push({
			x: mx,
			y: my,
		});
	}
}

function draw() {
	background(55);
	if (data.length > 0) {
		showPoints()
	}
	if (data.length > 1) {
		linearRegression()
	}

	drawLine()
}

function drawLine() {
	stroke(12, 245, 90)
	strokeWeight(2)
	let x1 = 0
	let y1 = m * x1 + b
	let x2 = 1
	let y2 = m * x2 + b

	x1 = map(x1, 0, 1, 0, width)
	x2 = map(x2, 0, 1, 0, width)
	y1 = map(y1, 1, 0, 0, height)
	y2 = map(y2, 1, 0, 0, height)

	line(x1, y1, x2, y2)
}

function linearRegression() {
	let avgError = 0	// Learning Rate
	lr = learningRate.value()
	for (let i of data){
		y = i.y
		x = i.x
		let pred = m * x + b	// prediction
		let error = y - pred	// Calculating Error
		avgError += error
		m = m + (x * error) * lr
		b = b + error * lr
	}
	avgError = avgError / data.length

	textSize(25)
	fill(255, 187, 0)
	noStroke()
	text(`Error ${round(avgError,10)}`, 10,40)
	text(`Learning Rate ${lr}`, 10,80)
}

function showPoints() {
	stroke(15, 255, 215)
	strokeWeight(10)
	for (let p of data) {
		let dx = map(p.x, 0, 1, 0, width)
		let dy = map(p.y, 1, 0, 0, height)
		point(dx, dy)
	}
}

function resetAll() {
	data = [];
	b = 0;
	m = 0;
}
let data = [];
let m = 1;
let b = 0;

function setup() {
  createCanvas(500, 500);
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
      y: my
    });
  }
}

function draw() {
  background(0);
  if (data.length > 0) {
    showPoints();
  }
  if (data.length > 1) {
    linearRegression();
  }

  drawLine();
}

function drawLine() {
  stroke(0, 255, 0);
  strokeWeight(2);
  let x1 = 0;
  let y1 = m * x1 + b;
  let x2 = 1;
  let y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width);
  x2 = map(x2, 0, 1, 0, width);
  y1 = map(y1, 1, 0, 0, height);
  y2 = map(y2, 1, 0, 0, height);

  line(x1, y1, x2, y2);
}

function linearRegression() {
  let xbar = 0; //Average of all X pos
  let ybar = 0; //Average of all Y pos

  // Calculate XBAR and YBAR
  for (let p of data) {
    xbar += p.x;
    ybar += p.y;
  }

  // Calcukate Mean or Average
  let xMean = xbar / data.length;
  let yMean = ybar / data.length;

  // CALCULATE M (ie slope)
  let n = 0;
  let d = 0;
  for (let p of data) {
    n += (p.x - xMean) * (p.y - yMean);
    d += (p.x - xMean) * (p.x - xMean);
  }
  m = n / d;
  b = yMean - m * xMean;
}

function showPoints() {
  stroke(255);
  strokeWeight(5);
  for (let p of data) {
    let dx = map(p.x, 0, 1, 0, width);
    let dy = map(p.y, 1, 0, 0, height);
    point(dx, dy);
  }
}

function resetAll() {
  data = [];
  b = 0;
  m = 1;
  background(0);
}

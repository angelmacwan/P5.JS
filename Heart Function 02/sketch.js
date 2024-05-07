let xRange = 2;
let scale = 100;
let offset = 0.005;
let aOffset = 0.08;
let aRange = 20;
let a = aRange;
let flag = false;

function setup() {
  createCanvas(500, 500);

  noFill();
  stroke(255, 0, 0);
}

function heartCurve(x, a) {
  return (
    Math.pow(x, 2 / 3) +
    0.9 * Math.sqrt(2 - Math.pow(x, 2)) * Math.sin(Math.PI * a * x)
  );
}

function draw() {
  background(50);
  translate(width / 2, height / 2);
  rotate(PI);

  //   Get coords
  let xs = [];
  let ys = [];
  for (let x = -xRange; x <= xRange; x += offset) {
    xs.push(x);
    ys.push(heartCurve(x, a));
  }

  //   Mirror the curve
  let mirrorXs = [];
  for (let i = 0; i < xs.length; i++) {
    mirrorXs.push(-xs[i]);
  }

  // plot
  beginShape();
  for (let i = 0; i < xs.length; i++) vertex(xs[i] * scale, ys[i] * scale);

  endShape();

  beginShape();

  for (let i = 0; i < mirrorXs.length; i++)
    vertex(mirrorXs[i] * scale, ys[i] * scale);

  endShape();

  if ((a > aRange) | (a < -aRange)) flag = !flag;

  if (flag) a -= aOffset;
  else a += aOffset;
}

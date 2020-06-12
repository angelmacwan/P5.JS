let p = [];
let n = 70;
function setup() {
  // createCanvas(500, 500);
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < n; i++) {
    p[i] = new partObj();
  }
}
function draw() {
  background(20);
  // fill(0);
  for (var i = 0; i < n; i++) {
    p[i].show();
    p[i].update();
    p[i].drawLine(p);
  }
}

class partObj {
  constructor() {
    this.velLimit = 1;
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(
      random(-this.velLimit, this.velLimit),
      random(-this.velLimit, this.velLimit)
    );
  }
  show = function() {
    ellipse(this.pos.x, this.pos.y, 10);
  };
  update = function() {
    this.pos.add(this.vel);
    if (this.pos.x >= width || this.pos.x <= 0) this.vel.x *= -1;
    if (this.pos.y >= height || this.pos.y <= 0) this.vel.y *= -1;
  };
  drawLine = function(other) {
    let minDis = 100;
    for (var i = 0; i < n; i++) {
      let d = int(dist(this.pos.x, this.pos.y, other[i].pos.x, other[i].pos.y));

      if (d <= minDis) {
        push();
        stroke(255, 255, 255, 50);
        line(this.pos.x, this.pos.y, other[i].pos.x, other[i].pos.y);
        pop();
      }
    }
  };
}

let particle = [];
let n = 80;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < n; i++) {
    particle.push(new partObj(-1, -1))
  }
}
function draw() {
  background(20);

  for (let p of particle) {
    p.show();
    p.update();
    p.drawLine(particle);
    p.mouseLine()
  }
  push()
  noStroke()
  fill(255,30)
  ellipse(mouseX, mouseY, 50)
  pop()
}
function mouseClicked() {
  particle.push(new partObj(mouseX, mouseY))
}
class partObj {
  constructor(mx, my) {
    
    if(mx == -1 || my == -1) this.pos = createVector(random(width), random(height));
    else this.pos = createVector(mx, my)

    this.velLimit = 1;
    this.vel = createVector(
      random(-this.velLimit, this.velLimit),
      random(-this.velLimit, this.velLimit)
    )
  }
  show() {
    noStroke()
    ellipse(this.pos.x, this.pos.y, 10);
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.x >= width || this.pos.x <= 0) this.vel.x *= -1;
    if (this.pos.y >= height || this.pos.y <= 0) this.vel.y *= -1;
  }

  mouseLine(){
    let d = int(dist(this.pos.x, this.pos.y, mouseX, mouseY))
    if (d < 80){
      push()
      stroke(59, 255, 222)
      line(this.pos.x, this.pos.y, mouseX, mouseY)
      pop()
    }
  }

  drawLine = function(other) {
    for (var i = 0; i < n; i++) {
      let d = int(dist(this.pos.x, this.pos.y, other[i].pos.x, other[i].pos.y));

      if (d <= 100 && d > 50) {
        push();
        stroke("#3b9aff");
        line(this.pos.x, this.pos.y, other[i].pos.x, other[i].pos.y);
        pop();
      }else if (d < 50){
        push();
        stroke("#963bff");
        line(this.pos.x, this.pos.y, other[i].pos.x, other[i].pos.y);
        pop();
      }
    }
  };
}

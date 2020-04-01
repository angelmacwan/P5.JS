class Person {
  constructor(x, y) {
    this.rad = 10;
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.isAlive = true;
    this.isInfected = false;
    this.isRecovered = false;
    this.resistance = random(1, 10);
    this.infRad = this.rad * 3;
    this.canRecover = random();
    this.aliveLimt = random(400, 800);
  }

  show() {
    if (!this.isInfected) {
      fill(255);
    } else {
      push();
      stroke(255, 0, 0);
      strokeWeight(1);
      noFill();
      ellipse(this.pos.x, this.pos.y, this.infRad);
      pop();
      fill(255, 0, 0);
    }
    if (this.isRecovered) {
      fill(180);
    }
    if (!this.isAlive) {
      fill(0, 0, 0, 0);
    }
    ellipse(this.pos.x, this.pos.y, this.rad);
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  spread(other) {
    for (var o of other) {
      if (o.isInfected && this != o) {
        let d = dist(this.pos.x, this.pos.y, o.pos.x, o.pos.y);
        if (d < this.infRad && o.resistance < random(0, 5)) {
          this.isInfected = true;
        }
      }
    }
  }

  kill() {
    if (this.isInfected) {
      if (this.aliveLimt <= 0) {
        this.isAlive = false;
        this.isInfected = false;
        this.isRecovered = false;
        this.vel.x = 0;
        this.vel.y = 0;
      } else {
        this.aliveLimt--;
      }
    }
  }

  recover() {
    if (this.isInfected && this.canRecover > random(0.68, 0.9)) {
      this.isInfected = false;
      this.isRecovered = true;
      this.resistance = 10;
    }
  }
}

class FCircle {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.id = cId;
    cId++;
    this.speed = 5;
  }

  update() {
    this.move();
    this.show();
  }

  move() {
    this.x -= this.speed;

    if (this.x < 10) {
      killCircle(this.id);
    }
  }

  checkIfInSpawnRange() {
    if (this.x < 120) {
      killCircle(this.id);
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(247, 93, 82, 200);
    stroke(255, 0, 0);
    circle(0, 0, 30);
    pop();
  }
}

// Helper functions
function killCircle(idToKill) {
  let removeIndex = circles
    .map(function (item) {
      return item.id;
    })
    .indexOf(idToKill);
  circles.splice(removeIndex, 1);
}

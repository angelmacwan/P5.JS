let counter = 0;
let serise;
function setup() {
  createCanvas(window.innerWidth - 10, window.innerHeight - 10);
  serise = new Recaman().seqLong(5000);
  // frameRate(10);
  background(0);
}
let h = 0;
function draw() {
  background(0, 0, 0, 2);
  colorMode(HSB, 100);
  noFill();
  stroke(h, 255, 255);
  h += 0.1;
  strokeWeight(1);
  if (counter < serise.length - 1) {
    let x = (serise[counter] + serise[counter - 1]) / 2;
    let y = height / 2;
    let r = serise[counter] - counter;
    ellipse(x, y, r);
    counter++;
  } else {
    noLoop();
    console.log("done");
  }
}

class Recaman {
  constructor() {
    this.hop = 0;
    this.serise = [];
    this.current = 0;
  }

  seqLong(cycles) {
    for (let c = 0; c < cycles; c++) {
      let next = this.current - this.hop;
      for (let i of this.serise) {
        if (next == i || next < 0) {
          next = this.current + this.hop;
        }
      }
      this.serise.push(next);
      this.current = next;
      this.hop++;
    }
    return this.serise;
  }

  seqStep() {
    let next = this.current - this.hop;
    for (let i of this.serise) {
      if (next == i || next < 0) {
        next = this.current + this.hop;
      }
    }
    this.serise.push(next);
    this.current = next;
    this.hop++;

    return this.serise[this.serise.length - 1];
  }
}

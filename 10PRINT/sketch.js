let s;
let x = 0;
let y = 0;
let speed;
let size;
let seed;

function setup() {
  createCanvas(600, 600);
  background(0)
  createElement('h3', 'PRESS ENTER TO RESET');
  createElement('br')
  createElement('p', 'SEED');
  seed = createSlider(0, 1, 0.5, 0.01)
  createElement('p', 'SPEED');
  speed = createSlider(0, 100, 1, 1)
  createElement('p', 'SIZE');
  size = createSlider(0, 50, 20, 1)
}

function keyPressed() {
  if (keyCode === ENTER) {
    background(0)
    x = 0;
    y = 0;
  }
}

function draw() {
  s = size.value()
  stroke(0, 255, 0)
  for (var i = 0; i < speed.value(); i++) {

    if (random(1) < seed.value()) {
      line(x, y, s + x, s + y)
    } else {
      line(x, y + s, x + s, y)
    }

    if (x >= width) {
      x = 0;
      y += s;
    } else {
      x += s
    }
  }
}
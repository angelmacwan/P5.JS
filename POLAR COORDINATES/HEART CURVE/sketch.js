var r=10;
var x;
var y;
let i=0;
let slider;
function setup() {
  createCanvas(500 ,500)
  slider = createSlider(0, PI/3, 0, 0.001)
}

function draw(){

  background(50)
  translate(width/2, height/2)
  noFill()
  stroke(255)
  beginShape()
  // for (var i = 0; i < TWO_PI; i=i+0.01) {
  //   x=(16*pow(sin(i),3))*r
  //   y=-(13*cos(i)-5*cos(2*i)-2*cos(3*i)-cos(4*i))*r
  //   vertex(x , y);
  // }

  i=slider.value()

  for (var n = 0; n < TWO_PI; n=n+0.01) {
    x=(16*pow(sin(n*i),3))*r
    y=-(13*cos(n*i)-5*cos(2*i*n)-2*cos(3*i*n)-cos(4*i*n))*r
    vertex(x , y);
  }

  endShape()
}

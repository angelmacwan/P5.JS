var r=200;
var x;
var y;
let sliderx;
let slidery;
function setup() {
  createCanvas(500 ,500)
  sliderx = createSlider(0 ,TWO_PI ,TWO_PI/5,0.0001)
  slidery = createSlider(0 ,TWO_PI ,TWO_PI/5,0.0001)
}

function draw(){

  background(50)
  translate(width/2, height/2)
  noFill()
  stroke(0,255,0)

  beginShape()
  for (var i = 0; i < TWO_PI; i=i+0.01) {
    x=r*cos(i*sliderx.value())
    y=r*sin(i*slidery.value())
    vertex(x , y);
  }
  endShape()
}

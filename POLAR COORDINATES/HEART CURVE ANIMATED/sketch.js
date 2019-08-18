var r=10;
var x;
var y;
let i=0;
let speed
function setup() {
  createCanvas(500 ,500)
  speed  = createSlider(0,0.01,0.01,0.0001)
}

function draw(){

  background(50)
  translate(width/2, height/2)
  //noFill()

  fill(249,84,84)

  stroke(255,61,61)
  beginShape()

  // i+=0.001
  i+=speed.value()
  if (i > PI/2.5){
    i=0
  }

  for (var n = 0; n < TWO_PI; n=n+0.01) {
    x=(16*pow(sin(n*i),3))*r
    y=-(13*cos(n*i)-5*cos(2*i*n)-2*cos(3*i*n)-cos(4*i*n))*r
    vertex(x , y);
  }

  endShape()
}

var a =0;
function setup() {
  createCanvas(600 , 600);
  slider = createSlider(0 ,TWO_PI , PI/4 , 0.001)
}
function draw(){
  a = slider.value()
  background(50);
  stroke(80 ,200 , 100);
  translate(width/2 , height);
  branch(150);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0,-len);

  if(len > 5){
    push()
    rotate(a);
    branch(len * 0.7);
    pop()
    push()
    rotate(-a);
    branch(len * 0.7);
    pop()
  }
}

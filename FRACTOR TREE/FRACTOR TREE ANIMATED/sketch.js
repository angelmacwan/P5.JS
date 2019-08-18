var a =0;
var i=0
var x=0
function setup() {
  createCanvas(600 , 600);
  //slider = createSlider(0 ,TWO_PI , PI/4 , 0.001)
}
function draw(){
  //a = slider.value()
  a=i
  background(50);
  stroke(80 ,200 , 100);
  translate(width/2 , height);
  branch(150);

  if (x==0) {
    i+=0.005
    if(i > TWO_PI){
      x=1
    }
  }
  if (x==1) {
    i-=0.005
    if(i <= 0){
      x=0
    }
  }


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

let d;
let n;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
}

let den = 3;
let num=0;
let h=0;

function draw() {
  background(0);
  
  let k = num / den;

	h++;
	if(h>255)h=0;
  
  num+=0.001;

  strokeWeight(4);
  translate(width / 2, height / 2);
  fill(0);
  beginShape();
  for (let a = 0; a < TWO_PI * 10; a += 0.01) {
    let r = cos(k * a) * 250;
    let x = r * cos(a);
    let y = r * sin(a);    
	stroke(h,200,255);
    vertex(x, y);
  }
  endShape();
  

}

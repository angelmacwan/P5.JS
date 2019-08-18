
function setup(){
  createCanvas(500,500);
  angleMode(DEGREES)
  textAlign(CENTER);
  textSize(45);
}


function draw(){
  background(0);
  translate(height/2 , width/2)
  rotate(-90)
  let hr = hour();
  let mn = minute();
  let se = second();

  fill(255)

  noStroke()
  //text(hr + ':' + mn + ':' + se , height/2 , width/2)

  // let ht = map(hr , 0 , 24 , 0 , height)
  // let mt = map(mn , 0 , 60 , 0 , height)
  // let st = map(se , 0 , 60 , 0 , height)

  let ht = map(hr , 0 , 23 , 0 , height)
  let mt = map(mn , 0 , 59 , 0 , height)
  let st = map(se , 0 , 59 , 0 , 360)

  noFill()

  stroke(19, 188, 115)
  strokeWeight(30)
  ellipse(0,0, 400, 400);

  stroke(160, 39, 254)

  strokeWeight(30)
  arc(0,0, 400, 400, 0, st);


  stroke(255)
  arc(0,0, 330, 330, 0, mt);

  stroke(35, 237, 189)
  //strokeWeight(30)
  ellipse(0,0, 250, 250);
  stroke(41, 71, 220)
  arc(0,0, 250, 250, 0, ht);



}

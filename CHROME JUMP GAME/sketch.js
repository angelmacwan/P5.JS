let dino
let ob = []
let c = []
function setup(){
  createCanvas(800,400)
  dino = new player
}

function keyPressed(){
    dino.jump()
}


function draw() {

  if (random(1) < 0.01) {
    ob.push(new obstical())
  }

  if (random(1) < 0.01) {
    c.push(new clouds())
  }

  background(50)

  for (let cl of c){
    cl.show()
    cl.move()
  }

  dino.show()
  dino.move()

  for (let t of ob) {
    t.move()
    t.show()
    if( collideRectRect(dino.xpos, dino.y, dino.y, dino.y, t.xpos, t.ypos, t.w, t.h ) ){
      console.log("die");
      noLoop()
      background(255,0,50)
    }
  }

}

class player{
  constructor(){
    this.xpos=height-52
    this.y = 50
    this.vel = 0
    this.gravity = 0.7
  }

  show(){
    rect(this.y,this.xpos,this.y,this.y)
  }

  jump(){
    this.vel = -13
  }

  move(){
    this.xpos += this.vel
    this.vel += this.gravity
    this.xpos = constrain(this.xpos ,0, height - 50)
  }

}


class obstical{
  constructor(){
    this.ypos = width
    this.xpos = height - 45
    this.h = 20
    this.w = 45

  }
  show(){
    fill(255)
    rect( this.ypos , this.xpos , this.h , this.w )
  }

  move(){
    this.ypos -= 5
  }
}




class clouds {
  constructor() {
    this.y=width
    this.x = random(200)
    this.img = loadImage('clouds.PNG')
  }
  show(){
    //rect(this.y , this.x,50,50)
    image(this.img , this.y , this.x)
  }
  move(){
    this.y -= 0.5
  }
}

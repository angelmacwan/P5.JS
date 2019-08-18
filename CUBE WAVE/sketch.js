let angle = 0;
let w;
let ma;
let maxD
//let rx;
//let ry;
//let rz;

function setup() {
  createCanvas(400 , 400 , WEBGL);
  ma = atan(1 / sqrt(2))
  maxD = dist(0,0,200,200)
  sliderw = createSlider(3 , 50 , 30 , 0.01)
//  sliderx = createSlider(0 , PI , 0 , 0.01)
//  slidery = createSlider(0 , PI , 0 , 0.01)
  //sliderz = createSlider(0 , PI , 0 , 0.01)
}



function draw(){
  background(175)
  //ortho(-350 , 350 , -350 , 350 , 0 , 600)

  ambientLight(150);
  w = sliderw.value()
  //translate(width/2 , height/2)
  translate(0,0,-300)

  rotateX(-QUARTER_PI)

  rotateY(ma)


  let offset = 0

  for (let z = 0; z < height; z+=w) {
    for (let x = 0; x < width; x+=w) {
      push()
      let d = dist(x , z , width/2 , height / 2)
    

      offset = map(d , 0 , maxD , -2 , 2)

      let a = angle + offset
      let h = map(sin(a) , -1 , 1 , 0 , 200)
      translate(x-width/2 , 0 , z-height/2)
      ambientMaterial(255,204,229)
      //normalMaterial()

      //rect(x-width/2 + w/2 , 0 , w-2 , h)
      box(w-2 , h , w-2)
      pop()
    }
    offset -= 0.1
  }
  angle += 0.1;
}

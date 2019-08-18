var x=0.01
var y=0
var z=0

var a = 13
var b = 10
var c = 8/3

function setup(){
  //createCanvas(800,800,WEBGL)
  createCanvas(500,500)
  background(0)
}
function draw() {
  var dt=0.01
  var dx = (a*(y-x))*dt
  var dy = (x*(b-z)-y)*dt
  var dz = (x*y - c*z)*dt


  x = (x+dx)
  y = (y+dy)
  z = (z+dz)
  translate(width/2 , height/2)
  scale(5)
  stroke(255);
  point(x,z,)


  console.log(x , y , z);
}

let part = []
let pad = 20
let orbit = false

function setup() {
	createCanvas(600,600, WEBGL)
	for (let i = 0; i <= 800; i++){
		part.push(new Particle())
	}
}

function draw(){
	background(0)
	if (orbit){
		rotateX(frameCount * 0.005)
		rotateY(frameCount * 0.005)
		scale(5)
	}else{
		rotateX(90)
		scale(8)
		translate(0,-30,0)
	}
	for(i of part){
		i.show()
		i.update()
	}
}

class Particle{
	constructor(){
		this.a = 10
		this.b = 28
		this.c = 8/3

		this.x = random(-1,1)
		this.y = random(-1,1)
		this.z = random(-1,1)
	}

	update(){

		let scale = 100

		let dx = (this.a * (-this.x + this.y)) / scale
		let dy =  ( (-this.x * this.z) + (this.b * this.x) - this.y ) / scale
		let dz = ( (this.x * this.y) - (this.c * this.z) ) / scale

		this.x += dx
		this.y += dy
		this.z += dz
	}
	
	show(){
		strokeWeight(4)
		stroke(255)
		point(this.x, this.y, this.z)
	}
}


function toggleOrbit(){
	orbit = !orbit;
}

function setDataPoints(){
	let points = document.querySelector("#noOfPoints").value
	part = []
	for (let i = 0; i <= points; i++){
		part.push(new Particle())
	}
}

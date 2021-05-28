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
		translate(0,-20,0)
	}
	for(i of part){
		i.show()
		i.update()
	}
}

class Particle{
	constructor(){
		this.a = 0.2
		this.b = 0.2
		this.c = 5.7

		this.x = random(0,1)
		this.y = random(0,1)
		this.z = random(0,1)
	}

	update(){

		let scale = 10

		let dx = (-(this.y + this.z)) / scale
		let dy = (this.x + (this.a*this.y)) / scale
		let dz = (this.b + this.z * (this.x - this.c)) / scale

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

let part = []
let pad = 20
let orbit = true
let num = 1000

function setup() {
	createCanvas(600,600, WEBGL)
	for (let i = 0; i <= num; i++){
		part.push(new Lorenz())
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

class Lorenz{
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
		strokeWeight(2)
		stroke(255)
		point(this.x, this.y, this.z)
	}

    showInfo(){
        let d = document.querySelector("#info");
        d.innerHTML = `
        <h2>Lorenz Attractor</h2>
        The Lorenz system is a system of ordinary differential equations first studied by Edward Lorenz. <br>
        It is notable for having chaotic solutions for certain parameter values and initial conditions.<br>
        In particular, the Lorenz attractor is a set of chaotic solutions of the Lorenz system. <br>
        <div class="system">
            <b>Parameters</b> <br>
            σ = 10, ρ = 28, β = 8/3 <br>
            
            <b>System</b> <br>
            dx = σ (-x + y) <br>
            dy = -xz + ρx - y <br>
            dz = xy - βz <br>
        <div>
        <br>
        <b>
		    Processing version for Lorenz Attractor available <a href="https://github.com/angelmacwan/Processing/tree/master/Lorenz_Attractor">here</a>
        </b>
        `
    }

}


class Rossler{
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
		strokeWeight(2)
		stroke(255)
		point(this.x, this.y, this.z)
	}

    showInfo(){
        let d = document.querySelector("#info");
        d.innerHTML = `
        <h2>Rössler Attractor</h2>
        The Rössler attractor is the attractor for the Rössler system, <br>	
        a system of three non-linear ordinary differential equations originally studied by Otto Rössler.<br>
        These differential equations define a continuous-time dynamical system that exhibits chaotic dynamics<br>
        associated with the fractal properties of the attractor<br>

        <div class="system">
            <b>Parameters</b> <br>
            a = 0.2, b = 0.2, c = 5.7 <br>
            
            <b>System</b> <br>
            dx = -(y + x) <br>
            dy = x + ay<br>
            dz = b + z(x-c) <br>
        <div>
        <br>
        <b>
		    Processing version for Rössler Attractor available <a href="https://github.com/angelmacwan/Processing/tree/master/Rosselrs_Attractor">here</a>
        </b>
        `
    }
}



function toggleOrbit(){
	orbit = !orbit;
}


function loadLorenz(){
    part = []
    for (let i = 0; i <= num; i++){
		part.push(new Lorenz())
	}
    part[0].showInfo()
}

function loadRossler(){
    part = []
    for (let i = 0; i <= num; i++){
		part.push(new Rossler())
	}
    part[0].showInfo()
}
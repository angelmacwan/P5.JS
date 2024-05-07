function Block(){
	this.vel = 2;
	this.pos=createVector(random(0,width), 0);
	this.width = random(width/5, width/2);
	this.height = 30

	this.show=()=>{
		fill(255,0,0)
		rect(this.pos.x, this.pos.y, this.width,this.height);		
	}

	this.update = ()=>{
		this.pos.y+=this.vel
	}

}
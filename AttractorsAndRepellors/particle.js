function Particle(){
    this.pos = createVector(random(width), random(height))

    this.vel = createVector(random(-1, 1), random(-1, 1))
    this.acc = createVector(random(-1, 1), random(-1, 1))

    this.show = () => {
        stroke(255)
        strokeWeight(2)
        point(this.pos.x, this.pos.y)
    }

    this.update = () => {
        this.pos.add(this.vel)
        this.vel.add(this.acc).limit(2)
    }
    
    this.colide = () => {
        if(this.pos.x < 0 || this.pos.x > width){
            this.acc.x *= -1
            this.vel.x *= -1
        }
        
        if (this.pos.y < 0 || this.pos.y > height){
            this.vel.y *= -1
            this.acc.y *= -1
        }
        
    }

    this.attract = (x, y) => {
        // Calculate direction of force
        let force = p5.Vector.sub(this.pos, createVector(x, y));
        
        // Distance between objects
        let distance = force.mag();
        
        // Limiting the distance to eliminate "extreme" results for very close or very far objects
        distance = constrain(distance, 5, 25);

        // Calculate gravitional force magnitude
        let G = -5
        let mass = 5
        let strength = (G * mass) / (distance * distance);
        
        force.setMag(strength);
       
        // Apply force
        p5.Vector.div(force, mass)
        this.acc.mult(0)
        this.acc.add(force)
        
    }


}
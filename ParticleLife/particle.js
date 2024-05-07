function Particle(fillColor, gene) {
    this.gene = gene;
    this.pos = createVector(random(0, width), random(0, height));
    this.size = 10;
    this.maxSpeed = 2;
    this.config = classes[gene];

    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D();

    this.show = () => {
        fill(fillColor);
        stroke(fillColor);
        strokeWeight(this.size);
        point(this.pos.x, this.pos.y);
    };

    this.move = () => {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
    };

    // Box World with border colisions
    this.borderColide = () => {
        if ((this.pos.x > width) | (this.pos.x < 0)) {
            this.vel.x *= -1;
            this.acc *= -1;
        }

        if ((this.pos.y > height) | (this.pos.y < 0)) {
            this.vel.y *= -1;
            this.acc *= -1;
        }
    };

    // Sphere projection on a 2d plane
    this.borderWrap = () => {
        if (this.pos.x > width) this.pos.x = 0;
        else if (this.pos.x < 0) this.pos.x = width;

        if (this.pos.y > height) this.pos.y = 0;
        else if (this.pos.y < 0) this.pos.y = height;
    };

    this.simulate = (particles) => {
        particles.forEach((p) => {
            let targetGene = p.gene;
            let seekForce = this.config[targetGene];
            let force = seek(
                p.pos,
                this.pos,
                this.vel,
                seekForce[0],
                seekForce[1]
            );
            this.pos.add(force);
        });
    };
}

function seek(target, position, velocity, maxSpeed, maxForce) {
    let desired = p5.Vector.sub(target, position); // Calculate desired velocity towards target
    desired.setMag(maxSpeed); // Set magnitude of desired velocity to maximum speed

    let steering = p5.Vector.sub(desired, velocity); // Calculate steering force towards desired velocity
    steering.limit(maxForce); // Limit steering force to maximum force

    return steering; // Return steering force as a vector
}

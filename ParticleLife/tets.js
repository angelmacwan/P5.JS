const DEFAULT_COLOR = "#fff";

let particles = [];
let num = 400;

// CONFIG
let classes = {
    red: {
        name: "red",
        color: "#ffb6c1",
        red: -1,
        green: 5,
        blue: -3,
    },
    green: {
        name: "green",
        color: "#98fb98",
        red: 5,
        green: 6,
        blue: -2,
    },
    blue: {
        name: "blue",
        color: "#b0e0e6",
        red: 2,
        green: 8,
        blue: 4,
    },
};

let classNames = Object.keys(classes);

function Particle(fillColor, gene) {
    this.gene = gene;
    this.pos = createVector(random(0, width), random(0, height));
    this.size = 4;
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
            let force = seek(p.pos, this.pos, this.vel, seekForce, 0.1);
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

function setup() {
    createCanvas(windowWidth - 5, windowHeight - 5);

    for (let i = 0; i < num; i++) {
        let geneName = random(classNames);
        let geneColor = classes[geneName].color;
        particles.push(new Particle(geneColor, geneName));
    }
}
function draw() {
    background(30);

    particles.forEach((p) => {
        p.show();
        p.move();
        // p.borderColide();
        p.borderWrap();
        p.simulate(particles);
    });

    fill(255);
    noStroke();
    textSize(20);
    text(frameRate(), 20, 40);
}

// [three, six, seven]
// const angles = [2.2, 1.05, 0.9, 0.8, 0.7]
let angle = 2.2;
let simSpeed = 10;
let points = [];

let nx = 0,
    ny = 0;

function setup() {
    createCanvas(window.innerWidth - 5, window.innerHeight - 5);

    nx = random(width);
    ny = random(height);

    // polar coordinates
    for (let i = 0; i < TWO_PI; i += angle) {
        let r = 300;
        let x = r * cos(i);
        let y = r * sin(i);
        points.push(createVector(x, y));
    }

    background(0);
    strokeWeight(3);
    stroke(255);
}

function draw() {
    translate(width / 2, height / 2);

    // draw the points
    for (let p of points) point(p.x, p.y);

    // Simulation
    for (let i = 0; i < simSpeed; i++) {
        let num = floor(random(0, points.length));

        let target = points[num];
        nx = (nx + target.x) / 2;
        ny = (ny + target.y) / 2;

        strokeWeight(1);
        stroke(0, 255, 0);
        point(nx, ny);
    }
}

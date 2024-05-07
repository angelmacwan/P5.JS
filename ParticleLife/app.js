const DEFAULT_COLOR = "#fff";

let particles = [];
let num = 300;

let classNames = Object.keys(classes);

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
        p.borderColide();
        // p.borderWrap();
        p.simulate(particles);
    });

    fill(255);
    noStroke();
    textSize(20);
    text(frameRate(), 20, 40);
}

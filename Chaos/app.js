let t1, t2, t3;
let nx, ny;

function setup() {
    createCanvas(window.innerWidth - 5, window.innerHeight - 5);
    nx = random(width);
    ny = random(height);

    t1 = {
        x: width / 2,
        y: 50,
    };
    t2 = {
        x: 50,
        y: height - 50,
    };
    t3 = {
        x: width - 50,
        y: height - 50,
    };

    background(0);

    strokeWeight(3);
    stroke(255);

    point(t1.x, t1.y);
    point(t2.x, t2.y);
    point(t3.x, t3.y);
}
function draw() {
    for (let i = 0; i < 5; i++) {
        let num = floor(random(1, 7));
        if (num == 1 || num == 2) {
            //target is t1
            nx = (nx + t1.x) / 2;
            ny = (ny + t1.y) / 2;
        } else if (num == 3 || num == 4) {
            //target is t2
            nx = (nx + t2.x) / 2;
            ny = (ny + t2.y) / 2;
        } else {
            //target is t3
            nx = (nx + t3.x) / 2;
            ny = (ny + t3.y) / 2;
        }
        strokeWeight(1);
        stroke(0, 255, 0);
        point(nx, ny);
    }
}

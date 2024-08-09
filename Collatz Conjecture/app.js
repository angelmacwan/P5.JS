let n = 1;

function setup() {
    createCanvas(windowWidth - 5, windowHeight - 5);
    background(20);

    // ADD TEST ON TOP LEFT
    textSize(20);
    fill(255);
    text("Collatz Conjecture", 30, 60);

    colorMode(HSB, 255);
    frameRate(30);  // Limit frame rate to slow down drawing
}

function draw() {
    let collatz_outputs = [];
    let x = n;

    do {
        x = collatz(x);
        collatz_outputs.push(x);
    } while (x != 1);

    draw_collatz(collatz_outputs);

    n++;

    if (n > 1000) {
        console.log("done");
        noLoop();
        return;
    }
}

function draw_collatz(collatz_outputs, angle = .15, offset = 15) {
    push();
    translate(width / 2, height / 1.2);
    rotate(PI / 2);
    for (let i = collatz_outputs.length - 1; i >= 0; i--) {

        let hue = map(i, 0, collatz_outputs.length - 1, 100, 200);
        stroke(hue, 255, 255, 100);
        strokeWeight(map(i, 0, collatz_outputs.length - 1, 1, 8));

        if (collatz_outputs[i] % 2 == 0) rotate(angle);
        else rotate(-angle);
        line(0, 0, 0, offset);
        translate(0, offset);
    }
    pop();
}

function collatz(n) {
    if (n % 2 == 0) {
        return n / 2;
    } else {
        return 3 * n + 1;
    }
}

// let n = 1

// function setup() {
//     createCanvas(windowWidth - 5, windowHeight - 5);
//     background(20);

//     // ADD TEST ON TOP LEFT
//     textSize(20);
//     fill(255);
//     text("Collatz Conjecture", 30, 60);



//     colorMode(HSB, 255);
// }

// function draw() {
//     let collatz_outputs = [];
//     let x = n;

//     do {
//         x = collatz(x)
//         collatz_outputs.push(x)
//     } while (x != 1)

//     draw_collatz(collatz_outputs)

//     n++;

//     if (n > 600) {
//         console.log("done")
//         noLoop()
//         return
//     }
// }


// function draw_collatz(collatz_outputs, angle = .2, offset = 20) {
//     push()
//     translate(width / 2, height / 1.5)
//     rotate(PI / 2)
//     for (let i = collatz_outputs.length - 1; i >= 0; i--) {

//         let hue = map(i, 0, collatz_outputs.length - 1, 100, 200);
//         stroke(hue, 255, 255, 80);
//         strokeWeight(2);

//         if (collatz_outputs[i] % 2 == 0) rotate(angle)
//         else rotate(-angle)
//         line(0, 0, 0, offset)
//         translate(0, offset)
//     }
//     pop()
// }

// function collatz(n) {
//     if (n % 2 == 0) {
//         return n / 2;
//     } else {
//         return 3 * n + 1;
//     }
// }
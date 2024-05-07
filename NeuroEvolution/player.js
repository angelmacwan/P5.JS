class Player {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.id = pId;
        pId++;
        this.speed = 0;
        this.trainData = [];

        this.input = [];
        this.output = [];

        this.net = 0;
        this.shortestDist = Infinity;

        this.showInputs = 1;

        if (bestGens.length == 0) {
            let a = random(width) - 40;
            let b = random(height);
            let hyp = Math.sqrt(a * a + b * b);
            this.input = [random(height), random(height), hyp, a, b];
            this.output = {
                up: random(1),
                down: random(1),
            };
        } else {
            let isMutation = Math.random() < 0.9;
            let bestG = random(bestGens);

            if (isMutation == true) {
                this.input = [
                    random(
                        calculateHorL("low", bestG.input[0]),
                        calculateHorL("high", bestG.input[0])
                    ),
                    random(
                        calculateHorL("low", bestG.input[1]),
                        calculateHorL("high", bestG.input[1])
                    ),
                    random(
                        calculateHorL("low", bestG.input[2]),
                        calculateHorL("high", bestG.input[2])
                    ),
                    random(
                        calculateHorL("low", bestG.input[3]),
                        calculateHorL("high", bestG.input[3])
                    ),
                    random(
                        calculateHorL("low", bestG.input[4]),
                        calculateHorL("high", bestG.input[4])
                    ),
                ];
                this.output = {
                    up: random(
                        calculateHorL("low", bestG.output[0]),
                        calculateHorL("high", bestG.output[0])
                    ),
                    down: random(
                        calculateHorL("low", bestG.output[1]),
                        calculateHorL("high", bestG.output[1])
                    ),
                };
            } else if (isMutation == false) {
                this.input = [
                    bestG.input[0],
                    bestG.input[1],
                    bestG.input[2],
                    bestG.input[3],
                    bestG.input[4],
                ];
                this.output = {
                    up: bestG.output[0],
                    down: bestG.output[1],
                };
            }
        }

        this.trainData.push({
            input: this.input,
            output: this.output,
        });

        this.net = new brain.NeuralNetwork();
        this.net.train(this.trainData);
    }

    update() {
        this.move();
        this.show();

        let cX = 0;
        let cY = 0;
        for (let i = circles.length - 1; i >= 0; i--) {
            let pcDist = dist(this.x, this.y, circles[i].x, circles[i].y);
            if (pcDist <= 30) {
                //Check for fitness, and add fittest to bestGens
                if (players.length <= 3) {
                    bestGens.push({
                        input: this.input,
                        output: this.output,
                    });
                }
                //Kill Player
                killPlayer(this.id);
            }

            //Shortest Dist for ai
            if (pcDist < this.shortestDist) {
                this.shortestDist = pcDist;
                cX = circles[i].x;
                cY = circles[i].y;
            }
        }

        this.think(cX, cY);
    }

    think(posX, posY) {
        //Think
        const pOutput = this.net.run([
            this.x,
            this.y,
            this.shortestDist,
            posX,
            posY,
        ]);

        // for debugging inputs
        if (this.showInputs) {
            push();
            stroke(0, 255, 0);
            // line(this.x, this.y, posX, posY);
            const d = dist(this.x, this.y, posX, posY);
            noFill();
            circle(this.x, this.y, d * 2);
            pop();
        }

        if (pOutput.up > pOutput.down) this.speed = -5;
        else if (pOutput.up < pOutput.down) this.speed = 5;
        else this.speed = 0;

        //Reset ShortestDist
        this.shortestDist = Infinity;
    }

    move() {
        // Move Horizontaly
        this.x += this.speed;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
    }

    show() {
        push();
        translate(this.x, this.y);
        fill(72, 183, 247);
        circle(0, 0, 30);
        pop();
    }
}

// Helper function
function calculateHorL(highOrLow, number) {
    if (highOrLow == "high") {
        number += number / 100;
        return number;
    } else if (highOrLow == "low") {
        number -= number / 100;
        return number;
    }
}

function killPlayer(idToKill) {
    let removeIndex = players
        .map(function (item) {
            return item.id;
        })
        .indexOf(idToKill);
    players.splice(removeIndex, 1);
}

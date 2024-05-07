class Spawner {
    constructor(pPerGen) {
        this.pPerGen = pPerGen;

        //Spawn 1st Gen
        this.spawnNewGen();
    }

    update() {
        if (players.length == 0) {
            //Spawn new Gen
            this.spawnNewGen();
        }
    }

    spawnNewGen() {
        circles = [];

        for (let i = 0; i < this.pPerGen; i++) {
            players.push(new Player(width / 2, height - 150));
        }

        allScores.push(score);
        if (score > highScore) {
            highScore = score;
            highestGen = genNumber;

            bestGens = [];
        }
        genNumber++;
        score = 0;
    }
}

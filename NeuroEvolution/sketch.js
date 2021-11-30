let circles = [];
let cId = 0;

let players = [];
let pId = 0;

let spawner;

let bestGens = [];
let genNumber = 0;
let highestGen = 0;

let score = 0;
let allScores = [];
let highScore = 0;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);

  spawner = new Spawner(10);
}

function draw() {
  background(0);

  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
  }

  if (frameCount % 15 == 0) {
    spawnRandom();
  }

  for (let i = players.length - 1; i >= 0; i--) {
    players[i].update();
  }

  spawner.update();

  score++;
  updateStats();
}

// HELPER FUNCTIONS

function updateStats() {
  document.querySelector("#gen").innerHTML = `Generation: ${genNumber}`;
  document.querySelector(
    "#score"
  ).innerHTML = `Score: ${score} <br>High Score ${highScore}`;
  document.querySelector(
    "#population"
  ).innerHTML = `Population: ${players.length}`;
  document.querySelector("#fps").innerHTML = `FPS: ${Math.ceil(frameRate())}`;
}

function spawnRandom() {
  circles.push(new FCircle(windowWidth - 20, random(windowHeight)));
}

// 0 -> dead cell
// 1 -> live cell

let matrix = [];
let res = 10;

let alive = "#E8B4B0";
let dead = "#246D82";

// inverse probability of death
let deathRate = 0.5;

// inverse probability of birth
let birthRate = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < width / res; i++) {
    row = [];
    for (let j = 0; j < height / res; j++) {
      if (random(1) < 0.03) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    matrix.push(row);
  }
  //   noStroke();
}

function draw() {
  background(0);
  drawMatrix();
  updateMatrix();
}

// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
function updateMatrix() {
  let next = matrix.slice();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      // count neighbours of matrix[i][j]
      let neighbours = countNeighbors(i, j);

      if (matrix[i][j] == 1 && neighbours < 2 && random(1) < deathRate)
        next[i][j] = 0;
      else if (
        matrix[i][j] == 1 &&
        (neighbours == 2 || neighbours == 3) &&
        random(1) < birthRate
      )
        next[i][j] = 1;
      else if (matrix[i][j] == 1 && neighbours > 3 && random(1) < deathRate)
        next[i][j] = 0;
      else if (matrix[i][j] == 0 && neighbours == 3 && random(1) < birthRate)
        next[i][j] = 1;
    }
  }
  matrix = next.slice();
}

function countNeighbors(x, y) {
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + matrix.length) % matrix.length;
      let row = (y + j + matrix.length) % matrix.length;
      if (matrix[col][row] == 1) {
        count++;
      }
    }
  }
  return count;
}

function drawMatrix() {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 1) {
        fill(alive);
        rect(i * res, j * res, res, res);
      } else {
        fill(dead);
        rect(i * res, j * res, res, res);
      }
    }
  }
}

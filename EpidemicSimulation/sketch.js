let population = 50;
//

let people = [];
let inf = 0;
let rec = 0;
let ded = 0;

function setup() {
  createCanvas(600, 600);
  for (var i = 0; i < population; i++) {
    people.push(new Person(random(width), random(height)));
  }
}

function draw() {
  inf = 0;
  rec = 0;
  ded = 0;
  background(0);
  noStroke();
  for (let p of people) {
    showData(p);
    p.show();
    p.move();
    p.spread(people);
    p.recover();
    p.kill();
  }

  drawChart();
}

function addPopulation() {
  population = Number(document.querySelector("#iniPop").value);
  people = [];
  for (var i = 0; i < population; i++) {
    people.push(new Person(random(width), random(height)));
  }
}

function mousePressed() {
  people.push(new Person(random(width), random(height)));
  people[people.length - 1].isInfected = true;
}

function showData(obj) {
  let infected = document.querySelector("#inf");
  let recovered = document.querySelector("#rec");
  let dead = document.querySelector("#dead");
  document.querySelector(
    "#pop"
  ).innerHTML = `TOTAL POPULATION = ${people.length}`;
  if (obj.isInfected) {
    inf++;
  } else if (obj.isRecovered) {
    rec++;
  } else if (!obj.isAlive) {
    ded++;
  }

  infected.innerHTML = `INFECTED ${inf}`;
  recovered.innerHTML = `RECOVERED ${rec}`;
  dead.innerHTML = `DEAD ${ded}`;
}

function drawChart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  Chart.defaults.global.animation.duration = 0;

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Initial Population", "Infected", "Recovered", "Dead"],
      datasets: [
        {
          label: "# of Votes",
          data: [population, inf, rec, ded],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)"
          ],
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: 0
            }
          }
        ]
      }
    }
  });
}

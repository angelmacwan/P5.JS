let info_div = document.querySelector("#loss")
let model;
let data = [];
let offset = 30;
let modelReady = false;
let ep = 300;
let xs;
let ys;

const customCallback = {
  onEpochEnd: async (epoch, logs) => {
    info_div.innerHTML = "Loss : " + logs.loss + "<br>" + "Epoch : " + epoch
    update()
  }
};

function setup() {
  createCanvas(800, 600);
  background(50);

  prepareData();
  createModel();
  trainModel();


  background(50);

}


function update(){
  background(50)
  showData(data)
  showPredictions()
}


function prepareData() {
  for (let i = 0; i < 100; i++) {
    let x = i / 10;
    let y = Math.cos(x);
    data.push({ x: x, y: y });
  }
  xs = tf.tensor2d(data.map(d => [d.x]));
  ys = tf.tensor2d(data.map(d => [d.y]));
}

function createModel() {
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 12, activation: 'relu', inputShape: [1] }));
  model.add(tf.layers.dense({ units: 64, activation: 'tanh' }));
  model.add(tf.layers.dense({ units: 32, activation: 'tanh' }));
  model.add(tf.layers.dense({ units: 12, activation: 'tanh' }));
  model.add(tf.layers.dense({ units: 3, activation: 'tanh' }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
}

function trainModel() {
  console.log("TM CALLED")
    model.fit(xs, ys, {epochs: ep, callbacks: customCallback } )
}

function showData(d) {
  strokeWeight(10);
  stroke(200, 20, 50);
  for (let i = 0; i < d.length; i++) {
    let x = map(d[i].x, 0, 10, offset, width - offset);
    let y = map(d[i].y, -1, 1, height - offset, offset);
    point(x, y);
  }
}

function showPredictions() {
  stroke(0, 255, 0);
  noFill();
  strokeWeight(3);

  tf.tidy(() => {
    let inputs = tf.tensor2d(data.map(d => [d.x]));
    let preds = model.predict(inputs).dataSync();
    beginShape();

    for (let i = 0; i < data.length; i++) {
      let x = map(data[i].x, 0, 10, offset, width - offset);
      let y = map(preds[i], -1, 1, height - offset, offset);
      vertex(x, y);
    }
    endShape();

  });

}

let info_div = document.getElementById('info');
let data = [];
let canvas_size = 400;
let model;
let xs = [];
let ys = [];
let epoch = 20;

function preload() {
    loadTable('data.csv', 'csv', 'header', (table) => {
        for (let i of table.rows) {
            let x = map(i.arr[0], 400, 700, 0, canvas_size);
            let y = map(i.arr[1], 200, 500, 0, canvas_size);

            xs.push([x, y]);

            // Convert the label to one-hot encoding
            let label = [0, 0, 0];
            label[i.arr[2]] = 1;
            ys.push(label);

            data.push([x, y, i.arr[2]]);
        }

        // After loading data, create tensors
        xs = tf.tensor2d(xs);
        ys = tf.tensor2d(ys);

        // Set up and compile the model
        model = tf.sequential();
        model.add(tf.layers.dense({ units: 256, inputShape: [2], activation: 'relu' }));
        model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 128, activation: 'tanh' }));
        model.add(tf.layers.dense({ units: 128, activation: 'tanh' }));
        model.add(tf.layers.dense({ units: 128, activation: 'tanh' }));
        model.add(tf.layers.dense({ units: 128, activation: 'tanh' }));
        model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

        model.compile({
            loss: 'categoricalCrossentropy',
            optimizer: 'adam',
            metrics: ['accuracy']
        });
    });
}

function setup() {
    createCanvas(canvas_size, canvas_size);
    background(50);

    showData();

    // TRAIN MODEL
    model.fit(xs, ys, { epochs: epoch, callbacks: customCallback }).then(() => {
        background(50);
        showData();
        showPreds(grid_size = 2);
    });
}


const customCallback = {
    onEpochEnd: async (epoch, logs) => {
        info_div.innerHTML = "Loss : " + logs.loss + "<br>" + "Epoch : " + (epoch + 1)
        if (epoch % 10 == 0) update()

    }
};

function update() {
    background(50);
    showData();
    showPreds(70);
}


function showPreds(grid_size = 10) {
    let points = [];
    for (let x = 0; x < canvas_size; x += grid_size) {
        for (let y = 0; y < canvas_size; y += grid_size) {
            points.push([x, y]);
        }
    }

    let input = tf.tensor2d(points);
    let preds = model.predict(input);
    let predData = preds.arraySync();

    noStroke();
    for (let i = 0; i < points.length; i++) {
        let x = points[i][0];
        let y = points[i][1];
        let maxVal = Math.max(...predData[i]);
        let predictedClass = predData[i].indexOf(maxVal);

        if (predictedClass == 0) fill(255, 0, 0, 50);
        else if (predictedClass == 1) fill(0, 255, 0, 50);
        else if (predictedClass == 2) fill(0, 0, 255, 50);

        rect(x, y, grid_size, grid_size); // Draw a small square for each point
    }

    input.dispose();
    preds.dispose();
}


function showData() {
    strokeWeight(4);

    for (let i = 0; i < data.length; i++) {
        if (data[i][2] == 0) stroke(255, 0, 0);
        else if (data[i][2] == 1) stroke(0, 255, 0);
        else if (data[i][2] == 2) stroke(0, 0, 255);
        point(data[i][0], data[i][1]);
    }
}

let wave;
let seq = [];
let notes = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440];
let count = 0;
let play = false;
let s;
let pCount = 0;
let env;
//C A Bb C C C D E F F A Bb C C C D C Bb Bb A C F A G Bb E F
function setup() {
  env = new p5.Envelope();
  env.setADSR(0.5, 0.25, 0.5, 0.1);
  env.setRange(0.8, 0);

  wave = new p5.Oscillator();
  wave.setType('triangle');
  wave.amp(env);
  frameRate(3);
  noLoop();
  console.log("ready");
}

function draw() {

  if (seq.length != 0) {
    wave.freq(notes[seq[pCount]]);
    wave.start();
    env.play();


    if (pCount >= seq.length - 1)
      pCount = 0;
    else
      pCount++;
  }
}

function reset() {
  for (let i = 0; i < seq.length;)
    seq.pop();
  let out = document.getElementById("seq");
  out.innerHTML = "";
  noLoop();
}

function stopPlay() {
  wave.stop();
  noLoop();
}

function rec(obj) {

  let tem = (obj.innerHTML)
  let f;
  if (tem == 'C') f = 0;
  else if (tem == 'C#') f = 1;
  else if (tem == 'D') f = 2;
  else if (tem == 'D#') f = 3;
  else if (tem == 'E') f = 4;
  else if (tem == 'F') f = 5;
  else if (tem == 'F#') f = 6;
  else if (tem == 'G') f = 7;
  else if (tem == 'G#') f = 8;
  else if (tem == 'A') f = 9;

  seq.push(f);
  let out = document.getElementById("seq");

  if (count >= 20) {
    count = 0;
    out.innerHTML += tem + "<br>";
  } else {
    count++;
    out.innerHTML += tem;
  }

}
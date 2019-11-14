let myVoice = new p5.Speech(); // new P5.Speech object

// say hello:
myVoice.speak(input.value());


function speak() {
  let txt = document.getElementById("inp").value;
  let vol = document.getElementById("vol").value;
  let rate = document.getElementById("rate").value;
  let pitch = document.getElementById("pitch").value;
  let i = document.getElementById("int").checked;

  myVoice.setVolume(vol / 100.);
  myVoice.setRate(rate / 100.);
  myVoice.setPitch(pitch / 100.);

  myVoice.interrupt = i;
  myVoice.speak(txt); // debug printer for voice options
}
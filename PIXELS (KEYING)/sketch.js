var video
var red , green , blue;
var rangeUp , rangeDown , incIndex;
function setup(){
  createCanvas(600,500);
  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(600,500)
  createElement('p' , 'UPPER RANGE')
  rangeUp = createSlider(0,255,255,0.2)
  createElement('p' , 'LOWER RANGE')
  rangeDown = createSlider(0,255,255,0.2)
  createElement('p' , 'SEED')
  incIndex = createSlider(0,2,0,1)
}


function draw(){
  //background(0);
  video.loadPixels();
  loadPixels()
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x+y*width)*4;
        if (video.pixels[index+incIndex.value()] > rangeUp.value() && video.pixels[index+incIndex.value()] < rangeDown.value()) {
            pixels[index] = video.pixels[index];
            pixels[index+1] = video.pixels[index+1];
            pixels[index+2] = video.pixels[index+2];
            pixels[index+3] = 0;
        }

        else{
          pixels[index] = video.pixels[index];
          pixels[index+1] = video.pixels[index+1];
          pixels[index+2] = video.pixels[index+2];
          pixels[index+3] = video.pixels[index+3];
        }

    }
  }
  updatePixels();

}

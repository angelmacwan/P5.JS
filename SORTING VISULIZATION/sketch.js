let offset = 5
let offsetIncrement = 10;
let num = 80;  //array length
let bwid = 10;   //rect width
let x=0
let arr = [];
let artest[];
function setup(){
  createCanvas(810,400)
  background(0)
  frameRate(25)

//RANDOM NUMBERS
  for (let i = 0; i < num; i++) {
    arr[i] = random(10,400)
  }

  artest[] = arrayCopy(sort(arr))

  rectMode(CENTER)
  fill(153,225,153)

  for (let i = 0; i < arr.length; i++) {
    rect(offset , height / 2 , bwid , arr[i])
    offset += offsetIncrement
  }
}

function draw() {
  background(0)

  console.log("SORTING NOW");
  Sshort();
  for (let i = 0; i < arr.length; i++) {
    // rect(offset , height / 2 , 1.1 , arr[i])
    rect(offset , height / 2 , bwid , arr[i])
    offset += offsetIncrement
  }
  offset=0

}

function Sshort() {
  for(let l = 0 ; l<100 ; l++){
    if(arr[x] >= arr[x+1]){
      let temp = arr[x]
      arr[x] = arr[x+1]
      arr[x+1] = temp
      x=(-1)
    }
    x=x+1
  }
}

let particles = [];
let cnv;

function setup(){
    cnv = createCanvas(500,500)
    cnv.mouseMoved(drawPartcles)
    background(0)
}

function draw(){   
    background(0)
    
    if(particles.length > 0){
        for(let i in particles){
            if(particles[i].alpha > 0){
                particles[i].show()
                particles[i].update()
            }else{
                particles.splice(i,1)
            }
        }
    }
}


function drawPartcles(){
    if(frameCount % 5 == 0){
        particles.push(new Ripple(mouseX, mouseY))
    }
}


class Ripple {
    constructor(x, y) {
        this.radius = 0;
        this.alpha = 255;
        this.colR = random(0,255)
        this.colG = random(0,255)
        this.colB = random(0,255)

        this.show = () => {
            noFill();
            strokeWeight(2)
            stroke(this.colR, this.colG, this.colB, this.alpha);
            circle(x, y, this.radius);
        };
        this.update = () => {
            this.alpha-=2;
            this.radius += 0.8;
        };
    }
}
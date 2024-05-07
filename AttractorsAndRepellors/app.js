let num = 50
let particle = []


function attract(){
    for (let p of particle){
        p.attract(mouseX, mouseY)
    }
}

function setup(){
    createCanvas(500,500)
        
    for (let i = 0; i < num; i++){
        particle.push(new Particle())
    }
}

function draw(){
    background(20, 50)
    for (let p of particle){
        p.show()
        p.colide()
        p.update()
    }
    
    // mouse attractor
    if(mouseX>0 && mouseX<width && mouseY > 0 && mouseY < height){
        attract()
        stroke(0,200,0)
        strokeWeight(5)
        point(mouseX, mouseY)
    }

}
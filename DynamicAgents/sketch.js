let target = false
let r = 200
let agent
let para
let acc = []

function setup(){    
    createCanvas(500,500)
    background(255)

    target = createVector(5000,5000)
    agent = new Agent()

    para = document.querySelector("#distP");  

}

function draw(){
    background(120, 40)

    fill("#ebfff8")
    ellipse(target.x, target.y, r)
    fill("#c7ffeb")
    ellipse(target.x, target.y, r/2)
    fill("#8cffd5")
    ellipse(target.x, target.y, r/4)
    fill("#37fab2")
    ellipse(target.x, target.y, r/6)


    let distn = dist(target.x, target.y, agent.pos.x, agent.pos.y)

    agent.show()
    if(distn > 5){
        agent.createSensors()
        agent.activateSensors(createVector(target.x, target.y))
        
        if(frameCount % 30 == 0){
            if(agent.accuracy > 0) acc.push(agent.accuracy)
            para.innerHTML = `Distance = ${distn} <br />
                            Accuracy = ${agent.accuracy}`
        }
    }else{
        noLoop()
        displayChart(acc)
    }
    
}


class Agent  {
    constructor(){
        this.sensors = []
        this.r = 100
        this.pos = createVector(random(height), random(width))
        this.threshold = this.r + 50
        this.accuracy = 0
        this.numOfSensors = 20
    }

    createSensors(){
        this.sensors = []
        for (let i = 0; i < this.numOfSensors; i++){
            let rX = random(this.pos.x - this.r, this.pos.x + this.r)
            let rY = random(this.pos.y - this.r, this.pos.y + this.r)
            this.sensors.push(createVector(rX, rY))
        }
    }

    // t => TARGET
    activateSensors(t){
        let rewards = createVector(0,0)
        let n = 0
        
        for(let i of this.sensors){
            i.z = i.dist(t)
            if (i.z <= this.threshold){
                n += 1
                rewards.add(i)
            }
        }
        this.accuracy = map(n, 0, this.numOfSensors, 0, 1)
        if(n != 0){
            rewards.div(n)            
            t.sub(rewards)
            t.normalize()
            this.pos.add(t)
        }
    }

    show(){
        for(let i of this.sensors){
            fill("#9c2c00")
            noStroke()
            ellipse(i.x, i.y, 5)
        }
        
        fill("#faa537")
        ellipse(this.pos.x, this.pos.y, 20)
    }

}

function mouseClicked() {
    if( mouseX <= width &&
        mouseX >= 0 &&
        mouseY >= 0 &&
        mouseY < height){
            target.x = mouseX
            target.y = mouseY
    }
}


function displayChart(d){
    var ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: d,
            datasets: [{
                label: 'Accuracy',
                data: d,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
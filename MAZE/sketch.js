let maze
let population = []
let info = document.querySelector("#info")
let currGen = 1

// population size should be a multiple of 2
// so, pSize will be double what is entered here
let pSize = 50
pSize *= 2

function setup(){
    createCanvas(500,500)
    maze = new Maze(10);
    maze.init();
    population = generatePopulation()        
    // frameRate(15)
}


function generatePopulation(DNA=false){
    temp = []
    if(!DNA){
        for(let i = 0; i < pSize; i++){
            temp.push(new Agent(maze.getGrid()))
        }
    }else{
        for(let i = 0; i < pSize; i++){
            temp.push(new Agent(maze.getGrid(), DNA[i]))
        }
    }
    return temp
}

function geneticSelection(genes, mutate = true, mutationRate = 0.01){
    // noLoop()
    
    genes.sort(function(a, b){return a["dist"] - b["dist"]})

    let avgFitness = 0

    for (let i of genes){
        avgFitness += i["dist"]
    }
    avgFitness = avgFitness/genes.length
    avgFitness = map(avgFitness, 10,0, 1,0)
    info.innerHTML = `Average Fitness => ${avgFitness} <br>
                        Current Genetation => ${currGen}`
    
    // creating Gene pool for selection
    // DNA with smallest dist are at top
    genePool = []
    for(let g of genes) genePool.push(g["dna"])

    // dublicating DNA with better fitness more times
    // probabiluty of passing DNA with higher fitness will be more
    
    let temp = genePool
    genePool = []
    let count = temp.length
    for(let i = 0; i < temp.length; i++){
        for(let j = 0; j < count; j++)
            genePool.push(temp[i])
        count--
    }


    temp = genePool
    genePool  = []
    for(let i = 0; i < pSize; i++){
        genePool.push(random(temp))
    }

    
    // mutation
    if (mutate){
        for (let i = 0; i < genePool.length; i++){
            if(random() < mutationRate){
                for(let j = 0; j < genePool[i].length; j++){
                    if(random() < 0.2){
                        genePool[i][j] = random([0,1,2,3])
                    }
                }
            }
        }
    }

    population = []
    population = generatePopulation(genePool)
}

function draw(){

    maze.show();

    for(let p of population){
        p.show()
        p.update()
    }

    let dead = 0
    for(let p of population){
        if(!p.isAlive) dead++
    }

    if (dead == pSize){
        currGen++        
        // creating genepool
        let gp = []
        for (let p of population){
            let d = dist(p.pos[0], p.pos[1], 0, 9)
            gp.push({dna:p.dna, dist:d})            
        }
        
        // geneticSelection(population = array, mutate = trur or false, mutation rate = float)
        geneticSelection(gp, false, 0.5)
    }
       
}

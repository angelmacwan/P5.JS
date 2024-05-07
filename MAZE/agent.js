class Agent{
    constructor(maze, DNA=false){          
        this.grid = maze
        this.dna = []
        this.score = 0
        this.life = 30 // n steps, 1 step per frame
        this.age = 0
        this.isAlive = true

        this.pos = [0, this.grid.length-1]
        // pos[0] += 1 => right
        // pos[0] -= 1 => left
        // pos[1] -= 1 => up
        // pos[1] += 1 => down

        if(DNA){
            this.dna = DNA
        }else{
            for (let i = 0; i < this.life; i++) {
                // 0 => UP  1 => RIGHT  2 => DOWN  3 => LEFT
                this.dna.push(random([0,1,2,3]))            
            }
        }
    }

    show(){
        push()
        
        fill(200,50,20)        
        noStroke()
        let y = 50
        let x = 50
        let offset = 25

        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid.length; j++){
                if(i == this.pos[0] && j == this.pos[1]){
                    ellipse(i * x + offset, j * y + offset, 10)
                }
            }
        }

        pop()
    }

    update(){
        try {
            if(this.age < this.life){
                if(this.dna[this.age] == 0 && this.pos[1]-1 != 0 && this.grid[ this.pos[0] ][ this.pos[1] - 1 ] == 1){                                    
                        this.pos[1] -= 1
                } else if(this.dna[this.age] == 1 && this.pos[0]+1 < this.grid.length && this.grid[ this.pos[0] + 1 ][ this.pos[1] ] == 1){
                        this.pos[0] += 1
                } else if(this.dna[this.age] == 2 && this.pos[1]+1 < this.grid.length && this.grid[ this.pos[0] ][ this.pos[1] + 1 ] == 1){
                    this.pos[1] += 1
                } else if(this.dna[this.age] == 3 && this.pos[0]-1 != 0 && this.grid[ this.pos[0] - 1 ][ this.pos[1] ] == 1){
                    this.pos[0] -= 1
                }
                
                this.age++
            }else{
                this.isAlive = false
            }
        } catch (error) {
            this.age++            
        }
                   
    }
}
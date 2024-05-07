class Maze{
    constructor(sz){
        this.size = sz
        this.grid = []
    }

    init(){
        // Creating a random Matris of 0 and 1
        for(let i = 0; i < this.size; i++){
            let temp = []
            for(let j = 0; j < this.size; j++){
                temp.push(random([1,0,1,1]))           
                // temp.push(1)           
            }
            this.grid.push(temp)
        }

        // If there is no path, pls refresh the page
        // Create clearence so there is atleast one solution
        this.grid[this.size-1][0] = "E" //end
        this.grid[this.size-1][1] = 1
        this.grid[this.size-2][1] = 1
        this.grid[this.size-2][0] = 1

        this.grid[0][this.size-1] = "S" //start
        this.grid[0][this.size-2] = 1
        this.grid[1][this.size-2] = 1
        this.grid[1][this.size-1] = 1
    }

    show(){
        const cs = height / this.size
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(this.grid[i][j] == 1) fill(255,255,255, 255) //PATH
                else if(this.grid[i][j] == 0) fill(0) //WALL
                else if(this.grid[i][j] == "S") fill("#00ff00") //start
                else if(this.grid[i][j] == "E") fill("#0000ff") //end
                
                rect(i*cs, j*cs, cs, cs)
            }
        }
    }

    getGrid(){
        return this.grid
    }
    

}
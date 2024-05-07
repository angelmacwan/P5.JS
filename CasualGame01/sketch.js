let player;
let blocks = [];
let score = 0
function setup() {
	background(0);
	createCanvas(400,600);
	player = new Player();
	blocks.push(new Block);
}


function draw() {
	background(0);
	
	fill(255);
	textSize(20);
	text(`SCORE ${score}`, 10, 32);

	if( player.Alive ){

		player.show();
		player.update();
	
		for (let i in blocks) {
			if(blocks[i].pos.y > height){
				blocks.shift()
			}
			blocks[i].show();
			blocks[i].update();
			player.collide(blocks[i]);
		}
		
		if(frameCount % 10 == 0){
			score += 1
		}
	}else{
		fill(255);
		textSize(32);
		text('GAME OVER', 0, height/2);
	}

	if(frameCount % 90 == 0){
		blocks.push(new Block)
	}

}

function keyPressed() {
	// space = 32 => change dir
	if(keyCode  === 32){		
		player.changeDir();
	}
}
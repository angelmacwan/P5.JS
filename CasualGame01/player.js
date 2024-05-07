class Player {
	constructor() {

		this.pos = createVector(width / 2, height - 150);
		this.rad = 30;
		this.velocity = createVector(2, 0);
		this.acceleration = createVector(0.2, 0);
		this.Alive = true;
		
		this.show = () => {
			fill(255);
			circle(this.pos.x, this.pos.y, this.rad);
		};

		this.update = () => {
			if (this.pos.x > (width) - this.rad / 2) {
				this.pos.x = (width) - this.rad / 2;
				this.changeDir();
			}
			if (this.pos.x < this.rad / 2) {
				this.pos.x = this.rad / 2;
				this.changeDir();
			}

			this.pos.add(this.velocity);
			this.velocity.add(this.acceleration);
		};

		this.changeDir = () => {
			this.velocity.x = this.velocity.x > 0 ? -1 : 1;
			this.acceleration.x = -this.acceleration.x;
		};

		this.collide = (block) => {
			if (this.pos.x > block.pos.x &&
				this.pos.x < block.pos.x + block.width &&
				this.pos.y > block.pos.y &&
				this.pos.y < block.pos.y + block.height) {
				this.Alive = false;
			}
		};
	}
}
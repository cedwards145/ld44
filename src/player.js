import { getKeyDown, Keys } from "./input";
import { GameObject } from "./gameobject";

class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 16, 16);
        this.physicsObject = true;
        this.speed = 64;
    }

    update(deltaTime) {
        if (getKeyDown(Keys.D)) {
            this.x += this.speed * deltaTime;
        }
        else if (getKeyDown(Keys.A)) {
            this.x -= this.speed * deltaTime;
        }
        
        if (getKeyDown(Keys.W)) {
            this.velocity = -160;
        }

        super.update(deltaTime);

        console.log(this.x + ", " + this.y);
    }

    draw(context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { Player };
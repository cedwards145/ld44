import { getKeyDown, Keys } from "./input";
import { GameObject } from "./gameobject";

class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 16, 16);
        this.physicsObject = true;
    }

    update(deltaTime) {
        super.update(deltaTime);

        if (getKeyDown(Keys.D)) {
            this.x += this.speed * deltaTime;
        }
        else if (getKeyDown(Keys.A)) {
            this.x -= this.speed * deltaTime;
        }
    }

    draw(context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.x - this.halfWidth, this.y - this.halfHeight, this.width, this.height);
    }
}

export { Player };
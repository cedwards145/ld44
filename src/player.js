import { getKeyDown, Keys } from "./input";
import { Character } from "./character";
import { SpriteAnimation } from "./animation";

class Player extends Character {
    constructor(x, y) {
        super(x, y, 16, 32, 0);
        this.physicsObject = true;
        this.speed = 64;
        this.animation = new SpriteAnimation([0, 1, 2, 3]);
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
    }
}

export { Player };
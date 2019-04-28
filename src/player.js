import { getKeyDown, Keys } from "./input";
import { Character } from "./character";
import { SpriteAnimation } from "./animation";

class Player extends Character {
    constructor(x, y) {
        super(x, y, 16, 32, 0);
        this.physicsObject = true;
        this.speed = 80;
        this.runAnimation = new SpriteAnimation([0, 1, 2, 3, 4, 5]);
        this.idleAnimation = new SpriteAnimation([0]);
        this.blockAnimation = new SpriteAnimation([7]);
    }

    update(deltaTime) {
        if (getKeyDown(Keys.E)) {
            this.animation = this.blockAnimation;
        }
        else if (getKeyDown(Keys.D)) {
            this.x += this.speed * deltaTime;
            this.animation = this.runAnimation;
        }
        else if (getKeyDown(Keys.A)) {
            this.x -= this.speed * deltaTime;
            this.animation = this.runAnimation;
        }
        else {
            this.animation = this.idleAnimation;
        }
        
        if (getKeyDown(Keys.W)) {
            this.velocity = -160;
        }

        super.update(deltaTime);
    }
}

export { Player };
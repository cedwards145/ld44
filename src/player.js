import { getKeyDown, Keys } from "./input";
import { Character, States, Facing } from "./character";

class Player extends Character {
    constructor(x, y) {
        super(x, y, 16, 32, 0);
        this.speed = 80;
    }

    isDamaging() {
        // Not great, but only deal damage during one specific frame of animation
        return this.state === States.Attacking && this.spriteId === 12;
    }

    update(deltaTime) {
        this.block = false;
        this.attack = false;
        this.moveDirection = 0;

        if (getKeyDown(Keys.Shift)) {
            this.block = true;
        }
        else if (getKeyDown(Keys.Space)) {
            this.attack = true;
        }
        else if (getKeyDown(Keys.D)) {
            this.moveDirection = 1;
        }
        else if (getKeyDown(Keys.A)) {
            this.moveDirection = -1;
        }

        super.update(deltaTime);
    }
}

export { Player };
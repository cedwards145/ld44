import { Character } from "./character";
import { Player } from "./player";

const ENGAGE_RANGE = 128;
const ATTACK_RANGE = 24;

class Enemy extends Character {
    constructor(x, y) {
        super(x, y, 16, 32, 0);
        this.player = Player.instance;
    }

    update(deltaTime) {
        this.block = false;
        this.attack = false;
        this.moveDirection = 0;

        var deltaX = this.player.x - this.x;
        var distance = Math.abs(deltaX);

        if (distance <= ATTACK_RANGE) {
            this.attack = true;
        }
        else if (distance < ENGAGE_RANGE) {
            this.moveDirection = deltaX;
        }

        super.update(deltaTime);
    }
}

export { Enemy };
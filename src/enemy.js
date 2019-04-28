import { Character, States } from "./character";
import { Player } from "./player";
import { SpriteAnimation } from "./animation";

const ENGAGE_RANGE = 128;
const ATTACK_RANGE = 24;

class Enemy extends Character {
    constructor(x, y) {
        super(x, y, 16, 32, 0);
        this.player = Player.instance;
        this.isEnemy = true;

        var myself = this;
        this.attackAnimation = new SpriteAnimation([10, 11, 11, 12, 13], false, function() {
            myself.state = States.Idle;
        });
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
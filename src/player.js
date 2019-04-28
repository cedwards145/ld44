import { getKeyDown, Keys } from "./input";
import { Character, States } from "./character";
import { SpriteAnimation } from "./animation";

class Player extends Character {
    constructor(x, y) {
        super(x, y, 16, 32, 0);
        this.speed = 80;
        this.runAnimation = new SpriteAnimation([0, 1, 2, 3, 4, 5]);
        this.idleAnimation = new SpriteAnimation([0]);
        this.blockAnimation = new SpriteAnimation([7]);

        var myself = this;
        this.attackAnimation = new SpriteAnimation([10, 11, 12, 13], false, function() {
            myself.state = States.Idle;
        });
    }

    isDamaging() {
        // Not great, but only deal damage during one specific frame of animation
        return this.state === States.Attacking && this.spriteId === 12;
    }

    update(deltaTime) {
        if (this.state !== States.Attacking) {
            if (getKeyDown(Keys.Shift)) {
                this.animation = this.blockAnimation;
                this.state = States.Blocking;
            }
            else if (getKeyDown(Keys.Space)) {
                this.animation = this.attackAnimation;
                this.state = States.Attacking
                this.attackAnimation.restart();
            }
            else if (getKeyDown(Keys.D)) {
                this.x += this.speed * deltaTime;
                this.animation = this.runAnimation;
                this.state = States.Moving;
            }
            else if (getKeyDown(Keys.A)) {
                this.x -= this.speed * deltaTime;
                this.animation = this.runAnimation;
                this.state = States.Moving;
            }
            else {
                this.animation = this.idleAnimation;
                this.state = States.Idle;
            }
            
            if (getKeyDown(Keys.W)) {
                this.velocity = -160;
            }
        }

        if (this.state === States.Moving && this.oldState !== States.Moving) {
            this.runAnimation.restart();
        }

        super.update(deltaTime);
    }
}

export { Player };
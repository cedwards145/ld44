import { getKeyDown, Keys } from "./input";
import { Character } from "./character";
import { SpriteAnimation } from "./animation";

const States = {
    "Idle": 0,
    "Attacking": 1,
    "Blocking": 2,
    "Moving": 3
};

class Player extends Character {
    constructor(x, y) {
        super(x, y, 16, 32, 0);
        this.physicsObject = true;
        this.speed = 80;
        this.runAnimation = new SpriteAnimation([0, 1, 2, 3, 4, 5]);
        this.idleAnimation = new SpriteAnimation([0]);
        this.blockAnimation = new SpriteAnimation([7]);

        var myself = this;
        this.attackAnimation = new SpriteAnimation([10, 11, 12, 13], false, function() {
            myself.state = States.Idle;
        });

        this.state = States.Idle;
        this.oldState = this.state;
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

        this.oldState = this.state;

        super.update(deltaTime);
    }
}

export { Player };
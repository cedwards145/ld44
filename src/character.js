import { GameObject } from "./gameobject";
import { getResource } from "./resources";

const SPRITES_PER_ROW = 5;
const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 32;

const States = {
    "Idle": 0,
    "Attacking": 1,
    "Blocking": 2,
    "Moving": 3
};


class Character extends GameObject {
    constructor(x, y, width, height, spriteId) {
        super(x, y, width, height);
        this.setSpriteId(spriteId);
        this.spriteSheet = getResource("img/sprites.png");
        this.animation = null;
        this.physicsObject = true;
        this.weapon = new GameObject(x, y, 16, height);

        this.state = States.Idle;
        this.oldState = this.state;

        this.alive = true;
    }

    setSpriteId(id) {
        this.spriteId = id;
        this.spriteX = (id % SPRITES_PER_ROW) * SPRITE_WIDTH;
        this.spriteY = Math.floor(id / SPRITES_PER_ROW) * SPRITE_HEIGHT;
    }

    update(deltaTime) {
        if (!this.alive) {
            return;
        }

        if (this.animation) {
            this.animation.update(deltaTime);
            this.setSpriteId(this.animation.getCurrentFrame());
        }

        this.weapon.x = this.x + this.width;
        this.weapon.y = this.y;

        this.oldState = this.state;
    }

    isDamaging() {
        return false;
    }

    hit(other) {
        if (this.isDamaging() && other.alive) {
            console.log(this + " hits " + other);
            other.alive = false;
        }
    }

    collideWith(other, x, y) {
        if (!this.alive) {
            return;
        }

        // Run weapon hit check if other is also a character,
        // but don't run super collide method.
        // Prevents characters colliding with each other
        if (other instanceof Character) {
            if (this.weapon.intersects(other)) {
                this.hit(other);
            }
            return;
        }
        super.collideWith(other, x, y);
    }

    draw(context) {
        if (!this.alive) {
            return;
        }

        context.drawImage(this.spriteSheet, this.spriteX, this.spriteY, SPRITE_WIDTH, SPRITE_HEIGHT, 
                          this.x - (SPRITE_WIDTH / 2) + (this.width / 2), this.y, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
}

export { Character, States };
import { GameObject } from "./gameobject";
import { getResource } from "./resources";
import { SpriteAnimation } from "./animation";

const SPRITES_PER_ROW = 5;
const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 32;
const FLIP_INDEX_OFFSET = 20;

const States = {
    "Idle": 0,
    "Attacking": 1,
    "Blocking": 2,
    "Moving": 3,
    "Hurt": 4
};

const Facing = {
    "Right": 0,
    "Left": 1
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
        this.maxHealth = 10;
        this.currentHealth = this.maxHealth;

        this.facing = Facing.Right;

        // Animations
        this.runAnimation = new SpriteAnimation([0, 1, 2, 3, 4, 5]);
        this.idleAnimation = new SpriteAnimation([0]);
        this.blockAnimation = new SpriteAnimation([7]);
        
        var myself = this;

        this.hurtAnimation = new SpriteAnimation([8, 9, 8, 9], false, function() {
            myself.state = States.Idle;
        })

        this.attackAnimation = new SpriteAnimation([10, 11, 12, 13], false, function() {
            myself.state = States.Idle;
        });
    }

    isAlive() {
        return this.currentHealth > 0;
    }

    setSpriteId(id) {
        this.spriteId = id;
    }

    update(deltaTime) {
        if (!this.isAlive()) {
            return;
        }

        if (this.animation) {
            this.animation.update(deltaTime);
            this.setSpriteId(this.animation.getCurrentFrame());
        }

        if (this.facing === Facing.Right) {
            this.weapon.x = this.x + this.width;
        }
        else {
            this.weapon.x = this.x - this.weapon.width;
        }
        this.weapon.y = this.y;

        if (this.state === States.Idle) {
            this.animation = this.idleAnimation;
        }

        this.oldState = this.state;
    }

    isDamaging() {
        return false;
    }

    hit(other) {
        if (this.isDamaging() && other.isAlive()) {
            console.log(this + " hits " + other);
            other.hurt();
        }
    }

    hurt() {
        if (this.state !== States.Hurt) {
            this.currentHealth -= 4;
            this.animation = this.hurtAnimation;
            this.animation.restart();
            this.state = States.Hurt;
        }
    }

    collideWith(other, x, y) {
        if (!this.isAlive()) {
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
        if (!this.isAlive()) {
            return;
        }
        
        var id = this.spriteId;
        if (this.facing === Facing.Left) {
            id += FLIP_INDEX_OFFSET;
        }

        var spriteX = (id % SPRITES_PER_ROW) * SPRITE_WIDTH;
        var spriteY = Math.floor(id / SPRITES_PER_ROW) * SPRITE_HEIGHT;

        context.drawImage(this.spriteSheet, spriteX, spriteY, SPRITE_WIDTH, SPRITE_HEIGHT, 
                          this.x - (SPRITE_WIDTH / 2) + (this.width / 2), this.y, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
}

export { Character, States, Facing };
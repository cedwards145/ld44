import { GameObject } from "./gameobject";
import { getResource } from "./resources";

const SPRITES_PER_ROW = 5;
const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 32;

class Character extends GameObject {
    constructor(x, y, width, height, spriteId) {
        super(x, y, width, height);
        this.setSpriteId(spriteId);
        this.spriteSheet = getResource("img/sprites.png");
        this.animation = null;
    }

    setSpriteId(id) {
        this.spriteId = id;
        this.spriteX = (id % SPRITES_PER_ROW) * SPRITE_WIDTH;
        this.spriteY = Math.floor(id / SPRITES_PER_ROW) * SPRITE_HEIGHT;
    }

    update(deltaTime) {
        if (this.animation) {
            this.animation.update(deltaTime);
            this.setSpriteId(this.animation.getCurrentFrame());
        }
    }

    draw(context) {
        context.drawImage(this.spriteSheet, this.spriteX, this.spriteY, SPRITE_WIDTH, SPRITE_HEIGHT, 
                          Math.floor(this.x - (SPRITE_WIDTH / 2) + (this.width / 2)), Math.floor(this.y), SPRITE_WIDTH, SPRITE_HEIGHT);
    }
}

export { Character };
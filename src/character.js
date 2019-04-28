import { GameObject } from "./gameobject";

class Character extends GameObject {
    constructor(x, y, width, height, spriteId) {
        super(x, y, width, height);
        this.spriteId = spriteId;
    }
}

export { Character };
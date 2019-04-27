import { GameObject } from "./gameobject";

class Block extends GameObject {
    constructor(x, y) {
        super(x, y, 64, 64);
    }

    draw(context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { Block }
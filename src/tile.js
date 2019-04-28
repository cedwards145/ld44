import { GameObject } from "./gameobject";
import { getResource } from "./resources";

const TILES_PER_ROW = 16;

class Tile extends GameObject {
    constructor(x, y, id) {
        super(x, y, 16, 16);

        // Tiled IDs are 1 based, convert to 0 based to make indexing easier
        this.id = id - 1;

        this.tileX = this.id % TILES_PER_ROW;
        this.tileY = Math.floor(this.id / TILES_PER_ROW);
        this.tileset = getResource("img/tileset.png");
    }

    draw(context) {
        context.drawImage(this.tileset, this.tileX * 16, this.tileY * 16, 16, 16, this.x, this.y, 16, 16);
    }
}

export { Tile };
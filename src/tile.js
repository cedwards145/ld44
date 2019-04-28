import { GameObject } from "./gameobject";
import { getResource } from "./resources";

const TILES_PER_ROW = 16;

// IDs of wall tiles that should be marked as collidable
const SOLID_IDS = [1, 2, 3, 4, 5, 17, 19, 20, 21, 33, 35, 50];

class Tile extends GameObject {
    constructor(x, y, id) {
        super(x, y, 16, 16);

        // Tiled IDs are 1 based, convert to 0 based to make indexing easier
        this.id = id - 1;

        // If this tile is a solid tile, mark the game object to match
        this.solid = (SOLID_IDS.indexOf(this.id) > 0);

        this.tileX = this.id % TILES_PER_ROW;
        this.tileY = Math.floor(this.id / TILES_PER_ROW);
        this.tileset = getResource("img/tileset.png");
    }

    draw(context) {
        context.drawImage(this.tileset, this.tileX * 16, this.tileY * 16, 16, 16, this.x, this.y, 16, 16);
    }
}

export { Tile };
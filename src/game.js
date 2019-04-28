import { Player } from "./player";
import { Tile } from "./tile";
import map from "../maps/testmap.json";

class Game {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        
        canvas.width = width;
        canvas.height = height;

        this.context = canvas.getContext("2d");

        this.gameObjects = [];

        var player = new Player(300, 200);
        this.gameObjects.push(player);

        for (var i = 0; i < map.layers.length; i++) {
            var layer = map.layers[i];
            for (var j = 0; j < layer.data.length; j++) {
                var tileId = layer.data[j];
                var x = (j % layer.width) * 16;
                var y = Math.floor(j / layer.width) * 16;
                var tile = new Tile(x, y, tileId);
                this.gameObjects.push(tile);
            }
        }
    }
    
    update(deltaTime) {
        // Update input, AI, game logic
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(deltaTime);
        }
        // Resolve horizontal collisions (no vertical collisions without physics)
        this.resolveCollisions(1, 0);
        
        // Update physics
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].updatePhysics(deltaTime);
        }
        // Resolve vertical collisions caused by physics step
        this.resolveCollisions(0, 1);
    }

    resolveCollisions(x, y) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            for (var j = 0; j < this.gameObjects.length; j++) {
                if (i === j) {
                    continue;
                }

                this.gameObjects[i].collideWith(this.gameObjects[j], x, y);
            }
        }
    }

    draw() {
        this.context.fillStyle = "#6495ED";
        this.context.fillRect(0, 0, this.width, this.height);

        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.context);
        }
    }
}

export { Game };
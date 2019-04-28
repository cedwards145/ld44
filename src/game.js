import { Player } from "./player";
import { Tile } from "./tile";
import map from "../maps/testmap.json";
import { Character } from "./character";

class Game {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        
        canvas.width = width;
        canvas.height = height;

        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;

        this.gameObjects = [];
        
        var enemy = new Character(200, 190, 16, 32, 0);
        this.gameObjects.push(enemy);

        enemy = new Character(260, 190, 16, 32, 0);
        this.gameObjects.push(enemy);

        enemy = new Character(300, 190, 16, 32, 0);
        this.gameObjects.push(enemy);

        enemy = new Character(330, 190, 16, 32, 0);
        this.gameObjects.push(enemy);
        
        for (var i = 0; i < map.layers.length; i++) {
            var layer = map.layers[i];
            for (var j = 0; j < layer.data.length; j++) {
                var tileId = layer.data[j];
                // Skip blank tiles
                if (tileId === 0) {
                    continue;
                }
                
                var x = (j % layer.width) * 16;
                var y = Math.floor(j / layer.width) * 16;
                var tile = new Tile(x, y, tileId);
                this.gameObjects.push(tile);
            }
        }

        this.player = new Player(18, 190);
        this.gameObjects.push(this.player);
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
            // Don't bother with second loop if the first game object isn't a physics object
            var firstGameObject = this.gameObjects[i];
            if (!firstGameObject.physicsObject) {
                continue;
            }

            for (var j = 0; j < this.gameObjects.length; j++) {
                if (i === j) {
                    continue;
                }

                firstGameObject.collideWith(this.gameObjects[j], x, y);
            }
        }
    }

    draw() {
        this.context.fillStyle = "#372C53";
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.scale(2, 2);
        this.context.translate(-(this.player.x - (this.width / 4)), 0);

        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.context);
        }

        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export { Game };
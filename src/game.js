import { Player } from "./player";
import { Block } from "./block";

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

        var block = new Block(256, 320);
        this.gameObjects.push(block);

        block = new Block(320, 320);
        this.gameObjects.push(block);

        block = new Block(320, 256);
        this.gameObjects.push(block);

        block = new Block(448, 256);
        this.gameObjects.push(block);
    }
    
    update(deltaTime) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(deltaTime);
        }

        for (var i = 0; i < this.gameObjects.length; i++) {
            for (var j = 0; j < this.gameObjects.length; j++) {
                if (i === j) {
                    continue;
                }

                this.gameObjects[i].collideWith(this.gameObjects[j]);
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
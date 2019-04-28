import { Game } from "./game";
import * as Input from "./input";
import * as Resources from "./resources";

"use strict";

// Main entry point
function run() {
    // Set up input handling
    document.addEventListener('keydown', Input.handleKeyDown, false);
    document.addEventListener('keyup', Input.handleKeyUp, false);

    var canvas = document.getElementById("canvas");
    var game = new Game(640, 480, canvas);
    var lastTimeStamp = 0;

    function main(currentTime) {
        window.requestAnimationFrame(main);
        var deltaTime = (currentTime - lastTimeStamp) / 1000;
        if (isNaN(deltaTime)) {
            deltaTime = 0;
        }

        game.update(deltaTime);
        game.draw();

        lastTimeStamp = currentTime;
    }

    main();
}

const resources = [
    "img/tileset.png",
    "img/sprites.png"
];

Resources.loadResource(resources, run);
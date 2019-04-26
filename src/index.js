import { Game } from "./game";

"use strict";

// Main entry point
(function () {
    var canvas = document.getElementById("canvas");
    var game = new Game(640, 480, canvas);
    var lastTimeStamp = 0;

    function main(currentTime) {
        window.requestAnimationFrame(main);
        var deltaTime = (currentTime - lastTimeStamp) / 1000;

        game.update(deltaTime);
        game.draw();

        lastTimeStamp = currentTime;
    }

    main();
}());
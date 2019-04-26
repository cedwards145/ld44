import { Game } from "./game";

"use strict";

// Main entry point
(function () {
    var game = new Game();
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
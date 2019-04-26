"use strict";

// Main entry point
(function () {
    var lastTimeStamp = 0;
    function main(currentTime) {
        window.requestAnimationFrame(main);

        var deltaTime = (currentTime - lastTimeStamp) / 1000;

        console.log("Elapsed (s): " + deltaTime);
        //update(tFrame);
        //render();
        lastTimeStamp = currentTime;
    }

    main();
}());
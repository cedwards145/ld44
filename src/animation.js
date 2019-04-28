const SECONDS_PER_FRAME = 0.25;

class SpriteAnimation {
    constructor(frames, loop=true, callback=undefined) {
        this.frames = frames;
        this.index = 0;
        this.elapsedTime = 0;
        this.loop = loop;
        this.callback = callback;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
        while (this.elapsedTime >= SECONDS_PER_FRAME) {
            this.index++;
            
            if (this.index >= this.frames.length) {
                if (this.loop) {
                    this.index = 0;
                }
                else {
                    this.index = this.frames.length - 1;
                    this.callback();
                }
            }

            this.elapsedTime -= SECONDS_PER_FRAME;
        }
    }

    getCurrentFrame() {
        return this.frames[this.index];
    }

    restart() {
        this.elapsedTime = 0;
        this.index = 0;
    }
}

export { SpriteAnimation };
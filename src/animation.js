const SECONDS_PER_FRAME = 0.25;

class SpriteAnimation {
    constructor(frames) {
        this.frames = frames;
        this.index = 0;
        this.elapsedTime = 0;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
        while (this.elapsedTime >= SECONDS_PER_FRAME) {
            this.index = (this.index + 1) % this.frames.length;
            this.elapsedTime -= SECONDS_PER_FRAME;
        }
    }

    getCurrentFrame() {
        return this.frames[this.index];
    }
}

export { SpriteAnimation };
class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        // Physics Init
        this.physicsObject = false;
        this.velocity = 0
    }

    update(deltaTime) {
        if (this.physicsObject) {
            this.physics(deltaTime);
        }
    }

    physics(deltaTime) {
        this.velocity += 160 * deltaTime;
        this.y += this.velocity * deltaTime;
    }

    draw(context) { }
}

export { GameObject };
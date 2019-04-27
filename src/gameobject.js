import { Rectangle } from "./rectangle";

class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Physics Init
        this.physicsObject = false;
        this.velocity = 0

        this.collisionRect = new Rectangle(this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        if (this.physicsObject) {
            this.physics(deltaTime);
        }

        // Keep collision rectangle in sync with object
        this.collisionRect.x = this.x;
        this.collisionRect.y = this.y;
        this.collisionRect.width = this.width;
        this.collisionRect.height = this.height;
    }

    collideWith(other) {
        if (!this.physicsObject) {
            return;
        }

        if (this.collisionRect.intersects(other.collisionRect)) {
            // Hack, come back and fix this!
            this.y = other.y - this.height;
            this.velocity = 0;
        }
    }

    physics(deltaTime) {
        this.velocity += 320 * deltaTime;
        this.y += this.velocity * deltaTime;
    }

    draw(context) { }
}

export { GameObject };
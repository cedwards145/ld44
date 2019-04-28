import { Rectangle } from "./rectangle";

class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Physics Init
        this.physicsObject = false;
        this.velocity = 0;
        // Indicates whether object should be collidable
        this.solid = true;

        this.collisionRect = new Rectangle(this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        // Keep collision rectangle in sync with object
        this.updateCollisionRect();
    }

    updateCollisionRect() {
        this.collisionRect.x = this.x;
        this.collisionRect.y = this.y;
        this.collisionRect.width = this.width;
        this.collisionRect.height = this.height;
    }

    collideWith(other, x, y) {
        if (!this.physicsObject || !other.solid) {
            return;
        }

        // Awful collision resolution
        if (this.collisionRect.intersects(other.collisionRect)) {
            // Horizontal resolution
            if (x > 0) {
                if (this.collisionRect.x <= other.collisionRect.x + other.collisionRect.width && 
                    this.collisionRect.x > other.collisionRect.x) {
                    // This on Right side of other
                    this.x = other.collisionRect.x + other.collisionRect.width;
                }
                else if (this.collisionRect.x + this.collisionRect.width >= other.x &&
                         this.collisionRect.x + this.collisionRect.width < other.collisionRect.x + other.collisionRect.width) {
                    // This on Left side of other
                    this.x = other.collisionRect.x - this.width;
                }
            }
            // Vertical resolution
            else if (y > 0) {
                
                if (this.collisionRect.y + this.collisionRect.height >= other.collisionRect.y &&
                    this.collisionRect.y + this.collisionRect.height < other.collisionRect.y + other.collisionRect.height) {
                    // This above other
                    this.y = other.collisionRect.y - this.height;
                }
                else if (this.collisionRect.y <= other.collisionRect.y + other.collisionRect.height &&
                    this.collisionRect.y > other.collisionRect.y) {
                    // This below other
                    this.y = other.collisionRect.y + other.collisionRect.height;
                }
                
                this.velocity = 0;
            }

            this.updateCollisionRect();
        }
    }

    updatePhysics(deltaTime) {
        if (!this.physicsObject) {
            return;
        }

        this.velocity += 320 * deltaTime;
        this.y += this.velocity * deltaTime;

        this.updateCollisionRect();
    }

    draw(context) { }
}

export { GameObject };
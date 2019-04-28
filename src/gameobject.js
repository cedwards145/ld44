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
    }

    update(deltaTime) {
    }

    intersects(other) {
        var r = !(other.x >= this.x + this.width ||
                 other.x + other.width <= this.x ||
                 other.y >= this.y + this.height ||
                 other.y + other.height <= this.y);
        return r;
    }

    collideWith(other, x, y) {
        if (!this.physicsObject || !other.solid) {
            return;
        }

        // Hack to make collisions less costly. Only check for collisions with 
        // very near objects (within 4 tiles up or down)
        if (Math.abs(this.x - other.x) > 64 ||
            Math.abs(this.y - other.y) > 64) {
                return;
        }

        // Awful collision resolution
        if (this.intersects(other)) {
            // Horizontal resolution
            if (x > 0) {
                if (this.x <= other.x + other.width && 
                    this.x > other.x) {
                    // This on Right side of other
                    this.x = other.x + other.width;
                }
                else if (this.x + this.width >= other.x &&
                         this.x + this.width < other.x + other.width) {
                    // This on Left side of other
                    this.x = other.x - this.width;
                }
            }
            // Vertical resolution
            else if (y > 0) {
                
                if (this.y + this.height >= other.y &&
                    this.y + this.height < other.y + other.height) {
                    // This above other
                    this.y = other.y - this.height;
                }
                else if (this.y <= other.y + other.height &&
                    this.y > other.y) {
                    // This below other
                    this.y = other.y + other.height;
                }
                
                this.velocity = 0;
            }
        }
    }

    updatePhysics(deltaTime) {
        if (!this.physicsObject) {
            return;
        }

        this.velocity += 320 * deltaTime;
        this.y += this.velocity * deltaTime;
    }

    draw(context) { }
}

export { GameObject };
class Game {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        
        canvas.width = width;
        canvas.height = height;

        this.context = canvas.getContext("2d");
    }
    
    update(deltaTime) {

    }

    draw() {
        this.context.fillStyle = "#6495ED";
        this.context.fillRect(0, 0, this.width, this.height);
    }
}

export { Game };
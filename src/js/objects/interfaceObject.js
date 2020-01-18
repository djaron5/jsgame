export class InterfaceObject {
    x;
    y;
    speedX;
    speedY;
    width;
    height;
    animation;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    stepX() {
        this.x += this.speedX;
    }

    stepY() {
        this.y += this.speedY;
    }


    changeAnimation(time) {
        this.animation.update(time);
    }

    getActiveImage() {
        return this.animation.activeImage;
    }
}
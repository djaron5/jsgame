export class AnimationController {
    activeImage;
    moveImages;
    attackImages;
    moveSpeed;
    attackSpeed;
    lastTime;
    running;
    useAttack;
    moveBack;


    constructor(moveImages, attackImages, moveSpeed, attackSpeed) {

        this.activeImage = moveImages[0];

        this.moveImages = moveImages;
        this.attackImages = attackImages;
        this.moveSpeed = moveSpeed;
        this.attackSpeed = attackSpeed;
        this.lastTime = 0;
        this.useAttack = false;
    }

    run() {
        this.activeImage = this.moveImages[0];
        this.running = true;
    }

    stop() {
        this.running = false;
    }

    nextAnimation() {
        if (this.useAttack) {
            let activeIndex = this.moveImages.indexOf(this.activeImage) || -1;
            if (activeIndex === this.attackImages -1) {
                this.useAttack = false;
                this.activeImage = this.moveImages[0];
                return;
            }
            this.activeImage = this.attackImages[++activeIndex];
        } else {
            if (this.moveImages.length < 2) return;
            let activeIndex = this.moveImages.indexOf(this.activeImage);
            if (activeIndex === this.moveImages.length - 1) {
                this.moveBack = true;
            } else if (activeIndex === 0) {
                this.moveBack = false;
            }

            if (this.moveBack) {
                this.activeImage = this.moveImages[--activeIndex];
            } else {
                this.activeImage = this.moveImages[++activeIndex];
            }
        }
    }

    update(time) {

        if (!this.running) {
            return;
        }
        if (this.lastTime === 0) {
            this.lastTime = time;
        }
        if (this.useAttack) {
            if ((time - this.lastTime) > this.attackSpeed) {
                this.nextAnimation();
                this.lastTime = time;
            }
        } else {
            if ((time - this.lastTime) > this.moveSpeed) {

                this.nextAnimation();
                this.lastTime = time;
            }
        }
    }
}
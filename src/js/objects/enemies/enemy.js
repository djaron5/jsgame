import {InterfaceObject} from "../interfaceObject.js";

export class Enemy extends InterfaceObject {
    heroToLeft;
    heroToRight;
    heroToTop;
    heroToButtom;
    canMeleeAttack;
    speedVectorX;
    speedVectorY;
    healthPotion;
    manaPotion;
    hero;
    score = 10;
    meleeRange;
    level;


    constructor(x, y, width, height, speedVectorX, speedVectorY, level) {
        super(x, y, width, height);
        this.speedVectorX = speedVectorX;
        this.speedVectorY = speedVectorY;
        this.level = level;
        this.hero = this.level.hero;
        // this.meleeRange = (this.width/2) + (this.hero.width/2);
        this.meleeRange = this.width/3;

    }

    walk(time) {
        let inMove;

        if (this.heroToTop) {
            this.speedY = -this.speedVectorY;
            this.stepY();
            inMove = true;
        }

        if (this.heroToButtom) {
            this.speedY = this.speedVectorY;
            this.stepY();
            inMove = true;
        }

        if (this.heroToLeft) {
            this.speedX = -this.speedVectorX;
            this.stepX();
            inMove = true;
        }

        if (this.heroToRight) {
            this.speedX = this.speedVectorX;
            this.stepX();
            inMove = true;
        }

        if (!inMove) {
            this.animation.stop();
        }

        if (inMove && !this.animation.running) {
            this.animation.run();
        }

    }

    checkHeroPosition() {
        let heroMiddleX = (this.hero.x + this.hero.width) / 2;
        let heroMiddleY = (this.hero.y + this.hero.height) / 2;
        let enemyMiddleX = (this.x + this.width) / 2;
        let enemyMiddleY = (this.y + this.height) / 2;

        this.heroToLeft = heroMiddleX < enemyMiddleX;

        this.heroToRight = heroMiddleX > enemyMiddleX;

        this.heroToTop = heroMiddleY < enemyMiddleY;

        this.heroToButtom = heroMiddleY > enemyMiddleY;

    }
}
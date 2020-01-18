import {InterfaceObject} from "../interfaceObject.js";
import {AnimationController} from "../../animationController.js";

export class Fireball extends InterfaceObject {
    speedX;
    speedY;
    cooldown = 500;
    damage = 10;
    manaconst = 2;
    level;

    constructor(x, y, width, height, speedX = 0, speedY = 0, level) {
        super(x, y, width, height);
        let moveImages = ['fireball1', 'fireball2'];
        this.animation = new AnimationController(moveImages, [], 150, 0);
        this.animation.run();
        this.speedX = speedX;
        this.speedY = speedY;
        this.level = level;
    }

    update(time) {
        this.checkEnemyCollision();
        this.walk(time);
        this.changeAnimation(time);
        this.checkFinishSkill();
    }

    walk(time) {
        this.stepX();
        this.stepY();
    }

    checkEnemyCollision() {
        let enemies = this.level.enemies;
        let collised = false;
        for (let enemy of enemies) {
            if ((this.x + this.width >= enemy.x) && (this.x <= enemy.x + enemy.width) &&
                (this.y + this.height >= enemy.y) && (this.y <= enemy.y + enemy.height)) {
                collised = true;
            }
            if (collised) {
                this.level.attackEnemy(this, enemy);
                return;
            }
        }
    }

    checkFinishSkill() {
        if (this.x >= this.level.game.screen.width) {
            this.level.removeSkill(this);
        }
    }
}
import {AnimationController} from "../../animationController.js";
import {InterfaceObject} from "../interfaceObject.js";
import {Fireball} from "./fireball.js";

export class TripleFireball extends InterfaceObject{
    speedX;
    speedY;
    cooldown = 1000;
    damage = 10;
    manaconst = 5;
    level;
    fireballs = [];

    constructor(x, y, width, height, speedX = 0, speedY = 0, level) {
        super(x, y, width, height);
        this.fireballs = [new Fireball(x, y - height, width, height, speedX, speedY, level),
            new Fireball(x, y, width, height, speedX, speedY, level),
            new Fireball(x, y + height, width, height, speedX, speedY, level)];
    }

    update(time) {
        this.fireballs.forEach(fireball => {
            fireball.update();
        });
        // this.checkEnemyCollision();
        // this.walk(time);
        // this.changeAnimation(time);
        // this.checkFinishSkill();
    }

    // walk(time) {
    //     this.stepX();
    //     this.stepY();
    // }
    //
    // checkEnemyCollision() {
    //     let enemies = this.level.enemies;
    //     let collised = false;
    //     for (let enemy of enemies) {
    //         if ((this.x + this.width >= enemy.x) && (this.x <= enemy.x + enemy.width) &&
    //             (this.y + this.height >= enemy.y) && (this.y <= enemy.y + enemy.height)) {
    //             collised = true;
    //         }
    //         if (collised) {
    //             this.level.attackEnemy(this, enemy);
    //             return;
    //         }
    //     }
    // }
    //
    // checkFinishSkill() {
    //     if (this.x >= this.level.game.screen.width) {
    //         this.level.removeSkill(this);
    //     }
    // }

}
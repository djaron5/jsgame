import {AnimationController} from "../../animationController.js";
import {Enemy} from "./enemy.js";
import {Melee} from "../skills/melee.js";

export class Bat extends Enemy {
    timeBeforeCanAttack = 0;
    lastAttack = 0;

    constructor(x, y, width, height, level) {
        super(x, y, width, height, 1, 1, level);
        this.healthPotion = 20;
        this.manaPotion = 100;
        let moveImages = ['bat1', 'bat2'];
        this.animation = new AnimationController(moveImages, [], 250, 0);
    }

    update(time) {
        this.checkHeroPosition();
        if (!this.tryAttack(time)) {
            this.walk(time);
        }
        this.changeAnimation(time);

    }

    tryAttack(time) {
        let heroMiddleX = (this.hero.x + this.hero.width) / 2;
        let heroMiddleY = (this.hero.y + this.hero.height) / 2;
        let enemyMiddleX = (this.x + this.width) / 2;
        let enemyMiddleY = (this.y + this.height) / 2;

        this.canMeleeAttack = Math.abs(heroMiddleX - enemyMiddleX) <= this.meleeRange && Math.abs(heroMiddleY - enemyMiddleY) <= this.meleeRange;


        if (this.canMeleeAttack) {
            if ((time - this.lastAttack) > this.timeBeforeCanAttack) {
                let melee = new Melee((this.x + this.width) / 2, (this.y + this.height) / 2,
                    this.width / 2 + this.meleeRange, this.height / 2 + this.meleeRange, this.level, this.meleeRange);
                this.timeBeforeCanAttack = melee.cooldown;
                this.level.addSkillObject(melee);
                this.lastAttack = time;
                // console.log(Math.abs(heroMiddleX - enemyMiddleX));
                // console.log(Math.abs(heroMiddleY - enemyMiddleY));
            }
        }
        return this.canMeleeAttack;
    }
}
import {InterfaceObject} from "./interfaceObject.js";
import {AnimationController} from "../animationController.js";
import {Fireball} from "./skills/fireball.js";
import {TripleFireball} from "./skills/tripleFireball.js";

export class Hero extends InterfaceObject {
    healthPotion;
    manaPotion;

    inMove = false;

    timeBeforeCanAttack = 0;
    lastAttack = 0;

    lastManaRegeneration = 0;
    manaRegenerationSpeed = 1500;

    canMoveLeft = true;
    canMoveRight = true;
    canMoveTop = true;
    canMoveButtom = true;

    constructor(x, y, width, height, level) {
        super(x, y, width, height);
        let moveImages = ['hero1', 'hero2'];
        this.animation = new AnimationController(moveImages, [], 250, 0);
        this.level = level;
        this.healthPotion = 100;
        this.manaPotion = 100;
    }

    update(time) {
        this.checkPositions();
        this.walk(time);
        this.changeAnimation(time);
        this.checkAttack(time);
        this.regeneration(time);
    }

    walk(time) {
        this.inMove = false;

        if (this.level.game.control.up) {
            this.speedY = -3;
            if (!((this.y + this.speedY) < this.level.gameZone.topRestriction) && this.canMoveTop) {
                this.stepY();
            }
            this.inMove = true;
        }
        if (this.level.game.control.down) {
            this.speedY = 3;
            if (!((this.y + this.speedY + this.height) > this.level.gameZone.buttomRestriction) && this.canMoveButtom) {

                this.stepY();
            }
            this.inMove = true;
        }
        if (this.level.game.control.left) {
            this.speedX = -2;
            if (!((this.x + this.speedX) < this.level.gameZone.lefRestriction) && this.canMoveLeft) {
                this.stepX();
            }
            this.inMove = true;
        }
        if (this.level.game.control.right) {
            this.speedX = 4;
            if (!((this.x + this.speedX + this.width) > this.level.gameZone.rightRestriction) && this.canMoveRight) {
                this.stepX();
            }
            this.inMove = true;
        }

        if (!this.inMove) {
            this.animation.stop();
        }

        if (this.inMove && !this.animation.running) {
            this.animation.run();
        }
    }

    checkAttack(time) {
        if (this.level.game.control.fire) {
            if ((time - this.lastAttack) > this.timeBeforeCanAttack) {
                let fireball = this.makeFireball();
                this.lastAttack = time;
                this.timeBeforeCanAttack = fireball.cooldown;
                this.level.addSkillObject(fireball);
            }
        }

        if (this.level.game.control.firstSkill) {
            if ((time - this.lastAttack) > this.timeBeforeCanAttack) {
                let tripleFireball = this.makeTripleFireball();
                this.lastAttack = time;
                this.timeBeforeCanAttack = tripleFireball.cooldown;
                tripleFireball.fireballs.forEach(fireball => {this.level.addSkillObject(fireball)});
                // this.level.addSkillObject(tripleFireball);
            }
        }

    }

    makeFireball() {
        let fireballMiddleX = this.x + this.width / 2;
        let fireballMiddleY = this.y + this.height / 2;

        let fireballSpeedX;
        let fireballSpeedY;

        if (this.inMove) {
            if (this.level.game.control.up) {
                fireballSpeedY = -6;
            }
            if (this.level.game.control.down) {
                fireballSpeedY = 6;
            }
            if (this.level.game.control.left) {
                fireballSpeedX = -6;
            }
            if (this.level.game.control.right) {
                fireballSpeedX = 6;
            }
        } else {
            fireballSpeedX = 6;
        }

        let fireball = new Fireball(fireballMiddleX, fireballMiddleY,
            this.width, this.height / 3,
            fireballSpeedX, fireballSpeedY, this.level);

        this.manaPotion -= fireball.manaconst;
        return fireball;
    }

    makeTripleFireball() {
        let fireball = this.makeFireball();
        let tripleFireball = new TripleFireball(fireball.x, fireball.y,
            fireball.width, fireball.height,
            fireball.speedX, fireball.speedY, this.level);
        return tripleFireball;
    }

    regeneration(time) {
        if ((time - this.lastManaRegeneration) >= this.manaRegenerationSpeed) {
            this.manaPotion++;
            this.lastManaRegeneration = time;
        }
    }

    checkPositions() {
        let canMoveLeft = true;
        let canMoveRight = true;
        let canMoveTop = true;
        let canMoveButtom = true;

        this.level.enemies.forEach(enemy => {
            if (canMoveLeft) {
                canMoveLeft = !(((this.x <= enemy.x + enemy.width) && (this.x >= enemy.x)) &&
                    ((enemy.y >= this.y) && (enemy.y <= this.y + this.height)));
            }

            if (canMoveRight) {
                canMoveRight = !(((this.x + this.width >= enemy.x) && (this.x + this.width <= enemy.x + enemy.width)) &&
                    ((enemy.y >= this.y) && (enemy.y <= this.y + this.height)));
            }

            if (canMoveTop) {
                canMoveTop = !((enemy.y <= this.y <= enemy.y + enemy.height) &&
                    ((this.x >= enemy.x && this.x <= (this.x + this.width)) || (this.x >= (enemy.x + enemy.width) && (enemy.x + enemy.width) <= this.x + this.width)));
                // console.log((this.x >= enemy.x && this.x <= (this.x + this.width)));
                // console.log((this.x >= (enemy.x + enemy.width) && (enemy.x + enemy.width) <= this.x + this.width));
                // console.log('------------')
                // console.log(this.x)
                // console.log(enemy.x)
                // console.log(this.x + this.width)
            }

            if (canMoveButtom) {
                canMoveButtom = !((enemy.y + enemy.height >= this.y + this.height >= enemy.y) &&
                    ((this.x >= enemy.x >= this.x + this.width) || (this.x <= enemy.x + enemy.width <= this.x + this.width)));
            }
        });


        this.canMoveLeft = canMoveLeft;
        this.canMoveRight = canMoveRight;
        this.canMoveTop = canMoveTop;
        this.canMoveButtom = canMoveButtom;
    }
}
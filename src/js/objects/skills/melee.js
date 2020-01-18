import {InterfaceObject} from "../interfaceObject.js";
import {AnimationController} from "../../animationController.js";

export class Melee extends InterfaceObject{
    speedX;
    speedY;
    cooldown = 1500;
    damage = 10;
    manaconst = 0;
    level;
    range;

    constructor(x, y, width, height, level, range, speedX = 0, speedY = 0,) {
        super(x, y, width, height);
        // let moveImages = ['fireball1'];
        // this.animation = new AnimationController(moveImages, [], 200, 0);
        // this.animation.run();
        this.speedX = speedX;
        this.speedY = speedY;
        this.level = level;
        this.range = range;
    }

    update(time) {
        this.checkHeroCollision();
        // this.walk(time);
        // this.changeAnimation(time);
        this.level.removeSkill(this);
    }

    checkHeroCollision() {
        let hero = this.level.hero;
        // let collised = false;
        //
        // if ((this.x + this.width >= hero.x) && (this.x <= hero.x + hero.width) &&
        //     (this.y + this.height >= hero.y) && (this.y <= hero.y + hero.height)) collised = true;
        // if (collised) {
            this.level.attackHero(this, hero);
        // }

    }
}
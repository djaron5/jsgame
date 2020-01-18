import {Enemy} from "./enemy.js";
import {AnimationController} from "../../animationController.js";

export class Plant extends Enemy{

    constructor(x, y, width, height, level) {
        super(x, y, width, height, 0.5, 0.5, level);
        this.healthPotion = 20;
        this.manaPotion = 100;
        let moveImages = ['plant1', 'plant2'];
        this.animation = new AnimationController(moveImages, [], 250, 0);
    }

    update(time) {
        this.checkHeroPosition();
        // this.tryAttack(time);
        this.walk(time);
        this.changeAnimation(time);
    }
}
import {Bat} from "./bat.js";
import {Plant} from "./plant.js";

export class EnemyCreator {
    lastTime;
    cooldown;
    level;

    constructor(level) {
        this.level = level;
    }

    createEnemy(time) {
        if ((time - this.lastTime) <= this.cooldown) return;
        let screen = this.level.game.screen;
        let gameZone = this.level.gameZone;

        let enemy;

        if (randomInteger(0, 1) === 0) {
            enemy = new Bat(screen.width,
                randomInteger(gameZone.topRestriction, gameZone.buttomRestriction - gameZone.topRestriction),
                screen.width / 12, screen.height / 8, this.level);
        } else {
            enemy = new Plant(screen.width,
                randomInteger(gameZone.topRestriction, gameZone.buttomRestriction - gameZone.topRestriction),
                screen.width / 12, screen.height / 6, this.level);
        }


        this.lastTime = time;
        this.cooldown = 3000;

        return enemy;

        function randomInteger(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
    }
}
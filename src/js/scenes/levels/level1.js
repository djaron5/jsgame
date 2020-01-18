import {Scene} from "../../scene.js";
import {Hero} from "../../objects/hero.js";
import {GameZone} from "../gameZone.js";
import {Castle} from "../../objects/castle.js";
import {Bat} from "../../objects/enemies/bat.js";
import {EnemyCreator} from "../../objects/enemies/enemyCreator.js";
import {Gamer} from "../../objects/Gamer.js";

export class Level1 extends Scene {
    hero;
    gameZone;
    castle;
    enemies = [];
    skills = [];
    enemyCreator;
    enemyCounter = 4;

    constructor(game) {
        super(game);
        Gamer.levelScore = 0;
        // window.localStorage.removeItem('totalScore');
        let totalScore = parseInt(window.localStorage.getItem('totalScore'));
        if (totalScore) Gamer.totalScore = totalScore;

        this.hero = new Hero(this.game.screen.width / 8, this.game.screen.height / 12,
            this.game.screen.width / 9, this.game.screen.height / 6, this);
        this.gameZone = new GameZone(this.game.screen.width / 12,
            this.game.screen.width / 12 * 11,
            this.game.screen.height / 12,
            this.game.screen.height / 12 * 11);
        this.castle = new Castle(0, 0 + this.gameZone.topRestriction,
            this.game.screen.width / 13,
            this.gameZone.buttomRestriction  - this.gameZone.topRestriction, this);
        this.enemies = [new Bat(this.game.screen.width, this.game.screen.height / 2,
            this.game.screen.width / 12, this.game.screen.height / 8, this)];
        this.enemyCreator = new EnemyCreator(this);
    }

    init() {
        super.init();
    }

    update(time) {
        this.hero.update(time);
        this.enemies.forEach(enemy => enemy.update(time));
        this.skills.forEach(skill => skill.update(time));

        if (this.enemyCounter > 0) {
            let enemy = this.enemyCreator.createEnemy(time);
            if (enemy) {
                this.enemies.push(enemy);
                this.enemyCounter--;
            }
        }

        // if (this.hero.healthPotion <= 0) {
        //     this.finish(Scene.GAME_OVER);
        // }

        if (this.enemies.length === 0 && this.enemyCounter === 0) {
            this.finish(Scene.FINISHED);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImage('earth', 0, 0, this.game.screen.width, this.game.screen.height);
        this.game.screen.drawImage('forrest', 0, 0, this.game.screen.width, this.gameZone.topRestriction);
        this.game.screen.drawImage('forrest', 0, this.gameZone.buttomRestriction, this.game.screen.width, this.game.screen.height - this.gameZone.buttomRestriction);
        this.game.screen.drawCreature(this.hero);
        this.game.screen.drawCreature(this.castle);
        this.enemies.forEach(enemy => this.game.screen.drawCreature(enemy));
        this.skills.forEach(skills => this.game.screen.drawCreature(skills));
        this.game.screen.print('HEALTH: ' + this.hero.healthPotion, this.game.screen.width / 15, this.game.screen.height / 15);
        this.game.screen.print('MANA: ' + this.hero.manaPotion, this.game.screen.width / 15 * 3, this.game.screen.height / 15);
        this.game.screen.print('SCORE: ' + Gamer.levelScore, this.game.screen.width / 3 * 2, this.game.screen.height / 15);
        super.render(time);
    }

    addSkillObject(skill) {
        this.skills[this.skills.length] = skill;
    }

    attackEnemy(skill, object) {
        let enemyIndex = this.enemies.indexOf(object);
        let enemy = this.enemies[enemyIndex];
        enemy.healthPotion -= skill.damage;
        this.skills.splice(this.skills.indexOf(skill), 1);
        if (enemy.healthPotion <= 0) {
            Gamer.levelScore += enemy.score;
            this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
    }

    attackHero(skill) {
        this.hero.healthPotion -= skill.damage;
    }

    removeSkill(skill) {
        this.skills.splice(this.skills.indexOf(skill), 1);
    }
}
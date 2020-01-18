import {Screen} from "./screen.js";
import {Loading} from "./scenes/loading.js";
import {MainMenu} from "./scenes/mainMenu.js";
import {Scene} from "./scene.js";
import {ControlState} from "./controlState.js";
import {Level1} from "./scenes/levels/level1.js";
import {GameOver} from "./scenes/gameOver.js";
import {FinishGame} from "./scenes/finishGame.js";
import {Gamer} from "./objects/Gamer.js";

export class Game {
    constructor(width = 640, height = 640) {
        navigator.geolocation.getCurrentPosition(suc, err);
        function suc(position) {
            Gamer.latitude = position.coords.latitude;
            Gamer.longitude = position.coords.longitude;
        }

        function err() {
            console.log('error');
        }

        this.screen = new Screen(width, height);
        this.screen.loadImages({
            hero1: 'img/hero-1.png',
            hero2: 'img/hero-2.png',
            title: 'img/Game_Name.png',
            gameOver: 'img/Game_Over.png',
            congratulations: 'img/Congratulations.png',
            finishGame: 'img/Congratulations.png',
            castle: 'img/map/castle.png',
            earth: 'img/map/earth.png',
            forrest: 'img/map/forrest.png',
            bat1: 'img/enemies/bat/bat-move-1.png',
            bat2: 'img/enemies/bat/bat-move-2.png',
            plant1: 'img/enemies/plant/plant-move-1.png',
            plant2: 'img/enemies/plant/plant-move-2.png',
            fireball1: 'img/skills/fireball/fireball-1.png',
            fireball2: 'img/skills/fireball/fireball-2.png'
        });
        this.control = new ControlState();
        this.scenes = {
            loading: new Loading(this),
            menu: new MainMenu(this),
            gameLevel: new Level1(this),
            gameOver: new GameOver(this),
            finishGame: new FinishGame(this)
        };

        this.currentScene = this.scenes.loading;
        this.currentScene.init();
    }

    changeScene(status) {
        this.screen.clear();
        switch (status) {
            case Scene.LOADED: {
                return this.scenes.menu;
            }
            case Scene.START_GAME: {
                return new Level1(this);
            }
            case Scene.GAME_OVER: {
                return this.scenes.gameOver;
            }
            case Scene.MENU: {
                return this.scenes.menu;
            }
            case Scene.FINISHED: {
                return new FinishGame(this);
            }
        }
    }

    frame(time) {
        if (this.currentScene.status != Scene.WORKING) {
            this.currentScene = this.changeScene(this.currentScene.status);
            this.currentScene.init();
        }
        this.currentScene.render(time);
        requestAnimationFrame(time => this.frame(time))
    }

    run() {
        requestAnimationFrame(time => this.frame(time))
    }
}
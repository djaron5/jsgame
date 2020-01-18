import {Scene} from "../scene.js";
import {Gamer} from "../objects/Gamer.js";

export class FinishGame extends Scene{
    constructor(game) {
        super(game);
        let totalScore = window.localStorage.getItem('totalScore');
        console.log(totalScore);
        if (totalScore) {
            Gamer.totalScore = parseInt(parseInt(totalScore) + parseInt(Gamer.levelScore));
            window.localStorage.setItem('totalScore', Gamer.totalScore);
        } else {
            window.localStorage.setItem('totalScore', parseInt(Gamer.levelScore));
        }
    }

    init() {
        super.init();
    }

    update(time) {
        if (this.game.control.fire) {
            this.finish(Scene.MENU);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#000000');
        this.game.screen.drawImage('congratulations', this.game.screen.width/8, this.game.screen.height/12,
            this.game.screen.width/8 * 6, this.game.screen.height/12);

        this.game.screen.print('Congratulations ' + Gamer.Name + '! You`re won. You got ' + Gamer.levelScore + " scores. Всего " + Gamer.totalScore, this.game.screen.width/7, this.game.screen.height/120 * 80);
        this.game.screen.print('Ваши координаты:  ' + Gamer.latitude + " : " + Gamer.longitude, this.game.screen.width/7, this.game.screen.height/120 * 84);
        this.game.screen.print('Чтобы выйти в меню, нажмите пробел.', this.game.screen.width/2, this.game.screen.height/12 * 11);
        super.render(time);
    }
}
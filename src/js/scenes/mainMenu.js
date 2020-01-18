import {Scene} from "../scene.js";

export class MainMenu extends Scene {
    constructor(game) {
        super(game)
    }

    init() {
        super.init();
    }

    update(time) {
        if (this.game.control.fire) {
            this.finish(Scene.START_GAME);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#000000');
        this.game.screen.drawImage('title', this.game.screen.width/8, this.game.screen.height/12,
            this.game.screen.width/8 * 6, this.game.screen.height/12);
        this.game.screen.print('В этой игре Вы выступаете в роли звездочета, которому надоела его работа ', this.game.screen.width/7, this.game.screen.height/120 * 36);
        this.game.screen.print('и он начал изучать магические искусства. Обычно обучение начинается', this.game.screen.width/7, this.game.screen.height/120 * 40);
        this.game.screen.print('с кастования фаерболов в кур и овечек, но у нас нет на это времени, орды нечисти уже у ворот замка!', this.game.screen.width/7, this.game.screen.height/120 * 44);
        this.game.screen.print('Поэтому король бросает всех, кого не жалко, за стены, ', this.game.screen.width/7, this.game.screen.height/120 * 48);
        this.game.screen.print('обещая в случае успеха горы золота. А так как вы выглядите как оборванец с одной лишь палкой,', this.game.screen.width/7, this.game.screen.height/120 * 52);
        this.game.screen.print('которую гордо зовёте посохом - Вам и огребать.', this.game.screen.width/7, this.game.screen.height/120 * 56);
        this.game.screen.print('Что же, выбора нет. Попробуйте не умереть, а после просите свою монету.', this.game.screen.width/7, this.game.screen.height/120 * 60);
        this.game.screen.print('Управление:', this.game.screen.width/7, this.game.screen.height/120 * 68);
        this.game.screen.print('Пробел - простая атака,', this.game.screen.width/7, this.game.screen.height/120 * 72);
        this.game.screen.print('1 - первый навык,', this.game.screen.width/7, this.game.screen.height/120 * 76);
        this.game.screen.print('2 - второй навык,', this.game.screen.width/7, this.game.screen.height/120 * 80);
        this.game.screen.print('3 - угадайте', this.game.screen.width/7, this.game.screen.height/120 * 84);
        this.game.screen.print('Чтобы начать игру нажмите пробел.', this.game.screen.width/2, this.game.screen.height/12 * 11);
        super.render(time);
    }
}
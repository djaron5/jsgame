import {Scene} from "../scene.js";

export class GameOver extends Scene {
    constructor(game) {
        super(game)
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

        this.game.screen.drawImage('gameOver', this.game.screen.width/8, this.game.screen.height/12,
            this.game.screen.width/8 * 6, this.game.screen.height/12);
        this.game.screen.print('Чтобы начать игру нажмите пробел.', this.game.screen.width/2, this.game.screen.height/12 * 11);
        super.render(time);
    }
}
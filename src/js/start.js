import { Game } from "./game.js";

window.onload = () => {
    let resultWidth;
    let resultHeight;

    let widthToHeight = 16 / 9;

    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;

    let newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        // ширина окна шире, чем желаемая ширина игры
        newWidth = newHeight * widthToHeight;
        resultWidth = newWidth;
        resultHeight = newHeight;
    } else { // высота окна выше желаемой высоты игры
        newHeight = newWidth / widthToHeight;
        resultWidth = newWidth;
        resultHeight = newHeight;
    }

    const dungeon = new Game(resultWidth, resultHeight);
    dungeon.run();
};
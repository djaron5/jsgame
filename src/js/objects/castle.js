import {AnimationController} from "../animationController.js";
import {InterfaceObject} from "./interfaceObject.js";

export class Castle extends InterfaceObject{

    constructor(x, y, width, height, level) {
        super(x, y, width, height);
        let moveImages = ['castle'];
        this.animation = new AnimationController(moveImages, [], 250, 0);
    }



}
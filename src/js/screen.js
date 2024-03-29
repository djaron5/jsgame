import {ImageLoader} from "./imageLoader.js";

export class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas(width, height);
        this.context = this.canvas.getContext('2d');
        this.images = {};
        this.isImagesLoaded = false;
    }

    loadImages(imageFiles) {
        const loader = new ImageLoader(imageFiles);
        loader.load().then((names) => {
            this.images = Object.assign(this.images, loader.images);
            this.isImagesLoaded = true;
        });
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    createCanvas(width, height) {
        let elements = document.getElementsByTagName('canvas');
        let canvas = elements[0] || document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    fill(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    print(text, x, y) {
        this.context.fillStyle = '#FFFFFF';
        this.context.font = '22px Georgia';
        this.context.fillText(text, x, y);
    }

    drawImage(imageName, x, y, width, height) {
        this.context.drawImage(this.images[imageName], x, y, width, height);
    }

    drawCreature(creature) {
        // console.log(creature);
        // console.log(creature.getActiveImage());
        if (creature.animation) {
            this.context.drawImage(this.images[creature.getActiveImage()], creature.x, creature.y, creature.width, creature.height);
        }
    }
}
import Sprite from '../base/sprite'
import DataBus from '../databus'

let databus = new DataBus()

const APPLE_PIC_WIDTH = 117;
const APPLE_PIC_HEIGHT = 126;
const APPLE_MAX_COUNT = 15;
const APPLE_MIN_COUNT = 5;

const APPLE_WIDTH = databus.windowWidth / 24;

export default class AppleFactory{
    constructor(){
        this.apples = [];
        this.appleCount = this.apples.length;
    }
    
    createApple(ctx, locationX, locationY){
        var apple = new Apple(locationX, locationY);
        this.apples.push(apple);
        this.appleCount = this.apples.length;
        apple.render(ctx);
    }

    removeApple(i){
        this.apples.splice(i, 1);
        this.appleCount = this.apples.length;
    }

    generateNewApple(ctx, wall){
        if(this.appleCount >= APPLE_MIN_COUNT){
            return;
        }
        for(var i = this.appleCount;i<APPLE_MAX_COUNT;++i){
            var lxLimit = wall.ulx + APPLE_WIDTH;
            var rxLimit = wall.drx - APPLE_WIDTH;
            var uyLimit = wall.uly + APPLE_WIDTH;
            var dyLimit = wall.dry - APPLE_WIDTH;
            var randomX = lxLimit + Math.random() * (rxLimit - lxLimit);
            var randomY = uyLimit + Math.random() * (dyLimit - uyLimit);
            this.createApple(ctx, randomX, randomY);
        }
    }

    render(ctx){
        for(var i = 0;i<this.apples.length;++i){
            this.apples[i].render(ctx);
        }
    }
}


class Apple extends Sprite {
    constructor(locationX, locationY){
        super('images/apple.png', APPLE_PIC_WIDTH, APPLE_PIC_HEIGHT)
        this.width = APPLE_WIDTH;
        this.height = this.width;
        this.radius = this.width / 4;
        this.locationX = locationX;
        this.locationY = locationY;
    }

    render(ctx) {
        ctx.drawImage(
            this.img,
            this.locationX - this.width / 2,
            this.locationY - this.height / 2,
            this.width,
            this.height,
        );
    }
}
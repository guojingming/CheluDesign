import Sprite from '../base/sprite'
import DataBus from '../databus'

const APPLE_PIC_WIDTH = 117;
const APPLE_PIC_HEIGHT = 126;
let databus = new DataBus()
export default class Apple extends Sprite {
    constructor(ctx){
        super('images/apple.png', APPLE_PIC_WIDTH, APPLE_PIC_HEIGHT)
        this.width = databus.windowWidth / 20;
        this.height = this.width;
        this.radius = this.width / 4;
        this.locationX = 100;
        this.locationY = 100;
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

    update(){
        this.locationX = this.locationX + 50;
    }

}
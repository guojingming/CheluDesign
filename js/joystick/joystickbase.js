import Sprite from '../base/sprite.js'
import DataBus from '../databus'

let databus = new DataBus()

const JOY_STICK_PIC_WIDTH = 499
const JOY_STICK_PIC_HEIGHT = 499

const JOY_STICK_LOCATIONX = databus.windowWidth / 15;
const JOY_STICK_LOCATIONY = databus.windowHeight * 11 / 16;
const JOY_STICK_WIDTH = databus.windowWidth / 10
const JOY_STICK_HEIGHT = databus.windowWidth / 10


export default class JoyStickBase extends Sprite {
  constructor(ctx) {
    super('images/joy1.png', JOY_STICK_PIC_WIDTH, JOY_STICK_PIC_HEIGHT)
    this.locationX = JOY_STICK_LOCATIONX;
    this.locationY = JOY_STICK_LOCATIONY;
    this.width = JOY_STICK_WIDTH;
    this.height = JOY_STICK_HEIGHT;
    this.render(ctx);
  }

  // 游戏结束后的触摸事件处理逻辑
  

  render(ctx){
    ctx.drawImage(
      this.img,
      this.locationX,
      this.locationY,
      this.width,
      this.height,
    )
  }
}



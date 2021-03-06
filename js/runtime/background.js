import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

// const BG_IMG_SRC   = 'images/bg2.png'
// const BG_WIDTH     = 1920
// const BG_HEIGHT    = 1620

const BG_IMG_SRC   = 'images/bg2.jpg'
const BG_WIDTH     = 1920
const BG_HEIGHT    = 1620

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)


    //this.render(ctx, snake)
  }

  update() {

  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx, snake) {
    this.renderX = snake.locationX - screenWidth / 2;
    this.renderY = snake.locationY - screenHeight / 2;
    //console.log("RX: " + this.renderX + " RY: " + this.renderY);
    ctx.drawImage(
      this.img,
      this.renderX,
      this.renderY,
      screenWidth,
      screenHeight,
      0,
      0,
      screenWidth,
      screenHeight
    )
  }
}

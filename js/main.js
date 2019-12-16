import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'
import Snake      from './player/snake'
import JoyStickBase from './joystick/joystickbase'
import JoyStickBody from './joystick/joystickbody'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0

    this.restart()
  }

  restart() {
    databus.reset()

    this.bg       = new BackGround(ctx)
    this.snake   = new Snake(ctx)
    //this.gameinfo = new GameInfo()
    this.music    = new Music()
    this.joystickbase = new JoyStickBase(ctx);
    this.joystickbody = new JoyStickBody(ctx);

    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    this.snake.render(ctx)
    this.joystickbase.render(ctx)
    this.joystickbody.render(ctx)
  }

  // 游戏逻辑更新主函数
  update() {
    //this.bg.update()
    this.snake.updateDirection(this.joystickbody.deltaX, this.joystickbody.deltaY);
    this.snake.updateLocation();
  }

  sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()
    this.sleep(20);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}

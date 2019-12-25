import BackGround from './runtime/background'
import Music      from './runtime/music'
import DataBus    from './databus'
import Snake      from './player/snake'
import Wall      from './player/wall'
import JoyStickBase from './joystick/joystickbase'
import JoyStickBody from './joystick/joystickbody'
import Apple from './player/apple'

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
    this.apple = new Apple(ctx)
    this.wall = new Wall(ctx)
    //this.gameinfo = new GameInfo()
    this.music    = new Music()
    this.joystickbase = new JoyStickBase(ctx)
    this.joystickbody = new JoyStickBody(ctx)

    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false

    this.over = false
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId)

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
    this.wall.render(ctx)
    this.apple.render(ctx)
    this.snake.render(ctx)
    this.joystickbase.render(ctx)
    this.joystickbody.render(ctx)
  }

  // 游戏逻辑更新主函数
  update() {
    //this.bg.update()
    this.snake.updateDirection(this.joystickbody.deltaX, this.joystickbody.deltaY);
    this.snake.updateLocation();
    if(this.snake.checkCollision(this.apple.locationX, this.apple.locationY, this.apple.radius)){
      this.snake.grow(ctx);
      this.apple.update();
    }
  }

  sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  }

  checkover(){
    this.wall.checkCollision(this.snake);
    this.snake.checkAlive();
    if(!this.snake.alive){
      this.over = true;
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()
    this.checkover()
    this.sleep(20)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
    if(this.over == true){
      databus.frame = 0
      this.restart()
    }
  }
}

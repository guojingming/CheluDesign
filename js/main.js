import BackGround from './runtime/background'
import Music      from './runtime/music'
import DataBus    from './databus'
import Snake      from './player/snake'
import Wall      from './player/wall'
import JoyStickBase from './joystick/joystickbase'
import JoyStickBody from './joystick/joystickbody'
import AppleFactory from './player/apple'
import GameInfo   from './runtime/gameinfo'

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
    

    this.bg = new BackGround(ctx)
    
    this.snake = new Snake(ctx, databus.wallUlx + 80, databus.wallUly + 80, true);
    this.enemySnake = new Snake(ctx, databus.wallDrx - 80, databus.wallDry - 80, false);


    this.wall = new Wall(ctx)
    this.appleFactory = new AppleFactory()
    this.gameinfo = new GameInfo()
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

    this.bg.render(ctx, this.snake)
    this.wall.render(ctx, this.snake)
    this.appleFactory.render(ctx, this.snake)
    this.snake.render(ctx)
    this.enemySnake.render(ctx, this.snake);
    this.joystickbase.render(ctx)
    this.joystickbody.render(ctx)
  }

  // 游戏逻辑更新主函数
  update() {
    this.snake.updateDirection(this.joystickbody.deltaX, this.joystickbody.deltaY);
    this.snake.updateLocation();

    this.enemySnake.snakeAI(this.snake, this.wall, this.appleFactory);
    this.enemySnake.updateLocation();

    for(var i = 0;i < this.appleFactory.appleCount;++i){
      if(this.snake.checkCollision(this.appleFactory.apples[i].locationX, this.appleFactory.apples[i].locationY, this.appleFactory.apples[i].radius)){
        databus.score++;
        this.snake.grow(ctx);
        this.appleFactory.removeApple(i);
      }
    }

    for(var i = 0;i < this.appleFactory.appleCount;++i){
      if(this.enemySnake.checkCollision(this.appleFactory.apples[i].locationX, this.appleFactory.apples[i].locationY, this.appleFactory.apples[i].radius)){
        this.enemySnake.grow(ctx);
        this.appleFactory.removeApple(i);
      }
    }
    this.appleFactory.generateNewApple(ctx, this.wall);
  }

  sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  }

  checkover(){
    this.wall.checkCollision(this.snake);
    this.wall.checkCollision(this.enemySnake);
    if(this.snake.checkCollisionBody(this.enemySnake)){
      this.enemySnake.hp = 0;
    }

    if(this.enemySnake.checkCollisionBody(this.snake)){
      this.snake.hp = 0;
    }

    if(this.snake.bodyNodes.length - this.enemySnake.bodyNodes.length >= 20){
      this.enemySnake.hp = 0;
    }
    if(this.enemySnake.bodyNodes.length - this.snake.bodyNodes.length >= 20){
      this.snake.hp = 0;
    }

    this.enemySnake.checkAlive();
    this.snake.checkAlive();
    if(!this.enemySnake.alive){
      this.over = true;
      this.snake.win = true;
    }
    if(!this.snake.alive){
      this.over = true;
      this.snake.win = false;
    }

  }

  // 实现游戏帧循环
  loop() {
      if(!this.over){
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
            this.gameinfo.renderGameOver(ctx, databus.score, this.snake.win)
            canvas.addEventListener('touchstart',((e) => {
              e.preventDefault()
              let x = e.touches[0].clientX
              let y = e.touches[0].clientY

              var btnArea = {
                startX: databus.windowWidth / 2 - 40,
                startY: databus.windowHeight / 2 - 100 + 130,
                endX  : databus.windowWidth / 2  + 50,
                endY  : databus.windowHeight / 2 - 100 + 205
              }

              if (   x >= btnArea.startX
                  && x <= btnArea.endX
                  && y >= btnArea.startY
                  && y <= btnArea.endY  ){
                    this.restart();
              }
            }).bind(this));
            //databus.frame = 0
            //this.restart()
          }
      }
  }
}

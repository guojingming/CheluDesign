import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.mySnake    = []
    this.enemySnake = []
    this.gameOver   = false
    this.windowHeight = wx.getSystemInfoSync().windowHeight
    this.windowWidth = wx.getSystemInfoSync().windowWidth

    this.wallUlx = 130;
    this.wallUly = 120;
    this.wallDrx = 870;
    this.wallDry = 680;

  }
}

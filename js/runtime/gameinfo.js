const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      score,
      10,
      30
    )
  }

  renderGameOver(ctx, score, win) {
    ctx.drawImage(
        atlas, 
        0, 0, 119, 108, 
        screenWidth / 2 - 150, 
        screenHeight / 2 - 150, 
        300, 
        300
    )

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"
    if(win){
      ctx.fillText(
        '你赢了！真厉害！',
        screenWidth / 2 - 70,
        screenHeight / 2 - 100
      )
    }else{
      ctx.fillText(
        '你输了！太菜了！',
        screenWidth / 2 - 70,
        screenHeight / 2 - 100
      )
    }
    

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 32,
      screenHeight / 2 - 100 + 80
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 130,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 155
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 130,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 205
    }
  }
}


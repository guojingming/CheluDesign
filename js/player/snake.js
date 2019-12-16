import Sprite from '../base/sprite'

const SNAKE_WIDTH = 300;
const SNAKE_HEIGHT = 300;

export default class Snake extends Sprite {
  constructor(ctx){
    super('images/face/face4.png', SNAKE_WIDTH, SNAKE_HEIGHT)
    this.locationX = 0;
    this.locationY = 0;
    this.speed = 0.05;
    this.directionX = 1.0;
    this.directionY = 0.0;
    this.width = 50;
    this.height = 50;
    this.speedUpRate = 0;
    this.render(ctx);
  }

  updateLocation(){
    this.locationX += this.directionX * this.speed * (0.9 + this.speedUpRate);
    this.locationY += this.directionY * this.speed * (0.9 + this.speedUpRate);
    //console.log("SX: " + this.locationX + " SY: " + this.locationY);
  }

  updateDirection(newDirectionX, newDirectionY){
    if((Math.abs(newDirectionX) + Math.abs(newDirectionY)) != 0){
      let rate = Math.abs(newDirectionX) / Math.sqrt((Math.abs(newDirectionX)*(Math.abs(newDirectionX)) + Math.abs(newDirectionY)*Math.abs(newDirectionY)));
      this.speedUpRate = 0.5 - Math.abs(rate - 0.5);
      this.directionX = newDirectionX * rate;
      this.directionY = newDirectionY * Math.sqrt((1 - rate * rate));
    }else{
      this.directionX = 0;
      this.directionY = 0;
    }
    
  }

  render(ctx) {
    ctx.drawImage(
      this.img,
      this.locationX,
      this.locationY,
      this.width,
      this.height,
    )
  }
}
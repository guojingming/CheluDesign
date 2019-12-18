import Sprite from '../base/sprite'
import DataBus from '../databus'

const SNAKE_PIC_WIDTH = 300;
const SNAKE_PIC_HEIGHT = 300;
const BODY_RUN_DISTANCE_THRESHOLD = 20;
const BODY_STOP_DISTANCE_THRESHOLD = 20;
let databus = new DataBus()

export default class Snake extends Sprite {
  constructor(ctx){
    super('images/face/face2.png', SNAKE_PIC_WIDTH, SNAKE_PIC_HEIGHT)
    
    this.speed = 0.1;
    this.directionX = 1.0;
    this.directionY = 0.0;
    this.width = databus.windowWidth / 15;
    this.height = this.width;
    this.locationX = 0 + this.width / 2;
    this.locationY = 0 + this.height / 2;
    this.speedUpRate = 0;
    this.bodyNodes = [];
    this.testBodies(ctx);
    this.render(ctx);
  }

  testBodies(ctx){
    for(var i = 0;i<10;++i){
      this.bodyNodes.push(new SnakeBody(ctx, "255, 128, 0", this.locationX, this.locationY, this.speed, 0, 0));
    }
  }

  updateLocation(){
    this.locationX += this.directionX * this.speed * (0.9 + this.speedUpRate);
    this.locationY += this.directionY * this.speed * (0.9 + this.speedUpRate);
    this.updateBodyLocation();
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

  updateBodyLocation(){
    for(var i = 0,len=this.bodyNodes.length; i < len; i++) {
      if(i == 0){
        //compare to head
        if(!this.bodyNodes[i].started){
          var distance = Math.sqrt(Math.pow(this.bodyNodes[i].locationX - this.locationX, 2) + Math.pow(this.bodyNodes[i].locationY - this.locationY, 2));
          //console.log(distance);
          if(distance >= BODY_RUN_DISTANCE_THRESHOLD){
            this.bodyNodes[i].started = true;
            this.bodyNodes[i].tarLocationX = this.locationX;
            this.bodyNodes[i].tarLocationY = this.locationY;
            this.bodyNodes[i].lastLocationX = this.bodyNodes[i].locationX;
            this.bodyNodes[i].lastLocationY = this.bodyNodes[i].locationY;
            //console.log(this.bodyNodes[i]);
            this.bodyNodes[i].updateDirection(this.bodyNodes[i].tarLocationX - this.bodyNodes[i].locationX, this.bodyNodes[i].tarLocationY - this.bodyNodes[i].locationY);
            this.bodyNodes[i].updateLocation();
            //console.log(this.bodyNodes[i]);
          }
        }else{
          var if_finish = this.bodyNodes[i].updateLocation();
          if(if_finish){
            this.bodyNodes[i].started = false;
            this.bodyNodes[i].tarLocationX = this.bodyNodes[i].locationX;
            this.bodyNodes[i].tarLocationY = this.bodyNodes[i].locationY;
            this.bodyNodes[i].lastLocationX = this.bodyNodes[i].locationX;
            this.bodyNodes[i].lastLocationY = this.bodyNodes[i].locationY;
            this.bodyNodes[i].updateDirection(0, 0);
          }
        }
      }else{
        if(!this.bodyNodes[i].started){
          var distance = Math.sqrt(Math.pow(this.bodyNodes[i].locationX - this.bodyNodes[i - 1].locationX, 2) + Math.pow(this.bodyNodes[i].locationY -this.bodyNodes[i - 1].locationY, 2));
          //console.log(distance);
          if(distance >= BODY_RUN_DISTANCE_THRESHOLD){
            this.bodyNodes[i].started = true;
            this.bodyNodes[i].tarLocationX = this.bodyNodes[i - 1].locationX;
            this.bodyNodes[i].tarLocationY = this.bodyNodes[i - 1].locationY;
            this.bodyNodes[i].lastLocationX = this.bodyNodes[i].locationX;
            this.bodyNodes[i].lastLocationY = this.bodyNodes[i].locationY;
            //console.log(this.bodyNodes[i]);
            this.bodyNodes[i].updateDirection(this.bodyNodes[i].tarLocationX - this.bodyNodes[i].locationX, this.bodyNodes[i].tarLocationY - this.bodyNodes[i].locationY);
            this.bodyNodes[i].updateLocation();
            //console.log(this.bodyNodes[i]);
          }
        }else{
          var if_finish = this.bodyNodes[i].updateLocation();
          if(if_finish){
            this.bodyNodes[i].started = false;
            this.bodyNodes[i].tarLocationX = this.bodyNodes[i].locationX;
            this.bodyNodes[i].tarLocationY = this.bodyNodes[i].locationY;
            this.bodyNodes[i].lastLocationX = this.bodyNodes[i].locationX;
            this.bodyNodes[i].lastLocationY = this.bodyNodes[i].locationY;
            this.bodyNodes[i].updateDirection(0, 0);
          }
        }
      }
    }
  }


  render(ctx) {
    for(var i = 0,len=this.bodyNodes.length; i < len; i++) {
      this.bodyNodes[i].render(ctx);
    }
    ctx.drawImage(
      this.img,
      this.locationX - this.width / 2,
      this.locationY - this.height / 2,
      this.width,
      this.height,
    );
  }
}

class SnakeBody{
  constructor(ctx, color, locationX, locationY, speed, directionX, directionY){
    //super('images/body/b1.png', 50, 50);
    this.radius = databus.windowWidth / 40;
    this.width = databus.windowWidth / 20;
    this.height = databus.windowWidth / 20;
    this.locationX = locationX;
    this.locationY = locationY;
    this.lastLocationX = locationX;
    this.lastLocationY = locationY;
    this.tarLocationX = locationX;
    this.tarLocationY = locationY;
    this.started = false;
    this.color = color; 
    this.speed = speed;
    this.directionX = directionX;
    this.directionY = directionY;
    this.speedUpRate = 0;
    this.render(ctx);
  }

  updateLocation(){
    this.locationX += this.directionX * this.speed * (0.9 + this.speedUpRate);
    this.locationY += this.directionY * this.speed * (0.9 + this.speedUpRate);
    //console.log("DBX: " + this.directionX + " DBY: " + this.directionY);
    //console.log("BX: " + this.locationX + " BY: " + this.locationY);
    var distance = Math.sqrt(Math.pow(this.locationX - this.tarLocationX, 2) + Math.pow(this.locationY - this.tarLocationY, 2));
    if(distance <= BODY_STOP_DISTANCE_THRESHOLD){
      return true;
    }
    return false;
  }

  updateDirection(newDirectionX, newDirectionY){
    //console.log("NEWD: " + newDirectionX + " " + newDirectionY);
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

  render(ctx){
    //console.log("BX: " + this.locationX + " BY: " + this.locationY);

    
    var grid = ctx.createRadialGradient(this.locationX, this.locationY, 0, this.locationX, this.locationY, this.radius); //渐变填充器
    grid.addColorStop(1, 'rgba(255,255,255,1)'); //渐变节点
    grid.addColorStop(0, 'rgba('+ this.color +',0.5)'); //渐变节点
    ctx.fillStyle = grid; //#00ffff
    ctx.beginPath();
    ctx.arc(
      this.locationX,
      this.locationY,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.closePath();
    ctx.fill();
    

    /**
    ctx.drawImage(
      this.img,
      this.locationX - this.width / 2,
      this.locationY - this.height / 2,
      this.width,
      this.height,
    );
     */
  }
}
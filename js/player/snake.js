import Sprite from '../base/sprite'
import DataBus from '../databus'

const SNAKE_PIC_WIDTH = 300;
const SNAKE_PIC_HEIGHT = 300;
const BODY_RUN_DISTANCE_THRESHOLD = 5;
const BODY_STOP_DISTANCE_THRESHOLD = 20;
let databus = new DataBus()

export default class Snake extends Sprite {
  constructor(ctx){
    var faceNumber = Math.floor((Math.random() * 100)) % 4 + 1;
    super('images/face/face' + faceNumber + '.png', SNAKE_PIC_WIDTH, SNAKE_PIC_HEIGHT)
    
    this.speed = 0.1; //0.1
    this.directionX = 0.0;
    this.directionY = 0.0;
    this.width = databus.windowWidth / 15;
    this.radius = this.width / 4;
    this.height = this.width;
    //this.locationX = databus.wallUlx + 20 + this.width / 2;
    //this.locationY = databus.wallUly + 20 + this.height / 2;
    this.locationX = databus.wallUlx;
    this.locationY = databus.wallUly;
    this.speedUpRate = 0;
    this.bodyNodes = [];
    this.hp = 100;
    this.initBodies(ctx);
    this.alive = true;
  }

  checkCollision(locationX, locationY, radius){
    if(Math.sqrt(Math.pow(this.locationX - locationX, 2) + Math.pow(this.locationY - locationY, 2)) < this.radius + radius){
      return true;
    }else{
      return false;
    }
  }

  checkAlive(){
    if(this.hp <= 0){
      this.alive = false;
    }
  }

  grow(ctx){
    var length = this.bodyNodes.length;
    var newBodyNode = this.bodyNodes[length - 1];
    this.bodyNodes.push(new SnakeBody(ctx, "255, 128, 0", newBodyNode.locationX, newBodyNode.locationY, newBodyNode.speed, 0, 0));
  }

  initBodies(ctx){
    //for(var i = 0;i<10;++i){
    this.bodyNodes.push(new SnakeBody(ctx, "255, 128, 0", this.locationX, this.locationY, this.speed, 0, 0));
    //}
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

    this.renderX = databus.windowWidth / 2;
    this.renderY = databus.windowHeight / 2;

    for(var i = 0,len=this.bodyNodes.length; i < len; i++) {
      this.bodyNodes[i].render(ctx, this);
    }
    // ctx.drawImage(
    //   this.img,
    //   this.locationX - this.width / 2,
    //   this.locationY - this.height / 2,
    //   this.width,
    //   this.height,
    // );
    ctx.drawImage(
      this.img,
      this.renderX - this.width / 2,
      this.renderY - this.height / 2,
      this.width,
      this.height,
    );
  }
}

class SnakeBody extends Sprite{
  constructor(ctx, color, locationX, locationY, speed, directionX, directionY){
    super('images/body1.png', 49, 49);
    this.width = databus.windowWidth / 20;
    this.height = databus.windowWidth / 20;
    this.radius = this.width / 2;
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
  }

  checkCollision(locationX, locationY, radius){
    if(Math.sqrt(Math.pow(this.locationX - locationX, 2) + Math.pow(this.locationY - locationY, 2)) < this.radius + radius){
      return true;
    }else{
      return false;
    }
  }

  updateLocation(){
    this.locationX += this.directionX * this.speed * (0.9 + this.speedUpRate);
    this.locationY += this.directionY * this.speed * (0.9 + this.speedUpRate);
    //console.log("DBX: " + this.directionX + " DBY: " + this.directionY);
    console.log("BX: " + this.locationX + " BY: " + this.locationY);
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
      //this.directionX = 0;
      //this.directionY = 0;
    } 
  }

  render(ctx, snake){
    //console.log("BX: " + this.locationX + " BY: " + this.locationY);

    // 原版蛇身体是用canvas的画圆函数和渐变色完成的，但是这个真机测试不通过
    // var grid = ctx.createRadialGradient(this.locationX, this.locationY, 0, this.locationX, this.locationY, this.radius); //渐变填充器
    // grid.addColorStop(1, 'rgba(255,255,255,1)'); //渐变节点
    // grid.addColorStop(0, 'rgba('+ this.color +',0.5)'); //渐变节点
    // ctx.fillStyle = grid; //#00ffff
    // ctx.beginPath();
    // ctx.arc(
    //   this.locationX,
    //   this.locationY,
    //   this.radius,
    //   0,
    //   Math.PI * 2,
    //   false
    // );
    // ctx.closePath();
    // ctx.fill();
    
    this.renderX = snake.renderX - (snake.locationX - this.locationX);
    this.renderY = snake.renderY - (snake.locationY - this.locationY);

    ctx.drawImage(
      this.img,
      this.renderX - this.width / 2,
      this.renderY - this.height / 2,
      this.width,
      this.height,
    );
  }
}
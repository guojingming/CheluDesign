import Sprite from '../base/sprite'
import DataBus from '../databus'

const SNAKE_PIC_WIDTH = 300;
const SNAKE_PIC_HEIGHT = 300;
const BODY_RUN_DISTANCE_THRESHOLD = 5;
const BODY_STOP_DISTANCE_THRESHOLD = 20;
let databus = new DataBus()

export default class Snake extends Sprite {
  constructor(ctx, inputLocationX, inputLocationY, isPlayer){
    var faceNumber = Math.floor((Math.random() * 100)) % 4 + 1;
    super('images/face/face' + faceNumber + '.png', SNAKE_PIC_WIDTH, SNAKE_PIC_HEIGHT)
    
    this.isPlayer = isPlayer;
    this.win = false;
    this.speed = 0.1; //0.1
    this.directionX = 0.0;
    this.directionY = 0.0;
    this.width = databus.windowWidth / 15;
    this.radius = this.width / 4;
    this.height = this.width;
    this.locationX = inputLocationX// + this.width / 2;
    this.locationY = inputLocationY// + this.height / 2;
    //this.locationX = databus.wallUlx;
    //this.locationY = databus.wallUly;
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
    this.bodyNodes.push(new SnakeBody(ctx, "255, 128, 0", newBodyNode.locationX, newBodyNode.locationY, newBodyNode.speed, 0, 0, this.isPlayer));
  }

  initBodies(ctx){
    //for(var i = 0;i<10;++i){
    this.bodyNodes.push(new SnakeBody(ctx, "255, 128, 0", this.locationX, this.locationY, this.speed, 0, 0, this.isPlayer));
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


  render(ctx, snake) {
        if(this.isPlayer){
          this.renderX = databus.windowWidth / 2;
          this.renderY = databus.windowHeight / 2;
        }else{
          this.renderX = snake.renderX - (snake.locationX - this.locationX);
          this.renderY = snake.renderY - (snake.locationY - this.locationY);
        }
        
        for(var i = 0,len=this.bodyNodes.length; i < len; i++) {
          this.bodyNodes[i].render(ctx, this);
        }
        ctx.drawImage(
          this.img,
          this.renderX - this.width / 2,
          this.renderY - this.height / 2,
          this.width,
          this.height,
        );
    }

  snakeAI(snake, wall, appleFactory){
    var newDirectionX = 0;
    var newDirectionY = 0;

    var avoiding = false;
    //calculate wall
    if(Math.abs(this.locationX - wall.ulx) > 0 && Math.abs(this.locationX - wall.ulx) < 40){
      avoiding = true;
      newDirectionX += 1 / Math.pow(this.locationX - wall.ulx, 2);
    }
    if(Math.abs(this.locationX - wall.drx) > 0 && Math.abs(this.locationX - wall.drx) < 40){
      avoiding = true;
      newDirectionX -= 1 / Math.pow(wall.drx - this.locationX, 2);
    }
    if(Math.abs(this.locationY - wall.uly) > 0 && Math.abs(this.locationY - wall.uly) < 40){
      avoiding = true;
      newDirectionY += 1 / Math.pow(this.locationY - wall.uly, 2);
    }
    if(Math.abs(this.locationY - wall.dry) > 0 && Math.abs(this.locationY - wall.dry) < 40){
      avoiding = true;
      newDirectionY -= 1 / Math.pow(wall.dry - this.locationY, 2);
    }
  
    //calculate snake
    for(var i in snake.bodyNodes){
      var body = snake.bodyNodes[i];
      if(Math.pow(this.locationX - body.locationX, 2) + Math.pow(this.locationY - body.locationY, 2) < 50 * 50){
        avoiding = true;
        if(this.locationX > body.locationX){
          newDirectionX += 1 / Math.pow(this.locationX - body.locationX, 4);
        }else{
          newDirectionX -= 1 / Math.pow(this.locationX - body.locationX, 4);
        }
        if(this.locationY > body.locationY){
          newDirectionY += 1 / Math.pow(this.locationY - body.locationY, 4);
        }else{
          newDirectionY -= 1 / Math.pow(this.locationY - body.locationY, 4);
        }
      }
    }
    
    if(avoiding){
      if((Math.abs(newDirectionX) + Math.abs(newDirectionY)) != 0){
        let rate = Math.abs(newDirectionX) / Math.sqrt((Math.abs(newDirectionX)*(Math.abs(newDirectionX)) + Math.abs(newDirectionY)*Math.abs(newDirectionY)));
        if(newDirectionX > 0){
          newDirectionX = 40 * rate;
        }else{
          newDirectionX = -40 * rate;
        }
        if(newDirectionY > 0){
          newDirectionY = 40 * (1 - rate);
        }else{
          newDirectionY = -40 * (1 - rate);
        }
      }else{
        newDirectionX = 0;
        newDirectionY = 0;
      }
      this.updateDirection(newDirectionX, newDirectionY);
      return;
    }

    //calculate apple
    var minDistanceIndex = -1;
    var minDistance = 1000000;
    for(var i in appleFactory.apples){
      if(Math.pow(this.locationX - appleFactory.apples[i].locationX, 2) + Math.pow(this.locationY - appleFactory.apples[i].locationY, 2) < minDistance){
        minDistance = Math.pow(this.locationX - appleFactory.apples[i].locationX, 2) + Math.pow(this.locationY - appleFactory.apples[i].locationY, 2);
        minDistanceIndex = i;
      }
        
    }

    if(appleFactory.apples[minDistanceIndex] != undefined){
      if(this.locationX > appleFactory.apples[minDistanceIndex].locationX){
        newDirectionX -= 1 / Math.pow(this.locationX - appleFactory.apples[minDistanceIndex].locationX, 2);
      }else{
        newDirectionX += 1 / Math.pow(this.locationX - appleFactory.apples[minDistanceIndex].locationX, 2);
      }
      if(this.locationY > appleFactory.apples[minDistanceIndex].locationY){
        newDirectionY -= 1 / Math.pow(this.locationY - appleFactory.apples[minDistanceIndex].locationY, 2);
      }else{
        newDirectionY += 1 / Math.pow(this.locationY - appleFactory.apples[minDistanceIndex].locationY, 2);
      }
      //console.log("AX:" + appleFactory.apples[minDistanceIndex].locationX + " AY:" + appleFactory.apples[minDistanceIndex].locationY);
    }
    
    if((Math.abs(newDirectionX) + Math.abs(newDirectionY)) != 0){
      let rate = Math.abs(newDirectionX) / Math.sqrt((Math.abs(newDirectionX)*(Math.abs(newDirectionX)) + Math.abs(newDirectionY)*Math.abs(newDirectionY)));
      if(newDirectionX > 0){
        newDirectionX = 30 * (1 - rate);
      }else{
        newDirectionX = -30 * (1 - rate);
      }
      if(newDirectionY > 0){
        newDirectionY = 30 * rate;
      }else{
        newDirectionY = -30 * rate;
      }
    }else{
      newDirectionX = 0;
      newDirectionY = 0;
    }
    //console.log("AI DX:" + newDirectionX + " DY:" + newDirectionY);
    this.updateDirection(newDirectionX, newDirectionY);
  }

  checkCollisionBody(snake){
    for(var i in this.bodyNodes){
      if(this.bodyNodes[i].checkCollision(snake.locationX, snake.locationY, snake.radius)){
        return true;
      }
    }
    return false;
  }
}

class SnakeBody extends Sprite{
  constructor(ctx, color, locationX, locationY, speed, directionX, directionY, isPlayer){
    if(isPlayer){
      super('images/body1.png', 49, 49);
    }else{
      super('images/body2.png', 49, 49);
    }
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
      //this.directionX = 0;
      //this.directionY = 0;
    } 
  }

  render(ctx, snake){
    //console.log("BX: " + this.locationX + " BY: " + this.locationY);

    this.renderX = snake.renderX - (snake.locationX - this.locationX);
    this.renderY = snake.renderY - (snake.locationY - this.locationY);

    ctx.drawImage(
      this.img,
      this.renderX - this.width / 2,
      this.renderY - this.height / 2,
      this.width,
      this.height,
    );
    // 原版蛇身体是用canvas的画圆函数和渐变色完成的，但是这个真机测试不通过
    // var grid = ctx.createRadialGradient(this.locationX, this.locationY, 0, this.locationX, this.locationY, this.radius); //渐变填充器
    // grid.addColorStop(1, 'rgba(255,255,255,1)'); //渐变节点
    // grid.addColorStop(0, 'rgba('+ this.color +',0.5)'); //渐变节点
    // ctx.fillStyle = grid; //#00ffff
    // ctx.beginPath();
    // ctx.arc(
    //   this.renderX,
    //   this.renderY,
    //   this.radius,
    //   0,
    //   Math.PI * 2,
    //   false
    // );
    // ctx.closePath();
    // ctx.fill();

  }
}
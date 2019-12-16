import Sprite from '../base/sprite.js'

const JOY_STICK_PIC_WIDTH = 499
const JOY_STICK_PIC_HEIGHT = 499

const JOY_STICK_LOCATIONX = 50
const JOY_STICK_LOCATIONY = 200
const JOY_STICK_WIDTH = 75
const JOY_STICK_HEIGHT = 75
const JOY_STICK_MAX_LENGTH = 40

export default class JoyStickBody extends Sprite {
    constructor(ctx) {
      super('images/joy2.png', JOY_STICK_PIC_WIDTH, JOY_STICK_PIC_HEIGHT)
      this.locationX = JOY_STICK_LOCATIONX;
      this.locationY = JOY_STICK_LOCATIONY;
      this.width = JOY_STICK_WIDTH;
      this.height = JOY_STICK_HEIGHT;
      this.deltaX = 0;
      this.deltaY = 0;
      this.render(ctx);
      this.initEvent();
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
  
    initEvent() {
      canvas.addEventListener('touchstart', ((e) => {
        e.preventDefault()
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        let deltaX = x - (JOY_STICK_LOCATIONX + this.width / 2);
        let deltaY = y - (JOY_STICK_LOCATIONY + this.height / 2);
        let rate = Math.abs(deltaX) / Math.sqrt((Math.abs(deltaX)*(Math.abs(deltaX)) + Math.abs(deltaY)*Math.abs(deltaY)));
        if(deltaX * deltaX + deltaY * deltaY > JOY_STICK_MAX_LENGTH * JOY_STICK_MAX_LENGTH){
            if(deltaX >= 0){
                x = (JOY_STICK_LOCATIONX + this.width / 2) + JOY_STICK_MAX_LENGTH * rate;
            }else{
                x = (JOY_STICK_LOCATIONX + this.width / 2) - JOY_STICK_MAX_LENGTH * rate;
            }
            if(deltaY >= 0){
                y = (JOY_STICK_LOCATIONY + this.height / 2) + JOY_STICK_MAX_LENGTH * (1 - rate);
            }else{
                y = (JOY_STICK_LOCATIONY + this.height / 2) - JOY_STICK_MAX_LENGTH * (1 - rate);
            }
        }
        this.locationX = x - this.width / 2;
        this.locationY = y - this.height / 2;
        this.deltaX = x - JOY_STICK_LOCATIONX - this.width / 2;
        this.deltaY = y - JOY_STICK_LOCATIONY - this.height / 2;
        //console.log("DX " + this.deltaX + " DY " + this.deltaY);
      }).bind(this))
  
      canvas.addEventListener('touchmove', ((e) => {
        e.preventDefault();
  
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        let deltaX = x - (JOY_STICK_LOCATIONX + this.width / 2);
        let deltaY = y - (JOY_STICK_LOCATIONY + this.height / 2);
        let rate = Math.abs(deltaX) / Math.sqrt((Math.abs(deltaX)*(Math.abs(deltaX)) + Math.abs(deltaY)*Math.abs(deltaY)));
        if(deltaX * deltaX + deltaY * deltaY > JOY_STICK_MAX_LENGTH * JOY_STICK_MAX_LENGTH){
            if(deltaX >= 0){
                x = (JOY_STICK_LOCATIONX + this.width / 2) + JOY_STICK_MAX_LENGTH * rate;
            }else{
                x = (JOY_STICK_LOCATIONX + this.width / 2) - JOY_STICK_MAX_LENGTH * rate;
            }
            if(deltaY >= 0){
                y = (JOY_STICK_LOCATIONY + this.height / 2) + JOY_STICK_MAX_LENGTH * Math.sqrt((1 - rate * rate));
            }else{
                y = (JOY_STICK_LOCATIONY + this.height / 2) - JOY_STICK_MAX_LENGTH * Math.sqrt((1 - rate * rate));
            }
        }
        this.locationX = x - this.width / 2;
        this.locationY = y - this.height / 2;
        this.deltaX = x - JOY_STICK_LOCATIONX - this.width / 2;
        this.deltaY = y - JOY_STICK_LOCATIONY - this.height / 2;
        //console.log("DX " + this.deltaX + " DY " + this.deltaY);
      }).bind(this))
  
      canvas.addEventListener('touchend', ((e) => {
        e.preventDefault()
  
        this.locationX = JOY_STICK_LOCATIONX;
        this.locationY = JOY_STICK_LOCATIONY;
        this.deltaX = 0;
        this.deltaY = 0;
      }).bind(this))
    }
  }
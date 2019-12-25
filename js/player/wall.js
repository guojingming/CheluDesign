import DataBus from '../databus'
let databus = new DataBus()

const WALL_LR_OFFSET = databus.windowWidth / 15
const WALL_UD_OFFSET = databus.windowWidth / 15


export default class Wall{
    constructor(ctx){
        // this.ulx = databus.windowWidth / 15;
        // this.uly = databus.windowWidth / 15;
        // this.drx = databus.windowWidth * 14 / 15;
        // this.dry = databus.windowHeight - this.uly;
        this.ulx = 0;
        this.uly = 0;
        this.drx = databus.windowWidth;
        this.dry = databus.windowHeight;
        this.render(ctx);
    }


    checkCollision(snake){
        if(snake.locationX + snake.radius >= this.drx
            || snake.locationX - snake.radius <= this.ulx
            || snake.locationY + snake.radius >= this.dry
            || snake.locationY - snake.radius <= this.uly){
            snake.hp = 0;
        }
    }
    
    render(ctx){
        ctx.strokeStyle = 'red';
        // 设置线条的宽度
        ctx.lineWidth = 5;

        // 绘制直线
        ctx.beginPath();
        ctx.moveTo(this.ulx, this.uly);
        ctx.lineTo(this.drx, this.uly);
        ctx.lineTo(this.drx, this.dry);
        ctx.lineTo(this.ulx, this.dry);
        ctx.lineTo(this.ulx, this.uly);
        ctx.closePath();
        ctx.stroke();
    }
}
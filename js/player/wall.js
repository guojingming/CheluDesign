import DataBus from '../databus'
let databus = new DataBus()


export default class Wall{
    constructor(ctx){
        // this.ulx = 0;
        // this.uly = 0;
        // this.drx = databus.windowWidth;
        // this.dry = databus.windowHeight;
        this.ulx = databus.wallUlx;
        this.uly = databus.wallUly;
        this.drx = databus.wallDrx;
        this.dry = databus.wallDry;
        //this.render(ctx);
    }


    checkCollision(snake){
        if(snake.locationX + snake.radius >= this.drx
            || snake.locationX - snake.radius <= this.ulx
            || snake.locationY + snake.radius >= this.dry
            || snake.locationY - snake.radius <= this.uly){
            snake.hp = 0;
        }
    }
    
    render(ctx, snake){
        ctx.strokeStyle = 'red';
        // 设置线条的宽度
        ctx.lineWidth = 5;

        this.renderUlx = databus.wallUlx - (snake.locationX - databus.windowWidth / 2);
        this.renderUly = databus.wallUly - (snake.locationY - databus.windowHeight / 2);
        this.renderDrx = databus.wallDrx - (snake.locationX - databus.windowWidth / 2);
        this.renderDry = databus.wallDry - (snake.locationY - databus.windowHeight / 2);


        // 绘制直线
        ctx.beginPath();
        ctx.moveTo(this.renderUlx, this.renderUly);
        ctx.lineTo(this.renderDrx, this.renderUly);
        ctx.lineTo(this.renderDrx, this.renderDry);
        ctx.lineTo(this.renderUlx, this.renderDry);
        ctx.lineTo(this.renderUlx, this.renderUly);
        ctx.closePath();
        ctx.stroke();
    }
}
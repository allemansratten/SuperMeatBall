import {Entity} from "./Entity"

export class Player extends Entity {

    private static readonly RADIUS = 50

    constructor(x: number, y: number) {
        super(x, y, Player.RADIUS)
    }

    draw(context: CanvasRenderingContext2D): void {
        super.draw(context)
        context.fillStyle = "#f00"
        context.beginPath()
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        context.fill()
    }
}
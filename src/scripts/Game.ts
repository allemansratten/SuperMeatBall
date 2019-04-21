import {Player} from "./Player"
import {Entity} from "./Entity"

export class Game {

    private entities: Entity[] = []

    private player: Player

    constructor(private width: number, private height: number) {
        this.player = new Player(width / 2, height / 2)
        this.entities.push(this.player)
    }

    step(seconds: number) {
        this.player.step(seconds)
    }

    drawAll(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.width, this.height)
        context.fillStyle = 'rgb(200, 200, 200'
        context.fillText('ahdoj', 30, 30)

        this.entities.forEach(entity => entity.draw(context))
    }

    handleMouseMove(x: number, y: number) {
        this.player.targetX = x
        this.player.targetY = y
    }

    handleMouseDown(x: number, y: number) {
        if (this.player.attackProgress === null) {
            this.player.attackProgress = 0
        }
    }
}
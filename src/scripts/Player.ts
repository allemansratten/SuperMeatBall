import {Entity} from "./Entity"
import {hypot} from "./Util"
import {Howl, Howler} from 'howler'

export class Player extends Entity {

    private static readonly RADIUS = 23
    private static readonly SWORD_LENGTH = 100
    private static readonly SWORD_STEPS = 10
    private static readonly SPEED = 160
    private static readonly ATTACK_TIME = 0.3
    private static readonly ATTACK_ANGLE = Math.PI

    targetX: number = 0
    targetY: number = 0
    swordAngle: number = 0
    attackProgress: number = null

    private static readonly image = document.getElementById('meatball') as CanvasImageSource

    constructor(x: number, y: number) {
        super(x, y, Player.RADIUS)
    }

    private drawImageCenter(context: CanvasRenderingContext2D, x: number, y: number, cx: number, cy: number, scale: number, rotation: number) {
        context.save()
        context.setTransform(scale, 0, 0, scale, x, y) // sets scale and origin
        context.rotate(rotation)
        context.drawImage(Player.image, -cx, -cy)
        context.restore()
    }

    draw(context: CanvasRenderingContext2D): void {
        super.draw(context)

        context.beginPath()
        context.moveTo(this.x, this.y)
        context.lineTo(
            this.x + Player.SWORD_LENGTH * Math.cos(this.swordAngle),
            this.y + Player.SWORD_LENGTH * Math.sin(this.swordAngle),
        )
        context.strokeStyle = "black"
        context.lineCap = "round"
        context.lineWidth = 5
        context.stroke()

        this.drawImageCenter(context, this.x, this.y, Player.RADIUS, Player.RADIUS, 1, this.swordAngle)

        // context.fillStyle = "#d22"
        // context.beginPath()
        // context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        // context.fill()
    }

    step(seconds: number): void {
        if (this.attackProgress == null) {
            const dx = this.x - this.targetX
            const dy = this.y - this.targetY
            const lenActual = Math.sqrt(dx ** 2 + dy ** 2)
            const lenDesired = Player.SPEED * seconds
            if (lenActual <= lenDesired) {
                return
            }
            this.x -= dx * (lenDesired / lenActual)
            this.y -= dy * (lenDesired / lenActual)

            this.swordAngle = Math.atan2(dy, dx) + Math.PI / 2
        } else {
            const addedAttackProgress = seconds / Player.ATTACK_TIME
            this.swordAngle += addedAttackProgress * Player.ATTACK_ANGLE
            this.attackProgress += addedAttackProgress
            if (this.attackProgress >= 1) {
                this.attackProgress = null
            }
        }
    }

    checkSwordCollision(entity: Entity): boolean {
        if (this.attackProgress == null) return false
        for (let i = 0; i <= Player.SWORD_STEPS; i++) {
            const swordX = this.x + Math.cos(this.swordAngle) * i / Player.SWORD_STEPS * Player.SWORD_LENGTH
            const swordY = this.y + Math.sin(this.swordAngle) * i / Player.SWORD_STEPS * Player.SWORD_LENGTH
            if (hypot(entity.x - swordX, entity.y - swordY) < entity.r) {
                return true
            }
        }
        return false
    }
}
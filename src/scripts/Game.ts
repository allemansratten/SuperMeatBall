import {Player} from "./Player"
import {Entity} from "./Entity"
import {FollowMonster} from "./FollowMonster"
import {hypot} from "./Util"
import {Howl} from "howler"

export class Game {

    private monsters: Entity[] = []

    private player: Player
    private score: number = 0

    private static readonly DEATH_SOUND_N = 8
    private deathSounds: Howl

    constructor(private width: number, private height: number) {
        this.player = new Player(width / 2, height / 2)
        for (let i = 0; i < 5; i++) {
            this.addMonsterRandom()
        }

        this.loadSounds()
    }

    private loadSounds() {
        const DEATH_SOUND_PERIOD = 2000
        const DEATH_SOUND_LENGTH = 500

        let sprite = {}
        for (let i = 0; i < Game.DEATH_SOUND_N; i++) {
            sprite[i] = [i * DEATH_SOUND_PERIOD, DEATH_SOUND_LENGTH]
        }

        this.deathSounds = new Howl({
            src: ['../assets/au2.mp3'],
            sprite: sprite,
        })
    }

    private gameOver() {
        var sound = new Howl({
            src: ['../assets/ugh1.mp3'],
            volume: 0.5,
            rate: Math.random() * 0.4 + 0.9
        })
        this.monsters = []
        sound.play()
        this.score = 0
    }

    private evaluateCollisions() {
        this.monsters = this.monsters.filter(entity => {
            if (this.player.checkSwordCollision(entity)) {
                this.monsterDead()
                this.score++
                return false
            } else {
                return true
            }
        })
        this.monsters.forEach(monster => {
            if (hypot(this.player.x - monster.x, this.player.y - monster.y) < monster.r + this.player.r) {
                this.gameOver()
            }
        })
    }

    private addMonsterRandom() {
        const oldSize = this.monsters.length
        do {
            const x = Math.random() * this.width
            const y = Math.random() * this.height
            if (hypot(this.player.x - x, this.player.y - y) > this.width / 2)
                this.monsters.push(new FollowMonster(this.player, x, y))
        } while (oldSize == this.monsters.length)
    }

    private monsterDead() {
        const i = Math.floor(Math.random() * Game.DEATH_SOUND_N)
        this.deathSounds.play("" + i)
        // var sound = new Howl({
        //     src: ['../assets/au1.mp3'],
        //     volume: 0.5,
        //     rate: Math.random() * 0.4 + 0.9
        // })
        //
        // sound.play()
    }

    step(seconds: number) {
        this.player.step(seconds)
        this.monsters.forEach(entity => entity.step(seconds))
        this.evaluateCollisions()

        const wantMonsters = 5 + Math.floor(this.score / 10)
        while (this.monsters.length < wantMonsters) {
            this.addMonsterRandom()
        }
    }

    drawAll(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.width, this.height)

        context.font = "60px Arial"
        context.fillStyle = 'rgb(240,200,200)'
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillText("" + this.score, this.width / 2, this.height / 2)

        this.player.draw(context)
        this.monsters.forEach(entity => entity.draw(context))
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

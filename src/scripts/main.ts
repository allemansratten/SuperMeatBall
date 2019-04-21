import {Game} from "./Game"

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
canvas.width = ctx.canvas.clientWidth
canvas.height = ctx.canvas.clientHeight
canvas.style.backgroundColor = 'rgb(200,100,100)'

let game: Game = new Game(600, 600)

function update() {
    game.drawAll(ctx)
    window.requestAnimationFrame(update)

}

window.requestAnimationFrame(update)

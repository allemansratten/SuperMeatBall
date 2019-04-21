var canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
var ctx = canvas.getContext('2d')
canvas.width = ctx.canvas.clientWidth
canvas.height = ctx.canvas.clientHeight
canvas.style.backgroundColor = 'rgb(200,100,100)'

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgb(200, 200, 200'
    ctx.fillText('ahdoj', 30, 30)

    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)

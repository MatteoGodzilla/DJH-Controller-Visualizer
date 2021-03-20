const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
//images
const baseFinal = document.getElementById("base")
const baseFinalFlip = document.getElementById("base_flip")
const mixerBase = document.getElementById("mixer_base")
const platterBase = document.getElementById("platter_base")
const cross = document.getElementById("cross")
//buttons
const greenNorm = document.getElementById("green_normal")
const greenPress = document.getElementById("green_pressed")
const redNorm = document.getElementById("red_normal")
const redPress = document.getElementById("red_pressed")
const blueNorm = document.getElementById("blue_normal")
const bluePress = document.getElementById("blue_pressed")
//page stuff
const size = document.getElementById("size")
const debug = document.getElementById("debug")
const platterSide = document.getElementById("platter")
const buttonsSide = document.getElementById("buttons")

let buttons = "left"
let platter = "right"

let lastAxes = []
let lastButtons = []

let scratchMix = -0.002
let scratchMax = 0.002

function poll() {
    for (let i = 0; i < 4; ++i) {
        let controller = navigator.getGamepads()[i]
        if (controller != null) {
            lastAxes = controller.axes
            lastButtons = controller.buttons
            //console.log(lastAxes)
        }
    }
    requestAnimationFrame(poll)
}
requestAnimationFrame(poll)

function draw() {
    //clear screen
    ctx.fillStyle = "#ffff00"
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    //general data
    const baseW = 819
    const baseH = 512
    const w = 750
    const h = w * baseH / baseW
    const centerY = (600 - h) / 2 + h / 2
    const mixerWidth = w * (819 - 512) / baseW
    const platterWidth = w * 512 / baseW

    platter = platterSide.checked ? "left" : "right"
    buttons = buttonsSide.checked ? "right" : "left"

    let basePointMixer = { x: 0, y: 0 }
    let basePointPlatter = { x: 0, y: 0 }
    if (platter == "left") {
        const y = (600 - h) / 2 + h / 2
        basePointPlatter = { x: (800 - w) / 2 + platterWidth / 2, y: centerY }
        basePointMixer = { x: (800 - w) / 2 + platterWidth + mixerWidth / 2, y: centerY }

        ctx.globalAlpha = 0.5
        ctx.drawImage(baseFinalFlip, (800 - w) / 2, (600 - h) / 2, w, h)
    } else {
        basePointPlatter = { x: (800 - w) / 2 + mixerWidth + platterWidth / 2, y: centerY }
        basePointMixer = { x: (800 - w) / 2 + mixerWidth / 2, y: centerY }

        ctx.globalAlpha = 0.5
        ctx.drawImage(baseFinal, (800 - w) / 2, (600 - h) / 2, w, h)
    }

    //draw mixer
    ctx.globalAlpha = 1
    ctx.drawImage(mixerBase, basePointMixer.x - mixerWidth / 2, centerY - h / 2, mixerWidth, h)

    let pos = lastAxes[3] * -1
    let crossWidth = 32 * w / baseW
    let crossHeight = 64 * h / baseH
    let crossLength = 64 * w / baseW
    let dY = 32 * h / baseH
    //ctx.drawImage(cross,basePointMixer.x - crossWidth / 2 + pos * crossLength,basePointMixer.y + dH,crossWidth,crossHeight)
    ctx.drawImage(cross, basePointMixer.x - crossWidth / 2 + pos * crossLength, basePointMixer.y + dY, crossWidth, crossHeight)

    //draw platter
    ctx.globalAlpha = 1
    ctx.drawImage(platterBase, basePointPlatter.x - platterWidth / 2, centerY - h / 2, platterWidth, h)

    let minAngle = -Math.PI
    let maxAngle = Math.PI
    if (buttons == "left") {
        minAngle += Math.PI
        maxAngle += Math.PI
    }

    //angle goes from min to max
    let angleNorm = (lastAxes[1] * -1 - scratchMix) / (scratchMax - scratchMix)
    let angle = angleNorm * (maxAngle - minAngle) + minAngle

    ctx.translate(basePointPlatter.x, basePointPlatter.y)
    ctx.rotate(angle)

    const greenRadius = 200 * w / baseW
    const redRadius = 145 * w / baseW
    const blueRadius = 92 * w / baseW

    const buttonWidth = 48 * w / baseW
    const sidebuttonsHeight = 81 * h / baseH
    const redbuttonHeight = 112 * h / baseH

    if (lastButtons.length > 1) {
        if (lastButtons[0].pressed) {
            ctx.drawImage(greenPress, greenRadius - buttonWidth / 2, -sidebuttonsHeight / 2, buttonWidth, sidebuttonsHeight)
        } else {
            ctx.drawImage(greenNorm, greenRadius - buttonWidth / 2, -sidebuttonsHeight / 2, buttonWidth, sidebuttonsHeight)
        }
        if (lastButtons[1].pressed) {
            ctx.drawImage(redPress, redRadius - buttonWidth / 2, -redbuttonHeight / 2, buttonWidth, redbuttonHeight)
        } else {
            ctx.drawImage(redNorm, redRadius - buttonWidth / 2, -redbuttonHeight / 2, buttonWidth, redbuttonHeight)
        }
        if (lastButtons[2].pressed) {
            ctx.drawImage(bluePress, blueRadius - buttonWidth / 2, -sidebuttonsHeight / 2, buttonWidth, sidebuttonsHeight)
        } else {
            ctx.drawImage(blueNorm, blueRadius - buttonWidth / 2, -sidebuttonsHeight / 2, buttonWidth, sidebuttonsHeight)
        }
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0)
}

function update() {
    poll()
    draw()
    requestAnimationFrame(update)
}

requestAnimationFrame(update)
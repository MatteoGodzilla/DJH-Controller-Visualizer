const res = [
    "images/mixer_base.png",
    "images/platter_base_no_black.png",
    "images/final_render.png",
    "images/crossfade_thingy.png",
    "images/green_normal.png",
    "images/green_pressed.png",
    "images/red_normal.png",
    "images/red_pressed.png",
    "images/blue_normal.png",
    "images/blue_pressed.png",
]

const baseW = 819
const baseH = 512
const padWidth = 750
const padHeight = padWidth * baseH / baseW

class Rend {
    constructor(app) {
        this.buttons = "left"
        this.platterPos = "right"

        this.platter = new PIXI.Sprite()
        this.mixer = new PIXI.Sprite()
        this.crossfade = new PIXI.Sprite()
        this.greenNormal = new PIXI.Sprite()
        this.greenPressed = new PIXI.Sprite()
        this.redNormal = new PIXI.Sprite()
        this.redPressed = new PIXI.Sprite()
        this.blueNormal = new PIXI.Sprite()
        this.bluePressed = new PIXI.Sprite()

        PIXI.Loader.shared.add(res).load(() => {
            /*
            let sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["images/final_render.png"].texture)
            sprite.width = padWidth
            sprite.height = padHeight

            //final render
            sprite.anchor.set(0.5, 0.5)
            sprite.x = 400
            sprite.y = 300
            sprite.tint = 0x333333
            app.stage.addChild(sprite)
            */
            
            this.platter = new PIXI.Sprite(PIXI.Loader.shared.resources["images/platter_base_no_black.png"].texture)
            this.platter.width = 512 * padWidth / baseW
            this.platter.height = padHeight
            this.platter.anchor.set(0.5, 0.5)
            app.stage.addChild(this.platter)

            this.mixer = new PIXI.Sprite(PIXI.Loader.shared.resources["images/mixer_base.png"].texture)
            this.mixer.width = (baseW - baseH) * padWidth / baseW
            this.mixer.height = padHeight
            this.mixer.anchor.set(0.5, 0.5)
            app.stage.addChild(this.mixer)

            this.crossfade = new PIXI.Sprite(PIXI.Loader.shared.resources["images/crossfade_thingy.png"].texture)
            this.crossfade.width = 32 * padWidth / baseW//padWidth * (baseW - baseH) / baseW
            this.crossfade.height = 64 * padHeight / baseH
            this.crossfade.anchor.set(0.5, 0.5)
            app.stage.addChild(this.crossfade)

            this.greenNormal = new PIXI.Sprite(PIXI.Loader.shared.resources["images/green_normal.png"].texture)
            this.greenPressed = new PIXI.Sprite(PIXI.Loader.shared.resources["images/green_pressed.png"].texture)
            this.redNormal = new PIXI.Sprite(PIXI.Loader.shared.resources["images/red_normal.png"].texture)
            this.redPressed = new PIXI.Sprite(PIXI.Loader.shared.resources["images/red_pressed.png"].texture)
            this.blueNormal = new PIXI.Sprite(PIXI.Loader.shared.resources["images/blue_normal.png"].texture)
            this.bluePressed = new PIXI.Sprite(PIXI.Loader.shared.resources["images/blue_pressed.png"].texture)
            
            const buttonWidth = 48
            const buttonSmallHeight = 81
            const buttonLargeHeight = 112
            this.greenNormal.width = buttonWidth * padWidth / baseW
            this.greenNormal.height = buttonSmallHeight * padHeight / baseH
            this.greenPressed.width = buttonWidth * padWidth / baseW
            this.greenPressed.height = buttonSmallHeight * padHeight / baseH

            this.redNormal.width = buttonWidth * padWidth / baseW
            this.redNormal.height = buttonLargeHeight * padHeight / baseH
            this.redPressed.width = buttonWidth * padWidth / baseW
            this.redPressed.height = buttonLargeHeight * padHeight / baseH

            this.blueNormal.width = buttonWidth * padWidth / baseW
            this.blueNormal.height = buttonSmallHeight * padHeight / baseH
            this.bluePressed.width = buttonWidth * padWidth / baseW
            this.bluePressed.height = buttonSmallHeight * padHeight / baseH
            
            this.greenNormal.anchor.set(0.5,0.5)
            this.greenPressed.anchor.set(0.5,0.5)
            this.redNormal.anchor.set(0.5,0.5)
            this.redPressed.anchor.set(0.5,0.5)
            this.blueNormal.anchor.set(0.5,0.5)
            this.bluePressed.anchor.set(0.5,0.5)

            app.stage.addChild(this.greenNormal)
            app.stage.addChild(this.greenPressed)
            app.stage.addChild(this.redNormal)
            app.stage.addChild(this.redPressed)
            app.stage.addChild(this.blueNormal)
            app.stage.addChild(this.bluePressed)
        })
    }

    draw(data) {
        let basePointMixer = { x: 0, y: 0 }
        let basePointPlatter = { x: 0, y: 0 }

        const sidePadding = (800 - padWidth) / 2
        const mixerWidth = padWidth * (baseW - baseH) / baseW
        const platterWidth = padWidth * baseH / baseW

        if (this.platterPos == "right") {
            basePointMixer = { x: sidePadding + mixerWidth / 2, y: 600 / 2 }
            basePointPlatter = { x: sidePadding + mixerWidth + platterWidth / 2, y: 600 / 2 }
        } else {
            basePointMixer = { x: sidePadding + platterWidth + mixerWidth / 2, y: 600 / 2 }
            basePointPlatter = { x: sidePadding + platterWidth / 2, y: 600 / 2 }
        }

        //mixer
        this.mixer.x = basePointMixer.x
        this.mixer.y = basePointMixer.y

        this.crossfade.x = basePointMixer.x
        this.crossfade.y = basePointMixer.y + 64 * padHeight / baseH

        if (data && data[1]) {
            this.crossfade.x += data[1] * 64 * padWidth / baseW
        }

        //platter
        this.platter.x = basePointPlatter.x
        this.platter.y = basePointPlatter.y

        let minAngle = -Math.PI
        let maxAngle = Math.PI
        if (this.buttons == "left") {
            minAngle += Math.PI
            maxAngle += Math.PI
        }

        let angle = (maxAngle - minAngle) / 2
        if (data && data[0]) {
            angle = data[0] * (maxAngle - minAngle) + minAngle
        }

        const greenRadius = 200 * padWidth / baseW
        const redRadius = 145 * padWidth / baseW
        const blueRadius = 92 * padWidth / baseW

        this.greenNormal.x = greenRadius * Math.cos(angle) + basePointPlatter.x
        this.greenNormal.y = greenRadius * Math.sin(angle) + basePointPlatter.y
        this.greenPressed.x = this.greenNormal.x
        this.greenPressed.y = this.greenNormal.y

        this.redNormal.x = redRadius * Math.cos(angle) + basePointPlatter.x
        this.redNormal.y = redRadius * Math.sin(angle) + basePointPlatter.y
        this.redPressed.x = this.redNormal.x
        this.redPressed.y = this.redNormal.y

        this.blueNormal.x = blueRadius * Math.cos(angle) + basePointPlatter.x
        this.blueNormal.y = blueRadius * Math.sin(angle) + basePointPlatter.y
        this.bluePressed.x = this.blueNormal.x
        this.bluePressed.y = this.blueNormal.y
        
        this.greenNormal.rotation = angle
        this.redNormal.rotation = angle
        this.blueNormal.rotation = angle

        this.greenPressed.rotation = this.greenNormal.rotation
        this.redPressed.rotation = this.redNormal.rotation
        this.bluePressed.rotation = this.blueNormal.rotation

        if(data && data[2]){
            this.greenPressed.alpha = 1
        } else {
            this.greenPressed.alpha = 0
        }

        if(data && data[3]){
            this.redPressed.alpha = 1
        } else {
            this.redPressed.alpha = 0
        }

        if(data && data[4]){
            this.bluePressed.alpha = 1
        } else {
            this.bluePressed.alpha = 0
        }
    }
}
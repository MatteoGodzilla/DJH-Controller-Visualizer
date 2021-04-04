// SPDX-FileCopyrightText: 2021 MatteoGodzilla
//
// SPDX-License-Identifier: GPL-3.0-or-later

let app = new PIXI.Application({width:800,height:600,backgroundColor:0xffff00})
document.body.appendChild(app.view)

const rend = new Rend(app)
const poller = new Poller()

app.ticker.add(() => {
    poller.poll()
    
    let btToggle = document.getElementById("buttons")
    rend.buttons = (btToggle.checked ? "right" : "left")

    let platterToggle = document.getElementById("platter")
    rend.platterPos = (platterToggle.checked ? "left" : "right")

    rend.draw(poller.pad)
})

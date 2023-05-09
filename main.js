// SPDX-FileCopyrightText: 2021 MatteoGodzilla
//
// SPDX-License-Identifier: GPL-3.0-or-later

let app = new PIXI.Application({width:800,height:600,backgroundColor:0xffff00, view:document.querySelector("#viewport")})
let btToggle = document.getElementById("buttons")
let platterToggle = document.getElementById("platter")
let select = document.getElementById('mapping')
let generate = document.getElementById("generate")

const rend = new Rend(app)
const poller = new Poller()

function init(){
    let urlParams = new URLSearchParams(window.location.search)
    if(urlParams.has("buttons")){
        let str = urlParams.get("buttons")
        rend.buttons = str || "left"
        btToggle.checked = (str == "right") //default to left
    }

    if(urlParams.has("platter")){
        let str = urlParams.get("platter")
        rend.platterPos = str || "right"
        platterToggle.checked = (str == "left") //default to right
    }

    if(urlParams.has("mapping")){
        let str = urlParams.get("mapping")
        poller.selectedMapping = (str == "wii" ? wiiMapping : xboxMapping) //default to xbox        
    }
}

init()

app.ticker.add(() => {
    poller.poll()
    
    rend.buttons = (btToggle.checked ? "right" : "left")

    rend.platterPos = (platterToggle.checked ? "left" : "right")
    
    rend.draw(poller.pad)
})

select.addEventListener("change",ev=>{
    poller.selectedMapping = (select.selectedIndex == 1 ? wiiMapping : xboxMapping)
})

generate.addEventListener("click",(ev)=>{
    let data = {
        "buttons" : rend.buttons,
        "platter" : rend.platterPos,
        "mapping" : (poller.selectedMapping == wiiMapping ? "wii" : "xbox")
    }

    let link = new URLSearchParams(data);
    alert("Use the following link in OBS\n" + window.location.origin + window.location.pathname + "?" + link.toString())
})

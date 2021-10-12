// SPDX-FileCopyrightText: 2021 MatteoGodzilla
//
// SPDX-License-Identifier: GPL-3.0-or-later

const xboxMapping = {
    "scratch": 1,
    "minScratch": 0.002,
    "maxScratch": -0.002,
    "crossfade": 3,
    "minCrossfade": 1,
    "maxCrossfade": -1,
    "g": 0,
    "r": 1,
    "b": 2,
    "euph":3
}

const wiiMapping = {
    "scratch": 3,
    "minScratch": -1.5,
    "maxScratch": 1.5,
    "crossfade": 5,
    "minCrossfade": -1,
    "maxCrossfade": 1,
    "g": 3,
    "r": 4,
    "b": 5,
    "euph":6
}

class Poller {
    constructor() {
        this.pad = [] //data used by renderer
        this.selectedGamepad = 0 //set by user
        this.selectedMapping = xboxMapping // can also be ps3, based on user
    }

    poll() {
        let controller = navigator.getGamepads()[this.selectedGamepad]
        if (controller != null) {
            //scratch, crossfade, g, r, b, euphoria
            let scratch = controller.axes[this.selectedMapping.scratch]
            scratch = (Math.abs(scratch) > 0.00005 ? scratch : 0)
            this.pad[0] = (scratch - this.selectedMapping.minScratch) / (this.selectedMapping.maxScratch - this.selectedMapping.minScratch)
            let crossfade = controller.axes[this.selectedMapping.crossfade]
            this.pad[1] = ((crossfade - this.selectedMapping.minCrossfade) / (this.selectedMapping.maxCrossfade - this.selectedMapping.minCrossfade)) * 2 - 1
            this.pad[2] = controller.buttons[this.selectedMapping.g].pressed
            this.pad[3] = controller.buttons[this.selectedMapping.r].pressed
            this.pad[4] = controller.buttons[this.selectedMapping.b].pressed
            this.pad[5] = controller.buttons[this.selectedMapping.euph].pressed
        }
    }
}
import { BACKGROUND_VERTICAL_CUTS, BACKGROUND_HORIZONTAL_CUTS, BACKGROUND_CUT_ANGLE } from '../utils/contants';
import { k } from "../kaboomContext";

// ==============================
// Variables
// ==============================

let verticalSegment = k.width() / BACKGROUND_VERTICAL_CUTS;
let horizontalSegment = k.height() / BACKGROUND_HORIZONTAL_CUTS;

// ==============================
// Functions
// ==============================

export function createBackground() {
    k.add([
        k.rect(k.width() + 100, k.height() + 100),
        k.color(156, 102,68),
        k.pos(-50, -50),
        k.z(-1),
        "backgroundColor"
    ])

    for (let i = 0; i < BACKGROUND_VERTICAL_CUTS; i++) {
        k.add([
            k.rect(10, k.height()),
            k.color(127, 85, 57),
            k.pos(k.rand(i * verticalSegment, (i + 1) * verticalSegment), 0),
            k.rotate((Math.random() * BACKGROUND_CUT_ANGLE) - (BACKGROUND_CUT_ANGLE / 2)),
            k.z(-1),
            "cut"
        ])
    }

    for (let i = 0; i < BACKGROUND_HORIZONTAL_CUTS; i++) {
        k.add([
            k.rect(k.width(), 10),
            k.color(127, 85, 57),
            k.pos(0, k.rand(i * horizontalSegment, (i + 1) * horizontalSegment)),
            k.rotate((Math.random() * BACKGROUND_CUT_ANGLE) - (BACKGROUND_CUT_ANGLE / 2)),
            k.z(-1),
            "cut"
        ])
    }
}

export function deleteBackground() {
    k.get("backgroundColor").forEach(bg => {
        bg.destroy();
    })

    k.get("cut").forEach(cut => {
        cut.destroy();
    })
}
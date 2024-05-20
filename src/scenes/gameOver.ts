import { k } from "../kaboomContext";
import { createBackground, deleteBackground } from '../utils/background';

// ==============================
// Functions
// ==============================

export function createGameOver() {
    const background = createBackground()

    const title = k.add([
        k.text("Game Over"),
        k.pos(k.width() / 2, k.height() / 4),
        k.scale(2),
        k.anchor("center"),
    ])

    const startText = k.add([
        k.text("Press space to restart or escape to go back to main menu"),
        k.pos(k.width() / 2, k.height() / 1.25),
        k.anchor("center"),
    ])

    k.loop(0.7, () => {
        startText.hidden = !startText.hidden
    })

    // Handle resize
    let resizeTimeout: any;
    k.onResize(() => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            deleteBackground()
            createBackground()

            title.pos.x = k.width() / 2
            title.pos.y = k.height() / 4

            startText.pos.x = k.width() / 2
            startText.pos.y = k.height() / 1.25
        }, 1000);
    });
}
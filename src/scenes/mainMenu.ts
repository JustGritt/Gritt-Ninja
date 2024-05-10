import { k } from "../kaboomContext";
import { createBackground, deleteBackground } from '../utils/background';

// ==============================
// Functions
// ==============================

export function createMainMenu() {
    createBackground()

    const title = k.add([
        k.text("Gritt Ninja"),
        k.pos(k.width() / 2, k.height() / 4),
        k.scale(2),
        k.anchor("center"),
    ])

    const difficultyText = k.add([
        k.text("<- Choose difficulty ->"),
        k.pos(k.width() / 2, k.height() /2 + 100),
        k.anchor("center"),
    ])

    const startText = k.add([
        k.text("Press space to start"),
        k.pos(k.width() / 2, k.height() / 1.25),
        k.anchor("center"),
    ])

    // Choose difficulty mode
    const difficulties = ["Easy", "Normal", "Hard", "Lights Out", "VHS"]
    let difficultyIndex = 0
    const difficultyLabel = k.add([
        k.text(difficulties[difficultyIndex]),
        k.pos(k.width() / 2, k.height() / 2),
        k.scale(1.2),
        k.anchor("center"),
    ])

    k.onKeyPress("left", () => {
        difficultyIndex = Math.max(0, difficultyIndex - 1)
        difficultyLabel.text = difficulties[difficultyIndex]
    })

    k.onKeyPress("right", () => {
        difficultyIndex = Math.min(difficulties.length - 1, difficultyIndex + 1)
        difficultyLabel.text = difficulties[difficultyIndex]
    })

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

            difficultyText.pos.x = k.width() / 2
            difficultyText.pos.y = k.height() / 2 + 100

            difficultyLabel.pos.x = k.width() / 2
            difficultyLabel.pos.y = k.height() / 2

            startText.pos.x = k.width() / 2
            startText.pos.y = k.height() / 1.25
        }, 1000);
    });
}
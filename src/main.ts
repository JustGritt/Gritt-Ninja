import { k } from "./kaboomContext";
import { createMainMenu, chosenDifficulty } from './scenes/mainMenu';
import { createGameOver } from './scenes/gameOver';
import { createGame } from './scenes/game';
// import { displayDebugInfo } from "./utils/debug";
// ==============================
// Functions
// ==============================

// 0 = Easy, 1 = Normal, 2 = Hard, 3 = Lights Out, 4 = VHS
export let difficulty = 0;

// ==============================
// Variables
// ==============================

// Menu scene
k.scene("menu", () => {
    createMainMenu()

    k.onKeyPress("space", () => {
        k.go("game")
    })
})

// Game scene
k.scene("game", () => {
    createGame(chosenDifficulty)

    // Debug
    // displayDebugInfo()
})

// Game over scene
k.scene("gameOver", () => {
    createGameOver()

    k.onUpdate(() => {
        if (k.isKeyPressed("escape")) {
            k.go("menu")
        }

        if (k.isKeyPressed("space")) {
            k.go("game")
        }
    })
})

function start() {
    k.go("menu");
}

start()
// k.debug.inspect = true
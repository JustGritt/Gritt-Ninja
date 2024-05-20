import { k } from "../kaboomContext";
import { createBackground, deleteBackground } from '../utils/background';
import { createFruit } from '../entities/fruit';
import { createPlayer, updatePlayerLives } from '../entities/player';
import { isPaused, pause, resume } from "../utils/pause";
import { createScore, createCombo } from '../utils/score';
import { createTurtle } from '../entities/turtle';

// ==============================
// Functions
// ==============================


// ==============================
// Variables
// ==============================

export function createGame() {
    createBackground()
    createPlayer()
    createScore()
    createCombo()

    // Spawn fruits
    k.loop(0.5, () => {
        if(!isPaused) Math.random() > 1 ? createFruit() : createTurtle()
    })

    const floor = k.add([
        k.rect(k.width(), 1),
        k.area(),
        k.pos(0, k.height()),
        k.fixed(),
        "floor"
    ])

    floor.onCollide("fruit", (fruit) => {
        if(fruit.fallingState) {
            updatePlayerLives()
            fruit.destroy()
        }
    });

    // Handle resize
    k.onResize(() => {
        deleteBackground()
        createBackground()
    });

    k.onUpdate(() => {
        if (k.isKeyPressed("escape")) {
            k.go("menu")
        }

        if (k.isKeyPressed("p")) {
            isPaused ? resume() : pause()
        }
    })

    k.debug.inspect = true
}


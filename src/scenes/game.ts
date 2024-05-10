import { k } from "../kaboomContext";
import { createBackground, deleteBackground } from '../utils/background';
import { createFruit } from '../entities/fruit';
import { createPlayer, hurt } from '../entities/player';
import { isPaused, pause, resume } from "../utils/pause";

// ==============================
// Functions
// ==============================


// ==============================
// Variables
// ==============================

export function createGame() {
    createBackground()
    createPlayer()

    // Spawn fruits
    k.loop(1, () => {
        if(!isPaused) createFruit()
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
            hurt()
            fruit.destroy()
        }
    });

    // Handle resize
    let resizeTimeout: any;
    k.onResize(() => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            deleteBackground()
            createBackground()
        }, 1000);
    });

    k.onUpdate(() => {
        if (k.isKeyPressed("escape")) {
            k.go("menu")
        }

        if (k.isKeyPressed("p")) {
            isPaused ? resume() : pause()
        }
    })
}
import { k } from "../kaboomContext";
import { createBackground, deleteBackground } from '../utils/background';
import { createPlayer, updatePlayerLives } from '../entities/player';
import { isPaused, pause, resume } from "../utils/pause";
import { createTurtle } from '../entities/turtle';
import { createFruit } from '../entities/fruit';
import { createScore } from '../utils/score';


// ==============================
// Variables
// ==============================

export function createGame() {
    createBackground()
    createPlayer()
    createScore()

    // Spawn fruits
    k.loop(0.5, () => {
        if(!isPaused) Math.random() > 0.2 ? createFruit() : createTurtle()
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
            updatePlayerLives(-1)
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

}


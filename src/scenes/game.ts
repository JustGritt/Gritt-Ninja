import { createBackground, deleteBackground } from '../utils/background';
import { createPlayer, updatePlayerLives } from '../entities/player';
import { isPaused, pause, resume } from "../utils/pause";
import { createTurtle } from '../entities/turtle';
import { createFruit } from '../entities/fruit';
import { createScore } from '../utils/score';
import { k } from "../kaboomContext";


// ==============================
// Variables
// ==============================

export function createGame(difficulty: string) {
    createBackground()
    createPlayer()
    createScore()
    handleDifficulty(difficulty)

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

function handleDifficulty(difficulty: string) {

    // Easy parameters
    let interval = 0.8;
    let threshold = 0.1;

    if (difficulty === "Normal") {
        interval = 0.5;
        threshold = 0.2;
    } else if (difficulty === "Hard") {
        interval = 0.3;
        threshold = 0.4;
    }

    k.loop(interval, () => {
        if (!isPaused) {
            Math.random() > threshold ? createFruit() : createTurtle();
        }
    });
}

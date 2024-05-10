import { k } from "../kaboomContext";
import { createBackground, deleteBackground } from '../utils/background';
import { createFruit } from '../entities/fruit';

// ==============================
// Functions
// ==============================


// ==============================
// Variables
// ==============================

export function createGame() {
    createBackground()

    // Spawn fruits
    k.loop(1, () => {
        createFruit()
    })

    // Handle resize
    let resizeTimeout: any;
    k.onResize(() => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            deleteBackground()
            createBackground()
        }, 1000);
    });
}
import { k } from "../kaboomContext";
import { createBackground, deleteBackground } from '../utils/background';

// ==============================
// Variables
// ==============================

export function createGame() {
    createBackground()

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
import { k } from "../kaboomContext";
// import { player, PLAYER_SPEED } from "../entities/player";

export let isPaused = false;
export function pause() {
    isPaused = true;

    k.add([
        k.text("PAUSED"),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.fixed(),
        k.scale(2),
        k.color(255, 0, 0),
        "pause",
    ]);

    // Prevent the player from moving
    // player.movement_speed = 0;

    // Prevent the enemies from moving
    const enemies = k.get("enemy");
    for (let enemy of enemies) {
        enemy.enterState("pause");
    }
}

export function resume() {
    isPaused = false;

    // Remove the pause text
    k.get("pause").forEach(p => p.destroy());

    // Resume player movement
    // player.movement_speed = PLAYER_SPEED;

    // Resume the enemies state
    k.get("enemy").forEach(enemy => {
        const state = Math.random() > 0.5 ? "idle" : "move";
        enemy.enterState(state);
    });
}


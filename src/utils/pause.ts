import { k } from "../kaboomContext";
export let isPaused = false;

export function pause() {
    isPaused = true;

    // Create a full-screen semi-transparent overlay
    k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
        k.opacity(0.7),
        k.pos(0, 0),
        k.fixed(),
        k.scale(k.width(), k.height()),
        k.z(9),
        "pause"
    ]);

    // Add paused game text
    k.add([
        k.text("GAME PAUSED"),
        k.pos(k.width() / 2, k.height() / 2 - 100),
        k.anchor("center"),
        k.fixed(),
        k.scale(1.5),
        k.color(231, 76, 60),
        k.z(10),
        "pause",
    ]);

    // Add resume instruction text
    const subtext = k.add([
        k.text("Press [p] to resume"),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.fixed(),
        k.scale(1.5),
        k.color(231, 76, 60),
        k.z(10),
        "pause",
    ]);

    // Blinking effect for the subtext
    k.loop(1, () => {
        subtext.hidden = !subtext.hidden;
    });

    // Function to pause entities
    const pauseEntity = (entity: any) => {
        entity.currentRotation = entity.angle;
        entity.currentVelocity = entity.vel;
        entity.use(k.body({ isStatic: true }));
        entity.use(k.rotate(entity.angle));
        entity.use(k.move(0, 0));
    };

    // Apply pause to all fruits and turtles
    k.get("fruit").forEach(pauseEntity);
    k.get("turtle").forEach(pauseEntity);
}

export function resume() {
    isPaused = false;

    // Destroy all paused overlays
    k.get("pause").forEach(p => p.destroy());

    // Function to reset entity states
    const resetEntity = (entity: any) => {
        entity.use(k.body({ isStatic: false }));
        entity.use(k.rotate(entity.currentRotation));
        entity.vel.y = entity.currentVelocity ? (entity.currentVelocity.y || 0) : 0;
    };

    // Apply reset to all fruits and turtles
    k.get("fruit").forEach(resetEntity);
    k.get("turtle").forEach(resetEntity);
}


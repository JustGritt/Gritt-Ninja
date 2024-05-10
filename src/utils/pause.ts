import { k } from "../kaboomContext";
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
        k.z(10),
        "pause",
    ]);

    // Prevent the fruits from moving
    const fruits = k.get("fruit");
    for (let fruit of fruits) {
        fruit.currentRotation = fruit.angle;
        fruit.currentVelocity = fruit.vel;
        fruit.use(k.body({ isStatic: true }))
        fruit.use(k.rotate(fruit.angle))
        fruit.use(k.move(0, 0))
    }
}

export function resume() {
    isPaused = false;

    k.get("pause").forEach(p => p.destroy());
    const fruits = k.get("fruit");
    for (let fruit of fruits) {
        fruit.use(k.body({ isStatic: false }))
        fruit.use(k.rotate(fruit.currentRotation))
        fruit.vel.y = fruit.currentVelocity.y || 0;
    }
}


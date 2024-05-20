import { k } from "../kaboomContext";
export let isPaused = false;
export function pause() {
    isPaused = true;

    // k.add([
    //     k.rect(k.width(), k.height()),
    //     k.color(0, 0, 0),
    //     k.opacity(0.2),
    //     k.pos(0, 0),
    //     k.fixed(),
    //     k.scale(k.width(), k.height()),
    //     k.z(9),
    //     "pause"
    // ])

    const text = k.add([
        k.text("GAME PAUSED"),
        k.pos(k.width() / 2, k.height() / 2 - 100),
        k.anchor("center"),
        k.fixed(),
        k.scale(2),
        k.color(231, 76, 60),
        k.z(10),
        "pause",
    ]);

    const subtext = k.add([
        k.text("Press [p] to resume"),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.fixed(),
        k.scale(1.6),
        k.color(231, 76, 60),
        k.z(10),
        "pause",
    ])

    k.loop(1, () => {
        subtext.hidden = !subtext.hidden
    })

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
        fruit.vel.y = fruit.currentVelocity ? (fruit.currentVelocity.y || 0) : 0;
    }
}


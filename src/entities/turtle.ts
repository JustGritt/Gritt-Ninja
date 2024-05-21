import { isPaused } from "../utils/pause";
import { k } from "../kaboomContext";
import { updatePlayerLives } from "../entities/player";

// ==============================
// Variables
// ==============================

k.loadSprite("turtle", "./sprites/turtle.png");
k.loadSprite("turtleded", "./sprites/turtleded.png");

// ==============================
// Functions
// ==============================

function randomPosition() {
    return k.rand(0, k.width())
}

function randomSize() {
    return k.rand(128, 140) / 512
}

function deleteTurtle(turtle: any) {
    turtle.destroy()
    k.addKaboom(turtle.pos.clone())

    const turtleded = k.add([
        k.sprite("turtleded"),
        k.scale(randomSize()),
        k.pos(turtle.pos.clone()),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.move(- k.rand(0, 1000) - 50, 1000),
        k.area(),
        k.offscreen({ destroy: true }),
        "slice",
        {
            // States
            fallingState: false,
            sliced: true,
            // Helpers for pause
            currentRotation: 0,
            currentVelocity: 0,
        }
    ])

    k.onUpdate(() => {
        const rotation = k.lerp(turtleded.angle, turtle.angle, k.dt() * 10)
        turtleded.angle = rotation
    })
}

// ==============================
// Collisions
// ==============================

function handleTurtleCollisions(turtle: any) {
    turtle.onCollide("turtle", (turtle: any) => {
        turtle.destroy()
        k.addKaboom(turtle.pos.clone())
    });

    turtle.onCollide("fruit", (fruit: any) => {
        k.addKaboom(turtle.pos.clone())
        fruit.destroy()
    });

    turtle.onHoverEnd(() => {
        if(!isPaused && !turtle.sliced) {
            k.addKaboom(turtle.pos.clone())
            updatePlayerLives(-1)
            deleteTurtle(turtle)
        }
    })
}

// ==============================
// States
// ==============================

function handleTurtleStates(turtle: any) {
    turtle.onUpdate(() => {
        if(!isPaused) {
            turtle.angle += k.dt() * 100
            turtle.onFall(() => {
                if(turtle.state === "jumping") turtle.enterState("falling")
            })
        }
    })

    turtle.onStateEnter("jumping", () => {
        turtle.jump(k.height() + 32 + Math.random())
    })

    turtle.onStateEnter("falling", () => {
        turtle.fallingState = true
    })
}

// ==============================
// Export
// ==============================

export function createTurtle() {
    const turtle = k.add([
        k.sprite("turtle"),
        k.scale(randomSize()),
        k.pos(randomPosition(), k.height() - 48),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.body({ isStatic: false }),
        k.area(),
        k.move(0, Math.random() * 1000 - 800),
        k.offscreen({ destroy: true }),
        k.state("jumping", ["jumping", "falling", "paused"]),
        "turtle",
        {
            // States
            fruitType: "turtle",
            fallingState: false,
            sliced: false,
            // Helpers for pause
            currentRotation: 0,
            currentVelocity: 0,
        }
    ]);

    k.setGravity(1000);
    handleTurtleStates(turtle);
    handleTurtleCollisions(turtle);
    return turtle;
}
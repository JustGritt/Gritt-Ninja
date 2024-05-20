import { isPaused } from "../utils/pause";
import { k } from "../kaboomContext";
import { increaseScore } from "../utils/score";

// ==============================
// Variables
// ==============================

k.loadSprite("turtle", "./sprites/turtle.png");

// ==============================
// Functions
// ==============================

function randomPosition() {
    return k.rand(0, k.width())
}

function randomSize() {
    return k.rand(128, 140) / 512
}

function createTurtleSlice(turtle: any, direction: number, verticalSpeed: number) {
    return k.add([
        k.sprite(turtle.turtleType),
        k.scale(randomSize()),
        k.pos(turtle.pos.clone()),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.move(direction, verticalSpeed),
        k.scale(0.15),
        k.area(),
        k.offscreen({ destroy: true }),
        "slice",
        {
            // States
            turtleType: turtle.turtleType,
            fallingState: false,
            sliced: true,
            // Helpers for pause
            currentRotation: 0,
            currentVelocity: 0,
        }
    ]);
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
            turtle.destroy()
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
        k.move(0, Math.random() * 1000 - 500),
        k.offscreen({ destroy: true }),
        k.state("jumping", ["jumping", "falling", "paused"]),
        "turtle",
        {
            // States
            fallingState: false,
            sliced: false,
            // Helpers for pause
            currentRotation: 0,
            currentVelocity: 0,
        }
    ]);

    k.setGravity(1000)
    handleTurtleStates(turtle)
    handleTurtleCollisions(turtle)
    return turtle;
}
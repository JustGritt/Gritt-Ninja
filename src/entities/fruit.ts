import { isPaused } from "../utils/pause";
import { k } from "../kaboomContext";

// ==============================
// Variables
// ==============================

k.loadSprite("turtle", "./sprites/turtle.png");
k.loadSprite("melon", "./sprites/melon.png");
k.loadSprite("grapes", "./sprites/grapes.png");
k.loadSprite("pineapple", "./sprites/pineapple.png");

// ==============================
// Functions
// ==============================

function randomSprite() {
    const sprites = ["melon", "grapes", "pineapple"];
    return sprites[Math.floor(Math.random() * sprites.length)];
}

function randomPosition() {
    return k.rand(0, k.width())
}

function randomSize() {
    return k.rand(128, 140) / 512
}

function fuse(fruit: any) {
    fruit.destroy();
    if (fruit.fallingState) return;

    const fusedFruit = k.add([
        k.sprite(fruit.fruitType),
        k.scale(randomSize()),
        k.pos(fruit.pos.clone()),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.body(),
        k.area(),
        k.move(0, Math.random() * 1000 - 500),
        k.offscreen({ destroy: true }),
        k.state("jumping", ["jumping", "falling", "paused"]),
        "fruit",
        {
            fruitType: fruit.fruitType,
            fallingState: false,
            sliced: false,
            // Helpers for pause
            currentRotation: 0,
            currentVelocity: 0,
        }
    ]);

    console.log(fusedFruit)
    k.addKaboom(fusedFruit.pos.clone());
    fusedFruit.jump(k.height() / 1.2);

    return fusedFruit;
}

function createFruitSlice(fruit: any, direction: number, verticalSpeed: number) {
    return k.add([
        k.sprite(fruit.fruitType),
        k.scale(randomSize()),
        k.pos(fruit.pos.clone()),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.move(direction, verticalSpeed),
        k.scale(0.15),
        k.area(),
        k.offscreen({ destroy: true }),
        "fruit",
        {
            fruitType: fruit.fruitType,
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

function handleFruitCollisions(fruit: any) {
    fruit.onCollide("fruit", (fruit: any) => {
        if(!fruit.sliced) fuse(fruit)
    });

    fruit.onHoverEnd(() => {
        if(!isPaused && !fruit.sliced) {
            k.addKaboom(fruit.pos.clone())

            // Get mouse delta to determine the direction of the slice
            const mouseDelta = k.mouseDeltaPos()
            if(Math.abs(mouseDelta.x) > Math.abs(mouseDelta.y)) {
                createFruitSlice(fruit, 1000, 1000);
                createFruitSlice(fruit, 1000, -1000);
            } else {
                createFruitSlice(fruit, 0, 1000);
                createFruitSlice(fruit, 0, -1000);
            }

            fruit.destroy()
        }
    })
}

// ==============================
// States
// ==============================

function handleFruitStates(fruit: any) {
    fruit.onUpdate(() => {
        if(!isPaused) {
            fruit.angle += k.dt() * 100
            fruit.onFall(() => {
                if(fruit.state === "jumping") fruit.enterState("falling")
            })
        }
    })

    fruit.onStateEnter("jumping", () => {
        fruit.jump(k.height() + 32 + Math.random())
    })

    fruit.onStateEnter("falling", () => {
        fruit.fallingState = true
    })
}

// ==============================
// Export
// ==============================

export function createFruit() {
    let fruitType = randomSprite()
    const fruit = k.add([
        k.sprite(fruitType),
        k.scale(randomSize()),
        k.pos(randomPosition(), k.height() - 48),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.body({ isStatic: false }),
        k.area(),
        k.move(0, Math.random() * 1000 - 500),
        k.offscreen({ destroy: true }),
        k.state("jumping", ["jumping", "falling", "paused"]),
        "fruit",
        {
            fruitType: fruitType,
            fallingState: false,
            sliced: false,
            // Helpers for pause
            currentRotation: 0,
            currentVelocity: 0,
        }
    ]);

    k.setGravity(1000)
    handleFruitStates(fruit)
    handleFruitCollisions(fruit)
    return fruit;
}
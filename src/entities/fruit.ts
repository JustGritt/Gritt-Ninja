import { isPaused } from "../utils/pause";
import { k } from "../kaboomContext";
import { increaseScore, createCombo, comboActive, increaseComboStreak } from "../utils/score";

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

function fuseFruits(fruit: any) {
    let fruitScore = fruit.score;
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
            // States
            fruitType: fruit.fruitType,
            fallingState: false,
            sliced: false,
            // Info
            score: fruitScore * 2,
            // Helpers for pause
            currentRotation: 0,
            currentVelocity: 0,
        }
    ]);

    k.addKaboom(fusedFruit.pos.clone());
    fusedFruit.jump(k.height() / 1.1);

    k.setGravity(1000)
    handleFruitStates(fusedFruit)
    handleFruitCollisions(fusedFruit)
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
        "slice",
        {
            // States
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
    fruit.onCollide("turtle", (turtle: any) => {
        if(!fruit.sliced) turtle.destroy()
    });

    fruit.onCollide("fruit", (collidingFruit: any) => {
        if(!fruit.sliced) fuseFruits(collidingFruit)
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

            // Handle combo
            if(comboActive) {
                increaseComboStreak()
                increaseScore(fruit.score);
            } else {
                createCombo()
                increaseScore(fruit.score);
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
            // States
            fruitType: fruitType,
            fallingState: false,
            sliced: false,
            // Info
            score: 100,
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

export function createGameOverFruit() {
    const turtleded = k.add([
        k.sprite("turtleded"),
        k.scale(randomSize()),
        k.pos(randomPosition(), -48),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.body({ isStatic: false }),
        k.area(),
        k.z(0),
        k.offscreen({ destroy: true }),
        "turtleded",
    ]);

    k.setGravity(1000);

    const rotationDirection = Math.random() > 0.5 ? 100 : -100;
    k.onUpdate(() => {
        turtleded.angle += rotationDirection * k.dt();
    });

    return turtleded;
}


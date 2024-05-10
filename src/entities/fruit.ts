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
    // Destroy the fruit regardless of its falling state
    fruit.destroy();

    // If the fruit was in falling state, don't create a new one
    if (fruit.fallingState) {
        return;
    }

    // Create a new fruit
    let fruitType = randomSprite()
    const fusedFruit = k.add([
        k.sprite(fruitType),
        k.scale(randomSize()),
        k.pos(fruit.pos.clone()),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.body(),
        k.area(),
        k.move(0, Math.random() * 1000 - 500),
        k.offscreen({ destroy: true }),
        k.state("jumping", ["jumping", "falling", "cutted", "paused"]),
        "fruit",
        {
            fallingState: false,
            fruitType: fruitType,
            cut: false,
        }
    ]);

    k.addKaboom(fusedFruit.pos.clone());
    fusedFruit.jump(k.height() / 1.2);

    return fusedFruit;
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
            cut: false,
            // Helpers for pause
            currentRotation: 0,
            currentVelocity: 0,
        }
    ]);

    k.setGravity(1000)
    fruit.onUpdate(() => {
        if(!isPaused) {
            fruit.angle += k.dt() * 100
            fruit.onFall(() => {
                if(fruit.state === "jumping")
                    fruit.enterState("falling")
            })
        }
    })

    // ==============================
    // States
    // ==============================
    fruit.onStateEnter("jumping", () => {
        fruit.jump(k.height() + 32 + Math.random())
    })

    fruit.onStateEnter("falling", () => {
        fruit.fallingState = true
    })

    // ==============================
    // Collisions
    // ==============================
    fruit.onCollide("fruit", async(fruit) => {
        if(!fruit.cut)
            fuse(fruit)
    });

    fruit.onHoverUpdate(() => {
        if(isPaused) return;

        if(!fruit.cut) {
            k.addKaboom(fruit.pos.clone())
            fruit.destroy()

            // Create a new fruit
            k.add([
                k.sprite(fruit.fruitType),
                k.scale(randomSize()),
                k.pos(fruit.pos.clone()),
                k.anchor("center"),
                k.rotate(k.rand(0, 360)),
                k.move(-1000, 1000),
                k.scale(0.15),
                k.area(),
                k.offscreen({ destroy: true }),
                "fruit",
                {
                    fallingState: false,
                    cut: true,
                }
            ]);

            k.add([
                k.sprite(fruit.fruitType),
                k.scale(randomSize()),
                k.pos(fruit.pos.clone()),
                k.anchor("center"),
                k.rotate(k.rand(0, 360)),
                k.move(-100, 1000),
                k.scale(0.15),
                k.area(),
                k.offscreen({ destroy: true }),
                "fruit",
                {
                    fallingState: false,
                    cut: true,
                }
            ]);

        }

    })



    return fruit;
}
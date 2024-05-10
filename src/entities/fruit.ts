import { k } from "../kaboomContext";

// ==============================
// Variables
// ==============================

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
    const newFruit = k.add([
        k.sprite(randomSprite()),
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
        }
    ]);

    k.addKaboom(newFruit.pos.clone());
    newFruit.jump(k.height() / 1.2);

    return newFruit;
}
// ==============================
// Export
// ==============================

export function createFruit() {
    randomSprite()

    const fruit = k.add([
        k.sprite(randomSprite()),
        k.scale(randomSize()),
        k.pos(randomPosition(), k.height() - 48),
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
        }
    ]);

    k.setGravity(1000)
    fruit.onUpdate(() => {
        fruit.angle += k.dt() * 100

        fruit.onFall(() => {
            if(fruit.state === "jumping") {
                fruit.enterState("falling")
            }
        })
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
        fuse(fruit)
    });

    if (!fruit.isGrounded() && fruit.vel.y < 0) {
		fruit.vel.y -= k.dt() * 100
	}

    fruit.onGround(() => {
        k.wait(0.5, () => {
            fruit.destroy()
        })
    })

    return fruit;
}
import { k } from "../kaboomContext";

// ==============================
// Variables
// ==============================

const turtle = await k.loadSprite("turtle", "/sprites/turtle.png")

// ==============================
// Functions
// ==============================

function randomPosition() {
    return k.rand(0, k.width())
}

function randomSize() {
    return k.rand(24, 48)
}

// ==============================
// Export
// ==============================

export function createFruit() {
    const fruit = k.add([
        k.sprite(turtle),
        k.scale(randomSize() / 24),
        k.pos(randomPosition(), k.height() - 48),
        k.anchor("center"),
        k.rotate(k.rand(0, 360)),
        k.body(),
        k.area(),
        k.offscreen({ destroy: true }),
        "fruit",
    ]);

    fruit.onUpdate(() => {
        fruit.angle += k.dt() * 100
    })

    k.setGravity(1000)
    fruit.jump(k.height() + 32 + Math.random())

    fruit.onCollide("fruit", (fruit) => {
        fruit.destroy()
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
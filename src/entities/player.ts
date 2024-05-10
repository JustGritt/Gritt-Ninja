import { k } from "../kaboomContext";

// ==============================
// Variables
// ==============================

const trail: any = []
const outline = {
	width: 4,
	color: k.rgb(0, 0, 0),
}

const player = k.add([
    k.sprite("player"),
    k.scale(2),
    k.pos(0, 0),
    "player",
    {
        lifes: 3,
    }
]);

// ==============================
// Functions
// ==============================

export function resetPlayer() {
    player.lifes = 3;
}

export function hurt() {
    player.lifes -= 1;

    if (player.lifes <= 0) {
        k.go("gameOver");
    }
}

function playerHUD() {
    k.add([
        k.text("Lifes: " + player.lifes),
        k.pos(32, 32),
        k.fixed(),
        "playerHUD",
    ]);

    k.onUpdate(() => {
        k.get("playerHUD")[0].text = "Lifes: " + player.lifes;
    })
}

function playerTrail() {
	k.drawLines({
		...outline,
		pts: trail,
	})
}

// ==============================
// Export
// ==============================

export function createPlayer() {
    resetPlayer()
    playerHUD()

    // Draw
    k.onDraw(() => {
        playerTrail()
    })

    // Update trail
    k.onUpdate(() => {
        trail.push(k.mousePos())
        if (trail.length > 16) {
            trail.shift()
        }
    })
}
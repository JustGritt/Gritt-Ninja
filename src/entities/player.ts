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

export function updatePlayerLives() {
    k.shake(60)
    player.lifes -= 1;

    if (player.lifes <= 0) {
        // k.go("gameOver");
        player.lifes = 1
    }
}

function playerHUD() {
    k.add([
        k.text("❤️ ❤️ ❤️"),
        k.color(231, 76, 60),
        k.pos(32, 64),
        k.scale(1.2),
        k.fixed(),
        k.z(10),
        "playerHUD",
    ]);

    k.onUpdate(() => {
        k.get("playerHUD")[0].text = "❤️ ".repeat(player.lifes)
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
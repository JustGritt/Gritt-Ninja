import { k } from "../kaboomContext";

let score = 0;

let combo = 0
let multiplier = 1


// ==============================
// Handle Score
// ==============================

export function createScore() {
    const scoreLabel = k.add([
        k.text(score.toString()),
        k.pos(k.width() / 2, 88),
        k.anchor("center"),
        k.fixed(),
        "score"
    ])

    return scoreLabel
}

export function increaseScore(value: number) {
    score += value
    const scoreLabel = k.get("score")
    scoreLabel[0].text = score.toString()

}

// ==============================
// Handle Combo
// ==============================

export function createCombo() {
    const comboBar = k.add([
        k.rect(k.width(), 48),
        k.pos(0, 0),
        k.color(39, 174, 96),
        k.fixed(),
        "combo"
    ])

    const comboLabel = k.add([
        k.text(combo.toString()),
        k.pos(k.width() / 2, 24),
        k.fixed(),
        k.anchor("center"),
        "comboLabel"
    ])

    handleComboBar()

    k.onUpdate(() => {
        k.onKeyPress("c", () => {
            startCombo()
        })
    })

    return comboBar;
}

function handleComboBar() {
    startCombo()
}

function startCombo() {
    combo = 0;
    multiplier = 1;

    const comboBar = k.get("combo")[0];
    let timeElapsed = 0;
    const maxTime = 5000;

    const timer = k.loop(0.1, () => {
        timeElapsed += 100;
        comboBar.width = k.width() * (1 - timeElapsed / maxTime);

        handleComboBarColor()

        if (comboBar.width <= 0) {
            comboBar.width = 0;
            timer.cancel();
        }
    });
}

function handleComboBarColor() {
    const comboBar = k.get("combo")[0];
    const comboBarWidth = comboBar.width;

    if (comboBarWidth > k.width() * 0.66) {
        comboBar.color = k.rgb(39, 174, 96);
    } else if (comboBarWidth > k.width() * 0.33) {
        comboBar.color = k.rgb(241, 196, 15);
    } else {
        comboBar.color = k.rgb(192, 57, 43);
    }
}
export function resetComboBar() {
    const comboBar = k.get("combo")[0];
    comboBar.width = k.width(); // Reset the bar to full width
    comboBar.color = k.color(0, 1, 0); // Optional: change color back if needed
}

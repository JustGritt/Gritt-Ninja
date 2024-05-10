import { k } from "../kaboomContext";

let score = 0;

export function increaseScore() {
    score++;
    scoreLabel.text = score.toString();
}

export const scoreLabel = k.add([
    k.text(score.toString()),
    k.pos(32, 500),
    k.fixed(),
    "score"
]);

import { k } from "../kaboomContext";

export function mousePosition(y: number) {
    k.add([
        k.text("Mouse position: " + k.mousePos().toString()),
        k.pos(32, y),
        k.fixed(),
        "mousePosition",
    ]);

    k.onUpdate(() => {
        k.get("mousePosition")[0].text = "Mouse position: " + k.mousePos().x.toString() + " " + k.mousePos().y.toString();
    })
}

export function numberOfEntities(y: number) {
    k.add([
        k.text("Number of entities: " + k.get("fruit").length.toString()),
        k.pos(32, y),
        k.fixed(),
        "numberOfEntities",
    ]);

    k.onUpdate(() => {
        k.get("numberOfEntities")[0].text = "Number of entities: " + k.get("fruit").length.toString();
    })
}

export function displayDebugInfo() {
    const debugFunctions = [
        mousePosition,
        numberOfEntities,
    ];
    let y = 32;

    debugFunctions.forEach(debugFunction => {
        debugFunction(y);
        y += 40;
    });
}
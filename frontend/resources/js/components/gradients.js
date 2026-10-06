import {CSSComponent} from "./base.js";
import {createLinearGradient, hexToRgba, HEX_COLOR_PATTERN} from "../util.js"

/**
 * A reactive radial gradient component that creates a grid of divs to simulate a radial gradient effect.
 * The gradient reacts to pointer movements, changing the gradient's center based on the pointer's position.
 */
export class ReactiveRadialGradient extends CSSComponent {
    lastGrid = null;

    constructor() {
        super("reactive-radial-gradient");
    }

    modifyElement(domElement) {
        super.modifyElement(domElement);
        if (this.lastGrid != null) {
            this.lastGrid.remove();
        }

        const BAYER = [[0, 2], [3, 1]];
        const CELL = 32;
        const COLOR_FAR = "#2C3A63";
        const COLOR_NEAR = "#FFBF3C";

        let cell = domElement.attributes.getNamedItem("cell");
        if (cell == null) {
            cell = CELL;
        } else {
            cell = cell.value;
        }
        let colorFar = domElement.attributes.getNamedItem("color-far");
        if (colorFar == null) {
            colorFar = COLOR_FAR;
        } else {
            colorFar = colorFar.value;
        }
        let colorNear = domElement.attributes.getNamedItem("color-near");
        if (colorNear == null) {
            colorNear = COLOR_NEAR;
        } else {
            colorNear = colorNear.value;
        }

        const cols = Math.ceil(domElement.clientWidth / cell);
        const rows = Math.ceil(domElement.clientHeight / cell);
        let grid = document.createElement("div");
        grid.classList.add("gradient-grid");
        grid.classList.add("reactive-gradient-grid");
        grid.style.setProperty("--cell", cell.toString());
        grid.style.setProperty("--cols", cols.toString());
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const el = document.createElement("div");
                el.classList.add("reactive-gradient-cell");
                const bias = (BAYER[r % 2][c % 2] / 4 - 0.375) * 0.3;
                el.style.setProperty("--cx", (c + 0.5).toString());
                el.style.setProperty("--cy", (r + 0.5).toString());
                el.style.setProperty("--b", bias.toFixed(3));
                grid.appendChild(el);
            }
        }

        domElement.appendChild(grid);
        this.lastGrid = grid;
        domElement.style.isolation = "isolate";
        domElement.style.position = "relative";
        domElement.style.setProperty("--color-far", colorFar);
        domElement.style.setProperty("--color-near", colorNear);

        // Add event listeners for pointer events
        domElement.addEventListener("pointermove", (e) => {
            const rect = domElement.getBoundingClientRect();
            grid.style.setProperty("--mx", ((e.clientX - rect.left) / cell).toFixed(2));
            grid.style.setProperty("--my", ((e.clientY - rect.top) / cell).toFixed(2));
        });
        domElement.addEventListener("pointerleave", (e) => {
            grid.style.setProperty("--mx", "-99");
            grid.style.setProperty("--my", "-99");
        });
    }
}

/**
 * A linear gradient component that creates a grid of divs to simulate a linear gradient effect.
 */
export class LinearGradient extends CSSComponent {
    lastGrid = null;

    constructor() {
        super("linear-gradient");
    }

    modifyElement(domElement) {
        super.modifyElement(domElement);
        if (this.lastGrid != null) {
            this.lastGrid.remove();
        }

        const BAYER = [[0, 2], [3, 1]];
        const CELL = 32;
        const COLOR_FAR = "#2C3A63";
        const COLOR_NEAR = "#FFBF3C";

        let cell = domElement.attributes.getNamedItem("cell");
        if (cell == null) {
            cell = CELL;
        } else {
            cell = cell.value;
        }
        let colorFar = domElement.attributes.getNamedItem("color-far");
        if (colorFar == null) {
            colorFar = COLOR_FAR;
        } else {
            colorFar = colorFar.value;
        }
        let colorNear = domElement.attributes.getNamedItem("color-near");
        if (colorNear == null) {
            colorNear = COLOR_NEAR;
        } else {
            colorNear = colorNear.value;
        }
        let angle = domElement.attributes.getNamedItem("angle");
        if (angle == null) {
            angle = 0;
        } else {
            angle = parseFloat(angle.value);
        }
        let start = domElement.attributes.getNamedItem("start");
        if (start == null) {
            start = {x: 0, y: 0};
        } else {
            const [x, y] = start.value.split(",").map(parseFloat);
            start = {x, y};
        }
        let colors = domElement.attributes.getNamedItem("colors");
        if (colors == null) {
            colors = [{r: 255, g: 255, b: 255, a: 1.0}, {r: 0, g: 0, b: 0, a: 1.0}];
        } else {
            let tmp = []
            colors = colors.value;
            colors.split(",").forEach(color => {
                color = color.trim();
                if (HEX_COLOR_PATTERN.exec(color)) {
                    tmp.push(hexToRgba(color));
                } else if (color.startsWith("--")) {
                    let _color = getComputedStyle(domElement).getPropertyValue(color).trim();
                    if (HEX_COLOR_PATTERN.exec(_color.trim())) {
                        tmp.push(hexToRgba(_color.trim()));
                    }
                }
            });
            colors = tmp;
        }
        console.log(colors);

        const cols = Math.ceil(domElement.clientWidth / cell);
        const rows = Math.ceil(domElement.clientHeight / cell);
        const colorAt = createLinearGradient(
            {
                start: {x: start.x * cols, y: (1.0 - start.y) * rows},
                angleDeg: angle,
                colors: colors,
                width: cols,
                height: rows
            }
        );
        let grid = document.createElement("div");
        this.lastGrid = grid;
        grid.classList.add("gradient-grid");
        grid.classList.add("linear-gradient-grid");
        grid.style.setProperty("--cell", cell.toString());
        grid.style.setProperty("--cols", cols.toString());
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const el = document.createElement("div");
                const bias = (BAYER[row % 2][col % 2] / 4 - 0.375) * 0.3;
                const {r, g, b, a} = colorAt(col + 0.5, row + 0.5);
                el.style.backgroundColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${(a - bias).toFixed(3)})`;
                grid.appendChild(el);
            }
        }

        domElement.appendChild(grid);
        domElement.style.isolation = "isolate";
        domElement.style.position = "relative";
        domElement.style.setProperty("--color-far", colorFar);
        domElement.style.setProperty("--color-near", colorNear);
    }
}
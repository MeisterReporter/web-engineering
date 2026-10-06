/**
 * @typedef {Object} RGBA
 * @property {number} r - Red channel, 0..255.
 * @property {number} g - Green channel, 0..255.
 * @property {number} b - Blue channel, 0..255.
 * @property {number} a - Alpha channel, 0..1.
 */


/**
 * Creates a function that evaluates a linear gradient at arbitrary points.
 *
 * The gradient line starts at `start` (t = 0) and extends in direction
 * `angleDeg` (CSS convention: 0° = up, clockwise). Its length is chosen so
 * that the box corner the farthest along that direction lies at t = 1.
 * Values outside [0, 1] are clamped. Colors are interpolated in
 * premultiplied-alpha space.
 *
 * @param {Object} options
 * @param {{x: number, y: number}} options.start - Start point (t = 0).
 * @param {number} options.angleDeg - Direction in degrees.
 * @param {RGBA[]} options.colors - Evenly distributed color stops.
 * @param {number} options.width - Box width (same unit as `start`).
 * @param {number} options.height - Box height (same unit as `start`).
 * @returns {(x: number, y: number) => RGBA} Color evaluator.
 */
export function createLinearGradient({start, angleDeg, colors, width, height}) {
    if (!colors.length) throw new Error("At least one color is required.");

    const theta = (angleDeg * Math.PI) / 180;
    const dx = Math.sin(theta);
    const dy = -Math.cos(theta);

    const corners = [[0, 0], [width, 0], [0, height], [width, height]];
    const length = Math.max(
        ...corners.map(([cx, cy]) => (cx - start.x) * dx + (cy - start.y) * dy)
    );

    const stops = colors.map(({r, g, b, a}) => ({
        r: (r / 255) * a,
        g: (g / 255) * a,
        b: (b / 255) * a,
        a,
    }));
    const n = stops.length;

    return function colorAt(x, y) {
        let t = length > 0 ? ((x - start.x) * dx + (y - start.y) * dy) / length : 0;
        t = Math.min(Math.max(t, 0), 1);

        let c;
        if (n === 1) {
            c = stops[0];
        } else {
            const scaled = t * (n - 1);
            const i = Math.min(Math.floor(scaled), n - 2);
            const u = scaled - i;
            const s0 = stops[i];
            const s1 = stops[i + 1];
            c = {
                r: s0.r + u * (s1.r - s0.r),
                g: s0.g + u * (s1.g - s0.g),
                b: s0.b + u * (s1.b - s0.b),
                a: s0.a + u * (s1.a - s0.a),
            };
        }

        if (c.a <= 0) return {r: 0, g: 0, b: 0, a: 0};
        return {r: (c.r / c.a) * 255, g: (c.g / c.a) * 255, b: (c.b / c.a) * 255, a: c.a};
    };
}

/**
 * Matches 3, 4, 6 or 8 hex digits with an optional leading "#".
 * @type {RegExp}
 */
export const HEX_COLOR_PATTERN = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/**
 * Converts a hex color string into an RGBA object.
 *
 * Supported formats (case-insensitive, leading "#" optional):
 * - `#RGB`       (e.g. `#f80`)
 * - `#RGBA`      (e.g. `#f808`)
 * - `#RRGGBB`    (e.g. `#ff8800`)
 * - `#RRGGBBAA`  (e.g. `#ff880080`)
 *
 * If no alpha component is given, alpha defaults to 1 (fully opaque).
 *
 * @param {string} hex - The hex color string to convert.
 * @returns {RGBA} The parsed color with r/g/b in 0..255 and a in 0..1.
 * @throws {TypeError} If `hex` is not a string.
 * @throws {Error} If `hex` is not a valid hex color string.
 *
 * @example
 * hexToRgba('#ff8800');   // { r: 255, g: 136, b: 0, a: 1 }
 * hexToRgba('#f80');      // { r: 255, g: 136, b: 0, a: 1 }
 * hexToRgba('ff880080');  // { r: 255, g: 136, b: 0, a: 0.5019607843137255 }
 */
export function hexToRgba(hex) {
    if (typeof hex !== 'string') {
        throw new TypeError(`Expected a string, received ${typeof hex}.`);
    }

    const match = HEX_COLOR_PATTERN.exec(hex.trim());
    if (!match) {
        throw new Error(`Invalid hex color: "${hex}".`);
    }

    let digits = match[1];

    // Expand shorthand notation (RGB / RGBA) to full form (RRGGBB / RRGGBBAA).
    if (digits.length <= 4) {
        digits = Array.from(digits, (c) => c + c).join('');
    }

    const channel = (start) => parseInt(digits.slice(start, start + 2), 16);

    return {
        r: channel(0),
        g: channel(2),
        b: channel(4),
        a: digits.length === 8 ? channel(6) / 255 : 1,
    };
}
/**
 * Cycles through the given frames at a fixed rate until stopped.
 *
 * @param {HTMLImageElement[]} frames - Frame images in display order.
 * @param {number} fps - Frames per second.
 * @param {(frame: HTMLImageElement) => void} show - Callback that displays a frame.
 * @returns {() => void} Function that stops the animation.
 */
export function startFrameLoop(frames, fps, show) {
    let index = 0;
    const id = setInterval(() => {
        show(frames[index]);
        index = (index + 1) % frames.length;
    }, 1000 / fps);
    return () => clearInterval(id);
}

/**
 * Loads an image from the given path/URL and resolves with its natural dimensions.
 *
 * @param {string} src - Path or URL of the image.
 * @returns {Promise<{ width: number, height: number }>} Natural size in pixels.
 */
export function getImageSize(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () =>
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}
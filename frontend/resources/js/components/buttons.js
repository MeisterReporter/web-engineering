import {CSSComponent} from "./base.js";
import {getImageSize, startFrameLoop} from "../util.js";

/**
 * A button that animates through a series of frames when hovered over.
 */
export class AnimatedButton extends CSSComponent {
    lastFrame = null;

    constructor() {
        super("animated-button");
    }

    modifyElement(domElement) {
        if (this.lastFrame != null) {
            this.lastFrame.remove();
        }

        const fps = domElement.attributes.getNamedItem("fps")?.value ?? 30;
        const size = domElement.attributes.getNamedItem("size")?.value ?? 1;

        const title = domElement.querySelector("#text");
        const frames = Array.from(domElement.querySelectorAll("img"));

        if (frames.length === 0) {
            return;
        }

        let frame = document.createElement("img");
        this.lastFrame = frame;
        frame.classList.add("animated-button");
        frame.classList.add("frame");
        frame.src = frames[0].src;
        frame.alt = "Animated Button Frame";
        getImageSize(frames[0].src).then(({width, height}) => {
            domElement.style.width = `${width * size}px`;
            domElement.style.height = `${height * size}px`;
            title.style.width = `${width * size}px`;
            title.style.lineHeight = `${height * size}px`;
            title.style.textAlign = "center";
        });
        domElement.appendChild(frame);

        let stop = null;
        domElement.addEventListener("mouseenter", () => {
            stop = startFrameLoop(frames, fps, (img) => {
                frame.src = img.src;
            });
        });
        domElement.addEventListener("mouseleave", () => {
            if (stop != null) {
                stop();
            }
        });
    }
}
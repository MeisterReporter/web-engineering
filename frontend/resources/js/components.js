import {ReactiveRadialGradient, LinearGradient} from './components/gradients.js';
import {AnimatedButton} from './components/buttons.js';

const components = [];

function registerComponents() {
    components.push(ReactiveRadialGradient);
    components.push(LinearGradient);
    components.push(AnimatedButton);
}

function initializeComponents() {
    components.forEach((Component) => {
        let c = new Component();
        c.elements.forEach((element) => {
            c.modifyElement(element);
            // Trigger a re-render when the element is resized.
            let rafId = null;
            let lastWidth = -1;
            let lastHeight = -1;
            const o = new ResizeObserver((entries) => {
                const { width, height } = entries[0].contentRect;

                // Skip if the size did not effectively change (e.g. sub-pixel noise).
                if (Math.round(width) === lastWidth && Math.round(height) === lastHeight) {
                    return;
                }
                lastWidth = Math.round(width);
                lastHeight = Math.round(height);

                // Coalesce multiple notifications into a single render per frame.
                if (rafId !== null) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    rafId = null;
                    c.modifyElement(element);
                });
            });
            o.observe(element);
        });
    });
}

// Initialize
addEventListener("DOMContentLoaded", () => {
    registerComponents();
    initializeComponents();
});
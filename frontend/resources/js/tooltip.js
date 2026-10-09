function initializeTooltips() {
    const tooltipTexts = document.querySelectorAll(".tooltip-text");
    tooltipTexts.forEach((tooltipText) => {
        // Set the width of the tooltip text when it is first visible
        new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    const rect = tooltipText.clientWidth;
                    tooltipText.style.setProperty("--tooltip-width", `${rect}px`);
                    observer.disconnect();
                }
            });
        }).observe(tooltipText);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeTooltips();
});
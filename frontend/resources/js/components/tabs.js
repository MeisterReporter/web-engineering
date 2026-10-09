export function findTabsAndInit() {
    const tabContainers = document.querySelectorAll(".tab-pane");
    tabContainers.forEach((container) => {
        const tabs = container.querySelector(".tabs");
        const content = container.querySelector(".content");
        tabs.querySelectorAll(".tab").forEach((tab) => {
            const contentId = tab.attributes.getNamedItem("for")?.value ?? null;
            if (contentId == null) {
                return;
            }

            const contentElement = content.querySelector(`#${contentId}`);
            if (contentElement == null) {
                return;
            }

            tab.addEventListener("click", (e) => {
                e.preventDefault();

                // Deactivate all tabs and hide all content
                tabs.querySelectorAll(".tab").forEach((t) => {
                    t.classList.remove("selected");
                });
                content.querySelectorAll("*").forEach((c) => {
                    c.classList.remove("selected");
                });

                // Activate the clicked tab and show the corresponding content
                tab.classList.add("selected");
                contentElement.classList.add("selected");
            });
        });
        // Select first tab by default
        const firstTab = tabs.querySelector(".tab");
        if (firstTab) {
            firstTab.click();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    findTabsAndInit();
});
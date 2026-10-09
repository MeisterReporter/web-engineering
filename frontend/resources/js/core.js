export function openOverlay(self) {
    if (self == null) {
        console.warn("openOverlay: self is null");
        return;
    }

    let id = self.attributes.getNamedItem("for")?.value ?? null;
    if (id == null) {
        console.warn("openOverlay: for attribute is null");
        return;
    }

    let overlay = document.getElementById(id);
    if (overlay == null) {
        console.warn("openOverlay: could not find overlay with id: " + id);
        return;
    }

    if (overlay.classList.contains("hidden")) {
        overlay.classList.remove("hidden");
    } else {
        overlay.classList.add("hidden");
    }

    overlay.addEventListener("focusout", (e) => {
        if (overlay.contains(e.relatedTarget)) {
            return;
        }
        // Hacky Fix: Delay the hiding by focus-loss, to give the button click a higher priority.
        setTimeout(() => {
            overlay.classList.add("hidden");
        }, 250);
    });
    overlay.focus();

    // TODO: Positioning the overlay relative to the button
    /*if (overlay.classList.contains("trigger-relative")) {
        const rect = self.getBoundingClientRect();
        let top = rect.bottom;
        let left = rect.left + 100;
        const overlayRect = overlay.getBoundingClientRect();

        overlay.style.top = `calc(${top}px)`;
        overlay.style.left = `calc(${left}px)`;
    }*/
}
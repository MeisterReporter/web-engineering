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

export function showInfoLabel(input, message, type = "info", show = true) {
    const id = input.attributes.getNamedItem("id")?.value ?? null;
    if (id == null) {
        throw new Error("showInfoLabel: input must have an id attribute");
    }

    const labels = document.querySelectorAll(`label[for="${id}"]`);
    let label = null;
    labels.forEach((l) => {
        if (label == null && l.classList.contains("info")) {
            label = l;
        }
    });
    if (label == null) {
        throw new Error("showInfoLabel: could not find label for input, id=" + id);
    }

    label.textContent = message;
    label.classList.remove("error", "success", "warning");
    if (type === "warning") {
        label.classList.add("warning");
    } else if (type === "error") {
        label.classList.add("error");
    } else if (type === "success") {
        label.classList.add("success");
    } // else default to info

    if (show) {
        label.classList.add("show");
    } else {
        label.classList.remove("show");
    }
}
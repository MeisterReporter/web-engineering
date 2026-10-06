export class CSSComponent {
    name = null;

    elements = [];

    constructor(className) {
        this.name = className;
        this.findAll();
    }

    /**
     * Finds all components defined by their CSS class name. Saves them for later use in the `elements` property.
     */
    findAll() {
        if (this.name == null) return;

        this.elements = document.querySelectorAll(`.${this.name}`);
    }

    /**
     * Modifies the given DOM Element. This method must be overwritten by subclasses to implement their own behavior.
     * @param domElement
     */
    modifyElement(domElement) {
        // Empty Stub
        throw new Error("modifyElement is not implemented in " + this.constructor.name);
    }
}
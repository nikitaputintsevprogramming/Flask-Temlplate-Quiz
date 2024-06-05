const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        capsKey: null,
    },

    properties: {
        value: "",
        capsLock: false,
        keyboardInputs: null,
        activeElement: null,
        currentLayout: 'en',
        keyLayout: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "caps",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "space", "lang","@"
        ],
        keyLayoutRu: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "caps",
            "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "space", "lang"
        ],
        keyLayoutSymbols: [
            "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
            "`", "~", "-", "_", "=", "+", "[", "]", "{", "}", "caps",
            ";", ":", "'", "\"", "\\", "|", ",", ".", "/", "<", ">", "enter",
            "done", "?", "/", "space", "lang"
        ],
        insertLineBreakAfterKeys: ["backspace", "p", "enter", "?", "}"]
    },

    init() {
        // Create and setup main element
        this.elements.main = document.createElement("div");
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        document.body.appendChild(this.elements.main);

        // Create and setup child container component
        this.elements.keysContainer = document.createElement("div");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.main.appendChild(this.elements.keysContainer);

        // Create and setup key elements
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Open keyboard for elements with .use-keyboard-input
        this.properties.keyboardInputs = document.querySelectorAll(".use-keyboard-input");
        this.properties.keyboardInputs.forEach((element) => {
            element.addEventListener("focus", () => {
                this.properties.activeElement = element;
                this.open(element.value, (currentValue) => {
                    element.value = currentValue;
                });
            });
        });

        // Hide keyboard when clicking outside of the keyboard or input fields
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".keyboard") && !event.target.closest(".use-keyboard-input")) {
                // this.close();
            }
        });
    },

    _createIconHTML(icon_name) {
        return `<span class="material-icons">${icon_name}</span>`;
    },

    _createKeyBtn(iconName, class1, onclick, class2) {
        const keyElement = document.createElement("button");

        // Add common attributes and classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");

        // Add specific listeners and classes
        keyElement.classList.add(class1);
        if (class2) {
            keyElement.classList.add(class2);
        }
        keyElement.innerHTML = this._createIconHTML(iconName);
        keyElement.addEventListener("click", onclick);

        return keyElement;
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = this._getCurrentKeyLayout();

        keyLayout.forEach((key) => {
            const insertLineBreak = this.properties.insertLineBreakAfterKeys.indexOf(key) !== -1;
            let keyElement;

            switch (key) {
                case "backspace":
                    keyElement = this._createKeyBtn(
                        "backspace", "keyboard__key--wide",
                        () => {
                            this.properties.value = this.properties.value.slice(0, -1);
                            this._updateValueInTarget();
                        });
                    break;

                case "caps":
                    keyElement = this._createKeyBtn(
                        "keyboard_capslock", "keyboard__key--activatable",
                        () => {
                            this.elements.capsKey.classList.toggle("keyboard__key--active");
                            this._toggleCapsLock();
                        },
                        "keyboard__key--wide"
                    );
                    this.elements.capsKey = keyElement;
                    break;

                case "enter":
                    keyElement = this._createKeyBtn(
                        "keyboard_return", "keyboard__key--wide",
                        () => {
                            this.properties.value += "\n";
                            this._updateValueInTarget();
                        });
                    break;

                case "space":
                    keyElement = this._createKeyBtn(
                        "space_bar", "keyboard__key--extra--wide",
                        () => {
                            this.properties.value += " ";
                            this._updateValueInTarget();
                        });
                    break;

                case "done":
                    keyElement = this._createKeyBtn(
                        "check_circle", "keyboard__key--dark",
                        () => {
                            this.close();
                            this._updateValueInTarget();
                        },
                        "keyboard__key--wide"
                    );
                    break;

                case "lang":
                    keyElement = this._createKeyBtn(
                        "language", "keyboard__key--wide",
                        () => {
                            this._toggleLanguage();
                        });
                    break;

                default:
                    keyElement = document.createElement("button");
                    keyElement.setAttribute("type", "button");
                    keyElement.classList.add("keyboard__key");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._updateValueInTarget();
                    });
                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _getCurrentKeyLayout() {
        switch (this.properties.currentLayout) {
            case 'ru':
                return this.properties.keyLayoutRu;
            case 'symbols':
                return this.properties.keyLayoutSymbols;
            default:
                return this.properties.keyLayout;
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _updateValueInTarget() {
        if (this.properties.activeElement) {
            this.properties.activeElement.value = this.properties.value;
        }
    },
    
    _toggleLanguage() {
        const currentValue = this.properties.value;
        const activeElement = this.properties.activeElement;
        const isOpen = !this.elements.main.classList.contains("keyboard--hidden");

        switch (this.properties.currentLayout) {
            case 'en':
                this.properties.currentLayout = 'ru';
                break;
            case 'ru':
                this.properties.currentLayout = 'symbols';
                break;
            case 'symbols':
                this.properties.currentLayout = 'en';
                break;
        }

        // Clear previous keys
        this.elements.keysContainer.innerHTML = '';

        // Create new keys
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.properties.value = currentValue;
        this.properties.activeElement = activeElement;
        if (this.properties.activeElement) {
            this.properties.activeElement.value = this.properties.value;
        }

        // Restore keyboard state
        if (isOpen) {
            this.open(this.properties.value);
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.elements.main.classList.remove("keyboard--hidden");

        // Hide send_button
        const sendButton = document.querySelector(".send_button");
        if (sendButton) {
            sendButton.style.display = "none";
        }
    },

    close() {
        this.elements.main.classList.add("keyboard--hidden");

        // Show send_button
        const sendButton = document.querySelector(".send_button");
        if (sendButton) {
            sendButton.style.display = "block";
        }

        // Reset active element
        this.properties.activeElement = null;
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

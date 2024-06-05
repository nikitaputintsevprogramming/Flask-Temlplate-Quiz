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
        insertLineBreakAfterKeys: ["done", "backspace","enter"],
        keyLayout: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "done", 
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",  "backspace",
            "symb", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "caps", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "space", "lang"
        ],
        keyLayoutRu: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "done",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "backspace",
            "symb", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "caps","я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "ё", "-", ".", "space", "lang"
        ],
        keyLayoutSymb: [
            "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "done",
            "-", "_", "+", "=", "{", "}", "[", "]", "|", "\\", "backspace",
            "'", "\"", ":", ";", "<", ">", ",", ".", "?", "!", "enter",
            "caps", "№", "~", "€", "£", "¥", "₽", "/", "₴", "₣", "₤", "₡", "space", "lang"
        ],
        currentLayout: 'en'
    },

    _toggleLanguage() {
        this.properties.currentLayout = this.properties.currentLayout === 'en' ? 'ru' : 'en';
        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
        // Проверяем, активен ли capsLock, и если да, делаем все символы заглавными
        if (this.properties.capsLock) {
            this._toggleCapsLock();
        }
    },
    
    

	init() {
        // create and setup main element
        this.elements.main = document.createElement("div");
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        document.body.appendChild(this.elements.main);
    
        // create and setup child container component
        this.elements.keysContainer = document.createElement("div");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.main.appendChild(this.elements.keysContainer);
    
        // create and setup key elements
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
        // open keyboard for elements with .use-keyboard-input
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
		this.keyElement =
			document.createElement("button");

		// add common attributes and classes
		this.keyElement
			.setAttribute("type", "button");
		this.keyElement
			.classList.add("keyboard__key");

		// add specific listeners and classes
		this.keyElement
			.classList.add(class1, class2);
		this.keyElement.innerHTML =
			this._createIconHTML(iconName);
		this.keyElement
			.addEventListener("click", onclick);
	},

	_createKeys() {
        const fragment = document.createDocumentFragment();
        let keyLayout;
        switch (this.properties.currentLayout) {
            case 'en':
                keyLayout = this.properties.keyLayout;
                break;
            case 'ru':
                keyLayout = this.properties.keyLayoutRu;
                break;
            case 'symb':
                keyLayout = this.properties.keyLayoutSymb;
                break;
            default:
                keyLayout = this.properties.keyLayout;
                break;
        }
    
        keyLayout.forEach((key) => {
            const insertLineBreak = this.properties.insertLineBreakAfterKeys.indexOf(key) !== -1;
    
            switch (key) {
                case "backspace":
                    this._createKeyBtn(
                        "backspace", "keyboard__key--wide",
                        () => {
                            this.properties.value = this.properties.value.slice(0, -1);
                            this._updateValueInTarget();
                        });
                    break;
    
                case "caps":
                    this._createKeyBtn(
                        "keyboard_capslock", "keyboard__key--activatable",
                        () => {
                            this.elements.capsKey.classList.toggle("keyboard__key--active");
                            this._toggleCapsLock();
                        },
                        "keyboard__key--wide"
                    );
                    this.elements.capsKey = this.keyElement;
                    break;
    
                case "enter":
                    this._createKeyBtn(
                        "keyboard_return", "keyboard__key--wide",
                        () => {
                            this.properties.value += "\n";
                            this._updateValueInTarget();
                        });
                    break;
    
                case "space":
                    this._createKeyBtn(
                        "space_bar", "keyboard__key--extra--wide",
                        () => {
                            this.properties.value += " ";
                            this._updateValueInTarget();
                        });
                    break;
    
                case "done":
                    this._createKeyBtn(
                        "check_circle", "keyboard__key--dark",
                        () => {
                            this.close();
                            this._updateValueInTarget();
                        },
                        "keyboard__key--wide"
                    );
                    break;
    
                case "lang":
                    this._createKeyBtn(
                        "language", "keyboard__key--wide",
                        () => {
                            this._toggleLanguage();
                        });
                    break;
    
                case "symb":
                    this._createKeyBtn(
                        "keyboard", "keyboard__key--wide",
                        () => {
                            this._toggleSymbLayout();
                        }
                    );
                    break;
    
                default:
                    this._createKeyBtn();
                    this.keyElement.textContent = key.toLowerCase();
                    this.keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._updateValueInTarget();
                    });
                    break;
            }
    
            fragment.appendChild(this.keyElement);
    
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
    
        return fragment;
    },
    
    _updateValueInTarget() {
        if (this.properties.activeElement) {
            this.properties.activeElement.value = this.properties.value;
        }
    },
    _toggleSymbLayout() {
        if (this.properties.currentLayout === 'symb') {
            this.properties.currentLayout = this.properties.capsLock ? 'en' : 'ru';
        } else {
            this.properties.currentLayout = 'symb';
        }
        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    },
    
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
    
        // Преобразовываем текст всех клавиш в верхний регистр, если capsLock активен
        for (let key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock
                    ? key.textContent.toUpperCase()
                    : key.textContent.toLowerCase();
            }
        }
    },
    

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.elements.main.classList.remove("keyboard--hidden");
    
        // Скрыть кнопку send_button
        const sendButton = document.querySelector(".send_button");
        if (sendButton) {
            sendButton.style.display = "none";
        }
        const switchField = document.querySelector(".switch-field");
        if (switchField) {
            switchField.style.display = "none";
        }
    },

    close() {
        this.elements.main.classList.add("keyboard--hidden");

        // Показать кнопку send_button
        const sendButton = document.querySelector(".send_button");
        if (sendButton) {
            sendButton.style.display = "block";
        }
        const switchField = document.querySelector(".switch-field");
        if (switchField) {
            switchField.style.display = "flex";
        }
        // Сбросить активный элемент
        this.properties.activeElement = null;
    },
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

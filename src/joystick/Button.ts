/**
 * Button Controller 🎮 - A class for on-screen button
 *
 * Button is a ui element for a on-screen button that returns a boolean value when pressed.
 */

/**
 *  Options for the Button Controller
 */
/**
 * Options for configuring a joystick button.
 */
export interface ButtonOptions {
	uid?: string;
	container?: HTMLElement | null;
	top?: string;
	left?: string;
	width: string;
	height: string;
	color?: string;
	shadow?: string;
	rotation?: number;
	// shape config
	radius?: number;
	// svg icon for the button (optional)
	svg?: string;
	// logging
	verboseLogging?: boolean;
	// callbacks
	onPressCallback?: () => void;
	onReleaseCallback?: () => void;
}

/**
 * Button Controller
 */
export class ButtonController {
	// Unique id for the button
	uid: string;
	// Button element container (usually body)
	container: HTMLElement;
	// top position of the button
	top: string;
	// left position of the button
	left: string;
	// width of the button
	width: string;
	// height of the button
	height: string;
	// color of the button
	color: string;
	// shadow of the button
	shadow: string;
	// rotation angle for the button
	rotation: number;
	// radius for rounded button corners
	radius: number;
	// svg icon for the button (optional)
	svg: SVGElement | null;
	// verbose logging
	verboseLogging: boolean;
	// callback function for button press
	onPressCallback: () => void;
	// callback function for button release
	onReleaseCallback: () => void;
	// HTML Base Element
	base: HTMLDivElement;
	// variables for button state
	isPressed: boolean = false;

	/**
	 * Create a new Button Controller
	 *
	 * @param {ButtonOptions} options - Options for the button controller.
	 */
	constructor(options: ButtonOptions) {
		this.uid = options.uid || Math.random().toString(36).substring(7);
		this.container = options.container || document.body;
		this.top = options.top || "50%";
		this.left = options.left || "50%";
		this.width = options.width || "1rem";
		this.height = options.height || "1rem";
		this.color = options.color || "gray";
		this.shadow = options.shadow || ``;
		this.rotation = options.rotation || 0;
		this.radius = options.radius || 5;
		this.svg = options.svg
			? (new DOMParser().parseFromString(options.svg, "image/svg+xml")
					.documentElement as unknown as SVGElement)
			: null;
		this.verboseLogging = options.verboseLogging || false;
		this.onPressCallback =
			options.onPressCallback ||
			(() => {
				if (this.verboseLogging)
					console.log(`[ButtonController:${this.uid}] Button pressed!`);
			});
		this.onReleaseCallback =
			options.onReleaseCallback ||
			(() => {
				if (this.verboseLogging)
					console.log(`[ButtonController:${this.uid}] Button released!`);
			});

		// init base
		this.base = document.createElement("div");
		this.base.id = `ts-button-${this.uid}`;

		// Init
		this.init();
	}

	/**
	 * Log a message
	 * @param message The message to log
	 */
	log(message: string) {
		if (this.verboseLogging)
			console.log(`[ButtonController:${this.uid}] ${message}`);
	}

	/**
	 * Initialize the Button Controller
	 */
	init() {
		// Log
		this.log("Initializing Button Controller...");

		// Check Container Exists
		if (!this.container) {
			throw new Error("Button Container not found!");
		}

		// render button
		this.render();

		// add event handlers
		this.log("Adding Event Handlers...");
		this.container.addEventListener("pointerup", this.onButtonUp.bind(this));
		this.container.addEventListener(
			"pointerdown",
			this.onButtonDown.bind(this)
		);
		// prevent default touch events
		[
			"touchstart",
			"touchmove",
			"touchend",
			"touchcancel",
			"selectstart",
			"contextmenu",
		].forEach((e) =>
			this.container.addEventListener(e, (event) => event.preventDefault())
		);
	}

	/**
	 * Render DOM
	 */
	render() {
		// log
		this.log("Rendering Button...");
		// calculate border radius
		const borderRadius = Math.pow(this.radius / 100, 1.5) * 50;

		// render styles
		this.base.style.position = "absolute";
		this.base.style.top = `calc(${this.top} - ${this.height}/2)`;
		this.base.style.left = `calc(${this.left} - ${this.width}/2)`;
		this.base.style.width = this.width;
		this.base.style.height = this.height;
		this.base.style.border = `4px solid ${this.color}`;
		this.base.style.borderRadius = `${borderRadius}%`;
		this.base.style.zIndex = "1000";
		this.base.style.backgroundColor = this.color;
		this.base.style.backdropFilter = "blur(10px)";
		this.base.style.boxShadow = this.shadow;
		this.base.style.transition = "opacity 0.1s linear";
		this.base.style.opacity = "0.6";
		this.base.style.display = "flex";
		this.base.style.justifyContent = "center";
		this.base.style.alignItems = "center";
		this.base.style.transform = `rotate(${this.rotation}deg)`;

		// if there is a svg icon render it
		if (this.svg) {
			this.base.appendChild(this.svg);
			this.svg.style.cssText = `
              width: fit;
              height: fit;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 1000;
              color: #FFFFFF;
              `;
		}

		// add to container
		this.container.appendChild(this.base);
	}

	// ***<< EVENT HANDLERS >>***

	/**
	 * Handle Button Up
	 *
	 * This function is called when the button is released.
	 */
	onButtonUp() {
		if (!this.isPressed) {
			return;
		}
		this.log("Button Up!");
		this.isPressed = false;
		this.base.style.opacity = "0.6";
		if (this.onReleaseCallback) {
			this.onReleaseCallback.call(this);
		}
	}

	/**
	 * Handle Button Down
	 *
	 * This function is called when the button is pressed.
	 */
	onButtonDown() {
		if (this.isPressed) return;
		this.log("Button Down!");
		this.isPressed = true;
		this.base.style.opacity = "0.8";
		if (this.onPressCallback) {
			this.onPressCallback.call(this);
		}
	}
}

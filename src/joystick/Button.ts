/**
 * Button Controller 🎮 - A class for on-screen button
 *
 * Button is a ui element for a on-screen button that returns a boolean value when pressed.
 */

/**
 * Configuration options for creating a Button instance.
 * @interface ButtonOptions
 *
 * @example
 * ```typescript
 * const buttonOptions: ButtonOptions = {
 *   uid: 'myButton',
 *   width: '64px',
 *   height: '64px',
 *   color: '#ffffff',
 *   radius: 32,
 *   onPressCallback: () => console.log('Button pressed')
 * };
 * ```
 *
 * @property {string} [uid] - Unique identifier for the button
 * @property {HTMLElement | null} [container] - Parent container element to append the button to
 * @property {string} [top] - CSS top position value
 * @property {string} [left] - CSS left position value
 * @property {string} width - CSS width value (required)
 * @property {string} height - CSS height value (required)
 * @property {string} [color] - Button fill color in CSS format
 * @property {string} [shadow] - CSS box-shadow value
 * @property {number} [rotation] - Rotation angle in degrees
 * @property {number} [radius] - Border radius for rounded corners
 * @property {string} [svg] - SVG markup string for custom button icon
 * @property {boolean} [verboseLogging] - Enable detailed console logging
 * @property {() => void} [onPressCallback] - Function to execute when button is pressed
 * @property {() => void} [onReleaseCallback] - Function to execute when button is released
 *
 * @returns {ButtonControllerOptions} Configuration object for button initialization
 *
 * @since 1.0.0
 */
export interface ButtonControllerOptions {
	/** unique identifier for the button */
	uid?: string;
	/** container for the button controller (Optional, default: document.body) */
	container?: HTMLElement | null;
	/** top position of the button controller (Optional, default: "50%") */
	top?: string;
	/** left position of the button controller (Optional, default: "50%") */
	left?: string;
	/** width of the button controller (Required) */
	width: string;
	/** height of the button controller (Required) */
	height: string;
	/** color of the button controller (Optional, default: "gray") */
	color?: string;
	/** shadow of the button controller (Optional, default: "") */
	shadow?: string;
	/** rotation angle for the button controller (Optional, default: 0) */
	rotation?: number;
	/** radius for rounded button corners (Optional, default: 5) */
	radius?: number;
	/** svg icon for the button controller (Optional, default: null) */
	svg?: string;
	/** enable verbose logging (Optional, default: false) */
	verboseLogging?: boolean;
	/** callback function for button press event (Optional) */
	onPressCallback?: () => void;
	/** callback function for button release event (Optional) */
	onReleaseCallback?: () => void;
}

/**
 * A controller class for creating and managing interactive buttons in the DOM.
 *
 * @example
 * ```typescript
 * const button = new ButtonController({
 *   uid: 'my-button',
 *   container: document.querySelector('.button-container'),
 *   top: '20%',
 *   left: '30%',
 *   width: '4rem',
 *   height: '4rem',
 *   color: '#FF0000',
 *   shadow: '0 0 10px rgba(0,0,0,0.5)',
 *   rotation: 45,
 *   radius: 10,
 *   svg: '<svg>...</svg>',
 *   verboseLogging: true,
 *   onPressCallback: () => console.log('Button pressed'),
 *   onReleaseCallback: () => console.log('Button released')
 * });
 * ```
 *
 * @interface ButtonOptions
 * @property {string} [uid] - Unique identifier for the button. Defaults to random string.
 * @property {HTMLElement} [container] - Container element for the button. Defaults to document.body.
 * @property {string} [top='50%'] - Top position of the button.
 * @property {string} [left='50%'] - Left position of the button.
 * @property {string} [width='1rem'] - Width of the button.
 * @property {string} [height='1rem'] - Height of the button.
 * @property {string} [color='gray'] - Color of the button.
 * @property {string} [shadow=''] - CSS box-shadow property value.
 * @property {number} [rotation=0] - Rotation angle in degrees.
 * @property {number} [radius=5] - Border radius (0-100).
 * @property {string} [svg] - SVG string to be used as button icon.
 * @property {boolean} [verboseLogging=false] - Enable detailed console logging.
 * @property {() => void} [onPressCallback] - Callback function for button press event.
 * @property {() => void} [onReleaseCallback] - Callback function for button release event.
 *
 * @throws {Error} Throws an error if the container element is not found.
 *
 * @remarks
 * The ButtonController creates a customizable, interactive button element that can be positioned
 * anywhere in the DOM. It handles touch and pointer events, supports SVG icons, and provides
 * press/release callbacks. The button appearance can be extensively customized through the
 * options parameter.
 *
 * @public
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
	 * @param {ButtonControllerOptions} options - Options for the button controller.
	 */
	constructor(options: ButtonControllerOptions) {
		this.uid = options.uid || Math.random().toString(36).substring(7);
		this.container = options.container || document.body;
		this.top = options.top || "50%";
		this.left = options.left || "50%";
		this.width = options.width || "1rem";
		this.height = options.height || "1rem";
		this.color = options.color || "gray";
		this.shadow = options.shadow || "";
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
	 * Logs a message to the console if verbose logging is enabled.
	 * @param message - The message to log
	 * @example
	 * ```ts
	 * button.log("Button pressed"); // Logs: [ButtonController:123] Button pressed
	 * ```
	 * @returns {void}
	 */
	log(message: string): void {
		if (this.verboseLogging)
			console.log(`[ButtonController:${this.uid}] ${message}`);
	}

	/**
	 * Initializes the button controller by setting up necessary event handlers and rendering the button.
	 *
	 * @throws {Error} When button container is not found
	 * @returns {void}
	 */
	init(): void {
		// Log
		this.log("Initializing Button Controller...");

		// Check Container Exists
		if (!this.container) {
			throw new Error("Button Container not found!");
		}

		// render button
		this.render();

		// Touch Events
		this.base.addEventListener('touchstart', (e) => {
			e.preventDefault();
			this.onButtonDown();
		});

		this.base.addEventListener('touchend', (e) => {
			e.preventDefault();
			this.onButtonUp();
		});

		// Mouse Events
		this.base.addEventListener('mousedown', () => this.onButtonDown());
		this.base.addEventListener('mouseup', () => this.onButtonUp());
		// monkey patch for when clicked and dragged out of button
		this.base.addEventListener('mouseleave', () => this.onButtonUp());

		// Prevent text selection
		this.base.addEventListener('selectstart', (e) => e.preventDefault());
	}

	/**
	 * Renders the button element with specified styles and SVG icon if provided
	 *
	 * @returns {void}
	 */
	render(): void {
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
			this.svg.style.width = "fit-content";
			this.svg.style.height = "fit-content";
			this.svg.style.position = "absolute";
			this.svg.style.top = "50%";
			this.svg.style.left = "50%";
			this.svg.style.transform = "translate(-50%, -50%)";
			this.svg.style.zIndex = "1000";
			this.svg.style.color = "#FFFFFF";
		}

		// add to container
		this.container.appendChild(this.base);
	}

	// ***<< EVENT HANDLERS >>***

	/**
	 * Handles the button release event.
	 *
	 * @returns {void}
	 */
	onButtonUp(): void {
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
	 * Handles button down event.
	 * Sets button state to pressed and triggers callback if defined.
	 *
	 * @returns {void}
	 */
	onButtonDown(): void {
		if (this.isPressed) return;
		this.log("Button Down!");
		this.isPressed = true;
		this.base.style.opacity = "0.8";
		if (this.onPressCallback) {
			this.onPressCallback.call(this);
		}
	}
}

/**
 * RetrackableSlider Controller 🎮 - A class for on-screen retractable slider.
 *
 * A slider is a slider that retracts back to 0 when released.
 */

/**
 * Represents the direction of the retractable slider.
 *
 * @typedef {("vertical" | "horizontal")} direction
 * @property {"vertical"} vertical - Indicates the slider moves vertically.
 * @property {"horizontal"} horizontal - Indicates the slider moves horizontally.
 */
export type direction = "vertical" | "horizontal";

/**
 * Options for configuring the RetractableSlider Controller.
 *
 * @interface RetrackableSliderOptions
 * @property {string} [uid] - Unique identifier for the slider
 * @property {HTMLElement | null} [container] - Container element for the slider. Defaults to document.body
 * @property {string} [top="50%"] - Top position of the slider
 * @property {string} [left="50%"] - Left position of the slider
 * @property {string} [width="100px"] - Width of the slider
 * @property {string} [height="500px"] - Height of the slider
 * @property {string} [color] - Color of the slider
 * @property {string} [borderColor="gray"] - Border color of the slider
 * @property {string} [borderWidth="2px"] - Border width of the slider
 * @property {string} [borderRadius="2px"] - Border radius of the slider
 * @property {direction} [direction="vertical"] - Direction of slider movement ("vertical" | "horizontal")
 * @property {function} [onSlideCallback] - Callback function triggered during sliding, receives current value
 * @property {function} [onReleaseCallback] - Callback function triggered when slider is released
 * @property {boolean} [verboseLogging=false] - Enable verbose logging for debugging
 *
 * @example
 * ```typescript
 * const options: RetrackableSliderOptions = {
 *   uid: "slider1",
 *   container: document.getElementById("container"),
 *   top: "100px",
 *   left: "200px",
 *   width: "150px",
 *   height: "400px",
 *   color: "#FF0000",
 *   direction: "vertical"
 * };
 * ```
 */
export interface RetrackableSliderOptions {
	/** unique id for the slider */
	uid?: string;
	/** container element of the slider (default: body) */
	container?: HTMLElement | null;
	/** top position of the slider (default: 50%) */
	top?: string;
	/** left position of the slider (default: 50%) */
	left?: string;
	/** width: width of the slider (default: 100px) */
	width?: string;
	/** height: height of the slider (default: 500px) */
	height?: string;
	/** color of the slider */
	color?: string;
	/** border color of the slider (default: gray) */
	borderColor?: string;
	/** border width of the slider (default: 2px) */
	borderWidth?: string;
	// border radius (default: 2px)
	borderRadius?: string;
	/** direction of the slider to rotate (default: vertical) */
	// can be either vertical or horizontal
	direction?: direction;
	/** onSlideCallback is called when the slider cursor is moved */
	onSlideCallback?: (value: number) => void;
	/** onReleaseCallback is called when the slider is released */
	onReleaseCallback?: () => void;
	/** verbose logging (default: false) */
	verboseLogging?: boolean;
}

/**
 * A customizable slider component that retracts to its initial position when released.
 *
 * @remarks
 * The RetractableSlider provides a UI component that can be used for temporary input,
 * like joystick controls or temporary value adjustments.
 *
 * @example
 * ```typescript
 * const slider = new RetrackableSlider({
 *   container: document.getElementById('container'),
 *   direction: 'vertical',
 *   onSlideCallback: (value) => console.log(value)
 * });
 * ```
 *
 * @property {string} [uid] - Unique identifier for the slider
 * @property {HTMLElement} [container=document.body] - Container element for the slider
 * @property {string} [top='50%'] - Top position of the slider
 * @property {string} [left='50%'] - Left position of the slider
 * @property {string} [width='1rem'] - Width of the slider
 * @property {string} [height='5rem'] - Height of the slider
 * @property {string} [color='gray'] - Background color of the slider
 * @property {string} [borderColor='gray'] - Border color of the slider
 * @property {string} [borderWidth='2px'] - Border width of the slider
 * @property {string} [borderRadius='2px'] - Border radius of the slider
 * @property {('vertical'|'horizontal')} [direction='vertical'] - Direction of slider movement
 * @property {(value: number) => void} [onSlideCallback] - Callback function when sliding
 * @property {() => void} [onReleaseCallback] - Callback function when released
 * @property {boolean} [verboseLogging=false] - Enable verbose console logging
 */
export class RetrackableSlider {
	// uid - unique id of the slider
	uid: string;
	// container - container element for the slider
	container: HTMLElement;
	// top - top position of the slider
	top: string;
	// left - left position of the slider
	left: string;
	// width - width of the slider
	width: string;
	// height - height of the slider
	height: string;
	// color - color of the slider
	color: string;
	// border color - border color of the slider
	borderColor: string;
	// border width - border width of the slider
	borderWidth: string;
	// border radius - border radius of the slider
	borderRadius: string;
	// direction of the slider
	direction: string;
	// callbacks
	// onSlide - callback when the slider is sliding
	onSlideCallback?: (value: number) => void;
	// onRelease - callback when the slider is released
	onReleaseCallback?: () => void;

	// verbose logging
	verboseLogging: boolean;

	// variables
	base: HTMLDivElement;
	baseSlider: HTMLDivElement;
	baseRect: DOMRect | undefined;
	// isPressed - flag to check if the slider is pressed
	isPressed: boolean;
	// slider value
	valuePercent: number;

	/**
	 * Create a new RetractableSlider Controller.
	 * @param options - Options for configuring the RetractableSlider
	 */
	constructor(options: RetrackableSliderOptions) {
		// set uid or generate a new one
		this.uid = options.uid || Math.random().toString(36).substring(7);
		// container
		this.container = options.container || document.body;
		// top
		this.top = options.top || "50%";
		// left
		this.left = options.left || "50%";
		// width
		this.width = options.width || "1rem";
		// height
		this.height = options.height || "5rem";
		// color
		this.color = options.color || "gray";
		// border color
		this.borderColor = options.borderColor || "gray";
		// border width
		this.borderWidth = options.borderWidth || "2px";
		// border radius
		this.borderRadius = options.borderRadius || "2px";
		// direction
		this.direction = options.direction || "vertical";
		// assert that diretion is either vertical or horizontal

		// callbacks
		this.onSlideCallback =
			options.onSlideCallback ||
			((value: number) => {
				console.log(`[RetrackableSlider:${this.uid}] Sliding: ${value}`);
			});
		this.onReleaseCallback =
			options.onReleaseCallback ||
			(() => {
				console.log(`[RetrackableSlider:${this.uid}] Released`);
			});

		// verbose logging
		this.verboseLogging = options.verboseLogging || false;
		// is pressed
		this.isPressed = false;
		// value
		this.valuePercent = 0;

		// create a base
		this.base = document.createElement("div");
		this.base.id = `ts-retrackable-slider-${this.uid}`;
		this.baseSlider = document.createElement("div");
		this.baseSlider.id = `ts-retrackable-slider-${this.uid}-cursor`;

		// call init
		this.init();
	}

	/**
	 * Logs a message to the console if verbose logging is enabled.
	 * This message is prefixed with the controller's unique identifier.
	 * @param message - The message to be logged
	 * @example
	 * ```typescript
	 * const slider = new RetractableSlider();
	 * slider.log("Slider initialized"); // [RetrackableSlider:123] Slider initialized
	 * ```
	 *
	 * @returns {void}
	 */
	log(message: string) {
		if (this.verboseLogging) {
			console.log(`[RetrackableSlider:${this.uid}] ${message}`);
		}
	}

	/**
	 * Initializes the retractableslider controller.
	 * This method is called automatically when the retractableslider is constructed.
	 *
	 * @throws {Error} Throws an error if the container element is not found.
	 * @returns {void}
	 */
	init(): void {
		// log
		this.log("Initializing RetrackableSlider...");

		// Check Container Exists
		if (!this.container) {
			throw new Error("Button Container not found!");
		}

		// Render Styles for the Slider
		this.base.style.position = "absolute";
		this.base.style.top = `calc(${this.top} - ${this.height}/2)`;
		this.base.style.left = `calc(${this.left} - ${this.width}/2)`;
		this.base.style.width = this.width;
		this.base.style.height = this.height;
		this.base.style.border = `${this.borderWidth} solid ${this.borderColor}`;
		this.base.style.borderRadius = this.borderRadius;
		this.base.style.touchAction = "none";
		this.base.style.userSelect = "none";
		this.base.style.boxSizing = "border-box";
		this.base.style.overflow = "hidden";

		// Render Styles for the Slider Cursor
		this.baseSlider.style.position = "absolute";
		this.baseSlider.style.background = this.color;
		this.baseSlider.style.pointerEvents = "none";

		// set constants for the slider according to the direction
		if (this.direction === "vertical") {
			// fix base
			this.baseSlider.style.bottom = "0";
			// fix
			this.baseSlider.style.width = "100%";
			// variable
			this.baseSlider.style.height = "0%";
		} else {
			// fix base
			this.baseSlider.style.left = "0";
			// fix
			this.baseSlider.style.height = "100%";
			// variable
			this.baseSlider.style.width = "0%";
		}

		this.base.appendChild(this.baseSlider);
		this.container.appendChild(this.base);

		// add event listeners
		// Mouse and touch events
		this.base.addEventListener("pointerup", this.onSliderUp.bind(this));
		this.base.addEventListener("pointerdown", this.onSliderDown.bind(this));
		this.base.addEventListener("pointermove", this.onSliderMove.bind(this));
		// release if out of bounds
		this.base.addEventListener("pointercancel", this.onSliderUp.bind(this));

		// Window resize event
		window.addEventListener("resize", this.updateContainerRectangle.bind(this));

		// Prevent select context events
		this.base.addEventListener("selectstart", (e: Event) => e.preventDefault());
		this.base.addEventListener("contextmenu", (e: Event) => e.preventDefault());
		// monkey patch preventDefault for touch events (on mobile devies)
		this.base.addEventListener("touchstart", (e: TouchEvent) => {
			e.preventDefault();
		});
	}

	/**
	 * Updates the slider ui.
	 *
	 * @returns {void}
	 */
	updateUI(): void {
		// log
		this.log("Updating UI...");

		// set opacity and position
		if (this.direction === "vertical") {
			// change height only
			this.baseSlider.style.height = `${this.valuePercent}%`;
		} else {
			// change width only
			this.baseSlider.style.width = `${this.valuePercent}%`;
		}
	}

	/**
	 * Update Container Rectangle
	 *
	 * Updaate the base rectangle bounds for the slider to calculate the position of the cursor.
	 *
	 * @returns {void}
	 */
	updateContainerRectangle(): void {
		this.baseRect = this.base.getBoundingClientRect();
	}

	// ***<< EVENT HANDLERS >>***

	/**
	 * Handles the Slider Up event.
	 *
	 * This event is triggered when the slider is released.
	 * @returns {void}
	 */
	onSliderUp(e: PointerEvent): void {
		// log
		this.log("Slider Up");

		// prevent default
		e.preventDefault();

		// set isPressed to false
		this.isPressed = false;

		// reset value
		if (this.valuePercent !== 0) {
			this.valuePercent = 0;
			this.updateUI();
			// call callbacks
			if (this.onReleaseCallback) {
				this.onReleaseCallback.call(this);
			}
		}
	}

	/**
	 * Handles the Slider Down event.
	 *
	 * This event is triggered when the slider is pressed.
	 * @returns {void}
	 */
	onSliderDown(e: PointerEvent): void {
		// log
		this.log("Slider Down");

		// prevent default
		e.preventDefault();

		// set isPressed to true
		this.isPressed = true;
		this.base.setPointerCapture(e.pointerId);

		// call set value
		this.setSliderValue(e);
	}

	/**
	 * Handles the Slider Move event.
	 *
	 * This event is triggered when the slider is moved.
	 * @returns {void}
	 */
	onSliderMove(e: PointerEvent): void {
		// prevent default
		e.preventDefault();

		// check if the slider is pressed
		if (!this.isPressed) return;

		// set value
		this.setSliderValue(e);
	}

	/**
	 * Set Value of the Slider
	 *
	 * Set the value of the slider based on the pointer event.
	 * @param e - Pointer Event
	 * @returns {void}
	 */
	setSliderValue(e: PointerEvent): void {
		// update container rectangle
		this.updateContainerRectangle();

		// calculate the value
		let value = 0;
		if (this.direction === "vertical") {
			value =
				100 - ((e.clientY - this.baseRect!.top) / this.baseRect!.height) * 100;
		} else {
			value = ((e.clientX - this.baseRect!.left) / this.baseRect!.width) * 100;
		}

		// clamp the value
		value = Math.round(Math.max(0, Math.min(100, value)));

		// set value if not changed
		if (this.valuePercent !== value) {
			this.valuePercent = value;
			this.updateUI();
			this.log(`Slider Value: ${this.valuePercent}`);
			// call callbacks
			if (this.onSlideCallback) {
				this.onSlideCallback.call(this, this.valuePercent);
			}
		}
	}
}

/**
 * D-pad Controller 🎮 - A class for on-screen Directional Pad
 *
 * D-pad is a ui element for a on-screen directional pad that returns a directional value when pressed.
 */


/**
 * SVG path data for a D-pad (directional pad) control.
 * Each property contains path data that draws a directional arrow.
 * 
 * @interface DpadPathData
 * @property {string} up - SVG path data for upward arrow 
 * @property {string} right - SVG path data for rightward arrow
 * @property {string} down - SVG path data for downward arrow
 * @property {string} left - SVG path data for leftward arrow
 */
const pathData = {
	up: "M264,30.79a19.8,19.8,0,0,0-28,0L172.64,94.17A173.44,173.44,0,0,1,232,76.58L236.58,72a19.8,19.8,0,0,1,28,0L269,76.46A173,173,0,0,1,325.21,92Z",
	right:
		"M469.21,236l-60.09-60.09a172.59,172.59,0,0,1,15.55,56.17l3.36,3.35a19.8,19.8,0,0,1,0,28l-3.23,3.23a173.18,173.18,0,0,1-15.68,57.43L469.21,264A19.8,19.8,0,0,0,469.21,236Z",
	down: "M267.79,423.67,263.42,428a19.8,19.8,0,0,1-28,0l-4.75-4.76a172.91,172.91,0,0,1-58.05-17.44L236,469.21a19.8,19.8,0,0,0,28,0L325.21,408A173.43,173.43,0,0,1,267.79,423.67Z",
	left: "M72,264.56a19.8,19.8,0,0,1,0-28l5.75-5.75A173.15,173.15,0,0,1,95.3,171.51L30.79,236a19.8,19.8,0,0,0,0,28l64.51,64.5a173.08,173.08,0,0,1-17.44-58Z",
};

/**
 * Represents the possible directions for a digital pad (D-pad) input.
 */
type direction =
	| "center"
	| "up"
	| "down"
	| "left"
	| "right"
	| "up-right"
	| "down-right"
	| "up-left"
	| "down-left";


/**
 * Configuration options for the D-pad controller
 * 
 * @interface DpadOptions
 * @property {string} [uid] - Unique identifier for the D-pad instance
 * @property {HTMLElement | null} [container=document.body] - DOM element to contain the D-pad
 * @property {string} [top="50%"] - Vertical position of the D-pad
 * @property {string} [left="50%"] - Horizontal position of the D-pad
 * @property {number} [radius=2] - Radius of the D-pad in rem units
 * @property {string} [colorBase="#262626"] - Base color of the D-pad handle
 * @property {string} [colorsPressed="#060606"] - Color of the D-pad handle when pressed
 * @property {number} [centerRadiusThreshold=0.25] - Threshold radius for center position detection
 * @property {(direction: direction | string) => void} [onPressCallback] - Callback fired when D-pad is pressed
 * @property {(direction: direction | string) => void} [onReleaseCallback] - Callback fired when D-pad is released
 * @property {boolean} [verboseLogging=false] - Enable detailed logging for debugging
 * @property {boolean} [keyRepeat=false] - Enable repeated key press events
 * @property {number} [rotation=0] - Rotation angle in degrees for landscape orientation
 * 
 * @example
 * ```typescript
 * const options: DpadOptions = {
 *   container: document.getElementById('dpad-container'),
 *   radius: 50,
 *   colorBase: '#333333',
 *   onPressCallback: (direction) => console.log(`Pressed ${direction}`)
 * }
 * ```
 */
interface DpadOptions {
	/** unique identifier for the D-pad controller (Optional, default: random string) */
	uid?: string;
	/** container for the D-pad controller (Optional, default: document.body) */
	container?: HTMLElement | null;
	/** top position of the D-pad controller (Optional, default: "50%") */
	top?: string;
	/** left position of the D-pad controller (Optional, default: "50%") */
	left?: string;
	/** radius of the D-pad controller (Optional, default: 2rem) */
	radius?: number;
	/** handle colors (Optional, default: "#262626") */
	colorBase?: string;
	/** pressed handle colors (Optional, default: "#060606") */
	colorsPressed?: string;
	/** center radius threshold (Optional, default: 0.25) */
	centerRadiusThreshold?: number;
	/** onPressCallback is called when the D-pad is pressed.
	 * directions can be {direction} {"center", "up", "right", "down", "left", "up-right", "down-right", "down-left", "up-left" }
	*/
	onPressCallback?: (direction: direction | string) => void;
	/** onReleaseCallback is called when the D-pad is released.
	 * directions can be only {"center"}
	 */
	onReleaseCallback?: (direction: direction | string) => void;
	/** verbose logging (Optional, default: false) */
	verboseLogging?: boolean;
	/** key repeat (repeat key press) (Optional, default: false) */
	keyRepeat?: boolean;
	/** rotation degree (for rotated D-pad on landscape mode) (Optional, default: 0) */
	rotation?: number;
}

/**
 * DpadController - A class that creates and manages a D-pad (directional pad) controller interface.
 * 
 * @example
 * ```typescript
 * const dpad = new DpadController({
 *   container: document.getElementById('container'),
 *   radius: 100,
 *   colorBase: '#333',
 *   colorPressed: '#666',
 *   onPressCallback: (direction) => console.log(`Pressed ${direction}`),
 *   rotation: 45 // 45 degree rotation
 * });
 * ```
 * 
 * @property {string} uid - Unique identifier for the D-pad controller
 * @property {HTMLElement} container - DOM element that will contain the D-pad
 * @property {string} top - CSS top position of the D-pad
 * @property {string} left - CSS left position of the D-pad
 * @property {number} radius - Size of the D-pad in pixels
 * @property {string} colorBase - Color of the D-pad when not pressed
 * @property {string} colorPressed - Color of the D-pad when pressed
 * @property {number} centerThreshold - Threshold radius for registering input (0-1)
 * @property {(direction: direction) => void} onPressCallback - Callback function when direction is pressed
 * @property {(direction: direction) => void} onReleaseCallback - Callback function when direction is released
 * @property {boolean} verboseLogging - Enable detailed console logging
 * @property {SVGElement} base - The main SVG element of the D-pad
 * @property {direction} currentDirection - Current active direction
 * @property {Object.<string, SVGPathElement>} basePaths - SVG path elements for each direction
 * @property {number} pointerId - Current active pointer ID
 * @property {DOMRect} baseRect - Bounding rectangle of the D-pad
 * @property {number} inputRegisterDistance - Distance threshold for input registration
 * @property {boolean} isPressed - Whether the D-pad is currently pressed
 * @property {boolean} keyRepeat - Whether to allow continuous key press events
 * @property {number} rotation - Rotation angle of the D-pad in degrees
 */
export class DpadController {
	// Unique id for the D-pad controller
	uid: string;
	// D-pad controller container
	container: HTMLElement;
	// top position of the D-pad controller
	top: string;
	// left position of the D-pad controller
	left: string;
	// width of the D-pad controller
	radius: number;
	// base color of the D-pad handles
	colorBase: string;
	// pressed color of the D-pad handles
	colorPressed: string;
	// center radius threshold out of this bound it counts as input
	centerThreshold?: number;
	// callback triggered when a direction is pressed
	onPressCallback: (direction: direction) => void;
	// callback triggered when a direction is released
	onReleaseCallback: (direction: direction) => void;
	// verbose logging for debugging
	verboseLogging: boolean;
	// variables
	base: SVGElement;
	currentDirection: direction = "center";
	basePaths: { [key: string]: SVGPathElement };
	pointerId: number = -1;
	baseRect: DOMRect | undefined;
	inputRegisterDistance: number = 0;
	isPressed: boolean;
	keyRepeat?: boolean;
	// rotation degree
	rotation: number;

	/**
	 * Create a new D-pad controller
	 * @param {DpadOptions} options - D-pad controller options
	 */
	constructor(options: DpadOptions) {
		this.uid = options.uid || Math.random().toString(36).substring(7);
		this.container = options.container || document.body;
		this.top = options.top || "50%";
		this.left = options.left || "50%";
		this.radius = options.radius || 5;
		this.colorBase = options.colorBase || "gray";
		this.colorPressed = options.colorsPressed || "rgb(69 69 69)";
		this.centerThreshold =
			options.centerRadiusThreshold == undefined
				? 0.25
				: options.centerRadiusThreshold;
		// verbose logging
		this.verboseLogging = options.verboseLogging || false;
		// callbacks
		this.onPressCallback =
			options.onPressCallback ||
			((direction: direction) => {
				if (this.verboseLogging)
					console.log(
						`[DpadController:${this.uid}] pressed direction ${direction}!`
					);
			});
		this.onReleaseCallback =
			options.onReleaseCallback ||
			((direction: direction) => {
				if (this.verboseLogging)
					console.log(
						`[DpadController:${this.uid}] released direction ${direction}!`
					);
			});
		this.isPressed = false;
		this.keyRepeat = options.keyRepeat || false;

		// create a base
		this.base = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.base.id = `ts-dpad-${this.uid}`;
		this.basePaths = {};
		// rotation
		this.rotation = options.rotation || 0;

		// init
		this.init();
	}

	/**
	 * Logs a message to the console if verbose logging is enabled.
	 * @param message - The message to log
	 * @example
	 * ```ts
	 * dpad.log("D-Pad Button pressed"); // Logs: [DpadController:123] D-Pad Button pressed
	 * ```
	 * @returns {void}
	 */
	log(message: string): void {
		if (this.verboseLogging)
			console.log(`[DpadController:${this.uid}] ${message}`);
	}

	/**
	 * Initializes the D-pad component by setting up the base element and event listeners.
	 * This method should be called after the component is constructed.
	 * 
	 * @throws {Error} When D-pad container is not found
	 * @throws {Error} When D-pad elements could not be created
	 * @returns {void}
	 */
	init(): void {
		// init
		this.log("Init");

		// pre init checks
		if (!this.container) {
			throw new Error("D-Pad Container not found!");
		}
		// check base
		if (!this.base) {
			throw new Error(
				"D-pad elements could not be created. Please check your container element."
			);
		}

		// render
		this.render();

		// add event handlers
		this.base.addEventListener("pointerdown", this.onDpadDown.bind(this));
		this.base.addEventListener("pointermove", this.onDpadMove.bind(this));
		this.base.addEventListener("pointerup", this.onDpadUp.bind(this));
		this.base.addEventListener("touchstart", (e: TouchEvent) => {
			this.onDpadDown(e);
		});
		this.base.addEventListener("touchend", (e: TouchEvent) => {
			e.preventDefault();
			this.onDpadUp(e);
		});
		this.base.addEventListener("selectstart", (e: Event) => {
			e.preventDefault();
		});
		this.base.addEventListener("contextmenu", (e: Event) => {
			e.preventDefault();
		});
	}

	/**
	 * Render the d-pad element
	 * 
	 * @returns {void}
	 */
	render(): void {
		// Check if base already exist
		if (!this.base) {
			throw new Error(
				"D-pad elements could not be created. Please check your container element."
			);
		}

		// Render Styles for the D-pad
		this.base.setAttribute("viewBox", "0 0 450 450");
		this.base.style.position = "absolute";
		this.base.style.width = `${this.radius}px`;
		this.base.style.height = `${this.radius}px`;
		this.base.style.top = this.top;
		this.base.style.left = this.left;
		this.base.style.transform = `translate(-50%, -50%) rotate(${this.rotation}deg)`;
		this.base.style.zIndex = "1000";
		this.base.style.opacity = "0.5";
		this.base.style.transition = "opacity 0.3s ease-out";

		// Draw D-pad Paths
		for (const [direction, d] of Object.entries(pathData)) {
			const path = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"path"
			);
			path.id = "dpad-path-" + direction;
			path.setAttribute("d", d);
			path.setAttribute("transform", "translate(-25, -25)");
			path.style.fill = this.colorBase;
			path.style.transition = "fill 0.2s ease";
			path.style.backdropFilter = "blur(5px)";
			this.base.appendChild(path);
			this.basePaths[direction] = path;
		}

		// add to container
		this.container.appendChild(this.base);
	}

	/**
	 * Update Contaier Rectangle
	 *
	 * This method is called ot recalculate the container element size
	 * it updates the containerRect property which is used to determine the manimum
	 * distance the d-pad handle can move from the center of the d-pad
	 * 
	 * @returns {void}
	 */
	updateContainerRectangle(): void {
		this.baseRect = this.base.getBoundingClientRect();
		// Calculate the radius of the d-pad
		// Half of the minimum dimension (width or height) of the container
		this.inputRegisterDistance =
			(Math.min(this.baseRect.width, this.baseRect.height) / 2) *
			this.centerThreshold!;
	}

	// ***<< EVENT HANDLERS >>***

	/**
	 * Update D-Pad UI After Pointer Events
	 *
	 * Change the pointer colors according to the direction
	 * @returns {void}
	 */
	updateDpadUI(): void {
		// for each base path
		Object.entries(this.basePaths).forEach(([direction, path]) => {
			if (this.currentDirection.includes(direction)) {
				path.style.fill = this.colorPressed;
			} else {
				path.style.fill = this.colorBase;
			}
		});
	}

	/**
	 * Reset D-Pad After Pointer Events
	 *
	 * Resets the D-pad colors
	 * @returns {void}
	 */
	resetDpad(): void {
		this.log("D-pad reset...");
		// reset the colors
		Object.values(this.basePaths).forEach((path) => {
			path.style.fill = this.colorBase;
		});
		this.base.style.opacity = "0.5";
	}

	/**
	 * Handles the Pointer Up Event
	 *
	 * Triggers when pointer is released
	 * @returns {void}
	 */
	onDpadUp(_: PointerEvent | TouchEvent): void {
		this.log("Pointer Up!");
		// reset for pointer event
		this.isPressed = false;
		this.pointerId = -1;
		this.resetDpad();

		// release callback
		this.currentDirection = "center";
		this.onReleaseCallback?.call(this, this.currentDirection);
	}

	/**
	 * Handles the Pointer Down Event
	 *
	 * Triggers when pointer is down
	 * @returns {void}
	 */
	onDpadDown(e: PointerEvent | TouchEvent): void {
		this.log("D-pad pointer down...");
		// Handle Pointer Events
		if (e instanceof PointerEvent) {
			this.base.setPointerCapture(e.pointerId);
			this.isPressed = true;
			this.pointerId = e.pointerId;
			// update container rect for accurate calculation
			this.updateContainerRectangle();
			// change opacity of whole base when touched
			// this.base.style.opacity = "1";
			// handle pointer move
			this.onDpadMove(e);
		} else if (e instanceof TouchEvent && e.touches.length > 0) {
			// monkey patch for touch events (mobile devices)
			// Handle Touch Events
			this.isPressed = true;
			this.pointerId = e.touches[0].identifier;
			// update container rect for accurate calculation
			this.updateContainerRectangle();
			// forward to pointer move
			this.onDpadMove(e.touches[0] as unknown as PointerEvent);
		}
	}

	/**
	 * Handles the Pointer Move Event
	 *
	 * Triggers when the touch / pointer moves
	 * @returns {void}
	 */
	onDpadMove(e: PointerEvent): void {
		if (!this.isPressed) return;

		// * Joystick Logic Here

		// calculate the base Rect Center
		const baseCenterX = this.baseRect!.left + this.baseRect!.width / 2;
		const baseCenterY = this.baseRect!.top + this.baseRect!.height / 2;

		// calculate pointer pos
		let x = e.clientX - baseCenterX;
		let y = e.clientY - baseCenterY;

		// ! USE EITHER OF THE ROTATION LOGIC
		// *<< ROTATION LOGIC USING X,Y (WORKS INDEPENDENT TO ANGLE) >>*
		if (this.rotation !== 0) {
			// rotate "x" and "y" by "-rotation" degrees (reverse rotation)
			const angle = (-this.rotation * Math.PI) / 180;
			const x1 = x * Math.cos(angle) - y * Math.sin(angle);
			const y1 = x * Math.sin(angle) + y * Math.cos(angle);
			x = x1;
			y = y1;
		}

		// * calculate angle for checking direction
		// Calculates the angle in degrees using the inverse tangent (arctan) of the given y and x coordinates.
		let angle = (Math.atan2(-y, x) * 180) / Math.PI;

		// ! USE EITHER OF THE ROTATION LOGIC
		// *<< ROTATION LOGIC USING DEGREES (EASY, WONT WORK FOR CO-ORDINATE SYSTEMS) >>*
		// if (this.rotation !== 0) {
		//   // rotate "angle" by "rotation" degrees
		//   angle += this.rotation;
		// }

		// * calculate distance from the center
		// just distance formula from geometry class :P
		const centerDistance = Math.sqrt(x * x + y * y);

		// find directions
		let direction: direction = "center";
		// check if the distance from the center exceeds the input register threshold
		if (centerDistance > this.inputRegisterDistance) {
			if (angle > -22.5 && angle <= 22.5) direction = "right";
			else if (angle > 22.5 && angle <= 67.5) direction = "up-right";
			else if (angle > 67.5 && angle <= 112.5) direction = "up";
			else if (angle > 112.5 && angle <= 157.5) direction = "up-left";
			else if (angle > 157.5 || angle <= -157.5) direction = "left";
			else if (angle > -157.5 && angle <= -112.5) direction = "down-left";
			else if (angle > -112.5 && angle <= -67.5) direction = "down";
			else if (angle > -67.5 && angle <= -22.5) direction = "down-right";
		}

		// state change
		if (this.currentDirection !== direction) {
			this.currentDirection = direction;
			// update ui
			this.updateDpadUI();
			// trigger callbacks
			this.log(`direction update: direction: ${direction} - angle: ${x},${y}`);
			if (this.onPressCallback) {
				this.onPressCallback.call(this, this.currentDirection);
			}
		}
	}
}

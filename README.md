# on-screen-controllers 🎮

A lightweight TypeScript library for adding on-screen game controls to web applications. Includes customizable joystick, d-pad, buttons and slider controls.

[![npm version](https://badge.fury.io/js/on-screen-controllers.svg)](https://www.npmjs.com/package/on-screen-controllers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/on-screen-controllers)](https://bundlephobia.com/package/on-screen-controllers)

## Key Features

- 🕹️ **Virtual Joystick**: Responsive analog joystick with customizable appearance and sensitivity
- 🎮 **D-pad Controller**: Precise 8-direction d-pad with configurable styling
- 🔘 **Interactive Buttons**: Fully customizable buttons supporting SVG icons and animations
- 📊 **Retractable Slider**: Smart vertical/horizontal slider with auto-return functionality
- 🎨 **Extensive Styling**: Complete control over colors, dimensions, positions, and animations
- 📱 **Cross-Platform**: Seamless support for both touch and mouse interactions
- 🪶 **Zero Dependencies**: Lightweight implementation using pure TypeScript and DOM APIs
- 📦 **Tree-Shakeable**: Import only what you need to minimize bundle size

## Quick Start

You can use on-screen-controllers in your project by including the library from a CDN or installing it via NPM.

### Using CDN

Just include the following script tag in your HTML file to load the library from a CDN:

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/on-screen-controllers@latest/dist/OnScreenControllers.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/on-screen-controllers@latest/dist/OnScreenControllers.min.js"></script>
```

You can now use the library in your JavaScript or TypeScript code:

```javascript
const joystick = new OnScreenControllers.JoystickController({
	container: document.querySelector("body"),
	top: "50%",
	left: "50%",
	radius: 100,
	color: "gray",
	thumbColor: "#333",
	rotation: 0,
	onInputCallback: (x, y) => {
		console.log(`Joystick Moved: x=${x}, y=${y}`);
	},
	onReleaseCallback: (x, y) => {
		console.log("Joystick Released");
	},
	verboseLogging: true,
});
```

### Using NPM

Install the package using your preferred package manager:

```bash
# npm
npm install on-screen-controllers

# pnpm
pnpm add on-screen-controllers

# yarn
yarn add on-screen-controllers
```

#### Joystick Controller

JoyStickController is a virtual joystick that can be used to control the movement of an object in a 2D space. The controller can be customized with different colors, sizes, and sensitivity levels. The `onInputCallback` function is called whenever the joystick is moved, providing the x and y coordinates of the thumbstick within the range of -1 to 1.

```typescript
import { JoystickController } from "on-screen-controllers";

const joystick = new JoystickController({
	container: document.querySelector("body"),
	top: "50%",
	left: "50%",
	radius: 100,
	color: "gray",
	thumbColor: "#333",
	rotation: 0,
	onInputCallback: (x, y) => {
		console.log(`Joystick Moved: x=${x}, y=${y}`);
		joystickOutput.textContent = `Joystick: x=${x}, y=${y}`;
	},
	onReleaseCallback: (x, y) => {
		console.log("Joystick Released");
		joystickOutput.textContent = `Joystick: x=0, y=0`;
	},
	verboseLogging: true,
});
```

#### D-pad Controller

DpadController is a directional pad that can be used to control the movement of an object in 9 directions (`up`, `down`, `left`, `right`, `up-left`, `up-right`, `down-left`, `down-right`, `center`). The controller can be customized with different colors, sizes, and callback functions. The `onPressCallback` function is called whenever a direction is pressed.

```typescript
import { DpadController } from "on-screen-controllers";

const dpad = new DpadController({
	container: document.querySelector("body"),
	top: "50%",
	left: "50%",
	colorBase: "#000000",
	colorsPressed: "#FFFFFF",
	radius: 100,
	onPressCallback: (direction) => {
		console.log(`D-Pad Pressed: ${direction}`);
		dpadOutput.textContent = `D-pad: ${direction}`;
	},
	onReleaseCallback: (direction) => {
		console.log("test");
		dpadOutput.textContent = `D-pad: ${direction}`;
	},
	verboseLogging: false,
	rotation: -90,
});
```

#### Button Controller

ButtonController is a simple button that can be used to trigger an action when pressed. The controller can be customized with different colors, sizes, and an optional icon. The `onPressCallback` function is called whenever the button is pressed.

```typescript
import { ButtonController } from "on-screen-controllers";

const button = new ButtonController({
	container: document.querySelector("body"),
	width: "100px",
	height: "100px",
	top: "50%",
	left: "50%",
	color: "gray",
	radius: 50,
	onPressCallback: () => {
		console.log("Button Pressed");
		buttonOutput.textContent = "Button: PRESSED";
	},
	onReleaseCallback: () => {
		console.log("Button Released");
		buttonOutput.textContent = "Button: released";
	},
	verboseLogging: true,
});
```

#### Retractable Slider

RetractableSlider is a vertical or horizontal slider that can be used to outpu a value when moved. The controller can be customized with different colors, sizes, and callback functions. The `onSlideCallback` function is called whenever the slider is moved, providing the current value between 0 and 100.

```typescript
import { RetractableSlider } from "on-screen-controllers";

const slider = new RetrackableSlider({
	container: document.querySelector("body"),
	top: "50%",
	left: "50%",
	width: "1rem",
	height: "5rem",
	color: "gray",
	borderColor: "gray",
	borderWidth: "2px",
	borderRadius: "2px",
	direction: "vertical",
	onSlideCallback: (value) => {
		console.log(`Slider Sliding: ${value}`);
		sliderOutput.textContent = `Slider: ${value.toFixed(1)}%`;
	},
	onReleaseCallback: () => {
		console.log("Slider Released");
		sliderOutput.textContent = "Slider: released";
	},
	verboseLogging: true,
});
```

## Todo

Planned Features and Improvements:

- [ ] 🔄 Add rotation support to button controller
- [ ] 📚 Add typedoc documentation

## Browser Support

on-screen-controllers is designed to work on all modern browsers and devices. The library has been tested on the following platforms:

- Chrome (latest) 🌐
- Firefox (latest) 🦊
- Safari (latest) 🧭
- Edge (latest) 🌐
- iOS Safari (latest) 📱
- Chrome for Android (latest) 📱

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

on-screen-controllers is [MIT licensed](LICENSE).

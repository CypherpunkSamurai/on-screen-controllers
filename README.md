# on-screen-controllers 🎮

A lightweight TypeScript library for adding on-screen game controls to web applications. Includes customizable joystick, d-pad, buttons and slider controls.

[![npm version](https://badge.fury.io/js/on-screen-controllers.svg)](https://www.npmjs.com/package/on-screen-controllers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

[![Click to See Live Preview ✨](https://img.shields.io/badge/Click%20to%20See%20Live%20Preview✨-8A2BE2)](https://cypherpunksamurai.github.io/on-screen-controllers/)

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
	uid: "joystick1",
	container: document.querySelector("body"),
	top: "20%",
	left: "75%",
	radius: 100,
	color: "gray",
	thumbColor: "#333",
	rotation: 0,
	onInputCallback: (x, y) => {
		console.log(`Joystick 1 Moved: x=${x}, y=${y}`);
	},
	onReleaseCallback: () => {
		console.log("Joystick 1 Released");
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
	uid: "joystick1",
	container: document.querySelector("body"),
	top: "20%",
	left: "75%",
	radius: 100,
	color: "gray",
	thumbColor: "#333",
	rotation: 0,
	onInputCallback: (x, y) => {
		console.log(`Joystick 1 Moved: x=${x}, y=${y}`);
	},
	onReleaseCallback: () => {
		console.log("Joystick 1 Released");
	},
	verboseLogging: true,
});
```

#### D-pad Controller

DpadController is a directional pad that can be used to control the movement of an object in 9 directions (`up`, `down`, `left`, `right`, `up-left`, `up-right`, `down-left`, `down-right`, `center`). The controller can be customized with different colors, sizes, and callback functions. The `onPressCallback` function is called whenever a direction is pressed.

```typescript
import { DpadController } from "on-screen-controllers";

const dpad = new DpadController({
	uid: "dpad1",
	container: document.querySelector("body"),
	top: "20%",
	left: "25%",
	colorBase: "#000000",
	colorsPressed: "#FFFFFF",
	radius: 100,
	onPressCallback: (direction) => {
		console.log(`D-Pad Pressed: ${direction}`);
	},
	onReleaseCallback: (_) => {
		console.log("D-Pad Released");
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
	uid: "button_y",
	container: document.querySelector("body"),
	top: "75%",
	left: "88%",
	width: "4rem",
	height: "4rem",
	radius: 100,
	color: "#ecdb33",
	onPressCallback: () => {
		console.log(`Button Y Pressed`);
	},
	onReleaseCallback: () => {
		console.log(`Button Y Released`);
	},
	verboseLogging: false,
});
```

#### Retractable Slider

RetractableSlider is a vertical or horizontal slider that can be used to outpu a value when moved. The controller can be customized with different colors, sizes, and callback functions. The `onSlideCallback` function is called whenever the slider is moved, providing the current value between 0 and 100.

```typescript
import { RetractableSlider } from "on-screen-controllers";

const slider = new RetrackableSlider({
	uid: "slider1",
	container: document.querySelector("body"),
	top: "8%",
	left: "50%",
	width: "60%",
	height: "9%",
	borderColor: "white",
	orientation: "horizontal",
	onSlideCallback: (value: number) => {
		console.log(`Slider 1 Slid: ${value}`);
	},
	onReleaseCallback: () => {
		console.log("Slider 1 Released");
	},
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

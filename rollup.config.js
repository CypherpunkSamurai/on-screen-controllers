// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const NAMESPACE = 'OnScreenControllers';

const entries = {
  [NAMESPACE]: 'src/index.ts', // Changed from 'all'
  'button': 'src/joystick/Button.ts',
  'dpad': 'src/joystick/Dpad.ts',
  'joystick': 'src/joystick/Joystick.ts',
  'slider': 'src/joystick/RetractableSlider.ts'
};

const getUmdName = (name) => {
  // Always return consistent namespace
  return NAMESPACE;
};

const basePlugins = [
  typescript({ 
    tsconfig: './tsconfig.json',
    compilerOptions: {
      // Override tsconfig settings for Rollup
      declaration: false, // We'll handle declarations separately
      declarationDir: undefined,
      emitDeclarationOnly: false,
      noEmit: false,
      allowImportingTsExtensions: false // Add this line
    }
  }),
  resolve(),
  commonjs()
];

// Minified builds
const minifiedBuilds = Object.entries(entries).map(([name, input]) => ({
  input,
  output: {
    file: `dist/${name}.min.js`,
    format: 'umd',
    name: getUmdName(name),
    sourcemap: true
  },
  plugins: [
    ...basePlugins,
    terser()
  ]
}));

// Format builds
const formatBuilds = Object.entries(entries).flatMap(([name, input]) => [
  {
    input,
    output: {
      file: `dist/esm/${name}.js`,
      format: 'es',
      sourcemap: true
    },
    plugins: basePlugins
  },
  {
    input,
    output: {
      file: `dist/cjs/${name}.js`,
      format: 'cjs',
      sourcemap: true
    },
    plugins: basePlugins
  },
  {
    input,
    output: {
      file: `dist/umd/${name}.js`,
      format: 'umd',
      name: getUmdName(name),
      sourcemap: true
    },
    plugins: basePlugins
  }
]);

// Types build - separate from main builds
const typesBuilds = Object.entries(entries).map(([name, input]) => ({
  input,
  output: {
    file: `dist/types/${name}.d.ts`,
    format: 'es'
  },
  plugins: [dts()]
}));

export default [
  ...minifiedBuilds,
  ...formatBuilds,
  ...typesBuilds
];
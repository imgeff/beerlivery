/** @type {import('tailwindcss').Config} */
const daisy = require('daisyui');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisy],
  daisyui: {
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: 'daisy-',
    darkTheme: 'dark',
  },
};
